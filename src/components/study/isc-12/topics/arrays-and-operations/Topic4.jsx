import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import matrixRepresentation from "./topic4_files/MatrixRepresentation.java?raw";
import matrixVisualization from "./topic4_files/MatrixVisualization.java?raw";
import matrixDimensions from "./topic4_files/MatrixDimensions.java?raw";

// Import FAQ and practice questions
import questions from './topic4_files/topic4_questions.js';
import practiceQuestions from './topic4_files/topic4_practice_questions.js';

// Fallback for missing practice questions
const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic4 = () => {
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
                        Introduction to 2D Arrays (Matrix Representation)
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Understand the structure, visualization, and memory representation of 2D arrays – the foundation for matrix operations in programming.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* What is a 2D Array? */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📊</span> What is a 2D Array?
                        </h2>
                        <p className="leading-relaxed mb-4">
                            A <strong>two-dimensional (2D) array</strong> is an array of arrays. It represents data in a <strong>grid</strong> of <strong>rows</strong> and <strong>columns</strong>, like a spreadsheet, chessboard, or digital image.
                        </p>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world example:</strong> A teacher like Debangshu in Ichapur maintains a grade sheet with students (rows) and subjects (columns). 
                            Each cell contains a mark. That's a 2D array! Similarly, a seating arrangement in a classroom, pixel values in an image, or a distance matrix between cities.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> How would you store a chessboard in a program? Each square has a row number (1-8) and column letter (a-h). That's naturally a 2D array.
                            </p>
                        </div>
                    </div>

                    {/* Matrix Representation */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🔢</span> Matrix Representation
                        </h2>
                        <p className="leading-relaxed mb-4">
                            A 2D array is often called a <strong>matrix</strong>. It has <strong>M rows</strong> and <strong>N columns</strong>, denoted as <strong>M x N</strong> (read "M by N").
                            Each element is accessed using two indices: <code>array[row][col]</code>, where <code>row</code> ranges from <code>0</code> to <code>M-1</code> and <code>col</code> from <code>0</code> to <code>N-1</code>.
                        </p>
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                                <caption className="text-sm font-mono mb-2">A 3×4 Matrix (3 rows, 4 columns)</caption>
                                <tbody>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">Row\Col</th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-2 py-1">0</th><th>1</th><th>2</th><th>3</th>
                                    </tr>
                                    <tr><td className="border px-2 py-1 font-bold">0</td><td className="border px-2 py-1">85</td><td className="border px-2 py-1">90</td><td className="border px-2 py-1">78</td><td className="border px-2 py-1">92</td></tr>
                                    <tr><td className="border px-2 py-1 font-bold">1</td><td className="border px-2 py-1">88</td><td className="border px-2 py-1">76</td><td className="border px-2 py-1">95</td><td className="border px-2 py-1">89</td></tr>
                                    <tr><td className="border px-2 py-1 font-bold">2</td><td className="border px-2 py-1">91</td><td className="border px-2 py-1">84</td><td className="border px-2 py-1">79</td><td className="border px-2 py-1">93</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <JavaFileLoader 
                            fileModule={matrixRepresentation}
                            title="MatrixRepresentation.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="font-semibold">✅ Key Points:</p>
                            <ul className="list-disc list-inside text-sm">
                                <li>Number of rows = <code>matrix.length</code></li>
                                <li>Number of columns = <code>matrix[0].length</code> (for rectangular matrices)</li>
                                <li>Indices are zero-based</li>
                            </ul>
                        </div>
                    </div>

                    {/* Visualizing 2D Arrays */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">👁️</span> Visualizing 2D Arrays
                        </h2>
                        <p className="leading-relaxed mb-4">
                            To help beginners understand, think of a 2D array as a table with rows and columns. 
                            Each cell can be accessed by its coordinates <code>(row, column)</code>.
                        </p>
                        <JavaFileLoader 
                            fileModule={matrixVisualization}
                            title="MatrixVisualization.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <p className="text-sm">
                                <strong>⚠️ Common Confusion:</strong> In mathematics, we often say "row, column" (r,c). In programming, the first index is always the row, second is the column.
                            </p>
                        </div>
                    </div>

                    {/* Dimensions & Size */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📏</span> Dimensions & Total Elements
                        </h2>
                        <p className="leading-relaxed mb-4">
                            For a 2D array with <code>M</code> rows and <code>N</code> columns:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li>Total number of elements = <code>M × N</code></li>
                            <li>Row index range: <code>0</code> to <code>M-1</code></li>
                            <li>Column index range: <code>0</code> to <code>N-1</code></li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={matrixDimensions}
                            title="MatrixDimensions.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Confusing rows and columns:</strong> Remember: first index is row (vertical), second is column (horizontal).</li>
                            <li><strong>Assuming all rows have same length:</strong> In Java, 2D arrays can be jagged; always use <code>matrix[i].length</code> for each row.</li>
                            <li><strong>Off-by-one errors:</strong> Accessing <code>matrix[rows][col]</code> or <code>matrix[row][cols]</code> causes <code>ArrayIndexOutOfBoundsException</code>.</li>
                            <li><strong>Not initializing inner arrays:</strong> Declaring <code>int[][] arr = new int[3][];</code> leaves rows null; you must allocate each row.</li>
                            <li><strong>Using <code>length</code> on null array:</strong> Causes <code>NullPointerException</code>.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ Draw a grid on paper and label indices to visualize.</li>
                            <li>✓ Use <code>Arrays.deepToString(matrix)</code> to print 2D array contents for debugging.</li>
                            <li>✓ For rectangular matrices, store row count and column count in variables for clarity.</li>
                            <li>✓ When passing a 2D array to a method, you don't need to pass dimensions separately; use <code>matrix.length</code> and <code>matrix[0].length</code>.</li>
                            <li>✓ To create a copy of a 2D array, you need to copy each row individually (deep copy).</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="Start with concrete examples: seating chart, multiplication table, Tic-Tac-Toe board. Use grid paper to have students physically map indices. Emphasize that a 2D array is just an array of arrays – this mental model helps later with jagged arrays and understanding memory layout." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="2D Arrays (Matrix Representation) FAQs"
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
                                <p className="text-sm mt-1">Make sure the file <code>topic4_practice_questions.js</code> exists in the <code>topic4_files/</code> folder and exports an array.</p>
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

export default Topic4;