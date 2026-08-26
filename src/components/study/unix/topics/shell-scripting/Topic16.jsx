import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import subshellExample1 from "./topic16_files/subshell_example1.sh?raw";
import subshellExample2 from "./topic16_files/subshell_example2.sh?raw";
import groupingExample1 from "./topic16_files/grouping_example1.sh?raw";
import groupingExample2 from "./topic16_files/grouping_example2.sh?raw";
import comparisonExample1 from "./topic16_files/comparison_example1.sh?raw";
import pipelineExample1 from "./topic16_files/pipeline_example1.sh?raw";

const Topic16 = () => {
    const [activeConcept, setActiveConcept] = useState("subshell");
    const [executionDemo, setExecutionDemo] = useState({
        subshell: { pid: "?", variables: "isolated", output: "Waiting..." },
        grouping: { pid: "?", variables: "shared", output: "Waiting..." }
    });

    const concepts = [
        { 
            id: "subshell", 
            name: "Subshell", 
            description: "Commands executed in child process",
            syntax: "(command1; command2)",
            color: "from-blue-500 to-cyan-600",
            icon: "↻"
        },
        { 
            id: "grouping", 
            name: "Command Grouping", 
            description: "Commands executed in current shell",
            syntax: "{ command1; command2; }",
            color: "from-green-500 to-emerald-600",
            icon: "{}"
        }
    ];

    const keyDifferences = [
        {
            aspect: "Process ID",
            subshell: "Different PID (child process)",
            grouping: "Same PID (current shell)",
            explanation: "Subshells create new processes, grouping doesn't"
        },
        {
            aspect: "Variable Scope",
            subshell: "Variables isolated, changes lost",
            grouping: "Variables shared, changes persist",
            explanation: "Subshell cannot modify parent's variables"
        },
        {
            aspect: "Exit Status",
            subshell: "Last command's exit status",
            grouping: "Last command's exit status",
            explanation: "Both return exit status of last command"
        },
        {
            aspect: "Performance",
            subshell: "Slower (process creation)",
            grouping: "Faster (no process creation)",
            explanation: "Subshells have overhead of new process"
        },
        {
            aspect: "Use Cases",
            subshell: "Isolated environments, parallel execution",
            grouping: "Command grouping, I/O redirection",
            explanation: "Choose based on variable sharing needs"
        }
    ];

    const runDemo = (type) => {
        if (type === "subshell") {
            setExecutionDemo({
                ...executionDemo,
                subshell: {
                    pid: "$(sh -c 'echo $PPID')",
                    variables: "count remains 1",
                    output: "Variable changes isolated to subshell"
                }
            });
        } else {
            setExecutionDemo({
                ...executionDemo,
                grouping: {
                    pid: "$$",
                    variables: "count becomes 2",
                    output: "Variable changes persist in current shell"
                }
            });
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
                        Subshells vs Command Grouping Using { }
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Understand the crucial difference between executing commands in subshells (parentheses) 
                        and command grouping (braces). Master when to use each for variable scope control, 
                        performance optimization, and proper command execution.
                    </p>
                </div>

                {/* Core Concepts */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Core Concepts
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {concepts.map((concept, index) => (
                            <button
                                key={concept.id}
                                onClick={() => setActiveConcept(concept.id)}
                                className={clsx(
                                    "p-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-left",
                                    activeConcept === concept.id
                                        ? `bg-gradient-to-r ${concept.color} text-white shadow-lg`
                                        : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300"
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.8s_ease-out]'
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className={clsx(
                                        "w-12 h-12 rounded-lg flex items-center justify-center mr-4 text-2xl font-bold",
                                        activeConcept === concept.id ? "bg-white/30" : "bg-gray-100 dark:bg-gray-600"
                                    )}>
                                        {concept.icon}
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">{concept.name}</div>
                                        <div className="text-sm opacity-90">{concept.description}</div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="text-sm font-medium mb-2">Syntax:</div>
                                    <code className="block bg-black/20 dark:bg-white/20 p-3 rounded text-sm font-mono">
                                        {concept.syntax}
                                    </code>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Interactive Demo */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Subshell Demo</h3>
                            <div className="space-y-3">
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-900 text-gray-100 p-3 rounded">
{`count=1
( count=2; echo "Subshell PID: $$" )
echo "Count: $count"`}
                                </code>
                                <button
                                    onClick={() => runDemo("subshell")}
                                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-all duration-300"
                                >
                                    Run Subshell Example
                                </button>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        <div><strong>PID:</strong> {executionDemo.subshell.pid}</div>
                                        <div><strong>Variables:</strong> {executionDemo.subshell.variables}</div>
                                        <div><strong>Output:</strong> {executionDemo.subshell.output}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Grouping Demo</h3>
                            <div className="space-y-3">
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-900 text-gray-100 p-3 rounded">
{`count=1
{ count=2; echo "Group PID: $$"; }
echo "Count: $count"`}
                                </code>
                                <button
                                    onClick={() => runDemo("grouping")}
                                    className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all duration-300"
                                >
                                    Run Grouping Example
                                </button>
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        <div><strong>PID:</strong> {executionDemo.grouping.pid}</div>
                                        <div><strong>Variables:</strong> {executionDemo.grouping.variables}</div>
                                        <div><strong>Output:</strong> {executionDemo.grouping.output}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Differences */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Key Differences</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Aspect
                                    </th>
                                    <th className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-left text-xs font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider">
                                        Subshell ( )
                                    </th>
                                    <th className="px-4 py-3 bg-green-50 dark:bg-green-900/20 text-left text-xs font-medium text-green-600 dark:text-green-300 uppercase tracking-wider">
                                        Grouping { }
                                    </th>
                                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Explanation
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {keyDifferences.map((diff, index) => (
                                    <tr 
                                        key={index}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            animation: 'motion-safe:animate-[fadeInUp_0.6s_ease-out]'
                                        }}
                                    >
                                        <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-300">
                                            {diff.aspect}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            {diff.subshell}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            {diff.grouping}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                            {diff.explanation}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Memory Aid</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Parentheses ( ) create a Parent Process</strong> - New shell, isolated environment<br />
                            <strong>Braces { } Bind commands Together</strong> - Same shell, shared environment
                        </p>
                    </div>
                </div>

                {/* Visual Comparison */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Execution Flow Comparison</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Subshell Flow */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center mb-4">
                                <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full font-semibold">
                                    Subshell Execution
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-700"></div>
                                {[
                                    { step: 1, text: "Parent Shell PID: 1234", color: "blue" },
                                    { step: 2, text: "Fork → Child Shell PID: 1235", color: "cyan" },
                                    { step: 3, text: "Execute commands in child", color: "cyan" },
                                    { step: 4, text: "Child terminates", color: "cyan" },
                                    { step: 5, text: "Parent continues (vars unchanged)", color: "blue" }
                                ].map((step, index) => (
                                    <div key={index} className="relative flex items-center mb-6">
                                        <div className={`z-10 w-8 h-8 rounded-full bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 flex items-center justify-center text-white font-bold`}>
                                            {step.step}
                                        </div>
                                        <div className="ml-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow flex-1">
                                            <div className="text-gray-800 dark:text-gray-300">{step.text}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Grouping Flow */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center mb-4">
                                <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold">
                                    Grouping Execution
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200 dark:bg-green-700"></div>
                                {[
                                    { step: 1, text: "Current Shell PID: 1234", color: "green" },
                                    { step: 2, text: "Execute command group", color: "green" },
                                    { step: 3, text: "Variables modified directly", color: "green" },
                                    { step: 4, text: "Continue execution", color: "green" },
                                    { step: 5, text: "All changes persist", color: "green" }
                                ].map((step, index) => (
                                    <div key={index} className="relative flex items-center mb-6">
                                        <div className={`z-10 w-8 h-8 rounded-full bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 flex items-center justify-center text-white font-bold`}>
                                            {step.step}
                                        </div>
                                        <div className="ml-4 p-3 bg-white dark:bg-gray-700 rounded-lg shadow flex-1">
                                            <div className="text-gray-800 dark:text-gray-300">{step.text}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
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
                        {/* Example 1: Subshell */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Subshell: Isolated Environment</h3>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Environment Isolation
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={subshellExample1}
                                title="Temporary directory changes in Barrackpore project"
                                highlightLines={[5, 6, 7, 8, 9]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Swadeep needs to run commands in a different directory 
                                    without affecting the current shell's working directory. Subshell isolates the `cd` command.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: Subshell Variables */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Subshell: Variable Scope</h3>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Scope Control
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={subshellExample2}
                                title="Processing student data without side effects"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Tuhina needs to process sensitive student data in Shyamnagar 
                                    without accidentally modifying variables in the main script. Subshell provides isolation.
                                </p>
                            </div>
                        </div>

                        {/* Example 3: Command Grouping */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Grouping: I/O Redirection</h3>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    I/O Management
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={groupingExample1}
                                title="Redirecting multiple commands in Ichapur logs"
                                highlightLines={[5, 6, 7, 8, 9]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Abhronila needs to redirect output from multiple commands 
                                    to the same log file in Ichapur's monitoring system. Grouping ensures all output goes 
                                    to the same destination.
                                </p>
                            </div>
                        </div>

                        {/* Example 4: Grouping Variables */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Grouping: Variable Persistence</h3>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    State Management
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={groupingExample2}
                                title="Maintaining state across commands in Naihati"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Debangshu needs to update multiple variables together 
                                    in Naihati's configuration system. Grouping ensures all variable changes happen 
                                    atomically in the same shell context.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comparison Examples */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.8s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Side-by-Side Comparison</h2>
                    
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Same Task, Different Approaches</h3>
                            <ShellFileLoader
                                fileModule={comparisonExample1}
                                title="Processing files with and without variable persistence"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Professional Insight:</strong> This comparison shows when to use each approach. 
                                    Use subshells when you need isolation, grouping when you need to maintain state. 
                                    The choice affects whether variable changes persist.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pipeline Considerations */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Pipelines & Subshells</h2>
                    
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Pipeline Subshells</h3>
                            <ShellFileLoader
                                fileModule={pipelineExample1}
                                title="Variable scope in pipeline commands"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Important:</strong> Each command in a pipeline runs in its own subshell. 
                                    This means variable assignments in pipelines don't persist. Use command grouping 
                                    or alternative approaches when you need to preserve variable changes.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Pipeline Problem</h3>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`count=0
cat file.txt | while read line; do
    count=$((count + 1))
done
echo "Count: $count"  # Prints 0!`}
                                </code>
                                <p className="text-gray-700 dark:text-gray-300">
                                    The `while` loop runs in a subshell, so `count` changes don't persist.
                                </p>
                            </div>
                            
                            <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Pipeline Solution</h3>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`count=0
while read line; do
    count=$((count + 1))
done < file.txt
echo "Count: $count"  # Correct!`}
                                </code>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Avoid pipeline to keep loop in current shell, or use process substitution.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Common Pitfalls & Solutions
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">Unexpected Variable Loss</h3>
                            <p className="text-red-700 dark:text-red-300 mb-2">
                                <strong>Problem:</strong> Variable changes in subshells don't persist
                            </p>
                            <code className="text-sm text-red-800 dark:text-red-300 block bg-red-100 dark:bg-red-900/30 p-3 rounded mb-2">
{`config="default"
(
    config="modified"
    echo "Inside: $config"  # Prints "modified"
)
echo "Outside: $config"  # Prints "default" - SURPRISE!`}
                            </code>
                            <p className="text-red-700 dark:text-red-300">
                                <strong>Solution:</strong> Use command grouping or return values from subshells
                            </p>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Missing Space in Grouping</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                                <strong>Problem:</strong> Missing spaces around braces cause syntax errors
                            </p>
                            <code className="text-sm text-yellow-800 dark:text-yellow-300 block bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded mb-2">
{`{echo "test";}  # ERROR: Missing space
{ echo "test"; } # CORRECT`}
                            </code>
                            <p className="text-yellow-700 dark:text-yellow-300">
                                <strong>Solution:</strong> Braces must be surrounded by spaces and end with semicolon or newline
                            </p>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Pipeline Variable Scope</h3>
                            <p className="text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Problem:</strong> Variables in pipeline commands don't affect parent
                            </p>
                            <code className="text-sm text-blue-800 dark:text-blue-300 block bg-blue-100 dark:bg-blue-900/30 p-3 rounded mb-2">
{`count=0
seq 10 | while read num; do
    count=$((count + num))
done
echo "Total: $count"  # Prints 0!`}
                            </code>
                            <p className="text-blue-700 dark:text-blue-300">
                                <strong>Solution:</strong> Use process substitution or avoid pipelines for variable accumulation
                            </p>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Best Practices</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Use Subshells When...</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>You need isolated environment for commands</li>
                                    <li>Changing directory temporarily</li>
                                    <li>Setting environment variables temporarily</li>
                                    <li>Running commands in background</li>
                                    <li>Parallel execution is needed</li>
                                    <li>You want to capture command output without side effects</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Performance Considerations</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Subshells have process creation overhead</li>
                                    <li>Avoid subshells in tight loops</li>
                                    <li>Use grouping for performance-critical sections</li>
                                    <li>Consider command substitution overhead</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Use Grouping When...</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>You need to redirect I/O for multiple commands</li>
                                    <li>Variable changes must persist</li>
                                    <li>Commands must run in current shell context</li>
                                    <li>Performance is critical</li>
                                    <li>You need to apply redirection to command list</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Syntax Guidelines</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Subshells: `(commands)`</li>
                                    <li>Grouping: {`{ commands; }`} (note spaces and semicolon)</li>
                                    <li>Always test variable persistence assumptions</li>
                                    <li>Use `set -x` to debug execution flow</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hint Section */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.6s_ease-out]'
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
                                <strong>Think about...</strong> When would you intentionally use a subshell to prevent 
                                variable pollution in your main script? Consider cleanup operations or temporary settings.
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Observe carefully...</strong> The performance difference when using subshells 
                                in loops processing thousands of items vs using grouping. How would you measure this?
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Try changing...</strong> A script that uses pipelines to avoid subshell variable 
                                isolation. What alternative approaches could maintain variable state?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.8s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">What to Remember</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Subshells isolate, grouping shares variables
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Pipelines create implicit subshells
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Subshells have performance overhead
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Grouping needs spaces: `{ }`
                            </span>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_3.0s_ease-out]'
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
                                Understanding subshells vs grouping is critical for professional shell scripting. 
                                In Barrackpore's production systems, I've debugged countless issues where variables 
                                mysteriously didn't update - almost always a subshell issue. Remember: 
                                <strong>Pipelines create implicit subshells</strong>. This catches even experienced 
                                developers off guard. When in doubt, test variable persistence with a simple echo 
                                before and after.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When teaching Abhronila and Tuhina, I use the "sandbox vs workshop" analogy. 
                                Subshells are like a sandbox - you can play and make changes, but when you leave, 
                                everything resets. Grouping is like a workshop - changes you make stay until you 
                                clean up. Create simple test scripts that demonstrate variable persistence and 
                                have students predict the output before running. This builds intuitive understanding.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Performance Wisdom</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                In the Shyamnagar high-frequency monitoring system, we avoid subshells in performance-critical 
                                loops. Creating thousands of processes adds noticeable overhead. Instead, we use grouping 
                                and process substitution. However, for safety - like processing untrusted data in Naihati - 
                                we use subshells for isolation. The rule: <strong>Grouping for performance, subshells for safety</strong>. 
                                Profile your scripts with `time` to make informed decisions.
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

export default Topic16;