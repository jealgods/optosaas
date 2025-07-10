import { FranchisesTable } from "@/components/super-admin/franchises-table";

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage franchises and view platform overview
        </p>
      </div>
      
      <FranchisesTable />
    </div>
  );
}