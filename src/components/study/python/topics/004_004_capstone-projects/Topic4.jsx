import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import conventionalCommitCode from "./topic4_files/conventional_commits_and_git_workflow.py?raw";
import githubActionsCode from "./topic4_files/github_actions_ci_cd_workflow_generator.py?raw";
import issueTemplatesCode from "./topic4_files/issue_and_pr_templates_scaffolding.py?raw";
import releaseOrchestratorCode from "./topic4_files/institutional_github_release_orchestrator.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Publishing projects to GitHub with Git commits, issues, and releases
 * Module: 004_004_capstone-projects
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("ciMatrix");

  // Interactive Laboratory State
  const [commitCategory, setCommitCategory] = useState("FEAT"); // FEAT | FIX | DOCS | BREAKING
  const [currentBaseVersion, setCurrentBaseVersion] = useState("v1.0.0");

  let calculatedNextVersion = "v1.1.0";
  let sampleCommitMessage = "feat(admission): add Barrackpore regional merit grant";
  let semverExplanation = "Minor version bump (+0.1.0) due to backwards-compatible new feature";

  if (commitCategory === "FEAT") {
    calculatedNextVersion = "v1.1.0";
    sampleCommitMessage = "feat(admission): add Barrackpore regional merit grant";
    semverExplanation = "Minor bump (1.0.0 → 1.1.0) for new backwards-compatible functionality.";
  } else if (commitCategory === "FIX") {
    calculatedNextVersion = "v1.0.1";
    sampleCommitMessage = "fix(ledger): prevent overpayment balance corruption in atomic transactions";
    semverExplanation = "Patch bump (1.0.0 → 1.0.1) for backwards-compatible bug fix.";
  } else if (commitCategory === "DOCS") {
    calculatedNextVersion = "v1.0.0";
    sampleCommitMessage = "docs(readme): add shields.io coverage badge and quickstart guide";
    semverExplanation = "No version bump (1.0.0 → 1.0.0) for documentation-only changes.";
  } else if (commitCategory === "BREAKING") {
    calculatedNextVersion = "v2.0.0";
    sampleCommitMessage = "feat(api)!: migrate student ID schema to UUIDv4 format";
    semverExplanation = "Major bump (1.0.0 → 2.0.0) due to breaking change in API/database schema.";
  }

  const generatedCiSnippet = `# .github/workflows/ci.yml - Production Multi-Platform CI Matrix
name: CI Test Suite & Quality Gates

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  matrix-testing:
    name: PyTest Matrix (\${{ matrix.os }} - Py\${{ matrix.python-version }})
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        python-version: ["3.10", "3.11", "3.12"]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: \${{ matrix.python-version }}
          cache: "pip"

      - name: Install Project in Editable Mode
        run: pip install -e ".[dev]"

      - name: Run Ruff Linter
        run: ruff check .

      - name: Run Mypy Static Type Verification
        run: mypy src/

      - name: Run PyTest with Quality Gates
        run: pytest --cov=src --cov-branch --cov-report=term-missing --cov-fail-under=85`;

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
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Capstone Projects, Portfolio &amp; Interview Mastery
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Publishing to GitHub: <span className="text-teal-400">Commits, Releases &amp; CI/CD</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master open-source publishing, Git version control hygiene, and automated GitHub continuous integration in Python: writing structured Conventional Commits (<code className="text-teal-300 font-mono">feat:</code>, <code className="text-teal-300 font-mono">fix:</code>), managing Semantic Versioning (SemVer), configuring multi-OS and multi-Python GitHub Actions matrix pipelines (<code className="text-cyan-300 font-mono">.github/workflows/ci.yml</code>), establishing branch protection rules, generating automated changelogs, and attaching compiled Wheel binary distributions to GitHub Releases.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📝 Conventional Commits Specification
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏷️ Semantic Versioning (SemVer)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚙️ Multi-OS GitHub Actions Matrix
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 GitHub Releases &amp; Binary Wheels
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
              1. The Professional GitHub Publishing Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Publishing production software requires disciplined Git hygiene, automated quality gates, and standardized release engineering:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Conventional Commits</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">feat:, fix:, docs:</code>
                <p className="text-[11px] text-slate-300">
                  Standardized prefixes enabling automated changelog generation and automatic SemVer version bumping.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Semantic Versioning</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">MAJOR.MINOR.PATCH</code>
                <p className="text-[11px] text-slate-300">
                  Precise version signals: breaking API changes (Major), new features (Minor), and bug fixes (Patch).
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ GitHub Actions CI</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">matrix: [Ubuntu, Win, Mac]</code>
                <p className="text-[11px] text-slate-300">
                  Executes linters, static type checks, and pytest coverage quality gates across multi-OS environments on every PR.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ Binary Releases</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">dist/*.whl + Tarballs</code>
                <p className="text-[11px] text-slate-300">
                  Builds and attaches pre-compiled wheel binary distribution packages directly to tagged GitHub releases.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Branch Protection: The Defense Line Against Broken Production
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Never push directly to <code className="text-teal-300 font-mono">main</code>! Always configure GitHub Branch Protection Rules requiring: 1. Pull Request peer reviews, 2. Passing GitHub Actions CI status checks (Ruff, Mypy, PyTest), and 3. Linear Git history via Squash-and-Merge.
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
                2. Visualizing CI/CD Matrix, SemVer Flow &amp; PR Review Gates
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("ciMatrix")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "ciMatrix"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                GitHub Actions CI Matrix
              </button>
              <button
                onClick={() => setActiveInteractiveTab("semverFlow")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "semverFlow"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Conventional Commits &amp; SemVer
              </button>
              <button
                onClick={() => setActiveInteractiveTab("prReviewGate")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "prReviewGate"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                PR Quality Gate Lifecycle
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining multi-OS matrix testing, automated semantic versioning calculations, and protected PR merge flows:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "ciMatrix" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  GITHUB ACTIONS MULTI-PLATFORM CI MATRIX (9 PARALLEL RUNNERS)
                </text>

                {/* Left: Trigger */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="180" height="235" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="15" y="25" fill="#ffffff" fontSize="11" fontWeight="bold">Event Trigger</text>
                  <text x="15" y="55" fill="#bae6fd" fontSize="9" fontFamily="monospace">on: [push, PR]</text>
                  <text x="15" y="75" fill="#bae6fd" fontSize="9" fontFamily="monospace">branches: [main]</text>

                  <rect x="10" y="115" width="160" height="105" rx="4" fill="#082f49" />
                  <text x="15" y="135" fill="#38bdf8" fontSize="8" fontWeight="bold">Pre-Flight Job:</text>
                  <text x="15" y="152" fill="#e0f2fe" fontSize="8">1. Ruff Linter</text>
                  <text x="15" y="169" fill="#e0f2fe" fontSize="8">2. Mypy Type Check</text>
                  <text x="15" y="186" fill="#86efac" fontSize="8" fontWeight="bold">Gate Passed ✅</text>
                </g>

                {/* Arrow to Matrix */}
                <path d="M 220 160 L 250 160" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* Center: Matrix Matrix Grid */}
                <g transform="translate(260, 50)">
                  <rect x="0" y="0" width="340" height="235" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="15" y="25" fill="#5eead4" fontSize="11" fontWeight="bold">Matrix Testing Grid (3x3 = 9 Runners)</text>

                  {/* Row 1: Ubuntu */}
                  <rect x="15" y="45" width="310" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="25" y="65" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Ubuntu 24.04: Py3.10 | Py3.11 | Py3.12</text>
                  <text x="25" y="82" fill="#86efac" fontSize="8">3 Parallel Linux Runners ✅</text>

                  {/* Row 2: Windows */}
                  <rect x="15" y="105" width="310" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="25" y="125" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Windows Server: Py3.10 | Py3.11 | Py3.12</text>
                  <text x="25" y="142" fill="#86efac" fontSize="8">3 Parallel Windows Runners (CP1252 Checked) ✅</text>

                  {/* Row 3: macOS */}
                  <rect x="15" y="165" width="310" height="50" rx="4" fill="#022c22" stroke="#0d9488" />
                  <text x="25" y="185" fill="#a7f3d0" fontSize="9" fontFamily="monospace">macOS 14: Py3.10 | Py3.11 | Py3.12</text>
                  <text x="25" y="202" fill="#86efac" fontSize="8">3 Parallel macOS Runners ✅</text>
                </g>

                {/* Arrow to Quality Gate */}
                <path d="M 610 160 L 640 160" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* Right: Quality Gate Output */}
                <g transform="translate(650, 50)">
                  <rect x="0" y="0" width="170" height="235" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="15" y="25" fill="#e0e7ff" fontSize="11" fontWeight="bold">Quality Gate</text>

                  <rect x="10" y="45" width="150" height="175" rx="4" fill="#0f172a" stroke="#4f46e5" />
                  <text x="15" y="70" fill="#facc15" fontSize="9" fontWeight="bold">Coverage Audit:</text>
                  <text x="15" y="90" fill="#a5b4fc" fontSize="8">Total Coverage: 96%</text>
                  <text x="15" y="105" fill="#a5b4fc" fontSize="8">Threshold: &gt;= 85%</text>
                  
                  <rect x="15" y="130" width="140" height="40" rx="4" fill="#064e3b" />
                  <text x="22" y="153" fill="#86efac" fontSize="9" fontWeight="bold">BUILD: PASSED ✅</text>
                  <text x="15" y="195" fill="#e0e7ff" fontSize="7">Ready for PR Merge</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "semverFlow" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  CONVENTIONAL COMMITS TO SEMANTIC VERSIONING (SEMVER) MAPPING
                </text>

                {/* SemVer Flow */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Level 1: PATCH */}
                  <rect x="25" y="35" width="240" height="180" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="35" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">1. PATCH (1.0.0 ➔ 1.0.1)</text>
                  <text x="35" y="85" fill="#e0f2fe" fontSize="9" fontFamily="monospace">fix(ledger): fix tax math</text>
                  <text x="35" y="105" fill="#e0f2fe" fontSize="9" fontFamily="monospace">perf(db): optimize index</text>
                  <text x="35" y="135" fill="#bae6fd" fontSize="8">Backwards-compatible bug fix.</text>
                  <text x="35" y="150" fill="#bae6fd" fontSize="8">Zero new features added.</text>
                  <text x="35" y="195" fill="#facc15" fontSize="8" fontWeight="bold">Trigger: 'fix:' / 'perf:'</text>

                  {/* Level 2: MINOR */}
                  <rect x="290" y="35" width="240" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="300" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">2. MINOR (1.0.0 ➔ 1.1.0)</text>
                  <text x="300" y="85" fill="#ccfbf1" fontSize="9" fontFamily="monospace">feat(admission): add waiver</text>
                  <text x="300" y="105" fill="#ccfbf1" fontSize="9" fontFamily="monospace">feat(cli): add export command</text>
                  <text x="300" y="135" fill="#a7f3d0" fontSize="8">Backwards-compatible new feature.</text>
                  <text x="300" y="150" fill="#a7f3d0" fontSize="8">Existing APIs continue working.</text>
                  <text x="300" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Trigger: 'feat:'</text>

                  {/* Level 3: MAJOR */}
                  <rect x="555" y="35" width="240" height="180" rx="6" fill="#4c0519" stroke="#f43f5e" />
                  <text x="565" y="60" fill="#fda4af" fontSize="11" fontWeight="bold">3. MAJOR (1.0.0 ➔ 2.0.0)</text>
                  <text x="565" y="85" fill="#fecdd3" fontSize="9" fontFamily="monospace">feat(api)!: migrate to UUID</text>
                  <text x="565" y="105" fill="#fecdd3" fontSize="9" fontFamily="monospace">BREAKING CHANGE: new schema</text>
                  <text x="565" y="135" fill="#ffe4e6" fontSize="8">Incompatible breaking change.</text>
                  <text x="565" y="150" fill="#ffe4e6" fontSize="8">Requires caller code migration.</text>
                  <text x="565" y="195" fill="#fb7185" fontSize="8" fontWeight="bold">Trigger: 'feat!:' / 'BREAKING'</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  PROTECTED MAIN BRANCH &amp; PULL REQUEST QUALITY GATE LIFECYCLE
                </text>

                {/* PR Lifecycle */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* Step 1: Feature Branch */}
                  <rect x="25" y="40" width="220" height="165" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="35" y="65" fill="#ffffff" fontSize="11" fontWeight="bold">1. Feature Branch</text>
                  <text x="35" y="90" fill="#bae6fd" fontSize="8" fontFamily="monospace">git checkout -b feat/waiver</text>
                  <text x="35" y="110" fill="#bae6fd" fontSize="8" fontFamily="monospace">git commit -m "feat(...)"</text>
                  <text x="35" y="130" fill="#bae6fd" fontSize="8" fontFamily="monospace">git push origin feat/waiver</text>
                  <text x="35" y="180" fill="#facc15" fontSize="8" fontWeight="bold">Isolated Development</text>

                  {/* Arrow 1 */}
                  <path d="M 255 120 L 285 120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 2: PR & CI Gate */}
                  <rect x="295" y="40" width="240" height="165" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="305" y="65" fill="#5eead4" fontSize="11" fontWeight="bold">2. PR Automated CI Gate</text>
                  <text x="305" y="90" fill="#ccfbf1" fontSize="8">✓ 9/9 Matrix Tests Passing</text>
                  <text x="305" y="108" fill="#ccfbf1" fontSize="8">✓ 96% Branch Coverage (&gt;= 85%)</text>
                  <text x="305" y="126" fill="#ccfbf1" fontSize="8">✓ Ruff &amp; Mypy Strict Clean</text>
                  <text x="305" y="144" fill="#ccfbf1" fontSize="8">✓ 1 Peer Review Approved</text>
                  <text x="305" y="180" fill="#86efac" fontSize="8" fontWeight="bold">All Status Checks Green</text>

                  {/* Arrow 2 */}
                  <path d="M 545 120 L 575 120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 3: Squash & Release */}
                  <rect x="585" y="40" width="210" height="165" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="595" y="65" fill="#f3e8ff" fontSize="11" fontWeight="bold">3. Squash Merge ➔ Release</text>
                  <text x="595" y="90" fill="#d8b4fe" fontSize="8" fontFamily="monospace">Merge to main (Linear)</text>
                  <text x="595" y="110" fill="#d8b4fe" fontSize="8" fontFamily="monospace">SemVer Tag: v1.1.0</text>
                  <text x="595" y="130" fill="#d8b4fe" fontSize="8" fontFamily="monospace">Build Wheels: dist/*.whl</text>
                  <text x="595" y="150" fill="#d8b4fe" fontSize="8">Changelog published!</text>
                  <text x="595" y="180" fill="#86efac" fontSize="8" fontWeight="bold">🚀 Live Production Release</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE RELEASE & CI SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Conventional Commit &amp; SemVer Release Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a Conventional Commit type to observe automatic Semantic Versioning calculations, changelog generation, and GitHub Actions CI workflow triggers:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Commit Type Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Conventional Commit Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "FEAT", label: "feat: (Feature)", bump: "MINOR (+0.1.0)" },
                  { id: "FIX", label: "fix: (Bug Fix)", bump: "PATCH (+0.0.1)" },
                  { id: "DOCS", label: "docs: (Docs Only)", bump: "NO BUMP" },
                  { id: "BREAKING", label: "feat!: (Breaking)", bump: "MAJOR (+1.0.0)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCommitCategory(item.id)}
                    className={clsx(
                      "p-2.5 rounded-xl border text-left transition-all",
                      commitCategory === item.id
                        ? item.id === "BREAKING"
                          ? "bg-rose-950/60 border-rose-500 shadow-md shadow-rose-950/50"
                          : "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                  >
                    <div className="text-xs font-bold text-slate-200">{item.label}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{item.bump}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">Base SemVer Version</div>
                <div className="text-2xl font-bold font-mono text-teal-300">
                  {currentBaseVersion}
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Calculated Next Release</div>
                <div className="text-2xl font-bold font-mono text-cyan-300">
                  {calculatedNextVersion}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{semverExplanation}</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-purple-900/50">
                <div className="text-xs text-purple-400 font-medium mb-1">Conventional Git Message</div>
                <div className="text-xs font-mono text-purple-200 mt-1 leading-snug break-all">
                  {sampleCommitMessage}
                </div>
              </div>
            </div>

            {/* Generated Dynamic Code */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Generated .github/workflows/ci.yml CI/CD Manifest:
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-teal-200 overflow-x-auto leading-relaxed">
                {generatedCiSnippet}
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
              4. Production Code Labs &amp; Release Automation
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade release engineering labs covering Conventional Commit parsing, multi-platform GitHub Actions CI workflows, issue templates, and the complete institutional release orchestrator:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: Conventional Commit Parsing &amp; SemVer Calculation Engine
                </h3>
                <p className="text-sm text-slate-400">
                  Parsing structured commit headers (<code className="text-teal-300 font-mono">feat(scope):</code>, <code className="text-teal-300 font-mono">fix(scope):</code>) and calculating next SemVer tags.
                </p>
              </div>
              <PythonFileLoader
                fileModule={conventionalCommitCode}
                title="conventional_commits_and_git_workflow.py"
                highlightLines={[18, 30, 48, 62]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: Multi-Platform GitHub Actions CI/CD Workflow Generator
                </h3>
                <p className="text-sm text-slate-400">
                  Generating multi-OS matrix testing pipelines across Ubuntu, Windows, and macOS with coverage quality gates.
                </p>
              </div>
              <PythonFileLoader
                fileModule={githubActionsCode}
                title="github_actions_ci_cd_workflow_generator.py"
                highlightLines={[14, 32, 52, 68]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: GitHub Issue &amp; Pull Request Templates Scaffolder
                </h3>
                <p className="text-sm text-slate-400">
                  Scaffolding structured Bug Report issue templates and Pull Request review checklists inside <code className="text-purple-300 font-mono">.github/</code>.
                </p>
              </div>
              <PythonFileLoader
                fileModule={issueTemplatesCode}
                title="issue_and_pr_templates_scaffolding.py"
                highlightLines={[12, 28, 44]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Complete Institutional GitHub Release Orchestrator Case Study
                </h3>
                <p className="text-sm text-slate-400">
                  Full release orchestration pipeline generating automated changelogs, SemVer tag creation, and wheel distribution assets for v1.0.0.
                </p>
              </div>
              <PythonFileLoader
                fileModule={releaseOrchestratorCode}
                title="institutional_github_release_orchestrator.py"
                highlightLines={[20, 36, 52, 68]}
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
              5. Publishing &amp; CI/CD Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Pushing Directly to Main
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Pushing directly to the production branch bypasses CI test runs and peer review, causing broken deployments.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: git push origin main{'\n'}
                # BEST PRACTICE: Protect main; require PR + CI pass
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Vague Commit Messages
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing commit messages like "fixes" or "updates" destroys project history and breaks automated changelogs.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: git commit -m "fixed stuff"{'\n'}
                # BEST PRACTICE: git commit -m "fix(ledger): correct tax rounding"
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Single-OS CI Testing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Running CI on Ubuntu only hides Windows filesystem backslash and encoding (<code className="text-rose-400 font-mono">CP1252</code>) crashes.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: matrix: os: [ubuntu-latest, windows-latest, macos-latest]
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Releases Without Binary Wheels
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Publishing Git tags without building and attaching <code className="text-rose-400 font-mono">.whl</code> artifacts forces slow builds during installation.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Build dist/*.whl and attach via action-gh-release
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
              6. Professional Publishing &amp; CI/CD Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Strict Conventional Commits:</strong> Format all commits as <code className="text-teal-300 font-mono">type(scope): description</code>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Multi-OS Matrix CI:</strong> Run automated tests across Ubuntu, Windows, and macOS with Python 3.10/3.11/3.12.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Enforce Branch Protection:</strong> Block direct pushes to <code className="text-teal-300 font-mono">main</code> and require passing CI status checks.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Publish Tagged Releases:</strong> Create annotated SemVer tags with automated changelogs and wheel assets.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="GitHub Publishing, Commits &amp; CI/CD FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: Publishing Projects to GitHub Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "A professional developer is defined by their release engineering discipline. In our institutional student management deployment pipeline across Barrackpore, Kolkata, Ichapur, and Jadavpur, using Conventional Commits, multi-OS GitHub Actions matrix testing, and automated SemVer release tagging guarantees that every feature update for Mamata, Mahima, and Susmita is thoroughly verified across Linux and Windows before rolling into production."
            }
          />
        </section>

      </div>
    </div>
  );
}
