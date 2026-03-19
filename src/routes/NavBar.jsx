import React, { Component } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import cnat from "../assets/cnat.png";

const isDev = import.meta.env.DEV;

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
      tutorialsOpen: false,
      activeHash: props.location.hash || "",
    };
    this.navRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setState({ activeHash: this.props.location.hash });
    }
  }

  componentDidMount() {
    document.addEventListener("pointerdown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("pointerdown", this.handleClickOutside);
  }

  toggleMenu = () => {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
      servicesOpen: false,
      tutorialsOpen: false,
    }));
  };

  toggleServices = () => {
    this.setState((prev) => ({
      servicesOpen: !prev.servicesOpen,
      tutorialsOpen: false,
    }));
  };

  toggleTutorials = () => {
    this.setState((prev) => ({
      tutorialsOpen: !prev.tutorialsOpen,
      servicesOpen: false,
    }));
  };

  closeMobileMenu = () => {
    this.setState({
      isOpen: false,
      servicesOpen: false,
      tutorialsOpen: false,
    });
  };

  // Helper to get icon class based on link key
  getIconClass = (key) => {
    const icons = {
      home: "bi-house-door",
      about: "bi-info-circle",
      courses: "bi-book",
      teachers: "bi-people",
      services: "bi-tools",
      tutorials: "bi-collection-play",
      contact: "bi-envelope",
      login: "bi-box-arrow-in-right",
      "typing-test": "bi-keyboard",
      "typing-learn": "bi-pencil",
      "python-play": "bi-code-slash",
      "play": "bi-code-square",
      icons: "bi-grid-3x3",
      vscode: "bi-window",
      whiteboard: "bi-easel",
      javascript: "bi-filetype-js",
      python: "bi-filetype-py",
      "c-language": "bi-filetype-c",
      tally: "bi-calculator",
      excel: "bi-file-spreadsheet",
      "icse-java-ix": "bi-journal-code",
      "icse-java-x": "bi-journal-code",
      "java-core": "bi-cpu",
      general: "bi-files",
      "computer-architecture": "bi-motherboard",
      "isc-11": "bi-journal-richtext",
      css: "bi-filetype-css",
      unix: "bi-terminal",
      react: "bi-react",
      node: "bi-node",
      "java-web": "bi-globe",
      "qr-code": "bi-qr-code-scan",
    };
    return icons[key] || "bi-link";
  };

  linkClass = (key, isActive) => {
    const activeColors = {
      home: "from-sky-600 to-purple-600",
      about: "from-green-500 to-lime-500",
      courses: "from-pink-500 to-rose-500",
      teachers: "from-amber-500 to-orange-500",
      services: "from-indigo-500 to-blue-500",
      tutorials: "from-yellow-500 to-amber-500",
      contact: "from-emerald-500 to-teal-500",
      login: "from-red-500 to-pink-500",
    };

    return `flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-200 ${
      isActive
        ? `bg-gradient-to-r ${activeColors[key]} text-white shadow-lg shadow-${activeColors[key].split(" ")[0]}/30`
        : "text-gray-300 hover:text-white hover:bg-gray-800/70 hover:scale-105"
    }`;
  };

  handleClickOutside = (event) => {
    if (this.navRef.current && !this.navRef.current.contains(event.target)) {
      this.setState({
        isOpen: false,
        servicesOpen: false,
        tutorialsOpen: false,
      });
    }
  };

  render() {
    const { location } = this.props;
    const { isOpen, servicesOpen, tutorialsOpen, activeHash } = this.state;
    const isHome = location.pathname === "/";

    return (
      <motion.header
        ref={this.navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-gradient-to-b from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-md border-b border-gray-800"
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
              className="sm:hidden text-gray-300 text-2xl focus:outline-none hover:text-white transition"
              aria-label="Toggle navigation"
            >
              {isOpen ? "✕" : "☰"}
            </button>

            {/* DESKTOP MENU */}
            <nav className="hidden sm:flex items-center gap-2 md:gap-3">
              {!isHome && (
                <NavLink to="/" className={({ isActive }) => this.linkClass("home", isActive)}>
                  <i className={`bi ${this.getIconClass("home")}`}></i>
                  <span>Home</span>
                </NavLink>
              )}

              {isHome && (
                <>
                  <HashLink smooth to="/#about" className={this.linkClass("about", activeHash === "#about")}>
                    <i className={`bi ${this.getIconClass("about")}`}></i>
                    <span>About</span>
                  </HashLink>
                  <HashLink smooth to="/#courses" className={this.linkClass("courses", activeHash === "#courses")}>
                    <i className={`bi ${this.getIconClass("courses")}`}></i>
                    <span>Courses</span>
                  </HashLink>
                  <HashLink smooth to="/#teachers" className={this.linkClass("teachers", activeHash === "#teachers")}>
                    <i className={`bi ${this.getIconClass("teachers")}`}></i>
                    <span>Teachers</span>
                  </HashLink>
                  <HashLink smooth to="/#services" className={this.linkClass("services", activeHash === "#services")}>
                    <i className={`bi ${this.getIconClass("services")}`}></i>
                    <span>Services</span>
                  </HashLink>
                  <HashLink smooth to="/#contact" className={this.linkClass("contact", activeHash === "#contact")}>
                    <i className={`bi ${this.getIconClass("contact")}`}></i>
                    <span>Contact</span>
                  </HashLink>
                </>
              )}

              {/* DROPDOWN #1 - TOOLS */}
              <div className="relative">
                <button
                  onClick={this.toggleServices}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 text-sm sm:text-base font-medium rounded-full transition"
                >
                  <i className={`bi ${this.getIconClass("services")}`}></i>
                  <span>Tools</span>
                  <i className={`bi bi-chevron-down text-xs transition-transform ${servicesOpen ? "rotate-180" : ""}`}></i>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2 z-50"
                    >
                      {[
                        { to: "/tools/type-test", key: "typing-test", label: "Typing Test" },
                        { to: "/tools/typing-learn", key: "typing-learn", label: "Typing Learn" },
                        { to: "/python-play", key: "python-play", label: "Python Editor" },
                        { to: "/play", key: "play", label: "JavaScript Editor" },
                        { to: "/icons", key: "icons", label: "Icons" },
                        { to: "/vscode", key: "vscode", label: "VS Code" },
                        { to: "/whiteBoard", key: "whiteboard", label: "Whiteboard" },
                        { to: "/qrcode", key: "qr-code", label: "QR Code Generator" }, 
                        { to: "/LinkedListVisualizer", key: "LinkedListVisualizer", label: "Linked List Visualizer" }, 
                      ].map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={this.toggleServices}
                          className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
                        >
                          <i className={`bi ${this.getIconClass(item.key)} text-lg`}></i>
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* DROPDOWN #2 - TUTORIALS */}
              <div className="relative">
                <button
                  onClick={this.toggleTutorials}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 text-sm sm:text-base font-medium rounded-full transition"
                >
                  <i className={`bi ${this.getIconClass("tutorials")}`}></i>
                  <span>Tutorials</span>
                  <i className={`bi bi-chevron-down text-xs transition-transform ${tutorialsOpen ? "rotate-180" : ""}`}></i>
                </button>

                <AnimatePresence>
                  {tutorialsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2 z-50 max-h-96 overflow-y-auto"
                    >
                      {[
                        { to: "/javascript/roadmap", key: "javascript", label: "JavaScript", icon: "bi-filetype-js" },
                        { to: "/python/roadmap", key: "python", label: "Python", icon: "bi-filetype-py" },
                        { to: "/c-language/roadmap", key: "c-language", label: "C Programming", icon: "bi-filetype-c" },
                        { to: "/tally/roadmap", key: "tally", label: "Tally", icon: "bi-calculator" },
                        { to: "/excel/roadmap", key: "excel", label: "Excel", icon: "bi-file-spreadsheet" },
                        { to: "/icse-java-ix/roadmap", key: "icse-java-ix", label: "ICSE Class 9", icon: "bi-journal-code" },
                        { to: "/icse-java-x/roadmap", key: "icse-java-x", label: "ICSE Class X", icon: "bi-journal-code" },
                        { to: "/java-core/roadmap", key: "java-core", label: "Core Java", icon: "bi-cpu" },
                        { to: "/general/roadmap", key: "general", label: "General", icon: "bi-files" },
                        { to: "/css/roadmap", key: "css", label: "CSS", icon: "bi-filetype-css" },
                        { to: "/isc-11/roadmap", key: "isc-11", label: "ISC 11 Com. Sc.", icon: "bi-journal-richtext" },
                        { to: "/computer-architecture/roadmap", key: "computer-architecture", label: "Computer Architecture", icon: "bi-motherboard" },
                        { to: "/unix/roadmap", key: "unix", label: "UNIX", icon: "bi-terminal" },
                        { to: "/react/roadmap", key: "react", label: "React", icon: "bi-react" },
                        isDev && { to: "/node/roadmap", key: "node", label: "Node.js", icon: "bi-node" },
                        { to: "/java-web/roadmap", key: "java-web", label: "Java Web", icon: "bi-globe" },
                      ].filter(Boolean).map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={this.toggleTutorials}
                          className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
                        >
                          <i className={`bi ${item.icon} text-lg`}></i>
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* LOGIN */}
              <NavLink to="/login" className={({ isActive }) => this.linkClass("login", isActive)}>
                <i className={`bi ${this.getIconClass("login")}`}></i>
                <span>Login</span>
              </NavLink>
            </nav>
          </div>

          {/* MOBILE MENU */}
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
                    <i className={`bi ${this.getIconClass("home")}`}></i>
                    <span>Home</span>
                  </NavLink>
                )}

                {isHome && (
                  <>
                    <HashLink smooth to="/#about" className={this.linkClass("about", activeHash === "#about")} onClick={this.closeMobileMenu}>
                      <i className={`bi ${this.getIconClass("about")}`}></i>
                      <span>About</span>
                    </HashLink>
                    <HashLink smooth to="/#courses" className={this.linkClass("courses", activeHash === "#courses")} onClick={this.closeMobileMenu}>
                      <i className={`bi ${this.getIconClass("courses")}`}></i>
                      <span>Courses</span>
                    </HashLink>
                    <HashLink smooth to="/#teachers" className={this.linkClass("teachers", activeHash === "#teachers")} onClick={this.closeMobileMenu}>
                      <i className={`bi ${this.getIconClass("teachers")}`}></i>
                      <span>Teachers</span>
                    </HashLink>
                    <HashLink smooth to="/#services" className={this.linkClass("services", activeHash === "#services")} onClick={this.closeMobileMenu}>
                      <i className={`bi ${this.getIconClass("services")}`}></i>
                      <span>Services</span>
                    </HashLink>
                    <HashLink smooth to="/#contact" className={this.linkClass("contact", activeHash === "#contact")} onClick={this.closeMobileMenu}>
                      <i className={`bi ${this.getIconClass("contact")}`}></i>
                      <span>Contact</span>
                    </HashLink>
                  </>
                )}

                {/* MOBILE DROPDOWN #1 - Tools */}
                <div className="flex flex-col">
                  <button
                    onClick={this.toggleServices}
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-full text-left"
                  >
                    <i className={`bi ${this.getIconClass("services")}`}></i>
                    <span>Tools</span>
                    <i className={`bi bi-chevron-down text-xs ml-auto transition-transform ${servicesOpen ? "rotate-180" : ""}`}></i>
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 flex flex-col gap-1 overflow-hidden"
                      >
                        {[
                          { to: "/tools/type-test", key: "typing-test", label: "Typing Test" },
                          { to: "/tools/typing-learn", key: "typing-learn", label: "Typing Learn" },
                          { to: "/python-play", key: "python-play", label: "Python Editor" },
                          { to: "/play", key: "play", label: "JavaScript Editor" },
                          { to: "/icons", key: "icons", label: "Icons" },
                          { to: "/vscode", key: "vscode", label: "VS Code" },
                          { to: "/whiteBoard", key: "whiteboard", label: "Whiteboard" },
                          { to: "/QRCodeGenerator", key: "QRCodeGenerator", label: "QR Code" },
                        ].map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={this.closeMobileMenu}
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
                          >
                            <i className={`bi ${this.getIconClass(item.key)}`}></i>
                            <span>{item.label}</span>
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* MOBILE DROPDOWN #2 - Tutorials */}
                <div className="flex flex-col">
                  <button
                    onClick={this.toggleTutorials}
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-full text-left"
                  >
                    <i className={`bi ${this.getIconClass("tutorials")}`}></i>
                    <span>Tutorials</span>
                    <i className={`bi bi-chevron-down text-xs ml-auto transition-transform ${tutorialsOpen ? "rotate-180" : ""}`}></i>
                  </button>

                  <AnimatePresence>
                    {tutorialsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 flex flex-col gap-1 overflow-hidden"
                      >
                        {[
                          { to: "/javascript/roadmap", key: "javascript", label: "JavaScript", icon: "bi-filetype-js" },
                          { to: "/python/roadmap", key: "python", label: "Python", icon: "bi-filetype-py" },
                          { to: "/c-language/roadmap", key: "c-language", label: "C Programming", icon: "bi-filetype-c" },
                          { to: "/tally/roadmap", key: "tally", label: "Tally", icon: "bi-calculator" },
                          { to: "/excel/roadmap", key: "excel", label: "Excel", icon: "bi-file-spreadsheet" },
                          { to: "/icse-java-ix/roadmap", key: "icse-java-ix", label: "ICSE Class 9", icon: "bi-journal-code" },
                          { to: "/icse-java-x/roadmap", key: "icse-java-x", label: "ICSE Class X", icon: "bi-journal-code" },
                          { to: "/java-core/roadmap", key: "java-core", label: "Core Java", icon: "bi-cpu" },
                          { to: "/general/roadmap", key: "general", label: "General", icon: "bi-files" },
                          { to: "/computer-architecture/roadmap", key: "computer-architecture", label: "Computer Architecture", icon: "bi-motherboard" },
                          { to: "/isc-11/roadmap", key: "isc-11", label: "ISC 11 Com. Sc.", icon: "bi-journal-richtext" },
                        ].map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={this.closeMobileMenu}
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? "bg-sky-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
                          >
                            <i className={`bi ${item.icon}`}></i>
                            <span>{item.label}</span>
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* LOGIN */}
                <NavLink to="/login" className={({ isActive }) => this.linkClass("login", isActive)} onClick={this.closeMobileMenu}>
                  <i className={`bi ${this.getIconClass("login")}`}></i>
                  <span>Login</span>
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