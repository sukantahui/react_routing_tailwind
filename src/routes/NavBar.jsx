import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded
     ${
       isActive
         ? "bg-[oklch(94%_.15_80)] text-[oklch(30%_0.25_260)]"
         : "text-[oklch(40%_0.15_260)] hover:bg-[oklch(96%_0.03_260)] hover:text-[oklch(30%_0.2_260)]"
     }`;

  return (
    <header
  className="bg-gradient-to-r 
             from-[oklch(60%_0.02_60/0.55)] from-10% 
             via-[oklch(68%_.1_285/0.55)] via-30% 
             to-[oklch(70%_0_0)] to-60% 
             shadow-sm sticky top-0 z-50 
             border-b border-[oklch(88%_0_0/0.15)]"
>
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <h1 className="text-[oklch(30%_0.2_260)] font-semibold text-base">
          MyApp
        </h1>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-[oklch(40%_0.15_260)] text-lg focus:outline-none"
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className="hidden sm:flex gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </nav>
      </div>

      {isOpen && (
        <div className="sm:hidden px-4 pb-2 flex flex-col gap-1">
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
        </div>
      )}
    </header>
  );
}
