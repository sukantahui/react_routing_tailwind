import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import rowMajorFormulaBasic from "./topic9_files/RowMajorFormulaBasic.java?raw";
import rowMajorWithOffsets from "./topic9_files/RowMajorWithOffsets.java?raw";
import rowMajorEdgeCases from "./topic9_files/RowMajorEdgeCases.java?raw";
import rowMajorVisualization from "./topic9_files/RowMajorVisualization.java?raw";
import rowMajorPracticeProblems from "./topic9_files/RowMajorPracticeProblems.java?raw";

// Import FAQ and practice questions
import questions from './topic9_files/topic9_questions.js';
import practiceQuestions from './topic9_files/topic9_practice_questions.js';

const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic9 = () => {
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
                        Formula for Row-Major Order Address Calculation
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Master the row-major address formula – the foundation of array indexing in C, C++, and many other languages. Learn to compute any element's memory address with precision.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* Introduction */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🧮</span> The Row-Major Address Formula
                        </h2>
                        <p className="leading-relaxed mb-4">
                            The row-major address formula is used to calculate the memory address of an element in a 2D array stored in <strong>row-major order</strong>. 
                            This is the default for C, C++, Java (logically), and many other languages.
                        </p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg text-center my-4">
                            <p className="text-2xl font-mono font-bold">Address(A[i][j]) = Base + (i * N + j) * ElementSize</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                <p className="font-semibold">Where:</p>
                                <ul className="text-sm list-disc list-inside">
                                    <li><strong>Base</strong> = starting address of the array</li>
                                    <li><strong>i</strong> = row index (0-based)</li>
                                    <li><strong>j</strong> = column index (0-based)</li>
                                    <li><strong>N</strong> = number of columns</li>
                                    <li><strong>ElementSize</strong> = bytes per element (e.g., 4 for int)</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                <p className="font-semibold">Key Insight:</p>
                                <p className="text-sm">The term <code>(i * N + j)</code> gives the <strong>linear offset</strong> (number of elements) from the start.</p>
                            </div>
                        </div>
                        <p className="mt-4 leading-relaxed">
                            <strong>Real-world scenario:</strong> Abhronila in Shyamnagar is writing a C program to process a matrix of sensor data. 
                            By using this formula, she can directly compute memory addresses and optimize pointer arithmetic for faster access.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> Why is the formula i*N + j? How does this relate to the way C stores arrays? What happens if you use 1-based indexing?
                            </p>
                        </div>
                    </div>

                    {/* Derivation and Visualization */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📐</span> Derivation & Visualization
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In row-major order, all elements of row 0 come first, then row 1, etc. To reach row <strong>i</strong>, you skip <strong>i</strong> full rows, each containing <strong>N</strong> elements.
                            Within the row, you skip <strong>j</strong> elements. So total elements before <code>A[i][j]</code> = <code>i * N + j</code>.
                        </p>
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-center">
                                <caption className="text-sm mb-2">Memory Layout of a 3×4 Matrix (Row-Major)</caption>
                                <thead className="bg-gray-200 dark:bg-gray-700">
                                    <tr><th className="border p-1">Offset</th><th className="border p-1">0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className="border p-1">Element</td><td className="border p-1">[0,0]</td><td>[0,1]</td><td>[0,2]</td><td>[0,3]</td><td>[1,0]</td><td>[1,1]</td><td>[1,2]</td><td>[1,3]</td><td>[2,0]</td><td>[2,1]</td><td>[2,2]</td><td>[2,3]</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <JavaFileLoader 
                            fileModule={rowMajorVisualization}
                            title="RowMajorVisualization.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Step-by-Step Examples */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🔢</span> Step-by-Step Examples
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                                <p className="font-bold">Example 1: Basic Calculation</p>
                                <p className="text-sm">Array: int arr[4][5] (4 rows, 5 columns). Base address = 1000. Element size = 4 bytes. Find address of arr[2][3].</p>
                                <p className="text-sm mt-1">Step 1: Compute offset = i * N + j = 2 * 5 + 3 = 10 + 3 = 13 elements.</p>
                                <p className="text-sm">Step 2: Multiply by element size: 13 * 4 = 52 bytes.</p>
                                <p className="text-sm">Step 3: Add to base: 1000 + 52 = 1052.</p>
                                <p className="text-sm font-bold text-green-600 dark:text-green-400">Answer: 1052</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                                <p className="font-bold">Example 2: Different Data Type</p>
                                <p className="text-sm">Array: double arr[3][6] (3 rows, 6 columns). Base = 2000. Size of double = 8 bytes. Find address of arr[1][4].</p>
                                <p className="text-sm mt-1">Offset = 1 * 6 + 4 = 6 + 4 = 10 elements.</p>
                                <p className="text-sm">Byte offset = 10 * 8 = 80 bytes.</p>
                                <p className="text-sm">Address = 2000 + 80 = 2080.</p>
                                <p className="text-sm font-bold text-green-600 dark:text-green-400">Answer: 2080</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                                <p className="font-bold">Example 3: Character Array</p>
                                <p className="text-sm">Array: char grid[10][10] (10 rows, 10 columns). Base = 5000. Size of char = 1 byte. Find address of grid[5][7].</p>
                                <p className="text-sm mt-1">Offset = 5 * 10 + 7 = 50 + 7 = 57.</p>
                                <p className="text-sm">Address = 5000 + 57 = 5057.</p>
                                <p className="text-sm font-bold text-green-600 dark:text-green-400">Answer: 5057</p>
                            </div>
                        </div>
                        <JavaFileLoader 
                            fileModule={rowMajorFormulaBasic}
                            title="RowMajorFormulaBasic.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Advanced Scenarios and Edge Cases */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Advanced Scenarios & Edge Cases
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>1-based indexing:</strong> Some problems use 1-based indices. The formula becomes: Base + ((i-1)*N + (j-1)) * Size.</li>
                            <li><strong>Non-zero base address:</strong> Base can be any memory address (e.g., from malloc).</li>
                            <li><strong>Padding:</strong> Compilers may add padding between rows for alignment. Then formula becomes Base + (i * stride + j) * Size, where stride ≥ N.</li>
                            <li><strong>Large arrays:</strong> Offset may exceed 32-bit int range; use long in calculations.</li>
                            <li><strong>Multidimensional >2D:</strong> For 3D row-major: Base + ((i*N*K) + (j*K) + k) * Size.</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={rowMajorEdgeCases}
                            title="RowMajorEdgeCases.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Practical Applications */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">💼</span> Practical Applications
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Implementing <code>memcpy</code> or <code>memcmp</code> on 2D arrays using pointer arithmetic.</li>
                            <li>Interfacing with hardware that expects a linear buffer (e.g., GPU memory, framebuffers).</li>
                            <li>Optimizing matrix multiplication by precomputing row pointers.</li>
                            <li>Converting between 2D and 1D representations (flattening).</li>
                            <li>Writing low-level system code where array indexing is not available (e.g., in assembly).</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={rowMajorWithOffsets}
                            title="RowMajorWithOffsets.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Practice Problems with Solutions */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📝</span> Practice Problems
                        </h2>
                        <p className="mb-4">Try these on your own, then check the code for solutions.</p>
                        <ul className="list-decimal list-inside space-y-2">
                            <li>int arr[8][7], base=3000, find address of arr[3][5] (int size=4).</li>
                            <li>double mat[12][10], base=4000, find address of mat[7][2] (double size=8).</li>
                            <li>char screen[25][80], base=0xB8000, find address of screen[10][40] (char size=1).</li>
                            <li>float data[15][9], base=10000, find address of data[14][8] (float size=4).</li>
                            <li>If address of arr[2][4] is 1056, base=1000, N=5, size=4, find i and j? (trick: solve for i and j).</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={rowMajorPracticeProblems}
                            title="RowMajorPracticeProblems.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Using 1-based indices without adjusting formula:</strong> Always convert to 0-based first.</li>
                            <li><strong>Forgetting element size:</strong> Multiplying offset by 1 (implicitly) when element size is not 1.</li>
                            <li><strong>Integer overflow in offset calculation:</strong> For very large arrays, use <code>long</code> for offset.</li>
                            <li><strong>Assuming N is number of rows:</strong> N is columns, M is rows.</li>
                            <li><strong>Confusing row-major with column-major:</strong> Different formula yields wrong address.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ To find the base address given an element's address, work backwards: Base = Address - (i*N + j)*Size.</li>
                            <li>✓ To find number of columns given base and an address, solve for N.</li>
                            <li>✓ In C, use <code>&arr[i][j]</code> to get address – compiler does the calculation.</li>
                            <li>✓ For performance-critical code, compute row pointers once: <code>int *row = arr[i];</code> then <code>row[j]</code>.</li>
                            <li>✓ When flattening a 2D array to 1D, the index is i*N + j.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="This is a formula-heavy topic. Start by drawing a grid of addresses on the board. Use small matrices (3x4) and compute addresses manually. Emphasize the difference between offset (number of elements) and byte offset. Give many practice problems with varying data types. Connect to pointer arithmetic in C – students who understand this will master arrays in C." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Row-Major Address Formula FAQs"
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
                                <p className="text-sm mt-1">Make sure the file <code>topic9_practice_questions.js</code> exists.</p>
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

export default Topic9;