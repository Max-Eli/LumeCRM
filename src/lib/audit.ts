import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { headers } from "next/headers"

type AuditAction = 
  | "USER_SIGN_IN"
  | "USER_SIGN_OUT"
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "ORGANIZATION_CREATED"
  | "ORGANIZATION_UPDATED"
  | "CUSTOMER_CREATED"
  | "CUSTOMER_UPDATED"
  | "CUSTOMER_DELETED"
  | "APPOINTMENT_CREATED"
  | "APPOINTMENT_UPDATED"
  | "APPOINTMENT_CANCELLED"
  | "APPOINTMENT_COMPLETED"
  | "SERVICE_CREATED"
  | "SERVICE_UPDATED"
  | "SERVICE_DELETED"
  | "STAFF_CREATED"
  | "STAFF_UPDATED"
  | "STAFF_DELETED"
  | "INVOICE_CREATED"
  | "INVOICE_PAID"
  | "PAYMENT_RECEIVED"
  | "FORM_CREATED"
  | "FORM_UPDATED"
  | "FORM_RESPONSE_SUBMITTED"
  | "ROUTE_CREATED"
  | "ROUTE_OPTIMIZED"
  | "SETTINGS_UPDATED"
  | "SECURITY_EVENT"

interface AuditLogParams {
  action: AuditAction
  entityType: string
  entityId: string
  oldValue?: Record<string, unknown>
  newValue?: Record<string, unknown>
  metadata?: Record<string, unknown>
}

export async function createAuditLog(params: AuditLogParams) {
  try {
    const session = await auth()
    const headersList = await headers()
    
    const ipAddress = headersList.get("x-forwarded-for") || 
                      headersList.get("x-real-ip") || 
                      undefined
    const userAgent = headersList.get("user-agent") || undefined

    await prisma.auditLog.create({
      data: {
        organizationId: session?.user?.organizationId || "system",
        userId: session?.user?.id,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        oldValue: params.oldValue as any,
        newValue: params.newValue as any,
        metadata: {
          ...params.metadata,
          ipAddress,
          userAgent,
        } as any,
        ipAddress,
        userAgent,
      },
    })
  } catch (error) {
    console.error("Failed to create audit log:", error)
  }
}

export async function getAuditLogs(
  organizationId: string,
  options?: {
    userId?: string
    action?: string
    entityType?: string
    entityId?: string
    page?: number
    limit?: number
  }
) {
  const page = options?.page || 1
  const limit = options?.limit || 50

  const where = {
    organizationId,
    ...(options?.userId && { userId: options.userId }),
    ...(options?.action && { action: options.action }),
    ...(options?.entityType && { entityType: options.entityType }),
    ...(options?.entityId && { entityId: options.entityId }),
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ])

  return {
    data: logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}