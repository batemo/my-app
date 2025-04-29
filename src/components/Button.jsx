import * as React from "react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button"; 