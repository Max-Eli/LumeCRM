import { Navigation, Footer } from "@/components/landing"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Security</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-500 mb-6">
              Security is foundational to everything we build at Lume.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Infrastructure</h2>
            <p className="text-gray-500">Our infrastructure runs on AWS with multiple layers of security, including network isolation, encryption, and continuous monitoring.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Encryption</h2>
            <ul className="text-gray-500 space-y-2">
              <li>All data encrypted at rest using AES-256</li>
              <li>TLS 1.3 for all data in transit</li>
              <li>Encrypted database backups</li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Access Control</h2>
            <ul className="text-gray-500 space-y-2">
              <li>Role-based access control (RBAC)</li>
              <li>Multi-factor authentication (MFA)</li>
              <li>Single Sign-On (SSO) support</li>
              <li>Detailed audit logs</li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Compliance</h2>
            <p className="text-gray-500">Lume is HIPAA compliant and SOC 2 Type II certified. We undergo regular third-party security audits.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Reporting</h2>
            <p className="text-gray-500">Found a security vulnerability? Please report it responsibly to security@lumecrm.com. We appreciate responsible disclosure and will respond promptly.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}