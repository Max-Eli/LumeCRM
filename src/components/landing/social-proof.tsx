"use client"

import { motion } from "framer-motion"
import { Container } from "./container"
import { GradientText } from "./gradient-text"

const stats = [
  { value: "2,500+", label: "Businesses trust Lume" },
  { value: "1.2M+", label: "Appointments scheduled" },
  { value: "$85M+", label: "Revenue processed" },
  { value: "99.9%", label: "Uptime guaranteed" },
]

const logos = [
  { name: "Glow Medical Spa", initial: "G" },
  { name: "Vitality IV", initial: "V" },
  { name: "Rejuvenate Wellness", initial: "R" },
  { name: "Pure Aesthetics", initial: "P" },
  { name: "Radiance MedSpa", initial: "RM" },
  { name: "Restore Health", initial: "RH" },
]

export function SocialProof() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                <GradientText>{stat.value}</GradientText>
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
            Trusted by leading mobile wellness practices
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center gap-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                {logo.initial}
              </div>
              <span className="text-lg font-semibold hidden sm:block">{logo.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}