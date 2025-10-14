"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../context/AuthModalContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { openModal } = useAuthModal();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-red-600 tracking-tight">StayWise</Link>
          <nav className="hidden md:flex gap-4 text-gray-700 font-medium">
            <Link href="/bookings" className="hover:text-red-600">Bookings</Link>
          </nav>
        </div>
        <div className="flex gap-2 items-center">
          {user ? (
            <>
              <span className="flex items-center gap-2 px-4 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold">
                <span className="w-8 h-8 rounded-full bg-red-200 text-red-700 flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name}
              </span>
              <button className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button className="px-4 py-1 rounded-lg border border-red-600 text-red-600 font-semibold hover:bg-red-50 transition" onClick={() => openModal("login")}>Login</button>
              <button className="px-4 py-1 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition" onClick={() => openModal("signup")}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
