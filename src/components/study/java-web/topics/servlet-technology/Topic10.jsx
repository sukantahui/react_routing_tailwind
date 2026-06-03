// Topic10.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files
import ForwardExample from "./topic10_files/ForwardServlet.java?raw";
import RedirectExample from "./topic10_files/RedirectServlet.java?raw";
import IncludeExample from "./topic10_files/IncludeServlet.java?raw";
import LoginForwardDemo from "./topic10_files/LoginController.java?raw";
import MvcPattern from "./topic10_files/MvcServlet.java?raw";

import questions from "./topic10_files/topic10_questions";

const Topic10 = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            RequestDispatcher & sendRedirect
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Navigating between servlets and JSPs – forward, include, and redirect with the Servlet API.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
        >
          <h2 className="text-2xl font-semibold text-indigo-400 flex items-center gap-2">
            <span>🚦</span> RequestDispatcher vs sendRedirect
          </h2>
          <p className="mt-3 text-gray-300">
            A web application often needs to delegate a request to another resource (servlet, JSP, HTML). Two primary mechanisms:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>RequestDispatcher</strong> – server‑side transfer (forward or include). The client is unaware; URL stays the same.</li>
            <li><strong>sendRedirect</strong> – client‑side redirect. The server sends a <code>302</code> status code and a new URL; client makes a new request.</li>
          </ul>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-indigo-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world analogy:</strong> In Ichapur Public School, forwarding is like a teacher sending a student to another classroom within the same building – the student is still in the same school (same request). Redirect is like telling the student to go home and come back tomorrow – they leave and return with a new pass (new request).
            </p>
          </div>
        </section>

        {/* SVG Comparison */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-indigo-400">📊 Forward vs Redirect</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <svg viewBox="0 0 300 200" className="w-72 h-auto">
              <rect x="10" y="10" width="280" height="180" rx="10" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="150" y="35" textAnchor="middle" fill="#a5b4fc" fontWeight="bold">Forward (Server‑side)</text>
              <rect x="30" y="55" width="100" height="40" rx="5" fill="#2d3748" stroke="#818cf8" />
              <text x="80" y="78" textAnchor="middle" fill="#c7d2fe" fontSize="11">Client</text>
              <rect x="170" y="55" width="100" height="40" rx="5" fill="#2d3748" stroke="#818cf8" />
              <text x="220" y="78" textAnchor="middle" fill="#c7d2fe" fontSize="11">Servlet A</text>
              <rect x="170" y="130" width="100" height="40" rx="5" fill="#2d3748" stroke="#818cf8" />
              <text x="220" y="153" textAnchor="middle" fill="#c7d2fe" fontSize="11">Servlet B</text>
              <line x1="130" y1="75" x2="168" y2="75" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrF)" />
              <line x1="220" y1="95" x2="220" y2="128" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrF)" />
              <text x="220" y="115" textAnchor="middle" fill="#9ca3af" fontSize="10">forward()</text>
              <defs><marker id="arrF" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0 0, 8 4, 0 8" fill="#818cf8" /></marker></defs>
            </svg>
            <svg viewBox="0 0 300 200" className="w-72 h-auto">
              <rect x="10" y="10" width="280" height="180" rx="10" fill="#1e293b" stroke="#f472b6" strokeWidth="1.5" />
              <text x="150" y="35" textAnchor="middle" fill="#f9a8d4" fontWeight="bold">Redirect (Client‑side)</text>
              <rect x="30" y="55" width="100" height="40" rx="5" fill="#2d3748" stroke="#f472b6" />
              <text x="80" y="78" textAnchor="middle" fill="#fbcfe8" fontSize="11">Client</text>
              <rect x="170" y="55" width="100" height="40" rx="5" fill="#2d3748" stroke="#f472b6" />
              <text x="220" y="78" textAnchor="middle" fill="#fbcfe8" fontSize="11">Servlet A</text>
              <text x="220" y="115" textAnchor="middle" fill="#f472b6" fontSize="10">302 + Location</text>
              <line x1="130" y1="75" x2="168" y2="75" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrR)" strokeDasharray="4,2" />
              <path d="M220 95 L220 130 L130 130" fill="none" stroke="#f472b6" strokeWidth="1.5" markerEnd="url(#arrR)" />
              <text x="80" y="125" textAnchor="middle" fill="#fbcfe8" fontSize="10">New request</text>
              <defs><marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0 0, 8 4, 0 8" fill="#f472b6" /></marker></defs>
            </svg>
          </div>
        </section>

        {/* RequestDispatcher – forward */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-indigo-400">➡️ RequestDispatcher.forward()</h2>
          <p className="mt-3 text-gray-300">Transfers control to another resource on the server. The client sees the original URL. All request parameters and attributes are preserved. Must be called before any response is committed.</p>
          <JavaFileLoader
            fileModule={ForwardExample}
            title="ForwardServlet.java – Forward to JSP"
            highlightLines={[8, 9, 10]}
          />
          <div className="mt-4 p-3 bg-indigo-950/30 border-l-4 border-indigo-500 rounded">
            <p className="text-sm">💡 <strong>Tip:</strong> Use <code>request.setAttribute()</code> to pass data to the forwarded resource. This is the foundation of MVC (Servlet as controller, JSP as view).</p>
          </div>
        </section>

        {/* include() */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-indigo-400">🧩 RequestDispatcher.include()</h2>
          <p className="mt-3 text-gray-300">Includes the output of another resource (servlet, JSP) into the current response. Useful for headers, footers, or reusable components.</p>
          <JavaFileLoader
            fileModule={IncludeExample}
            title="IncludeServlet.java – Including a Footer"
            highlightLines={[8, 9]}
          />
        </section>

        {/* sendRedirect */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-indigo-400">🔄 HttpServletResponse.sendRedirect()</h2>
          <p className="mt-3 text-gray-300">Sends a 302 status code with a <code>Location</code> header. The client makes a brand new request to the new URL. Use when you want to change the URL in the browser (e.g., after form submission, login, or moving to a different context). Data can be passed via URL parameters or session.</p>
          <JavaFileLoader
            fileModule={RedirectExample}
            title="RedirectServlet.java – POST-Redirect-GET pattern"
            highlightLines={[10, 11]}
          />
          <div className="mt-4 p-3 bg-yellow-950/30 border-l-4 border-yellow-500 rounded">
            <p className="text-sm">⚠️ <strong>Caution:</strong> Redirect loses original request parameters and attributes (unless passed in URL or session). It also creates an extra round trip to the client.</p>
          </div>
        </section>

        {/* <!-- Comparison Table --> */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-indigo-400">📋 Forward vs Redirect – Key Differences</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-800 text-indigo-300">
                <tr><th className="px-4 py-2">Aspect</th><th>Forward</th><th>Redirect</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr><td className="px-4 py-2">Client knows?</td><td>No (URL unchanged)</td><td>Yes (URL changes)</td></tr>
                <tr><td className="px-4 py-2">Request/Response objects</td><td>Same objects</td><td>New request/response</td></tr>
                <tr><td className="px-4 py-2">Attributes preserved?</td><td>Yes</td><td>No (unless session or URL)</td></tr>
                <tr><td className="px-4 py-2">Network round trip</td><td>One (server internal)</td><td>Two (client sees redirect)</td></tr>
                <tr><td className="px-4 py-2">Refresh behavior</td><td>Re‑runs last action (risk of double submit)</td><td>Refreshes final page only (safe)</td></tr>
                <tr><td className="px-4 py-2">Typical use</td><td>MVC pattern, resource inclusion</td><td>After POST, login, external site</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* <!-- Real-world: Login example --> */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-indigo-400">🔐 Example: Login with Forward vs Redirect</h2>
          <p className="mt-3 text-gray-300">After successful login, redirect to dashboard (to avoid re‑submission on refresh). If login fails, forward back to login page with error message.</p>
          <JavaFileLoader
            fileModule={LoginForwardDemo}
            title="LoginController.java – Forward on error, Redirect on success"
            highlightLines={[12, 15, 18]}
          />
        </section>

        {/* <!-- MVC Pattern with Forward --> */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-indigo-400">🏛️ MVC Architecture Using Forward</h2>
          <p className="mt-3 text-gray-300">Servlet as Controller processes request, sets attributes, forwards to JSP (View).</p>
          <JavaFileLoader
            fileModule={MvcPattern}
            title="MvcServlet.java – Controller + Forward to JSP"
            highlightLines={[8, 9, 10]}
          />
        </section>

        {/* <!-- Common Pitfalls --> */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-indigo-400">⚠️ Common Pitfalls</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Forward after response committed</strong> – throws IllegalStateException. Ensure no previous flush/close.</li>
            <li><strong>Using forward or include without absolute path (starting with /)</strong> – relative paths are relative to current servlet, not context root. Use <code>request.getContextPath()</code> or start with "/".</li>
            <li><strong>Redirect to relative URL</strong> – better to use absolute path (e.g., <code>response.sendRedirect(request.getContextPath() + "/home")</code>).</li>
            <li><strong>Forgetting to return after redirect</strong> – code after <code>sendRedirect()</code> still executes. Add <code>return;</code> or conditional logic.</li>
            <li><strong>Using forward for external URL</strong> – forward only works inside the same web application. Use redirect for external sites.</li>
          </ul>
        </section>

        {/* <!-- Best Practices --> */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-indigo-400">✅ Best Practices</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Use forward for internal navigation in MVC pattern.</li>
            <li>Use redirect after write operations (POST-Redirect-GET) to prevent duplicate submissions.</li>
            <li>Always prefix paths with <code>"/"</code> (context‑relative) or include context path when needed.</li>
            <li>Prefer <code>request.getRequestDispatcher("/WEB-INF/view.jsp")</code> for JSPs inside WEB‑INF (protected from direct access).</li>
            <li>When redirecting, include context path using <code>request.getContextPath()</code>.</li>
            <li>After <code>sendRedirect()</code>, call <code>return;</code> to avoid unintended processing.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-indigo-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "✅ Understand forward (server) vs redirect (client)",
              "✅ Use forward to keep request attributes",
              "✅ Use redirect after form POST",
              "✅ Call forward before response is committed",
              "✅ Add return after sendRedirect",
              "✅ Use absolute paths (starting with /)",
              "✅ Pass data either via request/session or URL",
              "✅ Test refresh behavior after redirect (safe)",
              "✅ Keep JSPs under WEB‑INF for forwards",
              "✅ Use encodeRedirectURL if cookies may be disabled"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="text-indigo-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-indigo-500/30">
          <h2 className="text-xl font-semibold text-indigo-400">🧠 Hints</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 Observe browser network tab: forward shows one request; redirect shows two (302 then new request).</li>
            <li>⚙️ Try changing a forward to a redirect – see how URL changes and request attributes are lost.</li>
            <li>📂 Think about: Why is redirect often called “Post‑Redirect‑Get”?</li>
            <li>🧩 Debug: “IllegalStateException: response already committed” – check for previous out.flush() or auto‑flush JSP.</li>
          </ul>
        </section>

        <FAQTemplate title="RequestDispatcher & sendRedirect FAQs" questions={questions} />
        <Teacher note="Students often confuse forward and redirect. Emphasise the URL bar test: forward – URL stays; redirect – URL changes. Use the PRG pattern as a key example: after a POST, redirect to a GET page to avoid duplicate submissions. Also show them how to protect JSPs by placing them in WEB‑INF and only forwarding to them. A classroom exercise: build a simple login page that forwards back with error messages on failure and redirects to dashboard on success. This cements the concept." />

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 10: RequestDispatcher and sendRedirect – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic10;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>