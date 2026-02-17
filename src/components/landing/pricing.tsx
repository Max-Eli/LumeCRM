"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui"

const plans = [
  {
    name: "Starter",
    description: "For solo practitioners",
    price: 49,
    features: [
      "Up to 100 clients",
      "Unlimited appointments",
      "Basic scheduling",
      "Email reminders",
      "Standard reporting",
    ],
    cta: "Start free trial",
  },
  {
    name: "Professional",
    description: "For growing teams",
    price: 149,
    features: [
      "Unlimited clients",
      "GPS route optimization",
      "SMS & email reminders",
      "Custom forms builder",
      "Advanced analytics",
      "Team management",
      "Priority support",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: null,
    features: [
      "Everything in Professional",
      "White-label options",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 phone support",
      "SLA guarantee",
    ],
    cta: "Contact sales",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Simple pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Start with a 14-day free trial. No credit card required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-2xl p-8 ${
                plan.featured
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-medium">
                  Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.featured ? "text-gray-300" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                {plan.price ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold">${plan.price}</span>
                    <span className={`text-sm ${plan.featured ? "text-gray-300" : "text-gray-500"}`}>/month</span>
                  </div>
                ) : (
                  <span className="text-4xl font-semibold">Custom</span>
                )}
              </div>
              <Button
                className={`w-full mb-6 rounded-full ${plan.featured ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`}
                size="lg"
                asChild
              >
                <Link href={plan.price ? "/signup" : "/contact"}>{plan.cta}</Link>
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 flex-shrink-0 ${plan.featured ? "text-orange-400" : "text-orange-600"}`} />
                    <span className={`text-sm ${plan.featured ? "text-gray-300" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}