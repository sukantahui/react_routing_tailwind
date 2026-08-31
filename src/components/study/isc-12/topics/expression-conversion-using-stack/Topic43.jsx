import React, { useState } from "react";
import clsx from "clsx";

// Custom components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import compilerApplicationsJava from "./topic43_files/CompilerApplications.java?raw";
import questions from "./topic43_files/topic43_questions";

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

// ---------- Interactive Compiler Simulator ----------
function CompilerSimulator() {
  const [sourceCode, setSourceCode] = useState('int result = a + b * c;');
  const [output, setOutput] = useState('');
  const [steps, setSteps] = useState([]);
  const [showSteps, setShowSteps] = useState(false);

  const simulateCompilation = () => {
    // Simulate a simple compiler pipeline:
    // 1. Tokenize
    // 2. Parse (infix expression extraction)
    // 3. Convert to postfix
    // 4. Generate assembly-like code

    const tokens = sourceCode.split(/\s+/);
    // Extract expression part (assuming simple pattern)
    const exprMatch = sourceCode.match(/=\s*([^;]+);/);
    if (!exprMatch) {
      setOutput('No expression found. Use pattern: variable = expression;');
      setSteps([]);
      return;
    }

    const infixExpr = exprMatch[1].replace(/\s/g, '');
    const stepsArr = [];
    stepsArr.push({ step: '1. Tokenization', detail: tokens.join(', ') });

    // Convert infix to postfix (simple version, no associativity check)
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
    const outputStack = [];
    const opStack = [];
    let postfix = '';
    for (const ch of infixExpr) {
      if (ch.match(/[a-zA-Z0-9]/)) {
        postfix += ch;
      } else if (ch === '(') {
        opStack.push(ch);
      } else if (ch === ')') {
        while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
          postfix += opStack.pop();
        }
        opStack.pop();
      } else if (ch in precedence) {
        while (opStack.length > 0 && opStack[opStack.length - 1] !== '(' &&
               precedence[opStack[opStack.length - 1]] >= precedence[ch]) {
          postfix += opStack.pop();
        }
        opStack.push(ch);
      }
    }
    while (opStack.length > 0) postfix += opStack.pop();
    stepsArr.push({ step: '2. Infix to Postfix', detail: postfix });

    // Generate assembly (hypothetical)
    const assembly = postfix.split('').reduce((acc, token) => {
      if (token.match(/[a-zA-Z0-9]/)) {
        acc.push(`LOAD ${token}`);
      } else {
        const right = acc.pop();
        const left = acc.pop();
        acc.push(`${token.toUpperCase()} ${left} ${right}`);
      }
      return acc;
    }, []);
    stepsArr.push({ step: '3. Assembly-like Code Generation', detail: assembly.join('; ') });

    setSteps(stepsArr);
    setOutput(`Compiled successfully! Result stored in variable. Assembly: ${assembly.join('; ')}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">⚙️ Compiler Simulator</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Enter a simple assignment statement with an expression. The simulator will tokenize, convert to postfix, and generate hypothetical assembly code.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Source Code (Java-like)
          </label>
          <input
            type="text"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="int result = a + b * c;"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          />
        </div>

        <button
          onClick={simulateCompilation}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors"
        >
          Compile
        </button>

        {output && (
          <div className="mt-3 p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">✅ Compilation Output</div>
            <div className="mt-1 font-mono text-sm text-gray-800 dark:text-gray-200">{output}</div>
          </div>
        )}

        {steps.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              {showSteps ? 'Hide Steps' : 'Show Steps'}
            </button>
            {showSteps && (
              <div className="mt-2 space-y-2">
                {steps.map((s, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="font-medium text-sm text-gray-700 dark:text-gray-300">{s.step}</div>
                    <div className="font-mono text-sm text-gray-800 dark:text-gray-200">{s.detail}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export default function Topic43() {
  const javaCode = typeof compilerApplicationsJava === 'string'
    ? compilerApplicationsJava
    : '// Java code not available';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Compiler Applications
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            How expression conversion and evaluation power modern compilers and interpreters.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              The Compiler Pipeline
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                A compiler translates source code (e.g., Java, C++) into machine code or bytecode. Expression
                conversion and evaluation play a crucial role in several compiler phases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Lexical Analysis:</strong> Breaking source code into tokens (operators, operands, keywords).</li>
                <li><strong>Parsing:</strong> Building an Abstract Syntax Tree (AST) from tokens, where expressions are represented as trees.</li>
                <li><strong>Intermediate Representation (IR):</strong> Converting AST to a linear representation like postfix or three‑address code.</li>
                <li><strong>Optimization:</strong> Applying transformations to the IR to improve performance.</li>
                <li><strong>Code Generation:</strong> Translating the IR to target machine code.</li>
              </ul>
              <p>
                Expression conversion (infix → postfix/prefix) is central to the IR generation phase, making it easier
                for the compiler to generate efficient code.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">💡 Key insight:</span> Postfix and prefix notations eliminate precedence
                  and parentheses, simplifying the compiler's code generation logic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STAGES IN DETAIL */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              How Compilers Use Expression Conversion
            </h2>
            <div className="mt-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">1. Lexical Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The lexer recognizes tokens: identifiers (<code>a</code>, <code>b</code>), operators (<code>+</code>, <code>*</code>), and literals (<code>5</code>). It produces a token stream for the parser.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Example: <code>a + b * c</code> → Tokens: <code>IDENT(a) PLUS IDENT(b) STAR IDENT(c)</code>
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">2. Parsing (AST Construction)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The parser builds an Abstract Syntax Tree (AST) that represents the expression's structure, respecting precedence and parentheses.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Example: <code>a + b * c</code> → AST: <code>+</code> with left <code>a</code> and right <code>*</code> (with children <code>b</code> and <code>c</code>).
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">3. Intermediate Representation (IR)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The AST is linearized into a form like postfix or three‑address code. Postfix is common because it can be evaluated with a stack and is easy to generate code from.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Example: <code>a + b * c</code> → Postfix: <code>a b c * +</code>
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">4. Optimization</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The IR can be transformed to improve performance (e.g., constant folding, removing redundant operations).
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Example: <code>2 * 3</code> → constant fold to <code>6</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">5. Code Generation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The IR is translated to machine code or bytecode. Postfix/prefix expressions naturally map to stack‑based machine instructions (e.g., JVM bytecode).
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Example: Postfix <code>a b c * +</code> → JVM: <code>iload a; iload b; iload c; imul; iadd;</code>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE COMPILER SIMULATOR */}
        <section className="animate-fadeUp delay-300">
          <CompilerSimulator />
        </section>

        {/* REAL-WORLD COMPILER EXAMPLES */}
        <section className="animate-fadeUp delay-400">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full"></span>
              Real‑World Compilers
            </h2>
            <div className="mt-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Java Compiler (javac)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Javac parses Java source into an AST, then generates bytecode for the JVM. Expression conversion is used to generate stack‑based bytecode instructions like <code>iadd</code>, <code>imul</code>, etc.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">GCC (GNU Compiler Collection)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  GCC uses a multi-stage pipeline: front-end (parsing) → GIMPLE (IR) → RTL (Register Transfer Language) → assembly. Expression conversion is used in the IR generation phase.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Python Interpreter (CPython)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  CPython compiles Python source to bytecode for the Python Virtual Machine. Expressions are compiled to bytecode instructions like <code>BINARY_OP</code> for addition.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">LLVM (Low Level Virtual Machine)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  LLVM is a compiler infrastructure that uses a language‑independent IR. Expressions are converted to LLVM IR instructions that can be optimized and target multiple architectures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OPTIMIZATION TECHNIQUES */}
        <section className="animate-fadeUp delay-500">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-purple-500 rounded-full"></span>
              Optimization Techniques Using Expression Conversion
            </h2>
            <div className="mt-4 space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Constant Folding</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Expressions with constant operands are evaluated at compile time. Example: <code>2 + 3</code> → <code>5</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Strength Reduction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Replacing expensive operations with cheaper ones. Example: <code>x * 2</code> → <code>x + x</code> or <code>x &lt;&lt; 1</code>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Common Subexpression Elimination</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Reusing computed values. Example: <code>a + b * c</code> and <code>d + b * c</code> → compute <code>b * c</code> once.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-700 dark:text-gray-300">Dead Code Elimination</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Removing expressions that are never used. Example: <code>int x = 5; int y = x + 3; // y never used</code> → remove <code>y</code>.
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
              💡 Tips for Compiler Designers
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use postfix/prefix notation as an intermediate representation to simplify code generation.</li>
              <li>Leverage stack machines (e.g., JVM, Python VM) to evaluate expressions efficiently.</li>
              <li>Apply optimizations like constant folding early to reduce work later.</li>
              <li>Use symbol tables for variable resolution and type checking.</li>
              <li>Consider using ANTLR or other parser generators to build expression parsers.</li>
            </ul>
          </div>
        </section>

        {/* COMMON PITFALLS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 dark:hover:shadow-red-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-red-500 rounded-full"></span>
              ⚠️ Common Pitfalls in Compiler Implementation
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Incorrect precedence handling during parsing leads to wrong ASTs.</li>
              <li>Not handling associativity correctly for operators like exponentiation.</li>
              <li>Generating inefficient code due to poor optimization.</li>
              <li>Not handling scope and variable resolution correctly.</li>
              <li>Memory leaks due to AST and symbol table management.</li>
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
              <li>Design your compiler pipeline clearly: Lexer → Parser → Semantics → IR → Optimizer → Code Gen.</li>
              <li>Use visitor patterns to traverse ASTs and generate code.</li>
              <li>Write unit tests for each compiler phase.</li>
              <li>Use existing tools (e.g., ANTLR, Bison) to generate parsers.</li>
              <li>Optimize incrementally and measure performance.</li>
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
                "I understand how compilers use expression conversion.",
                "I know the phases of a compiler pipeline.",
                "I can explain postfix/prefix use in IR generation.",
                "I understand common optimization techniques.",
                "I can design a simple expression compiler.",
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
              <li>How would you handle operator precedence in a parser?</li>
              <li>What are the trade-offs between stack‑based and register‑based code generation?</li>
              <li>How can you implement constant folding in a compiler?</li>
              <li>Try designing a simple expression compiler for a stack machine.</li>
            </ul>
          </div>
        </section>

        {/* JAVA CODE EXAMPLE */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-orange-500 rounded-full"></span>
              🖥️ Java Example: Simple Expression Compiler
            </h2>
            <div className="mt-4">
              <JavaFileLoader
                fileModule={javaCode}
                title="CompilerApplications.java"
                highlightLines={[]}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This program demonstrates a simple compiler pipeline: tokenization, infix-to-postfix conversion, and code generation.
            </p>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-200">
          <Teacher
            note={
              "Compiler applications bring together everything we've learned about expression conversion. In Barrackpore, I tell my students: 'A compiler is just a series of transformations – from human-readable code to machine-executable code.' Understanding how expressions are converted and evaluated is fundamental to building any compiler. Use the simulator to see the pipeline in action."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-300">
          <FAQTemplate
            title="Compiler Applications – FAQs"
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