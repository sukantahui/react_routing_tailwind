// Topic1.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java code examples
import hibernateCfgXml from "./topic1_files/hibernate.cfg.xml?raw";
import sessionFactoryExample from "./topic1_files/SessionFactoryExample.java?raw";
import sessionMethodsExample from "./topic1_files/SessionMethodsExample.java?raw";
// Import questions
import questions from "./topic1_files/topic1_questions";

const Topic1 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    architecture: false,
    coreComponents: false,
    lifecycle: false,
    codeExample: false,
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
  const architectureRef = useRef(null);
  const coreComponentsRef = useRef(null);
  const lifecycleRef = useRef(null);
  const codeExampleRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(architectureRef, "architecture"),
      createObserver(coreComponentsRef, "coreComponents"),
      createObserver(lifecycleRef, "lifecycle"),
      createObserver(codeExampleRef, "codeExample"),
      createObserver(checklistRef, "checklist"),
    ];
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  const animationStyle = `
    @keyframes fadeSlideUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes softPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    .animate-fadeSlideUp {
      animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }
    .animate-softPulse {
      animation: softPulse 0.6s ease-in-out;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fadeSlideUp, .animate-softPulse {
        animation: none;
        opacity: 1;
        transform: none;
      }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
            Hibernate Architecture
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding the core layers and components of Hibernate
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm">
            <span className="font-mono">🏗️</span> Session • SessionFactory • Transaction • Query
          </div>
        </div>

        {/* Conceptual Explanation */}
        <div
          ref={architectureRef}
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.architecture ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">📐</span> Hibernate’s Architectural Layers
          </h2>
          <p className="mb-4">
            Hibernate sits between your Java application and the relational database. It provides a high-level object persistence service. The architecture is layered to separate concerns and allow configuration flexibility.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-center mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl transition-all hover:scale-105">
              <div className="text-3xl mb-2">☕</div>
              <h3 className="font-bold">Application Layer</h3>
              <p className="text-sm">Your Java entities and business logic</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl transition-all hover:scale-105">
              <div className="text-3xl mb-2">🔌</div>
              <h3 className="font-bold">Hibernate Core</h3>
              <p className="text-sm">SessionFactory, Session, Transaction, Query</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl transition-all hover:scale-105">
              <div className="text-3xl mb-2">🗄️</div>
              <h3 className="font-bold">Database Layer</h3>
              <p className="text-sm">JDBC, connection pool, actual DB</p>
            </div>
          </div>
        </div>

        {/* Architecture SVG Diagram */}
        <div
          ref={coreComponentsRef}
          className={clsx(
            "mb-16",
            isInView.coreComponents ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Core Components & Flow</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl group">
            <svg viewBox="0 0 800 500" className="w-full h-auto">
              <rect x="280" y="20" width="240" height="50" rx="10" fill="#3b82f6" className="group-hover:fill-blue-500 transition-colors" />
              <text x="400" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Java Application</text>
              
              <path d="M400 70 L400 110" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowArch)" />
              <rect x="280" y="110" width="240" height="50" rx="10" fill="#10b981" className="group-hover:fill-emerald-500 transition-colors" />
              <text x="400" y="140" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">SessionFactory</text>
              <text x="400" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10">(Thread-safe, created once)</text>

              <path d="M400 160 L400 200" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowArch)" />
              <rect x="280" y="200" width="240" height="50" rx="10" fill="#f59e0b" className="group-hover:fill-amber-500 transition-colors" />
              <text x="400" y="230" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Session</text>
              <text x="400" y="245" textAnchor="middle" fill="#fef3c7" fontSize="10">(lightweight, per request/unit of work)</text>

              {/* Transaction and Query branches */}
              <path d="M280 225 L180 225 L180 260" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowArch)" />
              <rect x="80" y="260" width="200" height="45" rx="8" fill="#8b5cf6" className="group-hover:fill-violet-500 transition-colors" />
              <text x="180" y="287" textAnchor="middle" fill="white" fontSize="13">Transaction</text>

              <path d="M520 225 L620 225 L620 260" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowArch)" />
              <rect x="520" y="260" width="200" height="45" rx="8" fill="#ec489a" className="group-hover:fill-pink-500 transition-colors" />
              <text x="620" y="287" textAnchor="middle" fill="white" fontSize="13">Query (HQL/Criteria)</text>

              {/* Down to JDBC */}
              <path d="M400 250 L400 340" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowArch)" />
              <rect x="280" y="340" width="240" height="50" rx="10" fill="#ef4444" className="group-hover:fill-red-500 transition-colors" />
              <text x="400" y="370" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">JDBC / Connection Pool</text>

              <path d="M400 390 L400 440" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowArch)" />
              <rect x="300" y="440" width="200" height="45" rx="10" fill="#6b7280" />
              <text x="400" y="468" textAnchor="middle" fill="white" fontSize="14">Database</text>

              <defs>
                <marker id="arrowArch" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
                </marker>
              </defs>
            </svg>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              Hibernate uses SessionFactory → Session → Transaction/Query → JDBC → Database
            </p>
          </div>
        </div>

        {/* Component Descriptions */}
        <div
          ref={lifecycleRef}
          className={clsx(
            "grid md:grid-cols-2 gap-6 mb-16",
            isInView.lifecycle ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="bg-slate-50 dark:bg-gray-800/60 p-5 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">SessionFactory</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">A heavyweight, thread-safe object created once per database. It holds configuration, mapping metadata, and connection pool. Used to obtain Session instances.</p>
            <div className="mt-3 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">sessionFactory = new Configuration().configure().buildSessionFactory();</div>
          </div>
          <div className="bg-slate-50 dark:bg-gray-800/60 p-5 rounded-xl border-l-4 border-emerald-500 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Session</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Lightweight, thread-unsafe. Represents a single unit of work with the database. Wraps a JDBC connection. Provides CRUD methods and a first-level cache.</p>
            <div className="mt-3 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">Session session = sessionFactory.openSession();</div>
          </div>
          <div className="bg-slate-50 dark:bg-gray-800/60 p-5 rounded-xl border-l-4 border-amber-500 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">Transaction</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Abstracts JDBC/JTA transactions. begin(), commit(), rollback(). All database operations should be wrapped in a transaction for data integrity.</p>
            <div className="mt-3 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">Transaction tx = session.beginTransaction();</div>
          </div>
          <div className="bg-slate-50 dark:bg-gray-800/60 p-5 rounded-xl border-l-4 border-pink-500 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400">Query / Criteria</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">HQL, Native SQL, or Criteria API to retrieve data. Provides pagination, named parameters, and result transformation.</p>
            <div className="mt-3 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">Query q = session.createQuery("from Student");</div>
          </div>
        </div>

        {/* Code Examples */}
        <div
          ref={codeExampleRef}
          className={clsx(
            "space-y-8 mb-16",
            isInView.codeExample ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold">📄 Configuration & Code Walkthrough</h2>
          <JavaFileLoader
            fileModule={hibernateCfgXml}
            title="hibernate.cfg.xml (Configuration File)"
            highlightLines={[6, 7, 8, 9]}
          />
          <JavaFileLoader
            fileModule={sessionFactoryExample}
            title="SessionFactoryExample.java - Creating SessionFactory"
            highlightLines={[8, 9, 10]}
          />
          <JavaFileLoader
            fileModule={sessionMethodsExample}
            title="SessionMethodsExample.java - Typical Session Operations"
            highlightLines={[12, 13, 14, 15, 16, 17]}
          />
        </div>

        {/* Tips, Pitfalls, Checklist */}
        <div
          className={clsx(
            "mb-12 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-8 border-amber-500",
            isInView.checklist ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>🔹 <strong>SessionFactory is expensive to create</strong> – make it a singleton (e.g., static initializer or Spring bean).</li>
            <li>🔹 Always close sessions in a <code>finally</code> block or use try-with-resources (if Session implements AutoCloseable).</li>
            <li>🔹 Use <code>session.get()</code> vs <code>session.load()</code> wisely: <code>load()</code> returns proxy, <code>get()</code> hits DB immediately.</li>
            <li>🔹 For bulk updates, consider <code>StatelessSession</code> to bypass first-level cache.</li>
            <li>🔹 Keep transaction boundaries as short as possible to avoid long-held locks.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ Creating a SessionFactory per request → heavy memory/performance waste.</li>
            <li>❌ Not beginning a transaction before modifying objects → no data written.</li>
            <li>❌ Forgetting to commit transaction → data lost (rollback).</li>
            <li>❌ Keeping a Session open for too long → connection pool exhaustion.</li>
            <li>❌ Using the same Session across multiple threads → unpredictable errors.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-blue-600 dark:text-blue-400 font-semibold">✅ Mini Checklist: Understand each component’s lifecycle. Always open Session inside a try-catch-finally and close it. Use a single SessionFactory per DB.</p>
          </div>
        </div>

        {/* Hint */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">If you were building a web app for <strong>Ichapur High School</strong> where 5000 users log in simultaneously, how many SessionFactory instances would you create? How many Sessions per request? What happens if you forget to close a Session after rendering a page?</p>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Hibernate Architecture - Expert FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="🏛️ Hibernate's architecture is like a well-organized library. SessionFactory is the main building (built once), Session is a librarian helping with one task at a time, Transaction is the log book, and Query is the search engine. Students often confuse Session with SessionFactory – remember: heavy singleton vs lightweight per use. Also, show them how to enable SQL logging to see the generated queries – that demystifies the magic!" />
        </div>
      </div>
    </div>
  );
};

export default Topic1;