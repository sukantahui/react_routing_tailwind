import React from 'react';

export default class Topic0 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount() {
    // Trigger animation after component mounts
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 100);
  }

  render() {
    return (
      <>
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
            
            @keyframes pulseGlow {
              0%, 100% {
                box-shadow: 0 0 5px rgba(59, 130, 246, 0.1);
              }
              50% {
                box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
              }
            }
            
            @keyframes svgDraw {
              0% {
                stroke-dashoffset: 1000;
              }
              100% {
                stroke-dashoffset: 0;
              }
            }
            
            .animate-fade-slide-up {
              animation: fadeSlideUp 0.6s ease-out forwards;
            }
            
            .animate-pulse-glow {
              animation: pulseGlow 2s ease-in-out infinite;
            }
            
            .svg-draw {
              stroke-dasharray: 1000;
              animation: svgDraw 1.5s ease-out forwards;
            }
            
            /* Respect reduced motion */
            @media (prefers-reduced-motion: reduce) {
              .animate-fade-slide-up,
              .animate-pulse-glow,
              .svg-draw {
                animation: none !important;
                transition: none !important;
              }
            }
          `}
        </style>

        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-all duration-500 ${this.state.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
                Topic 1: Creating Files in Linux
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Master file creation techniques using touch, echo redirection, and text editors (nano, vi)
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">BEGINNER TO PRO</span>
                <div className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* Touch Command Card */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-100 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">touch Command</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-mono mb-3">
                    Prototype: touch [options] filename...
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">touch</code> command is primarily used to update file timestamps, but its most common use is creating empty files. When Swadeep started his project at Barrackpore school, he needed to create placeholder files for documentation before writing content.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Example:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Instead of opening each file, he used:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>touch README.md CHANGELOG.txt config.json</code>
                    </pre>
                  </div>
                </div>

                {/* SVG Illustration */}
                <div className="mb-6">
                  <svg width="100%" height="120" viewBox="0 0 400 120" className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="30" width="360" height="60" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="55" fill="#10b981" fontFamily="monospace" fontSize="14">
                      $ touch file1.txt file2.txt
                    </text>
                    
                    {/* Arrow */}
                    <line x1="200" y1="100" x2="200" y2="130" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" className="svg-draw" />
                    
                    {/* Files */}
                    <g transform="translate(150, 130)">
                      <rect width="40" height="50" rx="3" fill="#93c5fd" className="group-hover:fill-blue-400 transition-colors duration-300"/>
                      <text x="20" y="25" textAnchor="middle" fill="#1e40af" fontSize="10" fontFamily="sans-serif">file1.txt</text>
                    </g>
                    <g transform="translate(210, 130)">
                      <rect width="40" height="50" rx="3" fill="#93c5fd" className="group-hover:fill-blue-400 transition-colors duration-300"/>
                      <text x="20" y="25" textAnchor="middle" fill="#1e40af" fontSize="10" fontFamily="sans-serif">file2.txt</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Purpose:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Create empty files instantly</li>
                      <li>Update access/modification timestamps</li>
                      <li>Force file creation even if it exists</li>
                      <li>Trigger file watchers in development</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">When to Use:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Creating project structure templates</li>
                      <li>Log file placeholders for scripts</li>
                      <li>Testing file permissions</li>
                      <li>Initializing empty configuration files</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Echo Redirection Card */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-200 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-600 dark:text-green-300 font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Echo Redirection</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-mono mb-3">
                    Prototype: echo "content" {'>'} filename
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Using <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">echo</code> with redirection operators creates files with content in a single command. Tuhina at Shyamnagar college needed to quickly create a configuration file for her Python project.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Scenario:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      She used echo redirection to create a .env file:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{`echo "DATABASE_URL=postgresql://localhost/mydb" > .env`}</code>
                    </pre>
                  </div>
                </div>

                {/* SVG Illustration */}
                <div className="mb-6">
                  <svg width="100%" height="140" viewBox="0 0 400 140" className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ echo "Hello" > greeting.txt'}
                    </text>
                    
                    {/* Arrow */}
                    <line x1="200" y1="70" x2="200" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow2)" className="svg-draw" />
                    
                    {/* File with content */}
                    <g transform="translate(150, 100)">
                      <rect width="100" height="60" rx="3" fill="#86efac" className="group-hover:fill-green-400 transition-colors duration-300"/>
                      <text x="50" y="25" textAnchor="middle" fill="#065f46" fontSize="10" fontFamily="sans-serif">greeting.txt</text>
                      <text x="50" y="40" textAnchor="middle" fill="#065f46" fontSize="8" fontFamily="monospace">"Hello"</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Redirection Operators:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{'>'}</code> - Creates/overwrites file</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{'>>'}</code> - Appends to existing file</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">2{'>'}</code> - Redirects error output</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">&{'>'}</code> - Redirects both output and errors</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Professional Usage:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Quick script headers with shebang</li>
                      <li>Creating default configuration templates</li>
                      <li>Logging command outputs</li>
                      <li>Generating batch files for automation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Editors Overview */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-300 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-purple-600 dark:text-purple-300 font-bold">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Text Editors: Nano vs Vi</h2>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  After creating files, you need to edit them. Linux offers two primary text editors: <strong>Nano</strong> (beginner-friendly) and <strong>Vi/Vim</strong> (powerful but steep learning curve). Abhronila uses Nano for quick config edits at Ichapur lab, while Debangshu prefers Vi for remote server administration.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Nano Section */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-200 dark:bg-blue-800 rounded-md flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-blue-700 dark:text-blue-300 font-bold text-lg">N</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Nano Editor</h3>
                    </div>
                    
                    <div className="mb-4">
                      <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-mono mb-3">
                        Command: nano filename
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Beginner-friendly editor with on-screen shortcuts. Perfect for quick edits and those new to Linux.
                      </p>
                      
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Essential Shortcuts:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mr-3">
                            <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">Ctrl+O</span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Save file (Write Out)</span>
                        </div>
                        <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mr-3">
                            <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">Ctrl+X</span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Exit Nano</span>
                        </div>
                        <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mr-3">
                            <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">Ctrl+G</span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Open help menu</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <strong>Best for:</strong> Beginners, quick edits, and when you need on-screen guidance
                    </div>
                  </div>
                  
                  {/* Vi/Vim Section */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-orange-200 dark:bg-orange-800 rounded-md flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-orange-700 dark:text-orange-300 font-bold text-lg">V</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Vi Editor</h3>
                    </div>
                    
                    <div className="mb-4">
                      <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-mono mb-3">
                        Command: vi filename
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Powerful modal editor with steep learning curve. Industry standard for system administrators and developers.
                      </p>
                      
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Essential Commands:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg">
                          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded flex items-center justify-center mr-3">
                            <span className="text-orange-600 dark:text-orange-400 font-mono text-sm">i</span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Enter Insert mode</span>
                        </div>
                        <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg">
                          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded flex items-center justify-center mr-3">
                            <span className="text-orange-600 dark:text-orange-400 font-mono text-sm">Esc</span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Return to Command mode</span>
                        </div>
                        <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg">
                          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded flex items-center justify-center mr-3">
                            <span className="text-orange-600 dark:text-orange-400 font-mono text-sm">:wq</span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">Save and quit</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <strong>Best for:</strong> Power users, remote server work, and complex editing tasks
                    </div>
                  </div>
                </div>

                {/* Editor Comparison Table */}
                <div className="overflow-x-auto mb-6">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-lg">Comparison: Nano vs Vi</h4>
                  <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-4 py-3">Feature</th>
                        <th className="px-4 py-3">Nano</th>
                        <th className="px-4 py-3">Vi/Vim</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-medium">Learning Curve</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-3">
                              <div className="bg-green-600 h-2.5 rounded-full w-1/4"></div>
                            </div>
                            <span className="text-sm">Easy</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-3">
                              <div className="bg-red-600 h-2.5 rounded-full w-4/5"></div>
                            </div>
                            <span className="text-sm">Steep</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-medium">Speed</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            Moderate
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Very Fast
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-medium">Best For</td>
                        <td className="px-4 py-3">Quick edits, beginners</td>
                        <td className="px-4 py-3">Professional work, servers</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-400 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-red-200 dark:border-red-900">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-7 h-7 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Common Pitfalls</h2>
                    <p className="text-gray-600 dark:text-gray-400">Mistakes beginners often make and how to avoid them</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Overwriting Important Files
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Using <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-500">{'echo "new" > existing.txt'}</code> instead of <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-green-500">echo "new" >> existing.txt</code> can completely overwrite critical configuration files.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Always check if a file exists before using <code>{'>'}</code>, or use <code>{'>>'}</code> to append.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      Permission Issues
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Creating files in system directories like <code>/etc/</code> or <code>/var/</code> without proper permissions leads to "Permission denied" errors. Beginners often forget they need sudo privileges.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Use <code>sudo touch</code> for system files, or create files in your home directory first.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0 0h-1m1 0v4m-5-4h.01M11 12h2"/>
                      </svg>
                      Vi Editor Confusion
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Beginners often open Vi, type content, then get stuck because they're in command mode. They can't save or exit, leading to frustration and force-closing terminals.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Remember: press <code>i</code> to insert, <code>Esc</code> to return to command mode, then <code>:wq</code> to save and quit.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips & Tricks */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-500 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-emerald-200 dark:border-emerald-900">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Professional Tips & Tricks</h2>
                    <p className="text-gray-600 dark:text-gray-400">Industry habits and time-saving techniques</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Brace Expansion with Touch</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Create multiple files at once using brace expansion: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">touch file{`{1..10}.txt`}</code> creates file1.txt through file10.txt.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Always Verify with ls -la</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          After creating files, always run <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">ls -la</code> to verify file permissions, ownership, and timestamps.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Script Shebang Creation</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          For scripts, create the shebang and make it executable in one go: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">echo "#!/bin/bash" > script.sh && chmod +x script.sh</code>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Backup Before Overwriting</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Before editing important configs, create a backup: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">cp config.conf config.conf.backup</code>. This saves hours of troubleshooting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hint Section */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-600 mb-8">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-yellow-200 dark:border-yellow-900">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-7 h-7 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Critical Thinking Exercises</h2>
                    <p className="text-gray-600 dark:text-gray-400">Observe, analyze, and understand deeply</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">?</span>
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 italic mb-2">
                          "Think about this: What happens when you use <code>touch</code> on an existing file that already has content?"
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Check the file's modification timestamp using <code>ls -l</code> before and after.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">?</span>
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 italic mb-2">
                          "Observe carefully: How does <code>{'echo "text" > file'}</code> differ from <code>{'echo "text" >> file'}</code> in terms of file size and content?"
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Create a file, use both commands, then check with <code>cat file</code> and <code>wc -l file</code>.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">?</span>
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 italic mb-2">
                          "Try changing the permissions of a file after creation. What command would you use to make it readable by everyone but only writable by you?"
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Look into the <code>chmod</code> command and numeric permissions.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Section */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-700 mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Mini Checklist: What to Remember</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">1</span>
                    </div>
                    <span>touch updates timestamps & creates empty files</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">2</span>
                    </div>
                    <span>{'> overwrites, >> appends content'}</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">3</span>
                    </div>
                    <span>Nano: Ctrl+X to exit, Vi: :wq to save & quit</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">4</span>
                    </div>
                    <span>Always check permissions with ls -la</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">5</span>
                    </div>
                    <span>Use echo for quick content creation</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">6</span>
                    </div>
                    <span>Practice both Nano and Vi basics</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">7</span>
                    </div>
                    <span>Backup before editing important files</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">8</span>
                    </div>
                    <span>Use brace expansion for multiple files</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-800 mb-8">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 dark:border-blue-400 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Teacher's Note</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Remember that file creation is the foundation of all Linux work. Start with <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-blue-600 dark:text-blue-400">touch</code> for empty files and <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-green-600 dark:text-green-400">echo</code> for content. 
                      Practice creating files in your home directory first before working with system locations.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      When choosing an editor: use <strong>nano</strong> for quick edits and when you need on-screen guidance. Use <strong>vi</strong> when you need powerful editing capabilities, are working on remote servers, or want to develop professional Linux skills.
                    </p>
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-blue-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong className="text-blue-600 dark:text-blue-400">Pro Tip from Experience:</strong> Always create a backup before overwriting configuration files. Use <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">cp config.conf config.conf.backup</code> first! This simple habit has saved countless hours of troubleshooting for students in Naihati and Barrackpore labs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-900">
              <div className="text-center py-8">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <span className="mr-3 font-semibold">Next Topic: Creating Directories (mkdir)</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                  You've mastered file creation. Next, learn how to organize files into directories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

