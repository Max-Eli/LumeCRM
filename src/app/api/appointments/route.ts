import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"

const appointmentCreateSchema = z.object({
  customerId: z.string(),
  serviceId: z.string(),
  staffId: z.string(),
  locationId: z.string().optional().nullable(),
  scheduledAt: z.string(),
  scheduledEnd: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  isMobile: z.boolean().default(true),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const staffId = searchParams.get("staffId")
    const customerId = searchParams.get("customerId")
    const status = searchParams.get("status")

    const where = {
      organizationId: session.user.organizationId,
      ...(startDate && { scheduledAt: { gte: new Date(startDate) } }),
      ...(endDate && { scheduledEnd: { lte: new Date(endDate) } }),
      ...(staffId && { staffId }),
      ...(customerId && { customerId }),
      ...(status && { status: status as any }),
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          service: {
            select: {
              id: true,
              name: true,
              duration: true,
              price: true,
            },
          },
          staff: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
          location: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
          routeAssignments: {
            select: {
              id: true,
              sequence: true,
              status: true,
            },
          },
        },
        orderBy: {
          scheduledAt: "asc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ])

    return NextResponse.json({
      data: appointments,
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
    console.error("Error fetching appointments:", error)
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
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
    const validatedData = appointmentCreateSchema.parse(body)

    const service = await prisma.service.findFirst({
      where: {
        id: validatedData.serviceId,
        organizationId: session.user.organizationId,
      },
    })

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    const customer = await prisma.customer.findFirst({
      where: {
        id: validatedData.customerId,
        organizationId: session.user.organizationId,
      },
    })

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    const appointment = await prisma.appointment.create({
      data: {
        organizationId: session.user.organizationId,
        customerId: validatedData.customerId,
        serviceId: validatedData.serviceId,
        staffId: validatedData.staffId,
        locationId: validatedData.locationId,
        scheduledAt: new Date(validatedData.scheduledAt),
        scheduledEnd: new Date(validatedData.scheduledEnd),
        totalDuration: service.duration,
        price: service.price,
        deposit: service.depositAmount,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        zipCode: validatedData.zipCode,
        notes: validatedData.notes,
        isMobile: validatedData.isMobile,
        status: "SCHEDULED",
        confirmationCode: `LUME-${Date.now().toString(36).toUpperCase()}`,
      },
      include: {
        customer: true,
        service: true,
        staff: true,
      },
    })

    if (service.requiredFormTemplates && service.requiredFormTemplates.length > 0) {
      for (const templateId of service.requiredFormTemplates) {
        await prisma.assignedForm.create({
          data: {
            organizationId: session.user.organizationId,
            customerId: validatedData.customerId,
            formId: templateId,
            templateId: templateId,
            appointmentId: appointment.id,
            serviceId: validatedData.serviceId,
            status: "pending",
          },
        })
      }
    }

    await prisma.$transaction([
      prisma.customer.update({
        where: { id: validatedData.customerId },
        data: {
          totalVisits: { increment: 1 },
          lastVisitAt: new Date(),
        },
      }),
      prisma.auditLog.create({
        data: {
          organizationId: session.user.organizationId,
          userId: session.user.id,
          action: "APPOINTMENT_CREATED",
          entityType: "APPOINTMENT",
          entityId: appointment.id,
          newValue: appointment as any,
        },
      }),
    ])

    return NextResponse.json({ data: appointment }, { status: 201 })
  } catch (error) {
    console.error("Error creating appointment:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    )
  }
}