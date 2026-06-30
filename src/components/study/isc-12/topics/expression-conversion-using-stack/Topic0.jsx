import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files for this topic
import expressionExampleJava from "./topic0_files/ExpressionExample.java?raw";
import questions from "./topic0_files/topic0_questions";

// ------------------------------------------------------------------
// Inline keyframes (only for motion‑safe usage)
// ------------------------------------------------------------------
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

  /* staggered delays */
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }

  /* motion‑safe: only animate if user allows */
  @media (prefers-reduced-motion: reduce) {
    .animate-fadeUp, .animate-scaleIn {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
`;

// ------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------
export default function Topic0() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      {/* Inject keyframes */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Introduction to Expressions
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            The building blocks of every program – learn what they are and why they matter.
          </p>
        </header>

        {/* ------------------------------------------------------------------
            THEORY SECTION
        ------------------------------------------------------------------ */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              What is an Expression?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                In computer science, an <strong className="text-indigo-600 dark:text-indigo-400">expression</strong> is
                a combination of <strong>operands</strong> (values, variables, constants) and{" "}
                <strong>operators</strong> (+, -, *, /, etc.) that, when evaluated, produces a single value.
              </p>
              <p>
                For example, <code className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">5 + 3</code> is an
                expression that evaluates to <code>8</code>. Similarly,{" "}
                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">x * y + 2</code> is an expression
                whose value depends on the current values of <code>x</code> and <code>y</code>.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key idea:</span> Every expression has a <strong>type</strong> (e.g.,
                  integer, boolean, string) and a <strong>value</strong> that can be used in larger statements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            REAL‑WORLD USAGE
        ------------------------------------------------------------------ */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Real‑World Usage
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Expressions are everywhere in programming. Consider a school grading system:{" "}
                <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                  totalMarks = maths + science + english
                </code>{" "}
                is an expression that calculates the total. In e‑commerce:{" "}
                <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                  finalPrice = price * quantity + tax
                </code>
                .
              </p>
              <p>
                Even decisions rely on expressions:{" "}
                <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">if (age &gt;= 18)</code> – the
                condition <code>age &gt;= 18</code> is a boolean expression.
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
                <p className="text-sm">
                  <span className="font-medium">🎓 Student analogy:</span> Think of Swadeep calculating his total
                  marks by adding his scores from Barrackpore’s internal exams. The addition is the expression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SVG ILLUSTRATION – Expression Anatomy
        ------------------------------------------------------------------ */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Anatomy of an Expression
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 600 180"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Diagram of expression components"
              >
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                  </marker>
                </defs>

                {/* Background box */}
                <rect x="20" y="20" width="560" height="140" rx="12" fill="#1e293b" opacity="0.08" />
                <rect x="20" y="20" width="560" height="140" rx="12" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Central expression: 5 + 3 */}
                <text x="300" y="85" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">
                  <tspan fill="#0ea5e9">5</tspan>
                  <tspan fill="#f59e0b"> + </tspan>
                  <tspan fill="#0ea5e9">3</tspan>
                </text>

                {/* Labels */}
                <text x="110" y="150" fontSize="16" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">
                  Operand
                </text>
                <text x="300" y="150" fontSize="16" fill="#f59e0b" textAnchor="middle">
                  Operator
                </text>
                <text x="490" y="150" fontSize="16" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">
                  Operand
                </text>

                {/* Arrows from labels to the components */}
                <line x1="110" y1="138" x2="170" y2="88" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <line x1="300" y1="138" x2="300" y2="92" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <line x1="490" y1="138" x2="430" y2="88" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

                {/* Evaluation result */}
                <text x="300" y="45" textAnchor="middle" fontSize="14" fill="#22c55e" fontWeight="500">
                  Evaluates to → 8
                </text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              A simple numeric expression consisting of two operands and one operator.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            TIPS & TRICKS (Professional)
        ------------------------------------------------------------------ */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips &amp; Tricks (Professional Level)
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Use parentheses</strong> to make precedence explicit – even if you remember the rules, future
                readers will thank you.
              </li>
              <li>
                <strong>Break complex expressions</strong> into intermediate variables. Instead of writing
                <code className="bg-gray-200 dark:bg-gray-700 px-1.5 rounded">a + b * c - d / e</code>, use
                <code className="bg-gray-200 dark:bg-gray-700 px-1.5 rounded">int product = b * c; int division = d / e; int result = a + product - division;</code>
              </li>
              <li>
                <strong>Know your types</strong> – mixing integer and floating‑point can lead to unexpected truncation.
              </li>
              <li>
                <strong>Use short‑circuit evaluation</strong> wisely in logical expressions (e.g.,
                <code className="bg-gray-200 dark:bg-gray-700 px-1.5 rounded">if (user != null &amp;&amp; user.isActive)</code>).
              </li>
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            COMMON MISTAKES & PITFALLS
        ------------------------------------------------------------------ */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              ⚠️ Common Pitfalls
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Forgetting operator precedence:</strong> <code>5 + 3 * 2</code> is 11, not 16. Always use
                parentheses if unsure.
              </li>
              <li>
                <strong>Mixing data types without explicit casting:</strong> e.g., <code>int result = 5 / 2;</code> gives
                2, not 2.5. Use <code>double</code> or cast.
              </li>
              <li>
                <strong>Using <code>=</code> instead of <code>==</code></strong> in conditionals – assignment instead of
                comparison.
              </li>
              <li>
                <strong>Overcomplicating expressions</strong> – making them hard to read and debug.
              </li>
            </ul>
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">🛠️ Debugger’s tip:</span> When an expression misbehaves, evaluate its
                parts separately in your head or with a debugger.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            BEST PRACTICES
        ------------------------------------------------------------------ */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-green-500 rounded-full"></span>
              ✅ Best Practices
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Keep expressions short</strong> – if an expression spans more than one line, refactor.
              </li>
              <li>
                <strong>Use meaningful variable names</strong> – <code>totalPrice</code> is better than <code>tp</code>.
              </li>
              <li>
                <strong>Comment non‑obvious expressions</strong> – explain why you wrote it that way.
              </li>
              <li>
                <strong>Consistent spacing</strong> – put spaces around operators for readability.
              </li>
              <li>
                <strong>Avoid side‑effects in expressions</strong> – e.g., don’t increment inside a large expression.
              </li>
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            MINI CHECKLIST
        ------------------------------------------------------------------ */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              📋 Mini Checklist
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "I know what an expression is.",
                "I can identify operands and operators.",
                "I understand operator precedence.",
                "I can write simple arithmetic expressions.",
                "I know how to avoid common pitfalls.",
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

        {/* ------------------------------------------------------------------
            HINT SECTION
        ------------------------------------------------------------------ */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              🤔 Think About…
            </h2>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>• What happens if you change the order of operations in an expression?</li>
              <li>• How would you write an expression to calculate the average of three numbers?</li>
              <li>• Why is <code>2 + 3 * 4</code> different from <code>(2 + 3) * 4</code>?</li>
              <li>• Try changing the data type of variables – what differences do you notice?</li>
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            JAVA CODE EXAMPLE (using JavaFileLoader)
        ------------------------------------------------------------------ */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-orange-500 rounded-full"></span>
              🖥️ Java Example
            </h2>
            <div className="mt-4">
              <JavaFileLoader
                fileModule={expressionExampleJava}
                title="ExpressionExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This simple program calculates the total marks of a student using an expression.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            TEACHER’S NOTE (using Teacher component)
        ------------------------------------------------------------------ */}
        <div className="animate-fadeUp delay-500">
          <Teacher
            note={
              "Expressions are the heart of programming logic. I often tell my students from Shyamnagar and Ichapur " +
              "to think of expressions as mini calculators inside their code. The key is to start simple and gradually " +
              "build up. Remember: readability is more important than brevity. When in doubt, add parentheses and " +
              "break down complex expressions. Practice by writing small expressions with different data types."
            }
          />
        </div>

        {/* ------------------------------------------------------------------
            FAQ SECTION
        ------------------------------------------------------------------ */}
        <div className="animate-fadeUp delay-100">
          <FAQTemplate
            title="Introduction to Expressions – FAQs"
            questions={questions}
          />
        </div>

        {/* ------------------------------------------------------------------
            FOOTER
        ------------------------------------------------------------------ */}
        <footer className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 • Expression Conversion Course • Barrackpore, India</p>
        </footer>
      </div>
    </div>
  );
}