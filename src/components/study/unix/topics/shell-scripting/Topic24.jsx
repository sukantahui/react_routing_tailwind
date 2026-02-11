import { useState, useEffect } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import example shell scripts
import debugExample1 from "./topic24_files/debug_example1.sh?raw";
import debugExample2 from "./topic24_files/debug_example2.sh?raw";
import debugExample3 from "./topic24_files/debug_example3.sh?raw";
import debugExample4 from "./topic24_files/debug_example4.sh?raw";
import debugExample5 from "./topic24_files/debug_example5.sh?raw";

/**
 * Topic24: Debugging Techniques in Shell Scripts
 * 
 * Prototype: function Topic24() { ... }
 * Return type: JSX.Element
 * Purpose: Teach shell script debugging techniques including set -x, set -e, bash -x
 * When & why used: When scripts don't work as expected, for troubleshooting and understanding script execution flow
 * 
 * This component covers:
 * - Enabling debug mode with set -x
 * - Exit immediately on error with set -e
 * - Using bash -x for debugging
 * - Debug traps and custom debugging functions
 */

export default function Topic24() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 md:p-8 dark">
      {/* Header Section with Animation */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16",
          "transform transition-all duration-700",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Topic 24: Debugging Techniques
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Mastering the art of troubleshooting shell scripts with professional debugging tools
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <span className="px-4 py-2 bg-blue-900/50 rounded-full text-blue-300 border border-blue-700/50">
            set -x
          </span>
          <span className="px-4 py-2 bg-purple-900/50 rounded-full text-purple-300 border border-purple-700/50">
            set -e
          </span>
          <span className="px-4 py-2 bg-green-900/50 rounded-full text-green-300 border border-green-700/50">
            bash -x
          </span>
          <span className="px-4 py-2 bg-red-900/50 rounded-full text-red-300 border border-red-700/50">
            Debug Traps
          </span>
        </div>
      </section>

      {/* Introduction Section */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16 p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50",
          "transform transition-all duration-700 delay-150 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-900/20",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="text-3xl font-bold mb-6 text-cyan-300 flex items-center gap-3">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Why Debugging Matters
        </h2>
        
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Debugging is the process of finding and fixing errors in your shell scripts. 
          Even experienced developers like <span className="text-cyan-300">Debangshu</span> from Barrackpore 
          spend significant time debugging. A script that works on your machine might fail on 
          <span className="text-cyan-300">Tuhina's</span> system in Shyamnagar due to different environments.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">The Debugging Mindset</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Assume nothing works until proven</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Isolate the problem step by step</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Read error messages carefully</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-3 text-purple-300">Common Debugging Scenarios</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Variable not expanding as expected</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Script exits without error message</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Permission or path issues</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Debug Mode with set -x */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16 p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50",
          "transform transition-all duration-700 delay-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/20",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-300 flex items-center gap-3">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          set -x: Print Each Command Before Execution
        </h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-200">Concept Explanation</h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            When you add <code className="text-blue-300">set -x</code> (or <code className="text-blue-300">set -o xtrace</code>) 
            at the beginning of your script, Bash will print each command to stderr before executing it. 
            This is invaluable for understanding the flow of execution and seeing exactly what's happening.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-green-300">How It Works</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Shows expanded variables (after substitution)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Reveals actual command being executed</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Prefixes each line with <code className="text-green-300">+</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Can be turned off with <code className="text-green-300">set +x</code></span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-amber-300">Real-World Use Case</h4>
              <p className="text-gray-300 mb-3">
                Imagine <span className="text-amber-300">Swadeep</span> is debugging a backup script 
                that's failing only when run from cron. With <code className="text-amber-300">set -x</code>, 
                he can see:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• What paths are being used</li>
                <li>• How variables expand in different environments</li>
                <li>• Which specific command fails</li>
              </ul>
            </div>
          </div>
        </div>
        
        <ShellFileLoader
          fileModule={debugExample1}
          title="Basic Debug Example with set -x"
          highlightLines={[2, 3, 4, 5, 6, 7]}
        />
        
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
          <h4 className="text-lg font-semibold mb-2 text-blue-300">Expected Output:</h4>
          <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded">
{`+ echo 'Starting backup process...'
Starting backup process...
+ USER=abhronila
+ echo 'Backing up files for user: abhronila'
Backing up files for user: abhronila
+ BACKUP_DIR=/home/abhronila/backups
+ date
+ echo 'Backup completed at: Mon Dec 12 14:30:45 IST 2023'
Backup completed at: Mon Dec 12 14:30:45 IST 2023`}
          </pre>
        </div>
        
        <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-700/30">
          <h4 className="text-lg font-semibold mb-2 text-purple-300">Hint Section</h4>
          <p className="text-gray-300">
            <span className="font-semibold">Think about:</span> Why does <code className="text-purple-300">set -x</code> 
            show the command <em>after</em> variable expansion? Try running the same script without 
            <code className="text-purple-300">set -x</code> and compare the outputs.
          </p>
        </div>
      </section>

      {/* Exit on Error with set -e */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16 p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50",
          "transform transition-all duration-700 delay-450 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-900/20",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="text-3xl font-bold mb-6 text-red-300 flex items-center gap-3">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          set -e: Exit Immediately on Error
        </h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-200">Concept Explanation</h3>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            The <code className="text-red-300">set -e</code> option (or <code className="text-red-300">set -o errexit</code>) 
            tells Bash to exit immediately if any command exits with a non-zero status. This prevents 
            scripts from continuing after an error, which could cause more damage.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-green-300">When to Use set -e</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Production scripts where failure should stop execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Critical operations like database updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>When you want to know the first point of failure</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-amber-300">When NOT to Use set -e</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interactive scripts where you want to handle errors manually</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>When using commands that may fail intentionally</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>During cleanup operations in traps</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <ShellFileLoader
          fileModule={debugExample2}
          title="set -e: Exit on Error Example"
          highlightLines={[2, 3, 4, 5, 6, 7, 8, 9]}
        />
        
        <div className="mt-6 p-4 bg-red-900/20 rounded-lg border border-red-700/30">
          <h4 className="text-lg font-semibold mb-2 text-red-300">Expected Behavior:</h4>
          <p className="text-gray-300 mb-2">
            The script will exit at line 6 because <code className="text-red-300">ls /nonexistent</code> 
            returns a non-zero exit code. Line 7 will never execute.
          </p>
          <pre className="text-sm text-gray-300 bg-gray-900/50 p-4 rounded">
{`Processing file: data1.txt
File processed successfully
Processing file: data2.txt
File processed successfully
Processing file: /nonexistent
ls: cannot access '/nonexistent': No such file or directory
[Script exits here with code 2]`}
          </pre>
        </div>
      </section>

      {/* Combining Debug Options */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16 p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50",
          "transform transition-all duration-700 delay-600 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-900/20",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="text-3xl font-bold mb-6 text-green-300 flex items-center gap-3">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
          Combining Debug Options: set -ex
        </h2>
        
        <div className="mb-8">
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Professional shell scripters often combine debugging options. The most common combination is 
            <code className="text-green-300">set -ex</code>, which enables both trace mode and exit-on-error.
            This gives you the best of both worlds: detailed execution tracing and automatic error detection.
          </p>
          
          <ShellFileLoader
            fileModule={debugExample3}
            title="Combined set -ex Example"
            highlightLines={[2, 4, 5, 6, 7, 8]}
          />
          
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-cyan-300">Professional Tip</h4>
              <p className="text-gray-300">
                Use <code className="text-cyan-300">set -euxo pipefail</code> for maximum safety:
              </p>
              <ul className="mt-3 space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><code className="text-cyan-300">-e</code>: Exit on error</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><code className="text-cyan-300">-u</code>: Exit on undefined variables</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><code className="text-cyan-300">-x</code>: Print commands</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><code className="text-cyan-300">-o pipefail</code>: Catch pipe failures</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-amber-300">Temporary Debugging</h4>
              <p className="text-gray-300 mb-3">
                Sometimes you only want debugging for specific sections:
              </p>
              <pre className="text-sm text-gray-300 bg-gray-900/70 p-3 rounded">
{`#!/bin/bash
# Normal execution here
set -x  # Start debugging
# Debug this section
set +x  # Stop debugging
# Continue normally`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* bash -x Command Line Debugging */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16 p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50",
          "transform transition-all duration-700 delay-750 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-900/20",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="text-3xl font-bold mb-6 text-yellow-300 flex items-center gap-3">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
          </svg>
          bash -x: Debugging Without Modifying Scripts
        </h2>
        
        <div className="mb-8">
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            You can debug scripts without editing them by using <code className="text-yellow-300">bash -x</code> 
            on the command line. This is especially useful when:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-green-300">Command Line Debugging</h4>
              <pre className="text-sm text-gray-300 bg-gray-900/70 p-4 rounded">
{`# Debug entire script
bash -x script.sh

# Debug specific script with arguments
bash -x backup.sh /home/tuhina/data

# Debug from stdin
bash -x << 'EOF'
echo "Hello from stdin"
ls /tmp
EOF

# Combine with other options
bash -ex script.sh  # -e for exit on error too`}
              </pre>
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-blue-300">Practical Example</h4>
              <p className="text-gray-300 mb-3">
                When <span className="text-blue-300">Abhronila</span> gets a script from her colleague in 
                Ichapur that's failing, she can debug it without risking changes:
              </p>
              <pre className="text-sm text-gray-300 bg-gray-900/70 p-4 rounded">
{`$ bash -x problematic_script.sh
+ check_dependencies
+ which docker
+ echo 'Docker found at: /usr/bin/docker'
Docker found at: /usr/bin/docker
+ backup_files
+ tar czf backup.tar.gz /important/data
tar: /important/data: Cannot stat: No such file or directory
[Script fails here]`}
              </pre>
            </div>
          </div>
          
          <ShellFileLoader
            fileModule={debugExample4}
            title="Script to Debug with bash -x"
            highlightLines={[]}
          />
          
          <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
            <h4 className="text-lg font-semibold mb-2 text-yellow-300">Exercise:</h4>
            <p className="text-gray-300">
              Run this script with: <code className="text-yellow-300">bash -x topic24_files/debug_example4.sh Swadeep</code>
              <br/>
              <span className="font-semibold">Observe carefully:</span> How does the variable <code className="text-yellow-300">$1</code> 
              expand in the debug output?
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Debugging Techniques */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16 p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50",
          "transform transition-all duration-700 delay-900 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/20",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-300 flex items-center gap-3">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zm4.657 2.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm3 6v-1h4v1a2 2 0 11-4 0zm4-2c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
          Advanced Debugging Techniques
        </h2>
        
        <div className="mb-8">
          <ShellFileLoader
            fileModule={debugExample5}
            title="Custom Debug Function with Levels"
            highlightLines={[3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 16, 17, 22, 23]}
          />
          
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-green-300">Debug Function Benefits</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Can be turned on/off with environment variable</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Adds timestamps and script name automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Can write to log file instead of stderr</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supports different debug levels (INFO, DEBUG, ERROR)</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
              <h4 className="text-xl font-semibold mb-3 text-blue-300">Using PS4 for Custom Debug Output</h4>
              <p className="text-gray-300 mb-3">
                The <code className="text-blue-300">PS4</code> variable controls what's printed before each 
                debug line when using <code className="text-blue-300">set -x</code>:
              </p>
              <pre className="text-sm text-gray-300 bg-gray-900/70 p-3 rounded">
{`# Show line numbers and function names
export PS4='+ \${BASH_SOURCE}:\${LINENO}: \${FUNCNAME[0]:+\${FUNCNAME[0]}(): }'

# Show timestamp and script name
export PS4='+ $(date "+%T"): [\${BASH_SOURCE##*/}:\${LINENO}] '`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Common Pitfalls Section */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16 p-8 rounded-2xl bg-red-900/10 backdrop-blur-sm border border-red-700/30",
          "transform transition-all duration-700 delay-1050",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="text-3xl font-bold mb-6 text-red-300">Common Pitfalls & Mistakes</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-red-900/20 rounded-xl border border-red-700/30">
            <h4 className="text-xl font-semibold mb-3 text-red-300">Beginner Mistakes</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <span className="font-semibold">Forgetting set +x:</span> Leaving debug mode on in production
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <span className="font-semibold">Overusing set -e:</span> Breaking scripts that handle errors intentionally
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <span className="font-semibold">Ignoring pipefail:</span> Missing errors in pipelines like 
                  <code className="text-red-300 mx-1">cmd1 | cmd2 | cmd3</code>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-red-900/20 rounded-xl border border-red-700/30">
            <h4 className="text-xl font-semibold mb-3 text-amber-300">Conceptual Misunderstandings</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">!</span>
                </div>
                <div>
                  <span className="font-semibold">set -x shows commands before execution:</span> 
                  It shows the command that <em>will be</em> executed, not what you typed
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">!</span>
                </div>
                <div>
                  <span className="font-semibold">Debug output goes to stderr:</span> 
                  This is why you can redirect normal output separately
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">!</span>
                </div>
                <div>
                  <span className="font-semibold">bash -x works on any script:</span> 
                  Even scripts without shebang or permission issues
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16 p-8 rounded-2xl bg-green-900/10 backdrop-blur-sm border border-green-700/30",
          "transform transition-all duration-700 delay-1200",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="text-3xl font-bold mb-6 text-green-300">Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-green-300">Coding Standards</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Always start production scripts with <code className="text-green-300">set -euo pipefail</code></span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Use a debug flag: <code className="text-green-300">{`DEBUG=\${DEBUG:-false}`}</code></span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Log to both console and file in production</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-300">Debugging Workflow</h4>
            <ol className="space-y-4 text-gray-300 list-decimal pl-5">
              <li>First, run script normally to see the error</li>
              <li>Add <code className="text-blue-300">set -x</code> at the top</li>
              <li>Run with <code className="text-blue-300">bash -x script.sh</code> if needed</li>
              <li>Isolate the failing command</li>
              <li>Test the command manually</li>
              <li>Fix and remove debug code before commit</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Teacher's Note Section */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto mb-16 p-8 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-700/30",
          "transform transition-all duration-700 delay-1350 hover:border-blue-500/50",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold">SH</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-300">Teacher's Note</h3>
            <p className="text-gray-400">Sukanta Hui • 27 years experience</p>
          </div>
        </div>
        
        <div className="space-y-4 text-gray-300">
          <p className="text-lg">
            Debugging is not just about finding errors—it's about understanding how your code actually runs versus how you think it runs. 
            I've seen students like <span className="text-blue-300">Swadeep</span> from Naihati spend hours on problems that 
            <code className="text-blue-300">set -x</code> would solve in minutes.
          </p>
          
          <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700/30">
            <h4 className="text-lg font-semibold mb-2 text-blue-300">Remember This:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span><code className="text-yellow-300">set -x</code> shows the command <em>after</em> all expansions and substitutions</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Use <code className="text-yellow-300">bash -n script.sh</code> to check syntax without executing</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Always test scripts as the user who will run them (cron runs as different user!)</span>
              </li>
            </ul>
          </div>
          
          <p className="text-lg">
            When <span className="text-purple-300">Tuhina</span> submits her assignment from Shyamnagar, 
            I always check if she's used proper debugging techniques. A well-debugged script tells me 
            the student understands not just the syntax, but the execution flow.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 border-t border-blue-700/30">
            <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Email: </span>
              <span className="text-blue-300">sukantahui@codernaccotax.co.in</span>
            </div>
            <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Mobile: </span>
              <span className="text-blue-300">7003756860</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Checklist */}
      <section 
        className={clsx(
          "max-w-6xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50",
          "transform transition-all duration-700 delay-1500",
          isMounted 
            ? "translate-y-0 opacity-100" 
            : "translate-y-8 opacity-0"
        )}
      >
        <h2 className="text-3xl font-bold mb-8 text-cyan-300">What to Remember</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📝</span>
            </div>
            <h4 className="text-xl font-semibold mb-3 text-center text-green-300">Basic Commands</h4>
            <ul className="space-y-2 text-gray-300 text-center">
              <li><code className="text-green-300">set -x</code> for trace mode</li>
              <li><code className="text-green-300">set -e</code> to exit on error</li>
              <li><code className="text-green-300">bash -x</code> for external debugging</li>
            </ul>
          </div>
          
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🔧</span>
            </div>
            <h4 className="text-xl font-semibold mb-3 text-center text-blue-300">Professional Setup</h4>
            <ul className="space-y-2 text-gray-300 text-center">
              <li><code className="text-blue-300">set -euxo pipefail</code></li>
              <li>Custom debug functions</li>
              <li>Proper error logging</li>
            </ul>
          </div>
          
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🚨</span>
            </div>
            <h4 className="text-xl font-semibold mb-3 text-center text-purple-300">Common Pitfalls</h4>
            <ul className="space-y-2 text-gray-300 text-center">
              <li>Debug output to stderr</li>
              <li>Test as actual user</li>
              <li>Remove debug in production</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-900/30 rounded-xl border border-gray-700/50">
          <h4 className="text-xl font-semibold mb-3 text-amber-300">Next Steps:</h4>
          <p className="text-gray-300">
            Practice debugging the scripts you've written earlier. Try breaking them intentionally 
            and using these techniques to find the problems. Remember what <span className="text-amber-300">Debangshu</span> 
            learned: The best debugger is the one that helps you understand, not just fix.
          </p>
        </div>
      </section>
    </div>
  );
}