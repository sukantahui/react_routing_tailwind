// Topic2.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// XML example files (raw imports)
import webXmlBasic from "./topic2_files/web_basic.xml?raw";
import webXmlServletMapping from "./topic2_files/web_servlet_mapping.xml?raw";
import webXmlContextParams from "./topic2_files/web_context_params.xml?raw";
import webXmlErrorPages from "./topic2_files/web_error_pages.xml?raw";
import webXmlSecurity from "./topic2_files/web_security.xml?raw";

// FAQ questions for this topic
import questions from "./topic2_files/topic2_questions";

const Topic2 = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Optional: intersection observer for reveal animations (no opacity-0 used)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-slide-up");
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
        <header className="text-center space-y-4 animate-fade-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Deployment Descriptor (web.xml)
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The central configuration file that defines servlets, mappings, context parameters, and more.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
        >
          <h2 className="text-2xl font-semibold text-amber-400 flex items-center gap-2">
            <span>📄</span> What is web.xml?
          </h2>
          <p className="mt-3 text-gray-300">
            The deployment descriptor is an XML file (named <code className="bg-gray-800 px-1 rounded">web.xml</code>) that sits inside your web application’s <code className="bg-gray-800 px-1 rounded">WEB-INF/</code> folder. It tells the servlet container (like Tomcat, Jetty) how to configure and run your application – without changing a single line of Java code.
          </p>
          <p className="mt-3 text-gray-300">
            Think of it as the blueprint of a school: it defines each classroom (servlet), which teacher goes where (mapping), shared resources (context params), error handling rules, and security policies.
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-amber-500">
            <p className="text-sm italic text-gray-300">
              💡 <strong>Real-world example:</strong> In Barrackpore High School, Tuhina (admin) updates <code>web.xml</code> once to map <code>/students</code> to <code>StudentServlet</code>. No recompilation needed – container reloads configuration automatically.
            </p>
          </div>
        </section>

        {/* SVG lifecycle illustration */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold text-amber-400">✨ How web.xml guides the container</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 700 180" className="w-full max-w-3xl h-auto">
              <defs>
                <linearGradient id="arrow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              {/* Step boxes */}
              <rect x="10" y="20" width="130" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="75" y="50" textAnchor="middle" fill="#fcd34d" fontSize="12">Read web.xml</text>

              <rect x="190" y="20" width="130" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="255" y="40" textAnchor="middle" fill="#fcd34d" fontSize="11">Instantiate</text>
              <text x="255" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="11">Servlets</text>

              <rect x="370" y="20" width="130" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="435" y="40" textAnchor="middle" fill="#fcd34d" fontSize="11">Map URLs</text>
              <text x="435" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="11">→ Servlets</text>

              <rect x="550" y="20" width="130" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1s" repeatCount="indefinite" />
              </rect>
              <text x="615" y="40" textAnchor="middle" fill="#fcd34d" fontSize="11">Apply Filters</text>
              <text x="615" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="11">& Listeners</text>

              {/* Arrows */}
              <line x1="140" y1="45" x2="188" y2="45" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="320" y1="45" x2="368" y2="45" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="500" y1="45" x2="548" y2="45" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)" />

              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#f59e0b" />
                </marker>
              </defs>
              <text x="350" y="100" textAnchor="middle" fill="#9ca3af" fontSize="12" className="animate-pulse">
                Container startup → web.xml drives everything
              </text>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Step-by-step: Container reads web.xml → creates servlet instances → maps URLs → applies filters/listeners
          </p>
        </section>

        {/* Core Elements & Examples */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-amber-400">🧱 Core elements of web.xml</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-800/40 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300">
              <code className="text-amber-400">&lt;servlet&gt;</code>
              <p className="text-gray-300 text-sm mt-1">Defines a servlet class and its logical name.</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300">
              <code className="text-amber-400">&lt;servlet-mapping&gt;</code>
              <p className="text-gray-300 text-sm mt-1">Binds a servlet to a URL pattern.</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300">
              <code className="text-amber-400">&lt;context-param&gt;</code>
              <p className="text-gray-300 text-sm mt-1">Application-wide parameters (available to all servlets).</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300">
              <code className="text-amber-400">&lt;filter&gt; & &lt;filter-mapping&gt;</code>
              <p className="text-gray-300 text-sm mt-1">Intercept requests/responses globally.</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300">
              <code className="text-amber-400">&lt;error-page&gt;</code>
              <p className="text-gray-300 text-sm mt-1">Custom error pages for HTTP codes or exceptions.</p>
            </div>
            <div className="bg-gray-800/40 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300">
              <code className="text-amber-400">&lt;welcome-file-list&gt;</code>
              <p className="text-gray-300 text-sm mt-1">Default pages when a directory is requested.</p>
            </div>
          </div>
        </section>

        {/* Example: Basic web.xml */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-amber-400">📌 Basic web.xml</h2>
          <p className="mt-2 text-gray-300">A minimal <code>web.xml</code> that defines and maps a single servlet.</p>
          <div className="mt-4">
            <JavaFileLoader
              fileModule={webXmlBasic}
              title="WEB-INF/web.xml (minimal)"
              highlightLines={[3, 4, 5, 10]}
            />
          </div>
        </section>

        {/* Servlet Mapping in depth */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-amber-400">🔗 Servlet Mapping – URL to Java Class</h2>
          <p className="mt-2 text-gray-300">
            Without mapping, a servlet is unreachable. <code>&lt;servlet-mapping&gt;</code> tells the container exactly which URL triggers which servlet.
          </p>
          <div className="mt-4">
            <JavaFileLoader
              fileModule={webXmlServletMapping}
              title="WEB-INF/web.xml (with mappings)"
              highlightLines={[8, 9, 10, 17, 18, 19]}
            />
          </div>
          <div className="mt-4 p-3 bg-amber-950/30 border-l-4 border-amber-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Tip:</strong> Use exact URLs (<code>/login</code>) vs wildcards (<code>/admin/*</code>). Order matters – container picks the first match.
            </p>
          </div>
        </section>

        {/* Context Parameters */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-amber-400">🌐 Context Parameters – Shared Configuration</h2>
          <p className="mt-2 text-gray-300">
            <code>&lt;context-param&gt;</code> stores values like database URLs, API keys, or school names (e.g., "Shyamnagar Public School"). Any servlet or JSP can read them via <code>getServletContext().getInitParameter()</code>.
          </p>
          <div className="mt-4">
            <JavaFileLoader
              fileModule={webXmlContextParams}
              title="WEB-INF/web.xml (context params)"
              highlightLines={[3, 4, 5, 8, 9, 10]}
            />
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="font-mono text-sm">💻 <strong>Java access:</strong> <code>String schoolName = getServletContext().getInitParameter("schoolName");</code></p>
          </div>
        </section>

        {/* Error Pages */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-amber-400">⚠️ Custom Error Pages</h2>
          <p className="mt-2 text-gray-300">
            Professional apps never show raw stack traces. Define friendly error pages for HTTP codes (404, 500) or Java exceptions.
          </p>
          <div className="mt-4">
            <JavaFileLoader
              fileModule={webXmlErrorPages}
              title="WEB-INF/web.xml (error pages)"
              highlightLines={[3, 4, 5, 8, 9, 10]}
            />
          </div>
        </section>

        {/* Security & Constraints (brief) */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-amber-400">🔒 Security Constraints</h2>
          <p className="mt-2 text-gray-300">
            Protect admin areas with roles and HTTP methods. Note: modern servlet 3.0+ also supports annotations, but <code>web.xml</code> remains powerful for externalised security.
          </p>
          <div className="mt-4">
            <JavaFileLoader
              fileModule={webXmlSecurity}
              title="WEB-INF/web.xml (security)"
              highlightLines={[2, 3, 4, 9]}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-amber-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Wrong location:</strong> <code>web.xml</code> must be directly inside <code>WEB-INF/</code>, not in subfolders.</li>
            <li><strong>Missing root element:</strong> Forgetting <code>&lt;web-app&gt;</code> and the correct namespace (version mismatch).</li>
            <li><strong>Typos in servlet-class:</strong> Fully qualified class name missing (e.g., <code>com.example.LoginServlet</code>).</li>
            <li><strong>Duplicate mappings:</strong> Two mappings for exact same URL pattern cause undefined behaviour.</li>
            <li><strong>Context param name clash:</strong> Using same param name with different values – container picks first.</li>
            <li><strong>Forgetting to reload:</strong> After editing <code>web.xml</code>, redeploy or restart the container.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[9] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-amber-400">✅ Best Practices (Industry)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Use version-appropriate schema:</strong> For Servlet 4.0 use <code>web-app_4_0.xsd</code>.</li>
            <li><strong>Keep it organised:</strong> Comment sections, group servlets by module, order mappings logically.</li>
            <li><strong>Externalise environment-specific values:</strong> Use context-params or JNDI instead of hardcoding.</li>
            <li><strong>Avoid duplicate configurations:</strong> If you use annotations (<code>@WebServlet</code>), do not also define the same servlet in <code>web.xml</code>.</li>
            <li><strong>Define error pages globally:</strong> Never expose server internals to users.</li>
            <li><strong>Test with different containers:</strong> Tomcat, Jetty, and GlassFish may have subtle differences in web.xml parsing.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[10] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-amber-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ web.xml placed inside WEB-INF/",
              "✅ Root element <web-app> with correct schema",
              "✅ Each servlet has <servlet-name> and <servlet-class>",
              "✅ Each <servlet-mapping> uses same <servlet-name>",
              "✅ URL patterns are correct (no missing slashes)",
              "✅ Context params use <param-name>/<param-value>",
              "✅ Error pages defined for 404, 500, and custom exceptions",
              "✅ Filters ordered intentionally",
              "✅ No conflicting annotations + web.xml entries"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-amber-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[11] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-amber-500/30"
        >
          <h2 className="text-xl font-semibold text-amber-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> What happens if you map two servlets to the same URL pattern? Try it yourself.</li>
            <li>⚙️ <strong>Try changing:</strong> The order of <code>&lt;servlet-mapping&gt;</code> entries – the container uses the first match.</li>
            <li>📂 <strong>Think about:</strong> Why are context parameters better than hardcoding database credentials inside a servlet?</li>
            <li>🧩 <strong>Refactor:</strong> How would you split a large web.xml into multiple files? (Hint: XML entities or Servlet 3.0 web-fragment.xml).</li>
          </ul>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="Deployment Descriptor (web.xml) FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="web.xml is your application's 'remote control' – once you master it, you can change behaviour without touching Java code. Emphasise to students: URL mapping is like a phone directory; context params are like school-wide announcements; and error pages are the 'kind notice' when something goes wrong. Always start with a minimal web.xml, then gradually add complexity." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 2: Deployment Descriptor (web.xml) – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic2;

/* Add global keyframes for fade+slide-up without opacity-0 */
<style jsx>{`
  @keyframes fadeSlideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .animate-fade-slide-up {
    animation: fadeSlideUp 0.6s ease-out forwards;
  }
`}</style>