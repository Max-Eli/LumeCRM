import type { User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { Organization } from "./index"

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
      organization?: Organization
    }
  }

  interface User {
    firstName?: string
    lastName?: string
    role?: string
    organizationId?: string
    organization?: Organization
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    firstName?: string
    lastName?: string
    role?: string
    organizationId?: string
    organization?: Organization
  }
}