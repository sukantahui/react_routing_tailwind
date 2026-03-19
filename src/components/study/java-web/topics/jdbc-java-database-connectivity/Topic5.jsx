// Topic5.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic5_files folder
import resultSetDemo from "./topic5_files/ResultSetDemo.java?raw";
import resultSetMetaDataDemo from "./topic5_files/ResultSetMetaDataDemo.java?raw";
import databaseMetaDataDemo from "./topic5_files/DatabaseMetaDataDemo.java?raw";
import scrollableResultSetDemo from "./topic5_files/ScrollableResultSetDemo.java?raw";

const Topic5 = () => {
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
          aria-label="Introduction to ResultSet and Metadata"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            📊 ResultSet and Metadata
          </h1>
          <p className="text-lg leading-relaxed">
            When you execute a <code>SELECT</code> query using <code>Statement</code> or <code>PreparedStatement</code>,
            the database returns the results in a <code>ResultSet</code> object. The <code>ResultSet</code> acts like a
            cursor pointing to the current row of data. Additionally, JDBC provides metadata classes to get information
            about the result set itself (<code>ResultSetMetaData</code>) and the database
            (<code>DatabaseMetaData</code>).
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Abhronila</span> from Ichapur is building a report generator. She needs to
            dynamically discover column names and types without knowing them in advance – that's where metadata shines.
          </p>
        </section>

        {/* ===== SECTION 2: RESULTSET BASICS (with animated cursor SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="ResultSet navigation"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🔍 Navigating a ResultSet
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center hover:shadow-lg transition-shadow">
            <svg viewBox="0 0 600 200" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Table representation */}
              <rect x="50" y="20" width="500" height="120" rx="8" className="stroke-indigo-300 dark:stroke-indigo-700 fill-indigo-50 dark:fill-indigo-900/20" />
              
              {/* Row lines */}
              <line x1="50" y1="50" x2="550" y2="50" className="stroke-gray-300 dark:stroke-gray-600" />
              <line x1="50" y1="80" x2="550" y2="80" className="stroke-gray-300 dark:stroke-gray-600" />
              <line x1="50" y1="110" x2="550" y2="110" className="stroke-gray-300 dark:stroke-gray-600" />
              
              {/* Column separators */}
              <line x1="150" y1="20" x2="150" y2="140" className="stroke-gray-300 dark:stroke-gray-600" />
              <line x1="300" y1="20" x2="300" y2="140" className="stroke-gray-300 dark:stroke-gray-600" />
              <line x1="450" y1="20" x2="450" y2="140" className="stroke-gray-300 dark:stroke-gray-600" />
              
              {/* Column headers */}
              <text x="80" y="40" className="text-xs fill-gray-700 dark:fill-gray-300" stroke="none">ID</text>
              <text x="200" y="40" className="text-xs fill-gray-700 dark:fill-gray-300" stroke="none">Name</text>
              <text x="360" y="40" className="text-xs fill-gray-700 dark:fill-gray-300" stroke="none">Age</text>
              <text x="500" y="40" className="text-xs fill-gray-700 dark:fill-gray-300" stroke="none">City</text>
              
              {/* Sample data rows */}
              <text x="80" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">1</text>
              <text x="200" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Swadeep</text>
              <text x="360" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">20</text>
              <text x="500" y="70" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Barrackpore</text>
              
              <text x="80" y="100" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">2</text>
              <text x="200" y="100" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Tuhina</text>
              <text x="360" y="100" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">19</text>
              <text x="500" y="100" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Shyamnagar</text>
              
              <text x="80" y="130" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">3</text>
              <text x="200" y="130" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Abhronila</text>
              <text x="360" y="130" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">21</text>
              <text x="500" y="130" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Ichapur</text>
              
              {/* Cursor arrow */}
              <path d="M20 80 L40 70 L40 90 Z" fill="green" className="dark:fill-green-400">
                <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                <animateMotion path="M0 0 L480 0" dur="4s" repeatCount="indefinite" />
              </path>
              <text x="10" y="60" className="text-[8px] fill-green-600 dark:fill-green-400" stroke="none">cursor</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            The cursor initially points before the first row. <code>next()</code> moves it forward and returns true if a row exists.
            You can then retrieve column values by index or name.
          </p>
        </section>

        {/* ===== SECTION 3: RESULTSET METHODS REFERENCE ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="ResultSet methods"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🧰 Important ResultSet Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-bold text-lg">Navigation</h3>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                <li><code>boolean next()</code> – moves to next row</li>
                <li><code>boolean previous()</code> – moves to previous row</li>
                <li><code>boolean first()</code> – moves to first row</li>
                <li><code>boolean last()</code> – moves to last row</li>
                <li><code>boolean absolute(int row)</code> – moves to specific row</li>
                <li><code>boolean relative(int rows)</code> – moves forward/backward</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-bold text-lg">Data Retrieval</h3>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                <li><code>getString(int columnIndex)</code></li>
                <li><code>getInt(String columnLabel)</code></li>
                <li><code>getDouble(int columnIndex)</code></li>
                <li><code>getDate(String columnLabel)</code></li>
                <li><code>getObject(int columnIndex)</code></li>
                <li>… and many more type-specific getters</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Note: Column indexes start at 1 (not 0). Use column labels for better readability.
          </p>
        </section>

        {/* ===== SECTION 4: METADATA EXPLANATION (cards) ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Metadata types"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📋 Metadata
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ResultSetMetaData card */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-center space-x-3 mb-3">
                <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
                <h3 className="text-xl font-bold">ResultSetMetaData</h3>
              </div>
              <p>Information about the columns in a ResultSet: number of columns, column names, data types, etc.</p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li><code>getColumnCount()</code></li>
                <li><code>getColumnName(int)</code></li>
                <li><code>getColumnType(int)</code></li>
                <li><code>getColumnTypeName(int)</code></li>
                <li><code>isNullable(int)</code></li>
              </ul>
            </div>

            {/* DatabaseMetaData card */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-center space-x-3 mb-3">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <h3 className="text-xl font-bold">DatabaseMetaData</h3>
              </div>
              <p>Information about the database itself: tables, views, procedures, supported features, etc.</p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li><code>getTables()</code></li>
                <li><code>getColumns()</code></li>
                <li><code>getPrimaryKeys()</code></li>
                <li><code>getDatabaseProductName()</code></li>
                <li><code>supportsTransactions()</code></li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Metadata allows you to write generic database tools that work with any schema.
          </p>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for ResultSet and Metadata"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Basic ResultSet Navigation</h3>
            <JavaFileLoader
              fileModule={resultSetDemo}
              title="ResultSetDemo.java"
              highlightLines={[10, 11, 12, 13, 14, 15]} // while loop and getters
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using ResultSetMetaData</h3>
            <JavaFileLoader
              fileModule={resultSetMetaDataDemo}
              title="ResultSetMetaDataDemo.java"
              highlightLines={[8, 9, 10, 11, 12, 13, 14]} // metadata retrieval
            />

            <h3 className="text-xl font-medium mt-6">🔹 DatabaseMetaData in Action</h3>
            <JavaFileLoader
              fileModule={databaseMetaDataDemo}
              title="DatabaseMetaDataDemo.java"
              highlightLines={[7, 8, 9, 10, 11, 12, 13, 14, 15]} // getting table list
            />

            <h3 className="text-xl font-medium mt-6">🔹 Scrollable ResultSet (Preview)</h3>
            <JavaFileLoader
              fileModule={scrollableResultSetDemo}
              title="ScrollableResultSetDemo.java"
              highlightLines={[8, 9, 10, 11, 12, 15, 16, 17]} // creating scrollable statement and navigation
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> In the scrollable example, we create the Statement with
              <code>ResultSet.TYPE_SCROLL_INSENSITIVE</code> and <code>ResultSet.CONCUR_READ_ONLY</code>.
              What happens if you change the type to <code>TYPE_FORWARD_ONLY</code>?
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
            <li>Forgetting to call <code>next()</code> before accessing data – results in <code>SQLException</code>.</li>
            <li>Using column index 0 (JDBC columns start at 1).</li>
            <li>Assuming all ResultSets are scrollable – default is forward-only.</li>
            <li>Not closing ResultSet, Statement, Connection – leads to resource leaks.</li>
            <li>Using <code>getString()</code> for all columns, even numeric ones – can cause subtle bugs.</li>
            <li>Ignoring <code>SQLException</code> when retrieving metadata – e.g., database may not support certain features.</li>
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
            <li>Always use column labels (names) instead of indices for readability.</li>
            <li>Check for null using <code>rs.wasNull()</code> after reading a value.</li>
            <li>Use try-with-resources to auto-close ResultSet, Statement, and Connection.</li>
            <li>When dealing with large datasets, consider streaming or pagination.</li>
            <li>Use <code>ResultSetMetaData</code> to build dynamic reports or tools.</li>
            <li>For database metadata, cache results if they don't change often.</li>
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
              <li>🔹 <strong>Generic printer:</strong> Write a method that prints any ResultSet by using metadata to iterate columns.</li>
              <li>🔹 <strong>Check column type:</strong> Use <code>getColumnType()</code> to decide which getter to call (e.g., getInt vs getString).</li>
              <li>🔹 <strong>DatabaseMetaData trick:</strong> Use <code>getTables()</code> to get a list of all tables in the database – useful for schema explorers.</li>
              <li>🔹 <strong>Performance:</strong> Fetch size – <code>stmt.setFetchSize(50)</code> can optimize network round trips.</li>
              <li>🔹 <strong>Tuhina's tip:</strong> When debugging, print the row number and column count to verify cursor position.</li>
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
              <span className="font-semibold">Point to remember:</span> Students often treat ResultSet like a collection,
              but it's a cursor. Emphasize that it maintains a connection to the database and must be closed.
              <br />
              <span className="italic">
                "Debangshu, think of ResultSet as a pointer moving through rows – you must keep calling next() until it returns false."
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
              <li>✔️ I know how to navigate a ResultSet using <code>next()</code> and other methods.</li>
              <li>✔️ I can retrieve column values by index and by name.</li>
              <li>✔️ I understand how to get metadata from a ResultSet.</li>
              <li>✔️ I can use DatabaseMetaData to discover database structure.</li>
              <li>✔️ I know the difference between forward-only and scrollable ResultSets.</li>
              <li>✔️ I always close ResultSet, Statement, and Connection.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic5;