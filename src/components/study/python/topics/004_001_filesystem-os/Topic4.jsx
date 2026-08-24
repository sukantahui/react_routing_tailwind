import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import sysArgvCode from "./topic4_files/sys_argv_raw_argument_parsing.py?raw";
import argparsePosCode from "./topic4_files/argparse_positional_and_optional_arguments.py?raw";
import subcommandsCode from "./topic4_files/argparse_subcommands_and_custom_validators.py?raw";
import cliSuiteCode from "./topic4_files/institutional_accotax_cli_suite.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic4_files/topic4_note.txt?raw";

// FAQ Questions
import questions from "./topic4_files/topic4_questions";

/**
 * Topic4: Command-line arguments parsing: sys.argv & argparse module
 * Module: 004_001_filesystem-os
 * Segment: 4 (Python Pro Level & Ecosystem Mastery)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic4() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("tokenStream");

  // Interactive Laboratory State
  const [subcommand, setSubcommand] = useState("audit"); // enroll | audit | backup
  const [campus, setCampus] = useState("barrackpore");
  const [format, setFormat] = useState("table"); // table | json | csv
  const [isDryRun, setIsDryRun] = useState(false);
  const [isVerbose, setIsVerbose] = useState(true);

  // Dynamic CLI Command Generator
  let cliCommandStr = `accotax-admin ${subcommand}`;
  let parsedNamespace = { command: subcommand };
  let simulatedOutput = "";

  if (subcommand === "enroll") {
    cliCommandStr += ` --id STU-101 --name "Sourav Mukherjee" --campus ${campus}`;
    if (isVerbose) cliCommandStr += " --verbose";
    parsedNamespace = {
      command: "enroll",
      id: "STU-101",
      name: "Sourav Mukherjee",
      campus: campus,
      verbose: isVerbose,
    };
    simulatedOutput = `[ENROLL SERVICE] Registering candidate in database:
* Student ID   : STU-101
* Legal Name   : Sourav Mukherjee
* Campus Node  : ${campus.toUpperCase()} Main Center
* Tuition Fee  : INR 30,000.00
[STATUS] Candidate enrolled successfully. Exit Code: 0`;
  } else if (subcommand === "audit") {
    cliCommandStr += ` --year 2026 --campus ${campus} --format ${format}`;
    if (isVerbose) cliCommandStr += " --verbose";
    parsedNamespace = {
      command: "audit",
      year: 2026,
      campus: campus,
      format: format,
      verbose: isVerbose,
    };

    if (format === "json") {
      simulatedOutput = `{\n  "fiscal_year": 2026,\n  "campus": "${campus}",\n  "records": [\n    {"id": "STU-101", "name": "Sourav", "fee": "CLEARED"}\n  ]\n}`;
    } else if (format === "csv") {
      simulatedOutput = `id,name,campus,fee_status\nSTU-101,Sourav Mukherjee,${campus},CLEARED`;
    } else {
      simulatedOutput = `[AUDIT SERVICE - FISCAL YEAR 2026]\nID         STUDENT NAME           CAMPUS        FEE STATUS\n----------------------------------------------------------\nSTU-101    Sourav Mukherjee       ${campus.padEnd(13)} CLEARED`;
    }
  } else {
    // backup
    cliCommandStr += ` --campus ${campus}`;
    if (isDryRun) cliCommandStr += " --dry-run";
    if (isVerbose) cliCommandStr += " --verbose";
    parsedNamespace = {
      command: "backup",
      campus: campus,
      dry_run: isDryRun,
      verbose: isVerbose,
    };
    simulatedOutput = `[BACKUP SERVICE] Initiating snapshot for '${campus}':\n${
      isDryRun
        ? "* [DRY-RUN MODE] Simulated backup successfully. 0 bytes written."
        : "* Snapshot created and compressed archive stored in vault."
    }\n[STATUS] Exit Code: 0`;
  }

  const generatedPythonParserCode = `# Standard argparse configuration:
parser = argparse.ArgumentParser(prog="accotax-admin")
subparsers = parser.add_subparsers(dest="command", required=True)

# '${subcommand}' subcommand:
sub_p = subparsers.add_parser("${subcommand}")
${
  subcommand === "enroll"
    ? `sub_p.add_argument("--id", required=True)\nsub_p.add_argument("--name", required=True)\nsub_p.add_argument("--campus", choices=["barrackpore", "kolkata"], default="barrackpore")`
    : subcommand === "audit"
    ? `sub_p.add_argument("--year", type=int, default=2026)\nsub_p.add_argument("--format", choices=["table", "json", "csv"], default="table")`
    : `sub_p.add_argument("--campus", choices=["barrackpore", "kolkata", "all"], default="all")\nsub_p.add_argument("--dry-run", action="store_true")`
}
sub_p.add_argument("-v", "--verbose", action="store_true")`;

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
            Segment 4 • Module 004_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 4
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Advanced File Operations, OS &amp; Subprocess Automation
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          CLI Engineering: <span className="text-teal-400">sys.argv &amp; argparse Module</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master command-line interface development in Python: low-level token unpacking with <code className="text-teal-300 font-mono">sys.argv</code>, professional CLI construction with <code className="text-cyan-300 font-mono">argparse.ArgumentParser</code>, automatic type coercion (<code className="text-purple-300 font-mono">type=int, Path</code>), boolean switches (<code className="text-amber-300 font-mono">action='store_true'</code>), multi-command subparser routing (<code className="text-teal-300 font-mono">add_subparsers</code>), and auto-generated <code className="text-emerald-400 font-mono">--help</code> manuals.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📜 `sys.argv` Token Stream
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛠️ `argparse.ArgumentParser`
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔀 Subcommand Routing
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ `action='store_true'`
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: CLI FOUNDATIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⌨️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Command-Line Interface Engineering Architecture
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Building robust command-line tools requires transitioning from brittle string indexing to standard declarative CLI parsers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-sm mb-1">1️⃣ `sys.argv` Raw Tokens</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">sys.argv[0], sys.argv[1:]</code>
                <p className="text-[11px] text-slate-300">
                  Raw string list provided by the OS. Useful for quick 1-line scripts, but lacks type casting and help docs.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-sm mb-1">2️⃣ Declarative `argparse`</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">add_argument("-c", type=...)</code>
                <p className="text-[11px] text-slate-300">
                  Standard library CLI engine. Handles automatic type casting, short/long flags, defaults, and choices.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-sm mb-1">3️⃣ Subcommand Dispatch</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">add_subparsers(dest="cmd")</code>
                <p className="text-[11px] text-slate-300">
                  Builds modular multi-command tools (e.g. <code className="text-purple-300 font-mono">accotax enroll</code> vs <code className="text-purple-300 font-mono">audit</code>).
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Raw String Trap in `sys.argv`
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-mono">
                Tokens in <code className="text-rose-400 font-mono">sys.argv</code> are ALWAYS raw strings! If you execute <code className="text-teal-300 font-mono">python script.py 50</code>, <code className="text-rose-400 font-mono">sys.argv[1]</code> evaluates to <code className="text-rose-400 font-mono">"50"</code> (string), not integer <code className="text-emerald-400 font-mono">50</code>! <code className="text-teal-300 font-mono">argparse(type=int)</code> automatically coerces and validates types.
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
                2. Visualizing CLI Token Streams, Subparser Dispatch &amp; Argument Flags
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("tokenStream")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "tokenStream"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                `sys.argv` Token Stream
              </button>
              <button
                onClick={() => setActiveInteractiveTab("subparserRoute")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "subparserRoute"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Subparser Routing
              </button>
              <button
                onClick={() => setActiveInteractiveTab("exclusiveFlags")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "exclusiveFlags"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Mutually Exclusive Flags
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining CLI argument token streams, hierarchical subcommand routing, and mutually exclusive group validations:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "tokenStream" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">COMMAND-LINE STRING TOKEN STREAM TO `sys.argv`</text>

                {/* Command Line Input String */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="55" rx="6" fill="#090d16" stroke="#14b8a6" />
                  <text x="20" y="32" fill="#38bdf8" fontSize="13 font-mono">
                    python accotax.py enroll STU-101 --campus kolkata --limit 100 --dry-run
                  </text>
                </g>

                {/* Token Decomposition Boxes */}
                <g transform="translate(30, 120)">
                  {/* argv[0] */}
                  <rect x="0" y="0" width="130" height="160" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">`sys.argv[0]`</text>
                  <text x="15" y="60" fill="#34d399" fontSize="9 font-mono">"accotax.py"</text>
                  <text x="15" y="85" fill="#cbd5e1" fontSize="8">Script Entrypoint</text>
                  <text x="15" y="105" fill="#38bdf8" fontSize="8 font-mono">Always String</text>

                  {/* argv[1] */}
                  <rect x="145" y="0" width="125" height="160" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="160" y="30" fill="#a5f3fc" fontSize="11 font-bold">`sys.argv[1]`</text>
                  <text x="160" y="60" fill="#38bdf8" fontSize="9 font-mono">"enroll"</text>
                  <text x="160" y="85" fill="#cbd5e1" fontSize="8">Subcommand</text>
                  <text x="160" y="105" fill="#38bdf8" fontSize="8 font-mono">Positional</text>

                  {/* argv[2] */}
                  <rect x="285" y="0" width="125" height="160" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="300" y="30" fill="#a5f3fc" fontSize="11 font-bold">`sys.argv[2]`</text>
                  <text x="300" y="60" fill="#38bdf8" fontSize="9 font-mono">"STU-101"</text>
                  <text x="300" y="85" fill="#cbd5e1" fontSize="8">Candidate ID</text>
                  <text x="300" y="105" fill="#38bdf8" fontSize="8 font-mono">Validated</text>

                  {/* argv[3..4] */}
                  <rect x="425" y="0" width="190" height="160" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="440" y="30" fill="#c4b5fd" fontSize="11 font-bold">`sys.argv[3:5]`</text>
                  <text x="440" y="60" fill="#c084fc" fontSize="9 font-mono">"--campus", "kolkata"</text>
                  <text x="440" y="85" fill="#cbd5e1" fontSize="8">Optional Key-Value</text>
                  <text x="440" y="105" fill="#34d399" fontSize="8 font-mono">choices constraint</text>

                  {/* argv[5..6] */}
                  <rect x="630" y="0" width="190" height="160" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="645" y="30" fill="#c4b5fd" fontSize="11 font-bold">`sys.argv[5:7]`</text>
                  <text x="645" y="60" fill="#c084fc" fontSize="9 font-mono">"--dry-run"</text>
                  <text x="645" y="85" fill="#cbd5e1" fontSize="8">Boolean Switch Flag</text>
                  <text x="645" y="105" fill="#34d399" fontSize="8 font-mono">action='store_true'</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "subparserRoute" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">ARGPARSE SUBCOMMAND ROUTING &amp; DISPATCH PIPELINE</text>

                {/* Root CLI Box */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="820" height="60" rx="6" fill="#090d16" stroke="#06b6d4" />
                  <text x="20" y="35" fill="#a5f3fc" fontSize="13 font-mono">
                    Root Parser: `accotax-admin` -&gt; `add_subparsers(dest="command")`
                  </text>
                </g>

                {/* Subcommand Branches */}
                <g transform="translate(30, 130)">
                  {/* Branch 1: enroll */}
                  <rect x="0" y="0" width="250" height="150" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="11 font-bold">`subparsers.add_parser('enroll')`</text>
                  <text x="15" y="60" fill="#34d399" fontSize="8 font-mono">--id STU-101 (Required)</text>
                  <text x="15" y="80" fill="#34d399" fontSize="8 font-mono">--name "Sourav" (Required)</text>
                  <text x="15" y="100" fill="#cbd5e1" fontSize="8">Handler: `handle_enroll(args)`</text>

                  {/* Branch 2: audit */}
                  <rect x="280" y="0" width="250" height="150" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="295" y="30" fill="#a5f3fc" fontSize="11 font-bold">`subparsers.add_parser('audit')`</text>
                  <text x="295" y="60" fill="#38bdf8" fontSize="8 font-mono">--year 2026 (type=int)</text>
                  <text x="295" y="80" fill="#38bdf8" fontSize="8 font-mono">--format table|json|csv</text>
                  <text x="295" y="100" fill="#cbd5e1" fontSize="8">Handler: `handle_audit(args)`</text>

                  {/* Branch 3: backup */}
                  <rect x="560" y="0" width="260" height="150" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="575" y="30" fill="#c4b5fd" fontSize="11 font-bold">`subparsers.add_parser('backup')`</text>
                  <text x="575" y="60" fill="#c084fc" fontSize="8 font-mono">--campus bkp|kol|all</text>
                  <text x="575" y="80" fill="#c084fc" fontSize="8 font-mono">--dry-run (action='store_true')</text>
                  <text x="575" y="100" fill="#cbd5e1" fontSize="8">Handler: `handle_backup(args)`</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">MUTUALLY EXCLUSIVE ARGUMENT GROUPS</text>

                {/* Left: Conflicting Flags */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Passing Conflicting Flags [REJECTED]</text>
                  
                  <text x="20" y="65" fill="#fca5a5" fontSize="8 font-mono">`accotax audit --json --csv`</text>
                  <text x="20" y="85" fill="#fca5a5" fontSize="8 font-mono">❌ User requested conflicting formats simultaneously</text>
                  <text x="20" y="105" fill="#f43f5e" fontSize="8 font-mono font-bold">argparse raises error: argument --csv: not allowed with argument --json</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#090d16" stroke="#e11d48" />
                  <text x="30" y="155" fill="#fda4af" fontSize="9 font-bold">Automatic CLI Defense:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Prevents contradictory backend processing states.</text>
                </g>

                {/* Right: Valid Exclusive Flag */}
                <g transform="translate(470, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Passing Single Format Flag [ACCEPTED]</text>

                  <text x="20" y="65" fill="#34d399" fontSize="8 font-mono">`accotax audit --json`</text>
                  <text x="20" y="85" fill="#34d399" fontSize="8 font-mono">✅ `args.json == True`, `args.csv == False`</text>
                  <text x="20" y="105" fill="#34d399" fontSize="8 font-mono font-bold">Clean Unambiguous Dispatch</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="9 font-bold">Deterministic Flow:</text>
                  <text x="30" y="175" fill="#cbd5e1" fontSize="8">Routes cleanly to single target serialization format.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CLI BUILDER LABORATORY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive CLI Invocation &amp; Argument Parser Laboratory
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select subcommands, toggle flags, configure formats, inspect the generated terminal invocation string, and observe parsed namespace outputs:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              {/* Subcommand Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  1. Operational Subcommand:
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {["enroll", "audit", "backup"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSubcommand(sub)}
                      className={clsx(
                        "flex-1 py-1.5 rounded transition-all uppercase font-bold",
                        subcommand === sub
                          ? "bg-teal-900/60 text-teal-300 border border-teal-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campus Flag */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  2. Campus Flag (`--campus`):
                </span>
                <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {["barrackpore", "kolkata"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCampus(c)}
                      className={clsx(
                        "flex-1 py-1 rounded transition-all capitalize",
                        campus === c
                          ? "bg-cyan-900/60 text-cyan-300 font-bold border border-cyan-700/80"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Flag (When Audit) */}
              {subcommand === "audit" && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                    3. Output Format (`--format`):
                  </span>
                  <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                    {["table", "json", "csv"].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setFormat(fmt)}
                        className={clsx(
                          "flex-1 py-1 rounded transition-all uppercase",
                          format === fmt
                            ? "bg-purple-900/60 text-purple-300 font-bold border border-purple-700/80"
                            : "text-slate-400 hover:text-white"
                        )}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 p-2 rounded border border-slate-800">
                  <input
                    type="checkbox"
                    checked={isVerbose}
                    onChange={(e) => setIsVerbose(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>Verbose Mode (`-v`)</span>
                </label>
                {subcommand === "backup" && (
                  <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 p-2 rounded border border-slate-800">
                    <input
                      type="checkbox"
                      checked={isDryRun}
                      onChange={(e) => setIsDryRun(e.target.checked)}
                      className="accent-teal-500 rounded"
                    />
                    <span>Dry-Run Mode (`--dry-run`)</span>
                  </label>
                )}
              </div>

              {/* Live Invocation Box */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Constructed CLI Command:</div>
                <div className="text-teal-300 text-[11px] break-all font-bold">
                  $ {cliCommandStr}
                </div>
              </div>
            </div>

            {/* Generated Code & Terminal Output */}
            <div className="space-y-4 flex flex-col justify-between">
              {/* Python Code Display */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Generated Python argparse Code:
                </div>
                <pre className="text-teal-300 text-[11px] leading-relaxed break-all font-mono overflow-x-auto">
                  {generatedPythonParserCode}
                </pre>
              </div>

              {/* Terminal Telemetry */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex-1 overflow-y-auto max-h-[160px] font-mono text-xs space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Simulated CLI Execution Output:</span>
                  <span className="text-emerald-400">Exit Code 0</span>
                </div>
                <pre className="text-slate-200 text-[11px] leading-relaxed font-mono whitespace-pre-wrap">
                  {simulatedOutput}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER ARGPARSE MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master `argparse` Parameter Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Parameter / Method</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Type / Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">`action="store_true"`</td>
                  <td className="py-3 px-4 text-slate-200">Boolean Switch</td>
                  <td className="py-3 px-4 text-emerald-400">`bool` (`False` -&gt; `True`)</td>
                  <td className="py-3 px-4">Flags like `--verbose`, `--dry-run`, `--force`</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">`type=int` / `type=Path`</td>
                  <td className="py-3 px-4 text-slate-200">Type Coercion</td>
                  <td className="py-3 px-4 text-cyan-300">Automatic Cast</td>
                  <td className="py-3 px-4">Coercing port numbers, file paths, and counts</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">`choices=['a', 'b']`</td>
                  <td className="py-3 px-4 text-slate-200">Validation</td>
                  <td className="py-3 px-4 text-purple-300">Restricted Set</td>
                  <td className="py-3 px-4">Limiting values to allowed enums (e.g. `--format`)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">`add_subparsers()`</td>
                  <td className="py-3 px-4 text-slate-200">Subcommand Routing</td>
                  <td className="py-3 px-4 text-emerald-400">`_SubParsersAction`</td>
                  <td className="py-3 px-4">Multi-command CLI suites (Git/Docker style)</td>
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
            Explore 4 production-grade Python scripts demonstrating raw sys.argv parsing, positional/optional flags, subcommands, and institutional CLI operations suites:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "sys_argv_raw_argument_parsing.py",
                code: sysArgvCode,
                description: "sys.argv token handling, manual flag parsing, and type casting.",
              },
              {
                filename: "argparse_positional_and_optional_arguments.py",
                code: argparsePosCode,
                description: "ArgumentParser, positional/optional arguments, types, and choices.",
              },
              {
                filename: "argparse_subcommands_and_custom_validators.py",
                code: subcommandsCode,
                description: "subparsers, mutually exclusive groups, and custom validator functions.",
              },
              {
                filename: "institutional_accotax_cli_suite.py",
                code: cliSuiteCode,
                description: "Multi-command routing, subparsers, and formatted CLI table outputs.",
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
                <span>❌</span> Trap 1: Assuming `sys.argv` Converts Types
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Tokens in <code className="text-rose-300 font-mono">sys.argv</code> are strings. If a user passes <code className="text-slate-300">50</code>, comparing <code className="text-rose-300 font-mono">sys.argv[1] == 50</code> returns <code className="text-rose-300 font-mono">False</code>!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Use <code className="text-emerald-300">argparse(type=int)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Direct `sys.argv[1]` Indexing
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Accessing <code className="text-amber-300 font-mono">sys.argv[1]</code> when no arguments are passed crashes with <code className="text-slate-300 font-mono">IndexError: list index out of range</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">argparse</code> to handle required arguments gracefully.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Omission of `action='store_true'`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Adding <code className="text-purple-300 font-mono">parser.add_argument('--verbose')</code> requires the user to pass a value (<code className="text-slate-300">--verbose True</code>) instead of acting as a boolean switch.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Specify <code className="text-emerald-300">action='store_true'</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Parsing CLI Inside Library Code
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Running <code className="text-cyan-300 font-mono">parser.parse_args()</code> at module top-level breaks imports when other modules import the file.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Guard under <code className="text-emerald-300">if __name__ == '__main__':</code>.
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
            Comprehensive question-and-answer repository covering sys.argv, ArgumentParser, positional/optional flags, subparsers, and custom validators:
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
            Download or print the complete reference sheet with CLI engineering patterns, argparse recipes, and subcommand routing templates:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic4_argparse_cli_notes.txt"
              title="Print Topic 4 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
