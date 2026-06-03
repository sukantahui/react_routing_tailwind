import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import linearSearchBasic from "./topic3_files/LinearSearchBasic.java?raw";
import linearSearchWithFlag from "./topic3_files/LinearSearchWithFlag.java?raw";
import binarySearchIterative from "./topic3_files/BinarySearchIterative.java?raw";
import binarySearchRecursive from "./topic3_files/BinarySearchRecursive.java?raw";
import binarySearchWithDuplicates from "./topic3_files/BinarySearchWithDuplicates.java?raw";
import compareSearches from "./topic3_files/CompareSearches.java?raw";

// Import FAQ and practice questions
import questions from './topic3_files/topic3_questions.js';
import practiceQuestions from './topic3_files/topic3_practice_questions.js';

// Fallback for missing practice questions
const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic3 = () => {
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
                        Searching: Linear & Binary
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Master two essential search algorithms: Linear Search (simple, works on unsorted data) and Binary Search (fast, requires sorted data). Learn when and how to use each.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">

                    {/* Why Searching? */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🔍</span> Why Searching Matters
                        </h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Searching</strong> is the process of finding a specific element (the target) within a collection. It's one of the most common operations in computing: looking up a contact in a phonebook, finding a word in a dictionary, or locating a student record in a database.
                        </p>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world example:</strong> Tuhina wants to find her exam roll number in a list of 200 students at Shyamnagar High School.
                            She can either scan the list one by one (linear search) or, if the list is sorted by roll number, jump to the middle and narrow down (binary search).
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> How do you search for a word in a printed dictionary? You don't start from page 1 – you open somewhere in the middle. That's binary search!
                            </p>
                        </div>
                    </div>

                    {/* Linear Search */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🔎</span> Linear Search
                        </h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Linear Search</strong> (also called sequential search) checks each element in order until the target is found or the end is reached.
                            It works on <strong>any array</strong> (sorted or unsorted) and is the simplest search algorithm.
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li><strong>Time Complexity:</strong> O(n) worst case, O(1) best case (target at first position).</li>
                            <li><strong>Space Complexity:</strong> O(1) (no extra space).</li>
                            <li><strong>When to use:</strong> Small arrays, unsorted data, or when you need to find the first occurrence.</li>
                        </ul>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Basic Implementation</h3>
                        <JavaFileLoader
                            fileModule={linearSearchBasic}
                            title="LinearSearchBasic.java"
                            highlightLines={[]}
                        />
                        <h3 className="text-xl font-semibold mt-6 mb-2">With Early Exit (returning index)</h3>
                        <JavaFileLoader
                            fileModule={linearSearchWithFlag}
                            title="LinearSearchWithFlag.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="font-semibold">✅ Advantage of Linear Search:</p>
                            <p className="text-sm">No preprocessing required; works on any data; finds first occurrence naturally; simple to implement.</p>
                        </div>
                    </div>

                    {/* Binary Search */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚡</span> Binary Search
                        </h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Binary Search</strong> is a divide-and-conquer algorithm that repeatedly divides the search interval in half.
                            It <strong>requires the array to be sorted</strong>. Compare the target with the middle element; if equal, done; if smaller, search left half; if larger, search right half.
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li><strong>Time Complexity:</strong> O(log n) – extremely fast for large arrays.</li>
                            <li><strong>Space Complexity:</strong> O(1) for iterative, O(log n) for recursive (call stack).</li>
                            <li><strong>When to use:</strong> Large sorted arrays, databases, dictionaries, any situation with sorted data.</li>
                        </ul>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Iterative Implementation</h3>
                        <JavaFileLoader
                            fileModule={binarySearchIterative}
                            title="BinarySearchIterative.java"
                            highlightLines={[]}
                        />
                        <h3 className="text-xl font-semibold mt-6 mb-2">Recursive Implementation</h3>
                        <JavaFileLoader
                            fileModule={binarySearchRecursive}
                            title="BinarySearchRecursive.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <p className="font-semibold">⚠️ Important:</p>
                            <p className="text-sm">Binary search only works on sorted arrays. If you use it on unsorted data, results are unpredictable (and wrong).</p>
                        </div>
                    </div>

                    {/* Binary Search with Duplicates */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🔄</span> Handling Duplicates
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Standard binary search returns <strong>any</strong> occurrence of the target. If duplicates exist and you need the <strong>first or last</strong> occurrence, you must modify the algorithm.
                        </p>
                        <JavaFileLoader
                            fileModule={binarySearchWithDuplicates}
                            title="BinarySearchWithDuplicates.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                            <p className="font-semibold">🎯 Use cases:</p>
                            <p className="text-sm">Finding leftmost occurrence (lower bound) or rightmost occurrence (upper bound) in a sorted array with duplicates.</p>
                        </div>
                    </div>

                    {/* Comparison */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚖️</span> Linear vs Binary: Comparison
                        </h2>
                        <JavaFileLoader
                            fileModule={compareSearches}
                            title="CompareSearches.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                <p className="font-semibold">Linear Search</p>
                                <ul className="text-sm list-disc list-inside">
                                    <li>O(n) time</li>
                                    <li>Works on unsorted data</li>
                                    <li>Simple to implement</li>
                                    <li>Finds first occurrence naturally</li>
                                    <li>Good for small arrays (n &lt; 100)</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                <p className="font-semibold">Binary Search</p>
                                <ul className="text-sm list-disc list-inside">
                                    <li>O(log n) time</li>
                                    <li>Requires sorted array</li>
                                    <li>More complex logic</li>
                                    <li>Very fast for large n (1M elements → ~20 steps)</li>
                                    <li>Used in databases, libraries</li>
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
                            <li><strong>Binary search on unsorted array:</strong> Returns incorrect result or infinite loop.</li>
                            <li><strong>Off-by-one errors:</strong> Using <code>low &lt;= high</code> vs <code>low &lt; high</code> incorrectly causes missed elements or infinite loops.</li>
                            <li><strong>Integer overflow in mid calculation:</strong> <code>(low + high) / 2</code> can overflow for large arrays. Use <code>low + (high - low) / 2</code>.</li>
                            <li><strong>Assuming binary search always returns first occurrence:</strong> It returns any occurrence; for first/last, use modified version.</li>
                            <li><strong>Not handling empty arrays:</strong> Always check if array is null or length 0 before searching.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ Use <code>Arrays.binarySearch(arr, key)</code> for production – it's optimized and returns insertion point if not found.</li>
                            <li>✓ For linear search on small arrays (n &lt; 50), it's often faster than binary search due to overhead.</li>
                            <li>✓ If you search the same sorted array many times, sort once then use binary search.</li>
                            <li>✓ To find first occurrence, modify binary search to continue searching left even after finding target.</li>
                            <li>✓ Use <code>low + (high - low) / 2</code> to prevent integer overflow.</li>
                            <li>✓ In Java, <code>Arrays.binarySearch()</code> returns <code>-(insertionPoint)-1</code> if not found, which is useful for insertion.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="Start with linear search – it's intuitive. Then introduce binary search as a 'magic trick' to show how much faster it is. Use physical props: a sorted list of numbers and ask students to guess a number by always halving the range. Emphasize that sorting is a prerequisite. Show the logarithmic growth: 1024 elements take only 10 steps! This is a turning point in algorithm analysis." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Searching (Linear & Binary) FAQs"
                        questions={questions}
                    />

                    {/* Practice Questions Section with Explanation */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-3xl">✍️</span> Practice Questions
                        </h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            Test your understanding. Click "Show Answer" to reveal the answer and explanation.
                        </p>
                        <div className="space-y-4">
                            {safePracticeQuestions.map((item, idx) => (
                                <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                    <p className="font-medium">{idx + 1}. {item.q}</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic3;