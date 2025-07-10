"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BranchesTable } from "@/components/franchise/branches-table";
import { AddBranchModal } from "@/components/franchise/modals/add-branch-modal";
import { EditBranchModal } from "@/components/franchise/modals/edit-branch-modal";
import { DeleteBranchDialog } from "@/components/franchise/modals/delete-branch-dialog";
import { branches as initialBranches, getUsersByFranchise } from "@/lib/mock-data";
import { Branch } from "@/lib/types";
import { Plus } from "lucide-react";

export default function BranchesPage() {
  // In a real app, this would come from authentication
  const franchiseId = 1;
  const router = useRouter();
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // Get all franchise users to calculate staff counts
  const franchiseUsers = getUsersByFranchise(franchiseId);

  const getStaffCount = (branchId: number): number => {
    return franchiseUsers.filter(user => 
      user.branchAccess.includes(branchId)
    ).length;
  };

  const handleView = (branch: Branch) => {
    // Navigate to staff dashboard
    router.push("/staff/dashboard");
  };

  const handleEdit = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsEditModalOpen(true);
  };

  const handleDelete = (branchId: number) => {
    const branch = branches.find(b => b.id === branchId);
    if (branch) {
      setSelectedBranch(branch);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleAddBranch = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewBranch = (branchData: Omit<Branch, "id">) => {
    const newBranch: Branch = {
      ...branchData,
      id: Math.max(...branches.map(b => b.id)) + 1,
    };
    setBranches(prev => [...prev, newBranch]);
  };

  const handleUpdateBranch = (updatedBranch: Branch) => {
    setBranches(prev => prev.map(branch => 
      branch.id === updatedBranch.id ? updatedBranch : branch
    ));
  };

  const handleConfirmDelete = () => {
    if (selectedBranch) {
      setBranches(prev => prev.filter(branch => branch.id !== selectedBranch.id));
      setSelectedBranch(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Branches Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your franchise locations and branch settings
          </p>
        </div>
        <Button onClick={handleAddBranch}>
          <Plus className="mr-2 h-4 w-4" />
          Add Branch
        </Button>
      </header>

      <BranchesTable 
        branches={branches}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getStaffCount={getStaffCount}
      />

      <AddBranchModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSave={handleSaveNewBranch}
      />

      <EditBranchModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleUpdateBranch}
        branch={selectedBranch}
      />

      <DeleteBranchDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        branch={selectedBranch}
        staffCount={selectedBranch ? getStaffCount(selectedBranch.id) : 0}
      />
    </div>
  );
}