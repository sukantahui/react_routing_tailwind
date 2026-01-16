import React from 'react';

class Topic5 extends React.Component {
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
            
            @keyframes overwriteWarning {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
            }
            
            @keyframes checkmarkAppear {
              0% {
                opacity: 0;
                transform: scale(0);
              }
              100% {
                opacity: 1;
                transform: scale(1);
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
            
            .overwrite-warning {
              animation: overwriteWarning 1s ease-in-out infinite;
            }
            
            .checkmark-appear {
              animation: checkmarkAppear 0.5s ease-out forwards;
            }
            
            /* Respect reduced motion */
            @media (prefers-reduced-motion: reduce) {
              .animate-fade-slide-up,
              .animate-pulse-glow,
              .svg-draw,
              .overwrite-warning,
              .checkmark-appear {
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
                Topic 6: File Overwrite Behavior and Safety Prompts
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Understand how Linux handles file overwrites and master interactive prompts (-i, -v, -n)
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">FILE SAFETY</span>
                <div className="flex-1 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
              </div>
              
              {/* Important Note Banner */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 dark:border-blue-400">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0 0h-1m1 0v4m-5-4h.01M11 12h2"/>
                    </svg>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Key Concept</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Linux commands <strong>silently overwrite</strong> files by default. Understanding overwrite behavior is crucial for data safety.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Default Overwrite Behavior */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-100 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Default Overwrite Behavior</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-mono mb-3">
                    {'Silent and Dangerous by Default'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Most Linux file manipulation commands (<code>cp</code>, <code>mv</code>, <code>rm</code>) <strong>silently overwrite</strong> existing files without warning. This is the #1 cause of accidental data loss. When Abhronila used <code>cp new_data.txt data.txt</code> at Ichapur lab, she didn't realize it would permanently replace her existing data file.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">The Silent Overwrite Problem:</h3>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'$ echo "new content" > existing_file.txt'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      No warning, no confirmation. The original content of <code>existing_file.txt</code> is gone forever.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Silent Overwrite */}
                <div className="mb-6">
                  <svg width="100%" height="220" viewBox="0 0 400 220" className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-overwrite" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ cp new.txt existing.txt'}
                    </text>
                    
                    {/* Original File */}
                    <g transform="translate(50, 90)">
                      <rect width="100" height="50" rx="3" fill="#93c5fd"/>
                      <text x="50" y="20" textAnchor="middle" fill="#1e40af" fontSize="10" fontFamily="sans-serif">existing.txt</text>
                      <text x="50" y="35" textAnchor="middle" fill="#1e40af" fontSize="8" fontFamily="monospace">Original: "Important Data"</text>
                    </g>
                    
                    {/* New File */}
                    <g transform="translate(50, 150)">
                      <rect width="100" height="50" rx="3" fill="#60a5fa"/>
                      <text x="50" y="20" textAnchor="middle" fill="#1e40af" fontSize="10" fontFamily="sans-serif">new.txt</text>
                      <text x="50" y="35" textAnchor="middle" fill="#1e40af" fontSize="8" fontFamily="monospace">New: "Replacement Data"</text>
                    </g>
                    
                    {/* Silent Overwrite Arrow */}
                    <g transform="translate(180, 105)">
                      <line x1="0" y1="0" x2="40" y2="0" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-overwrite)" className="svg-draw" />
                      <text x="20" y="-5" textAnchor="middle" fill="#3b82f6" fontSize="8" fontFamily="sans-serif">silent overwrite</text>
                    </g>
                    
                    {/* Result */}
                    <g transform="translate(250, 90)">
                      <rect width="100" height="50" rx="3" fill="#93c5fd"/>
                      <rect x="5" y="5" width="90" height="40" rx="2" fill="#60a5fa" opacity="0.7"/>
                      <text x="50" y="20" textAnchor="middle" fill="#1e40af" fontSize="10" fontFamily="sans-serif">existing.txt</text>
                      <text x="50" y="35" textAnchor="middle" fill="#1e40af" fontSize="8" fontFamily="monospace">Now: "Replacement Data"</text>
                      
                      {/* Warning Symbol */}
                      <g transform="translate(90, 5)" className="overwrite-warning">
                        <circle cx="0" cy="0" r="6" fill="#ef4444"/>
                        <text x="0" y="2" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif" fontWeight="bold">!</text>
                      </g>
                    </g>
                    
                    {/* Loss Indicator */}
                    <g transform="translate(250, 150)">
                      <rect width="100" height="30" rx="3" fill="#fecaca"/>
                      <text x="50" y="20" textAnchor="middle" fill="#dc2626" fontSize="9" fontFamily="sans-serif">Original Data Lost Forever</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Commands That Overwrite Silently:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code>cp source destination</code> - If destination exists</li>
                      <li><code>mv source destination</code> - If destination exists</li>
                      <li><code>echo "text" > file</code> - Redirect overwrites</li>
                      <li><code>cat file1 > file2</code> - Output redirection</li>
                      <li><code>dd if=source of=dest</code> - Block copying</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Why This Behavior Exists:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Historical reasons from early Unix</li>
                      <li>Scripting convenience (no interruptions)</li>
                      <li>Power user expectation of control</li>
                      <li>Performance (no extra checks)</li>
                      <li>Philosophy: "Users know what they're doing"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* -i: Interactive Mode */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-200 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-600 dark:text-green-300 font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">-i: Interactive Mode (Your Safety Net)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-mono mb-3">
                    {'Prototype: command -i file...'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-i</code> flag enables interactive mode, prompting before every overwrite or deletion. This simple flag has prevented countless data disasters. When Swadeep set <code>{'alias cp="cp -i"'}</code> at Barrackpore school, it saved his project multiple times.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Interactive Protection in Action:</h3>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'$ cp -i new_data.txt important_data.txt'}</code>
                    </pre>
                    <pre className="mt-2 p-3 bg-gray-800 text-yellow-300 rounded-lg overflow-x-auto">
                      <code>{'cp: overwrite \'important_data.txt\'? '}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      You must type 'y' or 'yes' to proceed. Typing anything else (or just pressing Enter) cancels the operation.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Interactive Prompt */}
                <div className="mb-6">
                  <svg width="100%" height="250" viewBox="0 0 400 250" className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-interactive" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                      </marker>
                    </defs>
                    
                    {/* Terminal with Interactive Prompt */}
                    <rect x="20" y="20" width="360" height="80" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ cp -i backup.txt original.txt'}
                    </text>
                    
                    <text x="40" y="70" fill="#fbbf24" fontFamily="monospace" fontSize="12">
                      {'cp: overwrite \'original.txt\'? '}
                    </text>
                    
                    <rect x="240" y="60" width="40" height="20" rx="3" fill="#10b981"/>
                    <text x="260" y="73" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">n</text>
                    <text x="285" y="73" fill="#10b981" fontSize="10" fontFamily="monospace"> (user cancels)</text>
                    
                    {/* File Protection */}
                    <g transform="translate(150, 120)">
                      <rect width="100" height="50" rx="3" fill="#86efac"/>
                      <text x="50" y="20" textAnchor="middle" fill="#065f46" fontSize="10" fontFamily="sans-serif">original.txt</text>
                      <text x="50" y="35" textAnchor="middle" fill="#065f46" fontSize="8" fontFamily="monospace">"Important Data"</text>
                      
                      {/* Protection Shield */}
                      <g transform="translate(50, 60)">
                        <circle cx="0" cy="0" r="20" fill="#10b981" opacity="0.2"/>
                        <circle cx="0" cy="0" r="15" fill="#10b981" opacity="0.4"/>
                        <circle cx="0" cy="0" r="10" fill="#10b981" opacity="0.6"/>
                        <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif">-i</text>
                      </g>
                    </g>
                    
                    {/* Canceled Operation */}
                    <g transform="translate(50, 120)">
                      <rect width="80" height="50" rx="3" fill="#fca5a5" opacity="0.5"/>
                      <text x="40" y="25" textAnchor="middle" fill="#7c2d12" fontSize="10" fontFamily="sans-serif">backup.txt</text>
                      <text x="40" y="40" textAnchor="middle" fill="#7c2d12" fontSize="8" fontFamily="monospace">Not copied (canceled)</text>
                    </g>
                    
                    {/* Safety Message */}
                    <g transform="translate(200, 190)">
                      <rect width="180" height="40" rx="5" fill="#86efac"/>
                      <text x="90" y="15" textAnchor="middle" fill="#065f46" fontSize="10" fontFamily="sans-serif" fontWeight="bold">FILE PROTECTED BY -i FLAG</text>
                      <text x="90" y="30" textAnchor="middle" fill="#065f46" fontSize="8" fontFamily="sans-serif">User canceled overwrite → Data preserved</text>
                    </g>
                    
                    {/* Interactive Symbol */}
                    <g transform="translate(120, 120)">
                      <rect width="20" height="20" rx="3" fill="#10b981" opacity="0.3"/>
                      <text x="10" y="14" textAnchor="middle" fill="#065f46" fontSize="12" fontFamily="monospace">?</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Commands Supporting -i:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code>cp -i</code> - Ask before overwriting files</li>
                      <li><code>mv -i</code> - Ask before moving over existing files</li>
                      <li><code>rm -i</code> - Ask before deleting files</li>
                      <li><code>ln -i</code> - Ask before overwriting links</li>
                      <li><code>chmod -i</code> - Some versions ask for permission changes</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Professional -i Usage:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><strong>Set as default:</strong> <code>{'alias cp="cp -i"'}</code> in .bashrc</li>
                      <li><strong>Combine with -r:</strong> <code>rm -ri directory</code> for safe recursive deletion</li>
                      <li><strong>Script safety:</strong> Use -i in scripts when human review is needed</li>
                      <li><strong>Training:</strong> Force beginners to use -i until habits form</li>
                      <li><strong>Override when needed:</strong> Use <code>\cp</code> to bypass alias</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* -v: Verbose Mode */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-300 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-purple-600 dark:text-purple-300 font-bold">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">-v: Verbose Mode (See What Happens)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-mono mb-3">
                    {'Prototype: command -v file...'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-v</code> flag enables verbose mode, showing exactly what the command is doing. This is essential for debugging and understanding complex operations. When Tuhina used <code>cp -v</code> at Shyamnagar tech institute, she could see exactly which files were being copied.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Verbose Output Example:</h3>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'$ cp -v source.txt destination.txt'}</code>
                    </pre>
                    <pre className="mt-2 p-3 bg-gray-800 text-cyan-300 rounded-lg overflow-x-auto">
                      <code>{'\'source.txt\' -> \'destination.txt\''}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      The command shows exactly what it did, creating an audit trail of operations.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Verbose Mode */}
                <div className="mb-6">
                  <svg width="100%" height="250" viewBox="0 0 400 250" className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-verbose" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
                      </marker>
                    </defs>
                    
                    {/* Terminal with Verbose Output */}
                    <rect x="20" y="20" width="360" height="100" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ cp -rv project/ backup/'}
                    </text>
                    
                    <text x="40" y="60" fill="#22d3ee" fontFamily="monospace" fontSize="10">
                      {'project/main.py -> backup/main.py'}
                    </text>
                    
                    <text x="40" y="75" fill="#22d3ee" fontFamily="monospace" fontSize="10">
                      {'project/config.json -> backup/config.json'}
                    </text>
                    
                    <text x="40" y="90" fill="#22d3ee" fontFamily="monospace" fontSize="10">
                      {'project/data/ -> backup/data/'}
                    </text>
                    
                    <text x="40" y="105" fill="#22d3ee" fontFamily="monospace" fontSize="10">
                      {'project/data/file1.txt -> backup/data/file1.txt'}
                    </text>
                    
                    {/* Verbose Visualization */}
                    <g transform="translate(50, 140)">
                      <rect width="120" height="40" rx="3" fill="#d8b4fe"/>
                      <text x="60" y="15" textAnchor="middle" fill="#6b21a8" fontSize="9" fontFamily="sans-serif">source.txt</text>
                      <text x="60" y="30" textAnchor="middle" fill="#6b21a8" fontSize="8" fontFamily="monospace">Verbose shows operation</text>
                    </g>
                    
                    {/* Arrow with Verbose Label */}
                    <g transform="translate(190, 160)">
                      <line x1="0" y1="0" x2="40" y2="0" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-verbose)" className="svg-draw" />
                      <text x="20" y="-8" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="monospace">-v shows path</text>
                    </g>
                    
                    {/* Destination with Info */}
                    <g transform="translate(250, 140)">
                      <rect width="120" height="40" rx="3" fill="#d8b4fe"/>
                      <text x="60" y="15" textAnchor="middle" fill="#6b21a8" fontSize="9" fontFamily="sans-serif">destination.txt</text>
                      <text x="60" y="30" textAnchor="middle" fill="#6b21a8" fontSize="8" fontFamily="monospace">Full path displayed</text>
                    </g>
                    
                    {/* Verbose Symbol */}
                    <g transform="translate(200, 140)">
                      <rect width="40" height="40" rx="5" fill="#8b5cf6" opacity="0.2"/>
                      <text x="20" y="25" textAnchor="middle" fill="#6b21a8" fontSize="14" fontFamily="monospace">-v</text>
                    </g>
                    
                    {/* Benefits */}
                    <g transform="translate(100, 200)">
                      <rect width="200" height="40" rx="5" fill="#e9d5ff"/>
                      <text x="100" y="15" textAnchor="middle" fill="#6b21a8" fontSize="9" fontFamily="sans-serif" fontWeight="bold">VERBOSE BENEFITS</text>
                      <text x="100" y="30" textAnchor="middle" fill="#6b21a8" fontSize="8" fontFamily="sans-serif">Debugging • Audit trail • Progress tracking</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">When to Use -v:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><strong>Scripts:</strong> Create log of what happened</li>
                      <li><strong>Debugging:</strong> See exactly what commands are doing</li>
                      <li><strong>Complex operations:</strong> Track multi-file operations</li>
                      <li><strong>Learning:</strong> Understand command behavior</li>
                      <li><strong>Documentation:</strong> Record actions for future reference</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Combine -v with Other Flags:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code>cp -vi</code> - Verbose + Interactive (best of both)</li>
                      <li><code>rm -v</code> - Show what's being deleted</li>
                      <li><code>mv -v</code> - Show what's being moved/renamed</li>
                      <li><code>chmod -v</code> - Show permission changes</li>
                      <li><code>tar -v</code> - Show archive contents being processed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* -n: No Clobber */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-400 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-amber-600 dark:text-amber-300 font-bold">4</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">-n: No Clobber (Never Overwrite)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-mono mb-3">
                    {'Prototype: command -n file...'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-n</code> flag (no clobber) prevents overwriting existing files entirely. This is useful in scripts where you want to preserve existing data. When Debangshu used <code>cp -n</code> in backup scripts at Naihati data center, it ensured backups never accidentally overwrote newer files.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">No Clobber Protection:</h3>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'$ cp -n updated.txt existing.txt'}</code>
                    </pre>
                    <pre className="mt-2 p-3 bg-gray-800 text-yellow-300 rounded-lg overflow-x-auto">
                      <code>{'# Nothing happens if existing.txt already exists'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      The copy is silently skipped if the destination exists. No error, no overwrite.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - No Clobber */}
                <div className="mb-6">
                  <svg width="100%" height="220" viewBox="0 0 400 220" className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-noclobber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ cp -n new_data.txt existing_data.txt'}
                    </text>
                    
                    {/* Source File */}
                    <g transform="translate(50, 90)">
                      <rect width="100" height="50" rx="3" fill="#fbbf24"/>
                      <text x="50" y="20" textAnchor="middle" fill="#92400e" fontSize="10" fontFamily="sans-serif">new_data.txt</text>
                      <text x="50" y="35" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="monospace">"Updated Content"</text>
                    </g>
                    
                    {/* Blocked Arrow */}
                    <g transform="translate(170, 115)">
                      <line x1="0" y1="0" x2="40" y2="0" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" className="svg-draw" />
                      <line x1="35" y1="-5" x2="45" y2="5" stroke="#ef4444" strokeWidth="2" className="svg-draw" />
                      <line x1="35" y1="5" x2="45" y2="-5" stroke="#ef4444" strokeWidth="2" className="svg-draw" />
                      <text x="20" y="-10" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace">-n blocks</text>
                    </g>
                    
                    {/* Protected Destination */}
                    <g transform="translate(240, 90)">
                      <rect width="100" height="50" rx="3" fill="#fbbf24"/>
                      <text x="50" y="20" textAnchor="middle" fill="#92400e" fontSize="10" fontFamily="sans-serif">existing_data.txt</text>
                      <text x="50" y="35" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="monospace">"Original Data"</text>
                      
                      {/* Protection Symbol */}
                      <g transform="translate(90, 10)">
                        <circle cx="0" cy="0" r="8" fill="#10b981"/>
                        <text x="0" y="3" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">✓</text>
                      </g>
                    </g>
                    
                    {/* No Clobber Message */}
                    <g transform="translate(200, 160)">
                      <rect width="180" height="40" rx="5" fill="#fef3c7"/>
                      <text x="90" y="15" textAnchor="middle" fill="#92400e" fontSize="10" fontFamily="sans-serif" fontWeight="bold">NO CLOBBER PROTECTION</text>
                      <text x="90" y="30" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="sans-serif">Existing file preserved (not overwritten)</text>
                    </g>
                    
                    {/* -n Symbol */}
                    <g transform="translate(195, 115)">
                      <rect width="20" height="20" rx="3" fill="#f59e0b" opacity="0.5"/>
                      <text x="10" y="14" textAnchor="middle" fill="#92400e" fontSize="10" fontFamily="monospace">-n</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">When to Use -n:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><strong>Backup scripts:</strong> Don't overwrite existing backups</li>
                      <li><strong>Data collection:</strong> Preserve existing data files</li>
                      <li><strong>Log rotation:</strong> Only create new log files</li>
                      <li><strong>Configuration:</strong> Don't overwrite user customizations</li>
                      <li><strong>Safety:</strong> When you're unsure about overwriting</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Comparison: -i vs -n vs -f:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code>-i</code>: Ask before overwriting (interactive)</li>
                      <li><code>-n</code>: Never overwrite (safe, silent)</li>
                      <li><code>-f</code>: Always overwrite (dangerous, forceful)</li>
                      <li><code>-u</code>: Overwrite only if source is newer (update)</li>
                      <li><code>-b</code>: Make backup before overwriting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-500 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Overwrite Options Comparison</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-4 py-3">Option</th>
                        <th className="px-4 py-3">Behavior</th>
                        <th className="px-4 py-3">Safety Level</th>
                        <th className="px-4 py-3">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">(default)</code>
                        </td>
                        <td className="px-4 py-3">Silent overwrite</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                            Dangerous
                          </div>
                        </td>
                        <td className="px-4 py-3">Experienced users, scripts</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">-i</code>
                        </td>
                        <td className="px-4 py-3">Ask before overwriting</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            Safe
                          </div>
                        </td>
                        <td className="px-4 py-3">Interactive use, beginners</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">-n</code>
                        </td>
                        <td className="px-4 py-3">Never overwrite</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            Very Safe
                          </div>
                        </td>
                        <td className="px-4 py-3">Backups, data preservation</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">-f</code>
                        </td>
                        <td className="px-4 py-3">Force overwrite</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                            Dangerous
                          </div>
                        </td>
                        <td className="px-4 py-3">Scripts (with caution), cleanup</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">-u</code>
                        </td>
                        <td className="px-4 py-3">Overwrite if newer</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            Moderate
                          </div>
                        </td>
                        <td className="px-4 py-3">Updates, synchronization</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Professional Recommendation:</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    For daily use: <strong>Always use <code>-i</code> or set it as default via aliases.</strong> For scripts: Use <code>-n</code> when preserving data, <code>-u</code> for updates, and <code>-f</code> only when absolutely necessary and with extreme caution.
                  </p>
                </div>
              </div>
            </div>

            {/* Setting Safe Defaults */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-600 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-emerald-200 dark:border-emerald-900">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Setting Safe Defaults</h2>
                    <p className="text-gray-600 dark:text-gray-400">Make safety the default with shell aliases</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Essential Safety Aliases</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Add to <code>~/.bashrc</code> or <code>~/.zshrc</code>:
                        </p>
                        <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto text-sm">
                          <code>{`# Safety first: Always prompt for overwrites
alias cp='cp -i'
alias mv='mv -i'
alias rm='rm -i'

# Show what's happening
alias cp='cp -iv'
alias mv='mv -iv'

# Never overwrite by default for certain operations
alias backup='cp -n'`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Bypass Aliases When Needed</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Sometimes you need the original behavior. Use backslash or full path:
                        </p>
                        <div className="mt-2 space-y-2">
                          <pre className="p-2 bg-gray-800 text-green-300 rounded-lg overflow-x-auto text-sm">
                            <code>{'\\cp file1 file2    # Bypass cp alias'}</code>
                          </pre>
                          <pre className="p-2 bg-gray-800 text-green-300 rounded-lg overflow-x-auto text-sm">
                            <code>{'/bin/cp file1 file2    # Use original cp'}</code>
                          </pre>
                          <pre className="p-2 bg-gray-800 text-green-300 rounded-lg overflow-x-auto text-sm">
                            <code>{'command cp file1 file2    # Bypass shell functions/aliases'}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Shell Option: noclobber</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Set the noclobber shell option to prevent accidental overwrites with <code>></code>:
                        </p>
                        <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                          <code>{'set -o noclobber    # Prevent > overwrites'}</code>
                        </pre>
                        <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                          <code>{'set +o noclobber    # Allow > overwrites (default)'}</code>
                        </pre>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                          With noclobber set, use <code>>|</code> to force overwrite when needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-700 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-red-200 dark:border-red-900">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-7 h-7 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Common Overwrite Pitfalls</h2>
                    <p className="text-gray-600 dark:text-gray-400">Mistakes that lead to data loss</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Assuming Commands Ask by Default
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Beginners often assume Linux commands ask before overwriting (like Windows). This assumption leads to immediate data loss on first use.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Train yourself: "Linux overwrites silently unless I use -i."
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      Forgetting -i with Wildcards
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <code>cp *.txt backup/</code> when backup/ already has .txt files silently overwrites them all. The wildcard affects multiple files at once.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Always use <code>cp -i</code> with wildcards. Or check first: <code>ls backup/*.txt</code>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0 0h-1m1 0v4m-5-4h.01M11 12h2"/>
                      </svg>
                      Output Redirection Overwrites
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <code>echo "data" > file.txt</code> always overwrites. Beginners often use this for appending but forget the second <code>></code>.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Use <code>set -o noclobber</code> or remember: <code>></code> overwrites, <code>>></code> appends.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hint Section */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-800 mb-8">
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
                          {'"Create two files: file1.txt and file2.txt. Try: cp file1.txt file2.txt with and without -i. What\'s the difference?"'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Put different content in each file. Observe what happens to file2.txt's content in each case.
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
                          {'"Set the noclobber option: set -o noclobber. Now try: echo \"test\" > existing.txt. What happens?"'}
                        </p>
                        <div className="text-sm text-gray500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Create existing.txt first. Notice the error. Then try: <code>echo "test" >| existing.txt</code>
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
                          {'"Create alias cp=\'cp -i\' in your shell. Then try to copy a file. Now try: \\cp file1 file2. What\'s different?"'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> The backslash bypasses the alias. This is useful when you need the original behavior.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Section */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-900 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Mini Checklist: What to Remember</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <span>Linux overwrites <strong>silently</strong> by default</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <span><code>-i</code> asks before overwriting (interactive)</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <span><code>-v</code> shows what's happening (verbose)</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">4</span>
                    </div>
                    <span><code>-n</code> never overwrites (no clobber)</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">5</span>
                    </div>
                    <span>Set aliases: <code>{'alias cp="cp -i"'}</code></span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">6</span>
                    </div>
                    <span><code>set -o noclobber</code> protects <code>></code></span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">7</span>
                    </div>
                    <span>Use <code>\command</code> to bypass aliases</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">8</span>
                    </div>
                    <span>Combine flags: <code>cp -iv</code> for safety + visibility</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-1000 mb-8">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 dark:border-blue-400 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Teacher's Note</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      The silent overwrite behavior is one of Linux's most dangerous features for beginners. I tell my students at Barrackpore school: <strong>"Assume every file operation will overwrite silently, unless you explicitly prevent it."</strong> This mindset saves countless hours of data recovery.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Make safety habitual: <code>-i</code> should be as automatic as breathing. Set the aliases, use them until they're muscle memory. The day you need them (and you will), they'll be there.
                    </p>
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-blue-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong className="text-blue-600 dark:text-blue-400">Teaching Strategy:</strong> I have students practice with test files using: 1) plain commands (see data loss), 2) with -i (prevent loss), 3) with -n (see protection). This three-step demonstration makes the concept unforgettable. We use files named "precious_data.txt" to emphasize the emotional impact of data loss.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-1100">
              <div className="text-center py-8">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <span className="mr-3 font-semibold">Next Topic: Viewing Files (cat, less, more, head, tail)</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                  Now that you understand file safety, learn how to view file contents without modifying them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Topic5;