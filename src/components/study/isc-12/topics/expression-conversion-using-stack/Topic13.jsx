import React, { useState } from "react";
import clsx from "clsx";

// Custom components from common
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import stepByStepExampleJava from "./topic13_files/StepByStepExample.java?raw";
import questions from "./topic13_files/topic13_questions";

// Inline keyframes
const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
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

// ---------- Error Boundary ----------
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Something went wrong</h3>
          <p className="text-sm text-red-600 dark:text-red-300 mt-1">
            Please try re‑entering your expression or refreshing the page.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------- Infix‑to‑Postfix Tracer (Enhanced Info) ----------
function InfixToPostfixTracer() {
  const expressions = [
    "A+B/C*D/E+F^J*K-J-L+P",
    "A+B*C^D^E/F-G+H",
    "A*(B+C^D)-E/F+G",
    "(A+B)*(C+D)/(E-F)",
    "A+B/C*D-E^F^G+H",
    "A*B+C*(D-E/F)+G",
    "((A+B)-C)*(D+E/F)",
    "A+B*(C-D/E^F)+G",
    "(A+B*C)-(D/E-F)*G",
    "A^B+C*D/E-F+G*H",
    "A*(B+C)-D/E+F^G*H-I",
    "A+B*C-D/E*C+B",
    "A*(B+C)-D/E",
    "(A+B)*C-D",
    "A+B*C/D%E^F^G-H+I",
    "A+B*C^D-E/F",
    "A*B+C/D-E+F",
    "(A+B)*(C-D)+E/F",
    "A^B^C+D*E-F",
    "A+B-C*D/E",
    "A*B-(C+D)/E+F",
    "A+B*C/D%E-F+G",
    "A+B/C*D%E-F*G+H",
    "A*B+C/D%E^F-G",
    "A+B*C^D/E%F-G+H",
    "A+B/C*D-E/F+G",
    "A*B/C+D%E^F-G",
    "A+B*C/D%E^F-G*H+I",
    "A+B/C*D%E^F^G-H+I",
    "A*B+C*D/E%F-G+H",
    "A+B*C-D/E*F+G-H",
    "A+B/C*D/E+F^G*H-I-J+K",
    "A*B/C%D+E^F-G",
    "A+B*C/D-E%F^G+H",
    "A+B/C%D*E-F+G",
    "A*B+C/D*E%F-G+H",
    "A+B*C/D%E-F*G-H+I",
    "A+B/C*D%E^F*G-H",
    "A*B/C+D*E/F-G+H",
    "A+B*C%D/E^F-G",
    "A*B+C/D%E-F+G-H",
    "A+B*C/D%E^F^G*H-I",
    "A+B/C*D%E-F+G*H-I",
    "A*B/C%D^E-F+G",
    "A+B*C^D%E/F-G",
    "A+B/C*D-E%F*G+H",
    "A*B+C/D%E^F*G-H+I",
    "A+B*C/D%E-F^G*H-I",
    "A*B/C+D%E/F-G*H+I",
    "A+B/C*D%E^F-G+H-I",
    "A*B+C/D*E%F^G-H+I"
  ];

  const [exprIndex, setExprIndex] = useState(0);
  const [expr, setExpr] = useState(expressions[0]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTraced, setIsTraced] = useState(false);
  const [error, setError] = useState("");
  const [popupStepIndex, setPopupStepIndex] = useState(null);

  // ----- helpers -----
  const isOperand = (ch) => /^[A-Za-z0-9]$/.test(ch);
  const getPrecedence = (op) => {
    if (op === '^') return 3;
    if (op === '*' || op === '/') return 2;
    if (op === '+' || op === '-') return 1;
    return 0;
  };
  const isLeftAssoc = (op) => op !== '^';
  const getPrecedenceLabel = (op) => {
    const p = getPrecedence(op);
    return `${p}${op === '^' ? ' (highest)' : ''}`;
  };
  const getAssocLabel = (op) => op === '^' ? 'right‑associative' : 'left‑associative';

  // ----- conversion with step recording and enhanced descriptions -----
  const convert = (infix) => {
    const tokens = infix.match(/([A-Za-z0-9]+|[+\-*/^()])/g);
    if (!tokens) {
      setError("Invalid expression. Use letters, numbers, +, -, *, /, ^, (, ).");
      return [];
    }

    const stack = [];
    const output = [];
    const steps = [];
    let stepNum = 0;

    const recordStep = (token, action, beforeStack) => {
      let description = '';
      if (isOperand(token)) {
        description = `Operand "${token}" is immediately appended to the output. It never goes on the stack.`;
      } else if (token === '(') {
        description = `'(' is pushed onto the stack. It marks the start of a sub‑expression.`;
      } else if (token === ')') {
        if (action && action.includes('Pop')) {
          description = `')' causes all operators on the stack up to '(' to be popped and appended to the output. The '(' is then discarded. This ensures the parenthesized part is evaluated first.`;
        } else {
          description = `')' encountered but no operators to pop. The '(' is discarded (empty parentheses).`;
        }
      } else if (token === '(end)') {
        description = `End of expression: remaining operators on the stack are popped and appended to the output in LIFO order.`;
      } else {
        // operator
        const poppedMatches = action.match(/Pop (.+?) →/);
        if (poppedMatches) {
          // Determine reason based on beforeStack (the stack before the operation)
          const topBefore = beforeStack.length > 0 ? beforeStack[beforeStack.length - 1] : 'none';
          const precToken = getPrecedence(token);
          let reason = '';
          if (topBefore !== 'none' && topBefore !== '(') {
            const precTop = getPrecedence(topBefore);
            if (precTop > precToken) {
              reason = `Top of stack "${topBefore}" has higher precedence (${precTop} > ${precToken}), so it is popped.`;
            } else if (precTop === precToken && isLeftAssoc(token)) {
              reason = `Top of stack "${topBefore}" has equal precedence (${precTop} = ${precToken}) and "${token}" is left‑associative, so it is popped to maintain left‑to‑right evaluation.`;
            } else {
              reason = `Top of stack "${topBefore}" does not need to be popped (lower precedence or right‑associative).`;
            }
          } else {
            reason = `No operator on stack to pop.`;
          }
          description = `Operator '${token}' is about to be pushed. ${reason} Then '${token}' is pushed.`;
        } else {
          // pure push (no pop)
          description = `Operator '${token}' is pushed onto the stack. (Precedence: ${getPrecedenceLabel(token)}, ${getAssocLabel(token)})`;
        }
      }

      steps.push({
        step: ++stepNum,
        token: token,
        action: action,
        stack: [...stack], // after modification
        output: output.join(''),
        description: description,
        beforeStack: beforeStack ? [...beforeStack] : [],
      });
    };

    for (let token of tokens) {
      const beforeStack = [...stack];
      let action = "";

      if (isOperand(token)) {
        output.push(token);
        action = `Operand → output`;
        recordStep(token, action, beforeStack);
      } else if (token === '(') {
        stack.push(token);
        action = `Push '('`;
        recordStep(token, action, beforeStack);
      } else if (token === ')') {
        let pops = [];
        while (stack.length && stack[stack.length - 1] !== '(') {
          const op = stack.pop();
          output.push(op);
          pops.push(op);
        }
        if (stack.length && stack[stack.length - 1] === '(') {
          stack.pop();
        } else {
          setError("Mismatched parentheses.");
          return [];
        }
        if (pops.length) {
          action = `Pop ${pops.join(', ')} → output, discard '('`;
        } else {
          action = `Discard '(' (empty parentheses)`;
        }
        recordStep(token, action, beforeStack);
      } else {
        // operator
        let popped = [];
        while (
          stack.length &&
          stack[stack.length - 1] !== '(' &&
          (getPrecedence(stack[stack.length - 1]) > getPrecedence(token) ||
            (getPrecedence(stack[stack.length - 1]) === getPrecedence(token) &&
              isLeftAssoc(token)))
        ) {
          const op = stack.pop();
          output.push(op);
          popped.push(op);
        }
        stack.push(token);
        if (popped.length) {
          action = `Pop ${popped.join(', ')} → output, push ${token}`;
        } else {
          action = `Push ${token}`;
        }
        recordStep(token, action, beforeStack);
      }
    }

    while (stack.length) {
      const beforeStack = [...stack];
      const op = stack.pop();
      output.push(op);
      recordStep('(end)', `Pop ${op} → output`, beforeStack);
    }

    return steps;
  };

  // ----- handlers -----
  const handleConvert = () => {
    setError("");
    const result = convert(expr);
    if (result.length === 0 && !error) {
      setError("No steps generated. Check your expression.");
    }
    setSteps(result);
    setCurrentStep(0);
    setIsTraced(result.length > 0);
    setPopupStepIndex(null);
  };

  const handleNextExample = () => {
    const nextIndex = (exprIndex + 1) % expressions.length;
    setExprIndex(nextIndex);
    setExpr(expressions[nextIndex]);
    setSteps([]);
    setCurrentStep(0);
    setIsTraced(false);
    setError("");
    setPopupStepIndex(null);
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // keyboard support
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') setPopupStepIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, steps]);

  // ----- render -----
  return (
    <ErrorBoundary>
      <div className="space-y-4">
        {/* input row */}
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="infixInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Infix Expression
            </label>
            <input
              id="infixInput"
              type="text"
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              placeholder="e.g., A*B/D-C+E"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleConvert}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              Convert
            </button>
            <button
              onClick={handleNextExample}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
            >
              Next Example →
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {isTraced && steps.length > 0 && (
          <>
            {/* navigation */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  disabled={currentStep === 0}
                  className={clsx(
                    "p-2 rounded-lg border transition",
                    currentStep === 0
                      ? "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                >
                  ←
                </button>
                <button
                  onClick={goNext}
                  disabled={currentStep === steps.length - 1}
                  className={clsx(
                    "p-2 rounded-lg border transition",
                    currentStep === steps.length - 1
                      ? "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                >
                  →
                </button>
              </div>
            </div>

            {/* table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left w-12">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left w-10">Info</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  {steps.map((step, idx) => {
                    const isCurrent = idx === currentStep;
                    return (
                      <tr
                        key={idx}
                        className={clsx(
                          "transition-colors duration-150",
                          isCurrent
                            ? "bg-indigo-50 dark:bg-indigo-900/30"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        )}
                      >
                        <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">
                          {step.step}
                        </td>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono">
                          {step.token}
                        </td>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 text-sm">
                          {step.action}
                        </td>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono">
                          [ {step.stack.join(' , ')} ]
                        </td>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 font-mono">
                          {step.output || ' '}
                        </td>
                        <td className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                          <button
                            onClick={() => setPopupStepIndex(idx)}
                            className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
                            aria-label="Show detailed explanation"
                            title="Click for detailed explanation"
                          >
                            ℹ️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* final postfix result */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Final postfix:{" "}
                <strong className="text-indigo-600 dark:text-indigo-400">
                  {steps.length > 0 ? steps[steps.length - 1].output : ""}
                </strong>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Use ◄ ► buttons or keyboard arrow keys to navigate steps. Click ℹ️ for detailed explanation.
              </p>
            </div>
          </>
        )}

        {/* popup modal – enhanced */}
        {popupStepIndex !== null && steps[popupStepIndex] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setPopupStepIndex(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Step {steps[popupStepIndex].step} – {steps[popupStepIndex].token}
                </h3>
                <button
                  onClick={() => setPopupStepIndex(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                  aria-label="Close popup"
                >
                  ✕
                </button>
              </div>
              <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Action:</strong> {steps[popupStepIndex].action}</p>
                <p><strong>Stack before:</strong> [ {steps[popupStepIndex].beforeStack?.join(' , ') || ''} ]</p>
                <p><strong>Stack after:</strong> [ {steps[popupStepIndex].stack.join(' , ')} ]</p>
                <p><strong>Output:</strong> {steps[popupStepIndex].output || ' '}</p>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200 font-medium">💡 Detailed Explanation</p>
                  <div className="mt-1 leading-relaxed whitespace-pre-line">
                    {steps[popupStepIndex].description}
                  </div>
                  {/* Extra operator info if applicable */}
                  {steps[popupStepIndex].token !== '(' &&
                    steps[popupStepIndex].token !== ')' &&
                    steps[popupStepIndex].token !== '(end)' &&
                    !isOperand(steps[popupStepIndex].token) && (
                      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        <span className="font-medium">Operator info:</span> Precedence = {getPrecedenceLabel(steps[popupStepIndex].token)}, Associativity = {getAssocLabel(steps[popupStepIndex].token)}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

// ---------- Main Topic13 Component ----------
export default function Topic13() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Step‑by‑Step Examples
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Trace the algorithm in action with detailed examples.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Step‑by‑Step Traces Matter
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Tracing the infix‑to‑postfix algorithm step by step is the best way to understand how the stack
                works and why the rules are applied. By manually walking through each token, you can see how
                operands are output immediately, how operators wait on the stack, and how parentheses control
                the flow.
              </p>
              <p>
                Below, we'll work through several examples, and you can also try your own expression with the
                interactive tracer.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Example 1:</strong> <code>A + B</code> – Simple case.</li>
                <li><strong>Example 2:</strong> <code>A + B * C</code> – With precedence.</li>
                <li><strong>Example 3:</strong> <code>(A + B) * C</code> – With parentheses.</li>
                <li><strong>Example 4:</strong> <code>A * B + C * D</code> – Multiple operators.</li>
              </ul>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Each trace follows the same rules – operands
                  to output, operators to stack, and parentheses handled accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- INTERACTIVE TRACER ---- */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              🧪 Interactive Step‑by‑Step Tracer
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
              Enter any infix expression and step through the conversion with the arrow buttons.
            </p>
            <div className="mt-6">
              <InfixToPostfixTracer />
            </div>
          </div>
        </section>

        {/* ---- All static examples (unchanged) ---- */}
        {/* EXAMPLE 1: A + B */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Example 1: <code>A + B</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operator → push</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop all</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">AB+</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 2: A + B * C */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example 2: <code>A + B * C</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operator → push</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">* &gt; +, push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * → output, pop + → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC*+</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 3: (A + B) * C */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Example 3: <code>(A + B) * C</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">{`(`}</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push '('</td><td className="p-3 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-3 border border-gray-200 dark:border-gray-700"></td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">{`Pop until '(' → output +, discard '('`}</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">{`(end)`}</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+C*</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">AB+C*</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 4: A*B + C*D */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Example 4: <code>A * B + C * D</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (higher), then push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">* &gt; +, push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*CD</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * → output, pop + → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*CD*+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">AB*CD*+</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 5: A + B * C - D */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example 5: <code>A + B * C - D</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">* &gt; +, push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (higher), pop + (equal, left‑assoc), push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+D</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+D-</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">🔍 Observation:</span> The subtraction pops both <code>*</code> and <code>+</code>
                because <code>*</code> has higher precedence, and <code>+</code> has equal precedence but is left‑associative.
                The result is <code>A + (B*C) - D</code>, which matches the infix precedence.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC*+D-</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 6: A * (B + C) - D / E */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Example 6: <code>A * (B + C) - D / E</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (higher), push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+*</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">9</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+*D</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">10</td><td className="p-3 border border-gray-200 dark:border-gray-700">/</td><td className="p-3 border border-gray-200 dark:border-gray-700">/ &gt; -, push /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+*D</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">11</td><td className="p-3 border border-gray-200 dark:border-gray-700">E</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+*DE</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">12</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop /, pop -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+*DE/-</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">🔍 Observation:</span> The parentheses force <code>B+C</code> to be computed first.
                The <code>*</code> is applied to <code>A</code> and the result of <code>B+C</code>, then <code>D/E</code> is computed,
                and finally subtraction. The postfix order matches the expression: <code>A * (B+C) - (D/E)</code>.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC+*DE/-</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 7: (A + B) * (C - D) + E / F */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Example 7: <code>(A + B) * (C - D) + E / F</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-3 border border-gray-200 dark:border-gray-700"></td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">9</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( -]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">10</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( -]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">11</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop -, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">12</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (higher), push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">13</td><td className="p-3 border border-gray-200 dark:border-gray-700">E</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*E</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">14</td><td className="p-3 border border-gray-200 dark:border-gray-700">/</td><td className="p-3 border border-gray-200 dark:border-gray-700">/ &gt; +, push /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*E</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">15</td><td className="p-3 border border-gray-200 dark:border-gray-700">F</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*EF</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">16</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop /, pop +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*EF/+</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">🔍 Observation:</span> This expression involves two separate parenthesized
                sub‑expressions, multiplication, and division. The algorithm correctly outputs <code>AB+</code> (for
                <code>A+B</code>), then <code>CD-</code> (for <code>C-D</code>), then <code>*</code> (multiplication),
                then <code>EF/</code> (for <code>E/F</code>), and finally <code>+</code> (addition). The result matches
                the infix order.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">AB+CD-*EF/+</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 8: A ^ B ^ C (Right-Associative) */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Example 8: <code>A ^ B ^ C</code> (Right‑Associative)
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">^</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push ^</td><td className="p-3 border border-gray-200 dark:border-gray-700">[^]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[^]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">^</td><td className="p-3 border border-gray-200 dark:border-gray-700">^ is right‑assoc, so DO NOT pop equal; push ^</td><td className="p-3 border border-gray-200 dark:border-gray-700">[^ ^]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[^ ^]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop ^, pop ^</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC^^</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">🔍 Observation:</span> Because <code>^</code> is right‑associative, when we
                encounter the second <code>^</code>, we do <strong>not</strong> pop the first <code>^</code> even though
                they have equal precedence. This yields <code>A^(B^C)</code>, which is correct for exponentiation.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC^^</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 9: (A + B) * (C - D) / (E + F) */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              Example 9: <code>(A + B) * (C - D) / (E + F)</code>
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-3 border border-gray-200 dark:border-gray-700"></td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">9</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( -]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">10</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( -]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">11</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop -, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">12</td><td className="p-3 border border-gray-200 dark:border-gray-700">/</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (equal, left‑assoc), push /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">13</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/ (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">14</td><td className="p-3 border border-gray-200 dark:border-gray-700">E</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/ (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*E</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">15</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/ ( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*E</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">16</td><td className="p-3 border border-gray-200 dark:border-gray-700">F</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/ ( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*EF</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">17</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*EF+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">18</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*EF+/</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">🔍 Observation:</span> This expression combines multiple parentheses,
                multiplication, and division. The division <code>/</code> has the same precedence as multiplication
                and is left‑associative, so when we encounter <code>/</code> at step 12, we pop the <code>*</code>
                because they have equal precedence. The result correctly reflects <code>(A+B)*(C-D)/(E+F)</code>.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">AB+CD-*EF+/</strong>
            </p>
          </div>
        </section>

        {/* ================================ Special EXAMPLES ================================ */}
        <h1 className="text-3xl font-bold mt-12">Special Examples Where Beginners Make Mistakes</h1>

        {/* EXAMPLE 1: A + B * C - D */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example 1: <code>A + B * C - D</code>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Forgetting that <code>*</code> binds tighter than <code>+</code> and <code>-</code>.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">* &gt; +, push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (higher), pop + (equal), push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+D</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+D-</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The algorithm correctly outputs <code>ABC*+D-</code>,
                which represents <code>A + (B*C) - D</code>. The <code>-</code> pops both <code>*</code> and <code>+</code>
                because they have higher/equal precedence.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Experts sometimes think <code>A + B * C - D</code> is evaluated as
                <code>(A+B)*(C-D)</code> – but that's wrong. Always respect precedence.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC*+D-</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 2: A * B + C / D */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Example 2: <code>A * B + C / D</code>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Assuming <code>*</code> and <code>/</code> are evaluated left‑to‑right across the entire expression.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (higher), push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">/</td><td className="p-3 border border-gray-200 dark:border-gray-700">/ &gt; +, push /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*CD</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop /, pop +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB*CD/+</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The result is <code>(A*B) + (C/D)</code> because
                <code>*</code> and <code>/</code> have higher precedence than <code>+</code>. They are independent sub‑expressions.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Some experts think <code>A*B+C/D</code> should be evaluated as
                <code>(A*B+C)/D</code> due to left‑to‑right reading – but precedence rules say otherwise.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">AB*CD/+</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 3: A - B + C */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Example 3: <code>A - B + C</code>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Misunderstanding left‑associativity of <code>-</code> and <code>+</code>.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop - (equal), push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB-</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB-C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB-C+</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Because <code>-</code> and <code>+</code> have equal
                precedence and are left‑associative, <code>A - B + C</code> becomes <code>(A - B) + C</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Experts sometimes think <code>A - B + C</code> is <code>A - (B + C)</code>,
                but that would require parentheses. Left‑associativity means we do subtraction first, then addition.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">AB-C+</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 4: A / B * C */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Example 4: <code>A / B * C</code>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Forgetting that <code>/</code> and <code>*</code> are left‑associative, not right‑associative.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">/</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop / (equal), push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB/</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB/C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB/C*</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Left‑associativity gives <code>(A/B)*C</code>, not
                <code>A/(B*C)</code>. The <code>/</code> is popped before <code>*</code> is pushed.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Some experts treat <code>/</code> and <code>*</code> as right‑associative,
                leading to <code>A/(B*C)</code> – which is wrong.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">AB/C*</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 5: A ^ B ^ C (Right-Associative) */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              Example 5: <code>A ^ B ^ C</code> (Right‑Associative)
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Treating <code>^</code> as left‑associative like other operators.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">^</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push ^</td><td className="p-3 border border-gray-200 dark:border-gray-700">[^]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[^]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">^</td><td className="p-3 border border-gray-200 dark:border-gray-700">^ is right‑assoc → DO NOT pop equal; push ^</td><td className="p-3 border border-gray-200 dark:border-gray-700">[^ ^]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[^ ^]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop ^, pop ^</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC^^</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Because <code>^</code> is right‑associative, we do
                <strong>not</strong> pop the first <code>^</code> when the second appears. The result is <code>A^(B^C)</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Experts often assume all operators are left‑associative and produce
                <code>(A^B)^C</code>, which is mathematically different.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC^^</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 6: A - (B + C) */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example 6: <code>A - (B + C)</code>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Forgetting that parentheses override everything.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- ( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- ( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+-</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> Parentheses force <code>B+C</code> to be computed
                first, then subtracted from <code>A</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Experts sometimes forget parentheses and write <code>A - B + C</code>
                thinking it's the same – but it's not.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC+-</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 7: A * (B + C) / D */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Example 7: <code>A * (B + C) / D</code>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Misplacing the division due to precedence.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">/</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (equal, left‑assoc), push /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+*</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">9</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[/]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+*D</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">10</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC+*D/</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The result is <code>((A * (B+C)) / D)</code>. The
                division has the same precedence as multiplication, so <code>*</code> is popped before <code>/</code> is pushed.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Experts sometimes think <code>A * (B+C) / D</code> is <code>A * ((B+C)/D)</code>,
                but left‑associativity gives <code>(A*(B+C))/D</code>.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC+*D/</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 8: A + B * C - D / E */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Example 8: <code>A + B * C - D / E</code>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Overlooking the precedence of <code>*</code> and <code>/</code> relative to <code>+</code> and <code>-</code>.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">* &gt; +, push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (higher), pop + (equal), push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+D</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">/</td><td className="p-3 border border-gray-200 dark:border-gray-700">/ &gt; -, push /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+D</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">9</td><td className="p-3 border border-gray-200 dark:border-gray-700">E</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+DE</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">10</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop /, pop -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+DE/-</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The result is <code>A + (B*C) - (D/E)</code>. The
                <code>-</code> pops <code>*</code> and <code>+</code> before <code>/</code> is pushed, then <code>/</code>
                is popped at the end.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Experts might think <code>A + B*C - D/E</code> is evaluated as
                <code>(A+B*C-D)/E</code> – but that's incorrect due to precedence.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC*+DE/-</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 9: (A + B) * (C - D) + E / F */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Example 9: <code>(A + B) * (C - D) + E / F</code>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Misplacing the addition due to precedence.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-3 border border-gray-200 dark:border-gray-700"></td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[(]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[( +]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">(</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">9</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( -]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+C</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">10</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[* ( -]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">11</td><td className="p-3 border border-gray-200 dark:border-gray-700">)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop -, discard (</td><td className="p-3 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">12</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (higher), push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">13</td><td className="p-3 border border-gray-200 dark:border-gray-700">E</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*E</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">14</td><td className="p-3 border border-gray-200 dark:border-gray-700">/</td><td className="p-3 border border-gray-200 dark:border-gray-700">/ &gt; +, push /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*E</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">15</td><td className="p-3 border border-gray-200 dark:border-gray-700">F</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*EF</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">16</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop /, pop +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB+CD-*EF/+</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The result is <code>(A+B)*(C-D) + (E/F)</code>. The
                multiplication is done before the addition because <code>*</code> has higher precedence than <code>+</code>.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Experts sometimes forget that <code>+</code> has lower precedence than
                <code>*</code> and <code>/</code>, leading to <code>((A+B)*(C-D)+E)/F</code> – but that's wrong.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">AB+CD-*EF/+</strong>
            </p>
          </div>
        </section>

        {/* EXAMPLE 10: A + B * C - D / E + F */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              Example 10: <code>A + B * C - D / E + F</code>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mistake: Overlooking the left‑to‑right evaluation of <code>+</code> and <code>-</code>.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                    <th className="p-3 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">1</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">2</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">A</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">3</td><td className="p-3 border border-gray-200 dark:border-gray-700">B</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">4</td><td className="p-3 border border-gray-200 dark:border-gray-700">*</td><td className="p-3 border border-gray-200 dark:border-gray-700">* &gt; +, push *</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">AB</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">5</td><td className="p-3 border border-gray-200 dark:border-gray-700">C</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">6</td><td className="p-3 border border-gray-200 dark:border-gray-700">-</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop * (higher), pop + (equal), push -</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">7</td><td className="p-3 border border-gray-200 dark:border-gray-700">D</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+D</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">8</td><td className="p-3 border border-gray-200 dark:border-gray-700">/</td><td className="p-3 border border-gray-200 dark:border-gray-700">/ &gt; -, push /</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+D</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">9</td><td className="p-3 border border-gray-200 dark:border-gray-700">E</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[- /]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+DE</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">10</td><td className="p-3 border border-gray-200 dark:border-gray-700">+</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop / (higher), pop - (equal), push +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+DE/-</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">11</td><td className="p-3 border border-gray-200 dark:border-gray-700">F</td><td className="p-3 border border-gray-200 dark:border-gray-700">Operand → output</td><td className="p-3 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+DE/-F</td></tr>
                  <tr><td className="p-3 border border-gray-200 dark:border-gray-700">12</td><td className="p-3 border border-gray-200 dark:border-gray-700">(end)</td><td className="p-3 border border-gray-200 dark:border-gray-700">Pop +</td><td className="p-3 border border-gray-200 dark:border-gray-700">[]</td><td className="p-3 border border-gray-200 dark:border-gray-700">ABC*+DE/-F+</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">✅ Observation:</span> The result is <code>((A + (B*C) - (D/E)) + F)</code>.
                The left‑associativity of <code>+</code> and <code>-</code> means <code>A + B*C</code> is computed first,
                then <code>D/E</code> is subtracted, then <code>F</code> is added.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                ⚠️ <strong>Common Mistake:</strong> Experts might think <code>A + B*C - D/E + F</code> is evaluated as
                <code>A + (B*C) - (D/E) + F</code> – which is correct, but they might also think it's evaluated right‑to‑left,
                leading to <code>A + (B*C - D/E + F)</code> – which is wrong because <code>+</code> and <code>-</code> are left‑associative.
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Final postfix: <strong className="text-indigo-600 dark:text-indigo-400">ABC*+DE/-F+</strong>
            </p>
          </div>
        </section>

        {/* ================================ END OF Special EXAMPLES ================================ */}
        {/* SVG ILLUSTRATION – Visual Trace */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Visual Trace of Algorithm
            </h2>
            <div className="mt-6 flex justify-center">
              <svg
                viewBox="0 0 700 300"
                className="w-full max-w-3xl h-auto"
                role="img"
                aria-label="Visual trace of conversion"
              >
                <rect x="20" y="20" width="660" height="260" rx="12" fill="#1e293b" opacity="0.05" />
                <rect x="20" y="20" width="660" height="260" rx="12" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Tokens */}
                <text x="80" y="50" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">Input:</text>
                <rect x="130" y="35" width="40" height="30" rx="4" fill="#0ea5e9" opacity="0.2" />
                <text x="150" y="55" textAnchor="middle" fontSize="16" fill="#0ea5e9">A</text>
                <text x="180" y="55" fontSize="16" fill="#f59e0b">+</text>
                <rect x="195" y="35" width="40" height="30" rx="4" fill="#0ea5e9" opacity="0.2" />
                <text x="215" y="55" textAnchor="middle" fontSize="16" fill="#0ea5e9">B</text>
                <text x="245" y="55" fontSize="16" fill="#22c55e">→</text>
                <rect x="270" y="35" width="40" height="30" rx="4" fill="#22c55e" opacity="0.2" />
                <text x="290" y="55" textAnchor="middle" fontSize="16" fill="#22c55e">AB+</text>

                {/* Stack visualization */}
                <text x="80" y="110" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">Stack:</text>
                <rect x="130" y="95" width="160" height="40" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="150" y="120" fontSize="16" fill="#f59e0b">[ ]</text>
                <text x="210" y="120" fontSize="14" fill="#64748b">(empty when done)</text>

                {/* Steps */}
                <text x="80" y="180" fontSize="14" fontWeight="bold" fill="#1e293b" className="dark:fill-gray-200">Steps:</text>
                <g>
                  <rect x="130" y="165" width="30" height="30" rx="4" fill="#6366f1" opacity="0.2" />
                  <text x="145" y="185" textAnchor="middle" fontSize="12" fill="#6366f1">1</text>
                  <text x="170" y="185" fontSize="12" fill="#64748b">A → output</text>
                </g>
                <g transform="translate(0, 25)">
                  <rect x="130" y="165" width="30" height="30" rx="4" fill="#6366f1" opacity="0.2" />
                  <text x="145" y="185" textAnchor="middle" fontSize="12" fill="#6366f1">2</text>
                  <text x="170" y="185" fontSize="12" fill="#64748b">+ → stack</text>
                </g>
                <g transform="translate(0, 50)">
                  <rect x="130" y="165" width="30" height="30" rx="4" fill="#6366f1" opacity="0.2" />
                  <text x="145" y="185" textAnchor="middle" fontSize="12" fill="#6366f1">3</text>
                  <text x="170" y="185" fontSize="12" fill="#64748b">B → output</text>
                </g>
                <g transform="translate(0, 75)">
                  <rect x="130" y="165" width="30" height="30" rx="4" fill="#6366f1" opacity="0.2" />
                  <text x="145" y="185" textAnchor="middle" fontSize="12" fill="#6366f1">4</text>
                  <text x="170" y="185" fontSize="12" fill="#64748b">Pop + → output</text>
                </g>
              </svg>
            </div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
              The algorithm processes each token, updating the stack and output as it goes.
            </p>
          </div>
        </section>

        {/* TIPS & TRICKS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips &amp; Tricks (Professional Level)
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Use a table to trace manually</strong> – it helps catch errors in your understanding.
              </li>
              <li>
                <strong>Compare with a tool</strong> – write a simple program and compare outputs to your manual traces.
              </li>
              <li>
                <strong>Practice with different expressions</strong> – including those with multiple parentheses and different operators.
              </li>
              <li>
                <strong>Look for patterns</strong> – in postfix, the order of operands is the same as infix; only operators move.
              </li>
            </ul>
          </div>
        </section>

        {/* COMMON PITFALLS */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              ⚠️ Common Pitfalls
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Forgetting to pop all operators at the end</strong> – leads to incomplete postfix.
              </li>
              <li>
                <strong>Not handling parentheses correctly</strong> – e.g., forgetting to discard '(' after popping.
              </li>
              <li>
                <strong>Mistaking associativity</strong> – for exponentiation, equal precedence should NOT be popped.
              </li>
              <li>
                <strong>Mis‑reading the stack</strong> – the stack is LIFO, so the last pushed is the first popped.
              </li>
            </ul>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-green-500 rounded-full"></span>
              ✅ Best Practices
            </h2>
            <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Write a trace function</strong> – a debug function that prints the stack and output at each step.
              </li>
              <li>
                <strong>Test with known examples</strong> – compare your manual trace with the algorithm's output.
              </li>
              <li>
                <strong>Use a consistent notation</strong> – clearly mark stack contents and output.
              </li>
              <li>
                <strong>Practice until it's second nature</strong> – the more you trace, the more intuitive it becomes.
              </li>
            </ul>
          </div>
        </section>

        {/* MINI CHECKLIST */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              📋 Mini Checklist
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "I can trace the algorithm on a simple expression.",
                "I understand how the stack changes at each step.",
                "I know how parentheses affect the trace.",
                "I can identify when to pop operators.",
                "I can verify the final postfix result.",
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
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              🤔 Think About…
            </h2>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Try tracing <code>A + B * C - D</code> – where do the operators go?</li>
              <li>• What would happen if you swapped the order of operands in the input?</li>
              <li>• Why is the output of <code>(A+B)*C</code> different from <code>A+B*C</code>?</li>
              <li>• Can you identify a pattern in the stack size during the trace?</li>
            </ul>
          </div>
        </section>

        {/* JAVA CODE EXAMPLE */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-orange-500 rounded-full"></span>
              🖥️ Java Example
            </h2>
            <div className="mt-4">
              <JavaFileLoader
                fileModule={stepByStepExampleJava}
                title="StepByStepExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program includes a trace function that shows the stack and output at each step.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-300">
          <Teacher
            note={
              "Tracing is the most effective way to internalise the algorithm. I have my students in Barrackpore draw tables like the ones above for every expression they convert. It builds a mental model of how the stack works. Encourage them to check their traces by running the code – seeing the same output builds confidence."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-400">
          <FAQTemplate
            title="Step-by-Step Examples – FAQs"
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