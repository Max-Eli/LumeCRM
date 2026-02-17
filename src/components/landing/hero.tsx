"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Sparkles, Star, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-violet-50 via-purple-50/50 to-transparent dark:from-violet-950/30 dark:via-purple-950/20 dark:to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-1.5 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              New: AI-powered route optimization
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-violet-500 transition-colors" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            The modern CRM for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              mobile wellness
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
            Manage appointments, optimize routes, and grow your medspa or IV therapy business 
            with a platform built for teams that deliver care at home.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <Button size="lg" asChild className="h-12 px-8 text-base font-medium rounded-full shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-shadow">
            <Link href="/signup">
              Start free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base font-medium rounded-full">
            <Link href="/login">
              <Play className="mr-2 h-4 w-4" />
              Watch demo
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Trusted by <span className="font-semibold text-gray-900 dark:text-white">500+</span> mobile wellness businesses
          </p>
        </motion.div>
      </div>
    </section>
  )
}