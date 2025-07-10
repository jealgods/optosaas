"use client";

import React, { useState, useEffect } from "react";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { CalendarIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type QuickFilterType = "today" | "yesterday" | "thisWeek" | "thisMonth" | "custom";

interface FilterState {
  fromDate: Date | undefined;
  toDate: Date | undefined;
  searchTerm: string;
  quickFilter: QuickFilterType;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

export function FilterBar({ onFilterChange, totalCount, filteredCount }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>(() => {
    // Default to "today"
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return {
      fromDate: todayStart,
      toDate: todayStart,
      searchTerm: "",
      quickFilter: "today",
    };
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const setQuickFilter = (type: QuickFilterType) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let fromDate: Date | undefined;
    let toDate: Date | undefined;

    switch (type) {
      case "today":
        fromDate = toDate = today;
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        fromDate = toDate = yesterday;
        break;
      case "thisWeek":
        fromDate = startOfWeek(today, { weekStartsOn: 1 }); // Monday
        toDate = endOfWeek(today, { weekStartsOn: 1 }); // Sunday
        break;
      case "thisMonth":
        fromDate = startOfMonth(today);
        toDate = endOfMonth(today);
        break;
      case "custom":
        // Keep existing dates for custom
        return updateFilters({ quickFilter: type });
    }

    updateFilters({ fromDate, toDate, quickFilter: type });
  };

  const clearFilters = () => {
    updateFilters({
      fromDate: undefined,
      toDate: undefined,
      searchTerm: "",
      quickFilter: "custom",
    });
  };

  const getFilterSummary = () => {
    if (filters.quickFilter === "today") return "Today";
    if (filters.quickFilter === "yesterday") return "Yesterday";
    if (filters.quickFilter === "thisWeek") return "This Week";
    if (filters.quickFilter === "thisMonth") return "This Month";
    
    if (filters.fromDate && filters.toDate) {
      if (filters.fromDate.getTime() === filters.toDate.getTime()) {
        return format(filters.fromDate, "MMM d, yyyy");
      }
      return `${format(filters.fromDate, "MMM d")} - ${format(filters.toDate, "MMM d, yyyy")}`;
    }
    
    return "All dates";
  };

  // Initialize filters on mount
  useEffect(() => {
    onFilterChange(filters);
  }, []);

  return (
    <div className="space-y-4 mb-6">
      {/* Quick Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filters.quickFilter === "today" ? "default" : "outline"}
          size="sm"
          onClick={() => setQuickFilter("today")}
        >
          Today
        </Button>
        <Button
          variant={filters.quickFilter === "yesterday" ? "default" : "outline"}
          size="sm"
          onClick={() => setQuickFilter("yesterday")}
        >
          Yesterday
        </Button>
        <Button
          variant={filters.quickFilter === "thisWeek" ? "default" : "outline"}
          size="sm"
          onClick={() => setQuickFilter("thisWeek")}
        >
          This Week
        </Button>
        <Button
          variant={filters.quickFilter === "thisMonth" ? "default" : "outline"}
          size="sm"
          onClick={() => setQuickFilter("thisMonth")}
        >
          This Month
        </Button>
        <Button
          variant={filters.quickFilter === "custom" ? "default" : "outline"}
          size="sm"
          onClick={() => setQuickFilter("custom")}
        >
          Custom Range
        </Button>
      </div>

      {/* Date Range and Search */}
      <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-muted/20">
        {/* From Date */}
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">From Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.fromDate ? format(filters.fromDate, "PPP") : "Pick from date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.fromDate}
                onSelect={(date) => updateFilters({ fromDate: date, quickFilter: "custom" })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Date */}
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">To Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.toDate ? format(filters.toDate, "PPP") : "Pick to date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.toDate}
                onSelect={(date) => updateFilters({ toDate: date, quickFilter: "custom" })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search */}
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patient identifier..."
              value={filters.searchTerm}
              onChange={(e) => updateFilters({ searchTerm: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="h-10"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCount} of {totalCount} patients for {getFilterSummary()}
        {filters.searchTerm && ` matching "${filters.searchTerm}"`}
      </div>
    </div>
  );
}

export type { FilterState };