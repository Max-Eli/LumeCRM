import { Navigation, Footer } from "@/components/landing"

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Integrations</h1>
          <p className="text-lg text-gray-500 mb-10">
            Connect Lume with the tools you already use.
          </p>
          <div className="grid gap-4">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-900">Google Calendar</h2>
              <p className="text-gray-500 text-sm mt-1">Sync appointments with your Google Calendar</p>
              <span className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">Available</span>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-900">Stripe</h2>
              <p className="text-gray-500 text-sm mt-1">Process payments and manage subscriptions</p>
              <span className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">Available</span>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-900">Twilio</h2>
              <p className="text-gray-500 text-sm mt-1">Send SMS reminders and notifications</p>
              <span className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">Available</span>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-900">Zapier</h2>
              <p className="text-gray-500 text-sm mt-1">Connect with 5,000+ apps automation</p>
              <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">Coming Soon</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}