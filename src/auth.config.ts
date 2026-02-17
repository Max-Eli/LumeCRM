import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import { compare } from "bcryptjs"

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
    verifyRequest: "/verify-email",
    newUser: "/onboarding",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        organizationId: { label: "Organization ID", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string
        const organizationId = credentials.organizationId as string | undefined

        const user = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase(),
            ...(organizationId && { organizationId }),
          },
          include: {
            organization: true,
          },
        })

        if (!user || !user.passwordHash) {
          return null
        }

        const isPasswordValid = await compare(password, user.passwordHash)

        if (!isPasswordValid) {
          return null
        }

        if (user.status !== "ACTIVE") {
          throw new Error("Account is not active")
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        })

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          organizationId: user.organizationId,
          organization: user.organization,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.firstName = (user as any).firstName
        token.lastName = (user as any).lastName
        token.role = (user as any).role
        token.organizationId = (user as any).organizationId
        token.organization = (user as any).organization
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.role = token.role as string
        session.user.organizationId = token.organizationId as string
        session.user.organization = token.organization as any
      }
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthRoute = nextUrl.pathname.startsWith("/login") || 
                          nextUrl.pathname.startsWith("/signup") ||
                          nextUrl.pathname.startsWith("/forgot-password") ||
                          nextUrl.pathname.startsWith("/reset-password")
      const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard") ||
                               nextUrl.pathname.startsWith("/api")
      const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
      const isLandingPage = nextUrl.pathname === "/"

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl))
        }
        return true
      }

      if (isDashboardRoute && !isApiAuthRoute) {
        if (!isLoggedIn) {
          return false
        }
        return true
      }

      return true
    },
  },
  events: {
    async signIn({ user }) {
      if ((user as any).organizationId) {
        await prisma.auditLog.create({
          data: {
            organizationId: (user as any).organizationId,
            userId: user.id,
            action: "USER_SIGN_IN",
            entityType: "USER",
            entityId: user.id,
          },
        })
      }
    },
  },
}