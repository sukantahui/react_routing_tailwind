import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import inputFromUser from "./topic6_files/InputFromUser.java?raw";
import outputFormats from "./topic6_files/OutputFormats.java?raw";
import inputUsingScanner from "./topic6_files/InputUsingScanner.java?raw";
import inputUsingBufferedReader from "./topic6_files/InputUsingBufferedReader.java?raw";
import prettyPrintMatrix from "./topic6_files/PrettyPrintMatrix.java?raw";

// Import FAQ and practice questions
import questions from './topic6_files/topic6_questions.js';
import practiceQuestions from './topic6_files/topic6_practice_questions.js';

// Fallback for missing practice questions
const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic6 = () => {
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
                        Input and Output of Matrix Elements
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Learn how to read matrix data from users, files, or hardcoded values, and display matrices in clean, readable formats.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* Why Input/Output Matters */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📥📤</span> Why Input/Output Matters
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In real-world applications, matrix data rarely comes hardcoded. It's entered by users, read from files (CSV, Excel), or received from sensors. 
                            Knowing how to efficiently input and output matrix elements is essential for building interactive programs.
                        </p>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world example:</strong> Swadeep, a teacher in Barrackpore, wants to enter marks of 30 students in 5 subjects. He needs to input a 30×5 matrix. 
                            Similarly, when displaying results, he needs a clean, readable format – not just raw numbers.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> How would you design a program that asks the user for matrix dimensions first, then reads each element row by row? What about handling invalid input?
                            </p>
                        </div>
                    </div>

                    {/* Input Methods */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⌨️</span> Input Methods for 2D Arrays
                        </h2>
                        <p className="leading-relaxed mb-4">
                            The most common way to input matrix elements in Java is using <code>Scanner</code>. You can read row by row, asking the user for each element.
                            Alternative methods include <code>BufferedReader</code> (faster for large input) and reading from files.
                        </p>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Using Scanner (Standard Input)</h3>
                        <JavaFileLoader 
                            fileModule={inputUsingScanner}
                            title="InputUsingScanner.java"
                            highlightLines={[]}
                        />
                        <h3 className="text-xl font-semibold mt-6 mb-2">Using BufferedReader (Faster for Large Matrices)</h3>
                        <JavaFileLoader 
                            fileModule={inputUsingBufferedReader}
                            title="InputUsingBufferedReader.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="font-semibold">✅ Best Practice:</p>
                            <p className="text-sm">For competitive programming, use BufferedReader for speed. For teaching, Scanner is simpler and more readable.</p>
                        </div>
                    </div>

                    {/* Complete Input Program */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🖥️</span> Complete Input Program
                        </h2>
                        <p className="leading-relaxed mb-4">
                            A complete example that asks for dimensions, then reads values row by row.
                        </p>
                        <JavaFileLoader 
                            fileModule={inputFromUser}
                            title="InputFromUser.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Output Formats */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🖨️</span> Output Formats for Matrices
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Simply printing a 2D array with <code>System.out.println(arr)</code> gives a cryptic output. 
                            You need to format it properly: iterate over rows and columns, using spaces or tabs for alignment.
                        </p>
                        <JavaFileLoader 
                            fileModule={outputFormats}
                            title="OutputFormats.java"
                            highlightLines={[]}
                        />
                        <h3 className="text-xl font-semibold mt-6 mb-2">Pretty Printing (Aligned Columns)</h3>
                        <JavaFileLoader 
                            fileModule={prettyPrintMatrix}
                            title="PrettyPrintMatrix.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <p className="font-semibold">⚠️ Note:</p>
                            <p className="text-sm">For debugging, <code>Arrays.deepToString(matrix)</code> is quick and convenient, but for end users, format row by row with spaces or tabs.</p>
                        </div>
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Not consuming newline after reading dimensions:</strong> Using <code>nextInt()</code> leaves newline; use <code>nextLine()</code> to consume it.</li>
                            <li><strong>Assuming input is perfectly formatted:</strong> Always handle <code>InputMismatchException</code> for bad data.</li>
                            <li><strong>Printing using <code>System.out.println(arr)</code> expecting readable output:</strong> It prints object reference, not matrix content.</li>
                            <li><strong>Forgetting to close Scanner:</strong> Use <code>scanner.close()</code> or try-with-resources.</li>
                            <li><strong>Not validating row/column counts:</strong> If user enters negative dimensions, array creation fails.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ Use <code>String.format("%4d", value)</code> to align numbers in columns.</li>
                            <li>✓ For large matrices, use <code>BufferedReader</code> and <code>StringTokenizer</code> for faster parsing.</li>
                            <li>✓ To read a matrix from a file, use <code>Scanner</code> with <code>new File("data.txt")</code>.</li>
                            <li>✓ In competitive programming, read entire input as tokens using <code>StringTokenizer</code> for speed.</li>
                            <li>✓ Use <code>System.out.print()</code> for same-line output and <code>System.out.println()</code> after each row.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="Demonstrate input/output step by step: first, write a program that hardcodes a small matrix and prints it. Then modify to ask for dimensions and read values. Show common pitfalls like Scanner newline issue. Emphasize that output formatting matters for readability – a well-formatted matrix is easier to debug." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Matrix Input/Output FAQs"
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
                                <p className="text-sm mt-1">Make sure the file <code>topic6_practice_questions.js</code> exists in the <code>topic6_files/</code> folder and exports an array.</p>
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

export default Topic6;