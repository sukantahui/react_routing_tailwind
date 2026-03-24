import React, { useState, useEffect } from "react";
import clsx from "clsx";
import SRLatchNanad from "./topic1_files/SR-latch-nand.png";
/**
 * Topic1: SR Latch (Basic Building Block)
 *
 * Component API:
 * @function Topic1
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Rendered component
 *
 * Purpose:
 * Introduce the SR (Set-Reset) Latch as the fundamental memory element.
 * Explain NOR and NAND implementations, truth table, invalid state, and real-world behavior.
 *
 * When & Why Used:
 * First hands-on memory circuit. Foundation for all sequential logic.
 * Used to understand feedback, state storage, and limitations before moving to clocked devices.
 */

const Topic1 = ({ className }) => {
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
              SR Latch: The Basic Memory Block
            </span>
          </h1>
          <p className={clsx("text-xl max-w-3xl mx-auto", themeClasses.subheading)}>
            Building the foundation of sequential logic with Set-Reset feedback
          </p>
        </div>

        {/* Component Signature Card */}
        <div className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
          <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>📄 Component Information</h2>
          <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
            <div><span className="font-bold">Purpose:</span> Explain SR latch: NOR/NAND implementation, truth table, invalid state</div>
            <div><span className="font-bold">When/Why Used:</span> First memory circuit; foundation for flip-flops and registers</div>
          </div>
        </div>

        {/* Main Content with Staggered Children */}
        <div className="space-y-8 stagger-children">
          {/* 1. What is an SR Latch? */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>🔒 What is an SR Latch?</h2>
            <p className="leading-relaxed">
              An SR (Set-Reset) latch is the simplest form of <strong>memory element</strong>. It has two inputs: <strong>S (Set)</strong> and <strong>R (Reset)</strong>, and two outputs: <strong>Q</strong> (normal output) and <strong>Q̅</strong> (complement). When S = 1, the latch is set (Q = 1); when R = 1, it is reset (Q = 0). The circuit maintains its state even after inputs return to 0 — <strong>it remembers!</strong>
            </p>
            <div className="flex justify-center my-6">
              <svg width="320" height="200" viewBox="0 0 320 200" className="transition-transform hover:scale-105">
                {/* NOR-based SR Latch */}
                <rect x="60" y="60" width="80" height="60" fill="none" stroke={isDark ? "#86efac" : "#16a34a"} strokeWidth="2" rx="6" />
                <text x="100" y="90" textAnchor="middle" fill={isDark ? "#86efac" : "#16a34a"} fontSize="12">NOR</text>
                <text x="100" y="105" textAnchor="middle" fill={isDark ? "#86efac" : "#16a34a"} fontSize="12">Gate 1</text>
                <rect x="180" y="60" width="80" height="60" fill="none" stroke={isDark ? "#facc15" : "#eab308"} strokeWidth="2" rx="6" />
                <text x="220" y="90" textAnchor="middle" fill={isDark ? "#facc15" : "#eab308"} fontSize="12">NOR</text>
                <text x="220" y="105" textAnchor="middle" fill={isDark ? "#facc15" : "#eab308"} fontSize="12">Gate 2</text>
                {/* Inputs */}
                <text x="20" y="90" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">S</text>
                <line x1="35" y1="90" x2="60" y2="90" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <text x="20" y="130" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">R</text>
                <line x1="35" y1="130" x2="60" y2="130" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                {/* Feedback connections */}
                <path d="M 140 90 L 170 90 L 170 150 L 250 150 L 250 120" stroke={isDark ? "#f97316" : "#ea580c"} strokeWidth="2" fill="none" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M 260 90 L 230 90 L 230 30 L 90 30 L 90 60" stroke={isDark ? "#f97316" : "#ea580c"} strokeWidth="2" fill="none" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
                </path>
                <text x="180" y="165" fill={isDark ? "#f97316" : "#ea580c"} fontSize="9">Feedback loops</text>
                {/* Outputs */}
                <text x="290" y="90" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">Q</text>
                <line x1="260" y1="90" x2="280" y2="90" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <text x="290" y="130" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">Q̅</text>
                <line x1="260" y1="130" x2="280" y2="130" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
              </svg>
            </div>
          </section>
           

          {/* 2. NOR Implementation */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>🔌 NOR Implementation</h2>
            <p className="leading-relaxed mb-4">
              The most common SR latch uses two cross-coupled NOR gates. The truth table is:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className={themeClasses.tableHeader}>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>S</th>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>R</th>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>Q<sub>next</sub></th>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>Q̅<sub>next</sub></th>
                    <th className={clsx("border px-4 py-2", themeClasses.tableCell)}>State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Q</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Q̅</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Hold (memory)</td></tr>
                  <tr><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Set</td></tr>
                  <tr><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Reset</td></tr>
                  <tr className="bg-red-100 dark:bg-red-900/30"><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>1</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>0</td><td className={clsx("border px-4 py-2", themeClasses.tableCell)}>Invalid (both outputs 0)</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm italic">⚠️ <strong>Invalid state:</strong> S=R=1 forces both Q and Q̅ to 0, violating complementarity. When inputs return to 00, the next state is unpredictable (race).</p>
          </section>

          {/* 3. NAND Implementation */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>⚡ NAND Implementation (Active Low)</h2>
            <p className="leading-relaxed">
              A NAND-based SR latch uses <strong>active-low inputs</strong> (S̅ and R̅). It works similarly but with inverted logic: S̅=0 sets, R̅=0 resets, and S̅=R̅=1 holds. The invalid state occurs when both inputs are 0.
            </p>
            <div className="flex justify-center my-4">
              <svg width="320" height="180" viewBox="0 0 320 180" className="transition-transform hover:scale-105">
                <rect x="60" y="40" width="80" height="60" fill="none" stroke={isDark ? "#86efac" : "#16a34a"} strokeWidth="2" rx="6" />
                <text x="100" y="70" textAnchor="middle" fill={isDark ? "#86efac" : "#16a34a"} fontSize="12">NAND</text>
                <rect x="180" y="40" width="80" height="60" fill="none" stroke={isDark ? "#facc15" : "#eab308"} strokeWidth="2" rx="6" />
                <text x="220" y="70" textAnchor="middle" fill={isDark ? "#facc15" : "#eab308"} fontSize="12">NAND</text>
                <text x="20" y="70" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">S̅</text>
                <line x1="35" y1="70" x2="60" y2="70" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <text x="20" y="110" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">R̅</text>
                <line x1="35" y1="110" x2="60" y2="110" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <path d="M 140 70 L 170 70 L 170 130 L 250 130 L 250 100" stroke={isDark ? "#f97316" : "#ea580c"} strokeWidth="2" fill="none" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M 260 70 L 230 70 L 230 10 L 90 10 L 90 40" stroke={isDark ? "#f97316" : "#ea580c"} strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <text x="180" y="150" fill={isDark ? "#f97316" : "#ea580c"} fontSize="9">Feedback loops</text>
                <text x="290" y="70" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">Q</text>
                <line x1="260" y1="70" x2="280" y2="70" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
                <text x="290" y="110" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="12">Q̅</text>
                <line x1="260" y1="110" x2="280" y2="110" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" />
              </svg>
            </div>
          </section>

          {/* Circuit Diagram */}
            <section className="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-[fadeInUp_0.6s_ease-out] motion-reduce:animate-none">
                <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                    🔌 SR Latch
                </h2>

                <div className="flex flex-col items-center gap-6">

                    {/* Half Adder PNG */}
                    <img src={SRLatchNanad} alt="Half Adder Circuit" className="max-w-full dark:invert"  />

                    {/* Boolean expressions */}
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 text-center">
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">
                            Nanad Based SR Latch
                        </h3>
                        
                    </div>

                </div>
            </section>

          {/* 4. Invalid State Explained */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>🚫 Invalid State (S=R=1 for NOR)</h2>
            <p className="leading-relaxed">
              When both S and R are 1 in a NOR latch, both outputs become 0, which is illegal because Q and Q̅ should always be complements. When inputs return to 0, the latch may end up in an unpredictable state depending on which gate responds faster — a <strong>race condition</strong>. In practice, this is avoided by ensuring S and R are never simultaneously 1.
            </p>
            <div className={clsx("mt-4 p-4 rounded-lg", themeClasses.codeBlock)}>
              <p className="font-mono">💡 <strong>Real-world analogy:</strong> Like a light switch that is both pressed "on" and "off" at the same time — you break the mechanism.</p>
            </div>
          </section>

          {/* 5. Real-World Behavior Analysis */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>🌍 Real-World Behavior & Applications</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Debounce circuits:</strong> SR latches clean up noisy switch signals (e.g., keyboard keys in Barrackpore's computer lab).</li>
              <li><strong>Memory bit cells:</strong> Fundamental building block for registers and RAM (though usually enhanced to avoid invalid state).</li>
              <li><strong>Control logic:</strong> Simple state machines (e.g., Tuhina's vending machine remembers coin insertion).</li>
              <li><strong>Power-on reset circuits:</strong> Ensure known initial state (often using R input).</li>
            </ul>
          </section>

          {/* 6. Tips & Tricks (Professional) */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>💡 Pro Tips & Tricks</h2>
            <ul className="space-y-2">
              <li>✔️ <strong>Always initialize:</strong> Apply a reset pulse at power-up to avoid unknown states.</li>
              <li>✔️ <strong>Watch for glitches:</strong> Noise on S or R can accidentally change state; use filters or debouncing.</li>
              <li>✔️ <strong>NOR vs NAND:</strong> NOR latches are set by 1, NAND by 0. Choose based on active logic levels.</li>
              <li>✔️ <strong>Simulation:</strong> Use tools like Logisim to visualize feedback and race conditions.</li>
            </ul>
          </section>

          {/* 7. Common Pitfalls */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>⚠️ Common Mistakes & Misconceptions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>❌ Confusing active-high vs active-low:</strong> NAND latch requires S̅ and R̅, not S and R.</li>
              <li><strong>❌ Assuming S=R=0 holds always:</strong> In NAND latch, S̅=R̅=1 holds; in NOR, S=R=0 holds.</li>
              <li><strong>❌ Forgetting race condition:</strong> S=R=1 (NOR) leads to metastability; never used in proper designs.</li>
              <li><strong>❌ Ignoring propagation delay:</strong> Feedback loops take time; timing matters.</li>
            </ul>
          </section>

          {/* 8. Best Practices */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>✅ Best Practices for Beginners</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>🔹 <strong>Draw truth tables:</strong> Always include current state (Q) and next state (Q_next).</li>
              <li>🔹 <strong>Use consistent labeling:</strong> S for set, R for reset; complement outputs clearly marked.</li>
              <li>🔹 <strong>Simulate edge cases:</strong> Apply S=R=1 briefly to see race effect (but avoid in final design).</li>
              <li>🔹 <strong>Start with NOR:</strong> Easier to understand active-high logic.</li>
            </ul>
          </section>

          {/* 9. Mini Checklist */}
          <div className={clsx("rounded-xl border p-5 shadow-md transition-all duration-300", themeClasses.checklist)}>
            <h3 className={clsx("text-xl font-semibold mb-3", themeClasses.heading)}>📝 Student Checklist</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>☐ I can draw NOR and NAND SR latch circuits</div>
              <div>☐ I can explain truth table for both implementations</div>
              <div>☐ I understand why S=R=1 (NOR) is invalid</div>
              <div>☐ I can simulate a latch on paper or in software</div>
              <div>☐ I know real-world applications (debouncing, memory)</div>
              <div>☐ I can identify race condition risks</div>
            </div>
          </div>

          {/* 10. Hint Section */}
          <div className={clsx("rounded-xl border p-5 shadow-md transition-all duration-300", themeClasses.hintBox)}>
            <h3 className={clsx("text-xl font-semibold mb-2", themeClasses.heading)}>🤔 Think About...</h3>
            <p className="italic">"If you remove the feedback connections in an SR latch, what happens? Try changing the order of gates. Observe carefully: the memory disappears and you're left with combinational logic. How would you modify the circuit to avoid the invalid state?"</p>
          </div>

          {/* 11. Teacher's Note */}
          <div className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300 hover:shadow-xl", themeClasses.teacherNote)}>
            <h3 className={clsx("text-2xl font-semibold mb-3", themeClasses.heading)}>👨‍🏫 Teacher's Note: Sukanta Hui</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="font-medium">📧 sukantahui@codernaccotax.co.in | 📞 7003756860</p>
                <p className="mt-2"><strong>27+ years</strong> experience | Skills: Programming, RDBMS, OS, Web Development</p>
                <p className="mt-3">✨ <strong>Pro tip:</strong> "The SR latch is your first 'memory' circuit. Don't memorize truth tables—understand the feedback: when S=1, it forces Q=1; when R=1, it forces Q=0. The hold condition is the magic of memory. Always respect the invalid state; it's like a forbidden operation in digital logic."</p>
              </div>
              <div className="flex-1 border-l pl-4 border-gray-500">
                <p className="font-semibold">🎯 Key takeaway for today:</p>
                <p>Feedback creates memory. The SR latch is the simplest example. Master it, and you'll easily understand flip-flops.</p>
                <p className="mt-2 text-sm">🔔 Remember: Never let S and R be 1 together in a NOR latch unless you want chaos!</p>
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
        .stagger-children > *:nth-child(11) { animation-delay: 0.55s; }
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

export default Topic1;