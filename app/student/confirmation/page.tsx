"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, Calendar, Clock, MapPin, User, Hash, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface ExamDetails {
  matricNumber: string
  fullName: string
  email: string
  level: string
  examTime: string
  examCenter: string
  tokenId: string
}

export default function ConfirmationPage() {
  const [examDetails, setExamDetails] = useState<ExamDetails | null>(null)

  useEffect(() => {
    // In a real implementation, this data would come from the backend
    // For demo purposes, we'll retrieve it from localStorage
    const storedData = localStorage.getItem("examRegistration")
    if (storedData) {
      setExamDetails(JSON.parse(storedData))
    } else {
      // Fallback data if nothing is in localStorage
      setExamDetails({
        matricNumber: "SCI/2023/001",
        fullName: "John Doe",
        email: "john.doe@example.com",
        level: "100L",
        examTime: "11:00 AM",
        examCenter: "ICT1",
        tokenId: "EX-2025-12345",
      })
    }
  }, [])

  if (!examDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-gray-500">Loading exam details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="max-w-md mx-auto border-green-100 shadow-md">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Registration Successful</CardTitle>
            <CardDescription className="text-green-600">Your exam has been scheduled successfully</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-lg bg-white p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Student Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0 text-gray-500">Name:</div>
                  <div className="font-medium text-gray-900">{examDetails.fullName}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0 text-gray-500">Matric Number:</div>
                  <div className="font-medium text-gray-900">{examDetails.matricNumber}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0 text-gray-500">Email:</div>
                  <div className="font-medium text-gray-900">{examDetails.email}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0 text-gray-500">Level:</div>
                  <div className="font-medium text-gray-900">{examDetails.level}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="rounded-lg bg-white p-5 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Exam Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0 text-gray-500">Exam Date:</div>
                  <div className="font-medium text-gray-900">May 15, 2025</div>
                </div>
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0 text-gray-500">
                    <Clock className="h-4 w-4 inline mr-1 text-gray-400" />
                    Exam Time:
                  </div>
                  <div className="font-medium text-gray-900">{examDetails.examTime}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0 text-gray-500">
                    <MapPin className="h-4 w-4 inline mr-1 text-gray-400" />
                    Exam Center:
                  </div>
                  <div className="font-medium text-gray-900">{examDetails.examCenter}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0 text-gray-500">
                    <Hash className="h-4 w-4 inline mr-1 text-gray-400" />
                    Token ID:
                  </div>
                  <div className="font-medium text-blue-600">{examDetails.tokenId}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 text-blue-800">
              <h4 className="font-medium flex items-center mb-2">
                <Mail className="h-4 w-4 mr-2" />
                Email Confirmation
              </h4>
              <p className="text-sm">
                A confirmation email has been sent to <span className="font-medium">{examDetails.email}</span> with all
                your exam details.
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 text-amber-800">
              <h4 className="font-medium mb-2">Important Instructions:</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Please arrive 30 minutes before your scheduled time.</li>
                <li>Bring a valid ID card along with your exam token.</li>
                <li>Mobile phones and electronic devices are not allowed in the exam hall.</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 pt-2">
            <Button asChild variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">Print Confirmation</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
