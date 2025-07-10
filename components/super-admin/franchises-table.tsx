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
import { User } from "@/lib/types";
import { getFranchiseOwners, franchises } from "@/lib/mock-data";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function FranchisesTable() {
  const franchiseOwners = getFranchiseOwners();

  const handleViewFranchise = (franchiseId: number) => {
    window.open(`/franchise`, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Franchises</h2>
        <p className="text-sm text-muted-foreground">
          {franchiseOwners.length} franchise{franchiseOwners.length !== 1 ? 's' : ''} total
        </p>
      </div>
      
      <div className="rounded-md border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Franchise</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {franchiseOwners.map((owner) => {
                const franchise = franchises.find(f => f.id === owner.franchiseId);
                return (
                  <TableRow key={owner.id}>
                    <TableCell>
                      <div className="font-medium">
                        {franchise?.name || "Unknown Franchise"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{owner.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">{owner.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={owner.status === "active" ? "default" : "outline"}>
                        {owner.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewFranchise(owner.franchiseId!)}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Franchise
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}