import React from "react";
import { cn } from "../lib/utils";

export const DemoContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-2 p-4 px-2 sm:px-4 bg-gray-300/10 backdrop-blur-sm rounded-lg shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};
