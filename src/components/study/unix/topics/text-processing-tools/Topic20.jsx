import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import raw shell script files
import patternValidationBasic from "./topic20_files/pattern_validation_basic.sh?raw";
import errorDetectionScript from "./topic20_files/error_detection_script.sh?raw";
import complexValidation from "./topic20_files/complex_validation.sh?raw";
import logAnalysisValidation from "./topic20_files/log_analysis_validation.sh?raw";
import dataIntegrityCheck from "./topic20_files/data_integrity_check.sh?raw";

const Topic20 = () => {
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
                
                @keyframes pulseAlert {
                    0%, 100% {
                        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
                    }
                    50% {
                        box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
                    }
                }
                
                @keyframes slideInRight {
                    0% {
                        transform: translateX(-20px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes checkMark {
                    0% {
                        stroke-dashoffset: 100;
                    }
                    100% {
                        stroke-dashoffset: 0;
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
                        <div className="w-3 h-8 bg-red-500 rounded-full"></div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                            Topic 20: Error Detection and Pattern Validation in Text Files
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed animate-[fadeSlideUp_1s_ease-out]">
                        Master techniques to identify errors, validate patterns, and ensure data integrity using powerful Unix tools
                    </p>
                </div>
                
                {/* Critical Importance Banner */}
                <div 
                    className="animate-[fadeSlideUp_1s_ease-out] mb-12 bg-gradient-to-r from-red-900/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-6 border border-red-700/50 hover:border-red-500/50 transition-all duration-500"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 animate-pulse">
                            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-red-300">
                                The Critical Importance of Validation
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                When Tuhina from Naihati processed exam results, she discovered that 15% of records had errors 
                                that would have skewed the entire analysis. Error detection isn't just about finding mistakes—it's 
                                about ensuring data integrity for critical decision-making.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Types of Errors Section */}
                <div className="animate-[fadeSlideUp_1.2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-orange-300 border-b border-orange-800 pb-2">
                        Common Error Types in Text Files
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Format Errors",
                                color: "red",
                                examples: ["Invalid dates", "Malformed emails", "Incorrect phone numbers"],
                                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            },
                            {
                                title: "Structural Errors",
                                color: "yellow",
                                examples: ["Missing columns", "Extra delimiters", "Inconsistent line lengths"],
                                icon: "M4 6h16M4 10h16M4 14h16M4 18h16"
                            },
                            {
                                title: "Content Errors",
                                color: "blue",
                                examples: ["Out-of-range values", "Invalid categories", "Data type mismatches"],
                                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            },
                            {
                                title: "Consistency Errors",
                                color: "green",
                                examples: ["Duplicate records", "Referential issues", "Cross-field validation"],
                                icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            },
                            {
                                title: "Syntax Errors",
                                color: "purple",
                                examples: ["Unclosed quotes", "Invalid JSON/CSV", "Special character issues"],
                                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            },
                            {
                                title: "Business Rule Errors",
                                color: "pink",
                                examples: ["Age < 0", "Future birth dates", "Impossible combinations"],
                                icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            }
                        ].map((errorType, index) => (
                            <div 
                                key={index}
                                className={`animate-[fadeSlideUp_${1.2 + index * 0.1}s_ease-out] bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-5 rounded-xl border border-${errorType.color}-700/30 hover:border-${errorType.color}-500/50 transition-all duration-300 hover:scale-[1.02]`}
                            >
                                <div className={`flex items-center gap-3 mb-3 text-${errorType.color}-300`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={errorType.icon} />
                                    </svg>
                                    <h3 className="font-bold text-lg">{errorType.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {errorType.examples.map((example, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                            <div className={`w-2 h-2 bg-${errorType.color}-500 rounded-full`}></div>
                                            {example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Basic Pattern Validation */}
                <div className="animate-[fadeSlideUp_1.6s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-cyan-300 border-b border-cyan-800 pb-2">
                        Basic Pattern Validation with grep
                    </h2>
                    
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/40 transition-all duration-300 mb-8">
                        <ShellFileLoader
                            fileModule={patternValidationBasic}
                            title="Basic Pattern Validation Script"
                            highlightLines={[3, 6, 9, 12, 15, 18]}
                        />
                        
                        <div className="mt-6 grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-900/50 p-4 rounded-lg border border-green-500/20">
                                <h4 className="font-semibold text-green-300 mb-3">Validation Success Indicators</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">Email format matches pattern</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">Phone number has correct format</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">Date falls within valid range</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg border border-red-500/20">
                                <h4 className="font-semibold text-red-300 mb-3">Error Detection Patterns</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center">
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">Missing @ symbol in email</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center">
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">Phone number too short/long</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center">
                                            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">Impossible date (e.g., Feb 30)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Pattern Visualization */}
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500">
                        <h3 className="text-xl font-bold mb-4 text-blue-300">Pattern Matching Visualization</h3>
                        <div className="overflow-x-auto">
                            <svg viewBox="0 0 800 200" className="w-full min-h-[200px]">
                                {/* Email Pattern */}
                                <g transform="translate(0, 0)">
                                    <text x="10" y="30" fill="#9CA3AF" fontSize="14">{`Email Pattern: ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$`}</text>
                                    <rect x="10" y="40" width="780" height="30" rx="5" fill="#1F2937" stroke="#4B5563" />
                                    
                                    {/* Pattern Breakdown */}
                                    <g transform="translate(20, 50)">
                                        <rect x="0" y="0" width="120" height="10" rx="2" fill="#3B82F6" className="hover:fill-blue-400 transition-colors duration-300">
                                            <title>Local part: letters, numbers, dots, underscores, percent, plus, hyphen</title>
                                        </rect>
                                        <text x="60" y="8" textAnchor="middle" fill="white" fontSize="8">local part</text>
                                        
                                        <rect x="130" y="0" width="20" height="10" rx="2" fill="#EF4444" className="hover:fill-red-400 transition-colors duration-300">
                                            <title>Required @ symbol</title>
                                        </rect>
                                        <text x="140" y="8" textAnchor="middle" fill="white" fontSize="8">@</text>
                                        
                                        <rect x="160" y="0" width="80" height="10" rx="2" fill="#10B981" className="hover:fill-green-400 transition-colors duration-300">
                                            <title>Domain name</title>
                                        </rect>
                                        <text x="200" y="8" textAnchor="middle" fill="white" fontSize="8">domain</text>
                                        
                                        <rect x="250" y="0" width="10" height="10" rx="2" fill="#F59E0B" className="hover:fill-yellow-400 transition-colors duration-300">
                                            <title>Required dot</title>
                                        </rect>
                                        <text x="255" y="8" textAnchor="middle" fill="white" fontSize="8">.</text>
                                        
                                        <rect x="270" y="0" width="60" height="10" rx="2" fill="#8B5CF6" className="hover:fill-purple-400 transition-colors duration-300">
                                            <title>Top-level domain (2+ chars)</title>
                                        </rect>
                                        <text x="300" y="8" textAnchor="middle" fill="white" fontSize="8">TLD</text>
                                    </g>
                                    
                                    {/* Example Match */}
                                    <g transform="translate(20, 80)">
                                        <text x="0" y="20" fill="#9CA3AF" fontSize="12">Example: john.doe@example.com</text>
                                        <rect x="0" y="25" width="75" height="10" rx="2" fill="#3B82F6" opacity="0.7" />
                                        <rect x="85" y="25" width="10" height="10" rx="2" fill="#EF4444" opacity="0.7" />
                                        <rect x="105" y="25" width="50" height="10" rx="2" fill="#10B981" opacity="0.7" />
                                        <rect x="165" y="25" width="10" height="10" rx="2" fill="#F59E0B" opacity="0.7" />
                                        <rect x="185" y="25" width="25" height="10" rx="2" fill="#8B5CF6" opacity="0.7" />
                                    </g>
                                </g>
                                
                                {/* Phone Pattern */}
                                <g transform="translate(0, 120)">
                                    <text x="10" y="30" fill="#9CA3AF" fontSize="14">Phone Pattern: ^\d{3}[-.]?\d{3}[-.]?\d{4}$</text>
                                    <rect x="10" y="40" width="780" height="30" rx="5" fill="#1F2937" stroke="#4B5563" />
                                    
                                    <g transform="translate(20, 50)">
                                        <rect x="0" y="0" width="40" height="10" rx="2" fill="#3B82F6" />
                                        <text x="20" y="8" textAnchor="middle" fill="white" fontSize="8">3 digits</text>
                                        
                                        <rect x="50" y="0" width="20" height="10" rx="2" fill="#10B981" />
                                        <text x="60" y="8" textAnchor="middle" fill="white" fontSize="8">optional - or .</text>
                                        
                                        <rect x="80" y="0" width="40" height="10" rx="2" fill="#F59E0B" />
                                        <text x="100" y="8" textAnchor="middle" fill="white" fontSize="8">3 digits</text>
                                        
                                        <rect x="130" y="0" width="20" height="10" rx="2" fill="#8B5CF6" />
                                        <text x="140" y="8" textAnchor="middle" fill="white" fontSize="8">optional - or .</text>
                                        
                                        <rect x="160" y="0" width="50" height="10" rx="2" fill="#EC4899" />
                                        <text x="185" y="8" textAnchor="middle" fill="white" fontSize="8">4 digits</text>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                
                {/* Advanced Error Detection */}
                <div className="animate-[fadeSlideUp_1.8s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-purple-300 border-b border-purple-800 pb-2">
                        Advanced Error Detection Scripts
                    </h2>
                    
                    <div className="space-y-8">
                        {/* Script 1: Comprehensive Error Detection */}
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={errorDetectionScript}
                                title="Comprehensive Error Detection Script"
                                highlightLines={[4, 8, 12, 16, 20, 24]}
                            />
                            
                            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                                <h4 className="font-semibold text-yellow-300 mb-3">Detection Capabilities</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        {label: "Empty Fields", color: "red", icon: "M20 12H4"},
                                        {label: "Date Range", color: "yellow", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"},
                                        {label: "Numeric Range", color: "green", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"},
                                        {label: "Pattern Match", color: "blue", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-gray-800/30 p-3 rounded-lg text-center hover:bg-gray-800/50 transition-all duration-300">
                                            <div className={`text-${item.color}-400 mb-1 flex justify-center`}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                </svg>
                                            </div>
                                            <div className="text-xs text-gray-300">{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Script 2: Complex Validation */}
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={complexValidation}
                                title="Complex Business Rule Validation"
                                highlightLines={[5, 10, 15, 20, 25, 30]}
                            />
                            
                            <div className="mt-6">
                                <h4 className="font-semibold text-blue-300 mb-3">Business Rule Examples from Shyamnagar School</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-gray-900/40 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                            <span className="text-red-400 font-bold">1</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-red-300">Age Validation</div>
                                            <div className="text-sm text-gray-400">Student age must be between 5 and 25</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 p-3 bg-gray-900/40 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                            <span className="text-yellow-400 font-bold">2</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-yellow-300">Grade Consistency</div>
                                            <div className="text-sm text-gray-400">Marks must correspond to appropriate grade (A: 90+, B: 80-89, etc.)</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 p-3 bg-gray-900/40 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <span className="text-green-400 font-bold">3</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-green-300">Date Logic</div>
                                            <div className="text-sm text-gray-400">Birth date must be before admission date</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Real-world Applications */}
                <div className="animate-[fadeSlideUp_2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-green-800 pb-2">
                        Real-world Validation Applications
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Log Analysis */}
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-green-500/40 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-4 text-green-200">Log File Analysis & Validation</h3>
                            <ShellFileLoader
                                fileModule={logAnalysisValidation}
                                title="Server Log Validation Script"
                                highlightLines={[3, 7, 11, 15, 19]}
                            />
                            
                            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                                <h4 className="font-semibold text-yellow-300 mb-2">Valid Log Patterns</h4>
                                <pre className="text-xs text-gray-300 font-mono">
                                    [2024-01-15 10:30:45] INFO: User login successful{'\n'}
                                    [2024-01-15 10:31:22] ERROR: Database connection failed{'\n'}
                                    [2024-01-15 10:32:10] WARNING: High memory usage detected
                                </pre>
                            </div>
                        </div>
                        
                        {/* Data Integrity */}
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/40 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-4 text-cyan-200">Data Integrity Checking</h3>
                            <ShellFileLoader
                                fileModule={dataIntegrityCheck}
                                title="CSV Data Integrity Validation"
                                highlightLines={[4, 8, 12, 16, 20, 24]}
                            />
                            
                            <div className="mt-6">
                                <h4 className="font-semibold text-cyan-300 mb-3">Integrity Check Flow</h4>
                                <svg viewBox="0 0 300 180" className="w-full">
                                    <rect x="20" y="20" width="80" height="40" rx="5" fill="#4B5563" className="hover:fill-gray-600 transition-colors duration-300">
                                        <animate attributeName="fill" values="#4B5563;#6B7280;#4B5563" dur="3s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="60" y="45" textAnchor="middle" fill="#D1D5DB" fontSize="10">CSV File</text>
                                    
                                    <path d="M110,40 L150,40" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                                    </path>
                                    <polygon points="150,40 142,35 142,45" fill="#9CA3AF" />
                                    
                                    <rect x="160" y="20" width="80" height="40" rx="5" fill="#1E40AF" className="hover:fill-blue-700 transition-colors duration-300">
                                        <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="200" y="45" textAnchor="middle" fill="#E5E7EB" fontSize="10">Validation</text>
                                    
                                    <g transform="translate(0, 60)">
                                        <rect x="20" y="20" width="260" height="80" rx="8" fill="#1F2937" stroke="#374151" strokeWidth="1" />
                                        
                                        <circle cx="40" cy="50" r="15" fill="#EF4444" className="hover:fill-red-400 transition-colors duration-300">
                                            <animate attributeName="r" values="15;18;15" dur="1s" repeatCount="indefinite" />
                                        </circle>
                                        <text x="40" y="55" textAnchor="middle" fill="white" fontSize="8">Errors</text>
                                        
                                        <circle cx="100" cy="50" r="15" fill="#F59E0B" className="hover:fill-yellow-400 transition-colors duration-300">
                                            <animate attributeName="r" values="15;16;15" dur="1.5s" repeatCount="indefinite" />
                                        </circle>
                                        <text x="100" y="55" textAnchor="middle" fill="white" fontSize="8">Warnings</text>
                                        
                                        <circle cx="160" cy="50" r="15" fill="#10B981" className="hover:fill-green-400 transition-colors duration-300">
                                            <animate attributeName="r" values="15;17;15" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <text x="160" y="55" textAnchor="middle" fill="white" fontSize="8">Valid</text>
                                        
                                        <circle cx="220" cy="50" r="15" fill="#3B82F6" className="hover:fill-blue-400 transition-colors duration-300">
                                            <animate attributeName="r" values="15;16;15" dur="2.5s" repeatCount="indefinite" />
                                        </circle>
                                        <text x="220" y="55" textAnchor="middle" fill="white" fontSize="8">Total</text>
                                        
                                        <text x="150" y="85" textAnchor="middle" fill="#9CA3AF" fontSize="8">Validation Report Summary</text>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Common Pitfalls */}
                <div className="animate-[fadeSlideUp_2.2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-red-300 border-b border-red-800 pb-2">
                        Common Validation Pitfalls
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 p-5 rounded-xl border border-red-700/30 hover:border-red-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-red-200">Pattern Design Mistakes</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-red-900/20 rounded-lg">
                                        <h4 className="font-semibold text-red-300 mb-1">Overly Restrictive Patterns</h4>
                                        <p className="text-sm text-gray-300">Rejecting valid international phone numbers or email formats</p>
                                    </div>
                                    
                                    <div className="p-3 bg-red-900/20 rounded-lg">
                                        <h4 className="font-semibold text-red-300 mb-1">Missing Edge Cases</h4>
                                        <p className="text-sm text-gray-300">Not accounting for special characters or whitespace variations</p>
                                    </div>
                                    
                                    <div className="p-3 bg-red-900/20 rounded-lg">
                                        <h4 className="font-semibold text-red-300 mb-1">Performance Issues</h4>
                                        <p className="text-sm text-gray-300">Using complex regex on large files without optimization</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 p-5 rounded-xl border border-yellow-700/30 hover:border-yellow-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-yellow-200">Validation Logic Errors</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-yellow-900/20 rounded-lg">
                                        <h4 className="font-semibold text-yellow-300 mb-1">Order of Operations</h4>
                                        <p className="text-sm text-gray-300">Validating before cleaning data (e.g., checking trimmed values)</p>
                                    </div>
                                    
                                    <div className="p-3 bg-yellow-900/20 rounded-lg">
                                        <h4 className="font-semibold text-yellow-300 mb-1">Silent Failures</h4>
                                        <p className="text-sm text-gray-300">Not logging or reporting validation failures clearly</p>
                                    </div>
                                    
                                    <div className="p-3 bg-yellow-900/20 rounded-lg">
                                        <h4 className="font-semibold text-yellow-300 mb-1">False Positives</h4>
                                        <p className="text-sm text-gray-300">Marking valid data as errors due to overly strict rules</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 p-5 rounded-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-blue-200">Professional Solutions</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Progressive Validation</h4>
                                        <p className="text-sm text-gray-300">Start with basic format checks, then business rules</p>
                                        <div className="text-xs text-green-400 mt-2">Best Practice: Clean → Format → Validate → Report</div>
                                    </div>
                                    
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Test Data Sets</h4>
                                        <p className="text-sm text-gray-300">Maintain test files with known valid/invalid data</p>
                                        <div className="text-xs text-green-400 mt-2">Best Practice: Include edge cases in test data</div>
                                    </div>
                                    
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Modular Validation</h4>
                                        <p className="text-sm text-gray-300">Create separate validation functions for each rule</p>
                                        <div className="text-xs text-green-400 mt-2">Best Practice: Reusable validation scripts</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 p-5 rounded-xl border border-green-700/30 hover:border-green-500/50 transition-all duration-300">
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-3 text-green-200">Validation Workflow</h3>
                                    <svg viewBox="0 0 300 120" className="w-full mb-4">
                                        <path d="M30,60 Q50,30 70,60 T110,60 T150,60 T190,60 T230,60 T270,60" stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="5,5">
                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                                        </path>
                                        
                                        {[
                                            {x: 30, label: "Input", color: "#6B7280"},
                                            {x: 70, label: "Clean", color: "#3B82F6"},
                                            {x: 110, label: "Format", color: "#8B5CF6"},
                                            {x: 150, label: "Validate", color: "#10B981"},
                                            {x: 190, label: "Report", color: "#F59E0B"},
                                            {x: 230, label: "Fix", color: "#EF4444"},
                                            {x: 270, label: "Output", color: "#6366F1"}
                                        ].map((step, idx) => (
                                            <g key={idx} transform={`translate(${step.x}, 60)`}>
                                                <circle r="15" fill={step.color} className="hover:scale-110 transition-transform duration-300">
                                                    <animate attributeName="r" values="15;17;15" dur={`${1 + idx * 0.5}s`} repeatCount="indefinite" />
                                                </circle>
                                                <text y="35" textAnchor="middle" fill="#D1D5DB" fontSize="8">{step.label}</text>
                                            </g>
                                        ))}
                                    </svg>
                                    
                                    <p className="text-sm text-gray-300">
                                        When Abhronila from Barrackpore validated exam data, she followed this workflow 
                                        and caught 97% of errors before processing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Teacher's Note */}
                <div className="animate-[fadeSlideUp_2.4s_ease-out] mb-12">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/50 hover:border-purple-500/50 transition-all duration-500 group">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-3 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4 text-purple-300">Teacher's Note</h2>
                                <div className="mb-6 p-4 bg-gray-900/40 rounded-xl border border-gray-700">
                                    <p className="text-gray-300 leading-relaxed">
                                        Dear students, error detection is like proofreading your own work—it's tedious but essential. 
                                        I remember Swadeep once processed 10,000 student records from Ichapur schools without validation 
                                        and had to redo everything because of date format errors. Always validate early, validate often. 
                                        Your validation scripts should be as important as your processing scripts.
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-purple-300">Sukanta Hui</div>
                                        <div className="text-sm text-gray-400">27 years experience</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-pink-300">Golden Rule</div>
                                        <div className="text-sm text-gray-400">"Trust, but verify" all data</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-blue-300">Contact</div>
                                        <div className="text-sm text-gray-400">sukantahui@codernaccotax.co.in</div>
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl">
                                    <h4 className="font-bold text-lg mb-2 text-yellow-200">Exam Strategy</h4>
                                    <p className="text-gray-300">
                                        In exams, when asked to validate data: 1) List possible error types, 2) Write regex patterns 
                                        for each, 3) Show how you would detect each error type, 4) Suggest corrections. Showing 
                                        systematic thinking gets more marks than just correct answers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Mini Checklist */}
                <div className="animate-[fadeSlideUp_2.6s_ease-out]">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/30 transition-all duration-500">
                        <h2 className="text-2xl font-bold mb-6 text-orange-300 border-b border-orange-800 pb-2">
                            Validation Checklist
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {[
                                    {num: "1", title: "Define Clear Rules", desc: "Specify exactly what constitutes valid data"},
                                    {num: "2", title: "Test Patterns", desc: "Verify regex patterns with sample valid/invalid data"},
                                    {num: "3", title: "Handle Edge Cases", desc: "Account for empty values, whitespace, special chars"},
                                    {num: "4", title: "Create Test Suite", desc: "Maintain test files for regular validation"}
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                        <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold">{item.num}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-orange-200">{item.title}</h4>
                                            <p className="text-sm text-gray-300">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="space-y-4">
                                {[
                                    {num: "5", title: "Log Everything", desc: "Record all validation attempts and results"},
                                    {num: "6", title: "Provide Clear Reports", desc: "Generate human-readable error summaries"},
                                    {num: "7", title: "Automate Where Possible", desc: "Use scripts for repetitive validation tasks"},
                                    {num: "8", title: "Review Periodically", desc: "Update validation rules as data formats evolve"}
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
                                Think about: How would you validate a CSV file where some columns are optional? 
                                Observe carefully: What patterns emerge when data fails validation—are errors clustered or random? 
                                Try changing this: Instead of rejecting invalid data immediately, can you suggest automatic corrections?
                            </p>
                        </div>
                        
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                            <h4 className="font-semibold text-green-300 mb-2">Professional Tip from Debangshu's Experience</h4>
                            <p className="text-gray-300 text-sm">
                                When I worked on the Naihati student database project, I created a validation pipeline that: 
                                1) Logged all errors with line numbers, 2) Suggested possible fixes, 3) Generated a summary report, 
                                4) Could run in "dry-run" mode to preview changes. This saved 40+ hours of manual checking.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic20;