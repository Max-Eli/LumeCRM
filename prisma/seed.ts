import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create a demo organization
  const organization = await prisma.organization.upsert({
    where: { slug: "demo-medspa" },
    update: {},
    create: {
      name: "Demo MedSpa",
      slug: "demo-medspa",
      email: "contact@demomedspa.com",
      phone: "(310) 555-0100",
      address: "123 Beverly Hills Blvd",
      city: "Beverly Hills",
      state: "CA",
      zipCode: "90210",
      country: "US",
      timezone: "America/Los_Angeles",
      currency: "USD",
      subscriptionTier: "professional",
      subscriptionStatus: "active",
      hipaaCompliant: true,
      soc2Compliant: true,
    },
  })

  console.log("Created organization:", organization.name)

  // Create a demo user
  const hashedPassword = await hash("demo123456", 12)
  
  const user = await prisma.user.upsert({
    where: {
      organizationId_email: {
        organizationId: organization.id,
        email: "demo@lumecrm.com",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      email: "demo@lumecrm.com",
      passwordHash: hashedPassword,
      firstName: "Demo",
      lastName: "User",
      role: "OWNER",
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  })

  console.log("Created user:", user.email)

  // Create service categories
  const categories = await Promise.all([
    prisma.serviceCategory.upsert({
      where: {
        organizationId_name: {
          organizationId: organization.id,
          name: "IV Treatments",
        },
      },
      update: {},
      create: {
        organizationId: organization.id,
        name: "IV Treatments",
        description: "Intravenous vitamin and hydration therapies",
        color: "#6366f1",
        icon: "droplet",
      },
    }),
    prisma.serviceCategory.upsert({
      where: {
        organizationId_name: {
          organizationId: organization.id,
          name: "Injectables",
        },
      },
      update: {},
      create: {
        organizationId: organization.id,
        name: "Injectables",
        description: "Botox, fillers, and cosmetic injections",
        color: "#8b5cf6",
        icon: "syringe",
      },
    }),
    prisma.serviceCategory.upsert({
      where: {
        organizationId_name: {
          organizationId: organization.id,
          name: "Skin Treatments",
        },
      },
      update: {},
      create: {
        organizationId: organization.id,
        name: "Skin Treatments",
        description: "Facials, peels, and skin rejuvenation",
        color: "#06b6d4",
        icon: "sparkles",
      },
    }),
  ])

  console.log("Created", categories.length, "categories")

  // Create sample services
  const ivCategory = categories[0]
  const injectablesCategory = categories[1]
  const skinCategory = categories[2]

  await Promise.all([
    prisma.service.upsert({
      where: {
        organizationId_name: {
          organizationId: organization.id,
          name: "IV Vitamin Therapy",
        },
      },
      update: {},
      create: {
        organizationId: organization.id,
        categoryId: ivCategory.id,
        name: "IV Vitamin Therapy",
        description: "Customized intravenous vitamin injections for optimal health and wellness",
        duration: 60,
        price: 199,
        isMobile: true,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: {
        organizationId_name: {
          organizationId: organization.id,
          name: "Botox Treatment",
        },
      },
      update: {},
      create: {
        organizationId: organization.id,
        categoryId: injectablesCategory.id,
        name: "Botox Treatment",
        description: "FDA-approved botulinum toxin injections for wrinkle reduction",
        duration: 45,
        price: 350,
        isMobile: true,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: {
        organizationId_name: {
          organizationId: organization.id,
          name: "HydraFacial",
        },
      },
      update: {},
      create: {
        organizationId: organization.id,
        categoryId: skinCategory.id,
        name: "HydraFacial",
        description: "Multi-step facial treatment that cleanses, extracts, and hydrates skin",
        duration: 60,
        price: 199,
        isMobile: true,
        isActive: true,
      },
    }),
  ])

  console.log("Created sample services")

  console.log("\n✅ Seed completed successfully!")
  console.log("\nDemo login credentials:")
  console.log("Email: demo@lumecrm.com")
  console.log("Password: demo123456")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })