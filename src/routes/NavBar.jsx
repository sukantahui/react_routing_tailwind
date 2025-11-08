import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useLocation } from "react-router-dom";
import cnat from "../assets/cnat.png";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const baseLinkClass = 'px-4 py-2 text-sm rounded text-blue-600 hover:bg-blue-100 transition duration-200';
  const location = useLocation();
  const isHome = location.pathname === "/";
  const linkClass = ({ isActive }) =>
    `block px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded
     ${isActive
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
      {/* Constrain total navbar width */}
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="py-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2  font-semibold text-base">
            <img src={cnat} alt="Logo" className="w-8 h-8" />
            <span className="text-2xl">Coder & AccoTax</span>
          </div>

          {/* Toggle button (mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-[oklch(40%_0.15_260)] text-xl focus:outline-none"
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <nav className="hidden sm:flex gap-3">
            {!isHome && <NavLink to="/" className={linkClass}>Home</NavLink>}
            {isHome &&
              <>
                <HashLink smooth to="/#about" className={linkClass}>About</HashLink>
                <HashLink smooth to="/#courses" className={linkClass}>Courses</HashLink>
                <HashLink smooth to="/#teachers" className={linkClass}>Teachers</HashLink>
                <HashLink smooth to="/#services" className={linkClass}>Services</HashLink>
                <HashLink smooth to="/#contact" className={linkClass}>Contact</HashLink>
              </>
            }
            {/* <NavLink to="/about" className={linkClass}>About</NavLink>*/}
            <NavLink to="/login" className={linkClass}>Login</NavLink>
            {/* <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink> */}
          </nav>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden pb-3 flex flex-col gap-1 transition-all duration-300">
            {!isHome && <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>Home</NavLink>}
            {isHome &&
              <>
                <HashLink smooth to="/#about" className={linkClass} onClick={() => setIsOpen(false)}>About</HashLink>
                <HashLink smooth to="/#courses" className={linkClass} onClick={() => setIsOpen(false)}>Courses</HashLink>
                <HashLink smooth to="/#teachers" className={linkClass} onClick={() => setIsOpen(false)}>Teachers</HashLink>
                <HashLink smooth to="/#services" className={linkClass} onClick={() => setIsOpen(false)}>Services</HashLink>
                <HashLink smooth to="/#contact" className={linkClass} onClick={() => setIsOpen(false)}>Contact</HashLink>
              </>
            }
          

            {/* <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
              Dashboard
            </NavLink> */}
          </div>
        )}
      </div>
    </header>
  );
}
