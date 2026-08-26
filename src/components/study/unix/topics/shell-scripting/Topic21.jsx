import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import example files
import processMonitor1 from "./topic21_files/process_monitor1.sh?raw";
import jobControl1 from "./topic21_files/job_control1.sh?raw";
import signalHandler1 from "./topic21_files/signal_handler1.sh?raw";
import processMonitor2 from "./topic21_files/process_monitor2.sh?raw";
import productionScript1 from "./topic21_files/production_script1.sh?raw";

const Topic21 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("ps");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 py-8">
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
        
        @keyframes processFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes pulseSignal {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>

      {/* Header Section */}
      <div className={clsx(
        "max-w-6xl mx-auto mb-12",
        isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out]"
      )}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Topic 21: Process Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Monitoring, controlling, and managing system processes like a professional
            </p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="leading-relaxed">
            Process management is the art of creating, monitoring, and controlling processes in Unix/Linux systems.
            From simple background jobs (<code className="text-sm text-gray-700 dark:text-gray-300">{`&`}</code>) 
            to sophisticated signal handling with <code className="text-sm text-gray-700 dark:text-gray-300">kill</code> 
            and <code className="text-sm text-gray-700 dark:text-gray-300">wait</code>, mastering these tools is essential 
            for any shell scripter working with long-running tasks, parallel execution, or resource management.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section 1: Process Lifecycle Visualization */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[100ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-emerald-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Process Lifecycle & States
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center">
              <svg width="100%" height="200" className="overflow-visible">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                  </marker>
                  <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                
                {/* Process States */}
                <g className="hover:opacity-90 transition-opacity duration-300">
                  <rect x="5%" y="30" width="20%" height="40" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
                  <text x="15%" y="55" textAnchor="middle" fill="#065f46" className="text-sm font-semibold">Created</text>
                  <text x="15%" y="70" textAnchor="middle" fill="#047857" className="text-xs">Forked</text>
                </g>
                
                <g className="hover:opacity-90 transition-opacity duration-300">
                  <rect x="30%" y="30" width="20%" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                  <text x="40%" y="55" textAnchor="middle" fill="#92400e" className="text-sm font-semibold">Running</text>
                  <text x="40%" y="70" textAnchor="middle" fill="#b45309" className="text-xs">CPU Active</text>
                </g>
                
                <g className="hover:opacity-90 transition-opacity duration-300">
                  <rect x="55%" y="30" width="20%" height="40" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                  <text x="65%" y="55" textAnchor="middle" fill="#1e40af" className="text-sm font-semibold">Sleeping</text>
                  <text x="65%" y="70" textAnchor="middle" fill="#1d4ed8" className="text-xs">Waiting</text>
                </g>
                
                <g className="hover:opacity-90 transition-opacity duration-300">
                  <rect x="80%" y="30" width="15%" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                  <text x="87.5%" y="55" textAnchor="middle" fill="#991b1b" className="text-sm font-semibold">Zombie</text>
                  <text x="87.5%" y="70" textAnchor="middle" fill="#dc2626" className="text-xs">Exited</text>
                </g>
                
                {/* Arrows with animation */}
                <path 
                  d="M130,50 L210,50" 
                  stroke="#10b981" 
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
                  d="M270,50 L350,50" 
                  stroke="#10b981" 
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
                  d="M410,50 L480,50" 
                  stroke="#10b981" 
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
                
                {/* Background Jobs Section */}
                <rect x="30%" y="120" width="40%" height="40" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="2" />
                <text x="50%" y="145" textAnchor="middle" fill="#5b21b6" className="text-sm font-semibold">Background Job (&)</text>
                <text x="50%" y="160" textAnchor="middle" fill="#7c3aed" className="text-xs">Running detached</text>
                
                <circle cx="50%" cy="120" r="8" fill="#8b5cf6">
                  <animate 
                    attributeName="opacity" 
                    values="1;0.5;1" 
                    dur="2s" 
                    repeatCount="indefinite" 
                  />
                </circle>
              </svg>
            </div>
            
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Process ID (PID)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Unique identifier assigned to each process. View with <code className="text-sm">ps</code> or <code className="text-sm">echo $$</code>.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Parent PID (PPID)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The PID of the process that created this process. View with <code className="text-sm">ps -f</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Command Reference Tabs */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[200ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-emerald-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Essential Process Commands
          </h2>

          {/* Tabs Navigation */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {["ps", "top", "kill", "wait", "jobs", "&"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap",
                  activeTab === tab
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {tab === "&" ? "Background (&)" : tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            {activeTab === "ps" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">ps - Process Status</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Displays information about active processes. Essential for monitoring what's running on your system.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded mr-3">{`ps`}</code>
                    <span>Basic process list for current terminal</span>
                  </div>
                  <div className="flex items-start">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded mr-3">{`ps aux`}</code>
                    <span>All processes with detailed information (BSD style)</span>
                  </div>
                  <div className="flex items-start">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded mr-3">{`ps -ef`}</code>
                    <span>All processes with full format (System V style)</span>
                  </div>
                  <div className="flex items-start">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded mr-3">{`ps -p PID`}</code>
                    <span>Check specific process by PID</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Real Example in Barrackpore Lab</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tuhina uses <code className="text-sm">ps aux | grep python</code> to find all Python processes 
                    running on the college server before deploying new scripts.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "top" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">top - Real-time Process Monitor</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive command that provides a dynamic real-time view of system processes, CPU, and memory usage.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Interactive Commands</h4>
                    <ul className="space-y-1 text-sm">
                      <li><code className="text-xs">k</code> - Kill a process</li>
                      <li><code className="text-xs">r</code> - Renice a process</li>
                      <li><code className="text-xs">P</code> - Sort by CPU</li>
                      <li><code className="text-xs">M</code> - Sort by memory</li>
                      <li><code className="text-xs">q</code> - Quit</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Batch Mode</h4>
                    <code className="text-sm text-gray-700 dark:text-gray-300 block">{`top -b -n 1 > process_snapshot.txt`}</code>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Swadeep uses this for automated monitoring of the Ichapur school server.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "kill" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">kill - Send Signals to Processes</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sends signals to processes to terminate, pause, or resume execution. Different signals have different effects.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-red-100 dark:bg-red-900 px-3 py-1 rounded mr-3">{`kill -9 PID`}</code>
                    <div>
                      <span className="font-medium text-red-700 dark:text-red-300">SIGKILL (9)</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Forceful termination - cannot be caught or ignored</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-green-100 dark:bg-green-900 px-3 py-1 rounded mr-3">{`kill -15 PID`}</code>
                    <div>
                      <span className="font-medium text-green-700 dark:text-green-300">SIGTERM (15)</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Graceful termination - allows cleanup</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded mr-3">{`kill -STOP PID`}</code>
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">SIGSTOP</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pause process execution</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "wait" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">wait - Synchronize Process Execution</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Waits for background processes to complete before continuing. Essential for script synchronization.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Basic Usage</h4>
                    <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-3 rounded">
                      {`#!/bin/bash
sleep 10 &
sleep_pid=$!
echo "Waiting for sleep to finish..."
wait $sleep_pid
echo "All done!"`}
                    </code>
                  </div>
                  
                  <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                    <h4 className="font-bold text-teal-800 dark:text-teal-300 mb-2">Real-world Scenario</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Abhronila uses <code className="text-sm">wait</code> in backup scripts to ensure database dump 
                      completes before starting file compression at Naihati High School.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "jobs" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">jobs - Manage Background Jobs</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Lists and manages jobs running in the background of the current shell session.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded mr-3">{`jobs`}</code>
                    <span>List all background jobs</span>
                  </div>
                  <div className="flex items-start">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded mr-3">{`fg %1`}</code>
                    <span>Bring job 1 to foreground</span>
                  </div>
                  <div className="flex items-start">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded mr-3">{`bg %2`}</code>
                    <span>Send job 2 to background</span>
                  </div>
                  <div className="flex items-start">
                    <code className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded mr-3">{`kill %3`}</code>
                    <span>Terminate job 3</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "&" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Background Execution (&)</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Runs a command in the background, allowing the shell to continue processing without waiting.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Basic Syntax</h4>
                    <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-3 rounded">
                      {`# Run command in background
long_running_task.sh &

# Run multiple commands in parallel
process_data.sh &
generate_report.sh &
send_email.sh &

# Store the PID
backup_script.sh &
backup_pid=$!`}
                    </code>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2">Important Note</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Background jobs will be terminated when you log out unless you use <code className="text-sm">nohup</code> 
                      or <code className="text-sm">disown</code> to detach them from the terminal.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Practical Examples */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[300ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-emerald-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Practical Script Examples
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Process Monitoring Script</h3>
              <ShellFileLoader
                fileModule={processMonitor1}
                title="System Process Monitor"
                highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
              />
              
              <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Use Case: Shyamnagar Server</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Debangshu runs this script daily to monitor critical services on the college web server.
                  It helps identify memory leaks and hung processes before they affect students.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Job Control Script</h3>
              <ShellFileLoader
                fileModule={jobControl1}
                title="Parallel Job Execution"
                highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Signal Handling Script</h3>
              <ShellFileLoader
                fileModule={signalHandler1}
                title="Graceful Process Termination"
                highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
              />
            </div>
          </div>
        </section>

        {/* Section 4: Advanced Monitoring */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[400ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Advanced Monitoring Techniques
          </h2>

          <ShellFileLoader
            fileModule={processMonitor2}
            title="Advanced Process Monitor"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}
          />
          
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Process Trees</h4>
              <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                {`pstree -p`}
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Visualize parent-child relationships
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Resource Limits</h4>
              <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                {`ulimit -a`}
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                View system resource limits per process
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Process Priority</h4>
              <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-2 rounded">
                {`nice -n 10 script.sh`}
              </code>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Run with adjusted priority (-20 to 19)
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Production Script */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[500ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Production-Ready Script
          </h2>

          <ShellFileLoader
            fileModule={productionScript1}
            title="Production Service Manager"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]}
          />
          
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <h4 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-3">
              Scenario: Barrackpore College Web Services
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This script manages multiple web services for the college portal. Swadeep uses it to:
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                  <span className="text-purple-600 dark:text-purple-400 text-sm">1</span>
                </div>
                <span>Start all services in parallel for faster boot time</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                  <span className="text-purple-600 dark:text-purple-400 text-sm">2</span>
                </div>
                <span>Monitor service health and restart if failed</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                  <span className="text-purple-600 dark:text-purple-400 text-sm">3</span>
                </div>
                <span>Gracefully stop services during maintenance</span>
              </div>
            </div>
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
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">Pitfall 1: Zombie Processes</h4>
              <div className="space-y-3">
                <p className="text-red-700 dark:text-red-400">
                  When parent doesn't wait for child process termination
                </p>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-red-100 dark:bg-red-900 p-2 rounded">
                  {`# Creates zombie if parent doesn't wait
./child_process.sh &
# Missing: wait $!`}
                </code>
                <p className="text-red-700 dark:text-red-400 text-sm">
                  <strong>Solution:</strong> Always use <code className="text-sm">wait</code> or implement signal handlers
                </p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Pitfall 2: kill -9 Abuse</h4>
              <div className="space-y-3">
                <p className="text-amber-700 dark:text-amber-400">
                  Using SIGKILL when SIGTERM would be sufficient
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded">
                    <code className="text-sm text-gray-700 dark:text-gray-300">{`kill -9 PID`}</code>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">• No cleanup possible<br/>• Resource leaks</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded">
                    <code className="text-sm text-gray-700 dark:text-gray-300">{`kill -15 PID`}</code>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">• Graceful shutdown<br/>• Cleanup handlers run</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Pitfall 3: Background Job Limitations</h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded">
                  {`# This job dies when terminal closes
./long_job.sh &`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-green-100 dark:bg-green-900 p-2 rounded">
                  {`# Survives terminal closure
nohup ./long_job.sh &`}
                </code>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  Students in Ichapur often lose their background jobs when SSH session drops.
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
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">Process Safety</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Always trap SIGTERM for graceful shutdown</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Store PIDs in variables for later reference</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use <code className="text-sm">wait</code> to prevent zombies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">Monitoring Guidelines</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monitor CPU and memory with <code className="text-sm">ps aux --sort=-%cpu</code></span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use <code className="text-sm">timeout</code> for runaway processes</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Log process activities for debugging</span>
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
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-teal-300 dark:border-teal-700 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300">Teacher's Note</h3>
                <p className="text-sm text-teal-600 dark:text-teal-400">
                  Sukanta Hui • 27 years experience • Operating Systems, Web Development
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Professional Insight:</strong> In my decades of teaching students from Barrackpore to Shyamnagar, 
                I've seen process management make or break production systems. The difference between a junior and senior 
                developer is often how they handle process lifecycle.
              </p>

              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Critical Knowledge:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span><code className="text-sm">kill -9</code> should be your <em>last</em> resort, not your first choice</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Background jobs (<code className="text-sm">&</code>) are tied to your terminal session - use <code className="text-sm">nohup</code> or <code className="text-sm">screen</code> for long-running tasks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Always check process return codes with <code className="text-sm">wait</code> to detect failures</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pro Tip:</strong> When Tuhina manages the college database server, she uses 
                <code className="text-sm"> ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem</code> to identify memory-hungry 
                processes. This single command has prevented three server crashes this semester.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-teal-200 dark:border-teal-700">
              <p className="text-sm text-teal-700 dark:text-teal-400">
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
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Process States</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Running, Sleeping, Zombie, Stopped
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Essential Commands</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ps, top, kill, jobs, bg, fg, wait
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
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Background Jobs</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use <code className="text-sm">&</code>, manage with <code className="text-sm">jobs</code>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Signal Priority</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    SIGTERM (15) before SIGKILL (9)
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
                <strong>Observe carefully:</strong> What happens when you run <code className="text-sm">sleep 60 &</code> 
                and then immediately close your terminal? Why does the process sometimes continue and sometimes die?
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Try changing this:</strong> In the production script example, what if Abhronila changes the 
                signal from <code className="text-sm">SIGTERM</code> to <code className="text-sm">SIGKILL</code> for 
                stopping services? What could break in the Ichapur school portal?
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Consider:</strong> How would you modify the process monitoring script to alert Debangshu 
                when any service uses more than 80% CPU for more than 5 minutes?
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
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Process Tree Hack
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Kill an entire process tree: 
                <code className="text-sm block mt-1">{`pkill -TERM -P $parent_pid`}</code>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Monitoring Shortcut
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Watch processes in real-time:
                <code className="text-sm block mt-1">{`watch -n 2 'ps aux --sort=-%cpu | head -20'`}</code>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Production Trick
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For critical services in Barrackpore, I use:
                <code className="text-sm block mt-1">{`timeout 300 ./critical_script.sh`}</code>
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
            Topic 21: Process Management
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-300">
              Previous: Here Documents
            </button>
            <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300">
              Next: Command-line Option Parsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic21;