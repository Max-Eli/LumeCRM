import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"

const customerCreateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  secondaryPhone: z.string().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  country: z.string().default("US"),
  notes: z.string().optional().nullable(),
  leadSource: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
})

const customerUpdateSchema = customerCreateSchema.partial()

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const where = {
      organizationId: session.user.organizationId,
      ...(status && { status: status as any }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: "insensitive" as const } },
          { lastName: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          _count: {
            select: {
              appointments: true,
              invoices: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.customer.count({ where }),
    ])

    return NextResponse.json({
      data: customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = customerCreateSchema.parse(body)

    const customer = await prisma.customer.create({
      data: {
        organizationId: session.user.organizationId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email?.toLowerCase(),
        phone: validatedData.phone,
        secondaryPhone: validatedData.secondaryPhone,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
        gender: validatedData.gender,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        zipCode: validatedData.zipCode,
        country: validatedData.country,
        notes: validatedData.notes,
        leadSource: validatedData.leadSource,
        status: "ACTIVE",
        referralCode: `REF-${Date.now().toString(36).toUpperCase()}`,
        ...(validatedData.tags && {
          tags: {
            connectOrCreate: validatedData.tags.map((tagName) => ({
              where: {
                organizationId_name: {
                  organizationId: session.user.organizationId,
                  name: tagName,
                },
              },
              create: {
                organizationId: session.user.organizationId,
                name: tagName,
              },
            })),
          },
        }),
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    await prisma.auditLog.create({
      data: {
        organizationId: session.user.organizationId,
        userId: session.user.id,
        action: "CUSTOMER_CREATED",
        entityType: "CUSTOMER",
        entityId: customer.id,
        newValue: customer,
      },
    })

    return NextResponse.json({ data: customer }, { status: 201 })
  } catch (error) {
    console.error("Error creating customer:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    )
  }
}