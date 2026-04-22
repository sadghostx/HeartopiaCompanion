"use client";

import { useState } from "react";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login, register, isAuthenticated, loading, resetPassword } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">Welcome back to Heartopia! 🌸</h1>
          <p className="text-lg text-gray-600 mb-8">Your cozy companion is ready for adventure.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <div className="text-3xl mb-3">🐦</div>
              <h3 className="font-semibold text-purple-700 mb-2">Bird Watching</h3>
              <p className="text-sm text-gray-600">Track your feathered friends across different seasons.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <div className="text-3xl mb-3">🐟</div>
              <h3 className="font-semibold text-purple-700 mb-2">Fishing</h3>
              <p className="text-sm text-gray-600">Catch and catalog all the aquatic creatures.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <div className="text-3xl mb-3">🐛</div>
              <h3 className="font-semibold text-purple-700 mb-2">Bug Catching</h3>
              <p className="text-sm text-gray-600">Discover the world of insects and their habitats.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <div className="text-3xl mb-3">🍳</div>
              <h3 className="font-semibold text-purple-700 mb-2">Cooking</h3>
              <p className="text-sm text-gray-600">Master recipes and culinary delights.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <div className="text-3xl mb-3">🌸</div>
              <h3 className="font-semibold text-purple-700 mb-2">Gardening</h3>
              <p className="text-sm text-gray-600">Grow beautiful flowers and bountiful crops.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <div className="text-3xl mb-3">🎬</div>
              <h3 className="font-semibold text-purple-700 mb-2">Fashionwave</h3>
              <p className="text-sm text-gray-600">Collect film-inspired items and critters.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (isReset) {
        await resetPassword(email);
        setSuccess("Password reset email sent! Check your inbox.");
        setIsReset(false);
      } else if (isRegister) {
        await register(email, password);
        setSuccess("Account created successfully! You can now log in.");
        setIsRegister(false);
      } else {
        await login(email, password);
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600">Loading Heartopia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-md w-full mx-4">
        {/* Cute Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌸</div>
          <h1 className="text-4xl font-bold text-purple-700 mb-2">Heartopia</h1>
          <p className="text-lg text-gray-600">Your Cozy Companion Guide</p>
          <div className="flex justify-center space-x-2 mt-4">
            <span className="text-2xl">🐦</span>
            <span className="text-2xl">🐟</span>
            <span className="text-2xl">🐛</span>
            <span className="text-2xl">🌸</span>
            <span className="text-2xl">🎬</span>
          </div>
        </div>

        {/* Auth Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-purple-100">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
            {isReset ? "Reset Password" : isRegister ? "Join Heartopia" : "Welcome Back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="your@email.com"
                required
              />
            </div>

            {!isReset && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition font-semibold"
            >
              {isReset ? "Send Reset Email" : isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Action Links */}
          <div className="mt-6 space-y-2 text-center">
            {!isReset && (
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                  setSuccess("");
                }}
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                {isRegister ? "Already have an account? Sign in" : "Need an account? Sign up"}
              </button>
            )}
            <br />
            <button
              onClick={() => {
                setIsReset(!isReset);
                setIsRegister(false);
                setError("");
                setSuccess("");
              }}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              {isReset ? "Back to sign in" : "Forgot password?"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Track your Heartopia adventures with style ✨</p>
        </div>
      </div>
    </div>
  );
}