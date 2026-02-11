import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import redirectBasicExample1 from "./topic18_files/redirect_basic_example1.sh?raw";
import redirectAppendExample1 from "./topic18_files/redirect_append_example1.sh?raw";
import redirectStderrExample1 from "./topic18_files/redirect_stderr_example1.sh?raw";
import redirectCombinedExample1 from "./topic18_files/redirect_combined_example1.sh?raw";
import redirectHereDocExample1 from "./topic18_files/redirect_heredoc_example1.sh?raw";
import redirectAdvancedExample1 from "./topic18_files/redirect_advanced_example1.sh?raw";

const Topic18 = () => {
    const [activeRedirect, setActiveRedirect] = useState("stdout");
    const [simulationOutput, setSimulationOutput] = useState("");

    const redirectTypes = [
        { 
            id: "stdout", 
            name: "Standard Output", 
            symbol: ">",
            description: "Redirect stdout to file (overwrite)",
            syntax: "command > file",
            color: "from-blue-500 to-cyan-600"
        },
        { 
            id: "append", 
            name: "Append Output", 
            symbol: ">>",
            description: "Append stdout to file",
            syntax: "command >> file",
            color: "from-green-500 to-emerald-600"
        },
        { 
            id: "stdin", 
            name: "Standard Input", 
            symbol: "<",
            description: "Redirect file to stdin",
            syntax: "command < file",
            color: "from-purple-500 to-pink-600"
        },
        { 
            id: "stderr", 
            name: "Standard Error", 
            symbol: "2>",
            description: "Redirect stderr to file",
            syntax: "command 2> error.log",
            color: "from-red-500 to-orange-600"
        },
        { 
            id: "combined", 
            name: "Combined Output", 
            symbol: "&>",
            description: "Redirect stdout and stderr",
            syntax: "command &> output.log",
            color: "from-yellow-500 to-amber-600"
        },
        { 
            id: "heredoc", 
            name: "Here Document", 
            symbol: "<<",
            description: "Inline input redirection",
            syntax: "command << EOF\ninput\nEOF",
            color: "from-indigo-500 to-purple-600"
        }
    ];

    const fileDescriptors = [
        { fd: 0, name: "stdin", description: "Standard Input", default: "Keyboard", color: "bg-purple-100 dark:bg-purple-900/30" },
        { fd: 1, name: "stdout", description: "Standard Output", default: "Terminal", color: "bg-blue-100 dark:bg-blue-900/30" },
        { fd: 2, name: "stderr", description: "Standard Error", default: "Terminal", color: "bg-red-100 dark:bg-red-900/30" },
    ];

    const redirectionExamples = [
        {
            command: "ls /tmp > files.txt",
            description: "Save directory listing to file"
        },
        {
            command: "echo \"New log entry\" >> app.log",
            description: "Append to log file"
        },
        {
            command: "sort < unsorted.txt",
            description: "Sort contents of file"
        },
        {
            command: "find / -name \"*.conf\" 2> errors.log",
            description: "Save errors to separate file"
        },
        {
            command: "script.sh &> all_output.log",
            description: "Capture all output"
        },
        {
            command: "cat << EOF\nLine 1\nLine 2\nEOF",
            description: "Use here-document for input"
        }
    ];

    const runSimulation = (type) => {
        let output = "";
        switch(type) {
            case "stdout":
                output = "Command: echo 'Hello from Barrackpore' > greeting.txt\n\n";
                output += "Result: greeting.txt created with content:\n";
                output += "Hello from Barrackpore";
                break;
            case "append":
                output = "Command: echo 'Line 1' > log.txt\n";
                output += "        echo 'Line 2' >> log.txt\n\n";
                output += "Result: log.txt contains:\n";
                output += "Line 1\nLine 2";
                break;
            case "stdin":
                output = "File input.txt contains:\n";
                output += "apple\nbanana\ncherry\n\n";
                output += "Command: sort < input.txt\n\n";
                output += "Result:\napple\nbanana\ncherry";
                break;
            case "stderr":
                output = "Command: ls /nonexistent 2> error.log\n\n";
                output += "Terminal shows nothing (errors redirected)\n";
                output += "error.log contains:\n";
                output += "ls: cannot access '/nonexistent': No such file or directory";
                break;
            case "combined":
                output = "Command: ./script.sh &> output.log\n\n";
                output += "Both stdout and stderr go to output.log\n";
                output += "Nothing appears in terminal";
                break;
            default:
                output = "Select a redirection type to see simulation";
        }
        setSimulationOutput(output);
        setActiveRedirect(type);
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
                        Redirection: {`>, >>, <, 2>, &>`}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Master the art of controlling input and output streams in shell scripting. Learn how to redirect 
                        standard streams, combine outputs, and create powerful data processing pipelines using redirection operators.
                    </p>
                </div>

                {/* File Descriptors Overview */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Standard Streams (File Descriptors)
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {fileDescriptors.map((fd, index) => (
                            <div 
                                key={fd.fd}
                                className={clsx(
                                    "p-4 rounded-xl transition-all duration-300 transform hover:scale-105",
                                    fd.color
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.8s_ease-out]'
                                }}
                            >
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-3 font-bold text-gray-800 dark:text-gray-300">
                                        {fd.fd}
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg text-gray-800 dark:text-white">{fd.name}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{fd.description}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Default: <code className="bg-black/10 dark:bg-white/10 px-2 py-1 rounded">{fd.default}</code>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Stream Flow Visualization</h3>
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                            <div className="text-center">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <div className="font-bold">stdin (0)</div>
                                    <div className="text-sm">Input → Process</div>
                                </div>
                            </div>
                            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <div className="p-4 bg-gray-800 text-white rounded-lg">
                                <div className="font-mono">Command</div>
                                <div className="text-xs opacity-80">Process</div>
                            </div>
                            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <div className="flex space-x-4">
                                <div className="text-center">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <div className="font-bold">stdout (1)</div>
                                        <div className="text-sm">Process → Output</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                        <div className="font-bold">stderr (2)</div>
                                        <div className="text-sm">Process → Errors</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Redirection Types */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Redirection Operators</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {redirectTypes.map((redirect, index) => (
                            <button
                                key={redirect.id}
                                onClick={() => runSimulation(redirect.id)}
                                className={clsx(
                                    "p-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-left",
                                    activeRedirect === redirect.id
                                        ? `bg-gradient-to-r ${redirect.color} text-white shadow-lg`
                                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300"
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.6s_ease-out]'
                                }}
                            >
                                <div className="flex items-center mb-3">
                                    <div className={clsx(
                                        "w-12 h-12 rounded-lg flex items-center justify-center mr-3 text-2xl font-bold",
                                        activeRedirect === redirect.id ? "bg-white/30" : "bg-white dark:bg-gray-600"
                                    )}>
                                        {redirect.symbol}
                                    </div>
                                    <div>
                                        <div className="font-bold">{redirect.name}</div>
                                        <div className="text-sm opacity-90">{redirect.description}</div>
                                    </div>
                                </div>
                                <code className="block text-sm bg-black/10 dark:bg-white/10 p-2 rounded mt-2">
                                    {redirect.syntax}
                                </code>
                            </button>
                        ))}
                    </div>

                    {/* Simulation Panel */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Redirection Simulation</h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-900 rounded-lg">
                                    <div className="text-sm text-gray-400 mb-2">Command Execution:</div>
                                    <pre className="text-gray-100 whitespace-pre-wrap font-mono text-sm">
                                        {simulationOutput || "Select a redirection type to see simulation"}
                                    </pre>
                                </div>
                                
                                <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Quick Examples</h4>
                                    <div className="space-y-2">
                                        {redirectionExamples.map((example, index) => (
                                            <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                                                <code className="text-sm text-gray-700 dark:text-gray-300 block">
                                                    {example.command}
                                                </code>
                                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                    {example.description}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">File Descriptor Redirection</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">command > file</code>
                                            <div className="text-gray-600 dark:text-gray-400">Short for 1> file</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">command 2>&1</code>
                                            <div className="text-gray-600 dark:text-gray-400">Redirect stderr to stdout</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">command > file 2>&1</code>
                                            <div className="text-gray-600 dark:text-gray-400">Both to file (old style)</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">{`command &> file`}</code>
                                            <div className="text-gray-600 dark:text-gray-400">Both to file (Bash)</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Special Files</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">{`command > /dev/null`}</code>
                                            <div className="text-gray-600 dark:text-gray-400">Discard output</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">{`command 2> /dev/null`}</code>
                                            <div className="text-gray-600 dark:text-gray-400">Discard errors</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <code className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">{`command < /dev/null`}</code>
                                            <div className="text-gray-600 dark:text-gray-400">No input</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Real-World Examples */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Real-World Examples</h2>
                    
                    <div className="space-y-8">
                        {/* Example 1: Basic Redirection */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Basic File Operations</h3>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Foundation
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={redirectBasicExample1}
                                title="Log file management in Barrackpore server"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Swadeep needs to manage log files in the Barrackpore server. 
                                    Redirection operators help create, overwrite, and append to log files efficiently.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: Append Operations */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Appending Logs</h3>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    Log Management
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={redirectAppendExample1}
                                title="Application logging in Shyamnagar monitoring"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Tuhina manages application logs in Shyamnagar. 
                                    Using `>>` ensures log entries are preserved instead of overwritten.
                                </p>
                            </div>
                        </div>

                        {/* Example 3: Error Handling */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Error Redirection</h3>
                                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                                    Error Handling
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={redirectStderrExample1}
                                title="Error logging for Ichapur backup system"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Abhronila handles backup errors in Ichapur. 
                                    Separating stdout and stderr allows clean output while capturing errors for debugging.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Redirection */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.6s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Advanced Redirection Techniques</h2>
                    
                    <div className="space-y-6">
                        {/* Example 1: Combined Output */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Combined Output Redirection</h3>
                            <ShellFileLoader
                                fileModule={redirectCombinedExample1}
                                title="Complete output capture for Naihati deployment"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Professional Tip:</strong> Use `&>` when you need to capture both stdout and stderr 
                                    to the same file. This is cleaner than `command > file 2>&1`.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: Here Documents */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Here Documents & Here Strings</h3>
                            <ShellFileLoader
                                fileModule={redirectHereDocExample1}
                                title="Inline input for configuration generation"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Note:</strong>{" "}
                                    Here documents (<code>&lt;&lt;</code>) are useful for multi-line input,
                                    while here strings (<code>&lt;&lt;&lt;</code>) work for single-line input.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Patterns */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.8s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Advanced Redirection Patterns</h2>
                    
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Complex Redirection Patterns</h3>
                            <ShellFileLoader
                                fileModule={redirectAdvancedExample1}
                                title="Sophisticated I/O redirection for production systems"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Duplicate File Descriptors</h3>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`# Save stdout to fd 3, redirect stdout to file
exec 3>&1
echo "This goes to file" > output.log
# Restore stdout
echo "This goes to terminal" >&3`}
                                </code>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Save and restore file descriptors for complex redirection scenarios.
                                </p>
                            </div>
                            
                            <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Process Substitution</h3>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`# Compare outputs of two commands
diff <(ls /dir1) <(ls /dir2)

# Feed command output as file
grep "pattern" <(find . -name "*.txt")`}
                                </code>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Use process substitution to treat command output as files.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Redirection Pitfalls */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">Order Matters in Redirection</h3>
                            <p className="text-red-700 dark:text-red-300 mb-2">
                                <strong>Problem:</strong> Redirections are processed left to right
                            </p>
                            <code className="text-sm text-red-800 dark:text-red-300 block bg-red-100 dark:bg-red-900/30 p-3 rounded mb-2">
{`# WRONG: stderr redirected to current stdout (terminal), then stdout to file
command 2>&1 > output.log

# CORRECT: stdout to file, then stderr to same file
command > output.log 2>&1`}
                            </code>
                            <p className="text-red-700 dark:text-red-300">
                                <strong>Solution:</strong> Think about the order: redirect stdout first, then stderr to stdout
                            </p>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Noclobber Protection</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                                <strong>Problem:</strong> `>` overwrites files without warning
                            </p>
                            <code className="text-sm text-yellow-800 dark:text-yellow-300 block bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded mb-2">
{`# Enable noclobber to prevent overwrites
set -o noclobber
echo "test" > existing_file.txt  # Error: cannot overwrite
echo "test" >| existing_file.txt  # Force overwrite with >|`}
                            </code>
                            <p className="text-yellow-700 dark:text-yellow-300">
                                <strong>Solution:</strong> Use `set -o noclobber` or `>|` to force overwrite
                            </p>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Empty File Creation</h3>
                            <p className="text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Problem:</strong> `>` creates empty file even if command fails
                            </p>
                            <code className="text-sm text-blue-800 dark:text-blue-300 block bg-blue-100 dark:bg-blue-900/30 p-3 rounded mb-2">
{`# Creates empty file even if ls fails
ls /nonexistent > output.txt
# File exists but empty`}
                            </code>
                            <p className="text-blue-700 dark:text-blue-300">
                                <strong>Solution:</strong> Check command success before using output, or use append
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
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Logging Strategy</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use `>>` for log files to preserve history</li>
                                    <li>Separate stdout and stderr for debugging</li>
                                    <li>Use timestamps in log entries</li>
                                    <li>Consider log rotation for large files</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Error Handling</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Always redirect stderr for production scripts</li>
                                    <li>Use `/dev/null` to discard unimportant output</li>
                                    <li>Check exit status after redirections</li>
                                    <li>Log errors with context information</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Performance</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Minimize disk I/O in performance-critical code</li>
                                    <li>Use pipes instead of temporary files when possible</li>
                                    <li>Consider buffering for high-volume output</li>
                                    <li>Use `tee` to split output streams</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Readability</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use `&>` instead of `> file 2>&1` for clarity</li>
                                    <li>Comment complex redirection setups</li>
                                    <li>Use here-documents for multi-line input</li>
                                    <li>Break complex pipelines into steps</li>
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
                                <strong>Think about...</strong>{" "}
                                When would you use{" "}
                                <code>2&gt;&amp;1 | tee file.log</code>{" "}
                                versus{" "}
                                <code>&amp;&gt; file.log</code>?{" "}
                                Consider the difference between seeing output and capturing it.
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Observe carefully...</strong>{" "}
                                The behavior difference between{" "}
                                <code>command &lt; input.txt</code>{" "}
                                and{" "}
                                <code>cat input.txt | command</code>.
                                Which preserves command&apos;s stdin?
                                Which is more efficient?
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Try changing...</strong> A script that uses temporary files for intermediate 
                                results to use pipes instead. How does this affect performance and cleanup?
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
                                `>` overwrites, `>>` appends
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                `2>` redirects stderr, `&>` redirects both
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Order matters: `command > file 2>&1`
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Use here-documents for multi-line input
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
                                Redirection is the Swiss Army knife of shell scripting. In Barrackpore's production systems, 
                                we use redirection for everything from log rotation to data transformation pipelines. 
                                Remember: <strong>Always separate stdout and stderr in production scripts</strong>. 
                                This simple practice has saved us countless debugging hours. Also, `tee` is your friend - 
                                it lets you see what's happening while capturing output to files. For complex redirections, 
                                use file descriptor duplication (`exec 3>&1`) to save and restore streams.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When teaching Abhronila and Tuhina, I emphasize hands-on practice with each operator. 
                                Create a "redirection playground" script that demonstrates each type. Have students predict 
                                what files will contain before running commands. A great exercise: convert a script that 
                                uses temporary files to one that uses pipes and process substitution. Also, teach them 
                                about `set -o noclobber` early - it prevents accidental file overwrites, a common beginner 
                                mistake in Shyamnagar projects.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Production Wisdom</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                In the Ichapur logging infrastructure, we use a combination of `tee` and process substitution 
                                for sophisticated log handling. For example: {`command 2>&1 | tee >(grep ERROR > error.log) | tee >(grep WARN > warn.log) > output.log`}. 
                                This splits the stream multiple ways. Also, remember that {`&>`} in Bash is not POSIX - for 
                                portable scripts in Naihati, use {`> file 2>&1`}. Always test redirection edge cases: what 
                                happens when the output file can't be created? What if disk is full? Handle these gracefully.
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

export default Topic18;