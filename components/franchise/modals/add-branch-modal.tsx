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
import { Branch } from "@/lib/types";

interface AddBranchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (branch: Omit<Branch, "id">) => void;
}

export function AddBranchModal({ open, onOpenChange, onSave }: AddBranchModalProps) {
  const [branchName, setBranchName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setError("");
    
    if (!branchName.trim()) {
      setError("Please enter a branch name");
      return;
    }

    setIsLoading(true);
    
    try {
      onSave({
        name: branchName.trim(),
      });

      // Reset form
      setBranchName("");
      onOpenChange(false);
    } catch (err) {
      setError("Failed to save branch. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setBranchName("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Branch</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="branchName">Branch Name *</Label>
            <Input
              id="branchName"
              value={branchName}
              onChange={(e) => {
                setBranchName(e.target.value);
                if (error) setError(""); // Clear error on input
              }}
              placeholder="Enter branch name"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSave();
                }
              }}
              disabled={isLoading}
              aria-describedby={error ? "branch-error" : undefined}
            />
            {error && (
              <p id="branch-error" className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}