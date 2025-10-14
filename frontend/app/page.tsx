"use client";
import PropertyList from "../components/PropertyList";
import Image from "next/image";

import { useState, useCallback } from "react";
import CitySelector from "../components/CitySelector";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Debounced search handler
  const handleSearch = useCallback(() => {
    setSearch(inputValue);
  }, [inputValue]);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-r from-red-50 to-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Start your #StayWise Journey</h1>
            <p className="text-lg text-gray-700 mb-6">Find and book properties in top Indian cities. Search, filter, and book with ease.</p>
            <div className="flex flex-col md:flex-row gap-3">
              <CitySelector value={selectedCity} onChange={setSelectedCity} />
              <SearchBar value={inputValue} onChange={setInputValue} onSearch={handleSearch} />
            </div>
          </div>
          <div className="flex-1 hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjBib29raW5nfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"
              alt="Hotel Booking Hero"
              width={400}
              height={256}
              className="rounded-xl shadow-lg w-full h-64 object-cover"
              priority
            />
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4">
        <section className="py-8">
          <h2 className="text-xl font-bold mb-4">Properties</h2>
          <PropertyList selectedCity={selectedCity} search={search} />
        </section>
      </div>
    </main>
  );
}
