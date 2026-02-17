"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Shield, BarChart3, Smartphone } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Intelligent booking with automatic availability and buffer time management.",
  },
  {
    icon: MapPin,
    title: "Route Optimization",
    description: "AI-powered GPS routing reduces drive time by up to 40%.",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Complete patient profiles, treatment history, and consent forms.",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with encryption at rest and in transit.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Real-time dashboards for revenue, utilization, and growth tracking.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Native iOS and Android apps with offline support.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Built for medspas, IV therapy clinics, and mobile wellness providers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}