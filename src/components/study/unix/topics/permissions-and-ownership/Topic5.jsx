import React from 'react';
import clsx from 'clsx';

class Topic5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isReducedMotion: false,
      activeSection: 'concept',
      selectedUser: 'swadeep',
      selectedGroup: 'students',
      showOwnershipChange: false
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

  handleSectionChange = (section) => {
    this.setState({ activeSection: section });
  };

  handleUserChange = (user) => {
    this.setState({ selectedUser: user });
  };

  handleGroupChange = (group) => {
    this.setState({ selectedGroup: group });
  };

  simulateOwnershipChange = () => {
    this.setState({ showOwnershipChange: true });
    
    // Reset after 3 seconds
    setTimeout(() => {
      this.setState({ showOwnershipChange: false });
    }, 3000);
  };

  render() {
    const { isDarkMode, isReducedMotion, activeSection, selectedUser, selectedGroup, showOwnershipChange } = this.state;
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
    const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
    const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';
    const extraStaggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]';

    const users = [
      { id: 'swadeep', name: 'Swadeep', color: 'bg-blue-500', location: 'Barrackpore College' },
      { id: 'tuhina', name: 'Tuhina', color: 'bg-green-500', location: 'Shyamnagar Lab' },
      { id: 'abhronila', name: 'Abhronila', color: 'bg-purple-500', location: 'Ichapur Institute' },
      { id: 'debangshu', name: 'Debangshu', color: 'bg-red-500', location: 'Naihati Center' },
      { id: 'root', name: 'root', color: 'bg-yellow-500', location: 'System Administrator' }
    ];

    const groups = [
      { id: 'students', name: 'students', members: ['swadeep', 'tuhina', 'debangshu'], color: 'bg-blue-400' },
      { id: 'faculty', name: 'faculty', members: ['professor'], color: 'bg-green-400' },
      { id: 'developers', name: 'developers', members: ['abhronila', 'tuhina'], color: 'bg-purple-400' },
      { id: 'staff', name: 'staff', members: ['admin'], color: 'bg-red-400' },
      { id: 'root', name: 'root', members: ['root'], color: 'bg-yellow-400' }
    ];

    const files = [
      { name: 'project_report.pdf', owner: 'swadeep', group: 'students', permissions: '-rw-r--r--' },
      { name: 'lab_data.csv', owner: 'tuhina', group: 'students', permissions: '-rw-rw----' },
      { name: 'source_code.py', owner: 'abhronila', group: 'developers', permissions: '-rwxr-x---' },
      { name: 'config.env', owner: 'debangshu', group: 'staff', permissions: '-rw-------' },
      { name: 'system_log.txt', owner: 'root', group: 'root', permissions: '-rw-r--r--' }
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
            
            @keyframes ownershipTransfer {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.8; }
              100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes highlightConnection {
              0%, 100% { stroke-width: 2; stroke-opacity: 0.5; }
              50% { stroke-width: 4; stroke-opacity: 1; }
            }
            
            .ownership-animate {
              animation: ownershipTransfer 0.5s ease-in-out;
            }
            
            .connection-highlight {
              animation: highlightConnection 1s ease-in-out infinite;
            }
          `}
        </style>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <header className={`mb-12 ${animationClass} opacity-0`}>
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">
              Understanding File Ownership: User and Group Roles
            </h1>
            <p className="text-lg opacity-80">
              Topic 6: Who owns what and why it matters in multi-user systems
            </p>
            <div className="h-1 w-24 bg-blue-500 mt-4 rounded-full"></div>
          </header>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Ownership Concept */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                The Two Pillars of File Ownership
              </h2>
              
              <div className="mb-8">
                <div className={clsx(
                  "p-6 rounded-xl mb-6",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                )}>
                  <div className="text-center text-2xl font-bold mb-6">
                    Every file has <span className="text-blue-400">ONE owner</span> and <span className="text-green-400">ONE group</span>
                  </div>
                  
                  {/* SVG Visualization */}
                  <div className="mb-8 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                    <svg 
                      width="100%" 
                      height="200" 
                      viewBox="0 0 800 200" 
                      className="overflow-visible"
                    >
                      {/* File in center */}
                      <g>
                        <rect x="350" y="50" width="100" height="60" rx="10" 
                              fill={isDarkMode ? "#1E40AF" : "#3B82F6"} 
                              fillOpacity="0.3" 
                              stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"} 
                              strokeWidth="2" />
                        <text x="400" y="80" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">file.txt</text>
                        <text x="400" y="100" textAnchor="middle" fill={isDarkMode ? "#93C5FD" : "#1E40AF"} fontSize="12">-rw-r--r--</text>
                      </g>
                      
                      {/* User/Owner */}
                      <g>
                        <circle cx="200" cy="150" r="30" 
                                fill={isDarkMode ? "#1D4ED8" : "#3B82F6"} 
                                className="hover:r-[32] transition-all duration-300" />
                        <text x="200" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">User</text>
                        <text x="200" y="175" textAnchor="middle" fill={isDarkMode ? "#93C5FD" : "#1E40AF"} fontSize="10">Owner</text>
                        
                        {/* Connection line */}
                        <path d="M230 150 L350 110" 
                              stroke={isDarkMode ? "#60A5FA" : "#3B82F6"} 
                              strokeWidth="2" 
                              fill="none"
                              className="connection-highlight"
                              style={{animationDelay: '0s'}} />
                      </g>
                      
                      {/* Group */}
                      <g>
                        <circle cx="600" cy="150" r="30" 
                                fill={isDarkMode ? "#059669" : "#10B981"} 
                                className="hover:r-[32] transition-all duration-300" />
                        <text x="600" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Group</text>
                        <text x="600" y="175" textAnchor="middle" fill={isDarkMode ? "#6EE7B7" : "#065F46"} fontSize="10">Shared Access</text>
                        
                        {/* Connection line */}
                        <path d="M570 150 L450 110" 
                              stroke={isDarkMode ? "#34D399" : "#10B981"} 
                              strokeWidth="2" 
                              fill="none"
                              className="connection-highlight"
                              style={{animationDelay: '0.5s'}} />
                      </g>
                      
                      {/* Labels */}
                      <text x="200" y="40" textAnchor="middle" fill={isDarkMode ? "#60A5FA" : "#3B82F6"} fontSize="14" fontWeight="bold">User (u)</text>
                      <text x="400" y="40" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="14">File</text>
                      <text x="600" y="40" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#10B981"} fontSize="14" fontWeight="bold">Group (g)</text>
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                      isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"
                    )}>
                      <h4 className="font-bold text-blue-400 mb-3">User (Owner)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                          <span>The user who created the file</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                          <span>Can be changed with <code>chown</code></span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                          <span>Has special privileges (can change permissions)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                          <span>Displayed in <code>ls -l</code> output</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                      isDarkMode ? "bg-green-900/20 hover:bg-green-900/30" : "bg-green-50 hover:bg-green-100"
                    )}>
                      <h4 className="font-bold text-green-400 mb-3">Group</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Primary group of the owner at creation time</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Can be changed with <code>chgrp</code> or <code>chown</code></span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Multiple users can belong to same group</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Enables collaborative work</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Ownership Explorer */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                Interactive Ownership Explorer
              </h2>
              
              <div className="mb-8">
                {/* User and Group Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-blue-400">Select User (Owner)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {users.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => this.handleUserChange(user.id)}
                          className={clsx(
                            "p-3 rounded-lg transition-all duration-300 transform hover:scale-105",
                            selectedUser === user.id
                              ? isDarkMode 
                                ? `${user.color} text-white shadow-lg` 
                                : `${user.color} text-white shadow-lg`
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
                    <h3 className="text-lg font-semibold mb-4 text-green-400">Select Group</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {groups.map((group) => (
                        <button
                          key={group.id}
                          onClick={() => this.handleGroupChange(group.id)}
                          className={clsx(
                            "p-3 rounded-lg transition-all duration-300 transform hover:scale-105",
                            selectedGroup === group.id
                              ? isDarkMode 
                                ? `${group.color} text-white shadow-lg` 
                                : `${group.color} text-white shadow-lg`
                              : isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-gray-200 hover:bg-gray-300"
                          )}
                        >
                          <div className="font-bold">{group.name}</div>
                          <div className="text-xs opacity-80">
                            {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* File Display */}
                <div className={clsx(
                  "p-6 rounded-xl mb-6",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100",
                  showOwnershipChange ? "ownership-animate" : ""
                )}>
                  <h3 className="text-xl font-bold mb-4 text-center">
                    File Ownership: <span className="text-blue-400">{selectedUser}</span> : <span className="text-green-400">{selectedGroup}</span>
                  </h3>
                  
                  <div className="font-mono space-y-2">
                    <div className="flex items-center justify-between p-3 bg-black/20 rounded">
                      <div>File: project_data.txt</div>
                      <div className="text-yellow-400">-rw-r--r--</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-black/20 rounded">
                        <div className="flex items-center mb-2">
                          <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                            users.find(u => u.id === selectedUser)?.color || 'bg-blue-500'
                          )}>
                            <span className="text-white text-sm">
                              {selectedUser.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-bold">Owner: {selectedUser}</div>
                            <div className="text-xs opacity-80">
                              {users.find(u => u.id === selectedUser)?.location}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm mt-2">
                          This user can:
                          <ul className="mt-1 space-y-1">
                            <li>• Change file permissions</li>
                            <li>• Change file ownership</li>
                            <li>• Delete the file</li>
                            <li>• Full access (based on permissions)</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-black/20 rounded">
                        <div className="flex items-center mb-2">
                          <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                            groups.find(g => g.id === selectedGroup)?.color || 'bg-green-500'
                          )}>
                            <span className="text-white text-sm">
                              {selectedGroup.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-bold">Group: {selectedGroup}</div>
                            <div className="text-xs opacity-80">
                              {groups.find(g => g.id === selectedGroup)?.members.length} members
                            </div>
                          </div>
                        </div>
                        <div className="text-sm mt-2">
                          Group members can:
                          <ul className="mt-1 space-y-1">
                            <li>• Access based on group permissions</li>
                            <li>• Collaborate on this file</li>
                            <li>• Share access with team</li>
                            <li>• Cannot change ownership</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <button
                        onClick={this.simulateOwnershipChange}
                        className={clsx(
                          "px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105",
                          isDarkMode 
                            ? "bg-yellow-600 hover:bg-yellow-500" 
                            : "bg-yellow-500 hover:bg-yellow-400"
                        )}
                      >
                        Simulate Ownership Change
                      </button>
                      {showOwnershipChange && (
                        <div className="mt-3 text-green-400 text-sm">
                          Command: <code>chown {selectedUser}:{selectedGroup} project_data.txt</code>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Navigation */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <div className="flex space-x-2 mb-6 overflow-x-auto">
                {['ls-output', 'real-world', 'hierarchy', 'permissions'].map((section) => (
                  <button
                    key={section}
                    onClick={() => this.handleSectionChange(section)}
                    className={clsx(
                      "px-4 py-2 rounded-lg transition-all duration-300 capitalize",
                      activeSection === section
                        ? isDarkMode 
                          ? "bg-green-600 text-white" 
                          : "bg-green-500 text-white"
                        : isDarkMode
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-200 hover:bg-gray-300"
                    )}
                  >
                    {section === 'ls-output' && 'ls -l Output'}
                    {section === 'real-world' && 'Real World Examples'}
                    {section === 'hierarchy' && 'Ownership Hierarchy'}
                    {section === 'permissions' && 'Permissions Interaction'}
                  </button>
                ))}
              </div>
              
              {/* Section Content */}
              <div className="mt-6">
                {activeSection === 'ls-output' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Decoding ls -l Output</h3>
                    
                    <div className={clsx(
                      "p-5 rounded-xl mb-6",
                      isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                    )}>
                      <div className="font-mono text-sm mb-4">
                        <div className="text-green-400">$ ls -l</div>
                        <div>total 24</div>
                        <div className={clsx(
                          "p-3 rounded-lg mt-2",
                          isDarkMode ? "bg-black/30" : "bg-white"
                        )}>
                          <span className="text-yellow-400">-rwxr-xr--</span>{' '}
                          <span className="text-blue-400">1</span>{' '}
                          <span className="text-red-400">swadeep</span>{' '}
                          <span className="text-green-400">students</span>{' '}
                          <span className="text-purple-400">2048</span>{' '}
                          <span className="text-gray-400">Jan 15 10:30</span>{' '}
                          <span>project.py</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-red-400 mb-3">Field Breakdown:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <span className="w-4 text-blue-400 mr-2">1</span>
                              <span>Permissions: <code>-rwxr-xr--</code></span>
                            </li>
                            <li className="flex items-center">
                              <span className="w-4 text-blue-400 mr-2">2</span>
                              <span>Link count: <code>1</code></span>
                            </li>
                            <li className="flex items-center">
                              <span className="w-4 text-red-400 mr-2">3</span>
                              <span>Owner: <code>swadeep</code></span>
                            </li>
                            <li className="flex items-center">
                              <span className="w-4 text-green-400 mr-2">4</span>
                              <span>Group: <code>students</code></span>
                            </li>
                            <li className="flex items-center">
                              <span className="w-4 text-purple-400 mr-2">5</span>
                              <span>File size: <code>2048</code> bytes</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-green-400 mb-3">Ownership Information:</h4>
                          <div className="space-y-3 text-sm">
                            <div className="p-2 bg-black/20 rounded">
                              <div className="font-semibold">User ID (UID): swadeep</div>
                              <div className="text-xs opacity-80">Numeric ID: 1001 (check with <code>id -u swadeep</code>)</div>
                            </div>
                            <div className="p-2 bg-black/20 rounded">
                              <div className="font-semibold">Group ID (GID): students</div>
                              <div className="text-xs opacity-80">Numeric ID: 1001 (check with <code>id -g swadeep</code>)</div>
                            </div>
                            <div className="text-xs opacity-80">
                              Tip: Use <code>stat filename</code> for detailed ownership info
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg border-l-4",
                      isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                    )}>
                      <h4 className="font-bold text-yellow-400 mb-2">Real Example at Barrackpore College:</h4>
                      <p className="text-sm">
                        When <span className="font-semibold">Swadeep</span> runs <code>ls -l</code> on his project files, 
                        he sees his username as owner and "students" as group. This tells him:
                      </p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• He's the owner (can change permissions)</li>
                        <li>• Other students can access based on group permissions</li>
                        <li>• The file belongs to the students group</li>
                        <li>• He can share with faculty by changing group</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {activeSection === 'real-world' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-green-400">Real-World Ownership Scenarios</h3>
                    
                    <div className="space-y-6">
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-blue-500/50 bg-blue-900/10" : "border-blue-400 bg-blue-50"
                      )}>
                        <h4 className="font-bold text-blue-400 mb-3">Scenario 1: Collaborative Research Project</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm mb-3">
                              At <span className="font-semibold">Shyamnagar Lab</span>, Tuhina and Abhronila work on a research project.
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs">T</span>
                                </div>
                                <span>Tuhina creates: <code>-rw-r----- tuhina researchers</code></span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs">A</span>
                                </div>
                                <span>Abhronila can: Read (group permission)</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs">S</span>
                                </div>
                                <span>Swadeep cannot: Not in researchers group</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="font-mono text-sm space-y-2">
                              <div className="text-green-400"># Add user to group:</div>
                              <div>$ sudo usermod -aG researchers abhronila</div>
                              <div className="text-xs opacity-80 mt-2">(Requires logout/login)</div>
                              
                              <div className="mt-4 text-green-400"># Change group ownership:</div>
                              <div>$ chgrp researchers data.csv</div>
                              <div className="text-xs opacity-80">Now both can access</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-purple-500/50 bg-purple-900/10" : "border-purple-400 bg-purple-50"
                      )}>
                        <h4 className="font-bold text-purple-400 mb-3">Scenario 2: Web Server Ownership</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm mb-3">
                              At <span className="font-semibold">Ichapur Institute</span>, a web server needs proper ownership:
                            </p>
                            <div className="space-y-3">
                              <div className="p-2 bg-black/20 rounded">
                                <div className="font-mono text-sm">-rw-r--r-- www-data www-data index.html</div>
                                <div className="text-xs">Web server can read, owner is www-data</div>
                              </div>
                              <div className="p-2 bg-black/20 rounded">
                                <div className="font-mono text-sm">-rwxr-xr-x root root httpd</div>
                                <div className="text-xs">Server binary owned by root</div>
                              </div>
                              <div className="p-2 bg-black/20 rounded">
                                <div className="font-mono text-sm">drwxrwx--- developers www-data uploads/</div>
                                <div className="text-xs">Uploads directory: group collaboration</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm">
                              <div className="font-semibold mb-2">Best Practices:</div>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                                  <span>Web files: www-data:www-data (644)</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                                  <span>Upload directories: user:www-data (775)</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                                  <span>Configuration: root:root (600)</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                                  <span>Logs: www-data:adm (664)</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                      )}>
                        <h4 className="font-bold text-red-400 mb-3">⚠️ Common Ownership Problem</h4>
                        <div className="space-y-3">
                          <p className="text-sm">
                            <span className="font-semibold">Debangshu</span> at Naihati Center creates files as root, 
                            then regular users can't access them:
                          </p>
                          <div className="font-mono p-3 bg-black/20 rounded">
                            -rw-r--r-- root root important.txt
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold">Solution:</span> Change ownership to appropriate user/group
                          </div>
                          <div className="font-mono p-3 bg-black/20 rounded">
                            $ sudo chown debangshu:staff important.txt
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'hierarchy' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-purple-400">Ownership Hierarchy & System Files</h3>
                    
                    <div className="space-y-6">
                      <div className={clsx(
                        "p-5 rounded-xl",
                        isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                      )}>
                        <h4 className="font-bold text-purple-400 mb-4">System Directory Ownership Structure</h4>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className={clsx(
                                "border-b",
                                isDarkMode ? "border-gray-700" : "border-gray-300"
                              )}>
                                <th className="text-left py-3 px-4">Directory</th>
                                <th className="text-left py-3 px-4">Typical Owner</th>
                                <th className="text-left py-3 px-4">Typical Group</th>
                                <th className="text-left py-3 px-4">Permissions</th>
                                <th className="text-left py-3 px-4">Purpose</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { dir: '/', owner: 'root', group: 'root', perms: 'drwxr-xr-x', purpose: 'Root filesystem' },
                                { dir: '/etc', owner: 'root', group: 'root', perms: 'drwxr-xr-x', purpose: 'System configuration' },
                                { dir: '/home', owner: 'root', group: 'root', perms: 'drwxr-xr-x', purpose: 'User home directories' },
                                { dir: '/home/swadeep', owner: 'swadeep', group: 'swadeep', perms: 'drwx------', purpose: 'Personal files' },
                                { dir: '/var/www', owner: 'www-data', group: 'www-data', perms: 'drwxr-xr-x', purpose: 'Web server files' },
                                { dir: '/tmp', owner: 'root', group: 'root', perms: 'drwxrwxrwt', purpose: 'Temporary files' },
                                { dir: '/usr/bin', owner: 'root', group: 'root', perms: 'drwxr-xr-x', purpose: 'System binaries' },
                              ].map((row, index) => (
                                <tr 
                                  key={index} 
                                  className={clsx(
                                    "border-b transition-all duration-200 hover:bg-white/5",
                                    isDarkMode ? "border-gray-800" : "border-gray-200"
                                  )}
                                >
                                  <td className="py-3 px-4 font-mono">{row.dir}</td>
                                  <td className="py-3 px-4">
                                    <span className={clsx(
                                      "px-2 py-1 rounded text-xs",
                                      row.owner === 'root' 
                                        ? isDarkMode ? "bg-yellow-900/30" : "bg-yellow-100" 
                                        : isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
                                    )}>
                                      {row.owner}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className={clsx(
                                      "px-2 py-1 rounded text-xs",
                                      row.group === 'root' 
                                        ? isDarkMode ? "bg-yellow-900/30" : "bg-yellow-100" 
                                        : isDarkMode ? "bg-green-900/30" : "bg-green-100"
                                    )}>
                                      {row.group}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 font-mono">{row.perms}</td>
                                  <td className="py-3 px-4 text-sm opacity-80">{row.purpose}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={clsx(
                          "p-4 rounded-lg",
                          isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                        )}>
                          <h4 className="font-bold text-blue-400 mb-3">Home Directory Ownership</h4>
                          <div className="space-y-2 text-sm">
                            <p>Each user's home directory follows this pattern:</p>
                            <div className="font-mono p-2 bg-black/20 rounded">
                              $ ls -ld /home/swadeep<br/>
                              drwx------ 4 swadeep swadeep 4096 Jan 15 10:30 /home/swadeep
                            </div>
                            <ul className="mt-2 space-y-1">
                              <li>• Owner: The user themselves</li>
                              <li>• Group: User's primary group (often same name)</li>
                              <li>• Permissions: 700 (only owner can access)</li>
                              <li>• Created by: system during user creation</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className={clsx(
                          "p-4 rounded-lg",
                          isDarkMode ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                        )}>
                          <h4 className="font-bold text-green-400 mb-3">Special System Ownership</h4>
                          <div className="space-y-3 text-sm">
                            <div className="p-2 bg-black/20 rounded">
                              <div className="font-semibold">root:root</div>
                              <div className="text-xs">System files, configuration, binaries</div>
                            </div>
                            <div className="p-2 bg-black/20 rounded">
                              <div className="font-semibold">daemon:daemon</div>
                              <div className="text-xs">System service accounts</div>
                            </div>
                            <div className="p-2 bg-black/20 rounded">
                              <div className="font-semibold">nobody:nogroup</div>
                              <div className="text-xs">Unprivileged processes</div>
                            </div>
                            <div className="text-xs opacity-80">
                              Never change system file ownership unless you know what you're doing!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'permissions' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-red-400">Ownership vs Permissions Interaction</h3>
                    
                    <div className="space-y-6">
                      <div className={clsx(
                        "p-5 rounded-xl",
                        isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                      )}>
                        <h4 className="font-bold text-red-400 mb-4">The Decision Tree: Who Gets Access?</h4>
                        
                        <div className="mb-6">
                          <div className="text-center mb-4">
                            <div className="inline-block p-3 bg-black/20 rounded-lg">
                              <div className="font-mono">-rwxr-x--- 1 swadeep developers 2048 Jan 15 10:30 script.py</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={clsx(
                              "p-4 rounded-lg text-center",
                              isDarkMode ? "bg-blue-900/20" : "bg-blue-50"
                            )}>
                              <div className="font-bold text-blue-400 mb-2">User: Swadeep</div>
                              <div className="text-sm">Is this Swadeep's file?</div>
                              <div className="mt-2 text-lg font-bold text-green-400">YES → Owner</div>
                              <div className="text-sm mt-2">Gets owner permissions: rwx</div>
                            </div>
                            
                            <div className={clsx(
                              "p-4 rounded-lg text-center",
                              isDarkMode ? "bg-green-900/20" : "bg-green-50"
                            )}>
                              <div className="font-bold text-green-400 mb-2">User: Tuhina</div>
                              <div className="text-sm">Is Tuhina in developers group?</div>
                              <div className="mt-2 text-lg font-bold text-green-400">YES → Group</div>
                              <div className="text-sm mt-2">Gets group permissions: r-x</div>
                            </div>
                            
                            <div className={clsx(
                              "p-4 rounded-lg text-center",
                              isDarkMode ? "bg-red-900/20" : "bg-red-50"
                            )}>
                              <div className="font-bold text-red-400 mb-2">User: Debangshu</div>
                              <div className="text-sm">Is Debangshu owner or in group?</div>
                              <div className="mt-2 text-lg font-bold text-red-400">NO → Others</div>
                              <div className="text-sm mt-2">Gets others permissions: ---</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                      )}>
                        <h4 className="font-bold text-yellow-400 mb-3">Key Concept: Permission Evaluation Order</h4>
                        <div className="space-y-3">
                          <p className="text-sm">
                            The system checks permissions in this order:
                          </p>
                          <ol className="list-decimal pl-6 space-y-2 text-sm">
                            <li>
                              <span className="font-semibold">Is the user the owner?</span>
                              <div className="ml-4 text-xs opacity-80">If YES → Apply owner permissions</div>
                            </li>
                            <li>
                              <span className="font-semibold">Is the user in the file's group?</span>
                              <div className="ml-4 text-xs opacity-80">If YES → Apply group permissions</div>
                            </li>
                            <li>
                              <span className="font-semibold">Otherwise → Apply others permissions</span>
                            </li>
                          </ol>
                          <div className="text-xs opacity-80">
                            Note: Root user (UID 0) bypasses all permission checks
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={clsx(
                          "p-4 rounded-lg",
                          isDarkMode ? "bg-purple-900/20 border border-purple-700/30" : "bg-purple-50 border border-purple-200"
                        )}>
                          <h4 className="font-bold text-purple-400 mb-3">Changing Ownership Impact</h4>
                          <div className="space-y-2 text-sm">
                            <p>When you change ownership with <code>chown</code>:</p>
                            <ul className="space-y-1">
                              <li>• New owner gets owner permissions</li>
                              <li>• Old owner loses special privileges</li>
                              <li>• Group membership doesn't automatically change</li>
                              <li>• Root privilege needed to change to another user</li>
                            </ul>
                            <div className="font-mono p-2 bg-black/20 rounded mt-2">
                              $ sudo chown tuhina:developers file.txt
                            </div>
                          </div>
                        </div>
                        
                        <div className={clsx(
                          "p-4 rounded-lg",
                          isDarkMode ? "bg-cyan-900/20 border border-cyan-700/30" : "bg-cyan-50 border border-cyan-200"
                        )}>
                          <h4 className="font-bold text-cyan-400 mb-3">Changing Group Impact</h4>
                          <div className="space-y-2 text-sm">
                            <p>When you change group with <code>chgrp</code>:</p>
                            <ul className="space-y-1">
                              <li>• New group members get group permissions</li>
                              <li>• Old group members lose access</li>
                              <li>• Owner can change group if they're member of new group</li>
                              <li>• Root can change to any group</li>
                            </ul>
                            <div className="font-mono p-2 bg-black/20 rounded mt-2">
                              $ chgrp researchers data.csv
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Common Files Display */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Sample Files with Different Ownership
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={clsx(
                      "border-b",
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    )}>
                      <th className="text-left py-3 px-4">Filename</th>
                      <th className="text-left py-3 px-4">Permissions</th>
                      <th className="text-left py-3 px-4">Owner</th>
                      <th className="text-left py-3 px-4">Group</th>
                      <th className="text-left py-3 px-4">Who Can Access</th>
                      <th className="text-left py-3 px-4">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr 
                        key={index} 
                        className={clsx(
                          "border-b transition-all duration-200 hover:bg-white/5",
                          isDarkMode ? "border-gray-800" : "border-gray-200"
                        )}
                      >
                        <td className="py-3 px-4 font-mono">{file.name}</td>
                        <td className="py-3 px-4">
                          <span className={clsx(
                            "px-2 py-1 rounded text-xs font-mono",
                            isDarkMode ? "bg-yellow-900/30" : "bg-yellow-100"
                          )}>
                            {file.permissions}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className={clsx(
                              "w-6 h-6 rounded-full flex items-center justify-center mr-2 text-white text-xs",
                              users.find(u => u.id === file.owner)?.color || 'bg-gray-500'
                            )}>
                              {file.owner.charAt(0).toUpperCase()}
                            </div>
                            {file.owner}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className={clsx(
                              "w-6 h-6 rounded-full flex items-center justify-center mr-2 text-white text-xs",
                              groups.find(g => g.id === file.group)?.color || 'bg-gray-500'
                            )}>
                              {file.group.charAt(0).toUpperCase()}
                            </div>
                            {file.group}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            {file.permissions === '-rw-r--r--' && 'Owner: RW, Everyone: R'}
                            {file.permissions === '-rw-rw----' && 'Owner & Group: RW'}
                            {file.permissions === '-rwxr-x---' && 'Owner: RWX, Group: RX'}
                            {file.permissions === '-rw-------' && 'Owner only: RW'}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm opacity-80">
                          {file.name.includes('report') && 'Shared document'}
                          {file.name.includes('data') && 'Collaborative data'}
                          {file.name.includes('code') && 'Development script'}
                          {file.name.includes('config') && 'Private configuration'}
                          {file.name.includes('log') && 'System log file'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={clsx(
                  "p-4 rounded-lg",
                  isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                )}>
                  <h4 className="font-bold text-blue-400 mb-2">Quick Test:</h4>
                  <p className="text-sm">
                    If Swadeep (students group) tries to edit lab_data.csv (owned by tuhina, students group), 
                    what happens?
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="font-semibold">Answer:</span> He can read and write (group permissions: rw-)
                  </div>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg",
                  isDarkMode ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                )}>
                  <h4 className="font-bold text-red-400 mb-2">Security Note:</h4>
                  <p className="text-sm">
                    config.env has 600 permissions. Even if group is changed, only the owner can access it.
                    Ownership controls who can change permissions, not necessarily who can access.
                  </p>
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
                  "Think of file ownership like property ownership in real life. The owner (user) has the title deed 
                  and can sell or remodel (change permissions/ownership). The neighborhood association (group) sets 
                  rules that all members follow. Everyone else (others) are visitors who must follow public rules. 
                  At Barrackpore College, I use this analogy: Swadeep owns his dorm room (user), shares a lab with 
                  classmates (group), and the whole campus has common areas (others)."
                </p>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4",
                  isDarkMode ? "bg-black/30" : "bg-white/20"
                )}>
                  <h4 className="font-bold text-yellow-300 mb-2">Pro Tip: The id Command</h4>
                  <p className="text-sm">
                    Always check your current user and group membership with <code>id</code> or <code>groups</code>. 
                    Many permission problems happen because users think they're in a group they're not actually in. 
                    Remember: after being added to a group, you must log out and back in for it to take effect.
                  </p>
                  <div className="font-mono text-xs mt-2 p-2 bg-black/20 rounded">
                    $ id<br/>
                    uid=1001(swadeep) gid=1001(swadeep) groups=1001(swadeep),1002(students),1003(developers)
                  </div>
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
                      If a file has permissions <code>-rwxrwx---</code> and is owned by <code>tuhina:students</code>, 
                      can Swadeep (who is in the students group) change the file's ownership to himself?
                      <span className="block mt-2 text-sm opacity-80">
                        Think about what the group permissions allow vs what ownership changes require...
                      </span>
                    </p>
                    <div className="mt-4 p-3 bg-black/20 rounded">
                      <div className="font-mono text-sm">
                        Hint: Only the file owner or root can change ownership
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
            <p>Topic 6: File Ownership • Next: chown and chgrp – Changing Owner and Group</p>
            <p className="mt-2">Practice: Run <code>ls -l /etc</code> and identify different ownership patterns</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Topic5;