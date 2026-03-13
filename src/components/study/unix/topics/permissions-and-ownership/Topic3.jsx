import React from 'react';
import clsx from 'clsx';

class Topic3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isReducedMotion: false,
      activeMode: 'add',
      selectedEntity: 'u',
      selectedPermission: 'r',
      commandString: '',
      showExample: false
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
    
    // Initialize command string
    this.updateCommandString();
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

  handleModeChange = (mode) => {
    this.setState({ activeMode: mode }, this.updateCommandString);
  };

  handleEntityChange = (entity) => {
    this.setState({ selectedEntity: entity }, this.updateCommandString);
  };

  handlePermissionChange = (permission) => {
    this.setState({ selectedPermission: permission }, this.updateCommandString);
  };

  updateCommandString = () => {
    const { activeMode, selectedEntity, selectedPermission } = this.state;
    const modeSymbol = activeMode === 'add' ? '+' : activeMode === 'remove' ? '-' : '=';
    const command = `chmod ${selectedEntity}${modeSymbol}${selectedPermission} filename`;
    this.setState({ commandString: command });
  };

  handleShowExample = () => {
    this.setState({ showExample: true });
    
    // Reset example after 5 seconds
    setTimeout(() => {
      this.setState({ showExample: false });
    }, 5000);
  };

  render() {
    const { isDarkMode, isReducedMotion, activeMode, selectedEntity, selectedPermission, commandString, showExample } = this.state;
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
    const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
    const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';
    const extraStaggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]';

    const entities = [
      { id: 'u', label: 'User (Owner)', description: 'The file owner', color: 'bg-blue-500' },
      { id: 'g', label: 'Group', description: 'Group members', color: 'bg-green-500' },
      { id: 'o', label: 'Others', description: 'All other users', color: 'bg-red-500' },
      { id: 'a', label: 'All', description: 'Everyone (u+g+o)', color: 'bg-purple-500' }
    ];

    const modes = [
      { id: 'add', symbol: '+', label: 'Add', description: 'Add permission(s)', color: 'bg-green-500' },
      { id: 'remove', symbol: '-', label: 'Remove', description: 'Remove permission(s)', color: 'bg-red-500' },
      { id: 'assign', symbol: '=', label: 'Assign', description: 'Set exact permissions', color: 'bg-blue-500' }
    ];

    const permissions = [
      { id: 'r', label: 'Read', value: '4', color: 'bg-blue-400' },
      { id: 'w', label: 'Write', value: '2', color: 'bg-green-400' },
      { id: 'x', label: 'Execute', value: '1', color: 'bg-purple-400' },
      { id: 'rw', label: 'Read+Write', value: 'rw', color: 'bg-yellow-500' },
      { id: 'rx', label: 'Read+Execute', value: 'rx', color: 'bg-cyan-500' },
      { id: 'wx', label: 'Write+Execute', value: 'wx', color: 'bg-pink-500' },
      { id: 'rwx', label: 'All', value: 'rwx', color: 'bg-gray-500' }
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
            
            @keyframes commandBuild {
              0% { opacity: 0.5; transform: scale(0.95); }
              50% { opacity: 1; transform: scale(1.02); }
              100% { opacity: 1; transform: scale(1); }
            }
            
            @keyframes highlightEntity {
              0%, 100% { background-color: rgba(59, 130, 246, 0.1); }
              50% { background-color: rgba(59, 130, 246, 0.3); }
            }
            
            .command-animate {
              animation: commandBuild 0.3s ease-out;
            }
            
            .entity-highlight {
              animation: highlightEntity 1s ease-in-out;
            }
          `}
        </style>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <header className={`mb-12 ${animationClass} opacity-0`}>
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">
              chmod Symbolic Mode: u, g, o, a with +, - and =
            </h1>
            <p className="text-lg opacity-80">
              Topic 4: The flexible way to modify permissions without remembering numbers
            </p>
            <div className="h-1 w-24 bg-blue-500 mt-4 rounded-full"></div>
          </header>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Symbolic Mode Overview */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                Symbolic Mode: Human-Readable Permission Changes
              </h2>
              
              <div className="mb-8">
                <div className={clsx(
                  "p-6 rounded-xl mb-6",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                )}>
                  <div className="text-center text-2xl font-bold mb-4">
                    <span className="text-blue-400">[who][operator][permissions]</span>
                  </div>
                  
                  {/* SVG Visualization */}
                  <div className="mb-8 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                    <svg 
                      width="100%" 
                      height="120" 
                      viewBox="0 0 800 120" 
                      className="overflow-visible"
                    >
                      {/* Chmod command structure */}
                      <g>
                        {/* Command label */}
                        <text x="400" y="30" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="14">chmod command structure</text>
                        
                        {/* Who section */}
                        <g className="cursor-pointer hover:opacity-100 opacity-90">
                          <rect x="100" y="40" width="100" height="40" rx="8" 
                                fill={isDarkMode ? "#1D4ED8" : "#3B82F6"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"} 
                                strokeWidth="2" />
                          <text x="150" y="65" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">who</text>
                          <text x="150" y="85" textAnchor="middle" fill={isDarkMode ? "#93C5FD" : "#1E40AF"} fontSize="12">u,g,o,a</text>
                          <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
                        </g>
                        
                        {/* Operator section */}
                        <g className="cursor-pointer hover:opacity-100 opacity-90">
                          <rect x="220" y="40" width="100" height="40" rx="8" 
                                fill={isDarkMode ? "#059669" : "#10B981"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#34D399" : "#059669"} 
                                strokeWidth="2" />
                          <text x="270" y="65" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">operator</text>
                          <text x="270" y="85" textAnchor="middle" fill={isDarkMode ? "#6EE7B7" : "#065F46"} fontSize="12">+,-,=</text>
                          <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" begin="0.5s" />
                        </g>
                        
                        {/* Permissions section */}
                        <g className="cursor-pointer hover:opacity-100 opacity-90">
                          <rect x="340" y="40" width="160" height="40" rx="8" 
                                fill={isDarkMode ? "#7C3AED" : "#8B5CF6"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#A78BFA" : "#7C3AED"} 
                                strokeWidth="2" />
                          <text x="420" y="65" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">permissions</text>
                          <text x="420" y="85" textAnchor="middle" fill={isDarkMode ? "#C4B5FD" : "#5B21B6"} fontSize="12">r,w,x,rw,rx,wx,rwx</text>
                          <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" begin="1s" />
                        </g>
                        
                        {/* Arrows */}
                        <path d="M200 60 L220 60" stroke={isDarkMode ? "#6B7280" : "#9CA3AF"} strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                        <path d="M320 60 L340 60" stroke={isDarkMode ? "#6B7280" : "#9CA3AF"} strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                        
                        <defs>
                          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill={isDarkMode ? "#6B7280" : "#9CA3AF"} />
                          </marker>
                        </defs>
                      </g>
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg mb-4">
                      Unlike numeric mode, symbolic mode lets you modify permissions relative to their current state
                    </p>
                    <div className="inline-block p-4 bg-black/20 rounded-xl">
                      <code className="text-xl font-mono">chmod [who][operation][what] file</code>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"
                  )}>
                    <h4 className="font-bold text-blue-400 mb-3">Advantages</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                        <span>No need to know current permissions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                        <span>Can modify specific entities only</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                        <span>More intuitive for incremental changes</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-green-900/20 hover:bg-green-900/30" : "bg-green-50 hover:bg-green-100"
                  )}>
                    <h4 className="font-bold text-green-400 mb-3">When to Use</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Quick permission adjustments</p>
                      <p>• Adding/removing single permissions</p>
                      <p>• Working with multiple entity types</p>
                      <p>• When you forget numeric values</p>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-purple-900/20 hover:bg-purple-900/30" : "bg-purple-50 hover:bg-purple-100"
                  )}>
                    <h4 className="font-bold text-purple-400 mb-3">Disadvantages</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Longer commands for complex changes</p>
                      <p>• Cannot set all permissions at once easily</p>
                      <p>• Requires understanding of current state</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Builder */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                Interactive Command Builder
              </h2>
              
              <div className="mb-8">
                {/* Command Preview */}
                <div className={clsx(
                  "p-6 rounded-xl mb-8 text-center transition-all duration-300",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100",
                  showExample ? "command-animate" : ""
                )}>
                  <div className="text-xl font-mono mb-4">{commandString}</div>
                  <button
                    onClick={this.handleShowExample}
                    className={clsx(
                      "px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105",
                      isDarkMode 
                        ? "bg-yellow-600 hover:bg-yellow-500" 
                        : "bg-yellow-500 hover:bg-yellow-400"
                    )}
                  >
                    See Example Usage
                  </button>
                  
                  {showExample && (
                    <div className="mt-4 p-4 bg-black/20 rounded-lg">
                      <div className="font-mono text-sm">
                        <div>$ ls -l report.txt</div>
                        <div>-rw-r--r-- 1 swadeep students 1024 Jan 1 12:00 report.txt</div>
                        <div>$ {commandString.replace('filename', 'report.txt')}</div>
                        <div>$ ls -l report.txt</div>
                        <div className="text-green-400">
                          -rwxr--r-- 1 swadeep students 1024 Jan 1 12:00 report.txt
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Builder Controls */}
                <div className="space-y-8">
                  {/* Who Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Step 1: Select Who (Entity)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {entities.map((entity) => (
                        <button
                          key={entity.id}
                          onClick={() => this.handleEntityChange(entity.id)}
                          className={clsx(
                            "p-4 rounded-lg transition-all duration-300 transform hover:scale-105",
                            selectedEntity === entity.id
                              ? isDarkMode 
                                ? `${entity.color} text-white shadow-lg` 
                                : `${entity.color.replace('bg-', 'bg-').replace('-500', '-500')} text-white shadow-lg`
                              : isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-200 hover:bg-gray-300"
                          )}
                        >
                          <div className="text-lg font-bold">{entity.id}</div>
                          <div className="text-sm">{entity.label}</div>
                          <div className="text-xs opacity-80 mt-1">{entity.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mode Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-green-400">Step 2: Select Operation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {modes.map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => this.handleModeChange(mode.id)}
                          className={clsx(
                            "p-4 rounded-lg transition-all duration-300 transform hover:scale-105",
                            activeMode === mode.id
                              ? isDarkMode 
                                ? `${mode.color} text-white shadow-lg` 
                                : `${mode.color.replace('bg-', 'bg-').replace('-500', '-500')} text-white shadow-lg`
                              : isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-200 hover:bg-gray-300"
                          )}
                        >
                          <div className="text-2xl font-bold mb-2">{mode.symbol}</div>
                          <div className="text-lg font-semibold">{mode.label}</div>
                          <div className="text-sm opacity-80 mt-1">{mode.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Permissions Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Step 3: Select Permission(s)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {permissions.map((perm) => (
                        <button
                          key={perm.id}
                          onClick={() => this.handlePermissionChange(perm.id)}
                          className={clsx(
                            "p-4 rounded-lg transition-all duration-300 transform hover:scale-105",
                            selectedPermission === perm.id
                              ? isDarkMode 
                                ? `${perm.color} text-white shadow-lg` 
                                : `${perm.color.replace('bg-', 'bg-').replace('-400', '-500').replace('-500', '-500')} text-white shadow-lg`
                              : isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-200 hover:bg-gray-300"
                          )}
                        >
                          <div className="text-lg font-bold">{perm.id}</div>
                          <div className="text-sm">{perm.label}</div>
                          {perm.value.length === 1 && (
                            <div className="text-xs opacity-80 mt-1">Value: {perm.value}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Examples */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Real-World Examples & Scenarios
              </h2>
              
              <div className="space-y-6">
                {/* Example 1 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-blue-500/50 bg-blue-900/10" : "border-blue-400 bg-blue-50"
                )}>
                  <h4 className="font-bold text-blue-400 mb-3">Scenario 1: Swadeep's Script</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-3">
                        <span className="font-semibold">Swadeep</span> at Barrackpore College writes a script. 
                        He wants classmates to run it but not modify it.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">S</span>
                          </div>
                          <span>Current: <code>-rw-r--r--</code> (644)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>Goal: <code>-rwxr-xr-x</code> (755)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono space-y-2">
                        <div className="text-green-400"># Add execute for everyone</div>
                        <div>$ chmod a+x script.sh</div>
                        <div className="text-sm opacity-80 mt-2">Or specifically:</div>
                        <div>$ chmod u+x,g+x,o+x script.sh</div>
                        <div className="text-sm opacity-80 mt-2">Instead of remembering 755</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Example 2 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-green-500/50 bg-green-900/10" : "border-green-400 bg-green-50"
                )}>
                  <h4 className="font-bold text-green-400 mb-3">Scenario 2: Tuhina's Secure File</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-3">
                        <span className="font-semibold">Tuhina</span> at Shyamnagar lab accidentally made a 
                        config file world-readable. She needs to restrict it.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">T</span>
                          </div>
                          <span>Current: <code>-rw-rw-rw-</code> (666)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>Goal: <code>-rw-------</code> (600)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono space-y-2">
                        <div className="text-red-400"># Remove all permissions from group and others</div>
                        <div>$ chmod go-rw config.txt</div>
                        <div className="text-sm opacity-80 mt-2">Or remove everything:</div>
                        <div>$ chmod go= config.txt</div>
                        <div className="text-sm opacity-80 mt-2">Empty after = means no permissions</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Example 3 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-purple-500/50 bg-purple-900/10" : "border-purple-400 bg-purple-50"
                )}>
                  <h4 className="font-bold text-purple-400 mb-3">Scenario 3: Group Collaboration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-3">
                        <span className="font-semibold">Abhronila</span> at Ichapur Institute needs to give 
                        her team write access to a directory.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">A</span>
                          </div>
                          <span>Current: <code>drwxr-x---</code> (750)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>Goal: <code>drwxrwx---</code> (770)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono space-y-2">
                        <div className="text-blue-400"># Add write permission for group</div>
                        <div>$ chmod g+w project/</div>
                        <div className="text-sm opacity-80 mt-2">For directory and contents:</div>
                        <div>$ chmod -R g+w project/</div>
                        <div className="text-sm opacity-80 mt-2">-R flag makes it recursive</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Example 4 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                )}>
                  <h4 className="font-bold text-yellow-400 mb-3">Scenario 4: Exact Permission Setting</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-3">
                        <span className="font-semibold">Debangshu</span> needs to set exact permissions 
                        regardless of current state.
                      </p>
                      <div className="space-y-3">
                        <div className="p-2 bg-black/20 rounded">
                          <div className="font-semibold">Using = operator:</div>
                          <div className="text-sm">Sets exactly what you specify</div>
                        </div>
                        <div className="text-sm">
                          Useful when you want to ensure specific permissions
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono space-y-3">
                        <div className="text-purple-400"># Set group to read-only</div>
                        <div>$ chmod g=r file.txt</div>
                        <div className="text-sm opacity-80">Group gets only read, loses write/execute</div>
                        
                        <div className="mt-4 text-purple-400"># Set others to no permissions</div>
                        <div>$ chmod o= file.txt</div>
                        <div className="text-sm opacity-80">Others get nothing (clears all)</div>
                        
                        <div className="mt-4 text-purple-400"># Set specific combination</div>
                        <div>$ chmod ug=rw,o=r file.txt</div>
                        <div className="text-sm opacity-80">Owner+group: rw, Others: r</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Advanced Combinations */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-red-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Advanced Combinations & Multiple Operations
              </h2>
              
              <div className="space-y-6">
                <div className={clsx(
                  "p-5 rounded-xl",
                  isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <h4 className="font-bold text-red-400 mb-4">Multiple Operations in One Command</h4>
                  <p className="mb-4">
                    You can combine multiple operations separated by commas. This is powerful for complex changes.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-mono space-y-3">
                        <div className="text-green-400"># Complex permission change</div>
                        <div>$ chmod u+x,g-w,o=r file</div>
                        <div className="text-sm opacity-80 mt-2">Breakdown:</div>
                        <ul className="text-sm space-y-1 ml-4">
                          <li>• u+x → Add execute for owner</li>
                          <li>• g-w → Remove write from group</li>
                          <li>• o=r → Set others to read-only</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-mono space-y-3">
                        <div className="text-blue-400"># Practical example</div>
                        <div>$ chmod a+r,u+w,g-wx,o= file</div>
                        <div className="text-sm opacity-80 mt-2">Result:</div>
                        <div className="p-2 bg-black/20 rounded">
                          <div>Everyone can read</div>
                          <div>Owner can write</div>
                          <div>Group has no permissions</div>
                          <div>Others have no permissions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"
                  )}>
                    <h4 className="font-bold text-blue-400 mb-3">Copying Permissions</h4>
                    <div className="space-y-2 text-sm">
                      <p>You can copy permissions from one entity to another:</p>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod g=u file
                      </div>
                      <p>This makes group permissions match user permissions</p>
                      <div className="font-mono p-2 bg-black/20 rounded mt-2">
                        $ chmod o=g file
                      </div>
                      <p>Others get same as group</p>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-green-900/20 hover:bg-green-900/30" : "bg-green-50 hover:bg-green-100"
                  )}>
                    <h4 className="font-bold text-green-400 mb-3">Reference File</h4>
                    <div className="space-y-2 text-sm">
                      <p>Copy permissions from another file:</p>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod --reference=source.txt target.txt
                      </div>
                      <p>target.txt gets same permissions as source.txt</p>
                      <div className="text-xs opacity-80 mt-2">
                        Useful in scripts for consistent permissions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Mistakes & Pitfalls */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Common Mistakes & Professional Tips
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg border-l-4",
                    isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                  )}>
                    <h4 className="font-bold text-red-400 mb-3">⚠️ Common Mistake 1: Spaces</h4>
                    <div className="space-y-2 text-sm">
                      <p>No spaces between parts!</p>
                      <div className="font-mono p-2 bg-black/20 rounded text-red-400">
                        $ chmod u + x file  # Wrong!
                      </div>
                      <div className="font-mono p-2 bg-black/20 rounded text-green-400">
                        $ chmod u+x file    # Correct
                      </div>
                      <p className="mt-2">This is the #1 syntax error beginners make at Naihati lab</p>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg border-l-4",
                    isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                  )}>
                    <h4 className="font-bold text-yellow-400 mb-3">⚠️ Common Mistake 2: Order Matters</h4>
                    <div className="space-y-2 text-sm">
                      <p>Operations execute left to right:</p>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod a=rw,u+x file
                      </div>
                      <p>First sets all to rw, then adds x for user</p>
                      <div className="font-mono p-2 bg-black/20 rounded mt-2">
                        $ chmod u+x,a=rw file
                      </div>
                      <p>First adds x for user, then sets all to rw (loses x)</p>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-5 rounded-xl",
                  isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <h4 className="font-bold text-green-400 mb-4">✅ Professional Tips</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Use relative paths:</span> Check where you are with <code>pwd</code>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Check before and after:</span> Always use <code>ls -l</code> to verify
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Use symbolic for scripts:</span> More readable than numeric
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Test with echo:</span> <code>echo "test" > file</code> to check write
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Document in scripts:</span> Add comments explaining permissions
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Use with find:</span> <code>find . -type f -exec chmod 644 {}</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  "I tell my students at Barrackpore College: Think of symbolic mode as speaking to the file system. 
                  You're saying 'Hey file, let the user add execute permission' (u+x) or 'Take away write from others' (o-w). 
                  It's conversational. Numeric mode is like giving coordinates - precise but you need to know exactly where you are."
                </p>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4",
                  isDarkMode ? "bg-black/30" : "bg-white/20"
                )}>
                  <h4 className="font-bold text-yellow-300 mb-2">Memory Aid:</h4>
                  <p className="text-sm">
                    Remember this sentence: "<span className="font-semibold">U</span>ser <span className="font-semibold">G</span>ives <span className="font-semibold">O</span>thers <span className="font-semibold">A</span>ccess" 
                    → <code>u g o a</code>. The operations are like math: <code>+</code> add, <code>-</code> subtract, <code>=</code> equals.
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
                      What happens when you run <code>chmod a= file.txt</code>? Can you still read the file as the owner?
                      What about <code>chmod u= file.txt</code>?
                      <span className="block mt-2 text-sm opacity-80">
                        Think about what the = operator does when followed by nothing...
                      </span>
                    </p>
                    <div className="mt-4 p-3 bg-black/20 rounded">
                      <div className="font-mono text-sm">
                        <div>Hint: = sets exact permissions</div>
                        <div>Empty after = means no permissions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
            <p>Topic 4: chmod Symbolic Mode • Next: Recursive Permission Changes</p>
            <p className="mt-2">Practice: Create a file and try all combinations from the interactive builder</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Topic3;