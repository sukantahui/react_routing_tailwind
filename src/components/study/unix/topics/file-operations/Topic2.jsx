import React from 'react';

class Topic2 extends React.Component {
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
            
            @keyframes copyAnimation {
              0% {
                transform: translateX(0) scale(1);
                opacity: 1;
              }
              50% {
                transform: translateX(50px) scale(0.8);
                opacity: 0.7;
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
            
            .copy-animate {
              animation: copyAnimation 1.5s ease-in-out forwards;
            }
            
            /* Respect reduced motion */
            @media (prefers-reduced-motion: reduce) {
              .animate-fade-slide-up,
              .animate-pulse-glow,
              .svg-draw,
              .copy-animate {
                animation: none !important;
                transition: none !important;
              }
            }
          `}
        </style>

        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-all duration-500 ${this.state.isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
                Topic 3: Copying Files and Folders in Linux
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Master file and directory copying with cp, cp -r for recursion, and cp -a for archive mode
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex-1 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">FILE MANAGEMENT</span>
                <div className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
              </div>
            </div>

            {/* Basic cp Command */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-100 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-indigo-600 dark:text-indigo-300 font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Basic cp Command</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-mono mb-3">
                    {'Prototype: cp [options] source destination'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">cp</code> (copy) command copies files and directories. When Swadeep needed to backup his project files before making major changes at Barrackpore school, he used cp to create safe copies.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Example:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Before editing his main configuration file, he created a backup:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'cp config.json config.json.backup'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      This created a backup copy before making changes, a crucial safety practice.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Basic cp */}
                <div className="mb-6">
                  <svg width="100%" height="180" viewBox="0 0 400 180" className="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-cp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ cp document.txt document_backup.txt'}
                    </text>
                    
                    {/* Source File */}
                    <g transform="translate(80, 90)" className="copy-animate">
                      <rect width="60" height="40" rx="3" fill="#a78bfa"/>
                      <text x="30" y="25" textAnchor="middle" fill="#5b21b6" fontSize="10" fontFamily="sans-serif">document.txt</text>
                    </g>
                    
                    {/* Arrow */}
                    <line x1="170" y1="110" x2="230" y2="110" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-cp)" className="svg-draw" />
                    
                    {/* Destination File */}
                    <g transform="translate(260, 90)">
                      <rect width="60" height="40" rx="3" fill="#c4b5fd"/>
                      <text x="30" y="25" textAnchor="middle" fill="#5b21b6" fontSize="10" fontFamily="sans-serif">document_backup.txt</text>
                    </g>
                    
                    {/* Copy Symbol */}
                    <g transform="translate(195, 105)">
                      <rect width="10" height="10" fill="#8b5cf6" opacity="0.7"/>
                      <rect x="5" y="5" width="10" height="10" fill="#8b5cf6"/>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Purpose & Usage:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Create duplicate files for backup purposes</li>
                      <li>Copy files to different directories</li>
                      <li>Rename files while copying</li>
                      <li>Create multiple copies with different names</li>
                      <li>Prepare files for distribution or sharing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Basic Options:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-i</code> - Interactive mode (prompt before overwrite)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-n</code> - No clobber (don't overwrite existing)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-v</code> - Verbose (show what's being copied)</li>
                      <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">-u</code> - Update (copy only when source is newer)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* cp -r for Recursive Copy */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-200 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-green-600 dark:text-green-300 font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">cp -r (Recursive Copy)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-mono mb-3">
                    {'Prototype: cp -r source_directory destination_directory'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-r</code> or <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-R</code> flag enables recursive copying, allowing you to copy entire directory structures including all subdirectories and their contents. When Abhronila needed to backup her entire project from Ichapur lab to an external drive, she used cp -r.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Scenario:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      She backed up her semester project with all its subdirectories:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'cp -r semester_project /media/external_drive/backups/'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      This copied the entire project directory structure, preserving all files and folders.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Recursive Copy */}
                <div className="mb-6">
                  <svg width="100%" height="250" viewBox="0 0 400 250" className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-recursive" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ cp -r project/ backup/'}
                    </text>
                    
                    {/* Source Directory Structure */}
                    <g transform="translate(50, 90)">
                      <rect width="80" height="45" rx="5" fill="#86efac"/>
                      <rect x="10" y="45" width="60" height="25" rx="3" fill="#86efac"/>
                      <text x="40" y="30" textAnchor="middle" fill="#065f46" fontSize="10" fontFamily="sans-serif" fontWeight="bold">project</text>
                      
                      {/* Subdirectories */}
                      <g transform="translate(5, 75)">
                        <rect width="20" height="15" rx="2" fill="#86efac"/>
                        <text x="10" y="10" textAnchor="middle" fill="#065f46" fontSize="6" fontFamily="sans-serif">src</text>
                      </g>
                      <g transform="translate(30, 75)">
                        <rect width="20" height="15" rx="2" fill="#86efac"/>
                        <text x="10" y="10" textAnchor="middle" fill="#065f46" fontSize="6" fontFamily="sans-serif">docs</text>
                      </g>
                      <g transform="translate(55, 75)">
                        <rect width="20" height="15" rx="2" fill="#86efac"/>
                        <text x="10" y="10" textAnchor="middle" fill="#065f46" fontSize="6" fontFamily="sans-serif">data</text>
                      </g>
                    </g>
                    
                    {/* Arrow */}
                    <line x1="150" y1="115" x2="250" y2="115" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-recursive)" className="svg-draw" />
                    
                    {/* Destination Directory Structure */}
                    <g transform="translate(270, 90)">
                      <rect width="80" height="45" rx="5" fill="#86efac"/>
                      <rect x="10" y="45" width="60" height="25" rx="3" fill="#86efac"/>
                      <text x="40" y="30" textAnchor="middle" fill="#065f46" fontSize="10" fontFamily="sans-serif" fontWeight="bold">backup</text>
                      
                      {/* Subdirectories */}
                      <g transform="translate(5, 75)">
                        <rect width="20" height="15" rx="2" fill="#86efac"/>
                        <text x="10" y="10" textAnchor="middle" fill="#065f46" fontSize="6" fontFamily="sans-serif">src</text>
                      </g>
                      <g transform="translate(30, 75)">
                        <rect width="20" height="15" rx="2" fill="#86efac"/>
                        <text x="10" y="10" textAnchor="middle" fill="#065f46" fontSize="6" fontFamily="sans-serif">docs</text>
                      </g>
                      <g transform="translate(55, 75)">
                        <rect width="20" height="15" rx="2" fill="#86efac"/>
                        <text x="10" y="10" textAnchor="middle" fill="#065f46" fontSize="6" fontFamily="sans-serif">data</text>
                      </g>
                    </g>
                    
                    {/* Recursive Symbol */}
                    <g transform="translate(200, 100)">
                      <circle cx="0" cy="0" r="8" fill="#10b981" opacity="0.3"/>
                      <circle cx="0" cy="0" r="5" fill="#10b981" opacity="0.6"/>
                      <circle cx="0" cy="0" r="2" fill="#10b981"/>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">When to Use -r:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Backup entire project directories</li>
                      <li>Copy website structures for deployment</li>
                      <li>Duplicate configuration directory trees</li>
                      <li>Migrate data between storage locations</li>
                      <li>Create mirror copies for testing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Important Notes:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Always use trailing slash <code>/</code> for clarity</li>
                      <li>Use <code>-v</code> with <code>-r</code> to see progress</li>
                      <li>Consider using <code>-p</code> to preserve permissions</li>
                      <li>Be cautious with symbolic links (use <code>-L</code> or <code>-P</code>)</li>
                      <li>Check disk space before large recursive copies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* cp -a for Archive Mode */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-300 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-purple-600 dark:text-purple-300 font-bold">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">cp -a (Archive Mode)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-mono mb-3">
                    {'Prototype: cp -a source destination'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-red-600 dark:text-red-400">-a</code> flag stands for "archive" and is equivalent to <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">-dR --preserve=all</code>. It preserves all file attributes: permissions, ownership, timestamps, symbolic links, and more. When Debangshu needed to create an exact backup of a production server configuration at Naihati data center, he used cp -a.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Real-world Scenario:</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      He created an exact archival copy of critical configuration files:
                    </p>
                    <pre className="mt-2 p-3 bg-gray-800 text-green-300 rounded-lg overflow-x-auto">
                      <code>{'cp -a /etc/nginx/ /backup/nginx_config_$(date +%Y%m%d)/'}</code>
                    </pre>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      This preserved all permissions, timestamps, and symbolic links for exact restoration if needed.
                    </p>
                  </div>
                </div>

                {/* SVG Illustration - Archive Mode */}
                <div className="mb-6">
                  <svg width="100%" height="280" viewBox="0 0 400 280" className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-4">
                    <defs>
                      <marker id="arrow-archive" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                      </marker>
                    </defs>
                    
                    {/* Terminal */}
                    <rect x="20" y="20" width="360" height="40" rx="5" fill="#1f2937" className="group-hover:fill-gray-800 transition-colors duration-300"/>
                    <text x="40" y="40" fill="#10b981" fontFamily="monospace" fontSize="12">
                      {'$ cp -a original/ archive/'}
                    </text>
                    
                    {/* Source with Metadata */}
                    <g transform="translate(50, 90)">
                      <rect width="100" height="60" rx="5" fill="#d8b4fe"/>
                      <text x="50" y="25" textAnchor="middle" fill="#6b21a8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Original</text>
                      
                      {/* Metadata indicators */}
                      <g transform="translate(10, 40)">
                        <circle cx="5" cy="0" r="3" fill="#a855f7"/>
                        <text x="10" y="3" fill="#6b21a8" fontSize="6" fontFamily="monospace">perms: 755</text>
                      </g>
                      <g transform="translate(10, 50)">
                        <circle cx="5" cy="0" r="3" fill="#a855f7"/>
                        <text x="10" y="3" fill="#6b21a8" fontSize="6" fontFamily="monospace">owner: root</text>
                      </g>
                      <g transform="translate(60, 40)">
                        <circle cx="5" cy="0" r="3" fill="#a855f7"/>
                        <text x="10" y="3" fill="#6b21a8" fontSize="6" fontFamily="monospace">timestamp</text>
                      </g>
                      <g transform="translate(60, 50)">
                        <circle cx="5" cy="0" r="3" fill="#a855f7"/>
                        <text x="10" y="3" fill="#6b21a8" fontSize="6" fontFamily="monospace">symlinks</text>
                      </g>
                    </g>
                    
                    {/* Arrow */}
                    <line x1="180" y1="120" x2="220" y2="120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-archive)" className="svg-draw" />
                    
                    {/* Archive with Preserved Metadata */}
                    <g transform="translate(240, 90)">
                      <rect width="100" height="60" rx="5" fill="#e9d5ff"/>
                      <text x="50" y="25" textAnchor="middle" fill="#6b21a8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Archive</text>
                      
                      {/* Preserved Metadata indicators */}
                      <g transform="translate(10, 40)">
                        <circle cx="5" cy="0" r="3" fill="#a855f7"/>
                        <text x="10" y="3" fill="#6b21a8" fontSize="6" fontFamily="monospace">perms: 755</text>
                      </g>
                      <g transform="translate(10, 50)">
                        <circle cx="5" cy="0" r="3" fill="#a855f7"/>
                        <text x="10" y="3" fill="#6b21a8" fontSize="6" fontFamily="monospace">owner: root</text>
                      </g>
                      <g transform="translate(60, 40)">
                        <circle cx="5" cy="0" r="3" fill="#a855f7"/>
                        <text x="10" y="3" fill="#6b21a8" fontSize="6" fontFamily="monospace">timestamp</text>
                      </g>
                      <g transform="translate(60, 50)">
                        <circle cx="5" cy="0" r="3" fill="#a855f7"/>
                        <text x="10" y="3" fill="#6b21a8" fontSize="6" fontFamily="monospace">symlinks</text>
                      </g>
                    </g>
                    
                    {/* Archive Symbol */}
                    <g transform="translate(200, 170)">
                      <rect width="40" height="30" rx="3" fill="#a855f7" opacity="0.2"/>
                      <rect x="5" y="5" width="30" height="20" rx="2" fill="#a855f7" opacity="0.5"/>
                      <text x="20" y="18" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">-a</text>
                    </g>
                    
                    {/* Preserved Attributes Legend */}
                    <g transform="translate(100, 200)">
                      <text x="0" y="0" fill="#6b21a8" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Preserved by -a:</text>
                      <g transform="translate(0, 15)">
                        <rect width="8" height="8" rx="1" fill="#a855f7"/>
                        <text x="15" y="7" fill="#6b21a8" fontSize="7" fontFamily="monospace">Permissions</text>
                      </g>
                      <g transform="translate(0, 30)">
                        <rect width="8" height="8" rx="1" fill="#a855f7"/>
                        <text x="15" y="7" fill="#6b21a8" fontSize="7" fontFamily="monospace">Ownership</text>
                      </g>
                      <g transform="translate(120, 15)">
                        <rect width="8" height="8" rx="1" fill="#a855f7"/>
                        <text x="15" y="7" fill="#6b21a8" fontSize="7" fontFamily="monospace">Timestamps</text>
                      </g>
                      <g transform="translate(120, 30)">
                        <rect width="8" height="8" rx="1" fill="#a855f7"/>
                        <text x="15" y="7" fill="#6b21a8" fontSize="7" fontFamily="monospace">Symbolic Links</text>
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">What -a Preserves:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>File permissions (mode)</li>
                      <li>Ownership (user and group)</li>
                      <li>Timestamps (access, modify, change)</li>
                      <li>Symbolic links (as links, not targets)</li>
                      <li>Extended attributes (xattr)</li>
                      <li>Contexts (SELinux, etc.)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">When to Use Archive Mode:</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Server configuration backups</li>
                      <li>Deployment to production systems</li>
                      <li>Creating exact mirrors for forensic analysis</li>
                      <li>Migrating systems with special permissions</li>
                      <li>Backup before major system upgrades</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-400 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">cp Options Comparison</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-4 py-3">Command</th>
                        <th className="px-4 py-3">Copies</th>
                        <th className="px-4 py-3">Preserves</th>
                        <th className="px-4 py-3">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">cp file1 file2</code>
                        </td>
                        <td className="px-4 py-3">Single file</td>
                        <td className="px-4 py-3">Basic content only</td>
                        <td className="px-4 py-3">Simple file backups</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{'cp -r dir1/ dir2/'}</code>
                        </td>
                        <td className="px-4 py-3">Directories recursively</td>
                        <td className="px-4 py-3">Structure and content</td>
                        <td className="px-4 py-3">Project backups</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{'cp -p file1 file2'}</code>
                        </td>
                        <td className="px-4 py-3">Files with permissions</td>
                        <td className="px-4 py-3">Permissions & timestamps</td>
                        <td className="px-4 py-3">System file copies</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{'cp -a source/ dest/'}</code>
                        </td>
                        <td className="px-4 py-3">Everything recursively</td>
                        <td className="px-4 py-3">All attributes (archive)</td>
                        <td className="px-4 py-3">Exact system backups</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Professional Recommendation:</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tuhina from Shyamnagar tech institute follows this rule: <strong>"For regular files, use cp -i for safety. For directories, use cp -r. For system backups, always use cp -a."</strong> This approach balances safety, functionality, and preservation needs.
                  </p>
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
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Common cp Pitfalls</h2>
                    <p className="text-gray-600 dark:text-gray-400">Critical mistakes to avoid when copying files</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Silent Overwrites
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      By default, <code>cp</code> silently overwrites existing files without warning. Beginners often lose important data this way.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Always use <code>cp -i</code> (interactive) or <code>cp -n</code> (no clobber) for important copies.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      Forgetting -r for Directories
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Trying <code>cp directory/ destination/</code> without <code>-r</code> gives "omitting directory" error. Beginners think the command failed.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Remember that directories need <code>-r</code> or <code>-a</code> flag to copy contents.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0 0h-1m1 0v4m-5-4h.01M11 12h2"/>
                      </svg>
                      Trailing Slash Confusion
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <code>cp -r dir1 dir2</code> creates dir2/dir1/, while <code>cp -r dir1/ dir2</code> copies contents into dir2/. This subtle difference causes confusion.
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      <strong>Solution:</strong> Be consistent: use trailing slash when copying contents, no slash when copying the directory itself.
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
                    <p className="text-gray-600 dark:text-gray-400">Industry habits for safe and efficient copying</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3 mt-1">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Always Use Aliases for Safety</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Add to <code>.bashrc</code>: <code>{'alias cp="cp -i"'}</code> to make cp interactive by default. This prevents accidental overwrites.
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
                          Always use <code>-v</code> in scripts: <code>{'cp -rv source/ destination/'}</code>. This creates a log of what was copied for debugging.
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
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Timestamp-Based Backups</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Use: <code>{'cp -a /data/ /backup/data_$(date +%Y%m%d_%H%M%S)/'}</code>. This creates timestamped backups that don't overwrite previous ones.
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
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Check Before Large Copies</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Use <code>du -sh source/</code> to check size, and <code>df -h .</code> to check available space before large recursive copies.
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
                          {'"Think about: What\'s the difference between cp -r dir1 dir2 and cp -r dir1/ dir2?"'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Try both commands, then check the resulting directory structure with <code>ls -la</code>.
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
                          {'"Observe carefully: Create a file with specific permissions (chmod 644), then copy it with cp, cp -p, and cp -a. Check permissions after each."'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Use <code>ls -l</code> to compare permissions. What do you notice about each method?
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
                          {'"Try copying a symbolic link: ln -s target.txt link.txt, then cp link.txt copy1.txt and cp -a link.txt copy2.txt. What\'s different?"'}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          <strong>Hint:</strong> Use <code>ls -l</code> and <code>cat</code> on the copies. Which preserved the link vs copied the target?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Section */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-800 mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Mini Checklist: What to Remember</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">1</span>
                    </div>
                    <span><code>cp</code> copies single files</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">2</span>
                    </div>
                    <span><code>cp -r</code> copies directories recursively</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">3</span>
                    </div>
                    <span><code>cp -a</code> preserves all attributes</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">4</span>
                    </div>
                    <span>Always use <code>-i</code> for safety</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">5</span>
                    </div>
                    <span>Use <code>-v</code> to see progress</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">6</span>
                    </div>
                    <span>Mind the trailing slash <code>/</code></span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">7</span>
                    </div>
                    <span>Check disk space before large copies</span>
                  </div>
                  <div className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-bold">8</span>
                    </div>
                    <span>Use timestamps for backup names</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-900 mb-8">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500 dark:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Teacher's Note</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      The <code>cp</code> command is deceptively simple but has powerful options that professionals use daily. Remember this hierarchy: <strong>Use cp for files, cp -r for directories, and cp -a for exact backups.</strong> Each serves a specific purpose in professional workflows.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Safety first: Always consider using <code>cp -i</code> or setting it as an alias. The few seconds spent confirming overwrites can prevent hours of data recovery. For system administration work, <code>cp -a</code> is non-negotiable for preserving permissions and ownership.
                    </p>
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-indigo-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong className="text-indigo-600 dark:text-indigo-400">Pro Tip from Experience:</strong> Create a backup function in your shell profile: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{'function backup() { cp -a "$1" "$1.backup.$(date +%Y%m%d_%H%M%S)" && echo "Backup created: $1.backup.$(date +%Y%m%d_%H%M%S)" ; }'}</code>. This gives you timestamped, archived backups with a simple <code>backup filename</code> command!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="animate-fade-slide-up motion-safe:animate-fade-slide-up animation-delay-1000">
              <div className="text-center py-8">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <span className="mr-3 font-semibold">Next Topic: Moving and Renaming Files (mv)</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                  Now that you can copy files, learn how to move and rename them efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Topic2;