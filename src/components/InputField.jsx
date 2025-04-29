import * as React from "react";
import { cn } from "@/lib/utils"; // shadcn/ui utility for className merging

export const InputField = React.forwardRef(
  ({ label, className, ...props }, ref) => (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full border border-input bg-background px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition",
          className
        )}
        {...props}
      />
    </div>
  )
);

InputField.displayName = "InputField"; 