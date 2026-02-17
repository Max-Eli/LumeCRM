import { Navigation, Footer } from "@/components/landing"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Documentation</h1>
          <p className="text-lg text-gray-500 mb-10">
            Everything you need to integrate with and use Lume.
          </p>
          <div className="grid gap-4">
            <a href="/docs/api" className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <h2 className="text-lg font-semibold text-gray-900">API Reference</h2>
              <p className="text-gray-500 text-sm mt-1">REST API documentation for developers</p>
            </a>
            <a href="/docs/guides" className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <h2 className="text-lg font-semibold text-gray-900">Guides</h2>
              <p className="text-gray-500 text-sm mt-1">Step-by-step tutorials and best practices</p>
            </a>
            <a href="/docs/integrations" className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <h2 className="text-lg font-semibold text-gray-900">Integrations</h2>
              <p className="text-gray-500 text-sm mt-1">Connect with your existing tools</p>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}