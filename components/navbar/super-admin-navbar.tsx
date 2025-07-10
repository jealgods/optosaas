"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { UserRole } from "@/lib/types";

interface SuperAdminNavbarProps {
  userRole: UserRole;
  userName: string;
}

export function SuperAdminNavbar({ userRole, userName }: SuperAdminNavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/super-admin", label: "Dashboard" },
  ];

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <Link href="/super-admin" className="text-xl font-bold text-red-600">
            OptoSaaS Admin
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary px-3 py-2",
                        pathname === item.href
                          ? "text-primary bg-accent"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {userName} (Super Admin)
          </span>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}