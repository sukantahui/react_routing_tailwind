import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files
import bubbleSortDescending from "./topic11_files/BubbleSortDescending.java?raw";
import bubbleSortDescendingOptimized from "./topic11_files/BubbleSortDescendingOptimized.java?raw";
import bubbleSortDescendingWithCompare from "./topic11_files/BubbleSortDescendingWithCompare.java?raw";
import bubbleSortDescendingObjects from "./topic11_files/BubbleSortDescendingObjects.java?raw";

// SVG Components for Descending Bubble Sort
const BubbleSortDescendingVisualSVG = () => {
  const [step, setStep] = useState(0);
  
  const passes = [
    { label: "Pass 1: Smallest element bubbles to end", array: [45, 67, 23, 89, 12, 78, 34], comparisons: [0,1,2,3,4,5] },
    { label: "Pass 2: Second smallest bubbles to position", array: [67, 45, 89, 23, 78, 34, 12], comparisons: [0,1,2,3,4] },
    { label: "Pass 3: Continuing bubble down", array: [67, 89, 45, 78, 34, 23, 12], comparisons: [0,1,2,3] },
    { label: "Pass 4: Almost sorted descending", array: [89, 67, 78, 45, 34, 23, 12], comparisons: [0,1,2] },
    { label: "Pass 5: Final check - sorted descending!", array: [89, 78, 67, 45, 34, 23, 12], comparisons: [0,1] }
  ];

  return (
    <div className="w-full">
      <svg viewBox="0 0 800 400" className="w-full h-auto max-w-4xl mx-auto my-4" aria-label="Descending Bubble Sort Visualization">
        <defs>
          <linearGradient id="bubbleDescGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#f43f5e', stopOpacity: 0.2 }} />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>
        
        {/* Title */}
        <text x="400" y="25" textAnchor="middle" fill="#1e293b" dark:text-gray-200 fontSize="14" fontWeight="bold">
          {passes[step].label}
        </text>
        
        {/* Arrow showing direction of smallest element */}
        <g transform="translate(380, 35)">
          <path d="M 0 0 L 20 15 L 0 30" fill="none" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="25" y="20" fill="#f43f5e" fontSize="11" fontWeight="bold">Smallest ↓</text>
        </g>
        
        {/* Array Visualization */}
        {passes[step].array.map((val, idx) => (
          <g key={idx} transform={`translate(${idx * 85 + 60}, 80)`}>
            <rect 
              x="0" y="0" width="70" height="60" rx="6" 
              fill="#ffffff" stroke={passes[step].comparisons.includes(idx) ? "#f59e0b" : "#ec4899"} 
              strokeWidth={passes[step].comparisons.includes(idx) ? "3" : "2"}
              className="transition-all duration-300 hover:shadow-lg"
              filter="url(#shadow)"
            >
              {passes[step].comparisons.includes(idx) && (
                <animate attributeName="stroke" values="#f59e0b;#ec4899;#f59e0b" dur="1s" repeatCount="indefinite" />
              )}
            </rect>
            <text x="35" y="35" textAnchor="middle" fill="#1e293b" fontSize="18" fontWeight="bold">{val}</text>
            <text x="35" y="75" textAnchor="middle" fill="#94a3b8" fontSize="11">index {idx}</text>
          </g>
        ))}
        
        {/* Bubbling Down Animation - smallest sinking */}
        {step < 4 && (
          <g>
            {passes[step].comparisons.map((idx, i) => (
              <g key={i} transform={`translate(${idx * 85 + 95}, 160)`}>
                <circle cx="0" cy="0" r="15" fill="#f43f5e" opacity="0.6">
                  <animate attributeName="cy" values="0;30;30" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <text x="0" y="0" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  {idx === passes[step].comparisons[passes[step].comparisons.length - 1] ? "✓" : "↓"}
                </text>
              </g>
            ))}
          </g>
        )}
        
        {/* Navigation Button */}
        <g transform="translate(300, 350)">
          <rect x="0" y="0" width="200" height="35" rx="8" fill="#ec4899" className="cursor-pointer hover:fill-pink-600 transition-all duration-300" />
          <text x="100" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="cursor-pointer">
            {step < 4 ? "Next Pass →" : "Reset"}
          </text>
        </g>
      </svg>
      <div className="text-center mt-2">
        <button 
          onClick={() => setStep((step + 1) % 5)}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300"
        >
          {step < 4 ? "Next Pass (Step " + (step + 2) + "/5)" : "Reset Animation"}
        </button>
      </div>
    </div>
  );
};

const AscendingVsDescendingSVG = () => (
  <svg viewBox="0 0 700 300" className="w-full h-auto max-w-3xl mx-auto my-4">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
      </marker>
    </defs>
    
    {/* Ascending Section */}
    <rect x="50" y="20" width="280" height="250" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
    <text x="190" y="50" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="bold">Ascending Order</text>
    <text x="190" y="75" textAnchor="middle" fill="#3b82f6" fontSize="12">arr[j] &gt; arr[j+1] → SWAP</text>
    
    {/* Ascending Array Example */}
    <g transform="translate(70, 100)">
      {[12, 23, 34, 45, 56, 67].map((val, idx) => (
        <g key={idx} transform={`translate(${idx * 38}, 0)`}>
          <rect x="0" y="0" width="32" height="40" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="16" y="25" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">{val}</text>
        </g>
      ))}
    </g>
    <text x="190" y="175" textAnchor="middle" fill="#1e3a8a" fontSize="12">Smallest → Largest</text>
    <path d="M 80 195 L 300 195" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
    <text x="190" y="215" textAnchor="middle" fill="#3b82f6" fontSize="11">Increasing order</text>
    
    {/* Descending Section */}
    <rect x="370" y="20" width="280" height="250" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
    <text x="510" y="50" textAnchor="middle" fill="#831843" fontSize="16" fontWeight="bold">Descending Order</text>
    <text x="510" y="75" textAnchor="middle" fill="#ec4899" fontSize="12">arr[j] &lt; arr[j+1] → SWAP</text>
    
    {/* Descending Array Example */}
    <g transform="translate(390, 100)">
      {[67, 56, 45, 34, 23, 12].map((val, idx) => (
        <g key={idx} transform={`translate(${idx * 38}, 0)`}>
          <rect x="0" y="0" width="32" height="40" rx="4" fill="#fdf2f8" stroke="#ec4899" strokeWidth="1.5" />
          <text x="16" y="25" textAnchor="middle" fill="#831843" fontSize="11" fontWeight="bold">{val}</text>
        </g>
      ))}
    </g>
    <text x="510" y="175" textAnchor="middle" fill="#831843" fontSize="12">Largest → Smallest</text>
    <path d="M 400 195 L 620 195" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow)" />
    <text x="510" y="215" textAnchor="middle" fill="#ec4899" fontSize="11">Decreasing order</text>
    
    {/* Comparison Badge */}
    <rect x="290" y="230" width="120" height="30" rx="15" fill="#f59e0b" />
    <text x="350" y="250" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Just swap &gt; to &lt;</text>
  </svg>
);

const Topic11 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent mb-4">
            Bubble Sort - Descending Order
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Sorting arrays from largest to smallest - the same algorithm, just reversed comparison
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
                  ? "bg-pink-50 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 border-b-2 border-pink-600"
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
                  <span className="bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  Descending Order Bubble Sort
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Descending bubble sort is <strong className="text-pink-600 dark:text-pink-400">identical to ascending bubble sort</strong> except for the comparison operator. Instead of swapping when <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">arr[j] &gt; arr[j+1]</code>, we swap when <strong className="text-pink-600 dark:text-pink-400">arr[j] &lt; arr[j+1]</strong> to move smaller elements to the end.
                  </p>
                  <div className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-pink-800 dark:text-pink-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public static void bubbleSortDescending(int[] arr)</code><br />
                      <strong>Return Type:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">void</code> (sorts in-place)<br />
                      <strong>Key Difference:</strong> Swap condition changed from <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&gt;</code> to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;</code>
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison with Ascending */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🔄 Ascending vs Descending</h2>
                <AscendingVsDescendingSVG />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Ascending Order</h3>
                    <code className="block bg-gray-900 text-green-400 p-2 rounded text-sm">
                      {`if (arr[j] > arr[j+1]) {
    // Swap - larger moves right
    int temp = arr[j];
    arr[j] = arr[j+1];
    arr[j+1] = temp;
}`}
                    </code>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">Largest bubbles to the END</p>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-pink-800 dark:text-pink-300 mb-2">Descending Order</h3>
                    <code className="block bg-gray-900 text-green-400 p-2 rounded text-sm">
                      {`if (arr[j] < arr[j+1]) {
    // Swap - smaller moves right
    int temp = arr[j];
    arr[j] = arr[j+1];
    arr[j+1] = temp;
}`}
                    </code>
                    <p className="text-sm text-pink-700 dark:text-pink-300 mt-2">Smallest sinks to the END</p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ How Descending Bubble Sort Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>1️⃣ <strong>Start</strong> from the beginning of the array</p>
                    <p>2️⃣ <strong>Compare</strong> each adjacent pair (arr[j] and arr[j+1])</p>
                    <p>3️⃣ <strong>Swap if arr[j] &lt; arr[j+1]</strong> (when left is smaller than right)</p>
                    <p>4️⃣ <strong>After each pass</strong>, the smallest element "sinks" to the end</p>
                    <p>5️⃣ <strong>Result</strong> - Array sorted from largest to smallest</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Analogy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Heavy vs Light balls:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside">
                      <li>Ascending: Light balls float up, heavy sink down</li>
                      <li>Descending: Heavy float up, light sink down</li>
                      <li>Just reverse the comparison!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🏆 Leaderboard Ranking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">High scores displayed highest first - top scorers (Angshuman: 98, Riddhiman: 95, Swadeep: 92) bubble to front!</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📅 Recent Posts Feed</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Newest content first - dates sorted descending order (today → yesterday → last week).</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💰 Price Sorting (High to Low)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">E-commerce sites showing most expensive items first - customers see premium products initially.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">⭐ Rating Sorting</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">5-star reviews appear first, then 4-star, etc. - best rated products bubble to top in Barrackpore shopping app!</p>
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
                    <p className="text-xs">Already descending</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Average Case</p>
                    <p className="text-xl font-bold text-yellow-600">O(n²)</p>
                    <p className="text-xs">Random order</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Worst Case</p>
                    <p className="text-xl font-bold text-red-600">O(n²)</p>
                    <p className="text-xs">Ascending order</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Space</p>
                    <p className="text-xl font-bold text-blue-600">O(1)</p>
                    <p className="text-xs">In-place sorting</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Tips & Tricks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>One-character change:</strong> Just change <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&gt;</code> to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;</code> in swap condition</li>
                  <li>• <strong>Use Comparator:</strong> For objects, use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">comparator.reversed()</code> or swap comparison logic</li>
                  <li>• <strong>Best for:</strong> When you need largest elements first (leaderboards, top scores, recent items)</li>
                  <li>• <strong>Remember:</strong> The algorithm structure is IDENTICAL - only comparison changes!</li>
                </ul>
              </div>

              <Teacher note="The beauty of bubble sort is how simple it is to reverse order! I tell my students: 'Want descending? Just flip the comparison sign!' Have them practice by taking ascending code and changing one character. This reinforces understanding of how comparison operators control sort order. In Barrackpore, we use descending sort for class rank lists - highest percentage first!" />
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">👁️ Visual Walkthrough - Descending Order</h2>
                <BubbleSortDescendingVisualSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Watch the smallest elements "sink" to the end while largest bubble to front
                </p>
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
                        <th className="px-2 py-2 text-left text-sm font-semibold">Swap? (arr[j] &lt; arr[j+1]?)</th>
                        <th className="px-2 py-2 text-left text-sm font-semibold">Array After</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { pass: 1, j: 0, a: 45, b: 67, swap: '✓ (45<67)', result: '[67, 45, 23, 89, 12, 78, 34]' },
                        { pass: 1, j: 1, a: 45, b: 23, swap: '✗ (45<23? No)', result: '[67, 45, 23, 89, 12, 78, 34]' },
                        { pass: 1, j: 2, a: 23, b: 89, swap: '✓ (23<89)', result: '[67, 45, 89, 23, 12, 78, 34]' },
                        { pass: 1, j: 3, a: 23, b: 12, swap: '✗ (23<12? No)', result: '[67, 45, 89, 23, 12, 78, 34]' },
                        { pass: 1, j: 4, a: 12, b: 78, swap: '✓ (12<78)', result: '[67, 45, 89, 23, 78, 12, 34]' },
                        { pass: 1, j: 5, a: 12, b: 34, swap: '✓ (12<34)', result: '[67, 45, 89, 23, 78, 34, 12]' },
                        { pass: 2, j: 0, a: 67, b: 45, swap: '✗ (67<45? No)', result: '[67, 45, 89, 23, 78, 34, 12]' },
                        { pass: 2, j: 1, a: 45, b: 89, swap: '✓ (45<89)', result: '[67, 89, 45, 23, 78, 34, 12]' },
                        { pass: 2, j: 2, a: 45, b: 23, swap: '✗ (45<23? No)', result: '[67, 89, 45, 23, 78, 34, 12]' },
                        { pass: 2, j: 3, a: 23, b: 78, swap: '✓ (23<78)', result: '[67, 89, 45, 78, 23, 34, 12]' },
                        { pass: 2, j: 4, a: 23, b: 34, swap: '✓ (23<34)', result: '[67, 89, 45, 78, 34, 23, 12]' }
                      ].map((row, i) => (
                        <tr key={i} className={row.swap.includes('✓') ? 'bg-pink-50 dark:bg-pink-900/10' : ''}>
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

              <Teacher note="Visualizing descending sort helps students understand that algorithms are flexible - just one condition change creates completely different ordering. I have students trace both ascending and descending on same array to see the mirror effect!" />
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <JavaFileLoader 
                    fileModule={bubbleSortDescending}
                    title="BubbleSortDescending.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={bubbleSortDescendingOptimized}
                    title="BubbleSortDescendingOptimized.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={bubbleSortDescendingWithCompare}
                    title="BubbleSortDescendingWithCompare.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={bubbleSortDescendingObjects}
                    title="BubbleSortDescendingObjects.java"
                    highlightLines={[]}
                  />
                </div>
              </div>

              <Teacher note="Compare the descending code side-by-side with ascending. Students should notice ONLY the comparison operator changed! This is a powerful lesson - algorithms are patterns, and small tweaks produce different behaviors. Ask them: 'What other operators could we use?'" />
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
                      <p className="font-semibold">Using wrong comparison operator</p>
                      <p className="text-sm">Using <code className="bg-gray-200 px-1 rounded">&gt;</code> instead of <code className="bg-gray-200 px-1 rounded">&lt;</code> gives ascending order!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Confusing with ascending optimization</p>
                      <p className="text-sm">The swapped flag logic works the same - just the comparison changes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Forgetting stable property still holds</p>
                      <p className="text-sm">Descending bubble sort remains stable - equal elements keep relative order</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Best Practices</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Use method name clearly indicating descending sort (e.g., <code className="bg-gray-200 px-1 rounded">bubbleSortDescending</code>)</li>
                  <li>Add comment explaining comparison logic for clarity</li>
                  <li>Test with ascending, descending, and random arrays</li>
                  <li>Consider making sort direction a parameter for reusable code</li>
                  <li>Document that algorithm sorts in descending order (largest to smallest)</li>
                </ul>
              </div>

              {/* Hint Section */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💭 Think About...</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>🤔 How would you modify the code to sort in descending order using a Comparator?</li>
                  <li>🤔 What happens to the "bubbling" visualization when sorting descending?</li>
                  <li>🤔 Why does the smallest element end up at the end after first pass?</li>
                  <li>🤔 How would you create a generic sort that accepts ascending/descending flag?</li>
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

              <Teacher note="The leap from ascending to descending is small but conceptually important. It teaches that sorting order is just a matter of comparison logic. Challenge students: 'Write ONE sort method that can sort both ways using a boolean parameter.' This builds flexible thinking!" />
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
    question: "What is the only difference between ascending and descending bubble sort?",
    answer: "The comparison operator in the swap condition changes from > (greater than) to < (less than)."
  },
  {
    question: "In descending bubble sort, which elements 'bubble' to the end?",
    answer: "Smallest elements 'sink' to the end of the array, while largest elements move to the front."
  },
  {
    question: "Is descending bubble sort stable?",
    answer: "Yes! Like ascending bubble sort, descending version is also stable - equal elements maintain relative order."
  },
  {
    question: "What is the time complexity of descending bubble sort?",
    answer: "Same as ascending: Best O(n), Average O(n²), Worst O(n²). The algorithm structure is identical."
  },
  {
    question: "When would you use descending bubble sort?",
    answer: "Leaderboards (highest score first), recent posts (newest first), price sorting (highest to lowest), ratings (best first)."
  },
  {
    question: "How does the swapped flag optimization work in descending sort?",
    answer: "Exactly the same! Track if any swap occurred in a pass. If no swaps, array is already sorted descending."
  },
  {
    question: "Can we use the same method for both ascending and descending?",
    answer: "Yes! Add a boolean parameter 'ascending' and use conditional comparison: ascending ? arr[j] > arr[j+1] : arr[j] < arr[j+1]"
  },
  {
    question: "What's the best case for descending bubble sort?",
    answer: "Array already sorted in descending order - only one pass needed with swapped flag optimization."
  },
  {
    question: "What's the worst case for descending bubble sort?",
    answer: "Array sorted in ascending order - requires maximum comparisons and swaps (n² operations)."
  },
  {
    question: "How to sort objects in descending order?",
    answer: "Use comparator: if (comparator.compare(arr[j], arr[j+1]) < 0) for descending, or use comparator.reversed()"
  },
  {
    question: "Why do we swap when arr[j] < arr[j+1] for descending?",
    answer: "Because we want larger elements on left. If left is smaller than right, they're out of order and need swapping."
  },
  {
    question: "What happens to the largest element in first pass of descending sort?",
    answer: "It moves to the front (index 0) through successive swaps, 'bubbling up' to the beginning."
  },
  {
    question: "Is descending bubble sort adaptive?",
    answer: "Yes! With swapped flag optimization, it adapts to already sorted portions and terminates early."
  },
  {
    question: "How many passes needed for 10 elements in worst case?",
    answer: "9 passes maximum (n-1 passes) before array is fully sorted descending."
  },
  {
    question: "Can bubble sort descending handle duplicate values?",
    answer: "Yes, and it's stable - duplicates maintain their original relative order during sorting."
  },
  {
    question: "How to convert ascending code to descending?",
    answer: "Change if(arr[j] > arr[j+1]) to if(arr[j] < arr[j+1]). That's literally it!"
  },
  {
    question: "What's the space complexity of descending bubble sort?",
    answer: "O(1) - sorts in-place using only a temporary variable for swapping."
  },
  {
    question: "How would you sort strings in descending alphabetical order?",
    answer: "Use compareTo() and swap when arr[j].compareTo(arr[j+1]) < 0 (Z comes before A)."
  },
  {
    question: "Why teach descending sort separately?",
    answer: "Teaches that algorithm structure remains same while behavior changes via comparison logic - fundamental CS concept."
  },
  {
    question: "How to test if descending sort works correctly?",
    answer: "After sorting, verify arr[i] >= arr[i+1] for all i. Also test with duplicates, empty, and single-element arrays."
  }
];

export default Topic11;