"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Employees",
    href: "/dashboard/employees",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-2 p-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "default" : "ghost"}
          className={cn(
            "flex h-10 items-center justify-start gap-2 px-4 text-sm font-medium",
            pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
