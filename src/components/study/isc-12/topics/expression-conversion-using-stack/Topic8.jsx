import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import infixExampleJava from "./topic8_files/InfixExample.java?raw";
import questions from "./topic8_files/topic8_questions";

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

export default function Topic8() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Infix Expression
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            The standard notation we use every day – operators between operands.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              What is an Infix Expression?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                An <strong className="text-indigo-600 dark:text-indigo-400">infix expression</strong> is a notation
                where the operator is placed <em>between</em> its operands. This is the most familiar form of writing
                expressions, used in mathematics and most programming languages.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><code>A + B</code> – operator '+' between operands A and B.</li>
                <li><code>5 * 3 - 2</code> – multiplication and subtraction with operators between operands.</li>
                <li><code>(A + B) * C</code> – parentheses used to override precedence.</li>
              </ul>
              <p>
                While infix is intuitive for humans, it requires <strong>precedence</strong> and <strong>associativity</strong>
                rules to be evaluated correctly by machines. This is why compilers often convert infix expressions to
                postfix or prefix during parsing.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Infix is the "natural" way for humans, but
                  it's ambiguous without additional rules.
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
              Characteristics of Infix Notation
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Operator Position</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Operator is written between the operands: <code>A op B</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Needs Precedence</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Evaluation order depends on operator precedence (e.g., <code>*</code> before <code>+</code>).
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Uses Parentheses</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Parentheses can override precedence: <code>(A + B) * C</code> forces addition first.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Human‑Friendly</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Most readable for people; used in textbooks, code, and everyday arithmetic.
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
                Infix is everywhere in programming:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Java, Python, C++:</strong> All use infix for arithmetic and logical operations.</li>
                <li><strong>Spreadsheets:</strong> Excel formulas are written in infix (e.g., <code>=A1+B1*C1</code>).</li>
                <li><strong>Mathematics:</strong> Algebra, calculus, and statistics use infix notation.</li>
                <li><strong>Database queries:</strong> SQL conditions like <code>WHERE age &gt 18</code> use infix.</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Swadeep from Barrackpore said, "I never
                  thought about the notation – I just write <code>a + b</code> like everyone else. Now I realise why
                  my calculator sometimes gives different results if I don't use parentheses!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Infix Structure */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Infix Structure
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 500 160"
                className="w-full max-w-2xl h-auto"
                role="img"
                aria-label="Infix expression structure"
              >
                <rect x="20" y="20" width="460" height="120" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="460" height="120" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Operand A */}
                <rect x="60" y="50" width="80" height="40" rx="8" fill="#0ea5e9" opacity="0.2" />
                <text x="100" y="75" fontSize="20" fill="#0ea5e9" textAnchor="middle" fontWeight="bold">A</text>

                {/* Operator */}
                <rect x="190" y="50" width="60" height="40" rx="8" fill="#f59e0b" opacity="0.2" />
                <text x="220" y="75" fontSize="20" fill="#f59e0b" textAnchor="middle" fontWeight="bold">+</text>

                {/* Operand B */}
                <rect x="300" y="50" width="80" height="40" rx="8" fill="#0ea5e9" opacity="0.2" />
                <text x="340" y="75" fontSize="20" fill="#0ea5e9" textAnchor="middle" fontWeight="bold">B</text>

                {/* Labels below */}
                <text x="100" y="120" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operand</text>
                <text x="220" y="120" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operator</text>
                <text x="340" y="120" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operand</text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              In infix, the operator sits between the two operands.
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
                <strong>Always use parentheses when mixing operators</strong> – e.g., <code>(a + b) * c</code> instead
                of <code>a + b * c</code> if you want addition first.
              </li>
              <li>
                <strong>Know the precedence table of your language</strong> – this avoids surprises.
              </li>
              <li>
                <strong>Break long infix expressions into multiple lines</strong> – use intermediate variables for clarity.
              </li>
              <li>
                <strong>Use whitespace</strong> – spaces around operators improve readability.
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
                <strong>Assuming left‑to‑right evaluation</strong> – precedence can change the order.
              </li>
              <li>
                <strong>Forgetting parentheses</strong> – leads to unintended evaluation order.
              </li>
              <li>
                <strong>Confusing <code>=</code> and <code>==</code></strong> – assignment vs. comparison.
              </li>
              <li>
                <strong>Overlooking integer division</strong> – <code>5/2</code> gives <code>2</code> in Java, not 2.5.
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
                <strong>Write explicit expressions</strong> – use parentheses even when not strictly needed for clarity.
              </li>
              <li>
                <strong>Avoid side effects in complex infix expressions</strong> – e.g., don't use <code>i++</code>
                inside a large expression.
              </li>
              <li>
                <strong>Use spaces consistently</strong> – <code>a + b</code> is better than <code>a+b</code>.
              </li>
              <li>
                <strong>Comment non‑obvious expressions</strong> – explain the logic behind the math.
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
                "I can identify an infix expression.",
                "I understand that operators are between operands.",
                "I know infix requires precedence and parentheses.",
                "I can write a simple infix expression.",
                "I can avoid common pitfalls like integer division.",
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
              <li>• Why does <code>10 - 3 - 2</code> give 5, not 9? (Hint: associativity)</li>
              <li>• How would you write <code>A * B + C * D</code> with parentheses to make it explicit?</li>
              <li>• What happens if you forget parentheses in <code>total = marks1 + marks2 / 2</code>?</li>
              <li>• Try writing an infix expression that uses all four arithmetic operators.</li>
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
                fileModule={infixExampleJava}
                title="InfixExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates infix expressions in Java, including the effect of precedence and parentheses.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Infix is the notation students are most familiar with, but they often take it for granted. I emphasise that behind the scenes, the compiler is doing a lot of work to interpret it. Use simple examples to show how precedence and parentheses change the result. I encourage students to predict the output of an expression before running the code – this builds debugging skills."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Infix Expression – FAQs"
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