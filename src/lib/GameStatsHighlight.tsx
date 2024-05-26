import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function GameStatsHighlight ({ children, label }: Props) {
  return (
    <>
    <div className="flex flex-col items-center">
    <h2 className="text-blue-900">{label}</h2>
    <div className="border-2 rounded-full w-24 text-center border-black">{children}</div>
    </div>
    </>
  );
}