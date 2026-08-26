import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import columnMajorFormulaBasic from "./topic10_files/ColumnMajorFormulaBasic.java?raw";
import columnMajorWithOffsets from "./topic10_files/ColumnMajorWithOffsets.java?raw";
import columnMajorEdgeCases from "./topic10_files/ColumnMajorEdgeCases.java?raw";
import columnMajorVisualization from "./topic10_files/ColumnMajorVisualization.java?raw";
import columnMajorPracticeProblems from "./topic10_files/ColumnMajorPracticeProblems.java?raw";

// Import FAQ and practice questions
import questions from './topic10_files/topic10_questions.js';
import practiceQuestions from './topic10_files/topic10_practice_questions.js';

const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic10 = () => {
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
                        Formula for Column-Major Order Address Calculation
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Master the column-major address formula – essential for scientific computing, Fortran, MATLAB, and understanding memory layout in column-priority languages.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* Introduction */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🧮</span> The Column-Major Address Formula
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In <strong>column-major order</strong>, elements of a 2D array are stored column by column in contiguous memory. 
                            This is the default in Fortran, MATLAB, R, and Julia. Understanding this formula is crucial for working with these languages and for optimizing code that interfaces with them.
                        </p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg text-center my-4">
                            <p className="text-2xl font-mono font-bold">Address(A[i][j]) = Base + (j * M + i) * ElementSize</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                <p className="font-semibold">Where:</p>
                                <ul className="text-sm list-disc list-inside">
                                    <li><strong>Base</strong> = starting address of the array</li>
                                    <li><strong>i</strong> = row index (0-based)</li>
                                    <li><strong>j</strong> = column index (0-based)</li>
                                    <li><strong>M</strong> = number of rows</li>
                                    <li><strong>ElementSize</strong> = bytes per element</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                <p className="font-semibold">Key Insight:</p>
                                <p className="text-sm">The term <code>(j * M + i)</code> gives the <strong>linear offset</strong> (number of elements) from the start.</p>
                            </div>
                        </div>
                        <p className="mt-4 leading-relaxed">
                            <strong>Real-world scenario:</strong> Tuhina in Barrackpore is working with MATLAB to process a large scientific dataset. 
                            Understanding column-major storage helps her optimize memory access patterns, making her simulations run faster.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> Why would column-major be natural for certain algorithms? How does it differ from row-major for non-square matrices?
                            </p>
                        </div>
                    </div>

                    {/* Derivation and Visualization */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📐</span> Derivation & Visualization
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In column-major order, all elements of column 0 come first, then column 1, etc. To reach column <strong>j</strong>, you skip <strong>j</strong> full columns, each containing <strong>M</strong> elements.
                            Within the column, you skip <strong>i</strong> elements. So total elements before <code>A[i][j]</code> = <code>j * M + i</code>.
                        </p>
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-center">
                                <caption className="text-sm mb-2">Memory Layout of a 3×4 Matrix (Column-Major)</caption>
                                <thead className="bg-gray-200 dark:bg-gray-700">
                                    <tr><th className="border p-1">Offset</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className="border p-1">Element</td><td className="border p-1">[0,0]</td><td>[1,0]</td><td>[2,0]</td><td>[0,1]</td><td>[1,1]</td><td>[2,1]</td><td>[0,2]</td><td>[1,2]</td><td>[2,2]</td><td>[0,3]</td><td>[1,3]</td><td>[2,3]</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <JavaFileLoader 
                            fileModule={columnMajorVisualization}
                            title="ColumnMajorVisualization.java"
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
                                <p className="text-sm">Array: int arr[4][5] (4 rows, 5 columns). Base = 1000. Element size = 4. Find address of arr[2][3] in column-major.</p>
                                <p className="text-sm mt-1">Step 1: Compute offset = j * M + i = 3 * 4 + 2 = 12 + 2 = 14 elements.</p>
                                <p className="text-sm">Step 2: Multiply by element size: 14 * 4 = 56 bytes.</p>
                                <p className="text-sm">Step 3: Add to base: 1000 + 56 = 1056.</p>
                                <p className="text-sm font-bold text-green-600 dark:text-green-400">Answer: 1056</p>
                                <p className="text-sm italic">Note: In row-major, same element was at 1052. The difference is due to layout.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                                <p className="font-bold">Example 2: Different Data Type</p>
                                <p className="text-sm">Array: double arr[3][6] (3 rows, 6 columns). Base = 2000. Size of double = 8. Find address of arr[1][4] in column-major.</p>
                                <p className="text-sm mt-1">Offset = j * M + i = 4 * 3 + 1 = 12 + 1 = 13 elements.</p>
                                <p className="text-sm">Byte offset = 13 * 8 = 104 bytes.</p>
                                <p className="text-sm">Address = 2000 + 104 = 2104.</p>
                                <p className="text-sm font-bold text-green-600 dark:text-green-400">Answer: 2104</p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                                <p className="font-bold">Example 3: Character Array</p>
                                <p className="text-sm">Array: char grid[10][10] (10 rows, 10 columns). Base = 5000. Size of char = 1. Find address of grid[5][7] in column-major.</p>
                                <p className="text-sm mt-1">Offset = j * M + i = 7 * 10 + 5 = 70 + 5 = 75.</p>
                                <p className="text-sm">Address = 5000 + 75 = 5075.</p>
                                <p className="text-sm font-bold text-green-600 dark:text-green-400">Answer: 5075</p>
                                <p className="text-sm italic">Compare with row-major: 5057. Column-major is 18 bytes later.</p>
                            </div>
                        </div>
                        <JavaFileLoader 
                            fileModule={columnMajorFormulaBasic}
                            title="ColumnMajorFormulaBasic.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Advanced Scenarios and Edge Cases */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Advanced Scenarios & Edge Cases
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>1-based indexing:</strong> Convert to 0-based: Address = Base + ((j-1)*M + (i-1)) * Size.</li>
                            <li><strong>Padding in column-major:</strong> Some compilers may pad between columns; replace M with column stride.</li>
                            <li><strong>Higher dimensions:</strong> For 3D column-major (Fortran order): Address = Base + ((k*N*M) + (j*M) + i) * Size, where k is first index? Actually careful: Fortran stores with first index varying fastest. For array A(i,j,k), formula = Base + ((k-1)*N*M + (j-1)*M + (i-1)) * Size for 1-based.</li>
                            <li><strong>Large arrays:</strong> Use 64-bit integers for offset to avoid overflow.</li>
                            <li><strong>Interfacing with row-major:</strong> When passing data between languages, transpose might be needed.</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={columnMajorEdgeCases}
                            title="ColumnMajorEdgeCases.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Practical Applications */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">💼</span> Practical Applications
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Scientific computing with Fortran or MATLAB where column-major is native.</li>
                            <li>Optimizing matrix operations (e.g., BLAS libraries expect column-major).</li>
                            <li>Image processing where pixel data is stored column-wise.</li>
                            <li>Converting between row-major and column-major representations (transpose).</li>
                            <li>Interfacing Java/C with Fortran subroutines (passing arrays correctly).</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={columnMajorWithOffsets}
                            title="ColumnMajorWithOffsets.java"
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
                            <li>int arr[8][7], base=3000, find address of arr[3][5] in column-major (int size=4).</li>
                            <li>double mat[12][10], base=4000, find address of mat[7][2] in column-major (double size=8).</li>
                            <li>char screen[25][80], base=0xB8000, find address of screen[10][40] in column-major (char size=1).</li>
                            <li>float data[15][9], base=10000, find address of data[14][8] in column-major (float size=4).</li>
                            <li>If address of arr[2][4] is 1080, base=1000, M=5, size=4, find i and j? (solve).</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={columnMajorPracticeProblems}
                            title="ColumnMajorPracticeProblems.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Comparison with Row-Major */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚖️</span> Column-Major vs Row-Major
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                                <thead className="bg-gray-200 dark:bg-gray-700">
                                    <tr><th className="border p-2">Aspect</th><th>Row-Major</th><th>Column-Major</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td className="border p-2">Formula</td><td>Base + (i*N + j)*S</td><td>Base + (j*M + i)*S</td></tr>
                                    <tr><td className="border p-2">Offset for (2,3) in 4x5</td><td>2*5+3=13</td><td>3*4+2=14</td></tr>
                                    <tr><td className="border p-2">Used by</td><td>C, C++, Java, Python</td><td>Fortran, MATLAB, R</td></tr>
                                    <tr><td className="border p-2">Fast traversal</td><td>Row-wise</td><td>Column-wise</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Using row-major formula for column-major arrays:</strong> Leads to wrong addresses.</li>
                            <li><strong>Confusing M and N:</strong> M = number of rows, not columns.</li>
                            <li><strong>Forgetting element size:</strong> Must multiply offset by size.</li>
                            <li><strong>1-based indexing without adjustment:</strong> Convert to 0-based first.</li>
                            <li><strong>Assuming column-major is rare:</strong> It's common in scientific computing.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ When working with Fortran or MATLAB, always use column-major formulas.</li>
                            <li>✓ To convert a row-major index to column-major, compute the linear offset and reinterpret.</li>
                            <li>✓ In C, you can simulate column-major by using a 1D array and index = j*M + i.</li>
                            <li>✓ When passing arrays to BLAS/LAPACK, they expect column-major order.</li>
                            <li>✓ For performance in column-major languages, iterate over columns in outer loops.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="This topic is conceptually similar to row-major but with swapped roles. Emphasize that column-major is not 'wrong' – it's just different. Use physical props: a grid of cards, first take all cards from column 0, then column 1, etc. Show how the formula differs. Have students derive the formula themselves. Compare with row-major and highlight that for square matrices with i=j, both formulas give the same offset." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Column-Major Address Formula FAQs"
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
                                <p className="text-sm mt-1">Make sure the file <code>topic10_practice_questions.js</code> exists.</p>
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

export default Topic10;