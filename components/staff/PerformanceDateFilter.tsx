"use client"

import { useState } from "react"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Button } from "@/components/ui/button"
import { addDays } from "date-fns"

interface DateRange {
  from: Date | undefined
  to?: Date | undefined
}

interface PerformanceDateFilterProps {
  onDateRangeChange: (range: DateRange) => void
  loading?: boolean
}

export function PerformanceDateFilter({ 
  onDateRangeChange, 
  loading = false 
}: PerformanceDateFilterProps) {
  // Default to last 30 days
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date()
  })

  const handleApplyFilter = () => {
    if (dateRange.from) {
      onDateRangeChange(dateRange)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">My Performance Metrics</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Date Range:</span>
          <DateRangePicker
            value={dateRange}
            onChange={(range) => setDateRange(range || { from: undefined, to: undefined })}
            className="w-auto"
          />
          <Button 
            onClick={handleApplyFilter}
            disabled={loading || !dateRange.from}
            size="sm"
          >
            Apply Filter
          </Button>
        </div>
      </header>
    </div>
  )
}