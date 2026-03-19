// Topic10.jsx
import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import raw Java code examples from topic10_files folder
import studentModel from "./topic10_files/Student.java?raw";
import studentDAO from "./topic10_files/StudentDAO.java?raw";
import studentDAOImpl from "./topic10_files/StudentDAOImpl.java?raw";
import daoDemo from "./topic10_files/DAODemo.java?raw";

const Topic10 = () => {
  // Calculate Sukanta Hui's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998; // started in 1998

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 min-h-screen py-8 px-4 transition-colors duration-300">
      {/* Scoped keyframe animations (respects reduced motion) */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Main container – all sections stacked */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* ===== SECTION 1: TITLE & INTRODUCTION ===== */}
        <section
          className="animate-[fadeSlideUp_0.6s_ease-out]"
          aria-label="Introduction to DAO Design Pattern"
        >
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            🏗️ DAO (Data Access Object) Design Pattern
          </h1>
          <p className="text-lg leading-relaxed">
            The <strong>Data Access Object (DAO)</strong> pattern is a structural pattern that separates the
            data persistence logic from the business logic. It provides an abstract interface to the database,
            hiding all the low‑level JDBC details. This makes the code cleaner, more testable, and easier to
            maintain.
          </p>
          <p className="mt-2 text-md">
            <span className="font-semibold">Abhronila</span> from Ichapur is building a student management system.
            Without DAO, her business logic would be mixed with SQL statements, making changes difficult. By using DAO,
            she can switch from MySQL to PostgreSQL later without rewriting the whole application.
          </p>
        </section>

        {/* ===== SECTION 2: DAO PATTERN OVERVIEW (with SVG) ===== */}
        <section
          className="animate-[fadeSlideUp_0.7s_ease-out] space-y-4"
          aria-label="DAO pattern diagram"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            🧩 DAO Pattern Structure
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner flex justify-center">
            <svg viewBox="0 0 600 200" className="w-full max-w-2xl" stroke="currentColor" fill="none" strokeWidth="2">
              {/* Business Layer */}
              <rect x="20" y="20" width="120" height="60" rx="8" className="stroke-indigo-500 fill-indigo-50 dark:fill-indigo-900/20" />
              <text x="40" y="55" className="text-sm fill-gray-800 dark:fill-gray-200" stroke="none">Business Layer</text>
              <text x="30" y="75" className="text-[8px] fill-gray-500" stroke="none">(Service/Controller)</text>

              {/* DAO Interface */}
              <rect x="200" y="20" width="120" height="60" rx="8" className="stroke-emerald-500 fill-emerald-50 dark:fill-emerald-900/20" />
              <text x="220" y="55" className="text-sm fill-gray-800 dark:fill-gray-200" stroke="none">«interface»</text>
              <text x="240" y="75" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">StudentDAO</text>

              {/* DAO Implementation */}
              <rect x="380" y="20" width="120" height="60" rx="8" className="stroke-sky-500 fill-sky-50 dark:fill-sky-900/20" />
              <text x="400" y="55" className="text-sm fill-gray-800 dark:fill-gray-200" stroke="none">StudentDAOImpl</text>
              <text x="410" y="75" className="text-[8px] fill-gray-500" stroke="none">(JDBC code)</text>

              {/* Database */}
              <rect x="500" y="120" width="80" height="40" rx="8" className="stroke-purple-500 fill-purple-50 dark:fill-purple-900/20" />
              <text x="510" y="150" className="text-xs fill-gray-600 dark:fill-gray-400" stroke="none">Database</text>

              {/* Arrows */}
              <path d="M140 50 L200 50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M320 50 L380 50" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M440 80 L540 120" className="stroke-gray-400 dark:stroke-gray-500" strokeDasharray="4 4">
                <animate attributeName="strokeDashoffset" values="0;8;0" dur="2s" repeatCount="indefinite" />
              </path>
              <text x="450" y="100" className="text-[8px] fill-gray-500" stroke="none">SQL</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Business layer depends on the DAO interface, not the implementation. The implementation handles all JDBC code.
          </p>
        </section>

        {/* ===== SECTION 3: COMPONENTS OF DAO PATTERN ===== */}
        <section
          className="animate-[fadeSlideUp_0.8s_ease-out] space-y-4"
          aria-label="Components of DAO pattern"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            📦 Key Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">1. Model / Entity</h3>
              <p className="mt-2 text-sm">
                Simple Java class representing a database table (e.g., <code>Student</code> with fields, getters, setters).
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">2. DAO Interface</h3>
              <p className="mt-2 text-sm">
                Defines CRUD operations (e.g., <code>getAll()</code>, <code>save(student)</code>, <code>update(student)</code>,
                <code>delete(id)</code>).
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-sky-600 dark:text-sky-400">3. DAO Implementation</h3>
              <p className="mt-2 text-sm">
                Implements the interface using JDBC (or JPA, etc.). Contains all database access logic.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Optionally, a DAO factory can be used to instantiate the correct implementation.
          </p>
        </section>

        {/* ===== SECTION 4: BENEFITS OF DAO ===== */}
        <section
          className="animate-[fadeSlideUp_0.9s_ease-out] space-y-4"
          aria-label="Benefits of DAO"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            ✅ Why Use DAO?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <li><strong>Separation of Concerns:</strong> Business logic doesn't deal with SQL or JDBC.</li>
            <li><strong>Testability:</strong> You can mock the DAO interface to unit test business logic without a database.</li>
            <li><strong>Maintainability:</strong> Changes to the database (e.g., switching from MySQL to Oracle) only affect the DAO implementation.</li>
            <li><strong>Reusability:</strong> DAO can be used by multiple parts of the application.</li>
            <li><strong>Readability:</strong> Code becomes cleaner and more focused.</li>
          </ul>
        </section>

        {/* ===== SECTION 5: CODE EXAMPLES ===== */}
        <section
          className="animate-[fadeSlideUp_1.0s_ease-out] space-y-6"
          aria-label="Code examples for DAO pattern"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            💻 Code Examples
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">🔹 Student Model (Entity)</h3>
            <JavaFileLoader
              fileModule={studentModel}
              title="Student.java"
              highlightLines={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]} // fields, getters, setters
            />

            <h3 className="text-xl font-medium mt-6">🔹 StudentDAO Interface</h3>
            <JavaFileLoader
              fileModule={studentDAO}
              title="StudentDAO.java"
              highlightLines={[4, 5, 6, 7, 8]} // method signatures
            />

            <h3 className="text-xl font-medium mt-6">🔹 StudentDAOImpl (JDBC Implementation)</h3>
            <JavaFileLoader
              fileModule={studentDAOImpl}
              title="StudentDAOImpl.java"
              highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]} // main methods
            />

            <h3 className="text-xl font-medium mt-6">🔹 Using the DAO (Demo)</h3>
            <JavaFileLoader
              fileModule={daoDemo}
              title="DAODemo.java"
              highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]} // creating DAO, calling methods
            />
          </div>

          {/* Hint Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              💡 <strong>Observe carefully:</strong> In <code>StudentDAOImpl</code>, we use a connection pool (DataSource) instead of
              DriverManager. This is a production‑grade approach. How would you modify the code to use a different database?
            </p>
          </div>
        </section>

        {/* ===== SECTION 6: COMMON PITFALLS ===== */}
        <section
          className="animate-[fadeSlideUp_1.1s_ease-out] space-y-3"
          aria-label="Common mistakes"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-red-200 dark:border-red-800 pb-2">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
            <li>Putting JDBC code directly in the business layer (defeats the purpose of DAO).</li>
            <li>Not using interfaces – makes it harder to switch implementations or mock for testing.</li>
            <li>Forgetting to close resources (connections, statements, result sets) in the DAO implementation.</li>
            <li>Handling <code>SQLException</code> improperly – either swallowing or exposing it to business layer.</li>
            <li>Creating a new connection for every DAO call without pooling – kills performance.</li>
            <li>Making DAO methods <code>static</code> – hinders dependency injection and testability.</li>
          </ul>
        </section>

        {/* ===== SECTION 7: BEST PRACTICES ===== */}
        <section
          className="animate-[fadeSlideUp_1.2s_ease-out] space-y-3"
          aria-label="Best practices"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-green-200 dark:border-green-800 pb-2">
            ✅ Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
            <li>Always define a DAO interface, even if you have only one implementation.</li>
            <li>Use connection pooling (DataSource) in DAO implementations.</li>
            <li>Wrap low‑level SQL exceptions in a custom runtime exception (e.g., <code>DataAccessException</code>).</li>
            <li>Use try‑with‑resources to auto‑close JDBC resources.</li>
            <li>Keep transaction management outside the DAO (in the service layer).</li>
            <li>Inject DataSource via constructor to make DAOs testable and configurable.</li>
          </ul>
        </section>

        {/* ===== SECTION 8: TIPS & TRICKS ===== */}
        <section
          className="animate-[fadeSlideUp_1.3s_ease-out] space-y-3"
          aria-label="Professional tips"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-amber-200 dark:border-amber-800 pb-2">
            🧠 Tips & Tricks
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>🔹 <strong>Generic DAO:</strong> Create a base interface <code>GenericDAO&lt;T, ID&gt;</code> with common methods to reduce boilerplate.</li>
              <li>🔹 <strong>DTO vs Entity:</strong> DAO typically returns entity objects. For complex queries, you might return DTOs (Data Transfer Objects).</li>
              <li>🔹 <strong>Spring JdbcTemplate:</strong> In Spring, you can use <code>JdbcTemplate</code> to simplify JDBC code inside DAO implementations.</li>
              <li>🔹 <strong>Testing:</strong> Use an in‑memory database (like H2) for testing DAO implementations.</li>
              <li>🔹 <strong>Debangshu's trick:</strong> Keep a separate <code>ConnectionFactory</code> class that provides DataSource – then all DAOs can use it consistently.</li>
            </ul>
          </div>
        </section>

        {/* ===== SECTION 9: TEACHER'S NOTE ===== */}
        <section
          className="animate-[fadeSlideUp_1.4s_ease-out] space-y-3"
          aria-label="Teacher's note"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
            👩‍🏫 Teacher's Note
          </h2>
          <div
            className={clsx(
              "bg-indigo-100 dark:bg-indigo-900/40 p-5 rounded-xl",
              "transition-all duration-300 hover:shadow-lg hover:bg-indigo-200 dark:hover:bg-indigo-800/60"
            )}
          >
            <p className="font-bold text-indigo-900 dark:text-indigo-100">Sukanta Hui</p>
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              📧 sukantahui@codernaccotax.co.in | 📞 7003756860
            </p>
            <p className="text-sm mt-1">
              💼 {experience} years of experience in Programming, RDBMS, OS, Web Development.
            </p>
            <p className="mt-3">
              <span className="font-semibold">Point to remember:</span> The DAO pattern is fundamental in enterprise Java.
              Students often skip the interface – emphasize that interfaces enable loose coupling and easier testing.
              <br />
              <span className="italic">
                "Swadeep, think of DAO as a restaurant menu: the interface lists what you can order, but the kitchen (implementation)
                can change without affecting the menu."
              </span>
            </p>
          </div>
        </section>

        {/* ===== SECTION 10: MINI CHECKLIST ===== */}
        <section
          className="animate-[fadeSlideUp_1.5s_ease-out] space-y-3"
          aria-label="Quick checklist"
        >
          <h2 className="text-3xl font-semibold border-b-2 border-gray-300 dark:border-gray-600 pb-2">
            📋 Mini Checklist
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg">
            <ul className="space-y-2">
              <li>✔️ I understand the purpose of the DAO pattern.</li>
              <li>✔️ I can create a model class, DAO interface, and DAO implementation.</li>
              <li>✔️ I know how to use DataSource inside a DAO.</li>
              <li>✔️ I understand the benefits of separating data access from business logic.</li>
              <li>✔️ I can write unit tests using a mock DAO.</li>
              <li>✔️ I am aware of common pitfalls and best practices for DAOs.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic10;