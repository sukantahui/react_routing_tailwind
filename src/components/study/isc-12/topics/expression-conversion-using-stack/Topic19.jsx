import React, { useState } from "react";
import clsx from "clsx";

// Custom components
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import questions from "./topic19_files/topic19_questions";

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
export default function Topic19() {
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
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Infix to Prefix Testing Tool
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Visualise the conversion process step by step with an interactive stack.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Purpose of This Tool
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                This interactive testing tool helps you understand the infix‑to‑prefix conversion algorithm by
                showing every step of the process. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Enter any valid infix expression.</li>
                <li>See the reversed and parenthesis‑swapped intermediate forms.</li>
                <li>Watch the stack and output evolve token by token.</li>
                <li>Step through the conversion at your own pace.</li>
                <li>Instantly verify the final prefix result.</li>
              </ul>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Tip:</span> Use the slider to move back and forth through the steps.
                  Observe how operators wait on the stack until they are needed.
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
              🧪 Try It Yourself
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

        {/* QUICK REFERENCE */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Quick Reference: Algorithm Recap
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Precedence (high to low)</h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li><code>^</code> (exponentiation) – highest</li>
                  <li><code>*</code>, <code>/</code>, <code>%</code></li>
                  <li><code>+</code>, <code>-</code></li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Conversion Steps</h3>
                <ol className="mt-2 list-decimal pl-4 text-sm text-gray-600 dark:text-gray-400">
                  <li>Reverse infix</li>
                  <li>Swap parentheses</li>
                  <li>Apply modified postfix (pop only higher precedence)</li>
                  <li>Reverse output</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* TIPS FOR USING THE TOOL */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips for Using This Tool
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Start with simple expressions like <code>A+B</code> to see the basic flow.</li>
              <li>Gradually introduce precedence with <code>A+B*C</code>.</li>
              <li>Use parentheses to see how they affect the stack.</li>
              <li>Try right‑associative operator <code>^</code> to observe the difference.</li>
              <li>Watch the stack size – it grows with operators and shrinks when they are output.</li>
            </ul>
          </div>
        </section>

        {/* COMMON MISTAKES WHEN USING THE TOOL */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              ⚠️ Common Mistakes When Using the Tool
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Forgetting to reverse the expression – the tool does it for you, but remember the logic.</li>
              <li>Mistaking the output for the final prefix before the final reverse.</li>
              <li>Not recognising that equal precedence is not popped – watch the stack carefully.</li>
              <li>Inputting invalid characters – the tool will show an error.</li>
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
                "I can use the tool to convert expressions.",
                "I understand the stack visualisation.",
                "I can explain each step shown.",
                "I can identify the reversed and swapped expressions.",
                "I can verify the final prefix result.",
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
              <li>Try converting <code>A+B*C</code> and note when each operator is popped.</li>
              <li>What happens to the stack when a right parenthesis is encountered?</li>
              <li>How does the output change when you add parentheses?</li>
              <li>Experiment with <code>A^B^C</code> and compare with <code>(A^B)^C</code>.</li>
            </ul>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-400">
          <Teacher
            note={
              "This tool is perfect for in‑class demonstrations. I often project it and ask students to predict the next step. It builds intuition for how the stack works. Encourage them to test their own expressions and then trace manually to verify. The tool reinforces the key concept: prefix is postfix in a mirror."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-500">
          <FAQTemplate
            title="Infix to Prefix Testing Tool – FAQs"
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