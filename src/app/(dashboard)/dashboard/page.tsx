"use client"

import { motion } from "framer-motion"
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui"
import { Button } from "@/components/ui"
import { Badge } from "@/components/ui"
import { Avatar, AvatarFallback } from "@/components/ui"

const stats = [
  {
    name: "Total Revenue",
    value: "$48,352",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Appointments",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: Calendar,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Customers",
    value: "892",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "Avg. Rating",
    value: "4.9",
    change: "+0.2",
    trend: "up",
    icon: TrendingUp,
    color: "bg-orange-50 text-orange-600",
  },
]

const upcomingAppointments = [
  {
    id: "1",
    customer: "Sarah Johnson",
    service: "IV Vitamin Therapy",
    time: "9:00 AM",
    address: "123 Oak Street, Beverly Hills",
    status: "confirmed",
    staff: "Dr. Emily Chen",
  },
  {
    id: "2",
    customer: "Michael Brown",
    service: "Botox Treatment",
    time: "10:30 AM",
    address: "456 Maple Ave, Los Angeles",
    status: "pending",
    staff: "Dr. James Wilson",
  },
  {
    id: "3",
    customer: "Emily Davis",
    service: "Chemical Peel",
    time: "12:00 PM",
    address: "789 Pine Rd, Santa Monica",
    status: "confirmed",
    staff: "Sarah Miller, RN",
  },
  {
    id: "4",
    customer: "Robert Wilson",
    service: "HydraFacial",
    time: "2:00 PM",
    address: "321 Elm Blvd, Hollywood",
    status: "confirmed",
    staff: "Lisa Anderson, RN",
  },
  {
    id: "5",
    customer: "Amanda Chen",
    service: "Lip Fillers",
    time: "3:30 PM",
    address: "555 Sunset Dr, Malibu",
    status: "pending",
    staff: "Dr. Emily Chen",
  },
]

const recentActivity = [
  {
    id: "1",
    type: "appointment",
    title: "New appointment booked",
    description: "Sarah Johnson booked IV Vitamin Therapy",
    time: "5 min ago",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment received",
    description: "$350 from Michael Brown for Botox Treatment",
    time: "12 min ago",
  },
  {
    id: "3",
    type: "customer",
    title: "New customer registered",
    description: "Emily Davis signed up through the portal",
    time: "25 min ago",
  },
  {
    id: "4",
    type: "form",
    title: "Consent form signed",
    description: "Robert Wilson signed consent for HydraFacial",
    time: "1 hour ago",
  },
  {
    id: "5",
    type: "review",
    title: "New 5-star review",
    description: "Great review from Amanda Chen",
    time: "2 hours ago",
  },
]

const weeklyData = [
  { day: "Mon", appointments: 12, revenue: 4200 },
  { day: "Tue", appointments: 15, revenue: 5100 },
  { day: "Wed", appointments: 18, revenue: 6300 },
  { day: "Thu", appointments: 14, revenue: 4900 },
  { day: "Fri", appointments: 22, revenue: 7700 },
  { day: "Sat", appointments: 25, revenue: 8750 },
  { day: "Sun", appointments: 10, revenue: 3500 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, John
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your practice today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            Download Report
          </Button>
          <Button>
            New Appointment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Weekly appointments and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between gap-4 pt-4">
                {weeklyData.map((data, index) => (
                  <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.revenue / 10000) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full rounded-t-lg bg-orange-500"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.appointments / 30) * 60}px` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full rounded-t-lg bg-orange-200"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {data.day}
                    </span>
                  </div>
                ))}
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className={`mt-1 p-1.5 rounded-lg ${
                    activity.type === "appointment" ? "bg-violet-100 text-violet-600 dark:bg-violet-900/50" :
                    activity.type === "payment" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50" :
                    activity.type === "customer" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50" :
                    activity.type === "form" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/50" :
                    "bg-pink-100 text-pink-600 dark:bg-pink-900/50"
                  }`}>
                    {activity.type === "appointment" && <Calendar className="h-3.5 w-3.5" />}
                    {activity.type === "payment" && <DollarSign className="h-3.5 w-3.5" />}
                    {activity.type === "customer" && <Users className="h-3.5 w-3.5" />}
                    {activity.type === "form" && <CheckCircle2 className="h-3.5 w-3.5" />}
                    {activity.type === "review" && <TrendingUp className="h-3.5 w-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>You have {upcomingAppointments.length} appointments scheduled</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Staff
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.tr
                    key={appointment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {appointment.customer.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {appointment.customer}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {appointment.service}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {appointment.time}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 max-w-[200px] truncate">
                        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        {appointment.address}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {appointment.staff}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={appointment.status === "confirmed" ? "success" : "warning"}>
                        {appointment.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}