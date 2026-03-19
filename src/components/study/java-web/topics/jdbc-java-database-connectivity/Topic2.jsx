// Topic2.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic2_files folder
import simpleConnection from "./topic2_files/SimpleConnection.java?raw";
import connectionProperties from "./topic2_files/ConnectionProperties.java?raw";
import connectionURLDemo from "./topic2_files/ConnectionURLDemo.java?raw";
import connectionCloseExample from "./topic2_files/ConnectionCloseExample.java?raw";

const Topic2 = () => {
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
          aria-label="Introduction to Connecting Java with Databases"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            🔗 Connecting Java with Databases
          </h1>
          <p className="text-lg leading-relaxed">
            After understanding JDBC drivers and architecture, the next step is to actually
            <strong className="text-indigo-600 dark:text-indigo-400"> establish a connection</strong> between your Java application and a database.
            This is done using the <code>DriverManager</code> class or a <code>DataSource</code> (covered later).
          </p>
          <p className="mt-2 text-md">
            Think of it like making a phone call: you need the correct number (URL), credentials (user/password), and
            a working network (driver). <span className="font-semibold">Swadeep</span> from Barrackpore uses this to store his school project data.
          </p>
        </section>

        {/* ===== SECTION 2: CONNECTION STEPS (with SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="Steps to connect"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🧭 Steps to Establish a Connection
          </h2>

          {/* SVG illustrating the connection process */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center hover:shadow-lg transition-shadow duration-300">
            <svg viewBox="0 0 600 180" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Java application box */}
              <rect x="20" y="20" width="120" height="60" rx="8" className="stroke-indigo-500 dark:stroke-indigo-400" />
              <text x="50" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Java App</text>

              {/* DriverManager box */}
              <rect x="180" y="20" width="120" height="60" rx="8" className="stroke-emerald-500 dark:stroke-emerald-400" />
              <text x="200" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">DriverManager</text>

              {/* Driver box */}
              <rect x="340" y="20" width="120" height="60" rx="8" className="stroke-sky-500 dark:stroke-sky-400" />
              <text x="370" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Driver</text>

              {/* Database box */}
              <rect x="500" y="20" width="80" height="60" rx="8" className="stroke-purple-500 dark:stroke-purple-400" />
              <text x="520" y="55" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">DB</text>

              {/* Animated arrows */}
              <line x1="140" y1="50" x2="180" y2="50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="300" y1="50" x2="340" y2="50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="460" y1="50" x2="500" y2="50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </line>

              {/* Labels */}
              <text x="150" y="30" className="text-[8px] fill-gray-500" stroke="none">1. getConnection()</text>
              <text x="310" y="30" className="text-[8px] fill-gray-500" stroke="none">2. connect()</text>
              <text x="470" y="30" className="text-[8px] fill-gray-500" stroke="none">3. native protocol</text>

              {/* Return arrow */}
              <path d="M540 80 L540 110 L100 110 L100 80" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4" fill="none">
                <animate attributeName="strokeDashoffset" values="0;12;0" dur="2.5s" repeatCount="indefinite" />
              </path>
              <text x="250" y="130" className="text-[8px] fill-gray-500" stroke="none">4. Connection object returned</text>
            </svg>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            The application calls <code>DriverManager.getConnection()</code>, which finds a suitable driver,
            establishes a network connection, and returns a <code>Connection</code> object.
          </p>
        </section>

        {/* ===== SECTION 3: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-6"
          aria-label="Code examples"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Simple Connection (try-with-resources)</h3>
            <JavaFileLoader
              fileModule={simpleConnection}
              title="SimpleConnection.java"
              highlightLines={[6, 7, 8, 9]} // URL, credentials, try-with-resources
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using Properties Object</h3>
            <JavaFileLoader
              fileModule={connectionProperties}
              title="ConnectionProperties.java"
              highlightLines={[8, 9, 10, 11, 14]} // Properties setup
            />

            <h3 className="text-xl font-medium mt-6">🔹 Different Database URLs</h3>
            <JavaFileLoader
              fileModule={connectionURLDemo}
              title="ConnectionURLDemo.java"
              highlightLines={[7, 8, 9, 10]} // URL strings
            />

            <h3 className="text-xl font-medium mt-6">🔹 Manual Connection Closing (finally block)</h3>
            <JavaFileLoader
              fileModule={connectionCloseExample}
              title="ConnectionCloseExample.java"
              highlightLines={[12, 15, 16, 17, 18]} // finally close
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Think about…</strong> Why is try-with-resources preferred over manually closing in finally?
              Observe that it automatically closes the connection even if an exception occurs.
            </p>
          </div>
        </section>

        {/* ===== SECTION 4: COMMON PITFALLS ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-3"
          aria-label="Common mistakes"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-red-200 dark:border-red-800 pb-2">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
            <li>Forgetting to add the JDBC driver JAR to the classpath → <code>No suitable driver found</code>.</li>
            <li>Using wrong URL format (e.g., missing database name, wrong port).</li>
            <li>Hardcoding credentials in source code (security risk).</li>
            <li>Not closing the connection → resource leaks, database may run out of connections.</li>
            <li>Ignoring <code>SQLException</code> – always handle or log it.</li>
            <li>Using <code>Class.forName()</code> unnecessarily in JDBC 4.0+.</li>
          </ul>
        </section>

        {/* ===== SECTION 5: BEST PRACTICES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-3"
          aria-label="Best practices"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-green-200 dark:border-green-800 pb-2">
            ✅ Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
            <li>Always use try-with-resources (Java 7+) to auto-close connections.</li>
            <li>Store database credentials in configuration files (see Topic 15).</li>
            <li>Use connection pooling in production (Topic 9).</li>
            <li>Set reasonable timeout values in the URL (e.g., <code>connectTimeout=5000</code>).</li>
            <li>Test connection before heavy operations (<code>conn.isValid(5)</code>).</li>
            <li>Close resources in the reverse order of opening (ResultSet → Statement → Connection).</li>
          </ul>
        </section>

        {/* ===== SECTION 6: TIPS & TRICKS ===== */}
        <section
          className="animate-[fadeSlideUp_1.1s_ease-out] space-y-3"
          aria-label="Professional tips"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-amber-200 dark:border-amber-800 pb-2">
            🧠 Tips & Tricks
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>🔹 <strong>URL parameters:</strong> Append <code>?useSSL=false&amp;serverTimezone=UTC</code> to MySQL URLs to avoid common warnings.</li>
              <li>🔹 <strong>Debugging connections:</strong> Enable <code>DriverManager.setLogWriter(new PrintWriter(System.out))</code> to see which driver is used.</li>
              <li>🔹 <strong>Check driver version:</strong> Always use the driver version compatible with your database server.</li>
              <li>🔹 <strong>Connection timeout:</strong> Add <code>connectTimeout=5000</code> to the URL to avoid hanging.</li>
              <li>🔹 <strong>Swadeep's tip:</strong> Keep a pool of connection strings for different environments (dev, test, prod).</li>
            </ul>
          </div>
        </section>

        {/* ===== SECTION 7: TEACHER'S NOTE ===== */}
        <section
          className="animate-[fadeSlideUp_1.2s_ease-out] space-y-3"
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
              <span className="font-semibold">Point to remember:</span> Students often forget that the connection must be closed. 
              Emphasize the try-with-resources pattern from the start. 
              <br />
              <span className="italic">
                "Abhronila, think of a database connection like a phone call – you must hang up when done, otherwise you'll block the line."
              </span>
            </p>
          </div>
        </section>

        {/* ===== SECTION 8: MINI CHECKLIST ===== */}
        <section
          className="animate-[fadeSlideUp_1.3s_ease-out] space-y-3"
          aria-label="Quick checklist"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2">
            📋 Mini Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
            <ul className="space-y-2">
              <li>✔️ I know the correct URL format for my database.</li>
              <li>✔️ I have added the driver JAR to the classpath.</li>
              <li>✔️ I can write code using <code>DriverManager.getConnection()</code>.</li>
              <li>✔️ I understand try-with-resources and manual closing.</li>
              <li>✔️ I know common connection pitfalls and how to avoid them.</li>
              <li>✔️ I can pass connection properties via a <code>Properties</code> object.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic2;