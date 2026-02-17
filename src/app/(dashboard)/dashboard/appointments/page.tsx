"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Phone,
  MoreHorizontal,
  Filter,
  Calendar as CalendarIcon,
  List,
  Grid3X3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Car,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Avatar, AvatarFallback } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const appointments = [
  {
    id: "1",
    customer: { name: "Sarah Johnson", email: "sarah.johnson@email.com", phone: "(310) 555-0123" },
    service: "IV Vitamin Therapy",
    staff: { name: "Dr. Emily Chen", avatar: "EC" },
    date: "2024-01-22",
    time: "09:00",
    duration: 60,
    address: "123 Oak Street, Beverly Hills, CA 90210",
    status: "CONFIRMED",
    isMobile: true,
    notes: "Prefers left arm for IV",
  },
  {
    id: "2",
    customer: { name: "Michael Brown", email: "michael.brown@email.com", phone: "(323) 555-0456" },
    service: "Botox Treatment",
    staff: { name: "Dr. James Wilson", avatar: "JW" },
    date: "2024-01-22",
    time: "10:30",
    duration: 45,
    address: "456 Maple Ave, Los Angeles, CA 90001",
    status: "PENDING",
    isMobile: true,
    notes: "",
  },
  {
    id: "3",
    customer: { name: "Emily Davis", email: "emily.davis@email.com", phone: "(424) 555-0789" },
    service: "Chemical Peel",
    staff: { name: "Sarah Miller, RN", avatar: "SM" },
    date: "2024-01-22",
    time: "12:00",
    duration: 90,
    address: "789 Pine Rd, Santa Monica, CA 90401",
    status: "CONFIRMED",
    isMobile: true,
    notes: "Allergic to latex",
  },
  {
    id: "4",
    customer: { name: "Robert Wilson", email: "robert.wilson@email.com", phone: "(213) 555-0321" },
    service: "HydraFacial",
    staff: { name: "Lisa Anderson, RN", avatar: "LA" },
    date: "2024-01-22",
    time: "14:00",
    duration: 60,
    address: "321 Elm Blvd, Hollywood, CA 90028",
    status: "CONFIRMED",
    isMobile: true,
    notes: "",
  },
  {
    id: "5",
    customer: { name: "Amanda Chen", email: "amanda.chen@email.com", phone: "(310) 555-0654" },
    service: "Lip Fillers",
    staff: { name: "Dr. Emily Chen", avatar: "EC" },
    date: "2024-01-22",
    time: "15:30",
    duration: 60,
    address: "555 Sunset Dr, Malibu, CA 90265",
    status: "PENDING",
    isMobile: true,
    notes: "Returning client - likes natural look",
  },
]

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
]

const staffMembers = [
  { id: "1", name: "Dr. Emily Chen", avatar: "EC", color: "violet" },
  { id: "2", name: "Dr. James Wilson", avatar: "JW", color: "blue" },
  { id: "3", name: "Sarah Miller, RN", avatar: "SM", color: "emerald" },
  { id: "4", name: "Lisa Anderson, RN", avatar: "LA", color: "amber" },
]

const statusColors: Record<string, string> = {
  CONFIRMED: "success",
  PENDING: "warning",
  IN_PROGRESS: "info",
  COMPLETED: "success",
  CANCELLED: "danger",
  NO_SHOW: "danger",
}

export default function AppointmentsPage() {
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<string>("all")

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate)
    if (view === "calendar") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    } else {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    }
    setSelectedDate(newDate)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const getAppointmentsForDate = (date: Date | null) => {
    if (!date) return []
    const dateStr = date.toISOString().split("T")[0]
    return appointments.filter((apt) => apt.date === dateStr)
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Appointments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Schedule and manage client appointments.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 p-1">
            <Button
              variant={view === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("calendar")}
              className="rounded-lg"
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="rounded-lg"
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => navigateDate("prev")}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {view === "calendar"
                      ? selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                      : formatDate(selectedDate)}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={() => navigateDate("next")}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Staff</SelectItem>
                      {staffMembers.map((staff) => (
                        <SelectItem key={staff.id} value={staff.id}>
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => setSelectedDate(new Date())}>
                    Today
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {view === "calendar" ? (
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div
                        key={day}
                        className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/50"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {getDaysInMonth(selectedDate).map((date, index) => {
                      const dayAppointments = getAppointmentsForDate(date)
                      return (
                        <div
                          key={index}
                          className={cn(
                            "min-h-[120px] border-b border-r border-gray-100 dark:border-gray-800 p-2 transition-colors",
                            date && "hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer",
                            date && isSelected(date) && "bg-violet-50 dark:bg-violet-950/30"
                          )}
                          onClick={() => date && setSelectedDate(date)}
                        >
                          {date && (
                            <>
                              <div className={cn(
                                "w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium mb-1",
                                isToday(date) && "bg-violet-600 text-white",
                                isSelected(date) && !isToday(date) && "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                              )}>
                                {date.getDate()}
                              </div>
                              <div className="space-y-1">
                                {dayAppointments.slice(0, 3).map((apt) => (
                                  <div
                                    key={apt.id}
                                    className={cn(
                                      "text-xs px-1.5 py-0.5 rounded truncate",
                                      apt.status === "CONFIRMED" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
                                      apt.status === "PENDING" && "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
                                    )}
                                  >
                                    {apt.time} - {apt.customer.name.split(" ")[0]}
                                  </div>
                                ))}
                                {dayAppointments.length > 3 && (
                                  <div className="text-xs text-gray-500 px-1.5">
                                    +{dayAppointments.length - 3} more
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {timeSlots.map((slot) => {
                    const slotAppointments = appointments.filter((apt) => apt.time === slot)
                    return (
                      <div key={slot} className="flex">
                        <div className="w-20 py-4 px-4 text-sm font-medium text-gray-500 border-r border-gray-100 dark:border-gray-800 flex-shrink-0">
                          {slot}
                        </div>
                        <div className="flex-1 p-2">
                          {slotAppointments.length > 0 ? (
                            <div className="space-y-2">
                              {slotAppointments.map((apt) => (
                                <motion.div
                                  key={apt.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex items-center gap-4 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900"
                                >
                                  <Avatar>
                                    <AvatarFallback>{apt.staff.avatar}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium text-gray-900 dark:text-white">
                                        {apt.customer.name}
                                      </p>
                                      <Badge variant={statusColors[apt.status] as any}>
                                        {apt.status}
                                      </Badge>
                                      {apt.isMobile && (
                                        <Car className="h-4 w-4 text-violet-600" />
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {apt.service} • {apt.duration} min
                                    </p>
                                  </div>
                                  <div className="text-right text-sm text-gray-500">
                                    <p>{apt.address.split(",")[0]}</p>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="h-12 flex items-center justify-center text-sm text-gray-400">
                              Available
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Selected Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatDate(selectedDate)}
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Appointments</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {getAppointmentsForDate(selectedDate).length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Confirmed</span>
                  <span className="font-medium text-emerald-600">
                    {getAppointmentsForDate(selectedDate).filter(a => a.status === "CONFIRMED").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Pending</span>
                  <span className="font-medium text-amber-600">
                    {getAppointmentsForDate(selectedDate).filter(a => a.status === "PENDING").length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Mobile Visits</span>
                  <span className="font-medium text-violet-600">
                    {getAppointmentsForDate(selectedDate).filter(a => a.isMobile).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Staff Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {staffMembers.map((staff) => {
                  const staffAppointments = getAppointmentsForDate(selectedDate).filter(
                    (apt) => apt.staff.name === staff.name
                  )
                  return (
                    <div key={staff.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn(
                          staff.color === "violet" && "bg-violet-100 text-violet-700",
                          staff.color === "blue" && "bg-blue-100 text-blue-700",
                          staff.color === "emerald" && "bg-emerald-100 text-emerald-700",
                          staff.color === "amber" && "bg-amber-100 text-amber-700",
                        )}>
                          {staff.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {staff.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {staffAppointments.length} appointments
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Appointment</DialogTitle>
            <DialogDescription>
              Schedule a new appointment for a customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="Customer Name" placeholder="Search customers..." />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iv-therapy">IV Vitamin Therapy</SelectItem>
                <SelectItem value="botox">Botox Treatment</SelectItem>
                <SelectItem value="chemical-peel">Chemical Peel</SelectItem>
                <SelectItem value="hydrafacial">HydraFacial</SelectItem>
                <SelectItem value="lip-fillers">Lip Fillers</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>
              <SelectContent>
                {staffMembers.map((staff) => (
                  <SelectItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input label="Duration (minutes)" type="number" placeholder="60" />
            <Input label="Date" type="date" />
            <Input label="Time" type="time" />
            <div className="col-span-2">
              <Input label="Address" placeholder="Enter appointment address" />
            </div>
            <div className="col-span-2">
              <Textarea label="Notes" placeholder="Any special instructions or notes..." rows={3} />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Create Appointment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}