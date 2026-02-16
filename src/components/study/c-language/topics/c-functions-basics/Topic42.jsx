import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import returnInt from "./topic42_files/return_int.c?raw";
import returnStruct from "./topic42_files/return_struct.c?raw";

const Topic42 = () => {
  // Calculate teacher's experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-yellow-400">
            How Return Values Travel Back Through the Stack
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          When a function finishes, its result must find its way back to the
          caller – via registers, the stack, or hidden pointers. Understanding
          this reveals how functions really communicate.
        </p>
      </header>

      {/* Introduction Section */}
      <section
        className={clsx(
          "mb-12 rounded-xl bg-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800/50",
          "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
        )}
      >
        <h2 className="mb-4 text-2xl font-semibold">The Journey of a Return Value</h2>
        <p className="leading-relaxed">
          At Naihati CNAT, Abhronila writes a function <code>add(a, b)</code> that
          returns their sum. When the function ends, where does that sum go?
          The CPU uses a dedicated register (like <code>EAX</code> on x86) to
          hold the return value. The caller, after the function returns, reads
          that register. For larger values (like structures), the compiler may
          use a hidden pointer passed as an extra argument, or place the result
          on the stack. This invisible handshake between caller and callee is
          what makes functions useful.
        </p>
      </section>

      {/* Key Concepts Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Return Register",
            desc: "Small return values (int, pointers, etc.) are stored in a dedicated CPU register (EAX/RAX on x86).",
            icon: "📟",
          },
          {
            title: "Hidden Pointer",
            desc: "For large structs, the caller passes an extra hidden pointer where the callee writes the result.",
            icon: "🎯",
          },
          {
            title: "Stack Return",
            desc: "Some ABIs place the return value on the stack, or use a combination of registers and stack.",
            icon: "📚",
          },
          {
            title: "Caller Cleanup",
            desc: "The caller is responsible for reading the return value from its location before the next call overwrites it.",
            icon: "🧹",
          },
          {
            title: "Volatile Registers",
            desc: "Return registers are often volatile – they can be changed by subsequent calls, so the caller must save the value if needed.",
            icon: "⚡",
          },
          {
            title: "Void Functions",
            desc: "Functions with no return value don't place anything in the return register.",
            icon: "🚫",
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

      {/* SVG Return Value Illustration */}
      <section className="mb-12 flex justify-center">
        <div className="w-full max-w-3xl rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
          <svg viewBox="0 0 500 300" className="w-full">
            {/* Caller frame */}
            <rect x="50" y="150" width="180" height="80" fill="#4b5563" rx="4" />
            <text x="70" y="180" fill="white" fontSize="12">caller() frame</text>
            <text x="70" y="210" fill="white" fontSize="10">local x = add(5,3)</text>

            {/* Callee frame */}
            <rect x="270" y="50" width="180" height="80" fill="#059669" rx="4" />
            <text x="290" y="80" fill="white" fontSize="12">add() frame</text>
            <text x="290" y="110" fill="white" fontSize="10">return 8</text>

            {/* Return register (EAX) */}
            <rect x="330" y="160" width="60" height="40" fill="#f59e0b" rx="4" />
            <text x="340" y="185" fill="white" fontSize="12">EAX</text>
            <text x="350" y="200" fill="white" fontSize="10">8</text>

            {/* Arrow from callee to register */}
            <line x1="360" y1="130" x2="360" y2="160" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="370" y="140" fill="#ef4444" fontSize="10">function stores</text>

            {/* Arrow from register to caller */}
            <line x1="360" y1="200" x2="360" y2="230" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <text x="370" y="220" fill="#3b82f6" fontSize="10">caller reads</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            The called function stores the result in a designated register; the caller retrieves it after return.
          </p>
        </div>
      </section>

      {/* Concrete C Examples */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Return Values in Action</h2>
        <div className="grid gap-8 lg:grid-cols-1">
          <div
            className={clsx(
              "rounded-xl border border-green-200 bg-green-50/50 p-5 transition-all duration-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20",
              "motion-safe:animate-[fadeSlideUp_0.6s_ease-out]"
            )}
          >
            <h3 className="mb-3 flex items-center text-xl font-semibold text-green-700 dark:text-green-400">
              <span className="mr-2">🔢</span> Returning an Integer
            </h3>
            <EditableCCodeBlock
              title="return_int.c – Simple register return"
              initialCode={returnInt}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Debangshu's function returns an <code>int</code>. The value is
              placed in the return register (<code>EAX</code>). The caller uses
              it directly.
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
              <span className="mr-2">🏗️</span> Returning a Structure
            </h3>
            <EditableCCodeBlock
              title="return_struct.c – Hidden pointer"
              initialCode={returnStruct}
            />
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              When Tuhina returns a struct, the compiler often passes a hidden
              pointer to a location in the caller's frame where the struct is
              copied. The actual return value in the register may be that pointer.
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
            <strong>Ignoring return value:</strong> Calling a function that
            returns a value but not using it – legal but often a logic bug.
          </li>
          <li>
            <strong>Returning pointer to local:</strong> The local variable's
            memory is reclaimed; the pointer becomes dangling.
          </li>
          <li>
            <strong>Assuming return register persists:</strong> After a function
            returns, the return register may be overwritten by the next call.
            Save it if needed.
          </li>
          <li>
            <strong>Forgetting return in non-void function:</strong> Undefined
            behaviour – the caller will read whatever garbage is in the return
            register.
          </li>
          <li>
            <strong>Returning large structs repeatedly:</strong> Can cause
            performance overhead due to copying.
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
            <li>Always return a value from non-void functions (all paths).</li>
            <li>Use return values for error codes or results.</li>
            <li>Prefer returning small types (int, char, pointers) for efficiency.</li>
            <li>If you need to return multiple values, consider returning a struct or using out‑parameters.</li>
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
            <li>Ignore return values unless you have a good reason.</li>
            <li>Return large structs by value if performance is critical (use pointers).</li>
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
          <span className="font-medium">Observe carefully:</span> In the
          <code>return_struct.c</code> example, you might not see the hidden
          pointer in C code, but if you look at the generated assembly, you'll
          notice the caller passes an extra address. This is how large objects
          are returned efficiently. <br />
          <span className="mt-2 block">
            <strong>Try changing this:</strong> Modify the struct to have many
            fields (e.g., 100 integers). Compare the performance of returning by
            value vs. passing a pointer to a struct that the function fills.
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
              🛠️ Use Return for Error Codes
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              In many APIs, functions return 0 on success, non-zero on error.
              This is a clean way to handle failures.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              📏 Check Assembly Output
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Use <code>gcc -S</code> to see how return values are implemented
              on your platform. It's eye-opening.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🧪 Return by Value for Small Objects
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Modern compilers optimise small struct returns (often using
              registers). Don't prematurely pessimise by using pointers.
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <p className="font-medium text-emerald-700 dark:text-emerald-400">
              🏫 Classroom Shortcut
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              At Barrackpore CNAT, we simulate return values by passing a note
              between students: the caller gives a blank paper (hidden pointer),
              the callee writes the answer, and the caller reads it.
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
              "Many students treat 'return x;' as magic. But understanding that
              it's just placing a value in a register (or via a hidden pointer)
              demystifies function calls. It also explains why returning a local
              pointer is dangerous – the register holds an address, but the
              memory is gone. Always think about where your data lives."
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
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {[
            "Do I know where simple return values are stored (register)?",
            "Do I understand how large structs are returned (hidden pointer)?",
            "Do I always return a value from non-void functions?",
            "Do I avoid returning pointers to local variables?",
            "Can I explain the difference between return by value and return by pointer?",
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

export default Topic42;