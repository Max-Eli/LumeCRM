import { Navigation, Footer } from "@/components/landing"

export default function HIPAAPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">HIPAA Compliance</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-500 mb-6">
              Lume is designed from the ground up to help healthcare organizations maintain HIPAA compliance.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Our Commitment</h2>
            <p className="text-gray-500">Lume implements administrative, physical, and technical safeguards to protect Protected Health Information (PHI) in accordance with the HIPAA Security Rule.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Technical Safeguards</h2>
            <ul className="text-gray-500 space-y-2">
              <li>All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
              <li>Role-based access controls</li>
              <li>Audit logging for all PHI access</li>
              <li>Automatic session timeouts</li>
              <li>Secure backup procedures</li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Business Associate Agreement</h2>
            <p className="text-gray-500">We provide Business Associate Agreements (BAA) to all covered entities using our platform. Contact us at compliance@lumecrm.com to request a BAA.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Regular Assessments</h2>
            <p className="text-gray-500">We conduct regular risk assessments and security audits to ensure ongoing compliance with HIPAA requirements.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}