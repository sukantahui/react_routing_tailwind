import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import Java files using ?raw (Vite syntax)
import persistenceXml from "./topic14_files/persistence.xml?raw";
import studentEntityJpa from "./topic14_files/StudentEntity.java?raw";
import jpaCrudExample from "./topic14_files/JpaCrudExample.java?raw";
import jpaVsHibernateExample from "./topic14_files/JpaVsHibernateExample.java?raw";

// Import FAQ questions (30 items, moderate to expert)
import questions from "./topic14_files/topic14_questions";

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

const Topic14 = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      <style>{animationStyles}</style>

      {/* Header Section */}
      <div className="animate-fade-slide-up text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
          Introduction to JPA (Java Persistence API)
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          JPA is the standard specification for object-relational mapping in Java. Learn how it provides 
          a vendor-agnostic API, how Hibernate implements it, and the key concepts like EntityManager, 
          Persistence Context, and JPQL.
        </p>
      </div>

      {/* 1. Conceptual explanation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">What is JPA?</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Jakarta Persistence API (JPA)</strong> (formerly Java Persistence API) is a specification that defines a standard 
            for object-relational mapping (ORM) and management of persistent objects in Java. JPA itself is not a product; it's a set 
            of interfaces and annotations. <strong>Hibernate</strong> is one of the most popular implementations (providers) of JPA, 
            alongside EclipseLink, OpenJPA, and others.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl border-l-4 border-green-400">
              <p className="font-semibold text-green-800 dark:text-green-200">📜 JPA Specification</p>
              <p className="text-sm">Defines the rules (javax.persistence.* or jakarta.persistence.*). No code.</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border-l-4 border-purple-400">
              <p className="font-semibold text-purple-800 dark:text-purple-200">⚙️ JPA Provider (e.g., Hibernate)</p>
              <p className="text-sm">Implements the interfaces, adds optimizations, but remains JPA-compliant.</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border-l-4 border-blue-400">
            <p className="text-sm italic text-blue-800 dark:text-blue-200">
              💡 <strong>Real-world analogy:</strong> JPA is like Bluetooth specification – many manufacturers (providers) implement it, 
              but your code works with any compliant device. At Barrackpore High School, using JPA allows switching from Hibernate to 
              EclipseLink without changing most of the code.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core JPA Concepts (Entity, Persistence Unit, EntityManager) */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4">
          JPA Building Blocks
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-bold text-lg">Entity</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">A plain Java class annotated with <code>@Entity</code>. Maps to a database table.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
            <div className="text-3xl mb-2">🗂️</div>
            <h3 className="font-bold text-lg">Persistence Unit</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Defined in <code>META-INF/persistence.xml</code>. Contains connection info, provider, entities.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
            <div className="text-3xl mb-2">🔧</div>
            <h3 className="font-bold text-lg">EntityManager</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Interface for CRUD operations, JPQL queries, managing the persistence context.</p>
          </div>
        </div>
        <JavaFileLoader
          fileModule={persistenceXml}
          title="META-INF/persistence.xml (Configuration)"
          highlightLines={[5, 8, 12]}
        />
        <JavaFileLoader
          fileModule={studentEntityJpa}
          title="StudentEntity.java (JPA Entity)"
          highlightLines={[4, 7, 10]}
        />
        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm font-mono text-amber-800 dark:text-amber-300">
            🧠 <strong>Teacher insight:</strong> A persistence unit is like a "database context" – you can have multiple units for different databases.
            The <code>persistence.xml</code> is the JPA equivalent of Hibernate's <code>hibernate.cfg.xml</code> but vendor-neutral.
          </p>
        </div>
      </section>

      {/* 3. Using EntityManager (CRUD) */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4">
          EntityManager in Action
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          <code>EntityManager</code> is the central API in JPA. It manages the lifecycle of entities, provides methods 
          like <code>persist()</code>, <code>merge()</code>, <code>remove()</code>, <code>find()</code>, and <code>createQuery()</code>.
          It also controls the persistence context (first-level cache).
        </p>
        <JavaFileLoader
          fileModule={jpaCrudExample}
          title="JpaCrudExample.java (Using EntityManager)"
          highlightLines={[15, 20, 27, 32]}
        />
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm italic text-indigo-800 dark:text-indigo-200">
            💡 Notice: No Hibernate-specific classes! This code works with any JPA provider (EclipseLink, OpenJPA, etc.).
          </p>
        </div>
      </section>

      {/* 4. JPA vs Hibernate Code Comparison */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4">
          JPA vs Hibernate API
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Hibernate is a JPA provider, but it also offers proprietary features (stateless sessions, custom caching, etc.). 
          The recommended practice is to program against JPA interfaces for portability, falling back to Hibernate-specific 
          only when needed.
        </p>
        <JavaFileLoader
          fileModule={jpaVsHibernateExample}
          title="JpaVsHibernateExample.java (Side-by-side)"
          highlightLines={[5, 18, 30]}
        />
        <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm font-mono text-yellow-800 dark:text-yellow-300">
            🔄 Pro tip: When you need Hibernate-specific features (like <code>@BatchSize</code>), annotate your entities with them – 
            they will be ignored by other providers, but your code stays JPA-compliant.
          </p>
        </div>
      </section>

      {/* 5. SVG: JPA Architecture Diagram */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4">
          🏗️ JPA Architecture Overview
        </h2>
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
          <svg viewBox="0 0 900 380" className="w-full h-auto" aria-label="JPA Architecture">
            {/* Application layer */}
            <rect x="30" y="20" width="840" height="50" rx="10" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" />
            <text x="450" y="50" textAnchor="middle" className="text-md font-bold fill-blue-800 dark:fill-blue-300">Java Application (using JPA API)</text>

            {/* Arrow down */}
            <line x1="450" y1="70" x2="450" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowDown)" />

            {/* JPA Interfaces layer */}
            <rect x="30" y="110" width="840" height="60" rx="10" fill="#10b981" fillOpacity="0.1" stroke="#10b981" />
            <text x="450" y="135" textAnchor="middle" className="text-md font-bold fill-green-800 dark:fill-green-300">JPA Interfaces (javax.persistence.*)</text>
            <text x="450" y="155" textAnchor="middle" className="text-sm fill-gray-600 dark:fill-gray-400">EntityManager, EntityTransaction, Query, CriteriaBuilder, etc.</text>

            {/* Arrow down */}
            <line x1="450" y1="170" x2="450" y2="205" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowDown)" />

            {/* JPA Provider (Hibernate) */}
            <rect x="30" y="215" width="840" height="60" rx="10" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" />
            <text x="450" y="240" textAnchor="middle" className="text-md font-bold fill-amber-800 dark:fill-amber-300">JPA Provider (e.g., Hibernate, EclipseLink)</text>
            <text x="450" y="260" textAnchor="middle" className="text-sm fill-gray-600 dark:fill-gray-400">Implements the specification, adds optimizations & extensions</text>

            {/* Arrow down */}
            <line x1="450" y1="275" x2="450" y2="310" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowDown)" />

            {/* Database */}
            <rect x="30" y="320" width="840" height="50" rx="10" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" />
            <text x="450" y="350" textAnchor="middle" className="text-md font-bold fill-red-800 dark:fill-red-300">Relational Database (JDBC)</text>

            <defs>
              <marker id="arrowDown" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            JPA provides a clean abstraction – your code stays portable across providers.
          </p>
        </div>
      </section>

      {/* 6. Common Pitfalls */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2 border-l-4 border-red-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">⚠️ Common Pitfalls & Misconceptions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: "Confusing JPA with Hibernate", desc: "Many think JPA is Hibernate – but JPA is the spec, Hibernate is an implementation.", fix: "Always refer to interfaces (EntityManager) rather than Hibernate's Session unless you need advanced features." },
            { title: "Forgetting persistence.xml location", desc: "persistence.xml must be in META-INF/ folder of classpath (e.g., src/main/resources/META-INF).", fix: "Use the correct folder structure; IDEs often help generate it." },
            { title: "Mixing JPA annotations and Hibernate XML mappings", desc: "This leads to confusion and unpredictable behavior.", fix: "Choose one approach: prefer JPA annotations for portability." },
            { title: "Not handling EntityManager lifecycle", desc: "Leaking EntityManager instances causes connection pool exhaustion.", fix: "Use try-with-resources or close() in finally block." },
          ].map((pitfall, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800/70 rounded-xl p-5 border-l-4 border-red-400 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-red-700 dark:text-red-300">{pitfall.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{pitfall.desc}</p>
              <p className="text-xs font-mono text-green-700 dark:text-green-400 mt-3">✅ {pitfall.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Best Practices */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:700ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-emerald-500 pl-4">✅ Best Practices & Industry Habits</h2>
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Program against JPA interfaces – your code remains provider-agnostic.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Use <strong>dependency injection</strong> (CDI or Spring) for EntityManager to avoid manual lifecycling.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Define persistence.xml with properties to allow override via system properties (e.g., DB credentials).</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Prefer JPQL (or Criteria API) over native SQL for portability across databases.</li>
          </ul>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
            {["Use @Entity", "Define @Id", "Place persistence.xml correctly", "Close EntityManager"].map((item, i) => (
              <div key={i} className="bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-md text-xs font-medium text-emerald-800 dark:text-emerald-200">
                📌 {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Hint Section */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards] bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">💭 Think & Experiment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Observe carefully:</strong> What happens if you call <code>entityManager.find()</code> twice within the same transaction with the same ID?</p>
            <p className="text-xs text-gray-500 mt-2">🔍 It returns the same instance (first-level cache).</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Try changing this:</strong> Switch the JPA provider from Hibernate to EclipseLink (add dependencies, change persistence.xml).</p>
            <p className="text-xs text-gray-500 mt-2">🔄 Your application code should still work.</p>
          </div>
        </div>
      </section>

      {/* 9. Pro Tips */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:900ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💎</span>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Pro Tips & Classroom shortcuts</h2>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/40 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-cyan-600">🔁</div>
            <div><strong>JPA Buddy / Dali:</strong> IDE plugins to generate persistence.xml and entities from DB schema.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">⚡</div>
            <div><strong>Use JPA static metamodel:</strong> For typesafe Criteria queries (generate classes like Student_).</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">🧩</div>
            <div><strong>Entity graphs:</strong> <code>@EntityGraph</code> to control fetch plans without changing JPQL.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">📌</div>
            <div><strong>JPA 2.2+ features:</strong> Stream results, date/time API, CDI injection into listeners.</div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Component (30 questions) */}
      <div className="animate-fade-slide-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
        <FAQTemplate title="JPA (Java Persistence API) FAQs" questions={questions} />
      </div>

      {/* 11. Teacher's Note */}
      <div className="animate-fade-slide-up [animation-delay:1100ms] opacity-0 [animation-fill-mode:forwards]">
        <Teacher note={
          "🎓 Teacher's Note: Start with a clear distinction between JPA (spec) and Hibernate (impl). Show students that by switching the provider in persistence.xml, their code still runs. " +
          "Emphasize that modern Spring Boot uses JPA by default (spring-boot-starter-data-jpa includes Hibernate but you code against JPA). " +
          "A good lab: Write a simple CRUD using EntityManager only, then replace Hibernate with EclipseLink and prove portability."
        } />
      </div>

      <div className="text-center text-xs text-gray-400 pt-6">
        Topic 14 — Introduction to JPA (Java Persistence API) | Industry-grade best practices
      </div>
    </div>
  );
};

export default Topic14;