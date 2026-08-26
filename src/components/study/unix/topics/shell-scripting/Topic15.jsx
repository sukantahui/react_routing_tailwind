import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import functionBasicExample1 from "./topic15_files/function_basic_example1.sh?raw";
import functionReturnExample1 from "./topic15_files/function_return_example1.sh?raw";
import functionParametersExample1 from "./topic15_files/function_parameters_example1.sh?raw";
import functionLibraryExample1 from "./topic15_files/function_library_example1.sh?raw";
import functionRecursiveExample1 from "./topic15_files/function_recursive_example1.sh?raw";
import functionErrorExample1 from "./topic15_files/function_error_example1.sh?raw";

const Topic15 = () => {
    const [activeFunctionType, setActiveFunctionType] = useState("basic");
    const [functionOutput, setFunctionOutput] = useState("");
    const [executionStep, setExecutionStep] = useState(0);

    const functionTypes = [
        { 
            id: "basic", 
            name: "Basic Function", 
            description: "Simple function definition and calling",
            syntax: "function_name() { commands; }",
            color: "from-blue-500 to-cyan-600"
        },
        { 
            id: "parameters", 
            name: "With Parameters", 
            description: "Functions that accept arguments",
            syntax: "func() { echo \"$1 $2\"; }",
            color: "from-green-500 to-emerald-600"
        },
        { 
            id: "return", 
            name: "Return Values", 
            description: "Functions that return data",
            syntax: "func() { return 42; }",
            color: "from-purple-500 to-pink-600"
        },
        { 
            id: "library", 
            name: "Function Library", 
            description: "Reusable function collections",
            syntax: "source functions.sh",
            color: "from-orange-500 to-red-600"
        }
    ];

    const executionSteps = [
        { step: 1, description: "Function Definition", code: "greet() { echo \"Hello!\"; }" },
        { step: 2, description: "Function Call", code: "greet" },
        { step: 3, description: "Argument Passing", code: "greet \"Swadeep\"" },
        { step: 4, description: "Return Capture", code: "result=$(get_data)" },
        { step: 5, description: "Exit Status Check", code: "if process_file; then echo \"Success\"; fi" }
    ];

    const simulateExecution = () => {
        if (executionStep < executionSteps.length) {
            const step = executionSteps[executionStep];
            setFunctionOutput(step.code);
            setExecutionStep(executionStep + 1);
        } else {
            setExecutionStep(0);
            setFunctionOutput("");
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
                        Functions: Defining, Calling, and Returning Values
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Master the art of creating reusable, modular code in shell scripts using functions. 
                        Learn to define functions, pass parameters, return values, and build function libraries 
                        for professional script development.
                    </p>
                </div>

                {/* Function Fundamentals */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Function Fundamentals
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Function Prototypes</h3>
                            <div className="space-y-3">
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                    {`# Traditional syntax\nfunction_name() {\n    # Function body\n    commands\n}`}
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                    {`# With function keyword (Bash-specific)\nfunction function_name {\n    # Function body\n    commands\n}`}
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                    {`# One-line function\ngreet() { echo "Hello, $1"; }`}
                                </code>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Key Characteristics</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                                    <div className="font-semibold text-gray-800 dark:text-white mb-1">Return Type</div>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        Exit status (0-255) via `return`, or output via stdout
                                    </div>
                                </div>
                                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                                    <div className="font-semibold text-gray-800 dark:text-white mb-1">Purpose</div>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        Code reuse, modularity, abstraction, organization
                                    </div>
                                </div>
                                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                                    <div className="font-semibold text-gray-800 dark:text-white mb-1">When to Use</div>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        Repeated code blocks, complex operations, reusable utilities
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Execution Flow */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Function Execution Flow</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Execution Steps */}
                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Function Lifecycle</h3>
                                
                                <div className="space-y-2 mb-4">
                                    {executionSteps.map((step, index) => (
                                        <div
                                            key={step.step}
                                            className={clsx(
                                                "p-3 rounded-lg transition-all duration-300 transform",
                                                executionStep > index
                                                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                                                    : "bg-gray-100 dark:bg-gray-700"
                                            )}
                                        >
                                            <div className="flex items-center">
                                                <div className={clsx(
                                                    "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                                    executionStep > index 
                                                        ? "bg-white/30" 
                                                        : "bg-gray-200 dark:bg-gray-600"
                                                )}>
                                                    <span className={clsx(
                                                        "font-bold",
                                                        executionStep > index ? "text-white" : "text-gray-600 dark:text-gray-400"
                                                    )}>
                                                        {step.step}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{step.description}</div>
                                                    <div className="text-sm opacity-80">{step.code}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <button
                                    onClick={simulateExecution}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {executionStep === 0 ? "Start Execution" : 
                                     executionStep === executionSteps.length ? "Reset Simulation" : 
                                     "Next Step"}
                                </button>
                            </div>
                        </div>
                        
                        {/* Function Output */}
                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Function Execution</h3>
                                
                                <div className="mb-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Step:</div>
                                    <div className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {executionStep > 0 ? executionSteps[executionStep - 1]?.description : "Ready to start"}
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Code Being Executed:</div>
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">
                                        {functionOutput || `# Click "Start Execution" to begin\n# the function lifecycle simulation`}
                                    </pre>
                                </div>
                                
                                {executionStep > 0 && (
                                    <div className="mt-4 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">What's Happening:</div>
                                        <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                                            {executionStep >= 1 && <li>✓ Function is defined in memory</li>}
                                            {executionStep >= 2 && <li>✓ Function is invoked (called)</li>}
                                            {executionStep >= 3 && <li>✓ Arguments are passed to function parameters</li>}
                                            {executionStep >= 4 && <li>✓ Return value is captured</li>}
                                            {executionStep >= 5 && <li>✓ Exit status is checked</li>}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Function Types */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Function Types & Patterns</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {functionTypes.map((type, index) => (
                            <button
                                key={type.id}
                                onClick={() => setActiveFunctionType(type.id)}
                                className={clsx(
                                    "p-4 rounded-xl transition-all duration-300 transform hover:scale-105",
                                    activeFunctionType === type.id
                                        ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                                        : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300"
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.6s_ease-out]'
                                }}
                            >
                                <div className="font-semibold mb-1">{type.name}</div>
                                <div className="text-sm mb-2">{type.description}</div>
                                <code className="text-xs opacity-80 bg-black/10 dark:bg-white/10 px-2 py-1 rounded block truncate">
                                    {type.syntax}
                                </code>
                            </button>
                        ))}
                    </div>

                    {/* Function Type Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Parameter Access</h3>
                            <div className="space-y-2">
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    $1, $2, $3... # Positional parameters
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    $@ # All parameters as separate words
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    $* # All parameters as single string
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    $# # Number of parameters
                                </code>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Return Methods</h3>
                            <div className="space-y-2">
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    return 0 # Success exit status
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    echo "data" # Output to stdout
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    global_var="value" # Set global variable
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    printf "%s" "$result" # Controlled output
                                </code>
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
                        {/* Example 1: Basic Function */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Basic Function Definition</h3>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Simple Reuse
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={functionBasicExample1}
                                title="Logging utility for Barrackpore server monitoring"
                                highlightLines={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Swadeep needs consistent logging across multiple scripts 
                                    in the Barrackpore server environment. This function provides a reusable logging utility.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: Return Values */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Function Return Values</h3>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                                    Data Return
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={functionReturnExample1}
                                title="Data processing functions with return values"
                                highlightLines={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Tuhina is processing student grades in Shyamnagar school. 
                                    Functions return calculated values that can be used in further computations.
                                </p>
                            </div>
                        </div>

                        {/* Example 3: Parameters */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Parameter Handling</h3>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    Flexible Input
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={functionParametersExample1}
                                title="File processing with parameter validation"
                                highlightLines={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Abhronila needs to process files with various options 
                                    in the Ichapur data center. Parameters allow flexible function behavior.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Function Techniques */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.8s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Advanced Function Techniques</h2>
                    
                    <div className="space-y-6">
                        {/* Advanced Example */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Function Libraries</h3>
                            <ShellFileLoader
                                fileModule={functionLibraryExample1}
                                title="Reusable function library for Naihati projects"
                                highlightLines={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Professional Tip:</strong> Create function libraries to share common utilities 
                                    across multiple scripts. Use `source` or `.` to include them in your scripts.
                                </p>
                            </div>
                        </div>

                        {/* Recursive Example */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Recursive Functions</h3>
                            <ShellFileLoader
                                fileModule={functionRecursiveExample1}
                                title="Recursive directory traversal for file processing"
                                highlightLines={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Note:</strong> Shell functions can call themselves (recursion), but be cautious 
                                    of infinite recursion and stack limitations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scope and Variable Visibility */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Scope & Variable Visibility</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Local Variables
                            </h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`func() {
    local var="value"  # Local to function
    echo "$var"
}
func
echo "$var"  # Empty - not accessible`}
                            </code>
                            <p className="text-gray-700 dark:text-gray-300">
                                Use `local` keyword to create function-scoped variables that don't affect global scope.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Global Variables
                            </h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3">
{`global_var="outside"

func() {
    global_var="modified"  # Modifies global
    local local_var="temp"
}
func
echo "$global_var"  # "modified"
echo "$local_var"   # Empty`}
                            </code>
                            <p className="text-gray-700 dark:text-gray-300">
                                Variables without `local` keyword are global and can be modified from within functions.
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Best Practice: Avoid Global Side Effects</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Always use `local` for variables inside functions unless you intentionally need to modify 
                            global state. This prevents unexpected side effects and makes functions more predictable 
                            and reusable.
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
                            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">Missing Local Variables</h3>
                            <p className="text-red-700 dark:text-red-300 mb-2">
                                <strong>Problem:</strong> Functions modifying global variables unintentionally
                            </p>
                            <code className="text-sm text-red-800 dark:text-red-300 block bg-red-100 dark:bg-red-900/30 p-3 rounded mb-2">
{`count=0

increment() {
    count=$((count + 1))  # Modifies global count!
}

increment
echo "$count"  # 1 - but maybe unexpected`}
                            </code>
                            <p className="text-red-700 dark:text-red-300">
                                <strong>Solution:</strong> Use `local count` inside the function
                            </p>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Return Value Misunderstanding</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                                <strong>Problem:</strong> Confusing `return` with function output
                            </p>
                            <code className="text-sm text-yellow-800 dark:text-yellow-300 block bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded mb-2">
{`get_data() {
    echo "result"
    return 0
}

# WRONG: This captures exit status, not output
data=$(get_data)
echo "$data"  # Empty`}
                            </code>
                            <p className="text-yellow-700 dark:text-yellow-300">
                                <strong>Solution:</strong> Use `echo` for data, `return` for success/failure
                            </p>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Function Definition Order</h3>
                            <p className="text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Problem:</strong> Calling functions before they're defined
                            </p>
                            <code className="text-sm text-blue-800 dark:text-blue-300 block bg-blue-100 dark:bg-blue-900/30 p-3 rounded mb-2">
{`main() {
    helper  # Error: helper not defined yet
}

helper() {
    echo "Helping..."
}

main  # Will fail`}
                            </code>
                            <p className="text-blue-700 dark:text-blue-300">
                                <strong>Solution:</strong> Define all functions before calling them, or use function libraries
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
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Function Design</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>One function = one responsibility</li>
                                    <li>Keep functions small (under 50 lines)</li>
                                    <li>Use descriptive function names</li>
                                    <li>Document function purpose, parameters, returns</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Parameter Handling</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Validate parameters at function start</li>
                                    <li>Use default values for optional parameters</li>
                                    <li>Shift to handle multiple arguments</li>
                                    <li>Return error codes for invalid input</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Error Handling</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use `set -e` in functions for strict error checking</li>
                                    <li>Return meaningful exit codes</li>
                                    <li>Use `trap` for cleanup in long-running functions</li>
                                    <li>Log errors before returning</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Performance</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Avoid subshells in performance-critical functions</li>
                                    <li>Use function libraries to avoid redefining functions</li>
                                    <li>Consider command grouping for related operations</li>
                                    <li>Profile functions with `time` command</li>
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
                                <strong>Think about...</strong> When should you use `return` vs `echo` in a function? 
                                Consider the difference between exit status and output data.
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Observe carefully...</strong> How variable scope changes when you use `local` 
                                keyword vs when you don't. What happens to variables with the same name in nested functions?
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Try changing...</strong> A function that uses global variables to use only 
                                local variables and parameters. How does this affect reusability and testing?
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
                                Always use `local` for function variables
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Use `echo` for data, `return` for success/failure
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Validate parameters at function start
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Create function libraries for reusable code
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
                                Functions transform shell scripts from simple command sequences into professional software. 
                                In Barrackpore's production systems, we maintain libraries of functions that are reused across 
                                hundreds of scripts. Remember: <strong>A good function should be testable in isolation</strong>. 
                                If you can't test it separately, it's probably doing too much. Also, always include a usage 
                                comment at the top of each function - future maintainers (including yourself) will thank you.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When teaching Debangshu and Abhronila, I emphasize the "extract function" refactoring pattern. 
                                When you see the same code three times, extract it to a function. Start with simple extraction, 
                                then add parameters for flexibility, then handle edge cases. This incremental approach builds 
                                confidence. Also, practice creating "mock" functions for testing - functions that simulate 
                                external dependencies like database calls or file operations.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Production Wisdom</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                In the Shyamnagar deployment pipeline, we use function libraries extensively. Each library 
                                has a specific purpose: logging, configuration parsing, error handling, etc. We source these 
                                libraries at the beginning of scripts. This approach has reduced code duplication by 70% and 
                                made maintenance much easier. Pro tip: Create a `common.sh` library with functions you use 
                                across multiple projects in Naihati. It's a game-changer for productivity.
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

export default Topic15;