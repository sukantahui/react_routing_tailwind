import { useState } from "react";
import clsx from "clsx";

// Import EditableCodeBlock component (assumed to be exported from the given path)
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";

// Import raw code examples from topic0_files folder (these files must be created separately)
import promiseBasicRaw from "./topic8_files/promise_basic.js?raw";
import promiseChainRaw from "./topic8_files/promise_chain.js?raw";
import asyncAwaitRaw from "./topic8_files/async_await_example.js?raw";
import errorHandlingRaw from "./topic8_files/error_handling.js?raw";

// Inline keyframes for fade+slide-up animation (respects reduced motion)
const keyframes = `
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic8 = () => {
  const [hoveredTeacher, setHoveredTeacher] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 md:p-8 leading-relaxed">
      <style>{keyframes}</style>

      {/* Header Section */}
      <header
        className={clsx(
          "max-w-4xl mx-auto mb-12 text-center",
          "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]"
        )}
      >
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Promises & Async/Await: The Evolution
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          From callback chaos to clean asynchronous code
        </p>
      </header>

      {/* Main Content - stacked sections */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section 1: Evolution Timeline (SVG) */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            The Evolution of Async JavaScript
          </h2>
          <div className="flex justify-center items-center py-4">
            {/* SVG Timeline with hover animations */}
            <svg width="500" height="120" viewBox="0 0 500 120" className="max-w-full">
              {/* Stage 1: Callback Hell */}
              <g className="group">
                <circle
                  cx="80"
                  cy="60"
                  r="25"
                  fill="#f56565"
                  className="transition-all duration-300 group-hover:r-30 group-hover:filter group-hover:drop-shadow-lg"
                />
                <text x="80" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Callback
                </text>
                <text x="80" y="100" textAnchor="middle" fill="currentColor" fontSize="12" className="font-medium">
                  (2009)
                </text>
                {/* Animated connecting line */}
                <line
                  x1="105"
                  y1="60"
                  x2="195"
                  y2="60"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="strokeDashoffset"
                    from="8"
                    to="0"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
              </g>

              {/* Stage 2: Promises */}
              <g className="group">
                <circle
                  cx="200"
                  cy="60"
                  r="25"
                  fill="#48bb78"
                  className="transition-all duration-300 group-hover:r-30 group-hover:filter group-hover:drop-shadow-lg"
                />
                <text x="200" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Promise
                </text>
                <text x="200" y="100" textAnchor="middle" fill="currentColor" fontSize="12" className="font-medium">
                  (ES6)
                </text>
                {/* Animated connecting line */}
                <line
                  x1="225"
                  y1="60"
                  x2="315"
                  y2="60"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="strokeDashoffset"
                    from="8"
                    to="0"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
              </g>

              {/* Stage 3: Async/Await */}
              <g className="group">
                <circle
                  cx="340"
                  cy="60"
                  r="25"
                  fill="#4299e1"
                  className="transition-all duration-300 group-hover:r-30 group-hover:filter group-hover:drop-shadow-lg"
                />
                <text x="340" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Async/Await
                </text>
                <text x="340" y="100" textAnchor="middle" fill="currentColor" fontSize="12" className="font-medium">
                  (ES2017)
                </text>
              </g>
            </svg>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            <span className="font-semibold">Callback Hell</span> → <span className="font-semibold">Promises</span> →{" "}
            <span className="font-semibold">Async/Await</span>
          </p>
        </section>

        {/* Section 2: What is a Promise? */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
            What is a Promise?
          </h2>
          <p className="mb-4">
            A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.
            Think of it like a real‑world promise — for example, <strong>Swadeep</strong> promises to bring sweets from{" "}
            <strong>Barrackpore</strong>. At first, it’s <em>pending</em>. Then it either <em>fulfills</em> (sweets
            arrive) or <em>rejects</em> (he forgets).
          </p>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow">
              <h3 className="font-bold">Pending</h3>
              <p className="text-sm">Initial state, neither fulfilled nor rejected.</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-400 transition-all duration-300 hover:scale-105 hover:shadow">
              <h3 className="font-bold">Fulfilled</h3>
              <p className="text-sm">Operation completed successfully.</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-400 transition-all duration-300 hover:scale-105 hover:shadow">
              <h3 className="font-bold">Rejected</h3>
              <p className="text-sm">Operation failed.</p>
            </div>
          </div>

          {/* Code Example: Basic Promise */}
          <h3 className="text-xl font-medium mt-6 mb-2">Basic Promise Creation</h3>
          <JavaScriptEditableCodeBlock
            initialCode={promiseBasicRaw}
            title="promise_basic.js - Creating and consuming a Promise"
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <strong>Prototype:</strong> <code>new Promise(executor)</code> — returns a Promise object.
          </p>
        </section>

        {/* Section 3: Chaining Promises */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
            Promise Chaining
          </h2>
          <p className="mb-4">
            Promises solve the “callback hell” by allowing you to chain asynchronous operations. Each <code>.then()</code>{" "}
            returns a new promise, making the code flat and readable.
          </p>
          <JavaScriptEditableCodeBlock
            initialCode={promiseChainRaw}
            title="promise_chain.js - Sequential async steps"
          />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <strong>Tip:</strong> Always return a value or a promise from <code>.then()</code> to keep the chain going.
          </p>
        </section>

        {/* Section 4: Async/Await - syntactic sugar */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            Async/Await: Writing Async Code Like Sync
          </h2>
          <p className="mb-4">
            <code>async</code> functions always return a Promise. Inside them, you can use <code>await</code> to pause
            execution until a Promise settles. This makes asynchronous code look and behave more like synchronous code.
          </p>
          <JavaScriptEditableCodeBlock
            initialCode={asyncAwaitRaw}
            title="async_await_example.js - Using async/await"
          />
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm">
              <strong>Observe carefully:</strong> The function marked <code>async</code> automatically wraps the return
              value in a Promise. If you return a value, it becomes a fulfilled promise; if you throw, it becomes a
              rejected promise.
            </p>
          </div>
        </section>

        {/* Section 5: Error Handling */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
            Error Handling: <code>.catch()</code> vs <code>try/catch</code>
          </h2>
          <p className="mb-4">
            With promises, you handle errors using <code>.catch()</code>. With async/await, you wrap <code>await</code>{" "}
            calls in <code>try...catch</code>. Both are valid and can be mixed.
          </p>
          <JavaScriptEditableCodeBlock
            initialCode={errorHandlingRaw}
            title="error_handling.js - Catching errors"
          />
        </section>

        {/* Section 6: Common Pitfalls & Best Practices */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Common Pitfalls & Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Beginner Mistakes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Forgetting to return a promise in a <code>.then()</code> chain.</li>
                <li>Using <code>async/await</code> without <code>try/catch</code> – unhandled rejections.</li>
                <li>Creating new Promise when not needed (many APIs already return promises).</li>
                <li>Assuming <code>await</code> makes code synchronous (it doesn’t block the event loop).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-600 dark:text-green-400 mb-2">✅ Best Practices</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Always handle errors – either with <code>.catch()</code> or <code>try/catch</code>.</li>
                <li>Use <code>Promise.all</code> for independent parallel tasks.</li>
                <li>Avoid mixing too many <code>.then()</code> and <code>await</code> in the same function.</li>
                <li>Name your promise variables clearly (e.g., <code>userDataPromise</code>).</li>
                <li>Remember: <code>async</code> functions always return a Promise – even if you return <code>undefined</code>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Real-World Usage */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Real-World Scenarios
          </h2>
          <p className="mb-4">
            Promises and async/await are everywhere in modern JavaScript:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Fetching data from an API</strong> – e.g., getting weather for <strong>Ichapur</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Reading files</strong> in Node.js (fs.promises).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Database queries</strong> – <strong>Tuhina</strong> fetching student records.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Timers / delays</strong> – e.g., waiting for a user action.</span>
            </li>
          </ul>
        </section>

        {/* Teacher's Note */}
        <section
          className={clsx(
            "bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg hover:border-amber-500",
            hoveredTeacher ? "scale-[1.01]" : ""
          )}
          style={{ animationDelay: "0.8s" }}
          onMouseEnter={() => setHoveredTeacher(true)}
          onMouseLeave={() => setHoveredTeacher(false)}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
            👨‍🏫 Teacher's Note
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <p className="mb-2">
                <strong>Sukanta Hui</strong> (27 years experience)
              </p>
              <p className="text-sm">
                Email: <a href="mailto:sukantahui@codernaccotax.co.in" className="text-blue-600 dark:text-blue-400 underline">sukantahui@codernaccotax.co.in</a><br />
                Mobile: 7003756860
              </p>
              <p className="mt-3">
                "Think of promises as a way to write asynchronous code without losing your sanity. Start with small
                examples — like having <strong>Debangshu</strong> order food from <strong>Shyamnagar</strong> — and
                gradually introduce error handling. Always emphasise that <code>await</code> only works inside
                <code>async</code> functions."
              </p>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner">
              <h3 className="font-bold mb-2">🎯 Points to remember:</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Promise states: pending → fulfilled / rejected (one-way).</li>
                <li>Async functions always return a Promise.</li>
                <li>Await stops execution of the function, not the whole program.</li>
                <li>Always handle rejections – unhandled rejections can crash Node.js.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mini Checklist & Hint */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.9s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
            ✅ Mini Checklist & Hint
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Checklist</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> I understand the three states of a Promise.
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> I can chain multiple <code>.then()</code> calls.
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> I know how to convert a callback function to return a
                  Promise.
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> I can use <code>async/await</code> with error handling.
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> I remember that <code>await</code> is only valid inside
                  <code>async</code> functions.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-bold mb-2">💡 Hint</h3>
              <p className="text-sm">
                <strong>Observe carefully:</strong> When you mark a function as <code>async</code>, it automatically
                wraps the returned value in a resolved promise. Try changing the return value of an async function and
                log it without <code>await</code> — you’ll see a Promise object.
              </p>
              <p className="text-sm mt-2">
                <strong>Think about:</strong> What happens if you forget <code>await</code> before a promise? You get a
                pending promise instead of the resolved value.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic8;