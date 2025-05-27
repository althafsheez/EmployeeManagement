"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Chart container
interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
Chart.displayName = "Chart"

// Chart container
const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("h-full w-full", className)} {...props} />,
)
ChartContainer.displayName = "ChartContainer"

// Chart tooltip
interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-md border bg-background p-2 shadow-md", className)} {...props} />
))
ChartTooltip.displayName = "ChartTooltip"

// Custom tooltip content
interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string
}

const ChartTooltipContent = ({ active, payload, label }: ChartTooltipContentProps) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="space-y-1">
      {label && <p className="text-sm font-medium">{label}</p>}
      <div className="flex flex-col gap-0.5">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground">{item.name}:</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
ChartTooltipContent.displayName = "ChartTooltipContent"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent }
