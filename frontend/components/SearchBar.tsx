"use client";

import { useRef, useEffect } from "react";

export default function SearchBar({ value, onChange, onSearch }: { value: string; onChange: (val: string) => void; onSearch: () => void }) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Trigger search whenever value changes (debounced)
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch();
    }, 400); // 400ms debounce
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  return (
    <div className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 placeholder-red-400 text-red-700"
        placeholder="Search by locality, project, builder..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button type="button" className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition" onClick={onSearch}>Search</button>
    </div>
  );
}
