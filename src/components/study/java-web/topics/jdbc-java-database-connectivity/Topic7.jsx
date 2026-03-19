// Topic7.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic7_files folder
import savepointExample from "./topic7_files/SavepointExample.java?raw";
import rollbackToSavepoint from "./topic7_files/RollbackToSavepoint.java?raw";
import releaseSavepointDemo from "./topic7_files/ReleaseSavepointDemo.java?raw";

const Topic7 = () => {
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
          aria-label="Introduction to Commit, Rollback, Savepoint"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            💾 Commit, Rollback, and Savepoint
          </h1>
          <p className="text-lg leading-relaxed">
            In the previous topic, we learned about transactions and the basic <code>commit()</code> and <code>rollback()</code>
            methods. Now we go a step further: <strong>savepoints</strong> allow partial rollbacks within a transaction.
            This gives you finer control when a complex transaction needs to undo only part of its work.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Abhronila</span> from Ichapur is processing a batch of student registrations.
            If one registration fails, she doesn't want to lose all previous successful inserts. Savepoints let her mark
            a point and rollback only to that point.
          </p>
        </section>

        {/* ===== SECTION 2: COMMIT AND ROLLBACK RECAP ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="Commit and Rollback recap"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🔁 Commit & Rollback – Quick Recap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center space-x-3">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-xl font-bold">commit()</h3>
              </div>
              <p className="mt-2">
                Permanently saves all changes made since the last commit/rollback. Once committed, changes are visible to other
                transactions and survive failures.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center space-x-3">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h3 className="text-xl font-bold">rollback()</h3>
              </div>
              <p className="mt-2">
                Undoes all changes made since the last commit/rollback, restoring the database to the state at the start of the
                transaction.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: SAVEPOINT CONCEPT ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Savepoint concept"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📍 Savepoints – Partial Rollback
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 200" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Timeline line */}
              <line x1="50" y1="100" x2="550" y2="100" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4" />
              
              {/* Start point */}
              <circle cx="50" cy="100" r="8" className="stroke-indigo-500 fill-indigo-100 dark:fill-indigo-900/20" />
              <text x="40" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Start</text>
              
              {/* Savepoint 1 */}
              <circle cx="200" cy="100" r="8" className="stroke-amber-500 fill-amber-100 dark:fill-amber-900/20" />
              <text x="190" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">SP1</text>
              
              {/* Savepoint 2 */}
              <circle cx="350" cy="100" r="8" className="stroke-amber-500 fill-amber-100 dark:fill-amber-900/20" />
              <text x="340" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">SP2</text>
              
              {/* End/Commit point */}
              <circle cx="500" cy="100" r="8" className="stroke-green-500 fill-green-100 dark:fill-green-900/20" />
              <text x="490" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Commit</text>
              
              {/* Rollback arrow */}
              <path d="M450 120 L350 120 L350 108" stroke="red" fill="none" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </path>
              <text x="380" y="140" className="text-xs fill-red-500" stroke="none">rollback to SP2</text>
              
              {/* Partial rollback region */}
              <rect x="350" y="80" width="150" height="40" fill="red" fillOpacity="0.1" stroke="red" strokeDasharray="2 2" />
              <text x="370" y="70" className="text-xs fill-red-500" stroke="none">Undone</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Savepoints act as bookmarks within a transaction. You can rollback to a specific savepoint, undoing only the work
            done after that point, while preserving earlier changes.
          </p>
        </section>

        {/* ===== SECTION 4: SAVEPOINT METHODS ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Savepoint methods"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🧰 Savepoint API
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-3">Connection methods:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Savepoint setSavepoint()</code>
                – Creates an unnamed savepoint and returns a Savepoint object.
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Savepoint setSavepoint(String name)</code>
                – Creates a named savepoint.
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">void rollback(Savepoint savepoint)</code>
                – Undoes all changes after the given savepoint.
              </li>
              <li>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">void releaseSavepoint(Savepoint savepoint)</code>
                – Removes a savepoint (makes it unavailable for rollback).
              </li>
            </ul>
            <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
              ⚠️ Not all databases support savepoints. Check using <code>DatabaseMetaData.supportsSavepoints()</code>.
            </p>
          </div>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for savepoints"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Basic Savepoint Usage</h3>
            <JavaFileLoader
              fileModule={savepointExample}
              title="SavepointExample.java"
              highlightLines={[9, 10, 11, 12, 13, 14, 15, 16, 17]} // setSavepoint, rollback to savepoint
            />

            <h3 className="text-xl font-medium mt-6">🔹 Rolling Back to a Savepoint on Error</h3>
            <JavaFileLoader
              fileModule={rollbackToSavepoint}
              title="RollbackToSavepoint.java"
              highlightLines={[9, 10, 11, 14, 15, 16, 17, 18, 21]} // rollback to savepoint in catch
            />

            <h3 className="text-xl font-medium mt-6">🔹 Releasing Savepoints</h3>
            <JavaFileLoader
              fileModule={releaseSavepointDemo}
              title="ReleaseSavepointDemo.java"
              highlightLines={[11, 12, 13, 14, 15]} // releaseSavepoint
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> After rolling back to a savepoint, the savepoint still exists and can be
              used again. What happens if you try to rollback to a released savepoint?
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
            <li>Assuming all databases support savepoints – always check first.</li>
            <li>Using savepoints without disabling auto-commit – savepoints only work in manual transaction mode.</li>
            <li>Trying to rollback to a savepoint after commit – savepoints are cleared after commit or full rollback.</li>
            <li>Releasing a savepoint then attempting to rollback to it – causes SQLException.</li>
            <li>Naming savepoints with names that are not unique within the transaction.</li>
            <li>Not handling <code>SQLException</code> when creating savepoints – may indicate lack of support.</li>
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
            <li>Use named savepoints for better readability and debugging.</li>
            <li>Always release savepoints when they are no longer needed to free resources.</li>
            <li>Keep the number of savepoints reasonable – too many can impact performance.</li>
            <li>Document the savepoint strategy in complex transactions.</li>
            <li>Test rollback-to-savepoint logic thoroughly, including error paths.</li>
            <li>Prefer savepoints over splitting transactions when partial success is acceptable.</li>
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
              <li>🔹 <strong>Nested savepoints:</strong> You can create multiple savepoints sequentially – rolling back to an
                earlier one invalidates later savepoints.</li>
              <li>🔹 <strong>Savepoint names:</strong> Use meaningful names like "before_insert_batch" or "after_validation".</li>
              <li>🔹 <strong>Check support:</strong> Use <code>conn.getMetaData().supportsSavepoints()</code> before attempting.</li>
              <li>🔹 <strong>Performance:</strong> Savepoints add overhead – use them judiciously, not for every single row.</li>
              <li>🔹 <strong>Swadeep's trick:</strong> In long-running batch jobs, set a savepoint every 100 records; if a record
                fails, rollback to the last savepoint and skip the problematic record.</li>
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
              <span className="font-semibold">Point to remember:</span> Savepoints are like bookmarks in a long document.
              Students often think rollback always undoes everything – savepoints give surgical precision.
              <br />
              <span className="italic">
                "Debangshu, imagine you're writing a long essay and you save draft versions. If you don't like the last paragraph,
                you can go back to the previous draft without losing the whole essay."
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
              <li>✔️ I understand the purpose of savepoints in transactions.</li>
              <li>✔️ I know how to create a savepoint using <code>setSavepoint()</code>.</li>
              <li>✔️ I can rollback to a specific savepoint.</li>
              <li>✔️ I understand the difference between <code>rollback()</code> and <code>rollback(Savepoint)</code>.</li>
              <li>✔️ I know when to release a savepoint.</li>
              <li>✔️ I am aware that not all databases support savepoints.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic7;