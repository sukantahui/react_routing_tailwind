import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files
import binarySearchBasic from "./topic9_files/BinarySearchBasic.java?raw";
import binarySearchRecursive from "./topic9_files/BinarySearchRecursive.java?raw";
import binarySearchFirstLast from "./topic9_files/BinarySearchFirstLast.java?raw";
import binarySearchInsertion from "./topic9_files/BinarySearchInsertion.java?raw";

// SVG Components for Binary Search Visualization
const BinarySearchVisualSVG = () => (
  <svg viewBox="0 0 800 250" className="w-full h-auto max-w-4xl mx-auto my-4" aria-label="Binary Search Step-by-Step Visualization">
    <defs>
      <linearGradient id="binaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.2 }} />
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
      </filter>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>
    
    {/* Initial Array */}
    <text x="400" y="25" textAnchor="middle" fill="#6b7280" fontSize="12">Initial Sorted Array</text>
    {[2, 5, 8, 12, 16, 23, 38, 45, 56, 67].map((val, idx) => (
      <g key={idx} transform={`translate(${idx * 72 + 30}, 35)`}>
        <rect x="0" y="0" width="62" height="40" rx="4" fill="#ffffff" stroke="#8b5cf6" strokeWidth="1.5" filter="url(#shadow)"/>
        <text x="31" y="25" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">{val}</text>
        <text x="31" y="52" textAnchor="middle" fill="#94a3b8" fontSize="9">{idx}</text>
      </g>
    ))}
    
    {/* Search for target = 38 */}
    <text x="400" y="115" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="bold">Searching for target: 38</text>
    
    {/* Step 1 */}
    <g transform="translate(30, 130)">
      <rect x="0" y="0" width="740" height="35" rx="6" fill="#f3e8ff" stroke="#8b5cf6" strokeWidth="1" />
      <text x="15" y="23" fill="#6b21a8" fontSize="12" fontWeight="bold">Step 1:</text>
      <text x="80" y="23" fill="#4c1d95" fontSize="12">low = 0, high = 9 → mid = (0+9)/2 = 4 → arr[4] = 16</text>
      <text x="550" y="23" fill="#ef4444" fontSize="12">16 &lt; 38 → go right</text>
    </g>
    
    {/* Step 2 */}
    <g transform="translate(30, 175)">
      <rect x="0" y="0" width="740" height="35" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="1" />
      <text x="15" y="23" fill="#be185d" fontSize="12" fontWeight="bold">Step 2:</text>
      <text x="80" y="23" fill="#9d174d" fontSize="12">low = 5, high = 9 → mid = (5+9)/2 = 7 → arr[7] = 45</text>
      <text x="550" y="23" fill="#ef4444" fontSize="12">45 &gt; 38 → go left</text>
    </g>
    
    {/* Step 3 */}
    <g transform="translate(30, 220)">
      <rect x="0" y="0" width="740" height="35" rx="6" fill="#dcfce7" stroke="#10b981" strokeWidth="1" />
      <text x="15" y="23" fill="#047857" fontSize="12" fontWeight="bold">Step 3:</text>
      <text x="80" y="23" fill="#065f46" fontSize="12">low = 5, high = 6 → mid = (5+6)/2 = 5 → arr[5] = 23</text>
      <text x="550" y="23" fill="#10b981" fontSize="12">23 &lt; 38 → go right</text>
    </g>
    
    {/* Step 4 */}
    <g transform="translate(200, 265)">
      <rect x="0" y="0" width="400" height="35" rx="6" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
      <text x="15" y="23" fill="#047857" fontSize="12" fontWeight="bold">Step 4:</text>
      <text x="80" y="23" fill="#065f46" fontSize="12">low = 6, high = 6 → arr[6] = 38 ✓ FOUND!</text>
    </g>
  </svg>
);

const BinarySearchTreeSVG = () => (
  <svg viewBox="0 0 600 350" className="w-full h-auto max-w-2xl mx-auto my-4" aria-label="Binary Search Decision Tree">
    <g transform="translate(300, 30)">
      {/* Root - Level 0 */}
      <circle cx="0" cy="0" r="28" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2" className="transition-all duration-300 hover:scale-105">
        <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">mid=4</text>
      
      {/* Level 1 */}
      <line x1="0" y1="28" x2="-120" y2="70" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="0" y1="28" x2="120" y2="70" stroke="#cbd5e1" strokeWidth="2" />
      
      <circle cx="-120" cy="70" r="28" fill="#a78bfa" stroke="#6d28d9" strokeWidth="2" className="transition-all duration-300 hover:scale-105">
        <text x="-120" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">mid=1</text>
      </circle>
      <circle cx="120" cy="70" r="28" fill="#a78bfa" stroke="#6d28d9" strokeWidth="2" className="transition-all duration-300 hover:scale-105">
        <text x="120" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">mid=7</text>
      </circle>
      
      {/* Level 2 */}
      <line x1="-120" y1="98" x2="-200" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="-120" y1="98" x2="-40" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="120" y1="98" x2="40" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="120" y1="98" x2="200" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      
      <circle cx="-200" cy="140" r="28" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2">
        <text x="-200" y="145" textAnchor="middle" fill="#4c1d95" fontSize="12" fontWeight="bold">mid=0</text>
      </circle>
      <circle cx="-40" cy="140" r="28" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2">
        <text x="-40" y="145" textAnchor="middle" fill="#4c1d95" fontSize="12" fontWeight="bold">mid=2</text>
      </circle>
      <circle cx="40" cy="140" r="28" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2">
        <text x="40" y="145" textAnchor="middle" fill="#4c1d95" fontSize="12" fontWeight="bold">mid=6</text>
      </circle>
      <circle cx="200" cy="140" r="28" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2">
        <text x="200" y="145" textAnchor="middle" fill="#4c1d95" fontSize="12" fontWeight="bold">mid=8</text>
      </circle>
      
      {/* Labels */}
      <text x="-250" y="175" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">left</text>
      <text x="250" y="175" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">right</text>
      
      {/* Legend */}
      <g transform="translate(-280, 220)">
        <text x="0" y="0" fill="#1e293b" fontSize="11" fontWeight="bold">Decision Path:</text>
        <circle cx="0" cy="20" r="6" fill="#8b5cf6" />
        <text x="15" y="25" fill="#6b7280" fontSize="10">Compare mid element</text>
        <path d="M 0 35 L 0 45" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="15" y="50" fill="#10b981" fontSize="10">Go left if target &lt; mid</text>
        <path d="M 0 60 L 0 70" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="15" y="75" fill="#ef4444" fontSize="10">Go right if target &gt; mid</text>
      </g>
    </g>
  </svg>
);

const ComplexityComparisonSVG = () => (
  <svg viewBox="0 0 700 200" className="w-full h-auto max-w-3xl mx-auto my-4">
    <rect x="50" y="20" width="280" height="160" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
    <text x="190" y="45" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="bold">Linear Search - O(n)</text>
    <line x1="70" y1="160" x2="310" y2="160" stroke="#991b1b" strokeWidth="2" />
    <line x1="70" y1="160" x2="70" y2="160" stroke="#991b1b" strokeWidth="2" />
    <line x1="310" y1="60" x2="310" y2="160" stroke="#991b1b" strokeWidth="2" strokeDasharray="4" />
    <text x="310" y="55" textAnchor="middle" fill="#991b1b" fontSize="10">n=10</text>
    
    <rect x="370" y="20" width="280" height="160" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5" />
    <text x="510" y="45" textAnchor="middle" fill="#14532d" fontSize="14" fontWeight="bold">Binary Search - O(log n)</text>
    <line x1="390" y1="160" x2="630" y2="160" stroke="#14532d" strokeWidth="2" />
    <line x1="390" y1="160" x2="390" y2="160" stroke="#14532d" strokeWidth="2" />
    <line x1="630" y1="120" x2="630" y2="160" stroke="#14532d" strokeWidth="2" strokeDasharray="4" />
    <text x="630" y="115" textAnchor="middle" fill="#14532d" fontSize="10">log₂10≈3.3</text>
    
    <text x="510" y="175" textAnchor="middle" fill="#6b7280" fontSize="11">~3 comparisons vs 10 comparisons!</text>
  </svg>
);

const Topic9 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
            Binary Search in Sorted Arrays
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Divide and conquer search algorithm - O(log n) time complexity
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
                  ? "bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600"
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
                  <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  What is Binary Search?
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Binary search is an <strong className="text-purple-600 dark:text-purple-400">efficient searching algorithm</strong> that works on <strong className="text-purple-600 dark:text-purple-400">sorted arrays</strong> by repeatedly dividing the search interval in half. It compares the target value with the middle element and eliminates half of the remaining elements in each step.
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-purple-800 dark:text-purple-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public static int binarySearch(int[] arr, int target)</code><br />
                      <strong>Return Type:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int</code> (index if found, -1 if not found)<br />
                      <strong>Precondition:</strong> Array MUST be sorted in ascending order<br />
                      <strong>Purpose:</strong> Fast search in sorted datasets
                    </p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ How Binary Search Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>1️⃣ <strong>Initialize</strong> low = 0, high = arr.length - 1</p>
                    <p>2️⃣ <strong>Calculate mid</strong> = (low + high) / 2</p>
                    <p>3️⃣ <strong>Compare</strong> arr[mid] with target</p>
                    <p>4️⃣ <strong>If match</strong> → return mid</p>
                    <p>5️⃣ <strong>If target &lt; arr[mid]</strong> → high = mid - 1</p>
                    <p>6️⃣ <strong>If target &gt; arr[mid]</strong> → low = mid + 1</p>
                    <p>7️⃣ <strong>Repeat</strong> until low &gt; high</p>
                    <p>8️⃣ <strong>Return -1</strong> if not found</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Analogy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding a page in a book:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside">
                      <li>Open to middle page</li>
                      <li>If target page is earlier → go left half</li>
                      <li>If later → go right half</li>
                      <li>Repeat until found</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📞 Phone Directory</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding "Sukanta Hui" in alphabetical directory - open middle, compare, eliminate half!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🎮 Number Guessing Game</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Guess number between 1-100 - each guess cuts possibilities in half!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📚 Dictionary Lookup</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding "Binary Search" in dictionary - alphabetical order enables binary search!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🗺️ Map Navigation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding Barrackpore on sorted list of West Bengal cities!</p>
                  </div>
                </div>
              </div>

              {/* Complexity Analysis */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📊 Complexity Analysis</h2>
                <ComplexityComparisonSVG />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Best Case</p>
                    <p className="text-xl font-bold text-green-600">O(1)</p>
                    <p className="text-xs">Middle element</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Average Case</p>
                    <p className="text-xl font-bold text-yellow-600">O(log n)</p>
                    <p className="text-xs">Logarithmic</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Worst Case</p>
                    <p className="text-xl font-bold text-red-600">O(log n)</p>
                    <p className="text-xs">Not found</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Space (Iterative)</p>
                    <p className="text-xl font-bold text-blue-600">O(1)</p>
                    <p className="text-xs">Constant</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Tips & Tricks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Avoid overflow:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">mid = low + (high - low) / 2</code> instead of <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">(low + high)/2</code></li>
                  <li>• <strong>Sorted requirement:</strong> Always verify array is sorted before binary search</li>
                  <li>• <strong>Built-in method:</strong> Java provides <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Arrays.binarySearch()</code></li>
                  <li>• <strong>Insertion point:</strong> Return value <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-(insertion point) - 1</code> when not found</li>
                </ul>
              </div>

              <Teacher note="Binary search is a game-changer! Show students how searching in 1 billion elements takes only 30 comparisons (log₂ 1B ≈ 30). Compare with linear search's 1 billion comparisons. This blew my Barrackpore students' minds! Always emphasize - the array MUST be sorted first!" />
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">👁️ Visual Walkthrough</h2>
                <BinarySearchVisualSVG />
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌲 Decision Tree Representation</h2>
                <BinarySearchTreeSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Each node represents a comparison, reducing search space by half
                </p>
              </div>

              {/* Step-by-step trace */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📝 Dry Run Example</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Step</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">low</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">high</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">mid</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">arr[mid]</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Comparison</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { step: 1, low: 0, high: 9, mid: 4, val: 16, compare: "16 < 38", action: "low = 5" },
                        { step: 2, low: 5, high: 9, mid: 7, val: 45, compare: "45 > 38", action: "high = 6" },
                        { step: 3, low: 5, high: 6, mid: 5, val: 23, compare: "23 < 38", action: "low = 6" },
                        { step: 4, low: 6, high: 6, mid: 6, val: 38, compare: "38 == 38", action: "✓ FOUND at 6" }
                      ].map((row, i) => (
                        <tr key={i} className={row.action.includes("FOUND") ? "bg-green-50 dark:bg-green-900/20" : ""}>
                          <td className="px-3 py-2 text-sm">{row.step}</td>
                          <td className="px-3 py-2 text-sm">{row.low}</td>
                          <td className="px-3 py-2 text-sm">{row.high}</td>
                          <td className="px-3 py-2 text-sm">{row.mid}</td>
                          <td className="px-3 py-2 text-sm">{row.val}</td>
                          <td className="px-3 py-2 text-sm">{row.compare}</td>
                          <td className="px-3 py-2 text-sm font-medium">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Teacher note="The decision tree visualization is powerful. I tell my students: 'Binary search is like playing the number guessing game with a smart friend who always says higher/lower.' Have them simulate with different targets!" />
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <JavaFileLoader 
                    fileModule={binarySearchBasic}
                    title="BinarySearchBasic.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={binarySearchRecursive}
                    title="BinarySearchRecursive.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={binarySearchFirstLast}
                    title="BinarySearchFirstLast.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={binarySearchInsertion}
                    title="BinarySearchInsertionPoint.java"
                    highlightLines={[]}
                  />
                </div>
              </div>

              <Teacher note="The recursive version is elegant but watch out for stack overflow on very large arrays. Always prefer iterative for production code. Show both so students understand the trade-offs!" />
            </div>
          )}

          {activeSection === 'practice' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              {/* Common Pitfalls */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚠️ Common Pitfalls</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Unsorted array assumption</p>
                      <p className="text-sm">Binary search gives WRONG results on unsorted arrays - always sort first!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Integer overflow in mid calculation</p>
                      <p className="text-sm"><code className="bg-gray-200 px-1 rounded">(low + high) / 2</code> can overflow for large arrays near 2^31</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Off-by-one errors</p>
                      <p className="text-sm">Incorrect high = mid instead of mid-1, or low = mid instead of mid+1 causes infinite loops</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Best Practices</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Always verify array is sorted before binary search</li>
                  <li>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">low + (high - low) / 2</code> for mid calculation</li>
                  <li>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">while (low &lt;= high)</code> for proper bounds</li>
                  <li>Consider using built-in <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Arrays.binarySearch()</code> for production code</li>
                  <li>Document that array must be sorted (precondition)</li>
                </ul>
              </div>

              {/* Hint Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💭 Think About...</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>🤔 What happens if array has duplicate elements? Which index is returned?</li>
                  <li>🤔 How would you find the FIRST occurrence of target with duplicates?</li>
                  <li>🤔 Why is binary search not efficient for linked lists?</li>
                  <li>🤔 Can binary search work on descending sorted arrays?</li>
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

              <Teacher note="The key insight: Binary search reduces the problem size by half each time. Have students calculate how many steps for different array sizes. My favorite question: 'How many comparisons to find a number in a phone book of 1 million names?' Answer: Only ~20!" />
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
    question: "What is binary search and when is it used?",
    answer: "Binary search is an efficient O(log n) algorithm that finds elements in sorted arrays by repeatedly dividing the search space in half. Used when dataset is sorted and search operations are frequent."
  },
  {
    question: "Why does binary search require sorted arrays?",
    answer: "Binary search relies on the ordering property to eliminate half the elements. Without sorting, we cannot determine which half contains the target."
  },
  {
    question: "What is the time complexity of binary search?",
    answer: "O(log n) for both average and worst cases. Best case O(1) when target is the middle element."
  },
  {
    question: "How to prevent integer overflow in mid calculation?",
    answer: "Use mid = low + (high - low) / 2 instead of (low + high) / 2. This prevents overflow when low + high exceeds Integer.MAX_VALUE."
  },
  {
    question: "What is the space complexity of recursive binary search?",
    answer: "O(log n) due to recursive call stack. Iterative version uses O(1) space."
  },
  {
    question: "How to find first occurrence in duplicate array?",
    answer: "Modify binary search to continue searching left even after finding target. Update result when found and set high = mid - 1."
  },
  {
    question: "What does Arrays.binarySearch() return when element not found?",
    answer: "Returns -(insertion point) - 1 where insertion point is where the element would be inserted to maintain sorted order."
  },
  {
    question: "Can binary search work on descending sorted arrays?",
    answer: "Yes, just reverse the comparison logic: go left if target > arr[mid], go right if target < arr[mid]."
  },
  {
    question: "Why is binary search inefficient for linked lists?",
    answer: "Linked lists don't support O(1) random access. Finding middle element requires traversing from head, making it O(n) per step."
  },
  {
    question: "What's the difference between linear and binary search?",
    answer: "Linear search O(n) works on any array. Binary search O(log n) requires sorted arrays but is exponentially faster for large datasets."
  },
  {
    question: "How many comparisons for 1 million elements?",
    answer: "About 20 comparisons (log₂ 1,000,000 ≈ 20). Linear search would need up to 1 million comparisons."
  },
  {
    question: "What happens if array is null?",
    answer: "NullPointerException. Always check for null before searching."
  },
  {
    question: "How to implement binary search for custom objects?",
    answer: "Ensure objects implement Comparable interface or provide Comparator. Compare using compareTo() instead of relational operators."
  },
  {
    question: "What is ternary search? Is it better?",
    answer: "Ternary search divides into 3 parts but requires 2 comparisons per step. It's actually slower than binary search for most cases."
  },
  {
    question: "Can binary search find insertion point?",
    answer: "Yes, when loop ends with low > high, 'low' is the insertion point where element should be inserted."
  },
  {
    question: "What is exponential search?",
    answer: "First find range where element might exist by doubling indices, then perform binary search. Useful for unbounded/infinite arrays."
  },
  {
    question: "How to choose between linear and binary search?",
    answer: "Use linear for small arrays (n < 50), unsorted data, or single searches. Use binary for large sorted arrays with frequent searches."
  },
  {
    question: "What is interpolation search?",
    answer: "Improved binary search for uniformly distributed data that guesses position using formula: pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])"
  },
  {
    question: "Why use while (low <= high) not while (low < high)?",
    answer: "Using <= ensures the case when low == high is checked. With < only, you'd miss the last element."
  },
  {
    question: "How to find rotation point in rotated sorted array?",
    answer: "Modified binary search comparing mid with boundaries to determine which half is sorted, then decide which half contains the rotation point."
  }
];

export default Topic9;