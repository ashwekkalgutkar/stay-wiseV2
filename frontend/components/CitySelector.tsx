"use client";

const cities = ["All", "Mumbai", "Bangalore", "Pune", "Gurgaon", "Hyderabad", "Chennai", "Jaipur", "Noida", "Ahmedabad", "Indore"];

export default function CitySelector({ value, onChange }: { value: string; onChange: (city: string) => void }) {
  return (
    <select
      className="border rounded-lg px-3 py-2 text-gray-700 focus:ring-red-500 focus:border-red-500"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {cities.map(city => (
        <option key={city} value={city}>{city}</option>
      ))}
    </select>
  );
}
