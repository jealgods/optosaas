"use client";

import { useState, useEffect } from "react";
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

interface EditUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (user: User) => void;
  user: User | null;
}

export function EditUserModal({ open, onOpenChange, onSave, user }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "" as UserRole,
    branchAccess: [] as number[],
    isDispenser: false,
    isOptometrist: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        branchAccess: user.branchAccess,
        isDispenser: user.isDispenser,
        isOptometrist: user.isOptometrist || false,
      });
    }
  }, [user]);

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.role || !user) {
      alert("Please fill in all required fields");
      return;
    }

    onSave({
      ...user,
      ...formData,
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

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
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
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}