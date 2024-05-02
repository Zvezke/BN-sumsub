"use client";

import Link from "next/link";
import React from "react";

interface ButtonProps {
  text: string;
  link: string;
}

const Button = ({ link, text }: ButtonProps) => {
  return (
    <Link
      href={link}
      className="rounded-md bg-sand px-3 py-1.5 text-sm font-semibold text-himmel"
    >
      {text}
    </Link>
  );
};

export default Button;
