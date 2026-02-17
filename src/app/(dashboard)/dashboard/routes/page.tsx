"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Car,
  Clock,
  Navigation,
  Route,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Map,
  User,
  Phone,
  ChevronRight,
  Zap,
  Fuel,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Avatar, AvatarFallback } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { cn } from "@/lib/utils"

const routes = [
  {
    id: "1",
    staff: { name: "Dr. Emily Chen", avatar: "EC" },
    date: "2024-01-22",
    status: "in_progress",
    totalDistance: 28.5,
    totalDuration: 195,
    totalTravelTime: 65,
    stops: [
      {
        id: "s1",
        sequence: 1,
        address: "123 Oak Street, Beverly Hills",
        customer: "Sarah Johnson",
        service: "IV Vitamin Therapy",
        time: "09:00",
        duration: 60,
        status: "completed",
        distance: 0,
      },
      {
        id: "s2",
        sequence: 2,
        address: "456 Maple Ave, Los Angeles",
        customer: "Michael Brown",
        service: "Botox Treatment",
        time: "10:30",
        duration: 45,
        status: "in_progress",
        distance: 4.2,
      },
      {
        id: "s3",
        sequence: 3,
        address: "789 Pine Rd, Santa Monica",
        customer: "Emily Davis",
        service: "Chemical Peel",
        time: "12:00",
        duration: 90,
        status: "pending",
        distance: 6.8,
      },
      {
        id: "s4",
        sequence: 4,
        address: "321 Elm Blvd, Hollywood",
        customer: "Robert Wilson",
        service: "HydraFacial",
        time: "14:00",
        duration: 60,
        status: "pending",
        distance: 8.5,
      },
      {
        id: "s5",
        sequence: 5,
        address: "555 Sunset Dr, Malibu",
        customer: "Amanda Chen",
        service: "Lip Fillers",
        time: "15:30",
        duration: 60,
        status: "pending",
        distance: 9.0,
      },
    ],
  },
  {
    id: "2",
    staff: { name: "Sarah Miller, RN", avatar: "SM" },
    date: "2024-01-22",
    status: "planned",
    totalDistance: 32.1,
    totalDuration: 240,
    totalTravelTime: 75,
    stops: [
      {
        id: "s6",
        sequence: 1,
        address: "111 Palm Court, Venice",
        customer: "Jennifer Smith",
        service: "IV Hydration",
        time: "08:30",
        duration: 45,
        status: "pending",
        distance: 0,
      },
      {
        id: "s7",
        sequence: 2,
        address: "222 Beach Dr, Marina del Rey",
        customer: "David Lee",
        service: "Vitamin Shot",
        time: "10:00",
        duration: 30,
        status: "pending",
        distance: 5.3,
      },
      {
        id: "s8",
        sequence: 3,
        address: "333 Harbor Way, Playa Vista",
        customer: "Lisa Wang",
        service: "Mobile Facial",
        time: "11:30",
        duration: 75,
        status: "pending",
        distance: 3.2,
      },
      {
        id: "s9",
        sequence: 4,
        address: "444 Ocean Ave, Santa Monica",
        customer: "Tom Anderson",
        service: "Botox Treatment",
        time: "14:00",
        duration: 45,
        status: "pending",
        distance: 7.1,
      },
    ],
  },
  {
    id: "3",
    staff: { name: "Dr. James Wilson", avatar: "JW" },
    date: "2024-01-22",
    status: "completed",
    totalDistance: 18.2,
    totalDuration: 180,
    totalTravelTime: 45,
    stops: [
      {
        id: "s10",
        sequence: 1,
        address: "555 Hill St, Pacific Palisades",
        customer: "Rachel Green",
        service: "Dermal Fillers",
        time: "09:00",
        duration: 60,
        status: "completed",
        distance: 0,
      },
      {
        id: "s11",
        sequence: 2,
        address: "666 Sunset Blvd, Brentwood",
        customer: "Mark Johnson",
        service: "Chemical Peel",
        time: "11:00",
        duration: 90,
        status: "completed",
        distance: 4.5,
      },
      {
        id: "s12",
        sequence: 3,
        address: "777 Wilshire, Westwood",
        customer: "Emma Thompson",
        service: "Skin Treatment",
        time: "14:00",
        duration: 60,
        status: "completed",
        distance: 5.2,
      },
    ],
  },
]

const statusColors: Record<string, string> = {
  planned: "warning",
  in_progress: "info",
  completed: "success",
  cancelled: "danger",
}

const stopStatusColors: Record<string, string> = {
  pending: "secondary",
  in_progress: "info",
  completed: "success",
  cancelled: "danger",
}

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState(routes[0])
  const [isOptimizeDialogOpen, setIsOptimizeDialogOpen] = useState(false)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Routes & Scheduling
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Optimize and manage your mobile staff routes.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsOptimizeDialogOpen(true)}>
            <Zap className="h-4 w-4 mr-2" />
            Optimize Routes
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Route
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Active Routes", value: "3", icon: Route, color: "from-violet-500 to-purple-500", change: "+1 today" },
          { name: "Total Distance", value: "78.8 mi", icon: MapPin, color: "from-blue-500 to-cyan-500", change: "-12% vs avg" },
          { name: "Avg. Travel Time", value: "62 min", icon: Clock, color: "from-emerald-500 to-green-500", change: "Optimized" },
          { name: "Fuel Saved", value: "$124", icon: Fuel, color: "from-amber-500 to-orange-500", change: "This month" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Map className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Live Route Map</h3>
                    <p className="text-sm text-slate-400">Real-time location tracking</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="aspect-video bg-slate-800/50 rounded-xl border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-12 w-12 text-violet-400 mx-auto mb-4" />
                  <p className="text-white font-medium">Interactive Map</p>
                  <p className="text-sm text-slate-400 mt-1">Connect Mapbox or Google Maps</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {selectedRoute.staff.name}'s Route
                  </h4>
                  <p className="text-sm text-gray-500">{selectedRoute.stops.length} stops • {selectedRoute.totalDistance} mi</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Start Navigation
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-4">
                  {selectedRoute.stops.map((stop, index) => (
                    <motion.div
                      key={stop.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative pl-10"
                    >
                      <div className={cn(
                        "absolute left-2 w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        stop.status === "completed" && "bg-emerald-500 border-emerald-500",
                        stop.status === "in_progress" && "bg-violet-500 border-violet-500",
                        stop.status === "pending" && "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                      )}>
                        {stop.status === "completed" && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                        {stop.status === "in_progress" && (
                          <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        )}
                        {stop.status === "pending" && (
                          <span className="text-xs font-medium text-gray-500">{stop.sequence}</span>
                        )}
                      </div>
                      <div className={cn(
                        "p-4 rounded-xl border transition-colors",
                        stop.status === "completed" && "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
                        stop.status === "in_progress" && "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800",
                        stop.status === "pending" && "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                      )}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{stop.customer.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {stop.customer}
                              </p>
                              <p className="text-sm text-gray-500">{stop.service}</p>
                              <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  {stop.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {stop.distance > 0 ? `${stop.distance} mi` : "Start"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={stopStatusColors[stop.status] as any}>
                              {stop.status.replace("_", " ")}
                            </Badge>
                            <p className="text-sm text-gray-500 mt-1">{stop.duration} min</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="h-3.5 w-3.5" />
                          {stop.address}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Today's Routes</CardTitle>
              <CardDescription>Active routes for your staff</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {routes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={cn(
                      "w-full p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                      selectedRoute.id === route.id && "bg-violet-50 dark:bg-violet-950/30"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{route.staff.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {route.staff.name}
                        </span>
                      </div>
                      <Badge variant={statusColors[route.status] as any}>
                        {route.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {route.stops.length} stops
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="h-3.5 w-3.5" />
                        {route.totalDistance} mi
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDuration(route.totalDuration)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Route Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                      <Fuel className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Fuel Saved</p>
                      <p className="text-xs text-gray-500">This month</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-emerald-600">$124</p>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Time Saved</p>
                      <p className="text-xs text-gray-500">This month</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-blue-600">8.5 hrs</p>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-violet-50 dark:bg-violet-950/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/50">
                      <Route className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Optimized Routes</p>
                      <p className="text-xs text-gray-500">This month</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-violet-600">47</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isOptimizeDialogOpen} onOpenChange={setIsOptimizeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Optimize Routes</DialogTitle>
            <DialogDescription>
              Use AI to find the most efficient route for your staff.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="1">Dr. Emily Chen</SelectItem>
                <SelectItem value="2">Sarah Miller, RN</SelectItem>
                <SelectItem value="3">Dr. James Wilson</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Optimization priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Minimize Distance</SelectItem>
                <SelectItem value="time">Minimize Time</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
              </SelectContent>
            </Select>
            <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/30">
              <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
                <Zap className="h-5 w-5" />
                <span className="font-medium">AI Optimization</span>
              </div>
              <p className="text-sm text-violet-600 dark:text-violet-400 mt-1">
                Our AI will calculate the best route based on appointment times, locations, and traffic patterns.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsOptimizeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOptimizeDialogOpen(false)}>
              <Zap className="h-4 w-4 mr-2" />
              Optimize
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}