// Topic10.jsx - Quoting rules: single, double quotes and escaping characters
import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import quotingBasic from "./topic10_files/quoting_basic.sh?raw";
import quotingVariables from "./topic10_files/quoting_variables.sh?raw";
import quotingSpecialChars from "./topic10_files/quoting_special_chars.sh?raw";
import quotingCommandSub from "./topic10_files/quoting_command_sub.sh?raw";
import quotingNested from "./topic10_files/quoting_nested.sh?raw";
import quotingPitfalls from "./topic10_files/quoting_pitfalls.sh?raw";

const Topic10 = () => {
  const [activeExample, setActiveExample] = useState("basic");
  const [hoveredQuoteType, setHoveredQuoteType] = useState(null);

  const examples = {
    basic: "Basic Quoting Examples",
    variables: "Variables in Quotes",
    special: "Special Characters",
    commandsub: "Command Substitution",
    nested: "Nested Quotes",
    pitfalls: "Common Pitfalls"
  };

  // SVG Component for visual explanation
  const QuotingLevelsSVG = () => {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500">
        <svg 
          viewBox="0 0 900 500" 
          className="w-full h-auto"
          aria-label="Quoting Levels Visualization"
        >
          <defs>
            <linearGradient id="singleQuoteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="doubleQuoteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="escapeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.9" />
            </linearGradient>
            
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
            </marker>
            
            <pattern id="literalPattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,0 L20,20 M20,0 L0,20" stroke="#10B981" strokeWidth="1" opacity="0.3" />
            </pattern>
            <pattern id="interpretPattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <circle cx="10" cy="10" r="2" fill="#3B82F6" opacity="0.3" />
            </pattern>
          </defs>
          
          {/* Title */}
          <text x="450" y="40" textAnchor="middle" fill="#1F2937" fontSize="20" fontWeight="bold" className="dark:fill-gray-200">
            Shell Quoting Levels - From Most to Least Protective
          </text>
          
          {/* Single Quotes Level */}
          <g 
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredQuoteType("single")}
            onMouseLeave={() => setHoveredQuoteType(null)}
            transform={hoveredQuoteType === "single" ? "scale(1.02)" : "scale(1)"}
          >
            <rect 
              x="100" y="80" 
              width="700" height="80" 
              rx="15"
              fill="url(#singleQuoteGradient)"
              stroke="#059669"
              strokeWidth={hoveredQuoteType === "single" ? "4" : "2"}
              filter={hoveredQuoteType === "single" ? "url(#glow)" : "none"}
            />
            <text x="450" y="115" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
              Single Quotes: 'Everything is literal'
            </text>
            <text x="450" y="140" textAnchor="middle" fill="#D1FAE5" fontSize="14">
              No variable expansion • No command substitution • No globbing
            </text>
            
            {/* Pattern overlay */}
            <rect x="100" y="80" width="700" height="80" rx="15" fill="url(#literalPattern)" opacity="0.2" />
            
            {/* Example */}
            <g transform="translate(120 170)">
              <rect x="0" y="0" width="660" height="50" rx="8" fill="#064E3B" fillOpacity="0.3" />
              <text x="20" y="20" fill="#D1FAE5" fontSize="14" fontWeight="bold">Example:</text>
              <text x="120" y="20" fill="#A7F3D0" fontSize="14" fontFamily="monospace">{`echo '$HOME is $HOME'`}</text>
              <text x="20" y="40" fill="#D1FAE5" fontSize="14" fontWeight="bold">Output:</text>
              <text x="120" y="40" fill="#A7F3D0" fontSize="14" fontFamily="monospace">{`$HOME is $HOME`}</text>
            </g>
          </g>
          
          {/* Double Quotes Level */}
          <g 
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredQuoteType("double")}
            onMouseLeave={() => setHoveredQuoteType(null)}
            transform={`translate(0 130) ${hoveredQuoteType === "double" ? "scale(1.02)" : "scale(1)"}`}
          >
            <rect 
              x="100" y="80" 
              width="700" height="80" 
              rx="15"
              fill="url(#doubleQuoteGradient)"
              stroke="#1D4ED8"
              strokeWidth={hoveredQuoteType === "double" ? "4" : "2"}
              filter={hoveredQuoteType === "double" ? "url(#glow)" : "none"}
            />
            <text x="450" y="115" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
              Double Quotes: "Interpret variables and commands"
            </text>
            <text x="450" y="140" textAnchor="middle" fill="#DBEAFE" fontSize="14">
              Variable expansion ✓ • Command substitution ✓ • Globbing ✗
            </text>
            
            {/* Pattern overlay */}
            <rect x="100" y="80" width="700" height="80" rx="15" fill="url(#interpretPattern)" opacity="0.2" />
            
            {/* Example */}
            <g transform="translate(120 170)">
              <rect x="0" y="0" width="660" height="50" rx="8" fill="#1E3A8A" fillOpacity="0.3" />
              <text x="20" y="20" fill="#DBEAFE" fontSize="14" fontWeight="bold">Example:</text>
              <text x="120" y="20" fill="#BFDBFE" fontSize="14" fontFamily="monospace">{`echo "Your home is $HOME"`}</text>
              <text x="20" y="40" fill="#DBEAFE" fontSize="14" fontWeight="bold">Output:</text>
              <text x="120" y="40" fill="#BFDBFE" fontSize="14" fontFamily="monospace">{`Your home is /home/user`}</text>
            </g>
          </g>
          
          {/* Escape Character Level */}
          <g 
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredQuoteType("escape")}
            onMouseLeave={() => setHoveredQuoteType(null)}
            transform={`translate(0 260) ${hoveredQuoteType === "escape" ? "scale(1.02)" : "scale(1)"}`}
          >
            <rect 
              x="100" y="80" 
              width="700" height="80" 
              rx="15"
              fill="url(#escapeGradient)"
              stroke="#D97706"
              strokeWidth={hoveredQuoteType === "escape" ? "4" : "2"}
              filter={hoveredQuoteType === "escape" ? "url(#glow)" : "none"}
            />
            <text x="450" y="115" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
              Backslash Escape: \Character by character control
            </text>
            <text x="450" y="140" textAnchor="middle" fill="#FEF3C7" fontSize="14">
              Escape next character • Preserve special meaning • Precise control
            </text>
            
            {/* Example */}
            <g transform="translate(120 170)">
              <rect x="0" y="0" width="660" height="50" rx="8" fill="#92400E" fillOpacity="0.3" />
              <text x="20" y="20" fill="#FEF3C7" fontSize="14" fontWeight="bold">Example:</text>
              <text x="120" y="20" fill="#FDE68A" fontSize="14" fontFamily="monospace">{`echo Path: \$HOME or \\$HOME`}</text>
              <text x="20" y="40" fill="#FEF3C7" fontSize="14" fontWeight="bold">Output:</text>
              <text x="120" y="40" fill="#FDE68A" fontSize="14" fontFamily="monospace">{`Path: $HOME or $HOME`}</text>
            </g>
          </g>
          
          {/* Protection Level Indicator */}
          <g transform="translate(50 0)">
            <text x="0" y="150" textAnchor="start" fill="#6B7280" fontSize="12" fontWeight="bold" transform="rotate(-90 0 150)">
              MOST PROTECTION
            </text>
            <text x="0" y="280" textAnchor="start" fill="#6B7280" fontSize="12" fontWeight="bold" transform="rotate(-90 0 280)">
              BALANCED
            </text>
            <text x="0" y="410" textAnchor="start" fill="#6B7280" fontSize="12" fontWeight="bold" transform="rotate(-90 0 410)">
              LEAST PROTECTION
            </text>
            
            {/* Connecting line */}
            <line x1="30" y1="100" x2="30" y2="450" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5" />
          </g>
          
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.8s_ease-out]">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Topic 10: Quoting Rules
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Single quotes, double quotes and escaping characters - Controlling shell interpretation
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Theory */}
          <div className="lg:col-span-2 space-y-8">
            {/* Section 1: Introduction */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-300 flex items-center gap-3">
                <span className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">📘</span>
                Why Quoting Matters in Shell Scripts
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Quoting controls <strong>how the shell interprets special characters</strong> like spaces, dollar signs, asterisks, and more. It's the difference between telling the shell "treat this as data" versus "execute this as a command."
              </p>
              
              <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded">
                <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2">Real-world Analogy</h3>
                <p className="text-indigo-700 dark:text-indigo-400">
                  Think of <strong>Abhronila</strong> writing a letter. If she writes "Call me at 7PM", her friend knows to call at 7. If she writes <code className="bg-indigo-100 dark:bg-indigo-800 px-1 rounded">"Call me at $TIME"</code> and $TIME=7PM, her friend sees "Call me at 7PM". If she writes <code className="bg-indigo-100 dark:bg-indigo-800 px-1 rounded">'Call me at $TIME'</code>, her friend sees the literal text "$TIME". Quoting changes interpretation.
                </p>
              </div>
            </section>

            {/* Section 2: Visual Explanation */}
            <section className="animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <QuotingLevelsSVG />
            </section>

            {/* Section 3: Detailed Explanation */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
              <h2 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-emerald-300 flex items-center gap-3">
                <span className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">🔧</span>
                How Shell Quoting Works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-400 transition-all duration-300">
                  <div className="text-center mb-3">
                    <span className="text-3xl text-emerald-600 dark:text-emerald-400">'</span>
                  </div>
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2 text-center">Single Quotes</h3>
                  <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                      <span><strong>Everything literal</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                      <span>No variable expansion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                      <span>No command substitution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                      <span>No escape sequences</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300">
                  <div className="text-center mb-3">
                    <span className="text-3xl text-blue-600 dark:text-blue-400">"</span>
                  </div>
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 text-center">Double Quotes</h3>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span><strong>Interpret $, `, \</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span>Variables expanded</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span>Commands substituted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span>Globbing disabled</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300">
                  <div className="text-center mb-3">
                    <span className="text-3xl text-amber-600 dark:text-amber-400">\</span>
                  </div>
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2 text-center">Backslash Escape</h3>
                  <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></span>
                      <span><strong>Character-level control</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></span>
                      <span>Escapes next character</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></span>
                      <span>Works inside " " and unquoted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></span>
                      <span>Line continuation with \ at end</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">When to Use Each Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg">
                      <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Use Single Quotes For:</h4>
                      <ul className="space-y-1 text-sm text-emerald-700 dark:text-emerald-400">
                        <li>• Hard-coded strings</li>
                        <li>• Regex patterns</li>
                        <li>• SQL queries in scripts</li>
                        <li>• File paths with spaces</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Use Double Quotes For:</h4>
                      <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                        <li>• Strings with variables</li>
                        <li>• Command substitution results</li>
                        <li>• File names with spaces</li>
                        <li>• Most echo statements</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Golden Rule</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>When in doubt, use double quotes.</strong> They prevent word splitting and globbing while still allowing variable expansion. Single quotes are for when you want <em>exactly</em> what you type.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Examples Tabs */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
              <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300 flex items-center gap-3">
                <span className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">📝</span>
                Interactive Examples
              </h2>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.entries(examples).map(([key, label], index) => (
                    <button
                      key={key}
                      onClick={() => setActiveExample(key)}
                      className={clsx(
                        "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                        activeExample === key
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      )}
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                
                <div className="animate-[fadeIn_0.5s_ease-out]">
                  {activeExample === "basic" && (
                    <ShellFileLoader
                      fileModule={quotingBasic}
                      title="Basic Quoting Differences"
                      highlightLines={[2, 5, 8]}
                    />
                  )}
                  
                  {activeExample === "variables" && (
                    <ShellFileLoader
                      fileModule={quotingVariables}
                      title="Variables in Different Quotes"
                      highlightLines={[2, 6, 10]}
                    />
                  )}
                  
                  {activeExample === "special" && (
                    <ShellFileLoader
                      fileModule={quotingSpecialChars}
                      title="Special Character Handling"
                      highlightLines={[2, 6, 10]}
                    />
                  )}
                  
                  {activeExample === "commandsub" && (
                    <ShellFileLoader
                      fileModule={quotingCommandSub}
                      title="Command Substitution in Quotes"
                      highlightLines={[2, 6, 10]}
                    />
                  )}
                  
                  {activeExample === "nested" && (
                    <ShellFileLoader
                      fileModule={quotingNested}
                      title="Nested Quotes (Complex Cases)"
                      highlightLines={[2, 8, 14]}
                    />
                  )}
                  
                  {activeExample === "pitfalls" && (
                    <ShellFileLoader
                      fileModule={quotingPitfalls}
                      title="Common Quoting Pitfalls"
                      highlightLines={[2, 8, 14]}
                    />
                  )}
                </div>
              </div>
            </section>

            {/* Section 5: Common Pitfalls */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
              <h2 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-300 flex items-center gap-3">
                <span className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">⚠️</span>
                Common Pitfalls & Mistakes
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
                  <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">1. Forgetting Quotes with Spaces</h3>
                  <p className="text-red-700 dark:text-red-400">
                    <code className="bg-red-100 dark:bg-red-800 px-1 rounded">cp file1 file2 new folder/</code> will fail because "new folder" is two arguments. Use <code className="bg-red-100 dark:bg-red-800 px-1 rounded">cp file1 file2 "new folder/"</code>
                  </p>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded">
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">2. Single Quotes Inside Single Quotes</h3>
                  <p className="text-amber-700 dark:text-amber-400">
                    You can't have <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">'It's raining'</code> because the middle quote ends the string. Use <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">"It's raining"</code> or <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">'It'\''s raining'</code>
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">3. Over-quoting Arithmetic</h3>
                  <p className="text-blue-700 dark:text-blue-400">
                    <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">result="$(($x + $y))"</code> works, but <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">result='$(($x + $y))'</code> gives literal text. Know when you want calculation vs literal.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">4. Misunderstanding Globbing</h3>
                  <p className="text-purple-700 dark:text-purple-400">
                    <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">echo *.txt</code> expands to matching files. <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">echo "*.txt"</code> prints "*.txt". <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">echo '*.txt'</code> also prints "*.txt".
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Best Practices */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
              <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-300 flex items-center gap-3">
                <span className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">✅</span>
                Best Practices for Shell Quoting
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300">
                  <h3 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">1.</span> Quote All Variable Expansions
                  </h3>
                  <p className="text-green-700 dark:text-green-400 text-sm">
                    Always use <code className="bg-green-100 dark:bg-green-800 px-1 rounded">"$variable"</code> not <code className="bg-green-100 dark:bg-green-800 px-1 rounded">$variable</code> to prevent word splitting.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">2.</span> Use Single Quotes for Literals
                  </h3>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    When you don't need variable expansion, use single quotes for clarity and safety.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-400 transition-all duration-300">
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">3.</span> Escape Dollar Signs in Regex
                  </h3>
                  <p className="text-purple-700 dark:text-purple-400 text-sm">
                    In grep patterns, use <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">'\$[0-9]'</code> to match literal "$", not <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">"$[0-9]"</code> which expands variables.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300">
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">4.</span> Use Heredocs for Multi-line
                  </h3>
                  <p className="text-amber-700 dark:text-amber-400 text-sm">
                    For multi-line strings with variables, use heredocs instead of complex quoting.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Professional Tip from Barrackpore Tech</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  At Barrackpore Tech Solutions, we enforce shellcheck in our CI/CD pipeline. It catches quoting errors before deployment. Teach <strong>Swadeep and Tuhina</strong> to run <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">shellcheck script.sh</code> on all their scripts.
                </p>
              </div>
            </section>

            {/* Teacher's Note */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-xl animate-[fadeInUp_0.8s_ease-out_0.7s_both] hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">Teacher's Note</h2>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="mb-4">
                      <h3 className="font-bold text-white mb-2">The Quoting Mindset</h3>
                      <p className="text-white/90 leading-relaxed">
                        Quoting isn't about memorizing rules—it's about understanding <strong>when the shell interprets vs. when it preserves</strong>. Think of single quotes as a "literal bubble", double quotes as a "smart bubble" that understands variables, and backslash as a "character shield".
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <p className="text-white/80 text-sm">
                          When <strong>Debangshu</strong> at Ichapur High School writes scripts, I tell him: "If you see unexpected spaces or globs, you forgot quotes."
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <p className="text-white/80 text-sm">
                          The most common error I see in 27 years: <code className="bg-white/20 px-1 rounded">echo $PATH</code> vs <code className="bg-white/20 px-1 rounded">echo "$PATH"</code>. The first splits by colons!
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <p className="text-white/80 text-sm">
                          Remember: Quoting is cheap. A few extra quotes prevent hours of debugging. When in doubt, quote it out!
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/30">
                      <div className="text-white/70 text-sm">
                        <p><strong>Sukanta Hui</strong> • 27 years experience</p>
                        <p>sukantahui@codernaccotax.co.in • 7003756860</p>
                        <p>Expertise: Shell Scripting, System Administration, DevOps</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Quick Reference */}
          <div className="space-y-8">
            {/* Quick Reference Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.2s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform duration-300">⚡</span>
                Quick Reference Cheat Sheet
              </h2>
              
              <div className="space-y-4">
                <div className="p-3 bg-emerald-800/30 rounded-lg border border-emerald-700">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm text-emerald-300 font-mono">'text'</code>
                    <span className="text-xs bg-emerald-700 px-2 py-1 rounded">Literal</span>
                  </div>
                  <p className="text-emerald-200 text-xs">No $, no `, no \, no nothing</p>
                </div>
                
                <div className="p-3 bg-blue-800/30 rounded-lg border border-blue-700">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm text-blue-300 font-mono">"text"</code>
                    <span className="text-xs bg-blue-700 px-2 py-1 rounded">Smart</span>
                  </div>
                  <p className="text-blue-200 text-xs">$ and ` work, \ escapes, no globbing</p>
                </div>
                
                <div className="p-3 bg-amber-800/30 rounded-lg border border-amber-700">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm text-amber-300 font-mono">\t</code>
                    <span className="text-xs bg-amber-700 px-2 py-1 rounded">Escape</span>
                  </div>
                  <p className="text-amber-200 text-xs">Escapes next character only</p>
                </div>
                
                <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-700">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm text-purple-300 font-mono">$'t\tn'</code>
                    <span className="text-xs bg-purple-700 px-2 py-1 rounded">ANSI-C</span>
                  </div>
                  <p className="text-purple-200 text-xs">Interpret escape sequences</p>
                </div>
                
                <div className="p-3 bg-rose-800/30 rounded-lg border border-rose-700">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm text-rose-300 font-mono">$"text"</code>
                    <span className="text-xs bg-rose-700 px-2 py-1 rounded">Locale</span>
                  </div>
                  <p className="text-rose-200 text-xs">Translate for current locale</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-bold text-white mb-2 text-sm">Memory Aid</h3>
                <p className="text-gray-300 text-xs">
                  <strong>S</strong>ingle = <strong>S</strong>trict<br/>
                  <strong>D</strong>ouble = <strong>D</strong>ynamic<br/>
                  <strong>B</strong>ackslash = <strong>B</strong>lock next
                </p>
              </div>
            </div>

            {/* Special Characters Card */}
            <div className="bg-gradient-to-br from-indigo-800 to-purple-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.3s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">🎯</span>
                Special Characters Guide
              </h2>
              
              <div className="space-y-3">
                {[
                  { char: "$", name: "Variable", ex: "$HOME", quote: '"' },
                  { char: "`", name: "Command Sub", ex: "`date`", quote: '"' },
                  { char: "*", name: "Glob", ex: "*.txt", quote: "' or \"" },
                  { char: "?", name: "Wildcard", ex: "file?.txt", quote: "' or \"" },
                  { char: "[ ]", name: "Character Class", ex: "[a-z]", quote: "' or \"" },
                  { char: "{ }", name: "Brace Expansion", ex: "{1..3}", quote: "' or \"" },
                  { char: "|", name: "Pipe", ex: "cmd1 | cmd2", quote: "' or \"" },
                  { char: "&", name: "Background", ex: "cmd &", quote: "' or \"" },
                  { char: ";", name: "Command Sep", ex: "cmd1; cmd2", quote: "' or \"" },
                  { char: "#", name: "Comment", ex: "# comment", quote: "' or \"" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-indigo-700/30 rounded border border-indigo-600 hover:border-indigo-400 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <code className="text-sm text-indigo-300 font-mono bg-indigo-900/50 px-2 py-1 rounded">
                        {item.char}
                      </code>
                      <span className="text-sm text-indigo-200">{item.name}</span>
                    </div>
                    <span className="text-xs text-indigo-300 bg-indigo-800 px-2 py-1 rounded">
                      {item.quote}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-3 bg-purple-700/40 rounded-lg">
                <p className="text-purple-200 text-xs">
                  <strong>Note:</strong> Inside single quotes, all these are literal. Inside double quotes, only $ and ` are special.
                </p>
              </div>
            </div>

            {/* Mini Checklist Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-green-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.4s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform duration-300">📋</span>
                Quoting Checklist
              </h2>
              
              <div className="space-y-3">
                {[
                  "Did I quote all variable expansions?",
                  "Are there spaces in filenames?",
                  "Do I need variables expanded?",
                  "Am I using globs intentionally?",
                  "Any single quotes inside single quotes?",
                  "Should I use heredoc instead?",
                  "Have I tested with empty variables?",
                  "Does shellcheck pass?"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-emerald-700/30 rounded-lg border border-emerald-600 hover:border-emerald-400 transition-all duration-300 animate-[fadeIn_0.5s_ease-out]"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                    <input type="checkbox" className="w-4 h-4 text-emerald-400 bg-gray-800 border-gray-600 rounded" />
                    <span className="text-emerald-100 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-emerald-700/40 rounded-lg">
                <h3 className="font-bold text-white mb-2 text-sm">Pro Tip</h3>
                <p className="text-emerald-200 text-xs">
                  Use <code className="bg-emerald-800 px-1 rounded">set -x</code> to see how shell interprets your commands with quotes.
                </p>
              </div>
            </div>

            {/* Hint Section */}
            <div className="bg-gradient-to-br from-pink-800 to-rose-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.5s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">💡</span>
                Think About...
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-pink-700/30 rounded-lg border border-pink-600 hover:border-pink-400 transition-all duration-300">
                  <p className="text-pink-100 text-sm italic">
                    "What happens when you nest quotes? Try: <code className="bg-pink-800/50 px-1 rounded">echo "'$HOME'"</code> vs <code className="bg-pink-800/50 px-1 rounded">echo '"$HOME"'</code>"
                  </p>
                </div>
                
                <div className="p-4 bg-rose-700/30 rounded-lg border border-rose-600 hover:border-rose-400 transition-all duration-300">
                  <p className="text-rose-100 text-sm italic">
                    "How would <strong>Abhronila</strong> write a grep command that searches for literal '$' in files at Shyamnagar Bank?"
                  </p>
                </div>
                
                <div className="p-4 bg-fuchsia-700/30 rounded-lg border border-fuchsia-600 hover:border-fuchsia-400 transition-all duration-300">
                  <p className="text-fuchsia-100 text-sm italic">
                    "Observe: <code className="bg-fuchsia-800/50 px-1 rounded">PATH=/bin:/usr/bin</code> vs <code className="bg-fuchsia-800/50 px-1 rounded">PATH='/bin:/usr/bin'</code> - when does quoting matter here?"
                  </p>
                </div>
                
                <div className="p-4 bg-red-700/30 rounded-lg border border-red-600 hover:border-red-400 transition-all duration-300">
                  <p className="text-red-100 text-sm italic">
                    "What's the difference between <code className="bg-red-800/50 px-1 rounded">\n</code> in single vs double quotes? Try: <code className="bg-red-800/50 px-1 rounded">echo 'line1\nline2'</code> vs <code className="bg-red-800/50 px-1 rounded">echo $'line1\nline2'</code>"
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 text-sm font-medium">
                  Experiment with These
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-300 dark:border-gray-700 animate-[fadeIn_0.8s_ease-out_0.8s_both]">
          <a href="#prev" className="px-6 py-3 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Previous: Command Substitution
          </a>
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Topic 10 of 41 • Quoting Rules
          </div>
          <a href="#next" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 group">
            Next: Conditional Statements
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>

      {/* Inline Animation Keyframes */}
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic10;