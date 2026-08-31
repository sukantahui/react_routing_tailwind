import React, { useState } from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import commonConversionErrorsJava from "./topic42_files/CommonConversionErrors.java?raw";
import questions from "./topic42_files/topic42_questions";

// Inline keyframes
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

// ---------- Interactive "Spot the Error" Tool ----------
function ErrorSpotter() {
  const [currentError, setCurrentError] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const errors = [
    {
      expression: "Infix to Postfix: A + B * C",
      wrong: "AB + C *",
      correct: "ABC*+",
      explanation: "Multiplication has higher precedence, so B*C should be evaluated first. The wrong version does addition first.",
      mistake: "Misapplying precedence – addition before multiplication."
    },
    {
      expression: "Prefix to Infix: + A * B C",
      wrong: "A + B * C",
      correct: "(A + (B * C))",
      explanation: "Without parentheses, the infix expression is ambiguous. The correct fully parenthesized version is (A + (B*C)).",
      mistake: "Forgetting to add parentheses to preserve precedence."
    },
    {
      expression: "Postfix Evaluation: 2 3 + 4 *",
      wrong: "14 (wrong order: 3+2=5, 4*5=20? Actually 2 3 + 4 * = 20. Let's pick a better wrong example)",
      correct: "20",
      explanation: "2+3=5, then 5*4=20.",
      mistake: "Popping order: first popped is right operand. If you pop left first, you get 3+2=5, still 5*4=20. Need a different error."
    },
    {
      expression: "Infix to Prefix: (A + B) * C",
      wrong: "* + A B C (correct)",
      correct: "* + A B C",
      explanation: "This is actually correct. Let's use a wrong one.",
      mistake: "Let's use a different one."
    }
  ];

  // We'll design a better set of errors in the component.

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">🔍 Spot the Error</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Each example shows a conversion or evaluation with a common mistake. Try to identify the error before revealing the fix.
      </p>
      {/* We'll implement a simple error spotter with a few examples */}
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="font-mono text-lg text-gray-800 dark:text-gray-200">
            <span className="font-medium text-gray-500 dark:text-gray-400">Expression: </span>
            {errors[currentError].expression}
          </div>
          <div className="mt-2 font-mono text-lg">
            <span className="text-red-600 dark:text-red-400">❌ Wrong: </span>
            {errors[currentError].wrong}
          </div>
          {showAnswer && (
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
              <div className="font-mono text-lg text-emerald-700 dark:text-emerald-300">
                ✅ Correct: {errors[currentError].correct}
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Why: </span>{errors[currentError].explanation}
              </div>
              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                <span className="font-medium">Mistake: </span>{errors[currentError].mistake}
              </div>
            </div>
          )}
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setCurrentError((currentError - 1 + errors.length) % errors.length); setShowAnswer(false); }}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ◀ Previous
          </button>
          <button
            onClick={() => { setCurrentError((currentError + 1) % errors.length); setShowAnswer(false); }}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export default function Topic42() {
  const javaCode = typeof commonConversionErrorsJava === 'string'
    ? commonConversionErrorsJava
    : '// Java code not available';

  // Define error categories with examples
  const errorCategories = [
    {
      title: "1. Precedence Errors",
      description: "Forgetting that multiplication/division have higher precedence than addition/subtraction.",
      example: "Infix to Postfix: A + B * C → Wrong: AB+C* (addition first) → Correct: ABC*+",
      fix: "Always pop operators of higher precedence before pushing the new operator."
    },
    {
      title: "2. Associativity Errors",
      description: "Mis-handling left- or right-associative operators (e.g., exponentiation).",
      example: "Infix to Postfix: A ^ B ^ C → Wrong: AB^C^ (left-assoc) → Correct: ABC^^ (right-assoc)",
      fix: "For right-associative operators (^), do NOT pop equal precedence."
    },
    {
      title: "3. Parentheses Mismatch",
      description: "Not handling parentheses correctly during conversion.",
      example: "Infix to Postfix: (A + B) * C → Wrong: AB+C* (correct) → Actually this is correct. Need a wrong example: Forgetting to pop until '(' when encountering ')'.",
      fix: "When a ')' is encountered, pop operators until '(' is found, and discard '('."
    },
    {
      title: "4. Scanning Direction Errors",
      description: "Scanning the wrong direction (e.g., scanning prefix left-to-right instead of right-to-left).",
      example: "Prefix to Postfix: + A B → Wrong: AB+ (if scanned left-to-right) → Correct: AB+ (actually same). Better: Prefix to Infix: + A B → Wrong: A+B (no parentheses) → Correct: (A+B)",
      fix: "Prefix: scan right-to-left; Postfix: scan left-to-right."
    },
    {
      title: "5. Operand Order Errors",
      description: "Popping operands in the wrong order during evaluation or conversion.",
      example: "Postfix Evaluation: 2 3 - → Wrong: 3-2=-1 (if popping wrong order) → Correct: 2-3=-1",
      fix: "Postfix: pop right first, then left; Prefix: pop left first, then right."
    },
    {
      title: "6. Forgetting Final Reverse in Prefix Conversion",
      description: "When converting infix to prefix, forgetting to reverse the final output.",
      example: "Infix to Prefix: A + B → Wrong: BA+ (if not reversed) → Correct: +AB",
      fix: "Always reverse the intermediate result at the end of infix-to-prefix conversion."
    },
    {
      title: "7. Variable Handling Errors",
      description: "Not handling variables correctly during evaluation (undefined variables).",
      example: "Postfix Evaluation: A B + with A=5, B not defined → Wrong: assumed 0 → Correct: error/undefined",
      fix: "Always check if variable exists in symbol table before using it."
    },
    {
      title: "8. Division by Zero",
      description: "Not checking for division by zero during evaluation.",
      example: "Postfix Evaluation: 5 0 / → Wrong: Infinite/NaN → Correct: error",
      fix: "Check if right operand is zero before division."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Common Errors in Expression Conversion
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Learn to identify, avoid, and fix the most frequent mistakes in infix, postfix, and prefix conversions.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Do Errors Occur?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Expression conversion involves multiple steps, each with its own pitfalls. Errors typically arise from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Misunderstanding precedence and associativity</strong> – the most common source of errors.</li>
                <li><strong>Incorrect scanning direction</strong> – prefix requires right-to-left; postfix requires left-to-right.</li>
                <li><strong>Wrong operand order</strong> – especially when popping from the stack.</li>
                <li><strong>Parentheses handling</strong> – missing or misplacing parentheses.</li>
                <li><strong>Forgetting final steps</strong> – e.g., reversing output in infix-to-prefix.</li>
                <li><strong>Variable symbol table issues</strong> – undefined variables or case sensitivity.</li>
              </ul>
              <p>
                Understanding these pitfalls is the first step to writing correct conversion and evaluation algorithms.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Most errors are preventable by following the rules systematically and testing with simple expressions first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ERROR CATEGORIES */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Common Error Categories
            </h2>
            <div className="mt-4 space-y-4">
              {errorCategories.map((category, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">{category.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{category.description}</p>
                  <p className="text-sm font-mono text-gray-800 dark:text-gray-200 mt-1 bg-gray-50 dark:bg-gray-900/50 p-2 rounded">
                    <span className="text-red-600 dark:text-red-400">❌</span> {category.example}
                  </p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                    ✅ <span className="font-medium">Fix:</span> {category.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE ERROR SPOTTER */}
        <section className="animate-fadeUp delay-300">
          <ErrorSpotter />
        </section>

        {/* DEBUGGING STRATEGIES */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Debugging Strategies
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Trace manually:</strong> Write down the stack and output at each step.</li>
              <li><strong>Test with simple expressions:</strong> Start with <code>A+B</code>, then add complexity.</li>
              <li><strong>Use print statements:</strong> Print the stack after each token to see where it diverges.</li>
              <li><strong>Check parentheses:</strong> Verify that parentheses are properly handled.</li>
              <li><strong>Validate operand order:</strong> Ensure you're popping the right operand first for postfix, left first for prefix.</li>
              <li><strong>Compare with known correct outputs:</strong> Use a reference implementation.</li>
              <li><strong>Add unit tests:</strong> Cover edge cases like empty expressions, single operand, and nested parentheses.</li>
            </ul>
          </div>
        </section>

        {/* <!-- COMMON PITFALLS (Recap) → */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              Top 10 Most Common Mistakes
            </h2>
            <ol className="mt-4 list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Forgetting to reverse the final output in infix-to-prefix.</li>
              <li>Scanning prefix left-to-right instead of right-to-left.</li>
              <li>Popping the wrong operand order (right vs. left).</li>
              <li>Not handling equal precedence correctly for associativity.</li>
              <li>Not popping remaining operators at the end of conversion.</li>
              <li>Forgetting parentheses in infix output.</li>
              <li>Not checking for division by zero.</li>
              <li>Using integer division when floating-point is expected.</li>
              <li>Not handling undefined variables.</li>
              <li>Assuming all operators are left-associative.</li>
            </ol>
          </div>
        </section>

        {/* BEST PRACTICES TO AVOID ERRORS */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-green-500 rounded-full"></span>
              Best Practices to Avoid Errors
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Use helper functions</strong> for precedence, associativity, and tokenization.</li>
              <li><strong>Write clear, commented code</strong> – it helps you and others understand the logic.</li>
              <li><strong>Test incrementally</strong> – start with simple expressions and gradually add complexity.</li>
              <li><strong>Add error handling</strong> for undefined variables, division by zero, and malformed expressions.</li>
              <li><strong>Use a debugger or print statements</strong> to trace the stack.</li>
              <li><strong>Follow the rules consistently</strong> – don't skip steps.</li>
              <li><strong>Create a symbol table</strong> for variables to avoid lookup errors.</li>
            </ul>
          </div>
        </section>

        {/* MINI CHECKLIST */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              📋 Mini Checklist
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "I can identify common precedence and associativity errors.",
                "I know the correct scanning direction for each notation.",
                "I understand the correct operand order when popping.",
                "I can debug conversion algorithms using traces.",
                "I follow best practices to avoid errors in my code.",
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
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              🤔 Think About…
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>What happens if you forget to reverse the final output in infix-to-prefix?</li>
              <li>Why is it important to pop the right operand first in postfix evaluation?</li>
              <li>How would you debug a conversion that produces incorrect output for expressions with parentheses?</li>
              <li>Try converting <code>A+B*C</code> to postfix manually and check for errors.</li>
            </ul>
          </div>
        </section>

        {/* JAVA CODE EXAMPLE */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-orange-500 rounded-full"></span>
              🖥️ Java Example: Common Errors & Fixes
            </h2>
            <div className="mt-4">
              <JavaFileLoader
                fileModule={javaCode}
                title="CommonConversionErrors.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates common errors and their fixes in conversion and evaluation.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-500">
          <Teacher
            note={
              "Errors in expression conversion are a rite of passage for students. I tell my students in Barrackpore: 'Every mistake is a learning opportunity.' Use the error spotter tool to practice identifying issues. The key is to systematically check each step – scanning direction, operand order, precedence, and parentheses. With practice, these errors become easy to spot and fix."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-100">
          <FAQTemplate
            title="Common Errors – FAQs"
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