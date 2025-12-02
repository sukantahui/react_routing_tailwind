import React, { Component } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import cnat from "../assets/cnat.png";

// Wrapper so that class component can use `location`
function withLocation(ComponentWithLocation) {
  return function Wrapper(props) {
    const location = useLocation();
    return <ComponentWithLocation {...props} location={location} />;
  };
}

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      servicesOpen: false,
      tutorialsOpen: false,   // ⭐ NEW
      activeHash: props.location.hash || "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setState({ activeHash: this.props.location.hash });
    }
  }

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      servicesOpen: false,
      tutorialsOpen: false, // close tutorials when menu toggles
    });
  };

  toggleServices = () => {
    this.setState({
      servicesOpen: !this.state.servicesOpen,
      tutorialsOpen: false, // keep only one dropdown open
    });
  };

  toggleTutorials = () => {       // ⭐ NEW
    this.setState({
      tutorialsOpen: !this.state.tutorialsOpen,
      servicesOpen: false,
    });
  };

  closeMobileMenu = () => {
    this.setState({
      isOpen: false,
      servicesOpen: false,
      tutorialsOpen: false,
    });
  };

  linkClass = (key, isActive) => {
    const activeColors = {
      home: "from-sky-600 to-purple-600",
      about: "from-green-500 to-lime-500",
      courses: "from-pink-500 to-rose-500",
      teachers: "from-amber-500 to-orange-500",
      services: "from-indigo-500 to-blue-500",
      tutorials: "from-yellow-500 to-amber-500", // ⭐ NEW color
      contact: "from-emerald-500 to-teal-500",
      login: "from-red-500 to-pink-500",
    };

    return `block px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-colors duration-200 ${
      isActive
        ? `bg-gradient-to-r ${activeColors[key]} text-white`
        : "text-gray-300 hover:text-white hover:bg-gray-800/70"
    }`;
  };

  render() {
    const { location } = this.props;
    const { isOpen, servicesOpen, tutorialsOpen, activeHash } = this.state;
    const isHome = location.pathname === "/";

    return (
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">

            {/* BRAND */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 sm:gap-3 font-semibold text-lg sm:text-xl text-white"
            >
              <img src={cnat} alt="Coder & AccoTax Logo" className="w-8 h-8 sm:w-9 sm:h-9" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 whitespace-nowrap">
                Coder & AccoTax
              </span>
            </motion.div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={this.toggleMenu}
              className="sm:hidden text-gray-300 text-2xl focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isOpen ? "✕" : "☰"}
            </button>

            {/* DESKTOP MENU */}
            <nav className="hidden sm:flex items-center gap-2 md:gap-3">
              {!isHome && (
                <NavLink
                  to="/"
                  className={({ isActive }) => this.linkClass("home", isActive)}
                >
                  Home
                </NavLink>
              )}

              {isHome && (
                <>
                  <HashLink smooth to="/#about" className={this.linkClass("about", activeHash === "#about")}>About</HashLink>
                  <HashLink smooth to="/#courses" className={this.linkClass("courses", activeHash === "#courses")}>Courses</HashLink>
                  <HashLink smooth to="/#teachers" className={this.linkClass("teachers", activeHash === "#teachers")}>Teachers</HashLink>
                  <HashLink smooth to="/#services" className={this.linkClass("services", activeHash === "#services")}>Services</HashLink>
                  <HashLink smooth to="/#contact" className={this.linkClass("contact", activeHash === "#contact")}>Contact</HashLink>
                </>
              )}

              {/* ===================== DESKTOP DROPDOWN #1 - TOOLS ===================== */}
              <div className="relative">
                <button
                  onClick={this.toggleServices}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 text-sm sm:text-base font-medium rounded-full flex items-center gap-1 transition"
                >
                  Tools ▾
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2 z-50"
                    >
                      <NavLink to="/tools/type-test" onClick={this.toggleServices} className={({ isActive }) => this.linkClass("services", isActive)}>Typing Test</NavLink>

                      <NavLink to="/tools/typing-learn" onClick={this.toggleServices} className={({ isActive }) => this.linkClass("services", isActive)}>Typing Learn</NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ===================== DESKTOP DROPDOWN #2 - TUTORIALS ⭐ NEW ===================== */}
              <div className="relative">
                <button
                  onClick={this.toggleTutorials}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 text-sm sm:text-base font-medium rounded-full flex items-center gap-1 transition"
                >
                  Tutorials ▾
                </button>

                <AnimatePresence>
                  {tutorialsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2 z-50"
                    >
                      <NavLink to="/tutorial/js" onClick={this.toggleTutorials} className={({ isActive }) => this.linkClass("tutorials", isActive)}>JavaScript</NavLink>

                      <NavLink to="/tutorials/python" onClick={this.toggleTutorials} className={({ isActive }) => this.linkClass("tutorials", isActive)}>Python</NavLink>

                      <NavLink to="/tutorials/c" onClick={this.toggleTutorials} className={({ isActive }) => this.linkClass("tutorials", isActive)}>C Programming</NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* LOGIN */}
              <NavLink to="/login" className={({ isActive }) => this.linkClass("login", isActive)}>Login</NavLink>
            </nav>
          </div>

          {/* ===================== MOBILE MENU ===================== */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="sm:hidden flex flex-col gap-2 pb-4"
              >

                {!isHome && (
                  <NavLink to="/" className={({ isActive }) => this.linkClass("home", isActive)} onClick={this.closeMobileMenu}>
                    Home
                  </NavLink>
                )}

                {isHome && (
                  <>
                    <HashLink smooth to="/#about" className={this.linkClass("about", activeHash === "#about")} onClick={this.closeMobileMenu}>About</HashLink>
                    <HashLink smooth to="/#courses" className={this.linkClass("courses", activeHash === "#courses")} onClick={this.closeMobileMenu}>Courses</HashLink>
                    <HashLink smooth to="/#teachers" className={this.linkClass("teachers", activeHash === "#teachers")} onClick={this.closeMobileMenu}>Teachers</HashLink>
                    <HashLink smooth to="/#services" className={this.linkClass("services", activeHash === "#services")} onClick={this.closeMobileMenu}>Services</HashLink>
                    <HashLink smooth to="/#contact" className={this.linkClass("contact", activeHash === "#contact")} onClick={this.closeMobileMenu}>Contact</HashLink>
                  </>
                )}

                {/* MOBILE DROPDOWN #1 - Tools */}
                <div className="flex flex-col">
                  <button
                    onClick={this.toggleServices}
                    className="text-gray-300 hover:text-white hover:bg-gray-800/70 px-4 py-2 rounded-full text-left"
                  >
                    Tools ▾
                  </button>

                  {servicesOpen && (
                    <div className="ml-4 flex flex-col">
                      <NavLink to="/tools/type-test" className={({ isActive }) => this.linkClass("services", isActive)} onClick={this.closeMobileMenu}>Typing Test</NavLink>
                      <NavLink to="/tools/typing-learn" className={({ isActive }) => this.linkClass("services", isActive)} onClick={this.closeMobileMenu}>Typing Learn</NavLink>
                    </div>
                  )}
                </div>

                {/* MOBILE DROPDOWN #2 - Tutorials ⭐ NEW */}
                <div className="flex flex-col">
                  <button
                    onClick={this.toggleTutorials}
                    className="text-gray-300 hover:text-white hover:bg-gray-800/70 px-4 py-2 rounded-full text-left"
                  >
                    Tutorials ▾
                  </button>

                  {tutorialsOpen && (
                    <div className="ml-4 flex flex-col">
                      <NavLink to="/tutorials/javascript" className={({ isActive }) => this.linkClass("tutorials", isActive)} onClick={this.closeMobileMenu}>JavaScript</NavLink>

                      <NavLink to="/tutorials/python" className={({ isActive }) => this.linkClass("tutorials", isActive)} onClick={this.closeMobileMenu}>Python</NavLink>

                      <NavLink to="/tutorials/c" className={({ isActive }) => this.linkClass("tutorials", isActive)} onClick={this.closeMobileMenu}>C Programming</NavLink>
                    </div>
                  )}
                </div>

                {/* LOGIN */}
                <NavLink to="/login" className={({ isActive }) => this.linkClass("login", isActive)} onClick={this.closeMobileMenu}>
                  Login
                </NavLink>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.header>
    );
  }
}

export default withLocation(NavBar);
