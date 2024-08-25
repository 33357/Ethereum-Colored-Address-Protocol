import React from "react";

interface CardProps {
  title: string;
  content: string;
}

export const TextCard: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="w-full">
      <div className="font-bold text-xl text-white mb-2">{title}</div>
      <p className="text-gray-200 text-base mt-4">{content}</p>
    </div>
  );
};

export default TextCard;
