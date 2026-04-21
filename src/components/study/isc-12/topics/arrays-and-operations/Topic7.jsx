import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import rowWiseTraversal from "./topic7_files/RowWiseTraversal.java?raw";
import columnWiseTraversal from "./topic7_files/ColumnWiseTraversal.java?raw";
import enhancedForLoop2D from "./topic7_files/EnhancedForLoop2D.java?raw";
import performanceCompare from "./topic7_files/PerformanceCompare.java?raw";
import traverseJagged from "./topic7_files/TraverseJagged.java?raw";

// Import FAQ and practice questions
import questions from './topic7_files/topic7_questions.js';
import practiceQuestions from './topic7_files/topic7_practice_questions.js';

// Fallback for missing practice questions
const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic7 = () => {
    const [revealedAnswers, setRevealedAnswers] = useState(new Array(safePracticeQuestions.length).fill(false));

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
                        Traversing a Matrix (Row-wise and Column-wise)
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Master the two fundamental ways to visit every element of a 2D array: row-major (by rows) and column-major (by columns). Understand performance implications and when to use each.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* What is Traversal? */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🚶</span> What is Matrix Traversal?
                        </h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Matrix traversal</strong> means visiting every element of a 2D array exactly once. The two most common patterns are:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li><strong>Row-wise (row-major):</strong> Visit all columns of first row, then all columns of second row, etc. (like reading a book).</li>
                            <li><strong>Column-wise (column-major):</strong> Visit all rows of first column, then all rows of second column, etc.</li>
                        </ul>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world example:</strong> Tuhina in Barrackpore has a seating chart (rows and columns). If she calls attendance row by row, that's row-wise traversal. 
                            If she calls column by column (all students in column 1 first), that's column-wise traversal.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> Which traversal would be more natural for a spreadsheet? For an image processing algorithm? Why does Java prefer row-wise traversal?
                            </p>
                        </div>
                    </div>

                    {/* Row-Wise Traversal */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">➡️</span> Row-Wise Traversal (Row-Major)
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Row-wise traversal uses an outer loop for rows and an inner loop for columns. This is the <strong>most common and efficient</strong> traversal in Java because of memory layout.
                        </p>
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                                <caption className="text-sm mb-2">Traversal Order (Row-Major): 1→2→3→4→5→6</caption>
                                <tbody>
                                    <tr><td className="border p-2 bg-blue-100">1</td><td className="border p-2">2</td><td className="border p-2">3</td></tr>
                                    <tr><td className="border p-2">4</td><td className="border p-2">5</td><td className="border p-2">6</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <JavaFileLoader 
                            fileModule={rowWiseTraversal}
                            title="RowWiseTraversal.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="font-semibold">✅ When to use:</p>
                            <p className="text-sm">Always prefer row-wise for rectangular matrices in Java – it's cache-friendly and faster.</p>
                        </div>
                    </div>

                    {/* Column-Wise Traversal */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⬇️</span> Column-Wise Traversal (Column-Major)
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Column-wise traversal swaps the loops: outer loop for columns, inner loop for rows. It's less efficient in Java due to memory access patterns.
                        </p>
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                                <caption className="text-sm mb-2">Traversal Order (Column-Major): 1→4→2→5→3→6</caption>
                                <tbody>
                                    <tr><td className="border p-2 bg-blue-100">1</td><td className="border p-2 bg-yellow-100">3</td><td className="border p-2 bg-green-100">5</td></tr>
                                    <tr><td className="border p-2 bg-blue-100">2</td><td className="border p-2 bg-yellow-100">4</td><td className="border p-2 bg-green-100">6</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <JavaFileLoader 
                            fileModule={columnWiseTraversal}
                            title="ColumnWiseTraversal.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <p className="font-semibold">⚠️ Performance Note:</p>
                            <p className="text-sm">Column-wise traversal causes many cache misses and can be 10x slower for large matrices. Use only when required by the problem (e.g., certain algorithms).</p>
                        </div>
                    </div>

                    {/* Enhanced For Loop (For-Each) */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🔄</span> Enhanced For Loop (For-Each)
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Java's enhanced for loop can also traverse a 2D array. The outer loop iterates over rows (as 1D arrays), and the inner loop iterates over columns.
                        </p>
                        <JavaFileLoader 
                            fileModule={enhancedForLoop2D}
                            title="EnhancedForLoop2D.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                            <p className="font-semibold">🎯 Use case:</p>
                            <p className="text-sm">Perfect for read-only operations (e.g., summing, printing) when you don't need row/column indices.</p>
                        </div>
                    </div>

                    {/* Performance Comparison */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚡</span> Performance Comparison
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Why is row-wise faster? Because Java stores 2D arrays as an array of row references, and each row is a contiguous block. Row-wise accesses elements in the same row consecutively, leveraging CPU caching.
                        </p>
                        <JavaFileLoader 
                            fileModule={performanceCompare}
                            title="PerformanceCompare.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Traversing Jagged Arrays */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🗺️</span> Traversing Jagged Arrays
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Jagged arrays require careful traversal: you must get each row's length individually using <code>matrix[i].length</code> inside the inner loop condition.
                        </p>
                        <JavaFileLoader 
                            fileModule={traverseJagged}
                            title="TraverseJagged.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Swapping loop order incorrectly:</strong> For row-wise, outer loop rows; for column-wise, outer loop columns.</li>
                            <li><strong>Assuming all rows have same length:</strong> Always use <code>matrix[i].length</code>, not a fixed column count.</li>
                            <li><strong>Using column-wise on large matrices unnecessarily:</strong> Causes poor performance.</li>
                            <li><strong>Forgetting to reset row/column indices:</strong> Not an issue with loops, but with manual traversal.</li>
                            <li><strong>Modifying array during enhanced for loop:</strong> For-each doesn't allow modification of primitive elements (modifies local copy).</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ Always prefer row-wise traversal in Java for best performance.</li>
                            <li>✓ Use enhanced for loop when you don't need indices – it's cleaner and less error-prone.</li>
                            <li>✓ For jagged arrays, always use <code>matrix[i].length</code> inside inner loop.</li>
                            <li>✓ To traverse in reverse order, reverse the loop counters (e.g., <code>for (int i=rows-1; i>=0; i--)</code>).</li>
                            <li>✓ If you need both row and column indices for computation, use traditional indexed loops.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="Use physical props: a grid of numbers and have students trace row-wise vs column-wise with their fingers. Emphasize that row-wise is like reading English text (left to right, top to bottom). Show performance demo: time both traversals on a 1000x1000 matrix – students will see dramatic difference. Relate to memory locality (cache lines)." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Matrix Traversal FAQs"
                        questions={questions}
                    />

                    {/* Practice Questions Section */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-3xl">✍️</span> Practice Questions
                        </h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            Test your understanding. Click "Show Answer" to reveal the answer and explanation.
                        </p>
                        {safePracticeQuestions.length === 0 ? (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-700 dark:text-red-300">
                                <p className="font-semibold">⚠️ Practice questions not loaded.</p>
                                <p className="text-sm mt-1">Make sure the file <code>topic7_practice_questions.js</code> exists in the <code>topic7_files/</code> folder and exports an array.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {safePracticeQuestions.map((item, idx) => (
                                    <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                        <p className="font-medium">{idx+1}. {item.q}</p>
                                        <button 
                                            onClick={() => toggleAnswer(idx)}
                                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 transition"
                                        >
                                            {revealedAnswers[idx] ? "Hide Answer" : "Show Answer"}
                                        </button>
                                        {revealedAnswers[idx] && (
                                            <div className="mt-2 space-y-2">
                                                <p className="text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                                    <strong>Answer:</strong> {item.a}
                                                </p>
                                                {item.explanation && (
                                                    <p className="text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm">
                                                        <strong>Explanation:</strong> {item.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic7;