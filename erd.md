# OptSaaS Entity Relationship Diagram

## Overview
This document contains the Entity Relationship Diagram (ERD) for the OptSaaS application, which is an optical/optometry SaaS platform for managing franchises, branches, staff, and patient appointments.

## ERD Diagram

```mermaid
erDiagram
    FRANCHISE {
        int id PK
        string name
    }
    
    BRANCH {
        int id PK
        string name
        int franchiseId FK
    }
    
    USER {
        int id PK
        string name
        string email
        string role "super_admin|owner|manager|staff"
        int franchiseId FK "nullable"
        array branchAccess "array of branch IDs"
        boolean isDispenser
        boolean isOptometrist "nullable"
        string status "active|inactive"
    }
    
    PATIENT_APPOINTMENT {
        string opsPatientIdentifier PK
        date appointmentDate
        string appointmentType
        string nhsReason "nullable"
        string arrivalStatus
        string preScreener "nullable"
        string oct "nullable"
        string whereWasOctBooked "nullable"
        string optometrist "nullable"
        string appointmentOutcome "nullable"
        string didOptomAdviseNew "nullable"
        string didOptomDiscussCls "nullable"
        string didPxBookTrial "nullable"
        string didPatientDispense "nullable"
        string handover "nullable"
        string dispenser "nullable"
        string glassesCoverAmountPaid
        string octFeeAmountPaid
        string apptFeeAmountPaid
        string accessoriesAmountPaid
        string nhsVoucher
        string nhsVoucherType
        string nhsVoucherValue
        string dispenseAmountPaid
        string transactionValue
        string opsTransactionId
        string collectionAppointmentBooked
        string pcseCompleted
        datetime createdAt
        int branchId FK
        int franchiseId FK
    }
    
    LENS_SPECIFICATION {
        string id PK
        string opsPatientIdentifier FK
        string lensManufacturer
        string lensType
        string lensIndex
        string lensName
        string lensFinish
        string lensTint
        string glassesCover
        string dispenseValue
    }
    
    PERFORMANCE_METRICS {
        int id PK
        int userId FK
        int branchId FK
        date metricDate
        float sameDayConversion
        float overallConversion
        float totalDispenseRevenue
        float avgPerDispense
        float discussedCLsAtEE
        float bookedTrialAfterEE
        float totalAppointmentRevenue
        float rpt
    }
    
    APPOINTMENT_OUTCOMES {
        int id PK
        int branchId FK
        string appointmentType
        string outcomeLabel
        int count
        float percentage
        date reportDate
    }

    FRANCHISE ||--o{ BRANCH : "has"
    FRANCHISE ||--o{ USER : "has staff"
    BRANCH ||--o{ PATIENT_APPOINTMENT : "handles"
    BRANCH ||--o{ PERFORMANCE_METRICS : "tracks"
    BRANCH ||--o{ APPOINTMENT_OUTCOMES : "reports"
    USER ||--o{ PATIENT_APPOINTMENT : "serves as optometrist"
    USER ||--o{ PATIENT_APPOINTMENT : "serves as dispenser"
    USER ||--o{ PATIENT_APPOINTMENT : "serves as preScreener"
    USER ||--o{ PERFORMANCE_METRICS : "generates"
    USER }o--|| BRANCH : "has access to"
    PATIENT_APPOINTMENT ||--o{ LENS_SPECIFICATION : "includes"
    FRANCHISE ||--o{ PATIENT_APPOINTMENT : "owns"
```

## Entity Descriptions

### FRANCHISE
- Central entity representing franchise organizations
- Can have multiple branches and users

### BRANCH
- Represents individual branch locations within a franchise
- Handles patient appointments and tracks performance

### USER
- Represents system users with different roles
- Roles: super_admin, owner, manager, staff
- Staff can be optometrists and/or dispensers
- Users can have access to multiple branches

### PATIENT_APPOINTMENT
- Core entity for patient visits and clinical data
- Uses `opsPatientIdentifier` as primary key (external patient ID)
- Tracks appointment details, clinical outcomes, and financial transactions
- Links to optometrist, dispenser, and pre-screener users

### LENS_SPECIFICATION
- Stores lens details for patient prescriptions
- Multiple lens specifications can be associated with one appointment
- Tracks lens properties and dispense values

### PERFORMANCE_METRICS
- Tracks staff performance indicators
- Includes conversion rates, revenue metrics, and appointment statistics
- Calculated per user per branch per date

### APPOINTMENT_OUTCOMES
- Aggregated appointment outcome statistics
- Tracked by branch and appointment type
- Used for reporting and analysis

## Relationships

1. **Franchise → Branch**: One-to-many relationship
2. **Franchise → User**: One-to-many relationship (franchise staff)
3. **Branch → Patient Appointment**: One-to-many relationship
4. **User → Branch**: Many-to-many relationship (branch access)
5. **User → Patient Appointment**: Multiple one-to-many relationships (as optometrist, dispenser, or pre-screener)
6. **Patient Appointment → Lens Specification**: One-to-many relationship
7. **Branch → Performance Metrics**: One-to-many relationship
8. **User → Performance Metrics**: One-to-many relationship
9. **Branch → Appointment Outcomes**: One-to-many relationship

## Notes

1. The system is appointment-centric rather than patient-centric
2. Patients are identified by external identifiers (`opsPatientIdentifier`)
3. Financial tracking is integrated into appointment records
4. Performance metrics are calculated based on appointment data
5. The current implementation uses mock data without a formal database