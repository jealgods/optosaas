"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";
import { getBranchNames } from "@/lib/mock-data";
import { MoreHorizontal, Eye, Pencil, Trash2, RotateCcw, Mail } from "lucide-react";

interface UsersTableProps {
  users: User[];
  onView?: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onToggleStatus?: (userId: number) => void;
  onSendPasswordReset?: (userId: number) => void;
}

export function UsersTable({ 
  users, 
  onView, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onSendPasswordReset 
}: UsersTableProps) {
  const formatRole = (role: string) => {
    switch (role) {
      case "owner":
        return "Owner";
      case "manager":
        return "Manager";
      case "staff":
        return "Staff";
      default:
        return role;
    }
  };

  const getSpecializations = (user: User) => {
    const specs = [];
    if (user.isDispenser) specs.push("Dispenser");
    if (user.isOptometrist) specs.push("Optometrist");
    return specs;
  };

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <caption className="sr-only">
            List of franchise users with roles, branch access, and management actions
          </caption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col" className="min-w-[150px]">Name</TableHead>
              <TableHead scope="col" className="min-w-[80px]">Role</TableHead>
              <TableHead scope="col" className="min-w-[80px]">Status</TableHead>
              <TableHead scope="col" className="min-w-[120px]">Branches</TableHead>
              <TableHead scope="col" className="min-w-[80px]">Dispenser</TableHead>
              <TableHead scope="col" className="min-w-[100px]">Optometrist</TableHead>
              <TableHead scope="col" className="min-w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{formatRole(user.role)}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "outline"}>
                  {user.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {getBranchNames(user.branchAccess) || "No access"}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.isDispenser ? "default" : "outline"}>
                  {user.isDispenser ? "✓" : "✗"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.isOptometrist ? "default" : "outline"}>
                  {user.isOptometrist ? "✓" : "✗"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {onView && (
                      <DropdownMenuItem onClick={() => onView(user)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onEdit(user)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {onToggleStatus && (
                      <DropdownMenuItem onClick={() => onToggleStatus(user.id)}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    )}
                    {onSendPasswordReset && (
                      <DropdownMenuItem onClick={() => onSendPasswordReset(user.id)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Password Reset
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete(user.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}