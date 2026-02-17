export type UserRole = "OWNER" | "ADMIN" | "MANAGER" | "STAFF" | "MEMBER"
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING"
export type StaffStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "TERMINATED"
export type CustomerStatus = "ACTIVE" | "INACTIVE" | "LEAD" | "ARCHIVED" | "BLOCKED"
export type AppointmentStatus = "DRAFT" | "PENDING" | "SCHEDULED" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "NO_SHOW" | "RESCHEDULED"

export interface User {
  id: string
  organizationId: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: UserRole
  status: UserStatus
  emailVerified?: Date
  twoFactorEnabled: boolean
  preferences: Record<string, unknown>
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Organization {
  id: string
  name: string
  slug: string
  logo?: string
  website?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country: string
  timezone: string
  currency: string
  subscriptionTier: string
  subscriptionStatus: string
  hipaaCompliant: boolean
  soc2Compliant: boolean
  branding: BrandingSettings
  settings: Record<string, unknown>
  features: Record<string, boolean>
  createdAt: Date
  updatedAt: Date
}

export interface BrandingSettings {
  primaryColor?: string
  secondaryColor?: string
  logo?: string
  favicon?: string
  customDomain?: string
}

export interface Customer {
  id: string
  organizationId: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  dateOfBirth?: Date
  gender?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country: string
  latitude?: number
  longitude?: number
  profilePhoto?: string
  status: CustomerStatus
  totalVisits: number
  totalSpent: number
  lifetimeValue: number
  firstVisitAt?: Date
  lastVisitAt?: Date
  nextAppointmentAt?: Date
  notes?: string
  medicalHistory?: string
  allergies?: string
  emergencyContact?: EmergencyContact
  consentSignedAt?: Date
  hipaaConsentAt?: Date
  marketingConsent: boolean
  referralCode?: string
  stripeCustomerId?: string
  createdAt: Date
  updatedAt: Date
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

export interface Staff {
  id: string
  organizationId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatar?: string
  title?: string
  department?: string
  specializations: string[]
  certifications: Certification[]
  licenses: License[]
  status: StaffStatus
  hireDate?: Date
  hourlyRate?: number
  commissionRate?: number
  homeAddress?: string
  homeLatitude?: number
  homeLongitude?: number
  maxTravelMiles: number
  isMobile: boolean
  acceptingNewClients: boolean
  availability: Record<string, unknown>
  averageRating?: number
  totalReviews: number
  totalAppointments: number
  createdAt: Date
  updatedAt: Date
}

export interface Certification {
  name: string
  issuer: string
  dateObtained: string
  expirationDate?: string
  credentialId?: string
}

export interface License {
  type: string
  number: string
  state: string
  expirationDate: string
}

export interface Service {
  id: string
  organizationId: string
  categoryId?: string
  name: string
  slug?: string
  description?: string
  shortDescription?: string
  duration: number
  bufferBefore: number
  bufferAfter: number
  price: number
  cost?: number
  depositAmount?: number
  depositType?: "fixed" | "percentage"
  isMobile: boolean
  isRecurring: boolean
  isActive: boolean
  isFeatured: boolean
  isPopular: boolean
  maxConcurrent: number
  minAdvanceHours: number
  maxAdvanceDays: number
  preparationTime: number
  cleanupTime: number
  requiredEquipment: string[]
  requiredSupplies: string[]
  contraindications: string[]
  images: string[]
  videoUrl?: string
  thumbnailUrl?: string
  requiredFormTemplates: string[]
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  id: string
  organizationId: string
  customerId: string
  serviceId: string
  staffId: string
  locationId?: string
  teamId?: string
  externalId?: string
  confirmationCode?: string
  status: AppointmentStatus
  scheduledAt: Date
  scheduledEnd: Date
  actualStartAt?: Date
  actualEndAt?: Date
  bufferBefore: number
  bufferAfter: number
  travelTime: number
  totalDuration: number
  price: number
  deposit?: number
  depositPaid: boolean
  address?: string
  city?: string
  state?: string
  zipCode?: string
  latitude?: number
  longitude?: number
  notes?: string
  internalNotes?: string
  isMobile: boolean
  isRecurring: boolean
  recurringRule?: string
  remindersSent: number
  lastReminderAt?: Date
  checkedInAt?: Date
  completedAt?: Date
  cancelledAt?: Date
  cancellationReason?: string
  cancelledBy?: string
  confirmedAt?: Date
  createdAt: Date
  updatedAt: Date
  customer?: Customer
  service?: Service
  staff?: Staff
}

export interface FormTemplate {
  id: string
  organizationId: string
  name: string
  slug?: string
  description?: string
  category?: string
  type: "dynamic" | "waiver" | "consent" | "intake" | "medical"
  schema: FormSchema
  settings: FormSettings
  version: number
  isActive: boolean
  isRequired: boolean
  isSignatureRequired: boolean
  autoAssignOn: ("booking" | "registration" | "first_visit")[]
  assignedServices: string[]
  createdAt: Date
  updatedAt: Date
}

export interface FormSchema {
  fields: FormField[]
  layout?: FormLayout
  validation?: ValidationRules
}

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  helpText?: string
  required: boolean
  options?: FieldOption[]
  validation?: FieldValidation
  conditional?: ConditionalLogic
  defaultValue?: unknown
}

export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "datetime"
  | "file"
  | "signature"
  | "heading"
  | "paragraph"
  | "divider"
  | "address"
  | "name"

export interface FieldOption {
  label: string
  value: string
}

export interface FieldValidation {
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: string
  message?: string
}

export interface ConditionalLogic {
  fieldId: string
  operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan"
  value: unknown
}

export interface FormLayout {
  type: "single" | "multi" | "wizard"
  columns?: number
  sections?: FormSection[]
}

export interface FormSection {
  id: string
  title?: string
  description?: string
  fields: string[]
}

export interface ValidationRules {
  submitMessage?: string
  errorMessage?: string
}

export interface FormSettings {
  submitButtonText?: string
  redirectUrl?: string
  sendConfirmationEmail?: boolean
  requireSignature?: boolean
  expirationDays?: number
}

export interface AssignedForm {
  id: string
  organizationId: string
  customerId: string
  formId: string
  templateId?: string
  appointmentId?: string
  serviceId?: string
  status: "pending" | "sent" | "viewed" | "completed" | "expired"
  assignedAt: Date
  dueAt?: Date
  completedAt?: Date
  expiresAt?: Date
  sentAt?: Date
  viewedAt?: Date
  remindersSent: number
  createdAt: Date
  updatedAt: Date
}

export interface FormResponse {
  id: string
  organizationId: string
  formId: string
  assignedFormId?: string
  customerId: string
  staffId?: string
  data: Record<string, unknown>
  signature?: string
  signedAt?: Date
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  ipAddress?: string
  userAgent?: string
  formVersion: number
  createdAt: Date
  updatedAt: Date
}

export interface Route {
  id: string
  organizationId: string
  staffId: string
  vehicleId?: string
  locationId?: string
  date: Date
  status: "planned" | "in_progress" | "completed" | "cancelled"
  totalDistance?: number
  totalDuration?: number
  totalTravelTime?: number
  startedAt?: Date
  endedAt?: Date
  optimizationData?: Record<string, unknown>
  notes?: string
  assignments: RouteAssignment[]
  createdAt: Date
  updatedAt: Date
}

export interface RouteAssignment {
  id: string
  routeId: string
  appointmentId?: string
  staffId: string
  sequence: number
  address: string
  latitude: number
  longitude: number
  estimatedArrival?: Date
  estimatedDuration?: number
  estimatedTravelTime?: number
  actualArrival?: Date
  actualDeparture?: Date
  distance?: number
  status: "pending" | "en_route" | "arrived" | "in_progress" | "completed" | "cancelled"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Invoice {
  id: string
  organizationId: string
  customerId: string
  appointmentId?: string
  invoiceNumber: string
  status: "draft" | "sent" | "viewed" | "paid" | "partial" | "overdue" | "cancelled"
  issueDate: Date
  dueDate: Date
  paidDate?: Date
  subtotal: number
  tax: number
  discount: number
  total: number
  amountPaid: number
  amountDue: number
  notes?: string
  terms?: string
  stripeInvoiceId?: string
  sentAt?: Date
  viewedAt?: Date
  items: InvoiceItem[]
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceItem {
  id: string
  invoiceId: string
  productId?: string
  description: string
  quantity: number
  unitPrice: number
  discount: number
  tax: number
  total: number
  sortOrder: number
  createdAt: Date
}

export interface Payment {
  id: string
  organizationId: string
  invoiceId: string
  customerId: string
  amount: number
  method: "card" | "cash" | "check" | "bank_transfer" | "other"
  status: "pending" | "processing" | "completed" | "failed" | "refunded"
  transactionId?: string
  stripePaymentId?: string
  stripeChargeId?: string
  refunded: boolean
  refundedAmount?: number
  refundedAt?: Date
  processedAt?: Date
  createdAt: Date
}

export interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  totalAppointments: number
  appointmentsChange: number
  totalCustomers: number
  customersChange: number
  avgRating: number
  ratingChange: number
  upcomingAppointments: number
  completedThisMonth: number
  cancelledThisMonth: number
  noShowRate: number
  topServices: ServiceMetric[]
  topStaff: StaffMetric[]
  revenueByDay: RevenueMetric[]
  appointmentsByStatus: StatusMetric[]
}

export interface ServiceMetric {
  id: string
  name: string
  count: number
  revenue: number
}

export interface StaffMetric {
  id: string
  name: string
  appointments: number
  revenue: number
  rating: number
}

export interface RevenueMetric {
  date: string
  revenue: number
  appointments: number
}

export interface StatusMetric {
  status: string
  count: number
  percentage: number
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  resourceId?: string
  extendedProps: {
    type: "appointment" | "block" | "availability"
    status: AppointmentStatus
    customerId: string
    customerName: string
    serviceId: string
    serviceName: string
    staffId: string
    staffName: string
    address?: string
    notes?: string
  }
}

export interface TimeSlot {
  start: Date
  end: Date
  available: boolean
  staffId?: string
  staffName?: string
  reason?: string
}

export interface Notification {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  readAt?: Date
  createdAt: Date
  data?: Record<string, unknown>
}

export interface AuditLog {
  id: string
  organizationId: string
  userId?: string
  action: string
  entityType: string
  entityId: string
  oldValue?: Record<string, unknown>
  newValue?: Record<string, unknown>
  metadata?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface SortOption {
  field: string
  direction: "asc" | "desc"
}

export interface FilterOption {
  field: string
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in" | "between"
  value: unknown
}

export interface ListQuery {
  page?: number
  limit?: number
  sort?: SortOption[]
  filter?: FilterOption[]
  search?: string
  fields?: string[]
}

export interface CustomerPortalSettings {
  enabled: boolean
  requireLogin: boolean
  logo?: string
  primaryColor: string
  customDomain?: string
  allowBooking: boolean
  allowRescheduling: boolean
  allowCancellation: boolean
  allowPayment: boolean
  showPricing: boolean
  showStaffProfiles: boolean
  requireFormsBeforeBooking: boolean
  reminderDays: number[]
  confirmationMessage?: string
  reminderMessage?: string
  cancellationMessage?: string
}