import React from 'react';
import clsx from 'clsx';

class Topic6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isReducedMotion: false,
      activeCommand: 'chown',
      showExample: false,
      selectedUser: 'swadeep',
      selectedGroup: 'students',
      selectedFile: 'project.py',
      commandResult: '',
      showDanger: false
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

  handleCommandChange = (command) => {
    this.setState({ 
      activeCommand: command,
      showExample: false,
      commandResult: ''
    });
  };

  handleUserChange = (user) => {
    this.setState({ selectedUser: user });
  };

  handleGroupChange = (group) => {
    this.setState({ selectedGroup: group });
  };

  handleFileChange = (file) => {
    this.setState({ selectedFile: file });
  };

  executeCommand = () => {
    const { activeCommand, selectedUser, selectedGroup, selectedFile } = this.state;
    let result = '';
    
    switch(activeCommand) {
      case 'chown':
        result = `$ sudo chown ${selectedUser} ${selectedFile}\nChanged ownership to: ${selectedUser}`;
        break;
      case 'chown-group':
        result = `$ sudo chown ${selectedUser}:${selectedGroup} ${selectedFile}\nChanged ownership to: ${selectedUser}:${selectedGroup}`;
        break;
      case 'chgrp':
        result = `$ chgrp ${selectedGroup} ${selectedFile}\nChanged group to: ${selectedGroup}`;
        break;
      case 'chown-recursive':
        result = `$ sudo chown -R ${selectedUser}:${selectedGroup} project/\nRecursively changed ownership`;
        break;
      case 'chown-reference':
        result = `$ sudo chown --reference=source.txt ${selectedFile}\nCopied ownership from source.txt`;
        break;
    }
    
    this.setState({ 
      commandResult: result,
      showExample: true 
    });
    
    // Show danger warning for certain commands
    if (activeCommand.includes('recursive') || selectedUser === 'root') {
      this.setState({ showDanger: true });
      setTimeout(() => this.setState({ showDanger: false }), 3000);
    }
  };

  render() {
    const { isDarkMode, isReducedMotion, activeCommand, showExample, selectedUser, selectedGroup, selectedFile, commandResult, showDanger } = this.state;
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
    const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
    const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';
    const extraStaggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]';

    const users = [
      { id: 'swadeep', name: 'Swadeep', location: 'Barrackpore College' },
      { id: 'tuhina', name: 'Tuhina', location: 'Shyamnagar Lab' },
      { id: 'abhronila', name: 'Abhronila', location: 'Ichapur Institute' },
      { id: 'debangshu', name: 'Debangshu', location: 'Naihati Center' },
      { id: 'root', name: 'root', location: 'System Admin' }
    ];

    const groups = [
      { id: 'students', name: 'students' },
      { id: 'faculty', name: 'faculty' },
      { id: 'developers', name: 'developers' },
      { id: 'staff', name: 'staff' },
      { id: 'www-data', name: 'www-data' }
    ];

    const files = [
      { id: 'project.py', permissions: '-rwxr-xr--', owner: 'swadeep', group: 'students' },
      { id: 'data.csv', permissions: '-rw-rw----', owner: 'tuhina', group: 'students' },
      { id: 'config.env', permissions: '-rw-------', owner: 'root', group: 'root' },
      { id: 'index.html', permissions: '-rw-r--r--', owner: 'www-data', group: 'www-data' }
    ];

    const commands = [
      { id: 'chown', name: 'chown', description: 'Change file owner', syntax: 'chown [owner] file' },
      { id: 'chown-group', name: 'chown with group', description: 'Change owner and group', syntax: 'chown [owner]:[group] file' },
      { id: 'chgrp', name: 'chgrp', description: 'Change file group only', syntax: 'chgrp [group] file' },
      { id: 'chown-recursive', name: 'chown -R', description: 'Recursive ownership change', syntax: 'chown -R [owner]:[group] directory' },
      { id: 'chown-reference', name: 'chown --reference', description: 'Copy ownership from another file', syntax: 'chown --reference=source target' }
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
            
            @keyframes commandExecute {
              0% { transform: scale(0.95); opacity: 0.5; }
              70% { transform: scale(1.02); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes dangerPulse {
              0%, 100% { background-color: rgba(239, 68, 68, 0.1); }
              50% { background-color: rgba(239, 68, 68, 0.3); }
            }
            
            .command-execute {
              animation: commandExecute 0.3s ease-out;
            }
            
            .danger-pulse {
              animation: dangerPulse 1s ease-in-out infinite;
            }
          `}
        </style>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <header className={`mb-12 ${animationClass} opacity-0`}>
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">
              chown and chgrp – Changing Owner and Group
            </h1>
            <p className="text-lg opacity-80">
              Topic 7: Mastering ownership transfer and group management
            </p>
            <div className="h-1 w-24 bg-blue-500 mt-4 rounded-full"></div>
          </header>

          {/* Danger Warning */}
          {showDanger && (
            <div className={`mb-8 p-4 rounded-xl border danger-pulse ${
              isDarkMode ? 'bg-red-900/20 border-red-700/50' : 'bg-red-50 border-red-200'
            } ${delayClass} opacity-0`}>
              <div className="flex items-center">
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                  isDarkMode ? 'bg-red-500' : 'bg-red-500'
                )}>
                  <span className="text-white">⚠️</span>
                </div>
                <div>
                  <h3 className="font-bold">DANGER: Ownership Changes</h3>
                  <p className="text-sm">
                    Changing ownership to root or using -R flag can make files inaccessible!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-8">
            {/* Command Comparison */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                chown vs chgrp: Understanding the Difference
              </h2>
              
              <div className="mb-8">
                <div className={clsx(
                  "p-6 rounded-xl mb-6",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                )}>
                  {/* Visualization */}
                  <div className="mb-8 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                    <svg 
                      width="100%" 
                      height="180" 
                      viewBox="0 0 800 180" 
                      className="overflow-visible"
                    >
                      {/* File representation */}
                      <g>
                        <rect x="350" y="40" width="100" height="60" rx="10" 
                              fill={isDarkMode ? "#1E40AF" : "#3B82F6"} 
                              fillOpacity="0.3" 
                              stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"} 
                              strokeWidth="2" />
                        <text x="400" y="70" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">file.txt</text>
                        <text x="400" y="90" textAnchor="middle" fill={isDarkMode ? "#93C5FD" : "#1E40AF"} fontSize="10">swadeep:students</text>
                      </g>
                      
                      {/* chown arrow */}
                      <g>
                        <path d="M200 100 L350 70" 
                              stroke={isDarkMode ? "#DC2626" : "#EF4444"} 
                              strokeWidth="3" 
                              fill="none"
                              markerEnd="url(#chown-arrow)" />
                        <text x="275" y="85" textAnchor="middle" fill={isDarkMode ? "#F87171" : "#DC2626"} fontSize="12" fontWeight="bold">chown</text>
                        <text x="275" y="100" textAnchor="middle" fill={isDarkMode ? "#F87171" : "#DC2626"} fontSize="10">Changes Owner</text>
                        
                        <circle cx="150" cy="100" r="25" 
                                fill={isDarkMode ? "#DC2626" : "#EF4444"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#F87171" : "#DC2626"} 
                                strokeWidth="2" />
                        <text x="150" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">tuhina</text>
                      </g>
                      
                      {/* chgrp arrow */}
                      <g>
                        <path d="M600 100 L450 70" 
                              stroke={isDarkMode ? "#059669" : "#10B981"} 
                              strokeWidth="3" 
                              fill="none"
                              markerEnd="url(#chgrp-arrow)" />
                        <text x="525" y="85" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#059669"} fontSize="12" fontWeight="bold">chgrp</text>
                        <text x="525" y="100" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#059669"} fontSize="10">Changes Group</text>
                        
                        <circle cx="650" cy="100" r="25" 
                                fill={isDarkMode ? "#059669" : "#10B981"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#34D399" : "#059669"} 
                                strokeWidth="2" />
                        <text x="650" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">developers</text>
                      </g>
                      
                      <defs>
                        <marker id="chown-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L0,6 L9,3 z" fill={isDarkMode ? "#DC2626" : "#EF4444"} />
                        </marker>
                        <marker id="chgrp-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0,0 L0,6 L9,3 z" fill={isDarkMode ? "#059669" : "#10B981"} />
                        </marker>
                      </defs>
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={clsx(
                      "p-4 rounded-lg border-l-4",
                      isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                    )}>
                      <h4 className="font-bold text-red-400 mb-3">chown (Change Owner)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                          <span>Changes file/directory owner</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                          <span>Can also change group: <code>chown user:group</code></span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                          <span>Usually requires root privileges</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                          <span>More powerful than chgrp</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg border-l-4",
                      isDarkMode ? "border-green-500/50 bg-green-900/10" : "border-green-400 bg-green-50"
                    )}>
                      <h4 className="font-bold text-green-400 mb-3">chgrp (Change Group)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Changes only the group</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Owner can change to any group they belong to</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Root can change to any group</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Simpler, more limited than chown</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Command Builder */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                Interactive Command Builder
              </h2>
              
              <div className="mb-8">
                {/* Command Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Step 1: Select Command</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    {commands.map((command) => (
                      <button
                        key={command.id}
                        onClick={() => this.handleCommandChange(command.id)}
                        className={clsx(
                          "p-3 rounded-lg transition-all duration-300 transform hover:scale-105",
                          activeCommand === command.id
                            ? isDarkMode 
                              ? "bg-yellow-600 text-white shadow-lg" 
                              : "bg-yellow-500 text-white shadow-lg"
                            : isDarkMode
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-gray-200 hover:bg-gray-300"
                        )}
                      >
                        <div className="font-bold text-sm">{command.name}</div>
                        <div className="text-xs opacity-80">{command.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Parameters Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-green-400">Step 2: Select User</h3>
                    <div className="space-y-2">
                      {users.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => this.handleUserChange(user.id)}
                          className={clsx(
                            "w-full p-3 rounded-lg transition-all duration-300 text-left",
                            selectedUser === user.id
                              ? isDarkMode 
                                ? "bg-green-600 text-white" 
                                : "bg-green-500 text-white"
                              : isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-200 hover:bg-gray-300"
                          )}
                        >
                          <div className="font-bold">{user.name}</div>
                          <div className="text-xs opacity-80">{user.location}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-400">Step 3: Select Group</h3>
                    <div className="space-y-2">
                      {groups.map((group) => (
                        <button
                          key={group.id}
                          onClick={() => this.handleGroupChange(group.id)}
                          className={clsx(
                            "w-full p-3 rounded-lg transition-all duration-300 text-left",
                            selectedGroup === group.id
                              ? isDarkMode 
                                ? "bg-purple-600 text-white" 
                                : "bg-purple-500 text-white"
                              : isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-200 hover:bg-gray-300"
                          )}
                        >
                          <div className="font-bold">{group.name}</div>
                          <div className="text-xs opacity-80">
                            {group.id === 'students' && 'Student access group'}
                            {group.id === 'faculty' && 'Faculty members'}
                            {group.id === 'developers' && 'Development team'}
                            {group.id === 'staff' && 'Administrative staff'}
                            {group.id === 'www-data' && 'Web server group'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-red-400">Step 4: Select File</h3>
                    <div className="space-y-2">
                      {files.map((file) => (
                        <button
                          key={file.id}
                          onClick={() => this.handleFileChange(file.id)}
                          className={clsx(
                            "w-full p-3 rounded-lg transition-all duration-300 text-left",
                            selectedFile === file.id
                              ? isDarkMode 
                                ? "bg-red-600 text-white" 
                                : "bg-red-500 text-white"
                              : isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-200 hover:bg-gray-300"
                          )}
                        >
                          <div className="font-bold">{file.id}</div>
                          <div className="text-xs opacity-80">
                            {file.owner}:{file.group} • {file.permissions}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Command Preview and Execution */}
                <div className={clsx(
                  "p-6 rounded-xl mb-6 transition-all duration-300",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100",
                  showExample ? "command-execute" : ""
                )}>
                  <h3 className="text-xl font-bold mb-4 text-center text-yellow-400">Command Preview</h3>
                  
                  <div className="mb-6">
                    <div className="font-mono p-4 bg-black/20 rounded-lg mb-4">
                      <div className="text-green-400"># Generated Command:</div>
                      <div className="text-lg">
                        {activeCommand === 'chown' && `sudo chown ${selectedUser} ${selectedFile}`}
                        {activeCommand === 'chown-group' && `sudo chown ${selectedUser}:${selectedGroup} ${selectedFile}`}
                        {activeCommand === 'chgrp' && `chgrp ${selectedGroup} ${selectedFile}`}
                        {activeCommand === 'chown-recursive' && `sudo chown -R ${selectedUser}:${selectedGroup} project/`}
                        {activeCommand === 'chown-reference' && `sudo chown --reference=source.txt ${selectedFile}`}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button
                        onClick={this.executeCommand}
                        className={clsx(
                          "px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 font-bold",
                          isDarkMode 
                            ? "bg-green-600 hover:bg-green-500" 
                            : "bg-green-500 hover:bg-green-400"
                        )}
                      >
                        Execute Command (Simulation)
                      </button>
                    </div>
                  </div>
                  
                  {showExample && (
                    <div className="border-t border-gray-700 pt-6">
                      <h4 className="font-bold text-blue-400 mb-3">Command Result:</h4>
                      <div className="font-mono p-4 bg-black/20 rounded-lg whitespace-pre-line">
                        {commandResult}
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-black/20 rounded">
                          <div className="font-semibold text-green-400">Before:</div>
                          <div className="text-sm">
                            {(() => {
                              const file = files.find(f => f.id === selectedFile);
                              return `${file?.owner}:${file?.group} • ${file?.permissions}`;
                            })()}
                          </div>
                        </div>
                        <div className="p-3 bg-black/20 rounded">
                          <div className="font-semibold text-blue-400">After:</div>
                          <div className="text-sm">
                            {activeCommand === 'chgrp' 
                              ? `${files.find(f => f.id === selectedFile)?.owner}:${selectedGroup}`
                              : `${selectedUser}:${selectedGroup}`
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Real-World Scenarios */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Real-World Scenarios & Use Cases
              </h2>
              
              <div className="space-y-6">
                {/* Scenario 1 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4",
                  isDarkMode ? "border-blue-500/50 bg-blue-900/10" : "border-blue-400 bg-blue-50"
                )}>
                  <h4 className="font-bold text-blue-400 mb-3">Scenario 1: Project Handover at Barrackpore College</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm mb-3">
                        <span className="font-semibold">Swadeep</span> graduates and needs to transfer his project files to <span className="font-semibold">Tuhina</span>.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">S</span>
                          </div>
                          <span>Current: <code>-rwxr-xr-- swadeep students</code></span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">→</span>
                          </div>
                          <span>Goal: <code>-rwxr-xr-- tuhina students</code></span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-sm space-y-2">
                        <div className="text-green-400"># As root or with sudo:</div>
                        <div>$ sudo chown tuhina project.py</div>
                        <div className="text-xs opacity-80 mt-2">Tuhina now owns the file</div>
                        
                        <div className="mt-4 text-green-400"># If Tuhina needs different group:</div>
                        <div>$ sudo chown tuhina:developers project.py</div>
                        <div className="text-xs opacity-80">Changes both owner and group</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Scenario 2 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4",
                  isDarkMode ? "border-green-500/50 bg-green-900/10" : "border-green-400 bg-green-50"
                )}>
                  <h4 className="font-bold text-green-400 mb-3">Scenario 2: Web Server Deployment at Shyamnagar Lab</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm mb-3">
                        <span className="font-semibold">Tuhina</span> develops a website and needs to deploy it to Apache server.
                      </p>
                      <div className="space-y-3">
                        <div className="p-2 bg-black/20 rounded">
                          <div className="font-semibold">Problem:</div>
                          <div className="text-xs">Files owned by tuhina, Apache runs as www-data</div>
                        </div>
                        <div className="p-2 bg-black/20 rounded">
                          <div className="font-semibold">Solution:</div>
                          <div className="text-xs">Change group to www-data, keep ownership</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-sm space-y-3">
                        <div className="text-blue-400"># Change group to www-data:</div>
                        <div>$ sudo chgrp www-data /var/www/html/*</div>
                        
                        <div className="mt-2 text-blue-400"># Set proper permissions:</div>
                        <div>$ sudo chmod 775 /var/www/html/</div>
                        <div>$ sudo chmod 664 /var/www/html/*.html</div>
                        
                        <div className="mt-2 text-blue-400"># Optional: Change owner too:</div>
                        <div>$ sudo chown -R www-data:www-data /var/www/html/</div>
                        <div className="text-xs opacity-80">Recursive change for entire directory</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Scenario 3 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4",
                  isDarkMode ? "border-purple-500/50 bg-purple-900/10" : "border-purple-400 bg-purple-50"
                )}>
                  <h4 className="font-bold text-purple-400 mb-3">Scenario 3: Group Collaboration at Ichapur Institute</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm mb-3">
                        <span className="font-semibold">Abhronila</span> creates files that need to be accessible by the developers group.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">A</span>
                          </div>
                          <span>She can change group without root:</span>
                        </div>
                        <div className="ml-8 text-sm">
                          Because she owns the files and is in developers group
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-sm space-y-2">
                        <div className="text-green-400"># Check current groups:</div>
                        <div>$ groups</div>
                        <div>abhronila developers students</div>
                        
                        <div className="mt-2 text-green-400"># Change group to developers:</div>
                        <div>$ chgrp developers source_code.py</div>
                        
                        <div className="mt-2 text-green-400"># Set group permissions:</div>
                        <div>$ chmod g+rw source_code.py</div>
                        <div className="text-xs opacity-80">Now all developers can read/write</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Scenario 4 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4",
                  isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                )}>
                  <h4 className="font-bold text-red-400 mb-3">⚠️ Scenario 4: Common Mistake & Recovery</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm mb-3">
                        <span className="font-semibold">Debangshu</span> at Naihati Center accidentally changes ownership to root.
                      </p>
                      <div className="space-y-3">
                        <div className="font-mono p-2 bg-black/20 rounded text-red-400">
                          $ sudo chown root important.txt
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold">Problem:</span> He can no longer edit the file!
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-sm space-y-2">
                        <div className="text-green-400"># Solution 1: As root, change back:</div>
                        <div>$ sudo chown debangshu important.txt</div>
                        
                        <div className="mt-2 text-green-400"># Solution 2: Copy and delete:</div>
                        <div>$ sudo cp important.txt important.bak</div>
                        <div>$ sudo rm important.txt</div>
                        <div>$ sudo cp important.bak important.txt</div>
                        <div>$ sudo chown debangshu important.txt</div>
                        
                        <div className="text-xs opacity-80 mt-2">
                          Always backup before ownership changes!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Advanced chown Options */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Advanced chown Options & Flags
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                  )}>
                    <h4 className="font-bold text-blue-400 mb-3">-R, --recursive</h4>
                    <div className="space-y-2 text-sm">
                      <p>Change ownership recursively:</p>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ sudo chown -R www-data:www-data /var/www/
                      </div>
                      <div className="text-xs opacity-80">
                        ⚠️ Dangerous! Can lock you out of directories
                      </div>
                      <ul className="mt-2 space-y-1">
                        <li>• Use with absolute paths</li>
                        <li>• Backup first</li>
                        <li>• Consider using find for more control</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                  )}>
                    <h4 className="font-bold text-green-400 mb-3">--reference=RFILE</h4>
                    <div className="space-y-2 text-sm">
                      <p>Copy ownership from another file:</p>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ sudo chown --reference=source.txt target.txt
                      </div>
                      <p>Great for maintaining consistent ownership:</p>
                      <div className="font-mono p-2 bg-black/20 rounded mt-2">
                        $ sudo chown --reference=/var/www/html/index.html *.html
                      </div>
                      <div className="text-xs opacity-80">
                        All .html files get same owner:group as index.html
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-5 rounded-xl",
                  isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <h4 className="font-bold text-yellow-400 mb-4">Special Ownership Syntax</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className={clsx(
                          "border-b",
                          isDarkMode ? "border-gray-700" : "border-gray-300"
                        )}>
                          <th className="text-left py-3 px-4">Syntax</th>
                          <th className="text-left py-3 px-4">Meaning</th>
                          <th className="text-left py-3 px-4">Example</th>
                          <th className="text-left py-3 px-4">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { syntax: 'user', meaning: 'Change owner only', example: 'chown tuhina file', result: 'tuhina:original_group' },
                          { syntax: 'user:', meaning: 'Change owner, clear group', example: 'chown tuhina: file', result: 'tuhina:' },
                          { syntax: ':group', meaning: 'Change group only', example: 'chown :developers file', result: 'original_owner:developers' },
                          { syntax: 'user:group', meaning: 'Change both', example: 'chown tuhina:developers file', result: 'tuhina:developers' },
                          { syntax: ':group', meaning: 'Same as chgrp', example: 'chown :www-data file', result: 'Same as chgrp www-data' },
                        ].map((row, index) => (
                          <tr 
                            key={index} 
                            className={clsx(
                              "border-b transition-all duration-200 hover:bg-white/5",
                              isDarkMode ? "border-gray-800" : "border-gray-200"
                            )}
                          >
                            <td className="py-3 px-4 font-mono">{row.syntax}</td>
                            <td className="py-3 px-4">{row.meaning}</td>
                            <td className="py-3 px-4 font-mono text-sm">{row.example}</td>
                            <td className="py-3 px-4 text-sm opacity-80">{row.result}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg border-l-4",
                  isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                )}>
                  <h4 className="font-bold text-red-400 mb-3">⚠️ Critical: chown vs chmod Permission Requirements</h4>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="font-semibold">To use chown:</div>
                        <ul className="mt-1 space-y-1">
                          <li>• Root can change to any user:group</li>
                          <li>• Regular users cannot change ownership</li>
                          <li>• Exception: Can change group to groups they belong to (via chgrp)</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-semibold">To use chgrp:</div>
                        <ul className="mt-1 space-y-1">
                          <li>• Owner can change to any group they're a member of</li>
                          <li>• Root can change to any group</li>
                          <li>• Others cannot change group</li>
                        </ul>
                      </div>
                    </div>
                    <div className="font-mono p-2 bg-black/20 rounded">
                      # Swadeep tries to give file to Tuhina:<br/>
                      $ chown tuhina file.txt<br/>
                      chown: changing ownership of 'file.txt': Operation not permitted
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Mistakes & Best Practices */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-red-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Common Mistakes & Best Practices
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg border-l-4",
                    isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                  )}>
                    <h4 className="font-bold text-red-400 mb-3">⛔ Mistake 1: chown root on Home Files</h4>
                    <div className="space-y-2 text-sm">
                      <p>Accidentally running:</p>
                      <div className="font-mono p-2 bg-black/20 rounded text-red-400">
                        $ sudo chown root ~/important.txt
                      </div>
                      <p className="text-red-400">Now you can't edit your own file!</p>
                      <div className="text-xs opacity-80">
                        <span className="font-semibold">Fix:</span> sudo chown $(whoami) ~/important.txt
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg border-l-4",
                    isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                  )}>
                    <h4 className="font-bold text-yellow-400 mb-3">⛔ Mistake 2: Wrong Order with :</h4>
                    <div className="space-y-2 text-sm">
                      <p>Confusing <code>user:group</code> syntax:</p>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ sudo chown :tuhina file.txt  # Wrong!<br/>
                        $ sudo chown tuhina: file.txt  # Wrong!
                      </div>
                      <p>Correct syntax:</p>
                      <div className="font-mono p-2 bg-black/20 rounded text-green-400">
                        $ sudo chown tuhina:students file.txt
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-5 rounded-xl",
                  isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <h4 className="font-bold text-green-400 mb-4">✅ Best Practices</h4>
                  
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
                            <span className="font-semibold">Use groups for collaboration:</span> Change group, not owner
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Check before changing:</span> Use <code>ls -l</code> first
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Use chgrp when possible:</span> Less dangerous than chown
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
                            <span className="font-semibold">Avoid recursive on system dirs:</span> Never <code>chown -R /</code>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Document ownership changes:</span> Add comments in scripts
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Test on copies first:</span> Always backup important files
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg",
                  isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                )}>
                  <h4 className="font-bold text-blue-400 mb-3">Pro Tip: The Ownership Safety Check</h4>
                  <div className="space-y-2 text-sm">
                    <p>Before running chown/chgrp, follow this checklist:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Run <code>pwd</code> to confirm location</li>
                      <li>Run <code>ls -l</code> to see current ownership</li>
                      <li>Run <code>id</code> to check your groups</li>
                      <li>For recursive: run <code>find . -type f | head -5</code></li>
                      <li>Consider: "Do I need sudo?"</li>
                      <li>Ask: "What's the worst that could happen?"</li>
                    </ol>
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
                  "I tell my students at Shyamnagar Lab: Think of chown as transferring property title and chgrp as changing 
                  the building's residents list. The owner (chown) can sell or remodel (change permissions), while the group 
                  (chgrp) determines who has keys to enter. A common mistake I see: students use chown when chgrp would work, 
                  then lose access to their own files. Remember: if you just need to share with classmates, change the group, 
                  not the owner!"
                </p>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4",
                  isDarkMode ? "bg-black/30" : "bg-white/20"
                )}>
                  <h4 className="font-bold text-yellow-300 mb-2">Memory Aid:</h4>
                  <p className="text-sm">
                    <code>chown</code> = "change owner" (needs root) • <code>chgrp</code> = "change group" (owner can do)<br/>
                    Colon placement matters: <code>user:group</code> not <code>user : group</code><br/>
                    When in doubt, use <code>chgrp</code> instead of <code>chown</code> - it's safer!
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
                      Why can the file owner use <code>chgrp</code> without sudo, but needs sudo for <code>chown</code>?
                      What's the logical reason behind this permission difference?
                      <span className="block mt-2 text-sm opacity-80">
                        Think about ownership as a property right vs group membership as a privilege...
                      </span>
                    </p>
                    <div className="mt-4 p-3 bg-black/20 rounded">
                      <div className="font-mono text-sm">
                        Hint: Ownership transfer affects who controls the file, group change affects who can access it
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
            <p>Topic 7: chown and chgrp • Next: Difference between ownership and permission control</p>
            <p className="mt-2">Practice: Create a test file and experiment with chown/chgrp (use sudo carefully!)</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Topic6;