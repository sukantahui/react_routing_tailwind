import React, { useState } from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import expressionEvaluationJava from "./topic39_files/ExpressionEvaluation.java?raw";
import questions from "./topic39_files/topic39_questions";

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

// ---------- Evaluation Engines ----------

// Evaluate postfix expression with variables (using a map)
function evaluatePostfix(postfix, values) {
  const stack = [];
  const tokens = postfix.split(/\s+/);

  for (const token of tokens) {
    if (token.match(/^[a-zA-Z]+$/)) {
      // Variable
      if (values[token] === undefined) {
        throw new Error(`Undefined variable: ${token}`);
      }
      stack.push(values[token]);
    } else if (token.match(/^-?\d+$/)) {
      // Number literal
      stack.push(parseInt(token));
    } else {
      // Operator
      const right = stack.pop();
      const left = stack.pop();
      let result;
      switch (token) {
        case '+': result = left + right; break;
        case '-': result = left - right; break;
        case '*': result = left * right; break;
        case '/': result = left / right; break;
        case '^': result = Math.pow(left, right); break;
        default: throw new Error(`Unknown operator: ${token}`);
      }
      stack.push(result);
    }
  }
  return stack.pop();
}

// Evaluate prefix expression with variables
function evaluatePrefix(prefix, values) {
  const stack = [];
  const tokens = prefix.split(/\s+/);

  // Scan from right to left
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (token.match(/^[a-zA-Z]+$/)) {
      if (values[token] === undefined) {
        throw new Error(`Undefined variable: ${token}`);
      }
      stack.push(values[token]);
    } else if (token.match(/^-?\d+$/)) {
      stack.push(parseInt(token));
    } else {
      const left = stack.pop();
      const right = stack.pop();
      let result;
      switch (token) {
        case '+': result = left + right; break;
        case '-': result = left - right; break;
        case '*': result = left * right; break;
        case '/': result = left / right; break;
        case '^': result = Math.pow(left, right); break;
        default: throw new Error(`Unknown operator: ${token}`);
      }
      stack.push(result);
    }
  }
  return stack.pop();
}

// ---------- Evaluation Tool Component ----------
function EvaluationTool() {
  const [notation, setNotation] = useState('postfix');
  const [expression, setExpression] = useState('A B +');
  const [varValues, setVarValues] = useState('A=5, B=3');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleEvaluate = () => {
    setError('');
    setResult(null);

    try {
      // Parse variable values
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

      let evalResult;
      if (notation === 'postfix') {
        evalResult = evaluatePostfix(expression, values);
      } else {
        evalResult = evaluatePrefix(expression, values);
      }
      setResult(evalResult);
    } catch (e) {
      setError(e.message);
    }
  };

  const examplePostfix = ['A B +', 'A B C * +', 'A B + C *', '2 3 + 4 *'];
  const examplePrefix = ['+ A B', '+ A * B C', '* + A B C', '* + 2 3 4'];
  const exampleVarSets = ['A=5, B=3', 'A=2, B=3, C=4', 'A=10, B=5', 'A=2, B=3, C=4'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">🧮 Expression Evaluator</h3>

      <div className="space-y-4">
        {/* Notation selector */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              value="postfix"
              checked={notation === 'postfix'}
              onChange={() => setNotation('postfix')}
              className="accent-indigo-600"
            /&gt;
            Postfix
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              value="prefix"
              checked={notation === 'prefix'}
              onChange={() => setNotation('prefix')}
              className="accent-indigo-600"
            /&gt;
            Prefix
          </label>
        </div>

        {/* Expression input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {notation === 'postfix' ? 'Postfix' : 'Prefix'} Expression
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder={notation === 'postfix' ? 'e.g. A B +' : 'e.g. + A B'}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          /&gt;
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
          /&gt;
        </div>

        {/* Example buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Examples:</span>
          {(notation === 'postfix' ? examplePostfix : examplePrefix).map((expr, idx) => (
            <button
              key={idx}
              onClick={() => setExpression(expr)}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            &gt;
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
            &gt;
              {vars}
            </button>
          ))}
        </div>

        {/* Evaluate button */}
        <button
          onClick={handleEvaluate}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors"
        >
          Evaluate
        </button>

        {/* Result / Error */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
            ⚠️ {error}
          </div>
        )}
        {result !== null && !error && (
          <div className="mt-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">✅ Result</div>
            <div className="mt-1 font-mono text-2xl font-bold text-emerald-800 dark:text-emerald-200">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export default function Topic39() {
  const javaCode = typeof expressionEvaluationJava === 'string'
    ? expressionEvaluationJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Expression Evaluation using Stack
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            The stack is the ideal data structure for evaluating expressions – both postfix and prefix.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              Why Use a Stack for Evaluation?
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                The stack is a perfect fit for expression evaluation because of its <strong>Last-In-First-Out (LIFO)</strong>
                nature. In postfix and prefix notations, the order of operators and operands is such that evaluation
                can be done with a single stack:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Postfix:</strong> Scan left to right. Push operands. When an operator is encountered, pop the top two operands, apply the operator, and push the result.</li>
                <li><strong>Prefix:</strong> Scan right to left. Push operands. When an operator is encountered, pop the top two operands (first popped is left operand), apply the operator, and push the result.</li>
              </ul>
              <p>
                Both evaluations are <strong>O(n)</strong> – linear in the number of tokens – and require only a single stack.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> The stack naturally handles the nesting and precedence
                  because the operators appear in the order they need to be applied.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* POSTFIX EVALUATION */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              Postfix Evaluation Algorithm
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                To evaluate a postfix expression:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Initialize an empty stack.</li>
                <li>Scan the expression from <strong>left to right</strong>.</li>
                <li>For each token:
                  <ul className="list-disc pl-6 mt-1">
                    <li>If it's an operand, push it onto the stack.</li>
                    <li>If it's an operator, pop the <strong>right</strong> operand, then the <strong>left</strong> operand, apply the operator, and push the result.</li>
                  </ul>
                </li>
                <li>At the end, the stack contains exactly one value – the result.</li>
              </ol>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <p className="text-sm">
                  <span className="font-medium">📝 Example:</span> Postfix <code>2 3 + 4 *</code>
                </p>
                <ul className="text-sm list-disc pl-5 mt-1">
                  <li>2 → push [2]</li>
                  <li>3 → push [2, 3]</li>
                  <li>+ → pop 3 (right), 2 (left) → 2+3=5 → push [5]</li>
                  <li>4 → push [5, 4]</li>
                  <li>* → pop 4 (right), 5 (left) → 5*4=20 → push [20]</li>
                  <li>Result: 20</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PREFIX EVALUATION */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Prefix Evaluation Algorithm
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                To evaluate a prefix expression:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Initialize an empty stack.</li>
                <li>Scan the expression from <strong>right to left</strong>.</li>
                <li>For each token:
                  <ul className="list-disc pl-6 mt-1">
                    <li>If it's an operand, push it onto the stack.</li>
                    <li>If it's an operator, pop the <strong>left</strong> operand, then the <strong>right</strong> operand, apply the operator, and push the result.</li>
                  </ul>
                </li>
                <li>At the end, the stack contains exactly one value – the result.</li>
              </ol>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <span className="font-medium">📝 Example:</span> Prefix <code>* + 2 3 4</code>
                </p>
                <ul className="text-sm list-disc pl-5 mt-1">
                  <li>Scan right: 4 → push [4]</li>
                  <li>3 → push [4, 3]</li>
                  <li>2 → push [4, 3, 2]</li>
                  <li>+ → pop 2 (left), 3 (right) → 2+3=5 → push [4, 5]</li>
                  <li>* → pop 5 (left), 4 (right) → 5*4=20 → push [20]</li>
                  <li>Result: 20</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE TOOL */}
        <section className="animate-fadeUp delay-400">
          <EvaluationTool />
        </section>

        {/* HANDLING VARIABLES */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Handling Variables
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                In real applications, expressions often contain variables (e.g., <code>A + B</code>). To evaluate,
                we need a <strong>symbol table</strong> (a dictionary/map) that holds the values of variables.
                The evaluator looks up each variable's value when an operand is encountered.
              </p>
              <p>
                The tool above allows you to specify variable values as comma‑separated pairs (e.g., <code>A=5, B=3</code>).
                It then uses these values to compute the expression's result.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm">
                  <span className="font-medium">💡 Tip:</span> This is how spreadsheet formulas and calculator apps
                  handle variables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REAL‑WORLD USAGE */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Real‑World Usage
            </h2>
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Spreadsheet software</strong> – formulas are evaluated using stacks.</li>
              <li><strong>Calculators</strong> – many scientific calculators use RPN (postfix) internally.</li>
              <li><strong>Compilers</strong> – expression evaluation in compilers.</li>
              <li><strong>Database query optimizers</strong> – evaluating conditions.</li>
              <li><strong>Game engines</strong> – evaluating mathematical expressions for physics or AI.</li>
            </ul>
            <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm">
                <span className="font-medium">🏫 Classroom story:</span> Susmita from Ichapur built a calculator app
                using postfix evaluation – she was amazed at how simple the algorithm was.
              </p>
            </div>
          </div>
        </section>

        {/* TIPS & TRICKS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              💡 Tips &amp; Tricks
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use a <code>Stack&lt;Double&gt;</code> in Java to handle both integers and floating‑point results.</li>
              <li>For postfix, the first popped is always the <strong>right</strong> operand.</li>
              <li>For prefix, the first popped is always the <strong>left</strong> operand.</li>
              <li>Always validate that the expression is well‑formed to avoid stack underflow.</li>
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
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Popping in the wrong order – in postfix, first popped is right operand; in prefix, first popped is left operand.</li>
              <li>Not handling division by zero.</li>
              <li>Not handling variables properly – case sensitivity or missing values.</li>
              <li>Assuming integer division – use double for accuracy.</li>
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
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Write separate methods for postfix and prefix evaluation.</li>
              <li>Use a map for variable lookup.</li>
              <li>Validate input before evaluation.</li>
              <li>Return a double to preserve precision.</li>
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
                "I can explain postfix evaluation with a stack.",
                "I can explain prefix evaluation with a stack.",
                "I know the order of popping operands for each notation.",
                "I can handle variables using a symbol table.",
                "I can implement evaluation in Java.",
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
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              🤔 Think About…
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Why does postfix evaluation use left‑to‑right scanning?</li>
              <li>Why does prefix evaluation use right‑to‑left scanning?</li>
              <li>What happens if the expression has mismatched operands/operators?</li>
              <li>Try evaluating <code>2 3 + 4 *</code> step by step.</li>
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
                fileModule={javaCode}
                title="ExpressionEvaluation.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program implements both postfix and prefix evaluation with variable support.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-300">
          <Teacher
            note={
              "Expression evaluation is one of the most practical applications of stacks. In Barrackpore, I tell my students: 'The stack is your friend – it remembers the operands until an operator tells you what to do.' Use the interactive tool to experiment with different expressions and variable values. It helps build intuition for how the stack grows and shrinks during evaluation."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-400">
          <FAQTemplate
            title="Expression Evaluation – FAQs"
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