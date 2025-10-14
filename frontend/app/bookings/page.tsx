"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalLoader } from "../../context/GlobalLoaderContext";

interface Booking {
  _id: string;
  property: {
    _id: string;
    title: string;
    city: string;
    address: string;
    price: number;
    images: string[];
  };
  startDate: string;
  endDate: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setLoading: setGlobalLoading } = useGlobalLoader();

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setGlobalLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/bookings/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
      setBookings(data);
    } catch {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">My Bookings</h1>
        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-indigo-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-indigo-600 font-semibold">Loading...</span>
          </div>
        )}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              <Image
                src={booking.property.images[0] || "/default-property.jpg"}
                alt={booking.property.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
                priority
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-indigo-700 mb-1">{booking.property.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{booking.property.city}, {booking.property.address}</p>
                <p className="text-gray-800 font-semibold mb-2">₹{booking.property.price.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mb-2">Booking: {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
        {!loading && bookings.length === 0 && !error && (
          <div className="text-center mt-8 text-gray-500">No bookings found.</div>
        )}
      </div>
    </main>
  );
}
