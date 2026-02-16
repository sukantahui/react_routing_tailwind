import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import basicFunctionPointer from "./topic56_files/basic_function_pointer.c?raw";
import callbackExample from "./topic56_files/callback_example.c?raw";

const Topic56 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">
            Function Pointers – Introduction and Use Cases
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Store and call functions through pointers – enable callbacks,
          plugins, and flexible code.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">What Are Function Pointers?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Abhronila is building a menu system. She wants to
          call different functions based on user choice – without writing a giant
          <code>switch</code>. Function pointers let her store the address of a
          function in a variable and call it indirectly. They're the backbone of
          callbacks (e.g., <code>qsort</code> comparator), event handlers, and
          plugin architectures. A function pointer's type includes the return
          type and parameter types – it must match exactly.
        </p>
      </section>

      {/* SVG Illustration: Pointer to Function */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-2xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 400 200" className="w-full">
            {/* Function in memory */}
            <rect x="30" y="30" width="120" height="60" fill="#3b82f6" rx="4" />
            <text x="50" y="60" fill="white" fontSize="10">int add(int, int)</text>
            <text x="50" y="80" fill="white" fontSize="10">{`{ ... }`}</text>

            {/* Pointer variable */}
            <rect x="200" y="50" width="100" height="40" fill="#f59e0b" rx="4" />
            <text x="220" y="75" fill="white" fontSize="10">ptr = &amp;add</text>

            {/* Arrow */}
            <line x1="300" y1="70" x2="160" y2="60" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Dereference */}
            <text x="180" y="130" fill="#374151" fontSize="12">(*ptr)(5, 3) → call add</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            A function pointer stores the address of a function, allowing indirect calls.
          </p>
        </div>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {[
          {
            title: "Syntax",
            desc: "`return_type (*ptr_name)(parameter_types);` – parentheses matter!",
            icon: "📝",
          },
          {
            title: "Assigning",
            desc: "`ptr = &function;` or simply `ptr = function;` (function name decays to pointer).",
            icon: "🎯",
          },
          {
            title: "Calling",
            desc: "`result = (*ptr)(args);` or `result = ptr(args);` – both work.",
            icon: "📞",
          },
          {
            title: "Typedef for Clarity",
            desc: "`typedef int (*MathOp)(int, int);` makes declarations readable.",
            icon: "🏷️",
          },
          {
            title: "Arrays of Pointers",
            desc: "Store multiple functions in an array – useful for dispatch tables.",
            icon: "📚",
          },
          {
            title: "Callbacks",
            desc: "Pass a function pointer to another function (e.g., `qsort` comparator) for custom behaviour.",
            icon: "🔄",
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
        <h2 className="mb-6 text-2xl font-semibold">Function Pointers in Action</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-blue-200 bg-blue-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-blue-900 dark:bg-blue-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-blue-700 dark:text-blue-400">
              <span className="mr-2">🔹</span> Basic Function Pointer
            </h3>
            <EditableCCodeBlock
              title="basic_function_pointer.c – Declare, assign, call"
              initialCode={basicFunctionPointer}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep declares a pointer to a math function, assigns it to
              `add` and `multiply`, and calls it. The syntax is shown clearly.
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
              <span className="mr-2">🔹</span> Callback with `qsort`
            </h3>
            <EditableCCodeBlock
              title="callback_example.c – Comparator as function pointer"
              initialCode={callbackExample}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina uses the standard `qsort` which takes a function pointer
              comparator. This lets her sort in ascending or descending order
              without changing the sorting algorithm.
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
            <strong>Wrong syntax:</strong> `int *func(int, int)` is a function
            returning a pointer, not a function pointer. Parentheses matter:{" "}
            `int (*func)(int, int)`.
          </li>
          <li>
            <strong>Missing `&` or `*`:</strong> Using the function name alone
            gives the address; you can also use `&`. Both work, but be consistent.
          </li>
          <li>
            <strong>Calling without dereferencing:</strong> `ptr(args)` is
            allowed, but some prefer `(*ptr)(args)` for clarity.
          </li>
          <li>
            <strong>Signature mismatch:</strong> Assigning a function with
            different parameter or return types leads to undefined behaviour.
          </li>
          <li>
            <strong>Null pointers:</strong> Calling a null function pointer
            crashes. Always check if it's assigned.
          </li>
          <li>
            <strong>Forgetting `typedef`:</strong> Long pointer types clutter
            code; use `typedef` to improve readability.
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
            <li>Use `typedef` to simplify function pointer types.</li>
            <li>Check for NULL before calling a function pointer.</li>
            <li>Keep the signature consistent – use the same return and parameter types.</li>
            <li>Document expected behaviour of callback functions.</li>
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
            <li>Forget the parentheses in declarations.</li>
            <li>Assign a function with a mismatched signature.</li>
            <li>Call a function pointer without checking for NULL.</li>
            <li>Overcomplicate – use function pointers only when needed.</li>
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
          <span className="font-medium">Observe carefully:</span> In the basic
          example, the pointer `op` can point to either `add` or `multiply`. This
          is the essence of polymorphism in C. In the callback example, `qsort`
          doesn't need to know the comparison logic – it just calls the provided
          function. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Add a new function `subtract` and
            assign it to `op`. Modify the menu to choose the operation based on
            user input using an array of function pointers.
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
              🗂️ Dispatch Tables
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Use an array of function pointers to replace long switch/case
              statements. Example: command processors.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧩 Plugins with `dlopen`
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              On Linux, you can load dynamic libraries and get function pointers
              using `dlsym` – enabling plugin architectures.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Unit Testing with Mocks
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Function pointers allow you to inject mock functions during tests,
              isolating the unit under test.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we simulate a calculator using an array of function
              pointers – students see how it eliminates conditional logic.
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
              "Function pointers are one of those features that separate
              intermediate from advanced C programmers. They open the door to
              callbacks, state machines, and plugins. I always tell my students:
              once you master function pointers, you understand that functions
              are just data too – they have addresses, they can be stored and
              passed around. It's a powerful concept."
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
            "Can I declare a function pointer with correct syntax?",
            "Do I understand the difference between a function and a function pointer?",
            "Have I used `typedef` to simplify complex pointer types?",
            "Do I check for NULL before calling through a pointer?",
            "Have I used function pointers for callbacks or dispatch tables?",
            "Do I avoid signature mismatches?",
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

export default Topic56;