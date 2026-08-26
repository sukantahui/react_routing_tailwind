import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import C code files
import example1Code from "./topic0_files/example1.c?raw";
import example2Code from "./topic0_files/example2.c?raw";
import example3Code from "./topic0_files/example3.c?raw";
import example4Code from "./topic0_files/example4.c?raw";

const Topic0 = () => {
  const [activeTab, setActiveTab] = useState('concept');

  // Questions and Answers
  const qaData = [
    {
      q: "What is a pointer in C programming?",
      a: "A pointer is a variable that stores the memory address of another variable. Instead of holding a direct value like an integer or character, it holds the location where that value is stored in memory. Pointers are fundamental for dynamic memory allocation, array manipulation, and function parameter passing by reference."
    },
    {
      q: "Explain the difference between stack and heap memory allocation.",
      a: "Stack memory is automatically managed, allocated for local variables when functions are called, and deallocated when functions return. It's fast but limited in size. Heap memory is manually managed using malloc/calloc/realloc and freed with free. It's larger but slower, and requires explicit memory management to avoid leaks."
    },
    {
      q: "What is the size of a pointer on a 64-bit system?",
      a: "On a 64-bit system, a pointer typically occupies 8 bytes (64 bits). This is because the memory address space is 64 bits wide. On 32-bit systems, pointers occupy 4 bytes. The size is independent of the data type it points to - an int*, char*, and void* all have the same size."
    },
    {
      q: "How do you declare a pointer in C?",
      a: "A pointer is declared using the asterisk (*) symbol: 'int *ptr;' declares a pointer to an integer. The asterisk can be placed next to the type, variable name, or with spaces: 'int* ptr;', 'int * ptr;' are all valid. The address-of operator (&) gets the address of a variable, and the dereference operator (*) accesses the value at the address."
    },
    {
      q: "What happens when you dereference a NULL pointer?",
      a: "Dereferencing a NULL pointer (e.g., *ptr where ptr = NULL) leads to undefined behavior, typically causing a segmentation fault or program crash. NULL is a special address (usually 0) that indicates the pointer doesn't point to valid memory. Always check for NULL before dereferencing."
    },
    {
      q: "Explain pointer arithmetic with an example.",
      a: "Pointer arithmetic allows moving pointers through memory. When you increment a pointer (ptr++), it moves forward by the size of the data type it points to. For example, if 'int *ptr' points to address 1000, ptr++ points to 1004 (assuming 4-byte integers). This is why array indexing works: arr[i] is equivalent to *(arr + i)."
    },
    {
      q: "What is the difference between 'int *ptr = &var;' and 'int *ptr; ptr = &var;'?",
      a: "Both are functionally equivalent. The first initializes the pointer at declaration time, which is considered better practice as it prevents the pointer from containing garbage values. The second declares the pointer first (which may contain a random address), then assigns it a valid address. Initializing at declaration is safer."
    },
    {
      q: "Can a pointer point to another pointer?",
      a: "Yes, this is called a pointer to pointer or double pointer (int **ptr). It stores the address of another pointer variable. This is commonly used for dynamic 2D arrays, modifying pointer arguments in functions, and creating complex data structures like linked lists with head pointers that need modification."
    },
    {
      q: "What is the difference between 'int *ptr[5]' and 'int (*ptr)[5]'?",
      a: "'int *ptr[5]' is an array of 5 integer pointers - each element is a pointer to int. 'int (*ptr)[5]' is a pointer to an array of 5 integers - ptr points to a whole array. The parentheses change the binding: [] has higher precedence than *, so without parentheses, it's an array of pointers."
    },
    {
      q: "Explain the concept of memory leak.",
      a: "A memory leak occurs when dynamically allocated memory (using malloc/calloc/realloc) is no longer accessible but hasn't been freed with free(). This happens when you lose all pointers to allocated memory. Memory leaks reduce available memory over time, potentially causing program slowdown or crashes in long-running applications."
    },
    {
      q: "What is a dangling pointer and how can it be prevented?",
      a: "A dangling pointer points to memory that has already been freed or deallocated. Accessing it causes undefined behavior. Prevention strategies include: setting pointers to NULL after freeing, avoiding returning addresses of local variables from functions, and using static analysis tools. Always free memory only once and set pointers to NULL."
    },
    {
      q: "How does the stack memory work with function calls?",
      a: "When a function is called, a stack frame is created containing local variables, parameters, return address, and saved registers. The frame is pushed onto the stack. When the function returns, the frame is popped, and local variables are automatically deallocated. This LIFO (Last-In-First-Out) behavior makes stack allocation very fast."
    },
    {
      q: "What is the purpose of the 'void' pointer?",
      a: "A void pointer (void*) is a generic pointer that can point to any data type. It cannot be dereferenced directly without casting to a specific type first. Void pointers are used in generic functions like qsort(), malloc(), memcpy() where the data type is unknown. They're essential for writing type-agnostic code."
    },
    {
      q: "Explain the relationship between arrays and pointers.",
      a: "Arrays and pointers are closely related but not identical. An array name acts like a constant pointer to its first element (arr == &arr[0]). However, sizeof(arr) gives the total array size, while sizeof(ptr) gives pointer size (8 bytes on 64-bit). Arrays cannot be reassigned to point elsewhere, while pointers can."
    },
    {
      q: "What is the difference between 'ptr++' and '++ptr' with pointers?",
      a: "'ptr++' is post-increment: the current address is used in the expression, then ptr is incremented. '++ptr' is pre-increment: ptr is incremented first, then the new address is used. Both advance the pointer by sizeof(type) bytes. Understanding this matters in complex expressions and loop conditions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section with Animation */}
        <div className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
            Topic 0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent mb-4">
            Basic Pointers & Memory Model
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the foundation of C pointers, stack vs heap memory, and how to safely manage memory in your programs
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
                    🧠
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    What Are Pointers?
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  A <span className="font-mono font-bold text-blue-600 dark:text-blue-400">pointer</span> is a variable that stores the memory address of another variable. 
                  Instead of holding a direct value like an integer (5) or character ('A'), a pointer holds the location 
                  where that value lives in your computer's memory.
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">💡 Real-World Analogy:</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Think of memory as a giant apartment building. Each apartment has a unique number (memory address). 
                    A pointer is like a note card that stores an apartment number. To visit your friend Swadeep, 
                    you don't carry Swadeep himself—you carry his apartment address! Similarly, pointers store addresses 
                    so you can access the actual data stored there.
                  </p>
                </div>
              </div>
            </div>

            {/* Memory Model: Stack vs Heap */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Memory Model: Stack vs Heap
                  </h2>
                </div>
                
                {/* SVG Illustration */}
                <div className="mb-8 overflow-x-auto">
                  <svg viewBox="0 0 800 500" className="w-full max-w-4xl mx-auto" style={{ maxWidth: '100%', height: 'auto' }}>
                    <defs>
                      <linearGradient id="stackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 0.4 }} />
                      </linearGradient>
                      <linearGradient id="heapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0.4 }} />
                      </linearGradient>
                      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2" />
                      </filter>
                    </defs>
                    
                    {/* Stack Section */}
                    <g transform="translate(100, 50)">
                      <rect x="0" y="0" width="250" height="400" rx="12" fill="url(#stackGrad)" stroke="#3B82F6" strokeWidth="2" filter="url(#shadow)">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                      </rect>
                      <text x="125" y="30" textAnchor="middle" fill="#3B82F6" fontWeight="bold" fontSize="18">STACK</text>
                      <text x="125" y="50" textAnchor="middle" fill="#6B7280" fontSize="12">(LIFO - Automatic)</text>
                      
                      {/* Stack frames */}
                      <rect x="20" y="70" width="210" height="60" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" begin="0s" repeatCount="indefinite" />
                      </rect>
                      <text x="125" y="95" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">main() frame</text>
                      <text x="125" y="115" textAnchor="middle" fill="#4B5563" fontSize="11">int x = 42</text>
                      
                      <rect x="20" y="150" width="210" height="60" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" begin="0.5s" repeatCount="indefinite" />
                      </rect>
                      <text x="125" y="175" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">calculate() frame</text>
                      <text x="125" y="195" textAnchor="middle" fill="#4B5563" fontSize="11">int result = 0</text>
                      
                      <rect x="20" y="230" width="210" height="60" rx="6" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.5">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" begin="1s" repeatCount="indefinite" />
                      </rect>
                      <text x="125" y="255" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">add() frame</text>
                      <text x="125" y="275" textAnchor="middle" fill="#4B5563" fontSize="11">int sum = 10</text>
                      
                      <text x="125" y="340" textAnchor="middle" fill="#6B7280" fontSize="12">⬆️ Grows Upward</text>
                      <text x="125" y="360" textAnchor="middle" fill="#6B7280" fontSize="12">⬇️ Shrinks Downward</text>
                    </g>
                    
                    {/* Arrow between Stack and Heap */}
                    <g>
                      <line x1="380" y1="250" x2="420" y2="250" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                      </line>
                      <text x="400" y="240" textAnchor="middle" fill="#6B7280" fontSize="12">↔️</text>
                      <text x="400" y="275" textAnchor="middle" fill="#6B7280" fontSize="10">Pointers</text>
                    </g>
                    
                    {/* Heap Section */}
                    <g transform="translate(450, 50)">
                      <rect x="0" y="0" width="250" height="400" rx="12" fill="url(#heapGrad)" stroke="#10B981" strokeWidth="2" filter="url(#shadow)">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" begin="1s" repeatCount="indefinite" />
                      </rect>
                      <text x="125" y="30" textAnchor="middle" fill="#10B981" fontWeight="bold" fontSize="18">HEAP</text>
                      <text x="125" y="50" textAnchor="middle" fill="#6B7280" fontSize="12">(Manual - malloc/free)</text>
                      
                      {/* Random heap blocks */}
                      <rect x="20" y="70" width="90" height="50" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" opacity="0.9">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" begin="0s" repeatCount="indefinite" />
                      </rect>
                      <text x="65" y="95" textAnchor="middle" fill="#064E3B" fontSize="11" fontWeight="bold">Block A</text>
                      <text x="65" y="110" textAnchor="middle" fill="#4B5563" fontSize="10">64 bytes</text>
                      
                      <rect x="140" y="70" width="90" height="50" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" opacity="0.9">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                      </rect>
                      <text x="185" y="95" textAnchor="middle" fill="#064E3B" fontSize="11" fontWeight="bold">Block B</text>
                      <text x="185" y="110" textAnchor="middle" fill="#4B5563" fontSize="10">128 bytes</text>
                      
                      <rect x="20" y="140" width="210" height="50" rx="6" fill="#A7F3D0" stroke="#10B981" strokeWidth="1.5" opacity="0.9">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" begin="1s" repeatCount="indefinite" />
                      </rect>
                      <text x="125" y="165" textAnchor="middle" fill="#064E3B" fontSize="11" fontWeight="bold">Block C (Array)</text>
                      <text x="125" y="180" textAnchor="middle" fill="#4B5563" fontSize="10">256 bytes</text>
                      
                      <rect x="20" y="210" width="130" height="50" rx="6" fill="#6EE7B7" stroke="#10B981" strokeWidth="1.5" opacity="0.9">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" begin="1.5s" repeatCount="indefinite" />
                      </rect>
                      <text x="85" y="235" textAnchor="middle" fill="#064E3B" fontSize="11" fontWeight="bold">Block D</text>
                      <text x="85" y="250" textAnchor="middle" fill="#4B5563" fontSize="10">32 bytes</text>
                      
                      <text x="125" y="340" textAnchor="middle" fill="#6B7280" fontSize="12">🔹 Fragmented</text>
                      <text x="125" y="360" textAnchor="middle" fill="#6B7280" fontSize="12">🔹 Requires free()</text>
                    </g>
                  </svg>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-3">📚 Stack Memory</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Automatic allocation and deallocation</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Fixed size (typically 1-8 MB)</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Very fast access (LIFO structure)</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Stores local variables, function parameters</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Variables cannot be resized</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="font-bold text-lg text-green-800 dark:text-green-300 mb-3">🗃️ Heap Memory</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-green-500">•</span> Manual allocation (malloc/calloc/realloc)</li>
                      <li className="flex items-start gap-2"><span className="text-green-500">•</span> Large, limited by RAM/virtual memory</li>
                      <li className="flex items-start gap-2"><span className="text-green-500">•</span> Slower access due to fragmentation</li>
                      <li className="flex items-start gap-2"><span className="text-green-500">•</span> Must explicitly free with free()</li>
                      <li className="flex items-start gap-2"><span className="text-green-500">•</span> Can resize using realloc()</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Examples Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center text-2xl">
                    💻
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Code Examples
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <EditableCCodeBlock
                    title="Example 1: Basic Pointer Declaration and Usage"
                    initialCode={example1Code}
                  />
                  
                  <EditableCCodeBlock
                    title="Example 2: Stack vs Heap Memory Allocation"
                    initialCode={example2Code}
                  />
                  
                  <EditableCCodeBlock
                    title="Example 3: Common Pointer Mistakes"
                    initialCode={example3Code}
                  />
                  
                  <EditableCCodeBlock
                    title="Example 4: Pointers with Different Data Types"
                    initialCode={example4Code}
                  />
                </div>
              </div>
            </div>

            {/* Common Pitfalls Section */}
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
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Forgetting to initialize pointers before use</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Dereferencing NULL or uninitialized pointers</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Confusing <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">*</code> (declaration) with <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">*</code> (dereference)</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Returning address of local variables from functions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">💭 Misconceptions</h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "Pointers are dangerous" - They're powerful tools!</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "&amp;array gives address of whole array" - Actually same as array</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "malloc always succeeds" - Always check for NULL!</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "Stack is always better" - Depends on use case</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices Section */}
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
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">1.</span> Always initialize pointers to <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">NULL</code> if not immediately assigned</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">2.</span> Check for <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">NULL</code> before dereferencing any pointer</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">3.</span> Use <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">const</code> for pointers that shouldn't modify data</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">4.</span> Free dynamically allocated memory and set pointers to <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">NULL</code></li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">5.</span> Use meaningful names: <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">ptr_</code> prefix helps identify pointers</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">6.</span> Prefer stack allocation for small, fixed-size data</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">7.</span> Document pointer ownership (who should free)</li>
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
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Debugging:</span> Use <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">printf("ptr = %p\n", (void*)ptr)</code> to print pointer addresses</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Performance:</span> Accessing heap memory is ~10-100x slower than stack due to indirection and caching</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Memory Layout:</span> Use <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">sizeof</code> to understand memory sizes: <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">printf("int: %zu, ptr: %zu\n", sizeof(int), sizeof(int*))</code></p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Safe Coding:</span> Create wrapper functions for malloc that check allocation success</p>
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
                    <span className="text-gray-700 dark:text-gray-300">I understand what a pointer is and its purpose</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can differentiate between stack and heap memory</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I know how to declare and use basic pointers</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I understand pointer arithmetic and sizeof behavior</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I always initialize pointers and check for NULL</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I know when to use stack vs heap allocation</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
              <Teacher note="Pointers are the bridge between high-level programming and memory management. Think of them as Google Maps for your computer's memory - they tell you exactly where data lives! Practice drawing memory diagrams for every pointer operation. Remember: Swadeep from Barrackpore CNAT always says 'Initialize before you utilize!' Start with simple integer pointers before moving to complex structures. The stack is like a stack of plates (fast but fixed), while heap is like a warehouse (flexible but needs management). Master this topic, and you'll have a superpower in C programming!" />
            </div>

            {/* Hint Section */}
            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-700 animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤔</span>
                <h3 className="font-bold text-gray-800 dark:text-white">Think About This...</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Why does <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int *ptr = 5;</code> cause a compilation warning, but 
                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int *ptr = (int*)5;</code> compiles? Try changing the value and observe what happens when you dereference it..."
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

      {/* Global Keyframe Animations */}
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

export default Topic0;