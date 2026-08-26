import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files
import findLargestBasic from "./topic14_files/FindLargestBasic.java?raw";
import findLargestWithIndex from "./topic14_files/FindLargestWithIndex.java?raw";
import findLargestMultiple from "./topic14_files/FindLargestMultiple.java?raw";
import findLargestObjects from "./topic14_files/FindLargestObjects.java?raw";

// SVG Components for Finding Largest Element
const FindLargestVisualSVG = () => {
  const [step, setStep] = useState(0);
  
  const stages = [
    { label: "Step 1: Initialize max = arr[0] = 45", array: [45, 67, 23, 89, 12, 78, 34], currentMax: 45, currentIndex: 0, comparing: -1 },
    { label: "Step 2: Compare 67 with max (45) → 67 > 45, update max = 67", array: [45, 67, 23, 89, 12, 78, 34], currentMax: 67, currentIndex: 1, comparing: 1 },
    { label: "Step 3: Compare 23 with max (67) → 23 < 67, no change", array: [45, 67, 23, 89, 12, 78, 34], currentMax: 67, currentIndex: 2, comparing: 2 },
    { label: "Step 4: Compare 89 with max (67) → 89 > 67, update max = 89", array: [45, 67, 23, 89, 12, 78, 34], currentMax: 89, currentIndex: 3, comparing: 3 },
    { label: "Step 5: Compare 12 with max (89) → 12 < 89, no change", array: [45, 67, 23, 89, 12, 78, 34], currentMax: 89, currentIndex: 4, comparing: 4 },
    { label: "Step 6: Compare 78 with max (89) → 78 < 89, no change", array: [45, 67, 23, 89, 12, 78, 34], currentMax: 89, currentIndex: 5, comparing: 5 },
    { label: "Step 7: Compare 34 with max (89) → 34 < 89, no change", array: [45, 67, 23, 89, 12, 78, 34], currentMax: 89, currentIndex: 6, comparing: 6 },
    { label: "✓ Complete! Largest element is 89 at index 3", array: [45, 67, 23, 89, 12, 78, 34], currentMax: 89, currentIndex: -1, comparing: -1 }
  ];

  return (
    <div className="w-full">
      <svg viewBox="0 0 900 350" className="w-full h-auto max-w-5xl mx-auto my-4" aria-label="Finding Largest Element Visualization">
        <defs>
          <linearGradient id="largestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 0.2 }} />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
          </marker>
        </defs>
        
        {/* Title */}
        <text x="450" y="25" textAnchor="middle" fill="#1e293b" dark:text-gray-200 fontSize="14" fontWeight="bold">
          {stages[step].label}
        </text>
        
        {/* Current Max Display */}
        <rect x="50" y="40" width="200" height="35" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="150" y="62" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">
          Current MAX: {stages[step].currentMax}
        </text>
        
        {/* Array Visualization */}
        {stages[step].array.map((val, idx) => (
          <g key={idx} transform={`translate(${idx * 100 + 50}, 100)`}>
            <rect 
              x="0" y="0" width="80" height="60" rx="6" 
              fill={val === stages[step].currentMax && stages[step].currentMax !== 45 ? "#fef3c7" : "#ffffff"}
              stroke={
                idx === stages[step].comparing ? "#f59e0b" : 
                (val === stages[step].currentMax && stages[step].currentMax !== 45 ? "#10b981" : "#cbd5e1")
              }
              strokeWidth={idx === stages[step].comparing ? "3" : "2"}
              className="transition-all duration-300 hover:shadow-lg"
              filter="url(#shadow)"
            >
              {idx === stages[step].comparing && (
                <animate attributeName="stroke" values="#f59e0b;#ef4444;#f59e0b" dur="0.8s" repeatCount="indefinite" />
              )}
              {val === stages[step].currentMax && val !== 45 && idx !== stages[step].comparing && (
                <animate attributeName="fill" values="#fef3c7;#fde68a;#fef3c7" dur="1s" repeatCount="indefinite" />
              )}
            </rect>
            <text x="40" y="35" textAnchor="middle" fill="#1e293b" fontSize="22" fontWeight="bold">{val}</text>
            <text x="40" y="78" textAnchor="middle" fill="#94a3b8" fontSize="11">index {idx}</text>
            
            {/* Comparison indicator */}
            {idx === stages[step].comparing && (
              <g>
                <text x="40" y="-10" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">Comparing →</text>
                <path d="M 40 -3 L 40 0" stroke="#f59e0b" strokeWidth="2" />
              </g>
            )}
            
            {/* Max indicator */}
            {val === stages[step].currentMax && val !== 45 && idx !== stages[step].comparing && stages[step].currentMax !== 89 && (
              <g>
                <text x="40" y="-10" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">✓ MAX</text>
                <path d="M 40 -3 L 40 0" stroke="#10b981" strokeWidth="2" />
              </g>
            )}
            
            {/* Final winner */}
            {val === 89 && stages[step].currentMax === 89 && stages[step].comparing === -1 && (
              <g>
                <text x="40" y="-10" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">🏆 WINNER!</text>
                <path d="M 40 -3 L 40 0" stroke="#ef4444" strokeWidth="2" />
              </g>
            )}
          </g>
        ))}
        
        {/* Progress indicator */}
        <g transform="translate(50, 190)">
          <rect x="0" y="0" width="800" height="8" rx="4" fill="#e5e7eb" />
          <rect x="0" y="0" width={(step + 1) * 100} height="8" rx="4" fill="#f59e0b">
            <animate attributeName="width" values="0;800" dur="2s" repeatCount="indefinite" />
          </rect>
        </g>
        
        {/* Navigation Button */}
        <g transform="translate(350, 260)">
          <rect x="0" y="0" width="200" height="35" rx="8" fill="#f59e0b" className="cursor-pointer hover:fill-orange-600 transition-all duration-300" />
          <text x="100" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="cursor-pointer">
            {step < 7 ? "Next Step →" : "Reset"}
          </text>
        </g>
      </svg>
      <div className="text-center mt-2">
        <button 
          onClick={() => setStep((step + 1) % 8)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
        >
          {step < 7 ? "Next Step (Step " + (step + 2) + "/8)" : "Reset Animation"}
        </button>
      </div>
    </div>
  );
};

const AlgorithmFlowchartSVG = () => (
  <svg viewBox="0 0 600 400" className="w-full h-auto max-w-2xl mx-auto my-4">
    <g transform="translate(20, 20)">
      {/* Start */}
      <ellipse cx="280" cy="20" rx="40" ry="20" fill="#10b981" />
      <text x="280" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">START</text>
      
      {/* Arrow */}
      <line x1="280" y1="40" x2="280" y2="70" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Initialize */}
      <rect x="140" y="70" width="280" height="45" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="280" y="97" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">
        max = arr[0]
      </text>
      
      {/* Arrow */}
      <line x1="280" y1="115" x2="280" y2="145" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Loop */}
      <rect x="140" y="145" width="280" height="45" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
      <text x="280" y="172" textAnchor="middle" fill="#9d174d" fontSize="13" fontWeight="bold">
        for i = 1 to n-1
      </text>
      
      {/* Arrow */}
      <line x1="280" y1="190" x2="280" y2="220" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Comparison Decision */}
      <polygon points="280,220 380,260 280,300 180,260" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="280" y="265" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">arr[i] &gt; max?</text>
      
      {/* Yes branch */}
      <line x1="380" y1="260" x2="480" y2="260" stroke="#10b981" strokeWidth="2" />
      <text x="430" y="253" textAnchor="middle" fill="#10b981" fontSize="11">YES</text>
      
      <rect x="480" y="240" width="100" height="40" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
      <text x="530" y="265" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">max = arr[i]</text>
      
      {/* No branch - continue */}
      <line x1="180" y1="260" x2="80" y2="260" stroke="#ef4444" strokeWidth="2" />
      <text x="130" y="253" textAnchor="middle" fill="#ef4444" fontSize="11">NO</text>
      
      <rect x="20" y="240" width="60" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="50" y="265" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">→</text>
      
      {/* Loop back */}
      <path d="M 530 280 L 530 340 L 280 340 L 280 300" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
      
      <path d="M 50 280 L 50 360 L 280 360 L 280 300" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
      
      {/* Output */}
      <rect x="180" y="370" width="200" height="40" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="280" y="395" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">Print max</text>
      
      {/* Arrow to end */}
      <line x1="280" y1="410" x2="280" y2="440" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* End */}
      <ellipse cx="280" cy="460" rx="40" ry="20" fill="#ef4444" />
      <text x="280" y="465" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">END</text>
    </g>
  </svg>
);

const Topic14 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-4">
            Finding the Largest Element in an Array
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Simple linear scan to find maximum value - the foundation of many algorithms
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
                  ? "bg-orange-50 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 border-b-2 border-orange-600"
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
                  <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Finding Maximum Element
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Finding the largest element in an array is a <strong className="text-orange-600 dark:text-orange-400">fundamental linear search operation</strong> that scans through all elements while keeping track of the current maximum. It's a <strong className="text-orange-600 dark:text-orange-400">single-pass algorithm</strong> with O(n) time complexity.
                  </p>
                  <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-orange-800 dark:text-orange-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public static int findMax(int[] arr)</code><br />
                      <strong>Return Type:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int</code> (maximum value)<br />
                      <strong>Purpose:</strong> Find the largest value in any array (sorted or unsorted)<br />
                      <strong>Time Complexity:</strong> O(n) - must check every element
                    </p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>1️⃣ <strong>Initialize</strong> max = arr[0] (assume first element is largest)</p>
                    <p>2️⃣ <strong>Traverse</strong> array from index 1 to n-1</p>
                    <p>3️⃣ <strong>Compare</strong> each element with current max</p>
                    <p>4️⃣ <strong>Update max</strong> if current element is larger</p>
                    <p>5️⃣ <strong>After loop</strong>, max contains the largest value</p>
                    <p>6️⃣ <strong>Optional</strong> - Track index of max element</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Analogy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding tallest student:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside">
                      <li>Start with first student's height as tallest</li>
                      <li>Check each student one by one</li>
                      <li>If taller found, update tallest</li>
                      <li>After checking all, you know the tallest!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Highest Exam Score</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Teacher Sukanta Hui scanning class scores to find topper - Nandini scored 98%!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🌡️ Maximum Temperature</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Weather app scanning week's temperatures to find hottest day in Barrackpore.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💰 Highest Transaction</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Bank scanning monthly transactions to find largest purchase amount.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🏃 Fastest Race Time</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Sports meet scanning runner times to find winner (smallest time).</p>
                  </div>
                </div>
              </div>

              {/* Complexity Analysis */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📊 Complexity Analysis</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Best Case</p>
                    <p className="text-xl font-bold text-green-600">O(n)</p>
                    <p className="text-xs">Still check all elements</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Average Case</p>
                    <p className="text-xl font-bold text-yellow-600">O(n)</p>
                    <p className="text-xs">n comparisons</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Worst Case</p>
                    <p className="text-xl font-bold text-red-600">O(n)</p>
                    <p className="text-xs">n comparisons</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Space</p>
                    <p className="text-xl font-bold text-blue-600">O(1)</p>
                    <p className="text-xs">Only 1 variable</p>
                  </div>
                </div>
              </div>

              {/* Edge Cases */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚠️ Edge Cases to Consider</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-semibold text-yellow-800">Single element array</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Returns that element directly</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-semibold text-yellow-800">All elements equal</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Returns the value (any works)</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-semibold text-yellow-800">Negative numbers</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Works fine - compares correctly</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-semibold text-yellow-800">Empty array</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Should throw exception or return special value</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Tips & Tricks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Start from index 1:</strong> No need to compare first element with itself</li>
                  <li>• <strong>Track index too:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">maxIndex</code> if position matters</li>
                  <li>• <strong>Handle empty array:</strong> Always check <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">if (arr == null || arr.length == 0)</code></li>
                  <li>• <strong>Use Integer.MIN_VALUE:</strong> Alternative initialization for empty check</li>
                  <li>• <strong>For objects:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">compareTo()</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Comparator</code></li>
                </ul>
              </div>

              <Teacher note="Finding max is the 'Hello World' of array processing! I tell students: 'Think of it as a tournament - the champion emerges by defeating all challengers.' This algorithm appears everywhere - from game high scores to data analytics. Master this simple pattern and you've learned 80% of array processing!" />
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">👁️ Visual Walkthrough</h2>
                <FindLargestVisualSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Watch how the maximum value updates as we scan through the array
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📐 Algorithm Flowchart</h2>
                <AlgorithmFlowchartSVG />
              </div>

              {/* Comparison Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📊 Finding Max vs Other Operations</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Operation</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Time Complexity</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Space</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="bg-orange-50 dark:bg-orange-900/10">
                        <td className="px-4 py-2 text-sm font-semibold">Find Maximum</td>
                        <td className="px-4 py-2 text-sm">O(n)</td>
                        <td className="px-4 py-2 text-sm">O(1)</td>
                        <td className="px-4 py-2 text-sm">Single pass scan</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-semibold">Find Minimum</td>
                        <td className="px-4 py-2 text-sm">O(n)</td>
                        <td className="px-4 py-2 text-sm">O(1)</td>
                        <td className="px-4 py-2 text-sm">Similar logic</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-semibold">Find Both Min & Max</td>
                        <td className="px-4 py-2 text-sm">O(n)</td>
                        <td className="px-4 py-2 text-sm">O(1)</td>
                        <td className="px-4 py-2 text-sm">Track both together</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm font-semibold">Sort & Get Max</td>
                        <td className="px-4 py-2 text-sm">O(n log n)</td>
                        <td className="px-4 py-2 text-sm">O(n)</td>
                        <td className="px-4 py-2 text-sm">Overkill!</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <Teacher note="The visual animation clearly shows the 'max' variable evolving. I have students predict when max will update - this builds intuition. Compare with finding minimum - they'll see it's just flipping the comparison operator!" />
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <JavaFileLoader 
                    fileModule={findLargestBasic}
                    title="FindLargestBasic.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={findLargestWithIndex}
                    title="FindLargestWithIndex.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={findLargestMultiple}
                    title="FindLargestMultiple.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={findLargestObjects}
                    title="FindLargestObjects.java"
                    highlightLines={[]}
                  />
                </div>
              </div>

              <Teacher note="Start with the basic version, then add index tracking. Show how to handle edge cases like empty arrays. The 'tournament' approach (comparing in pairs) is a great extension for advanced students - it reduces comparisons!" />
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
                      <p className="font-semibold">Starting loop at index 0</p>
                      <p className="text-sm">Comparing arr[0] with itself - unnecessary comparison, but works</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Not handling empty array</p>
                      <p className="text-sm">Accessing arr[0] on empty array causes ArrayIndexOutOfBoundsException</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Using &gt;= instead of &gt;</p>
                      <p className="text-sm">For duplicate max values, last occurrence becomes max with &gt;=</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Best Practices</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Always check for null and empty array before processing</li>
                  <li>Use <code className="bg-gray-200 px-1 rounded">Integer.MIN_VALUE</code> for generic initialization</li>
                  <li>Consider returning index instead of value when position matters</li>
                  <li>Document behavior for empty arrays (exception or special return)</li>
                  <li>Use meaningful variable names: <code className="bg-gray-200 px-1 rounded">maxValue</code> not <code className="bg-gray-200 px-1 rounded">m</code></li>
                </ul>
              </div>

              {/* Hint Section */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💭 Think About...</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>🤔 How would you find the second largest element?</li>
                  <li>🤔 Can we find max with fewer than n comparisons?</li>
                  <li>🤔 How would you find the maximum absolute value?</li>
                  <li>🤔 What's the difference between finding max in sorted vs unsorted array?</li>
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

              <Teacher note="Finding max is deceptively simple but teaches core concepts: initialization, traversal, comparison, and state tracking. Have students modify the code to find min, then both min and max in one pass. This builds confidence before tackling more complex algorithms!" />
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
    question: "What is the time complexity of finding maximum in an array?",
    answer: "O(n) - must examine every element to ensure we found the largest value."
  },
  {
    question: "Why do we initialize max with arr[0]?",
    answer: "To have a starting point for comparison. If array has at least one element, arr[0] is a valid starting maximum."
  },
  {
    question: "What if array has only one element?",
    answer: "The loop doesn't execute, and max (initialized to arr[0]) correctly returns that element."
  },
  {
    question: "How to handle empty array?",
    answer: "Check arr == null || arr.length == 0 first. Either throw IllegalArgumentException or return Integer.MIN_VALUE."
  },
  {
    question: "How to find both maximum and minimum in one pass?",
    answer: "Track both max and min simultaneously, updating both as you traverse the array once."
  },
  {
    question: "What's the space complexity of finding maximum?",
    answer: "O(1) - only uses a few variables regardless of array size."
  },
  {
    question: "Can we find maximum in sorted array faster?",
    answer: "If ascending, max is last element O(1). If descending, max is first element O(1)."
  },
  {
    question: "How to find maximum using streams?",
    answer: "Arrays.stream(arr).max().getAsInt() - but still O(n) internally."
  },
  {
    question: "What's wrong with initializing max = 0?",
    answer: "Fails if all numbers are negative - max would incorrectly remain 0."
  },
  {
    question: "How to find maximum absolute value?",
    answer: "Compare Math.abs(arr[i]) instead of arr[i] directly, but careful with sign."
  },
  {
    question: "How to find second largest element?",
    answer: "Track both largest and second largest during single pass, updating both appropriately."
  },
  {
    question: "What's the best case for finding maximum?",
    answer: "Still O(n) - you always need to verify no larger element exists later in array."
  },
  {
    question: "How to find maximum in 2D array?",
    answer: "Nested loops - outer for rows, inner for columns, update max when larger found."
  },
  {
    question: "Can we use divide and conquer to find max?",
    answer: "Yes - split array, find max in left and right halves, return larger. Still O(n) but uses recursion."
  },
  {
    question: "How to find top 3 maximum values?",
    answer: "Track three variables: first, second, third max. Update accordingly when larger found."
  },
  {
    question: "What's the difference between max and maximum?",
    answer: "Same concept - 'max' is commonly used abbreviation for maximum."
  },
  {
    question: "How to find max in ArrayList?",
    answer: "Collections.max(list) or manual loop with list.get(i)."
  },
  {
    question: "Why can't we use sorting to find max?",
    answer: "We can, but sorting is O(n log n) - slower than direct O(n) scan."
  },
  {
    question: "How to find max of custom objects?",
    answer: "Implement Comparable interface and use compareTo(), or provide Comparator."
  },
  {
    question: "What's the tournament method for finding max?",
    answer: "Compare elements in pairs, winners compete again - reduces comparisons to n-1."
  }
];

export default Topic14;