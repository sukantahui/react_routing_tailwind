// Topic6.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic6_files folder
import basicTransaction from "./topic6_files/BasicTransaction.java?raw";
import transactionRollback from "./topic6_files/TransactionRollback.java?raw";
import transactionIsolation from "./topic6_files/TransactionIsolationDemo.java?raw";

const Topic6 = () => {
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
          aria-label="Introduction to Transaction Management"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            🔄 Transaction Management
          </h1>
          <p className="text-lg leading-relaxed">
            A <strong>transaction</strong> is a unit of work that consists of one or more SQL statements that must be
            executed completely or not at all. Transaction management ensures data integrity and consistency,
            following the <span className="font-semibold">ACID</span> properties.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Tuhina</span> from Shyamnagar is building a banking system. When she transfers
            money from Swadeep's account to Abhronila's account, both the debit and credit must succeed together.
            If one fails, the entire operation must be rolled back.
          </p>
        </section>

        {/* ===== SECTION 2: ACID PROPERTIES ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="ACID properties"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🧪 ACID Properties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Atomicity */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 text-center"
              )}
            >
              <div className="text-4xl mb-2 text-blue-600 dark:text-blue-400">⚛️</div>
              <h3 className="text-xl font-bold">Atomicity</h3>
              <p className="text-sm mt-1">All or nothing – transaction completes fully or not at all.</p>
            </div>
            {/* Consistency */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 text-center"
              )}
            >
              <div className="text-4xl mb-2 text-green-600 dark:text-green-400">📏</div>
              <h3 className="text-xl font-bold">Consistency</h3>
              <p className="text-sm mt-1">Database remains in a valid state before and after transaction.</p>
            </div>
            {/* Isolation */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 text-center"
              )}
            >
              <div className="text-4xl mb-2 text-amber-600 dark:text-amber-400">🛡️</div>
              <h3 className="text-xl font-bold">Isolation</h3>
              <p className="text-sm mt-1">Concurrent transactions don't interfere with each other.</p>
            </div>
            {/* Durability */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 text-center"
              )}
            >
              <div className="text-4xl mb-2 text-purple-600 dark:text-purple-400">💾</div>
              <h3 className="text-xl font-bold">Durability</h3>
              <p className="text-sm mt-1">Once committed, changes persist even after system failure.</p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: TRANSACTION METHODS & AUTO-COMMIT ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Transaction methods"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🛠️ Controlling Transactions
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Connection methods:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">void setAutoCommit(boolean autoCommit)</code>
                – If false, starts a transaction.
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">void commit()</code>
                – Makes all changes since last commit permanent.
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">void rollback()</code>
                – Undoes all changes since last commit.
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">boolean getAutoCommit()</code>
                – Returns current auto-commit mode.
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              By default, connections are in <strong>auto-commit mode</strong> – each SQL statement is treated as a
              separate transaction and committed immediately. For multi-statement transactions, you must disable auto-commit.
            </p>
          </div>
        </section>

        {/* ===== SECTION 4: VISUAL TRANSACTION FLOW ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Transaction flow diagram"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🔄 Money Transfer Transaction
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center hover:shadow-lg transition-shadow">
            <svg viewBox="0 0 600 250" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Account A */}
              <rect x="20" y="30" width="120" height="80" rx="8" className="stroke-indigo-500 dark:stroke-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="50" y="70" className="text-sm fill-gray-800 dark:fill-gray-200" stroke="none">Account A</text>
              <text x="40" y="95" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">₹1000</text>

              {/* Account B */}
              <rect x="460" y="30" width="120" height="80" rx="8" className="stroke-indigo-500 dark:stroke-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="490" y="70" className="text-sm fill-gray-800 dark:fill-gray-200" stroke="none">Account B</text>
              <text x="480" y="95" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">₹500</text>

              {/* Debit arrow */}
              <path d="M140 70 L200 70" className="stroke-amber-500 dark:stroke-amber-400" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="150" y="50" className="text-xs fill-amber-600 dark:fill-amber-400" stroke="none">1. Debit ₹200</text>

              {/* Credit arrow */}
              <path d="M460 70 L400 70" className="stroke-green-500 dark:stroke-green-400" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="320" y="50" className="text-xs fill-green-600 dark:fill-green-400" stroke="none">2. Credit ₹200</text>

              {/* Decision box */}
              <rect x="180" y="140" width="240" height="60" rx="8" className="stroke-purple-500 dark:stroke-purple-400 fill-purple-50 dark:fill-purple-900/20" />
              <text x="200" y="180" className="text-sm fill-gray-800 dark:fill-gray-200" stroke="none">Both succeeded?</text>
              
              {/* Commit path */}
              <path d="M300 200 L300 230" stroke="green" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" begin="2s" repeatCount="indefinite" />
              </path>
              <circle cx="300" cy="240" r="10" className="stroke-green-500 fill-green-100 dark:fill-green-900/20" />
              <text x="280" y="244" className="text-xs fill-green-600 dark:fill-green-400" stroke="none">COMMIT</text>

              {/* Rollback path */}
              <path d="M220 200 L220 230" stroke="red" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" begin="2s" repeatCount="indefinite" />
              </path>
              <circle cx="220" cy="240" r="10" className="stroke-red-500 fill-red-100 dark:fill-red-900/20" />
              <text x="200" y="244" className="text-xs fill-red-600 dark:fill-red-400" stroke="none">ROLLBACK</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            If both operations succeed, we commit; if any fails, we rollback to keep accounts consistent.
          </p>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for transactions"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Basic Transaction with Commit</h3>
            <JavaFileLoader
              fileModule={basicTransaction}
              title="BasicTransaction.java"
              highlightLines={[10, 11, 12, 13, 14, 19, 20, 21]} // setAutoCommit(false), commit, rollback
            />

            <h3 className="text-xl font-medium mt-6">🔹 Transaction with Rollback on Error</h3>
            <JavaFileLoader
              fileModule={transactionRollback}
              title="TransactionRollback.java"
              highlightLines={[11, 12, 13, 17, 18, 19, 22, 23, 24]} // rollback in catch
            />

            <h3 className="text-xl font-medium mt-6">🔹 Transaction Isolation Levels (Preview)</h3>
            <JavaFileLoader
              fileModule={transactionIsolation}
              title="TransactionIsolationDemo.java"
              highlightLines={[7, 8, 9, 10, 11]} // setting isolation level
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Think about:</strong> What happens if you forget to call <code>commit()</code> after disabling auto-commit?
              The changes will be lost when the connection closes. Always ensure commit or rollback is called.
            </p>
          </div>
        </section>

        {/* ===== SECTION 6: COMMON PITFALLS ===== */}
        <section
          className="animate-[fadeSlideUp_1.1s_ease-out] space-y-3"
          aria-label="Common mistakes"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-red-200 dark:border-red-800 pb-2">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
            <li>Forgetting to disable auto-commit – each statement commits separately.</li>
            <li>Not calling <code>commit()</code> or <code>rollback()</code> before closing connection – uncommitted changes are lost.</li>
            <li>Mixing auto-commit and manual transaction management in same connection.</li>
            <li>Not handling exceptions – transaction may be left in an incomplete state.</li>
            <li>Assuming all databases support transactions (MyISAM engine in MySQL does not).</li>
            <li>Using savepoints without checking if the database supports them (topic 7).</li>
          </ul>
        </section>

        {/* ===== SECTION 7: BEST PRACTICES ===== */}
        <section
          className="animate-[fadeSlideUp_1.2s_ease-out] space-y-3"
          aria-label="Best practices"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-green-200 dark:border-green-800 pb-2">
            ✅ Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
            <li>Always use try-catch-finally or try-with-resources to ensure commit/rollback.</li>
            <li>Keep transactions as short as possible – don't include user think time.</li>
            <li>Set appropriate isolation level based on concurrency requirements.</li>
            <li>Test rollback scenarios by simulating failures.</li>
            <li>For distributed transactions, consider JTA (outside JDBC scope).</li>
            <li>Log transaction boundaries for debugging and auditing.</li>
          </ul>
        </section>

        {/* ===== SECTION 8: TIPS & TRICKS ===== */}
        <section
          className="animate-[fadeSlideUp_1.3s_ease-out] space-y-3"
          aria-label="Professional tips"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-amber-200 dark:border-amber-800 pb-2">
            🧠 Tips & Tricks
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>🔹 <strong>Batch with transaction:</strong> Combine batch processing (topic 8) with transactions for massive performance gains.</li>
              <li>🔹 <strong>Check transaction support:</strong> Use <code>DatabaseMetaData.supportsTransactions()</code> before attempting.</li>
              <li>🔹 <strong>Deadlock handling:</strong> Be prepared to retry transactions that fail due to deadlocks.</li>
              <li>🔹 <strong>Savepoints preview:</strong> In long transactions, consider savepoints (next topic) to rollback partially.</li>
              <li>🔹 <strong>Debangshu's trick:</strong> Always set a timeout for transactions to avoid indefinite locks.</li>
            </ul>
          </div>
        </section>

        {/* ===== SECTION 9: TEACHER'S NOTE ===== */}
        <section
          className="animate-[fadeSlideUp_1.4s_ease-out] space-y-3"
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
              <span className="font-semibold">Point to remember:</span> Students often forget that auto-commit is on by default.
              Emphasize the three‑step pattern: <code>setAutoCommit(false)</code>, perform work, then <code>commit()</code> or
              <code>rollback()</code>.
              <br />
              <span className="italic">
                "Abhronila, think of it like writing a letter – you don't send it until you're done. Auto‑commit sends every sentence!"
              </span>
            </p>
          </div>
        </section>

        {/* ===== SECTION 10: MINI CHECKLIST ===== */}
        <section
          className="animate-[fadeSlideUp_1.5s_ease-out] space-y-3"
          aria-label="Quick checklist"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2">
            📋 Mini Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
            <ul className="space-y-2">
              <li>✔️ I understand ACID properties and why they matter.</li>
              <li>✔️ I know how to disable auto-commit and start a transaction.</li>
              <li>✔️ I can write code that commits or rolls back based on success/failure.</li>
              <li>✔️ I handle exceptions to ensure rollback when needed.</li>
              <li>✔️ I know the difference between auto-commit and manual transactions.</li>
              <li>✔️ I am aware of isolation levels (to be explored later).</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic6;