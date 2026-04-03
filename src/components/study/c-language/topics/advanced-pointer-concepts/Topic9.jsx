import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files
import basicCallback from "./topic9_files/basic_callback.c?raw";
import genericSort from "./topic9_files/generic_sort.c?raw";
import eventHandler from "./topic9_files/event_handler.c?raw";

const Topic9 = () => {
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
    { q: "What is a higher-order function in C?", a: "A function that takes another function as a parameter (via function pointer) or returns a function pointer." },
    { q: "How do you declare a function that accepts a function pointer?", a: "`void process(int (*callback)(int), int data);` The parameter is a function pointer." },
    { q: "Why pass function pointers instead of calling functions directly?", a: "For flexibility: the caller decides which function to execute, enabling callbacks, custom sorting, event handling." },
    { q: "What is a callback function?", a: "A function passed to another function, to be called at a later time (e.g., on event, after computation)." },
    { q: "How does `qsort` use a function pointer?", a: "`qsort` takes a comparator function pointer: `int (*compar)(const void*, const void*)`. It calls it to compare elements." },
    { q: "Can you pass a function pointer that itself takes function pointers?", a: "Yes, you can nest them: `void outer(int (*inner)(int (*)(int)))` – but that's rare." },
    { q: "How do you store a function pointer passed as argument for later use?", a: "Assign it to a static or global variable, or store in a struct passed to the function." },
    { q: "What is a generic algorithm using function pointers?", a: "A function that works on any data type by using a comparison or transformation function provided by the caller." },
    { q: "Can you pass a function pointer with a different signature than expected?", a: "No, the signatures must match exactly, or you'll get undefined behavior (or a compiler warning if you're lucky)." },
    { q: "How do you pass a function that returns void and takes void?", a: "`void callBack(void (*func)(void)) { if(func) func(); }`" },
    { q: "What is the typical pattern for callbacks with user data?", a: "Pass both a function pointer and a `void*` context: `void register_callback(void (*cb)(void*), void* user_data);`" },
    { q: "Can you pass a function pointer that is a member of a struct?", a: "Yes, extract it from the struct and pass it, or pass the struct containing it." },
    { q: "How do you create a generic map function using function pointers?", a: "`void map(int arr[], int n, int (*transform)(int))` that applies transform to each element." },
    { q: "What is the performance cost of passing function pointers?", a: "Very low – it's just passing an address. The call overhead is similar to a virtual function in C++." },
    { q: "How do you handle errors in callbacks?", a: "Typically the callback returns a status code, or you provide an error callback." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Topic 9: Passing Function Pointers as Arguments
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Passing functions to other functions is a powerful technique for creating flexible, reusable code. 
            This topic covers callbacks, generic algorithms, and event-driven patterns.
          </p>
        </div>

        {/* Theory */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">Why Pass Function Pointers?</h2>
          <p>
            By passing a function pointer, you allow the caller to inject behavior into a function. This is the foundation of:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Callbacks</strong> – functions that are called later (e.g., event handlers, async completion).</li>
            <li><strong>Generic algorithms</strong> – sort, search, map, filter that work on any data type.</li>
            <li><strong>Strategy pattern</strong> – choose algorithm at runtime (e.g., compression, encryption).</li>
            <li><strong>Plugin architectures</strong> – load functions dynamically.</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p>💡 <strong>Think about:</strong> How would you write a sorting function that can sort integers in ascending or descending order without rewriting the sort logic? Pass a comparator function pointer.</p>
          </div>
        </section>

        {/* Example 1: Basic callback */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">Example 1: Basic Callback Pattern</h2>
          <p>A simple `apply` function that takes an operation (function pointer) and applies it to an integer.</p>
          <EditableCCodeBlock title="Applying a function to a value" initialCode={basicCallback} />
        </section>

        {/* Example 2: Generic sort */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3">Example 2: Generic Sort with Comparator</h2>
          <p>Recreating the `qsort` idea: a sort function that works on any array type by using a comparator function pointer.</p>
          <EditableCCodeBlock title="Generic bubble sort with comparator" initialCode={genericSort} />
        </section>

        {/* Example 3: Event handling system */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">Example 3: Event Handler with User Data</h2>
          <p>A realistic callback system where you register an event handler with a function pointer and a `void*` context.</p>
          <EditableCCodeBlock title="Event handler registration" initialCode={eventHandler} />
        </section>

        {/* Tips & Tricks */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Use typedef for function pointer parameters</strong> – makes function declarations much clearer: `typedef int (*Comparator)(const void*, const void*);`</li>
            <li><strong>Always provide a `void*` user_data parameter</strong> for callbacks – allows state to be passed without globals.</li>
            <li><strong>Document whether the callback can be NULL</strong> and what the behavior is.</li>
            <li><strong>For performance-critical callbacks, avoid calling through a pointer in tight loops if possible</strong> – but often the flexibility is worth it.</li>
            <li><strong>Use function pointers in structs to simulate C++-like virtual tables.</strong></li>
            <li><strong>When debugging, log the callback address to see which function is called.</strong></li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">✅ Best Practices for Passing Function Pointers</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Always check function pointer for NULL before calling inside the receiving function.</strong></li>
            <li><strong>Use consistent naming conventions</strong> – suffix `_callback`, `_fn`, `_handler`.</li>
            <li><strong>If the callback should not be changed, store it as `const` in the struct.</strong></li>
            <li><strong>For library APIs, provide default callbacks (e.g., no-op) to avoid NULL checks.</strong></li>
            <li><strong>Document the expected prototype clearly – parameter and return types.</strong></li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Forgetting to check for NULL before calling the passed function pointer.</strong></li>
            <li><strong>Mismatched signature</strong> – passing a function with wrong return type or parameters.</li>
            <li><strong>Not passing user data</strong> – leading to reliance on global variables.</li>
            <li><strong>Storing a function pointer that goes out of scope</strong> – the pointer itself is fine (code lives forever), but associated data may be lost.</li>
            <li><strong>Assuming the function pointer is valid without verifying</strong> – can come from untrusted source.</li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3">❓ Frequently Asked Questions (15)</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800">
                <p className="font-semibold text-green-600 dark:text-green-400">Q{idx+1}: {faq.q}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
          <Teacher note="At Barrackpore CNAT, I tell students: 'Passing a function pointer is like giving someone your phone number. They can call you when needed.' The receiving function holds onto that number (pointer) and calls you back. This decouples the caller from the callee. Real-world examples: event handlers in GUI libraries, sorting comparators, and signal handlers. Always include a `void* context` – otherwise you'll end up using global variables, which is bad practice." />
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – Passing Function Pointers</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Declare parameter as function pointer type: `void (*callback)(int)`</li>
            <li>✅ Check for NULL before calling inside the function.</li>
            <li>✅ Use `typedef` for readability when signatures are complex.</li>
            <li>✅ Pass `void* user_data` for context.</li>
            <li>✅ Document expected callback behavior.</li>
            <li>✅ Example: `qsort` comparator, event handlers, generic algorithms.</li>
            <li>✅ Avoid relying on global variables in callbacks.</li>
            <li>✅ Test with NULL callbacks to ensure robustness.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic9;