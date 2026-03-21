import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import nullDanglingWild from "./topic17_files/null_dangling_wild.c?raw";
import wildPointerDemo from "./topic17_files/wild_pointer_demo.c?raw";

const Topic17 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          NULL, Dangling & Wild Pointers
        </h1>
        <p className="text-lg leading-relaxed">
          Not all pointers are created equal. Understanding the three dangerous states of pointers — <strong className="text-red-500">wild</strong>, <strong className="text-yellow-500">dangling</strong>, and the safe sentinel <strong className="text-blue-500">NULL</strong> — is essential for writing robust C programs that don't crash or corrupt memory.
        </p>
      </div>

      {/* Three-State Cards */}
      <div className="animate-fade-up grid md:grid-cols-3 gap-4" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-bold mb-3">NULL</div>
          <h3 className="text-xl font-semibold mb-2">NULL Pointer</h3>
          <p className="text-sm leading-relaxed">A pointer explicitly set to <code>NULL</code> (address 0). Dereferencing causes a predictable crash. It's the safe default.</p>
          <pre className="mt-2 text-xs bg-gray-800 text-gray-100 p-2 rounded"><code>int *p = NULL;
if(p != NULL) *p = 5;</code></pre>
        </div>
        <div className="group rounded-xl p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 text-xl font-bold mb-3">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Dangling Pointer</h3>
          <p className="text-sm leading-relaxed">A pointer that points to memory that has been freed (or to a local variable that went out of scope). Dereferencing leads to undefined behavior.</p>
          <pre className="mt-2 text-xs bg-gray-800 text-gray-100 p-2 rounded"><code>int *p = malloc(...);
free(p);
// p is now dangling</code></pre>
        </div>
        <div className="group rounded-xl p-5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 text-xl font-bold mb-3">💀</div>
          <h3 className="text-xl font-semibold mb-2">Wild Pointer</h3>
          <p className="text-sm leading-relaxed">An uninitialized pointer that contains a random address. Dereferencing is extremely dangerous and unpredictable.</p>
          <pre className="mt-2 text-xs bg-gray-800 text-gray-100 p-2 rounded"><code>int *p;   // wild!
*p = 10;  // may crash or corrupt</code></pre>
        </div>
      </div>

      {/* SVG: Visualising the Three */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">What They Point To</h3>
        <div className="flex justify-center">
          <svg width="500" height="180" viewBox="0 0 500 180" className="max-w-full h-auto">
            {/* NULL */}
            <rect x="30" y="20" width="120" height="50" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" />
            <text x="90" y="45" textAnchor="middle" fill="#3B82F6" fontSize="12">NULL</text>
            <text x="90" y="65" textAnchor="middle" fontSize="9">address 0</text>
            <text x="90" y="85" textAnchor="middle" fontSize="9">(invalid)</text>
            <line x1="150" y1="45" x2="180" y2="45" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />

            {/* Dangling */}
            <rect x="200" y="20" width="120" height="50" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" />
            <text x="260" y="45" textAnchor="middle" fill="#F59E0B" fontSize="12">Freed memory</text>
            <text x="260" y="65" textAnchor="middle" fontSize="9">(may be reused)</text>
            <line x1="320" y1="45" x2="350" y2="45" stroke="#F59E0B" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />

            {/* Wild */}
            <rect x="370" y="20" width="100" height="50" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" />
            <text x="420" y="45" textAnchor="middle" fill="#EF4444" fontSize="12">Random address</text>
            <text x="420" y="65" textAnchor="middle" fontSize="9">(garbage)</text>
            <line x1="470" y1="45" x2="490" y2="45" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />

            <defs>
              <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#3B82F6" />
              </marker>
              <marker id="arrowOrange" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#F59E0B" />
              </marker>
              <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#EF4444" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          NULL points to a known invalid address; dangling points to freed memory; wild points to an unpredictable address.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Dangling Pointers: The Hidden Danger</h3>
          <p className="leading-relaxed">
            A dangling pointer arises when memory is deallocated but the pointer still holds the old address. This is especially common with heap memory after <code>free()</code> or when returning the address of a local variable.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int* create() {
    int local = 10;
    return &local;   // returning address of stack variable
} // local destroyed, pointer becomes dangling

void example() {
    int *p = malloc(sizeof(int));
    free(p);
    // p is now dangling
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Debangshu</strong> spent hours debugging a bug where a dangling pointer corrupted data after a <code>free()</code>.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 Wild Pointers: The Silent Menace</h3>
          <p className="leading-relaxed">
            Wild pointers are the most insidious because their behaviour depends on whatever garbage value they hold. They may appear to work (if the random address happens to be writable), then crash later, or silently corrupt data.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int *p;   // uninitialized
*p = 5;   // undefined behavior`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The only cure is to always initialize pointers, either to NULL or a valid address.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Recognize & Avoid Them</h3>
        <EditableCCodeBlock
          title="Example 1: NULL, Dangling & Wild Pointers"
          initialCode={nullDanglingWild}
        />
        <EditableCCodeBlock
          title="Example 2: Wild Pointer Demonstration"
          initialCode={wildPointerDemo}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Using a pointer after free:</strong> The pointer becomes dangling; still holds the old address but memory may be reused.</li>
          <li><strong>Returning address of a local variable:</strong> Creates a dangling pointer as soon as the function returns.</li>
          <li><strong>Assuming NULL is always defined:</strong> Include proper headers (<code>&lt;stddef.h&gt;</code> or <code>&lt;stdio.h&gt;</code>).</li>
          <li><strong>Not initializing pointers:</strong> Leads to wild pointers.</li>
          <li><strong>Double free:</strong> Freeing memory that is already freed – can corrupt heap metadata.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always initialize pointers: <code>int *p = NULL;</code> or <code>int *p = &amp;some_var;</code>.</li>
          <li>Set pointers to NULL immediately after freeing them: <code>free(p); p = NULL;</code>.</li>
          <li>Avoid returning pointers to local stack variables; use dynamic allocation or pass a buffer.</li>
          <li>Check pointers for NULL before dereferencing (unless you are certain they are valid).</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Can define NULL, dangling, and wild pointers.</li>
            <li>✅ Knows that NULL is a safe, invalid pointer.</li>
            <li>✅ Understands that dangling pointers occur after free or when a variable goes out of scope.</li>
            <li>✅ Knows that uninitialized pointers are wild.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What happens if you dereference a dangling pointer? Could it sometimes work?</li>
            <li>Observe carefully: In the wild pointer demo, why does the output change each time?</li>
            <li>Try modifying the dangling pointer example: after free, set the pointer to NULL and see what happens.</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>Valgrind</code> or <code>AddressSanitizer</code> to detect use‑after‑free and wild pointer accesses.</strong></li>
          <li><strong>In production code, never leave a dangling pointer – set to NULL immediately after free.</strong></li>
          <li><strong>Use static analysis tools (like <code>clang‑analyzer</code>) to catch uninitialized pointers.</strong></li>
          <li><strong>When allocating memory, always check the return value of <code>malloc</code> and handle NULL gracefully.</strong></li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In our Barrackpore CNAT class, I tell students: 'A NULL pointer is a known enemy; a dangling pointer is a forgotten enemy; a wild pointer is a random enemy.' Always initialize pointers, and after freeing, set to NULL. This simple habit will eliminate many of the hardest bugs you'll ever encounter. Use tools like Valgrind – they will show you exactly where these issues hide."
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

export default Topic17;