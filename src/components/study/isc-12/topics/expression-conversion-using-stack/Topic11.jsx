import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import infixToPostfixRulesJava from "./topic11_files/InfixToPostfixRules.java?raw";
import questions from "./topic11_files/topic11_questions";

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

export default function Topic11() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rules for Infix to Postfix Conversion
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            The essential rules that guide the conversion of infix to postfix using a stack.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Rules are Needed
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Converting infix expressions (where operators are between operands) to postfix (where operators follow
                operands) is a fundamental operation in compiler design and expression evaluation. The conversion
                process must respect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Operator precedence</strong> – higher precedence operators must be applied first.</li>
                <li><strong>Operator associativity</strong> – for operators of equal precedence, the order of evaluation (left‑to‑right or right‑to‑left) must be maintained.</li>
                <li><strong>Parentheses</strong> – they override the default precedence and must be handled correctly.</li>
              </ul>
              <p>
                The conversion is achieved using a <strong>stack</strong> to temporarily hold operators and parentheses
                until they are output to the postfix expression. The rules dictate when to push, pop, and output tokens.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> The conversion rules ensure that the postfix
                  expression preserves the original evaluation order of the infix expression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE RULES */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              The Rules – Step by Step
            </h2>
            <div className="mt-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 1: Operands</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Any operand (variable, constant, or number) is immediately appended to the output postfix expression.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Example: In <code>A + B</code>, <code>A</code> and <code>B</code> are output directly.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 2: Left Parenthesis <code>(</code></h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  When a left parenthesis is encountered, push it onto the stack.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  It acts as a marker for the start of a sub‑expression.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 3: Right Parenthesis <code>)</code></h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  When a right parenthesis is encountered, pop operators from the stack and append them to the output
                  until a left parenthesis is found. Then discard the left parenthesis.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This ensures the sub‑expression inside the parentheses is fully converted before continuing.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 4: Operator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  While the stack is not empty and the top of the stack is an operator with <strong>higher or equal</strong>
                  precedence than the current operator, pop and append to the output. Then push the current operator.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This ensures that operators with higher precedence are placed before lower precedence ones in the output.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Rule 5: End of Expression</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  After the entire infix expression has been processed, pop all remaining operators from the stack and
                  append them to the output.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This clears any operators still waiting in the stack.
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
              Real‑World Context
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                These rules are implemented in every compiler and interpreter that processes mathematical expressions.
                For instance, when you write <code>int x = a + b * c;</code> in Java, the compiler internally follows
                these rules to convert the infix expression to a postfix (or equivalent) representation before generating
                bytecode.
              </p>
              <p>
                Similarly, databases use these rules when parsing SQL query conditions, and spreadsheet software applies
                them to evaluate formulas.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Debangshu from Shyamnagar once debugged a
                  formula in Excel and realised that his mistake was due to missing parentheses – exactly the kind of
                  ambiguity these rules resolve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG ILLUSTRATION – Visualizing the Rules */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Visualizing the Conversion Rules
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 700 280"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Flow of infix to postfix rules"
              >
                <rect x="20" y="20" width="660" height="240" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="660" height="240" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Flow: infix token → decision → stack/output */}
                <g>
                  <text x="350" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">Conversion Process</text>

                  {/* Tokens */}
                  <text x="120" y="90" textAnchor="middle" fontSize="14" fill="#0ea5e9">Token</text>
                  <rect x="70" y="100" width="100" height="30" rx="6" fill="#0ea5e9" opacity="0.2" />
                  <text x="120" y="120" textAnchor="middle" fontSize="14" fill="#0ea5e9">Read</text>

                  {/* Arrow to decision */}
                  <line x1="170" y1="115" x2="220" y2="115" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Decision diamond */}
                  <polygon points="260,90 310,115 260,140 210,115" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="260" y="119" textAnchor="middle" fontSize="12" fill="#f59e0b">Type?</text>

                  {/* Branches */}
                  {/* Operand → output */}
                  <line x1="210" y1="105" x2="150" y2="160" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)" />
                  <text x="160" y="175" fontSize="12" fill="#22c55e">Operand</text>
                  <rect x="100" y="180" width="100" height="30" rx="6" fill="#22c55e" opacity="0.2" />
                  <text x="150" y="200" textAnchor="middle" fontSize="14" fill="#22c55e">Output</text>

                  {/* Operator → stack */}
                  <line x1="310" y1="105" x2="370" y2="160" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowYellow)" />
                  <text x="360" y="175" fontSize="12" fill="#f59e0b">Operator</text>
                  <rect x="310" y="180" width="100" height="30" rx="6" fill="#f59e0b" opacity="0.2" />
                  <text x="360" y="200" textAnchor="middle" fontSize="14" fill="#f59e0b">Stack</text>

                  {/* Parens */}
                  <line x1="260" y1="140" x2="260" y2="190" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowPink)" />
                  <text x="280" y="200" fontSize="12" fill="#ec4899">( or )</text>
                  <rect x="200" y="210" width="120" height="30" rx="6" fill="#ec4899" opacity="0.2" />
                  <text x="260" y="230" textAnchor="middle" fontSize="14" fill="#ec4899">Handle</text>

                  {/* Final step */}
                  <line x1="260" y1="140" x2="400" y2="140" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />

                  <text x="470" y="120" fontSize="12" fill="#64748b">At end:</text>
                  <rect x="440" y="130" width="80" height="30" rx="6" fill="#64748b" opacity="0.2" />
                  <text x="480" y="150" textAnchor="middle" fontSize="12" fill="#64748b">Pop all</text>
                </g>

                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                  </marker>
                  <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                  </marker>
                  <marker id="arrowYellow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                  </marker>
                  <marker id="arrowPink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              The conversion rules branch based on the token type: operands go to output, operators go to stack, parentheses are handled specially.
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
                <strong>Always define precedence and associativity tables</strong> – your conversion logic depends on them.
              </li>
              <li>
                <strong>Use a stack of characters or strings</strong> – ensure you can handle multi‑character operands.
              </li>
              <li>
                <strong>Test with expressions that include parentheses</strong> – e.g., <code>(A+B)*C</code> to verify correct handling.
              </li>
              <li>
                <strong>Implement the algorithm incrementally</strong> – start with simple expressions without parentheses, then add support for parentheses.
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
                <strong>Forgetting to pop remaining operators after processing</strong> – this leads to incomplete postfix output.
              </li>
              <li>
                <strong>Using wrong precedence comparison</strong> – e.g., popping higher precedence only, but equal precedence should also be popped for left‑associative operators.
              </li>
              <li>
                <strong>Not handling parentheses correctly</strong> – failing to pop until matching '('.
              </li>
              <li>
                <strong>Not considering associativity for operators of equal precedence</strong> – left‑associative operators require popping equal precedence; right‑associative do not.
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
                <strong>Write modular functions</strong> – separate precedence checking, associativity, and the main conversion loop.
              </li>
              <li>
                <strong>Use a debugger or print the stack at each step</strong> – helps visualise the process.
              </li>
              <li>
                <strong>Test with edge cases</strong> – e.g., empty expression, single operand, nested parentheses.
              </li>
              <li>
                <strong>Comment your code thoroughly</strong> – the rules are non‑trivial and comments help maintainability.
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
                "I know the five rules for infix to postfix conversion.",
                "I understand how parentheses are handled.",
                "I know when to pop operators from the stack.",
                "I understand the role of precedence and associativity.",
                "I can trace the algorithm on a simple expression.",
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
              <li>• Why do we pop operators with higher or equal precedence before pushing a new operator?</li>
              <li>• What happens if we forget to pop all operators at the end?</li>
              <li>• How does handling of '(' and ')' ensure correct conversion?</li>
              <li>• Try converting `A + B * C` using the rules step by step.</li>
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
                fileModule={infixToPostfixRulesJava}
                title="InfixToPostfixRules.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program implements the conversion rules in Java, with comments matching each step.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "These conversion rules are a classic application of stacks. I tell my students in Ichapur: 'Remember, the stack is your temporary holding area for operators. It's like a waiting room – operators wait until it's their turn to go to the output.' Emphasise that understanding the rules is more important than memorising the algorithm. Once they grasp the logic, the code follows naturally."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Infix to Postfix Rules – FAQs"
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