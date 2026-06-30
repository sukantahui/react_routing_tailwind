import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import associativityExampleJava from "./topic5_files/AssociativityExample.java?raw";
import questions from "./topic5_files/topic5_questions";

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

export default function Topic5() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Operator Associativity
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            When operators have the same precedence, associativity decides the order of evaluation.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              What is Operator Associativity?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                <strong className="text-indigo-600 dark:text-indigo-400">Operator associativity</strong> defines the
                direction in which an expression is evaluated when two operators of the same precedence appear together.
                It can be <strong>left‑to‑right</strong> (left‑associative) or <strong>right‑to‑left</strong>
                (right‑associative).
              </p>
              <p>
                For example, in <code className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">10 - 3 - 2</code>,
                subtraction is left‑associative, so the expression is evaluated as <code>(10 - 3) - 2 = 5</code>.
                If it were right‑associative, it would be <code>10 - (3 - 2) = 9</code>.
              </p>
              <p>
                Most binary operators in Java are left‑associative, but some (assignment, ternary, prefix unary)
                are right‑associative.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Associativity only matters when multiple
                  operators of the same precedence appear in the same expression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEFT vs RIGHT ASSOCIATIVITY */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Left‑Associative vs. Right‑Associative
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300 text-lg">Left‑Associative</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Evaluation proceeds from left to right.
                </p>
                <ul className="mt-2 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li><code>a - b - c</code> → <code>(a - b) - c</code></li>
                  <li><code>a / b * c</code> → <code>(a / b) * c</code></li>
                  <li><code>a &amp;&amp; b &amp;&amp; c</code> → <code>(a &amp;&amp; b) &amp;&amp; c</code></li>
                </ul>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Most binary operators (arithmetic, relational, logical, bitwise) are left‑associative.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300 text-lg">Right‑Associative</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Evaluation proceeds from right to left.
                </p>
                <ul className="mt-2 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li><code>a = b = c</code> → <code>a = (b = c)</code></li>
                  <li><code>a ? b : c ? d : e</code> → <code>a ? b : (c ? d : e)</code></li>
                  <li><code>+ + x</code> (unary) → <code>+ (+ x)</code></li>
                </ul>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Assignment, ternary, and prefix unary operators are right‑associative.
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
              Real‑World Usage
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Associativity matters in calculations where the order of operations changes the result. For instance,
                in a calculator application, <code>100 - 50 - 20</code> must evaluate to <code>30</code> (left‑associative),
                not <code>70</code>.
              </p>
              <p>
                In data processing pipelines, chaining operations often relies on left‑associativity:{" "}
                <code>filter(pred1).filter(pred2).map(f)</code> – each operation is applied in order.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Swadeep from Ichapur wrote{" "}
                  <code>int result = 8 / 2 / 2;</code> and got <code>2</code> (left‑associative). He was surprised
                  to learn that right‑associative would give <code>8</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Associativity */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Visualizing Associativity
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 700 220"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Associativity illustration"
              >
                <rect x="20" y="20" width="660" height="180" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="660" height="180" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Left‑associative example */}
                <text x="200" y="55" fontSize="14" fontWeight="bold" fill="#0ea5e9" textAnchor="middle">Left‑Associative</text>
                <rect x="70" y="70" width="260" height="40" rx="8" fill="#0ea5e9" opacity="0.15" />
                <text x="200" y="95" fontSize="18" fill="#0ea5e9" textAnchor="middle">(10 - 3) - 2 = 5</text>
                <text x="200" y="135" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Subtraction: left to right</text>

                {/* Right‑associative example */}
                <text x="500" y="55" fontSize="14" fontWeight="bold" fill="#22c55e" textAnchor="middle">Right‑Associative</text>
                <rect x="370" y="70" width="260" height="40" rx="8" fill="#22c55e" opacity="0.15" />
                <text x="500" y="95" fontSize="18" fill="#22c55e" textAnchor="middle">a = (b = c)</text>
                <text x="500" y="135" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Assignment: right to left</text>

                {/* Arrow between */}
                <line x1="330" y1="90" x2="370" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              Left‑associative operators group from the left; right‑associative from the right.
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
                <strong>Never rely on associativity for clarity</strong> – always use parentheses when you have
                multiple operators of the same precedence.
              </li>
              <li>
                <strong>Remember assignment is right‑associative</strong> – so <code>a = b = c</code> assigns
                <code>c</code> to <code>b</code>, then <code>b</code> to <code>a</code>.
              </li>
              <li>
                <strong>Chained ternary operators can be confusing</strong> – they are right‑associative, so
                <code>a ? b : c ? d : e</code> is <code>a ? b : (c ? d : e)</code>.
              </li>
              <li>
                <strong>Know that prefix unary operators are right‑associative</strong> – so <code>- - x</code>
                is <code>- (- x)</code>.
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
                <strong>Assuming all operators are left‑associative</strong> – many are, but assignment and ternary
                are right‑associative.
              </li>
              <li>
                <strong>Mis‑understanding chained assignments</strong> – e.g., <code>a = b = c</code> is not a syntax
                error, but it may not be what you expect if you don't know associativity.
              </li>
              <li>
                <strong>Writing complex expressions without parentheses</strong> – even if you know associativity,
                others may not.
              </li>
              <li>
                <strong>Confusing prefix and postfix associativity</strong> – postfix operators are left‑associative,
                prefix are right‑associative.
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
                <strong>Use parentheses to make associativity explicit</strong> – it's more important than knowing
                the rule.
              </li>
              <li>
                <strong>Avoid chained assignments unless it's a common idiom</strong> – they can be confusing.
              </li>
              <li>
                <strong>Break long chains into separate statements</strong> – e.g., instead of <code>a = b = c = 5;</code>,
                use three assignments.
              </li>
              <li>
                <strong>When using ternary operators, always use parentheses</strong> – nested ternaries are difficult
                to read.
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
                "I understand what associativity is.",
                "I know the difference between left and right associativity.",
                "I can identify operators that are left‑associative.",
                "I know that assignment and ternary are right‑associative.",
                "I use parentheses to make associativity clear.",
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
              <li>• What is the value of <code>10 - 5 - 2</code>? Why?</li>
              <li>• How does <code>a = b = c = 10</code> work? Which variable gets what value?</li>
              <li>• Why is <code>2 + 3 + 4</code> left‑associative but <code>1 + "2" + 3</code> also left‑associative?</li>
              <li>• Try writing <code>true ? 5 : false ? 10 : 15</code> with parentheses to see the effect of right‑associativity.</li>
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
                fileModule={associativityExampleJava}
                title="AssociativityExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates the effect of associativity on expression evaluation.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Associativity is often overlooked, but it's crucial for correct expressions. I tell my students in Barrackpore: 'When you see a chain of subtractions or divisions, think about associativity – it changes the result!' I encourage them to always add parentheses, even when they think they know the rule. It's a habit that prevents bugs."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Operator Associativity – FAQs"
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