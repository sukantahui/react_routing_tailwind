// Topic11.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import ErrorPageWebXml from "./topic11_files/web_error_pages.xml?raw";
import ErrorServletExample from "./topic11_files/ErrorServlet.java?raw";
import CustomErrorPageJsp from "./topic11_files/error.jsp?raw";
import ExceptionHandlerServlet from "./topic11_files/ExceptionHandlerServlet.java?raw";
import ErrorFilterExample from "./topic11_files/ErrorFilter.java?raw";

// FAQ questions for this topic
import questions from "./topic11_files/topic11_questions";

const Topic11 = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dark min-h-screen bg-gray-950 text-gray-100 font-sans leading-relaxed p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Error Handling & Custom Error Pages
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Gracefully handle exceptions, HTTP errors, and provide user‑friendly pages – protecting user experience and application security.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
        >
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center gap-2">
            <span>🚨</span> Why Handle Errors?
          </h2>
          <p className="mt-3 text-gray-300">
            Unhandled exceptions and HTTP errors (404, 500, etc.) can expose sensitive stack traces, confuse users, and create security risks. Proper error handling provides:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
            <li>Friendly error pages (no ugly stack traces)</li>
            <li>Centralised logging and monitoring</li>
            <li>Security (hide internal details)</li>
            <li>Consistent user experience</li>
          </ul>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-orange-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world analogy:</strong> At Shyamnagar Public School, when a student fails a test, the teacher doesn't scream "Exception in thread main" – instead, they give a gentle notice and a second chance. Similarly, custom error pages turn technical failures into helpful messages.
            </p>
          </div>
        </section>

        {/* SVG: Error Flow */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-orange-400">🔄 Error Handling Flow</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 700 180" className="w-full max-w-3xl h-auto">
              <rect x="20" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#f97316" strokeWidth="2" />
              <text x="90" y="55" textAnchor="middle" fill="#fdba74" fontSize="12">Request</text>
              <text x="90" y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">to /students</text>

              <rect x="210" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#f97316" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="280" y="55" textAnchor="middle" fill="#fdba74" fontSize="12">Servlet</text>
              <text x="280" y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">throws Exception</text>

              <rect x="400" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="470" y="55" textAnchor="middle" fill="#fca5a5" fontSize="12">Error Page</text>
              <text x="470" y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">custom 500</text>

              <rect x="590" y="30" width="90" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="635" y="55" textAnchor="middle" fill="#86efac" fontSize="12">Client</text>
              <text x="635" y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">nice page</text>

              <line x1="160" y1="55" x2="208" y2="55" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrE)" />
              <line x1="350" y1="55" x2="398" y2="55" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrE)" />
              <line x1="540" y1="55" x2="588" y2="55" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrE)" />

              <defs>
                <marker id="arrE" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#f97316" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Exception in servlet → container dispatches to configured error page → client sees friendly message.
          </p>
        </section>

        {/* 1. Custom Error Pages via web.xml */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-orange-400">📄 Defining Error Pages in web.xml</h2>
          <p className="mt-3 text-gray-300">
            Use <code>&lt;error-page&gt;</code> elements to map HTTP error codes or Java exception types to custom resources (HTML, JSP, servlet).
          </p>
          <JavaFileLoader
            fileModule={ErrorPageWebXml}
            title="WEB-INF/web.xml – Error Page Configuration"
            highlightLines={[3, 4, 5, 8, 9, 10, 13, 14, 15]}
          />
          <div className="mt-4 p-3 bg-orange-950/30 border-l-4 border-orange-500 rounded">
            <p className="text-sm">💡 <strong>Tip:</strong> Always define error pages for at least <code>404</code> (not found) and <code>500</code> (server error). Include a global fallback for any exception.</p>
          </div>
        </section>

        {/* 2. Programmatic error handling in servlet */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-orange-400">⚙️ Programmatic Error Handling</h2>
          <p className="mt-3 text-gray-300">
            Inside a servlet, you can catch exceptions and manually forward to an error page or set a status code with <code>sendError()</code>.
          </p>
          <JavaFileLoader
            fileModule={ErrorServletExample}
            title="ErrorServlet.java – Catching and Forwarding"
            highlightLines={[12, 13, 18, 19, 20]}
          />
        </section>

        {/* 3. Custom error page JSP */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-orange-400">📝 Example Custom Error JSP</h2>
          <p className="mt-3 text-gray-300">An error page can use implicit objects like <code>request</code> to access error details.</p>
          <JavaFileLoader
            fileModule={CustomErrorPageJsp}
            title="error.jsp – Friendly Error Page"
            highlightLines={[1, 2, 7, 8, 9, 10]}
          />
        </section>

        {/* 4. Exception type mapping */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-orange-400">🔍 Mapping by Exception Type</h2>
          <p className="mt-3 text-gray-300">
            Instead of HTTP codes, map specific Java exceptions to custom handlers. The container will use the first matching exception class in the hierarchy.
          </p>
          <div className="mt-3 p-3 bg-gray-800 rounded-lg font-mono text-sm">
            &lt;error-page&gt;<br/>
            &nbsp;&nbsp;&lt;exception-type&gt;javax.servlet.ServletException&lt;/exception-type&gt;<br/>
            &nbsp;&nbsp;&lt;location&gt;/error/servlet_error.jsp&lt;/location&gt;<br/>
            &lt;/error-page&gt;
          </div>
        </section>

        {/* 5. Handling errors in filters */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-orange-400">🔧 Error Handling in Filters</h2>
          <p className="mt-3 text-gray-300">
            Filters can catch exceptions before they reach the servlet and produce an error response. They must be configured with <code>ASYNC</code> dispatcher if used with async servlets.
          </p>
          <JavaFileLoader
            fileModule={ErrorFilterExample}
            title="ErrorFilter.java – Global Exception Catcher"
            highlightLines={[8, 9, 10, 11]}
          />
        </section>

        {/* 6. Servlet 3.0 annotations for error pages? */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-orange-400">📌 No Annotation for Error Pages</h2>
          <p className="mt-3 text-gray-300">
            Unlike servlets and filters, error page configuration is not supported via annotations. You must use <code>web.xml</code>. However, you can programmatically send errors from code.
          </p>
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-orange-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Error page location not reachable:</strong> If the error page JSP itself throws an exception, the container may show its own error page.</li>
            <li><strong>Missing <code>isErrorPage="true"</code> in JSP:</strong> Without this directive, the <code>exception</code> implicit object is not available.</li>
            <li><strong>Using <code>sendRedirect()</code> in error handling:</strong> Redirect loses original error details; better to use <code>forward()</code> or <code>request.setAttribute()</code>.</li>
            <li><strong>Not setting appropriate HTTP status:</strong> If you forward to a friendly error page, the original status code (e.g., 500) may be lost. Use <code>response.setStatus()</code> explicitly.</li>
            <li><strong>Overriding error pages at container level:</strong> Tomcat has default error pages; your web.xml must override them.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-orange-400">✅ Best Practices (Industry)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Define error pages for 400, 404, 500, and a generic fallback</strong> – cover most common errors.</li>
            <li><strong>Place error JSPs in <code>/WEB-INF/error/</code></strong> to prevent direct access but allow forwarding.</li>
            <li><strong>Log all errors with stack traces</strong> (server logs) but never display them to users.</li>
            <li><strong>Use <code>isErrorPage="true"</code> only on dedicated error pages</strong> – not on normal JSPs.</li>
            <li><strong>Include a request ID or reference number</strong> on error pages for support teams to correlate with logs.</li>
            <li><strong>Test error pages manually</strong> – trigger exceptions in a controlled way to verify behaviour.</li>
            <li><strong>Consider using a global exception handler servlet</strong> mapped to <code>/error</code> for programmatic handling.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-orange-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Add web.xml error-page for 404, 500, and generic exception",
              "✅ Create friendly error JSPs under WEB-INF",
              "✅ Use isErrorPage=\"true\" directive in error JSP",
              "✅ Access exception details via ${exception} or EL",
              "✅ Log exception stack trace (server side)",
              "✅ Never expose stack trace to client",
              "✅ Set appropriate HTTP status code",
              "✅ Test error pages with actual exceptions",
              "✅ Avoid redirects – forward instead",
              "✅ Consider a global error-handling servlet"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-orange-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-orange-500/30"
        >
          <h2 className="text-xl font-semibold text-orange-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> In browser dev tools, see the HTTP status code when you trigger a 404 vs a 500 error page.</li>
            <li>⚙️ <strong>Try changing:</strong> Remove <code>isErrorPage="true"</code> – you'll see that the <code>exception</code> variable is null.</li>
            <li>📂 <strong>Think about:</strong> Why is it bad to redirect to an error page instead of forwarding? (Hint: attributes are lost).</li>
            <li>🧩 <strong>Debug:</strong> Your custom error page is not showing – check web.xml location path, ensure the JSP is compilable.</li>
          </ul>
        </section>

        {/* Java servlet as error handler */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-orange-400">📌 Using a Servlet as Error Handler</h2>
          <p className="mt-3 text-gray-300">Instead of a JSP, you can map a servlet to handle errors. The servlet can process error details and produce JSON or HTML responses.</p>
          <JavaFileLoader
            fileModule={ExceptionHandlerServlet}
            title="ExceptionHandlerServlet.java – JSON Error Response"
            highlightLines={[6, 9, 10, 11]}
          />
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="Error Handling & Custom Error Pages FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Students often ignore error handling until it's too late. Emphasise that custom error pages are part of professional polish. Show them the difference between a raw Tomcat 404 page and a branded school error page. Encourage them to create a simple 'Oops! Something went wrong' page with a link back home. Also discuss that error pages should never contain sensitive info or full stack traces. A good exercise: modify the school's student portal to show a friendly message when a student ID is not found, instead of a NullPointerException." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 11: Error Handling & Custom Error Pages – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic11;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>