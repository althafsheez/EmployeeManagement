import type { Metadata } from "next"
import DashboardHeader from "@/components/dashboard-header"
import DashboardCharts from "@/components/dashboard-charts"
import EmployeeList from "@/components/employee-list"

export const metadata: Metadata = {
  title: "Dashboard | Employee Management System",
  description: "Employee management dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <DashboardCharts />
        <EmployeeList />
      </main>
    </div>
  )
}
