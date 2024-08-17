import React from "react";
import { Link } from "react-router-dom";
import { Links } from "../const";
import { Github, Twitter } from "lucide-react";

export const Footer = () => (
  <footer className="text-center py-4 px-12 text-white border-t border-gray-600 flex justify-between">
    <span>
      <Link to={Links.ETHShenzhen} target="_blank" className="hover:underline">
        ETHShenzhen
      </Link>
      @{new Date().getFullYear()}
    </span>
    <div className="flex gap-4">
      <Link to={Links.Twitter} target="_blank">
        <Twitter />
      </Link>
      <Link to={Links.Github} target="_blank">
        <Github />
      </Link>
    </div>
  </footer>
);
