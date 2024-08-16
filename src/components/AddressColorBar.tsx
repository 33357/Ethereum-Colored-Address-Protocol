import React from "react";
import { ethers } from "ethers";
import { isValidAddress } from "../lib/utils";

export const AddressColorBar = ({ address }: { address: string }) => {
  if (!isValidAddress(address)) return <span>{address || "0x..."}</span>;

  const generateColors = (addr: string) => {
    const hash = ethers.keccak256(ethers.toUtf8Bytes(addr));
    const colors = [];
    for (let i = 0; i < 3; i++) {
      const color = "#" + hash.slice(2 + i * 6, 8 + i * 6);
      colors.push(color);
    }
    return colors;
  };

  const colors = generateColors(address);

  return (
    <>
      <div className="flex h-8">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-4 first:rounded-l-md last:rounded-r-md"
            style={{
              backgroundColor: color,
            }}
          />
        ))}
      </div>
      <div className="font-mono text-sm truncate">{address}</div>
    </>
  );
};
