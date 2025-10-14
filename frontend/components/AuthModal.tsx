"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGlobalLoader } from "../context/GlobalLoaderContext";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: "login" | "signup";
}

export default function AuthModal({ open, onClose, mode }: AuthModalProps) {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setLoading: setGlobalLoading } = useGlobalLoader();

  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [open]);

  if (!open) return null;

  const validate = () => {
    if (mode === "signup" && !name.trim()) {
      setError("Name is required.");
      return false;
    }
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    setGlobalLoading(true);
    try {
      if (mode === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Login failed");
        login(result.token, result.user);
        onClose();
      } else {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Signup failed");
        login(data.token, data.user);
        onClose();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Auth failed");
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="relative flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full mx-4">
        <div className="hidden md:block relative w-1/2 h-full min-h-[400px]">
          <Image
            src="https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-the-real-estate-agent-transparent-background-png-image_10309728.png"
            alt="Auth Illustration"
            fill
            className="object-cover w-full h-full rounded-l-2xl bg-white"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {mode === "login" ? "Login or Create an Account" : "Create Your StayWise Account"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-800 text-lg"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-800 text-lg"
                placeholder="Email ID / Mobile Number"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-800 text-lg"
                placeholder={mode === "login" ? "Enter your password" : "Create a password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-600 text-base text-center font-semibold">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white font-bold rounded-lg shadow hover:bg-orange-600 transition text-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                </span>
              ) : mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
          <div className="mt-6 text-center text-base">
            {mode === "login" ? (
              <>New to StayWise? <button className="text-orange-500 font-bold hover:underline" type="button" onClick={() => { setError(""); setName(""); setEmail(""); setPassword(""); onClose(); }}>{"Sign up"}</button></>
            ) : (
              <>Already have an account? <button className="text-orange-500 font-bold hover:underline" type="button" onClick={() => { setError(""); setName(""); setEmail(""); setPassword(""); onClose(); }}>{"Login"}</button></>
            )}
          </div>
        </div>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
