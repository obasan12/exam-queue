import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react"

export default function StudentPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Student Portal</h1>
            <p className="text-blue-600">Faculty of Science and Engineering</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Register for Exam</CardTitle>
                <CardDescription>Schedule your CBT exam session</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-600">
                  Enter your matriculation number and email to get your exam schedule, center allocation, and unique
                  token.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Automatic scheduling based on your level and department</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Email confirmation with all exam details</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Unique token ID for exam day verification</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/student/register">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-purple-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Exam Information</CardTitle>
                <CardDescription>Important details about your CBT exam</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-4">
                  <div className="rounded-md bg-purple-50 p-4 border border-purple-100">
                    <h3 className="font-medium text-purple-800 mb-2">Exam Centers</h3>
                    <p className="text-sm text-purple-700">
                      ICT1 and ICT2 centers are located in the Faculty of Science and Engineering building.
                    </p>
                  </div>

                  <div className="rounded-md bg-blue-50 p-4 border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-2">Exam Schedule</h3>
                    <p className="text-sm text-blue-700">
                      Exams are scheduled in three sessions: 9:00 AM, 11:00 AM, and 1:00 PM.
                    </p>
                  </div>

                  <div className="rounded-md bg-amber-50 p-4 border border-amber-100">
                    <h3 className="font-medium text-amber-800 mb-2">What to Bring</h3>
                    <ul className="text-sm text-amber-700 space-y-1 list-disc pl-5">
                      <li>University ID card</li>
                      <li>Exam token (printed or digital)</li>
                      <li>Pen and pencil</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Link href="#">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Exam FAQ
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 border shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Already Registered?</h2>
            <p className="text-gray-600 mb-6">
              If you've already registered for the exam, you can view your exam details by entering your matriculation
              number below.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter your matriculation number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="bg-green-600 hover:bg-green-700 sm:w-auto">View Exam Details</Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} University Faculty of Science and Engineering</p>
          <p className="text-sm mt-1">Computer-Based Testing Exam Management System</p>
        </div>
      </footer>
    </div>
  )
}
