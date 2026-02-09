import { useState, useEffect } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import example script files
import lengthExample1 from "./topic7_files/length_example1.sh?raw";
import substringExample1 from "./topic7_files/substring_example1.sh?raw";
import replaceExample1 from "./topic7_files/replace_example1.sh?raw";
import regexExample1 from "./topic7_files/regex_example1.sh?raw";
import practicalExample1 from "./topic7_files/practical_example1.sh?raw";

export default function Topic7() {
  const [activeSection, setActiveSection] = useState("overview");

  // Animation for section reveals
  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate-[slideUp_0.6s_ease-out_forwards]"
          );
          entry.target.classList.remove("opacity-0");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".section-reveal")
    .forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, [activeSection]); // 👈 IMPORTANT


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 transition-colors duration-300">
      <style>
        {`
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
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes svgFlow {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
        `}
      </style>

      {/* Header Section */}
      <header className="section-reveal max-w-6xl mx-auto mb-12 opacity-0">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold mb-4 animate-pulse">
                Topic 7
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                String Manipulation in Bash
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Master the art of manipulating text in shell scripts: calculating length, extracting substrings, 
                performing replacements, and pattern matching with regular expressions.
              </p>
            </div>
            
            {/* Animated SVG Visualization */}
            <div className="w-full md:w-1/3">
              <svg viewBox="0 0 400 200" className="w-full h-48">
                <defs>
                  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                
                {/* String representation */}
                <rect x="20" y="80" width="360" height="40" rx="8" 
                      fill="none" stroke="url(#textGradient)" strokeWidth="3"
                      className="stroke-dasharray-100 stroke-dashoffset-100 animate-[svgFlow_2s_ease-in-out_forwards]"/>
                
                {/* Substring extraction visualization */}
                <rect x="80" y="85" width="120" height="30" rx="4" 
                      fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2"
                      className="hover:fill-opacity-40 transition-all duration-300">
                  <animate attributeName="x" values="80;100;80" dur="4s" repeatCount="indefinite" />
                </rect>
                
                {/* Text label */}
                <text x="200" y="50" textAnchor="middle" className="text-2xl font-bold fill-gray-800 dark:fill-gray-200">
                  Hello, Swadeep!
                </text>
                
                {/* Length indicator */}
                <line x1="20" y1="130" x2="380" y2="130" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5"/>
                <text x="200" y="150" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-semibold">
                  Length: 14
                </text>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="section-reveal max-w-6xl mx-auto mb-8 opacity-0">
        <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
          {["overview", "length", "substring", "replace", "regex", "practical", "mistakes", "best-practices"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              className={clsx(
                "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                activeSection === tab
                  ? "bg-white dark:bg-gray-700 shadow-md text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}
            >
              {tab.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto">
        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="space-y-8">
            {/* Conceptual Explanation */}
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">📝</span>
                  What is String Manipulation?
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    String manipulation refers to the process of <span className="font-semibold text-blue-600 dark:text-blue-400">analyzing, modifying, and extracting information</span> from text data. In shell scripting, strings are sequences of characters that can represent filenames, paths, user input, configuration data, or any textual information.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                      <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Common Use Cases</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Parsing log files from Naihati server</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Validating user input (Tuhina's registration form)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Transforming file names in bulk</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Extracting specific data from CSV files</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <h3 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300">Key Operations</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">🔤</span>
                          <span><strong>Length:</strong> Count characters in a string</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">✂️</span>
                          <span><strong>Substring:</strong> Extract portions of text</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">🔄</span>
                          <span><strong>Replace:</strong> Find and replace patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">🔍</span>
                          <span><strong>Regex:</strong> Advanced pattern matching</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Visual Concept Map */}
            <section className="section-reveal opacity-0 animation-delay-200">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-8 text-white text-center">String Manipulation Journey</h3>
                <div className="relative">
                  {/* Process Flow SVG */}
                  <svg viewBox="0 0 800 200" className="w-full h-48">
                    {/* Flow line */}
                    <path d="M50,100 C150,100 250,50 350,100 S550,150 650,100" 
                          fill="none" stroke="url(#gradient)" strokeWidth="4" strokeDasharray="10,5"
                          className="stroke-dasharray-100 stroke-dashoffset-100 animate-[svgFlow_3s_ease-in-out_forwards]"/>
                    
                    {/* Nodes */}
                    {[
                      {x: 50, y: 100, text: "Input", color: "#3b82f6"},
                      {x: 200, y: 50, text: "Length", color: "#10b981"},
                      {x: 350, y: 100, text: "Substring", color: "#f59e0b"},
                      {x: 500, y: 150, text: "Replace", color: "#ef4444"},
                      {x: 650, y: 100, text: "Output", color: "#8b5cf6"}
                    ].map((node, i) => (
                      <g key={i}>
                        <circle cx={node.x} cy={node.y} r="20" fill={node.color}
                                className="hover:r-24 transition-all duration-300 cursor-pointer"/>
                        <text x={node.x} y={node.y+40} textAnchor="middle" className="fill-white text-sm font-semibold">
                          {node.text}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Length Operation */}
        {activeSection === "length" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">📏</span>
                  Finding String Length
                </h2>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-emerald-700 dark:text-emerald-300">Syntax & Prototype</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl mb-6">
                    <code className="text-lg text-gray-700 dark:text-gray-300 font-mono">
                      {`${`\${#variable_name}`}`}
                    </code>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      The <span className="font-semibold">#</span> operator returns the number of characters in the string value of the variable.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Purpose & Usage</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-emerald-600 dark:text-emerald-400 text-sm">1</span>
                        </div>
                        <span><strong>Input Validation:</strong> Check if user input meets length requirements</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-emerald-600 dark:text-emerald-400 text-sm">2</span>
                        </div>
                        <span><strong>Data Truncation:</strong> Ensure strings fit within database fields</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-emerald-600 dark:text-emerald-400 text-sm">3</span>
                        </div>
                        <span><strong>Progress Indicators:</strong> Calculate percentage completion</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <h4 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-300">Real-world Example</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      When <span className="font-semibold">Swadeep</span> submits his assignment filename, we need to check if it follows the naming convention: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">studentID_assignment.ext</code>
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Filename:</span>
                        <span className="font-mono">S2023001_bash_assignment.pdf</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Length:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">30 characters</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <ShellFileLoader
                    fileModule={lengthExample1}
                    title="String Length Examples"
                    highlightLines={[4, 7, 10, 14, 17]}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Substring Extraction */}
        {activeSection === "substring" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">✂️</span>
                  Substring Extraction
                </h2>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-amber-700 dark:text-amber-300">Syntax Variations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                      <h4 className="font-mono text-lg mb-2">${`\${string:position}`}</h4>
                      <p className="text-gray-700 dark:text-gray-300">Extract from position to end</p>
                      <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">Position starts at 0</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                      <h4 className="font-mono text-lg mb-2">${`\${string:position:length}`}</h4>
                      <p className="text-gray-700 dark:text-gray-300">Extract specific number of characters</p>
                      <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">Control exact substring size</p>
                    </div>
                  </div>
                </div>

                {/* Visual Example */}
                <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 text-amber-800 dark:text-amber-300">Visual Demonstration</h4>
                  <div className="text-center">
                    <div className="inline-block bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-4">
                        {"Hello, Abhronila!".split("").map((char, i) => (
                          <div key={i} className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 font-mono">
                            {char}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <div>Positions:</div>
                          <div className="flex gap-1 mt-1">
                            {Array.from({length: 16}).map((_, i) => (
                              <div key={i} className="w-8 text-center">{i}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <ShellFileLoader
                    fileModule={substringExample1}
                    title="Substring Extraction Examples"
                    highlightLines={[5, 8, 11, 14, 19]}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Replace Operation */}
        {activeSection === "replace" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">🔄</span>
                  String Replacement
                </h2>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-6 text-red-700 dark:text-red-300">Replacement Patterns</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {pattern: "${string/pattern/replacement}", desc: "First occurrence", type: "single"},
                      {pattern: "${string//pattern/replacement}", desc: "All occurrences", type: "global"},
                      {pattern: "${string/#pattern/replacement}", desc: "Start of string", type: "prefix"},
                      {pattern: "${string/%pattern/replacement}", desc: "End of string", type: "suffix"}
                    ].map((item, i) => (
                      <div key={i} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800 hover:scale-105 transition-transform duration-300">
                        <code className="font-mono text-sm block mb-2 text-red-700 dark:text-red-300">
                          {item.pattern}
                        </code>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.desc}</p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-full">
                          {item.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use Case Scenario */}
                <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 text-red-800 dark:text-red-300">Real Scenario: File Renaming</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-semibold">Debangshu</span> has uploaded photos from his trip to Barrackpore, but they have spaces in filenames which cause issues in scripts:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-900 rounded-lg">
                      <span className="text-red-500">Before:</span>
                      <code className="flex-1 font-mono">IMG_2024 Barrackpore Trip.jpg</code>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-900 rounded-lg">
                      <span className="text-green-500">After:</span>
                      <code className="flex-1 font-mono">IMG_2024_Barrackpore_Trip.jpg</code>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <ShellFileLoader
                    fileModule={replaceExample1}
                    title="String Replacement Examples"
                    highlightLines={[5, 9, 13, 17, 21]}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Regex Matching */}
        {activeSection === "regex" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">🔍</span>
                  Regular Expression Matching
                </h2>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Regex Operator: =~</h3>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl mb-6">
                    <code className="text-lg text-gray-700 dark:text-gray-300 font-mono">
                      {`[[ $string =~ pattern ]]`}
                    </code>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      The <span className="font-semibold">=~</span> operator is used within double brackets for pattern matching. 
                      Captured groups are stored in the <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">BASH_REMATCH</code> array.
                    </p>
                  </div>
                </div>

                {/* Common Regex Patterns */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Common Patterns</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {pattern: "^[A-Za-z]+$", desc: "Only letters"},
                      {pattern: "^[0-9]{10}$", desc: "10-digit number (mobile)"},
                      {pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", desc: "Email validation"},
                      {pattern: "^\\+?[0-9\\s-]{10,}$", desc: "Phone numbers"},
                      {pattern: "^\\d{2}-\\d{2}-\\d{4}$", desc: "Date format (DD-MM-YYYY)"},
                      {pattern: "^[A-Z]{3}[0-9]{3}$", desc: "Vehicle registration"}
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-400 transition-colors duration-300">
                        <code className="font-mono text-sm text-purple-600 dark:text-purple-400">
                          {item.pattern}
                        </code>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <ShellFileLoader
                    fileModule={regexExample1}
                    title="Regex Pattern Matching Examples"
                    highlightLines={[5, 9, 14, 19, 24]}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Practical Applications */}
        {activeSection === "practical" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">🚀</span>
                  Practical Applications
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Case Study 1 */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">📊 Log File Analysis</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Analyzing web server logs from <span className="font-semibold">Shyamnagar College</span> to extract:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>IP addresses of visitors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Requested URLs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Response status codes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Browser user agents</span>
                      </li>
                    </ul>
                  </div>

                  {/* Case Study 2 */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">👨‍🎓 Student Data Processing</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Processing Ichapur University student records:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Extract roll numbers from IDs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Format names consistently</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Validate email patterns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Generate username from names</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <ShellFileLoader
                    fileModule={practicalExample1}
                    title="Complete Practical Example"
                    highlightLines={[7, 12, 17, 22, 27, 32]}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Common Pitfalls */}
        {activeSection === "mistakes" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 rounded-2xl p-8 shadow-lg border border-rose-200 dark:border-rose-800">
                <h2 className="text-3xl font-bold mb-6 text-rose-800 dark:text-rose-300 flex items-center gap-3">
                  <span className="p-2 bg-rose-100 dark:bg-rose-900 rounded-lg">⚠️</span>
                  Common Pitfalls & Mistakes
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      title: "Off-by-One Errors in Substring",
                      description: "Forgetting that Bash substring positions start at 0, not 1",
                      example: "Getting 'ello' instead of 'Hello' when using ${string:1:4}",
                      fix: "Remember: position 0 = first character"
                    },
                    {
                      title: "Unquoted Variables with Spaces",
                      description: "Not quoting variables leads to word splitting",
                      example: "name='Swadeep Kumar'; echo ${#name} vs echo ${#\"$name\"}",
                      fix: "Always quote variables: ${#\"$variable\"}"
                    },
                    {
                      title: "Regex Special Characters Not Escaped",
                      description: "Forgetting to escape dots, stars, or other regex metacharacters",
                      example: "Matching 'file.txt' with 'file.txt' instead of 'file\\.txt'",
                      fix: "Use double backslashes: 'file\\.txt'"
                    },
                    {
                      title: "Assuming Case-Insensitive Matching",
                      description: "Bash regex is case-sensitive by default",
                      example: "'Hello' =~ 'hello' returns false",
                      fix: "Use [[ ${string,,} =~ ${pattern,,} ]] or shopt -s nocasematch"
                    },
                    {
                      title: "Ignoring Empty Strings",
                      description: "Not handling empty strings can cause unexpected behavior",
                      example: "${empty:0:3} returns empty without error",
                      fix: "Check if string is empty first: [[ -n \"$string\" ]]"
                    }
                  ].map((mistake, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-rose-300 dark:border-rose-700 hover:border-rose-500 transition-colors duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-rose-600 dark:text-rose-400 font-bold">{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-rose-700 dark:text-rose-300">
                            {mistake.title}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {mistake.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">Example:</span>
                              <code className="block mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                {mistake.example}
                              </code>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Fix:</span>
                              <code className="block mt-1 font-mono text-sm bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded">
                                {mistake.fix}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Best Practices */}
        {activeSection === "best-practices" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-8 shadow-lg border border-emerald-200 dark:border-emerald-800">
                <h2 className="text-3xl font-bold mb-6 text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
                  <span className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">✅</span>
                  Best Practices
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Column 1 */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-emerald-300 dark:border-emerald-700">
                      <h3 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300">
                        🛡️ Defensive Coding
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Always quote variables: <code>${`"$variable"`}</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Use parameter expansion defaults: <code>${`\${var:-default}`}</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Validate input before processing</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-emerald-300 dark:border-emerald-700">
                      <h3 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300">
                        🔍 Pattern Clarity
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Comment complex regex patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Use named groups when possible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Test patterns with sample data first</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-emerald-300 dark:border-emerald-700">
                      <h3 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300">
                        ⚡ Performance
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Use built-in expansion over external commands</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Avoid regex for simple patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Store repeated operations in variables</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-emerald-300 dark:border-emerald-700">
                      <h3 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300">
                        📚 Readability
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Use descriptive variable names</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Break complex operations into steps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Add comments explaining non-obvious logic</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mini Checklist */}
                <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl border border-blue-300 dark:border-blue-700">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
                    🧠 What to Remember
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      "Length: ${#string}",
                      "Substring: ${string:start:length}",
                      "Replace: ${string/pattern/replacement}",
                      "Regex: [[ $string =~ pattern ]]",
                      "Position starts at 0",
                      "Quote variables always"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 text-sm">{i + 1}</span>
                        </div>
                        <code className="font-mono text-blue-700 dark:text-blue-300">{item}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Teacher's Note */}
            <section className="section-reveal opacity-0 animation-delay-300">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-white">Teacher's Note</h3>
                    <div className="space-y-4">
                      <p className="text-blue-100 leading-relaxed">
                        <strong>String manipulation is fundamental</strong> to effective shell scripting. When working with 
                        students like <span className="font-semibold">Tuhina</span> or <span className="font-semibold">Abhronila</span>, 
                        I emphasize understanding the <span className="text-yellow-300">difference between pattern matching and literal string operations</span>.
                      </p>
                      <p className="text-blue-100 leading-relaxed">
                        <strong>Tip:</strong> Always test your string operations with edge cases - empty strings, strings with 
                        special characters, and strings containing spaces. This practice will save you hours of debugging.
                      </p>
                      <p className="text-blue-100 leading-relaxed">
                        <strong>Remember:</strong> The <code className="bg-blue-800 px-2 py-1 rounded">BASH_REMATCH</code> array 
                        is your best friend for regex. Capture groups make complex pattern extraction trivial.
                      </p>
                      <div className="mt-6 pt-6 border-t border-blue-700">
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="text-blue-300">Teacher:</span>
                            <span className="ml-2 text-white font-semibold">Sukanta Hui</span>
                          </div>
                          <div>
                            <span className="text-blue-300">Experience:</span>
                            <span className="ml-2 text-white">27 years</span>
                          </div>
                          <div>
                            <span className="text-blue-300">Skills:</span>
                            <span className="ml-2 text-white">Programming, Shell Scripting, System Administration</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hint Section */}
            <section className="section-reveal opacity-0 animation-delay-600">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-300 dark:border-amber-700">
                <h3 className="text-2xl font-bold mb-6 text-amber-800 dark:text-amber-300 flex items-center gap-3">
                  <span className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">💡</span>
                  Think About This...
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Observe carefully:</strong> What happens when you try to extract a substring that starts beyond 
                    the string's length? Does it return an empty string or an error?
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Try changing:</strong> The global replace pattern <code>${`\${string//pattern/replacement}`}</code> 
                    to a single replace. How does it affect the output when multiple matches exist?
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Consider:</strong> How would you handle a situation where you need to extract the domain name 
                    from <span className="font-semibold">Swadeep's email</span>: <code>swadeep@shyamnagar-college.edu.in</code>?
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Footer Navigation */}
        <footer className="section-reveal max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 opacity-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-gray-600 dark:text-gray-400">
              Topic 7: String Manipulation • Shell Scripting Mastery
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveSection("overview")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Review Concepts
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}