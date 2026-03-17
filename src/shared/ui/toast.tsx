"use client";

import { createContext, useCallback, useContext, useEffect, useReducer, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/shared/utils/utils";

type ToastVariant = "success" | "error" | "warning" | "info";
type ToastPosition = "top-right" | "bottom-right" | "top-left" | "bottom-left";

type Toast = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
};

type ToastAction = { type: "ADD"; toast: Toast } | { type: "DISMISS"; id: string };

function toastReducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.toast];
    case "DISMISS":
      return state.filter((t) => t.id !== action.id);
  }
}

let toastCount = 0;

type ToastContextValue = {
  toasts: Toast[];
  toast: (opts: {
    title: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
  }) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  success:
    "border-green-500/30 bg-green-50 text-green-900 dark:bg-green-950/50 dark:text-green-100",
  error: "border-red-500/30 bg-red-50 text-red-900 dark:bg-red-950/50 dark:text-red-100",
  warning:
    "border-amber-500/30 bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-100",
  info: "border-blue-500/30 bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100",
};

const variantIcons = {
  success: faCheckCircle,
  error: faExclamationCircle,
  warning: faExclamationTriangle,
  info: faInfoCircle,
} as const;

const variantIconColors: Record<ToastVariant, string> = {
  success: "text-green-600 dark:text-green-400",
  error: "text-red-600 dark:text-red-400",
  warning: "text-amber-600 dark:text-amber-400",
  info: "text-blue-600 dark:text-blue-400",
};

const positionClasses: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "bottom-right": "bottom-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-left": "bottom-4 left-4",
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={cn(
        "flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg",
        variantStyles[toast.variant],
      )}
      role="alert"
    >
      <FontAwesomeIcon
        icon={variantIcons[toast.variant]}
        className={cn("mt-0.5 h-4 w-4 shrink-0", variantIconColors[toast.variant])}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{toast.title}</p>
        {toast.description && <p className="mt-1 text-xs opacity-80">{toast.description}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss"
      >
        <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function ToastProvider({
  children,
  position = "top-right",
}: {
  children: React.ReactNode;
  position?: ToastPosition;
}) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const dismiss = useCallback((id: string) => {
    dispatch({ type: "DISMISS", id });
  }, []);

  const toast = useCallback(
    (opts: { title: string; description?: string; variant?: ToastVariant; duration?: number }) => {
      const id = String(++toastCount);
      dispatch({
        type: "ADD",
        toast: {
          id,
          title: opts.title,
          description: opts.description,
          variant: opts.variant ?? "info",
          duration: opts.duration ?? 5000,
        },
      });
      return id;
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {toasts.length > 0 && (
        <div className={cn("fixed z-50 flex flex-col gap-2", positionClasses[position])}>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return { toast: ctx.toast, dismiss: ctx.dismiss };
}

export { type ToastVariant, type ToastPosition };
