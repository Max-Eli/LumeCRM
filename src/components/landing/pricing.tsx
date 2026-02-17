"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui"
import { Container } from "./container"
import { GradientText } from "./gradient-text"

const plans = [
  {
    name: "Starter",
    description: "Perfect for solo practitioners just getting started",
    price: 49,
    features: [
      "Up to 100 clients",
      "Unlimited appointments",
      "Basic scheduling",
      "Email reminders",
      "Standard forms",
      "Basic reporting",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing teams with multiple staff",
    price: 149,
    features: [
      "Unlimited clients",
      "Unlimited appointments",
      "GPS route optimization",
      "SMS & email reminders",
      "Custom forms builder",
      "Advanced analytics",
      "Team management",
      "Priority support",
      "API access",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: null,
    features: [
      "Everything in Professional",
      "White-label options",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 phone support",
      "SLA guarantee",
      "Custom training",
      "On-premise deployment",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
      
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, <GradientText>transparent pricing</GradientText>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            No hidden fees. No contracts. Cancel anytime. Start with a 14-day free trial on any plan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl ${
                plan.highlighted
                  ? "border-2 border-violet-500 shadow-xl"
                  : "border border-gray-200 dark:border-gray-800"
              } bg-white dark:bg-gray-900 overflow-hidden`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-indigo-600" />
              )}
              <div className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  {plan.highlighted && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  {plan.price ? (
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                    </div>
                  ) : (
                    <div className="text-5xl font-bold text-gray-900 dark:text-white">
                      Custom
                    </div>
                  )}
                </div>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link href="/signup">
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 px-8 py-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-violet-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            All plans include HIPAA compliance, SSL encryption, and 99.9% uptime SLA.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}