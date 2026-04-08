import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files
import sortCallback from "./topic10_files/sort_callback.c?raw";
import asyncCallback from "./topic10_files/async_callback.c?raw";
import menuCallbacks from "./topic10_files/menu_callbacks.c?raw";

const Topic10 = () => {
  const keyframes = `
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fadeSlideUp { animation: none !important; opacity: 1 !important; transform: none !important; }
    }
  `;

  const faqs = [
    { q: "What is a callback in C?", a: "A callback is a function passed as an argument to another function, to be executed later. It enables inversion of control." },
    { q: "Why are callbacks useful in real-world programming?", a: "They allow event-driven programming (GUI, network), generic algorithms (sort, map), and decoupling of concerns." },
    { q: "How does qsort use callbacks?", a: "qsort takes a comparator callback function pointer. It calls it to compare elements, allowing sorting of any data type." },
    { q: "What is the typical prototype for a comparator callback?", a: "`int compar(const void *a, const void *b);` Returns negative if a<b, zero if equal, positive if a>b." },
    { q: "How do you pass additional data to a callback (context)?", a: "Use a `void*` user_data parameter. The caller provides data, and the callback receives it when invoked." },
    { q: "What is an event loop and how are callbacks used there?", a: "An event loop waits for events (mouse, keyboard, timer) and calls registered callback functions for each event." },
    { q: "Can callbacks be used for asynchronous I/O?", a: "Yes. Register a callback to be called when I/O completes. This avoids blocking while waiting." },
    { q: "What is a signal handler? Is it a callback?", a: "Yes. Using `signal()` or `sigaction()`, you register a function that the OS calls when a signal (e.g., Ctrl+C) occurs." },
    { q: "How do you avoid global variables with callbacks?", a: "Pass a `void* context` that contains all needed state. The callback casts it back and uses it." },
    { q: "What is a callback hell? Does it exist in C?", a: "Nested callbacks leading to hard-to-read code. In C, it's less common but can happen with deeply nested event handlers." },
    { q: "How do you handle errors in callbacks?", a: "Return an error code from the callback, or provide a separate error callback function." },
    { q: "What is the performance cost of callbacks?", a: "Very low – indirect function call overhead. But can prevent compiler inlining." },
    { q: "Can you unregister a callback?", a: "Yes. Typically you store the function pointer and can set it to NULL or call an unregister function." },
    { q: "Are function pointers the only way to implement callbacks in C?", a: "Yes, because C has no closures or lambdas. Function pointers are the standard mechanism." },
    { q: "What real-world libraries use callbacks extensively?", a: "GTK (GUI), libcurl (network), pthreads (thread creation), SQLite (authorization, progress), and many more." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Topic 10: Callback Mechanisms & Real-World Usage
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Callbacks are everywhere in real C programming: from GUI event handlers to sorting comparators, 
            asynchronous I/O completions to signal handling. This topic explores practical callback patterns 
            used in professional systems.
          </p>
        </div>

        {/* Theory */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3">What Makes Callbacks Powerful?</h2>
          <p>
            A callback is a function that you provide to a library or framework, which the framework will call at an appropriate time. 
            This <strong>inversion of control</strong> is fundamental to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Event-driven programming</strong> – GUI, game loops, network servers.</li>
            <li><strong>Generic algorithms</strong> – sorting, searching, filtering without code duplication.</li>
            <li><strong>Asynchronous operations</strong> – I/O, timers, threads – notify when ready.</li>
            <li><strong>Plugin systems</strong> – load code dynamically and call into it.</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p>💡 <strong>Think about:</strong> How does a button in a GUI know what code to run when clicked? The GUI library doesn't know your app logic – you register a callback function that the library calls on click.</p>
          </div>
        </section>

        {/* Example 1: Sort callback (qsort style) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">Example 1: Sorting with a Comparator Callback</h2>
          <p>The classic example from the standard library: <code>qsort</code> uses a callback to compare elements, making it generic.</p>
          <EditableCCodeBlock title="Sorting integers and strings with qsort" initialCode={sortCallback} />
        </section>

        {/* Example 2: Asynchronous callback (simulated I/O) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">Example 2: Asynchronous Callback (Simulated I/O)</h2>
          <p>Many real systems (network, file I/O) use callbacks to notify when an operation completes without blocking.</p>
          <EditableCCodeBlock title="Simulated async read with callback" initialCode={asyncCallback} />
        </section>

        {/* Example 3: Menu system with callbacks */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">Example 3: Menu System Using Callbacks (Real-world CLI tool)</h2>
          <p>Text-based menus often store a function pointer for each menu item, making the main loop simple and extensible.</p>
          <EditableCCodeBlock title="Callback-driven menu system" initialCode={menuCallbacks} />
        </section>

        {/* Tips & Tricks */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Always provide a <code>void* user_data</code> in callback APIs</strong> – avoid global variables.</li>
            <li><strong>Use <code>typedef</code> for callback signatures</strong> – makes code self-documenting and reduces errors.</li>
            <li><strong>Document whether the callback may be called multiple times, and if it can be NULL.</strong></li>
            <li><strong>Be careful with callback recursion</strong> – a callback that triggers the same event again can cause stack overflow.</li>
            <li><strong>In performance-critical code, consider making callbacks non-virtual (direct) if possible</strong> – but often the flexibility is worth it.</li>
            <li><strong>For library code, allow callbacks to return a value to control behavior</strong> (e.g., continue/stop iteration).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">✅ Best Practices for Callback Design</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Check for NULL before calling a callback</strong> – provide default behavior if none registered.</li>
            <li><strong>Make callbacks <code>const</code> if they should not be changed after registration.</strong></li>
            <li><strong>Use meaningful names for callback functions</strong> – e.g., <code>onDataReceived</code>, <code>compareInts</code>.</li>
            <li><strong>Keep callbacks short</strong> – they should do one thing and return quickly to avoid blocking event loops.</li>
            <li><strong>If a callback allocates memory, document who is responsible for freeing.</strong></li>
            <li><strong>Test with NULL callbacks and error cases to ensure robustness.</strong></li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Not checking for NULL callback</strong> – leads to segmentation fault.</li>
            <li><strong>Using global variables instead of user data</strong> – makes code non-reentrant and hard to test.</li>
            <li><strong>Assuming the callback is called immediately</strong> – asynchronous callbacks may be called later, possibly on a different thread.</li>
            <li><strong>Forgetting to unregister callbacks before freeing resources</strong> – leads to dangling function pointers and crashes.</li>
            <li><strong>Calling long-running or blocking code inside a callback</strong> – can freeze an event loop.</li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3">❓ Frequently Asked Questions (15)</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800">
                <p className="font-semibold text-red-600 dark:text-red-400">Q{idx+1}: {faq.q}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
          <Teacher note="Callbacks are like 'please call me back' – you give your phone number (function pointer) and the system calls you when something happens. At Barrackpore CNAT, I show students the menu system example: it's exactly how many CLI tools work. Real-world: `pthread_create` takes a start routine (callback), `atexit` registers callbacks for program exit, `signal` registers callbacks for OS signals. Always pass a `void* context` – it's the professional way to avoid globals. Remember: a callback should be fast; if it needs to do heavy work, spawn a thread or queue the work." />
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – Callback Mechanisms</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Callback = function pointer passed to another function.</li>
            <li>✅ Enables event-driven, generic, and async code.</li>
            <li>✅ Always check for NULL before calling.</li>
            <li>✅ Use `void* user_data` for context.</li>
            <li>✅ Examples: qsort comparator, GUI click handler, async I/O completion.</li>
            <li>✅ Keep callbacks short and non-blocking.</li>
            <li>✅ Unregister callbacks before freeing associated resources.</li>
            <li>✅ Use typedef for callback signatures to improve readability.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic10;