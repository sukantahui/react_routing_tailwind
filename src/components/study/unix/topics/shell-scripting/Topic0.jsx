import { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import scriptExample1 from "./topic0_files/script_example1.sh?raw";
import scriptExample2 from "./topic0_files/script_example2.sh?raw";
import permissionExample from "./topic0_files/permission_example.sh?raw";
import backupFiles from "./topic0_files/backup_files.sh?raw";

export default function Topic0() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 transition-colors duration-500">
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
          
          @keyframes subtlePulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
          
          @keyframes highlightGlow {
            0%, 100% {
              box-shadow: 0 0 5px rgba(59, 130, 246, 0);
            }
            50% {
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
            }
          }
          
          .motion-safe\\:fade-slide-up {
            animation: fadeSlideUp 0.6s ease-out forwards;
          }
          
          .motion-safe\\:subtle-pulse {
            animation: subtlePulse 2s ease-in-out infinite;
          }
          
          .motion-reduced\\:animate-none {
            animation: none;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className="motion-safe:fade-slide-up opacity-0">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
            <span className="text-blue-600 dark:text-blue-300 font-medium">
              Topic 0: Shell Scripting Foundation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
            Shell Script Anatomy: Shebang, Execution & Lifecycle
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
            Learn how shell scripts come to life—from the magic first line to execution flow. 
            Essential knowledge for every Linux/Unix developer starting their scripting journey.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        {/* Conceptual Explanation */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.1s" }}
        >
          <div 
            className={clsx(
              "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500",
              "hover:shadow-2xl hover:scale-[1.002] border border-gray-200 dark:border-gray-700",
              hoveredCard === 1 && "ring-2 ring-blue-500 dark:ring-blue-400"
            )}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                What is a Shell Script?
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                A shell script is a text file containing a sequence of commands for a Unix/Linux shell to execute. 
                Think of it as a recipe card that Swadeep can follow in his Barrackpore kitchen—each line tells 
                the system exactly what to do, in order.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Shell as Interpreter
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Just like Tuhina needs someone to read her recipe, the shell reads and interprets your script line by line.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Automation Tool
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Automates repetitive tasks that Debangshu would otherwise type manually in the terminal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Shebang Line */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          <div 
            className={clsx(
              "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500",
              "hover:shadow-2xl hover:scale-[1.002] border border-gray-200 dark:border-gray-700",
              hoveredCard === 2 && "ring-2 ring-green-500 dark:ring-green-400"
            )}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              The Shebang Line (#!)
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Purpose & Signature
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The shebang ({"#"}{"!"}) must be the <strong>first line</strong> of an executable script. 
                    It tells the system which interpreter to use. When Abhronila writes her first script, 
                    this line determines whether bash, sh, python, or another interpreter reads her commands.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <code className="text-sm text-gray-700 dark:text-gray-300 block">
                      {`#!/bin/bash`}
                    </code>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <strong>Prototype:</strong> {"#"}{"!"}{"path/to/interpreter"} [optional-arg]
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Common Shebang Variations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <code className="text-sm text-blue-600 dark:text-blue-300">
                        {`#!/bin/bash`}
                      </code>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Standard bash interpreter
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <code className="text-sm text-green-600 dark:text-green-300">
                        {`#!/usr/bin/env bash`}
                      </code>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Uses env to find bash (more portable)
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <code className="text-sm text-purple-600 dark:text-purple-300">
                        {`#!/bin/sh`}
                      </code>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        System shell (POSIX compliant)
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <code className="text-sm text-yellow-600 dark:text-yellow-300">
                        {`#!/usr/bin/python3`}
                      </code>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Python script interpreter
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <div className="sticky top-6 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">
                    How System Reads Shebang
                  </h4>
                  <svg className="w-full h-48" viewBox="0 0 300 200">
                    <rect x="10" y="10" width="280" height="180" rx="10" fill="none" stroke="#4B5563" strokeWidth="2"/>
                    
                    {/* File Content */}
                    <text x="20" y="40" className="text-xs font-mono" fill="#60A5FA">
                      {`#!/bin/bash`}
                    </text>
                    <text x="20" y="60" className="text-xs font-mono" fill="#9CA3AF">
                      {"echo \"Hello from Naihati!\""}
                    </text>
                    
                    {/* Arrow */}
                    <path d="M150,90 L150,120" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrowhead)">
                      <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="2s" repeatCount="indefinite"/>
                    </path>
                    
                    {/* Interpreter */}
                    <rect x="100" y="120" width="100" height="40" rx="5" fill="#1E40AF" fillOpacity="0.2" stroke="#60A5FA" strokeWidth="2"/>
                    <text x="150" y="145" textAnchor="middle" className="text-xs font-bold" fill="#60A5FA">Bash</text>
                    <text x="150" y="160" textAnchor="middle" className="text-xs" fill="#9CA3AF">Interpreter</text>
                    
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#60A5FA"/>
                      </marker>
                    </defs>
                  </svg>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    When executed, the kernel reads the first line, finds the interpreter, and passes the script to it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Script Example */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.3s" }}
        >
          <ShellFileLoader
            fileModule={scriptExample1}
            title="Basic Script with Shebang"
            highlightLines={[1]}
          />
          
          <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-lg text-yellow-800 dark:text-yellow-300 mb-2">
                  Hint Section
                </h4>
                <p className="text-yellow-700 dark:text-yellow-400">
                  <strong>Think about:</strong> What happens if you place the shebang line on the second line instead of first? 
                  <br />
                  <strong>Observe carefully:</strong> The space between {"#"}{"!"} and /bin/bash is optional but conventional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Execution Permissions */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          <div 
            className={clsx(
              "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500",
              "hover:shadow-2xl hover:scale-[1.002] border border-gray-200 dark:border-gray-700",
              hoveredCard === 3 && "ring-2 ring-purple-500 dark:ring-purple-400"
            )}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              Execution Permission System
            </h2>
            
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl transition-transform duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3">r</div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">Read (4)</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Permission to view file contents. Like Debangshu reading notes in Shyamnagar library.
                  </p>
                </div>
                
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl transition-transform duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-3">w</div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">Write (2)</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Permission to modify file. Like Tuhina editing her recipe in Barrackpore.
                  </p>
                </div>
                
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl transition-transform duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">x</div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">Execute (1)</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Permission to run as program. Essential for scripts!
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Setting Execution Permission
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Before a script can run, it must have execute permission. This is like getting 
                  permission from the principal at Ichapur school to conduct an event.
                </p>
                
                <ShellFileLoader
                  fileModule={permissionExample}
                  title="Permission Commands"
                  highlightLines={[1, 2, 5]}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <code className="text-sm text-gray-700 dark:text-gray-300">
                      {`chmod +x script.sh`}
                    </code>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Add execute permission for all users
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <code className="text-sm text-gray-700 dark:text-gray-300">
                      {`chmod 755 script.sh`}
                    </code>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Owner: rwx (7), Group: r-x (5), Others: r-x (5)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Script Lifecycle */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.5s" }}
        >
          <div 
            className={clsx(
              "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500",
              "hover:shadow-2xl hover:scale-[1.002] border border-gray-200 dark:border-gray-700",
              hoveredCard === 4 && "ring-2 ring-red-500 dark:ring-red-400"
            )}
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              Script Lifecycle: Birth to Termination
            </h2>
            
            <div className="space-y-8">
              {/* Lifecycle Steps Visualization */}
              <div className="relative">
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                {[
                  { step: 1, title: "Invocation", desc: "User or system calls the script", color: "blue", example: "./backup.sh or bash script.sh" },
                  { step: 2, title: "Shebang Processing", desc: "Kernel reads first line, loads interpreter", color: "green", example: "Interpreter found at /bin/bash" },
                  { step: 3, title: "Interpretation", desc: "Shell reads and executes commands sequentially", color: "purple", example: "Line 1, Line 2, Line 3..." },
                  { step: 4, title: "Environment Setup", desc: "Inherits parent environment, sets up variables", color: "yellow", example: "PATH, USER, HOME variables" },
                  { step: 5, title: "Execution", desc: "Commands run, produce output/effects", color: "red", example: "Files created, processes started" },
                  { step: 6, title: "Termination", desc: "Script ends, exit status returned", color: "gray", example: "Exit 0 (success) or 1 (error)" },
                ].map((item, index) => (
                  <div 
                    key={item.step} 
                    className="flex flex-col md:flex-row items-center mb-8 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-full bg-${item.color}-500 text-white flex items-center justify-center font-bold text-lg z-10 mb-4 md:mb-0 transition-transform duration-300 group-hover:scale-110`}>
                      {item.step}
                    </div>
                    <div className="md:ml-8 md:w-5/6 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:border group-hover:border-gray-300 dark:group-hover:border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {item.desc}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium">
                          Step {item.step}
                        </span>
                      </div>
                      <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <code className="text-sm text-gray-700 dark:text-gray-300">
                          {item.example}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <ShellFileLoader
                fileModule={scriptExample2}
                title="Complete Script Example"
                highlightLines={[1, 2, 3, 4, 5]}
              />
            </div>
          </div>
        </section>

        {/* Common Pitfalls Section */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Common Pitfalls & Mistakes
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">
                  Beginner Mistakes
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Missing shebang:</strong> Script runs with wrong interpreter
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Wrong permissions:</strong> {"Permission denied"} error
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Windows line endings:</strong> {"^M"} errors on Linux
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Relative paths:</strong> Script breaks when called from different directory
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">
                  Conceptual Misunderstandings
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Script vs Command:</strong> Scripts need interpreter, commands are binary
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Permission inheritance:</strong> Parent shell permissions don{"'"}t automatically apply
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Exit status:</strong> Every script returns exit code (0=success)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">
                Debugging Command Examples
              </h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block p-3 bg-gray-50 dark:bg-gray-900 rounded">
                  {`file script.sh      # Check file type and line endings`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block p-3 bg-gray-50 dark:bg-gray-900 rounded">
                  {`ls -l script.sh    # View permissions`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block p-3 bg-gray-50 dark:bg-gray-900 rounded">
                  {`bash -x script.sh  # Debug mode (shows each command)`}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Tips & Tricks (Professional Level)
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
                  Industry Habits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold mt-1">→</span>
                    <div>
                      <strong className="text-gray-800 dark:text-gray-100">Always use shebang</strong>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Even if you always call with bash explicitly
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold mt-1">→</span>
                    <div>
                      <strong className="text-gray-800 dark:text-gray-100">Set execute bit in CI/CD</strong>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Automate permission setting in deployment
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold mt-1">→</span>
                    <div>
                      <strong className="text-gray-800 dark:text-gray-100">Use env for portability</strong>
                      <code className="block text-sm text-green-600 dark:text-green-300 mt-1">
                        {`#!/usr/bin/env bash`}
                      </code>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
                  Classroom-Tested Shortcuts
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold mt-1">→</span>
                    <div>
                      <strong className="text-gray-800 dark:text-gray-100">Create template</strong>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Save a script template with shebang and basic structure
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold mt-1">→</span>
                    <div>
                      <strong className="text-gray-800 dark:text-gray-100">Alias for common patterns</strong>
                      <code className="block text-sm text-green-600 dark:text-green-300 mt-1">
                        {`alias mkexec='touch $1 && chmod +x $1 && vi $1'`}
                      </code>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold mt-1">→</span>
                    <div>
                      <strong className="text-gray-800 dark:text-gray-100">Test in container first</strong>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Use Docker to test portability across environments
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              Best Practices Checklist
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Shebang Always First", check: "✓", desc: "First line, no exceptions" },
                { title: "Set Execute Permission", check: "✓", desc: "chmod +x before running" },
                { title: "Use Portable Shebang", check: "✓", desc: "Prefer /usr/bin/env bash" },
                { title: "Check Line Endings", check: "✓", desc: "Use LF, not CRLF" },
                { title: "Test Exit Codes", check: "✓", desc: "Always check $?" },
                { title: "Add Help/Usage", check: "✓", desc: "Include --help option" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{item.check}</span>
                    </div>
                    <span className="text-xs font-medium px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                      Practice {index + 1}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">
                Professional Script Template
              </h4>
                <ShellFileLoader
                  fileModule={backupFiles}
                  title="Script Template"
                  highlightLines={[]}
                />
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.9s" }}
        >
          <div 
            className={clsx(
              "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8",
              "shadow-xl border-2 border-indigo-200 dark:border-indigo-800 transition-all duration-500",
              "hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-600",
              "group cursor-pointer"
            )}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-xl inline-block group-hover:animate-[highlightGlow_2s_ease-in-out_infinite]">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">SH</span>
                    </div>
                    <h4 className="text-center font-bold text-lg mt-4 text-gray-800 dark:text-gray-100">
                      Sukanta Hui
                    </h4>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                      27 Years Experience
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Teacher's Note
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-indigo-100 dark:border-indigo-900">
                    <h4 className="font-bold text-lg text-indigo-700 dark:text-indigo-300 mb-4">
                      Critical Insights from Industry
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-indigo-500 font-bold mt-1">•</span>
                        <div>
                          <strong className="text-gray-800 dark:text-gray-100">Shebang is non-negotiable:</strong>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            In my 27 years of teaching at Barrackpore and Naihati institutes, 
                            I've seen more scripts fail from missing shebang than any other reason. 
                            It's the script's identity card.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-indigo-500 font-bold mt-1">•</span>
                        <div>
                          <strong className="text-gray-800 dark:text-gray-100">Permissions are security:</strong>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            When Swadeep sets 777 permissions for convenience, he's opening doors 
                            to security risks. Use 755 for scripts, 644 for data files.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-indigo-500 font-bold mt-1">•</span>
                        <div>
                          <strong className="text-gray-800 dark:text-gray-100">Lifecycle understanding:</strong>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Debugging becomes easy when you visualize the script lifecycle. 
                            Imagine Tuhina tracing each step in her Shyamnagar lab - that's how professionals debug.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">700+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Students Taught</div>
                    </div>
                    <div className="text-center p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">27</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Core Skills</div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-indigo-200 dark:border-indigo-800">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "Remember: A script without shebang is like a letter without address. 
                      It might contain great content, but it won't reach the right interpreter. 
                      Master these fundamentals, and you'll build scripts that work anywhere - 
                      from Ichapur college labs to enterprise servers."
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                        Email: sukantahui@codernaccotax.co.in
                      </span>
                      <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                        Mobile: 7003756860
                      </span>
                      <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                        Skills: Programming, RDBMS, OS, Web Dev
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "1s" }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-8">
              Mini Checklist: What to Remember
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Before Writing Script</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <span>Choose interpreter (bash/sh/python)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <span>Plan script lifecycle steps</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <span>Determine required permissions</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">After Writing Script</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">4</span>
                    </div>
                    <span>Add shebang as first line</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">5</span>
                    </div>
                    <span>Set execute permission (chmod +x)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">6</span>
                    </div>
                    <span>Test with ./script.sh</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white/20 rounded-xl backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-4">Next Topic Preview</h4>
              <p className="opacity-90">
                <strong>Topic 1:</strong> Interactive vs non-interactive shells. Learn how your shell 
                behaves differently when you're typing commands versus when scripts run automatically.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>© Shell Scripting Mastery • Topic 0: Script Anatomy • Barrackpore Learning Series</p>
          <p className="text-sm mt-2">Examples based on real scenarios from Shyamnagar, Ichapur, and Naihati institutes</p>
        </div>
      </footer>
    </div>
  );
}