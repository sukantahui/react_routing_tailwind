import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import bcBasicSh from './topic4_files/bc_basic.sh?raw';
import bcVariablesSh from './topic4_files/bc_variables.sh?raw';
import bcAdvancedSh from './topic4_files/bc_advanced.sh?raw';
import bcScriptingSh from './topic4_files/bc_scripting.sh?raw';

/**
 * Topic4 Component: Performing calculations using bc command
 *
 * @component
 * @returns {JSX.Element} Rendered component with theory, examples, interactive snippets, and teaching notes.
 * @purpose To demonstrate the 'bc' command in Unix/Linux for arbitrary-precision arithmetic.
 * @usage Used in classroom environments to teach command-line calculations, scripting math, and precision handling.
 */
const Topic4 = () => {
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 1998;

  // Interactive calculator state
  const [expression, setExpression] = useState('10 * 3.14159');
  const [scale, setScale] = useState(2);
  const [bcResult, setBcResult] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    // Simulate bc calculation (in real component you'd eval or call API, but we simulate)
    try {
      // Simple eval for demo - in production you'd use a proper bc parser or backend
      // For simulation, we evaluate with JavaScript math but respect scale
      let expr = expression;
      // Replace ^ with ** for JS
      expr = expr.replace(/\^/g, '**');
      // Very basic safety: only allow numbers, operators, parentheses, sqrt, etc.
      // But since it's a demo, we do a simple eval with fallback
      let result;
      if (expr.includes('sqrt(')) {
        // Handle sqrt
        const match = expr.match(/sqrt\(([^)]+)\)/);
        if (match) result = Math.sqrt(parseFloat(match[1]));
        else result = eval(expr);
      } else {
        result = eval(expr);
      }
      result = result.toFixed(scale);
      setBcResult(result);
    } catch (e) {
      setBcResult('Error: invalid expression');
    }
  }, [expression, scale]);

  const keyframesStyle = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes subtlePulse {
      0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3); }
      70% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
      100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-slide-up, [class*="animate-"] {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
    .animate-fade-slide-up {
      animation: fadeSlideUp 0.5s ease-out forwards;
    }
    .animate-pulse-subtle {
      animation: subtlePulse 1.5s infinite;
    }
    .card-hover {
      transition: all 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
    }
    .svg-step-hover {
      transition: filter 0.2s ease, transform 0.2s ease;
    }
    .svg-step-hover:hover {
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
      transform: scale(1.02);
    }
    .teacher-note-hover {
      transition: background-color 0.2s ease, border-left-width 0.2s ease;
    }
    .teacher-note-hover:hover {
      background-color: rgba(59, 130, 246, 0.05);
      border-left-width: 6px;
    }
  `;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
      <style>{keyframesStyle}</style>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 animate-fade-slide-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
            🧮 The `bc` Command
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Arbitrary-precision calculator language — perform math from simple arithmetic to complex scripting.
          </p>
        </div>

        {/* Interactive Calculator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 transition-all duration-300 hover:shadow-xl card-hover">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-500">$</span> Try bc live
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Expression:</label>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono"
              placeholder="e.g., 10 * 3.14159"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Scale (decimal places):</label>
            <input
              type="number"
              value={scale}
              onChange={(e) => setScale(parseInt(e.target.value) || 0)}
              min="0"
              max="20"
              className="w-24 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span className="text-green-400">$</span>
              <span>echo "scale={scale}; {expression}" | bc</span>
            </div>
            <pre className={clsx('transition-opacity duration-300', isAnimating ? 'opacity-70' : 'opacity-100')}>
              {bcResult}
            </pre>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
            💡 `bc` stands for "basic calculator" — supports variables, functions, and conditionals.
          </p>
        </div>
      </section>

      {/* Theory Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-4">📖 What is `bc`?</h2>
              <p className="mb-3">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">bc</code> command is an arbitrary-precision calculator language.
                It can handle numbers of any size (limited only by memory) and supports decimal, binary, hex, and custom bases.
              </p>
              <p>
                Unlike shell arithmetic (`$(( ))`), `bc` handles floating-point numbers, has variables, loops, functions, and is fully programmable.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3 mb-4">🎯 Prototype & Signature</h2>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code>bc [ -hlwsqv ] [long-options] [ file ... ]</code>
              </div>
              <ul className="mt-4 space-y-2">
                <li><strong>Purpose:</strong> Perform arbitrary-precision arithmetic and script math operations.</li>
                <li><strong>Return:</strong> Outputs calculation result to stdout (exit 0 on success).</li>
                <li><strong>When used:</strong> When shell arithmetic is insufficient (floats, large numbers, complex expressions).</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-3 mb-4">🌍 Real-World Use Cases</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Scientific calculations:</strong> Pi to 1000 decimal places: <code className="text-sm">echo "scale=1000; 4*a(1)" | bc -l</code></li>
                <li><strong>Financial scripts:</strong> Interest calculations with exact decimal precision.</li>
                <li><strong>Unit conversions:</strong> Temperature, currency, or data size conversions in scripts.</li>
                <li><strong>System monitoring:</strong> Calculate average load, memory usage percentages.</li>
                <li><strong>Birthday/age calculations:</strong> Floating-point division of days.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <h2 className="text-2xl font-bold border-l-4 border-amber-500 pl-3 mb-4">💡 Professional Tips & Tricks</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Use `-l` for math library:</strong> Loads standard functions (sine, cosine, arctangent, natural log, exponential).</li>
                <li><strong>Set scale for decimal precision:</strong> <code className="text-sm">scale=10; 22/7</code> gives 10 decimal digits.</li>
                <li><strong>Use here-documents for multi-line scripts:</strong> <code className="text-sm">bc &lt;&lt; EOF ... EOF</code></li>
                <li><strong>Change input/output base:</strong> <code className="text-sm">obase=16; ibase=10; 255</code> → FF.</li>
                <li><strong>Define custom functions:</strong> <code className="text-sm">{`define f(x) { return x^2; }`}</code></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SVG Illustration */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">🔄 How `bc` Processes Expressions</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="30" width="180" height="80" rx="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="svg-step-hover" />
            <text x="110" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">1. User input</text>
            <text x="110" y="75" textAnchor="middle" fill="currentColor" fontSize="12">echo "10/3" | bc</text>
            
            <line x1="200" y1="70" x2="250" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow4)" />
            
            <rect x="260" y="30" width="180" height="80" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" className="svg-step-hover" />
            <text x="350" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">2. Parse & tokenize</text>
            <text x="350" y="75" textAnchor="middle" fill="currentColor" fontSize="12">variable, number, operator</text>
            
            <line x1="440" y1="70" x2="490" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow4)" />
            
            <rect x="500" y="30" width="180" height="80" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" className="svg-step-hover" />
            <text x="590" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">3. Evaluate</text>
            <text x="590" y="75" textAnchor="middle" fill="currentColor" fontSize="12">arbitrary-precision arithmetic</text>
            
            <line x1="680" y1="70" x2="730" y2="70" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow4)" />
            
            <rect x="740" y="30" width="140" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" className="svg-step-hover" />
            <text x="810" y="55" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold">4. Output</text>
            <text x="810" y="75" textAnchor="middle" fill="currentColor" fontSize="12">3.333333...</text>

            <defs>
              <marker id="arrow4" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
              </marker>
            </defs>

            <text x="450" y="200" textAnchor="middle" fill="#6b7280" fontSize="12" fontStyle="italic">Input → parsing → arbitrary evaluation → formatted result</text>
            <circle cx="810" cy="180" r="15" fill="#ef4444" fillOpacity="0.3">
              <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="810" y="184" textAnchor="middle" fill="currentColor" fontSize="10">Result</text>
          </svg>
        </div>
      </section>

      {/* Shell Scripts */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold">📁 Practical Shell Scripts</h2>
        <div className="grid gap-6">
          <ShellFileLoader fileModule={bcBasicSh} title="Basic Arithmetic" highlightLines={[4,10]} />
          <ShellFileLoader fileModule={bcVariablesSh} title="Variables & Scale" highlightLines={[6,14]} />
          <ShellFileLoader fileModule={bcAdvancedSh} title="Math Library & Base Conversion" highlightLines={[8,16]} />
          <ShellFileLoader fileModule={bcScriptingSh} title="Scripting with bc" highlightLines={[12,20]} />
        </div>
      </section>

      {/* Common Mistakes & Best Practices */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Forgetting to set scale:</strong> `bc` defaults to scale=0 (integer division). 5/2 = 2, not 2.5.</li>
            <li><strong>Confusing `ibase` and `obase` order:</strong> Set `obase` before `ibase` if they differ, because `ibase` affects how `obase` is read.</li>
            <li><strong>Using `^` for exponentiation:</strong> `bc` uses `^` (power), not `**`. However, in POSIX, `^` is used; GNU bc supports both.</li>
            <li><strong>Not quoting expressions with asterisks:</strong> `*` may be expanded by shell; use quotes or escape: `"3 * 4"`.</li>
            <li><strong>Assuming `bc -l` loads everything:</strong> It loads standard math functions but still uses scale=20; you may need to set scale separately.</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
          <h2 className="text-xl font-bold text-green-500 dark:text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Always set scale for decimal results:</strong> <code className="text-sm">scale=10</code> before division.</li>
            <li><strong>Use `bc &lt;&lt; EOF ... EOF` for multi-line calculations.</strong></li>
            <li><strong>Combine with `printf` for formatting:</strong> <code className="text-sm">printf "%.2f\n" $(bc &lt;&lt;&lt; "scale=2; 10/3")</code></li>
            <li><strong>Store results in variables:</strong> <code className="text-sm">result=$(bc &lt;&lt;&lt; "10 * 3.14")</code></li>
            <li><strong>For production scripts, validate inputs to avoid injection.</strong></li>
          </ul>
        </div>
      </section>

      {/* Hint & Mini Checklist */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-8 border-blue-400">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">💭 Think About...</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>What happens if you set `scale=0` and compute 5/2? Why is that useful in some cases?</li>
            <li>How would you calculate the square root of 2 to 50 decimal places?</li>
            <li>Why does `bc` treat numbers starting with 0 as octal by default? How to force decimal?</li>
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-8 border-green-400">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">📋 Student Mini Checklist</h2>
          <ul className="list-check space-y-2">
            <li>✅ Can perform basic arithmetic with `echo "2+2" | bc`.</li>
            <li>✅ Can set decimal precision using `scale`.</li>
            <li>✅ Can use `bc -l` for advanced math (sqrt, sin, cos, log).</li>
            <li>✅ Can convert between number bases (hex ↔ decimal).</li>
            <li>✅ Can write simple bc scripts with variables and conditionals.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.7s' }}>
        <FAQTemplate title="Frequently Asked Questions about bc Command" questions={questions} />
      </section>

      {/* Teacher's Note */}
      <section className="max-w-6xl mx-auto px-4 py-8 animate-fade-slide-up" style={{ animationDelay: '0.8s' }}>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border-l-8 border-indigo-500 teacher-note-hover transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center text-xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">Teacher's Note</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sukanta Hui • {experienceYears} years experience (since 1998)</p>
            </div>
          </div>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong>✉️ Email:</strong> sukantahui@codernaccotax.co.in | <strong>📞 Mobile:</strong> 7003756860</p>
            <p><strong>💻 Expertise:</strong> Programming Language, RDBMs, Operating System, Web Development</p>
            <hr className="my-3 border-gray-300 dark:border-gray-700" />
            <p><strong>🎓 Classroom Tip:</strong> When teaching `bc`, start with a calculator comparison: shell `$((5/2))` gives 2, but `bc` with scale gives 2.5. This immediately highlights why `bc` is needed for real-world math. Then demonstrate calculating compound interest or EMI — students appreciate the financial application.</p>
            <p><strong>⚠️ Remember:</strong> `bc` is not just a calculator; it's a programming language. Students can write loops and functions. Introduce them to `for (i=1; i &gt =10; i++)` to generate tables.</p>
            <p><strong>🚀 Pro Challenge:</strong> Write a bc script that computes the factorial of a number (n!). Use a loop and recursion. Then compute e^x using Taylor series. This shows bc's power for numerical methods.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic4;