import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import prototypeGood from "./topic37_files/prototype_good.c?raw";
import prototypeBad from "./topic37_files/prototype_bad.c?raw";

const Topic37 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">
            Function Prototype vs Function Definition
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          The difference between declaring what a function looks like and
          defining what it actually does — essential for multi‑file programs
          and type safety.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Prototype vs Definition</h2>
        <p className="leading-relaxed">
          Imagine Swadeep is building a library management system at Barrackpore
          CNAT. He wants to use a function <code>calculateFine()</code> inside{" "}
          <code>main()</code>, but he plans to write the actual code for that
          function later. The <strong>prototype</strong> (or declaration) tells
          the compiler: "Trust me, there is a function with this name, return
          type, and parameters – here's how to call it." The{" "}
          <strong>definition</strong> provides the actual body. In C, you can
          have many declarations but only one definition.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1">
        {[
          {
            title: "Prototype (Declaration)",
            desc: "Syntax: `return_type function_name(parameter_types);` Ends with a semicolon. No body. Can appear multiple times.",
            icon: "📜",
          },
          {
            title: "Definition",
            desc: "Syntax: `return_type function_name(parameters) { body }` Contains the actual code. Must appear exactly once in the entire program.",
            icon: "⚙️",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-600",
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
        <h2 className="mb-6 text-2xl font-semibold">Prototype in Action</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">✅</span> With Prototype (Correct)
            </h3>
            <EditableCCodeBlock
              title="prototype_good.c – Declaration before use"
              initialCode={prototypeGood}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina declares <code>calculateFine()</code> before{" "}
              <code>main()</code>. The compiler knows how to call it, even
              though the definition comes later.
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
              <span className="mr-2">❌</span> Missing Prototype (Dangerous)
            </h3>
            <EditableCCodeBlock
              title="prototype_bad.c – Implicit declaration"
              initialCode={prototypeBad}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu forgets the prototype. In older C, the compiler assumes
              the function returns <code>int</code> and takes any arguments,
              leading to subtle bugs. Modern C compilers throw an error.
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
            <strong>Missing prototype:</strong> Leads to implicit declaration
            (assumes <code>int</code> return) or compiler error.
          </li>
          <li>
            <strong>Mismatched prototype and definition:</strong> Different
            parameter types or return type – causes undefined behaviour.
          </li>
          <li>
            <strong>Duplicate definitions:</strong> Having the function body in
            two places (e.g., in two source files) – linker error.
          </li>
          <li>
            <strong>Forgetting the semicolon in prototype:</strong> Compiler
            thinks you're starting a definition.
          </li>
          <li>
            <strong>Prototype inside a block:</strong> Declaring a function
            inside another function (nested) – legal but confusing.
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
            <li>Always provide a prototype before using a function.</li>
            <li>Put prototypes in header files for multi‑file projects.</li>
            <li>Include parameter names in prototypes for clarity (though optional).</li>
            <li>Use <code>void</code> for empty parameter lists: <code>int foo(void);</code></li>
            <li>Keep the prototype and definition identical.</li>
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
            <li>Rely on implicit function declarations.</li>
            <li>Put function definitions in header files (unless inline).</li>
            <li>Mismatch the number or types of parameters.</li>
            <li>Forget the semicolon after a prototype.</li>
            <li>Declare the same prototype with different parameter names – it's fine, but confusing.</li>
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
          <span className="font-medium">Observe carefully:</span> In the good
          example, the prototype tells the compiler that{" "}
          <code>calculateFine</code> expects a <code>float</code> and returns a{" "}
          <code>float</code>. Without it, the compiler would assume it returns{" "}
          <code>int</code>, causing wrong results when the function actually
          returns a <code>float</code>. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> In the bad example, move the
            definition above <code>main()</code>. Now it works – but in large
            projects, you can't always arrange definitions in order. That's why
            prototypes are essential.
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
              🗂️ Header Files as Contracts
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              In team projects, the header file (with prototypes) is the
              contract between modules. Implement the .c file separately.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🛡️ Use -Wall -Werror
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Compile with all warnings and treat warnings as errors. This
              catches missing prototypes.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Keep Prototypes Updated
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              When you change a function's parameters, update its prototype
              immediately. The compiler will help find callers that need
              updating.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we teach students to write the prototype at the
              top even before writing the function body. It's like planning your
              function's signature first.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-cyan-500 bg-cyan-50/80 p-6 dark:bg-cyan-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-cyan-800 dark:text-cyan-300">
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
              "I've seen students waste hours debugging because they forgot a
              prototype and the compiler assumed <code>int</code>. In modern C,
              the compiler will error, which is a blessing. Always prototype,
              and always use header files. It's a discipline that pays off in
              every large project."
            </p>
          </div>
          <div className="rounded-full bg-cyan-200 p-3 dark:bg-cyan-800">
            <svg
              className="h-12 w-12 text-cyan-700 dark:text-cyan-300"
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
            "Does every function used in a file have a prototype before its first use?",
            "Are prototypes grouped in header files for shared functions?",
            "Do the prototypes match the definitions exactly (return type, parameters)?",
            "Is there exactly one definition per non‑inline function?",
            "Have I used `void` for functions with no parameters?",
            "Do I compile with `-Wall` to catch missing prototypes?",
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

export default Topic37;