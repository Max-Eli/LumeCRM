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
    highlighted: false,
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
    highlighted: true,
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
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-gray-900 dark:bg-gray-800 text-white ring-2 ring-violet-500"
                  : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-500 text-white text-xs font-medium">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-500 dark:text-gray-400"}`}>
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                {plan.price ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-500"}`}>/month</span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold">Custom</span>
                )}
              </div>
              <Button
                className="w-full mb-6"
                variant={plan.highlighted ? "default" : "outline"}
                size="lg"
                asChild
              >
                <Link href="/signup">{plan.cta}</Link>
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 flex-shrink-0 ${plan.highlighted ? "text-violet-400" : "text-violet-600"}`} />
                    <span className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-600 dark:text-gray-400"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8"
        >
          All plans include HIPAA compliance and SSL encryption.
        </motion.p>
      </div>
    </section>
  )
}