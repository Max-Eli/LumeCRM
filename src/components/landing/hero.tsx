"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-orange-700">
                Trusted by 500+ mobile wellness businesses
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The complete CRM for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                mobile wellness
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Scheduling, route optimization, forms, and payments—all in one platform designed for medspas, IV therapy clinics, and mobile healthcare providers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" asChild className="h-14 px-8 text-base font-medium bg-gray-900 hover:bg-gray-800 rounded-xl">
                <Link href="/signup">
                  Get started free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-8 text-base font-medium rounded-xl border-gray-200">
                <Link href="/demo">
                  <Play className="mr-2 h-5 w-5" />
                  Watch 2-min demo
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {["S", "M", "J", "A"].map((initial, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-sm font-medium border-2 border-white">
                    {initial}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.9/5 from 200+ reviews</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-orange-100/50 border border-gray-100 overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-gray-400 text-xs ml-2">Lume Dashboard</span>
              </div>
              <div className="p-4 bg-gray-50 aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
                    <span className="text-white text-2xl font-bold">L</span>
                  </div>
                  <p className="text-gray-500 text-sm">Interactive product demo</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-lg">↑</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Revenue up 32%</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}