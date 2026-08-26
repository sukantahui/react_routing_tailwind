import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import rowMajorCalculation from "./topic8_files/RowMajorCalculation.java?raw";
import columnMajorCalculation from "./topic8_files/ColumnMajorCalculation.java?raw";
import addressFormulaDemo from "./topic8_files/AddressFormulaDemo.java?raw";
import elementSizeExample from "./topic8_files/ElementSizeExample.java?raw";
import compareStorage from "./topic8_files/CompareStorage.java?raw";

// Import FAQ and practice questions
import questions from './topic8_files/topic8_questions.js';
import practiceQuestions from './topic8_files/topic8_practice_questions.js';

const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic8 = () => {
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
                        Row Major & Column Major Address Calculation
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Understand how 2D arrays are stored in memory and calculate the address of any element using formulas – essential for system programming and performance optimization.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* Introduction */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🧠</span> Why Address Calculation Matters
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In low-level languages like C and C++, arrays are stored in contiguous memory. Understanding <strong>row-major</strong> and <strong>column-major</strong> storage is essential for:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li>Optimizing cache performance</li>
                            <li>Interfacing with hardware or system libraries</li>
                            <li>Understanding how compilers map multidimensional arrays</li>
                            <li>Working with legacy code or embedded systems</li>
                        </ul>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world scenario:</strong> Debangshu, a student in Ichapur, writes a C program to process a large image (2D array of pixels). 
                            By understanding row-major storage, he can access pixels in the correct order to maximize cache hits, making his program 10x faster.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> Why would a matrix stored in row-major order have different address calculations than column-major? How does the programming language choice affect this?
                            </p>
                        </div>
                    </div>

                    {/* Row-Major Storage */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📊</span> Row-Major Order (C/C++, Java? - Actually Java uses array of arrays, but for calculation we assume contiguous)
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In <strong>row-major order</strong>, elements of a 2D array are stored row by row in memory. All elements of the first row come first, then the second row, and so on.
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
                            <p>// For a 3x4 matrix:</p>
                            <p>Memory layout: [0,0] [0,1] [0,2] [0,3] [1,0] [1,1] [1,2] [1,3] [2,0] [2,1] [2,2] [2,3]</p>
                        </div>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Formula for Address Calculation (Row-Major)</h3>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg font-mono text-center mb-4">
                            <p className="font-bold">Address(A[i][j]) = Base + (i * N + j) * Size</p>
                            <p className="text-sm mt-2">where:</p>
                            <p className="text-sm">Base = starting address of array</p>
                            <p className="text-sm">i = row index (0-based)</p>
                            <p className="text-sm">j = column index (0-based)</p>
                            <p className="text-sm">N = number of columns</p>
                            <p className="text-sm">Size = size of each element (e.g., 4 bytes for int)</p>
                        </div>
                        <JavaFileLoader 
                            fileModule={rowMajorCalculation}
                            title="RowMajorCalculation.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="font-semibold">✅ Languages using row-major:</p>
                            <p className="text-sm">C, C++, Java (though Java's 2D arrays are arrays of arrays, the logical indexing follows row-major), C#, Python (NumPy default), Pascal, Go</p>
                        </div>
                    </div>

                    {/* Column-Major Storage */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📈</span> Column-Major Order (Fortran, MATLAB)
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In <strong>column-major order</strong>, elements are stored column by column. All elements of the first column come first, then the second column, etc.
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
                            <p>// For a 3x4 matrix:</p>
                            <p>Memory layout: [0,0] [1,0] [2,0] [0,1] [1,1] [2,1] [0,2] [1,2] [2,2] [0,3] [1,3] [2,3]</p>
                        </div>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Formula for Address Calculation (Column-Major)</h3>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg font-mono text-center mb-4">
                            <p className="font-bold">Address(A[i][j]) = Base + (j * M + i) * Size</p>
                            <p className="text-sm mt-2">where:</p>
                            <p className="text-sm">Base = starting address</p>
                            <p className="text-sm">i = row index (0-based)</p>
                            <p className="text-sm">j = column index (0-based)</p>
                            <p className="text-sm">M = number of rows</p>
                            <p className="text-sm">Size = element size</p>
                        </div>
                        <JavaFileLoader 
                            fileModule={columnMajorCalculation}
                            title="ColumnMajorCalculation.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <p className="font-semibold">✅ Languages using column-major:</p>
                            <p className="text-sm">Fortran, MATLAB, R, Julia (by default), SAS</p>
                        </div>
                    </div>

                    {/* Detailed Examples and Scenarios */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📝</span> Detailed Examples & Scenarios
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Let's work through concrete examples to solidify understanding.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-bold text-lg">Example 1: Row-Major Address Calculation</h3>
                                <p className="text-sm mt-2">Given: int arr[4][5] (4 rows, 5 columns), Base address = 1000, int size = 4 bytes. Find address of arr[2][3].</p>
                                <p className="text-sm mt-1">Solution: Address = Base + (i * N + j) * Size = 1000 + (2*5 + 3)*4 = 1000 + (10+3)*4 = 1000 + 52 = 1052.</p>
                                <p className="text-sm mt-1 text-green-600 dark:text-green-400">✅ Answer: 1052</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-bold text-lg">Example 2: Column-Major Address Calculation</h3>
                                <p className="text-sm mt-2">Given: double arr[3][6] (3 rows, 6 columns), Base = 2000, double size = 8 bytes. Find address of arr[1][4].</p>
                                <p className="text-sm mt-1">Solution: Address = Base + (j * M + i) * Size = 2000 + (4*3 + 1)*8 = 2000 + (12+1)*8 = 2000 + 104 = 2104.</p>
                                <p className="text-sm mt-1 text-green-600 dark:text-green-400">✅ Answer: 2104</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="font-bold text-lg">Scenario: Image Processing</h3>
                                <p className="text-sm mt-2">Swadeep processes a 1024x768 grayscale image (1 byte per pixel) stored in row-major order. He wants to access pixel at (500, 300).</p>
                                <p className="text-sm mt-1">Address = Base + (500 * 768 + 300) * 1 = Base + 384300. This is efficient because row-major matches the image scanline order.</p>
                            </div>
                        </div>
                        
                        <JavaFileLoader 
                            fileModule={addressFormulaDemo}
                            title="AddressFormulaDemo.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Element Size Considerations */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📏</span> Element Size Matters
                        </h2>
                        <p className="leading-relaxed mb-4">
                            The size of each element (in bytes) is crucial. Common sizes:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li>char: 1 byte</li>
                            <li>int: 4 bytes (typically)</li>
                            <li>float: 4 bytes</li>
                            <li>double: 8 bytes</li>
                            <li>pointer: 8 bytes on 64-bit systems</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={elementSizeExample}
                            title="ElementSizeExample.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚖️</span> Row-Major vs Column-Major Comparison
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                                <thead className="bg-gray-200 dark:bg-gray-700">
                                    <tr>
                                        <th className="border p-2">Aspect</th>
                                        <th className="border p-2">Row-Major</th>
                                        <th className="border p-2">Column-Major</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="border p-2">Formula</td><td className="border p-2">Base + (i*N + j)*Size</td><td className="border p-2">Base + (j*M + i)*Size</td></tr>
                                    <tr><td className="border p-2">Used by</td><td className="border p-2">C, C++, Java, Python</td><td className="border p-2">Fortran, MATLAB, R</td></tr>
                                    <tr><td className="border p-2">Cache efficient for</td><td className="border p-2">Row-wise traversal</td><td className="border p-2">Column-wise traversal</td></tr>
                                    <tr><td className="border p-2">Memory layout</td><td className="border p-2">Row0, Row1, ...</td><td className="border p-2">Col0, Col1, ...</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <JavaFileLoader 
                            fileModule={compareStorage}
                            title="CompareStorage.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Using 1-based indexing in formulas:</strong> Always use 0-based indices unless specified.</li>
                            <li><strong>Forgetting element size:</strong> Address is in bytes, so multiply by size.</li>
                            <li><strong>Confusing row-major with column-major:</strong> Different formulas give different addresses.</li>
                            <li><strong>Assuming Java's 2D arrays are contiguous:</strong> In Java, rows are separate objects, but address calculation concepts still apply logically.</li>
                            <li><strong>Not accounting for padding:</strong> Some compilers add padding between rows for alignment (rare for basic types).</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ To convert between row-major and column-major indices: new_index = j*M + i (for column-major) vs i*N + j (row-major).</li>
                            <li>✓ When writing performance-critical code, traverse arrays in the order they are stored (row-major for C, column-major for Fortran).</li>
                            <li>✓ Use <code>sizeof(type)</code> in C to get element size portably.</li>
                            <li>✓ For multidimensional arrays in C, &arr[i][j] gives the address directly.</li>
                            <li>✓ In interviews, be prepared to derive address formulas from first principles.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="This topic is theoretical but crucial for understanding memory. Use a grid on the board and physically map memory addresses. Show how a 3x4 matrix is laid out in both orders. Give students multiple practice problems with different base addresses, sizes, and indices. Emphasize that even though Java doesn't have contiguous 2D arrays, the concept is important for other languages and for understanding row-major vs column-major traversal performance." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Row-Major & Column-Major Address Calculation FAQs"
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
                                <p className="text-sm mt-1">Make sure the file <code>topic8_practice_questions.js</code> exists.</p>
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

export default Topic8;