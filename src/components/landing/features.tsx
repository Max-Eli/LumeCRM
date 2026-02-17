"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Shield, BarChart3, Smartphone, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Calendar,
    title: "Precision Scheduling™",
    description: "Smart booking that optimizes your calendar and prevents double-bookings automatically.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MapPin,
    title: "Smart Routes",
    description: "AI-powered GPS routing reduces drive time by up to 40%. Real-time traffic integration.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Users,
    title: "Client Profiles",
    description: "Complete patient profiles, treatment history, consent forms, and health records.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with encryption at rest and in transit. BAA included.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Real-time dashboards track revenue, utilization, and growth trends.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Native iOS and Android apps with offline support for your team.",
    color: "bg-cyan-50 text-cyan-600",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for how you work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to run your mobile wellness practice, all in one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-100"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/features" className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700">
            View all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}