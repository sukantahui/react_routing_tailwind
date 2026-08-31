import React from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import infixToPrefixAlgorithmJavaRaw from "./topic16_files/InfixToPrefixAlgorithm.java?raw";
import questions from "./topic16_files/topic16_questions";

// --- Safeguard: ensure we have a string for Java code ---
const infixToPrefixAlgorithmJava = typeof infixToPrefixAlgorithmJavaRaw === 'string'
  ? infixToPrefixAlgorithmJavaRaw
  : '// Java code not available';

// --- Simple Error Boundary Component ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
          <h3 className="font-bold">Something went wrong</h3>
          <p className="text-sm">{this.state.error?.message || 'Unknown error'}</p>
          <p className="text-xs mt-2">Check that the .java file exists and the import is correct.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Inline keyframes (motion‑safe)
const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeUp { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  @media (prefers-reduced-motion: reduce) {
    .animate-fadeUp { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

export default function Topic16() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
        <style dangerouslySetInnerHTML={{ __html: styles }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

          {/* HEADER */}
          <header className="animate-fadeUp">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Algorithm for Infix to Prefix
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              A complete, step‑by‑step algorithm to transform infix to prefix using a stack.
            </p>
          </header>

          {/* THEORY */}
          <section className="animate-fadeUp delay-100">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
                Overview of the Algorithm
              </h2>
              <div className="mt-4 space-y-4">
                <p>
                  The algorithm for converting infix to prefix is a clever adaptation of the infix‑to‑postfix algorithm.
                  It uses the fact that prefix is essentially the reverse of postfix when the expression is reversed and
                  parentheses are swapped.
                </p>
                <p>
                  The overall strategy is:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Reverse</strong> the infix expression.</li>
                  <li><strong>Swap</strong> '(' and ')' in the reversed string.</li>
                  <li>Apply the <strong>standard infix‑to‑postfix algorithm</strong> with a crucial modification: operators of equal precedence are <strong>not</strong> popped from the stack.</li>
                  <li><strong>Reverse</strong> the output to obtain the prefix expression.</li>
                </ol>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">💡 Key insight:</span> The algorithm is a two‑step mirror: first reverse, then apply a modified postfix conversion, then reverse again.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PSEUDOCODE */}
          <section className="animate-fadeUp delay-200">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
                Algorithm Pseudocode
              </h2>
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-x-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
{`algorithm infixToPrefix(infix):
    // Step 1: Reverse the infix expression
    reversed = reverse(infix)
    
    // Step 2: Swap parentheses
    swapped = ""
    for each char in reversed:
        if char == '(': swapped += ')'
        else if char == ')': swapped += '('
        else: swapped += char

    // Step 3: Apply modified postfix algorithm (no equal precedence pop)
    stack = empty stack
    output = empty string
    for each token in swapped:
        if token is operand:
            output.append(token)
        else if token == '(':
            stack.push('(')
        else if token == ')':
            while stack not empty and stack.top() != '(':
                output.append(stack.pop())
            stack.pop()  // discard '('
        else: // token is operator
            while stack not empty and stack.top() != '(' and
                  precedence(stack.top()) > precedence(token):
                output.append(stack.pop())
            stack.push(token)

    while stack not empty:
        output.append(stack.pop())

    // Step 4: Reverse the output
    prefix = reverse(output)
    return prefix`}
                </pre>
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                This pseudocode captures the entire algorithm in a concise form.
              </p>
            </div>
          </section>

          {/* STEP-BY-STEP BREAKDOWN */}
          <section className="animate-fadeUp delay-300">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
                Detailed Breakdown of Steps
              </h2>
              <div className="mt-4 space-y-5">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 1: Reverse the Infix Expression</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Convert the infix string to its reverse. This prepares the expression for right‑to‑left scanning.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Example: <code>A+B*C</code> → <code>C*B+A</code>
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 2: Swap Parentheses</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    In the reversed string, replace every <code>'('</code> with <code>')'</code> and vice versa.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Example: <code>(A+B)*C</code> → reversed <code>C*(B+A)</code> → swapped <code>C*(B+A)</code> (no change here, but in complex cases it matters).
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 3: Apply Modified Postfix Conversion</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Scan the swapped expression from left to right, using a stack. The rules are:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                    <li><strong>Operand:</strong> Append to output.</li>
                    <li><strong>Left parenthesis <code>'('</code>:</strong> Push onto stack.</li>
                    <li><strong>Right parenthesis <code>')'</code>:</strong> Pop and output until <code>'('</code> is found; discard <code>'('</code>.</li>
                    <li><strong>Operator:</strong> While stack is not empty, top is not <code>'('</code>, and top has <strong>higher</strong> precedence than the current operator, pop and output. Then push the current operator.</li>
                  </ul>
                  <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      ⚠️ <span className="font-medium">Important:</span> Do <em>not</em> pop operators of equal precedence. This is the key difference from postfix conversion.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 4: Reverse the Output</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    The output from Step 3 is the reverse of the correct prefix expression. Reverse it to get the final prefix.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Example: if output is <code>AB+</code>, reversing gives <code>+AB</code>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* REAL‑WORLD USAGE */}
          <section className="animate-fadeUp delay-400">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
                Real‑World Usage
              </h2>
              <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Compiler design</strong> – for converting arithmetic expressions to intermediate representations.</li>
                <li><strong>Expression evaluators</strong> – prefix notation is sometimes used internally for evaluation.</li>
                <li><strong>Lisp interpreters</strong> – Lisp uses prefix notation, so the algorithm is relevant for parsing.</li>
                <li><strong>Functional programming languages</strong> – many functional languages use prefix for function application.</li>
              </ul>
              <div className="mt-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                <p className="text-sm">
                  <span className="font-medium">🏫 Classroom story:</span> Susmita from Naihati noticed that her Lisp code
                  looked like prefix – she was surprised to learn that the compiler internally converts it.
                </p>
              </div>
            </div>
          </section>

          {/* TIPS & TRICKS */}
          <section className="animate-fadeUp delay-100">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
                💡 Tips &amp; Tricks
              </h2>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Pre‑compute precedence in a map for cleaner code.</li>
                <li>Use a <code>StringBuilder</code> for the output.</li>
                <li>Test with expressions containing <code>^</code> to verify right‑associativity.</li>
                <li>Implement helper functions for reversing and swapping.</li>
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
              <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Forgetting to reverse the expression initially.</li>
                <li>Not swapping parentheses.</li>
                <li>Using postfix associativity (popping equal precedence).</li>
                <li>Forgetting the final reverse.</li>
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
              <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Write the algorithm as a reusable function.</li>
                <li>Add comprehensive unit tests.</li>
                <li>Use clear variable names.</li>
                <li>Include comments explaining each step.</li>
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
                  "I can explain the 4 steps of the algorithm.",
                  "I understand why we reverse and swap.",
                  "I know that equal precedence is NOT popped.",
                  "I can trace the algorithm on a simple expression.",
                  "I can implement the algorithm in Java.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-indigo-500 text-xl">☐</span>
                    <span className="text-sm">{item}</span>
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
              <ul className="mt-4 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Why do we need to reverse the expression?</li>
                <li>What would happen if we didn't swap parentheses?</li>
                <li>How does the algorithm handle right‑associative operators?</li>
                <li>Try tracing <code>A+B*C</code> through the algorithm manually.</li>
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
                  fileModule={infixToPrefixAlgorithmJava}
                  title="InfixToPrefixAlgorithm.java"
                  highlightLines={[]}
                />
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                This program implements the algorithm with helper functions and a trace option.
              </p>
            </div>
          </section>

          {/* TEACHER’S NOTE */}
          <div className="animate-fadeUp delay-200">
            <Teacher
              note={
                "I tell my students in Barrackpore: 'The algorithm is a recipe – follow the steps and you'll always get the right prefix.' Emphasise the difference in associativity handling. Use the interactive tool from Topic15 to visualise the stack changes. Practice with expressions that include exponentiation to see the right‑associativity in action."
              }
            />
          </div>

          {/* FAQ */}
          <div className="animate-fadeUp delay-300">
            <FAQTemplate
              title="Algorithm for Infix to Prefix – FAQs"
              questions={questions}
            />
          </div>

          {/* FOOTER */}
          <footer className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2026 • Expression Conversion Course • Barrackpore, India</p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}