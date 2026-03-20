import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import example files
import errorPageDemo from "./topic9_files/error_page_demo.jsp?raw";
import customErrorPage from "./topic9_files/custom_error_page.jsp?raw";
import webXmlErrorConfig from "./topic9_files/web.xml?raw";
import exceptionHandler from "./topic9_files/exception_handler.jsp?raw";

const keyframes = `
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic9 = () => {
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <>
      <style>{keyframes}</style>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
        {/* Header */}
        <div
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8 space-y-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]"
          )}
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">
            JSP Error Page Handling
          </h1>
          <p className="text-lg">
            Every web application must handle errors gracefully. JSP provides a built‑in mechanism to catch exceptions and display user‑friendly error pages. This ensures that your application remains professional and secure when unexpected errors occur.
          </p>
        </div>

        {/* Why Error Handling? */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[100ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Why Error Handling?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="list-disc list-inside space-y-2">
                <li>Improves user experience by showing friendly messages instead of scary stack traces.</li>
                <li>Prevents exposure of internal system details (security).</li>
                <li>Allows logging of errors for debugging.</li>
                <li>Enables graceful degradation (e.g., show cached content).</li>
              </ul>
            </div>
            {/* SVG: Error flow */}
            <div className="flex justify-center p-4">
              <svg width="280" height="140" viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="20" width="80" height="40" rx="8" className="fill-gray-200 dark:fill-gray-800 stroke-2" />
                <text x="25" y="45" className="text-xs fill-gray-700 dark:fill-gray-300">JSP Page</text>
                <path d="M90 40 L120 40 L120 70 L150 70" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="160" cy="70" r="6" className="fill-red-500" />
                <text x="170" y="75" className="text-xs fill-gray-700 dark:fill-gray-300">Exception</text>
                <path d="M160 76 L160 100 L210 100" stroke="currentColor" strokeWidth="2" fill="none" />
                <rect x="220" y="80" width="50" height="40" rx="8" className="fill-green-100 dark:fill-green-900/30 stroke-2 stroke-green-600" />
                <text x="225" y="105" className="text-xs fill-gray-700 dark:fill-gray-300">Error Page</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Two Ways to Declare Error Pages */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[200ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📌 Two Ways to Define Error Pages</h2>
          <div className="grid gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">1. Page Directive</h3>
              <p>Use <code>&lt;%@ page errorPage="error.jsp" %&gt;</code> in the JSP that might throw an exception.</p>
              <p className="mt-2">The target error page must have <code>&lt;%@ page isErrorPage="true" %&gt;</code> to access the <code>exception</code> implicit object.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">2. web.xml Deployment Descriptor</h3>
              <p>Define error pages globally for specific HTTP status codes or exception types.</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <strong>Hint:</strong> This approach centralises error handling and works for all JSPs and servlets.
              </p>
            </div>
          </div>
        </section>

        {/* Example: Page Directive Approach */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[300ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🔧 Example: Page Directive Error Handling</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">1. JSP that may throw an exception</h3>
              <JavaFileLoader fileModule={errorPageDemo} title="error_page_demo.jsp" highlightLines={[]} />
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-medium mb-2">2. Custom Error Page</h3>
              <JavaFileLoader fileModule={customErrorPage} title="custom_error_page.jsp" highlightLines={[]} />
            </div>
          </div>
        </section>

        {/* Example: web.xml Configuration */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[400ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🌐 Example: web.xml Error Page Configuration</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <p className="mb-4">Define error pages for HTTP error codes or specific exception types in <code>/WEB-INF/web.xml</code>.</p>
            <JavaFileLoader fileModule={webXmlErrorConfig} title="web.xml" highlightLines={[]} />
          </div>
        </section>

        {/* Advanced: Handling Different Exception Types */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[500ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">🎯 Handling Specific Exception Types</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <p className="mb-4">In web.xml, you can map different error pages to different exception classes. The container will use the most specific match.</p>
            <JavaFileLoader fileModule={exceptionHandler} title="exception_handler.jsp" highlightLines={[]} />
          </div>
        </section>

        {/* Tips & Tricks */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[600ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">💡 Tips & Tricks</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Log the exception</strong> – in the error page, write the exception stack trace to a log file for debugging.</li>
              <li><strong>Use request attributes</strong> – you can set custom attributes in the original JSP and retrieve them in the error page to show context.</li>
              <li><strong>Never expose stack traces in production</strong> – always use a user‑friendly page.</li>
              <li><strong>Combine approaches</strong> – use page directive for specific pages and web.xml for global error codes.</li>
              <li><strong>Include a support contact</strong> – guide users to report the issue.</li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[700ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">⚠️ Common Pitfalls</h2>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Missing isErrorPage="true"</strong> – you can't access the <code>exception</code> object if the error page doesn't declare itself as an error page.</li>
              <li><strong>Infinite loop</strong> – if the error page itself throws an exception and isn't mapped, the container may loop. Always ensure error pages are error‑free.</li>
              <li><strong>Conflicting configurations</strong> – if both page directive and web.xml specify error pages, the page directive takes precedence for that JSP.</li>
              <li><strong>Not handling checked exceptions</strong> – the <code>exception</code> object is only available for uncaught runtime exceptions and errors; checked exceptions must be caught in the JSP (or servlet) to propagate.</li>
            </ul>
          </div>
        </section>

        {/* Best Practices */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[800ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">✅ Best Practices</h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="list-disc list-inside space-y-2">
              <li>Create a consistent error page template with your site's branding.</li>
              <li>Use <code>response.setStatus()</code> to return appropriate HTTP status codes (e.g., 404, 500).</li>
              <li>Store error pages in a dedicated folder (e.g., <code>/error/</code>) for clarity.</li>
              <li>For production, consider using a custom error handler servlet that logs errors and sends alerts.</li>
              <li>Always test error pages by intentionally triggering exceptions in a staging environment.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[900ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4">📋 Mini Checklist</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> Error pages declared in web.xml or via page directive.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> Error pages have <code>isErrorPage="true"</code> if they need the <code>exception</code> object.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> Error pages are user‑friendly and do not expose stack traces.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> Exceptions are logged appropriately (e.g., using a logging framework).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400">✔</span> All possible error scenarios (404, 500, specific exceptions) are covered.
              </li>
            </ul>
          </div>
        </section>

        {/* Teacher's Note */}
        <section
          className={clsx(
            "max-w-4xl mx-auto px-4 py-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1000ms]"
          )}
        >
          <Teacher
            note={`Error handling is often overlooked, but it's one of the most important aspects of professional web applications. 
Encourage students to think about error pages as a safety net. 
A good exercise: Create an error page that logs the exception using a logging framework like Log4j, and then redirects to a custom 500 page. 
Remind them that the error page itself must be robust – it should not depend on session or request attributes that might be null during an error.`}
          />
        </section>

        {/* Hint Section */}
        <div
          className={clsx(
            "max-w-4xl mx-auto px-4 pb-8",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "animation-delay-[1100ms]"
          )}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded hover:shadow-lg transition-all duration-300">
            <p className="font-medium">💭 Think about...</p>
            <p className="mt-2">
              If you have a JSP that includes another JSP via <code>&lt;jsp:include&gt;</code>, and the included JSP throws an exception, 
              which error page will be displayed? The one defined in the main page or the one defined in the included page? 
              Experiment with both page directive and web.xml configurations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic9;