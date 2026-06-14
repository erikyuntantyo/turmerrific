"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/shared/ui/table";
import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { DeleteUserModal } from "@/features/dashboard/components/delete-user-modal";
import { EditUserModal } from "@/features/dashboard/components/edit-user-modal";
import { useToast } from "@/shared/ui/toast";
import { mockUsers, type MockUser } from "@/features/dashboard/server/mock-data";

const roleBadgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  Admin: "default",
  Editor: "secondary",
  Viewer: "outline",
};

export function UsersContent() {
  const [rows, setRows] = useState<MockUser[]>(mockUsers);
  const [deleteTarget, setDeleteTarget] = useState<MockUser | null>(null);
  const [editTarget, setEditTarget] = useState<MockUser | null>(null);
  const { toast } = useToast();

  function handleDelete() {
    if (deleteTarget) {
      setRows((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      toast({ title: `${deleteTarget.name} deleted`, variant: "success" });
      setDeleteTarget(null);
    }
  }

  function handleSaveEdit(updated: MockUser) {
    setRows((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    toast({ title: `${updated.name} updated`, variant: "success" });
    setEditTarget(null);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage user accounts and permissions</p>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage email={user.email} alt={user.name} />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-muted-foreground text-xs">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={roleBadgeVariant[user.role]}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{user.joinedAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="Edit"
                      title="Edit"
                      className="no-hover-glow hover:text-primary"
                      onClick={() => setEditTarget(user)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="Delete"
                      title="Delete"
                      className="text-destructive hover:text-destructive no-hover-glow"
                      onClick={() => setDeleteTarget(user)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditUserModal
        open={editTarget !== null}
        onClose={() => setEditTarget(null)}
        user={editTarget}
        onSave={handleSaveEdit}
      />

      <DeleteUserModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        userName={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
      />
    </div>
  );
}
