import React, { useState } from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import postfixToInfixAlgorithmJava from "./topic24_files/PostfixToInfixAlgorithm.java?raw";
import questions from "./topic24_files/topic24_questions";

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

// ---------- Conversion Engine with tracing ----------
function postfixToInfixWithTrace(postfix) {
  const traces = [];
  let step = 0;
  const stack = [];

  const tokens = postfix.split(/\s+/);

  traces.push({ step: ++step, token: 'START', action: 'Initialize empty stack', stack: '[]', output: '—' });

  for (const token of tokens) {
    let action = '';

    if (token.match(/^[a-zA-Z0-9]+$/)) {
      // Operand
      stack.push(token);
      action = `Push operand '${token}'`;
    } else {
      // Operator
      const right = stack.pop();
      const left = stack.pop();
      const infix = `(${left} ${token} ${right})`;
      stack.push(infix);
      action = `Pop '${right}' and '${left}', combine as '${infix}', push result`;
    }

    traces.push({
      step: ++step,
      token: token,
      action: action,
      stack: stack.length === 0 ? '[]' : '[' + stack.join(', ') + ']',
      output: stack.length === 1 ? stack[0] : '—'
    });
  }

  const finalInfix = stack.length === 1 ? stack[0] : '';
  return { traces, infix: finalInfix };
}

// ---------- Visual Stack Component ----------
function VisualStack({ traces, currentStep }) {
  if (!traces || traces.length === 0) return null;
  const trace = traces[currentStep] || traces[traces.length - 1];

  const stackItems = trace.stack ? trace.stack.replace(/[\[\]]/g, '').split(',').map(s => s.trim()) : [];
  const currentChar = trace.token || '';
  const action = trace.action || '';
  const output = trace.output || '';

  return (
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stack */}
        <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Stack (top → bottom)</h3>
          <div className="flex flex-col-reverse items-start space-y-reverse space-y-1 min-h-[60px]">
            {stackItems.length === 0 || (stackItems.length === 1 && stackItems[0] === '') ? (
              <div className="text-sm text-gray-400 dark:text-gray-500 italic">(empty)</div>
            ) : (
              stackItems.map((item, idx) => (
                <div key={idx} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700 rounded text-sm font-mono text-indigo-800 dark:text-indigo-200 shadow-sm">
                  {item}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Center: Token and Action */}
        <div className="md:col-span-2">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Token</h3>
            <div className="text-lg font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {currentChar === 'START' ? '⏹ Start' : currentChar || '—'}
            </div>
          </div>
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Action</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
              {action}
            </div>
          </div>
          {output !== '—' && output !== '' && (
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Infix</h3>
              <div className="font-mono text-base bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded border border-emerald-200 dark:border-emerald-800">
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export default function Topic24() {
  const [postfix, setPostfix] = useState('A B +');
  const [traces, setTraces] = useState([]);
  const [infix, setInfix] = useState('');
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleConvert = () => {
    setError('');
    try {
      const result = postfixToInfixWithTrace(postfix);
      setTraces(result.traces);
      setInfix(result.infix);
      setCurrentStep(0);
    } catch (e) {
      setError(e.message);
      setTraces([]);
      setInfix('');
      setCurrentStep(0);
    }
  };

  const handleClear = () => {
    setPostfix('');
    setTraces([]);
    setInfix('');
    setError('');
    setCurrentStep(0);
  };

  const goToStep = (index) => {
    if (index >= 0 && index < traces.length) {
      setCurrentStep(index);
    }
  };

  const exampleExpressions = [
    'A B +',
    'A B C * +',
    'A B + C *',
    'A B * C D * +',
    'A B C * + D -',
    'A B C ^ ^',
    'A B + C D - *',
    'A B C + * D E / -'
  ];

  const javaCode = typeof postfixToInfixAlgorithmJava === 'string'
    ? postfixToInfixAlgorithmJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Algorithm for Postfix to Infix
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            A complete algorithm to transform postfix expressions back to infix using a stack.
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
                The algorithm for converting postfix to infix is the <strong>inverse of postfix evaluation</strong>.
                Instead of computing numeric results, we build strings representing the infix expression.
              </p>
              <p>
                The algorithm uses a <strong>stack of strings</strong> to hold sub‑expressions. Each operand is pushed
                onto the stack as a string. When an operator is encountered, we pop two operand strings, combine them
                with the operator in infix notation, wrap them in parentheses, and push the result back onto the stack.
              </p>
              <p>
                After processing all tokens, the stack contains exactly one string – the fully parenthesised infix expression.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> The algorithm is identical to postfix evaluation,
                  except we operate on strings rather than numeric values.
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
{`algorithm postfixToInfix(postfix):
    stack = empty stack of strings
    
    for each token in postfix (left to right):
        if token is operand:
            stack.push(token)
        else: // token is operator
            right = stack.pop()
            left = stack.pop()
            infix = "(" + left + " " + token + " " + right + ")"
            stack.push(infix)
    
    // Final result is the only element on the stack
    return stack.pop()`}
              </pre>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This is one of the simplest conversion algorithms – just a few lines of code!
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
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 1: Initialize Stack</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Create an empty stack to hold operand strings.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 2: Scan Tokens</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Process each token (operand or operator) from left to right.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 3: Handle Operand</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  If the token is an operand, push it onto the stack as a string.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 4: Handle Operator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  If the token is an operator:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>Pop the <strong>right</strong> operand from the stack.</li>
                  <li>Pop the <strong>left</strong> operand from the stack.</li>
                  <li>Build a new string: <code>"(" + left + " " + operator + " " + right + ")"</code>.</li>
                  <li>Push the resulting string onto the stack.</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 5: Return Result</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  After processing all tokens, the stack will contain exactly one element – the fully parenthesised infix expression.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TOOL */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              🧪 Interactive Converter
            </h2>

            {/* Input */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1 w-full">
                <label htmlFor="postfixInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Postfix Expression (space-separated tokens)
                </label>
                <input
                  id="postfixInput"
                  type="text"
                  value={postfix}
                  onChange={(e) => setPostfix(e.target.value)}
                  placeholder="e.g. A B +"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                  onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleConvert}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Convert
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Example buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Examples:</span>
              {exampleExpressions.map((expr) => (
                <button
                  key={expr}
                  onClick={() => setPostfix(expr)}
                  className="px-3 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors duration-200"
                >
                  {expr}
                </button>
              ))}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                ⚠️ {error}
              </div>
            )}

            {infix && (
              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">✅ Infix Result</div>
                <div className="mt-1 font-mono text-xl font-bold text-emerald-800 dark:text-emerald-200">{infix}</div>
              </div>
            )}

            {/* Visual Stack & Navigation */}
            {traces.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Step:</span>
                  <button
                    onClick={() => goToStep(currentStep - 1)}
                    disabled={currentStep === 0}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    ◀
                  </button>
                  <span className="text-sm font-mono">
                    {currentStep + 1} / {traces.length}
                  </span>
                  <button
                    onClick={() => goToStep(currentStep + 1)}
                    disabled={currentStep === traces.length - 1}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    ▶
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={traces.length - 1}
                    value={currentStep}
                    onChange={(e) => goToStep(parseInt(e.target.value))}
                    className="w-48 accent-indigo-600 dark:accent-indigo-400"
                  />
                </div>

                <VisualStack traces={traces} currentStep={currentStep} />

                {/* Extra step info */}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-2">
                  <div><span className="font-medium">Stack (text):</span> {traces[currentStep].stack}</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* REAL‑WORLD USAGE */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Real‑World Usage
            </h2>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Expression pretty‑printing</strong> – converting postfix bytecode to human‑readable form.</li>
              <li><strong>Debugging compilers</strong> – when an internal representation is postfix, converting to infix helps diagnose issues.</li>
              <li><strong>Educational tools</strong> – to show the relationship between notations.</li>
              <li><strong>Spreadsheet formulas</strong> – some internal representations use postfix and need to be displayed as infix.</li>
            </ul>
            <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm">
                <span className="font-medium">🏫 Classroom story:</span> Tuhina from Shyamnagar used this algorithm to
                build a calculator that displays both postfix input and infix output – it helped her classmates understand
                the conversion.
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
              <li>Use a stack of <code>String</code> objects – simple and efficient.</li>
              <li>Always pop the right operand first, then the left.</li>
              <li>Wrap the combined expression in parentheses to preserve precedence.</li>
              <li>For multi‑character operands, split the postfix string on spaces.</li>
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
              <li>Swapping the order of operands – left and right must be correct.</li>
              <li>Forgetting to add parentheses – results in ambiguous infix.</li>
              <li>Not handling spaces in the input – tokenisation is crucial.</li>
              <li>Assuming only single‑character operands – the algorithm works for any string.</li>
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
              <li>Write a clean function with clear variable names.</li>
              <li>Use <code>Deque</code> or <code>Stack</code> for the operand stack.</li>
              <li>Add input validation to handle malformed expressions.</li>
              <li>Write unit tests for various postfix expressions.</li>
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
                "I can explain the stack‑based algorithm.",
                "I know the correct order of popping operands.",
                "I understand why parentheses are needed.",
                "I can trace the algorithm on simple examples.",
                "I can implement the conversion in Java.",
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
              <li>Why is the right operand popped first?</li>
              <li>What would happen if we didn't add parentheses?</li>
              <li>How would you handle multi‑character operands?</li>
              <li>Try converting <code>A B C * + D -</code> manually.</li>
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
                fileModule={javaCode}
                title="PostfixToInfixAlgorithm.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program implements the algorithm with a trace mode for debugging.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Postfix‑to‑infix is one of the most satisfying algorithms to teach because it's so elegant. I tell my students in Barrackpore: 'The stack now holds strings instead of numbers – everything else is the same.' Emphasise the importance of parentheses. Use the interactive tool to show how the stack builds the expression step by step."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Postfix to Infix Algorithm – FAQs"
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