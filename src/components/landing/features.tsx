"use client"

import { motion } from "framer-motion"
import { 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  CreditCard, 
  BarChart3,
  Shield,
  Smartphone,
  Clock
} from "lucide-react"
import { Container } from "./container"
import { GradientText } from "./gradient-text"

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered booking that optimizes your calendar and prevents double-bookings automatically.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: MapPin,
    title: "GPS Route Optimization",
    description: "Calculate the most efficient routes for your mobile staff, saving time and fuel costs.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Complete CRM with client profiles, history, preferences, and health records all in one place.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: FileText,
    title: "Digital Forms & Consent",
    description: "Customizable intake forms, consent documents, and waivers with e-signature support.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: CreditCard,
    title: "Integrated Payments",
    description: "Accept payments online with Stripe integration. Send invoices and track revenue automatically.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Deep insights into your business performance with real-time dashboards and custom reports.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with encryption, audit logs, and compliance built-in from day one.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Access your CRM from any device. Works beautifully on phones, tablets, and desktops.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Clock,
    title: "Automated Reminders",
    description: "Reduce no-shows with automated SMS and email reminders for appointments and forms.",
    color: "from-purple-500 to-pink-500",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to{" "}
            <GradientText>run your practice</GradientText>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Powerful tools designed specifically for mobile medspas and IV therapy businesses.
            Manage everything from scheduling to compliance in one unified platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300" />
              <div className="relative h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}