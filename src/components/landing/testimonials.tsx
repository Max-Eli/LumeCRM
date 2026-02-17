"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Lume has transformed how we manage our mobile IV business. The route optimization saves us hours every week.",
    author: "Dr. Sarah Chen",
    role: "Founder, Vitality IV",
  },
  {
    quote: "The HIPAA-compliant forms builder is exactly what we needed. Clients love signing from their phones.",
    author: "Michael Rodriguez",
    role: "Owner, Glow Medical Spa",
  },
  {
    quote: "Best CRM we've used. The automated reminders cut our no-shows by 60%.",
    author: "Jennifer Williams",
    role: "Director, Rejuvenate Wellness",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
            Loved by wellness professionals
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-medium text-gray-900">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}