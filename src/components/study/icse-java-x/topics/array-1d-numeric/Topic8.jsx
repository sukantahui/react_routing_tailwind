import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files
import linearSearchBasic from "./topic8_files/LinearSearchBasic.java?raw";
import linearSearchWithMethod from "./topic8_files/LinearSearchWithMethod.java?raw";
import linearSearchMultiple from "./topic8_files/LinearSearchMultiple.java?raw";
import linearSearchObjects from "./topic8_files/LinearSearchObjects.java?raw";

// SVG Components for Linear Search Visualization
const LinearSearchVisualSVG = () => (
  <svg viewBox="0 0 700 200" className="w-full h-auto max-w-3xl mx-auto my-4" aria-label="Linear Search Step-by-Step Visualization">
    <defs>
      <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.1 }} />
        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.2 }} />
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
      </filter>
    </defs>
    
    {/* Array Elements */}
    {[23, 45, 12, 67, 34, 89, 56].map((val, idx) => (
      <g key={idx} transform={`translate(${idx * 90 + 20}, 40)`}>
        <rect 
          x="0" y="0" width="70" height="50" rx="6" 
          fill="#ffffff" stroke="#6366f1" strokeWidth="2"
          className="transition-all duration-300 hover:stroke-indigo-500 hover:shadow-lg"
          filter="url(#shadow)"
        />
        <text x="35" y="30" textAnchor="middle" fill="#1e293b" fontSize="16" fontWeight="bold">{val}</text>
        <text x="35" y="65" textAnchor="middle" fill="#64748b" fontSize="11">index [{idx}]</text>
        
        {/* Search pointer animation for target 67 (index 3) */}
        {idx === 3 && (
          <>
            <rect x="0" y="0" width="70" height="50" rx="6" fill="none" stroke="#f59e0b" strokeWidth="3">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
            </rect>
            <text x="35" y="-10" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">✓ Found!</text>
          </>
        )}
        
        {/* Search pointer for scanning */}
        {idx < 3 && (
          <path d="M 35 50 L 35 70" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)">
            <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="indefinite" />
          </path>
        )}
      </g>
    ))}
    
    {/* Scanning Label */}
    <text x="200" y="120" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">
      Scanning →
    </text>
    
    {/* Time Complexity Box */}
    <rect x="50" y="140" width="580" height="40" rx="6" fill="url(#searchGrad)" stroke="#6366f1" strokeWidth="1" />
    <text x="340" y="165" textAnchor="middle" fill="#1e293b" fontSize="13">
      Time Complexity: O(n) | Space Complexity: O(1)
    </text>
  </svg>
);

const LinearSearchStepsSVG = () => (
  <svg viewBox="0 0 600 300" className="w-full h-auto max-w-2xl mx-auto my-4" aria-label="Linear Search Algorithm Steps">
    <g transform="translate(20, 20)">
      {/* Step 1 */}
      <rect x="0" y="0" width="540" height="45" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" className="group hover:shadow-md transition-all duration-300">
        <text x="20" y="28" fill="#1e293b" fontSize="13">
          <tspan fontWeight="bold" fill="#6366f1">Step 1:</tspan> Start from first element (index 0)
        </text>
      </rect>
      
      {/* Arrow */}
      <line x1="270" y1="45" x2="270" y2="65" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
      
      {/* Step 2 */}
      <rect x="0" y="65" width="540" height="45" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" className="group hover:shadow-md transition-all duration-300">
        <text x="20" y="93" fill="#1e293b" fontSize="13">
          <tspan fontWeight="bold" fill="#6366f1">Step 2:</tspan> Compare current element with target
        </text>
      </rect>
      
      {/* Arrow */}
      <line x1="270" y1="110" x2="270" y2="130" stroke="#cbd5e1" strokeWidth="1.5" markerEnd="url(#arrow)" />
      
      {/* Step 3 - Decision diamond */}
      <polygon points="270,130 380,165 270,200 160,165" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="270" y="170" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">Match?</text>
      
      {/* Yes branch */}
      <line x1="380" y1="165" x2="450" y2="165" stroke="#10b981" strokeWidth="1.5" />
      <text x="415" y="158" textAnchor="middle" fill="#10b981" fontSize="11">YES</text>
      <rect x="450" y="145" width="120" height="40" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5">
        <text x="510" y="170" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">Return index</text>
      </rect>
      
      {/* No branch */}
      <line x1="160" y1="200" x2="160" y2="235" stroke="#ef4444" strokeWidth="1.5" />
      <text x="145" y="222" textAnchor="end" fill="#ef4444" fontSize="11">NO</text>
      
      {/* Step 4 */}
      <rect x="40" y="235" width="240" height="40" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" className="group hover:shadow-md transition-all duration-300">
        <text x="160" y="260" textAnchor="middle" fill="#1e293b" fontSize="12">Move to next element</text>
      </rect>
      
      {/* Loop back arrow */}
      <path d="M 280 255 Q 520 255 520 165 Q 520 90 380 90" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5,5" markerEnd="url(#arrow)" />
      <text x="530" y="180" fill="#6366f1" fontSize="10">repeat</text>
    </g>
  </svg>
);

const Topic8 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Linear Search in Unsorted Arrays
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Sequential searching through array elements - the simplest search algorithm
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

        {/* Main Content */}
        <div className="space-y-6">
          {activeSection === 'theory' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              {/* Concept Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                  <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  What is Linear Search?
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Linear search is the <strong className="text-indigo-600 dark:text-indigo-400">simplest searching algorithm</strong> that sequentially checks each element in an array until a match is found or the end is reached. It works on <strong className="text-indigo-600 dark:text-indigo-400">both sorted and unsorted arrays</strong>.
                  </p>
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-indigo-800 dark:text-indigo-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public static int linearSearch(int[] arr, int target)</code><br />
                      <strong>Return Type:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int</code> (index if found, -1 if not found)<br />
                      <strong>Purpose:</strong> Find position of target element in unsorted array
                    </p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ How Linear Search Works</h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>1️⃣ <strong>Start</strong> from the first element (index 0)</p>
                  <p>2️⃣ <strong>Compare</strong> current element with the target value</p>
                  <p>3️⃣ <strong>If match found</strong> → return current index immediately</p>
                  <p>4️⃣ <strong>If no match</strong> → move to next element (index + 1)</p>
                  <p>5️⃣ <strong>Repeat</strong> steps 2-4 until array end is reached</p>
                  <p>6️⃣ <strong>Return -1</strong> if element not found</p>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📚 Library Book Search</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">A librarian checking each shelf sequentially until finding "Harry Potter" - books aren't sorted by title!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🎒 Lost Student ID</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Teacher Sukanta Hui checking each student in Barrackpore school roll call until finding Abhronila's ID card.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🚇 Train Platform Search</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Checking platform numbers sequentially at Shyamnagar station to find train to Naihati.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📱 Contact List</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Scrolling through unsorted phone contacts to find "Riddhiman" - one by one until found.</p>
                  </div>
                </div>
              </div>

              {/* Time & Space Complexity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📊 Complexity Analysis</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Best Case:</span>
                    <span className="text-green-600 dark:text-green-400 font-mono">O(1)</span>
                    <span className="text-sm text-gray-500">Element found at first position (index 0)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Average Case:</span>
                    <span className="text-yellow-600 dark:text-yellow-400 font-mono">O(n)</span>
                    <span className="text-sm text-gray-500">Element found in middle of array</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Worst Case:</span>
                    <span className="text-red-600 dark:text-red-400 font-mono">O(n)</span>
                    <span className="text-sm text-gray-500">Element at last position or not present</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Space Complexity:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono">O(1)</span>
                    <span className="text-sm text-gray-500">No extra space needed (iterative)</span>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Tips & Tricks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Early termination</strong> - Return immediately when match found (saves time)</li>
                  <li>• <strong>Sentinel search</strong> - Add target at end to avoid bounds checking (micro-optimization)</li>
                  <li>• <strong>Return -1 convention</strong> - Standard way to indicate "not found"</li>
                  <li>• <strong>Use for-each loop</strong> when index isn't needed, traditional for loop when index matters</li>
                </ul>
              </div>

              <Teacher note="Linear search is your go-to for small or unsorted datasets. While O(n) might seem slow, it's often faster than sorting + binary search for single searches. Always remember: Simplicity wins when n is small! Students in Ichapur love this algorithm because it's intuitive - like finding a friend in a line." />
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">👁️ Visual Walkthrough</h2>
                <LinearSearchVisualSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Scanning each element sequentially until target (67) is found at index 3
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📐 Algorithm Flowchart</h2>
                <LinearSearchStepsSVG />
              </div>

              {/* Step-by-step trace */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📝 Dry Run Example</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Step</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Index</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Element</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Target</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Match?</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { step: 1, idx: 0, elem: 23, match: 'No', action: 'Continue' },
                        { step: 2, idx: 1, elem: 45, match: 'No', action: 'Continue' },
                        { step: 3, idx: 2, elem: 12, match: 'No', action: 'Continue' },
                        { step: 4, idx: 3, elem: 67, match: '✓ Yes', action: 'Return 3' }
                      ].map((row, i) => (
                        <tr key={i} className={row.match === '✓ Yes' ? 'bg-green-50 dark:bg-green-900/20' : ''}>
                          <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{row.step}</td>
                          <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{row.idx}</td>
                          <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{row.elem}</td>
                          <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">67</td>
                          <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{row.match}</td>
                          <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Teacher note="Visual tracing is crucial for understanding algorithms. Have students act out linear search - line up 10 students, each with a number, and have a 'searcher' check each person. This kinesthetic approach works wonders in my Barrackpore classroom!" />
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <JavaFileLoader 
                    fileModule={linearSearchBasic}
                    title="LinearSearchBasic.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={linearSearchWithMethod}
                    title="LinearSearchWithMethod.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={linearSearchMultiple}
                    title="LinearSearchMultiple.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={linearSearchObjects}
                    title="LinearSearchObjects.java"
                    highlightLines={[]}
                  />
                </div>
              </div>

              <Teacher note="Notice the pattern: always start with index 0, compare, then increment. The 'return -1' at the end is critical - new students often forget it! Also, show how to search for objects by overriding equals() method." />
            </div>
          )}

          {activeSection === 'practice' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              {/* Common Pitfalls */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚠️ Common Pitfalls</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 dark:text-red-400 text-xl">❌</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Off-by-one errors</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Loop condition <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">i &lt;= arr.length</code> causes ArrayIndexOutOfBoundsException</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 dark:text-red-400 text-xl">❌</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Forgetting to return -1</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Method with no return when element not found causes compilation error</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 dark:text-red-400 text-xl">❌</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Comparing objects with ==</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.equals()</code> for String/Object comparison</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Best Practices</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Always check for <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">null</code> array before searching</li>
                  <li>Use meaningful variable names: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">target</code> instead of <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">t</code></li>
                  <li>Extract search logic into separate method for reusability</li>
                  <li>Document return value convention (-1 means not found)</li>
                  <li>For multiple occurrences, collect indices in ArrayList</li>
                </ul>
              </div>

              {/* Hint Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💭 Think About...</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>🤔 What happens if array has duplicate elements? Which index is returned?</li>
                  <li>🤔 How would you modify the code to find LAST occurrence of target?</li>
                  <li>🤔 Can linear search work faster if array is sorted? (Hint: early termination when element > target)</li>
                  <li>🤔 Why do we return -1 instead of 0 or null?</li>
                </ul>
              </div>

              {/* Q&A Section */}
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

              <Teacher note="The key to mastering linear search is practice with different data types. Have students search for strings, objects, and primitive types. Create scenarios where search is the bottleneck and discuss when to use alternative approaches like HashMap for repeated searches." />
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
    question: "What is linear search and when is it used?",
    answer: "Linear search sequentially checks each element until finding the target. It's used for unsorted arrays, small datasets, or when simplicity is preferred over speed."
  },
  {
    question: "What is the time complexity of linear search?",
    answer: "Best case O(1), Average case O(n), Worst case O(n). Linear search requires checking each element until found."
  },
  {
    question: "Why does linear search work on unsorted arrays?",
    answer: "Because it checks every element regardless of order. It doesn't rely on any ordering property, making it universal but slower for large datasets."
  },
  {
    question: "What value should be returned if element not found?",
    answer: "Convention is to return -1 because array indices are never negative. This clearly indicates 'not found'."
  },
  {
    question: "How to find all occurrences using linear search?",
    answer: "Store indices in an ArrayList instead of returning on first match. Continue searching through entire array."
  },
  {
    question: "What is sentinel linear search?",
    answer: "Place target at the end of array to eliminate bounds checking, slightly improving performance by removing the i < n condition."
  },
  {
    question: "Can linear search be recursive?",
    answer: "Yes, but iterative is preferred due to stack overflow risk for large arrays. Recursive version checks arr[0] then recurses on remaining array."
  },
  {
    question: "How does linear search compare to binary search?",
    answer: "Linear search O(n) works on any array. Binary search O(log n) requires sorted array. For unsorted arrays, linear search is the only option unless you sort first (O(n log n))."
  },
  {
    question: "What's the space complexity of linear search?",
    answer: "O(1) - iterative version uses constant extra space regardless of input size. Recursive version uses O(n) stack space."
  },
  {
    question: "How to search for objects with linear search?",
    answer: "Override equals() method in your class. Then compare using obj.equals(target) instead of == for content comparison."
  },
  {
    question: "What happens if array is null?",
    answer: "NullPointerException occurs. Always check if(arr == null) before searching to handle gracefully."
  },
  {
    question: "How to find last occurrence using linear search?",
    answer: "Scan entire array and update lastIndex variable whenever match found. Return lastIndex after loop completes."
  },
  {
    question: "Can linear search be optimized?",
    answer: "Transposition - move found element forward for future searches. Move-to-front - place found element at beginning. Helpful when same elements searched repeatedly."
  },
  {
    question: "How to search 2D array using linear search?",
    answer: "Nested loops - outer for rows, inner for columns. Return row and column indices as array or custom object."
  },
  {
    question: "What's the difference between linear search and contains() method?",
    answer: "contains() internally uses linear search for Lists but returns boolean instead of index. ArrayList.contains() is O(n)."
  },
  {
    question: "When should you NOT use linear search?",
    answer: "For large datasets with frequent searches. Use HashMap for O(1) lookups or binary search on sorted array if sorting cost is acceptable."
  },
  {
    question: "How to count frequency using linear search?",
    answer: "Initialize counter, iterate array, increment when match found. Return counter for single element frequency."
  },
  {
    question: "What's the best case scenario for linear search?",
    answer: "Target at first position - only one comparison. Occurs when searching for element known to be at start or when using move-to-front optimization."
  },
  {
    question: "How does linear search work with generics?",
    answer: "Define method with <T> type parameter. Use equals() for comparison since T extends Object. Works with any reference type."
  },
  {
    question: "Why is linear search called 'sequential search'?",
    answer: "Because it examines elements in sequence order, one after another, without skipping or jumping ahead."
  }
];

export default Topic8;