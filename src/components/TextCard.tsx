import React from "react";

interface CardProps {
    title: string;
    content: string;
}

const TextCard:React.FC<CardProps> = ({ title, content }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-6">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-200 text-base mt-4">
                {content}
            </p>
        </div>
    );
};

export default TextCard;