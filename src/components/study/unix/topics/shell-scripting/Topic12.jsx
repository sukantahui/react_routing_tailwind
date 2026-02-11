import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import fileTestExample1 from "./topic12_files/file_test_example1.sh?raw";
import fileTestExample2 from "./topic12_files/file_test_example2.sh?raw";
import fileTestExample3 from "./topic12_files/file_test_example3.sh?raw";
import fileTestExample4 from "./topic12_files/file_test_example4.sh?raw";
import fileTestExample5 from "./topic12_files/file_test_example5.sh?raw";
import fileTestExample6 from "./topic12_files/file_test_example6.sh?raw";

const Topic12 = () => {
    const [activeTest, setActiveTest] = useState("f");

    const testOperators = [
        { operator: "-f", name: "Regular File", description: "Tests if the path exists and is a regular file" },
        { operator: "-d", name: "Directory", description: "Tests if the path exists and is a directory" },
        { operator: "-e", name: "Exists", description: "Tests if the path exists (file or directory)" },
        { operator: "-s", name: "Non-empty", description: "Tests if the file exists and has size greater than 0" },
        { operator: "-r", name: "Readable", description: "Tests if the file exists and is readable" },
        { operator: "-w", name: "Writable", description: "Tests if the file exists and is writable" },
        { operator: "-x", name: "Executable", description: "Tests if the file exists and is executable" },
        { operator: "-L", name: "Symbolic Link", description: "Tests if the path exists and is a symbolic link" },
        { operator: "-O", name: "Owned by User", description: "Tests if the file exists and is owned by the current user" },
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
                        File and Directory Tests: -f, -d, -e, -s
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Learn how to check file types, permissions, and existence in shell scripts using test operators.
                        Essential for robust script writing that handles filesystem operations safely.
                    </p>
                </div>

                {/* Overview Card */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.0s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Test Operator Prototype
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-700 dark:text-gray-300">Signature</h3>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                {`test -f filename`}
                            </code>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                {`[ -f filename ]`}
                            </code>
                            <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-700 p-3 rounded">
                                {`[[ -f filename ]]`}
                            </code>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-700 dark:text-gray-300">Return Type</h3>
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                                <span className="text-green-600 dark:text-green-400 font-mono">Exit Status 0:</span>
                                <span className="text-gray-700 dark:text-gray-300 ml-2">Test condition is TRUE</span>
                            </div>
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                                <span className="text-red-600 dark:text-red-400 font-mono">Exit Status 1:</span>
                                <span className="text-gray-700 dark:text-gray-300 ml-2">Test condition is FALSE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Test Operators Grid */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.2s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Common Test Operators
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {testOperators.map((test, index) => (
                            <button
                                key={test.operator}
                                onClick={() => setActiveTest(test.operator)}
                                className={clsx(
                                    "p-4 rounded-xl transition-all duration-300 transform hover:scale-105",
                                    activeTest === test.operator
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300"
                                )}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animation: 'motion-safe:animate-[fadeInUp_0.6s_ease-out]'
                                }}
                            >
                                <div className="font-mono text-lg font-bold mb-1">{test.operator}</div>
                                <div className="font-medium">{test.name}</div>
                                <div className="text-sm opacity-90">{test.description}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Detailed Explanation */}
                <div 
                    className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Detailed Explanation</h2>
                    
                    <div className="space-y-6">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Purpose</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                File and directory test operators allow shell scripts to check file system objects before 
                                performing operations on them. This prevents errors when files don't exist, aren't readable, 
                                or aren't the expected type.
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">When & Why to Use</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Before reading from a file to ensure it exists and is readable</li>
                                <li>Before writing to a file to check permissions or create parent directories</li>
                                <li>In backup scripts to verify source files before copying</li>
                                <li>In installation scripts to check for existing configurations</li>
                                <li>To validate user input that represents file paths</li>
                            </ul>
                        </div>

                        {/* Visual Explanation */}
                        <div className="relative p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Decision Flow</h3>
                            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                                <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                                    <div className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">-f</div>
                                    <div className="text-sm">Regular File</div>
                                </div>
                                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                                    <div className="font-mono text-lg font-bold text-green-600 dark:text-green-400">-d</div>
                                    <div className="text-sm">Directory</div>
                                </div>
                                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                                    <div className="font-mono text-lg font-bold text-red-600 dark:text-red-400">-e</div>
                                    <div className="text-sm">Exists Check</div>
                                </div>
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
                        {/* Example 1 */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Basic File Check</h3>
                            <ShellFileLoader
                                fileModule={fileTestExample1}
                                title="Checking configuration file exists"
                                highlightLines={[3, 4, 5]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Abhronila is writing a script that needs to read configuration 
                                    from <code className="text-sm">config.json</code> in Barrackpore. This check prevents errors if the file is missing.
                                </p>
                            </div>
                        </div>

                        {/* Example 2 */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Directory Creation with Check</h3>
                            <ShellFileLoader
                                fileModule={fileTestExample2}
                                title="Safe directory creation"
                                highlightLines={[3, 4, 5, 6]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Debangshu needs to create a backup directory in Ichapur. 
                                    This check avoids overwriting existing backups and ensures the directory is created only if needed.
                                </p>
                            </div>
                        </div>

                        {/* Example 3 */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">File Size Check</h3>
                            <ShellFileLoader
                                fileModule={fileTestExample3}
                                title="Processing only non-empty files"
                                highlightLines={[3, 4, 5]}
                            />
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> Tuhina is processing log files from Shyamnagar. 
                                    The <code className="text-sm">-s</code> test ensures empty log files are skipped.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Examples */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_1.8s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Advanced Usage Patterns</h2>
                    
                    <div className="space-y-8">
                        {/* Example 4 */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Multiple Condition Tests</h3>
                            <ShellFileLoader
                                fileModule={fileTestExample4}
                                title="Complex file validation"
                                highlightLines={[3, 4, 5, 6, 7]}
                            />
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Professional Tip:</strong> Combine multiple tests using <code className="text-sm">&&</code> (AND) 
                                    and <code className="text-sm">||</code> (OR) for comprehensive validation.
                                </p>
                            </div>
                        </div>

                        {/* Example 5 */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Check File Permissions</h3>
                            <ShellFileLoader
                                fileModule={fileTestExample5}
                                title="Permission validation before execution"
                                highlightLines={[3, 4, 5, 6, 7, 8]}
                            />
                        </div>

                        {/* Example 6 */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-medium text-gray-800 dark:text-white">Symbolic Link Handling</h3>
                            <ShellFileLoader
                                fileModule={fileTestExample6}
                                title="Dealing with symbolic links"
                                highlightLines={[3, 4, 5, 6, 7, 8]}
                            />
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
                        Common Pitfalls
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">Beginner Mistakes</h3>
                            <ul className="list-disc pl-5 space-y-2 text-red-700 dark:text-red-300">
                                <li>Forgetting spaces around brackets: <code className="text-sm">[-f file]</code> vs <code className="text-sm">[ -f file ]</code></li>
                                <li>Using <code className="text-sm">-e</code> when you really need <code className="text-sm">-f</code> or <code className="text-sm">-d</code></li>
                                <li>Not quoting variables: <code className="text-sm">[ -f $FILE ]</code> fails if $FILE has spaces</li>
                                <li>Confusing <code className="text-sm">-s</code> (size) with success checks</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Misconceptions</h3>
                            <ul className="list-disc pl-5 space-y-2 text-yellow-700 dark:text-yellow-300">
                                <li><code className="text-sm">-e</code> returns true for broken symbolic links</li>
                                <li><code className="text-sm">-s</code> checks for size &gt; 0, not just existence</li>
                                <li>Permission tests check effective user permissions, not file mode bits</li>
                                <li>Tests don't follow symbolic links by default (use <code className="text-sm">-h</code> or <code className="text-sm">-L</code>)</li>
                            </ul>
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
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Coding Standards</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Always quote variables: <code className="text-sm">[ -f "$FILE" ]</code></li>
                                    <li>Use <code className="text-sm">[[ ]]</code> for Bash scripts (safer with patterns)</li>
                                    <li>Use <code className="text-sm">[ ]</code> for POSIX compatibility</li>
                                    <li>Prefer explicit tests over implicit: <code className="text-sm">-f</code> over just <code className="text-sm">-e</code></li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Readability</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Add comments explaining why a test is needed</li>
                                    <li>Use meaningful variable names: <code className="text-sm">config_file</code> not <code className="text-sm">f</code></li>
                                    <li>Group related tests with logical operators</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Maintainability</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Define test conditions as variables for reuse</li>
                                    <li>Create helper functions for complex validations</li>
                                    <li>Log test results for debugging</li>
                                    <li>Handle edge cases (spaces, special characters)</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Beginner-Safe Habits</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Test scripts with both existing and missing files</li>
                                    <li>Use <code className="text-sm">set -u</code> to catch unset variables</li>
                                    <li>Validate all user-provided paths</li>
                                    <li>Provide clear error messages when tests fail</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hint Section */}
                <div 
                    className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                        animation: 'motion-safe:animate-[fadeInUp_2.4s_ease-out]'
                    }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Thinking Points
                    </h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Think about...</strong> What happens when you test a symbolic link with <code className="text-sm">-f</code>? 
                                Does it test the link itself or the target?
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Observe carefully...</strong> The difference between <code className="text-sm">[ -e broken_link ]</code> 
                                and <code className="text-sm">[ -L broken_link ]</code> when the link target is missing.
                            </p>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300 italic">
                                <strong>Try changing...</strong> A test from <code className="text-sm">[ ]</code> to <code className="text-sm">[[ ]]</code> 
                                and see how it handles variables with spaces without quotes.
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
                            <span className="text-gray-700 dark:text-gray-300">Always quote variables in tests</span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">Use <code className="text-sm">-f</code> for files, <code className="text-sm">-d</code> for directories</span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300"><code className="text-sm">-e</code> checks existence, <code className="text-sm">-s</code> checks size</span>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">Test permissions before file operations</span>
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
                                File tests are the <strong>gatekeepers</strong> of robust shell scripts. In production systems 
                                at Naihati, I've seen scripts fail because developers assumed files existed. Always validate 
                                before you operate. Remember: <code className="text-sm">-f</code> and <code className="text-sm">-d</code> 
                                are more specific than <code className="text-sm">-e</code> - use them when you know the expected type.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When teaching Swadeep and Abhronila, I emphasize: "Test early, fail gracefully." Create test 
                                scripts that deliberately use missing files, broken permissions, and empty files. This builds 
                                defensive scripting habits that prevent production outages.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Remember This</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                <code className="text-sm">[[ ]]</code> is Bash-specific but safer. <code className="text-sm">[ ]</code> 
                                is POSIX but requires careful quoting. Choose based on your script's portability requirements. 
                                For internal tools at Barrackpore, I use <code className="text-sm">[[ ]]</code>. For distribution, 
                                I stick with <code className="text-sm">[ ]</code>.
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

export default Topic12;