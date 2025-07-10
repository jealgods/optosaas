# OptSaaS Entity Relationship Diagram

## Database Design Overview
This ERD represents a comprehensive optical/optometry SaaS platform designed for managing franchises, branches, staff, and patient appointments. The schema is optimized for PostgreSQL/Supabase with proper normalization and indexing considerations.

## Entities and Relationships

### 1. FRANCHISE
**Description:** Central franchise organizations that own multiple branch locations
```
FRANCHISE {
    id              SERIAL PRIMARY KEY
    name            VARCHAR(255) NOT NULL UNIQUE
    created_at      TIMESTAMP DEFAULT NOW()
    updated_at      TIMESTAMP DEFAULT NOW()
}
```
**Relationships:**
- One-to-Many with BRANCH
- One-to-Many with USER
- One-to-Many with PATIENT_APPOINTMENT

---

### 2. BRANCH
**Description:** Individual optical store locations within a franchise network
```
BRANCH {
    id              SERIAL PRIMARY KEY
    name            VARCHAR(255) NOT NULL
    franchise_id    INTEGER NOT NULL [FK → FRANCHISE.id]
    created_at      TIMESTAMP DEFAULT NOW()
    updated_at      TIMESTAMP DEFAULT NOW()
    
    INDEX idx_branch_franchise (franchise_id)
}
```
**Relationships:**
- Many-to-One with FRANCHISE
- One-to-Many with PATIENT_APPOINTMENT
- Many-to-Many with USER (through USER_BRANCH_ACCESS)

---

### 3. USER
**Description:** System users including optometrists, dispensers, managers, and administrators
```
USER {
    id              SERIAL PRIMARY KEY
    name            VARCHAR(255) NOT NULL
    email           VARCHAR(255) NOT NULL UNIQUE
    role            VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'owner', 'manager', 'staff'))
    franchise_id    INTEGER [FK → FRANCHISE.id] -- NULL for super_admin
    is_dispenser    BOOLEAN DEFAULT FALSE
    is_optometrist  BOOLEAN DEFAULT FALSE
    status          VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
    created_at      TIMESTAMP DEFAULT NOW()
    updated_at      TIMESTAMP DEFAULT NOW()
    
    INDEX idx_user_email (email)
    INDEX idx_user_franchise (franchise_id)
    INDEX idx_user_role (role)
}
```
**Relationships:**
- Many-to-One with FRANCHISE
- Many-to-Many with BRANCH (through USER_BRANCH_ACCESS)
- One-to-Many with PATIENT_APPOINTMENT (as optometrist)
- One-to-Many with PATIENT_APPOINTMENT (as dispenser)
- One-to-Many with PATIENT_APPOINTMENT (as pre_screener)

---

### 4. USER_BRANCH_ACCESS
**Description:** Junction table managing which branches each user can access
```
USER_BRANCH_ACCESS {
    user_id         INTEGER NOT NULL [FK → USER.id]
    branch_id       INTEGER NOT NULL [FK → BRANCH.id]
    granted_at      TIMESTAMP DEFAULT NOW()
    granted_by      INTEGER [FK → USER.id]
    
    PRIMARY KEY (user_id, branch_id)
    INDEX idx_branch_users (branch_id)
}
```
**Relationships:**
- Many-to-One with USER
- Many-to-One with BRANCH

---

### 5. PATIENT_APPOINTMENT
**Description:** Core entity tracking patient visits, clinical data, and financial transactions
```
PATIENT_APPOINTMENT {
    ops_patient_identifier      VARCHAR(50) PRIMARY KEY
    appointment_date           DATE NOT NULL
    appointment_type_id        INTEGER NOT NULL [FK → APPOINTMENT_TYPES.id]
    appointment_type           VARCHAR(50) NOT NULL -- Denormalized for performance
    nhs_reason_id             INTEGER [FK → NHS_REASONS.id]
    nhs_reason                 VARCHAR(100) -- Denormalized for performance
    arrival_status_id         INTEGER [FK → ARRIVAL_STATUSES.id]
    arrival_status             VARCHAR(50) -- Denormalized for performance
    pre_screener_id           INTEGER [FK → USER.id]
    oct_option_id             INTEGER [FK → OCT_OPTIONS.id]
    oct                        VARCHAR(50) -- Denormalized for performance
    oct_booking_location_id   INTEGER [FK → OCT_BOOKING_LOCATIONS.id]
    where_was_oct_booked      VARCHAR(100) -- Denormalized for performance
    optometrist_id            INTEGER [FK → USER.id]
    appointment_outcome_type_id INTEGER [FK → APPOINTMENT_OUTCOME_TYPES.id]
    appointment_outcome        VARCHAR(100) -- Denormalized for performance
    did_optom_advise_new      VARCHAR(50)
    did_optom_discuss_cls     VARCHAR(50)
    did_px_book_trial         VARCHAR(50)
    dispensing_status_id      INTEGER [FK → DISPENSING_STATUSES.id]
    did_patient_dispense      VARCHAR(50) -- Denormalized for performance
    handover                  VARCHAR(255)
    dispenser_id              INTEGER [FK → USER.id]
    glasses_cover_amount_paid  DECIMAL(10,2) DEFAULT 0
    oct_fee_amount_paid       DECIMAL(10,2) DEFAULT 0
    appt_fee_amount_paid      DECIMAL(10,2) DEFAULT 0
    accessories_amount_paid    DECIMAL(10,2) DEFAULT 0
    nhs_voucher               VARCHAR(50)
    nhs_voucher_type_id      INTEGER [FK → NHS_VOUCHER_TYPES.id]
    nhs_voucher_type          VARCHAR(50) -- Denormalized for performance
    nhs_voucher_value         DECIMAL(10,2) DEFAULT 0
    dispense_amount_paid      DECIMAL(10,2) DEFAULT 0
    transaction_value         DECIMAL(10,2) DEFAULT 0
    ops_transaction_id        VARCHAR(50) UNIQUE
    collection_appointment_booked VARCHAR(50)
    pcse_completed            VARCHAR(50)
    branch_id                 INTEGER NOT NULL [FK → BRANCH.id]
    franchise_id              INTEGER NOT NULL [FK → FRANCHISE.id]
    created_at                TIMESTAMP DEFAULT NOW()
    updated_at                TIMESTAMP DEFAULT NOW()
    
    INDEX idx_appointment_date (appointment_date)
    INDEX idx_appointment_branch (branch_id)
    INDEX idx_appointment_franchise (franchise_id)
    INDEX idx_appointment_optometrist (optometrist_id)
    INDEX idx_appointment_dispenser (dispenser_id)
    INDEX idx_appointment_type (appointment_type_id)
    INDEX idx_appointment_outcome (appointment_outcome_type_id)
    INDEX idx_nhs_reason (nhs_reason_id)
    INDEX idx_arrival_status (arrival_status_id)
    INDEX idx_oct_option (oct_option_id)
    INDEX idx_oct_booking_location (oct_booking_location_id)
    INDEX idx_nhs_voucher_type (nhs_voucher_type_id)
    INDEX idx_dispensing_status (dispensing_status_id)
}
```
**Relationships:**
- Many-to-One with BRANCH
- Many-to-One with FRANCHISE
- Many-to-One with USER (optometrist)
- Many-to-One with USER (dispenser)
- Many-to-One with USER (pre_screener)
- Many-to-One with APPOINTMENT_TYPES
- Many-to-One with APPOINTMENT_OUTCOME_TYPES
- Many-to-One with NHS_REASONS
- Many-to-One with ARRIVAL_STATUSES
- Many-to-One with OCT_OPTIONS
- Many-to-One with OCT_BOOKING_LOCATIONS
- Many-to-One with NHS_VOUCHER_TYPES
- Many-to-One with DISPENSING_STATUSES
- One-to-Many with LENS_SPECIFICATION

---

### 6. LENS_SPECIFICATION
**Description:** Detailed lens prescription and specification data for each patient appointment
```
LENS_SPECIFICATION {
    id                      SERIAL PRIMARY KEY
    ops_patient_identifier  VARCHAR(50) NOT NULL [FK → PATIENT_APPOINTMENT.ops_patient_identifier]
    eye                     VARCHAR(10) NOT NULL CHECK (eye IN ('right', 'left', 'both'))
    lens_manufacturer_id    INTEGER [FK → LENS_MANUFACTURERS.id]
    lens_manufacturer       VARCHAR(100) -- Denormalized for performance
    lens_type_id           INTEGER [FK → LENS_TYPES.id]
    lens_type              VARCHAR(100) -- Denormalized for performance
    lens_index_id          INTEGER [FK → LENS_INDEXES.id]
    lens_index             VARCHAR(20) -- Denormalized for performance
    lens_name_id           INTEGER [FK → LENS_NAMES.id]
    lens_name              VARCHAR(100) -- Denormalized for performance
    lens_finish_id         INTEGER [FK → LENS_FINISHES.id]
    lens_finish            VARCHAR(100) -- Denormalized for performance
    lens_tint_id           INTEGER [FK → LENS_TINTS.id]
    lens_tint              VARCHAR(100) -- Denormalized for performance
    glasses_cover          VARCHAR(50)
    dispense_value         DECIMAL(10,2) DEFAULT 0
    created_at             TIMESTAMP DEFAULT NOW()
    
    INDEX idx_lens_patient (ops_patient_identifier)
    INDEX idx_lens_manufacturer (lens_manufacturer_id)
    INDEX idx_lens_type (lens_type_id)
    INDEX idx_lens_index (lens_index_id)
    INDEX idx_lens_name (lens_name_id)
    INDEX idx_lens_finish (lens_finish_id)
    INDEX idx_lens_tint (lens_tint_id)
}
```
**Relationships:**
- Many-to-One with PATIENT_APPOINTMENT
- Many-to-One with LENS_MANUFACTURERS
- Many-to-One with LENS_TYPES
- Many-to-One with LENS_INDEXES
- Many-to-One with LENS_NAMES
- Many-to-One with LENS_FINISHES
- Many-to-One with LENS_TINTS

---

### 7. APPOINTMENT_TYPES
**Description:** Reference table for appointment types available in the patient entry form
```
APPOINTMENT_TYPES {
    id                  SERIAL PRIMARY KEY
    type_code           VARCHAR(50) NOT NULL UNIQUE
    type_name           VARCHAR(100) NOT NULL
    description         TEXT
    duration_minutes    INTEGER DEFAULT 30
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_type_code (type_code)
}
```

**Sample Data:**
- Eye Check Private
- Eye Check NHS
- Eye Check CLRS
- Eye Check CLRS NHS
- CL Check Private
- CL Check CLRS
- CL Trial
- CL Trial Return
- Medical Emergency
- Recheck
- Post Cat Check
- Call Back
- Call Back NHS
- External Rx
- External Rx NHS
- Extra Pair
- No Rx Sunglasses
- GC on Collection
**Relationships:**
- One-to-Many with PATIENT_APPOINTMENT

---

### 8. APPOINTMENT_OUTCOME_TYPES
**Description:** Reference table for appointment outcomes available in the patient entry form
```
APPOINTMENT_OUTCOME_TYPES {
    id                  SERIAL PRIMARY KEY
    outcome_code        VARCHAR(50) NOT NULL UNIQUE
    outcome_name        VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_outcome_code (outcome_code)
}
```

**Sample Data:**
- Change in Rx
- No Rx
- Stable Rx
- Referred
- Needs Dilation
**Relationships:**
- One-to-Many with PATIENT_APPOINTMENT

---

### 9. LENS_MANUFACTURERS
**Description:** Reference table for available lens brands and manufacturers
```
LENS_MANUFACTURERS {
    id                  SERIAL PRIMARY KEY
    manufacturer_code   VARCHAR(50) NOT NULL UNIQUE
    manufacturer_name   VARCHAR(100) NOT NULL
    website            VARCHAR(255)
    contact_info       TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_manufacturer_code (manufacturer_code)
}
```

**Sample Data:**
- Boots
- Essilor
- Zeiss
- Norville
- Bolle
- MCR
- Corporate

**Relationships:**
- One-to-Many with LENS_SPECIFICATION

---

### 10. LENS_TYPES
**Description:** Reference table for lens types: Single vision, bifocal, varifocal options
```
LENS_TYPES {
    id                  SERIAL PRIMARY KEY
    type_code           VARCHAR(50) NOT NULL UNIQUE
    type_name           VARCHAR(100) NOT NULL
    category            VARCHAR(50) CHECK (category IN ('single_vision', 'bifocal', 'varifocal'))
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_lens_type_code (type_code)
}
```

**Sample Data:**
- Single Vision
- Bifocal
- Vfocal
- Office

**Relationships:**
- One-to-Many with LENS_SPECIFICATION

---

### 11. NHS_REASONS
**Description:** Reference table for NHS eligibility reasons
```
NHS_REASONS {
    id                  SERIAL PRIMARY KEY
    reason_code         VARCHAR(50) NOT NULL UNIQUE
    reason_name         VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_reason_code (reason_code)
}
```

**Sample Data:**
- Under 16
- Over 60
- 16-18 FTE
- Diabetic
- FHG
- Financial Help

**Relationships:**
- One-to-Many with PATIENT_APPOINTMENT

---

### 12. ARRIVAL_STATUSES
**Description:** Reference table for patient arrival status options
```
ARRIVAL_STATUSES {
    id                  SERIAL PRIMARY KEY
    status_code         VARCHAR(50) NOT NULL UNIQUE
    status_name         VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_status_code (status_code)
}
```

**Sample Data:**
- Arrived
- Failed to Attend
- Cancelled
- Rescheduled

**Relationships:**
- One-to-Many with PATIENT_APPOINTMENT

---

### 13. OCT_OPTIONS
**Description:** Reference table for OCT service options
```
OCT_OPTIONS {
    id                  SERIAL PRIMARY KEY
    option_code         VARCHAR(50) NOT NULL UNIQUE
    option_name         VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_option_code (option_code)
}
```

**Sample Data:**
- Yes
- No
- N/A
- Clinical
- Free
- Staff

**Relationships:**
- One-to-Many with PATIENT_APPOINTMENT

---

### 14. OCT_BOOKING_LOCATIONS
**Description:** Reference table for OCT booking locations
```
OCT_BOOKING_LOCATIONS {
    id                  SERIAL PRIMARY KEY
    location_code       VARCHAR(50) NOT NULL UNIQUE
    location_name       VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_location_code (location_code)
}
```

**Sample Data:**
- In Store
- By Calls Hub

**Relationships:**
- One-to-Many with PATIENT_APPOINTMENT

---

### 15. NHS_VOUCHER_TYPES
**Description:** Reference table for NHS voucher categories
```
NHS_VOUCHER_TYPES {
    id                  SERIAL PRIMARY KEY
    voucher_code        VARCHAR(10) NOT NULL UNIQUE
    voucher_name        VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_voucher_code (voucher_code)
}
```

**Sample Data:**
- A, B, C, D, E, F, G, H, I (HES), J

**Relationships:**
- One-to-Many with PATIENT_APPOINTMENT

---

### 16. DISPENSING_STATUSES
**Description:** Reference table for patient dispensing decisions
```
DISPENSING_STATUSES {
    id                  SERIAL PRIMARY KEY
    status_code         VARCHAR(50) NOT NULL UNIQUE
    status_name         VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_dispensing_status_code (status_code)
}
```

**Sample Data:**
- Yes
- Declined Update
- Coming Back
- Further Apt Required
- Taken Rx
- Other
- No

**Relationships:**
- One-to-Many with PATIENT_APPOINTMENT

---

### 17. LENS_INDEXES
**Description:** Reference table for lens thickness/index options
```
LENS_INDEXES {
    id                  SERIAL PRIMARY KEY
    index_code          VARCHAR(50) NOT NULL UNIQUE
    index_name          VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_lens_index_code (index_code)
}
```

**Sample Data:**
- Standard
- Thin
- Ultrathin
- Ultrathin Plus

**Relationships:**
- One-to-Many with LENS_SPECIFICATION

---

### 18. LENS_NAMES
**Description:** Reference table for specific lens product names
```
LENS_NAMES {
    id                  SERIAL PRIMARY KEY
    name_code           VARCHAR(50) NOT NULL UNIQUE
    name_display        VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_lens_name_code (name_code)
}
```

**Sample Data:**
- Standard
- Thin
- Ultrathin
- UltrathinPlus

**Relationships:**
- One-to-Many with LENS_SPECIFICATION

---

### 19. LENS_FINISHES
**Description:** Reference table for lens finish/coating options
```
LENS_FINISHES {
    id                  SERIAL PRIMARY KEY
    finish_code         VARCHAR(50) NOT NULL UNIQUE
    finish_name         VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_lens_finish_code (finish_code)
}
```

**Sample Data:**
- Standard
- Scratch Resistant
- Protect
- ProtectPlus
- UVBlue
- Eyedrive

**Relationships:**
- One-to-Many with LENS_SPECIFICATION

---

### 20. LENS_TINTS
**Description:** Reference table for lens tinting options
```
LENS_TINTS {
    id                  SERIAL PRIMARY KEY
    tint_code           VARCHAR(50) NOT NULL UNIQUE
    tint_name           VARCHAR(100) NOT NULL
    description         TEXT
    is_active          BOOLEAN DEFAULT TRUE
    created_at         TIMESTAMP DEFAULT NOW()
    
    INDEX idx_lens_tint_code (tint_code)
}
```

**Sample Data:**
- None
- Sun
- Transitions
- Polarised

**Relationships:**
- One-to-Many with LENS_SPECIFICATION

---

---

## Relationship Summary

### One-to-Many Relationships:
1. **FRANCHISE → BRANCH** (1:N)
2. **FRANCHISE → USER** (1:N)
3. **FRANCHISE → PATIENT_APPOINTMENT** (1:N)
4. **BRANCH → PATIENT_APPOINTMENT** (1:N)
6. **USER → PATIENT_APPOINTMENT** (1:N) - Multiple relationships for different roles
7. **PATIENT_APPOINTMENT → LENS_SPECIFICATION** (1:N)
8. **APPOINTMENT_TYPES → PATIENT_APPOINTMENT** (1:N)
9. **APPOINTMENT_OUTCOME_TYPES → PATIENT_APPOINTMENT** (1:N)
10. **NHS_REASONS → PATIENT_APPOINTMENT** (1:N)
11. **ARRIVAL_STATUSES → PATIENT_APPOINTMENT** (1:N)
12. **OCT_OPTIONS → PATIENT_APPOINTMENT** (1:N)
13. **OCT_BOOKING_LOCATIONS → PATIENT_APPOINTMENT** (1:N)
14. **NHS_VOUCHER_TYPES → PATIENT_APPOINTMENT** (1:N)
15. **DISPENSING_STATUSES → PATIENT_APPOINTMENT** (1:N)
16. **LENS_MANUFACTURERS → LENS_SPECIFICATION** (1:N)
17. **LENS_TYPES → LENS_SPECIFICATION** (1:N)
18. **LENS_INDEXES → LENS_SPECIFICATION** (1:N)
19. **LENS_NAMES → LENS_SPECIFICATION** (1:N)
20. **LENS_FINISHES → LENS_SPECIFICATION** (1:N)
21. **LENS_TINTS → LENS_SPECIFICATION** (1:N)

### Many-to-Many Relationships:
1. **USER ↔ BRANCH** (M:N) - Through USER_BRANCH_ACCESS junction table

---

## Supabase/PostgreSQL Optimization Notes

### 1. **Row Level Security (RLS) Considerations:**
- Enable RLS on all tables
- Super admins: Full access to all data
- Franchise owners: Access to their franchise data only
- Managers/Staff: Access limited to assigned branches

### 2. **Indexes for Performance:**
- Primary keys automatically indexed
- Foreign key columns indexed for join performance
- Date columns indexed for time-based queries
- Email indexed for user lookups

### 3. **Constraints and Data Integrity:**
- CHECK constraints on ENUM-like fields
- UNIQUE constraints on business keys
- Foreign key constraints with appropriate CASCADE rules
- NOT NULL constraints on required fields

### 4. **Audit Fields:**
- `created_at` and `updated_at` timestamps on all tables
- Consider adding `created_by` and `updated_by` for full audit trail

### 5. **Performance Considerations:**
- Composite indexes on frequently queried column combinations
- Partial indexes for filtered queries (e.g., active users only)
- Consider partitioning PATIENT_APPOINTMENT by date for large datasets