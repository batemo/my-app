import * as React from "react";
import { cn } from "@/lib/utils";

const options = [
  "Profile",
  "Account",
  "Appearance",
  "Notifications",
  "Display",
];

export function Menu({ active, onSelect }) {
  return (
    <nav className="flex flex-col gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          className={cn(
            "text-left px-4 py-2 rounded transition-colors",
            active === opt ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
          )}
          onClick={() => onSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </nav>
  );
} 