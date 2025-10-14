"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useGlobalLoader } from "../../../context/GlobalLoaderContext";

interface Property {
  _id: string;
  title: string;
  description: string;
  city: string;
  address: string;
  price: number;
  images: string[];
  createdAt: string;
}

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  // Removed local loading state, using global loader
  const { setLoading: setGlobalLoading } = useGlobalLoader();
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingMsg, setBookingMsg] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  // Removed city and search for detail page

  useEffect(() => {
    fetchProperty();
    // eslint-disable-next-line
  }, [id]);

  const fetchProperty = async () => {
    setGlobalLoading(true);
    try {
      const res = await fetch(`/api/properties/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch property");
      setProperty(data);
    } catch {
      setError("Failed to load property.");
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingMsg("");
    if (!startDate || !endDate) {
      setBookingMsg("Please select both start and end dates.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setBookingMsg("End date must be after start date.");
      return;
    }
    setGlobalLoading(true);
    setBookingLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ property: id, startDate, endDate }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");
      setBookingMsg("Booking successful!");
      setStartDate("");
      setEndDate("");
    } catch {
      setBookingMsg("Booking failed. Please try again.");
    } finally {
      setGlobalLoading(false);
      setBookingLoading(false);
    }
  };

  const { loading: globalLoading } = useGlobalLoader();
  if (globalLoading) {
    // Use the same loader as homepage
    return <main className="min-h-screen bg-gradient-to-r from-red-50 to-white font-sans"><div className="flex items-center justify-center min-h-screen"><svg className="animate-spin h-12 w-12 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg></div></main>;
  }
  if (error || !property) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold font-sans">{error || "Property not found."}</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-50 to-white font-sans">
      <section className="max-w-4xl mx-auto py-10 px-4">
        {/* No CitySelector or SearchBar on detail page */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Image
              src={property.images[0] || "/default-property.jpg"}
              alt={property.title}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-64"
              priority
            />
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-red-600 mb-2 font-sans">{property.title}</h1>
              <p className="text-lg text-gray-700 mb-2 font-sans">{property.city}, {property.address}</p>
              <p className="text-xl font-semibold text-red-600 mb-4 font-sans">₹{property.price.toLocaleString()}</p>
              <p className="text-gray-600 mb-6 font-sans">{property.description}</p>
              <p className="text-gray-700 text-sm mt-2 font-medium">{new Date(property.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="w-full md:w-80 flex flex-col justify-center">
            <div className="bg-red-50 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold text-red-700 mb-4 font-sans">Book this property</h2>
              <form className="space-y-4" onSubmit={handleBooking}>
                <div>
                  <label className="block text-sm font-medium text-red-700 font-sans">Start Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 font-sans text-gray-900 placeholder-gray-400"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-red-700 font-sans">End Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 font-sans text-gray-900 placeholder-gray-400"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    required
                  />
                </div>
                {bookingMsg && <div className={`text-center text-sm ${bookingMsg.includes("success") ? "text-green-600" : "text-red-600"} font-sans`}>{bookingMsg}</div>}
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition text-lg font-sans"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Book Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
