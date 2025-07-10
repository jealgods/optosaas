import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface PatientEntry {
  opsPatientIdentifier: string;
  appointmentType: string;
  arrivalStatus: string;
  preScreener: string | null;
  appointmentDate: Date;
}

interface PatientEntryCardProps {
  entry: PatientEntry;
  onEdit: (entry: PatientEntry) => void;
  onDelete: (id: string) => void;
}

export function PatientEntryCard({ entry, onEdit, onDelete }: PatientEntryCardProps) {
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Arrived":
        return "default";
      case "Failed to Attend":
        return "destructive";
      case "Cancelled":
      case "Rescheduled":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Arrived":
        return "✓ Arrived";
      case "Failed to Attend":
        return "✗ Failed to Attend";
      case "Cancelled":
        return "⚪ Cancelled";
      case "Rescheduled":
        return "⏰ Rescheduled";
      default:
        return status;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow" role="article" aria-labelledby={`patient-${entry.opsPatientIdentifier}-title`}>
      <CardHeader className="pb-3">
        <CardTitle id={`patient-${entry.opsPatientIdentifier}-title`} className="text-lg font-semibold">
          {entry.opsPatientIdentifier}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Appointment Date</dt>
            <dd className="text-sm mt-1 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" aria-hidden="true" />
              {format(entry.appointmentDate, "PPP")}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Appointment Type</dt>
            <dd className="text-sm mt-1">{entry.appointmentType}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Arrival Status</dt>
            <dd className="mt-1">
              <Badge variant={getStatusVariant(entry.arrivalStatus)} aria-label={`Status: ${entry.arrivalStatus}`}>
                {getStatusText(entry.arrivalStatus)}
              </Badge>
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Pre Screener</dt>
            <dd className="text-sm mt-1">{entry.preScreener || "Not assigned"}</dd>
          </div>
        </div>
          
        <div className="flex space-x-2 pt-4 border-t" role="group" aria-label={`Actions for patient ${entry.opsPatientIdentifier}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(entry)}
            className="flex-1"
            aria-label={`Edit patient ${entry.opsPatientIdentifier}`}
          >
            <Pencil className="h-4 w-4 mr-1" aria-hidden="true" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(entry.opsPatientIdentifier)}
            className="flex-1 text-destructive hover:text-destructive"
            aria-label={`Delete patient ${entry.opsPatientIdentifier}`}
          >
            <Trash2 className="h-4 w-4 mr-1" aria-hidden="true" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}