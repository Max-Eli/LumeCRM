import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Lume CRM - Professional CRM for Mobile Medspas & IV Therapy",
    template: "%s | Lume CRM",
  },
  description: "Streamline your medspa or IV therapy business with intelligent scheduling, GPS-optimized routing, and HIPAA-compliant client management.",
  keywords: ["CRM", "medspa", "IV therapy", "scheduling", "appointment management", "HIPAA compliant", "mobile wellness"],
  authors: [{ name: "Lume CRM" }],
  creator: "Lume CRM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumecrm.com",
    siteName: "Lume CRM",
    title: "Lume CRM - Professional CRM for Mobile Medspas & IV Therapy",
    description: "Streamline your medspa or IV therapy business with intelligent scheduling, GPS-optimized routing, and HIPAA-compliant client management.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lume CRM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lume CRM - Professional CRM for Mobile Medspas & IV Therapy",
    description: "Streamline your medspa or IV therapy business with intelligent scheduling, GPS-optimized routing, and HIPAA-compliant client management.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}