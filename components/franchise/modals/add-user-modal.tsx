"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { User, UserRole } from "@/lib/types";
import { branches } from "@/lib/mock-data";

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (user: Omit<User, "id">) => void;
}

export function AddUserModal({ open, onOpenChange, onSave }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "" as UserRole,
    branchAccess: [] as number[],
    isDispenser: false,
    isOptometrist: false,
  });

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill in all required fields");
      return;
    }

    onSave({
      ...formData,
      franchiseId: 1, // In real app, this would come from context
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      role: "" as UserRole,
      branchAccess: [],
      isDispenser: false,
      isOptometrist: false,
    });
    onOpenChange(false);
  };

  const handleBranchChange = (selectedBranches: string[]) => {
    setFormData(prev => ({
      ...prev,
      branchAccess: selectedBranches.map(id => parseInt(id))
    }));
  };

  const branchOptions = branches.map(branch => ({
    value: branch.id.toString(),
    label: branch.name
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Branch Access</Label>
            <MultiSelect
              options={branchOptions}
              selected={formData.branchAccess.map(id => id.toString())}
              onChange={handleBranchChange}
              placeholder="Select branches..."
            />
          </div>

          <div className="space-y-3">
            <Label>Specializations</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dispenser"
                  checked={formData.isDispenser}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, isDispenser: checked as boolean }))
                  }
                />
                <Label htmlFor="dispenser" className="text-sm">
                  Dispenser
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="optometrist"
                  checked={formData.isOptometrist}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, isOptometrist: checked as boolean }))
                  }
                />
                <Label htmlFor="optometrist" className="text-sm">
                  Optometrist
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}