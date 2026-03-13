import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import exitStatusBasicExample1 from "./topic17_files/exit_status_basic_example1.sh?raw";
import exitStatusErrorExample1 from "./topic17_files/exit_status_error_example1.sh?raw";
import exitStatusPipelineExample1 from "./topic17_files/exit_status_pipeline_example1.sh?raw";
import exitStatusFunctionExample1 from "./topic17_files/exit_status_function_example1.sh?raw";
import exitStatusAdvancedExample1 from "./topic17_files/exit_status_advanced_example1.sh?raw";
import exitStatusDebugExample1 from "./topic17_files/exit_status_debug_example1.sh?raw";

const Topic17 = () => {
    const [activeStatus, setActiveStatus] = useState("success");
    const [commandOutput, setCommandOutput] = useState("");
    const [exitCode, setExitCode] = useState(0);

    const exitStatusCategories = [
        { 
            code: 0, 
            name: "Success", 
            description: "Command completed successfully",
            color: "from-green-500 to-emerald-600",
            icon: "✓"
        },
        { 
            code: 1, 
            name: "General Error", 
            description: "Catchall for general errors",
            color: "from-yellow-500 to-amber-600",
            icon: "⚠"
        },
        { 
            code: 2, 
            name: "Misuse", 
            description: "Misuse of shell builtins",
            color: "from-orange-500 to-red-600",
            icon: "✗"
        },
        { 
            code: 126, 
            name: "Cannot Execute", 
            description: "Command invoked cannot execute",
            color: "from-red-500 to-pink-600",
            icon: "🚫"
        },
        { 
            code: 127, 
            name: "Not Found", 
            description: "Command not found",
            color: "from-purple-500 to-indigo-600",
            icon: "🔍"
        },
        { 
            code: 130, 
            name: "Terminated", 
            description: "Script terminated by Control-C",
            color: "from-blue-500 to-cyan-600",
            icon: "⏹"
        }
    ];

    const commonExitCodes = [
        { range: "0", meaning: "Success", example: "ls /tmp" },
        { range: "1-2", meaning: "General error / Shell builtin misuse", example: "false" },
        { range: "126", meaning: "Command invoked cannot execute", example: "/dev/null" },
        { range: "127", meaning: "Command not found", example: "nonexistent_command" },
        { range: "128", meaning: "Invalid exit argument", example: "exit -1" },
        { range: "128+N", meaning: "Fatal error signal N", example: "kill -9 $$" },
        { range: "130", meaning: "Script terminated by Control-C", example: "Press Ctrl+C" },
        { range: "255", meaning: "Exit status out of range", example: "exit 256" }
    ];

    const testCommand = (command) => {
        let output = "";
        let code = 0;
        
        switch(command) {
            case "success":
                output = "Command executed successfully\nFile listed successfully";
                code = 0;
                break;
            case "notfound":
                output = "bash: nonexistent_command: command not found";
                code = 127;
                break;
            case "permission":
                output = "bash: /root/file.txt: Permission denied";
                code = 126;
                break;
            case "syntax":
                output = "bash: syntax error near unexpected token '}'";
                code = 2;
                break;
            default:
                output = "Ready to test commands...";
                code = 0;
        }
        
        setCommandOutput(output);
        setExitCode(code);
        setActiveStatus(command);
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
                        Exit Status and Error Codes ($?)
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Master the art of error handling in shell scripting. Understand how commands communicate success 
                        or failure, learn to interpret exit codes, and build robust scripts that properly handle errors 
                        using the special `$?` variable.
                    </p>
                </div>

                {/* Exit Status Fundamentals */}
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
                        Exit Status Fundamentals
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">What is $?</h3>
                            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <code className="font-mono text-blue-600 dark:text-blue-400">$?</code> is a special shell variable 
                                    that contains the <strong>exit status</strong> of the last executed command.
                                </p>
                            </div>
                            
                            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Key Characteristics</h4>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Range: 0 to 255 (8-bit integer)</li>
                                    <li>0 always means success</li>
                                    <li>Non-zero means failure (usually)</li>
                                    <li>Updated after every command execution</li>
                                    <li>Accessible but read-only</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Interactive Demo</h3>
                            <div className="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono">
                                <div className="mb-2">
                                    <span className="text-green-400">$</span> ls /tmp
                                </div>
                                <div className="mb-2 text-gray-300">
                                    file1.txt  file2.log  directory
                                </div>
                                <div className="mb-2">
                                    <span className="text-green-400">$</span> echo $?
                                </div>
                                <div className="text-blue-400">
                                    0
                                </div>
                            </div>
                            
                            <div className="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono">
                                <div className="mb-2">
                                    <span className="text-green-400">$</span> ls /nonexistent
                                </div>
                                <div className="mb-2 text-red-400">
                                    ls: cannot access '/nonexistent': No such file or directory
                                </div>
                                <div className="mb-2">
                                    <span className="text-green-400">$</span> echo $?
                                </div>
                                <div className="text-red-400">
                                    2
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exit Code Categories */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Exit Code Categories</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {exitStatusCategories.map((category, index) => (
                            <button
                                key={category.code}
                                onClick={() => testCommand(category.name.toLowerCase())}
                                className={clsx(
                                    "p-4 rounded-xl transition-all duration-300 transform hover:scale-105",
                                    activeStatus === category.name.toLowerCase()
                                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300"
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.8s_ease-out]'
                                }}
                            >
                                <div className="flex items-center mb-2">
                                    <div className={clsx(
                                        "w-10 h-10 rounded-full flex items-center justify-center mr-3 text-xl",
                                        activeStatus === category.name.toLowerCase() 
                                            ? "bg-white/30" 
                                            : "bg-white dark:bg-gray-600"
                                    )}>
                                        {category.icon}
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">Exit {category.code}</div>
                                        <div className="text-sm">{category.name}</div>
                                    </div>
                                </div>
                                <div className="text-sm opacity-90">{category.description}</div>
                            </button>
                        ))}
                    </div>

                    {/* Command Tester */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Command Exit Status Tester</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => testCommand("success")}
                                        className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300"
                                    >
                                        Test Success
                                    </button>
                                    <button
                                        onClick={() => testCommand("notfound")}
                                        className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300"
                                    >
                                        Test Not Found
                                    </button>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => testCommand("permission")}
                                        className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
                                    >
                                        Test Permission
                                    </button>
                                    <button
                                        onClick={() => testCommand("syntax")}
                                        className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300"
                                    >
                                        Test Syntax Error
                                    </button>
                                </div>
                            </div>
                            
                            <div className="p-4 bg-gray-900 rounded-lg">
                                <div className="text-sm text-gray-400 mb-2">Command Output:</div>
                                <pre className="text-gray-100 whitespace-pre-wrap font-mono text-sm">
                                    {commandOutput}
                                </pre>
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Exit Status:</span>
                                        <span className={clsx(
                                            "font-bold text-xl",
                                            exitCode === 0 ? "text-green-400" : "text-red-400"
                                        )}>
                                            $? = {exitCode}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Exit Codes Table */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Common Exit Codes Reference</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Exit Code
                                    </th>
                                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Meaning
                                    </th>
                                    <th className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Example
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {commonExitCodes.map((item, index) => (
                                    <tr 
                                        key={index}
                                        className="hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            animation: 'motion-safe:animate-[fadeInUp_0.6s_ease-out]'
                                        }}
                                    >
                                        <td className="px-4 py-3">
                                            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
                                                {item.range}
                                            </code>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                            {item.meaning}
                                        </td>
                                        <td className="px-4 py-3">
                                            <code className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                                {item.example}
                                            </code>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Signal Exit Codes (128+N)</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[1, 2, 3, 9, 15].map(signal => (
                                <div key={signal} className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                                    <div className="font-mono text-sm">Exit {128 + signal}</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        Signal {signal} ({signal === 9 ? 'KILL' : signal === 15 ? 'TERM' : `SIG${signal}`})
                                    </div>
                                </div>
                            ))}
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
                        {/* Example 1: Basic Usage */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Basic Exit Status Checking</h3>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Foundation
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={exitStatusBasicExample1}
                                title="File backup with exit status checking in Barrackpore"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Swadeep needs to create a backup script that checks if each 
                                    command succeeds before proceeding. Proper exit status handling prevents partial backups.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: Error Handling */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Comprehensive Error Handling</h3>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    Production Ready
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={exitStatusErrorExample1}
                                title="Service monitoring with detailed error reporting in Shyamnagar"
                                highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Tuhina monitors services in Shyamnagar data center. 
                                    Different exit codes provide specific information about what went wrong.
                                </p>
                            </div>
                        </div>

                        {/* Example 3: Pipeline Exit Status */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Pipeline Exit Status</h3>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                                    Advanced
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={exitStatusPipelineExample1}
                                title="Processing pipeline with exit status tracking in Ichapur"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Abhronila processes data through pipelines in Ichapur. 
                                    Understanding which command in a pipeline failed is crucial for debugging.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Techniques */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.8s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Advanced Techniques</h2>
                    
                    <div className="space-y-6">
                        {/* Example 1: Function Returns */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Function Exit Status</h3>
                            <ShellFileLoader
                                fileModule={exitStatusFunctionExample1}
                                title="Function-based error handling in Naihati projects"
                                highlightLines={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Professional Tip:</strong> Functions can return exit statuses using the `return` command. 
                                    This allows for modular error handling and reusable validation logic.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: Advanced Patterns */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Advanced Exit Status Patterns</h3>
                            <ShellFileLoader
                                fileModule={exitStatusAdvancedExample1}
                                title="Complex error handling patterns for production systems"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Note:</strong> Advanced patterns like `PIPESTATUS` and conditional execution 
                                    provide fine-grained control over error handling in complex scripts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exit Status in Conditionals */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Exit Status in Conditional Execution</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                AND List (&&)
                            </h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`command1 && command2
# Run command2 only if command1 succeeds (exit 0)`}
                            </code>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <strong>Example:</strong> Create directory and enter it
                                </p>
                                <code className="text-xs text-gray-600 dark:text-gray-400 block mt-1">
                                    mkdir /tmp/test && cd /tmp/test
                                </code>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                OR List (||)
                            </h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`command1 || command2
# Run command2 only if command1 fails (non-zero exit)`}
                            </code>
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <strong>Example:</strong> Try apt, fall back to yum
                                </p>
                                <code className="text-xs text-gray-600 dark:text-gray-400 block mt-1">
                                    apt update || yum update
                                </code>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Combined Conditional Execution</h3>
                        <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`# Complex logic with exit status
make && echo "Build successful" || {
    echo "Build failed"
    exit 1
}`}
                        </code>
                        <p className="text-gray-700 dark:text-gray-300">
                            This pattern executes the success message only if `make` succeeds, 
                            otherwise executes the error block and exits.
                        </p>
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
                            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">Forgetting to Check $? Immediately</h3>
                            <p className="text-red-700 dark:text-red-300 mb-2">
                                <strong>Problem:</strong> $? is overwritten by the next command
                            </p>
                            <code className="text-sm text-red-800 dark:text-red-300 block bg-red-100 dark:bg-red-900/30 p-3 rounded mb-2">
{`command_that_might_fail
echo "Doing other things..."
if [ $? -eq 0 ]; then  # Checks echo's exit status!
    echo "Success"
fi`}
                            </code>
                            <p className="text-red-700 dark:text-red-300">
                                <strong>Solution:</strong> Save $? immediately or use conditional execution
                            </p>
                            <code className="text-sm text-green-800 dark:text-green-300 block bg-green-100 dark:bg-green-900/30 p-3 rounded">
{`command_that_might_fail
exit_status=$?
echo "Doing other things..."
if [ $exit_status -eq 0 ]; then
    echo "Success"
fi`}
                            </code>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Misunderstanding Pipeline Exit Status</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                                <strong>Problem:</strong> $? only captures last command in pipeline
                            </p>
                            <code className="text-sm text-yellow-800 dark:text-yellow-300 block bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded mb-2">
{`grep "error" file.txt | wc -l
if [ $? -eq 0 ]; then
    echo "Found errors"  # Actually checks wc's exit status!
fi`}
                            </code>
                            <p className="text-yellow-700 dark:text-yellow-300">
                                <strong>Solution:</strong> Use `set -o pipefail` or check `PIPESTATUS`
                            </p>
                            <code className="text-sm text-green-800 dark:text-green-300 block bg-green-100 dark:bg-green-900/30 p-3 rounded">
{`set -o pipefail
grep "error" file.txt | wc -l
if [ $? -eq 0 ]; then
    echo "Pipeline successful"
fi`}
                            </code>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Ignoring Non-Zero Success Codes</h3>
                            <p className="text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Problem:</strong> Some commands use non-zero for "success with conditions"
                            </p>
                            <code className="text-sm text-blue-800 dark:text-blue-300 block bg-blue-100 dark:bg-blue-900/30 p-3 rounded mb-2">
{`grep "pattern" file.txt
if [ $? -ne 0 ]; then
    echo "Pattern not found"  # grep returns 1 for "not found", not error
fi`}
                            </code>
                            <p className="text-blue-700 dark:text-blue-300">
                                <strong>Solution:</strong> Understand each command's exit code semantics
                            </p>
                            <code className="text-sm text-green-800 dark:text-green-300 block bg-green-100 dark:bg-green-900/30 p-3 rounded">
{`grep "pattern" file.txt
case $? in
    0) echo "Pattern found" ;;
    1) echo "Pattern not found" ;;
    *) echo "Error occurred" ;;
esac`}
                            </code>
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
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Error Handling</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use `set -e` to exit on error (with caution)</li>
                                    <li>Use `set -o pipefail` for pipeline error detection</li>
                                    <li>Always check $? after critical commands</li>
                                    <li>Provide meaningful error messages</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Script Design</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Define clear exit code conventions for your script</li>
                                    <li>Document expected exit codes in comments</li>
                                    <li>Use functions to encapsulate error-prone operations</li>
                                    <li>Test with both success and failure scenarios</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Debugging</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use `set -x` to trace execution</li>
                                    <li>Log exit statuses for debugging</li>
                                    <li>Test edge cases and error conditions</li>
                                    <li>Check `PIPESTATUS` for pipeline debugging</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Production Ready</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Always handle errors gracefully</li>
                                    <li>Clean up resources on exit (use traps)</li>
                                    <li>Return appropriate exit codes to calling processes</li>
                                    <li>Consider using `trap` for exit cleanup</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Debugging Example */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.6s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Debugging Exit Status Issues</h2>
                    
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Debugging Script with set -x</h3>
                            <ShellFileLoader
                                fileModule={exitStatusDebugExample1}
                                title="Debugging exit status issues in production scripts"
                                highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Professional Tip:</strong> Use `set -x` to trace command execution and see 
                                    exit statuses in real-time. This is invaluable for debugging complex error handling logic.
                                </p>
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
                                <strong>Think about...</strong> When should you use `set -e` in a script versus 
                                manually checking each command's exit status? Consider maintenance vs. safety trade-offs.
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Observe carefully...</strong> The difference between `command && echo "Success"` 
                                and `if command; then echo "Success"; fi`. Which is more readable? Which handles errors better?
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Try changing...</strong> A script that uses many `if [ $? -eq 0 ]` checks to use 
                                conditional execution operators (`&&` and `||`). How does this affect readability and maintainability?
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
                                0 = success, non-zero = failure (usually)
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                $? is overwritten after each command
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Use `set -o pipefail` for pipeline error detection
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Save $? immediately if you need it later
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
                                Exit status handling is what separates amateur scripts from production-ready systems. 
                                In Barrackpore's mission-critical systems, we log every non-zero exit with context. 
                                Remember: <strong>Every command tells a story through its exit code</strong>. 
                                Learn to listen. Also, `set -e` is powerful but dangerous - it can mask errors if not used 
                                with `set -o errtrace` and proper trap handlers. In Shyamnagar, we use a combination of 
                                `set -euo pipefail` and explicit error checking for maximum robustness.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When teaching Debangshu and Abhronila, I emphasize the "check early, check often" principle. 
                                Create scripts that deliberately fail at different points and observe the exit codes. 
                                Practice debugging with `set -x` to see the flow. Also, teach them to write functions that 
                                return meaningful exit codes - this builds good habits for larger projects. A useful exercise: 
                                rewrite a script that ignores errors to one that handles them gracefully.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Production Wisdom</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                In the Naihati deployment system, we have a standard: scripts must document their exit codes 
                                in the header comment. We also use a wrapper script that interprets exit codes and sends 
                                appropriate alerts. For pipelines, we always use `set -o pipefail` and check `PIPESTATUS`. 
                                Pro tip: Create a function `log_and_exit()` that logs the error context and exits with a 
                                meaningful code. This pattern has saved us countless debugging hours across Ichapur projects.
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

export default Topic17;