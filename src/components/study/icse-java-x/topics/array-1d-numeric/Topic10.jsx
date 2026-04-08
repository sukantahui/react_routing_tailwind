import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files
import bubbleSortBasic from "./topic10_files/BubbleSortBasic.java?raw";
import bubbleSortOptimized from "./topic10_files/BubbleSortOptimized.java?raw";
import bubbleSortStepByStep from "./topic10_files/BubbleSortStepByStep.java?raw";
import bubbleSortWithStrings from "./topic10_files/BubbleSortWithStrings.java?raw";

// SVG Components for Bubble Sort Visualization
const BubbleSortVisualSVG = () => {
  const [step, setStep] = useState(0);
  
  const passes = [
    { label: "Pass 1: Largest element bubbles to end", array: [45, 23, 67, 12, 89, 34, 78], comparisons: [0,1,2,3,4,5] },
    { label: "Pass 2: Second largest bubbles to position", array: [23, 45, 12, 67, 34, 78, 89], comparisons: [0,1,2,3,4] },
    { label: "Pass 3: Continuing bubble up", array: [23, 12, 45, 34, 67, 78, 89], comparisons: [0,1,2,3] },
    { label: "Pass 4: Almost sorted", array: [12, 23, 34, 45, 67, 78, 89], comparisons: [0,1,2] },
    { label: "Pass 5: Final check - sorted!", array: [12, 23, 34, 45, 67, 78, 89], comparisons: [0,1] }
  ];

  return (
    <div className="w-full">
      <svg viewBox="0 0 800 400" className="w-full h-auto max-w-4xl mx-auto my-4" aria-label="Bubble Sort Visualization">
        <defs>
          <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.2 }} />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
        </defs>
        
        {/* Current Pass Display */}
        <text x="400" y="25" textAnchor="middle" fill="#1e293b" dark:text-gray-200 fontSize="14" fontWeight="bold">
          {passes[step].label}
        </text>
        
        {/* Array Visualization */}
        {passes[step].array.map((val, idx) => (
          <g key={idx} transform={`translate(${idx * 85 + 60}, 50)`}>
            <rect 
              x="0" y="0" width="70" height="60" rx="6" 
              fill="#ffffff" stroke={passes[step].comparisons.includes(idx) ? "#f59e0b" : "#3b82f6"} 
              strokeWidth={passes[step].comparisons.includes(idx) ? "3" : "2"}
              className="transition-all duration-300 hover:shadow-lg"
              filter="url(#shadow)"
            >
              {passes[step].comparisons.includes(idx) && (
                <animate attributeName="stroke" values="#f59e0b;#3b82f6;#f59e0b" dur="1s" repeatCount="indefinite" />
              )}
            </rect>
            <text x="35" y="35" textAnchor="middle" fill="#1e293b" fontSize="18" fontWeight="bold">{val}</text>
            <text x="35" y="75" textAnchor="middle" fill="#94a3b8" fontSize="11">index {idx}</text>
          </g>
        ))}
        
        {/* Bubbling Animation */}
        {step < 4 && (
          <g>
            {passes[step].comparisons.map((idx, i) => (
              <g key={i} transform={`translate(${idx * 85 + 95}, 130)`}>
                <circle cx="0" cy="0" r="15" fill="#f59e0b" opacity="0.6">
                  <animate attributeName="cy" values="0;-30;-30" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <text x="0" y="0" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  {idx === passes[step].comparisons[passes[step].comparisons.length - 1] ? "✓" : "↑"}
                  <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                </text>
              </g>
            ))}
          </g>
        )}
        
        {/* Navigation Buttons */}
        <g transform="translate(300, 350)">
          <rect x="0" y="0" width="200" height="35" rx="8" fill="#3b82f6" className="cursor-pointer hover:fill-blue-600 transition-all duration-300" />
          <text x="100" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="cursor-pointer">
            {step < 4 ? "Next Pass →" : "Reset"}
          </text>
          
          <text x="100" y="-10" textAnchor="middle" fill="#6b7280" fontSize="11">
            Click to animate bubble sort
          </text>
        </g>
        
        {/* Interactive click handler - note: actual click handled by SVG wrapper */}
      </svg>
      <div className="text-center mt-2">
        <button 
          onClick={() => setStep((step + 1) % 5)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          {step < 4 ? "Next Pass (Step " + (step + 2) + "/5)" : "Reset Animation"}
        </button>
      </div>
    </div>
  );
};

const BubbleSortAlgorithmSVG = () => (
  <svg viewBox="0 0 700 450" className="w-full h-auto max-w-3xl mx-auto my-4">
    <g transform="translate(20, 20)">
      {/* Start */}
      <ellipse cx="330" cy="20" rx="40" ry="20" fill="#10b981" />
      <text x="330" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">START</text>
      
      {/* Arrow to loop */}
      <line x1="330" y1="40" x2="330" y2="70" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Outer Loop */}
      <rect x="180" y="70" width="300" height="45" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="330" y="97" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">
        for i = 0 to n-1
      </text>
      
      {/* Arrow */}
      <line x1="330" y1="115" x2="330" y2="145" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Inner Loop */}
      <rect x="150" y="145" width="360" height="45" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="330" y="172" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">
        for j = 0 to n-i-2
      </text>
      
      {/* Arrow */}
      <line x1="330" y1="190" x2="330" y2="220" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
      
      {/* Compare Decision */}
      <polygon points="330,220 430,260 330,300 230,260" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
      <text x="330" y="265" textAnchor="middle" fill="#9d174d" fontSize="12" fontWeight="bold">arr[j] &gt; arr[j+1]?</text>
      
      {/* Yes branch */}
      <line x1="430" y1="260" x2="530" y2="260" stroke="#10b981" strokeWidth="2" />
      <text x="480" y="253" textAnchor="middle" fill="#10b981" fontSize="11">YES</text>
      
      <rect x="530" y="240" width="130" height="40" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
      <text x="595" y="265" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">Swap Elements</text>
      
      {/* No branch */}
      <line x1="230" y1="260" x2="130" y2="260" stroke="#ef4444" strokeWidth="2" />
      <text x="180" y="253" textAnchor="middle" fill="#ef4444" fontSize="11">NO</text>
      
      <rect x="20" y="240" width="110" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="75" y="265" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">Continue</text>
      
      {/* Loop back arrows */}
      <path d="M 595 280 L 595 330 L 330 330 L 330 300" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
      <text x="595" y="320" textAnchor="middle" fill="#3b82f6" fontSize="10">continue inner loop</text>
      
      <path d="M 75 280 L 75 370 L 330 370 L 330 300" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
      
      {/* End */}
      <ellipse cx="330" cy="420" rx="40" ry="20" fill="#ef4444" />
      <text x="330" y="425" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">END</text>
      
      {/* Arrow to end */}
      <line x1="330" y1="370" x2="330" y2="400" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
    </g>
  </svg>
);

const ComparisonTableSVG = () => (
  <svg viewBox="0 0 700 200" className="w-full h-auto max-w-3xl mx-auto my-4">
    <rect x="50" y="20" width="280" height="160" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
    <text x="190" y="50" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="bold">Unsorted Array</text>
    <text x="190" y="75" textAnchor="middle" fill="#7f1d1d" fontSize="12">[64, 34, 25, 12, 22, 11, 90]</text>
    
    <line x1="70" y1="90" x2="310" y2="90" stroke="#ef4444" strokeWidth="1" />
    
    <text x="190" y="115" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="bold">After Bubble Sort</text>
    <text x="190" y="140" textAnchor="middle" fill="#7f1d1d" fontSize="12">[11, 12, 22, 25, 34, 64, 90]</text>
    
    <rect x="370" y="20" width="280" height="160" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5" />
    <text x="510" y="50" textAnchor="middle" fill="#14532d" fontSize="14" fontWeight="bold">Sorted Ascending</text>
    <text x="510" y="75" textAnchor="middle" fill="#166534" fontSize="12">Smallest → Largest</text>
    
    <line x1="390" y1="90" x2="630" y2="90" stroke="#10b981" strokeWidth="1" />
    
    <text x="510" y="115" textAnchor="middle" fill="#14532d" fontSize="14" fontWeight="bold">Properties</text>
    <text x="510" y="140" textAnchor="middle" fill="#166534" fontSize="11">Stable | In-place | O(n²)</text>
  </svg>
);

const Topic10 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-4">
            Bubble Sort - Ascending Order
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            The simplest sorting algorithm - repeatedly swapping adjacent elements to bubble up the largest
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
                  ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
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
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  What is Bubble Sort?
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Bubble sort is a <strong className="text-blue-600 dark:text-blue-400">simple comparison-based sorting algorithm</strong> that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, indicating the list is sorted.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public static void bubbleSort(int[] arr)</code><br />
                      <strong>Return Type:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">void</code> (sorts in-place)<br />
                      <strong>Purpose:</strong> Sort array in ascending order by bubbling largest elements to the end
                    </p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ How Bubble Sort Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>1️⃣ <strong>Start</strong> from the beginning of the array</p>
                    <p>2️⃣ <strong>Compare</strong> each adjacent pair (arr[j] and arr[j+1])</p>
                    <p>3️⃣ <strong>Swap</strong> if arr[j] &gt; arr[j+1] (for ascending order)</p>
                    <p>4️⃣ <strong>After each pass</strong>, the largest element "bubbles up" to the end</p>
                    <p>5️⃣ <strong>Repeat</strong> passes until no swaps are needed</p>
                    <p>6️⃣ <strong>Optimization</strong> - After i passes, last i elements are sorted</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Analogy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Bubbles in a soda:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside">
                      <li>Larger bubbles rise faster to the top</li>
                      <li>Smaller bubbles get passed by larger ones</li>
                      <li>Each pass, the largest unsorted bubble reaches its correct position</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🎈 Balloon Sorting Game</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Teacher Sukanta Hui has students line up by height - tallest students "bubble" to the end through adjacent swaps!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📚 Library Book Arranging</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Librarian in Barrackpore arranging books by call number - each pass moves largest number to correct shelf.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🏃‍♂️ Race Results</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Sorting race times - slowest times bubble to bottom, fastest rise to top!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Exam Score Sorting</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Angshuman's 95 bubbles up, while lower scores sink down - perfect for small class sizes!</p>
                  </div>
                </div>
              </div>

              {/* Complexity Analysis */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📊 Complexity Analysis</h2>
                <ComparisonTableSVG />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Best Case</p>
                    <p className="text-xl font-bold text-green-600">O(n)</p>
                    <p className="text-xs">Already sorted array</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Average Case</p>
                    <p className="text-xl font-bold text-yellow-600">O(n²)</p>
                    <p className="text-xs">Random order</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Worst Case</p>
                    <p className="text-xl font-bold text-red-600">O(n²)</p>
                    <p className="text-xs">Reverse sorted</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Space</p>
                    <p className="text-xl font-bold text-blue-600">O(1)</p>
                    <p className="text-xs">In-place sorting</p>
                  </div>
                </div>
              </div>

              {/* Properties */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✨ Properties of Bubble Sort</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-green-600">✓ Stable Sort</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Equal elements maintain their relative order</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-blue-600">✓ In-place Algorithm</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">No extra memory needed</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-yellow-600">✓ Adaptive</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Performance improves on partially sorted arrays</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="font-semibold text-purple-600">✓ Online</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Can sort as elements arrive</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Tips & Tricks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Optimization 1:</strong> Use a <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">swapped</code> flag to detect early completion</li>
                  <li>• <strong>Optimization 2:</strong> Reduce inner loop range by <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">i</code> since last i elements are sorted</li>
                  <li>• <strong>When to use:</strong> Small datasets (n &lt; 100) or nearly sorted data</li>
                  <li>• <strong>Educational value:</strong> Best for teaching sorting concepts, not production use</li>
                </ul>
              </div>

              <Teacher note="Bubble sort is the 'hello world' of sorting algorithms! I tell my students in Barrackpore: 'Watch the largest numbers bubble up like air bubbles in water.' The optimization with swapped flag is crucial - without it, bubble sort always does n² comparisons. Have students trace with small arrays first (5-6 elements)." />
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">👁️ Visual Walkthrough</h2>
                <BubbleSortVisualSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Click 'Next Pass' to see how largest elements bubble to the end
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📐 Algorithm Flowchart</h2>
                <BubbleSortAlgorithmSVG />
              </div>

              {/* Step-by-step trace */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📝 Dry Run Example</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-2 py-2 text-left text-sm font-semibold">Pass</th>
                        <th className="px-2 py-2 text-left text-sm font-semibold">j</th>
                        <th className="px-2 py-2 text-left text-sm font-semibold">arr[j]</th>
                        <th className="px-2 py-2 text-left text-sm font-semibold">arr[j+1]</th>
                        <th className="px-2 py-2 text-left text-sm font-semibold">Swap?</th>
                        <th className="px-2 py-2 text-left text-sm font-semibold">Array After</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { pass: 1, j: 0, a: 64, b: 34, swap: '✓', result: '[34, 64, 25, 12, 22, 11, 90]' },
                        { pass: 1, j: 1, a: 64, b: 25, swap: '✓', result: '[34, 25, 64, 12, 22, 11, 90]' },
                        { pass: 1, j: 2, a: 64, b: 12, swap: '✓', result: '[34, 25, 12, 64, 22, 11, 90]' },
                        { pass: 1, j: 3, a: 64, b: 22, swap: '✓', result: '[34, 25, 12, 22, 64, 11, 90]' },
                        { pass: 1, j: 4, a: 64, b: 11, swap: '✓', result: '[34, 25, 12, 22, 11, 64, 90]' },
                        { pass: 1, j: 5, a: 64, b: 90, swap: '✗', result: '[34, 25, 12, 22, 11, 64, 90]' },
                        { pass: 2, j: 0, a: 34, b: 25, swap: '✓', result: '[25, 34, 12, 22, 11, 64, 90]' },
                        { pass: 2, j: 1, a: 34, b: 12, swap: '✓', result: '[25, 12, 34, 22, 11, 64, 90]' },
                        { pass: 2, j: 2, a: 34, b: 22, swap: '✓', result: '[25, 12, 22, 34, 11, 64, 90]' },
                        { pass: 2, j: 3, a: 34, b: 11, swap: '✓', result: '[25, 12, 22, 11, 34, 64, 90]' }
                      ].map((row, i) => (
                        <tr key={i} className={row.swap === '✓' ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}>
                          <td className="px-2 py-1 text-xs">{row.pass}</td>
                          <td className="px-2 py-1 text-xs">{row.j}</td>
                          <td className="px-2 py-1 text-xs">{row.a}</td>
                          <td className="px-2 py-1 text-xs">{row.b}</td>
                          <td className="px-2 py-1 text-xs">{row.swap}</td>
                          <td className="px-2 py-1 text-xs font-mono">{row.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Teacher note="The step-by-step table is gold! Have students trace the entire algorithm manually before coding. I make my students in Ichapur simulate bubble sort with index cards - physical manipulation builds mental models that last!" />
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <JavaFileLoader 
                    fileModule={bubbleSortBasic}
                    title="BubbleSortBasic.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={bubbleSortOptimized}
                    title="BubbleSortOptimized.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={bubbleSortStepByStep}
                    title="BubbleSortStepByStep.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={bubbleSortWithStrings}
                    title="BubbleSortWithStrings.java"
                    highlightLines={[]}
                  />
                </div>
              </div>

              <Teacher note="Start with the basic version, then introduce optimizations gradually. The 'swapped' flag optimization is a great lesson in algorithm analysis - students can see how it improves performance on nearly-sorted data!" />
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
                      <p className="font-semibold">Off-by-one in inner loop</p>
                      <p className="text-sm">Using <code className="bg-gray-200 px-1 rounded">j &lt; arr.length - 1</code> without subtracting i causes unnecessary comparisons</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Forgetting swapped flag optimization</p>
                      <p className="text-sm">Basic version always does n² comparisons even on sorted array</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Incorrect swap logic</p>
                      <p className="text-sm">Using <code className="bg-gray-200 px-1 rounded">arr[j] = arr[j+1]</code> without temporary variable loses data</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Best Practices</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Always use the optimized version with swapped flag</li>
                  <li>Reduce inner loop range by i to avoid checking sorted elements</li>
                  <li>Use meaningful variable names (not just i, j but array, n)</li>
                  <li>Extract swap logic into separate method for clarity</li>
                  <li>Test with edge cases: empty array, single element, already sorted, reverse sorted</li>
                </ul>
              </div>

              {/* Hint Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💭 Think About...</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>🤔 Why does the largest element always end up at the correct position after first pass?</li>
                  <li>🤔 How would you modify bubble sort to sort in descending order?</li>
                  <li>🤔 What happens to the algorithm's complexity if array is already sorted?</li>
                  <li>🤔 Why is bubble sort called a 'stable' sorting algorithm?</li>
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

              <Teacher note="The 'why bubble sort?' question always comes up. Be honest - it's not for production. But it teaches core concepts: nested loops, swapping, in-place modification, and optimization. The swapped flag optimization is particularly satisfying to explain - students see how one boolean can dramatically improve performance!" />
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
    question: "What is bubble sort and how does it work?",
    answer: "Bubble sort repeatedly steps through array, compares adjacent elements, and swaps if they're in wrong order. Largest elements 'bubble' to end after each pass."
  },
  {
    question: "What is the time complexity of bubble sort?",
    answer: "Best case O(n) with optimization, average O(n²), worst O(n²). Without optimization, always O(n²)."
  },
  {
    question: "Why is bubble sort called 'bubble' sort?",
    answer: "Larger elements 'bubble up' to their correct position at the end of the array, similar to bubbles rising in water."
  },
  {
    question: "How can bubble sort be optimized?",
    answer: "Add swapped flag to detect early completion, reduce inner loop range by i since last i elements are sorted."
  },
  {
    question: "Is bubble sort stable?",
    answer: "Yes! Equal elements maintain their relative order because swaps only occur when left > right."
  },
  {
    question: "What's the space complexity of bubble sort?",
    answer: "O(1) - sorts in-place using only a temporary variable for swapping, no extra memory needed."
  },
  {
    question: "How many passes does bubble sort need?",
    answer: "In worst case, n-1 passes. With optimization, stops early when array becomes sorted."
  },
  {
    question: "When should you use bubble sort?",
    answer: "Small datasets (n < 100), nearly sorted data, educational purposes, or when simplicity is priority."
  },
  {
    question: "How to sort in descending order using bubble sort?",
    answer: "Change swap condition to arr[j] < arr[j+1] (swap when left is smaller than right)."
  },
  {
    question: "What's the difference between bubble sort and selection sort?",
    answer: "Bubble sort swaps adjacent elements repeatedly. Selection sort finds minimum and places at beginning in one swap per pass."
  },
  {
    question: "Why does inner loop run until n-i-2?",
    answer: "After i passes, last i elements are sorted and don't need checking. -2 because j+1 must be valid index."
  },
  {
    question: "What happens to largest element after first pass?",
    answer: "It 'bubbles' all the way to the end (index n-1) through successive swaps."
  },
  {
    question: "How many comparisons in worst case?",
    answer: "n(n-1)/2 comparisons. For n=100, that's 4,950 comparisons."
  },
  {
    question: "Can bubble sort handle strings?",
    answer: "Yes, using compareTo() method. Swap when left.compareTo(right) > 0 for ascending order."
  },
  {
    question: "What's a 'pass' in bubble sort?",
    answer: "One complete iteration from start to end of unsorted portion, performing adjacent comparisons and swaps."
  },
  {
    question: "How to detect array is sorted early?",
    answer: "Track swaps in a boolean. If no swaps in a complete pass, array is sorted - break early."
  },
  {
    question: "What's the difference between bubble sort and insertion sort?",
    answer: "Both O(n²). Insertion sort builds sorted portion by inserting elements. Bubble sort repeatedly swaps adjacent pairs."
  },
  {
    question: "Why is bubble sort inefficient for large datasets?",
    answer: "Quadratic time complexity O(n²) becomes impractical for large n. For n=10,000, it needs ~50 million comparisons."
  },
  {
    question: "How to implement bubble sort for ArrayList?",
    answer: "Same logic using arr.get(j) and arr.set(j, value) methods instead of array indexing."
  },
  {
    question: "What's 'cocktail shaker sort'?",
    answer: "Variation of bubble sort that sorts in both directions (left-to-right then right-to-left), potentially faster for certain patterns."
  }
];

export default Topic10;