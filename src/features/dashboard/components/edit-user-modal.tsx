"use client";

import { useState, type FormEvent } from "react";
import { Modal, ModalHeader, ModalTitle, ModalFooter } from "@/shared/ui/modal";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { type MockUser } from "@/features/dashboard/server/mock-data";

type EditUserModalProps = {
  open: boolean;
  onClose: () => void;
  user: MockUser | null;
  onSave: (user: MockUser) => void;
};

const selectClassName =
  "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]";

export function EditUserModal({ open, onClose, user, onSave }: EditUserModalProps) {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose}>
      {/* key remounts the form with fresh initial state per row — no setState-in-effect re-seed. */}
      <EditUserForm key={user.id} user={user} onClose={onClose} onSave={onSave} />
    </Modal>
  );
}

function EditUserForm({
  user,
  onClose,
  onSave,
}: {
  user: MockUser;
  onClose: () => void;
  onSave: (user: MockUser) => void;
}) {
  const [form, setForm] = useState<MockUser>(user);

  function update<K extends keyof MockUser>(key: K, value: MockUser[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader>
        <ModalTitle>Edit User</ModalTitle>
      </ModalHeader>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="user-name">Name</Label>
          <Input
            id="user-name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="user-email">Email</Label>
          <Input
            id="user-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="user-role">Role</Label>
            <select
              id="user-role"
              value={form.role}
              onChange={(e) => update("role", e.target.value as MockUser["role"])}
              className={selectClassName}
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-status">Status</Label>
            <select
              id="user-status"
              value={form.status}
              onChange={(e) => update("status", e.target.value as MockUser["status"])}
              className={selectClassName}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <ModalFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </ModalFooter>
    </form>
  );
}
