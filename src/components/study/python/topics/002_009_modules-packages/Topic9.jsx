import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import reqPinning from "./topic9_files/requirements_generation_and_pinning.py?raw";
import layeredReqs from "./topic9_files/layered_requirements_architecture.py?raw";
import freezeVsCompile from "./topic9_files/pip_freeze_vs_pip_reqs_and_lockfiles.py?raw";
import validatorAudit from "./topic9_files/dependency_validator_and_license_audit.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic9_files/topic9_note.txt?raw";

// FAQ Questions
import questions from "./topic9_files/topic9_questions";

/**
 * Topic9: requirements.txt generation and dependency management
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic9() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("deployflow");

  // Interactive Generator State
  const [envTier, setEnvTier] = useState("dev"); // base, dev, prod
  const [includeFastAPI, setIncludeFastAPI] = useState(true);
  const [includeRequests, setIncludeRequests] = useState(true);
  const [includePytest, setIncludePytest] = useState(true);
  const [includeGunicorn, setIncludeGunicorn] = useState(false);

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

  const getRequirementsContent = () => {
    const lines = ["# Coder & AccoTax Dependency Manifest"];

    if (envTier === "dev") {
      lines.push("-r base.txt\n");
      if (includePytest) lines.push("pytest==8.0.2");
      lines.push("black==24.2.0");
      lines.push("flake8==7.0.0");
      lines.push("mypy==1.8.0");
    } else if (envTier === "prod") {
      lines.push("-r base.txt\n");
      if (includeGunicorn) lines.push("gunicorn==21.2.0");
      lines.push("uvicorn[standard]==0.27.1");
      lines.push("sentry-sdk==1.40.6");
    } else {
      if (includeFastAPI) lines.push("fastapi==0.110.0");
      if (includeRequests) lines.push("requests>=2.31.0");
      lines.push("pydantic~=2.6.0");
      lines.push("colorama>=0.4.6; sys_platform == 'win32'");
    }

    return lines.join("\n");
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
            Segment 2 • Module 002_009
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 9 • Module Finale
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          <code className="text-teal-400 font-mono">requirements.txt</code> Generation &amp; Dependency Management
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master reproducible Python deployments: version specifiers (<code className="text-teal-300 font-mono">==</code>, <code className="text-cyan-300 font-mono">~=</code>, <code className="text-purple-300 font-mono">&gt;=</code>), environment markers, layered architecture (<code className="text-amber-300 font-mono">base.txt</code> / <code className="text-amber-300 font-mono">dev.txt</code> / <code className="text-amber-300 font-mono">prod.txt</code>), <code className="text-teal-300 font-mono">pip-tools</code> lockfiles, and automated dependency auditing.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔒 Exact Pinning (==) &amp; SemVer (~=)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏗️ Layered Architecture (-r base.txt)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Platform Environment Markers
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ pip-tools Lockfiles &amp; Security Audits
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE DEPENDENCY MANIFEST */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Dependency Manifest &amp; Version Specifiers
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              A <code className="text-teal-400 font-mono">requirements.txt</code> file is the blueprint of your project's external dependencies. It guarantees that any team member or production server can replicate your exact environment:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Card 1: Pinning */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="text-teal-400 font-bold text-base mb-1">== Exact Pinning</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">requests==2.31.0</code>
                <p className="text-[11px] text-slate-300">
                  Mandatory for production deployments; eliminates breaking unexpected updates.
                </p>
              </div>

              {/* Card 2: SemVer */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="text-cyan-400 font-bold text-base mb-1">~= Compatible Release</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">pydantic~=2.6.0</code>
                <p className="text-[11px] text-slate-300">
                  Accepts bug-fix patches (&gt;=2.6.0, ==2.6.*) while blocking breaking version changes.
                </p>
              </div>

              {/* Card 3: Markers */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="text-purple-400 font-bold text-base mb-1">; Environment Markers</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">; sys_platform == 'win32'</code>
                <p className="text-[11px] text-slate-300">
                  Conditionally installs packages only on matching operating systems or Python versions.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Golden Deployment Command
              </h3>
              <code className="text-emerald-300 font-mono text-sm block">
                $ python -m pip install -r requirements.txt
              </code>
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
                2. Visualizing Dependency Management Architectures
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("deployflow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "deployflow"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Deployment Flow
              </button>
              <button
                onClick={() => setActiveInteractiveTab("layered")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "layered"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Layered Architecture (-r)
              </button>
              <button
                onClick={() => setActiveInteractiveTab("lockfiles")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "lockfiles"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                pip-tools Lockfile Engine
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining dependency export pipelines, multi-environment separation, and deterministic lockfile compilation:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "deployflow" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">REQUIREMENTS EXPORT &amp; PRODUCTION DEPLOYMENT WORKFLOW</text>

                {/* 3 Steps */}
                <g transform="translate(30, 60)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="240" height="180" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">1. Developer Machine</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="11 font-mono">$ python -m venv .venv</text>
                  <text x="20" y="85" fill="#ecfdf5" fontSize="11 font-mono">$ pip install fastapi requests</text>
                  <text x="20" y="115" fill="#34d399" fontSize="11 font-mono font-bold">$ pip freeze &gt; req.txt</text>
                  <text x="20" y="145" fill="#a7f3d0" fontSize="10">Exports pinned dependency manifest</text>

                  {/* Arrow 1 */}
                  <text x="255" y="95" fill="#38bdf8" fontSize="24" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="285" y="0" width="240" height="180" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="305" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">2. Git Version Control</text>
                  <text x="305" y="60" fill="#cbd5e1" fontSize="11 font-mono">git add requirements.txt</text>
                  <text x="305" y="85" fill="#cbd5e1" fontSize="11 font-mono">git commit -m "Add deps"</text>
                  <text x="305" y="110" fill="#cbd5e1" fontSize="11 font-mono">git push origin main</text>
                  <text x="305" y="145" fill="#fca5a5" fontSize="10 font-bold">(.venv is in .gitignore!)</text>

                  {/* Arrow 2 */}
                  <text x="540" y="95" fill="#38bdf8" fontSize="24" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="570" y="0" width="240" height="180" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="590" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">3. Production Server</text>
                  <text x="590" y="60" fill="#ecfdf5" fontSize="11 font-mono">git pull</text>
                  <text x="590" y="85" fill="#ecfdf5" fontSize="11 font-mono font-bold">pip install -r req.txt</text>
                  <text x="590" y="115" fill="#34d399" fontSize="11">✓ 100% Identical Versions</text>
                  <text x="590" y="145" fill="#a7f3d0" fontSize="10">Zero deployment surprises!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "layered" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">LAYERED REQUIREMENTS ARCHITECTURE (-r base.txt)</text>

                {/* Base */}
                <g transform="translate(300, 50)">
                  <rect x="0" y="0" width="280" height="100" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">requirements/base.txt</text>
                  <text x="20" y="55" fill="#ecfdf5" fontSize="11 font-mono">fastapi==0.110.0</text>
                  <text x="20" y="75" fill="#ecfdf5" fontSize="11 font-mono">requests==2.31.0</text>
                </g>

                {/* Dev & Prod children */}
                <g transform="translate(50, 180)">
                  <rect x="0" y="0" width="350" height="110" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">requirements/dev.txt (Local &amp; CI)</text>
                  <text x="20" y="55" fill="#34d399" fontSize="11 font-mono font-bold">-r base.txt</text>
                  <text x="20" y="75" fill="#cbd5e1" fontSize="11 font-mono">pytest==8.0.2, black==24.2.0</text>
                  <text x="20" y="95" fill="#94a3b8" fontSize="10">Testing &amp; Linting Tools</text>
                </g>

                <g transform="translate(480, 180)">
                  <rect x="0" y="0" width="350" height="110" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">requirements/prod.txt (Docker / Server)</text>
                  <text x="20" y="55" fill="#34d399" fontSize="11 font-mono font-bold">-r base.txt</text>
                  <text x="20" y="75" fill="#ecfdf5" fontSize="11 font-mono">gunicorn==21.2.0, sentry-sdk==1.40.6</text>
                  <text x="20" y="95" fill="#a7f3d0" fontSize="10">Zero dev tools in production!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">pip-tools: requirements.in → DETERMINISTIC LOCKFILE</text>

                {/* Left: in */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="350" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Direct Intent: requirements.in</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="12 font-mono">fastapi&gt;=0.110.0</text>
                  <text x="20" y="90" fill="#ecfdf5" fontSize="12 font-mono">pandas&gt;=2.0.0</text>
                  <rect x="20" y="145" width="310" height="70" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="170" fill="#34d399" fontSize="11 font-bold">Human-Readable Intent:</text>
                  <text x="30" y="195" fill="#cbd5e1" fontSize="10">Only contains packages you actually imported!</text>
                </g>

                {/* Middle Action */}
                <g transform="translate(395, 130)">
                  <text x="10" y="35" fill="#38bdf8" fontSize="22" fontWeight="bold">→</text>
                  <text x="-15" y="65" fill="#38bdf8" fontSize="10 font-mono">pip-compile</text>
                </g>

                {/* Right: Compiled Lockfile */}
                <g transform="translate(490, 50)">
                  <rect x="0" y="0" width="360" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Locked: requirements.txt</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="11 font-mono">fastapi==0.110.0</text>
                  <text x="20" y="80" fill="#cbd5e1" fontSize="11 font-mono">pydantic==2.6.4 # via fastapi</text>
                  <text x="20" y="100" fill="#cbd5e1" fontSize="11 font-mono">numpy==1.26.4 # via pandas</text>
                  <rect x="20" y="145" width="320" height="70" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="170" fill="#34d399" fontSize="11 font-bold">Machine-Deterministic Lockfile:</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="10">Annotated with dependency provenance &amp; hashes!</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE REQUIREMENTS GENERATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive <code className="text-teal-400 font-mono">requirements.txt</code> Builder &amp; Parser
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select an environment tier and configure packages to generate production-ready layered requirement manifests:
          </p>

          {/* Tier Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: "base", label: "Base Tier (requirements/base.txt)" },
              { id: "dev", label: "Dev Tier (requirements/dev.txt)" },
              { id: "prod", label: "Prod Tier (requirements/prod.txt)" },
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => setEnvTier(tier.id)}
                className={clsx(
                  "py-2.5 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all",
                  envTier === tier.id
                    ? "bg-teal-950 border-teal-500 text-teal-300 shadow-md shadow-teal-950"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                )}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Builder Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Left Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Configure Tier Dependencies
              </span>

              {envTier === "base" ? (
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeFastAPI}
                      onChange={(e) => setIncludeFastAPI(e.target.checked)}
                      className="rounded border-slate-700 text-teal-500"
                    />
                    <div>
                      <code className="text-xs font-mono text-emerald-300 font-bold block">fastapi==0.110.0</code>
                      <span className="text-[11px] text-slate-400">Web &amp; API microservice framework</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeRequests}
                      onChange={(e) => setIncludeRequests(e.target.checked)}
                      className="rounded border-slate-700 text-teal-500"
                    />
                    <div>
                      <code className="text-xs font-mono text-emerald-300 font-bold block">requests&gt;=2.31.0</code>
                      <span className="text-[11px] text-slate-400">HTTP client library</span>
                    </div>
                  </label>
                </div>
              ) : envTier === "dev" ? (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="text-teal-400 font-bold block mb-1">Inherits:</span>
                    <code>-r base.txt (All core application libraries)</code>
                  </div>
                  <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePytest}
                      onChange={(e) => setIncludePytest(e.target.checked)}
                      className="rounded border-slate-700 text-teal-500"
                    />
                    <div>
                      <code className="text-xs font-mono text-cyan-300 font-bold block">pytest==8.0.2</code>
                      <span className="text-[11px] text-slate-400">Automated testing &amp; assertion framework</span>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="text-teal-400 font-bold block mb-1">Inherits:</span>
                    <code>-r base.txt (All core application libraries)</code>
                  </div>
                  <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeGunicorn}
                      onChange={(e) => setIncludeGunicorn(e.target.checked)}
                      className="rounded border-slate-700 text-teal-500"
                    />
                    <div>
                      <code className="text-xs font-mono text-emerald-300 font-bold block">gunicorn==21.2.0</code>
                      <span className="text-[11px] text-slate-400">Production WSGI HTTP Server</span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Right Generated File */}
            <div className="space-y-2 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Generated requirements/{envTier}.txt
              </span>
              <pre className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap flex-1 max-h-64">
                {getRequirementsContent()}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER VERSION OPERATORS MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Version Specifiers &amp; Operators Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Operator</th>
                  <th className="py-3.5 px-4 font-bold">Meaning</th>
                  <th className="py-3.5 px-4 font-bold">Example</th>
                  <th className="py-3.5 px-4 font-bold">Recommended Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">==</td>
                  <td className="py-3 px-4">Exact Pinning</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">requests==2.31.0</td>
                  <td className="py-3 px-4">Mandatory for live production deployments</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">~=</td>
                  <td className="py-3 px-4">Compatible Release</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">pydantic~=2.6.0</td>
                  <td className="py-3 px-4">Allows safe bug-fix patches (&gt;=2.6.0, ==2.6.*)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">&gt;=</td>
                  <td className="py-3 px-4">Minimum Version</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">pandas&gt;=2.0.0</td>
                  <td className="py-3 px-4">Reusable libraries and initial development</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-400 font-semibold">!=</td>
                  <td className="py-3 px-4">Exclude Buggy Version</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">pydantic!=2.5.0</td>
                  <td className="py-3 px-4">Skip a known broken or vulnerable release</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">;</td>
                  <td className="py-3 px-4">Environment Marker</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">; sys_platform == 'win32'</td>
                  <td className="py-3 px-4">OS-specific and Python-version specific packages</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating requirements pinning, layered multi-environment architectures, pip-tools lockfiles, and compliance auditors:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "requirements_generation_and_pinning.py",
                code: reqPinning,
                description: "Anatomy of requirements.txt, 5 version specifiers, and platform environment markers.",
              },
              {
                filename: "layered_requirements_architecture.py",
                code: layeredReqs,
                description: "Layered multi-tier architecture (base.txt, dev.txt, prod.txt) using recursive -r includes.",
              },
              {
                filename: "pip_freeze_vs_pip_reqs_and_lockfiles.py",
                code: freezeVsCompile,
                description: "Drawbacks of naive pip freeze vs pip-tools (pip-compile) deterministic lockfiles.",
              },
              {
                filename: "dependency_validator_and_license_audit.py",
                code: validatorAudit,
                description: "Automated requirements parser and dependency compliance auditor matching specs against installed packages.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Freezing Global Python
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Running <code className="text-rose-300 font-mono">pip freeze &gt; requirements.txt</code> outside a virtualenv dumps 200 unrelated global system packages into your project!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always activate your project virtual environment before running <code className="text-emerald-300">pip freeze</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Testing Tools in Production Images
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Installing <code className="text-amber-300 font-mono">pytest</code>, <code className="text-amber-300 font-mono">black</code>, and <code className="text-amber-300 font-mono">mypy</code> on production servers adds 300MB of unnecessary attack surface.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use layered <code className="text-emerald-300">requirements/prod.txt</code> for Docker builds.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Unpinned Dependencies in Production
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Leaving <code className="text-purple-300 font-mono">requests</code> without version pins allows a breaking upstream release to crash your web app during an automated restart.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Pin exact versions (<code className="text-emerald-300">==</code>) in production manifests.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Broken Dependency Conflicts
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Manually editing version numbers in <code className="text-cyan-300 font-mono">requirements.txt</code> can create conflicting sub-dependencies.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Run <code className="text-emerald-300">python -m pip check</code> to verify environment integrity!
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering requirements.txt generation, version specifiers, layered architectures, and lockfile compilation:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with version specifier tables, layered requirements templates, and pip-tools recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic9_requirements_and_dependencies_notes.txt"
              title="Print Topic 9 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
