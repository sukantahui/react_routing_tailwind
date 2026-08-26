import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import declarationWays from "./topic5_files/DeclarationWays.java?raw";
import initializationMethods from "./topic5_files/InitializationMethods.java?raw";
import jaggedArrayInit from "./topic5_files/JaggedArrayInit.java?raw";
import defaultValues from "./topic5_files/DefaultValues.java?raw";

// Import FAQ and practice questions
import questions from './topic5_files/topic5_questions.js';
import practiceQuestions from './topic5_files/topic5_practice_questions.js';

// Fallback for missing practice questions
const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic5 = () => {
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
                        Declaration and Initialization of 2D Arrays
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Master all ways to declare, create, and initialize 2D arrays in Java – from basic rectangular matrices to jagged arrays and dynamic initialization.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* Why Declaration & Initialization? */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📝</span> Why Declaration & Initialization Matter
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In Java, arrays are objects. <strong>Declaration</strong> tells the compiler about the array's type and name. 
                            <strong>Initialization</strong> allocates memory and optionally assigns initial values. Understanding different ways to declare and initialize 2D arrays gives you flexibility and control.
                        </p>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world example:</strong> Abhronila needs to store marks of 30 students in 3 subjects. She can declare a 2D array, then decide whether to fill it with default values first or directly assign known data. 
                            In Shyamnagar, a school might create a seating chart: first declare the grid, then initialize row by row as students arrive.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> Why is it important to initialize an array before using it? What happens if you forget? How does Java help with default values?
                            </p>
                        </div>
                    </div>

                    {/* Ways to Declare a 2D Array */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🔤</span> Ways to Declare a 2D Array
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Java allows multiple syntaxes for declaring 2D arrays. All are valid, but the first is most common and readable.
                        </p>
                        <div className="font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
                            <p>// Preferred style (type[][] name)</p>
                            <p>int[][] matrix;</p>
                            <p className="mt-2">// Alternative style (type name[][])</p>
                            <p>int matrix[][];</p>
                            <p className="mt-2">// Mixed style (type[] name[])</p>
                            <p>int[] matrix[];</p>
                        </div>
                        <JavaFileLoader 
                            fileModule={declarationWays}
                            title="DeclarationWays.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="font-semibold">✅ Best Practice:</p>
                            <p className="text-sm">Use <code>int[][] matrix</code> – it clearly shows that <code>matrix</code> is a 2D array of ints.</p>
                        </div>
                    </div>

                    {/* Initialization Methods */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚙️</span> Initialization Methods
                        </h2>
                        <p className="leading-relaxed mb-4">
                            There are three main ways to initialize a 2D array in Java:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 mb-4">
                            <li><strong>With new operator</strong> – specify dimensions, default values assigned.</li>
                            <li><strong>With array initializer</strong> – provide values directly in curly braces.</li>
                            <li><strong>Step-by-step (jagged)</strong> – allocate each row separately.</li>
                        </ol>
                        <JavaFileLoader 
                            fileModule={initializationMethods}
                            title="InitializationMethods.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <p className="font-semibold">⚠️ Important:</p>
                            <p className="text-sm">If you use <code>new int[3][4]</code>, all elements are set to default (0 for int, false for boolean, null for objects).</p>
                        </div>
                    </div>

                    {/* Jagged Array Initialization */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🗺️</span> Jagged Array Initialization
                        </h2>
                        <p className="leading-relaxed mb-4">
                            A jagged array is a 2D array where rows have different lengths. You declare the outer array first, then allocate each row individually.
                        </p>
                        <JavaFileLoader 
                            fileModule={jaggedArrayInit}
                            title="JaggedArrayInit.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                            <p className="font-semibold">🎯 Use Case:</p>
                            <p className="text-sm">Storing triangular matrices, irregular data like student grades (different number of subjects per student), or adjacency lists.</p>
                        </div>
                    </div>

                    {/* Default Values */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🎲</span> Default Values
                        </h2>
                        <p className="leading-relaxed mb-4">
                            When you allocate a 2D array using <code>new</code>, Java automatically initializes elements to default values:
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li><code>int</code>, <code>short</code>, <code>byte</code>, <code>long</code>: 0</li>
                            <li><code>double</code>, <code>float</code>: 0.0</li>
                            <li><code>boolean</code>: false</li>
                            <li><code>char</code>: '\u0000' (null character)</li>
                            <li>Reference types (e.g., String): null</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={defaultValues}
                            title="DefaultValues.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Using uninitialized array:</strong> Declaring <code>int[][] arr;</code> but not allocating memory leads to <code>NullPointerException</code>.</li>
                            <li><strong>Forgetting to allocate inner arrays in jagged arrays:</strong> <code>new int[3][]</code> leaves rows null; you must allocate each row.</li>
                            <li><strong>Confusing array declaration syntax:</strong> <code>int[] arr[]</code> works but is confusing; stick to <code>int[][] arr</code>.</li>
                            <li><strong>Assuming all rows have same length after initialization:</strong> If you allocate <code>new int[3][]</code>, rows are not automatically equal.</li>
                            <li><strong>Using <code>arr.length</code> as number of columns:</strong> For a 2D array, <code>arr.length</code> is rows, not columns.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ Use <code>int[][] arr = new int[rows][cols];</code> for rectangular matrices – simple and efficient.</li>
                            <li>✓ For jagged arrays, allocate rows in a loop: <code>for (int i=0; i&lt;rows; i++) arr[i] = new int[someLength];</code></li>
                            <li>✓ Use array initializer when values are known at compile time – it's concise and readable.</li>
                            <li>✓ To fill a 2D array with a non-default value, use nested loops or <code>Arrays.fill()</code> on each row.</li>
                            <li>✓ Remember: declaration does not allocate memory; initialization does.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="Show students the memory diagram: declaration creates a reference (null), initialization creates the outer array and inner arrays. Emphasize that int[][] arr = new int[3][4] creates 4 inner arrays of length 4 each, all at once. For jagged arrays, draw the outer array with arrows to rows of different lengths. Have students practice both rectangular and jagged initialization with small examples." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Declaration & Initialization of 2D Arrays FAQs"
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
                                <p className="text-sm mt-1">Make sure the file <code>topic5_practice_questions.js</code> exists in the <code>topic5_files/</code> folder and exports an array.</p>
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

export default Topic5;