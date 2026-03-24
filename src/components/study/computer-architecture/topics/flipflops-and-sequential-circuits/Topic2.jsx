import React, { useState, useEffect } from "react";
import clsx from "clsx";

/**
 * Topic2: Gated SR Latch
 *
 * Component API:
 * @function Topic2
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Rendered component
 *
 * Purpose:
 * Introduce the gated (clocked) SR latch, which adds an enable/clock control to the basic SR latch.
 * Explain level-sensitive behavior, timing diagrams, and the role of the enable signal.
 *
 * When & Why Used:
 * First step toward synchronous sequential circuits. Used when we need to control when the latch can change state,
 * enabling coordination with a clock signal. Foundation for flip-flops.
 */

const Topic2 = ({ className }) => {
  // Theme state management (light/dark mode support)
  const [isDark, setIsDark] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDark(false);
    } else if (savedTheme === "dark") {
      setIsDark(true);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Base theme classes
  const themeClasses = {
    container: isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800",
    card: isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200",
    cardHover: "hover:shadow-xl hover:scale-[1.02] transition-all duration-300",
    heading: isDark ? "text-indigo-300" : "text-indigo-700",
    subheading: isDark ? "text-gray-300" : "text-gray-600",
    tableHeader: isDark ? "bg-gray-700" : "bg-gray-200",
    tableCell: isDark ? "border-gray-700" : "border-gray-200",
    codeBlock: isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800",
    teacherNote: isDark ? "bg-indigo-900/30 border-indigo-500" : "bg-indigo-50 border-indigo-300",
    hintBox: isDark ? "bg-blue-900/30 border-blue-500" : "bg-blue-50 border-blue-300",
    checklist: isDark ? "bg-emerald-900/30 border-emerald-500" : "bg-emerald-50 border-emerald-300",
  };

  return (
    <div className={clsx("min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300", themeClasses.container, className)}>
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className={clsx(
            "p-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none",
            isDark ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
          )}
          aria-label="Toggle theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title Section with Staggered Animation */}
        <div className="text-center space-y-4 animate-[fadeUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className={clsx("bg-clip-text text-transparent bg-gradient-to-r", isDark ? "from-indigo-400 to-purple-400" : "from-indigo-600 to-purple-600")}>
              Gated SR Latch
            </span>
          </h1>
          <p className={clsx("text-xl max-w-3xl mx-auto", themeClasses.subheading)}>
            Adding an enable signal to control when the latch updates
          </p>
        </div>

        {/* Component Signature Card */}
        <div className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
          <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>📄 Component Information</h2>
          <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
            <div><span className="font-bold">Purpose:</span> Explain gated SR latch: enable/clock control, level-sensitive behavior, timing diagram</div>
            <div><span className="font-bold">When/Why Used:</span> Introduction to synchronous control; builds toward flip-flops and registers</div>
          </div>
        </div>

        {/* Main Content with Staggered Children */}
        <div className="space-y-8 stagger-children">
          {/* 1. What is a Gated SR Latch? */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>🚪 What is a Gated SR Latch?</h2>
            <p className="leading-relaxed">
              A <strong>gated SR latch</strong> (also called clocked SR latch) adds a third input: <strong>EN (Enable)</strong> or <strong>C (Clock)</strong>. 
              The latch only responds to the S and R inputs when EN = 1. When EN = 0, the latch holds its previous state, ignoring S and R. 
              This enables synchronization with a global clock or control signal.
            </p>
            <div className="flex justify-center my-6">
              <svg width="360" height="220" viewBox="0 0 360 220" className="transition-transform hover:scale-105">
                {/* Two AND gates at input */}
                <rect x="40" y="70" width="60" height="50" fill="none" stroke={isDark ? "#86efac" : "#16a34a"} strokeWidth="2" rx="6" />
                <text x="70" y="95" textAnchor="middle" fill={isDark ? "#86efac" : "#16a34a"} fontSize="10">AND</text>
                <rect x="40" y="140" width="60" height="50" fill="none" stroke={isDark ? "#86efac" : "#16a34a"} strokeWidth="2" rx="6" />
                <text x="70" y="165" textAnchor="middle" fill={isDark ? "#86efac" : "#16a34a"} fontSize="10">AND</text>
                {/* NOR SR latch */}
                <rect x="160" y="90" width="80" height="60" fill="none" stroke={isDark ? "#facc15" : "#eab308"} strokeWidth="2" rx="6" />
                <text x="200" y="120" textAnchor="middle" fill={isDark ? "#facc15" : "#eab308"} fontSize="10">NOR</text>
                <rect x="260" y="90" width="80" height="60" fill="none" stroke={isDark ? "#facc15" : "#eab308"} strokeWidth="2" rx="6" />
                <text x="300" y="120" textAnchor="middle" fill={isDark ? "#facc15" : "#eab308"} fontSize="10">NOR</text>
                {/* Inputs */}
                <text x="10" y="95" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">S</text>
                <line x1="25" y1="95" x2="40" y2="95" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <text x="10" y="165" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">R</text>
                <line x1="25" y1="165" x2="40" y2="165" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <text x="10" y="130" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">EN</text>
                <line x1="25" y1="130" x2="40" y2="130" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="100" y1="95" x2="160" y2="95" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <line x1="100" y1="165" x2="160" y2="165" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                {/* Feedback connections (simplified) */}
                <path d="M 240 120 L 280 120 L 280 180 L 220 180 L 220 150" stroke={isDark ? "#f97316" : "#ea580c"} strokeWidth="2" fill="none" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M 340 120 L 300 120 L 300 60 L 180 60 L 180 90" stroke={isDark ? "#f97316" : "#ea580c"} strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <text x="200" y="195" fill={isDark ? "#f97316" : "#ea580c"} fontSize="9">Feedback loops</text>
                <text x="330" y="95" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">Q</text>
                <line x1="340" y1="95" x2="360" y2="95" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <text x="330" y="145" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">Q̅</text>
                <line x1="340" y1="145" x2="360" y2="145" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
              </svg>
            </div>
          </section>

          {/* 2. Truth Table & Level-Sensitive Behavior */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>📊 Truth Table & Level-Sensitive Behavior</h2>
            <p className="leading-relaxed mb-4">
              The gated SR latch is <strong>level-sensitive</strong>: it updates when EN is HIGH (active-high). While EN = 1, it behaves like an SR latch. When EN = 0, it holds the previous state.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className={themeClasses.tableHeader}>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>EN</th>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>S</th>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>R</th>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>Q<sub>next</sub></th>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>X</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>X</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Q</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Hold</td></tr>
                  <tr><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Q</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Hold</td></tr>
                  <tr><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Set</td></tr>
                  <tr><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Reset</td></tr>
                  <tr className="bg-red-100 dark:bg-red-900/30"><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>?</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Invalid (S=R=1)</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">✨ <strong>Level-sensitive</strong> means the output can change multiple times while EN = 1 as S/R change, which can cause glitches.</p>
          </section>

          {/* 3. Timing Diagram Explanation */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>⏱️ Timing Diagram</h2>
            <p className="leading-relaxed mb-4">
              The timing diagram shows how Q follows S when EN is HIGH, and holds when EN is LOW. Notice the transparency during EN=1.
            </p>
            <div className="flex justify-center">
              <svg width="500" height="240" viewBox="0 0 500 240" className="transition-transform hover:scale-105">
                {/* Grid lines */}
                <line x1="40" y1="30" x2="460" y2="30" stroke={isDark ? "#4b5563" : "#d1d5db"} strokeWidth="1" />
                <line x1="40" y1="60" x2="460" y2="60" stroke={isDark ? "#4b5563" : "#d1d5db"} strokeWidth="1" />
                <line x1="40" y1="90" x2="460" y2="90" stroke={isDark ? "#4b5563" : "#d1d5db"} strokeWidth="1" />
                <line x1="40" y1="120" x2="460" y2="120" stroke={isDark ? "#4b5563" : "#d1d5db"} strokeWidth="1" />
                <line x1="40" y1="150" x2="460" y2="150" stroke={isDark ? "#4b5563" : "#d1d5db"} strokeWidth="1" />
                <line x1="40" y1="180" x2="460" y2="180" stroke={isDark ? "#4b5563" : "#d1d5db"} strokeWidth="1" />
                <line x1="40" y1="210" x2="460" y2="210" stroke={isDark ? "#4b5563" : "#d1d5db"} strokeWidth="1" />
                {/* EN waveform */}
                <polyline points="40,90 100,90 100,30 160,30 160,90 220,90 220,30 280,30 280,90 340,90 340,30 400,30 400,90" fill="none" stroke={isDark ? "#86efac" : "#16a34a"} strokeWidth="2" />
                <text x="20" y="90" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="10">EN</text>
                {/* S waveform */}
                <polyline points="40,150 80,150 80,120 120,120 120,150 180,150 180,120 240,120 240,150 300,150 300,120 360,120 360,150 420,150 420,120 460,120" fill="none" stroke={isDark ? "#facc15" : "#eab308"} strokeWidth="2" />
                <text x="20" y="150" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="10">S</text>
                {/* R waveform */}
                <polyline points="40,180 80,180 80,210 120,210 120,180 180,180 180,210 240,210 240,180 300,180 300,210 360,210 360,180 420,180 420,210 460,210" fill="none" stroke={isDark ? "#f97316" : "#ea580c"} strokeWidth="2" />
                <text x="20" y="180" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="10">R</text>
                {/* Q waveform */}
                <polyline points="40,60 100,60 100,60 160,60 160,30 220,30 220,60 280,60 280,30 340,30 340,60 400,60 400,30 460,30" fill="none" stroke={isDark ? "#a78bfa" : "#8b5cf6"} strokeWidth="2" />
                <text x="20" y="60" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="10">Q</text>
                {/* Time markers */}
                <text x="80" y="15" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="8">t1</text>
                <text x="140" y="15" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="8">t2</text>
                <text x="200" y="15" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="8">t3</text>
                <text x="260" y="15" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="8">t4</text>
                <text x="320" y="15" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="8">t5</text>
                <text x="380" y="15" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="8">t6</text>
              </svg>
            </div>
            <p className="text-sm italic mt-4">🔍 Observe: When EN=1, Q follows S/R; when EN=0, Q holds regardless of S/R.</p>
          </section>

          {/* 4. Real-World Applications */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>🌍 Real-World Usage</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Register enable signals:</strong> In CPUs, registers are gated latches to control when data is written (e.g., Swadeep's processor register file).</li>
              <li><strong>Data buffers:</strong> Enable input controls when data passes through (e.g., Tuhina's data bus transceiver).</li>
              <li><strong>Clock gating:</strong> Used to save power by disabling parts of a circuit when not needed.</li>
              <li><strong>Memory address decoders:</strong> Enable line selects which memory chip responds.</li>
            </ul>
          </section>

          {/* 5. Tips & Tricks */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>💡 Pro Tips & Tricks</h2>
            <ul className="space-y-2">
              <li>✔️ <strong>Always reset before use:</strong> Ensure latch starts in a known state (use R=1, EN=1, then EN=0).</li>
              <li>✔️ <strong>Avoid glitches:</strong> If EN is derived from combinational logic, ensure it's clean to prevent unintended updates.</li>
              <li>✔️ <strong>Consider active-low enable:</strong> Some latches use EN̅; be consistent with your system.</li>
              <li>✔️ <strong>Use for synchronization:</strong> Gated latches are the basis for synchronous design; without enable, everything would be asynchronous.</li>
            </ul>
          </section>

          {/* 6. Common Pitfalls */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>⚠️ Common Mistakes & Misconceptions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>❌ Thinking EN is a clock edge:</strong> EN is level-sensitive, not edge-triggered. Many beginners confuse it with a flip-flop clock.</li>
              <li><strong>❌ Ignoring transparency:</strong> While EN=1, the latch is transparent; any S/R change affects Q. This can cause unwanted changes if EN is too long.</li>
              <li><strong>❌ Forgetting invalid state:</strong> When EN=1 and S=R=1, the latch still has the invalid condition. Need to avoid S=R=1 when EN=1.</li>
              <li><strong>❌ Misplacing enable gate:</strong> In some designs, enable gates are placed after the feedback; ensure it's before the latch.</li>
            </ul>
          </section>

          {/* 7. Best Practices */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>✅ Best Practices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>🔹 <strong>Keep EN short and clean:</strong> Use a clock with sufficient width but not overly long to avoid noise.</li>
              <li>🔹 <strong>Use buffers:</strong> If EN drives many latches, use buffers to maintain signal integrity.</li>
              <li>🔹 <strong>Document active level:</strong> Clearly indicate if enable is active-high or active-low.</li>
              <li>🔹 <strong>Simulate with timing diagrams:</strong> Verify transparency period and hold behavior.</li>
            </ul>
          </section>

          {/* 8. Mini Checklist */}
          <div className={clsx("rounded-xl border p-5 shadow-md transition-all duration-300", themeClasses.checklist)}>
            <h3 className={clsx("text-xl font-semibold mb-3", themeClasses.heading)}>📝 Student Checklist</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>☐ I can draw a gated SR latch circuit (with AND gates + NOR latch)</div>
              <div>☐ I can explain the truth table for EN=0 and EN=1</div>
              <div>☐ I understand level-sensitive vs. edge-triggered</div>
              <div>☐ I can read timing diagrams for EN, S, R, Q</div>
              <div>☐ I know why the invalid state still exists when EN=1</div>
              <div>☐ I can give real-world uses of gated latches</div>
            </div>
          </div>

          {/* 9. Hint Section */}
          <div className={clsx("rounded-xl border p-5 shadow-md transition-all duration-300", themeClasses.hintBox)}>
            <h3 className={clsx("text-xl font-semibold mb-2", themeClasses.heading)}>🤔 Think About...</h3>
            <p className="italic">"If you replace the enable input with a clock that pulses high for a short time, how does the behavior change? Try drawing a timing diagram where EN is a narrow pulse. What happens if EN stays high too long?"</p>
          </div>

          {/* 10. Teacher's Note */}
          <div className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300 hover:shadow-xl", themeClasses.teacherNote)}>
            <h3 className={clsx("text-2xl font-semibold mb-3", themeClasses.heading)}>👨‍🏫 Teacher's Note: Sukanta Hui</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="font-medium">📧 sukantahui@codernaccotax.co.in | 📞 7003756860</p>
                <p className="mt-2"><strong>27+ years</strong> experience | Skills: Programming, RDBMS, OS, Web Development</p>
                <p className="mt-3">✨ <strong>Pro tip:</strong> "The gated latch is your first step into synchronous design. Think of EN as a 'gatekeeper' — it decides when new data can enter. In the classroom, imagine Abhronila raising her hand (EN) to answer. Only when the teacher (EN) acknowledges, does she speak (update). Without EN, chaos ensues."</p>
              </div>
              <div className="flex-1 border-l pl-4 border-gray-500">
                <p className="font-semibold">🎯 Key takeaway for today:</p>
                <p>Control matters. The gated latch shows how we can coordinate memory updates using an enable signal. Next, we'll fix the invalid state with the D latch.</p>
                <p className="mt-2 text-sm">🔔 Remember: Level-sensitive means transparent while enabled — that's both a feature and a potential pitfall.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global keyframe animations and stagger classes */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stagger-children > * {
          opacity: 0;
          animation: fadeUp 0.5s ease-out forwards;
        }
        .stagger-children > *:nth-child(1) { animation-delay: 0.05s; }
        .stagger-children > *:nth-child(2) { animation-delay: 0.1s; }
        .stagger-children > *:nth-child(3) { animation-delay: 0.15s; }
        .stagger-children > *:nth-child(4) { animation-delay: 0.2s; }
        .stagger-children > *:nth-child(5) { animation-delay: 0.25s; }
        .stagger-children > *:nth-child(6) { animation-delay: 0.3s; }
        .stagger-children > *:nth-child(7) { animation-delay: 0.35s; }
        .stagger-children > *:nth-child(8) { animation-delay: 0.4s; }
        .stagger-children > *:nth-child(9) { animation-delay: 0.45s; }
        .stagger-children > *:nth-child(10) { animation-delay: 0.5s; }
        @media (prefers-reduced-motion: reduce) {
          .stagger-children > *, .animate\\[fadeUp_0\\.6s_ease-out\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic2;