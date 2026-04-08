import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files for examples
import basicFuncPtr from "./topic6_files/basic_func_ptr.c?raw";
import funcPtrArray from "./topic6_files/func_ptr_array.c?raw";
import callbackExample from "./topic6_files/callback_example.c?raw";

const Topic6 = () => {
  // Inline keyframes for animations
  const keyframes = `
    @keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes subtlePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-fadeSlideUp, .animate-subtlePulse {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `;

  // Q&A data
  const faqs = [
    {
      q: "What is a function pointer?",
      a: "A function pointer is a variable that stores the address of a function. It can be used to call the function indirectly, passed as an argument to other functions, or stored in arrays.",
    },
    {
      q: "How do you declare a function pointer that points to a function returning int and taking two ints?",
      a: "`int (*funcPtr)(int, int);` The parentheses around `*funcPtr` are necessary; otherwise `int *funcPtr(int, int)` would be a function returning a pointer.",
    },
    {
      q: "Why use function pointers instead of direct calls?",
      a: "They enable callbacks, plugin architectures, state machines, and runtime dispatch (e.g., choosing which algorithm to execute based on user input).",
    },
    {
      q: "What is the syntax to call a function via pointer?",
      a: "Both `(*funcPtr)(args)` and `funcPtr(args)` work. Modern C prefers the simpler `funcPtr(args)`.",
    },
    {
      q: "Can you have an array of function pointers?",
      a: "Yes. Example: `int (*operations[4])(int, int) = {add, sub, mul, div};` Then call `operations[choice](a, b)`.",
    },
    {
      q: "What is a callback function?",
      a: "A function passed as an argument to another function, to be 'called back' at a later time. Used in event handling, sorting comparators, signal handlers.",
    },
    {
      q: "How do you pass a function pointer as a parameter?",
      a: "Declare the parameter as a function pointer type, e.g., `void sort(int arr[], int n, int (*compare)(int, int))`.",
    },
    {
      q: "What is the difference between `int *func(int, int)` and `int (*func)(int, int)`?",
      a: "First is a function returning a pointer to int. Second is a pointer to a function returning int.",
    },
    {
      q: "Can function pointers be used with `typedef`?",
      a: "Yes, for readability: `typedef int (*Operation)(int, int);` Then `Operation op = add;`",
    },
    {
      q: "How do you store member functions of a struct using function pointers?",
      a: "Define function pointer members inside the struct, then assign actual functions to them to simulate methods (common in C for OOP-style code).",
    },
    {
      q: "What is a common mistake with function pointers?",
      a: "Forgetting the parentheses: `int *funcPtr` instead of `int (*funcPtr)`. Also mismatched signatures cause undefined behavior.",
    },
    {
      q: "Can function pointers be compared for equality?",
      a: "Yes, two function pointers can be compared (`==` or `!=`) if they point to the same function or both are NULL.",
    },
    {
      q: "How does `qsort` use function pointers?",
      a: "`qsort` takes a comparator function pointer: `int (*compar)(const void*, const void*)`. It calls this function to compare elements.",
    },
    {
      q: "What is a jump table? Give an example using function pointers.",
      a: "An array of function pointers used to replace switch-case for dispatching. Example: command parser where each command index maps to a handler function.",
    },
    {
      q: "Are function pointers type-safe?",
      a: "C function pointers are weakly type-checked. Assigning a function with wrong signature may compile but cause crashes at runtime. Using typedefs helps.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <div
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]"
          style={{ animationFillMode: "both" }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Topic 6: Function Pointers
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Function pointers allow you to treat code as data. They are the foundation of callbacks, state machines, 
            dynamic dispatch, and plugin architectures. Mastering them elevates your C programming to an advanced level.
          </p>
        </div>

        {/* Concept Explanation */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">What Are Function Pointers?</h2>
          <p>
            Just like data pointers store addresses of variables, <strong>function pointers store addresses of functions</strong>. 
            They enable indirect function calls, which is essential for:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>Callbacks</strong> – passing a function to be executed later (e.g., event handlers, comparators).</li>
            <li><strong>State machines & dispatch tables</strong> – replacing large switch-case statements with arrays of function pointers.</li>
            <li><strong>Runtime polymorphism in C</strong> – selecting which function to call based on runtime conditions.</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p>💡 <strong>Think about:</strong> How would you write a calculator that can add, subtract, multiply, or divide based on user input without using a long switch-case? A jump table (array of function pointers) is the answer.</p>
          </div>
        </section>

        {/* Example 1: Basic Function Pointer */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">Basic Syntax & Usage</h2>
          <p>
            Declaration: <code>returnType (*pointerName)(parameterTypes);</code><br/>
            Assignment: <code>pointerName = functionName;</code> (function name decays to address)<br/>
            Calling: <code>pointerName(args);</code> or <code>(*pointerName)(args);</code>
          </p>
          <EditableCCodeBlock
            title="Example 1: Declaring, assigning, and calling via function pointer"
            initialCode={basicFuncPtr}
          />
        </section>

        {/* Example 2: Array of Function Pointers (Jump Table) */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">Array of Function Pointers (Jump Table)</h2>
          <p>
            A jump table replaces <code>switch</code> with an array of function pointers. It's faster for many cases and cleaner for extensible code.
          </p>
          <EditableCCodeBlock
            title="Example 2: Calculator using function pointer array"
            initialCode={funcPtrArray}
          />
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
            <p><strong>Observation:</strong> The array <code>operations</code> holds four function pointers. The choice index directly selects which function to call, eliminating a large switch statement.</p>
          </div>
        </section>

        {/* Example 3: Callback Function (qsort style) */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3">Callbacks & Passing Function Pointers</h2>
          <p>
            A callback is a function passed to another function. The standard library's <code>qsort</code> is a prime example: you provide a comparator function that <code>qsort</code> calls back to compare elements.
          </p>
          <EditableCCodeBlock
            title="Example 3: Generic bubble sort with comparator callback"
            initialCode={callbackExample}
          />
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p><strong>⚠️ Common Pitfall:</strong> Mismatched function signatures cause undefined behavior. Always ensure the callback's parameters and return type exactly match what the caller expects.</p>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Use <code>typedef</code> for readability:</strong> <code>typedef int (*Comparator)(const void*, const void*);</code> makes code self-documenting.</li>
            <li><strong>Prefer <code>funcPtr(args)</code> over <code>(*funcPtr)(args)</code>:</strong> Modern C allows the simpler syntax.</li>
            <li><strong>Initialize function pointers to NULL:</strong> Always check if a function pointer is NULL before calling to avoid crashes.</li>
            <li><strong>Function pointers can be stored in structs:</strong> This is how you emulate methods in C (object-oriented style).</li>
            <li><strong>Use function pointers for state machines:</strong> Each state can be a function pointer; transitions change the pointer.</li>
            <li><strong>In embedded systems, function pointers enable interrupt vector tables and runtime reconfiguration.</strong></li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">✅ Best Practices</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Always typedef function pointer types</strong> – improves readability and maintainability.</li>
            <li><strong>Check for NULL before calling:</strong> <code>if (funcPtr) funcPtr(args);</code> prevents segmentation faults.</li>
            <li><strong>Use consistent naming:</strong> suffix <code>_fn</code> or <code>_callback</code> to indicate function pointers.</li>
            <li><strong>Avoid casting function pointers unless absolutely necessary</strong> – casting can hide signature mismatches.</li>
            <li><strong>Document the expected function signature in comments</strong> especially when the pointer is passed as a parameter.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]"
          style={{ animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Missing parentheses:</strong> <code>int *funcPtr(int, int)</code> declares a function, not a pointer. Correct: <code>int (*funcPtr)(int, int)</code>.</li>
            <li><strong>Calling without checking NULL:</strong> Dereferencing a NULL function pointer crashes the program.</li>
            <li><strong>Mismatched signature:</strong> Assigning a function with wrong parameter types leads to stack corruption.</li>
            <li><strong>Using function pointer where a function is expected (and vice versa)</strong> – they are not interchangeable in all contexts (e.g., taking address of a function).</li>
            <li><strong>Assuming function pointers are like data pointers:</strong> You cannot do pointer arithmetic on function pointers (it's non-standard).</li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section
          className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]"
          style={{ animationFillMode: "both" }}
        >
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
        <div
          className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]"
          style={{ animationFillMode: "both" }}
        >
          <Teacher
            note="Function pointers can be confusing at first, but remember: they are just addresses of functions. Think of them like a remote control – you can store it, pass it around, and press the button later. The classic example is qsort's comparator. I tell my students at Barrackpore CNAT: 'A function pointer is like a ticket to a show – you can give it to someone else, and they can attend the show (call the function) on your behalf.' Practice by building a simple calculator using an array of function pointers; that one exercise will clarify 80% of the concept."
          />
        </div>

        {/* Mini Checklist */}
        <div
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]"
          style={{ animationFillMode: "both" }}
        >
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – What You Should Remember</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Syntax: <code>returnType (*ptrName)(params);</code></li>
            <li>✅ Assign: <code>ptrName = functionName;</code></li>
            <li>✅ Call: <code>ptrName(args);</code> or <code>(*ptrName)(args);</code></li>
            <li>✅ Use typedef for readability: <code>typedef int (*Op)(int,int);</code></li>
            <li>✅ Array of function pointers = jump table (replaces switch)</li>
            <li>✅ Callbacks: pass function pointer to another function</li>
            <li>✅ Always check for NULL before calling</li>
            <li>✅ Function pointers enable runtime polymorphism in C</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic6;