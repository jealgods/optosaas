"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface LensSpecification {
  id: string;
  lensManufacturer: string;
  lensType: string;
  lensIndex: string;
  lensName: string;
  lensFinish: string;
  lensTint: string;
  glassesCover: string;
  dispenseValue: string;
}

interface PatientFormData {
  // Patient Identification
  opsPatientIdentifier: string;
  appointmentDate: Date | undefined;
  
  // Appointment Details
  appointmentType: string;
  nhsReason: string;
  
  // Arrival & Screening
  arrivalStatus: string;
  preScreener: string;
  
  // Clinical Services
  oct: string;
  whereWasOctBooked: string;
  optometrist: string;
  appointmentOutcome: string;
  didOptomAdviseNew: string;
  didOptomDiscussCls: string;
  didPxBookTrial: string;
  
  // Dispensing Process
  didPatientDispense: string;
  handover: string;
  dispenser: string;
  
  // Lens Specifications (now an array)
  lensSpecifications: LensSpecification[];
  
  // Financial Tracking
  glassesCoverAmountPaid: string;
  octFeeAmountPaid: string;
  apptFeeAmountPaid: string;
  accessoriesAmountPaid: string;
  nhsVoucher: string;
  nhsVoucherType: string;
  nhsVoucherValue: string;
  dispenseAmountPaid: string;
  transactionValue: string;
  opsTransactionId: string;
  
  // Follow-up & Completion
  collectionAppointmentBooked: string;
  pcseCompleted: string;
}

interface PatientFormProps {
  onSave: (data: PatientFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<PatientFormData>;
}

let lensSpecIdCounter = 0;

// Lens Specification Card component moved outside to prevent recreating on each render
const LensSpecificationCard = ({ 
  spec, 
  index, 
  isFirst,
  updateLensSpec,
  removeLensSpec
}: { 
  spec: LensSpecification; 
  index: number; 
  isFirst: boolean;
  updateLensSpec: (index: number, field: keyof LensSpecification, value: string) => void;
  removeLensSpec: (id: string) => void;
}) => {
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg">Dispense Specification {index + 1}</CardTitle>
        {!isFirst && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeLensSpec(spec.id)}
            className="h-8 w-8 p-0"
            aria-label={`Remove lens specification ${index + 1}`}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`lensManufacturer-${spec.id}`}>Lens Manufacturer</Label>
          <Select 
            value={spec.lensManufacturer} 
            onValueChange={(value) => updateLensSpec(index, "lensManufacturer", value)}
          >
            <SelectTrigger id={`lensManufacturer-${spec.id}`} className="mt-1" aria-label="Lens Manufacturer">
              <SelectValue placeholder="Select lens manufacturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Boots">Boots</SelectItem>
              <SelectItem value="Essilor">Essilor</SelectItem>
              <SelectItem value="Zeiss">Zeiss</SelectItem>
              <SelectItem value="Norville">Norville</SelectItem>
              <SelectItem value="Bolle">Bolle</SelectItem>
              <SelectItem value="MCR">MCR</SelectItem>
              <SelectItem value="Corporate">Corporate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor={`lensType-${spec.id}`}>Lens Type</Label>
          <Select 
            value={spec.lensType} 
            onValueChange={(value) => updateLensSpec(index, "lensType", value)}
          >
            <SelectTrigger id={`lensType-${spec.id}`} className="mt-1" aria-label="Lens Type">
              <SelectValue placeholder="Select lens type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single Vision">Single Vision</SelectItem>
              <SelectItem value="Bifocal">Bifocal</SelectItem>
              <SelectItem value="Vfocal">Vfocal</SelectItem>
              <SelectItem value="Office">Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <PillSelector
          label="Lens Index"
          options={["Standard", "Thin", "Ultrathin", "Ultrathin Plus"]}
          value={spec.lensIndex}
          onChange={(value) => updateLensSpec(index, "lensIndex", value)}
        />

        <div>
          <Label htmlFor={`lensName-${spec.id}`}>Lens Name</Label>
          <Select 
            value={spec.lensName} 
            onValueChange={(value) => updateLensSpec(index, "lensName", value)}
          >
            <SelectTrigger id={`lensName-${spec.id}`} className="mt-1" aria-label="Lens Name">
              <SelectValue placeholder="Select lens name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="Thin">Thin</SelectItem>
              <SelectItem value="Ultrathin">Ultrathin</SelectItem>
              <SelectItem value="UltrathinPlus">UltrathinPlus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor={`lensFinish-${spec.id}`}>Lens Finish</Label>
          <Select 
            value={spec.lensFinish} 
            onValueChange={(value) => updateLensSpec(index, "lensFinish", value)}
          >
            <SelectTrigger id={`lensFinish-${spec.id}`} className="mt-1" aria-label="Lens Finish">
              <SelectValue placeholder="Select lens finish" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="Scratch Resistant">Scratch Resistant</SelectItem>
              <SelectItem value="Protect">Protect</SelectItem>
              <SelectItem value="ProtectPlus">ProtectPlus</SelectItem>
              <SelectItem value="UVBlue">UVBlue</SelectItem>
              <SelectItem value="Eyedrive">Eyedrive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <PillSelector
          label="Lens Tint"
          options={["None", "Sun", "Transitions", "Polarised"]}
          value={spec.lensTint}
          onChange={(value) => updateLensSpec(index, "lensTint", value)}
        />

        <PillSelector
          label="Glasses Cover"
          options={["Yes", "No"]}
          value={spec.glassesCover}
          onChange={(value) => updateLensSpec(index, "glassesCover", value)}
        />

        <div>
          <Label htmlFor={`dispenseValue-${spec.id}`}>Dispense Value (£)</Label>
          <Input
            id={`dispenseValue-${spec.id}`}
            type="number"
            step="0.01"
            value={spec.dispenseValue}
            onChange={(e) => updateLensSpec(index, "dispenseValue", e.target.value)}
            placeholder="0.00"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// PillSelector component also moved outside
const PillSelector = ({ 
  label, 
  field, 
  options,
  value,
  onChange,
  formData,
  updateField
}: { 
  label: string; 
  field?: keyof PatientFormData;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  formData?: PatientFormData;
  updateField?: (field: keyof PatientFormData, value: string) => void;
}) => {
  const fieldId = `pill-selector-${field || label}`;
  const currentValue = value || (field && formData ? formData[field] as string : '');
  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    } else if (field && updateField) {
      updateField(field, newValue);
    }
  };
  
  return (
    <fieldset>
      <legend className="text-sm font-medium mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2" role="group" aria-labelledby={fieldId}>
        {options.map((option) => (
          <Button
            key={option}
            type="button"
            variant={currentValue === option ? "default" : "outline"}
            size="sm"
            onClick={() => handleChange(option)}
            aria-pressed={currentValue === option}
            aria-label={`Select ${option} for ${label}`}
          >
            {option}
          </Button>
        ))}
      </div>
    </fieldset>
  );
};

export function PatientForm({ onSave, onCancel, isLoading = false, initialData }: PatientFormProps) {
  const createDefaultLensSpec = (): LensSpecification => ({
    id: `lens-${++lensSpecIdCounter}`,
    lensManufacturer: "",
    lensType: "",
    lensIndex: "",
    lensName: "",
    lensFinish: "",
    lensTint: "",
    glassesCover: "",
    dispenseValue: "",
  });

  const [formData, setFormData] = useState<PatientFormData>({
    opsPatientIdentifier: "",
    appointmentDate: undefined,
    appointmentType: "",
    nhsReason: "",
    arrivalStatus: "",
    preScreener: "",
    oct: "",
    whereWasOctBooked: "",
    optometrist: "",
    appointmentOutcome: "",
    didOptomAdviseNew: "",
    didOptomDiscussCls: "",
    didPxBookTrial: "",
    didPatientDispense: "",
    handover: "",
    dispenser: "",
    lensSpecifications: initialData?.lensSpecifications || [createDefaultLensSpec()],
    glassesCoverAmountPaid: "",
    octFeeAmountPaid: "",
    apptFeeAmountPaid: "",
    accessoriesAmountPaid: "",
    nhsVoucher: "",
    nhsVoucherType: "",
    nhsVoucherValue: "",
    dispenseAmountPaid: "",
    transactionValue: "",
    opsTransactionId: "",
    collectionAppointmentBooked: "",
    pcseCompleted: "",
    ...initialData,
  });

  // Calculate total dispense value from all lens specifications
  const totalDispenseValue = formData.lensSpecifications
    .reduce((sum, lens) => sum + parseFloat(lens.dispenseValue || '0'), 0)
    .toFixed(2);
  
  // Calculate total transaction value (sum of all payment fields plus total dispense value)
  const totalTransactionValue = (
    parseFloat(formData.glassesCoverAmountPaid || '0') +
    parseFloat(formData.octFeeAmountPaid || '0') +
    parseFloat(formData.apptFeeAmountPaid || '0') +
    parseFloat(formData.accessoriesAmountPaid || '0') +
    parseFloat(formData.dispenseAmountPaid || '0') +
    parseFloat(totalDispenseValue || '0')
  ).toFixed(2);

  const updateField = (field: keyof PatientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateDateField = (field: keyof PatientFormData, value: Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateLensSpec = (index: number, field: keyof LensSpecification, value: string) => {
    setFormData(prev => {
      const newSpecs = prev.lensSpecifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      );
      return { ...prev, lensSpecifications: newSpecs };
    });
  };

  const addLensSpec = () => {
    const newSpec = createDefaultLensSpec();
    setFormData(prev => ({
      ...prev,
      lensSpecifications: [...prev.lensSpecifications, newSpec]
    }));
  };

  const removeLensSpec = (id: string) => {
    setFormData(prev => ({
      ...prev,
      lensSpecifications: prev.lensSpecifications.filter(spec => spec.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="sr-only" role="status" aria-live="polite" id="form-progress">
        Patient form with {Object.keys(formData).length} fields across 6 sections
      </div>
      {/* Patient Identification */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Identification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="opsPatientIdentifier">OPS Patient Identifier *</Label>
            <Input
              id="opsPatientIdentifier"
              value={formData.opsPatientIdentifier}
              onChange={(e) => updateField("opsPatientIdentifier", e.target.value)}
              placeholder="Enter patient identifier (e.g., SMITH123)"
              className="mt-1"
              required
              aria-describedby="opsPatientIdentifier-desc"
            />
            <p id="opsPatientIdentifier-desc" className="text-sm text-muted-foreground mt-1">
              Unique identifier for the patient in the OPS system
            </p>
          </div>

          <div>
            <Label htmlFor="appointmentDate">Appointment Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="appointmentDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1",
                    !formData.appointmentDate && "text-muted-foreground"
                  )}
                  aria-describedby="appointmentDate-desc"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.appointmentDate ? (
                    format(formData.appointmentDate, "PPP")
                  ) : (
                    "Pick appointment date"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.appointmentDate}
                  onSelect={(date) => updateDateField("appointmentDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p id="appointmentDate-desc" className="text-sm text-muted-foreground mt-1">
              Select the date for this patient's appointment
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="appointmentType">Appointment Type *</Label>
            <Select value={formData.appointmentType} onValueChange={(value) => updateField("appointmentType", value)} required>
              <SelectTrigger id="appointmentType" className="mt-1" aria-label="Appointment Type">
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Eye Check Private">Eye Check Private</SelectItem>
                <SelectItem value="Eye Check NHS">Eye Check NHS</SelectItem>
                <SelectItem value="Eye Check CLRS">Eye Check CLRS</SelectItem>
                <SelectItem value="Eye Check CLRS NHS">Eye Check CLRS NHS</SelectItem>
                <SelectItem value="CL Check Private">CL Check Private</SelectItem>
                <SelectItem value="CL Check CLRS">CL Check CLRS</SelectItem>
                <SelectItem value="CL Trial">CL Trial</SelectItem>
                <SelectItem value="CL Trial Return">CL Trial Return</SelectItem>
                <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                <SelectItem value="Recheck">Recheck</SelectItem>
                <SelectItem value="Post Cat Check">Post Cat Check</SelectItem>
                <SelectItem value="Call Back">Call Back</SelectItem>
                <SelectItem value="Call Back NHS">Call Back NHS</SelectItem>
                <SelectItem value="External Rx">External Rx</SelectItem>
                <SelectItem value="External Rx NHS">External Rx NHS</SelectItem>
                <SelectItem value="Extra Pair">Extra Pair</SelectItem>
                <SelectItem value="No Rx Sunglasses">No Rx Sunglasses</SelectItem>
                <SelectItem value="GC on Collection">GC on Collection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="nhsReason">NHS Reason (if applicable)</Label>
            <Select value={formData.nhsReason} onValueChange={(value) => updateField("nhsReason", value)}>
              <SelectTrigger id="nhsReason" className="mt-1" aria-label="NHS Reason">
                <SelectValue placeholder="Select NHS reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under 16">Under 16</SelectItem>
                <SelectItem value="Over 60">Over 60</SelectItem>
                <SelectItem value="16-18 FTE">16-18 FTE</SelectItem>
                <SelectItem value="Diabetic">Diabetic</SelectItem>
                <SelectItem value="FHG">FHG</SelectItem>
                <SelectItem value="Financial Help">Financial Help</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Arrival & Screening */}
      <Card>
        <CardHeader>
          <CardTitle>Arrival & Screening</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PillSelector
            label="Arrival Status"
            field="arrivalStatus"
            options={["Arrived", "Failed to Attend", "Cancelled", "Rescheduled"]}
            formData={formData}
            updateField={updateField}
          />

          <div>
            <Label htmlFor="preScreener">Pre Screener</Label>
            <Select value={formData.preScreener} onValueChange={(value) => updateField("preScreener", value)}>
              <SelectTrigger id="preScreener" className="mt-1" aria-label="Pre Screener">
                <SelectValue placeholder="Select pre screener" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lisa Chen">Lisa Chen</SelectItem>
                <SelectItem value="Mike Davis">Mike Davis</SelectItem>
                <SelectItem value="Tom Wilson">Tom Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Services */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PillSelector
            label="OCT"
            field="oct"
            options={["Yes", "No", "N/A", "Clinical", "Free", "Staff"]}
            formData={formData}
            updateField={updateField}
          />

          <PillSelector
            label="Where was OCT Booked?"
            field="whereWasOctBooked"
            options={["In Store", "By Calls Hub"]}
            formData={formData}
            updateField={updateField}
          />

          <div>
            <Label htmlFor="optometrist">Optometrist</Label>
            <Select value={formData.optometrist} onValueChange={(value) => updateField("optometrist", value)}>
              <SelectTrigger id="optometrist" className="mt-1" aria-label="Optometrist">
                <SelectValue placeholder="Select optometrist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                <SelectItem value="Dr. James Parker">Dr. James Parker</SelectItem>
                <SelectItem value="Dr. Amanda Foster">Dr. Amanda Foster</SelectItem>
                <SelectItem value="Dr. Robert Kim">Dr. Robert Kim</SelectItem>
                <SelectItem value="Dr. Michelle Thompson">Dr. Michelle Thompson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="appointmentOutcome">Appointment Outcome</Label>
            <Select value={formData.appointmentOutcome} onValueChange={(value) => updateField("appointmentOutcome", value)}>
              <SelectTrigger id="appointmentOutcome" className="mt-1" aria-label="Appointment Outcome">
                <SelectValue placeholder="Select appointment outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Change in Rx">Change in Rx</SelectItem>
                <SelectItem value="No Rx">No Rx</SelectItem>
                <SelectItem value="Stable Rx">Stable Rx</SelectItem>
                <SelectItem value="Referred">Referred</SelectItem>
                <SelectItem value="Needs Dilation">Needs Dilation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <PillSelector
            label="Did Optom Advise New?"
            field="didOptomAdviseNew"
            options={["Yes", "No"]}
            formData={formData}
            updateField={updateField}
          />

          <PillSelector
            label="Did Optom Discuss CL's?"
            field="didOptomDiscussCls"
            options={["Yes", "No", "N/A"]}
            formData={formData}
            updateField={updateField}
          />

          <PillSelector
            label="Did Px Book a Trial?"
            field="didPxBookTrial"
            options={["Yes", "No", "N/A"]}
            formData={formData}
            updateField={updateField}
          />
        </CardContent>
      </Card>

      {/* Dispensing Process */}
      <Card>
        <CardHeader>
          <CardTitle>Dispensing Process</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="didPatientDispense">Did Patient Dispense?</Label>
            <Select value={formData.didPatientDispense} onValueChange={(value) => updateField("didPatientDispense", value)}>
              <SelectTrigger id="didPatientDispense" className="mt-1" aria-label="Did Patient Dispense">
                <SelectValue placeholder="Select dispensing status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="Declined Update">Declined Update</SelectItem>
                <SelectItem value="Coming Back">Coming Back</SelectItem>
                <SelectItem value="Further Apt Required">Further Apt Required</SelectItem>
                <SelectItem value="Taken Rx">Taken Rx</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="handover">Handover</Label>
            <Select value={formData.handover} onValueChange={(value) => updateField("handover", value)}>
              <SelectTrigger id="handover" className="mt-1" aria-label="Handover Staff">
                <SelectValue placeholder="Select handover staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lisa Chen">Lisa Chen</SelectItem>
                <SelectItem value="Mike Davis">Mike Davis</SelectItem>
                <SelectItem value="Tom Wilson">Tom Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dispenser">Dispenser</Label>
            <Select value={formData.dispenser} onValueChange={(value) => updateField("dispenser", value)}>
              <SelectTrigger id="dispenser" className="mt-1" aria-label="Dispenser">
                <SelectValue placeholder="Select dispenser" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lisa Chen">Lisa Chen</SelectItem>
                <SelectItem value="Mike Davis">Mike Davis</SelectItem>
                <SelectItem value="Tom Wilson">Tom Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lens Specifications */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dispense Specifications</h2>
        {formData.lensSpecifications.map((spec, index) => (
          <LensSpecificationCard
            key={spec.id}
            spec={spec}
            index={index}
            isFirst={index === 0}
            updateLensSpec={updateLensSpec}
            removeLensSpec={removeLensSpec}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addLensSpec}
          className="w-full"
        >
          + Add Another Dispense Specification
        </Button>
      </div>

      {/* Financial Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="glassesCoverAmountPaid">Glasses Cover Amount Paid (£)</Label>
              <Input
                id="glassesCoverAmountPaid"
                type="number"
                step="0.01"
                value={formData.glassesCoverAmountPaid}
                onChange={(e) => updateField("glassesCoverAmountPaid", e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="octFeeAmountPaid">OCT Fee Amount Paid (£)</Label>
              <Input
                id="octFeeAmountPaid"
                type="number"
                step="0.01"
                value={formData.octFeeAmountPaid}
                onChange={(e) => updateField("octFeeAmountPaid", e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="apptFeeAmountPaid">Appt Fee Amount Paid (£)</Label>
              <Input
                id="apptFeeAmountPaid"
                type="number"
                step="0.01"
                value={formData.apptFeeAmountPaid}
                onChange={(e) => updateField("apptFeeAmountPaid", e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="accessoriesAmountPaid">Accessories Amount Paid (£)</Label>
              <Input
                id="accessoriesAmountPaid"
                type="number"
                step="0.01"
                value={formData.accessoriesAmountPaid}
                onChange={(e) => updateField("accessoriesAmountPaid", e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          </div>

          <PillSelector
            label="NHS Voucher"
            field="nhsVoucher"
            options={["Yes", "No"]}
            formData={formData}
            updateField={updateField}
          />

          <div>
            <Label htmlFor="nhsVoucherType">NHS Voucher Type</Label>
            <Select value={formData.nhsVoucherType} onValueChange={(value) => updateField("nhsVoucherType", value)}>
              <SelectTrigger id="nhsVoucherType" className="mt-1" aria-label="NHS Voucher Type">
                <SelectValue placeholder="Select NHS voucher type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
                <SelectItem value="E">E</SelectItem>
                <SelectItem value="F">F</SelectItem>
                <SelectItem value="G">G</SelectItem>
                <SelectItem value="H">H</SelectItem>
                <SelectItem value="I">I (HES)</SelectItem>
                <SelectItem value="J">J</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nhsVoucherValue">NHS Voucher Value (£)</Label>
              <Input
                id="nhsVoucherValue"
                type="number"
                step="0.01"
                value={formData.nhsVoucherValue}
                onChange={(e) => updateField("nhsVoucherValue", e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="dispenseAmountPaid">Dispense Amount Paid (£)</Label>
              <Input
                id="dispenseAmountPaid"
                type="number"
                step="0.01"
                value={formData.dispenseAmountPaid}
                onChange={(e) => updateField("dispenseAmountPaid", e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="opsTransactionId">OPS Transaction ID</Label>
            <Input
              id="opsTransactionId"
              value={formData.opsTransactionId}
              onChange={(e) => updateField("opsTransactionId", e.target.value)}
              placeholder="Enter transaction ID"
              className="mt-1"
            />
          </div>

          <div className="mt-6 space-y-3 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg">Total Dispense Value:</span>
              <span className="font-semibold text-lg">£{totalDispenseValue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg">Total Transaction Value:</span>
              <span className="font-semibold text-lg">£{totalTransactionValue}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Follow-up & Completion */}
      <Card>
        <CardHeader>
          <CardTitle>Follow-up & Completion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PillSelector
            label="Collection Appointment Booked?"
            field="collectionAppointmentBooked"
            options={["Yes", "No", "N/A"]}
            formData={formData}
            updateField={updateField}
          />

          <PillSelector
            label="PCSE Completed?"
            field="pcseCompleted"
            options={["Yes", "No", "N/A"]}
            formData={formData}
            updateField={updateField}
          />
        </CardContent>
      </Card>

      {/* Form actions - Desktop: inline, Mobile: sticky footer */}
      <div className="hidden md:flex justify-end space-x-4 pt-6" role="group" aria-label="Form actions">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel} 
          disabled={isLoading}
          aria-label="Cancel patient form without saving"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          aria-label={isLoading ? "Saving patient data..." : "Save patient data"}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Mobile sticky footer */}
      <div className="md:hidden fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 p-4 pb-safe flex space-x-3 z-10 m-0" role="group" aria-label="Form actions">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel} 
          disabled={isLoading}
          className="flex-1"
          aria-label="Cancel patient form without saving"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="flex-1"
          aria-label={isLoading ? "Saving patient data..." : "Save patient data"}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Bottom padding for mobile sticky footer */}
      <div className="md:hidden h-20"></div>
    </form>
  );
}