import { SuperAdminNavbar } from "@/components/navbar/super-admin-navbar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = {
    role: "super_admin" as const,
    name: "Super Admin"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <SuperAdminNavbar userRole={currentUser.role} userName={currentUser.name} />
      
      <main id="main-content" className="p-8">
        {children}
      </main>
    </div>
  );
}