import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files
import basicCasting from "./topic14_files/basic_casting.c?raw";
import alignmentIssues from "./topic14_files/alignment_issues.c?raw";
import safeDereference from "./topic14_files/safe_dereference.c?raw";

const Topic14 = () => {
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
    { q: "What is type casting in C?", a: "Converting a value from one type to another. For pointers, it changes how the compiler interprets the address." },
    { q: "Why do you need to cast a void pointer before dereferencing?", a: "Because void has no size or type. The compiler doesn't know how many bytes to read or how to interpret them." },
    { q: "What is the syntax for casting a void pointer to int pointer?", a: "`int *intPtr = (int*)voidPtr;` Then dereference: `int value = *intPtr;`" },
    { q: "Can you cast any pointer type to void* and back?", a: "Yes, any object pointer can be cast to `void*` and back to its original type safely. This is guaranteed by the C standard." },
    { q: "What is alignment, and why does it matter when casting?", a: "Some types require addresses to be multiples of certain values (e.g., 4-byte ints on 4-byte boundaries). Casting a misaligned `void*` can crash or slow down access." },
    { q: "What happens if you cast a void pointer to the wrong type?", a: "Undefined behavior. You may read garbage, misinterpret bytes, or cause alignment faults." },
    { q: "Is `(int*)voidPtr` the same as `(int)(intptr_t)voidPtr`?", a: "No. The first casts the pointer to an int pointer; the second casts the pointer value to an integer (losing pointer semantics)." },
    { q: "What is strict aliasing rule? How does it relate to casting?", a: "The compiler assumes pointers of different types don't alias. Casting and dereferencing through a different type can break this, causing optimization bugs." },
    { q: "Can you cast a void pointer to a function pointer?", a: "Not portably. The C standard doesn't require function pointers and data pointers to have the same size or representation." },
    { q: "How do you safely cast in generic functions that receive void*?", a: "The caller must know the actual type. Use a type tag (enum) or pass a function pointer that knows how to cast." },
    { q: "What is `intptr_t` and `uintptr_t`?", a: "Integer types capable of holding a pointer value. Useful for pointer arithmetic or debugging, but avoid unless necessary." },
    { q: "Does casting a pointer change the address stored?", a: "No, the numeric address remains the same. Only the compiler's interpretation of what lies at that address changes." },
    { q: "What is the difference between implicit and explicit casting for void*?", a: "Assigning any object pointer to `void*` is implicit (automatic). Casting back from `void*` to a typed pointer requires explicit cast in C++ but is implicit in C (though explicit is clearer)." },
    { q: "How do you cast a void pointer to a pointer to a struct?", a: "`struct MyStruct *ptr = (struct MyStruct*)voidPtr;` Then access members: `ptr->member`." },
    { q: "What is the `restrict` keyword and how does it interact with casting?", a: "`restrict` promises no aliasing. Casting can break that promise if not careful. Use with caution." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Topic 14: Type Casting and Dereferencing Rules
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Void pointers are powerful but require careful casting before dereferencing. This topic covers the rules, 
            alignment considerations, and safe patterns for converting between void pointers and concrete types.
          </p>
        </div>

        {/* Theory */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">The Casting Contract</h2>
          <p>
            A <code>void*</code> is just an address without type information. To access the data, you must cast it to a concrete pointer type. 
            The cast tells the compiler:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>How many bytes to read/write</strong> (size of the target type).</li>
            <li><strong>How to interpret those bytes</strong> (integer, float, struct, etc.).</li>
            <li><strong>What alignment is required</strong> (some types must be placed at specific memory boundaries).</li>
          </ul>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p>⚠️ <strong>Critical rule:</strong> You must cast back to exactly the same type that was originally stored, or the result is undefined behavior. The exception is casting to <code>char*</code> to examine individual bytes (allowed).</p>
          </div>
        </section>

        {/* Example 1: Basic casting and dereferencing */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3">Example 1: Basic Casting to Different Types</h2>
          <p>Shows how to cast a void pointer to int*, double*, and char* and access the data.</p>
          <EditableCCodeBlock title="Casting void* to concrete types" initialCode={basicCasting} />
        </section>

        {/* Example 2: Alignment issues */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3">Example 2: Alignment Issues When Casting</h2>
          <p>Demonstrates what happens when you cast a misaligned void pointer to a type that requires strict alignment.</p>
          <EditableCCodeBlock title="Misaligned access problems" initialCode={alignmentIssues} />
        </section>

        {/* Example 3: Safe dereference patterns */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">Example 3: Safe Dereferencing with Type Tags</h2>
          <p>A generic function that safely casts and dereferences based on a type tag, avoiding mismatches.</p>
          <EditableCCodeBlock title="Type-safe generic dereference" initialCode={safeDereference} />
        </section>

        {/* Tips & Tricks */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Always cast explicitly, even though C allows implicit conversion from void*</strong> – explicit casts document intent and are required in C++.</li>
            <li><strong>Use `char*` for byte-level access</strong> – it's the only type guaranteed to have no alignment restrictions.</li>
            <li><strong>Check alignment with `((uintptr_t)ptr % alignof(type)) == 0`</strong> before casting in performance-critical or embedded code.</li>
            <li><strong>When copying generic data, use `memcpy` instead of direct assignment through cast</strong> – memcpy handles alignment safely.</li>
            <li><strong>Use `_Alignof` (C11) and `alignas` to manage alignment in structs used with void pointers.</strong></li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">✅ Best Practices for Casting</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Cast back to the same type that was stored</strong> – use a type tag or rely on caller's knowledge.</li>
            <li><strong>Avoid casting function pointers to void*</strong> – not portable; use a union or separate function pointer variable.</li>
            <li><strong>Prefer `memcpy` over casting for unaligned data</strong> – it's safe and often optimized.</li>
            <li><strong>Use `const void*` for read-only generic parameters</strong> – then cast to `const int*` etc.</li>
            <li><strong>When casting in a macro, add parentheses to avoid operator precedence issues.</strong></li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Dereferencing without casting</strong> – `*void_ptr` is illegal (incomplete type).</li>
            <li><strong>Casting to the wrong type</strong> – e.g., casting `void*` that points to `int` to `float*` – reads wrong bytes.</li>
            <li><strong>Assuming all pointers have the same alignment requirements</strong> – char* has no restrictions, but int* may require 4-byte alignment.</li>
            <li><strong>Forgetting that `void*` arithmetic is non-standard</strong> – use `char*` for byte increments.</li>
            <li><strong>Believing casting changes the underlying data</strong> – it only changes interpretation.</li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">❓ Frequently Asked Questions (15)</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800">
                <p className="font-semibold text-indigo-600 dark:text-indigo-400">Q{idx+1}: {faq.q}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
          <Teacher note="At Barrackpore CNAT, I remind students: 'Casting is a promise to the compiler – you are saying, trust me, this void pointer really points to an int.' If you break that promise, the compiler won't warn you, but your program will misbehave. Alignment is another hidden trap: on ARM processors, misaligned access causes exceptions; on x86 it's slower but works. Always use `memcpy` when you're unsure about alignment. Practice by writing a generic print function that takes a void* and a type tag – it'll teach you safe casting patterns." />
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – Casting and Dereferencing</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Always cast void* to concrete type before dereferencing: `*(int*)voidPtr`.</li>
            <li>✅ Cast back to the same type that was stored, or use char* for byte access.</li>
            <li>✅ Explicit casts are clearer, even though implicit works in C.</li>
            <li>✅ Be aware of alignment: some types require specific memory boundaries.</li>
            <li>✅ Use `memcpy` for safe copying between unaligned or possibly overlapping memory.</li>
            <li>✅ Avoid casting function pointers to void* (not portable).</li>
            <li>✅ Use type tags (enum) when you need to dereference void* to different types.</li>
            <li>✅ Pointer arithmetic on void* is not standard C – cast to char* first.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic14;