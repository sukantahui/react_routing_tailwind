import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java files
import baseAddressDemo from "./topic11_files/BaseAddressDemo.java?raw";
import elementSizeDemo from "./topic11_files/ElementSizeDemo.java?raw";
import combinedCalculation from "./topic11_files/CombinedCalculation.java?raw";
import pointerArithmetic from "./topic11_files/PointerArithmetic.java?raw";
import dynamicAllocation from "./topic11_files/DynamicAllocation.java?raw";

// Import FAQ and practice questions
import questions from './topic11_files/topic11_questions.js';
import practiceQuestions from './topic11_files/topic11_practice_questions.js';

const safePracticeQuestions = Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : [];

const Topic11 = () => {
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
                        Address Calculation with Base Address and Element Size
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Understand the two critical components of memory address calculation: the base address (where the array starts) and element size (how many bytes each element occupies). Master the formula that combines them.
                    </p>
                </div>

                {/* Theory & Explanation Section */}
                <div className="space-y-8 animate-[slideUpFade_0.6s_ease-out_0.1s]">
                    
                    {/* Introduction */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🏠</span> Base Address: The Starting Point
                        </h2>
                        <p className="leading-relaxed mb-4">
                            The <strong>base address</strong> is the memory address of the first element of the array (<code>arr[0][0]</code> in a 2D array). 
                            It's the reference point from which all other element addresses are calculated. The base address is determined when the array is allocated (e.g., via <code>new</code> in Java or <code>malloc</code> in C).
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
                            <p>// In C:</p>
                            <p>int arr[10];          // arr is the base address (constant pointer)</p>
                            <p>int *ptr = malloc(10 * sizeof(int));  // ptr holds base address</p>
                            <p>// In Java:</p>
                            <p>int[] arr = new int[10];   // arr holds reference (similar to base address)</p>
                        </div>
                        <p className="leading-relaxed mb-4">
                            <strong>Real-world scenario:</strong> Debangshu in Ichapur wants to store exam scores. The memory allocator gives him a base address (e.g., 0x1000). 
                            Every other score's address is computed relative to this base. If the base changes (e.g., due to reallocation), all addresses shift.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                            <p className="text-sm italic">
                                <strong>💡 Think about:</strong> What happens to the base address when you pass an array to a function? In C, it's passed as a pointer (address). In Java, the reference is passed (still points to same object).
                            </p>
                        </div>
                    </div>

                    {/* Element Size */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">📏</span> Element Size: The Scaling Factor
                        </h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Element size</strong> is the number of bytes required to store a single element. It depends on the data type:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                            <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">char: 1 byte</div>
                            <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">short: 2 bytes</div>
                            <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">int: 4 bytes</div>
                            <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">long: 8 bytes</div>
                            <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">float: 4 bytes</div>
                            <div className="bg-white dark:bg-gray-700 p-2 rounded text-center">double: 8 bytes</div>
                        </div>
                        <p className="leading-relaxed mb-4">
                            The element size scales the offset: <code>address = base + (offset_in_elements * element_size)</code>. 
                            This is why you must always multiply by <code>sizeof(type)</code> in C or account for it in formulas.
                        </p>
                        <JavaFileLoader 
                            fileModule={elementSizeDemo}
                            title="ElementSizeDemo.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <p className="font-semibold">✅ Key Insight:</p>
                            <p className="text-sm">Without element size, you would get the index (element number), not the byte address. Byte addresses are needed for actual memory access.</p>
                        </div>
                    </div>

                    {/* Combined Formula */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🧮</span> The Complete Address Formula
                        </h2>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg text-center my-4">
                            <p className="text-xl font-mono font-bold">Address = Base + (i * N + j) * ElementSize &nbsp;&nbsp;(Row-Major)</p>
                            <p className="text-xl font-mono font-bold mt-2">Address = Base + (j * M + i) * ElementSize &nbsp;&nbsp;(Column-Major)</p>
                        </div>
                        <p className="leading-relaxed mb-4">
                            Both formulas follow the same pattern: <strong>Base + (element offset) × ElementSize</strong>. 
                            The element offset depends on the storage order and the indices.
                        </p>
                        <JavaFileLoader 
                            fileModule={combinedCalculation}
                            title="CombinedCalculation.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Base Address from Allocation */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">💾</span> How Base Address is Determined
                        </h2>
                        <p className="leading-relaxed mb-4">
                            The base address is assigned by the memory allocator (e.g., <code>new</code> in Java, <code>malloc</code> in C). 
                            It is not fixed across program runs – it depends on available memory, heap state, and address space layout randomization (ASLR).
                        </p>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li><strong>Static arrays:</strong> Base address determined at compile-time (e.g., global arrays).</li>
                            <li><strong>Stack arrays:</strong> Base address is relative to stack frame (local variables).</li>
                            <li><strong>Heap arrays:</strong> Base address returned by dynamic allocation functions.</li>
                        </ul>
                        <JavaFileLoader 
                            fileModule={baseAddressDemo}
                            title="BaseAddressDemo.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Pointer Arithmetic and Address Calculation */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">➡️</span> Pointer Arithmetic (C/C++ Perspective)
                        </h2>
                        <p className="leading-relaxed mb-4">
                            In C, pointer arithmetic automatically scales by the element size. <code>ptr + i</code> advances by <code>i * sizeof(*ptr)</code> bytes. 
                            This is why the address formula naturally includes element size.
                        </p>
                        <JavaFileLoader 
                            fileModule={pointerArithmetic}
                            title="PointerArithmetic.java"
                            highlightLines={[]}
                        />
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <p className="font-semibold">⚠️ Note:</p>
                            <p className="text-sm">Java does not have explicit pointer arithmetic, but references work similarly – the JVM handles address calculations internally.</p>
                        </div>
                    </div>

                    {/* Dynamic Allocation and Base Address */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🔄</span> Dynamic Allocation and Changing Base Address
                        </h2>
                        <p className="leading-relaxed mb-4">
                            When you dynamically allocate memory (e.g., <code>malloc</code> or <code>new</code>), the base address is returned at runtime. 
                            If you reallocate (<code>realloc</code>), the base address may change. All previously computed addresses become invalid.
                        </p>
                        <JavaFileLoader 
                            fileModule={dynamicAllocation}
                            title="DynamicAllocation.java"
                            highlightLines={[]}
                        />
                    </div>

                    {/* Common Pitfalls */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">⚠️</span> Common Pitfalls
                        </h2>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong>Forgetting to multiply by element size:</strong> Using offset without scaling gives element index, not byte address.</li>
                            <li><strong>Assuming base address is constant across runs:</strong> It changes due to ASLR and heap state.</li>
                            <li><strong>Using incorrect element size (e.g., int as 2 bytes on some platforms):</strong> Use <code>sizeof(type)</code> in C for portability.</li>
                            <li><strong>Not accounting for padding:</strong> Compiler may insert padding, making actual element size larger than expected.</li>
                            <li><strong>Storing base address and assuming it never changes:</strong> Reallocation can move the array.</li>
                        </ul>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                        <ul className="space-y-2">
                            <li>✓ In C, always use <code>sizeof(type)</code> for element size – never hardcode constants.</li>
                            <li>✓ To find the base address of an array in C, simply use the array name: <code>printf("%p", arr);</code></li>
                            <li>✓ In Java, use <code>System.identityHashCode(arr)</code> to get a hash, but actual address is JVM-dependent.</li>
                            <li>✓ When debugging, print addresses to verify your calculations.</li>
                            <li>✓ For large arrays, store the base address in a variable to avoid recomputing.</li>
                        </ul>
                    </div>

                    {/* Teacher's Note */}
                    <Teacher note="This topic ties together previous concepts. Use a physical analogy: base address is like the starting line of a race; element size is like the length of each step. Emphasize that without element size, you cannot convert between element index and byte address. Have students compute addresses for different data types on paper. Show how base address changes when array is allocated on stack vs heap." />

                    {/* FAQ Section */}
                    <FAQTemplate
                        title="Base Address & Element Size FAQs"
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
                                <p className="text-sm mt-1">Make sure the file <code>topic11_practice_questions.js</code> exists.</p>
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

export default Topic11;