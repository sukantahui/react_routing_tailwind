import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import declarationBeforeUse from "./topic38_files/declaration_before_use.c?raw";
import useBeforeDeclaration from "./topic38_files/use_before_declaration.c?raw";

const Topic38 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            Why Function Declarations Must Appear Before Usage
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          The compiler reads your code from top to bottom – if it encounters a
          call to an unknown function, it makes dangerous assumptions. Learn why
          order matters.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">The Compiler Reads Line by Line</h2>
        <p className="leading-relaxed">
          Imagine Abhronila is writing a program at Barrackpore CNAT. She calls a
          function <code>printGrade()</code> inside <code>main()</code>, but the
          actual definition of <code>printGrade()</code> appears later. The
          compiler, reading from top to bottom, hasn't seen any declaration yet.
          In older C standards, it would assume the function returns{" "}
          <code>int</code> and accepts any arguments – a recipe for bugs. Modern
          C requires a declaration or definition before use; otherwise, it's an
          error. This rule ensures type safety and predictable behaviour.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {[
          {
            title: "Declaration Before Use",
            desc: "A prototype or full definition must appear before the first call. This tells the compiler the function's signature.",
            icon: "📌",
          },
          {
            title: "Implicit Declaration (Obsolete)",
            desc: "Pre‑C99 rule: if no declaration, assume `int` return and any parameters. Leads to runtime errors.",
            icon: "⚠️",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-600",
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

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Correct vs Incorrect Order</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">✅</span> Declaration Before Use
            </h3>
            <EditableCCodeBlock
              title="declaration_before_use.c – Works correctly"
              initialCode={declarationBeforeUse}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina declares <code>calculateGrade()</code> before calling it.
              The compiler knows the return type (<code>char</code>) and
              parameters (<code>int</code>). No surprises.
            </p>
          </div>

          <div
            className={clsx(
              "rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-red-900 dark:bg-red-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-safe:animation-delay-200ms"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-red-700 dark:text-red-400">
              <span className="mr-2">❌</span> Use Before Declaration
            </h3>
            <EditableCCodeBlock
              title="use_before_declaration.c – Compiler error"
              initialCode={useBeforeDeclaration}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu calls <code>calculateGrade()</code> before any
              declaration. In modern C (C99+), this is an error. The compiler
              doesn't know what to expect.
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
            <strong>Assuming implicit declarations still work:</strong> In
            modern C, they don't. Expect compiler errors.
          </li>
          <li>
            <strong>Placing declarations after <code>main()</code>:</strong>{" "}
            If the function is only used inside <code>main()</code>, the
            declaration must come before <code>main()</code>.
          </li>
          <li>
            <strong>Forgetting to include headers:</strong> Headers contain
            prototypes for library functions (like <code>printf</code>). Without
            <code>#include &lt;stdio.h&gt;</code>, you get implicit declaration
            warnings/errors.
          </li>
          <li>
            <strong>Mixing up declaration and definition order in multi‑file
            projects:</strong> Ensure every file that uses a function includes
            its prototype (via a header).
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
            <li>Place function prototypes at the top of the file (or in headers).</li>
            <li>Include necessary headers for library functions.</li>
            <li>Compile with <code>-Wall -Werror</code> to catch missing declarations.</li>
            <li>If a function is used in multiple files, put its prototype in a header and include it.</li>
            <li>Order your definitions so that called functions appear before callers (if not using prototypes).</li>
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
            <li>Rely on implicit function declarations (they are illegal in C99+).</li>
            <li>Place function definitions after their first use without a prototype.</li>
            <li>Assume <code>#include</code> is optional for standard functions.</li>
            <li>Ignore compiler warnings about implicit declarations.</li>
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
          <span className="font-medium">Observe carefully:</span> In the bad
          example, the compiler sees a call to <code>calculateGrade()</code> but
          has no information about it. It cannot verify that you're passing the
          right number or types of arguments, nor what it returns. This leads to
          mismatched assumptions and crashes. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Move the definition of{" "}
            <code>calculateGrade()</code> above <code>main()</code>. Now it
            works – because the definition itself acts as a declaration.
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
              🗂️ Header Files as Early Declarations
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              In multi‑file projects, <code>#include</code> effectively pastes
              the prototypes at the top. This ensures every file sees the
              declarations before any calls.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🛡️ Use <code>-Wimplicit-function-declaration</code>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Even if your compiler defaults to older standards, this flag
              warns you about missing declarations. Treat warnings as errors.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Forward Declarations for Clarity
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Even if you define functions before use, it's good practice to
              also provide prototypes at the top – they serve as a table of
              contents.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we tell students: "The compiler has no memory of
              the future. Tell it about a function before you use it."
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-indigo-500 bg-indigo-50/80 p-6 dark:bg-indigo-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-indigo-800 dark:text-indigo-300">
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
              "When I started teaching, students often wondered why their
              programs crashed mysteriously. It was almost always because they
              used a function before declaring it. Modern compilers catch this,
              but the lesson remains: order matters. Think of it like a recipe
              – you need to know the ingredients before you can use them."
            </p>
          </div>
          <div className="rounded-full bg-indigo-200 p-3 dark:bg-indigo-800">
            <svg
              className="h-12 w-12 text-indigo-700 dark:text-indigo-300"
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
            "Have I declared (or defined) every function before its first use?",
            "Do I include all necessary headers (stdio.h, stdlib.h, etc.)?",
            "If I use a function from another file, is its prototype included via a header?",
            "Does my code compile without implicit declaration warnings?",
            "Have I placed prototypes at the top of the file for clarity?",
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

export default Topic38;