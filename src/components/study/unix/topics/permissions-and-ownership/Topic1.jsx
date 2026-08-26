import React from 'react';
import clsx from 'clsx';

class Topic1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isReducedMotion: false,
      activeExample: 'regular-file'
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

  handleExampleClick = (exampleId) => {
    this.setState({ activeExample: exampleId });
  };

  renderPermissionString = (permissionString, description) => {
    const { isDarkMode } = this.state;
    
    return (
      <div className={clsx(
        "p-4 rounded-xl font-mono transition-all duration-300 hover:scale-[1.02]",
        isDarkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-300"
      )}>
        <div className="text-lg mb-2 text-center">{permissionString}</div>
        <div className="text-sm opacity-80">{description}</div>
      </div>
    );
  };

  render() {
    const { isDarkMode, isReducedMotion, activeExample } = this.state;
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
    const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
    const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';
    const extraStaggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]';

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
            
            @keyframes highlightGlow {
              0%, 100% {
                box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
              }
              50% {
                box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.3);
              }
            }
            
            @keyframes permissionPulse {
              0% { background-color: rgba(59, 130, 246, 0.1); }
              50% { background-color: rgba(59, 130, 246, 0.3); }
              100% { background-color: rgba(59, 130, 246, 0.1); }
            }
            
            .permission-highlight {
              animation: permissionPulse 2s ease-in-out infinite;
            }
          `}
        </style>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <header className={`mb-12 ${animationClass} opacity-0`}>
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">
              Reading Permission Strings: -rwxr-xr-- Explained Character by Character
            </h1>
            <p className="text-lg opacity-80">
              Topic 2: Decoding the 10-character permission string like a professional
            </p>
            <div className="h-1 w-24 bg-blue-500 mt-4 rounded-full"></div>
          </header>

          {/* Main Content */}
          <div className="space-y-8">
            {/* The 10-Character Breakdown */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                The 10-Character Permission String Structure
              </h2>
              
              <div className="mb-8">
                <div className={clsx(
                  "p-6 rounded-xl mb-6 text-center",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                )}>
                  <div className="text-2xl font-mono mb-4 tracking-wider">- r w x r - x r - -</div>
                  <div className="grid grid-cols-10 gap-1 text-sm">
                    {[
                      { pos: 0, label: "Type", color: "bg-purple-500" },
                      { pos: 1, label: "Owner", color: "bg-blue-500" },
                      { pos: 2, label: "Owner", color: "bg-blue-500" },
                      { pos: 3, label: "Owner", color: "bg-blue-500" },
                      { pos: 4, label: "Group", color: "bg-green-500" },
                      { pos: 5, label: "Group", color: "bg-green-500" },
                      { pos: 6, label: "Group", color: "bg-green-500" },
                      { pos: 7, label: "Others", color: "bg-red-500" },
                      { pos: 8, label: "Others", color: "bg-red-500" },
                      { pos: 9, label: "Others", color: "bg-red-500" }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className={clsx(
                          "w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 text-white",
                          item.color
                        )}>
                          {item.pos}
                        </div>
                        <div className="text-xs opacity-80">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* SVG Visualization */}
                <div className="mb-8 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                  <svg 
                    width="100%" 
                    height="120" 
                    viewBox="0 0 1000 120" 
                    className="overflow-visible"
                  >
                    {/* Position markers */}
                    <g>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((pos, index) => (
                        <g key={pos}>
                          <circle 
                            cx={50 + pos * 100} 
                            cy="30" 
                            r="12" 
                            fill={index === 0 ? "#8B5CF6" : index < 4 ? "#3B82F6" : index < 7 ? "#10B981" : "#EF4444"} 
                            className="hover:r-[14] transition-all duration-300"
                          />
                          <text 
                            x={50 + pos * 100} 
                            y="33" 
                            textAnchor="middle" 
                            fill="white" 
                            fontSize="10" 
                            fontWeight="bold"
                          >
                            {pos}
                          </text>
                          <text 
                            x={50 + pos * 100} 
                            y="55" 
                            textAnchor="middle" 
                            fill={isDarkMode ? "#9CA3AF" : "#6B7280"} 
                            fontSize="10"
                          >
                            {index === 0 ? "Type" : index < 4 ? "Owner" : index < 7 ? "Group" : "Others"}
                          </text>
                        </g>
                      ))}
                    </g>
                    
                    {/* Connecting line */}
                    <line x1="40" y1="30" x2="940" y2="30" stroke={isDarkMode ? "#4B5563" : "#D1D5DB"} strokeWidth="2" />
                    
                    {/* Permission positions */}
                    <g>
                      <text x="50" y="90" textAnchor="middle" fill={isDarkMode ? "#F59E0B" : "#D97706"} fontSize="14" fontWeight="bold">-</text>
                      <text x="150" y="90" textAnchor="middle" fill={isDarkMode ? "#60A5FA" : "#1D4ED8"} fontSize="14" fontWeight="bold">r</text>
                      <text x="250" y="90" textAnchor="middle" fill={isDarkMode ? "#60A5FA" : "#1D4ED8"} fontSize="14" fontWeight="bold">w</text>
                      <text x="350" y="90" textAnchor="middle" fill={isDarkMode ? "#60A5FA" : "#1D4ED8"} fontSize="14" fontWeight="bold">x</text>
                      <text x="450" y="90" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#059669"} fontSize="14" fontWeight="bold">r</text>
                      <text x="550" y="90" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#059669"} fontSize="14" fontWeight="bold">-</text>
                      <text x="650" y="90" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#059669"} fontSize="14" fontWeight="bold">x</text>
                      <text x="750" y="90" textAnchor="middle" fill={isDarkMode ? "#F87171" : "#DC2626"} fontSize="14" fontWeight="bold">r</text>
                      <text x="850" y="90" textAnchor="middle" fill={isDarkMode ? "#F87171" : "#DC2626"} fontSize="14" fontWeight="bold">-</text>
                      <text x="950" y="90" textAnchor="middle" fill={isDarkMode ? "#F87171" : "#DC2626"} fontSize="14" fontWeight="bold">-</text>
                    </g>
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={clsx(
                  "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                  isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"
                )}>
                  <h4 className="font-bold text-blue-400 mb-3">Character 0: File Type</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <code className="bg-black/20 px-2 py-1 rounded mr-2">-</code>
                      <span>Regular file</span>
                    </li>
                    <li className="flex items-center">
                      <code className="bg-black/20 px-2 py-1 rounded mr-2">d</code>
                      <span>Directory</span>
                    </li>
                    <li className="flex items-center">
                      <code className="bg-black/20 px-2 py-1 rounded mr-2">l</code>
                      <span>Symbolic link</span>
                    </li>
                    <li className="flex items-center">
                      <code className="bg-black/20 px-2 py-1 rounded mr-2">c</code>
                      <span>Character device</span>
                    </li>
                    <li className="flex items-center">
                      <code className="bg-black/20 px-2 py-1 rounded mr-2">b</code>
                      <span>Block device</span>
                    </li>
                  </ul>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                  isDarkMode ? "bg-green-900/20 hover:bg-green-900/30" : "bg-green-50 hover:bg-green-100"
                )}>
                  <h4 className="font-bold text-green-400 mb-3">Characters 1-9: Permission Triplets</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">Chars 1-3:</span> Owner permissions
                      <div className="text-xs opacity-80 ml-2">Position 1: Read, 2: Write, 3: Execute</div>
                    </div>
                    <div>
                      <span className="font-semibold">Chars 4-6:</span> Group permissions
                      <div className="text-xs opacity-80 ml-2">Position 4: Read, 5: Write, 6: Execute</div>
                    </div>
                    <div>
                      <span className="font-semibold">Chars 7-9:</span> Others permissions
                      <div className="text-xs opacity-80 ml-2">Position 7: Read, 8: Write, 9: Execute</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEPARATE SECTION: Different Examples */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                Different Examples in Practice
              </h2>
              
              {/* Example Selector */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { id: 'regular-file', label: 'Regular File', permission: '-rw-r--r--' },
                    { id: 'executable', label: 'Executable', permission: '-rwxr-xr-x' },
                    { id: 'directory', label: 'Directory', permission: 'drwxr-xr-x' },
                    { id: 'symlink', label: 'Symlink', permission: 'lrwxrwxrwx' },
                    { id: 'restrictive', label: 'Restrictive', permission: '-r--------' },
                    { id: 'shared', label: 'Shared Group', permission: '-rwxrwx---' }
                  ].map((example) => (
                    <button
                      key={example.id}
                      onClick={() => this.handleExampleClick(example.id)}
                      className={clsx(
                        "px-4 py-2 rounded-lg transition-all duration-300",
                        activeExample === example.id
                          ? isDarkMode 
                            ? "bg-yellow-600 text-white" 
                            : "bg-yellow-500 text-white"
                          : isDarkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-200 hover:bg-gray-300"
                      )}
                    >
                      <div className="font-mono text-sm">{example.permission}</div>
                      <div className="text-xs">{example.label}</div>
                    </button>
                  ))}
                </div>
                
                {/* Example Details */}
                <div className={clsx(
                  "p-6 rounded-xl transition-all duration-300",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                )}>
                  {activeExample === 'regular-file' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-blue-400">Regular File Example: -rw-r--r--</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Real-World Scenario:</h4>
                          <p className="mb-4">
                            <span className="font-semibold">Swadeep</span> at Barrackpore College creates a text document 
                            for his class notes. He wants to edit it himself, but others should only read it.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                                <span className="text-white text-xs">S</span>
                              </div>
                              <span>Owner (Swadeep): <code>rw-</code> (can read and write)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                                <span className="text-white text-xs">G</span>
                              </div>
                              <span>Group (Classmates): <code>r--</code> (can only read)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                                <span className="text-white text-xs">O</span>
                              </div>
                              <span>Others (Everyone): <code>r--</code> (can only read)</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Breakdown:</h4>
                          <div className="font-mono space-y-2">
                            <div>Position 0: <code>-</code> → Regular file</div>
                            <div>Positions 1-3: <code>rw-</code> → Owner: Read + Write</div>
                            <div>Positions 4-6: <code>r--</code> → Group: Read only</div>
                            <div>Positions 7-9: <code>r--</code> → Others: Read only</div>
                            <div className="mt-4 pt-4 border-t border-gray-700">
                              <div className="text-green-400">Numeric equivalent: <code>644</code></div>
                              <div className="text-sm opacity-80">(4+2=6, 4=4, 4=4)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeExample === 'executable' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-green-400">Executable Script: -rwxr-xr-x</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Real-World Scenario:</h4>
                          <p className="mb-4">
                            <span className="font-semibold">Tuhina</span> writes a Python script at Shyamnagar lab that 
                            everyone should be able to run, but only she can modify.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                                <span className="text-white text-xs">T</span>
                              </div>
                              <span>Owner (Tuhina): <code>rwx</code> (full control)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                                <span className="text-white text-xs">G</span>
                              </div>
                              <span>Group (Lab Group): <code>r-x</code> (run but not modify)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                                <span className="text-white text-xs">O</span>
                              </div>
                              <span>Others (All students): <code>r-x</code> (run but not modify)</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Security Implication:</h4>
                          <p className="text-sm mb-4">
                            This is a common permission for system utilities. The execute bit is set for all, 
                            allowing anyone to run the program.
                          </p>
                          <div className="font-mono">
                            <div>Numeric: <code>755</code></div>
                            <div className="text-sm opacity-80 mt-2">Owner: 7 (4+2+1)</div>
                            <div className="text-sm opacity-80">Group: 5 (4+0+1)</div>
                            <div className="text-sm opacity-80">Others: 5 (4+0+1)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeExample === 'directory' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Directory Example: drwxr-xr-x</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Real-World Scenario:</h4>
                          <p className="mb-4">
                            Project directory at Ichapur Institute where <span className="font-semibold">Abhronila</span> 
                            is team lead. Everyone can list and enter, but only she can create/delete files.
                          </p>
                          <div className="space-y-3">
                            <div className="p-2 bg-black/20 rounded">
                              <div className="font-mono">d rwx r-x r-x</div>
                              <div className="text-xs opacity-80 mt-1">Position 0: <code>d</code> = Directory</div>
                            </div>
                            <div>
                              <div className="font-semibold">Key Directory Behaviors:</div>
                              <ul className="text-sm space-y-1 mt-2">
                                <li>• <code>x</code> on directory = "enter directory"</li>
                                <li>• <code>w</code> on directory = "create/delete files"</li>
                                <li>• <code>r</code> on directory = "list contents"</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Practical Test:</h4>
                          <div className="space-y-4">
                            <div className={clsx(
                              "p-3 rounded-lg",
                              isDarkMode ? "bg-gray-700/50" : "bg-gray-200"
                            )}>
                              <div className="font-mono text-sm">$ cd project</div>
                              <div className="text-xs mt-1">
                                Group/Others can execute (x), so they can enter
                              </div>
                            </div>
                            <div className={clsx(
                              "p-3 rounded-lg",
                              isDarkMode ? "bg-gray-700/50" : "bg-gray-200"
                            )}>
                              <div className="font-mono text-sm">$ touch project/newfile.txt</div>
                              <div className="text-xs mt-1 text-red-400">
                                ❌ Group/Others cannot write (no w), so they cannot create files
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeExample === 'symlink' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-pink-400">Symbolic Link: lrwxrwxrwx</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Special Case:</h4>
                          <p className="mb-4">
                            Symbolic links <span className="italic">always</span> show <code>rwxrwxrwx</code> permissions, 
                            but these are ignored. Actual permissions are from the target file.
                          </p>
                          <div className="space-y-3">
                            <div className={clsx(
                              "p-3 rounded-lg border",
                              isDarkMode ? "bg-gray-700/30 border-pink-500/30" : "bg-pink-50 border-pink-200"
                            )}>
                              <div className="font-mono">l rwx rwx rwx</div>
                              <div className="text-sm mt-2">
                                Position 0: <code>l</code> indicates symbolic link
                              </div>
                            </div>
                            <div className="text-sm opacity-80">
                              This is a common point of confusion. The permissions shown are just placeholders.
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Real Example:</h4>
                          <div className={clsx(
                            "p-4 rounded-lg",
                            isDarkMode ? "bg-gray-800" : "bg-gray-100"
                          )}>
                            <div className="font-mono space-y-2 text-sm">
                              <div>$ ls -l /usr/bin/python</div>
                              <div>lrwxrwxrwx 1 root root 9 Jan 1 12:00 /usr/bin/python → python3.9</div>
                              <div className="mt-4">$ ls -l $(readlink /usr/bin/python)</div>
                              <div>-rwxr-xr-x 1 root root 100 Jan 1 12:00 /usr/bin/python3.9</div>
                            </div>
                            <div className="text-xs mt-4 opacity-80">
                              Note: The actual permissions come from python3.9, not the symlink
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeExample === 'restrictive' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-red-400">Restrictive File: -r--------</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Security Use Case:</h4>
                          <p className="mb-4">
                            <span className="font-semibold">Debangshu</span> creates a private configuration file 
                            containing sensitive data. Only he should have access.
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                                <span className="text-white text-xs">D</span>
                              </div>
                              <span>Owner (Debangshu): <code>r--</code> (can read)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center mr-2">
                                <span className="text-white text-xs">G</span>
                              </div>
                              <span>Group: <code>---</code> (no access)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center mr-2">
                                <span className="text-white text-xs">O</span>
                              </div>
                              <span>Others: <code>---</code> (no access)</span>
                            </div>
                          </div>
                          <div className="mt-4 p-3 bg-black/20 rounded">
                            <div className="text-sm">Numeric: <code>400</code></div>
                            <div className="text-xs opacity-80">Owner: 4, Group: 0, Others: 0</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Important Note:</h4>
                          <div className={clsx(
                            "p-4 rounded-lg mb-4",
                            isDarkMode ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                          )}>
                            <div className="font-bold text-red-400 mb-2">⚠️ Common Mistake:</div>
                            <p className="text-sm">
                              Even root cannot read this file directly? <span className="font-semibold">False!</span> 
                              Root bypasses all permission checks. This only restricts non-root users.
                            </p>
                          </div>
                          <div className="text-sm">
                            <div className="font-semibold mb-2">When to use:</div>
                            <ul className="space-y-1">
                              <li>• SSH private keys (~/.ssh/id_rsa)</li>
                              <li>• Configuration files with passwords</li>
                              <li>• Personal notes or journals</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeExample === 'shared' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-cyan-400">Shared Group File: -rwxrwx---</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Team Collaboration:</h4>
                          <p className="mb-4">
                            At Naihati Research Center, a team works on a shared script. All team members 
                            need full access, but outsiders should have none.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono">- rwx rwx ---</div>
                              <div className="text-xs opacity-80 mt-1">Others get zero access (---)</div>
                            </div>
                            <div className="text-sm">
                              <div className="font-semibold">Prerequisites:</div>
                              <ol className="list-decimal pl-4 space-y-1 mt-2">
                                <li>Create a dedicated group: <code>sudo groupadd research</code></li>
                                <li>Add users to group: <code>sudo usermod -aG research tuhina</code></li>
                                <li>Set group on file: <code>sudo chgrp research script.sh</code></li>
                                <li>Set permissions: <code>chmod 770 script.sh</code></li>
                              </ol>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Verification Steps:</h4>
                          <div className={clsx(
                            "p-4 rounded-lg space-y-3",
                            isDarkMode ? "bg-gray-800" : "bg-gray-100"
                          )}>
                            <div>
                              <div className="font-mono text-sm">$ ls -l script.sh</div>
                              <div className="text-xs opacity-80">Should show: -rwxrwx---</div>
                            </div>
                            <div>
                              <div className="font-mono text-sm">$ groups</div>
                              <div className="text-xs opacity-80">Check if you're in the research group</div>
                            </div>
                            <div>
                              <div className="font-mono text-sm">$ id</div>
                              <div className="text-xs opacity-80">View all groups you belong to</div>
                            </div>
                          </div>
                          <div className="mt-4 text-sm opacity-80">
                            Note: Users must log out and back in for new group membership to take effect
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SEPARATE SECTION: Exceptions & Edge Cases */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-red-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Exceptions & Edge Cases
              </h2>
              
              <div className="space-y-6">
                {/* Exception 1 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                )}>
                  <h4 className="font-bold text-red-400 mb-3">Exception 1: The Root User Bypass</h4>
                  <p className="mb-3">
                    The root user (UID 0) can read, write, or execute any file regardless of permission settings. 
                    This is a critical system administration feature.
                  </p>
                  <div className={clsx(
                    "p-3 rounded-lg font-mono text-sm",
                    isDarkMode ? "bg-black/30" : "bg-white"
                  )}>
                    <div>$ ls -l /etc/shadow</div>
                    <div>-r-------- 1 root root 1000 Jan 1 12:00 /etc/shadow</div>
                    <div className="mt-2 text-green-400"># Even with 400 permissions, root can read and modify</div>
                  </div>
                </div>
                
                {/* Exception 2 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                )}>
                  <h4 className="font-bold text-yellow-400 mb-3">Exception 2: Sticky Bit on Directories</h4>
                  <p className="mb-3">
                    When the sticky bit (t) is set on a directory, users can only delete their own files, 
                    even if they have write permission on the directory.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="font-mono text-sm mb-2">drwxrwxrwt</div>
                      <div className="text-xs opacity-80">Note the 't' at the end instead of 'x'</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-semibold">Common location:</span> <code>/tmp</code> directory
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        Prevents users from deleting each other's temporary files
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Exception 3 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-purple-500/50 bg-purple-900/10" : "border-purple-400 bg-purple-50"
                )}>
                  <h4 className="font-bold text-purple-400 mb-3">Exception 3: Execute Without Read</h4>
                  <p className="mb-3">
                    It's possible to have execute permission without read permission. 
                    This is unusual but has specific use cases.
                  </p>
                  <div className="space-y-3">
                    <div className={clsx(
                      "p-3 rounded-lg",
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <div className="font-mono">--x------</div>
                      <div className="text-sm mt-1">Owner can execute but cannot read the file contents</div>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Use case:</span> Proprietary binaries where you want users 
                      to run the program but not examine or copy the code.
                    </div>
                  </div>
                </div>
                
                {/* Exception 4 */}
                <div className={clsx(
                  "p-5 rounded-xl border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-blue-500/50 bg-blue-900/10" : "border-blue-400 bg-blue-50"
                )}>
                  <h4 className="font-bold text-blue-400 mb-3">Exception 4: Read-Only Directories</h4>
                  <p className="mb-3">
                    A directory with only read permission (r--) is virtually useless but reveals an 
                    important concept about permission interactions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-mono text-sm">dr--r--r--</div>
                      <div className="text-xs opacity-80 mt-1">Directory permissions</div>
                    </div>
                    <div>
                      <div className="text-sm">
                        <div className="font-semibold">What happens:</div>
                        <ul className="mt-1 space-y-1 text-xs">
                          <li>• Can list files (ls)</li>
                          <li>• Cannot enter (cd fails)</li>
                          <li>• Cannot create/delete files</li>
                          <li>• Cannot access file contents</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-red-400">
                    This is a common misconfiguration that causes "Permission denied" errors
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Reference Table */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Quick Reference: Common Permission Strings
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={clsx(
                      "border-b",
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    )}>
                      <th className="text-left py-3 px-4">Permission</th>
                      <th className="text-left py-3 px-4">Numeric</th>
                      <th className="text-left py-3 px-4">Description</th>
                      <th className="text-left py-3 px-4">Common Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { perm: '-rw-------', num: '600', desc: 'Owner read+write', use: 'Private files' },
                      { perm: '-rw-r--r--', num: '644', desc: 'Owner rw, others read', use: 'Web files, configs' },
                      { perm: '-rwx------', num: '700', desc: 'Owner full control', use: 'Private scripts' },
                      { perm: '-rwxr-xr-x', num: '755', desc: 'Owner full, others rx', use: 'Public scripts' },
                      { perm: '-rwxrwx---', num: '770', desc: 'Owner+group full', use: 'Team projects' },
                      { perm: 'drwx------', num: '700', desc: 'Private directory', use: 'Home directories' },
                      { perm: 'drwxr-xr-x', num: '755', desc: 'Public directory', use: 'Web root' },
                      { perm: 'drwxrwx---', num: '770', desc: 'Shared directory', use: 'Group workspace' },
                      { perm: 'drwxrwxrwt', num: '1777', desc: 'Sticky temp dir', use: '/tmp directory' },
                    ].map((row, index) => (
                      <tr 
                        key={index} 
                        className={clsx(
                          "border-b transition-all duration-200 hover:bg-white/5",
                          isDarkMode ? "border-gray-800" : "border-gray-200"
                        )}
                      >
                        <td className="py-3 px-4 font-mono">{row.perm}</td>
                        <td className="py-3 px-4 font-mono">{row.num}</td>
                        <td className="py-3 px-4">{row.desc}</td>
                        <td className="py-3 px-4 text-sm opacity-80">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  "When I teach at Barrackpore College, I tell students to practice 'permission math' daily. 
                  Look at any file and mentally calculate its numeric value. After a week, you'll read 
                  permissions like a book. Remember: Position 0 tells you WHAT it is, positions 1-9 tell 
                  you WHO can do WHAT."
                </p>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4",
                  isDarkMode ? "bg-black/30" : "bg-white/20"
                )}>
                  <h4 className="font-bold text-yellow-300 mb-2">Memory Trick:</h4>
                  <p className="text-sm">
                    Think of the permission string as a phone number: (Type)-(Owner Area Code)-(Group Area Code)-(Others Area Code). 
                    Each area code has 3 digits: r, w, x. If the digit is present, it's lit up; if it's absent, it's a dash.
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
                      Why does a symbolic link always show <code>lrwxrwxrwx</code> permissions? 
                      What would happen if it showed the actual permissions of the target file?
                      <span className="block mt-2 text-sm opacity-80">
                        Consider what happens when you move or delete the target file while the symlink exists...
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
            <p>Topic 2: Reading Permission Strings • Next: Numeric Permission System</p>
            <p className="mt-2">Practice: Run <code>ls -l /bin</code> and decode 10 different permission strings</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Topic1;