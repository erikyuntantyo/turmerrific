"use client";

import { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/shared/ui/table";
import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { DeleteUserModal } from "@/features/dashboard/components/delete-user-modal";
import { useToast } from "@/shared/ui/toast";
import { mockUsers, type MockUser } from "@/features/dashboard/server/mock-data";

const roleBadgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  Admin: "default",
  Editor: "secondary",
  Viewer: "outline",
};

export function UsersContent() {
  const [deleteTarget, setDeleteTarget] = useState<MockUser | null>(null);
  const { toast } = useToast();

  function handleDelete() {
    if (deleteTarget) {
      toast({ title: `${deleteTarget.name} deleted`, variant: "success" });
      setDeleteTarget(null);
    }
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
            {mockUsers.map((user) => (
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
                  <Button variant="destructive" size="sm" onClick={() => setDeleteTarget(user)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteUserModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        userName={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
      />
    </div>
  );
}
