import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import addressRowMajor from "./topic12_files/AddressRowMajor.java?raw";
import addressColumnMajor from "./topic12_files/AddressColumnMajor.java?raw";
import addressBothOrders from "./topic12_files/AddressBothOrders.java?raw";
import addressWith1BasedIndex from "./topic12_files/AddressWith1BasedIndex.java?raw";
import addressWithPadding from "./topic12_files/AddressWithPadding.java?raw";

// Import FAQ and practice questions
import questions from './topic12_files/topic12_questions.js';
import practiceQuestions from './topic12_files/topic12_practice_questions.js';

const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic12 = () => {
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
                        Finding Address of A[i][j] in 2D Array
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Learn how to compute the exact memory address of any element in a 2D array using row-major and column-major formulas. Master step-by-step calculations with real-world examples.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* The General Approach */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🎯</span> The General Approach
                        </h2>
                        <p className="leading-relaxed mb-4">
                            To find the address of <code>A[i][j]</code> in a 2D array, you need four pieces of information:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li><strong>Base address (B):</strong> Starting address of the array.</li>
                            <li><strong>Number of rows (M)</strong> and <strong>columns (N)</strong>.</li>
                            <li><strong>Element size (S):</strong> Bytes per element.</li>
                            <li><strong>Storage order:</strong> Row-major or column-major.</li>
                        </ul>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center my-4">
                            <p className="font-bold">Universal Pattern: Address = Base + (offset) × ElementSize</p>
                            <p className="text-sm mt-1">The offset depends on storage order and indices.</p>
                        </div>
                        <p className="leading-relaxed">
                            <strong>Real-world scenario:</strong> Swadeep in Barrackpore writes a C program to process a large matrix. He needs to access <code>matrix[10][20]</code> efficiently. 
                            By understanding the address formula, he can use pointer arithmetic to jump directly to the element without repeated index calculations.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> How does the address change if you swap rows and columns? Why does the formula for row-major look different from column-major?
                            </p>
                        </div>
                    </div>

                    {/* Row-Major Address Calculation */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">➡️</span> Row-Major Address: Step-by-Step
                        </h2>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-4">
                            <p className="font-mono text-center text-xl">Address = B + (i × N + j) × S</p>
                        </div>
                        <div className="space-y-3">
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                <p className="font-semibold">Example 1:</p>
                                <p className="text-sm">int arr[4][5], B=1000, S=4. Find address of arr[2][3].</p>
                                <p className="text-sm">Step 1: i=2, j=3, N=5 → offset = 2×5 + 3 = 13</p>
                                <p className="text-sm">Step 2: Byte offset = 13 × 4 = 52</p>
                                <p className="text-sm">Step 3: Address = 1000 + 52 = 1052</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                <p className="font-semibold">Example 2:</p>
                                <p className="text-sm">double mat[3][6], B=2000, S=8. Find address of mat[1][4].</p>
                                <p className="text-sm">offset = 1×6 + 4 = 10 → byte offset = 10×8=80 → address=2080</p>
                            </div>
                        </div>
                        <JavaFileLoader 
                            fileModule={addressRowMajor}
                            title="AddressRowMajor.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Column-Major Address Calculation */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⬇️</span> Column-Major Address: Step-by-Step
                        </h2>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg mb-4">
                            <p className="font-mono text-center text-xl">Address = B + (j × M + i) × S</p>
                        </div>
                        <div className="space-y-3">
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                <p className="font-semibold">Example 1:</p>
                                <p className="text-sm">int arr[4][5], B=1000, S=4. Find address of arr[2][3] in column-major.</p>
                                <p className="text-sm">Step 1: i=2, j=3, M=4 → offset = 3×4 + 2 = 14</p>
                                <p className="text-sm">Step 2: Byte offset = 14 × 4 = 56</p>
                                <p className="text-sm">Step 3: Address = 1000 + 56 = 1056</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                <p className="font-semibold">Example 2:</p>
                                <p className="text-sm">double mat[3][6], B=2000, S=8. Find address of mat[1][4] in column-major.</p>
                                <p className="text-sm">offset = 4×3 + 1 = 13 → byte offset = 13×8=104 → address=2104</p>
                            </div>
                        </div>
                        <JavaFileLoader 
                            fileModule={addressColumnMajor}
                            title="AddressColumnMajor.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Comparing Both Orders */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚖️</span> Comparing Row-Major and Column-Major
                        </h2>
                        <p className="leading-relaxed mb-4">
                            For the same array and same element, the address may differ between the two orders. The difference is <code>(j×M + i) - (i×N + j)</code> multiplied by S.
                        </p>
                        <JavaFileLoader 
                            fileModule={addressBothOrders}
                            title="AddressBothOrders.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                                <thead className="bg-gray-200 dark:bg-gray-700">
                                    <tr><th className="border p-2">Array</th><th>Element</th><th>Row-Major Address</th><th>Column-Major Address</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className="border p-2">int[4][5] B=1000 S=4</td><td>[2][3]</td><td>1052</td><td>1056</td></tr>
                                    <tr><td className="border p-2">double[3][6] B=2000 S=8</td><td>[1][4]</td><td>2080</td><td>2104</td></tr>
                                    <tr><td className="border p-2">char[10][10] B=5000 S=1</td><td>[5][7]</td><td>5057</td><td>5075</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Handling 1-Based Indices */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">1️⃣</span> Handling 1-Based Indices
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Some problems use 1-based indexing (rows and columns start at 1). Convert to 0-based first: <code>i0 = i1 - 1</code>, <code>j0 = j1 - 1</code>, then apply the formula.
                        </p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                            <p className="font-semibold">Example:</p>
                            <p className="text-sm">int arr[4][5] (1-based: rows 1-4, cols 1-5), B=1000, S=4. Find address of element at (3,4) (1-based) in row-major.</p>
                            <p className="text-sm">Convert: i=2, j=3. offset = 2×5+3=13, address=1000+13×4=1052.</p>
                        </div>
                        <JavaFileLoader 
                            fileModule={addressWith1BasedIndex}
                            title="AddressWith1BasedIndex.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Advanced: Padding and Non-Contiguous Storage */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📏</span> Advanced: Padding and Stride
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In some systems, compilers add padding between rows for alignment. In such cases, replace N with the <strong>stride</strong> (row width in elements including padding).<br/>
                            Row-major with stride: <code>Address = B + (i × Stride + j) × S</code>
                        </p>
                        <JavaFileLoader 
                            fileModule={addressWithPadding}
                            title="AddressWithPadding.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Mixing up M and N:</strong> In row-major, N is columns; in column-major, M is rows.</li>
                            <li><strong>Forgetting to multiply by element size:</strong> Using offset alone gives element index, not byte address.</li>
                            <li><strong>Using 1-based indices directly in formula:</strong> Must convert to 0-based first.</li>
                            <li><strong>Assuming row-major for all languages:</strong> Fortran, MATLAB use column-major.</li>
                            <li><strong>Ignoring padding:</strong> May cause off-by-* errors in low-level code.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ To find address quickly, memorize the two formulas and the roles of M and N.</li>
                            <li>✓ Always write down given values: B, M, N, S, i, j, and storage order before calculating.</li>
                            <li>✓ For 1-based indices, subtract 1 from each index first.</li>
                            <li>✓ Use <code>sizeof(type)</code> in C to get S portably.</li>
                            <li>✓ When debugging, compute the address manually and compare with <code>&arr[i][j]</code> in C.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="This topic is the culmination of the previous address calculation topics. Provide plenty of practice problems with varying dimensions, data types, and base addresses. Use grid paper to physically map memory addresses. Show both row-major and column-major for the same element. Emphasize that the formulas are not magic – they come from counting how many full rows/columns are skipped." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Finding Address of A[i][j] FAQs"
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
                                <p className="text-sm mt-1">Make sure the file <code>topic12_practice_questions.js</code> exists.</p>
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

export default Topic12;