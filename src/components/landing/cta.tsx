"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui"

export function CTA() {
  return (
    <section className="py-24 bg-gray-900 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            Ready to transform your practice?
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
            Join hundreds of mobile wellness businesses already using Lume.
          </p>
          <Button size="lg" asChild className="rounded-full shadow-lg shadow-violet-500/25">
            <Link href="/signup">
              Get started for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  )
}