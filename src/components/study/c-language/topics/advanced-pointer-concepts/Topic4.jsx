import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import C code files
import example1Code from "./topic4_files/example1.c?raw";
import example2Code from "./topic4_files/example2.c?raw";
import example3Code from "./topic4_files/example3.c?raw";
import example4Code from "./topic4_files/example4.c?raw";

const Topic4 = () => {
  const [activeTab, setActiveTab] = useState('concept');

  // Questions and Answers
  const qaData = [
    {
      q: "Why do we need double pointers for dynamic memory allocation?",
      a: "Double pointers are essential when a function needs to allocate memory and return that memory through a parameter. Since C passes parameters by value, passing a single pointer (int *ptr) only allows modifying the data pointed to, not the pointer itself. With a double pointer (int **ptr), the function can modify the original pointer variable in the caller, setting it to point to newly allocated memory. This pattern is used in functions like 'allocate_memory(int **ptr, int size)'."
    },
    {
      q: "How do you allocate memory for a 2D array using double pointers?",
      a: "First allocate an array of row pointers: 'int **matrix = (int**)malloc(rows * sizeof(int*));'. Then for each row, allocate columns: 'for(int i = 0; i < rows; i++) matrix[i] = (int*)malloc(cols * sizeof(int));'. This creates a jagged array where each row can have different column sizes. Access elements with matrix[i][j]. Free in reverse order: first free each row, then free the array of pointers."
    },
    {
      q: "What is the difference between static 2D array and dynamic 2D array with double pointers?",
      a: "Static 2D array 'int arr[3][4]' allocates contiguous memory (12 integers in one block) on stack or in data segment. Dynamic 2D array with double pointers allocates an array of pointers (3 pointers) plus separate arrays for each row (4 integers each). Memory may be non-contiguous, which can affect cache performance. However, dynamic allocation allows variable row sizes and runtime-determined dimensions."
    },
    {
      q: "How do you properly free memory allocated with double pointers?",
      a: "Free in reverse order of allocation: First free each row/column: 'for(int i = 0; i < rows; i++) free(matrix[i]);' Then free the array of pointers: 'free(matrix);'. Always set the double pointer to NULL after freeing: 'matrix = NULL;'. Forgetting to free individual rows before freeing the main pointer causes memory leaks. Freeing only the main pointer loses all references to row allocations."
    },
    {
      q: "What happens if you don't check malloc's return value with double pointers?",
      a: "malloc returns NULL if allocation fails. Without checking, you might dereference NULL later, causing segmentation fault. For 2D allocations, if a row allocation fails, you must free previously allocated rows to avoid memory leaks. Best practice: check each allocation and implement cleanup: 'if(matrix[i] == NULL) { for(int j=0; j<i; j++) free(matrix[j]); free(matrix); return NULL; }'"
    },
    {
      q: "How do you reallocate memory for a double pointer 2D array?",
      a: "realloc with double pointers is complex because rows may be non-contiguous. To add a row: use realloc on the main pointer: 'matrix = (int**)realloc(matrix, (newRows) * sizeof(int*));' then allocate the new row: 'matrix[newRows-1] = (int*)malloc(cols * sizeof(int));'. To add columns to all rows, realloc each row individually: 'for(int i=0; i<rows; i++) matrix[i] = (int*)realloc(matrix[i], newCols * sizeof(int));'"
    },
    {
      q: "What is a jagged array and how do you create it with double pointers?",
      a: "A jagged array is a 2D array where each row has a different number of columns. Using double pointers: 'int **jagged = (int**)malloc(rows * sizeof(int*));' then allocate each row with different sizes: 'jagged[0] = (int*)malloc(3 * sizeof(int)); jagged[1] = (int*)malloc(5 * sizeof(int)); jagged[2] = (int*)malloc(2 * sizeof(int));'. This is useful for sparse matrices or variable-length data like student records where each student has different number of courses."
    },
    {
      q: "How do you pass a dynamically allocated 2D array to a function?",
      a: "Pass the double pointer and dimensions: 'void processMatrix(int **matrix, int rows, int cols)'. Inside the function, use matrix[i][j] syntax normally. The function receives a copy of the double pointer (address of row pointers), but can still modify the array elements. To modify the pointer itself (reallocate), pass triple pointer: 'void reallocateMatrix(int ***matrix, int newRows, int newCols)'."
    },
    {
      q: "What is the memory overhead of using double pointers for 2D arrays?",
      a: "For an rows×cols matrix, memory overhead is: rows * sizeof(int*) (for row pointers) + rows * cols * sizeof(int) (for actual data). On 64-bit system, each row pointer is 8 bytes. For a large matrix (1000×1000), overhead is 1000*8 = 8KB, negligible compared to 4MB of data. However, each row allocation has malloc overhead (typically 16-32 bytes per allocation), which can be significant for many small rows."
    },
    {
      q: "How do you create a 3D array using double/triple pointers?",
      a: "Triple pointer for 3D: 'int ***array3d = (int***)malloc(depth * sizeof(int**));' Then allocate each 2D layer: 'for(int i=0; i<depth; i++) { array3d[i] = (int**)malloc(rows * sizeof(int*)); for(int j=0; j<rows; j++) array3d[i][j] = (int*)malloc(cols * sizeof(int)); }'. Free in reverse order: columns → rows → depth. Access: array3d[d][r][c]."
    },
    {
      q: "What is the difference between 'int **ptr' and 'int *ptr[5]' for dynamic allocation?",
      a: "'int *ptr[5]' declares a static array of 5 pointers on stack - fixed size, automatic cleanup. 'int **ptr' can point to dynamically allocated array of pointers - flexible size. For dynamic 2D arrays, you typically use 'int **ptr' and allocate both the pointer array and rows. 'int *ptr[5]' can still point to dynamically allocated rows: 'ptr[0] = (int*)malloc(10*sizeof(int));' - the pointer array is static but rows are dynamic."
    },
    {
      q: "How do you handle memory allocation failures in 2D arrays gracefully?",
      a: "Implement a cleanup function: 'void cleanup2D(int **matrix, int allocatedRows) { for(int i=0; i<allocatedRows; i++) free(matrix[i]); free(matrix); }'. When a row allocation fails, call cleanup with rows allocated so far. Return NULL to indicate failure. Caller checks for NULL. This prevents memory leaks and ensures graceful degradation. Example: 'if(matrix[i]==NULL) { cleanup2D(matrix, i); return NULL; }'"
    },
    {
      q: "Can you use calloc with double pointers for 2D arrays?",
      a: "Yes, calloc initializes allocated memory to zero. For row pointers: 'int **matrix = (int**)calloc(rows, sizeof(int*));' (all pointers NULL). For rows: 'matrix[i] = (int*)calloc(cols, sizeof(int));' (all elements zero). calloc is safer for initial allocation as it eliminates garbage values. However, calloc may be slightly slower than malloc+manual initialization due to zeroing overhead."
    },
    {
      q: "What are the performance implications of non-contiguous memory in double pointer 2D arrays?",
      a: "Non-contiguous memory can cause poor cache locality and TLB misses. Accessing matrix[i][j] requires two memory accesses: one for row pointer, one for element. Iterating column-wise (changing row in inner loop) is particularly slow. For performance-critical code, consider single contiguous allocation: 'int *data = (int*)malloc(rows*cols*sizeof(int));' and access with data[i*cols + j]. This gives contiguous memory and better cache performance."
    },
    {
      q: "How do you implement a generic dynamic array using double pointers?",
      a: "Use void pointers: 'void **dynamicArray;'. Allocate: 'dynamicArray = (void**)malloc(initialCapacity * sizeof(void*));'. Store any type: 'dynamicArray[index] = (void*)&value;'. Track size and capacity. For resizing: 'dynamicArray = (void**)realloc(dynamicArray, newCapacity * sizeof(void*));'. This is how many generic container libraries implement dynamic arrays in C. However, type safety is lost - caller must cast back appropriately."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold mb-4">
            Topic 4
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white bg-clip-text text-transparent mb-4">
            Dynamic Memory Allocation Using Double Pointers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mastering dynamic 2D arrays, flexible data structures, and memory management with double pointers
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
                  ? "bg-purple-600 text-white shadow-lg scale-105"
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
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center text-2xl">
                    🗂️
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Why Double Pointers for Dynamic Allocation?
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Double pointers are crucial when a function needs to allocate memory and modify the original pointer variable 
                  in the caller. Since C passes parameters by value, a single pointer parameter only allows modifying the pointed-to data, 
                  not the pointer itself. Double pointers (<span className="font-mono font-bold text-purple-600 dark:text-purple-400">int **ptr</span>) 
                  enable functions to change where the original pointer points.
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">🎯 Key Insight:</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    When Tuhina from Naihati CNAT needs a function to create a 2D array and return it, passing <span className="font-mono">int **matrix</span> 
                    allows the function to modify the original pointer. Think of it as giving someone your address book's location 
                    (double pointer) so they can replace the entire address book, rather than just changing an address in it!
                  </p>
                </div>
              </div>
            </div>

            {/* Memory Layout SVG for Dynamic 2D Array */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center text-2xl">
                    📐
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Dynamic 2D Array Memory Layout
                  </h2>
                </div>

                {/* SVG Memory Diagram */}
                <div className="mb-8 overflow-x-auto">
                  <svg viewBox="0 0 1000 500" className="w-full max-w-5xl mx-auto" style={{ maxWidth: '100%', height: 'auto' }}>
                    <defs>
                      <linearGradient id="ptrArrayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 0.4 }} />
                      </linearGradient>
                      <linearGradient id="rowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 0.4 }} />
                      </linearGradient>
                      <marker id="arrowPurple" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#8B5CF6" />
                      </marker>
                    </defs>

                    {/* Main double pointer */}
                    <rect x="50" y="60" width="180" height="50" rx="8" fill="#E9D5FF" stroke="#8B5CF6" strokeWidth="2" />
                    <text x="140" y="90" textAnchor="middle" fill="#4C1D95" fontSize="14" fontWeight="bold">matrix (int**)</text>
                    <text x="250" y="90" fill="#6B7280" fontSize="12">Address: 0x1000</text>

                    {/* Arrow to pointer array */}
                    <line x1="230" y1="85" x2="290" y2="85" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowPurple)" strokeDasharray="5,3">
                      <animate attributeName="stroke-dashoffset" values="0;8" dur="1s" repeatCount="indefinite" />
                    </line>

                    {/* Array of row pointers */}
                    <rect x="300" y="60" width="280" height="130" rx="8" fill="url(#ptrArrayGrad)" stroke="#8B5CF6" strokeWidth="2" />
                    <text x="440" y="85" textAnchor="middle" fill="#4C1D95" fontSize="13" fontWeight="bold">Row Pointer Array</text>
                    
                    <rect x="320" y="100" width="220" height="30" rx="4" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1.5" />
                    <text x="430" y="120" textAnchor="middle" fill="#4C1D95" fontSize="12">matrix[0] → 0x2000</text>
                    
                    <rect x="320" y="135" width="220" height="30" rx="4" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1.5" />
                    <text x="430" y="155" textAnchor="middle" fill="#4C1D95" fontSize="12">matrix[1] → 0x2100</text>
                    
                    <rect x="320" y="170" width="220" height="30" rx="4" fill="#DDD6FE" stroke="#8B5CF6" strokeWidth="1.5" />
                    <text x="430" y="190" textAnchor="middle" fill="#4C1D95" fontSize="12">matrix[2] → 0x2200</text>

                    {/* Arrows to actual rows */}
                    <line x1="540" y1="115" x2="620" y2="115" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,3" />
                    <line x1="540" y1="150" x2="620" y2="150" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,3" />
                    <line x1="540" y1="185" x2="620" y2="185" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3,3" />

                    {/* Row 0 */}
                    <rect x="630" y="60" width="250" height="80" rx="8" fill="url(#rowGrad)" stroke="#3B82F6" strokeWidth="2" />
                    <text x="755" y="85" textAnchor="middle" fill="#1E3A8A" fontSize="12" fontWeight="bold">Row 0 (4 ints)</text>
                    <rect x="650" y="95" width="40" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                    <text x="670" y="112" textAnchor="middle" fill="#1E3A8A" fontSize="11">10</text>
                    <rect x="695" y="95" width="40" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                    <text x="715" y="112" textAnchor="middle" fill="#1E3A8A" fontSize="11">20</text>
                    <rect x="740" y="95" width="40" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                    <text x="760" y="112" textAnchor="middle" fill="#1E3A8A" fontSize="11">30</text>
                    <rect x="785" y="95" width="40" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                    <text x="805" y="112" textAnchor="middle" fill="#1E3A8A" fontSize="11">40</text>

                    {/* Row 1 */}
                    <rect x="630" y="155" width="250" height="80" rx="8" fill="url(#rowGrad)" stroke="#3B82F6" strokeWidth="2" />
                    <text x="755" y="180" textAnchor="middle" fill="#1E3A8A" fontSize="12" fontWeight="bold">Row 1 (4 ints)</text>
                    <rect x="650" y="190" width="40" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                    <text x="670" y="207" textAnchor="middle" fill="#1E3A8A" fontSize="11">50</text>
                    <rect x="695" y="190" width="40" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                    <text x="715" y="207" textAnchor="middle" fill="#1E3A8A" fontSize="11">60</text>
                    <rect x="740" y="190" width="40" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                    <text x="760" y="207" textAnchor="middle" fill="#1E3A8A" fontSize="11">70</text>
                    <rect x="785" y="190" width="40" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                    <text x="805" y="207" textAnchor="middle" fill="#1E3A8A" fontSize="11">80</text>

                    {/* Legend */}
                    <g transform="translate(50, 280)">
                      <rect x="0" y="0" width="500" height="90" rx="8" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
                      <text x="250" y="25" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">Memory Layout Legend</text>
                      <rect x="20" y="40" width="14" height="14" rx="3" fill="#E9D5FF" stroke="#8B5CF6" />
                      <text x="45" y="52" fill="#4B5563" fontSize="12">Double Pointer (int**)</text>
                      <rect x="220" y="40" width="14" height="14" rx="3" fill="#DDD6FE" stroke="#8B5CF6" />
                      <text x="245" y="52" fill="#4B5563" fontSize="12">Row Pointer Array</text>
                      <rect x="400" y="40" width="14" height="14" rx="3" fill="#DBEAFE" stroke="#3B82F6" />
                      <text x="425" y="52" fill="#4B5563" fontSize="12">Actual Row Data</text>
                      <text x="20" y="78" fill="#6B7280" fontSize="11">Non-contiguous memory - each row allocated separately</text>
                    </g>
                  </svg>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-3">📝 Allocation Steps</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 font-mono text-sm">
                      <li className="flex items-start gap-2"><span className="text-blue-500">1.</span> int **matrix = malloc(rows * sizeof(int*));</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">2.</span> for(i = 0; i &lt; rows; i++)</li>
                      <li className="flex items-start gap-2 pl-6">matrix[i] = malloc(cols * sizeof(int));</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">3.</span> Access: matrix[row][col] = value;</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-5 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="font-bold text-lg text-green-800 dark:text-green-300 mb-3">🗑️ Freeing Steps (Reverse Order!)</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 font-mono text-sm">
                      <li className="flex items-start gap-2"><span className="text-green-500">1.</span> for(i = 0; i &lt; rows; i++)</li>
                      <li className="flex items-start gap-2 pl-6">free(matrix[i]);</li>
                      <li className="flex items-start gap-2"><span className="text-green-500">2.</span> free(matrix);</li>
                      <li className="flex items-start gap-2"><span className="text-green-500">3.</span> matrix = NULL;</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Examples */}
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
                    title="Example 1: Basic Dynamic 2D Array Allocation and Deallocation"
                    initialCode={example1Code}
                  />

                  <EditableCCodeBlock
                    title="Example 2: Function That Allocates 2D Array Using Double Pointer"
                    initialCode={example2Code}
                  />

                  <EditableCCodeBlock
                    title="Example 3: Jagged Arrays (Rows with Different Lengths)"
                    initialCode={example3Code}
                  />

                  <EditableCCodeBlock
                    title="Example 4: Resizing Dynamic 2D Array with realloc"
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
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Forgetting to allocate row pointers before allocating rows</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Freeing only the main pointer (causes massive memory leaks!)</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Not checking malloc return value for NULL</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Mixing up rows and columns in allocation loops</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Using sizeof(int) instead of sizeof(int*) for row pointers</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">💭 Memory Leak Scenarios</h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Losing the main pointer before freeing rows</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Reassigning matrix without freeing</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Early return without cleanup after partial allocation</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Forgetting to free when reallocating rows</li>
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
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">1.</span> Always check return value of malloc/calloc/realloc before using</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">2.</span> Implement cleanup functions for 2D arrays to prevent leaks</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">3.</span> Free in reverse order of allocation (rows first, then pointer array)</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">4.</span> Set pointers to NULL after freeing to prevent dangling pointers</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">5.</span> For performance-critical code, consider single contiguous allocation</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">6.</span> Use calloc instead of malloc when zero-initialization is needed</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">7.</span> Document that caller is responsible for freeing returned 2D arrays</li>
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
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Performance Optimization:</span> For better cache locality, allocate a single contiguous block: <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">int *data = malloc(rows * cols * sizeof(int)); int **matrix = malloc(rows * sizeof(int*)); for(i=0;i&lt;rows;i++) matrix[i] = data + i*cols;</code></p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Debugging Helper:</span> Create a print function that shows memory addresses of each row to verify non-contiguous layout</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Memory Pool Pattern:</span> For many small allocations, use a memory pool to reduce malloc overhead and fragmentation</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Safe Wrapper:</span> Create <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">safe_malloc_2d()</code> that handles all error checking and cleanup internally</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Valgrind:</span> Always test dynamic allocations with Valgrind to catch leaks: <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">valgrind --leak-check=full ./program</code></p>
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
                    <span className="text-gray-700 dark:text-gray-300">I understand why double pointers are needed for allocation functions</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can allocate and free dynamic 2D arrays correctly</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I always check malloc return value for NULL</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I understand jagged arrays and their use cases</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I know how to reallocate memory for dynamic 2D arrays</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can implement error cleanup for partial allocations</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
              <Teacher note="Dynamic 2D arrays are where students finally understand why double pointers exist. When Debolina asked 'Why can't I just return a local array from a function?', I showed her how stack memory disappears after function returns. The key insight: draw the memory diagram with boxes for row pointers and separate boxes for each row. I tell my students at Barrackpore CNAT: 'Free in reverse - what you allocated last, free first!' Practice with small matrices (3x4) and trace every malloc and free with printf." />
            </div>

            {/* Hint Section */}
            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-700 animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤔</span>
                <h3 className="font-bold text-gray-800 dark:text-white">Think About This...</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "What happens if you call <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">free(matrix);</code> before freeing the individual rows? 
                Try writing a program that makes this mistake and run it with Valgrind. 
                Observe carefully: where did the memory for each row go? Can you ever free it after losing the row pointers?"
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
                    <span className="text-purple-600 dark:text-purple-400 mr-3">Q{idx + 1}:</span>
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

export default Topic4;