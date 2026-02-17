import { Navigation, Hero, Features, SocialProof, Pricing, Testimonials, CTA, Footer } from "@/components/landing"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <SocialProof />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}