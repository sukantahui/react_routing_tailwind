import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import printAddresses from "./topic2_files/print_addresses.c?raw";
import variableStorage from "./topic2_files/variable_storage.c?raw";

const Topic2 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Memory Addresses & Variable Storage
        </h1>
        <p className="text-lg leading-relaxed">
          Every variable in your program lives somewhere in the computer's RAM. Each byte of memory has a unique <strong>address</strong>. Understanding addresses is the key to mastering pointers.
        </p>
      </div>

      {/* Conceptual Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🏠 Memory as a Street</h2>
          <p className="leading-relaxed">
            Think of RAM as a long street with numbered houses (addresses). Each house holds one byte of data. Variables occupy one or more consecutive houses (bytes). The address of a variable is the house number of its first byte.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Example:</strong> In Barrackpore CNAT, <strong>Abhronila</strong> lives at 123 Main St. That's her "address". Similarly, an <code>int</code> variable might live at address <code>0x7ffc1234</code>.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔢 Address Representation</h2>
          <p className="leading-relaxed">
            Addresses are typically shown in hexadecimal (e.g., <code>0x7ffeea3b8c</code>). The exact value depends on the system, compiler, and runtime. On 64-bit systems, addresses are 8-byte (64-bit) numbers.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-2 rounded text-sm mt-2 overflow-x-auto">
            {`int x = 42;
printf("%p", &x);  // prints something like 0x7ffd3c2a4a4c`}
          </pre>
        </div>
      </div>

      {/* Interactive SVG: Memory Grid */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">RAM: A Grid of Bytes</h3>
        <div className="flex justify-center">
          <svg width="450" height="280" viewBox="0 0 450 280" className="max-w-full h-auto">
            {/* Memory cells */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <g key={i}>
                <rect x={50 + i * 45} y={40} width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400" />
                <text x={70 + i * 45} y={70} textAnchor="middle" fontSize="10" fill="currentColor">Byte</text>
                <text x={70 + i * 45} y={90} textAnchor="middle" fontSize="8" fill="gray">0x{i*4}</text>
              </g>
            ))}
            {/* Variable x (int) occupies 4 bytes */}
            <rect x={50} y={40} width="160" height="40" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4" />
            <text x={130} y={25} textAnchor="middle" fill="#3B82F6" fontSize="12">int x (4 bytes)</text>
            {/* Variable c (char) occupies 1 byte */}
            <rect x={50 + 4*45} y={40} width="40" height="40" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
            <text x={50 + 4*45 + 20} y={25} textAnchor="middle" fill="#10B981" fontSize="12">char c</text>
            {/* Address labels */}
            <text x={70} y={130} textAnchor="middle" fontSize="9" fill="currentColor">0x1000</text>
            <text x={115} y={130} textAnchor="middle" fontSize="9" fill="currentColor">0x1004</text>
            <text x={160} y={130} textAnchor="middle" fontSize="9" fill="currentColor">0x1008</text>
            <text x={205} y={130} textAnchor="middle" fontSize="9" fill="currentColor">0x100C</text>
            <text x={250} y={130} textAnchor="middle" fontSize="9" fill="currentColor">0x1010</text>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          An <code>int</code> occupies 4 consecutive bytes (on most systems). Its address is the first byte's address.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📌 Where Variables Live</h3>
          <p className="leading-relaxed mb-3">
            Different types of variables are stored in different memory regions:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Local variables</strong> → stack (addresses decrease as stack grows)</li>
            <li><strong>Global/static variables</strong> → data segment (fixed addresses)</li>
            <li><strong>Dynamically allocated</strong> → heap (addresses increase as heap grows)</li>
          </ul>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int global = 10;        // data segment
void func() {
    int local = 20;     // stack
    int *heap = malloc(sizeof(int)); // heap
}`}
          </pre>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 Observing Addresses</h3>
          <p className="leading-relaxed mb-2">
            You can use <code>%p</code> in <code>printf</code> to see the address of a variable. This helps visualize memory layout.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/70 p-3 rounded-lg">
            <code className="text-sm">
              int a = 5;<br />
              printf("Address of a: %p\n", (void*)&a);
            </code>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Try it:</strong> In Barrackpore CNAT, <strong>Debangshu</strong> noticed that local variables of different functions have addresses that differ by several bytes.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 See Addresses in Action</h3>
        <EditableCCodeBlock
          title="Example 1: Printing Addresses"
          initialCode={printAddresses}
        />
        <EditableCCodeBlock
          title="Example 2: Variable Storage Locations"
          initialCode={variableStorage}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Confusing address with value:</strong> <code>&amp;x</code> gives address, not value.</li>
          <li><strong>Assuming addresses are small or predictable:</strong> Addresses change between runs (ASLR).</li>
          <li><strong>Using wrong format specifier:</strong> Always cast to <code>(void*)</code> with <code>%p</code>.</li>
          <li><strong>Thinking pointer size = data size:</strong> A pointer is always 8 bytes (on 64-bit), regardless of what it points to.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always use <code>%p</code> and cast to <code>(void*)</code> when printing addresses.</li>
          <li>Understand that addresses are not fixed; never hardcode them.</li>
          <li>Use <code>sizeof()</code> to know how many bytes a variable occupies.</li>
          <li>When analyzing memory, consider endianness (but that's advanced).</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that each byte has a unique address.</li>
            <li>✅ Know that variables occupy contiguous bytes.</li>
            <li>✅ Can print addresses using <code>%p</code>.</li>
            <li>✅ Recognize that different variable types have different storage regions.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What happens if you try to store an address in an <code>int</code> variable?</li>
            <li>Observe carefully: do local variables of nested functions have increasing or decreasing addresses?</li>
            <li>Try declaring a <code>char</code> and an <code>int</code> next to each other. Are their addresses contiguous?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>gdb</code> to explore memory:</strong> <code>print &amp;var</code>, <code>x/4xb &amp;var</code> to examine bytes.</li>
          <li><strong>Understand alignment:</strong> Compilers may add padding between variables for performance.</li>
          <li><strong>Stack addresses typically decrease:</strong> Each function call pushes stack frame at lower addresses.</li>
          <li><strong>Address Sanitizer:</strong> Use <code>-fsanitize=address</code> to detect memory errors.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "Students often ask: 'Why do addresses look so random?' That's Address Space Layout Randomization (ASLR) – a security feature. Also, remember that on modern systems, addresses are large (8-byte). At Barrackpore CNAT, I encourage tracing addresses with simple programs to see how stack, heap, and globals are placed. This builds intuition for pointers."
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

export default Topic2;