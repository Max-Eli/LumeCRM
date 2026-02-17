import { Navigation, Footer } from "@/components/landing"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Help Center</h1>
          <p className="text-lg text-gray-500 mb-10">
            Find answers to common questions or contact our support team.
          </p>
          <div className="space-y-4">
            <details className="group p-6 bg-gray-50 rounded-xl">
              <summary className="cursor-pointer list-none flex justify-between items-center font-medium text-gray-900">
                How do I get started with Lume?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-500">Sign up for a free 14-day trial, then follow the onboarding guide to set up your organization, add team members, and import your existing client data.</p>
            </details>
            <details className="group p-6 bg-gray-50 rounded-xl">
              <summary className="cursor-pointer list-none flex justify-between items-center font-medium text-gray-900">
                Is Lume HIPAA compliant?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-500">Yes, Lume is fully HIPAA compliant. We provide Business Associate Agreements (BAA) and implement all required technical and administrative safeguards.</p>
            </details>
            <details className="group p-6 bg-gray-50 rounded-xl">
              <summary className="cursor-pointer list-none flex justify-between items-center font-medium text-gray-900">
                Can I import my existing data?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-500">Yes, you can import clients, appointments, and services via CSV files. Our support team can also help with larger migrations.</p>
            </details>
            <details className="group p-6 bg-gray-50 rounded-xl">
              <summary className="cursor-pointer list-none flex justify-between items-center font-medium text-gray-900">
                How does pricing work?
                <span className="text-gray-400 group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-500">Pricing is per organization based on your plan tier. All plans include a 14-day free trial with no credit card required.</p>
            </details>
          </div>
          <div className="mt-10 p-6 bg-gray-900 rounded-xl text-center">
            <h2 className="text-lg font-semibold text-white mb-2">Still need help?</h2>
            <p className="text-gray-400 mb-4">Our support team is here to assist you.</p>
            <a href="mailto:support@lumecrm.com" className="text-orange-400 font-medium hover:text-orange-300">
              Contact support →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}