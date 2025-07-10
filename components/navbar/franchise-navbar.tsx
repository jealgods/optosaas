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

interface FranchiseNavbarProps {
  userRole: UserRole;
  userName: string;
}

export function FranchiseNavbar({ userRole, userName }: FranchiseNavbarProps) {
  const pathname = usePathname();

  const getNavItems = () => {
    const items = [];

    if (userRole === "owner") {
      items.push(
        { href: "/franchise", label: "Dashboard" },
        { href: "/franchise/users", label: "Users" },
        { href: "/franchise/branches", label: "Branches" },
        {
          href: "/franchise/optometrist-analysis",
          label: "Optometrist Analysis",
        },
        { href: "/franchise/dispenser-analysis", label: "Dispenser Analysis" },
        {
          href: "/franchise/appointment-outcomes",
          label: "Appointment Outcomes",
        }
      );
    } else if (userRole === "manager") {
      items.push({ href: "/franchise/users", label: "Users" });
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <Link href="/franchise" className="text-xl font-bold text-primary">
            OptoSaaS
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary px-3 py-2",
                      pathname === item.href
                        ? "text-primary bg-accent"
                        : "text-muted-foreground"
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {userName} ({userRole === "owner" ? "Owner" : "Manager"})
          </span>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
