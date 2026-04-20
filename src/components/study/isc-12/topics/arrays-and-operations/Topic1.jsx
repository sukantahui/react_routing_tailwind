import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files as raw strings
import traverse1DForLoop from "./topic1_files/Traverse1DForLoop.java?raw";
import traverse1DForEach from "./topic1_files/Traverse1DForEach.java?raw";
import traverse2DRowMajor from "./topic1_files/Traverse2DRowMajor.java?raw";
import traverse2DColumnMajor from "./topic1_files/Traverse2DColumnMajor.java?raw";
import traverseJaggedArray from "./topic1_files/TraverseJaggedArray.java?raw";

// Import FAQ and practice questions
import questions from './topic1_files/topic1_questions.js';
import practiceQuestions from './topic1_files/topic1_questions.js';

const Topic1 = () => {
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
                        Traversing Arrays
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Learn how to visit every element of an array systematically using loops, with applications in searching, processing, and transforming data.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* What is Traversal? */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🚶</span> What is Array Traversal?
                        </h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Traversal</strong> means visiting each element of an array exactly once, typically from the first to the last index. 
                            It is the foundation for many operations: searching, sorting, summing, finding min/max, and transforming data.
                        </p>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world analogy:</strong> Imagine Abhronila checking attendance of 30 students in Shyamnagar. She goes row by row, calling each name. 
                            That's a traversal. If she only checks students with names starting with 'A', that's a filtered traversal (search).
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> Why do we need to traverse? What happens if we skip elements? How does traversal differ from random access?
                            </p>
                        </div>
                    </div>

                    {/* Traversing 1D Arrays */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">1️⃣</span> Traversing 1D Arrays
                        </h2>
                        <p className="leading-relaxed mb-4">
                            The most common way to traverse a 1D array is using a <strong>for loop</strong> with an index variable from <code>0</code> to <code>length-1</code>.
                            Java also provides an <strong>enhanced for loop (for-each)</strong> when you don't need the index.
                        </p>
                        
                        <h3 className="text-xl font-semibold mt-4 mb-2">Traditional for loop</h3>
                        <JavaFileLoader 
                            fileModule={traverse1DForLoop}
                            title="Traverse1DForLoop.java"
                            highlightLines={[]}
                        />
                        
                        <h3 className="text-xl font-semibold mt-6 mb-2">Enhanced for loop (for-each)</h3>
                        <JavaFileLoader 
                            fileModule={traverse1DForEach}
                            title="Traverse1DForEach.java"
                            highlightLines={[]}
                        />
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                <p className="font-semibold">✅ When to use index loop</p>
                                <p className="text-sm">Need to modify elements, access adjacent elements, or know position.</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                <p className="font-semibold">✅ When to use for-each</p>
                                <p className="text-sm">Read-only operations, summing, printing, searching without index.</p>
                            </div>
                        </div>
                    </div>

                    {/* Traversing 2D Arrays (Row-wise vs Column-wise) */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">2️⃣</span> Traversing 2D Arrays (Matrix)
                        </h2>
                        <p className="leading-relaxed mb-4">
                            A 2D array is traversed using <strong>nested loops</strong>. The outer loop iterates over rows, and the inner loop over columns. 
                            This is called <strong>row-major order</strong>. You can also traverse column-major by swapping loop order.
                        </p>
                        
                        <h3 className="text-xl font-semibold mt-4 mb-2">Row-Major Traversal (most common)</h3>
                        <JavaFileLoader 
                            fileModule={traverse2DRowMajor}
                            title="Traverse2DRowMajor.java"
                            highlightLines={[]}
                        />
                        
                        <h3 className="text-xl font-semibold mt-6 mb-2">Column-Major Traversal</h3>
                        <JavaFileLoader 
                            fileModule={traverse2DColumnMajor}
                            title="Traverse2DColumnMajor.java"
                            highlightLines={[]}
                        />
                        
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-l-4 border-yellow-500">
                            <p className="text-sm">
                                <strong>⚠️ Performance Note:</strong> In Java, row-major traversal is faster due to memory layout (each row is a contiguous block). 
                                Column-major causes many cache misses. For large matrices, the difference is significant.
                            </p>
                        </div>
                    </div>

                    {/* Traversing Jagged Arrays */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🗺️</span> Traversing Jagged Arrays
                        </h2>
                        <p className="leading-relaxed mb-4">
                            A <strong>jagged array</strong> (array of arrays with different row lengths) requires careful traversal: 
                            each row's length must be obtained individually using <code>array[row].length</code> inside the loop.
                        </p>
                        <JavaFileLoader 
                            fileModule={traverseJaggedArray}
                            title="TraverseJaggedArray.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                            <p className="font-semibold">🎯 Best Practice:</p>
                            <p className="text-sm">Always use <code>array.length</code> for rows and <code>array[i].length</code> for columns, even if you "know" the size. This makes code robust for jagged arrays.</p>
                        </div>
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls in Traversal
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Off-by-one errors:</strong> Using <code>&lt;= length</code> instead of <code>&lt; length</code> causes <code>ArrayIndexOutOfBoundsException</code>.</li>
                            <li><strong>Modifying array during for-each:</strong> The enhanced for loop gives a copy of the value (for primitives) or reference (for objects). Modifying the loop variable doesn't change the array element.</li>
                            <li><strong>Forgetting row length varies in jagged arrays:</strong> Using a fixed column count leads to exceptions.</li>
                            <li><strong>Inefficient column-major traversal in large matrices:</strong> Can be 10x slower due to cache misses.</li>
                            <li><strong>Using wrong loop bounds for 2D arrays:</strong> Swapping rows and columns incorrectly.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ Use <code>for (int i = 0; i &lt; arr.length; i++)</code> as a standard pattern.</li>
                            <li>✓ Prefer enhanced for loop when you don't need the index — it's cleaner and less error-prone.</li>
                            <li>✓ For 2D arrays, use <code>rows = matrix.length</code> and <code>cols = matrix[0].length</code> only if rectangular; otherwise compute per row.</li>
                            <li>✓ Use <code>Arrays.deepToString(matrix)</code> for quick debugging of 2D arrays.</li>
                            <li>✓ To convert row-major to column-major traversal, swap the order of nested loops.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="Traversal is the first step to understanding any data structure. Have students trace loops on paper with small arrays. Use visual aids: draw boxes and arrows. Emphasize the difference between index-based loops (control) and for-each (read-only). In 2D, relate to tables in real life (spreadsheets)." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Array Traversal FAQs"
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

export default Topic1;