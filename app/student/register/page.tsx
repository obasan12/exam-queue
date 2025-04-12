"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Loader2, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  matricNumber: z.string().min(6, {
    message: "Matriculation number must be at least 6 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function StudentRegistration() {
  const [loading, setLoading] = useState(false)
  const [studentData, setStudentData] = useState<null | {
    fullName: string
    level: string
    department: string
  }>(null)
  const [error, setError] = useState<string | null>(null)
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matricNumber: "",
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    setError(null)

    try {
      // In a real implementation, this would be an API call to the backend
      // For demo purposes, we'll simulate the backend response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if the student is already registered (simulation)
      if (values.matricNumber === "SCI/2023/001" && alreadyRegistered) {
        setError("You have already registered for the exam. Please check your email for details.")
        setLoading(false)
        return
      }

      // Simulate successful registration
      toast({
        title: "Registration Successful",
        description: "Your exam details have been sent to your email.",
      })

      // Store registration data in localStorage for demo purposes
      localStorage.setItem(
        "examRegistration",
        JSON.stringify({
          matricNumber: values.matricNumber,
          email: values.email,
          fullName: studentData?.fullName || "John Doe",
          level: studentData?.level || "100L",
          examTime: "11:00 AM",
          examCenter: "ICT1",
          tokenId: `EX-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        }),
      )

      router.push("/student/confirmation")
    } catch (error) {
      setError("There was an error registering for the exam. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchStudentDetails = async (matricNumber: string) => {
    if (matricNumber.length < 6) return

    setLoading(true)
    setError(null)
    setAlreadyRegistered(false)

    try {
      // In a real implementation, this would be an API call to the backend
      // For demo purposes, we'll simulate the backend response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate student data fetch
      if (matricNumber === "SCI/2023/001") {
        setStudentData({
          fullName: "John Doe",
          level: "100L",
          department: "Computer Science",
        })
        // Simulate already registered student
        setAlreadyRegistered(Math.random() > 0.7)
      } else if (matricNumber === "SCI/2023/002") {
        setStudentData({
          fullName: "Jane Smith",
          level: "100L",
          department: "Electrical Engineering",
        })
      } else if (matricNumber === "SCI/2023/003") {
        setStudentData({
          fullName: "Robert Johnson",
          level: "200L",
          department: "Mechanical Engineering",
        })
      } else {
        setError("Student not found. Please check your matriculation number.")
        setStudentData(null)
      }
    } catch (error) {
      setError("Could not fetch student details. Please try again.")
      setStudentData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="max-w-md mx-auto border-blue-100 shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-blue-900">Student Registration</CardTitle>
            <CardDescription className="text-center">Register for your CBT exam session</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {alreadyRegistered && (
              <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-800" />
                <AlertTitle>Already Registered</AlertTitle>
                <AlertDescription>
                  You have already registered for the exam. Please check your email for details or contact the admin
                  office.
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="matricNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matriculation Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., SCI/2023/001"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            if (e.target.value.length >= 6) {
                              fetchStudentDetails(e.target.value)
                            }
                          }}
                          disabled={loading}
                          className="border-blue-200 focus-visible:ring-blue-500"
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your university matriculation number to auto-fetch your details
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {studentData && (
                  <div className="rounded-md bg-blue-50 p-4 border border-blue-100">
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Student Information</h3>
                        <div className="mt-2 text-sm text-blue-700 space-y-1">
                          <p>
                            <span className="font-medium">Name:</span> {studentData.fullName}
                          </p>
                          <p>
                            <span className="font-medium">Level:</span> {studentData.level}
                          </p>
                          <p>
                            <span className="font-medium">Department:</span> {studentData.department}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          type="email"
                          {...field}
                          disabled={loading}
                          className="border-blue-200 focus-visible:ring-blue-500"
                        />
                      </FormControl>
                      <FormDescription>Your exam details will be sent to this email address</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading || alreadyRegistered}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Register for Exam"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-500 border-t pt-4">
            <p>Need help? Contact the exam office at exam-support@university.edu</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
