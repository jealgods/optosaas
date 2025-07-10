"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { PatientForm } from "@/components/staff/patient-form";

export default function AddPatientPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (patientData: any) => {
    setIsLoading(true);
    try {
      // Mock save - just log the data
      console.log("Saving patient data:", patientData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Navigate back to dashboard or show success message
      console.log("Patient saved successfully");
    } catch (error) {
      console.error("Error saving patient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // TODO: Navigate back to dashboard
    console.log("Cancel add patient");
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/staff/dashboard"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Patient Entry</h1>
      </div>

      {/* Form */}
      <PatientForm
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
}