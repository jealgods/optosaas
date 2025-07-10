# Staff Dashboard - ASCII Art Mockup

## Desktop View
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ OptoSaaS Staff      [Downtown Branch ▼]           [Profile] [Logout]            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Patient Entries Dashboard                          [+ Add New Entry]          │
│                                                                                 │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────────────┐│
│  │ OPS ID: SMITH123                    │  │ OPS ID: JONES456                    ││
│  │ Appointment Type: Eye Check NHS     │  │ Appointment Type: CL Trial          ││
│  │ Arrival Status: Arrived             │  │ Arrival Status: Arrived             ││
│  │ Pre Screener: [Dispenser Name]      │  │ Pre Screener: [Dispenser Name]      ││
│  │ ┌─────────┐ ┌─────────┐             │  │ ┌─────────┐ ┌─────────┐             ││
│  │ │  Edit   │ │ Delete  │             │  │ │  Edit   │ │ Delete  │             ││
│  │ └─────────┘ └─────────┘             │  │ └─────────┘ └─────────┘             ││
│  └─────────────────────────────────────┘  └─────────────────────────────────────┘│
│                                                                                 │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────────────┐│
│  │ OPS ID: BROWN789                    │  │ OPS ID: WILSON321                   ││
│  │ Appointment Type: Eye Check Private │  │ Appointment Type: MECS              ││
│  │ Arrival Status: Failed to Attend    │  │ Arrival Status: Arrived             ││
│  │ Pre Screener: -                     │  │ Pre Screener: [Dispenser Name]      ││
│  │ ┌─────────┐ ┌─────────┐             │  │ ┌─────────┐ ┌─────────┐             ││
│  │ │  Edit   │ │ Delete  │             │  │ │  Edit   │ │ Delete  │             ││
│  │ └─────────┘ └─────────┘             │  │ └─────────┘ └─────────┘             ││
│  └─────────────────────────────────────┘  └─────────────────────────────────────┘│
│                                                                                 │
│                         [Load More Entries]                                    │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Mobile View
```
┌─────────────────────────────────────┐
│ OptoSaaS Staff    [☰]               │
│                                     │
│ [Downtown Branch ▼]                 │
├─────────────────────────────────────┤
│                                     │
│ Patient Entries                     │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        + Add New Entry          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ OPS ID: SMITH123                │ │
│ │ Appointment Type: Eye Check NHS │ │
│ │ Arrival Status: Arrived         │ │
│ │ Pre Screener: [Dispenser Name]  │ │
│ │                                 │ │
│ │ [Edit] [Delete]                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ OPS ID: JONES456                │ │
│ │ Appointment Type: CL Trial      │ │
│ │ Arrival Status: Arrived         │ │
│ │ Pre Screener: [Dispenser Name]  │ │
│ │                                 │ │
│ │ [Edit] [Delete]                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ OPS ID: BROWN789                │ │
│ │ Appointment Type: Eye Check Private │
│ │ Arrival Status: Failed to Attend│ │
│ │ Pre Screener: -                 │ │
│ │                                 │ │
│ │ [Edit] [Delete]                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ OPS ID: WILSON321               │ │
│ │ Appointment Type: MECS          │ │
│ │ Arrival Status: Arrived         │ │
│ │ Pre Screener: [Dispenser Name]  │ │
│ │                                 │ │
│ │ [Edit] [Delete]                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│      [Load More Entries]            │
│                                     │
└─────────────────────────────────────┘
```

## Dashboard Features

### Navigation Bar
- **OptoSaaS Staff** - Brand/logo on left
- **Venue Selector** - Dropdown to switch between branches (Downtown Branch, Mall Branch, etc.)
- **Profile & Logout** - User account management on right
- **Mobile Menu** - Hamburger menu for mobile navigation

### Entry Cards
Each patient entry card displays:
- **Patient ID** - Unique identifier (#PS001, #PS002, etc.)
- **Patient Name** - Full name of patient
- **Appointment Type** - Eye Check NHS, CL Trial, MECS, etc.
- **Arrival Status** - Arrived, Failed to Attend, etc.
- **Pre-Screener** - Assigned staff member
- **Current Status** - In Progress, With Optometrist, Completed, etc.

### Actions
- **Edit Button** - Modify existing entry data (opens patient form)
- **Delete Button** - Remove entry (with confirmation)
- **Add New Entry** - Primary CTA to start new patient workflow

### Mobile Responsive Features
- **Stacked Layout** - Cards stack vertically on mobile
- **Larger Touch Targets** - Buttons sized for finger tapping
- **Simplified Navigation** - Hamburger menu for mobile
- **Prominent Add Button** - Easy access to primary action
- **Condensed Card Info** - Essential info only on mobile

### Status Indicators
- **In Progress** - Patient currently in system
- **With Optometrist** - In clinical examination
- **Waiting for OCT** - Pending diagnostic
- **Ready for Dispensing** - Clinical complete, needs products
- **Completed** - Full patient journey finished
- **No Show** - Failed to attend appointment