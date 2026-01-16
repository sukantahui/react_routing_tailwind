import React from 'react';

class Topic4 extends React.Component {
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
            
            @keyframes deleteAnimation {
              0% {
                opacity: 1;
                transform: scale(1);
              }
              50% {
                opacity: 0.5;
                transform: scale(0.8);
              }
              100% {
                opacity: 0;
                transform: scale(0);
              }
            }
            
            @keyframes warningPulse {
              0%, 100% {
                fill: #fca5a5;
              }
              50% {
                fill: #ef4444;
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
            
            .delete-animate {
              animation: deleteAnimation 1.5s ease-out forwards;
            }
            
            .warning-pulse {
              animation: warningPulse 1s ease-in-out infinite;
            }
            
            /* Respect reduced motion */
            @media (prefers-reduced-motion: reduce) {
              .animate-fade-slide-up,
              .animate-pulse-glow,
              .svg-draw,
              .delete-animate,
              .warning-pulse {
                animation: none !important;
                transition: none !important;
              }
            }
          `}
        </style>

        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-all duration-500 ${this.state.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
                Topic 5: Deleting Files and Directories in Linux
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Master safe deletion with rm, understand rm -r for directories, and learn why rm -f is dangerous
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex-1 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full"></div>
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">WARNING: DANGEROUS COMMAND</span>
                <div className="flex-1 h-1 bg-gradient-to-r from-rose-500 to-red-500 rounded-full"></div>
              </div>
              
              {/* Critical Warning Banner */}
              <div className="mb-8 animate-pulse-glow">
                <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl shadow-lg p-6 border-4 border-red-300 dark:border-red-800">
                  <div className="flex items-center">
                    <svg className="w-10 h-10 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                    <div>
                      <h3 className="text-xl font-bold text-white">CRITICAL WARNING</h3>
                      <p className="text-red-100 mt-1">
                        <code>rm</code> is the most dangerous command in Linux. It deletes files PERMANENTLY with NO UNDO.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic rm Command */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-100 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 warning-pulse">
                    <span className="text-red-600 dark:text-red-300 font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Basic rm Command</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm font-mono mb-3">
                    {'Prototype: rm [options] file...'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">rm</code> (remove) command deletes files and directories. Unlike graphical interfaces, Linux deletion is <strong>permanent and immediate</strong> - no recycle bin, no undo. When Swadeep accidentally deleted his semester project at Barrackpore school, he learned this the hard way.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Example:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      He wanted to delete temporary files but made a typo:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-red-300 rounded-lg overflow-x-auto">
                      <code>{'rm tempp*  # Intended to delete temp files'}</code>
                    </pre>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'rm temp*   # Actually typed - deletes ALL temp files!'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      Missing one 'p' deleted all files starting with 'temp' including important ones.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Basic rm */}
                <div className="mb-6">
                  <svg width="100%" height="200" viewBox="0 0 400 200" className="rounded-lg bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-rm" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ rm unwanted_file.txt'}
                    </text>
                    
                    {/* File to Delete */}
                    <g transform="translate(120, 90)" className="delete-animate">
                      <rect width="100" height="50" rx="3" fill="#fca5a5"/>
                      <text x="50" y="20" textAnchor="middle" fill="#7f1d1d" fontSize="10" fontFamily="sans-serif">unwanted_file.txt</text>
                      <text x="50" y="35" textAnchor="middle" fill="#7f1d1d" fontSize="8" fontFamily="monospace">To be deleted</text>
                    </g>
                    
                    {/* Trash/Delete Symbol */}
                    <g transform="translate(220, 115)">
                      <rect width="40" height="30" rx="3" fill="#ef4444" opacity="0.3"/>
                      <rect x="5" y="5" width="30" height="20" rx="2" fill="#ef4444" opacity="0.6"/>
                      <text x="20" y="18" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">X</text>
                    </g>
                    
                    {/* Warning Text */}
                    <g transform="translate(200, 170)">
                      <rect width="180" height="30" rx="5" fill="#fee2e2"/>
                      <text x="90" y="20" textAnchor="middle" fill="#dc2626" fontSize="9" fontFamily="sans-serif" fontWeight="bold">NO RECYCLE BIN • NO UNDO • PERMANENT</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">What rm Does:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Permanently removes files from filesystem</li>
                      <li>No confirmation by default (silent deletion)</li>
                      <li>Cannot be undone (no trash/recycle bin)</li>
                      <li>Frees disk space immediately</li>
                      <li>Removes directory entries only (data may remain recoverable)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Basic Safety Options:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-i</code> - Interactive (confirm each file)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-I</code> - Prompt once before deleting >3 files</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-v</code> - Verbose (show what's being deleted)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">--</code> - End of options (protects against filenames starting with -)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* rm -r for Recursive Deletion */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-200 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 warning-pulse">
                    <span className="text-orange-600 dark:text-orange-300 font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">rm -r (Recursive Deletion)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-sm font-mono mb-3">
                    {'Prototype: rm -r directory_name'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-r</code> or <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-R</code> flag enables recursive deletion, allowing removal of directories and all their contents. This is <strong>extremely dangerous</strong> because a single command can delete an entire project. When Abhronila accidentally ran <code>rm -r .</code> instead of <code>rm -r ./tmp</code> at Ichapur lab, she lost everything.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Critical Danger Example:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      The most famous rm disaster command:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-red-300 rounded-lg overflow-x-auto">
                      <code>{'sudo rm -rf /'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      On some systems, this command would attempt to delete EVERY file on the computer. Modern systems have protections, but similar commands can still cause catastrophic damage.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Recursive Deletion */}
                <div className="mb-6">
                  <svg width="100%" height="250" viewBox="0 0 400 250" className="rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-recursive-rm" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ rm -r project/'}
                    </text>
                    
                    {/* Directory Structure */}
                    <g transform="translate(100, 90)">
                      <rect width="80" height="45" rx="5" fill="#fdba74"/>
                      <rect x="10" y="45" width="60" height="25" rx="3" fill="#fdba74"/>
                      <text x="40" y="30" textAnchor="middle" fill="#7c2d12" fontSize="10" fontFamily="sans-serif" fontWeight="bold">project</text>
                      
                      {/* Subdirectories */}
                      <g transform="translate(5, 75)">
                        <rect width="20" height="15" rx="2" fill="#fdba74"/>
                        <text x="10" y="10" textAnchor="middle" fill="#7c2d12" fontSize="6" fontFamily="sans-serif">src</text>
                      </g>
                      <g transform="translate(30, 75)">
                        <rect width="20" height="15" rx="2" fill="#fdba74"/>
                        <text x="10" y="10" textAnchor="middle" fill="#7c2d12" fontSize="6" fontFamily="sans-serif">docs</text>
                      </g>
                      <g transform="translate(55, 75)">
                        <rect width="20" height="15" rx="2" fill="#fdba74"/>
                        <text x="10" y="10" textAnchor="middle" fill="#7c2d12" fontSize="6" fontFamily="sans-serif">data</text>
                      </g>
                      
                      {/* Files inside */}
                      <g transform="translate(10, 95)">
                        <rect width="15" height="10" rx="1" fill="#fed7aa"/>
                        <text x="7.5" y="7" textAnchor="middle" fill="#7c2d12" fontSize="4" fontFamily="sans-serif">f1</text>
                      </g>
                      <g transform="translate(30, 95)">
                        <rect width="15" height="10" rx="1" fill="#fed7aa"/>
                        <text x="7.5" y="7" textAnchor="middle" fill="#7c2d12" fontSize="4" fontFamily="sans-serif">f2</text>
                      </g>
                      <g transform="translate(50, 95)">
                        <rect width="15" height="10" rx="1" fill="#fed7aa"/>
                        <text x="7.5" y="7" textAnchor="middle" fill="#7c2d12" fontSize="4" fontFamily="sans-serif">f3</text>
                      </g>
                    </g>
                    
                    {/* Recursive Deletion Symbol */}
                    <g transform="translate(220, 115)" className="delete-animate">
                      <circle cx="0" cy="0" r="25" fill="#f97316" opacity="0.2"/>
                      <circle cx="0" cy="0" r="15" fill="#f97316" opacity="0.5"/>
                      <circle cx="0" cy="0" r="5" fill="#f97316"/>
                      <text x="0" y="3" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">-r</text>
                    </g>
                    
                    {/* Warning Area */}
                    <g transform="translate(280, 90)">
                      <rect width="80" height="45" rx="5" fill="#fca5a5" opacity="0.3"/>
                      <rect x="10" y="45" width="60" height="25" rx="3" fill="#fca5a5" opacity="0.3"/>
                      <text x="40" y="30" textAnchor="middle" fill="#7c2d12" fontSize="10" fontFamily="sans-serif" fontWeight="bold" opacity="0.5">DELETED</text>
                      
                      {/* X marks */}
                      <line x1="20" y1="25" x2="60" y2="65" stroke="#dc2626" strokeWidth="2" className="svg-draw"/>
                      <line x1="60" y1="25" x2="20" y2="65" stroke="#dc2626" strokeWidth="2" className="svg-draw"/>
                    </g>
                    
                    {/* Warning Text */}
                    <g transform="translate(200, 170)">
                      <rect width="180" height="40" rx="5" fill="#fed7aa"/>
                      <text x="90" y="15" textAnchor="middle" fill="#7c2d12" fontSize="9" fontFamily="sans-serif" fontWeight="bold">DELETES EVERYTHING INSIDE</text>
                      <text x="90" y="30" textAnchor="middle" fill="#7c2d12" fontSize="8" fontFamily="sans-serif">All files + subdirectories + their contents</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">When -r is Necessary:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Deleting non-empty directories</li>
                      <li>Cleaning up project directories</li>
                      <li>Removing temporary directories with contents</li>
                      <li>Uninstalling software directories</li>
                      <li>Clearing cache directories</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Critical Safety Rules for -r:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><strong>ALWAYS use -i with -r:</strong> <code>rm -ri directory</code></li>
                      <li><strong>Check path TWICE:</strong> Is it the right directory?</li>
                      <li><strong>Use absolute paths:</strong> Avoid relative path confusion</li>
                      <li><strong>List first:</strong> <code>ls -la directory/</code> before deleting</li>
                      <li><strong>Consider alternatives:</strong> Move to trash instead of rm -r</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* rm -f (Force) - The Most Dangerous */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-300 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-red-300 dark:border-red-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-200 dark:bg-red-800 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 warning-pulse">
                    <span className="text-red-700 dark:text-red-400 font-bold">!</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">rm -f (Force Deletion)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-400 rounded-full text-sm font-mono mb-3">
                    {'Prototype: rm -f file...'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-f</code> flag stands for "force" and is the most dangerous option. It:
                  </p>
                  
                  <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg mb-4 border border-red-200 dark:border-red-800">
                    <ul className="list-disc pl-5 text-red-700 dark:text-red-400 space-y-2">
                      <li>Ignores non-existent files (no error messages)</li>
                      <li>Overrides -i (interactive) protection</li>
                      <li>Suppresses most warning messages</li>
                      <li>Removes write-protected files without prompting</li>
                      <li>Combined with -r, creates the infamous <code>rm -rf</code></li>
                    </ul>
                    <p className="text-red-600 dark:text-red-400 mt-3 font-semibold">
                      When Tuhina used <code>rm -f *.log</code> at Shyamnagar tech institute, she didn't realize she was in the wrong directory and deleted critical system logs.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Force Deletion Danger */}
                <div className="mb-6">
                  <svg width="100%" height="280" viewBox="0 0 400 280" className="rounded-lg bg-gradient-to-r from-rose-50 to-red-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-force" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ rm -f important_file.txt'}
                    </text>
                    
                    {/* Protected File */}
                    <g transform="translate(80, 90)">
                      <rect width="120" height="60" rx="5" fill="#fecaca"/>
                      <text x="60" y="25" textAnchor="middle" fill="#991b1b" fontSize="10" fontFamily="sans-serif" fontWeight="bold">important_file.txt</text>
                      
                      {/* Protection Symbol */}
                      <g transform="translate(60, 40)">
                        <circle cx="0" cy="0" r="15" fill="#fca5a5"/>
                        <text x="0" y="5" textAnchor="middle" fill="#991b1b" fontSize="12" fontFamily="sans-serif">🔒</text>
                        <text x="0" y="25" textAnchor="middle" fill="#991b1b" fontSize="6" fontFamily="monospace">read-only</text>
                      </g>
                    </g>
                    
                    {/* Force Symbol */}
                    <g transform="translate(230, 110)">
                      <circle cx="0" cy="0" r="25" fill="#dc2626" opacity="0.3"/>
                      <circle cx="0" cy="0" r="18" fill="#dc2626" opacity="0.6"/>
                      <circle cx="0" cy="0" r="10" fill="#dc2626"/>
                      <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="bold">-f</text>
                    </g>
                    
                    {/* Arrow */}
                    <line x1="210" y1="120" x2="250" y2="120" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrow-force)" className="svg-draw" />
                    
                    {/* Deleted Result */}
                    <g transform="translate(290, 90)" className="delete-animate">
                      <rect width="120" height="60" rx="5" fill="#fca5a5" opacity="0.3"/>
                      <text x="60" y="30" textAnchor="middle" fill="#991b1b" fontSize="10" fontFamily="sans-serif" opacity="0.5">DELETED</text>
                      
                      {/* Broken Lock */}
                      <g transform="translate(60, 45)">
                        <circle cx="0" cy="0" r="12" fill="#fca5a5" opacity="0.5" stroke="#991b1b" strokeWidth="1"/>
                        <text x="0" y="5" textAnchor="middle" fill="#991b1b" fontSize="10" fontFamily="sans-serif">🔓</text>
                        <line x1="-8" y1="-8" x2="8" y2="8" stroke="#991b1b" strokeWidth="1" className="svg-draw"/>
                      </g>
                    </g>
                    
                    {/* Danger Zone */}
                    <g transform="translate(100, 170)">
                      <rect width="200" height="60" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
                      <text x="100" y="25" textAnchor="middle" fill="#dc2626" fontSize="12" fontFamily="sans-serif" fontWeight="bold">FORCE DELETION DANGER ZONE</text>
                      <text x="100" y="45" textAnchor="middle" fill="#991b1b" fontSize="9" fontFamily="sans-serif">Ignores permissions • No warnings • No confirmations</text>
                    </g>
                    
                    {/* Professional Warning */}
                    <g transform="translate(50, 240)">
                      <rect width="300" height="25" rx="3" fill="#fecaca"/>
                      <text x="150" y="16" textAnchor="middle" fill="#991b1b" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
                        {'PROFESSIONAL RULE: NEVER use -f interactively. Scripts only, with EXTREME caution.'}
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">When -f Might Be Acceptable:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>In scripts that must not fail on missing files</li>
                      <li>Cleaning known temporary files</li>
                      <li>When you absolutely know what you're deleting</li>
                      <li>Combined with very specific patterns</li>
                      <li>By experienced admins in controlled environments</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">NEVER Use -f When:</h4>
                    <ul className="list-disc pl-5 text-red-600 dark:text-red-400 space-y-2">
                      <li>You're tired or distracted</li>
                      <li>Using wildcards (* or ?)</li>
                      <li>Combined with -r (creates rm -rf)</li>
                      <li>Deleting files you didn't create</li>
                      <li>Working as root/superuser</li>
                      <li>You haven't verified exact file list</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Systems and Alternatives */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-400 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Safety Systems and Alternatives</h2>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Professional Linux users implement multiple safety layers to prevent accidental deletions. When Debangshu set up the Naihati data center systems, he implemented these safety measures.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Safety Aliases */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-200 dark:bg-green-800 rounded-md flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-green-700 dark:text-green-300 font-bold text-lg">🛡️</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Safety Aliases</h3>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          Add to your <code>.bashrc</code> or <code>.zshrc</code> for permanent protection:
                        </p>
                        
                        <div className="space-y-2">
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'alias rm="rm -i"'}</code>
                          </pre>
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'alias rmdir="rmdir -i"'}</code>
                          </pre>
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'alias del="echo \'Use trash-put or rm -i instead\'"'}</code>
                          </pre>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <strong>Essential:</strong> These aliases have prevented countless data disasters
                      </div>
                    </div>
                    
                    {/* Trash Alternatives */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-200 dark:bg-blue-800 rounded-md flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-blue-700 dark:text-blue-300 font-bold text-lg">🗑️</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Trash Alternatives</h3>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          Install trash-cli for a recycle bin experience:
                        </p>
                        
                        <div className="space-y-2">
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'sudo apt install trash-cli   # Debian/Ubuntu'}</code>
                          </pre>
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'trash-put file.txt          # Move to trash'}</code>
                          </pre>
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'trash-list                   # List trashed files'}</code>
                          </pre>
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'trash-restore               # Restore from trash'}</code>
                          </pre>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <strong>Best Practice:</strong> Use trash-put instead of rm for everyday deletions
                      </div>
                    </div>
                  </div>
                  
                  {/* Safety Checklist */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-lg">Pre-deletion Safety Checklist:</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-green-600 dark:text-green-400 text-sm">1</span>
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">Run <code>pwd</code> to confirm current directory</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-green-600 dark:text-green-400 text-sm">2</span>
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">Use <code>ls</code> to see what you're about to delete</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-green-600 dark:text-green-400 text-sm">3</span>
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">Test with <code>echo rm pattern</code> first</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-green-600 dark:text-green-400 text-sm">4</span>
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">Consider <code>mv file.txt ~/.trash/</code> instead</span>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-green-600 dark:text-green-400 text-sm">5</span>
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">Always use <code>rm -i</code> with wildcards</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-500 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-red-200 dark:border-red-900">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-7 h-7 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Common rm Disasters</h2>
                    <p className="text-gray-600 dark:text-gray-400">Real examples of rm mistakes that caused data loss</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Space in Filename Wildcards
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <code>{'rm * .txt'}</code> (notice the space) deletes ALL files (*) then tries to delete .txt. The space causes the shell to see two arguments.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> No spaces: <code>rm *.txt</code>. Always check command before pressing Enter.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      Wrong Directory with rm -r
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thinking you're in <code>~/temp/</code> but actually in <code>~/</code> and running <code>rm -r *</code> deletes your entire home directory.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Always run <code>pwd</code> before <code>rm -r</code>. Use absolute paths for important deletions.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0 0h-1m1 0v4m-5-4h.01M11 12h2"/>
                      </svg>
                      rm -f in Scripts Gone Wrong
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Script containing <code>{'rm -f ${VARIABLE}/*'}</code> where VARIABLE is empty expands to <code>rm -f /*</code> - attempts to delete root filesystem.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> In scripts, use <code>{'rm -f "${VARIABLE:?Variable is empty}"/*'}</code> or check variable isn't empty.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recovery Mindset */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-600 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-blue-200 dark:border-blue-900">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Recovery Mindset</h2>
                    <p className="text-gray-600 dark:text-gray-400">What to do if you accidentally delete important files</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">STOP IMMEDIATELY</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Don't write any more data to the disk. The deleted files' data is still on disk until overwritten.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Check Backups</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Do you have backups? Check <code>~/.trash/</code>, Time Machine, rsync backups, cloud backups, or version control (git).
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Use File Recovery Tools</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Tools like <code>testdisk</code>, <code>photorec</code>, or <code>extundelete</code> can recover deleted files if not overwritten.
                        </p>
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <code>{'sudo apt install testdisk'}</code> then run <code>{'sudo testdisk'}</code> for recovery options.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Learn and Implement Safeguards</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          After recovery (successful or not), implement the safety systems discussed here to prevent future incidents.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hint Section */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-700 mb-8">
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
                          {'"Create a test directory with some files. Try: rm testdir vs rm -r testdir. What\'s the difference and why?"'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Create a directory with a few files inside. Which command works? Why does the other fail?
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
                          {'"Set up the safety alias: alias rm=\'rm -i\'. Now try deleting files. How does behavior change?"'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Create some test files, then try to delete them with and without the alias. Notice the confirmation prompts.
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
                          {'"Create a read-only file (chmod 444 file.txt). Try: rm file.txt vs rm -f file.txt. What happens?"'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> The -f flag overrides permission warnings. This is why -f is dangerous.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Section */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-800 mb-8">
              <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Mini Checklist: What to Remember</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold">1</span>
                    </div>
                    <span><code>rm</code> is PERMANENT - no undo</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold">2</span>
                    </div>
                    <span>Always use <code>rm -i</code> (interactive)</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold">3</span>
                    </div>
                    <span><code>rm -r</code> deletes directories recursively</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold">4</span>
                    </div>
                    <span><code>rm -f</code> is DANGEROUS - avoid</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold">5</span>
                    </div>
                    <span>Set alias: <code>{'alias rm="rm -i"'}</code></span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold">6</span>
                    </div>
                    <span>Use <code>trash-put</code> instead when possible</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold">7</span>
                    </div>
                    <span>Check <code>pwd</code> before any deletion</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold">8</span>
                    </div>
                    <span>Test with <code>echo rm pattern</code> first</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-900 mb-8">
              <div className="bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900 dark:to-rose-900 rounded-2xl shadow-lg p-6 border-l-4 border-red-500 dark:border-red-400 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Teacher's Note</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      In over 15 years of teaching Linux, I've seen more data loss from <code>rm</code> than from all hardware failures combined. This command demands the utmost respect. <strong>Treat every <code>rm</code> command as if it could delete your entire project.</strong>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      My #1 rule: <strong>Always use <code>rm -i</code> or set it as an alias.</strong> The milliseconds spent confirming deletions are nothing compared to the hours spent recovering data or redoing work.
                    </p>
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong className="text-red-600 dark:text-red-400">Critical Teaching Point:</strong> I make every student at Barrackpore computer lab add <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{'alias rm="rm -i"'}</code> to their <code>.bashrc</code> on day one. Then I have them practice with test files until the confirmation habit becomes automatic. This simple habit has saved countless projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-1000">
              <div className="text-center py-8">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <span className="mr-3 font-semibold">Next Topic: Understanding File Overwrite Behavior and Prompts</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                  Now that you understand deletion dangers, learn about file overwrite behavior and safety prompts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Topic4;