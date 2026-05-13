// Topic6.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java files
import OneToOne from "./topic6_files/OneToOne.java?raw";
import OneToMany from "./topic6_files/OneToMany.java?raw";
import ManyToOne from "./topic6_files/ManyToOne.java?raw";
import ManyToMany from "./topic6_files/ManyToMany.java?raw";
import CascadeExample from "./topic6_files/CascadeExample.java?raw";
import OrphanRemoval from "./topic6_files/OrphanRemoval.java?raw";
// Import questions
import questions from "./topic6_files/topic6_questions";

const Topic6 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    oneToOne: false,
    oneToMany: false,
    manyToOne: false,
    manyToMany: false,
    cascade: false,
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
  const oneToOneRef = useRef(null);
  const oneToManyRef = useRef(null);
  const manyToOneRef = useRef(null);
  const manyToManyRef = useRef(null);
  const cascadeRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(oneToOneRef, "oneToOne"),
      createObserver(oneToManyRef, "oneToMany"),
      createObserver(manyToOneRef, "manyToOne"),
      createObserver(manyToManyRef, "manyToMany"),
      createObserver(cascadeRef, "cascade"),
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Relationship Mappings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connecting entities: One-to-One, One-to-Many, Many-to-One, Many-to-Many
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm">
            <span className="font-mono">🔗</span> @OneToOne · @OneToMany · @ManyToOne · @ManyToMany · Cascade
          </div>
        </div>

        {/* Theory: Why Relationships? */}
        <div
          ref={introRef}
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.intro ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">🧩</span> Why Entity Relationships?
          </h2>
          <p className="mb-3">
            Real-world data is connected. A student has an address (one-to-one), a student belongs to a classroom (many-to-one), a classroom has many students (one-to-many), and a student can enroll in many courses while a course has many students (many-to-many). Hibernate maps these relationships using annotations, preserving referential integrity and enabling object navigation.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <strong>📌 One-to-One</strong>: Person ↔ Passport, Student ↔ Locker
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <strong>📌 One-to-Many / Many-to-One</strong>: Classroom → Students (bidirectional)
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <strong>📌 Many-to-Many</strong>: Student ↔ Course (via join table)
            </div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl mt-4 border-l-4 border-indigo-500">
            <p className="italic">✨ Real-world: At <strong>Naihati High School</strong>, a Student has one Address, one Classroom (many-to-one), and many Courses (many-to-many). Hibernate lets us navigate like <code>student.getCourses()</code> without writing JOIN queries.</p>
          </div>
        </div>

        {/* One-to-One */}
        <div
          ref={oneToOneRef}
          className={clsx(
            "mb-16",
            isInView.oneToOne ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🔂 One-to-One Mapping</h2>
          <p className="mb-2">Two entities share a unique relationship. One side is the owner (with foreign key), the other uses <code>mappedBy</code>.</p>
          <JavaFileLoader
            fileModule={OneToOne}
            title="OneToOne.java - Person ↔ Passport (shared primary key / foreign key)"
            highlightLines={[6,7,8,9,10,11,12,13]}
          />
        </div>

        {/* One-to-Many & Many-to-One */}
        <div
          ref={oneToManyRef}
          className={clsx(
            "mb-16",
            isInView.oneToMany ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">📦 One-to-Many (Bidirectional)</h2>
          <JavaFileLoader
            fileModule={OneToMany}
            title="OneToMany.java - Classroom → Students (One-to-Many)"
            highlightLines={[8,9,10,11,12,13,14,15]}
          />
        </div>

        <div
          ref={manyToOneRef}
          className={clsx(
            "mb-16",
            isInView.manyToOne ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">👥 Many-to-One (the owning side)</h2>
          <JavaFileLoader
            fileModule={ManyToOne}
            title="ManyToOne.java - Student → Classroom (Many-to-One)"
            highlightLines={[9,10,11]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">✅ In bidirectional one-to-many, the many side (with <code>@ManyToOne</code>) is the owner; the one side uses <code>mappedBy</code>.</p>
        </div>

        {/* Many-to-Many */}
        <div
          ref={manyToManyRef}
          className={clsx(
            "mb-16",
            isInView.manyToMany ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🔄 Many-to-Many</h2>
          <p className="mb-2">Uses a join table. Can be unidirectional or bidirectional.</p>
          <JavaFileLoader
            fileModule={ManyToMany}
            title="ManyToMany.java - Student ↔ Course (with join table)"
            highlightLines={[8,9,10,11,12,13,14,15,16,17]}
          />
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded mt-3 text-sm">
            <strong>⚠️ Warning:</strong> Avoid cascading ALL on ManyToMany – may cause unintended deletes.
          </div>
        </div>

        {/* Cascade and Orphan Removal */}
        <div
          ref={cascadeRef}
          className={clsx(
            "mb-16",
            isInView.cascade ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">⛓️ Cascade Types & Orphan Removal</h2>
          <JavaFileLoader
            fileModule={CascadeExample}
            title="CascadeExample.java - PERSIST, MERGE, REMOVE, ALL, DETACH, REFRESH"
            highlightLines={[6,7,8,9,10]}
          />
          <JavaFileLoader
            fileModule={OrphanRemoval}
            title="OrphanRemoval.java - When a child is removed from collection, it is deleted"
            highlightLines={[6,7]}
          />
          <div className="grid md:grid-cols-3 gap-3 mt-3 text-sm">
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded"><strong>CascadeType.PERSIST</strong> – save child when parent saves</div>
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded"><strong>CascadeType.REMOVE</strong> – delete child when parent deleted</div>
            <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded"><strong>orphanRemoval=true</strong> – delete child when removed from collection</div>
          </div>
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
            <li>🔹 <strong>Always set both sides</strong> of bidirectional relationships in code – don't rely on Hibernate to fix them.</li>
            <li>🔹 Use <code>@JoinColumn(name="fk_column")</code> to customize foreign key name.</li>
            <li>🔹 Prefer <code>Set</code> over <code>List</code> for collections to avoid duplicate entries and performance issues.</li>
            <li>🔹 <strong>LAZY</strong> is default for <code>@OneToMany</code> and <code>@ManyToMany</code> – that's good. Use <code>JOIN FETCH</code> when needed.</li>
            <li>🔹 For many-to-many with extra columns (e.g., enrollment date), create an intermediate entity (<code>@ManyToOne</code> on both sides with additional fields).</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ Forgetting <code>mappedBy</code> on the inverse side → Hibernate creates two foreign keys.</li>
            <li>❌ Using <code>CascadeType.REMOVE</code> on many-to-many – deletes unrelated entities.</li>
            <li>❌ Not overriding <code>equals/hashCode</code> when using Set → duplicates or missing items.</li>
            <li>❌ Fetching large collections eagerly → performance disaster.</li>
            <li>❌ Modifying collection while iterating → <code>ConcurrentModificationException</code>.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold">✅ Mini Checklist: Decide which side is owner (the one with foreign key). Use <code>mappedBy</code> on the inverse side. Default to LAZY. Test bidirectional synchronization with helper methods.</p>
          </div>
        </div>

        {/* Hint */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">Designing a library system for <strong>Barrackpore Town Library</strong>. A <code>Member</code> can borrow many <code>Book</code>s, but a book can be borrowed by only one member at a time. What relationship is that? Is it unidirectional or bidirectional? How would you map the borrowing date? That's a many-to-many with extra attributes, so you'd need an intermediate entity <code>BorrowRecord</code>.</p>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Relationship Mappings - Expert FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="📌 Relationships are often the hardest part for students. The key is to first draw the ER diagram on paper, then decide the owner side. I always tell them: 'The side that holds the foreign key is the owner, and it gets @JoinColumn. The other side has mappedBy.' Also, demonstrate the N+1 problem with a loop over students and accessing their courses – then show how JOIN FETCH solves it. Cascade should be used sparingly – ALL is dangerous." />
        </div>
      </div>
    </div>
  );
};

export default Topic6;