import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import Java files using ?raw (Vite syntax)
import nPlusOneExample from "./topic17_files/NPlusOneExample.java?raw";
import fetchJoinSolution from "./topic17_files/FetchJoinSolution.java?raw";
import batchFetchExample from "./topic17_files/BatchFetchExample.java?raw";
import statisticsExample from "./topic17_files/StatisticsExample.java?raw";
import secondLevelCacheConfig from "./topic17_files/SecondLevelCacheConfig.java?raw";

// Import FAQ questions (30 items, moderate to expert)
import questions from "./topic17_files/topic17_questions";

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

const Topic17 = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      <style>{animationStyles}</style>

      {/* Header Section */}
      <div className="animate-fade-slide-up text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
          Hibernate Performance Tuning
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Transform your Hibernate application from slow to blazing fast. Learn proven strategies to 
          eliminate N+1 queries, optimize fetching, leverage caching, tune connection pools, and 
          monitor performance with built-in statistics.
        </p>
      </div>

      {/* 1. Conceptual explanation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Why Performance Matters</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A poorly optimized Hibernate application can be <strong>100x slower</strong> than equivalent JDBC code due to hidden extra queries, oversized caches, and inefficient fetching. 
            Performance tuning in Hibernate focuses on minimizing database round-trips, reducing memory footprint, and leveraging caching effectively.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 dark:bg-red-950/40 p-4 rounded-xl border-l-4 border-red-400">
              <p className="font-semibold text-red-800 dark:text-red-200">🐌 Common Anti-Patterns</p>
              <p className="text-sm">N+1 queries, eager fetching everything, huge transactions, missing indexes.</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl border-l-4 border-green-400">
              <p className="font-semibold text-green-800 dark:text-green-200">🚀 Optimization Objectives</p>
              <p className="text-sm">Fewer SQL statements, proper batch sizes, cached lookups, fast connection pool.</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border-l-4 border-blue-400">
            <p className="text-sm italic text-blue-800 dark:text-blue-200">
              💡 <strong>Real-world scenario:</strong> At Barrackpore High School, the report generation module took 45 seconds. 
              After fixing N+1 queries and adding second-level cache, response dropped to 2 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The N+1 Query Problem */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-red-500 pl-4">
          The Infamous N+1 Query Problem
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          N+1 occurs when Hibernate executes 1 query to load root entities, then N additional queries to load associations 
          for each entity (lazy loading in a loop). This can devastate performance.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <JavaFileLoader
              fileModule={nPlusOneExample}
              title="NPlusOneExample.java (Bad – triggers N+1)"
              highlightLines={[8, 12]}
            />
          </div>
          <div>
            <JavaFileLoader
              fileModule={fetchJoinSolution}
              title="FetchJoinSolution.java (Good – single query)"
              highlightLines={[6, 10]}
            />
          </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm font-mono text-amber-800 dark:text-amber-300">
            🧠 <strong>Teacher insight:</strong> Always enable SQL logging to spot N+1 patterns. Look for repetitive SELECT queries with different IDs.
          </p>
        </div>
      </section>

      {/* 3. Batch Fetching & Batch Size */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4">
          Batch Fetching: Efficient Lazy Loading
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Instead of one query per entity, use <code>@BatchSize</code> to load associations in batches (e.g., 10 entities per query).
          Also enable JDBC batching for mass inserts/updates.
        </p>
        <JavaFileLoader
          fileModule={batchFetchExample}
          title="BatchFetchExample.java (Using @BatchSize & JDBC batching)"
          highlightLines={[5, 12, 20]}
        />
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm italic text-indigo-800 dark:text-indigo-200">
            💡 Typical batch size values: 10–30 for most associations. Too large can cause memory spikes.
          </p>
        </div>
      </section>

      {/* 4. Tuning the Connection Pool */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4">
          Connection Pool Tuning Revisited
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Connection pool settings are critical for performance under load. Insufficient pool size causes thread starvation; 
          too large wastes DB resources. Use these tuning tips.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
          <li>Set <code>maximumPoolSize</code> = (CPU cores * 2) to 4 for OLTP.</li>
          <li>Enable <code>leakDetectionThreshold</code> to catch slow connection usage.</li>
          <li>Set <code>connectionTimeout</code> to 5–30 seconds, not infinite.</li>
          <li>Use <code>connectionTestQuery</code> only if driver doesn’t support <code>isValid()</code>.</li>
        </ul>
        <JavaFileLoader
          fileModule={secondLevelCacheConfig}
          title="HikariCP optimized configuration (properties snippet)"
          highlightLines={[3, 5, 7, 9]}
        />
      </section>

      {/* 5. Caching Strategies */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4">
          Second-Level Cache & Query Cache
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Second-level cache reduces database hits for frequently accessed entities. Query cache caches results of repeated 
          JPQL/HQL queries. But misuse can degrade performance (too many invalidations).
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
          <h3 className="font-bold">Best practices for caching</h3>
          <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>✅ Use second-level cache for <strong>read-mostly static data</strong> (reference tables).</li>
            <li>✅ Set <code>hibernate.cache.use_query_cache=true</code> only for queries executed repeatedly with same parameters.</li>
            <li>❌ Avoid caching entities that are updated frequently – invalidation overhead.</li>
            <li>✅ Use <code>@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)</code> for entities that are mostly read but sometimes written.</li>
          </ul>
        </div>
      </section>

      {/* 6. Monitoring with Statistics */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-amber-500 pl-4">
          Monitoring Performance with Statistics
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Enable Hibernate statistics to measure query count, cache hit ratios, and entity load times. 
          Use these metrics to pinpoint issues.
        </p>
        <JavaFileLoader
          fileModule={statisticsExample}
          title="StatisticsExample.java (Enabling & reading stats)"
          highlightLines={[5, 12, 19]}
        />
        <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm font-mono text-yellow-800 dark:text-yellow-300">
            🔍 <strong>Pro tip:</strong> Expose statistics via JMX or Micrometer to monitor in production dashboards.
          </p>
        </div>
      </section>

      {/* 7. SVG: Performance Tuning Flow */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:700ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4">
          📈 Performance Tuning Process
        </h2>
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
          <svg viewBox="0 0 900 200" className="w-full h-auto" aria-label="Tuning steps">
            <rect x="20" y="30" width="160" height="60" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
            <text x="100" y="55" textAnchor="middle" className="text-sm font-semibold fill-blue-800 dark:fill-blue-300">1. Measure</text>
            <text x="100" y="75" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Enable stats, logs</text>
            <line x1="180" y1="60" x2="230" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="240" y="30" width="160" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
            <text x="320" y="55" textAnchor="middle" className="text-sm font-semibold fill-green-800 dark:fill-green-300">2. Identify</text>
            <text x="320" y="75" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Find N+1, slow queries</text>
            <line x1="400" y1="60" x2="450" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="460" y="30" width="160" height="60" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
            <text x="540" y="55" textAnchor="middle" className="text-sm font-semibold fill-amber-800 dark:fill-amber-300">3. Optimize</text>
            <text x="540" y="75" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Fetch joins, batch, cache</text>
            <line x1="620" y1="60" x2="670" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="680" y="30" width="190" height="60" rx="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
            <text x="775" y="55" textAnchor="middle" className="text-sm font-semibold fill-red-800 dark:fill-red-300">4. Verify</text>
            <text x="775" y="75" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Measure again → iterate</text>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Performance tuning is an iterative cycle: measure, find bottlenecks, fix, then re-measure.
          </p>
        </div>
      </section>

      {/* 8. Common Pitfalls */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2 border-l-4 border-red-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">⚠️ Common Performance Pitfalls</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: "Falling for N+1 queries", desc: "Lazy loading inside loops causes dozens/hundreds of queries.", fix: "Use JOIN FETCH or entity graphs. Enable SQL logging to detect." },
            { title: "Over-eager fetching (Cartesian product)", desc: "Fetching multiple collections with JOIN FETCH leads to huge result sets.", fix: "Use batch fetching or multiple queries instead." },
            { title: "Disabling second-level cache completely", desc: "Each repeated lookup hits the database, wasting time.", fix: "Enable caching for reference data." },
            { title: "Large transactions (holding connections)", desc: "Long transactions keep pool connections occupied, starving other threads.", fix: "Keep transactions short; split large operations." },
          ].map((pitfall, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800/70 rounded-xl p-5 border-l-4 border-red-400 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-red-700 dark:text-red-300">{pitfall.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{pitfall.desc}</p>
              <p className="text-xs font-mono text-green-700 dark:text-green-400 mt-3">✅ {pitfall.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Best Practices / Checklist */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:900ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-emerald-500 pl-4">✅ Performance Optimization Checklist</h2>
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Development & Design</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>✓ Choose appropriate fetch strategies (lazy vs eager).</li>
                <li>✓ Use DTO projections for read-only data.</li>
                <li>✓ Add database indexes on foreign key columns.</li>
                <li>✓ Normalize schema for write performance; denormalize for reads if needed.</li>
              </ul>
            </div>
            <div>
              <p className="font-bold">Runtime & Configuration</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>✓ Set connection pool size correctly.</li>
                <li>✓ Enable second-level cache for static reference data.</li>
                <li>✓ Set hibernate.jdbc.batch_size to 20–50.</li>
                <li>✓ Disable show_sql and format_sql in production.</li>
              </ul>
            </div>
          </div>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {["Enable statistics", "Log slow queries", "Use batch fetching", "Cache static data"].map((item, i) => (
              <div key={i} className="bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-md text-xs font-medium text-emerald-800 dark:text-emerald-200">
                📌 {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Hint Section */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards] bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">💭 Think & Experiment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Observe carefully:</strong> Compare log output between <code>SELECT s FROM Student s</code> and <code>SELECT s FROM Student s JOIN FETCH s.courses</code>.</p>
            <p className="text-xs text-gray-500 mt-2">🔍 The first triggers N+1; the second loads everything in one query.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Try changing this:</strong> Enable <code>hibernate.generate_statistics=true</code> and run a query; interpret output.</p>
            <p className="text-xs text-gray-500 mt-2">🔄 Look for 'query executed' count and 'entity load' count.</p>
          </div>
        </div>
      </section>

      {/* 11. Pro Tips */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:1100ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💎</span>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Pro Tips & Industry Secrets</h2>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/40 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-cyan-600">🔁</div>
            <div><strong>Use Hibernate Bytecode Enhancement</strong> – enables lazy loading on basic fields and reduces proxy overhead.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">⚡</div>
            <div><strong>Search for N+1 automatically</strong> – tools like Hibernate Statistic Logger or hibernate-performance-detect.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">🧩</div>
            <div><strong>StatelessSession</strong> – for bulk operations with minimal overhead.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">📌</div>
            <div><strong>Avoid using @Transactional on large loops</strong> – each iteration commits, causing many flushes.</div>
          </div>
        </div>
      </section>

      {/* 12. FAQ Component (30 questions) */}
      <div className="animate-fade-slide-up [animation-delay:1200ms] opacity-0 [animation-fill-mode:forwards]">
        <FAQTemplate title="Hibernate Performance Tuning FAQs" questions={questions} />
      </div>

      {/* 13. Teacher's Note */}
      <div className="animate-fade-slide-up [animation-delay:1300ms] opacity-0 [animation-fill-mode:forwards]">
        <Teacher note={
          "🎓 Teacher's Note: Performance tuning is where students really learn to think like professionals. Emphasize that 'good enough' is often the target, not absolute perfection. Always measure before optimizing. A classic lab: start with a naive Hibernate app that loads 100 students with their courses, then apply fetch join, batch size, and caching – and measure the improvement using logs or stopwatch."
        } />
      </div>

      <div className="text-center text-xs text-gray-400 pt-6">
        Topic 17 — Performance Tuning Tips | Industry-grade best practices
      </div>
    </div>
  );
};

export default Topic17;