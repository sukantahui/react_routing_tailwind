import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files
import selectionSortBasic from "./topic12_files/SelectionSortBasic.java?raw";
import selectionSortOptimized from "./topic12_files/SelectionSortOptimized.java?raw";
import selectionSortStepByStep from "./topic12_files/SelectionSortStepByStep.java?raw";
import selectionSortWithObjects from "./topic12_files/SelectionSortWithObjects.java?raw";

// SVG Components for Selection Sort Visualization
const SelectionSortVisualSVG = () => {
  const [step, setStep] = useState(0);
  
  const passes = [
    { label: "Pass 1: Find minimum from indices 0-6 → 11 at index 5", array: [64, 25, 12, 22, 11, 90, 34], minIndex: 5, swapIndices: [0, 5] },
    { label: "Pass 2: Find minimum from indices 1-6 → 12 at index 2", array: [11, 25, 12, 22, 64, 90, 34], minIndex: 2, swapIndices: [1, 2] },
    { label: "Pass 3: Find minimum from indices 2-6 → 22 at index 3", array: [11, 12, 25, 22, 64, 90, 34], minIndex: 3, swapIndices: [2, 3] },
    { label: "Pass 4: Find minimum from indices 3-6 → 25 at index 4", array: [11, 12, 22, 25, 64, 90, 34], minIndex: 4, swapIndices: [3, 4] },
    { label: "Pass 5: Find minimum from indices 4-6 → 34 at index 6", array: [11, 12, 22, 25, 64, 90, 34], minIndex: 6, swapIndices: [4, 6] },
    { label: "Pass 6: Final sorted array!", array: [11, 12, 22, 25, 34, 64, 90], minIndex: -1, swapIndices: [] }
  ];

  return (
    <div className="w-full">
      <svg viewBox="0 0 900 300" className="w-full h-auto max-w-5xl mx-auto my-4" aria-label="Selection Sort Visualization">
        <defs>
          <linearGradient id="selectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 0.2 }} />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
          </marker>
        </defs>
        
        {/* Title */}
        <text x="450" y="25" textAnchor="middle" fill="#1e293b" dark:text-gray-200 fontSize="14" fontWeight="bold">
          {passes[step].label}
        </text>
        
        {/* Sorted boundary indicator */}
        <rect x="50" y="40" width={step * 110 + 60} height="4" rx="2" fill="#10b981" />
        <text x="50" y="35" fill="#10b981" fontSize="11" fontWeight="bold">✓ Sorted Region</text>
        
        {/* Array Visualization */}
        {passes[step].array.map((val, idx) => (
          <g key={idx} transform={`translate(${idx * 110 + 50}, 60)`}>
            <rect 
              x="0" y="0" width="90" height="60" rx="6" 
              fill={idx < step ? "#dcfce7" : "#ffffff"} 
              stroke={idx === passes[step].minIndex ? "#f59e0b" : (idx < step ? "#10b981" : "#8b5cf6")} 
              strokeWidth={idx === passes[step].minIndex ? "4" : "2"}
              className="transition-all duration-300 hover:shadow-lg"
              filter="url(#shadow)"
            >
              {idx === passes[step].minIndex && (
                <animate attributeName="stroke" values="#f59e0b;#8b5cf6;#f59e0b" dur="1s" repeatCount="indefinite" />
              )}
            </rect>
            <text x="45" y="35" textAnchor="middle" fill="#1e293b" fontSize="20" fontWeight="bold">{val}</text>
            <text x="45" y="78" textAnchor="middle" fill="#94a3b8" fontSize="11">index {idx}</text>
            
            {/* Minimum label */}
            {idx === passes[step].minIndex && (
              <g>
                <text x="45" y="-10" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">✓ MIN</text>
                <path d="M 45 -5 L 45 0" stroke="#f59e0b" strokeWidth="2" />
              </g>
            )}
            
            {/* Current position indicator */}
            {idx === step && idx < passes[step].array.length - 1 && (
              <g>
                <text x="45" y="95" textAnchor="middle" fill="#8b5cf6" fontSize="11">current</text>
                <path d="M 45 90 L 45 85" stroke="#8b5cf6" strokeWidth="2" />
              </g>
            )}
          </g>
        ))}
        
        {/* Swap visualization */}
        {passes[step].swapIndices.length === 2 && (
          <g>
            <path 
              d={`M ${passes[step].swapIndices[0] * 110 + 95} 90 Q ${(passes[step].swapIndices[0] + passes[step].swapIndices[1]) * 55 + 95} 130 ${passes[step].swapIndices[1] * 110 + 95} 90`}
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="2" 
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            >
              <animate attributeName="stroke-dashoffset" values="0;10" dur="0.5s" repeatCount="indefinite" />
            </path>
            <text x={450} y="150" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">SWAP</text>
          </g>
        )}
        
        {/* Navigation Button */}
        <g transform="translate(350, 220)">
          <rect x="0" y="0" width="200" height="35" rx="8" fill="#8b5cf6" className="cursor-pointer hover:fill-purple-600 transition-all duration-300" />
          <text x="100" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="cursor-pointer">
            {step < 5 ? "Next Pass →" : "Reset"}
          </text>
        </g>
      </svg>
      <div className="text-center mt-2">
        <button 
          onClick={() => setStep((step + 1) % 6)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300"
        >
          {step < 5 ? "Next Pass (Step " + (step + 2) + "/6)" : "Reset Animation"}
        </button>
      </div>
    </div>
  );
};

const SelectionSortAlgorithmSVG = () => (
  <svg viewBox="0 0 700 500" className="w-full h-auto max-w-3xl mx-auto my-4">
    <g transform="translate(20, 20)">
      {/* Start */}
      <ellipse cx="330" cy="20" rx="40" ry="20" fill="#10b981" />
      <text x="330" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">START</text>
      
      {/* Arrow */}
      <line x1="330" y1="40" x2="330" y2="70" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Outer Loop */}
      <rect x="180" y="70" width="300" height="45" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="330" y="97" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">
        for i = 0 to n-1
      </text>
      
      {/* Arrow */}
      <line x1="330" y1="115" x2="330" y2="145" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Initialize min */}
      <rect x="150" y="145" width="360" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="330" y="170" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">
        minIndex = i
      </text>
      
      {/* Arrow */}
      <line x1="330" y1="185" x2="330" y2="215" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Inner Loop */}
      <rect x="150" y="215" width="360" height="45" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
      <text x="330" y="242" textAnchor="middle" fill="#9d174d" fontSize="12" fontWeight="bold">
        for j = i+1 to n-1
      </text>
      
      {/* Arrow */}
      <line x1="330" y1="260" x2="330" y2="290" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Comparison Decision */}
      <polygon points="330,290 430,330 330,370 230,330" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
      <text x="330" y="335" textAnchor="middle" fill="#9d174d" fontSize="11" fontWeight="bold">arr[j] &lt; arr[minIndex]?</text>
      
      {/* Yes branch */}
      <line x1="430" y1="330" x2="530" y2="330" stroke="#10b981" strokeWidth="2" />
      <text x="480" y="323" textAnchor="middle" fill="#10b981" fontSize="11">YES</text>
      
      <rect x="530" y="310" width="130" height="40" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
      <text x="595" y="335" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">minIndex = j</text>
      
      {/* No branch - continue inner loop */}
      <line x1="230" y1="330" x2="130" y2="330" stroke="#ef4444" strokeWidth="2" />
      <text x="180" y="323" textAnchor="middle" fill="#ef4444" fontSize="11">NO</text>
      
      <rect x="20" y="310" width="110" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="75" y="335" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">Continue</text>
      
      {/* Loop back for inner loop */}
      <path d="M 595 350 L 595 390 L 330 390 L 330 370" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
      
      {/* After inner loop - swap */}
      <rect x="200" y="420" width="260" height="40" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
      <text x="330" y="445" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">
        swap(arr[i], arr[minIndex])
      </text>
      
      {/* Arrow to outer loop */}
      <path d="M 330 460 L 330 395 L 330 375" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* End */}
      <ellipse cx="330" cy="480" rx="40" ry="20" fill="#ef4444" />
      <text x="330" y="485" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">END</text>
    </g>
  </svg>
);

const ComplexityComparisonSVG = () => (
  <svg viewBox="0 0 700 180" className="w-full h-auto max-w-3xl mx-auto my-4">
    <rect x="50" y="20" width="280" height="140" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
    <text x="190" y="50" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="bold">Bubble Sort</text>
    <text x="190" y="75" textAnchor="middle" fill="#7f1d1d" fontSize="12">Best: O(n²)</text>
    <text x="190" y="95" textAnchor="middle" fill="#7f1d1d" fontSize="12">Avg: O(n²)</text>
    <text x="190" y="115" textAnchor="middle" fill="#7f1d1d" fontSize="12">Worst: O(n²)</text>
    <text x="190" y="140" textAnchor="middle" fill="#7f1d1d" fontSize="12">Many swaps</text>
    
    <rect x="370" y="20" width="280" height="140" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5" />
    <text x="510" y="50" textAnchor="middle" fill="#14532d" fontSize="14" fontWeight="bold">Selection Sort</text>
    <text x="510" y="75" textAnchor="middle" fill="#166534" fontSize="12">Best: O(n²)</text>
    <text x="510" y="95" textAnchor="middle" fill="#166534" fontSize="12">Avg: O(n²)</text>
    <text x="510" y="115" textAnchor="middle" fill="#166534" fontSize="12">Worst: O(n²)</text>
    <text x="510" y="140" textAnchor="middle" fill="#166534" fontSize="12">Minimal swaps (n swaps)</text>
  </svg>
);

const Topic12 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
            Selection Sort - Ascending Order
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Selecting the minimum element and placing it at the beginning - the intuitive sorting algorithm
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
                  What is Selection Sort?
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Selection sort is an <strong className="text-purple-600 dark:text-purple-400">in-place comparison sorting algorithm</strong> that divides the array into sorted and unsorted regions. It repeatedly <strong className="text-purple-600 dark:text-purple-400">selects the minimum element</strong> from the unsorted region and swaps it with the first element of the unsorted region.
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-purple-800 dark:text-purple-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public static void selectionSort(int[] arr)</code><br />
                      <strong>Return Type:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">void</code> (sorts in-place)<br />
                      <strong>Key Feature:</strong> Makes only O(n) swaps - minimal swapping!
                    </p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ How Selection Sort Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>1️⃣ <strong>Divide</strong> array into sorted (left) and unsorted (right) regions</p>
                    <p>2️⃣ <strong>Find minimum</strong> element in unsorted region</p>
                    <p>3️⃣ <strong>Swap</strong> minimum with first element of unsorted region</p>
                    <p>4️⃣ <strong>Expand</strong> sorted region by one element</p>
                    <p>5️⃣ <strong>Repeat</strong> until entire array is sorted</p>
                    <p>6️⃣ <strong>Result</strong> - Each pass places one element in final position</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Analogy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Organizing a deck of cards:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside">
                      <li>Look through unsorted cards for smallest</li>
                      <li>Place it at the beginning of sorted pile</li>
                      <li>Repeat with remaining cards</li>
                      <li>Each pass finds the next smallest!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🎯 Prize Distribution</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Teacher Sukanta Hui selects the highest scorer first, then next highest - selection sort in action!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📋 To-Do List Prioritization</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding the most important task first, then next important - selecting priorities!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🏃 Race Ranking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Selecting fastest runner first (gold), then second fastest (silver) - selection sort!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Exam Grading</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding top score in Barrackpore school, then second highest - selection sort naturally!</p>
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
                    <p className="text-xl font-bold text-green-600">O(n²)</p>
                    <p className="text-xs">Always n² comparisons</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Average Case</p>
                    <p className="text-xl font-bold text-yellow-600">O(n²)</p>
                    <p className="text-xs">n²/2 comparisons</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Worst Case</p>
                    <p className="text-xl font-bold text-red-600">O(n²)</p>
                    <p className="text-xs">n² comparisons</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Swaps</p>
                    <p className="text-xl font-bold text-blue-600">O(n)</p>
                    <p className="text-xs">Only n swaps total!</p>
                  </div>
                </div>
              </div>

              {/* Properties */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✨ Properties of Selection Sort</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-red-600">✗ Unstable Sort</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Equal elements may change relative order</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-blue-600">✓ In-place Algorithm</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">No extra memory needed (O(1) space)</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-yellow-600">✓ Non-adaptive</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Always O(n²) even if array sorted</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-green-600">✓ Minimal Swaps</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Only n swaps total - great for expensive swap operations!</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Tips & Tricks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Minimal swaps:</strong> Perfect when swapping is expensive (e.g., large objects)</li>
                  <li>• <strong>Predictable performance:</strong> Always O(n²) - no worst-case surprises</li>
                  <li>• <strong>Memory efficient:</strong> Great for memory-constrained environments</li>
                  <li>• <strong>Easy to implement:</strong> Simpler than quicksort or mergesort</li>
                  <li>• <strong>Small datasets:</strong> Works well for n &lt; 1000</li>
                </ul>
              </div>

              <Teacher note="Selection sort's beauty is its simplicity and minimal swapping! I tell students in Barrackpore: 'Think of it as picking the best apple from a basket, then the next best, then the next.' Unlike bubble sort, each pass guarantees one element is in final position. Have them count swaps vs comparisons - eye-opening!" />
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">👁️ Visual Walkthrough</h2>
                <SelectionSortVisualSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Watch how the minimum element is selected and swapped to its correct position each pass
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📐 Algorithm Flowchart</h2>
                <SelectionSortAlgorithmSVG />
              </div>

              {/* Step-by-step trace */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📝 Dry Run Example</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Pass</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">i</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">minIndex</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Found Minimum</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Swap</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Array After</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { pass: 1, i: 0, min: 5, found: '11 at index 5', swap: 'swap(0,5)', result: '[11, 25, 12, 22, 64, 90, 34]' },
                        { pass: 2, i: 1, min: 2, found: '12 at index 2', swap: 'swap(1,2)', result: '[11, 12, 25, 22, 64, 90, 34]' },
                        { pass: 3, i: 2, min: 3, found: '22 at index 3', swap: 'swap(2,3)', result: '[11, 12, 22, 25, 64, 90, 34]' },
                        { pass: 4, i: 3, min: 3, found: '25 at index 3', swap: 'swap(3,3) - no swap', result: '[11, 12, 22, 25, 64, 90, 34]' },
                        { pass: 5, i: 4, min: 6, found: '34 at index 6', swap: 'swap(4,6)', result: '[11, 12, 22, 25, 34, 90, 64]' },
                        { pass: 6, i: 5, min: 6, found: '64 at index 6', swap: 'swap(5,6)', result: '[11, 12, 22, 25, 34, 64, 90]' }
                      ].map((row, i) => (
                        <tr key={i} className={row.swap !== 'swap(i,i) - no swap' && row.swap !== 'swap(3,3) - no swap' ? 'bg-purple-50 dark:bg-purple-900/10' : ''}>
                          <td className="px-3 py-2 text-sm">{row.pass}</td>
                          <td className="px-3 py-2 text-sm">{row.i}</td>
                          <td className="px-3 py-2 text-sm">{row.min}</td>
                          <td className="px-3 py-2 text-sm">{row.found}</td>
                          <td className="px-3 py-2 text-sm">{row.swap}</td>
                          <td className="px-3 py-2 text-sm font-mono">{row.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Teacher note="The visual representation clearly shows the sorted region growing from left to right. Have students predict which element will be selected next - this builds intuition! In my Ichapur class, we use playing cards to physically demonstrate selection sort - students love it!" />
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <JavaFileLoader 
                    fileModule={selectionSortBasic}
                    title="SelectionSortBasic.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={selectionSortOptimized}
                    title="SelectionSortOptimized.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={selectionSortStepByStep}
                    title="SelectionSortStepByStep.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={selectionSortWithObjects}
                    title="SelectionSortWithObjects.java"
                    highlightLines={[]}
                  />
                </div>
              </div>

              <Teacher note="Notice how selection sort differs from bubble sort - bubble sort swaps many times, selection sort finds minimum first then swaps once per pass. This is a great lesson in algorithm design: different approaches to same problem!" />
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
                      <p className="font-semibold">Wrong minIndex initialization</p>
                      <p className="text-sm">Always initialize minIndex = i at start of each pass, not 0!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Off-by-one in inner loop</p>
                      <p className="text-sm">Inner loop should run j = i+1 to n, not j = 0 to n</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Swapping with itself</p>
                      <p className="text-sm">Check if minIndex != i before swapping to avoid unnecessary swap</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Best Practices</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Use <code className="bg-gray-200 px-1 rounded">minIndex</code> variable name clearly indicating purpose</li>
                  <li>Add check <code className="bg-gray-200 px-1 rounded">if (minIndex != i)</code> before swapping</li>
                  <li>Extract findMin and swap into separate methods for clarity</li>
                  <li>Consider using for selection sort when swaps are expensive</li>
                  <li>Document that algorithm is unstable for objects with equal keys</li>
                </ul>
              </div>

              {/* Hint Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💭 Think About...</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>🤔 Why does selection sort make fewer swaps than bubble sort?</li>
                  <li>🤔 How would you modify selection sort to sort in descending order?</li>
                  <li>🤔 Why is selection sort considered unstable? Can you find an example?</li>
                  <li>🤔 When would you choose selection sort over bubble sort?</li>
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

              <Teacher note="Selection sort is excellent for teaching the concept of 'selecting' vs 'bubbling'. Have students implement both and count operations - they'll discover selection sort does fewer swaps! This builds appreciation for algorithm efficiency beyond just Big O notation." />
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
    question: "What is selection sort and how does it work?",
    answer: "Selection sort divides array into sorted/unsorted regions, finds minimum in unsorted region, and swaps it with first unsorted element. Repeats until sorted."
  },
  {
    question: "What is the time complexity of selection sort?",
    answer: "O(n²) for best, average, and worst cases. Always performs n(n-1)/2 comparisons regardless of input order."
  },
  {
    question: "How many swaps does selection sort make?",
    answer: "At most n-1 swaps total (one per pass). This is minimal among comparison-based sorting algorithms."
  },
  {
    question: "Is selection sort stable?",
    answer: "No, selection sort is unstable. Equal elements may change relative order when swapping non-adjacent elements."
  },
  {
    question: "Why is selection sort better than bubble sort?",
    answer: "Selection sort makes far fewer swaps (O(n) vs O(n²)). However, both have same O(n²) comparisons."
  },
  {
    question: "What's the space complexity of selection sort?",
    answer: "O(1) - sorts in-place using only a few variables (minIndex, temp). No extra arrays needed."
  },
  {
    question: "When should you use selection sort?",
    answer: "When swapping is expensive (large objects), memory is limited, or dataset is small (n < 1000)."
  },
  {
    question: "How to sort in descending order using selection sort?",
    answer: "Find maximum instead of minimum in unsorted region, or use comparator that reverses comparison."
  },
  {
    question: "Why does selection sort always perform O(n²) comparisons?",
    answer: "It always scans entire unsorted region regardless of order - no early termination like bubble sort."
  },
  {
    question: "How does selection sort compare to insertion sort?",
    answer: "Insertion sort is adaptive (O(n) for sorted data) and stable. Selection sort has fewer swaps but more comparisons."
  },
  {
    question: "What's the best case for selection sort?",
    answer: "Best case is also O(n²) - even if array sorted, it still scans all elements to find minimum."
  },
  {
    question: "How to implement selection sort for strings?",
    answer: "Use compareTo() method to compare strings. Find smallest string lexicographically and swap."
  },
  {
    question: "Why is selection sort called 'selection' sort?",
    answer: "Because each pass 'selects' the minimum element from unsorted portion and places it in correct position."
  },
  {
    question: "Can selection sort be made stable?",
    answer: "Yes, by inserting instead of swapping, but that requires O(n) extra space or linked list implementation."
  },
  {
    question: "How many comparisons for n=100?",
    answer: "n(n-1)/2 = 100*99/2 = 4,950 comparisons regardless of input order."
  },
  {
    question: "What happens if array is already sorted?",
    answer: "Selection sort still performs all n(n-1)/2 comparisons but only n-1 swaps (each swap with itself)."
  },
  {
    question: "How to find kth smallest using selection sort?",
    answer: "Run selection sort for k passes - the kth element placed is the kth smallest. More efficient than full sort."
  },
  {
    question: "Why isn't selection sort used in practice?",
    answer: "O(n²) is too slow for large datasets. Better algorithms like quicksort O(n log n) are preferred."
  },
  {
    question: "How to optimize selection sort?",
    answer: "Can find both min and max in same pass (double selection sort), reducing passes by half."
  },
  {
    question: "Is selection sort adaptive?",
    answer: "No, it's non-adaptive. Performance doesn't improve with partially sorted data - always O(n²) comparisons."
  }
];

export default Topic12;