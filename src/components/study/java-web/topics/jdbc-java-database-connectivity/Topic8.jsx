// Topic8.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic8_files folder
import statementBatch from "./topic8_files/StatementBatch.java?raw";
import preparedStatementBatch from "./topic8_files/PreparedStatementBatch.java?raw";
import transactionBatch from "./topic8_files/TransactionBatch.java?raw";
import batchExceptionHandling from "./topic8_files/BatchExceptionHandling.java?raw";

const Topic8 = () => {
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
          aria-label="Introduction to Batch Processing"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            📦 Batch Processing
          </h1>
          <p className="text-lg leading-relaxed">
            When you need to execute multiple SQL statements (especially INSERT/UPDATE/DELETE) against a database,
            sending them one by one creates a lot of network round trips and degrades performance.
            <strong className="text-indigo-600 dark:text-indigo-400"> Batch processing</strong> allows you to group
            multiple statements into a single batch and send them to the database in one go.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Swadeep</span> from Barrackpore has a CSV file with 10,000 new student records.
            Using individual INSERT statements would take minutes; with batch processing, it takes seconds.
          </p>
        </section>

        {/* ===== SECTION 2: BATCH PROCESSING CONCEPT (with SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="Batch processing illustration"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🏭 How Batch Processing Works
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 180" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Individual statements (left) */}
              <rect x="20" y="20" width="60" height="40" rx="4" className="stroke-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="30" y="45" className="text-[8px] fill-gray-600 dark:fill-gray-400" stroke="none">INSERT 1</text>
              <rect x="20" y="70" width="60" height="40" rx="4" className="stroke-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="30" y="95" className="text-[8px] fill-gray-600 dark:fill-gray-400" stroke="none">INSERT 2</text>
              <rect x="20" y="120" width="60" height="40" rx="4" className="stroke-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="30" y="145" className="text-[8px] fill-gray-600 dark:fill-gray-400" stroke="none">INSERT 3</text>

              {/* Batch container */}
              <rect x="120" y="20" width="200" height="140" rx="8" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="180" y="40" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Batch</text>
              <rect x="140" y="50" width="160" height="30" rx="4" className="stroke-emerald-400 fill-emerald-100 dark:fill-emerald-800/30" />
              <text x="180" y="70" className="text-[8px] fill-gray-600 dark:fill-gray-400" stroke="none">INSERT 1; INSERT 2; INSERT 3;</text>

              {/* Network transmission */}
              <path d="M320 90 L420 90" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;12;0" dur="2s" repeatCount="indefinite" />
              </path>
              <text x="340" y="70" className="text-[8px] fill-gray-500" stroke="none">single trip</text>

              {/* Database */}
              <rect x="440" y="50" width="120" height="80" rx="8" className="stroke-purple-500 fill-purple-50 dark:fill-purple-900/20" />
              <text x="470" y="95" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Database</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Instead of sending 10,000 separate INSERT statements (10,000 round trips), you group them into batches,
            drastically reducing network overhead.
          </p>
        </section>

        {/* ===== SECTION 3: BATCH METHODS ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Batch methods"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🛠️ Batch Processing API
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Statement methods:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">void addBatch(String sql)</code>
                – Adds a SQL command to the current batch.
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">int[] executeBatch()</code>
                – Submits the batch to the database. Returns an array of update counts.
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">void clearBatch()</code>
                – Empties the current batch.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2">PreparedStatement (same methods, but no SQL param in addBatch):</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">void addBatch()</code>
                – Adds the current set of parameters to the batch.
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">int[] executeBatch()</code>
                – Executes the batch.
              </li>
            </ul>
            <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
              ⚠️ executeBatch() clears the batch automatically after execution. The returned array contains one element per
              statement in the batch: either an update count or <code>Statement.SUCCESS_NO_INFO</code> or
              <code>Statement.EXECUTE_FAILED</code>.
            </p>
          </div>
        </section>

        {/* ===== SECTION 4: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-6"
          aria-label="Code examples for batch processing"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Batch with Statement</h3>
            <JavaFileLoader
              fileModule={statementBatch}
              title="StatementBatch.java"
              highlightLines={[9, 10, 11, 12, 13, 14]} // addBatch, executeBatch
            />

            <h3 className="text-xl font-medium mt-6">🔹 Batch with PreparedStatement (recommended)</h3>
            <JavaFileLoader
              fileModule={preparedStatementBatch}
              title="PreparedStatementBatch.java"
              highlightLines={[8, 9, 10, 11, 12, 13, 14, 15, 16]} // set parameters, addBatch, executeBatch
            />

            <h3 className="text-xl font-medium mt-6">🔹 Batch inside a Transaction</h3>
            <JavaFileLoader
              fileModule={transactionBatch}
              title="TransactionBatch.java"
              highlightLines={[8, 9, 10, 11, 14, 15, 16]} // setAutoCommit(false), commit after batch
            />

            <h3 className="text-xl font-medium mt-6">🔹 Handling BatchUpdateException</h3>
            <JavaFileLoader
              fileModule={batchExceptionHandling}
              title="BatchExceptionHandling.java"
              highlightLines={[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]} // catch BatchUpdateException, examine updateCounts
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> In <code>PreparedStatementBatch</code>, we call <code>addBatch()</code> after
              setting parameters. What happens if you forget to call <code>clearParameters()</code> or reuse the same parameters?
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
            <li>Adding queries that return a ResultSet (like SELECT) to a batch – not allowed.</li>
            <li>Not clearing the batch after execution if you plan to reuse the statement for another batch.</li>
            <li>Assuming all statements in the batch succeed – always check the update count array.</li>
            <li>Forgetting that <code>executeBatch()</code> throws <code>BatchUpdateException</code> if any statement fails;
              the array in the exception contains results for successful ones.</li>
            <li>Using auto-commit with large batches – each statement may be committed individually, causing performance issues
              and making rollback impossible. Better to disable auto-commit.</li>
            <li>Batch size too large – can cause memory issues; optimal size depends on database and network.</li>
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
            <li>Always use <code>PreparedStatement</code> for batch inserts/updates – it's faster and safer.</li>
            <li>Disable auto-commit before starting a batch, then commit after the batch to ensure atomicity.</li>
            <li>Choose an optimal batch size (typically 100–1000, depending on your database). Experiment.</li>
            <li>Handle <code>BatchUpdateException</code> to determine which records failed.</li>
            <li>Clear the batch if you need to reuse the statement for a different set of parameters.</li>
            <li>Consider using <code>addBatch()</code> and <code>executeBatch()</code> in a loop for very large datasets,
              resetting the batch periodically.</li>
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
              <li>🔹 <strong>Measure performance:</strong> Always benchmark with and without batch to see the improvement.</li>
              <li>🔹 <strong>MySQL specific:</strong> Add <code>?rewriteBatchedStatements=true</code> to your JDBC URL for MySQL
                to truly optimize batch inserts.</li>
              <li>🔹 <strong>Oracle:</strong> Use <code>PreparedStatement</code> with batch and set
                <code>oracle.jdbc.defaultBatchValue</code> as a connection property.</li>
              <li>🔹 <strong>Large batches:</strong> If you're inserting millions of rows, consider using database-specific bulk load
                tools (like <code>LOAD DATA INFILE</code> in MySQL) for even better performance.</li>
              <li>🔹 <strong>Tuhina's trick:</strong> When processing a file, read a chunk of records, add them to batch, execute,
                and repeat. This keeps memory usage low.</li>
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
              <span className="font-semibold">Point to remember:</span> Batch processing is a classic optimization technique.
              Students often think of it as just a convenience, but the performance gain is enormous – especially over slow networks.
              <br />
              <span className="italic">
                "Abhronila, think of it like mailing 100 letters: putting them all in one envelope saves 99 trips to the post office."
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
              <li>✔️ I understand why batch processing improves performance.</li>
              <li>✔️ I know how to add statements to a batch using Statement and PreparedStatement.</li>
              <li>✔️ I can execute a batch and interpret the update counts array.</li>
              <li>✔️ I know how to handle BatchUpdateException.</li>
              <li>✔️ I understand the importance of disabling auto-commit for atomic batches.</li>
              <li>✔️ I can choose an appropriate batch size for my application.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic8;