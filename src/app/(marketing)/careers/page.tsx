import { Navigation, Footer } from "@/components/landing"
import Link from "next/link"

const jobs = [
  { title: "Senior Software Engineer", department: "Engineering", location: "Remote" },
  { title: "Product Designer", department: "Design", location: "Remote" },
  { title: "Customer Success Manager", department: "Support", location: "Remote" },
  { title: "Marketing Manager", department: "Marketing", location: "Remote" },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Careers</h1>
          <p className="text-lg text-gray-500 mb-10">
            Join our team and help transform mobile wellness.
          </p>
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link key={job.title} href={`/careers/${job.title.toLowerCase().replace(/ /g, "-")}`} className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{job.department} · {job.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}