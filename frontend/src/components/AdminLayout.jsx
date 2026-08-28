import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Utensils, Tag, LogOut, Menu, X } from "lucide-react";

const AdminLayout = ({ children, title }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the mobile drawer automatically whenever the route changes
  useEffect(() => setSidebarOpen(false), [location.pathname]);

  const navItem = (to, label, Icon) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body transition ${
          active
            ? "bg-brand-red text-white"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon size={18} />
        {label}
      </Link>
    );
  };

  const sidebarContent = (
    <>
      <div className="font-heading text-xl text-white uppercase mb-10">
        Panozzo's <span className="text-brand-red">Admin</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItem("/admin/dashboard", "Dashboard", LayoutDashboard)}
        {navItem("/admin/dashboard", "Plats", Utensils)}
        {navItem("/admin/categories/all", "Catégories", Tag)}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body text-gray-300 hover:bg-white/10 hover:text-white transition"
      >
        <LogOut size={18} />
        Déconnexion
      </button>
    </>
  );

  return (
    <div className="min-h-screen flex bg-brand-cream">
      {/* Desktop sidebar — unchanged, always visible from md up */}
      <aside className="hidden md:flex w-64 bg-brand-black flex-col p-6 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-brand-black flex items-center justify-between px-4 py-3">
        <div className="font-heading text-lg text-white uppercase">
          Panozzo's <span className="text-brand-red">Admin</span>
        </div>
        <button
          className="text-white"
          onClick={() => setSidebarOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile drawer + backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-72 bg-brand-black flex flex-col p-6 z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="self-end text-white mb-6"
          onClick={() => setSidebarOpen(false)}
          aria-label="Fermer le menu"
        >
          <X size={24} />
        </button>
        {sidebarContent}
      </aside>

      {/* Main content — top padding on mobile clears the fixed top bar */}
      <main className="flex-1 p-4 pt-20 md:p-10 min-w-0">
        <h1 className="font-heading text-2xl md:text-3xl text-brand-black mb-6 md:mb-8">
          {title}
        </h1>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
