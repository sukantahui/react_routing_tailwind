import React, { useState } from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import postfixEvaluationJava from "./topic40_files/PostfixEvaluation.java?raw";
import questions from "./topic40_files/topic40_questions";

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

// ---------- Postfix Evaluation Engine with Trace ----------
function evaluatePostfixWithTrace(postfix, values) {
  const traces = [];
  let step = 0;
  const stack = [];

  const tokens = postfix.split(/\s+/);

  traces.push({ step: ++step, token: 'START', action: 'Initialize empty stack', stack: '[]' });

  for (const token of tokens) {
    let action = '';
    let result = null;

    if (token.match(/^[a-zA-Z]+$/)) {
      // Variable
      if (values[token] === undefined) {
        throw new Error(`Undefined variable: ${token}`);
      }
      stack.push(values[token]);
      action = `Push variable '${token}' = ${values[token]}`;
    } else if (token.match(/^-?\d+(\.\d+)?$/)) {
      // Number literal
      const num = parseFloat(token);
      stack.push(num);
      action = `Push number ${num}`;
    } else {
      // Operator
      const right = stack.pop();
      const left = stack.pop();
      let resultVal;
      switch (token) {
        case '+': resultVal = left + right; break;
        case '-': resultVal = left - right; break;
        case '*': resultVal = left * right; break;
        case '/': resultVal = left / right; break;
        case '^': resultVal = Math.pow(left, right); break;
        default: throw new Error(`Unknown operator: ${token}`);
      }
      stack.push(resultVal);
      action = `Pop right=${right}, left=${left}, apply '${token}' → ${resultVal}`;
      result = resultVal;
    }

    traces.push({
      step: ++step,
      token: token,
      action: action,
      stack: stack.length === 0 ? '[]' : '[' + stack.join(', ') + ']',
      stackArray: stack.slice(),
      result: result
    });
  }

  const finalResult = stack.length === 1 ? stack[0] : null;
  return { traces, result: finalResult };
}

// ---------- Visual Stack Component ----------
function VisualStack({ traces, currentStep }) {
  if (!traces || traces.length === 0) return null;
  const trace = traces[currentStep] || traces[traces.length - 1];

  const stackItems = trace.stackArray || [];
  const currentChar = trace.token || '';
  const action = trace.action || '';
  const result = trace.result;

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
                  {typeof item === 'number' ? item : item}
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
          {result !== undefined && result !== null && currentChar !== 'START' && (
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Result of Operation</h3>
              <div className="font-mono text-base bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded border border-emerald-200 dark:border-emerald-800">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Interactive Evaluation Tool ----------
function PostfixEvaluator() {
  const [expression, setExpression] = useState('A B C * +');
  const [varValues, setVarValues] = useState('A=5, B=3, C=4');
  const [traces, setTraces] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleEvaluate = () => {
    setError('');
    setResult(null);
    setTraces([]);
    setCurrentStep(0);

    try {
      const values = {};
      const pairs = varValues.split(',').map(s => s.trim());
      for (const pair of pairs) {
        if (pair === '') continue;
        const [key, val] = pair.split('=').map(s => s.trim());
        if (!key || val === undefined) {
          throw new Error(`Invalid variable assignment: ${pair}`);
        }
        values[key] = parseFloat(val);
        if (isNaN(values[key])) {
          throw new Error(`Invalid number for ${key}: ${val}`);
        }
      }

      const resultData = evaluatePostfixWithTrace(expression, values);
      setTraces(resultData.traces);
      setResult(resultData.result);
      setCurrentStep(0);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleClear = () => {
    setExpression('');
    setVarValues('');
    setTraces([]);
    setResult(null);
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
    '2 3 + 4 *',
    '5 6 * 7 +',
    'A B C * D / +'
  ];
  const exampleVarSets = ['A=5, B=3', 'A=2, B=3, C=4', 'A=10, B=5', 'A=5, B=3, C=4, D=2'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">🧮 Postfix Expression Evaluator</h3>

      <div className="space-y-4">
        {/* Expression input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Postfix Expression (space-separated tokens)
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g. A B +"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          />
        </div>

        {/* Variable values */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Variable Values (comma-separated, e.g. A=5, B=3)
          </label>
          <input
            type="text"
            value={varValues}
            onChange={(e) => setVarValues(e.target.value)}
            placeholder="A=5, B=3"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          />
        </div>

        {/* Example buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Expr:</span>
          {exampleExpressions.map((expr, idx) => (
            <button
              key={idx}
              onClick={() => setExpression(expr)}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              {expr}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Var sets:</span>
          {exampleVarSets.map((vars, idx) => (
            <button
              key={idx}
              onClick={() => setVarValues(vars)}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              {vars}
            </button>
          ))}
        </div>

        {/* Evaluate / Clear buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleEvaluate}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors"
          >
            Evaluate
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result !== null && !error && (
          <div className="mt-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">✅ Final Result</div>
            <div className="mt-1 font-mono text-2xl font-bold text-emerald-800 dark:text-emerald-200">
              {result}
            </div>
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
    </div>
  );
}

// ---------- Main Component ----------
export default function Topic40() {
  const javaCode = typeof postfixEvaluationJava === 'string'
    ? postfixEvaluationJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Evaluation of Postfix Expressions
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Evaluating postfix expressions is a classic stack application – simple, efficient, and powerful.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Postfix is Perfect for Stack Evaluation
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Postfix notation (Reverse Polish Notation) is tailor‑made for stack‑based evaluation. Because operators
                appear <strong>after</strong> their operands, the evaluation can be done in a single left‑to‑right
                pass without needing to look ahead or consider precedence.
              </p>
              <p>
                The algorithm is remarkably simple:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Scan the expression from <strong>left to right</strong>.</li>
                <li>If the token is an operand (number or variable), push it onto the stack.</li>
                <li>If the token is an operator, pop the <strong>right</strong> operand, then the <strong>left</strong> operand, apply the operator, and push the result.</li>
                <li>After all tokens are processed, the stack contains exactly one value – the final result.</li>
              </ol>
              <p>
                This algorithm is <strong>O(n)</strong> time and <strong>O(n)</strong> space, making it highly efficient.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> The stack naturally handles the order of operations
                  because the operands are already arranged in the order they need to be computed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ALGORITHM IN DETAIL */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Algorithm in Detail
            </h2>
            <div className="mt-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 1: Tokenization</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Split the postfix expression into tokens (operands and operators) separated by whitespace.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 2: Initialize Stack</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Create an empty stack to store numeric values.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 3: Scan Tokens</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  For each token from left to right:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li><strong>Number:</strong> Parse and push onto the stack.</li>
                  <li><strong>Variable:</strong> Look up its value in a symbol table and push.</li>
                  <li><strong>Operator:</strong> Pop the right operand, then the left operand. Apply the operator, push the result.</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Step 4: Return Result</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  After processing all tokens, the stack should contain exactly one value. Pop and return it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TOOL */}
        <section className="animate-fadeUp delay-300">
          <PostfixEvaluator />
        </section>

        {/* STEP-BY-STEP EXAMPLES */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Example Traces
            </h2>
            <div className="mt-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 1: <code>2 3 +</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Token:</span> 2 → push [2]</p>
                  <p><span className="font-medium">Token:</span> 3 → push [2, 3]</p>
                  <p><span className="font-medium">Token:</span> + → pop 3 (right), 2 (left) → 2+3=5 → push [5]</p>
                  <p className="text-emerald-600 dark:text-emerald-400">✅ Result: 5</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 2: <code>2 3 + 4 *</code></h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Token:</span> 2 → push [2]</p>
                  <p><span className="font-medium">Token:</span> 3 → push [2, 3]</p>
                  <p><span className="font-medium">Token:</span> + → 2+3=5 → push [5]</p>
                  <p><span className="font-medium">Token:</span> 4 → push [5, 4]</p>
                  <p><span className="font-medium">Token:</span> * → 5*4=20 → push [20]</p>
                  <p className="text-emerald-600 dark:text-emerald-400">✅ Result: 20</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Example 3: <code>A B C * +</code> with A=2, B=3, C=4</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Token:</span> A → push [2]</p>
                  <p><span className="font-medium">Token:</span> B → push [2, 3]</p>
                  <p><span className="font-medium">Token:</span> C → push [2, 3, 4]</p>
                  <p><span className="font-medium">Token:</span> * → 3*4=12 → push [2, 12]</p>
                  <p><span className="font-medium">Token:</span> + → 2+12=14 → push [14]</p>
                  <p className="text-emerald-600 dark:text-emerald-400">✅ Result: 14</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HANDLING VARIABLES */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Handling Variables with a Symbol Table
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                In real applications, expressions often contain variables (e.g., <code>A B +</code>). To evaluate,
                we use a <strong>symbol table</strong> (a dictionary/map) that holds the values of variables.
                When an operand token is a variable, we look up its value from the map and push it onto the stack.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm">
                  <span className="font-medium">💡 Tip:</span> This is how spreadsheet formulas and calculators
                  handle variables like <code>A1</code> or <code>X</code>.
                </p>
              </div>
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
              <li>Use a <code>Stack&lt;Double&gt;</code> in Java for precise floating‑point results.</li>
              <li>Always validate that the expression is well‑formed (e.g., enough operands for each operator).</li>
              <li>Check for division by zero before performing division.</li>
              <li>For variables, use a <code>Map&lt;String, Double&gt;</code> as a symbol table.</li>
              <li>Whitespace separation makes tokenization easy – enforce it in user input.</li>
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
              <li><strong>Popping order:</strong> First popped is the <strong>right</strong> operand, second is the <strong>left</strong>.</li>
              <li><strong>Not handling undefined variables:</strong> Always check if a variable exists in the symbol table.</li>
              <li><strong>Integer division:</strong> Use <code>double</code> to preserve precision.</li>
              <li><strong>Stack underflow:</strong> If too many operators appear, the stack will be empty.</li>
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
              <li>Implement the evaluator as a reusable method with proper error handling.</li>
              <li>Use a symbol table for variables to make the evaluator flexible.</li>
              <li>Add logging or tracing for debugging complex expressions.</li>
              <li>Write unit tests for various cases.</li>
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
                "I can explain postfix evaluation with a stack.",
                "I know the order of popping operands (right first).",
                "I can handle variables using a symbol table.",
                "I can implement postfix evaluation in Java.",
                "I can trace the stack evolution during evaluation.",
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
              <li>Why does postfix evaluation use left‑to‑right scanning?</li>
              <li>What happens if the expression has mismatched operands/operators?</li>
              <li>How would you handle division by zero?</li>
              <li>Try evaluating <code>5 6 * 7 +</code> step by step.</li>
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
                title="PostfixEvaluation.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program implements postfix evaluation with variable support and a trace mode.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Postfix evaluation is one of the most elegant algorithms in computer science. In Barrackpore, I tell my students: 'The stack is your assistant – it remembers the operands until an operator tells you what to do.' Use the interactive tool to experiment with different expressions and variable values. Watching the stack grow and shrink builds intuition for how the algorithm works."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Postfix Evaluation – FAQs"
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