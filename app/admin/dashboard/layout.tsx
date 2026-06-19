"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear cookie (client-side simple trick, ideally an API call)
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-card border-r border-outline-variant flex flex-col">
        <div className="p-6 border-b border-outline-variant">
          <Link href="/" className="text-title-lg font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">construction</span>
            Jamro Admin
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/dashboard/blogs"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              pathname.includes("/blogs")
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined">article</span>
            Blogs
          </Link>
          
          <Link
            href="/admin/dashboard/queries"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              pathname.includes("/queries")
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined">contact_support</span>
            Contact Queries
          </Link>
        </nav>

        <div className="p-4 border-t border-outline-variant">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error-container hover:text-on-error-container transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
