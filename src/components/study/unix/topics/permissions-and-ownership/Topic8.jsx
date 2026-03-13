import React from 'react';
import clsx from 'clsx';

class Topic8 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isReducedMotion: false,
      activePermission: 'setuid',
      showExample: false,
      showDanger: false,
      selectedFile: 'passwd',
      simulationActive: false
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

  handlePermissionChange = (permission) => {
    this.setState({ 
      activePermission: permission,
      showExample: false,
      showDanger: permission === 'setuid' // Show danger for setuid
    });
  };

  handleFileSelect = (file) => {
    this.setState({ selectedFile: file });
  };

  toggleSimulation = () => {
    this.setState({ simulationActive: !this.state.simulationActive });
  };

  showExample = () => {
    this.setState({ showExample: true });
    
    // Hide after 5 seconds
    setTimeout(() => {
      this.setState({ showExample: false });
    }, 5000);
  };

  render() {
    const { isDarkMode, isReducedMotion, activePermission, showExample, showDanger, selectedFile, simulationActive } = this.state;
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
    const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
    const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';
    const extraStaggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]';

    const specialPermissions = [
      { 
        id: 'setuid', 
        name: 'setuid (Set User ID)', 
        symbol: 's', 
        position: 'user',
        octal: '4000',
        color: 'bg-red-500',
        description: 'Run as file owner, not executor'
      },
      { 
        id: 'setgid', 
        name: 'setgid (Set Group ID)', 
        symbol: 's', 
        position: 'group',
        octal: '2000',
        color: 'bg-green-500',
        description: 'Run with file group privileges'
      },
      { 
        id: 'sticky', 
        name: 'Sticky Bit', 
        symbol: 't', 
        position: 'others',
        octal: '1000',
        color: 'bg-blue-500',
        description: 'Only owner can delete in directory'
      }
    ];

    const systemFiles = [
      { id: 'passwd', name: '/usr/bin/passwd', permissions: '-rwsr-xr-x', owner: 'root', special: 'setuid' },
      { id: 'sudo', name: '/usr/bin/sudo', permissions: '-rwsr-xr-x', owner: 'root', special: 'setuid' },
      { id: 'tmp', name: '/tmp', permissions: 'drwxrwxrwt', owner: 'root', special: 'sticky' },
      { id: 'mail', name: '/var/mail', permissions: 'drwxrws---', owner: 'root', special: 'setgid' },
      { id: 'cron', name: '/usr/bin/crontab', permissions: '-r-sr-sr-x', owner: 'root', special: 'setuid+setgid' }
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
            
            @keyframes permissionGlow {
              0%, 100% { 
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3);
              }
              50% { 
                box-shadow: 0 0 20px 5px rgba(239, 68, 68, 0.5);
              }
            }
            
            @keyframes stickyFlow {
              0% { transform: translateY(0); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateY(-50px); opacity: 0; }
            }
            
            .permission-glow {
              animation: permissionGlow 2s ease-in-out infinite;
            }
            
            .sticky-flow {
              animation: stickyFlow 3s linear infinite;
            }
            
            @keyframes privilegeElevate {
              0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
            }
            
            .privilege-elevate {
              animation: privilegeElevate 2s ease-in-out infinite;
            }
          `}
        </style>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <header className={`mb-12 ${animationClass} opacity-0`}>
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">
              Special Permissions: setuid, setgid and sticky bit
            </h1>
            <p className="text-lg opacity-80">
              Topic 9: Going beyond basic permissions with special privilege bits
            </p>
            <div className="h-1 w-24 bg-red-500 mt-4 rounded-full"></div>
          </header>

          {/* Danger Warning for setuid */}
          {showDanger && (
            <div className={`mb-8 p-4 rounded-xl border permission-glow ${
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
                  <h3 className="font-bold">SECURITY WARNING: setuid</h3>
                  <p className="text-sm">
                    setuid executables run with owner's privileges - major security risk if misconfigured!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-8">
            {/* Special Permissions Overview */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                The Three Special Permission Bits
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
                      height="220" 
                      viewBox="0 0 800 220" 
                      className="overflow-visible"
                    >
                      {/* Standard permission visualization */}
                      <g>
                        <text x="400" y="30" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="14">Standard Permission String</text>
                        
                        {/* Standard positions */}
                        <g>
                          <rect x="200" y="50" width="400" height="40" rx="8" 
                                fill={isDarkMode ? "#374151" : "#E5E7EB"} 
                                stroke={isDarkMode ? "#4B5563" : "#D1D5DB"} 
                                strokeWidth="2" />
                          
                          {/* Permission characters */}
                          <g>
                            <text x="220" y="78" textAnchor="middle" fill={isDarkMode ? "#F59E0B" : "#D97706"} fontSize="16" fontWeight="bold">-</text>
                            <text x="260" y="78" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">r</text>
                            <text x="300" y="78" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">w</text>
                            <text x="340" y="78" textAnchor="middle" fill={isDarkMode ? "#EF4444" : "#DC2626"} fontSize="16" fontWeight="bold">x</text>
                            <text x="380" y="78" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">r</text>
                            <text x="420" y="78" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">w</text>
                            <text x="460" y="78" textAnchor="middle" fill={isDarkMode ? "#10B981" : "#059669"} fontSize="16" fontWeight="bold">x</text>
                            <text x="500" y="78" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">r</text>
                            <text x="540" y="78" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">w</text>
                            <text x="580" y="78" textAnchor="middle" fill={isDarkMode ? "#3B82F6" : "#1D4ED8"} fontSize="16" fontWeight="bold">x</text>
                          </g>
                          
                          {/* Labels */}
                          <text x="220" y="110" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="10">Type</text>
                          <text x="260" y="110" textAnchor="middle" fill={isDarkMode ? "#60A5FA" : "#3B82F6"} fontSize="10">User</text>
                          <text x="340" y="110" textAnchor="middle" fill={isDarkMode ? "#EF4444" : "#DC2626"} fontSize="10" fontWeight="bold">setuid</text>
                          <text x="420" y="110" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#10B981"} fontSize="10">Group</text>
                          <text x="460" y="110" textAnchor="middle" fill={isDarkMode ? "#10B981" : "#059669"} fontSize="10" fontWeight="bold">setgid</text>
                          <text x="540" y="110" textAnchor="middle" fill={isDarkMode ? "#A78BFA" : "#8B5CF6"} fontSize="10">Others</text>
                          <text x="580" y="110" textAnchor="middle" fill={isDarkMode ? "#3B82F6" : "#1D4ED8"} fontSize="10" fontWeight="bold">sticky</text>
                        </g>
                        
                        {/* Special bit indicators */}
                        <g>
                          {/* setuid indicator */}
                          <g className={activePermission === 'setuid' ? "privilege-elevate" : ""}>
                            <circle cx="340" cy="150" r="20" 
                                    fill={isDarkMode ? "#DC2626" : "#EF4444"} 
                                    fillOpacity="0.3" 
                                    stroke={isDarkMode ? "#F87171" : "#DC2626"} 
                                    strokeWidth="2" />
                            <text x="340" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">s</text>
                            <text x="340" y="175" textAnchor="middle" fill={isDarkMode ? "#F87171" : "#DC2626"} fontSize="10">setuid</text>
                            <path d="M340 110 L340 130" stroke={isDarkMode ? "#F87171" : "#DC2626"} strokeWidth="2" fill="none" />
                          </g>
                          
                          {/* setgid indicator */}
                          <g className={activePermission === 'setgid' ? "privilege-elevate" : ""} style={{animationDelay: '0.5s'}}>
                            <circle cx="460" cy="150" r="20" 
                                    fill={isDarkMode ? "#059669" : "#10B981"} 
                                    fillOpacity="0.3" 
                                    stroke={isDarkMode ? "#34D399" : "#059669"} 
                                    strokeWidth="2" />
                            <text x="460" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">s</text>
                            <text x="460" y="175" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#059669"} fontSize="10">setgid</text>
                            <path d="M460 110 L460 130" stroke={isDarkMode ? "#34D399" : "#059669"} strokeWidth="2" fill="none" />
                          </g>
                          
                          {/* sticky bit indicator */}
                          <g className={activePermission === 'sticky' ? "privilege-elevate" : ""} style={{animationDelay: '1s'}}>
                            <circle cx="580" cy="150" r="20" 
                                    fill={isDarkMode ? "#1D4ED8" : "#3B82F6"} 
                                    fillOpacity="0.3" 
                                    stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"} 
                                    strokeWidth="2" />
                            <text x="580" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">t</text>
                            <text x="580" y="175" textAnchor="middle" fill={isDarkMode ? "#60A5FA" : "#1D4ED8"} fontSize="10">sticky</text>
                            <path d="M580 110 L580 130" stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"} strokeWidth="2" fill="none" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {specialPermissions.map((perm) => (
                      <button
                        key={perm.id}
                        onClick={() => this.handlePermissionChange(perm.id)}
                        className={clsx(
                          "p-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-left",
                          activePermission === perm.id
                            ? isDarkMode 
                              ? `${perm.color} text-white shadow-lg` 
                              : `${perm.color} text-white shadow-lg`
                            : isDarkMode
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-gray-200 hover:bg-gray-300"
                        )}
                      >
                        <div className="flex items-center mb-2">
                          <div className="text-2xl font-bold mr-2">{perm.symbol}</div>
                          <div>
                            <div className="font-bold">{perm.name}</div>
                            <div className="text-xs opacity-80">Octal: {perm.octal}</div>
                          </div>
                        </div>
                        <div className="text-sm">{perm.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Explanation */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Detailed Explanation: {specialPermissions.find(p => p.id === activePermission)?.name}
              </h2>
              
              <div className="mb-8">
                {activePermission === 'setuid' && (
                  <div className="space-y-6">
                    <div className={clsx(
                      "p-6 rounded-xl",
                      isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                    )}>
                      <h3 className="text-xl font-bold mb-4 text-red-400">setuid (Set User ID)</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-blue-400 mb-3">How It Works</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span>When a user executes a setuid file, it runs with the <strong>file owner's privileges</strong></span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span>Normal: Process runs with executor's UID</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span>With setuid: Process runs with file owner's UID</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span>Displayed as <code>s</code> instead of <code>x</code> in user execute position</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-green-400 mb-3">Common Examples</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono text-sm">-rwsr-xr-x root root /usr/bin/passwd</div>
                              <div className="text-xs mt-1">Allows users to change their own password</div>
                            </div>
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono text-sm">-rwsr-xr-x root root /usr/bin/sudo</div>
                              <div className="text-xs mt-1">Allows privilege escalation</div>
                            </div>
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono text-sm">-rwsr-sr-x root root /usr/bin/ping</div>
                              <div className="text-xs mt-1">Allows users to send ICMP packets</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-bold text-yellow-400 mb-3">Security Implications</h4>
                        <div className={clsx(
                          "p-4 rounded-lg border-l-4",
                          isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                        )}>
                          <p className="text-sm">
                            <strong>⚠️ MAJOR SECURITY RISK if misconfigured!</strong> Any vulnerability in a setuid 
                            program can lead to privilege escalation. At Barrackpore College, a student created 
                            a setuid shell script that was exploited to gain root access.
                          </p>
                          <div className="font-mono text-sm mt-2 p-2 bg-black/20 rounded text-red-400">
                            # NEVER DO THIS!<br/>
                            $ chmod 4755 shell_script.sh<br/>
                            $ sudo chown root shell_script.sh
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button
                        onClick={this.showExample}
                        className={clsx(
                          "px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105",
                          isDarkMode 
                            ? "bg-red-600 hover:bg-red-500" 
                            : "bg-red-500 hover:bg-red-400"
                        )}
                      >
                        Show setuid Example
                      </button>
                    </div>
                  </div>
                )}
                
                {activePermission === 'setgid' && (
                  <div className="space-y-6">
                    <div className={clsx(
                      "p-6 rounded-xl",
                      isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                    )}>
                      <h3 className="text-xl font-bold mb-4 text-green-400">setgid (Set Group ID)</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-blue-400 mb-3">How It Works</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span>On <strong>files</strong>: Runs with file's group privileges</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span>On <strong>directories</strong>: New files inherit directory's group</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span>Displayed as <code>s</code> instead of <code>x</code> in group execute position</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span>Essential for collaborative directories</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-purple-400 mb-3">Common Examples</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono text-sm">drwxrws--- root developers /project/</div>
                              <div className="text-xs mt-1">Team project directory at Ichapur Institute</div>
                            </div>
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono text-sm">drwxr-sr-x root utmp /var/log/</div>
                              <div className="text-xs mt-1">Log files directory</div>
                            </div>
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono text-sm">-rwsr-sr-x root shadow /usr/bin/chage</div>
                              <div className="text-xs mt-1">Password aging utility</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-bold text-yellow-400 mb-3">Real-World Use Case</h4>
                        <div className={clsx(
                          "p-4 rounded-lg",
                          isDarkMode ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                        )}>
                          <p className="text-sm mb-3">
                            At Shyamnagar Lab, researchers need to share files in <code>/shared/research/</code>:
                          </p>
                          <div className="font-mono text-sm space-y-2">
                            <div>$ sudo chgrp researchers /shared/research/</div>
                            <div>$ sudo chmod 2775 /shared/research/</div>
                            <div>$ ls -ld /shared/research/</div>
                            <div className="text-green-400">drwxrwsr-x root researchers /shared/research/</div>
                            <div className="text-xs opacity-80 mt-2">
                              Now all files created in this directory inherit "researchers" group
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button
                        onClick={this.showExample}
                        className={clsx(
                          "px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105",
                          isDarkMode 
                            ? "bg-green-600 hover:bg-green-500" 
                            : "bg-green-500 hover:bg-green-400"
                        )}
                      >
                        Show setgid Example
                      </button>
                    </div>
                  </div>
                )}
                
                {activePermission === 'sticky' && (
                  <div className="space-y-6">
                    <div className={clsx(
                      "p-6 rounded-xl",
                      isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                    )}>
                      <h3 className="text-xl font-bold mb-4 text-blue-400">Sticky Bit</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-blue-400 mb-3">How It Works</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                              <span>Only meaningful on <strong>directories</strong></span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                              <span>In sticky directories, users can only delete their <strong>own files</strong></span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                              <span>Displayed as <code>t</code> instead of <code>x</code> in others execute position</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                              <span>Prevents users from deleting each other's files</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-purple-400 mb-3">Common Examples</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono text-sm">drwxrwxrwt root root /tmp/</div>
                              <div className="text-xs mt-1">Temporary directory - everyone can create, only delete own</div>
                            </div>
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono text-sm">drwxrwxrwt root root /var/tmp/</div>
                              <div className="text-xs mt-1">Persistent temporary directory</div>
                            </div>
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-mono text-sm">drwxrwsrwt root staff /shared/upload/</div>
                              <div className="text-xs mt-1">Shared upload directory at Naihati Center</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-bold text-yellow-400 mb-3">Visualization</h4>
                        <div className={clsx(
                          "p-4 rounded-lg relative overflow-hidden",
                          isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                        )}>
                          {/* Sticky bit animation */}
                          {simulationActive && (
                            <>
                              <div className="absolute left-1/4 top-0 sticky-flow" style={{animationDelay: '0s'}}>
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                  <span className="text-white text-xs">S</span>
                                </div>
                              </div>
                              <div className="absolute left-1/2 top-0 sticky-flow" style={{animationDelay: '1s'}}>
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                  <span className="text-white text-xs">T</span>
                                </div>
                              </div>
                              <div className="absolute left-3/4 top-0 sticky-flow" style={{animationDelay: '2s'}}>
                                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                                  <span className="text-white text-xs">D</span>
                                </div>
                              </div>
                            </>
                          )}
                          
                          <div className="relative z-10">
                            <p className="text-sm mb-3">
                              In <code>/tmp</code> directory at Barrackpore College:
                            </p>
                            <div className="font-mono text-sm space-y-2">
                              <div>$ ls -ld /tmp</div>
                              <div>drwxrwxrwt 15 root root 4096 Jan 15 10:30 /tmp</div>
                              <div>$ touch /tmp/swadeep.txt</div>
                              <div>$ touch /tmp/tuhina.txt</div>
                              <div>$ rm /tmp/tuhina.txt  # As Swadeep: Permission denied!</div>
                              <div className="text-red-400">rm: cannot remove '/tmp/tuhina.txt': Operation not permitted</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <button
                        onClick={this.toggleSimulation}
                        className={clsx(
                          "px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 mr-4",
                          isDarkMode 
                            ? simulationActive ? "bg-red-600" : "bg-blue-600 hover:bg-blue-500" 
                            : simulationActive ? "bg-red-500" : "bg-blue-500 hover:bg-blue-400"
                        )}
                      >
                        {simulationActive ? 'Stop Simulation' : 'Start Sticky Bit Simulation'}
                      </button>
                      <button
                        onClick={this.showExample}
                        className={clsx(
                          "px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105",
                          isDarkMode 
                            ? "bg-green-600 hover:bg-green-500" 
                            : "bg-green-500 hover:bg-green-400"
                        )}
                      >
                        Show Example
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Example Output */}
                {showExample && (
                  <div className={clsx(
                    "p-6 rounded-xl mt-6 transition-all duration-300",
                    isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                  )}>
                    <h4 className="font-bold text-yellow-400 mb-4">Example Output</h4>
                    {activePermission === 'setuid' && (
                      <div className="font-mono text-sm space-y-2">
                        <div className="text-green-400"># Check passwd command:</div>
                        <div>$ ls -l /usr/bin/passwd</div>
                        <div>-rwsr-xr-x 1 root root 63960 Feb 7 2022 /usr/bin/passwd</div>
                        <div className="text-green-400 mt-2"># Note the 's' in user execute position</div>
                        <div className="text-green-400 mt-2"># Set setuid on a file:</div>
                        <div>$ sudo chmod u+s program</div>
                        <div>$ sudo chmod 4755 program</div>
                        <div className="text-xs opacity-80 mt-2">Both commands achieve same result</div>
                      </div>
                    )}
                    {activePermission === 'setgid' && (
                      <div className="font-mono text-sm space-y-2">
                        <div className="text-green-400"># Create collaborative directory:</div>
                        <div>$ sudo mkdir /shared</div>
                        <div>$ sudo chgrp developers /shared</div>
                        <div>$ sudo chmod 2775 /shared</div>
                        <div>$ ls -ld /shared</div>
                        <div className="text-green-400">drwxrwsr-x 2 root developers 4096 Jan 15 10:30 /shared</div>
                        <div className="text-green-400 mt-2"># Test inheritance:</div>
                        <div>$ touch /shared/test.txt</div>
                        <div>$ ls -l /shared/test.txt</div>
                        <div>-rw-r--r-- 1 swadeep developers 0 Jan 15 10:30 /shared/test.txt</div>
                        <div className="text-xs opacity-80 mt-2">File automatically gets 'developers' group!</div>
                      </div>
                    )}
                    {activePermission === 'sticky' && (
                      <div className="font-mono text-sm space-y-2">
                        <div className="text-green-400"># Check /tmp directory:</div>
                        <div>$ ls -ld /tmp</div>
                        <div>drwxrwxrwt 15 root root 4096 Jan 15 10:30 /tmp</div>
                        <div className="text-green-400 mt-2"># Set sticky bit on a directory:</div>
                        <div>$ sudo chmod +t /shared/uploads/</div>
                        <div>$ sudo chmod 1777 /shared/uploads/</div>
                        <div>$ ls -ld /shared/uploads/</div>
                        <div className="text-green-400">drwxrwxrwt 2 root root 4096 Jan 15 10:30 /shared/uploads/</div>
                        <div className="text-xs opacity-80 mt-2">Now users can only delete their own files</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* System Files Explorer */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                System Files with Special Permissions
              </h2>
              
              <div className="mb-6">
                <div className={clsx(
                  "p-6 rounded-xl mb-6",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                )}>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">Select a System File to Examine</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {systemFiles.map((file) => (
                      <button
                        key={file.id}
                        onClick={() => this.handleFileSelect(file.id)}
                        className={clsx(
                          "p-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-left",
                          selectedFile === file.id
                            ? isDarkMode 
                              ? "bg-purple-600 text-white shadow-lg" 
                              : "bg-purple-500 text-white shadow-lg"
                            : isDarkMode
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-gray-200 hover:bg-gray-300"
                        )}
                      >
                        <div className="font-mono text-sm mb-2">{file.name}</div>
                        <div className="text-xs opacity-80">
                          {file.permissions} • {file.owner}
                        </div>
                        <div className="mt-2">
                          <span className={clsx(
                            "px-2 py-1 rounded text-xs",
                            file.special.includes('setuid') ? "bg-red-500" :
                            file.special.includes('setgid') ? "bg-green-500" :
                            "bg-blue-500"
                          )}>
                            {file.special}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* File Details */}
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDarkMode ? "bg-gray-800/30" : "bg-white"
                  )}>
                    {(() => {
                      const file = systemFiles.find(f => f.id === selectedFile);
                      if (!file) return null;
                      
                      return (
                        <div>
                          <h4 className="font-bold text-yellow-400 mb-4">{file.name}</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="font-mono text-2xl mb-4 text-center">{file.permissions}</div>
                              
                              <div className="space-y-3">
                                <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                                  <span>Owner:</span>
                                  <span className="font-bold">{file.owner}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                                  <span>Special Bit:</span>
                                  <span className={clsx(
                                    "px-2 py-1 rounded text-xs",
                                    file.special.includes('setuid') ? "bg-red-500" :
                                    file.special.includes('setgid') ? "bg-green-500" :
                                    "bg-blue-500"
                                  )}>
                                    {file.special}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-black/20 rounded">
                                  <span>Octal Value:</span>
                                  <span className="font-mono">
                                    {file.special.includes('setuid') ? '4' : '0'}
                                    {file.special.includes('setgid') ? '2' : '0'}
                                    {file.special.includes('sticky') ? '1' : '0'}
                                    755
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-bold text-green-400 mb-3">Purpose & Security</h5>
                              {file.id === 'passwd' && (
                                <div className="text-sm space-y-2">
                                  <p>Allows users to change their own password in <code>/etc/shadow</code></p>
                                  <p>Without setuid, regular users couldn't write to system password file</p>
                                  <div className={clsx(
                                    "p-3 rounded-lg mt-3",
                                    isDarkMode ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                                  )}>
                                    <div className="font-semibold text-red-400">Security Check:</div>
                                    <div className="text-xs">setuid + owned by root = Critical security component</div>
                                  </div>
                                </div>
                              )}
                              {file.id === 'tmp' && (
                                <div className="text-sm space-y-2">
                                  <p>World-writable directory for temporary files</p>
                                  <p>Sticky bit prevents users from deleting each other's files</p>
                                  <p>Essential for multi-user systems like Barrackpore College lab</p>
                                  <div className={clsx(
                                    "p-3 rounded-lg mt-3",
                                    isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                                  )}>
                                    <div className="font-semibold text-blue-400">Without Sticky Bit:</div>
                                    <div className="text-xs">Anyone could delete anyone else's temporary files!</div>
                                  </div>
                                </div>
                              )}
                              {file.id === 'mail' && (
                                <div className="text-sm space-y-2">
                                  <p>Mail spool directory at Ichapur Institute</p>
                                  <p>setgid ensures mail files have correct group ownership</p>
                                  <p>Mail server (postfix) runs as mail group</p>
                                  <div className={clsx(
                                    "p-3 rounded-lg mt-3",
                                    isDarkMode ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                                  )}>
                                    <div className="font-semibold text-green-400">Group Inheritance:</div>
                                    <div className="text-xs">New mail files automatically get 'mail' group</div>
                                  </div>
                                </div>
                              )}
                              {file.id === 'sudo' && (
                                <div className="text-sm space-y-2">
                                  <p>Allows authorized users to run commands as root</p>
                                  <p>Most powerful setuid program on the system</p>
                                  <p>Extensively audited for security vulnerabilities</p>
                                  <div className={clsx(
                                    "p-3 rounded-lg mt-3",
                                    isDarkMode ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                                  )}>
                                    <div className="font-semibold text-red-400">⚠️ EXTREME CAUTION:</div>
                                    <div className="text-xs">Any vulnerability here = complete system compromise</div>
                                  </div>
                                </div>
                              )}
                              {file.id === 'cron' && (
                                <div className="text-sm space-y-2">
                                  <p>Both setuid and setgid (shown as 's' in both positions)</p>
                                  <p>Allows users to edit their own crontabs</p>
                                  <p>Runs with crontab file owner and group privileges</p>
                                  <div className={clsx(
                                    "p-3 rounded-lg mt-3",
                                    isDarkMode ? "bg-purple-900/20 border border-purple-700/30" : "bg-purple-50 border border-purple-200"
                                  )}>
                                    <div className="font-semibold text-purple-400">Double Special:</div>
                                    <div className="text-xs">Rare case of both setuid and setgid being set</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </section>

            {/* Setting & Removing Special Permissions */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-red-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Setting & Removing Special Permissions
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                  )}>
                    <h4 className="font-bold text-red-400 mb-3">setuid Commands</h4>
                    <div className="space-y-2 text-sm">
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod u+s program
                      </div>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod 4755 program
                      </div>
                      <div className="font-mono p-2 bg-black/20 rounded text-red-400">
                        $ chmod u-s program  # Remove
                      </div>
                      <div className="text-xs opacity-80 mt-2">
                        Octal: 4### (where ### are regular permissions)
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                  )}>
                    <h4 className="font-bold text-green-400 mb-3">setgid Commands</h4>
                    <div className="space-y-2 text-sm">
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod g+s directory
                      </div>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod 2775 directory
                      </div>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod g-s directory  # Remove
                      </div>
                      <div className="text-xs opacity-80 mt-2">
                        Octal: 2### (where ### are regular permissions)
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                  )}>
                    <h4 className="font-bold text-blue-400 mb-3">Sticky Bit Commands</h4>
                    <div className="space-y-2 text-sm">
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod +t directory
                      </div>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod 1777 directory
                      </div>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod -t directory  # Remove
                      </div>
                      <div className="text-xs opacity-80 mt-2">
                        Octal: 1### (where ### are regular permissions)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <h4 className="font-bold text-yellow-400 mb-4">Combining Special Permissions</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className={clsx(
                          "border-b",
                          isDarkMode ? "border-gray-700" : "border-gray-300"
                        )}>
                          <th className="text-left py-3 px-4">Octal</th>
                          <th className="text-left py-3 px-4">Symbolic</th>
                          <th className="text-left py-3 px-4">Meaning</th>
                          <th className="text-left py-3 px-4">Command</th>
                          <th className="text-left py-3 px-4">Use Case</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { 
                            octal: '4755', 
                            symbolic: '-rwsr-xr-x', 
                            meaning: 'setuid only', 
                            command: 'chmod 4755 file', 
                            useCase: 'System utilities like passwd' 
                          },
                          { 
                            octal: '2755', 
                            symbolic: 'drwxr-sr-x', 
                            meaning: 'setgid only', 
                            command: 'chmod 2755 dir', 
                            useCase: 'Shared team directory' 
                          },
                          { 
                            octal: '1755', 
                            symbolic: 'drwxr-xr-t', 
                            meaning: 'sticky only', 
                            command: 'chmod 1755 dir', 
                            useCase: '/tmp directory' 
                          },
                          { 
                            octal: '6755', 
                            symbolic: '-rwsr-sr-x', 
                            meaning: 'setuid + setgid', 
                            command: 'chmod 6755 file', 
                            useCase: 'crontab command' 
                          },
                          { 
                            octal: '3777', 
                            symbolic: 'drwxrwsrwt', 
                            meaning: 'setgid + sticky', 
                            command: 'chmod 3777 dir', 
                            useCase: 'World-writable shared directory' 
                          },
                          { 
                            octal: '7777', 
                            symbolic: 'drwsrwsrwt', 
                            meaning: 'All three', 
                            command: 'chmod 7777 dir', 
                            useCase: '⚠️ EXTREMELY DANGEROUS' 
                          },
                        ].map((row, index) => (
                          <tr 
                            key={index} 
                            className={clsx(
                              "border-b transition-all duration-200 hover:bg-white/5",
                              isDarkMode ? "border-gray-800" : "border-gray-200"
                            )}
                          >
                            <td className="py-3 px-4 font-mono">{row.octal}</td>
                            <td className="py-3 px-4 font-mono">{row.symbolic}</td>
                            <td className="py-3 px-4">{row.meaning}</td>
                            <td className="py-3 px-4 font-mono text-sm">{row.command}</td>
                            <td className="py-3 px-4 text-sm opacity-80">{row.useCase}</td>
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
                  <h4 className="font-bold text-red-400 mb-3">⚠️ Critical Security Guidelines</h4>
                  <div className="space-y-3 text-sm">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                        <span><strong>NEVER</strong> set setuid on shell scripts or interpreters (bash, python, etc.)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                        <span>Only root should own setuid files (unless you REALLY know what you're doing)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                        <span>Audit setuid files regularly: <code>find / -perm /4000 -type f</code></span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                        <span>Use setgid for collaboration instead of world-writable directories</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                        <span>Always use sticky bit on world-writable directories</span>
                      </li>
                    </ul>
                    <div className="font-mono p-2 bg-black/20 rounded text-red-400">
                      # Find all setuid files (security audit):<br/>
                      $ find / -type f -perm /4000 2>/dev/null
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
                  "Special permissions are like giving someone a master key or a security badge. 
                  At Shyamnagar Lab, I tell students: setuid is like giving your ID card to a trusted 
                  assistant - they can do things in your name. setgid is like giving department access - 
                  anyone in the department can use shared resources. The sticky bit is like a shared 
                  locker room - you can use any locker, but only you can empty your own locker. 
                  Remember: With great power (setuid) comes great responsibility!"
                </p>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4",
                  isDarkMode ? "bg-black/30" : "bg-white/20"
                )}>
                  <h4 className="font-bold text-yellow-300 mb-2">Memory Trick:</h4>
                  <p className="text-sm">
                    Think of the special permission positions: <strong>U</strong>ser (setuid), <strong>G</strong>roup (setgid), 
                    <strong>O</strong>thers (sticky). The octal values are powers of 2: 4 (2²), 2 (2¹), 1 (2⁰). 
                    When you see <code>s</code> or <code>t</code> instead of <code>x</code>, ask: "What special privilege is this granting?"
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
                      Why is it dangerous to set setuid on a shell script or Python script, 
                      but relatively safe on a compiled binary like <code>/usr/bin/passwd</code>?
                      <span className="block mt-2 text-sm opacity-80">
                        Consider how scripts can be modified vs compiled binaries, and environment variables...
                      </span>
                    </p>
                    <div className="mt-4 p-3 bg-black/20 rounded">
                      <div className="font-mono text-sm">
                        Hint: Scripts can be modified by the attacker, binaries cannot easily be changed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
            <p>Topic 9: Special Permissions • Next: Practical use of sticky bit in /tmp directory</p>
            <p className="mt-2">Practice: Examine system files with special permissions using <code>find / -perm /4000 2>/dev/null</code></p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Topic8;