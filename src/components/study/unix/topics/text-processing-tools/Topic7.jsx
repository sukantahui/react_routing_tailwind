import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic7 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-6 md:p-8">
      <style>
        {`
          @keyframes slideUpFade {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulseSubtle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          .animate-slide-up-fade {
            animation: slideUpFade 0.6s ease-out forwards;
          }
          
          .animate-pulse-subtle {
            animation: pulseSubtle 2s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12" 
              style={isReducedMotion ? {} : { animation: 'slideUpFade 0.6s ease-out forwards' }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 w-12 bg-cyan-400 rounded-full"></div>
          <span className="text-sm font-medium text-cyan-300 uppercase tracking-wider">
            Advanced Text Processing
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Deleting, Inserting & Appending Lines with sed
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          Master sed's powerful line manipulation capabilities for surgical text editing
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* Conceptual Explanation */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-cyan-500 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
              Core Concepts & Theory
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 
                           hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300
                           ${!isReducedMotion && 'animate-slide-up-fade'}`}
                 style={!isReducedMotion ? { animationDelay: '100ms' } : {}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-cyan-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-cyan-300">What are These Operations?</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                sed provides three fundamental line manipulation operations that work like a text editor's 
                edit menu: <span className="text-cyan-400 font-medium">delete</span> removes lines, 
                <span className="text-cyan-400 font-medium"> insert</span> adds lines before a position, and 
                <span className="text-cyan-400 font-medium"> append</span> adds lines after a position.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Unlike simple pattern deletion, these commands understand line positions and work 
                within sed's <span className="text-amber-300">pattern space</span> and 
                <span className="text-amber-300"> hold space</span> buffers.
              </p>
            </div>

            <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 
                           hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300
                           ${!isReducedMotion && 'animate-slide-up-fade'}`}
                 style={!isReducedMotion ? { animationDelay: '200ms' } : {}}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-blue-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-300">How They Differ</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-red-400 rounded-full mt-2"></div>
                  <span><strong className="text-red-400">Delete (d):</strong> Removes lines from output completely</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-green-400">Insert (i):</strong> Adds text BEFORE specified line</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span><strong className="text-yellow-400">Append (a):</strong> Adds text AFTER specified line</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prototype & Signature */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-green-500 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
              Command Prototypes & Signatures
            </h2>
          </div>

          <div className="bg-gray-900/70 rounded-xl p-6 border border-gray-700/50">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group hover:bg-gray-800/50 p-4 rounded-lg transition-all duration-300">
                <div className="text-sm font-medium text-green-400 mb-2">Delete Command</div>
                <code className="text-lg font-mono bg-gray-800 px-4 py-2 rounded block text-gray-200 group-hover:text-green-300 transition-colors">
                  sed '[address]d' file
                </code>
                <p className="text-sm text-gray-400 mt-2">Returns: Modified stream (without deleted lines)</p>
              </div>
              
              <div className="group hover:bg-gray-800/50 p-4 rounded-lg transition-all duration-300">
                <div className="text-sm font-medium text-blue-400 mb-2">Insert Command</div>
                <code className="text-lg font-mono bg-gray-800 px-4 py-2 rounded block text-gray-200 group-hover:text-blue-300 transition-colors">
                  sed '[address]i\text'
                </code>
                <p className="text-sm text-gray-400 mt-2">Returns: Stream with text inserted before line</p>
              </div>
              
              <div className="group hover:bg-gray-800/50 p-4 rounded-lg transition-all duration-300">
                <div className="text-sm font-medium text-amber-400 mb-2">Append Command</div>
                <code className="text-lg font-mono bg-gray-800 px-4 py-2 rounded block text-gray-200 group-hover:text-amber-300 transition-colors">
                  sed '[address]a\text'
                </code>
                <p className="text-sm text-gray-400 mt-2">Returns: Stream with text appended after line</p>
              </div>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Visualizing sed Line Operations
          </h3>
          
          <div className="relative h-64 bg-gray-900/50 rounded-xl p-4 overflow-hidden">
            {/* Original Lines */}
            <div className="absolute top-8 left-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 rounded-full bg-gray-600"></div>
                <span className="text-sm text-gray-400">Original File</span>
              </div>
              <div className="space-y-1">
                {['Line 1: Config', 'Line 2: Settings', 'Line 3: Options', 'Line 4: End'].map((text, i) => (
                  <div key={i} className="px-3 py-1 bg-gray-800 rounded text-sm text-gray-300 w-48">
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <svg className="absolute top-1/2 left-1/3 w-64 h-32" viewBox="0 0 200 100">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                       refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#22d3ee" />
                </marker>
              </defs>
              <path d="M0,50 Q50,50 100,30" stroke="#22d3ee" strokeWidth="2" 
                   fill="none" markerEnd="url(#arrowhead)" 
                   className={!isReducedMotion ? 'animate-pulse-subtle' : ''}>
                {!isReducedMotion && (
                  <animate attributeName="stroke-dashoffset" from="200" to="0" 
                          dur="2s" repeatCount="indefinite" />
                )}
              </path>
            </svg>

            {/* After Operations */}
            <div className="absolute top-8 right-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 rounded-full bg-green-600"></div>
                <span className="text-sm text-gray-400">After sed Operations</span>
              </div>
              <div className="space-y-1">
                <div className="px-3 py-1 bg-gray-800 rounded text-sm text-green-300 w-48">
                  Line 1: Config
                </div>
                <div className="px-3 py-1 bg-blue-900/30 rounded text-sm text-blue-300 w-48 border border-blue-500/30">
                  INSERTED: Header
                </div>
                <div className="px-3 py-1 bg-gray-800 rounded text-sm text-gray-300 w-48">
                  Line 2: Settings
                </div>
                <div className="px-3 py-1 bg-amber-900/30 rounded text-sm text-amber-300 w-48 border border-amber-500/30">
                  APPENDED: Comment
                </div>
                <div className="px-3 py-1 bg-gray-800 rounded text-sm text-gray-300 w-48">
                  Line 4: End
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
              Real-World Usage Examples
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className={`bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 
                            transition-all duration-300 group ${!isReducedMotion && 'animate-slide-up-fade'}`}
                   style={!isReducedMotion ? { animationDelay: '300ms' } : {}}>
                <h4 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  Config File Management
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Delete blank lines from nginx config:</p>
                    <code className="block font-mono text-sm bg-gray-900 p-3 rounded text-green-400">
                      sed '/^$/d' nginx.conf
                    </code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Insert maintenance header after line 5:</p>
                    <code className="block font-mono text-sm bg-gray-900 p-3 rounded text-blue-400">
                      sed '5i\# MAINTENANCE MODE' app.conf
                    </code>
                  </div>
                </div>
              </div>

              <div className={`bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/30 
                            transition-all duration-300 group ${!isReducedMotion && 'animate-slide-up-fade'}`}
                   style={!isReducedMotion ? { animationDelay: '400ms' } : {}}>
                <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                  Student Records Processing
                </h4>
                <p className="text-gray-300 mb-3">
                  When Roshni at CNAT Barrackpore needed to update student records:
                </p>
                <code className="block font-mono text-sm bg-gray-900 p-3 rounded text-amber-400">
                  sed '/Swadeep/a\Subjects: Math,Physics' students.txt
                </code>
                <p className="text-gray-300 mt-3 text-sm">
                  This appended subject info after Swadeep's record.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 hover:border-green-500/30 
                            transition-all duration-300 group ${!isReducedMotion && 'animate-slide-up-fade'}`}
                   style={!isReducedMotion ? { animationDelay: '500ms' } : {}}>
                <h4 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Log File Processing
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Delete debug lines from Apache logs:</p>
                    <code className="block font-mono text-sm bg-gray-900 p-3 rounded text-red-400">
                      sed '/DEBUG/d' access.log
                    </code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Insert timestamp marker before errors:</p>
                    <code className="block font-mono text-sm bg-gray-900 p-3 rounded text-yellow-400">
                      sed '/ERROR/i\--- ERROR BOUNDARY ---' error.log
                    </code>
                  </div>
                </div>
              </div>

              <div className={`bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 hover:border-amber-500/30 
                            transition-all duration-300 group ${!isReducedMotion && 'animate-slide-up-fade'}`}
                   style={!isReducedMotion ? { animationDelay: '600ms' } : {}}>
                <h4 className="text-lg font-semibold text-amber-300 mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  CSV/Data File Manipulation
                </h4>
                <code className="block font-mono text-sm bg-gray-900 p-3 rounded text-purple-400 mb-3">
                  sed '1i\ID,Name,Score,Grade' marks.csv
                </code>
                <p className="text-gray-300 text-sm">
                  When Abhronila needed to add headers to export files from CNAT Shyamnagar lab.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-red-500 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
              Common Pitfalls & Mistakes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Wrong Backslash Usage",
                description: "Forgetting the backslash after i/a commands: sed '5i text' (wrong) vs sed '5i\\text' (right)",
                example: "Debangshu struggled with syntax until realizing the backslash is mandatory",
                color: "red"
              },
              {
                title: "Address Range Confusion",
                description: "Using sed '1,3d' deletes lines 1-3, not just lines 1 and 3",
                example: "Common mistake at CNAT Naihati lab when cleaning configs",
                color: "orange"
              },
              {
                title: "In-Place Editing Trap",
                description: "Forgetting -i.bak flag can lead to data loss. Always backup first!",
                example: "Ritaja learned this hard way when modifying student records",
                color: "yellow"
              },
              {
                title: "Multi-line Insert Issues",
                description: "Inserting multi-line text requires \\n escapes: sed '1i\\line1\\nline2'",
                example: "Formatting issues in report generation scripts",
                color: "purple"
              }
            ].map((pitfall, index) => (
              <div key={index} 
                   className={`bg-gray-800/40 rounded-xl p-5 border border-${pitfall.color}-500/20 
                             hover:border-${pitfall.color}-500/40 transition-all duration-300
                             ${!isReducedMotion && 'animate-slide-up-fade'}`}
                   style={!isReducedMotion ? { animationDelay: `${700 + index * 100}ms` } : {}}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-8 w-8 rounded-lg bg-${pitfall.color}-900/30 flex items-center justify-center`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h4 className={`text-lg font-semibold text-${pitfall.color}-300`}>
                    {pitfall.title}
                  </h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">{pitfall.description}</p>
                <p className="text-gray-400 text-xs italic">{pitfall.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-green-500 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
              Best Practices & Professional Habits
            </h2>
          </div>

          <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 hover:bg-gray-700/30 rounded-lg transition-colors duration-200">
                  <div className="h-6 w-6 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400 text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-300 mb-1">Always Backup First</h4>
                    <p className="text-gray-300 text-sm">
                      Use sed -i.bak or redirect output to new file before in-place editing
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-700/30 rounded-lg transition-colors duration-200">
                  <div className="h-6 w-6 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-1">Test with cat First</h4>
                    <p className="text-gray-300 text-sm">
                      Pipe through cat -n to see line numbers: cat -n file | sed '...'
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 hover:bg-gray-700/30 rounded-lg transition-colors duration-200">
                  <div className="h-6 w-6 rounded-full bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-400 text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-1">Use Address Ranges Wisely</h4>
                    <p className="text-gray-300 text-sm">
                      Combine with patterns: sed '/start/,/end/d' for block operations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-700/30 rounded-lg transition-colors duration-200">
                  <div className="h-6 w-6 rounded-full bg-amber-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-400 text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-300 mb-1">Comment Your sed Scripts</h4>
                    <p className="text-gray-300 text-sm">
                      For complex operations, create .sed script files with comments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className={`bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-2xl p-6 
                          border border-gray-600/30 ${!isReducedMotion && 'animate-slide-up-fade'}`}
                 style={!isReducedMotion ? { animationDelay: '1100ms' } : {}}>
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-cyan-300">Think About...</h3>
          </div>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              How would you insert different text based on whether a line contains "ERROR" vs "WARNING"?
            </p>
            <p className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              What happens when you try to append after the last line of a file?
            </p>
            <p className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              Try using both line numbers AND patterns together: sed '/pattern/,+2d'
            </p>
            <p className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              Observe carefully the difference between 'i' and 'a' when used with address ranges
            </p>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={`bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 
                          ${!isReducedMotion && 'animate-slide-up-fade'}`}
                 style={!isReducedMotion ? { animationDelay: '1200ms' } : {}}>
          <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            What You Should Remember
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "d deletes, i inserts before, a appends after",
              "Backslash (\\text) is mandatory for i/a commands",
              "Address can be line number, pattern, or range",
              "Use -i.bak for safe in-place editing",
              "Test with cat first, especially with line numbers",
              "Multi-line inserts need \\n escapes",
              "sed processes line by line in pattern space"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
                <div className="h-5 w-5 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher's Note */}
        <section className={`bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-6 
                          border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300
                          ${!isReducedMotion && 'animate-slide-up-fade'}`}
                 style={!isReducedMotion ? { animationDelay: '1300ms' } : {}}>
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">SH</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-cyan-300">Teacher's Note</h3>
                <span className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">
                  Sukanta Hui • {new Date().getFullYear() - 1998} years experience
                </span>
              </div>
              <p className="text-gray-300 mb-3 leading-relaxed">
                sed's line operations are surgical tools for text editing. Remember they work in 
                <span className="text-amber-300 font-medium"> pattern space</span> - sed reads one line at a time, 
                applies all commands to it, then outputs. This is why 'i' and 'a' commands need special handling.
              </p>
              <div className="text-sm text-gray-400 space-y-2">
                <p>
                  <span className="text-cyan-400 font-medium">Pro Tip:</span> Combine with other commands: 
                  <code className="mx-2 px-2 py-1 bg-gray-800/50 rounded text-cyan-300">sed '5d; 10i\Header'</code>
                  does multiple operations in one pass.
                </p>
                <p>
                  <span className="text-green-400 font-medium">Remember:</span> In production scripts, always 
                  use <code className="mx-1 px-1 bg-gray-800/50 rounded">set -e</code> and error checking when 
                  piping sed operations.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-cyan-500/20">
                <p className="text-xs text-gray-400">
                  Contact: sukantahui@codernaccotax.co.in • Mobile: 7003756860<br />
                  Skills: Programming Language, RDBMs, Operating System, Web Development
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={`bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 
                          ${!isReducedMotion && 'animate-slide-up-fade'}`}
                 style={!isReducedMotion ? { animationDelay: '1400ms' } : {}}>
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-xl font-semibold text-amber-300">Professional Tips & Tricks</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="group p-4 hover:bg-gray-700/30 rounded-lg transition-all duration-300">
                <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Multi-Command Efficiency
                </h4>
                <p className="text-gray-300 text-sm">
                  Chain operations: <code className="text-cyan-300">sed -e '1d' -e '5i\header' -e '$a\footer'</code><br />
                  This deletes line 1, inserts at 5, appends at end in single pass.
                </p>
              </div>

              <div className="group p-4 hover:bg-gray-700/30 rounded-lg transition-all duration-300">
                <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Safe Editing Pattern
                </h4>
                <p className="text-gray-300 text-sm">
                  Always follow: Test → Backup → Execute → Verify<br />
                  <code className="text-green-300">sed '...' file > newfile && mv file file.bak && mv newfile file</code>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="group p-4 hover:bg-gray-700/30 rounded-lg transition-all duration-300">
                <h4 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Debugging Complex sed
                </h4>
                <p className="text-gray-300 text-sm">
                  Use <code className="text-amber-300">sed --debug</code> or add <code className="text-amber-300">l</code> command 
                  to see pattern space: <code className="text-amber-300">sed '5i\test\nl' file</code>
                </p>
              </div>

              <div className="group p-4 hover:bg-gray-700/30 rounded-lg transition-all duration-300">
                <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                  </svg>
                  Performance with Large Files
                </h4>
                <p className="text-gray-300 text-sm">
                  For GB-sized files, avoid multiple sed calls. Combine operations and use 
                  <code className="text-red-300"> LANG=C</code> for ASCII-only files (2-3x faster).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-800">
        <div className="text-center text-gray-500 text-sm">
          <p>Topic 24: Deleting, Inserting & Appending Lines with sed • Part of Advanced Text Processing Series</p>
          <p className="mt-2">Next: Using sed with files vs streams • Practice with: sed '1,3d; 5i\New Header; $a\EOF'</p>
        </div>
      </footer>
    </div>
  );
};

export default Topic7;