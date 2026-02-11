import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import example files
import hereDocExample1 from "./topic20_files/here_doc_example1.sh?raw";
import hereDocExample2 from "./topic20_files/here_doc_example2.sh?raw";
import hereDocExample3 from "./topic20_files/here_doc_example3.sh?raw";
import hereStringExample1 from "./topic20_files/here_string_example1.sh?raw";
import hereStringExample2 from "./topic20_files/here_string_example2.sh?raw";
import practicalExample1 from "./topic20_files/practical_example1.sh?raw";

const Topic20 = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 py-8">
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
        
        @keyframes pulseGentle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes highlightFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Header Section */}
      <div className={clsx(
        "max-w-6xl mx-auto mb-12",
        isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out]"
      )}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Topic 20: Here Documents & Here Strings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Multi-line input and inline string feeding techniques
            </p>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="leading-relaxed">
            Here Documents (<code className="text-sm text-gray-700 dark:text-gray-300">{`<<EOF`}</code>) 
            and Here Strings (<code className="text-sm text-gray-700 dark:text-gray-300">{`<<<`}</code>) 
            are powerful redirection features that allow feeding multi-line or single-line text 
            directly to commands without creating temporary files. They're essential for 
            creating self-contained scripts with embedded data.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section 1: Conceptual Explanation */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[100ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Conceptual Foundation
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Here Document Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:border-blue-300 dark:hover:border-blue-500 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">{`<<`}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {`Here Document (<< EOF)`}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Feeds multi-line input to a command until a specified delimiter is encountered.
                Perfect for scripts that need to include formatted text, SQL queries, or configuration blocks.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Preserves line breaks and formatting</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Variable expansion depends on quoting</span>
                </div>
              </div>
            </div>

            {/* Here String Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:border-purple-300 dark:hover:border-purple-500 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-purple-600 dark:text-purple-300 font-bold">{`<<<`}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {`Here String (<<<)`}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Feeds a single string to a command's standard input. 
                A cleaner alternative to <code className="text-sm">echo "text" | command</code> for simple cases.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Single line input only</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">No delimiter needed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Diagram */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-8 border border-gray-300 dark:border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Data Flow Visualization</h4>
            <div className="flex flex-col items-center">
              <svg width="100%" height="120" className="overflow-visible">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                  </marker>
                </defs>
                
                <rect x="5%" y="30" width="20%" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" className="hover:fill-blue-200 transition-colors duration-300" />
                <text x="15%" y="70" textAnchor="middle" fill="#1e40af" className="text-sm font-semibold">Script</text>
                <text x="15%" y="90" textAnchor="middle" fill="#4b5563" className="text-xs">{`<< EOF`}</text>
                
                <rect x="35%" y="30" width="30%" height="60" rx="8" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2" className="hover:fill-gray-200 transition-colors duration-300" />
                <text x="50%" y="70" textAnchor="middle" fill="#374151" className="text-sm font-semibold">Multi-line Text</text>
                <text x="50%" y="90" textAnchor="middle" fill="#6b7280" className="text-xs">Until delimiter EOF</text>
                
                <rect x="75%" y="30" width="20%" height="60" rx="8" fill="#dcfce7" stroke="#10b981" strokeWidth="2" className="hover:fill-green-200 transition-colors duration-300" />
                <text x="85%" y="70" textAnchor="middle" fill="#065f46" className="text-sm font-semibold">Command</text>
                <text x="85%" y="90" textAnchor="middle" fill="#047857" className="text-xs">stdin</text>
                
                {/* Animation path */}
                <path 
                  d="M150,60 L270,60" 
                  stroke="#3b82f6" 
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
              </svg>
            </div>
          </div>
        </section>

        {/* Section 2: Here Document Examples */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[200ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Here Document Syntax & Examples
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Basic Here Document</h3>
            <ShellFileLoader
              fileModule={hereDocExample1}
              title="Simple Here Document"
              highlightLines={[2, 3, 4, 5, 6, 7]}
            />
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <p className="text-blue-800 dark:text-blue-300 font-medium mb-2">Output Explanation:</p>
              <div className="bg-white dark:bg-gray-800 rounded p-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block">Hello, Tuhina!</code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block">This text comes from a here document.</code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block">Line breaks are preserved.</code>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Variable Expansion in Here Docs</h3>
            <ShellFileLoader
              fileModule={hereDocExample2}
              title="Variable Expansion"
              highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />
            
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Important: Quoting the Delimiter
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <code className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded mr-3">{`<< EOF`}</code>
                  <span className="text-amber-800 dark:text-amber-300">Variables expand</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded mr-3">{`<< "EOF"`}</code>
                  <span className="text-amber-800 dark:text-amber-300">Variables expand (same as above)</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded mr-3">{`<< 'EOF'`}</code>
                  <span className="text-amber-800 dark:text-amber-300">No variable expansion (literal text)</span>
                </div>
                <div className="flex items-start">
                  <code className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded mr-3">{`<< \EOF`}</code>
                  <span className="text-amber-800 dark:text-amber-300">No variable expansion (backslash escapes)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Here Document with Command Substitution</h3>
            <ShellFileLoader
              fileModule={hereDocExample3}
              title="Dynamic Here Document"
              highlightLines={[2, 3, 4, 5, 6, 7, 8]}
            />
            
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
              <p className="text-green-800 dark:text-green-300 font-medium mb-2">
                Real-world Use: Abhronila uses this pattern to generate dynamic SQL scripts
                for student data processing in Naihati schools.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Here String Examples */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[300ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Here String Examples
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Basic Here String</h3>
            <ShellFileLoader
              fileModule={hereStringExample1}
              title="Here String Usage"
              highlightLines={[1, 2, 3]}
            />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Here String vs Echo Pipeline</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-300 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Here String (Preferred)</h4>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-3 rounded">
                  {`grep "pattern" <<< "search text"`}
                </code>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  • No subshell created<br/>
                  • More efficient<br/>
                  • Cleaner syntax
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-300 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Echo Pipeline (Older Style)</h4>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-gray-100 dark:bg-gray-900 p-3 rounded">
                  {`echo "search text" | grep "pattern"`}
                </code>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  • Creates subshell<br/>
                  • Extra process overhead<br/>
                  • More verbose
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Practical Here String Usage</h3>
            <ShellFileLoader
              fileModule={hereStringExample2}
              title="Math with Here Strings"
              highlightLines={[1, 2, 3, 4, 5, 6]}
            />
          </div>
        </section>

        {/* Section 4: Practical Example */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[400ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Practical Application
          </h2>

          <ShellFileLoader
            fileModule={practicalExample1}
            title="Database Configuration Script"
            highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]}
          />

          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
            <h4 className="text-lg font-bold text-indigo-800 dark:text-indigo-300 mb-3">
              Scenario: Barrackpore College Student Database
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Debangshu needs to create MySQL configuration for 500 students across different departments. 
              Using here documents allows him to:
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">1</span>
                </div>
                <span>Embed SQL directly in the script</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">2</span>
                </div>
                <span>Use variables for dynamic table names</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">3</span>
                </div>
                <span>Generate reports with proper formatting</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Common Pitfalls */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[500ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Common Pitfalls & Solutions
          </h2>

          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-200 dark:border-red-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">Pitfall 1: Incorrect Delimiter Spacing</h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-red-100 dark:bg-red-900 p-2 rounded">
                  {`cat <<  EOF   # Wrong: Extra spaces`}
                </code>
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-green-100 dark:bg-green-900 p-2 rounded">
                  {`cat <<EOF     # Correct: No spaces`}
                </code>
              </div>
              <p className="text-red-700 dark:text-red-400 mt-2 text-sm">
                Many students in Shyamnagar make this mistake when first learning here documents.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Pitfall 2: Tabs vs Spaces</h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-amber-100 dark:bg-amber-900 p-2 rounded">
                  {`cat <<-EOF`}
                  <br/>
                  {`↹Text with tabs`}  {/* Tab character represented */}
                  <br/>
                  {`EOF`}
                </code>
                <p className="text-amber-700 dark:text-amber-400 text-sm">
                  Use <code className="text-sm">{`<<-EOF`}</code> to allow leading tabs (not spaces!) for indentation.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Pitfall 3: Delimiter in Text</h4>
              <div className="space-y-3">
                <code className="text-sm text-gray-700 dark:text-gray-300 block bg-blue-100 dark:bg-blue-900 p-2 rounded">
                  {`cat <<EOF`}
                  <br/>
                  {`Text with EOF inside`}  {/* Problematic */}
                  <br/>
                  {`EOF  # Premature termination!`}
                </code>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  Solution: Use unique delimiters like <code className="text-sm">_EOF_</code> or <code className="text-sm">END_CONFIG</code>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Best Practices */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[600ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-300 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-green-200 dark:border-green-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">Naming Conventions</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use uppercase delimiters: <code className="text-sm">EOF, END, STOP</code></span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Add prefix for context: <code className="text-sm">SQL_EOF, CONFIG_END</code></span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">Performance Tips</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use here strings instead of echo | pipe</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Keep here documents under 100 lines for readability</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Teacher's Note */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[700ms]"
        )}>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-300 dark:border-purple-700 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">Teacher's Note</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Sukanta Hui • 27 years experience • Programming Languages, RDBMS
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Professional Insight:</strong> In my 27 years of teaching students across Ichapur and Barrackpore, 
                I've seen here documents transform messy scripts into clean, maintainable code. The key is understanding 
                <em>when</em> to use them versus external files.
              </p>

              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Remember This:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span>Here documents are <strong>in-memory</strong> - great for small to medium text blocks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span>For large data (&gt;1000 lines), use external files for better performance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span>The delimiter must be alone on its own line, with no leading spaces (unless using <code className="text-sm">{`<<-`}</code>)</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pro Tip:</strong> When debugging scripts with here documents, add <code className="text-sm">set -x</code> 
                to see how the document is being passed to commands. This helped Swadeep debug a complex database migration script.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Email: sukantahui@codernaccotax.co.in • Mobile: 7003756860
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Mini Checklist */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[800ms]"
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
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Syntax Rules</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="text-sm">{`<<DELIMITER`}</code> vs <code className="text-sm">{`<<< "string"`}</code>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Quoting Matters</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="text-sm">{`<<'EOF'`}</code> prevents expansion, <code className="text-sm">{`<<EOF`}</code> allows it
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
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">When to Use Which</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Multi-line: Here Document<br/>
                    Single line: Here String
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Common Pitfall</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Delimiter matching is case-sensitive and must be alone on its line
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[900ms]"
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
                <strong>Observe carefully:</strong> What happens when you use a here document with a command that 
                doesn't read from stdin? Try <code className="text-sm">{`ls <<EOF`}</code> and see what occurs.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Try changing this:</strong> In the variable expansion example, what if you change 
                <code className="text-sm">{`<<EOF`}</code> to <code className="text-sm"> {`<<'EOF'`}</code>? 
                How does the output differ for students like Tuhina and Debangshu?
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Consider:</strong> When would you choose a here document over a separate configuration file 
                for the Barrackpore College student management system?
              </p>
            </div>
          </div>
        </section>

        {/* Tips & Tricks Section */}
        <section className={clsx(
          "mb-12",
          isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1000ms]"
        )}>
          <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-300">Professional Tips & Tricks</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Performance Hack
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use here strings instead of echo pipelines. For example, <code className="text-sm">{`bc <<< "5+3"`}</code> 
                is faster than <code className="text-sm">{`echo "5+3" | bc`}</code>.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Debugging Trick
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                To see what's being passed, use <code className="text-sm">{`cat -A <<EOF`}</code> to show 
                invisible characters like tabs and line endings.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Production Tip
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                For configuration scripts in Shyamnagar schools, I use descriptive delimiters like 
                <code className="text-sm">END_STUDENT_CONFIG</code> to make scripts self-documenting.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className={clsx(
        "max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-300 dark:border-gray-700",
        isVisible && "motion-safe:animate-[fadeSlideUp_0.8s_ease-out] motion-safe:animation-delay-[1100ms]"
      )}>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Topic 20: Here Documents & Here Strings
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300">
              Previous: Redirection
            </button>
            <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300">
              Next: Process Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic20;