import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import stackAllocation from "./topic41_files/stack_allocation.c?raw";
import recursiveStack from "./topic41_files/recursive_stack.c?raw";

const Topic41 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Memory Allocation During Function Execution
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          How local variables, parameters, and return addresses are created and
          destroyed on the stack – and why it matters.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">Where Do Variables Live?</h2>
        <p className="leading-relaxed">
          When Debangshu calls a function at Barrackpore CNAT, the program needs
          memory for its parameters, local variables, and the return address.
          This memory is allocated on the <strong>stack</strong> – a region of
          memory that grows and shrinks automatically as functions are called
          and return. Each function call gets its own <strong>stack frame</strong>.
          When the function returns, its frame is deallocated, and that memory
          becomes available for the next call. This automatic allocation is why
          local variables only exist while the function is running.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {[
          {
            title: "Stack Allocation",
            desc: "Memory for local variables and parameters is allocated on the stack. It's fast and automatic.",
            icon: "📚",
          },
          {
            title: "Automatic Storage Duration",
            desc: "Variables declared inside a function have automatic storage – they're created at entry and destroyed at exit.",
            icon: "⏱️",
          },
          {
            title: "Return Address",
            desc: "The address of the next instruction to execute after the function finishes is stored in the stack frame.",
            icon: "↩️",
          },
          {
            title: "Stack Pointer",
            desc: "A CPU register that points to the top of the stack. It moves as frames are pushed and popped.",
            icon: "⬆️",
          },
          {
            title: "Frame Pointer",
            desc: "Often a dedicated register (like BP) that marks the start of the current frame, allowing access to parameters and locals.",
            icon: "📍",
          },
          {
            title: "Reuse of Memory",
            desc: "After a function returns, its stack memory can be reused by the next call – that's why addresses of locals may repeat.",
            icon: "♻️",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={clsx(
              "group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600",
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

      {/* SVG Stack Frame Illustration */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-3xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 500 300" className="w-full">
            {/* Memory addresses (left side) */}
            <text x="20" y="50" fill="#6b7280" fontSize="12">High address</text>
            <text x="20" y="260" fill="#6b7280" fontSize="12">Low address</text>
            <line x1="60" y1="40" x2="60" y2="260" stroke="#6b7280" strokeWidth="1" strokeDasharray="4" />

            {/* Stack frames */}
            {/* main frame */}
            <rect x="100" y="180" width="200" height="60" fill="#4b5563" rx="4" />
            <text x="110" y="210" fill="white" fontSize="12">main() frame</text>
            <text x="110" y="230" fill="white" fontSize="10">local m: 5</text>

            {/* func1 frame */}
            <rect x="100" y="110" width="200" height="60" fill="#059669" rx="4" />
            <text x="110" y="140" fill="white" fontSize="12">func1() frame</text>
            <text x="110" y="160" fill="white" fontSize="10">param x: 5, local y: 10</text>

            {/* func2 frame (top) */}
            <rect x="100" y="40" width="200" height="60" fill="#047857" rx="4" />
            <text x="110" y="70" fill="white" fontSize="12">func2() frame</text>
            <text x="110" y="90" fill="white" fontSize="10">param a: 10, b: 20, local z: 30</text>

            {/* stack pointer arrow */}
            <line x1="320" y1="70" x2="350" y2="70" stroke="#ef4444" strokeWidth="2" />
            <text x="355" y="75" fill="#ef4444" fontSize="12">SP (top)</text>

            {/* frame pointer arrow for func2 */}
            <line x1="320" y1="90" x2="350" y2="110" stroke="#f59e0b" strokeWidth="2" />
            <text x="355" y="115" fill="#f59e0b" fontSize="12">FP (current)</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Each stack frame contains parameters, local variables, and the return address.
            The Stack Pointer (SP) points to the top, the Frame Pointer (FP) helps access the current frame.
          </p>
        </div>
      </section>

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Watching Memory Allocation</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">📦</span> Stack Allocation in Action
            </h3>
            <EditableCCodeBlock
              title="stack_allocation.c – Addresses of locals"
              initialCode={stackAllocation}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tuhina's example shows that local variables have distinct addresses
              in different calls, and that after a function returns, its former
              stack space may be reused by another call.
            </p>
          </div>

          <div
            className={clsx(
              "rounded-xl border border-purple-200 bg-purple-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-purple-900 dark:bg-purple-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
              "motion-safe:animation-delay-200ms"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-purple-700 dark:text-purple-400">
              <span className="mr-2">🔄</span> Recursive Stack Frames
            </h3>
            <EditableCCodeBlock
              title="recursive_stack.c – Each recursive call gets its own frame"
              initialCode={recursiveStack}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Swadeep's recursive function shows that each call creates a new
              frame with its own copy of <code>n</code>, until the base case
              is reached, then frames are popped one by one.
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
            <strong>Stack overflow:</strong> Too many nested calls or large local
            arrays can exhaust stack memory.
          </li>
          <li>
            <strong>Dangling pointers:</strong> Returning the address of a local
            variable – the memory is deallocated, leading to undefined behaviour.
          </li>
          <li>
            <strong>Assuming stack grows upward:</strong> On most systems it
            grows downward (addresses decrease). Never rely on direction.
          </li>
          <li>
            <strong>Large local arrays:</strong> Declaring <code>int arr[1000000]</code>{" "}
            inside a function can blow the stack. Use <code>malloc</code> for large data.
          </li>
          <li>
            <strong>Ignoring return address corruption:</strong> Buffer overflows
            can overwrite the return address, causing security vulnerabilities.
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
            <li>Keep local variables small (e.g., avoid huge arrays on stack).</li>
            <li>Understand that each function call gets its own copies.</li>
            <li>Use static or global variables if data must persist beyond function exit.</li>
            <li>Be mindful of recursion depth – ensure base case is reached.</li>
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
            <li>Return pointers to local variables.</li>
            <li>Write deeply recursive functions without testing stack limits.</li>
            <li>Assume stack addresses are predictable or reusable safely.</li>
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
          <span className="font-medium">Observe carefully:</span> In the{" "}
          <code>stack_allocation.c</code> example, the addresses of local
          variables inside <code>display()</code> are the same each time it's
          called – because the same stack frame location is reused. In the
          recursive example, each call gets a different address because multiple
          frames exist simultaneously. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Modify the recursive function to
            use a large local array (e.g., <code>int big[10000]</code>) and see
            how deep you can recurse before a stack overflow.
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
              🐛 Check stack size with <code>ulimit -s</code>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              On Unix, you can see and adjust stack size. Know your limits when
              using recursion or large locals.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Use <code>alloca()</code> carefully
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <code>alloca()</code> allocates on the stack, but it's not
              standard and can easily overflow.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔍 Understand frame layout for debugging
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Knowing where return addresses are stored helps in low-level
              debugging and understanding buffer overflows.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we use a stack of paper plates. Each plate
              represents a frame, and we write local variables on them. When a
              function returns, we throw away the top plate.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher's Note */}
      <section
        className={clsx(
          "mb-12 rounded-xl border-l-4 border-blue-500 bg-blue-50/80 p-6 dark:bg-blue-900/30",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]",
          "transition-all duration-300 hover:border-l-8 hover:shadow-lg"
        )}
      >
        <h2 className="mb-3 text-2xl font-semibold text-blue-800 dark:text-blue-300">
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
              "One of the biggest 'aha' moments for students is when they
              realise that local variables don't just 'exist' – they are
              physically placed on a stack, and their lifetime is tied to
              function calls. This understanding is crucial for debugging,
              especially with recursion and pointers. I always encourage
              students to print addresses and see the stack in action."
            </p>
          </div>
          <div className="rounded-full bg-blue-200 p-3 dark:bg-blue-800">
            <svg
              className="h-12 w-12 text-blue-700 dark:text-blue-300"
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
            "Do I understand that each function call gets its own stack frame?",
            "Can I explain why local variables vanish after a function returns?",
            "Do I know why returning a pointer to a local is dangerous?",
            "Am I aware of stack size limits for recursion or large arrays?",
            "Can I trace a program and visualise stack frames growing and shrinking?",
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

export default Topic41;