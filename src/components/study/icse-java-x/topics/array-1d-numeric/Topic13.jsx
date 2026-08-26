import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files
import selectionSortDescending from "./topic13_files/SelectionSortDescending.java?raw";
import selectionSortDescendingOptimized from "./topic13_files/SelectionSortDescendingOptimized.java?raw";
import selectionSortDescendingStepByStep from "./topic13_files/SelectionSortDescendingStepByStep.java?raw";
import selectionSortDescendingObjects from "./topic13_files/SelectionSortDescendingObjects.java?raw";

// SVG Components for Descending Selection Sort Visualization
const SelectionSortDescendingVisualSVG = () => {
  const [step, setStep] = useState(0);
  
  const passes = [
    { label: "Pass 1: Find maximum from indices 0-6 → 90 at index 5", array: [64, 25, 12, 22, 11, 90, 34], maxIndex: 5, swapIndices: [0, 5] },
    { label: "Pass 2: Find maximum from indices 1-6 → 64 at index 4", array: [90, 25, 12, 22, 11, 64, 34], maxIndex: 4, swapIndices: [1, 4] },
    { label: "Pass 3: Find maximum from indices 2-6 → 34 at index 6", array: [90, 64, 12, 22, 11, 25, 34], maxIndex: 6, swapIndices: [2, 6] },
    { label: "Pass 4: Find maximum from indices 3-6 → 25 at index 5", array: [90, 64, 34, 22, 11, 25, 12], maxIndex: 5, swapIndices: [3, 5] },
    { label: "Pass 5: Find maximum from indices 4-6 → 22 at index 4", array: [90, 64, 34, 25, 11, 22, 12], maxIndex: 4, swapIndices: [4, 4] },
    { label: "Pass 6: Find maximum from indices 5-6 → 12 at index 6", array: [90, 64, 34, 25, 22, 11, 12], maxIndex: 6, swapIndices: [5, 6] },
    { label: "Pass 7: Final sorted descending array!", array: [90, 64, 34, 25, 22, 12, 11], maxIndex: -1, swapIndices: [] }
  ];

  return (
    <div className="w-full">
      <svg viewBox="0 0 900 320" className="w-full h-auto max-w-5xl mx-auto my-4" aria-label="Descending Selection Sort Visualization">
        <defs>
          <linearGradient id="selectionDescGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#f43f5e', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.2 }} />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f43f5e" />
          </marker>
        </defs>
        
        {/* Title */}
        <text x="450" y="25" textAnchor="middle" fill="#1e293b" dark:text-gray-200 fontSize="14" fontWeight="bold">
          {passes[step].label}
        </text>
        
        {/* Sorted boundary indicator (left side for descending) */}
        <rect x="50" y="40" width={step * 110 + 60} height="4" rx="2" fill="#10b981" />
        <text x="50" y="35" fill="#10b981" fontSize="11" fontWeight="bold">✓ Sorted Region (Largest First)</text>
        
        {/* Arrow showing largest moving left */}
        <g transform="translate(380, 55)">
          <path d="M 0 0 L 20 15 L 0 30" fill="none" stroke="#f43f5e" strokeWidth="2" />
          <text x="25" y="20" fill="#f43f5e" fontSize="11" fontWeight="bold">Largest →</text>
        </g>
        
        {/* Array Visualization */}
        {passes[step].array.map((val, idx) => (
          <g key={idx} transform={`translate(${idx * 110 + 50}, 80)`}>
            <rect 
              x="0" y="0" width="90" height="60" rx="6" 
              fill={idx < step ? "#dcfce7" : "#ffffff"} 
              stroke={idx === passes[step].maxIndex ? "#f59e0b" : (idx < step ? "#10b981" : "#f43f5e")} 
              strokeWidth={idx === passes[step].maxIndex ? "4" : "2"}
              className="transition-all duration-300 hover:shadow-lg"
              filter="url(#shadow)"
            >
              {idx === passes[step].maxIndex && (
                <animate attributeName="stroke" values="#f59e0b;#f43f5e;#f59e0b" dur="1s" repeatCount="indefinite" />
              )}
            </rect>
            <text x="45" y="35" textAnchor="middle" fill="#1e293b" fontSize="20" fontWeight="bold">{val}</text>
            <text x="45" y="78" textAnchor="middle" fill="#94a3b8" fontSize="11">index {idx}</text>
            
            {/* Maximum label */}
            {idx === passes[step].maxIndex && (
              <g>
                <text x="45" y="-10" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">✓ MAX</text>
                <path d="M 45 -5 L 45 0" stroke="#f59e0b" strokeWidth="2" />
              </g>
            )}
            
            {/* Current position indicator */}
            {idx === step && idx < passes[step].array.length - 1 && (
              <g>
                <text x="45" y="95" textAnchor="middle" fill="#f43f5e" fontSize="11">position</text>
                <path d="M 45 90 L 45 85" stroke="#f43f5e" strokeWidth="2" />
              </g>
            )}
          </g>
        ))}
        
        {/* Swap visualization */}
        {passes[step].swapIndices.length === 2 && passes[step].swapIndices[0] !== passes[step].swapIndices[1] && (
          <g>
            <path 
              d={`M ${passes[step].swapIndices[0] * 110 + 95} 110 Q ${(passes[step].swapIndices[0] + passes[step].swapIndices[1]) * 55 + 95} 150 ${passes[step].swapIndices[1] * 110 + 95} 110`}
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="2" 
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            >
              <animate attributeName="stroke-dashoffset" values="0;10" dur="0.5s" repeatCount="indefinite" />
            </path>
            <text x={450} y="165" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">SWAP</text>
          </g>
        )}
        
        {/* Navigation Button */}
        <g transform="translate(350, 240)">
          <rect x="0" y="0" width="200" height="35" rx="8" fill="#f43f5e" className="cursor-pointer hover:fill-rose-600 transition-all duration-300" />
          <text x="100" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="cursor-pointer">
            {step < 6 ? "Next Pass →" : "Reset"}
          </text>
        </g>
      </svg>
      <div className="text-center mt-2">
        <button 
          onClick={() => setStep((step + 1) % 7)}
          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all duration-300"
        >
          {step < 6 ? "Next Pass (Step " + (step + 2) + "/7)" : "Reset Animation"}
        </button>
      </div>
    </div>
  );
};

const AscendingVsDescendingSelectionSVG = () => (
  <svg viewBox="0 0 700 300" className="w-full h-auto max-w-3xl mx-auto my-4">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
      </marker>
    </defs>
    
    {/* Ascending Section */}
    <rect x="50" y="20" width="280" height="250" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
    <text x="190" y="50" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="bold">Ascending Selection</text>
    <text x="190" y="75" textAnchor="middle" fill="#3b82f6" fontSize="12">Find MINIMUM each pass</text>
    
    {/* Ascending Array Example */}
    <g transform="translate(70, 100)">
      {[11, 12, 22, 25, 34, 64, 90].map((val, idx) => (
        <g key={idx} transform={`translate(${idx * 38}, 0)`}>
          <rect x="0" y="0" width="32" height="40" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="16" y="25" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">{val}</text>
        </g>
      ))}
    </g>
    <text x="190" y="175" textAnchor="middle" fill="#1e3a8a" fontSize="12">Smallest → Largest</text>
    <path d="M 80 195 L 300 195" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
    <text x="190" y="215" textAnchor="middle" fill="#3b82f6" fontSize="11">Increasing order</text>
    <text x="190" y="240" textAnchor="middle" fill="#3b82f6" fontSize="11">Find min each pass</text>
    
    {/* Descending Section */}
    <rect x="370" y="20" width="280" height="250" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
    <text x="510" y="50" textAnchor="middle" fill="#831843" fontSize="16" fontWeight="bold">Descending Selection</text>
    <text x="510" y="75" textAnchor="middle" fill="#ec4899" fontSize="12">Find MAXIMUM each pass</text>
    
    {/* Descending Array Example */}
    <g transform="translate(390, 100)">
      {[90, 64, 34, 25, 22, 12, 11].map((val, idx) => (
        <g key={idx} transform={`translate(${idx * 38}, 0)`}>
          <rect x="0" y="0" width="32" height="40" rx="4" fill="#fdf2f8" stroke="#ec4899" strokeWidth="1.5" />
          <text x="16" y="25" textAnchor="middle" fill="#831843" fontSize="11" fontWeight="bold">{val}</text>
        </g>
      ))}
    </g>
    <text x="510" y="175" textAnchor="middle" fill="#831843" fontSize="12">Largest → Smallest</text>
    <path d="M 400 195 L 620 195" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow)" />
    <text x="510" y="215" textAnchor="middle" fill="#ec4899" fontSize="11">Decreasing order</text>
    <text x="510" y="240" textAnchor="middle" fill="#ec4899" fontSize="11">Find max each pass</text>
    
    {/* Comparison Badge */}
    <rect x="290" y="230" width="120" height="30" rx="15" fill="#f59e0b" />
    <text x="350" y="250" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">min → max</text>
  </svg>
);

const Topic13 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
            Selection Sort - Descending Order
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Selecting the maximum element and placing it at the beginning - sorting from largest to smallest
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
                  ? "bg-rose-50 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 border-b-2 border-rose-600"
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
                  <span className="bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Descending Order Selection Sort
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Descending selection sort is <strong className="text-rose-600 dark:text-rose-400">identical to ascending selection sort</strong> except it selects the <strong className="text-rose-600 dark:text-rose-400">maximum element</strong> instead of the minimum. The largest element is placed at the beginning, then the second largest, and so on.
                  </p>
                  <div className="bg-rose-50 dark:bg-rose-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-rose-800 dark:text-rose-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public static void selectionSortDescending(int[] arr)</code><br />
                      <strong>Return Type:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">void</code> (sorts in-place)<br />
                      <strong>Key Difference:</strong> Find maximum instead of minimum, swap condition changes from <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;</code> to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&gt;</code>
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison with Ascending */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🔄 Ascending vs Descending Selection Sort</h2>
                <AscendingVsDescendingSelectionSVG />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Ascending Order</h3>
                    <code className="block bg-gray-900 text-green-400 p-2 rounded text-sm">
                      {`for (int i = 0; i < n-1; i++) {
    int minIndex = i;
    for (int j = i+1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
            minIndex = j;  // Find MINIMUM
        }
    }
    swap(arr[i], arr[minIndex]);
}`}
                    </code>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">Smallest first → grows left to right</p>
                  </div>
                  <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-rose-800 dark:text-rose-300 mb-2">Descending Order</h3>
                    <code className="block bg-gray-900 text-green-400 p-2 rounded text-sm">
                      {`for (int i = 0; i < n-1; i++) {
    int maxIndex = i;
    for (int j = i+1; j < n; j++) {
        if (arr[j] > arr[maxIndex]) {
            maxIndex = j;  // Find MAXIMUM
        }
    }
    swap(arr[i], arr[maxIndex]);
}`}
                    </code>
                    <p className="text-sm text-rose-700 dark:text-rose-300 mt-2">Largest first → grows left to right</p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ How Descending Selection Sort Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>1️⃣ <strong>Divide</strong> array into sorted (left) and unsorted (right) regions</p>
                    <p>2️⃣ <strong>Find maximum</strong> element in unsorted region</p>
                    <p>3️⃣ <strong>Swap maximum</strong> with first element of unsorted region</p>
                    <p>4️⃣ <strong>Expand</strong> sorted region by one element (now contains largest)</p>
                    <p>5️⃣ <strong>Repeat</strong> until entire array is sorted descending</p>
                    <p>6️⃣ <strong>Result</strong> - Array sorted from largest to smallest</p>
                  </div>
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Analogy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Award ceremony:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside">
                      <li>Select highest scorer for Gold medal</li>
                      <li>Select next highest for Silver medal</li>
                      <li>Then Bronze, and so on</li>
                      <li>Each pass finds the next highest!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🏅 Olympic Medal Ranking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Select gold medalist first (highest score), then silver, then bronze - descending selection sort!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📱 Top Downloads Chart</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">App store showing most downloaded apps first - selecting maximum download counts!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💰 Wealthiest People List</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Forbes richest list - selecting highest net worth first, then next highest!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Class Rank List</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Teacher Sukanta Hui ranking students: Nandini (96%) first, then Angshuman (92%), then Tuhina (91%) - descending selection!</p>
                  </div>
                </div>
              </div>

              {/* Complexity Analysis */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📊 Complexity Analysis</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✨ Properties of Descending Selection Sort</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-red-600">✗ Unstable Sort</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Equal elements may change relative order (same as ascending)</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-blue-600">✓ In-place Algorithm</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">No extra memory needed (O(1) space)</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-yellow-600">✓ Non-adaptive</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Always O(n²) even if array sorted descending</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-green-600">✓ Minimal Swaps</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Only n swaps total - great for expensive swap operations!</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Tips & Tricks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>One change:</strong> Change <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;</code> to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&gt;</code> and rename minIndex to maxIndex</li>
                  <li>• <strong>Same swap count:</strong> Still only n swaps total - minimal!</li>
                  <li>• <strong>Use for:</strong> Leaderboards, rankings, top-N queries, highest scores first</li>
                  <li>• <strong>Memory efficient:</strong> Same O(1) space complexity as ascending version</li>
                </ul>
              </div>

              <Teacher note="Descending selection sort is perfect for 'top N' problems! In Barrackpore school, we use it to display rank lists. The beauty is that only the comparison changes - everything else stays the same. Challenge students: 'Can you write one selection sort that works for both orders using a comparator?' This builds flexible thinking!" />
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">👁️ Visual Walkthrough - Descending Order</h2>
                <SelectionSortDescendingVisualSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Watch how the maximum element is selected and swapped to its correct position at the beginning each pass
                </p>
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
                        <th className="px-3 py-2 text-left text-sm font-semibold">maxIndex</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Found Maximum</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Swap</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Array After</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { pass: 1, i: 0, max: 5, found: '90 at index 5', swap: 'swap(0,5)', result: '[90, 25, 12, 22, 11, 64, 34]' },
                        { pass: 2, i: 1, max: 4, found: '64 at index 5', swap: 'swap(1,5)', result: '[90, 64, 12, 22, 11, 25, 34]' },
                        { pass: 3, i: 2, max: 6, found: '34 at index 6', swap: 'swap(2,6)', result: '[90, 64, 34, 22, 11, 25, 12]' },
                        { pass: 4, i: 3, max: 5, found: '25 at index 5', swap: 'swap(3,5)', result: '[90, 64, 34, 25, 11, 22, 12]' },
                        { pass: 5, i: 4, max: 4, found: '22 at index 5', swap: 'swap(4,5)', result: '[90, 64, 34, 25, 22, 11, 12]' },
                        { pass: 6, i: 5, max: 6, found: '12 at index 6', swap: 'swap(5,6)', result: '[90, 64, 34, 25, 22, 12, 11]' }
                      ].map((row, i) => (
                        <tr key={i} className={row.swap !== 'swap(i,i)' ? 'bg-rose-50 dark:bg-rose-900/10' : ''}>
                          <td className="px-3 py-2 text-sm">{row.pass}</td>
                          <td className="px-3 py-2 text-sm">{row.i}</td>
                          <td className="px-3 py-2 text-sm">{row.max}</td>
                          <td className="px-3 py-2 text-sm">{row.found}</td>
                          <td className="px-3 py-2 text-sm">{row.swap}</td>
                          <td className="px-3 py-2 text-sm font-mono">{row.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Teacher note="The visual clearly shows sorted region growing from left with largest values. Have students compare with ascending version - they'll see it's the mirror image! This reinforces understanding of how selection sort works regardless of direction." />
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <JavaFileLoader 
                    fileModule={selectionSortDescending}
                    title="SelectionSortDescending.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={selectionSortDescendingOptimized}
                    title="SelectionSortDescendingOptimized.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={selectionSortDescendingStepByStep}
                    title="SelectionSortDescendingStepByStep.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={selectionSortDescendingObjects}
                    title="SelectionSortDescendingObjects.java"
                    highlightLines={[]}
                  />
                </div>
              </div>

              <Teacher note="Compare the descending code with ascending side-by-side. Students should notice: maxIndex instead of minIndex, and > instead of <. Everything else is identical! This is a powerful lesson in algorithm patterns." />
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
                      <p className="font-semibold">Using &lt; instead of &gt;</p>
                      <p className="text-sm">Using <code className="bg-gray-200 px-1 rounded">if (arr[j] &lt; arr[maxIndex])</code> finds minimum instead of maximum!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Initializing maxIndex incorrectly</p>
                      <p className="text-sm">Always initialize maxIndex = i at start of each pass, not 0!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Forgetting stable property</p>
                      <p className="text-sm">Selection sort is unstable in both ascending and descending - equal elements may reorder</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Best Practices</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Use <code className="bg-gray-200 px-1 rounded">maxIndex</code> variable name clearly indicating purpose</li>
                  <li>Add comment explaining we're finding maximum for descending order</li>
                  <li>Check <code className="bg-gray-200 px-1 rounded">if (maxIndex != i)</code> before swapping to avoid unnecessary swaps</li>
                  <li>Consider making sort direction a parameter for reusable code</li>
                  <li>Document that algorithm sorts in descending order (largest to smallest)</li>
                </ul>
              </div>

              {/* Hint Section */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💭 Think About...</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>🤔 How would you modify the code to find both min and max in one pass?</li>
                  <li>🤔 What happens to the sorted region in descending selection sort?</li>
                  <li>🤔 Why does descending selection sort still make only n swaps?</li>
                  <li>🤔 How would you create a generic selection sort that accepts ascending/descending flag?</li>
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

              <Teacher note="The key insight: selection sort's minimal swaps make it ideal for descending order too! I have students implement both ascending and descending, then combine into one method with a boolean parameter. This builds code reusability skills essential for professional development." />
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
    question: "What is the only difference between ascending and descending selection sort?",
    answer: "Find maximum instead of minimum (change < to > and rename minIndex to maxIndex)."
  },
  {
    question: "In descending selection sort, which element is placed first?",
    answer: "The maximum (largest) element is placed at index 0, then second largest, and so on."
  },
  {
    question: "Is descending selection sort stable?",
    answer: "No, like ascending selection sort, it's unstable because non-adjacent swaps can reorder equal elements."
  },
  {
    question: "What is the time complexity of descending selection sort?",
    answer: "Same as ascending: Best O(n²), Average O(n²), Worst O(n²). Always performs n(n-1)/2 comparisons."
  },
  {
    question: "How many swaps does descending selection sort make?",
    answer: "At most n-1 swaps total (one per pass) - same as ascending version!"
  },
  {
    question: "When would you use descending selection sort?",
    answer: "Leaderboards (highest score first), top products, rank lists, medal tallies, highest paid employees."
  },
  {
    question: "Can we use the same method for both ascending and descending?",
    answer: "Yes! Add a boolean parameter 'ascending' and use conditional: ascending ? arr[j] < arr[minIndex] : arr[j] > arr[maxIndex]"
  },
  {
    question: "What's the best case for descending selection sort?",
    answer: "Even if array is already descending, it still performs all n² comparisons (non-adaptive)."
  },
  {
    question: "What's the worst case for descending selection sort?",
    answer: "Ascending order requires same number of comparisons as any other order - always O(n²)."
  },
  {
    question: "How to sort objects in descending order?",
    answer: "Use comparator: if (comparator.compare(arr[j], arr[maxIndex]) > 0) to find maximum based on custom logic."
  },
  {
    question: "Why do we swap when arr[j] > arr[maxIndex] for descending?",
    answer: "Because we want the largest element. If current element is greater than current max, it becomes new max."
  },
  {
    question: "What happens to the smallest element in descending selection sort?",
    answer: "It ends up at the end (last position) after all passes complete."
  },
  {
    question: "Is descending selection sort adaptive?",
    answer: "No, it's non-adaptive. Performance doesn't improve with partially sorted data - always O(n²) comparisons."
  },
  {
    question: "How many passes needed for 10 elements in descending selection sort?",
    answer: "9 passes maximum (n-1 passes) to sort fully descending."
  },
  {
    question: "Can descending selection sort handle duplicate values?",
    answer: "Yes, but it's unstable - duplicates may change relative order during swapping."
  },
  {
    question: "How to convert ascending code to descending?",
    answer: "Change if(arr[j] < arr[minIndex]) to if(arr[j] > arr[maxIndex]) and rename variables accordingly."
  },
  {
    question: "What's the space complexity of descending selection sort?",
    answer: "O(1) - sorts in-place using only a few variables, same as ascending."
  },
  {
    question: "How would you find top 3 highest scores using selection sort?",
    answer: "Run only 3 passes of descending selection sort - first 3 elements will be the top 3 scores!"
  },
  {
    question: "Why teach descending sort separately?",
    answer: "Teaches that algorithm structure remains same while behavior changes via comparison logic - reinforces understanding."
  },
  {
    question: "How to test if descending sort works correctly?",
    answer: "After sorting, verify arr[i] >= arr[i+1] for all i. Also test with duplicates, empty, and single-element arrays."
  }
];

export default Topic13;