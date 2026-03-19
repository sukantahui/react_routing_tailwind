// Topic16.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic16_files folder
import basicTryCatch from "./topic16_files/BasicTryCatch.java?raw";
import tryWithResources from "./topic16_files/TryWithResources.java?raw";
import multiCatch from "./topic16_files/MultiCatch.java?raw";
import sqlExceptionMethods from "./topic16_files/SQLExceptionMethods.java?raw";

const Topic16 = () => {
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
          aria-label="Introduction to SQL Exception Handling"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            🚨 SQL Exception Handling and Best Practices
          </h1>
          <p className="text-lg leading-relaxed">
            JDBC operations can throw <code>SQLException</code> for various reasons: connection failures,
            syntax errors, constraint violations, etc. Proper exception handling is crucial for building
            robust applications. This topic covers how to handle <code>SQLException</code> effectively,
            including retrieving error details, chaining exceptions, using try‑with‑resources, and following
            best practices.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Abhronila</span> from Ichapur's application crashed when the database
            went down because she didn't handle exceptions properly. After learning proper exception handling,
            her app now shows user‑friendly messages and logs the real cause for debugging.
          </p>
        </section>

        {/* ===== SECTION 2: UNDERSTANDING SQLEXCEPTION ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="Understanding SQLException"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🔍 Understanding SQLException
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <p className="mb-3">
              <code>SQLException</code> is a checked exception that provides several methods to get detailed
              information about the error:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><code>getMessage()</code> – Returns the error message.</li>
              <li><code>getSQLState()</code> – Returns the SQLState string (standard error code).</li>
              <li><code>getErrorCode()</code> – Returns the vendor‑specific error code.</li>
              <li><code>getNextException()</code> – Returns the next exception in the chain (multiple errors).</li>
              <li><code>getCause()</code> – Returns the underlying cause (if any).</li>
            </ul>
            <p className="mt-3 text-sm text-amber-600 dark:text-amber-400">
              ⚠️ SQLException can be chained – one exception may have another attached. Use a loop to iterate.
            </p>
          </div>
        </section>

        {/* ===== SECTION 3: EXCEPTION HANDLING PATTERNS ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Exception handling patterns"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🧩 Exception Handling Patterns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Basic try‑catch‑finally</h3>
              <p className="text-sm mt-1">
                The traditional way: open resources in try, handle exception in catch, close in finally.
                Verbose but works in Java 6 and earlier.
              </p>
            </div>
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">try‑with‑resources</h3>
              <p className="text-sm mt-1">
                Java 7+ feature: automatically closes resources that implement <code>AutoCloseable</code>.
                Cleaner, less error‑prone.
              </p>
            </div>
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700 md:col-span-2"
              )}
            >
              <h3 className="text-xl font-bold text-sky-600 dark:text-sky-400">Multi‑catch (Java 7+)</h3>
              <p className="text-sm mt-1">
                Catch multiple exception types in one block: <code>catch (SQLException | IOException e)</code>.
                Reduces duplication.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: VISUAL FLOW (EXCEPTION PROPAGATION) ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Exception propagation diagram"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📡 Exception Propagation
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 150" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Method call stack */}
              <rect x="50" y="10" width="120" height="40" rx="8" className="stroke-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="70" y="35" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">main()</text>
              
              <rect x="50" y="60" width="120" height="40" rx="8" className="stroke-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="60" y="85" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">processData()</text>
              
              <rect x="50" y="110" width="120" height="40" rx="8" className="stroke-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="60" y="135" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">executeQuery()</text>
              
              {/* Arrow showing exception thrown */}
              <path d="M170 130 L240 100" stroke="red" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="190" y="110" className="text-xs fill-red-600" stroke="none">throws SQLException</text>
              
              {/* Database icon */}
              <rect x="300" y="40" width="80" height="60" rx="8" className="stroke-purple-400 fill-purple-50 dark:fill-purple-900/20" />
              <text x="320" y="75" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">DB</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Exceptions propagate up the call stack until caught. Uncaught exceptions terminate the thread.
          </p>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for exception handling"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Basic try‑catch‑finally (Old style)</h3>
            <JavaFileLoader
              fileModule={basicTryCatch}
              title="BasicTryCatch.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]} // try-catch-finally
            />

            <h3 className="text-xl font-medium mt-6">🔹 try‑with‑resources (Java 7+)</h3>
            <JavaFileLoader
              fileModule={tryWithResources}
              title="TryWithResources.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13]} // try-with-resources
            />

            <h3 className="text-xl font-medium mt-6">🔹 Multi‑catch and SQLException details</h3>
            <JavaFileLoader
              fileModule={multiCatch}
              title="MultiCatch.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]} // multi-catch and iteration
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using SQLException methods to diagnose errors</h3>
            <JavaFileLoader
              fileModule={sqlExceptionMethods}
              title="SQLExceptionMethods.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]} // getSQLState, getErrorCode, loop
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> In the multi‑catch example, we catch both <code>SQLException</code> and
              <code>ClassNotFoundException</code>. Why can't we just catch <code>Exception</code>? (Hint: think about
              catching specific vs. generic exceptions.)
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
            <li>Swallowing exceptions (empty catch block) – hides problems and makes debugging impossible.</li>
            <li>Not closing resources in finally – leads to connection leaks.</li>
            <li>Catching <code>Exception</code> instead of specific exceptions – masks unexpected errors.</li>
            <li>Logging the exception but not handling it (e.g., not rolling back a transaction).</li>
            <li>Forgetting that <code>SQLException</code> can be chained – only checking the first exception may miss details.</li>
            <li>Using <code>printStackTrace()</code> in production – not helpful for monitoring; use a logger.</li>
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
            <li>Always use try‑with‑resources for <code>Connection</code>, <code>Statement</code>, and <code>ResultSet</code> (Java 7+).</li>
            <li>Catch specific exceptions (<code>SQLException</code>, <code>IOException</code>) rather than generic <code>Exception</code>.</li>
            <li>Log exceptions with a proper logging framework (SLF4J, Log4j, java.util.logging).</li>
            <li>When catching, decide whether to handle (e.g., retry, rollback) or rethrow (possibly as a runtime exception).</li>
            <li>In multi‑layer applications, translate low‑level exceptions to business exceptions at layer boundaries.</li>
            <li>Always iterate through the entire exception chain using a loop or recursion to capture all details.</li>
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
              <li>🔹 <strong>BatchUpdateException:</strong> When batch fails, examine <code>getUpdateCounts()</code> to see which statements succeeded.</li>
              <li>🔹 <strong>Retry logic:</strong> For transient errors (deadlock, timeout), implement a retry mechanism with exponential backoff.</li>
              <li>🔹 <strong>Custom exception:</strong> Create a <code>DataAccessException</code> (runtime) to wrap <code>SQLException</code> and avoid forcing callers to handle checked exceptions.</li>
              <li>🔹 <strong>Connection validation:</strong> Before using a connection from a pool, test it with <code>isValid(5)</code> to avoid using stale connections.</li>
              <li>🔹 <strong>Swadeep's trick:</strong> In development, print the SQLState and error code to quickly identify the problem. Keep a reference of common SQLState codes (e.g., 23000 = integrity constraint violation).</li>
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
              <span className="font-semibold">Point to remember:</span> Exception handling is not an afterthought – it's part of the design.
              Students often write code that works only in the "happy path". Emphasize that robust applications anticipate and handle failures gracefully.
              <br />
              <span className="italic">
                "Tuhina, think of exception handling like airbags in a car – you hope you never need them, but you're glad they're there when something goes wrong."
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
              <li>✔️ I understand the methods provided by <code>SQLException</code> (getMessage, getSQLState, getErrorCode).</li>
              <li>✔️ I know how to use try‑with‑resources to auto‑close JDBC resources.</li>
              <li>✔️ I can iterate through a chain of <code>SQLException</code>s.</li>
              <li>✔️ I follow best practices: log exceptions, avoid swallowing, handle or rethrow appropriately.</li>
              <li>✔️ I can differentiate between transient and permanent errors and decide on retry logic.</li>
              <li>✔️ I am aware of common pitfalls and how to avoid them.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic16;