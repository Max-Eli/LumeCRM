"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  DollarSign,
  Users,
  Star,
  Settings,
  Copy,
  Trash2,
  Edit,
  Eye,
  ToggleLeft,
  ToggleRight,
  Tag,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Input, Textarea } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "1",
    name: "IV Vitamin Therapy",
    category: "IV Treatments",
    description: "Customized intravenous vitamin injections for optimal health and wellness.",
    duration: 60,
    price: 199,
    cost: 45,
    isActive: true,
    isPopular: true,
    isMobile: true,
    appointments: 245,
    revenue: 48755,
    rating: 4.9,
    staff: ["Dr. Emily Chen", "Sarah Miller, RN"],
    requiredForms: ["New Patient Intake", "IV Therapy Consent"],
  },
  {
    id: "2",
    name: "Botox Treatment",
    category: "Injectables",
    description: "FDA-approved botulinum toxin injections for wrinkle reduction and facial rejuvenation.",
    duration: 45,
    price: 350,
    cost: 120,
    isActive: true,
    isPopular: true,
    isMobile: true,
    appointments: 189,
    revenue: 66150,
    rating: 4.8,
    staff: ["Dr. Emily Chen", "Dr. James Wilson"],
    requiredForms: ["Treatment Consent Form", "HIPAA Authorization"],
  },
  {
    id: "3",
    name: "Chemical Peel",
    category: "Skin Treatments",
    description: "Professional chemical peel treatments for skin resurfacing and rejuvenation.",
    duration: 90,
    price: 275,
    cost: 65,
    isActive: true,
    isPopular: false,
    isMobile: true,
    appointments: 156,
    revenue: 42900,
    rating: 4.7,
    staff: ["Sarah Miller, RN", "Lisa Anderson, RN"],
    requiredForms: ["Treatment Consent Form", "Photo Release"],
  },
  {
    id: "4",
    name: "HydraFacial",
    category: "Skin Treatments",
    description: "Multi-step facial treatment that cleanses, extracts, and hydrates skin.",
    duration: 60,
    price: 199,
    cost: 55,
    isActive: true,
    isPopular: true,
    isMobile: true,
    appointments: 312,
    revenue: 62088,
    rating: 4.9,
    staff: ["Sarah Miller, RN", "Lisa Anderson, RN"],
    requiredForms: ["Treatment Consent Form"],
  },
  {
    id: "5",
    name: "Dermal Fillers",
    category: "Injectables",
    description: "Hyaluronic acid fillers for volume restoration and facial contouring.",
    duration: 60,
    price: 650,
    cost: 280,
    isActive: true,
    isPopular: false,
    isMobile: true,
    appointments: 98,
    revenue: 63700,
    rating: 4.8,
    staff: ["Dr. Emily Chen"],
    requiredForms: ["Treatment Consent Form", "HIPAA Authorization"],
  },
  {
    id: "6",
    name: "Laser Hair Removal",
    category: "Laser Treatments",
    description: "Permanent hair reduction using advanced laser technology.",
    duration: 45,
    price: 299,
    cost: 75,
    isActive: false,
    isPopular: false,
    isMobile: false,
    appointments: 0,
    revenue: 0,
    rating: null,
    staff: [],
    requiredForms: ["Treatment Consent Form", "COVID-19 Screening"],
  },
]

const categories = [
  { id: "all", name: "All Services", count: 6 },
  { id: "iv", name: "IV Treatments", count: 1 },
  { id: "injectables", name: "Injectables", count: 2 },
  { id: "skin", name: "Skin Treatments", count: 2 },
  { id: "laser", name: "Laser Treatments", count: 1 },
]

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<string | null>(null)

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
      service.category.toLowerCase().includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your service catalog and pricing.
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Active Services", value: "5", icon: Tag, color: "from-violet-500 to-purple-500" },
          { name: "Total Bookings", value: "1,247", icon: Users, color: "from-blue-500 to-cyan-500" },
          { name: "Total Revenue", value: "$283,593", icon: DollarSign, color: "from-emerald-500 to-green-500" },
          { name: "Avg. Rating", value: "4.82", icon: Star, color: "from-amber-500 to-orange-500" },
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                    selectedCategory === category.id && "bg-violet-50 dark:bg-violet-950/30"
                  )}
                >
                  <span className={cn(
                    "text-sm font-medium",
                    selectedCategory === category.id ? "text-violet-700 dark:text-violet-300" : "text-gray-700 dark:text-gray-300"
                  )}>
                    {category.name}
                  </span>
                  <Badge variant={selectedCategory === category.id ? "default" : "secondary"}>
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="border-b border-gray-100 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-white">
                          {service.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {service.name}
                              </h3>
                              {service.isPopular && (
                                <Badge variant="default">Popular</Badge>
                              )}
                              {!service.isActive && (
                                <Badge variant="secondary">Inactive</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {service.duration} min
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3.5 w-3.5" />
                                ${service.price}
                              </div>
                              {service.isMobile && (
                                <Badge variant="outline" className="text-xs">Mobile</Badge>
                              )}
                              {service.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                  {service.rating}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              {service.isActive ? (
                                <ToggleRight className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <ToggleLeft className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setEditingService(service.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {service.requiredForms.map((form) => (
                            <Badge key={form} variant="outline" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              {form}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service offering for your catalog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="Service Name" placeholder="e.g., IV Vitamin Therapy" className="col-span-2" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iv">IV Treatments</SelectItem>
                <SelectItem value="injectables">Injectables</SelectItem>
                <SelectItem value="skin">Skin Treatments</SelectItem>
                <SelectItem value="laser">Laser Treatments</SelectItem>
              </SelectContent>
            </Select>
            <Input label="Duration (minutes)" type="number" placeholder="60" />
            <Input label="Price ($)" type="number" placeholder="199" />
            <Input label="Cost ($)" type="number" placeholder="45" />
            <Textarea label="Description" placeholder="Describe the service..." className="col-span-2" rows={3} />
            <div className="col-span-2 flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span className="text-sm">Available for mobile visits</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm">Mark as popular</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Create Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}