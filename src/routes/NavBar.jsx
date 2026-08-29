// ============================================================================
// NavBar.jsx - Next-Level Ultra-Modern Public Navigation Bar
// ============================================================================

import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import cnat from "../assets/cnat.png";

const NavBar = () => {
  const location = useLocation();
  const navContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Active Dropdown state: null | 'tools' | 'tutorials'
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mobile menu states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState("all"); // 'all' | 'explore' | 'tools' | 'tutorials'
  const [mobileActiveAccordion, setMobileActiveAccordion] = useState("tools");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileTutorialCategory, setMobileTutorialCategory] = useState("all");

  // Global Command Palette / Search Modal
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);

  // Tutorials Dropdown in-menu filter (desktop)
  const [tutorialCategoryFilter, setTutorialCategoryFilter] = useState("all");
  const [tutorialDropdownSearch, setTutorialDropdownSearch] = useState("");

  const [activeHash, setActiveHash] = useState(location.hash || "");

  useEffect(() => {
    setActiveHash(location.hash);
  }, [location.hash]);

  const isDev = Boolean(import.meta.env?.DEV);
  const isHome = location.pathname === "/";

  // Tools Items Grouped (4 Categories)
  const toolsGroups = useMemo(() => [
    {
      id: "compilers",
      title: "Compilers & Editors",
      icon: "bi-code-square",
      color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30",
      items: [
        {
          to: "/python-play",
          label: "Python Playground",
          desc: "Interactive in-browser Python 3 execution",
          icon: "bi-filetype-py",
          tag: "Pyodide",
        },
        {
          to: "/play",
          label: "JavaScript Editor",
          desc: "Live HTML, CSS & JavaScript sandbox",
          icon: "bi-filetype-js",
          tag: "Live",
        },
        {
          to: "/vscode",
          label: "Web VS Code Guide",
          desc: "Cloud coding environment & cheatsheet",
          icon: "bi-window-desktop",
          tag: "IDE",
        },
        {
          to: "/whiteBoard",
          label: "Smart Whiteboard",
          desc: "Interactive canvas for diagrams & notes",
          icon: "bi-easel2-fill",
          tag: "Canvas",
        },
      ],
    },
    {
      id: "visualizers",
      title: "Data Structure Visualizers",
      icon: "bi-diagram-3-fill",
      color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
      items: [
        {
          to: "/LinkedListVisualizer",
          label: "Linked List Visualizer",
          desc: "Step-by-step singly linked list animation",
          icon: "bi-diagram-3",
          tag: "DSA",
        },
        {
          to: "/DoublyLinkedListVisualizer",
          label: "Doubly Linked List",
          desc: "Bidirectional pointer operations live",
          icon: "bi-arrow-left-right",
          tag: "DSA",
        },
        {
          to: "/BinaryTreeVisualizer",
          label: "Binary Tree Visualizer",
          desc: "BST insertions, deletions & traversals",
          icon: "bi-diagram-2-fill",
          tag: "DSA",
        },
        {
          to: "/AvlTreeVisualizer",
          label: "AVL Tree Visualizer",
          desc: "Self-balancing binary search trees",
          icon: "bi-share-fill",
          tag: "DSA",
        },
        {
          to: "/tools/sorting-visualizer",
          label: "Sorting Visualizer",
          desc: "Step-by-step array sorting animations",
          icon: "bi-bar-chart-steps",
          tag: "Visualizer",
        },
        {
          to: "/tools/big-o-calculator",
          label: "Big-O Calculator",
          desc: "Step count & asymptotic profiler",
          icon: "bi-calculator-fill",
          tag: "Profiler",
        },
      ],
    },
    {
      id: "skills",
      title: "Skills & Utilities",
      icon: "bi-lightning-charge-fill",
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
      items: [
        {
          to: "/tools/json-formatter",
          label: "JSON Formatter",
          desc: "Format, minify & validate JSON data",
          icon: "bi-filetype-json",
          tag: "Formatter",
        },
        {
          to: "/tools/type-test",
          label: "Typing Speed Test",
          desc: "Measure WPM & accuracy in real time",
          icon: "bi-keyboard-fill",
          tag: "Speed",
        },
        {
          to: "/tools/typing-learn",
          label: "Typing Learn Tutor",
          desc: "Touch typing lessons & muscle memory",
          icon: "bi-pencil-square",
          tag: "Practice",
        },
        {
          to: "/tools/audioextract",
          label: "Audio Extractor",
          desc: "Extract MP3/WAV tracks from video files",
          icon: "bi-soundwave",
          tag: "Utility",
        },
        {
          to: "/qrcode",
          label: "QR Code Generator",
          desc: "Instant dynamic QR generator & scanner",
          icon: "bi-qr-code-scan",
          tag: "Utility",
        },
        {
          to: "/icons",
          label: "Developer Icons",
          desc: "Searchable icon cheatsheet & glyphs",
          icon: "bi-grid-1x2-fill",
          tag: "Assets",
        },
      ],
    },

    {
      id: "resources",
      title: "Verifications & Resources",
      icon: "bi-patch-check-fill",
      color: "from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30",
      items: [
        {
          to: "/certificates",
          label: "Certificate Verification",
          desc: "Online verification for issued certificates",
          icon: "bi-patch-check-fill",
          tag: "Verify",
        },
        {
          to: "/courses",
          label: "All Training Programs",
          desc: "View professional diplomas & durations",
          icon: "bi-collection-fill",
          tag: "Courses",
        },
        {
          to: "/teachers",
          label: "Our Expert Faculty",
          desc: "Meet certified mentors and trainers",
          icon: "bi-person-workspace",
          tag: "Mentors",
        },
      ],
    },
  ], []);

  // Tutorials & Roadmaps Items with Categories
  const tutorialsCategories = [
    { id: "all", label: "All Roadmaps", icon: "bi-grid-fill" },
    { id: "programming", label: "Programming", icon: "bi-cpu-fill" },
    { id: "web", label: "Web & Systems", icon: "bi-globe2" },
    { id: "school", label: "School Boards", icon: "bi-mortarboard-fill" },
    { id: "business", label: "Accounts & Data", icon: "bi-briefcase-fill" },
  ];

  const tutorialsItems = useMemo(() => [
    // Programming
    { to: "/javascript/roadmap", label: "JavaScript Roadmap", icon: "bi-filetype-js", category: "programming", color: "text-amber-400 bg-amber-400/10 border-amber-400/20", badge: "Hot", desc: "Core JavaScript, ES6+, Async & DOM" },
    { to: "/python/roadmap", label: "Python Roadmap", icon: "bi-filetype-py", category: "programming", color: "text-sky-400 bg-sky-400/10 border-sky-400/20", badge: "Popular", desc: "Python 3 basics to advanced algorithms" },
    { to: "/machine-learning/roadmap", label: "Machine Learning", icon: "bi-cpu", category: "programming", color: "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20", badge: "AI / ML", desc: "Supervised, unsupervised, regression, classification & neural models" },
    { to: "/c-language/roadmap", label: "C Programming", icon: "bi-filetype-c", category: "programming", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", desc: "Foundational procedural programming & memory" },
    { to: "/dsa/roadmap", label: "Data Structures & Algorithms (C)", icon: "bi-diagram-3-fill", category: "programming", color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", badge: "New / DSA", desc: "Data structures, algorithms & Big-O in C" },
    { to: "/java-core/roadmap", label: "Core Java Roadmap", icon: "bi-cpu", category: "programming", color: "text-orange-400 bg-orange-400/10 border-orange-400/20", badge: "Essential", desc: "OOP, Collections, Multithreading & JVM" },
    { to: "/unix/roadmap", label: "UNIX & Shell", icon: "bi-terminal", category: "programming", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", desc: "Linux commands, pipelines & bash scripting" },
    { to: "/computer-architecture/roadmap", label: "Computer Architecture", icon: "bi-motherboard", category: "programming", color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20", desc: "CPU design, logic gates & memory hierarchies" },

    // Web & Systems
    { to: "/react/roadmap", label: "React Roadmap", icon: "bi-code-slash", category: "web", color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20", badge: "Frontend", desc: "Hooks, state management & SPAs" },
    { to: "/css/roadmap", label: "Modern CSS & Tailwind", icon: "bi-filetype-css", category: "web", color: "text-sky-400 bg-sky-400/10 border-sky-400/20", desc: "Flexbox, CSS Grid, Responsive & TailwindCSS" },
    { to: "/java-web/roadmap", label: "Java Web & Servlets", icon: "bi-globe", category: "web", color: "text-rose-400 bg-rose-400/10 border-rose-400/20", desc: "Servlets, JSP, JDBC & Web APIs" },
    { to: "/rdbms-mysql/roadmap", label: "RDBMS MySQL", icon: "bi-database", category: "web", color: "text-teal-400 bg-teal-400/10 border-teal-400/20", desc: "Relational database schema, SQL & queries" },
    { to: "/network/roadmap", label: "Computer Networks", icon: "bi-diagram-3", category: "web", color: "text-violet-400 bg-violet-400/10 border-violet-400/20", desc: "OSI Model, TCP/IP, DNS, HTTP & security" },
    { to: "/cyber-security/roadmap", label: "Cyber Security", icon: "bi-shield-lock", category: "web", color: "text-red-400 bg-red-400/10 border-red-400/20", desc: "Ethical hacking, encryption & defenses" },
    { to: "/quantitative-analysis/roadmap", label: "Quantitative Analysis", icon: "bi-graph-up-arrow", category: "web", color: "text-purple-400 bg-purple-400/10 border-purple-400/20", desc: "Math, statistics & aptitude problem solving" },
    ...(isDev ? [{ to: "/node/roadmap", label: "Node.js Roadmap", icon: "bi-hdd-network", category: "web", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", badge: "Dev", desc: "Backend runtime, Express & REST APIs" }] : []),

    // School Boards
    { to: "/icse-java-ix/roadmap", label: "ICSE Class 9 Java", icon: "bi-journal-code", category: "school", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", badge: "Class IX", desc: "Complete ICSE 9 syllabus with code samples" },
    { to: "/icse-java-x/roadmap", label: "ICSE Class 10 Java", icon: "bi-journal-code", category: "school", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", badge: "Class X", desc: "Board exam preparation & Java mastery" },
    { to: "/isc-11/roadmap", label: "ISC 11 Computer Sc.", icon: "bi-journal-richtext", category: "school", color: "text-pink-400 bg-pink-400/10 border-pink-400/20", badge: "Class 11", desc: "Boolean algebra, arrays & recursion" },
    { to: "/isc-12/roadmap", label: "ISC 12 Computer Sc.", icon: "bi-journal-richtext", category: "school", color: "text-pink-400 bg-pink-400/10 border-pink-400/20", badge: "Class 12", desc: "Data structures, algorithms & board prep" },
    { to: "/general/roadmap", label: "General Computing", icon: "bi-files", category: "school", color: "text-slate-400 bg-slate-400/10 border-slate-400/20", desc: "Fundamental digital literacy & theory" },

    // Business & Data
    { to: "/tally/roadmap", label: "Tally Prime & GST", icon: "bi-calculator", category: "business", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", badge: "Accounting", desc: "GST invoicing, vouchers & balance sheets" },
    { to: "/excel/roadmap", label: "Advanced Excel", icon: "bi-file-spreadsheet", category: "business", color: "text-green-400 bg-green-400/10 border-green-400/20", badge: "Analytics", desc: "VLOOKUP, Pivot Tables, Formulas & VBA" },
    { to: "/git/roadmap", label: "Git & Version Control", icon: "bi-git", category: "business", color: "text-orange-400 bg-orange-400/10 border-orange-400/20", desc: "Commits, branches, merging & GitHub" },
  ], [isDev]);

  // Filtered tutorials for desktop mega menu
  const filteredTutorials = useMemo(() => {
    return tutorialsItems.filter((item) => {
      const matchCat = tutorialCategoryFilter === "all" || item.category === tutorialCategoryFilter;
      const matchSearch = !tutorialDropdownSearch || item.label.toLowerCase().includes(tutorialDropdownSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [tutorialsItems, tutorialCategoryFilter, tutorialDropdownSearch]);

  // Filtered tutorials for mobile drawer
  const mobileFilteredTutorials = useMemo(() => {
    return tutorialsItems.filter((item) => {
      const matchCat = mobileTutorialCategory === "all" || item.category === mobileTutorialCategory;
      const matchSearch = !mobileSearchQuery || item.label.toLowerCase().includes(mobileSearchQuery.toLowerCase()) || (item.desc && item.desc.toLowerCase().includes(mobileSearchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [tutorialsItems, mobileTutorialCategory, mobileSearchQuery]);

  // Flat Search Index for Command Palette / Quick Search Modal
  const globalSearchIndex = useMemo(() => {
    const list = [
      { to: "/", label: "Home Page", group: "PAGE", desc: "Coder & AccoTax institute overview & intro", icon: "bi-house-door" },
      { to: "/#about", label: "About Institute", group: "SECTION", desc: "Learn about our mission, vision & credentials", icon: "bi-info-circle" },
      { to: "/#courses", label: "Courses & Curricula", group: "SECTION", desc: "Explore diplomas, certificate programs & syllabus", icon: "bi-book" },
      { to: "/#teachers", label: "Faculty & Mentors", group: "SECTION", desc: "Meet our experienced industry instructors", icon: "bi-people" },
      { to: "/#contact", label: "Contact & Location", group: "SECTION", desc: "Get in touch, location map & inquiries", icon: "bi-envelope" },
      { to: "/login", label: "Student & Faculty Login", group: "PORTAL", desc: "Access authenticated student and teacher portal", icon: "bi-box-arrow-in-right" },
    ];

    // Add all tool items
    toolsGroups.forEach((g) => {
      g.items.forEach((item) => {
        list.push({
          to: item.to,
          label: item.label,
          group: "TOOLS",
          desc: item.desc,
          icon: item.icon,
        });
      });
    });

    // Add all tutorial items
    tutorialsItems.forEach((item) => {
      list.push({
        to: item.to,
        label: item.label,
        group: "ROADMAP",
        desc: item.desc || `Interactive roadmap for ${item.label}`,
        icon: item.icon,
      });
    });

    return list;
  }, [toolsGroups, tutorialsItems]);

  // Results of Command Palette
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return globalSearchIndex.slice(0, 8);
    const q = searchQuery.toLowerCase();
    return globalSearchIndex.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        (item.desc && item.desc.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [globalSearchIndex, searchQuery]);

  // Mobile filtered instant search
  const mobileFilteredSearchResults = useMemo(() => {
    if (!mobileSearchQuery.trim()) return [];
    const q = mobileSearchQuery.toLowerCase();
    return globalSearchIndex.filter((item) =>
      item.label.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q) ||
      (item.desc && item.desc.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [globalSearchIndex, mobileSearchQuery]);

  // Close menus
  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const closeEverything = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setSearchModalOpen(false);
    setSearchQuery("");
    setMobileSearchQuery("");
    setTutorialDropdownSearch("");
  };

  // Toggle Dropdown helper
  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  // Keyboard shortcut listener (Escape to close, Ctrl+K / Cmd+K to open search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
        closeAllDropdowns();
      }
      if (e.key === "Escape") {
        closeEverything();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus search input when modal opens
  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      setSelectedSearchIndex(0);
    }
  }, [searchModalOpen]);

  // Lock body scroll on mobile menu or search modal open
  useEffect(() => {
    if (mobileMenuOpen || searchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, searchModalOpen]);

  // Check active routes for tools and tutorials
  const isToolsActive = useMemo(() => {
    const paths = ["/tools", "/python-play", "/play", "/vscode", "/whiteBoard", "/qrcode", "/icons", "/LinkedListVisualizer", "/DoublyLinkedListVisualizer", "/BinaryTreeVisualizer", "/AvlTreeVisualizer", "/certificates"];
    return paths.some((p) => location.pathname.startsWith(p));
  }, [location.pathname]);

  const isTutorialsActive = useMemo(() => {
    return location.pathname.includes("/roadmap") || location.pathname.includes("/module/") || location.pathname.includes("/topic/");
  }, [location.pathname]);

  return (
    <>
      <header
        ref={navContainerRef}
        className="w-full bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl shadow-black/50 transition-all duration-300 relative select-none"
      >
        {/* Top glowing ambient accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 opacity-90" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="w-full flex items-center justify-between h-14">
            
            {/* 1. BRAND & LOGO */}
            <div className="flex items-center gap-2 sm:gap-6">
              <NavLink
                to="/"
                onClick={closeEverything}
                className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 opacity-30 group-hover:opacity-75 blur transition duration-300" />
                  <img
                    src={cnat}
                    alt="Coder & AccoTax"
                    className="relative w-8 h-8 sm:w-9 sm:h-9 object-contain transform group-hover:scale-105 transition duration-200"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm sm:text-base font-extrabold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                      Coder<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">&</span>AccoTax
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ISO 9001:2015
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider hidden md:block -mt-0.5">
                    Premier Coding & IT Training Institute
                  </span>
                </div>
              </NavLink>
            </div>

            {/* 2. DESKTOP NAVIGATION TABS */}
            <nav className="hidden lg:flex items-center gap-1 text-xs sm:text-sm font-medium">
              
              {/* HOME / SECTION LINKS */}
              {!isHome && (
                <NavLink
                  to="/"
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? "text-sky-300 bg-sky-500/15 border border-sky-500/30 shadow-sm shadow-sky-500/10 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent"
                    }`
                  }
                >
                  <i className="bi bi-house-door text-sky-400 text-sm"></i>
                  <span>Home</span>
                </NavLink>
              )}

              {isHome && (
                <>
                  <HashLink
                    smooth
                    to="/#about"
                    onClick={closeAllDropdowns}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all duration-200 ${
                      activeHash === "#about"
                        ? "text-sky-300 bg-sky-500/15 border border-sky-500/30 shadow-sm shadow-sky-500/10 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent"
                    }`}
                  >
                    <i className="bi bi-info-circle text-sky-400 text-xs"></i>
                    <span>About</span>
                  </HashLink>

                  <HashLink
                    smooth
                    to="/#courses"
                    onClick={closeAllDropdowns}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all duration-200 ${
                      activeHash === "#courses"
                        ? "text-sky-300 bg-sky-500/15 border border-sky-500/30 shadow-sm shadow-sky-500/10 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent"
                    }`}
                  >
                    <i className="bi bi-book text-sky-400 text-xs"></i>
                    <span>Courses</span>
                  </HashLink>

                  <HashLink
                    smooth
                    to="/#teachers"
                    onClick={closeAllDropdowns}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all duration-200 ${
                      activeHash === "#teachers"
                        ? "text-sky-300 bg-sky-500/15 border border-sky-500/30 shadow-sm shadow-sky-500/10 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent"
                    }`}
                  >
                    <i className="bi bi-people text-sky-400 text-xs"></i>
                    <span>Teachers</span>
                  </HashLink>

                  <HashLink
                    smooth
                    to="/#contact"
                    onClick={closeAllDropdowns}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all duration-200 ${
                      activeHash === "#contact"
                        ? "text-sky-300 bg-sky-500/15 border border-sky-500/30 shadow-sm shadow-sky-500/10 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent"
                    }`}
                  >
                    <i className="bi bi-envelope text-sky-400 text-xs"></i>
                    <span>Contact</span>
                  </HashLink>
                </>
              )}

              {/* TOOLS MEGA MENU */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("tools")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                    activeDropdown === "tools" || isToolsActive
                      ? "text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 shadow-sm shadow-cyan-500/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent"
                  }`}
                  aria-expanded={activeDropdown === "tools"}
                >
                  <i className="bi bi-tools text-cyan-400 text-sm"></i>
                  <span>Tools & Visualizers</span>
                  <i
                    className={`bi bi-chevron-down text-[10px] text-slate-400 transition-transform duration-200 ${
                      activeDropdown === "tools" ? "rotate-180 text-cyan-400" : ""
                    }`}
                  ></i>
                </button>

                {/* Tools Mega Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === "tools" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[820px] bg-slate-900/98 backdrop-blur-2xl border border-slate-800/90 rounded-2xl shadow-2xl shadow-black/80 p-4 z-50 ring-1 ring-white/10"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 px-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50"></span>
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Interactive Compilers, Visualizers & Academic Utilities
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/60">
                          {toolsGroups.reduce((acc, g) => acc + g.items.length, 0)} Utilities Ready
                        </span>
                      </div>

                      {/* 4-Column Grid */}
                      <div className="grid grid-cols-4 gap-3">
                        {toolsGroups.map((group) => (
                          <div key={group.id} className="space-y-1.5">
                            <div className="flex items-center gap-1.5 px-1 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                              <i className={`bi ${group.icon} text-cyan-400`}></i>
                              <span className="truncate">{group.title}</span>
                            </div>

                            <div className="space-y-1">
                              {group.items.map((item) => (
                                <NavLink
                                  key={item.to}
                                  to={item.to}
                                  onClick={closeAllDropdowns}
                                  className={({ isActive }) =>
                                    `group/tool flex items-start gap-2 p-2 rounded-xl transition-all duration-150 ${
                                      isActive
                                        ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30"
                                        : "hover:bg-slate-800/80 text-slate-300 hover:text-white border border-transparent"
                                    }`
                                  }
                                >
                                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover/tool:border-cyan-500/40 group-hover/tool:text-cyan-300 group-hover/tool:scale-105 transition">
                                    <i className={`bi ${item.icon} text-xs`}></i>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[11px] font-semibold truncate group-hover/tool:text-cyan-300 transition">
                                        {item.label}
                                      </span>
                                    </div>
                                    <p className="text-[9px] text-slate-400 line-clamp-1 group-hover/tool:text-slate-300 transition">
                                      {item.desc}
                                    </p>
                                  </div>
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Footer */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 px-2">
                        <span className="flex items-center gap-1.5">
                          <i className="bi bi-cpu text-cyan-400"></i>
                          Live client-side interpreters & interactive data structures
                        </span>
                        <div className="flex items-center gap-2">
                          <NavLink
                            to="/whiteBoard"
                            onClick={closeAllDropdowns}
                            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 hover:underline text-xs"
                          >
                            <i className="bi bi-easel2"></i>
                            <span>Open Whiteboard</span>
                          </NavLink>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TUTORIALS MEGA MENU */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("tutorials")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
                    activeDropdown === "tutorials" || isTutorialsActive
                      ? "text-purple-300 bg-purple-500/15 border border-purple-500/30 shadow-sm shadow-purple-500/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent"
                  }`}
                  aria-expanded={activeDropdown === "tutorials"}
                >
                  <i className="bi bi-journal-bookmark-fill text-purple-400 text-sm"></i>
                  <span>Tutorials & Roadmaps</span>
                  <i
                    className={`bi bi-chevron-down text-[10px] text-slate-400 transition-transform duration-200 ${
                      activeDropdown === "tutorials" ? "rotate-180 text-purple-400" : ""
                    }`}
                  ></i>
                </button>

                {/* Tutorials Mega Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === "tutorials" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-2/3 top-full mt-2 w-[760px] bg-slate-900/98 backdrop-blur-2xl border border-slate-800/90 rounded-2xl shadow-2xl shadow-black/80 p-4 z-50 ring-1 ring-white/10"
                    >
                      {/* Top Search & Filter Bar */}
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-3">
                        {/* Category filter pills */}
                        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                          {tutorialsCategories.map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setTutorialCategoryFilter(cat.id)}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                                tutorialCategoryFilter === cat.id
                                  ? "bg-purple-600 text-white shadow-sm shadow-purple-500/20"
                                  : "text-slate-400 hover:text-white hover:bg-slate-800"
                              }`}
                            >
                              <i className={`bi ${cat.icon} text-[10px]`}></i>
                              <span>{cat.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Dropdown in-line Search */}
                        <div className="relative w-44 flex-shrink-0">
                          <i className="bi bi-search absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
                          <input
                            type="text"
                            value={tutorialDropdownSearch}
                            onChange={(e) => setTutorialDropdownSearch(e.target.value)}
                            placeholder="Filter roadmaps..."
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-7 pr-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                          />
                        </div>
                      </div>

                      {/* Tutorials Grid */}
                      <div className="max-h-[360px] overflow-y-auto pr-1 grid grid-cols-3 gap-2">
                        {filteredTutorials.length === 0 ? (
                          <div className="col-span-3 py-8 text-center text-slate-500 text-xs">
                            <i className="bi bi-search text-lg block mb-1"></i>
                            No roadmaps matching "{tutorialDropdownSearch}"
                          </div>
                        ) : (
                          filteredTutorials.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              onClick={closeAllDropdowns}
                              className={({ isActive }) =>
                                `group/tut flex items-center justify-between p-2.5 rounded-xl border transition-all duration-150 ${
                                  isActive
                                    ? "bg-purple-500/20 text-purple-200 border-purple-500/30"
                                    : "bg-slate-950/40 hover:bg-slate-800/80 text-slate-300 hover:text-white border-slate-800/60 hover:border-purple-500/30"
                                }`
                              }
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm border ${item.color} group-hover/tut:scale-105 transition`}>
                                  <i className={`bi ${item.icon}`}></i>
                                </div>
                                <span className="text-xs font-semibold truncate group-hover/tut:text-purple-300 transition">
                                  {item.label}
                                </span>
                              </div>
                              {item.badge && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded-md font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex-shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </NavLink>
                          ))
                        )}
                      </div>

                      {/* Bottom Info */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 px-2">
                        <span className="flex items-center gap-1.5">
                          <i className="bi bi-patch-check-fill text-purple-400"></i>
                          Free Step-by-Step Curriculum & Interactive Roadmaps
                        </span>
                        <span className="text-slate-400">
                          Showing {filteredTutorials.length} Roadmaps
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </nav>

            {/* 3. RIGHT CONTROLS: SEARCH SPOTLIGHT & LOGIN BUTTON */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* SPOTLIGHT / COMMAND SEARCH BUTTON */}
              <button
                type="button"
                onClick={() => {
                  setSearchModalOpen(true);
                  closeAllDropdowns();
                }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition shadow-sm hover:shadow group cursor-pointer"
                title="Search courses & roadmaps (Ctrl+K)"
              >
                <i className="bi bi-search text-slate-400 group-hover:text-sky-400 transition-colors"></i>
                <span className="text-slate-400 group-hover:text-slate-300">Quick Jump...</span>
                <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-800 rounded border border-slate-700/60 shadow-xs">
                  ⌘K
                </kbd>
              </button>

              {/* LOGIN BUTTON (DESKTOP) */}
              <NavLink
                to="/login"
                onClick={closeAllDropdowns}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <i className="bi bi-box-arrow-in-right text-sm"></i>
                <span>Portal Login</span>
              </NavLink>

              {/* MOBILE SEARCH & HAMBURGER TOGGLE */}
              <div className="flex items-center gap-1 lg:hidden">
                <button
                  type="button"
                  onClick={() => setSearchModalOpen(true)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
                  aria-label="Search"
                >
                  <i className="bi bi-search text-sm"></i>
                </button>

                <NavLink
                  to="/login"
                  className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-semibold shadow-sm"
                >
                  Login
                </NavLink>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex items-center gap-1 p-2 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 hover:text-white focus:outline-none cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  <i className="bi bi-list text-lg"></i>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Horizontal Quick Section Strip (Visible on mobile screens) */}
        <div className="lg:hidden flex items-center gap-1 px-3 py-1.5 bg-slate-950 border-t border-slate-800/80 overflow-x-auto text-[11px] font-medium text-slate-400">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap transition ${
                isActive && !location.hash ? "bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30" : "hover:text-white hover:bg-slate-900"
              }`
            }
          >
            <i className="bi bi-house-door text-sky-400"></i>
            <span>Home</span>
          </NavLink>

          <button
            type="button"
            onClick={() => {
              setMobileTab("explore");
              setMobileMenuOpen(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap hover:text-white hover:bg-slate-900 transition cursor-pointer"
          >
            <i className="bi bi-info-circle text-sky-400"></i>
            <span>About</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileTab("tools");
              setMobileMenuOpen(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap hover:text-white hover:bg-slate-900 transition cursor-pointer"
          >
            <i className="bi bi-tools text-cyan-400"></i>
            <span>Tools</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileTab("tutorials");
              setMobileMenuOpen(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap hover:text-white hover:bg-slate-900 transition cursor-pointer"
          >
            <i className="bi bi-journal-bookmark-fill text-purple-400"></i>
            <span>Roadmaps</span>
          </button>

          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg whitespace-nowrap text-slate-400 hover:text-white ml-auto"
          >
            <i className="bi bi-search text-xs"></i>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 4. COMMAND PALETTE / GLOBAL SEARCH SPOTLIGHT MODAL (Ctrl+K) */}
      {/* Portaled directly to document.body */}
      {/* ========================================================================= */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {searchModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 px-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                onClick={() => setSearchModalOpen(false)}
              />

              {/* Spotlight Modal Box */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-xl bg-slate-900/98 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl shadow-black p-4 z-10 ring-1 ring-sky-500/30"
              >
                {/* Search Bar Input */}
                <div className="relative flex items-center mb-3">
                  <i className="bi bi-search absolute left-3 text-sky-400 text-base"></i>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedSearchIndex(0);
                    }}
                    placeholder="Search courses, roadmaps, compilers, visualizers..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/70 shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 text-slate-400 hover:text-white"
                    >
                      <i className="bi bi-x-circle-fill"></i>
                    </button>
                  )}
                </div>

                {/* Quick Results List */}
                <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
                  {searchResults.length === 0 ? (
                    <div className="py-10 text-center text-slate-500 text-sm">
                      <i className="bi bi-search text-2xl block mb-2 opacity-50"></i>
                      No navigation links found matching "{searchQuery}"
                    </div>
                  ) : (
                    searchResults.map((item, idx) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => {
                          setSearchModalOpen(false);
                          setSearchQuery("");
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-150 ${
                          idx === selectedSearchIndex
                            ? "bg-sky-500/20 text-white border-sky-500/40 shadow-sm"
                            : "bg-slate-950/40 text-slate-300 hover:bg-slate-800/80 hover:text-white border-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-sky-400 text-sm flex-shrink-0">
                            <i className={`bi ${item.icon}`}></i>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold truncate text-white">{item.label}</p>
                            {item.desc && (
                              <p className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</p>
                            )}
                          </div>
                        </div>

                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700/60 flex-shrink-0 ml-2">
                          {item.group}
                        </span>
                      </NavLink>
                    ))
                  )}
                </div>

                {/* Footer instructions */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">ESC</kbd> to close
                  </span>
                  <span>Press item to navigate immediately</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ========================================================================= */}
      {/* 5. NEXT-LEVEL RICH MOBILE DRAWER NAVIGATION (SLIDE OVER FROM RIGHT) */}
      {/* Portaled directly to document.body */}
      {/* ========================================================================= */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[99999] lg:hidden flex justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Slide-out Menu Panel */}
              <motion.div
                ref={mobileMenuRef}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative h-dvh w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col overflow-hidden z-10"
              >
                {/* Drawer Top Header: Brand & Certified info */}
                <div className="p-4 border-b border-slate-800/80 bg-slate-950/90">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={cnat} alt="Coder & AccoTax" className="w-9 h-9 object-contain" />
                      <div>
                        <p className="text-sm font-bold text-white">Coder & AccoTax</p>
                        <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          ISO 9001:2015 Certified
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                      aria-label="Close navigation"
                    >
                      <i className="bi bi-x-lg text-lg"></i>
                    </button>
                  </div>

                  {/* Mobile Tab Switcher */}
                  <div className="flex items-center gap-1 mt-3 p-1 bg-slate-900 rounded-xl border border-slate-800/80 overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setMobileTab("all")}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        mobileTab === "all"
                          ? "bg-sky-500 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      All Sections
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileTab("explore")}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        mobileTab === "explore"
                          ? "bg-sky-500 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Institute
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileTab("tools")}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        mobileTab === "tools"
                          ? "bg-cyan-500 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Tools
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileTab("tutorials")}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                        mobileTab === "tutorials"
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Roadmaps
                    </button>
                  </div>
                </div>

                {/* Mobile Search input */}
                <div className="p-3 border-b border-slate-800/80 bg-slate-950/60">
                  <div className="relative">
                    <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input
                      type="text"
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                      placeholder="Search courses, roadmaps, compilers..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/60"
                    />
                    {mobileSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setMobileSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                      >
                        <i className="bi bi-x-circle-fill"></i>
                      </button>
                    )}
                  </div>

                  {/* Instant Search Results Box on Mobile */}
                  {mobileFilteredSearchResults.length > 0 && (
                    <div className="mt-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800 max-h-56 overflow-y-auto space-y-1">
                      <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Matching Results ({mobileFilteredSearchResults.length})
                      </div>
                      {mobileFilteredSearchResults.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-700"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <i className={`bi ${item.icon} text-sky-400 text-sm`}></i>
                            <div className="min-w-0">
                              <p className="font-semibold truncate text-white">{item.label}</p>
                              {item.desc && <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>}
                            </div>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {item.group}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>

                {/* Scrollable Navigation Body */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
                  
                  {/* 1. EXPLORE & INSTITUTE SECTIONS */}
                  {(mobileTab === "all" || mobileTab === "explore") && (
                    <div className="space-y-1.5">
                      <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Institute Navigation</p>
                      
                      <NavLink
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between p-3 rounded-2xl border transition-all duration-150 ${
                            isActive && !location.hash
                              ? "bg-sky-500/20 text-white border-sky-500/40 shadow-sm"
                              : "bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:text-white border-slate-800/80"
                          }`
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-base">
                            <i className="bi bi-house-door"></i>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">Home Page</p>
                            <p className="text-[10px] text-slate-400">Welcome to Coder & AccoTax</p>
                          </div>
                        </div>
                        <i className="bi bi-chevron-right text-slate-500 text-xs"></i>
                      </NavLink>

                      {/* Quick Section Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <HashLink
                          smooth
                          to="/#about"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-sky-400">
                            <i className="bi bi-info-circle"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">About Us</p>
                            <p className="text-[9px] text-slate-400">Our Story</p>
                          </div>
                        </HashLink>

                        <HashLink
                          smooth
                          to="/#courses"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-sky-400">
                            <i className="bi bi-book"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Courses</p>
                            <p className="text-[9px] text-slate-400">Programs</p>
                          </div>
                        </HashLink>

                        <HashLink
                          smooth
                          to="/#teachers"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-sky-400">
                            <i className="bi bi-people"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Faculty</p>
                            <p className="text-[9px] text-slate-400">Instructors</p>
                          </div>
                        </HashLink>

                        <HashLink
                          smooth
                          to="/#contact"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-sky-400">
                            <i className="bi bi-envelope"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Contact</p>
                            <p className="text-[9px] text-slate-400">Location</p>
                          </div>
                        </HashLink>
                      </div>
                    </div>
                  )}

                  {/* 2. TOOLS SECTION (CARDS & GROUPS) */}
                  {(mobileTab === "all" || mobileTab === "tools") && (
                    <div className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-950/40">
                      <button
                        type="button"
                        onClick={() => setMobileActiveAccordion(mobileActiveAccordion === "tools" ? null : "tools")}
                        className="w-full flex items-center justify-between p-3 text-xs font-bold text-slate-200 hover:bg-slate-800/60 transition cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                            <i className="bi bi-tools text-xs"></i>
                          </span>
                          <span>Online Tools & Visualizers</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-500/20">
                            {toolsGroups.reduce((acc, g) => acc + g.items.length, 0)} Items
                          </span>
                          <i
                            className={`bi bi-chevron-down text-slate-400 transition-transform ${
                              mobileActiveAccordion === "tools" || mobileTab === "tools" ? "rotate-180 text-cyan-400" : ""
                            }`}
                          ></i>
                        </div>
                      </button>

                      {(mobileActiveAccordion === "tools" || mobileTab === "tools") && (
                        <div className="border-t border-slate-800/80 bg-slate-950/90 p-2.5 space-y-3">
                          {toolsGroups.map((group) => (
                            <div key={group.id} className="space-y-1.5">
                              <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                <i className={`bi ${group.icon} text-cyan-400`}></i>
                                <span>{group.title}</span>
                              </div>

                              <div className="space-y-1">
                                {group.items.map((item) => (
                                  <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                      `group flex items-start gap-2.5 p-2.5 rounded-xl transition border ${
                                        isActive
                                          ? "bg-cyan-500/20 text-cyan-200 border-cyan-500/30"
                                          : "bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800/60"
                                      }`
                                    }
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                                      <i className={`bi ${item.icon} text-sm`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold truncate text-white">{item.label}</p>
                                        {item.tag && (
                                          <span className="text-[9px] px-1.5 py-0.2 rounded font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                            {item.tag}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</p>
                                    </div>
                                  </NavLink>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. TUTORIALS SECTION (CATEGORIZED WITH FILTER TABS) */}
                  {(mobileTab === "all" || mobileTab === "tutorials") && (
                    <div className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-950/40">
                      <button
                        type="button"
                        onClick={() => setMobileActiveAccordion(mobileActiveAccordion === "tutorials" ? null : "tutorials")}
                        className="w-full flex items-center justify-between p-3 text-xs font-bold text-slate-200 hover:bg-slate-800/60 transition cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                            <i className="bi bi-journal-bookmark-fill text-xs"></i>
                          </span>
                          <span>Tutorials & Roadmaps</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/15 px-2 py-0.5 rounded-full border border-purple-500/20">
                            {tutorialsItems.length} Tracks
                          </span>
                          <i
                            className={`bi bi-chevron-down text-slate-400 transition-transform ${
                              mobileActiveAccordion === "tutorials" || mobileTab === "tutorials" ? "rotate-180 text-purple-400" : ""
                            }`}
                          ></i>
                        </div>
                      </button>

                      {(mobileActiveAccordion === "tutorials" || mobileTab === "tutorials") && (
                        <div className="border-t border-slate-800/80 bg-slate-950/90 p-2.5 space-y-2.5">
                          {/* Mobile category pills */}
                          <div className="flex items-center gap-1 overflow-x-auto pb-1">
                            {tutorialsCategories.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => setMobileTutorialCategory(cat.id)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
                                  mobileTutorialCategory === cat.id
                                    ? "bg-purple-600 text-white shadow-sm"
                                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                                }`}
                              >
                                <i className={`bi ${cat.icon} text-[10px]`}></i>
                                <span>{cat.label}</span>
                              </button>
                            ))}
                          </div>

                          {/* Mobile Roadmap Cards List */}
                          <div className="space-y-1.5 max-h-96 overflow-y-auto pr-0.5">
                            {mobileFilteredTutorials.map((item) => (
                              <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                  `flex items-center justify-between p-2.5 rounded-xl border transition ${
                                    isActive
                                      ? "bg-purple-500/20 text-purple-200 border-purple-500/30"
                                      : "bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800/60"
                                  }`
                                }
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border ${item.color} flex-shrink-0`}>
                                    <i className={`bi ${item.icon}`}></i>
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold truncate text-white">{item.label}</p>
                                    {item.desc && <p className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</p>}
                                  </div>
                                </div>
                                {item.badge && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex-shrink-0 ml-1">
                                    {item.badge}
                                  </span>
                                )}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Drawer Bottom Action: Login Button */}
                <div className="p-4 border-t border-slate-800/80 bg-slate-950/90 space-y-2">
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-sky-500/25 transition cursor-pointer"
                  >
                    <i className="bi bi-box-arrow-in-right text-sm"></i>
                    <span>Portal Login (Students & Faculty)</span>
                  </NavLink>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default NavBar;