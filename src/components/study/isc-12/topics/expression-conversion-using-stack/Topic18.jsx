import React, { useState } from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import javaCodeRaw from "./topic18_files/InfixToPrefixStackExample.java?raw";
import questions from "./topic18_files/topic18_questions";

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

// Safeguard for Java code
const javaCode = typeof javaCodeRaw === 'string' ? javaCodeRaw : '// Java code not available';

// ---------- Conversion Engine with stack tracing ----------
const PRECEDENCE = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
function isOperator(c) { return c in PRECEDENCE; }
function isOperand(c) { return /[a-zA-Z0-9]/.test(c); }
function reverseString(s) { return s.split('').reverse().join(''); }
function swapParentheses(s) {
  return s.split('').map(c => {
    if (c === '(') return ')';
    if (c === ')') return '(';
    return c;
  }).join('');
}

function infixToPrefixWithTrace(infix) {
  const traces = [];
  let step = 0;

  const reversed = reverseString(infix);
  traces.push({ step: ++step, token: 'REVERSE', action: `Reverse infix: "${infix}" → "${reversed}"`, stack: '—', output: '—', stackArray: [] });

  const swapped = swapParentheses(reversed);
  traces.push({ step: ++step, token: 'SWAP', action: `Swap parentheses: "${reversed}" → "${swapped}"`, stack: '—', output: '—', stackArray: [] });

  let output = '';
  const stack = [];
  traces.push({ step: ++step, token: 'START', action: 'Start processing swapped expression', stack: '[]', output: '""', stackArray: [] });

  for (const ch of swapped) {
    let action = '';
    if (isOperand(ch)) {
      output += ch;
      action = `Append operand '${ch}' to output`;
    } else if (ch === '(') {
      stack.push(ch);
      action = `Push '('`;
    } else if (ch === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        const popped = stack.pop();
        output += popped;
        action += `Pop '${popped}' to output; `;
      }
      if (stack.length > 0 && stack[stack.length - 1] === '(') {
        stack.pop();
        action += "Discard '('";
      } else {
        action += "Error: mismatched parentheses";
      }
    } else if (isOperator(ch)) {
      while (stack.length > 0 && stack[stack.length - 1] !== '(' &&
             PRECEDENCE[stack[stack.length - 1]] > PRECEDENCE[ch]) {
        const popped = stack.pop();
        output += popped;
        action += `Pop '${popped}' (higher precedence); `;
      }
      stack.push(ch);
      action += `Push '${ch}'`;
    } else {
      action = `Error: invalid character '${ch}'`;
    }
    traces.push({
      step: ++step,
      token: ch,
      action: action || `Process '${ch}'`,
      stack: stack.length === 0 ? '[]' : '[' + stack.join(' ') + ']',
      output: output || '""',
      stackArray: stack.slice()
    });
  }

  while (stack.length > 0) {
    const popped = stack.pop();
    output += popped;
    traces.push({
      step: ++step,
      token: 'END',
      action: `Pop remaining '${popped}' from stack`,
      stack: stack.length === 0 ? '[]' : '[' + stack.join(' ') + ']',
      output: output || '""',
      stackArray: stack.slice()
    });
  }

  const finalPrefix = reverseString(output);
  traces.push({ step: ++step, token: 'REVERSE', action: `Reverse output "${output}" → "${finalPrefix}"`, stack: '—', output: finalPrefix, stackArray: [] });

  return { traces, prefix: finalPrefix };
}

// ---------- Visual Stack Component ----------
function VisualStack({ traces, currentStep }) {
  if (!traces || traces.length === 0) return null;
  const trace = traces[currentStep] || traces[traces.length - 1];

  const stackItems = trace.stackArray || [];
  const outputStr = trace.output || '';
  const currentChar = trace.token || '';
  const action = trace.action || '';

  return (
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stack */}
        <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Stack (top → bottom)</h3>
          <div className="flex flex-col-reverse items-start space-y-reverse space-y-1 min-h-[60px]">
            {stackItems.length === 0 ? (
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

        {/* Center: Output and Action */}
        <div className="md:col-span-2">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Token</h3>
            <div className="text-lg font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {currentChar === 'END' ? '⏹ End' : currentChar || '—'}
            </div>
          </div>
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Output (postfix‑like)</h3>
            <div className="font-mono text-base bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 min-h-[36px]">
              {outputStr || '""'}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Action</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
              {action}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export default function Topic18() {
  const [infix, setInfix] = useState('(A+B)*C');
  const [traces, setTraces] = useState([]);
  const [prefix, setPrefix] = useState('');
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleConvert = () => {
    setError('');
    try {
      const result = infixToPrefixWithTrace(infix);
      setTraces(result.traces);
      setPrefix(result.prefix);
      setCurrentStep(0);
    } catch (e) {
      setError(e.message);
      setTraces([]);
      setPrefix('');
      setCurrentStep(0);
    }
  };

  const handleClear = () => {
    setInfix('');
    setTraces([]);
    setPrefix('');
    setError('');
    setCurrentStep(0);
  };

  const goToStep = (index) => {
    if (index >= 0 && index < traces.length) {
      setCurrentStep(index);
    }
  };

  const exampleExpressions = [
    'A+B',
    'A+B*C',
    '(A+B)*C',
    'A*B+C*D',
    'A+B*C-D',
    'A^B^C',
    '(A+B)*(C-D)',
    'A*(B+C)-D/E'
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Example of Infix to Prefix using Stack
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            A practical demonstration of the stack‑based algorithm with live visualisation.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Stack‑Based Algorithm in Practice
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                The infix‑to‑prefix conversion is elegantly implemented using a stack. The stack holds operators
                and parentheses while we scan the reversed expression. The key insight is:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>We <strong>reverse</strong> the infix expression.</li>
                <li>We <strong>swap parentheses</strong>.</li>
                <li>We apply a <strong>modified postfix algorithm</strong> where operators of equal precedence are <em>not</em> popped.</li>
                <li>Finally, we <strong>reverse</strong> the output.</li>
              </ul>
              <p>
                This tool visualises every step: the stack contents, the output, and the action taken for each token.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Interactive feature:</span> Use the slider and navigation buttons to step through the conversion process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TOOL */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              🧪 Interactive Stack Converter
            </h2>

            {/* Input */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1 w-full">
                <label htmlFor="infixInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Infix Expression
                </label>
                <input
                  id="infixInput"
                  type="text"
                  value={infix}
                  onChange={(e) => setInfix(e.target.value)}
                  placeholder="e.g. (A+B)*C"
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
                  onClick={() => setInfix(expr)}
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

            {prefix && (
              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">✅ Prefix Result</div>
                <div className="mt-1 font-mono text-xl font-bold text-emerald-800 dark:text-emerald-200">{prefix}</div>
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
                  <div className="grid grid-cols-2 gap-1">
                    <div><span className="font-medium">Stack (text):</span> {traces[currentStep].stack}</div>
                    <div><span className="font-medium">Output:</span> {traces[currentStep].output}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* DETAILED TRACE TABLE */}
        {traces.length > 0 && (
          <section className="animate-fadeUp delay-300">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
                Full Trace Table
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Stack</th>
                      <th className="p-2 border border-gray-200 dark:border-gray-700 text-left font-mono">Output</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    {traces.map((trace, idx) => (
                      <tr key={trace.step} className={`hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${idx === currentStep ? 'bg-indigo-50 dark:bg-indigo-950/30' : ''}`}>
                        <td className="p-2 border border-gray-200 dark:border-gray-700 text-center">{trace.step}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-700 font-mono">{trace.token}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-700 text-xs">{trace.action}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-700 font-mono text-xs">{trace.stack}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-700 font-mono text-xs">{trace.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ALGORITHM SUMMARY */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Algorithm Recap for Stack Implementation
            </h2>
            <ol className="mt-4 list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Reverse</strong> the infix expression.</li>
              <li><strong>Swap</strong> '(' and ')' in the reversed string.</li>
              <li><strong>Scan</strong> the swapped expression left to right:</li>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>If operand → append to output.</li>
                <li>If '(' → push onto stack.</li>
                <li>If ')' → pop and output until '('; discard '('.</li>
                <li>If operator → while top has <strong>higher</strong> precedence (not equal), pop and output; then push operator.</li>
              </ul>
              <li><strong>Pop</strong> remaining operators from stack to output.</li>
              <li><strong>Reverse</strong> the output to get prefix.</li>
            </ol>
            <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm">
                🔑 <span className="font-medium">Key point:</span> The stack manages precedence and parentheses. The decision to pop only on <strong>higher</strong> precedence is what makes prefix different from postfix.
              </p>
            </div>
          </div>
        </section>

        {/* TIPS & TRICKS */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips for Implementation
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use a <code>Stack&lt;Character&gt;</code> in Java, or an array‑based stack in other languages.</li>
              <li>Precompute precedence and associativity in a map for clarity.</li>
              <li>Write helper functions: <code>reverse()</code>, <code>swapParentheses()</code>.</li>
              <li>Test with expressions that include exponentiation <code>^</code> to verify right‑associativity.</li>
              <li>Add a trace mode to debug the stack operations.</li>
            </ul>
          </div>
        </section>

        {/* COMMON PITFALLS */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              ⚠️ Common Pitfalls in Stack Implementation
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Forgetting to reverse the expression.</li>
              <li>Not swapping parentheses after reversal.</li>
              <li>Using postfix associativity: popping equal precedence.</li>
              <li>Not popping all remaining operators at the end.</li>
              <li>Mis‑handling spaces or multi‑character operands.</li>
            </ul>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-green-500 rounded-full"></span>
              ✅ Best Practices
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Write modular functions for each major step.</li>
              <li>Include Javadoc comments explaining the algorithm.</li>
              <li>Add unit tests covering edge cases (empty expression, single operand).</li>
              <li>Use the interactive tool to verify your manual conversions.</li>
            </ul>
          </div>
        </section>

        {/* MINI CHECKLIST */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              📋 Mini Checklist
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "I understand the stack‑based algorithm.",
                "I can explain why we reverse and swap.",
                "I know when to pop operators from the stack.",
                "I can implement the algorithm in Java.",
                "I can use the interactive tool to debug conversions.",
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
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              🤔 Think About…
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>What does the stack contain at each step?</li>
              <li>Why do we not pop equal precedence for prefix?</li>
              <li>How would you adapt the algorithm for multi‑character operands?</li>
              <li>Try converting <code>A-B-C</code> using the tool and observe the stack.</li>
            </ul>
          </div>
        </section>

        {/* JAVA CODE EXAMPLE */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-orange-500 rounded-full"></span>
              🖥️ Java Implementation with Stack
            </h2>
            <div className="mt-4">
              <JavaFileLoader
                fileModule={javaCode}
                title="InfixToPrefixStackExample.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This complete Java program demonstrates the stack‑based conversion with a trace mode.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-100">
          <Teacher
            note={
              "The stack is the heart of this algorithm. I emphasise to my students in Barrackpore: 'Watch the stack – it tells you everything about what's waiting to be processed.' The interactive tool makes this tangible. Practice with expressions that have multiple operators and parentheses to see the stack grow and shrink."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-200">
          <FAQTemplate
            title="Infix to Prefix using Stack – FAQs"
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