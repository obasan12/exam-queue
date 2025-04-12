"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  Users,
  Clock,
  Building,
  Search,
  FileSpreadsheet,
  UploadCloud,
  BarChart3,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react"
import AdminLayout from "@/components/admin-layout"

// Mock data for students
const mockStudents = [
  {
    id: 1,
    matricNumber: "SCI/2023/001",
    fullName: "John Doe",
    level: "100L",
    department: "Computer Science",
    examTime: "9:00 AM",
    examCenter: "ICT1",
    status: "Scheduled",
  },
  {
    id: 2,
    matricNumber: "SCI/2023/002",
    fullName: "Jane Smith",
    level: "100L",
    department: "Electrical Engineering",
    examTime: "9:00 AM",
    examCenter: "ICT1",
    status: "Scheduled",
  },
  {
    id: 3,
    matricNumber: "SCI/2023/003",
    fullName: "Robert Johnson",
    level: "200L",
    department: "Mechanical Engineering",
    examTime: "11:00 AM",
    examCenter: "ICT2",
    status: "Scheduled",
  },
  {
    id: 4,
    matricNumber: "SCI/2023/004",
    fullName: "Emily Davis",
    level: "200L",
    department: "Physics",
    examTime: "11:00 AM",
    examCenter: "ICT2",
    status: "Scheduled",
  },
  {
    id: 5,
    matricNumber: "SCI/2023/005",
    fullName: "Michael Wilson",
    level: "100L",
    department: "Mathematics",
    examTime: "1:00 PM",
    examCenter: "ICT1",
    status: "Scheduled",
  },
  {
    id: 6,
    matricNumber: "SCI/2023/006",
    fullName: "Sarah Brown",
    level: "100L",
    department: "Chemistry",
    examTime: "1:00 PM",
    examCenter: "ICT1",
    status: "Scheduled",
  },
  {
    id: 7,
    matricNumber: "SCI/2023/007",
    fullName: "David Miller",
    level: "200L",
    department: "Biology",
    examTime: "9:00 AM",
    examCenter: "ICT2",
    status: "Scheduled",
  },
  {
    id: 8,
    matricNumber: "SCI/2023/008",
    fullName: "Jennifer Taylor",
    level: "200L",
    department: "Computer Engineering",
    examTime: "9:00 AM",
    examCenter: "ICT2",
    status: "Scheduled",
  },
]

// Mock data for center capacity
const centerCapacity = {
  ICT1: { capacity: 50, scheduled: 32 },
  ICT2: { capacity: 40, scheduled: 28 },
}

// Mock data for time slots
const timeSlots = {
  "9:00 AM": { capacity: 30, scheduled: 22 },
  "11:00 AM": { capacity: 30, scheduled: 18 },
  "1:00 PM": { capacity: 30, scheduled: 20 },
}

export default function AdminDashboard() {
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [centerFilter, setCenterFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [fileUploaded, setFileUploaded] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real implementation, this would process the CSV file
      // For demo purposes, we'll just show a success message
      toast({
        title: "File Uploaded",
        description: `Successfully uploaded ${file.name}`,
      })
      setFileUploaded(true)
    }
  }

  const handleExportCSV = () => {
    // In a real implementation, this would generate and download a CSV file
    // For demo purposes, we'll just show a success message
    toast({
      title: "Export Successful",
      description: "Student data has been exported to CSV.",
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCenter = centerFilter === "all" || student.examCenter === centerFilter
    const matchesTime = timeFilter === "all" || student.examTime === timeFilter
    const matchesLevel = levelFilter === "all" || student.level === levelFilter

    return matchesSearch && matchesCenter && matchesTime && matchesLevel
  })

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Admin</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="queue">Queue Monitor</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {students.filter((s) => s.level === "100L").length} 100L,{" "}
                    {students.filter((s) => s.level === "200L").length} 200L
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ICT1 Center</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {centerCapacity.ICT1.scheduled}/{centerCapacity.ICT1.capacity}
                  </div>
                  <Progress
                    value={(centerCapacity.ICT1.scheduled / centerCapacity.ICT1.capacity) * 100}
                    className="h-2 mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {Math.round((centerCapacity.ICT1.scheduled / centerCapacity.ICT1.capacity) * 100)}% Capacity Used
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ICT2 Center</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {centerCapacity.ICT2.scheduled}/{centerCapacity.ICT2.capacity}
                  </div>
                  <Progress
                    value={(centerCapacity.ICT2.scheduled / centerCapacity.ICT2.capacity) * 100}
                    className="h-2 mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {Math.round((centerCapacity.ICT2.scheduled / centerCapacity.ICT2.capacity) * 100)}% Capacity Used
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Time Slots</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(timeSlots).map(([time, data]) => (
                    <div key={time} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>{time}:</span>
                        <span className="font-medium">
                          {data.scheduled}/{data.capacity}
                        </span>
                      </div>
                      <Progress value={(data.scheduled / data.capacity) * 100} className="h-1.5" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Student Distribution</CardTitle>
                  <CardDescription>Distribution by level and department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">By Level</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>100L</span>
                            <span className="font-medium">{students.filter((s) => s.level === "100L").length}</span>
                          </div>
                          <Progress
                            value={(students.filter((s) => s.level === "100L").length / students.length) * 100}
                            className="h-2"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>200L</span>
                            <span className="font-medium">{students.filter((s) => s.level === "200L").length}</span>
                          </div>
                          <Progress
                            value={(students.filter((s) => s.level === "200L").length / students.length) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Top Departments</h4>
                      <div className="space-y-2">
                        {Array.from(new Set(students.map((s) => s.department)))
                          .slice(0, 3)
                          .map((dept) => (
                            <div key={dept} className="flex flex-col space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{dept}</span>
                                <span className="font-medium">
                                  {students.filter((s) => s.department === dept).length}
                                </span>
                              </div>
                              <Progress
                                value={(students.filter((s) => s.department === dept).length / students.length) * 100}
                                className="h-2"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New Registration</p>
                        <p className="text-xs text-gray-500">John Doe (SCI/2023/001) registered for the exam</p>
                        <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <FileSpreadsheet className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Data Upload</p>
                        <p className="text-xs text-gray-500">Admin uploaded student data (50 records)</p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                        <Building className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Center Update</p>
                        <p className="text-xs text-gray-500">ICT1 center capacity increased to 50</p>
                        <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Students</CardTitle>
                <CardDescription>View and manage all scheduled students for the CBT exam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search by name, matric number, or department..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="w-32">
                      <Select value={centerFilter} onValueChange={setCenterFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Center" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Centers</SelectItem>
                          <SelectItem value="ICT1">ICT1</SelectItem>
                          <SelectItem value="ICT2">ICT2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-32">
                      <Select value={timeFilter} onValueChange={setTimeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Times</SelectItem>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-32">
                      <Select value={levelFilter} onValueChange={setLevelFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="100L">100L</SelectItem>
                          <SelectItem value="200L">200L</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>

                    <Button variant="outline" onClick={handleExportCSV} className="ml-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Matric Number</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Exam Time</TableHead>
                        <TableHead>Center</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.matricNumber}</TableCell>
                            <TableCell>{student.fullName}</TableCell>
                            <TableCell>{student.level}</TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell>{student.examTime}</TableCell>
                            <TableCell>{student.examCenter}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                {student.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No students found matching your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {filteredStudents.length} of {students.length} students
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Student Data</CardTitle>
                <CardDescription>Upload a CSV file containing student information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <UploadCloud className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Student Data</h3>
                    <p className="text-sm text-gray-500 mb-4">Drag and drop your CSV file here, or click to browse</p>
                    <Input
                      id="student-data"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => document.getElementById("student-data")?.click()}
                    >
                      Browse Files
                    </Button>
                    <p className="text-xs text-gray-400 mt-2">
                      Supported format: CSV with columns for Matric Number, Full Name, Level, and Department
                    </p>
                  </div>

                  {fileUploaded && (
                    <div className="rounded-md bg-green-50 p-4 border border-green-100">
                      <div className="flex">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">Upload successful</h3>
                          <div className="mt-2 text-sm text-green-700">
                            <p>Your student data has been uploaded successfully.</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>50 student records processed</li>
                              <li>0 duplicate records found</li>
                              <li>0 records with errors</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">CSV Format Example:</h3>
                    <div className="rounded-md bg-gray-50 p-4 font-mono text-sm overflow-x-auto">
                      <pre>
                        Matric Number,Full Name,Level,Department SCI/2023/001,John Doe,100L,Computer Science
                        SCI/2023/002,Jane Smith,100L,Electrical Engineering SCI/2023/003,Robert Johnson,200L,Mechanical
                        Engineering
                      </pre>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Previous Uploads</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>students_data_2025.csv</span>
                            <span className="text-gray-500">2 days ago</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span>100L_students.csv</span>
                            <span className="text-gray-500">1 week ago</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span>200L_students.csv</span>
                            <span className="text-gray-500">1 week ago</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Data Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh Student Data
                          </Button>
                          <Button variant="outline" className="w-full justify-start" size="sm">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Generate Reports
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-red-600" size="sm">
                            <XCircle className="mr-2 h-4 w-4" />
                            Clear All Data
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Queue Monitoring System</CardTitle>
                <CardDescription>Real-time monitoring of student queues at exam centers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">ICT1 Center</CardTitle>
                      <CardDescription>Current queue status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Current Session:</span>
                          <Badge className="bg-blue-500">9:00 AM</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Students Present:</span>
                            <span className="font-medium">18/25</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Students Absent:</span>
                            <span className="font-medium">7/25</span>
                          </div>
                          <Progress value={28} className="h-2 bg-red-100" />
                        </div>

                        <div className="rounded-md border p-3 bg-gray-50">
                          <h4 className="text-sm font-medium mb-2">Next Student</h4>
                          <div className="flex justify-between text-sm">
                            <span>SCI/2023/005</span>
                            <span>Michael Wilson</span>
                          </div>
                        </div>

                        <div className="pt-2 flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Arrived
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <XCircle className="mr-2 h-4 w-4" />
                            Mark Absent
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">ICT2 Center</CardTitle>
                      <CardDescription>Current queue status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Current Session:</span>
                          <Badge className="bg-blue-500">9:00 AM</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Students Present:</span>
                            <span className="font-medium">15/20</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Students Absent:</span>
                            <span className="font-medium">5/20</span>
                          </div>
                          <Progress value={25} className="h-2 bg-red-100" />
                        </div>

                        <div className="rounded-md border p-3 bg-gray-50">
                          <h4 className="text-sm font-medium mb-2">Next Student</h4>
                          <div className="flex justify-between text-sm">
                            <span>SCI/2023/007</span>
                            <span>David Miller</span>
                          </div>
                        </div>

                        <div className="pt-2 flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Arrived
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <XCircle className="mr-2 h-4 w-4" />
                            Mark Absent
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Emergency Token Generator</CardTitle>
                      <CardDescription>Generate tokens for late students</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="col-span-2">
                          <Label htmlFor="matric-number">Matriculation Number</Label>
                          <Input id="matric-number" placeholder="Enter matric number" />
                        </div>
                        <div>
                          <Label htmlFor="center">Exam Center</Label>
                          <Select defaultValue="ICT1">
                            <SelectTrigger id="center">
                              <SelectValue placeholder="Select center" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ICT1">ICT1</SelectItem>
                              <SelectItem value="ICT2">ICT2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3">
                          <Button className="w-full bg-amber-600 hover:bg-amber-700">Generate Emergency Token</Button>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-3">Recent Emergency Tokens</h4>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Token ID</TableHead>
                                <TableHead>Matric Number</TableHead>
                                <TableHead>Center</TableHead>
                                <TableHead>Generated</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">EMERG-2025-12345</TableCell>
                                <TableCell>SCI/2023/010</TableCell>
                                <TableCell>ICT1</TableCell>
                                <TableCell>10 mins ago</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">EMERG-2025-12346</TableCell>
                                <TableCell>SCI/2023/015</TableCell>
                                <TableCell>ICT2</TableCell>
                                <TableCell>25 mins ago</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
