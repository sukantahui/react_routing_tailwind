import React, { useState } from "react";
import clsx from "clsx";

const Topic8 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeMode, setActiveMode] = useState("stream");
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
        
        @keyframes streamFlow {
          0% {
            transform: translateX(-100px);
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
        
        @keyframes filePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes sedTransform {
          0% {
            filter: brightness(1);
            transform: scale(1);
          }
          50% {
            filter: brightness(1.2);
            transform: scale(1.05);
          }
          100% {
            filter: brightness(1);
            transform: scale(1);
          }
        }
      `}</style>

      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div 
          className="animate-[fadeInUp_0.8s_ease-out] motion-safe:animate-[fadeInUp_0.8s_ease-out]"
        >
          <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
            Topic 9: sed Mastery
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
              Using sed with Files vs Streams
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            Master the crucial distinction between modifying files in-place and processing data streams with sed.
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
                hoveredCard === 'intro' ? "shadow-2xl shadow-green-500/20 dark:shadow-green-500/10 -translate-y-1" : "hover:shadow-xl"
              )}
              onMouseEnter={() => setHoveredCard('intro')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Two Faces of sed</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    sed (stream editor) operates in two distinct modes: <strong>stream processing</strong> (non-destructive, output to stdout) 
                    and <strong>file editing</strong> (in-place modification). Understanding when to use each is crucial for safe and effective text processing.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-green-600 dark:text-green-400">Stream Processing</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Non-destructive: Original file unchanged
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Output to terminal or pipe
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Safe for experimentation
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-red-600 dark:text-red-400">File Editing</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Destructive: Modifies original file
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Requires -i flag
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Use with caution!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Comparison */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <h2 className="text-3xl font-bold mb-8 text-center">Stream Mode vs File Mode: Visual Comparison</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Stream Mode */}
              <div 
                className={clsx(
                  "bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border-2 transition-all duration-500",
                  activeMode === "stream" ? "border-green-500 dark:border-green-400" : "border-transparent"
                )}
                onMouseEnter={() => setActiveMode("stream")}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Stream Mode</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                    Read-only by default
                  </span>
                </div>
                
                {/* Stream Visualization */}
                <div className="relative h-64 mb-6 overflow-hidden rounded-xl bg-gray-900 p-4">
                  <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                    {/* Data Flow */}
                    <rect x="20" y="80" width="60" height="40" rx="8" fill="#059669" />
                    <text x="50" y="100" textAnchor="middle" fill="white" fontSize="12" dy=".3em">Input</text>
                    
                    {/* Arrow */}
                    <path d="M100,100 L140,100" stroke="#10b981" strokeWidth="3" fill="none" />
                    <polygon points="140,100 130,95 130,105" fill="#10b981" />
                    
                    {/* sed Processor */}
                    <g transform="translate(150, 80)">
                      <rect x="0" y="0" width="60" height="40" rx="8" fill="#3b82f6" className="animate-[sedTransform_2s_ease-in-out_infinite]" />
                      <text x="30" y="20" textAnchor="middle" fill="white" fontSize="12" dy=".3em">sed</text>
                      <text x="30" y="35" textAnchor="middle" fill="#d1d5db" fontSize="10">Processor</text>
                    </g>
                    
                    {/* Arrow */}
                    <path d="M230,100 L270,100" stroke="#10b981" strokeWidth="3" fill="none" />
                    <polygon points="270,100 260,95 260,105" fill="#10b981" />
                    
                    {/* Output */}
                    <rect x="280" y="80" width="60" height="40" rx="8" fill="#8b5cf6" />
                    <text x="310" y="100" textAnchor="middle" fill="white" fontSize="12" dy=".3em">Output</text>
                    
                    {/* Animated data packet */}
                    <rect x="30" y="85" width="40" height="30" rx="6" fill="#f59e0b" opacity="0.8">
                      <animate 
                        attributeName="x"
                        values="30;280"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate 
                        attributeName="fill"
                        values="#f59e0b;#3b82f6;#8b5cf6"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    
                    {/* Terminal icon */}
                    <g transform="translate(280, 130)">
                      <rect x="0" y="0" width="60" height="30" rx="6" fill="#1f2937" />
                      <text x="30" y="15" textAnchor="middle" fill="#10b981" fontSize="10" dy=".3em">Terminal</text>
                    </g>
                    
                    {/* Original file remains unchanged */}
                    <g transform="translate(20, 130)">
                      <rect x="0" y="0" width="60" height="30" rx="6" fill="#374151" />
                      <text x="30" y="15" textAnchor="middle" fill="#d1d5db" fontSize="10" dy=".3em">Original</text>
                      <text x="30" y="25" textAnchor="middle" fill="#10b981" fontSize="8" dy=".3em">(Unchanged)</text>
                    </g>
                  </svg>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Command Syntax:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
                      sed 's/old/new/g' input.txt
                    </pre>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Characteristics:</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Safe for testing transformations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Can pipe output to other commands</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Used in shell pipelines</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Right: File Mode */}
              <div 
                className={clsx(
                  "bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border-2 transition-all duration-500",
                  activeMode === "file" ? "border-red-500 dark:border-red-400" : "border-transparent"
                )}
                onMouseEnter={() => setActiveMode("file")}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">File Mode</h3>
                  </div>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-medium">
                    In-place editing
                  </span>
                </div>
                
                {/* File Mode Visualization */}
                <div className="relative h-64 mb-6 overflow-hidden rounded-xl bg-gray-900 p-4">
                  <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                    {/* Before Editing */}
                    <g transform="translate(20, 40)">
                      <rect x="0" y="0" width="80" height="40" rx="8" fill="#dc2626" />
                      <text x="40" y="20" textAnchor="middle" fill="white" fontSize="12" dy=".3em">Original File</text>
                      <text x="40" y="30" textAnchor="middle" fill="#fca5a5" fontSize="9" dy=".3em">(Before)</text>
                    </g>
                    
                    {/* Warning Icon */}
                    <g transform="translate(120, 50)">
                      <circle cx="20" cy="20" r="20" fill="#f59e0b" />
                      <text x="20" y="25" textAnchor="middle" fill="black" fontSize="20" fontWeight="bold">!</text>
                      <animateTransform 
                        attributeName="transform"
                        type="scale"
                        values="1;1.1;1"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </g>
                    
                    {/* sed with -i flag */}
                    <g transform="translate(170, 40)">
                      <rect x="0" y="0" width="100" height="40" rx="8" fill="#7c3aed" />
                      <text x="50" y="15" textAnchor="middle" fill="white" fontSize="12" dy=".3em">sed -i</text>
                      <text x="50" y="28" textAnchor="middle" fill="#ddd6fe" fontSize="10" dy=".3em">DANGER: Modifies file</text>
                    </g>
                    
                    {/* Arrow with caution */}
                    <path d="M110,60 L160,60" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                    
                    {/* After Editing */}
                    <g transform="translate(290, 40)">
                      <rect x="0" y="0" width="80" height="40" rx="8" fill="#059669" className="animate-[filePulse_2s_ease-in-out_infinite]" />
                      <text x="40" y="20" textAnchor="middle" fill="white" fontSize="12" dy=".3em">Modified File</text>
                      <text x="40" y="30" textAnchor="middle" fill="#a7f3d0" fontSize="9" dy=".3em">(After - permanent)</text>
                    </g>
                    
                    {/* Backup file */}
                    <g transform="translate(120, 120)">
                      <rect x="0" y="0" width="60" height="30" rx="6" fill="#6b7280" />
                      <text x="30" y="15" textAnchor="middle" fill="white" fontSize="10" dy=".3em">Backup.bak</text>
                    </g>
                    
                    {/* Text showing modification */}
                    <g transform="translate(20, 100)">
                      <text x="0" y="0" fill="#d1d5db" fontSize="10">Old content → New content</text>
                      <line x1="0" y1="10" x2="200" y2="10" stroke="#3b82f6" strokeWidth="2" />
                      <circle cx="100" cy="10" r="4" fill="#3b82f6">
                        <animate attributeName="cy" values="10;15;10" dur="1s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </svg>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Command Syntax:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
                      sed -i 's/old/new/g' file.txt
                    </pre>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
                      sed -i.bak 's/old/new/g' file.txt  # With backup
                    </pre>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Characteristics:</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">⚠</span>
                        <span>Permanently modifies original file</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">⚠</span>
                        <span>Always test with stream mode first</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Use .bak extension for safety</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Scenarios */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.3s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
            <h2 className="text-3xl font-bold mb-8">Real-World Application Scenarios</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Scenario 1: Student Records */}
              <div 
                className={clsx(
                  "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500",
                  hoveredExample === 'students' ? "shadow-xl shadow-blue-500/20 -translate-y-1" : "hover:shadow-xl"
                )}
                onMouseEnter={() => setHoveredExample('students')}
                onMouseLeave={() => setHoveredExample(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">CNAT Student Records Update</h3>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  At <strong>CNAT Barrackpore</strong>, student phone numbers need updating. Old format: <code>+91-XXX-XXX-XXXX</code>, 
                  new format: <code>+91 XXXXX XXXXX</code>.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Safe Testing (Stream):</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
                    {`# First test without modifying
                    sed 's/\\+91-\\(...\\)-\\(...\\)-\\(....\\)/+91 \\1 \\2 \\3/' students.txt

                    # Check output for Swadeep, Ritaja's records
                    sed 's/\\+91-\\(...\\)-\\(...\\)-\\(....\\)/+91 \\1 \\2 \\3/' students.txt | head -5`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Actual Update (File Mode):</h4>
                    <pre className="bg-red-900/30 text-red-100 p-3 rounded-lg overflow-x-auto text-xs">
                    {`# Create backup and modify
                    sed -i.bak 's/\\+91-\\(...\\)-\\(...\\)-\\(....\\)/+91 \\1 \\2 \\3/' students.txt

                    # Verify changes
                    diff students.txt.bak students.txt`}
                    </pre>
                                    </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm">
                    <strong>Professional Tip:</strong> Always create backup (<code>.bak</code>) when using <code>-i</code>. 
                    Test with stream mode first to avoid corrupting <strong>Roshni</strong>&apos;s important records.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Scenario 2: Server Config */}
              <div 
                className={clsx(
                  "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500",
                  hoveredExample === 'server' ? "shadow-xl shadow-purple-500/20 -translate-y-1" : "hover:shadow-xl"
                )}
                onMouseEnter={() => setHoveredExample('server')}
                onMouseLeave={() => setHoveredExample(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Server Configuration Pipeline</h3>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Processing Apache logs from <strong>CNAT Naihati</strong> server: Extract IPs, filter, then modify config.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Stream Processing Chain:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`# Multiple sed commands in pipeline
cat access.log | sed 's/ - -.*//' | sed '/192.168/d' | sed 's/^/IP: /'

# Same using multiple expressions
sed -e 's/ - -.*//' -e '/192.168/d' -e 's/^/IP: /' access.log`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Combining with File Edit:</h4>
                    <pre className="bg-purple-900/30 text-purple-100 p-3 rounded-lg overflow-x-auto text-xs">
{`# Extract data, then modify config
grep "ERROR" app.log | sed 's/.*ERROR: //' > errors.txt

# Update config file with backup
sed -i.bak 's/old_database/new_database/' config.cnf

# Stream result for verification
sed -n '10,20p' config.cnf`}
                    </pre>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <p className="text-sm">
                      <strong>Expert Insight:</strong> Use streams for analysis, file mode for permanent changes. 
                      Chain sed commands with pipes for complex transformations.
                    </p>
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
                <h2 className="text-2xl font-bold">Critical Mistakes to Avoid</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Forgot to Test First</h4>
                    <p className="text-sm">
                      Using <code>sed -i</code> without testing with stream mode first. At <strong>CNAT Shyamnagar</strong>, 
                      a student accidentally replaced all commas with nothing in a CSV file, losing all data.
                    </p>
                    <pre className="bg-red-900/30 text-red-100 p-2 rounded mt-2 text-xs">
                      # WRONG: sed -i 's/,//g' students.csv  # All data lost!
                    </pre>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">No Backup with -i</h4>
                    <p className="text-sm">
                      Not using <code>-i.bak</code> when modifying critical files. There's no undo button for <code>sed -i</code>!
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-2 text-xs">
                      # BAD: sed -i 's/old/new/' file.txt
                      # GOOD: sed -i.bak 's/old/new/' file.txt
                    </pre>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Incorrect Pattern Greediness</h4>
                    <p className="text-sm">
                      Not understanding greedy vs non-greedy patterns. 
                      <code>sed 's/.*old/new/'</code> replaces everything from start of line, not just "old".
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-2 text-xs">
                      # Problem: sed 's/a.*b/REPLACED/'
                      # Input: "a something b another b" → "REPLACED another b"
                    </pre>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Assuming -i Works on stdin</h4>
                    <p className="text-sm">
                      Trying to use <code>-i</code> with piped input. <code>-i</code> only works with files, not streams.
                    </p>
                    <pre className="bg-red-900/30 text-red-100 p-2 rounded mt-2 text-xs">
                      # WRONG: cat file.txt | sed -i 's/old/new/'
                      # CORRECT: sed 's/old/new/' file.txt > newfile.txt
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
                <div className="text-green-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Test Before -i</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Always test sed transformations in stream mode before using <code>-i</code>. 
                  Use <code>head</code> or <code>tail</code> to check sample data.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-blue-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Always Backup</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use <code>sed -i.bak</code> or create manual backups before file modification. 
                  Your future self will thank you.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-purple-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Chain with Pipes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use sed in pipelines for complex transformations. Multiple simple sed commands are better than one complex one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.6s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
            <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">What Students Should Remember</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-green-600 dark:text-green-400">✓ Stream Mode Essentials</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">1</span>
                      <span>Default mode: Output to terminal, original file unchanged</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">2</span>
                      <span>Perfect for testing and piping to other commands</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">3</span>
                      <span>Use: <code>sed 's/pattern/replacement/' file.txt</code></span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-teal-600 dark:text-teal-400">✓ File Mode Safety Rules</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">4</span>
                      <span>Requires <code>-i</code> flag: Modifies file in-place</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">5</span>
                      <span>ALWAYS use backup: <code>sed -i.bak</code></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">6</span>
                      <span>Test with stream mode first before using <code>-i</code></span>
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
                    <h3 className="font-bold text-lg mb-2">The sed Safety Mantra</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      When teaching sed to students at <strong>CNAT Ichapur</strong>, I emphasize a simple rule: 
                      <strong>"Stream first, file second, backup always."</strong> 
                      Many beginners at <strong>CNAT centers</strong> learn this the hard way after losing important files.
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Classroom Drill:</h4>
                      <p className="text-sm">
                        Have students like <strong>Swadeep</strong> and <strong>Ritaja</strong> practice this workflow:
                        1) <code>sed 's/foo/bar/' file.txt</code> (check output), 
                        2) <code>sed -i.bak 's/foo/bar/' file.txt</code> (actual change), 
                        3) <code>diff file.txt.bak file.txt</code> (verify changes).
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
                  <p className="text-gray-600 dark:text-gray-300">Developing cautious editing habits</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Observe Carefully:</h4>
                    <p className="text-sm">
                      What happens when you run <code>sed -i '' 's/foo/bar/' file.txt</code> on macOS vs Linux? 
                      Notice the empty string after <code>-i</code> on macOS.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Try Changing This:</h4>
                    <p className="text-sm">
                      Create a test file with <strong>Abhronila</strong>'s class schedule. Try modifying it with stream mode first, 
                      then with file mode. Notice how the original file behaves differently.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Consider This Scenario:</h4>
                  <p className="text-sm mb-3">
                    At <strong>CNAT Naihati</strong>, a student needs to update email domains in a 10,000-record database from 
                    <code>@oldcollege.edu</code> to <code>@cnat.edu</code>.
                  </p>
                  <p className="text-sm">
                    <strong>Challenge:</strong> Design a safe workflow using both stream and file modes. 
                    How would you verify correctness before permanent changes? What backup strategy would you use?
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
          <p>Topic 9: Using sed with Files vs Streams • Next: awk for Column-Based Processing</p>
          <p className="mt-2">Interactive Learning System • Safe File Editing Practices • Designed for CNAT Computer Centers</p>
        </div>
      </footer>
    </div>
  );
};

export default Topic8;