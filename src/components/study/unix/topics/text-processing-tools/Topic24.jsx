import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import shell script files (assuming they exist in the project structure)
import accessLogAnalysis1 from "./topic24_files/access_log_analysis1.sh?raw";
import accessLogAnalysis2 from "./topic24_files/access_log_analysis2.sh?raw";
import accessLogAnalysis3 from "./topic24_files/access_log_analysis3.sh?raw";
import errorAnalysis from "./topic24_files/error_analysis.sh?raw";
import bandwidthAnalysis from "./topic24_files/bandwidth_analysis.sh?raw";

const Topic24 = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { id: 0, title: "Log Format Understanding", description: "Apache/Nginx access log structure" },
        { id: 1, title: "Traffic Analysis", description: "Request counts, peak hours, popular pages" },
        { id: 2, title: "Error Monitoring", description: "4xx and 5xx status codes analysis" },
        { id: 3, title: "Security Insights", description: "Suspicious activities detection" },
        { id: 4, title: "Performance Metrics", description: "Response times, bandwidth usage" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-500">
            {/* Header Section */}
            <section className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
                <div className="max-w-6xl mx-auto">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6 animate-[slideInLeft_0.6s_ease-out]">
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                            Mini Project 02
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                        Server Access Log Analysis
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
                        A practical project to analyze web server logs using grep, awk, and sed for real-world insights
                    </p>

                    {/* Project Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Lines Analyzed", value: "10M+", color: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300" },
                            { label: "Tools Used", value: "5", color: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300" },
                            { label: "Key Metrics", value: "12", color: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300" },
                            { label: "Complexity", value: "Intermediate", color: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300" },
                        ].map((stat, idx) => (
                            <div 
                                key={idx}
                                className={clsx(
                                    "p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl",
                                    stat.color,
                                    "animate-[fadeInUp_0.8s_ease-out]"
                                )}
                                style={{ animationDelay: `${idx * 100}ms` }}
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
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                    {/* Left Column - Steps and Theory */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Project Scenario */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_0.9s_ease-out]">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Scenario</h2>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <strong>Imagine:</strong> Debangshu manages the school's web server at Barrackpore. The server logs have grown to 2GB. 
                                    He needs to extract insights without specialized tools. Using command-line utilities, he'll analyze:
                                </p>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300 pl-5">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Peak traffic hours to optimize server resources
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Most popular content to guide website improvements
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Error patterns (404s, 500s) for troubleshooting
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Suspicious activities (brute force attempts)
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Log Format Explanation */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_1s_ease-out]">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding Access Log Format</h2>
                            
                            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <code className="text-sm text-gray-800 dark:text-gray-200 block whitespace-pre-wrap">
                                    127.0.0.1 - - [10/Oct/2024:15:32:45 +0530] "GET /about.html HTTP/1.1" 200 2326<br />
                                    192.168.1.100 - abhronila [10/Oct/2024:15:32:46 +0530] "POST /login.php HTTP/1.1" 302 498<br />
                                    203.0.113.5 - - [10/Oct/2024:15:32:47 +0530] "GET /admin.php HTTP/1.1" 403 1271
                                </code>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                                {[
                                    { label: "Client IP", color: "bg-blue-100 dark:bg-blue-900/30" },
                                    { label: "Timestamp", color: "bg-green-100 dark:bg-green-900/30" },
                                    { label: "HTTP Method", color: "bg-yellow-100 dark:bg-yellow-900/30" },
                                    { label: "Status Code", color: "bg-red-100 dark:bg-red-900/30" },
                                    { label: "Bytes Sent", color: "bg-purple-100 dark:bg-purple-900/30" },
                                ].map((field, idx) => (
                                    <div 
                                        key={idx}
                                        className={clsx(
                                            "p-3 rounded-lg text-center transition-transform duration-300 hover:scale-105",
                                            field.color
                                        )}
                                    >
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{field.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Common Log Formats</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                                            <span className="text-sm font-bold text-green-600 dark:text-green-400">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 dark:text-gray-200">Common Log Format (CLF)</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">%h %l %u %t "%r" %s %b</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 dark:text-gray-200">Combined Log Format</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Adds Referrer and User-Agent</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Step-by-Step Analysis */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.1s_ease-out]">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Step-by-Step Analysis</h2>
                            
                            <div className="space-y-6">
                                {/* Step 1 */}
                                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10 rounded-r-lg">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                                            <span className="font-bold">1</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Traffic Volume Analysis</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Count total requests, analyze hourly patterns, identify peak traffic times
                                    </p>
                                    <ShellFileLoader
                                        fileModule={accessLogAnalysis1}
                                        title="Basic Traffic Analysis"
                                        highlightLines={[1, 4, 7]}
                                    />
                                </div>

                                {/* Step 2 */}
                                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/10 rounded-r-lg">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
                                            <span className="font-bold">2</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Popular Content & Pages</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Find most accessed URLs, identify broken links, optimize content strategy
                                    </p>
                                    <ShellFileLoader
                                        fileModule={accessLogAnalysis2}
                                        title="Page Popularity Analysis"
                                        highlightLines={[2, 5, 8]}
                                    />
                                </div>

                                {/* Step 3 */}
                                <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10 rounded-r-lg">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mr-3">
                                            <span className="font-bold">3</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Error Monitoring</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Detect 4xx client errors and 5xx server errors for quick troubleshooting
                                    </p>
                                    <ShellFileLoader
                                        fileModule={errorAnalysis}
                                        title="Error Pattern Detection"
                                        highlightLines={[1, 4, 7]}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Interactive Elements */}
                    <div className="space-y-8">
                        {/* Project Steps Navigation */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-[fadeInUp_0.8s_ease-out]">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Steps</h3>
                            <div className="space-y-3">
                                {steps.map((step, idx) => (
                                    <button
                                        key={step.id}
                                        onClick={() => setActiveStep(step.id)}
                                        className={clsx(
                                            "w-full text-left p-4 rounded-xl transition-all duration-300 transform",
                                            activeStep === step.id
                                                ? "bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 scale-[1.02]"
                                                : "bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-[1.01]"
                                        )}
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="flex items-center">
                                            <div className={clsx(
                                                "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                                activeStep === step.id
                                                    ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300"
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

                        {/* Advanced Analysis */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-[fadeInUp_0.9s_ease-out]">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Advanced Metrics</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Bandwidth Consumption</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        Calculate total bandwidth usage by file type
                                    </p>
                                    <ShellFileLoader
                                        fileModule={bandwidthAnalysis}
                                        title="Bandwidth Analysis"
                                        highlightLines={[2, 5, 9]}
                                    />
                                </div>
                                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
                                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">Security Analysis</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Detect brute force attacks and suspicious IPs
                                    </p>
                                    <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                                        <code className="block p-2 bg-gray-900 text-gray-100 rounded mb-2">
                                            {`grep "POST /login" access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -10`}
                                        </code>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Shows IPs with most login attempts
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Real-world Application */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-[fadeInUp_1s_ease-out]">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Real-world Application</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                                    <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                                        Tuhina's E-commerce Site
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Used log analysis to identify that 40% of 404 errors came from old product URLs. 
                                        Implemented redirects, improving user experience by 35%.
                                    </p>
                                </div>
                                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                                        Shyamnagar School Portal
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Discovered peak traffic at 10 AM daily. Scheduled server maintenance at 2 AM, 
                                        reducing downtime complaints by 90%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls Section */}
                <section className="mt-12 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.1s_ease-out]">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Common Pitfalls & Solutions</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300">Beginner Mistakes</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-rose-500 mr-2">✗</span>
                                    <span className="text-gray-700 dark:text-gray-300">Not checking log format before writing patterns</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-rose-500 mr-2">✗</span>
                                    <span className="text-gray-700 dark:text-gray-300">Forgetting to escape special characters in URLs</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-rose-500 mr-2">✗</span>
                                    <span className="text-gray-700 dark:text-gray-300">Analyzing incomplete log files (rotated logs)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-rose-500 mr-2">✗</span>
                                    <span className="text-gray-700 dark:text-gray-300">Ignoring timezone differences in timestamps</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Pro Tips</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-gray-700 dark:text-gray-300">Use <code>zcat</code> for compressed logs</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-gray-700 dark:text-gray-300">Combine logs with <code>cat access.log* | grep</code></span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-gray-700 dark:text-gray-300">Cache results: <code>analysis.sh | tee results.txt</code></span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-gray-700 dark:text-gray-300">Use <code>LC_ALL=C</code> for faster grep on ASCII logs</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Best Practices Section */}
                <section className="mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.2s_ease-out]">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Best Practices</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Validation</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Always verify log format and sample data before full analysis. Check for anomalies.
                            </p>
                        </div>
                        
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Performance</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Use pipe chains efficiently. Sort and unique operations should come after filtering.
                            </p>
                        </div>
                        
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Create reusable scripts with clear comments. Maintain analysis history for trend comparison.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Teacher's Note Section */}
                <section className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl animate-[fadeInUp_1.3s_ease-out]">
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
                            <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Remember This</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                When Abhronila first analyzed logs, she only counted requests. But real value comes from 
                                patterns: Why do errors spike at 3 PM? Why does one IP access only login pages? 
                                Think beyond counts to causality.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                            <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Pro Insight</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                In production, combine commands into scripts. For example, a daily report script 
                                that emails you top errors and suspicious activities. This transforms analysis from 
                                reactive to proactive monitoring.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                            <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Classroom Tip</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Start with small log samples from Naihati school's server. Gradually increase complexity. 
                                Debug each pipeline step separately before chaining. Use <code>tee</code> to inspect intermediate results.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Hint Section */}
                <section className="mt-12 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.4s_ease-out]">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Think About This...</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Pattern Recognition</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                If you see 10 failed logins from same IP, it's suspicious. But what if they're spaced 
                                30 minutes apart? Does that change your assessment?
                            </p>
                        </div>
                        
                        <div className="p-5 bg-white/50 dark:bg-gray-800/50 rounded-xl transform transition-all duration-300 hover:scale-[1.02]">
                            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Data Correlation</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                High traffic and high errors often correlate. But what if errors increase while 
                                traffic decreases? What could that indicate about your server health?
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mini Checklist */}
                <section className="mt-12 bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-2xl shadow-xl p-6 md:p-8 animate-[fadeInUp_1.5s_ease-out]">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Checklist</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4">
                        {[
                            "✓ Understand log format structure",
                            "✓ Count total requests and unique visitors",
                            "✓ Identify top 10 requested pages",
                            "✓ Detect 4xx and 5xx error patterns",
                            "✓ Find peak traffic hours",
                            "✓ Calculate bandwidth usage",
                            "✓ Identify suspicious activities",
                            "✓ Create summary report"
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
                    
                    <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                        <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">Next Steps Challenge</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Now try combining all analyses into a single script that generates a daily report. 
                            Format it for email with clear sections. Add alerting for critical errors exceeding threshold.
                        </p>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    Mini Project: Server Access Log Analysis • Topic 24 • Command Line Text Processing
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Apply these techniques to analyze your own server logs. Start with small files, validate results, then scale up.
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
                    .animate-\\[fadeInUp_1\\.5s_ease-out\\] {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Topic24;