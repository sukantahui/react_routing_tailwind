import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import raw C files
import basicCallSyntax from "./topic8_files/basic_call_syntax.c?raw";
import callVsDirect from "./topic8_files/call_vs_direct.c?raw";
import conditionalCalls from "./topic8_files/conditional_calls.c?raw";

const Topic8 = () => {
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
    { q: "What are the two syntaxes for calling a function via pointer?", a: "`(*funcPtr)(args)` and `funcPtr(args)`. The latter is simpler and works in modern C, but the former explicitly shows dereferencing." },
    { q: "Is `funcPtr(args)` equivalent to `(*funcPtr)(args)`?", a: "Yes, the standard allows `funcPtr(args)` as syntactic sugar. Both call the function pointed to by `funcPtr`." },
    { q: "What happens if you call a NULL function pointer?", a: "Undefined behavior – usually a segmentation fault. Always check for NULL before calling." },
    { q: "Can you use `->` with function pointers stored in structs?", a: "Yes, if a struct has a function pointer member, you call it as `structPtr->funcPtr(args)` or `(*structPtr).funcPtr(args)`." },
    { q: "How do you call a function pointer that takes no arguments and returns void?", a: "`funcPtr();` or `(*funcPtr)();`" },
    { q: "Is there a performance difference between direct call and call via pointer?", a: "Indirect calls may have a small overhead due to the extra indirection, but it's usually negligible. The compiler may inline direct calls but cannot inline through a pointer unless it knows the target." },
    { q: "Can you call a function pointer with the wrong number of arguments?", a: "It will compile but cause undefined behavior (stack corruption, wrong arguments passed). The signature must match exactly." },
    { q: "How do you call a function that returns a function pointer?", a: "`int (*result)(int, int) = getOp('+')(5, 3);` Actually, you need two steps: first get the function pointer, then call it." },
    { q: "What does `(****funcPtr)(args)` do?", a: "It dereferences the function pointer multiple times. In C, dereferencing a function pointer multiple times still yields the same function pointer, so it works but is pointless." },
    { q: "Can you use a function pointer in a conditional expression and then call it?", a: "Yes: `if (funcPtr) funcPtr(args);` – safe pattern." },
    { q: "How do you call a function pointer that is an element of an array?", a: "`funcArray[index](args);` or `(*funcArray[index])(args);`" },
    { q: "What is the difference between `funcPtr` and `&funcPtr` when calling?", a: "`funcPtr` is the function pointer; `&funcPtr` is the address of the function pointer variable, not the function. Calling `(&funcPtr)(args)` is wrong." },
    { q: "Can you cast a function pointer to another type and call it?", a: "Technically possible but dangerous. It bypasses type safety and can crash. Only do it if you absolutely know the calling convention and layout match." },
    { q: "How does `qsort` call the comparator function pointer?", a: "`qsort` internally does something like `cmp(base+i*size, base+j*size)`, where `cmp` is the function pointer passed to it." },
    { q: "Why would you ever use `(*funcPtr)(args)` over `funcPtr(args)`?", a: "Some coding standards prefer the explicit dereference to emphasize that a pointer is being used. Also, in very old compilers, the simpler form might not be supported." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{keyframes}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Topic 8: Calling Functions Using Pointers
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Once you have a function pointer, calling the function is straightforward – but there are nuances. 
            This topic covers syntax, safety, performance, and common patterns for indirect function calls.
          </p>
        </div>

        {/* Theory */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3">Calling a Function Through a Pointer</h2>
          <p className="leading-relaxed">
            There are two equivalent syntaxes to call a function via a pointer:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm space-y-2">
            <p><strong>Syntax 1 (explicit dereference):</strong> <code>(*funcPtr)(arg1, arg2);</code></p>
            <p><strong>Syntax 2 (simpler, modern):</strong> <code>funcPtr(arg1, arg2);</code></p>
          </div>
          <p>
            Both are valid in C99 and later. The second form is more common because it reads like a normal function call 
            and the pointer is automatically dereferenced by the function call operator <code>()</code>.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
            <p>⚠️ <strong>Key safety rule:</strong> Never call a function pointer that is NULL. Always check: <code>if (funcPtr) funcPtr(args);</code></p>
          </div>
        </section>

        {/* Example 1: Basic call syntax */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3">Example 1: Basic Calling Syntax</h2>
          <EditableCCodeBlock title="Comparing the two calling syntaxes" initialCode={basicCallSyntax} />
        </section>

        {/* Example 2: Direct vs pointer call */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3">Example 2: Direct Call vs Pointer Call</h2>
          <p>Illustrates that both syntaxes produce the same result, and shows how to call functions stored in arrays or structs.</p>
          <EditableCCodeBlock title="Direct call vs pointer call comparison" initialCode={callVsDirect} />
        </section>

        {/* Example 3: Conditional calls and safety */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3">Example 3: Conditional Calls & NULL Checks</h2>
          <p>Always validate function pointers before calling, especially when they come from external sources or optional features.</p>
          <EditableCCodeBlock title="Safe conditional calls" initialCode={conditionalCalls} />
        </section>

        {/* Tips & Tricks */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3">💎 Professional Tips & Tricks</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Always check for NULL before calling.</strong> A crash from a NULL function pointer is hard to debug because the call stack may not show where the pointer was set.</li>
            <li><strong>Use the simpler <code>funcPtr(args)</code> syntax</strong> – it's cleaner and widely supported.</li>
            <li><strong>If you need to call a function pointer many times in a loop, store it in a local variable</strong> to avoid repeated global/struct accesses (micro-optimization).</li>
            <li><strong>For callback-heavy APIs, consider providing a default function</strong> that does nothing or returns an error, so callers can rely on a non-NULL pointer.</li>
            <li><strong>When debugging, print the function pointer address</strong> to see which function will be called.</li>
            <li><strong>In embedded systems, function pointers can be placed in RAM to allow runtime updates</strong> (e.g., firmware patches).</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3">✅ Best Practices for Calling</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Initialize function pointers to NULL</strong> and check before call.</li>
            <li><strong>Use consistent calling style across your codebase</strong> – choose either explicit or implicit dereference and stick to it.</li>
            <li><strong>Document whether a function pointer parameter can be NULL</strong> and what happens if it is.</li>
            <li><strong>For performance-critical code, consider that indirect calls inhibit inlining</strong> – if the target is known at compile time, use direct calls.</li>
            <li><strong>When calling through a pointer to a function that never changes, make it <code>const</code> to prevent accidental reassignment.</strong></li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <h2 className="text-2xl font-semibold border-l-4 border-pink-500 pl-3">🚫 Common Mistakes & Misconceptions</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Calling without checking NULL</strong> – leads to segmentation fault.</li>
            <li><strong>Using <code>&funcPtr(args)</code> instead of <code>funcPtr(args)</code></strong> – taking address of result.</li>
            <li><strong>Forgetting parentheses around <code>*funcPtr</code> when using explicit dereference</strong> – <code>*funcPtr(args)</code> is wrong; need <code>(*funcPtr)(args)</code>.</li>
            <li><strong>Assuming function pointers are interchangeable with <code>void*</code></strong> – casting between them is not portable (though POSIX allows it).</li>
            <li><strong>Calling a function pointer with mismatched arguments</strong> – the compiler may not warn if the pointer was cast, leading to stack corruption.</li>
          </ul>
        </section>

        {/* Q&A Section */}
        <section className="space-y-4 animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-3">❓ Frequently Asked Questions (15)</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800">
                <p className="font-semibold text-blue-600 dark:text-blue-400">Q{idx+1}: {faq.q}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
          <Teacher note="When I teach function pointer calls at Barrackpore CNAT, I use the analogy of a remote control. The pointer is the remote; pressing the button (calling) works the same regardless of which device (function) it points to. Students often ask: 'Why two syntaxes?' The simpler `ptr(args)` is like pressing the button directly; `(*ptr)(args)` is like picking up the remote and then pressing. Both achieve the same result. Always check for NULL – it's like checking if the remote has batteries before pressing." />
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <h3 className="text-xl font-semibold mb-3">📋 Mini Checklist – Calling Function Pointers</h3>
          <ul className="space-y-2 list-checkmark pl-5">
            <li>✅ Two syntaxes: <code>(*funcPtr)(args)</code> and <code>funcPtr(args)</code></li>
            <li>✅ Always check for NULL before calling: <code>if (funcPtr) funcPtr(args);</code></li>
            <li>✅ The simpler syntax <code>funcPtr(args)</code> is preferred in modern code.</li>
            <li>✅ Mismatched signatures cause undefined behavior – ensure exact match.</li>
            <li>✅ Indirect calls may have a small performance cost vs direct calls.</li>
            <li>✅ Function pointers in arrays: <code>funcArray[i](args);</code></li>
            <li>✅ In structs: <code>structPtr-&gtfuncPtr(args);</code></li>
            <li>✅ For safety, initialize all function pointers to NULL.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topic8;