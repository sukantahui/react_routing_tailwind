import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import raw shell script files
import commonMistakesDemo from "./topic22_files/common_mistakes_demo.sh?raw";
import debuggingTechniques from "./topic22_files/debugging_techniques.sh?raw";
import regexMistakes from "./topic22_files/regex_mistakes.sh?raw";
import quotingIssues from "./topic22_files/quoting_issues.sh?raw";
import pipelineDebugging from "./topic22_files/pipeline_debugging.sh?raw";

const Topic22 = () => {
    return (
        <div className="dark min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 p-4 md:p-8">
            <style>
                {`
                @keyframes fadeSlideUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shakeError {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    25% {
                        transform: translateX(-5px);
                    }
                    75% {
                        transform: translateX(5px);
                    }
                }
                
                @keyframes flashWarning {
                    0%, 100% {
                        background-color: transparent;
                    }
                    50% {
                        background-color: rgba(245, 158, 11, 0.2);
                    }
                }
                
                @keyframes pulseDebug {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
                `}
            </style>
            
            {/* Header Section */}
            <div className="max-w-6xl mx-auto">
                <div 
                    className="animate-[fadeSlideUp_0.8s_ease-out] mb-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-8 bg-yellow-500 rounded-full"></div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                            Topic 22: Common Mistakes and Debugging Text-Processing Commands
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed animate-[fadeSlideUp_1s_ease-out]">
                        Learn to identify, fix, and prevent the most common errors in Unix text processing workflows
                    </p>
                </div>
                
                {/* Critical Debugging Banner */}
                <div 
                    className="animate-[fadeSlideUp_1s_ease-out] mb-12 bg-gradient-to-r from-amber-900/40 to-yellow-900/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-700/50 hover:border-amber-500/50 transition-all duration-500"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 animate-[shakeError_0.5s_ease-in-out_infinite]">
                            <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-amber-300">
                                The Debugging Mindset
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                When Swadeep from Barrackpore spent 3 hours debugging a sed command that was deleting 
                                all his data, he realized: "The computer is always right. If it's not doing what you 
                                expect, you're telling it to do something different." This chapter saves you from 
                                learning that lesson the hard way.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Common Mistakes Overview */}
                <div className="animate-[fadeSlideUp_1.2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-red-300 border-b border-red-800 pb-2">
                        The Top 10 Most Common Mistakes
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {[
                                {
                                    rank: "1",
                                    title: "Missing Quotes",
                                    description: "Spaces in filenames or arguments break commands",
                                    example: "rm my file.txt (deletes 'my' and 'file.txt')",
                                    fix: "rm 'my file.txt' or rm my\\ file.txt",
                                    severity: "high"
                                },
                                {
                                    rank: "2",
                                    title: "Regex Greediness",
                                    description: ".* matches too much, eating entire lines",
                                    example: "sed 's/.*foo//' removes everything before AND including foo",
                                    fix: "sed 's/[^f]*foo//' or use non-greedy patterns",
                                    severity: "high"
                                },
                                {
                                    rank: "3",
                                    title: "Line Endings",
                                    description: "Windows vs Unix line endings (CRLF vs LF)",
                                    example: "grep pattern file.txt finds nothing (hidden ^M characters)",
                                    fix: "dos2unix or tr -d '\\r' < file.txt",
                                    severity: "medium"
                                },
                                {
                                    rank: "4",
                                    title: "Uninitialized Variables",
                                    description: "Using variables before setting them in awk/sed",
                                    example: "awk '{print total}' prints empty or 0",
                                    fix: "awk 'BEGIN{total=0} {total+=$1} END{print total}'",
                                    severity: "medium"
                                },
                                {
                                    rank: "5",
                                    title: "Case Sensitivity",
                                    description: "Forgetting grep -i or awk tolower()/toupper()",
                                    example: "grep 'Error' misses 'ERROR' and 'error'",
                                    fix: "grep -i 'error' or awk 'tolower($0) ~ /error/'",
                                    severity: "medium"
                                }
                            ].map((mistake, index) => (
                                <div 
                                    key={index}
                                    className={`animate-[fadeSlideUp_${1.2 + index * 0.1}s_ease-out] bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-4 rounded-xl border ${mistake.severity === 'high' ? 'border-red-700/30 hover:border-red-500/50' : 'border-yellow-700/30 hover:border-yellow-500/50'} transition-all duration-300 hover:scale-[1.01]`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full ${mistake.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'} flex items-center justify-center flex-shrink-0`}>
                                            <span className="text-xs font-bold">{mistake.rank}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-lg text-gray-200">{mistake.title}</h3>
                                                <span className={`text-xs px-2 py-1 rounded-full ${mistake.severity === 'high' ? 'bg-red-900/50 text-red-300' : 'bg-yellow-900/50 text-yellow-300'}`}>
                                                    {mistake.severity === 'high' ? 'CRITICAL' : 'MEDIUM'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-2">{mistake.description}</p>
                                            <div className="space-y-1 text-xs">
                                                <div className="flex gap-2">
                                                    <span className="text-red-400 font-medium">Error:</span>
                                                    <code className="bg-gray-900/50 px-2 py-1 rounded">{mistake.example}</code>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="text-green-400 font-medium">Fix:</span>
                                                    <code className="bg-gray-900/50 px-2 py-1 rounded">{mistake.fix}</code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="space-y-4">
                            {[
                                {
                                    rank: "6",
                                    title: "Backslash Escaping",
                                    description: "Forgetting to escape special characters in regex",
                                    example: "sed 's/.//' removes first character (not dot)",
                                    fix: "sed 's/\\.//' to match literal dot",
                                    severity: "high"
                                },
                                {
                                    rank: "7",
                                    title: "Pipeline Exit Codes",
                                    description: "Only last command's exit code is captured by $?",
                                    example: "grep pattern file | wc -l; echo $? shows wc exit code",
                                    fix: "set -o pipefail or check PIPESTATUS array",
                                    severity: "medium"
                                },
                                {
                                    rank: "8",
                                    title: "File vs Standard Input",
                                    description: "Confusion between filename arguments and stdin",
                                    example: "cat file | grep pattern file (reads file twice)",
                                    fix: "Either grep pattern file or cat file | grep pattern",
                                    severity: "low"
                                },
                                {
                                    rank: "9",
                                    title: "Locale Issues",
                                    description: "Sort order changes with LC_ALL settings",
                                    example: "sort produces different order on different systems",
                                    fix: "Use LC_ALL=C sort for consistent behavior",
                                    severity: "medium"
                                },
                                {
                                    rank: "10",
                                    title: "Whitespace Invisibility",
                                    description: "Tabs vs spaces, trailing spaces invisible",
                                    example: "grep 'pattern$' misses lines with trailing spaces",
                                    fix: "Use [:space:] class or clean data first",
                                    severity: "low"
                                }
                            ].map((mistake, index) => (
                                <div 
                                    key={index}
                                    className={`animate-[fadeSlideUp_${1.2 + (index + 5) * 0.1}s_ease-out] bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-4 rounded-xl border ${mistake.severity === 'high' ? 'border-red-700/30 hover:border-red-500/50' : mistake.severity === 'medium' ? 'border-yellow-700/30 hover:border-yellow-500/50' : 'border-blue-700/30 hover:border-blue-500/50'} transition-all duration-300 hover:scale-[1.01]`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full ${mistake.severity === 'high' ? 'bg-red-500' : mistake.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'} flex items-center justify-center flex-shrink-0`}>
                                            <span className="text-xs font-bold">{mistake.rank}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-lg text-gray-200">{mistake.title}</h3>
                                                <span className={`text-xs px-2 py-1 rounded-full ${mistake.severity === 'high' ? 'bg-red-900/50 text-red-300' : mistake.severity === 'medium' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-blue-900/50 text-blue-300'}`}>
                                                    {mistake.severity.toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-2">{mistake.description}</p>
                                            <div className="space-y-1 text-xs">
                                                <div className="flex gap-2">
                                                    <span className="text-red-400 font-medium">Error:</span>
                                                    <code className="bg-gray-900/50 px-2 py-1 rounded">{mistake.example}</code>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="text-green-400 font-medium">Fix:</span>
                                                    <code className="bg-gray-900/50 px-2 py-1 rounded">{mistake.fix}</code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Live Demonstration of Common Mistakes */}
                <div className="animate-[fadeSlideUp_1.4s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-cyan-300 border-b border-cyan-800 pb-2">
                        Live Demonstration: Common Mistakes in Action
                    </h2>
                    
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/40 transition-all duration-300 mb-8">
                        <ShellFileLoader
                            fileModule={commonMistakesDemo}
                            title="Common Mistakes and Their Fixes"
                            highlightLines={[3, 6, 9, 12, 15, 18, 21, 24]}
                        />
                        
                        <div className="mt-6 grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/20 animate-[flashWarning_2s_ease-in-out_infinite]">
                                    <h4 className="font-semibold text-red-300 mb-2">Mistake Pattern: Silent Failures</h4>
                                    <p className="text-sm text-gray-300">
                                        Commands that succeed but produce wrong results are the most dangerous. 
                                        Tuhina from Naihati once processed 10,000 records with sed and got 0 output 
                                        because of unescaped dots in regex.
                                    </p>
                                </div>
                                
                                <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
                                    <h4 className="font-semibold text-yellow-300 mb-2">Debugging Strategy</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            Test on sample data first
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            Use echo or cat to see what's being processed
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            Add debugging prints in awk scripts
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                                    <h4 className="font-semibold text-blue-300 mb-2">Prevention Techniques</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">Always test regex patterns with echo first</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">Use shellcheck to catch common issues</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">Create test files with known expected output</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                                    <h4 className="font-semibold text-purple-300 mb-2">Quote Detective Workflow</h4>
                                    <svg viewBox="0 0 300 100" className="w-full">
                                        <rect x="10" y="20" width="80" height="30" rx="5" fill="#4B5563" />
                                        <text x="50" y="40" textAnchor="middle" fill="#D1D5DB" fontSize="10">Command</text>
                                        
                                        <path d="M100,35 L120,35" stroke="#9CA3AF" strokeWidth="2">
                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
                                        </path>
                                        <polygon points="120,35 112,30 112,40" fill="#9CA3AF" />
                                        
                                        <rect x="130" y="20" width="80" height="30" rx="5" fill="#7C3AED" className="animate-[pulseDebug_2s_ease-in-out_infinite]">
                                            <title>Debugging Step</title>
                                        </rect>
                                        <text x="170" y="40" textAnchor="middle" fill="#E5E7EB" fontSize="10">Check Quotes</text>
                                        
                                        <path d="M220,35 L240,35" stroke="#9CA3AF" strokeWidth="2">
                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" begin="0.5s" />
                                        </path>
                                        <polygon points="240,35 232,30 232,40" fill="#9CA3AF" />
                                        
                                        <rect x="250" y="20" width="40" height="30" rx="5" fill="#10B981">
                                            <title>Fixed Command</title>
                                        </rect>
                                        <text x="270" y="40" textAnchor="middle" fill="#E5E7EB" fontSize="8">Fixed</text>
                                        
                                        {/* Debug output */}
                                        <g transform="translate(0, 60)">
                                            <rect x="10" y="0" width="280" height="30" rx="5" fill="#1F2937" stroke="#374151" />
                                            <text x="20" y="20" fill="#EF4444" fontSize="10">Debug: echo "grep pattern file with spaces.txt"</text>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Debugging Techniques */}
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                        <ShellFileLoader
                            fileModule={debuggingTechniques}
                            title="Systematic Debugging Approach"
                            highlightLines={[4, 8, 12, 16, 20, 24, 28]}
                        />
                        
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                            <h4 className="font-semibold text-blue-300 mb-3">Debugging Toolbox</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    {tool: "echo", use: "See what's being passed", icon: "M17 8l4 4m0 0l-4 4m4-4H3", color: "blue"},
                                    {tool: "set -x", use: "Trace execution", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "green"},
                                    {tool: "shellcheck", use: "Static analysis", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "purple"},
                                    {tool: "strace", use: "System call tracing", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "red"}
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-gray-800/30 p-3 rounded-lg text-center hover:bg-gray-800/50 transition-all duration-300">
                                        <div className={`text-${item.color}-400 mb-1 flex justify-center`}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                            </svg>
                                        </div>
                                        <div className="font-semibold text-gray-200 text-sm">{item.tool}</div>
                                        <div className="text-xs text-gray-400">{item.use}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Regex-Specific Mistakes */}
                <div className="animate-[fadeSlideUp_1.6s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-purple-300 border-b border-purple-800 pb-2">
                        Regex Pitfalls and Solutions
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={regexMistakes}
                                title="Common Regex Mistakes and Debugging"
                                highlightLines={[3, 7, 11, 15, 19, 23, 27]}
                            />
                            
                            <div className="mt-6">
                                <h4 className="font-semibold text-purple-300 mb-3">Regex Debugging Visualization</h4>
                                <div className="overflow-x-auto">
                                    <svg viewBox="0 0 700 300" className="w-full">
                                        {/* Problem Pattern */}
                                        <g transform="translate(0, 0)">
                                            <text x="10" y="30" fill="#9CA3AF" fontSize="14">Problem: Greedy Matching</text>
                                            <rect x="10" y="40" width="680" height="40" rx="5" fill="#1F2937" stroke="#4B5563" />
                                            
                                            <text x="20" y="65" fill="#D1D5DB" fontSize="12">Input: "The quick brown fox jumps over the lazy dog"</text>
                                            
                                            <g transform="translate(20, 80)">
                                                <text x="0" y="20" fill="#EF4444" fontSize="12">Pattern: /.*fox/</text>
                                                <rect x="0" y="25" width="150" height="20" rx="3" fill="#EF4444" opacity="0.7">
                                                    <animate attributeName="width" from="0" to="150" dur="1s" fill="freeze" />
                                                </rect>
                                                <text x="75" y="40" textAnchor="middle" fill="white" fontSize="10">Matches: "The quick brown fox"</text>
                                            </g>
                                            
                                            <g transform="translate(200, 80)">
                                                <text x="0" y="20" fill="#10B981" fontSize="12">Intended: /[^f]*fox/</text>
                                                <rect x="0" y="25" width="120" height="20" rx="3" fill="#10B981" opacity="0.7">
                                                    <animate attributeName="width" from="0" to="120" dur="1s" fill="freeze" begin="0.5s" />
                                                </rect>
                                                <text x="60" y="40" textAnchor="middle" fill="white" fontSize="10">Matches: "The quick brown fox"</text>
                                            </g>
                                        </g>
                                        
                                        {/* Character Escaping */}
                                        <g transform="translate(0, 130)">
                                            <text x="10" y="30" fill="#9CA3AF" fontSize="14">Problem: Unescaped Special Characters</text>
                                            <rect x="10" y="40" width="680" height="40" rx="5" fill="#1F2937" stroke="#4B5563" />
                                            
                                            <text x="20" y="65" fill="#D1D5DB" fontSize="12">Input: "file.txt backup.tar.gz important.doc"</text>
                                            
                                            <g transform="translate(20, 90)">
                                                <text x="0" y="20" fill="#EF4444" fontSize="12">Pattern: /file.txt/ (in regex: . means any character)</text>
                                                <rect x="0" y="25" width="60" height="20" rx="3" fill="#EF4444" opacity="0.7">
                                                    <animate attributeName="width" from="0" to="60" dur="1s" fill="freeze" />
                                                </rect>
                                                <text x="30" y="40" textAnchor="middle" fill="white" fontSize="10">Matches: "file" + any char + "txt"</text>
                                            </g>
                                            
                                            <g transform="translate(300, 90)">
                                                <text x="0" y="20" fill="#10B981" fontSize="12">Fix: /file\.txt/ (escaped dot)</text>
                                                <rect x="0" y="25" width="60" height="20" rx="3" fill="#10B981" opacity="0.7">
                                                    <animate attributeName="width" from="0" to="60" dur="1s" fill="freeze" begin="0.5s" />
                                                </rect>
                                                <text x="30" y="40" textAnchor="middle" fill="white" fontSize="10">Matches: "file.txt" exactly</text>
                                            </g>
                                        </g>
                                        
                                        {/* Anchors */}
                                        <g transform="translate(0, 200)">
                                            <text x="10" y="30" fill="#9CA3AF" fontSize="14">Problem: Missing Anchors</text>
                                            <rect x="10" y="40" width="680" height="40" rx="5" fill="#1F2937" stroke="#4B5563" />
                                            
                                            <text x="20" y="65" fill="#D1D5DB" fontSize="12">Input: "error: something went wrong\\nwarning: minor issue\\nerror: critical failure"</text>
                                            
                                            <g transform="translate(20, 90)">
                                                <text x="0" y="20" fill="#EF4444" fontSize="12">Pattern: /error/ (matches anywhere in line)</text>
                                                <rect x="0" y="25" width="50" height="20" rx="3" fill="#EF4444" opacity="0.7">
                                                    <animate attributeName="width" from="0" to="50" dur="1s" fill="freeze" />
                                                </rect>
                                                <text x="25" y="40" textAnchor="middle" fill="white" fontSize="8">Matches both lines</text>
                                            </g>
                                            
                                            <g transform="translate(200, 90)">
                                                <text x="0" y="20" fill="#10B981" fontSize="12">Fix: /^error/ (start of line only)</text>
                                                <rect x="0" y="25" width="50" height="20" rx="3" fill="#10B981" opacity="0.7">
                                                    <animate attributeName="width" from="0" to="50" dur="1s" fill="freeze" begin="0.5s" />
                                                </rect>
                                                <text x="25" y="40" textAnchor="middle" fill="white" fontSize="8">Matches only lines starting with error</text>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quoting Issues */}
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-red-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={quotingIssues}
                                title="Quoting and Variable Expansion Pitfalls"
                                highlightLines={[3, 7, 11, 15, 19, 23, 27]}
                            />
                            
                            <div className="mt-6">
                                <h4 className="font-semibold text-red-300 mb-3">The Great Shell Quoting Mystery</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div className="p-3 bg-red-900/20 rounded-lg">
                                            <div className="font-semibold text-red-300 mb-1">When Swadeep Lost His Files</div>
                                            <p className="text-sm text-gray-300">
                                                Swadeep ran: <code>rm $filename</code> where filename was "important notes.txt". 
                                                The shell expanded this to: <code>rm important notes.txt</code> - deleting "important" and "notes.txt".
                                            </p>
                                        </div>
                                        
                                        <div className="p-3 bg-yellow-900/20 rounded-lg">
                                            <div className="font-semibold text-yellow-300 mb-1">The Solution</div>
                                            <p className="text-sm text-gray-300">
                                                Always quote variables: <code>rm "$filename"</code>. 
                                                The shell keeps "important notes.txt" as a single argument.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="p-3 bg-blue-900/20 rounded-lg">
                                            <div className="font-semibold text-blue-300 mb-1">Quote Rule of Thumb</div>
                                            <ul className="text-sm text-gray-300 space-y-1">
                                                <li>Double quotes: <code>"$var"</code> - expands variables</li>
                                                <li>Single quotes: <code>'$var'</code> - literal text</li>
                                                <li>Backticks vs $(): <code>$(cmd)</code> preferred</li>
                                                <li>No quotes: word splitting occurs</li>
                                            </ul>
                                        </div>
                                        
                                        <div className="p-3 bg-green-900/20 rounded-lg">
                                            <div className="font-semibold text-green-300 mb-1">Debugging Technique</div>
                                            <p className="text-sm text-gray-300">
                                                Use <code>set -x</code> to see how shell expands commands, or 
                                                use <code>echo</code> to preview: <code>echo rm "$filename"</code>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Pipeline Debugging */}
                <div className="animate-[fadeSlideUp_1.8s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-cyan-300 border-b border-cyan-800 pb-2">
                        Pipeline and Data Flow Debugging
                    </h2>
                    
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/40 transition-all duration-300">
                        <ShellFileLoader
                            fileModule={pipelineDebugging}
                            title="Debugging Complex Pipelines"
                            highlightLines={[4, 8, 12, 16, 20, 24, 28]}
                        />
                        
                        <div className="mt-6">
                            <h4 className="font-semibold text-cyan-300 mb-3">Pipeline Debugging Workflow</h4>
                            <div className="overflow-x-auto">
                                <svg viewBox="0 0 800 350" className="w-full">
                                    {/* Pipeline stages */}
                                    <g transform="translate(0, 0)">
                                        <text x="10" y="30" fill="#9CA3AF" fontSize="14">{`Debugging a Broken Pipeline: grep pattern file.txt | sed 's/old/new/' | awk '{print $1}'`}</text>
                                        
                                        {/* Stage 1: Input */}
                                        <g transform="translate(50, 50)">
                                            <rect x="0" y="0" width="100" height="60" rx="8" fill="#4B5563" className="hover:fill-gray-600 transition-colors duration-300">
                                                <title>Input File</title>
                                            </rect>
                                            <text x="50" y="35" textAnchor="middle" fill="#D1D5DB" fontSize="12">file.txt</text>
                                            <text x="50" y="50" textAnchor="middle" fill="#9CA3AF" fontSize="10">(exists?)</text>
                                        </g>
                                        
                                        {/* Arrow 1 */}
                                        <path d="M160,80 L200,80" stroke="#9CA3AF" strokeWidth="2">
                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
                                        </path>
                                        <polygon points="200,80 192,75 192,85" fill="#9CA3AF" />
                                        
                                        {/* Stage 2: grep */}
                                        <g transform="translate(210, 50)">
                                            <rect x="0" y="0" width="100" height="60" rx="8" fill="#3B82F6" className="hover:fill-blue-500 transition-colors duration-300 animate-[pulseDebug_3s_ease-in-out_infinite]">
                                                <title>grep command</title>
                                                <animate attributeName="fill" values="#3B82F6;#1D4ED8;#3B82F6" dur="2s" repeatCount="indefinite" />
                                            </rect>
                                            <text x="50" y="30" textAnchor="middle" fill="#E5E7EB" fontSize="10">grep pattern</text>
                                            <text x="50" y="45" textAnchor="middle" fill="#E5E7EB" fontSize="10">Debug: check output</text>
                                        </g>
                                        
                                        {/* Arrow 2 */}
                                        <path d="M320,80 L360,80" stroke="#9CA3AF" strokeWidth="2">
                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" begin="0.3s" />
                                        </path>
                                        <polygon points="360,80 352,75 352,85" fill="#9CA3AF" />
                                        
                                        {/* Stage 3: sed */}
                                        <g transform="translate(370, 50)">
                                            <rect x="0" y="0" width="100" height="60" rx="8" fill="#8B5CF6" className="hover:fill-purple-500 transition-colors duration-300 animate-[pulseDebug_3s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}>
                                                <title>sed command</title>
                                                <animate attributeName="fill" values="#8B5CF6;#7C3AED;#8B5CF6" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                            </rect>
                                            <text x="50" y="30" textAnchor="middle" fill="#E5E7EB" fontSize="10">sed 's/old/new/'</text>
                                            <text x="50" y="45" textAnchor="middle" fill="#E5E7EB" fontSize="10">Debug: check pattern</text>
                                        </g>
                                        
                                        {/* Arrow 3 */}
                                        <path d="M480,80 L520,80" stroke="#9CA3AF" strokeWidth="2">
                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" begin="0.6s" />
                                        </path>
                                        <polygon points="520,80 512,75 512,85" fill="#9CA3AF" />
                                        
                                        {/* Stage 4: awk */}
                                        <g transform="translate(530, 50)">
                                            <rect x="0" y="0" width="100" height="60" rx="8" fill="#10B981" className="hover:fill-green-500 transition-colors duration-300 animate-[pulseDebug_3s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
                                                <title>awk command</title>
                                                <animate attributeName="fill" values="#10B981;#059669;#10B981" dur="2s" repeatCount="indefinite" begin="1s" />
                                            </rect>
                                            <text x="50" y="30" textAnchor="middle" fill="#E5E7EB" fontSize="10">{`awk '{print $1}'`}</text>
                                            <text x="50" y="45" textAnchor="middle" fill="#E5E7EB" fontSize="10">Debug: check field</text>
                                        </g>
                                    </g>
                                    
                                    {/* Debug steps */}
                                    <g transform="translate(0, 150)">
                                        <rect x="50" y="0" width="700" height="150" rx="10" fill="#1F2937" stroke="#374151" />
                                        
                                        <text x="70" y="30" fill="#3B82F6" fontSize="14" fontWeight="bold">Debugging Steps</text>
                                        <line x1="70" y1="35" x2="200" y2="35" stroke="#4B5563" />
                                        
                                        <g transform="translate(70, 50)">
                                            <circle cx="10" cy="10" r="8" fill="#EF4444">
                                                <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite" />
                                            </circle>
                                            <text x="25" y="15" fill="#D1D5DB" fontSize="12">Step 1: Test grep alone</text>
                                            <text x="25" y="30" fill="#9CA3AF" fontSize="10">grep pattern file.txt | head -5</text>
                                        </g>
                                        
                                        <g transform="translate(70, 80)">
                                            <circle cx="10" cy="10" r="8" fill="#F59E0B">
                                                <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite" begin="0.3s" />
                                            </circle>
                                            <text x="25" y="15" fill="#D1D5DB" fontSize="12">Step 2: Add sed to pipeline</text>
                                            <text x="25" y="30" fill="#9CA3AF" fontSize="10">grep pattern file.txt | sed 's/old/new/' | head -5</text>
                                        </g>
                                        
                                        <g transform="translate(70, 110)">
                                            <circle cx="10" cy="10" r="8" fill="#10B981">
                                                <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite" begin="0.6s" />
                                            </circle>
                                            <text x="25" y="15" fill="#D1D5DB" fontSize="12">Step 3: Complete pipeline</text>
                                            <text x="25" y="30" fill="#9CA3AF" fontSize="10">{`grep pattern file.txt | sed 's/old/new/' | awk '{print $1}' | head -5`}</text>
                                        </g>
                                        
                                        <g transform="translate(400, 50)">
                                            <rect x="0" y="0" width="250" height="90" rx="5" fill="#111827" stroke="#374151" />
                                            <text x="10" y="20" fill="#F59E0B" fontSize="12" fontWeight="bold">Debugging Commands</text>
                                            <text x="10" y="40" fill="#9CA3AF" fontSize="10">set -x             # Enable tracing</text>
                                            <text x="10" y="55" fill="#9CA3AF" fontSize="10">set -o pipefail    # Fail on pipe errors</text>
                                            <text x="10" y="70" fill="#9CA3AF" fontSize="10">
                                                {`echo "\${PIPESTATUS[@]}" # Check all exit codes`}
                                            </text>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Prevention Strategies */}
                <div className="animate-[fadeSlideUp_2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-green-800 pb-2">
                        Prevention Strategies and Best Practices
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-green-900/30 to-emerald-800/20 p-5 rounded-xl border border-green-700/30 hover:border-green-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-green-200">Proactive Prevention</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-green-900/20 rounded-lg">
                                        <h4 className="font-semibold text-green-300 mb-1">Use ShellCheck</h4>
                                        <p className="text-sm text-gray-300">Static analysis tool that catches common shell script errors</p>
                                        <div className="text-xs text-blue-400 mt-2">Install: apt-get install shellcheck, Use: shellcheck script.sh</div>
                                    </div>
                                    
                                    <div className="p-3 bg-green-900/20 rounded-lg">
                                        <h4 className="font-semibold text-green-300 mb-1">Create Test Suites</h4>
                                        <p className="text-sm text-gray-300">Test scripts with known input and expected output</p>
                                        <div className="text-xs text-blue-400 mt-2">When Abhronila from Shyamnagar created test files, bug rate dropped 80%</div>
                                    </div>
                                    
                                    <div className="p-3 bg-green-900/20 rounded-lg">
                                        <h4 className="font-semibold text-green-300 mb-1">Version Control for Commands</h4>
                                        <p className="text-sm text-gray-300">Save commands in scripts, not just typing in terminal</p>
                                        <div className="text-xs text-blue-400 mt-2">Git tracks changes and allows rollback if something breaks</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 p-5 rounded-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-blue-200">Debugging Workflow</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Start Simple</h4>
                                        <p className="text-sm text-gray-300">Test each command separately before combining</p>
                                        <div className="text-xs text-green-400 mt-2">Rule: One bug at a time is easier than ten</div>
                                    </div>
                                    
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Use Small Test Data</h4>
                                        <p className="text-sm text-gray-300">Create 5-10 line test files instead of using production data</p>
                                        <div className="text-xs text-green-400 mt-2">Fast iteration = faster debugging</div>
                                    </div>
                                    
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Add Debugging Output</h4>
                                        <p className="text-sm text-gray-300">Insert echo statements or awk print debugging</p>
                                        <div className="text-xs text-green-400 mt-2">{`awk '{print "DEBUG: Processing:", $0} {actual processing}'`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 p-5 rounded-xl border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-purple-200">Real-World Debugging Stories</h3>
                                
                                <div className="space-y-4">
                                    <div className="p-3 bg-purple-900/20 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-red-300 mb-1">Debangshu's CSV Catastrophe</div>
                                                <p className="text-sm text-gray-300">
                                                    Processed 10,000 student records with <code>{`awk -F, '{print $1}'`}</code> but got 
                                                    wrong results. Problem: Some lines had commas in quotes. 
                                                    Solution: Used <code>{`awk -FPAT='([^,]+)|(\"[^\"]+\")'`}</code>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-3 bg-purple-900/20 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-yellow-300 mb-1">Tuhina's Silent Sed</div>
                                                <p className="text-sm text-gray-300">
                                                    <code>sed -i 's/Jan/January/' file.txt</code> produced no changes. 
                                                    Problem: File had "jan" (lowercase). 
                                                    Solution: <code>{`sed -i 's/Jan/January/gi' file.txt`}</code>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-3 bg-purple-900/20 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-green-300 mb-1">Swadeep's Backup Salvation</div>
                                                <p className="text-sm text-gray-300">
                                                    Always used <code>sed -i.bak</code> for in-place editing. 
                                                    When a regex ate his data, the .bak file saved 8 hours of work. 
                                                    Moral: Always make backups before destructive operations.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 p-5 rounded-xl border border-yellow-700/30 hover:border-yellow-500/50 transition-all duration-300">
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-3 text-yellow-200">Debugging Cheat Sheet</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="text-center p-2 bg-gray-800/30 rounded-lg">
                                            <div className="text-xs text-yellow-400 font-bold">set -x</div>
                                            <div className="text-xs text-gray-400">Trace execution</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-800/30 rounded-lg">
                                            <div className="text-xs text-yellow-400 font-bold">echo $?</div>
                                            <div className="text-xs text-gray-400">Check exit code</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-800/30 rounded-lg">
                                            <div className="text-xs text-yellow-400 font-bold">shellcheck</div>
                                            <div className="text-xs text-gray-400">Static analysis</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-800/30 rounded-lg">
                                            <div className="text-xs text-yellow-400 font-bold">head -5</div>
                                            <div className="text-xs text-gray-400">Test with sample</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-800/30 rounded-lg">
                                            <div className="text-xs text-yellow-400 font-bold">tee</div>
                                            <div className="text-xs text-gray-400">Save intermediate</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-800/30 rounded-lg">
                                            <div className="text-xs text-yellow-400 font-bold">strace</div>
                                            <div className="text-xs text-gray-400">System calls</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Teacher's Note */}
                <div className="animate-[fadeSlideUp_2.2s_ease-out] mb-12">
                    <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 backdrop-blur-sm rounded-2xl p-6 border border-yellow-700/50 hover:border-yellow-500/50 transition-all duration-500 group">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-yellow-600 to-amber-500 p-3 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4 text-yellow-300">Teacher's Note</h2>
                                <div className="mb-6 p-4 bg-gray-900/40 rounded-xl border border-gray-700">
                                    <p className="text-gray-300 leading-relaxed">
                                        Dear students, debugging is not a sign of failure—it's a core programming skill. 
                                        In my 27 years, I've made every mistake in this chapter (and invented some new ones). 
                                        The difference between beginners and experts isn't that experts don't make mistakes; 
                                        it's that experts have systematic ways to find and fix them. Remember: 
                                        "The most dangerous command is the one you're sure will work."
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-yellow-300">Sukanta Hui</div>
                                        <div className="text-sm text-gray-400">27 years experience</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-amber-300">Debugging Rule</div>
                                        <div className="text-sm text-gray-400">"When in doubt, print it out"</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-red-300">Contact</div>
                                        <div className="text-sm text-gray-400">sukantahui@codernaccotax.co.in</div>
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-amber-900/20 rounded-xl">
                                    <h4 className="font-bold text-lg mb-2 text-red-200">Exam Survival Tip</h4>
                                    <p className="text-gray-300">
                                        In practical exams, if your command isn't working: 1) Write it down on paper first, 
                                        2) Test each part separately, 3) Check quotes and special characters, 
                                        4) Use small test data. Showing your debugging process can earn partial marks 
                                        even if the final command isn't perfect.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Mini Checklist */}
                <div className="animate-[fadeSlideUp_2.4s_ease-out]">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/30 transition-all duration-500">
                        <h2 className="text-2xl font-bold mb-6 text-yellow-300 border-b border-yellow-800 pb-2">
                            Debugging Checklist
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {[
                                    {num: "1", title: "Test with Sample Data", desc: "Use head/tail or create small test files"},
                                    {num: "2", title: "Check File Existence", desc: "ls -la or test -f before processing"},
                                    {num: "3", title: "Verify Permissions", desc: "Can you read the file? ls -la filename"},
                                    {num: "4", title: "Check Line Endings", desc: "cat -A shows $ (LF) or ^M$ (CRLF)"}
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                        <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold">{item.num}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-yellow-200">{item.title}</h4>
                                            <p className="text-sm text-gray-300">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="space-y-4">
                                {[
                                    {num: "5", title: "Use set -x", desc: "Enable command tracing to see expansions"},
                                    {num: "6", title: "Check Exit Codes", desc: "echo $? after each command"},
                                    {num: "7", title: "Test Regex Separately", desc: "Use echo 'test' | grep pattern"},
                                    {num: "8", title: "Backup Before -i", desc: "Always use sed -i.bak or cp first"}
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                        <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold">{item.num}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-red-200">{item.title}</h4>
                                            <p className="text-sm text-gray-300">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                            <h3 className="font-bold text-lg mb-3 text-blue-200">Hint Section</h3>
                            <p className="text-gray-300 italic">
                                Think about: How would you debug a pipeline that works on your machine but fails on another? 
                                Observe carefully: What's different between successful and failed runs? 
                                Try changing this: Instead of fixing the error, try to reproduce it consistently first.
                            </p>
                        </div>
                        
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                            <h4 className="font-semibold text-purple-300 mb-2">Professional Tip from Experience</h4>
                            <p className="text-gray-300 text-sm">
                                When Tuhina debugged the Naihati school database issue, she created a "debugging diary" 
                                documenting: 1) What she expected, 2) What actually happened, 3) What she tried, 
                                4) What worked. This systematic approach solved in 30 minutes what would have taken 3 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic22;