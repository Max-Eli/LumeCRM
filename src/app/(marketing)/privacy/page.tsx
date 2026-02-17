import { Navigation, Footer } from "@/components/landing"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-500 mb-6">Last updated: February 2026</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">1. Introduction</h2>
            <p className="text-gray-500">Lume CRM ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">2. Information We Collect</h2>
            <p className="text-gray-500">We collect information you provide directly, including account information, client data, and communications. We also collect usage data to improve our services.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-500">We use your information to provide, maintain, and improve our services, process transactions, and communicate with you about your account.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">4. Data Security</h2>
            <p className="text-gray-500">We implement appropriate security measures including encryption, access controls, and regular security assessments to protect your data.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">5. Contact Us</h2>
            <p className="text-gray-500">If you have questions about this Privacy Policy, please contact us at privacy@lumecrm.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}