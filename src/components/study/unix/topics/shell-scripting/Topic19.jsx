import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import pipeBasicExample1 from "./topic19_files/pipe_basic_example1.sh?raw";
import pipeTextExample1 from "./topic19_files/pipe_text_example1.sh?raw";
import pipeMultiStageExample1 from "./topic19_files/pipe_multi_stage_example1.sh?raw";
import pipeErrorHandlingExample1 from "./topic19_files/pipe_error_handling_example1.sh?raw";
import pipePerformanceExample1 from "./topic19_files/pipe_performance_example1.sh?raw";
import pipeAdvancedExample1 from "./topic19_files/pipe_advanced_example1.sh?raw";

const Topic19 = () => {
    const [activePipeType, setActivePipeType] = useState("basic");
    const [pipelineOutput, setPipelineOutput] = useState("");
    const [currentStage, setCurrentStage] = useState(0);

    const pipeTypes = [
        { 
            id: "basic", 
            name: "Basic Pipe", 
            description: "Simple command chaining",
            syntax: "command1 | command2",
            color: "from-blue-500 to-cyan-600",
            example: "ls | grep .txt"
        },
        { 
            id: "text", 
            name: "Text Processing", 
            description: "Filtering and transforming text",
            syntax: "cat file | grep pattern | sort",
            color: "from-green-500 to-emerald-600",
            example: "cat logs.txt | grep ERROR | sort"
        },
        { 
            id: "multi", 
            name: "Multi-stage", 
            description: "Complex multi-command pipelines",
            syntax: "cmd1 | cmd2 | cmd3 | cmd4",
            color: "from-purple-500 to-pink-600",
            example: "ps aux | grep java | awk '{print $2}' | xargs kill"
        },
        { 
            id: "tee", 
            name: "Tee Pipe", 
            description: "Split pipeline output",
            syntax: "command | tee file | command",
            color: "from-orange-500 to-red-600",
            example: "make | tee build.log | grep -i error"
        },
        { 
            id: "named", 
            name: "Named Pipe", 
            description: "FIFO for process communication",
            syntax: "mkfifo pipe; cmd1 > pipe & cmd2 < pipe",
            color: "from-yellow-500 to-amber-600",
            example: "mkfifo mypipe; producer > mypipe & consumer < mypipe"
        },
        { 
            id: "process", 
            name: "Process Substitution", 
            description: "Treat command output as file",
            syntax: "diff <(cmd1) <(cmd2)",
            color: "from-indigo-500 to-purple-600",
            example: "diff <(sort file1) <(sort file2)"
        }
    ];

    const pipelineStages = [
        { stage: 1, command: "Generate Data", example: "seq 1 100", output: "1\n2\n3\n...\n100" },
        { stage: 2, command: "Filter Data", example: "grep '^[0-9]*[02468]$'", output: "2\n4\n6\n...\n100" },
        { stage: 3, command: "Transform Data", example: "sed 's/$/ bottles/'", output: "2 bottles\n4 bottles\n...\n100 bottles" },
        { stage: 4, command: "Sort Data", example: "sort -n", output: "2 bottles\n4 bottles\n...\n100 bottles" },
        { stage: 5, command: "Limit Output", example: "head -5", output: "2 bottles\n4 bottles\n6 bottles\n8 bottles\n10 bottles" }
    ];

    const simulatePipeline = () => {
        if (currentStage < pipelineStages.length) {
            const stage = pipelineStages[currentStage];
            setPipelineOutput(`Stage ${stage.stage}: ${stage.command}\nCommand: ${stage.example}\n\nOutput:\n${stage.output}`);
            setCurrentStage(currentStage + 1);
        } else {
            setCurrentStage(0);
            setPipelineOutput("");
        }
    };

    const commonPipeCommands = [
        { command: "grep", purpose: "Filter lines matching pattern", example: "cat file | grep 'error'" },
        { command: "sort", purpose: "Sort lines", example: "cat file | sort -n" },
        { command: "uniq", purpose: "Remove duplicate lines", example: "cat file | sort | uniq" },
        { command: "wc", purpose: "Count words/lines/characters", example: "cat file | wc -l" },
        { command: "awk", purpose: "Pattern scanning and processing", example: "cat file | awk '{print $1}'" },
        { command: "sed", purpose: "Stream editor for filtering/transforming", example: "cat file | sed 's/old/new/g'" },
        { command: "tee", purpose: "Split output to file and stdout", example: "command | tee log.txt" },
        { command: "xargs", purpose: "Build and execute command lines", example: "find . -name *.txt | xargs rm" }
    ];

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
                        Pipes: Chaining Commands with |
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Master the art of command chaining using pipes - the Unix philosophy of connecting small, 
                        specialized programs together to perform complex tasks. Learn to build efficient data 
                        processing pipelines that transform, filter, and analyze data streamingly.
                    </p>
                </div>

                {/* Pipe Fundamentals */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        Pipe Fundamentals
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">What is a Pipe?</h3>
                            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    The pipe operator (<code className="font-mono text-blue-600 dark:text-blue-400">|</code>) connects the 
                                    <strong> stdout</strong> of one command to the <strong>stdin</strong> of another command, 
                                    allowing data to flow between commands without temporary files.
                                </p>
                            </div>
                            
                            <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Key Characteristics</h4>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Data flows left to right through the pipeline</li>
                                    <li>Each command runs in its own subshell</li>
                                    <li>Pipes enable stream processing (no intermediate files)</li>
                                    <li>Exit status is of the last command in pipe (by default)</li>
                                    <li>Pipes can be combined with redirection</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Pipe Visualization</h3>
                            <div className="p-4 bg-gray-900 text-gray-100 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-center">
                                        <div className="p-3 bg-blue-600 rounded-lg">
                                            <div className="font-bold">Command 1</div>
                                            <div className="text-sm">stdout →</div>
                                        </div>
                                    </div>
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                    <div className="text-center">
                                        <div className="p-3 bg-green-600 rounded-lg">
                                            <div className="font-bold">Pipe</div>
                                            <div className="text-sm">Data Flow</div>
                                        </div>
                                    </div>
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                    <div className="text-center">
                                        <div className="p-3 bg-purple-600 rounded-lg">
                                            <div className="font-bold">Command 2</div>
                                            <div className="text-sm">← stdin</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <code className="block bg-gray-800 p-3 rounded font-mono">
                                        command1 | command2
                                    </code>
                                    <div className="text-sm text-gray-400 mt-2">
                                        Output of command1 becomes input of command2
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pipe Types */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Pipe Types & Patterns</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {pipeTypes.map((pipe, index) => (
                            <button
                                key={pipe.id}
                                onClick={() => setActivePipeType(pipe.id)}
                                className={clsx(
                                    "p-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-left",
                                    activePipeType === pipe.id
                                        ? `bg-gradient-to-r ${pipe.color} text-white shadow-lg`
                                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300"
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.6s_ease-out]'
                                }}
                            >
                                <div className="font-bold mb-1">{pipe.name}</div>
                                <div className="text-sm mb-2">{pipe.description}</div>
                                <code className="text-xs opacity-80 bg-black/10 dark:bg-white/10 px-2 py-1 rounded block truncate mb-1">
                                    {pipe.syntax}
                                </code>
                                <div className="text-xs opacity-70">{pipe.example}</div>
                            </button>
                        ))}
                    </div>

                    {/* Pipeline Simulation */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Pipeline Stage Simulation</h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Pipeline Stages */}
                            <div className="space-y-4">
                                <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Multi-stage Pipeline</h4>
                                    
                                    <div className="space-y-2 mb-4">
                                        {pipelineStages.map((stage, index) => (
                                            <div
                                                key={stage.stage}
                                                className={clsx(
                                                    "p-3 rounded-lg transition-all duration-300 transform",
                                                    currentStage > index
                                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                                                        : "bg-gray-100 dark:bg-gray-700"
                                                )}
                                            >
                                                <div className="flex items-center">
                                                    <div className={clsx(
                                                        "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                                        currentStage > index 
                                                            ? "bg-white/30" 
                                                            : "bg-gray-200 dark:bg-gray-600"
                                                    )}>
                                                        <span className={clsx(
                                                            "font-bold",
                                                            currentStage > index ? "text-white" : "text-gray-600 dark:text-gray-400"
                                                        )}>
                                                            {stage.stage}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{stage.command}</div>
                                                        <div className="text-sm opacity-80 font-mono">{stage.example}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <button
                                        onClick={simulatePipeline}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {currentStage === 0 ? "Start Pipeline" : 
                                         currentStage === pipelineStages.length ? "Reset Simulation" : 
                                         "Next Stage"}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Pipeline Output */}
                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl">
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Pipeline Execution</h3>
                                    
                                    <div className="mb-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Stage:</div>
                                        <div className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                                            {currentStage > 0 ? pipelineStages[currentStage - 1]?.command : "Ready to start"}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pipeline Output:</div>
                                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono min-h-[200px]">
                                            {pipelineOutput || `# Click "Start Pipeline" to begin\n# the multi-stage pipeline simulation`}
                                        </pre>
                                    </div>
                                    
                                    {currentStage > 0 && (
                                        <div className="mt-4 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Data Flow:</div>
                                            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                                                {currentStage >= 1 && <li>✓ Generated 1-100 with seq</li>}
                                                {currentStage >= 2 && <li>✓ Filtered even numbers with grep</li>}
                                                {currentStage >= 3 && <li>✓ Transformed numbers to text with sed</li>}
                                                {currentStage >= 4 && <li>✓ Sorted numerically with sort</li>}
                                                {currentStage >= 5 && <li>✓ Limited to top 5 with head</li>}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Pipe Commands */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Common Pipe Commands</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {commonPipeCommands.map((cmd, index) => (
                            <div 
                                key={cmd.command}
                                className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.8s_ease-out]'
                                }}
                            >
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                                        <span className="font-bold text-blue-600 dark:text-blue-400">{cmd.command}</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800 dark:text-white">{cmd.command}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{cmd.purpose}</div>
                                    </div>
                                </div>
                                <code className="text-xs text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    {cmd.example}
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
                        {/* Example 1: Basic Pipes */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Basic Pipe Operations</h3>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Foundation
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={pipeBasicExample1}
                                title="System monitoring pipeline in Barrackpore"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Swadeep needs to monitor system resources in Barrackpore. 
                                    Pipes allow chaining multiple commands to extract and format relevant information.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: Text Processing */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Text Processing Pipeline</h3>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    Data Analysis
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={pipeTextExample1}
                                title="Log analysis pipeline for Shyamnagar servers"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Tuhina analyzes server logs in Shyamnagar. 
                                    Pipes transform raw log data into meaningful statistics and reports.
                                </p>
                            </div>
                        </div>

                        {/* Example 3: Multi-stage Pipeline */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Multi-stage Processing</h3>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                                    Complex Processing
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={pipeMultiStageExample1}
                                title="Data processing pipeline for Ichapur analytics"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Abhronila processes analytics data in Ichapur. 
                                    Multi-stage pipes clean, transform, and analyze data in a single command.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Pipe Techniques */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.8s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Advanced Pipe Techniques</h2>
                    
                    <div className="space-y-6">
                        {/* Example 1: Error Handling */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Pipe Error Handling</h3>
                            <ShellFileLoader
                                fileModule={pipeErrorHandlingExample1}
                                title="Error handling in Naihati deployment pipelines"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Professional Tip:</strong> Use `set -o pipefail` to detect errors in any 
                                    stage of a pipeline, not just the last command.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: Performance */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Performance Considerations</h3>
                            <ShellFileLoader
                                fileModule={pipePerformanceExample1}
                                title="Optimizing pipeline performance for large datasets"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Note:</strong> Pipes process data streamingly, but some commands 
                                    (like `sort`) need all data before producing output.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pipe vs Temporary Files */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Pipes vs Temporary Files</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Using Pipes
                            </h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`# Process data without intermediate files
cat large_file.txt | \
    grep "pattern" | \
    sort | \
    uniq -c | \
    sort -nr | \
    head -10`}
                            </code>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300">No disk I/O for intermediate results</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300">Stream processing (memory efficient)</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300">Cleaner, more readable code</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Using Temporary Files
                            </h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`# Process data with intermediate files
cat large_file.txt > tmp1
grep "pattern" tmp1 > tmp2
sort tmp2 > tmp3
uniq -c tmp3 > tmp4
sort -nr tmp4 > tmp5
head -10 tmp5
# Cleanup
rm tmp1 tmp2 tmp3 tmp4 tmp5`}
                            </code>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300">Disk I/O overhead</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300">Need cleanup to avoid disk filling</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300">More verbose code</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">When to Use Each</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Use Pipes When:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Processing data sequentially</li>
                                    <li>Working with streamable data</li>
                                    <li>Performance is important</li>
                                    <li>Want cleaner code</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Use Files When:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Need to reuse intermediate results</li>
                                    <li>Commands need random access to data</li>
                                    <li>Debugging intermediate steps</li>
                                    <li>Piping is not possible</li>
                                </ul>
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
                            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">Variable Scope in Pipelines</h3>
                            <p className="text-red-700 dark:text-red-300 mb-2">
                                <strong>Problem:</strong> Each command in a pipeline runs in a subshell
                            </p>
                            <code className="text-sm text-red-800 dark:text-red-300 block bg-red-100 dark:bg-red-900/30 p-3 rounded mb-2">
{`count=0
seq 10 | while read num; do
    count=$((count + num))
done
echo "Total: $count"  # Prints 0!`}
                            </code>
                            <p className="text-red-700 dark:text-red-300">
                                <strong>Solution:</strong> Avoid pipelines for variable accumulation, or use process substitution
                            </p>
                            <code className="text-sm text-green-800 dark:text-green-300 block bg-green-100 dark:bg-green-900/30 p-3 rounded">
{`count=0
while read num; do
    count=$((count + num))
done < <(seq 10)
echo "Total: $count"  # Correct: 55`}
                            </code>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Pipe Error Detection</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                                <strong>Problem:</strong> By default, only last command's exit status matters
                            </p>
                            <code className="text-sm text-yellow-800 dark:text-yellow-300 block bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded mb-2">
{`# If grep fails but wc succeeds, pipeline returns 0
grep "pattern" file.txt | wc -l
echo $?  # 0 even if pattern not found`}
                            </code>
                            <p className="text-yellow-700 dark:text-yellow-300">
                                <strong>Solution:</strong> Use `set -o pipefail` or check `PIPESTATUS` array
                            </p>
                            <code className="text-sm text-green-800 dark:text-green-300 block bg-green-100 dark:bg-green-900/30 p-3 rounded">
{`set -o pipefail
grep "pattern" file.txt | wc -l
echo $?  # Non-zero if any command fails
# Or check individual commands
grep "pattern" file.txt | wc -l
echo "\${PIPESTATUS[@]}"  # Shows [grep_exit, wc_exit]`}
                            </code>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Performance with sort</h3>
                            <p className="text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Problem:</strong> `sort` needs all input before producing output
                            </p>
                            <code className="text-sm text-blue-800 dark:text-blue-300 block bg-blue-100 dark:bg-blue-900/30 p-3 rounded mb-2">
{`# sort buffers all data, loses streaming benefits
generate_large_data | sort | process_stream`}
                            </code>
                            <p className="text-blue-700 dark:text-blue-300">
                                <strong>Solution:</strong> Consider alternatives or use sort early in small datasets
                            </p>
                            <code className="text-sm text-green-800 dark:text-green-300 block bg-green-100 dark:bg-green-900/30 p-3 rounded">
{`# Filter first, then sort smaller dataset
generate_large_data | grep "interesting" | sort | process_stream
# Or use temporary file for huge datasets
generate_large_data > tmpfile
sort tmpfile | process_stream
rm tmpfile`}
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
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Pipeline Design</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Filter early to reduce data volume</li>
                                    <li>Put memory-intensive commands (sort) after filtering</li>
                                    <li>Use `tee` for debugging intermediate results</li>
                                    <li>Break long pipelines for readability</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Error Handling</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use `set -o pipefail` in production scripts</li>
                                    <li>Check `PIPESTATUS` array for debugging</li>
                                    <li>Handle pipe failures gracefully</li>
                                    <li>Log errors from each pipeline stage</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Performance</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Avoid unnecessary commands in pipelines</li>
                                    <li>Use streaming commands when possible</li>
                                    <li>Consider parallel processing for CPU-bound tasks</li>
                                    <li>Profile pipelines with `time` command</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Readability</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use line continuation for long pipelines</li>
                                    <li>Comment complex pipeline logic</li>
                                    <li>Use meaningful command options</li>
                                    <li>Test pipelines with sample data</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Examples */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.6s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Advanced Pipeline Examples</h2>
                    
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Complex Data Processing</h3>
                            <ShellFileLoader
                                fileModule={pipeAdvancedExample1}
                                title="Advanced pipeline patterns for production analytics"
                                highlightLines={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Professional Tip:</strong> Combine pipes with process substitution, 
                                    command grouping, and parallel processing for complex data workflows.
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
                                <strong>Think about...</strong> When should you break a long pipeline into multiple 
                                steps with intermediate files? Consider trade-offs between performance, debuggability, 
                                and maintainability.
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Observe carefully...</strong> The difference between `command | tee file` and 
                                `command > file`. When would you use each, and how do they affect pipeline flow?
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Try changing...</strong> A pipeline that uses `xargs` to one that uses `while read` 
                                loops. What are the performance implications and error handling differences?
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
                                Pipes connect stdout to stdin
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Each pipe command runs in a subshell
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Use `set -o pipefail` for error detection
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Filter early in pipelines for performance
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
                                Pipes embody the Unix philosophy: small tools that do one thing well, connected together. 
                                In Barrackpore's data processing systems, we build pipelines that handle terabytes of data 
                                daily. Remember: <strong>The most efficient pipeline is one that processes the least data</strong>. 
                                Always filter as early as possible. Also, `tee` is invaluable for debugging - it lets you 
                                see what's flowing through the pipe without breaking it. For complex pipelines in Shyamnagar, 
                                we use named pipes (`mkfifo`) when we need bidirectional communication between processes.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When teaching Debangshu and Abhronila, I start with simple two-command pipes and gradually 
                                add complexity. Have students predict what each stage will produce before running the pipeline. 
                                A great exercise: take a problem that would normally require a Python script and solve it 
                                with shell pipes. This teaches the power of composition. Also, emphasize `set -o pipefail` 
                                early - it prevents silent failures that are common in pipeline debugging in Naihati projects.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Performance Wisdom</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                In the Ichapur analytics pipeline, we process millions of records per hour. The key insight: 
                                <strong>buffer size matters</strong>. By default, pipes have 64KB buffers. For high-volume 
                                data, we increase this with `ulimit -p`. Also, avoid `sort` in the middle of pipelines 
                                when possible - it breaks streaming. Instead, filter first, then sort the reduced dataset. 
                                For parallel processing, we use `xargs -P` or GNU parallel with pipes. This can dramatically 
                                improve throughput for CPU-bound tasks.
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

export default Topic19;