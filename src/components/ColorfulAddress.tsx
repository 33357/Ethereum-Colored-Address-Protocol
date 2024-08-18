import { sha256 } from "js-sha256";
import React from "react";
import { isValidAddress } from "../lib/utils";

const calculateColors = (address: string): string[] => {
  const hash = sha256(address);
  const firstThirtyHexChars = hash.slice(0, 30);
  const colors = [];

  for (let i = 0; i < 10; i++) {
    const segment = firstThirtyHexChars.slice(i * 3, i * 3 + 3);
    const r = parseInt(segment[0], 16) * 10 + 50;
    const g = parseInt(segment[1], 16) * 10 + 50;
    const b = parseInt(segment[2], 16) * 10 + 50;
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colors;
};

// 组件渲染地址
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
