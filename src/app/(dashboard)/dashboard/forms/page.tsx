"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Trash2,
  Edit,
  Eye,
  Download,
  Send,
  Settings,
  GripVertical,
  Type,
  List,
  CheckSquare,
  Calendar,
  Image,
  FileSignature,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Input, Textarea } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { cn } from "@/lib/utils"

const formTemplates = [
  {
    id: "1",
    name: "New Patient Intake Form",
    category: "intake",
    description: "Comprehensive intake form for new patients collecting personal and medical history.",
    fields: 24,
    responses: 156,
    completionRate: 94,
    status: "active",
    lastUpdated: "2024-01-15",
    requiredFor: ["IV Vitamin Therapy", "Chemical Peel", "Laser Treatment"],
  },
  {
    id: "2",
    name: "COVID-19 Screening",
    category: "health",
    description: "Health screening questionnaire for COVID-19 symptoms and exposure.",
    fields: 8,
    responses: 423,
    completionRate: 99,
    status: "active",
    lastUpdated: "2024-01-10",
    requiredFor: ["All Services"],
  },
  {
    id: "3",
    name: "Treatment Consent Form",
    category: "consent",
    description: "General consent form for treatments including risks and aftercare instructions.",
    fields: 12,
    responses: 312,
    completionRate: 97,
    status: "active",
    lastUpdated: "2024-01-12",
    requiredFor: ["Botox Treatment", "Dermal Fillers", "Chemical Peel"],
  },
  {
    id: "4",
    name: "HIPAA Authorization",
    category: "consent",
    description: "HIPAA privacy practices acknowledgment and authorization.",
    fields: 6,
    responses: 289,
    completionRate: 100,
    status: "active",
    lastUpdated: "2024-01-08",
    requiredFor: ["All Services"],
  },
  {
    id: "5",
    name: "IV Therapy Consent",
    category: "consent",
    description: "Specific consent for IV vitamin therapy treatments.",
    fields: 15,
    responses: 145,
    completionRate: 96,
    status: "active",
    lastUpdated: "2024-01-14",
    requiredFor: ["IV Vitamin Therapy", "IV Hydration"],
  },
  {
    id: "6",
    name: "Photo Release Form",
    category: "consent",
    description: "Authorization for before/after photos and marketing usage.",
    fields: 4,
    responses: 98,
    completionRate: 91,
    status: "draft",
    lastUpdated: "2024-01-05",
    requiredFor: [],
  },
]

const formCategories = [
  { id: "all", name: "All Forms", count: 6 },
  { id: "intake", name: "Intake", count: 1 },
  { id: "consent", name: "Consent", count: 3 },
  { id: "health", name: "Health", count: 1 },
  { id: "waiver", name: "Waivers", count: 0 },
  { id: "custom", name: "Custom", count: 1 },
]

const fieldTypes = [
  { type: "text", label: "Text Input", icon: Type },
  { type: "textarea", label: "Text Area", icon: FileText },
  { type: "select", label: "Dropdown", icon: List },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare },
  { type: "date", label: "Date", icon: Calendar },
  { type: "signature", label: "Signature", icon: FileSignature },
  { type: "file", label: "File Upload", icon: Image },
]

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const filteredForms = formTemplates.filter((form) => {
    const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || form.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forms & Documents
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage intake forms, consent documents, and waivers.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Total Forms", value: "12", icon: FileText, color: "from-violet-500 to-purple-500", change: "+2 this month" },
          { name: "Total Responses", value: "1,423", icon: Users, color: "from-blue-500 to-cyan-500", change: "+156 this week" },
          { name: "Avg. Completion", value: "96%", icon: CheckCircle2, color: "from-emerald-500 to-green-500", change: "+3%" },
          { name: "Pending Forms", value: "23", icon: Clock, color: "from-amber-500 to-orange-500", change: "Needs attention" },
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
                  <span className="text-xs font-medium text-gray-500">{stat.change}</span>
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
              {formCategories.map((category) => (
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
                    placeholder="Search forms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredForms.map((form, index) => (
                  <motion.div
                    key={form.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/50">
                          <FileText className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {form.name}
                            </h3>
                            <Badge variant={form.status === "active" ? "success" : "secondary"}>
                              {form.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            {form.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-gray-500">
                              <FileText className="h-4 w-4" />
                              {form.fields} fields
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <Users className="h-4 w-4" />
                              {form.responses} responses
                            </div>
                            <div className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="h-4 w-4" />
                              {form.completionRate}% completion
                            </div>
                          </div>
                          {form.requiredFor.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {form.requiredFor.map((service) => (
                                <Badge key={service} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsBuilderOpen(true)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              Choose a template or start from scratch.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { name: "New Patient Intake", icon: FileText, description: "Comprehensive patient intake form" },
                { name: "Consent Form", icon: CheckCircle2, description: "Treatment consent & acknowledgment" },
                { name: "Health Questionnaire", icon: AlertCircle, description: "Medical history & screening" },
                { name: "Custom Form", icon: Settings, description: "Start from scratch" },
              ].map((template) => (
                <button
                  key={template.name}
                  onClick={() => {
                    setIsCreateDialogOpen(false)
                    setIsBuilderOpen(true)
                  }}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-left transition-all"
                >
                  <template.icon className="h-6 w-6 text-violet-600 mb-2" />
                  <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <Input label="Form Name" placeholder="Enter form name" />
              <Textarea label="Description" placeholder="Enter form description" rows={2} />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intake">Intake</SelectItem>
                    <SelectItem value="consent">Consent</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="waiver">Waiver</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsCreateDialogOpen(false)
              setIsBuilderOpen(true)
            }}>
              Continue to Builder
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
          <div className="flex h-[80vh]">
            <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Field Types</h3>
              <div className="space-y-2">
                {fieldTypes.map((field) => (
                  <button
                    key={field.type}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-left transition-all cursor-grab"
                  >
                    <field.icon className="h-5 w-5 text-violet-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{field.label}</span>
                  </button>
                ))}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-6 mb-4">Pre-built Fields</h3>
              <div className="space-y-2">
                {[
                  { name: "Full Name", icon: Type },
                  { name: "Email", icon: Mail },
                  { name: "Phone", icon: Phone },
                  { name: "Address", icon: MapPin },
                  { name: "Date of Birth", icon: Calendar },
                  { name: "Signature", icon: FileSignature },
                ].map((field) => (
                  <button
                    key={field.name}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-left transition-all cursor-grab"
                  >
                    <field.icon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{field.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">Form Builder</h2>
                  <p className="text-sm text-gray-500">Drag and drop fields to build your form</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Preview</Button>
                  <Button>Save Form</Button>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <GripVertical className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-medium">Drag fields here</p>
                      <p className="text-sm">or click a field type to add it</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-2 mb-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Full Name</span>
                      <Badge variant="secondary" className="ml-auto">Required</Badge>
                    </div>
                    <input
                      type="text"
                      disabled
                      placeholder="Enter your full name"
                      className="w-full h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-2 mb-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Email Address</span>
                      <Badge variant="secondary" className="ml-auto">Required</Badge>
                    </div>
                    <input
                      type="email"
                      disabled
                      placeholder="Enter your email"
                      className="w-full h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-2 mb-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Phone Number</span>
                    </div>
                    <input
                      type="tel"
                      disabled
                      placeholder="Enter your phone number"
                      className="w-full h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-2 mb-2">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Signature</span>
                      <Badge variant="secondary" className="ml-auto">Required</Badge>
                    </div>
                    <div className="h-24 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                      <p className="text-sm text-gray-400">Click to sign</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}