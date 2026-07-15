import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import postfixExampleJava from "./topic10_files/PostfixExample.java?raw";
import questions from "./topic10_files/topic10_questions";

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

export default function Topic10() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Postfix Expression
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Reverse Polish Notation – operands first, operator last.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              What is a Postfix Expression?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                A <strong className="text-indigo-600 dark:text-indigo-400">postfix expression</strong> (also known as
                <strong>Reverse Polish Notation or RPN</strong>) is a notation where the operator is placed <em>after</em>
                its operands. For example, the infix expression <code>A + B</code> becomes <code>A B +</code> in postfix.
              </p>
              <p>
                Postfix notation was developed as a way to eliminate parentheses and simplify expression evaluation.
                It is widely used in stack‑based calculators and some programming languages (e.g., Forth, PostScript).
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><code>A B +</code> – operator '+' after operands A and B.</li>
                <li><code>A B + C *</code> – means <code>(A + B) * C</code>.</li>
                <li>Postfix expressions are evaluated from left to right using a stack.</li>
              </ul>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Postfix is operator‑last – operands are listed,
                  then the operation is performed.
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
              Characteristics of Postfix Notation
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Operator Position</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Operator appears after its operands: <code>A B op</code>.
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
                  Evaluated from left to right using a stack.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Machine‑Friendly</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Easy for compilers and calculators to evaluate.
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
                Postfix notation is used in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Stack‑based calculators</strong> (e.g., HP calculators) – users enter operands first, then the operation.</li>
                <li><strong>Forth and PostScript</strong> – programming languages that use postfix natively.</li>
                <li><strong>Compiler intermediate representations</strong> – postfix is often used as an IR.</li>
                <li><strong>Expression evaluation in interpreters</strong> – postfix can be evaluated with a simple stack.</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Abhronila from Naihati tried using an RPN
                  calculator and was initially confused, but after a few minutes she said, "It's so logical – I don't
                  need parentheses anymore!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Postfix Structure */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Postfix Structure
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 500 160"
                className="w-full max-w-2xl h-auto"
                role="img"
                aria-label="Postfix expression structure"
              >
                <rect x="20" y="20" width="460" height="120" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="460" height="120" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Operand A */}
                <rect x="60" y="50" width="80" height="40" rx="8" fill="#0ea5e9" opacity="0.2" />
                <text x="100" y="75" fontSize="20" fill="#0ea5e9" textAnchor="middle" fontWeight="bold">A</text>

                {/* Operand B */}
                <rect x="190" y="50" width="80" height="40" rx="8" fill="#0ea5e9" opacity="0.2" />
                <text x="230" y="75" fontSize="20" fill="#0ea5e9" textAnchor="middle" fontWeight="bold">B</text>

                {/* Operator */}
                <rect x="320" y="50" width="60" height="40" rx="8" fill="#f59e0b" opacity="0.2" />
                <text x="350" y="75" fontSize="20" fill="#f59e0b" textAnchor="middle" fontWeight="bold">+</text>

                {/* Labels below */}
                <text x="100" y="120" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operand</text>
                <text x="230" y="120" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operand</text>
                <text x="350" y="120" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operator</text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              In postfix, the operands come first, followed by the operator.
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
                <strong>Read postfix from left to right</strong> – operands are pushed, operators pop and compute.
              </li>
              <li>
                <strong>Use a stack for evaluation</strong> – push operands, pop when operator appears.
              </li>
              <li>
                <strong>RPN is great for calculators</strong> – reduces keystrokes and errors.
              </li>
              <li>
                <strong>Convert infix to postfix using the Shunting‑yard algorithm</strong> – a classic stack-based method.
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
                <strong>Assuming postfix is evaluated right‑to‑left</strong> – it's actually left‑to‑right.
              </li>
              <li>
                <strong>Confusing postfix with prefix</strong> – they are mirrors.
              </li>
              <li>
                <strong>Forgetting to push operands before applying operators</strong> – leads to stack underflow.
              </li>
              <li>
                <strong>Not handling unary operators</strong> – they require special treatment.
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
                <strong>Use whitespace to separate tokens</strong> – e.g., <code>2 3 +</code> instead of <code>23+</code>.
              </li>
              <li>
                <strong>Test your evaluation algorithm with simple expressions</strong> – e.g., <code>2 3 +</code>.
              </li>
              <li>
                <strong>Use postfix for internal representations</strong> – it simplifies evaluation.
              </li>
              <li>
                <strong>Implement a stack class</strong> – use it for postfix evaluation.
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
                "I can identify a postfix expression.",
                "I understand that operators come after operands.",
                "I know postfix does not require parentheses.",
                "I can evaluate a simple postfix expression using a stack.",
                "I recognise real‑world uses of postfix.",
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
              <li>• How would you write <code>(A + B) * C</code> in postfix?</li>
              <li>• What is the value of <code>2 3 + 4 *</code>?</li>
              <li>• Why doesn't postfix need parentheses?</li>
              <li>• Try converting <code>5 + 3 * 2</code> to postfix manually.</li>
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
                fileModule={postfixExampleJava}
                title="PostfixExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates postfix expressions and their evaluation using a stack.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Postfix is my favourite notation to teach because it's so elegant with stacks. I encourage students to try using an RPN calculator – it really builds intuition. Remind them that postfix evaluation is a classic application of stack data structures, which they'll see again in many computer science topics."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Postfix Expression – FAQs"
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