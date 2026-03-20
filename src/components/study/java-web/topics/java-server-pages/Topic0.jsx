import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import raw Java/JSP examples for illustration
import generatedServletCode from "./topic0_files/GeneratedServlet.java?raw";
import simpleJspCode from "./topic0_files/SimpleJSP.jsp?raw";

// ----------------------------------------------------------------------
// Inline keyframes for animations (no config needed)
const animationKeyframes = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;
// ----------------------------------------------------------------------

const Topic0 = () => {
  // Calculate Sukanta Hui's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998; // Started in 1998

  // Staggered animation delays (in ms)
  const delays = [100, 200, 300, 400, 500, 600];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 md:p-8 font-sans leading-relaxed">
      {/* Inject keyframes globally for this component */}
      <style>{animationKeyframes}</style>

      {/* Header Section */}
      <header
        className="max-w-4xl mx-auto mb-12 text-center animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationFillMode: "both" }}
      >
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-3">
          JSP Lifecycle
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Understanding the journey of a JSP page from source to response.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[0]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">
          What is JSP Lifecycle?
        </h2>
        <p className="mb-3">
          Just like a butterfly transforms through stages, a JSP page goes through
          a well-defined lifecycle before it can serve client requests. This lifecycle
          is managed by the web container (e.g., Apache Tomcat) and consists of
          several phases: translation, compilation, loading & instantiation,
          initialization, request handling, and destruction.
        </p>
        <p className="mb-2">
          <strong className="text-indigo-600 dark:text-indigo-400">
            Real‑world analogy:
          </strong>{" "}
          Think of a school notice board. The raw JSP is like a draft notice; the
          container translates it into a servlet (like printing the notice), compiles
          it (laminating), loads it (hanging the board), and then each student's
          request (like a query) is handled by the same board.
        </p>
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm italic">
            <span className="font-semibold">💡 Teacher's Note (Sukanta Hui):</span>{" "}
            Beginners often confuse the JSP lifecycle with the servlet lifecycle.
            Remember: JSP is <em>converted</em> to a servlet, so the servlet lifecycle
            is a subset of the JSP lifecycle. The key methods are{" "}
            <code>jspInit()</code>, <code>_jspService()</code>, and{" "}
            <code>jspDestroy()</code>.
          </p>
        </div>
      </section>

      {/* Lifecycle Stages (SVG + Explanation) */}
      <section
        className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[1]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
          The Six Phases of JSP Lifecycle
        </h2>

        {/* SVG Flow Diagram */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 mb-8">
          <svg
            viewBox="0 0 800 200"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Phase 1: Translation */}
            <g transform="translate(50,80)" className="phase-group">
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                className="transition-all duration-300 hover:r-35 hover:stroke-indigo-400"
              />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fill="currentColor">
                1. Translation
              </text>
              <text x="0" y="45" textAnchor="middle" fontSize="10" fill="#6b7280">
                .jsp → .java
              </text>
            </g>

            {/* Arrow 1-2 */}
            <line
              x1="110"
              y1="95"
              x2="170"
              y2="95"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>

            {/* Phase 2: Compilation */}
            <g transform="translate(200,80)" className="phase-group">
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                className="transition-all duration-300 hover:r-35 hover:stroke-indigo-400"
              />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fill="currentColor">
                2. Compilation
              </text>
              <text x="0" y="45" textAnchor="middle" fontSize="10" fill="#6b7280">
                .java → .class
              </text>
            </g>

            {/* Arrow 2-3 */}
            <line
              x1="260"
              y1="95"
              x2="320"
              y2="95"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>

            {/* Phase 3: Loading & Instantiation */}
            <g transform="translate(350,80)" className="phase-group">
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                className="transition-all duration-300 hover:r-35 hover:stroke-indigo-400"
              />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fill="currentColor">
                3. Loading
              </text>
              <text x="0" y="45" textAnchor="middle" fontSize="10" fill="#6b7280">
                class → object
              </text>
            </g>

            {/* Arrow 3-4 */}
            <line
              x1="410"
              y1="95"
              x2="470"
              y2="95"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>

            {/* Phase 4: Initialization (jspInit) */}
            <g transform="translate(500,80)" className="phase-group">
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                className="transition-all duration-300 hover:r-35 hover:stroke-indigo-400"
              />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fill="currentColor">
                4. Init
              </text>
              <text x="0" y="45" textAnchor="middle" fontSize="10" fill="#6b7280">
                jspInit()
              </text>
            </g>

            {/* Arrow 4-5 */}
            <line
              x1="560"
              y1="95"
              x2="620"
              y2="95"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>

            {/* Phase 5: Request Handling (repeated) */}
            <g transform="translate(650,80)" className="phase-group">
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                className="transition-all duration-300 hover:r-35 hover:stroke-indigo-400"
              />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fill="currentColor">
                5. Service
              </text>
              <text x="0" y="45" textAnchor="middle" fontSize="10" fill="#6b7280">
                _jspService()
              </text>
              {/* Small plus to indicate repeated */}
              <text x="30" y="-15" fontSize="14" fill="#10b981">↻</text>
            </g>

            {/* Arrow 5-6 (if needed, but 6 is destruction, which may happen later) */}
            <line
              x1="710"
              y1="80"
              x2="750"
              y2="80"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>

            {/* Phase 6: Destruction */}
            <g transform="translate(770,80)" className="phase-group">
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                className="transition-all duration-300 hover:r-35 hover:stroke-red-400"
              />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fill="currentColor">
                6. Destroy
              </text>
              <text x="0" y="45" textAnchor="middle" fontSize="10" fill="#6b7280">
                jspDestroy()
              </text>
            </g>
          </svg>
        </div>

        {/* Stage Details Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              phase: "1. Translation",
              desc: "The container converts the .jsp file into a .java servlet source file. This happens on first request or if the JSP is modified.",
              example: "index.jsp → index_jsp.java",
            },
            {
              phase: "2. Compilation",
              desc: "The generated .java file is compiled into a .class servlet.",
              example: "index_jsp.java → index_jsp.class",
            },
            {
              phase: "3. Loading & Instantiation",
              desc: "The servlet class is loaded by the classloader and an instance is created.",
              example: "Class.forName(...).newInstance()",
            },
            {
              phase: "4. Initialization (jspInit)",
              desc: "The container calls the jspInit() method. Override to perform setup (e.g., DB connections).",
              example: "public void jspInit() { // init code }",
            },
            {
              phase: "5. Request Handling (_jspService)",
              desc: "For each request, the container calls _jspService(), passing request/response. This method is generated from the JSP content.",
              example: "public void _jspService(...) { ... }",
            },
            {
              phase: "6. Destruction (jspDestroy)",
              desc: "When the container shuts down or the application is undeployed, jspDestroy() is called for cleanup.",
              example: "public void jspDestroy() { // cleanup }",
            },
          ].map((stage, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700"
            >
              <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                {stage.phase}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {stage.desc}
              </p>
              <code className="block text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                {stage.example}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example: Generated Servlet & Simple JSP */}
      <section
        className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[2]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
          Lifecycle in Action: Code View
        </h2>

        {/* JSP Source */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={simpleJspCode}
            title="simple.jsp – A Basic JSP Page"
            highlightLines={[]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This simple JSP declares a variable and outputs a message. The container
            will translate it into a servlet.
          </p>
        </div>

        {/* Generated Servlet (Conceptual) */}
        <div>
          <JavaFileLoader
            fileModule={generatedServletCode}
            title="GeneratedServlet.java (Simplified)"
            highlightLines={[5, 9, 12]} // jspInit, _jspService, jspDestroy
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            The servlet generated from the JSP above. Notice the lifecycle methods
            <code> jspInit()</code>, <code>_jspService()</code>, and{" "}
            <code>jspDestroy()</code>.
          </p>
        </div>

        {/* Hint Section */}
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            🔍 Observe carefully:
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            The <code>_jspService()</code> method is where all the HTML and Java
            code from your JSP ends up. It is invoked for every request, unlike{" "}
            <code>jspInit()</code> which runs only once.
          </p>
        </div>
      </section>

      {/* Common Pitfalls & Best Practices */}
      <div
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-2 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[3]}ms`, animationFillMode: "both" }}
      >
        {/* Pitfalls */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
            <span className="mr-2">⚠️</span> Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Assuming _jspService() can be overridden:</strong> You cannot
              override it directly; it is generated by the container.
            </li>
            <li>
              <strong>Forgetting that jspInit() and jspDestroy() are optional:</strong>{" "}
              They are hooks, not required, but useful for resource mgmt.
            </li>
            <li>
              <strong>Misunderstanding lifecycle scope:</strong> The servlet instance
              is shared across requests, so instance variables are not thread‑safe.
            </li>
            <li>
              <strong>Editing generated servlet:</strong> Never modify the generated
              .java file; it will be overwritten on next translation.
            </li>
            <li>
              <strong>Translation only on first access:</strong> If you change the
              JSP, the container usually detects it and re‑translates automatically,
              but this depends on configuration.
            </li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
            <span className="mr-2">✅</span> Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Use jspInit() for heavy setup:</strong> Open database
              connections, read configuration files – but remember thread safety.
            </li>
            <li>
              <strong>Keep JSPs simple:</strong> Avoid scriptlets; use EL and JSTL
              to keep the generated servlet clean.
            </li>
            <li>
              <strong>Understand container behavior:</strong> Different containers
              may have slight variations in lifecycle (e.g., when they recompile).
            </li>
            <li>
              <strong>Leverage jspDestroy() for cleanup:</strong> Close resources
              gracefully to prevent leaks.
            </li>
            <li>
              <strong>Use the &lt;jsp-config&gt; in web.xml:</strong> To control
              precompilation or set up tag libraries.
            </li>
          </ul>
        </section>
      </div>

      {/* Teacher's Note & Mini Checklist */}
      <div
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-2 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[4]}ms`, animationFillMode: "both" }}
      >
        {/* Teacher's Note */}
        <section className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-200 dark:border-indigo-800">
          <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center">
            <span className="mr-2">🧑‍🏫</span> Teacher's Note
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Sukanta Hui</strong> (email: sukantahui@codernaccotax.co.in,
              mobile: 7003756860)
            </p>
            <p>
              <strong>Experience:</strong> {experience} years (since 1998)
            </p>
            <p>
              <strong>Skill areas:</strong> Programming Languages, RDBMS, Operating
              Systems, Web Development
            </p>
            <hr className="border-indigo-300 dark:border-indigo-700 my-3" />
            <p className="italic">
              "I often tell my students – like Swadeep from Barrackpore or Tuhina
              from Shyamnagar – that the JSP lifecycle is like the daily routine of a
              school: preparation (translation/compilation), arrival (loading), morning
              assembly (init), classes (requests), and home time (destroy). Remember,
              <code>jspInit()</code> is your morning coffee – do it once, do it right."
            </p>
          </div>
          <Teacher note="I often tell my students – like Swadeep from Barrackpore or Tuhina
              from Shyamnagar – that the JSP lifecycle is like the daily routine of a
              school: preparation (translation/compilation), arrival (loading), morning
              assembly (init), classes (requests), and home time (destroy). Remember,
              jspInit() is your morning coffee – do it once, do it right."/>
        </section>

        {/* Mini Checklist */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">📋</span> Mini Checklist
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can name the six phases of the JSP lifecycle.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I know when <code>jspInit()</code> and <code>jspDestroy()</code> are called.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I understand that the servlet instance is shared across requests.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can explain why you should not edit the generated servlet.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I am aware that the container may recompile JSPs automatically.
            </li>
          </ul>
        </section>
      </div>

      {/* Tips & Tricks */}
      <section
        className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[5]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-4 flex items-center">
          <span className="mr-2">💎</span> Professional Tips & Tricks
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🔧 Debugging Tip</p>
            <p className="text-sm">
              To see the generated servlet code (for Tomcat), look inside the
              "work" directory (e.g.,{" "}
              <code>$CATALINA_BASE/work/.../org/apache/jsp/</code>). It helps
              understand what the container produces.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🚀 Performance Trick</p>
            <p className="text-sm">
              Precompile JSPs during build to avoid first‑request delay. Tools
              like JspC (from Tomcat) can do this.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🧠 Memory Leak Avoidance</p>
            <p className="text-sm">
              Always close resources (DB connections, streams) in{" "}
              <code>jspDestroy()</code>. But prefer using container‑managed
              resources (e.g., JNDI DataSource).
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">📦 Version Control</p>
            <p className="text-sm">
              Never commit generated servlet files. They are build artifacts.
              Use <code>.gitignore</code> to exclude them.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Note */}
      <footer className="max-w-4xl mx-auto text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-6">
        <p>Topic 0: JSP Lifecycle — Built with Tailwind CSS, React 19, and patience.</p>
        <p className="mt-1">
          Inspired by students from Barrackpore, Shyamnagar, Ichapur, Naihati.
        </p>
      </footer>
    </div>
  );
};

export default Topic0;