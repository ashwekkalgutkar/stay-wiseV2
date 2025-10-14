import Link from "next/link";
import ImageCarousel from "./ImageCarousel";

interface Property {
  _id: string;
  title: string;
  description: string;
  city: string;
  address: string;
  price?: number;
  images: string[];
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition flex flex-col border border-gray-100">
      <div className="relative">
        <ImageCarousel images={property.images} alt={property.title} clickable={false} />
        <Link href={`/properties/${property._id}`} className="absolute inset-0" tabIndex={-1} aria-label="View property details" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
          <span className="text-lg font-semibold text-gray-800">
            ₹{typeof property.price === "number" ? property.price.toLocaleString() : "N/A"}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11V7a3 3 0 00-6 0v4" /></svg>
          {property.city}, {property.address}
        </p>
        <div className="flex gap-4 text-gray-600 text-xs mb-4">
          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>4 Beds</span>
          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 20h10M7 4h10M7 4v16M17 4v16" /></svg>2 Bathrooms</span>
          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>245m²</span>
        </div>
        <Link href={`/properties/${property._id}`} className="mt-auto w-full block">
          <button className="w-full py-3 rounded-full bg-black text-white font-bold text-base shadow hover:bg-gray-900 transition duration-200 hover:scale-105 active:scale-95">View Details</button>
        </Link>
      </div>
    </div>
  );
}
