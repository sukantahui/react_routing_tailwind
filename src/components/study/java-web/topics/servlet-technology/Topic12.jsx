// Topic12.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import AuthFilterExample from "./topic12_files/AuthenticationFilter.java?raw";
import ServletSecurityAnnotation from "./topic12_files/SecureServlet.java?raw";
import WebXmlSecurityConfig from "./topic12_files/web_security_config.xml?raw";
import JdbcAuthFilter from "./topic12_files/JdbcAuthFilter.java?raw";
import RoleBasedAccess from "./topic12_files/RoleBasedServlet.java?raw";

// FAQ questions for this topic
import questions from "./topic12_files/topic12_questions";

const Topic12 = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent">
            Authentication Filters & @ServletSecurity
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Protect your web application – authentication, authorisation, roles, and declarative security with annotations.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10"
        >
          <h2 className="text-2xl font-semibold text-rose-400 flex items-center gap-2">
            <span>🔒</span> Security in Servlets
          </h2>
          <p className="mt-3 text-gray-300">
            Web applications need two security pillars: <strong>authentication</strong> (who you are) and <strong>authorisation</strong> (what you can do). Servlets provide multiple approaches:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
            <li><strong>Declarative security</strong> – via <code>web.xml</code> or <code>@ServletSecurity</code> annotations (simple role‑based access).</li>
            <li><strong>Programmatic security</strong> – custom authentication filters, checking roles in code, login/logout handling.</li>
            <li><strong>Container‑managed authentication</strong> – BASIC, FORM, DIGEST, CLIENT‑CERT login configurations.</li>
          </ul>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-rose-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world analogy:</strong> At Naihati Public School, students have ID cards (authentication). Each card has a role: student, teacher, admin. The library door (servlet) checks the role before allowing entry (authorisation). Filters act as security guards checking every visitor.
            </p>
          </div>
        </section>

        {/* SVG: Security Flow */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-rose-400">🛡️ Security Flow with Filter and @ServletSecurity</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 750 200" className="w-full max-w-4xl h-auto">
              <rect x="20" y="30" width="120" height="50" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
              <text x="80" y="55" textAnchor="middle" fill="#fda4af" fontSize="12">Client</text>
              <text x="80" y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">Request</text>

              <rect x="190" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="260" y="50" textAnchor="middle" fill="#fda4af" fontSize="12">Auth Filter</text>
              <text x="260" y="65" textAnchor="middle" fill="#9ca3af" fontSize="10">Check credentials</text>

              <rect x="380" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="450" y="50" textAnchor="middle" fill="#fda4af" fontSize="12">Servlet</text>
              <text x="450" y="65" textAnchor="middle" fill="#9ca3af" fontSize="10">@ServletSecurity</text>

              <rect x="570" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="640" y="55" textAnchor="middle" fill="#86efac" fontSize="12">Resource</text>

              <line x1="140" y1="55" x2="188" y2="55" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrSec)" />
              <line x1="330" y1="55" x2="378" y2="55" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrSec)" />
              <line x1="520" y1="55" x2="568" y2="55" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrSec)" />

              <defs>
                <marker id="arrSec" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#f43f5e" />
                </marker>
              </defs>
              <text x="260" y="110" textAnchor="middle" fill="#9ca3af" fontSize="10">If auth fails → redirect to login</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Authentication filter validates user → servlet's security annotation checks roles → access granted or denied.
          </p>
        </section>

        {/* 1. Authentication Filter (programmatic) */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-rose-400">🔑 Authentication Filter – Programmatic Security</h2>
          <p className="mt-3 text-gray-300">
            A filter intercepts every request, checks if the user is logged in (e.g., by looking for a session attribute), and redirects to a login page if not.
          </p>
          <JavaFileLoader
            fileModule={AuthFilterExample}
            title="AuthenticationFilter.java – Basic Auth Check"
            highlightLines={[12, 15, 16, 19, 20]}
          />
          <div className="mt-4 p-3 bg-rose-950/30 border-l-4 border-rose-500 rounded">
            <p className="text-sm">💡 <strong>Tip:</strong> Exclude public pages (login, register, static resources) from the filter using URL pattern or checking request URI.</p>
          </div>
        </section>

        {/* 2. @ServletSecurity Annotation */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-rose-400">🏷️ @ServletSecurity – Declarative Role‑Based Access</h2>
          <p className="mt-3 text-gray-300">
            Introduced in Servlet 3.0, <code>@ServletSecurity</code> lets you define access constraints directly on the servlet class. It uses two inner annotations:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code>@HttpConstraint</code> – applies to all HTTP methods unless overridden.</li>
            <li><code>@HttpMethodConstraint</code> – per‑method constraints (e.g., GET vs POST).</li>
          </ul>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={ServletSecurityAnnotation}
              title="SecureServlet.java – @ServletSecurity Example"
              highlightLines={[6, 7, 8, 9, 10]}
            />
          </div>
          <div className="mt-4 p-3 bg-rose-950/30 border-l-4 border-rose-500 rounded">
            <p className="text-sm">💡 <strong>Note:</strong> <code>@ServletSecurity</code> only works if you have defined security roles in <code>web.xml</code> or via container configuration.</p>
          </div>
        </section>

        {/* 3. Defining Roles in web.xml */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-rose-400">📄 Security Roles and Constraints in web.xml</h2>
          <p className="mt-3 text-gray-300">
            Even with annotations, you must declare security roles and optionally login configuration in <code>web.xml</code>.
          </p>
          <JavaFileLoader
            fileModule={WebXmlSecurityConfig}
            title="web.xml – Roles, Constraints, Login Config"
            highlightLines={[3, 4, 5, 8, 9, 14, 15, 16]}
          />
        </section>

        {/* 4. Advanced: JDBC Authentication Filter */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-rose-400">🗄️ JDBC Authentication Filter</h2>
          <p className="mt-3 text-gray-300">
            Real‑world filters often validate credentials against a database. Here's an example that checks username/password from a request and sets session attributes.
          </p>
          <JavaFileLoader
            fileModule={JdbcAuthFilter}
            title="JdbcAuthFilter.java – Database Authentication"
            highlightLines={[15, 16, 17, 18, 25]}
          />
        </section>

        {/* 5. Checking Roles Programmatically */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-rose-400">🧪 Programmatic Role Checks</h2>
          <p className="mt-3 text-gray-300">
            Inside a servlet, you can call <code>request.isUserInRole("roleName")</code> and <code>request.getUserPrincipal()</code> to make fine‑grained decisions.
          </p>
          <JavaFileLoader
            fileModule={RoleBasedAccess}
            title="RoleBasedServlet.java – Programmatic Authorisation"
            highlightLines={[10, 11, 12, 13]}
          />
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-rose-400">⚠️ Common Pitfalls</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Not declaring security roles in web.xml:</strong> <code>@ServletSecurity</code> will not work (or will be ignored).</li>
            <li><strong>Auth filter not excluding login page:</strong> Creates infinite redirect loop.</li>
            <li><strong>Storing password in session unnecessarily:</strong> Only store user ID or principal, not raw password.</li>
            <li><strong>Using BASIC authentication without HTTPS:</strong> Credentials are sent in plain text.</li>
            <li><strong>Conflicting constraints:</strong> web.xml security constraints and annotations combine (most restrictive wins).</li>
            <li><strong>Not handling session fixation:</strong> After login, call <code>request.changeSessionId()</code> (Servlet 3.1).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-rose-400">✅ Best Practices</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            <li><strong>Use HTTPS for all authenticated traffic</strong> – prevent session hijacking.</li>
            <li><strong>Hash passwords (bcrypt, PBKDF2)</strong> – never store plaintext.</li>
            <li><strong>Regenerate session ID after successful login</strong> – prevents session fixation.</li>
            <li><strong>Apply defence in depth</strong> – combine filters with container security and annotation constraints.</li>
            <li><strong>Log authentication failures</strong> – detect brute force attacks.</li>
            <li><strong>Implement CSRF protection</strong> – tokens for state‑changing operations.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-rose-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Define security roles in web.xml",
              "✅ Use @ServletSecurity on protected servlets",
              "✅ Create authentication filter for session check",
              "✅ Exclude public resources from filter",
              "✅ Store only user principal in session",
              "✅ Use changeSessionId() after login",
              "✅ Hash passwords with strong algorithm",
              "✅ Validate input to prevent SQL injection in custom auth",
              "✅ Set secure and HttpOnly flags on session cookie",
              "✅ Test with both authenticated and anonymous users"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-rose-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-rose-500/30"
        >
          <h2 className="text-xl font-semibold text-rose-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> Check the HTTP response when you access a protected resource without logging in – 302 redirect to login page.</li>
            <li>⚙️ <strong>Try changing:</strong> Remove the <code>@HttpConstraint</code> – what happens? (No constraint means no authorisation).</li>
            <li>📂 <strong>Think about:</strong> Why is BASIC authentication insecure over HTTP? (Password sent in Base64, easily decoded).</li>
            <li>🧩 <strong>Debug:</strong> Your <code>@ServletSecurity</code> seems ignored – verify that <code>web.xml</code> has <code>&lt;security-role&gt;</code> elements and the servlet is not excluded by metadata-complete.</li>
          </ul>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="Authentication & @ServletSecurity FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Security is often taught last but is critical. Emphasise that filters are the most flexible way to implement authentication, while @ServletSecurity provides a clean declarative model. Show a complete flow: login form → auth filter validates → set session attribute → subsequent requests skip login. Also discuss session fixation and demonstrate `changeSessionId()`. A great exercise: create a tiny student grade portal with two roles – 'student' (view only) and 'teacher' (edit grades). Use @ServletSecurity on the grade servlet with different constraints per role." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 12: Authentication Filters and Security Annotations – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic12;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>