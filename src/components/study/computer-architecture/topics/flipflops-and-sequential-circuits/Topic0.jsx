import React, { useState, useEffect } from "react";
import clsx from "clsx";

/**
 * Topic0: Introduction to Sequential Circuits
 * 
 * Component API:
 * @function Topic0
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Rendered component
 * 
 * Purpose:
 * This component introduces the fundamental concepts of sequential circuits:
 * - Difference between combinational and sequential logic
 * - Memory concept in digital circuits
 * - Feedback mechanism as the basis for state storage
 * 
 * When & Why Used:
 * Used as the foundational lesson in digital electronics courses, 
 * establishing the core concepts needed to understand latches, flip-flops,
 * registers, and more complex sequential systems.
 */

const Topic0 = ({ className }) => {
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
              Introduction to Sequential Circuits
            </span>
          </h1>
          <p className={clsx("text-xl max-w-3xl mx-auto", themeClasses.subheading)}>
            Understanding the foundation of memory, state, and time in digital systems
          </p>
        </div>

        {/* Component Signature Card */}
        <div className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
          <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>📄 Component Information</h2>
          <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
            <div><span className="font-bold">Purpose:</span> Explain combinational vs sequential logic, memory, feedback</div>
            <div><span className="font-bold">When/Why Used:</span> First lesson on stateful circuits, foundation for latches & flip-flops</div>
          </div>
        </div>

        {/* Main Content with Staggered Children */}
        <div className="space-y-8 stagger-children">
          {/* 1. Combinational vs Sequential Logic */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>⚡ Combinational vs Sequential Logic</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                <strong>Combinational circuits</strong> produce outputs based <em>only</em> on current inputs — no memory. 
                <strong> Sequential circuits</strong> use <strong>memory elements</strong> to store past states, making output depend on both current inputs and previous states.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Combinational SVG */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto transition-transform duration-300 hover:scale-105">
                      <rect x="20" y="30" width="100" height="60" fill="none" stroke={isDark ? "#cbd5e1" : "#334155"} strokeWidth="2" rx="8" />
                      <text x="70" y="70" textAnchor="middle" fill={isDark ? "#cbd5e1" : "#334155"} fontSize="12">Combinational</text>
                      <text x="70" y="85" textAnchor="middle" fill={isDark ? "#94a3b8" : "#475569"} fontSize="9">Logic</text>
                      <polygon points="140,60 150,55 150,65" fill={isDark ? "#fbbf24" : "#eab308"} />
                      <line x1="120" y1="60" x2="140" y2="60" stroke={isDark ? "#fbbf24" : "#eab308"} strokeWidth="2" />
                      <text x="10" y="25" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="10">Inputs</text>
                      <text x="160" y="45" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="10">Outputs</text>
                    </svg>
                    <p className="mt-2 text-sm">⏱️ No memory → Instant output</p>
                  </div>
                </div>
                {/* Sequential SVG with Feedback */}
                <div className="text-center">
                  <div className="relative inline-block group">
                    <svg width="220" height="140" viewBox="0 0 220 140" className="mx-auto transition-transform duration-300 group-hover:scale-105">
                      <rect x="40" y="30" width="100" height="60" fill="none" stroke={isDark ? "#cbd5e1" : "#334155"} strokeWidth="2" rx="8" />
                      <text x="90" y="70" textAnchor="middle" fill={isDark ? "#cbd5e1" : "#334155"} fontSize="12">Sequential</text>
                      <text x="90" y="85" textAnchor="middle" fill={isDark ? "#94a3b8" : "#475569"} fontSize="9">Logic</text>
                      {/* Feedback arrow with animation */}
                      <path id="feedbackPath" d="M 140 60 L 160 60 L 160 100 L 50 100 L 50 90" fill="none" stroke={isDark ? "#f97316" : "#ea580c"} strokeWidth="2" strokeDasharray="5 5">
                        <animate attributeName="stroke-dashoffset" values="0;10;0" dur="2s" repeatCount="indefinite" />
                      </path>
                      <polygon points="48,87 53,90 48,93" fill={isDark ? "#f97316" : "#ea580c"} />
                      <text x="80" y="115" fill={isDark ? "#f97316" : "#ea580c"} fontSize="8">Feedback</text>
                      <rect x="20" y="95" width="30" height="20" fill="none" stroke={isDark ? "#86efac" : "#16a34a"} strokeWidth="1.5" rx="3" />
                      <text x="35" y="109" textAnchor="middle" fill={isDark ? "#86efac" : "#16a34a"} fontSize="8">Memory</text>
                      <polygon points="160,60 170,55 170,65" fill={isDark ? "#fbbf24" : "#eab308"} />
                      <line x1="140" y1="60" x2="160" y2="60" stroke={isDark ? "#fbbf24" : "#eab308"} strokeWidth="2" />
                      <text x="10" y="25" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="10">Inputs</text>
                      <text x="180" y="45" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="10">Outputs</text>
                    </svg>
                    <p className="mt-2 text-sm">🔄 Memory + Feedback → State-dependent</p>
                  </div>
                </div>
              </div>
              <div className={clsx("p-4 rounded-lg mt-4", themeClasses.codeBlock)}>
                <p className="font-mono text-sm">💡 <strong>Analogy:</strong> Combinational = Calculator keypad (instant sum) | Sequential = Bank counter (needs last transaction number)</p>
              </div>
            </div>
          </section>

          {/* 2. Memory Concept */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>🧠 Memory Concept</h2>
            <p className="leading-relaxed mb-4">
              Memory in digital circuits means the ability to <strong>store a bit of information</strong> (0 or 1) and retain it even after input changes. 
              This is achieved using <strong>feedback loops</strong> (e.g., cross-coupled gates) that create <strong>bistable elements</strong>.
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className={clsx("p-3 rounded-lg", themeClasses.codeBlock)}>
                <span className="font-mono">1-bit memory cell → SR Latch → Flip-Flop → Register → RAM</span>
              </div>
              <div className="relative">
                <svg width="180" height="80" viewBox="0 0 180 80" className="transition-transform hover:scale-110">
                  <circle cx="40" cy="40" r="15" fill="none" stroke={isDark ? "#facc15" : "#eab308"} strokeWidth="2" />
                  <text x="40" y="44" textAnchor="middle" fill={isDark ? "#facc15" : "#eab308"} fontSize="12">0/1</text>
                  <text x="40" y="60" textAnchor="middle" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="8">State</text>
                  <path d="M 65 40 L 100 40" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="2" />
                  <polygon points="100,40 95,35 95,45" fill={isDark ? "#94a3b8" : "#475569"} />
                  <text x="130" y="35" fill={isDark ? "#cbd5e1" : "#1f2937"} fontSize="10">Stored until</text>
                  <text x="130" y="48" fill={isDark ? "#cbd5e1" : "#1f2937"} fontSize="10">power loss or</text>
                  <text x="130" y="61" fill={isDark ? "#cbd5e1" : "#1f2937"} fontSize="10">new write</text>
                </svg>
              </div>
            </div>
            <p className="text-sm mt-4 italic">✨ Without memory, computers would forget everything after each clock cycle!</p>
          </section>

          {/* 3. Feedback Mechanism */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>🔄 Feedback Mechanism</h2>
            <p className="leading-relaxed">
              <strong>Feedback</strong> is the core technique that creates memory. By routing the output back to the input, we create a loop that “remembers” the last state. 
              The simplest example is two inverters connected in a ring — they hold a value indefinitely.
            </p>
            <div className="flex justify-center my-6">
              <svg width="280" height="120" viewBox="0 0 280 120" className="transition-transform hover:scale-105">
                <rect x="40" y="35" width="60" height="30" fill="none" stroke={isDark ? "#86efac" : "#16a34a"} strokeWidth="2" rx="4" />
                <text x="70" y="55" textAnchor="middle" fill={isDark ? "#86efac" : "#16a34a"} fontSize="12">A</text>
                <rect x="180" y="35" width="60" height="30" fill="none" stroke={isDark ? "#facc15" : "#eab308"} strokeWidth="2" rx="4" />
                <text x="210" y="55" textAnchor="middle" fill={isDark ? "#facc15" : "#eab308"} fontSize="12">B</text>
                <path d="M 100 50 L 140 50 L 140 80 L 180 80" stroke={isDark ? "#f97316" : "#ea580c"} strokeWidth="2" fill="none" strokeDasharray="3 3">
                  <animate attributeName="stroke-dashoffset" values="0;6;0" dur="1.5s" repeatCount="indefinite" />
                </path>
                <polygon points="180,80 175,75 175,85" fill={isDark ? "#f97316" : "#ea580c"} />
                <path d="M 220 50 L 260 50 L 260 20 L 20 20 L 20 50" stroke={isDark ? "#94a3b8" : "#475569"} strokeWidth="1.5" fill="none" strokeDasharray="2" />
                <text x="130" y="100" fill={isDark ? "#9ca3af" : "#4b5563"} fontSize="10">Feedback path creates bi-stability</text>
              </svg>
            </div>
            <div className={clsx("p-3 rounded-lg text-sm", themeClasses.hintBox)}>
              <span className="font-bold">🎓 Real-world analogy:</span> Like a classroom where students (Swadeep, Tuhina) remember the teacher’s last instruction — the feedback loop in their memory keeps the context alive.
            </div>
          </section>

          {/* 4. Real-World Usage */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>🌍 Real-World Applications</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Registers in CPU:</strong> Store intermediate data (e.g., Debangshu's program counter holds next instruction address).</li>
              <li><strong>Counters in traffic lights:</strong> Sequential logic cycles through states (Shyamnagar crossing signal sequence).</li>
              <li><strong>State machines in vending machines:</strong> Remembers coins inserted (Ichapur station snack vendor).</li>
              <li><strong>Memory chips (SRAM/DRAM):</strong> Billions of sequential cells storing data in Naihati's bank servers.</li>
            </ul>
          </section>

          {/* 5. Tips & Tricks (Professional) */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>💡 Pro Tips & Tricks</h2>
            <ul className="space-y-2">
              <li>✔️ <strong>Identify memory need:</strong> If a system must “remember” past events → sequential circuit.</li>
              <li>✔️ <strong>Feedback ≠ oscillation:</strong> Properly designed feedback leads to stable memory (bistable).</li>
              <li>✔️ <strong>Timing is everything:</strong> Sequential circuits require clock or enable signals for synchronization.</li>
              <li>✔️ <strong>Debugging mindset:</strong> Always check feedback paths and state initialization (reset).</li>
            </ul>
          </section>

          {/* 6. Common Pitfalls */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>⚠️ Common Mistakes & Misconceptions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>❌ Thinking all circuits with feedback are sequential:</strong> Some feedback (like op-amps) is analog; digital sequential needs latches.</li>
              <li><strong>❌ Ignoring propagation delay:</strong> Assumes changes happen instantly → race conditions later.</li>
              <li><strong>❌ Mixing up combinational and sequential blocks:</strong> Designing counters without remembering state.</li>
              <li><strong>❌ Not using a clock:</strong> Asynchronous sequential circuits are tricky and prone to hazards.</li>
            </ul>
          </section>

          {/* 7. Best Practices */}
          <section className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300", themeClasses.card, themeClasses.cardHover)}>
            <h2 className={clsx("text-2xl font-semibold mb-4", themeClasses.heading)}>✅ Best Practices for Beginners</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>🔹 Always start with a <strong>state diagram</strong> before building sequential circuits.</li>
              <li>🔹 Use <strong>edge-triggered flip-flops</strong> for reliable synchronous design.</li>
              <li>🔹 Initialize all memory elements (<strong>reset/preset</strong>) to avoid unknown states.</li>
              <li>🔹 Simulate with timing diagrams to verify memory behavior.</li>
            </ul>
          </section>

          {/* 8. Mini Checklist */}
          <div className={clsx("rounded-xl border p-5 shadow-md transition-all duration-300", themeClasses.checklist)}>
            <h3 className={clsx("text-xl font-semibold mb-3", themeClasses.heading)}>📝 Student Checklist</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>☐ I can explain difference between combinational and sequential logic</div>
              <div>☐ I understand memory requires feedback</div>
              <div>☐ I can draw a simple feedback loop diagram</div>
              <div>☐ I know real-world examples (registers, counters)</div>
              <div>☐ I can identify when a system needs sequential elements</div>
              <div>☐ I’ve practiced distinguishing state-holding vs non-state circuits</div>
            </div>
          </div>

          {/* 9. Hint Section */}
          <div className={clsx("rounded-xl border p-5 shadow-md transition-all duration-300", themeClasses.hintBox)}>
            <h3 className={clsx("text-xl font-semibold mb-2", themeClasses.heading)}>🤔 Think About...</h3>
            <p className="italic">"If you remove the feedback path from a sequential circuit, what kind of circuit do you get? Observe carefully — the memory element becomes isolated. Try changing the feedback connection and see how state disappears."</p>
          </div>

          {/* 10. Teacher's Note */}
          <div className={clsx("rounded-xl border p-6 shadow-md transition-all duration-300 hover:shadow-xl", themeClasses.teacherNote)}>
            <h3 className={clsx("text-2xl font-semibold mb-3", themeClasses.heading)}>👨‍🏫 Teacher's Note: Sukanta Hui</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="font-medium">📧 sukantahui@codernaccotax.co.in | 📞 7003756860</p>
                <p className="mt-2"><strong>27+ years</strong> experience | Skills: Programming, RDBMS, OS, Web Development</p>
                <p className="mt-3">✨ <strong>Pro tip:</strong> "Sequential circuits are the heart of automation. Always visualize the feedback loop — it's like a roundabout that keeps traffic (data) flowing in a controlled way. Start with simple latches, master feedback, then clocks become natural."</p>
              </div>
              <div className="flex-1 border-l pl-4 border-gray-500">
                <p className="font-semibold">🎯 Key takeaway for today:</p>
                <p>Memory = feedback + bistable element. Without memory, your digital system is just a calculator — with it, you can build computers!</p>
                <p className="mt-2 text-sm">🔔 Remember to check the "Think About" section before next class on SR Latches.</p>
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

export default Topic0;