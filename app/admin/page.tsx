"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard/blogs");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center py-20 px-4 hero-mesh">
        <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-headline-md text-on-surface mb-2">Admin Portal</h1>
            <p className="text-body-md text-on-surface-variant">Sign in to manage Jamro Tools</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-lg text-label-md flex items-center gap-2">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant block" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-body-md"
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant block" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-body-md"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary py-3 rounded-xl text-label-md hover:bg-secondary transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      <SiteFooter hasMarginBottom={false} />
    </div>
  );
}
