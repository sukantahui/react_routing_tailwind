import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import callStackExample from "./topic40_files/call_stack_example.c?raw";

const Topic40 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
            Call Stack and Stack Frames in Function Calls
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Behind every function call is a stack of frames – like a stack of
          plates – that keeps track of where to return and what data belongs to
          each call.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">What is the Call Stack?</h2>
        <p className="leading-relaxed">
          Imagine Abhronila is in the library at Barrackpore CNAT. She's reading
          a book, then she puts a bookmark and goes to ask the librarian a
          question. The librarian gives her an answer, and she returns to her
          book. The bookmark represents a <strong>stack frame</strong>. When she
          asks a more detailed question, she places another bookmark. Each
          function call places a new frame on the stack, storing local variables
          and the return address. When the function finishes, its frame is
          popped off, and execution resumes where it left off.
        </p>
      </section>

      {/* SVG Stack Illustration */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-2xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 400 300" className="w-full">
            {/* Stack base */}
            <rect x="150" y="200" width="100" height="30" fill="#4b5563" rx="4" />
            <text x="155" y="220" fill="white" fontSize="12">main() frame</text>

            {/* Stack frame 1 */}
            <rect x="150" y="160" width="100" height="30" fill="#059669" rx="4" />
            <text x="155" y="180" fill="white" fontSize="12">func1() frame</text>

            {/* Stack frame 2 (top) */}
            <rect x="150" y="120" width="100" height="30" fill="#047857" rx="4" />
            <text x="155" y="140" fill="white" fontSize="12">func2() frame</text>

            {/* Arrow pointing to current */}
            <line x1="260" y1="135" x2="280" y2="135" stroke="#ef4444" strokeWidth="2" />
            <text x="285" y="140" fill="#ef4444" fontSize="12">current</text>

            {/* Arrows showing push/pop */}
            <text x="270" y="190" fill="#6b7280" fontSize="12">push</text>
            <line x1="265" y1="175" x2="265" y2="160" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="270" y="230" fill="#6b7280" fontSize="12">pop</text>
            <line x1="265" y1="210" x2="265" y2="225" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>

            {/* Labels */}
            <text x="50" y="140" fill="#374151" fontSize="14" fontWeight="bold">Top of stack</text>
            <text x="50" y="220" fill="#374151" fontSize="14" fontWeight="bold">Bottom of stack</text>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Stack grows downward (lower addresses). Each frame holds local
            variables, parameters, and return address.
          </p>
        </div>
      </section>

      {/* Concrete C Example */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Watching the Stack in Action</h2>
        <div
          className={clsx(
            "rounded-xl border border-teal-200 bg-teal-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-teal-900 dark:bg-teal-900/20",
            "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
          )}
        >
          <h3 className="mb-3 flex items-center text-xl font-semibold text-teal-700 dark:text-teal-400">
            <span className="mr-2">📚</span> Nested Function Calls
          </h3>
          <EditableCCodeBlock
            title="call_stack_example.c – Trace the stack"
            initialCode={callStackExample}
          />
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            When <code>main()</code> calls <code>func1()</code>, a frame for{" "}
            <code>func1()</code> is pushed. Then <code>func1()</code> calls{" "}
            <code>func2()</code>, pushing another frame. As each function
            returns, its frame is popped.
          </p>
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
            <strong>Stack overflow:</strong> Too many nested calls (like infinite
            recursion) exhaust stack memory.
          </li>
          <li>
            <strong>Returning pointer to local variable:</strong> The variable's
            frame is popped, memory is reused – leads to dangling pointers.
          </li>
          <li>
            <strong>Assuming stack grows upward:</strong> On most systems it
            grows downward, but never rely on direction.
          </li>
          <li>
            <strong>Large local arrays:</strong> Can exceed stack size if too
            large; use heap for big data.
          </li>
        </ul>
      </section>

      {/* Best Practices Summary */}
      <section className="mb-12 grid gap-6 md:grid-cols-2">
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
            <li>Keep function nesting reasonable (avoid deep recursion).</li>
            <li>Understand that each call creates new copies of local variables.</li>
            <li>Use static or global variables if data must persist across calls.</li>
            <li>Be mindful of stack size when allocating large local arrays.</li>
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
            <li>Return addresses of local variables from functions.</li>
            <li>Assume the stack layout is the same across compilers.</li>
            <li>Write deeply nested calls without understanding the cost.</li>
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
          <span className="font-medium">Observe carefully:</span> In the example
          code, each function has its own copy of local variables. When{" "}
          <code>func2()</code> modifies its <code>z</code>, it doesn't affect{" "}
          <code>func1()</code>'s <code>y</code>. The stack frames keep them
          separate. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Add a <code>printf</code> in each
            function showing the address of its local variable. Notice how
            addresses are stacked (either increasing or decreasing depending on
            your system).
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
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🐛 Debug with <code>backtrace()</code>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              On Linux, <code>backtrace()</code> can print the current call
              stack – useful for debugging crashes.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Limit local array size
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              If you need a large array, use <code>malloc()</code> to put it on
              the heap, not the stack.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🔍 Understand frame pointers
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              The <code>BP</code> (base pointer) register helps navigate stack
              frames – compilers can omit it for optimisation.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Naihati CNAT, we use paper cutouts as stack frames. Students
              physically push and pop frames while tracing code.
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
              "The call stack is one of the most important mental models for any
              programmer. When students understand that each function call gets
              its own private space, they stop being surprised by variable
              behaviour. I always draw the stack on the board, frame by frame,
              as we trace a program. It's an 'aha!' moment for most."
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
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {[
            "Can I visualise the stack when a function calls another?",
            "Do I understand that each call has its own local variables?",
            "Do I know why returning a pointer to a local variable is dangerous?",
            "Am I aware of stack size limits?",
            "Can I trace a program and predict stack frames?",
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

export default Topic40;