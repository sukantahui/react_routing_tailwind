// Topic13.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic13_files folder
import jdbcRowSetExample from "./topic13_files/JdbcRowSetExample.java?raw";
import cachedRowSetExample from "./topic13_files/CachedRowSetExample.java?raw";
import webRowSetExample from "./topic13_files/WebRowSetExample.java?raw";
import rowSetJoinExample from "./topic13_files/RowSetJoinExample.java?raw";

const Topic13 = () => {
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
          aria-label="Introduction to RowSet"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            📋 RowSet and Its Types
          </h1>
          <p className="text-lg leading-relaxed">
            <code>RowSet</code> is an extension of the <code>ResultSet</code> interface that provides additional
            flexibility and features. It is part of the <code>javax.sql.rowset</code> package and offers both
            connected and disconnected ways to work with tabular data. RowSets are easier to use, scrollable,
            updatable, and even serializable – making them ideal for JavaBeans and web applications.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Debangshu</span> from Naihati is building a desktop application that
            needs to work offline. He can use <code>CachedRowSet</code> to fetch data, close the connection, and
            still manipulate the data locally. Later, he can reconnect and sync changes.
          </p>
        </section>

        {/* ===== SECTION 2: ROWSET HIERARCHY ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="RowSet hierarchy"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🧬 RowSet Hierarchy
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 200" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Base RowSet interface */}
              <rect x="250" y="20" width="100" height="40" rx="8" className="stroke-indigo-500 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="270" y="45" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">«interface»</text>
              <text x="270" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">RowSet</text>
              
              {/* Extensions */}
              <rect x="30" y="100" width="100" height="40" rx="8" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="50" y="125" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">JdbcRowSet</text>
              
              <rect x="150" y="100" width="100" height="40" rx="8" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="170" y="125" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">CachedRowSet</text>
              
              <rect x="270" y="100" width="100" height="40" rx="8" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="290" y="125" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">WebRowSet</text>
              
              <rect x="390" y="100" width="100" height="40" rx="8" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="410" y="125" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">FilteredRowSet</text>
              
              <rect x="510" y="100" width="100" height="40" rx="8" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="530" y="125" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">JoinRowSet</text>
              
              {/* Connecting lines */}
              <line x1="300" y1="60" x2="200" y2="100" className="stroke-gray-400 dark:stroke-gray-500" />
              <line x1="300" y1="60" x2="300" y2="100" className="stroke-gray-400 dark:stroke-gray-500" />
              <line x1="300" y1="60" x2="400" y2="100" className="stroke-gray-400 dark:stroke-gray-500" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            All RowSet types extend the <code>RowSet</code> interface, which itself extends <code>ResultSet</code>.
          </p>
        </section>

        {/* ===== SECTION 3: TYPES OF ROWSET ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Types of RowSet"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📦 RowSet Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">JdbcRowSet</h3>
              <p className="text-sm mt-1">
                A connected RowSet that wraps a <code>ResultSet</code>. It maintains a connection to the database
                and provides scrollable/updatable capabilities even if the underlying ResultSet doesn't.
              </p>
              <p className="text-xs text-gray-500 mt-2">Use when you need a scrollable/updatable ResultSet.</p>
            </div>
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">CachedRowSet</h3>
              <p className="text-sm mt-1">
                A disconnected RowSet that caches data in memory. It can operate without a database connection,
                and changes can be synchronized back later. It is scrollable, updatable, and serializable.
              </p>
              <p className="text-xs text-gray-500 mt-2">Ideal for offline or desktop applications.</p>
            </div>
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <h3 className="text-xl font-bold text-sky-600 dark:text-sky-400">WebRowSet</h3>
              <p className="text-sm mt-1">
                Extends <code>CachedRowSet</code> and adds the ability to read/write itself in XML format.
                This makes it easy to exchange data between different tiers or applications.
              </p>
              <p className="text-xs text-gray-500 mt-2">Great for web services and data exchange.</p>
            </div>
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">FilteredRowSet</h3>
              <p className="text-sm mt-1">
                Allows filtering of rows based on a <code>Predicate</code> without re-querying the database.
                Only rows that satisfy the filter are visible.
              </p>
              <p className="text-xs text-gray-500 mt-2">Useful for client-side filtering.</p>
            </div>
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 md:col-span-2"
              )}
            >
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">JoinRowSet</h3>
              <p className="text-sm mt-1">
                Allows you to combine data from multiple RowSets (which may come from different databases)
                into one virtual "joined" RowSet. It's like an in‑memory SQL join.
              </p>
              <p className="text-xs text-gray-500 mt-2">Powerful for combining data from multiple sources.</p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: CONNECTED vs DISCONNECTED (with SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Connected vs Disconnected"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🔌 Connected vs Disconnected
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-bold text-center">JdbcRowSet (Connected)</p>
              <svg viewBox="0 0 200 100" className="w-full">
                <rect x="10" y="20" width="60" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" />
                <text x="25" y="45" fontSize="8" fill="#0284c7">App</text>
                <line x1="70" y1="40" x2="120" y2="40" stroke="#0284c7" strokeDasharray="4 4">
                  <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
                </line>
                <rect x="130" y="20" width="60" height="40" rx="4" fill="#bbf7d0" stroke="#16a34a" />
                <text x="145" y="45" fontSize="8" fill="#16a34a">DB</text>
              </svg>
              <p className="text-xs text-center mt-1">Always connected, holds resources</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-bold text-center">CachedRowSet (Disconnected)</p>
              <svg viewBox="0 0 200 120" className="w-full">
                <rect x="10" y="10" width="60" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" />
                <text x="25" y="35" fontSize="8" fill="#0284c7">App</text>
                <line x1="70" y1="30" x2="120" y2="30" stroke="#0284c7" strokeDasharray="4 4">
                  <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
                </line>
                <rect x="130" y="10" width="60" height="40" rx="4" fill="#bbf7d0" stroke="#16a34a" />
                <text x="145" y="35" fontSize="8" fill="#16a34a">DB</text>
                <text x="30" y="70" fontSize="8" fill="#64748b">Fetch data, then close</text>
                <rect x="10" y="80" width="60" height="40" rx="4" fill="#e0f2fe" stroke="#0284c7" />
                <text x="25" y="105" fontSize="8" fill="#0284c7">App</text>
                <rect x="80" y="80" width="100" height="40" rx="4" fill="#fed7aa" stroke="#c2410c" />
                <text x="110" y="105" fontSize="8" fill="#c2410c">Cached Data</text>
              </svg>
              <p className="text-xs text-center mt-1">Disconnected, works offline</p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for RowSet"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Using JdbcRowSet (Connected)</h3>
            <JavaFileLoader
              fileModule={jdbcRowSetExample}
              title="JdbcRowSetExample.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14]} // creating JdbcRowSet, setting properties, scrolling
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using CachedRowSet (Disconnected)</h3>
            <JavaFileLoader
              fileModule={cachedRowSetExample}
              title="CachedRowSetExample.java"
              highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]} // fetch, close connection, modify, sync
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using WebRowSet (XML)</h3>
            <JavaFileLoader
              fileModule={webRowSetExample}
              title="WebRowSetExample.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]} // writeXML, readXML
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using JoinRowSet (Combining Data)</h3>
            <JavaFileLoader
              fileModule={rowSetJoinExample}
              title="RowSetJoinExample.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]} // creating JoinRowSet, adding RowSets
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> In the <code>CachedRowSet</code> example, we close the connection after
              fetching, but we can still read and modify the data. Only when we call <code>acceptChanges()</code> do we need
              a new connection. How is this useful in a web application?
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
            <li>Using <code>CachedRowSet</code> without a connection when trying to sync changes – need a live connection.</li>
            <li>Forgetting to set username/password for disconnected RowSets – they need credentials to reconnect.</li>
            <li>Modifying a <code>CachedRowSet</code> and not calling <code>acceptChanges()</code> – changes are lost.</li>
            <li>Assuming all RowSet implementations are thread-safe – they are not; synchronize externally.</li>
            <li>Using <code>WebRowSet</code> without handling XML parsing exceptions.</li>
            <li>Creating too many <code>CachedRowSet</code> objects for large datasets – memory issues.</li>
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
            <li>Use <code>CachedRowSet</code> for data that needs to be displayed offline or passed between layers.</li>
            <li>Always close the connection after populating a <code>CachedRowSet</code> to free resources.</li>
            <li>Set the username, password, and URL before populating a disconnected RowSet.</li>
            <li>For <code>WebRowSet</code>, use the XML write/read for data exchange between heterogeneous systems.</li>
            <li>When using <code>FilteredRowSet</code>, implement the <code>Predicate</code> interface carefully.</li>
            <li>Prefer <code>JoinRowSet</code> over manual in‑memory joins for cleaner code.</li>
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
              <li>🔹 <strong>Serialization:</strong> <code>CachedRowSet</code> is serializable – you can save it to disk or send over network.</li>
              <li>🔹 <strong>Batch updates:</strong> <code>CachedRowSet</code> can accumulate changes and apply them in a batch when <code>acceptChanges()</code> is called.</li>
              <li>🔹 <strong>Event handling:</strong> RowSet supports listeners to track cursor movements and changes.</li>
              <li>🔹 <strong>Metadata:</strong> You can retrieve metadata from a RowSet even when disconnected.</li>
              <li>🔹 <strong>Abhronila's trick:</strong> Use <code>CachedRowSet</code> as a data source for JasperReports or other reporting tools – it's lightweight and portable.</li>
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
              <span className="font-semibold">Point to remember:</span> RowSet bridges the gap between ResultSet and
              full‑blown ORM frameworks. It's a powerful tool that many students overlook. Emphasize that
              <code>CachedRowSet</code> is especially useful in desktop and web applications where you don't want to keep
              database connections open.
              <br />
              <span className="italic">
                "Swadeep, think of CachedRowSet as taking a photo of your data – you can look at it anywhere, but to update
                the original, you need to go back to the studio (database)."
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
              <li>✔️ I understand the difference between RowSet and ResultSet.</li>
              <li>✔️ I know the five types of RowSet and their use cases.</li>
              <li>✔️ I can use JdbcRowSet to get a scrollable/updatable ResultSet.</li>
              <li>✔️ I can fetch data into a CachedRowSet and work offline.</li>
              <li>✔️ I can write/read a WebRowSet to/from XML.</li>
              <li>✔️ I am aware of common pitfalls and best practices.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic13;