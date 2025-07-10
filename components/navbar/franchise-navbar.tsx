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
import React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface FranchiseNavbarProps {
  userRole: UserRole;
  userName: string;
}

export function FranchiseNavbar({ userRole, userName }: FranchiseNavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

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
    <header className="border-b bg-white sticky top-0 z-30">
      <div className="relative max-w-7xl mx-auto flex h-16 items-center px-2 md:px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/franchise"
          className="text-xl font-bold text-primary flex-shrink-0 whitespace-nowrap"
        >
          OptoSaaS
        </Link>

        {/* Desktop Navigation (xl and up) */}
        <nav className="hidden xl:flex flex-1 min-w-0 justify-center pl-2 pr-2">
          <NavigationMenu>
            <NavigationMenuList className="gap-x-4 overflow-x-auto scrollbar-hide">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "text-sm font-medium transition-colors px-3 py-2 rounded-md whitespace-nowrap",
                      pathname === item.href
                        ? "bg-gray-100 text-primary shadow-sm"
                        : "text-muted-foreground hover:text-primary hover:bg-gray-50"
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* User info and logout (xl and up) */}
        <div className="hidden sm:flex gap-4  items-center space-x-2 ml-auto flex-shrink-0 ">
          <div className="xl:hidden">
            <Select
              value={pathname}
              onValueChange={(val) => {
                window.location.href = val;
              }}
            >
              <SelectTrigger className="w-56 h-10">
                <SelectValue placeholder="Navigate..." />
              </SelectTrigger>
              <SelectContent>
                {navItems.map((item) => (
                  <SelectItem key={item.href} value={item.href}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {userName} ({userRole === "owner" ? "Owner" : "Manager"})
          </span>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </div>

        {/* Mobile Hamburger (sm and below) */}
        <div className="sm:hidden absolute right-4 top-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Open menu"
              >
                <HamburgerMenuIcon className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 bg-white p-6 shadow-lg flex flex-col h-full"
            >
              <DialogTitle asChild>
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </DialogTitle>
              <div className="flex items-center justify-center mb-6">
                <Link
                  href="/franchise"
                  className="text-xl font-bold text-primary"
                  onClick={() => setOpen(false)}
                >
                  OptoSaaS
                </Link>
              </div>
              <nav className="flex flex-col space-y-2 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                      pathname === item.href
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-gray-100"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2">
                <span className="text-sm text-muted-foreground mb-2">
                  {userName} ({userRole === "owner" ? "Owner" : "Manager"})
                </span>
                <Button variant="outline" size="sm" className="w-full">
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
