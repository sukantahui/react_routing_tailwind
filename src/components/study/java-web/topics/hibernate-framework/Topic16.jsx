import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import Java / properties file content using ?raw (Vite syntax)
import hibernateC3p0Props from "./topic16_files/hibernate-c3p0.properties?raw";
import hibernateHikariProps from "./topic16_files/hibernate-hikari.properties?raw";
import customDataSourceJava from "./topic16_files/CustomDataSource.java?raw";
import connectionPoolMonitorJava from "./topic16_files/ConnectionPoolMonitor.java?raw";

// Import FAQ questions (30 items, moderate to expert)
import questions from "./topic16_files/topic16_questions";

// Keyframes for animations
const animationStyles = `
  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-slide-up {
    animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
  }
  @keyframes softGlow {
    0% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
    50% { box-shadow: 0 0 0 6px rgba(59,130,246,0.2); }
    100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
  }
  .animate-soft-glow {
    animation: softGlow 1.2s ease-in-out 2;
  }
`;

const Topic16 = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      <style>{animationStyles}</style>

      {/* Header Section */}
      <div className="animate-fade-slide-up text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
          Connection Pooling with Hibernate (c3p0, HikariCP)
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Master connection pooling to dramatically improve application performance and reliability. 
          Learn how to configure c3p0 (legacy) and HikariCP (modern, ultra-fast) with Hibernate, 
          tune pool sizes, and avoid resource exhaustion.
        </p>
      </div>

      {/* 1. Conceptual explanation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Why Connection Pooling?</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Creating a database connection is expensive – it involves network handshakes, authentication, and memory allocation. 
            <strong>Connection pooling</strong> reuses a set of pre-established connections, drastically reducing latency and server load.
            Hibernate can delegate connection management to a pool (c3p0, HikariCP, etc.) instead of opening/closing per operation.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 dark:bg-red-950/40 p-4 rounded-xl border-l-4 border-red-400">
              <p className="font-semibold text-red-800 dark:text-red-200">❌ Without Pooling</p>
              <p className="text-sm">Each request: open connection → execute SQL → close connection (slow, overhead).</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl border-l-4 border-green-400">
              <p className="font-semibold text-green-800 dark:text-green-200">✅ With Pooling</p>
              <p className="text-sm">Connections pre-created, borrowed, returned – minimal overhead, high throughput.</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border-l-4 border-blue-400">
            <p className="text-sm italic text-blue-800 dark:text-blue-200">
              💡 <strong>Real-world scenario:</strong> At Barrackpore High School's exam portal, without pooling, 100 students logging in simultaneously would create 100 separate connections, overwhelming the DB. With HikariCP, only 10 connections are reused, handling all requests smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* 2. HikariCP (Modern, Recommended) */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4">
          HikariCP: The Gold Standard
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong>HikariCP</strong> is the fastest and most reliable connection pool for Java. Spring Boot uses it by default. 
          It offers excellent performance, microsecond timeout resolution, and robust leak detection.
        </p>
        <JavaFileLoader
          fileModule={hibernateHikariProps}
          title="hibernate.properties (HikariCP Configuration)"
          highlightLines={[8, 12, 16, 20]}
        />
        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <div className="bg-white dark:bg-gray-800/60 p-4 rounded-xl">
            <h4 className="font-bold">Key HikariCP parameters</h4>
            <ul className="text-sm space-y-1 mt-2 text-gray-700 dark:text-gray-300">
              <li><code>maximumPoolSize</code> – max connections (default 10)</li>
              <li><code>minimumIdle</code> – idle connections kept (default = maximumPoolSize)</li>
              <li><code>connectionTimeout</code> – max wait for a connection (ms, default 30000)</li>
              <li><code>idleTimeout</code> – idle connection survival (ms, default 600000)</li>
              <li><code>leakDetectionThreshold</code> – log long-running connections (e.g., 2000)</li>
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-xl">
            <p className="font-bold">✅ Recommended for production</p>
            <p className="text-sm mt-1">Use HikariCP in all new projects. Add dependency: <code>com.zaxxer:HikariCP</code></p>
          </div>
        </div>
      </section>

      {/* 3. c3p0 (Legacy, but still used) */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-amber-500 pl-4">
          c3p0: The Traditional Choice
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong>c3p0</strong> was the standard before HikariCP. It's still used in legacy applications. 
          It offers features like automatic prepared statement caching and connection testing.
        </p>
        <JavaFileLoader
          fileModule={hibernateC3p0Props}
          title="hibernate.properties (c3p0 Configuration)"
          highlightLines={[8, 12, 16]}
        />
        <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm font-mono text-yellow-800 dark:text-yellow-300">
            ⚠️ <strong>Note:</strong> c3p0 is slower and has known connection leak issues. Consider migrating to HikariCP if possible.
          </p>
        </div>
      </section>

      {/* 4. Custom DataSource Integration */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4">
          Integrating External DataSources
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          You can provide Hibernate with a custom <code>DataSource</code> (e.g., from application server JNDI or manually constructed).
          This gives you full control over pooling configuration.
        </p>
        <JavaFileLoader
          fileModule={customDataSourceJava}
          title="CustomDataSource.java (Manually configure HikariCP and pass to Hibernate)"
          highlightLines={[10, 18, 28]}
        />
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm italic text-indigo-800 dark:text-indigo-200">
            💡 This pattern is common in Java EE / Spring when you need a pre-configured DataSource from JNDI or a connection pool defined in your application server.
          </p>
        </div>
      </section>

      {/* 5. Monitoring Pool Health */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4">
          Monitoring & Tuning Connection Pools
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Production pools require monitoring: active connections, idle count, wait times, and leaks. 
          HikariCP provides JMX metrics; you can also write simple monitoring code.
        </p>
        <JavaFileLoader
          fileModule={connectionPoolMonitorJava}
          title="ConnectionPoolMonitor.java (Example using HikariCP MXBean)"
          highlightLines={[12, 18, 25]}
        />
        <div className="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
            🔍 <strong>Pro tip:</strong> Enable <code>hibernate.hikari.registerMbeans</code> to expose metrics via JMX. 
            Then use JConsole or Micrometer to track pool usage in real time.
          </p>
        </div>
      </section>

      {/* 6. SVG: Connection Pool Flow */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4">
          🔄 How Connection Pooling Works
        </h2>
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
          <svg viewBox="0 0 900 300" className="w-full h-auto" aria-label="Connection pool flow">
            {/* Application thread */}
            <rect x="30" y="60" width="160" height="60" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
            <text x="110" y="90" textAnchor="middle" className="text-sm font-semibold fill-blue-800 dark:fill-blue-300">Application</text>
            <text x="110" y="110" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Thread requests connection</text>

            <line x1="190" y1="90" x2="240" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Connection pool */}
            <rect x="250" y="40" width="200" height="100" rx="12" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
            <text x="350" y="65" textAnchor="middle" className="text-sm font-bold fill-green-800 dark:fill-green-300">Connection Pool</text>
            <text x="350" y="85" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">(HikariCP / c3p0)</text>
            {/* Pool slots */}
            <rect x="270" y="100" width="40" height="20" rx="4" fill="#34d399" />
            <text x="290" y="114" textAnchor="middle" className="text-xs fill-white">1</text>
            <rect x="320" y="100" width="40" height="20" rx="4" fill="#34d399" />
            <text x="340" y="114" textAnchor="middle" className="text-xs fill-white">2</text>
            <rect x="370" y="100" width="40" height="20" rx="4" fill="#fbbf24" />
            <text x="390" y="114" textAnchor="middle" className="text-xs fill-white">3 (active)</text>
            <rect x="420" y="100" width="40" height="20" rx="4" fill="#34d399" />
            <text x="440" y="114" textAnchor="middle" className="text-xs fill-white">4</text>

            <line x1="450" y1="90" x2="500" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Database */}
            <rect x="510" y="60" width="160" height="60" rx="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
            <text x="590" y="90" textAnchor="middle" className="text-sm font-semibold fill-red-800 dark:fill-red-300">Database</text>

            {/* Return arrow */}
            <path d="M 590 120 L 590 160 L 350 160 L 350 140" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrowBack)" />
            <text x="500" y="175" textAnchor="middle" className="text-xs text-gray-500">Return connection to pool</text>

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
              <marker id="arrowBack" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            The pool manages connection lifecycle – borrow, use, return, avoiding expensive connects.
          </p>
        </div>
      </section>

      {/* 7. Common Pitfalls */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:700ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2 border-l-4 border-red-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">⚠️ Common Pitfalls & Misconceptions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: "Pool size too small", desc: "Small pool causes thread starvation and transaction timeouts under load.", fix: "Start with 10-20 connections per CPU core; monitor and adjust." },
            { title: "Connection leaks (not closing sessions)", desc: "Forgetting to close Session returns connection to pool; eventually pool exhaustion.", fix: "Always use try-with-resources or finally blocks to close Session." },
            { title: "Using c3p0 with high concurrency", desc: "c3p0 performance degrades under heavy load due to synchronization.", fix: "Switch to HikariCP, which is lock-free." },
            { title: "Mixing multiple pooling libraries", desc: "If you define both HikariCP and c3p0 dependencies, Hibernate may choose one unpredictably.", fix: "Explicitly set hibernate.connection.provider_class to the desired pool." },
          ].map((pitfall, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800/70 rounded-xl p-5 border-l-4 border-red-400 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-red-700 dark:text-red-300">{pitfall.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{pitfall.desc}</p>
              <p className="text-xs font-mono text-green-700 dark:text-green-400 mt-3">✅ {pitfall.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Best Practices */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-emerald-500 pl-4">✅ Best Practices & Industry Habits</h2>
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> <strong>Always use a connection pool</strong> – never use DriverManager directly in production.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Prefer <strong>HikariCP</strong> for any new project; it's the default in Spring Boot 2.x+.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Set <code>maximumPoolSize</code> to <strong>number of CPU cores * 2 to 4</strong> for typical OLTP workloads.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Enable <strong>leakDetectionThreshold</strong> (e.g., 10 seconds) to catch connection leaks during development.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Monitor pool metrics (active, idle, pending threads) via JMX or a metrics framework.</li>
          </ul>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
            {["Use HikariCP", "Set maximumPoolSize", "Enable leak detection", "Close sessions properly"].map((item, i) => (
              <div key={i} className="bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-md text-xs font-medium text-emerald-800 dark:text-emerald-200">
                📌 {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Hint Section */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:900ms] opacity-0 [animation-fill-mode:forwards] bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">💭 Think & Experiment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Observe carefully:</strong> Set <code>maximumPoolSize=2</code> and simulate 10 concurrent requests – what happens?</p>
            <p className="text-xs text-gray-500 mt-2">🔍 Threads will block waiting for connections; timeouts may occur.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Try changing this:</strong> Enable leak detection and intentionally forget to close a Session – see the log output.</p>
            <p className="text-xs text-gray-500 mt-2">🔄 HikariCP will print a stack trace of where the connection was borrowed.</p>
          </div>
        </div>
      </section>

      {/* 10. Pro Tips */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💎</span>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Pro Tips & Classroom shortcuts</h2>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/40 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-cyan-600">🔁</div>
            <div><strong>Statement caching:</strong> HikariCP doesn't cache statements; use Hibernate's statement cache via <code>hibernate.c3p0.max_statements</code> (c3p0) or rely on DB driver.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">⚡</div>
            <div><strong>Connection test query:</strong> Set <code>connectionTestQuery</code> (e.g., "SELECT 1") to validate connections before giving them to app.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">🧩</div>
            <div><strong>Validation timeout:</strong> HikariCP's <code>validationTimeout</code> is separate from connectionTimeout – fine-tune it.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">📌</div>
            <div><strong>Use environment-specific pool sizes:</strong> Smaller pool for dev, larger for production (e.g., via environment variables).</div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Component (30 questions) */}
      <div className="animate-fade-slide-up [animation-delay:1100ms] opacity-0 [animation-fill-mode:forwards]">
        <FAQTemplate title="Connection Pooling (c3p0, HikariCP) FAQs" questions={questions} />
      </div>

      {/* 12. Teacher's Note */}
      <div className="animate-fade-slide-up [animation-delay:1200ms] opacity-0 [animation-fill-mode:forwards]">
        <Teacher note={
          "🎓 Teacher's Note: Connection pooling is often overlooked by beginners until their application fails under load. Use a simple load testing tool (Apache JMeter) to demonstrate the impact of pooling vs. no pooling. " +
          "Also, show how HikariCP's metrics can be exported to Prometheus in a real production environment. A great class exercise: Write a script that opens 100 connections without a pool and times it, then with HikariCP."
        } />
      </div>

      <div className="text-center text-xs text-gray-400 pt-6">
        Topic 16 — Connection Pooling with Hibernate (c3p0, HikariCP) | Industry-grade best practices
      </div>
    </div>
  );
};

export default Topic16;