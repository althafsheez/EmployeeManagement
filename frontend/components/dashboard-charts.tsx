"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample data for attendance chart
const attendanceData = [
  { name: "Present", value: 85, color: "#22c55e" },
  { name: "Absent", value: 10, color: "#ef4444" },
  { name: "Leave", value: 5, color: "#f59e0b" },
]

// Sample data for working hours chart
const workingHoursData = [
  { name: "Mon", hours: 8.2 },
  { name: "Tue", hours: 7.9 },
  { name: "Wed", hours: 8.5 },
  { name: "Thu", hours: 8.1 },
  { name: "Fri", hours: 7.6 },
]

export default function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
          <CardDescription>Current attendance status of employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Working Hours</CardTitle>
          <CardDescription>Average working hours per day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workingHoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Custom tooltip component for Recharts
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="rounded-md border bg-background p-2 shadow-md">
      {label && <p className="text-sm font-medium">{label}</p>}
      <div className="flex flex-col gap-0.5">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
            <span className="text-muted-foreground">{item.name}:</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
