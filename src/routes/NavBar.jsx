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

  // Validity of Bijoya guest registration link: upto 1st November 2026 23:59:59 IST
  const isBijoyaValid = useMemo(() => {
    const expiryDate = new Date("2026-11-01T23:59:59.999+05:30");
    return new Date() <= expiryDate;
  }, []);

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
          to: "/tools/wampserver-guide",
          label: "WampServer & VC++ Guide",
          desc: "Bilingual step-by-step WAMP 3.4.0 & VC++ installer guide",
          icon: "bi-server",
          tag: "Guide",
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
          to: "/tools/screen-recorder",
          label: "CNAT Screen Recorder",
          desc: "Download Windows screen & audio recorder software (.EXE)",
          icon: "bi-camera-video-fill",
          tag: "Desktop App",
        },
        {
          to: "/tools/image-compressor",
          label: "Image Compressor & Resizer",
          desc: "Compress pictures to desired size (KB/MB) & resolution",
          icon: "bi-file-earmark-image",
          tag: "Optimizer",
        },
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
          to: "/student-course-qr",
          label: "Student Course QR",
          desc: "Generate student fee QR & WhatsApp advice",
          icon: "bi-qr-code",
          tag: "Admission",
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
    { to: "/information-technology-802/roadmap", label: "CBSE IT (802) Class 11-12", icon: "bi-laptop", category: "school", color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20", badge: "Code 802", desc: "RDBMS, Java, Swing GUI, JDBC, Web Apps & Projects" },
    { to: "/english-grammar/roadmap", label: "English Grammar", icon: "bi-book", category: "school", color: "text-teal-400 bg-teal-400/10 border-teal-400/20", badge: "Master", desc: "Foundations, concord, tenses, voice, speech & composition" },
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

  // About & Institutional Navigation Items (Landing Page Sections & Verifications)
  const aboutNavItems = useMemo(() => [
    {
      to: "/#about",
      isHash: true,
      label: "About Institute",
      desc: "Story, mission & ISO 9001:2015 credentials",
      icon: "bi-building",
      tag: "Since 1998",
      color: "from-sky-500/20 to-blue-500/10 text-sky-400 border-sky-500/30",
    },
    {
      to: "/#fees",
      isHash: true,
      label: "Pay Fees Online",
      desc: "Instant 0% fee UPI payment & dynamic QR",
      icon: "bi-qr-code-scan",
      tag: "Instant UPI",
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      to: "/#teachers",
      isHash: true,
      label: "Our Faculty",
      desc: "Meet certified mentors & industry trainers",
      icon: "bi-people-fill",
      tag: "Mentors",
      color: "from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30",
    },
    {
      to: "/#why-choose-us",
      isHash: true,
      label: "Why Choose Us",
      desc: "Key advantages & verified Google reviews",
      icon: "bi-star-fill",
      tag: "4.9 ★",
      color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
    },
    {
      to: "/certificates",
      isHash: false,
      label: "Verify Certificate",
      desc: "Instant verification for issued diplomas",
      icon: "bi-patch-check-fill",
      tag: "Verify",
      color: "from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30",
    },
    {
      to: "/#contact",
      isHash: true,
      label: "Contact & Desk",
      desc: "Barrackpore campus map & direct helpline",
      icon: "bi-geo-alt-fill",
      tag: "Help Desk",
      color: "from-rose-500/20 to-orange-500/10 text-rose-400 border-rose-500/30",
    },
  ], []);

  // Flat Search Index for Command Palette / Quick Search Modal
  const globalSearchIndex = useMemo(() => {
    const list = [
      { to: "/", label: "Home Page", group: "PAGE", desc: "Coder & AccoTax institute overview & intro", icon: "bi-house-door" },
      { to: "/#about", label: "About Institute", group: "SECTION", desc: "Learn about our mission, vision & credentials", icon: "bi-info-circle" },
      { to: "/#fees", label: "Pay Fees Online (UPI QR)", group: "PAYMENT", desc: "Instant UPI course fee payment & receipt generation", icon: "bi-wallet2" },
      { to: "/#why-choose-us", label: "Why Choose Us & Reviews", group: "SECTION", desc: "28+ years legacy, student feedback & Google reviews", icon: "bi-star-fill" },
      { to: "/#courses", label: "Courses & Curricula", group: "SECTION", desc: "Explore diplomas, certificate programs & syllabus", icon: "bi-book" },
      { to: "/#teachers", label: "Faculty & Mentors", group: "SECTION", desc: "Meet our experienced industry instructors", icon: "bi-people" },
      { to: "/certificates", label: "Certificate Verification", group: "VERIFY", desc: "Online verification for official certificates", icon: "bi-patch-check-fill" },
      { to: "/#contact", label: "Contact & Location", group: "SECTION", desc: "Get in touch, location map & inquiries", icon: "bi-envelope" },
      { to: "/login", label: "Student & Faculty Login", group: "PORTAL", desc: "Access authenticated student and teacher portal", icon: "bi-box-arrow-in-right" },
      ...(isBijoyaValid
        ? [
            {
              to: "/bijoya",
              label: "Bijoya 2026 - Maitri Mahotsav Guest Registration",
              group: "EVENT",
              desc: "Official guest registration for 27th Maitri Mahotsav (Valid upto 1 Nov 2026)",
              icon: "bi-stars",
            },
          ]
        : []),
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
  }, [toolsGroups, tutorialsItems, isBijoyaValid]);

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

  // Check active routes for tools, tutorials, and about
  const isToolsActive = useMemo(() => {
    const paths = ["/tools", "/screen-recorder", "/python-play", "/play", "/vscode", "/whiteBoard", "/qrcode", "/icons", "/LinkedListVisualizer", "/DoublyLinkedListVisualizer", "/BinaryTreeVisualizer", "/AvlTreeVisualizer", "/wampserver-guide", "/wamp", "/student-course-qr"];
    return paths.some((p) => location.pathname.startsWith(p));
  }, [location.pathname]);

  const isTutorialsActive = useMemo(() => {
    return location.pathname.includes("/roadmap") || location.pathname.includes("/module/") || location.pathname.includes("/topic/");
  }, [location.pathname]);

  const isAboutActive = useMemo(() => {
    return (
      (isHome && (
        activeHash === "#about" ||
        activeHash === "#fees" ||
        activeHash === "#payment" ||
        activeHash === "#teachers" ||
        activeHash === "#why-choose-us" ||
        activeHash === "#advantages" ||
        activeHash === "#reviews" ||
        activeHash === "#contact"
      )) ||
      location.pathname === "/certificates" ||
      location.pathname === "/teachers"
    );
  }, [isHome, activeHash, location.pathname]);

  return (
    <>
      <header
        ref={navContainerRef}
        className="w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 shadow-sm shadow-black/20 transition-all duration-300 relative select-none"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="w-full flex items-center justify-between h-14">
            
            {/* 1. BRAND & LOGO */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <NavLink
                to="/"
                onClick={closeEverything}
                className="flex items-center gap-2.5 group focus:outline-none"
              >
                <div className="relative flex items-center justify-center">
                  <img
                    src={cnat}
                    alt="Coder & AccoTax"
                    className="w-8 h-8 sm:w-8.5 sm:h-8.5 object-contain transform group-hover:scale-105 transition duration-200"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                      Coder<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">&</span>AccoTax
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      ISO 9001
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider hidden 2xl:block -mt-0.5">
                    Premier Coding & IT Institute
                  </span>
                </div>
              </NavLink>
            </div>

            {/* 2. DESKTOP NAVIGATION TABS */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium">
              
              {/* Courses Direct Link */}
              <HashLink
                smooth
                to="/#courses"
                onClick={closeAllDropdowns}
                className={`px-3 py-1.5 rounded-lg transition-colors duration-150 ${
                  isHome && activeHash === "#courses"
                    ? "text-sky-400 font-semibold bg-sky-500/10"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                Courses
              </HashLink>

              {/* TOOLS MEGA MENU */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("tools")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-colors duration-150 cursor-pointer ${
                    activeDropdown === "tools" || isToolsActive
                      ? "text-cyan-400 font-semibold bg-cyan-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                  aria-expanded={activeDropdown === "tools"}
                >
                  <span>Tools</span>
                  <i
                    className={`bi bi-chevron-down text-[9px] text-slate-400 transition-transform duration-200 ${
                      activeDropdown === "tools" ? "rotate-180 text-cyan-400" : ""
                    }`}
                  ></i>
                </button>

                {/* Tools Mega Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === "tools" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[800px] bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 p-4 z-50 ring-1 ring-white/10"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-3 px-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                            Interactive Compilers, Visualizers &amp; Utilities
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
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-1">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <i className="bi bi-cpu text-cyan-400"></i>
                          Live client-side interpreters &amp; interactive visualizers
                        </span>
                        <NavLink
                          to="/whiteBoard"
                          onClick={closeAllDropdowns}
                          className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 hover:underline text-xs"
                        >
                          <i className="bi bi-easel2"></i>
                          <span>Open Whiteboard</span>
                        </NavLink>
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
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-colors duration-150 cursor-pointer ${
                    activeDropdown === "tutorials" || isTutorialsActive
                      ? "text-purple-400 font-semibold bg-purple-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                  aria-expanded={activeDropdown === "tutorials"}
                >
                  <span>Tutorials</span>
                  <i
                    className={`bi bi-chevron-down text-[9px] text-slate-400 transition-transform duration-200 ${
                      activeDropdown === "tutorials" ? "rotate-180 text-purple-400" : ""
                    }`}
                  ></i>
                </button>

                {/* Tutorials Mega Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === "tutorials" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-2/3 top-full mt-2 w-[760px] bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 p-4 z-50 ring-1 ring-white/10"
                    >
                      {/* Top Search & Filter Bar */}
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800 mb-3">
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
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-1">
                        <span className="flex items-center gap-1.5">
                          <i className="bi bi-patch-check-fill text-purple-400"></i>
                          Free Step-by-Step Curriculum &amp; Interactive Roadmaps
                        </span>
                        <span className="text-slate-400">
                          Showing {filteredTutorials.length} Roadmaps
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ABOUT INSTITUTE DROPDOWN */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown("about")}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors duration-150 cursor-pointer ${
                    activeDropdown === "about" || isAboutActive
                      ? "text-sky-400 font-semibold bg-sky-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                  aria-expanded={activeDropdown === "about"}
                >
                  <span>About</span>
                  <i
                    className={`bi bi-chevron-down text-[9px] text-slate-400 transition-transform duration-200 ${
                      activeDropdown === "about" ? "rotate-180 text-sky-400" : ""
                    }`}
                  ></i>
                </button>

                {/* About Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === "about" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[520px] bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 p-3.5 z-50 ring-1 ring-white/10"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-2.5 px-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                            Institute &amp; Student Services
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium flex items-center gap-1">
                          <i className="bi bi-shield-check"></i>
                          ISO 9001:2015 Certified
                        </span>
                      </div>

                      {/* 2-Column Grid */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {aboutNavItems.map((item) => {
                          const LinkComp = item.isHash ? HashLink : NavLink;
                          return (
                            <LinkComp
                              key={item.to}
                              smooth={item.isHash ? true : undefined}
                              to={item.to}
                              onClick={closeAllDropdowns}
                              className="group flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/40 hover:bg-slate-800/80 border border-slate-800/60 hover:border-slate-700 transition-all duration-150"
                            >
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} border flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition mt-0.5`}>
                                <i className={`bi ${item.icon} text-sm`}></i>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <p className="text-xs font-semibold text-white group-hover:text-sky-300 transition truncate">
                                    {item.label}
                                  </p>
                                  {item.tag && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded font-medium bg-slate-800 text-slate-400 border border-slate-700/60 flex-shrink-0">
                                      {item.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-400 line-clamp-1 group-hover:text-slate-300 transition mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </LinkComp>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-1">
                        <span className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                          <i className="bi bi-geo-alt-fill text-sky-400"></i>
                          4 No Platform, Barrackpore Stn
                        </span>
                        <HashLink
                          smooth
                          to="/#fees"
                          onClick={closeAllDropdowns}
                          className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 hover:underline text-[11px]"
                        >
                          <i className="bi bi-qr-code"></i>
                          <span>Pay Fees Online</span>
                        </HashLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SPECIAL FESTIVE LINK: BIJOYA 2026 */}
              {isBijoyaValid && (
                <NavLink
                  to="/bijoya"
                  onClick={closeAllDropdowns}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? "text-amber-200 bg-amber-500/25 border border-amber-400/40 shadow-sm shadow-amber-500/10"
                        : "text-amber-300 hover:text-amber-100 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20"
                    }`
                  }
                >
                  <span>🌸</span>
                  <span>Bijoya 2026</span>
                </NavLink>
              )}
            </nav>

            {/* 3. RIGHT CONTROLS: SEARCH & SIGN IN BUTTON */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* SPOTLIGHT SEARCH BUTTON */}
              <button
                type="button"
                onClick={() => {
                  setSearchModalOpen(true);
                  closeAllDropdowns();
                }}
                className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/70 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition cursor-pointer"
                title="Search courses &amp; roadmaps (Ctrl+K)"
              >
                <i className="bi bi-search text-xs"></i>
                <span className="hidden xl:inline text-slate-400">Quick Jump...</span>
                <kbd className="inline-flex items-center px-1.5 py-0.2 text-[10px] font-semibold text-slate-400 bg-slate-800/80 rounded border border-slate-700/60">
                  ⌘K
                </kbd>
              </button>

              {/* LOGIN / SIGN IN BUTTON (DESKTOP) */}
              <NavLink
                to="/login"
                onClick={closeAllDropdowns}
                title="Portal Sign In"
                aria-label="Portal Sign In"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold shadow-sm transition-all duration-150 active:scale-95"
              >
                <i className="bi bi-box-arrow-in-right text-xs"></i>
                <span>Sign In</span>
              </NavLink>

              {/* MOBILE SEARCH & HAMBURGER TOGGLE */}
              <div className="flex items-center gap-1 lg:hidden">
                <button
                  type="button"
                  onClick={() => setSearchModalOpen(true)}
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
                  aria-label="Search"
                >
                  <i className="bi bi-search text-xs"></i>
                </button>

                <NavLink
                  to="/login"
                  title="Portal Login"
                  aria-label="Portal Login"
                  className="w-8 h-8 rounded-lg bg-sky-500 text-slate-950 shadow-sm flex items-center justify-center font-bold active:scale-95 transition"
                >
                  <i className="bi bi-box-arrow-in-right text-xs"></i>
                </NavLink>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex items-center gap-1 p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-sky-400 hover:text-white focus:outline-none cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  <i className="bi bi-list text-base"></i>
                </button>
              </div>

            </div>
          </div>
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
                      Tutorials
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
                  
                  {/* Special Festive Event Card: Bijoya 2026 (Valid upto 1st Nov 2026) */}
                  {isBijoyaValid && (
                    <NavLink
                      to="/bijoya"
                      onClick={() => setMobileMenuOpen(false)}
                      className="relative block overflow-hidden rounded-2xl p-3.5 bg-gradient-to-br from-amber-950/70 via-slate-900/95 to-purple-950/70 border border-amber-500/40 shadow-xl shadow-amber-500/10 group hover:border-amber-400 transition-all duration-300"
                    >
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                            Special Event • 1st Nov 2026
                          </span>
                        </div>
                        <span className="text-base select-none">🌸</span>
                      </div>
                      
                      <div className="mt-2.5">
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-200 transition flex items-center gap-1.5">
                          ২৭ তম মৈত্রী মহোৎসব ২০২৬
                        </h4>
                        <p className="text-[11px] text-amber-300 font-medium">
                          Bijoya Sammelani • Guest Registration
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Register guest entry & generate your digital event ticket pass.
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs font-semibold text-amber-300 group-hover:text-amber-200">
                        <span className="flex items-center gap-1.5">
                          <i className="bi bi-ticket-perforated-fill text-amber-400"></i>
                          Register Guest Pass
                        </span>
                        <i className="bi bi-arrow-right transform group-hover:translate-x-1 transition duration-200 text-amber-400"></i>
                      </div>
                    </NavLink>
                  )}

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
                            <p className="text-xs font-bold text-white">Home</p>
                            <p className="text-[10px] text-slate-400">Coder &amp; AccoTax Overview</p>
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
                          <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                            <i className="bi bi-building"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">About</p>
                            <p className="text-[9px] text-slate-400">Our Story &amp; Vision</p>
                          </div>
                        </HashLink>

                        <HashLink
                          smooth
                          to="/#fees"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-900/30 text-emerald-300 hover:text-white transition"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <i className="bi bi-qr-code-scan"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Pay Fees</p>
                            <p className="text-[9px] text-emerald-400 font-medium">Instant UPI QR</p>
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
                            <p className="text-[9px] text-slate-400">All Training Programs</p>
                          </div>
                        </HashLink>

                        <HashLink
                          smooth
                          to="/#why-choose-us"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-purple-500/30 bg-purple-950/20 hover:bg-purple-900/30 text-purple-300 hover:text-white transition"
                        >
                          <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                            <i className="bi bi-star-fill"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Why Us</p>
                            <p className="text-[9px] text-purple-400 font-medium">Reviews &amp; Trust</p>
                          </div>
                        </HashLink>

                        <NavLink
                          to="/certificates"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-amber-500/30 bg-amber-950/20 hover:bg-amber-900/30 text-amber-300 hover:text-white transition"
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                            <i className="bi bi-patch-check-fill"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Certificates</p>
                            <p className="text-[9px] text-amber-400 font-medium">Verify Credentials</p>
                          </div>
                        </NavLink>

                        <HashLink
                          smooth
                          to="/#teachers"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                            <i className="bi bi-people"></i>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Teachers</p>
                            <p className="text-[9px] text-slate-400">Faculty Mentors</p>
                          </div>
                        </HashLink>

                        <HashLink
                          smooth
                          to="/#contact"
                          onClick={() => setMobileMenuOpen(false)}
                          className="col-span-2 flex items-center justify-between p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                              <i className="bi bi-envelope"></i>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">Contact &amp; Location</p>
                              <p className="text-[9px] text-slate-400">Address, Map &amp; Direct Inquiries</p>
                            </div>
                          </div>
                          <i className="bi bi-arrow-right text-slate-500 text-xs"></i>
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
                          <span>Tools</span>
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
                          <span>Tutorials</span>
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