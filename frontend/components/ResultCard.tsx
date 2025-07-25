"use client";

type ResultCardProps = {
  title: string;
};

export default function ResultCard({ title }: ResultCardProps) {
  return (
    <div className="border border-gray-300 rounded px-4 py-2 shadow-sm bg-white text-gray-800">
      {title}
    </div>
  );
}
