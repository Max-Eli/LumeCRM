"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Clock,
  Users,
  TrendingUp,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield,
 Award,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Avatar, AvatarFallback, Input, Textarea } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { cn } from "@/lib/utils"

const staff = [
  {
    id: "1",
    firstName: "Emily",
    lastName: "Chen",
    email: "emily.chen@lumecrm.com",
    phone: "(310) 555-0101",
    title: "Medical Director",
    department: "Medical",
    status: "ACTIVE",
    isMobile: true,
    specializations: ["Botox", "Dermal Fillers", "IV Therapy"],
    appointments: 487,
    revenue: 182450,
    rating: 4.9,
    totalReviews: 156,
    hireDate: "2022-01-15",
    avatar: "EC",
  },
  {
    id: "2",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@lumecrm.com",
    phone: "(310) 555-0102",
    title: "Physician Assistant",
    department: "Medical",
    status: "ACTIVE",
    isMobile: true,
    specializations: ["Botox", "Chemical Peels"],
    appointments: 342,
    revenue: 128900,
    rating: 4.8,
    totalReviews: 98,
    hireDate: "2022-03-01",
    avatar: "JW",
  },
  {
    id: "3",
    firstName: "Sarah",
    lastName: "Miller",
    email: "sarah.miller@lumecrm.com",
    phone: "(310) 555-0103",
    title: "Registered Nurse",
    department: "Nursing",
    status: "ACTIVE",
    isMobile: true,
    specializations: ["IV Therapy", "HydraFacial", "Chemical Peels"],
    appointments: 623,
    revenue: 156780,
    rating: 4.9,
    totalReviews: 203,
    hireDate: "2021-08-10",
    avatar: "SM",
  },
  {
    id: "4",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@lumecrm.com",
    phone: "(310) 555-0104",
    title: "Registered Nurse",
    department: "Nursing",
    status: "ACTIVE",
    isMobile: true,
    specializations: ["HydraFacial", "Skin Treatments"],
    appointments: 412,
    revenue: 98560,
    rating: 4.7,
    totalReviews: 89,
    hireDate: "2023-01-20",
    avatar: "LA",
  },
  {
    id: "5",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@lumecrm.com",
    phone: "(310) 555-0105",
    title: "Aesthetician",
    department: "Aesthetics",
    status: "ON_LEAVE",
    isMobile: false,
    specializations: ["Facials", "Chemical Peels"],
    appointments: 0,
    revenue: 0,
    rating: 4.6,
    totalReviews: 67,
    hireDate: "2022-06-15",
    avatar: "MB",
  },
]

const statusColors: Record<string, string> = {
  ACTIVE: "success",
  ON_LEAVE: "warning",
  TERMINATED: "danger",
}

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredStaff = staff.filter((member) => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || member.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Staff
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your team members and their schedules.
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Total Staff", value: "5", icon: Users, color: "from-violet-500 to-purple-500" },
          { name: "Active Today", value: "4", icon: UserCheck, color: "from-emerald-500 to-green-500" },
          { name: "Total Appointments", value: "1,864", icon: Calendar, color: "from-blue-500 to-cyan-500" },
          { name: "Avg. Rating", value: "4.78", icon: Star, color: "from-amber-500 to-orange-500" },
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

      <Card>
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                <SelectItem value="TERMINATED">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Appointments
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredStaff.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {member.firstName} {member.lastName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {member.specializations.slice(0, 2).map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                            {member.specializations.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{member.specializations.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-gray-900 dark:text-white">{member.title}</p>
                        <p className="text-sm text-gray-500">{member.department}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-3.5 w-3.5" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="h-3.5 w-3.5" />
                          {member.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={statusColors[member.status] as any}>
                        {member.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 dark:text-white font-medium">
                        {member.appointments.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 dark:text-white font-medium">
                        ${member.revenue.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {member.rating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {member.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({member.totalReviews})
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Staff Member</DialogTitle>
            <DialogDescription>
              Add a new team member to your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Doe" />
            <Input label="Email" type="email" placeholder="john@lumecrm.com" />
            <Input label="Phone" type="tel" placeholder="(555) 123-4567" />
            <Input label="Title" placeholder="Registered Nurse" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="nursing">Nursing</SelectItem>
                <SelectItem value="aesthetics">Aesthetics</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Input label="Hourly Rate ($)" type="number" placeholder="50" />
            <Input label="Commission (%)" type="number" placeholder="10" />
            <Textarea label="Specializations" placeholder="e.g., Botox, IV Therapy, Chemical Peels (one per line)" className="col-span-2" rows={3} />
            <div className="col-span-2 flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span className="text-sm">Available for mobile visits</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span className="text-sm">Accepting new clients</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Add Staff Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}