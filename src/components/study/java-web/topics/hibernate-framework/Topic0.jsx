// Topic0.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java code examples from the topic subfolder
import jdbcExampleCode from "./topic0_files/JdbcExample.java?raw";
import ormExampleCode from "./topic0_files/HibernateOrmExample.java?raw";
// Import questions
import questions from "./topic0_files/topic0_questions";

const Topic0 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    comparison: false,
    jdbcCode: false,
    ormCode: false,
    prosCons: false,
    checklist: false,
  });

  // Simple Intersection Observer for section reveal
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
  const comparisonRef = useRef(null);
  const jdbcCodeRef = useRef(null);
  const ormCodeRef = useRef(null);
  const prosConsRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(comparisonRef, "comparison"),
      createObserver(jdbcCodeRef, "jdbcCode"),
      createObserver(ormCodeRef, "ormCode"),
      createObserver(prosConsRef, "prosCons"),
      createObserver(checklistRef, "checklist"),
    ];
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  // Custom animation keyframes (inline style)
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
    @keyframes softGlow {
      0% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3);
      }
      70% {
        box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
      }
    }
    .animate-fadeSlideUp {
      animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }
    .animate-softGlow {
      animation: softGlow 1.5s infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fadeSlideUp {
        animation: none;
        opacity: 1;
        transform: translateY(0);
      }
      .animate-softGlow {
        animation: none;
      }
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 font-sans leading-relaxed">
      <style>{animationStyle}</style>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Hero Section */}
        <div
          ref={introRef}
          className={clsx(
            "text-center mb-16 transition-all duration-700 ease-out",
            isInView.intro ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            ORM vs JDBC
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Bridging the gap between Object-Oriented Java and Relational Databases
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
            <span className="font-mono">🔍</span> Core Concept • Data Persistence • Java Ecosystem
          </div>
        </div>

        {/* Detailed Explanation Section */}
        <div
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.intro ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">📖</span> Understanding the Core
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong className="text-blue-600 dark:text-blue-400">JDBC (Java Database Connectivity)</strong> is the low-level API that allows Java applications to execute SQL statements. It requires manual handling of connections, statements, result sets, and SQL injection risks. Each database interaction involves boilerplate code and manual mapping between database rows and Java objects.
            </p>
            <p>
              <strong className="text-green-600 dark:text-green-400">ORM (Object-Relational Mapping)</strong> like Hibernate abstracts away the SQL layer. You work with plain Java objects (Entities), and the ORM framework generates optimized SQL, manages connections, and maps results automatically. This reduces boilerplate by ~70% and makes the code more maintainable.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500 mt-4">
              <p className="italic">✨ Real-world analogy: JDBC is like assembling furniture with individual screws and a manual; ORM is like buying pre-assembled smart furniture that auto-adjusts to your room.</p>
            </div>
          </div>
        </div>

        {/* Visual Comparison SVG */}
        <div
          ref={comparisonRef}
          className={clsx(
            "mb-16",
            isInView.comparison ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Visual Flow Comparison</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* JDBC SVG */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
              <h3 className="text-xl font-bold text-center mb-3 text-red-600 dark:text-red-400">JDBC Approach</h3>
              <svg viewBox="0 0 320 300" className="w-full h-auto">
                <rect x="10" y="10" width="80" height="40" rx="8" fill="#3b82f6" className="group-hover:fill-blue-400 transition-colors" />
                <text x="50" y="35" textAnchor="middle" fill="white" fontSize="12">Java App</text>
                <path d="M90 30 L120 30" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowJDBC)" />
                <rect x="125" y="10" width="100" height="40" rx="8" fill="#ef4444" className="group-hover:fill-red-400 transition-colors" />
                <text x="175" y="35" textAnchor="middle" fill="white" fontSize="11">SQL String</text>
                <path d="M225 30 L255 30" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowJDBC)" />
                <rect x="260" y="10" width="50" height="40" rx="8" fill="#f59e0b" className="group-hover:fill-amber-400 transition-colors" />
                <text x="285" y="35" textAnchor="middle" fill="white" fontSize="10">DB</text>
                <path d="M285 50 L285 90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowJDBC)" />
                <rect x="230" y="95" width="110" height="40" rx="8" fill="#8b5cf6" className="group-hover:fill-violet-400 transition-colors" />
                <text x="285" y="120" textAnchor="middle" fill="white" fontSize="11">ResultSet</text>
                <path d="M230 115 L200 115" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowJDBC)" />
                <rect x="60" y="95" width="135" height="40" rx="8" fill="#ec489a" className="group-hover:fill-pink-400 transition-colors" />
                <text x="128" y="120" textAnchor="middle" fill="white" fontSize="10">Manual Mapping</text>
                <path d="M60 115 L30 115 L30 70" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowJDBC)" fill="none" />
                <rect x="10" y="160" width="80" height="40" rx="8" fill="#3b82f6" className="group-hover:fill-blue-400 transition-colors" />
                <text x="50" y="185" textAnchor="middle" fill="white" fontSize="12">Java Object</text>
                <defs>
                  <marker id="arrowJDBC" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
                  </marker>
                </defs>
                <text x="160" y="200" textAnchor="middle" fill="#ef4444" fontSize="11" className="font-mono">⚠️ Boilerplate + SQL Errors</text>
              </svg>
            </div>

            {/* ORM SVG */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
              <h3 className="text-xl font-bold text-center mb-3 text-green-600 dark:text-green-400">ORM (Hibernate)</h3>
              <svg viewBox="0 0 320 270" className="w-full h-auto">
                <rect x="10" y="10" width="80" height="40" rx="8" fill="#3b82f6" className="group-hover:fill-blue-400 transition-colors" />
                <text x="50" y="35" textAnchor="middle" fill="white" fontSize="12">Java Entity</text>
                <path d="M90 30 L130 30" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowORM)" />
                <rect x="135" y="10" width="100" height="40" rx="8" fill="#10b981" className="group-hover:fill-emerald-400 transition-colors" />
                <text x="185" y="35" textAnchor="middle" fill="white" fontSize="11">Session / EM</text>
                <path d="M235 30 L270 30" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowORM)" />
                <rect x="275" y="10" width="40" height="40" rx="8" fill="#f59e0b" />
                <text x="295" y="35" textAnchor="middle" fill="white" fontSize="10">DB</text>
                <path d="M295 50 L295 100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowORM)" />
                <rect x="230" y="105" width="130" height="40" rx="8" fill="#8b5cf6" className="group-hover:fill-violet-400 transition-colors" />
                <text x="295" y="130" textAnchor="middle" fill="white" fontSize="11">Auto-Mapping</text>
                <path d="M230 125 L190 125" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowORM)" />
                <rect x="60" y="105" width="125" height="40" rx="8" fill="#10b981" className="group-hover:fill-emerald-400 transition-colors" />
                <text x="123" y="130" textAnchor="middle" fill="white" fontSize="11">Java Object</text>
                <defs>
                  <marker id="arrowORM" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="#10b981" />
                  </marker>
                </defs>
                <text x="150" y="195" textAnchor="middle" fill="#10b981" fontSize="12" className="font-mono animate-softGlow">✨ Productivity + Type Safety</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Code Examples with JavaFileLoader */}
        <div className="space-y-12">
          <div
            ref={jdbcCodeRef}
            className={clsx(
              "transition-all duration-500",
              isInView.jdbcCode ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">💻 Traditional JDBC Example</h2>
            <JavaFileLoader
              fileModule={jdbcExampleCode}
              title="JdbcExample.java - Manual mapping & resource handling"
              highlightLines={[12, 13, 14, 18, 19, 20]}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">⬆️ Observe the boilerplate: DriverManager, try-catch-finally, manual iteration over ResultSet.</p>
          </div>

          <div
            ref={ormCodeRef}
            className={clsx(
              "transition-all duration-500",
              isInView.ormCode ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">✨ Hibernate ORM Example</h2>
            <JavaFileLoader
              fileModule={ormExampleCode}
              title="HibernateOrmExample.java - Clean, focused on business logic"
              highlightLines={[10, 11, 12]}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">⬆️ No SQL strings, automatic dirty checking, and built-in caching.</p>
          </div>
        </div>

        {/* Pros & Cons comparison */}
        <div
          ref={prosConsRef}
          className={clsx(
            "grid md:grid-cols-2 gap-6 my-16",
            isInView.prosCons ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 transition-all hover:shadow-lg">
            <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">✅ ORM Advantages</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Reduces boilerplate by 70-80%</li>
              <li>Object-oriented thinking, not relational</li>
              <li>Automatic query generation & caching</li>
              <li>Lazy loading, connection pooling</li>
              <li>Database vendor independence</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800 transition-all hover:shadow-lg">
            <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3">❌ JDBC Pain Points</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Manual SQL & result set mapping</li>
              <li>Boilerplate (Connection, Statement, ResultSet)</li>
              <li>SQL injection risk (if not using PreparedStatement)</li>
              <li>No built-in caching</li>
              <li>Verbose error handling</li>
            </ul>
          </div>
        </div>

        {/* Tips & Tricks and Pitfalls */}
        <div
          className={clsx(
            "mb-12 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-8 border-amber-500",
            isInView.prosCons ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>🔹 <strong>Start with JDBC</strong> to understand the underlying layers, then adopt ORM for productivity.</li>
            <li>🔹 Use <strong>JPA annotations</strong> (like @Entity) for portable ORM mapping across providers (Hibernate, EclipseLink).</li>
            <li>🔹 For complex reports, sometimes fallback to native JDBC queries inside ORM – hybrid approach works!</li>
            <li>🔹 Enable <strong>show_sql</strong> in Hibernate to inspect generated SQL.</li>
            <li>🔹 In microservices, ORM still helps; but for very high throughput, consider jOOQ or plain JDBC with caching.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ Thinking ORM is always faster – it adds overhead; complex queries need tuning.</li>
            <li>❌ Forgetting to close resources in JDBC leading to connection leaks.</li>
            <li>❌ Not understanding the N+1 query problem in ORM.</li>
            <li>❌ Using ORM without understanding underlying SQL, causing performance disasters.</li>
            <li>❌ Mixing JDBC and ORM transactions without care.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-blue-600 dark:text-blue-400 font-semibold">✅ Mini Checklist: Before using ORM, ensure you understand JDBC basics. After ORM, learn to optimize lazy loading & caching.</p>
          </div>
        </div>

        {/* Hint Section */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">If you were to build a school management system for <strong>Barrackpore High School</strong> with entities like Student, Teacher, Subject – would you write 300 lines of JDBC or use Hibernate entities? What's easier to maintain when adding a new "Attendance" feature?</p>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="ORM vs JDBC - Expert FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="🚀 ORM vs JDBC is not a war – it's about context. I've seen many professionals over-engineer ORM for tiny CRUD projects and under-engineer with raw JDBC for complex object graphs. Start with JDBC for deep understanding, then let Hibernate take the wheel. Remember, even Hibernate uses JDBC under the hood! Also, always name your entities meaningfully like 'Student' not 'Entity1' – future-you will thank." />
        </div>
      </div>
    </div>
  );
};

export default Topic0;