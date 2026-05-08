// Topic7.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import WebServletExample from "./topic7_files/WebServletExample.java?raw";
import WebFilterExample from "./topic7_files/WebFilterExample.java?raw";
import WebListenerExample from "./topic7_files/WebListenerExample.java?raw";
import InitParamsExample from "./topic7_files/InitParamsExample.java?raw";
import EquivalentWebXml from "./topic7_files/equivalent_web.xml?raw";
import AsyncSupportedExample from "./topic7_files/AsyncSupportedServlet.java?raw";

// FAQ questions for this topic
import questions from "./topic7_files/topic7_questions";

const Topic7 = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Servlet Annotations
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            <code>@WebServlet</code>, <code>@WebFilter</code>, <code>@WebListener</code> – eliminating <code>web.xml</code> for modern Servlet 3.0+ applications.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
        >
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center gap-2">
            <span>🏷️</span> What are Servlet Annotations?
          </h2>
          <p className="mt-3 text-gray-300">
            Starting from Servlet 3.0 (part of Java EE 6), the specification introduced annotations to reduce (or eliminate) the need for the <code>web.xml</code> deployment descriptor. Annotations provide metadata directly in the Java source, making configuration <strong>co-located with the code</strong> and improving developer productivity.
          </p>
          <p className="mt-3 text-gray-300">
            Three main annotations: <code>@WebServlet</code> defines a servlet and its URL mapping(s); <code>@WebFilter</code> declares a filter and its interception patterns; <code>@WebListener</code> registers a listener for context, session, or request events.
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-cyan-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world context:</strong> Shyamnagar Public School’s new DevOps team wants to move away from complex XML. They use <code>@WebServlet("/grades")</code> on <code>GradeServlet</code>, <code>@WebFilter("/api/*")</code> for API logging, and <code>@WebListener</code> to count active sessions – all without touching <code>web.xml</code>.
            </p>
          </div>
        </section>

        {/* SVG: Annotation vs web.xml */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-cyan-400">🔍 Annotation vs XML Configuration</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            <svg viewBox="0 0 300 180" className="w-72 h-auto">
              <rect x="10" y="10" width="280" height="160" rx="10" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="150" y="35" textAnchor="middle" fill="#67e8f9" fontWeight="bold" fontSize="14">✔ Annotations</text>
              <text x="150" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="12">Code + config together</text>
              <text x="150" y="80" textAnchor="middle" fill="#9ca3af" fontSize="11">@WebServlet("/login")</text>
              <text x="150" y="100" textAnchor="middle" fill="#9ca3af" fontSize="11">No external file needed</text>
              <text x="150" y="120" textAnchor="middle" fill="#34d399" fontSize="11">➕ Faster development</text>
              <text x="150" y="140" textAnchor="middle" fill="#f87171" fontSize="11">➖ Harder to override</text>
            </svg>
            <svg viewBox="0 0 300 180" className="w-72 h-auto">
              <rect x="10" y="10" width="280" height="160" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="150" y="35" textAnchor="middle" fill="#fcd34d" fontWeight="bold" fontSize="14">📄 web.xml</text>
              <text x="150" y="60" textAnchor="middle" fill="#cbd5e1" fontSize="12">Centralised configuration</text>
              <text x="150" y="80" textAnchor="middle" fill="#9ca3af" fontSize="11">&lt;servlet&gt;...&lt;/servlet&gt;</text>
              <text x="150" y="100" textAnchor="middle" fill="#9ca3af" fontSize="11">Changes without recompile</text>
              <text x="150" y="120" textAnchor="middle" fill="#34d399" fontSize="11">➕ External overrides</text>
              <text x="150" y="140" textAnchor="middle" fill="#f87171" fontSize="11">➖ Verbose, separate file</text>
            </svg>
          </div>
        </section>

        {/* 1. @WebServlet */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-cyan-400">🌐 @WebServlet</h2>
          <p className="mt-3 text-gray-300">
            Marks a class as a servlet and provides URL mapping(s) and initialisation parameters. Attributes include:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li><code>value</code> or <code>urlPatterns</code> – one or more URL patterns (e.g., <code>"/login"</code>, <code>{"/user/*", "/admin/*"}</code>).</li>
            <li><code>name</code> – servlet name (optional, defaults to class name).</li>
            <li><code>initParams</code> – array of <code>@WebInitParam</code> for servlet‑specific init parameters.</li>
            <li><code>loadOnStartup</code> – integer priority for eager loading (positive values).</li>
            <li><code>asyncSupported</code> – boolean to enable asynchronous processing (default false).</li>
            <li><code>description</code> – textual description.</li>
          </ul>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={WebServletExample}
              title="UserServlet.java – @WebServlet Example"
              highlightLines={[5, 6, 7, 8]}
            />
          </div>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={InitParamsExample}
              title="ConfigurableServlet.java – With Init Params"
              highlightLines={[5, 6, 7]}
            />
          </div>
        </section>

        {/* 2. @WebFilter */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-cyan-400">🚦 @WebFilter</h2>
          <p className="mt-3 text-gray-300">
            Declares a filter. Attributes mirror those of <code>@WebServlet</code> but with filter‑specific ones:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li><code>filterName</code> – logical name of the filter.</li>
            <li><code>urlPatterns</code> or <code>value</code> – patterns to intercept.</li>
            <li><code>servletNames</code> – apply filter to specific servlet names.</li>
            <li><code>dispatcherTypes</code> – <code>DispatcherType</code> array (REQUEST, FORWARD, INCLUDE, ERROR, ASYNC).</li>
            <li><code>initParams</code> – filter init parameters.</li>
            <li><code>asyncSupported</code> – whether filter supports async.</li>
          </ul>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={WebFilterExample}
              title="AuthFilter.java – @WebFilter Example"
              highlightLines={[5, 6, 7]}
            />
          </div>
        </section>

        {/* 3. @WebListener */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-cyan-400">👂 @WebListener</h2>
          <p className="mt-3 text-gray-300">
            Annotates a class that implements one or more listener interfaces (<code>ServletContextListener</code>, <code>HttpSessionListener</code>, <code>ServletRequestListener</code>, etc.). The container automatically registers it without any XML entry.
          </p>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={WebListenerExample}
              title="AppListener.java – @WebListener Example"
              highlightLines={[5, 6, 7, 8]}
            />
          </div>
          <div className="mt-4 p-3 bg-cyan-950/30 border-l-4 border-cyan-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Tip:</strong> Multiple listener interfaces can be implemented in one class – the container will register all of them automatically.
            </p>
          </div>
        </section>

        {/* When to use annotations vs web.xml */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-cyan-400">📌 Annotations vs web.xml – Which to Choose?</h2>
          <p className="mt-3 text-gray-300">
            Annotations are great for development and when you want self‑contained components. However, externalising configuration in <code>web.xml</code> allows you to modify mappings without recompiling – useful in production environments where different deployments may need different URL patterns or init parameters.
          </p>
          <p className="mt-3 text-gray-300">
            You can <strong>mix both</strong>. If a servlet is both annotated and declared in <code>web.xml</code>, the web.xml settings override the annotation. Also, you can set <code>metadata-complete="true"</code> in <code>web.xml</code> to ignore annotations entirely (useful for portability).
          </p>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={EquivalentWebXml}
              title="equivalent_web.xml – Overriding Annotation"
              highlightLines={[2, 3, 4, 8, 9, 10]}
            />
          </div>
        </section>

        {/* Advanced: asyncSupported */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-cyan-400">⚡ Async Support with Annotations</h2>
          <p className="mt-3 text-gray-300">
            Use <code>asyncSupported = true</code> in <code>@WebServlet</code> or <code>@WebFilter</code> to enable asynchronous request processing, allowing the container thread to return while the request continues in a separate thread.
          </p>
          <JavaFileLoader
            fileModule={AsyncSupportedExample}
            title="AsyncServlet.java – Async Supported"
            highlightLines={[5, 6, 13]}
          />
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-cyan-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Wrong annotation retention:</strong> Servlet annotations are runtime‑visible – but mixing with older Java versions? Works only on Servlet 3.0+ containers.</li>
            <li><strong>Forgetting <code>@WebServlet</code> on class:</strong> The servlet won't be registered – you'll get 404.</li>
            <li><strong>Conflicting mappings:</strong> If you have the same URL pattern in both annotation and <code>web.xml</code>, the container may deploy twice or cause errors (depends on container).</li>
            <li><strong>Using <code>@WebFilter</code> without implementing <code>Filter</code>:</strong> The class must implement <code>javax.servlet.Filter</code>.</li>
            <li><strong>Assuming ordering:</strong> Annotated filters have no guaranteed order unless you use <code>web.xml</code> or <code>@WebFilter</code> with <code>filterName</code> and absolute ordering in XML.</li>
            <li><strong>Not setting <code>asyncSupported</code> when using <code>AsyncContext</code>:</strong> Results in <code>IllegalStateException</code>.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-cyan-400">✅ Best Practices (Industry)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Prefer annotations for new development</strong> – faster, less XML boilerplate.</li>
            <li><strong>Use <code>web.xml</code> for environment-specific overrides</strong> – e.g., different URL paths for staging vs production.</li>
            <li><strong>Always specify <code>loadOnStartup</code> for critical servlets</strong> – ensures they are initialised early.</li>
            <li><strong>Group related servlets with meaningful names in <code>@WebServlet(name=...)</code></strong> – helps debugging and logging.</li>
            <li><strong>Avoid using both annotations and <code>web.xml</code> for the same component</strong> unless you need overriding.</li>
            <li><strong>Set <code>asyncSupported = true</code> only when needed</strong> – adds complexity and thread management overhead.</li>
            <li><strong>Use <code>@WebInitParam</code> for simple configuration</strong> – but keep sensitive data out of code (use context params or JNDI).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-cyan-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Add @WebServlet to servlet class with urlPatterns",
              "✅ Add @WebFilter to filter class with appropriate patterns",
              "✅ Add @WebListener to listener class",
              "✅ Use @WebInitParam for init parameters",
              "✅ Set loadOnStartup when needed",
              "✅ Ensure container version is >= 3.0",
              "✅ Decide between annotation and web.xml per component",
              "✅ Test URL mappings after deployment",
              "✅ Use asyncSupported only if implementing async",
              "✅ Remember order of filters – use web.xml if strict ordering required"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-cyan-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-cyan-500/30"
        >
          <h2 className="text-xl font-semibold text-cyan-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> Deploy the same servlet with and without <code>web.xml</code> – watch the startup logs to see registration messages.</li>
            <li>⚙️ <strong>Try changing:</strong> Add multiple URL patterns to <code>@WebServlet</code> – e.g., <code>{"/student", "/student/*"}</code> – see how the container dispatches.</li>
            <li>📂 <strong>Think about:</strong> Why would a large enterprise still prefer <code>web.xml</code> despite annotations? (Hint: Configuration management and reusability)</li>
            <li>🧩 <strong>Debug:</strong> Your <code>@WebFilter</code> is not working. Check if the class is in the right package and WEB-INF/classes is correctly packaged.</li>
          </ul>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="Servlet Annotations FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Annotations are a huge leap from the verbose XML days. Show students how much boilerplate disappears: a typical web.xml with one servlet takes ~15 lines, while @WebServlet takes 1 line. But also warn them: annotations couple configuration to code, making it harder to change mappings without recompilation. In industry, many projects still use a hybrid approach: annotate servlets but keep security constraints, error pages, and environment‑specific parameters in web.xml. A great class exercise: convert a legacy web.xml to annotations and compare the two versions. Also point out that for large applications, annotations can become scattered – a well‑maintained web.xml can act as a central registry." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 7: Servlet Annotations (@WebServlet, @WebFilter, @WebListener) – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic7;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>