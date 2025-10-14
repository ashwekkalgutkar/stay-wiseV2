"use client";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Image from "next/image";


export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Removed unused city/search state

  const validate = () => {
    if (!name.trim()) {
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
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      login(data.token, data.user);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full">
  <div className="hidden md:flex flex-col justify-center items-center bg-orange-50 px-8 py-12 w-1/2">
              <Image
                src="https://l450v.alamy.com/450v/2k54f9f/land-broker-template-hand-drawn-cartoon-flat-illustration-with-bridging-investors-or-buyers-and-sellers-agent-for-buy-rent-and-sell-property-2k54f9f.jpg"
                alt="Signup Illustration"
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-l-2xl"
                priority
              />
        </div>
  <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={() => router.back()}
          aria-label="Close"
        >
          &times;
        </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your StayWise Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Create a password"
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
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : "Sign Up"}
            </button>
          </form>
          <div className="mt-6 text-center text-base">
            Already have an account? <a href="/auth/login" className="text-orange-500 font-bold hover:underline">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
