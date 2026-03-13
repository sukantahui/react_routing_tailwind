import React from 'react';
import clsx from 'clsx';

class Topic7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isReducedMotion: false,
      activeComparison: 'ownership-vs-permissions',
      showScenario: false,
      selectedScenario: 'web-server',
      permissionMatrix: {
        owner: { r: true, w: true, x: true },
        group: { r: true, w: false, x: true },
        others: { r: false, w: false, x: false }
      }
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

  handleComparisonChange = (comparison) => {
    this.setState({ 
      activeComparison: comparison,
      showScenario: false
    });
  };

  handleScenarioSelect = (scenario) => {
    this.setState({ 
      selectedScenario: scenario,
      showScenario: true 
    });
  };

  togglePermission = (entity, permission) => {
    this.setState(prevState => ({
      permissionMatrix: {
        ...prevState.permissionMatrix,
        [entity]: {
          ...prevState.permissionMatrix[entity],
          [permission]: !prevState.permissionMatrix[entity][permission]
        }
      }
    }));
  };

  calculateNumericPermission = () => {
    const { permissionMatrix } = this.state;
    const calculateTriplet = (triplet) => {
      return (triplet.r ? 4 : 0) + (triplet.w ? 2 : 0) + (triplet.x ? 1 : 0);
    };
    
    return {
      owner: calculateTriplet(permissionMatrix.owner),
      group: calculateTriplet(permissionMatrix.group),
      others: calculateTriplet(permissionMatrix.others)
    };
  };

  render() {
    const { isDarkMode, isReducedMotion, activeComparison, showScenario, selectedScenario, permissionMatrix } = this.state;
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
    const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
    const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';
    const extraStaggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]';

    const numericPermissions = this.calculateNumericPermission();

    const comparisons = [
      { id: 'ownership-vs-permissions', name: 'Ownership vs Permissions', icon: '⚖️' },
      { id: 'who-can-do-what', name: 'Who Can Do What', icon: '👥' },
      { id: 'real-world-cases', name: 'Real-World Cases', icon: '🌍' },
      { id: 'common-mistakes', name: 'Common Mistakes', icon: '⚠️' }
    ];

    const scenarios = [
      { id: 'web-server', name: 'Web Server', location: 'Shyamnagar Lab' },
      { id: 'team-project', name: 'Team Project', location: 'Barrackpore College' },
      { id: 'system-admin', name: 'System Admin', location: 'Ichapur Institute' },
      { id: 'personal-files', name: 'Personal Files', location: 'Naihati Center' }
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
            
            @keyframes comparisonSwitch {
              0% { transform: scale(0.95); opacity: 0.5; }
              100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes permissionPulse {
              0%, 100% { background-color: rgba(59, 130, 246, 0.1); }
              50% { background-color: rgba(59, 130, 246, 0.3); }
            }
            
            .comparison-switch {
              animation: comparisonSwitch 0.3s ease-out;
            }
            
            .permission-pulse {
              animation: permissionPulse 1s ease-in-out;
            }
          `}
        </style>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <header className={`mb-12 ${animationClass} opacity-0`}>
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">
              Difference between Ownership and Permission Control
            </h1>
            <p className="text-lg opacity-80">
              Topic 8: Understanding who controls vs who can access files
            </p>
            <div className="h-1 w-24 bg-purple-500 mt-4 rounded-full"></div>
          </header>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Core Concept */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                The Fundamental Distinction
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
                      {/* File in center */}
                      <g>
                        <rect x="350" y="50" width="100" height="60" rx="10" 
                              fill={isDarkMode ? "#1E40AF" : "#3B82F6"} 
                              fillOpacity="0.3" 
                              stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"} 
                              strokeWidth="2" />
                        <text x="400" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">file.txt</text>
                        <text x="400" y="100" textAnchor="middle" fill={isDarkMode ? "#93C5FD" : "#1E40AF"} fontSize="10">swadeep:students</text>
                      </g>
                      
                      {/* Ownership Concept */}
                      <g>
                        <circle cx="150" cy="150" r="30" 
                                fill={isDarkMode ? "#DC2626" : "#EF4444"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#F87171" : "#DC2626"} 
                                strokeWidth="2" />
                        <text x="150" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Ownership</text>
                        <text x="150" y="170" textAnchor="middle" fill={isDarkMode ? "#F87171" : "#DC2626"} fontSize="10">Who Controls</text>
                        
                        {/* Connection */}
                        <path d="M350 110 L250 150" 
                              stroke={isDarkMode ? "#DC2626" : "#EF4444"} 
                              strokeWidth="2" 
                              fill="none"
                              strokeDasharray="5,5" />
                        
                        {/* Control icons */}
                        <g transform="translate(120, 130)">
                          <circle cx="0" cy="0" r="4" fill="white" />
                          <circle cx="15" cy="0" r="4" fill="white" />
                          <circle cx="30" cy="0" r="4" fill="white" />
                        </g>
                      </g>
                      
                      {/* Permissions Concept */}
                      <g>
                        <circle cx="650" cy="150" r="30" 
                                fill={isDarkMode ? "#059669" : "#10B981"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#34D399" : "#059669"} 
                                strokeWidth="2" />
                        <text x="650" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Permissions</text>
                        <text x="650" y="170" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#059669"} fontSize="10">Who Can Access</text>
                        
                        {/* Connection */}
                        <path d="M450 110 L550 150" 
                              stroke={isDarkMode ? "#059669" : "#10B981"} 
                              strokeWidth="2" 
                              fill="none"
                              strokeDasharray="5,5" />
                        
                        {/* Access icons */}
                        <g transform="translate(620, 130)">
                          <path d="M0 0 L10 10 M10 0 L0 10" stroke="white" strokeWidth="2" />
                          <path d="M20 0 L30 10 M30 0 L20 10" stroke="white" strokeWidth="2" />
                        </g>
                      </g>
                      
                      {/* Labels */}
                      <text x="150" y="40" textAnchor="middle" fill={isDarkMode ? "#DC2626" : "#EF4444"} fontSize="14" fontWeight="bold">Control Layer</text>
                      <text x="400" y="40" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="14">File</text>
                      <text x="650" y="40" textAnchor="middle" fill={isDarkMode ? "#059669" : "#10B981"} fontSize="14" fontWeight="bold">Access Layer</text>
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={clsx(
                      "p-4 rounded-lg border-l-4",
                      isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                    )}>
                      <h4 className="font-bold text-red-400 mb-3">Ownership (Control)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                          <span><strong>Who controls</strong> the file</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                          <span>Determines who can <strong>change permissions</strong></span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                          <span>Set with <code>chown</code> (needs root)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                          <span>Like being the <strong>property owner</strong></span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg border-l-4",
                      isDarkMode ? "border-green-500/50 bg-green-900/10" : "border-green-400 bg-green-50"
                    )}>
                      <h4 className="font-bold text-green-400 mb-3">Permissions (Access)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span><strong>Who can access</strong> the file</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Determines read/write/execute abilities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Set with <code>chmod</code> (owner can do)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                          <span>Like having a <strong>key to the property</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Comparison Navigation */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
              <div className="flex flex-wrap gap-2 mb-6">
                {comparisons.map((comparison) => (
                  <button
                    key={comparison.id}
                    onClick={() => this.handleComparisonChange(comparison.id)}
                    className={clsx(
                      "px-4 py-3 rounded-lg transition-all duration-300 flex items-center",
                      activeComparison === comparison.id
                        ? isDarkMode 
                          ? "bg-yellow-600 text-white shadow-lg" 
                          : "bg-yellow-500 text-white shadow-lg"
                        : isDarkMode
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-200 hover:bg-gray-300"
                    )}
                  >
                    <span className="mr-2 text-lg">{comparison.icon}</span>
                    <span>{comparison.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Comparison Content */}
              <div className={clsx(
                "mt-6 transition-all duration-300",
                activeComparison ? "comparison-switch" : ""
              )}>
                {activeComparison === 'ownership-vs-permissions' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-blue-400">Ownership vs Permissions: Detailed Comparison</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className={clsx(
                            "border-b",
                            isDarkMode ? "border-gray-700" : "border-gray-300"
                          )}>
                            <th className="text-left py-3 px-4">Aspect</th>
                            <th className="text-left py-3 px-4">Ownership</th>
                            <th className="text-left py-3 px-4">Permissions</th>
                            <th className="text-left py-3 px-4">Analogy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { 
                              aspect: 'Primary Purpose', 
                              ownership: 'Control & management', 
                              permissions: 'Access & usage', 
                              analogy: 'Property owner vs House keys' 
                            },
                            { 
                              aspect: 'Command Used', 
                              ownership: '<code>chown</code>, <code>chgrp</code>', 
                              permissions: '<code>chmod</code>', 
                              analogy: 'Changing deed vs Changing locks' 
                            },
                            { 
                              aspect: 'Who Can Change', 
                              ownership: 'Root or file owner (to self)', 
                              permissions: 'File owner or root', 
                              analogy: 'Only owner can sell property vs Owner can change access rules' 
                            },
                            { 
                              aspect: 'Shown in ls -l', 
                              ownership: 'Columns 3-4 (owner:group)', 
                              permissions: 'Column 1 (rwxrwxrwx)', 
                              analogy: 'Title information vs Access rules list' 
                            },
                            { 
                              aspect: 'Hierarchy', 
                              ownership: 'Owner → Group → Others', 
                              permissions: 'Same hierarchy for checking', 
                              analogy: 'Chain of command vs Rules for each level' 
                            },
                            { 
                              aspect: 'Default Behavior', 
                              ownership: 'Creator becomes owner', 
                              permissions: 'Determined by umask', 
                              analogy: 'Builder owns construction vs Default building codes' 
                            },
                          ].map((row, index) => (
                            <tr 
                              key={index} 
                              className={clsx(
                                "border-b transition-all duration-200 hover:bg-white/5",
                                isDarkMode ? "border-gray-800" : "border-gray-200"
                              )}
                            >
                              <td className="py-3 px-4 font-semibold">{row.aspect}</td>
                              <td className="py-3 px-4">
                                <div dangerouslySetInnerHTML={{ __html: row.ownership }} />
                              </td>
                              <td className="py-3 px-4">
                                <div dangerouslySetInnerHTML={{ __html: row.permissions }} />
                              </td>
                              <td className="py-3 px-4 text-sm opacity-80">{row.analogy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg mt-6",
                      isDarkMode ? "bg-purple-900/20 border border-purple-700/30" : "bg-purple-50 border border-purple-200"
                    )}>
                      <h4 className="font-bold text-purple-400 mb-3">Key Insight:</h4>
                      <p className="text-sm">
                        <strong>Ownership determines who gets to set permissions.</strong> 
                        The file owner is the only regular user who can change permissions (with <code>chmod</code>). 
                        This creates a hierarchy: Root → Owner → Everyone else.
                      </p>
                      <div className="font-mono text-sm mt-2 p-2 bg-black/20 rounded">
                        # Only swadeep (owner) can do:<br/>
                        $ chmod 755 project.py<br/>
                        # tuhina (group member) cannot:<br/>
                        $ chmod 755 project.py<br/>
                        chmod: changing permissions of 'project.py': Operation not permitted
                      </div>
                    </div>
                  </div>
                )}
                
                {activeComparison === 'who-can-do-what' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-green-400">Who Can Do What: Capability Matrix</h3>
                    
                    {/* Interactive Permission Matrix */}
                    <div className={clsx(
                      "p-6 rounded-xl mb-6",
                      isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                    )}>
                      <h4 className="font-bold text-yellow-400 mb-4 text-center">Interactive Permission Matrix</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {/* Owner Column */}
                        <div className={clsx(
                          "p-4 rounded-lg text-center",
                          isDarkMode ? "bg-blue-900/20" : "bg-blue-50"
                        )}>
                          <div className="font-bold text-blue-400 mb-3">Owner (swadeep)</div>
                          <div className="space-y-3">
                            {['r', 'w', 'x'].map((perm) => (
                              <button
                                key={`owner-${perm}`}
                                onClick={() => this.togglePermission('owner', perm)}
                                className={clsx(
                                  "w-12 h-12 rounded-lg transition-all duration-300 transform hover:scale-110",
                                  permissionMatrix.owner[perm]
                                    ? isDarkMode ? "bg-blue-600" : "bg-blue-500 text-white"
                                    : isDarkMode ? "bg-gray-700" : "bg-gray-300"
                                )}
                              >
                                <div className="text-lg font-bold">{perm}</div>
                                <div className="text-xs">
                                  {perm === 'r' ? 'Read' : perm === 'w' ? 'Write' : 'Execute'}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Group Column */}
                        <div className={clsx(
                          "p-4 rounded-lg text-center",
                          isDarkMode ? "bg-green-900/20" : "bg-green-50"
                        )}>
                          <div className="font-bold text-green-400 mb-3">Group (students)</div>
                          <div className="space-y-3">
                            {['r', 'w', 'x'].map((perm) => (
                              <button
                                key={`group-${perm}`}
                                onClick={() => this.togglePermission('group', perm)}
                                className={clsx(
                                  "w-12 h-12 rounded-lg transition-all duration-300 transform hover:scale-110",
                                  permissionMatrix.group[perm]
                                    ? isDarkMode ? "bg-green-600" : "bg-green-500 text-white"
                                    : isDarkMode ? "bg-gray-700" : "bg-gray-300"
                                )}
                              >
                                <div className="text-lg font-bold">{perm}</div>
                                <div className="text-xs">
                                  {perm === 'r' ? 'Read' : perm === 'w' ? 'Write' : 'Execute'}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Others Column */}
                        <div className={clsx(
                          "p-4 rounded-lg text-center",
                          isDarkMode ? "bg-red-900/20" : "bg-red-50"
                        )}>
                          <div className="font-bold text-red-400 mb-3">Others (everyone)</div>
                          <div className="space-y-3">
                            {['r', 'w', 'x'].map((perm) => (
                              <button
                                key={`others-${perm}`}
                                onClick={() => this.togglePermission('others', perm)}
                                className={clsx(
                                  "w-12 h-12 rounded-lg transition-all duration-300 transform hover:scale-110",
                                  permissionMatrix.others[perm]
                                    ? isDarkMode ? "bg-red-600" : "bg-red-500 text-white"
                                    : isDarkMode ? "bg-gray-700" : "bg-gray-300"
                                )}
                              >
                                <div className="text-lg font-bold">{perm}</div>
                                <div className="text-xs">
                                  {perm === 'r' ? 'Read' : perm === 'w' ? 'Write' : 'Execute'}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Result Column */}
                        <div className={clsx(
                          "p-4 rounded-lg text-center",
                          isDarkMode ? "bg-purple-900/20" : "bg-purple-50"
                        )}>
                          <div className="font-bold text-purple-400 mb-3">Result</div>
                          <div className="space-y-4">
                            <div className="text-2xl font-bold">
                              {numericPermissions.owner}{numericPermissions.group}{numericPermissions.others}
                            </div>
                            <div className="text-sm">
                              Symbolic:<br/>
                              <span className="font-mono">
                                -{Object.values(permissionMatrix.owner).map(v => v ? 'r' : '-').join('')}
                                {Object.values(permissionMatrix.group).map(v => v ? 'r' : '-').join('')}
                                {Object.values(permissionMatrix.others).map(v => v ? 'r' : '-').join('')}
                              </span>
                            </div>
                            <div className="text-xs opacity-80">
                              (Click permissions to toggle)
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-mono p-3 bg-black/20 rounded-lg inline-block">
                          chmod {numericPermissions.owner}{numericPermissions.group}{numericPermissions.others} file.txt
                        </div>
                      </div>
                    </div>
                    
                    {/* Capability Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className={clsx(
                            "border-b",
                            isDarkMode ? "border-gray-700" : "border-gray-300"
                          )}>
                            <th className="text-left py-3 px-4">Action</th>
                            <th className="text-left py-3 px-4">Owner Can</th>
                            <th className="text-left py-3 px-4">Group Member Can</th>
                            <th className="text-left py-3 px-4">Others Can</th>
                            <th className="text-left py-3 px-4">Depends On</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { 
                              action: 'Change permissions (chmod)', 
                              owner: '✅ Yes', 
                              group: '❌ No', 
                              others: '❌ No', 
                              depends: 'Ownership only' 
                            },
                            { 
                              action: 'Change ownership (chown)', 
                              owner: '❌ No (needs root)', 
                              group: '❌ No', 
                              others: '❌ No', 
                              depends: 'Root privilege only' 
                            },
                            { 
                              action: 'Change group (chgrp)', 
                              owner: '✅ Yes (to groups they belong to)', 
                              group: '❌ No', 
                              others: '❌ No', 
                              depends: 'Ownership + group membership' 
                            },
                            { 
                              action: 'Read file contents', 
                              owner: '✅ If r-- permission', 
                              group: '✅ If r-- permission', 
                              others: '✅ If r-- permission', 
                              depends: 'Permissions only' 
                            },
                            { 
                              action: 'Write to file', 
                              owner: '✅ If -w- permission', 
                              group: '✅ If -w- permission', 
                              others: '✅ If -w- permission', 
                              depends: 'Permissions only' 
                            },
                            { 
                              action: 'Delete file', 
                              owner: '✅ If directory has w--', 
                              group: '✅ If directory has -w-', 
                              others: '✅ If directory has --w', 
                              depends: 'Directory permissions' 
                            },
                          ].map((row, index) => (
                            <tr 
                              key={index} 
                              className={clsx(
                                "border-b transition-all duration-200 hover:bg-white/5",
                                isDarkMode ? "border-gray-800" : "border-gray-200"
                              )}
                            >
                              <td className="py-3 px-4 font-semibold">{row.action}</td>
                              <td className="py-3 px-4">
                                <span className={row.owner.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                                  {row.owner}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={row.group.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                                  {row.group}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={row.others.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                                  {row.others}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm opacity-80">{row.depends}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeComparison === 'real-world-cases' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-purple-400">Real-World Scenarios</h3>
                    
                    {/* Scenario Selector */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-4 text-blue-400">Select a Scenario:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {scenarios.map((scenario) => (
                          <button
                            key={scenario.id}
                            onClick={() => this.handleScenarioSelect(scenario.id)}
                            className={clsx(
                              "p-4 rounded-lg transition-all duration-300 transform hover:scale-105",
                              selectedScenario === scenario.id && showScenario
                                ? isDarkMode 
                                  ? "bg-purple-600 text-white shadow-lg" 
                                  : "bg-purple-500 text-white shadow-lg"
                                : isDarkMode
                                  ? "bg-gray-800 hover:bg-gray-700"
                                  : "bg-gray-200 hover:bg-gray-300"
                            )}
                          >
                            <div className="font-bold">{scenario.name}</div>
                            <div className="text-xs opacity-80">{scenario.location}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Scenario Content */}
                    {showScenario && (
                      <div className={clsx(
                        "p-6 rounded-xl transition-all duration-300 comparison-switch",
                        isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                      )}>
                        {selectedScenario === 'web-server' && (
                          <div>
                            <h4 className="font-bold text-green-400 mb-4">Web Server at Shyamnagar Lab</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-sm mb-3">
                                  <span className="font-semibold">Tuhina</span> deploys a website. Apache runs as <code>www-data</code> user.
                                </p>
                                <div className="space-y-3">
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Problem:</div>
                                    <div className="text-sm">Files owned by tuhina, Apache can't write logs</div>
                                  </div>
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Wrong Solution:</div>
                                    <div className="text-sm">chown www-data files (loses control)</div>
                                  </div>
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Right Solution:</div>
                                    <div className="text-sm">chgrp www-data files + chmod g+w</div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="font-mono text-sm space-y-3">
                                  <div className="text-green-400"># Tuhina keeps ownership, shares with Apache:</div>
                                  <div>$ chgrp www-data /var/www/html/*</div>
                                  <div>$ chmod g+w /var/www/html/logs/</div>
                                  
                                  <div className="mt-4 text-blue-400"># Result:</div>
                                  <div>drwxrwxr-x tuhina www-data logs/</div>
                                  <div>-rw-r--r-- tuhina www-data index.html</div>
                                  
                                  <div className="mt-4 text-xs opacity-80">
                                    Tuhina controls (ownership), Apache can access (permissions)
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {selectedScenario === 'team-project' && (
                          <div>
                            <h4 className="font-bold text-blue-400 mb-4">Team Project at Barrackpore College</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-sm mb-3">
                                  <span className="font-semibold">Swadeep, Tuhina, Abhronila</span> collaborate on a project.
                                </p>
                                <div className="space-y-3">
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Problem:</div>
                                    <div className="text-sm">Only file creator can edit files</div>
                                  </div>
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Wrong Solution:</div>
                                    <div className="text-sm">chmod 777 files (security risk)</div>
                                  </div>
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Right Solution:</div>
                                    <div className="text-sm">Create shared group + proper permissions</div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="font-mono text-sm space-y-3">
                                  <div className="text-green-400"># Create shared group:</div>
                                  <div>$ sudo groupadd project-team</div>
                                  <div>$ sudo usermod -aG project-team swadeep tuhina abhronila</div>
                                  
                                  <div className="mt-2 text-green-400"># Set up project directory:</div>
                                  <div>$ chgrp project-team /project/</div>
                                  <div>$ chmod 2775 /project/</div>
                                  <div>$ chmod g+s /project/</div>
                                  
                                  <div className="mt-4 text-blue-400"># Result:</div>
                                  <div>drwxrwsr-x swadeep project-team /project/</div>
                                  <div className="text-xs opacity-80">
                                    All team members can collaborate, setgid ensures group inheritance
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {selectedScenario === 'system-admin' && (
                          <div>
                            <h4 className="font-bold text-yellow-400 mb-4">System Administration at Ichapur Institute</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-sm mb-3">
                                  <span className="font-semibold">System administrator</span> needs to manage user files.
                                </p>
                                <div className="space-y-3">
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Problem:</div>
                                    <div className="text-sm">User locked themselves out of their own files</div>
                                  </div>
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Admin Power:</div>
                                    <div className="text-sm">Root can change both ownership AND permissions</div>
                                  </div>
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Principle:</div>
                                    <div className="text-sm">Root bypasses all permission checks</div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="font-mono text-sm space-y-3">
                                  <div className="text-green-400"># Admin helps user recover access:</div>
                                  <div>$ sudo chown user:user ~user/important.txt</div>
                                  <div>$ sudo chmod 600 ~user/important.txt</div>
                                  
                                  <div className="mt-4 text-red-400"># What regular users can't do:</div>
                                  <div>$ chown otheruser file.txt  # FAILS</div>
                                  <div>$ chmod 777 /etc/passwd     # FAILS</div>
                                  
                                  <div className="mt-4 text-xs opacity-80">
                                    Root controls ownership (chown), users control their own permissions (chmod)
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {selectedScenario === 'personal-files' && (
                          <div>
                            <h4 className="font-bold text-red-400 mb-4">Personal Files at Naihati Center</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-sm mb-3">
                                  <span className="font-semibold">Debangshu</span> wants to keep personal files private.
                                </p>
                                <div className="space-y-3">
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Ownership:</div>
                                    <div className="text-sm">Already owns his files (created them)</div>
                                  </div>
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Permissions needed:</div>
                                    <div className="text-sm">Restrict access to owner only</div>
                                  </div>
                                  <div className="p-2 bg-black/20 rounded">
                                    <div className="font-semibold">Key point:</div>
                                    <div className="text-sm">Ownership enables him to set these permissions</div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="font-mono text-sm space-y-3">
                                  <div className="text-green-400"># Set private permissions:</div>
                                  <div>$ chmod 700 ~/personal/</div>
                                  <div>$ chmod 600 ~/personal/diary.txt</div>
                                  
                                  <div className="mt-4 text-blue-400"># Verify:</div>
                                  <div>$ ls -ld ~/personal/</div>
                                  <div>drwx------ debangshu debangshu personal/</div>
                                  <div>$ ls -l ~/personal/diary.txt</div>
                                  <div>-rw------- debangshu debangshu diary.txt</div>
                                  
                                  <div className="mt-4 text-xs opacity-80">
                                    Ownership allows setting permissions, permissions enforce privacy
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                {activeComparison === 'common-mistakes' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-red-400">Common Mistakes & Misconceptions</h3>
                    
                    <div className="space-y-6">
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                      )}>
                        <h4 className="font-bold text-red-400 mb-3">⛔ Mistake 1: Confusing chown with chmod</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm mb-3">
                              <span className="font-semibold">Swadeep</span> wants classmates to run his script.
                            </p>
                            <div className="font-mono p-3 bg-black/20 rounded text-red-400">
                              $ sudo chown tuhina script.py  # WRONG!
                            </div>
                            <p className="text-sm mt-2">
                              This transfers ownership, doesn't make it executable!
                            </p>
                          </div>
                          <div>
                            <div className="font-mono text-sm space-y-2">
                              <div className="text-green-400"># Correct approach:</div>
                              <div>$ chmod a+x script.py  # Add execute permission</div>
                              <div className="text-xs opacity-80">or</div>
                              <div>$ chmod 755 script.py   # Standard executable permissions</div>
                              <div className="mt-2 text-blue-400"># Ownership remains:</div>
                              <div>-rwxr-xr-x swadeep students script.py</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                      )}>
                        <h4 className="font-bold text-yellow-400 mb-3">⛔ Mistake 2: Assuming group membership grants control</h4>
                        <div className="space-y-3">
                          <p className="text-sm">
                            <span className="font-semibold">Tuhina</span> thinks being in "students" group lets her change file permissions.
                          </p>
                          <div className="font-mono p-3 bg-black/20 rounded">
                            $ ls -l shared.txt<br/>
                            -rw-r--r-- swadeep students shared.txt<br/>
                            $ chmod 777 shared.txt<br/>
                            chmod: changing permissions of 'shared.txt': Operation not permitted
                          </div>
                          <p className="text-sm">
                            <span className="font-semibold">Truth:</span> Only the owner (swadeep) or root can change permissions.
                            Group membership only affects access, not control.
                          </p>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-5 rounded-xl border-l-4",
                        isDarkMode ? "border-purple-500/50 bg-purple-900/10" : "border-purple-400 bg-purple-50"
                      )}>
                        <h4 className="font-bold text-purple-400 mb-3">⛔ Mistake 3: Using chown when chgrp would work</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm mb-3">
                              Need to share file with team:
                            </p>
                            <div className="font-mono p-3 bg-black/20 rounded text-red-400">
                              $ sudo chown tuhina file.txt  # Overkill, needs sudo
                            </div>
                            <div className="font-mono p-3 bg-black/20 rounded text-green-400 mt-2">
                              $ chgrp developers file.txt   # Better, no sudo needed
                            </div>
                          </div>
                          <div>
                            <div className="text-sm">
                              <div className="font-semibold">Rule of thumb:</div>
                              <ul className="mt-2 space-y-2">
                                <li className="flex items-start">
                                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                                  <span>Use <code>chgrp</code> for sharing within team</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                                  <span>Use <code>chown</code> for transferring control</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                                  <span>If you need sudo for sharing, you're probably using wrong command</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-5 rounded-xl",
                        isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                      )}>
                        <h4 className="font-bold text-green-400 mb-4">✅ Quick Decision Guide</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="space-y-3">
                              <div className="p-3 bg-black/20 rounded">
                                <div className="font-semibold">Question: "I want to..."</div>
                                <div className="text-sm mt-2">Make file executable</div>
                                <div className="font-mono text-green-400">→ chmod +x file</div>
                              </div>
                              
                              <div className="p-3 bg-black/20 rounded">
                                <div className="font-semibold">Question: "I want to..."</div>
                                <div className="text-sm mt-2">Share with my group</div>
                                <div className="font-mono text-green-400">→ chgrp groupname file</div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="space-y-3">
                              <div className="p-3 bg-black/20 rounded">
                                <div className="font-semibold">Question: "I want to..."</div>
                                <div className="text-sm mt-2">Transfer file to someone</div>
                                <div className="font-mono text-green-400">→ sudo chown newuser file</div>
                              </div>
                              
                              <div className="p-3 bg-black/20 rounded">
                                <div className="font-semibold">Question: "I want to..."</div>
                                <div className="text-sm mt-2">Make file private</div>
                                <div className="font-mono text-green-400">→ chmod 600 file</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Interactive Quiz */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Interactive Quiz: Ownership vs Permissions
              </h2>
              
              <div className="space-y-6">
                <div className={clsx(
                  "p-5 rounded-xl",
                  isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <h4 className="font-bold text-blue-400 mb-4">Question 1: The Permission Problem</h4>
                  <p className="text-sm mb-4">
                    File: <code>-rw-r--r-- swadeep students project.txt</code><br/>
                    <span className="font-semibold">Tuhina</span> (in students group) needs to edit this file. 
                    What should Swadeep do?
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      { id: 'a', text: 'sudo chown tuhina project.txt', correct: false, reason: 'Transfers ownership, overkill' },
                      { id: 'b', text: 'chmod g+w project.txt', correct: true, reason: 'Gives write permission to group' },
                      { id: 'c', text: 'chgrp tuhina project.txt', correct: false, reason: 'Changes group, not permissions' },
                      { id: 'd', text: 'chmod 777 project.txt', correct: false, reason: 'Security risk, gives everyone write' }
                    ].map((option) => (
                      <div
                        key={option.id}
                        className={clsx(
                          "p-3 rounded-lg transition-all duration-300 cursor-pointer",
                          option.correct
                            ? isDarkMode 
                              ? "bg-green-900/30 border border-green-700/50" 
                              : "bg-green-100 border border-green-300"
                            : isDarkMode
                              ? "bg-gray-800/50 hover:bg-gray-700/50"
                              : "bg-gray-200 hover:bg-gray-300"
                        )}
                      >
                        <div className="flex items-center">
                          <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                            option.correct ? "bg-green-500" : "bg-gray-500"
                          )}>
                            <span className="text-white font-bold">{option.id}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-mono text-sm">{option.text}</div>
                            <div className="text-xs opacity-80 mt-1">{option.reason}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={clsx(
                  "p-5 rounded-xl",
                  isDarkMode ? "bg-gray-800/30" : "bg-gray-100"
                )}>
                  <h4 className="font-bold text-green-400 mb-4">Question 2: The Recovery Scenario</h4>
                  <p className="text-sm mb-4">
                    <span className="font-semibold">Debangshu</span> accidentally ran: <code>sudo chown root important.txt</code><br/>
                    Now he can't edit his own file. What's the BEST way to fix this?
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      { id: 'a', text: 'sudo chmod 777 important.txt', correct: false, reason: 'Security risk, doesn\'t fix ownership' },
                      { id: 'b', text: 'rm important.txt and recreate it', correct: false, reason: 'Loses file contents' },
                      { id: 'c', text: 'sudo chown debangshu important.txt', correct: true, reason: 'Returns ownership correctly' },
                      { id: 'd', text: 'Ask root to edit it for him', correct: false, reason: 'Workaround, not solution' }
                    ].map((option) => (
                      <div
                        key={option.id}
                        className={clsx(
                          "p-3 rounded-lg transition-all duration-300 cursor-pointer",
                          option.correct
                            ? isDarkMode 
                              ? "bg-green-900/30 border border-green-700/50" 
                              : "bg-green-100 border border-green-300"
                            : isDarkMode
                              ? "bg-gray-800/50 hover:bg-gray-700/50"
                              : "bg-gray-200 hover:bg-gray-300"
                        )}
                      >
                        <div className="flex items-center">
                          <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                            option.correct ? "bg-green-500" : "bg-gray-500"
                          )}>
                            <span className="text-white font-bold">{option.id}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-mono text-sm">{option.text}</div>
                            <div className="text-xs opacity-80 mt-1">{option.reason}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                  )}>
                    <h4 className="font-bold text-blue-400 mb-3">Quick Self-Check</h4>
                    <div className="space-y-2 text-sm">
                      <p>Ask yourself before changing permissions/ownership:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Am I the file owner? (check with <code>ls -l</code>)</li>
                        <li>Do I need to change control or just access?</li>
                        <li>Will this affect other users' access?</li>
                        <li>Is there a safer alternative? (chgrp vs chown)</li>
                        <li>Have I backed up important files?</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                  )}>
                    <h4 className="font-bold text-green-400 mb-3">Memory Aid</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-black/20 rounded">
                        <div className="font-semibold">chown = CHANGE OWNERship</div>
                        <div className="text-xs">(Controls who gets to set rules)</div>
                      </div>
                      <div className="p-2 bg-black/20 rounded">
                        <div className="font-semibold">chmod = CHANGE MODE</div>
                        <div className="text-xs">(Changes the access rules themselves)</div>
                      </div>
                      <div className="p-2 bg-black/20 rounded">
                        <div className="font-semibold">chgrp = CHANGE GRouP</div>
                        <div className="text-xs">(Changes who the rules apply to)</div>
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
                  "In my 27 years teaching at Barrackpore College and Ichapur Institute, I've seen this confusion 
                  countless times: students think 'If I can't access a file, I should change ownership.' Wrong! 
                  Ownership is about control, permissions are about access. Think of it like a museum: 
                  The curator owns the paintings (ownership) and sets the rules (permissions) - no touching, 
                  photos allowed, etc. Visitors follow the rules. The curator doesn't transfer ownership 
                  to every visitor who wants to take a photo!"
                </p>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4",
                  isDarkMode ? "bg-black/30" : "bg-white/20"
                )}>
                  <h4 className="font-bold text-yellow-300 mb-2">Practical Rule:</h4>
                  <p className="text-sm">
                    Before running any permission/ownership command, ask: "Am I trying to change WHO CONTROLS 
                    this file or WHO CAN ACCESS it?" If it's about access, use <code>chmod</code> or <code>chgrp</code>. 
                    If it's about control, you probably need <code>sudo chown</code>. At Shyamnagar Lab, we have 
                    this printed above every workstation!
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
                      If a file has permissions <code>-rwxrwxrwx</code> but is owned by root, 
                      can a regular user delete this file? What if it's in a directory they own?
                      <span className="block mt-2 text-sm opacity-80">
                        Consider the interaction between file permissions, directory permissions, and ownership...
                      </span>
                    </p>
                    <div className="mt-4 p-3 bg-black/20 rounded">
                      <div className="font-mono text-sm">
                        Hint: File deletion depends on directory write permission, not file permissions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
            <p>Topic 8: Ownership vs Permission Control • Next: Special Permissions (setuid, setgid, sticky bit)</p>
            <p className="mt-2">Practice: Create test files and experiment with chown vs chmod to feel the difference</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Topic7;