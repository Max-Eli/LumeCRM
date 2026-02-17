import { Navigation, Footer } from "@/components/landing"

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Changelog</h1>
          <p className="text-lg text-gray-500 mb-10">
            What's new in Lume.
          </p>
          <div className="space-y-12">
            <article>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded">New</span>
                <time className="text-sm text-gray-400">Feb 15, 2026</time>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">AI Route Optimization</h2>
              <p className="text-gray-500 mt-2">We've added AI-powered route optimization that automatically reorders your appointments to minimize drive time.</p>
            </article>
            <article>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded">Improved</span>
                <time className="text-sm text-gray-400">Feb 10, 2026</time>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Faster Calendar Loading</h2>
              <p className="text-gray-500 mt-2">Calendar view now loads 3x faster with improved caching and pagination.</p>
            </article>
            <article>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded">New</span>
                <time className="text-sm text-gray-400">Feb 5, 2026</time>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Custom Form Builder</h2>
              <p className="text-gray-500 mt-2">Create custom intake forms and waivers with our new drag-and-drop form builder.</p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}