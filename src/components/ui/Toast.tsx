import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/components/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  title: string;
  description?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  variant?: ToastVariant;
}

export const Toast = ({
  title,
  description,
  open,
  setOpen,
  variant = "info",
}: ToastProps) => {
  const bgColor = {
    success: "bg-green-500 border-green-600 text-white",
    error: "bg-red-500 border-red-600 text-white",
    info: "bg-blue-500 border-blue-600 text-white",
  }[variant];

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className={cn(
          "p-4 rounded-md shadow-lg flex items-start justify-between space-x-4 w-80",
          bgColor,
        )}
      >
        <div className="flex-1">
          <ToastPrimitive.Title className="font-semibold">
            {title}
          </ToastPrimitive.Title>
          {description && (
            <ToastPrimitive.Description className="text-sm opacity-90">
              {description}
            </ToastPrimitive.Description>
          )}
        </div>
        <ToastPrimitive.Close
          className="text-white hover:text-gray-200 cursor-pointer"
          aria-label="Close"
        >
          <X size={16} />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>

      {/* Top-right viewport */}
      <ToastPrimitive.Viewport className="fixed top-4 right-4 flex flex-col gap-2 z-50" />
    </ToastPrimitive.Provider>
  );
};
