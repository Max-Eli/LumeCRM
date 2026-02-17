"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui"

const solutions = [
  { name: "MedSpa", href: "/medspa", description: "IV therapy & aesthetic treatments" },
  { name: "IV Therapy", href: "/iv-therapy", description: "Mobile IV hydration services" },
  { name: "Mobile Wellness", href: "/mobile-wellness", description: "At-home wellness providers" },
]

const features = [
  { name: "Smart Scheduling", href: "#features" },
  { name: "Route Optimization", href: "#features" },
  { name: "Client Management", href: "#features" },
  { name: "Forms & Consent", href: "#features" },
  { name: "Payments", href: "#features" },
  { name: "Analytics", href: "#features" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Lume</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <div className="relative" onMouseEnter={() => setOpenDropdown("solutions")} onMouseLeave={() => setOpenDropdown(null)}>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">
                Solutions <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {openDropdown === "solutions" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-2 min-w-[220px]">
                      {solutions.map((item) => (
                        <Link key={item.name} href={item.href} className="block px-4 py-3 rounded-lg hover:bg-gray-50">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" onMouseEnter={() => setOpenDropdown("features")} onMouseLeave={() => setOpenDropdown(null)}>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">
                Features <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {openDropdown === "features" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-2 min-w-[200px]">
                      {features.map((item) => (
                        <Link key={item.name} href={item.href} className="block px-4 py-2.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">
              Pricing
            </Link>
            <Link href="/about" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">
              About
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" asChild className="text-gray-600">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild className="bg-gray-900 hover:bg-gray-800 rounded-full px-6">
              <Link href="/signup">Get a demo</Link>
            </Button>
          </div>

          <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-6 py-4 space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Solutions</p>
                {solutions.map((item) => (
                  <Link key={item.name} href={item.href} className="block px-3 py-2 text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Features</p>
                {features.map((item) => (
                  <Link key={item.name} href={item.href} className="block px-3 py-2 text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Button variant="ghost" asChild className="w-full justify-center">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild className="w-full bg-gray-900 rounded-full">
                  <Link href="/signup">Get a demo</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}