"use client"

import { motion } from "framer-motion"

const logos = [
  "Glow MedSpa",
  "Vitality IV",
  "Rejuvenate Wellness",
  "Pure Aesthetics",
  "Radiance MedSpa",
  "Restore Health",
  "Mobile Health Co",
  "Skin & Body Spa",
]

const awards = [
  { name: "Capterra", badge: "Best Value 2025" },
  { name: "G2", badge: "High Performer" },
  { name: "Software Advice", badge: "Best Support" },
]

export function SocialProof() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm text-gray-500 mb-6">Trusted by leading mobile wellness practices</p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {logos.map((logo, i) => (
              <div key={i} className="text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors cursor-default">
                {logo}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-8 pt-8 border-t border-gray-100">
          {awards.map((award) => (
            <div key={award.name} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <span className="text-orange-600 text-lg">★</span>
              </div>
              <div>
                <div className="text-xs text-gray-500">{award.name}</div>
                <div className="text-sm font-medium text-gray-900">{award.badge}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}