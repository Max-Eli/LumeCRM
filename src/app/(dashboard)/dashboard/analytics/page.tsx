"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  BarChart3,
  PieChart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { cn } from "@/lib/utils"

const revenueData = [
  { month: "Jan", revenue: 42000, appointments: 145, customers: 23 },
  { month: "Feb", revenue: 38500, appointments: 132, customers: 18 },
  { month: "Mar", revenue: 51200, appointments: 168, customers: 31 },
  { month: "Apr", revenue: 48900, appointments: 159, customers: 27 },
  { month: "May", revenue: 55300, appointments: 182, customers: 35 },
  { month: "Jun", revenue: 62100, appointments: 201, customers: 42 },
  { month: "Jul", revenue: 58200, appointments: 189, customers: 38 },
  { month: "Aug", revenue: 71400, appointments: 224, customers: 47 },
  { month: "Sep", revenue: 68700, appointments: 215, customers: 43 },
  { month: "Oct", revenue: 75200, appointments: 238, customers: 52 },
  { month: "Nov", revenue: 82100, appointments: 256, customers: 58 },
  { month: "Dec", revenue: 78900, appointments: 248, customers: 54 },
]

const servicePerformance = [
  { name: "IV Vitamin Therapy", revenue: 48755, appointments: 245, percentage: 17.2 },
  { name: "Botox Treatment", revenue: 66150, appointments: 189, percentage: 23.3 },
  { name: "HydraFacial", revenue: 62088, appointments: 312, percentage: 21.9 },
  { name: "Dermal Fillers", revenue: 63700, appointments: 98, percentage: 22.5 },
  { name: "Chemical Peel", revenue: 42900, appointments: 156, percentage: 15.1 },
]

const staffPerformance = [
  { name: "Dr. Emily Chen", revenue: 182450, appointments: 487, rating: 4.9 },
  { name: "Sarah Miller, RN", revenue: 156780, appointments: 623, rating: 4.9 },
  { name: "Dr. James Wilson", revenue: 128900, appointments: 342, rating: 4.8 },
  { name: "Lisa Anderson, RN", revenue: 98560, appointments: 412, rating: 4.7 },
]

const customerMetrics = [
  { label: "New Customers", value: 423, change: "+12.3%", trend: "up" },
  { label: "Returning Customers", value: 892, change: "+8.7%", trend: "up" },
  { label: "Avg. Visit Value", value: "$227", change: "+5.2%", trend: "up" },
  { label: "Customer Lifetime Value", value: "$1,847", change: "+9.8%", trend: "up" },
]

const appointmentMetrics = [
  { label: "Completed", value: 2247, percentage: 78 },
  { label: "No-Shows", value: 89, percentage: 3 },
  { label: "Cancelled", value: 156, percentage: 5 },
  { label: "Rescheduled", value: 392, percentage: 14 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("12m")

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0)
  const totalAppointments = revenueData.reduce((sum, d) => sum + d.appointments, 0)
  const totalNewCustomers = revenueData.reduce((sum, d) => sum + d.customers, 0)
  const avgRevenue = totalRevenue / revenueData.length

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics & Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track performance and gain insights into your business.
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, change: "+18.2%", trend: "up", icon: DollarSign, color: "from-emerald-500 to-green-500" },
          { name: "Total Appointments", value: totalAppointments.toLocaleString(), change: "+15.8%", trend: "up", icon: Calendar, color: "from-violet-500 to-purple-500" },
          { name: "New Customers", value: totalNewCustomers.toLocaleString(), change: "+12.3%", trend: "up", icon: Users, color: "from-blue-500 to-cyan-500" },
          { name: "Avg. Rating", value: "4.87", change: "+0.12", trend: "up", icon: Star, color: "from-amber-500 to-orange-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end gap-2">
              {revenueData.map((data, index) => {
                const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
                const height = (data.revenue / maxRevenue) * 100
                return (
                  <motion.div
                    key={data.month}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="relative w-full group">
                      <div className="w-full rounded-t-lg bg-gradient-to-t from-violet-600 to-indigo-500 cursor-pointer hover:from-violet-500 hover:to-indigo-400 transition-colors relative">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ${data.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{data.month}</span>
                  </motion.div>
                )
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-300" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Appointments</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
            <CardDescription>Revenue by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {servicePerformance.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {service.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        ${service.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${service.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <span>{service.appointments} appointments</span>
                      <span>{service.percentage}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Status</CardTitle>
            <CardDescription>Distribution breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-[200px] flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {appointmentMetrics.reduce((acc, metric, index) => {
                    const prevOffset = acc.offset
                    const offset = (metric.percentage / 100) * 251.2
                    acc.elements.push(
                      <circle
                        key={metric.label}
                        cx="40"
                        cy="40"
                        r="40"
                        fill="none"
                        stroke={
                          index === 0 ? "#10b981" :
                          index === 1 ? "#ef4444" :
                          index === 2 ? "#f59e0b" : "#6366f1"
                        }
                        strokeWidth="20"
                        strokeDasharray={`${offset} ${251.2 - offset}`}
                        strokeDashoffset={-prevOffset}
                        className="transition-all duration-1000"
                      />
                    )
                    acc.offset += offset
                    return acc
                  }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {appointmentMetrics[0].value}
                    </p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {appointmentMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    metric.label === "Completed" ? "bg-emerald-500" :
                    metric.label === "No-Shows" ? "bg-red-500" :
                    metric.label === "Cancelled" ? "bg-amber-500" : "bg-violet-500"
                  }`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">
                    {metric.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
            <CardDescription>Revenue and appointments by staff member</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffPerformance.map((staff, index) => (
                <motion.div
                  key={staff.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    {staff.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {staff.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {staff.appointments} appointments
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${staff.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end gap-1 text-sm text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      {staff.rating}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Metrics</CardTitle>
            <CardDescription>Key customer acquisition metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {customerMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                >
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{metric.label}</p>
                  <div className={`flex items-center gap-1 text-xs font-medium mt-2 ${
                    metric.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {metric.change}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}