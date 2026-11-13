import React, { useState } from "react";
import clsx from "clsx";
import { Zap, Cpu, CheckCircle2, Sliders, Activity, HelpCircle, Split } from "lucide-react";
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import faqs from "./faqs/topic29_faqs";

const Topic29 = () => {
  const [activeTab, setActiveTab] = useState("truthTable");
  const [dataInput, setDataInput] = useState(true);
  const [s1, setS1] = useState(false);
  const [s0, setS0] = useState(false);

  const selectedChannel = (s1 ? 2 : 0) + (s0 ? 1 : 0);
  const dVal = dataInput ? 1 : 0;
  const outputs = [0, 1, 2, 3].map((i) => (selectedChannel === i ? dVal : 0));

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-5xl mx-auto pb-12">
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              ISC Class 12 • Topic 29
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Computer Hardware &amp; Combinational Circuits
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              CISCE Syllabus 868
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Demultiplexers (DEMUX): Concept &amp; Data Distributor
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Single Data Input (Din), n Selection Lines, 2^n Outputs: The Digital Inverse of a Multiplexer
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Theory & Concept" },
              { id: "equations", label: "2. Boolean Equations & Routing" },
              { id: "truthTable", label: "3. Function Table & Architecture" },
              { id: "interactive", label: "4. Interactive Distributor Sandbox" },
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

      {/* TAB 1: THEORY */}
      {activeTab === "theory" && (
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">01</div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">What is a Demultiplexer?</h2>
              <p className="text-xs text-slate-400">The 1-to-many data routing combinational circuit</p>
            </div>
          </div>

          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              A <strong className="text-cyan-400">Demultiplexer (DEMUX)</strong> is a combinational circuit that receives information on a <strong className="text-white">single input line</strong> and transmits it over <strong className="text-emerald-400">one of 2^n possible output lines</strong>. The specific destination output line is controlled by the binary state of <span className="text-amber-400 font-mono font-bold">n selection lines</span>.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Single Input</span>
                <div className="text-lg font-mono font-bold text-white">1 Data Line (Din)</div>
                <p className="text-xs text-slate-400">The common signal being distributed.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Selection Address</span>
                <div className="text-lg font-mono font-bold text-white">n Select Lines</div>
                <p className="text-xs text-slate-400">Formula: 2^n = Number of Outputs.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Multiple Outputs</span>
                <div className="text-lg font-mono font-bold text-white">2^n Output Lines</div>
                <p className="text-xs text-slate-400">Only selected line carries Din; others are 0.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 space-y-2">
              <span className="font-bold text-indigo-300">Rotary Switch Analogy:</span>
              <p>
                Think of a Demultiplexer as a single electrical power source feeding a rotary switch with 4 or 8 contact points. Rotating the knob (the select lines) determines which of the multiple connected appliances receives the power!
              </p>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Mathematical Routing Equations</h2>
              <p className="text-xs text-slate-400">Output expressions for 1-to-4 line demultiplexing</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <p>
              For a 1-to-4 DEMUX with data input <span className="font-mono text-cyan-400">Din</span> and selection lines <span className="font-mono text-amber-400">S1, S0</span>:
            </p>

            <div className="grid sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400">Output Y0 (Selected when S1=0, S0=0):</div>
                <div className="text-emerald-400 text-sm font-bold">Y0 = S1&apos; · S0&apos; · Din</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400">Output Y1 (Selected when S1=0, S0=1):</div>
                <div className="text-emerald-400 text-sm font-bold">Y1 = S1&apos; · S0 · Din</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400">Output Y2 (Selected when S1=1, S0=0):</div>
                <div className="text-emerald-400 text-sm font-bold">Y2 = S1 · S0&apos; · Din</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400">Output Y3 (Selected when S1=1, S0=1):</div>
                <div className="text-emerald-400 text-sm font-bold">Y3 = S1 · S0 · Din</div>
              </div>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Function Table &amp; Block Diagram</h2>
              <p className="text-xs text-slate-400">Input routing matrix and digital demultiplexer trapezoid</p>
            </div>
          </div>

          {/* FUNCTION TABLE */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
              1. 1-to-4 Demultiplexer Routing Truth Table
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950 shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-cyan-400 font-bold">Data In (Din)</th>
                    <th className="p-3 text-amber-400 font-bold">S1 (MSB)</th>
                    <th className="p-3 text-amber-400 font-bold">S0 (LSB)</th>
                    <th className="p-3 text-emerald-400 font-bold">Y0</th>
                    <th className="p-3 text-emerald-400 font-bold">Y1</th>
                    <th className="p-3 text-emerald-400 font-bold">Y2</th>
                    <th className="p-3 text-emerald-400 font-bold">Y3</th>
                    <th className="p-3 text-indigo-400 font-bold">Channel State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    ["Din", 0, 0, "Din", "0", "0", "0", "Y0 = Din (Channel 0 active)"],
                    ["Din", 0, 1, "0", "Din", "0", "0", "Y1 = Din (Channel 1 active)"],
                    ["Din", 1, 0, "0", "0", "Din", "0", "Y2 = Din (Channel 2 active)"],
                    ["Din", 1, 1, "0", "0", "0", "Din", "Y3 = Din (Channel 3 active)"]
                  ].map(([d, s1b, s0b, y0v, y1v, y2v, y3v, desc], i) => (
                    <tr key={i} className="hover:bg-slate-900/50">
                      <td className="p-3 text-cyan-300 font-bold">{d}</td>
                      <td className="p-3 text-amber-400">{s1b}</td>
                      <td className="p-3 text-amber-400">{s0b}</td>
                      <td className={clsx("p-3 font-bold", y0v === "Din" ? "text-emerald-400 bg-emerald-950/20" : "text-slate-500")}>{y0v}</td>
                      <td className={clsx("p-3 font-bold", y1v === "Din" ? "text-emerald-400 bg-emerald-950/20" : "text-slate-500")}>{y1v}</td>
                      <td className={clsx("p-3 font-bold", y2v === "Din" ? "text-emerald-400 bg-emerald-950/20" : "text-slate-500")}>{y2v}</td>
                      <td className={clsx("p-3 font-bold", y3v === "Din" ? "text-emerald-400 bg-emerald-950/20" : "text-slate-500")}>{y3v}</td>
                      <td className="p-3 text-slate-400">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VECTOR SVG */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              2. 1-to-4 Demultiplexer Block Diagram (Inverted Trapezoid)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <svg viewBox="0 0 600 280" className="w-full max-w-xl h-auto select-none font-mono text-xs">
                {/* Single Data Input on Left */}
                <line x1="70" y1="125" x2="200" y2="125" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="70" cy="125" r="4" fill="#38bdf8" />
                <text x="30" y="129" fill="#7dd3fc" fontWeight="bold">Din</text>

                {/* DEMUX Trapezoid: Narrow on left, Wide on right */}
                <polygon points="200,75 380,30 380,220 200,175" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
                <text x="290" y="115" fill="#e0e7ff" textAnchor="middle" fontWeight="bold" fontSize="16">1-to-4</text>
                <text x="290" y="138" fill="#a5b4fc" textAnchor="middle" fontSize="12">DEMULTIPLEXER</text>

                {/* Select Lines on Bottom */}
                <line x1="260" y1="190" x2="260" y2="250" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="260" cy="250" r="3.5" fill="#f59e0b" />
                <text x="260" y="268" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S1 (MSB)</text>

                <line x1="320" y1="205" x2="320" y2="250" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="320" cy="250" r="3.5" fill="#f59e0b" />
                <text x="320" y="268" fill="#fcd34d" textAnchor="middle" fontWeight="bold">S0 (LSB)</text>

                {/* 4 Output Lines on Right */}
                {[
                  { y: 55, name: "Y0 = S1'S0'Din" },
                  { y: 100, name: "Y1 = S1'S0 Din" },
                  { y: 150, name: "Y2 = S1 S0'Din" },
                  { y: 195, name: "Y3 = S1 S0 Din" }
                ].map((pt, idx) => (
                  <g key={idx}>
                    <line x1="380" y1={pt.y} x2="480" y2={pt.y} stroke="#10b981" strokeWidth="2" />
                    <circle cx="480" cy={pt.y} r="3.5" fill="#10b981" />
                    <text x="495" y={pt.y + 4} fill="#6ee7b7" fontWeight="bold">{pt.name}</text>
                  </g>
                ))}
              </svg>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">Interactive 1-to-4 Data Distributor Sandbox</h2>
              <p className="text-xs text-slate-400">Toggle Din and switch select bits to observe real-time channel routing</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Data Stream:</span>
                <button
                  onClick={() => setDataInput(!dataInput)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-mono font-bold text-xs border transition-all",
                    dataInput ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-600/30" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  Din = {dataInput ? "1 (HIGH)" : "0 (LOW)"}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Routing Address:</span>
                <button
                  onClick={() => setS1(!s1)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                    s1 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  S1 = {s1 ? "1" : "0"}
                </button>
                <button
                  onClick={() => setS0(!s0)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg font-mono font-bold text-xs border transition-all",
                    s0 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  )}
                >
                  S0 = {s0 ? "1" : "0"}
                </button>
              </div>
            </div>

            {/* 4 OUTPUT DISPLAY */}
            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { name: "Y0", val: outputs[0], sel: selectedChannel === 0 },
                { name: "Y1", val: outputs[1], sel: selectedChannel === 1 },
                { name: "Y2", val: outputs[2], sel: selectedChannel === 2 },
                { name: "Y3", val: outputs[3], sel: selectedChannel === 3 }
              ].map((out, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "p-4 rounded-xl border text-center transition-all",
                    out.sel
                      ? "bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/20"
                      : "bg-slate-900/40 border-slate-800 opacity-60"
                  )}
                >
                  <div className="text-xs font-mono text-slate-400 mb-1">{out.name}</div>
                  <div
                    className={clsx(
                      "text-3xl font-mono font-black mb-1",
                      out.val === 1 ? "text-emerald-400 animate-pulse" : "text-slate-600"
                    )}
                  >
                    {out.val}
                  </div>
                  <div className="text-[10px] font-bold">
                    {out.sel ? (
                      <span className="text-emerald-400">● ROUTED</span>
                    ) : (
                      <span className="text-slate-600">ISOLATED (0)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Routing Status:</span>
              <span className="text-emerald-400 font-mono font-bold">
                {"Data input Din (" + dVal + ") is forwarded directly to Output Y" + selectedChannel}
              </span>
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
              <h2 className="text-lg sm:text-xl font-bold text-white">ISC Board Exam Focus: Demultiplexers</h2>
              <p className="text-xs text-slate-400">Definition and architectural differences</p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider">CISCE 2-Mark Question Blueprint</div>
              <p className="text-slate-200">
                &quot;What is a Demultiplexer? State its relation between select lines and output lines.&quot;
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>1 Mark: Definition (takes 1 data input and distributes to one of 2^n outputs).</li>
                <li>1 Mark: Mathematical relation: 2^n = N, where n = select lines, N = output lines.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

            {/* TAB CONTENT: 15 ESSENTIAL FAQS (STANDALONE FULL-SCREEN TAB) */}
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
        topicId="topic-29-demux"
        headline="Sukanta Hui's Distinction between MUX and DEMUX"
        note="Remember the shape mnemonic: Multiplexer funnels MANY lines into ONE (like a megaphone narrowing down). Demultiplexer spreads ONE line into MANY (like a megaphone spreading out sound). Once you see this geometric inverse, you will never confuse the two in an exam!"
      />
    </div>
  );
};

export default Topic29;
