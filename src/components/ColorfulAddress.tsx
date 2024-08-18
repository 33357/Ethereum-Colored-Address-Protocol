import React from "react";
import { isValidAddress } from "../lib/utils";
import { calculateColors } from "../lib/eth-color";

export const ColorfulAddress = ({
  address,
  simple,
}: {
  address: string;
  simple?: boolean;
}) => {
  if (!isValidAddress(address)) return <span>{address || "0x..."}</span>;

  const colors = calculateColors(address);

  const firstFive = address.slice(2, 7);
  const lastFive = address.slice(-5);

  return (
    <div
      className="overflow-hidden text-xs sm:text-base"
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
