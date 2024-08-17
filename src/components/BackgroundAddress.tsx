import React from "react";
import { ethers } from "ethers";
import { isValidAddress } from "../lib/utils";

export const AddressPattern = ({ address }: { address: string }) => {
  if (!isValidAddress(address)) return <span>{address || "0x..."}</span>;

  // 生成图案的函数
  const generatePattern = (addr: string) => {
    const hash = ethers.keccak256(ethers.toUtf8Bytes(addr));
    const colors = [];
    const shapes = [];

    // 生成6种颜色
    for (let i = 0; i < 6; i++) {
      colors.push("#" + hash.slice(2 + i * 6, 8 + i * 6));
    }

    // 生成30个六边形
    for (let i = 0; i < 30; i++) {
      const colorIndex = parseInt(hash[i], 16) % 6;
      const x = (i % 5) * 20 + ((i / 5) % 2) * 10;
      const y = Math.floor(i / 5) * 17.32;
      shapes.push(
        <path
          key={i}
          d="M10 0 L20 5.773 L20 17.32 L10 23.094 L0 17.32 L0 5.773 Z"
          fill={colors[colorIndex]}
          transform={`translate(${x}, ${y})`}
        />
      );
    }

    return { shapes, colors };
  };

  const { shapes, colors } = generatePattern(address);

  return (
    <>
      {/* <svg width="100" height="100" viewBox="0 0 100 100">
        {shapes}
      </svg> */}
      <div className="overflow-hidden text-ellipsis overflow-ellipsis">
        <div className="font-mono text-sm truncate mb-2">{address}</div>
        <div className="flex">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
