import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files
import basicVoidPtr from "./topic12_files/basic_void_ptr.c?raw";
import genericSwap from "./topic12_files/generic_swap.c?raw";
import printAnyType from "./topic12_files/print_any_type.c?raw";

const Topic12 = () => {
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
    { q: "What is a void pointer (`void*`) in C?", a: "A void pointer is a generic pointer that can point to any data type, but cannot be dereferenced directly without casting." },
    { q: "Why use void pointers instead of a specific type?", a: "They enable generic programming: functions like `memcpy`, `qsort`, and `malloc` use `void*` to work with any data type." },
    { q: "Can you perform pointer arithmetic on a void pointer?", a: "In standard C, no – because the size of `void` is unknown. Some compilers allow it as an extension (treating it as `char*`)." },
    { q: "How do you dereference a void pointer?", a: "You must cast it to a concrete pointer type first: `*(int*)voidPtr`." },
    { q: "What is the size of a void pointer?", a: "Same as any other pointer – typically 8 bytes on 64-bit systems, 4 bytes on 32-bit." },
    { q: "Can a void pointer point to a function?", a: "Not portably. Function pointers and data pointers may have different sizes on some architectures. Use explicit function pointer types." },
    { q: "Is `void*` the same as `char*`?", a: "No. `char*` points to a character and can be dereferenced; `void*` cannot be dereferenced without casting." },
    { q: "How does `malloc` use void pointer?", a: "`malloc` returns `void*` because it allocates raw memory that can be used for any type. You cast the result to your desired pointer type." },
    { q: "Can you assign any pointer type to a void pointer?", a: "Yes, implicitly. Conversion from any object pointer to `void*` is automatic in C." },
    { q: "Can you assign a void pointer to another pointer type without cast?", a: "In C, yes – but it's dangerous. In C++, you need an explicit cast. For safety, use explicit cast even in C." },
    { q: "What happens if you cast a void pointer to the wrong type and dereference?", a: "Undefined behavior – may read wrong bytes, cause alignment issues, or crash." },
    { q: "How do you compare two void pointers?", a: "You can compare them directly (they are addresses). But to compare the values they point to, you must cast to appropriate types first." },
    { q: "Why do standard library functions like `qsort` use `void*` parameters?", a: "To be generic. `qsort` doesn't know the element type, so it uses `void*` for the array base and comparator parameters." },
    { q: "Can a void pointer be NULL?", a: "Yes, `void *ptr = NULL;` is valid and common." },
    { q: "What is the difference between `void*` and `void`?", a: "`void*` is a pointer to unknown type. `void` alone means 'no type' – used for functions that return nothing." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
            Topic 12: Void Pointers (Generic Pointers)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Void pointers are C's way of saying "pointer to something, but I don't know what". They are the foundation of generic 
            functions like `malloc`, `memcpy`, and `qsort`. Mastering them is essential for systems programming.
          </p>
        </div>

        {/* Theory */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-gray-500 pl-3">What is a Void Pointer?</h2>
          <p>
            A void pointer (<code>void*</code>) is a pointer that has no associated type. It can hold the address of any data object, 
            but you cannot dereference it directly because the compiler doesn't know the size or type of the data it points to.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm">
            <p><strong>Declaration:</strong> <code>void *ptr;</code></p>
            <p><strong>Assignment:</strong> <code>ptr = &some_int;</code> or <code>ptr = malloc(100);</code></p>
            <p><strong>Dereference:</strong> <code>int value = *(int*)ptr;</code> (cast before dereference)</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
            <p>⚠️ <strong>Key rule:</strong> You cannot do pointer arithmetic on <code>void*</code> in standard C (GCC allows it as an extension, treating it as <code>char*</code>). Always cast to <code>char*</code> for byte-wise operations.</p>
          </div>
        </section>

        {/* Example 1: Basic void pointer usage */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3">Example 1: Basic Void Pointer Operations</h2>
          <p>Demonstrates assigning different pointer types to a void pointer and casting back to access data.</p>
          <EditableCCodeBlock title="Void pointer basics" initialCode={basicVoidPtr} />
        </section>

        {/* Example 2: Generic swap function */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">Example 2: Generic Swap Using Void Pointers</h2>
          <p>A classic example: a swap function that works with any data type by using <code>void*</code> and byte-by-byte copying.</p>
          <EditableCCodeBlock title="Generic swap function" initialCode={genericSwap} />
        </section>

        {/* Example 3: Printing any basic type */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">Example 3: Printing Any Type (with type tag)</h2>
          <p>A function that prints a value of any type by using a <code>void*</code> and a type identifier (enum).</p>
          <EditableCCodeBlock title="Type-aware print function" initialCode={printAnyType} />
        </section>

        {/* Tips & Tricks */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Always cast <code>void*</code> to a concrete type before dereferencing</strong> – never dereference directly.</li>
            <li><strong>For pointer arithmetic, cast to <code>char*</code></strong> because <code>sizeof(char)==1</code>, giving byte-level addressing.</li>
            <li><strong>Use <code>void*</code> to implement opaque pointers in C APIs</strong> – hide implementation details from the user.</li>
            <li><strong>When writing generic functions, also pass the size of the data type</strong> (like <code>memcpy</code> and <code>qsort</code> do).</li>
            <li><strong>Be careful with alignment</strong> – casting a <code>void*</code> to a type with stricter alignment requirements can cause crashes on some architectures.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">✅ Best Practices for Void Pointers</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Always initialize <code>void*</code> to NULL if not immediately assigned.</strong></li>
            <li><strong>Use explicit casts when assigning from <code>void*</code> to a typed pointer</strong> – improves readability and helps catch errors.</li>
            <li><strong>Document what type a <code>void*</code> is expected to point to</strong> – especially in function parameters.</li>
            <li><strong>Prefer <code>void*</code> over <code>char*</code> for generic data when type is unknown</strong> – it's more semantically correct.</li>
            <li><strong>When implementing a generic container, store both a <code>void*</code> to data and a function pointer for destruction.</strong></li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Dereferencing a <code>void*</code> without casting</strong> – compiler error: "incomplete type".</li>
            <li><strong>Performing pointer arithmetic on <code>void*</code></strong> – not standard C; use <code>char*</code> instead.</li>
            <li><strong>Casting <code>void*</code> to the wrong type</strong> – leads to reading wrong bytes or alignment faults.</li>
            <li><strong>Assuming <code>void*</code> and function pointers are compatible</strong> – not portable; use function pointer types.</li>
            <li><strong>Forgetting that <code>void*</code> loses type information</strong> – you must carry the type info separately (e.g., an enum or size).</li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">❓ Frequently Asked Questions (15)</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800">
                <p className="font-semibold text-gray-600 dark:text-gray-400">Q{idx+1}: {faq.q}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
          <Teacher note="At Barrackpore CNAT, I call void pointers 'generic handles' – they can point to anything, but you need to know what they point to before you can use them. Think of them as a universal socket: you can plug any tool (type) into it, but to actually turn it, you need the right adapter (cast). The standard library functions like `memcpy`, `malloc`, and `qsort` all rely on void pointers. When you write generic code, always pass the size of the data along with the void pointer – that's the professional pattern." />
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – Void Pointers</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Declaration: <code>void *ptr;</code></li>
            <li>✅ Can point to any data type: <code>ptr = &int_var;</code> or <code>ptr = malloc(n);</code></li>
            <li>✅ Cannot dereference without casting: <code>int x = *(int*)ptr;</code></li>
            <li>✅ No pointer arithmetic in standard C – cast to <code>char*</code> first.</li>
            <li>✅ Used in generic functions: <code>memcpy</code>, <code>qsort</code>, <code>malloc</code>, <code>free</code>.</li>
            <li>✅ Loses type information – carry type info separately.</li>
            <li>✅ Always cast back to correct type before access.</li>
            <li>✅ Never cast a function pointer to <code>void*</code> (not portable).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic12;