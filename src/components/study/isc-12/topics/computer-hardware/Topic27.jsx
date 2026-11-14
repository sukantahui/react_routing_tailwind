import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Table, Check, BookOpen } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import { faqs } from "./faqs/topic27_faqs";

const Topic27 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Selected minterms for F(x, y, z)
  // Textbook Page 108: F(x, y, z) = Σ(1, 3, 5, 6)
  const [minterms, setMinterms] = useState([1, 3, 5, 6]);

  // Live input test values
  const [valX, setValX] = useState(false);
  const [valY, setValY] = useState(false);
  const [valZ, setValZ] = useState(true);

  const toggleMinterm = (m) => {
    if (minterms.includes(m)) {
      setMinterms(minterms.filter((x) => x !== m));
    } else {
      setMinterms([...minterms, m].sort((a, b) => a - b));
    }
  };

  // Implementation Table Analysis following Textbook Page 108 (Steps IV, V, VI):
  // Singled-Out Leftmost Variable: x (MSB)
  // Selection Lines: S1 = y, S0 = z
  // Row 1: x' (minterms 0 to 2^n/2 - 1 = 0, 1, 2, 3)
  // Row 2: x  (minterms 2^n/2 to 2^n - 1 = 4, 5, 6, 7)
  const getColAnalysis = (topMinterm, bottomMinterm) => {
    const isTopCircled = minterms.includes(topMinterm);
    const isBottomCircled = minterms.includes(bottomMinterm);

    if (!isTopCircled && !isBottomCircled) {
      return { val: "0", rule: "Rule 1", desc: "If the two minterms in a column are not circled, apply 0" };
    }
    if (isTopCircled && isBottomCircled) {
      return { val: "1", rule: "Rule 2", desc: "If the two minterms are circled, apply 1" };
    }
    if (!isTopCircled && isBottomCircled) {
      return { val: "x", rule: "Rule 3", desc: "If the bottom minterm is circled and top is not, apply x" };
    }
    return { val: "x'", rule: "Rule 4", desc: "If the top minterm is circled and bottom is not, apply x'" };
  };

  const colI0 = getColAnalysis(0, 4);
  const colI1 = getColAnalysis(1, 5);
  const colI2 = getColAnalysis(2, 6);
  const colI3 = getColAnalysis(3, 7);

  // Compute live output for (x, y, z)
  const currentMinterm = (valX ? 4 : 0) + (valY ? 2 : 0) + (valZ ? 1 : 0);
  const outputF = minterms.includes(currentMinterm) ? 1 : 0;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 27
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1.5">
              <BookOpen size={12} /> Textbook Page 108 Standard
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Realization of Boolean Functions using $4 \times 1$ Multiplexer
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Textbook Page 108 (Section 2.3.4A): Implementation of $F(x, y, z) = \Sigma(1, 3, 5, 6)$ on a $4 \times 1$ MUX using Steps IV, V, VI, Rules 1–4, and Figure 2.25.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "truthTable", label: "1. Page 108 Circuit & Tables" },
              { id: "steps", label: "2. Textbook Steps IV, V & VI" },
              { id: "rules", label: "3. Inspection Rules 1–4" },
              { id: "interactive", label: "4. Interactive MUX Simulator" },
              { id: "examTips", label: "5. ISC Board Exam Focus" },
              { id: "faqs", label: "6. 15 Essential FAQs" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                    : "bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* TAB 1: CIRCUIT & TABLES (DEFAULT TAB) */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Textbook Page 108: Implementation Table &amp; Figure 2.25</h2>
              <p className="text-xs text-slate-400">Exact reproduction and interactive derivation of Example $F(x, y, z) = \Sigma(1, 3, 5, 6)$</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 text-xs">
            {/* TRUTH TABLE (FROM PAGE 107) */}
            <div className="space-y-2">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                1. Truth Table for $F(x, y, z)$ (Textbook Page 107)
              </span>
              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
                <table className="w-full text-center font-mono">
                  <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                    <tr>
                      <th className="p-2">Row</th>
                      <th className="p-2 text-indigo-400 font-bold">x (Data)</th>
                      <th className="p-2 text-cyan-400 font-bold">y (S₁)</th>
                      <th className="p-2 text-cyan-400 font-bold">z (S₀)</th>
                      <th className="p-2 text-emerald-400 font-bold">F</th>
                      <th className="p-2 text-slate-400">Minterm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 text-slate-300">
                    <tr><td className="p-1.5 text-slate-500">0</td><td>0</td><td>0</td><td>0</td><td className="font-bold text-slate-500">0</td><td className="text-slate-400">x&apos;y&apos;z&apos;</td></tr>
                    <tr className="bg-emerald-950/20"><td className="p-1.5 font-bold text-emerald-400">1</td><td>0</td><td>0</td><td>1</td><td className="font-bold text-emerald-400">1</td><td className="text-emerald-300">x&apos;y&apos;z</td></tr>
                    <tr><td className="p-1.5 text-slate-500">2</td><td>0</td><td>1</td><td>0</td><td className="font-bold text-slate-500">0</td><td className="text-slate-400">x&apos;yz&apos;</td></tr>
                    <tr className="bg-emerald-950/20"><td className="p-1.5 font-bold text-emerald-400">3</td><td>0</td><td>1</td><td>1</td><td className="font-bold text-emerald-400">1</td><td className="text-emerald-300">x&apos;yz</td></tr>
                    <tr><td className="p-1.5 text-slate-500">4</td><td>1</td><td>0</td><td>0</td><td className="font-bold text-slate-500">0</td><td className="text-slate-400">xy&apos;z&apos;</td></tr>
                    <tr className="bg-emerald-950/20"><td className="p-1.5 font-bold text-emerald-400">5</td><td>1</td><td>0</td><td>1</td><td className="font-bold text-emerald-400">1</td><td className="text-emerald-300">xy&apos;z</td></tr>
                    <tr className="bg-emerald-950/20"><td className="p-1.5 font-bold text-emerald-400">6</td><td>1</td><td>1</td><td>0</td><td className="font-bold text-emerald-400">1</td><td className="text-emerald-300">xyz&apos;</td></tr>
                    <tr><td className="p-1.5 text-slate-500">7</td><td>1</td><td>1</td><td>1</td><td className="font-bold text-slate-500">0</td><td className="text-slate-400">xyz</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* IMPLEMENTATION TABLE (PAGE 108 STEP V & VI) */}
            <div className="space-y-4">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                2. Implementation Table (Textbook Page 108 Step V &amp; VI)
              </span>
              <div className="overflow-x-auto border border-indigo-900/60 rounded-xl bg-slate-950 shadow-md">
                <table className="w-full text-center font-mono">
                  <thead className="bg-indigo-950/60 text-slate-200 border-b border-indigo-800">
                    <tr>
                      <th className="p-2.5 text-left text-amber-400">Variable</th>
                      <th className="p-2.5 text-cyan-300 font-bold">I₀</th>
                      <th className="p-2.5 text-cyan-300 font-bold">I₁</th>
                      <th className="p-2.5 text-cyan-300 font-bold">I₂</th>
                      <th className="p-2.5 text-cyan-300 font-bold">I₃</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-2.5 text-left font-bold text-indigo-400">x&apos; (x=0)</td>
                      <td className="p-2.5 text-slate-500">0</td>
                      <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded">① (Circled)</td>
                      <td className="p-2.5 text-slate-500">2</td>
                      <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded">③ (Circled)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-left font-bold text-indigo-400">x (x=1)</td>
                      <td className="p-2.5 text-slate-500">4</td>
                      <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded">⑤ (Circled)</td>
                      <td className="p-2.5 font-bold text-emerald-300 bg-emerald-950/50 rounded">⑥ (Circled)</td>
                      <td className="p-2.5 text-slate-500">7</td>
                    </tr>
                    <tr className="bg-slate-900 font-bold">
                      <td className="p-2.5 text-left text-amber-400">Applied Input:</td>
                      <td className="p-2.5 text-rose-400 bg-slate-950">0 (Rule 1)</td>
                      <td className="p-2.5 text-emerald-400 bg-slate-950">1 (Rule 2)</td>
                      <td className="p-2.5 text-cyan-400 bg-slate-950">x (Rule 3)</td>
                      <td className="p-2.5 text-indigo-400 bg-slate-950">x&apos; (Rule 4)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* DEDUCTIONS FROM PAGE 108 */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-[11px]">
                <div className="font-bold text-indigo-300">Values applied to inputs $I_0, I_1, I_2, I_3$ (Page 108):</div>
                <div className="text-slate-300 font-mono space-y-0.5">
                  <div>&bull; <strong className="text-rose-400">I₀ is applied 0</strong> (Rule 1: neither minterm 0 nor 4 is circled)</div>
                  <div>&bull; <strong className="text-emerald-400">I₁ is applied 1</strong> (Rule 2: both minterms 1 and 5 are circled)</div>
                  <div>&bull; <strong className="text-cyan-400">I₂ is applied x</strong> (Rule 3: bottom minterm 6 is circled, top 2 is not)</div>
                  <div>&bull; <strong className="text-indigo-400">I₃ is applied x&apos;</strong> (Rule 4: top minterm 3 is circled, bottom 7 is not)</div>
                </div>
              </div>
            </div>
          </div>

          {/* CIRCUIT DIAGRAM SVG (FIG 2.25) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Figure 2.25: Multiplexer Implementation of $F(x, y, z) = \Sigma(1, 3, 5, 6)$ (Textbook Page 108)
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                4 &times; 1 MUX + 1 NOT Gate
              </span>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 540 230" className="w-full max-w-lg h-auto font-mono text-xs select-none">
                {/* Inputs */}
                {/* I0 = 0 */}
                <line x1="30" y1="45" x2="160" y2="45" stroke="#ef4444" strokeWidth="2" />
                <circle cx="30" cy="45" r="3" fill="#ef4444" />
                <text x="12" y="49" fill="#ef4444" fontWeight="bold">0</text>
                <text x="165" y="49" fill="#94a3b8">I₀</text>

                {/* I1 = 1 */}
                <line x1="30" y1="80" x2="160" y2="80" stroke="#10b981" strokeWidth="2" />
                <circle cx="30" cy="80" r="3" fill="#10b981" />
                <text x="12" y="84" fill="#10b981" fontWeight="bold">1</text>
                <text x="165" y="84" fill="#94a3b8">I₁</text>

                {/* I2 = x */}
                <line x1="30" y1="115" x2="160" y2="115" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="30" cy="115" r="3" fill="#38bdf8" />
                <text x="12" y="119" fill="#38bdf8" fontWeight="bold">x</text>
                <text x="165" y="119" fill="#94a3b8">I₂</text>

                {/* I3 = x' (NOT gate on x) */}
                <line x1="30" y1="150" x2="70" y2="150" stroke="#818cf8" strokeWidth="2" />
                <circle cx="30" cy="150" r="3" fill="#818cf8" />
                <text x="12" y="154" fill="#818cf8" fontWeight="bold">x</text>
                <polygon points="70,142 90,150 70,158" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <circle cx="93" cy="150" r="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <line x1="96" y1="150" x2="160" y2="150" stroke="#818cf8" strokeWidth="2" />
                <text x="102" y="145" fill="#a5b4fc" fontSize="10">x&apos;</text>
                <text x="165" y="154" fill="#94a3b8">I₃</text>

                {/* 4:1 MUX Block */}
                <rect x="180" y="25" width="160" height="150" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                <text x="260" y="65" fill="#ffffff" fontWeight="bold" fontSize="15" textAnchor="middle">4 &times; 1</text>
                <text x="260" y="85" fill="#a5b4fc" fontWeight="bold" fontSize="13" textAnchor="middle">MUX</text>

                {/* Selection lines: S1 = y, S0 = z */}
                <line x1="225" y1="210" x2="225" y2="175" stroke="#06b6d4" strokeWidth="2" />
                <text x="225" y="167" fill="#06b6d4" textAnchor="middle" fontSize="11">S₁</text>
                <text x="225" y="222" fill="#06b6d4" textAnchor="middle" fontWeight="bold" fontSize="13">y</text>

                <line x1="295" y1="210" x2="295" y2="175" stroke="#06b6d4" strokeWidth="2" />
                <text x="295" y="167" fill="#06b6d4" textAnchor="middle" fontSize="11">S₀</text>
                <text x="295" y="222" fill="#06b6d4" textAnchor="middle" fontWeight="bold" fontSize="13">z</text>

                {/* Output line F */}
                <line x1="340" y1="100" x2="440" y2="100" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="440" cy="100" r="3.5" fill="#10b981" />
                <text x="455" y="105" fill="#10b981" fontWeight="bold" fontSize="15">F</text>
                <text x="360" y="90" fill="#94a3b8" fontSize="10">&Sigma;(1, 3, 5, 6)</text>
              </svg>
            </div>

            {/* 4x1 MUX EQUATION (EXACTLY AS PRINTED ON PAGE 108) */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-amber-400">The equation for a $4 \times 1$ MUX (Textbook Page 108):</div>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-center text-sm text-cyan-300 border border-slate-800">
                F = S̄₁ S̄₀ I₀ + S̄₁ S₀ I₁ + S₁ S̄₀ I₂ + S₁ S₀ I₃
              </div>
              <p className="text-slate-400 text-[11px]">
                Substituting the inputs $I_0 = 0$, $I_1 = 1$, $I_2 = x$, $I_3 = x&apos;$ with $S_1 = y$ and $S_0 = z$:
              </p>
              <div className="font-mono text-emerald-400 text-center font-bold">
                F = y&apos;z&apos;(0) + y&apos;z(1) + yz&apos;(x) + yz(x&apos;) = y&apos;z + xyz&apos; + x&apos;yz &equiv; &Sigma;(1, 3, 5, 6)
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: TEXTBOOK STEPS IV, V, VI */}
      {activeTab === "steps" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Verbatim Textbook Derivation: Steps IV, V &amp; VI</h2>
              <p className="text-xs text-slate-400">From Textbook Page 108 of Chapter 2: Computer Hardware</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* STEP IV */}
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 space-y-2">
              <div className="flex items-center justify-between text-indigo-400 font-bold">
                <span className="text-sm font-sans">Step IV: Partitioning Minterms into Complemented and Uncomplemented Halves</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 font-mono">Page 108</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                Now, consider the single variable (highest-order variable) which in our case is $x$. If you have a look at the truth table of $F(x, y, z)$, $x$ is 0 for the first half of the minterms (i.e., for $m_0, m_1, m_2, m_3$, $x$ is 0) and it is 1 for the second half of the minterms (i.e., $m_4, m_5, m_6, m_7$).
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-cyan-300 space-y-1">
                <div>&bull; x is complemented in minterms 0 to (2^n/2 - 1) &rarr; 0 to (2^3/2 - 1) = 0 to 3 (m₀, m₁, m₂, m₃)</div>
                <div>&bull; x is uncomplemented for minterms 2^n/2 to (2^n - 1) &rarr; 2^3/2 to (2^3 - 1) = 4 to 7 (m₄, m₅, m₆, m₇)</div>
              </div>
            </div>

            {/* STEP V */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-2">
              <div className="flex items-center justify-between text-cyan-400 font-bold">
                <span className="text-sm font-sans">Step V: 2-Row Implementation Table Setup &amp; Minterm Circling</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 font-mono">Page 108</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                List the inputs of the multiplexer ($I_0, I_1, I_2, I_3$) and under them list all minterms in two rows.
                The first row lists all those minterms where $x$ is complemented ($x&apos;$), and the second row all the minterms with $x$ uncomplemented ($x$):
              </p>
              <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 font-mono text-center p-2">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="p-2 text-left">Row</th>
                      <th className="p-2">I₀</th>
                      <th className="p-2">I₁</th>
                      <th className="p-2">I₂</th>
                      <th className="p-2">I₃</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 text-left text-indigo-400 font-bold">x&apos;</td>
                      <td className="p-2">0</td>
                      <td className="p-2 text-emerald-400 font-bold">1</td>
                      <td className="p-2">2</td>
                      <td className="p-2 text-emerald-400 font-bold">3</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left text-indigo-400 font-bold">x</td>
                      <td className="p-2">4</td>
                      <td className="p-2 text-emerald-400 font-bold">5</td>
                      <td className="p-2 text-emerald-400 font-bold">6</td>
                      <td className="p-2">7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-slate-400 font-sans">
                Circle all the minterms of the given function $F(x, y, z) = \Sigma(1, 3, 5, 6)$ and inspect each column separately.
              </p>
            </div>

            {/* STEP VI */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="text-sm font-sans">Step VI: Applying the 4 Decision Rules to Assign Inputs</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 font-mono">Page 108</span>
              </div>
              <p className="text-slate-300 font-sans">
                This step decides the values to be applied to inputs according to the 4 inspection rules (see Tab 3 for full rule definitions).
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: RULES 1-4 */}
      {activeTab === "rules" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">The 4 Fundamental Inspection Rules (Page 108 Step VI)</h2>
              <p className="text-xs text-slate-400">Verbatim definitions and circuit wiring connections required in ISC exams</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-amber-400 font-bold">Rule</th>
                    <th className="p-3 text-cyan-400 font-bold">Circle Inspection Condition</th>
                    <th className="p-3 text-emerald-400 font-bold">Applied Input</th>
                    <th className="p-3 text-slate-400">Hardware Wiring</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 1</td>
                    <td className="p-3">If the two minterms in a column are NOT circled</td>
                    <td className="p-3 font-bold text-rose-400">0</td>
                    <td className="p-3 text-slate-400">Connect to Ground (GND / Logic 0)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 2</td>
                    <td className="p-3">If the two minterms in a column ARE circled</td>
                    <td className="p-3 font-bold text-emerald-400">1</td>
                    <td className="p-3 text-slate-400">Connect to Supply (+5V / VCC / Logic 1)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 3</td>
                    <td className="p-3">If the bottom minterm is circled and top is NOT circled</td>
                    <td className="p-3 font-bold text-cyan-400">x (uncomplemented)</td>
                    <td className="p-3 text-slate-400">Connect directly to input variable line $x$</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Rule 4</td>
                    <td className="p-3">If the top minterm is circled and bottom is NOT circled</td>
                    <td className="p-3 font-bold text-indigo-400">x&apos; (complemented)</td>
                    <td className="p-3 text-slate-400">Connect through a NOT gate (inverter) from $x$</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <span className="font-bold text-amber-400 block">Application to $F(x, y, z) = \Sigma(1, 3, 5, 6)$:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
                <li><strong className="text-white">Column I₀:</strong> Neither 0 nor 4 is circled $\implies$ <strong className="text-rose-400">I₀ = 0 (Rule 1)</strong></li>
                <li><strong className="text-white">Column I₁:</strong> Both 1 and 5 are circled $\implies$ <strong className="text-emerald-400">I₁ = 1 (Rule 2)</strong></li>
                <li><strong className="text-white">Column I₂:</strong> Bottom minterm 6 circled, top 2 not $\implies$ <strong className="text-cyan-400">I₂ = x (Rule 3)</strong></li>
                <li><strong className="text-white">Column I₃:</strong> Top minterm 3 circled, bottom 7 not $\implies$ <strong className="text-indigo-400">I₃ = x&apos; (Rule 4)</strong></li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Textbook Page 108 MUX Simulator</h2>
              <p className="text-xs text-slate-400">Toggle inputs $x, y, z$ to verify real-time routing through the $4 \times 1$ MUX</p>
            </div>
          </div>

          {/* INPUT SWITCHES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "x", name: "Data Literal (x)", val: valX, set: setValX, color: "indigo" },
              { id: "y", name: "Select Line S₁ (y)", val: valY, set: setValY, color: "cyan" },
              { id: "z", name: "Select Line S₀ (z)", val: valZ, set: setValZ, color: "emerald" }
            ].map((pin) => (
              <div
                key={pin.id}
                onClick={() => pin.set(!pin.val)}
                className={clsx(
                  "p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                  pin.val
                    ? `bg-${pin.color}-950/40 border-${pin.color}-500/50 shadow-lg shadow-${pin.color}-500/10`
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                )}
              >
                <div>
                  <span className="text-xs text-slate-400 font-mono">Variable {pin.id}</span>
                  <div className="text-sm font-bold text-white">{pin.name}</div>
                </div>
                <div
                  className={clsx(
                    "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm",
                    pin.val
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "bg-slate-800 text-slate-400"
                  )}
                >
                  {pin.val ? "1" : "0"}
                </div>
              </div>
            ))}
          </div>

          {/* DETAILS & LIVE PROBER */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200">Live Multiplexer Pin Routing Status</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {[
                  { name: "I₀", ruleVal: colI0.val, liveVal: 0, rule: colI0.rule },
                  { name: "I₁", ruleVal: colI1.val, liveVal: 1, rule: colI1.rule },
                  { name: "I₂", ruleVal: colI2.val, liveVal: valX ? 1 : 0, rule: colI2.rule },
                  { name: "I₃", ruleVal: colI3.val, liveVal: valX ? 0 : 1, rule: colI3.rule }
                ].map((pin, idx) => {
                  const selCode = (valY ? 2 : 0) + (valZ ? 1 : 0);
                  const isSelected = selCode === idx;
                  return (
                    <div
                      key={idx}
                      className={clsx(
                        "p-3 rounded-lg border text-center transition-all",
                        isSelected
                          ? "bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-500/20"
                          : "bg-slate-900/60 border-slate-800 opacity-60"
                      )}
                    >
                      <div className="text-[11px] text-slate-400">Pin {pin.name}</div>
                      <div className="text-base font-bold text-white my-1">{pin.liveVal}</div>
                      <div className="text-[10px] text-amber-400 font-sans font-semibold">
                        {isSelected ? "★ SELECTED" : pin.rule}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div>
                  <strong className="text-white">Active Select Code: </strong>
                  <span className="font-mono text-cyan-300">
                    S₁=y ({valY ? 1 : 0}), S₀=z ({valZ ? 1 : 0}) &rarr; Selects Pin I{(valY ? 2 : 0) + (valZ ? 1 : 0)}
                  </span>
                </div>
                <div className="text-slate-400">
                  Current input vector: $x={valX ? 1 : 0}, y={valY ? 1 : 0}, z={valZ ? 1 : 0} \implies$ Minterm{" "}
                  <span className="font-mono text-white font-bold">m{(valX ? 4 : 0) + (valY ? 2 : 0) + (valZ ? 1 : 0)}</span>.
                </div>
              </div>
            </div>

            {/* LIVE OUTPUT DISPLAY */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between items-center text-center space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Function Output</span>
                <div className="text-sm font-bold text-slate-300 mt-1">F(x, y, z)</div>
              </div>

              <div
                className={clsx(
                  "w-24 h-24 rounded-2xl flex items-center justify-center font-extrabold text-4xl border transition-all",
                  outputF
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-xl shadow-emerald-500/20"
                    : "bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-xl shadow-rose-500/20"
                )}
              >
                {outputF ? "1" : "0"}
              </div>

              <div className="text-xs text-slate-400">
                Minterm:{" "}
                <span className="font-mono font-bold text-white">
                  m{(valX ? 4 : 0) + (valY ? 2 : 0) + (valZ ? 1 : 0)}
                </span>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                  {outputF ? "✓ High (1) [Member of Σ(1, 3, 5, 6)]" : "✗ Low (0) [Absent from Σ]"}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: ISC BOARD EXAM FOCUS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Scoring Full Marks on Page 108 Questions</h2>
              <p className="text-xs text-slate-400">CISCE evaluation criteria and answer presentation techniques</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm">Key Evaluation Checkpoints</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-white">Always Draw the 2-Row Implementation Table:</strong> In ISC board marking schemes, 2 marks out of 4 or 5 are reserved purely for the table showing rows $x&apos;$ and $x$ with the correct minterm circles.</li>
                <li><strong className="text-white">State Rules 1 to 4 by Name:</strong> When listing values applied to $I_0..I_3$, write the rule numbers explicitly: <em>&ldquo;I₀ is applied 0 (Rule 1), I₁ is applied 1 (Rule 2), I₂ is applied x (Rule 3), I₃ is applied x&apos; (Rule 4).&rdquo;</em></li>
                <li><strong className="text-white">Label Selection Lines Clearly:</strong> Explicitly state: $S_1 = y$ and $S_0 = z$.</li>
                <li><strong className="text-white">Write the 4x1 MUX Equation:</strong> Conclude by writing the canonical multiplexer equation: $F = S_1&apos;S_0&apos; I_0 + S_1&apos;S_0 I_1 + S_1 S_0&apos; I_2 + S_1 S_0 I_3$.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: 15 ESSENTIAL FAQS (STANDALONE FULL-SCREEN TAB) */}
      {activeTab === "faqs" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <FAQTemplate
            title="15 Essential ISC Board FAQs & Practical Derivations"
            questions={faqs}
          />
        </section>
      )}

      {/* SECTION: 15 ESSENTIAL FAQS (ACCORDION AT BOTTOM OF LESSON) */}
      {activeTab !== "faqs" && (
        <section className="pt-6 border-t border-slate-800">
          <FAQTemplate
            title="15 Essential ISC Board FAQs & Practical Derivations"
            questions={faqs}
          />
        </section>
      )}

      {/* TEACHER NOTE */}
      <Teacher
        topicId="topic-27-mux-page108"
        headline="Sukanta Hui's Master Key to Textbook Page 108"
        note="Textbook Page 108 is the heart and soul of multiplexer synthesis in the ISC Class 12 Computer Science examination! Always remember the 4 inspection rules: neither circled gives 0, both circled gives 1, bottom circled gives the variable, and top circled gives the complemented variable. Wiring Figure 2.25 with S1=y and S0=z guarantees full 5 marks in your board theory paper!"
      />
    </div>
  );
};

export default Topic27;
