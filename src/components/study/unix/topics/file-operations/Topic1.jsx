import React from 'react';

class Topic1 extends React.Component {
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
            
            @keyframes folderBounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-5px);
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
            
            .folder-bounce {
              animation: folderBounce 1s ease-in-out infinite;
            }
            
            /* Respect reduced motion */
            @media (prefers-reduced-motion: reduce) {
              .animate-fade-slide-up,
              .animate-pulse-glow,
              .svg-draw,
              .folder-bounce {
                animation: none !important;
                transition: none !important;
              }
            }
          `}
        </style>

        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-all duration-500 ${this.state.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
                Topic 2: Creating Directories in Linux
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Master directory creation using mkdir, create nested structures with mkdir -p, and organize files efficiently
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex-1 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">FOLDER ORGANIZATION</span>
                <div className="flex-1 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Basic mkdir Command */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-100 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-600 dark:text-green-300 font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Basic mkdir Command</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-mono mb-3">
                    Prototype: mkdir [options] directory_name...
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">mkdir</code> (make directory) command creates one or more directories. It's essential for organizing files into logical groups. When Abhronila started organizing her project at Ichapur college, she needed separate folders for code, documentation, and data.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Example:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      She created a structured project layout with:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>mkdir src docs data tests</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      This created four separate directories for source code, documentation, data files, and test cases.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Basic mkdir */}
                <div className="mb-6">
                  <svg width="100%" height="180" viewBox="0 0 400 180" className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-mkdir" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      $ mkdir src docs data tests
                    </text>
                    
                    {/* Arrow */}
                    <line x1="200" y1="70" x2="200" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-mkdir)" className="svg-draw" />
                    
                    {/* Folders */}
                    <g transform="translate(100, 100)" className="folder-bounce">
                      <rect width="50" height="35" rx="3" fill="#86efac"/>
                      <rect x="5" y="35" width="40" height="20" rx="2" fill="#86efac"/>
                      <text x="25" y="25" textAnchor="middle" fill="#065f46" fontSize="10" fontFamily="sans-serif">src</text>
                    </g>
                    
                    <g transform="translate(160, 100)">
                      <rect width="50" height="35" rx="3" fill="#86efac"/>
                      <rect x="5" y="35" width="40" height="20" rx="2" fill="#86efac"/>
                      <text x="25" y="25" textAnchor="middle" fill="#065f46" fontSize="10" fontFamily="sans-serif">docs</text>
                    </g>
                    
                    <g transform="translate(220, 100)">
                      <rect width="50" height="35" rx="3" fill="#86efac"/>
                      <rect x="5" y="35" width="40" height="20" rx="2" fill="#86efac"/>
                      <text x="25" y="25" textAnchor="middle" fill="#065f46" fontSize="10" fontFamily="sans-serif">data</text>
                    </g>
                    
                    <g transform="translate(280, 100)">
                      <rect width="50" height="35" rx="3" fill="#86efac"/>
                      <rect x="5" y="35" width="40" height="20" rx="2" fill="#86efac"/>
                      <text x="25" y="25" textAnchor="middle" fill="#065f46" fontSize="10" fontFamily="sans-serif">tests</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Purpose & Usage:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Create single or multiple directories at once</li>
                      <li>Organize files into logical groups</li>
                      <li>Set up project structures</li>
                      <li>Create temporary working directories</li>
                      <li>Establish backup directory hierarchies</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Options:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-v</code> - Verbose mode (shows each directory created)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-m</code> - Set permissions during creation</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--help</code> - Display help information</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--version</code> - Show version information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* mkdir -p for Nested Directories */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-200 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">mkdir -p (Nested Directories)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-mono mb-3">
                    Prototype: mkdir -p path/to/nested/directories
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-p</code> flag stands for "parents" and creates all directories in the specified path, including any missing parent directories. This is incredibly useful when setting up complex directory structures. When Swadeep organized his research project in Barrackpore, he needed a multi-level directory structure.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Scenario:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      He created a complete research project structure with one command:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'mkdir -p research/{data/{raw,processed},analysis/{scripts,results},docs/{proposal,report}}'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      This single command created 8 directories organized in a logical hierarchy for his research workflow.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Nested Directories */}
                <div className="mb-6">
                  <svg width="100%" height="250" viewBox="0 0 400 250" className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-nested" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                     {'$ mkdir -p project/{src,docs,data}'}
                    </text>
                    
                    {/* Arrow */}
                    <line x1="200" y1="70" x2="200" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-nested)" className="svg-draw" />
                    
                    {/* Main Project Folder */}
                    <g transform="translate(150, 100)" className="folder-bounce">
                      <rect width="100" height="45" rx="5" fill="#93c5fd"/>
                      <rect x="10" y="45" width="80" height="25" rx="3" fill="#93c5fd"/>
                      <text x="50" y="30" textAnchor="middle" fill="#1e40af" fontSize="12" fontFamily="sans-serif" fontWeight="bold">project</text>
                    </g>
                    
                    {/* Nested Folders */}
                    <g transform="translate(80, 160)">
                      <rect width="60" height="35" rx="3" fill="#93c5fd"/>
                      <rect x="5" y="35" width="50" height="20" rx="2" fill="#93c5fd"/>
                      <text x="30" y="25" textAnchor="middle" fill="#1e40af" fontSize="10" fontFamily="sans-serif">src</text>
                      <line x1="30" y1="55" x2="30" y2="70" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
                    </g>
                    
                    <g transform="translate(170, 160)">
                      <rect width="60" height="35" rx="3" fill="#93c5fd"/>
                      <rect x="5" y="35" width="50" height="20" rx="2" fill="#93c5fd"/>
                      <text x="30" y="25" textAnchor="middle" fill="#1e40af" fontSize="10" fontFamily="sans-serif">docs</text>
                      <line x1="30" y1="55" x2="30" y2="70" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
                    </g>
                    
                    <g transform="translate(260, 160)">
                      <rect width="60" height="35" rx="3" fill="#93c5fd"/>
                      <rect x="5" y="35" width="50" height="20" rx="2" fill="#93c5fd"/>
                      <text x="30" y="25" textAnchor="middle" fill="#1e40af" fontSize="10" fontFamily="sans-serif">data</text>
                      <line x1="30" y1="55" x2="30" y2="70" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3"/>
                    </g>
                    
                    {/* Connection Lines */}
                    <line x1="200" y1="145" x2="110" y2="160" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" className="svg-draw"/>
                    <line x1="200" y1="145" x2="200" y2="160" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" className="svg-draw"/>
                    <line x1="200" y1="145" x2="290" y2="160" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" className="svg-draw"/>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Why -p is Essential:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Creates parent directories automatically</li>
                      <li>No errors if directories already exist</li>
                      <li>Saves time with complex structures</li>
                      <li>Essential for scripts and automation</li>
                      <li>Prevents "No such file or directory" errors</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Common Use Cases:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Setting up web application structures</li>
                      <li>Creating log directory hierarchies</li>
                      <li>Organizing academic research projects</li>
                      <li>Building CI/CD pipeline directories</li>
                      <li>Creating backup directory trees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Directory Creation Techniques */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-300 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-purple-600 dark:text-purple-300 font-bold">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Advanced Techniques & Patterns</h2>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Professional Linux users combine <code>mkdir</code> with other commands and techniques for maximum efficiency. Tuhina at Shyamnagar tech institute uses these patterns daily for her development work.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Brace Expansion Pattern */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-200 dark:bg-purple-800 rounded-md flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-purple-700 dark:text-purple-300 font-bold text-lg">{`{}`}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Brace Expansion</h3>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Create multiple directories with similar names using brace expansion patterns.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Number Ranges:</h4>
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'mkdir backup_{2020..2023}_month_{01..12}'}</code>
                          </pre>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Creates 48 directories for years 2020-2023, months 01-12
                          </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Letter Ranges:</h4>
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'mkdir section_{a..d}'}</code>
                          </pre>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Creates section_a, section_b, section_c, section_d
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <strong>Perfect for:</strong> Creating batch directories for reports, logs, or organized data
                    </div>
                  </div>
                  
                  {/* Combined with Other Commands */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-amber-200 dark:bg-amber-800 rounded-md flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-amber-700 dark:text-amber-300 font-bold text-lg">+</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Command Combinations</h3>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Combine mkdir with other commands using operators for powerful workflows.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Create & Enter:</h4>
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>mkdir new_project && cd new_project</code>
                          </pre>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Creates directory and immediately enters it
                          </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Create & Set Permissions:</h4>
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>mkdir -m 755 public_dir</code>
                          </pre>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Creates directory with read/write/execute for owner, read/execute for others
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <strong>Perfect for:</strong> Automation scripts and deployment workflows
                    </div>
                  </div>
                </div>
                
                {/* Real-world Project Structure */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-lg">Complete Web Project Structure:</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Debangshu creates a complete web application structure with one command:
                    </p>
                    <pre className="p-4 bg-gray-800 text-green-300 rounded-lg overflow-x-auto text-sm">
                      <code>{'mkdir -p myapp/{public/{css,js,images},src/{components,pages,utils},tests/{unit,integration},docs/{api,user-guide},logs/{access,error}}'}</code>
                    </pre>
                    <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400">
                        This creates 12 directories organized for a professional web application, including:
                      </p>
                      <ul className="list-disc pl-5 text-sm text-gray-400 mt-2 space-y-1">
                        <li><code>public/css/</code>, <code>public/js/</code>, <code>public/images/</code> for static assets</li>
                        <li><code>src/components/</code>, <code>src/pages/</code> for source code</li>
                        <li><code>tests/unit/</code>, <code>tests/integration/</code> for testing</li>
                        <li><code>logs/access/</code>, <code>logs/error/</code> for log management</li>
                      </ul>
                    </div>
                  </div>
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
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Common Pitfalls with mkdir</h2>
                    <p className="text-gray-600 dark:text-gray-400">Avoid these common mistakes when creating directories</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Spaces in Directory Names
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Creating directories with spaces like <code>mkdir my documents</code> creates TWO directories: "my" and "documents". Beginners often don't realize this.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Use quotes: <code>mkdir "my documents"</code> or escape spaces: <code>mkdir my\ documents</code>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      Permission Errors Without -p
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Trying <code>mkdir a/b/c</code> without -p when "a" doesn't exist gives "No such file or directory" error. Beginners waste time creating each level manually.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Always use <code>mkdir -p</code> for nested structures to avoid this error.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0 0h-1m1 0v4m-5-4h.01M11 12h2"/>
                      </svg>
                      Directory Already Exists
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Running <code>mkdir existing_dir</code> when directory already exists gives "File exists" error, stopping scripts or causing confusion.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Use <code>mkdir -p</code> which won't error if directory exists, or check first with <code>{'if [ ! -d "dirname" ]; then mkdir dirname; fi'}</code>
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
                    <p className="text-gray-600 dark:text-gray-400">Industry habits for efficient directory management</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Use Verbose Mode for Scripts</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Add <code>-v</code> flag in scripts: <code>mkdir -pv dir1/dir2/dir3</code> shows each directory created, making debugging easier.
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
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Set Correct Permissions Initially</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Use <code>-m</code> flag: <code>mkdir -m 750 private_dir</code> sets permissions during creation instead of using chmod separately.
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
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Create Standard Project Template</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Save a standard project structure command: <code>{'alias mkproj=\'mkdir -p {src,docs,tests,data,logs}\''}</code> for instant project setup.
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
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Combine with Tree Command</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          After creating directories, use <code>tree</code> command to visualize structure: <code>{'mkdir -p a/{b,c/{d,e}} && tree a'}</code>
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
                          "Think about this: What happens when you try <code>mkdir dir1/dir2/dir3</code> without the -p flag, and dir1 doesn't exist?"
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Try it and observe the error message. What does it tell you about how mkdir works?
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
                          "Observe carefully: How many directories does <code>mkdir a b c</code> create versus <code>{'mkdir {a,b,c}'}</code>? Are they different?"
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Try both commands, then use <code>ls -la</code> to see the results. What's the practical difference?
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
                          "Try creating a directory with special characters: <code>mkdir "my dir (v2.0)"</code>. How does the shell handle spaces and parentheses?"
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Create the directory, then try to navigate into it. What happens if you forget the quotes?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Section */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-700 mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Mini Checklist: What to Remember</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <span><code>mkdir dirname</code> creates single directory</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <span><code>mkdir -p</code> creates nested directories (parents)</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <span>Use quotes for directories with spaces</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">4</span>
                    </div>
                    <span><code>{'mkdir {a,b,c}'}</code> creates multiple directories</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">5</span>
                    </div>
                    <span><code>-v</code> flag shows verbose output</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">6</span>
                    </div>
                    <span><code>-m</code> sets permissions during creation</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">7</span>
                    </div>
                    <span>Combine with <code>&&</code> for workflows</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">8</span>
                    </div>
                    <span>Always organize before adding files</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-800 mb-8">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-2xl shadow-lg p-6 border-l-4 border-green-500 dark:border-green-400 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Teacher's Note</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Directory organization is the foundation of efficient file management. Always plan your directory structure <strong>before</strong> you start creating files. A well-organized directory hierarchy saves countless hours of searching and reorganizing later.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Remember: <code className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-green-600 dark:text-green-400">mkdir -p</code> is your best friend for nested structures. It prevents errors and saves time. Always use it when creating directory paths that don't exist yet.
                    </p>
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-green-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong className="text-green-600 dark:text-green-400">Pro Tip from Experience:</strong> Create a standard project template alias in your <code>.bashrc</code> or <code>.zshrc</code>: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{'alias mkweb=\'mkdir -p {public/{css,js,img},src/{components,pages,utils},tests,docs,logs}\''}</code>. This single command sets up a complete web project structure instantly!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-900">
              <div className="text-center py-8">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <span className="mr-3 font-semibold">Next Topic: Copying Files and Folders</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                  Now that you can create directories, learn how to copy files and folders between them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Topic1;