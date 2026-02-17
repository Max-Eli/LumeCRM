"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Link from "next/link"

const testimonials = [
  {
    quote: "Lume has transformed how we manage our mobile IV business. The route optimization saves us hours every week and our clients love the easy booking.",
    author: "Dr. Sarah Chen",
    role: "Founder, Vitality IV",
    image: "SC",
  },
  {
    quote: "The HIPAA-compliant forms builder is exactly what we needed. Clients can sign consent forms from their phones before appointments.",
    author: "Michael Rodriguez",
    role: "Owner, Glow Medical Spa",
    image: "MR",
  },
  {
    quote: "Switching to Lume increased our revenue by 32% in the first quarter. The automated reminders cut no-shows by 60%.",
    author: "Jennifer Williams",
    role: "Director, Rejuvenate Wellness",
    image: "JW",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Loved by wellness professionals
          </h2>
          <p className="text-lg text-gray-600">
            See why practices are switching to Lume
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-medium">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/testimonials" className="text-orange-600 font-medium hover:text-orange-700">
            Read more success stories →
          </Link>
        </div>
      </div>
    </section>
  )
}