// Topic4.jsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
// Import Java files
import CreateExample from "./topic4_files/CreateExample.java?raw";
import ReadExample from "./topic4_files/ReadExample.java?raw";
import UpdateExample from "./topic4_files/UpdateExample.java?raw";
import DeleteExample from "./topic4_files/DeleteExample.java?raw";
import CrudComplete from "./topic4_files/CrudComplete.java?raw";
// Import questions
import questions from "./topic4_files/topic4_questions";

const Topic4 = () => {
  const [isInView, setIsInView] = useState({
    intro: false,
    create: false,
    read: false,
    update: false,
    delete: false,
    complete: false,
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
  const createRef = useRef(null);
  const readRef = useRef(null);
  const updateRef = useRef(null);
  const deleteRef = useRef(null);
  const completeRef = useRef(null);
  const checklistRef = useRef(null);

  useEffect(() => {
    const observers = [
      createObserver(introRef, "intro"),
      createObserver(createRef, "create"),
      createObserver(readRef, "read"),
      createObserver(updateRef, "update"),
      createObserver(deleteRef, "delete"),
      createObserver(completeRef, "complete"),
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
            CRUD Operations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create, Read, Update, Delete – the four essential database operations in Hibernate
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm">
            <span className="font-mono">📝</span> save · get · merge · delete · query
          </div>
        </div>

        {/* Theory: What are CRUD Operations? */}
        <div
          ref={introRef}
          className={clsx(
            "mb-16 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl",
            isInView.intro ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">🔄</span> The Four Pillars of Persistence
          </h2>
          <p className="mb-3">
            Every application that stores data needs to perform basic operations: <strong>Create</strong> (insert), <strong>Read</strong> (select), <strong>Update</strong> (modify), and <strong>Delete</strong> (remove). In Hibernate, these are done through the <code>Session</code> object with methods like <code>save()/persist()</code>, <code>get()/load()</code>, <code>update()/merge()</code>, and <code>delete()</code>.
          </p>
          <p className="mb-3">
            Unlike JDBC where you write SQL statements manually, Hibernate lets you work with Java objects. Changes are automatically translated to INSERT, SELECT, UPDATE, or DELETE SQL when the session flushes.
          </p>
          <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl mt-3 border-l-4 border-teal-500">
            <p className="italic">📚 Real-world: At <strong>Barrackpore High School</strong>, the admin needs to add a new student (Create), view student details (Read), change the student's city (Update), or remove a graduated student (Delete). Hibernate makes each operation a single method call.</p>
          </div>
        </div>

        {/* Create Operation */}
        <div
          ref={createRef}
          className={clsx(
            "mb-16",
            isInView.create ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-3xl">➕</span> Create (Insert)
          </h2>
          <JavaFileLoader
            fileModule={CreateExample}
            title="CreateExample.java - Saving Entities"
            highlightLines={[14,15,16,17]}
          />
          <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
              <strong>save() vs persist()</strong>: save() returns generated ID immediately; persist() returns void and is JPA standard. Prefer persist() for JPA portability.
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
              <strong>Automatic INSERT</strong>: Occurs only on transaction commit or session flush, not at the moment of save().
            </div>
          </div>
        </div>

        {/* Read Operations */}
        <div
          ref={readRef}
          className={clsx(
            "mb-16",
            isInView.read ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-3xl">🔍</span> Read (Select)
          </h2>
          <JavaFileLoader
            fileModule={ReadExample}
            title="ReadExample.java - Retrieving Entities"
            highlightLines={[12,13,14,16,17,18]}
          />
          <div className="grid md:grid-cols-3 gap-3 mt-4 text-sm">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
              <strong>get()</strong>: Hits DB immediately, returns null if not found.
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
              <strong>load()</strong>: Returns proxy, throws exception if not found on access.
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
              <strong>HQL/Criteria</strong>: For complex queries, use session.createQuery().
            </div>
          </div>
        </div>

        {/* Update Operations */}
        <div
          ref={updateRef}
          className={clsx(
            "mb-16",
            isInView.update ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-3xl">✏️</span> Update (Modify)
          </h2>
          <JavaFileLoader
            fileModule={UpdateExample}
            title="UpdateExample.java - Modifying Data"
            highlightLines={[12,13,14,15,18,19,20]}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            🔄 <strong>Dirty checking:</strong> If you modify a managed entity inside a transaction, Hibernate automatically generates an UPDATE at flush time. You don't need to call any method unless the entity is detached.
          </p>
        </div>

        {/* Delete Operation */}
        <div
          ref={deleteRef}
          className={clsx(
            "mb-16",
            isInView.delete ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-3xl">🗑️</span> Delete (Remove)
          </h2>
          <JavaFileLoader
            fileModule={DeleteExample}
            title="DeleteExample.java - Removing Entities"
            highlightLines={[12,13,14,15,16]}
          />
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded mt-3">
            <strong>⚠️ Important:</strong> After deletion, the entity becomes transient (detached and removed from database). Do not reuse it.
          </div>
        </div>

        {/* Complete CRUD Example */}
        <div
          ref={completeRef}
          className={clsx(
            "mb-16",
            isInView.complete ? "animate-fadeSlideUp" : "opacity-0 translate-y-8"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold mb-3">🎯 Complete CRUD Service</h2>
          <JavaFileLoader
            fileModule={CrudComplete}
            title="StudentService.java - Full CRUD implementation"
            highlightLines={[8,9,10,11,12,13,14,15]}
          />
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
            <li>🔹 Use <code>persist()</code> for new entities; use <code>merge()</code> for detached entities (e.g., from web form).</li>
            <li>🔹 <strong>Bulk operations:</strong> For many updates/deletes, use HQL update/delete queries (e.g., <code>session.createQuery("delete from Student where city = :city").executeUpdate()</code>).</li>
            <li>🔹 Always wrap CRUD in a transaction – otherwise, no changes are written to DB.</li>
            <li>🔹 After delete, set the entity reference to null to avoid accidental reuse.</li>
            <li>🔹 Use <code>@Version</code> for optimistic locking to prevent lost updates in concurrent scenarios.</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">⚠️ Common Pitfalls (Beginners)</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>❌ Forgetting to begin transaction → no INSERT/UPDATE/DELETE executed.</li>
            <li>❌ Calling <code>update()</code> on a managed entity (unnecessary, dirty checking already does it).</li>
            <li>❌ Using <code>merge()</code> incorrectly on a new entity – it becomes managed but may cause duplicate ID issues.</li>
            <li>❌ Not closing the session → connection leaks.</li>
            <li>❌ Trying to read after session closed → LazyInitializationException.</li>
            <li>❌ Deleting an entity that has child associations without cascade → foreign key constraint violation.</li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-green-600 dark:text-green-400 font-semibold">✅ Mini Checklist: Begin transaction before any write operation. For reads, transaction is not required but recommended for consistency. Always close session in finally block.</p>
          </div>
        </div>

        {/* Hint */}
        <div className="my-12 p-5 bg-gray-100 dark:bg-gray-800/60 rounded-xl border border-gray-300 dark:border-gray-600 text-center transition-all hover:scale-[1.01]">
          <h4 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">🔎 Think about ...</h4>
          <p className="text-gray-700 dark:text-gray-300">You are building a library system for <strong>Naihati Public Library</strong>. A student borrows a book – that's a Create operation in a "BorrowRecord" table. When the student returns the book, you need to Update the return date. What happens if two librarians try to return the same book simultaneously? How does Hibernate handle concurrency if you use <code>@Version</code>?</p>
        </div>

        {/* FAQ */}
        <FAQTemplate title="CRUD Operations - Expert FAQs" questions={questions} />

        {/* Teacher's Note */}
        <div className="mt-12">
          <Teacher note="📘 CRUD seems trivial but is the foundation. I've seen students write save() without transaction – the object never appears in DB. Another classic: trying to read after session.close(). My advice: always write a 'crudTemplate' method that handles session and transaction lifecycle. Also, demonstrate Hibernate's automatic dirty checking: modify an entity inside transaction and see the UPDATE without calling any method – that surprises beginners!" />
        </div>
      </div>
    </div>
  );
};

export default Topic4;