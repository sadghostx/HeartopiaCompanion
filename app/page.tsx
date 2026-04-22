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
  const { login, register, isAuthenticated, loading, resetPassword, signInWithGoogle } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            Welcome back{user?.displayName ? `, ${user.displayName}` : ''}! 🌸
          </h1>
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

          {/* Google Sign In Button */}
          {!isReset && (
            <div className="mb-6">
              <button
                onClick={() => signInWithGoogle().catch(err => setError(err.message))}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </div>
          )}

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