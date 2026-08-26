// Topic7.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java files
import SingleTable from "./topic7_files/SingleTable.java?raw";
import JoinedTable from "./topic7_files/JoinedTable.java?raw";
import TablePerClass from "./topic7_files/TablePerClass.java?raw";
import MappedSuperclass from "./topic7_files/MappedSuperclass.java?raw";
import PolymorphicQueries from "./topic7_files/PolymorphicQueries.java?raw";
// Import questions
import questions from "./topic7_files/topic7_questions";

const Topic7 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    single: false,
    joined: false,
    tablePerClass: false,
    mappedSuperclass: false,
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
  const singleRef = useRef(null);
  const joinedRef = useRef(null);
  const tablePerClassRef = useRef(null);
  const mappedSuperclassRef = useRef(null);
  const comparisonRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(singleRef, "single"),
      createObserver(joinedRef, "joined"),
      createObserver(tablePerClassRef, "tablePerClass"),
      createObserver(mappedSuperclassRef, "mappedSuperclass"),
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400">
            Inheritance Mapping Strategies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Mapping object-oriented inheritance to relational tables
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 text-sm">
            <span className="font-mono">🧬</span> SINGLE_TABLE · JOINED · TABLE_PER_CLASS · @MappedSuperclass
          </div>
        </div>

        {/* Theory: Why Inheritance Mapping? */}
        <div
          ref={introRef}
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.intro ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">📊</span> The Object-Relational Impedance Mismatch
          </h2>
          <p className="mb-3">
            Relational databases don't support inheritance. Hibernate provides four strategies to map a class hierarchy (parent and child classes) to tables, each with trade-offs in performance, data normalization, and query complexity.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <strong>🎯 Example:</strong> Payment abstract class with CreditCardPayment, CashPayment, ChequePayment subclasses.
            </div>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl mt-4 border-l-4 border-pink-500">
            <p className="italic">✨ Real-world: <strong>Barrackpore School Fee System</strong> – different payment methods share common fields (amount, date) but have unique fields (cardNumber, chequeNumber). Choosing the right strategy impacts query speed and schema complexity.</p>
          </div>
        </div>

        {/* SINGLE_TABLE Strategy */}
        <div
          ref={singleRef}
          className={clsx(
            "mb-16",
            isInView.single ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">📋 SINGLE_TABLE Strategy</h2>
          <p className="mb-2">One table for the entire hierarchy, with a discriminator column to identify the subtype.</p>
          <JavaFileLoader
            fileModule={SingleTable}
            title="SingleTable.java - @Inheritance(strategy = InheritanceType.SINGLE_TABLE)"
            highlightLines={[3,4,5,6,7,8,9,10]}
          />
          <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">✅ <strong>Pros:</strong> Fastest polymorphic queries, no joins.</div>
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">❌ <strong>Cons:</strong> Wasted space (nullable columns), column limits, not normalized.</div>
          </div>
        </div>

        {/* JOINED Strategy */}
        <div
          ref={joinedRef}
          className={clsx(
            "mb-16",
            isInView.joined ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🔗 JOINED Strategy</h2>
          <p className="mb-2">One table for the parent, separate tables for each child, linked by foreign key.</p>
          <JavaFileLoader
            fileModule={JoinedTable}
            title="JoinedTable.java - @Inheritance(strategy = InheritanceType.JOINED)"
            highlightLines={[3,4,5,6,7,8]}
          />
          <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">✅ <strong>Pros:</strong> Normalized, no wasted columns, easy to add subtypes.</div>
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">❌ <strong>Cons:</strong> Joins required for queries (slower for large hierarchies).</div>
          </div>
        </div>

        {/* TABLE_PER_CLASS Strategy */}
        <div
          ref={tablePerClassRef}
          className={clsx(
            "mb-16",
            isInView.tablePerClass ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">📁 TABLE_PER_CLASS Strategy</h2>
          <p className="mb-2">Each concrete class has its own table, containing all fields (including inherited). Parent table not created.</p>
          <JavaFileLoader
            fileModule={TablePerClass}
            title="TablePerClass.java - @Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)"
            highlightLines={[3,4,5,6]}
          />
          <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">✅ <strong>Pros:</strong> No joins, each table independent.</div>
            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">❌ <strong>Cons:</strong> Polymorphic queries use UNION (slow), duplicate columns across tables, ID generation issues.</div>
          </div>
        </div>

        {/* @MappedSuperclass (Not an inheritance strategy but related) */}
        <div
          ref={mappedSuperclassRef}
          className={clsx(
            "mb-16",
            isInView.mappedSuperclass ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🧩 @MappedSuperclass (Shared fields, no inheritance in DB)</h2>
          <p className="mb-2">Parent is not an entity; its fields are copied into child entity tables. No polymorphic queries.</p>
          <JavaFileLoader
            fileModule={MappedSuperclass}
            title="MappedSuperclass.java - Reusable fields but no relationship"
            highlightLines={[3,4,5,6,7,8,9]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">⚠️ Use when you just want common fields (like id, createdAt, updatedAt) without inheritance behavior. No @Inheritance annotation needed.</p>
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
          <h2 className="text-2xl font-semibold mb-4">📊 Strategy Comparison</h2>
          <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr><th className="p-3 text-left">Strategy</th><th className="p-3 text-left">Tables</th><th className="p-3 text-left">Columns</th><th className="p-3 text-left">Polymorphic Query</th><th className="p-3 text-left">Best For</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-3 font-medium">SINGLE_TABLE</td><td>1</td><td>All fields + discriminator</td><td>Fast, no join</td><td>Small hierarchies, few nullable columns</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-3 font-medium">JOINED</td><td>N+1 (N = subclasses)</td><td>Normalized</td><td>Joins required</td><td>Normalized schema, many subtypes</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-3 font-medium">TABLE_PER_CLASS</td><td>1 per concrete class</td><td>All fields duplicated</td><td>UNION queries</td><td>Rarely used – avoid</td></tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50"><td className="p-3 font-medium">@MappedSuperclass</td><td>As per children</td><td>Fields copied</td><td>None (no polymorphism)</td><td>Shared fields without inheritance</td></tr>
            </tbody>
          </table>
        </div>

        {/* Polymorphic Queries Example */}
        <div
          ref={comparisonRef}
          className={clsx(
            "mb-16",
            isInView.comparison ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🔍 Polymorphic Queries</h2>
          <JavaFileLoader
            fileModule={PolymorphicQueries}
            title="PolymorphicQueries.java - Querying the base class returns all subtypes"
            highlightLines={[8,9,10,11,12,13]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">✅ HQL "FROM Payment" returns CreditCardPayment, CashPayment, ChequePayment objects. No special syntax needed.</p>
        </div>

        {/* Tips & Pitfalls + Checklist */}
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
            <li>🔹 <strong>SINGLE_TABLE</strong> is the default and usually the best for most applications due to performance.</li>
            <li>🔹 Use <code>@DiscriminatorColumn</code> and <code>@DiscriminatorValue</code> to customize discriminator.</li>
            <li>🔹 <strong>JOINED</strong> is good for deep hierarchies or when subtypes have many unique fields and nulls are undesirable.</li>
            <li>🔹 Avoid <strong>TABLE_PER_CLASS</strong> – it causes issues with identity generation and polymorphic queries use UNION which is slow.</li>
            <li>🔹 For pure code reuse without persistence behavior, use <code>@MappedSuperclass</code> (e.g., common audit fields).</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ Forgetting <code>@Inheritance</code> annotation – defaults to SINGLE_TABLE, but you must know that.</li>
            <li>❌ Not specifying discriminator column for SINGLE_TABLE – Hibernate uses default "DTYPE".</li>
            <li>❌ Using TABLE_PER_CLASS with <code>@GeneratedValue(strategy = IDENTITY)</code> – doesn't work properly across tables.</li>
            <li>❌ Querying base class and getting all subtypes when you only wanted one type – use <code>TYPE</code> operator.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-pink-600 dark:text-pink-400 font-semibold">✅ Mini Checklist: Choose strategy based on normalization vs performance. SINGLE_TABLE for most cases. JOINED for strict normalization. Avoid TABLE_PER_CLASS. Use @MappedSuperclass for shared fields only.</p>
          </div>
        </div>

        {/* Hint */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">You have a class hierarchy: Vehicle (abstract) → Car, Bike, Truck. Car has 'doorCount', Bike has 'hasGear', Truck has 'loadCapacity'. Which strategy avoids many nullable columns? Which strategy gives fastest query for "SELECT * FROM Vehicle"? Which strategy would you choose if you expect many new subclasses?</p>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Inheritance Mapping - Expert FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="🧬 Inheritance mapping confuses students because databases don't inherit. I use an analogy: SINGLE_TABLE is like a spreadsheet with many empty cells; JOINED is like a relational database with foreign keys; TABLE_PER_CLASS is like separate Excel files for each subtype. Always demonstrate the SQL generated for each strategy – that clarifies the trade-offs. For <strong>Ichapur School</strong> payment system, I'd start with SINGLE_TABLE until nullable columns become a problem." />
        </div>
      </div>
    </div>
  );
};

export default Topic7;