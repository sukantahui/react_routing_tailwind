// Topic5.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java files
import BasicHql from "./topic5_files/BasicHql.java?raw";
import WhereHql from "./topic5_files/WhereHql.java?raw";
import JoinsHql from "./topic5_files/JoinsHql.java?raw";
import AggregatesHql from "./topic5_files/AggregatesHql.java?raw";
import ParametersHql from "./topic5_files/ParametersHql.java?raw";
import NamedQueries from "./topic5_files/NamedQueries.java?raw";
import PaginationHql from "./topic5_files/PaginationHql.java?raw";
// Import questions
import questions from "./topic5_files/topic5_questions";

const Topic5 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    basic: false,
    where: false,
    joins: false,
    aggregates: false,
    parameters: false,
    named: false,
    pagination: false,
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
  const basicRef = useRef(null);
  const whereRef = useRef(null);
  const joinsRef = useRef(null);
  const aggregatesRef = useRef(null);
  const parametersRef = useRef(null);
  const namedRef = useRef(null);
  const paginationRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(basicRef, "basic"),
      createObserver(whereRef, "where"),
      createObserver(joinsRef, "joins"),
      createObserver(aggregatesRef, "aggregates"),
      createObserver(parametersRef, "parameters"),
      createObserver(namedRef, "named"),
      createObserver(paginationRef, "pagination"),
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
            Hibernate Query Language (HQL)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Object-oriented queries that work with entities, not tables
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-sm">
            <span className="font-mono">📊</span> FROM · WHERE · JOIN · GROUP BY · ORDER BY
          </div>
        </div>

        {/* Theory: What is HQL? */}
        <div
          ref={introRef}
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.intro ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">🔍</span> What is HQL?
          </h2>
          <p className="mb-3">
            <strong>Hibernate Query Language (HQL)</strong> is an object-oriented query language, similar to SQL, but instead of table and column names, you use Java class and property names. HQL queries are translated by Hibernate into SQL for the target database.
          </p>
          <p className="mb-3">
            Benefits: database independence, polymorphic queries, support for joins, pagination, named parameters, and aggregate functions.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <strong>SQL:</strong><br/>
              <code>SELECT * FROM students WHERE city = 'Barrackpore'</code>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <strong>HQL:</strong><br/>
              <code>FROM Student s WHERE s.city = 'Barrackpore'</code>
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl mt-4 border-l-4 border-orange-500">
            <p className="italic">✨ Real-world: In a school management system for <strong>Ichapur High School</strong>, you can write <code>"FROM Student s WHERE s.classroom = '10A'"</code> – no table names, no column names, just Java objects.</p>
          </div>
        </div>

        {/* Basic HQL */}
        <div
          ref={basicRef}
          className={clsx(
            "mb-16",
            isInView.basic ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">📘 Basic HQL Queries</h2>
          <JavaFileLoader
            fileModule={BasicHql}
            title="BasicHql.java - Simple SELECT, aliases, ORDER BY"
            highlightLines={[10,11,12,13,14,15]}
          />
        </div>

        {/* WHERE Clause */}
        <div
          ref={whereRef}
          className={clsx(
            "mb-16",
            isInView.where ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🔍 Filtering with WHERE</h2>
          <JavaFileLoader
            fileModule={WhereHql}
            title="WhereHql.java - Conditions, logical operators, BETWEEN, LIKE, IN"
            highlightLines={[12,13,14,15,16]}
          />
        </div>

        {/* Joins */}
        <div
          ref={joinsRef}
          className={clsx(
            "mb-16",
            isInView.joins ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🤝 Joins in HQL</h2>
          <JavaFileLoader
            fileModule={JoinsHql}
            title="JoinsHql.java - INNER JOIN, LEFT JOIN, FETCH JOIN"
            highlightLines={[13,14,15,16,17,18,19]}
          />
          <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
            <strong>💡 JOIN FETCH:</strong> Solves N+1 problem by retrieving associations in a single query.
          </div>
        </div>

        {/* Aggregate Functions */}
        <div
          ref={aggregatesRef}
          className={clsx(
            "mb-16",
            isInView.aggregates ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">📈 Aggregate Functions & GROUP BY</h2>
          <JavaFileLoader
            fileModule={AggregatesHql}
            title="AggregatesHql.java - COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING"
            highlightLines={[14,15,16,17,18,19]}
          />
        </div>

        {/* Parameter Binding */}
        <div
          ref={parametersRef}
          className={clsx(
            "mb-16",
            isInView.parameters ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🔗 Named & Positional Parameters</h2>
          <JavaFileLoader
            fileModule={ParametersHql}
            title="ParametersHql.java - Named parameters (:name) and positional (?)"
            highlightLines={[12,13,14,15,16]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">✅ Always use <strong>named parameters</strong> for readability and safety (prevents SQL injection).</p>
        </div>

        {/* Named Queries */}
        <div
          ref={namedRef}
          className={clsx(
            "mb-16",
            isInView.named ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🏷️ Named Queries (Predefined HQL)</h2>
          <JavaFileLoader
            fileModule={NamedQueries}
            title="NamedQueries.java - @NamedQuery annotation and XML definition"
            highlightLines={[5,6,7,8,9,10,11,12,13]}
          />
        </div>

        {/* Pagination */}
        <div
          ref={paginationRef}
          className={clsx(
            "mb-16",
            isInView.pagination ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.8s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">📄 Pagination with setFirstResult() & setMaxResults()</h2>
          <JavaFileLoader
            fileModule={PaginationHql}
            title="PaginationHql.java - Page through results efficiently"
            highlightLines={[10,11,12]}
          />
        </div>

        {/* Tips & Pitfalls + Checklist */}
        <div
          ref={checklistRef}
          className={clsx(
            "mb-12 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-8 border-amber-500",
            isInView.checklist ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.9s" }}
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>🔹 Use <strong>named parameters</strong> (<code>:name</code>) instead of positional parameters – more readable and maintainable.</li>
            <li>🔹 <strong>JOIN FETCH</strong> is your best friend for avoiding LazyInitializationException, but beware of cartesian products if you fetch multiple collections.</li>
            <li>🔹 Always use <strong>projections</strong> (SELECT specific fields) when you don't need full entities – reduces memory and network overhead.</li>
            <li>🔹 For dynamic queries, consider <strong>Criteria API</strong> or <strong>JPA Specification</strong> instead of string concatenation.</li>
            <li>🔹 Enable <code>hibernate.show_sql</code> and <code>hibernate.format_sql</code> to see the generated SQL – helps understand performance.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ Using table/column names instead of entity/property names → Hibernate throws QuerySyntaxException.</li>
            <li>❌ Forgetting the <code>SELECT</code> keyword – "FROM Student" works, but "SELECT s FROM Student s" is clearer.</li>
            <li>❌ Using <code>JOIN FETCH</code> on multiple collections → cartesian product, may return huge result sets.</li>
            <li>❌ Not handling <code>NoResultException</code> – <code>uniqueResult()</code> can return null only if you use <code>getSingleResult()</code> (throws).</li>
            <li>❌ Using <code>list()</code> for huge result sets without pagination → memory overload.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-orange-600 dark:text-orange-400 font-semibold">✅ Mini Checklist: Always test HQL on a small dataset first. Use named parameters. For joins, prefer <code>JOIN FETCH</code> only when needed. Enable SQL logging for debugging.</p>
          </div>
        </div>

        {/* Hint */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">You need to find all students from <strong>Shyamnagar</strong> who scored above 80% in Mathematics. Their addresses and marks are in separate related entities. Would you write a single HQL with JOIN FETCH, or fetch students first then lazily load marks? How many queries would each approach generate?</p>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Hibernate Query Language (HQL) - Expert FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="📖 HQL is one of the most powerful features of Hibernate. Students often struggle switching from SQL mindset. I tell them: 'Forget columns; think objects and their fields.' Show the generated SQL side-by-side – that's the 'aha!' moment. Also, demonstrate the N+1 problem with a loop and then show how JOIN FETCH magically reduces it to one query. They'll appreciate HQL's elegance." />
        </div>
      </div>
    </div>
  );
};

export default Topic5;