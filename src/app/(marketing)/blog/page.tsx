import { Navigation, Footer } from "@/components/landing"
import Link from "next/link"

const posts = [
  { title: "How AI Route Optimization Cuts Drive Time by 40%", date: "Feb 15, 2026", slug: "route-optimization" },
  { title: "HIPAA Compliance for Mobile Healthcare: A Complete Guide", date: "Feb 10, 2026", slug: "hipaa-guide" },
  { title: "5 Ways to Reduce No-Shows at Your Medspa", date: "Feb 5, 2026", slug: "reduce-no-shows" },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Blog</h1>
          <p className="text-lg text-gray-500 mb-10">
            Insights and guides for mobile wellness businesses.
          </p>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-100 pb-8">
                <time className="text-sm text-gray-400">{post.date}</time>
                <h2 className="text-xl font-semibold text-gray-900 mt-1">
                  <Link href={`/blog/${post.slug}`} className="hover:text-orange-600">
                    {post.title}
                  </Link>
                </h2>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}