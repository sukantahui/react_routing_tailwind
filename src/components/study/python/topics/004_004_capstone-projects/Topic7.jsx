import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import resumeOptimizerCode from "./topic7_files/resume_ats_parser_and_keyword_optimizer.py?raw";
import portfolioEvaluatorCode from "./topic7_files/portfolio_project_curation_and_readme_evaluator.py?raw";
import starGeneratorCode from "./topic7_files/behavioral_star_interview_response_generator.py?raw";
import careerCaseCode from "./topic7_files/institutional_career_portfolio_audit_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic7_files/topic7_note.txt?raw";

// FAQ Questions
import questions from "./topic7_files/topic7_questions";

/**
 * Topic7: Resume and portfolio presentation strategies
 * Module: 004_004_capstone-projects
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic7() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("xyzFormula");

  // Interactive Laboratory State
  const [bulletQualityMode, setBulletQualityMode] = useState("PRO"); // AMATEUR | PRO

  let bulletText = "Architected a multi-campus student admission ledger engine with SQLite WAL persistence and Redis Cache-Aside, reducing query latency by 85% for 5,000 active records while maintaining 96% branch test coverage.";
  let atsMatchScore = "92.5% (High Match)";
  let hiringSignal = "Senior Craftsmanship: Clear quantifiable impact, architecture justification, and test metrics.";

  if (bulletQualityMode === "AMATEUR") {
    bulletText = "Worked on student fee management app and wrote Python code to save records in a database.";
    atsMatchScore = "38.0% (Low Match - Rejected by ATS)";
    hiringSignal = "Junior / Amateur Signal: Lacks metrics, no action verbs, missing architecture context.";
  } else {
    bulletText = "Architected a multi-campus student admission ledger engine with SQLite WAL persistence and Redis Cache-Aside, reducing query latency by 85% for 5,000 active records while maintaining 96% branch test coverage.";
    atsMatchScore = "92.5% (High Match - Top 5% ATS Tier)";
    hiringSignal = "Senior Craftsmanship: Google X-Y-Z formula, quantifiable business metrics, and testing rigor.";
  }

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
            Topic 7 (Capstone Finale)
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Capstone Projects, Portfolio &amp; Interview Mastery
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Resume &amp; Portfolio <span className="text-teal-400">Presentation Strategies</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master the art of software engineering resumes, GitHub portfolio curation, and technical interview storytelling: formulating quantified bullet points using the Google X-Y-Z formula (<code className="text-teal-300 font-mono">Accomplished [X] by [Y] doing [Z]</code>), beating Applicant Tracking Systems (ATS), curating top-tier GitHub capstone repositories, mastering the STAR behavioral interview framework, and navigating technical hiring loops with executive confidence.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Google X-Y-Z Resume Formula
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⭐ STAR Behavioral Interview Framework
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🌟 Top 3 Pinned GitHub Repositories
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🤖 ATS Keyword Optimization
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
              1. The Professional Career &amp; Portfolio Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Landing senior engineering roles requires presenting your technical abilities with mathematical clarity, structured storytelling, and verifiable proof of competence:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ Google X-Y-Z Formula</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">Impact = [X] + [Y] + [Z]</code>
                <p className="text-[11px] text-slate-300">
                  Accomplished [X], as measured by [Y] (metrics/percentages), by doing [Z] (concrete technical implementation).
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ High-Signal GitHub</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">Top 2-3 Pinned Repos</code>
                <p className="text-[11px] text-slate-300">
                  Curate 2-3 deep, tested (85%+ coverage), badge-decorated repositories with architecture diagrams rather than 50 toy scripts.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ STAR Interviewing</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Situation ➔ Action ➔ Result</code>
                <p className="text-[11px] text-slate-300">
                  Structure responses around real engineering challenges, root cause analysis, and measurable system outcomes.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-sm mb-1">4️⃣ ATS Optimization</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">Single-Column + Keywords</code>
                <p className="text-[11px] text-slate-300">
                  Clean, machine-parseable single-column layout matching job description keywords without confusing table graphics.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Anti-Pattern of Subjective Skill Bars
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Never put subjective percentage bars (e.g. <code className="text-rose-400 font-mono">Python: 90%</code>) on your resume! They confuse ATS parsers and tell recruiters nothing. Replace them with concrete quantified engineering accomplishments: <span className="text-emerald-400 font-bold">"Architected a Python multi-campus backend with 96% branch test coverage"</span>!
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
                2. Visualizing X-Y-Z Bullet Anatomy, GitHub Curation &amp; STAR Flow
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("xyzFormula")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "xyzFormula"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                Google X-Y-Z Formula
              </button>
              <button
                onClick={() => setActiveInteractiveTab("portfolioCuration")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "portfolioCuration"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                GitHub Portfolio Top 3
              </button>
              <button
                onClick={() => setActiveInteractiveTab("starMethod")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "starMethod"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              &gt;
                STAR Storytelling Cycle
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining resume bullet point deconstructions, high-signal GitHub pinning topologies, and behavioral interview arcs:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "xyzFormula" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">
                  DECONSTRUCTING THE GOOGLE X-Y-Z HIGH-IMPACT RESUME FORMULA
                </text>

                {/* Left: Component Breakdown */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#0f172a" stroke="#14b8a6" />

                  {/* Complete Sentence Header */}
                  <rect x="20" y="20" width="780" height="40" rx="4" fill="#042f2e" stroke="#0d9488" />
                  <text x="30" y="45" fill="#5eead4" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    "Architected a student ledger engine [X], cutting query latency by 85% [Y], by adding Redis Cache-Aside [Z]."
                  </text>

                  {/* Box X: Accomplishment */}
                  <rect x="20" y="80" width="245" height="140" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="30" y="105" fill="#ffffff" fontSize="11" fontWeight="bold">1. Accomplished [X]</text>
                  <text x="30" y="130" fill="#bae6fd" fontSize="9">The core technical project:</text>
                  <text x="30" y="150" fill="#e0f2fe" fontSize="8" fontFamily="monospace">• "Multi-campus admission engine"</text>
                  <text x="30" y="168" fill="#e0f2fe" fontSize="8" fontFamily="monospace">• "SQLite WAL persistence layer"</text>
                  <text x="30" y="200" fill="#facc15" fontSize="8" fontWeight="bold">Strong Action Verbs (Architected)</text>

                  {/* Box Y: Measured By */}
                  <rect x="285" y="80" width="250" height="140" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="295" y="105" fill="#5eead4" fontSize="11" fontWeight="bold">2. Measured By [Y]</text>
                  <text x="295" y="130" fill="#ccfbf1" fontSize="9">Quantified metrics &amp; impact:</text>
                  <text x="295" y="150" fill="#a7f3d0" fontSize="8" fontFamily="monospace">• "Reduced latency by 85%"</text>
                  <text x="295" y="168" fill="#a7f3d0" fontSize="8" fontFamily="monospace">• "Scaled to 5,000 active students"</text>
                  <text x="295" y="200" fill="#86efac" fontSize="8" fontWeight="bold">Numerical Proof of Value ✅</text>

                  {/* Box Z: By Doing */}
                  <rect x="555" y="80" width="245" height="140" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="565" y="105" fill="#f3e8ff" fontSize="11" fontWeight="bold">3. By Doing [Z]</text>
                  <text x="565" y="130" fill="#d8b4fe" fontSize="9">Specific engineering methodology:</text>
                  <text x="565" y="150" fill="#f3e8ff" fontSize="8" fontFamily="monospace">• "Redis Cache-Aside with Mutex"</text>
                  <text x="565" y="168" fill="#f3e8ff" fontSize="8" fontFamily="monospace">• "96% branch coverage with pytest"</text>
                  <text x="565" y="200" fill="#c084fc" fontSize="8" fontWeight="bold">Technical Depth &amp; Tooling</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "portfolioCuration" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">
                  HIGH-SIGNAL GITHUB PROFILE TOPOLOGY: PINNED CAPSTONE SHOWCASES
                </text>

                {/* Portfolio Grid */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#082f49" stroke="#0ea5e9" />

                  {/* Pinned Repo 1 */}
                  <rect x="25" y="35" width="240" height="180" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="35" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">📌 Pinned Repo 1 (Flagship)</text>
                  <text x="35" y="85" fill="#e0f2fe" fontSize="9" fontFamily="monospace">institutional-student-manager</text>
                  <text x="35" y="108" fill="#a7f3d0" fontSize="8">✓ 96% Coverage Badge</text>
                  <text x="35" y="125" fill="#a7f3d0" fontSize="8">✓ Mermaid Architecture Diagram</text>
                  <text x="35" y="142" fill="#a7f3d0" fontSize="8">✓ Google Docstrings + Mypy Strict</text>
                  <text x="35" y="159" fill="#a7f3d0" fontSize="8">✓ 1-line pip install Quickstart</text>
                  <text x="35" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Flagship Capstone Project</text>

                  {/* Pinned Repo 2 */}
                  <rect x="290" y="35" width="240" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="300" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">📌 Pinned Repo 2</text>
                  <text x="300" y="85" fill="#ccfbf1" fontSize="9" fontFamily="monospace">distributed-task-worker</text>
                  <text x="300" y="108" fill="#a7f3d0" fontSize="8">✓ Asyncio + Redis Queue</text>
                  <text x="300" y="125" fill="#a7f3d0" fontSize="8">✓ Multi-OS CI/CD Workflow</text>
                  <text x="300" y="142" fill="#a7f3d0" fontSize="8">✓ Token Bucket Rate Limiter</text>
                  <text x="300" y="159" fill="#a7f3d0" fontSize="8">✓ Benchmark Graph in README</text>
                  <text x="300" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Distributed Systems Depth</text>

                  {/* Profile README */}
                  <rect x="555" y="35" width="240" height="180" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="565" y="60" fill="#f3e8ff" fontSize="11" fontWeight="bold">👤 GitHub Profile README</text>
                  <text x="565" y="85" fill="#d8b4fe" fontSize="8">• Categorized Tech Stack Badges</text>
                  <text x="565" y="105" fill="#d8b4fe" fontSize="8">• Links to Live Demos &amp; Docs</text>
                  <text x="565" y="125" fill="#d8b4fe" fontSize="8">• Conventional Commit Activity</text>
                  <text x="565" y="145" fill="#d8b4fe" fontSize="8">• Professional Contact Links</text>
                  <text x="565" y="195" fill="#c084fc" fontSize="8" fontWeight="bold">Executive First Impression ✅</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">
                  THE STAR BEHAVIORAL INTERVIEW STORYTELLING CYCLE
                </text>

                {/* STAR Cycle */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="245" rx="8" fill="#1e1b4b" stroke="#a855f7" />

                  {/* S: Situation */}
                  <rect x="25" y="35" width="180" height="180" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
                  <text x="35" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">1. SITUATION (20%)</text>
                  <text x="35" y="85" fill="#bae6fd" fontSize="8">Set the context &amp; business stakes:</text>
                  <text x="35" y="115" fill="#e0f2fe" fontSize="8">"During peak admission week across Barrackpore and Kolkata campuses..."</text>
                  <text x="35" y="195" fill="#facc15" fontSize="8" fontWeight="bold">Context &amp; Constraints</text>

                  {/* T: Task */}
                  <rect x="220" y="35" width="180" height="180" rx="6" fill="#0369a1" stroke="#38bdf8" />
                  <text x="230" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">2. TASK (15%)</text>
                  <text x="230" y="85" fill="#bae6fd" fontSize="8">Your specific ownership:</text>
                  <text x="230" y="115" fill="#e0f2fe" fontSize="8">"I needed to eliminate SQLite database lock timeouts under 50 concurrent transactions."</text>
                  <text x="230" y="195" fill="#facc15" fontSize="8" fontWeight="bold">Goal Definition</text>

                  {/* A: Action */}
                  <rect x="415" y="35" width="190" height="180" rx="6" fill="#042f2e" stroke="#2dd4bf" />
                  <text x="425" y="60" fill="#5eead4" fontSize="11" fontWeight="bold">3. ACTION (50%)</text>
                  <text x="425" y="85" fill="#ccfbf1" fontSize="8">The core engineering solution:</text>
                  <text x="425" y="110" fill="#a7f3d0" fontSize="8">• Enabled SQLite WAL Mode</text>
                  <text x="425" y="125" fill="#a7f3d0" fontSize="8">• Added Transaction Contexts</text>
                  <text x="425" y="140" fill="#a7f3d0" fontSize="8">• Implemented Redis Caching</text>
                  <text x="425" y="195" fill="#86efac" fontSize="8" fontWeight="bold">Technical Execution</text>

                  {/* R: Result */}
                  <rect x="620" y="35" width="175" height="180" rx="6" fill="#3b0764" stroke="#c084fc" />
                  <text x="630" y="60" fill="#f3e8ff" fontSize="11" fontWeight="bold">4. RESULT (15%)</text>
                  <text x="630" y="85" fill="#d8b4fe" fontSize="8">Quantified business outcome:</text>
                  <text x="630" y="110" fill="#86efac" fontSize="8">• 0% lock errors</text>
                  <text x="630" y="125" fill="#86efac" fontSize="8">• 4x throughput</text>
                  <text x="630" y="140" fill="#86efac" fontSize="8">• 3,500 admissions ✅</text>
                  <text x="630" y="195" fill="#c084fc" fontSize="8" fontWeight="bold">Measurable Impact</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE RESUME & STAR STORY EVALUATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧪</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Resume Bullet &amp; STAR Story Evaluator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Toggle between an amateur resume draft and a senior quantified Google X-Y-Z bullet point to see real-time ATS match scoring and recruiter impression analysis:
          </p>

          <div className="bg-slate-950 p-5 sm:p-6 rounded-xl border border-slate-800/90 space-y-6">
            {/* Quality Mode Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Resume Bullet Point Version:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setBulletQualityMode("AMATEUR")}
                  className={clsx(
                    "p-3 rounded-xl border text-left transition-all",
                    bulletQualityMode === "AMATEUR"
                      ? "bg-rose-950/60 border-rose-500 shadow-md shadow-rose-950/50"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  )}
                &gt;
                  <div className="text-xs font-bold text-slate-200">❌ Amateur / Junior Draft</div>
                  <div className="text-[10px] text-rose-400 font-mono mt-0.5">Vague, unquantified, passive wording</div>
                </button>

                <button
                  onClick={() => setBulletQualityMode("PRO")}
                  className={clsx(
                    "p-3 rounded-xl border text-left transition-all",
                    bulletQualityMode === "PRO"
                      ? "bg-teal-950/60 border-teal-500 shadow-md shadow-teal-950/50"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  )}
                &gt;
                  <div className="text-xs font-bold text-slate-200">✅ Senior Google X-Y-Z Bullet</div>
                  <div className="text-[10px] text-teal-400 font-mono mt-0.5">Quantified metrics, action verbs, testing rigor</div>
                </button>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-teal-900/50">
                <div className="text-xs text-teal-400 font-medium mb-1">ATS Parser Keyword Match</div>
                <div className="text-xl font-bold font-mono text-teal-300">{atsMatchScore}</div>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-900/50">
                <div className="text-xs text-cyan-400 font-medium mb-1">Hiring Manager Perception</div>
                <div className="text-xs text-slate-300 leading-snug">{hiringSignal}</div>
              </div>
            </div>

            {/* Resume Bullet Display */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Resume Bullet Point Preview:
              </div>
              <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-teal-200 overflow-x-auto leading-relaxed">
                • {bulletText}
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
              4. Production Code Labs &amp; Career Audit Suites
            </h2>
          </div>

          <p className="text-slate-300 mb-8 text-base leading-relaxed">
            Inspect, run, and master all four production-grade career optimization labs covering ATS keyword matching, automated GitHub README grading, STAR interview script generation, and institutional candidate evaluations:
          </p>

          <div className="space-y-10">
            {/* Python Loader 1 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-teal-300">
                  Lab 1: ATS Resume Parser &amp; Google X-Y-Z Formula Optimizer
                </h3>
                <p className="text-sm text-slate-400">
                  Extracting keywords, identifying power action verbs, and scoring quantified metric density in resume bullet points.
                </p>
              </div>
              <PythonFileLoader
                fileModule={resumeOptimizerCode}
                title="resume_ats_parser_and_keyword_optimizer.py"
                highlightLines={[18, 30, 44, 58]}
              />
            </div>

            {/* Python Loader 2 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-cyan-300">
                  Lab 2: GitHub Portfolio Curation &amp; README Quality Evaluator
                </h3>
                <p className="text-sm text-slate-400">
                  Grading open-source repository manifests on CI status badges, test coverage %, quickstart guides, and architecture diagrams.
                </p>
              </div>
              <PythonFileLoader
                fileModule={portfolioEvaluatorCode}
                title="portfolio_project_curation_and_readme_evaluator.py"
                highlightLines={[16, 28, 44, 58]}
              />
            </div>

            {/* Python Loader 3 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-purple-300">
                  Lab 3: Behavioral STAR Interview Script Generator
                </h3>
                <p className="text-sm text-slate-400">
                  Generating structured behavioral interview scripts covering difficult production bugs, concurrency bottlenecks, and quantified outcomes.
                </p>
              </div>
              <PythonFileLoader
                fileModule={starGeneratorCode}
                title="behavioral_star_interview_response_generator.py"
                highlightLines={[16, 28, 40]}
              />
            </div>

            {/* Python Loader 4 */}
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-bold text-amber-300">
                  Lab 4: Complete Institutional Career &amp; Portfolio Audit Suite
                </h3>
                <p className="text-sm text-slate-400">
                  Full hiring readiness engine evaluating portfolio projects, test coverage, and mock interview scores for Mamata, Mahima, and Susmita across Barrackpore and Kolkata.
                </p>
              </div>
              <PythonFileLoader
                fileModule={careerCaseCode}
                title="institutional_career_portfolio_audit_suite.py"
                highlightLines={[18, 32, 48, 62]}
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
              5. Resume &amp; Portfolio Pitfalls &amp; Anti-Patterns
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pitfall 1 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                1. Subjective Skill Percentage Bars
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Adding "Python 90%" or "SQL 80%" meters conveys zero technical information and confuses ATS parsers.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # ANTI-PATTERN: "Python: 85%" (Meaningless!){'\n'}
                # BEST PRACTICE: "Engineered Python API with 96% coverage"
              </pre>
            </div>

            {/* Pitfall 2 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                2. Dozens of Unfinished Toy Repositories
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Flooding your public GitHub with 50 abandoned, undocumented tutorial clones creates a chaotic, junior impression.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Pin top 2-3 deep, tested capstone projects
              </pre>
            </div>

            {/* Pitfall 3 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                3. Vague Unquantified Resume Bullets
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Writing "Worked on database" fails to communicate the technical complexity, scale, or business value you delivered.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Apply Google X-Y-Z: "Cut latency by 85% for 5k records"
              </pre>
            </div>

            {/* Pitfall 4 */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
              <h3 className="text-rose-300 font-bold text-base mb-1">
                4. Omitting Test Coverage &amp; Badges
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Publishing repositories without automated test suites or coverage badges signals that you only write untested prototype scripts.
              </p>
              <pre className="text-[11px] font-mono bg-slate-950/80 p-2 rounded text-rose-300">
                # FIX: Include pytest-cov badge (--cov-fail-under=85)
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
              6. Career &amp; Portfolio Presentation Checklist
            </h2>
          </div>

          <div className="space-y-3 text-slate-300 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Use Google X-Y-Z Formula:</strong> Quantify every resume bullet with metrics, percentages, and concrete technical actions.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Pin Top 2-3 Flagship Repositories:</strong> Ensure each pinned repository has 85%+ coverage badges, quickstarts, and diagrams.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Structure Stories with STAR:</strong> Answer behavioral questions with Situation, Task, Action, and Quantified Result.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">✓</span>
              <div>
                <strong className="text-white">Maintain Clean Single-Column Resumes:</strong> Format for seamless ATS parsing with categorized technical skills.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQS */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <FAQTemplate
            title="Resume, Portfolio &amp; Career Presentation FAQs"
            questions={questions}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: PLAIN TEXT PRINT & DOWNLOAD NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <PlainTextPrint
            content={noteText}
            title="Topic 7: Resume and Portfolio Presentation Strategies Study Note"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Study Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 9: TEACHER'S NOTE */}
        {/* ------------------------------------------------------------------ */}
        <section ref={addToRefs} className="section-hidden">
          <Teacher
            note={
              "Technical mastery is only half the battle; the other half is communicating your engineering impact with clarity, precision, and humility. By mastering clean directory architecture, persistence, logging, documentation, CI/CD, algorithms, and system design across our capstone modules for Mamata, Mahima, and Susmita in Barrackpore, Kolkata, Ichapur, and Jadavpur, you now possess the complete toolkit to build world-class Python software and ace any technical interview in the industry."
            }
          />
        </section>

      </div>
    </div>
  );
}
