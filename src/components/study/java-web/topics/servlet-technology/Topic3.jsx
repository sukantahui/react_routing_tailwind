// Topic3.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import ServletConfigExample from "./topic3_files/ServletConfigExample.java?raw";
import ServletContextExample from "./topic3_files/ServletContextExample.java?raw";
import ConfigVsContextDemo from "./topic3_files/ConfigVsContextDemo.java?raw";
import CounterServlet from "./topic3_files/CounterServlet.java?raw";

// FAQ questions for this topic
import questions from "./topic3_files/topic3_questions";

const Topic3 = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            ServletConfig & ServletContext
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Two powerful objects that give your servlets configuration data and application-wide shared information.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
        >
          <h2 className="text-2xl font-semibold text-emerald-400 flex items-center gap-2">
            <span>🔧</span> What are ServletConfig and ServletContext?
          </h2>
          <p className="mt-3 text-gray-300">
            <strong>ServletConfig</strong> is an object created by the container for each servlet. It holds <strong>servlet‑specific</strong> initialization parameters (defined in <code>web.xml</code> or via <code>@WebServlet</code> annotations). It also gives the servlet access to the <code>ServletContext</code>.
          </p>
          <p className="mt-3 text-gray-300">
            <strong>ServletContext</strong> is a <strong>global</strong> object shared by all servlets in the same web application. It provides application‑wide parameters, server info, logging, and a way to share data among servlets (like a public bulletin board).
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-emerald-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world analogy:</strong> In Barrackpore High School, each teacher (servlet) gets a personal locker (<strong>ServletConfig</strong>) with their own class schedule. The school’s main notice board (<strong>ServletContext</strong>) contains announcements, holidays, and shared resources available to everyone.
            </p>
          </div>
        </section>

        {/* SVG Comparison Diagram */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">📊 ServletConfig vs ServletContext</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 700 260" className="w-full max-w-3xl h-auto">
              <rect x="30" y="30" width="280" height="180" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="170" y="60" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="16">ServletConfig</text>
              <circle cx="70" cy="100" r="18" fill="#2d3748" stroke="#10b981" strokeWidth="1.5" />
              <text x="70" y="105" textAnchor="middle" fill="#10b981" fontSize="12">ServA</text>
              <circle cx="170" cy="100" r="18" fill="#2d3748" stroke="#10b981" strokeWidth="1.5" />
              <text x="170" y="105" textAnchor="middle" fill="#10b981" fontSize="12">ServB</text>
              <circle cx="270" cy="100" r="18" fill="#2d3748" stroke="#10b981" strokeWidth="1.5" />
              <text x="270" y="105" textAnchor="middle" fill="#10b981" fontSize="12">ServC</text>
              <text x="170" y="150" textAnchor="middle" fill="#cbd5e1" fontSize="12">Each gets its own</text>
              <text x="170" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="12">separate Config object</text>
              <text x="170" y="190" textAnchor="middle" fill="#9ca3af" fontSize="11">→ private parameters</text>

              <rect x="390" y="30" width="280" height="180" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="530" y="60" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="16">ServletContext</text>
              <rect x="450" y="85" width="160" height="50" rx="8" fill="#2d3748" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="530" y="108" textAnchor="middle" fill="#fcd34d" fontSize="12">Single shared object</text>
              <text x="530" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="11">for whole app</text>
              <text x="530" y="165" textAnchor="middle" fill="#9ca3af" fontSize="11">→ global parameters,</text>
              <text x="530" y="182" textAnchor="middle" fill="#9ca3af" fontSize="11">→ shared attributes</text>

              <line x1="310" y1="120" x2="388" y2="120" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="5,5" />
              <text x="350" y="112" textAnchor="middle" fill="#9ca3af" fontSize="10">access</text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            ServletConfig = per‑servlet private configuration; ServletContext = application‑wide shared data.
          </p>
        </section>

        {/* ServletConfig in Depth */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">🎯 ServletConfig – Per‑Servlet Configuration</h2>
          <p className="mt-3 text-gray-300">
            The container creates a <code>ServletConfig</code> object after instantiating a servlet and passes it to the <code>init()</code> method. You can retrieve it using <code>getServletConfig()</code> inside the servlet.
          </p>
          <div className="mt-5">
            <h3 className="text-xl font-mono text-emerald-300">📌 Key Methods</h3>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li><code>String getInitParameter(String name)</code> – returns a servlet‑specific init parameter.</li>
              <li><code>Enumeration getInitParameterNames()</code> – all parameter names.</li>
              <li><code>ServletContext getServletContext()</code> – gives access to global context.</li>
              <li><code>String getServletName()</code> – returns the servlet’s logical name (from web.xml).</li>
            </ul>
          </div>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={ServletConfigExample}
              title="MyServlet.java – Using ServletConfig"
              highlightLines={[8, 9, 13, 14, 15]}
            />
          </div>
          <div className="mt-4 p-3 bg-emerald-950/30 border-l-4 border-emerald-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Tip:</strong> Define init parameters in <code>web.xml</code> (per servlet) or use <code>@WebServlet(urlPatterns="/demo", initParams = @WebInitParam(name="key", value="val"))</code>.
            </p>
          </div>
        </section>

        {/* ServletContext in Depth */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">🌍 ServletContext – Application‑Wide Shared Space</h2>
          <p className="mt-3 text-gray-300">
            One <code>ServletContext</code> per web application. Obtained via <code>getServletContext()</code> from a servlet or <code>getServletConfig().getServletContext()</code>. It lives as long as the application is loaded.
          </p>
          <div className="mt-5">
            <h3 className="text-xl font-mono text-emerald-300">📌 Key Methods</h3>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li><code>String getInitParameter(String name)</code> – global context params (from <code>&lt;context-param&gt;</code>).</li>
              <li><code>void setAttribute(String name, Object value)</code> – store shared object.</li>
              <li><code>Object getAttribute(String name)</code> – retrieve shared object.</li>
              <li><code>void removeAttribute(String name)</code> – remove attribute.</li>
              <li><code>String getRealPath(String virtualPath)</code> – maps virtual path to physical file path.</li>
              <li><code>void log(String message)</code> – write to container’s log file.</li>
            </ul>
          </div>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={ServletContextExample}
              title="GlobalParamsServlet.java – Using ServletContext"
              highlightLines={[10, 11, 12]}
            />
          </div>
        </section>

        {/* Real‑World Scenario: Shared Counter */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">📈 Real‑World Example: Web Application Hit Counter</h2>
          <p className="mt-3 text-gray-300">
            Use <code>ServletContext.setAttribute()</code> to maintain a global counter that survives across multiple servlets and sessions. Perfect for tracking school website visits (e.g., for Ichapur Public School).
          </p>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={CounterServlet}
              title="HitCounterServlet.java (Shared Counter)"
              highlightLines={[12, 15, 18]}
            />
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="font-mono text-sm">📢 <strong>Try this:</strong> Deploy the servlet, refresh the page – counter increments for every request, shared across all users.</p>
          </div>
        </section>

        {/* Differences Table */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">🔍 Key Differences at a Glance</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-800 text-emerald-300">
                <tr>
                  <th className="px-4 py-2">Feature</th>
                  <th className="px-4 py-2">ServletConfig</th>
                  <th className="px-4 py-2">ServletContext</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr><td className="px-4 py-2">Scope</td><td className="px-4 py-2">Per servlet</td><td className="px-4 py-2">Whole application</td></tr>
                <tr><td className="px-4 py-2">Number of objects</td><td className="px-4 py-2">One per servlet</td><td className="px-4 py-2">Exactly one</td></tr>
                <tr><td className="px-4 py-2">Lifecycle</td><td className="px-4 py-2">Servet init → destroy</td><td className="px-4 py-2">App start → shutdown</td></tr>
                <tr><td className="px-4 py-2">Configuration</td><td className="px-4 py-2"><code>&lt;init-param&gt;</code> or <code>@WebInitParam</code></td><td className="px-4 py-2"><code>&lt;context-param&gt;</code></td></tr>
                <tr><td className="px-4 py-2">Access via JSP</td><td className="px-4 py-2"><code>config.getInitParameter()</code></td><td className="px-4 py-2"><code>application.getAttribute()</code></td></tr>
                <tr><td className="px-4 py-2">Logging</td><td className="px-4 py-2">No direct logging</td><td className="px-4 py-2"><code>context.log()</code></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Confusing Config with Context:</strong> Using <code>servletConfig.getInitParameter()</code> to read <code>&lt;context-param&gt;</code> – it won't work (returns null).</li>
            <li><strong>Forgetting to define init‑params in web.xml:</strong> Missing <code>&lt;init-param&gt;</code> inside <code>&lt;servlet&gt;</code>.</li>
            <li><strong>Overwriting context attributes incorrectly:</strong> Multiple servlets using <code>setAttribute</code> with same name cause race conditions.</li>
            <li><strong>Null pointer on <code>getServletConfig()</code>:</strong> Accessed before <code>init()</code> or after <code>destroy()</code>.</li>
            <li><strong>Using <code>ServletContext</code> for session‑level data:</strong> That’s what <code>HttpSession</code> is for – context is for truly global data.</li>
            <li><strong>Not synchronizing shared mutable objects:</strong> If you store a counter in context, concurrent access needs synchronization or atomic types.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">✅ Best Practices (Industry)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Use ServletConfig for service‑specific settings</strong> – email templates, pagination size, etc.</li>
            <li><strong>Use ServletContext for application‑wide constants</strong> – database connection factory, global flags.</li>
            <li><strong>Never store large or mutable objects in context</strong> – memory leak and thread‑safety issues.</li>
            <li><strong>Prefer <code>context.log()</code> over <code>System.out.println()</code></strong> – integrates with container logs.</li>
            <li><strong>Use <code>@WebServlet</code> initParams for small projects</strong>, but web.xml is better for environment‑specific overrides.</li>
            <li><strong>Always synchronize context attributes that are counters or accumulators</strong> – use <code>AtomicInteger</code> if possible.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Understand per‑servlet vs application scope",
              "✅ Define init‑params correctly in web.xml or annotations",
              "✅ Access Config via getServletConfig()",
              "✅ Access Context via getServletContext()",
              "✅ Use context.setAttribute() for shared data",
              "✅ Use context.getInitParameter() for global params",
              "✅ Avoid race conditions on context attributes",
              "✅ Use context.log() for container logging",
              "✅ Never store request/session data in context",
              "✅ Prefer immutable objects as context attributes"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-emerald-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[9] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-emerald-500/30"
        >
          <h2 className="text-xl font-semibold text-emerald-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> What does <code>getServletContext().getContextPath()</code> return? Use it to build absolute URLs.</li>
            <li>⚙️ <strong>Try changing:</strong> Add a context param and an init param with the same name – which one returns when you call <code>getInitParameter()</code> from a servlet?</li>
            <li>📂 <strong>Think about:</strong> Why would you use <code>ServletContext</code> to cache a database lookup table? What are the risks?</li>
            <li>🧩 <strong>Debug:</strong> If <code>getInitParameter()</code> returns null, check if the param is defined at the correct scope (servlet vs context).</li>
          </ul>
        </section>

        {/* Code Example: Config vs Context side‑by‑side */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-emerald-400">💻 Config and Context Together</h2>
          <JavaFileLoader
            fileModule={ConfigVsContextDemo}
            title="DemoServlet.java – Using Both Config and Context"
            highlightLines={[18, 21, 29, 32]}
          />
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="ServletConfig & ServletContext FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Students often mix up Config and Context. Use the analogy of a teacher's personal notebook (Config) vs the school's notice board (Context). Emphasise that Config is dependency injection for servlets, and Context is the application's global memory. Show them how to use both by building a simple page hit counter – it clarifies scope perfectly. Remind them to avoid storing user‑specific data in Context, and always think about concurrency when updating shared attributes." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 3: ServletConfig & ServletContext – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic3;

/* Global keyframes – only transform, no opacity */
<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>