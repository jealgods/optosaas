# OptoSaaS User Stories

## 1. Authentication & Login Features

### General Authentication
- As a user, I want to log in with my email and password so that I can access my account securely
- As a user, I want to see appropriate error messages when my login fails so that I know what went wrong
- As a user, I want to be automatically redirected to my role-specific dashboard after login so that I can start working immediately
- As a user, I want to log out of my account so that I can secure my session when I'm done

### Role-Based Access
- As a super admin, I want to access the platform admin dashboard after login so that I can manage franchises
- As a franchise owner, I want to access my franchise dashboard after login so that I can view performance metrics
- As a franchise manager, I want to access limited franchise features after login based on my permissions
- As a staff member, I want to access the patient entry dashboard after login so that I can log appointments

### Password Management
- As a user, I want to reset my password if I forget it so that I can regain access to my account
- As a franchise owner, I want to send password reset links to my staff so that they can access their accounts

## 2. Staff Dashboard Features

### Patient Entries View
- As a staff member, I want to view all patient entries in a grid format so that I can see today's appointments at a glance
- As a staff member, I want to filter patient entries by branch so that I only see relevant appointments
- As a staff member, I want to see key information (patient ID, appointment type, arrival status, pre-screener, date) in the grid so that I can quickly identify appointments
- As a staff member, I want to edit patient entries so that I can correct any mistakes
- As a staff member, I want to delete incorrect patient entries so that data remains accurate
- As a staff member, I want to add new patient entries directly from the dashboard so that I can quickly log walk-ins

### Performance Metrics
- As a staff member, I want to view my personal performance metrics so that I know how I'm doing
- As a staff member, I want to filter performance data by date range so that I can track my progress over time
- As an optometrist, I want to see my same-day conversion rate so that I can improve my patient consultations
- As an optometrist, I want to see my overall conversion rate so that I understand my long-term performance
- As a dispenser, I want to see my total dispense revenue so that I know my sales performance
- As a dispenser, I want to see my average per dispense amount so that I can track upselling success
- As an optometrist, I want to see my contact lens discussion rate so that I can improve CL recommendations
- As an optometrist, I want to see my CL trial booking rate so that I can track conversion to trials
- As a staff member, I want to see my total appointment revenue so that I understand my contribution
- As a staff member, I want to see my revenue per test (RPT) so that I can benchmark against targets

## 3. Staff Patient Entry Features

### Patient Identification
- As a staff member, I want to enter the OPS patient identifier so that appointments are linked to the correct patient
- As a staff member, I want to record the appointment date so that we have accurate timing data

### Appointment Details
- As a staff member, I want to select from all appointment types (NHS, Private, CL checks, etc.) so that I categorize visits correctly
- As a staff member, I want to specify NHS reasons when applicable so that we track NHS service usage
- As a staff member, I want to record whether the patient attended or DNA'd so that we track appointment completion

### Clinical Services
- As a staff member, I want to assign the pre-screener who saw the patient so that we track workload
- As a staff member, I want to record if OCT was offered and the patient's decision so that we track service uptake
- As an optometrist, I want to record clinical outcomes (No Rx, Stable Rx, Change in Rx) so that we track clinical patterns
- As an optometrist, I want to record referrals and their urgency so that we ensure proper patient care
- As an optometrist, I want to record if dilation was needed so that we track clinical procedures
- As an optometrist, I want to record CL trial outcomes so that we track contact lens success

### Dispensing Process
- As a dispenser, I want to record the dispense decision (dispensed, thinking, not today) so that we track conversion
- As a dispenser, I want to record who handled the patient handover so that we track team collaboration
- As a dispenser, I want to add multiple lens specifications for multi-pair sales so that all products are captured
- As a dispenser, I want to specify detailed lens attributes (manufacturer, type, index, coatings) so that we track product preferences
- As a dispenser, I want to record frame details and types so that we analyze frame sales patterns

### Financial Tracking
- As a staff member, I want to record glasses coverage amounts so that we track insurance/benefit usage
- As a staff member, I want to record all fees (OCT, appointment, accessories) so that revenue is accurately tracked
- As a staff member, I want to record NHS voucher values so that we track NHS reimbursements
- As a staff member, I want to specify payment methods so that we understand transaction types
- As a staff member, I want to mark transactions as complete so that we track payment status

### Follow-up Services
- As a staff member, I want to schedule collection appointments so that patients know when to return
- As a staff member, I want to mark PCSE as complete so that we track NHS payment submissions

## 4. Franchise Dashboard Features

### Sales Performance Overview
- As a franchise owner, I want to see real-time performance leaderboards so that I can identify top performers
- As a franchise owner, I want to filter performance data by branch so that I can compare locations
- As a franchise owner, I want to filter performance data by date range so that I can analyze trends
- As a franchise owner, I want to see team averages on leaderboards so that I can benchmark individual performance

### Optometrist Leaderboard
- As a franchise owner, I want to see optometrists ranked by same-day conversion rate so that I can coach on immediate sales
- As a franchise owner, I want to see optometrists ranked by overall conversion rate so that I can assess long-term performance
- As a franchise owner, I want to see each optometrist's specific percentages so that I can set improvement targets

### Dispenser Leaderboard
- As a franchise owner, I want to see dispensers ranked by OCT conversion rate so that I can improve service uptake
- As a franchise owner, I want to see dispensers ranked by performance metrics so that I can identify training needs

### Revenue Per Test (RPT) Rankings
- As a franchise owner, I want to see optometrists ranked by RPT so that I can identify revenue generators
- As a franchise owner, I want to see dispensers ranked by RPT so that I can reward high performers
- As a franchise owner, I want to see specific RPT values for each staff member so that I can set revenue targets

## 5. Franchise User Management Features

### User Overview
- As a franchise owner, I want to see all users in a searchable table so that I can manage my team efficiently
- As a franchise owner, I want to filter users by name or email so that I can find specific team members
- As a franchise owner, I want to see user status (active/inactive) at a glance so that I know who has access

### User Creation
- As a franchise owner, I want to add new users with their basic information so that they can access the system
- As a franchise owner, I want to assign users to specific branches so that they only see relevant data
- As a franchise owner, I want to set user roles (Owner, Manager, Staff) so that they have appropriate permissions
- As a franchise owner, I want to specify if staff are optometrists, dispensers, or both so that performance is tracked correctly

### User Management
- As a franchise owner, I want to edit user details so that I can keep information current
- As a franchise owner, I want to activate/deactivate users so that I can control system access
- As a franchise owner, I want to send password reset emails so that users can regain access
- As a franchise owner, I want to delete users who no longer work for us so that the system stays clean
- As a franchise manager, I want limited user management capabilities based on my permissions

## 6. Franchise Branch Management Features

### Branch Overview
- As a franchise owner, I want to see all my branches in a list so that I can manage locations
- As a franchise owner, I want to see branch details at a glance so that I have quick access to information

### Branch Operations
- As a franchise owner, I want to add new branches as my business grows so that they appear in the system
- As a franchise owner, I want to edit branch information so that details stay current
- As a franchise owner, I want to delete closed branches so that they don't appear in reports
- As a franchise owner, I want to assign staff to branches so that they can log data for the right location

## 7. Analytics & Reporting Features

### Appointment Outcomes Analysis
- As a franchise owner, I want to analyze appointment outcomes by type so that I understand service patterns
- As a franchise owner, I want to filter outcomes by branch so that I can compare locations
- As a franchise owner, I want to filter outcomes by optometrist so that I can assess clinical patterns
- As a franchise owner, I want to filter outcomes by date range so that I can track trends
- As a franchise owner, I want to see outcome counts and percentages so that I have both absolute and relative metrics

### Clinical Outcome Tracking
- As a franchise owner, I want to track prescription outcomes (No Rx, Stable, Changed) so that I understand patient needs
- As a franchise owner, I want to monitor referral rates and urgency so that I ensure quality care
- As a franchise owner, I want to track dilation rates so that I understand clinical procedures
- As a franchise owner, I want to analyze CL trial outcomes so that I can improve CL services

### Performance Analysis
- As a franchise owner, I want detailed optometrist analysis so that I can provide targeted coaching
- As a franchise owner, I want detailed dispenser analysis so that I can improve sales training
- As a franchise owner, I want to export performance data so that I can create custom reports
- As a franchise owner, I want to see trend graphs over time so that I can identify patterns

### Financial Analytics
- As a franchise owner, I want to track revenue by service type so that I understand income sources
- As a franchise owner, I want to analyze NHS vs private split so that I can optimize service mix
- As a franchise owner, I want to track product sales by type so that I can optimize inventory
- As a franchise owner, I want to see financial trends over time so that I can forecast revenue

## 8. Super Admin Features

### Franchise Management
- As a super admin, I want to see all franchises on the platform so that I can monitor system usage
- As a super admin, I want to view franchise-level metrics so that I can identify successful franchises
- As a super admin, I want to add new franchises to the platform so that I can onboard customers
- As a super admin, I want to edit franchise details so that I can maintain accurate records
- As a super admin, I want to deactivate franchises so that I can manage subscriptions

### Platform Analytics
- As a super admin, I want to see platform-wide usage statistics so that I can track growth
- As a super admin, I want to monitor system performance metrics so that I can ensure quality service
- As a super admin, I want to track feature adoption rates so that I can guide development priorities
- As a super admin, I want to generate billing reports so that I can manage franchise subscriptions

### System Administration
- As a super admin, I want to manage system-wide settings so that I can configure the platform
- As a super admin, I want to access system logs so that I can troubleshoot issues
- As a super admin, I want to manage platform features so that I can control what franchises can access
- As a super admin, I want to send platform-wide announcements so that I can communicate updates

## 9. General Platform Features

### Navigation & Usability
- As any user, I want responsive design on mobile and desktop so that I can work from any device
- As any user, I want persistent branch selection so that I don't have to reselect my location
- As any user, I want clear navigation menus so that I can find features easily
- As any user, I want loading indicators so that I know when data is being processed

### Data Management
- As any user, I want my data to persist between sessions so that I don't lose work
- As any user, I want confirmation dialogs before deletions so that I don't accidentally lose data
- As any user, I want clear success/error messages so that I know when actions complete
- As any user, I want to see timestamps on all data so that I know when things happened

### Help & Support
- As any user, I want tooltips on complex fields so that I understand what to enter
- As any user, I want validation messages so that I know when I've entered incorrect data
- As any user, I want to access help documentation so that I can learn the system
- As any user, I want to report issues so that problems get fixed

### Security & Privacy
- As any user, I want my session to timeout after inactivity so that my data stays secure
- As any user, I want to see only data I have permission to access so that privacy is maintained
- As a franchise owner, I want to ensure staff only see their branch data so that information is compartmentalized
- As any user, I want secure password requirements so that accounts stay protected