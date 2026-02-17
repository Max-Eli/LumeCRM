import { Navigation, Footer } from "@/components/landing"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Terms of Service</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-500 mb-6">Last updated: February 2026</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-500">By accessing and using Lume CRM, you accept and agree to be bound by these Terms of Service.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">2. Description of Service</h2>
            <p className="text-gray-500">Lume provides a CRM platform for mobile wellness businesses, including scheduling, client management, route optimization, and related features.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-500">You are responsible for maintaining account security, ensuring your use complies with applicable laws, and for all activities under your account.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">4. Payment Terms</h2>
            <p className="text-gray-500">Subscription fees are billed monthly or annually. All fees are non-refundable except as required by law.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">5. Termination</h2>
            <p className="text-gray-500">You may cancel your subscription at any time. We may suspend or terminate accounts that violate these terms.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">6. Contact</h2>
            <p className="text-gray-500">For questions about these terms, contact us at legal@lumecrm.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}