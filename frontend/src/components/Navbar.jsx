import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/menu", label: "Menu" },
  { to: "/galerie", label: "Galerie" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu automatically on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  const linkClass = ({ isActive }) =>
    `relative font-body uppercase text-sm tracking-wide py-1 transition-colors duration-200 group ${
      isActive ? "text-brand-red" : "text-white hover:text-brand-red"
    }`;

  return (
    <>
      <nav
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "pt-3 px-3 md:pt-4 md:px-6" : "pt-0 px-0"
        }`}
      >
        <div
          className={`flex items-center justify-between mx-auto transition-all duration-500 ${
            scrolled
              ? "max-w-6xl bg-brand-black/90 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-2xl shadow-black/40 border border-white/5"
              : "max-w-full bg-brand-black px-6 py-4"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-brand-red group-hover:scale-125 transition-transform duration-300" />
            <span className="font-heading text-xl md:text-2xl text-white uppercase leading-none">
              Panozzo's
              <span className="block text-brand-red text-spaced-letters text-[10px] md:text-xs font-body normal-case tracking-widest">
                Pizza & Crêpe
              </span>
            </span>
          </Link>

          {/* Desktop links with animated underline */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-[2px] bg-brand-red transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1 text-white text-xs font-body border border-white/20 rounded-full px-3 py-1.5 hover:border-brand-red transition-colors duration-200">
              FR <ChevronDown size={12} />
            </button>
            <button className="relative overflow-hidden bg-brand-red text-white font-body uppercase text-sm px-5 py-2.5 rounded-full hover:shadow-[0_0_25px_rgba(227,36,36,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
              Commander
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-black md:hidden transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-heading text-3xl uppercase transition-all duration-500 ${
                  isActive ? "text-brand-red" : "text-white"
                } ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`
              }
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}
            >
              {l.label}
            </NavLink>
          ))}

          <button
            className={`mt-6 bg-brand-red text-white font-body uppercase text-sm px-8 py-3.5 rounded-full transition-all duration-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isOpen ? `${links.length * 60}ms` : "0ms",
            }}
          >
            Commander
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
