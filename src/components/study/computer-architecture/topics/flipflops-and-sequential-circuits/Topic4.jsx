import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import clock1 from "./topic4_files/clock1.png";

/**
 * Topic4: Clock Triggering in Flip-Flops
 * 
 * @component
 * @returns {JSX.Element} - Renders the learning module for clock triggering
 * 
 * Purpose: To explain the concept of a clock signal, differentiate between level triggering
 * and edge triggering (positive and negative edge), and establish the foundation for
 * synchronous sequential circuits.
 * 
 * When & Why: Understanding clock triggering is essential for designing and analyzing
 * flip-flops and all synchronous digital systems. It dictates when a memory element
 * updates its state.
 */

const Topic4 = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
          Topic 4: Clock Triggering in Flip‑Flops
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Mastering the heartbeat of sequential circuits — when and how flip‑flops respond to the clock.
        </p>
      </header>

      {/* Add later */}
      <section
        id="clock"
        ref={registerSection("clock")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.clock
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
          Clock Signal
        </h2>
        <p>
          Clock signal is a periodic signal and its ON time and OFF time need not be the same. We can represent the clock signal as a square wave, when both its ON time and OFF time are same. This clock signal is shown in the following figure.
        </p>

        <div className="flex flex-col md:flex-col gap-6 items-center mt-4">
          <div className="flex-1">
            <p> In this figure, square wave is considered as clock signal. This signal stays at logic High (5V) for some time and stays at logic Low (0V) for equal amount of time. This pattern repeats with some time period. In this case, the time period will be equal to either twice of ON time or twice of OFF time.</p>
          </div>
          <div className="flex-1">
            {/*Picture will be here */}
            <div className="flex flex-col items-center gap-6">

                    {/* Half Adder PNG */}
                    <img src={clock1} alt="SR Latch" className="max-w-full dark:invert"  />

                    {/* Boolean expressions */}
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 text-center">
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">
                            Clock Signal
                        </h3>
                        
                    </div>

                </div>
          </div>
        </div>
      </section>

      {/* 1. Concept of Clock Signal */}
      <section
        id="clock"
        ref={registerSection("clock")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.clock
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
          ⏱️ Concept of Clock Signal
        </h2>
        <p>
          A clock signal is a periodic square wave used to synchronize operations in digital circuits.
          It defines the rhythm — when memory elements should sample inputs and update outputs.
        </p>
        <div className="flex flex-col md:flex-row gap-6 items-center mt-4">
          <div className="flex-1">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Period (T):</strong> Time for one complete cycle.</li>
              <li><strong>Frequency (f):</strong> 1/T, measured in Hz.</li>
              <li><strong>Duty Cycle:</strong> Percentage of time the signal is high.</li>
              <li><strong>Rising Edge:</strong> Transition from low to high.</li>
              <li><strong>Falling Edge:</strong> Transition from high to low.</li>
            </ul>
          </div>
          <div className="flex-1">
            <svg width="280" height="120" viewBox="0 0 280 120" className="mx-auto">
              <polyline points="20,60 40,60 40,30 60,30 60,60 80,60 80,30 100,30 100,60 120,60 120,30 140,30 140,60 160,60 160,30 180,30 180,60 200,60" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <text x="30" y="20" fill="#3b82f6" fontSize="10">Rising Edge</text>
              <text x="110" y="20" fill="#3b82f6" fontSize="10">Falling Edge</text>
              <text x="250" y="70" fill="#3b82f6" fontSize="10">Period (T)</text>
              <line x1="200" y1="75" x2="240" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="200" y1="80" x2="200" y2="65" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="240" y1="80" x2="240" y2="65" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="italic">
            💡 Analogy from Barrackpore: The clock is like a conductor in an orchestra — it tells every musician (flip‑flop) exactly when to play (update).
          </p>
        </div>
      </section>

      {/* 2. Level Triggering vs Edge Triggering */}
      <section
        id="triggering"
        ref={registerSection("triggering")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.triggering
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
          🔄 Level Triggering vs Edge Triggering
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group hover:scale-[1.02] transition-transform bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300">Level Triggered</h3>
            <p>The output responds to the input <strong>as long as the clock is at a specific level</strong> (high or low).</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li><strong>Positive level:</strong> Clock = 1 → transparent.</li>
              <li><strong>Negative level:</strong> Clock = 0 → transparent.</li>
              <li>Example: D latch (level-sensitive).</li>
              <li>Susceptible to glitches (if input changes while clock high).</li>
            </ul>
          </div>
          <div className="group hover:scale-[1.02] transition-transform bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-300">Edge Triggered</h3>
            <p>The output samples the input <strong>only at the instant of a transition</strong> (rising or falling edge).</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li><strong>Positive edge:</strong> Samples on 0→1 transition.</li>
              <li><strong>Negative edge:</strong> Samples on 1→0 transition.</li>
              <li>Example: D flip‑flop (edge-sensitive).</li>
              <li>More robust against glitches.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">📊 Timing Comparison</h3>
          <svg width="100%" height="150" viewBox="0 0 600 150" className="mt-2">
            {/* Clock */}
            <text x="10" y="25" fontSize="10">Clock</text>
            <polyline points="40,20 80,20 80,40 120,40 120,20 160,20 160,40 200,40 200,20 240,20 240,40 280,40 280,20 320,20 320,40 360,40" stroke="#6b7280" fill="none" strokeWidth="1.5" />
            {/* Data */}
            <text x="10" y="70" fontSize="10">Data</text>
            <polyline points="40,60 100,60 100,80 160,80 160,60 220,60 220,80 280,80 280,60 340,60" stroke="#f97316" fill="none" strokeWidth="1.5" />
            {/* Level-triggered Q */}
            <text x="10" y="110" fontSize="10">Q (Level)</text>
            <polyline points="40,100 80,100 80,120 120,120 120,100 160,100 160,120 200,120 200,100 240,100 240,120 280,120 280,100 320,100 320,120 360,120" stroke="#10b981" fill="none" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Edge-triggered Q */}
            <text x="10" y="145" fontSize="10">Q (Edge)</text>
            <polyline points="40,135 80,135 80,135 120,135 120,135 160,135 160,155 200,155 200,135 240,135 240,155 280,155 280,135 320,135 320,155 360,155" stroke="#ef4444" fill="none" strokeWidth="1.5" />
            <text x="90" y="90" fontSize="8">Changes allowed</text>
            <text x="190" y="35" fontSize="8">Samples only at edges</text>
          </svg>
          <p className="text-xs text-center mt-1">Level‑triggered output follows data while clock high; edge‑triggered samples only at rising edges.</p>
        </div>
      </section>

      {/* 3. Positive Edge vs Negative Edge */}
      <section
        id="edges"
        ref={registerSection("edges")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.edges
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-emerald-500 pl-4 mb-4">
          ⬆️ Positive Edge vs ⬇️ Negative Edge
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">⬆️ Positive Edge (Rising Edge)</h3>
            <p>The flip‑flop samples input on the low‑to‑high transition. This is the most common triggering method in synchronous designs.</p>
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">Q_next = D at the instant of 0→1</div>
          </div>
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">⬇️ Negative Edge (Falling Edge)</h3>
            <p>The flip‑flop samples input on the high‑to‑low transition. Sometimes used to create half‑cycle delays or negative‑edge clocked systems.</p>
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">Q_next = D at the instant of 1→0</div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <svg width="400" height="100" viewBox="0 0 400 100">
            <polyline points="20,50 60,50 60,30 100,30 100,50 140,50 140,30 180,30 180,50 220,50 220,30 260,30 260,50 300,50 300,30 340,30 340,50 380,50" stroke="#2dd4bf" fill="none" strokeWidth="2" />
            <circle cx="60" cy="30" r="4" fill="#ef4444" />
            <text x="55" y="20" fill="#ef4444" fontSize="10">Rising Edge</text>
            <circle cx="100" cy="50" r="4" fill="#f97316" />
            <text x="95" y="65" fill="#f97316" fontSize="10">Falling Edge</text>
          </svg>
        </div>
      </section>

      {/* 4. Real-World Usage */}
      <section
        id="realworld"
        ref={registerSection("realworld")}
        className={clsx(
          "mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700",
          revealedSections.realworld
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="text-2xl md:text-3xl font-semibold border-l-4 border-cyan-500 pl-4 mb-4">
          🌍 Real‑World Applications
        </h2>
        <ul className="space-y-2">
          <li><strong>Microprocessors:</strong> Clock determines instruction fetch/decode/execute cycles.</li>
          <li><strong>Digital Communication:</strong> Edge‑triggered flip‑flops sample received data at precise moments.</li>
          <li><strong>Frequency Counters:</strong> Use edge detection to count events.</li>
          <li><strong>Memory Controllers:</strong> Use both edges to double data rate (DDR).</li>
        </ul>
        <div className="mt-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded">
          <p className="italic">📌 Example: Abhronila from Shyamnagar designs a simple frequency meter using a positive‑edge‑triggered counter to measure the speed of a rotating fan.</p>
        </div>
      </section>

      {/* 5. Tips & Tricks */}
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
          <li>✔️ Use <strong>positive edge triggering</strong> for most synchronous designs to simplify timing analysis.</li>
          <li>✔️ In FPGAs, avoid mixing edge types unless necessary; use a single clock domain.</li>
          <li>✔️ For double data rate (DDR) interfaces, use both edges but ensure proper setup/hold times.</li>
          <li>✔️ Simulate with a clock that has 50% duty cycle to test both level and edge behaviors.</li>
        </ul>
      </section>

      {/* 6. Common Mistakes */}
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
          <li><strong>Confusing level vs edge:</strong> Thinking a latch and flip‑flop are the same.</li>
          <li><strong>Ignoring setup/hold times:</strong> Violating these causes metastability.</li>
          <li><strong>Using both edges without care:</strong> Can create race conditions in multi‑stage logic.</li>
          <li><strong>Assuming clock is ideal:</strong> Real clocks have jitter and skew; account for them.</li>
        </ul>
      </section>

      {/* 7. Best Practices */}
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
          <li>✔️ Clearly define clock domains and use consistent edge types.</li>
          <li>✔️ In HDL code, use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">@(posedge clk)</code> for edge‑triggered blocks.</li>
          <li>✔️ Verify timing constraints with setup/hold analysis.</li>
          <li>✔️ Document clock frequency and edge sensitivity in schematics.</li>
        </ul>
      </section>

      {/* 8. Mini Checklist */}
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
          <div className="flex items-center gap-2"><span className="text-indigo-500">□</span> I understand clock signal parameters (period, frequency, duty cycle).</div>
          <div className="flex items-center gap-2"><span className="text-indigo-500">□</span> I can differentiate level triggering from edge triggering.</div>
          <div className="flex items-center gap-2"><span className="text-indigo-500">□</span> I can explain positive and negative edge triggering.</div>
          <div className="flex items-center gap-2"><span className="text-indigo-500">□</span> I know when to use each type in real designs.</div>
        </div>
      </section>

      {/* 9. Hint Section */}
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
          <li>If you have a positive‑edge‑triggered flip‑flop, what happens if the clock stays high for a long time? Does it keep sampling? (No, only at the edge)</li>
          <li>Observe carefully: Why is edge triggering more resistant to noise than level triggering?</li>
          <li>Try changing the clock duty cycle — how does it affect a level‑sensitive latch?</li>
        </ul>
        <p className="mt-3 text-sm italic">These questions prepare you for analyzing real clock distribution networks.</p>
      </section>

      {/* 10. Teacher's Note */}
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
        <Teacher note="This topic is the turning point where students move from latches to flip‑flops. Emphasize that edge triggering is the foundation of synchronous design. Use the analogy of a camera: level‑triggered is like a video camera (records continuously), edge‑triggered is like a still camera (takes a snapshot at the click). In Barrackpore class, Tuhina asked: 'Why do we need both edges?' Explain that negative edge can be used to create half‑cycle delays, and both edges are used in DDR memories. Always stress that mixing edges in the same design without careful synchronization can cause race conditions." />
      </div>
    </div>
  );
};

export default Topic4;