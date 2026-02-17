"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  MapPin,
  Users,
  Shield,
  BarChart3,
  Smartphone,
} from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Intelligent booking with automatic availability detection, buffer times, and multi-staff coordination.",
  },
  {
    icon: MapPin,
    title: "Route Optimization",
    description: "AI-powered GPS routing slashes drive time by 40%. Real-time traffic, live tracking, and turn-by-turn navigation.",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Complete patient profiles, treatment history, consent forms, and automated follow-ups in one place.",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with encryption at rest and in transit. SOC 2 Type II certified infrastructure.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Real-time dashboards track revenue, utilization, and growth. Export reports for stakeholders.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Native iOS and Android apps with offline support. Your team stays productive anywhere.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Features() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Everything you need to run your mobile practice
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built from the ground up for medspas, IV therapy clinics, and mobile wellness providers.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20 transition-colors">
                <feature.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}