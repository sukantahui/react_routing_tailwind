import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic31_files/topic31_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

const Topic31 = () => {
  // Example truth table data
  const truthTableRows = [
    { A: true, B: true, AimpliesB: true, premisesBoth: true, conclusionB: true },
    { A: true, B: false, AimpliesB: false, premisesBoth: false, conclusionB: false },
    { A: false, B: true, AimpliesB: true, premisesBoth: false, conclusionB: true },
    { A: false, B: false, AimpliesB: true, premisesBoth: false, conclusionB: false },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeSlideUp {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.15);
        }
        .card-glow {
          transition: all 0.3s ease;
        }
        .card-glow:hover {
          box-shadow: 0 0 0 2px rgba(59,130,246,0.5), 0 10px 20px -5px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="animate-fadeSlideUp text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Syllogism in Logical Algebra
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master deductive reasoning through algebraic laws and truth tables — from classic modus ponens to real‑world logic gates.
          </p>
        </section>

        {/* Theory & Explanation Card */}
        <section className="animate-fadeSlideUp rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover-lift transition-all duration-300">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">What is a Syllogism?</h2>
          <p className="leading-relaxed mb-4">
            In logical algebra, a <strong className="text-blue-600 dark:text-blue-400">syllogism</strong> is a form of reasoning where a conclusion is drawn from two given propositions (premises). 
            The most famous rule is <em>modus ponens</em>: If we know <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">A</code> is true, and <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">A → B</code> (if A then B) is true, we can deduce <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">B</code>.
          </p>
          <p className="leading-relaxed">
            Syllogisms form the backbone of logical reasoning in mathematics, computer science (digital circuits, program correctness), and even everyday decision making.
          </p>
        </section>

        {/* Example 1: Truth Table & Algebraic Laws */}
        <section className="animate-fadeSlideUp space-y-6" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-2xl font-semibold">Example 1: From A and (A → B) infer B</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Truth Table */}
            <div className="rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5 card-glow">
              <h3 className="text-xl font-medium mb-3 flex items-center gap-2">📊 Truth Table Method</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
                      <th className="px-3 py-2">A</th><th className="px-3 py-2">B</th><th className="px-3 py-2">A → B</th>
                      <th className="px-3 py-2">A ∧ (A→B)</th><th className="px-3 py-2">Conclusion B</th>
                    </tr>
                  </thead>
                  <tbody>
                    {truthTableRows.map((row, idx) => (
                      <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                        <td className="px-3 py-2 font-mono">{row.A ? "T" : "F"}</td>
                        <td className="px-3 py-2 font-mono">{row.B ? "T" : "F"}</td>
                        <td className="px-3 py-2 font-mono">{row.AimpliesB ? "T" : "F"}</td>
                        <td className="px-3 py-2 font-mono">{row.premisesBoth ? "T" : "F"}</td>
                        <td className="px-3 py-2 font-mono">{row.conclusionB ? "T" : "F"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-3 text-gray-600 dark:text-gray-300">
                ✅ Only the first row has both premises true → B is true. Hence the argument is <strong>valid</strong>.
              </p>
            </div>

            {/* Algebraic Laws */}
            <div className="rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5 card-glow">
              <h3 className="text-xl font-medium mb-3 flex items-center gap-2">🧮 Algebraic Laws (Boolean Algebra)</h3>
              <p className="mb-2">Rewrite implication: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">A → B = ¬A ∨ B</code></p>
              <p className="mb-2">Premises: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">A ∧ (¬A ∨ B)</code></p>
              <p className="mb-2">Distributive law: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">(A ∧ ¬A) ∨ (A ∧ B)</code></p>
              <p className="mb-2">Complement law: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">A ∧ ¬A = 0</code> → <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">0 ∨ (A ∧ B) = A ∧ B</code></p>
              <p className="mb-2">Simplification: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">A ∧ B ⇒ B</code> (if conjunction true, B must be true).</p>
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-mono text-sm">∴ A ∧ (A → B) → B is a tautology.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Syllogism SVG with Animation */}
        <section className="animate-fadeSlideUp rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 card-glow" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-semibold mb-4">🔍 Visual Syllogism: Modus Ponens</h2>
          <div className="flex justify-center">
            <svg width="500" height="240" viewBox="0 0 500 240" className="w-full max-w-lg">
              <rect x="20" y="20" width="140" height="50" rx="8" fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="2">
                <animate attributeName="fillOpacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
              </rect>
              <text x="90" y="50" textAnchor="middle" fill="#2563EB" fontSize="16" fontWeight="bold">Premise 1: A</text>
              <rect x="340" y="20" width="140" height="50" rx="8" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="2">
                <animate attributeName="fillOpacity" values="0.2;0.5;0.2" dur="3s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="410" y="50" textAnchor="middle" fill="#7C3AED" fontSize="16" fontWeight="bold">Premise 2: A→B</text>
              <line x1="160" y1="45" x2="340" y2="45" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6,4">
                <animate attributeName="strokeDashoffset" values="0;20" dur="1.5s" repeatCount="indefinite" />
              </line>
              <rect x="180" y="140" width="140" height="50" rx="8" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2">
                <animate attributeName="fillOpacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="250" y="170" textAnchor="middle" fill="#10B981" fontSize="16" fontWeight="bold">Conclusion: ∴ B</text>
              <path d="M250 120 L250 140" stroke="#10B981" strokeWidth="3" fill="none">
                <animate attributeName="d" values="M250 120 L250 140;M250 115 L250 145;M250 120 L250 140" dur="1s" repeatCount="indefinite" />
              </path>
              <text x="250" y="210" textAnchor="middle" fill="#475569" fontSize="14">If both premises are true → B must be true</text>
            </svg>
          </div>
        </section>

        {/* Real-World & Professional Tips */}
        <div className="space-y-6 animate-fadeSlideUp" style={{ animationDelay: "0.3s" }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5 hover-lift">
              <h3 className="text-xl font-semibold mb-2">🌍 Real‑world usage</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Swadeep’s curfew:</strong> “If it’s past 10 PM, then Swadeep must be home. It’s 10:30 PM → Swadeep is home.”</li>
                <li><strong>Software validation:</strong> If user is admin (A) then show dashboard (B). User is admin → show dashboard.</li>
                <li><strong>Digital logic:</strong> AND‑OR gates implement implication (¬A + B).</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5 hover-lift">
              <h3 className="text-xl font-semibold mb-2">💡 Pro Tips & Tricks</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Always rewrite <code>A→B</code> as <code>¬A ∨ B</code> for algebraic manipulation.</li>
                <li>Use truth tables to quickly test validity of any syllogism.</li>
                <li>In code, prefer early returns: <code>if (!A) return; if (A→B) then B</code>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Mistakes + Best Practices */}
        <div className="animate-fadeSlideUp grid md:grid-cols-2 gap-6" style={{ animationDelay: "0.4s" }}>
          <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-5">
            <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-1 text-red-800 dark:text-red-200">
              <li>Confusing <code>A→B</code> with <code>B→A</code> (converse error).</li>
              <li>Thinking “if A then B” means B implies A.</li>
              <li>Forgetting that false antecedent makes implication true (vacuous truth).</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-5">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">✅ Best Practices</h3>
            <ul className="list-disc pl-5 space-y-1 text-green-800 dark:text-green-200">
              <li>Always state your premises clearly before concluding.</li>
              <li>Use parentheses in complex Boolean expressions.</li>
              <li>Validate syllogisms with both truth table and algebra.</li>
            </ul>
          </div>
        </div>

        {/* Prototype / Signature */}
        <section className="animate-fadeSlideUp rounded-2xl bg-gray-100 dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-700" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-xl font-mono mb-2">📐 Function Signature (Modus Ponens)</h3>
          <pre className="bg-gray-900 text-green-300 p-3 rounded-lg overflow-x-auto text-sm">
            {`/**
 * @param {boolean} a - Truth value of proposition A
 * @param {boolean} aImpliesB - Truth value of A → B
 * @returns {boolean} - Valid conclusion B (if premises true)
 * @purpose Implements modus ponens: (A ∧ (A→B)) → B
 * @when Used in logical deduction, rule engines, circuit design
 */
function modusPonens(a, aImpliesB) {
  if (a && aImpliesB) return true;   // B must be true
  return false;                       // premises not both true → B irrelevant
}`}
          </pre>
        </section>

        {/* Mini Checklist */}
        <div className="animate-fadeSlideUp p-5 bg-blue-100 dark:bg-blue-900/30 rounded-2xl border border-blue-300 dark:border-blue-700" style={{ animationDelay: "0.6s" }}>
          <h3 className="text-xl font-semibold">📋 Student Checklist</h3>
          <ul className="grid sm:grid-cols-2 gap-2 mt-2">
            <li>✔️ I can draw truth table for A and A→B</li>
            <li>✔️ I can apply distributive & complement laws</li>
            <li>✔️ I can explain why A ∧ (A→B) simplifies to A∧B</li>
            <li>✔️ I can identify modus ponens in everyday reasoning</li>
            <li>✔️ I know the difference between modus ponens and fallacy of converse</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="Syllogism in Logical Algebra FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="animate-fadeSlideUp" style={{ animationDelay: "0.7s" }}>
          <Teacher note="🎓 Teacher’s Note: Emphasize that logical algebra is not just math — it’s a superpower for debugging arguments. Have students convert 'If Tuhina practices, she wins' into algebraic form. Let them discover that when A is false, the implication says nothing about B — a common stumbling block. Use the animated SVG to reinforce the flow from premises to conclusion. For advanced students, challenge them to prove hypothetical syllogism: (A→B) ∧ (B→C) ⇒ (A→C) using only algebraic laws." />
        </div>
      </div>
    </div>
  );
};

export default Topic31;