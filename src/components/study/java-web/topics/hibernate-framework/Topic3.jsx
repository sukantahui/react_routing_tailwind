// Topic3.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java files
import BasicEntity from "./topic3_files/BasicEntity.java?raw";
import ColumnMappings from "./topic3_files/ColumnMappings.java?raw";
import IdGeneration from "./topic3_files/IdGeneration.java?raw";
import EmbeddedExample from "./topic3_files/EmbeddedExample.java?raw";
import TemporalExample from "./topic3_files/TemporalExample.java?raw";
import AccessStrategy from "./topic3_files/AccessStrategy.java?raw";
// Import questions
import questions from "./topic3_files/topic3_questions";

const Topic3 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    annotations: false,
    columnMapping: false,
    idGen: false,
    embedded: false,
    temporal: false,
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
  const annotationsRef = useRef(null);
  const columnMappingRef = useRef(null);
  const idGenRef = useRef(null);
  const embeddedRef = useRef(null);
  const temporalRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(annotationsRef, "annotations"),
      createObserver(columnMappingRef, "columnMapping"),
      createObserver(idGenRef, "idGen"),
      createObserver(embeddedRef, "embedded"),
      createObserver(temporalRef, "temporal"),
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
    .animate-fadeSlideUp {
      animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fadeSlideUp {
        animation: none;
        opacity: 1;
        transform: translateY(0);
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            Entity Mapping
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transforming Java objects into database tables – the heart of ORM
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
            <span className="font-mono">🗺️</span> @Entity · @Table · @Id · @GeneratedValue · @Column
          </div>
        </div>

        {/* Theory: What is Entity Mapping? */}
        <div
          ref={annotationsRef}
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.annotations ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">🧩</span> What is Entity Mapping?
          </h2>
          <p className="mb-3">
            Entity mapping is the process of linking a Java class (the entity) to a database table, and its fields to table columns. In Hibernate (and JPA), this is done using <strong>annotations</strong> (modern) or XML (legacy).
          </p>
          <p className="mb-3">
            The entity represents a persistent object: it has an identity (primary key), can be loaded, saved, updated, and deleted. Hibernate manages the mapping – you work with objects, not SQL.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl mt-3 border-l-4 border-green-500">
            <p className="italic">✨ Real-world: In a school system, a <code>Student</code> entity maps to the <code>students</code> table. Swadeep's record in Java becomes a row in the database. No manual SQL needed.</p>
          </div>
        </div>

        {/* <!-- Basic Entity Example --> */}
        <div
          ref={columnMappingRef}
          className={clsx(
            "mb-16",
            isInView.columnMapping ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-4">🏷️ Basic Entity Mapping</h2>
          <JavaFileLoader
            fileModule={BasicEntity}
            title="Student.java - Minimal Entity Mapping"
            highlightLines={[3,4,5,9,10,12,13]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">⬆️ <code>@Entity</code> marks the class; <code>@Id</code> defines the primary key. Table name defaults to class name (Student → student).</p>
        </div>

        {/* <!-- Column Mappings Deep Dive --> */}
        <div
          ref={idGenRef}
          className={clsx(
            "mb-16",
            isInView.idGen ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-4">📝 Customizing Column Mapping (@Column)</h2>
          <JavaFileLoader
            fileModule={ColumnMappings}
            title="StudentDetail.java - Using @Column attributes"
            highlightLines={[11,12,13,14,15,16,17,18]}
          />
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <h4 className="font-bold">name</h4>
              <p className="text-sm">Database column name (default = field name)</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <h4 className="font-bold">nullable / unique</h4>
              <p className="text-sm">NOT NULL / UNIQUE constraints (schema generation)</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <h4 className="font-bold">length / precision / scale</h4>
              <p className="text-sm">For VARCHAR(255) or DECIMAL(10,2)</p>
            </div>
          </div>
        </div>

        {/* <!-- ID Generation Strategies --> */}
        <div
          ref={embeddedRef}
          className={clsx(
            "mb-16",
            isInView.embedded ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold mb-4">🔑 Primary Key Generation (@Id, @GeneratedValue)</h2>
          <JavaFileLoader
            fileModule={IdGeneration}
            title="IdGenerationExample.java - All Generation Strategies"
            highlightLines={[7,8,9,10,11,12,13,14,15]}
          />
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr><th className="p-2 text-left">Strategy</th><th className="p-2 text-left">Description</th><th className="p-2 text-left">Best for</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-2">IDENTITY</td><td>Auto-increment column (MySQL, SQL Server)</td><td>Simple, single-database apps</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-2">SEQUENCE</td><td>Database sequence (PostgreSQL, Oracle)</td><td>High concurrency, batch inserts</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-2">TABLE</td><td>Simulates sequence using a separate table</td><td>Portability across databases (but slower)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-2">UUID / AUTO</td><td>Let Hibernate pick (UUID or identity/sequence)</td><td>Distributed systems or when database agnostic</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-2">ASSIGNED</td><td>Application assigns ID (no generation)</td><td>Natural keys like email/username</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* <!-- Embedded Objects --> */}
        <div
          ref={temporalRef}
          className={clsx(
            "mb-16",
            isInView.temporal ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-4">🧩 Embedded Objects (@Embeddable / @Embedded)</h2>
          <p className="mb-3">Reuse common fields across multiple entities without creating a separate table.</p>
          <JavaFileLoader
            fileModule={EmbeddedExample}
            title="Address.java (Embeddable) & Employee.java (usage)"
            highlightLines={[3,4,5,6,7,8,9,10,11,12,13,14,15,16]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">⬆️ The <code>Address</code> fields become columns in the <code>Employee</code> table (e.g., <code>street</code>, <code>city</code>).</p>
        </div>

        {/* <!-- Temporal Mapping --> */}
        <div
          className={clsx(
            "mb-16",
            isInView.temporal ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold mb-4">⏰ Temporal (Date/Time) Mapping</h2>
          <JavaFileLoader
            fileModule={TemporalExample}
            title="DateEntity.java - @Temporal and Java 8 Time API"
            highlightLines={[9,10,11,12,13,14,15,16,17,18]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">💡 <strong>Best practice:</strong> Use Java 8 <code>LocalDate</code>, <code>LocalDateTime</code>, <code>Instant</code> – no <code>@Temporal</code> needed, and they handle timezone better.</p>
        </div>

        {/* <!-- Access Strategy (Field vs Property) --> */}
        <div
          className={clsx(
            "mb-16",
            isInView.temporal ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-semibold mb-4">🎯 Access Strategy: Field vs Property</h2>
          <JavaFileLoader
            fileModule={AccessStrategy}
            title="AccessStrategyDemo.java - @Access annotation"
            highlightLines={[5,6,7,8,9,10,11,12,13]}
          />
          <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p><strong>Rules:</strong></p>
            <ul className="list-disc list-inside">
              <li>If you place <code>@Id</code> on a field → field access (Hibernate reads/writes fields directly).</li>
              <li>If you place <code>@Id</code> on a getter → property access (Hibernate uses getters/setters).</li>
              <li>Mixed access (e.g., some fields private, some getters) requires <code>@Access</code> at class/field level.</li>
            </ul>
            <p className="mt-2 italic">💡 Most projects use field access (simpler, less boilerplate). Use property access when you need custom logic inside getters/setters.</p>
          </div>
        </div>

        {/* <!-- Tips & Pitfalls + Checklist --> */}
        <div
          ref={checklistRef}
          className={clsx(
            "mb-12 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-8 border-amber-500",
            isInView.checklist ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.8s" }}
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">💡 Tips & Tricks (Professional)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>🔹 Always provide a <strong>no-arg constructor</strong> (Hibernate uses it for proxy creation).</li>
            <li>🔹 Override <code>equals()</code> and <code>hashCode()</code> using the database identifier (or business key in transient state).</li>
            <li>🔹 For <code>@GeneratedValue(strategy = SEQUENCE)</code>, consider <code>@SequenceGenerator</code> to customize sequence name and allocation size.</li>
            <li>🔹 Use <code>@DynamicInsert</code> and <code>@DynamicUpdate</code> only when you have many columns and partial updates matter; otherwise they add overhead.</li>
            <li>🔹 For large text fields, use <code>@Lob</code> (CLOB) – maps to TEXT or CLOB database type.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ Forgetting <code>@Entity</code> → Hibernate ignores the class, no table created.</li>
            <li>❌ Using <code>@Id</code> on a field but also having setters that break identity contract.</li>
            <li>❌ Mutable fields in <code>equals/hashCode</code> (e.g., using name) – can break Set/HashMap behavior.</li>
            <li>❌ Not specifying <code>@Column(insertable=false, updatable=false)</code> for derived or read-only columns.</li>
            <li>❌ Using <code>Date</code> without <code>@Temporal</code> – Hibernate defaults to TIMESTAMP, perhaps not what you want.</li>
            <li>❌ Using primitive types like <code>int</code> for nullable columns – use <code>Integer</code> to represent null.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-blue-600 dark:text-blue-400 font-semibold">✅ Mini Checklist: Every entity needs @Entity, @Id, a no-arg constructor. Decide access type (field/property). Map columns explicitly if names differ. Choose ID generation strategy wisely.</p>
          </div>
        </div>

        {/* Hint */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">You are designing a library system for <strong>Barrackpore Public Library</strong>. The table <code>books</code> has columns: <code>book_id</code> (auto-increment), <code>title</code> (max 200), <code>isbn</code> (unique, nullable), <code>published_date</code> (DATE). How would you map this entity? Which ID generation? Which <code>@Column</code> attributes?</p>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Entity Mapping - Expert FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="📚 Entity mapping is the first step students often mess up. I tell them: 'An entity is just a Java class that looks like a table.' Always start by drawing the table schema on paper, then map field-by-field. And never skip @Id – Hibernate needs a primary key to track objects. For Barrackpore School's student records, try mapping Student with roll number as @Id – that's a natural key. But be careful: natural keys can change; often a synthetic ID is safer." />
        </div>
      </div>
    </div>
  );
};

export default Topic3;