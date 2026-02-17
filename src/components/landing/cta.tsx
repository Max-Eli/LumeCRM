"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui"

const benefits = [
  "No credit card required",
  "14-day free trial",
  "Full access to all features",
  "Cancel anytime",
]

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your practice?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Join 500+ mobile wellness businesses already using Lume to streamline operations and grow revenue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="lg" asChild className="h-14 px-8 text-base bg-orange-500 hover:bg-orange-600 rounded-xl">
              <Link href="/signup">
                Get started free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-xl">
              <Link href="/contact">
                Talk to sales
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="h-5 w-5 text-orange-400" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}