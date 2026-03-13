import React from 'react';
import clsx from 'clsx';

import ShellFileLoader from "../../../../../common/ShellFileLoader";
import lsExampleSh from "./topic9_files/list_files.sh?raw";

class Topic9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isReducedMotion: false,
      activeTab: 'concept',
      simulationStep: 0,
      showProblem: false,
      tmpFiles: [
        { name: 'swadeep_temp.txt', owner: 'swadeep', size: '1K', time: '10:30', canDelete: true },
        { name: 'tuhina_data.csv', owner: 'tuhina', size: '50K', time: '10:32', canDelete: true },
        { name: 'abhronila_log.log', owner: 'abhronila', size: '100K', time: '10:35', canDelete: true },
        { name: 'system_cache.tmp', owner: 'root', size: '2M', time: '09:15', canDelete: false },
        { name: 'debangshu_backup.tar', owner: 'debangshu', size: '10M', time: '11:00', canDelete: true }
      ],
      userAction: null,
      actionResult: null
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
    this.setState({ 
      activeTab: tab,
      userAction: null,
      actionResult: null
    });
  };

  nextSimulationStep = () => {
    this.setState(prevState => ({
      simulationStep: prevState.simulationStep < 3 ? prevState.simulationStep + 1 : 0
    }));
  };

  simulateFileDelete = (fileName, user) => {
    const file = this.state.tmpFiles.find(f => f.name === fileName);
    if (!file) return;
    
    let result = '';
    let success = false;
    
    if (file.owner === user) {
      result = `✅ ${user} successfully deleted ${fileName}`;
      success = true;
    } else if (file.owner === 'root' && user !== 'root') {
      result = `❌ ${user} cannot delete ${fileName} (owned by root)`;
      success = false;
    } else if (file.owner !== user) {
      result = `❌ ${user} cannot delete ${fileName} (owned by ${file.owner})`;
      success = false;
    }
    
    this.setState({
      userAction: `${user} tries to delete ${fileName}`,
      actionResult: { text: result, success }
    });
  };

  showProblemScenario = () => {
    this.setState({ showProblem: true });
    
    setTimeout(() => {
      this.setState({ showProblem: false });
    }, 5000);
  };

  render() {
    const { isDarkMode, isReducedMotion, activeTab, simulationStep, showProblem, tmpFiles, userAction, actionResult } = this.state;
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
    const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
    const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';
    const extraStaggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]';

    const users = ['swadeep', 'tuhina', 'abhronila', 'debangshu', 'root'];

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
            
            @keyframes stickyProtect {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            
            @keyframes fileDelete {
              0% { opacity: 1; transform: translateX(0); }
              100% { opacity: 0; transform: translateX(100px); }
            }
            
            @keyframes problemFlash {
              0%, 100% { background-color: rgba(239, 68, 68, 0.1); }
              50% { background-color: rgba(239, 68, 68, 0.3); }
            }
            
            .sticky-protect {
              animation: stickyProtect 2s ease-in-out infinite;
            }
            
            .file-delete {
              animation: fileDelete 0.5s ease-out forwards;
            }
            
            .problem-flash {
              animation: problemFlash 1s ease-in-out 3;
            }
            
            @keyframes userWalk {
              0% { transform: translateX(-100px); opacity: 0; }
              20% { transform: translateX(0); opacity: 1; }
              80% { transform: translateX(0); opacity: 1; }
              100% { transform: translateX(100px); opacity: 0; }
            }
            
            .user-walk {
              animation: userWalk 3s ease-in-out;
            }
          `}
        </style>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <header className={`mb-12 ${animationClass} opacity-0`}>
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">
              Practical use of sticky bit in /tmp directory
            </h1>
            <p className="text-lg opacity-80">
              Topic 10: How the sticky bit enables secure multi-user temporary file storage
            </p>
            <div className="h-1 w-24 bg-blue-500 mt-4 rounded-full"></div>
          </header>

          {/* Main Content */}
          <div className="space-y-8">
            {/* The /tmp Directory Concept */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                The /tmp Directory: A Special Case
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
                      height="200" 
                      viewBox="0 0 800 200" 
                      className="overflow-visible"
                    >
                      {/* /tmp directory representation */}
                      <g>
                        <rect x="300" y="50" width="200" height="60" rx="10" 
                              fill={isDarkMode ? "#1E40AF" : "#3B82F6"} 
                              fillOpacity="0.3" 
                              stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"} 
                              strokeWidth="2"
                              className="sticky-protect" />
                        <text x="400" y="80" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">/tmp</text>
                        <text x="400" y="100" textAnchor="middle" fill={isDarkMode ? "#93C5FD" : "#1E40AF"} fontSize="12">drwxrwxrwt</text>
                      </g>
                      
                      {/* Users trying to access */}
                      <g>
                        {/* Swadeep */}
                        <g className={simulationStep >= 1 ? "user-walk" : ""}>
                          <circle cx="100" cy="150" r="20" 
                                  fill={isDarkMode ? "#3B82F6" : "#1D4ED8"} />
                          <text x="100" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">S</text>
                          <text x="100" y="175" textAnchor="middle" fill={isDarkMode ? "#93C5FD" : "#1E40AF"} fontSize="10">swadeep</text>
                        </g>
                        
                        {/* Tuhina */}
                        <g className={simulationStep >= 2 ? "user-walk" : ""} style={{animationDelay: '0.5s'}}>
                          <circle cx="200" cy="150" r="20" 
                                  fill={isDarkMode ? "#10B981" : "#059669"} />
                          <text x="200" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">T</text>
                          <text x="200" y="175" textAnchor="middle" fill={isDarkMode ? "#6EE7B7" : "#065F46"} fontSize="10">tuhina</text>
                        </g>
                        
                        {/* Abhronila */}
                        <g className={simulationStep >= 3 ? "user-walk" : ""} style={{animationDelay: '1s'}}>
                          <circle cx="600" cy="150" r="20" 
                                  fill={isDarkMode ? "#8B5CF6" : "#7C3AED"} />
                          <text x="600" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                          <text x="600" y="175" textAnchor="middle" fill={isDarkMode ? "#C4B5FD" : "#5B21B6"} fontSize="10">abhronila</text>
                        </g>
                        
                        {/* Debangshu */}
                        <g className={simulationStep >= 1 ? "user-walk" : ""} style={{animationDelay: '1.5s'}}>
                          <circle cx="700" cy="150" r="20" 
                                  fill={isDarkMode ? "#EF4444" : "#DC2626"} />
                          <text x="700" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
                          <text x="700" y="175" textAnchor="middle" fill={isDarkMode ? "#FCA5A5" : "#991B1B"} fontSize="10">debangshu</text>
                        </g>
                      </g>
                      
                      {/* Connection lines */}
                      <path d="M120 150 L300 80" stroke={isDarkMode ? "#60A5FA" : "#3B82F6"} strokeWidth="2" fill="none" strokeDasharray="3,3" />
                      <path d="M220 150 L300 80" stroke={isDarkMode ? "#34D399" : "#10B981"} strokeWidth="2" fill="none" strokeDasharray="3,3" />
                      <path d="M580 150 L500 80" stroke={isDarkMode ? "#A78BFA" : "#8B5CF6"} strokeWidth="2" fill="none" strokeDasharray="3,3" />
                      <path d="M680 150 L500 80" stroke={isDarkMode ? "#FCA5A5" : "#EF4444"} strokeWidth="2" fill="none" strokeDasharray="3,3" />
                    </svg>
                  </div>
                  
                  <div className="text-center mb-6">
                    <button
                      onClick={this.nextSimulationStep}
                      className={clsx(
                        "px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105",
                        isDarkMode 
                          ? "bg-blue-600 hover:bg-blue-500" 
                          : "bg-blue-500 hover:bg-blue-400"
                      )}
                    >
                      {simulationStep === 0 ? 'Start Simulation' : 
                       simulationStep === 3 ? 'Restart Simulation' : 'Next Step'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div className={clsx(
                      "p-4 rounded-lg border-l-4",
                      isDarkMode ? "border-blue-500/50 bg-blue-900/10" : "border-blue-400 bg-blue-50"
                    )}>
                      <h4 className="font-bold text-blue-400 mb-3">/tmp Characteristics</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                          <span><strong>World-writable:</strong> Anyone can create files</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                          <span><strong>Temporary storage:</strong> Files may be cleared on reboot</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                          <span><strong>Sticky bit enabled:</strong> drwxrwxrwt permissions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                          <span><strong>Essential for multi-user systems</strong></span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg border-l-4",
                      isDarkMode ? "border-green-500/50 bg-green-900/10" : "border-green-400 bg-green-50"
                    )}>
                      <h4 className="font-bold text-green-400 mb-3">Why Sticky Bit?</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Without sticky: Anyone can delete anyone's files</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>With sticky: Only file owner (or root) can delete</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Prevents accidental/malicious file deletion</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Essential for security in shared environments</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tab Navigation */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
              <div className="flex flex-wrap gap-2 mb-6">
                {['concept', 'simulation', 'real-world', 'security'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => this.handleTabChange(tab)}
                    className={clsx(
                      "px-4 py-3 rounded-lg transition-all duration-300 capitalize",
                      activeTab === tab
                        ? isDarkMode 
                          ? "bg-yellow-600 text-white shadow-lg" 
                          : "bg-yellow-500 text-white shadow-lg"
                        : isDarkMode
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-200 hover:bg-gray-300"
                    )}
                  >
                    {tab === 'concept' && 'Concept & Theory'}
                    {tab === 'simulation' && 'Interactive Simulation'}
                    {tab === 'real-world' && 'Real World Examples'}
                    {tab === 'security' && 'Security Implications'}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'concept' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Understanding /tmp Permissions</h3>
                    
                    <div className="space-y-6">
                      <div className={clsx(
                        "p-5 rounded-xl",
                        isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                      )}>
                        <div className="font-mono text-lg mb-4 text-center">
                          <span className="text-yellow-400">drwxrwxrwt</span> root root /tmp
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="font-bold text-blue-400">Directory</div>
                            <div className="text-sm">'d' = directory</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-green-400">World-writable</div>
                            <div className="text-sm">rwx for everyone</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-red-400">Sticky Bit</div>
                            <div className="text-sm">'t' = sticky bit set</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div>
                          <h4 className="font-bold text-green-400 mb-3">What Users Can Do</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Create files:</strong> Anyone can create new files</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Read files:</strong> Can read any file (if permissions allow)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Execute files:</strong> Can run executables from /tmp</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Delete own files:</strong> Only owner can delete their files</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-red-400 mb-3">What Users Cannot Do</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Delete others' files:</strong> Sticky bit prevents this</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Modify others' files:</strong> Need write permission on file</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Change directory ownership:</strong> Only root can do this</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Remove sticky bit:</strong> Only root can change permissions</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-4 rounded-lg",
                        isDarkMode ? "bg-yellow-900/20 border border-yellow-700/30" : "bg-yellow-50 border border-yellow-200"
                      )}>
                        <h4 className="font-bold text-yellow-400 mb-3">Technical Implementation</h4>
                        <div className="font-mono text-sm space-y-2">
                          <div># Check /tmp permissions:</div>
                          <div>$ ls -ld /tmp</div>
                          <div>drwxrwxrwt 15 root root 4096 Jan 15 10:30 /tmp</div>
                          <div className="mt-2"># Octal representation:</div>
                          <div>$ stat -c "%a %n" /tmp</div>
                          <div>1777 /tmp</div>
                          <div className="text-xs opacity-80 mt-2">
                            Note: 1777 = sticky bit (1) + regular 777 permissions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'simulation' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-green-400">Interactive /tmp Simulation</h3>
                    
                    <div className="space-y-6">
                      {/* File Display */}
                      <div className={clsx(
                        "p-6 rounded-xl",
                        isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                      )}>
                        <h4 className="font-bold text-blue-400 mb-4">/tmp Directory Contents</h4>
                        
                        <div className="mb-6">
                          <div className="font-mono p-3 bg-black/20 rounded mb-4">
                            $ ls -l /tmp<br/>
                            total 12M<br/>
                            drwxrwxrwt root root /tmp
                          </div>
                          
                          <div className="space-y-2">
                            {tmpFiles.map((file, index) => (
                              <div 
                                key={index}
                                className={clsx(
                                  "flex items-center justify-between p-3 rounded-lg transition-all duration-300",
                                  isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50" : "bg-gray-200 hover:bg-gray-300",
                                  actionResult && actionResult.text.includes(file.name) ? 
                                    (actionResult.success ? "file-delete" : "opacity-100") : ""
                                )}
                              >
                                <div className="flex items-center">
                                  <div className={clsx(
                                    "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                    file.owner === 'swadeep' ? "bg-blue-500" :
                                    file.owner === 'tuhina' ? "bg-green-500" :
                                    file.owner === 'abhronila' ? "bg-purple-500" :
                                    file.owner === 'debangshu' ? "bg-red-500" :
                                    "bg-yellow-500"
                                  )}>
                                    <span className="text-white text-xs">
                                      {file.owner.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="font-bold">{file.name}</div>
                                    <div className="text-xs opacity-80">
                                      Owner: {file.owner} • Size: {file.size} • Time: {file.time}
                                    </div>
                                  </div>
                                </div>
                                <div className={clsx(
                                  "px-2 py-1 rounded text-xs",
                                  file.canDelete ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                )}>
                                  {file.canDelete ? "Can delete own" : "Cannot delete"}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* User Actions */}
                        <div>
                          <h5 className="font-bold text-purple-400 mb-3">Try Deleting Files:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
                            {users.map((user) => (
                              <div key={user} className="text-center">
                                <div className={clsx(
                                  "w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1",
                                  user === 'swadeep' ? "bg-blue-500" :
                                  user === 'tuhina' ? "bg-green-500" :
                                  user === 'abhronila' ? "bg-purple-500" :
                                  user === 'debangshu' ? "bg-red-500" :
                                  "bg-yellow-500"
                                )}>
                                  <span className="text-white text-sm">
                                    {user.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="text-xs">{user}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                              <div className="text-sm mb-2">Select user:</div>
                              <select 
                                className="w-full p-2 rounded-lg bg-black/20"
                                onChange={(e) => this.setState({ selectedUser: e.target.value })}
                              >
                                {users.map((user) => (
                                  <option key={user} value={user}>{user}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <div className="text-sm mb-2">Select file to delete:</div>
                              <select 
                                className="w-full p-2 rounded-lg bg-black/20"
                                onChange={(e) => this.setState({ selectedFile: e.target.value })}
                              >
                                {tmpFiles.map((file) => (
                                  <option key={file.name} value={file.name}>{file.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-center">
                            <button
                              onClick={() => {
                                const user = this.state.selectedUser || 'swadeep';
                                const file = this.state.selectedFile || 'swadeep_temp.txt';
                                this.simulateFileDelete(file, user);
                              }}
                              className={clsx(
                                "px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105",
                                isDarkMode 
                                  ? "bg-red-600 hover:bg-red-500" 
                                  : "bg-red-500 hover:bg-red-400"
                              )}
                            >
                              Simulate Delete Attempt
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Results Display */}
                      {userAction && (
                        <div className={clsx(
                          "p-4 rounded-lg transition-all duration-300",
                          actionResult.success
                            ? isDarkMode ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                            : isDarkMode ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                        )}>
                          <h5 className="font-bold mb-2">
                            {actionResult.success ? '✅ Success' : '❌ Failure'}
                          </h5>
                          <div className="font-mono text-sm">
                            <div>Action: {userAction}</div>
                            <div>Result: {actionResult.text}</div>
                          </div>
                          <div className="text-xs opacity-80 mt-2">
                            {actionResult.success 
                              ? 'Sticky bit allows owners to delete their own files'
                              : 'Sticky bit prevents users from deleting others\' files'
                            }
                          </div>
                        </div>
                      )}
                      
                      <div className={clsx(
                        "p-4 rounded-lg",
                        isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                      )}>
                        <h4 className="font-bold text-blue-400 mb-3">Learning Point</h4>
                        <p className="text-sm">
                          The sticky bit (<code>t</code> in permissions) changes only one behavior: 
                          <strong> who can delete files in the directory</strong>. All other permissions 
                          (read, write, execute) work normally. This is why /tmp can be world-writable 
                          while still being secure.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'real-world' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-purple-400">Real-World /tmp Usage</h3>
                    
                    <div className="space-y-6">
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-blue-500/50 bg-blue-900/10" : "border-blue-400 bg-blue-50"
                      )}>
                        <h4 className="font-bold text-blue-400 mb-3">Scenario 1: Barrackpore College Lab</h4>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                          <div>
                            <p className="text-sm mb-3">
                              Multiple students use shared computers for programming assignments.
                            </p>
                            <div className="space-y-3">
                              <div className="p-2 bg-black/20 rounded">
                                <div className="font-semibold">Compilation:</div>
                                <div className="text-xs">gcc creates temporary files in /tmp</div>
                              </div>
                              <div className="p-2 bg-black/20 rounded">
                                <div className="font-semibold">Downloads:</div>
                                <div className="text-xs">Web browsers cache downloads in /tmp</div>
                              </div>
                              <div className="p-2 bg-black/20 rounded">
                                <div className="font-semibold">Sessions:</div>
                                <div className="text-xs">Applications store session data</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="font-mono text-sm space-y-2">
                              <div className="text-green-400"># Without sticky bit:</div>
                              <div>$ rm /tmp/*  # Anyone could delete everything!</div>
                              
                              <div className="mt-4 text-green-400"># With sticky bit:</div>
                              <div>$ rm /tmp/swadeep_*  # Swadeep deletes own files</div>
                              <div>$ rm /tmp/tuhina_*   # Permission denied for others</div>
                              
                              <div className="mt-4 text-xs opacity-80">
                                Students can clean up their own work without affecting others
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-green-500/50 bg-green-900/10" : "border-green-400 bg-green-50"
                      )}>
                        <h4 className="font-bold text-green-400 mb-3">Scenario 2: Shyamnagar Web Server</h4>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                          <div>
                            <p className="text-sm mb-3">
                              Apache web server running multiple virtual hosts with file uploads.
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs">W</span>
                                </div>
                                <span>Web apps store uploaded files temporarily</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs">P</span>
                                </div>
                                <span>PHP stores session files in /tmp</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs">C</span>
                                </div>
                                <span>Cache files for faster processing</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="font-mono text-sm space-y-2">
                              <div>$ ls -l /tmp | grep php</div>
                              <div>-rw------- www-data www-data sess_abc123</div>
                              <div>-rw------- www-data www-data sess_def456</div>
                              
                              <div className="mt-2">$ ls -l /tmp | grep upload</div>
                              <div>-rw-r--r-- www-data www-data upload_xyz789.tmp</div>
                              
                              <div className="mt-4 text-xs opacity-80">
                                Each web app can manage its own temporary files safely
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                      )}>
                        <h4 className="font-bold text-red-400 mb-3">⚠️ Problem Scenario</h4>
                        <div className="space-y-3">
                          <p className="text-sm">
                            What if /tmp didn't have sticky bit? At Ichapur Institute:
                          </p>
                          <button
                            onClick={this.showProblemScenario}
                            className={clsx(
                              "w-full p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                              isDarkMode ? "bg-red-900/20 hover:bg-red-900/30" : "bg-red-50 hover:bg-red-100"
                            )}
                          >
                            <div className="flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-3">
                                <span className="text-white">!</span>
                              </div>
                              <div className="text-center">
                                <div className="font-bold">Click to See Problem</div>
                                <div className="text-sm opacity-80">What happens without sticky bit?</div>
                              </div>
                            </div>
                          </button>
                          
                          {showProblem && (
                            <div className={clsx(
                              "p-4 rounded-lg problem-flash",
                              isDarkMode ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                            )}>
                              <div className="font-mono text-sm space-y-2">
                                <div>$ sudo chmod -t /tmp  # Remove sticky bit</div>
                                <div>$ ls -ld /tmp</div>
                                <div>drwxrwxrwx root root /tmp</div>
                                <div className="text-red-400"># Now anyone can delete any file!</div>
                                <div>$ rm /tmp/*  # Malicious or accidental deletion</div>
                                <div className="text-red-400"># System crashes, applications fail</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'security' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-red-400">Security Implications</h3>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className={clsx(
                          "p-4 rounded-lg",
                          isDarkMode ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                        )}>
                          <h4 className="font-bold text-green-400 mb-3">✅ Security Benefits</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Prevents data loss:</strong> Users can't delete others' files</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Stops denial of service:</strong> Can't fill /tmp with others' names</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Enables safe collaboration:</strong> Multiple users can use same directory</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Protects system files:</strong> Root-owned files are safe</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className={clsx(
                          "p-4 rounded-lg",
                          isDarkMode ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                        )}>
                          <h4 className="font-bold text-red-400 mb-3">⚠️ Security Risks (Even with Sticky)</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Information leakage:</strong> Files may be readable by others</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Race conditions:</strong> Predictable temporary file names</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Symbolic link attacks:</strong> If programs don't use safe APIs</span>
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                              <span><strong>Disk exhaustion:</strong> Users can fill /tmp with their own files</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-6 rounded-xl",
                        isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                      )}>
                        <h4 className="font-bold text-yellow-400 mb-4">Best Practices for /tmp Usage</h4>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-semibold text-green-400">For System Administrators:</div>
                              <ul className="text-sm mt-2 space-y-1">
                                <li>• Always keep sticky bit set on /tmp</li>
                                <li>• Consider separate /tmp partitions</li>
                                <li>• Implement regular cleanup (tmpwatch/tmpreaper)</li>
                                <li>• Monitor /tmp usage with disk quotas</li>
                              </ul>
                            </div>
                            
                            <div className="p-3 bg-black/20 rounded">
                              <div className="font-semibold text-blue-400">For Developers:</div>
                              <ul className="text-sm mt-2 space-y-1">
                                <li>• Use <code>mkstemp()</code> instead of predictable names</li>
                                <li>• Set restrictive permissions (600) on temp files</li>
                                <li>• Clean up temp files after use</li>
                                <li>• Consider <code>$TMPDIR</code> environment variable</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="font-mono text-sm p-3 bg-black/20 rounded">
                            <div className="text-green-400"># Safe temporary file creation in C:</div>
                            <div>char template[] = "/tmp/mytempXXXXXX";</div>
                            <div>int fd = mkstemp(template);  // Creates secure temp file</div>
                            <div>// fd has permissions 600, unique name</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-4 rounded-lg border-l-4",
                        isDarkMode ? "border-purple-500/50 bg-purple-900/10" : "border-purple-400 bg-purple-50"
                      )}>
                        <h4 className="font-bold text-purple-400 mb-3">Naihati Center Case Study</h4>
                        <div className="space-y-3 text-sm">
                          <p>
                            At Naihati Center's shared research cluster, they implemented:
                          </p>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Sticky bit on all shared directories</li>
                            <li>Daily cleanup of files older than 7 days</li>
                            <li>Disk quotas for /tmp partition</li>
                            <li>Monitoring for unusual /tmp activity</li>
                            <li>User education on proper temp file usage</li>
                          </ol>
                          <div className="text-xs opacity-80 mt-2">
                            Result: Zero incidents of accidental file deletion in 2 years
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Creating Custom Sticky Directories */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Creating Your Own Sticky Directories
              </h2>
              
              <div className="space-y-6">
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">When to Use Sticky Bit</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div>
                      <h4 className="font-bold text-green-400 mb-3">✅ Good Use Cases</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Shared upload directories</span>
                            <div className="text-xs opacity-80">Users can upload but not delete others' files</div>
                          </div>
                        </li>
                        
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Collaborative workspaces</span>
                            <div className="text-xs opacity-80">Team members share files safely</div>
                          </div>
                        </li>
                        
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Public drop boxes</span>
                            <div className="text-xs opacity-80">Anyone can add, only owner can remove</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-red-400 mb-3">❌ Bad Use Cases</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Home directories</span>
                            <div className="text-xs opacity-80">Already protected by normal permissions</div>
                          </div>
                        </li>
                        
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">System configuration dirs</span>
                            <div className="text-xs opacity-80">Shouldn't be world-writable anyway</div>
                          </div>
                        </li>
                        
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold">Directories needing group management</span>
                            <div className="text-xs opacity-80">Use setgid instead for group inheritance</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <h3 className="text-xl font-bold mb-4 text-green-400">Step-by-Step: Create a Sticky Directory</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-black/20 rounded">
                        <div className="font-bold text-blue-400 mb-2">Step 1: Create Directory</div>
                        <div className="font-mono text-sm">$ sudo mkdir /shared/uploads</div>
                        <div className="text-xs opacity-80 mt-2">Create the directory as root</div>
                      </div>
                      
                      <div className="p-4 bg-black/20 rounded">
                        <div className="font-bold text-green-400 mb-2">Step 2: Set Permissions</div>
                        <div className="font-mono text-sm">$ sudo chmod 1777 /shared/uploads</div>
                        <div className="text-xs opacity-80 mt-2">Sticky + world read/write/execute</div>
                      </div>
                      
                      <div className="p-4 bg-black/20 rounded">
                        <div className="font-bold text-purple-400 mb-2">Step 3: Verify</div>
                        <div className="font-mono text-sm">$ ls -ld /shared/uploads</div>
                        <div className="text-xs opacity-80 mt-2">Should show drwxrwxrwt</div>
                      </div>
                    </div>
                    
                    <div className="font-mono text-sm p-4 bg-black/20 rounded">
                      <div className="text-green-400"># Complete example at Barrackpore College:</div>
                      <div>$ sudo mkdir -p /var/shared/scratch</div>
                      <div>$ sudo chown root:users /var/shared/scratch</div>
                      <div>$ sudo chmod 1777 /var/shared/scratch</div>
                      <div>$ ls -ld /var/shared/scratch</div>
                      <div>drwxrwxrwt 2 root users 4096 Jan 15 10:30 /var/shared/scratch</div>
                      <div className="text-xs opacity-80 mt-2">
                        Now all users in 'users' group can safely use this directory
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-yellow-900/20 border border-yellow-700/30" : "bg-yellow-50 border border-yellow-200"
                  )}>
                    <h4 className="font-bold text-yellow-400 mb-3">Alternative: Sticky + setgid</h4>
                    <div className="space-y-2 text-sm">
                      <p>Combine sticky with setgid for team directories:</p>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        $ chmod 3775 /team/project
                      </div>
                      <ul className="mt-2 space-y-1">
                        <li>• Sticky: Only owners can delete files</li>
                        <li>• setgid: New files inherit group</li>
                        <li>• 775: Group members can read/write</li>
                      </ul>
                      <div className="text-xs opacity-80 mt-2">
                        Perfect for research teams at Ichapur Institute
                      </div>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                  )}>
                    <h4 className="font-bold text-blue-400 mb-3">Maintenance Commands</h4>
                    <div className="space-y-2 text-sm">
                      <div className="font-mono p-2 bg-black/20 rounded">
                        <ShellFileLoader
                          fileModule={lsExampleSh}
                          title="Listing Files in Unix"
                          highlightLines={[1, 3, 5]}
                        />
                      </div>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        # Clean old files from /tmp:<br/>
                        $ find /tmp -type f -mtime +7 -delete
                      </div>
                      <div className="font-mono p-2 bg-black/20 rounded">
                        # Check /tmp usage:<br/>
                        $ df -h /tmp
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
                  "I remember when we first set up the computer lab at Barrackpore College. Without the sticky bit 
                  on /tmp, students would accidentally (or sometimes intentionally!) delete each other's work. 
                  The sticky bit is like having individual lockers in a shared changing room - everyone can use 
                  the space, but you only have the key to your own locker. It's a simple concept that prevents 
                  countless problems in multi-user environments."
                </p>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4",
                  isDarkMode ? "bg-black/30" : "bg-white/20"
                )}>
                  <h4 className="font-bold text-yellow-300 mb-2">Pro Tip: The /tmp Test</h4>
                  <p className="text-sm">
                    Whenever you set up a new multi-user system, test /tmp permissions immediately. Run 
                    <code> ls -ld /tmp</code> and make sure you see that 't' at the end. If you don't, 
                    fix it immediately with <code>chmod +t /tmp</code>. At Shyamnagar Lab, we made this 
                    part of our standard system checklist after a student's research data was accidentally 
                    deleted from /tmp.
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
                      If a directory has permissions <code>drwxrwxrwt</code> and a file in it has permissions 
                      <code>-rw-rw-rw-</code> (world-writable), can a user other than the owner modify the file? 
                      What about deleting it?
                      <span className="block mt-2 text-sm opacity-80">
                        Think about how directory permissions interact with file permissions...
                      </span>
                    </p>
                    <div className="mt-4 p-3 bg-black/20 rounded">
                      <div className="font-mono text-sm">
                        Hint: File permissions control modification, directory sticky bit controls deletion
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
            <p>Topic 10: Sticky Bit in /tmp • Next: umask – default permission mask and calculation</p>
            <p className="mt-2">Practice: Create a test sticky directory and experiment with file deletion scenarios</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Topic9;