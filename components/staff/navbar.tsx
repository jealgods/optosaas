"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogOut, Building2 } from "lucide-react";
import { branches } from "@/lib/mock-data";

export function StaffNavbar() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id.toString());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedBranchName = branches.find(b => b.id.toString() === selectedBranch)?.name;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200" role="navigation" aria-label="Staff navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link 
              href="/staff/dashboard" 
              className="text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
            >
              OptoSaaS Staff
            </Link>
          </div>

          {/* Center - Venue Selector (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="branch-selector" className="text-sm font-medium text-gray-700">
                <Building2 className="h-4 w-4 inline mr-1" aria-hidden="true" />
                Branch:
              </Label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger 
                  id="branch-selector"
                  className="w-48"
                  aria-label={`Current branch: ${selectedBranchName}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id.toString()}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right side - Profile & Logout (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-700" role="status" aria-label="Current user">
              Staff User
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              aria-label="Logout from staff portal"
            >
              <Link href="/login">
                <LogOut className="h-4 w-4 mr-1" aria-hidden="true" />
                Logout
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Staff Navigation</SheetTitle>
                  <SheetDescription>
                    Access your account and branch settings
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile Branch Selector */}
                  <div className="space-y-2">
                    <Label htmlFor="mobile-branch-selector" className="text-sm font-medium">
                      <Building2 className="h-4 w-4 inline mr-1" aria-hidden="true" />
                      Current Branch
                    </Label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                      <SelectTrigger 
                        id="mobile-branch-selector"
                        aria-label={`Current branch: ${selectedBranchName}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id.toString()}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* User Info */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3">Logged in as:</p>
                    <p className="font-medium">Staff User</p>
                  </div>

                  {/* Logout Button */}
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Logout from staff portal"
                  >
                    <Link href="/login">
                      <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                      Logout
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}