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
  Star,
  Users,
  TrendingUp,
  DollarSign,
  Download,
  Upload,
} from "lucide-react"
import { Card, CardContent, Button, Badge, Avatar, AvatarFallback } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import Link from "next/link"

const customers = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "(310) 555-0123",
    status: "ACTIVE",
    totalVisits: 12,
    totalSpent: 4580,
    lastVisit: "2024-01-15",
    rating: 4.9,
    tags: ["VIP", "Monthly Member"],
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    phone: "(323) 555-0456",
    status: "ACTIVE",
    totalVisits: 8,
    totalSpent: 3200,
    lastVisit: "2024-01-10",
    rating: 5.0,
    tags: ["New Client"],
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@email.com",
    phone: "(424) 555-0789",
    status: "ACTIVE",
    totalVisits: 24,
    totalSpent: 9840,
    lastVisit: "2024-01-18",
    rating: 4.8,
    tags: ["VIP", "Referral"],
  },
  {
    id: "4",
    firstName: "Robert",
    lastName: "Wilson",
    email: "robert.wilson@email.com",
    phone: "(213) 555-0321",
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
    { name: "Total Customers", value: "892", change: "+48", icon: Users, color: "bg-purple-50 text-purple-600" },
    { name: "Active This Month", value: "423", change: "+12%", icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
    { name: "Lifetime Value", value: "$127K", change: "+8.5%", icon: DollarSign, color: "bg-blue-50 text-blue-600" },
    { name: "Avg. Rating", value: "4.87", change: "+0.12", icon: Star, color: "bg-orange-50 text-orange-600" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">Manage your customer database and view their history.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Link href="/dashboard/customers/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div key={stat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-emerald-600">{stat.change}</span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-orange-300 focus:bg-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Visits</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-orange-100 text-orange-700">
                            {customer.firstName[0]}{customer.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{customer.firstName} {customer.lastName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {customer.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={customer.status === "ACTIVE" ? "success" : customer.status === "LEAD" ? "warning" : "secondary"}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 font-medium">{customer.totalVisits}</div>
                      <div className="text-xs text-gray-500">{customer.lastVisit ? `Last: ${customer.lastVisit}` : "No visits yet"}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-900">${customer.totalSpent.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      {customer.rating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-gray-900">{customer.rating}</span>
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
    </div>
  )
}