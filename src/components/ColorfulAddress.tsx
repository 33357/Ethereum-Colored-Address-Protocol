import React from "react";
import { cn, isValidAddress, simpleAddress } from "../lib/utils";
import { calculateColors } from "../lib/eth-color";

export const ColorfulAddress = ({
  address,
  simple,
  className,
  diffWith,
  enable = true,
}: {
  address: string;
  diffWith?: string;
  simple?: boolean;
  enable?: boolean;
  className?: string;
}) => {
  if (!enable || !isValidAddress(address))
    return (
      <span
        className={cn("truncate text-xs sm:text-base", className)}
        style={{ fontFamily: "monospace" }}
      >
        {address ? (simple ? simpleAddress(address) : address) : "0x..."}
      </span>
    );

  const colors = calculateColors(address);

  const prefixWords = address.slice(2, 7);
  const suffixWords = address.slice(-5);
  const midWords = address.slice(7, -5).split("");

  const diffPrefixWords = diffWith?.slice(2, 7).split("");
  const diffSuffixWords = diffWith?.slice(-5).split("");
  const diffMidWords = diffWith?.slice(7, -5).split("");

  return (
    <div
      className={cn("truncate text-xs sm:text-base", className)}
      style={{ fontFamily: "monospace" }}
    >
      <span>0x</span>

      {colors.slice(0, 5).map((color, index) => (
        <span
          key={index}
          style={{
            color,
            textDecoration:
              diffPrefixWords && prefixWords[index] !== diffPrefixWords[index]
                ? "underline"
                : undefined,
          }}
        >
          {prefixWords[index]}
        </span>
      ))}

      {simple
        ? "..."
        : midWords.map((word, index) => (
            <span
              key={index}
              style={{
                textDecoration:
                  diffMidWords && word !== diffMidWords[index]
                    ? "underline"
                    : undefined,
              }}
            >
              {word}
            </span>
          ))}

      {colors.slice(5, 10).map((color, index) => (
        <span
          key={index}
          style={{
            color,
            textDecoration:
              diffSuffixWords && suffixWords[index] !== diffSuffixWords[index]
                ? "underline"
                : undefined,
          }}
        >
          {suffixWords[index]}
        </span>
      ))}
    </div>
  );
};
