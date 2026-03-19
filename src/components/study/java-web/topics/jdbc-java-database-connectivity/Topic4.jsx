// Topic4.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic4_files folder
import statementExample from "./topic4_files/StatementExample.java?raw";
import preparedStatementExample from "./topic4_files/PreparedStatementExample.java?raw";
import batchExample from "./topic4_files/BatchExample.java?raw";
import comparisonDemo from "./topic4_files/ComparisonDemo.java?raw";

const Topic4 = () => {
  // Calculate Sukanta Hui's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998; // started in 1998

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 min-h-screen py-8 px-4 transition-colors duration-300">
      {/* Scoped keyframe animations (respects reduced motion) */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Main container – all sections stacked */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* ===== SECTION 1: TITLE & INTRODUCTION ===== */}
        <section
          className="animate-[fadeSlideUp_0.6s_ease-out]"
          aria-label="Introduction to Statement vs PreparedStatement"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            ⚖️ Statement vs PreparedStatement
          </h1>
          <p className="text-lg leading-relaxed">
            In the previous topic, we used <code>Statement</code> to execute SQL queries. However, Java provides a more powerful and safer alternative:
            <code className="mx-1">PreparedStatement</code>. This topic explores the key differences, when to use each, and why
            <code>PreparedStatement</code> is almost always the better choice in real-world applications.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Debangshu</span> from Naihati is building a login system for his college.
            If he uses plain <code>Statement</code> and concatenates user input, his system could be hacked via
            <strong className="text-red-600 dark:text-red-400"> SQL injection</strong>. <code>PreparedStatement</code> prevents this.
          </p>
        </section>

        {/* ===== SECTION 2: COMPARISON TABLE ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="Comparison table"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📊 Key Differences
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <thead>
                <tr className="bg-indigo-100 dark:bg-indigo-900/40">
                  <th className="p-3 text-left font-semibold">Feature</th>
                  <th className="p-3 text-left font-semibold">Statement</th>
                  <th className="p-3 text-left font-semibold">PreparedStatement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-3 font-medium">SQL Injection</td>
                  <td className="p-3 text-red-600 dark:text-red-400">❌ Vulnerable</td>
                  <td className="p-3 text-green-600 dark:text-green-400">✅ Safe (precompiled)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-3 font-medium">Performance (repeated queries)</td>
                  <td className="p-3">Parsed every time → slower</td>
                  <td className="p-3">Precompiled once → faster</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-3 font-medium">Type safety</td>
                  <td className="p-3">No; values concatenated as strings</td>
                  <td className="p-3">Yes; setXxx() methods enforce types</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-3 font-medium">Readability</td>
                  <td className="p-3">SQL string messy with concatenation</td>
                  <td className="p-3">Clean SQL with placeholders (?)</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-3 font-medium">Binary data (BLOB)</td>
                  <td className="p-3">Difficult to handle</td>
                  <td className="p-3">Easy with setBinaryStream()</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-3 font-medium">When to use</td>
                  <td className="p-3">DDL, no parameters, one-time execution</td>
                  <td className="p-3">All DML with parameters, repeated executions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ===== SECTION 3: SQL INJECTION EXPLANATION (with SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="SQL injection explained"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🎭 SQL Injection Attack
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 180" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* User input box */}
              <rect x="20" y="20" width="120" height="60" rx="8" className="stroke-indigo-500 dark:stroke-indigo-400" />
              <text x="40" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">User Input</text>
              <text x="30" y="75" className="text-[8px] fill-gray-500" stroke="none">' OR '1'='1</text>

              {/* Statement concatenation */}
              <rect x="180" y="20" width="160" height="60" rx="8" className="stroke-red-500 dark:stroke-red-400" />
              <text x="200" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">String concatenation</text>
              <text x="190" y="75" className="text-[8px] fill-gray-500" stroke="none">"SELECT * FROM users WHERE name = '" + input + "'"</text>

              {/* Final dangerous query */}
              <rect x="380" y="20" width="200" height="60" rx="8" className="stroke-red-500 dark:stroke-red-400" />
              <text x="400" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Dangerous Query</text>
              <text x="390" y="75" className="text-[8px] fill-gray-500" stroke="none">SELECT * FROM users WHERE name = '' OR '1'='1'</text>

              {/* Animated arrow */}
              <line x1="140" y1="50" x2="180" y2="50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </line>
              <line x1="340" y1="50" x2="380" y2="50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </line>

              {/* Red X mark */}
              <circle cx="540" cy="90" r="15" className="stroke-red-500 fill-red-100 dark:fill-red-900/30" />
              <path d="M535 85 L545 95 M545 85 L535 95" stroke="red" strokeWidth="2" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Concatenating user input directly into SQL allows attackers to alter the query logic.
            <code>PreparedStatement</code> treats input as data only, never as part of the SQL command.
          </p>
        </section>

        {/* ===== SECTION 4: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-6"
          aria-label="Code examples comparing Statement and PreparedStatement"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔴 Statement (Vulnerable)</h3>
            <JavaFileLoader
              fileModule={statementExample}
              title="StatementExample.java"
              highlightLines={[9, 10, 11]} // vulnerable concatenation
            />

            <h3 className="text-xl font-medium mt-6">🟢 PreparedStatement (Safe & Efficient)</h3>
            <JavaFileLoader
              fileModule={preparedStatementExample}
              title="PreparedStatementExample.java"
              highlightLines={[8, 9, 10, 11, 12, 15]} // placeholders, setXxx, execute
            />

            <h3 className="text-xl font-medium mt-6">📦 Batch Processing with PreparedStatement</h3>
            <JavaFileLoader
              fileModule={batchExample}
              title="BatchExample.java"
              highlightLines={[11, 12, 13, 14, 16]} // addBatch(), executeBatch()
            />

            <h3 className="text-xl font-medium mt-6">⏱️ Performance Comparison Demo</h3>
            <JavaFileLoader
              fileModule={comparisonDemo}
              title="ComparisonDemo.java"
              highlightLines={[9, 15, 20, 21]} // timing loops
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Try changing this:</strong> In the Statement example, replace the username with
              <code>' OR '1'='1</code> and see what happens. Then try the same with PreparedStatement – it won't work.
            </p>
          </div>
        </section>

        {/* ===== SECTION 5: COMMON PITFALLS ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-3"
          aria-label="Common mistakes"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-red-200 dark:border-red-800 pb-2">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
            <li>Still concatenating parameters even when using <code>PreparedStatement</code> – defeats the purpose.</li>
            <li>Using <code>setXxx()</code> with wrong type (e.g., <code>setString</code> for an integer column).</li>
            <li>Forgetting to call <code>executeUpdate()</code> or <code>executeQuery()</code> after setting parameters.</li>
            <li>Not reusing <code>PreparedStatement</code> for batch operations – creates overhead.</li>
            <li>Using <code>Statement</code> for dynamic table/column names (can't use PreparedStatement for those).</li>
            <li>Ignoring SQL injection risks in reporting tools that use dynamic queries.</li>
          </ul>
        </section>

        {/* ===== SECTION 6: BEST PRACTICES ===== */}
        <section
          className="animate-[fadeSlideUp_1.1s_ease-out] space-y-3"
          aria-label="Best practices"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-green-200 dark:border-green-800 pb-2">
            ✅ Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
            <li>Always use <code>PreparedStatement</code> for queries with user input.</li>
            <li>Use <code>Statement</code> only for DDL (CREATE, ALTER) or when no parameters are needed.</li>
            <li>Set parameter types explicitly (<code>setString</code>, <code>setInt</code>, etc.) – don't rely on conversion.</li>
            <li>Reuse <code>PreparedStatement</code> in loops or batches for performance.</li>
            <li>Close <code>PreparedStatement</code> in finally block or try-with-resources.</li>
            <li>For dynamic table/column names, validate against a whitelist.</li>
          </ul>
        </section>

        {/* ===== SECTION 7: TIPS & TRICKS ===== */}
        <section
          className="animate-[fadeSlideUp_1.2s_ease-out] space-y-3"
          aria-label="Professional tips"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-amber-200 dark:border-amber-800 pb-2">
            🧠 Tips & Tricks
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>🔹 <strong>Generated keys:</strong> Use <code>PreparedStatement.RETURN_GENERATED_KEYS</code> to retrieve auto-increment IDs.</li>
              <li>🔹 <strong>Named parameters:</strong> Some databases support named parameters via vendor-specific extensions.</li>
              <li>🔹 <strong>Logging:</strong> To debug, log the SQL with parameter values (but be careful not to log sensitive data).</li>
              <li>🔹 <strong>Performance tip:</strong> For repeated inserts, use batch with <code>PreparedStatement</code> (Topic 8).</li>
              <li>🔹 <strong>Swadeep's trick:</strong> Use <code>setObject()</code> when the type is dynamic, but prefer typed methods for clarity.</li>
            </ul>
          </div>
        </section>

        {/* ===== SECTION 8: TEACHER'S NOTE ===== */}
        <section
          className="animate-[fadeSlideUp_1.3s_ease-out] space-y-3"
          aria-label="Teacher's note"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            👩‍🏫 Teacher's Note
          </h2>
          <div
            className={clsx(
              "bg-indigo-100 dark:bg-indigo-900/40 p-5 rounded-xl",
              "transition-all duration-300 hover:shadow-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/60"
            )}
          >
            <p className="font-bold text-indigo-900 dark:text-indigo-100">Sukanta Hui</p>
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              📧 sukantahui@codernaccotax.co.in | 📞 7003756860
            </p>
            <p className="text-sm mt-1">
              💼 {experience} years of experience in Programming, RDBMS, OS, Web Development.
            </p>
            <p className="mt-3">
              <span className="font-semibold">Point to remember:</span> SQL injection is one of the most critical web vulnerabilities.
              Teach students to <strong>never trust user input</strong>. PreparedStatement is their first line of defense.
              <br />
              <span className="italic">
                "Abhronila, think of PreparedStatement as a template with blanks – you fill in the blanks with safe values,
                but the structure remains fixed."
              </span>
            </p>
          </div>
        </section>

        {/* ===== SECTION 9: MINI CHECKLIST ===== */}
        <section
          className="animate-[fadeSlideUp_1.4s_ease-out] space-y-3"
          aria-label="Quick checklist"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2">
            📋 Mini Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
            <ul className="space-y-2">
              <li>✔️ I understand SQL injection and why it's dangerous.</li>
              <li>✔️ I can explain the difference between Statement and PreparedStatement.</li>
              <li>✔️ I know how to create and use PreparedStatement with placeholders.</li>
              <li>✔️ I can use <code>setXxx()</code> methods correctly.</li>
              <li>✔️ I know when to use Statement vs PreparedStatement.</li>
              <li>✔️ I can implement batch updates with PreparedStatement.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic4;