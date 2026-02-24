import { useState } from "react";
import clsx from "clsx";

// Import JavaScriptEditableCodeBlock component
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";

// Import raw code examples from topic9_files folder (these files must be created separately)
import callbackHellRaw from "./topic9_files/callbackHell.js?raw";
import promiseIntroRaw from "./topic9_files/promiseIntro.js?raw";
import asyncAwaitRaw from "./topic9_files/asyncAwaitExample.js?raw";
import observableSubscribeRaw from "./topic9_files/observableSubscribe.js?raw";
import conversionRaw from "./topic9_files/conversionExample.js?raw";

// Inline keyframes for fade+slide-up animation (respects reduced motion)
const keyframes = `
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-subtle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const Topic9 = () => {
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
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Topic 9: How Subscribe is Born
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The Complete History: From Callback Hell to Reactive Streams
        </p>
      </header>

      {/* Main Content - stacked sections */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Introduction: The Async Problem */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
            The Asynchronous Challenge
          </h2>
          <p className="mb-4">
            JavaScript is single‑threaded. To avoid blocking the UI, we need to handle operations that take time
            (network requests, file I/O, timers) <em>asynchronously</em>. Early JavaScript used callbacks, but as
            applications grew, callbacks led to unreadable “callback hell”. This drove the invention of Promises,
            then <code>async/await</code>, and finally <strong>Observables</strong> with their <code>.subscribe()</code> method.
          </p>
          <div className="flex justify-center items-center py-4">
            <svg width="500" height="80" viewBox="0 0 500 80">
              <text x="10" y="30" fill="currentColor" fontSize="14">Complexity</text>
              <polyline points="40,50 120,40 200,30 280,20 360,10" stroke="#888" strokeWidth="2" fill="none" />
              <circle cx="40" cy="50" r="5" fill="#f56565" />
              <text x="30" y="70" fontSize="10" fill="currentColor">Callbacks</text>
              <circle cx="120" cy="40" r="5" fill="#48bb78" />
              <text x="110" y="60" fontSize="10" fill="currentColor">Promises</text>
              <circle cx="200" cy="30" r="5" fill="#4299e1" />
              <text x="190" y="50" fontSize="10" fill="currentColor">Async/Await</text>
              <circle cx="280" cy="20" r="5" fill="#ed64a6" />
              <text x="270" y="40" fontSize="10" fill="currentColor">Observables</text>
              <circle cx="360" cy="10" r="5" fill="#9f7aea" />
              <text x="350" y="30" fontSize="10" fill="currentColor">Subscribe</text>
            </svg>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Each new pattern reduced complexity and improved readability.
          </p>
        </section>

        {/* Step 1: Callbacks – The Beginning */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
            Step 1: Callbacks – The First Attempt
          </h2>
          <p className="mb-2">
            In the beginning, asynchronous operations were handled by passing a function (a “callback”) that would be
            invoked when the operation completed. This worked, but nesting multiple async calls quickly became
            unmanageable.
          </p>
          <JavaScriptEditableCodeBlock
            initialCode={callbackHellRaw}
            title="callbackHell.js – The Pyramid of Doom"
          />
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm">
              <strong>Why it was invented:</strong> Callbacks were the only way to handle async operations in early
              JavaScript (Node.js, browser events). They are simple and universal.
            </p>
            <p className="text-sm mt-2">
              <strong>Limitations:</strong> 
              <ul className="list-disc list-inside">
                <li>Callback hell (nested, unreadable code).</li>
                <li>Inversion of control (trusting third‑party libraries to call your callback).</li>
                <li>Error handling is repetitive and easy to miss.</li>
              </ul>
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <strong>Think about:</strong> How would you handle three dependent API calls with callbacks? The code
            indentation would grow like a pyramid.
          </p>
        </section>

        {/* Step 2: Promises – A Standardized Solution */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
            Step 2: Promises – A Giant Leap Forward
          </h2>
          <p className="mb-2">
            Promises were introduced in ES6 to represent a future value. They flatten the chain and provide standard
            error handling via <code>.catch()</code>. A Promise can be in one of three states: pending, fulfilled,
            rejected.
          </p>
          <JavaScriptEditableCodeBlock
            initialCode={promiseIntroRaw}
            title="promiseIntro.js – Promise Basics"
          />
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm">
              <strong>Why it was invented:</strong> To solve callback hell and provide a unified, composable way to
              handle async operations. Inspired by libraries like Q and Bluebird.
            </p>
            <p className="text-sm mt-2">
              <strong>Limitations:</strong> 
              <ul className="list-disc list-inside">
                <li>Only handles a single value (resolves once).</li>
                <li>No built‑in way to handle multiple events over time (like user clicks or WebSocket messages).</li>
                <li>Still requires <code>.then()</code> chaining, which can be verbose.</li>
              </ul>
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <strong>Prototype:</strong> <code>new Promise(executor)</code> – returns a Promise object.
          </p>
        </section>

        {/* Step 3: Async/Await – Syntactic Sugar */}
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
            Step 3: Async/Await – Writing Async Code Like Sync
          </h2>
          <p className="mb-2">
            ES2017 introduced <code>async/await</code>, which builds on Promises. It lets you write asynchronous code
            that looks synchronous, improving readability and reducing boilerplate.
          </p>
          <JavaScriptEditableCodeBlock
            initialCode={asyncAwaitRaw}
            title="asyncAwaitExample.js – Using async/await"
          />
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm">
              <strong>Why it was invented:</strong> To make Promise‑based code even more readable, especially for
              sequential steps. It allows using <code>try/catch</code> for error handling.
            </p>
            <p className="text-sm mt-2">
              <strong>Limitations:</strong> 
              <ul className="list-disc list-inside">
                <li>Still only works with Promises (single values).</li>
                <li>Doesn’t help with streams of values or events.</li>
                <li>Can be misused with <code>await</code> inside loops, causing performance issues.</li>
              </ul>
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <strong>Think about:</strong> <code>await</code> can only be used inside an <code>async</code> function.
            What happens if you forget <code>await</code>? You get a pending promise.
          </p>
        </section>

        {/* Step 4: The Need for Multiple Values – EventEmitters and Streams */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Step 4: The Missing Piece – Multiple Values Over Time
          </h2>
          <p className="mb-2">
            Promises and <code>async/await</code> handle one asynchronous result. But what about events that happen
            multiple times? For example:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>User clicks on a button.</li>
            <li>Live stock price updates via WebSocket.</li>
            <li>Progress notifications from a file upload.</li>
            <li>Messages in a chat application (like one used by <strong>Tuhina</strong> in <strong>Barrackpore</strong>).</li>
          </ul>
          <p>
            For these, the <strong>EventEmitter</strong> pattern (Node.js) and DOM events (<code>addEventListener</code>)
            were used. But they lacked composability and error handling.
          </p>
          <div className="p-4 border rounded-lg mt-4 transition-all duration-300 hover:shadow-md">
            <h3 className="font-bold">EventEmitter Example (Conceptual)</h3>
            <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2">
              {`const chat = new EventEmitter();
chat.on('message', (msg) => console.log(msg));
chat.emit('message', 'Hello from Naihati!');`}
            </pre>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <strong>Limitations of EventEmitters:</strong> No standard way to transform, combine, or filter events;
            difficult to handle errors; memory leaks if listeners aren't removed.
          </p>
        </section>

        {/* Step 5: Observables – The Birth of Subscribe */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
            Step 5: Observables – Handling Streams with .subscribe()
          </h2>
          <p className="mb-2">
            Observables, popularized by <strong>RxJS</strong>, unify the handling of single and multiple values,
            synchronous and asynchronous. They are lazy: nothing happens until you <strong>subscribe</strong>.
            The <code>.subscribe()</code> method is how you start listening to the observable.
          </p>
          <JavaScriptEditableCodeBlock
            initialCode={observableSubscribeRaw}
            title="observableSubscribe.js – RxJS Observable with subscribe"
          />
          <div className="mt-4 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
            <p className="text-sm">
              <strong>Why it was invented:</strong> To provide a unified way to work with event streams, handle multiple
              values, and offer powerful operators (<code>map</code>, <code>filter</code>, <code>merge</code>, etc.).
              It brings the “reactive” programming paradigm to JavaScript.
            </p>
            <p className="text-sm mt-2">
              <strong>Key features:</strong>
              <ul className="list-disc list-inside">
                <li>Can emit 0, 1, or many values.</li>
                <li>Can complete or error.</li>
                <li>Operators allow transformation and composition.</li>
                <li>Subscription returns a disposable object to cancel.</li>
              </ul>
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <strong>Prototype:</strong> <code>observable.subscribe(observer)</code> – returns a Subscription.
          </p>
        </section>

        {/* Step 6: Relating Promises and Observables – Conversion */}
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
            Bridging the Gap: Promise ↔ Observable
          </h2>
          <p className="mb-2">
            You can easily convert between Promises and Observables, allowing you to use the right tool for the job.
          </p>
          <JavaScriptEditableCodeBlock
            initialCode={conversionRaw}
            title="conversionExample.js – Converting between Promise and Observable"
          />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <strong>Tip:</strong> In Angular, <code>HttpClient</code> returns Observables, but you can convert them to
            Promises if you prefer <code>async/await</code>.
          </p>
        </section>

        {/* Step 7: How Everything is Related */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.8s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
            Putting It All Together: The Evolutionary Chain
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 border-l-4 border-red-400 transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="text-2xl">📞</span>
              <div>
                <h3 className="font-bold">Callbacks (1995–2009)</h3>
                <p className="text-sm">The foundation. Simple but leads to “pyramid of doom”.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 border-l-4 border-green-400 transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-bold">Promises (ES6 – 2015)</h3>
                <p className="text-sm">Standardized, flatten chains, better error handling. Built on callbacks under the hood.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 border-l-4 border-blue-400 transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-bold">Async/Await (ES2017)</h3>
                <p className="text-sm">Syntactic sugar over Promises, making async code read like sync.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 border-l-4 border-pink-400 transition-all hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="text-2xl">📡</span>
              <div>
                <h3 className="font-bold">Observables / Subscribe (RxJS – 2010s)</h3>
                <p className="text-sm">Handle streams of values, provide operators, unify sync/async. <code>.subscribe()</code> is the gateway.</p>
              </div>
            </div>
          </div>
          <p className="mt-4">
            <strong>Remember:</strong> Each step built on the previous, learning from its limitations. Today, you can
            choose the right tool: Promises for single async values, Observables for streams.
          </p>
        </section>

        {/* Common Pitfalls & Best Practices */}
        <section
          className={clsx(
            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg"
          )}
          style={{ animationDelay: "0.9s" }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Common Pitfalls & Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Beginner Mistakes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Not returning a Promise in a <code>.then()</code> chain.</li>
                <li>Using <code>await</code> inside loops without considering concurrency.</li>
                <li>Forgetting to unsubscribe from Observables → memory leaks.</li>
                <li>Mixing Promises and Observables without proper conversion.</li>
                <li>Assuming Observables are eager (they are lazy).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-600 dark:text-green-400 mb-2">✅ Best Practices</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Prefer <code>async/await</code> for sequential Promise‑based code.</li>
                <li>Use <code>Promise.all</code> for independent parallel tasks.</li>
                <li>Always handle errors: <code>.catch()</code> or <code>try/catch</code>.</li>
                <li>In RxJS, use <code>takeUntil</code> or <code>async</code> pipe to auto‑unsubscribe.</li>
                <li>Learn key operators: <code>map</code>, <code>filter</code>, <code>switchMap</code>, <code>catchError</code>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section
          className={clsx(
            "bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded-xl p-6 shadow-md",
            "animate-[fadeInUp_0.6s_ease-out] motion-safe:animate-[fadeInUp_0.6s_ease-out]",
            "transition-all duration-300 hover:shadow-lg hover:border-amber-500",
            hoveredTeacher ? "scale-[1.01]" : ""
          )}
          style={{ animationDelay: "1s" }}
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
                "I've seen JavaScript grow from callbacks to reactive programming. The key insight is that each new
                pattern emerged to solve a real pain. When teaching, always start with a concrete problem:
                <strong>Swadeep</strong> wants to fetch data from three APIs sequentially. Show the callback hell,
                then introduce Promises, then <code>async/await</code>. Finally, when <strong>Debangshu</strong> wants
                to listen to live cricket scores, introduce Observables and <code>.subscribe()</code>."
              </p>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner">
              <h3 className="font-bold mb-2">🎯 Points to remember:</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Callbacks → error handling and nesting problems.</li>
                <li>Promises → .then() chaining, single value.</li>
                <li>Async/Await → syntactic sugar over Promises.</li>
                <li>Observables → multiple values, lazy, composable.</li>
                <li>Always clean up subscriptions.</li>
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
          style={{ animationDelay: "1.1s" }}
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
                  <input type="checkbox" className="rounded" /> I can explain why callbacks led to Promises.
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> I understand that Promises handle a single value.
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> I know how to convert a Promise to an Observable and vice versa.
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> I can describe a real‑world scenario where Observables are better.
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" /> I remember to unsubscribe to avoid memory leaks.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-bold mb-2">💡 Hint</h3>
              <p className="text-sm">
                <strong>Observe carefully:</strong> In the Observable example, try removing the <code>unsubscribe()</code> call.
                What happens after the component unmounts? The interval keeps running – that's a memory leak.
              </p>
              <p className="text-sm mt-2">
                <strong>Think about:</strong> How would you model a live chat with multiple users (like <strong>Tuhina</strong>,
                <strong>Abhronila</strong>, and <strong>Debangshu</strong>) using Observables? Each message is a new value.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic9;