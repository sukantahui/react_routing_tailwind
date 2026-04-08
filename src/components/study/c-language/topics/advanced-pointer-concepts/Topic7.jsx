import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files
import basicDeclarations from "./topic7_files/basic_declarations.c?raw";
import typedefExample from "./topic7_files/typedef_example.c?raw";
import complexSignatures from "./topic7_files/complex_signatures.c?raw";

const Topic7 = () => {
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
    { q: "Why must the function pointer name be inside parentheses?", a: "Without parentheses, `int *func(int, int)` declares a function returning a pointer to int. Parentheses `int (*func)(int, int)` make `func` a pointer to a function." },
    { q: "What is the syntax for a function pointer that returns a pointer to int?", a: "`int *(*funcPtr)(int, int);` – `funcPtr` points to a function that takes two ints and returns `int*`." },
    { q: "How to declare a function pointer with no parameters and no return?", a: "`void (*funcPtr)(void);`" },
    { q: "Can I omit the parameter names in function pointer declaration?", a: "Yes, only types matter: `int (*funcPtr)(int, char)` is fine. Names are optional but helpful for documentation." },
    { q: "What does `typedef int (*Operation)(int, int);` do?", a: "Defines `Operation` as a type alias for 'pointer to function taking two ints and returning int'. Then `Operation addPtr = add;`" },
    { q: "How to declare a function pointer that takes another function pointer as parameter?", a: "`void register_callback(int (*cb)(void*), void* data);`" },
    { q: "Is `int (*funcPtr)()` different from `int (*funcPtr)(void)`?", a: "In C, `()` means unspecified parameters (old style), while `(void)` means no parameters. For safety, prefer `(void)`." },
    { q: "How to declare an array of 5 function pointers returning int and taking two doubles?", a: "`int (*arr[5])(double, double);`" },
    { q: "What is the return type of `sizeof` applied to a function pointer?", a: "Size of a function pointer (typically 8 bytes on 64-bit systems). Not the size of the function code." },
    { q: "How to declare a function pointer as a struct member?", a: "`struct { int (*op)(int, int); } calculator;`" },
    { q: "Can function pointers be const? Why?", a: "Yes: `int (* const funcPtr)(int) = &foo;` prevents reassignment. Useful for jump tables that shouldn't change." },
    { q: "What does `int (*(*complex)(int))[10];` declare?", a: "`complex` is a pointer to a function that takes an int and returns a pointer to an array of 10 ints." },
    { q: "How to declare a function that returns a function pointer?", a: "`int (*get_operation(char op))(int, int);` – `get_operation` takes a char and returns a function pointer." },
    { q: "Why use `typedef` for function pointers in callback APIs?", a: "Improves readability and reduces errors. Example: `typedef void (*EventCallback)(int event_code, void* user_data);`" },
    { q: "Can I use `auto` (C++11) to declare function pointers in C?", a: "No, `auto` in C means automatic storage duration, not type inference. C does not have `auto` type deduction." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Topic 7: Function Pointers – Declaration & Syntax
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Mastering the syntax of function pointers is the first step toward using callbacks, jump tables, and runtime dispatch. 
            This topic breaks down every nuance of declaration, from simple to mind‑bending.
          </p>
        </div>

        {/* Theory */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">The Anatomy of a Function Pointer Declaration</h2>
          <p className="leading-relaxed">
            A function pointer declaration consists of:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Return type</strong> – what the pointed function returns.</li>
            <li><strong>Name in parentheses with a star</strong> – <code>(*ptrName)</code> – this is the pointer.</li>
            <li><strong>Parameter list</strong> – types of arguments the function expects.</li>
          </ul>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm">
            <p className="font-bold">General form:</p>
            <p className="mt-1">returnType (*pointerName)(paramType1, paramType2, ...);</p>
            <p className="mt-2 font-bold">Example:</p>
            <p>int (*mathOp)(int, int);   // mathOp points to a function taking two ints and returning int</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
            <p>⚠️ <strong>Remember:</strong> The parentheses around <code>*pointerName</code> are mandatory. Without them, you get a function returning a pointer.</p>
          </div>
        </section>

        {/* Example 1: Basic declarations */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3">Example 1: Basic Declarations & Assignments</h2>
          <EditableCCodeBlock title="Various function pointer declarations" initialCode={basicDeclarations} />
        </section>

        {/* Example 2: typedef for clarity */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">Using typedef to Simplify Complex Syntax</h2>
          <p><code>typedef</code> makes code more readable and maintainable, especially when the same function pointer type appears multiple times.</p>
          <EditableCCodeBlock title="typedef with function pointers" initialCode={typedefExample} />
        </section>

        {/* Example 3: Complex signatures (returning pointers, arrays) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3">Complex Signatures: Pointers, Arrays, and Nesting</h2>
          <p>Function pointers can point to functions that return pointers, or take function pointers as parameters. Mastering these patterns unlocks advanced API design.</p>
          <EditableCCodeBlock title="Complex function pointer signatures" initialCode={complexSignatures} />
        </section>

        {/* Tips & Tricks */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Read declarations from the inside out:</strong> Start with the pointer name, then go right (parameters), then left (return type).</li>
            <li><strong>Use <code>typedef</code> for every function pointer type in a public API.</strong> It saves users from looking up syntax.</li>
            <li><strong>Name typedefs with <code>_fn</code> or <code>_callback</code> suffix:</strong> e.g., <code>CompareFn</code>, <code>EventHandler</code>.</li>
            <li><strong>When in doubt, use a tool like <code>cdecl</code></strong> (online or command line) to decode complex declarations.</li>
            <li><strong>For function pointers returning pointers to arrays:</strong> Prefer typedefs for each level – your sanity will thank you.</li>
            <li><strong>In embedded systems, declare function pointers as <code>const</code> when they point to fixed jump tables to save RAM.</strong></li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">✅ Best Practices for Declarations</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Always initialize function pointers to NULL</strong> – prevents accidental calls to garbage addresses.</li>
            <li><strong>Use <code>typedef</code> even for simple signatures</strong> – it improves consistency across your codebase.</li>
            <li><strong>Explicitly write <code>void</code> for no parameters</strong> – <code>void (*func)(void)</code> instead of <code>void (*func)()</code>.</li>
            <li><strong>Keep parameter names in declarations when they add meaning</strong> – they are ignored by the compiler but help documentation.</li>
            <li><strong>If a function pointer is part of a struct, consider making it <code>const</code> after initialization.</strong></li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Missing parentheses around <code>*pointerName</code></strong> – changes meaning to function returning pointer.</li>
            <li><strong>Using <code>typedef</code> without naming the pointer type</strong> – wrong: <code>typedef int (*)(int, int);</code> correct: <code>typedef int (*Op)(int, int);</code></li>
            <li><strong>Confusing function pointer with function prototype</strong> – a prototype declares a function; a pointer stores its address.</li>
            <li><strong>Assuming function pointers are the same as data pointers</strong> – they are not interchangeable in all contexts (e.g., you can't cast <code>void*</code> to function pointer in standard C, though POSIX allows it).</li>
            <li><strong>Forgetting that <code>auto</code> doesn't work for type inference in C.</strong></li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">❓ Frequently Asked Questions (15)</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800">
                <p className="font-semibold text-purple-600 dark:text-purple-400">Q{idx+1}: {faq.q}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
          <Teacher note="When I teach function pointer syntax at Barrackpore CNAT, I use the 'spiral rule' or 'right-left rule' for reading declarations. Start at the identifier, go right to parameters, then left to return type. For example: `int (*(*complex)(int))[10];` – start at `complex`: go right → `(int)` so it's a function taking int, then left → `*` so it returns a pointer, then right again → `[10]` so that pointer points to array of 10, then left → `int` so array of ints. Practice with `cdecl` tool. Also, remember: typedef is your friend. If a declaration hurts your head, typedef it." />
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – Declaration Syntax</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Basic form: <code>returnType (*ptrName)(params);</code></li>
            <li>✅ Parentheses around <code>*ptrName</code> are required.</li>
            <li>✅ Use <code>typedef</code> to create aliases for function pointer types.</li>
            <li>✅ For no parameters, write <code>(void)</code> not just <code>()</code>.</li>
            <li>✅ Arrays of function pointers: <code>returnType (*arr[size])(params);</code></li>
            <li>✅ Function returning function pointer: <code>returnType (*func(params))(params2);</code></li>
            <li>✅ Use <code>const</code> to make the pointer itself constant: <code>int (* const ptr)(int) = &func;</code></li>
            <li>✅ Read complex declarations inside-out or use <code>cdecl</code>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic7;