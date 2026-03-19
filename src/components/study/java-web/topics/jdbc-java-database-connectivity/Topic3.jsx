// Topic3.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic3_files folder
import createTable from "./topic3_files/CreateTable.java?raw";
import insertRecord from "./topic3_files/InsertRecord.java?raw";
import selectRecords from "./topic3_files/SelectRecords.java?raw";
import updateDeleteExample from "./topic3_files/UpdateDeleteExample.java?raw";

const Topic3 = () => {
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
          aria-label="Introduction to Executing SQL Queries"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            📝 Executing SQL Queries (CRUD)
          </h1>
          <p className="text-lg leading-relaxed">
            Once a connection is established, you can execute SQL statements using
            <code className="mx-1">Statement</code>, <code>PreparedStatement</code> (next topic), or
            <code>CallableStatement</code>. This topic focuses on the basic CRUD operations
            <strong className="text-indigo-600 dark:text-indigo-400"> Create, Read, Update, Delete</strong> using
            <code>Statement</code>.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Tuhina</span> from Shyamnagar wants to build a student management system.
            She needs to add new students (INSERT), view them (SELECT), update details (UPDATE), and remove old records (DELETE).
            These four operations are the foundation of any database application.
          </p>
        </section>

        {/* ===== SECTION 2: CRUD OVERVIEW CARD ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="CRUD operations explained"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🔄 CRUD Operations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Create */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 text-center"
              )}
            >
              <div className="text-4xl mb-2 text-green-600 dark:text-green-400">➕</div>
              <h3 className="text-xl font-bold">CREATE</h3>
              <p className="text-sm mt-1">INSERT new records</p>
              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-2 inline-block">
                INSERT INTO table ...
              </code>
            </div>
            {/* Read */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 text-center"
              )}
            >
              <div className="text-4xl mb-2 text-blue-600 dark:text-blue-400">🔍</div>
              <h3 className="text-xl font-bold">READ</h3>
              <p className="text-sm mt-1">Retrieve records</p>
              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-2 inline-block">
                SELECT ... FROM ...
              </code>
            </div>
            {/* Update */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 text-center"
              )}
            >
              <div className="text-4xl mb-2 text-amber-600 dark:text-amber-400">✏️</div>
              <h3 className="text-xl font-bold">UPDATE</h3>
              <p className="text-sm mt-1">Modify existing records</p>
              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-2 inline-block">
                UPDATE table SET ...
              </code>
            </div>
            {/* Delete */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 text-center"
              )}
            >
              <div className="text-4xl mb-2 text-red-600 dark:text-red-400">❌</div>
              <h3 className="text-xl font-bold">DELETE</h3>
              <p className="text-sm mt-1">Remove records</p>
              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-2 inline-block">
                DELETE FROM table ...
              </code>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: EXECUTION STEPS (with animated SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Steps to execute SQL using Statement"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            ⚙️ How to Execute SQL with Statement
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center hover:shadow-lg transition-shadow duration-300">
            <svg viewBox="0 0 600 200" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Connection box */}
              <rect x="20" y="20" width="120" height="60" rx="8" className="stroke-indigo-500 dark:stroke-indigo-400" />
              <text x="40" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Connection</text>

              {/* Statement box */}
              <rect x="180" y="20" width="120" height="60" rx="8" className="stroke-emerald-500 dark:stroke-emerald-400" />
              <text x="210" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Statement</text>

              {/* Execution box */}
              <rect x="340" y="20" width="120" height="60" rx="8" className="stroke-sky-500 dark:stroke-sky-400" />
              <text x="370" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">executeQuery()</text>

              {/* ResultSet/Update count box */}
              <rect x="500" y="20" width="80" height="60" rx="8" className="stroke-purple-500 dark:stroke-purple-400" />
              <text x="520" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">ResultSet</text>

              {/* Animated arrows */}
              <line x1="140" y1="50" x2="180" y2="50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </line>
              <line x1="300" y1="50" x2="340" y2="50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </line>
              <line x1="460" y1="50" x2="500" y2="50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </line>

              {/* Labels */}
              <text x="150" y="15" className="text-[8px] fill-gray-500" stroke="none">createStatement()</text>
              <text x="310" y="15" className="text-[8px] fill-gray-500" stroke="none">SQL</text>
              <text x="470" y="15" className="text-[8px] fill-gray-500" stroke="none">data</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            From a <code>Connection</code>, create a <code>Statement</code>. Then call
            <code>executeQuery()</code> for SELECT or <code>executeUpdate()</code> for INSERT/UPDATE/DELETE.
          </p>
        </section>

        {/* ===== SECTION 4: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-6"
          aria-label="Code examples for CRUD"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Creating a Table (DDL)</h3>
            <JavaFileLoader
              fileModule={createTable}
              title="CreateTable.java"
              highlightLines={[8, 9, 10]} // executeUpdate for DDL
            />

            <h3 className="text-xl font-medium mt-6">🔹 Inserting a Record (INSERT)</h3>
            <JavaFileLoader
              fileModule={insertRecord}
              title="InsertRecord.java"
              highlightLines={[10, 11, 12]} // executeUpdate for INSERT
            />

            <h3 className="text-xl font-medium mt-6">🔹 Selecting Records (SELECT)</h3>
            <JavaFileLoader
              fileModule={selectRecords}
              title="SelectRecords.java"
              highlightLines={[9, 12, 13, 14]} // executeQuery and ResultSet processing
            />

            <h3 className="text-xl font-medium mt-6">🔹 Updating and Deleting Records</h3>
            <JavaFileLoader
              fileModule={updateDeleteExample}
              title="UpdateDeleteExample.java"
              highlightLines={[9, 10, 14, 15]} // executeUpdate for UPDATE/DELETE
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> <code>executeUpdate()</code> returns the number of affected rows.
              For SELECT, we use <code>executeQuery()</code> which returns a <code>ResultSet</code>. Why do you think
              there are two different methods?
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
            <li>Using <code>executeQuery()</code> for INSERT/UPDATE/DELETE → throws <code>SQLException</code>.</li>
            <li>Not closing <code>Statement</code> and <code>ResultSet</code> objects → resource leaks.</li>
            <li>Forgetting to handle <code>SQLException</code> – always use try-catch or declare throws.</li>
            <li>SQL injection vulnerability when concatenating user input into query strings (use PreparedStatement instead).</li>
            <li>Assuming the table already exists before running INSERT/SELECT.</li>
            <li>Not moving the cursor with <code>ResultSet.next()</code> before reading data.</li>
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
            <li>Always use try-with-resources to auto-close Statement and ResultSet.</li>
            <li>Use <code>executeUpdate()</code> for INSERT, UPDATE, DELETE; <code>executeQuery()</code> for SELECT.</li>
            <li>Validate user input and consider using <code>PreparedStatement</code> (next topic) to prevent SQL injection.</li>
            <li>Process ResultSet efficiently – avoid loading huge datasets into memory.</li>
            <li>Use meaningful names for SQL variables and constants.</li>
            <li>Log SQL queries during development for debugging.</li>
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
              <li>🔹 <strong>Batch updates:</strong> For multiple INSERT/UPDATE, use <code>addBatch()</code> and <code>executeBatch()</code> (Topic 8).</li>
              <li>🔹 <strong>Auto-generated keys:</strong> After INSERT, retrieve generated keys using <code>Statement.RETURN_GENERATED_KEYS</code>.</li>
              <li>🔹 <strong>Scrollable ResultSet:</strong> You can create Statement that returns scrollable ResultSet (Topic 14).</li>
              <li>🔹 <strong>Query timeout:</strong> Set <code>stmt.setQueryTimeout(5)</code> to avoid long-running queries.</li>
              <li>🔹 <strong>Debangshu's trick:</strong> When debugging, print the SQL query before execution to catch syntax errors.</li>
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
              <span className="font-semibold">Point to remember:</span> Students often mix up <code>executeQuery()</code> and
              <code>executeUpdate()</code>. Remind them: Query = SELECT (returns data), Update = INSERT/UPDATE/DELETE (returns count).
              <br />
              <span className="italic">
                "Abhronila, think of it like asking a question (query) vs. giving a command (update)."
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
              <li>✔️ I can explain CRUD operations in SQL.</li>
              <li>✔️ I know how to create a <code>Statement</code> from a <code>Connection</code>.</li>
              <li>✔️ I can write code to INSERT, SELECT, UPDATE, DELETE records.</li>
              <li>✔️ I understand the difference between <code>executeQuery()</code> and <code>executeUpdate()</code>.</li>
              <li>✔️ I know how to process a <code>ResultSet</code> using <code>next()</code> and getters.</li>
              <li>✔️ I am aware of SQL injection risks and why we need PreparedStatement.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic3;