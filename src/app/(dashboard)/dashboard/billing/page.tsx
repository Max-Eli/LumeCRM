"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Download,
  Send,
  Eye,
  MoreHorizontal,
  DollarSign,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  Printer,
  Mail,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Input, Textarea } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { cn } from "@/lib/utils"

const invoices = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    customer: { name: "Sarah Johnson", email: "sarah.johnson@email.com" },
    date: "2024-01-22",
    dueDate: "2024-02-22",
    status: "paid",
    subtotal: 350,
    tax: 28.88,
    discount: 0,
    total: 378.88,
    amountPaid: 378.88,
    items: [
      { description: "Botox Treatment", quantity: 1, unitPrice: 350, total: 350 },
    ],
    paymentMethod: "card",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    customer: { name: "Michael Brown", email: "michael.brown@email.com" },
    date: "2024-01-20",
    dueDate: "2024-02-20",
    status: "pending",
    subtotal: 548,
    tax: 45.21,
    discount: 50,
    total: 543.21,
    amountPaid: 0,
    items: [
      { description: "IV Vitamin Therapy", quantity: 1, unitPrice: 199, total: 199 },
      { description: "HydraFacial", quantity: 1, unitPrice: 199, total: 199 },
      { description: "Vitamin Shot", quantity: 3, unitPrice: 50, total: 150 },
    ],
    paymentMethod: null,
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    customer: { name: "Emily Davis", email: "emily.davis@email.com" },
    date: "2024-01-18",
    dueDate: "2024-02-18",
    status: "overdue",
    subtotal: 275,
    tax: 22.69,
    discount: 0,
    total: 297.69,
    amountPaid: 0,
    items: [
      { description: "Chemical Peel", quantity: 1, unitPrice: 275, total: 275 },
    ],
    paymentMethod: null,
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-004",
    customer: { name: "Robert Wilson", email: "robert.wilson@email.com" },
    date: "2024-01-15",
    dueDate: "2024-02-15",
    status: "paid",
    subtotal: 199,
    tax: 16.42,
    discount: 0,
    total: 215.42,
    amountPaid: 215.42,
    items: [
      { description: "HydraFacial", quantity: 1, unitPrice: 199, total: 199 },
    ],
    paymentMethod: "card",
  },
  {
    id: "5",
    invoiceNumber: "INV-2024-005",
    customer: { name: "Amanda Chen", email: "amanda.chen@email.com" },
    date: "2024-01-10",
    dueDate: "2024-02-10",
    status: "partial",
    subtotal: 650,
    tax: 53.63,
    discount: 0,
    total: 703.63,
    amountPaid: 350,
    items: [
      { description: "Dermal Fillers", quantity: 1, unitPrice: 650, total: 650 },
    ],
    paymentMethod: "card",
  },
]

const statusColors: Record<string, string> = {
  draft: "secondary",
  sent: "info",
  viewed: "info",
  paid: "success",
  partial: "warning",
  overdue: "danger",
  cancelled: "danger",
}

const statusLabels: Record<string, string> = {
  draft: "Draft",
  sent: "Sent",
  viewed: "Viewed",
  paid: "Paid",
  partial: "Partial",
  overdue: "Overdue",
  cancelled: "Cancelled",
}

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalRevenue = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.total, 0)
  const pendingAmount = invoices.filter(i => i.status === "pending" || i.status === "overdue" || i.status === "partial")
    .reduce((sum, i) => sum + (i.total - i.amountPaid), 0)
  const overdueAmount = invoices.filter(i => i.status === "overdue").reduce((sum, i) => sum + i.total, 0)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Billing & Invoices
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage invoices, payments, and financial records.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Total Revenue", value: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: DollarSign, color: "from-emerald-500 to-green-500", change: "+12.5%", trend: "up" },
          { name: "Pending", value: `$${pendingAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: Clock, color: "from-amber-500 to-orange-500", change: "3 invoices", trend: "neutral" },
          { name: "Overdue", value: `$${overdueAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: AlertCircle, color: "from-red-500 to-rose-500", change: "1 invoice", trend: "down" },
          { name: "This Month", value: "23", icon: FileText, color: "from-violet-500 to-purple-500", change: "+5 vs last", trend: "up" },
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
                  <span className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-600" : 
                    stat.trend === "down" ? "text-red-600" : "text-gray-500"
                  }`}>
                    {stat.change}
                  </span>
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search invoices..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
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
                    Invoice
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredInvoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                    onClick={() => setSelectedInvoice(invoice.id)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {invoice.invoiceNumber}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-gray-900 dark:text-white">{invoice.customer.name}</p>
                        <p className="text-sm text-gray-500">{invoice.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-900 dark:text-white font-medium">
                        ${invoice.total.toFixed(2)}
                      </div>
                      {invoice.status === "partial" && (
                        <div className="text-xs text-gray-500">
                          ${invoice.amountPaid.toFixed(2)} paid
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={statusColors[invoice.status] as any}>
                        {statusLabels[invoice.status]}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
            <DialogDescription>
              Create a new invoice for a customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="Customer" placeholder="Search customers..." className="col-span-2" />
            <Input label="Invoice Date" type="date" />
            <Input label="Due Date" type="date" />
            <div className="col-span-2 border rounded-xl p-4">
              <h4 className="font-medium mb-3">Line Items</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-2">
                  <input placeholder="Description" className="col-span-5 h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm" />
                  <input placeholder="Qty" type="number" className="col-span-2 h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm" />
                  <input placeholder="Price" type="number" className="col-span-2 h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm" />
                  <input placeholder="Total" type="number" className="col-span-3 h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm" disabled />
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            <Input label="Discount ($)" type="number" placeholder="0.00" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tax Rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="7.5">7.5%</SelectItem>
                <SelectItem value="8.25">8.25%</SelectItem>
                <SelectItem value="10">10%</SelectItem>
              </SelectContent>
            </Select>
            <div className="col-span-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium">-$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2 mt-2">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
            <Textarea label="Notes" placeholder="Additional notes..." className="col-span-2" rows={2} />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline">
              Save as Draft
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>
              Create & Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}