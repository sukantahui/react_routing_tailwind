import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import callbackEvent from "./topic57_files/callback_event.c?raw";
import callbackStdlib from "./topic57_files/callback_stdlib.c?raw";

const Topic57 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
            Using Functions for Callback‑Style Programming
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Pass functions as arguments to be called later – the foundation of
          event handlers, asynchronous operations, and flexible libraries.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">What Is Callback‑Style Programming?</h2>
        <p className="leading-relaxed">
          At Barrackpore CNAT, Debangshu is building a GUI library. When a user
          clicks a button, he wants to run some custom code – but the library
          doesn't know that code in advance. The solution: the library accepts a &nbsp;
          <strong>callback function</strong> – a function pointer that it will
          call when the event occurs. This pattern is everywhere: <code>qsort</code>{" "}
          uses a comparator callback, <code>signal</code> lets you handle OS
          signals, and GUI toolkits use callbacks for events. Callbacks separate
          the "what" from the "when".
        </p>
      </section>

      {/* SVG Illustration: Callback Flow */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-2xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 400 200" className="w-full">
            {/* Library code */}
            <rect x="20" y="20" width="150" height="80" fill="#3b82f6" rx="4" />
            <text x="40" y="50" fill="white" fontSize="10">Library / Event Loop</text>
            <text x="40" y="70" fill="white" fontSize="10">stores callback ptr</text>
            <text x="40" y="90" fill="white" fontSize="10">when event occurs:</text>

            {/* User code */}
            <rect x="230" y="20" width="150" height="80" fill="#f59e0b" rx="4" />
            <text x="260" y="60" fill="white" fontSize="10">User callback</text>
            <text x="260" y="80" fill="white" fontSize="10">void onEvent(...)</text>

            {/* Registration arrow */}
            <line x1="170" y1="40" x2="230" y2="40" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="180" y="30" fill="#6b7280" fontSize="10">register</text>

            {/* Call arrow */}
            <line x1="230" y1="60" x2="170" y2="60" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="180" y="80" fill="#059669" fontSize="10">callback()</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            User code registers a callback; library invokes it when needed.
          </p>
        </div>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {[
          {
            title: "Separation of Concerns",
            desc: "The library handles the 'when'; your callback handles the 'what'.",
            icon: "🧩",
          },
          {
            title: "Registration",
            desc: "Pass a function pointer to the library (e.g., `set_callback(my_handler)`).",
            icon: "📝",
          },
          {
            title: "Invocation",
            desc: "The library calls your function when the event occurs, often passing context data.",
            icon: "📞",
          },
          {
            title: "Context Passing",
            desc: "Many callbacks accept a `void*` argument so you can pass arbitrary data.",
            icon: "📦",
          },
          {
            title: "Standard Library Examples",
            desc: "`qsort`, `bsearch`, `atexit`, `signal`, `pthread_create` all use callbacks.",
            icon: "📚",
          },
          {
            title: "Asynchronous Operations",
            desc: "Callbacks are essential for async I/O, timers, and event‑driven programming.",
            icon: "⏱️",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-teal-600",
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
        <h2 className="mb-6 text-2xl font-semibold">Callbacks in Action</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-blue-200 bg-blue-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-blue-900 dark:bg-blue-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-blue-700 dark:text-blue-400">
              <span className="mr-2">🔔</span> Custom Event System
            </h3>
            <EditableCCodeBlock
              title="callback_event.c – Register and trigger events"
              initialCode={callbackEvent}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Abhronila's simple event system: register callbacks for different
              events, then trigger them. Shows how libraries manage multiple
              callbacks.
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
              <span className="mr-2">📞</span> Standard Library Callbacks
            </h3>
            <EditableCCodeBlock
              title="callback_stdlib.c – qsort, atexit, signal"
              initialCode={callbackStdlib}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep uses <code>qsort</code> (comparator callback),{" "}
              <code>atexit</code> (cleanup callback), and <code>signal</code>{" "}
              (signal handler). All take function pointers.
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
            <strong>Null callback:</strong> Always check if a callback pointer is
            NULL before calling it; otherwise, crash.
          </li>
          <li>
            <strong>Signature mismatch:</strong> The callback must have the exact
            parameter and return types expected. Otherwise, undefined behaviour.
          </li>
          <li>
            <strong>Thread safety:</strong> If callbacks are invoked from
            different threads, protect shared data with mutexes.
          </li>
          <li>
            <strong>Context data lifetime:</strong> If you pass a pointer to local
            data to a callback that will be called later, that data may no longer
            exist (dangling pointer).
          </li>
          <li>
            <strong>Reentrancy:</strong> Callbacks that modify global state can
            cause issues if called from signal handlers (only async‑signal‑safe
            functions allowed).
          </li>
          <li>
            <strong>Overwriting callbacks:</strong> Some systems allow only one
            callback per event; registering a new one may replace the old without
            warning.
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
            <li>Always check for NULL before invoking a callback.</li>
            <li>Use `typedef` to simplify callback type declarations.</li>
            <li>Document when and from which context the callback will be called.</li>
            <li>Provide a `void*` user data parameter for passing context.</li>
            <li>Ensure callback functions are reentrant if used in signal handlers.</li>
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
            <li>Call a callback without verifying it's non‑null.</li>
            <li>Assume the callback runs in the same thread.</li>
            <li>Pass pointers to stack‑allocated data that may go out of scope.</li>
            <li>Ignore the callback's return value if it conveys important information.</li>
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
          <span className="font-medium">Observe carefully:</span> In the event
          system example, the library stores an array of callbacks. When an event
          occurs, it loops through them. This allows multiple listeners – a common
          pattern in GUI and messaging systems. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Add a `remove_callback` function
            to the event system. What would you need to store to allow removal?
            (e.g., an ID or function pointer comparison.)
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
              🧩 Typedef for clarity
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              `typedef void (*EventHandler)(int event, void* user_data);` makes
              callback APIs readable.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧵 Thread‑safe callbacks
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If callbacks can be invoked from multiple threads, use mutexes or
              ensure the callback itself is thread‑safe.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              ⏱️ Async I/O with callbacks
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Libraries like `libuv` or `libevent` are built entirely around
              callbacks for asynchronous operations.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we simulate a button click with a callback. Students
              see how the button code doesn't need to know what happens on click.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-teal-500 bg-teal-50/80 p-6 dark:bg-teal-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-teal-800 dark:text-teal-300">
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
              "Callbacks are where C starts to feel like a modern language. They
              enable event‑driven design, which is how almost all user interfaces
              and servers work. I always emphasise the 'inversion of control' –
              your code is no longer in charge; it responds. It's a mindset shift.
              And as always, check for NULL!"
            </p>
          </div>
          <div className="rounded-full bg-teal-200 p-3 dark:bg-teal-800">
            <svg
              className="h-12 w-12 text-teal-700 dark:text-teal-300"
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
            "Do I understand the inversion of control that callbacks provide?",
            "Have I used `typedef` to simplify callback types?",
            "Do I check for NULL before invoking a callback?",
            "Do I manage context data lifetime correctly?",
            "Am I aware of thread safety and reentrancy issues?",
            "Have I used callbacks with standard library functions (qsort, atexit, signal)?",
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

export default Topic57;