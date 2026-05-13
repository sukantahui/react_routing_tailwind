import React from "react";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import Java files using ?raw (Vite syntax)
import criteriaBasicExample from "./topic10_files/CriteriaBasicExample.java?raw";
import criteriaDynamicFilters from "./topic10_files/CriteriaDynamicFilters.java?raw";
import hqlAggregation from "./topic10_files/HqlAggregation.java?raw";
import hqlSubquery from "./topic10_files/HqlSubquery.java?raw";
import jpaCriteriaBuilder from "./topic10_files/JpaCriteriaBuilder.java?raw";

// Import FAQ questions
import questions from "./topic10_files/topic10_questions";

// Keyframes for animations
const animationStyles = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-slide-up {
    animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
  }
  @keyframes softGlow {
    0% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
    50% { box-shadow: 0 0 0 6px rgba(59,130,246,0.2); }
    100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
  }
  .animate-soft-glow { animation: softGlow 1.2s ease-in-out 2; }
`;

const Topic10 = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      <style>{animationStyles}</style>

      {/* Header Section */}
      <div className="animate-fade-slide-up text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
          Criteria API & HQL Advanced Queries
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Move beyond simple CRUD – master dynamic queries with Criteria API (type‑safe, programmatic) 
          and advanced HQL features (joins, subqueries, aggregation, DTO projections). Build flexible 
          search screens and complex reports with confidence.
        </p>
      </div>

      {/* 1. Conceptual explanation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Why Criteria & Advanced HQL?</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            HQL (Hibernate Query Language) is great for static, known queries. But when you need to 
            conditionally add filters, sort fields, or build multi-tenant queries dynamically, 
            <strong className="font-semibold"> Criteria API</strong> (JPA 2.0+ – <code>CriteriaBuilder</code>) provides a 
            type‑safe, programmatic way to construct queries without string concatenation.
            <br/><br/>
            <strong>Advanced HQL</strong> takes you beyond basic SELECT: joins between unrelated entities, 
            subqueries in SELECT/WHERE, aggregations with GROUP BY, and DTO projections.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl border-l-4 border-green-400">
              <p className="font-semibold text-green-800 dark:text-green-200">🎯 When to use Criteria API</p>
              <p className="text-sm">Dynamic search forms, user‑specified filters, variable sorting, multi‑tenant conditions.</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border-l-4 border-purple-400">
              <p className="font-semibold text-purple-800 dark:text-purple-200">📊 When to use advanced HQL</p>
              <p className="text-sm">Complex reporting, aggregations, cross‑entity joins, subqueries, DTO projections.</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border-l-4 border-blue-400">
            <p className="text-sm italic text-blue-800 dark:text-blue-200">
              💡 <strong>Real‑world scenario:</strong> At Barrackpore High School, the attendance report page needs dynamic 
              filtering by date range, class, and student name. Criteria API builds the query on‑the‑fly, while HQL’s 
              aggregation counts presents per month.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Criteria API – Basic Example */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4">
          Criteria API (JPA 2.0 CriteriaBuilder)
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The JPA Criteria API is type‑safe and uses metamodel classes (or string paths). It’s ideal for dynamic queries.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <JavaFileLoader
            fileModule={criteriaBasicExample}
            title="CriteriaBasicExample.java (Simple Criteria)"
            highlightLines={[8, 12, 18]}
          />
          <JavaFileLoader
            fileModule={criteriaDynamicFilters}
            title="CriteriaDynamicFilters.java (Conditional WHERE)"
            highlightLines={[10, 15, 22]}
          />
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm font-mono text-amber-800 dark:text-amber-300">
            🧠 <strong>Insight:</strong> If you use Hibernate’s legacy <code>org.hibernate.Criteria</code> (deprecated since 5.2), 
            migrate to JPA <code>CriteriaBuilder</code> – it’s future‑proof and portable.
          </p>
        </div>
      </section>

      {/* 3. Advanced HQL – Aggregation, Subqueries, DTO */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4">
          Advanced HQL Techniques
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <JavaFileLoader
            fileModule={hqlAggregation}
            title="HqlAggregation.java (GROUP BY, COUNT, AVG)"
            highlightLines={[8, 12, 20]}
          />
          <JavaFileLoader
            fileModule={hqlSubquery}
            title="HqlSubquery.java (Subqueries in SELECT/WHERE)"
            highlightLines={[9, 14]}
          />
        </div>
        <div className="mt-4">
          <JavaFileLoader
            fileModule={jpaCriteriaBuilder}
            title="JpaCriteriaBuilder.java (Group by, having, order by)"
            highlightLines={[10, 16, 22]}
          />
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm italic text-indigo-800 dark:text-indigo-200">
            💡 <strong>Pro tip:</strong> DTO projections with <code>SELECT new</code> are far more efficient than returning full entities 
            for read‑only reports – less memory, no dirty checking.
          </p>
        </div>
      </section>

      {/* 4. SVG: Dynamic Query Building Flow */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4">
          🔄 Dynamic Query Building with Criteria API
        </h2>
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
          <svg viewBox="0 0 900 240" className="w-full h-auto" aria-label="Criteria flow">
            <rect x="20" y="30" width="160" height="60" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
            <text x="100" y="55" textAnchor="middle" className="text-sm font-semibold fill-blue-800 dark:fill-blue-300">User Input</text>
            <text x="100" y="75" textAnchor="middle" className="text-xs">filters / sorting</text>
            <line x1="180" y1="60" x2="230" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="240" y="30" width="180" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
            <text x="330" y="55" textAnchor="middle" className="text-sm font-semibold fill-green-800 dark:fill-green-300">CriteriaBuilder</text>
            <text x="330" y="75" textAnchor="middle" className="text-xs">create predicates</text>
            <line x1="420" y1="60" x2="470" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="480" y="30" width="180" height="60" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
            <text x="570" y="55" textAnchor="middle" className="text-sm font-semibold fill-amber-800 dark:fill-amber-300">Build Query</text>
            <text x="570" y="75" textAnchor="middle" className="text-xs">add WHERE/ORDER BY</text>
            <line x1="660" y1="60" x2="710" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="720" y="30" width="160" height="60" rx="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
            <text x="800" y="55" textAnchor="middle" className="text-sm font-semibold fill-red-800 dark:fill-red-300">Execute &amp; get results</text>

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Criteria API builds queries incrementally based on runtime conditions – no string concatenation, safe from injection.
          </p>
        </div>
      </section>

      {/* 5. Common Pitfalls */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2 border-l-4 border-red-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">⚠️ Common Pitfalls</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: "Forgetting to add join for nested paths", desc: "Using root.get(\"address.city\") without join leads to error.", fix: "Join<Student, Address> addressJoin = root.join(\"address\"); then addressJoin.get(\"city\")." },
            { title: "Misusing Hibernate’s legacy Criteria (deprecated)", desc: "org.hibernate.Criteria is deprecated and less type‑safe.", fix: "Migrate to JPA CriteriaBuilder." },
            { title: "Cartesian product with multiple joins", desc: "Fetching two collections in Criteria may cause huge result sets.", fix: "Use distinct or batch fetching." },
            { title: "Missing DISTINCT in subqueries", desc: "Subqueries returning many duplicates can be slow.", fix: "Add distinct() inside the subquery." },
          ].map((pitfall, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800/70 rounded-xl p-5 border-l-4 border-red-400 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-red-700 dark:text-red-300">{pitfall.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{pitfall.desc}</p>
              <p className="text-xs font-mono text-green-700 dark:text-green-400 mt-3">✅ {pitfall.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Best Practices */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-emerald-500 pl-4">✅ Best Practices</h2>
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>✓ <strong>Use static metamodel</strong> – generate `Student_` classes for type‑safe Criteria queries.</li>
            <li>✓ <strong>Prefer DTO projections</strong> (`SELECT new`) for read‑only reports to avoid persistent state overhead.</li>
            <li>✓ <strong>Always paginate</strong> – use `setFirstResult` / `setMaxResults` for large result sets.</li>
            <li>✓ <strong>Index your WHERE and JOIN columns</strong> – both JPQL/Criteria queries benefit.</li>
          </ul>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
            {["Use DTOs for reports", "Add indexes", "Prefer JPA Criteria", "Limit result size"].map((item, i) => (
              <div key={i} className="bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-md text-xs font-medium text-emerald-800 dark:text-emerald-200">
                📌 {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Hint Section */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:700ms] opacity-0 [animation-fill-mode:forwards] bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">💭 Think & Experiment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Observe carefully:</strong> Write a HQL query with `JOIN FETCH`; then write the same query using Criteria API.</p>
            <p className="text-xs text-gray-500 mt-2">🔍 Criteria needs `.fetch("association", JoinType.LEFT)` to emulate JOIN FETCH.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Try changing this:</strong> Replace an entity‑returning query with a DTO projection using `SELECT new`.</p>
            <p className="text-xs text-gray-500 mt-2">🔄 Compare memory usage and execution time.</p>
          </div>
        </div>
      </section>

      {/* 8. Pro Tips */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💎</span>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Pro Tips & Classroom shortcuts</h2>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/40 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-cyan-600">🔁</div>
            <div><strong>Static metamodel generation:</strong> Use Hibernate JPA 2 Metamodel Generator (annotation processor) to create type‑safe `*_` classes.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">⚡</div>
            <div><strong>Subquery in FROM clause:</strong> Hibernate supports it via `FROM (SELECT ...)` but use native SQL if needed.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">🧩</div>
            <div><strong>Dynamic sorting:</strong> Use `criteriaQuery.orderBy(cb.asc(root.get(sortField)))` where `sortField` is user‑provided.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">📌</div>
            <div><strong>Performance monitor:</strong> Enable `hibernate.generate_statistics` and log to spot Criteria inefficiencies.</div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Component */}
      <div className="animate-fade-slide-up [animation-delay:900ms] opacity-0 [animation-fill-mode:forwards]">
        <FAQTemplate title="Criteria API & Advanced HQL FAQs" questions={questions} />
      </div>

      {/* 10. Teacher's Note */}
      <div className="animate-fade-slide-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
        <Teacher note={
          "🎓 Teacher's Note: Students often struggle with Criteria API’s verbosity. Show them how a simple search form with 3 conditional filters becomes ugly with string concatenation but elegant with predicates. Use the static metamodel to avoid magic strings. A challenging lab: build a real search/filter UI (using student and course data) and implement the backend using Criteria – then compare the SQL output with HQL."
        } />
      </div>

      <div className="text-center text-xs text-gray-400 pt-6">
        Topic 10 — Criteria API & HQL Advanced Queries | Industry-grade best practices
      </div>
    </div>
  );
};

export default Topic10;