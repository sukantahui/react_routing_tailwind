import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import prefixExampleJava from "./topic9_files/PrefixExample.java?raw";
import questions from "./topic9_files/topic9_questions";

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

export default function Topic9() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Prefix Expression
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Polish notation – where the operator leads, operands follow.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              What is a Prefix Expression?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                A <strong className="text-indigo-600 dark:text-indigo-400">prefix expression</strong> (also known as
                <strong>Polish notation</strong>) is a notation where the operator is placed <em>before</em> its
                operands. For example, the infix expression <code>A + B</code> becomes <code>+ A B</code> in prefix.
              </p>
              <p>
                Prefix notation was invented by the Polish logician Jan Łukasiewicz in the 1920s. It eliminates the
                need for parentheses because the order of operations is determined solely by the position of operators.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><code>+ A B</code> – operator '+' before operands A and B.</li>
                <li><code>* + A B C</code> – means <code>(A + B) * C</code>.</li>
                <li>Prefix expressions are evaluated from right to left (or using a stack).</li>
              </ul>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Prefix is operator‑first – no ambiguity,
                  no parentheses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHARACTERISTICS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Characteristics of Prefix Notation
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Operator Position</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Operator appears before its operands: <code>op A B</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">No Parentheses</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Parentheses are never needed; evaluation order is implicit.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Evaluation Direction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Typically evaluated from right to left using a stack.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Machine‑Friendly</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Easy for compilers and interpreters to parse and evaluate.
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
                Prefix notation is widely used in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Lisp family languages</strong> (Scheme, Clojure, Common Lisp) – all expressions are prefix.</li>
                <li><strong>Functional programming</strong> – many languages use prefix for function application.</li>
                <li><strong>Compiler intermediate representations</strong> – sometimes used during parsing.</li>
                <li><strong>Expression evaluation in interpreters</strong> – prefix can be evaluated with a simple stack.</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Tuhina from Ichapur was fascinated to learn
                  that Lisp uses prefix – she tried <code>(+ 2 3)</code> and said, "It's like a function call!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Prefix Structure */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Prefix Structure
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 500 160"
                className="w-full max-w-2xl h-auto"
                role="img"
                aria-label="Prefix expression structure"
              >
                <rect x="20" y="20" width="460" height="120" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="460" height="120" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Operator */}
                <rect x="60" y="50" width="60" height="40" rx="8" fill="#f59e0b" opacity="0.2" />
                <text x="90" y="75" fontSize="20" fill="#f59e0b" textAnchor="middle" fontWeight="bold">+</text>

                {/* Operand A */}
                <rect x="170" y="50" width="80" height="40" rx="8" fill="#0ea5e9" opacity="0.2" />
                <text x="210" y="75" fontSize="20" fill="#0ea5e9" textAnchor="middle" fontWeight="bold">A</text>

                {/* Operand B */}
                <rect x="300" y="50" width="80" height="40" rx="8" fill="#0ea5e9" opacity="0.2" />
                <text x="340" y="75" fontSize="20" fill="#0ea5e9" textAnchor="middle" fontWeight="bold">B</text>

                {/* Labels below */}
                <text x="90" y="120" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operator</text>
                <text x="210" y="120" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operand</text>
                <text x="340" y="120" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operand</text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              In prefix, the operator comes first, followed by the operands.
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
                <strong>Read prefix from right to left</strong> – operands are evaluated first, then operators applied.
              </li>
              <li>
                <strong>Use prefix for unambiguous representation</strong> – parentheses are never needed.
              </li>
              <li>
                <strong>In Lisp, parentheses are used for grouping</strong> – but the operator is still prefix.
              </li>
              <li>
                <strong>Convert infix to prefix by scanning from right to left</strong> – common algorithm.
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
                <strong>Reading prefix left‑to‑right</strong> – evaluation is typically right‑to‑left.
              </li>
              <li>
                <strong>Forgetting the operator count</strong> – each operator needs the correct number of operands.
              </li>
              <li>
                <strong>Confusing prefix with postfix</strong> – they are mirror images.
              </li>
              <li>
                <strong>Not handling unary operators</strong> – they require special care in conversion.
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
                <strong>Use whitespace to separate tokens</strong> – e.g., <code>+ A B</code> instead of <code>+AB</code>.
              </li>
              <li>
                <strong>When converting, handle precedence carefully</strong> – use a stack.
              </li>
              <li>
                <strong>Test with simple expressions first</strong> – e.g., <code>+ 2 3</code>.
              </li>
              <li>
                <strong>Use prefix for internal representations</strong> – it simplifies evaluation.
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
                "I can identify a prefix expression.",
                "I understand that operators come before operands.",
                "I know prefix does not require parentheses.",
                "I can evaluate a simple prefix expression.",
                "I recognise real‑world uses of prefix.",
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
              <li>• How would you write <code>(A + B) * C</code> in prefix?</li>
              <li>• What is the value of <code>+ 2 * 3 4</code>? (Hint: evaluate right to left)</li>
              <li>• Why doesn't prefix need parentheses?</li>
              <li>• Try converting <code>5 + 3 * 2</code> to prefix manually.</li>
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
                fileModule={prefixExampleJava}
                title="PrefixExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates prefix expressions and their evaluation using a stack.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Prefix notation is a shift in thinking – the operator comes first. I encourage students to practice reading prefix by converting simple infix expressions. It's like learning a new language. Once they get the hang of it, they appreciate how it eliminates ambiguity. Use Lisp examples to show real‑world usage."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Prefix Expression – FAQs"
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