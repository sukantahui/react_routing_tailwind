import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import forLoopExample1 from "./topic13_files/for_loop_example1.sh?raw";
import forLoopExample2 from "./topic13_files/for_loop_example2.sh?raw";
import whileLoopExample1 from "./topic13_files/while_loop_example1.sh?raw";
import whileLoopExample2 from "./topic13_files/while_loop_example2.sh?raw";
import untilLoopExample1 from "./topic13_files/until_loop_example1.sh?raw";
import untilLoopExample2 from "./topic13_files/until_loop_example2.sh?raw";
import loopPatternsExample1 from "./topic13_files/loop_patterns_example1.sh?raw";
import loopPatternsExample2 from "./topic13_files/loop_patterns_example2.sh?raw";

const Topic13 = () => {
    const [activeLoop, setActiveLoop] = useState("for");
    const [iteration, setIteration] = useState(1);

    const loopTypes = [
        { 
            type: "for", 
            name: "For Loop", 
            description: "Iterates over a list of items",
            useCase: "When you know exactly what items to process",
            color: "from-blue-500 to-cyan-600",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            )
        },
        { 
            type: "while", 
            name: "While Loop", 
            description: "Repeats while condition is true",
            useCase: "When you need to loop until a condition changes",
            color: "from-green-500 to-emerald-600",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        { 
            type: "until", 
            name: "Until Loop", 
            description: "Repeats until condition becomes true",
            useCase: "When you need to wait for a condition to be met",
            color: "from-orange-500 to-red-600",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        }
    ];

    const loopPatterns = [
        {
            name: "File Processing",
            description: "Process all files in a directory",
            loopType: "for",
            example: "for file in *.txt; do process \"$file\"; done"
        },
        {
            name: "Line Reading",
            description: "Read file line by line",
            loopType: "while",
            example: "while IFS= read -r line; do echo \"$line\"; done < file.txt"
        },
        {
            name: "Retry Logic",
            description: "Retry operation until success",
            loopType: "until",
            example: "until ping -c1 host; do sleep 5; done"
        },
        {
            name: "Counter Loop",
            description: "Loop with numeric sequence",
            loopType: "for",
            example: "for i in {1..10}; do echo \"Iteration $i\"; done"
        },
        {
            name: "Infinite Loop",
            description: "Loop until explicit break",
            loopType: "while",
            example: "while true; do process_data; sleep 60; done"
        },
        {
            name: "Array Iteration",
            description: "Loop through array elements",
            loopType: "for",
            example: "for item in \"${array[@]}\"; do echo \"$item\"; done"
        }
    ];

    // Simulate loop execution for visualization
    const simulateLoop = () => {
        if (iteration < 5) {
            setIteration(iteration + 1);
        } else {
            setIteration(1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto">
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_0.8s_ease-out]'
                    }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Loops: for, while, until with Practical Patterns
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Master the art of repetition in shell scripting. Learn how to automate repetitive tasks, 
                        process collections of data, and implement retry logic using Bash's powerful looping constructs.
                    </p>
                </div>

                {/* Loop Types Overview */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Loop Types Overview
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {loopTypes.map((loop, index) => (
                            <button
                                key={loop.type}
                                onClick={() => setActiveLoop(loop.type)}
                                className={clsx(
                                    "p-5 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center",
                                    activeLoop === loop.type
                                        ? `bg-gradient-to-r ${loop.color} text-white shadow-lg`
                                        : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300"
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.6s_ease-out]'
                                }}
                            >
                                <div className="mb-3">
                                    {loop.icon}
                                </div>
                                <div className="font-mono text-lg font-bold mb-1">{loop.name}</div>
                                <div className="text-sm mb-2">{loop.description}</div>
                                <div className="text-xs opacity-80 bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                                    {loop.useCase}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Loop Visualization */}
                    <div className="mt-6 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white">Loop Execution Flow</h3>
                            <button
                                onClick={simulateLoop}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-all duration-300"
                            >
                                Next Iteration
                            </button>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className={clsx(
                                        "flex-1 h-2 rounded-full transition-all duration-500",
                                        i <= iteration
                                            ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                            : "bg-gray-300 dark:bg-gray-600"
                                    )}
                                />
                            ))}
                        </div>
                        
                        <div className="text-center">
                            <span className="text-gray-700 dark:text-gray-300">
                                Iteration: <span className="font-bold text-blue-600 dark:text-blue-400">{iteration}/5</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Detailed Explanation */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Loop Prototypes</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* For Loop */}
                        <div className={clsx(
                            "p-4 rounded-xl transition-all duration-300",
                            activeLoop === "for" 
                                ? "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700"
                                : "bg-gray-100 dark:bg-gray-700"
                        )}>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                For Loop Syntax
                            </h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-50 dark:bg-gray-800 p-3 rounded mb-3">
                                {`for variable in list; do\n    # Commands\n    echo "$variable"\ndone`}
                            </code>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                {`for (( i=0; i<10; i++ )); do\n    echo "Iteration $i"\ndone`}
                            </code>
                        </div>

                        {/* While Loop */}
                        <div className={clsx(
                            "p-4 rounded-xl transition-all duration-300",
                            activeLoop === "while" 
                                ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700"
                                : "bg-gray-100 dark:bg-gray-700"
                        )}>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                While Loop Syntax
                            </h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-50 dark:bg-gray-800 p-3 rounded mb-3">
                                {`while [ condition ]; do\n    # Commands\n    echo "Running..."\ndone`}
                            </code>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                {`while IFS= read -r line; do\n    echo "$line"\ndone < input.txt`}
                            </code>
                        </div>

                        {/* Until Loop */}
                        <div className={clsx(
                            "p-4 rounded-xl transition-all duration-300",
                            activeLoop === "until" 
                                ? "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-700"
                                : "bg-gray-100 dark:bg-gray-700"
                        )}>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Until Loop Syntax
                            </h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-50 dark:bg-gray-800 p-3 rounded mb-3">
                                {`until [ condition ]; do\n    # Commands\n    echo "Waiting..."\ndone`}
                            </code>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                {`until ping -c1 host > /dev/null; do\n    sleep 5\ndone`}
                            </code>
                        </div>
                    </div>
                </div>

                {/* Loop Patterns */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Practical Loop Patterns</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {loopPatterns.map((pattern, index) => (
                            <div 
                                key={pattern.name}
                                className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.8s_ease-out]'
                                }}
                            >
                                <div className="flex items-start mb-3">
                                    <div className={clsx(
                                        "p-2 rounded-lg mr-3",
                                        pattern.loopType === "for" && "bg-blue-100 dark:bg-blue-900/30",
                                        pattern.loopType === "while" && "bg-green-100 dark:bg-green-900/30",
                                        pattern.loopType === "until" && "bg-orange-100 dark:bg-orange-900/30"
                                    )}>
                                        <span className={clsx(
                                            "font-mono text-xs font-bold",
                                            pattern.loopType === "for" && "text-blue-600 dark:text-blue-400",
                                            pattern.loopType === "while" && "text-green-600 dark:text-green-400",
                                            pattern.loopType === "until" && "text-orange-600 dark:text-orange-400"
                                        )}>
                                            {pattern.loopType}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-white">{pattern.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{pattern.description}</p>
                                    </div>
                                </div>
                                <code className="text-xs text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    {pattern.example}
                                </code>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Real-World Examples */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.6s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Real-World Examples</h2>
                    
                    <div className="space-y-8">
                        {/* Example 1: For Loop */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">For Loop: Processing Files</h3>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    File Operations
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={forLoopExample1}
                                title="Convert image files in Barrackpore project"
                                highlightLines={[5, 6, 7, 8]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Swadeep needs to convert all PNG images in the Shyamnagar project directory to JPEG format. 
                                    The for loop automatically processes each file matching the pattern.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: While Loop */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">While Loop: Reading Configuration</h3>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    Data Processing
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={whileLoopExample1}
                                title="Read server list from Ichapur data center"
                                highlightLines={[5, 6, 7, 8, 9]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Debangshu manages multiple servers in the Ichapur data center. 
                                    The while loop reads each server hostname from a file and performs health checks.
                                </p>
                            </div>
                        </div>

                        {/* Example 3: Until Loop */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Until Loop: Service Availability Check</h3>
                                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium">
                                    System Monitoring
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={untilLoopExample1}
                                title="Wait for database service to become available in Naihati"
                                highlightLines={[5, 6, 7, 8, 9, 10]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Abhronila needs to wait for the database service to start before running migration scripts 
                                    in the Naihati deployment environment. The until loop retries until successful.
                                </p>
                            </div>
                        </div>

                        {/* Advanced Patterns */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Advanced Pattern: Nested Loops</h3>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                                    Complex Processing
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={loopPatternsExample1}
                                title="Process student data across multiple classrooms"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12]}
                            />
                        </div>
                    </div>
                </div>

                {/* Loop Control */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.8s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Loop Control Statements</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <div className="flex items-center mb-3">
                                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-3">
                                    <span className="font-bold text-red-600 dark:text-red-400">break</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-white">Break Statement</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Exit the loop immediately</p>
                                </div>
                            </div>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                {`for file in *.log; do\n    if [ ! -s "$file" ]; then\n        echo "Found empty log file"\n        break  # Exit loop\n    fi\ndone`}
                            </code>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <div className="flex items-center mb-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                                    <span className="font-bold text-blue-600 dark:text-blue-400">continue</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-white">Continue Statement</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Skip to next iteration</p>
                                </div>
                            </div>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                {`for i in {1..10}; do\n    if (( i % 2 == 0 )); then\n        continue  # Skip even numbers\n    fi\n    echo "Odd: $i"\ndone`}
                            </code>
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Common Pitfalls & Solutions
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">Infinite Loops</h3>
                            <p className="text-red-700 dark:text-red-300 mb-2">
                                <strong>Problem:</strong> Forgetting to update the condition in while/until loops
                            </p>
                            <code className="text-sm text-red-800 dark:text-red-300 block bg-red-100 dark:bg-red-900/30 p-3 rounded mb-2">
                                {`count=1\nwhile [ $count -le 10 ]; do\n    echo "Count: $count"\n    # Forgot: count=$((count + 1))\ndone`}
                            </code>
                            <p className="text-red-700 dark:text-red-300">
                                <strong>Solution:</strong> Always ensure loop conditions eventually become false
                            </p>
                        </div>

                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Word Splitting Issues</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                                <strong>Problem:</strong> For loops splitting filenames with spaces
                            </p>
                            <code className="text-sm text-yellow-800 dark:text-yellow-300 block bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded mb-2">
                                {`for file in *.txt; do  # Splits "my file.txt" into "my" and "file.txt"\n    echo "$file"\ndone`}
                            </code>
                            <p className="text-yellow-700 dark:text-yellow-300">
                                <strong>Solution:</strong> Use <code className="text-sm">find</code> with <code className="text-sm">-print0</code> or quote variables
                            </p>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Subshell Problems</h3>
                            <p className="text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Problem:</strong> Pipes create subshells, variables don't persist
                            </p>
                            <code className="text-sm text-blue-800 dark:text-blue-300 block bg-blue-100 dark:bg-blue-900/30 p-3 rounded mb-2">
                                {`count=0\necho "file1\nfile2" | while read file; do\n    count=$((count + 1))\ndone\necho "Count: $count"  # Prints 0`}
                            </code>
                            <p className="text-blue-700 dark:text-blue-300">
                                <strong>Solution:</strong> Use process substitution or avoid pipes in loops
                            </p>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Best Practices</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Performance</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use <code className="text-sm">find -exec</code> for large file operations</li>
                                    <li>Avoid unnecessary commands inside loops</li>
                                    <li>Pre-compute values outside loops when possible</li>
                                    <li>Use appropriate loop type for the task</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Readability</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use descriptive variable names in loops</li>
                                    <li>Add comments explaining complex loop logic</li>
                                    <li>Keep loop bodies focused and small</li>
                                    <li>Extract complex logic into functions</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Safety</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Always quote variables in loops</li>
                                    <li>Set <code className="text-sm">set -e</code> for error handling</li>
                                    <li>Add timeout mechanisms for long-running loops</li>
                                    <li>Validate data before processing in loops</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Debugging</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use <code className="text-sm">set -x</code> to trace loop execution</li>
                                    <li>Add echo statements for debugging</li>
                                    <li>Test loops with small datasets first</li>
                                    <li>Check edge cases (empty lists, errors)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hint Section */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Thinking Points
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Think about...</strong> When should you use a for loop vs a while loop for processing files? 
                                Consider performance, readability, and error handling.
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Observe carefully...</strong> The difference in behavior between 
                                <code className="text-sm mx-1">while read line</code> and 
                                <code className="text-sm mx-1">for line in $(cat file)</code>. Which preserves whitespace?
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Try changing...</strong> A for loop that processes <code className="text-sm">*.txt</code> files to handle 
                                filenames with spaces correctly. What modifications are needed?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.6s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">What to Remember</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Use <code className="text-sm">for</code> when you have a known list of items
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Use <code className="text-sm">while</code> when condition controls loop execution
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Always quote variables inside loops to handle spaces
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Add safeguards against infinite loops
                            </span>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.8s_ease-out]'
                    }}
                >
                    <div className="flex items-start mb-4">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full mr-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Teacher's Note</h2>
                            <p className="text-gray-600 dark:text-gray-400">Sukanta Hui • 27 years experience</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Professional Insight</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Loops are where shell scripting truly shines. In production environments across Barrackpore and Shyamnagar, 
                                I've seen well-written loops process millions of files efficiently. Remember: <strong>Always test with edge cases</strong> - 
                                empty directories, files with special characters, and permission errors. A loop that works with normal data 
                                might fail catastrophically with edge cases.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When teaching Tuhina and Abhronila, I emphasize starting with simple loops and gradually adding complexity. 
                                First, echo the loop variable. Then add the actual processing. Finally, add error handling. This incremental 
                                approach helps debug issues early. Also, practice with <code className="text-sm">set -x</code> to see exactly 
                                what the loop is doing.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Performance Wisdom</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                For processing thousands of files in Ichapur's log directories, I prefer <code className="text-sm">find -exec</code> 
                                over shell loops. But for configuration processing or data validation, loops are perfect. Know your tools: 
                                <code className="text-sm">for</code> for lists, <code className="text-sm">while</code> for streams, 
                                <code className="text-sm">until</code> for waiting. Each has its sweet spot.
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Contact:</strong> sukantahui@codernaccotax.co.in • 7003756860<br />
                            <strong>Expertise:</strong> Programming Languages, RDBMS, Operating Systems, Web Development
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Topic13;