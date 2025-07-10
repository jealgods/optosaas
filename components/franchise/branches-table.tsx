"use client";

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
import { Branch } from "@/lib/types";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface BranchesTableProps {
  branches: Branch[];
  onView: (branch: Branch) => void;
  onEdit: (branch: Branch) => void;
  onDelete: (branchId: number) => void;
  getStaffCount: (branchId: number) => number;
}

export function BranchesTable({ 
  branches, 
  onView, 
  onEdit, 
  onDelete, 
  getStaffCount 
}: BranchesTableProps) {
  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <caption className="sr-only">
            List of franchise branches with staff counts and management actions
          </caption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col" className="min-w-[60px]">ID</TableHead>
              <TableHead scope="col" className="min-w-[120px]">Branch Name</TableHead>
              <TableHead scope="col" className="min-w-[100px]">Staff Count</TableHead>
              <TableHead scope="col" className="min-w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {branches.map((branch) => (
            <TableRow key={branch.id}>
              <TableCell>
                {branch.id}
              </TableCell>
              <TableCell>
                <div className="font-medium">{branch.name}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {getStaffCount(branch.id)} staff members
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(branch)}
                    aria-label={`View details for ${branch.name}`}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(branch)}
                    aria-label={`Edit ${branch.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(branch.id)}
                    aria-label={`Delete ${branch.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}