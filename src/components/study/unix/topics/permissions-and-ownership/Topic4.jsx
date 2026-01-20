import React from 'react';
import clsx from 'clsx';

class Topic4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false,
            isReducedMotion: false,
            activeTab: 'concept',
            showWarning: false,
            warningLevel: 'info',
            simulatedPath: '~/project',
            simulateRecursive: false
        };
    }

    componentDidMount() {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.setState({ isReducedMotion: mediaQuery.matches });

        // Listen for changes
        mediaQuery.addEventListener('change', this.handleMotionPreferenceChange);

        // Check initial color scheme
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.setState({ isDarkMode: darkModeMediaQuery.matches });

        // Listen for color scheme changes
        darkModeMediaQuery.addEventListener('change', this.handleColorSchemeChange);
    }

    componentWillUnmount() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        mediaQuery.removeEventListener('change', this.handleMotionPreferenceChange);
        darkModeMediaQuery.removeEventListener('change', this.handleColorSchemeChange);
    }

    handleMotionPreferenceChange = (e) => {
        this.setState({ isReducedMotion: e.matches });
    };

    handleColorSchemeChange = (e) => {
        this.setState({ isDarkMode: e.matches });
    };

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab });
    };

    handleShowWarning = (level) => {
        this.setState({
            showWarning: true,
            warningLevel: level
        });

        // Auto hide after 5 seconds
        setTimeout(() => {
            this.setState({ showWarning: false });
        }, 5000);
    };

    toggleSimulation = () => {
        this.setState({ simulateRecursive: !this.state.simulateRecursive });
    };

    render() {
        const { isDarkMode, isReducedMotion, activeTab, showWarning, warningLevel, simulatedPath, simulateRecursive } = this.state;
        const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
        const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
        const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';
        const extraStaggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]';

        const fileStructure = [
            { name: 'project/', type: 'directory', permissions: 'drwxr-xr-x', depth: 0 },
            { name: 'src/', type: 'directory', permissions: 'drwxr-xr-x', depth: 1 },
            { name: 'main.py', type: 'file', permissions: '-rw-r--r--', depth: 2 },
            { name: 'utils.py', type: 'file', permissions: '-rw-r--r--', depth: 2 },
            { name: 'config/', type: 'directory', permissions: 'drwxr-xr-x', depth: 1 },
            { name: 'settings.cfg', type: 'file', permissions: '-rw-------', depth: 2 },
            { name: 'data/', type: 'directory', permissions: 'drwxr-xr-x', depth: 1 },
            { name: 'logs/', type: 'directory', permissions: 'drwxrwxr-x', depth: 1 },
            { name: 'access.log', type: 'file', permissions: '-rw-r--r--', depth: 2 },
            { name: 'README.md', type: 'file', permissions: '-rw-r--r--', depth: 0 }
        ];

        return (
            <div className={clsx(
                "min-h-screen transition-all duration-500",
                isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
            )}>
                <style>
                    {`
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
            
            @keyframes warningFlash {
              0%, 100% {
                background-color: rgba(239, 68, 68, 0.1);
              }
              50% {
                background-color: rgba(239, 68, 68, 0.3);
              }
            }
            
            @keyframes recursiveSpread {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.05); opacity: 0.8; }
              100% { transform: scale(1); opacity: 1; }
            }
            
            .warning-animate {
              animation: warningFlash 1s ease-in-out 3;
            }
            
            .recursive-animate {
              animation: recursiveSpread 2s ease-in-out infinite;
            }
            
            @keyframes fileChange {
              0% { background-color: inherit; }
              50% { background-color: rgba(59, 130, 246, 0.3); }
              100% { background-color: inherit; }
            }
            
            .file-changing {
              animation: fileChange 1s ease-in-out;
            }
          `}
                </style>

                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    {/* Header Section */}
                    <header className={`mb-12 ${animationClass} opacity-0`}>
                        <h1 className="text-4xl font-bold mb-4 leading-relaxed">
                            Recursive Permission Changes: chmod -R and Real-World Dangers
                        </h1>
                        <p className="text-lg opacity-80">
                            Topic 5: The nuclear option for permissions - powerful but dangerous
                        </p>
                        <div className="h-1 w-24 bg-red-500 mt-4 rounded-full"></div>
                    </header>

                    {/* Warning Banner */}
                    {showWarning && (
                        <div className={`mb-8 p-4 rounded-xl border transition-all duration-300 ${warningLevel === 'danger' ? 'warning-animate' : ''} ${warningLevel === 'danger'
                                ? 'bg-red-900/20 border-red-700/50'
                                : warningLevel === 'warning'
                                    ? 'bg-yellow-900/20 border-yellow-700/50'
                                    : 'bg-blue-900/20 border-blue-700/50'
                            } ${delayClass} opacity-0`}>
                            <div className="flex items-center">
                                <div className={clsx(
                                    "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                    warningLevel === 'danger' ? 'bg-red-500' : warningLevel === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                )}>
                                    {warningLevel === 'danger' ? '⚠️' : warningLevel === 'warning' ? '⚠️' : 'ℹ️'}
                                </div>
                                <div>
                                    <h3 className="font-bold">
                                        {warningLevel === 'danger' ? 'DANGER' : warningLevel === 'warning' ? 'WARNING' : 'INFO'}
                                    </h3>
                                    <p className="text-sm">
                                        {warningLevel === 'danger'
                                            ? 'Recursive chmod can break your system! Always verify path and permissions.'
                                            : warningLevel === 'warning'
                                                ? 'Use -R with caution. Test on a copy first.'
                                                : 'Remember: With great power comes great responsibility.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* The -R Flag Explained */}
                        <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
                            <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                                The -R Flag: Recursive Operation
                            </h2>

                            <div className="mb-8">
                                <div className={clsx(
                                    "p-6 rounded-xl mb-6 text-center",
                                    isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                                )}>
                                    <div className="text-3xl font-bold mb-4">
                                        <span className="text-red-400">chmod -R</span> <span className="text-gray-400">permissions</span> <span className="text-green-400">path</span>
                                    </div>

                                    {/* SVG Visualization */}
                                    <div className="mb-8 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                                        <svg
                                            width="100%"
                                            height="200"
                                            viewBox="0 0 800 200"
                                            className="overflow-visible"
                                        >
                                            {/* Directory Tree */}
                                            <g>
                                                {/* Root directory */}
                                                <g>
                                                    <rect x="350" y="20" width="100" height="40" rx="8"
                                                        fill={isDarkMode ? "#1D4ED8" : "#3B82F6"}
                                                        fillOpacity="0.3"
                                                        stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"}
                                                        strokeWidth="2" />
                                                    <text x="400" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">project/</text>
                                                    <text x="400" y="60" textAnchor="middle" fill={isDarkMode ? "#93C5FD" : "#1E40AF"} fontSize="10">drwxr-xr-x</text>
                                                </g>

                                                {/* Arrow from command */}
                                                <path d="M400 70 L400 90" stroke={isDarkMode ? "#6B7280" : "#9CA3AF"} strokeWidth="2" fill="none" />
                                                <text x="400" y="85" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="12">chmod -R 755</text>

                                                {/* Subdirectories */}
                                                <g>
                                                    {/* src/ */}
                                                    <g className={simulateRecursive ? "recursive-animate" : ""}>
                                                        <rect x="200" y="110" width="80" height="35" rx="6"
                                                            fill={isDarkMode ? "#059669" : "#10B981"}
                                                            fillOpacity="0.3"
                                                            stroke={isDarkMode ? "#34D399" : "#059669"}
                                                            strokeWidth="2" />
                                                        <text x="240" y="132" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">src/</text>
                                                        <path d="M350 60 L240 110" stroke={isDarkMode ? "#6B7280" : "#9CA3AF"} strokeWidth="1" fill="none" strokeDasharray="3,3" />
                                                    </g>

                                                    {/* config/ */}
                                                    <g className={simulateRecursive ? "recursive-animate" : ""} style={{ animationDelay: '0.2s' }}>
                                                        <rect x="350" y="110" width="80" height="35" rx="6"
                                                            fill={isDarkMode ? "#7C3AED" : "#8B5CF6"}
                                                            fillOpacity="0.3"
                                                            stroke={isDarkMode ? "#A78BFA" : "#7C3AED"}
                                                            strokeWidth="2" />
                                                        <text x="390" y="132" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">config/</text>
                                                        <path d="M400 60 L390 110" stroke={isDarkMode ? "#6B7280" : "#9CA3AF"} strokeWidth="1" fill="none" strokeDasharray="3,3" />
                                                    </g>

                                                    {/* data/ */}
                                                    <g className={simulateRecursive ? "recursive-animate" : ""} style={{ animationDelay: '0.4s' }}>
                                                        <rect x="500" y="110" width="80" height="35" rx="6"
                                                            fill={isDarkMode ? "#DC2626" : "#EF4444"}
                                                            fillOpacity="0.3"
                                                            stroke={isDarkMode ? "#F87171" : "#DC2626"}
                                                            strokeWidth="2" />
                                                        <text x="540" y="132" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">data/</text>
                                                        <path d="M400 60 L540 110" stroke={isDarkMode ? "#6B7280" : "#9CA3AF"} strokeWidth="1" fill="none" strokeDasharray="3,3" />
                                                    </g>
                                                </g>

                                                {/* Files */}
                                                <g>
                                                    <circle cx="240" cy="170" r="8" fill={isDarkMode ? "#60A5FA" : "#3B82F6"} className={simulateRecursive ? "file-changing" : ""} />
                                                    <text x="240" y="175" textAnchor="middle" fill="white" fontSize="8">main.py</text>

                                                    <circle cx="280" cy="170" r="8" fill={isDarkMode ? "#60A5FA" : "#3B82F6"} className={simulateRecursive ? "file-changing" : ""} style={{ animationDelay: '0.1s' }} />
                                                    <text x="280" y="175" textAnchor="middle" fill="white" fontSize="8">utils.py</text>

                                                    <circle cx="390" cy="170" r="8" fill={isDarkMode ? "#A78BFA" : "#8B5CF6"} className={simulateRecursive ? "file-changing" : ""} style={{ animationDelay: '0.3s' }} />
                                                    <text x="390" y="175" textAnchor="middle" fill="white" fontSize="8">config.cfg</text>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-lg mb-4">
                                            The <code>-R</code> flag applies permissions recursively to all files and subdirectories
                                        </p>
                                        <button
                                            onClick={this.toggleSimulation}
                                            className={clsx(
                                                "px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105",
                                                isDarkMode
                                                    ? simulateRecursive ? "bg-red-600" : "bg-blue-600 hover:bg-blue-500"
                                                    : simulateRecursive ? "bg-red-500" : "bg-blue-500 hover:bg-blue-400"
                                            )}
                                        >
                                            {simulateRecursive ? 'Stop Simulation' : 'Simulate Recursive Change'}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className={clsx(
                                        "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                                        isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"
                                    )}>
                                        <h4 className="font-bold text-blue-400 mb-3">How It Works</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start">
                                                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                                                <span>Starts at the specified directory</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                                                <span>Applies permissions to the directory itself</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                                                <span>Descends into each subdirectory</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                                                <span>Continues until all items are processed</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={clsx(
                                        "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                                        isDarkMode ? "bg-green-900/20 hover:bg-green-900/30" : "bg-green-50 hover:bg-green-100"
                                    )}>
                                        <h4 className="font-bold text-green-400 mb-3">Common Use Cases</h4>
                                        <div className="space-y-2 text-sm">
                                            <p>• Web server directory setup</p>
                                            <p>• Project deployment scripts</p>
                                            <p>• Shared team directories</p>
                                            <p>• Backup restoration</p>
                                            <p>• System maintenance scripts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tab Navigation */}
                        <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
                            <div className="flex space-x-2 mb-6 overflow-x-auto">
                                {['concept', 'dangers', 'safety', 'examples'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => this.handleTabChange(tab)}
                                        className={clsx(
                                            "px-4 py-2 rounded-lg transition-all duration-300 capitalize",
                                            activeTab === tab
                                                ? isDarkMode
                                                    ? "bg-yellow-600 text-white"
                                                    : "bg-yellow-500 text-white"
                                                : isDarkMode
                                                    ? "bg-gray-800 hover:bg-gray-700"
                                                    : "bg-gray-200 hover:bg-gray-300"
                                        )}
                                    >
                                        {tab === 'concept' && 'Concept'}
                                        {tab === 'dangers' && 'Real Dangers'}
                                        {tab === 'safety' && 'Safety Measures'}
                                        {tab === 'examples' && 'Examples'}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="mt-6">
                                {activeTab === 'concept' && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-blue-400">Understanding Recursive Execution</h3>
                                        <div className="space-y-4">
                                            <p>
                                                When you run <code>chmod -R 755 /path/to/directory</code>, the system:
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className={clsx(
                                                    "p-4 rounded-lg",
                                                    isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                                                )}>
                                                    <h4 className="font-bold text-green-400 mb-3">Order of Operations</h4>
                                                    <ol className="space-y-2 text-sm list-decimal pl-4">
                                                        <li>Change permissions on the starting directory</li>
                                                        <li>Process each file in the directory</li>
                                                        <li>For each subdirectory, repeat steps 1-2</li>
                                                        <li>Continue depth-first through the tree</li>
                                                    </ol>
                                                </div>

                                                <div className={clsx(
                                                    "p-4 rounded-lg",
                                                    isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                                                )}>
                                                    <h4 className="font-bold text-purple-400 mb-3">File vs Directory Impact</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                                                            <span>Directories:</span>
                                                            <code>drwxr-xr-x</code>
                                                        </div>
                                                        <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                                                            <span>Files:</span>
                                                            <code>-rwxr-xr-x</code>
                                                        </div>
                                                        <p className="text-xs opacity-80 mt-2">
                                                            Same numeric value, different meanings!
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={clsx(
                                                "p-4 rounded-lg border-l-4",
                                                isDarkMode ? "border-blue-500/50 bg-blue-900/10" : "border-blue-400 bg-blue-50"
                                            )}>
                                                <h4 className="font-bold text-blue-400 mb-2">Real Scenario: Swadeep's Web Project</h4>
                                                <p className="text-sm">
                                                    <span className="font-semibold">Swadeep</span> at Barrackpore College deploys a website.
                                                    He needs all files executable for CGI scripts. Without thinking, he runs:
                                                </p>
                                                <div className="font-mono p-3 bg-black/20 rounded mt-2">
                                                    $ chmod -R 755 /var/www/html
                                                </div>
                                                <p className="text-sm mt-2 text-yellow-400">
                                                    Result: Configuration files (.cfg, .ini) become executable - a security risk!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'dangers' && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-red-400">Real-World Dangers & Horror Stories</h3>

                                        <div className="space-y-6">
                                            <div className={clsx(
                                                "p-5 rounded-xl border-l-4",
                                                isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                                            )}>
                                                <h4 className="font-bold text-red-400 mb-3">⚠️ Danger 1: Breaking System Security</h4>
                                                <div className="space-y-3">
                                                    <p className="text-sm">
                                                        The most common mistake: Running recursive chmod from root directory
                                                    </p>
                                                    <div className="font-mono p-3 bg-black/20 rounded text-red-400">
                                                        $ sudo chmod -R 777 /  # SYSTEM MELTDOWN!
                                                    </div>
                                                    <div className="text-sm">
                                                        <span className="font-semibold">What happens:</span>
                                                    </div>
                                                    <ul className="text-sm space-y-1 ml-4">
                                                        <li>• /etc/shadow becomes world-writable</li>
                                                        <li>• System binaries lose executable permission</li>
                                                        <li>• SSH keys become readable by everyone</li>
                                                        <li>• System becomes unstable or unbootable</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className={clsx(
                                                "p-5 rounded-xl border-l-4",
                                                isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                                            )}>
                                                <h4 className="font-bold text-yellow-400 mb-3">⚠️ Danger 2: Accidental Execute on Files</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <p className="text-sm mb-3">
                                                            <span className="font-semibold">Tuhina's</span> mistake at Shyamnagar lab:
                                                        </p>
                                                        <div className="font-mono text-sm p-3 bg-black/20 rounded">
                                                            $ chmod -R 755 data_files/
                                                        </div>
                                                        <p className="text-sm mt-2">
                                                            Made all .csv, .txt, .pdf files executable
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm">
                                                            <span className="font-semibold">Problems created:</span>
                                                        </div>
                                                        <ul className="text-sm space-y-1 mt-2">
                                                            <li>• Security scanners flag all files</li>
                                                            <li>• Backup systems treat them as executables</li>
                                                            <li>• Web servers might try to execute them</li>
                                                            <li>• Confusion in file management</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={clsx(
                                                "p-5 rounded-xl border-l-4",
                                                isDarkMode ? "border-purple-500/50 bg-purple-900/10" : "border-purple-400 bg-purple-50"
                                            )}>
                                                <h4 className="font-bold text-purple-400 mb-3">⚠️ Danger 3: Symbolic Link Traversal</h4>
                                                <div className="space-y-3">
                                                    <p className="text-sm">
                                                        Recursive chmod follows symbolic links by default!
                                                    </p>
                                                    <div className="font-mono p-3 bg-black/20 rounded">
                                                        project/<br />
                            ├── data/ -> /mnt/important_data/<br />
                                                        └── src/
                                                    </div>
                                                    <div className="font-mono p-3 bg-black/20 rounded">
                                                        $ chmod -R 700 project/
                                                    </div>
                                                    <p className="text-sm text-red-400">
                                                        This locks everyone out of /mnt/important_data/!
                                                    </p>
                                                    <div className="text-xs opacity-80">
                                                        Solution: Use <code>chmod -R -h</code> to not follow symlinks
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => this.handleShowWarning('danger')}
                                                className={clsx(
                                                    "w-full p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                                                    isDarkMode ? "bg-red-900/20 hover:bg-red-900/30 border border-red-700/30" : "bg-red-50 hover:bg-red-100 border border-red-200"
                                                )}
                                            >
                                                <div className="flex items-center justify-center">
                                                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-3">
                                                        <span className="text-white">!</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="font-bold">Click to See Warning</div>
                                                        <div className="text-sm opacity-80">Simulate a real danger warning</div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'safety' && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-green-400">Safety Measures & Best Practices</h3>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className={clsx(
                                                    "p-4 rounded-lg",
                                                    isDarkMode ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                                                )}>
                                                    <h4 className="font-bold text-green-400 mb-3">✅ Safety Check 1: Verify Path</h4>
                                                    <div className="space-y-3 text-sm">
                                                        <p>Always double-check your current directory:</p>
                                                        <div className="font-mono p-2 bg-black/20 rounded">
                                                            $ pwd<br />
                                                            /home/swadeep/project
                                                        </div>
                                                        <p>Use absolute paths for clarity:</p>
                                                        <div className="font-mono p-2 bg-black/20 rounded">
                                                            $ chmod -R 755 /home/swadeep/project
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={clsx(
                                                    "p-4 rounded-lg",
                                                    isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                                                )}>
                                                    <h4 className="font-bold text-blue-400 mb-3">✅ Safety Check 2: Dry Run First</h4>
                                                    <div className="space-y-3 text-sm">
                                                        <p>Use find to preview what will be affected:</p>
                                                        <div className="font-mono p-2 bg-black/20 rounded">
                                                            $ find project/ -type f | head -5
                                                        </div>
                                                        <p>Or simulate with echo:</p>
                                                        <div className="font-mono p-2 bg-black/20 rounded">
                                                            $ find project/ -exec echo chmod 755 { } \;
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={clsx(
                                                "p-5 rounded-xl",
                                                isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                                            )}>
                                                <h4 className="font-bold text-yellow-400 mb-4">Professional Safety Protocol</h4>
                                                <div className="space-y-4">
                                                    <div className="flex items-start">
                                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                                            <span className="text-white">1</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Backup First:</span> Always backup before recursive operations
                                                            <div className="text-xs opacity-80 mt-1">$ tar -czf backup.tar.gz project/</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start">
                                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                                            <span className="text-white">2</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Test on Copy:</span> Test commands on a copy first
                                                            <div className="text-xs opacity-80 mt-1">$ cp -r project/ project_test/</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start">
                                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                                            <span className="text-white">3</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Use Specific Types:</span> Use find with -type for precision
                                                            <div className="text-xs opacity-80 mt-1">
                                                                $ find . -type f -exec chmod 644 { } \;<br />
                                                                $ find . -type d -exec chmod 755 { } \;
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start">
                                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                                            <span className="text-white">4</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold">Check Symlinks:</span> Be aware of symbolic links
                                                            <div className="text-xs opacity-80 mt-1">$ find . -type l -ls</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => this.handleShowWarning('info')}
                                                className={clsx(
                                                    "w-full p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                                                    isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30 border border-blue-700/30" : "bg-blue-50 hover:bg-blue-100 border border-blue-200"
                                                )}
                                            >
                                                <div className="flex items-center justify-center">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                                        <span className="text-white">i</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="font-bold">Safety Reminder</div>
                                                        <div className="text-sm opacity-80">Always follow safety protocols</div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'examples' && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-purple-400">Practical Examples & Solutions</h3>

                                        <div className="space-y-6">
                                            <div className={clsx(
                                                "p-5 rounded-xl",
                                                isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                                            )}>
                                                <h4 className="font-bold text-purple-400 mb-4">Example 1: Web Directory Setup</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <p className="text-sm mb-3">
                                                            <span className="font-semibold">Abhronila</span> at Ichapur Institute needs to set up a web directory:
                                                        </p>
                                                        <div className="text-sm">
                                                            <div className="font-semibold">Requirements:</div>
                                                            <ul className="mt-1 space-y-1">
                                                                <li>• Directories: 755 (read and enter)</li>
                                                                <li>• HTML/CSS/JS files: 644 (read only)</li>
                                                                <li>• CGI scripts: 755 (executable)</li>
                                                                <li>• Config files: 600 (owner only)</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-mono text-sm space-y-2">
                                                            <div className="text-green-400"># Safe approach using find:</div>
                                                            <div>$ find /var/www -type d -exec chmod 755 { } \;</div>
                                                            <div>$ find /var/www -type f -name "*.html" -exec chmod 644 { } \;</div>
                                                            <div>$ find /var/www -type f -name "*.cgi" -exec chmod 755 { } \;</div>
                                                            <div>$ find /var/www -type f -name "*.cfg" -exec chmod 600 { } \;</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={clsx(
                                                "p-5 rounded-xl",
                                                isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                                            )}>
                                                <h4 className="font-bold text-blue-400 mb-4">Example 2: Fixing Recursive Mistake</h4>
                                                <div className="space-y-4">
                                                    <p className="text-sm">
                                                        <span className="font-semibold">Debangshu</span> accidentally ran <code>chmod -R 777 project/</code>.
                                                        Here's how to fix it:
                                                    </p>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="font-mono text-sm p-3 bg-black/20 rounded">
                                                            <div className="text-green-400"># First, secure sensitive files</div>
                                                            <div>$ find project/ -name "*.key" -exec chmod 600 { } \;</div>
                                                            <div>$ find project/ -name "*.env" -exec chmod 600 { } \;</div>
                                                        </div>

                                                        <div className="font-mono text-sm p-3 bg-black/20 rounded">
                                                            <div className="text-green-400"># Then set proper permissions</div>
                                                            <div>$ find project/ -type d -exec chmod 755 { } \;</div>
                                                            <div>$ find project/ -type f -exec chmod 644 { } \;</div>
                                                        </div>
                                                    </div>

                                                    <div className="text-sm opacity-80">
                                                        This is safer than another recursive chmod because it's targeted
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className={clsx(
                                                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                                                    isDarkMode ? "bg-yellow-900/20 hover:bg-yellow-900/30" : "bg-yellow-50 hover:bg-yellow-100"
                                                )}>
                                                    <h4 className="font-bold text-yellow-400 mb-3">Pro Tip: Use --no-dereference</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <p>To avoid following symbolic links:</p>
                                                        <div className="font-mono p-2 bg-black/20 rounded">
                                                            $ chmod -R --no-dereference 755 dir/
                                                        </div>
                                                        <p>This changes the symlink itself, not the target</p>
                                                    </div>
                                                </div>

                                                <div className={clsx(
                                                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                                                    isDarkMode ? "bg-cyan-900/20 hover:bg-cyan-900/30" : "bg-cyan-50 hover:bg-cyan-100"
                                                )}>
                                                    <h4 className="font-bold text-cyan-400 mb-3">Pro Tip: Combine with find</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <p>More control than chmod -R:</p>
                                                        <div className="font-mono p-2 bg-black/20 rounded">
                                                            $ find . -type f -perm /111 -exec chmod a-x { } \;
                                                        </div>
                                                        <p>Removes execute from all executable files</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* File Structure Simulation */}
                        <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
                            <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                                File Structure Simulation
                            </h2>

                            <div className="mb-6">
                                <div className={clsx(
                                    "p-4 rounded-lg mb-4",
                                    isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                                )}>
                                    <div className="font-mono text-sm mb-2">Current path: {simulatedPath}</div>
                                    <div className="font-mono text-sm text-yellow-400">Command: chmod -R 755 {simulatedPath}</div>
                                </div>

                                <div className={clsx(
                                    "p-4 rounded-lg border",
                                    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
                                )}>
                                    <div className="font-mono text-sm space-y-1">
                                        {fileStructure.map((item, index) => (
                                            <div
                                                key={index}
                                                className={clsx(
                                                    "flex items-center py-1",
                                                    simulateRecursive && item.type === 'file' ? 'file-changing' : '',
                                                    item.depth > 0 ? `ml-${item.depth * 4}` : ''
                                                )}
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                            >
                                                <div className="w-24">
                                                    <span className={clsx(
                                                        "px-2 py-1 rounded text-xs",
                                                        item.type === 'directory'
                                                            ? isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
                                                            : isDarkMode ? "bg-green-900/30" : "bg-green-100"
                                                    )}>
                                                        {item.permissions}
                                                    </span>
                                                </div>
                                                <div className={clsx(
                                                    "ml-2",
                                                    item.type === 'directory' ? "text-blue-400" : "text-green-400"
                                                )}>
                                                    {item.name}
                                                </div>
                                                {simulateRecursive && (
                                                    <div className="ml-auto text-xs opacity-70">
                                                        → <span className="text-yellow-400">755</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => this.handleShowWarning('warning')}
                                        className={clsx(
                                            "p-3 rounded-lg transition-all duration-300 hover:scale-105",
                                            isDarkMode ? "bg-yellow-900/20 hover:bg-yellow-900/30" : "bg-yellow-50 hover:bg-yellow-100"
                                        )}
                                    >
                                        <div className="font-bold text-yellow-400">⚠️ What's wrong here?</div>
                                        <div className="text-xs opacity-80">Click to analyze risks</div>
                                    </button>

                                    <button
                                        onClick={this.toggleSimulation}
                                        className={clsx(
                                            "p-3 rounded-lg transition-all duration-300 hover:scale-105",
                                            isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"
                                        )}
                                    >

                                        <div className="font-bold text-blue-400">🔄 Toggle Simulation</div>
                                        <div className="text-xs opacity-80">See recursive effect</div>
                                    </button>

                                    <button
                                        onClick={() => this.handleShowWarning('info')}
                                        className={clsx(
                                            "p-3 rounded-lg transition-all duration-300 hover:scale-105",
                                            isDarkMode ? "bg-green-900/20 hover:bg-green-900/30" : "bg-green-50 hover:bg-green-100"
                                        )}
                                    >
                                        <div className="font-bold text-green-400">✅ Safe Alternative</div>
                                        <div className="text-xs opacity-80">Better approach</div>
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Checklist & Summary */}
                        <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
                            <h2 className="text-2xl font-semibold mb-6 flex items-center">
                                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                                Checklist: Before Using chmod -R
                            </h2>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        {[
                                            { text: 'Run pwd to confirm location', checked: true },
                                            { text: 'Check for symlinks with ls -la', checked: false },
                                            { text: 'Backup important directories', checked: false },
                                            { text: 'Test on a copy first', checked: false }
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <div className={clsx(
                                                    "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                                                    item.checked
                                                        ? "bg-green-500"
                                                        : "bg-gray-500"
                                                )}>
                                                    {item.checked ? (
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <span className="text-white text-xs">{index + 1}</span>
                                                    )}
                                                </div>
                                                <span className={item.checked ? "line-through opacity-60" : ""}>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { text: 'Use find for specific file types', checked: true },
                                            { text: 'Consider using --no-dereference', checked: false },
                                            { text: 'Verify permissions after changes', checked: false },
                                            { text: 'Document the change', checked: false }
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <div className={clsx(
                                                    "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                                                    item.checked
                                                        ? "bg-green-500"
                                                        : "bg-gray-500"
                                                )}>
                                                    {item.checked ? (
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <span className="text-white text-xs">{index + 5}</span>
                                                    )}
                                                </div>
                                                <span className={item.checked ? "line-through opacity-60" : ""}>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={clsx(
                                    "p-4 rounded-lg mt-6",
                                    isDarkMode ? "bg-red-900/10 border border-red-700/30" : "bg-red-50 border border-red-200"
                                )}>
                                    <h4 className="font-bold text-red-400 mb-2">⛔ NEVER DO THESE</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                                            <span>Never run <code>chmod -R</code> from / (root directory)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                                            <span>Never use 777 unless absolutely necessary</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                                            <span>Never run recursive chmod when tired or distracted</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                                            <span>Never skip backup before major permission changes</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Teacher's Note */}
                        <section className={`bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30 transition-all duration-300 hover:from-blue-900/30 hover:to-purple-900/30 hover:border-blue-500/50 hover:shadow-2xl ${extraStaggeredClass} opacity-0`}>
                            <div className="flex items-start mb-4">
                                <div className="relative group">
                                    <div className={clsx(
                                        "w-12 h-12 rounded-full flex items-center justify-center mr-4 ring-4 ring-offset-2",
                                        isDarkMode
                                            ? "bg-blue-700 ring-blue-900/50 ring-offset-gray-900 group-hover:ring-blue-600"
                                            : "bg-blue-500 ring-blue-300 ring-offset-gray-50 group-hover:ring-blue-400"
                                    )}>
                                        <span className="text-white font-bold text-lg">SH</span>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        Teacher's Note
                                    </h3>
                                    <p className="text-sm opacity-80">Sukanta Hui • 27 years experience</p>
                                </div>
                            </div>

                            <div className="space-y-4 leading-relaxed">
                                <p className="italic">
                                    "In my 27 years, I've seen more systems broken by <code>chmod -R 777 /</code> than by viruses or hackers.
                                    At Barrackpore College, we had a student lock everyone out of the lab server with one wrong command.
                                    Remember: The -R flag is like a chainsaw - incredibly useful for the right job,
                                    but disastrous if you're not paying attention to where you're pointing it."
                                </p>

                                <div className={clsx(
                                    "p-4 rounded-lg mt-4",
                                    isDarkMode ? "bg-black/30" : "bg-white/20"
                                )}>
                                    <h4 className="font-bold text-yellow-300 mb-2">Golden Rule:</h4>
                                    <p className="text-sm">
                                        Before hitting Enter on any recursive chmod command, ask yourself twice:
                                        "Am I absolutely sure about the path? Have I checked for symlinks?
                                        Would I be comfortable explaining this to my boss if it goes wrong?"
                                        If any answer is no, stop and reconsider.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-blue-700/30">
                                    <div className="text-sm opacity-70">
                                        Contact: sukantahui@codernaccotax.co.in • 7003756860
                                    </div>
                                    <div className="text-xs opacity-60">
                                        Skills: OS, RDBMS, Web Dev, Programming
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Hint Section */}
                        <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
                            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                                <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                                Think About This...
                            </h2>

                            <div className={clsx(
                                "p-4 rounded-lg border-l-4",
                                isDarkMode ? "border-green-500/50 bg-green-900/10" : "border-green-400 bg-green-50/50"
                            )}>
                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <div>
                                        <p className="leading-relaxed">
                                            Why is <code>chmod -R 755</code> on a web directory potentially dangerous for configuration files?
                                            What's a safer alternative approach?
                                            <span className="block mt-2 text-sm opacity-80">
                                                Consider what happens when config files with passwords become executable and world-readable...
                                            </span>
                                        </p>
                                        <div className="mt-4 p-3 bg-black/20 rounded">
                                            <div className="font-mono text-sm">
                                                <div>Safer: find . -type f -name "*.cfg" -exec chmod 600 { } \;</div>
                                                <div>Safer: find . -type f -name "*.php" -exec chmod 644 { } \;</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
                        <p>Topic 5: Recursive Permission Changes • Next: Understanding File Ownership</p>
                        <p className="mt-2">Remember: With great power (-R) comes great responsibility. Always verify twice!</p>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Topic4;