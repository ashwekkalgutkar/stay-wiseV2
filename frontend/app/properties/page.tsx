"use client";
import { useState, useCallback } from "react";
import CitySelector from "../../components/CitySelector";
import SearchBar from "../../components/SearchBar";
import PropertyList from "../../components/PropertyList";

export default function PropertiesPage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Debounced search handler
  const handleSearch = useCallback(() => {
    setSearch(inputValue);
  }, [inputValue]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">Browse Properties</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          <CitySelector value={selectedCity} onChange={setSelectedCity} />
          <SearchBar value={inputValue} onChange={setInputValue} onSearch={handleSearch} />
        </div>
        <PropertyList selectedCity={selectedCity} search={search} />
      </div>
    </main>
  );
}
