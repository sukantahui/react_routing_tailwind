import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import bashrcExample from "./topic2_files/bashrc_example.sh?raw";
import bashProfileExample from "./topic2_files/bash_profile_example.sh?raw";
import profileExample from "./topic2_files/profile_example.sh?raw";
import loginFlowExample from "./topic2_files/login_flow.sh?raw";

const Topic2 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-4 md:p-8 transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto animate-[fadeInUp_0.8s_ease-out]">
                <div className="mb-10 animate-[fadeInUp_0.8s_ease-out_0.1s]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Topic 2: Bash Startup Files
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Mastering .bashrc, .bash_profile, and .profile for shell customization</p>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Bash startup files are configuration files that run automatically when you start a shell session. They allow you to customize your environment, set aliases, define functions, and configure your shell's behavior. Understanding when each file loads is crucial for effective shell customization.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Visualization */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.2s]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Bash Startup File Flow
                        </h2>
                        
                        <div className="relative">
                            {/* SVG Visualization */}
                            <div className="mb-8">
                                <svg className="w-full h-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                                        </marker>
                                        <linearGradient id="terminalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#1e40af" />
                                            <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Login Shell Path */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300" onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}>
                                        <rect x="50" y="50" width="150" height="60" rx="8" fill="url(#terminalGradient)" className="transition-all duration-300 hover:stroke-blue-400 hover:stroke-2" />
                                        <text x="125" y="85" textAnchor="middle" fill="white" className="font-sans text-sm">Login Shell</text>
                                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                                    </g>
                                    
                                    <path d="M200 80 L300 80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                    <text x="250" y="70" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">First</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="300" y="50" width="200" height="60" rx="8" fill="#f59e0b" className="transition-all duration-300 hover:fill-amber-500" />
                                        <text x="400" y="85" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">/etc/profile</text>
                                        <animate attributeName="fill" values="#f59e0b;#fbbf24;#f59e0b" dur="3s" repeatCount="indefinite" />
                                    </g>
                                    
                                    <path d="M500 80 L600 80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                    <text x="550" y="70" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Then</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="600" y="30" width="150" height="40" rx="6" fill="#10b981" className="transition-all duration-300 hover:fill-emerald-500" />
                                        <text x="675" y="55" textAnchor="middle" fill="white" className="font-sans text-xs">~/.bash_profile</text>
                                    </g>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="600" y="80" width="150" height="40" rx="6" fill="#10b981" className="transition-all duration-300 hover:fill-emerald-500" />
                                        <text x="675" y="105" textAnchor="middle" fill="white" className="font-sans text-xs">~/.profile</text>
                                    </g>
                                    
                                    <text x="600" y="130" textAnchor="start" fill="#9ca3af" className="font-sans text-xs">(whichever exists)</text>
                                    
                                    {/* Non-Login Interactive Shell Path */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="50" y="200" width="150" height="60" rx="8" fill="#8b5cf6" className="transition-all duration-300 hover:stroke-purple-400 hover:stroke-2" />
                                        <text x="125" y="235" textAnchor="middle" fill="white" className="font-sans text-sm">Non-Login Shell</text>
                                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="1s" />
                                    </g>
                                    
                                    <path d="M200 230 L350 230" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                    <text x="275" y="220" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Only</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="350" y="200" width="150" height="60" rx="8" fill="#ef4444" className="transition-all duration-300 hover:fill-red-500" />
                                        <text x="425" y="235" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">~/.bashrc</text>
                                        <animate attributeName="fill" values="#ef4444;#f87171;#ef4444" dur="3s" repeatCount="indefinite" begin="0.5s" />
                                    </g>
                                    
                                    {/* Non-Interactive Shell */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="50" y="300" width="150" height="60" rx="8" fill="#6b7280" className="transition-all duration-300 hover:stroke-gray-400 hover:stroke-2" />
                                        <text x="125" y="335" textAnchor="middle" fill="white" className="font-sans text-sm">Script/Non-Interactive</text>
                                    </g>
                                    
                                    <path d="M200 330 L350 330" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                    <text x="275" y="320" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Only</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="350" y="300" width="200" height="60" rx="8" fill="#9ca3af" className="transition-all duration-300 hover:fill-gray-400" />
                                        <text x="450" y="335" textAnchor="middle" fill="white" className="font-sans text-sm">BASH_ENV or env</text>
                                    </g>
                                    
                                    {/* Legend */}
                                    <rect x="500" y="350" width="250" height="40" rx="6" fill="#1f2937" fillOpacity="0.8" />
                                    <text x="510" y="370" fill="#60a5fa" className="font-sans text-xs">Login Shell: Reads .bash_profile/.profile</text>
                                    <text x="510" y="385" fill="#a78bfa" className="font-sans text-xs">Non-Login: Reads .bashrc only</text>
                                </svg>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
                                    <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        .bashrc
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Runs for <strong>non-login interactive shells</strong>. Contains aliases, functions, and shell options.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-700">
                                    <h3 className="font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        .bash_profile
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Runs for <strong>login shells</strong>. Should source .bashrc and set environment variables.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700">
                                    <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        .profile
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Bourne shell compatible. Used when .bash_profile doesn't exist. Good for cross-shell compatibility.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Explanation Section */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.3s]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            File Purposes & Differences
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
                                <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-3">~/.bashrc (Bash Run Commands)</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        This file is executed for <strong>every non-login interactive shell</strong>. When you open a new terminal window (that's not a login shell) or start a new interactive bash session, this file runs.
                                    </p>
                                    
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                            <div>
                                                <p className="text-yellow-800 dark:text-yellow-300 font-semibold">When is .bashrc executed?</p>
                                                <p className="text-yellow-700 dark:text-yellow-400 text-sm mt-1">
                                                    • Opening a new terminal tab/window (non-login)<br/>
                                                    • Running <code className="text-xs bg-yellow-100 dark:bg-yellow-900 px-1 rounded">bash</code> from within bash<br/>
                                                    • <strong>NOT</strong> when logging in via SSH or console
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={bashrcExample}
                                        title="Typical .bashrc Contents"
                                        highlightLines={[1, 3, 5, 7, 9, 11]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-green-300 dark:hover:border-green-700">
                                <h3 className="font-bold text-xl text-green-600 dark:text-green-400 mb-3">~/.bash_profile (Bash Login Profile)</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        This file is executed only for <strong>login shells</strong>. When you log in to the system via SSH, console, or start a login shell with <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">bash --login</code>, this file runs.
                                    </p>
                                    
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-blue-800 dark:text-blue-300 font-semibold">Best Practice Pattern</p>
                                                <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">
                                                    A good .bash_profile should:<br/>
                                                    1. Source .bashrc for consistency<br/>
                                                    2. Set environment variables (PATH, EDITOR, etc.)<br/>
                                                    3. Run login-specific commands
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={bashProfileExample}
                                        title="Recommended .bash_profile Structure"
                                        highlightLines={[1, 3, 5, 7, 9, 11]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700">
                                <h3 className="font-bold text-xl text-purple-600 dark:text-purple-400 mb-3">~/.profile (Universal Profile)</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        This is the Bourne shell (sh) compatible profile file. Bash will read this if <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">~/.bash_profile</code> doesn't exist. It's useful for cross-shell compatibility when you might use other shells like dash, ksh, or zsh.
                                    </p>
                                    
                                    <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-600 p-4">
                                        <div className="flex">
                                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <div>
                                                <p className="text-purple-800 dark:text-purple-300 font-semibold">When to use .profile?</p>
                                                <p className="text-purple-700 dark:text-purple-400 text-sm mt-1">
                                                    • When you use multiple shells (bash, sh, dash)<br/>
                                                    • For system-wide environment variables<br/>
                                                    • When creating portable shell configurations
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={profileExample}
                                        title="Example .profile File"
                                        highlightLines={[1, 3, 5, 7, 9]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Practical Examples & Real-World Scenarios */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.4s]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Real-World Examples & Common Configurations
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 p-5 rounded-xl border border-orange-200 dark:border-orange-800 transition-all duration-300 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700">
                                <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Student Scenario: Swadeep's Development Setup
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Swadeep, a student from Barrackpore, needs to set up his Python development environment. He wants different configurations for his college projects vs personal projects.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">1</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            In <strong>.bashrc</strong>: Aliases for quick navigation to project folders
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">2</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            In <strong>.bash_profile</strong>: Set Python virtualenv wrapper and PATH
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">3</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Creates a function in .bashrc to switch between college and personal projects
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 p-5 rounded-xl border border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-lg hover:border-cyan-300 dark:hover:border-cyan-700">
                                <h3 className="font-bold text-lg text-cyan-700 dark:text-cyan-400 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    System Admin: Tuhina's Server Configuration
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Tuhina, a system administrator from Shyamnagar, manages multiple servers. She needs consistent environment across all servers.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">1</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Uses <strong>.profile</strong> for cross-shell compatibility (some servers use dash)
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">2</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            In <strong>.bashrc</strong>: SSH aliases, monitoring shortcuts, safety aliases
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">3</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Sets umask and history settings in .bash_profile for security
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <ShellFileLoader
                                fileModule={loginFlowExample}
                                title="Login Flow Testing Script"
                                highlightLines={[1, 3, 5, 7, 9, 11, 13, 15]}
                            />
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls Section */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.5s]">
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 rounded-2xl shadow-lg p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Common Pitfalls & Beginner Mistakes
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Mistake 1: Putting everything in .bashrc</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Beginners often put all configurations in .bashrc, forgetting that environment variables set here won't persist in child processes.
                                </p>
                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                    <p className="text-red-800 dark:text-red-300 font-mono text-sm">
                                        # Wrong - PATH won't be available in scripts<br/>
                                        export PATH="$PATH:/new/path"  # In .bashrc
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Mistake 2: Not sourcing .bashrc from .bash_profile</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    When .bash_profile exists, .bashrc won't run for login shells unless explicitly sourced. This leads to inconsistent environments.
                                </p>
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <p className="text-green-800 dark:text-green-300 font-mono text-sm">
                                        # Correct approach in .bash_profile<br/>
                                        if [ -f ~/.bashrc ]; then<br/>
                                        &nbsp;&nbsp;. ~/.bashrc<br/>
                                        fi
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Mistake 3: Infinite recursion in sourcing</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Accidentally creating circular sourcing (e.g., .bashrc sources .bash_profile which sources .bashrc...).
                                </p>
                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                    <p className="text-red-800 dark:text-red-300 font-mono text-sm">
                                        # DANGER - Infinite loop!<br/>
                                        # In .bashrc:<br/>
                                        source ~/.bash_profile  # Bad!<br/>
                                        <br/>
                                        # In .bash_profile:<br/>
                                        source ~/.bashrc  # Also bad!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.6s]">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl shadow-lg p-6 border border-emerald-200 dark:border-emerald-800 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Best Practices & Professional Tips
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">Organization Strategy</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Separate aliases, functions, and environment variables into different files</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use conditional checks for interactive shells</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Keep .bash_profile minimal - source everything else</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">Portability Tips</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use .profile for system-wide environment variables</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Test configurations in different shell types</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Version control your dotfiles with Git</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.7s]">
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 rounded-2xl shadow-lg p-6 border border-violet-200 dark:border-violet-800 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Mini Checklist: What to Remember
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    1
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Login Shells</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Read .bash_profile or .profile</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    2
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Non-Login Shells</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Read .bashrc only</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    3
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Source Order</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Always source .bashrc from .bash_profile</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    4
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Environment Vars</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Set in login shell files</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hint Section */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.8s]">
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-2xl shadow-lg p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Thinking Corner: Questions to Ponder
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Think about...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Why would Abhronila, setting up a server in Ichapur, care about the difference between .bash_profile and .bashrc?
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Observe carefully...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    What happens when Debangshu creates a script that runs from cron? Which startup files get read?
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Try changing this...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Move an alias from .bashrc to .bash_profile. How does it affect your SSH sessions vs local terminal?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className="animate-[fadeInUp_0.8s_ease-out_0.9s]">
                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 rounded-2xl shadow-xl p-6 border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-600">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Sukanta Hui • 27 years experience</p>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                        sukantahui@codernaccotax.co.in
                                    </div>
                                </div>
                                
                                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4 rounded-r-lg mb-4">
                                    <p className="text-blue-800 dark:text-blue-300">
                                        <strong>Remember:</strong> The golden rule for Bash startup files is "Environment variables in login shells, everything else in .bashrc." 
                                        Think of .bash_profile as your login suit and .bashrc as your daily casual wear. 
                                        Your login suit sets up your formal environment, while casual wear has your handy tools and shortcuts.
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Classroom Tip</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Have students create a simple test in each file to see when they load:
                                            <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
                                                {`echo "Loading .bashrc"`}
                                            </code>
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Professional Insight</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            In production, use .profile for system-wide env vars and keep user-specific aliases in .bashrc. 
                                            This ensures consistency across different shell types and user sessions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inline Styles for Animations */}
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
                
                @media (prefers-reduced-motion: reduce) {
                    .animate-\\[fadeInUp_0\\.8s_ease-out\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.1s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.2s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.3s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.4s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.5s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.6s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.7s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.8s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.9s\\] {
                        animation: none;
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Topic2;