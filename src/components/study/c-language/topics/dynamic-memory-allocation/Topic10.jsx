import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import basicDynamicString from './topic10_files/basic_dynamic_string.c?raw';
import dynamicStringConcat from './topic10_files/dynamic_string_concat.c?raw';
import safeInputString from './topic10_files/safe_input_string.c?raw';

// Keyframes for reveal animations (inline style)
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .animate-fade-slide-up {
      animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-slide-up {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Topic10 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // concept
    '300ms',  // operations
    '400ms',  // svg
    '500ms',  // code examples
    '600ms',  // pitfalls
    '700ms',  // best practices
    '800ms',  // checklist
    '900ms',  // hints
    '1000ms', // tips
  ];

  const getSectionClass = () => clsx('animate-fade-slide-up', 'opacity-0');

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <div className={getSectionClass()} style={{ animationDelay: sectionDelays[0] }}>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Building Dynamic Strings (Using Heap Memory)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Flexible, resizable strings that grow to fit any content — the foundation of robust text handling.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Why Fixed-Size Strings Are Dangerous
          </h2>
          <p className="leading-relaxed mb-3">
            C strings are simple arrays of characters terminated by <code>'\0'</code>. When you declare
            <code>char buffer[100];</code>, you assume the input will never exceed 99 characters. In
            practice, this leads to buffer overflows — a major security vulnerability.
          </p>
          <p className="leading-relaxed">
            Dynamic strings allocate memory on the heap and grow automatically, making them safe and flexible.
            They are essential for user input, reading files, building messages, and many other tasks.
          </p>
        </section>

        {/* Core Concepts */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📦 Anatomy of a Dynamic String
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              A dynamic string is similar to a dynamic array, but specialized for character data. The structure
              typically contains:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>data</strong> – pointer to the heap‑allocated character array (always null‑terminated).</li>
              <li><strong>length</strong> – number of characters excluding the null terminator.</li>
              <li><strong>capacity</strong> – total allocated size (including space for the null terminator).</li>
            </ul>
            <p>When you need to append characters, you check if <code>length + 2 &gt; capacity</code> (for the new character + null) and grow accordingly.</p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
              <p className="text-sm"><strong>💡 Key insight:</strong> Always keep one extra byte for the null terminator.</p>
            </div>
          </div>
        </section>

        {/* Operations */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Core Operations
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-medium mb-2">Initialization</h3>
            <p className="font-mono text-sm mb-3">create empty string: allocate small initial capacity (e.g., 8), set data[0]='\0', length=0, capacity=8.</p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">Append character/string</h3>
            <p className="font-mono text-sm mb-3">if length + strlen(to_append) + 1 &gt capacity → grow (double), then copy new data, update length.</p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">Concatenation</h3>
            <p className="font-mono text-sm mb-3">create new string from two strings; or append one to another.</p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">Destruction</h3>
            <p className="font-mono text-sm">free(data).</p>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Dynamic String in Action
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 240" className="w-full h-auto" aria-label="Dynamic string illustration">
              <rect width="800" height="240" fill="transparent" />

              {/* String structure */}
              <text x="50" y="30" fill="currentColor" className="text-sm">DynamicString:</text>
              <rect x="50" y="40" width="200" height="80" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="60" y="65" fill="currentColor" className="text-xs">data → (heap)</text>
              <text x="60" y="85" fill="currentColor" className="text-xs">length = 5</text>
              <text x="60" y="105" fill="currentColor" className="text-xs">capacity = 8</text>

              {/* Heap block */}
              <rect x="300" y="40" width="400" height="50" fill="none" stroke="#22c55e" strokeWidth="2" rx="4" />
              {[310, 360, 410, 460, 510, 560, 610, 660].map((x, i) => (
                <rect key={i} x={x} y="50" width="40" height="30" fill={i<5 ? "rgba(34,197,94,0.2)" : "rgba(156,163,175,0.2)"} stroke={i<5 ? "#22c55e" : "#9ca3af"} strokeWidth="1" />
              ))}
              <text x="325" y="70" fill="currentColor">H</text>
              <text x="375" y="70" fill="currentColor">e</text>
              <text x="425" y="70" fill="currentColor">l</text>
              <text x="475" y="70" fill="currentColor">l</text>
              <text x="525" y="70" fill="currentColor">o</text>
              <text x="625" y="70" fill="gray">\0</text>
              <text x="575" y="85" fill="gray">unused</text>

              <line x1="250" y1="80" x2="300" y2="80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow10)" />
              <defs>
                <marker id="arrow10" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
              </defs>

              <text x="50" y="170" fill="currentColor" className="text-sm">Appending '!' → capacity doubled if needed</text>
              <rect x="300" y="180" width="400" height="50" fill="none" stroke="#a855f7" strokeWidth="2" rx="4" />
              <rect x="310" y="190" width="40" height="30" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              <text x="325" y="210" fill="currentColor">!</text>
            </svg>
          </div>
        </section>

        {/* Code Examples */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[5] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💻 Code Examples
          </h2>
          <div className="space-y-6">
            <EditableCCodeBlock
              title="Example 1: Basic dynamic string with append"
              initialCode={basicDynamicString}
            />
            <EditableCCodeBlock
              title="Example 2: String concatenation"
              initialCode={dynamicStringConcat}
            />
            <EditableCCodeBlock
              title="Example 3: Safe input reading"
              initialCode={safeInputString}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Forgetting to allocate space for null terminator:</strong> Leads to buffer overflow and corrupted strings.</li>
            <li><strong>Not updating length after modifications:</strong> Causes length and actual content to diverge.</li>
            <li><strong>Using <code>strlen</code> on an uninitialized string:</strong> May read past allocated memory.</li>
            <li><strong>Not checking <code>realloc</code> failure:</strong> Can lose the original data.</li>
            <li><strong>Memory leaks:</strong> Forgetting to <code>free</code> the string's data.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Always initialize strings with a small capacity to avoid frequent reallocations for tiny strings.</li>
              <li>✔️ Use a growth factor (e.g., 2) to achieve amortized O(1) append.</li>
              <li>✔️ After every modification, ensure the string is null‑terminated.</li>
              <li>✔️ Provide helper functions: <code>str_append_char</code>, <code>str_append_cstr</code>, <code>str_clear</code>, <code>str_free</code>.</li>
              <li>✔️ For performance‑critical code, consider using a <code>str_reserve</code> function to pre‑allocate capacity.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[8] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            📋 Mini Checklist
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-1">
              <li>☐ I can explain the need for dynamic strings vs fixed buffers.</li>
              <li>☐ I understand the structure: data, length, capacity.</li>
              <li>☐ I can implement a function to append a character to a dynamic string.</li>
              <li>☐ I can implement safe input reading using a dynamic string.</li>
              <li>☐ I always free dynamic strings when done.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Observe carefully...</p>
            <ul className="list-disc list-inside mt-2">
              <li>What happens if you forget to keep the null terminator when growing? How would that affect <code>strlen</code>?</li>
              <li>Try to implement a function that appends a C string to your dynamic string. What checks are needed?</li>
              <li>How would you implement a function to remove the last character (pop)?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Print the string's length and capacity after operations to verify correctness.</p>
            <p><strong>📦 Performance:</strong> For building large strings, pre‑allocate capacity based on expected total size to avoid many reallocations.</p>
            <p><strong>🧹 Reusability:</strong> Implement your dynamic string in a separate module with a clean API, like <code>string.h</code> but safer.</p>
            <p><strong>📏 Memory safety:</strong> In C, use <code>strlcpy</code> or <code>strlcat</code> if available; for dynamic strings, always copy with bounds checking.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Dynamic strings are your best friend when handling user input. They eliminate buffer overflow vulnerabilities and make your code robust. The classic mistake is to forget the null terminator — always keep one extra byte. In exams, expect to implement a dynamic string and explain why it's safer than fixed arrays."
        />
      </div>
    </>
  );
};

export default Topic10;