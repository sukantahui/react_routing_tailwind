import React, { useState } from "react";
import clsx from "clsx";

const Topic10 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeVariable, setActiveVariable] = useState("NR");
  const [hoveredExample, setHoveredExample] = useState(null);

  // Calculate experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 py-8 transition-colors duration-500">
      <style>{`
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
        
        @keyframes variablePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes recordHighlight {
          0% {
            stroke: #4b5563;
          }
          50% {
            stroke: #3b82f6;
          }
          100% {
            stroke: #4b5563;
          }
        }
        
        @keyframes fieldFlow {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(200px);
            opacity: 0;
          }
        }
        
        @keyframes separatorFlash {
          0%, 100% {
            fill: #4b5563;
          }
          50% {
            fill: #ef4444;
          }
        }
      `}</style>

      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div 
          className="animate-[fadeInUp_0.8s_ease-out] motion-safe:animate-[fadeInUp_0.8s_ease-out]"
        >
          <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
            Topic 11: awk Internals
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              Built-in Variables in awk
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            Master NR, NF, FS, OFS, $0, $1... - The internal variables that give awk its power for data processing.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {/* Introduction Card */}
        <section className="mb-12">
          <div 
            className="animate-[fadeInUp_0.8s_ease-out_0.1s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.1s_both]"
          >
            <div 
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500",
                hoveredCard === 'intro' ? "shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/10 -translate-y-1" : "hover:shadow-xl"
              )}
              onMouseEnter={() => setHoveredCard('intro')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">The Engine Room of awk</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Built-in variables are awk's internal state indicators. They track everything from current record number 
                    to field count, providing the context needed for intelligent data processing.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-purple-600 dark:text-purple-400">What They Are</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Predefined variables that awk automatically maintains during processing. They update in real-time as awk reads each record.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Automatically updated by awk
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Provide processing context
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Read-only (except FS, OFS, etc.)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-pink-600 dark:text-pink-400">When to Use Them</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mt-2"></span>
                      <span>Need to know line/record number (NR)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mt-2"></span>
                      <span>Processing variable-length records (NF)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mt-2"></span>
                      <span>Customizing input/output formats (FS, OFS)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Variable Explorer */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <h2 className="text-3xl font-bold mb-8 text-center">Interactive Variable Explorer</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Variable Selector */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400">Core Built-in Variables</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "NR", name: "NR", desc: "Number of Records", color: "bg-blue-500", hoverColor: "hover:bg-blue-600" },
                      { id: "NF", name: "NF", desc: "Number of Fields", color: "bg-purple-500", hoverColor: "hover:bg-purple-600" },
                      { id: "FS", name: "FS", desc: "Field Separator", color: "bg-green-500", hoverColor: "hover:bg-green-600" },
                      { id: "OFS", name: "OFS", desc: "Output Field Separator", color: "bg-yellow-500", hoverColor: "hover:bg-yellow-600" },
                      { id: "RS", name: "RS", desc: "Record Separator", color: "bg-pink-500", hoverColor: "hover:bg-pink-600" },
                      { id: "ORS", name: "ORS", desc: "Output Record Separator", color: "bg-indigo-500", hoverColor: "hover:bg-indigo-600" },
                      { id: "$0", name: "$0", desc: "Entire Record", color: "bg-red-500", hoverColor: "hover:bg-red-600" },
                      { id: "$N", name: "$1...", desc: "Individual Fields", color: "bg-teal-500", hoverColor: "hover:bg-teal-600" },
                    ].map((variable) => (
                      <button
                        key={variable.id}
                        className={clsx(
                          "p-4 rounded-lg text-white transition-all duration-300 transform",
                          variable.color,
                          variable.hoverColor,
                          activeVariable === variable.id ? "ring-4 ring-offset-2 ring-white/50 scale-105" : "hover:scale-102"
                        )}
                        onClick={() => setActiveVariable(variable.id)}
                        onMouseEnter={() => setActiveVariable(variable.id)}
                      >
                        <div className="font-mono font-bold text-lg">{variable.name}</div>
                        <div className="text-xs opacity-90 mt-1">{variable.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Variable Details */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">
                    <span className={clsx(
                      activeVariable === "NR" && "text-blue-500",
                      activeVariable === "NF" && "text-purple-500",
                      activeVariable === "FS" && "text-green-500",
                      activeVariable === "OFS" && "text-yellow-500",
                      activeVariable === "RS" && "text-pink-500",
                      activeVariable === "ORS" && "text-indigo-500",
                      activeVariable === "$0" && "text-red-500",
                      activeVariable === "$N" && "text-teal-500"
                    )}>
                      {activeVariable === "$N" ? "$1, $2, $3..." : activeVariable}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300"> - Details</span>
                  </h3>
                  
                  {(() => {
                    const details = {
                      "NR": {
                        purpose: "Tracks the current record/line number being processed",
                        default: "Starts at 1, increments for each record",
                        example: "awk 'NR == 1 {print \"Header:\" $0}' file.txt",
                        usage: "Skip headers, process every nth line, track progress"
                      },
                      "NF": {
                        purpose: "Contains the number of fields in the current record",
                        default: "Changes for each record based on field count",
                        example: "awk '{print \"Line\", NR, \"has\", NF, \"fields\"}'",
                        usage: "Validate data, access last field ($NF), handle variable-length records"
                      },
                      "FS": {
                        purpose: "Defines the input field separator",
                        default: 'Whitespace (space, tab) or "[ \\t]+"',
                        example: "awk -F, 'BEGIN{FS=\",\"} {print $1}' file.csv",
                        usage: "Parse CSV, custom delimiters, multiple separators"
                      },
                      "OFS": {
                        purpose: "Defines the output field separator for print statements",
                        default: "Single space",
                        example: "awk 'BEGIN{OFS=\"|\"} {print $1, $2, $3}'",
                        usage: "Create pipe-delimited output, custom formatting"
                      },
                      "RS": {
                        purpose: "Defines the input record separator",
                        default: "Newline character (\\n)",
                        example: "awk 'BEGIN{RS=\"\"} {print \"Record:\" NR}' file.txt",
                        usage: "Process paragraphs, custom record boundaries"
                      },
                      "ORS": {
                        purpose: "Defines the output record separator",
                        default: "Newline character (\\n)",
                        example: "awk 'BEGIN{ORS=\"\\n\\n\"} {print $0}'",
                        usage: "Double spacing, custom record endings"
                      },
                      "$0": {
                        purpose: "Contains the entire current input record",
                        default: "The raw line as read from input",
                        example: "awk '{print \"Full record:\", $0}'",
                        usage: "Process entire line, pattern matching, logging"
                      },
                      "$N": {
                        purpose: "Field variables: $1 (first field), $2 (second), etc.",
                        default: "Empty string if field doesn't exist",
                        example: "awk '{print \"Name:\", $1, \"Age:\", $2}'",
                        usage: "Column extraction, data transformation, calculations"
                      }
                    };
                    
                    const detail = details[activeVariable];
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-1">Purpose:</h4>
                          <p className="text-sm">{detail.purpose}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-1">Default Value:</h4>
                          <code className="text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">{detail.default}</code>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-1">Example:</h4>
                          <pre className="text-sm bg-gray-900 text-gray-100 p-2 rounded overflow-x-auto">{detail.example}</pre>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-1">Common Usage:</h4>
                          <p className="text-sm">{detail.usage}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
              
              {/* Right: Interactive Visualization */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-center">Visualizing awk Variables in Action</h3>
                
                <div className="relative h-[500px]">
                  <svg width="100%" height="100%" viewBox="0 0 400 500" className="overflow-visible">
                    {/* Input Data Structure */}
                    <g transform="translate(20, 20)">
                      <text x="0" y="0" fill="#9ca3af" fontSize="12" fontWeight="bold">Input Data Stream:</text>
                      
                      {/* Records with NR */}
                      <g transform="translate(0, 30)">
                        {[1, 2, 3, 4].map((recordNum) => (
                          <g key={recordNum} transform={`translate(0, ${(recordNum-1)*40})`}>
                            <rect 
                              x="0" 
                              y="0" 
                              width="360" 
                              height="30" 
                              rx="4" 
                              fill="#1f2937"
                              className="transition-all duration-300"
                              onMouseEnter={() => setActiveVariable("NR")}
                            />
                            <text x="10" y="20" fill="white" fontSize="12" dy=".3em">
                              {recordNum === 1 && "Swadeep,85,92,78,Math"}
                              {recordNum === 2 && "Tuhina,92,88,95,Science"}
                              {recordNum === 3 && "Abhronila,78,85,90,History"}
                              {recordNum === 4 && "Debangshu,65,72,68,English"}
                            </text>
                            
                            {/* NR Indicator */}
                            <g transform="translate(340, 0)" onMouseEnter={() => setActiveVariable("NR")}>
                              <rect x="0" y="0" width="20" height="30" fill="#3b82f6" rx="4" />
                              <text x="10" y="15" textAnchor="middle" fill="white" fontSize="10" dy=".3em">NR</text>
                              <text x="10" y="25" textAnchor="middle" fill="white" fontSize="8" dy=".3em">{recordNum}</text>
                            </g>
                            
                            {/* Current Record Highlight */}
                            {activeVariable === "NR" && recordNum === 2 && (
                              <rect 
                                x="-5" 
                                y="-5" 
                                width="370" 
                                height="40" 
                                rx="6" 
                                fill="none" 
                                stroke="#3b82f6" 
                                strokeWidth="2"
                                strokeDasharray="5,5"
                              />
                            )}
                          </g>
                        ))}
                      </g>
                      
                      {/* Field Separator Visualization */}
                      <g transform="translate(0, 200)" onMouseEnter={() => setActiveVariable("FS")}>
                        <text x="0" y="0" fill="#9ca3af" fontSize="12" fontWeight="bold">Field Separator (FS):</text>
                        
                        <g transform="translate(0, 20)">
                          <rect x="0" y="0" width="360" height="40" rx="4" fill="#374151" />
                          <text x="10" y="20" fill="white" fontSize="12" dy=".3em">Swadeep,85,92,78,Math</text>
                          
                          {/* Separator markers */}
                          <line x1="70" y1="5" x2="70" y2="35" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3">
                            <animate
                              attributeName="opacity"
                              values="0.3;1;0.3"
                              dur="2s"
                              repeatCount="indefinite"
                              begin="0s"
                            />
                          </line>
                          <line x1="100" y1="5" x2="100" y2="35" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3">
                            <animate
                              attributeName="opacity"
                              values="0.3;1;0.3"
                              dur="2s"
                              repeatCount="indefinite"
                              begin="0.5s"
                            />
                          </line>
                          <line x1="130" y1="5" x2="130" y2="35" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3">
                            <animate
                              attributeName="opacity"
                              values="0.3;1;0.3"
                              dur="2s"
                              repeatCount="indefinite"
                              begin="1s"
                            />
                          </line>
                          <line x1="160" y1="5" x2="160" y2="35" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3">
                            <animate
                              attributeName="opacity"
                              values="0.3;1;0.3"
                              dur="2s"
                              repeatCount="indefinite"
                              begin="1.5s"
                            />
                          </line>
                          
                          <text x="185" y="20" fill="#9ca3af" fontSize="10" dy=".3em">← FS = ","</text>
                        </g>
                      </g>
                      
                      {/* Field Variables Visualization */}
                      <g transform="translate(0, 280)" onMouseEnter={() => setActiveVariable("$N")}>
                        <text x="0" y="0" fill="#9ca3af" fontSize="12" fontWeight="bold">Field Variables ($1, $2...):</text>
                        
                        <g transform="translate(0, 20)">
                          {["$1: Swadeep", "$2: 85", "$3: 92", "$4: 78", "$5: Math"].map((field, index) => (
                            <g key={index} transform={`translate(${index * 70}, 0)`}>
                              <rect 
                                x="0" 
                                y="0" 
                                width="60" 
                                height="30" 
                                rx="4" 
                                fill={index === 0 && activeVariable === "$N" ? "#0d9488" : "#4b5563"}
                                className="transition-all duration-300"
                              />
                              <text x="30" y="15" textAnchor="middle" fill="white" fontSize="10" dy=".3em">
                                {field.split(":")[0]}
                              </text>
                              <text x="30" y="25" textAnchor="middle" fill="#d1d5db" fontSize="8" dy=".3em">
                                {field.split(":")[1]}
                              </text>
                            </g>
                          ))}
                          
                          {/* NF Indicator */}
                          <g transform="translate(350, 0)" onMouseEnter={() => setActiveVariable("NF")}>
                            <rect x="0" y="0" width="30" height="30" fill="#8b5cf6" rx="4" />
                            <text x="15" y="10" textAnchor="middle" fill="white" fontSize="10" dy=".3em">NF</text>
                            <text x="15" y="22" textAnchor="middle" fill="white" fontSize="10" dy=".3em">5</text>
                          </g>
                        </g>
                      </g>
                      
                      {/* Processing Flow */}
                      <g transform="translate(0, 340)">
                        <rect x="0" y="0" width="80" height="40" rx="8" fill="#059669" />
                        <text x="40" y="20" textAnchor="middle" fill="white" fontSize="12" dy=".3em">awk</text>
                        
                        {/* Arrow */}
                        <path d="M100,20 L140,20" stroke="#10b981" strokeWidth="3" fill="none" />
                        <polygon points="140,20 130,15 130,25" fill="#10b981" />
                        
                        {/* Output with OFS */}
                        <g transform="translate(150, 0)" onMouseEnter={() => setActiveVariable("OFS")}>
                          <rect x="0" y="0" width="230" height="40" rx="8" fill="#7c3aed" />
                          <text x="115" y="20" textAnchor="middle" fill="white" fontSize="12" dy=".3em">
                            Swadeep | 85 | 92 | 78 | Math
                          </text>
                          <text x="115" y="35" textAnchor="middle" fill="#ddd6fe" fontSize="8" dy=".3em">
                            OFS = " | "
                          </text>
                        </g>
                      </g>
                      
                      {/* $0 Visualization */}
                      <g transform="translate(0, 400)" onMouseEnter={() => setActiveVariable("$0")}>
                        <text x="0" y="0" fill="#9ca3af" fontSize="12" fontWeight="bold">$0 (Entire Record):</text>
                        
                        <g transform="translate(0, 20)">
                          <rect x="0" y="0" width="380" height="40" rx="4" fill="#dc2626" />
                          <text x="10" y="20" fill="white" fontSize="12" dy=".3em">"Swadeep,85,92,78,Math"</text>
                          <text x="365" y="20" textAnchor="end" fill="#fca5a5" fontSize="10" dy=".3em">$0</text>
                          
                          {/* Animated border when active */}
                          {activeVariable === "$0" && (
                            <rect 
                              x="-5" 
                              y="-5" 
                              width="390" 
                              height="50" 
                              rx="6" 
                              fill="none" 
                              stroke="#dc2626" 
                              strokeWidth="2"
                              strokeDasharray="5,5"
                            />
                          )}
                        </g>
                      </g>
                    </g>
                  </svg>
                  
                  <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Hover over different colored elements to explore each built-in variable
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.3s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
            <h2 className="text-3xl font-bold mb-8">Practical Applications</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Example 1: Data Validation */}
              <div 
                className={clsx(
                  "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500",
                  hoveredExample === 'validation' ? "shadow-xl shadow-blue-500/20 -translate-y-1" : "hover:shadow-xl"
                )}
                onMouseEnter={() => setHoveredExample('validation')}
                onMouseLeave={() => setHoveredExample(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Data Validation at CNAT Centers</h3>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Validating student registration data from <strong>CNAT Barrackpore</strong> and <strong>CNAT Naihati</strong>.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Using NF for Validation:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`# Check if each record has exactly 5 fields
awk -F',' '{
    if (NF != 5) {
        print "Error at line " NR ": Expected 5 fields, found " NF
        print "Record: " $0
    }
}' students.csv

# Process only valid records
awk -F',' 'NF == 5 {
    print "Processing: " $1 " from " $5
    # Normal processing here
}' students.csv`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Using NR for Header/Footer:</h4>
                    <pre className="bg-blue-900/30 text-blue-100 p-3 rounded-lg overflow-x-auto text-xs">
{`# Skip header (first line)
awk -F',' 'NR > 1 {print $1, $2}'

# Process only first 10 records
awk 'NR <= 10 {print NR ": " $0}'

# Process every other record (odd lines)
awk 'NR % 2 == 1 {print "Odd line " NR ": " $1}'`}
                    </pre>
                  </div>
                </div>
              </div>
              
              {/* Example 2: Format Transformation */}
              <div 
                className={clsx(
                  "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500",
                  hoveredExample === 'formatting' ? "shadow-xl shadow-green-500/20 -translate-y-1" : "hover:shadow-xl"
                )}
                onMouseEnter={() => setHoveredExample('formatting')}
                onMouseLeave={() => setHoveredExample(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Format Transformation</h3>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Converting between different data formats for <strong>Swadeep</strong>'s and <strong>Tuhina</strong>'s records.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Customizing FS and OFS:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`# CSV to Pipe-delimited
awk 'BEGIN{FS=","; OFS="|"} {print $1, $2, $3, $4}'

# Space-delimited to CSV
awk 'BEGIN{OFS=","} {print $1, $2, $3, $4}'

# Multi-character separators
awk 'BEGIN{FS="[ :]+"; OFS="\t"} {print $1, $2, $3}'`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Using $NF for Last Field:</h4>
                    <pre className="bg-green-900/30 text-green-100 p-3 rounded-lg overflow-x-auto text-xs">
{`# Always get the last field (regardless of field count)
awk '{print "Last field: " $NF}'

# Get second last field
awk '{print "Second last: " $(NF-1)}'

# Remove last field
awk '{NF--; print $0}'  # CAUTION: modifies NF!

# Safe removal of last field
awk '{for(i=1; i<NF; i++) printf "%s ", $i; print ""}'`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.4s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Critical Mistakes with awk Variables</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Modifying NF Incorrectly</h4>
                    <p className="text-sm">
                      Changing NF directly can truncate or extend $0 unexpectedly. At <strong>CNAT Shyamnagar</strong>, 
                      a student lost data by setting <code>NF=3</code> on a 5-field record.
                    </p>
                    <pre className="bg-red-900/30 text-red-100 p-2 rounded mt-2 text-xs">
                      {`# DANGEROUS: awk '{NF=3; print $0}'  # Truncates record!`}
                      {`# SAFER: awk '{print $1, $2, $3}'   # Explicit fields`}
                    </pre>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Forgetting to Set FS/OFS in BEGIN</h4>
                    <p className="text-sm">
                      Setting FS/OFS in the main block affects only subsequent records. First record uses default separator.
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-2 text-xs">
                      {`# WRONG: awk '{FS=","; print $1}'  # First line uses space!`}
                      {`# CORRECT: awk 'BEGIN{FS=","} {print $1}'`}
                    </pre>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">$0 vs Field Assignment Confusion</h4>
                    <p className="text-sm">
                      Assigning to a field ($1="new") updates $0, but assigning to $0 doesn't update fields. 
                      They get out of sync.
                    </p>
                    <pre className="bg-red-900/30 text-red-100 p-2 rounded mt-2 text-xs">
                      {`awk '{$1="NEW"; print $0}'   # $0 updated`}
                      {`awk '{$0="NEW"; print $1}'   # $1 is "NEW", but fields not parsed!`}
                    </pre>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">NR in END Block Pitfall</h4>
                    <p className="text-sm">
                      In END block, NR has total records processed. Don't use it to reference specific records.
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-2 text-xs">
                      {`# WRONG: END{print $NR}  # Tries to print field $[total]`}
                      # CORRECT: Store in array during processing
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.5s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
            <h2 className="text-3xl font-bold mb-8">Professional Best Practices</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-blue-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Always Initialize in BEGIN</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Set FS, OFS, RS, ORS in BEGIN block. This ensures they're applied to all records from the start.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-green-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Use NF for Validation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Check NF early to handle malformed data. Use $NF to access last field when column count varies.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-purple-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Leverage NR for Processing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use NR to skip headers, process specific ranges, or track progress through large files.
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 text-purple-600 dark:text-purple-400">Professional Pattern: Robust awk Script</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`#!/usr/bin/awk -f
# Professional awk script template
BEGIN {
    # Always set separators in BEGIN
    FS = ","
    OFS = "|"
    
    # Initialize counters
    valid_count = 0
    error_count = 0
    
    # Print header
    print "Processing Report"
    print "================="
}

# Main processing with validation
{
    # Validate using NF
    if (NF != expected_fields) {
        printf "ERROR [Line %d]: Expected %d fields, got %d\\n", 
               NR, expected_fields, NF >> "/dev/stderr"
        error_count++
        next  # Skip to next record
    }
    
    # Process valid records
    # Use $NF for last field, $(NF-1) for second last, etc.
    grade = $(NF-1)
    name = $1
    
    # Track statistics
    if (grade >= 90) A_count++
    else if (grade >= 80) B_count++
    
    valid_count++
}

END {
    # Generate summary using NR (total records processed)
    print "================="
    printf "Total Records: %d\\n", NR
    printf "Valid Records: %d\\n", valid_count
    printf "Errors: %d\\n", error_count
    print "================="
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.6s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">What Students Should Remember</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-green-600 dark:text-green-400">✓ Essential Variables</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">1</span>
                      <span><code>NR</code>: Current record number (line number)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">2</span>
                      <span><code>NF</code>: Number of fields in current record</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">3</span>
                      <span><code>$0</code>: Entire input record</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-emerald-600 dark:text-emerald-400">✓ Critical Rules</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">4</span>
                      <span>Set <code>FS</code>, <code>OFS</code> in <code>BEGIN</code> block only</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">5</span>
                      <span>Use <code>$NF</code> to access last field (safe for variable columns)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">6</span>
                      <span>Validate data with <code>NF</code> before processing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.7s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.7s_both]">
            <div 
              className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">SH</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <h2 className="text-2xl font-bold">Teacher's Note</h2>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2">Understanding awk's Internal State</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      When teaching awk at <strong>CNAT Ichapur</strong>, I compare built-in variables to a car's dashboard. 
                      <code>NR</code> is the odometer (total records), <code>NF</code> is the gear indicator (current field count), 
                      and <code>$0</code>/<code>$1</code> are the steering wheel (controlling what you work with).
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Teaching Drill:</h4>
                      <p className="text-sm">
                        Have students like <strong>Abhronila</strong> and <strong>Debangshu</strong> process CNAT student data 
                        while printing NR and NF for each record. This helps them visualize how awk processes data 
                        and understand when each variable updates. Always emphasize: "Set FS in BEGIN, validate with NF, 
                        track with NR."
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">Sukanta Hui</p>
                      <p className="text-gray-600 dark:text-gray-400">sukantahui@codernaccotax.co.in</p>
                      <p className="text-gray-600 dark:text-gray-400">{experience} years experience</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Expertise:</p>
                      <p className="text-gray-600 dark:text-gray-400">Programming Languages, RDBMS, Operating Systems, Web Development</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section>
          <div className="animate-[fadeInUp_0.8s_ease-out_0.8s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0l2 2m-2-2l-2 2M9 7h6m4 0a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2m4 0V5a1 1 0 00-1-1H8a1 1 0 00-1 1v2h6z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Think About This...</h2>
                  <p className="text-gray-600 dark:text-gray-300">Developing debugging intuition</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Observe Carefully:</h4>
                    <p className="text-sm">
                      What happens to <code>$0</code> when you assign a value to <code>$1</code>? 
                      Try it with <strong>Tuhina</strong>'s student record. Now try the reverse.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Try Changing This:</h4>
                    <p className="text-sm">
                      Process a file with inconsistent field counts. How does <code>NF</code> help you 
                      handle this? What happens if you try to access <code>$10</code> when <code>NF</code> is 5?
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Consider This Scenario:</h4>
                  <p className="text-sm mb-3">
                    At <strong>CNAT Shyamnagar</strong>, you're processing exam results where:
                  </p>
                  <ul className="text-sm space-y-1 mb-3">
                    <li>• First line is a header (should be skipped)</li>
                    <li>• Some records have 5 fields (normal), some have 6 (with remarks)</li>
                    <li>• Last 2 lines are summary statistics (should be processed differently)</li>
                  </ul>
                  <p className="text-sm">
                    <strong>Challenge:</strong> Design an awk script using NR and NF to handle all these cases correctly. 
                    How would you identify which lines are headers, which are data, and which are summaries?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Topic 11: Built-in Variables in awk (NR, NF, FS, OFS, $0, $1...) • Next: Conditional Logic and Loops in awk</p>
          <p className="mt-2">Interactive Learning System • Mastering awk Internals • Designed for CNAT Computer Centers</p>
        </div>
      </footer>
    </div>
  );
};

export default Topic10;