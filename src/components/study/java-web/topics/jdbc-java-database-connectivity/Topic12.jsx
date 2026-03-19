// Topic12.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic12_files folder
import callableStatementIn from "./topic12_files/CallableStatementIn.java?raw";
import callableStatementOut from "./topic12_files/CallableStatementOut.java?raw";
import callableStatementInOut from "./topic12_files/CallableStatementInOut.java?raw";
import callableStatementResultSet from "./topic12_files/CallableStatementResultSet.java?raw";

const Topic12 = () => {
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
          aria-label="Introduction to Stored Procedures and CallableStatement"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            📞 Calling Stored Procedures with CallableStatement
          </h1>
          <p className="text-lg leading-relaxed">
            A <strong>stored procedure</strong> is a set of pre‑compiled SQL statements stored in the database.
            It can accept parameters, perform complex operations, and return results. In JDBC, we use
            <code className="mx-1">CallableStatement</code> to invoke stored procedures. This is especially useful for
            encapsulating business logic in the database, improving performance by reducing network traffic.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Abhronila</span> from Ichapur is building a reporting system. The company's DBA
            created a stored procedure to calculate monthly sales. Abhronila needs to call it from Java – that's where
            <code>CallableStatement</code> comes in.
          </p>
        </section>

        {/* ===== SECTION 2: WHAT IS A STORED PROCEDURE? ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="What is a stored procedure?"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🏛️ Stored Procedures
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <p className="mb-3">
              A stored procedure is like a method in Java – it has a name, can take parameters, and can return values.
              It's stored in the database and can be called by any application.
            </p>
            <p className="font-semibold">Example (MySQL):</p>
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              {`DELIMITER //
CREATE PROCEDURE GetStudentCountByCity(IN city_name VARCHAR(50), OUT count INT)
BEGIN
    SELECT COUNT(*) INTO count FROM students WHERE city = city_name;
END //
DELIMITER ;`}
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This procedure takes an input city name and returns the number of students in that city via an OUT parameter.
            </p>
          </div>
        </section>

        {/* ===== SECTION 3: CALLABLESTATEMENT BASICS ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="CallableStatement basics"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🛠️ CallableStatement
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <p className="mb-3">
              <code>CallableStatement</code> extends <code>PreparedStatement</code> and is used to execute stored procedures.
              The SQL syntax varies by database, but the standard JDBC escape syntax is:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm">
              {`{call procedure_name(?, ?, ...)}  -- for procedures
{? = call function_name(?, ...)}      -- for functions`}
            </pre>
            <h3 className="font-semibold mt-4">Key methods:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><code>registerOutParameter(int index, int sqlType)</code> – declares an OUT parameter type.</li>
              <li><code>setXxx(int index, value)</code> – sets IN parameters (same as PreparedStatement).</li>
              <li><code>execute()</code> – executes the procedure.</li>
              <li><code>getXxx(int index)</code> – retrieves OUT parameter values after execution.</li>
            </ul>
          </div>
        </section>

        {/* ===== SECTION 4: PARAMETER TYPES (with SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Parameter types diagram"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🔄 IN, OUT, and INOUT Parameters
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 150" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Java App */}
              <rect x="20" y="30" width="100" height="60" rx="8" className="stroke-indigo-500 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="40" y="65" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Java</text>
              
              {/* CallableStatement */}
              <rect x="150" y="20" width="120" height="40" rx="4" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="170" y="45" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">CallableStatement</text>
              
              {/* Database */}
              <rect x="300" y="30" width="100" height="60" rx="8" className="stroke-purple-500 fill-purple-50 dark:fill-purple-900/20" />
              <text x="330" y="65" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Database</text>
              
              {/* Arrows for IN */}
              <path d="M120 50 L150 40" className="stroke-green-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="130" y="30" className="text-[8px] fill-green-600" stroke="none">IN (setXxx)</text>
              
              {/* Arrows for OUT */}
              <path d="M270 40 L300 50" className="stroke-blue-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
              </path>
              <text x="210" y="70" className="text-[8px] fill-blue-600" stroke="none">OUT (getXxx)</text>
              
              {/* Procedure call inside DB */}
              <text x="310" y="20" className="text-[8px] fill-gray-500" stroke="none">CALL proc(IN, OUT)</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            IN parameters are set before execution; OUT parameters are retrieved after.
          </p>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for CallableStatement"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Stored Procedure with IN Parameter</h3>
            <JavaFileLoader
              fileModule={callableStatementIn}
              title="CallableStatementIn.java"
              highlightLines={[6, 7, 8, 9, 10, 11]} // prepareCall, setInt, execute
            />

            <h3 className="text-xl font-medium mt-6">🔹 Stored Procedure with OUT Parameter</h3>
            <JavaFileLoader
              fileModule={callableStatementOut}
              title="CallableStatementOut.java"
              highlightLines={[7, 8, 9, 10, 11, 12, 13, 14]} // registerOutParameter, getInt
            />

            <h3 className="text-xl font-medium mt-6">🔹 Stored Procedure with INOUT Parameter</h3>
            <JavaFileLoader
              fileModule={callableStatementInOut}
              title="CallableStatementInOut.java"
              highlightLines={[7, 8, 9, 10, 11, 12, 13]} // setInt, registerOutParameter, getInt
            />

            <h3 className="text-xl font-medium mt-6">🔹 Stored Procedure Returning a ResultSet</h3>
            <JavaFileLoader
              fileModule={callableStatementResultSet}
              title="CallableStatementResultSet.java"
              highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14]} // execute, getResultSet
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> The OUT parameter must be registered with the correct SQL type
              (<code>Types.INTEGER</code>, <code>Types.VARCHAR</code>, etc.) before execution. What happens if you use the wrong type?
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
            <li>Forgetting to register OUT parameters before execution.</li>
            <li>Using the wrong SQL type when registering OUT parameters (e.g., using <code>Types.INTEGER</code> for a VARCHAR).</li>
            <li>Not handling <code>SQLException</code> when the procedure doesn't exist or has wrong parameters.</li>
            <li>Assuming all databases use the same escape syntax – some databases have proprietary syntax.</li>
            <li>Calling <code>executeQuery()</code> for a procedure that returns multiple result sets or update counts.</li>
            <li>Not closing the CallableStatement (though it's auto‑closed in try‑with‑resources).</li>
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
            <li>Use stored procedures for complex database operations that are used frequently.</li>
            <li>Always register OUT parameters with the correct JDBC type (<code>java.sql.Types</code>).</li>
            <li>Use the standard escape syntax <code>{`call proc(?,?)`}</code> for portability.</li>
            <li>For procedures that return result sets, use <code>execute()</code> and then <code>getResultSet()</code>.</li>
            <li>Handle multiple result sets with <code>getMoreResults()</code> if needed.</li>
            <li>Document the stored procedure's parameters and return type clearly in your code.</li>
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
              <li>🔹 <strong>Debugging:</strong> Log the actual SQL string (including parameter values) before execution.</li>
              <li>🔹 <strong>Named parameters:</strong> Some databases (like Oracle) support named parameters using <code>/*+*/</code> hints – but not portable.</li>
              <li>🔹 <strong>Multiple OUT parameters:</strong> Register them in the order they appear in the procedure definition.</li>
              <li>🔹 <strong>Returning cursors:</strong> In Oracle, you can return a REF CURSOR and retrieve it as a ResultSet.</li>
              <li>🔹 <strong>Swadeep's trick:</strong> Create a wrapper method for each stored procedure in a DAO class – keeps JDBC code centralized and reusable.</li>
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
              <span className="font-semibold">Point to remember:</span> Stored procedures are powerful but can tie your application to a specific database. 
              Use them judiciously – for complex logic that benefits from being close to the data, but avoid business logic in the database if you need database independence.
              <br />
              <span className="italic">
                "Tuhina, think of stored procedures as APIs provided by the database. CallableStatement is your HTTP client to call those APIs."
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
              <li>✔️ I understand what stored procedures are and when to use them.</li>
              <li>✔️ I know how to create a CallableStatement using the escape syntax.</li>
              <li>✔️ I can set IN parameters, register OUT parameters, and retrieve results.</li>
              <li>✔️ I can handle stored procedures that return result sets.</li>
              <li>✔️ I know the difference between IN, OUT, and INOUT parameters.</li>
              <li>✔️ I am aware of common pitfalls and best practices.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic12;