import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import raw shell script files
import studentDataExample from "./topic23_files/student_data_example.sh?raw";
import marksProcessingScript from "./topic23_files/marks_processing_script.sh?raw";
import gradeAssignment from "./topic23_files/grade_assignment.sh?raw";
import reportGeneration from "./topic23_files/report_generation.sh?raw";
import comprehensiveLab from "./topic23_files/comprehensive_lab.sh?raw";

const Topic23 = () => {
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
                
                @keyframes labPulse {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
                    }
                    50% {
                        transform: scale(1.02);
                        box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
                    }
                }
                
                @keyframes dataFlow {
                    0% {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes progressBar {
                    0% {
                        width: 0%;
                    }
                    100% {
                        width: 100%;
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
                            Topic 23: Practical Lab - Generate Student Marks Reports from Text Files
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed animate-[fadeSlideUp_1s_ease-out]">
                        Apply your text processing skills to solve real-world problems: Process, analyze, and generate comprehensive student reports
                    </p>
                </div>
                
                {/* Lab Introduction */}
                <div 
                    className="animate-[fadeSlideUp_1s_ease-out] mb-12 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/50 hover:border-blue-500/50 transition-all duration-500"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 animate-[labPulse_3s_ease-in-out_infinite]">
                            <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-blue-300">
                                Lab Scenario: Barrackpore High School Exam Processing
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                Swadeep, the school administrator at Barrackpore High School, needs to process 
                                examination results for 500+ students. The data comes in messy text files with 
                                inconsistencies. Your task: Clean the data, calculate statistics, assign grades, 
                                and generate professional reports using only Unix text processing tools.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Lab Objectives */}
                <div className="animate-[fadeSlideUp_1.2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-emerald-300 border-b border-emerald-800 pb-2">
                        Lab Objectives
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                objective: "Data Cleaning",
                                tasks: ["Fix formatting issues", "Handle missing values", "Standardize data"],
                                icon: "M3 10h11M9 21V5a2 2 0 012-2h2a2 2 0 012 2v16m-3.22-6.22l2.44-2.44m0 0l2.44-2.44M15.78 15.78l2.44 2.44M3 10h6m0 0v11",
                                color: "blue"
                            },
                            {
                                objective: "Processing",
                                tasks: ["Calculate averages", "Assign grades", "Generate statistics"],
                                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                                color: "purple"
                            },
                            {
                                objective: "Reporting",
                                tasks: ["Create summary reports", "Generate class lists", "Produce analytics"],
                                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                                color: "green"
                            }
                        ].map((obj, index) => (
                            <div 
                                key={index}
                                className={`animate-[fadeSlideUp_${1.2 + index * 0.1}s_ease-out] bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-5 rounded-xl border border-${obj.color}-700/30 hover:border-${obj.color}-500/50 transition-all duration-300 hover:scale-[1.02]`}
                            >
                                <div className={`flex items-center gap-3 mb-4 text-${obj.color}-300`}>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={obj.icon} />
                                    </svg>
                                    <h3 className="font-bold text-xl">{obj.objective}</h3>
                                </div>
                                
                                <ul className="space-y-2">
                                    {obj.tasks.map((task, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                            <div className={`w-2 h-2 bg-${obj.color}-500 rounded-full`}></div>
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Sample Data Structure */}
                <div className="animate-[fadeSlideUp_1.4s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-cyan-300 border-b border-cyan-800 pb-2">
                        Sample Data Structure
                    </h2>
                    
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/40 transition-all duration-300 mb-8">
                        <ShellFileLoader
                            fileModule={studentDataExample}
                            title="Student Marks Data Files"
                            highlightLines={[3, 7, 11, 15, 19, 23]}
                        />
                        
                        <div className="mt-6">
                            <h4 className="font-semibold text-cyan-300 mb-3">Data Flow Visualization</h4>
                            <div className="overflow-x-auto">
                                <svg viewBox="0 0 800 350" className="w-full">
                                    {/* Raw Data Sources */}
                                    <g transform="translate(0, 0)">
                                        <text x="10" y="30" fill="#9CA3AF" fontSize="14">Data Sources (Multiple Files)</text>
                                        
                                        {[
                                            {x: 20, label: "math.txt", color: "#EF4444"},
                                            {x: 120, label: "science.txt", color: "#3B82F6"},
                                            {x: 220, label: "english.txt", color: "#10B981"},
                                            {x: 320, label: "history.txt", color: "#F59E0B"},
                                            {x: 420, label: "attendance.txt", color: "#8B5CF6"}
                                        ].map((file, idx) => (
                                            <g key={idx} transform={`translate(${file.x}, 50)`}>
                                                <rect x="0" y="0" width="80" height="40" rx="5" fill={file.color} className="hover:opacity-90 transition-opacity duration-300">
                                                    <animate attributeName="y" values="0;5;0" dur="2s" repeatCount="indefinite" begin={`${idx * 0.3}s`} />
                                                </rect>
                                                <text x="40" y="25" textAnchor="middle" fill="white" fontSize="10">{file.label}</text>
                                            </g>
                                        ))}
                                    </g>
                                    
                                    {/* Processing Pipeline */}
                                    <g transform="translate(0, 120)">
                                        <text x="10" y="30" fill="#9CA3AF" fontSize="14">Processing Pipeline</text>
                                        
                                        {/* Arrow from files to processing */}
                                        <path d="M100,50 L100,80" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5">
                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                                        </path>
                                        
                                        {/* Processing stages */}
                                        <g transform="translate(50, 100)">
                                            {[
                                                {x: 0, label: "Clean", color: "#EF4444", width: 60},
                                                {x: 80, label: "Merge", color: "#3B82F6", width: 60},
                                                {x: 160, label: "Calculate", color: "#10B981", width: 80},
                                                {x: 260, label: "Grade", color: "#F59E0B", width: 60},
                                                {x: 340, label: "Sort", color: "#8B5CF6", width: 60},
                                                {x: 420, label: "Report", color: "#EC4899", width: 70}
                                            ].map((stage, idx) => (
                                                <g key={idx} transform={`translate(${stage.x}, 0)`}>
                                                    <rect x="0" y="0" width={stage.width} height="40" rx="5" fill={stage.color} className="hover:opacity-90 transition-opacity duration-300 animate-[dataFlow_3s_ease-in-out_infinite]" style={{ animationDelay: `${idx * 0.5}s` }}>
                                                        <animate attributeName="fill" values={`${stage.color};#000000;${stage.color}`} dur="3s" repeatCount="indefinite" begin={`${idx * 0.5}s`} />
                                                    </rect>
                                                    <text x={stage.width/2} y="25" textAnchor="middle" fill="white" fontSize="10">{stage.label}</text>
                                                    
                                                    {/* Arrow to next stage */}
                                                    {idx < 5 && (
                                                        <path d={`M${stage.width},20 L${stage.width + 20},20`} stroke="#9CA3AF" strokeWidth="2">
                                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" begin={`${idx * 0.5}s`} />
                                                        </path>
                                                    )}
                                                </g>
                                            ))}
                                        </g>
                                    </g>
                                    
                                    {/* Output */}
                                    <g transform="translate(0, 220)">
                                        <text x="10" y="30" fill="#9CA3AF" fontSize="14">Output Reports</text>
                                        
                                        {[
                                            {x: 50, label: "Class Report", color: "#10B981", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},
                                            {x: 200, label: "Rank List", color: "#3B82F6", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"},
                                            {x: 350, label: "Statistics", color: "#F59E0B", icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"},
                                            {x: 500, label: "Grade Sheet", color: "#8B5CF6", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"}
                                        ].map((output, idx) => (
                                            <g key={idx} transform={`translate(${output.x}, 50)`}>
                                                <rect x="0" y="0" width="120" height="60" rx="8" fill={output.color} className="hover:opacity-90 transition-opacity duration-300">
                                                    <animate attributeName="y" values="0;-5;0" dur="2s" repeatCount="indefinite" begin={`${idx * 0.4}s`} />
                                                </rect>
                                                <text x="60" y="25" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{output.label}</text>
                                                <text x="60" y="40" textAnchor="middle" fill="white" fontSize="8">(PDF/CSV/TXT)</text>
                                            </g>
                                        ))}
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    {/* Data Issues Table */}
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-red-500/30 transition-all duration-500">
                        <h3 className="text-xl font-bold mb-4 text-red-300">Common Data Issues to Fix</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left py-3 px-4 text-red-300">Issue Type</th>
                                        <th className="text-left py-3 px-4 text-red-300">Example</th>
                                        <th className="text-left py-3 px-4 text-red-300">Impact</th>
                                        <th className="text-left py-3 px-4 text-green-300">Solution</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {
                                            issue: "Missing Marks",
                                            example: "Science: , English: 85",
                                            impact: "Average calculation fails",
                                            solution: "Replace with 0 or NA"
                                        },
                                        {
                                            issue: "Inconsistent Case",
                                            example: "john doe, JOHN DOE, John Doe",
                                            impact: "Duplicate detection fails",
                                            solution: "Standardize to Title Case"
                                        },
                                        {
                                            issue: "Extra Whitespace",
                                            example: "Swadeep  ,  85",
                                            impact: "Field splitting incorrect",
                                            solution: "Trim spaces with sed"
                                        },
                                        {
                                            issue: "Mixed Delimiters",
                                            example: "Name: Swadeep, Marks:85",
                                            impact: "awk -F fails",
                                            solution: "Standardize delimiter"
                                        },
                                        {
                                            issue: "Invalid Marks",
                                            example: "Math: 105 (out of 100)",
                                            impact: "Statistics skewed",
                                            solution: "Validate range 0-100"
                                        }
                                    ].map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-300">
                                            <td className="py-3 px-4 text-gray-300">{row.issue}</td>
                                            <td className="py-3 px-4">
                                                <code className="bg-gray-900/50 px-2 py-1 rounded text-xs">{row.example}</code>
                                            </td>
                                            <td className="py-3 px-4 text-red-400">{row.impact}</td>
                                            <td className="py-3 px-4 text-green-400">{row.solution}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                {/* Step 1: Data Processing */}
                <div className="animate-[fadeSlideUp_1.6s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-purple-300 border-b border-purple-800 pb-2">
                        Step 1: Data Processing & Cleaning
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={marksProcessingScript}
                                title="Student Marks Processing Script"
                                highlightLines={[4, 8, 12, 16, 20, 24, 28, 32]}
                            />
                            
                            <div className="mt-6">
                                <h4 className="font-semibold text-purple-300 mb-3">Processing Steps Visualization</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        {step: "1. Load", desc: "Read all subject files", color: "blue", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"},
                                        {step: "2. Clean", desc: "Fix formatting issues", color: "red", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"},
                                        {step: "3. Merge", desc: "Combine all data", color: "green", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"},
                                        {step: "4. Calculate", desc: "Compute averages", color: "yellow", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"}
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-gray-800/30 p-3 rounded-lg text-center hover:bg-gray-800/50 transition-all duration-300">
                                            <div className={`text-${item.color}-400 mb-1 flex justify-center`}>
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                </svg>
                                            </div>
                                            <div className="font-semibold text-gray-200 text-sm">{item.step}</div>
                                            <div className="text-xs text-gray-400">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Progress Tracking */}
                        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/50 hover:border-cyan-500/30 transition-all duration-500">
                            <h3 className="text-xl font-bold mb-4 text-cyan-300">Processing Progress Tracking</h3>
                            <div className="space-y-4">
                                {[
                                    {task: "Data Loading", progress: 100, color: "green"},
                                    {task: "Format Cleaning", progress: 85, color: "blue"},
                                    {task: "Missing Value Handling", progress: 70, color: "yellow"},
                                    {task: "Data Validation", progress: 60, color: "purple"},
                                    {task: "Final Merge", progress: 40, color: "red"}
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300">{item.task}</span>
                                            <span className={`text-${item.color}-400`}>{item.progress}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full bg-${item.color}-500 rounded-full animate-[progressBar_2s_ease-out]`}
                                                style={{ width: `${item.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Step 2: Grade Assignment */}
                <div className="animate-[fadeSlideUp_1.8s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-green-800 pb-2">
                        Step 2: Grade Assignment & Classification
                    </h2>
                    
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-green-500/40 transition-all duration-300">
                        <ShellFileLoader
                            fileModule={gradeAssignment}
                            title="Grade Assignment Based on Marks"
                            highlightLines={[4, 8, 12, 16, 20, 24, 28]}
                        />
                        
                        <div className="mt-6">
                            <h4 className="font-semibold text-green-300 mb-3">Grade Distribution System</h4>
                            <div className="overflow-x-auto">
                                <svg viewBox="0 0 700 250" className="w-full">
                                    {/* Grade Scale */}
                                    <g transform="translate(0, 0)">
                                        <text x="10" y="30" fill="#9CA3AF" fontSize="14">Grade Classification Scale</text>
                                        
                                        {/* Grade bars */}
                                        {[
                                            {grade: "A+", range: "90-100", color: "#10B981", width: 120},
                                            {grade: "A", range: "80-89", color: "#34D399", width: 110},
                                            {grade: "B+", range: "70-79", color: "#3B82F6", width: 100},
                                            {grade: "B", range: "60-69", color: "#60A5FA", width: 90},
                                            {grade: "C", range: "50-59", color: "#F59E0B", width: 80},
                                            {grade: "D", range: "40-49", color: "#F97316", width: 70},
                                            {grade: "F", range: "0-39", color: "#EF4444", width: 60}
                                        ].map((item, idx) => (
                                            <g key={idx} transform={`translate(${idx * 100}, 50)`}>
                                                <rect x="0" y="0" width="80" height="40" rx="5" fill={item.color} className="hover:opacity-90 transition-opacity duration-300">
                                                    <animate attributeName="height" values="40;50;40" dur="2s" repeatCount="indefinite" begin={`${idx * 0.3}s`} />
                                                </rect>
                                                <text x="40" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{item.grade}</text>
                                                <text x="40" y="35" textAnchor="middle" fill="white" fontSize="10">{item.range}</text>
                                            </g>
                                        ))}
                                    </g>
                                    
                                    {/* Distribution Chart */}
                                    <g transform="translate(0, 120)">
                                        <text x="10" y="30" fill="#9CA3AF" fontSize="14">Sample Grade Distribution (500 Students)</text>
                                        
                                        {/* Chart bars */}
                                        {[
                                            {grade: "A+", count: 45, color: "#10B981"},
                                            {grade: "A", count: 85, color: "#34D399"},
                                            {grade: "B+", count: 120, color: "#3B82F6"},
                                            {grade: "B", count: 110, color: "#60A5FA"},
                                            {grade: "C", count: 75, color: "#F59E0B"},
                                            {grade: "D", count: 40, color: "#F97316"},
                                            {grade: "F", count: 25, color: "#EF4444"}
                                        ].map((item, idx) => (
                                            <g key={idx} transform={`translate(${50 + idx * 80}, 50)`}>
                                                <rect 
                                                    x="0" 
                                                    y={100 - item.count/2} 
                                                    width="40" 
                                                    height={item.count/2} 
                                                    fill={item.color} 
                                                    rx="3"
                                                    className="hover:opacity-90 transition-opacity duration-300"
                                                >
                                                    <animate attributeName="height" from="0" to={item.count/2} dur="1s" fill="freeze" begin={`${idx * 0.2}s`} />
                                                </rect>
                                                <text x="20" y={95 - item.count/2} textAnchor="middle" fill="white" fontSize="10">{item.count}</text>
                                                <text x="20" y="120" textAnchor="middle" fill="#9CA3AF" fontSize="10">{item.grade}</text>
                                            </g>
                                        ))}
                                        
                                        {/* Statistics */}
                                        <g transform="translate(500, 50)">
                                            <rect x="0" y="0" width="180" height="100" rx="5" fill="#1F2937" stroke="#374151" />
                                            <text x="10" y="20" fill="#10B981" fontSize="12" fontWeight="bold">Class Statistics</text>
                                            <line x1="10" y1="25" x2="170" y2="25" stroke="#4B5563" />
                                            
                                            <text x="10" y="45" fill="#D1D5DB" fontSize="10">Total Students: 500</text>
                                            <text x="10" y="60" fill="#D1D5DB" fontSize="10">Class Average: 68.5%</text>
                                            <text x="10" y="75" fill="#D1D5DB" fontSize="10">Top Grade: A+ (45 students)</text>
                                            <text x="10" y="90" fill="#D1D5DB" fontSize="10">Pass Rate: 95%</text>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Step 3: Report Generation */}
                <div className="animate-[fadeSlideUp_2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-yellow-300 border-b border-yellow-800 pb-2">
                        Step 3: Report Generation & Output
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={reportGeneration}
                                title="Comprehensive Report Generation"
                                highlightLines={[4, 8, 12, 16, 20, 24, 28, 32]}
                            />
                            
                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-900/50 rounded-lg border border-blue-500/20">
                                        <h4 className="font-semibold text-blue-300 mb-2">Report Types Generated</h4>
                                        <ul className="space-y-2 text-sm text-gray-300">
                                            <li className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                Individual student report cards
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                Class rank list with positions
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                Subject-wise performance analysis
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                Teacher summary with statistics
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-900/50 rounded-lg border border-green-500/20">
                                        <h4 className="font-semibold text-green-300 mb-2">Output Formats</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-center p-2 bg-gray-800/30 rounded">
                                                <div className="text-xs text-blue-400">CSV</div>
                                                <div className="text-xs text-gray-400">For Excel</div>
                                            </div>
                                            <div className="text-center p-2 bg-gray-800/30 rounded">
                                                <div className="text-xs text-green-400">TXT</div>
                                                <div className="text-xs text-gray-400">Readable</div>
                                            </div>
                                            <div className="text-center p-2 bg-gray-800/30 rounded">
                                                <div className="text-xs text-purple-400">HTML</div>
                                                <div className="text-xs text-gray-400">Web View</div>
                                            </div>
                                            <div className="text-center p-2 bg-gray-800/30 rounded">
                                                <div className="text-xs text-yellow-400">PDF</div>
                                                <div className="text-xs text-gray-400">Printable</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-900/50 rounded-lg border border-purple-500/20">
                                        <h4 className="font-semibold text-purple-300 mb-2">Sample Report Preview</h4>
                                        <div className="bg-gray-900 p-3 rounded border border-gray-700">
                                            <pre className="text-xs text-gray-300">
{`=========================================
      BARRACKPORE HIGH SCHOOL
      TERM EXAMINATION REPORT
=========================================

Student: Swadeep Roy
Roll No: 101
Class: XII-A

SUBJECTS    MARKS   GRADE   REMARKS
-----------------------------------------
Mathematics   92     A+     Excellent
Science       88     A      Very Good
English       85     A      Good
History       78     B+     Good
Computer      95     A+     Outstanding

-----------------------------------------
TOTAL:       438/500
AVERAGE:     87.6%
OVERALL:     A
RANK:        5/120
-----------------------------------------`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Complete Lab Solution */}
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-red-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={comprehensiveLab}
                                title="Complete Lab Solution - All Steps Combined"
                                highlightLines={[5, 10, 15, 20, 25, 30, 35, 40]}
                            />
                            
                            <div className="mt-6">
                                <h4 className="font-semibold text-red-300 mb-3">Lab Success Criteria</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/20">
                                        <div className="font-bold text-green-300 mb-1">✓ Must Achieve</div>
                                        <ul className="text-sm text-gray-300 space-y-1">
                                            <li>Clean all data inconsistencies</li>
                                            <li>Calculate correct averages</li>
                                            <li>Assign accurate grades</li>
                                            <li>Generate error-free reports</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/20">
                                        <div className="font-bold text-yellow-300 mb-1">★ Bonus Points</div>
                                        <ul className="text-sm text-gray-300 space-y-1">
                                            <li>Handle edge cases (absent students)</li>
                                            <li>Create graphical statistics</li>
                                            <li>Generate multiple report formats</li>
                                            <li>Optimize for performance</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Lab Challenges */}
                <div className="animate-[fadeSlideUp_2.2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-red-300 border-b border-red-800 pb-2">
                        Lab Challenges & Problem Solving
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 p-5 rounded-xl border border-red-700/30 hover:border-red-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-red-200">Common Challenges</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-red-900/20 rounded-lg">
                                        <h4 className="font-semibold text-red-300 mb-1">Challenge 1: Duplicate Records</h4>
                                        <p className="text-sm text-gray-300">Same student appears multiple times in different files</p>
                                        <div className="text-xs text-blue-400 mt-2">Solution: Use sort -u or awk '!seen[$0]++'</div>
                                    </div>
                                    
                                    <div className="p-3 bg-red-900/20 rounded-lg">
                                        <h4 className="font-semibold text-red-300 mb-1">Challenge 2: Missing Subjects</h4>
                                        <p className="text-sm text-gray-300">Some students missing marks for certain subjects</p>
                                        <div className="text-xs text-blue-400 mt-2">Solution: Use awk with default values or imputation</div>
                                    </div>
                                    
                                    <div className="p-3 bg-red-900/20 rounded-lg">
                                        <h4 className="font-semibold text-red-300 mb-1">Challenge 3: Performance Issues</h4>
                                        <p className="text-sm text-gray-300">Processing 500+ students takes too long</p>
                                        <div className="text-xs text-blue-400 mt-2">Solution: Optimize awk scripts, use associative arrays</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 p-5 rounded-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-blue-200">Debugging Strategies</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Test with Small Data</h4>
                                        <p className="text-sm text-gray-300">Create 5-student test files first</p>
                                        <div className="text-xs text-green-400 mt-2">When Abhronila from Shyamnagar tested with 5 students first, she caught 80% of bugs early</div>
                                    </div>
                                    
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Verify Intermediate Results</h4>
                                        <p className="text-sm text-gray-300">Save and check each processing step</p>
                                        <div className="text-xs text-green-400 mt-2">Use tee command: command | tee step1.out | next_command</div>
                                    </div>
                                    
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Compare with Manual Calculation</h4>
                                        <p className="text-sm text-gray-300">Verify results for few students manually</p>
                                        <div className="text-xs text-green-400 mt-2">Swadeep verified first 10 students manually to validate his script</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 p-5 rounded-xl border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-purple-200">Real-World Extensions</h3>
                                
                                <div className="space-y-4">
                                    <div className="p-3 bg-purple-900/20 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-green-300 mb-1">Attendance Integration</div>
                                                <p className="text-sm text-gray-300">
                                                    Combine marks with attendance data. Students with less than 75% attendance get grade reduction.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-3 bg-purple-900/20 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-yellow-300 mb-1">Parent Notification</div>
                                                <p className="text-sm text-gray-300">
                                                    Generate personalized emails/SMS for parents with their child's performance.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-3 bg-purple-900/20 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-blue-300 mb-1">Trend Analysis</div>
                                                <p className="text-sm text-gray-300">
                                                    Compare current term with previous terms to identify improvement/decline patterns.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 p-5 rounded-xl border border-green-700/30 hover:border-green-500/50 transition-all duration-300">
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-3 text-green-200">Success Story: Tuhina's Implementation</h3>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-300 text-sm">
                                                Tuhina from Naihati implemented this system for her school. 
                                                What took teachers 3 days manually now takes 5 minutes. 
                                                The script processes 600 students, generates 4 report types, 
                                                and even emails reports to parents automatically.
                                            </p>
                                            <div className="mt-2 text-sm text-green-400">
                                                Time saved: 99.7% | Accuracy: 100% | Teacher satisfaction: 100%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Teacher's Note */}
                <div className="animate-[fadeSlideUp_2.4s_ease-out] mb-12">
                    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/50 hover:border-blue-500/50 transition-all duration-500 group">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4 text-blue-300">Teacher's Note</h2>
                                <div className="mb-6 p-4 bg-gray-900/40 rounded-xl border border-gray-700">
                                    <p className="text-gray-300 leading-relaxed">
                                        Dear students, this lab is where theory meets practice. In my 27 years of teaching, 
                                        I've seen students who could recite every grep flag but couldn't solve a real problem. 
                                        This lab teaches you to think systematically. Remember Debangshu from Ichapur? 
                                        He failed this lab twice because he jumped straight to coding. On the third attempt, 
                                        he first wrote down: 1) What data I have, 2) What I need to produce, 3) Steps to get there. 
                                        He aced it. Plan first, code second.
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-blue-300">Sukanta Hui</div>
                                        <div className="text-sm text-gray-400">27 years experience</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-green-300">Lab Philosophy</div>
                                        <div className="text-sm text-gray-400">"Solve the problem, then write the code"</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-cyan-300">Contact</div>
                                        <div className="text-sm text-gray-400">sukantahui@codernaccotax.co.in</div>
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl">
                                    <h4 className="font-bold text-lg mb-2 text-yellow-200">Lab Evaluation Criteria</h4>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                        <li>Correctness (40%) - Does it produce right results?</li>
                                        <li>Efficiency (20%) - Does it process data optimally?</li>
                                        <li>Robustness (20%) - Does it handle edge cases?</li>
                                        <li>Code Quality (20%) - Is it readable and maintainable?</li>
                                    </ol>
                                    <p className="mt-3 text-sm text-gray-400">
                                        Tip: Document your approach. Even if code has issues, showing systematic thinking earns partial marks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Lab Completion Checklist */}
                <div className="animate-[fadeSlideUp_2.6s_ease-out]">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/30 transition-all duration-500">
                        <h2 className="text-2xl font-bold mb-6 text-emerald-300 border-b border-emerald-800 pb-2">
                            Lab Completion Checklist
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {[
                                    {task: "Setup test data files", status: "pending", points: 10},
                                    {task: "Clean and standardize data", status: "pending", points: 20},
                                    {task: "Calculate student averages", status: "pending", points: 20},
                                    {task: "Assign letter grades", status: "pending", points: 15}
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full ${item.status === 'completed' ? 'bg-green-500' : 'bg-gray-700'} flex items-center justify-center`}>
                                                {item.status === 'completed' ? (
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-200">{item.task}</h4>
                                                <div className="text-xs text-gray-400">{item.points} points</div>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-bold ${item.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {item.status === 'completed' ? '✓ Done' : 'Pending'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="space-y-4">
                                {[
                                    {task: "Generate rank list", status: "pending", points: 15},
                                    {task: "Create summary report", status: "pending", points: 10},
                                    {task: "Handle edge cases", status: "pending", points: 5},
                                    {task: "Optimize performance", status: "pending", points: 5}
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full ${item.status === 'completed' ? 'bg-green-500' : 'bg-gray-700'} flex items-center justify-center`}>
                                                {item.status === 'completed' ? (
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-200">{item.task}</h4>
                                                <div className="text-xs text-gray-400">{item.points} points</div>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-bold ${item.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {item.status === 'completed' ? '✓ Done' : 'Pending'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                            <h3 className="font-bold text-lg mb-3 text-blue-200">Hint Section</h3>
                            <p className="text-gray-300 italic">
                                Think about: How would you handle a student who was absent for one subject but attended others? 
                                Observe carefully: What patterns emerge when you look at top-performing vs struggling students? 
                                Try changing this: Instead of processing all students at once, what if you process by class sections first?
                            </p>
                        </div>
                        
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                            <h4 className="font-semibold text-purple-300 mb-2">Professional Implementation Tip</h4>
                            <p className="text-gray-300 text-sm">
                                When Swadeep implemented this for Barrackpore High School, he created a modular approach: 
                                1) data_cleaner.sh, 2) calculator.sh, 3) grader.sh, 4) reporter.sh. This allowed testing 
                                each module independently and made debugging 10x easier. The whole system processes 500 students 
                                in under 30 seconds on a basic laptop.
                            </p>
                        </div>
                        
                        <div className="mt-6 flex justify-between items-center p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
                            <div>
                                <div className="font-bold text-emerald-300">Total Possible Points: 100</div>
                                <div className="text-sm text-gray-400">Complete all tasks to achieve perfect score</div>
                            </div>
                            <div className="text-2xl font-bold text-emerald-400">Lab 23</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic23;