import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { hash } from "bcryptjs"
import { z } from "zod"

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  organizationName: z.string().min(1),
  organizationSlug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  phone: z.string().optional(),
  timezone: z.string(),
  currency: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signupSchema.parse(body)

    const existingUser = await prisma.user.findFirst({
      where: { email: validatedData.email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      )
    }

    const existingOrg = await prisma.organization.findUnique({
      where: { slug: validatedData.organizationSlug },
    })

    if (existingOrg) {
      return NextResponse.json(
        { error: "This business URL is already taken" },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(validatedData.password, 12)

    const result = await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: validatedData.organizationName,
          slug: validatedData.organizationSlug,
          phone: validatedData.phone,
          timezone: validatedData.timezone,
          currency: validatedData.currency,
          subscriptionTier: "trial",
          subscriptionStatus: "active",
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          hipaaCompliant: true,
          soc2Compliant: true,
        },
      })

      const user = await tx.user.create({
        data: {
          organizationId: organization.id,
          email: validatedData.email.toLowerCase(),
          passwordHash: hashedPassword,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
          role: "OWNER",
          status: "ACTIVE",
          emailVerified: new Date(),
        },
      })

      await tx.auditLog.create({
        data: {
          organizationId: organization.id,
          userId: user.id,
          action: "ORGANIZATION_CREATED",
          entityType: "ORGANIZATION",
          entityId: organization.id,
          newValue: {
            name: organization.name,
            slug: organization.slug,
          },
        },
      })

      await tx.auditLog.create({
        data: {
          organizationId: organization.id,
          userId: user.id,
          action: "USER_CREATED",
          entityType: "USER",
          entityId: user.id,
          newValue: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        },
      })

      // Create default service categories
      const categories = [
        { name: "IV Treatments", description: "Intravenous vitamin and hydration therapies", color: "#6366f1" },
        { name: "Injectables", description: "Botox, fillers, and other injectable treatments", color: "#8b5cf6" },
        { name: "Skin Treatments", description: "Facials, peels, and skin rejuvenation", color: "#06b6d4" },
        { name: "Laser Treatments", description: "Laser hair removal and skin treatments", color: "#f59e0b" },
        { name: "Body Contouring", description: "Non-invasive body sculpting treatments", color: "#10b981" },
      ]

      for (const category of categories) {
        await tx.serviceCategory.create({
          data: {
            organizationId: organization.id,
            ...category,
          },
        })
      }

      // Create default form templates
      const formTemplates = [
        {
          name: "New Patient Intake Form",
          slug: "new-patient-intake",
          description: "Comprehensive intake form for new patients",
          category: "intake",
          type: "intake",
          schema: {
            fields: [
              { id: "firstName", type: "text", label: "First Name", required: true },
              { id: "lastName", type: "text", label: "Last Name", required: true },
              { id: "email", type: "email", label: "Email", required: true },
              { id: "phone", type: "phone", label: "Phone", required: true },
              { id: "dateOfBirth", type: "date", label: "Date of Birth", required: true },
              { id: "address", type: "address", label: "Address", required: true },
              { id: "emergencyContact", type: "text", label: "Emergency Contact Name", required: true },
              { id: "emergencyPhone", type: "phone", label: "Emergency Contact Phone", required: true },
            ],
          },
          settings: { requireSignature: true },
          autoAssignOn: ["booking"],
          isRequired: true,
          isSignatureRequired: true,
        },
        {
          name: "HIPAA Consent Form",
          slug: "hipaa-consent",
          description: "HIPAA privacy practices acknowledgment",
          category: "consent",
          type: "consent",
          schema: {
            fields: [
              { id: "acknowledgment", type: "checkbox", label: "I acknowledge that I have received and understand the HIPAA privacy practices", required: true },
            ],
          },
          settings: { requireSignature: true },
          autoAssignOn: ["booking"],
          isRequired: true,
          isSignatureRequired: true,
        },
      ]

      for (const template of formTemplates) {
        await tx.formTemplate.create({
          data: {
            organizationId: organization.id,
            ...template,
          },
        })
      }

      return { organization, user }
    })

    return NextResponse.json({
      success: true,
      data: {
        organization: {
          id: result.organization.id,
          name: result.organization.name,
          slug: result.organization.slug,
        },
        user: {
          id: result.user.id,
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
        },
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "An error occurred during signup. Please try again." },
      { status: 500 }
    )
  }
}