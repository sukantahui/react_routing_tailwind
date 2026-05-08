// Topic4.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import CookieExample from "./topic4_files/CookieServlet.java?raw";
import HttpSessionExample from "./topic4_files/LoginSessionServlet.java?raw";
import UrlRewritingExample from "./topic4_files/ProfileServlet.java?raw";
import SessionTrackingDemo from "./topic4_files/SessionTrackingDemo.java?raw";
import LogoutServlet from "./topic4_files/LogoutServlet.java?raw";

// FAQ questions for this topic
import questions from "./topic4_files/topic4_questions";

const Topic4 = () => {
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
        {/* Header */}
        <header className="text-center space-y-4 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Session Management
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cookies, HttpSession, and URL Rewriting – keeping track of users across stateless HTTP.
          </p>
        </header>

        {/* Why Session Management? */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
        >
          <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
            <span>🔐</span> Why do we need sessions?
          </h2>
          <p className="mt-3 text-gray-300">
            HTTP is <strong>stateless</strong> – each request stands alone. But e‑commerce, school portals (e.g., Barrackpore High's online grade viewer) need to remember who you are across multiple page clicks. Session management solves this by associating multiple requests from the same user.
          </p>
          <p className="mt-3 text-gray-300">
            Three primary techniques: <strong>Cookies</strong> (client‑side), <strong>HttpSession</strong> (server‑side with a session ID), and <strong>URL rewriting</strong> (fallback when cookies are disabled).
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-blue-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world analogy:</strong> Swadeep visits a school website. A cookie is like a temporary ID card stored in his browser. HttpSession is the school's office record that keeps his preferences. URL rewriting adds that ID to every link – like writing his roll number on every form.
            </p>
          </div>
        </section>

        {/* SVG: Three techniques comparison */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">🛠️ Three Session Tracking Techniques</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            <svg viewBox="0 0 200 160" className="w-48 h-auto">
              <rect x="10" y="10" width="180" height="140" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="100" y="35" textAnchor="middle" fill="#60a5fa" fontWeight="bold" fontSize="14">Cookies</text>
              <text x="100" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="11">Client‑side</text>
              <text x="100" y="80" textAnchor="middle" fill="#9ca3af" fontSize="10">Stored in browser</text>
              <text x="100" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">Name‑value pairs</text>
              <text x="100" y="120" textAnchor="middle" fill="#f87171" fontSize="10">Size limit ~4KB</text>
            </svg>
            <svg viewBox="0 0 200 160" className="w-48 h-auto">
              <rect x="10" y="10" width="180" height="140" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="100" y="35" textAnchor="middle" fill="#60a5fa" fontWeight="bold" fontSize="14">HttpSession</text>
              <text x="100" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="11">Server‑side</text>
              <text x="100" y="80" textAnchor="middle" fill="#9ca3af" fontSize="10">Session ID cookie</text>
              <text x="100" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">Stores objects</text>
              <text x="100" y="120" textAnchor="middle" fill="#34d399" fontSize="10">Secure & flexible</text>
            </svg>
            <svg viewBox="0 0 200 160" className="w-48 h-auto">
              <rect x="10" y="10" width="180" height="140" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="100" y="35" textAnchor="middle" fill="#60a5fa" fontWeight="bold" fontSize="14">URL Rewriting</text>
              <text x="100" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="11">Fallback technique</text>
              <text x="100" y="80" textAnchor="middle" fill="#9ca3af" fontSize="10">Appends session ID</text>
              <text x="100" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">In all URLs</text>
              <text x="100" y="120" textAnchor="middle" fill="#fbbf24" fontSize="10">Works without cookies</text>
            </svg>
          </div>
        </section>

        {/* 1. Cookies */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">🍪 Cookies – Client‑Side State</h2>
          <p className="mt-3 text-gray-300">
            A cookie is a small piece of data sent from the server to the client, stored by the browser, and sent back with every subsequent request. Servlets use <code>javax.servlet.http.Cookie</code> class.
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-mono text-blue-300">📌 Key Methods</h3>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li><code>Cookie(String name, String value)</code> – constructor.</li>
              <li><code>void setMaxAge(int seconds)</code> – defines cookie lifetime (0 = delete).</li>
              <li><code>void setPath(String uri)</code> – restricts cookie to specific path.</li>
              <li><code>void setSecure(boolean flag)</code> – only send over HTTPS.</li>
              <li><code>void setHttpOnly(boolean flag)</code> – prevents JavaScript access (XSS protection).</li>
            </ul>
          </div>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={CookieExample}
              title="CookieServlet.java – Setting and Reading Cookies"
              highlightLines={[12, 16, 20, 29]}
            />
          </div>
          <div className="mt-4 p-3 bg-blue-950/30 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Tip:</strong> Always set <code>HttpOnly</code> and <code>Secure</code> flags for sensitive cookies. Use <code>setMaxAge()</code> to avoid "session cookies" that expire when browser closes.
            </p>
          </div>
        </section>

        {/* 2. HttpSession */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">📦 HttpSession – Server‑Side Session</h2>
          <p className="mt-3 text-gray-300">
            The container creates a unique <code>HttpSession</code> object for each user. It maintains a session ID (usually via a cookie named <code>JSESSIONID</code>) and can store any Java objects as attributes.
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-mono text-blue-300">📌 Key Methods</h3>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li><code>HttpSession session = request.getSession()</code> – creates or retrieves session.</li>
              <li><code>void setAttribute(String name, Object value)</code> – store data.</li>
              <li><code>Object getAttribute(String name)</code> – retrieve data.</li>
              <li><code>void invalidate()</code> – destroys session (logout).</li>
              <li><code>void setMaxInactiveInterval(int seconds)</code> – timeout.</li>
            </ul>
          </div>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={HttpSessionExample}
              title="LoginSessionServlet.java – Using HttpSession after Login"
              highlightLines={[13, 18, 19, 28]}
            />
          </div>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={LogoutServlet}
              title="LogoutServlet.java – Invalidating Session"
              highlightLines={[8, 9]}
            />
          </div>
        </section>

        {/* 3. URL Rewriting (fallback) */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">🔗 URL Rewriting – When Cookies Are Disabled</h2>
          <p className="mt-3 text-gray-300">
            Some users disable cookies. URL rewriting appends the session ID to every URL as a query parameter (<code>;jsessionid=...</code>). Servlets provide the <code>encodeURL()</code> and <code>encodeRedirectURL()</code> methods to automatically add the session ID if cookies are not supported.
          </p>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={UrlRewritingExample}
              title="ProfileServlet.java – URL Rewriting Example"
              highlightLines={[12, 13, 24]}
            />
          </div>
          <div className="mt-4 p-3 bg-amber-950/30 border-l-4 border-amber-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Pro tip:</strong> Always use <code>response.encodeURL()</code> for every link and <code>encodeRedirectURL()</code> for redirects. This gracefully degrades when cookies are off.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">📊 Comparison of Session Management Techniques</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-800 text-blue-300">
                <tr><th className="px-4 py-2">Feature</th><th>Cookies</th><th>HttpSession</th><th>URL Rewriting</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr><td className="px-4 py-2">Storage</td><td>Client browser</td><td>Server memory</td><td>URL parameter</td></tr>
                <tr><td className="px-4 py-2">Size limit</td><td>~4KB per cookie</td><td>Virtually unlimited</td><td>Limited by URL length</td></tr>
                <tr><td className="px-4 py-2">Security</td><td>Vulnerable (can be stolen)</td><td>More secure (session ID)</td><td>Session ID visible in URL</td></tr>
                <tr><td className="px-4 py-2">Persistence</td><td>Can be made persistent</td><td>Timeout / invalidate</td><td>Only for current session</td></tr>
                <tr><td className="px-4 py-2">Requires cookies</td><td>Yes (to read)</td><td>Yes for default tracking</td><td>No</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Advanced: Session Listeners & Configuration */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">⚙️ Session Configuration & Listeners</h2>
          <p className="mt-3 text-gray-300">Set session timeout in <code>web.xml</code> or programmatically. Use <code>HttpSessionListener</code> to track session creation/destruction (e.g., count online users).</p>
          <div className="mt-3 p-3 bg-gray-800 rounded-lg">
            <p className="font-mono text-sm">// web.xml timeout (minutes)<br/>&lt;session-config&gt;<br/>&nbsp;&nbsp;&lt;session-timeout&gt;30&lt;/session-timeout&gt;<br/>&lt;/session-config&gt;</p>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Not calling <code>getSession()</code> before using session</strong> – results in <code>NullPointerException</code>.</li>
            <li><strong>Storing large objects in HttpSession</strong> – causes memory overhead and poor performance.</li>
            <li><strong>Forgetting to invalidate session on logout</strong> – session remains active, posing security risk.</li>
            <li><strong>Using cookies without <code>HttpOnly</code></strong> – XSS attacks can steal session cookies.</li>
            <li><strong>URL rewriting without <code>encodeURL()</code></strong> – session breaks when cookies are disabled.</li>
            <li><strong>Setting <code>maxAge</code> to negative vs zero</strong> – negative means session cookie (browser close); zero deletes immediately.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">✅ Best Practices (Industry)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Use HttpSession for user‑specific data</strong> (shopping cart, logged‑in user ID).</li>
            <li><strong>Keep session data minimal</strong> – store only identifiers, fetch fresh data from DB when needed.</li>
            <li><strong>Set reasonable session timeouts</strong> (15–30 minutes for typical web apps).</li>
            <li><strong>Always call <code>invalidate()</code> on logout</strong> and remove cookies client‑side.</li>
            <li><strong>Use <code>encodeURL()</code> for all internal links</strong> to support cookie‑disabled clients.</li>
            <li><strong>Mark session cookies as <code>Secure</code> and <code>HttpOnly</code></strong>.</li>
            <li><strong>Regenerate session ID after login</strong> to prevent session fixation attacks: <code>request.changeSessionId()</code> (Servlet 3.1+).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-blue-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Understand stateless HTTP → need for sessions",
              "✅ Know three tracking techniques: cookies, HttpSession, URL rewriting",
              "✅ Use request.getSession() correctly",
              "✅ Store and retrieve session attributes",
              "✅ Set cookie maxAge, HttpOnly, Secure flags",
              "✅ Call response.encodeURL() for every URL",
              "✅ Invalidate session on logout",
              "✅ Set session timeout in web.xml or programmatically",
              "✅ Avoid storing heavy objects in session",
              "✅ Regenerate session ID after authentication"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-blue-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[9] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-blue-500/30"
        >
          <h2 className="text-xl font-semibold text-blue-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> Open your browser dev tools → Application → Cookies. See JSESSIONID after visiting a servlet that calls <code>getSession()</code>.</li>
            <li>⚙️ <strong>Try changing:</strong> Disable cookies in your browser. Does your app still work? If not, you forgot <code>encodeURL()</code>.</li>
            <li>📂 <strong>Think about:</strong> Why is it dangerous to put sensitive data like passwords in a cookie (even encrypted)?</li>
            <li>🧩 <strong>Debug:</strong> Session attributes not persisting? Check if you called <code>invalidate()</code> accidentally or timeout is too short.</li>
          </ul>
        </section>

        {/* Additional Code Example: Session Tracking Demo */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-blue-400">💻 Full Session Tracking Demo</h2>
          <JavaFileLoader
            fileModule={SessionTrackingDemo}
            title="SessionTrackingDemo.java – All Three Techniques"
            highlightLines={[14, 18, 25, 30]}
          />
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="Session Management FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Students often forget that HTTP is stateless. Use the 'school library card' analogy: Cookie = card the student keeps; HttpSession = librarian's record; URL rewriting = writing student ID on each book request. Emphasise that encodeURL() is not optional if you want a robust app. Show them how to inspect cookies and session attributes using browser tools and a simple debug servlet. Also warn about session fixation – always regenerate session ID after login, especially in academic systems where multiple users share a computer." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 4: Session Management (Cookies, HttpSession, URL Rewriting) – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic4;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>