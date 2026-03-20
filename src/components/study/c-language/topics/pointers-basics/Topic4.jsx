import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import initializationExample from "./topic4_files/initialization_example.c?raw";
import wildPointerExample from "./topic4_files/wild_pointer_example.c?raw";

const Topic4 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Pointer Initialization: NULL, Valid Addresses & Wild Pointers
        </h1>
        <p className="text-lg leading-relaxed">
          A pointer must point to a <strong>valid memory location</strong> before it is dereferenced. Uninitialized pointers are called <strong>wild pointers</strong> and can cause crashes or corruption. Always initialize pointers to <strong>NULL</strong> or a <strong>valid address</strong>.
        </p>
      </div>

      {/* Cards: Three States */}
      <div className="animate-fade-up grid md:grid-cols-3 gap-4" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 text-xl font-bold mb-3">✓</div>
          <h3 className="text-xl font-semibold mb-2">Valid Address</h3>
          <p className="text-sm leading-relaxed">Pointer holds the address of an existing variable or allocated memory. Dereferencing is safe.</p>
          <pre className="mt-2 text-xs bg-gray-800 text-gray-100 p-2 rounded"><code>int x = 10;
int *p = &x;     // valid</code></pre>
        </div>
        <div className="group rounded-xl p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-xl font-bold mb-3">∅</div>
          <h3 className="text-xl font-semibold mb-2">NULL Pointer</h3>
          <p className="text-sm leading-relaxed">Pointer explicitly set to <code>NULL</code> (address 0). Dereferencing causes a crash – but it's predictable and debuggable.</p>
          <pre className="mt-2 text-xs bg-gray-800 text-gray-100 p-2 rounded"><code>int *p = NULL;   // safe default</code></pre>
        </div>
        <div className="group rounded-xl p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 text-xl font-bold mb-3">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Wild Pointer</h3>
          <p className="text-sm leading-relaxed">Uninitialized pointer containing a garbage address. Dereferencing leads to <strong>undefined behavior</strong> (crash, corruption, or silent bugs).</p>
          <pre className="mt-2 text-xs bg-gray-800 text-gray-100 p-2 rounded"><code>int *p;          // wild!
*p = 5;          // dangerous</code></pre>
        </div>
      </div>

      {/* SVG: Wild Pointer Danger */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-red-300 dark:hover:border-red-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Wild Pointer – A Random Address</h3>
        <div className="flex justify-center">
          <svg width="450" height="180" viewBox="0 0 450 180" className="max-w-full h-auto">
            <rect x="50" y="50" width="100" height="50" fill="none" stroke="gray" strokeWidth="1" />
            <text x="100" y="80" textAnchor="middle" fontSize="10" fill="gray">Valid Variables</text>
            <rect x="250" y="50" width="100" height="50" fill="none" stroke="red" strokeWidth="2" strokeDasharray="4" />
            <text x="300" y="80" textAnchor="middle" fontSize="10" fill="red">Unknown Zone</text>
            <path d="M200 75 L240 75" stroke="red" strokeWidth="2" strokeDasharray="4" />
            <circle cx="300" cy="110" r="6" fill="red" />
            <text x="300" y="130" textAnchor="middle" fontSize="10" fill="red">Wild pointer may point here</text>
            <text x="300" y="150" textAnchor="middle" fontSize="9" fill="currentColor">(or anywhere unpredictable)</text>
            <animateTransform attributeName="transform" type="translate" values="0,0; 5,0; -5,0; 0,0" dur="1s" repeatCount="indefinite" xlinkHref="#wildArrow" />
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          Wild pointers can point anywhere – never dereference an uninitialized pointer.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📌 NULL Pointer: The Safe Default</h3>
          <p className="leading-relaxed mb-2">
            <code>NULL</code> is a macro defined in <code>&lt;stddef.h&gt;</code> (or implicitly) representing address 0. It's guaranteed <strong>not to point to a valid object</strong>. Dereferencing NULL typically causes a segmentation fault – a crash that's easy to detect and debug.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int *p = NULL;
if (p != NULL) {
    *p = 42;   // safe check
} else {
    printf("Pointer is NULL, cannot use\\n");
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real-world:</strong> In Barrackpore CNAT, <strong>Debolína</strong> learned to initialize all pointers to NULL to avoid wild pointer bugs. Later, she uses <code>if(p)</code> as a shortcut.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 Valid Addresses: What Are They?</h3>
          <p className="leading-relaxed">
            A pointer holds a valid address if it points to:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>A local variable (<code>&amp;var</code>)</li>
            <li>Dynamically allocated memory (<code>malloc</code>)</li>
            <li>A global/static variable</li>
            <li>Another pointer (after proper assignment)</li>
          </ul>
          <div className="bg-gray-100 dark:bg-gray-800/70 p-3 rounded-lg mt-2">
            <code className="text-sm">int arr[10];<br />int *p = arr;   // valid: array name decays to address of first element</code>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Important:</strong> After <code>free()</code>, the pointer becomes <strong>dangling</strong> – it once was valid but now isn't. Always set to NULL after freeing.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Practice: Initialization & Wild Pointer Risk</h3>
        <EditableCCodeBlock
          title="Example 1: Proper Pointer Initialization"
          initialCode={initializationExample}
        />
        <EditableCCodeBlock
          title="Example 2: Wild Pointer Demonstration (Dangerous!)"
          initialCode={wildPointerExample}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Using uninitialized pointer:</strong> <code>int *p; *p = 5;</code> – this is a wild pointer, may crash or corrupt memory.</li>
          <li><strong>Assuming NULL is defined everywhere:</strong> Include <code>&lt;stddef.h&gt;</code> or <code>&lt;stdio.h&gt;</code> (often includes it).</li>
          <li><strong>Not checking for NULL after malloc:</strong> <code>malloc</code> can fail and return NULL, dereferencing it crashes.</li>
          <li><strong>Setting pointer to NULL after free is optional but highly recommended:</strong> Forgets lead to dangling pointers.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always initialize pointers at declaration: <code>int *p = NULL;</code> or <code>int *p = &amp;some_var;</code>.</li>
          <li>Check pointers against NULL before dereferencing: <code>if(p != NULL) {`{ ... }`}</code>.</li>
          <li>After freeing heap memory, set pointer to NULL to avoid dangling pointer issues.</li>
          <li>Use static analysis tools to catch uninitialized pointer usage.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand the difference between NULL, valid, and wild pointers.</li>
            <li>✅ Know that uninitialized pointers are wild and dangerous.</li>
            <li>✅ Always initialize pointers before use.</li>
            <li>✅ Check for NULL after dynamic allocation.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What is the value of an uninitialized pointer? Can it ever be valid by accident?</li>
            <li>Observe carefully: what happens when you run the wild pointer example? Why might it sometimes not crash?</li>
            <li>Try changing the wild pointer example to use <code>int *p = NULL;</code> – what changes?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>NULL</code> consistently for readability:</strong> It's a standard way to say "this pointer is not pointing to anything".</li>
          <li><strong>Compiler warnings:</strong> Enable <code>-Wall -Wextra</code> to catch uninitialized pointer warnings.</li>
          <li><strong>Sanitizers:</strong> Compile with <code>-fsanitize=address</code> to detect wild pointer dereferences at runtime.</li>
          <li><strong>Design pattern:</strong> Always set pointers to NULL after freeing, and check before freeing to avoid double free.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "I've seen countless bugs caused by wild pointers. Students often think: 'I'll assign it later, it's fine.' But the compiler doesn't zero memory for you. In our Barrackpore CNAT class, we run the wild pointer example multiple times to see how it sometimes 'works' – that's the worst kind of bug, because it's intermittent. Always initialize pointers to NULL, then check before use. This simple habit will save you hours of debugging."
        } />
      </div>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic4;