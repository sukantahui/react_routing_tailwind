import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

// Import C code files
import example1Code from "./topic1_files/example1.c?raw";
import example2Code from "./topic1_files/example2.c?raw";
import example3Code from "./topic1_files/example3.c?raw";
import example4Code from "./topic1_files/example4.c?raw";

const Topic1 = () => {
  const [activeTab, setActiveTab] = useState('concept');

  // Questions and Answers
  const qaData = [
    {
      q: "What is a pointer to pointer (double pointer) in C?",
      a: "A pointer to pointer, also known as a double pointer, is a pointer that stores the address of another pointer variable. It is declared using two asterisks (**). For example, 'int **ptr;' declares a double pointer that can point to an integer pointer. Double pointers are essential for modifying pointer arguments in functions, creating dynamic 2D arrays, and building complex data structures like linked lists where the head pointer needs to be modified."
    },
    {
      q: "How do you declare and initialize a double pointer?",
      a: "Double pointers are declared with two asterisks: 'int **double_ptr;'. Initialization can be done in steps: first declare a regular pointer 'int *ptr = &var;', then point the double pointer to it: 'int **double_ptr = &ptr;'. You can also allocate memory directly: 'int **double_ptr = malloc(sizeof(int*));' which allocates space for a pointer, then '*double_ptr = malloc(sizeof(int));' to allocate space for the actual integer."
    },
    {
      q: "What is the syntax for accessing values through a double pointer?",
      a: "To access the original value through a double pointer, you need to dereference twice: '**double_ptr'. The first dereference (*double_ptr) gives you the single pointer (address), and the second dereference (**double_ptr) gives you the actual value. For example, if 'int var = 42; int *ptr = &var; int **dptr = &ptr;', then '**dptr' equals 42."
    },
    {
      q: "Why are double pointers needed when modifying a pointer in a function?",
      a: "In C, function parameters are passed by value. When you pass a pointer to a function, the function receives a copy of the pointer. If you want to modify the original pointer itself (not just the data it points to), you need to pass a pointer to that pointer (double pointer). This allows the function to change where the original pointer points, such as allocating new memory or setting it to NULL."
    },
    {
      q: "How are double pointers used in dynamic 2D array allocation?",
      a: "Double pointers are commonly used to create dynamic 2D arrays: 'int **matrix = (int**)malloc(rows * sizeof(int*));' allocates an array of row pointers. Then for each row, you allocate columns: 'for(int i = 0; i < rows; i++) matrix[i] = (int*)malloc(cols * sizeof(int));'. This creates a jagged array where each row can have different column sizes, and memory is contiguous per row but not necessarily between rows."
    },
    {
      q: "What is the difference between 'int *ptr[5]' and 'int **ptr'?",
      a: "'int *ptr[5]' is an array of 5 integer pointers - it allocates space for 5 pointers on the stack (if local) or in static memory. 'int **ptr' is a pointer to a pointer - it's a single variable that can point to a pointer. While 'int **ptr' can be used to point to the first element of 'int *ptr[5]' (array decays to pointer), they are not the same. The array has fixed size, while the double pointer can point to dynamically allocated memory."
    },
    {
      q: "How do you properly free memory allocated with double pointers for 2D arrays?",
      a: "Freeing a dynamic 2D array requires freeing in reverse order of allocation. First free each row: 'for(int i = 0; i < rows; i++) free(matrix[i]);' then free the array of row pointers: 'free(matrix);'. Always set the double pointer to NULL after freeing to prevent dangling pointers. Forgetting to free individual rows before freeing the main pointer causes memory leaks."
    },
    {
      q: "Can you have triple pointers or higher levels of indirection?",
      a: "Yes, C supports multiple levels of indirection: triple pointers (***), quadruple pointers (****), and beyond. Each asterisk adds another level of indirection. For example, 'int ***triple;' points to a pointer that points to a pointer that points to an integer. While technically possible, more than double pointers are rarely needed and make code harder to understand. Triple pointers might appear in 3D dynamic arrays or specific data structures."
    },
    {
      q: "What happens in memory when you have a double pointer?",
      a: "In memory, a double pointer occupies the same size as any other pointer (8 bytes on 64-bit systems). It stores the address of another pointer variable. For example, if 'int var = 42' at address 0x1000, 'int *ptr = &var' at address 0x2000 storing 0x1000, then 'int **dptr = &ptr' at address 0x3000 storing 0x2000. Dereferencing dptr gives 0x2000 (address of ptr), double dereferencing gives 0x1000 (address of var), triple dereferencing would give 42."
    },
    {
      q: "How do you pass a double pointer to a function to modify the original pointer?",
      a: "To modify a pointer in a function, you pass a double pointer: 'void modifyPointer(int **ptr) { *ptr = malloc(sizeof(int)); **ptr = 100; }'. In main: 'int *ptr = NULL; modifyPointer(&ptr);' Now ptr points to allocated memory containing 100. This pattern is common in functions that need to allocate memory and return it through parameters, or functions that need to set a pointer to NULL after freeing."
    },
    {
      q: "What is a common use case for double pointers with command line arguments?",
      a: "The main function's second parameter 'char *argv[]' or 'char **argv' is a double pointer. It represents an array of strings (command line arguments). 'argc' tells how many arguments, and 'argv[0]' is the program name, 'argv[1]' is the first argument, etc. Each 'argv[i]' is a pointer to a character string. This allows processing variable numbers of command line arguments efficiently."
    },
    {
      q: "How do double pointers help with creating linked list insert functions?",
      a: "In linked lists, when inserting at the beginning, you need to modify the head pointer. Using a double pointer allows the insert function to update the head: 'void insertAtHead(Node **head, int data) { Node *newNode = malloc(sizeof(Node)); newNode->data = data; newNode->next = *head; *head = newNode; }'. This modifies the original head pointer in main. Without double pointers, you'd need to return the new head or use a global variable."
    },
    {
      q: "What is pointer arithmetic with double pointers?",
      a: "Pointer arithmetic with double pointers works similarly to single pointers but with step size of pointer size (8 bytes on 64-bit). If 'int **dptr' points to an array of integer pointers, 'dptr + 1' moves to the next pointer in the array (advances by sizeof(int*) bytes). '*(dptr + 1)' gives the pointer at that position, and '**(dptr + 1)' gives the integer value pointed to by that pointer."
    },
    {
      q: "How do you create a function that returns a double pointer?",
      a: "A function returning a double pointer is declared with the return type having two asterisks: 'int** createMatrix(int rows, int cols)'. Inside, you allocate memory and return the double pointer. Remember that returning a pointer to local variable is dangerous, but returning dynamically allocated memory is fine. The caller becomes responsible for freeing the memory: 'int **matrix = createMatrix(3, 4);' then later 'freeMatrix(matrix, 3);'."
    },
    {
      q: "What are the common pitfalls when working with double pointers?",
      a: "Common pitfalls include: forgetting to allocate memory for the row pointers before allocating columns; improper freeing (freeing only the main pointer causes memory leaks); incorrect dereferencing levels; passing a single pointer when a double pointer is expected; assuming 'sizeof(**ptr)' works when 'ptr' is NULL; and confusing 'int* ptr' with 'int** ptr' in function parameters. Always draw memory diagrams and use tools like Valgrind."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section with Animation */}
        <div className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold mb-4">
            Topic 1
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white bg-clip-text text-transparent mb-4">
            Pointers to Pointers (Double Pointers)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding indirection: how to point to pointers, modify pointer arguments, and build dynamic 2D structures
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
                    🎯
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    What Are Double Pointers?
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  A <span className="font-mono font-bold text-purple-600 dark:text-purple-400">pointer to pointer</span> or 
                  <span className="font-mono font-bold text-purple-600 dark:text-purple-400"> double pointer</span> is a variable 
                  that stores the memory address of another pointer variable. Declared with two asterisks (<span className="font-mono font-bold">**</span>), 
                  it adds another level of indirection to your programs.
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">💡 Real-World Analogy:</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Imagine a library. A book has a shelf number (address). A catalog card points to that shelf number (single pointer). 
                    Now, a master catalog index points to where the catalog cards are stored (double pointer!). 
                    When Debolina from Naihati CNAT wants to find a book, she follows the master index → finds the catalog card → finds the shelf → gets the book!
                  </p>
                </div>
              </div>
            </div>

            {/* Memory Representation SVG */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center text-2xl">
                    🗺️
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Memory Representation
                  </h2>
                </div>
                
                {/* SVG Memory Diagram */}
                <div className="mb-8 overflow-x-auto">
                  <svg viewBox="0 0 900 400" className="w-full max-w-5xl mx-auto" style={{ maxWidth: '100%', height: 'auto' }}>
                    <defs>
                      <linearGradient id="varGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#EF4444', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#DC2626', stopOpacity: 0.9 }} />
                      </linearGradient>
                      <linearGradient id="ptrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 0.9 }} />
                      </linearGradient>
                      <linearGradient id="dptrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 0.9 }} />
                      </linearGradient>
                      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2" />
                      </filter>
                    </defs>
                    
                    {/* Memory cells */}
                    <g transform="translate(50, 60)">
                      {/* Variable */}
                      <rect x="0" y="0" width="200" height="70" rx="8" fill="url(#varGrad)" filter="url(#shadow)">
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
                      </rect>
                      <text x="100" y="30" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">var (int)</text>
                      <text x="100" y="55" textAnchor="middle" fill="#FEE2E2" fontSize="16" fontWeight="bold">Value: 42</text>
                      <text x="220" y="35" fill="#6B7280" fontSize="12">Address: 0x1000</text>
                      
                      {/* Arrow from var to pointer */}
                      <line x1="200" y1="35" x2="280" y2="35" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowBlue)" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                      </line>
                      
                      {/* Single Pointer */}
                      <rect x="290" y="0" width="200" height="70" rx="8" fill="url(#ptrGrad)" filter="url(#shadow)">
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" begin="0.5s" repeatCount="indefinite" />
                      </rect>
                      <text x="390" y="30" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">ptr (int*)</text>
                      <text x="390" y="55" textAnchor="middle" fill="#DBEAFE" fontSize="14" fontWeight="bold">Value: 0x1000</text>
                      <text x="510" y="35" fill="#6B7280" fontSize="12">Address: 0x2000</text>
                      
                      {/* Arrow from ptr to double pointer */}
                      <line x1="490" y1="35" x2="570" y2="35" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" begin="0.5s" repeatCount="indefinite" />
                      </line>
                      
                      {/* Double Pointer */}
                      <rect x="580" y="0" width="220" height="70" rx="8" fill="url(#dptrGrad)" filter="url(#shadow)">
                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" begin="1s" repeatCount="indefinite" />
                      </rect>
                      <text x="690" y="30" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">dptr (int**)</text>
                      <text x="690" y="55" textAnchor="middle" fill="#E9D5FF" fontSize="14" fontWeight="bold">Value: 0x2000</text>
                      <text x="815" y="35" fill="#6B7280" fontSize="12">Address: 0x3000</text>
                    </g>
                    
                    {/* Indirection chain */}
                    <g transform="translate(50, 200)">
                      <text x="100" y="20" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold">Indirection Chain:</text>
                      
                      <rect x="20" y="40" width="120" height="50" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
                      <text x="80" y="70" textAnchor="middle" fill="#991B1B" fontSize="13" fontWeight="bold">dptr</text>
                      
                      <text x="160" y="70" textAnchor="middle" fill="#6B7280" fontSize="20">→</text>
                      
                      <rect x="190" y="40" width="120" height="50" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
                      <text x="250" y="70" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="bold">ptr</text>
                      
                      <text x="330" y="70" textAnchor="middle" fill="#6B7280" fontSize="20">→</text>
                      
                      <rect x="360" y="40" width="120" height="50" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
                      <text x="420" y="70" textAnchor="middle" fill="#991B1B" fontSize="13" fontWeight="bold">var</text>
                      
                      <text x="520" y="70" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold">= 42</text>
                    </g>
                    
                    {/* Legend */}
                    <g transform="translate(50, 300)">
                      <rect x="0" y="0" width="12" height="12" rx="2" fill="#EF4444" />
                      <text x="20" y="11" fill="#6B7280" fontSize="12">Variable (int)</text>
                      
                      <rect x="150" y="0" width="12" height="12" rx="2" fill="#3B82F6" />
                      <text x="170" y="11" fill="#6B7280" fontSize="12">Single Pointer (int*)</text>
                      
                      <rect x="340" y="0" width="12" height="12" rx="2" fill="#8B5CF6" />
                      <text x="360" y="11" fill="#6B7280" fontSize="12">Double Pointer (int**)</text>
                    </g>
                  </svg>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-3">📝 Declaration & Dereferencing</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 font-mono text-sm">
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> int var = 42;</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> int *ptr = &amp;var;</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> int **dptr = &amp;ptr;</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500 mt-2">•</span> *ptr = 42 (access value)</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> *dptr → ptr's address</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500">•</span> **dptr → var's value (42)</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-5 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h3 className="font-bold text-lg text-purple-800 dark:text-purple-300 mb-3">🔧 Common Use Cases</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Modifying pointer in functions</li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Dynamic 2D arrays</li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Linked list head modification</li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Command-line arguments (argv)</li>
                      <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Array of strings</li>
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
                    title="Example 1: Basic Double Pointer Declaration and Usage"
                    initialCode={example1Code}
                  />
                  
                  <EditableCCodeBlock
                    title="Example 2: Modifying Pointer in Function Using Double Pointer"
                    initialCode={example2Code}
                  />
                  
                  <EditableCCodeBlock
                    title="Example 3: Dynamic 2D Array with Double Pointers"
                    initialCode={example3Code}
                  />
                  
                  <EditableCCodeBlock
                    title="Example 4: Double Pointers with Command Line Arguments"
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
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Incorrect dereferencing levels (* vs **)</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Forgetting to allocate row pointers before columns</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Memory leak from improper freeing order</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Passing single pointer when double pointer expected</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> Assuming sizeof(**ptr) works when ptr is NULL</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400 mb-3">💭 Misconceptions</h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "Double pointers are always 2D arrays" - Not true!</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "**ptr is same as *ptr[0]" - Different semantics</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "Double pointers are slower" - Negligible difference</li>
                      <li className="flex items-start gap-2"><span className="text-red-500">•</span> "Can't have triple pointers" - Yes, you can!</li>
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
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">1.</span> Always initialize double pointers to <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">NULL</code></li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">2.</span> Check return value of malloc/calloc before using double pointer</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">3.</span> Free in reverse order of allocation (rows first, then main pointer)</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">4.</span> Use meaningful names: <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">matrix</code>, <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">headPtr</code>, <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">argv</code></li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">5.</span> Document pointer ownership and responsibility for freeing</li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">6.</span> Use <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">const</code> when appropriate: <code className="bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded">const int **ptr</code></li>
                  <li className="flex items-start gap-3"><span className="text-green-600 font-bold text-lg">7.</span> Draw memory diagrams for complex double pointer usage</li>
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
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Debugging:</span> Print addresses at each level: <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">printf("var: %p, ptr: %p, dptr: %p\n", &var, ptr, dptr)</code></p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Performance:</span> For large 2D arrays, consider single allocation with <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">int *data = malloc(rows * cols * sizeof(int))</code> plus index calculation for better cache locality</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Memory Layout:</span> Use <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">sizeof(int*)</code> to understand pointer size on your system</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Safe Coding:</span> Create wrapper functions: <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">int** allocate2D(int rows, int cols)</code> and <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">void free2D(int** matrix, int rows)</code></p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">💎 Advanced:</span> Triple pointers (<code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">int***</code>) for 3D arrays or modifying double pointers in functions</p>
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
                    <span className="text-gray-700 dark:text-gray-300">I understand what a double pointer is and when to use it</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can declare, initialize, and dereference double pointers correctly</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I know how to modify a pointer in a function using double pointers</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can allocate and free dynamic 2D arrays using double pointers</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I understand the memory layout of double pointers</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                    <span className="text-gray-700 dark:text-gray-300">I can avoid common pitfalls like memory leaks and improper dereferencing</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-[fadeInUp_0.6s_ease-out_0.7s_both]">
              <Teacher note="Double pointers are like Russian nesting dolls for memory addresses! Remember: each star (*) is a level of indirection. When Abhronila asks 'Why can't I modify the head pointer in my linked list?', the answer is always double pointers! Practice drawing the memory diagram I showed you - it's the key to understanding. Start with 2D arrays - it's the most common real-world use case. And always, always free in reverse order of allocation. Trust me, Ritaja from Barrackpore CNAT learned this the hard way with a memory leak that took 3 days to find!" />
            </div>

            {/* Hint Section */}
            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-300 dark:border-gray-700 animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤔</span>
                <h3 className="font-bold text-gray-800 dark:text-white">Think About This...</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Why does <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`void modify(int *ptr) { ptr = malloc(sizeof(int)); }</code> not work in main, but 
                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">void modify(int **ptr) { *ptr = malloc(sizeof(int)); }`}</code> does? Try tracing the memory addresses..."
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

export default Topic1;