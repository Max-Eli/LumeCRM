"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "500+", label: "Active businesses" },
  { value: "2M+", label: "Appointments scheduled" },
  { value: "$50M+", label: "Revenue processed" },
  { value: "99.9%", label: "Uptime SLA" },
]

export function SocialProof() {
  return (
    <section className="py-16 border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}