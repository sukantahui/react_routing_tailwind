import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  const [activeTab, setActiveTab] = useState("mastery");

  // Interactive Quiz & Practice Engine State
  const [quizCategory, setQuizCategory] = useState("twoscomp");
  const [problemIndex, setProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const practiceBank = {
    twoscomp: [
      {
        prompt: "Find the 8-bit 2's complement binary representation of Decimal -25.",
        answer: "11100111",
        hint: "+25 is 00011001. Invert bits -> 11100110, then add 1 -> 11100111 (Hex 0xE7).",
        explanation: "1. Positive 25 = 00011001_2.\n2. Invert (1's complement) = 11100110.\n3. Add 1 = 11100111.\nAlternative check: 256 - 25 = 231 = 11100111."
      },
      {
        prompt: "Find the 8-bit 2's complement binary representation of Decimal -42.",
        answer: "11010110",
        hint: "+42 is 00101010. Invert -> 11010101, add 1 -> 11010110 (Hex 0xD6).",
        explanation: "1. Positive 42 = 00101010_2.\n2. Invert bits = 11010101.\n3. Add 1 = 11010110 = 0xD6."
      },
      {
        prompt: "What is the decimal value of 8-bit 2's complement 11110000?",
        answer: "-16",
        hint: "MSB is 1 (negative). Invert and add 1 to find positive magnitude.",
        explanation: "11110000 is negative. Inverting: 00001111. Adding 1: 00010000 (+16). Therefore, value is -16.\nOr calculate weights: -128 + 64 + 32 + 16 = -16."
      }
    ],
    overflow: [
      {
        prompt: "In 8-bit 2's comp, compute (+85) + (+60). Does Overflow (V) occur? (Enter '1' for Yes, '0' for No)",
        answer: "1",
        hint: "85 + 60 = 145. 8-bit signed maximum is +127. 145 > 127!",
        explanation: "01010101 (+85) + 00111100 (+60) = 10010001 (-111 in signed 2's comp).\nTwo positive numbers yielded a negative sign bit. V = C_in(MSB) ^ C_out(MSB) = 1 ^ 0 = 1. Overflow occurred!"
      },
      {
        prompt: "In 8-bit 2's comp, compute (-70) + (-65). Does Overflow (V) occur? (Enter '1' for Yes, '0' for No)",
        answer: "1",
        hint: "-70 + -65 = -135. 8-bit signed minimum is -128. -135 < -128!",
        explanation: "10111010 (-70) + 10111111 (-65) = [1] 01111001 (+121).\nTwo negative numbers yielded a positive sign bit. Underflow occurred (V = 1)."
      },
      {
        prompt: "In 8-bit 2's comp, compute (+50) + (+30). Does Overflow (V) occur? (Enter '1' for Yes, '0' for No)",
        answer: "0",
        hint: "50 + 30 = 80 <= 127. Result fits cleanly in 8 bits.",
        explanation: "00110010 (+50) + 00011110 (+30) = 01010000 (+80). Sign bit remains 0. V = 0."
      }
    ],
    radix: [
      {
        prompt: "Convert Hexadecimal 0x7F to Decimal integer.",
        answer: "127",
        hint: "7 × 16 + 15 = ?",
        explanation: "0x7F = 7 × 16^1 + 15 × 16^0 = 112 + 15 = 127."
      },
      {
        prompt: "Convert Binary 11011010 to Hexadecimal (format: 0xDA or DA).",
        answer: "DA",
        hint: "Group into nibbles: 1101 (13=D) and 1010 (10=A).",
        explanation: "Upper nibble: 1101 = 13 = 'D'. Lower nibble: 1010 = 10 = 'A'. Result: 0xDA."
      },
      {
        prompt: "Convert Decimal 75 to unsigned 8-bit Binary.",
        answer: "01001011",
        hint: "75 = 64 + 8 + 2 + 1.",
        explanation: "64 (bit 6) + 8 (bit 3) + 2 (bit 1) + 1 (bit 0) = 01001011_2."
      }
    ],
    gray: [
      {
        prompt: "Convert Binary 1011 to 4-bit Gray code.",
        answer: "1110",
        hint: "Gray = B ^ (B >> 1). 1011 ^ 0101 = ?",
        explanation: "G[3]=B[3]=1; G[2]=1^0=1; G[1]=0^1=1; G[0]=1^1=0 -> 1110."
      },
      {
        prompt: "Convert Gray code 1100 to 4-bit natural Binary.",
        answer: "1000",
        hint: "Cascade XOR: B[3]=1; B[2]=1^1=0; B[1]=0^0=0; B[0]=0^0=0.",
        explanation: "B[3]=G[3]=1; B[2]=B[3]^G[2]=1^1=0; B[1]=B[2]^G[1]=0^0=0; B[0]=B[1]^G[0]=0^0=0 -> 1000."
      }
    ]
  };

  const currentList = practiceBank[quizCategory];
  const currentProblem = currentList[problemIndex % currentList.length];

  const handleCheckAnswer = () => {
    const cleanUser = userAnswer.trim().toUpperCase().replace(/^0X/, "");
    const cleanAns = currentProblem.answer.trim().toUpperCase().replace(/^0X/, "");

    setAttempted(attempted + 1);
    if (cleanUser === cleanAns) {
      setFeedback({ correct: true, msg: "🎉 Correct! Outstanding architectural mastery." });
      setScore(score + 1);
    } else {
      setFeedback({
        correct: false,
        msg: `❌ Incorrect. The correct answer is: ${currentProblem.answer}`
      });
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setUserAnswer("");
    setFeedback(null);
    setShowExplanation(false);
    setProblemIndex((prev) => (prev + 1) % currentList.length);
  };

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Header */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider rounded-full">
              Computer Architecture • Module 001.001 • Topic 15
            </span>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider rounded-full">
              Capstone Lab &amp; Skill Assessment
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Module 001 Capstone Practice Lab &amp; Skill Assessment
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
            Put your skills to the test with interactive algorithmic problems, live overflow prediction engines, multi-radix conversion challenges, and diagnostic performance evaluations across all 16 foundational topics.
          </p>
        </header>

        {/* 3-Tab Architectural Schematics Suite */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">⚡</span> Module 001 Architecture Competency Maps &amp; Diagnostics
              </h2>
              <p className="text-sm text-slate-400">
                Visualizing the full learning trajectory, diagnostic solving flows, and corner-case verification matrix.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("mastery")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "mastery"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                1. Module 001 Mastery Trajectory
              </button>
              <button
                onClick={() => setActiveTab("flow")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "flow"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                2. Problem Solving Strategy
              </button>
              <button
                onClick={() => setActiveTab("checklist")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "checklist"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                3. Silicon Corner Cases
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center">
            {activeTab === "mastery" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="28" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Module 001 Silicon Competency &amp; Mastery Map
                </text>

                {/* 4 Mastery Tiers */}
                <g transform="translate(40, 60)">
                  <rect width="170" height="240" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Tier 1: Radix Basics</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Topics 0 - 3</text>
                  <rect x="20" y="70" width="130" height="150" rx="6" fill="#1e293b" />
                  <text x="85" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Decimal to Binary</text>
                  <text x="85" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Octal 3-Bit Groups</text>
                  <text x="85" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Hex 4-Bit Nibbles</text>
                  <text x="85" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Fractional Modulo</text>
                  <text x="85" y="200" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">100% Positional Math</text>
                </g>

                <g transform="translate(240, 60)">
                  <rect width="170" height="240" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#c084fc" fontSize="13" fontWeight="bold">Tier 2: Signed Formats</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Topics 4 - 8</text>
                  <rect x="20" y="70" width="130" height="150" rx="6" fill="#1e293b" />
                  <text x="85" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Sign-Magnitude</text>
                  <text x="85" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="10">• 1's Complement</text>
                  <text x="85" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="10">• 2's Complement</text>
                  <text x="85" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="10">• N-Bit Limits</text>
                  <text x="85" y="200" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Single Zero Victory</text>
                </g>

                <g transform="translate(440, 60)">
                  <rect width="170" height="240" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Tier 3: ALU Datapath</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Topics 9 - 11, 13</text>
                  <rect x="20" y="70" width="130" height="150" rx="6" fill="#1e293b" />
                  <text x="85" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Full Adder Circuits</text>
                  <text x="85" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="10">• SUB XOR Inversion</text>
                  <text x="85" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Overflow V = Cₙ⊕Cₙ₋₁</text>
                  <text x="85" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Flags Z, N, C, V</text>
                  <text x="85" y="200" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Unified Arithmetic</text>
                </g>

                <g transform="translate(640, 60)">
                  <rect width="170" height="240" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="85" y="30" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Tier 4: Codes &amp; Encoders</text>
                  <text x="85" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">Topics 12, 14, 15</text>
                  <rect x="20" y="70" width="130" height="150" rx="6" fill="#1e293b" />
                  <text x="85" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="10">• ASCII 7-Bit</text>
                  <text x="85" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Unicode UTF-8</text>
                  <text x="85" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Packed BCD + DAA</text>
                  <text x="85" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="10">• Gray Shaft Encoders</text>
                  <text x="85" y="200" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Production Systems</text>
                </g>

                <text x="425" y="330" textAnchor="middle" fill="#64748b" fontSize="12">
                  Complete mastery across all 4 tiers certifies full readiness for Module 002: Digital Logic Gates &amp; Combinational Circuits.
                </text>
              </svg>
            )}

            {activeTab === "flow" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="28" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Diagnostic Exam Problem Solving Strategy
                </text>

                {/* Step 1 */}
                <g transform="translate(60, 60)">
                  <rect width="210" height="100" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="105" y="30" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">1. Check Word Size &amp; Format</text>
                  <text x="105" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="11">Is it 8, 16, or 32-bit?</text>
                  <text x="105" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="11">Signed (2's comp) vs Unsigned?</text>
                </g>

                {/* Step 2 */}
                <g transform="translate(320, 60)">
                  <rect width="210" height="100" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="105" y="30" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">2. Evaluate Operands</text>
                  <text x="105" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="11">If Negative: ~X + 1</text>
                  <text x="105" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="11">If Subtraction: A + (~B) + 1</text>
                </g>

                {/* Step 3 */}
                <g transform="translate(580, 60)">
                  <rect width="210" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="105" y="30" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">3. Perform Bit Addition</text>
                  <text x="105" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="11">Track Carry C_in &amp; C_out</text>
                  <text x="105" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="11">Discard 9th bit under mod 256</text>
                </g>

                {/* Step 4 Check Flags */}
                <g transform="translate(190, 200)">
                  <rect width="470" height="110" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                  <text x="235" y="32" textAnchor="middle" fill="#fb7185" fontSize="14" fontWeight="bold">4. Verify Boundary Limits &amp; Status Flags</text>
                  <text x="235" y="58" textAnchor="middle" fill="#cbd5e1" fontSize="12">Overflow Check: Did (+A) + (+B) yield negative? Or (-A) + (-B) yield positive?</text>
                  <text x="235" y="82" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="bold">Hardware Gate Equation: V = Carry[MSB] ⊕ Carry[MSB-1]</text>
                </g>
              </svg>
            )}

            {activeTab === "checklist" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="28" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Top Silicon Corner Cases &amp; Edge Trap Checklist
                </text>

                {/* 3 Checklist Boxes */}
                <g transform="translate(50, 60)">
                  <rect width="220" height="250" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="110" y="30" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">1. Negating -128</text>
                  <rect x="20" y="50" width="180" height="180" rx="6" fill="#1e293b" />
                  <text x="110" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="11">In 8-bit 2's comp:</text>
                  <text x="110" y="95" textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="monospace">-128 = 1000 0000</text>
                  <text x="110" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="11">~10000000 + 1 =</text>
                  <text x="110" y="140" textAnchor="middle" fill="#f87171" fontSize="11" fontFamily="monospace">1000 0000 (-128!)</text>
                  <text x="110" y="170" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Triggers Overflow V=1</text>
                  <text x="110" y="200" textAnchor="middle" fill="#94a3b8" fontSize="10">+128 requires 9 bits</text>
                </g>

                <g transform="translate(315, 60)">
                  <rect width="220" height="250" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="110" y="30" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">2. Signed vs Unsigned</text>
                  <rect x="20" y="50" width="180" height="180" rx="6" fill="#1e293b" />
                  <text x="110" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="11">Bit pattern 0xFF:</text>
                  <text x="110" y="95" textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="monospace">Unsigned = 255</text>
                  <text x="110" y="120" textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="monospace">Signed = -1</text>
                  <text x="110" y="150" textAnchor="middle" fill="#cbd5e1" fontSize="11">Same ADD instruction;</text>
                  <text x="110" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="11">only Branch tests</text>
                  <text x="110" y="195" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">C (Unsigned) vs V (Signed)</text>
                </g>

                <g transform="translate(580, 60)">
                  <rect width="220" height="250" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="110" y="30" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">3. Sign Extension</text>
                  <rect x="20" y="50" width="180" height="180" rx="6" fill="#1e293b" />
                  <text x="110" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="11">8-bit to 16-bit cast:</text>
                  <text x="110" y="95" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">-25 (0xE7) -&gt;</text>
                  <text x="110" y="120" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">0xFFE7 (Correct!)</text>
                  <text x="110" y="150" textAnchor="middle" fill="#f87171" fontSize="11">Zero-padding (0x00E7)</text>
                  <text x="110" y="170" textAnchor="middle" fill="#f87171" fontSize="11">turns -25 into +231!</text>
                  <text x="110" y="195" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Always replicate MSB</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* Live Interactive Capstone Practice & Quiz Engine */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">🧪</span> Interactive Skill Practice &amp; Assessment Workbench
              </h2>
              <p className="text-sm text-slate-400">
                Select a competency category to solve randomly generated hardware problems with instant step-by-step verification.
              </p>
            </div>

            {/* Category Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "twoscomp", label: "2's Complement" },
                { id: "overflow", label: "Overflow (V) Detection" },
                { id: "radix", label: "Radix Conversions" },
                { id: "gray", label: "Gray Code & Sensors" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setQuizCategory(cat.id);
                    setProblemIndex(0);
                    setUserAnswer("");
                    setFeedback(null);
                    setShowExplanation(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    quizCategory === cat.id
                      ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Practice Card & Scoreboard */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Problem {problemIndex + 1} of {currentList.length}
              </span>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-400">Score: <strong className="text-white">{score}</strong> / {attempted}</span>
                <span className="text-emerald-400 font-bold">
                  {attempted > 0 ? `${Math.round((score / attempted) * 100)}% Accuracy` : "0% Accuracy"}
                </span>
              </div>
            </div>

            {/* Prompt */}
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentProblem.prompt}
              </h3>
              <p className="text-xs text-slate-500 italic">
                Hint: {currentProblem.hint}
              </p>
            </div>

            {/* Input & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheckAnswer()}
                placeholder="Type your answer here..."
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-teal-500 flex-1 min-w-[240px]"
              />
              <button
                onClick={handleCheckAnswer}
                className="px-5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold transition shadow-md shadow-teal-500/20"
              >
                Check Answer
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition"
              >
                Next Problem →
              </button>
            </div>

            {/* Feedback & Detailed Step-by-Step Explanation */}
            {feedback && (
              <div className={`p-4 rounded-xl border ${feedback.correct ? "bg-teal-950/40 border-teal-500/40 text-teal-200" : "bg-rose-950/40 border-rose-500/40 text-rose-200"} space-y-3`}>
                <div className="text-sm font-bold flex items-center gap-2">
                  {feedback.msg}
                </div>
                {showExplanation && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Step-by-Step Mathematical Explanation:</span>
                    <pre className="text-xs font-mono whitespace-pre-wrap text-slate-300 bg-slate-950 p-3 rounded border border-slate-800">
                      {currentProblem.explanation}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Real-World Case Studies */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-teal-500/10 text-teal-400 rounded-md">🏆</span>
              Case Study: Barrackpore Inter-College Coding Hackathon
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              At an algorithmic contest in <strong>Barrackpore</strong>, students <strong>Mamata</strong> and <strong>Mahima</strong> built a high-speed bit-manipulation engine.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              By replacing branching logic with branchless 2's complement SIMD masking (evaluating arithmetic overflow and absolute values without <code className="text-teal-300">if</code> statements), their image filtering kernel executed 8x faster than competitor submissions.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-md">🔬</span>
              Case Study: Jadavpur Microelectronics Olympiad
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              At the <strong>Jadavpur University</strong> engineering showcase, researchers <strong>Debangshu</strong> and <strong>Susmita</strong> demonstrated an FPGA testbench verifying all 16 module corner cases.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Their real-time hardware logic analyzer displayed Gray-code shaft decoding, carry lookahead adder wave propagation, and automatic BCD decimal adjustments on dual 7-segment displays without a single dropped clock cycle.
            </p>
          </div>
        </section>

        {/* 30 Curated FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Text Notes Component */}
        <PlainTextPrint rawNotes={noteText} />

        {/* Teacher Sukanta Hui Footer / Bio */}
        <Teacher />
      </div>
    </div>
  );
}
