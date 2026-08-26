import React, { useState, useCallback } from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import infixToPrefixRulesJava from "./topic15_files/InfixToPrefixRules.java?raw";
import questions from "./topic15_files/topic15_questions";

// ---------- Styles ----------
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

// ---------- Shared helpers ----------
const PRECEDENCE = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
const isOperator = (c) => c in PRECEDENCE;
const isOperand = (c) => /[a-zA-Z0-9]/.test(c);
const reverseString = (s) => s.split('').reverse().join('');
const swapParentheses = (s) => s.split('').map(c => c === '(' ? ')' : c === ')' ? '(' : c).join('');

// ---------- 1. Infix → Postfix (standard) with trace ----------
function infixToPostfixWithTrace(infix) {
    const traces = [];
    let step = 0;
    let output = '';
    const stack = [];

    const record = (token, action) => {
        traces.push({
            step: ++step,
            token: token,
            action: action,
            stack: stack.length === 0 ? '[]' : '[' + stack.join(' ') + ']',
            output: output || '""',
            stackArray: stack.slice(),
            outputString: output,
        });
    };

    const tokens = infix.match(/([A-Za-z0-9]+|[+\-*/^()])/g);
    if (!tokens) throw new Error('Invalid expression');

    for (const ch of tokens) {
        let action = '';
        if (isOperand(ch)) {
            output += ch;
            action = `Append operand '${ch}'`;
        } else if (ch === '(') {
            stack.push(ch);
            action = `Push '('`;
        } else if (ch === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                const popped = stack.pop();
                output += popped;
                action += `Pop '${popped}' → output; `;
            }
            if (stack.length && stack[stack.length - 1] === '(') {
                stack.pop();
                action += "Discard '('";
            } else {
                throw new Error('Mismatched parentheses');
            }
        } else if (isOperator(ch)) {
            while (
                stack.length &&
                stack[stack.length - 1] !== '(' &&
                PRECEDENCE[stack[stack.length - 1]] &ge; PRECEDENCE[ch]
            ) {
                const popped = stack.pop();
                output += popped;
                action += `Pop '${popped}' (≥ precedence); `;
            }
            stack.push(ch);
            action += `Push '${ch}'`;
        } else {
            throw new Error(`Invalid character '${ch}'`);
        }
        record(ch, action);
    }

    while (stack.length) {
        const popped = stack.pop();
        output += popped;
        record('END', `Pop remaining '${popped}'`);
    }

    return { traces, postfix: output };
}

// ---------- 2. Infix → Prefix with trace (mirror method, swap) ----------
function infixToPrefixWithTrace(infix) {
    const traces = [];
    let step = 0;

    const record = (token, action, stackArr, outputStr, extra = {}) => {
        traces.push({
            step: ++step,
            token: token,
            action: action,
            stack: stackArr.length === 0 ? '[]' : '[' + stackArr.join(' ') + ']',
            output: outputStr || '""',
            stackArray: stackArr.slice(),
            outputString: outputStr || '',
            ...extra,
        });
    };

    // Step 1: Reverse
    const reversed = reverseString(infix);
    record('REVERSE', `Reverse infix: "${infix}" → "${reversed}"`, [], '', { reversed, swapped: null });

    // Step 2: Swap parentheses
    const swapped = swapParentheses(reversed);
    record('SWAP', `Swap parentheses: "${reversed}" → "${swapped}"`, [], '', { reversed, swapped });

    // Step 3: Modified postfix (do NOT pop equal precedence)
    let output = '';
    const stack = [];
    record('START', 'Start processing swapped expression', stack, output, { reversed, swapped });

    for (const ch of swapped) {
        let action = '';
        if (isOperand(ch)) {
            output += ch;
            action = `Append operand '${ch}'`;
        } else if (ch === '(') {
            stack.push(ch);
            action = `Push '('`;
        } else if (ch === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                const popped = stack.pop();
                output += popped;
                action += `Pop '${popped}' → output; `;
            }
            if (stack.length && stack[stack.length - 1] === '(') {
                stack.pop();
                action += "Discard '('";
            } else {
                throw new Error('Mismatched parentheses');
            }
        } else if (isOperator(ch)) {
            // KEY DIFFERENCE: only pop if strictly greater (not >=)
            while (
                stack.length &&
                stack[stack.length - 1] !== '(' &&
                PRECEDENCE[stack[stack.length - 1]] > PRECEDENCE[ch]
            ) {
                const popped = stack.pop();
                output += popped;
                action += `Pop '${popped}' (> precedence); `;
            }
            stack.push(ch);
            action += `Push '${ch}'`;
        } else {
            throw new Error(`Invalid character '${ch}'`);
        }
        record(ch, action, stack, output, { reversed, swapped });
    }

    while (stack.length) {
        const popped = stack.pop();
        output += popped;
        record('END', `Pop remaining '${popped}'`, stack, output, { reversed, swapped });
    }

    // Step 4: Reverse output → prefix
    const prefix = reverseString(output);
    record('REVERSE', `Reverse output "${output}" → "${prefix}"`, [], prefix, { reversed, swapped });

    return { traces, prefix };
}

// ---------- 3. Infix → Prefix without swapping (direct right‑to‑left) ----------
function infixToPrefixDirectWithTrace(infix) {
    const traces = [];
    let step = 0;
    const tokens = infix.match(/([A-Za-z0-9]+|[+\-*/^()])/g);
    if (!tokens) throw new Error('Invalid expression');

    const output = [];
    const stack = [];
    let outputString = '';

    const record = (token, action, stackArr, outArr) => {
        const outStr = outArr.join('');
        traces.push({
            step: ++step,
            token: token,
            action: action,
            stack: stackArr.length === 0 ? '[]' : '[' + stackArr.join(' ') + ']',
            output: outStr || '""',
            stackArray: stackArr.slice(),
            outputString: outStr,
        });
    };

    // Scan from right to left
    for (let i = tokens.length - 1; i >= 0; i--) {
        const ch = tokens[i];
        let action = '';
        const stackBefore = stack.slice();
        const outBefore = output.slice();

        if (isOperand(ch)) {
            output.push(ch);
            action = `Append operand '${ch}' to output (reverse order)`;
        } else if (ch === ')') {
            stack.push(ch);
            action = `Push ')' (treated as opening marker)`;
        } else if (ch === '(') {
            while (stack.length && stack[stack.length - 1] !== ')') {
                const popped = stack.pop();
                output.push(popped);
                action += `Pop '${popped}' → output; `;
            }
            if (stack.length && stack[stack.length - 1] === ')') {
                stack.pop();
                action += "Discard ')'";
            } else {
                throw new Error('Mismatched parentheses');
            }
        } else if (isOperator(ch)) {
            // Pop operators with higher or equal precedence (but right‑associative '^' does NOT pop equal)
            while (
                stack.length &&
                stack[stack.length - 1] !== ')' &&
                (PRECEDENCE[stack[stack.length - 1]] > PRECEDENCE[ch] ||
                    (PRECEDENCE[stack[stack.length - 1]] === PRECEDENCE[ch] && ch !== '^'))
            ) {
                const popped = stack.pop();
                output.push(popped);
                action += `Pop '${popped}' (≥ precedence); `;
            }
            stack.push(ch);
            action += `Push '${ch}'`;
        } else {
            throw new Error(`Invalid character '${ch}'`);
        }
        record(ch, action, stack, output);
    }

    while (stack.length) {
        const popped = stack.pop();
        output.push(popped);
        record('END', `Pop remaining '${popped}'`, stack, output);
    }

    // Reverse the output to get the final prefix
    const prefix = output.reverse().join('');
    record('REVERSE', `Reverse output → "${prefix}"`, [], []);

    return { traces, prefix };
}

// ---------- Visual Stack Component (shared) ----------
function VisualStack({ traces, currentStep, title = "Stack (top → bottom)" }) {
    if (!traces || traces.length === 0) return null;
    const trace = traces[currentStep] || traces[traces.length - 1];

    const stackItems = trace.stackArray || [];
    const outputStr = trace.outputString || '';
    const currentChar = trace.token || '';
    const action = trace.action || '';

    return (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
                    <div className="flex flex-col-reverse items-start space-y-reverse space-y-1 min-h-[80px]">
                        {stackItems.length === 0 ? (
                            <div className="text-sm text-gray-400 dark:text-gray-500 italic">(empty)</div>
                        ) : (
                            stackItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700 rounded text-sm font-mono text-indigo-800 dark:text-indigo-200 shadow-sm"
                                >
                                    {item}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="mb-2">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Token</h3>
                        <div className="text-lg font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {currentChar === 'END' ? '⏹ End' : currentChar || '—'}
                        </div>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Output</h3>
                        <div className="font-mono text-base bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 min-h-[40px]">
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

// ---------- Generic Tracer Component (reusable) ----------
function Tracer({ convertFn, resultLabel, placeholder, defaultExpr, examples = ['A+B', 'A+B*C', '(A+B)*C', 'A*B+C*D', 'A+B*C-D', 'A^B^C'] }) {
    const [expr, setExpr] = useState(defaultExpr || 'A+B');
    const [traces, setTraces] = useState([]);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [currentStep, setCurrentStep] = useState(0);

    const handleConvert = useCallback(() => {
        setError('');
        try {
            const { traces, ...rest } = convertFn(expr);
            setTraces(traces);
            setResult(rest.postfix || rest.prefix || '');
            setCurrentStep(0);
        } catch (e) {
            setError(e.message);
            setTraces([]);
            setResult('');
            setCurrentStep(0);
        }
    }, [expr, convertFn]);

    const handleClear = () => {
        setExpr('');
        setTraces([]);
        setResult('');
        setError('');
        setCurrentStep(0);
    };

    const goToStep = (index) => {
        if (index &ge; 0 && index < traces.length) setCurrentStep(index);
    };

    // Keyboard navigation
    React.useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') goToStep(currentStep + 1);
            if (e.key === 'ArrowLeft') goToStep(currentStep - 1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [currentStep, traces.length]);

    return (
        <div className="mt-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <div className="flex-1 w-full">
                    <input
                        type="text"
                        value={expr}
                        onChange={(e) => setExpr(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <button onClick={handleConvert} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors">
                        Convert
                    </button>
                    <button onClick={handleClear} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors">
                        Clear
                    </button>
                </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Examples:</span>
                {examples.map((ex) => (
                    <button key={ex} onClick={() => setExpr(ex)} className="px-3 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full hover:border-indigo-500 transition-colors"&gt;
                        {ex}
                    </button>
                ))}
            </div>

            {error && (
                <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                    ⚠️ {error}
                </div>
            )}

            {result && (
                <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                    <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">✅ {resultLabel}</div>
                    <div className="mt-1 font-mono text-xl font-bold text-emerald-800 dark:text-emerald-200">{result}</div>
                </div>
            )}

            {traces.length &gt; 0 && (
                <div className="mt-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Step:</span>
                        <button onClick={() => goToStep(currentStep - 1)} disabled={currentStep === 0} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"&gt;◀</button>
                        <span className="text-sm font-mono">{currentStep + 1} / {traces.length}</span>
                        <button onClick={() => goToStep(currentStep + 1)} disabled={currentStep === traces.length - 1} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"&gt;▶</button>
                        <input type="range" min={0} max={traces.length - 1} value={currentStep} onChange={(e) => goToStep(parseInt(e.target.value))} className="w-48 accent-indigo-600 dark:accent-indigo-400" /&gt;
                    </div>

                    <VisualStack traces={traces} currentStep={currentStep} title="Stack (top → bottom)" />

                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-2">
                        <div className="grid grid-cols-2 gap-1">
                            <div><span className="font-medium">Token:</span> {traces[currentStep].token}</div>
                            <div><span className="font-medium">Stack:</span> {traces[currentStep].stack}</div>
                            <div className="col-span-2"><span className="font-medium">Output:</span> {traces[currentStep].output}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ---------- Main Component ----------
export default function Topic15() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

                {/* HEADER */}
                <header className="animate-fadeUp">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Rules for Infix to Prefix Conversion
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                        Interactive visual tools to trace both infix → postfix and two different infix → prefix methods.
                    </p>
                </header>

                {/* THEORY */}
                <section className="animate-fadeUp delay-100">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
                            Why Convert to Prefix?
                        </h2>
                        <div className="mt-4 space-y-4">
                            <p>
                                <strong className="text-indigo-600 dark:text-indigo-400">Prefix notation</strong> (Polish notation)
                                places the operator before its operands. It eliminates parentheses and precedence rules.
                            </p>
                            <p>
                                There are two common approaches to convert infix to prefix:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                                <li><strong>Mirror method (with swap):</strong> Reverse → swap parentheses → modified postfix (pop only &gt;) → reverse again.</li>
                                <li><strong>Direct method (no swap):</strong> Scan the original infix from <strong>right to left</strong>, treat <code>)</code> as opening and <code>(</code> as closing, then reverse the output.</li>
                            </ul>
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">💡 Key insight:</span> Both methods yield the same prefix. The direct method avoids the explicit parenthesis swap by changing the scan direction.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---- 1. Infix → Postfix Tracer ---- */}
                <section className="animate-fadeUp delay-200">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
                            📌 First: Infix → Postfix (Standard Algorithm)
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Left‑to‑right scan, pop ≥ precedence. No reversal.
                        </p>
                        <Tracer
                            convertFn={infixToPostfixWithTrace}
                            resultLabel="Postfix Result"
                            placeholder="e.g., (A+B)*C"
                            defaultExpr="(A+B)*C"
                        />
                    </div>
                </section>

                {/* ---- 2. Infix → Prefix with Swap ---- */}
                <section className="animate-fadeUp delay-300">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
                            🔄 Infix → Prefix (Mirror Method – with swap)
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Reverse → swap parentheses → modified postfix (pop only &gt;) → reverse again.
                        </p>
                        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                                🧠 How it Works
                            </h4>

                            <div className="space-y-2 text-sm leading-7 text-gray-700 dark:text-gray-300">
                                <p>
                                    This method converts an <strong>Infix</strong> expression to a
                                    <strong> Prefix</strong> expression by transforming the problem into
                                    an <strong>Infix to Postfix</strong> conversion. It first creates a
                                    mirror image of the expression, generates its postfix form, and
                                    finally reverses the result to obtain the required prefix
                                    expression.
                                </p>

                                <ol className="list-decimal list-inside space-y-2 ml-2">
                                    <li>
                                        <strong>Reverse</strong> the original infix expression.
                                    </li>

                                    <li>
                                        <strong>Swap the parentheses</strong> so that every
                                        <code className="px-1 mx-1 bg-gray-200 dark:bg-gray-700 rounded">
                                            (
                                        </code>
                                        becomes
                                        <code className="px-1 mx-1 bg-gray-200 dark:bg-gray-700 rounded">
                                            )
                                        </code>
                                        and every
                                        <code className="px-1 mx-1 bg-gray-200 dark:bg-gray-700 rounded">
                                            )
                                        </code>
                                        becomes
                                        <code className="px-1 mx-1 bg-gray-200 dark:bg-gray-700 rounded">
                                            (
                                        </code>.
                                        This restores the correct grouping after reversing.
                                    </li>

                                    <li>
                                        Convert the modified expression to <strong>Postfix</strong>
                                        using a stack.
                                    </li>

                                    <li>
                                        When an <strong>operator</strong> is encountered, compare it
                                        with the <strong>operator at the top of the stack</strong>.
                                        Pop the top operator <strong>only if it has higher precedence</strong>
                                        than the current operator. If both operators have
                                        <strong> equal precedence</strong>, <strong>do not pop</strong>;
                                        instead, push the current operator onto the stack. This preserves
                                        the correct associativity after the expression has been reversed.
                                    </li>

                                    <li>
                                        After scanning the entire expression, pop all remaining
                                        operators from the stack and append them to the postfix output.
                                    </li>

                                    <li>
                                        Finally, <strong>reverse the postfix expression</strong> to
                                        obtain the required <strong>Prefix expression</strong>.
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <Tracer
                            convertFn={infixToPrefixWithTrace}
                            resultLabel="Prefix Result"
                            placeholder="e.g., (A+B)*C"
                            defaultExpr="(A+B)*C"
                        />
                    </div>
                </section>

                {/* ---- 3. Infix → Prefix Direct (no swap) ---- */}
                <section className="animate-fadeUp delay-400">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
                            🚀 Infix → Prefix Direct (no swap, right‑to‑left scan)
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Scan from right to left, treat <code>)</code> as opening and <code>(</code> as closing, then reverse output at the end.
                        </p>
                        <div className="mt-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">
                                🧠 How it Works
                            </h4>

                            <div className="space-y-2 text-sm leading-7 text-gray-700 dark:text-gray-300">
                                <p>
                                    This method converts an <strong>Infix</strong> expression to a
                                    <strong> Prefix</strong> expression <strong>without reversing the
                                        expression or swapping the parentheses</strong>.
                                </p>

                                <ol className="list-decimal list-inside space-y-2 ml-2">
                                    <li>
                                        Scan the original expression from <strong>right to left</strong>.
                                    </li>

                                    <li>
                                        If the symbol is an <strong>operand</strong>, append it directly
                                        to the output. The output is built in
                                        <strong> reverse order</strong>.
                                    </li>

                                    <li>
                                        If the symbol is an <strong>operator</strong>, compare its precedence
                                        with the <strong>operator at the top of the stack</strong>. If the
                                        <strong> top stack operator</strong> has <strong>higher precedence </strong>
                                        than the current (fetched) operator, pop it and append it to the output.
                                        If both operators have <strong>equal precedence</strong>, also pop the
                                        top operator, except when both are
                                        <code className="px-1 mx-1 bg-gray-200 dark:bg-gray-700 rounded">^</code>,
                                        because the exponent operator is <strong>right-associative</strong>.
                                        Finally, push the current operator onto the stack.
                                    </li>

                                    <li>
                                        Treat
                                        <code className="px-1 mx-1 bg-gray-200 dark:bg-gray-700 rounded">
                                            )
                                        </code>
                                        as the <strong>opening marker</strong> and push it onto the stack.
                                        Treat
                                        <code className="px-1 mx-1 bg-gray-200 dark:bg-gray-700 rounded">
                                            (
                                        </code>
                                        as the <strong>closing marker</strong>; pop operators until the
                                        matching
                                        <code className="px-1 mx-1 bg-gray-200 dark:bg-gray-700 rounded">
                                            )
                                        </code>
                                        is found.
                                    </li>

                                    <li>
                                        After scanning the entire expression, pop any remaining operators
                                        from the stack and append them to the output.
                                    </li>

                                    <li>
                                        Finally, <strong>reverse the output</strong> to obtain the
                                        correct <strong>Prefix expression</strong>.
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <Tracer
                            convertFn={infixToPrefixDirectWithTrace}
                            resultLabel="Prefix Result (Direct)"
                            placeholder="e.g., (A+B)*C"
                            defaultExpr="(A+B)*C"
                        />
                    </div>
                </section>

                {/* ---- NEW: Step‑by‑Step Prefix Examples (static tables) ---- */}
                <section className="animate-fadeUp delay-500">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
                            📖 Step‑by‑Step Prefix Examples
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            These tables show the complete trace using the mirror method (reverse → swap → modified postfix → reverse).
                        </p>

                        {/* Example 1: A+B */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 1: <code>A + B</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">"A+B" → "B+A"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">"B+A" → "B+A" (no parentheses)</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">BA</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop + → output</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">BA+</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">Reverse "BA+" → "+AB"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">+AB</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">+AB</strong></p>
                        </div>

                        {/* Example 2: A+B*C */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 2: <code>A + B * C</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">"A+B*C" → "C*B+A"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">No parentheses</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop * (&gt;), push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB*</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB*A</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB*A+</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">Reverse → "+A*BC"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">+A*BC</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">+A*BC</strong></p>
                        </div>

                        {/* Example 3: (A+B)*C */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 3: <code>(A + B) * C</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">"(A+B)*C" → "C*)B+A("</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">"C*(B+A)"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">(</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push (</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* (]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CB</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[* ( +]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">)</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop +, discard (</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA+</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">10</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">CBA+*</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">11</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">Reverse → "*+ABC"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">*+ABC</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">*+ABC</strong></p>
                        </div>

                        {/* Example 4: A*B+C*D */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 4: <code>A * B + C * D</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">"A*B+C*D" → "D*C+B*A"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">No parentheses</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[*]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop * (&gt;), push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*B</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">* &gt; +, push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*B</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+ *]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*BA</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">10</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop *, pop +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC*BA*+</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">11</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">Reverse → "+*AB*CD"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">+*AB*CD</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">+*AB*CD</strong></p>
                        </div>

                        {/* Example 5: A+B*C-D */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 5: <code>A + B * C - D</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">1</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">"A+B*C-D" → "D-C*B+A"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">2</td><td className="p-2 border border-gray-200 dark:border-gray-700">SWAP</td><td className="p-2 border border-gray-200 dark:border-gray-700">No parentheses</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">3</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">4</td><td className="p-2 border border-gray-200 dark:border-gray-700">-</td><td className="p-2 border border-gray-200 dark:border-gray-700">Push -</td><td className="p-2 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-2 border border-gray-200 dark:border-gray-700">D</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">5</td><td className="p-2 border border-gray-200 dark:border-gray-700">C</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[-]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">6</td><td className="p-2 border border-gray-200 dark:border-gray-700">*</td><td className="p-2 border border-gray-200 dark:border-gray-700">* &gt; -, push *</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- *]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DC</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">7</td><td className="p-2 border border-gray-200 dark:border-gray-700">B</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[- *]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DCB</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">8</td><td className="p-2 border border-gray-200 dark:border-gray-700">+</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop * (&gt;), pop - (&gt;), push +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DCB*-</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">9</td><td className="p-2 border border-gray-200 dark:border-gray-700">A</td><td className="p-2 border border-gray-200 dark:border-gray-700">Append operand</td><td className="p-2 border border-gray-200 dark:border-gray-700">[+]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DCB*-A</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">10</td><td className="p-2 border border-gray-200 dark:border-gray-700">END</td><td className="p-2 border border-gray-200 dark:border-gray-700">Pop +</td><td className="p-2 border border-gray-200 dark:border-gray-700">[]</td><td className="p-2 border border-gray-200 dark:border-gray-700">DCB*-A+</td></tr>
                                        <tr><td className="p-2 border border-gray-200 dark:border-gray-700">11</td><td className="p-2 border border-gray-200 dark:border-gray-700">REVERSE</td><td className="p-2 border border-gray-200 dark:border-gray-700">Reverse → "+A-*BCD"</td><td className="p-2 border border-gray-200 dark:border-gray-700">—</td><td className="p-2 border border-gray-200 dark:border-gray-700">+A-*BCD</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">+A-*BCD</strong></p>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm">
                                🔑 <span className="font-medium">Observation:</span> In the modified postfix step, we only pop when the incoming operator has <strong>strictly greater</strong> precedence than the top of the stack. This preserves right‑associativity and is the key difference from the postfix algorithm.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---- More Complex Step‑by‑Step Prefix Examples ---- */}
                <section className="animate-fadeUp delay-100">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-rose-500 rounded-full"></span>
                            🧩 More Complex Prefix Examples
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            These traces include multiple parentheses, different operators, and exponentiation.
                        </p>

                        {/* Example 6: (A+B)*(C-D) */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 6: <code>(A + B) * (C - D)</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"(A+B)*(C-D)" → ")D-C(*)B+A("</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"(D-C)*(B+A)"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[(]</td><td className="p-2 border"></td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">D</td><td className="p-2 border">Append operand</td><td className="p-2 border">[(]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[( -]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">C</td><td className="p-2 border">Append operand</td><td className="p-2 border">[( -]</td><td className="p-2 border">DC</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">)</td><td className="p-2 border">Pop -, discard (</td><td className="p-2 border">[]</td><td className="p-2 border">DC-</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">*</td><td className="p-2 border">Push *</td><td className="p-2 border">[*]</td><td className="p-2 border">DC-</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[* (]</td><td className="p-2 border">DC-</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">B</td><td className="p-2 border">Append operand</td><td className="p-2 border">[* (]</td><td className="p-2 border">DC-B</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[* ( +]</td><td className="p-2 border">DC-B</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">A</td><td className="p-2 border">Append operand</td><td className="p-2 border">[* ( +]</td><td className="p-2 border">DC-BA</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[*]</td><td className="p-2 border">DC-BA+</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">END</td><td className="p-2 border">Pop *</td><td className="p-2 border">[]</td><td className="p-2 border">DC-BA+*</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "*+AB-CD"</td><td className="p-2 border">—</td><td className="p-2 border">*+AB-CD</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">*+AB-CD</strong></p>
                        </div>

                        {/* Example 7: A*(B+C)-D/E */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 7: <code>A * (B + C) - D / E</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"A*(B+C)-D/E" → "E/D-)C+B(*A"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"E/D-(C+B)*A"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">E</td><td className="p-2 border">Append operand</td><td className="p-2 border">[]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">/</td><td className="p-2 border">Push /</td><td className="p-2 border">[/]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">D</td><td className="p-2 border">Append operand</td><td className="p-2 border">[/]</td><td className="p-2 border">ED</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">-</td><td className="p-2 border">Pop / (&gt;), push -</td><td className="p-2 border">[-]</td><td className="p-2 border">ED/</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[- (]</td><td className="p-2 border">ED/</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">C</td><td className="p-2 border">Append operand</td><td className="p-2 border">[- (]</td><td className="p-2 border">ED/C</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[- ( +]</td><td className="p-2 border">ED/C</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">B</td><td className="p-2 border">Append operand</td><td className="p-2 border">[- ( +]</td><td className="p-2 border">ED/CB</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[-]</td><td className="p-2 border">ED/CB+</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">*</td><td className="p-2 border">* &gt; -, push *</td><td className="p-2 border">[- *]</td><td className="p-2 border">ED/CB+</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">A</td><td className="p-2 border">Append operand</td><td className="p-2 border">[- *]</td><td className="p-2 border">ED/CB+A</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">END</td><td className="p-2 border">Pop *, pop -</td><td className="p-2 border">[]</td><td className="p-2 border">ED/CB+A*-</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "-*A+BC/DE"</td><td className="p-2 border">—</td><td className="p-2 border">-*A+BC/DE</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">-*A+BC/DE</strong></p>
                        </div>

                        {/* Example 8: (A+B)*(C-D)+E/F */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 8: <code>(A + B) * (C - D) + E / F</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"(A+B)*(C-D)+E/F" → "F/E+)D-C(*)B+A("</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"F/E+(D-C)*(B+A)"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">F</td><td className="p-2 border">Append operand</td><td className="p-2 border">[]</td><td className="p-2 border">F</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">/</td><td className="p-2 border">Push /</td><td className="p-2 border">[/]</td><td className="p-2 border">F</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">E</td><td className="p-2 border">Append operand</td><td className="p-2 border">[/]</td><td className="p-2 border">FE</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">+</td><td className="p-2 border">Pop / (&gt;), push +</td><td className="p-2 border">[+]</td><td className="p-2 border">FE/</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[+ (]</td><td className="p-2 border">FE/</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">D</td><td className="p-2 border">Append operand</td><td className="p-2 border">[+ (]</td><td className="p-2 border">FE/D</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[+ ( -]</td><td className="p-2 border">FE/D</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">C</td><td className="p-2 border">Append operand</td><td className="p-2 border">[+ ( -]</td><td className="p-2 border">FE/DC</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">)</td><td className="p-2 border">Pop -, discard (</td><td className="p-2 border">[+]</td><td className="p-2 border">FE/DC-</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">*</td><td className="p-2 border">* &gt; +, push *</td><td className="p-2 border">[+ *]</td><td className="p-2 border">FE/DC-</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[+ * (]</td><td className="p-2 border">FE/DC-</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">B</td><td className="p-2 border">Append operand</td><td className="p-2 border">[+ * (]</td><td className="p-2 border">FE/DC-B</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[+ * ( +]</td><td className="p-2 border">FE/DC-B</td></tr>
                                        <tr><td className="p-2 border">16</td><td className="p-2 border">A</td><td className="p-2 border">Append operand</td><td className="p-2 border">[+ * ( +]</td><td className="p-2 border">FE/DC-BA</td></tr>
                                        <tr><td className="p-2 border">17</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[+ *]</td><td className="p-2 border">FE/DC-BA+</td></tr>
                                        <tr><td className="p-2 border">18</td><td className="p-2 border">END</td><td className="p-2 border">Pop *, pop +</td><td className="p-2 border">[]</td><td className="p-2 border">FE/DC-BA+*+</td></tr>
                                        <tr><td className="p-2 border">19</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "+*+AB-CD/EF"</td><td className="p-2 border">—</td><td className="p-2 border">+*+AB-CD/EF</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">+*+AB-CD/EF</strong></p>
                        </div>

                        {/* Example 9: A^B^C (right-associative) */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 9: <code>A ^ B ^ C</code> (Right‑Associative)</h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"A^B^C" → "C^B^A"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">No parentheses</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">C</td><td className="p-2 border">Append operand</td><td className="p-2 border">[]</td><td className="p-2 border">C</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">^</td><td className="p-2 border">Push ^</td><td className="p-2 border">[^]</td><td className="p-2 border">C</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">B</td><td className="p-2 border">Append operand</td><td className="p-2 border">[^]</td><td className="p-2 border">CB</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">^</td><td className="p-2 border">Equal precedence but right‑assoc → DO NOT pop; push ^</td><td className="p-2 border">[^ ^]</td><td className="p-2 border">CB</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">A</td><td className="p-2 border">Append operand</td><td className="p-2 border">[^ ^]</td><td className="p-2 border">CBA</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">END</td><td className="p-2 border">Pop ^, pop ^</td><td className="p-2 border">[]</td><td className="p-2 border">CBA^^</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "^^ABC"</td><td className="p-2 border">—</td><td className="p-2 border">^^ABC</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">^^ABC</strong></p>
                        </div>

                        {/* Example 10: (A+B)*(C-D)/(E+F) */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 10: <code>(A + B) * (C - D) / (E + F)</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Step</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Token</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Action</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Stack</th>
                                            <th className="p-2 border border-gray-200 dark:border-gray-700 text-left">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"(A+B)*(C-D)/(E+F)" → ")F+E(/)D-C(*)B+A("</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"(F+E)/(D-C)*(B+A)"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[(]</td><td className="p-2 border"></td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">F</td><td className="p-2 border">Append operand</td><td className="p-2 border">[(]</td><td className="p-2 border">F</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[( +]</td><td className="p-2 border">F</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">E</td><td className="p-2 border">Append operand</td><td className="p-2 border">[( +]</td><td className="p-2 border">FE</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[]</td><td className="p-2 border">FE+</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">/</td><td className="p-2 border">Push /</td><td className="p-2 border">[/]</td><td className="p-2 border">FE+</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[/ (]</td><td className="p-2 border">FE+</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">D</td><td className="p-2 border">Append operand</td><td className="p-2 border">[/ (]</td><td className="p-2 border">FE+D</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[/ ( -]</td><td className="p-2 border">FE+D</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">C</td><td className="p-2 border">Append operand</td><td className="p-2 border">[/ ( -]</td><td className="p-2 border">FE+DC</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">)</td><td className="p-2 border">Pop -, discard (</td><td className="p-2 border">[/]</td><td className="p-2 border">FE+DC-</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">*</td><td className="p-2 border">* &gt; /, push *</td><td className="p-2 border">[/ *]</td><td className="p-2 border">FE+DC-</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[/ * (]</td><td className="p-2 border">FE+DC-</td></tr>
                                        <tr><td className="p-2 border">16</td><td className="p-2 border">B</td><td className="p-2 border">Append operand</td><td className="p-2 border">[/ * (]</td><td className="p-2 border">FE+DC-B</td></tr>
                                        <tr><td className="p-2 border">17</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[/ * ( +]</td><td className="p-2 border">FE+DC-B</td></tr>
                                        <tr><td className="p-2 border">18</td><td className="p-2 border">A</td><td className="p-2 border">Append operand</td><td className="p-2 border">[/ * ( +]</td><td className="p-2 border">FE+DC-BA</td></tr>
                                        <tr><td className="p-2 border">19</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[/ *]</td><td className="p-2 border">FE+DC-BA+</td></tr>
                                        <tr><td className="p-2 border">20</td><td className="p-2 border">END</td><td className="p-2 border">Pop *, pop /</td><td className="p-2 border">[]</td><td className="p-2 border">FE+DC-BA+*/</td></tr>
                                        <tr><td className="p-2 border">21</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "/*+AB-CD+EF"</td><td className="p-2 border">—</td><td className="p-2 border">/*+AB-CD+EF</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Final prefix: <strong className="text-indigo-600 dark:text-indigo-400">/*+AB-CD+EF</strong></p>
                        </div>

                        <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-200 dark:border-rose-800">
                            <p className="text-sm">
                                🧠 <span className="font-medium">Remember:</span> In the modified postfix step, we only pop when the incoming operator has <strong>strictly higher</strong> precedence than the top of the stack – this preserves right‑associativity (e.g., for <code>^</code>). Equal precedence is <strong>not</strong> popped.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---- 10 More Advanced Prefix Examples ---- */}
                <section className="animate-fadeUp delay-200">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-teal-500 rounded-full"></span>
                            🔢 Advanced Prefix Examples – 10 More
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            These examples cover deeper nesting, exponentiation chains, and mixed associativity.
                        </p>

                        {/* Example 11: A+B*C-D */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 11: <code>A + B * C - D</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"A+B*C-D" → "D-C*B+A"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">No parentheses</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[-]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[-]</td><td className="p-2 border">DC</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">*</td><td className="p-2 border">* &gt; -, push *</td><td className="p-2 border">[- *]</td><td className="p-2 border">DC</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[- *]</td><td className="p-2 border">DCB</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">+</td><td className="p-2 border">Pop * (&gt;), pop - (&gt;), push +</td><td className="p-2 border">[+]</td><td className="p-2 border">DCB*-</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[+]</td><td className="p-2 border">DCB*-A</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">END</td><td className="p-2 border">Pop +</td><td className="p-2 border">[]</td><td className="p-2 border">DCB*-A+</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "+A-*BCD"</td><td className="p-2 border">—</td><td className="p-2 border">+A-*BCD</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">+A-*BCD</strong></p>
                        </div>

                        {/* Example 12: (A+B)*C-D/E */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 12: <code>(A + B) * C - D / E</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"(A+B)*C-D/E" → "E/D-C*)B+A("</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"E/D-C*(B+A)"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">E</td><td className="p-2 border">Append</td><td className="p-2 border">[]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">/</td><td className="p-2 border">Push /</td><td className="p-2 border">[/]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[/]</td><td className="p-2 border">ED</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">-</td><td className="p-2 border">Pop / (&gt;), push -</td><td className="p-2 border">[-]</td><td className="p-2 border">ED/</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[-]</td><td className="p-2 border">ED/C</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">*</td><td className="p-2 border">* &gt; -, push *</td><td className="p-2 border">[- *]</td><td className="p-2 border">ED/C</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[- * (]</td><td className="p-2 border">ED/C</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[- * (]</td><td className="p-2 border">ED/CB</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[- * ( +]</td><td className="p-2 border">ED/CB</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[- * ( +]</td><td className="p-2 border">ED/CBA</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[- *]</td><td className="p-2 border">ED/CBA+</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">END</td><td className="p-2 border">Pop *, pop -</td><td className="p-2 border">[]</td><td className="p-2 border">ED/CBA+*-</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "-*+ABC/DE"</td><td className="p-2 border">—</td><td className="p-2 border">-*+ABC/DE</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">-*+ABC/DE</strong></p>
                        </div>

                        {/* Example 13: A*B+C/D-E */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 13: <code>A * B + C / D - E</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"A*B+C/D-E" → "E-D/C+B*A"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">No parentheses</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">E</td><td className="p-2 border">Append</td><td className="p-2 border">[]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[-]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[-]</td><td className="p-2 border">ED</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">/</td><td className="p-2 border">/ &gt; -, push /</td><td className="p-2 border">[- /]</td><td className="p-2 border">ED</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[- /]</td><td className="p-2 border">EDC</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">+</td><td className="p-2 border">Pop / (&gt;), push +</td><td className="p-2 border">[- +]</td><td className="p-2 border">EDC/</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[- +]</td><td className="p-2 border">EDC/B</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">*</td><td className="p-2 border">* &gt; +, push *</td><td className="p-2 border">[- + *]</td><td className="p-2 border">EDC/B</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[- + *]</td><td className="p-2 border">EDC/BA</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">END</td><td className="p-2 border">Pop *, pop +, pop -</td><td className="p-2 border">[]</td><td className="p-2 border">EDC/BA*+-</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "-+*AB/CDE"</td><td className="p-2 border">—</td><td className="p-2 border">-+*AB/CDE</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">-+*AB/CDE</strong></p>
                        </div>

                        {/* Example 14: (A-B)*(C+D) */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 14: <code>(A - B) * (C + D)</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"(A-B)*(C+D)" → ")D+C(*)B-A("</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"(D+C)*(B-A)"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[(]</td><td className="p-2 border"></td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[(]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[( +]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[( +]</td><td className="p-2 border">DC</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[]</td><td className="p-2 border">DC+</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">*</td><td className="p-2 border">Push *</td><td className="p-2 border">[*]</td><td className="p-2 border">DC+</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[* (]</td><td className="p-2 border">DC+</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[* (]</td><td className="p-2 border">DC+B</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[* ( -]</td><td className="p-2 border">DC+B</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[* ( -]</td><td className="p-2 border">DC+BA</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">)</td><td className="p-2 border">Pop -, discard (</td><td className="p-2 border">[*]</td><td className="p-2 border">DC+BA-</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">END</td><td className="p-2 border">Pop *</td><td className="p-2 border">[]</td><td className="p-2 border">DC+BA-*</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "*-AB+CD"</td><td className="p-2 border">—</td><td className="p-2 border">*-AB+CD</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">*-AB+CD</strong></p>
                        </div>

                        {/* Example 15: A/(B-C)+D*E */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 15: <code>A / (B - C) + D * E</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"A/(B-C)+D*E" → "E*D+)C-B(/A"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"E*D+(C-B)/A"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">E</td><td className="p-2 border">Append</td><td className="p-2 border">[]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">*</td><td className="p-2 border">Push *</td><td className="p-2 border">[*]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[*]</td><td className="p-2 border">ED</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">+</td><td className="p-2 border">Pop * (&gt;), push +</td><td className="p-2 border">[+]</td><td className="p-2 border">ED*</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[+ (]</td><td className="p-2 border">ED*</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[+ (]</td><td className="p-2 border">ED*C</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[+ ( -]</td><td className="p-2 border">ED*C</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[+ ( -]</td><td className="p-2 border">ED*CB</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">)</td><td className="p-2 border">Pop -, discard (</td><td className="p-2 border">[+]</td><td className="p-2 border">ED*CB-</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">/</td><td className="p-2 border">/ &gt; +, push /</td><td className="p-2 border">[+ /]</td><td className="p-2 border">ED*CB-</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[+ /]</td><td className="p-2 border">ED*CB-A</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">END</td><td className="p-2 border">Pop /, pop +</td><td className="p-2 border">[]</td><td className="p-2 border">ED*CB-A/+</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "+/*A-BC*DE"</td><td className="p-2 border">—</td><td className="p-2 border">+/*A-BC*DE</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">+/*A-BC*DE</strong></p>
                        </div>

                        {/* Example 16: (A+B)*(C-D)*(E+F) */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 16: <code>(A+B)*(C-D)*(E+F)</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"(A+B)*(C-D)*(E+F)" → ")F+E(*)D-C(*)B+A("</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"(F+E)*(D-C)*(B+A)"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[(]</td><td className="p-2 border"></td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">F</td><td className="p-2 border">Append</td><td className="p-2 border">[(]</td><td className="p-2 border">F</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[( +]</td><td className="p-2 border">F</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">E</td><td className="p-2 border">Append</td><td className="p-2 border">[( +]</td><td className="p-2 border">FE</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[]</td><td className="p-2 border">FE+</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">*</td><td className="p-2 border">Push *</td><td className="p-2 border">[*]</td><td className="p-2 border">FE+</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[* (]</td><td className="p-2 border">FE+</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[* (]</td><td className="p-2 border">FE+D</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[* ( -]</td><td className="p-2 border">FE+D</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[* ( -]</td><td className="p-2 border">FE+DC</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">)</td><td className="p-2 border">Pop -, discard (</td><td className="p-2 border">[*]</td><td className="p-2 border">FE+DC-</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">*</td><td className="p-2 border">Pop * (equal, left‑assoc? Actually * is left‑assoc, so pop), push *</td><td className="p-2 border">[*]</td><td className="p-2 border">FE+DC-*</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[* (]</td><td className="p-2 border">FE+DC-*</td></tr>
                                        <tr><td className="p-2 border">16</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[* (]</td><td className="p-2 border">FE+DC-*B</td></tr>
                                        <tr><td className="p-2 border">17</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[* ( +]</td><td className="p-2 border">FE+DC-*B</td></tr>
                                        <tr><td className="p-2 border">18</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[* ( +]</td><td className="p-2 border">FE+DC-*BA</td></tr>
                                        <tr><td className="p-2 border">19</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[*]</td><td className="p-2 border">FE+DC-*BA+</td></tr>
                                        <tr><td className="p-2 border">20</td><td className="p-2 border">END</td><td className="p-2 border">Pop *</td><td className="p-2 border">[]</td><td className="p-2 border">FE+DC-*BA+*</td></tr>
                                        <tr><td className="p-2 border">21</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "*+AB*-CD+EF"</td><td className="p-2 border">—</td><td className="p-2 border">*+AB*-CD+EF</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">*+AB*-CD+EF</strong></p>
                        </div>

                        {/* Example 17: A^B^C^D (right-assoc chain) */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 17: <code>A ^ B ^ C ^ D</code> (right‑assoc)</h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"A^B^C^D" → "D^C^B^A"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">No parentheses</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">^</td><td className="p-2 border">Push ^</td><td className="p-2 border">[^]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[^]</td><td className="p-2 border">DC</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">^</td><td className="p-2 border">right‑assoc → DO NOT pop equal, push ^</td><td className="p-2 border">[^ ^]</td><td className="p-2 border">DC</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[^ ^]</td><td className="p-2 border">DCB</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">^</td><td className="p-2 border">right‑assoc → push ^</td><td className="p-2 border">[^ ^ ^]</td><td className="p-2 border">DCB</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[^ ^ ^]</td><td className="p-2 border">DCBA</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">END</td><td className="p-2 border">Pop ^, pop ^, pop ^</td><td className="p-2 border">[]</td><td className="p-2 border">DCBA^^^</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "^^^ABCD"</td><td className="p-2 border">—</td><td className="p-2 border">^^^ABCD</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">^^^ABCD</strong></p>
                        </div>

                        {/* Example 18: (A+B)^(C-D) */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 18: <code>(A + B) ^ (C - D)</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"(A+B)^(C-D)" → ")D-C(^)B+A("</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"(D-C)^(B+A)"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[(]</td><td className="p-2 border"></td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[(]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[( -]</td><td className="p-2 border">D</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[( -]</td><td className="p-2 border">DC</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">)</td><td className="p-2 border">Pop -, discard (</td><td className="p-2 border">[]</td><td className="p-2 border">DC-</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">^</td><td className="p-2 border">Push ^</td><td className="p-2 border">[^]</td><td className="p-2 border">DC-</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[^ (]</td><td className="p-2 border">DC-</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[^ (]</td><td className="p-2 border">DC-B</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[^ ( +]</td><td className="p-2 border">DC-B</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[^ ( +]</td><td className="p-2 border">DC-BA</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[^]</td><td className="p-2 border">DC-BA+</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">END</td><td className="p-2 border">Pop ^</td><td className="p-2 border">[]</td><td className="p-2 border">DC-BA+^</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "^+AB-CD"</td><td className="p-2 border">—</td><td className="p-2 border">^+AB-CD</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">^+AB-CD</strong></p>
                        </div>

                        {/* Example 19: A*B-C/D+E^F */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 19: <code>A * B - C / D + E ^ F</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"A*B-C/D+E^F" → "F^E+D/C-B*A"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">No parentheses</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">F</td><td className="p-2 border">Append</td><td className="p-2 border">[]</td><td className="p-2 border">F</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">^</td><td className="p-2 border">Push ^</td><td className="p-2 border">[^]</td><td className="p-2 border">F</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">E</td><td className="p-2 border">Append</td><td className="p-2 border">[^]</td><td className="p-2 border">FE</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">+</td><td className="p-2 border">Pop ^ (&gt;), push +</td><td className="p-2 border">[+]</td><td className="p-2 border">FE^</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[+]</td><td className="p-2 border">FE^D</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">/</td><td className="p-2 border">/ &gt; +, push /</td><td className="p-2 border">[+ /]</td><td className="p-2 border">FE^D</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[+ /]</td><td className="p-2 border">FE^DC</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">-</td><td className="p-2 border">Pop / (&gt;), pop + (&gt;), push -</td><td className="p-2 border">[-]</td><td className="p-2 border">FE^DC/-</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[-]</td><td className="p-2 border">FE^DC/-B</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">*</td><td className="p-2 border">* &gt; -, push *</td><td className="p-2 border">[- *]</td><td className="p-2 border">FE^DC/-B</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[- *]</td><td className="p-2 border">FE^DC/-BA</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">END</td><td className="p-2 border">Pop *, pop -</td><td className="p-2 border">[]</td><td className="p-2 border">FE^DC/-BA*-</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "-*AB-/CD+^EF"</td><td className="p-2 border">—</td><td className="p-2 border">-*AB-/CD+^EF</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">-*AB-/CD+^EF</strong></p>
                        </div>

                        {/* Example 20: ((A+B)*C-D)/E */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example 20: <code>((A + B) * C - D) / E</code></h3>
                            <div className="mt-2 overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        <tr><th className="p-2 border">Step</th><th className="p-2 border">Token</th><th className="p-2 border">Action</th><th className="p-2 border">Stack</th><th className="p-2 border">Output</th></tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-400">
                                        <tr><td className="p-2 border">1</td><td className="p-2 border">REVERSE</td><td className="p-2 border">"((A+B)*C-D)/E" → "E/)D-C*)B+A(("</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">2</td><td className="p-2 border">SWAP</td><td className="p-2 border">"E/(D-C*(B+A))"</td><td className="p-2 border">—</td><td className="p-2 border">—</td></tr>
                                        <tr><td className="p-2 border">3</td><td className="p-2 border">E</td><td className="p-2 border">Append</td><td className="p-2 border">[]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">4</td><td className="p-2 border">/</td><td className="p-2 border">Push /</td><td className="p-2 border">[/]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">5</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[/ (]</td><td className="p-2 border">E</td></tr>
                                        <tr><td className="p-2 border">6</td><td className="p-2 border">D</td><td className="p-2 border">Append</td><td className="p-2 border">[/ (]</td><td className="p-2 border">ED</td></tr>
                                        <tr><td className="p-2 border">7</td><td className="p-2 border">-</td><td className="p-2 border">Push -</td><td className="p-2 border">[/ ( -]</td><td className="p-2 border">ED</td></tr>
                                        <tr><td className="p-2 border">8</td><td className="p-2 border">C</td><td className="p-2 border">Append</td><td className="p-2 border">[/ ( -]</td><td className="p-2 border">EDC</td></tr>
                                        <tr><td className="p-2 border">9</td><td className="p-2 border">*</td><td className="p-2 border">* &gt; -, push *</td><td className="p-2 border">[/ ( - *]</td><td className="p-2 border">EDC</td></tr>
                                        <tr><td className="p-2 border">10</td><td className="p-2 border">(</td><td className="p-2 border">Push (</td><td className="p-2 border">[/ ( - * (]</td><td className="p-2 border">EDC</td></tr>
                                        <tr><td className="p-2 border">11</td><td className="p-2 border">B</td><td className="p-2 border">Append</td><td className="p-2 border">[/ ( - * (]</td><td className="p-2 border">EDCB</td></tr>
                                        <tr><td className="p-2 border">12</td><td className="p-2 border">+</td><td className="p-2 border">Push +</td><td className="p-2 border">[/ ( - * ( +]</td><td className="p-2 border">EDCB</td></tr>
                                        <tr><td className="p-2 border">13</td><td className="p-2 border">A</td><td className="p-2 border">Append</td><td className="p-2 border">[/ ( - * ( +]</td><td className="p-2 border">EDCBA</td></tr>
                                        <tr><td className="p-2 border">14</td><td className="p-2 border">)</td><td className="p-2 border">Pop +, discard (</td><td className="p-2 border">[/ ( - *]</td><td className="p-2 border">EDCBA+</td></tr>
                                        <tr><td className="p-2 border">15</td><td className="p-2 border">)</td><td className="p-2 border">Pop * (&gt; -), pop -, discard (</td><td className="p-2 border">[/]</td><td className="p-2 border">EDCBA+*-</td></tr>
                                        <tr><td className="p-2 border">16</td><td className="p-2 border">END</td><td className="p-2 border">Pop /</td><td className="p-2 border">[]</td><td className="p-2 border">EDCBA+*-/</td></tr>
                                        <tr><td className="p-2 border">17</td><td className="p-2 border">REVERSE</td><td className="p-2 border">Reverse → "/-*+ABCDE"</td><td className="p-2 border">—</td><td className="p-2 border">/-*+ABCDE</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Final prefix: <strong className="text-indigo-600">/-*+ABCDE</strong></p>
                        </div>

                        <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                            <p className="text-sm">
                                🎯 <span className="font-medium">Pro tip:</span> These examples cover the most common patterns encountered in interviews and exams. Practice tracing them until the rules become second nature.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---- Rules Summary ---- */}
                <section className="animate-fadeUp delay-100">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
                            Summary of Conversion Rules
                        </h2>
                        <ol className="mt-4 list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li><strong>Infix → Postfix:</strong> Scan left‑to‑right, pop ≥ precedence.</li>
                            <li><strong>Infix → Prefix (swap method):</strong>
                                <ul className="list-disc pl-6 mt-1">
                                    <li>Reverse the infix expression.</li>
                                    <li>Swap '(' and ')' in the reversed string.</li>
                                    <li>Apply a modified postfix algorithm (pop <strong>only</strong> for greater precedence, not equal).</li>
                                    <li>Reverse the output to get the prefix expression.</li>
                                </ul>
                            </li>
                            <li><strong>Infix → Prefix (direct method):</strong>
                                <ul className="list-disc pl-6 mt-1">
                                    <li>Scan the original infix from <strong>right to left</strong>.</li>
                                    <li>Treat ')' as an opening marker and '(' as a closing marker.</li>
                                    <li>For operators, pop while precedence is higher or (equal and not right‑associative).</li>
                                    <li>Reverse the final output to obtain prefix.</li>
                                </ul>
                            </li>
                        </ol>
                        <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm">
                                🔑 <span className="font-medium">Key difference:</span> In prefix, we <strong>do not</strong> pop equal‑precedence operators for right‑associative operators like <code>^</code>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ---- TIPS, PITFALLS, BEST PRACTICES, CHECKLIST, HINTS ---- */}
                <section className="animate-fadeUp delay-200">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
                            💡 Tips &amp; Tricks
                        </h2>
                        <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Always test with simple expressions like <code>A+B</code> to verify your conversion.</li>
                            <li>Remember that <code>^</code> is right‑associative – do not pop equal precedence.</li>
                            <li>In the direct method, the output is built in reverse order, so you must reverse at the end.</li>
                            <li>Use the interactive tools to compare the two prefix methods side‑by‑side.</li>
                        </ul>
                    </div>
                </section>

                <section className="animate-fadeUp delay-300">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
                            ⚠️ Common Pitfalls
                        </h2>
                        <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Forgetting to reverse at the end in either prefix method.</li>
                            <li>Not swapping parentheses in the mirror method.</li>
                            <li>Using postfix associativity (pop ≥) in the modified postfix step.</li>
                            <li>Mis‑handling parentheses in the direct method (treating '(' as opening instead of closing).</li>
                        </ul>
                    </div>
                </section>

                <section className="animate-fadeUp delay-400">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-green-500 rounded-full"></span>
                            ✅ Best Practices
                        </h2>
                        <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Implement each conversion as a pure function for easy testing.</li>
                            <li>Write unit tests for various expressions (including edge cases like single operand).</li>
                            <li>Add comments explaining the difference between postfix and prefix associativity.</li>
                            <li>Use the visual tracer to debug your own manual conversions.</li>
                        </ul>
                    </div>
                </section>

                <section className="animate-fadeUp delay-500">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
                            📋 Mini Checklist
                        </h2>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                "I understand the postfix algorithm.",
                                "I can explain the two prefix methods.",
                                "I know when to pop equal precedence.",
                                "I can trace the direct method on paper.",
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                    <span className="text-indigo-500 text-xl">☐</span>
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="animate-fadeUp delay-100">
                    <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-6 sm:p-8 border border-indigo-200 dark:border-indigo-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
                            🤔 Think About…
                        </h2>
                        <ul className="mt-4 list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            <li>Why does the direct method treat ')' as an opening marker?</li>
                            <li>What happens if you don't reverse the output in the direct method?</li>
                            <li>Can you convert <code>A^B^C</code> correctly with both prefix methods?</li>
                            <li>Which method do you find more intuitive?</li>
                        </ul>
                    </div>
                </section>

                {/* ---- JAVA EXAMPLE ---- */}
                <section className="animate-fadeUp delay-200">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="inline-block w-1 h-6 bg-orange-500 rounded-full"></span>
                            🖥️ Java Example
                        </h2>
                        <div className="mt-4">
                            <JavaFileLoader
                                fileModule={infixToPrefixRulesJava}
                                title="InfixToPrefixRules.java"
                                highlightLines={[]}
                            />
                        </div>
                    </div>
                </section>

                {/* ---- TEACHER’S NOTE ---- */}
                <div className="animate-fadeUp delay-300">
                    <Teacher
                        note={
                            "The direct method is often easier for students because it avoids the extra reversal and parenthesis swap. I recommend they step through both methods with the same expression to see that they produce identical prefix results."
                        }
                    />
                </div>

                {/* ---- FAQ ---- */}
                <div className="animate-fadeUp delay-400">
                    <FAQTemplate title="Infix to Prefix – FAQs" questions={questions} />
                </div>

                <footer className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© 2026 • Expression Conversion Course • Barrackpore, India</p>
                </footer>
            </div>
        </div>
    );
}