// Topic9.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java files
import LazyVsEagerEntity from "./topic9_files/LazyVsEagerEntity.java?raw";
import LazyLoadingDemo from "./topic9_files/LazyLoadingDemo.java?raw";
import LazyInitializationException from "./topic9_files/LazyInitializationException.java?raw";
import JoinFetchExample from "./topic9_files/JoinFetchExample.java?raw";
import BatchFetching from "./topic9_files/BatchFetching.java?raw";
// Import questions
import questions from "./topic9_files/topic9_questions";

const Topic9 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    concepts: false,
    lazyDemo: false,
    exception: false,
    solutions: false,
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
  const conceptsRef = useRef(null);
  const lazyDemoRef = useRef(null);
  const exceptionRef = useRef(null);
  const solutionsRef = useRef(null);
  const comparisonRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(conceptsRef, "concepts"),
      createObserver(lazyDemoRef, "lazyDemo"),
      createObserver(exceptionRef, "exception"),
      createObserver(solutionsRef, "solutions"),
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400">
            Lazy Loading vs Eager Loading
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            When to load associations – performance and the infamous LazyInitializationException
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 text-sm">
            <span className="font-mono">⏳</span> LAZY · EAGER · JOIN FETCH · N+1 · Proxy
          </div>
        </div>

        {/* Theory */}
        <div
          ref={conceptsRef}
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.concepts ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚖️</span> Lazy vs Eager – The Performance Trade-off
          </h2>
          <p className="mb-3">
            <strong>Lazy Loading</strong> delays fetching an association until it's actually accessed. <strong>Eager Loading</strong> fetches the association immediately (via join or separate select). Hibernate defaults: <code>@OneToMany</code> and <code>@ManyToMany</code> are LAZY; <code>@ManyToOne</code> and <code>@OneToOne</code> are EAGER (unless overridden).
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded">
              <strong>⏳ LAZY (default for collections)</strong><br/>
              ✅ Saves memory and time if association is not used.<br/>
              ❌ LazyInitializationException if accessed outside session.
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
              <strong>⚡ EAGER (default for single-valued)</strong><br/>
              ✅ Data always ready, no proxy issues.<br/>
              ❌ Can lead to N+1 queries or cartesian products if misused.
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl mt-4 border-l-4 border-yellow-500">
            <p className="italic">✨ Real-world: At <strong>Naihati College</strong>, loading a Student with 10 Courses – if you never access courses, lazy loading saves 10 queries. But if you ALWAYS need courses, eager loading might be better. The classic trade-off.</p>
          </div>
        </div>

        {/* Entity Mapping Example */}
        <div
          ref={lazyDemoRef}
          className={clsx(
            "mb-16",
            isInView.lazyDemo ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">📦 Mapping LAZY and EAGER</h2>
          <JavaFileLoader
            fileModule={LazyVsEagerEntity}
            title="LazyVsEagerEntity.java - Configuring fetch types"
            highlightLines={[6,7,8,9,10,11,12]}
          />
          <div className="bg-gray-100 dark:bg-gray-800/60 p-3 rounded mt-3 text-sm">
            <strong>💡 Rule:</strong> Collections should be LAZY (default). Override to EAGER only if you always need them and the data size is small. For many-to-one, consider explicit LAZY if you often load entities without needing the parent.
          </div>
        </div>

        {/* Lazy Loading Demo */}
        <div
          ref={lazyDemoRef}
          className={clsx(
            "mb-16",
            isInView.lazyDemo ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🔍 How LAZY Loading Works (Proxy Pattern)</h2>
          <JavaFileLoader
            fileModule={LazyLoadingDemo}
            title="LazyLoadingDemo.java - Proxy objects and SQL timing"
            highlightLines={[8,9,10,11,12]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">📌 Hibernate returns a proxy (subclass of entity) for lazy associations. The first access triggers a database query.</p>
        </div>

        {/* LazyInitializationException */}
        <div
          ref={exceptionRef}
          className={clsx(
            "mb-16",
            isInView.exception ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-3xl">⚠️</span> The Infamous LazyInitializationException
          </h2>
          <JavaFileLoader
            fileModule={LazyInitializationException}
            title="LazyInitializationException.java - What happens when session is closed"
            highlightLines={[9,10,11,12,13,14]}
          />
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded mt-3">
            <strong>Why it happens:</strong> You try to access a lazy association after the Hibernate session is closed. The proxy cannot fetch data because the database connection is gone.
          </div>
        </div>

        {/* Solutions */}
        <div
          ref={solutionsRef}
          className={clsx(
            "mb-16",
            isInView.solutions ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🛠️ Solutions to LazyInitializationException</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <h3 className="font-bold text-blue-600">1. JOIN FETCH</h3>
              <p>Initialize lazy associations in the query.</p>
              <JavaFileLoader
                fileModule={JoinFetchExample}
                title="JoinFetchExample.java - Using JOIN FETCH"
                highlightLines={[8,9]}
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <h3 className="font-bold text-blue-600">2. Open Session in View (OSIV)</h3>
              <p>Keep session open during view rendering (Spring: spring.jpa.open-in-view=true). Controversial because it holds DB connections.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <h3 className="font-bold text-blue-600">3. Batch Fetching</h3>
              <p>Load collections in batches to reduce N+1.</p>
              <JavaFileLoader
                fileModule={BatchFetching}
                title="BatchFetching.java - @BatchSize annotation"
                highlightLines={[5,6]}
              />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <h3 className="font-bold text-blue-600">4. DTO Projection</h3>
              <p>Select only needed fields, avoid lazy loading altogether.</p>
              <code className="text-sm">SELECT new StudentDTO(s.id, s.name, c.title) FROM Student s JOIN s.courses c</code>
            </div>
          </div>
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
          <h2 className="text-2xl font-semibold mb-4">📊 LAZY vs EAGER – Comparison</h2>
          <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr><th className="p-3 text-left">Aspect</th><th className="p-3 text-left">LAZY</th><th className="p-3 text-left">EAGER</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <tr><td className="p-3">SQL queries</td><td>May be fewer if association not used</td><td>Always fetched (join or separate select)</td></tr>
              <tr><td className="p-3">Memory footprint</td><td>Lower if association not used</td><td>Higher – loads all data</td></tr>
              <tr><td className="p-3">Risk of exception</td><td>LazyInitializationException outside session</td><td>None – data already loaded</td></tr>
              <tr><td className="p-3">Default for</td><td>@OneToMany, @ManyToMany</td><td>@ManyToOne, @OneToOne</td></tr>
              <tr><td className="p-3">N+1 problem</td><td>Can cause if accessed in loop</td><td>Can cause if misconfigured (e.g., EAGER on both sides)</td></tr>
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
            <li>🔹 <strong>Always prefer LAZY for collections</strong> – change to EAGER only after careful analysis.</li>
            <li>🔹 Use <code>JOIN FETCH</code> to initialize specific associations for a query without changing global fetch type.</li>
            <li>🔹 <strong>Batch fetching</strong> (<code>@BatchSize</code>) is a great middle ground for lazy collections you often need.</li>
            <li>🔹 In web apps, consider using <strong>DTO projections</strong> for view-specific data to avoid LazyInitializationException entirely.</li>
            <li>🔹 Enable <code>hibernate.show_sql</code> to detect N+1 queries caused by lazy loading inside loops.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ <strong>LazyInitializationException</strong> – trying to access lazy data after session closed.</li>
            <li>❌ The <strong>N+1 problem</strong> – fetching N parent entities, then each triggers a query for children.</li>
            <li>❌ Setting <code>@OneToMany(fetch = EAGER)</code> and also <code>@ManyToOne(fetch = EAGER)</code> on the other side → cartesian product.</li>
            <li>❌ Assuming <code>@Transactional</code> automatically keeps session open – it does, but only within the method. Once method returns, session closes.</li>
            <li>❌ Overriding equals/hashCode on entities with lazy fields – can trigger unwanted initialization.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-yellow-600 dark:text-yellow-400 font-semibold">✅ Mini Checklist: Default to LAZY for collections. Use JOIN FETCH when you know you'll need the association. Keep session open for the duration of data access. Batch fetch for frequently accessed collections. Consider DTOs for complex views.</p>
          </div>
        </div>

        {/* Hint */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">In a school system, you have a REST API endpoint <code>{`/students/{id}`}</code> that returns student details and their list of courses. If you use lazy loading, the courses won't be included in the response because the session closes before JSON serialization. How would you solve this? (Hint: JOIN FETCH or DTO).</p>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Lazy Loading vs Eager Loading - Expert FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="⏳ Lazy loading is one of Hibernate's most misunderstood features. I tell students: 'Think of it as on-demand loading.' I've fixed countless production issues caused by N+1 queries from lazy loading in loops. Always show the SQL log – with lazy you see separate queries, with JOIN FETCH you see one. And the LazyInitializationException? That's a rite of passage! Once they understand proxies, they become real Hibernate pros." />
        </div>
      </div>
    </div>
  );
};

export default Topic9;