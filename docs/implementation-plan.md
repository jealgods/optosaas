# OptoSaaS Implementation Plan

## Route Structure

```
/                                    → Landing/Login page
/super-admin/                        → Super Admin dashboard
/super-admin/franchises              → Manage all franchises
/super-admin/analytics               → Global analytics

/franchise/                          → Franchise Owner dashboard
/franchise/users                     → Users management (Owner/Manager)
/franchise/branches                  → Branches management (Owner only)
/franchise/optometrist-analysis      → Optometrist analysis (Owner only)
/franchise/dispenser-analysis        → Dispenser analysis (Owner only)

/staff/                              → Staff dashboard (All roles)
/staff/my-performance                → Individual performance metrics
/staff/schedule                      → Personal schedule/appointments
```

## Role Access Matrix

| Route | Owner | Manager | Staff |
|-------|-------|---------|-------|
| `/franchise/` (Dashboard) | ✅ | ❌ | ❌ |
| `/franchise/users` | ✅ | ✅ | ❌ |
| `/franchise/branches` | ✅ | ❌ | ❌ |
| `/franchise/optometrist-analysis` | ✅ | ❌ | ❌ |
| `/franchise/dispenser-analysis` | ✅ | ❌ | ❌ |
| `/staff/` | ✅ | ✅ | ✅ |

## Pages & Components Plan

### 1. Layout Components
- **Navbar** (`components/navbar.tsx`)
  - Role-based navigation (Owner/Manager/Staff get different tabs)
  - Logo, navigation tabs, user info, logout
  - Active state for current page
- **Franchise Layout** (`app/franchise/layout.tsx`) 
  - Wraps franchise pages with role-based navbar
- **Staff Layout** (`app/staff/layout.tsx`)
  - Wraps staff pages with staff-specific navbar

### 2. Franchise Dashboard Page (`app/franchise/page.tsx`) - Owner Only
- **Branch/Period Filters** (Select components)
- **Optometrist Leaderboard Table** (Table component)
- **Dispenser Leaderboard Table** (Table component)

### 3. Users Page (`app/franchise/users/page.tsx`) - Owner/Manager
- **Users Table** (Table with actions)
- **Add User Modal** (Dialog component)
- **Edit User Modal** (Dialog component)
- **Delete Confirmation** (AlertDialog component)

### 4. Branches Page (`app/franchise/branches/page.tsx`) - Owner Only
- **Branches Table** (Table with actions)
- **Add Branch Modal** (Dialog component)
- **Edit Branch Modal** (Dialog component)
- **Delete Confirmation** (AlertDialog component)

### 5. Optometrist Analysis Page (`app/franchise/optometrist-analysis/page.tsx`) - Owner Only
- **Filter Section** (Select components for branch, period, optometrist)
- **Conversion Metrics Cards** (Card components)
- **Revenue Breakdown Cards** (Card components)
- **Clinical Outcomes Tables** (Table components)
- **Product Breakdown Card** (Card component)

### 6. Dispenser Analysis Page (`app/franchise/dispenser-analysis/page.tsx`) - Owner Only
- **Filter Section** (Select components for branch, period, dispenser)
- **Conversion Metrics Cards** (Card components)
- **Revenue Breakdown Cards** (Card components)
- **Product Breakdown Tables** (Table components)
- **Additional Services Cards** (Card components)

### 7. Staff Dashboard Page (`app/staff/page.tsx`) - All Roles
- **Personal Performance Metrics** (Card components)
- **Recent Activity** (Table component)
- **Quick Actions** (Button components)

## Shadcn Components Needed

### Core Components
```bash
npx shadcn@latest add table
npx shadcn@latest add card
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add alert-dialog
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add checkbox
npx shadcn@latest add badge
```

### Data Management
- Mock data functions (`lib/mock-data.ts`)
- Type definitions (`lib/types.ts`)

## Implementation Order

1. **Setup & Layout**
   - Install required shadcn components
   - Create navbar component
   - Setup layout structure
   - Define types and mock data functions

2. **Dashboard Page**
   - Basic layout with filters
   - Optometrist leaderboard table
   - Dispenser leaderboard table

3. **Users Management**
   - Users table with data
   - Add user modal form
   - Edit user functionality
   - Delete confirmation

4. **Branches Management**
   - Branches table with data
   - Add branch modal form
   - Edit branch functionality
   - Delete confirmation

5. **Analysis Pages**
   - Optometrist analysis page
   - Dispenser analysis page
   - All metric cards and tables

## File Structure
```
app/
├── layout.tsx (global layout)
├── page.tsx (landing/login)
├── franchise/
│   ├── layout.tsx (franchise-specific layout)
│   ├── page.tsx (dashboard - owner only)
│   ├── users/
│   │   └── page.tsx (owner/manager)
│   ├── branches/
│   │   └── page.tsx (owner only)
│   ├── optometrist-analysis/
│   │   └── page.tsx (owner only)
│   └── dispenser-analysis/
│       └── page.tsx (owner only)
├── staff/
│   ├── layout.tsx (staff-specific layout)
│   ├── page.tsx (all roles)
│   ├── my-performance/
│   │   └── page.tsx
│   └── schedule/
│       └── page.tsx
└── super-admin/
    ├── layout.tsx
    ├── page.tsx
    ├── franchises/
    │   └── page.tsx
    └── analytics/
        └── page.tsx

components/
├── ui/ (shadcn components)
├── navbar/
│   ├── franchise-navbar.tsx
│   ├── staff-navbar.tsx
│   └── admin-navbar.tsx
├── franchise/
│   ├── users-table.tsx
│   ├── branches-table.tsx
│   ├── leaderboard-table.tsx
│   └── modals/
│       ├── add-user-modal.tsx
│       ├── edit-user-modal.tsx
│       ├── add-branch-modal.tsx
│       └── edit-branch-modal.tsx
├── staff/
│   ├── performance-card.tsx
│   └── activity-table.tsx
└── shared/
    ├── metric-card.tsx
    └── role-guard.tsx

lib/
├── mock-data.ts
├── types.ts
├── auth.ts (role checking)
└── utils.ts (already exists)
```

## Navigation Structure

### Owner Navbar:
- Dashboard | Users | Branches | Optometrist Analysis | Dispenser Analysis | Staff Portal

### Manager Navbar: 
- Users | Staff Portal

### Staff Navbar:
- My Dashboard | My Performance | Schedule

Ready to start implementation?