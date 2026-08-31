import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import conversionNeedExampleJava from "./topic6_files/ConversionNeedExample.java?raw";
import questions from "./topic6_files/topic6_questions";

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

export default function Topic6() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Need for Expression Conversion
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Why do we convert expressions? Discover the reasons behind infix, prefix, and postfix notations.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Convert Expressions?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Humans naturally write expressions in <strong className="text-indigo-600 dark:text-indigo-400">infix notation</strong>
                (e.g., <code>2 + 3 * 4</code>). However, computers are better at evaluating expressions that do not
                require precedence rules or parentheses. This is where <strong>prefix</strong> and <strong>postfix</strong>
                notations come in.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Infix</strong> – operator between operands. Requires precedence and associativity rules.
                  Hard to parse directly.
                </li>
                <li>
                  <strong>Prefix (Polish Notation)</strong> – operator before operands. No parentheses needed,
                  easier for machines to evaluate.
                </li>
                <li>
                  <strong>Postfix (Reverse Polish Notation)</strong> – operator after operands. Also no parentheses,
                  evaluated using a stack.
                </li>
              </ul>
              <p>
                Conversion between these notations is essential for compilers, calculators, and expression evaluation
                systems. It simplifies the process of evaluating expressions by eliminating ambiguity.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Expression conversion is about transforming
                  a human‑friendly format into a machine‑friendly one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY INFIX IS PROBLEMATIC */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              The Problem with Infix Notation
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Infix expressions are intuitive for humans but problematic for computers because:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>They require <strong>operator precedence</strong> and <strong>associativity</strong> rules to evaluate correctly.</li>
                <li>Parentheses can change the order, making parsing more complex.</li>
                <li>Scanning an infix expression left‑to‑right is not sufficient; the compiler must look ahead or use a stack.</li>
              </ul>
              <p>
                For example, <code>2 + 3 * 4</code> can be evaluated as <code>(2+3)*4 = 20</code> or <code>2+(3*4)=14</code>
                depending on precedence. This ambiguity must be resolved.
              </p>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <p className="text-sm">
                  <span className="font-medium">📘 Analogy:</span> Think of infix as natural language – it has
                  grammar rules. Computers prefer a simpler, unambiguous grammar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANTAGES OF PREFIX & POSTFIX */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Why Prefix and Postfix are Better for Computers
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">No Precedence Rules</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Operators are evaluated in the order they appear, eliminating the need for precedence tables.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">No Parentheses Needed</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The position of the operator determines the evaluation order, so parentheses are unnecessary.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Efficient Stack Evaluation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Both prefix and postfix can be evaluated using a simple stack algorithm with O(n) complexity.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Unambiguous Order</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The expression is self‑contained; the order of operations is determined solely by the position of operators.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REAL‑WORLD APPLICATIONS */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Real‑World Applications
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Expression conversion is not just a theoretical exercise – it's used in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Compilers:</strong> Infix expressions are converted to postfix or an abstract syntax tree (AST) during parsing.</li>
                <li><strong>Calculators:</strong> Many scientific calculators use Reverse Polish Notation (postfix) for efficiency.</li>
                <li><strong>Expression Evaluation in Databases:</strong> SQL and other query languages often convert conditions to postfix for execution.</li>
                <li><strong>Spreadsheet Software:</strong> Excel formulas are parsed and converted to an internal representation.</li>
              </ul>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Debangshu from Naihati once wondered why his
                  calculator had a stack of numbers. After learning about postfix, he realised it's the same principle!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Comparison */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Three Notations Compared
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 750 200"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Comparison of infix, prefix, postfix"
              >
                <rect x="20" y="20" width="710" height="160" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="710" height="160" rx="12" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Infix */}
                <text x="375" y="55" fontSize="14" fontWeight="bold" fill="#0ea5e9" textAnchor="middle">Infix</text>
                <rect x="120" y="70" width="200" height="40" rx="8" fill="#0ea5e9" opacity="0.15" />
                <text x="220" y="95" fontSize="18" fill="#0ea5e9" textAnchor="middle">A + B</text>
                <text x="220" y="125" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operator between operands</text>

                {/* Prefix */}
                <text x="600" y="55" fontSize="14" fontWeight="bold" fill="#22c55e" textAnchor="middle">Prefix</text>
                <rect x="500" y="70" width="200" height="40" rx="8" fill="#22c55e" opacity="0.15" />
                <text x="600" y="95" fontSize="18" fill="#22c55e" textAnchor="middle">+ A B</text>
                <text x="600" y="125" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operator before operands</text>

                {/* Postfix */}
                <text x="375" y="155" fontSize="14" fontWeight="bold" fill="#a855f7" textAnchor="middle">Postfix</text>
                <rect x="275" y="170" width="200" height="0" rx="8" opacity="0" />
                <text x="375" y="175" fontSize="18" fill="#a855f7" textAnchor="middle">A B +</text>
                <text x="375" y="195" fontSize="12" fill="#64748b" className="dark:fill-gray-400" textAnchor="middle">Operator after operands</text>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              The position of the operator relative to operands distinguishes the three notations.
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
                <strong>Understand the use case:</strong> Infix is for humans, prefix/postfix are for machines. Choose
                the right notation for the right context.
              </li>
              <li>
                <strong>Practice conversion manually:</strong> It builds intuition and helps debug compiler errors.
              </li>
              <li>
                <strong>Use stacks in your code:</strong> Implementing conversion algorithms reinforces understanding
                of data structures.
              </li>
              <li>
                <strong>Remember that prefix is also called Polish notation</strong> and postfix is Reverse Polish
                Notation (RPN). The names are often used interchangeably.
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
                <strong>Assuming conversion is trivial</strong> – it requires careful handling of parentheses and
                precedence, especially in infix.
              </li>
              <li>
                <strong>Forgetting about associativity</strong> – when converting, you must account for left‑ and
                right‑associative operators.
              </li>
              <li>
                <strong>Mixing up prefix and postfix</strong> – the order of operands and operators is reversed,
                leading to errors.
              </li>
              <li>
                <strong>Not handling unary operators correctly</strong> – they can complicate conversion algorithms.
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
                <strong>Always test your conversion algorithms</strong> – with both simple and complex expressions.
              </li>
              <li>
                <strong>Use a well‑defined algorithm</strong> – e.g., the Shunting‑yard algorithm for infix to postfix.
              </li>
              <li>
                <strong>Document the conversion steps</strong> – this helps others (and your future self) understand
                the logic.
              </li>
              <li>
                <strong>Separate conversion from evaluation</strong> – keeps your code modular and maintainable.
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
                "I understand why infix is problematic for machines.",
                "I know the advantages of prefix and postfix.",
                "I can identify each notation given an expression.",
                "I understand the role of conversion in compilers.",
                "I'm ready to learn the conversion algorithms.",
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
              <li>• Why is infix not suitable for direct evaluation in a stack‑based machine?</li>
              <li>• How would you evaluate <code>2 3 + 4 *</code> (postfix) step by step?</li>
              <li>• Can you think of a real‑world device that uses Reverse Polish Notation?</li>
              <li>• What would be the prefix notation for <code>a * (b + c)</code>?</li>
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
                fileModule={conversionNeedExampleJava}
                title="ConversionNeedExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates why conversion is useful – by evaluating a postfix expression using a stack.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "I always start this topic by asking my students in Shyamnagar: 'Why can't a computer just read 2+3*4?' This sparks curiosity. Then I explain that computers don't have intuition – they need explicit rules. Emphasise that conversion is about translating human logic into machine logic. Encourage students to practice converting simple expressions manually before diving into the algorithms."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Need for Expression Conversion – FAQs"
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