import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import unaryBinaryExampleJava from "./topic3_files/UnaryBinaryExample.java?raw";
import questions from "./topic3_files/topic3_questions";

// Inline keyframes (motion‑safe)
const styles = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeUp {
    animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-scaleIn {
    animation: scaleIn 0.5s ease-out forwards;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  @media (prefers-reduced-motion: reduce) {
    .animate-fadeUp, .animate-scaleIn {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

export default function Topic3() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Unary and Binary Operators
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Understanding operators based on how many operands they work with.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Unary vs. Binary Operators
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Operators in Java are classified by the number of <strong>operands</strong> they take:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong className="text-indigo-600 dark:text-indigo-400">Unary operators</strong> act on a single
                  operand. Examples include <code>+</code> (unary plus), <code>-</code> (unary minus), <code>++</code>
                  (increment), <code>--</code> (decrement), <code>!</code> (logical NOT), and <code>~</code> (bitwise
                  complement).
                </li>
                <li>
                  <strong className="text-emerald-600 dark:text-emerald-400">Binary operators</strong> require two
                  operands. Most arithmetic (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>),
                  relational (<code>&lt;</code>, <code>&gt;</code>, <code>==</code>, <code>!=</code>), logical
                  (<code>&amp;&amp;</code>, <code>||</code>), and assignment operators are binary.
                </li>
              </ul>
              <p>
                There is also one <strong>ternary operator</strong> (<code>? :</code>) that takes three operands, but
                we focus on unary and binary here.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> The number of operands determines the
                  <strong>arity</strong> of the operator. Unary = one, binary = two, ternary = three.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* UNARY OPERATORS IN DEPTH */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Unary Operators in Detail
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Unary Plus <code>+</code></h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Indicates a positive value (rarely needed). <code>+5</code> is the same as <code>5</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Unary Minus <code>-</code></h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Negates the operand. <code>-5</code> makes a positive number negative.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Increment <code>++</code></h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Increases the value by 1. Prefix <code>++x</code> increments then uses; postfix <code>x++</code> uses then increments.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Decrement <code>--</code></h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Decreases the value by 1. Prefix and postfix work similarly.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Logical NOT <code>!</code></h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Inverts a boolean value. <code>!true</code> becomes <code>false</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Bitwise Complement <code>~</code></h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Flips all bits of an integer operand (one's complement).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BINARY OPERATORS IN DEPTH */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Binary Operators in Detail
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Arithmetic</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>+</code> addition</li>
                  <li><code>-</code> subtraction</li>
                  <li><code>*</code> multiplication</li>
                  <li><code>/</code> division</li>
                  <li><code>%</code> modulo</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Relational</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>==</code> equal</li>
                  <li><code>!=</code> not equal</li>
                  <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Logical</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>&amp;&amp;</code> short‑circuit AND</li>
                  <li><code>||</code> short‑circuit OR</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Assignment</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>=</code> simple assignment</li>
                  <li><code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code></li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Bitwise</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>&amp;</code> AND</li>
                  <li><code>|</code> OR</li>
                  <li><code>^</code> XOR</li>
                  <li><code>&lt;&lt;</code>, <code>&gt;&gt;</code>, <code>&gt;&gt;&gt;</code> shifts</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Other</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>instanceof</code> type check</li>
                  <li>String concatenation <code>+</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* REAL‑WORLD USAGE */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Real‑World Usage
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Unary operators</strong> are used frequently in loops and counters. For example, in a loop that
                iterates over an array, <code>i++</code> increments the index. The <code>!</code> operator is used to
                toggle flags, e.g., <code>isLoggedIn = !isLoggedIn;</code>.
              </p>
              <p>
                <strong>Binary operators</strong> are everywhere. Calculating total marks: <code>total = maths + science + english</code>;
                checking eligibility: <code>if (age &gt;= 18 &amp;&amp; hasLicense)</code>; and assignment: <code>score = 100;</code>.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Abhronila from Shyamnagar said, "I use <code>++</code>
                  to count how many questions I answer correctly in a quiz, and <code>==</code> to check if my answer matches the key."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Unary vs Binary */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Visual Comparison
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 700 220"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Comparison of unary and binary operators"
              >
                <rect x="20" y="20" width="660" height="180" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="660" height="180" rx="12" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Unary section */}
                <text x="200" y="55" fontSize="16" fontWeight="bold" fill="#0ea5e9" textAnchor="middle">Unary</text>
                <rect x="80" y="70" width="240" height="40" rx="8" fill="#0ea5e9" opacity="0.15" />
                <text x="200" y="95" fontSize="20" fill="#0ea5e9" textAnchor="middle">- x</text>
                <text x="200" y="130" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">One operand → operator acts on it</text>

                {/* Binary section */}
                <text x="500" y="55" fontSize="16" fontWeight="bold" fill="#22c55e" textAnchor="middle">Binary</text>
                <rect x="380" y="70" width="240" height="40" rx="8" fill="#22c55e" opacity="0.15" />
                <text x="500" y="95" fontSize="20" fill="#22c55e" textAnchor="middle">a + b</text>
                <text x="500" y="130" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Two operands → operator combines them</text>

                {/* Arrow */}
                <line x1="320" y1="90" x2="380" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                  </marker>
                </defs>

                {/* Additional labels */}
                <text x="350" y="170" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Arity: 1 vs. 2</text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              Unary operators act on one operand; binary operators act on two.
            </p>
          </div>
        </section>

        {/* TIPS & TRICKS */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips &amp; Tricks (Professional Level)
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Prefer prefix <code>++</code> over postfix</strong> in loops where you don't need the old
                value – it's slightly more efficient and avoids unintended side effects.
              </li>
              <li>
                <strong>Use unary <code>!</code> to simplify conditions</strong> – e.g., <code>if (!isValid)</code>
                is clearer than <code>if (isValid == false)</code>.
              </li>
              <li>
                <strong>Understand short‑circuiting with binary logical operators</strong> – put the cheaper or more
                likely‑to‑fail condition first.
              </li>
              <li>
                <strong>Avoid using <code>++</code> and <code>--</code> inside complex expressions</strong> – it
                obscures the order of evaluation.
              </li>
            </ul>
          </div>
        </section>

        {/* COMMON PITFALLS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              ⚠️ Common Pitfalls
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Confusing postfix and prefix</strong> – e.g., <code>int a = 5; int b = a++ + a++;</code> leads
                to undefined evaluation order (though Java defines left‑to‑right, it's confusing).
              </li>
              <li>
                <strong>Using <code>&amp;</code> instead of <code>&amp;&amp;</code></strong> can cause NullPointerException
                because both sides are evaluated.
              </li>
              <li>
                <strong>Overusing unary operators</strong> – they can make code less readable.
              </li>
              <li>
                <strong>Assuming unary <code>+</code> does something</strong> – it's essentially a no‑op for numbers.
              </li>
            </ul>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-green-500 rounded-full"></span>
              ✅ Best Practices
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Use prefix increment/decrement unless you need the old value</strong> – it's clearer.
              </li>
              <li>
                <strong>Keep unary operations on separate lines</strong> when they have side effects.
              </li>
              <li>
                <strong>Use <code>&amp;&amp;</code> and <code>||</code> for logical conditions</strong> to benefit from
                short‑circuiting.
              </li>
              <li>
                <strong>Comment non‑obvious uses of unary operators</strong> – e.g., <code>// toggle flag</code>.
              </li>
            </ul>
          </div>
        </section>

        {/* MINI CHECKLIST */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              📋 Mini Checklist
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "I can define unary and binary operators.",
                "I can list common unary operators (++, --, !, -).",
                "I can list common binary operators (+, -, *, /, ==, &&, etc.).",
                "I understand the difference between prefix and postfix.",
                "I know when to use short‑circuit logical operators.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-indigo-500 text-xl">☐</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HINT SECTION */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              🤔 Think About…
            </h2>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>• What is the difference between <code>++x</code> and <code>x++</code>? Give an example.</li>
              <li>• Why is <code>&amp;&amp;</code> preferred over <code>&amp;</code> for logical conditions?</li>
              <li>• Can you have a binary operator with side effects? (e.g., <code>+=</code>)</li>
              <li>• How would you toggle a boolean flag using a unary operator?</li>
            </ul>
          </div>
        </section>

        {/* JAVA CODE EXAMPLE */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-orange-500 rounded-full"></span>
              🖥️ Java Example
            </h2>
            <div className="mt-4">
              <JavaFileLoader
                fileModule={unaryBinaryExampleJava}
                title="UnaryBinaryExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates both unary and binary operators in action.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "When teaching unary and binary operators, I emphasise the number of operands as a classification tool. I ask my students in Naihati to identify every operator in a piece of code and say whether it's unary or binary. This builds awareness. Also, highlight the side‑effects of increment/decrement – they are powerful but can be tricky. Encourage students to write small programs that test each operator's behaviour."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Unary and Binary Operators – FAQs"
            questions={questions}
          />
        </div>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 • Expression Conversion Course • Barrackpore, India</p>
        </footer>
      </div>
    </div>
  );
}