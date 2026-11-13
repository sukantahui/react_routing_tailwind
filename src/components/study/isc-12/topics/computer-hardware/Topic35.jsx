import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Award, BookOpen } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";

const Topic35 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");

  // Quiz state
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      q: "How many selection lines are required for a 32-to-1 Multiplexer?",
      options: ["4 lines", "5 lines", "6 lines", "32 lines"],
      correct: 1,
      exp: "Formula: 2^m = N → 2^5 = 32, so m = 5 select lines."
    },
    {
      id: 2,
      q: "Which combinational circuit has 2^n inputs and n outputs with NO select lines?",
      options: ["Multiplexer", "Demultiplexer", "Encoder", "Decoder"],
      correct: 2,
      exp: "An Encoder converts 2^n lines to an n-bit binary code without any select lines."
    },
    {
      id: 3,
      q: "How can a Decoder with Enable input (E) be converted into a Demultiplexer?",
      options: [
        "Connect E to Ground",
        "Use E as Data Input (Din) and Address lines as Select lines",
        "Add an OR gate to output",
        "Invert all outputs"
      ],
      correct: 1,
      exp: "Connecting Din to Enable (E) makes the decoder route Din to the selected channel."
    },
    {
      id: 4,
      q: "How many Half Adders and OR gates are needed to construct a Full Adder?",
      options: ["1 HA + 2 OR", "2 HA + 1 OR", "3 HA + 0 OR", "2 HA + 2 OR"],
      correct: 1,
      exp: "A Full Adder is realized using 2 Half Adders and 1 OR gate (Cout = C1 + C2)."
    }
  ];

  const handleSelect = (qId, optIdx) => {
    setAnswers({ ...answers, [qId]: optIdx });
  };

  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 35
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868 Masterclass
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ISC Board Examination Masterclass: Hardware Design &amp; Past Years
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            10-Year Question Trend Analysis, 2-Mark &amp; 4-Mark Archetypes, Master Circuit Cheat Sheet, and Self-Test Challenge
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. 10-Year Trend Analysis" },
              { id: "equations", label: "2. Master Circuit Cheat Sheet" },
              { id: "truthTable", label: "3. Board Exam Question Bank" },
              { id: "interactive", label: "4. Interactive Board Challenge" },
              { id: "examTips", label: "5. Council Examiner Guidelines" }
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

      {/* TAB 1: THEORY */}
      {activeTab === "theory" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">10-Year ISC Section A Question Analysis</h2>
              <p className="text-xs text-slate-400">Recurring patterns across CISCE Board examinations</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Adders &amp; Subtractors</span>
                <div className="text-xl font-bold text-white">Guaranteed 3-4 Marks</div>
                <p className="text-xs text-slate-400">
                  Full Adder from two Half Adders and an OR gate is the single most repeated circuit question in Section A.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Multiplexers (MUX)</span>
                <div className="text-xl font-bold text-white">High Yield: 4-5 Marks</div>
                <p className="text-xs text-slate-400">
                  Boolean function realization using 4:1 or 8:1 MUX (Implementation Table method) appears every alternating year!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Encoders &amp; Decoders</span>
                <div className="text-xl font-bold text-white">Guaranteed 2-3 Marks</div>
                <p className="text-xs text-slate-400">
                  Definitions, 3-to-8 decoder with Enable, and Decoder-to-Demultiplexer equivalence.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: EQUATIONS */}
      {activeTab === "equations" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">02</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Master Circuit Formulas Cheat Sheet</h2>
              <p className="text-xs text-slate-400">Rapid revision for board exam morning</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-sans font-bold text-cyan-400">1. Half Adder &amp; Full Adder</span>
              <div>HA: Sum = A ⊕ B, Carry = A · B</div>
              <div>FA: Sum = A ⊕ B ⊕ Cin</div>
              <div>FA: Cout = A·B + Cin·(A ⊕ B) = AB + BCin + ACin</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-sans font-bold text-amber-400">2. Half Subtractor &amp; Full Subtractor</span>
              <div>HS: Diff = A ⊕ B, Borrow = A&apos; · B</div>
              <div>FS: Diff = A ⊕ B ⊕ Bin</div>
              <div>FS: Bout = A&apos;·B + Bin·(A ⊕ B)&apos;</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-sans font-bold text-indigo-400">3. Encoders &amp; Decoders</span>
              <div>Encoder: 2^n → n (No select lines)</div>
              <div>Decoder: n → 2^n (Yi = E · mi)</div>
              <div>Universal Minterm: Synthesizes any SOP via OR gates</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-sans font-bold text-emerald-400">4. Multiplexers &amp; Demultiplexers</span>
              <div>MUX: 2^n → 1 (Select lines m = log2 N)</div>
              <div>DEMUX: 1 → 2^n (Data distributor)</div>
              <div>Cascading: 2^(n+1) MUX = two 2^n MUX + Inverter + OR</div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: TRUTH TABLE & CIRCUIT */}
      {activeTab === "truthTable" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">03</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Board Exam Question Bank: Model Questions &amp; Marking</h2>
              <p className="text-xs text-slate-400">Authentic CISCE past year questions with model answers</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-amber-400 font-bold">
                <span>Model Question 1 (4 Marks)</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">ISC 2020, 2017</span>
              </div>
              <p className="text-slate-300 font-sans">
                &quot;Draw the logic circuit diagram to implement a Full Adder using two Half Adders and an OR gate. State its Boolean expressions.&quot;
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1 font-mono text-[11px]">
                <div className="text-emerald-400 font-bold font-sans">Key Answer Points:</div>
                <div>HA1: S1 = A ⊕ B, C1 = A · B</div>
                <div>HA2: Sum = S1 ⊕ Cin = A ⊕ B ⊕ Cin, C2 = S1 · Cin = (A ⊕ B) · Cin</div>
                <div>OR Gate: Cout = C1 + C2 = A·B + (A ⊕ B)·Cin</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-amber-400 font-bold">
                <span>Model Question 2 (4 Marks)</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">ISC 2023, 2019</span>
              </div>
              <p className="text-slate-300 font-sans">
                &quot;Using an 8-to-1 Multiplexer, implement the Boolean function F(A, B, C, D) = Σ(1, 2, 5, 7, 8, 10, 13). Show the implementation table.&quot;
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1 font-mono text-[11px]">
                <div className="text-emerald-400 font-bold font-sans">Key Answer Points:</div>
                <div>Select lines: S2=A, S1=B, S0=C. Residual variable: D.</div>
                <div>8 Columns I0 to I7 mapped against D&apos; and D.</div>
                <div>Draw 8:1 MUX trapezoid with inputs I0–I7 connected to 0, 1, D, D&apos;.</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: INTERACTIVE SIMULATOR */}
      {activeTab === "interactive" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">04</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive ISC Board Self-Test Challenge</h2>
              <p className="text-xs text-slate-400">Test your mastery of Class 12 Computer Hardware fundamentals</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="space-y-4">
              {questions.map((q) => {
                const userAns = answers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-slate-200">
                      {q.id}. {q.q}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userAns === oIdx;
                        const isCorrect = q.correct === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelect(q.id, oIdx)}
                            className={clsx(
                              "p-2.5 rounded-lg text-left text-xs transition-all border",
                              isSelected
                                ? "bg-indigo-600 text-white border-indigo-400"
                                : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                            )}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                        {userAns === q.correct ? (
                          <span className="text-emerald-400 font-bold">✓ Correct! </span>
                        ) : (
                          <span className="text-rose-400 font-bold">✗ Incorrect. </span>
                        )}
                        <span>{q.exp}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setShowResults(!showResults)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30"
              >
                {showResults ? "Hide Explanations" : "Submit & Check Answers"}
              </button>

              {showResults && (
                <div className="text-xs font-mono font-bold text-emerald-400">
                  Your Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: EXAM FOCUS */}
      {activeTab === "examTips" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">05</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Examiner Guidelines &amp; 100% Scoring Strategy</h2>
              <p className="text-xs text-slate-400">Crucial tips from veteran CISCE evaluators</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">The 4 Golden Rules for Section A Hardware</div>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-white">Always Label MSB &amp; LSB:</strong> If you write inputs without indicating MSB/LSB, you risk losing 1 mark on pin assignment.</li>
                <li><strong className="text-white">Draw Straight Lines with Ruler:</strong> Cluttered or messy wiring costs presentation marks. Draw neat vertical rails.</li>
                <li><strong className="text-white">Clearly Show Connection Dots:</strong> When lines cross, indicate physical connections with solid dots (•) to avoid ambiguity.</li>
                <li><strong className="text-white">Derive Expressions First:</strong> Write down algebraic proofs before sketching logic gates. This ensures partial credit if you make a drawing mistake!</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* TEACHER NOTE */}
      <Teacher
        topicId="topic-35-masterclass"
        headline="Sukanta Hui's Final Blessing for ISC Class 12 Boards"
        note="Congratulations on completing the entire Computer Hardware module! You have mastered Adders, Subtractors, Encoders, Decoders, Multiplexers, Demultiplexers, and cascading trees. This module is the most predictable, reliable scoring territory in your entire ISC Computer Science syllabus. Walk into the exam room with total confidence—you are fully prepared to score 100/100!"
      />
    </div>
  );
};

export default Topic35;
