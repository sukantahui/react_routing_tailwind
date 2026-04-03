import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import C code files
import example1Code from "./topic3_files/example1.c?raw";
import example2Code from "./topic3_files/example2.c?raw";
import example3Code from "./topic3_files/example3.c?raw";
import example4Code from "./topic3_files/example4.c?raw";

const Topic3 = () => {
  const [activeTab, setActiveTab] = useState('concept');

  // Questions and Answers
  const qaData = [
    {
      q: "What is the difference between call by value and call by reference in C?",
      a: "Call by value passes a copy of the variable's value to the function - changes inside the function don't affect the original. Call by reference in C is simulated using pointers - the function receives a pointer (address) to the variable, allowing direct modification of the original data. While C doesn't have true reference parameters like C++, passing pointers achieves the same effect: the function can modify the original variable through dereferencing."
    },
    {
      q: "How do you pass a pointer to a function?",
      a: "Declare the function parameter with a pointer type: 'void modify(int *ptr)'. Then pass the address of the variable using the address-of operator (&): 'modify(&var)'. Inside the function, use the dereference operator (*) to access and modify the original value. This pattern is fundamental for functions that need to return multiple values or modify large structures without copying."
    },
    {
      q: "Why can't C directly modify variables passed to functions without pointers?",
      a: "C uses pass-by-value exclusively for function arguments. When you pass a variable, the function receives a copy stored in its local parameter variable. Modifying this copy has no effect on the original in the caller. Pointers work around this by copying the address value, but then using that address to access the original memory location - effectively achieving call-by-reference behavior."
    },
    {
      q: "What are the advantages of passing pointers to functions?",
      a: "Advantages include: (1) Functions can modify multiple variables (return multiple values), (2) Avoid copying large structures (performance), (3) Enable dynamic memory allocation within functions, (4) Implement data structures like linked lists, (5) Create generic functions using void pointers, (6) Build callback mechanisms with function pointers. These patterns are essential for systems programming."
    },
    {
      q: "How do you swap two variables using pointers?",
      a: "The classic swap function: 'void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }'. Call with 'swap(&x, &y)'. Without pointers, swap would only swap local copies. This demonstrates why pointers are necessary for modifying caller's variables. The function receives addresses, dereferences them to access original values, and swaps using a temporary variable."
    },
    {
      q: "What is the syntax for passing arrays to functions?",
      a: "Arrays are automatically passed as pointers: 'void process(int arr[], int size)' is equivalent to 'void process(int *arr, int size)'. The array name decays to a pointer to its first element. Inside the function, array notation or pointer arithmetic can be used. The size must be passed separately because the pointer doesn't carry size information - 'sizeof(arr)' in function gives pointer size, not array size."
    },
    {
      q: "How do you return a pointer from a function?",
      a: "Return type is pointer: 'int* createArray(int size)'. The function allocates memory (malloc) and returns the pointer. However, NEVER return pointer to local variable - that memory is released when function returns. Return dynamically allocated memory (caller must free), static variables, or passed-in pointers. Document ownership clearly: who is responsible for freeing returned pointer."
    },
    {
      q: "What is a null pointer check and why is it important?",
      a: "Always check if a pointer parameter is NULL before dereferencing: 'if (ptr == NULL) return;' or 'if (!ptr) return;'. This prevents segmentation faults and crashes. Defensive programming: validate all pointer parameters at function start. Return error codes or handle gracefully. This is especially critical for functions that receive pointers from external callers or after memory allocation."
    },
    {
      q: "How do you pass a structure to a function efficiently?",
      a: "Pass pointer to structure: 'void processStudent(Student *s)'. This copies only the pointer (8 bytes) instead of the entire structure (potentially hundreds of bytes). Inside, use arrow operator (->) to access members: 's->age = 20;'. For read-only access, use 'const Student *s' to prevent modification while still avoiding copy overhead."
    },
    {
      q: "What's the difference between passing 'int *ptr' and 'int * const ptr'?",
      a: "'int *ptr' allows modifying both the pointer (what it points to) and the pointed value. 'int * const ptr' makes the pointer constant - it always points to the same address, but the value at that address can be changed. Use 'const int *ptr' to prevent value modification while allowing pointer change. Use 'const int * const ptr' to lock both. This provides fine-grained const-correctness."
    },
    {
      q: "How do you implement a function that modifies multiple values?",
      a: "Use pointers for each value to modify: 'void getStats(int *sum, int *avg, int *max, int *min, int arr[], int size)'. The function calculates and assigns through pointers. The caller passes addresses: 'getStats(&sum, &avg, &max, &min, data, size)'. This effectively returns multiple values. Document which parameters are inputs vs outputs clearly in comments."
    },
    {
      q: "What happens when you pass NULL to a function expecting a pointer?",
      a: "The function receives NULL address. If the function dereferences it without checking, segmentation fault occurs. Always validate: 'if (ptr == NULL) { fprintf(stderr, \"Error: NULL pointer\\n\"); return -1; }'. Use assertions during debugging: 'assert(ptr != NULL);'. Design functions to handle NULL gracefully when possible, or clearly document that NULL is not allowed."
    },
    {
      q: "How do you pass a pointer to a pointer to a function?",
      a: "Declare parameter as 'int **ptr'. Pass address of pointer: 'int *p = NULL; modify(&p);'. Inside, allocate memory: '*ptr = malloc(sizeof(int));'. This allows function to modify the original pointer itself (not just what it points to). Essential for allocation functions, linked list head insertion, and any scenario where the pointer variable needs to change in the caller."
    },
    {
      q: "What is the performance impact of passing pointers vs values?",
      a: "Passing pointers is faster for large data types (structures, arrays) because only address (8 bytes) is copied. For small types (int, char), passing by value may be equally fast or faster due to better cache locality and avoiding indirection. However, if function modifies the value, pointer must be used. Profile when uncertain. Modern compilers optimize small structs, but pointers are predictable."
    },
    {
      q: "How do you create a function that can work with different data types?",
      a: "Use void pointers: 'void process(void *data, int type)'. Inside, cast to appropriate type based on type parameter: 'if (type == TYPE_INT) { int *ptr = (int*)data; *ptr = 100; }'. This is how generic functions like qsort work. C11's _Generic provides type-generic macros. For type-safe generics, C++ templates are better, but void pointers work for basic C generic programming."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
            Topic 3
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent mb-4">
            Passing Pointers to Functions (Call by Reference)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mastering pointer parameters to modify variables, return multiple values, and build efficient functions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
          {['concept', 'qa'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-6 py-2 rounded-full font-semibold transition-all duration-300 capitalize",
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              {tab === 'concept' ? '📚 Concept & Examples' : '❓ Questions & Answers'}
            </button>
          ))}
        </div>

        {/* Main Content */}
        {activeTab === 'concept' ? (
          <div className="space-y-8">
            {/* Introduction Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-2xl">
                    📞
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Call by Value vs Call by Reference
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  C uses <span className="font-bold text-blue-600 dark:text-blue-400">pass-by-value</span> exclusively for function arguments. 
                  To achieve <span className="font-bold text-blue-600 dark:text-blue-400">call-by-reference</span> behavior, we pass pointers 
                  - addresses of variables - allowing functions to modify the original data.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">🎯 Key Insight:</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    When Debangshu from Barrackpore CNAT wants to change a variable inside a function, he doesn't pass the variable itself - 
                    he passes its address (like giving someone your home address instead of moving your entire house into their office!)
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Comparison SVG */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center text-2xl">
                    🔄
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Call by Value vs Call by Reference Visualization
                  </h2>
                </div>

                {/* SVG Comparison Diagram */}
                <div className="mb-8 overflow-x-auto">
                  <svg viewBox="0 0 1000 450" className="w-full max-w-5xl mx-auto" style={{ maxWidth: '100%', height: 'auto' }}>
                    <defs>
                      <linearGradient id="valueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#EF4444', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: '#DC2626', stopOpacity: 0.3 }} />
                      </linearGradient>
                      <linearGradient id="refGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0.3 }} />
                      </linearGradient>
                      <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                      </marker>
                      <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                      </marker>
                    </defs>

                    {/* Call by Value Section */}
                    <g transform="translate(30, 20)">
                      <rect x="0" y="0" width="440" height="400" rx="12" fill="url(#valueGrad)" stroke="#EF4444" strokeWidth="2" />
                      <text x="220" y="30" textAnchor="middle" fill="#DC2626" fontWeight="bold" fontSize="18">Call by Value</text>
                      
                      {/* Main variable */}
                      <rect x="140" y="60" width="160" height="50" rx="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
                      <text x="220" y="90" textAnchor="middle" fill="#991B1B" fontSize="14" fontWeight="bold">x = 10 (original)</text>
                      
                      {/* Arrow to function */}
                      <line x1="220" y1="110" x2="220" y2="160" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrowRed)" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                      </line>
                      <text x="240" y="140" fill="#EF4444" fontSize="11">Copy value</text>
                      
                      {/* Function parameter */}
                      <rect x="140" y="170" width="160" height="50" rx="8" fill="#FECACA" stroke="#EF4444" strokeWidth="2" />
                      <text x="220" y="200" textAnchor="middle" fill="#991B1B" fontSize="14" fontWeight="bold">a = 10 (copy)</text>
                      
                      {/* Modified in function */}
                      <rect x="140" y="250" width="160" height="50" rx="8" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                      </rect>
                      <text x="220" y="280" textAnchor="middle" fill="#7F1D1D" fontSize="14" fontWeight="bold">a = 20 (changed)</text>
                      
                      {/* Result - original unchanged */}
                      <rect x="140" y="330" width="160" height="50" rx="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" />
                      <text x="220" y="360" textAnchor="middle" fill="#991B1B" fontSize="14" fontWeight="bold">x = 10 (unchanged!)</text>
                      
                      <text x="220" y="395" textAnchor="middle" fill="#EF4444" fontSize="13" fontWeight="bold">❌ Original NOT modified</text>
                    </g>

                    {/* VS Divider */}
                    <text x="500" y="200" textAnchor="middle" fill="#6B7280" fontSize="24" fontWeight="bold">VS</text>

                    {/* Call by Reference Section */}
                    <g transform="translate(530, 20)">
                      <rect x="0" y="0" width="440" height="400" rx="12" fill="url(#refGrad)" stroke="#10B981" strokeWidth="2" />
                      <text x="220" y="30" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="18">Call by Reference (using pointers)</text>
                      
                      {/* Main variable */}
                      <rect x="140" y="60" width="160" height="50" rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
                      <text x="220" y="90" textAnchor="middle" fill="#064E3B" fontSize="14" fontWeight="bold">x = 10 (original)</text>
                      
                      {/* Arrow with address */}
                      <line x1="220" y1="110" x2="220" y2="160" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowGreen)" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                      </line>
                      <text x="240" y="140" fill="#10B981" fontSize="11">Pass address (0x1000)</text>
                      
                      {/* Function parameter - pointer */}
                      <rect x="100" y="170" width="240" height="50" rx="8" fill="#A7F3D0" stroke="#10B981" strokeWidth="2" />
                      <text x="220" y="195" textAnchor="middle" fill="#064E3B" fontSize="13" fontWeight="bold">int *ptr = 0x1000</text>
                      <text x="220" y="212" textAnchor="middle" fill="#047857" fontSize="11">(stores address)</text>
                      
                      {/* Dereference and modify */}
                      <rect x="100" y="250" width="240" height="50" rx="8" fill="#6EE7B7" stroke="#10B981" strokeWidth="2">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
                      </rect>
                      <text x="220" y="275" textAnchor="middle" fill="#064E3B" fontSize="13" fontWeight="bold">*ptr = 20</text>
                      <text x="220" y="292" textAnchor="middle" fill="#047857" fontSize="11">(modifies original!)</text>
                      
                      {/* Result - original changed */}
                      <rect x="140" y="330" width="160" height="50" rx="8" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" />
                      <text x="220" y="360" textAnchor="middle" fill="#064E3B" fontSize="14" fontWeight="bold">x = 20 (changed!)</text>
                      
                      <text x="220" y="395" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="bold">✅ Original modified!</text>
                    </g>
                  </svg>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 dark:bg-red-950/30 p-5 rounded-xl border border-red-200 dark:border-red-800">
                    <h3 className="font-bold text-lg text-red-800 dark:text-red-300 mb-3">❌ Call by Value</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Receives copy of value</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Cannot modify original</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Safe but limited</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Copies entire data</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="font-bold text-lg text-green-800 dark:text-green-300 mb-3">✅ Call by Reference (Pointers)</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-green-500">•</span> Receives address (pointer)</li>
                      <li className="flex items-start gap-2"><span className="text-green-500">•</span> Can modify original data</li>
                      <li className="flex items-start gap-2"><span className="text-green-500">•</span> Powerful and efficient</li>
                      <li className="flex items-start gap-2"><span className="text-green-500">•</span> Copies only address (8 bytes)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-2xl">
                    💻
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Code Examples
                  </h2>
                </div>

                <div className="space-y-6">
                  <EditableCCodeBlock
                    title="Example 1: Swap Function - The Classic Pointer Example"
                    initialCode={example1Code}
                  />

                  <EditableCCodeBlock
                    title="Example 2: Returning Multiple Values from Function"
                    initialCode={example2Code}
                  />

                  <EditableCCodeBlock
                    title="Example 3: Passing Arrays and Structures to Functions"
                    initialCode={example3Code}
                  />

                  <EditableCCodeBlock
                    title="Example 4: Pointer Parameters with const Correctness"
                    initialCode={example4Code}
                  />
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center text-2xl">
                    ⚠️
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Common Pitfalls
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">🚫 Beginner Mistakes</h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Forgetting &amp; when passing: <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">swap(x, y)</code> instead of <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">swap(&x, &y)</code></li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Forgetting * inside function: <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">ptr = 20</code> instead of <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">*ptr = 20</code></li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Passing pointer to local variable from function (dangling pointer)</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Not checking for NULL before dereferencing</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">💭 Conceptual Misunderstandings</h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "C has call by reference" - No, it simulates it with pointers</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "Arrays are passed by value" - They decay to pointers</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "Passing pointer is always faster" - For small types, maybe not</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "const pointer means data constant" - Depends on const placement!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center text-2xl">
                    ✅
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Best Practices
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">1.</span> Always check pointer parameters for NULL before dereferencing</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">2.</span> Use <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">const</code> for read-only pointer parameters: <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">void print(const int *ptr)</code></li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">3.</span> Document which parameters are inputs, outputs, or both</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">4.</span> Use meaningful parameter names: <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">out_result</code> for output pointers</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">5.</span> Prefer passing large structures by pointer (efficiency)</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">6.</span> Return error codes instead of using pointers for error reporting</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">7.</span> Never return pointer to local variable - use static or dynamic allocation</li>
                </ul>
              </div>
            </div>

            {/* Tips & Tricks */}
            <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl flex items-center justify-center text-2xl">
                    💡
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Professional Tips & Tricks
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Multiple Returns Pattern:</span> Use pointers for "out parameters" - list them first or last in parameter list for clarity, and prefix with 'out_'</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 In-Out Parameters:</span> For parameters that are both input and output, use pointer and document clearly: <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">void update(int *inout_value)</code></p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Error Handling:</span> Return error codes (0 for success, non-zero for error) and use pointers for actual results</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Debugging Helper:</span> Create print functions that take pointers to avoid copying large data</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Performance Tip:</span> For small types (int, char), passing by value may be faster due to better cache behavior - profile if unsure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-2xl">
                    ✓
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Mini Checklist
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I understand call by value vs call by reference</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can write a swap function using pointers</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I know how to return multiple values from a function</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can pass arrays and structures efficiently</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I always check pointers for NULL before dereferencing</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can use const correctly with pointer parameters</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
              <Teacher note="The swap function is the 'Hello World' of pointer functions. When Abhronila first saw it, she was confused why temp = *a; *a = *b; *b = temp; works. Draw the boxes! Draw the addresses! The secret is understanding that *a means 'go to the address stored in a'. Once students internalize this, function pointers become natural. Remember: Every semester, a student asks 'Why can't I just write swap(x, y)?' - that's your cue to review call by value vs reference!" />
            </div>

            {/* Hint Section */}
            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-700 animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤔</span>
                <h3 className="font-bold text-gray-800 dark:text-white">Think About This...</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Why does <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`void increment(int a) { a++; }</code> not change the original, but 
                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">void increment(int *a) { (*a)++; }`}</code> does? 
                Try changing the function call and observe what happens to memory addresses..."
              </p>
            </div>
          </div>
        ) : (
          // Q&A Section
          <div className="space-y-4 animate-[fadeInUp_0.6s_ease-out]">
            {qaData.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <details className="group">
                  <summary className="cursor-pointer p-6 font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                    <span className="text-blue-600 dark:text-blue-400 mr-3">Q{idx + 1}:</span>
                    {item.q}
                  </summary>
                  <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      <span className="font-bold text-green-600 dark:text-green-400">Answer:</span> {item.a}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeInUp_.*\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic3;