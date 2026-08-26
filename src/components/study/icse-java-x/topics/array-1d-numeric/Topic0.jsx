import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

// SVG Components for Memory Representation
const MemoryStackSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto max-w-md mx-auto my-4" aria-label="Memory Stack and Heap Diagram">
    <defs>
      <linearGradient id="stackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
        <stop offset="100%" style={{ stopColor: '#1e3a8a', stopOpacity: 0.4 }} />
      </linearGradient>
      <linearGradient id="heapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.2 }} />
        <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 0.4 }} />
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    
    {/* Stack Frame */}
    <rect x="50" y="50" width="120" height="200" rx="8" fill="url(#stackGrad)" stroke="#3b82f6" strokeWidth="2" filter="url(#shadow)" />
    <text x="110" y="30" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="14">Stack Memory</text>
    <text x="110" y="75" textAnchor="middle" fill="#1e293b" fontSize="12">main()</text>
    <line x1="60" y1="85" x2="160" y2="85" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
    <text x="110" y="105" textAnchor="middle" fill="#1e293b" fontSize="11">arr (reference)</text>
    <text x="110" y="120" textAnchor="middle" fill="#1e293b" fontSize="11">↓ 0x1A2B</text>
    
    {/* Heap Array */}
    <rect x="230" y="80" width="150" height="160" rx="8" fill="url(#heapGrad)" stroke="#10b981" strokeWidth="2" filter="url(#shadow)" />
    <text x="305" y="65" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="14">Heap Memory</text>
    
    {/* Array Cells */}
    <rect x="245" y="90" width="30" height="30" rx="4" fill="#ffffff" stroke="#047857" strokeWidth="1.5" />
    <text x="260" y="110" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">10</text>
    <text x="260" y="135" textAnchor="middle" fill="#047857" fontSize="9">index 0</text>
    
    <rect x="285" y="90" width="30" height="30" rx="4" fill="#ffffff" stroke="#047857" strokeWidth="1.5" />
    <text x="300" y="110" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">20</text>
    <text x="300" y="135" textAnchor="middle" fill="#047857" fontSize="9">index 1</text>
    
    <rect x="325" y="90" width="30" height="30" rx="4" fill="#ffffff" stroke="#047857" strokeWidth="1.5" />
    <text x="340" y="110" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">30</text>
    <text x="340" y="135" textAnchor="middle" fill="#047857" fontSize="9">index 2</text>
    
    {/* Address Arrow */}
    <path d="M 170 110 L 240 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)" />
    <text x="205" y="100" textAnchor="middle" fill="#f59e0b" fontSize="10">reference</text>
    
    <text x="305" y="175" textAnchor="middle" fill="#047857" fontSize="11">Contiguous Memory</text>
    <text x="305" y="195" textAnchor="middle" fill="#047857" fontSize="10">Address: 0x1A2B</text>
    <text x="305" y="215" textAnchor="middle" fill="#047857" fontSize="10">Size: 3 elements</text>
    
    {/* Cell Highlight Animation */}
    <rect x="245" y="90" width="30" height="30" rx="4" fill="none" stroke="#f59e0b" strokeWidth="2">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
    </rect>
  </svg>
);

const ArrayIndexSVG = () => (
  <svg viewBox="0 0 500 120" className="w-full h-auto max-w-2xl mx-auto my-4" aria-label="Array Index Representation">
    <g transform="translate(50, 20)">
      {[0, 1, 2, 3, 4].map((i, idx) => (
        <g key={idx} transform={`translate(${idx * 80}, 0)`}>
          <rect x="0" y="20" width="70" height="50" rx="6" fill="#ffffff" stroke="#6366f1" strokeWidth="2" className="transition-all duration-300 hover:stroke-indigo-500 hover:shadow-lg" />
          <text x="35" y="45" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">{(idx + 1) * 10}</text>
          <text x="35" y="85" textAnchor="middle" fill="#64748b" fontSize="12">index [{idx}]</text>
          <text x="35" y="100" textAnchor="middle" fill="#94a3b8" fontSize="10">offset {idx * 4}</text>
          
          {/* Address line */}
          <line x1="35" y1="70" x2="35" y2="20" stroke="#cbd5e1" strokeWidth="1" />
        </g>
      ))}
    </g>
  </svg>
);

const Topic0 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Arrays in Java: Concept & Memory Representation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Understanding how arrays store data in contiguous memory locations and their representation in Java
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          {['theory', 'visual', 'code', 'practice'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              className={clsx(
                "px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-300",
                activeSection === tab
                  ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Theory Section */}
          {activeSection === 'theory' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              {/* Concept Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  What is an Array?
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    An array is a <strong className="text-indigo-600 dark:text-indigo-400">container object</strong> that holds a <strong className="text-indigo-600 dark:text-indigo-400">fixed number of values</strong> of a <strong className="text-indigo-600 dark:text-indigo-400">single data type</strong>. Think of it as a row of numbered lockers where each locker can store one item, and all lockers are the same size.
                  </p>
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-indigo-800 dark:text-indigo-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">type[] arrayName;</code><br />
                      <strong>Return Type:</strong> Reference to array object<br />
                      <strong>Purpose:</strong> Store multiple values under single variable name
                    </p>
                  </div>
                </div>
              </div>

              {/* Memory Representation Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <span className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  Memory Representation
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Arrays in Java are stored in <strong className="text-green-600 dark:text-green-400">Heap Memory</strong>. The array variable (reference) is stored in Stack memory and points to the actual array object in Heap.
                  </p>
                  <MemoryStackSVG />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Stack Memory</h3>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>Stores reference variables</li>
                        <li>Holds memory address of array</li>
                        <li>Size: 8 bytes (reference)</li>
                        <li>Automatically managed</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Heap Memory</h3>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>Stores actual array data</li>
                        <li>Contiguous memory blocks</li>
                        <li>Fixed size after creation</li>
                        <li>Garbage collected</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indexing Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Indexing in Arrays</h2>
                <ArrayIndexSVG />
                <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>💡 Important:</strong> Array indices always start from <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">0</code>. The last index is <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">length - 1</code>.
                  </p>
                </div>
              </div>

              {/* Real World Example Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Example</h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p><strong>School Roll Numbers:</strong> A teacher like Sukanta Hui maintains a list of 30 students in a class - each student has a unique roll number (0-29).</p>
                  <p><strong>Barrackpore Train Schedule:</strong> A train's timetable has 10 stations, each at a specific index position in the schedule array.</p>
                  <p><strong>Game High Scores:</strong> A mobile game stores top 5 scores in an array, with index 0 being the highest.</p>
                </div>
              </div>

              <Teacher note="Arrays are fundamental building blocks in Java. Remember: They're zero-indexed, fixed-size, and store homogeneous data. The memory is contiguous, which makes access O(1) - lightning fast! Always visualize arrays as connected boxes in memory." />
            </div>
          )}

          {/* Visual Section */}
          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📊 Visual Memory Map</h2>
                <MemoryStackSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  The reference variable 'arr' in stack points to the actual array object in heap memory
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🔍 Index Calculation</h2>
                <ArrayIndexSVG />
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {[
                    { formula: "Base Address", value: "0x1A2B", desc: "Starting memory location" },
                    { formula: "Element Address", value: "Base + (index × element_size)", desc: "Address of any element" },
                    { formula: "Size Calculation", value: "length × element_size", desc: "Total memory occupied" },
                    { formula: "Time Complexity", value: "O(1) access", desc: "Constant time for any index" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg flex justify-between items-center group hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300">
                      <span className="font-mono text-sm font-semibold text-gray-700 dark:text-gray-300">{item.formula}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Teacher note="When explaining memory representation, use the analogy of a apartment building: The reference is the address, heap is the building, and indices are floor numbers. Each floor has the same 'size' apartment!" />
            </div>
          )}

          {/* Code Section */}
          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Basic Array Declaration</h3>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`// Declaration and memory allocation
int[] marks;           // Declaration (reference created in stack)
marks = new int[5];    // Allocation (array created in heap)

// Combined form
int[] scores = new int[10];

// Array literal (compile-time initialization)
int[] numbers = {10, 20, 30, 40, 50};`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Memory Access Example</h3>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`public class MemoryDemo {
    public static void main(String[] args) {
        int[] arr = new int[3];  // Reference 'arr' in stack, array in heap
        
        arr[0] = 100;  // Store 100 at offset 0
        arr[1] = 200;  // Store 200 at offset 1  
        arr[2] = 300;  // Store 300 at offset 2
        
        // Access: arr[1] -> base address + (1 * 4) bytes
        System.out.println(arr[1]);  // Output: 200
    }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <Teacher note="Always remember: new keyword is the bridge between declaration (stack) and actual memory allocation (heap). Without new, you only have a reference pointing to null!" />
            </div>
          )}

          {/* Practice Section */}
          {activeSection === 'practice' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🎯 Questions & Answers</h2>
                <div className="space-y-4">
                  {qaData.map((qa, idx) => (
                    <details key={idx} className="group border border-gray-200 dark:border-gray-700 rounded-lg">
                      <summary className="cursor-pointer p-4 font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        {qa.question}
                      </summary>
                      <div className="p-4 pt-0 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                        {qa.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              <Teacher note="Practice these questions until you can visualize the memory layout. Draw diagrams for each array operation - it's the best way to truly understand how arrays work in Java!" />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
        
        details summary::-webkit-details-marker {
          display: none;
        }
        
        details summary {
          list-style: none;
        }
      `}</style>
    </div>
  );
};

const qaData = [
  {
    question: "What is an array in Java?",
    answer: "An array is a container object that holds a fixed number of values of a single data type. Arrays are stored in contiguous memory locations and provide O(1) access time."
  },
  {
    question: "Where are arrays stored in memory?",
    answer: "The actual array data is stored in Heap memory, while the reference variable pointing to the array is stored in Stack memory."
  },
  {
    question: "What is the starting index of an array?",
    answer: "Arrays in Java always start at index 0. The last valid index is length - 1."
  },
  {
    question: "How does Java calculate the address of arr[3]?",
    answer: "Address = Base Address + (3 × size_of_element). For integers (4 bytes), if base address is 1000, arr[3] is at 1012."
  },
  {
    question: "What happens if we try to access arr[10] when array length is 5?",
    answer: "Java throws ArrayIndexOutOfBoundsException at runtime because the index is beyond the array bounds."
  },
  {
    question: "What is the default value of array elements before initialization?",
    answer: "For numeric arrays (int, double, etc.), default is 0. For boolean arrays, default is false. For reference arrays, default is null."
  },
  {
    question: "How does Java know the length of an array?",
    answer: "Every array object in Java has a 'length' property that stores the size. This property is accessible via arrayName.length."
  },
  {
    question: "What is the time complexity of accessing array elements?",
    answer: "Array access is O(1) - constant time. Java calculates the exact memory location using the base address and index offset."
  },
  {
    question: "Can arrays store different data types?",
    answer: "No, arrays in Java are homogeneous - they can only store elements of the same data type as declared."
  },
  {
    question: "What is the difference between int[] arr and int arr[]?",
    answer: "Both are valid syntax. int[] arr is preferred as it clearly shows the array type. int arr[] is C-style syntax."
  },
  {
    question: "How much memory does a reference variable occupy?",
    answer: "In 64-bit JVM, reference variables typically occupy 8 bytes in stack memory, regardless of array size."
  },
  {
    question: "What is contiguous memory allocation?",
    answer: "Contiguous means elements are stored in adjacent memory locations, one after another, without gaps."
  },
  {
    question: "Can we change array size after creation?",
    answer: "No, arrays have fixed size once created. To change size, you must create a new array and copy elements."
  },
  {
    question: "What is the maximum array size in Java?",
    answer: "Maximum array size is Integer.MAX_VALUE - 8 (approximately 2.14 billion elements) due to JVM overhead."
  },
  {
    question: "What happens in memory with: int[] a = new int[5]; int[] b = a;?",
    answer: "Both a and b reference the SAME array object in heap. No new array is created - just another reference variable."
  },
  {
    question: "How does array access compare to ArrayList access speed?",
    answer: "Arrays are faster than ArrayLists for direct access because ArrayList has method call overhead and uses an internal array."
  },
  {
    question: "What is an array index expression?",
    answer: "The expression inside square brackets, like arr[i+1] or arr[getIndex()]. Java evaluates it to an integer index."
  },
  {
    question: "Can negative indices be used with arrays?",
    answer: "No, negative indices will cause ArrayIndexOutOfBoundsException. Arrays are zero-based positive indices only."
  },
  {
    question: "What is a multidimensional array in memory?",
    answer: "A multidimensional array is an array of arrays. Each inner array is a separate object in heap with its own reference."
  },
  {
    question: "Why are arrays considered objects in Java?",
    answer: "Arrays have methods (like clone()), a property (length), extend Object class, and are created with 'new' keyword."
  }
];

export default Topic0;