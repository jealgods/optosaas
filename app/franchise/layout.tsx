import { FranchiseNavbar } from "@/components/navbar/franchise-navbar";

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, this would come from authentication
  const currentUser = {
    role: "owner" as const,
    name: "John Smith",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <FranchiseNavbar
        userRole={currentUser.role}
        userName={currentUser.name}
      />

      <main id="main-content" className="p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
