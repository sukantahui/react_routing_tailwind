import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import operatorExampleJava from "./topic2_files/OperatorExample.java?raw";
import questions from "./topic2_files/topic2_questions";

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

export default function Topic2() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            What is an Operator?
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            The verbs of programming – operators tell the computer what to do with your data.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Defining an Operator
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                An <strong className="text-indigo-600 dark:text-indigo-400">operator</strong> is a symbol that tells
                the compiler or interpreter to perform a specific mathematical, relational, or logical operation and
                produce a result. In the expression <code className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">5 + 3</code>,
                the <code>+</code> is the operator that adds the two operands.
              </p>
              <p>
                Java provides a rich set of operators, including arithmetic (<code>+</code>, <code>-</code>, <code>*</code>,
                <code>/</code>, <code>%</code>), relational (<code>&lt;</code>, <code>&gt;</code>, <code>==</code>, <code>!=</code>),
                logical (<code>&amp;&amp;</code>, <code>||</code>, <code>!</code>), assignment (<code>=</code>, <code>+=</code>, etc.),
                bitwise, and more. Each operator has a specific precedence and associativity that determine how expressions
                are evaluated.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Operators are the "verbs" of an expression – they
                  act on operands to produce a new value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES OF OPERATORS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Categories of Operators
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Relational (Comparison)</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>==</code> equal to</li>
                  <li><code>!=</code> not equal</li>
                  <li><code>&gt;</code> greater than</li>
                  <li><code>&lt;</code> less than</li>
                  <li><code>&gt;=</code> greater/equal</li>
                  <li><code>&lt;=</code> less/equal</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Logical</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>&amp;&amp;</code> AND</li>
                  <li><code>||</code> OR</li>
                  <li><code>!</code> NOT</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Assignment</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>=</code> simple assignment</li>
                  <li><code>+=</code>, <code>-=</code>, etc.</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Unary</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>+</code> unary plus</li>
                  <li><code>-</code> unary minus</li>
                  <li><code>++</code> increment</li>
                  <li><code>--</code> decrement</li>
                  <li><code>!</code> logical NOT</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Ternary</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><code>? :</code> conditional operator (3 operands)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* REAL‑WORLD USAGE */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Real‑World Usage
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Operators are everywhere. In an e‑commerce cart, you use <code>+</code> to add item prices, <code>*</code>
                to calculate tax, and <code>&gt;</code> to check if stock is sufficient. In a school grading system,
                <code>==</code> checks if the student’s grade is an 'A'.
              </p>
              <p>
                Logical operators like <code>&amp;&amp;</code> and <code>||</code> are used to combine conditions:
                <code>if (age &gt;= 18 &amp;&amp; hasLicense)</code> determines driving eligibility.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Susmita said, "I use <code>+</code> to add my
                  marks in Ichapur, and <code>%</code> to check if my total is divisible by 5. Operators make calculations easy!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Operator Classification */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Operator Categories at a Glance
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 750 250"
                className="w-full max-w-4xl h-auto"
                role="img"
                aria-label="Diagram of operator categories"
              >
                <rect x="20" y="20" width="710" height="210" rx="16" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="710" height="210" rx="16" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Central node: Operator */}
                <circle cx="375" cy="125" r="45" fill="#6366f1" opacity="0.15" />
                <circle cx="375" cy="125" r="35" fill="#6366f1" opacity="0.25" />
                <text x="375" y="130" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#4338ca" className="dark:fill-indigo-300">Operator</text>

                {/* Branches */}
                <g stroke="#64748b" strokeWidth="2" className="dark:stroke-gray-400">
                  <line x1="340" y1="100" x2="230" y2="60" />
                  <line x1="410" y1="100" x2="520" y2="60" />
                  <line x1="340" y1="150" x2="230" y2="190" />
                  <line x1="410" y1="150" x2="520" y2="190" />
                </g>

                {/* Category nodes */}
                <g textAnchor="middle" fontSize="13" fontWeight="500">
                  <rect x="140" y="30" width="180" height="40" rx="8" fill="#0ea5e9" opacity="0.2" />
                  <text x="230" y="55" fill="#0ea5e9">Arithmetic</text>

                  <rect x="430" y="30" width="180" height="40" rx="8" fill="#22c55e" opacity="0.2" />
                  <text x="520" y="55" fill="#22c55e">Relational</text>

                  <rect x="140" y="180" width="180" height="40" rx="8" fill="#f59e0b" opacity="0.2" />
                  <text x="230" y="205" fill="#f59e0b">Logical</text>

                  <rect x="430" y="180" width="180" height="40" rx="8" fill="#ec4899" opacity="0.2" />
                  <text x="520" y="205" fill="#ec4899">Assignment</text>
                </g>

                {/* Additional small labels */}
                <text x="375" y="230" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">(and many more)</text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              Operators are classified by the kind of operation they perform and the number of operands they take.
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
                <strong>Know operator precedence</strong> – use parentheses to make your intent clear; don't rely solely
                on memory.
              </li>
              <li>
                <strong>Use compound assignments</strong> (<code>+=</code>, <code>-=</code>) to make code concise and
                reduce repetition.
              </li>
              <li>
                <strong>Leverage short‑circuit evaluation</strong> – in <code>&amp;&amp;</code> and <code>||</code>,
                the second operand is only evaluated if needed, which can prevent null pointer exceptions.
              </li>
              <li>
                <strong>Use the ternary operator sparingly</strong> – for simple conditions, it improves readability;
                for complex logic, use <code>if‑else</code>.
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
                <strong>Confusing <code>=</code> and <code>==</code></strong> – using assignment inside a condition
                leads to logic errors.
              </li>
              <li>
                <strong>Integer division surprises</strong> – <code>5 / 2</code> yields <code>2</code>; use <code>5 / 2.0</code>
                for <code>2.5</code>.
              </li>
              <li>
                <strong>Misunderstanding precedence</strong> – e.g., <code>a &lt; b &amp;&amp; c &lt; d</code> is
                interpreted as <code>(a &lt; b) &amp;&amp; (c &lt; d)</code>, but some might mis‑group.
              </li>
              <li>
                <strong>Side effects in logical operators</strong> – in <code>a &amp;&amp; b</code>, if <code>a</code>
                is <code>false</code>, <code>b</code> is not evaluated; if <code>b</code> has side effects, they won't occur.
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
                <strong>Use spaces around operators</strong> – <code>a + b</code> is more readable than <code>a+b</code>.
              </li>
              <li>
                <strong>Avoid overly long expressions</strong> – break them into smaller statements for clarity.
              </li>
              <li>
                <strong>Prefer <code>&amp;&amp;</code> and <code>||</code> over <code>&amp;</code> and <code>|</code></strong>
                for boolean logic to get short‑circuiting.
              </li>
              <li>
                <strong>Use the <code>+</code> operator for string concatenation only with care</strong> – for many
                concatenations, consider <code>StringBuilder</code>.
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
                "I can define what an operator is.",
                "I can name at least four categories of operators.",
                "I understand the difference between unary, binary, and ternary.",
                "I know the common pitfalls (like = vs ==).",
                "I can write simple expressions using multiple operators.",
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
              <li>• Why does <code>5 + 3 * 2</code> give 11, not 16? How would you change it to 16?</li>
              <li>• What happens if you use <code>=</code> inside an <code>if</code> condition? Try it.</li>
              <li>• How would you check if a number is even and positive?</li>
              <li>• Can you use the <code>+</code> operator with strings? What does it do?</li>
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
                fileModule={operatorExampleJava}
                title="OperatorExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates various operators in Java, including arithmetic, relational, logical, and assignment.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Operators are the action words of programming. I tell my students in Barrackpore: 'If operands are the ingredients, operators are the cooking methods.' Always start with simple operators and gradually introduce more. Encourage students to write small programs that test each operator and see the results. The key is to understand not just what each operator does, but also how they interact (precedence and associativity)."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Operators – FAQs"
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