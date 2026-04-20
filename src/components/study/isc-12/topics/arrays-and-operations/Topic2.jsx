import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files as raw strings
import bubbleSortBasic from "./topic2_files/BubbleSortBasic.java?raw";
import bubbleSortOptimized from "./topic2_files/BubbleSortOptimized.java?raw";
import selectionSortBasic from "./topic2_files/SelectionSortBasic.java?raw";
import selectionSortStepByStep from "./topic2_files/SelectionSortStepByStep.java?raw";
import compareSorts from "./topic2_files/CompareSorts.java?raw";

// Import FAQ and practice questions
import questions from './topic2_files/topic2_questions.js';
import practiceQuestions from './topic2_files/topic2_questions.js';

const Topic2 = () => {
    const [revealedAnswers, setRevealedAnswers] = useState(new Array(practiceQuestions.length).fill(false));

    const toggleAnswer = (index) => {
        setRevealedAnswers(prev => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4 animate-[slideUpFade_0.6s_ease-out]">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Sorting: Bubble & Selection
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Master two fundamental sorting algorithms: Bubble Sort (simple but slow) and Selection Sort (more efficient). Understand their logic, complexity, and practical use cases.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* Why Sorting? */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📊</span> Why Sorting Matters
                        </h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Sorting</strong> arranges data in a specific order (ascending or descending). It is a fundamental operation in computer science because sorted data enables faster searching (binary search), easier merging, and better data presentation.
                        </p>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world example:</strong> Swadeep, a teacher in Barrackpore, wants to arrange student marks in ascending order to find the highest and lowest scores quickly. 
                            Sorting algorithms like Bubble Sort and Selection Sort are the building blocks for more advanced sorting (Quick Sort, Merge Sort).
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> How would you sort a deck of cards? Which method is more intuitive: repeatedly swapping adjacent cards (bubble) or picking the smallest card each time (selection)?
                            </p>
                        </div>
                    </div>

                    {/* Bubble Sort */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🫧</span> Bubble Sort
                        </h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Bubble Sort</strong> repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. 
                            The pass through the list is repeated until no swaps are needed. Larger elements "bubble up" to the end.
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li><strong>Time Complexity:</strong> O(n²) worst/average case, O(n) best case (already sorted with optimization).</li>
                            <li><strong>Space Complexity:</strong> O(1) (in-place sorting).</li>
                            <li><strong>Stable:</strong> Yes (equal elements retain original order).</li>
                        </ul>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Basic Implementation</h3>
                        <JavaFileLoader 
                            fileModule={bubbleSortBasic}
                            title="BubbleSortBasic.java"
                            highlightLines={[]}
                        />
                        <h3 className="text-xl font-semibold mt-6 mb-2">Optimized Version (Early Exit)</h3>
                        <JavaFileLoader 
                            fileModule={bubbleSortOptimized}
                            title="BubbleSortOptimized.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="font-semibold">✅ When to use Bubble Sort:</p>
                            <p className="text-sm">Educational purposes, small datasets (&lt 100 elements), or when the array is nearly sorted (optimized version runs in O(n)).</p>
                        </div>
                    </div>

                    {/* Selection Sort */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🎯</span> Selection Sort
                        </h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Selection Sort</strong> divides the array into a sorted and an unsorted region. It repeatedly selects the smallest (or largest) element from the unsorted region and swaps it with the first unsorted element.
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li><strong>Time Complexity:</strong> O(n²) in all cases (best, average, worst).</li>
                            <li><strong>Space Complexity:</strong> O(1) (in-place).</li>
                            <li><strong>Stable:</strong> No (can be implemented as stable but usually not).</li>
                        </ul>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Basic Implementation</h3>
                        <JavaFileLoader 
                            fileModule={selectionSortBasic}
                            title="SelectionSortBasic.java"
                            highlightLines={[]}
                        />
                        <h3 className="text-xl font-semibold mt-6 mb-2">Step-by-Step Trace</h3>
                        <JavaFileLoader 
                            fileModule={selectionSortStepByStep}
                            title="SelectionSortStepByStep.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <p className="font-semibold">⚠️ Note:</p>
                            <p className="text-sm">Selection sort performs fewer swaps than bubble sort (n swaps vs O(n²) swaps), making it better when writing to memory is expensive.</p>
                        </div>
                    </div>

                    {/* Comparison */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚖️</span> Bubble vs Selection: Comparison
                        </h2>
                        <JavaFileLoader 
                            fileModule={compareSorts}
                            title="CompareSorts.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                <p className="font-semibold">Bubble Sort</p>
                                <ul className="text-sm list-disc list-inside">
                                    <li>Best-case O(n) (optimized)</li>
                                    <li>Stable</li>
                                    <li>Many swaps</li>
                                    <li>Intuitive for beginners</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                <p className="font-semibold">Selection Sort</p>
                                <ul className="text-sm list-disc list-inside">
                                    <li>Always O(n²)</li>
                                    <li>Not stable (usually)</li>
                                    <li>Fewer swaps (n swaps)</li>
                                    <li>Good for small arrays</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Off-by-one errors:</strong> In bubble sort, inner loop should go up to <code>n-i-1</code> to avoid accessing out of bounds.</li>
                            <li><strong>Forgetting optimization flag:</strong> Without a swap flag, bubble sort always runs O(n²) even on sorted data.</li>
                            <li><strong>Selection sort swapping with itself:</strong> When the minimum index equals the current index, swapping is unnecessary but harmless.</li>
                            <li><strong>Assuming stability matters:</strong> If stability is required, bubble sort is preferable; selection sort is generally unstable.</li>
                            <li><strong>Using sorting for large datasets:</strong> O(n²) algorithms are impractical for n > 10,000. Use Arrays.sort() (TimSort/Dual-Pivot QuickSort) for production.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ Use <code>Arrays.sort(arr)</code> for real projects – it's highly optimized.</li>
                            <li>✓ Understand sorting algorithms to appreciate why built-in sorts are better.</li>
                            <li>✓ Visualize swaps: draw arrays on paper and trace each pass.</li>
                            <li>✓ For nearly sorted data, optimized bubble sort is O(n).</li>
                            <li>✓ Selection sort minimizes writes – useful when swapping is expensive (e.g., EEPROM).</li>
                            <li>✓ Use <code>System.out.println(Arrays.toString(arr))</code> after each pass to debug.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="Start with bubble sort because it's intuitive: students can physically simulate swapping adjacent cards. Then introduce selection sort as a more efficient swap-wise algorithm. Emphasize that both are O(n²) but have different constant factors and stability characteristics. Use small arrays (size 5-6) for manual tracing. Encourage students to implement both and compare performance on random vs sorted data." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Sorting (Bubble & Selection) FAQs"
                        questions={questions}
                    />

                    {/* Practice Questions Section */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-3xl">✍️</span> Practice Questions
                        </h2>
                        <div className="space-y-4">
                            {practiceQuestions.map((item, idx) => (
                                <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                    <p className="font-medium">{idx+1}. {item.q}</p>
                                    <button 
                                        onClick={() => toggleAnswer(idx)}
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 transition"
                                    >
                                        {revealedAnswers[idx] ? "Hide Answer" : "Show Answer"}
                                    </button>
                                    {revealedAnswers[idx] && (
                                        <p className="mt-2 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                            {item.a}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic2;