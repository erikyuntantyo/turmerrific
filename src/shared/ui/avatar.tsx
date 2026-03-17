"use client";

import * as React from "react";
import Image from "next/image";
import { createHash } from "crypto";

import { cn } from "@/shared/utils/utils";

function md5(str: string): string {
  return createHash("md5").update(str.trim().toLowerCase()).digest("hex");
}

function getGravatarUrl(email?: string, size = 80): string | null {
  if (!email) return null;
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404`;
}

function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar"
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  src,
  alt,
  email,
}: {
  className?: string;
  src?: string;
  alt?: string;
  email?: string;
}) {
  const [hasError, setHasError] = React.useState(false);
  const [triedGravatar, setTriedGravatar] = React.useState(false);

  const imageSrc = src || (email ? getGravatarUrl(email) : null);

  if (!imageSrc || hasError) {
    if (email && !triedGravatar) {
      return (
        <Image
          data-slot="avatar-image"
          src={getGravatarUrl(email) || ""}
          alt={alt || ""}
          fill
          sizes="100%"
          className={cn("aspect-square h-full w-full object-cover", className)}
          onError={() => {
            setTriedGravatar(true);
            setHasError(true);
          }}
        />
      );
    }
    return <AvatarPlaceholder className={className} />;
  }

  return (
    <Image
      data-slot="avatar-image"
      src={imageSrc}
      alt={alt || ""}
      fill
      sizes="100%"
      className={cn("aspect-square h-full w-full object-cover", className)}
      onError={() => setHasError(true)}
    />
  );
}

function AvatarPlaceholder({ className }: { className?: string }) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn("flex h-full w-full items-center justify-center bg-muted", className)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <circle cx="12" cy="8" r="4" className="fill-muted-foreground" />
        <path
          d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
          className="fill-muted-foreground"
        />
      </svg>
    </div>
  );
}

function AvatarFallback({ className, children }: React.ComponentProps<"div">) {
  if (children) {
    return (
      <div
        data-slot="avatar-fallback"
        className={cn(
          "bg-muted flex h-full w-full items-center justify-center rounded-full text-sm font-medium",
          className,
        )}
      >
        {children}
      </div>
    );
  }
  return <AvatarPlaceholder className={className} />;
}

export { Avatar, AvatarImage, AvatarFallback };
