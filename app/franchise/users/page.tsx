"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/franchise/users-table";
import { AddUserModal } from "@/components/franchise/modals/add-user-modal";
import { EditUserModal } from "@/components/franchise/modals/edit-user-modal";
import { DeleteUserDialog } from "@/components/franchise/modals/delete-user-dialog";
import { getUsersByFranchise } from "@/lib/mock-data";
import { User } from "@/lib/types";
import { Plus } from "lucide-react";

export default function UsersPage() {
  // In a real app, this would come from authentication
  const franchiseId = 1;
  const [users, setUsers] = useState<User[]>(getUsersByFranchise(franchiseId));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleView = (user: User) => {
    console.log("View user:", user);
    // TODO: Navigate to user detail page or show user info
  };

  const handleDelete = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
  };

  const handleSendPasswordReset = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      console.log("Sending password reset to:", user.email);
      // TODO: Implement password reset email functionality
      alert(`Password reset email sent to ${user.email}`);
    }
  };

  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewUser = (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
      setSelectedUser(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage staff members across your franchise branches
          </p>
        </div>
        <Button onClick={handleAddUser}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </header>

      <UsersTable 
        users={users}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onSendPasswordReset={handleSendPasswordReset}
      />

      <AddUserModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSave={handleSaveNewUser}
      />

      <EditUserModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleUpdateUser}
        user={selectedUser}
      />

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        user={selectedUser}
      />
    </div>
  );
}