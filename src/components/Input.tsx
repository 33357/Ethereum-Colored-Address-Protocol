import * as React from "react";

import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3">{icon}</span>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "pl-10" : "", // Add padding to make room for the icon
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
