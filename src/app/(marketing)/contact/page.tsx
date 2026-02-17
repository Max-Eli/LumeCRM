"use client"

import { Navigation, Footer } from "@/components/landing"
import { Button } from "@/components/ui"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">Contact</h1>
          <p className="text-lg text-gray-500 mb-10">
            Have questions? We're here to help.
          </p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
              <input type="email" className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-gray-900 focus:outline-none" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Message</label>
              <textarea className="w-full h-32 px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:outline-none resize-none" placeholder="How can we help?" />
            </div>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 rounded-full h-12">
              Send message
            </Button>
          </div>
          <div className="mt-10 pt-10 border-t border-gray-100">
            <p className="text-gray-500 mb-2">Email us directly</p>
            <Link href="mailto:hello@lumecrm.com" className="text-gray-900 font-medium hover:text-orange-600">
              hello@lumecrm.com
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}