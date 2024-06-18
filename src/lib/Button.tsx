import React from "react";

type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  children: string;
};

export default function Button({ onClick, disabled,  type, children }: ButtonProps) {
  return (
    <button
      title={children}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition"
    >
      {children}
    </button>
  ); 
}
