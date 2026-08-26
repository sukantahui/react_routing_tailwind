import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import example files
import sedBasic1 from "./topic23_files/sed_basic1.sh?raw";
import sedAdvanced1 from "./topic23_files/sed_advanced1.sh?raw";
import awkBasic1 from "./topic23_files/awk_basic1.sh?raw";
import awkAdvanced1 from "./topic23_files/awk_advanced1.sh?raw";
import combinedExample1 from "./topic23_files/combined_example1.sh?raw";
import productionExample1 from "./topic23_files/production_example1.sh?raw";

const Topic23 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTool, setActiveTool] = useState("sed");
  const [activeExample, setActiveExample] = useState("basic");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 py-8">
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes textFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes pulseTransform {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>

      {/* Header Section */}
      <div className={clsx(
        "max-w-6xl mx-auto mb-12",
        isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out]"
      )}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
              Topic 23: Using sed and awk within Shell Scripts
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Mastering text processing powerhouses for data manipulation and transformation
            </p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="leading-relaxed">
            <code className="text-sm text-gray-700 dark:text-gray-300">sed</code> (Stream Editor) and 
            <code className="text-sm text-gray-700 dark:text-gray-300">awk</code> (Aho, Weinberger, Kernighan) 
            are the Swiss Army knives of Unix text processing. While <strong>sed</strong> excels at line-by-line 
            editing and pattern substitution, <strong>awk</strong> is a full-fledged programming language for 
            columnar data processing. Together, they can handle 90% of text processing tasks without 
            resorting to heavier tools like Python or Perl.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section 1: Tool Comparison */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[100ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-amber-700 dark:text-amber-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            sed vs awk: When to Use Which?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* sed Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">sed</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Stream Editor
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Line-by-line text transformation</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Pattern matching and substitution</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Simple, single-line commands</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Best For:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Search and replace in files</li>
                  <li>• Removing or adding text</li>
                  <li>• Simple text filtering</li>
                  <li>• In-place file editing</li>
                </ul>
              </div>
            </div>

            {/* awk Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-200 dark:border-green-700 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-green-600 dark:text-green-300 font-bold text-xl">awk</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Pattern Scanning & Processing
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Column/field-based processing</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Built-in variables and functions</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Arithmetic and string operations</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Best For:</h4>
                <ul className="text-sm space-y-1">
                  <li>• CSV/TSV data processing</li>
                  <li>• Column calculations and reports</li>
                  <li>• Data aggregation and summaries</li>
                  <li>• Complex text transformations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Visual Diagram */}
          <div className="bg-gradient-to-r from-gray-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-8 border border-gray-300 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Text Processing Flow</h4>
            <div className="flex flex-col items-center">
              <svg width="100%" height="180" className="overflow-visible">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                  </marker>
                </defs>
                
                {/* Input */}
                <rect x="5%" y="30" width="20%" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" className="hover:fill-amber-200 transition-colors duration-300" />
                <text x="15%" y="55" textAnchor="middle" fill="#92400e" className="text-sm font-semibold">Input File</text>
                <text x="15%" y="70" textAnchor="middle" fill="#b45309" className="text-xs">students.csv</text>
                
                {/* sed processing */}
                <rect x="30%" y="30" width="20%" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" className="hover:fill-blue-200 transition-colors duration-300" />
                <text x="40%" y="55" textAnchor="middle" fill="#1e40af" className="text-sm font-semibold">sed</text>
                <text x="40%" y="70" textAnchor="middle" fill="#1d4ed8" className="text-xs">Clean & Transform</text>
                
                {/* awk processing */}
                <rect x="55%" y="30" width="20%" height="50" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" className="hover:fill-green-200 transition-colors duration-300" />
                <text x="65%" y="55" textAnchor="middle" fill="#065f46" className="text-sm font-semibold">awk</text>
                <text x="65%" y="70" textAnchor="middle" fill="#047857" className="text-xs">Analyze & Report</text>
                
                {/* Output */}
                <rect x="80%" y="30" width="15%" height="50" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="2" className="hover:fill-purple-200 transition-colors duration-300" />
                <text x="87.5%" y="55" textAnchor="middle" fill="#5b21b6" className="text-sm font-semibold">Output</text>
                <text x="87.5%" y="70" textAnchor="middle" fill="#7c3aed" className="text-xs">report.txt</text>
                
                {/* Arrows */}
                <path 
                  d="M150,55 L210,55" 
                  stroke="#f59e0b" 
                  strokeWidth="3" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  strokeDasharray="5,5"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur="2s" 
                    repeatCount="indefinite" 
                  />
                </path>
                
                <path 
                  d="M270,55 L330,55" 
                  stroke="#f59e0b" 
                  strokeWidth="3" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  strokeDasharray="5,5"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur="2s" 
                    begin="0.5s"
                    repeatCount="indefinite" 
                  />
                </path>
                
                <path 
                  d="M390,55 L450,55" 
                  stroke="#f59e0b" 
                  strokeWidth="3" 
                  fill="none" 
                  markerEnd="url(#arrowhead)"
                  strokeDasharray="5,5"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="100" 
                    to="0" 
                    dur="2s" 
                    begin="1s"
                    repeatCount="indefinite" 
                  />
                </path>
                
                {/* Example data flow */}
                <g transform="translate(0, 110)">
                  <rect x="10%" y="0" width="15%" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
                  <text x="17.5%" y="18" textAnchor="middle" fill="#92400e" className="text-xs">John,Math,85</text>
                  
                  <rect x="30%" y="0" width="15%" height="30" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
                  <text x="37.5%" y="18" textAnchor="middle" fill="#1e40af" className="text-xs">JOHN,Math,85</text>
                  
                  <rect x="50%" y="0" width="15%" height="30" rx="6" fill="#dcfce7" stroke="#10b981" strokeWidth="1" />
                  <text x="57.5%" y="18" textAnchor="middle" fill="#065f46" className="text-xs">Math: 85</text>
                  
                  <rect x="70%" y="0" width="15%" height="30" rx="6" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1" />
                  <text x="77.5%" y="18" textAnchor="middle" fill="#5b21b6" className="text-xs">Math Avg: 85</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* Section 2: Tool Selector */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[200ms]"
        )}>
          <div className="flex space-x-4 mb-6 overflow-x-auto">
            {["sed", "awk"].map((tool) => (
              <button
                key={tool}
                onClick={() => setActiveTool(tool)}
                className={clsx(
                  "px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap",
                  activeTool === tool
                    ? tool === "sed" 
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {tool.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tool Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            {activeTool === "sed" && (
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">sed</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">sed - Stream Editor</h3>
                    <p className="text-gray-600 dark:text-gray-400">Reads input line by line, applies commands, outputs results</p>
                  </div>
                </div>

                {/* sed Examples Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto">
                  {["basic", "substitution", "deletion", "transformation"].map((example) => (
                    <button
                      key={example}
                      onClick={() => setActiveExample(example)}
                      className={clsx(
                        "px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm",
                        activeExample === example
                          ? "bg-blue-500 text-white shadow"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      )}
                    >
                      {example.charAt(0).toUpperCase() + example.slice(1)}
                    </button>
                  ))}
                </div>

                <div>
                  {activeExample === "basic" && (
                    <ShellFileLoader
                      fileModule={sedBasic1}
                      title="Basic sed Operations"
                      highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    />
                  )}

                  {activeExample === "substitution" && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-700 dark:text-gray-300">Substitution Commands</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded">
                            {`sed 's/old/new/' file.txt`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Replace first occurrence per line</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded">
                            {`sed 's/old/new/g' file.txt`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Replace all occurrences (global)</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded">
                            {`sed 's/old/new/2' file.txt`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Replace second occurrence only</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded">
                            {`sed 's/old/new/I' file.txt`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Case-insensitive replacement</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeExample === "deletion" && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-700 dark:text-gray-300">Deletion Commands</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block bg-red-100 dark:bg-red-900 p-2 rounded">
                            {`sed '5d' file.txt`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Delete line 5</p>
                        </div>
                        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block bg-red-100 dark:bg-red-900 p-2 rounded">
                            {`sed '1,3d' file.txt`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Delete lines 1-3</p>
                        </div>
                        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block bg-red-100 dark:bg-red-900 p-2 rounded">
                            {`sed '/pattern/d' file.txt`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Delete lines matching pattern</p>
                        </div>
                        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block bg-red-100 dark:bg-red-900 p-2 rounded">
                            {`sed '/start/,/end/d' file.txt`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Delete range between patterns</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeExample === "transformation" && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-700 dark:text-gray-300">Advanced Transformations</h4>
                      <ShellFileLoader
                        fileModule={sedAdvanced1}
                        title="Advanced sed Examples"
                        highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTool === "awk" && (
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                    <span className="text-green-600 dark:text-green-300 font-bold text-xl">awk</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">awk - Pattern Scanning Language</h3>
                    <p className="text-gray-600 dark:text-gray-400">Processes input as records and fields with built-in programming</p>
                  </div>
                </div>

                {/* awk Examples Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto">
                  {["basic", "fields", "patterns", "functions"].map((example) => (
                    <button
                      key={example}
                      onClick={() => setActiveExample(example)}
                      className={clsx(
                        "px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm",
                        activeExample === example
                          ? "bg-green-500 text-white shadow"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      )}
                    >
                      {example.charAt(0).toUpperCase() + example.slice(1)}
                    </button>
                  ))}
                </div>

                <div>
                  {activeExample === "basic" && (
                    <ShellFileLoader
                      fileModule={awkBasic1}
                      title="Basic awk Operations"
                      highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                    />
                  )}

                  {activeExample === "fields" && (
                    <div className="space-y-6">
                      <h4 className="font-bold text-gray-700 dark:text-gray-300">Field-Based Processing</h4>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg mb-4">
                        <h5 className="font-bold text-green-800 dark:text-green-300 mb-2">Built-in Variables</h5>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div>
                            <code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">$0</code>
                            <span className="text-sm ml-2">Entire line</span>
                          </div>
                          <div>
                            <code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">$1</code>
                            <span className="text-sm ml-2">First field</span>
                          </div>
                          <div>
                            <code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">$NF</code>
                            <span className="text-sm ml-2">Last field</span>
                          </div>
                          <div>
                            <code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">NR</code>
                            <span className="text-sm ml-2">Record number</span>
                          </div>
                          <div>
                            <code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">NF</code>
                            <span className="text-sm ml-2">Number of fields</span>
                          </div>
                          <div>
                            <code className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">FS</code>
                            <span className="text-sm ml-2">Field separator</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block">
                            {`# Print first and last field of each line`}
                            <br/>
                            {`awk '{print $1, $NF}' students.csv`}
                          </code>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block">
                            {`# Sum values in third column`}
                            <br/>
                            {`awk '{sum += $3} END {print "Total:", sum}' data.txt`}
                          </code>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block">
                            {`# Count lines with more than 5 fields`}
                            <br/>
                            {`awk 'NF > 5 {count++} END {print count}' file.txt`}
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeExample === "patterns" && (
                    <div className="space-y-6">
                      <h4 className="font-bold text-gray-700 dark:text-gray-300">Pattern Matching</h4>
                      
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg mb-4">
                        <h5 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Pattern Types</h5>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <code className="text-sm bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">{`/regex/`}</code>
                            <span className="text-sm ml-2">Regular expression</span>
                          </div>
                          <div>
                            <code className="text-sm bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">{`$3 > 50`}</code>
                            <span className="text-sm ml-2">Field comparison</span>
                          </div>
                          <div>
                            <code className="text-sm bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">BEGIN</code>
                            <span className="text-sm ml-2">Before processing</span>
                          </div>
                          <div>
                            <code className="text-sm bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">END</code>
                            <span className="text-sm ml-2">After processing</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block">
                            {`# Process only lines containing "Math"`}
                            <br/>
                            {`awk '/Math/ {print $1, $3}' students.csv`}
                          </code>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block">
                            {`# Students with score > 80`}
                            <br/>
                            {`awk '$3 > 80 {print $1, ":", $3}' grades.txt`}
                          </code>
                        </div>
                        
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                          <code className="text-sm text-gray-700 dark:text-gray-300 block">
                            {`# Add header and footer`}
                            <br/>
                            {`awk 'BEGIN {print "Student Report"}
                                 {print $0}
                                 END {print "Total:", NR, "students"}' file.txt`}
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeExample === "functions" && (
                    <div className="space-y-6">
                      <h4 className="font-bold text-gray-700 dark:text-gray-300">Built-in Functions</h4>
                      
                      <ShellFileLoader
                        fileModule={awkAdvanced1}
                        title="Advanced awk with Functions"
                        highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Combined Examples */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[300ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            sed + awk: Power Combination
          </h2>

          <div className="mb-8">
            <ShellFileLoader
              fileModule={combinedExample1}
              title="Combined sed and awk Processing"
              highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
            />
            
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <h4 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-3">
                Pipeline Strategy for Barrackpore College
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Tuhina uses this pipeline approach for processing student data:
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
                  </div>
                  <div>
                    <span className="font-medium">sed cleans the data:</span>
                    <code className="text-xs text-gray-700 dark:text-gray-300 block bg-purple-100 dark:bg-purple-900 p-1 rounded mt-1">
                      Remove extra spaces, fix formatting, standardize names
                    </code>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                  </div>
                  <div>
                    <span className="font-medium">awk analyzes the data:</span>
                    <code className="text-xs text-gray-700 dark:text-gray-300 block bg-purple-100 dark:bg-purple-900 p-1 rounded mt-1">
                      Calculate averages, generate reports, filter results
                    </code>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                  </div>
                  <div>
                    <span className="font-medium">sed formats the output:</span>
                    <code className="text-xs text-gray-700 dark:text-gray-300 block bg-purple-100 dark:bg-purple-900 p-1 rounded mt-1">
                      Add headers, adjust spacing, create final presentation
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-blue-300 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">sed First</h4>
              <code className="text-sm text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded">
                {`sed 's/,,/,NA,/g' | awk -F, '{...}'`}
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Clean data before processing with awk
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-green-300 dark:border-green-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">awk First</h4>
              <code className="text-sm text-gray-700 dark:text-gray-300 block bg-green-100 dark:bg-green-900 p-2 rounded">
                {`awk '{print $1}' | sed 's/\.$//'`}
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Extract data then clean with sed
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-purple-300 dark:border-purple-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Both Together</h4>
              <code className="text-sm text-gray-700 dark:text-gray-300 block bg-purple-100 dark:bg-purple-900 p-2 rounded">
                {`sed -n '10,20p' | awk 'NR%2==0'`}
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Extract range with sed, filter with awk
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Production Example */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[400ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-emerald-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Production-Ready Example
          </h2>

          <ShellFileLoader
            fileModule={productionExample1}
            title="Student Grade Processing System"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]}
          />
          
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl border border-emerald-200 dark:border-emerald-700">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Real Usage in Shyamnagar</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Swadeep runs this script monthly to process grades for 500+ students:
                <code className="text-xs text-gray-700 dark:text-gray-300 block bg-emerald-100 dark:bg-emerald-900 p-2 rounded mt-2">
                  {`./grade_processor.sh -i raw_grades.csv -o report_2024_03.pdf -t "March Report"`}
                </code>
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl border border-amber-200 dark:border-amber-700">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Key Techniques Used</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></div>
                  <span>sed for data cleaning and standardization</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></div>
                  <span>awk for calculations and aggregation</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></div>
                  <span>Pipeline chaining for efficiency</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></div>
                  <span>Error handling and validation</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Performance Tips */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[500ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Performance Optimization
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-red-200 dark:border-red-700">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">Common Performance Issues</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span>Too many sed/awk calls in loops</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span>Reading same file multiple times</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span>Using shell loops instead of awk arrays</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-green-200 dark:border-green-700">
              <h4 className="font-bold text-green-800 dark:text-green-300 mb-3">Optimization Tips</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Combine multiple sed commands with <code className="text-xs">-e</code></span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Use awk arrays for grouping instead of sort|uniq</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Process data in single pass when possible</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Performance Comparison</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">10s</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Shell loop with grep</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">2s</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Single sed command</div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">0.5s</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Optimized awk</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Abhronila reduced grade processing time from 10 minutes to 30 seconds by replacing shell loops 
              with optimized awk scripts for Ichapur school data.
            </p>
          </div>
        </section>

        {/* Section 6: Common Pitfalls */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[600ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Common Pitfalls & Solutions
          </h2>

          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-200 dark:border-red-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">Pitfall 1: Unquoted Special Characters</h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-red-100 dark:bg-red-900 p-2 rounded">
                  {`# WRONG: &, /, $ need escaping
sed s/old/new/ file.txt`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-green-100 dark:bg-green-900 p-2 rounded">
                  {`# RIGHT: Use different delimiters or escape
sed 's|old|new|' file.txt
sed 's/old\\/path/new\\/path/' file.txt`}
                </code>
                <p className="text-red-700 dark:text-red-400 text-sm">
                  Students in Barrackpore often struggle with paths containing slashes.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Pitfall 2: Forgetting sed -i Extension</h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-amber-100 dark:bg-amber-900 p-2 rounded">
                  {`# WRONG: No backup, dangerous on macOS
sed -i 's/old/new/' important.txt`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-green-100 dark:bg-green-900 p-2 rounded">
                  {`# RIGHT: Always provide backup extension
sed -i.bak 's/old/new/' important.txt
# Or test first
sed 's/old/new/' important.txt > test.txt`}
                </code>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Pitfall 3: awk Field Number Confusion</h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded">
                  {`# WRONG: Assuming fixed number of fields
awk '{print $5}' file.txt  # Might be empty!`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-green-100 dark:bg-green-900 p-2 rounded">
                  {`# RIGHT: Check NF or use $NF
awk 'NF >= 5 {print $5}' file.txt
awk '{print $(NF-1)}' file.txt  # Second from last`}
                </code>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  Debangshu spent hours debugging why his reports were empty before discovering some lines had fewer fields.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Best Practices */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[700ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-green-200 dark:border-green-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">sed Best Practices</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Always quote sed expressions</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use <code className="text-sm">-i.bak</code> for in-place editing</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Test with <code className="text-sm">sed -n</code> before making changes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">awk Best Practices</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Set <code className="text-sm">FS</code> and <code className="text-sm">OFS</code> explicitly</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use <code className="text-sm">BEGIN</code> for initialization</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Store complex scripts in separate files</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Teacher's Note */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[800ms]"
        )}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-300 dark:border-amber-700 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">Teacher's Note</h3>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Sukanta Hui • 27 years experience • Programming Languages, RDBMS
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Professional Insight:</strong> In my 27 years teaching across Barrackpore, Shyamnagar, and Ichapur, 
                I've seen sed and awk separate amateur scripters from professionals. These tools are not just commands—they're 
                complete text processing languages that can replace hundreds of lines of Python or Java code.
              </p>

              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Golden Rules for Mastery:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>sed is for editing, awk is for processing.</strong> Use sed when you need to change text, 
                    awk when you need to analyze it.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Always test with sample data first.</strong> Create a small test file before running on 
                    production data. Tuhina keeps a <code className="text-sm">test_samples/</code> directory for this.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>Learn regular expressions well.</strong> Both tools rely heavily on regex. Spend time 
                    mastering patterns—it pays back exponentially.</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pro Tip:</strong> When Swadeep processes Naihati school data, he writes complex awk scripts to files 
                (<code className="text-sm">process.awk</code>) and runs them with <code className="text-sm">awk -f process.awk data.csv</code>. 
                This makes them readable, reusable, and much easier to debug than one-liners.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-700">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Email: sukantahui@codernaccotax.co.in • Mobile: 7003756860
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Mini Checklist */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[900ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            What You Should Remember
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">sed Syntax</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="text-sm">sed 's/pattern/replacement/flags'</code>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">awk Structure</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="text-sm">{`pattern { action }`}</code>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Key Variables</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    sed: <code className="text-sm">&</code>, <code className="text-sm">\1</code><br/>
                    awk: <code className="text-sm">$0</code>, <code className="text-sm">$1</code>, <code className="text-sm">NR</code>, <code className="text-sm">NF</code>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Safety First</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Always backup: <code className="text-sm">sed -i.bak</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1000ms]"
        )}>
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-300 dark:border-cyan-700">
            <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-300 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Think About This...
            </h3>
            
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Observe carefully:</strong> What happens when you run <code className="text-sm">sed 's/.*/\U&/' file.txt</code>? 
                Why does <code className="text-sm">\U</code> work in GNU sed but not BSD sed? How would you make it portable?
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Try changing this:</strong> In the production script, what if Abhronila needs to handle 
                CSV files with quoted fields containing commas? How would you modify the awk field separator?
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Consider:</strong> How would you combine sed and awk to extract all email addresses from 
                a mixed-format log file and count how many are from the <code className="text-sm">@barrackpore.edu</code> domain?
              </p>
            </div>
          </div>
        </section>

        {/* Tips & Tricks Section */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1100ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-300">Professional Tips & Tricks</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                sed Portability Hack
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For case-insensitive search across sed versions:
                <code className="text-sm block mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded">
                  {`sed '/[Pp][Aa][Tt][Tt][Ee][Rr][Nn]/d'`}
                </code>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                awk Debugging Trick
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Print debugging info without stopping:
                <code className="text-sm block mt-1 bg-green-100 dark:bg-green-900 p-2 rounded">
                  {`awk '{print NR ": " $0 > "/dev/stderr"; print $1}'`}
                </code>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Production Trick
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For Barrackpore data, I pipe through tee to debug:
                <code className="text-sm block mt-1 bg-amber-100 dark:bg-amber-900 p-2 rounded">
                  {`sed '...' | tee /tmp/debug.log | awk '...'`}
                </code>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className={clsx(
        "max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-300 dark:border-gray-700",
        isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1200ms]"
      )}>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Topic 23: Using sed and awk within Shell Scripts
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors duration-300">
              Previous: Command-line Option Parsing
            </button>
            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300">
              Next: Debugging Techniques
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic23;