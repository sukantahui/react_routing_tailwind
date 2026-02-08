import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import studentReportSh from "./topic12_files/student_report.sh?raw";
import formattedTableSh from "./topic12_files/formatted_table.sh?raw";
import salesReportSh from "./topic12_files/sales_report.sh?raw";
import temperatureTableSh from "./topic12_files/temperature_table.sh?raw";

const Topic12 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6 md:p-8 lg:p-12 font-sans dark">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl blur-xl"></div>
                <div 
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 
                    transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/30 
                    animate-[fadeIn_0.8s_ease-out]"
                    style={{
                        animation: 'fadeIn 0.8s ease-out'
                    }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Topic 12: Formatting Output Using awk printf
                            </h1>
                            <p className="text-gray-400 mt-2">Professional-grade text formatting for readable reports</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-blue-300 mb-2">Prototype</h3>
                            <code className="text-sm bg-gray-800 p-2 rounded block">printf(format, item1, item2, ...)</code>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-purple-300 mb-2">Return Type</h3>
                            <p className="text-sm">Formatted string output (returns nothing, prints directly)</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-green-300 mb-2">Purpose</h3>
                            <p className="text-sm">Precise control over output formatting and layout</p>
                        </div>
                    </div>
                </div>
            </header>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes staggerItem {
                    0% { opacity: 0; transform: translateX(-10px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            <main className="max-w-6xl mx-auto space-y-12">
                {/* Theory Section */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                >
                    <h2 className="text-3xl font-bold mb-6 text-blue-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Conceptual Explanation
                    </h2>
                    
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>
                            The <code className="bg-gray-900 px-2 py-1 rounded">printf</code> function in awk provides 
                            C-style formatted output, giving you precise control over the appearance of your data. 
                            Unlike <code className="bg-gray-900 px-2 py-1 rounded">print</code>, which simply outputs 
                            values separated by OFS, <code>printf</code> allows you to specify exact widths, alignments, 
                            decimal precision, and formatting types.
                        </p>
                        
                        <div className="bg-gray-900/60 p-6 rounded-xl border-l-4 border-yellow-500">
                            <h3 className="font-bold text-yellow-300 mb-3">Why Use printf Over print?</h3>
                            <ul className="space-y-3 pl-5">
                                {[
                                    "Precise column alignment in tables",
                                    "Control over decimal places (e.g., 2 decimal places for currency)",
                                    "Right/left/center alignment of data",
                                    "Fixed-width columns for readable reports",
                                    "Custom separators and padding",
                                    "Formatting numbers with commas/thousands separators"
                                ].map((item, index) => (
                                    <li 
                                        key={index}
                                        className="flex items-center gap-3 animate-[staggerItem_0.3s_ease-out_forwards]"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Format Specifiers */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.1s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-purple-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M19 9l-7 7-7-7" />
                        </svg>
                        Format Specifiers Deep Dive
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-900/70">
                                    <th className="p-4 text-left border-b border-gray-700">Specifier</th>
                                    <th className="p-4 text-left border-b border-gray-700">Purpose</th>
                                    <th className="p-4 text-left border-b border-gray-700">Example</th>
                                    <th className="p-4 text-left border-b border-gray-700">Output</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {spec: '%s', purpose: 'String', example: 'printf("%s", "Hello")', output: 'Hello'},
                                    {spec: '%d', purpose: 'Integer', example: 'printf("%d", 42)', output: '42'},
                                    {spec: '%f', purpose: 'Floating point', example: 'printf("%.2f", 3.14159)', output: '3.14'},
                                    {spec: '%5d', purpose: 'Min width 5 chars', example: 'printf("%5d", 42)', output: '&nbsp;&nbsp;&nbsp;42'},
                                    {spec: '%-10s', purpose: 'Left-aligned string', example: 'printf("%-10s", "Name")', output: 'Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'},
                                    {spec: '%10s', purpose: 'Right-aligned string', example: 'printf("%10s", "Name")', output: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name'},
                                    {spec: '%0.3f', purpose: '3 decimal places', example: 'printf("%0.3f", 2.71828)', output: '2.718'},
                                ].map((row, index) => (
                                    <tr 
                                        key={index}
                                        className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200"
                                    >
                                        <td className="p-4 font-mono text-blue-400">{row.spec}</td>
                                        <td className="p-4">{row.purpose}</td>
                                        <td className="p-4 font-mono text-sm bg-gray-900/50 rounded">{row.example}</td>
                                        <td className="p-4 font-mono text-green-400" dangerouslySetInnerHTML={{__html: row.output}}></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Interactive SVG */}
                    <div className="mt-8 bg-gray-900/50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 text-yellow-300">printf Format String Anatomy</h3>
                        <div className="flex justify-center">
                            <svg width="600" height="120" className="hover:scale-105 transition-transform duration-300">
                                <defs>
                                    <linearGradient id="formatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#60a5fa', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#c084fc', stopOpacity: 1}} />
                                    </linearGradient>
                                </defs>
                                
                                {/* Format string base */}
                                <rect x="50" y="50" width="500" height="40" rx="8" fill="#1f2937" stroke="#4b5563" strokeWidth="2"/>
                                
                                {/* Percent sign */}
                                <rect x="60" y="55" width="40" height="30" rx="4" fill="#3b82f6" className="hover:fill-blue-400 transition-colors duration-300">
                                    <title>Percent sign - starts format specifier</title>
                                </rect>
                                <text x="80" y="75" textAnchor="middle" fill="white" fontSize="14" fontFamily="monospace">%</text>
                                
                                {/* Alignment */}
                                <rect x="110" y="55" width="40" height="30" rx="4" fill="#8b5cf6" className="hover:fill-purple-400 transition-colors duration-300">
                                    <title>Alignment flag: - for left, empty for right</title>
                                </rect>
                                <text x="130" y="75" textAnchor="middle" fill="white" fontSize="14" fontFamily="monospace">-</text>
                                
                                {/* Width */}
                                <rect x="160" y="55" width="60" height="30" rx="4" fill="#10b981" className="hover:fill-emerald-400 transition-colors duration-300">
                                    <title>Minimum width in characters</title>
                                </rect>
                                <text x="190" y="75" textAnchor="middle" fill="white" fontSize="14" fontFamily="monospace">10</text>
                                
                                {/* Precision */}
                                <rect x="230" y="55" width="60" height="30" rx="4" fill="#f59e0b" className="hover:fill-yellow-400 transition-colors duration-300">
                                    <title>Precision (.2 for 2 decimal places)</title>
                                </rect>
                                <text x="260" y="75" textAnchor="middle" fill="white" fontSize="14" fontFamily="monospace">.2</text>
                                
                                {/* Type */}
                                <rect x="300" y="55" width="40" height="30" rx="4" fill="#ef4444" className="hover:fill-red-400 transition-colors duration-300">
                                    <title>Type: s=string, d=integer, f=float</title>
                                </rect>
                                <text x="320" y="75" textAnchor="middle" fill="white" fontSize="14" fontFamily="monospace">f</text>
                                
                                {/* Labels */}
                                <text x="80" y="40" textAnchor="middle" fill="#93c5fd" fontSize="12">Start</text>
                                <text x="130" y="40" textAnchor="middle" fill="#a78bfa" fontSize="12">Alignment</text>
                                <text x="190" y="40" textAnchor="middle" fill="#34d399" fontSize="12">Width</text>
                                <text x="260" y="40" textAnchor="middle" fill="#fbbf24" fontSize="12">Precision</text>
                                <text x="320" y="40" textAnchor="middle" fill="#f87171" fontSize="12">Type</text>
                                
                                {/* Result arrow */}
                                <path d="M380,90 L450,90 L450,30 L520,30" fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5"/>
                                <polygon points="520,30 530,30 525,20 525,40" fill="#9ca3af"/>
                                <text x="480" y="20" textAnchor="middle" fill="#9ca3af" fontSize="12">Result: "&nbsp;&nbsp;&nbsp;3.14"</text>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Real-World Examples */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.2s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-green-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Real-World Examples
                    </h2>
                    
                    <div className="space-y-8">
                        {/* Example 1: Student Report */}
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <h3 className="text-xl font-bold mb-4 text-blue-300">Student Marks Report</h3>
                            <p className="mb-4">
                                When <strong>Abhronila</strong> from Barrackpore prepares student reports, she needs proper 
                                alignment for readability. Here's how printf helps:
                            </p>
                            <ShellFileLoader
                                fileModule={studentReportSh}
                                title="Student Report Formatter"
                                highlightLines={[3, 4, 5]}
                            />
                        </div>
                        
                        {/* Example 2: Sales Data */}
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <h3 className="text-xl font-bold mb-4 text-purple-300">Sales Data Formatting</h3>
                            <p className="mb-4">
                                <strong>Debangshu</strong> at Ichapur Electronics needs to format sales data with 
                                currency symbols and proper decimal places:
                            </p>
                            <ShellFileLoader
                                fileModule={salesReportSh}
                                title="Sales Report Generator"
                                highlightLines={[2, 3, 4]}
                            />
                        </div>
                    </div>
                </section>

                {/* Advanced Formatting */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.3s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-yellow-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Advanced Formatting Techniques
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-blue-300">Column-Based Tables</h3>
                            <ShellFileLoader
                                fileModule={formattedTableSh}
                                title="Professional Table Formatting"
                                highlightLines={[4, 5, 6]}
                            />
                            <div className="bg-gray-900/50 p-4 rounded-lg mt-4">
                                <h4 className="font-bold text-green-300 mb-2">Output Preview:</h4>
                                <pre className="text-sm font-mono">
{`| Name       | Age | Score | Grade |
|------------|-----|-------|-------|
| Tuhina     |  20 |  85.5 | B+    |
| Swadeep    |  21 |  92.0 | A     |
| Abhronila  |  19 |  78.5 | C+    |`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-purple-300">Scientific Data</h3>
                            <ShellFileLoader
                                fileModule={temperatureTableSh}
                                title="Temperature Conversion Table"
                                highlightLines={[3, 4, 5]}
                            />
                            <div className="mt-6">
                                <h4 className="font-bold text-yellow-300 mb-3">Pro Tips:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Use <code>%-20s</code> for left-aligned labels in reports</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span><code>printf</code> doesn't add newline automatically - add <code>\n</code></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Combine multiple specifiers: <code>"%-15s %6.2f %8d\n"</code></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common Pitfalls */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.4s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-red-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.338 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Common Pitfalls & Mistakes
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Missing Newline</h4>
                                <p className="text-sm">
                                    Forgetting <code>\n</code> causes all output on one line
                                </p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    printf("Hello") printf("World")  # Output: HelloWorld
                                </code>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Type Mismatch</h4>
                                <p className="text-sm">
                                    Using <code>%d</code> for float truncates decimal part
                                </p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    printf("%d", 3.14)  # Output: 3 (decimal lost!)
                                </code>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Argument Count Mismatch</h4>
                                <p className="text-sm">
                                    More specifiers than arguments causes undefined behavior
                                </p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    printf("%s %d", "Hello")  # Second value missing!
                                </code>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Precision with Strings</h4>
                                <p className="text-sm">
                                    <code>%.3s</code> truncates strings, not pads them
                                </p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    printf("%.3s", "Debangshu")  # Output: Deb
                                </code>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Best Practices */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.5s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-emerald-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Best Practices
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-blue-300">Professional Habits</h3>
                            <ul className="space-y-3">
                                {[
                                    "Always include \\n at the end of format strings",
                                    "Use variables for format strings in complex scripts",
                                    "Test with edge cases: very long strings, negative numbers",
                                    "Document column widths and alignments in comments",
                                    "Use consistent padding across related outputs"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300">Debugging Tips</h3>
                            <ul className="space-y-3">
                                {[
                                    "First test with simple print, then convert to printf",
                                    "Check argument count matches specifier count",
                                    "Verify decimal precision with sample data",
                                    "Test alignment with varying data lengths",
                                    "Use escape sequences (\\t, \\n) for readability"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Teacher's Note */}
                <section 
                    className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-900/30
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.6s'}}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-blue-300">Teacher's Note</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed">
                                    <strong className="text-yellow-300">Remember:</strong> <code>printf</code> is your 
                                    Swiss Army knife for formatted output. While <code>print</code> is great for quick 
                                    debugging, <code>printf</code> is what you use when presentation matters. 
                                </p>
                                
                                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-green-300 mb-2">Key Takeaways:</h4>
                                    <ul className="space-y-2">
                                        <li>• <code>printf</code> gives you pixel-perfect control over output layout</li>
                                        <li>• Always match format specifiers with variable types</li>
                                        <li>• Use width and precision for professional-looking tables</li>
                                        <li>• Remember: <code>printf</code> doesn't add newlines automatically!</li>
                                    </ul>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div>
                                        <p className="font-bold">Sukanta Hui</p>
                                        <p className="text-sm text-gray-400">27 years experience in Programming</p>
                                        <p className="text-sm text-gray-400">sukantahui@codernaccotax.co.in | 7003756860</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Skills: Shell Scripting, awk, sed, Linux</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mini Checklist */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.7s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-yellow-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        What Students Should Remember
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-green-300">Syntax Essentials</h3>
                            <div className="space-y-3">
                                {[
                                    "printf(format, arguments...) syntax",
                                    "Common specifiers: %s, %d, %f",
                                    "Width: %10s, Alignment: %-10s",
                                    "Precision: %.2f for 2 decimal places",
                                    "Escape sequences: \\n, \\t"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300"
                                    >
                                        <span className="text-blue-400 font-bold">{index + 1}.</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300">Practical Applications</h3>
                            <div className="space-y-3">
                                {[
                                    "Generate formatted reports from CSV data",
                                    "Create aligned tables for data display",
                                    "Format currency values with proper decimals",
                                    "Produce readable log file summaries",
                                    "Create consistent output in shell scripts"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300"
                                    >
                                        <span className="text-purple-400 font-bold">{index + 1}.</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hint Section */}
                <section 
                    className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.8s'}}
                >
                    <h2 className="text-2xl font-bold mb-6 text-purple-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Think About This...
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "If Swadeep from Naihati needs to display prices with exactly 2 decimal places 
                                and ₹ symbol before each, how would you format this using printf?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "Observe what happens when you use <code>%5.2f</code> on the number 123.456. 
                                Where does truncation occur?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "Try creating a formatted report where student names are left-aligned in 20-character 
                                columns and scores are right-aligned in 8-character columns with 2 decimal places."
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                        <p className="text-yellow-200">
                            <strong>Hint:</strong> Start with simple examples, then add complexity. Test each 
                            formatting option separately before combining them.
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800">
                <div className="text-center text-gray-500 text-sm">
                    <p>Topic 12: Formatting Output Using awk printf</p>
                    <p className="mt-2">Next Topic: Aggregations (sum, average, min, max using awk)</p>
                </div>
            </footer>
        </div>
    );
};

export default Topic12;