import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files
import withoutGeneric from "./topic13_files/without_generic.c?raw";
import genericMax from "./topic13_files/generic_max.c?raw";
import genericContainer from "./topic13_files/generic_container.c?raw";

const Topic13 = () => {
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
    { q: "What is generic data handling?", a: "Writing code that works with any data type without modification, using techniques like void pointers, macros, or code generation." },
    { q: "Why does C need generic programming?", a: "C is statically typed and lacks templates. Without generic techniques, you'd need separate functions for int, float, char*, etc." },
    { q: "What's the problem with writing separate functions for each type?", a: "Code duplication, maintenance burden, and increased binary size. A change requires updating all versions." },
    { q: "How do void pointers enable generic functions?", a: "They can point to any data type, and by passing the size of the data, functions like `memcpy` work generically." },
    { q: "What is the role of `size_t` in generic functions?", a: "It tells the function how many bytes to operate on, allowing it to handle any type correctly." },
    { q: "What's a real-world example of generic handling in C?", a: "`qsort` works on any array type because it uses `void*` and a comparator callback that knows the actual type." },
    { q: "Can macros provide generic functionality?", a: "Yes, macros like `#define MAX(a,b) ((a)>(b)?(a):(b))` work for any type, but have limitations (multiple evaluation)." },
    { q: "What are the trade-offs of generic code in C?", a: "Pros: reusability, less code. Cons: type safety loss, potential performance overhead, more complex debugging." },
    { q: "How does C++ improve on C's generic capabilities?", a: "Templates provide type-safe generics at compile time without needing void pointers or manual size passing." },
    { q: "What is type erasure in C?", a: "Using `void*` to hide the actual type, but you lose type information and must recover it via casting or tags." },
    { q: "How do you create a generic dynamic array in C?", a: "Store `void*` elements, plus size and capacity. Each element is a pointer to allocated data." },
    { q: "Why do standard C functions like `bsearch` use generic interfaces?", a: "So they work with any data type without rewriting the search algorithm for each type." },
    { q: "What is the difference between compile-time and runtime generics?", a: "Compile-time (C++ templates) generate code per type; runtime (C void*) uses a single implementation with type parameters." },
    { q: "Can you have type-safe generics in C using `_Generic`?", a: "Yes, C11 introduced `_Generic` for type-selection at compile time, useful for macros that behave differently per type." },
    { q: "When should you avoid generic techniques in C?", a: "When performance is critical and types are known, or when type safety is paramount (e.g., security-sensitive code)." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Topic 13: Concept and Need for Generic Data Handling
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Generic programming allows writing algorithms and data structures that work with any data type. 
            In C, which lacks templates, this is achieved primarily through void pointers, size parameters, and callbacks. 
            This topic explains why generics are essential and how to implement them effectively.
          </p>
        </div>

        {/* Theory */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-cyan-500 pl-3">The Problem: Static Typing Without Generics</h2>
          <p>
            C is a statically typed language: every variable has a fixed type known at compile time. 
            Without generic techniques, writing a function that works for both integers and floating-point numbers 
            would require duplicating code or using macros.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <p className="font-mono text-sm">
              // Without generics, you need separate functions:<br/>
              {`int max_int(int a, int b) { return a > b ? a : b; }`}<br/>
              {`double max_double(double a, double b) { return a > b ? a : b; }`}<br/>
              // What about char*, structs, etc.?
            </p>
          </div>
          <p>
            This leads to <strong>code duplication, maintenance headaches, and larger binaries</strong>. 
            Generic programming solves this by writing the algorithm once, parameterized by type.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
            <p>💡 <strong>Key insight:</strong> Generic code separates "what" (algorithm) from "what type" (data). The algorithm is expressed in terms of bytes, addresses, and operations provided by callbacks.</p>
          </div>
        </section>

        {/* Example 1: Without generics (code duplication) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3">Example 1: The Pain of No Generics</h2>
          <p>Illustrates the repetitive code needed for simple algorithms without generics.</p>
          <EditableCCodeBlock title="Separate functions for each type" initialCode={withoutGeneric} />
        </section>

        {/* Example 2: Generic max with void* and size */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">Example 2: Generic Max Using Void Pointers</h2>
          <p>A generic function that returns the maximum of two values of any type, using a comparison callback.</p>
          <EditableCCodeBlock title="Generic max with comparator" initialCode={genericMax} />
        </section>

        {/* Example 3: Generic container (dynamic array) */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">Example 3: Generic Container – Dynamic Array</h2>
          <p>A simple dynamic array that stores `void*` elements, demonstrating a reusable container.</p>
          <EditableCCodeBlock title="Generic dynamic array" initialCode={genericContainer} />
        </section>

        {/* Tips & Tricks */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Use `_Generic` (C11) for type-safe macros</strong> – e.g., `#define max(a,b) _Generic((a), int: max_int, double: max_double)(a,b)`.</li>
            <li><strong>Combine void pointers with function pointers</strong> – comparators, destructors, and printers make containers truly generic.</li>
            <li><strong>For performance-critical generics, consider code generation</strong> – write a script that expands templates to C code.</li>
            <li><strong>Always pass the size of the element to generic functions</strong> that copy or compare memory.</li>
            <li><strong>Document ownership and lifetime</strong> – generic containers often store pointers; who frees the pointed data?</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">✅ Best Practices for Generic Code</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Use `void*` for generic data, but provide type-specific wrappers</strong> for type safety at the call site.</li>
            <li><strong>Always include a `size` parameter when operating on unknown types</strong> – essential for byte-level operations.</li>
            <li><strong>Prefer callbacks over assuming operations (like comparison) can be done with `memcmp`</strong> – memcmp only works for simple types, not structs with pointers.</li>
            <li><strong>Use `const void*` for read-only generic parameters</strong> to indicate the data won't be modified.</li>
            <li><strong>Test generic code with various types</strong> – including structs, pointers, and arrays.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Assuming all types can be compared with `memcmp`</strong> – fails for floating-point NaNs and structs with padding.</li>
            <li><strong>Forgetting to pass the size of the element</strong> – leads to wrong byte counts and buffer overflows.</li>
            <li><strong>Using `void*` for function pointers</strong> – not portable; use explicit function pointer types.</li>
            <li><strong>Not handling alignment in generic containers</strong> – storing arbitrary types may require alignment considerations.</li>
            <li><strong>Overusing generics where specific code is simpler</strong> – generics add complexity; use when reuse is substantial.</li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">❓ Frequently Asked Questions (15)</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800">
                <p className="font-semibold text-cyan-600 dark:text-cyan-400">Q{idx+1}: {faq.q}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
          <Teacher note="At Barrackpore CNAT, I emphasize that generic programming is about 'algorithm reuse'. Think of `qsort` – it doesn't care if you're sorting integers, strings, or student records (like Swadeep's test scores). The algorithm stays the same; only the comparison changes. This separation of concerns is powerful. However, with great power comes responsibility: generic code in C loses type safety. Always document what type the `void*` expects. For students, start by implementing a generic swap function – it's the 'Hello World' of generic C programming." />
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – Generic Data Handling</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Generic code works with any data type without duplication.</li>
            <li>✅ In C, use `void*`, size parameters, and callbacks for generics.</li>
            <li>✅ Standard examples: `qsort`, `bsearch`, `memcpy`, `malloc`.</li>
            <li>✅ Always pass element size when operating on unknown types.</li>
            <li>✅ Use comparator callbacks for order-dependent algorithms.</li>
            <li>✅ C11 `_Generic` provides compile-time type selection.</li>
            <li>✅ Generics trade type safety for reusability – use wisely.</li>
            <li>✅ Test generic code with multiple types (int, double, struct).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic13;