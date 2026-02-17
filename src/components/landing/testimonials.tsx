"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Container } from "./container"

const testimonials = [
  {
    quote: "Lume has transformed how we manage our mobile IV therapy business. The route optimization alone saves us hours every week.",
    author: "Dr. Sarah Chen",
    role: "Founder, Vitality IV",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "The HIPAA-compliant forms builder is exactly what we needed. Our clients love signing consent forms from their phones.",
    author: "Michael Rodriguez",
    role: "Owner, Glow Medical Spa",
    avatar: "MR",
    rating: 5,
  },
  {
    quote: "Best CRM we've used. The scheduling is intuitive, and the automated reminders have cut our no-shows by 60%.",
    author: "Jennifer Williams",
    role: "Director, Rejuvenate Wellness",
    avatar: "JW",
    rating: 5,
  },
  {
    quote: "The GPS routing feature is a game-changer for our team of nurses. We've reduced travel time by 40%.",
    author: "David Park",
    role: "Operations Manager, Mobile Health Co",
    avatar: "DP",
    rating: 5,
  },
  {
    quote: "Outstanding support team and the platform keeps getting better. The analytics help us make smarter business decisions.",
    author: "Amanda Foster",
    role: "CEO, Radiance MedSpa",
    avatar: "AF",
    rating: 5,
  },
  {
    quote: "Switching to Lume was the best decision for our practice. Everything we need in one place.",
    author: "Dr. Robert Kim",
    role: "Medical Director, Restore Health",
    avatar: "RK",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
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
            Loved by wellness professionals
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            See why thousands of medspas and IV therapy practices choose Lume for their business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 blur transition duration-300" />
              <div className="relative h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <Quote className="h-8 w-8 text-violet-200 dark:text-violet-800 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}