import { Navigation, Footer } from "@/components/landing"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">About Lume</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-500 mb-6">
              Lume is the leading CRM platform built specifically for mobile wellness businesses, including medspas, IV therapy clinics, and mobile healthcare providers.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Our Mission</h2>
            <p className="text-gray-500">
              We believe that mobile wellness practitioners deserve tools designed for their unique needs. Founded in 2024, Lume was built from the ground up to handle the complexities of mobile service delivery—from route optimization to HIPAA-compliant client management.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Our Values</h2>
            <ul className="text-gray-500 space-y-2">
              <li><strong>Simplicity</strong> - Powerful tools that are easy to use</li>
              <li><strong>Security</strong> - HIPAA compliance built into everything</li>
              <li><strong>Innovation</strong> - AI-powered features that save time</li>
              <li><strong>Support</strong> - Responsive help when you need it</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}