"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PatientEntryCard } from "./patient-entry-card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { isWithinInterval, addDays } from "date-fns";

interface PatientEntry {
  opsPatientIdentifier: string;
  appointmentType: string;
  arrivalStatus: string;
  preScreener: string | null;
  appointmentDate: Date;
}

interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

interface PatientEntriesGridProps {
  entries: PatientEntry[];
  onAddNew: () => void;
  onEdit: (entry: PatientEntry) => void;
  onDelete: (id: string) => void;
}

export function PatientEntriesGrid({ 
  entries, 
  onAddNew, 
  onEdit, 
  onDelete 
}: PatientEntriesGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  // Default to last 30 days
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date()
  });

  // Filter entries based on date range only
  const filteredEntries = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return entries;

    return entries.filter(entry => {
      const entryDate = new Date(entry.appointmentDate.getFullYear(), 
                               entry.appointmentDate.getMonth(), 
                               entry.appointmentDate.getDate());
      
      return isWithinInterval(entryDate, { 
        start: dateRange.from!, 
        end: dateRange.to! 
      });
    });
  }, [entries, dateRange]);

  const visibleEntries = filteredEntries.slice(0, visibleCount);
  const hasMore = filteredEntries.length > visibleCount;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, entries.length));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Patient Entries Dashboard</h1>
        <Button 
          onClick={onAddNew} 
          className="w-full sm:w-auto"
          aria-label="Add new patient entry"
        >
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          Add New Entry
        </Button>
      </header>

      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Date Range:</span>
          <DateRangePicker
            value={dateRange}
            onChange={(range) => setDateRange(range || { from: undefined, to: undefined })}
            className="w-auto"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {filteredEntries.length} of {entries.length} patients
        </div>
      </div>

      {/* Grid */}
      <section 
        className="grid grid-cols-1 md:grid-cols-2 gap-4" 
        aria-label={`Patient entries grid showing ${visibleEntries.length} of ${filteredEntries.length} entries`}
        role="region"
      >
        {visibleEntries.map((entry) => (
          <PatientEntryCard
            key={entry.opsPatientIdentifier}
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </section>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            onClick={loadMore}
            aria-label={`Load more entries (showing ${visibleCount} of ${filteredEntries.length})`}
          >
            Load More Entries
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredEntries.length === 0 && entries.length > 0 && (
        <div className="text-center py-12" role="region" aria-label="No matching patient entries">
          <p className="text-muted-foreground mb-4">No patients found in the selected date range</p>
          <p className="text-sm text-muted-foreground">Try adjusting your date range</p>
        </div>
      )}
      
      {entries.length === 0 && (
        <div className="text-center py-12" role="region" aria-label="No patient entries available">
          <p className="text-muted-foreground mb-4">No patient entries found</p>
          <Button 
            onClick={onAddNew}
            aria-label="Add your first patient entry"
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Add Your First Entry
          </Button>
        </div>
      )}
    </div>
  );
}