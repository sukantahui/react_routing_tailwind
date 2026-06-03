// Topic5.jsx
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java example files (raw imports)
import LoggingFilterExample from "./topic5_files/LoggingFilter.java?raw";
import AuthenticationFilterExample from "./topic5_files/AuthenticationFilter.java?raw";
import FilterMappingWebXml from "./topic5_files/web_filter_mapping.xml?raw";
import FilterAnnotationExample from "./topic5_files/FilterAnnotationDemo.java?raw";
import ChainedFiltersExample from "./topic5_files/ChainedFiltersDemo.java?raw";

// FAQ questions for this topic
import questions from "./topic5_files/topic5_questions";

const Topic5 = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Filters
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Intercept, pre‑process, and post‑process HTTP requests and responses – cleanly separating cross‑cutting concerns.
          </p>
        </header>

        {/* What & Why */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
        >
          <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2">
            <span>🔄</span> What is a Filter?
          </h2>
          <p className="mt-3 text-gray-300">
            A filter is a Java component that intercepts requests <strong>before</strong> they reach a servlet (or JSP) and can also intercept responses <strong>after</strong> the servlet processes them. Filters are ideal for cross‑cutting concerns: logging, authentication, compression, character encoding, and request wrapping.
          </p>
          <p className="mt-3 text-gray-300">
            Filters are configured in <code>web.xml</code> or via the <code>@WebFilter</code> annotation. Multiple filters can be chained in a defined order.
          </p>
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border-l-4 border-purple-500">
            <p className="text-sm italic text-gray-300">
              📘 <strong>Real‑world analogy:</strong> At Ichapur Public School, before students (requests) enter the exam hall (servlet), they pass through a security check (filter). After the exam, their answer sheets (response) pass through a scanning process (another filter). Filters are reusable and applied to many servlets.
            </p>
          </div>
        </section>

        {/* SVG Filter Chain Illustration */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">⛓️ Filter Chain Processing</h2>
          <div className="mt-6 flex justify-center">
            <svg viewBox="0 0 800 160" className="w-full max-w-4xl h-auto">
              <rect x="10" y="30" width="100" height="50" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
              <text x="60" y="55" textAnchor="middle" fill="#d8b4fe" fontSize="12">Client</text>
              <text x="60" y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">Request</text>

              <rect x="160" y="30" width="110" height="50" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </rect>
              <text x="215" y="50" textAnchor="middle" fill="#e9d5ff" fontSize="12">Filter 1</text>
              <text x="215" y="65" textAnchor="middle" fill="#9ca3af" fontSize="10">Auth / Log</text>

              <rect x="320" y="30" width="110" height="50" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.3s" repeatCount="indefinite" />
              </rect>
              <text x="375" y="50" textAnchor="middle" fill="#e9d5ff" fontSize="12">Filter 2</text>
              <text x="375" y="65" textAnchor="middle" fill="#9ca3af" fontSize="10">Encoding</text>

              <rect x="480" y="30" width="110" height="50" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.6s" repeatCount="indefinite" />
              </rect>
              <text x="535" y="50" textAnchor="middle" fill="#e9d5ff" fontSize="12">Filter 3</text>
              <text x="535" y="65" textAnchor="middle" fill="#9ca3af" fontSize="10">Compress</text>

              <rect x="640" y="30" width="110" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
              <text x="695" y="55" textAnchor="middle" fill="#6ee7b7" fontSize="12">Servlet</text>
              <text x="695" y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">Business logic</text>

              {/* Arrows */}
              <line x1="110" y1="55" x2="158" y2="55" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowF)" />
              <line x1="270" y1="55" x2="318" y2="55" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowF)" />
              <line x1="430" y1="55" x2="478" y2="55" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowF)" />
              <line x1="590" y1="55" x2="638" y2="55" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowF)" />

              <defs>
                <marker id="arrowF" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#a855f7" />
                </marker>
              </defs>

              {/*<!-- Return arrows (response) -->*/}
              <path d="M695 90 L640 90 L590 90 L480 90 L430 90 L320 90 L270 90 L160 90 L110 90" 
                    fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrowRet)" />
              <text x="350" y="110" textAnchor="middle" fill="#fcd34d" fontSize="10">Response flows back through filters in reverse order</text>
              <defs>
                <marker id="arrowRet" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            Filters execute sequentially; after the servlet finishes, the response goes back through the filters in reverse order.
          </p>
        </section>

        {/* Filter API & Lifecycle */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">⚙️ Filter API & Lifecycle</h2>
          <p className="mt-3 text-gray-300">
            A filter must implement the <code>javax.servlet.Filter</code> interface with three methods:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
            <li><code>void init(FilterConfig filterConfig)</code> – called once when the filter is loaded (initialisation).</li>
            <li><code>void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)</code> – core logic; call <code>chain.doFilter()</code> to pass to next filter/servlet.</li>
            <li><code>void destroy()</code> – called before removal.</li>
          </ul>
          <div className="mt-5">
            <JavaFileLoader
              fileModule={LoggingFilterExample}
              title="LoggingFilter.java – Basic Filter Implementation"
              highlightLines={[10, 12, 13, 18]}
            />
          </div>
        </section>

        {/* Configuring Filters: web.xml vs Annotation */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">📌 Configuring Filters</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-mono text-purple-300">1. Using web.xml</h3>
              <p className="text-gray-300">Define filter and filter-mapping elements.</p>
              <div className="mt-2">
                <JavaFileLoader
                  fileModule={FilterMappingWebXml}
                  title="WEB-INF/web.xml (Filter Mapping)"
                  highlightLines={[2, 3, 8, 9, 10]}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-mono text-purple-300">2. Using @WebFilter Annotation (Servlet 3.0+)</h3>
              <p className="text-gray-300">Simpler, no XML needed.</p>
              <div className="mt-2">
                <JavaFileLoader
                  fileModule={FilterAnnotationExample}
                  title="AnnotationFilter.java – @WebFilter Example"
                  highlightLines={[5, 6, 7]}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-purple-950/30 border-l-4 border-purple-500 rounded">
            <p className="text-sm text-gray-200">
              💡 <strong>Tip:</strong> For URL patterns, use <code>urlPatterns</code> attribute (e.g., <code>@WebFilter("/*")</code>). You can also specify servlet names via <code>servletNames</code>.
            </p>
          </div>
        </section>

        {/* Real-world Examples */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">🔐 Real-world Filter Examples</h2>
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-xl text-purple-300">Authentication Filter</h3>
              <p className="text-gray-300">Check if user is logged in; otherwise redirect to login page.</p>
              <JavaFileLoader
                fileModule={AuthenticationFilterExample}
                title="AuthenticationFilter.java"
                highlightLines={[12, 13, 14, 18]}
              />
            </div>
            <div>
              <h3 className="text-xl text-purple-300">Chaining Multiple Filters</h3>
              <p className="text-gray-300">Order matters. Logging → Auth → Compression.</p>
              <JavaFileLoader
                fileModule={ChainedFiltersExample}
                title="ChainedFiltersDemo.java (Conceptual)"
                highlightLines={[8, 9, 10]}
              />
            </div>
          </div>
        </section>

        {/* FilterConfig and Initial Parameters */}
        <section
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">📦 FilterConfig – Getting Init Parameters</h2>
          <p className="mt-3 text-gray-300">
            Similar to ServletConfig, <code>FilterConfig</code> provides <code>getInitParameter()</code> to read filter-specific parameters defined in <code>web.xml</code> or via <code>@WebFilter(initParams = ...)</code>.
          </p>
          <div className="mt-3 p-3 bg-gray-800 rounded-lg">
            <p className="font-mono text-sm">// In web.xml: &lt;init-param&gt;&lt;param-name&gt;excludePages&lt;/param-name&gt;&lt;param-value&gt;/login,/register&lt;/param-value&gt;&lt;/init-param&gt;<br/>// In filter: String exclude = filterConfig.getInitParameter("excludePages");</p>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">⚠️ Common Pitfalls (Beginners)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Forgetting <code>chain.doFilter()</code>:</strong> Without calling it, the request won't proceed – stuck filter.</li>
            <li><strong>Modifying response after committing:</strong> Once response is committed, adding headers or changing status fails.</li>
            <li><strong>Incorrect order of filters:</strong> Authentication should come before logging sensitive data, etc.</li>
            <li><strong>Not handling exceptions in <code>doFilter()</code>:</strong> Uncaught exceptions break the chain – wrap in try/catch and log appropriately.</li>
            <li><strong>Using <code>HttpServletRequest</code>/<code>HttpServletResponse</code> casting without checking:</strong> Filters can be applied to non-HTTP requests (e.g., JSP includes). Safe cast: <code>if (request instanceof HttpServletRequest)</code>.</li>
            <li><strong>Performance issues:</strong> Heavy operations in a filter (e.g., DB calls) for every request degrade performance.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">✅ Best Practices (Industry)</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-300 mt-3">
            <li><strong>Keep filters lightweight and fast</strong> – cache initialised data, avoid I/O per request.</li>
            <li><strong>Use filter for cross‑cutting concerns only</strong> – logging, security, encoding, compression, caching.</li>
            <li><strong>Define order explicitly</strong> – use <code>&lt;filter-mapping&gt;</code> order in web.xml or <code>@WebFilter</code> with <code>filterName</code> and ordering rules (Servlet 3.0+).</li>
            <li><strong>Provide init parameters for configuration</strong> – e.g., exclude paths, log level.</li>
            <li><strong>Always call <code>chain.doFilter()</code> inside a try‑finally</strong> to ensure cleanup (e.g., timing).</li>
            <li><strong>Use <code>HttpServletResponseWrapper</code> to modify response content</strong> (advanced use: add headers, compress).</li>
            <li><strong>Register filters for specific URL patterns, not <code>/*</code> unnecessarily</strong> – reduces overhead.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-semibold text-purple-400">📋 Mini Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              "✅ Implement Filter interface with init, doFilter, destroy",
              "✅ Call chain.doFilter() to proceed",
              "✅ Define filter mapping (web.xml or @WebFilter)",
              "✅ Understand filter lifecycle (init once per app)",
              "✅ Use FilterConfig to read init parameters",
              "✅ Order filters logically (auth before logging)",
              "✅ Test with different URL patterns (/*, *.do, /admin/*)",
              "✅ Avoid heavy operations inside doFilter",
              "✅ Handle exceptions inside doFilter",
              "✅ Use response wrappers for advanced modifications"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                <span className="text-purple-400">✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        {/* Hint Section */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          className="bg-gray-900/50 rounded-2xl p-6 border border-purple-500/30"
        >
          <h2 className="text-xl font-semibold text-purple-400">🧠 Hints – Think Like a Pro</h2>
          <ul className="space-y-2 text-gray-300 italic">
            <li>🔍 <strong>Observe carefully:</strong> Add a logging filter to your app – see console output for every request. Notice the order if you add two filters.</li>
            <li>⚙️ <strong>Try changing:</strong> Swap filter mappings order in web.xml – how does the output change?</li>
            <li>📂 <strong>Think about:</strong> Why does <code>chain.doFilter()</code> need to be called exactly once? What happens if you call it twice?</li>
            <li>🧩 <strong>Debug:</strong> A filter is not executing – check mapping URL pattern, annotation presence, and application deployment (ensure classes compiled).</li>
          </ul>
        </section>

        {/* Additional Resource: Filter ordering in Servlet 3.0+ */}
        <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold text-purple-400">📚 Filter Ordering (Servlet 3.0+)</h2>
          <p className="text-gray-300">
            When using annotations, order is not guaranteed. Use <code>web.xml</code> for explicit ordering, or add <code>&lt;absolute-ordering&gt;</code> element. Alternatively, use <code>@WebFilter</code> with <code>filterName</code> and <code>@ServletFilter</code> (JSR 375) for security filters.
          </p>
        </section>

        {/* FAQ Component */}
        <FAQTemplate title="Servlet Filters FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Filters are one of the most powerful yet underused features in servlets. Students often underestimate their importance. Show them real examples: request logging, authentication, setting character encoding (UTF-8 for all responses), and caching headers. Emphasise that filters are not business logic – they are infrastructure. A common exercise: build a filter that measures request processing time and logs slow requests. Remind them to always call chain.doFilter() and to be careful with response commits. Also, encourage using annotations for quick prototyping, but web.xml for enterprise apps where ordering matters." />
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          Topic 5: Filters – Part of Servlet Mastery Series
        </footer>
      </div>
    </div>
  );
};

export default Topic5;

<style jsx>{`
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`}</style>