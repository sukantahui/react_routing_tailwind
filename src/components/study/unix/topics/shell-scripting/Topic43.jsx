// Topic43.jsx
import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// ----------------------------------------------------------------------
// Inline raw XONSH installation scripts – would be separate .sh/.xsh files
// in a real project, imported via `?raw`. We embed them for self‑containment.
// ----------------------------------------------------------------------
const installUbuntuScript = `#!/bin/bash
# ----------------------------------------------------------------------
# Install XONSH on Ubuntu / Debian (Swadeep’s laptop)
# ----------------------------------------------------------------------
echo "📦 Installing XONSH via apt (Ubuntu 22.04+)"
sudo apt update
sudo apt install -y xonsh

# Verify installation
xonsh --version

# Launch xonsh as a test
xonsh -c "echo 'Hello from XONSH!'"
`;

const installPipScript = `#!/bin/bash
# ----------------------------------------------------------------------
# Install XONSH via pip (recommended for most users)
# ----------------------------------------------------------------------
# Tuhina prefers the latest version from PyPI
python3 -m pip install --user xonsh

# Add ~/.local/bin to PATH if not already there
export PATH="$HOME/.local/bin:$PATH"

# Check installation
xonsh --version

# Optional: install recommended tools for better experience
pip install --user xonsh[full]
`;

const installMacScript = `#!/bin/bash
# ----------------------------------------------------------------------
# Install XONSH on macOS (Intel/Apple Silicon)
# ----------------------------------------------------------------------
echo "🍏 Installing XONSH via Homebrew (used at Ichapur lab)"
brew update
brew install xonsh

# Or via pip
# python3 -m pip install --user xonsh

xonsh --version
`;

const verifyScript = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Quick verification script – run after installation
# ----------------------------------------------------------------------
import sys

print(f"XONSH version: {__xonsh__.version}")

# Test Python integration
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(f"Python comprehension works: {squares}")

# Test shell command
files = $(ls -la | head -3)
print("Shell command works, first 3 lines:")
print(files)
`;

// ----------------------------------------------------------------------
// Teacher's experience calculation (from 1998)
// ----------------------------------------------------------------------
const currentYear = new Date().getFullYear();
const teachingYears = currentYear - 1998;

// ----------------------------------------------------------------------
// Inline keyframes for zero‑config Tailwind animations
// ----------------------------------------------------------------------
const animationStyles = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes gentlePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.75; }
  }
  .animate-fadeSlideUp {
    animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
  }
  .animate-gentlePulse {
    animation: gentlePulse 3s ease-in-out infinite;
  }
`;

// ----------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------
const Topic43 = () => {
  return (
    <>
      <style>{animationStyles}</style>

      <div
        className={clsx(
          "max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8",
          "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
          "transition-colors duration-300"
        )}
      >
        {/* ----- HEADER (staggered) ----- */}
        <div className="space-y-3 mb-10 animate-fadeSlideUp [animation-delay:0ms]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-700">
              Topic 43
            </span>
            <span className="px-3 py-1 text-xs font-mono bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-700">
              XONSH Installation
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Installing XONSH:{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              From Zero to Python‑Powered Shell
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Choose your platform – Linux, macOS, Windows (WSL). XONSH is a
            single Python package. We'll cover the recommended methods and
            verify your installation with a smoke test.
          </p>
        </div>

        {/* ----- CONCEPTUAL EXPLANATION (staggered) ----- */}
        <section
          className={clsx(
            "mb-12 p-6 rounded-xl",
            "bg-gray-50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700",
            "animate-fadeSlideUp [animation-delay:100ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">📦</span> Installation fundamentals
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column – explanation */}
            <div className="space-y-4">
              <p className="leading-relaxed">
                XONSH is a Python application, so the most universal method is{" "}
                <code className="text-sm bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                  pip install --user xonsh
                </code>
                . This works everywhere Python 3.6+ is installed. For classroom
                labs (like <strong>Shyamnagar</strong> and <strong>Naihati</strong>
                ), system packages via <code>apt</code> or <code>brew</code> are
                easier to manage.
              </p>
              <p className="leading-relaxed">
                After installation, the <code>xonsh</code> executable is placed
                in your user’s binary directory (<code>~/.local/bin</code> or
                <code>~/Library/Python/.../bin</code>). <strong>Debangshu</strong>{" "}
                often forgets to add it to <code>$PATH</code> – we'll show the
                fix.
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded border-l-4 border-indigo-400">
                <span className="font-semibold">🧪 Verification is key</span>
                <p className="text-sm mt-1">
                  Always run <code>xonsh --version</code> and a small Python
                  command to confirm both shell and Python integration work.
                </p>
              </div>
            </div>

            {/* Right column – semantic SVG with <animate> (installation steps) */}
            <div className="flex items-center justify-center p-2 group">
              <svg
                width="300"
                height="160"
                viewBox="0 0 300 160"
                className="w-full max-w-xs"
                aria-label="XONSH installation steps"
              >
                {/* Step 1: pip/apt */}
                <rect
                  x="20"
                  y="20"
                  width="70"
                  height="50"
                  rx="8"
                  fill="#374151"
                  className="dark:fill-gray-700 group-hover:fill-indigo-800/50 transition-all duration-300"
                />
                <text x="30" y="50" fill="#E5E7EB" fontSize="12">
                  pip
                </text>
                <text x="30" y="70" fill="#E5E7EB" fontSize="12">
                  apt/brew
                </text>

                {/* Arrow with motion */}
                <line
                  x1="100"
                  y1="45"
                  x2="140"
                  y2="45"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="x1"
                    from="90"
                    to="110"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    from="130"
                    to="150"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </line>

                {/* Step 2: PATH adjustment */}
                <rect
                  x="150"
                  y="20"
                  width="70"
                  height="50"
                  rx="8"
                  fill="#374151"
                  className="dark:fill-gray-700 group-hover:fill-amber-800/50 transition-all duration-300"
                />
                <text x="160" y="50" fill="#E5E7EB" fontSize="10">
                  PATH
                </text>
                <text x="160" y="70" fill="#E5E7EB" fontSize="10">
                  ~/.local/bin
                </text>

                {/* Second arrow */}
                <line
                  x1="230"
                  y1="45"
                  x2="270"
                  y2="45"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="x1"
                    from="220"
                    to="240"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    from="260"
                    to="280"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </line>

                {/* Step 3: Verification */}
                <rect
                  x="10"
                  y="100"
                  width="280"
                  height="40"
                  rx="8"
                  fill="#4F46E5"
                  className="dark:fill-indigo-600 group-hover:fill-indigo-500 transition-all"
                />
                <text x="80" y="126" fill="white" fontSize="12" fontWeight="bold">
                  xonsh --version && xonsh -c "2+2"
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ----- CODE EXAMPLES (ShellFileLoader) ----- */}
        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-semibold mb-2 animate-fadeSlideUp [animation-delay:200ms]">
            🛠️ Platform‑specific recipes
          </h2>

          <div
            className={clsx(
              "grid md:grid-cols-2 gap-6",
              "animate-fadeSlideUp [animation-delay:300ms]"
            )}
          >
            <ShellFileLoader
              fileModule={installUbuntuScript}
              title="Ubuntu / Debian (apt)"
              highlightLines={[4, 8]}
            />
            <ShellFileLoader
              fileModule={installPipScript}
              title="Universal (pip, user install)"
              highlightLines={[4, 9]}
            />
          </div>
          <div
            className={clsx(
              "grid md:grid-cols-1 lg:grid-cols-2 gap-6",
              "animate-fadeSlideUp [animation-delay:400ms]"
            )}
          >
            <ShellFileLoader
              fileModule={installMacScript}
              title="macOS (Homebrew)"
              highlightLines={[4, 7]}
            />
            <ShellFileLoader
              fileModule={verifyScript}
              title="Post‑installation verification"
              highlightLines={[6, 10]}
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 italic">
            💡 Windows users: XONSH runs great under WSL2 – use the Ubuntu method
            inside your WSL distro.
          </div>
        </section>

        {/* ----- TIPS, PITFALLS, BEST PRACTICES (cards) ----- */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Tips card */}
          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:500ms]"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💡</span>
              <h3 className="font-semibold text-lg">Pro Tips</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  Use <code>pip install --user xonsh[full]</code> to get
                  additional prompt tools and syntax highlighting.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  After pip install, add{" "}
                  <code>export PATH="$HOME/.local/bin:$PATH"</code> to{" "}
                  <code>.bashrc</code> / <code>.zshrc</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  Keep XONSH updated: <code>pip install --user --upgrade xonsh</code>
                </span>
              </li>
            </ul>
          </div>

          {/* Common pitfalls card */}
          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:600ms]"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚠️</span>
              <h3 className="font-semibold text-lg">Common Pitfalls</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>“Command not found” after pip install</strong> – the
                  installation directory is not in <code>$PATH</code>. Locate it
                  with <code>python3 -m site --user-base</code> and append
                  <code>/bin</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Using sudo with pip</strong> – avoid it; system Python
                  conflicts may arise. Use <code>--user</code> or a virtual
                  environment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Old Python version</strong> – XONSH requires Python
                  3.6+. Check with <code>python3 --version</code>.
                </span>
              </li>
            </ul>
          </div>

          {/* Best practices card */}
          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:700ms]"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✅</span>
              <h3 className="font-semibold text-lg">Best Practices</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Always verify installation with a minimal script (see example).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  For team environments, provide an installation script (like
                  <code>install_xonsh.sh</code>) that sets up PATH and config.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Consider using <code>pipx</code> to install XONSH in an isolated
                  environment.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ----- MINI CHECKLIST ----- */}
        <section
          className={clsx(
            "mb-12 p-6 rounded-xl",
            "bg-indigo-50 dark:bg-indigo-900/20",
            "border border-indigo-200 dark:border-indigo-800",
            "animate-fadeSlideUp [animation-delay:800ms]"
          )}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span> Mini Checklist – Installation
            Readiness
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "I have Python 3.6+ installed (python3 --version).",
              "I installed XONSH via the recommended method for my OS.",
              "The `xonsh` command is found in my terminal.",
              "`xonsh --version` prints a version number.",
              "I can run a simple Python one‑liner: `xonsh -c 'print(42)'`",
              "I know how to update XONSH when a new version is released.",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-indigo-500 dark:text-indigo-300 mt-0.5">
                  ◻️
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ----- TEACHER'S NOTE (with hover effect) ----- */}
        <section
          className={clsx(
            "mb-10 p-6 rounded-xl",
            "bg-amber-50 dark:bg-amber-900/20",
            "border border-amber-200 dark:border-amber-800",
            "hover:shadow-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30",
            "transition-all duration-300",
            "animate-fadeSlideUp [animation-delay:900ms]"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🧑‍🏫</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Teacher's Note</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Sukanta Hui</strong> • {teachingYears} years of programming
                & systems education (since 1998)
                <br />
                <span className="font-mono text-xs">
                  sukantahui@codernaccotax.co.in • 📱 7003756860
                </span>
              </p>
              <p className="leading-relaxed">
                In our lab at <strong>Barrackpore</strong>, I've seen students
                like <strong>Tuhina</strong> struggle when they install XONSH via
                <code>sudo pip</code> and later face conflicts with system Python.
                Always demonstrate the <code>--user</code> flag first. Also,
                emphasise that <code>~/.local/bin</code> is often missing from
                PATH on fresh Ubuntu installations – it's a perfect chance to
                teach PATH manipulation (Topic 3). A five‑minute verification
                script saves hours of debugging later.
              </p>
            </div>
          </div>
        </section>

        {/* ----- HINT SECTION (subtle) ----- */}
        <div
          className={clsx(
            "text-sm p-5 rounded-lg",
            "bg-gray-100 dark:bg-gray-800/60",
            "border border-gray-300 dark:border-gray-600",
            "animate-fadeSlideUp [animation-delay:1000ms]"
          )}
        >
          <span className="font-semibold block mb-1">🔍 Observe carefully…</span>
          <p>
            When you run <code>pip install --user xonsh</code>, pip prints the
            installation path. Can you spot the line that says{" "}
            <em>“WARNING: The script xonsh is installed in ... which is not on
            PATH”</em>? That's your hint to update <code>$PATH</code>.
          </p>
        </div>

        {/* ----- FOOTER / CONTINUATION ----- */}
        <div className="mt-12 pt-6 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 text-center">
          <p>
            Next: <strong>Topic 44 – XONSH Basic Examples (10 examples)</strong> –
            your first interactive XONSH commands.
          </p>
        </div>
      </div>
    </>
  );
};

export default Topic43;