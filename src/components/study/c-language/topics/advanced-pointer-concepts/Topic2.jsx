import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import C code files
import example1Code from "./topic2_files/example1.c?raw";
import example2Code from "./topic2_files/example2.c?raw";
import example3Code from "./topic2_files/example3.c?raw";
import example4Code from "./topic2_files/example4.c?raw";

const Topic2 = () => {
  const [activeTab, setActiveTab] = useState('concept');

  // Questions and Answers
  const qaData = [
    {
      q: "What are the different syntax variations for declaring pointers in C?",
      a: "C allows three syntax variations for pointer declaration: 'int* ptr;' (asterisk near type), 'int *ptr;' (asterisk near variable), and 'int * ptr;' (spaces on both sides). All are valid and compile to the same thing. However, 'int* ptr1, ptr2;' declares ptr1 as pointer but ptr2 as integer! To declare multiple pointers, use 'int *ptr1, *ptr2;' or 'int* ptr1, *ptr2;'."
    },
    {
      q: "How does the compiler interpret the asterisk (*) in different contexts?",
      a: "The asterisk has three distinct meanings in C: (1) In declarations: 'int *ptr;' - declares ptr as a pointer type. (2) As dereference operator: '*ptr = 5;' - accesses the value at the address stored in ptr. (3) In multiplication: 'int result = a * b;' - performs arithmetic multiplication. The compiler determines meaning based on context and syntax."
    },
    {
      q: "What is the memory layout of a pointer variable?",
      a: "A pointer variable occupies memory like any other variable, storing a memory address. On 64-bit systems, pointers occupy 8 bytes. The stored address points to another memory location. The pointer itself has its own address (where it lives), stores a value (the target address), and that target address contains the actual data. This three-level relationship (pointer address → pointer value → data) is crucial for understanding indirection."
    },
    {
      q: "How does pointer declaration syntax differ between primitive types and structures?",
      a: "The syntax is identical: 'int *intPtr;' for integers, 'float *floatPtr;' for floats, 'Student *studPtr;' for structures. However, accessing members differs: For structure pointers, use 'studPtr->name' (arrow operator) instead of '(*studPtr).name'. The arrow operator is syntactic sugar that combines dereferencing and member access, making code more readable."
    },
    {
      q: "What is the difference between 'int* ptr' and 'int *ptr' in terms of readability?",
      a: "There's no functional difference, but they reflect different philosophies. 'int* ptr' emphasizes that 'int*' is the type (pointer to integer), making it clear ptr has pointer type. 'int *ptr' emphasizes that '*ptr' yields an integer value. The first style is common in C++ and among programmers who think of pointer types; the second is traditional in C. Choose one and be consistent, especially when declaring multiple pointers."
    },
    {
      q: "How does the compiler represent a NULL pointer in memory?",
      a: "NULL is typically defined as ((void*)0), meaning the address 0. On most systems, address 0 is intentionally unmapped - accessing it causes a segmentation fault. NULL pointers are guaranteed to compare unequal to any valid pointer. In memory, a NULL pointer contains all zero bits, but the C standard doesn't require this representation, though it's universal in practice."
    },
    {
      q: "What happens in memory when you declare multiple pointers on one line?",
      a: "When declaring 'int* a, b;', 'a' is a pointer to integer, but 'b' is a regular integer - the asterisk applies only to 'a'. This is a common source of bugs. To declare multiple pointers, put asterisk before each variable: 'int *a, *b;' or 'int* a, *b;'. Memory allocation: pointers get 8 bytes each (on 64-bit), regular integers get 4 bytes."
    },
    {
      q: "How do you read complex pointer declarations like 'int (*ptr)[5]'?",
      a: "Use the right-left rule: Start at the variable name and read right, then left, alternating. For 'int (*ptr)[5]': Start at 'ptr', go right - nothing, go left - sees '(' and then '*', so ptr is a pointer. Continue right - sees '[5]', so pointer to array of 5. Continue left - sees 'int', so pointer to array of 5 integers. Practice reading: 'int *(*ptr)(int)' is pointer to function returning pointer to int."
    },
    {
      q: "What is the memory representation of a pointer to a pointer?",
      a: "A double pointer (int **dptr) occupies 8 bytes (on 64-bit) and stores the address of a single pointer. That single pointer (int *ptr) also occupies 8 bytes and stores the address of an integer. The integer occupies 4 bytes. Memory addresses: &dptr (8 bytes) → dptr stores &ptr (8 bytes) → ptr stores &var (8 bytes) → var stores value (4 bytes). Each level adds indirection but each pointer is just an address."
    },
    {
      q: "How does the 'const' keyword affect pointer syntax and memory representation?",
      a: "const can appear in four positions: 'const int *ptr' (pointer to constant int - can't change value pointed to), 'int const *ptr' (same as previous), 'int *const ptr' (constant pointer - can't change where ptr points), 'const int *const ptr' (constant pointer to constant int - can't change either). Memory representation is identical; const is enforced by compiler, not reflected in memory layout."
    },
    {
      q: "What is the difference between 'int *ptr = &var;' and 'int *ptr; *ptr = &var;'?",
      a: "The first initializes ptr with the address of var - correct and safe. The second is wrong: '*ptr = &var;' attempts to store an address (8 bytes) into an integer (4 bytes) after dereferencing an uninitialized pointer, causing undefined behavior. The correct second way would be 'int *ptr; ptr = &var;' (without dereference operator)."
    },
    {
      q: "How does pointer syntax work with typedef?",
      a: "typedef can simplify pointer syntax: 'typedef int* IntPtr; IntPtr a, b;' declares both a and b as pointers (unlike 'int* a, b;'). However, hiding pointers behind typedefs can make code less clear. Common pattern: 'typedef struct Node* NodePtr;' for linked lists. Memory representation is unchanged - typedef just creates a type alias."
    },
    {
      q: "What is the syntax for function pointers and their memory representation?",
      a: "Function pointer syntax: 'int (*funcPtr)(int, int);' declares funcPtr as pointer to function taking two ints and returning int. Assignment: 'funcPtr = &add;' or 'funcPtr = add;' (function name decays to pointer). Call: 'int result = funcPtr(5, 3);' or '(*funcPtr)(5, 3);'. Memory: function pointer stores address of function code in text segment (not data or heap)."
    },
    {
      q: "How does array-to-pointer decay affect syntax and memory?",
      a: "When an array name is used in an expression (except with sizeof or &), it 'decays' to a pointer to its first element. So 'int arr[5]; int *ptr = arr;' is valid - arr becomes &arr[0]. However, 'int *ptr = &arr;' is different - type is 'pointer to array of 5 ints' not 'pointer to int'. Memory: arr itself doesn't occupy pointer storage; it's a label for the array's starting address."
    },
    {
      q: "What is the correct syntax for pointer arithmetic with different types?",
      a: "Pointer arithmetic syntax: 'ptr + n' advances by n * sizeof(*ptr) bytes. For 'int *ptr', ptr+1 advances 4 bytes; for 'char *ptr', ptr+1 advances 1 byte; for 'double *ptr', ptr+1 advances 8 bytes. Syntax is same for all types, but memory offset differs. Pre/post increment/decrement: 'ptr++' and '++ptr' both advance pointer but differ in expression value (post returns original, pre returns new)."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-semibold mb-4">
            Topic 2
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-cyan-800 to-gray-900 dark:from-white dark:via-cyan-400 dark:to-white bg-clip-text text-transparent mb-4">
            Syntax and Memory Representation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mastering pointer declaration syntax, understanding compiler interpretation, and visualizing memory layout
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
                  ? "bg-cyan-600 text-white shadow-lg scale-105"
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
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl flex items-center justify-center text-2xl">
                    ✍️
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Understanding Pointer Syntax
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Pointer syntax in C can be confusing because the <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">asterisk (*)</span> serves 
                  multiple purposes: declaring pointers, dereferencing addresses, and multiplication. Understanding these syntax rules is 
                  crucial for writing correct and readable code.
                </p>
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30 p-6 rounded-xl border border-cyan-200 dark:border-cyan-800">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">🎯 Key Insight:</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    The compiler reads declarations from right to left, but expressions are evaluated based on operator precedence. 
                    When Tuhina from Barrackpore CNAT writes <span className="font-mono">int* a, b;</span>, only 'a' is a pointer - 'b' is a regular integer!
                  </p>
                </div>
              </div>
            </div>

            {/* Memory Layout Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center text-2xl">
                    🗄️
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Memory Layout of Pointers
                  </h2>
                </div>

                {/* SVG Memory Layout Diagram */}
                <div className="mb-8 overflow-x-auto">
                  <svg viewBox="0 0 1000 500" className="w-full max-w-5xl mx-auto" style={{ maxWidth: '100%', height: 'auto' }}>
                    <defs>
                      <linearGradient id="memoryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 0.1 }} />
                        <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.1 }} />
                      </linearGradient>
                      <filter id="memShadow" x="-2%" y="-2%" width="104%" height="104%">
                        <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.15" />
                      </filter>
                    </defs>

                    {/* Memory grid background */}
                    <rect x="50" y="50" width="900" height="400" rx="12" fill="url(#memoryGrad)" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="8,4" />

                    {/* Address column */}
                    <text x="70" y="90" fill="#6B7280" fontSize="12" fontWeight="bold">Address</text>
                    <text x="70" y="130" fill="#6B7280" fontSize="11">0x1000</text>
                    <text x="70" y="170" fill="#6B7280" fontSize="11">0x1004</text>
                    <text x="70" y="210" fill="#6B7280" fontSize="11">0x1008</text>
                    <text x="70" y="250" fill="#6B7280" fontSize="11">0x1010</text>
                    <text x="70" y="290" fill="#6B7280" fontSize="11">0x1018</text>
                    <text x="70" y="330" fill="#6B7280" fontSize="11">0x1020</text>
                    <text x="70" y="370" fill="#6B7280" fontSize="11">0x1028</text>

                    {/* Data column */}
                    <text x="200" y="90" fill="#6B7280" fontSize="12" fontWeight="bold">Content</text>

                    {/* Variable memory cells */}
                    <rect x="180" y="115" width="300" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" filter="url(#memShadow)">
                      <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <text x="330" y="140" textAnchor="middle" fill="#991B1B" fontSize="14" fontWeight="bold">int var = 42</text>
                    <text x="500" y="140" fill="#6B7280" fontSize="11">4 bytes</text>

                    <rect x="180" y="195" width="300" height="40" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" filter="url(#memShadow)">
                      <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" begin="0.5s" repeatCount="indefinite" />
                    </rect>
                    <text x="330" y="220" textAnchor="middle" fill="#1E3A8A" fontSize="14" fontWeight="bold">int* ptr = 0x1000</text>
                    <text x="500" y="220" fill="#6B7280" fontSize="11">8 bytes</text>

                    <rect x="180" y="275" width="300" height="40" rx="6" fill="#E9D5FF" stroke="#8B5CF6" strokeWidth="2" filter="url(#memShadow)">
                      <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" begin="1s" repeatCount="indefinite" />
                    </rect>
                    <text x="330" y="300" textAnchor="middle" fill="#4C1D95" fontSize="14" fontWeight="bold">int** dptr = 0x1008</text>
                    <text x="500" y="300" fill="#6B7280" fontSize="11">8 bytes</text>

                    {/* Arrows showing indirection */}
                    <g>
                      <line x1="480" y1="215" x2="480" y2="155" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowBlue)" strokeDasharray="4,3">
                        <animate attributeName="stroke-dashoffset" values="0;7" dur="1s" repeatCount="indefinite" />
                      </line>
                      <text x="495" y="190" fill="#3B82F6" fontSize="10">ptr points to var</text>
                    </g>

                    <g>
                      <line x1="480" y1="295" x2="480" y2="235" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowPurple)" strokeDasharray="4,3">
                        <animate attributeName="stroke-dashoffset" values="0;7" dur="1s" begin="0.5s" repeatCount="indefinite" />
                      </line>
                      <text x="495" y="270" fill="#8B5CF6" fontSize="10">dptr points to ptr</text>
                    </g>

                    {/* Legend */}
                    <g transform="translate(600, 100)">
                      <rect x="0" y="0" width="200" height="150" rx="8" fill="white" stroke="#CBD5E1" strokeWidth="1" />
                      <text x="100" y="25" textAnchor="middle" fill="#1F2937" fontSize="13" fontWeight="bold">Legend</text>
                      <rect x="15" y="40" width="12" height="12" rx="2" fill="#FEE2E2" stroke="#EF4444" />
                      <text x="35" y="51" fill="#4B5563" fontSize="11">Variable (data)</text>
                      <rect x="15" y="65" width="12" height="12" rx="2" fill="#DBEAFE" stroke="#3B82F6" />
                      <text x="35" y="76" fill="#4B5563" fontSize="11">Single Pointer</text>
                      <rect x="15" y="90" width="12" height="12" rx="2" fill="#E9D5FF" stroke="#8B5CF6" />
                      <text x="35" y="101" fill="#4B5563" fontSize="11">Double Pointer</text>
                      <text x="15" y="130" fill="#6B7280" fontSize="10">64-bit system: pointers = 8 bytes</text>
                    </g>
                  </svg>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-3">📝 Declaration Rules</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 font-mono text-sm">
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> int *ptr;           // Traditional C style</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> int* ptr;           // Type-focused style</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> int * ptr;          // Spaced style</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500 mt-2">•</span> int *a, *b;         // Multiple pointers</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> int* a, b;          // BAD: b is int!</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h3 className="font-bold text-lg text-purple-800 dark:text-purple-300 mb-3">🔍 Reading Complex Declarations</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-purple-500">•</span> int *arr[5] → array of 5 int pointers</li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">•</span> int (*arr)[5] → pointer to array of 5 ints</li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">•</span> int *func() → function returning int*</li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">•</span> int (*func)() → pointer to function</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Syntax Comparison Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Syntax Comparison: Declaration vs Dereference
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30">
                        <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">Context</th>
                        <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">Syntax</th>
                        <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">Meaning</th>
                        <th className="p-3 text-left font-semibold text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300">Declaration</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-cyan-600 dark:text-cyan-400">type *name;</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400">Declares 'name' as pointer to 'type'</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300">int *ptr;</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300">Dereference</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-cyan-600 dark:text-cyan-400">*pointer</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400">Accesses value at address stored</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300">*ptr = 42;</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300">Address-of</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-cyan-600 dark:text-cyan-400">&amp;variable</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400">Gets memory address of variable</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300">ptr = &amp;var;</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300">Multiplication</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-cyan-600 dark:text-cyan-400">a * b</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400">Arithmetic multiplication</td>
                        <td className="p-3 border border-gray-300 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300">int x = a * b;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl flex items-center justify-center text-2xl">
                    💻
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Code Examples
                  </h2>
                </div>

                <div className="space-y-6">
                  <EditableCCodeBlock
                    title="Example 1: Basic Pointer Declaration and Syntax Variations"
                    initialCode={example1Code}
                  />

                  <EditableCCodeBlock
                    title="Example 2: Complex Pointer Declarations and the Right-Left Rule"
                    initialCode={example2Code}
                  />

                  <EditableCCodeBlock
                    title="Example 3: Memory Layout and Address Visualization"
                    initialCode={example3Code}
                  />

                  <EditableCCodeBlock
                    title="Example 4: const Pointers and Type Qualifiers"
                    initialCode={example4Code}
                  />
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center text-2xl">
                    ⚠️
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Common Syntax Pitfalls
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">🚫 Beginner Mistakes</h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">int* a, b;</code> - b is not a pointer!</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Forgetting &amp; in scanf: <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">scanf("%d", ptr);</code> when ptr uninitialized</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Confusing <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">*ptr++</code> vs <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">(*ptr)++</code></li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Using <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">*ptr = &amp;var;</code> instead of <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">ptr = &amp;var;</code></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">💭 Compiler Error Messages</h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "incompatible pointer types" - Type mismatch</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "dereferencing void* pointer" - Need cast</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "assignment makes integer from pointer" - Missing *</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "invalid type argument of unary '*'" - Not a pointer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
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
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">1.</span> Choose one pointer declaration style and be consistent throughout the project</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">2.</span> Always put asterisk with variable name when declaring multiple pointers: <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">int *a, *b;</code></li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">3.</span> Initialize pointers at declaration when possible: <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">int *ptr = NULL;</code></li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">4.</span> Use parentheses to make precedence explicit: <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">(*ptr)++</code> vs <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">*ptr++</code></li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">5.</span> Use <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">typedef</code> sparingly for pointers - it can hide important information</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">6.</span> Add comments for complex pointer declarations explaining what they mean</li>
                </ul>
              </div>
            </div>

            {/* Tips & Tricks */}
            <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
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
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Right-Left Rule:</span> To read complex declarations, start at variable name, go right until end or ), then left, repeat: <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">int (*(*ptr)(int))[5]</code></p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 cdecl Tool:</span> Use <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">cdecl&gt; explain int (*ptr)[5]</code> to decode complex declarations</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 IDE Help:</span> Modern IDEs like VS Code show pointer types on hover - use them!</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Debugging:</span> Use <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">printf("%p", (void*)ptr)</code> to verify pointer values</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Memory Size:</span> Remember: <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">sizeof(ptr)</code> gives pointer size (8 on 64-bit), not what it points to</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
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
                    <span className="text-gray-700 dark:text-gray-300">I can distinguish between declaration (*) and dereference (*)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I know the difference between int* a, b and int *a, *b</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can read simple to moderate pointer declarations</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I understand the memory layout of single and double pointers</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can use const correctly with pointers</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I know how to use typedef with pointers</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
              <Teacher note="Syntax is the first hurdle students face with pointers. When Debangshu asks 'Why does int* a, b; only make a a pointer?', I draw the memory box diagram. The key is repetition - write 10 pointer declarations daily until it becomes muscle memory. Remember: The compiler doesn't care about spaces, but your teammates do! Be consistent. Use the right-left rule for complex declarations - Sreeparna from Naihati CNAT found it life-changing for understanding function pointers!" />
            </div>

            {/* Hint Section */}
            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-700 animate-[fadeInUp_0.6s_ease-out_0.9s_both]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤔</span>
                <h3 className="font-bold text-gray-800 dark:text-white">Think About This...</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "What is the difference between <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int *ptr = &var;</code> and 
                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int *ptr; *ptr = &var;</code>? Why does the second cause a compilation warning or crash? 
                Observe carefully where the asterisk appears - before or after the equals sign..."
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
                    <span className="text-cyan-600 dark:text-cyan-400 mr-3">Q{idx + 1}:</span>
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

export default Topic2;