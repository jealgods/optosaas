"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface StaffDashboardTabsProps {
  children: React.ReactNode
  defaultTab?: "entries" | "performance"
  onTabChange?: (tab: "entries" | "performance") => void
}

export function StaffDashboardTabs({
  children,
  defaultTab = "entries",
  onTabChange
}: StaffDashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<"entries" | "performance">(defaultTab)

  const handleTabClick = (tab: "entries" | "performance") => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => handleTabClick("entries")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              "border-b-2 -mb-px",
              activeTab === "entries"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Patient Entries
          </button>
          <button
            onClick={() => handleTabClick("performance")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              "border-b-2 -mb-px",
              activeTab === "performance"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            My Performance
          </button>
        </div>
      </div>
      <div className="mt-4">
        {Array.isArray(children) ? children[activeTab === "entries" ? 0 : 1] : children}
      </div>
    </div>
  )
}