import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import pointerDeclaration from "./topic3_files/pointer_declaration.c?raw";
import typeSpecificPointers from "./topic3_files/type_specific_pointers.c?raw";

const Topic3 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Declaring Pointer Variables & Type‑Specific Pointers
        </h1>
        <p className="text-lg leading-relaxed">
          Pointers are declared with a base type followed by an asterisk (<code>*</code>). The type tells the compiler what kind of data the pointer points to — this determines how many bytes are accessed when dereferencing and how pointer arithmetic behaves.
        </p>
      </div>

      {/* Syntax and Concept Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📝 Declaration Syntax</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mb-3">
            {`type *pointer_name;
// Examples:
int *ptr;      // pointer to int
char *cptr;    // pointer to char
double *dptr;  // pointer to double`}
          </pre>
          <p className="text-sm">
            The <code>*</code> binds to the variable name, not the type. So <code>int* a, b;</code> declares <code>a</code> as pointer, <code>b</code> as plain <code>int</code>.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🎯 Why Type Matters</h2>
          <p className="leading-relaxed">
            The type of a pointer determines:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>How many bytes are read/written when dereferencing.</li>
            <li>How pointer arithmetic works (step size).</li>
            <li>Type compatibility for assignments.</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Example:</strong> <code>int *p;</code> – when you write <code>*p = 10;</code>, the compiler stores 4 bytes (on most systems) starting at the address in <code>p</code>.
          </p>
        </div>
      </div>

      {/* SVG: Pointer to Different Types */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Pointer Types = Access Size</h3>
        <div className="flex justify-center">
          <svg width="450" height="200" viewBox="0 0 450 200" className="max-w-full h-auto">
            {/* Memory row */}
            <rect x="30" y="80" width="320" height="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400" />
            {[0,1,2,3,4,5,6,7].map(i => (
              <rect key={i} x={30 + i*40} y="80" width="40" height="40" fill="none" stroke="gray" strokeWidth="0.5" />
            ))}
            <text x="30" y="70" fontSize="10" fill="currentColor">Address: 1000</text>
            <text x="70" y="70" fontSize="10" fill="currentColor">1004</text>
            <text x="110" y="70" fontSize="10" fill="currentColor">1008</text>
            
            {/* int pointer */}
            <rect x="30" y="130" width="40" height="40" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
            <text x="50" y="155" textAnchor="middle" fontSize="12" fill="#3B82F6">int *</text>
            <text x="50" y="180" textAnchor="middle" fontSize="9" fill="currentColor">4 bytes</text>
            <path d="M50 170 L50 120" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4" />
            
            {/* char pointer */}
            <rect x="150" y="130" width="10" height="40" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
            <text x="155" y="155" textAnchor="middle" fontSize="12" fill="#10B981">char *</text>
            <text x="155" y="180" textAnchor="middle" fontSize="9" fill="currentColor">1 byte</text>
            <path d="M155 170 L155 120" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4" />
            
            {/* double pointer */}
            <rect x="250" y="130" width="80" height="40" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
            <text x="290" y="155" textAnchor="middle" fontSize="12" fill="#F59E0B">double *</text>
            <text x="290" y="180" textAnchor="middle" fontSize="9" fill="currentColor">8 bytes</text>
            <path d="M290 170 L290 120" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4" />
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          The pointer type determines how many bytes are accessed when dereferencing.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📌 Declaration Styles</h3>
          <p className="leading-relaxed mb-2">
            C allows flexible spacing around the <code>*</code>. Choose a style and be consistent:
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int *p;      // common style: * next to variable
int* p;      // emphasizes type
int * p;     // spaces everywhere (rare)`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Remember:</strong> <code>int* p, q;</code> declares <code>p</code> as pointer, <code>q</code> as int. To declare two pointers: <code>int *p, *q;</code>.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 Type Compatibility</h3>
          <p className="leading-relaxed mb-2">
            You cannot assign the address of one type to a pointer of another type without a cast. The compiler enforces type safety.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/70 p-3 rounded-lg">
            <code className="text-sm">
              int x = 10;<br />
              int *p = &x;     // OK<br />
              char *q = &x;    // Warning: incompatible pointer type<br />
              char *r = (char*)&x; // OK with cast
            </code>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Example:</strong> In Barrackpore CNAT, <strong>Sreeparna</strong> once tried to store an <code>int*</code> in a <code>char*</code> and got a compiler warning — a good reminder to match types.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Hands‑On Examples</h3>
        <EditableCCodeBlock
          title="Example 1: Declaring and Using Pointers"
          initialCode={pointerDeclaration}
        />
        <EditableCCodeBlock
          title="Example 2: Type‑Specific Pointer Behavior"
          initialCode={typeSpecificPointers}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Forgetting * in multiple declarations:</strong> <code>int* a, b;</code> – b is int, not pointer.</li>
          <li><strong>Dereferencing uninitialized pointer:</strong> Using <code>*ptr</code> when <code>ptr</code> has garbage leads to undefined behavior.</li>
          <li><strong>Type mismatch without cast:</strong> Assigning <code>int*</code> to <code>char*</code> may cause alignment issues or wrong access sizes.</li>
          <li><strong>Confusing declaration with dereference:</strong> In <code>int *p = &x;</code>, the <code>*</code> means "pointer", not dereference.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always initialize pointers immediately (to NULL or a valid address).</li>
          <li>Use a consistent pointer declaration style (e.g., <code>int *p;</code>).</li>
          <li>When declaring multiple pointers, put <code>*</code> with each variable: <code>int *a, *b;</code>.</li>
          <li>Use <code>sizeof(*ptr)</code> to allocate memory instead of hardcoding sizes.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Can declare pointers of different types correctly.</li>
            <li>✅ Understands that pointer type determines access size.</li>
            <li>✅ Knows the difference between <code>int *p</code> and <code>int* p</code>.</li>
            <li>✅ Can explain why type matters for dereferencing and arithmetic.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What happens if you declare <code>int* p, q;</code> and then try to assign <code>q = &some_int;</code>?</li>
            <li>Observe carefully: In <code>int *p = &x;</code>, is the <code>*</code> part of the declaration or the dereference?</li>
            <li>Try declaring a pointer to <code>float</code> and assign it the address of an <code>int</code>. What warning do you get?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>typedef</code> for complex pointer types:</strong> <code>typedef int* int_ptr;</code> then <code>int_ptr a, b;</code> declares two pointers.</li>
          <li><strong>When reading declarations, start from the variable name and go right then left:</strong> <code>int * const *p;</code> → p is pointer to constant pointer to int.</li>
          <li><strong>Use <code>size_t</code> and <code>sizeof</code> for portability when dealing with pointer sizes.</strong></li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "I emphasize to students: 'The star in declaration says: this variable holds an address.' But the type tells the compiler how to interpret the memory at that address. In our Barrackpore CNAT class, we practice with small programs where we declare pointers to int, char, double and observe the effect of dereferencing. Consistency in declaration style helps avoid confusion."
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

export default Topic3;