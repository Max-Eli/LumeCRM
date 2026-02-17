import type { User } from "next-auth"
import type { JWT } from "next-auth/jwt"

type OrganizationFromPrisma = {
  id: string
  name: string
  slug: string
  logo: string | null
  favicon: string | null
  website: string | null
  phone: string | null
  email: string | null
  address: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  country: string
  timezone: string
  currency: string
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  createdAt: Date
  updatedAt: Date
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      firstName: string
      lastName: string
      role: string
      organizationId: string
      organization?: OrganizationFromPrisma
    }
  }

  interface User {
    firstName?: string
    lastName?: string
    role?: string
    organizationId?: string
    organization?: OrganizationFromPrisma
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    firstName?: string
    lastName?: string
    role?: string
    organizationId?: string
    organization?: OrganizationFromPrisma
  }
}