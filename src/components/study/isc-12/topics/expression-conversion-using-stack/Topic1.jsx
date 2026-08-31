import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import operandExampleJava from "./topic1_files/OperandExample.java?raw";
import questions from "./topic1_files/topic1_questions";

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

export default function Topic1() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            What is an Operand?
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            The building blocks that operators work on – from simple numbers to complex expressions.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Defining an Operand
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                An <strong className="text-indigo-600 dark:text-indigo-400">operand</strong> is any value, variable,
                constant, or even a sub‑expression on which an operator performs its action. In the expression{" "}
                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">5 + 3</code>, the numbers{" "}
                <code>5</code> and <code>3</code> are operands. They are the "data" that the <code>+</code> operator
                combines.
              </p>
              <p>
                Operands can be of any data type: <code>int</code>, <code>double</code>, <code>boolean</code>,
                <code>char</code>, or even objects. They appear on both sides of binary operators and as the sole
                operand of unary operators.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Every expression is built from operands
                  and operators – without operands, operators have nothing to act upon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TYPES OF OPERANDS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Types of Operands
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Literals</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Fixed values like <code>5</code>, <code>3.14</code>, <code>'a'</code>, <code>true</code>.
                  They are the simplest operands.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Variables</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Named storage like <code>x</code>, <code>totalMarks</code>, <code>isPassing</code>.
                  Their values are read during evaluation.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Sub‑expressions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  An expression itself can be an operand inside a larger expression, e.g., <code>(a + b)</code> in <code>(a + b) * c</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REAL‑WORLD USAGE */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Real‑World Analogies
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Think of Tuhina calculating her monthly expenses. The amounts she spends on food, transport, and
                entertainment are the <strong>operands</strong> – the numbers she adds together.
              </p>
              <p>
                In a school grading system, <code>maths</code>, <code>science</code>, and <code>english</code> are
                operands that the <code>+</code> operator combines to produce a total.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom example:</span> Debangshu asks, "If I have marks{' '}
                  <code>85</code> and <code>92</code>, those numbers are operands. When I add them, the <code>+</code>{' '}
                  is the operator."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Operands in Action
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 700 200"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Diagram showing operands"
              >
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                  </marker>
                </defs>

                {/* Background */}
                <rect x="20" y="20" width="660" height="160" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="660" height="160" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Expression: total = price + tax */}
                <text x="350" y="70" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">
                  <tspan fill="#0ea5e9">price</tspan>
                  <tspan fill="#f59e0b"> + </tspan>
                  <tspan fill="#0ea5e9">tax</tspan>
                  <tspan fill="#64748b">   →   </tspan>
                  <tspan fill="#22c55e">total</tspan>
                </text>

                {/* Label for operands */}
                <text x="210" y="130" fontSize="16" fill="#0ea5e9" textAnchor="middle">Operand</text>
                <text x="490" y="130" fontSize="16" fill="#0ea5e9" textAnchor="middle">Operand</text>

                {/* Arrows */}
                <line x1="210" y1="118" x2="260" y2="80" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="490" y1="118" x2="440" y2="80" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* Side note: can be expression */}
                <text x="580" y="160" fontSize="12" fill="#64748b" className="dark:fill-gray-400">(can be literals,</text>
                <text x="580" y="175" fontSize="12" fill="#64748b" className="dark:fill-gray-400">variables, or sub‑expr)</text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              Operands appear on both sides of a binary operator. They can be variables, literals, or even whole expressions.
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
                <strong>Choose meaningful names</strong> – operands like <code>studentAge</code> are better than <code>a</code>.
              </li>
              <li>
                <strong>Know your operand types</strong> – mixing <code>int</code> and <code>double</code> can lead to
                unexpected type coercion.
              </li>
              <li>
                <strong>Use constants for unchanging operands</strong> – e.g., <code>final double PI = 3.14159;</code>.
              </li>
              <li>
                <strong>Break complex sub‑expressions into named variables</strong> – this makes debugging easier.
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
                <strong>Using uninitialised variables as operands</strong> – causes a compile‑time error.
              </li>
              <li>
                <strong>Forgetting that operators have precedence</strong> – an operand may be part of a sub‑expression
                that is evaluated before the rest.
              </li>
              <li>
                <strong>Assuming two operands have the same type</strong> – e.g., <code>5 / 2</code> yields <code>2</code>,
                not <code>2.5</code>, because both are integers.
              </li>
              <li>
                <strong>Overlooking side‑effects</strong> – if an operand is a method call that modifies state, the
                expression may have unexpected behaviour.
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
                <strong>Declare variables close to where they are used</strong> – this improves readability.
              </li>
              <li>
                <strong>Use final for constants</strong> – makes intent clear and prevents accidental changes.
              </li>
              <li>
                <strong>Avoid magic numbers</strong> – define them as named constants (operands) at the top.
              </li>
              <li>
                <strong>Keep operands simple</strong> – if a sub‑expression is long, extract it into a variable.
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
                "I can define what an operand is.",
                "I can identify operands in any expression.",
                "I know the three types of operands.",
                "I understand the difference between operand and operator.",
                "I can use variables as operands correctly.",
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
              <li>• In <code>x = y + z</code>, which are the operands? Which is the operator?</li>
              <li>• Can a single expression contain operands of different types? What happens?</li>
              <li>• Why is <code>5</code> a valid operand but <code>5 +</code> is not?</li>
              <li>• Try writing an expression where an operand is a method call – what does it return?</li>
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
                fileModule={operandExampleJava}
                title="OperandExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates operands of various types in Java.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Operands are the 'nouns' of expressions – they are the data. I often ask my students in Naihati " +
              "to underline the operands in any expression they see. It helps them separate 'what is being operated on' " +
              "from 'how it is operated'. Remember: operands can be as simple as a number or as complex as a nested " +
              "expression. Focus on clarity: give each operand a descriptive name."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Operands – FAQs"
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