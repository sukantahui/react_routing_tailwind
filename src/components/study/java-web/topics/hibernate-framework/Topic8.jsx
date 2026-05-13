// Topic8.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java files
import FirstLevelCache from "./topic8_files/FirstLevelCache.java?raw";
import SecondLevelCacheCfg from "./topic8_files/SecondLevelCacheCfg.java?raw";
import QueryCache from "./topic8_files/QueryCache.java?raw";
import CacheSettings from "./topic8_files/CacheSettings.java?raw";
import EhcacheConfig from "./topic8_files/ehcache.xml?raw";
// Import questions
import questions from "./topic8_files/topic8_questions";

const Topic8 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    firstLevel: false,
    secondLevel: false,
    queryCache: false,
    config: false,
    comparison: false,
    checklist: false,
  });

  const observeSection = (entries, sectionName) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsInView((prev) => ({ ...prev, [sectionName]: true }));
      }
    });
  };

  const createObserver = (ref, sectionName) => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => observeSection(entries, sectionName),
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(ref.current);
    return observer;
  };

  const introRef = useRef(null);
  const firstLevelRef = useRef(null);
  const secondLevelRef = useRef(null);
  const queryCacheRef = useRef(null);
  const configRef = useRef(null);
  const comparisonRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(firstLevelRef, "firstLevel"),
      createObserver(secondLevelRef, "secondLevel"),
      createObserver(queryCacheRef, "queryCache"),
      createObserver(configRef, "config"),
      createObserver(comparisonRef, "comparison"),
      createObserver(checklistRef, "checklist"),
    ];
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  const animationStyle = `
    @keyframes fadeSlideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeSlideUp {
      animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fadeSlideUp { animation: none; opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
      <style>{animationStyle}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div
          ref={introRef}
          className={clsx(
            "text-center mb-16 transition-all duration-700 ease-out",
            isInView.intro ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            Caching in Hibernate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            First-Level, Second-Level, and Query Cache – Supercharge Your Performance
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
            <span className="font-mono">⚡</span> Session Cache · Shared Cache · Query Result Cache
          </div>
        </div>

        {/* Theory: Why Caching? */}
        <div
          ref={introRef}
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.intro ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">🚀</span> Why Cache?
          </h2>
          <p className="mb-3">
            Database access is expensive. Caching reduces the number of SQL queries sent to the database, dramatically improving application performance. Hibernate provides three levels of caching:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-center">
              <strong>📦 First-Level Cache</strong><br/>Session-scoped, mandatory
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-center">
              <strong>🗄️ Second-Level Cache</strong><br/>SessionFactory-scoped, optional
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-center">
              <strong>🔍 Query Cache</strong><br/>Caches query results + identifiers
            </div>
          </div>
          <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl mt-4 border-l-4 border-cyan-500">
            <p className="italic">✨ Real-world: At <strong>Shyamnagar College</strong>, the student list is requested hundreds of times per minute. With second-level cache, the database is hit only once every minute. Response time drops from 200ms to 5ms.</p>
          </div>
        </div>

        {/* First-Level Cache */}
        <div
          ref={firstLevelRef}
          className={clsx(
            "mb-16",
            isInView.firstLevel ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">📦 First-Level Cache (Session Cache)</h2>
          <p className="mb-2">Enabled by default, cannot be disabled. Lives within a single Session. Automatically caches entities retrieved during that session.</p>
          <JavaFileLoader
            fileModule={FirstLevelCache}
            title="FirstLevelCache.java - Same entity, same session"
            highlightLines={[9,10,11,12]}
          />
          <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">✅ <strong>Pros:</strong> Guarantee of repeatable read, no configuration.</div>
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">❌ <strong>Limitation:</strong> Cleared when session closes, not shared.</div>
          </div>
        </div>

        {/* Second-Level Cache */}
        <div
          ref={secondLevelRef}
          className={clsx(
            "mb-16",
            isInView.secondLevel ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🗄️ Second-Level Cache (SessionFactory Cache)</h2>
          <p className="mb-2">Shared across sessions. Must be explicitly configured with a cache provider (Ehcache, Hazelcast, Infinispan). Entities must be annotated with @Cacheable.</p>
          <JavaFileLoader
            fileModule={SecondLevelCacheCfg}
            title="SecondLevelCacheCfg.java - Enabling and using second-level cache"
            highlightLines={[5,6,7,8,9,10,11]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">🔧 Cache concurrency strategies: READ_ONLY, NONSTRICT_READ_WRITE, READ_WRITE, TRANSACTIONAL.</p>
        </div>

        {/* Query Cache */}
        <div
          ref={queryCacheRef}
          className={clsx(
            "mb-16",
            isInView.queryCache ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🔍 Query Cache</h2>
          <p className="mb-2">Caches the result set of HQL/JPQL queries (store identifiers). Works together with second-level cache. Must be enabled separately.</p>
          <JavaFileLoader
            fileModule={QueryCache}
            title="QueryCache.java - Caching query results"
            highlightLines={[8,9,10,11,12,13]}
          />
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded mt-3 text-sm">
            <strong>⚠️ Warning:</strong> Query cache invalidated when any entity in the result set changes. Use only for read-mostly data.
          </div>
        </div>

        {/* Configuration Example */}
        <div
          ref={configRef}
          className={clsx(
            "mb-16",
            isInView.config ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">⚙️ Configuration & Ehcache Setup</h2>
          <JavaFileLoader
            fileModule={CacheSettings}
            title="hibernate.cfg.xml - Cache properties"
            highlightLines={[8,9,10,11,12,13,14]}
          />
          <JavaFileLoader
            fileModule={EhcacheConfig}
            title="ehcache.xml - Cache region configuration"
            highlightLines={[5,6,7,8,9,10]}
          />
        </div>

        {/* Comparison Table */}
        <div
          ref={comparisonRef}
          className={clsx(
            "mb-16 overflow-x-auto",
            isInView.comparison ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold mb-4">📊 Cache Comparison</h2>
          <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr><th className="p-3 text-left">Feature</th><th className="p-3 text-left">First-Level</th><th className="p-3 text-left">Second-Level</th><th className="p-3 text-left">Query Cache</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-3">Scope</td><td>Session</td><td>SessionFactory</td><td>SessionFactory</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-3">Mandatory</td><td>Yes</td><td>No</td><td>No</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-3">Caches</td><td>Entities</td><td>Entities, Collections</td><td>Query results (IDs)</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-3">Cache provider</td><td>Hibernate internal</td><td>Ehcache, Hazelcast, etc.</td><td>Same as 2LC</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-3">Eviction</td><td>session.clear() / evict()</td><td>Cache region manager</td><td>Automatic on update</td></tr>
            </tbody>
          </table>
        </div>

        {/* Tips & Pitfalls + Checklist */}
        <div
          ref={checklistRef}
          className={clsx(
            "mb-12 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-8 border-amber-500",
            isInView.checklist ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.7s" }}
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>🔹 <strong>First-level cache is automatic</strong> – use it to avoid repeated queries in same transaction.</li>
            <li>🔹 Enable second-level cache <strong>only for read-mostly entities</strong> (reference data, lookup tables). Avoid caching frequently updated entities.</li>
            <li>🔹 Use <code>READ_WRITE</code> strategy for entities that are updated but still benefit from caching; <code>READ_ONLY</code> for immutable data.</li>
            <li>🔹 Query cache works best for queries that are executed with same parameters and whose tables change rarely.</li>
            <li>🔹 Monitor cache hit rates using <code>Statistics</code> API. If hit rate is low, caching may hurt performance.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ Expecting second-level cache to work without <code>@Cacheable</code> or configuration.</li>
            <li>❌ Using query cache without second-level cache – only caches IDs, then hits DB for each entity anyway.</li>
            <li>❌ Caching entities that are frequently updated – cache invalidation overhead.</li>
            <li>❌ Forgetting to define <code>ehcache.xml</code> or missing cache provider library.</li>
            <li>❌ Overriding <code>equals/hashCode</code> incorrectly causing cache misses.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-blue-600 dark:text-blue-400 font-semibold">✅ Mini Checklist: Ensure cache provider is in classpath. Annotate entities with @Cacheable and @Cache. Enable second-level cache in cfg.xml. For query cache, call setCacheable(true). Use read-only for reference data.</p>
          </div>
        </div>

        {/* Hint */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">Your school management system has a <code>Student</code> entity that is updated rarely (address changes once a year) and queried thousands of times a day. Which caching levels would you apply? What about <code>Attendance</code> recorded daily – should it be cached? Why?</p>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Hibernate Caching - Expert FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="💾 Caching is a double-edged sword. I've seen developers enable second-level cache for everything then wonder why updates don't show. Rule of thumb: 'read more, write less' data benefits most. Demo: show SQL logs with 1st-level cache (2 gets -> 1 SQL). Then show 2nd-level across sessions. Then show query cache on a complex report. Students love seeing the performance jump!" />
        </div>
      </div>
    </div>
  );
};

export default Topic8;