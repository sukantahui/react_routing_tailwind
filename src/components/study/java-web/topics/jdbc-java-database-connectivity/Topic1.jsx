// Topic1.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples (these files must exist in ./topic1_files/)
import driverRegistration from "./topic1_files/DriverRegistration.java?raw";
import connectionExample from "./topic1_files/ConnectionExample.java?raw";
import architectureDemo from "./topic1_files/ArchitectureDemo.java?raw";

const Topic1 = () => {
  // Calculate Sukanta Hui's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998; // started in 1998

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 min-h-screen py-8 px-4 transition-colors duration-300">
      {/* Scoped keyframe animations (respects reduced motion) */}
      <style>
        {`
          @keyframes fadeSlideUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes gentlePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>

      {/* Main container – all sections stacked */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* ===== SECTION 1: TITLE & INTRODUCTION ===== */}
        <section
          className="animate-[fadeSlideUp_0.6s_ease-out]"
          aria-label="Introduction to JDBC Drivers"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            🔌 JDBC Drivers & Architecture
          </h1>
          <p className="text-lg leading-relaxed">
            JDBC (Java Database Connectivity) is the bridge between your Java application and a database. 
            <strong className="text-indigo-600 dark:text-indigo-400"> JDBC drivers</strong> are the concrete 
            implementations that handle the communication. Think of them as translators: your Java code speaks 
            JDBC, the driver translates it to the database's native protocol.
          </p>
          <p className="mt-2 text-md">
            Imagine <span className="font-semibold">Swadeep</span> from Barrackpore wants to store student 
            records in MySQL. Without a driver, Java and MySQL would be like two people speaking different languages. 
            The driver acts as the interpreter.
          </p>
        </section>

        {/* ===== SECTION 2: TYPES OF JDBC DRIVERS (4 cards) ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="Four types of JDBC drivers"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🚗 Types of JDBC Drivers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type 1: JDBC-ODBC Bridge */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-start space-x-4">
                {/* SVG icon: bridge */}
                <svg
                  className="w-16 h-16 flex-shrink-0 text-indigo-500 dark:text-indigo-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 12h16M8 8v8M16 8v8M6 20h12" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  {/* Animated dots representing translation */}
                  <circle cx="4" cy="12" r="1" fill="currentColor">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="20" cy="12" r="1" fill="currentColor">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div>
                  <h3 className="text-xl font-bold">Type 1: JDBC-ODBC Bridge</h3>
                  <p className="mt-1">
                    Uses ODBC driver under the hood. Requires ODBC configuration on client. 
                    <span className="block text-sm text-amber-600 dark:text-amber-400 mt-1">
                      ⚠️ Deprecated in Java 8 – only for legacy systems.
                    </span>
                  </p>
                  <p className="text-sm italic mt-2">
                    <span className="font-medium">Real‑world:</span> Tuhina's school still uses an old Access database; 
                    this bridge was the only way to connect from Java before migration.
                  </p>
                </div>
              </div>
            </div>

            {/* Type 2: Native-API driver */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-start space-x-4">
                <svg
                  className="w-16 h-16 flex-shrink-0 text-emerald-500 dark:text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" />
                  <path d="M12 8v8M8 12h8" stroke="currentColor" />
                  <circle cx="12" cy="12" r="1" fill="currentColor">
                    <animate attributeName="r" values="1;1.5;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div>
                  <h3 className="text-xl font-bold">Type 2: Native-API Driver</h3>
                  <p className="mt-1">
                    Converts JDBC calls to database client API (e.g., Oracle OCI). Requires native libraries on client.
                  </p>
                  <p className="text-sm italic mt-2">
                    <span className="font-medium">Real‑world:</span> Debangshu's banking application uses Type 2 
                    for Oracle because of extra features exposed by native client.
                  </p>
                </div>
              </div>
            </div>

            {/* Type 3: Network-Protocol driver */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-start space-x-4">
                <svg
                  className="w-16 h-16 flex-shrink-0 text-sky-500 dark:text-sky-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="6" cy="12" r="2" stroke="currentColor" />
                  <circle cx="18" cy="12" r="2" stroke="currentColor" />
                  <path d="M6 10L18 6M6 14L18 18" stroke="currentColor" />
                  <circle cx="12" cy="12" r="1" fill="currentColor">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div>
                  <h3 className="text-xl font-bold">Type 3: Network-Protocol Driver</h3>
                  <p className="mt-1">
                    Uses a middleware server that converts JDBC calls to DB‑specific protocol. Pure Java client.
                  </p>
                  <p className="text-sm italic mt-2">
                    <span className="font-medium">Real‑world:</span> Abhronila's cloud app uses Type 3 to connect 
                    to multiple database types behind a firewall.
                  </p>
                </div>
              </div>
            </div>

            {/* Type 4: Thin driver (Pure Java) */}
            <div
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md",
                "transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                "border border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-start space-x-4">
                <svg
                  className="w-16 h-16 flex-shrink-0 text-purple-500 dark:text-purple-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 4h16v16H4z" stroke="currentColor" />
                  <path d="M8 8h8v8H8z" stroke="currentColor" fill="currentColor" fillOpacity="0.2" />
                  <circle cx="12" cy="12" r="1" fill="currentColor">
                    <animate attributeName="r" values="1;1.8;1" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div>
                  <h3 className="text-xl font-bold">Type 4: Pure Java (Thin) Driver</h3>
                  <p className="mt-1">
                    Converts JDBC calls directly to database network protocol. No extra libraries, platform‑independent.
                  </p>
                  <p className="text-sm italic mt-2">
                    <span className="font-medium">Real‑world:</span> Most modern apps (including Ichapur's library 
                    management) use MySQL Connector/J – a Type 4 driver.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: JDBC ARCHITECTURE (with animated SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="JDBC Architecture diagram"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🏛️ JDBC Architecture
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg
              viewBox="0 0 600 200"
              className="w-full max-w-2xl"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
            >
              {/* Application box */}
              <rect x="20" y="40" width="100" height="50" rx="8" className="stroke-indigo-500 dark:stroke-indigo-400" />
              <text x="45" y="75" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Application</text>

              {/* DriverManager box */}
              <rect x="160" y="40" width="120" height="50" rx="8" className="stroke-emerald-500 dark:stroke-emerald-400" />
              <text x="180" y="75" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">DriverManager</text>

              {/* Driver box */}
              <rect x="320" y="40" width="100" height="50" rx="8" className="stroke-sky-500 dark:stroke-sky-400" />
              <text x="340" y="75" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Driver</text>

              {/* Database box */}
              <rect x="460" y="40" width="100" height="50" rx="8" className="stroke-purple-500 dark:stroke-purple-400" />
              <text x="480" y="75" className="text-xs fill-gray-800 dark:fill-gray-200" stroke="none">Database</text>

              {/* Arrows with animations */}
              <line x1="120" y1="65" x2="160" y2="65" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="280" y1="65" x2="320" y2="65" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="420" y1="65" x2="460" y2="65" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </line>

              {/* Labels on arrows */}
              <text x="130" y="45" className="text-[8px] fill-gray-500" stroke="none">getConnection()</text>
              <text x="290" y="45" className="text-[8px] fill-gray-500" stroke="none">connect()</text>
              <text x="430" y="45" className="text-[8px] fill-gray-500" stroke="none">native protocol</text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            The application asks <code>DriverManager</code> for a connection; it locates the appropriate 
            driver, which then talks to the database.
          </p>
        </section>

        {/* ===== SECTION 4: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-6"
          aria-label="Practical code examples"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code in Action
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Registering a Driver (Old way vs New way)</h3>
            <JavaFileLoader
              fileModule={driverRegistration}
              title="DriverRegistration.java"
              highlightLines={[5, 9]} // highlights important lines
            />

            <h3 className="text-xl font-medium mt-6">🔹 Obtaining a Connection</h3>
            <JavaFileLoader
              fileModule={connectionExample}
              title="ConnectionExample.java"
              highlightLines={[4, 7]}
            />

            <h3 className="text-xl font-medium mt-6">🔹 Architecture Overview Demo</h3>
            <JavaFileLoader
              fileModule={architectureDemo}
              title="ArchitectureDemo.java"
              highlightLines={[3, 8, 12]}
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 Hint: Observe how <code>Class.forName()</code> was used in older JDBC versions to load the driver. 
              In modern Java, drivers are loaded automatically if the JAR is in the classpath.
            </p>
          </div>
        </section>

        {/* ===== SECTION 5: COMMON PITFALLS ===== */}
        <section
          className="animate-[fadeSlideUp_1s_ease-out] space-y-3"
          aria-label="Common mistakes beginners make"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-red-200 dark:border-red-800 pb-2">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
            <li>Forgetting to add the driver JAR to the classpath → <code>ClassNotFoundException</code>.</li>
            <li>Using Type 1 driver in production (deprecated, slow).</li>
            <li>Hardcoding database credentials (security risk).</li>
            <li>Not closing resources (connections, statements) – leads to leaks.</li>
            <li>Assuming all drivers are Type 4 – some databases still need middleware.</li>
          </ul>
        </section>

        {/* ===== SECTION 6: BEST PRACTICES ===== */}
        <section
          className="animate-[fadeSlideUp_1.1s_ease-out] space-y-3"
          aria-label="Best practices for JDBC drivers"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-green-200 dark:border-green-800 pb-2">
            ✅ Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
            <li>Always use Type 4 (pure Java) drivers for new projects.</li>
            <li>Load drivers implicitly using <code>DriverManager</code> (don't call <code>Class.forName()</code> unless necessary).</li>
            <li>Store connection details in properties files (see Topic 15).</li>
            <li>Use connection pooling (Topic 9) for production.</li>
            <li>Handle <code>SQLException</code> properly – never swallow exceptions.</li>
          </ul>
        </section>

        {/* ===== SECTION 7: TIPS & TRICKS (PROFESSIONAL) ===== */}
        <section
          className="animate-[fadeSlideUp_1.2s_ease-out] space-y-3"
          aria-label="Professional tips"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-amber-200 dark:border-amber-800 pb-2">
            🧠 Tips & Tricks
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>🔹 <strong>Driver Spy:</strong> Some drivers (like MySQL) allow logging by adding <code>?logger=...</code> in URL.</li>
              <li>🔹 <strong>Multiple drivers:</strong> <code>DriverManager</code> picks the first driver that accepts the URL. You can force a specific driver by instantiating it directly.</li>
              <li>🔹 <strong>Debugging:</strong> Enable <code>DriverManager.setLogWriter()</code> to trace driver registration.</li>
              <li>🔹 <strong>Placeholder thinking:</strong> When Tuhina couldn't connect, she checked if the driver JAR was compatible with her Java version – a common oversight.</li>
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
            <p className="font-bold text-indigo-900 dark:text-indigo-100">
              Sukanta Hui
            </p>
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              📧 sukantahui@codernaccotax.co.in | 📞 7003756860
            </p>
            <p className="text-sm mt-1">
              💼 {experience} years of experience in Programming, RDBMS, OS, Web Development.
            </p>
            <p className="mt-3">
              <span className="font-semibold">Point to remember:</span> Students often confuse the driver types. 
              Use the analogy of translators: Type 1 (human translator who knows ODBC), Type 2 (native speaker with 
              local dialect), Type 3 (phone interpreter), Type 4 (universal translator from Star Trek). 
              <br />
              <span className="italic">"Abhronila, think of Type 4 as the ultimate thin client – no extra baggage."</span>
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
              <li>✔️ I can explain the four JDBC driver types.</li>
              <li>✔️ I understand why Type 4 is preferred.</li>
              <li>✔️ I know how <code>DriverManager</code> locates a driver.</li>
              <li>✔️ I have seen code that registers a driver and opens a connection.</li>
              <li>✔️ I remember to always close resources.</li>
              <li>✔️ I am aware of the pitfalls with old JDBC-ODBC bridge.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic1;