"use client"

import { PerformanceMetricCard } from "./PerformanceMetricCard"

interface PerformanceData {
  sameDayConversion: number
  overallConversion: number
  totalDispenseRevenue: number
  avgPerDispense: number
  discussedCLsAtEE: number
  bookedTrialAfterEE: number
  totalAppointmentRevenue: number
  rpt: number
}

interface PerformanceGridProps {
  data: PerformanceData
  loading?: boolean
}

export function PerformanceGrid({ data, loading = false }: PerformanceGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <PerformanceMetricCard
        title="Same Day Conversion"
        value={data.sameDayConversion}
        format="percentage"
      />
      <PerformanceMetricCard
        title="Overall Conversion"
        value={data.overallConversion}
        format="percentage"
      />
      <PerformanceMetricCard
        title="Total Dispense Revenue"
        value={data.totalDispenseRevenue}
        format="currency"
      />
      <PerformanceMetricCard
        title="Avg £ per Dispense"
        value={data.avgPerDispense}
        format="currency"
      />
      <PerformanceMetricCard
        title="Discussed CL's @ EE"
        value={data.discussedCLsAtEE}
        format="percentage"
      />
      <PerformanceMetricCard
        title="Booked Trial After EE"
        value={data.bookedTrialAfterEE}
        format="percentage"
      />
      <PerformanceMetricCard
        title="Total Appointment Revenue"
        value={data.totalAppointmentRevenue}
        format="currency"
      />
      <PerformanceMetricCard
        title="RPT (Revenue Per Test)"
        value={data.rpt}
        format="currency"
      />
    </div>
  )
}