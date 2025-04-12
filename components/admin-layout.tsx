"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  MonitorPlay,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

interface AdminLayoutProps {
  children: ReactNode
  onLogout?: () => void
}

export default function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  const NavItems = () => (
    <>
      <Link
        href="/admin/dashboard"
        className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700 group"
        onClick={() => setMobileMenuOpen(false)}
      >
        <LayoutDashboard className="mr-3 h-5 w-5 text-blue-500" />
        Dashboard
      </Link>
      <Link
        href="/admin/dashboard?tab=students"
        className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 group"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Users className="mr-3 h-5 w-5 text-gray-500" />
        Students
      </Link>
      <Link
        href="/admin/dashboard?tab=upload"
        className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 group"
        onClick={() => setMobileMenuOpen(false)}
      >
        <FileSpreadsheet className="mr-3 h-5 w-5 text-gray-500" />
        Upload Data
      </Link>
      <Link
        href="/admin/dashboard?tab=queue"
        className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 group"
        onClick={() => setMobileMenuOpen(false)}
      >
        <MonitorPlay className="mr-3 h-5 w-5 text-gray-500" />
        Queue Monitor
      </Link>
      <div className="pt-4 mt-4 border-t">
        <Link
          href="#"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Settings className="mr-3 h-5 w-5 text-gray-500" />
          Settings
        </Link>
        <Link
          href="#"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <HelpCircle className="mr-3 h-5 w-5 text-gray-500" />
          Help & Support
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 group"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-500" />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full bg-white">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">CBT Admin</h2>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex-1 px-2 py-4 space-y-1">
                <NavItems />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <h1 className="text-xl font-bold text-blue-900">CBT Admin</h1>
          </div>
          <div className="flex flex-col flex-grow">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              <NavItems />
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
