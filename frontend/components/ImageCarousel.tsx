"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel({ images, alt, clickable = true }: { images: string[]; alt: string; clickable?: boolean }) {
  const [current, setCurrent] = useState(0);
  const next = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrent((current + 1) % images.length);
  };
  const prev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrent((current - 1 + images.length) % images.length);
  };
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-2xl group">
      <Image
        src={images[current] || "/default-property.jpg"}
        alt={alt}
        width={400}
        height={192}
        className="w-full h-48 object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
        priority
      />
      {images.length > 1 && (
        <>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-black hover:text-white transition z-10"
            onClick={prev}
            aria-label="Previous image"
            tabIndex={clickable ? 0 : -1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-black hover:text-white transition z-10"
            onClick={next}
            aria-label="Next image"
            tabIndex={clickable ? 0 : -1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`block w-2 h-2 rounded-full ${idx === current ? "bg-black" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-2xl" />
    </div>
  );
}
