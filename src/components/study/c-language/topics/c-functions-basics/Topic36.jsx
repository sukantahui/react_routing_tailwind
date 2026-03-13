import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import monolithicStudent from "./topic36_files/monolithic_student.c?raw";
import modularStudentHeader from "./topic36_files/modular_student.h.c?raw";
import modularStudentMain from "./topic36_files/modular_student_main.c?raw";
import modularStudentImpl from "./topic36_files/modular_student_impl.c?raw";

const Topic36 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-400">
            Real‑World Use Cases of Modular Programming
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          From student record systems to operating systems – modularity is how
          the pros build software that scales, is maintainable, and can be
          developed by teams.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">
          Why Modular Programming in the Real World?
        </h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Debangshu is building a student management system
          for the admin office. If he writes everything in one giant file,
          finding and fixing bugs becomes a nightmare. In the real world,
          software is split into modules – separate files or libraries – each
          responsible for a specific feature. This is how operating systems,
          banking software, and even the code that runs NASA's rovers are built.
        </p>
      </section>

      {/* Real‑World Use Cases Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {[
          {
            title: "Student Record Systems",
            desc: "Modules for student data, course enrollment, fee calculation, and report generation can be developed independently.",
            icon: "🎓",
          },
          {
            title: "E‑Commerce Platforms",
            desc: "Separate modules handle user accounts, product catalog, shopping cart, payment, and order fulfillment.",
            icon: "🛒",
          },
          {
            title: "Operating Systems",
            desc: "Kernel, file system, device drivers, and system calls are all separate modules that communicate via well‑defined interfaces.",
            icon: "💻",
          },
          {
            title: "Embedded Systems",
            desc: "In a car's ECU, modules manage engine control, braking, infotainment – each can be updated independently.",
            icon: "🚗",
          },
          {
            title: "Game Development",
            desc: "Physics engine, rendering, AI, and audio are separate modules, often developed by different teams.",
            icon: "🎮",
          },
          {
            title: "Scientific Simulations",
            desc: "Modular code allows swapping different numerical methods or data inputs without rewriting everything.",
            icon: "🔬",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-amber-600",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              `motion-safe:animation-delay-${(index + 1) * 100}ms`
            )}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="mb-3 text-4xl">{item.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Concrete C Example: Monolithic vs Modular */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">
          Student Record System – Monolithic vs Modular
        </h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Monolithic (All in One File)
            </h3>
            <EditableCCodeBlock
              title="monolithic_student.c – 200+ lines, hard to maintain"
              initialCode={monolithicStudent}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep wrote everything in one file. Adding a new feature means
              understanding the whole file and risking breaking unrelated parts.
            </p>
          </div>

          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-safe:animation-delay-200ms"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">✅</span> Modular (Separate Files)
            </h3>
            <div className="space-y-4">
              <EditableCCodeBlock
                title="modular_student.h – Header with declarations"
                initialCode={modularStudentHeader}
              />
              <EditableCCodeBlock
                title="modular_student_impl.c – Function implementations"
                initialCode={modularStudentImpl}
              />
              <EditableCCodeBlock
                title="modular_student_main.c – Main program"
                initialCode={modularStudentMain}
              />
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina split the system into modules. Now the team can work in
              parallel: Ritaja works on file I/O, Abhronila on reports, and
              Debangshu on the user interface – all without stepping on each
              other's toes.
            </p>
          </div>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-yellow-50/70 p-6 dark:bg-yellow-900/20",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold text-yellow-800 dark:text-yellow-300">
          ⚠️ Common Pitfalls
        </h2>
        <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Too many tiny modules:</strong> Over‑modularisation can make
            the project hard to navigate.
          </li>
          <li>
            <strong>Tight coupling:</strong> Modules that depend too much on
            each other's internal details defeat the purpose.
          </li>
          <li>
            <strong>Missing headers or wrong declarations:</strong> Compiler
            errors that are hard to trace.
          </li>
          <li>
            <strong>Circular dependencies:</strong> Module A includes B, and B
            includes A – leads to linker errors.
          </li>
          <li>
            <strong>Not using include guards:</strong> Causes multiple
            definition errors.
          </li>
        </ul>
      </section>

      {/* Best Practices Summary */}
      <section className="mb-12 grid gap-6 md:grid-cols-1">
        <div
          className={clsx(
            "rounded-xl bg-blue-50/50 p-5 dark:bg-blue-900/20",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h3 className="mb-3 text-xl font-semibold text-blue-700 dark:text-blue-300">
            📋 Do's
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
            <li>Design modules around features, not technical layers.</li>
            <li>Keep interfaces minimal and well‑documented.</li>
            <li>Use header files to declare public functions and data.</li>
            <li>Hide implementation details using static functions.</li>
            <li>Compile each module separately and link them.</li>
          </ul>
        </div>
        <div
          className={clsx(
            "rounded-xl bg-purple-50/50 p-5 dark:bg-purple-900/20",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
            "motion-safe:animation-delay-200ms"
          )}
          style={{ animationDelay: "200ms" }}
        >
          <h3 className="mb-3 text-xl font-semibold text-purple-700 dark:text-purple-300">
            🚫 Don'ts
          </h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
            <li>Let modules access each other's global variables directly.</li>
            <li>Put everything in a single header.</li>
            <li>Forget to add include guards.</li>
            <li>Create modules that are impossible to test independently.</li>
            <li>Write modules that are too large (thousands of lines).</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/30 p-6 dark:border-indigo-700 dark:bg-indigo-900/10",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-indigo-800 dark:text-indigo-300">
          💡 Hint – Think Like a Pro
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Observe carefully:</span> In the modular
          version, the main program only includes the header and calls functions
          without knowing how they're implemented. If we change the sorting
          algorithm inside the implementation, the main program doesn't even
          need to be recompiled – just relinked. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Add a new feature, like
            "calculate average marks", to both versions. In the monolithic
            version you have to insert code carefully; in the modular version
            you can add a new function in a separate file without touching
            existing code.
          </span>
        </p>
      </section>

      {/* Tips & Tricks */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-emerald-50/50 p-6 dark:bg-emerald-900/20",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
          🧠 Tips & Tricks (Professional Edge)
        </h2>
        <div className="grid gap-4 md:grid-cols-1">
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📦 Use a Makefile
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Automate compilation of multiple files. Only recompile changed
              modules – huge time saver in large projects.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔒 Hide Internals with static
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Declare functions and variables that are only used inside a module
              as static to avoid name clashes.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📋 Document Interfaces
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              In the header, comment what each function does, its parameters,
              and return value. This is the contract for other modules.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we practice by taking a big program and splitting
              it into modules. Students learn to see the boundaries between
              different responsibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-amber-500 bg-amber-50/80 p-6 dark:bg-amber-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-amber-800 dark:text-amber-300">
          👨‍🏫 Teacher's Note – Sukanta Hui
        </h2>
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex-1">
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              <strong>Sukanta Hui</strong> (email: sukantahui@codernaccotax.co.in
              , mobile: 7003756860) has been teaching programming since 1998 –
              that's <strong>{experience} years</strong> of experience in C,
              RDBMS, OS, and web development.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              "In my 27+ years, I've seen projects fail because they weren't
              modular. At Barrackpore CNAT, we always start with a modular
              design – even for small assignments. It trains the mind to think
              in terms of interfaces and separation of concerns. Remember: in
              the industry, you'll never work on a single‑file codebase.
              Embrace modules now."
            </p>
          </div>
          <div className="rounded-full bg-amber-200 p-3 dark:bg-amber-800">
            <svg
              className="h-12 w-12 text-amber-700 dark:text-amber-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Mini Checklist */}
      <section className="rounded-xl bg-gray-100 p-6 dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-semibold">✅ Mini Checklist</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
          {[
            "Have I identified the main features to modularise?",
            "Does each module have a clear, single responsibility?",
            "Are the interfaces (headers) minimal and well‑commented?",
            "Did I use include guards in every header?",
            "Can I compile each module separately?",
            "Are internal functions marked static?",
            "Is the main program free of implementation details?",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Inline keyframes for animations */}
      <style>{`
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
      `}</style>
    </div>
  );
};

export default Topic36;