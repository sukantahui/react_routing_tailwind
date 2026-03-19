import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw JSP examples
import requestExample from "./topic2_files/request_example.jsp?raw";
import sessionExample from "./topic2_files/session_example.jsp?raw";
import applicationExample from "./topic2_files/application_example.jsp?raw";
import allObjectsExample from "./topic2_files/all_objects_example.jsp?raw";

// ----------------------------------------------------------------------
// Inline keyframes for animations (no config needed)
const animationKeyframes = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;
// ----------------------------------------------------------------------

const Topic2 = () => {
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
          JSP Implicit Objects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The nine built‑in objects automatically available in JSP pages.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[0]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">
          What are Implicit Objects?
        </h2>
        <p className="mb-3">
          JSP implicit objects are Java objects that the JSP container makes available
          to developers in each page. They are created automatically and can be used
          directly in scriptlets, expressions, and EL without explicit declaration.
          There are nine such objects, each serving a distinct purpose in web
          application development.
        </p>
        <p className="mb-2">
          <strong className="text-indigo-600 dark:text-indigo-400">
            Real‑world analogy:
          </strong>{" "}
          Imagine walking into a fully equipped classroom. The <strong>board</strong>{" "}
          (response) is where you write output, the <strong>register</strong> (session)
          tracks student attendance, the <strong>library</strong> (application) holds
          books for everyone, and the <strong>notice board</strong> (request) carries
          messages for a specific day. These are always there, ready for use.
        </p>
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm italic">
            <span className="font-semibold">💡 Teacher's Note (Sukanta Hui):</span>{" "}
            "When I teach students from Ichapur and Naihati, I emphasize that implicit
            objects are the gateway to servlet functionality inside JSP. They are
            declared by the container in the generated servlet's{' '}
            <code>_jspService()</code> method, so you can use them right away."
          </p>
        </div>
      </section>

      {/* SVG Illustration – Nine Implicit Objects */}
      <section
        className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[1]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
          The Nine Implicit Objects
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 overflow-x-auto">
          <svg
            viewBox="0 0 800 380"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Row 1: request, response, out */}
            <g transform="translate(80,40)" className="object-group">
              <rect
                x="0"
                y="0"
                width="140"
                height="90"
                rx="8"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-blue-100 dark:hover:fill-blue-900/50"
              />
              <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">
                request
              </text>
              <text x="70" y="40" textAnchor="middle" fontSize="10" fill="#1e40af">
                HttpServletRequest
              </text>
              <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">
                Client data, parameters
              </text>
            </g>

            <g transform="translate(260,40)" className="object-group">
              <rect
                x="0"
                y="0"
                width="140"
                height="90"
                rx="8"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-blue-100 dark:hover:fill-blue-900/50"
              />
              <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">
                response
              </text>
              <text x="70" y="40" textAnchor="middle" fontSize="10" fill="#1e40af">
                HttpServletResponse
              </text>
              <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">
                Send output, headers
              </text>
            </g>

            <g transform="translate(440,40)" className="object-group">
              <rect
                x="0"
                y="0"
                width="140"
                height="90"
                rx="8"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-blue-100 dark:hover:fill-blue-900/50"
              />
              <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">
                out
              </text>
              <text x="70" y="40" textAnchor="middle" fontSize="10" fill="#1e40af">
                JspWriter
              </text>
              <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">
                Write to response
              </text>
            </g>

            {/* Row 2: session, application, config */}
            <g transform="translate(80,150)" className="object-group">
              <rect
                x="0"
                y="0"
                width="140"
                height="90"
                rx="8"
                fill="#dcfce7"
                stroke="#16a34a"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-green-100 dark:hover:fill-green-900/50"
              />
              <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
                session
              </text>
              <text x="70" y="40" textAnchor="middle" fontSize="10" fill="#166534">
                HttpSession
              </text>
              <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">
                User-specific data
              </text>
            </g>

            <g transform="translate(260,150)" className="object-group">
              <rect
                x="0"
                y="0"
                width="140"
                height="90"
                rx="8"
                fill="#dcfce7"
                stroke="#16a34a"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-green-100 dark:hover:fill-green-900/50"
              />
              <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
                application
              </text>
              <text x="70" y="40" textAnchor="middle" fontSize="10" fill="#166534">
                ServletContext
              </text>
              <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">
                Application-wide data
              </text>
            </g>

            <g transform="translate(440,150)" className="object-group">
              <rect
                x="0"
                y="0"
                width="140"
                height="90"
                rx="8"
                fill="#dcfce7"
                stroke="#16a34a"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-green-100 dark:hover:fill-green-900/50"
              />
              <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
                config
              </text>
              <text x="70" y="40" textAnchor="middle" fontSize="10" fill="#166534">
                ServletConfig
              </text>
              <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">
                Init parameters
              </text>
            </g>

            {/* Row 3: pageContext, page, exception */}
            <g transform="translate(80,260)" className="object-group">
              <rect
                x="0"
                y="0"
                width="140"
                height="90"
                rx="8"
                fill="#fed7aa"
                stroke="#ea580c"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-orange-100 dark:hover:fill-orange-900/50"
              />
              <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">
                pageContext
              </text>
              <text x="70" y="40" textAnchor="middle" fontSize="10" fill="#9a3412">
                PageContext
              </text>
              <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">
                Single point of access
              </text>
            </g>

            <g transform="translate(260,260)" className="object-group">
              <rect
                x="0"
                y="0"
                width="140"
                height="90"
                rx="8"
                fill="#fed7aa"
                stroke="#ea580c"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-orange-100 dark:hover:fill-orange-900/50"
              />
              <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">
                page
              </text>
              <text x="70" y="40" textAnchor="middle" fontSize="10" fill="#9a3412">
                this (servlet)
              </text>
              <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">
                Reference to current JSP
              </text>
            </g>

            <g transform="translate(440,260)" className="object-group">
              <rect
                x="0"
                y="0"
                width="140"
                height="90"
                rx="8"
                fill="#fecaca"
                stroke="#dc2626"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-red-100 dark:hover:fill-red-900/50"
              />
              <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">
                exception
              </text>
              <text x="70" y="40" textAnchor="middle" fontSize="10" fill="#991b1b">
                Throwable
              </text>
              <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#6b7280">
                Only in error pages
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Detailed Explanation Cards */}
      <section
        className="max-w-4xl mx-auto mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[2]}ms`, animationFillMode: "both" }}
      >
        {[
          {
            name: "request",
            type: "javax.servlet.http.HttpServletRequest",
            desc: "Represents the client's request. Used to get parameters, headers, cookies, and attributes.",
            example: "request.getParameter(\"name\")"
          },
          {
            name: "response",
            type: "javax.servlet.http.HttpServletResponse",
            desc: "Represents the response to the client. Used to set headers, cookies, and send redirects.",
            example: "response.sendRedirect(\"index.jsp\")"
          },
          {
            name: "out",
            type: "javax.servlet.jsp.JspWriter",
            desc: "Writes content to the response. Used like PrintWriter but with buffering.",
            example: "out.println(\"Hello\")"
          },
          {
            name: "session",
            type: "javax.servlet.http.HttpSession",
            desc: "Tracks user session across multiple requests. Stores user-specific data.",
            example: "session.setAttribute(\"user\", userObj)"
          },
          {
            name: "application",
            type: "javax.servlet.ServletContext",
            desc: "Application context shared across all users and pages. Good for global counters.",
            example: "application.getAttribute(\"totalVisits\")"
          },
          {
            name: "config",
            type: "javax.servlet.ServletConfig",
            desc: "Servlet configuration object holding init parameters from web.xml.",
            example: "config.getInitParameter(\"adminEmail\")"
          },
          {
            name: "pageContext",
            type: "javax.servlet.jsp.PageContext",
            desc: "Provides a single API to manage all scopes (page, request, session, application).",
            example: "pageContext.setAttribute(\"key\", value, PageContext.REQUEST_SCOPE)"
          },
          {
            name: "page",
            type: "java.lang.Object (this)",
            desc: "Reference to the current servlet instance. Rarely used directly.",
            example: "page.equals(this)"
          },
          {
            name: "exception",
            type: "java.lang.Throwable",
            desc: "Only available in error pages (isErrorPage=\"true\"). Holds the uncaught exception.",
            example: "exception.getMessage()"
          }
        ].map((obj, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700"
          >
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              {obj.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{obj.type}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{obj.desc}</p>
            <code className="block text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
              {obj.example}
            </code>
          </div>
        ))}
      </section>

      {/* Code Examples Section */}
      <section
        className="max-w-4xl mx-auto mb-12 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[3]}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-6">
          Practical Examples
        </h2>

        {/* Request Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={requestExample}
            title="request_example.jsp – Using request, response, out"
            highlightLines={[7,8,9,10,11]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This example reads a username parameter, sets a cookie, and writes output.
          </p>
        </div>

        {/* Session Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={sessionExample}
            title="session_example.jsp – Tracking user visits with session"
            highlightLines={[5,6,7,8,9]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            The session object maintains a visit counter per user.
          </p>
        </div>

        {/* Application Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={applicationExample}
            title="application_example.jsp – Global hit counter with application"
            highlightLines={[5,6,7,8,9]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            The application object stores a counter shared by all users.
          </p>
        </div>

        {/* All Objects Example */}
        <div className="mb-8">
          <JavaFileLoader
            fileModule={allObjectsExample}
            title="all_objects_example.jsp – Demonstrating many implicit objects"
            highlightLines={[]}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            A more comprehensive example showing request, session, application, and pageContext.
          </p>
        </div>

        {/* Hint Section */}
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            🔍 Observe carefully:
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            The <code>exception</code> object is <strong>only</strong> available in pages
            declared as error pages (<code>&lt;%@ page isErrorPage="true" %&gt;</code>). In
            normal pages, using it will cause a compilation error.
          </p>
        </div>
      </section>

      {/* Common Pitfalls & Best Practices */}
      <div
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-2 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[4]}ms`, animationFillMode: "both" }}
      >
        {/* Pitfalls */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
            <span className="mr-2">⚠️</span> Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Using exception in non‑error pages:</strong> Leads to compilation errors.
            </li>
            <li>
              <strong>Assuming session is always available:</strong> If sessions are disabled
              (<code>&lt;%@ page session="false" %&gt;</code>), <code>session</code> is not defined.
            </li>
            <li>
              <strong>Misunderstanding scopes:</strong> Attributes set in request are lost after
              the response; session attributes persist across requests for the same user.
            </li>
            <li>
              <strong>Overusing application scope:</strong> Application attributes are shared by
              all users and are not thread‑safe without proper synchronization.
            </li>
            <li>
              <strong>Not handling null when retrieving attributes:</strong> Always check for
              <code>null</code> to avoid <code>NullPointerException</code>.
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
              <strong>Use the smallest scope possible:</strong> Prefer request scope over
              session, and session over application, to reduce memory and concurrency issues.
            </li>
            <li>
              <strong>Access objects via EL where possible:</strong> EL simplifies syntax and
              handles nulls gracefully (e.g., <code>{"${param.name}"}</code>).
            </li>
            <li>
              <strong>Synchronize access to application attributes</strong> if you modify them.
            </li>
            <li>
              <strong>Close resources in <code>out</code>?</strong> No need; container manages it.
            </li>
            <li>
              <strong>Leverage <code>pageContext</code> to find attributes across scopes</strong>
              using <code>findAttribute()</code>.
            </li>
          </ul>
        </section>
      </div>

      {/* Teacher's Note & Mini Checklist */}
      <div
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-2 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[5]}ms`, animationFillMode: "both" }}
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
              "Students from Barrackpore often mix up <code>request</code> and{' '}
              <code>session</code>. I remind them: <code>request</code> is like a
              letter for today, <code>session</code> is like a file folder that follows
              the student all year. For the application object, think of the school
              library – everyone shares it, so be careful with what you store there."
            </p>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">📋</span> Mini Checklist
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can name all nine implicit objects.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I know the purpose of <code>request</code>, <code>response</code>, <code>out</code>.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I understand the difference between <code>session</code> and <code>application</code>.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I know when <code>exception</code> is available.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              I can use <code>pageContext</code> to store and retrieve attributes.
            </li>
          </ul>
        </section>
      </div>

      {/* Tips & Tricks */}
      <section
        className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-[fadeSlideUp_0.6s_ease-out]"
        style={{ animationDelay: `${delays[6] || 700}ms`, animationFillMode: "both" }}
      >
        <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-4 flex items-center">
          <span className="mr-2">💎</span> Professional Tips & Tricks
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🔧 Debugging Tip</p>
            <p className="text-sm">
              To see all request parameters, loop over <code>request.getParameterMap()</code>.
              For session attributes, use <code>session.getAttributeNames()</code>.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🚀 Performance Trick</p>
            <p className="text-sm">
              Avoid storing large objects in session; they consume memory for each user.
              Use database persistence and keep only IDs in session.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">🧴 Thread Safety</p>
            <p className="text-sm">
              Application and session attributes are not thread‑safe. Synchronize when
              modifying or use concurrent collections.
            </p>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">📦 Quick EL Access</p>
            <p className="text-sm">
              In EL, <code>{"${param.name}"}</code> accesses request parameters,{' '}
              <code>{"${sessionScope.user}"}</code> accesses session attributes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-6">
        <p>Topic 2: JSP Implicit Objects — Nine tools for every JSP developer.</p>
        <p className="mt-1">
          Examples inspired by students from Barrackpore, Shyamnagar, Ichapur, Naihati.
        </p>
      </footer>
    </div>
  );
};

export default Topic2;