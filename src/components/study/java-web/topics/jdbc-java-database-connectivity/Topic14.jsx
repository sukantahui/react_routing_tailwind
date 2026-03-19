// Topic14.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic14_files folder
import scrollableResultSet from "./topic14_files/ScrollableResultSet.java?raw";
import updatableResultSet from "./topic14_files/UpdatableResultSet.java?raw";
import insertRowResultSet from "./topic14_files/InsertRowResultSet.java?raw";
import deleteRowResultSet from "./topic14_files/DeleteRowResultSet.java?raw";

const Topic14 = () => {
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
          aria-label="Introduction to Scrollable and Updatable ResultSet"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            🔄 Scrollable and Updatable ResultSet
          </h1>
          <p className="text-lg leading-relaxed">
            By default, a <code>ResultSet</code> is <strong>forward‑only</strong> and <strong>read‑only</strong>.
            However, JDBC allows you to create <code>Statement</code> objects that produce
            <strong> scrollable</strong> (can move backwards, jump to rows) and <strong>updatable</strong>
            (can modify data directly through the <code>ResultSet</code>) result sets. This gives you more flexibility
            when navigating and editing data.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Tuhina</span> from Shyamnagar wants to build an admin panel where she can
            browse student records, move to the last page, edit a record, and delete another – all without writing
            separate SQL statements. Scrollable and updatable ResultSets make this possible.
          </p>
        </section>

        {/* ===== SECTION 2: SCROLLABLE TYPES ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="Scrollable types"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🧭 Scrollable ResultSet Types
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <p className="mb-3">
              When creating a <code>Statement</code> or <code>PreparedStatement</code>, you can specify two constants:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <code>ResultSet.TYPE_FORWARD_ONLY</code> – default, can only move forward.
              </li>
              <li>
                <code>ResultSet.TYPE_SCROLL_INSENSITIVE</code> – can scroll in any direction, but does not reflect
                changes made by others (insensitive to database modifications).
              </li>
              <li>
                <code>ResultSet.TYPE_SCROLL_SENSITIVE</code> – scrollable and reflects changes made by others
                (sensitive). Not all databases support this.
              </li>
            </ul>
            <p className="mt-3">
              <strong>Navigation methods:</strong> <code>previous()</code>, <code>first()</code>, <code>last()</code>,
              <code>absolute(int)</code>, <code>relative(int)</code>, <code>beforeFirst()</code>, <code>afterLast()</code>,
              <code>isFirst()</code>, <code>isLast()</code>, <code>getRow()</code>.
            </p>
          </div>
        </section>

        {/* ===== SECTION 3: UPDATABLE TYPES ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Updatable ResultSet"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            ✏️ Updatable ResultSet
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <p className="mb-3">
              To make a ResultSet updatable, specify the concurrency mode:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <code>ResultSet.CONCUR_READ_ONLY</code> – default, cannot update.
              </li>
              <li>
                <code>ResultSet.CONCUR_UPDATABLE</code> – allows updates, inserts, and deletes directly on the ResultSet.
              </li>
            </ul>
            <p className="mt-3">
              <strong>Update methods:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><code>updateXxx(column, value)</code> – updates the current row's column (not yet sent to DB).</li>
              <li><code>updateRow()</code> – sends the update to the database.</li>
              <li><code>insertRow()</code> – inserts a new row after using <code>moveToInsertRow()</code>.</li>
              <li><code>deleteRow()</code> – deletes the current row.</li>
              <li><code>cancelRowUpdates()</code> – cancels updates to the current row.</li>
              <li><code>refreshRow()</code> – refreshes the row from the database.</li>
            </ul>
          </div>
        </section>

        {/* ===== SECTION 4: VISUAL NAVIGATION (with SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Scrollable navigation demo"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🎯 Navigating a Scrollable ResultSet
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 200" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Table representation */}
              <rect x="50" y="20" width="500" height="120" rx="8" className="stroke-indigo-300 dark:stroke-indigo-700 fill-indigo-50 dark:fill-indigo-900/20" />
              
              {/* Row lines */}
              <line x1="50" y1="50" x2="550" y2="50" className="stroke-gray-300 dark:stroke-gray-600" />
              <line x1="50" y1="80" x2="550" y2="80" className="stroke-gray-300 dark:stroke-gray-600" />
              <line x1="50" y1="110" x2="550" y2="110" className="stroke-gray-300 dark:stroke-gray-600" />
              
              {/* Sample data rows */}
              <text x="70" y="40" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">ID</text>
              <text x="200" y="40" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Name</text>
              
              <text x="70" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">1</text>
              <text x="200" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Swadeep</text>
              
              <text x="70" y="100" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">2</text>
              <text x="200" y="100" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Tuhina</text>
              
              <text x="70" y="130" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">3</text>
              <text x="200" y="130" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Abhronila</text>
              
              {/* Cursor with motion */}
              <path d="M20 100 L40 95 L40 105 Z" fill="green" className="dark:fill-green-400">
                <animateMotion path="M0 0 L0 -30 L30 0 L0 30 L0 0" dur="4s" repeatCount="indefinite" />
              </path>
              
              {/* Arrow pointing to navigation */}
              <path d="M300 150 L300 140 L295 145 M300 140 L305 145" stroke="blue" fill="none" />
              <text x="260" y="180" className="text-xs fill-blue-600" stroke="none">absolute(3)</text>
              <text x="260" y="195" className="text-xs fill-blue-600" stroke="none">previous()</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            With scrollable ResultSet, you can move to any row directly (<code>absolute</code>), go backwards (<code>previous</code>),
            or jump relative to current (<code>relative</code>).
          </p>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for scrollable and updatable ResultSet"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Scrollable ResultSet Navigation</h3>
            <JavaFileLoader
              fileModule={scrollableResultSet}
              title="ScrollableResultSet.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]} // create statement with TYPE_SCROLL_*, navigation
            />

            <h3 className="text-xl font-medium mt-6">🔹 Updatable ResultSet (Update Existing Row)</h3>
            <JavaFileLoader
              fileModule={updatableResultSet}
              title="UpdatableResultSet.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]} // CONCUR_UPDATABLE, updateRow
            />

            <h3 className="text-xl font-medium mt-6">🔹 Inserting a New Row via ResultSet</h3>
            <JavaFileLoader
              fileModule={insertRowResultSet}
              title="InsertRowResultSet.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]} // moveToInsertRow, insertRow
            />

            <h3 className="text-xl font-medium mt-6">🔹 Deleting a Row via ResultSet</h3>
            <JavaFileLoader
              fileModule={deleteRowResultSet}
              title="DeleteRowResultSet.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12]} // deleteRow
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> After calling <code>updateXxx()</code>, you must call
              <code>updateRow()</code> to persist changes. What happens if you move to another row without calling
              <code>updateRow()</code>?
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
            <li>Assuming all databases support scrollable/updatable ResultSets – some drivers may not, or may have limitations.</li>
            <li>Using <code>TYPE_SCROLL_SENSITIVE</code> without checking database support – can lead to unexpected behavior.</li>
            <li>Forgetting that the ResultSet must be created with <code>CONCUR_UPDATABLE</code> to call update methods.</li>
            <li>Modifying a row without being positioned on a valid row (e.g., after <code>afterLast()</code>).</li>
            <li>Not calling <code>updateRow()</code> after updates – changes are lost.</li>
            <li>Using <code>moveToInsertRow()</code> and forgetting to move back (<code>moveToCurrentRow()</code>) – leads to confusion.</li>
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
            <li>Only request scrollability/updatability when needed – it adds overhead.</li>
            <li>Prefer <code>TYPE_SCROLL_INSENSITIVE</code> for most use cases – better performance and wider support.</li>
            <li>Always check if the ResultSet is scrollable/updatable using <code>getType()</code> and <code>getConcurrency()</code>.</li>
            <li>After inserting a row, call <code>moveToCurrentRow()</code> if you need to continue working on the current row.</li>
            <li>Use <code>refreshRow()</code> to reload a row if you suspect it has been updated by another transaction.</li>
            <li>Keep transactions short when using updatable ResultSets to avoid locking issues.</li>
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
              <li>🔹 <strong>Scrollable + Updatable = Powerful UI:</strong> Build data grids that allow inline editing and navigation.</li>
              <li>🔹 <strong>Row count:</strong> Use <code>last()</code> then <code>getRow()</code> to get total rows without counting.</li>
              <li>🔹 <strong>Batch updates:</strong> Combine with batch processing for multiple updates via ResultSet.</li>
              <li>🔹 <strong>Check driver capabilities:</strong> Use <code>DatabaseMetaData.supportsResultSetType()</code> and <code>supportsResultSetConcurrency()</code>.</li>
              <li>🔹 <strong>Debangshu's trick:</strong> In a paginated web app, use <code>absolute(startRow)</code> and loop forward to fetch a page – avoid large result sets in memory.</li>
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
              <span className="font-semibold">Point to remember:</span> Many students think ResultSets are just for reading.
              Emphasize that scrollable and updatable ResultSets are a powerful feature for desktop-style applications,
              but they come with performance costs and may not be suitable for web apps with thousands of concurrent users.
              <br />
              <span className="italic">
                "Abhronila, think of a default ResultSet as a one‑way street – you can only go forward. A scrollable ResultSet
                is like a city map – you can go anywhere, but you need a better car (database support)."
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
              <li>✔️ I understand the difference between forward‑only, scroll‑insensitive, and scroll‑sensitive ResultSets.</li>
              <li>✔️ I know how to create a scrollable ResultSet using <code>Statement</code> constants.</li>
              <li>✔️ I can navigate using <code>previous()</code>, <code>absolute()</code>, <code>relative()</code>, etc.</li>
              <li>✔️ I can update a row in the ResultSet and persist changes.</li>
              <li>✔️ I can insert and delete rows via the ResultSet.</li>
              <li>✔️ I am aware of database support and common pitfalls.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic14;