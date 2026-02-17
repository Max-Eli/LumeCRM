"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Calendar,
  MapPin,
  FileText,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Building2,
  BarChart3,
  Truck,
  User,
  Sparkles,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Services", href: "/dashboard/services", icon: FileText },
  { name: "Routes", href: "/dashboard/routes", icon: Truck },
  { name: "Staff", href: "/dashboard/staff", icon: User },
  { name: "Forms", href: "/dashboard/forms", icon: FileText },
  { name: "Invoices", href: "/dashboard/billing", icon: CreditCard },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
]

const settingsNavigation = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-100 z-50",
          "transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Lume</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 px-3">
          <nav className="space-y-0.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-orange-50 text-orange-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Settings
            </p>
            <nav className="space-y-0.5">
              {settingsNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-orange-50 text-orange-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 w-full p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span className="text-sm font-medium">Sign out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

function Header({ setIsOpen }: { setIsOpen: (open: boolean) => void }) {
  const { data: session } = useSession()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search customers, appointments..."
              className="w-72 lg:w-80 h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-300 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-sm font-medium">
            <Building2 className="h-4 w-4" />
            <span>{session?.user?.organization?.name || "Organization"}</span>
          </div>
          
          <button className="relative p-2.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50">
            <Bell className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-orange-100 text-orange-700 text-sm font-medium">
                  {session?.user?.firstName?.[0] || session?.user?.email?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg p-1"
                >
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {session?.user?.firstName} {session?.user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{session?.user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="lg:pl-64">
        <Header setIsOpen={setSidebarOpen} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}