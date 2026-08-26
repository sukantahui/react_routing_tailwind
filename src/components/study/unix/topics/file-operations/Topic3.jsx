import React from 'react';

class Topic3 extends React.Component {
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
            
            @keyframes moveAnimation {
              0% {
                transform: translateX(0) scale(1);
                opacity: 1;
              }
              50% {
                transform: translateX(100px) scale(0.8);
                opacity: 0.5;
              }
              100% {
                transform: translateX(100px) scale(1);
                opacity: 1;
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
            
            .move-animate {
              animation: moveAnimation 2s ease-in-out forwards;
            }
            
            /* Respect reduced motion */
            @media (prefers-reduced-motion: reduce) {
              .animate-fade-slide-up,
              .animate-pulse-glow,
              .svg-draw,
              .move-animate {
                animation: none !important;
                transition: none !important;
              }
            }
          `}
        </style>

        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-all duration-500 ${this.state.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
                Topic 4: Moving and Renaming Files in Linux
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Master file movement with mv command, learn renaming tricks, and understand overwriting rules
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex-1 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">FILE MOVEMENT</span>
                <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              </div>
            </div>

            {/* Basic mv Command */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-100 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-amber-600 dark:text-amber-300 font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Basic mv Command</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm font-mono mb-3">
                    {'Prototype: mv [options] source destination'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">mv</code> (move) command serves two purposes: moving files between directories and renaming files. When Tuhina needed to reorganize her project files at Shyamnagar college, she used mv to move files between directories and rename them.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Example:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      She moved draft documents to an archive folder and renamed the final version:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'mv draft_v1.txt draft_v2.txt archive/'}</code>
                    </pre>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'mv final_draft.txt project_report_final.txt'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      The first command moves two files to archive/, the second renames a file in place.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Basic mv */}
                <div className="mb-6">
                  <svg width="100%" height="200" viewBox="0 0 400 200" className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-mv" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ mv old_name.txt new_name.txt'}
                    </text>
                    
                    {/* Source File */}
                    <g transform="translate(80, 90)">
                      <rect width="80" height="40" rx="3" fill="#fbbf24"/>
                      <text x="40" y="25" textAnchor="middle" fill="#92400e" fontSize="10" fontFamily="sans-serif">old_name.txt</text>
                      <text x="40" y="35" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="monospace">Source</text>
                    </g>
                    
                    {/* Moving Animation Arrow */}
                    <line x1="170" y1="110" x2="230" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-mv)" className="svg-draw" />
                    
                    {/* Destination File (appears after animation) */}
                    <g transform="translate(240, 90)" className="move-animate">
                      <rect width="80" height="40" rx="3" fill="#fbbf24"/>
                      <text x="40" y="25" textAnchor="middle" fill="#92400e" fontSize="10" fontFamily="sans-serif">new_name.txt</text>
                      <text x="40" y="35" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="monospace">Destination</text>
                    </g>
                    
                    {/* Move Symbol */}
                    <g transform="translate(195, 105)">
                      <rect width="10" height="10" fill="#f59e0b" opacity="0.7"/>
                      <rect x="3" y="3" width="10" height="10" fill="#f59e0b"/>
                      <text x="8" y="8" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif">mv</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Primary Functions:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><strong>Renaming:</strong> Change file/directory names</li>
                      <li><strong>Moving:</strong> Transfer files between directories</li>
                      <li><strong>Combining:</strong> Move multiple files at once</li>
                      <li><strong>Overwriting:</strong> Replace existing files (with caution)</li>
                      <li><strong>Relocating:</strong> Move entire directory structures</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Basic Options:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-i</code> - Interactive (prompt before overwrite)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-n</code> - No clobber (don't overwrite)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-v</code> - Verbose (show actions)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-u</code> - Update (move only if source is newer)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-f</code> - Force (ignore warnings)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Renaming Tricks and Patterns */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-200 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-600 dark:text-green-300 font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Renaming Tricks and Patterns</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-mono mb-3">
                    {'Advanced renaming with patterns and wildcards'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Professional Linux users combine <code>mv</code> with shell features for powerful batch renaming. When Swadeep needed to rename hundreds of image files at Barrackpore school project, he used pattern matching to do it efficiently.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Scenario:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      He renamed camera photos from generic names to project-specific names:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'mv IMG_{001..050}.jpg vacation_{001..050}.jpg'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      This renamed 50 files at once using brace expansion pattern.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Batch Renaming */}
                <div className="mb-6">
                  <svg width="100%" height="250" viewBox="0 0 400 250" className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-rename" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ mv photo_*.jpg renamed_*.jpg'}
                    </text>
                    
                    {/* Source Files Pattern */}
                    <g transform="translate(30, 90)">
                      <rect width="80" height="30" rx="3" fill="#86efac"/>
                      <text x="40" y="20" textAnchor="middle" fill="#065f46" fontSize="9" fontFamily="sans-serif">photo_001.jpg</text>
                    </g>
                    
                    <g transform="translate(30, 125)">
                      <rect width="80" height="30" rx="3" fill="#86efac"/>
                      <text x="40" y="20" textAnchor="middle" fill="#065f46" fontSize="9" fontFamily="sans-serif">photo_002.jpg</text>
                    </g>
                    
                    <g transform="translate(30, 160)">
                      <rect width="80" height="30" rx="3" fill="#86efac"/>
                      <text x="40" y="20" textAnchor="middle" fill="#065f46" fontSize="9" fontFamily="sans-serif">photo_003.jpg</text>
                    </g>
                    
                    <text x="70" y="195" fill="#065f46" fontSize="8" fontFamily="sans-serif">Original Files</text>
                    
                    {/* Arrow */}
                    <line x1="130" y1="135" x2="270" y2="135" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-rename)" className="svg-draw" />
                    
                    {/* Destination Files Pattern */}
                    <g transform="translate(290, 90)">
                      <rect width="80" height="30" rx="3" fill="#86efac"/>
                      <text x="40" y="20" textAnchor="middle" fill="#065f46" fontSize="9" fontFamily="sans-serif">renamed_001.jpg</text>
                    </g>
                    
                    <g transform="translate(290, 125)">
                      <rect width="80" height="30" rx="3" fill="#86efac"/>
                      <text x="40" y="20" textAnchor="middle" fill="#065f46" fontSize="9" fontFamily="sans-serif">renamed_002.jpg</text>
                    </g>
                    
                    <g transform="translate(290, 160)">
                      <rect width="80" height="30" rx="3" fill="#86efac"/>
                      <text x="40" y="20" textAnchor="middle" fill="#065f46" fontSize="9" fontFamily="sans-serif">renamed_003.jpg</text>
                    </g>
                    
                    <text x="330" y="195" fill="#065f46" fontSize="8" fontFamily="sans-serif">Renamed Files</text>
                    
                    {/* Wildcard Symbol */}
                    <g transform="translate(200, 120)">
                      <circle cx="0" cy="0" r="15" fill="#10b981" opacity="0.2"/>
                      <text x="0" y="5" textAnchor="middle" fill="#065f46" fontSize="12" fontFamily="monospace">*</text>
                      <text x="0" y="20" textAnchor="middle" fill="#065f46" fontSize="6" fontFamily="sans-serif">wildcard</text>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Common Renaming Patterns:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code>{'mv *.txt docs/'}</code> - Move all .txt files to docs/</li>
                      <li><code>{'mv file{1..5}.txt backup/'}</code> - Move numbered files</li>
                      <li><code>{'mv *old* *new*'}</code> - Rename files containing "old"</li>
                      <li><code>{'mv image-??.jpg photos/'}</code> - Move two-character numbered images</li>
                      <li><code>{'for f in *.log; do mv "$f" "${f%.log}.backup"; done'}</code> - Change extensions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Professional Renaming Techniques:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><strong>Prefix addition:</strong> <code>{'for f in *; do mv "$f" "project_$f"; done'}</code></li>
                      <li><strong>Case change:</strong> <code>{'for f in *; do mv "$f" "$(echo $f | tr \'[:upper:]\' \'[:lower:]\')"; done'}</code></li>
                      <li><strong>Space replacement:</strong> <code>{'for f in *\ *; do mv "$f" "${f// /_}"; done'}</code></li>
                      <li><strong>Date stamping:</strong> <code>{'mv log.txt log_$(date +%Y%m%d).txt'}</code></li>
                      <li><strong>Sequential numbering:</strong> <code>{'i=1; for f in *.jpg; do mv "$f" "$(printf \'%03d\' $i).jpg"; ((i++)); done'}</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Overwriting Rules and Safety */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-300 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-red-600 dark:text-red-300 font-bold">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Overwriting Rules and Safety</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm font-mono mb-3">
                    {'Understanding when and how mv overwrites files'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The most dangerous aspect of <code>mv</code> is its silent overwriting behavior. By default, if a destination file exists, <code>mv</code> will overwrite it without warning. When Abhronila accidentally overwrote her thesis draft at Ichapur lab, she learned the importance of understanding overwriting rules.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Critical Safety Example:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      She thought she was backing up her work, but actually overwrote it:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-red-300 rounded-lg overflow-x-auto">
                      <code>{'# DANGEROUS - silently overwrites backup!'}</code>
                    </pre>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'mv thesis_final.txt thesis_backup.txt'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      If thesis_backup.txt already existed, it was permanently replaced without warning.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Overwrite Danger */}
                <div className="mb-6">
                  <svg width="100%" height="280" viewBox="0 0 400 280" className="rounded-lg bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-overwrite" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ mv new_data.txt existing_data.txt'}
                    </text>
                    
                    {/* Source File */}
                    <g transform="translate(50, 90)">
                      <rect width="100" height="50" rx="3" fill="#fca5a5"/>
                      <text x="50" y="20" textAnchor="middle" fill="#7f1d1d" fontSize="10" fontFamily="sans-serif">new_data.txt</text>
                      <text x="50" y="35" textAnchor="middle" fill="#7f1d1d" fontSize="8" fontFamily="monospace">Source File</text>
                      <rect x="20" y="40" width="60" height="5" rx="1" fill="#7f1d1d"/>
                    </g>
                    
                    {/* Warning Symbol */}
                    <g transform="translate(185, 100)">
                      <polygon points="0,-15 13,10 -13,10" fill="#fbbf24"/>
                      <text x="0" y="5" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="sans-serif" fontWeight="bold">!</text>
                    </g>
                    
                    {/* Arrow */}
                    <line x1="160" y1="115" x2="240" y2="115" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-overwrite)" className="svg-draw" />
                    
                    {/* Destination File (Before) */}
                    <g transform="translate(260, 90)">
                      <rect width="100" height="50" rx="3" fill="#fecaca"/>
                      <text x="50" y="20" textAnchor="middle" fill="#7f1d1d" fontSize="10" fontFamily="sans-serif">existing_data.txt</text>
                      <text x="50" y="35" textAnchor="middle" fill="#7f1d1d" fontSize="8" fontFamily="monospace">Existing File</text>
                      <rect x="20" y="40" width="60" height="5" rx="1" fill="#7f1d1d"/>
                      <rect x="25" y="42" width="50" height="3" rx="1" fill="#7f1d1d" opacity="0.5"/>
                    </g>
                    
                    {/* Overwrite Warning */}
                    <g transform="translate(200, 170)">
                      <rect width="160" height="40" rx="5" fill="#fee2e2"/>
                      <text x="80" y="15" textAnchor="middle" fill="#991b1b" fontSize="10" fontFamily="sans-serif" fontWeight="bold">OVERWRITE WARNING</text>
                      <text x="80" y="30" textAnchor="middle" fill="#991b1b" fontSize="8" fontFamily="sans-serif">Existing file will be lost!</text>
                    </g>
                    
                    {/* Safety Options */}
                    <g transform="translate(50, 220)">
                      <text x="0" y="0" fill="#7f1d1d" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Safety Solutions:</text>
                      
                      <g transform="translate(0, 15)">
                        <rect width="8" height="8" rx="1" fill="#10b981"/>
                        <text x="15" y="7" fill="#7f1d1d" fontSize="7" fontFamily="monospace">mv -i (interactive)</text>
                      </g>
                      
                      <g transform="translate(0, 30)">
                        <rect width="8" height="8" rx="1" fill="#10b981"/>
                        <text x="15" y="7" fill="#7f1d1d" fontSize="7" fontFamily="monospace">mv -n (no clobber)</text>
                      </g>
                      
                      <g transform="translate(150, 15)">
                        <rect width="8" height="8" rx="1" fill="#10b981"/>
                        <text x="15" y="7" fill="#7f1d1d" fontSize="7" fontFamily="monospace">alias mv='mv -i'</text>
                      </g>
                      
                      <g transform="translate(150, 30)">
                        <rect width="8" height="8" rx="1" fill="#10b981"/>
                        <text x="15" y="7" fill="#7f1d1d" fontSize="7" fontFamily="monospace">Check first with ls</text>
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Overwrite Prevention Options:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-i</code> - Ask before overwriting (interactive)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-n</code> - Never overwrite (no clobber)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-b</code> - Make backup before overwriting</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-S</code> - Specify backup suffix</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-u</code> - Overwrite only if source is newer</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Safety Best Practices:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><strong>Always use mv -i</strong> in critical operations</li>
                      <li><strong>Set alias:</strong> <code>{'alias mv="mv -i"'}</code> in .bashrc</li>
                      <li><strong>Check first:</strong> <code>ls destination</code> before moving</li>
                      <li><strong>Use backups:</strong> <code>mv -b file1 file2</code></li>
                      <li><strong>Test with echo:</strong> <code>{'echo mv source destination'}</code> first</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced mv Techniques */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-400 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Advanced mv Techniques</h2>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Professional Linux administrators use creative combinations of <code>mv</code> with other commands for complex file management tasks. When Debangshu needed to reorganize server logs at Naihati data center, he used these advanced techniques.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Directory Swapping */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-200 dark:bg-blue-800 rounded-md flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-blue-700 dark:text-blue-300 font-bold text-lg">↔</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Directory Swapping</h3>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          Swap two directories without losing data using a temporary directory.
                        </p>
                        
                        <div className="space-y-2">
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'mv dir1 dir1_tmp && mv dir2 dir1 && mv dir1_tmp dir2'}</code>
                          </pre>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Safely swaps dir1 and dir2 contents without data loss
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <strong>Use case:</strong> Switching between production and staging directories
                      </div>
                    </div>
                    
                    {/* Pattern-based Organization */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-200 dark:bg-purple-800 rounded-md flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-purple-700 dark:text-purple-300 font-bold text-lg">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Bulk Organization</h3>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          Organize files by type, date, or pattern in one command.
                        </p>
                        
                        <div className="space-y-2">
                          <pre className="text-sm bg-gray-800 text-green-300 p-2 rounded overflow-x-auto">
                            <code>{'mkdir -p images documents && mv *.jpg *.png images/ && mv *.pdf *.txt documents/'}</code>
                          </pre>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Creates directories and moves files by type simultaneously
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <strong>Use case:</strong> Organizing downloaded files automatically
                      </div>
                    </div>
                  </div>
                  
                  {/* Real-world Example */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-lg">Server Log Rotation Example:</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Debangshu rotates log files daily while preserving a week's history:
                      </p>
                      <pre className="p-4 bg-gray-800 text-green-300 rounded-lg overflow-x-auto text-sm">
                        <code>{`# Rotate log files, keep 7 days history
mv logfile.log logfile.log.1
mv logfile.log.6 logfile.log.7
mv logfile.log.5 logfile.log.6
mv logfile.log.4 logfile.log.5
mv logfile.log.3 logfile.log.4
mv logfile.log.2 logfile.log.3
mv logfile.log.1 logfile.log.2`}</code>
                      </pre>
                      <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-400">
                          This creates a rolling 7-day log archive. Oldest log (day 7) is discarded when new log starts.
                        </p>
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
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Common mv Pitfalls</h2>
                    <p className="text-gray-600 dark:text-gray-400">Critical mistakes to avoid when moving files</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Silent Overwrites (The Biggest Danger)
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <code>mv file1 file2</code> silently destroys file2 if it exists. This is the #1 cause of data loss with mv.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Always use <code>mv -i</code> or set <code>{'alias mv="mv -i"'}</code> in your shell configuration.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      Moving Between Filesystems
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Moving files between different filesystems (e.g., from /home to /tmp) actually does copy+delete, which can fail halfway and leave you with no file at all.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> For cross-filesystem moves, use <code>cp -a</code> then <code>rm</code> to ensure the copy succeeds before deleting.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0 0h-1m1 0v4m-5-4h.01M11 12h2"/>
                      </svg>
                      Wildcard Expansion Surprises
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <code>mv *.txt *.backup</code> doesn't work as expected because <code>*.backup</code> expands before mv runs, causing confusing errors.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Use a loop: <code>{'for f in *.txt; do mv "$f" "${f%.txt}.backup"; done'}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips & Tricks */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-600 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-emerald-200 dark:border-emerald-900">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Professional Tips & Tricks</h2>
                    <p className="text-gray-600 dark:text-gray-400">Industry habits for safe and efficient file movement</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Make mv Interactive by Default</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Add to <code>.bashrc</code> or <code>.zshrc</code>: <code>{'alias mv="mv -i"'}</code>. This simple change prevents countless data loss incidents.
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
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Use Verbose Mode for Scripts</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Always use <code>-v</code> in scripts: <code>{'mv -v source destination'}</code>. This creates an audit trail of what was moved.
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
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Create Undo-able Moves</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Use: <code>{'mv -b file1 file2'}</code> creates <code>file2~</code> backup. Or use: <code>{'mv file1 file2 && echo "mv file2 file1" > undo.sh'}</code>
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
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Test with echo First</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Before complex moves, test with: <code>{'echo mv pattern1 pattern2'}</code> to see what would happen without actually doing it.
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
                          {'"Think about: What happens when you run mv dir1/ dir2/ versus mv dir1 dir2?"'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Create test directories and try both. Check the resulting structure with <code>tree</code> or <code>ls -la</code>.
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
                          {'"Observe carefully: Create two files (a.txt and b.txt), then run mv a.txt b.txt. What happens? Now try mv -i a.txt b.txt."'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> The difference between these two commands is crucial for data safety.
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
                          {'"Try moving a file to a different filesystem (e.g., from /tmp to /home). Use strace mv file1 /home/ to see what really happens."'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Look for "rename" vs "copy" system calls in the strace output.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Section */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-800 mb-8">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Mini Checklist: What to Remember</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 font-bold">1</span>
                    </div>
                    <span><code>mv</code> moves AND renames files</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 font-bold">2</span>
                    </div>
                    <span>Always use <code>mv -i</code> for safety</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 font-bold">3</span>
                    </div>
                    <span><code>mv</code> silently overwrites by default</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 font-bold">4</span>
                    </div>
                    <span>Use wildcards for batch operations</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 font-bold">5</span>
                    </div>
                    <span>Trailing slash affects directory moves</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 font-bold">6</span>
                    </div>
                    <span>Cross-filesystem moves = copy+delete</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 font-bold">7</span>
                    </div>
                    <span>Use <code>-v</code> for verbose output</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 font-bold">8</span>
                    </div>
                    <span>Test complex moves with <code>echo</code> first</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-900 mb-8">
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 rounded-2xl shadow-lg p-6 border-l-4 border-amber-500 dark:border-amber-400 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Teacher's Note</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      The <code>mv</code> command is incredibly powerful but also dangerously silent about overwrites. My strongest recommendation: <strong>always use <code>mv -i</code> or set it as an alias.</strong> The number of students I've seen lose important work to silent overwrites would fill a classroom.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Remember: <code>mv</code> does two jobs (moving and renaming) but has one dangerous default behavior (silent overwriting). Professional system administrators never use plain <code>mv</code> without safety flags in critical operations.
                    </p>
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-amber-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong className="text-amber-600 dark:text-amber-400">Pro Tip from Experience:</strong> Add this to your <code>.bashrc</code> or <code>.zshrc</code>: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{'alias mv="mv -i"'}</code> and <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{'alias cp="cp -i"'}</code>. These two aliases have saved more data than all backup systems combined at our Barrackpore computer lab!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-1000">
              <div className="text-center py-8">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <span className="mr-3 font-semibold">Next Topic: Deleting Files and Directories (rm)</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                  Now that you can move and rename files, learn how to safely delete them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Topic3;