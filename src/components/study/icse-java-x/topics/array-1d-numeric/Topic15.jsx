import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files
import findSmallestBasic from "./topic15_files/FindSmallestBasic.java?raw";
import findSmallestWithIndex from "./topic15_files/FindSmallestWithIndex.java?raw";
import findSmallestMultiple from "./topic15_files/FindSmallestMultiple.java?raw";
import findSmallestObjects from "./topic15_files/FindSmallestObjects.java?raw";

// SVG Components for Finding Smallest Element
const FindSmallestVisualSVG = () => {
  const [step, setStep] = useState(0);
  
  const stages = [
    { label: "Step 1: Initialize min = arr[0] = 45", array: [45, 67, 23, 89, 12, 78, 34], currentMin: 45, currentIndex: 0, comparing: -1 },
    { label: "Step 2: Compare 67 with min (45) → 67 > 45, no change", array: [45, 67, 23, 89, 12, 78, 34], currentMin: 45, currentIndex: 1, comparing: 1 },
    { label: "Step 3: Compare 23 with min (45) → 23 < 45, update min = 23", array: [45, 67, 23, 89, 12, 78, 34], currentMin: 23, currentIndex: 2, comparing: 2 },
    { label: "Step 4: Compare 89 with min (23) → 89 > 23, no change", array: [45, 67, 23, 89, 12, 78, 34], currentMin: 23, currentIndex: 3, comparing: 3 },
    { label: "Step 5: Compare 12 with min (23) → 12 < 23, update min = 12", array: [45, 67, 23, 89, 12, 78, 34], currentMin: 12, currentIndex: 4, comparing: 4 },
    { label: "Step 6: Compare 78 with min (12) → 78 > 12, no change", array: [45, 67, 23, 89, 12, 78, 34], currentMin: 12, currentIndex: 5, comparing: 5 },
    { label: "Step 7: Compare 34 with min (12) → 34 > 12, no change", array: [45, 67, 23, 89, 12, 78, 34], currentMin: 12, currentIndex: 6, comparing: 6 },
    { label: "✓ Complete! Smallest element is 12 at index 4", array: [45, 67, 23, 89, 12, 78, 34], currentMin: 12, currentIndex: -1, comparing: -1 }
  ];

  return (
    <div className="w-full">
      <svg viewBox="0 0 900 350" className="w-full h-auto max-w-5xl mx-auto my-4" aria-label="Finding Smallest Element Visualization">
        <defs>
          <linearGradient id="smallestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.2 }} />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>
        
        {/* Title */}
        <text x="450" y="25" textAnchor="middle" fill="#1e293b" dark:text-gray-200 fontSize="14" fontWeight="bold">
          {stages[step].label}
        </text>
        
        {/* Current Min Display */}
        <rect x="50" y="40" width="200" height="35" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
        <text x="150" y="62" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="bold">
          Current MIN: {stages[step].currentMin}
        </text>
        
        {/* Array Visualization */}
        {stages[step].array.map((val, idx) => (
          <g key={idx} transform={`translate(${idx * 100 + 50}, 100)`}>
            <rect 
              x="0" y="0" width="80" height="60" rx="6" 
              fill={val === stages[step].currentMin && stages[step].currentMin !== 45 ? "#d1fae5" : "#ffffff"}
              stroke={
                idx === stages[step].comparing ? "#10b981" : 
                (val === stages[step].currentMin && stages[step].currentMin !== 45 ? "#10b981" : "#cbd5e1")
              }
              strokeWidth={idx === stages[step].comparing ? "3" : "2"}
              className="transition-all duration-300 hover:shadow-lg"
              filter="url(#shadow)"
            >
              {idx === stages[step].comparing && (
                <animate attributeName="stroke" values="#10b981;#06b6d4;#10b981" dur="0.8s" repeatCount="indefinite" />
              )}
              {val === stages[step].currentMin && val !== 45 && idx !== stages[step].comparing && (
                <animate attributeName="fill" values="#d1fae5;#a7f3d0;#d1fae5" dur="1s" repeatCount="indefinite" />
              )}
            </rect>
            <text x="40" y="35" textAnchor="middle" fill="#1e293b" fontSize="22" fontWeight="bold">{val}</text>
            <text x="40" y="78" textAnchor="middle" fill="#94a3b8" fontSize="11">index {idx}</text>
            
            {/* Comparison indicator */}
            {idx === stages[step].comparing && (
              <g>
                <text x="40" y="-10" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Comparing →</text>
                <path d="M 40 -3 L 40 0" stroke="#10b981" strokeWidth="2" />
              </g>
            )}
            
            {/* Min indicator */}
            {val === stages[step].currentMin && val !== 45 && idx !== stages[step].comparing && stages[step].currentMin !== 12 && (
              <g>
                <text x="40" y="-10" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">✓ MIN</text>
                <path d="M 40 -3 L 40 0" stroke="#10b981" strokeWidth="2" />
              </g>
            )}
            
            {/* Final winner */}
            {val === 12 && stages[step].currentMin === 12 && stages[step].comparing === -1 && (
              <g>
                <text x="40" y="-10" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">🏆 SMALLEST!</text>
                <path d="M 40 -3 L 40 0" stroke="#10b981" strokeWidth="2" />
              </g>
            )}
          </g>
        ))}
        
        {/* Progress indicator */}
        <g transform="translate(50, 190)">
          <rect x="0" y="0" width="800" height="8" rx="4" fill="#e5e7eb" />
          <rect x="0" y="0" width={(step + 1) * 100} height="8" rx="4" fill="#10b981">
            <animate attributeName="width" values="0;800" dur="2s" repeatCount="indefinite" />
          </rect>
        </g>
        
        {/* Navigation Button */}
        <g transform="translate(350, 260)">
          <rect x="0" y="0" width="200" height="35" rx="8" fill="#10b981" className="cursor-pointer hover:fill-emerald-600 transition-all duration-300" />
          <text x="100" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="cursor-pointer">
            {step < 7 ? "Next Step →" : "Reset"}
          </text>
        </g>
      </svg>
      <div className="text-center mt-2">
        <button 
          onClick={() => setStep((step + 1) % 8)}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300"
        >
          {step < 7 ? "Next Step (Step " + (step + 2) + "/8)" : "Reset Animation"}
        </button>
      </div>
    </div>
  );
};

const FindMinAlgorithmFlowchartSVG = () => (
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
        min = arr[0]
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
      <polygon points="280,220 380,260 280,300 180,260" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
      <text x="280" y="265" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="bold">arr[i] &lt; min?</text>
      
      {/* Yes branch */}
      <line x1="380" y1="260" x2="480" y2="260" stroke="#10b981" strokeWidth="2" />
      <text x="430" y="253" textAnchor="middle" fill="#10b981" fontSize="11">YES</text>
      
      <rect x="480" y="240" width="100" height="40" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
      <text x="530" y="265" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">min = arr[i]</text>
      
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
      <text x="280" y="395" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">Print min</text>
      
      {/* Arrow to end */}
      <line x1="280" y1="410" x2="280" y2="440" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* End */}
      <ellipse cx="280" cy="460" rx="40" ry="20" fill="#ef4444" />
      <text x="280" y="465" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">END</text>
    </g>
  </svg>
);

const Topic15 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4">
            Finding the Smallest Element in an Array
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Linear scan to find minimum value - the mirror image of finding maximum
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
                  ? "bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600"
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
                  <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Finding Minimum Element
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Finding the smallest element is <strong className="text-emerald-600 dark:text-emerald-400">identical to finding the largest</strong> except we use the <strong className="text-emerald-600 dark:text-emerald-400">less than (&lt;) operator</strong> instead of greater than (&gt;). It's a fundamental linear scan algorithm that tracks the current minimum.
                  </p>
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-emerald-800 dark:text-emerald-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public static int findMin(int[] arr)</code><br />
                      <strong>Return Type:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int</code> (minimum value)<br />
                      <strong>Purpose:</strong> Find the smallest value in any array<br />
                      <strong>Key Insight:</strong> Only the comparison operator changes from finding max!
                    </p>
                  </div>
                </div>
              </div>

              {/* Max vs Min Comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🔄 Finding Max vs Finding Min</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Finding Maximum</h3>
                    <code className="block bg-gray-900 text-green-400 p-2 rounded text-sm">
                      {`int max = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) {  // > operator
        max = arr[i];
    }
}`}
                    </code>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-2">Largest value emerges</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">Finding Minimum</h3>
                    <code className="block bg-gray-900 text-green-400 p-2 rounded text-sm">
                      {`int min = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] < min) {  // < operator
        min = arr[i];
    }
}`}
                    </code>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-2">Smallest value emerges</p>
                  </div>
                </div>
                <p className="text-center text-gray-600 dark:text-gray-300 mt-4 text-sm">
                  💡 Only ONE character changes: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&gt;</code> becomes <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;</code>
                </p>
              </div>

              {/* How It Works */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>1️⃣ <strong>Initialize</strong> min = arr[0] (assume first element is smallest)</p>
                    <p>2️⃣ <strong>Traverse</strong> array from index 1 to n-1</p>
                    <p>3️⃣ <strong>Compare</strong> each element with current min</p>
                    <p>4️⃣ <strong>Update min</strong> if current element is smaller</p>
                    <p>5️⃣ <strong>After loop</strong>, min contains the smallest value</p>
                    <p>6️⃣ <strong>Optional</strong> - Track index of min element</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Analogy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding lightest backpack:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside">
                      <li>Start with first backpack's weight as lightest</li>
                      <li>Check each backpack one by one</li>
                      <li>If lighter found, update lightest</li>
                      <li>After checking all, you know the lightest!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💰 Lowest Price</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Shopping app finding cheapest product in Barrackpore market - comparing prices to find minimum!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🏃 Fastest Race Time</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Sports meet finding winner - smallest time wins!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🌡️ Lowest Temperature</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Weather app finding coldest day in Shyamnagar this week.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Lowest Score</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Teacher finding lowest test score to identify students needing extra help.</p>
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
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Works fine - most negative is minimum</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-semibold text-yellow-800">Empty array</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Should throw exception or return special value</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Tips & Tricks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>One character difference:</strong> Finding min uses <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;</code> instead of <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&gt;</code></li>
                  <li>• <strong>Track index too:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">minIndex</code> if position matters</li>
                  <li>• <strong>Handle empty array:</strong> Always check <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">if (arr == null || arr.length == 0)</code></li>
                  <li>• <strong>Use Integer.MAX_VALUE:</strong> Alternative initialization for empty check</li>
                  <li>• <strong>Find both min and max:</strong> Can do in single pass for efficiency!</li>
                </ul>
              </div>

              <Teacher note="Finding min is the perfect partner to finding max! I tell students: 'If you can find the tallest, you can find the shortest - just flip the comparison.' This builds pattern recognition. Challenge: Find both min and max in one pass - it's only slightly more complex!" />
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">👁️ Visual Walkthrough</h2>
                <FindSmallestVisualSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Watch how the minimum value updates as we scan through the array
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📐 Algorithm Flowchart</h2>
                <FindMinAlgorithmFlowchartSVG />
              </div>

              {/* Dry Run Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📝 Dry Run Example</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Step</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">i</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">arr[i]</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Current Min</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Comparison</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { step: 1, i: 0, val: 45, min: 45, compare: "-", action: "Initialize min = 45" },
                        { step: 2, i: 1, val: 67, min: 45, compare: "67 < 45? No", action: "No change" },
                        { step: 3, i: 2, val: 23, min: 45, compare: "23 < 45? Yes", action: "✓ Update min = 23" },
                        { step: 4, i: 3, val: 89, min: 23, compare: "89 < 23? No", action: "No change" },
                        { step: 5, i: 4, val: 12, min: 23, compare: "12 < 23? Yes", action: "✓ Update min = 12" },
                        { step: 6, i: 5, val: 78, min: 12, compare: "78 < 12? No", action: "No change" },
                        { step: 7, i: 6, val: 34, min: 12, compare: "34 < 12? No", action: "No change" }
                      ].map((row, i) => (
                        <tr key={i} className={row.action.includes("Update") ? "bg-emerald-50 dark:bg-emerald-900/20" : ""}>
                          <td className="px-3 py-2 text-sm">{row.step}</td>
                          <td className="px-3 py-2 text-sm">{row.i}</td>
                          <td className="px-3 py-2 text-sm">{row.val}</td>
                          <td className="px-3 py-2 text-sm font-semibold">{row.min}</td>
                          <td className="px-3 py-2 text-sm">{row.compare}</td>
                          <td className="px-3 py-2 text-sm">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Teacher note="The visual animation clearly shows the 'min' variable decreasing. I have students compare this with the max animation - they'll see it's the mirror image. This reinforces that algorithms are patterns, and small changes produce different results!" />
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <JavaFileLoader 
                    fileModule={findSmallestBasic}
                    title="FindSmallestBasic.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={findSmallestWithIndex}
                    title="FindSmallestWithIndex.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={findSmallestMultiple}
                    title="FindSmallestMultiple.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={findSmallestObjects}
                    title="FindSmallestObjects.java"
                    highlightLines={[]}
                  />
                </div>
              </div>

              <Teacher note="Compare the code with find max - they're almost identical! This is a powerful lesson: understanding one operation teaches the other. Have students modify the max code to find min by changing just one character. This builds confidence and pattern recognition!" />
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
                      <p className="font-semibold">Using &gt; instead of &lt;</p>
                      <p className="text-sm">Using <code className="bg-gray-200 px-1 rounded">if (arr[i] > min)</code> finds maximum instead of minimum!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Initializing min = 0</p>
                      <p className="text-sm">Fails if all numbers are positive - min would incorrectly remain 0</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Not handling empty array</p>
                      <p className="text-sm">Accessing arr[0] on empty array causes ArrayIndexOutOfBoundsException</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Best Practices</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Always check for null and empty array before processing</li>
                  <li>Use <code className="bg-gray-200 px-1 rounded">Integer.MAX_VALUE</code> for generic initialization</li>
                  <li>Consider returning index instead of value when position matters</li>
                  <li>Document behavior for empty arrays (exception or special return)</li>
                  <li>Use meaningful variable names: <code className="bg-gray-200 px-1 rounded">minValue</code> not <code className="bg-gray-200 px-1 rounded">m</code></li>
                </ul>
              </div>

              {/* Hint Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💭 Think About...</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>🤔 How would you find the second smallest element?</li>
                  <li>🤔 Can we find both min and max in fewer than 2n comparisons?</li>
                  <li>🤔 How would you find the minimum absolute value?</li>
                  <li>🤔 What's the difference between finding min in sorted vs unsorted array?</li>
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

              <Teacher note="Finding min reinforces the pattern from finding max. I challenge students: 'Write one method that can find either min or max based on a parameter.' This builds flexible, reusable code skills. In Barrackpoor, we use min to find lowest scores for improvement plans!" />
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
    question: "What is the time complexity of finding minimum in an array?",
    answer: "O(n) - must examine every element to ensure we found the smallest value."
  },
  {
    question: "Why do we initialize min with arr[0]?",
    answer: "To have a starting point for comparison. If array has at least one element, arr[0] is a valid starting minimum."
  },
  {
    question: "What's the only difference between finding max and finding min?",
    answer: "The comparison operator changes from > to <. Everything else remains identical!"
  },
  {
    question: "What if array has only one element?",
    answer: "The loop doesn't execute, and min (initialized to arr[0]) correctly returns that element."
  },
  {
    question: "How to handle empty array?",
    answer: "Check arr == null || arr.length == 0 first. Either throw IllegalArgumentException or return Integer.MAX_VALUE."
  },
  {
    question: "How to find both minimum and maximum in one pass?",
    answer: "Track both min and max simultaneously, updating both as you traverse the array once."
  },
  {
    question: "What's the space complexity of finding minimum?",
    answer: "O(1) - only uses a few variables regardless of array size."
  },
  {
    question: "Can we find minimum in sorted array faster?",
    answer: "If ascending, min is first element O(1). If descending, min is last element O(1)."
  },
  {
    question: "How to find minimum using streams?",
    answer: "Arrays.stream(arr).min().getAsInt() - but still O(n) internally."
  },
  {
    question: "What's wrong with initializing min = 0?",
    answer: "Fails if all numbers are positive - min would incorrectly remain 0 instead of actual minimum."
  },
  {
    question: "How to find minimum absolute value?",
    answer: "Compare Math.abs(arr[i]) instead of arr[i] directly, but careful with sign."
  },
  {
    question: "How to find second smallest element?",
    answer: "Track both smallest and second smallest during single pass, updating both appropriately."
  },
  {
    question: "What's the best case for finding minimum?",
    answer: "Still O(n) - you always need to verify no smaller element exists later in array."
  },
  {
    question: "How to find minimum in 2D array?",
    answer: "Nested loops - outer for rows, inner for columns, update min when smaller found."
  },
  {
    question: "Can we use divide and conquer to find min?",
    answer: "Yes - split array, find min in left and right halves, return smaller. Still O(n) but uses recursion."
  },
  {
    question: "How to find bottom 3 minimum values?",
    answer: "Track three variables: first, second, third min. Update accordingly when smaller found."
  },
  {
    question: "What's the difference between min and minimum?",
    answer: "Same concept - 'min' is commonly used abbreviation for minimum."
  },
  {
    question: "How to find min in ArrayList?",
    answer: "Collections.min(list) or manual loop with list.get(i)."
  },
  {
    question: "Why can't we use sorting to find min?",
    answer: "We can, but sorting is O(n log n) - slower than direct O(n) scan."
  },
  {
    question: "How to find minimum of custom objects?",
    answer: "Implement Comparable interface and use compareTo(), or provide Comparator."
  }
];

export default Topic15;