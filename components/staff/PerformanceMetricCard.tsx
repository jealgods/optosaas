import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PerformanceMetricCardProps {
  title: string
  value: string | number
  format?: "percentage" | "currency" | "number"
}

export function PerformanceMetricCard({ 
  title, 
  value, 
  format = "number" 
}: PerformanceMetricCardProps) {
  const formatValue = () => {
    if (format === "percentage") {
      return `${value}%`
    } else if (format === "currency") {
      return `£${value.toLocaleString()}`
    }
    return value.toString()
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatValue()}
        </div>
      </CardContent>
    </Card>
  )
}