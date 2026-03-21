import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import debugPrintfExample from "./topic20_files/debug_printf_example.c?raw";
import memoryTraceExample from "./topic20_files/memory_trace_example.c?raw";

const Topic20 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Debugging Pointer Issues: printf & Memory Tracing
        </h1>
        <p className="text-lg leading-relaxed">
          Pointers are powerful but error‑prone. The simplest and often most effective debugging technique is to <strong>print pointer values, addresses, and memory contents</strong> using <code>printf</code>. Combined with memory tracing (inspecting bytes), you can uncover wild pointers, dangling references, and buffer overflows.
        </p>
      </div>

      {/* Two Main Techniques */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🖨️ printf Debugging</h2>
          <p className="leading-relaxed">
            Use <code>printf</code> to inspect:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
            <li>Pointer values (<code>%p</code>)</li>
            <li>Dereferenced values (<code>*ptr</code>)</li>
            <li>Addresses of variables (<code>&amp;var</code>)</li>
            <li>Indices and loop counters</li>
          </ul>
          <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs mt-2">
            {`printf("ptr = %p, *ptr = %d\\n", (void*)ptr, *ptr);`}
          </pre>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🧠 Memory Tracing</h2>
          <p className="leading-relaxed">
            Trace memory byte‑by‑byte to detect:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
            <li>Buffer overflows (look for corruption beyond bounds)</li>
            <li>Uninitialized data</li>
            <li>Alignment issues</li>
          </ul>
          <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs mt-2">
            {`unsigned char *bytes = (unsigned char*)ptr;
for(int i = 0; i < size; i++)
    printf("%02x ", bytes[i]);`}
          </pre>
        </div>
      </div>

      {/* SVG: Tracing a Pointer */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Tracing Pointer Flow</h3>
        <div className="flex justify-center">
          <svg width="500" height="200" viewBox="0 0 500 200" className="max-w-full h-auto">
            <rect x="30" y="30" width="100" height="50" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" />
            <text x="80" y="55" textAnchor="middle" fontSize="10">Variable x</text>
            <text x="80" y="75" textAnchor="middle" fontSize="8">addr: 0x1000</text>

            <rect x="180" y="30" width="100" height="50" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
            <text x="230" y="55" textAnchor="middle" fontSize="10">Pointer p</text>
            <text x="230" y="75" textAnchor="middle" fontSize="8">addr: 0x2000</text>

            <path d="M280 55 L130 55" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowGreen)" />

            <text x="320" y="40" fontSize="9" fill="#3B82F6">printf("&x = %p", &x);</text>
            <text x="320" y="60" fontSize="9" fill="#10B981">printf("p = %p", p);</text>
            <text x="320" y="80" fontSize="9" fill="#F59E0B">printf("*p = %d", *p);</text>

            <defs>
              <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#10B981" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          Print addresses and values at key points to understand pointer behaviour.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Using printf for Pointer Debugging</h3>
          <p className="leading-relaxed">
            Insert strategic <code>printf</code> statements to observe the state before and after operations. This helps confirm that pointers point where you expect and that values change correctly.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int *p = &x;
printf("Before: p=%p, *p=%d\\n", (void*)p, *p);
*p = 20;
printf("After:  p=%p, *p=%d\\n", (void*)p, *p);`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            For array access, print the array contents before and after modifications to spot corruption.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 Memory Tracing Techniques</h3>
          <p className="leading-relaxed">
            When you suspect a buffer overflow or uninitialized data, print memory as raw bytes. Cast the pointer to <code>unsigned char*</code> and iterate.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`void print_memory(void *ptr, size_t size) {
    unsigned char *bytes = (unsigned char*)ptr;
    for (size_t i = 0; i < size; i++) {
        printf("%02x ", bytes[i]);
        if ((i+1) % 16 == 0) printf("\\n");
    }
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Swadeep</strong> used memory tracing to discover that a <code>strcpy</code> was overwriting the next variable in memory.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Debugging in Practice</h3>
        <EditableCCodeBlock
          title="Example 1: Debugging with printf"
          initialCode={debugPrintfExample}
        />
        <EditableCCodeBlock
          title="Example 2: Memory Tracing"
          initialCode={memoryTraceExample}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Using wrong format specifier:</strong> Always cast to <code>(void*)</code> for <code>%p</code>.</li>
          <li><strong>Printing too much output:</strong> Can hide the important details; use conditional prints or limit scope.</li>
          <li><strong>Assuming debug prints don't affect timing:</strong> In multithreaded or timing‑sensitive code, prints can hide bugs.</li>
          <li><strong>Not removing debug prints after fixing:</strong> They clutter production code; use a debug macro or conditional compilation.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use a debug macro: <code>#ifdef DEBUG</code> to enable/disable prints.</li>
          <li>Log both pointer address and dereferenced value to verify both.</li>
          <li>When tracing memory, always know the size you are printing; avoid printing beyond allocated boundaries.</li>
          <li>Combine <code>printf</code> with a debugger: prints help you know where to set breakpoints.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Can insert <code>printf</code> to inspect pointer values and addresses.</li>
            <li>✅ Can write a function to dump memory as hex.</li>
            <li>✅ Knows how to use <code>gdb</code> basics (optional but recommended).</li>
            <li>✅ Understands that debug output must be removed or disabled in production.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What would you print to check if a pointer was changed by a function?</li>
            <li>Observe carefully: In the memory trace example, how can you tell if a buffer overflow occurred?</li>
            <li>Try adding a debug print that prints the address of local variables to see stack layout.</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>fprintf(stderr, ...)</code> to output debugging info; it's unbuffered and appears immediately.</strong></li>
          <li><strong>Create a <code>DBG_PRINT</code> macro that includes <code>__FILE__</code> and <code>__LINE__</code>.</strong></li>
          <li><strong>Learn to use a debugger (<code>gdb</code>) for more advanced inspection:</strong> <code>print *ptr</code>, <code>x/10xb ptr</code>.</li>
          <li><strong>Tools like Valgrind and AddressSanitizer provide memory tracing automatically; use them alongside prints.</strong></li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "Debugging pointers can be intimidating, but with systematic tracing, you can demystify any bug. I tell my Barrackpore CNAT students: 'When in doubt, print it out.' Print the address, print the value, print the bytes. And once you've solved it, consider how you could have prevented it (better initialization, bounds checks). Debugging is a skill that improves with practice – so get your hands dirty!"
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

export default Topic20;