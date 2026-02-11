import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import example files
import getoptsBasic1 from "./topic22_files/getopts_basic1.sh?raw";
import getoptsAdvanced1 from "./topic22_files/getopts_advanced1.sh?raw";
import getoptsProduction1 from "./topic22_files/getopts_production1.sh?raw";
import optionComparison1 from "./topic22_files/option_comparison1.sh?raw";
import realWorldExample1 from "./topic22_files/real_world_example1.sh?raw";

const Topic22 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-violet-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 py-8">
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
        
        @keyframes optionFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes highlightOption {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {/* Header Section */}
      <div className={clsx(
        "max-w-6xl mx-auto mb-12",
        isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out]"
      )}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              Topic 22: Command-line Option Parsing with getopts
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Professional argument handling for robust, user-friendly shell scripts
            </p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="leading-relaxed">
            <code className="text-sm text-gray-700 dark:text-gray-300">getopts</code> is the professional's 
            choice for parsing command-line options in shell scripts. Unlike manual parsing with 
            <code className="text-sm text-gray-700 dark:text-gray-300">$1, $2, ...</code>, getopts provides 
            built-in support for short options (<code className="text-sm text-gray-700 dark:text-gray-300">-h</code>), 
            long options (<code className="text-sm text-gray-700 dark:text-gray-300">--help</code>), option arguments, 
            error handling, and more. It's essential for creating production-quality scripts that follow 
            Unix/Linux conventions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section 1: Why getopts? */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[100ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-violet-700 dark:text-violet-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Why Use getopts Instead of Manual Parsing?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Manual Parsing Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-red-200 dark:border-red-700 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-red-600 dark:text-red-300 font-bold text-xl">✗</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Manual Parsing ($1, $2...)
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-sm">Error-prone and verbose</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-sm">No built-in validation</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-sm">Hard to handle combined options (-xvf)</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <code className="text-xs text-gray-700 dark:text-gray-300">
                  {`# Manual parsing example (messy!)
while [ "$1" != "" ]; do
    case $1 in
        -f) shift; FILE=$1 ;;
        -v) VERBOSE=1 ;;
        *) echo "Unknown option"; exit 1 ;;
    esac
    shift
done`}
                </code>
              </div>
            </div>

            {/* getopts Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-200 dark:border-green-700 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-green-600 dark:text-green-300 font-bold text-xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  getopts (Built-in)
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Standardized and reliable</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Built-in error handling</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Supports combined short options (-xvf)</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <code className="text-xs text-gray-700 dark:text-gray-300">
                  {`# getopts example (clean!)
while getopts ":f:v" opt; do
    case $opt in
        f) FILE="$OPTARG" ;;
        v) VERBOSE=1 ;;
        ?) echo "Invalid option"; exit 1 ;;
    esac
done`}
                </code>
              </div>
            </div>
          </div>

          {/* Visual Diagram */}
          <div className="bg-gradient-to-r from-gray-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-8 border border-gray-300 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">getopts Data Flow</h4>
            <div className="flex flex-col items-center">
              <svg width="100%" height="180" className="overflow-visible">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
                  </marker>
                </defs>
                
                {/* Command line input */}
                <rect x="5%" y="20" width="25%" height="50" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="2" className="hover:fill-violet-200 transition-colors duration-300" />
                <text x="17.5%" y="45" textAnchor="middle" fill="#5b21b6" className="text-sm font-semibold">Command Line</text>
                <text x="17.5%" y="62" textAnchor="middle" fill="#7c3aed" className="text-xs">{`script.sh -f file.txt -v`}</text>
                
                {/* getopts processor */}
                <rect x="35%" y="20" width="25%" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" className="hover:fill-blue-200 transition-colors duration-300" />
                <text x="47.5%" y="45" textAnchor="middle" fill="#1e40af" className="text-sm font-semibold">getopts</text>
                <text x="47.5%" y="62" textAnchor="middle" fill="#1d4ed8" className="text-xs">Parser & Validator</text>
                
                {/* Variables */}
                <rect x="65%" y="20" width="30%" height="50" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" className="hover:fill-green-200 transition-colors duration-300" />
                <text x="80%" y="45" textAnchor="middle" fill="#065f46" className="text-sm font-semibold">Script Variables</text>
                <text x="80%" y="62" textAnchor="middle" fill="#047857" className="text-xs">FILE="file.txt", VERBOSE=1</text>
                
                {/* Arrows */}
                <path 
                  d="M150,45 L240,45" 
                  stroke="#8b5cf6" 
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
                  d="M340,45 L430,45" 
                  stroke="#8b5cf6" 
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
                
                {/* Option types at bottom */}
                <g transform="translate(0, 100)">
                  <rect x="10%" y="0" width="15%" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                  <text x="17.5%" y="18" textAnchor="middle" fill="#92400e" className="text-xs font-semibold">Short</text>
                  <text x="17.5%" y="28" textAnchor="middle" fill="#b45309" className="text-xs">-f file</text>
                  
                  <rect x="30%" y="0" width="15%" height="30" rx="6" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
                  <text x="37.5%" y="18" textAnchor="middle" fill="#9d174d" className="text-xs font-semibold">Combined</text>
                  <text x="37.5%" y="28" textAnchor="middle" fill="#be185d" className="text-xs">-xvf</text>
                  
                  <rect x="50%" y="0" width="15%" height="30" rx="6" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                  <text x="57.5%" y="18" textAnchor="middle" fill="#3730a3" className="text-xs font-semibold">Long</text>
                  <text x="57.5%" y="28" textAnchor="middle" fill="#4338ca" className="text-xs">--file</text>
                  
                  <rect x="70%" y="0" width="20%" height="30" rx="6" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="80%" y="18" textAnchor="middle" fill="#075985" className="text-xs font-semibold">With Args</text>
                  <text x="80%" y="28" textAnchor="middle" fill="#0369a1" className="text-xs">-o output</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* Section 2: Basic Syntax */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[200ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-violet-700 dark:text-violet-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            getopts Basic Syntax
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4 mb-6 overflow-x-auto">
              {["basic", "syntax", "variables", "colon"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap",
                    activeTab === tab
                      ? "bg-violet-500 text-white shadow-lg"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  )}
                >
                  {tab === "colon" ? "Colon Magic" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div>
              {activeTab === "basic" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">Basic Loop Structure</h4>
                    <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-4 rounded">
                      {`while getopts ":o:v" opt; do
    case $opt in
        o) OUTPUT_FILE="$OPTARG" ;;
        v) VERBOSE=1 ;;
        ?) echo "Invalid option: -$OPTARG" >&2; exit 1 ;;
    esac
done`}
                    </code>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <h5 className="font-bold text-blue-800 dark:text-blue-300 mb-1">getopts string</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <code className="text-xs">":o:v"</code> - Options specification
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <h5 className="font-bold text-green-800 dark:text-green-300 mb-1">opt variable</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <code className="text-xs">opt</code> - Current option character
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                      <h5 className="font-bold text-purple-800 dark:text-purple-300 mb-1">OPTARG</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <code className="text-xs">$OPTARG</code> - Argument for current option
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "syntax" && (
                <div className="space-y-6">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300">Option Specification String</h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                      <code className="text-lg font-mono text-blue-700 dark:text-blue-300">":f:vo:"</code>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm"><code className="text-xs">f:</code> - Option f with required argument</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm"><code className="text-xs">v</code> - Option v without argument</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-sm"><code className="text-xs">o:</code> - Option o with required argument</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
                      <h5 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Character Meanings</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <code className="text-xs bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">a:</code>
                          <span className="ml-2">Option 'a' requires argument</span>
                        </div>
                        <div>
                          <code className="text-xs bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">b</code>
                          <span className="ml-2">Option 'b' takes no argument</span>
                        </div>
                        <div>
                          <code className="text-xs bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">:</code>
                          <span className="ml-2">First char: silent error reporting</span>
                        </div>
                        <div>
                          <code className="text-xs bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">?</code>
                          <span className="ml-2">Invalid option placeholder</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "variables" && (
                <div className="space-y-6">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300">Built-in Variables</h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <div className="flex items-center mb-3">
                        <code className="text-lg font-mono text-green-700 dark:text-green-300 mr-3">$OPTARG</code>
                        <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded">Read-Only</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Contains the argument for the current option. Only set for options that require arguments.
                      </p>
                      <code className="text-xs text-gray-700 dark:text-gray-300 block bg-green-100 dark:bg-green-900 p-2 rounded mt-2">
                        {`# When parsing "-f file.txt", inside case for "f":`}
                        <br/>
                        {`f) filename="$OPTARG" ;;  # OPTARG contains "file.txt"`}
                      </code>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                      <div className="flex items-center mb-3">
                        <code className="text-lg font-mono text-purple-700 dark:text-purple-300 mr-3">$OPTIND</code>
                        <span className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">Index Variable</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The index of the next argument to be processed. Essential for accessing non-option arguments after getopts.
                      </p>
                      <code className="text-xs text-gray-700 dark:text-gray-300 block bg-purple-100 dark:bg-purple-900 p-2 rounded mt-2">
                        {`# After getopts loop:`}
                        <br/>
                        {`shift $((OPTIND - 1))  # Remove processed options`}
                        <br/>
                        {`# Now $1, $2... contain non-option arguments`}
                      </code>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "colon" && (
                <div className="space-y-6">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300">The Magic of Colon</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                      <h5 className="font-bold text-red-800 dark:text-red-300 mb-2">Without Leading Colon</h5>
                      <code className="text-sm text-gray-700 dark:text-gray-300 block bg-red-100 dark:bg-red-900 p-3 rounded">
                        {`while getopts "f:v" opt; do
    case $opt in
        f) FILE="$OPTARG" ;;
        v) VERBOSE=1 ;;
        \?) echo "Invalid option" ;;
    esac
done`}
                      </code>
                      <p className="text-sm text-red-700 dark:text-red-400 mt-2">
                        • getopts shows default error messages<br/>
                        • Script continues on errors<br/>
                        • Harder to customize
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                      <h5 className="font-bold text-green-800 dark:text-green-300 mb-2">With Leading Colon</h5>
                      <code className="text-sm text-gray-700 dark:text-gray-300 block bg-green-100 dark:bg-green-900 p-3 rounded">
                        {`while getopts ":f:v" opt; do
    case $opt in
        f) FILE="$OPTARG" ;;
        v) VERBOSE=1 ;;
        \?) echo "Invalid option: -$OPTARG" ;;
        :) echo "Option -$OPTARG requires argument" ;;
    esac
done`}
                      </code>
                      <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                        • Silent error reporting<br/>
                        • Custom error handling<br/>
                        • Better user experience
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h5 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Real Example from Barrackpore</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tuhina uses the leading colon in all her scripts at Barrackpore College. When a student 
                      types <code className="text-xs">backup.sh -f</code> without a filename, her script shows:
                      <code className="text-xs block bg-blue-100 dark:bg-blue-900 p-2 rounded mt-2">
                        Error: Option -f requires a filename argument
                      </code>
                      instead of the generic getopts error.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Basic Example */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[300ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-violet-700 dark:text-violet-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Basic getopts Example
          </h2>

          <ShellFileLoader
            fileModule={getoptsBasic1}
            title="Basic Option Parsing Script"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}
          />
          
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Test Commands</h4>
              <div className="space-y-2">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  {`./script.sh -f students.csv -o report.txt -v`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  {`./script.sh --help`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                  {`./script.sh -f data.txt`}
                </code>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">What This Does</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                  <span>Parses -f (file) with required argument</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                  <span>Handles -o (output) optional argument</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                  <span>Sets -v (verbose) flag</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></div>
                  <span>Shows help with --help or -h</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Key Learning</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notice the <code className="text-xs">shift $((OPTIND - 1))</code> on line 22. 
                This removes all processed options, leaving only non-option arguments in <code className="text-xs">$@</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Advanced Features */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[400ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Advanced getopts Features
          </h2>

          <ShellFileLoader
            fileModule={getoptsAdvanced1}
            title="Advanced Option Parsing"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]}
          />
          
          <div className="mt-6 space-y-6">
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Advanced Techniques Demonstrated</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-semibold text-amber-700 dark:text-amber-400">Option Grouping</h5>
                  <code className="text-xs text-gray-700 dark:text-gray-300 bg-amber-100 dark:bg-amber-900 p-2 rounded block">
                    {`-xvf`}  # Equivalent to -x -v -f
                  </code>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-amber-700 dark:text-amber-400">Multiple Arguments</h5>
                  <code className="text-xs text-gray-700 dark:text-gray-300 bg-amber-100 dark:bg-amber-900 p-2 rounded block">
                    {`-i file1 -i file2 -i file3`}
                  </code>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-amber-700 dark:text-amber-400">Validation</h5>
                  <code className="text-xs text-gray-700 dark:text-gray-300 bg-amber-100 dark:bg-amber-900 p-2 rounded block">
                    Check if argument is a valid file
                  </code>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-amber-700 dark:text-amber-400">Mutual Exclusion</h5>
                  <code className="text-xs text-gray-700 dark:text-gray-300 bg-amber-100 dark:bg-amber-900 p-2 rounded block">
                    {`-c`} and {`-d`} cannot be used together
                  </code>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Real Usage in Naihati Schools</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Swadeep uses this pattern for the student grade processing system. Teachers can combine options like:
                <code className="text-xs text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded mt-2">
                  {`process_grades.sh -c maths -i students.csv -i grades.csv -o report.pdf -v`}
                </code>
                This processes multiple input files for the maths class and generates a verbose PDF report.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Option Comparison */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[500ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            getopts vs getopt vs Manual Parsing
          </h2>

          <ShellFileLoader
            fileModule={optionComparison1}
            title="Comparison of Different Methods"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]}
          />
          
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-green-200 dark:border-green-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-green-800 dark:text-green-300 mb-3">getopts (Built-in)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Built into bash/shell</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Portable across systems</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>No long option support</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">getopt (External)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Supports long options</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>More features</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>External dependency</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-red-200 dark:border-red-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">Manual Parsing</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Full control</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Error prone</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Verbose code</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Production Example */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[600ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-emerald-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Production-Ready Script
          </h2>

          <ShellFileLoader
            fileModule={getoptsProduction1}
            title="Production Backup Script with getopts"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]}
          />
          
          <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700">
            <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-3">
              Scenario: Barrackpore College Backup System
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Abhronila uses this script for daily backups across multiple departments. The getopts implementation allows:
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm">1</span>
                </div>
                <span>Faculty to specify department with <code className="text-sm">-d</code></span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm">2</span>
                </div>
                <span>IT staff to set compression level with <code className="text-sm">-c</code></span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm">3</span>
                </div>
                <span>Automated scripts to run silently with <code className="text-sm">-q</code></span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm">4</span>
                </div>
                <span>Dry runs for testing with <code className="text-sm">-n</code></span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Real World Example */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[700ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-rose-700 dark:text-rose-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Real-World Application
          </h2>

          <ShellFileLoader
            fileModule={realWorldExample1}
            title="Student Database Management System"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]}
          />
          
          <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 rounded-xl border border-rose-200 dark:border-rose-700">
            <h4 className="font-bold text-rose-800 dark:text-rose-300 mb-2">How This Script is Used</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <code className="text-sm text-gray-700 dark:text-gray-300 bg-rose-100 dark:bg-rose-900 px-3 py-1 rounded mr-3">
                  {`./student_db.sh add -n "Tuhina Das" -a 18 -d "Computer Science" -e tuhina@barrackpore.edu`}
                </code>
                <span className="text-sm text-rose-700 dark:text-rose-400">Add new student</span>
              </div>
              <div className="flex items-start">
                <code className="text-sm text-gray-700 dark:text-gray-300 bg-rose-100 dark:bg-rose-900 px-3 py-1 rounded mr-3">
                  {`./student_db.sh search -d "Physics" -g A`}
                </code>
                <span className="text-sm text-rose-700 dark:text-rose-400">Search physics students with grade A</span>
              </div>
              <div className="flex items-start">
                <code className="text-sm text-gray-700 dark:text-gray-300 bg-rose-100 dark:bg-rose-900 px-3 py-1 rounded mr-3">
                  {`./student_db.sh report --format pdf --output annual_report.pdf`}
                </code>
                <span className="text-sm text-rose-700 dark:text-rose-400">Generate PDF report</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Common Pitfalls */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[800ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Common Pitfalls & Solutions
          </h2>

          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-200 dark:border-red-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">Pitfall 1: Forgetting to Shift</h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-red-100 dark:bg-red-900 p-2 rounded">
                  {`# WRONG: Non-option arguments still contain processed options
while getopts ":f:v" opt; do ... done
echo "First arg: $1"  # Still shows "-f" if called with "-f file other"`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-green-100 dark:bg-green-900 p-2 rounded">
                  {`# RIGHT: Shift processed options out
while getopts ":f:v" opt; do ... done
shift $((OPTIND - 1))
echo "First arg: $1"  # Now shows "other"`}
                </code>
                <p className="text-red-700 dark:text-red-400 text-sm">
                  Many students in Ichapur forget this step and wonder why their scripts behave strangely.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Pitfall 2: Missing Colon in Option String</h4>
              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded">
                    <code className="text-sm text-gray-700 dark:text-gray-300">{`"f:v"`}</code>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      • Shows default error messages<br/>
                      • Hard to customize
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded">
                    <code className="text-sm text-gray-700 dark:text-gray-300">{`":f:v"`}</code>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      • Silent error reporting<br/>
                      • Custom error handling
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Pitfall 3: Case Sensitivity</h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded">
                  {`# 'f' and 'F' are different options!
while getopts ":f:F:" opt; do
    case $opt in
        f) input_file="$OPTARG" ;;
        F) filter="$OPTARG" ;;
    esac
done`}
                </code>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  Debangshu spent hours debugging why <code className="text-xs">-F</code> wasn't working 
                  before realizing he was checking for <code className="text-xs">f</code> (lowercase) in his case statement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Best Practices */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[900ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-green-200 dark:border-green-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">Option Design</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use lowercase for common options, uppercase for special cases</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Always include <code className="text-sm">-h</code> or <code className="text-sm">--help</code></span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Validate option arguments immediately</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">Code Organization</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Define defaults before option parsing</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Group related options in the case statement</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use <code className="text-sm">shift $((OPTIND - 1))</code> consistently</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 10: Teacher's Note */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1000ms]"
        )}>
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-violet-300 dark:border-violet-700 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-violet-800 dark:text-violet-300">Teacher's Note</h3>
                <p className="text-sm text-violet-600 dark:text-violet-400">
                  Sukanta Hui • 27 years experience • Programming Languages, Web Development
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Professional Insight:</strong> In my 27 years of teaching across Barrackpore and Shyamnagar, 
                I've seen getopts transform amateur scripts into professional tools. The difference is immediately 
                visible in how users interact with your scripts.
              </p>

              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Remember These Golden Rules:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Always start your option string with a colon (<code className="text-sm">":"</code>) for silent error reporting</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Never forget <code className="text-sm">shift $((OPTIND - 1))</code> after your getopts loop</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Validate option arguments immediately in the case statement - don't defer validation</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pro Tip:</strong> When Swadeep builds scripts for Ichapur schools, he creates a 
                <code className="text-sm"> usage()</code> function that's called from the <code className="text-sm">-h</code> 
                option AND when option parsing fails. This ensures users always get helpful information, 
                reducing support calls by 80%.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-violet-200 dark:border-violet-700">
              <p className="text-sm text-violet-700 dark:text-violet-400">
                Email: sukantahui@codernaccotax.co.in • Mobile: 7003756860
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: Mini Checklist */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1100ms]"
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
                <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-violet-600 dark:text-violet-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Option String Syntax</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="text-sm">:o:v</code> - colon silent, o requires arg, v doesn't
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Key Variables</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="text-sm">$OPTARG</code>, <code className="text-sm">$OPTIND</code>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Must-Do Step</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="text-sm">shift $((OPTIND - 1))</code> after parsing
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Error Cases</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Handle <code className="text-sm">\?</code> and <code className="text-sm">:</code> in case
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1200ms]"
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
                <strong>Observe carefully:</strong> What happens when you run the basic script with 
                <code className="text-sm"> ./script.sh -f -v</code>? Why does <code className="text-sm">-v</code> 
                become the argument to <code className="text-sm">-f</code>? How could you prevent this?
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Try changing this:</strong> In the production script, what if Abhronila wants to add 
                a <code className="text-sm">--dry-run</code> option alongside <code className="text-sm">-n</code>? 
                How would you modify the getopts string and case statement?
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Consider:</strong> How would you modify the student database script to allow 
                <code className="text-sm"> --department="Computer Science"</code> (with equals sign) 
                in addition to <code className="text-sm"> -d "Computer Science"</code>?
              </p>
            </div>
          </div>
        </section>

        {/* Tips & Tricks Section */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1300ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-300">Professional Tips & Tricks</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-violet-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Option Validation Hack
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Validate file arguments immediately:
                <code className="text-sm block mt-1 bg-violet-100 dark:bg-violet-900 p-2 rounded">
                  {`f) [ -f "$OPTARG" ] || { echo "File not found: $OPTARG"; exit 1; }
   FILE="$OPTARG" ;;`}
                </code>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Debugging Shortcut
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add debug option to see parsed values:
                <code className="text-sm block mt-1 bg-blue-100 dark:bg-blue-900 p-2 rounded">
                  {`D) set -x ;;  # Enable debug mode`}
                </code>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Production Trick
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For Barrackpore scripts, I use descriptive error messages:
                <code className="text-sm block mt-1 bg-emerald-100 dark:bg-emerald-900 p-2 rounded">
                  {`:) echo "Option -$OPTARG requires an argument. See --help." >&2`}
                </code>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className={clsx(
        "max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-300 dark:border-gray-700",
        isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1400ms]"
      )}>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Topic 22: Command-line Option Parsing with getopts
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors duration-300">
              Previous: Process Management
            </button>
            <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300">
              Next: Using sed and awk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic22;