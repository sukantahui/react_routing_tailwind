import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import srcLayoutCode from "./topic0_files/src_layout_vs_flat_layout.py?raw";
import packageModularityCode from "./topic0_files/package_modularity_and_init.py?raw";
import envConfigCode from "./topic0_files/environment_and_config_loader.py?raw";
import scaffoldCode from "./topic0_files/institutional_capstone_scaffold.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic0_files/topic0_note.txt?raw";

// FAQ Questions
import questions from "./topic0_files/topic0_questions";

/**
 * Topic0: End-to-End project architecture & clean directory layout
 * Module: 004_004_capstone-projects
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic0() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("srcBlueprint");

  // Interactive Laboratory State
  const [projectType, setProjectType] = useState("CLI_APP"); // CLI_APP | REST_API | DATA_ENGINE
  const [buildBackend, setBuildBackend] = useState("hatchling"); // hatchling | flit | setuptools

  // Dynamic layout metadata mapping
  let coreLayers = "models/, repositories/, services/, cli/";
  let executionEntry = "python -m institutional_manager or campus-cli";
  let targetUsecase = "Multi-campus student ledger & terminal management";

  if (projectType === "CLI_APP") {
    coreLayers = "models/, repositories/, services/, cli/";
    executionEntry = "campus-cli (via [project.scripts])";
    targetUsecase = "Interactive administrative command-line toolkit";
  } else if (projectType === "REST_API") {
    coreLayers = "models/, repositories/, services/, api/routes/";
    executionEntry = "uvicorn institutional_manager.api:app --reload";
    targetUsecase = "High-concurrency microservice backend with SQLite/Postgres";
  } else if (projectType === "DATA_ENGINE") {
    coreLayers = "models/, pipelines/, analytics/, exporters/";
    executionEntry = "python -m institutional_manager.analytics";
    targetUsecase = "Automated student performance & financial reporting engine";
  }

  const generatedPyprojectSnippet = `# pyproject.toml - Modern Enterprise Packaging (PEP 621)
# Project: institutional-manager | Build Backend: ${buildBackend}

[build-system]
requires = ["${buildBackend}"]
build-backend = "${buildBackend}.build"

[project]
name = "institutional-manager"
version = "1.0.0"
description = "Enterprise multi-campus student admission & ledger system"
readme = "README.md"
requires-python = ">=3.10"
license = { text = "MIT" }
authors = [
    { name = "Sukanta Hui", email = "contact@codernaccotax.co.in" }
]
dependencies = [
    "pydantic>=2.6.0",
    "rich>=13.7.0"
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "pytest-cov>=5.0.0",
    "ruff>=0.3.0",
    "mypy>=1.9.0"
]

[project.scripts]
campus-cli = "institutional_manager.cli.main:run_cli"

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-v --cov=src --cov-report=term-missing"`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 4 • Module 004_004
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 0
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Capstone Projects, Portfolio &amp; Interview Mastery
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Project Architecture &amp; <span className="text-teal-400">Clean Directory Layout</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the architectural foundations of production Python software: structuring modular codebases with the industry-standard <code className="text-teal-300 font-mono">src/</code> layout, unifying builds with modern <code className="text-cyan-300 font-mono">pyproject.toml</code> (PEP 621), enforcing layered separation of concerns (Models, Repositories, Services, CLI), managing 12-factor configuration with immutable dataclasses, and controlling public APIs with <code className="text-purple-300 font-mono">__all__</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📁 src/ Layout Standard
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚙️ pyproject.toml (PEP 621)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ Layered Separation of Concerns
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔐 12-Factor App Configuration
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: ARCHITECTURAL PILLARS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🏛️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Professional Python Project Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Professional software is distinguished from amateur scripts by its architectural clarity, package isolation, and modular organization. The modern Python ecosystem has converged on the <code className="text-teal-300 font-mono">src/</code> layout and unified <code className="text-cyan-300 font-mono">pyproject.toml</code> manifest:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ src/ Layout</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">src/package_name/</code>
                <p className="text-[11px] text-slate-300">
                  Isolates source code from the current working directory, guaranteeing test runners execute against installed package binaries.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ pyproject.toml</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">PEP 517 / 621</code>
                <p className="text-[11px] text-slate-300">
                  Standardized declarative manifest replacing legacy <code className="text-cyan-300">setup.py</code>, centralizing build, dependencies, and tool settings.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Layered Architecture</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Models ➔ Repos ➔ Services</code>
                <p className="text-[11px] text-slate-300">
                  Strict one-directional dependencies preventing circular imports and isolating database SQL from business rules.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ 12-Factor Config</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">.env + AppConfig</code>
                <p className="text-[11px] text-slate-300">
                  Decouples environment secrets from source code, validating configuration into typed immutable dataclasses.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Why Flat Layouts Cause Subtle Production Outages
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                In a flat layout (where package folders sit directly at root), running <code className="text-teal-300 font-mono">pytest</code> imports local uninstalled files because <code className="text-teal-300 font-mono">""</code> (current directory) is prepended to <code className="text-teal-300 font-mono">sys.path</code>. Tests pass locally even if package packaging manifests omit critical files, only to crash when deployed to production servers! The <span className="text-emerald-400 font-bold">src/ layout permanently solves this bug</span>.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Directory Layouts, Layered Tiers &amp; Config Flows
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("srcBlueprint")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "srcBlueprint"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                src/ Layout Blueprint
              </button>
              <button
                onClick={() => setActiveInteractiveTab("layerTiers")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "layerTiers"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Layered Dependency Tiers
              </button>
              <button
                onClick={() => setActiveInteractiveTab("configHierarchy")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "configHierarchy"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                12-Factor Config Flow
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining standard project directory trees, strict one-way architectural layer boundaries, and environment parsing:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "srcBlueprint" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  ENTERPRISE PYTHON SRC/ DIRECTORY LAYOUT BLUEPRINT
                </text>

                {/* Directory Tree Boxes */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Left: Root Files */}
                  <rect x="25" y="35" width="230" height="185" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="35" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">📁 Root Manifests</text>
                  <text x="35" y="85" fill="#ccfbf1" fontSize="9" fontFamily="monospace">📄 pyproject.toml</text>
                  <text x="35" y="105" fill="#ccfbf1" fontSize="9" fontFamily="monospace">📄 README.md</text>
                  <text x="35" y="125" fill="#ccfbf1" fontSize="9" fontFamily="monospace">📄 LICENSE (MIT)</text>
                  <text x="35" y="145" fill="#ccfbf1" fontSize="9" fontFamily="monospace">📄 .gitignore</text>
                  <text x="35" y="165" fill="#ccfbf1" fontSize="9" fontFamily="monospace">📄 .env.example</text>
                  <text x="35" y="195" fill="#facc15" fontSize="8" fontWeight="bold">PEP 621 Standard Root</text>

                  {/* Center: Source Package */}
                  <rect x="280" y="35" width="280" height="185" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="290" y="60" fill="#e0f2fe" fontSize="11" fontWeight="bold">📁 src/institutional_manager/</text>
                  <text x="290" y="85" fill="#bae6fd" fontSize="9" fontFamily="monospace">├── __init__.py (__all__)</text>
                  <text x="290" y="105" fill="#bae6fd" fontSize="9" fontFamily="monospace">├── __main__.py (Entrypoint)</text>
                  <text x="290" y="125" fill="#bae6fd" fontSize="9" fontFamily="monospace">├── config.py (Dataclass)</text>
                  <text x="290" y="145" fill="#bae6fd" fontSize="9" fontFamily="monospace">├── models/ (Student, Campus)</text>
                  <text x="290" y="165" fill="#bae6fd" fontSize="9" fontFamily="monospace">├── services/ (Admission, Fee)</text>
                  <text x="290" y="185" fill="#bae6fd" fontSize="9" fontFamily="monospace">└── repositories/ (SQLite)</text>

                  {/* Right: Tests Package */}
                  <rect x="585" y="35" width="210" height="185" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="595" y="60" fill="#e0e7ff" fontSize="11" fontWeight="bold">📁 tests/</text>
                  <text x="595" y="85" fill="#c7d2fe" fontSize="9" fontFamily="monospace">├── conftest.py</text>
                  <text x="595" y="110" fill="#c7d2fe" fontSize="9" fontFamily="monospace">├── unit/</text>
                  <text x="610" y="130" fill="#a5b4fc" fontSize="8" fontFamily="monospace">test_models.py</text>
                  <text x="610" y="145" fill="#a5b4fc" fontSize="8" fontFamily="monospace">test_services.py</text>
                  <text x="595" y="170" fill="#c7d2fe" fontSize="9" fontFamily="monospace">└── integration/</text>
                  <text x="610" y="190" fill="#a5b4fc" fontSize="8" fontFamily="monospace">test_db_repo.py</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "layerTiers" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  ONE-DIRECTIONAL ARCHITECTURAL TIERS: PREVENTING CIRCULAR IMPORTS
                </text>

                {/* Architectural Layers */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Layer 1: CLI / API */}
                  <rect x="25" y="40" width="165" height="160" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="35" y="65" fill="#e0e7ff" fontSize="11" fontWeight="bold">1. Entry Tier</text>
                  <text x="35" y="85" fill="#c7d2fe" fontSize="9" fontFamily="monospace">cli/ &amp; api/</text>
                  <text x="35" y="115" fill="#e0e7ff" fontSize="8">CLI commands &amp; REST</text>
                  <text x="35" y="130" fill="#e0e7ff" fontSize="8">routes receive user input</text>
                  <text x="35" y="175" fill="#facc15" fontSize="8" fontWeight="bold">Calls Services</text>

                  {/* Arrow 1 */}
                  <path d="M 195 120 L 225 120" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Layer 2: Services */}
                  <rect x="230" y="40" width="170" height="160" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="240" y="65" fill="#e0f2fe" fontSize="11" fontWeight="bold">2. Service Tier</text>
                  <text x="240" y="85" fill="#bae6fd" fontSize="9" fontFamily="monospace">services/</text>
                  <text x="240" y="115" fill="#e0f2fe" fontSize="8">Pure business logic,</text>
                  <text x="240" y="130" fill="#e0f2fe" fontSize="8">fee calculations, waiver rules</text>
                  <text x="240" y="175" fill="#86efac" fontSize="8" fontWeight="bold">Zero SQL or CLI logic</text>

                  {/* Arrow 2 */}
                  <path d="M 405 120 L 435 120" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Layer 3: Repositories */}
                  <rect x="440" y="40" width="175" height="160" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="450" y="65" fill="#5eead4" fontSize="11" fontWeight="bold">3. Repository Tier</text>
                  <text x="450" y="85" fill="#ccfbf1" fontSize="9" fontFamily="monospace">repositories/</text>
                  <text x="450" y="115" fill="#ccfbf1" fontSize="8">SQLite / Postgres queries,</text>
                  <text x="450" y="130" fill="#ccfbf1" fontSize="8">JSON files, save/get</text>
                  <text x="450" y="175" fill="#facc15" fontSize="8" fontWeight="bold">Translates to Models</text>

                  {/* Arrow 3 */}
                  <path d="M 620 120 L 650 120" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Layer 4: Models */}
                  <rect x="655" y="40" width="140" height="160" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="665" y="65" fill="#f3e8ff" fontSize="11" fontWeight="bold">4. Domain Core</text>
                  <text x="665" y="85" fill="#d8b4fe" fontSize="9" fontFamily="monospace">models/</text>
                  <text x="665" y="115" fill="#f3e8ff" fontSize="8">Dataclasses, Enums,</text>
                  <text x="665" y="130" fill="#f3e8ff" fontSize="8">domain invariants</text>
                  <text x="665" y="175" fill="#86efac" fontSize="8" fontWeight="bold">Pure Zero-Dep</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  12-FACTOR CONFIGURATION LOADING &amp; IMMUTABLE DATACLASS PIPELINE
                </text>

                {/* Config Flow */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Source 1: .env file */}
                  <rect x="25" y="40" width="220" height="85" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="35" y="65" fill="#f3e8ff" fontSize="11" fontWeight="bold">1. .env Local File</text>
                  <text x="35" y="85" fill="#d8b4fe" fontSize="9" fontFamily="monospace">DEFAULT_CAMPUS=Barrackpore</text>
                  <text x="35" y="105" fill="#d8b4fe" fontSize="9" fontFamily="monospace">DATABASE_URL=sqlite:///app.db</text>

                  {/* Source 2: OS Environment */}
                  <rect x="25" y="135" width="220" height="85" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="35" y="160" fill="#f3e8ff" fontSize="11" fontWeight="bold">2. OS Environment Variables</text>
                  <text x="35" y="180" fill="#d8b4fe" fontSize="9" fontFamily="monospace">export LOG_LEVEL=DEBUG</text>
                  <text x="35" y="200" fill="#d8b4fe" fontSize="9" fontFamily="monospace">export APP_ENV=production</text>

                  {/* Arrow to Parser */}
                  <path d="M 250 130 L 290 130" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Parser Engine */}
                  <rect x="295" y="40" width="240" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="305" y="65" fill="#5eead4" fontSize="11" fontWeight="bold">AppConfig.from_env()</text>
                  <text x="305" y="88" fill="#a7f3d0" fontSize="8" fontFamily="monospace">1. Reads os.environ with fallbacks</text>
                  <text x="305" y="105" fill="#a7f3d0" fontSize="8" fontFamily="monospace">2. Coerces int: int(os.getenv(...))</text>
                  <text x="305" y="122" fill="#a7f3d0" fontSize="8" fontFamily="monospace">3. Coerces bool: 'true' ➔ True</text>
                  <text x="305" y="140" fill="#a7f3d0" fontSize="8" fontFamily="monospace">4. Validates database path presence</text>
                  <text x="305" y="175" fill="#facc15" fontSize="8" fontWeight="bold">Type-Safe Parsing Gate</text>

                  {/* Arrow to Dataclass */}
                  <path d="M 540 130 L 580 130" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Output Immutable Dataclass */}
                  <rect x="585" y="40" width="210" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="595" y="65" fill="#e0f2fe" fontSize="11" fontWeight="bold">@dataclass(frozen=True)</text>
                  <text x="595" y="88" fill="#bae6fd" fontSize="8" fontFamily="monospace">config.default_campus</text>
                  <text x="595" y="105" fill="#bae6fd" fontSize="8" fontFamily="monospace">config.database_url</text>
                  <text x="595" y="122" fill="#bae6fd" fontSize="8" fontFamily="monospace">config.max_batch_size: int</text>
                  <text x="595" y="140" fill="#bae6fd" fontSize="8" fontFamily="monospace">config.enable_sms: bool</text>
                  <text x="595" y="175" fill="#86efac" fontSize="8" fontWeight="bold">Immutable Across App</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE PROJECT SCAFFOLDER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Project Scaffolder &amp; pyproject.toml Generator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Configure application project templates and build backends to inspect dynamic architectural scaffolding and generated <code className="text-teal-300 font-mono">pyproject.toml</code> manifests:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Template Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Project Architectural Template:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "CLI_APP", label: "CLI Console Tool", icon: "💻", tag: "Click / Rich Entrypoint" },
                  { id: "REST_API", label: "REST Microservice", icon: "🚀", tag: "FastAPI / SQLite Backend" },
                  { id: "DATA_ENGINE", label: "Data Analytics Engine", icon: "📊", tag: "Pandas / Reporting Hub" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProjectType(item.id)}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all",
                      projectType === item.id
                        ? "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                    )}
                  >
                    <div className="text-base mb-1">{item.icon} <strong className="text-slate-200 text-xs sm:text-sm">{item.label}</strong></div>
                    <div className="text-[11px] text-teal-400 font-mono">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Build Backend Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Modern Build Backend (PEP 517):
              </label>
              <div className="flex flex-wrap gap-2">
                {["hatchling", "flit_core", "setuptools"].map((backend) => (
                  <button
                    key={backend}
                    onClick={() => setBuildBackend(backend)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg border text-xs font-mono transition-all",
                      buildBackend === backend
                        ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-sm"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                  >
                    build-backend = "{backend}"
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Architectural Layer Structure</div>
                <div className="text-xs font-bold font-mono text-teal-300 mt-1 leading-snug">
                  {coreLayers}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Application Entrypoint</div>
                <div className="text-xs font-bold font-mono text-cyan-300 mt-1 leading-snug">
                  {executionEntry}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Production Domain</div>
                <div className="text-xs font-bold font-mono text-purple-300 mt-1 leading-snug">
                  {targetUsecase}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Generated pyproject.toml Manifest:
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-teal-200 overflow-x-auto leading-relaxed">
                {generatedPyprojectSnippet}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: DEEP DIVE CODE LABS (PYTHON FILE LOADERS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Production Code Labs &amp; Architectural Scaffolds
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade architectural labs covering the <code className="text-teal-300 font-mono">src/</code> layout, clean package exports with <code className="text-cyan-300 font-mono">__all__</code>, 12-factor configuration loaders, and the complete institutional multi-campus scaffold:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: src/ Layout Blueprint vs Flat Layout Parity
                </h3>
                <p className="text-sm text-slate-400">
                  Inspecting the gold-standard enterprise project tree and understanding how <code className="text-teal-300 font-mono">src/</code> prevents subtle test runner import bugs.
                </p>
              </div>
              <PythonFileLoader
                fileModule={srcLayoutCode}
                title="src_layout_vs_flat_layout.py"
                highlightLines={[12, 25, 42]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Package Modularity, Layering &amp; __all__ Public Exports
                </h3>
                <p className="text-sm text-slate-400">
                  Enforcing one-directional dependency flows (Models &rarr; Services) and declaring public API symbols via <code className="text-cyan-300 font-mono">__all__</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={packageModularityCode}
                title="package_modularity_and_init.py"
                highlightLines={[15, 27, 43]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: 12-Factor AppConfig Environment Loader
                </h3>
                <p className="text-sm text-slate-400">
                  Parsing environment variables with fallback defaults into an immutable <code className="text-purple-300 font-mono">@dataclass(frozen=True)</code> container.
                </p>
              </div>
              <PythonFileLoader
                fileModule={envConfigCode}
                title="environment_and_config_loader.py"
                highlightLines={[15, 25, 40]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Multi-Campus Institutional System Scaffolding Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Complete end-to-end scaffolding coordinating SQLite repositories, admission services, and student domain models for Mamata across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={scaffoldCode}
                title="institutional_capstone_scaffold.py"
                highlightLines={[16, 32, 58, 80]}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: COMMON PITFALLS & ANTI-PATTERNS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Architecture Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Committing .env Secrets to Git
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Committing <code className="text-rose-400 font-mono">.env</code> files containing live database passwords or API tokens exposes credentials permanently in Git commit history!
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: git add .env (Leaks passwords to GitHub!){'\n'}
                # FIX: Add .env to .gitignore; commit .env.example
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Circular Layer Imports
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Having a model import a service while the service imports the model creates circular import crashes on module initialization.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # BUG: student.py imports fee_service.py{'\n'}
                # FIX: Enforce one-way flow: services ➔ models
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Legacy setup.py / setup.cfg Bloat
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Scattering configurations across <code className="text-rose-400 font-mono">setup.py</code>, <code className="text-rose-400 font-mono">setup.cfg</code>, and <code className="text-rose-400 font-mono">requirements.txt</code> creates outdated fragmentation.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: setup.py + setup.cfg + requirements.txt{'\n'}
                # MODERN STANDARD: pyproject.toml (PEP 621)
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. God Modules with Mixed Concerns
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing SQL database queries, business math, and terminal <code className="text-rose-400 font-mono">print()</code> prompts in a single 1,000-line file destroys testability.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: 1 file doing DB + Business + UI{'\n'}
                # BEST PRACTICE: Separate models, repos, services, CLI
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: BEST PRACTICES CHECKLIST */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✅</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Professional Project Architecture Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Adopt the src/ Layout:</strong> Place source packages inside <code className="text-teal-300 font-mono">src/my_package/</code> to guarantee packaging import parity.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Centralize in pyproject.toml:</strong> Manage project metadata, dependencies, scripts, and linters in a single TOML manifest.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Isolate Layer Concerns:</strong> Keep models pure, repositories focused on SQL, services on business logic, and CLI on user I/O.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Decouple Environment Variables:</strong> Load secrets via <code className="text-teal-300 font-mono">.env</code> and parse into strongly-typed immutable <code className="text-teal-300 font-mono">@dataclass(frozen=True)</code> containers.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Project Architecture & Layout FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Project Architecture & Clean Directory Layout Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "A clean, standardized project architecture is what separates hobbyist code from enterprise software engineering. In our institutional capstone projects across Barrackpore, Kolkata, Ichapur, and Jadavpur, adopting the src/ layout and pyproject.toml ensures that managing student data for Mamata, Mahima, Abhronila, Susmita, and Debangshu is modular, maintainable, and ready for immediate deployment. Structure your layers cleanly from day one, and your projects will scale effortlessly."
            }
          />
        </section>

      </div>
    </div>
  );
}
