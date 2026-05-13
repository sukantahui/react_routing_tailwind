import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// FAQ questions for this topic (moderate to expert)
import questions from "./topic0_files/topic0_questions";

// Shell script example: check vi/vim availability on any Unix/Linux system
import checkViScript from "./topic0_files/check_vi.sh?raw";

/**
 * Topic0 Component – "Why vi/vim? – ubiquity on all Unix/Linux systems"
 *
 * Purpose:
 *   Explain why vi (and its modern incarnation vim) is the most reliable and
 *   universally available text editor across every Unix/Linux system.
 *
 * When & Why Used:
 *   - System recovery (single‑user mode, live CDs)
 *   - Minimal container environments (Alpine, BusyBox)
 *   - Remote server administration via SSH (no GUI)
 *   - Editing config files in rescue shells
 *   - Learning one editor that works everywhere, from embedded to mainframe.
 *
 * Return:
 *   A full‑width, accessible React component with dark mode support,
 *   section‑based reveal animations, and interactive SVG illustrations.
 */
const Topic0 = () => {
  // Dynamic teacher experience: started career in 1998
  const currentYear = new Date().getFullYear();
  const teacherExperience = currentYear - 1998;

  return (
    <div
      className={clsx(
        "w-full max-w-5xl mx-auto px-4 py-10 space-y-10",
        "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200",
        "transition-colors duration-300"
      )}
    >
      {/* =========================  HEADER SECTION ========================= */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationFillMode: "both" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-emerald-700 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
          Why vi / vim?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          The one text editor that is guaranteed to be on <strong>every</strong> Unix/Linux system.
        </p>
        <div className="h-1 w-20 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-3" />
      </div>

      {/* =========================  UBIQUITY EXPLANATION ========================= */}
      <div
        className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <span className="text-emerald-600 dark:text-emerald-400">✓</span> The "Universal Editor"
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3 leading-relaxed">
            <p>
              From minimal Alpine Linux containers to full‑blown RHEL servers, from FreeBSD jails to macOS
              terminals – <strong className="text-emerald-600 dark:text-emerald-400">vi</strong> (or its modern
              incarnation <strong className="text-emerald-600 dark:text-emerald-400">vim</strong>) is the only
              editor you can always count on.
            </p>
            <p>
              It is part of the <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">POSIX</span>{" "}
              specification, which means any compliant Unix system <em>must</em> provide it. Even when graphics
              are absent, libraries are missing, or the system is in emergency mode – vi is right there.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
              <p className="font-medium text-emerald-800 dark:text-emerald-300">
                🧠 Industry mindset:
              </p>
              <p className="text-sm">
                “Train on vi once, work on any server for the next 30 years.” No GUI, no internet
                connection needed – just a terminal and muscle memory.
              </p>
            </div>
          </div>

          {/* SVG illustration – hovering terminals with animated checks */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-xs group transition-transform duration-300 hover:scale-105">
              <svg viewBox="0 0 200 150" className="w-full" aria-label="Ubiquity illustration: multiple OS logos">
                <rect width="200" height="150" fill="none" />
                {/* Linux terminal */}
                <rect x="10" y="10" width="80" height="60" rx="6" fill="#1e1e2e" stroke="#4ade80" strokeWidth="1.5">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="18" y="30" fill="#4ade80" fontSize="8" fontFamily="monospace">$ vi config</text>
                <text x="18" y="45" fill="#cbd5e1" fontSize="6">~/.bashrc</text>
                <text x="18" y="58" fill="#a5f3fc" fontSize="6">"wq" → saved ✓</text>

                {/* MacOS / BSD terminal */}
                <rect x="110" y="10" width="80" height="60" rx="6" fill="#2d2d2d" stroke="#60a5fa" strokeWidth="1.5">
                  <animate attributeName="stroke" values="#60a5fa;#a78bfa;#60a5fa" dur="4s" repeatCount="indefinite" />
                </rect>
                <text x="118" y="30" fill="#60a5fa" fontSize="8">% vim script.sh</text>
                <text x="118" y="45" fill="#cbd5e1" fontSize="6">shebang → +x</text>
                <text x="118" y="58" fill="#fde047" fontSize="6">:x → exit</text>

                {/* Embedded / IoT terminal */}
                <rect x="60" y="85" width="80" height="50" rx="6" fill="#0f172a" stroke="#f87171" strokeWidth="1.5">
                  <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="6s" repeatCount="indefinite" />
                </rect>
                <text x="70" y="105" fill="#f87171" fontSize="7">BusyBox v1.36</text>
                <text x="70" y="120" fill="#94a3b8" fontSize="6">$ vi /etc/inittab</text>
                <text x="70" y="130" fill="#22d3ee" fontSize="5">(always available)</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* =========================  REAL‑WORLD SCENARIOS (CARDS) ========================= */}
      <div
        className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold">📌 Where ubiquity saves the day</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "💥 System Recovery",
              desc: "Single‑user mode, initramfs, or a broken GRUB – vi is the only editor available to fix fstab or network scripts.",
              student: "Swadeep (Barrackpore) rescued a corrupted Ubuntu server using vi in recovery mode.",
            },
            {
              title: "🐳 Minimal Containers",
              desc: "Alpine‑based Docker images often ship with `vi` but not nano/emacs. Edit entrypoint scripts without rebuilding.",
              student: "Tuhina (Ichapur) debugged a production container using `docker exec` and vi.",
            },
            {
              title: "📡 Headless IoT devices",
              desc: "Raspberry Pi, OpenWrt routers – almost all embedded Linux distributions include `vi` by default.",
              student: "Abhronila (Shyamnagar) configured a remote weather station via serial console with vi.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={clsx(
                "rounded-2xl p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                "shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
                "hover:border-emerald-300 dark:hover:border-emerald-600"
              )}
            >
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{card.desc}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 italic">👩‍💻 {card.student}</p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================  TIPS, COMMON MISTAKES, BEST PRACTICES ========================= */}
      <div
        className="space-y-5 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]"
        style={{ animationFillMode: "both" }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Tips & Tricks */}
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">💡 Pro Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>
                <span className="font-mono">:version</span> → check if you have full vim or legacy vi.
              </li>
              <li>
                <span className="font-mono">view /etc/passwd</span> → read‑only mode (like `less` but with vi keys).
              </li>
              <li>
                Use <span className="font-mono">vi -R</span> to open read‑only, avoid accidental changes.
              </li>
              <li>
                On minimal systems, <span className="font-mono">vi</span> may be actually `nvi` (bug‑for‑bug vi clone) – same muscle memory.
              </li>
            </ul>
          </div>

          {/* Common Pitfalls */}
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">⚠️ Beginner Mistakes</h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
              <li>
                <strong>Assuming vi is not available</strong> → always try <span className="font-mono">vi</span> before falling back.
              </li>
              <li>
                <strong>Forgetting to save</strong> – use <span className="font-mono">:w</span> frequently.
              </li>
              <li>
                <strong>Editing without sudo</strong> – <span className="font-mono">:w !sudo tee %</span> solves it (advanced).
              </li>
              <li>
                <strong>Confusing vi with vim</strong> – vim has syntax highlighting, but vi works everywhere.
              </li>
            </ul>
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-xl">
          <h3 className="text-lg font-bold">✅ Mini Checklist – What to remember</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[
              "vi is POSIX – always there",
              "Use `vi` not `nano` in scripts / rescue",
              "Know how to quit: `:q!` (emergency)",
              "`vimtutor` teaches basics (covered later)",
              "Even if GUI is gone, vi isn’t",
              "Check `$EDITOR` – set to vi for consistency",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================  HINT SECTION ========================= */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-4 rounded-r-xl"
        style={{ animationFillMode: "both" }}
      >
        <p className="font-semibold">🤔 Think about…</p>
        <p className="text-sm mt-1">
          “You are connected via SSH to a remote server that has no package manager and no internet.
          Which text editor can you <strong>absolutely rely on</strong> to change a configuration file?”
          <br />
          <span className="text-gray-500 dark:text-gray-400">
            Try: `vi`, `ex`, `view`. The answer is always the same.
          </span>
        </p>
      </div>

      {/* =========================  LIVE DEMO – VI AVAILABILITY SCRIPT ========================= */}
      <div
        className="animate-[fadeSlideUp_0.6s_ease-out_0.45s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.45s]"
        style={{ animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold mb-3">🔧 Verify ubiquity yourself</h2>
        <ShellFileLoader
          fileModule={checkViScript}
          title="Check vi / vim on any Unix system"
          highlightLines={[]}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This script works on Linux, macOS, FreeBSD, Solaris – even on an old AIX machine. That's the power of ubiquity.
        </p>
      </div>

      {/* =========================  FAQ SECTION ========================= */}
      <FAQTemplate title="Why vi/vim? FAQs" questions={questions} />

      {/* =========================  TEACHER’S NOTE ========================= */}
      <div
        className={clsx(
          "rounded-2xl p-6 border bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-800",
          "transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">🧑‍🏫</div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Teacher’s Note – Sukanta Hui</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> sukantahui@codernaccotax.co.in | <strong>Mobile:</strong> 7003756860
              <br />
              <strong>Skills:</strong> Programming Language, RDBMs, Operating System, Web Development
              <br />
              <strong>Experience:</strong> {teacherExperience} years (since 1998)
            </p>
            <p className="leading-relaxed">
              “I have watched thousands of students struggle because they only knew GUI editors. Then they
              encounter a broken Linux server, a Docker container, or a remote router – and they are stuck.
              <strong className="text-emerald-600 dark:text-emerald-400"> vi/vim is not optional.</strong> It is
              the safety net of every Unix professional. Spend one week learning vi, and you will never be
              helpless in front of a terminal again.”
            </p>
            <p className="text-sm italic border-l-2 border-emerald-400 pl-3 mt-2">
              💡 Tip for today: Open a terminal, type `vi --version`. Look at the features. This exact editor
              exists on 99% of the world's Unix systems. That’s power.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic0;

/* ==================== GLOBAL ANIMATION KEYFRAMES (scoped to component) ==================== */
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeSlideUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-\\[fadeSlideUp_0\\.6s_ease-out\\] {
      animation: none !important;
      opacity: 1;
      transform: none;
    }
  }
`;
if (!document.head.querySelector("#topic0-animations")) {
  styleSheet.id = "topic0-animations";
  document.head.appendChild(styleSheet);
}