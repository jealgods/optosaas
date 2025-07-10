# Staff Side Implementation Plan

## Overview
Implement the staff login page and dashboard based on the ASCII wireframes and PRD specifications.

## Implementation Order

### Phase 1: Unified Login Page
**Route:** `/login`

**Components to Create:**
1. `app/login/page.tsx` - Unified login page component
2. `components/login-form.tsx` - Login form component

**Features:**
- Simple username/password form
- "OptoSaaS" branding (not staff-specific)
- "Forgot Password?" link
- Responsive design (desktop/mobile)
- Role-based redirect logic (mock implementation)

**Redirect Logic:**
- Staff roles → `/staff/dashboard`
- Owner/Manager roles → `/franchise` (existing)
- Super Admin → `/franchise` (existing)

### Phase 2: Dashboard Page  
**Route:** `/staff/dashboard`

**Components to Create:**
1. `app/staff/layout.tsx` - Staff layout with navbar
2. `app/staff/dashboard/page.tsx` - Dashboard page component
3. `components/staff/navbar.tsx` - Staff navigation bar
4. `components/staff/patient-entry-card.tsx` - Individual patient entry card
5. `components/staff/patient-entries-grid.tsx` - Grid of patient entries

**Dashboard Features:**
- Venue selector dropdown in navbar
- Patient entries displayed as cards
- Add New Entry button
- Edit/Delete actions on each card
- Responsive grid layout (2-column desktop, 1-column mobile)
- Load More button

**Data Display:**
- OPS Patient Identifier
- Appointment Type
- Arrival Status  
- Pre Screener
- Action buttons (Edit, Delete)

## File Structure
```
app/
├── login/
│   └── page.tsx            # Unified login page
├── staff/
│   ├── layout.tsx          # Staff layout with navbar
│   └── dashboard/
│       └── page.tsx        # Dashboard page

components/
├── login-form.tsx          # Unified login form
└── staff/
    ├── navbar.tsx          # Staff navigation
    ├── patient-entry-card.tsx     # Single patient card
    └── patient-entries-grid.tsx   # Patient entries grid
```

## Routes
- `/login` - Unified login page (redirects based on role)
- `/staff/dashboard` - Staff dashboard with patient entries
- `/franchise` - Owner/Manager dashboard (existing)

## Data Source
- Use existing `mock-data/patient-entries.json`
- Use existing `mock-data/branches.json` for venue selector
- Use existing `mock-data/users.json` for dispenser lists

## Styling
- Follow existing Tailwind CSS patterns from franchise side
- Use existing UI components from `components/ui/`
- Responsive design with mobile-first approach
- Card-based layout for patient entries

## No Additional Features
- No authentication logic
- No form validation beyond basic HTML
- No API integration
- No state management beyond basic React state
- No routing beyond the two pages
- No patient entry form (Phase 3, not in this implementation)