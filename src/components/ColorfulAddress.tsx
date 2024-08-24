import React from "react";
import { cn, isValidAddress } from "../lib/utils";
import { calculateColors } from "../lib/eth-color";

export const ColorfulAddress = ({
  address,
  simple,
  className,
}: {
  address: string;
  simple?: boolean;
  className?: string;
}) => {
  if (!isValidAddress(address))
    return (
      <span className={cn("truncate text-xs sm:text-base", className)}>
        {address || "0x..."}
      </span>
    );

  const colors = calculateColors(address);

  const firstFive = address.slice(2, 7);
  const lastFive = address.slice(-5);

  return (
    <div
      className={cn("truncate text-xs sm:text-base", className)}
      style={{ fontFamily: "monospace" }}
    >
      <span>0x</span>
      {colors.slice(0, 5).map((color, index) => (
        <span key={index} style={{ color }}>
          {firstFive[index]}
        </span>
      ))}
      <span>{simple ? "..." : address.slice(7, -5)}</span>
      {colors.slice(5, 10).map((color, index) => (
        <span key={index} style={{ color }}>
          {lastFive[index]}
        </span>
      ))}
    </div>
  );
};
