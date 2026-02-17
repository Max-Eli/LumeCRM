"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Users,
  TrendingUp,
  Download,
  Upload,
  ChevronDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Badge, Avatar, AvatarFallback } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"

const customers = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "(310) 555-0123",
    address: "123 Oak Street, Beverly Hills, CA 90210",
    status: "ACTIVE",
    totalVisits: 12,
    totalSpent: 4580,
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-22",
    rating: 4.9,
    tags: ["VIP", "Monthly Member"],
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    phone: "(323) 555-0456",
    address: "456 Maple Avenue, Los Angeles, CA 90001",
    status: "ACTIVE",
    totalVisits: 8,
    totalSpent: 3200,
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-25",
    rating: 5.0,
    tags: ["New Client"],
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@email.com",
    phone: "(424) 555-0789",
    address: "789 Pine Road, Santa Monica, CA 90401",
    status: "ACTIVE",
    totalVisits: 24,
    totalSpent: 9840,
    lastVisit: "2024-01-18",
    nextAppointment: "2024-01-20",
    rating: 4.8,
    tags: ["VIP", "Referral"],
  },
  {
    id: "4",
    firstName: "Robert",
    lastName: "Wilson",
    email: "robert.wilson@email.com",
    phone: "(213) 555-0321",
    address: "321 Elm Boulevard, Hollywood, CA 90028",
    status: "INACTIVE",
    totalVisits: 3,
    totalSpent: 950,
    lastVisit: "2023-12-15",
    rating: 4.5,
    tags: [],
  },
  {
    id: "5",
    firstName: "Amanda",
    lastName: "Chen",
    email: "amanda.chen@email.com",
    phone: "(310) 555-0654",
    address: "555 Sunset Drive, Malibu, CA 90265",
    status: "LEAD",
    totalVisits: 0,
    totalSpent: 0,
    lastVisit: null,
    rating: null,
    tags: ["Lead"],
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = [
    {
      name: "Total Customers",
      value: "892",
      change: "+48",
      icon: Users,
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Active This Month",
      value: "423",
      change: "+12%",
      icon: TrendingUp,
      color: "from-emerald-500 to-green-500",
    },
    {
      name: "Lifetime Value",
      value: "$127K",
      change: "+8.5%",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Avg. Rating",
      value: "4.87",
      change: "+0.12",
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your customer database and view their history.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
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
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-600">{stat.change}</span>
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
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="LEAD">Lead</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Visits
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {customer.firstName[0]}{customer.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {customer.firstName} {customer.lastName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {customer.tags.map((tag) => (
                              <Badge key={tag} variant="default" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="h-3.5 w-3.5" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="h-3.5 w-3.5" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        variant={
                          customer.status === "ACTIVE" ? "success" :
                          customer.status === "LEAD" ? "warning" : "secondary"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 dark:text-white font-medium">
                        {customer.totalVisits}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {customer.lastVisit ? `Last: ${customer.lastVisit}` : "No visits yet"}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 dark:text-white font-medium">
                        ${customer.totalSpent.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {customer.rating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {customer.rating}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Add a new customer to your database. They will receive a welcome email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Doe" />
            <Input label="Email" type="email" placeholder="john@example.com" />
            <Input label="Phone" type="tel" placeholder="(555) 123-4567" />
            <Input label="Address" placeholder="123 Main St" className="col-span-2" />
            <Input label="City" placeholder="Los Angeles" />
            <Input label="State" placeholder="CA" />
            <Input label="ZIP Code" placeholder="90001" />
            <Input label="Date of Birth" type="date" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Add Customer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}