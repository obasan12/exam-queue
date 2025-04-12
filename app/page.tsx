import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, LayoutDashboard } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">University CBT Exam System</h1>
            <p className="text-blue-600">Faculty of Science and Engineering</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/student">Student Portal</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/admin">Admin Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Computer-Based Testing Management System</h2>
          <p className="text-xl text-gray-600">
            Streamlined exam scheduling and queue management for 100L & 200L Science and Engineering students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-blue-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Student Registration</CardTitle>
              <CardDescription>Register for your CBT exam session</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600">
                Enter your matriculation number and email to get your exam schedule, center allocation, and unique
                token.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/student/register">Register Now</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-purple-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <LayoutDashboard className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Admin Dashboard</CardTitle>
              <CardDescription>Manage exam schedules and students</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600">
                Upload student data, view scheduled students, manage exam centers, and export reports.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                <Link href="/admin/login">Admin Login</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Queue Monitor</CardTitle>
              <CardDescription>Real-time exam center monitoring</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-gray-600">
                Track student attendance, view real-time queue status, and manage emergency cases.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                <Link href="/admin/queue">View Queue</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">System Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              Automated exam scheduling
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              Email confirmations
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              Center capacity management
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              Real-time queue monitoring
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              Student data management
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              Emergency token generation
            </li>
          </ul>
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
