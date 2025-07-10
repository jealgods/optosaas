"use client";

import { useState, useEffect } from "react";
import { PatientEntriesGrid } from "@/components/staff/patient-entries-grid";
import { StaffDashboardTabs } from "@/components/staff/StaffDashboardTabs";
import { PerformanceGrid } from "@/components/staff/PerformanceGrid";
import { PerformanceDateFilter } from "@/components/staff/PerformanceDateFilter";

interface PatientEntry {
  opsPatientIdentifier: string;
  appointmentType: string;
  arrivalStatus: string;
  preScreener: string | null;
  appointmentDate: Date;
}

interface PerformanceData {
  sameDayConversion: number;
  overallConversion: number;
  totalDispenseRevenue: number;
  avgPerDispense: number;
  discussedCLsAtEE: number;
  bookedTrialAfterEE: number;
  totalAppointmentRevenue: number;
  rpt: number;
}

export default function StaffDashboard() {
  const [patientEntries, setPatientEntries] = useState<PatientEntry[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [performanceLoading, setPerformanceLoading] = useState(false);

  // Load mock data
  useEffect(() => {
    const loadPatientEntries = async () => {
      try {
        // Simulate API call with mock data
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        
        const mockEntries: PatientEntry[] = [
          {
            opsPatientIdentifier: "SMITH123",
            appointmentType: "Eye Check NHS",
            arrivalStatus: "Arrived",
            preScreener: "Lisa Chen",
            appointmentDate: new Date(today),
          },
          {
            opsPatientIdentifier: "JONES456",
            appointmentType: "CL Trial",
            arrivalStatus: "Arrived",
            preScreener: "Mike Davis",
            appointmentDate: new Date(today),
          },
          {
            opsPatientIdentifier: "BROWN789",
            appointmentType: "Eye Check Private",
            arrivalStatus: "Failed to Attend",
            preScreener: "Tom Wilson",
            appointmentDate: new Date(yesterday),
          },
          {
            opsPatientIdentifier: "WILSON321",
            appointmentType: "MECS",
            arrivalStatus: "Arrived",
            preScreener: "Lisa Chen",
            appointmentDate: new Date(today),
          },
          {
            opsPatientIdentifier: "DAVIS654",
            appointmentType: "CL Check CLRS",
            arrivalStatus: "Rescheduled",
            preScreener: "Mike Davis",
            appointmentDate: new Date(tomorrow),
          },
          {
            opsPatientIdentifier: "TAYLOR987",
            appointmentType: "External Rx NHS",
            arrivalStatus: "Cancelled",
            preScreener: "Tom Wilson",
            appointmentDate: new Date(lastWeek),
          },
          {
            opsPatientIdentifier: "GARCIA001",
            appointmentType: "Eye Check NHS",
            arrivalStatus: "Arrived",
            preScreener: "Lisa Chen",
            appointmentDate: new Date(today),
          },
          {
            opsPatientIdentifier: "MILLER202",
            appointmentType: "CL Trial Return",
            arrivalStatus: "Arrived",
            preScreener: null,
            appointmentDate: new Date(today),
          },
        ];

        setPatientEntries(mockEntries);
        
        // Load mock performance data
        const mockPerformance: PerformanceData = {
          sameDayConversion: 45.2,
          overallConversion: 67.8,
          totalDispenseRevenue: 12450,
          avgPerDispense: 142.50,
          discussedCLsAtEE: 78.5,
          bookedTrialAfterEE: 23.4,
          totalAppointmentRevenue: 8340,
          rpt: 245.30
        };
        setPerformanceData(mockPerformance);
      } catch (error) {
        console.error("Error loading patient entries:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPatientEntries();
  }, []);

  const handleDateRangeChange = async (range: { from: Date | undefined; to?: Date | undefined }) => {
    if (!range.from) return;
    
    setPerformanceLoading(true);
    try {
      // Simulate API call with date range
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real app, fetch data based on date range
      // For now, just update with slightly different mock data
      const updatedPerformance: PerformanceData = {
        sameDayConversion: 42.5 + Math.random() * 10,
        overallConversion: 65.0 + Math.random() * 10,
        totalDispenseRevenue: 11000 + Math.floor(Math.random() * 3000),
        avgPerDispense: 135 + Math.floor(Math.random() * 20),
        discussedCLsAtEE: 75 + Math.random() * 10,
        bookedTrialAfterEE: 20 + Math.random() * 10,
        totalAppointmentRevenue: 7500 + Math.floor(Math.random() * 2000),
        rpt: 230 + Math.floor(Math.random() * 30)
      };
      setPerformanceData(updatedPerformance);
    } catch (error) {
      console.error("Error loading performance data:", error);
    } finally {
      setPerformanceLoading(false);
    }
  };

  const handleAddNew = () => {
    window.location.href = "/staff/add-patient";
  };

  const handleEdit = (entry: PatientEntry) => {
    // TODO: Navigate to edit patient form with data
    console.log("Edit patient entry:", entry);
    window.location.href = `/staff/add-patient?edit=${entry.opsPatientIdentifier}`;
  };

  const handleDelete = (id: string) => {
    // TODO: Show confirmation dialog and delete
    console.log("Delete patient entry:", id);
    setPatientEntries(prev => prev.filter(entry => 
      entry.opsPatientIdentifier !== id
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64" role="status" aria-live="polite">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <StaffDashboardTabs>
        {/* Patient Entries Tab */}
        <div>
          <PatientEntriesGrid
            entries={patientEntries}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        
        {/* Performance Tab */}
        <div className="space-y-6">
          <PerformanceDateFilter 
            onDateRangeChange={handleDateRangeChange}
            loading={performanceLoading}
          />
          {performanceData && (
            <PerformanceGrid 
              data={performanceData}
              loading={performanceLoading}
            />
          )}
        </div>
      </StaffDashboardTabs>
    </div>
  );
}