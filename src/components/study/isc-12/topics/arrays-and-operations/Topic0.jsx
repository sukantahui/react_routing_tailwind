import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files as raw strings
import array1DDeclaration from "./topic0_files/Array1DDeclaration.java?raw";
import array2DDeclaration from "./topic0_files/Array2DDeclaration.java?raw";
import arrayCommonMistakes from "./topic0_files/ArrayCommonMistakes.java?raw";

// Import FAQ questions (30 questions)
import questions from './topic0_files/topic0_questions.js';

// Import practice questions (20 questions)
import practiceQuestions from './topic0_files/topic0_questions.js';

const Topic0 = () => {
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
                        1D and 2D Arrays
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Master the fundamentals of arrays: contiguous memory blocks, indexing, and multi-dimensional data organization.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    {/* What are Arrays? */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📦</span> What are Arrays?
                        </h2>
                        <p className="leading-relaxed mb-4">
                            An <strong className="text-blue-600 dark:text-blue-400">array</strong> is a collection of elements of the same data type, stored in <strong className="text-blue-600 dark:text-blue-400">contiguous memory locations</strong>. 
                            Think of it as a row of lockers: each locker has a unique number (index) and can hold one item. Arrays provide O(1) random access, 
                            meaning you can instantly retrieve any element if you know its index.
                        </p>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world example:</strong> A teacher like Swadeep needs to store marks of 30 students in Barrackpore. Instead of creating 30 separate variables, 
                            he uses an array <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">int[] marks = new int[30];</code>. 
                            Tuhina's marks are at <code>marks[0]</code>, Abhronila's at <code>marks[1]</code>, and so on.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Hint:</strong> Think of an array as a row of numbered boxes. The number (index) starts at 0, not 1.
                            </p>
                        </div>
                    </div>

                    {/* 1D Array Declaration & Initialization */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🔢</span> 1D Arrays: Declaration & Initialization
                        </h2>
                        <p className="leading-relaxed mb-4">
                            A <strong>one-dimensional (1D) array</strong> stores elements in a linear sequence. You declare it with the type, square brackets, and a name.
                        </p>
                        <div className="space-y-2 font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                            <p>// Declaration</p>
                            <p>int[] marks;          // preferred style</p>
                            <p>int marks[];          // also valid but less common</p>
                            <p className="mt-2">// Creation (allocates memory)</p>
                            <p>marks = new int[5];   // array of 5 integers</p>
                            <p className="mt-2">// Declaration + Creation together</p>
                            <p>int[] ages = new int[10];</p>
                            <p className="mt-2">// Array initializer (values known at compile time)</p>
                            <p>int[] scores = {85, 90, 78, 92, 88};</p>
                        </div>
                        <JavaFileLoader 
                            fileModule={array1DDeclaration}
                            title="Array1DDeclaration.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-l-4 border-yellow-500">
                            <p className="text-sm">
                                <strong>⚠️ Common Mistake:</strong> Using <code>new int[5]</code> creates indices 0-4. Accessing <code>marks[5]</code> throws <code>ArrayIndexOutOfBoundsException</code>.
                            </p>
                        </div>
                    </div>

                    {/* 2D Arrays (Matrix) */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📊</span> 2D Arrays: Matrix Representation
                        </h2>
                        <p className="leading-relaxed mb-4">
                            A <strong>two-dimensional (2D) array</strong> is an array of arrays. It represents data in rows and columns, like a spreadsheet or a chessboard.
                        </p>
                        <div className="space-y-2 font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                            <p>// Declaration: 3 rows, 4 columns</p>
                            <p>int[][] matrix = new int[3][4];</p>
                            <p className="mt-2">// Array initializer</p>
                            <p>int[][] scores = {`{`}</p>
                            <p>    {85, 90, 78, 92},</p>
                            <p>    {88, 76, 95, 89},</p>
                            <p>    {91, 84, 79, 93}</p>
                            <p>{`}`};</p>
                            <p className="mt-2">// Access element at row 1, column 2 (value = 95)</p>
                            <p>int value = scores[1][2];</p>
                        </div>
                        <JavaFileLoader 
                            fileModule={array2DDeclaration}
                            title="Array2DDeclaration.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                <p className="font-semibold">✅ Row-Major Traversal</p>
                                <p className="text-sm">Outer loop rows, inner loop columns.</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                <p className="font-semibold">✅ Column-Major Traversal</p>
                                <p className="text-sm">Outer loop columns, inner loop rows.</p>
                            </div>
                        </div>
                    </div>

                    {/* Common Mistakes */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls & Best Practices
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Off-by-one errors:</strong> Remember indices go from 0 to length-1.</li>
                            <li><strong>Uninitialized arrays:</strong> Declaring an array doesn't allocate memory. Use <code>new</code> or initializer.</li>
                            <li><strong>Confusing length vs length():</strong> <code>array.length</code> (property) vs <code>String.length()</code> (method).</li>
                            <li><strong>NullPointerException:</strong> Using an array variable that points to <code>null</code>.</li>
                            <li><strong>Assuming 2D arrays are rectangular:</strong> In Java, they can be jagged.</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={arrayCommonMistakes}
                            title="ArrayCommonMistakes.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                            <p className="font-semibold">🎯 Best Practice:</p>
                            <p className="text-sm">Always validate index bounds before access, especially in loops. Use <code>array.length</code> in loop conditions.</p>
                        </div>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="Arrays are the foundation of data structures. Encourage students to visualize memory layout. Use grid paper to map indices to values. Emphasize zero-based indexing early to avoid off-by-one bugs." />

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ Use <code>Arrays.toString()</code> for quick 1D array printing.</li>
                            <li>✓ Use <code>Arrays.deepToString()</code> for 2D arrays.</li>
                            <li>✓ Prefer <code>int[] arr</code> style for readability.</li>
                            <li>✓ Use <code>final int SIZE = 10;</code> instead of magic numbers.</li>
                            <li>✓ For dynamic sizing, consider <code>ArrayList</code>.</li>
                        </ul>
                    </div>

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="1D & 2D Arrays FAQs"
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

export default Topic0;