// Topic20.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic20_files/topic20_questions';

const Topic20 = () => {
  // Interactive code demo state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [age, setAge] = useState(16);
  const [hasLicense, setHasLicense] = useState(false);

  // Complex condition demo
  const canAccessAdminPanel = isLoggedIn && (isAdmin || hasPermission);
  const canDrive = age >= 18 && hasLicense;
  const canVote = age >= 18;

  // Truth table for common logical conditions in programming
  const truthRows = [
    { a: true, b: true, and: true, or: true, notA: false, aImpB: true },
    { a: true, b: false, and: false, or: true, notA: false, aImpB: false },
    { a: false, b: true, and: false, or: true, notA: true, aImpB: true },
    { a: false, b: false, and: false, or: false, notA: true, aImpB: true },
  ];

  // Code snippet examples
  const codeExamples = [
    {
      title: "Basic if-else with logical AND",
      code: `if (isLoggedIn && isAdmin) {
    showAdminPanel();
} else {
    showLoginPage();
}`,
      explanation: "Both conditions must be true to show admin panel. This matches the AND (∧) operator."
    },
    {
      title: "OR for multiple acceptable conditions",
      code: `if (age >= 18 || hasParentalConsent) {
    allowAccess();
} else {
    denyAccess();
}`,
      explanation: "Access granted if either condition is true (OR)."
    },
    {
      title: "Negation in conditions",
      code: `if (!isBanned) {
    allowPost();
}`,
      explanation: "NOT operator flips the boolean value. Equivalent to 'if (isBanned == false)'."
    },
    {
      title: "Complex nested conditions simplified",
      code: `// Instead of:
if (user.isActive) {
    if (user.hasPaid) {
        if (!user.isSuspended) {
            grantAccess();
        }
    }
}

// Using logical AND:
if (user.isActive && user.hasPaid && !user.isSuspended) {
    grantAccess();
}`,
      explanation: "Flatten nested ifs using AND for better readability (exportation law)."
    },
    {
      title: "De Morgan in action",
      code: `// Instead of:
if (!(isWeekend && isHoliday)) { ... }

// Equivalent using De Morgan:
if (!isWeekend || !isHoliday) { ... }`,
      explanation: "De Morgan's law: ¬(A ∧ B) ≡ ¬A ∨ ¬B. Often more readable."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Application of Logic in Programming (if-else conditions)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            How logical operators and expressions power real-world code decisions
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">Logic is Everywhere in Code</h2>
          <p className="leading-relaxed">
            Every <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">if</code>, <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">else if</code>, <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">while</code>, and <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">for</code> condition uses propositional logic. The same logical operators you've learned (<strong>AND, OR, NOT, implication</strong>) are directly implemented in every programming language, though with different syntax (e.g., <code>&&</code>, <code>||</code>, <code>!</code>).
          </p>
          <p className="leading-relaxed mt-3">
            Understanding logic helps you write <strong>correct, readable, and efficient</strong> conditions. It also helps you avoid common bugs like off-by-one errors in boolean expressions or incorrect nested conditionals.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> Swadeep writes code for an online store. He needs to check: "If user is logged in AND has items in cart OR is a VIP member" — that's a logical expression combining AND and OR.</p>
          </div>
        </div>

        {/* Operator Mapping Table */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Logic → Programming Operators</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr><th className="px-3 py-2">Logic Operator</th><th className="px-3 py-2">Symbol</th><th className="px-3 py-2">Programming (C/Java/JS)</th><th className="px-3 py-2">Example</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                <tr><td className="px-3 py-1">AND (∧)</td><td className="px-3 py-1 font-mono">&amp;&amp;</td><td className="px-3 py-1">Logical AND</td><td className="px-3 py-1 font-mono">a && b</td></tr>
                <tr><td className="px-3 py-1">OR (∨)</td><td className="px-3 py-1 font-mono">||</td><td className="px-3 py-1">Logical OR</td><td className="px-3 py-1 font-mono">a || b</td></tr>
                <tr><td className="px-3 py-1">NOT (¬)</td><td className="px-3 py-1 font-mono">!</td><td className="px-3 py-1">Logical NOT</td><td className="px-3 py-1 font-mono">!a</td></tr>
                <tr><td className="px-3 py-1">Implication (⇒)</td><td className="px-3 py-1">→</td><td className="px-3 py-1">Not direct; use <code>!a || b</code></td><td className="px-3 py-1 font-mono">!a || b</td></tr>
                <tr><td className="px-3 py-1">Equivalence (⇔)</td><td className="px-3 py-1">↔</td><td className="px-3 py-1">Use <code>==</code> for booleans</td><td className="px-3 py-1 font-mono">a == b</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Note: In many languages, <code>=</code> is assignment; <code>==</code> is equality comparison.</p>
        </div>

        {/* Truth Table Reference */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">Truth Table for Programming Conditions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr><th>A</th><th>B</th><th>A &amp;&amp; B</th><th>A || B</th><th>!A</th><th>!A || B (A→B)</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                {truthRows.map((row, i) => (
                  <tr key={i}>
                    <td className="px-3 py-1 text-center">{row.a ? 'true' : 'false'}</td>
                    <td className="px-3 py-1 text-center">{row.b ? 'true' : 'false'}</td>
                    <td className="px-3 py-1 text-center">{row.and ? 'true' : 'false'}</td>
                    <td className="px-3 py-1 text-center">{row.or ? 'true' : 'false'}</td>
                    <td className="px-3 py-1 text-center">{row.notA ? 'true' : 'false'}</td>
                    <td className="px-3 py-1 text-center">{row.aImpB ? 'true' : 'false'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">These are the building blocks of every conditional statement.</p>
        </div>

        {/* Interactive Code Simulator */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🖥️ Interactive Condition Simulator</h2>
          <p className="mb-4">Toggle the values and watch how the conditions evaluate — just like a real program's if statements.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Demo 1: Admin Access */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">🔐 Admin Panel Access</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2"><input type="checkbox" checked={isLoggedIn} onChange={() => setIsLoggedIn(!isLoggedIn)} /> Logged In</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} /> Is Admin</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={hasPermission} onChange={() => setHasPermission(!hasPermission)} /> Has Permission</label>
              </div>
              <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <code className="text-sm">if (isLoggedIn && (isAdmin || hasPermission))</code>
                <p className="mt-1 font-bold">Result: {canAccessAdminPanel ? <span className="text-green-600">✅ Access Granted</span> : <span className="text-red-600">❌ Access Denied</span>}</p>
              </div>
            </div>

            {/* Demo 2: Driving Eligibility */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">🚗 Driving Eligibility</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">Age: <input type="number" min="0" max="120" value={age} onChange={(e) => setAge(parseInt(e.target.value) || 0)} className="w-16 px-1 border rounded dark:bg-gray-700" /></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={hasLicense} onChange={() => setHasLicense(!hasLicense)} /> Has License</label>
              </div>
              <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <code className="text-sm">if (age >= 18 && hasLicense)</code>
                <p className="mt-1 font-bold">Result: {canDrive ? <span className="text-green-600">✅ Can Drive</span> : <span className="text-red-600">❌ Cannot Drive</span>}</p>
                <code className="text-sm mt-2 block">if (age >= 18) // voting condition</code>
                <p className="font-bold">Voting Eligible: {canVote ? <span className="text-green-600">✅ Yes</span> : <span className="text-red-600">❌ No</span>}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 Notice how changing any input updates the condition results instantly — just like runtime evaluation.</p>
        </div>

        {/* Code Examples Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">💻 Real Code Examples</h2>
          <div className="space-y-4">
            {codeExamples.map((ex, idx) => (
              <div key={idx} className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-bold">{ex.title}</p>
                <pre className="bg-gray-900 text-green-400 p-2 rounded mt-1 text-xs overflow-x-auto"><code>{ex.code}</code></pre>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{ex.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Short-circuit Evaluation */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-3 mb-4">⚡ Short-circuit Evaluation</h2>
          <p>Most programming languages evaluate logical expressions lazily: for <code>A && B</code>, if A is false, B is never evaluated. For <code>A || B</code>, if A is true, B is never evaluated.</p>
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">// Example: prevents null pointer exception</p>
            <p className="font-mono">{`if (user != null && user.isActive) { ... }`}</p>
            <p className="mt-1">If <code>user</code> is null, the second part <code>user.isActive</code> is never evaluated, avoiding an error.</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">This is a key difference from pure mathematical logic where all subexpressions are evaluated.</p>
        </div>

        {/* Common Pitfalls in Programming Logic */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Programming Logic Mistakes</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>= vs == :</strong> Using assignment instead of equality comparison. <code>if (x = 5)</code> assigns 5 to x and the condition is true (non-zero).</li>
            <li><strong>Operator precedence confusion:</strong> <code>if (a || b && c)</code> is <code>a || (b && c)</code>, not <code>(a || b) && c</code>. Use parentheses.</li>
            <li><strong>Assuming implication works directly:</strong> Many languages don't have ⇒; use <code>!a || b</code>.</li>
            <li><strong>Negating conditions incorrectly:</strong> <code>if (!(a && b))</code> is <code>if (!a || !b)</code> (De Morgan).</li>
            <li><strong>Over-nesting conditionals:</strong> Instead of nested ifs, combine conditions with AND/OR for clarity.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices for Logical Conditions in Code</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Use parentheses to make precedence explicit</strong> — even if not strictly needed, they improve readability.</li>
            <li><strong>Prefer positive conditions</strong> over negative ones when possible (<code>if (isActive)</code> rather than <code>if (!isInactive)</code>).</li>
            <li><strong>Extract complex conditions into named boolean variables</strong> for clarity.</li>
            <li><strong>Apply De Morgan to simplify negated compound conditions.</strong></li>
            <li><strong>Use short-circuit evaluation to guard against errors</strong> (e.g., null checks before property access).</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Are you using correct operator (<code>&amp;&amp;</code>, <code>||</code>, <code>!</code>)?</li>
              <li>☑️ Have you used parentheses to avoid precedence issues?</li>
              <li>☑️ Is the condition easily readable? Could you name it?</li>
              <li>☑️ Have you considered short-circuit effects?</li>
              <li>☑️ Did you accidentally use assignment (=) instead of equality (==)?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <Teacher note="This topic bridges theory and practice. Show students how the logical laws they learned (De Morgan, distributivity, etc.) directly apply to simplifying code conditions. Use live coding demos to illustrate short-circuit evaluation. Emphasize that many bugs come from incorrect boolean logic — understanding truth tables helps catch them. Have students refactor nested ifs into flat conditions using AND/OR." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-1000">
          <FAQTemplate title="Logic in Programming FAQs" questions={questions} />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); }
          to { transform: translateY(0); }
        }
        .animate-\\[slideUp_0\\.5s_ease-out\\] {
          animation: slideUp 0.5s ease-out forwards;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[slideUp_0\\.5s_ease-out\\] {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic20;