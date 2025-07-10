# Staff Side PRD - Patient Data Entry System

## Overview
The staff side is a comprehensive data entry system for tracking patient journeys from appointment booking through dispensing. Staff members enter detailed information about customers walking through the door, creating a complete sales and clinical tracking record.

## Core Functionality

### Patient Journey Tracking
- **OPS Patient Identifier** - Unique patient tracking ID
- **Appointment Management** - Type, arrival status, outcomes
- **Clinical Pathway** - NHS reasons, pre-screening, OCT bookings
- **Professional Services** - Optometrist assignments and recommendations
- **Dispensing Process** - Product selection, lens specifications, payment tracking

### Data Capture Points

#### Patient Identification
- **OPS Patient Identifier** - Free text input for unique patient tracking

#### Appointment & Arrival
- **Appointment Type** - Dropdown selection with options:
  - Eye Check Private
  - Eye Check NHS
  - Eye Check CLRS
  - Eye Check CLRS NHS
  - CL Check Private
  - CL Check CLRS
  - CL Trial
  - CL Trial Return
  - CES
  - CORRS
  - CUES
  - GERS
  - MECS
  - Recheck
  - Post Cat Check
  - Call Back
  - Call Back NHS
  - External Rx
  - External Rx NHS
  - Extra Pair
  - No Rx Sunglasses
  - GC on Collection
- **NHS Reason** - Dropdown selection with options:
  - Under 16
  - Over 60
  - 16-18 FTE
  - Diabetic
  - FHG
  - Financial Help
- **Arrival Status** - Dropdown selection with options:
  - Arrived
  - Failed to Attend
  - Cancelled
  - Rescheduled
- **Pre Screener** - Dropdown populated with list of dispensers in the system

#### Clinical Services
- **OCT** - Dropdown selection with options:
  - Yes
  - No
  - N/A
  - Clinical
  - Free
  - Staff
- **Where was OCT Booked?** - Dropdown selection with options:
  - In Store
  - By Calls Hub
- **Optometrist** - Dropdown populated with list of optometrists in the system
- **Appointment Outcome** - Dropdown selection with options:
  - Change in Rx
  - No Rx
  - Stable Rx
  - Referred
  - Needs Dilation
- **Did Optom Advise New?** - Dropdown selection with options:
  - Yes
  - No
- **Did Optom Discuss CL's?** - Dropdown selection with options:
  - Yes
  - No
- **Did Px Book a Trial?** - Dropdown selection with options:
  - Yes
  - No

#### Dispensing & Products
- **Did Patient Dispense?** - Dropdown selection with options:
  - Yes  
  - Declined Update
  - Coming Back
  - Further Apt Required  
  - Taken Rx
  - Other
  - No
- **Handover** - Dropdown populated with list of dispensers in the system
- **Dispenser** - Dropdown populated with list of dispensers in the system

#### Lens Specifications
- **Lens Manufacturer** - Dropdown selection with options:
  - Boots
  - Essilor
  - Zeiss
  - Norville
  - Bolle
  - MCR
  - Corporate
- **Lens Type** - Dropdown selection with options:
  - Single Vision
  - Bifocal
  - Vfocal
  - Office
- **Lens Index** - Dropdown selection with options:
  - 1.5
  - 1.59
  - 1.6
  - 1.67
  - 1.74
- **Lens Name** - Dropdown selection with options:
  - Standard
  - Thin
  - Ultrathin
  - UltrathinPlus
- **Lens Finish** - Dropdown selection with options:
  - Standard
  - Scratch Resistant
  - Protect
  - ProtectPlus
  - UVBlue
  - Eyedrive
- **Lens Tint** - Dropdown selection with options:
  - None
  - Sun
  - Transitions
  - Polarised
- **Glasses Cover** - Dropdown selection with options:
  - Yes
  - No

#### Financial Tracking
- **Glasses Cover Amount Paid** - Currency input field (£)
- **OCT Fee Amount Paid** - Currency input field (£)
- **Appt Fee Amount Paid** - Currency input field (£)
- **Accessories Amount Paid** - Currency input field (£)
- **NHS Voucher** - Dropdown selection with options:
  - Yes
  - No
- **NHS Voucher Type** - Dropdown selection with options:
  - A
  - B
  - C
  - D
  - E
  - F
  - G
  - H
  - I (HES)
  - J
- **NHS Voucher Value** - Currency input field (£)
- **Dispense Amount Paid** - Currency input field (£)
- **Dispense Value** - Currency input field (£)
- **Transaction Value** - Currency input field (£)
- **OPS Transaction ID** - Free text input for transaction tracking

#### Follow-up & Completion
- **Collection Appointment Booked?** - Dropdown selection with options:
  - Yes
  - No
- **PCSE Completed?** - Dropdown selection with options:
  - Yes
  - No
