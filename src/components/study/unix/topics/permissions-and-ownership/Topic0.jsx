import React from 'react';
import clsx from 'clsx';

class Topic0 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isReducedMotion: false
    };
  }

  componentDidMount() {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.setState({ isReducedMotion: mediaQuery.matches });
    
    // Listen for changes
    mediaQuery.addEventListener('change', this.handleMotionPreferenceChange);
    
    // Check initial color scheme
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.setState({ isDarkMode: darkModeMediaQuery.matches });
    
    // Listen for color scheme changes
    darkModeMediaQuery.addEventListener('change', this.handleColorSchemeChange);
  }

  componentWillUnmount() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.removeEventListener('change', this.handleMotionPreferenceChange);
    darkModeMediaQuery.removeEventListener('change', this.handleColorSchemeChange);
  }

  handleMotionPreferenceChange = (e) => {
    this.setState({ isReducedMotion: e.matches });
  };

  handleColorSchemeChange = (e) => {
    this.setState({ isDarkMode: e.matches });
  };

  render() {
    const { isDarkMode, isReducedMotion } = this.state;
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
    const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
    const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';

    return (
      <div className={clsx(
        "min-h-screen transition-all duration-500",
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      )}>
        <style>
          {`
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
            
            @keyframes highlightGlow {
              0%, 100% {
                box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
              }
              50% {
                box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.3);
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
          `}
        </style>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <header className={`mb-12 ${animationClass} opacity-0`}>
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">
              Understanding File Permission Structure: rwx for Owner, Group and Others
            </h1>
            <p className="text-lg opacity-80">
              Topic 1: The fundamental building blocks of Linux file security
            </p>
            <div className="h-1 w-24 bg-blue-500 mt-4 rounded-full"></div>
          </header>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Conceptual Explanation */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                Conceptual Foundation
              </h2>
              
              <div className="space-y-4 leading-relaxed">
                <p>
                  In Linux and Unix-like systems, every file and directory has three levels of access control:
                  <span className="font-semibold text-blue-400"> Owner</span>, 
                  <span className="font-semibold text-green-400"> Group</span>, and 
                  <span className="font-semibold text-purple-400"> Others</span>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {/* Owner Card */}
                  <div className={clsx(
                    "p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
                    isDarkMode 
                      ? "bg-blue-900/20 border-blue-700/30 hover:bg-blue-900/30 hover:border-blue-500/50" 
                      : "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300"
                  )}>
                    <h3 className="font-bold text-lg mb-2 text-blue-400">Owner (User)</h3>
                    <p className="text-sm">The user who created the file. Has the highest level of control.</p>
                    <div className="mt-3 p-2 bg-black/10 rounded-lg">
                      <code className="text-sm font-mono">u</code> - Symbolic representation
                    </div>
                  </div>
                  
                  {/* Group Card */}
                  <div className={clsx(
                    "p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
                    isDarkMode 
                      ? "bg-green-900/20 border-green-700/30 hover:bg-green-900/30 hover:border-green-500/50" 
                      : "bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300"
                  )}>
                    <h3 className="font-bold text-lg mb-2 text-green-400">Group</h3>
                    <p className="text-sm">Users who belong to the file's group. Share permissions collectively.</p>
                    <div className="mt-3 p-2 bg-black/10 rounded-lg">
                      <code className="text-sm font-mono">g</code> - Symbolic representation
                    </div>
                  </div>
                  
                  {/* Others Card */}
                  <div className={clsx(
                    "p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
                    isDarkMode 
                      ? "bg-purple-900/20 border-purple-700/30 hover:bg-purple-900/30 hover:border-purple-500/50" 
                      : "bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300"
                  )}>
                    <h3 className="font-bold text-lg mb-2 text-purple-400">Others (World)</h3>
                    <p className="text-sm">All other users on the system. Most restricted level.</p>
                    <div className="mt-3 p-2 bg-black/10 rounded-lg">
                      <code className="text-sm font-mono">o</code> - Symbolic representation
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The rwx Trio */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                The rwx Permission Trio
              </h2>
              
              <div className="relative">
                {/* SVG Visualization */}
                <div className="mb-8 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                  <svg 
                    width="100%" 
                    height="180" 
                    viewBox="0 0 800 180" 
                    className="overflow-visible"
                  >
                    {/* Background Lines */}
                    <line x1="50" y1="90" x2="750" y2="90" stroke={isDarkMode ? "#374151" : "#D1D5DB"} strokeWidth="2" strokeDasharray="5,5" />
                    
                    {/* Read (r) */}
                    <g className="hover:opacity-100 opacity-90 transition-all duration-300 cursor-help">
                      <circle cx="200" cy="90" r="40" fill={isDarkMode ? "#1D4ED8" : "#3B82F6"} className="hover:animate-[pulseSubtle_2s_ease-in-out_infinite]" />
                      <text x="200" y="95" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">r</text>
                      <text x="200" y="140" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="14">Read</text>
                      <text x="200" y="160" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="12">Value: 4</text>
                      <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
                    </g>
                    
                    {/* Write (w) */}
                    <g className="hover:opacity-100 opacity-90 transition-all duration-300 cursor-help">
                      <circle cx="400" cy="90" r="40" fill={isDarkMode ? "#059669" : "#10B981"} className="hover:animate-[pulseSubtle_2s_ease-in-out_infinite]" />
                      <text x="400" y="95" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">w</text>
                      <text x="400" y="140" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="14">Write</text>
                      <text x="400" y="160" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="12">Value: 2</text>
                      <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" begin="1s" />
                    </g>
                    
                    {/* Execute (x) */}
                    <g className="hover:opacity-100 opacity-90 transition-all duration-300 cursor-help">
                      <circle cx="600" cy="90" r="40" fill={isDarkMode ? "#7C3AED" : "#8B5CF6"} className="hover:animate-[pulseSubtle_2s_ease-in-out_infinite]" />
                      <text x="600" y="95" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">x</text>
                      <text x="600" y="140" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="14">Execute</text>
                      <text x="600" y="160" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="12">Value: 1</text>
                      <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" begin="2s" />
                    </g>
                    
                    {/* Connecting Arrows */}
                    <path d="M240 90 L360 90" stroke={isDarkMode ? "#6B7280" : "#9CA3AF"} strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                    <path d="M440 90 L560 90" stroke={isDarkMode ? "#6B7280" : "#9CA3AF"} strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                    
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill={isDarkMode ? "#6B7280" : "#9CA3AF"} />
                      </marker>
                    </defs>
                  </svg>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"
                  )}>
                    <h4 className="font-bold text-blue-400 mb-2">Read (r)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                        <span>For files: View file contents</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                        <span>For directories: List directory contents</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                        <span>Numeric value: <code>4</code></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-green-900/20 hover:bg-green-900/30" : "bg-green-50 hover:bg-green-100"
                  )}>
                    <h4 className="font-bold text-green-400 mb-2">Write (w)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                        <span>For files: Modify file contents</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                        <span>For directories: Create/delete files</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                        <span>Numeric value: <code>2</code></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-purple-900/20 hover:bg-purple-900/30" : "bg-purple-50 hover:bg-purple-100"
                  )}>
                    <h4 className="font-bold text-purple-400 mb-2">Execute (x)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mt-1 mr-2"></span>
                        <span>For files: Run as program</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mt-1 mr-2"></span>
                        <span>For directories: Enter directory (cd)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mt-1 mr-2"></span>
                        <span>Numeric value: <code>1</code></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Example */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                Real-World Scenario
              </h2>
              
              <div className={clsx(
                "p-4 rounded-xl mb-6 transition-all duration-300",
                isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
              )}>
                <h3 className="font-bold text-lg mb-3 text-yellow-400">Class Project at CNAT</h3>
                <p className="mb-4 leading-relaxed">
                  Consider a group project where <span className="font-semibold">Swadeep</span> creates a Python script 
                  for data analysis. The project involves:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className={clsx(
                      "w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1",
                      isDarkMode ? "bg-blue-600" : "bg-blue-500"
                    )}>
                      <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <div>
                      <span className="font-semibold">Swadeep (Owner):</span> Needs full access (rwx) to edit and run the script
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={clsx(
                      "w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1",
                      isDarkMode ? "bg-green-600" : "bg-green-500"
                    )}>
                      <span className="text-white text-sm font-bold">T</span>
                    </div>
                    <div>
                      <span className="font-semibold">Tuhina & Abhronila (Group):</span> Need to read and execute the script, but not modify it (r-x)
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={clsx(
                      "w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1",
                      isDarkMode ? "bg-purple-600" : "bg-purple-500"
                    )}>
                      <span className="text-white text-sm font-bold">D</span>
                    </div>
                    <div>
                      <span className="font-semibold">Debangshu (Others):</span> Should only be able to read the script (r--), not execute or modify
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "mt-6 p-4 rounded-lg border font-mono text-sm",
                  isDarkMode ? "bg-black/30 border-gray-700" : "bg-white border-gray-300"
                )}>
                  <div className="text-green-400 mb-1"># Resulting permission string:</div>
                  <div className="text-yellow-300">-rwxr-xr--</div>
                  <div className="text-gray-500 text-xs mt-2">
                    Owner(rwx): Swadeep | Group(r-x): Project Team | Others(r--): Everyone else
                  </div>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-red-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Common Pitfalls & Mistakes
              </h2>
              
              <div className="space-y-4">
                <div className={clsx(
                  "p-4 rounded-lg border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                )}>
                  <h4 className="font-bold text-red-400 mb-2">Mistake 1: Confusing Directory Execute Permissions</h4>
                  <p className="text-sm">
                    Beginners often forget that <code>x</code> on directories means "enter directory", not "execute directory".
                    Without execute permission, users cannot <code>cd</code> into the directory even with read permission.
                  </p>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                )}>
                  <h4 className="font-bold text-yellow-400 mb-2">Mistake 2: Giving Write Without Execute on Directories</h4>
                  <p className="text-sm">
                    If users can write to a directory but not execute (enter) it, they cannot actually create files there.
                    This is a common security misconfiguration in shared folders.
                  </p>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-blue-500/50 bg-blue-900/10" : "border-blue-400 bg-blue-50"
                )}>
                  <h4 className="font-bold text-blue-400 mb-2">Mistake 3: Overlooking Group Membership</h4>
                  <p className="text-sm">
                    Setting group permissions doesn't help if users aren't added to the correct group.
                    Remember: <code>chmod</code> sets permissions, <code>chgrp</code> sets group, and <code>usermod</code> adds users to groups.
                  </p>
                </div>
              </div>
            </section>

            {/* Mini Checklist */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Mini Checklist: What to Remember
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className={clsx(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0",
                    isDarkMode ? "bg-green-600" : "bg-green-500"
                  )}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Three Entities:</span> Always think in terms of Owner, Group, Others
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={clsx(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0",
                    isDarkMode ? "bg-green-600" : "bg-green-500"
                  )}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Numeric Values:</span> r=4, w=2, x=1 (memorize this!)
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={clsx(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0",
                    isDarkMode ? "bg-green-600" : "bg-green-500"
                  )}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Directory vs File:</span> x means different things for files and directories
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={clsx(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0",
                    isDarkMode ? "bg-green-600" : "bg-green-500"
                  )}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Security First:</span> Start restrictive, then grant permissions as needed
                  </div>
                </div>
              </div>
            </section>

            {/* Teacher's Note */}
            <section className={`bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30 transition-all duration-300 hover:from-blue-900/30 hover:to-purple-900/30 hover:border-blue-500/50 hover:shadow-2xl ${staggeredClass} opacity-0`}>
              <div className="flex items-start mb-4">
                <div className="relative group">
                  <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center mr-4 ring-4 ring-offset-2",
                    isDarkMode 
                      ? "bg-blue-700 ring-blue-900/50 ring-offset-gray-900 group-hover:ring-blue-600" 
                      : "bg-blue-500 ring-blue-300 ring-offset-gray-50 group-hover:ring-blue-400"
                  )}>
                    <span className="text-white font-bold text-lg">SH</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Teacher's Note
                  </h3>
                  <p className="text-sm opacity-80">Sukanta Hui • 27 years experience</p>
                </div>
              </div>
              
              <div className="space-y-4 leading-relaxed">
                <p className="italic">
                  "When teaching permissions, I always tell my students in Shyamnagar and Ichapur to visualize 
                  permissions as three security doors: your personal room (owner), your shared lab (group), 
                  and the public hallway (others). Each door needs different keys."
                </p>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4",
                  isDarkMode ? "bg-black/30" : "bg-white/20"
                )}>
                  <h4 className="font-bold text-yellow-300 mb-2">Pro Tip:</h4>
                  <p className="text-sm">
                    Use the mnemonic "Read Write eXecute" = "RWX" = "4-2-1". Always think in this order. 
                    When calculating numeric permissions, add them like this: rwx = 4+2+1 = 7, r-x = 4+0+1 = 5, 
                    r-- = 4+0+0 = 4.
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-blue-700/30">
                  <div className="text-sm opacity-70">
                    Contact: sukantahui@codernaccotax.co.in • 7003756860
                  </div>
                  <div className="text-xs opacity-60">
                    Skills: OS, RDBMS, Web Dev, Programming
                  </div>
                </div>
              </div>
            </section>

            {/* Hint Section */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                Think About This...
              </h2>
              
              <div className={clsx(
                "p-4 rounded-lg border-l-4",
                isDarkMode ? "border-green-500/50 bg-green-900/10" : "border-green-400 bg-green-50/50"
              )}>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p className="leading-relaxed">
                      If a directory has permissions <code>drwxr-xr-x</code> and you're not the owner but belong to the group,
                      can you create a new file inside it? What if the permissions were <code>drwxr--r--</code> instead?
                      <span className="block mt-2 text-sm opacity-80">
                        Observe carefully which permission bits control writing to directories...
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
            <p>Topic 1: File Permission Structure • Next: Reading Permission Strings</p>
            <p className="mt-2">Remember: Practice with actual files and directories to reinforce learning</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Topic0;