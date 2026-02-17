"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  CreditCard,
  Bell,
  Shield,
  Users,
  Palette,
  Code,
  Save,
  Upload,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Textarea } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "general", label: "General", icon: Building2 },
  { id: "team", label: "Team", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Code },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your organization settings and preferences.
          </p>
        </div>
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-6">
          {activeTab === "general" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Organization Information</CardTitle>
                  <CardDescription>Basic information about your business.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">L</span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended: 512x512px PNG or SVG
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Organization Name" defaultValue="Glow MedSpa" />
                    <Input label="Website" defaultValue="https://glowmedspa.com" />
                    <Input label="Email" type="email" defaultValue="contact@glowmedspa.com" />
                    <Input label="Phone" type="tel" defaultValue="(310) 555-0123" />
                  </div>
                  <Textarea label="Description" rows={2} placeholder="A brief description of your business..." />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                  <CardDescription>Your business location.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input label="Street Address" defaultValue="123 Beverly Hills Blvd" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="City" defaultValue="Beverly Hills" />
                    <Input label="State" defaultValue="CA" />
                    <Input label="ZIP Code" defaultValue="90210" />
                  </div>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
                  <CardDescription>Time zone and currency preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select defaultValue="america-los_angeles">
                      <SelectTrigger>
                        <Clock className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Time Zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>Manage team members and their roles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      { name: "John Doe", email: "john@glowmedspa.com", role: "Owner", status: "Active" },
                      { name: "Emily Chen", email: "emily@glowmedspa.com", role: "Admin", status: "Active" },
                      { name: "Sarah Miller", email: "sarah@glowmedspa.com", role: "Staff", status: "Active" },
                    ].map((member) => (
                      <div key={member.email} className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Select defaultValue={member.role.toLowerCase()}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="owner">Owner</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="staff">Staff</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4">
                    Invite Team Member
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Configure when and how you receive email notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "New appointments", description: "Receive an email when a new appointment is booked" },
                    { label: "Appointment reminders", description: "Send reminders to customers before appointments" },
                    { label: "Payment receipts", description: "Receive notifications for successful payments" },
                    { label: "Weekly summary", description: "Get a weekly report of your business performance" },
                    { label: "Marketing updates", description: "Receive tips and best practices for your business" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SMS Notifications</CardTitle>
                  <CardDescription>Configure SMS notifications for customers and staff.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Appointment confirmations", description: "Send SMS when appointments are confirmed" },
                    { label: "Reminders (24h before)", description: "Remind customers 24 hours before their appointment" },
                    { label: "Reminders (1h before)", description: "Remind customers 1 hour before their appointment" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "billing" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your current subscription and usage.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white">
                    <div>
                      <p className="text-sm opacity-90">Current Plan</p>
                      <p className="text-2xl font-bold">Professional</p>
                      <p className="text-sm opacity-90 mt-1">$149/month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">Next billing date</p>
                      <p className="font-medium">February 22, 2024</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">892</p>
                      <p className="text-sm text-gray-500">Customers</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
                      <p className="text-sm text-gray-500">Team Members</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">Unlimited</p>
                      <p className="text-sm text-gray-500">Appointments</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment methods.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                        Default
                      </span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                        <Shield className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Two-factor authentication is enabled</p>
                        <p className="text-sm text-gray-500">Your account is protected with 2FA via authenticator app</p>
                      </div>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your account password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessions</CardTitle>
                  <CardDescription>Manage your active sessions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { device: "Chrome on MacOS", location: "Los Angeles, CA", current: true },
                      { device: "Safari on iPhone", location: "Los Angeles, CA", current: false },
                      { device: "Chrome on Windows", location: "New York, NY", current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Globe className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {session.device}
                              {session.current && (
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                                  Current
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-500">{session.location}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <Button variant="outline" size="sm">Revoke</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "appearance" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Choose your preferred theme.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: "Light", value: "light" },
                      { name: "Dark", value: "dark" },
                      { name: "System", value: "system" },
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        className="p-4 rounded-xl border-2 border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-center"
                      >
                        <p className="font-medium text-gray-900 dark:text-white">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Branding</CardTitle>
                  <CardDescription>Customize your brand colors.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input type="color" defaultValue="#6366f1" className="w-10 h-10 rounded-lg cursor-pointer" />
                        <Input defaultValue="#6366f1" className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input type="color" defaultValue="#8b5cf6" className="w-10 h-10 rounded-lg cursor-pointer" />
                        <Input defaultValue="#8b5cf6" className="flex-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "integrations" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Connected Services</CardTitle>
                  <CardDescription>Manage your third-party integrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Stripe", description: "Payment processing", connected: true, icon: CreditCard },
                    { name: "Google Calendar", description: "Calendar synchronization", connected: true, icon: Calendar },
                    { name: "Twilio", description: "SMS notifications", connected: false, icon: Phone },
                    { name: "Mailgun", description: "Email delivery", connected: false, icon: Mail },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <integration.icon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{integration.name}</p>
                          <p className="text-sm text-gray-500">{integration.description}</p>
                        </div>
                      </div>
                      <Button variant={integration.connected ? "outline" : "default"} size="sm">
                        {integration.connected ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage API keys for custom integrations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Production Key</p>
                        <p className="text-sm text-gray-500 font-mono">sk_live_••••••••••••••••</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Copy</Button>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                    <Button variant="outline">
                      Create New API Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}