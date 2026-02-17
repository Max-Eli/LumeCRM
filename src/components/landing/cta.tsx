"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui"
import { Container } from "./container"
import { GradientText } from "./gradient-text"

const benefits = [
  "No credit card required",
  "14-day free trial",
  "Full access to all features",
  "Cancel anytime",
]

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-white/10 rounded-full blur-3xl" />
      
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to <GradientText from="from-white" via="via-violet-200" to="to-white">transform your practice</GradientText>?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-violet-100 mb-8">
            Join thousands of mobile medspas and IV therapy businesses who are saving time, 
            reducing no-shows, and growing their revenue with Lume.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="xl" variant="secondary" asChild>
              <Link href="/signup">
                Start your free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/demo">
                Schedule a demo
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-violet-100">
                <CheckCircle2 className="h-5 w-5 text-violet-300" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}