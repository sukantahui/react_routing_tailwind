import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import shell script files for CSV processing
import csvCleanup1 from "./topic25_files/csv_cleanup1.sh?raw";
import csvCleanup2 from "./topic25_files/csv_cleanup2.sh?raw";
import csvTransform1 from "./topic25_files/csv_transform1.sh?raw";
import csvValidation from "./topic25_files/csv_validation.sh?raw";
import csvReport from "./topic25_files/csv_report.sh?raw";

const Topic25 = () => {
    const [activeTransformation, setActiveTransformation] = useState(0);
    const [dataQuality, setDataQuality] = useState({
        completeness: 85,
        accuracy: 92,
        consistency: 78,
        timeliness: 95
    });

    const transformations = [
        { id: 0, title: "Data Cleaning", description: "Remove duplicates, fix formatting" },
        { id: 1, title: "Type Conversion", description: "Convert strings to proper types" },
        { id: 2, title: "Missing Values", description: "Handle nulls and empty fields" },
        { id: 3, title: "Data Validation", description: "Check constraints and rules" },
        { id: 4, title: "Format Standardization", description: "Consistent date/number formats" },
    ];

    const commonCSVIssues = [
        { issue: "Missing quotes", example: 'John,Doe,25,NY', impact: "High", fix: "Add proper quoting" },
        { issue: "Inconsistent delimiters", example: 'John,Doe;25;NY', impact: "High", fix: "Standardize delimiter" },
        { issue: "Mixed line endings", example: 'CRLF vs LF', impact: "Medium", fix: "Convert to uniform" },
        { issue: "UTF-8 BOM", example: 'ï»¿Header1,Header2', impact: "Low", fix: "Remove BOM" },
        { issue: "Extra commas in data", example: '"John","Doe, Jr.",25', impact: "High", fix: "Escape properly" },
    ];

    const handleQualityImprovement = (metric) => {
        setDataQuality(prev => ({
            ...prev,
            [metric]: Math.min(100, prev[metric] + 5)
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 transition-colors duration-500">
            {/* Header Section */}
            <section className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
                <div className="max-w-6xl mx-auto">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 mb-6 animate-[slideInLeft_0.6s_ease-out]">
                        <span className="text-sm font-semibold text-teal-700 dark:text-teal-300">
                            Mini Project 03
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                        Clean & Transform Raw CSV Data
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
                        A hands-on project to process messy CSV files using awk, sed, and grep for data quality improvement
                    </p>

                    {/* Project Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { 
                                label: "Data Quality", 
                                value: `${Math.round(Object.values(dataQuality).reduce((a, b) => a + b) / 4)}%`,
                                color: "bg-teal-100 dark:bg-teal-900/30", 
                                text: "text-teal-700 dark:text-teal-300",
                                metric: "overall"
                            },
                            { 
                                label: "Files Processed", 
                                value: "100+", 
                                color: "bg-indigo-100 dark:bg-indigo-900/30", 
                                text: "text-indigo-700 dark:text-indigo-300",
                                metric: "files"
                            },
                            { 
                                label: "Transformation Rules", 
                                value: "15", 
                                color: "bg-amber-100 dark:bg-amber-900/30", 
                                text: "text-amber-700 dark:text-amber-300",
                                metric: "rules"
                            },
                            { 
                                label: "Complexity Level", 
                                value: "Advanced", 
                                color: "bg-rose-100 dark:bg-rose-900/30", 
                                text: "text-rose-700 dark:text-rose-300",
                                metric: "complexity"
                            },
                        ].map((stat, idx) => (
                            <div 
                                key={idx}
                                className={clsx(
                                    "p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl",
                                    stat.color,
                                    "animate-[fadeInUp_0.8s_ease-out]"
                                )}
                                style={{ animationDelay: `${idx * 100}ms` }}
                                onClick={() => stat.metric && handleQualityImprovement(stat.metric)}
                            >
                                <div className="text-3xl font-bold mb-2 dark:text-white">{stat.value}</div>
                                <div className={clsx("text-sm font-medium", stat.text)}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Core Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Project Scenario */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.9s_ease-out]">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Real-World Challenge</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <strong>Situation:</strong> Swadeep at Ichapur Municipal Corporation received student data from 50 schools. 
                                    The CSV files have inconsistent formats, missing values, and duplicate records. He needs to:
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                                    <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                                        <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Problems Found</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li className="flex items-center">
                                                <span className="text-red-500 mr-2">•</span>
                                                Mixed date formats (DD/MM/YYYY, MM-DD-YYYY)
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-red-500 mr-2">•</span>
                                                Inconsistent school names (Abbreviations vs Full)
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-red-500 mr-2">•</span>
                                                Missing marks for transferred students
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-red-500 mr-2">•</span>
                                                Duplicate enrollment records
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Required Output</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                Standardized CSV format
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                Validated and cleaned data
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                Summary statistics report
                                            </li>
                                            <li className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span>
                                                Error log for manual review
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Sample Raw Data */}
                                <div className="mt-6">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Sample Raw CSV (Problematic):</h4>
                                    <div className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm font-mono">
<pre>{`ID,Name,DOB,School,Marks,Grade
101,"John, Doe",15/03/2005,Barrackpore HS,85,A
102,Mary Smith,03-15-2005,BP HS,92,
103,"Robert ""Bob"" Jr",2005-07-22,"Shyamnagar School",78,B
104,Jane Doe,22/07/2005,Barrackpore High School,85,A
101,"John, Doe",15/03/2005,Barrackpore HS,85,A
105,,31/12/2005,Naihati Academy,,C`}</pre>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Step-by-Step Transformation */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1s_ease-out]">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Transformation Pipeline</h2>
                            
                            <div className="space-y-6">
                                {/* Step 1 */}
                                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10 rounded-r-lg transform transition-all duration-300 hover:scale-[1.01]">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                                            <span className="font-bold">1</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Initial Cleanup</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Remove duplicates, fix basic formatting issues, and standardize headers
                                    </p>
                                    <ShellFileLoader
                                        fileModule={csvCleanup1}
                                        title="Basic CSV Cleanup"
                                        highlightLines={[3, 7, 12]}
                                    />
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Result:</span> Removes exact duplicates and empty lines
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/10 rounded-r-lg transform transition-all duration-300 hover:scale-[1.01]">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
                                            <span className="font-bold">2</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Data Validation</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Check for required fields, valid ranges, and consistency rules
                                    </p>
                                    <ShellFileLoader
                                        fileModule={csvValidation}
                                        title="CSV Validation Script"
                                        highlightLines={[5, 10, 15]}
                                    />
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Result:</span> Generates error report for manual review
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/10 rounded-r-lg transform transition-all duration-300 hover:scale-[1.01]">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center mr-3">
                                            <span className="font-bold">3</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Advanced Transformation</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Convert data types, standardize formats, and derive new columns
                                    </p>
                                    <ShellFileLoader
                                        fileModule={csvTransform1}
                                        title="Complex Data Transformation"
                                        highlightLines={[8, 14, 20]}
                                    />
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Result:</span> Uniform YYYY-MM-DD dates and standardized school names
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Common CSV Issues */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.1s_ease-out]">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common CSV Issues & Solutions</h2>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Issue</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Example</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Impact</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300">Solution</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commonCSVIssues.map((issue, idx) => (
                                            <tr 
                                                key={idx}
                                                className={clsx(
                                                    "border-b border-gray-100 dark:border-gray-800",
                                                    "hover:bg-gray-50 dark:hover:bg-gray-700/50",
                                                    "transition-colors duration-200",
                                                    "animate-[fadeInUp_0.8s_ease-out]"
                                                )}
                                                style={{ animationDelay: `${idx * 100}ms` }}
                                            >
                                                <td className="py-3 px-4">
                                                    <div className="font-medium text-gray-800 dark:text-gray-200">{issue.issue}</div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <code className="text-xs bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                                                        {issue.example}
                                                    </code>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={clsx(
                                                        "px-2 py-1 rounded-full text-xs font-medium",
                                                        issue.impact === "High" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                                                        issue.impact === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                                                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                    )}>
                                                        {issue.impact}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="text-gray-700 dark:text-gray-300">{issue.fix}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Interactive Elements */}
                    <div className="space-y-8">
                        {/* Transformation Steps */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-[fadeInUp_0.8s_ease-out]">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Transformation Steps</h3>
                            <div className="space-y-3">
                                {transformations.map((step, idx) => (
                                    <button
                                        key={step.id}
                                        onClick={() => setActiveTransformation(step.id)}
                                        className={clsx(
                                            "w-full text-left p-4 rounded-xl transition-all duration-300 transform",
                                            activeTransformation === step.id
                                                ? "bg-teal-50 dark:bg-teal-900/30 border-l-4 border-teal-500 scale-[1.02]"
                                                : "bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-[1.01]"
                                        )}
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="flex items-center">
                                            <div className={clsx(
                                                "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                                activeTransformation === step.id
                                                    ? "bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-300"
                                                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                            )}>
                                                <span className="font-bold">{step.id + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">{step.title}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Data Quality Dashboard */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-[fadeInUp_0.9s_ease-out]">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Quality Dashboard</h3>
                            <div className="space-y-4">
                                {Object.entries(dataQuality).map(([metric, value]) => (
                                    <div key={metric} className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                                {metric}
                                            </span>
                                            <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                                                {value}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => {
                                            Object.keys(dataQuality).forEach(metric => {
                                                handleQualityImprovement(metric);
                                            });
                                        }}
                                        className="w-full py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-300"
                                    >
                                        Apply All Transformations
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Commands Reference */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-[fadeInUp_1s_ease-out]">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Commands</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Count CSV Rows</h4>
                                    <code className="text-sm text-gray-700 dark:text-gray-300 block">
                                        {`awk 'END {print NR}' file.csv`}
                                    </code>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Remove Header</h4>
                                    <code className="text-sm text-gray-700 dark:text-gray-300 block">
                                        tail -n +2 file.csv
                                    </code>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Extract Columns</h4>
                                    <code className="text-sm text-gray-700 dark:text-gray-300 block">
                                        cut -d',' -f1,3 file.csv
                                    </code>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Find Duplicates</h4>
                                    <code className="text-sm text-gray-700 dark:text-gray-300 block">
                                        awk -F',' 'seen[$0]++' file.csv
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Report Generation Section */}
                <section className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.2s_ease-out]">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Report Generation</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                        <div className="p-5 bg-white/70 dark:bg-gray-800/70 rounded-xl">
                            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Summary Statistics</h3>
                            <ShellFileLoader
                                fileModule={csvReport}
                                title="Generate Analysis Report"
                                highlightLines={[4, 9, 14]}
                            />
                        </div>
                        
                        <div className="p-5 bg-white/70 dark:bg-gray-800/70 rounded-xl">
                            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Sample Output</h3>
                            <div className="p-4 bg-gray-900 text-gray-100 rounded-lg text-sm font-mono">
<pre>{`=== CSV DATA QUALITY REPORT ===
Generated: 2024-03-15 14:30:45
File: students_cleaned.csv

SUMMARY STATISTICS:
Total Records: 1,045
Valid Records: 987 (94.5%)
Invalid Records: 58 (5.5%)
Duplicate Removed: 12

FIELD COMPLETENESS:
Name: 100.0%
DOB: 99.8%
School: 100.0%
Marks: 92.3%
Grade: 88.7%

DATA DISTRIBUTION:
Schools: Barrackpore HS (45%), Shyamnagar (30%), Naihati (25%)
Grade A: 42%, Grade B: 35%, Grade C: 23%
Average Marks: 78.5

ISSUES FOUND:
- 15 records with future DOB
- 8 records with marks > 100
- 22 records missing grades
- 13 inconsistent school names`}</pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Best Practices Section */}
                <section className="mt-12 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.3s_ease-out]">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">CSV Processing Best Practices</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Always Backup First</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Create a copy before transformation. Use: <code>cp original.csv backup/</code>
                            </p>
                        </div>
                        
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Test Incrementally</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Apply transformations on sample data first. Use: <code>{`head -100 data.csv > sample.csv`}</code>
                            </p>
                        </div>
                        
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Log Everything</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Keep transformation logs: <code>{`script.sh 2>&1 | tee transformation.log`}</code>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Teacher's Note Section */}
                <section className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_1.4s_ease-out]">
                    <div className="flex items-start mb-6">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                <span className="text-xl font-bold text-white">SH</span>
                            </div>
                        </div>
                        <div className="ml-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Teacher's Note</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Sukanta Hui • 27 years experience • sukantahui@codernaccotax.co.in
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                            <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Critical Insight</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When Abhronila processed Naihati school data, she found 5% duplicates. But upon checking, 
                                some were legitimate transfers between Barrackpore and Shyamnagar branches. 
                                <strong> Never auto-delete without domain knowledge.</strong>
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                            <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Pro Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Create a validation pipeline that runs daily. Use <code>cron</code> to check new CSV uploads 
                                and email Tuhina if data quality drops below 90%. Automation prevents garbage-in, garbage-out.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                            <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Classroom Strategy</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Start with intentionally messy data. Ask Debangshu to fix it. Then reveal there were 
                                10 hidden issues. This teaches attention to detail better than perfect examples.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Hint Section */}
                <section className="mt-12 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.5s_ease-out]">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Think About This...</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                            <h3 className="font-semibold text-violet-700 dark:text-violet-300 mb-2">Edge Cases</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                What if a student's name contains a comma? How should <code>"Doe, John Jr."</code> 
                                be handled differently from regular comma-separated values?
                            </p>
                        </div>
                        
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                            <h3 className="font-semibold text-violet-700 dark:text-violet-300 mb-2">Data Integrity</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                If marks are out of 100, what's more likely: a student scoring 101 (data error) 
                                or scoring -5 (different scoring system)? How would you validate this?
                            </p>
                        </div>
                    </div>
                </section>

                {/* Project Checklist */}
                <section className="mt-12 bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.6s_ease-out]">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Completion Checklist</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            "✓ Verify CSV encoding (UTF-8)",
                            "✓ Check for BOM character",
                            "✓ Validate delimiter consistency",
                            "✓ Remove empty rows",
                            "✓ Standardize date formats",
                            "✓ Handle missing values",
                            "✓ Remove exact duplicates",
                            "✓ Generate quality report"
                        ].map((item, idx) => (
                            <div 
                                key={idx}
                                className="flex items-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <span className="text-green-500 mr-3">●</span>
                                <span className="text-gray-800 dark:text-gray-200">{item}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">Advanced Challenge</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Create a complete ETL pipeline: Extract from messy CSV, Transform using all techniques learned, 
                            Load into a clean database table. Add error recovery so processing continues even if some rows fail.
                        </p>
                        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                            Hint: Use <code>while IFS= read -r line; do ... done &lt; input.csv</code> for row-by-row processing with error handling.
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    Mini Project: CSV Data Cleaning & Transformation • Topic 25 • Command Line Text Processing
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Real data is always messy. These skills turn chaos into actionable insights.
                </p>
            </footer>

            {/* Inline Styles for Animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .animate-\\[fadeInUp_0\\.8s_ease-out\\],
                    .animate-\\[slideInLeft_0\\.6s_ease-out\\],
                    .animate-\\[fadeInUp_0\\.9s_ease-out\\],
                    .animate-\\[fadeInUp_1s_ease-out\\],
                    .animate-\\[fadeInUp_1\\.1s_ease-out\\],
                    .animate-\\[fadeInUp_1\\.2s_ease-out\\],
                    .animate-\\[fadeInUp_1\\.3s_ease-out\\],
                    .animate-\\[fadeInUp_1\\.4s_ease-out\\],
                    .animate-\\[fadeInUp_1\\.5s_ease-out\\],
                    .animate-\\[fadeInUp_1\\.6s_ease-out\\] {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Topic25;