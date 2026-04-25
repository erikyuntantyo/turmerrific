"use client";

import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/shared/ui/modal";
import { Button } from "@/shared/ui/button";

type DeleteUserModalProps = {
  open: boolean;
  onClose: () => void;
  userName: string;
  onConfirm: () => void;
};

export function DeleteUserModal({ open, onClose, userName, onConfirm }: DeleteUserModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Delete User</ModalTitle>
        <ModalDescription>
          Are you sure you want to delete <strong>{userName}</strong>? This action cannot be undone.
        </ModalDescription>
      </ModalHeader>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}
