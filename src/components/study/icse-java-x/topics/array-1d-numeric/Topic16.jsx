import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files
import secondLargestBasic from "./topic16_files/SecondLargestBasic.java?raw";
import secondLargestWithDuplicates from "./topic16_files/SecondLargestWithDuplicates.java?raw";
import secondLargestSinglePass from "./topic16_files/SecondLargestSinglePass.java?raw";
import secondLargestObjects from "./topic16_files/SecondLargestObjects.java?raw";

// SVG Components for Finding Second Largest Element
const SecondLargestVisualSVG = () => {
  const [step, setStep] = useState(0);
  
  const stages = [
    { label: "Initialize: first = -∞, second = -∞", first: null, second: null, currentIdx: -1, array: [45, 67, 23, 89, 12, 78, 34] },
    { label: "i=0: arr[0]=45 → first=45, second=-∞", first: 45, second: null, currentIdx: 0, array: [45, 67, 23, 89, 12, 78, 34] },
    { label: "i=1: arr[1]=67 > first(45) → second=45, first=67", first: 67, second: 45, currentIdx: 1, array: [45, 67, 23, 89, 12, 78, 34] },
    { label: "i=2: arr[2]=23 → between first(67) and second(45)? No", first: 67, second: 45, currentIdx: 2, array: [45, 67, 23, 89, 12, 78, 34] },
    { label: "i=3: arr[3]=89 > first(67) → second=67, first=89", first: 89, second: 67, currentIdx: 3, array: [45, 67, 23, 89, 12, 78, 34] },
    { label: "i=4: arr[4]=12 → between first(89) and second(67)? No", first: 89, second: 67, currentIdx: 4, array: [45, 67, 23, 89, 12, 78, 34] },
    { label: "i=5: arr[5]=78 → between first(89) and second(67)? Yes (78>67) → second=78", first: 89, second: 78, currentIdx: 5, array: [45, 67, 23, 89, 12, 78, 34] },
    { label: "i=6: arr[6]=34 → between first(89) and second(78)? No", first: 89, second: 78, currentIdx: 6, array: [45, 67, 23, 89, 12, 78, 34] },
    { label: "✓ Complete! First=89, Second=78", first: 89, second: 78, currentIdx: -1, array: [45, 67, 23, 89, 12, 78, 34] }
  ];

  return (
    <div className="w-full">
      <svg viewBox="0 0 950 400" className="w-full h-auto max-w-6xl mx-auto my-4" aria-label="Finding Second Largest Visualization">
        <defs>
          <linearGradient id="secondGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 0.2 }} />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>
        
        {/* Title */}
        <text x="475" y="25" textAnchor="middle" fill="#1e293b" dark:text-gray-200 fontSize="13" fontWeight="bold">
          {stages[step].label}
        </text>
        
        {/* First and Second Display */}
        <rect x="50" y="40" width="200" height="35" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="150" y="62" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">
          1st: {stages[step].first !== null ? stages[step].first : "-∞"}
        </text>
        
        <rect x="280" y="40" width="200" height="35" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="380" y="62" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">
          2nd: {stages[step].second !== null ? stages[step].second : "-∞"}
        </text>
        
        {/* Array Visualization */}
        {stages[step].array.map((val, idx) => (
          <g key={idx} transform={`translate(${idx * 105 + 50}, 100)`}>
            <rect 
              x="0" y="0" width="85" height="60" rx="6" 
              fill={idx === stages[step].currentIdx ? "#fef3c7" : "#ffffff"}
              stroke={
                idx === stages[step].currentIdx ? "#f59e0b" : 
                (val === stages[step].first ? "#10b981" : 
                 (val === stages[step].second ? "#3b82f6" : "#cbd5e1"))
              }
              strokeWidth={idx === stages[step].currentIdx ? "3" : "2"}
              className="transition-all duration-300 hover:shadow-lg"
              filter="url(#shadow)"
            >
              {idx === stages[step].currentIdx && (
                <animate attributeName="stroke" values="#f59e0b;#ef4444;#f59e0b" dur="0.8s" repeatCount="indefinite" />
              )}
              {val === stages[step].first && (
                <animate attributeName="fill" values="#d1fae5;#a7f3d0;#d1fae5" dur="1.5s" repeatCount="indefinite" />
              )}
              {val === stages[step].second && (
                <animate attributeName="fill" values="#dbeafe;#bfdbfe;#dbeafe" dur="1.5s" repeatCount="indefinite" />
              )}
            </rect>
            <text x="42" y="35" textAnchor="middle" fill="#1e293b" fontSize="20" fontWeight="bold">{val}</text>
            <text x="42" y="78" textAnchor="middle" fill="#94a3b8" fontSize="10">index {idx}</text>
            
            {/* Labels */}
            {val === stages[step].first && (
              <text x="42" y="-10" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">🥇 1st</text>
            )}
            {val === stages[step].second && stages[step].second !== null && (
              <text x="42" y="-10" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">🥈 2nd</text>
            )}
          </g>
        ))}
        
        {/* Navigation Button */}
        <g transform="translate(375, 300)">
          <rect x="0" y="0" width="200" height="35" rx="8" fill="#f59e0b" className="cursor-pointer hover:fill-orange-600 transition-all duration-300" />
          <text x="100" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="cursor-pointer">
            {step < 8 ? "Next Step →" : "Reset"}
          </text>
        </g>
      </svg>
      <div className="text-center mt-2">
        <button 
          onClick={() => setStep((step + 1) % 9)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
        >
          {step < 8 ? "Next Step (Step " + (step + 2) + "/9)" : "Reset Animation"}
        </button>
      </div>
    </div>
  );
};

const AlgorithmComparisonSVG = () => (
  <svg viewBox="0 0 700 250" className="w-full h-auto max-w-3xl mx-auto my-4">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
      </marker>
    </defs>
    
    {/* Method 1: Sort Approach */}
    <rect x="50" y="20" width="280" height="200" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
    <text x="190" y="50" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="bold">Method 1: Sort</text>
    <text x="190" y="75" textAnchor="middle" fill="#7f1d1d" fontSize="11">Arrays.sort(arr)</text>
    <text x="190" y="95" textAnchor="middle" fill="#7f1d1d" fontSize="11">return arr[n-2]</text>
    <line x1="70" y1="110" x2="310" y2="110" stroke="#ef4444" strokeWidth="1" />
    <text x="190" y="130" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">Complexity: O(n log n)</text>
    <text x="190" y="150" textAnchor="middle" fill="#7f1d1d" fontSize="11">Easy to implement</text>
    <text x="190" y="170" textAnchor="middle" fill="#7f1d1d" fontSize="11">Inefficient for large n</text>
    <text x="190" y="190" textAnchor="middle" fill="#7f1d1d" fontSize="11">Modifies original array</text>
    
    {/* Method 2: Two Pass */}
    <rect x="370" y="20" width="280" height="200" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="510" y="50" textAnchor="middle" fill="#92400e" fontSize="14" fontWeight="bold">Method 2: Two Pass</text>
    <text x="510" y="75" textAnchor="middle" fill="#92400e" fontSize="11">1st pass: find max</text>
    <text x="510" y="95" textAnchor="middle" fill="#92400e" fontSize="11">2nd pass: find max &lt; first</text>
    <line x1="390" y1="110" x2="630" y2="110" stroke="#f59e0b" strokeWidth="1" />
    <text x="510" y="130" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">Complexity: O(2n) = O(n)</text>
    <text x="510" y="150" textAnchor="middle" fill="#92400e" fontSize="11">Doesn't modify array</text>
    <text x="510" y="170" textAnchor="middle" fill="#92400e" fontSize="11">2 passes over array</text>
    <text x="510" y="190" textAnchor="middle" fill="#92400e" fontSize="11">Handles duplicates</text>
    
    {/* Method 3: Single Pass */}
    <rect x="50" y="230" width="600" height="50" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
    <text x="350" y="250" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="bold">Method 3: Single Pass (Best!)</text>
    <text x="350" y="268" textAnchor="middle" fill="#166534" fontSize="11">Track both largest and second largest in one pass → O(n) time, O(1) space</text>
  </svg>
);

const Topic16 = () => {
  const [activeSection, setActiveSection] = useState('theory');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-4">
            Finding the Second Largest Element
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Tracking the top two values in a single pass - the runner-up problem
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
                  What is the Second Largest?
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    The <strong className="text-orange-600 dark:text-orange-400">second largest element</strong> is the maximum value that is <strong className="text-orange-600 dark:text-orange-400">less than the largest element</strong>. Finding it efficiently requires tracking both the largest and second largest in a single pass, or using other approaches like sorting or two passes.
                  </p>
                  <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg mb-4">
                    <p className="text-sm text-orange-800 dark:text-orange-200 font-mono">
                      <strong>Prototype:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public static int findSecondLargest(int[] arr)</code><br />
                      <strong>Return Type:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int</code> (second largest value)<br />
                      <strong>Purpose:</strong> Find runner-up value without sorting entire array<br />
                      <strong>Key Challenge:</strong> Handle duplicates correctly!
                    </p>
                  </div>
                </div>
              </div>

              {/* Three Approaches Comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🔄 Three Approaches Compared</h2>
                <AlgorithmComparisonSVG />
              </div>

              {/* How It Works - Single Pass */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚙️ Single Pass Algorithm (Best Approach)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>1️⃣ <strong>Initialize</strong> first = Integer.MIN_VALUE, second = Integer.MIN_VALUE</p>
                    <p>2️⃣ <strong>Traverse</strong> each element in array</p>
                    <p>3️⃣ <strong>If current > first</strong> → second = first, first = current</p>
                    <p>4️⃣ <strong>Else if current > second AND current != first</strong> → second = current</p>
                    <p>5️⃣ <strong>After loop</strong>, second contains second largest</p>
                    <p>6️⃣ <strong>Edge case</strong> - If second still MIN_VALUE, no second largest exists</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Analogy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Race competition:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2 list-disc list-inside">
                      <li>Track 1st place (gold medalist)</li>
                      <li>Track 2nd place (silver medalist)</li>
                      <li>When new 1st place found, old 1st becomes 2nd</li>
                      <li>When someone beats 2nd but not 1st, update 2nd</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Real World Examples */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">🌍 Real-World Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🏅 Olympic Medal Tracking</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding silver medalist (second highest score) after gold medalist.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📊 Class Rank</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Teacher Sukanta Hui finding second topper after Nandini scored highest.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💰 Stock Market</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Finding second highest stock price of the day.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg group hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🎮 Game High Scores</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Displaying second highest score on leaderboard.</p>
                  </div>
                </div>
              </div>

              {/* Complexity Analysis */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">📊 Complexity Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Sort Method</p>
                    <p className="text-lg font-bold text-green-600">O(n log n)</p>
                    <p className="text-xs">Simplest code</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Two Pass Method</p>
                    <p className="text-lg font-bold text-yellow-600">O(2n) = O(n)</p>
                    <p className="text-xs">2 traversals</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Single Pass (Best)</p>
                    <p className="text-lg font-bold text-blue-600">O(n)</p>
                    <p className="text-xs">1 traversal, O(1) space</p>
                  </div>
                </div>
              </div>

              {/* Edge Cases */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">⚠️ Edge Cases to Consider</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-semibold text-yellow-800">Duplicate largest values</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">If all largest values are same, second largest is next distinct value</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-semibold text-yellow-800">Array with 1 element</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">No second largest exists</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-semibold text-yellow-800">All elements equal</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">No second largest (all values same)</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-semibold text-yellow-800">Negative numbers</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Works fine with proper initialization</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💡 Tips & Tricks</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>Initialize with MIN_VALUE:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Integer.MIN_VALUE</code> for proper negative handling</li>
                  <li>• <strong>Handle duplicates carefully:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">current != first</code> check</li>
                  <li>• <strong>Return sentinel:</strong> If no second largest exists, return <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Integer.MIN_VALUE</code> or throw exception</li>
                  <li>• <strong>Track indices too:</strong> Useful when positions matter</li>
                  <li>• <strong>Extension:</strong> Same logic works for top K elements with priority queue</li>
                </ul>
              </div>

              <Teacher note="The second largest problem teaches multi-variable tracking! I tell students: 'It's like running a race and remembering both gold and silver medalists.' The single pass solution is elegant - only O(n) time and O(1) space. Challenge: Extend to top 3 or top K elements!" />
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">👁️ Visual Walkthrough</h2>
                <SecondLargestVisualSVG />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Watch how first and second place change as we find larger values
                </p>
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
                        <th className="px-3 py-2 text-left text-sm font-semibold">Comparison</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">First (1st)</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Second (2nd)</th>
                        <th className="px-3 py-2 text-left text-sm font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { step: 1, i: 0, val: 45, compare: "-", first: 45, second: "MIN", action: "Initialize" },
                        { step: 2, i: 1, val: 67, compare: "67 > 45", first: 67, second: 45, action: "Update first→second" },
                        { step: 3, i: 2, val: 23, compare: "23 between?", first: 67, second: 45, action: "No change" },
                        { step: 4, i: 3, val: 89, compare: "89 > 67", first: 89, second: 67, action: "Update first→second" },
                        { step: 5, i: 4, val: 12, compare: "12 between?", first: 89, second: 67, action: "No change" },
                        { step: 6, i: 5, val: 78, compare: "78 between 67 and 89", first: 89, second: 78, action: "Update second" },
                        { step: 7, i: 6, val: 34, compare: "34 between?", first: 89, second: 78, action: "No change" }
                      ].map((row, i) => (
                        <tr key={i} className={row.action.includes("Update") ? "bg-orange-50 dark:bg-orange-900/20" : ""}>
                          <td className="px-3 py-2 text-sm">{row.step}</td>
                          <td className="px-3 py-2 text-sm">{row.i}</td>
                          <td className="px-3 py-2 text-sm">{row.val}</td>
                          <td className="px-3 py-2 text-sm">{row.compare}</td>
                          <td className="px-3 py-2 text-sm font-bold text-green-600">{row.first}</td>
                          <td className="px-3 py-2 text-sm font-bold text-blue-600">{row.second}</td>
                          <td className="px-3 py-2 text-sm">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Teacher note="The animation clearly shows the 'medal tracking' analogy. Have students predict when first and second will update. This builds intuition for multi-variable state tracking - a crucial programming skill!" />
            </div>
          )}

          {activeSection === 'code' && (
            <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out]">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                  <JavaFileLoader 
                    fileModule={secondLargestBasic}
                    title="SecondLargestBasic.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={secondLargestWithDuplicates}
                    title="SecondLargestWithDuplicates.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={secondLargestSinglePass}
                    title="SecondLargestSinglePass.java"
                    highlightLines={[]}
                  />
                  
                  <JavaFileLoader 
                    fileModule={secondLargestObjects}
                    title="SecondLargestObjects.java"
                    highlightLines={[]}
                  />
                </div>
              </div>

              <Teacher note="Compare the three approaches: sorting (easy but slow), two-pass (clear but 2 traversals), single-pass (optimal). The single-pass solution is a great example of optimizing by tracking additional state. Have students implement all three and compare performance!" />
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
                      <p className="font-semibold">Not handling duplicates</p>
                      <p className="text-sm">For [10, 10, 5], second largest should be 5, not 10</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Incorrect initialization</p>
                      <p className="text-sm">Initializing both to 0 fails with negative numbers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="text-red-600 text-xl">❌</span>
                    <div>
                      <p className="font-semibold">Not checking if second exists</p>
                      <p className="text-sm">Returning second without checking if it was updated</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">✅ Best Practices</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Use <code className="bg-gray-200 px-1 rounded">Integer.MIN_VALUE</code> for initialization</li>
                  <li>Add duplicate check: <code className="bg-gray-200 px-1 rounded">current != first</code></li>
                  <li>Return sentinel or throw exception if second largest doesn't exist</li>
                  <li>Consider using <code className="bg-gray-200 px-1 rounded">long</code> for sum to avoid overflow</li>
                  <li>Document edge case behavior clearly</li>
                </ul>
              </div>

              {/* Hint Section */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">💭 Think About...</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>🤔 How would you find the third largest element?</li>
                  <li>🤔 Can you find second largest without using MIN_VALUE initialization?</li>
                  <li>🤔 How would you handle an array with all identical values?</li>
                  <li>🤔 What's the minimum number of comparisons needed?</li>
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

              <Teacher note="The second largest problem is excellent for teaching edge cases! Students often forget about duplicates or arrays with no second largest. Have them write test cases that break their code - this builds robust programming habits." />
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
    question: "What is the second largest element?",
    answer: "The maximum value that is strictly less than the largest element in the array."
  },
  {
    question: "What's the time complexity of finding second largest?",
    answer: "O(n) using single pass method, O(n log n) using sorting."
  },
  {
    question: "How to handle duplicates when finding second largest?",
    answer: "Use condition 'current != first' when updating second to skip duplicate largest values."
  },
  {
    question: "What if array has only one element?",
    answer: "There is no second largest element. Should return sentinel (MIN_VALUE) or throw exception."
  },
  {
    question: "What if all elements are equal?",
    answer: "No second largest exists since all values are identical."
  },
  {
    question: "Why use Integer.MIN_VALUE for initialization?",
    answer: "To handle negative numbers correctly. Initializing with 0 would fail for arrays with all negative numbers."
  },
  {
    question: "What's the best approach for finding second largest?",
    answer: "Single pass tracking both first and second - O(n) time, O(1) space, doesn't modify original array."
  },
  {
    question: "How to find second largest using sorting?",
    answer: "Sort array ascending, then traverse from end to find first element different from largest."
  },
  {
    question: "What's the two-pass method?",
    answer: "First pass find largest, second pass find largest element less than first largest."
  },
  {
    question: "Can we find second largest using streams?",
    answer: "Yes: Arrays.stream(arr).boxed().sorted(Comparator.reverseOrder()).distinct().skip(1).findFirst()"
  },
  {
    question: "How to find third largest?",
    answer: "Extend the logic - track first, second, and third largest, updating all three appropriately."
  },
  {
    question: "What's the minimum number of comparisons needed?",
    answer: "n + log n - 2 comparisons using tournament method (optimal)."
  },
  {
    question: "How does tournament method work?",
    answer: "Compare elements in pairs, track winners and the elements that lost to the champion."
  },
  {
    question: "What's wrong with sorting to find second largest?",
    answer: "Sorting is O(n log n) vs O(n) optimal. Also modifies original array unless you copy."
  },
  {
    question: "How to find second largest in 2D array?",
    answer: "Flatten or traverse all elements tracking first and second largest across all rows and columns."
  },
  {
    question: "What if second largest doesn't exist?",
    answer: "Return Integer.MIN_VALUE or throw IllegalArgumentException based on requirements."
  },
  {
    question: "How to find second largest in ArrayList?",
    answer: "Same logic using list.get(i) and manual traversal, or Collections.sort() then find."
  },
  {
    question: "Why is single pass better than two-pass?",
    answer: "Single pass makes only one traversal (n comparisons) vs two traversals (2n comparisons)."
  },
  {
    question: "How to handle empty array?",
    answer: "Check array length first. If length < 2, return sentinel or throw exception."
  },
  {
    question: "Can we use priority queue to find second largest?",
    answer: "Yes, but O(n log k) where k=2, so O(n) with heap of size 2, but simpler to track variables."
  }
];

export default Topic16;