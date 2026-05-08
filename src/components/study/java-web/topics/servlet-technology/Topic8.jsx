// Topic8.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import ServletContextListenerExample from "./topic8_files/ServletContextListenerExample.java?raw";
import HttpSessionListenerExample from "./topic8_files/HttpSessionListenerExample.java?raw";
import ServletRequestListenerExample from "./topic8_files/ServletRequestListenerExample.java?raw";
import HttpSessionAttributeListenerExample from "./topic8_files/HttpSessionAttributeListenerExample.java?raw";
import MultipleListenersExample from "./topic8_files/MultipleListenersExample.java?raw";
import WebXmlListenerConfig from "./topic8_files/web_listener_config.xml?raw";

// FAQ questions for this topic
import questions from "./topic8_files/topic8_questions";

const Topic8 = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Servlet Listeners
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            <code>ServletContextListener</code>, <code>HttpSessionListener</code>, <code>ServletRequestListener</code> – reacting to lifecycle events in your web application.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
        >
          <h2 className="text-2xl font-semibold text-green-400 flex items-center gap-2">
            <span>🎧</span> What are Servlet Listeners?
          </h2>
          <p className="mt-3 text-gray-300">
            Listeners are Java classes that listen for and react to lifecycle events in a web application: when the application starts or stops, when a session is created or destroyed, when an attribute is added to a request, session, or context, and more. They enable you to run code at specific moments without modifying existing servlets.
          </p>
          <p className="mt-3 text-gray-300">
            Listeners are part of the Servlet API and can be registered via <code>@WebListener</code> annotation or in <code>web.xml</code>. They are ideal for initialisation, cleanup, monitoring, and logging.
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-green-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world analogy:</strong> At Barrackpore High School, the principal (listener) is notified when school starts (context init), when a student enters a classroom (session created), and when a student leaves (session destroyed). The principal can then take action – updating attendance logs, allocating resources, or cleaning up.
            </p>
          </div>
        </section>

        {/* SVG: Lifecycle Events */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-green-400">📡 Listener Event Flow</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 750 280" className="w-full max-w-4xl h-auto">
              {/* <!-- Timeline --> */}
              <rect x="20" y="40" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="100" y="65" textAnchor="middle" fill="#6ee7b7" fontSize="13">App Startup</text>
              <text x="100" y="85" textAnchor="middle" fill="#9ca3af" fontSize="11">contextInitialized()</text>

              <rect x="230" y="40" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="310" y="65" textAnchor="middle" fill="#6ee7b7" fontSize="13">Session Created</text>
              <text x="310" y="85" textAnchor="middle" fill="#9ca3af" fontSize="11">sessionCreated()</text>

              <rect x="440" y="40" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="520" y="65" textAnchor="middle" fill="#6ee7b7" fontSize="13">Request Arrives</text>
              <text x="520" y="85" textAnchor="middle" fill="#9ca3af" fontSize="11">requestInitialized()</text>

              <rect x="650" y="40" width="80" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="690" y="75" textAnchor="middle" fill="#fcd34d" fontSize="12">Servlet</text>

              <line x1="180" y1="70" x2="228" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrL)" />
              <line x1="390" y1="70" x2="438" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrL)" />
              <line x1="600" y1="70" x2="648" y2="70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrL)" />

              {/* <!-- Response side --> */}
              <rect x="650" y="160" width="80" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="690" y="195" textAnchor="middle" fill="#fcd34d" fontSize="12">Servlet</text>

              <rect x="440" y="160" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="520" y="185" textAnchor="middle" fill="#6ee7b7" fontSize="13">Request Destroyed</text>
              <text x="520" y="205" textAnchor="middle" fill="#9ca3af" fontSize="11">requestDestroyed()</text>

              <rect x="230" y="160" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="310" y="185" textAnchor="middle" fill="#6ee7b7" fontSize="13">Session Destroyed</text>
              <text x="310" y="205" textAnchor="middle" fill="#9ca3af" fontSize="11">sessionDestroyed()</text>

              <rect x="20" y="160" width="160" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="100" y="185" textAnchor="middle" fill="#6ee7b7" fontSize="13">App Shutdown</text>
              <text x="100" y="205" textAnchor="middle" fill="#9ca3af" fontSize="11">contextDestroyed()</text>

              <line x1="520" y1="70" x2="520" y2="158" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,4" />
              <line x1="690" y1="100" x2="690" y2="158" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,4" />
              <line x1="520" y1="220" x2="310" y2="220" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrL)" />
              <line x1="310" y1="220" x2="100" y2="220" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrL)" />

              <defs>
                <marker id="arrL" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#10b981" />
                </marker>
              </defs>
              <text x="370" y="140" textAnchor="middle" fill="#9ca3af" fontSize="11">Request processing timeline</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Listeners react to lifecycle events: context (app), session, request, and attribute changes.
          </p>
        </section>

        {/* 1. ServletContextListener */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-green-400">🌍 ServletContextListener</h2>
          <p className="mt-3 text-gray-300">
            Most commonly used listener. Fires when the web application is deployed (started) and when it is undeployed (stopped). Perfect for one‑time initialisation and cleanup.
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li><code>contextInitialized(ServletContextEvent sce)</code> – called when app starts.</li>
            <li><code>contextDestroyed(ServletContextEvent sce)</code> – called when app shuts down.</li>
          </ul>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={ServletContextListenerExample}
              title="AppStartupListener.java – Database Initialisation"
              highlightLines={[8, 9, 10, 16, 17]}
            />
          </div>
          <div className="mt-4 p-3 bg-green-950/30 border-l-4 border-green-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Tip:</strong> Use <code>ServletContextEvent.getServletContext()</code> to store attributes that should be available to all servlets (e.g., a database connection pool).
            </p>
          </div>
        </section>

        {/* 2. HttpSessionListener */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-green-400">👥 HttpSessionListener</h2>
          <p className="mt-3 text-gray-300">
            Tracks session creation and destruction. Useful for counting active users, logging login/logout events, or releasing session‑specific resources.
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li><code>sessionCreated(HttpSessionEvent se)</code> – new session created.</li>
            <li><code>sessionDestroyed(HttpSessionEvent se)</code> – session invalidated or timed out.</li>
          </ul>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={HttpSessionListenerExample}
              title="ActiveSessionCounter.java – Count Online Users"
              highlightLines={[10, 11, 12, 15, 16, 17]}
            />
          </div>
        </section>

        {/* 3. ServletRequestListener */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-green-400">📨 ServletRequestListener</h2>
          <p className="mt-3 text-gray-300">
            Intercepts every request coming into the web application. Ideal for request logging, performance monitoring, or setting up request‑scoped resources.
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li><code>requestInitialized(ServletRequestEvent sre)</code> – before request is processed.</li>
            <li><code>requestDestroyed(ServletRequestEvent sre)</code> – after response is sent.</li>
          </ul>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={ServletRequestListenerExample}
              title="RequestLoggingListener.java – Log Request Timing"
              highlightLines={[8, 9, 10, 15]}
            />
          </div>
        </section>

        {/* 4. Attribute Listeners */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-green-400">🏷️ Attribute Listeners</h2>
          <p className="mt-3 text-gray-300">
            Listen for changes to attributes in three scopes: <strong>context</strong> (<code>ServletContextAttributeListener</code>), <strong>session</strong> (<code>HttpSessionAttributeListener</code>), and <strong>request</strong> (<code>ServletRequestAttributeListener</code>).
          </p>
          <p>Each provides three methods: <code>attributeAdded()</code>, <code>attributeRemoved()</code>, <code>attributeReplaced()</code>.</p>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={HttpSessionAttributeListenerExample}
              title="SessionAttributeTracker.java – Monitor Session Changes"
              highlightLines={[8, 9, 14, 19]}
            />
          </div>
        </section>

        {/* Registration: @WebListener vs web.xml */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-green-400">🔧 Registering Listeners</h2>
          <p className="mt-3 text-gray-300">
            Two ways: use <code>@WebListener</code> annotation (Servlet 3.0+) or declare in <code>web.xml</code>. Both are equivalent; annotation is simpler for most cases.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-mono text-green-400">// Annotated</p>
              <p className="text-gray-300"><code>{`@WebListener public class MyListener implements ServletContextListener { ... }`}</code></p>
            </div>
            <div>
              <p className="font-mono text-green-400">// web.xml</p>
              <JavaFileLoader
                fileModule={WebXmlListenerConfig}
                title="web.xml Listener Configuration"
                highlightLines={[3, 4, 5]}
              />
            </div>
          </div>
        </section>

        {/* One class, multiple listeners */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-green-400">🎭 Multiple Listeners in One Class</h2>
          <p className="mt-3 text-gray-300">
            A single class can implement several listener interfaces. The container will register it for all event types.
          </p>
          <JavaFileLoader
            fileModule={MultipleListenersExample}
            title="AllInOneListener.java – Multiple Interfaces"
            highlightLines={[5, 34, 39, 44]}
          />
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-green-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Forgetting to register the listener</strong> – either missing <code>@WebListener</code> or web.xml entry.</li>
            <li><strong>Doing heavy work in listeners</strong> – especially <code>requestInitialized()</code> or <code>sessionCreated()</code> – can slow down startup or each request.</li>
            <li><strong>Assuming order of listeners</strong> – listeners of the same type may be called in arbitrary order unless you use web.xml ordering.</li>
            <li><strong>Throwing exceptions in listeners</strong> – uncaught exceptions can prevent application startup (for context listener) or break request processing.</li>
            <li><strong>Using HttpSessionListener but storing reference to session attributes:</strong> Be careful with memory leaks – avoid storing session objects in static collections.</li>
            <li><strong>Not handling <code>sessionDestroyed</code> for cleanup:</strong> If you allocate resources per session, you must release them here.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-green-400">✅ Best Practices (Industry)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Use <code>ServletContextListener</code> for startup tasks</strong> – loading configuration, initialising database pools, starting background threads.</li>
            <li><strong>Always release resources in <code>contextDestroyed()</code></strong> – close DB pools, stop threads, etc.</li>
            <li><strong>Keep listener execution fast and exception‑free</strong> – wrap in try‑catch and log errors.</li>
            <li><strong>Monitor active sessions with <code>HttpSessionListener</code></strong> – provide real‑time user count via a context attribute.</li>
            <li><strong>Use <code>ServletRequestListener</code> for request‑scoped logging and performance metrics</strong> – record start/end times.</li>
            <li><strong>Avoid storing session references in static maps</strong> – can cause memory leaks if sessions are not removed properly.</li>
            <li><strong>Prefer <code>@WebListener</code> for simplicity</strong> – but use web.xml if you need explicit ordering or conditional registration.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-green-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Class implements correct listener interface",
              "✅ Add @WebListener or define in web.xml",
              "✅ Implement all required methods (even if empty)",
              "✅ Use ServletContextEvent to access context",
              "✅ Store application‑wide data in context init",
              "✅ Clean up resources in destroy methods",
              "✅ Track session counts with HttpSessionListener",
              "✅ Avoid long operations in request listener",
              "✅ Handle exceptions to prevent container failure",
              "✅ Test listener order if multiple listeners"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-green-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[9] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-green-500/30"
        >
          <h2 className="text-xl font-semibold text-green-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> Deploy a simple app with a <code>ServletContextListener</code> that prints a message. See when it appears in logs – at deployment, not on first request.</li>
            <li>⚙️ <strong>Try changing:</strong> Add a <code>HttpSessionListener</code> and implement a logout button that calls <code>session.invalidate()</code> – watch the listener fire.</li>
            <li>📂 <strong>Think about:</strong> Why is <code>ServletRequestListener</code> a better place for request logging than a Filter? (Hint: filters can be bypassed, listeners are always called).</li>
            <li>🧩 <strong>Debug:</strong> Your <code>sessionDestroyed</code> never fires – check if session timeout is set correctly and that you are actually invalidating sessions.</li>
          </ul>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="Servlet Listeners FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Listeners are often overlooked but extremely useful. Emphasise that they are the entry point for any initialisation (e.g., loading a configuration file, setting up database connections). In the classroom, show a step-by-step: create a listener that sets an application start timestamp in context. Then create another listener counting online users. Combine them to show how listeners communicate via context attributes. Also note that listeners are not affected by <code>web.xml</code> `metadata-complete` unless that flag ignores annotations – so be careful. A great advanced exercise: use <code>ServletContextListener</code> to start a background scheduler (e.g., Quartz) and shut it down properly." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 8: Listeners (ServletContextListener, HttpSessionListener, etc.) – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic8;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>