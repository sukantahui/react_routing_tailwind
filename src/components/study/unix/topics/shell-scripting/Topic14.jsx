import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import caseSimpleExample1 from "./topic14_files/case_simple_example1.sh?raw";
import casePatternExample1 from "./topic14_files/case_pattern_example1.sh?raw";
import caseMenuExample1 from "./topic14_files/case_menu_example1.sh?raw";
import caseFileTypeExample1 from "./topic14_files/case_file_type_example1.sh?raw";
import caseAdvancedExample1 from "./topic14_files/case_advanced_example1.sh?raw";
import caseErrorHandlingExample1 from "./topic14_files/case_error_handling_example1.sh?raw";

const Topic14 = () => {
    const [activeCase, setActiveCase] = useState("simple");
    const [selectedOption, setSelectedOption] = useState("");
    const [menuOutput, setMenuOutput] = useState("");

    const caseExamples = [
        { 
            id: "simple", 
            name: "Simple Case", 
            description: "Basic pattern matching with literals",
            useCase: "Menu options, status codes, simple matching",
            color: "from-blue-500 to-cyan-600"
        },
        { 
            id: "pattern", 
            name: "Pattern Matching", 
            description: "Wildcards and glob patterns in cases",
            useCase: "File extensions, partial matches, ranges",
            color: "from-green-500 to-emerald-600"
        },
        { 
            id: "menu", 
            name: "Menu-Driven", 
            description: "Complete interactive menu systems",
            useCase: "CLI tools, configuration menus, user interfaces",
            color: "from-purple-500 to-pink-600"
        },
        { 
            id: "nested", 
            name: "Nested Cases", 
            description: "Case statements within cases",
            useCase: "Complex decision trees, multi-level menus",
            color: "from-orange-500 to-red-600"
        }
    ];

    const menuOptions = [
        { value: "1", label: "View System Status", description: "Check CPU, memory, and disk usage" },
        { value: "2", label: "Backup Files", description: "Create backup of important files" },
        { value: "3", label: "Update System", description: "Check for and install updates" },
        { value: "4", label: "View Logs", description: "Display system log files" },
        { value: "q", label: "Quit", description: "Exit the program" }
    ];

    const handleMenuSelection = (value) => {
        setSelectedOption(value);
        
        switch(value) {
            case "1":
                setMenuOutput("✓ System Status:\n  CPU: 24%  Memory: 3.2G/16G  Disk: 45%\n  All systems normal in Barrackpore server.");
                break;
            case "2":
                setMenuOutput("✓ Starting backup...\n  Backing up /home/students/projects/\n  Backup saved to /backups/2024-01-15/");
                break;
            case "3":
                setMenuOutput("✓ Checking for updates...\n  5 packages available for update.\n  Run 'sudo apt upgrade' to install.");
                break;
            case "4":
                setMenuOutput("✓ Recent log entries:\n  [INFO] User login: Swadeep\n  [INFO] Backup completed\n  [WARN] High memory usage at 22:00");
                break;
            case "q":
                setMenuOutput("✗ Exiting system management tool.\n  Thank you for using the Barrackpore Server Manager.");
                break;
            default:
                setMenuOutput("✗ Invalid selection. Please choose a valid option.");
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
                        Case Statement for Menu-Driven Programs
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Master the powerful `case` statement for creating clean, readable, and maintainable menu-driven interfaces in shell scripts.
                        Learn pattern matching, fall-through logic, and professional menu design patterns.
                    </p>
                </div>

                {/* Case Statement Overview */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Case Statement Prototype
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Basic Syntax</h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-700 p-4 rounded">
{`case "$variable" in
    pattern1)
        # Commands for pattern1
        ;;
    pattern2)
        # Commands for pattern2
        ;;
    pattern3|pattern4)
        # Commands for pattern3 OR pattern4
        ;;
    *)
        # Default case (catch-all)
        ;;
esac`}
                            </code>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Key Characteristics</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                                    <div className="font-semibold text-gray-800 dark:text-white mb-1">Return Type</div>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        Exit status of last executed command in matched case
                                    </div>
                                </div>
                                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                                    <div className="font-semibold text-gray-800 dark:text-white mb-1">Purpose</div>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        Multi-way branching based on pattern matching
                                    </div>
                                </div>
                                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                                    <div className="font-semibold text-gray-800 dark:text-white mb-1">When to Use</div>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        Menu systems, command dispatch, status code handling
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Menu Demo */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Interactive Menu Demo</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Menu Selection Panel */}
                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">System Management Menu</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Select an option to see the case statement in action:
                                </p>
                                
                                <div className="space-y-2">
                                    {menuOptions.map((option, index) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleMenuSelection(option.value)}
                                            className={clsx(
                                                "w-full p-4 rounded-lg transition-all duration-300 text-left transform hover:scale-[1.02]",
                                                selectedOption === option.value
                                                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg"
                                                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                            )}
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                                animation: 'motion-safe:animate-[fadeInUp_0.8s_ease-out]'
                                            }}
                                        >
                                            <div className="flex items-center">
                                                <div className={clsx(
                                                    "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                                    selectedOption === option.value 
                                                        ? "bg-white/30" 
                                                        : option.value === "q" 
                                                            ? "bg-red-100 dark:bg-red-900/30" 
                                                            : "bg-blue-100 dark:bg-blue-900/30"
                                                )}>
                                                    <span className={clsx(
                                                        "font-bold",
                                                        selectedOption === option.value 
                                                            ? "text-white" 
                                                            : option.value === "q" 
                                                                ? "text-red-600 dark:text-red-400" 
                                                                : "text-blue-600 dark:text-blue-400"
                                                    )}>
                                                        {option.value}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{option.label}</div>
                                                    <div className="text-sm opacity-80">{option.description}</div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Output Display */}
                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Case Statement Execution</h3>
                                
                                <div className="mb-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Selected Option:</div>
                                    <div className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {selectedOption ? `"${selectedOption}"` : "None selected"}
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Case Statement Output:</div>
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono">
{`case "$selected_option" in
    ${selectedOption ? `${selectedOption})` : "    # Waiting for selection..."}
        ${menuOutput || "        # Output will appear here..."}
    ${selectedOption ? "    ;;" : ""}
esac`}
                                    </pre>
                                </div>
                                
                                {menuOutput && (
                                    <div className="mt-4 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Actual Output:</div>
                                        <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                            {menuOutput}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Case Patterns */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Pattern Matching Capabilities</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {caseExamples.map((example, index) => (
                            <button
                                key={example.id}
                                onClick={() => setActiveCase(example.id)}
                                className={clsx(
                                    "p-4 rounded-xl transition-all duration-300 transform hover:scale-105",
                                    activeCase === example.id
                                        ? `bg-gradient-to-r ${example.color} text-white shadow-lg`
                                        : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300"
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.6s_ease-out]'
                                }}
                            >
                                <div className="font-semibold mb-1">{example.name}</div>
                                <div className="text-sm mb-2">{example.description}</div>
                                <div className="text-xs opacity-80 bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                                    {example.useCase}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Pattern Examples */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Common Patterns</h3>
                            <div className="space-y-2">
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    "start"|"begin") # Exact match for start OR begin
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    [Yy]|[Yy][Ee][Ss]) # Case-insensitive yes
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    *.txt) # All .txt files
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    [0-9]) # Single digit 0-9
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    [a-zA-Z]*) # Starts with letter
                                </code>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Advanced Patterns</h3>
                            <div className="space-y-2">
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    ???) # Exactly three characters
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    [[:digit:]]) # POSIX character class for digits
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    *[!0-9]*) # Contains non-digit
                                </code>
                                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    @(opt1|opt2)) # Extended glob: opt1 OR opt2
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
                        {/* Example 1: Simple Case */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Simple Menu System</h3>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Basic Menu
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={caseSimpleExample1}
                                title="Student grade management system for Barrackpore school"
                                highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Swadeep needs to create a simple menu for managing student grades 
                                    in the Barrackpore school system. The case statement handles each menu option cleanly.
                                </p>
                            </div>
                        </div>

                        {/* Example 2: Pattern Matching */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">File Type Handler</h3>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    Pattern Matching
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={caseFileTypeExample1}
                                title="Process different file types in Shyamnagar data center"
                                highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Tuhina is processing various file types in the Shyamnagar data center. 
                                    The case statement uses pattern matching to handle different file extensions appropriately.
                                </p>
                            </div>
                        </div>

                        {/* Example 3: Complete Menu System */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Complete CLI Tool</h3>
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                                    Production Ready
                                </span>
                            </div>
                            <ShellFileLoader
                                fileModule={caseMenuExample1}
                                title="System administration tool for Ichapur servers"
                                highlightLines={[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Debangshu manages multiple servers in Ichapur and needs a robust 
                                    administration tool. This case statement handles commands, subcommands, and help text.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Usage */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.8s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Advanced Case Statement Techniques</h2>
                    
                    <div className="space-y-6">
                        {/* Advanced Example */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Complex Decision Tree</h3>
                            <ShellFileLoader
                                fileModule={caseAdvancedExample1}
                                title="Nested case statements for multi-level menus"
                                highlightLines={[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Professional Tip:</strong> Nested case statements allow for complex menu hierarchies. 
                                    However, consider extracting deeply nested logic into functions for better readability.
                                </p>
                            </div>
                        </div>

                        {/* Error Handling Example */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Robust Error Handling</h3>
                            <ShellFileLoader
                                fileModule={caseErrorHandlingExample1}
                                title="Comprehensive error handling with case statements"
                                highlightLines={[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Best Practice:</strong> Always include a default case (`*`)`) to handle unexpected inputs gracefully. 
                                    This prevents scripts from failing silently.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Case vs If Comparison */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Case vs If-Else: When to Use Which</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Use Case Statement When...
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Matching against multiple exact strings</li>
                                <li>Working with simple patterns/wildcards</li>
                                <li>Creating menu-driven interfaces</li>
                                <li>Dispatching commands based on input</li>
                                <li>Code needs to be readable and maintainable</li>
                                <li>Pattern matching is required</li>
                            </ul>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Use If-Else When...
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Testing complex boolean conditions</li>
                                <li>Comparing numeric values</li>
                                <li>Checking file attributes/permissions</li>
                                <li>Need arithmetic comparisons</li>
                                <li>Testing multiple unrelated conditions</li>
                                <li>Need to execute commands in conditions</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Rule of Thumb</h4>
                        <p className="text-gray-700 dark:text-gray-300">
                            If you have 3 or more `elif` statements checking the same variable against different values, 
                            you should probably use a `case` statement instead. Case statements are generally more readable 
                            for string/pattern matching scenarios.
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
                            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">Forgot Double Semicolons</h3>
                            <p className="text-red-700 dark:text-red-300 mb-2">
                                <strong>Problem:</strong> Missing `;;` causes fall-through to next case
                            </p>
                            <code className="text-sm text-red-800 dark:text-red-300 block bg-red-100 dark:bg-red-900/30 p-3 rounded mb-2">
{`case "$choice" in
    "1")
        echo "Option 1"  # Missing ;;
    "2")
        echo "Option 2"
        ;;
esac`}
                            </code>
                            <p className="text-red-700 dark:text-red-300">
                                <strong>Solution:</strong> Always terminate each case with `;;` (except the last if using `*`))
                            </p>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Pattern Order Issues</h3>
                            <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                                <strong>Problem:</strong> More specific patterns after wildcards never match
                            </p>
                            <code className="text-sm text-yellow-800 dark:text-yellow-300 block bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded mb-2">
{`case "$file" in
    *)           # This matches everything!
        echo "Wildcard"
        ;;
    *.txt)
        echo "Text file"  # Never reached
        ;;
esac`}
                            </code>
                            <p className="text-yellow-700 dark:text-yellow-300">
                                <strong>Solution:</strong> Place more specific patterns before wildcards
                            </p>
                        </div>

                        <div className="p-4 bg-white/70 dark:bg-gray-700/70 rounded-lg">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Unquoted Variables</h3>
                            <p className="text-blue-700 dark:text-blue-300 mb-2">
                                <strong>Problem:</strong> Unquoted variables cause word splitting
                            </p>
                            <code className="text-sm text-blue-800 dark:text-blue-300 block bg-blue-100 dark:bg-blue-900/30 p-3 rounded mb-2">
{`case $input in  # Should be "$input"
    "pattern")
        echo "Matched"
        ;;
esac`}
                            </code>
                            <p className="text-blue-700 dark:text-blue-300">
                                <strong>Solution:</strong> Always quote variables in case statements
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
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Readability</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Use consistent indentation (4 spaces per level)</li>
                                    <li>Align closing `esac` with opening `case`</li>
                                    <li>Comment complex pattern logic</li>
                                    <li>Keep case bodies short (extract to functions if long)</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Maintainability</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Always include a default case (`*`))</li>
                                    <li>Group related patterns together</li>
                                    <li>Use variables for repeated patterns</li>
                                    <li>Order patterns from specific to general</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Safety</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Always quote the tested variable</li>
                                    <li>Validate input before case statement when possible</li>
                                    <li>Handle errors within each case</li>
                                    <li>Use `exit` codes appropriately in cases</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Performance</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Case statements are generally faster than long if-elif chains</li>
                                    <li>Order frequently matched patterns first</li>
                                    <li>Avoid expensive commands in patterns</li>
                                    <li>Consider using functions for complex case bodies</li>
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
                                <strong>Think about...</strong> How would you handle case-insensitive menu options? 
                                Consider both the pattern approach and transforming the input before the case statement.
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Observe carefully...</strong> The difference between `*.txt` and `.*.txt` patterns. 
                                Which one matches "report.txt" and which one matches ".hidden.txt"?
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Try changing...</strong> A case statement that uses `break` in some cases to use `;;` instead. 
                                What's the difference in behavior, and when would you use each?
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
                                Always quote the variable: <code className="text-sm">"$choice"</code>
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                End each case with <code className="text-sm">;;</code> (except last with `*`))
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Use `*`)) as default case to handle unexpected input
                            </span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                                Order patterns from specific to general
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
                                The case statement is one of the most underutilized features in shell scripting. In production 
                                systems across Naihati and Ichapur, I've replaced miles of if-elif chains with clean case statements, 
                                reducing bugs by 40%. Remember: <strong>case statements are for pattern matching, not complex logic</strong>. 
                                If you find yourself putting lots of logic in a case body, extract it to a function.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When teaching Abhronila and Tuhina, I emphasize starting with simple exact matches before moving to 
                                patterns. Create a "pattern playground" script where they can test different patterns against various 
                                inputs. This hands-on approach helps internalize how `*`, `?`, and character classes work. Also, 
                                practice converting if-elif chains to case statements - it's an excellent exercise in code refactoring.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Production Wisdom</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                In the Barrackpore server management system, we use case statements for command dispatch. 
                                Each command handler is a separate function, and the case statement just calls the appropriate 
                                function. This separation makes the code testable and maintainable. Also, always log which 
                                case was matched - it's invaluable for debugging production issues in Shyamnagar.
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

export default Topic14;