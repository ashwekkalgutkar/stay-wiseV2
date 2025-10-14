"use client";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { useGlobalLoader } from "../context/GlobalLoaderContext";

interface Property {
  _id: string;
  title: string;
  description: string;
  city: string;
  address: string;
  price: number;
  images: string[];
}

export default function PropertyList({ selectedCity, search }: { selectedCity: string; search: string }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Deduplicate properties by _id
  const uniqueProperties: Property[] = Array.from(new Map(properties.map(p => [p._id, p])).values());

  // Reset page/properties when filters change
  useEffect(() => {
    setPage(1);
    setProperties([]);
    setHasMore(true);
  }, [selectedCity, search]);

  // Fetch properties when page changes
  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, [page]);

  const { setLoading: setGlobalLoading } = useGlobalLoader();
  const fetchProperties = async () => {
    setLoading(true);
    setGlobalLoading(true);
    try {
      const params = [];
      if (selectedCity !== "All") params.push(`city=${selectedCity}`);
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      params.push(`page=${page}`);
      params.push(`limit=8`);
      const res = await fetch(`/api/properties?${params.join("&")}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch properties");
      setProperties(page === 1 ? data : prev => [...prev, ...data]);
      setHasMore(data.length === 8);
    } catch {
      setError("Failed to load properties.");
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        hasMore && !loading
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, selectedCity, search]);

  return (
  
    <div>
      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <svg className="animate-spin h-8 w-8 text-red-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-red-600 font-semibold">Loading...</span>
        </div>
      )}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {uniqueProperties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      {!loading && uniqueProperties.length === 0 && !error && (
        <div className="text-center mt-8 text-gray-500">No properties found.</div>
      )}
      {/* Infinite scroll: no load more button */}
    </div>
  );
}
