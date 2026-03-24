import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic3: D Latch
 * 
 * @component
 * @returns {JSX.Element} - Renders the learning module for D Latch
 * 
 * Purpose: To explain how the D Latch eliminates the invalid state of SR latches,
 * introduce the concept of data transparency, and demonstrate practical usage in
 * buffering and storage.
 * 
 * When & Why: D Latch is essential when we need a simple 1-bit memory element
 * without the forbidden state. It forms the basis for D flip-flops and registers.
 */

const Topic3 = () => {
  // Intersection Observer for section reveal animations
  const [revealedSections, setRevealedSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealedSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const registerSection = (id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 font-sans leading-relaxed text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header
        id="header"
        ref={registerSection("header")}
        className={clsx(
          "text-center mb-12 transition-all duration-700 transform",
          revealedSections.header
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent mb-4">
          Topic 3: D Latch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A reliable 1‑bit memory that eliminates the invalid state — the foundation of modern storage.
        </p>
      </header>

      {/* 1. Why D Latch? Eliminating Invalid State */}
      <section
        id="elimination"
        ref={registerSection("elimination")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.elimination
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-teal-500 pl-4 mb-4">
          🚫 Eliminating the Invalid State
        </h2>
        <p>
          The SR latch has a problematic condition: when both S=1 and R=1, the output is invalid (both Q and Q̅ become 0 for NOR, or 1 for NAND).
          This is ambiguous and must be avoided. The <strong>D Latch</strong> solves this by having only <strong>one data input (D)</strong> and an <strong>enable (E)</strong>.
        </p>
        <div className="mt-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
          <p className="italic">
            💡 Think of it like a door with a lock: The enable (E) is the key — only when the key is turned (E=1), the door follows the command (D).
            When the key is removed (E=0), the door stays in its last position. No more “forbidden” commands.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <svg width="280" height="160" viewBox="0 0 280 160" className="hover:scale-105 transition-transform">
            <rect x="90" y="40" width="100" height="80" fill="#14b8a6" fillOpacity="0.2" stroke="#14b8a6" strokeWidth="2" rx="8" />
            <text x="140" y="80" textAnchor="middle" fill="#14b8a6" fontSize="14">D Latch</text>
            <path d="M30 80 L90 80" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#tealArrow)" />
            <text x="45" y="70" fill="#14b8a6" fontSize="12">D (Data)</text>
            <path d="M190 80 L250 80" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#tealArrow)" />
            <text x="210" y="70" fill="#14b8a6" fontSize="12">Q</text>
            <path d="M140 120 L140 150" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 2" />
            <text x="145" y="140" fill="#14b8a6" fontSize="10">Enable (E)</text>
            <defs><marker id="tealArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon points="0 0, 8 4, 0 8" fill="#14b8a6" /></marker></defs>
          </svg>
        </div>
      </section>

      {/* 2. Data Transparency Concept */}
      <section
        id="transparency"
        ref={registerSection("transparency")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.transparency
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-cyan-500 pl-4 mb-4">
          🔍 Data Transparency
        </h2>
        <p>
          When the enable (E) is active (E=1), the output Q <strong>transparently follows</strong> the input D.
          That means any change on D immediately appears at Q — the latch behaves like a wire.
          When E=0, the output holds the last value of D before the enable went low.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <span className="font-bold">E = 1 (Transparent Mode)</span>
            <div className="flex justify-center items-center gap-2 mt-2">
              <span>D →</span>
              <div className="w-12 h-12 bg-cyan-200 dark:bg-cyan-800 rounded flex items-center justify-center">Q = D</div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
            <span className="font-bold">E = 0 (Latched Mode)</span>
            <div className="flex justify-center items-center gap-2 mt-2">
              <span>D ↛</span>
              <div className="w-12 h-12 bg-gray-400 dark:bg-gray-600 rounded flex items-center justify-center">Q holds</div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-lg">📈 Timing Diagram (Behavior)</h3>
          <svg width="100%" height="120" viewBox="0 0 600 120" className="mt-2">
            <rect x="20" y="10" width="560" height="100" fill="none" stroke="#aaa" strokeWidth="1" />
            {/* Clock Enable */}
            <text x="5" y="35" fontSize="10">E</text>
            <rect x="40" y="20" width="80" height="20" fill="#2dd4bf" fillOpacity="0.6" stroke="#2dd4bf" />
            <rect x="140" y="20" width="80" height="20" fill="none" stroke="#2dd4bf" />
            <rect x="240" y="20" width="80" height="20" fill="#2dd4bf" fillOpacity="0.6" stroke="#2dd4bf" />
            <rect x="340" y="20" width="80" height="20" fill="none" stroke="#2dd4bf" />
            <rect x="440" y="20" width="80" height="20" fill="#2dd4bf" fillOpacity="0.6" stroke="#2dd4bf" />
            <text x="20" y="70" fontSize="10">D</text>
            <polyline points="40,60 120,60 120,80 200,80 200,40 280,40 280,60 360,60 360,80 440,80 440,40 520,40" stroke="#f97316" fill="none" strokeWidth="2" />
            <text x="20" y="100" fontSize="10">Q</text>
            <polyline points="40,90 120,90 120,110 200,110 200,90 280,90 280,110 360,110 360,90 440,90 440,110 520,110" stroke="#0ea5e9" fill="none" strokeWidth="2" />
            <text x="80" y="15" fontSize="8">Transparent</text>
            <text x="280" y="15" fontSize="8">Hold</text>
          </svg>
          <p className="text-xs text-center mt-1">When E is high, Q follows D; when E low, Q holds previous value.</p>
        </div>
      </section>

      {/* 3. Practical Usage: Buffering and Storage */}
      <section
        id="usage"
        ref={registerSection("usage")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.usage
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
          🛠️ Practical Usage: Buffering & Storage
        </h2>
        <ul className="space-y-3">
          <li><strong>Data Buffering:</strong> D latches are used in register files and temporary storage to hold data while processing.</li>
          <li><strong>Bus Hold Circuits:</strong> In microprocessors, D latches can hold bus values when no device is driving.</li>
          <li><strong>Debouncing Switches:</strong> A D latch can clean up noisy mechanical switch signals (with appropriate logic).</li>
          <li><strong>Sample-and-Hold:</strong> In analog-to-digital converters, a D latch (with analog front‑end) captures the voltage at a specific moment.</li>
        </ul>
        <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded">
          <p className="italic">📌 Real-world example: Debangshu from Ichapur built a simple digital thermometer that uses a D latch to hold the temperature reading until the next measurement.</p>
        </div>
      </section>

      {/* 4. Circuit Design from SR Latch */}
      <section
        id="circuit"
        ref={registerSection("circuit")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.circuit
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
          🔧 Circuit Design: From SR Latch to D Latch
        </h2>
        <p>
          A D latch can be built by adding an inverter to the SR latch. The inverter ensures that S and R are always complements, eliminating the invalid state.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-4">
          <div className="text-center">
            <svg width="200" height="120" viewBox="0 0 200 120">
              <rect x="50" y="30" width="100" height="60" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" rx="8" />
              <text x="100" y="65" textAnchor="middle" fill="#a855f7" fontSize="12">SR Latch</text>
              <text x="100" y="85" textAnchor="middle" fill="#a855f7" fontSize="10">S,R inputs</text>
              <path d="M20 60 L50 60" stroke="#a855f7" strokeWidth="2" />
              <text x="25" y="55" fill="#a855f7" fontSize="10">S</text>
              <path d="M20 90 L50 90" stroke="#a855f7" strokeWidth="2" />
              <text x="25" y="85" fill="#a855f7" fontSize="10">R</text>
            </svg>
            <p className="text-sm mt-2">SR Latch → has invalid (S=1,R=1)</p>
          </div>
          <div className="text-2xl font-bold text-gray-400">+</div>
          <div className="text-center">
            <svg width="100" height="60" viewBox="0 0 100 60">
              <rect x="20" y="10" width="60" height="40" fill="#f97316" fillOpacity="0.2" stroke="#f97316" strokeWidth="2" rx="5" />
              <text x="50" y="35" textAnchor="middle" fill="#f97316" fontSize="12">NOT</text>
            </svg>
            <p className="text-sm mt-2">Inverter</p>
          </div>
          <div className="text-2xl font-bold text-gray-400">=</div>
          <div className="text-center">
            <svg width="200" height="120" viewBox="0 0 200 120">
              <rect x="50" y="30" width="100" height="60" fill="#14b8a6" fillOpacity="0.2" stroke="#14b8a6" strokeWidth="2" rx="8" />
              <text x="100" y="65" textAnchor="middle" fill="#14b8a6" fontSize="12">D Latch</text>
              <text x="100" y="85" textAnchor="middle" fill="#14b8a6" fontSize="10">D, E inputs</text>
              <path d="M20 60 L50 60" stroke="#14b8a6" strokeWidth="2" />
              <text x="25" y="55" fill="#14b8a6" fontSize="10">D</text>
              <path d="M20 90 L50 90" stroke="#14b8a6" strokeWidth="2" />
              <text x="25" y="85" fill="#14b8a6" fontSize="10">E</text>
            </svg>
            <p className="text-sm mt-2">D Latch: D = S, D̅ = R</p>
          </div>
        </div>
      </section>

      {/* 5. Truth Table & Characteristics */}
      <section
        id="truth"
        ref={registerSection("truth")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.truth
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-emerald-500 pl-4 mb-4">
          📋 Truth Table & Characteristics
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 dark:bg-gray-800 rounded-lg">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="px-4 py-2">Enable (E)</th>
                <th className="px-4 py-2">Data (D)</th>
                <th className="px-4 py-2">Output Q (next)</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-2 text-center">0</td><td className="px-4 py-2 text-center">X</td><td className="px-4 py-2 text-center">Q (previous)</td><td>Hold state</td></tr>
              <tr className="border-b"><td className="px-4 py-2 text-center">1</td><td className="px-4 py-2 text-center">0</td><td className="px-4 py-2 text-center">0</td><td>Transparent: Q = 0</td></tr>
              <tr><td className="px-4 py-2 text-center">1</td><td className="px-4 py-2 text-center">1</td><td className="px-4 py-2 text-center">1</td><td>Transparent: Q = 1</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          <strong>Characteristic Equation:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Q_next = E·D + E̅·Q</code><br />
          This shows that when E=1, Q_next = D; when E=0, Q_next = Q (hold).
        </p>
      </section>

      {/* 6. Tips & Tricks */}
      <section
        id="tips"
        ref={registerSection("tips")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.tips
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
          💡 Tips & Tricks (Professional)
        </h2>
        <ul className="space-y-2">
          <li>✔️ Use D latches in <strong>level-sensitive</strong> applications like transparent buffers.</li>
          <li>✔️ For <strong>edge-triggered</strong> storage, use D flip‑flops (two latches in series).</li>
          <li>✔️ In FPGA/ASIC design, D latches are often inferred from “if (enable) q = d;” but use them carefully to avoid unintended latches.</li>
          <li>✔️ The characteristic equation helps to quickly determine next state for analysis.</li>
        </ul>
      </section>

      {/* 7. Common Mistakes */}
      <section
        id="mistakes"
        ref={registerSection("mistakes")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.mistakes
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
          ❌ Common Pitfalls
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Confusing with D flip-flop:</strong> D latch is level‑sensitive, D flip‑flop is edge‑triggered.</li>
          <li><strong>Forgetting hold time:</strong> In transparent mode, any glitch on D passes to Q, causing unintended changes.</li>
          <li><strong>Assuming invalid state is impossible:</strong> If enable is asynchronous, race conditions can still occur.</li>
          <li><strong>Misusing in synchronous designs:</strong> D latches can make timing analysis difficult; use flip‑flops for clocked designs.</li>
        </ul>
      </section>

      {/* 8. Best Practices */}
      <section
        id="best"
        ref={registerSection("best")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.best
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-emerald-500 pl-4 mb-4">
          ✅ Best Practices
        </h2>
        <ul className="space-y-2">
          <li>✔️ In VHDL/Verilog, explicitly specify latches with “if (enable) q &lt= d;” and ensure all paths are covered to avoid unintended latches.</li>
          <li>✔️ Use D latches only when necessary; otherwise, prefer edge‑triggered flip‑flops for synchronous design.</li>
          <li>✔️ When simulating, verify transparency by toggling D while E is high and observe Q immediately following.</li>
          <li>✔️ Document the purpose: “transparent latch used for bus hold” etc.</li>
        </ul>
      </section>

      {/* 9. Mini Checklist */}
      <section
        id="checklist"
        ref={registerSection("checklist")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.checklist
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
          📋 Mini Checklist
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2"><span className="text-indigo-500">□</span> I understand why D latch eliminates the invalid state.</div>
          <div className="flex items-center gap-2"><span className="text-indigo-500">□</span> I can explain data transparency and its timing implications.</div>
          <div className="flex items-center gap-2"><span className="text-indigo-500">□</span> I know where D latches are used (buffering, storage, debouncing).</div>
          <div className="flex items-center gap-2"><span className="text-indigo-500">□</span> I can derive the characteristic equation and truth table.</div>
        </div>
      </section>

      {/* 10. Hint Section */}
      <section
        id="hint"
        ref={registerSection("hint")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border-l-8 border-amber-400",
          revealedSections.hint
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-xl font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2">💭 Hint Section</h2>
        <p className="mt-2">Think about…</p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li>If you connect two D latches in series with opposite enable phases, what do you get?</li>
          <li>Observe carefully: What happens if D changes exactly when enable is toggling? (Metastability)</li>
          <li>Try changing the inverter to a different logic — can you still avoid the invalid state?</li>
        </ul>
        <p className="mt-3 text-sm italic">These questions build intuition for edge‑triggered flip‑flops.</p>
      </section>

      {/* 11. Teacher's Note */}
      <div
        id="teacherNote"
        ref={registerSection("teacherNote")}
        className={clsx(
          "mb-6 transition-all duration-700",
          revealedSections.teacherNote
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <Teacher note="The D latch is the first practical memory element for students. Emphasize that 'transparent' means the output follows input immediately — this can cause glitches if the data changes while enable is active. Use Tuhina's question in class: 'Why can't we just use a wire instead of a latch?' Because the wire doesn't remember when enable is low. Also, connect this to the upcoming D flip‑flop: two D latches in master‑slave configuration create edge triggering. Show the timing diagram with a real clock to solidify understanding." />
      </div>
    </div>
  );
};

export default Topic3;