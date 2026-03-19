// Topic9.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic9_files folder
import dbcpExample from "./topic9_files/DBCPExample.java?raw";
import hikariExample from "./topic9_files/HikariExample.java?raw";
import dataSourceConfig from "./topic9_files/DataSourceConfig.java?raw";
import connectionPoolDemo from "./topic9_files/ConnectionPoolDemo.java?raw";

const Topic9 = () => {
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
          aria-label="Introduction to Connection Pooling and DataSource"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            🔌 Connection Pooling and DataSource
          </h1>
          <p className="text-lg leading-relaxed">
            In real‑world applications, creating a new database connection for every request is expensive and slow.
            <strong className="text-indigo-600 dark:text-indigo-400"> Connection pooling</strong> maintains a pool of
            reusable connections, dramatically improving performance. The <code>DataSource</code> interface provides a
            standard way to obtain pooled connections, replacing the old <code>DriverManager</code>.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Debangshu</span> from Naihati runs a busy college website with hundreds of
            concurrent users. Without connection pooling, his database would quickly run out of connections and crash.
          </p>
        </section>

        {/* ===== SECTION 2: WHY POOLING? (with SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="Why connection pooling"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🏊 The Problem: Expensive Connections
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 180" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Without pooling */}
              <rect x="20" y="20" width="80" height="60" rx="8" className="stroke-red-400 fill-red-50 dark:fill-red-900/20" />
              <text x="30" y="55" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">App</text>
              
              <path d="M100 50 L200 50" className="stroke-gray-400" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              
              <rect x="220" y="20" width="80" height="60" rx="8" className="stroke-red-400 fill-red-50 dark:fill-red-900/20" />
              <text x="240" y="55" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">DB</text>
              <text x="120" y="30" className="text-[8px] fill-gray-500" stroke="none">new connection</text>
              
              {/* Repeat for each request */}
              <path d="M100 120 L200 120" className="stroke-gray-400" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
              </path>
              <text x="120" y="100" className="text-[8px] fill-gray-500" stroke="none">new connection</text>
              
              {/* With pooling */}
              <rect x="350" y="20" width="80" height="60" rx="8" className="stroke-green-400 fill-green-50 dark:fill-green-900/20" />
              <text x="370" y="55" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">App</text>
              
              <rect x="450" y="50" width="120" height="80" rx="8" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="480" y="95" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Pool</text>
              <circle cx="500" cy="70" r="6" fill="green" className="dark:fill-green-400" />
              <circle cx="520" cy="70" r="6" fill="green" className="dark:fill-green-400" />
              <circle cx="540" cy="70" r="6" fill="green" className="dark:fill-green-400" />
              
              <rect x="590" y="20" width="80" height="60" rx="8" className="stroke-green-400 fill-green-50 dark:fill-green-900/20" />
              <text x="610" y="55" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">DB</text>
              
              <path d="M430 80 L450 80" className="stroke-gray-400" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="380" y="70" className="text-[8px] fill-gray-500" stroke="none">borrow</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Left: each request opens its own connection (costly). Right: connections are reused from a pool.
          </p>
        </section>

        {/* ===== SECTION 3: DATASOURCE vs DRIVERMANAGER ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="DataSource vs DriverManager"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📋 DataSource Interface
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">DriverManager</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Basic, simple to use</li>
                <li>No connection pooling</li>
                <li>Every call creates new connection</li>
                <li>Not suitable for production</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400">DataSource</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Standard interface for connection factories</li>
                <li>Supports connection pooling</li>
                <li>Can be configured via JNDI (in containers)</li>
                <li>Portable across environments</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            In Java EE / Spring, DataSource is the preferred way to obtain database connections.
          </p>
        </section>

        {/* ===== SECTION 4: POPULAR CONNECTION POOLS ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Popular connection pools"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🏊 Popular Connection Pool Implementations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Apache DBCP */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-center space-x-3 mb-2">
                <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                <h3 className="text-xl font-bold">Apache DBCP</h3>
              </div>
              <p className="text-sm">
                One of the oldest and most widely used connection pools. Comes with commons-dbcp2.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Pros: Mature, well‑documented. Cons: Can be slower under high concurrency.
              </p>
            </div>
            {/* HikariCP */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-center space-x-3 mb-2">
                <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
                <h3 className="text-xl font-bold">HikariCP</h3>
              </div>
              <p className="text-sm">
                Modern, extremely fast, lightweight. Default connection pool in Spring Boot 2.x.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Pros: Blazing fast, low overhead. Cons: Slightly fewer configuration options.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 5: IMPORTANT CONFIGURATION PARAMETERS ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-4"
          aria-label="Configuration parameters"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            ⚙️ Key Pool Configuration Parameters
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left py-2">Parameter</th>
                  <th className="text-left py-2">Description</th>
                  <th className="text-left py-2">Typical Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 font-mono">initialSize</td>
                  <td>Number of connections created when pool starts</td>
                  <td>5–10</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 font-mono">maxTotal</td>
                  <td>Maximum number of connections in the pool</td>
                  <td>20–100 (depends on DB)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 font-mono">maxIdle</td>
                  <td>Maximum number of idle connections to keep</td>
                  <td>10</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 font-mono">minIdle</td>
                  <td>Minimum number of idle connections to maintain</td>
                  <td>2–5</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 font-mono">maxWaitMillis</td>
                  <td>Maximum time to wait for a connection before throwing exception</td>
                  <td>30000 (30 sec)</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">validationQuery</td>
                  <td>SQL query to test if a connection is valid (e.g., "SELECT 1")</td>
                  <td>SELECT 1</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-3">
              Note: Parameter names may differ slightly between DBCP and HikariCP (e.g., Hikari uses
              <code>maximumPoolSize</code> instead of <code>maxTotal</code>).
            </p>
          </div>
        </section>

        {/* ===== SECTION 6: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.1s_ease-out] space-y-6"
          aria-label="Code examples for connection pooling"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Basic DataSource Setup (Standalone)</h3>
            <JavaFileLoader
              fileModule={dataSourceConfig}
              title="DataSourceConfig.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 14]} // setting properties, getConnection
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using Apache DBCP2</h3>
            <JavaFileLoader
              fileModule={dbcpExample}
              title="DBCPExample.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18]} // BasicDataSource configuration
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using HikariCP</h3>
            <JavaFileLoader
              fileModule={hikariExample}
              title="HikariExample.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17]} // HikariConfig, HikariDataSource
            />

            <h3 className="text-xl font-medium mt-6">🔹 Demonstrating Pool Reuse</h3>
            <JavaFileLoader
              fileModule={connectionPoolDemo}
              title="ConnectionPoolDemo.java"
              highlightLines={[7, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19]} // borrow and return
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> In the pool demo, we never actually close the physical connection –
              we just return it to the pool. The <code>close()</code> method on a pooled connection is overridden to
              return it to the pool, not to close it.
            </p>
          </div>
        </section>

        {/* ===== SECTION 7: COMMON PITFALLS ===== */}
        <section
          className="animate-[fadeSlideUp_1.2s_ease-out] space-y-3"
          aria-label="Common mistakes"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-red-200 dark:border-red-800 pb-2">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
            <li>Not closing connections (or forgetting to return them to the pool) – leads to pool exhaustion.</li>
            <li>Setting pool sizes too high – can overwhelm the database with too many connections.</li>
            <li>Not configuring validation queries – connections may become stale and cause errors.</li>
            <li>Using the same DataSource instance without proper synchronization in multithreaded environments (DataSource is thread-safe, but care needed with config).</li>
            <li>Mixing up parameter names between DBCP and HikariCP – leads to ineffective configuration.</li>
            <li>Not handling <code>SQLException</code> when borrowing a connection – the pool may be empty or timeout.</li>
          </ul>
        </section>

        {/* ===== SECTION 8: BEST PRACTICES ===== */}
        <section
          className="animate-[fadeSlideUp_1.3s_ease-out] space-y-3"
          aria-label="Best practices"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-green-200 dark:border-green-800 pb-2">
            ✅ Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
            <li>Always close connections, statements, and result sets in finally blocks or try-with-resources.</li>
            <li>Choose HikariCP for new projects – it's fast and actively maintained.</li>
            <li>Set appropriate pool size based on database max connections and application concurrency.</li>
            <li>Enable connection validation (testOnBorrow or testWhileIdle) to avoid handing out dead connections.</li>
            <li>Monitor pool usage (active/idle counts) in production.</li>
            <li>Externalize DataSource configuration (properties files, environment variables) for different environments.</li>
          </ul>
        </section>

        {/* ===== SECTION 9: TIPS & TRICKS ===== */}
        <section
          className="animate-[fadeSlideUp_1.4s_ease-out] space-y-3"
          aria-label="Professional tips"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-amber-200 dark:border-amber-800 pb-2">
            🧠 Tips & Tricks
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>🔹 <strong>Connection leak detection:</strong> HikariCP can log leaks if you enable <code>leakDetectionThreshold</code>.</li>
              <li>🔹 <strong>PreparedStatement pooling:</strong> Some pools support pooling of PreparedStatements as well – can boost performance further.</li>
              <li>🔹 <strong>JMX monitoring:</strong> Both DBCP and HikariCP expose JMX beans to monitor pool health.</li>
              <li>🔹 <strong>Graceful shutdown:</strong> When shutting down your app, close the DataSource to release all connections.</li>
              <li>🔹 <strong>Tuhina's trick:</strong> Use a connection pool in your development environment too – it mimics production behavior and catches pool-related bugs early.</li>
            </ul>
          </div>
        </section>

        {/* ===== SECTION 10: TEACHER'S NOTE ===== */}
        <section
          className="animate-[fadeSlideUp_1.5s_ease-out] space-y-3"
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
              <span className="font-semibold">Point to remember:</span> Connection pooling is not just an optimization – it's
              essential for any production application with more than a handful of users. Students often think DriverManager is
              fine until they deploy and the database crashes.
              <br />
              <span className="italic">
                "Abhronila, think of connection pooling as a library – you borrow a book, read it, and return it so others can use it.
                DriverManager is like buying a new book for every reader – expensive and wasteful."
              </span>
            </p>
          </div>
        </section>

        {/* ===== SECTION 11: MINI CHECKLIST ===== */}
        <section
          className="animate-[fadeSlideUp_1.6s_ease-out] space-y-3"
          aria-label="Quick checklist"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2">
            📋 Mini Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
            <ul className="space-y-2">
              <li>✔️ I understand why connection pooling is necessary.</li>
              <li>✔️ I know the difference between DriverManager and DataSource.</li>
              <li>✔️ I can configure Apache DBCP or HikariCP in a Java application.</li>
              <li>✔️ I understand key pool parameters and how to set them.</li>
              <li>✔️ I know how to properly return connections to the pool (by calling close).</li>
              <li>✔️ I am aware of common pool-related pitfalls and how to avoid them.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic9;