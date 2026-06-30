import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import expressionTypesExampleJava from "./topic7_files/ExpressionTypesExample.java?raw";
import questions from "./topic7_files/topic7_questions";

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

export default function Topic7() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Types of Expressions
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Explore the three main expression notations: Infix, Prefix, and Postfix – their definitions, properties, and use cases.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              The Three Main Types
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                An <strong className="text-indigo-600 dark:text-indigo-400">expression</strong> can be written in
                different notations depending on where the operator appears relative to the operands. The three
                fundamental types are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Infix:</strong> Operator between operands (e.g., <code>A + B</code>). This is the most
                  common and human‑readable format.
                </li>
                <li>
                  <strong>Prefix (Polish):</strong> Operator before operands (e.g., <code>+ A B</code>). No
                  parentheses needed.
                </li>
                <li>
                  <strong>Postfix (Reverse Polish):</strong> Operator after operands (e.g., <code>A B +</code>).
                  Also unambiguous and stack‑friendly.
                </li>
              </ul>
              <p>
                Each type has its strengths and weaknesses. Infix is intuitive for humans, while prefix and postfix
                are easier for machines to evaluate.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> The type is determined solely by the position
                  of the operator relative to its operands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED COMPARISON */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Detailed Comparison
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Feature</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Infix</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Prefix</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Postfix</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Operator Position</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Between operands</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Before operands</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">After operands</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Parentheses Required?</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Yes (to override precedence)</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">No</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Precedence Rules Needed?</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Yes</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">No</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Evaluation Method</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Stack with precedence</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Stack (right‑to‑left)</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Stack (left‑to‑right)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Human Readability</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">High</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Low</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Low</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Machine Efficiency</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">Low (complex)</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">High</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700">High</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">Example</td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700"><code>A + B</code></td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700"><code>+ A B</code></td>
                    <td className="p-3 border border-gray-200 dark:border-gray-700"><code>A B +</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Infix is for humans, prefix and postfix are for machines. Conversion is the bridge between them.
            </p>
          </div>
        </section>

        {/* PROPERTIES OF EACH */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Properties of Each Type
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300 text-lg">Infix</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 list-disc pl-4">
                  <li>Most natural for humans</li>
                  <li>Requires precedence rules</li>
                  <li>Uses parentheses for explicit grouping</li>
                  <li>Used in most programming languages</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300 text-lg">Prefix</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 list-disc pl-4">
                  <li>Operator before operands</li>
                  <li>No parentheses needed</li>
                  <li>Evaluated right‑to‑left with stack</li>
                  <li>Used in Lisp languages</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300 text-lg">Postfix</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 list-disc pl-4">
                  <li>Operator after operands</li>
                  <li>No parentheses needed</li>
                  <li>Evaluated left‑to‑right with stack</li>
                  <li>Used in Forth, PostScript, calculators</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* REAL‑WORLD EXAMPLES */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Real‑World Examples
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Consider the expression <code>(A + B) * C</code> – here's how it looks in each notation:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Infix:</strong> <code>(A + B) * C</code></li>
                <li><strong>Prefix:</strong> <code>* + A B C</code></li>
                <li><strong>Postfix:</strong> <code>A B + C *</code></li>
              </ul>
              <p>
                Notice that in prefix and postfix, parentheses are not needed because the order of operators and operands
                makes the evaluation unambiguous.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Susmita from Ichapur said, "When I first
                  saw <code>A B +</code>, I thought it was a typo. But after learning the rules, I realised it's just
                  a different way of writing."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – All Three */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Visual Representation
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 750 220"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Visual representation of three expression types"
              >
                <rect x="20" y="20" width="710" height="180" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="710" height="180" rx="12" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Infix */}
                <rect x="40" y="50" width="200" height="120" rx="8" fill="#0ea5e9" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="140" y="80" fontSize="14" fontWeight="bold" fill="#0ea5e9" textAnchor="middle">Infix</text>
                <text x="140" y="110" fontSize="20" fill="#0ea5e9" textAnchor="middle">A + B</text>
                <text x="140" y="145" fontSize="11" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operator between</text>

                {/* Prefix */}
                <rect x="280" y="50" width="200" height="120" rx="8" fill="#22c55e" opacity="0.1" stroke="#22c55e" strokeWidth="1.5" />
                <text x="380" y="80" fontSize="14" fontWeight="bold" fill="#22c55e" textAnchor="middle">Prefix</text>
                <text x="380" y="110" fontSize="20" fill="#22c55e" textAnchor="middle">+ A B</text>
                <text x="380" y="145" fontSize="11" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operator before</text>

                {/* Postfix */}
                <rect x="520" y="50" width="200" height="120" rx="8" fill="#a855f7" opacity="0.1" stroke="#a855f7" strokeWidth="1.5" />
                <text x="620" y="80" fontSize="14" fontWeight="bold" fill="#a855f7" textAnchor="middle">Postfix</text>
                <text x="620" y="110" fontSize="20" fill="#a855f7" textAnchor="middle">A B +</text>
                <text x="620" y="145" fontSize="11" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operator after</text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              The position of the operator determines the expression type.
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
                <strong>Always identify the type first</strong> – before evaluating or converting, know which notation
                you're working with.
              </li>
              <li>
                <strong>Use the operator position as a clue</strong> – if the operator is between operands → infix;
                before → prefix; after → postfix.
              </li>
              <li>
                <strong>Remember that prefix and postfix are equivalent</strong> – they are just different notations
                for the same expression.
              </li>
              <li>
                <strong>For complex expressions, prefix and postfix are often shorter</strong> – because they don't
                need parentheses.
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
                <strong>Confusing prefix and postfix</strong> – e.g., treating <code>+ A B</code> as <code>A B +</code>.
                They are different!
              </li>
              <li>
                <strong>Assuming infix is the only valid notation</strong> – prefix and postfix are equally valid
                and often more efficient.
              </li>
              <li>
                <strong>Forgetting that prefix/postfix don't need parentheses</strong> – if you see parentheses in
                prefix or postfix, it's likely a mistake.
              </li>
              <li>
                <strong>Mis‑ordering operands in prefix/postfix</strong> – the order of operands must be preserved
                relative to infix.
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
                <strong>Practice converting between all three</strong> – the more you practice, the more intuitive
                they become.
              </li>
              <li>
                <strong>Use parentheses in infix to avoid ambiguity</strong> – even if you know precedence, others
                may not.
              </li>
              <li>
                <strong>When reading prefix/postfix, trace the evaluation order</strong> – this helps build
                understanding.
              </li>
              <li>
                <strong>Choose the right notation for the task</strong> – infix for readability, prefix/postfix for
                performance and simplicity.
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
                "I can define infix, prefix, and postfix.",
                "I know the position of the operator in each.",
                "I understand the advantages of each type.",
                "I can identify the type of a given expression.",
                "I know when to use each notation.",
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
              <li>• What would the prefix notation be for <code>(A - B) / C</code>?</li>
              <li>• How would you write <code>A * (B + C)</code> in postfix?</li>
              <li>• Why is <code>A B + C *</code> unambiguous without parentheses?</li>
              <li>• Can you think of a situation where prefix is better than postfix?</li>
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
                fileModule={expressionTypesExampleJava}
                title="ExpressionTypesExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program shows the same expression in all three notations and evaluates the postfix version.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "I love this topic because it's where theory meets practice. I tell my students in Barrackpore: 'Each notation is like a different language – you need to be able to translate between them.' The key is to understand the underlying structure, not just the symbols. I encourage them to draw expression trees to visualise the relationships."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Types of Expressions – FAQs"
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