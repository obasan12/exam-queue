"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Bell } from "lucide-react"

// Mock data for queue
const queueData = {
  ICT1: {
    "9:00 AM": {
      total: 25,
      present: 18,
      absent: 7,
      queue: [
        { matricNumber: "SCI/2023/001", name: "John Doe", status: "Present" },
        { matricNumber: "SCI/2023/002", name: "Jane Smith", status: "Present" },
        { matricNumber: "SCI/2023/005", name: "Michael Wilson", status: "Waiting" },
        { matricNumber: "SCI/2023/006", name: "Sarah Brown", status: "Waiting" },
      ],
    },
    "11:00 AM": {
      total: 20,
      present: 0,
      absent: 0,
      queue: [
        { matricNumber: "SCI/2023/009", name: "Thomas Anderson", status: "Waiting" },
        { matricNumber: "SCI/2023/010", name: "Emily Johnson", status: "Waiting" },
        { matricNumber: "SCI/2023/011", name: "James Williams", status: "Waiting" },
      ],
    },
    "1:00 PM": {
      total: 15,
      present: 0,
      absent: 0,
      queue: [
        { matricNumber: "SCI/2023/013", name: "Olivia Davis", status: "Waiting" },
        { matricNumber: "SCI/2023/014", name: "William Miller", status: "Waiting" },
      ],
    },
  },
  ICT2: {
    "9:00 AM": {
      total: 20,
      present: 15,
      absent: 5,
      queue: [
        { matricNumber: "SCI/2023/003", name: "Robert Johnson", status: "Present" },
        { matricNumber: "SCI/2023/004", name: "Emily Davis", status: "Present" },
        { matricNumber: "SCI/2023/007", name: "David Miller", status: "Waiting" },
        { matricNumber: "SCI/2023/008", name: "Jennifer Taylor", status: "Waiting" },
      ],
    },
    "11:00 AM": {
      total: 18,
      present: 0,
      absent: 0,
      queue: [
        { matricNumber: "SCI/2023/015", name: "Daniel Jones", status: "Waiting" },
        { matricNumber: "SCI/2023/016", name: "Sophia Martinez", status: "Waiting" },
      ],
    },
    "1:00 PM": {
      total: 12,
      present: 0,
      absent: 0,
      queue: [
        { matricNumber: "SCI/2023/017", name: "Alexander Brown", status: "Waiting" },
        { matricNumber: "SCI/2023/018", name: "Isabella Wilson", status: "Waiting" },
      ],
    },
  },
}

export default function QueueMonitor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedCenter, setSelectedCenter] = useState("ICT1")
  const [selectedTime, setSelectedTime] = useState("9:00 AM")
  const [emergencyMatric, setEmergencyMatric] = useState("")
  const [emergencyCenter, setEmergencyCenter] = useState("ICT1")
  const [queue, setQueue] = useState(queueData)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleMarkStatus = (matricNumber: string, status: "Present" | "Absent") => {
    // Update the queue data
    const newQueue = { ...queue }
    const student = newQueue[selectedCenter as keyof typeof queue][
      selectedTime as keyof (typeof queue)[typeof selectedCenter]
    ].queue.find((s) => s.matricNumber === matricNumber)

    if (student) {
      student.status = status

      // Update counts
      if (status === "Present") {
        newQueue[selectedCenter as keyof typeof queue][
          selectedTime as keyof (typeof queue)[typeof selectedCenter]
        ].present += 1
      } else {
        newQueue[selectedCenter as keyof typeof queue][
          selectedTime as keyof (typeof queue)[typeof selectedCenter]
        ].absent += 1
      }

      setQueue(newQueue)

      toast({
        title: `Student ${status}`,
        description: `${student.name} has been marked as ${status.toLowerCase()}.`,
      })
    }
  }

  const handleGenerateEmergencyToken = () => {
    if (!emergencyMatric) {
      toast({
        title: "Error",
        description: "Please enter a matriculation number.",
        variant: "destructive",
      })
      return
    }

    // Generate a token
    const tokenId = `EMERG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`

    toast({
      title: "Emergency Token Generated",
      description: `Token ${tokenId} has been generated for ${emergencyMatric}.`,
    })

    setEmergencyMatric("")
  }

  const handleRefreshQueue = () => {
    toast({
      title: "Queue Refreshed",
      description: "Queue data has been updated.",
    })
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  const currentQueue =
    queue[selectedCenter as keyof typeof queue][selectedTime as keyof (typeof queue)[typeof selectedCenter]]
  const presentPercentage = currentQueue.total > 0 ? (currentQueue.present / currentQueue.total) * 100 : 0
  const absentPercentage = currentQueue.total > 0 ? (currentQueue.absent / currentQueue.total) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Queue Monitoring System</h1>
              <p className="text-gray-600">Real-time monitoring of student queues at exam centers</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={selectedCenter} onValueChange={setSelectedCenter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Center" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ICT1">ICT1 Center</SelectItem>
                <SelectItem value="ICT2">ICT2 Center</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={handleRefreshQueue}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Queue
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedCenter} - {selectedTime} Queue
                </CardTitle>
                <CardDescription>Current queue status and student attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {currentQueue.present}/{currentQueue.total}
                          </div>
                          <p className="text-sm text-gray-500">Students Present</p>
                          <Progress value={presentPercentage} className="h-2 mt-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {currentQueue.absent}/{currentQueue.total}
                          </div>
                          <p className="text-sm text-gray-500">Students Absent</p>
                          <Progress value={absentPercentage} className="h-2 mt-2 bg-red-100" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Matric Number</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentQueue.queue.map((student) => (
                          <TableRow key={student.matricNumber}>
                            <TableCell className="font-medium">{student.matricNumber}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              {student.status === "Present" ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>
                              ) : student.status === "Absent" ? (
                                <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                  Absent
                                </Badge>
                              ) : (
                                <Badge variant="outline">Waiting</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {student.status === "Waiting" && (
                                <div className="flex justify-end gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 border-green-200 text-green-700 hover:bg-green-50"
                                    onClick={() => handleMarkStatus(student.matricNumber, "Present")}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Present
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 border-red-200 text-red-700 hover:bg-red-50"
                                    onClick={() => handleMarkStatus(student.matricNumber, "Absent")}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Absent
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {currentQueue.queue.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              No students in queue for this session.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Token</CardTitle>
                <CardDescription>Generate tokens for late students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency-matric">Matriculation Number</Label>
                    <Input
                      id="emergency-matric"
                      placeholder="Enter matric number"
                      value={emergencyMatric}
                      onChange={(e) => setEmergencyMatric(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency-center">Exam Center</Label>
                    <Select value={emergencyCenter} onValueChange={setEmergencyCenter}>
                      <SelectTrigger id="emergency-center">
                        <SelectValue placeholder="Select center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ICT1">ICT1</SelectItem>
                        <SelectItem value="ICT2">ICT2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={handleGenerateEmergencyToken}>
                    Generate Emergency Token
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>System alerts and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Queue Update</p>
                      <p className="text-xs text-gray-500">ICT1 9:00 AM session is 72% complete</p>
                      <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Student Marked Present</p>
                      <p className="text-xs text-gray-500">John Doe (SCI/2023/001) marked as present</p>
                      <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                      <Bell className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Emergency Token</p>
                      <p className="text-xs text-gray-500">Emergency token generated for SCI/2023/010</p>
                      <p className="text-xs text-gray-400 mt-1">30 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
