import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import raw shell script files
import dataCleanupExample1 from "./topic19_files/data_cleanup_example1.sh?raw";
import dataNormalizationExample from "./topic19_files/data_normalization_example.sh?raw";
import sedMultiCleanupExample from "./topic19_files/sed_multi_cleanup_example.sh?raw";
import sedPatternValidation from "./topic19_files/sed_pattern_validation.sh?raw";
import sedFileProcessing from "./topic19_files/sed_file_processing.sh?raw";

const Topic19 = () => {
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
                
                @keyframes pulseSubtle {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }
                
                @keyframes svgFlow {
                    0% {
                        stroke-dashoffset: 1000;
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
                        <div className="w-3 h-8 bg-blue-500 rounded-full"></div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Topic 19: Data Cleanup and Normalization Using sed
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed animate-[fadeSlideUp_1s_ease-out]">
                        Master the art of cleaning and standardizing data using sed's powerful text transformation capabilities
                    </p>
                </div>
                
                {/* Overview Card */}
                <div 
                    className="animate-[fadeSlideUp_1s_ease-out] mb-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10"
                >
                    <h2 className="text-2xl font-bold mb-4 text-blue-300 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Why Data Cleanup Matters
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        In real-world data processing, raw data is often messy, inconsistent, and requires standardization 
                        before analysis. Swadeep from Barrackpore recently struggled with inconsistent student data where 
                        names, dates, and scores were formatted differently across files.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700 hover:border-green-500/30 transition-all duration-300">
                            <h3 className="font-semibold text-green-300 mb-2">Common Data Issues</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Inconsistent date formats
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Mixed case entries
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Extra whitespace
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Inconsistent delimiters
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all duration-300">
                            <h3 className="font-semibold text-yellow-300 mb-2">sed Solution Benefits</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    Batch processing capabilities
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    Consistent transformations
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    Non-interactive automation
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    Pattern-based cleanup
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Conceptual Explanation */}
                <div className="animate-[fadeSlideUp_1.2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-cyan-300 border-b border-cyan-800 pb-2">
                        Understanding Data Cleanup Patterns
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700 hover:border-cyan-500/40 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-cyan-200">What is Data Cleanup?</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Data cleanup involves transforming raw, inconsistent data into a standardized format. 
                                    When Abhronila from Shyamnagar collected survey data, she found entries like 
                                    "12-04-2023", "April 12, 2023", and "2023/04/12" all referring to the same date.
                                </p>
                            </div>
                            
                            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-purple-200">Normalization Goals</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        Standardize date/time formats across dataset
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        Convert text to consistent case (lower/upper)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        Remove unnecessary whitespace and characters
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-1">•</span>
                                        Replace inconsistent delimiters with standard ones
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="relative">
                            {/* SVG Process Diagram */}
                            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-blue-500/40 transition-all duration-300 h-full">
                                <h3 className="font-bold text-lg mb-4 text-blue-200">Cleanup Process Flow</h3>
                                <svg viewBox="0 0 400 300" className="w-full h-64">
                                    {/* Raw Data */}
                                    <rect x="20" y="40" width="80" height="40" rx="5" fill="#4B5563" stroke="#6B7280" strokeWidth="2" className="hover:fill-gray-600 transition-colors duration-300">
                                        <animate attributeName="fill" values="#4B5563;#6B7280;#4B5563" dur="3s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="60" y="65" textAnchor="middle" fill="#D1D5DB" fontSize="12">Raw Data</text>
                                    
                                    {/* Arrow 1 */}
                                    <path d="M110,60 L150,60" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                                    </path>
                                    <polygon points="150,60 142,55 142,65" fill="#9CA3AF" />
                                    
                                    {/* sed Processing */}
                                    <rect x="160" y="40" width="80" height="40" rx="5" fill="#1E40AF" stroke="#3B82F6" strokeWidth="2" className="hover:fill-blue-700 transition-colors duration-300">
                                        <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="200" y="65" textAnchor="middle" fill="#E5E7EB" fontSize="12">sed Processing</text>
                                    
                                    {/* Arrow 2 */}
                                    <path d="M250,60 L290,60" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" begin="1s" />
                                    </path>
                                    <polygon points="290,60 282,55 282,65" fill="#9CA3AF" />
                                    
                                    {/* Clean Data */}
                                    <rect x="300" y="40" width="80" height="40" rx="5" fill="#065F46" stroke="#10B981" strokeWidth="2" className="hover:fill-emerald-700 transition-colors duration-300">
                                        <animate attributeName="fill" values="#065F46;#10B981;#065F46" dur="3s" repeatCount="indefinite" begin="1s" />
                                    </rect>
                                    <text x="340" y="65" textAnchor="middle" fill="#E5E7EB" fontSize="12">Clean Data</text>
                                    
                                    {/* Examples Flow */}
                                    <g transform="translate(0, 100)">
                                        <rect x="20" y="40" width="360" height="120" rx="8" fill="#1F2937" stroke="#374151" strokeWidth="1" />
                                        
                                        <text x="40" y="70" fill="#9CA3AF" fontSize="10">Input: "John  DOE , NewYork  " (messy)</text>
                                        <path d="M40,80 L360,80" stroke="#4B5563" strokeWidth="1" strokeDasharray="2,2" />
                                        
                                        <text x="40" y="110" fill="#9CA3AF" fontSize="10">sed command: s/\\s\\+,/,/g; s/\\s\\+/ /g</text>
                                        <path d="M40,120 L360,120" stroke="#4B5563" strokeWidth="1" strokeDasharray="2,2" />
                                        
                                        <text x="40" y="150" fill="#10B981" fontSize="10">Output: "John DOE,NewYork" (clean)</text>
                                    </g>
                                </svg>
                                <p className="text-sm text-gray-400 mt-4 text-center">
                                    The flow shows how sed transforms inconsistent data into standardized format
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Practical Examples */}
                <div className="animate-[fadeSlideUp_1.4s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-emerald-300 border-b border-emerald-800 pb-2">
                        Practical sed Cleanup Examples
                    </h2>
                    
                    {/* Example 1: Basic Cleanup */}
                    <div className="mb-8">
                        <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-emerald-500/40 transition-all duration-300 mb-6">
                            <h3 className="font-bold text-lg mb-3 text-emerald-200">Example 1: Basic Data Cleanup</h3>
                            <p className="text-gray-300 mb-4">
                                When Debangshu was preparing student data from Ichapur schools, he encountered 
                                inconsistent spacing and formatting. Here's how to fix it:
                            </p>
                            
                            <ShellFileLoader
                                fileModule={dataCleanupExample1}
                                title="Basic Data Cleanup Script"
                                highlightLines={[3, 6, 9, 12]}
                            />
                            
                            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                <h4 className="font-semibold text-yellow-300 mb-2">Expected Output:</h4>
                                <pre className="text-sm text-gray-300 font-mono">
                                    Name,Age,Grade,City{'\n'}
                                    John Doe,15,A,New York{'\n'}
                                    Jane Smith,16,B,Los Angeles{'\n'}
                                    Bob Johnson,14,A,Chicago
                                </pre>
                            </div>
                        </div>
                    </div>
                    
                    {/* Example 2: Data Normalization */}
                    <div className="mb-8">
                        <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-3 text-blue-200">Example 2: Advanced Normalization</h3>
                            <p className="text-gray-300 mb-4">
                                Tuhina from Naihati needed to standardize product data with mixed case, 
                                inconsistent date formats, and varying units:
                            </p>
                            
                            <ShellFileLoader
                                fileModule={dataNormalizationExample}
                                title="Data Normalization Script"
                                highlightLines={[4, 8, 12, 16, 20]}
                            />
                            
                            <div className="mt-6 grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-900/50 p-4 rounded-lg border border-red-500/20">
                                    <h4 className="font-semibold text-red-300 mb-2">Before Normalization:</h4>
                                    <pre className="text-xs text-gray-400">
                                        product: Laptop, price: $999.99, date: 04-12-2023{'\n'}
                                        PRODUCT: MOUSE, PRICE: $49.50, DATE: 2023/12/04{'\n'}
                                        Product: Keyboard, Price: $79, Date: Dec 4, 2023
                                    </pre>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg border border-green-500/20">
                                    <h4 className="font-semibold text-green-300 mb-2">After Normalization:</h4>
                                    <pre className="text-xs text-gray-300">
                                        Product: Laptop, Price: 999.99, Date: 2023-12-04{'\n'}
                                        Product: Mouse, Price: 49.50, Date: 2023-12-04{'\n'}
                                        Product: Keyboard, Price: 79.00, Date: 2023-12-04
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Multiple Operations Example */}
                <div className="animate-[fadeSlideUp_1.6s_ease-out] mb-12">
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500">
                        <h2 className="text-2xl font-bold mb-6 text-purple-300 border-b border-purple-800 pb-2">
                            Complex Cleanup Pipeline
                        </h2>
                        
                        <ShellFileLoader
                            fileModule={sedMultiCleanupExample}
                            title="Multi-step Cleanup Pipeline"
                            highlightLines={[2, 4, 6, 8, 10, 12]}
                        />
                        
                        <div className="mt-6 p-4 bg-gray-900/40 rounded-xl">
                            <h3 className="font-bold text-lg mb-3 text-cyan-200">Pipeline Breakdown</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="text-sm font-semibold text-green-400 mb-1">Step 1</div>
                                    <div className="text-xs text-gray-300">Trim extra spaces</div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="text-sm font-semibold text-blue-400 mb-1">Step 2</div>
                                    <div className="text-xs text-gray-300">Standardize case</div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="text-sm font-semibold text-yellow-400 mb-1">Step 3</div>
                                    <div className="text-xs text-gray-300">Fix date formats</div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="text-sm font-semibold text-purple-400 mb-1">Step 4</div>
                                    <div className="text-xs text-gray-300">Clean currency</div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="text-sm font-semibold text-pink-400 mb-1">Step 5</div>
                                    <div className="text-xs text-gray-300">Remove duplicates</div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="text-sm font-semibold text-red-400 mb-1">Step 6</div>
                                    <div className="text-xs text-gray-300">Final validation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pattern Validation */}
                <div className="animate-[fadeSlideUp_1.8s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-yellow-300 border-b border-yellow-800 pb-2">
                        Pattern Validation & Error Detection
                    </h2>
                    
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/40 transition-all duration-300">
                        <ShellFileLoader
                            fileModule={sedPatternValidation}
                            title="Data Validation Script"
                            highlightLines={[3, 6, 9, 12, 15, 18]}
                        />
                        
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                            <h3 className="font-bold text-lg mb-3 text-yellow-200">Validation Rules Applied</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-gray-300">Email format validation</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-300">Phone number pattern matching</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                    <span className="text-gray-300">Date format standardization</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span className="text-gray-300">Marking invalid entries</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* File Processing */}
                <div className="animate-[fadeSlideUp_2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-cyan-300 border-b border-cyan-800 pb-2">
                        Batch File Processing
                    </h2>
                    
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/40 transition-all duration-300">
                        <ShellFileLoader
                            fileModule={sedFileProcessing}
                            title="Batch Processing Multiple Files"
                            highlightLines={[2, 4, 6, 8, 10]}
                        />
                        
                        <div className="mt-6 grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-300 mb-3">File Processing Flow</h4>
                                <svg viewBox="0 0 300 200" className="w-full">
                                    <rect x="20" y="20" width="60" height="40" rx="5" fill="#4B5563" className="hover:fill-gray-600 transition-colors duration-300">
                                        <animate attributeName="y" values="20;25;20" dur="2s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="50" y="45" textAnchor="middle" fill="#D1D5DB" fontSize="10">data1.txt</text>
                                    
                                    <rect x="20" y="80" width="60" height="40" rx="5" fill="#4B5563" className="hover:fill-gray-600 transition-colors duration-300">
                                        <animate attributeName="y" values="80;85;80" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                    </rect>
                                    <text x="50" y="105" textAnchor="middle" fill="#D1D5DB" fontSize="10">data2.txt</text>
                                    
                                    <rect x="20" y="140" width="60" height="40" rx="5" fill="#4B5563" className="hover:fill-gray-600 transition-colors duration-300">
                                        <animate attributeName="y" values="140;145;140" dur="2s" repeatCount="indefinite" begin="1s" />
                                    </rect>
                                    <text x="50" y="165" textAnchor="middle" fill="#D1D5DB" fontSize="10">data3.txt</text>
                                    
                                    {/* Arrow to sed */}
                                    <path d="M90,40 L140,40 M90,100 L140,100 M90,160 L140,160" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4,4">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                                    </path>
                                    
                                    {/* sed processor */}
                                    <rect x="150" y="60" width="80" height="80" rx="10" fill="#1E40AF" className="hover:fill-blue-700 transition-colors duration-300">
                                        <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="190" y="105" textAnchor="middle" fill="#E5E7EB" fontSize="12">sed</text>
                                    
                                    {/* Arrow to output */}
                                    <path d="M240,100 L290,100" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4,4">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" begin="1s" />
                                    </path>
                                    
                                    {/* Output */}
                                    <rect x="300" y="60" width="80" height="80" rx="10" fill="#065F46" className="hover:fill-emerald-700 transition-colors duration-300">
                                        <animate attributeName="fill" values="#065F46;#10B981;#065F46" dur="3s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="340" y="105" textAnchor="middle" fill="#E5E7EB" fontSize="12">Clean Files</text>
                                </svg>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-900/40 p-3 rounded-lg hover:bg-gray-900/60 transition-all duration-300">
                                    <h4 className="font-semibold text-blue-300 mb-1">Wildcard Processing</h4>
                                    <p className="text-sm text-gray-300">Process all .txt files in directory</p>
                                </div>
                                
                                <div className="bg-gray-900/40 p-3 rounded-lg hover:bg-gray-900/60 transition-all duration-300">
                                    <h4 className="font-semibold text-green-300 mb-1">Backup Creation</h4>
                                    <p className="text-sm text-gray-300">Automatic backup before modification</p>
                                </div>
                                
                                <div className="bg-gray-900/40 p-3 rounded-lg hover:bg-gray-900/60 transition-all duration-300">
                                    <h4 className="font-semibold text-purple-300 mb-1">Log Generation</h4>
                                    <p className="text-sm text-gray-300">Track all changes made</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div className="animate-[fadeSlideUp_2.2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-red-300 border-b border-red-800 pb-2">
                        Common Pitfalls & Solutions
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-5 rounded-xl border border-red-700/30 hover:border-red-500/50 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-4 text-red-200">Beginner Mistakes</h3>
                            
                            <div className="space-y-4">
                                <div className="p-3 bg-red-900/20 rounded-lg hover:bg-red-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-red-300 mb-1">No Backup Copies</h4>
                                    <p className="text-sm text-gray-300">Editing files without backup using -i flag</p>
                                    <div className="text-xs text-red-400 mt-2">Solution: Always use sed -i.bak or keep original copies</div>
                                </div>
                                
                                <div className="p-3 bg-red-900/20 rounded-lg hover:bg-red-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-red-300 mb-1">Greedy Patterns</h4>
                                    <p className="text-sm text-gray-300">Using .* without considering boundaries</p>
                                    <div className="text-xs text-red-400 mt-2">Solution: Use non-greedy patterns or specific character classes</div>
                                </div>
                                
                                <div className="p-3 bg-red-900/20 rounded-lg hover:bg-red-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-red-300 mb-1">Case Sensitivity</h4>
                                    <p className="text-sm text-gray-300">Forgetting to handle different text cases</p>
                                    <div className="text-xs text-red-400 mt-2">Solution: Use /I flag or convert to lowercase first</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-5 rounded-xl border border-yellow-700/30 hover:border-yellow-500/50 transition-all duration-300">
                            <h3 className="font-bold text-lg mb-4 text-yellow-200">Professional Tips</h3>
                            
                            <div className="space-y-4">
                                <div className="p-3 bg-yellow-900/20 rounded-lg hover:bg-yellow-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-yellow-300 mb-1">Test First, Apply Later</h4>
                                    <p className="text-sm text-gray-300">Always test sed commands without -i flag first</p>
                                    <div className="text-xs text-green-400 mt-2">Best Practice: sed 's/pattern/replacement/' file | head -5</div>
                                </div>
                                
                                <div className="p-3 bg-yellow-900/20 rounded-lg hover:bg-yellow-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-yellow-300 mb-1">Use Script Files</h4>
                                    <p className="text-sm text-gray-300">For complex transformations, use sed -f script.sed</p>
                                    <div className="text-xs text-green-400 mt-2">Best Practice: Maintain reusable sed script libraries</div>
                                </div>
                                
                                <div className="p-3 bg-yellow-900/20 rounded-lg hover:bg-yellow-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-yellow-300 mb-1">Log Changes</h4>
                                    <p className="text-sm text-gray-300">Always log what changes were made and when</p>
                                    <div className="text-xs text-green-400 mt-2">Best Practice: Use tee to log while processing</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className="animate-[fadeSlideUp_2.4s_ease-out] mb-12">
                    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-6 border border-cyan-700/50 hover:border-cyan-500/50 transition-all duration-500 group">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" opacity="0.5" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4 text-cyan-300">Teacher's Note</h2>
                                <div className="mb-6 p-4 bg-gray-900/40 rounded-xl border border-gray-700">
                                    <p className="text-gray-300 leading-relaxed">
                                        Dear students, data cleanup is 80% of data analysis work. I've seen many students, 
                                        including Swadeep and Tuhina, spend hours manually cleaning data when a few sed 
                                        commands could do it in seconds. Remember: Always backup, test on sample data first, 
                                        and document your transformation rules.
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-blue-300">Sukanta Hui</div>
                                        <div className="text-sm text-gray-400">27 years experience</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-green-300">Contact</div>
                                        <div className="text-sm text-gray-400">sukantahui@codernaccotax.co.in</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-purple-300">Expertise</div>
                                        <div className="text-sm text-gray-400">Data Processing, Automation</div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl">
                                    <h4 className="font-bold text-lg mb-2 text-yellow-200">Pro Tip for Exams</h4>
                                    <p className="text-gray-300">
                                        In practical exams, always show your work: 1) Original data sample, 2) Your sed command, 
                                        3) Output sample. This demonstrates understanding even if the result isn't perfect.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className="animate-[fadeSlideUp_2.6s_ease-out]">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-500">
                        <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-green-800 pb-2">
                            What to Remember
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-green-200">Always Backup</h4>
                                        <p className="text-sm text-gray-300">Use -i.bak or keep original copies before editing</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-200">Test Incrementally</h4>
                                        <p className="text-sm text-gray-300">Test each sed command separately before combining</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-purple-200">Order Matters</h4>
                                        <p className="text-sm text-gray-300">Apply sed commands in logical sequence (clean → format → validate)</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold">4</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-yellow-200">Document Patterns</h4>
                                        <p className="text-sm text-gray-300">Keep a cheat sheet of common sed patterns for data cleanup</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold">5</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-red-200">Handle Edge Cases</h4>
                                        <p className="text-sm text-gray-300">Consider empty lines, special characters, and unexpected formats</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold">6</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-cyan-200">Validate Results</h4>
                                        <p className="text-sm text-gray-300">Always check output for consistency and completeness</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                            <h3 className="font-bold text-lg mb-3 text-blue-200">Hint Section</h3>
                            <p className="text-gray-300 italic">
                                Think about: How would you handle data where some entries use tabs and others use spaces as delimiters? 
                                Observe carefully: What patterns emerge in messy data that can be exploited for cleanup? 
                                Try changing this: Instead of multiple sed commands, can you use a single command with multiple expressions?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic19;