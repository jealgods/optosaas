"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { branches, getUsersByFranchise } from "@/lib/mock-data";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

interface OutcomeData {
  label: string;
  count: number;
  percentage: number;
}

interface AppointmentTypeData {
  type: string;
  outcomes: OutcomeData[];
  total: number;
}

export default function AppointmentOutcomesPage() {
  // In a real app, this would come from authentication
  const franchiseId = 1;
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [selectedOptometristId, setSelectedOptometristId] = useState<
    number | null
  >(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 1), // June 1, 2025
    to: addDays(new Date(2025, 5, 1), 1), // June 2, 2025
  });

  const franchiseUsers = getUsersByFranchise(franchiseId);
  const optometrists = franchiseUsers.filter((user) => user.isOptometrist);

  // Filter optometrists by selected branch
  const filteredOptometrists = selectedBranchId
    ? optometrists.filter((user) =>
        user.branchAccess.includes(selectedBranchId)
      )
    : optometrists;

  // Mock data for appointment outcomes
  const appointmentOutcomes: AppointmentTypeData[] = [
    {
      type: "Eye Check Private",
      total: 25,
      outcomes: [
        { label: "No Rx", count: 5, percentage: 20 },
        { label: "Stable Rx", count: 8, percentage: 32 },
        { label: "Change in Rx", count: 7, percentage: 28 },
        { label: "Referred", count: 3, percentage: 12 },
        { label: "Needs Dilation", count: 2, percentage: 8 },
      ],
    },
    {
      type: "Eye Check NHS",
      total: 18,
      outcomes: [
        { label: "No Rx", count: 3, percentage: 17 },
        { label: "Stable Rx", count: 6, percentage: 33 },
        { label: "Change in Rx", count: 5, percentage: 28 },
        { label: "Referred", count: 2, percentage: 11 },
        { label: "Needs Dilation", count: 2, percentage: 11 },
      ],
    },
    {
      type: "Eye Check CLRS",
      total: 12,
      outcomes: [
        { label: "No Rx", count: 2, percentage: 17 },
        { label: "Stable Rx", count: 4, percentage: 33 },
        { label: "Change in Rx", count: 3, percentage: 25 },
        { label: "Referred", count: 2, percentage: 17 },
        { label: "Needs Dilation", count: 1, percentage: 8 },
      ],
    },
    {
      type: "CL Private Check",
      total: 8,
      outcomes: [
        { label: "All OK", count: 3, percentage: 38 },
        { label: "Try New", count: 1, percentage: 12 },
        { label: "Upgrade", count: 1, percentage: 13 },
        { label: "Cash Sale", count: 1, percentage: 12 },
        { label: "Further Apt", count: 1, percentage: 13 },
        { label: "Sight Test", count: 1, percentage: 12 },
        { label: "Change in Rx", count: 0, percentage: 0 },
      ],
    },
    {
      type: "CL Check CLRS",
      total: 5,
      outcomes: [
        { label: "All OK", count: 1, percentage: 20 },
        { label: "Try New", count: 1, percentage: 20 },
        { label: "Upgrade", count: 1, percentage: 20 },
        { label: "Cash Sale", count: 0, percentage: 0 },
        { label: "Further Apt", count: 1, percentage: 20 },
        { label: "Sight Test", count: 0, percentage: 0 },
        { label: "Change in Rx", count: 1, percentage: 20 },
      ],
    },
    {
      type: "Dilation",
      total: 3,
      outcomes: [
        { label: "No Rx", count: 1, percentage: 33 },
        { label: "Stable Rx", count: 1, percentage: 33 },
        { label: "Change in Rx", count: 1, percentage: 34 },
        { label: "Referred", count: 0, percentage: 0 },
        { label: "Needs Dilation", count: 0, percentage: 0 },
      ],
    },
    {
      type: "CL Trial",
      total: 6,
      outcomes: [
        { label: "Signed Up", count: 2, percentage: 33 },
        { label: "Trial Return", count: 1, percentage: 17 },
        { label: "Cash Sale", count: 1, percentage: 17 },
        { label: "Unsuitable", count: 0, percentage: 0 },
        { label: "Joined Care Plan", count: 2, percentage: 33 },
      ],
    },
    {
      type: "CL Trial Return",
      total: 4,
      outcomes: [
        { label: "Signed Up", count: 1, percentage: 25 },
        { label: "Trial Return", count: 0, percentage: 0 },
        { label: "Cash Sale", count: 1, percentage: 25 },
        { label: "Unsuitable", count: 1, percentage: 25 },
        { label: "Joined Care Plan", count: 1, percentage: 25 },
      ],
    },
    {
      type: "Recheck",
      total: 2,
      outcomes: [
        { label: "All OK", count: 1, percentage: 50 },
        { label: "Remake", count: 1, percentage: 50 },
      ],
    },
    {
      type: "Medical Emergency",
      total: 1,
      outcomes: [
        { label: "Referred", count: 1, percentage: 100 },
        { label: "Needs Dilation", count: 0, percentage: 0 },
        { label: "Discharged", count: 0, percentage: 0 },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight pb-1">
          Appointment Outcomes
        </h1>
        <p className="text-muted-foreground">
          Analyze appointment outcomes and conversion metrics
        </p>
      </header>

      {/* Filters */}
      <div className="bg-white/80 rounded-xl shadow-sm p-6 mb-6 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Branch
            </label>
            <Select
              value={selectedBranchId?.toString() || "all"}
              onValueChange={(value) => {
                setSelectedBranchId(value === "all" ? null : parseInt(value));
                setSelectedOptometristId(null);
              }}
            >
              <SelectTrigger className="h-10 w-full bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id.toString()}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Optometrist
            </label>
            <Select
              value={selectedOptometristId?.toString() || "all"}
              onValueChange={(value) =>
                setSelectedOptometristId(
                  value === "all" ? null : parseInt(value)
                )
              }
            >
              <SelectTrigger className="h-10 w-full bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Optometrists</SelectItem>
                {filteredOptometrists.map((optometrist) => (
                  <SelectItem
                    key={optometrist.id}
                    value={optometrist.id.toString()}
                  >
                    {optometrist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Period
            </label>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              placeholder="Select date range"
              className="h-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Appointment Type Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {appointmentOutcomes.map((appointment) => (
          <Card
            key={appointment.type}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 py-4"
          >
            <CardHeader className="py-0 border-b m-0 [.border-b]:pb-0">
              <CardTitle className="text-base font-semibold text-center tracking-wide text-primary">
                {appointment.type.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-1 px-6">
              <div>
                {appointment.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm py-0.5"
                  >
                    <span className="text-gray-700 flex-1 text-left">
                      {outcome.label}
                    </span>
                    <span className="mx-1 px-2 py-0.5 rounded-full font-semibold text-center min-w-[28px]">
                      {outcome.count}
                    </span>
                    <span className="text-gray-500 flex-1 text-right">
                      {outcome.percentage}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-2 pt-1 flex items-center justify-between text-sm font-semibold">
                <span className="flex-1 text-left">Total</span>
                <span className="mx-1 px-2 py-0.5 rounded-full text-center min-w-[28px]">
                  {appointment.total}
                </span>
                <span className="flex-1 text-right">100%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
