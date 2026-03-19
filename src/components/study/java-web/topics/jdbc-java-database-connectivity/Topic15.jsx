// Topic15.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic15_files folder
import propertiesLoader from "./topic15_files/PropertiesLoader.java?raw";
import dataSourceFromProperties from "./topic15_files/DataSourceFromProperties.java?raw";
import multiEnvProperties from "./topic15_files/MultiEnvProperties.java?raw";

const Topic15 = () => {
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
          aria-label="Introduction to Database Configuration Using Properties Files"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            ⚙️ Database Configuration Using Properties Files
          </h1>
          <p className="text-lg leading-relaxed">
            Hardcoding database URLs, usernames, and passwords in Java source code is a bad practice.
            It makes the application inflexible, harder to maintain, and poses a security risk.
            <strong className="text-indigo-600 dark:text-indigo-400"> Properties files</strong> provide a simple
            way to externalize configuration. You can change database settings without recompiling, and even have
            different configurations for development, testing, and production.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Swadeep</span> from Barrackpore is deploying his application to a cloud server.
            The database credentials are different from his local machine. By using a properties file, he can just
            replace the file on the server without touching the code.
          </p>
        </section>

        {/* ===== SECTION 2: PROPERTIES FILE FORMAT ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="Properties file format"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📄 Properties File Format
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <p className="mb-2">
              A properties file is a simple text file with key=value pairs. Lines starting with <code>#</code> are comments.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
{`# Database configuration for development
db.url=jdbc:mysql://localhost:3306/schoolDB
db.username=root
db.password=secret
db.pool.size=10`}
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Keys are case‑sensitive and usually follow a dot‑separated naming convention.
            </p>
          </div>
        </section>

        {/* ===== SECTION 3: LOADING PROPERTIES IN JAVA ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Loading properties in Java"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📥 Loading Properties in Java
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <p className="mb-2">
              Use the <code>java.util.Properties</code> class to load a properties file from the classpath or file system.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
{`Properties props = new Properties();
// Load from classpath
try (InputStream input = getClass().getClassLoader().getResourceAsStream("db.properties")) {
    props.load(input);
}
// Access values
String url = props.getProperty("db.url");
String user = props.getProperty("db.username");
String password = props.getProperty("db.password");`}
            </pre>
          </div>
        </section>

        {/* ===== SECTION 4: VISUAL FLOW (CONFIG SEPARATION) ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Configuration separation diagram"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🔀 Separating Config from Code
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 180" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Java Code */}
              <rect x="20" y="20" width="120" height="60" rx="8" className="stroke-indigo-500 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="40" y="55" className="text-sm fill-gray-800 dark:fill-gray-200" stroke="none">Java Code</text>
              <text x="30" y="75" className="text-[8px] fill-gray-500" stroke="none">(compiled .class)</text>

              {/* Properties File */}
              <rect x="220" y="20" width="120" height="60" rx="8" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="240" y="55" className="text-sm fill-gray-800 dark:fill-gray-200" stroke="none">db.properties</text>
              <text x="250" y="75" className="text-[8px] fill-gray-500" stroke="none">(plain text)</text>

              {/* Database */}
              <rect x="420" y="20" width="120" height="60" rx="8" className="stroke-purple-500 fill-purple-50 dark:fill-purple-900/20" />
              <text x="450" y="55" className="text-sm fill-gray-800 dark:fill-gray-200" stroke="none">Database</text>

              {/* Arrows */}
              <path d="M140 50 L220 50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="160" y="30" className="text-[8px] fill-gray-500" stroke="none">reads config</text>

              <path d="M340 50 L420 50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="360" y="30" className="text-[8px] fill-gray-500" stroke="none">connects with</text>

              {/* Environment label */}
              <text x="260" y="120" className="text-xs fill-amber-600 dark:fill-amber-400" stroke="none">Different per environment</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            The same compiled code can work with different properties files for dev, test, and production.
          </p>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for properties file usage"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Loading Properties and Connecting with DriverManager</h3>
            <JavaFileLoader
              fileModule={propertiesLoader}
              title="PropertiesLoader.java"
              highlightLines={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]} // loading properties, using them
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using Properties with HikariCP DataSource</h3>
            <JavaFileLoader
              fileModule={dataSourceFromProperties}
              title="DataSourceFromProperties.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]} // loading, setting to HikariConfig
            />

            <h3 className="text-xl font-medium mt-6">🔹 Multiple Environment Properties (dev, test, prod)</h3>
            <JavaFileLoader
              fileModule={multiEnvProperties}
              title="MultiEnvProperties.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]} // loading based on system property
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Think about:</strong> How would you handle sensitive information like passwords in properties files
              when the file might be checked into version control? (Hint: use environment variables or encrypted values.)
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
            <li>Properties file not found at runtime (wrong path, not in classpath).</li>
            <li>Forgetting to close the input stream after loading – resource leak.</li>
            <li>Using <code>getResourceAsStream</code> from the wrong classloader (especially in web apps).</li>
            <li>Hardcoding fallback values that override the properties file, defeating the purpose.</li>
            <li>Storing sensitive data (passwords) in plain text in version control – use environment variables or secrets management.</li>
            <li>Not handling missing keys – use <code>getProperty(key, defaultValue)</code> to provide defaults.</li>
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
            <li>Store properties files in the classpath (e.g., <code>src/main/resources</code>) for easy access.</li>
            <li>Use meaningful key names with a consistent prefix (e.g., <code>db.</code>, <code>app.</code>).</li>
            <li>Provide default values in code for critical properties as a fallback.</li>
            <li>Never commit real passwords to version control; use placeholders and externalize them via environment variables.</li>
            <li>For different environments, use different properties files (e.g., <code>application-dev.properties</code>, <code>application-prod.properties</code>) and load based on a system property.</li>
            <li>Validate required properties at application startup and fail fast.</li>
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
              <li>🔹 <strong>ResourceBundle:</strong> For internationalization, consider <code>ResourceBundle</code> instead of Properties.</li>
              <li>🔹 <strong>System property override:</strong> Allow system properties to override file properties (e.g., <code>System.getProperty("db.url", props.getProperty("db.url"))</code>).</li>
              <li>🔹 <strong>Encrypted passwords:</strong> Use Jasypt or similar to encrypt passwords in properties files and decrypt at runtime.</li>
              <li>🔹 <strong>Watch for changes:</strong> For long‑running apps, you can reload properties files periodically to pick up changes without restart.</li>
              <li>🔹 <strong>Tuhina's trick:</strong> Use a <code>Config</code> singleton that loads properties once and provides typed getters – keeps code clean.</li>
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
              <span className="font-semibold">Point to remember:</span> Many beginners hardcode database credentials.
              Emphasize that this is a security risk and a maintenance nightmare. Properties files are the simplest
              form of externalized configuration and a stepping stone to more advanced tools like Spring's
              <code>@ConfigurationProperties</code> or MicroProfile Config.
              <br />
              <span className="italic">
                "Debangshu, treat properties files like a recipe – you can change ingredients without rewriting the cookbook."
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
              <li>✔️ I understand why hardcoding configuration is bad.</li>
              <li>✔️ I can create a properties file with database settings.</li>
              <li>✔️ I know how to load properties using <code>Properties.load()</code> from classpath.</li>
              <li>✔️ I can use loaded properties with <code>DriverManager</code> or <code>DataSource</code>.</li>
              <li>✔️ I can handle multiple environments with different properties files.</li>
              <li>✔️ I am aware of security concerns and best practices for sensitive data.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic15;