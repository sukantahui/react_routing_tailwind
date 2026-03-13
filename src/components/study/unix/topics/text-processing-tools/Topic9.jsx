import React, { useState } from "react";
import clsx from "clsx";

const Topic9 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeField, setActiveField] = useState(1);
  const [hoveredExample, setHoveredExample] = useState(null);

  // Calculate experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 py-8 transition-colors duration-500">
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
        
        @keyframes columnHighlight {
          0% {
            fill: #4b5563;
          }
          50% {
            fill: #3b82f6;
          }
          100% {
            fill: #4b5563;
          }
        }
        
        @keyframes recordFlow {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(400px);
            opacity: 0;
          }
        }
        
        @keyframes dataTransform {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.3);
          }
        }
        
        @keyframes reportGenerate {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div 
          className="animate-[fadeInUp_0.8s_ease-out] motion-safe:animate-[fadeInUp_0.8s_ease-out]"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Topic 10: Data Processing Mastery
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              awk for Column-Based Processing and Reports
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            Transform raw data into meaningful insights by mastering awk's powerful column processing and reporting capabilities.
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
                hoveredCard === 'intro' ? "shadow-2xl shadow-blue-500/20 dark:shadow-blue-500/10 -translate-y-1" : "hover:shadow-xl"
              )}
              onMouseEnter={() => setHoveredCard('intro')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">The Power of awk for Data Processing</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    awk is a complete programming language designed for pattern scanning and text processing. 
                    Its real strength lies in processing structured, column-based data and generating formatted reports.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-blue-600 dark:text-blue-400">Basic Syntax</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
{`awk 'pattern { action }' input_file
awk -F: '{print $1}' /etc/passwd  # Field separator
awk '{print NF, NR, $0}' file     # Built-in variables`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-purple-600 dark:text-purple-400">When to Use awk</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Processing CSV/TSV files
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Generating summary reports
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Data validation and cleaning
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Concepts Visualization */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <h2 className="text-3xl font-bold mb-8 text-center">Understanding awk's Record & Field Model</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Conceptual Explanation */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Records & Fields</h3>
                  <p className="mb-4">
                    awk processes data <strong>record by record</strong> (lines by default). Each record is split into 
                    <strong> fields</strong> (columns). The magic happens with field variables.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        className={clsx(
                          "p-4 text-center rounded-lg transition-all duration-300 cursor-pointer",
                          activeField === 1 ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500" : "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                        onClick={() => setActiveField(1)}
                        onMouseEnter={() => setActiveField(1)}
                      >
                        <div className="font-mono text-lg text-blue-500">$0</div>
                        <div className="text-sm mt-2">Entire record</div>
                      </div>
                      <div 
                        className={clsx(
                          "p-4 text-center rounded-lg transition-all duration-300 cursor-pointer",
                          activeField === 2 ? "bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500" : "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                        onClick={() => setActiveField(2)}
                        onMouseEnter={() => setActiveField(2)}
                      >
                        <div className="font-mono text-lg text-purple-500">$1</div>
                        <div className="text-sm mt-2">First field</div>
                      </div>
                      <div 
                        className={clsx(
                          "p-4 text-center rounded-lg transition-all duration-300 cursor-pointer",
                          activeField === 3 ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500" : "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                        onClick={() => setActiveField(3)}
                        onMouseEnter={() => setActiveField(3)}
                      >
                        <div className="font-mono text-lg text-green-500">NF</div>
                        <div className="text-sm mt-2">Field count</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Built-in Variables:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><code className="text-blue-500">NR</code>: Current record number</div>
                        <div><code className="text-purple-500">NF</code>: Number of fields</div>
                        <div><code className="text-green-500">FS</code>: Field separator</div>
                        <div><code className="text-orange-500">OFS</code>: Output field separator</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">awk Program Structure</h3>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`BEGIN { 
    # Initialize variables
    FS = ",";          # Set field separator
    total = 0;         # Initialize counter
    print "Report Start";
}

# Main processing
{
    # Process each record
    total += $3;       # Sum column 3
    if ($2 > 50)       # Conditional logic
        print $1, $2;  # Print specific fields
}

END {
    # Generate final report
    print "Total:", total;
    print "Average:", total/NR;
}`}
                  </pre>
                </div>
              </div>
              
              {/* Right: Interactive Visualization */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-center">Visualizing awk Processing</h3>
                
                <div className="relative h-80">
                  <svg width="100%" height="100%" viewBox="0 0 400 320" className="overflow-visible">
                    {/* Data Structure */}
                    <g transform="translate(20, 40)">
                      {/* Records */}
                      <text x="0" y="0" fill="#9ca3af" fontSize="12">Records (Lines):</text>
                      <g transform="translate(0, 20)">
                        <rect x="0" y="0" width="360" height="30" rx="4" fill="#1f2937" />
                        <text x="10" y="20" fill="white" fontSize="12" dy=".3em">John 85 92 78 Math</text>
                        <rect x="0" y="40" width="360" height="30" rx="4" fill="#1f2937" />
                        <text x="10" y="60" fill="white" fontSize="12" dy=".3em">Sarah 92 88 95 Science</text>
                        <rect x="0" y="80" width="360" height="30" rx="4" fill="#1f2937" />
                        <text x="10" y="100" fill="white" fontSize="12" dy=".3em">Mike 78 85 90 History</text>
                        
                        {/* Highlight active record */}
                        <rect 
                          x="0" 
                          y={activeField === 1 ? 0 : activeField === 2 ? 40 : 80} 
                          width="360" 
                          height="30" 
                          rx="4" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                      </g>
                      
                      {/* Fields Highlight */}
                      <g transform="translate(0, 130)">
                        <text x="0" y="0" fill="#9ca3af" fontSize="12">Fields (Columns):</text>
                        
                        {/* Field separators */}
                        <line x1="50" y1="20" x2="50" y2="80" stroke="#4b5563" strokeDasharray="3,3" />
                        <line x1="100" y1="20" x2="100" y2="80" stroke="#4b5563" strokeDasharray="3,3" />
                        <line x1="150" y1="20" x2="150" y2="80" stroke="#4b5563" strokeDasharray="3,3" />
                        <line x1="200" y1="20" x2="200" y2="80" stroke="#4b5563" strokeDasharray="3,3" />
                        
                        {/* Field numbers */}
                        <g transform="translate(25, 40)">
                          <rect 
                            x="0" 
                            y="0" 
                            width="50" 
                            height="30" 
                            rx="4" 
                            fill={activeField === 1 ? "#3b82f6" : "#374151"}
                            className="transition-all duration-300"
                          />
                          <text x="25" y="15" textAnchor="middle" fill="white" fontSize="12" dy=".3em">$1</text>
                        </g>
                        
                        <g transform="translate(75, 40)">
                          <rect 
                            x="0" 
                            y="0" 
                            width="50" 
                            height="30" 
                            rx="4" 
                            fill={activeField === 2 ? "#8b5cf6" : "#4b5563"}
                            className="transition-all duration-300"
                          />
                          <text x="25" y="15" textAnchor="middle" fill="white" fontSize="12" dy=".3em">$2</text>
                        </g>
                        
                        <g transform="translate(125, 40)">
                          <rect 
                            x="0" 
                            y="0" 
                            width="50" 
                            height="30" 
                            rx="4" 
                            fill={activeField === 3 ? "#10b981" : "#4b5563"}
                            className="transition-all duration-300"
                          />
                          <text x="25" y="15" textAnchor="middle" fill="white" fontSize="12" dy=".3em">$3</text>
                        </g>
                      </g>
                      
                      {/* Processing Animation */}
                      <g transform="translate(0, 200)">
                        <rect x="0" y="0" width="80" height="40" rx="8" fill="#059669" />
                        <text x="40" y="20" textAnchor="middle" fill="white" fontSize="12" dy=".3em">awk Engine</text>
                        
                        {/* Processing dots */}
                        <circle cx="120" cy="20" r="4" fill="#f59e0b">
                          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="130" cy="20" r="4" fill="#f59e0b">
                          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin="0.2s" />
                        </circle>
                        <circle cx="140" cy="20" r="4" fill="#f59e0b">
                          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin="0.4s" />
                        </circle>
                        
                        {/* Output */}
                        <g transform="translate(180, 0)">
                          <rect x="0" y="0" width="180" height="40" rx="8" fill="#7c3aed" />
                          <text x="90" y="20" textAnchor="middle" fill="white" fontSize="12" dy=".3em">Formatted Report</text>
                        </g>
                      </g>
                    </g>
                    
                    {/* Data flow arrow */}
                    <path 
                      d="M90,240 Q120,240 120,210 T150,180 T180,180 T210,180 T240,180"
                      fill="none" 
                      stroke="url(#gradient)" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                    
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Click/hover on field boxes to see how awk processes different columns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.3s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
            <h2 className="text-3xl font-bold mb-8">Practical Applications in Education</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Student Marks Processing */}
              <div 
                className={clsx(
                  "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500",
                  hoveredExample === 'marks' ? "shadow-xl shadow-green-500/20 -translate-y-1" : "hover:shadow-xl"
                )}
                onMouseEnter={() => setHoveredExample('marks')}
                onMouseLeave={() => setHoveredExample(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">CNAT Student Marks Processing</h3>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Processing marks for students at <strong>CNAT Barrackpore</strong> - 
                  <strong>Swadeep</strong>, <strong>Ritaja</strong>, <strong>Abhronila</strong>, and others.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Input Data (marks.txt):</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`Swadeep Sharma,85,92,78,Maths
Ritaja Das,92,88,95,Science
Abhronila Roy,78,85,90,History
Debangshu Sen,65,72,68,English
Roshni Verma,95,96,98,Computer`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">awk Report Generation:</h4>
                    <pre className="bg-blue-900/30 text-blue-100 p-3 rounded-lg overflow-x-auto text-xs">
{`awk -F, 'BEGIN {
    print "CNAT Student Performance Report"
    print "================================="
    printf "%-20s %-8s %-8s %-8s\\n", "Student", "Total", "Average", "Grade"
}
{
    total = $2 + $3 + $4
    avg = total / 3
    grade = (avg >= 90) ? "A" : (avg >= 80) ? "B" : (avg >= 70) ? "C" : "D"
    printf "%-20s %-8d %-8.2f %-8s\\n", $1, total, avg, grade
    sum += total
}
END {
    print "================================="
    printf "Average Total Marks: %.2f\\n", sum/NR
}' marks.txt`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Output Report:</h4>
                    <pre className="bg-green-900/30 text-green-100 p-3 rounded-lg overflow-x-auto text-xs">
{`CNAT Student Performance Report
=================================
Student              Total    Average  Grade   
Swadeep Sharma       255      85.00    B       
Ritaja Das           275      91.67    A       
Abhronila Roy        253      84.33    B       
Debangshu Sen        205      68.33    D       
Roshni Verma         289      96.33    A       
=================================
Average Total Marks: 255.40`}
                    </pre>
                  </div>
                </div>
              </div>
              
              {/* Attendance Analysis */}
              <div 
                className={clsx(
                  "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500",
                  hoveredExample === 'attendance' ? "shadow-xl shadow-purple-500/20 -translate-y-1" : "hover:shadow-xl"
                )}
                onMouseEnter={() => setHoveredExample('attendance')}
                onMouseLeave={() => setHoveredExample(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Attendance Analysis Report</h3>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Analyzing attendance records from <strong>CNAT Naihati</strong> and <strong>CNAT Shyamnagar</strong> centers.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Complex Data Processing:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`awk -F, '{
    # Calculate attendance percentage
    percentage = ($3/$4) * 100
    
    # Categorize students
    if (percentage >= 75) {
        category = "Good"
        good_count++
    } else if (percentage >= 50) {
        category = "Average"
        avg_count++
    } else {
        category = "Poor"
        poor_count++
    }
    
    # Store for sorting
    students[NR] = $1
    percentages[NR] = percentage
    categories[NR] = category
    center[NR] = $2
}
END {
    # Generate summary report
    print "Attendance Analysis Report"
    print "=========================="
    print ""
    print "Category Summary:"
    print "Good (" good_count " students): " good_count/NR*100 "%"
    print "Average (" avg_count " students): " avg_count/NR*100 "%"
    print "Poor (" poor_count " students): " poor_count/NR*100 "%"
    print ""
    print "Students Needing Attention:"
    for (i=1; i<=NR; i++) {
        if (categories[i] == "Poor") {
            printf "%-20s (Center: %s): %.1f%%\\n", 
                   students[i], center[i], percentages[i]
        }
    }
}' attendance.csv`}
                    </pre>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Professional Insight:</strong> awk can handle complex logic, arrays, and 
                      generate multi-section reports. Perfect for administrative tasks at CNAT centers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.4s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <h2 className="text-3xl font-bold mb-8">Advanced awk Features for Reports</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-blue-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Aggregation Functions</h3>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs mt-2">
{`# Sum, Average, Min, Max
awk '{sum+=$3} END{print "Sum:", sum}'
awk '{if(min==""){min=$3}; 
      if($3<min){min=$3}; 
      if($3>max){max=$3}} 
     END{print "Min:", min, "Max:", max}'`}
                </pre>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-green-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Formatting with printf</h3>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs mt-2">
{`# Column formatting
printf "%-20s %10.2f %8s\\n", name, salary, grade

# Format Specifiers:
# %s - String
# %d - Integer
# %f - Float (.2 for 2 decimals)
# %-  - Left align
# %   - Right align`}
                </pre>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-purple-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Arrays & Grouping</h3>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs mt-2">
{`# Group by department
awk -F, '{dept[$5]++} 
        END{for(d in dept) 
            print d ":", dept[d] " students"}' 

# Sum by category
awk '{category[$4]+=$3} 
     END{for(c in category) 
         print c, category[c]}'`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.5s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Common awk Pitfalls & Solutions</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Missing Field Separator</h4>
                    <p className="text-sm">
                      Not setting <code>-F</code> for CSV files. Default is whitespace, not commas.
                    </p>
                    <pre className="bg-red-900/30 text-red-100 p-2 rounded mt-2 text-xs">
                      {`# WRONG: awk '{print $1,$2}' data.csv`}
                      {`# CORRECT: awk -F, '{print $1,$2}' data.csv`}
                    </pre>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">String vs Number Issues</h4>
                    <p className="text-sm">
                      awk treats uninitialized variables as 0 or empty string. Initialize variables in BEGIN block.
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-2 text-xs">
                      {`BEGIN {total=0}  # Always initialize`}
                      {`{total += $3}    # Now it works correctly`}
                    </pre>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">printf Format Errors</h4>
                    <p className="text-sm">
                      Mismatched format specifiers and arguments cause runtime errors or garbage output.
                    </p>
                    <pre className="bg-red-900/30 text-red-100 p-2 rounded mt-2 text-xs">
                      # WRONG: printf "%d %s", name, score
                      # CORRECT: printf "%s %d", name, score
                    </pre>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Array Index Confusion</h4>
                    <p className="text-sm">
                      awk arrays are associative. <code>for(i in array)</code> doesn't guarantee order. Use <code>asort()</code> for sorting.
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-2 text-xs">
                      # Process in random order
                      for (dept in departments) 
                          print dept, departments[dept]
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.6s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
            <h2 className="text-3xl font-bold mb-8">Professional awk Best Practices</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-green-600 dark:text-green-400">✓ Script Organization</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Use BEGIN block for initialization (FS, OFS, variables)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Put complex logic in separate awk script files (.awk)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Comment complex operations for maintenance</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-blue-600 dark:text-blue-400">✓ Performance & Efficiency</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Process files once, store in arrays if needed for END</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Use next statement to skip unnecessary processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>For large files, avoid storing all data in memory</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 text-purple-600 dark:text-purple-400">Industry Reporting Pattern</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`# Standard report template
awk -F, 'BEGIN {
    # Header
    print "=" x 60
    print "REPORT TITLE"
    print "Generated: " strftime("%Y-%m-%d %H:%M:%S")
    print "=" x 60
    print ""
    
    # Column headers
    printf "%-20s %10s %10s %10s\\n", "Name", "Value1", "Value2", "Total"
    printf "%-20s %10s %10s %10s\\n", "----", "------", "------", "-----"
    
    # Initialize counters
    grand_total = 0
}

# Data processing
{
    # Business logic
    total = $2 + $3
    grand_total += total
    
    # Format output
    printf "%-20s %10.2f %10.2f %10.2f\\n", $1, $2, $3, total
}

END {
    # Summary section
    print ""
    print "-" x 60
    printf "Grand Total: %30.2f\\n", grand_total
    printf "Average: %34.2f\\n", grand_total/NR
    print "=" x 60
}' data.csv`}
              </pre>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.7s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.7s_both]">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">What Students Should Remember</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-green-600 dark:text-green-400">✓ Core Concepts</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">1</span>
                      <span><code>$0</code> = entire record, <code>$1</code>, <code>$2</code>... = fields</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">2</span>
                      <span>Use <code>-F</code> to set field separator (CSV: <code>-F,</code>)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">3</span>
                      <span><code>BEGIN</code> for setup, main block for processing, <code>END</code> for summary</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-emerald-600 dark:text-emerald-400">✓ Reporting Skills</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">4</span>
                      <span>Use <code>printf</code> for formatted output (not <code>print</code>)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">5</span>
                      <span>Initialize variables in <code>BEGIN</code> block</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">6</span>
                      <span>Test with sample data before processing large files</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.8s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
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
                    <h3 className="font-bold text-lg mb-2">Teaching awk: From Data to Decisions</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      When teaching awk at <strong>CNAT Ichapur</strong> and <strong>CNAT Barrackpore</strong>, 
                      I emphasize that awk isn't just a command—it's a <strong>data-to-decisions tool</strong>. 
                      Students like <strong>Swadeep</strong> and <strong>Ritaja</strong> learn best by processing real 
                      student data from our centers.
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Teaching Strategy:</h4>
                      <p className="text-sm">
                        Start with simple column extraction (<code>{`awk '{print $1, $3}'`}</code>), 
                        progress to calculations (<code>{`awk '{sum+=$3} END{print sum}'`}</code>), 
                        then to formatted reports. Always use actual CNAT data—it makes learning relevant 
                        and demonstrates real-world impact.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">Sukanta Hui</p>
                      <p className="text-gray-600 dark:text-gray-400">sukantahui@codernaccotax.co.in</p>
                      <p className="text-gray-600 dark:text-gray-400">{experience}+ years experience</p>
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
          <div className="animate-[fadeInUp_0.8s_ease-out_0.9s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.9s_both]">
            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0l2 2m-2-2l-2 2M9 7h6m4 0a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2m4 0V5a1 1 0 00-1-1H8a1 1 0 00-1 1v2h6z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Think About This...</h2>
                  <p className="text-gray-600 dark:text-gray-300">Developing data analysis thinking</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Observe Carefully:</h4>
                    <p className="text-sm">
                      How does awk handle empty fields in a CSV file? Try processing a file where 
                      <strong>Debangshu</strong>'s record has missing marks in some subjects.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Try Changing This:</h4>
                    <p className="text-sm">
                      Modify the student report to show percentage instead of total marks. 
                      How would you handle different maximum marks for different subjects?
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Consider This Scenario:</h4>
                  <p className="text-sm mb-3">
                    At <strong>CNAT Shyamnagar</strong>, you need to process exam results from 5 different subjects 
                    for 200 students and generate:
                  </p>
                  <ul className="text-sm space-y-1 mb-3">
                    <li>• Individual student report cards</li>
                    <li>• Class-wise subject averages</li>
                    <li>• Top 10 performers list</li>
                    <li>• Subject-wise pass percentage</li>
                  </ul>
                  <p className="text-sm">
                    <strong>Challenge:</strong> Design an awk script that generates all these reports in one pass 
                    through the data file. Think about data structures and memory usage.
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
          <p>Topic 10: awk for Column-Based Processing and Reports • Next: Built-in Variables in awk</p>
          <p className="mt-2">Interactive Learning System • Data Processing Mastery • Designed for CNAT Computer Centers</p>
        </div>
      </footer>
    </div>
  );
};

export default Topic9;