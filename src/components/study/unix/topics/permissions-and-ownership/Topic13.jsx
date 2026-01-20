import React from 'react';
import clsx from 'clsx';

export default class Topic13 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      showAnimation: false,
      activeTab: 'concept',
      selectedScenario: 'shared',
      showComparison: false
    };
  }

  componentDidMount() {
    // Trigger animations after mount
    setTimeout(() => {
      this.setState({ showAnimation: true });
    }, 100);
    
    // Check for dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setState({ isDarkMode: true });
    }
    
    // Listen for dark mode changes
    this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkModeListener = (e) => this.setState({ isDarkMode: e.matches });
    this.darkModeMediaQuery.addListener(this.darkModeListener);
  }

  componentWillUnmount() {
    if (this.darkModeMediaQuery && this.darkModeListener) {
      this.darkModeMediaQuery.removeListener(this.darkModeListener);
    }
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleScenarioChange = (scenario) => {
    this.setState({ selectedScenario: scenario });
  };

  toggleComparison = () => {
    this.setState(prevState => ({ showComparison: !prevState.showComparison }));
  };

  getScenarios = () => {
    return {
      shared: {
        title: "Shared Project Directory",
        description: "College project where multiple students need different access levels",
        problem: "Standard Unix permissions only allow one owner, one group, and others. How to give Swadeep read/write, Tuhina read-only, and Abhronila execute-only access?",
        solution: "ACLs allow specifying permissions for individual users and multiple groups",
        aclSetup: [
          "setfacl -m u:swadeep:rwx /projects/college",
          "setfacl -m u:tuhina:r-x /projects/college",
          "setfacl -m u:abhronila:--x /projects/college",
          "setfacl -m g:faculty:rwx /projects/college"
        ],
        verification: "getfacl /projects/college",
        location: "Barrackpore College Computer Lab"
      },
      web: {
        title: "Web Server Directory",
        description: "Website where different services need different access",
        problem: "Apache needs read access, developers need write, backup system needs read, and logs need append-only for Apache",
        solution: "Fine-grained ACLs for different users and groups",
        aclSetup: [
          "setfacl -m u:apache:r-x /var/www/html",
          "setfacl -m g:developers:rwx /var/www/html",
          "setfacl -m u:backup:r-- /var/www/html",
          "setfacl -m u:apache:rw- /var/www/logs",
          "setfacl -m d:u:apache:rw- /var/www/logs"
        ],
        verification: "getfacl /var/www/html",
        location: "Shyamnagar Web Hosting Server"
      },
      medical: {
        title: "Medical Records System",
        description: "Hospital system with strict access control requirements",
        problem: "Doctors need read/write, nurses need read-only, admin staff need no access, auditors need temporary read access",
        solution: "ACLs with default permissions and timed access (with special scripts)",
        aclSetup: [
          "setfacl -m g:doctors:rw- /medical/records",
          "setfacl -m g:nurses:r-- /medical/records",
          "setfacl -m g:admin:--- /medical/records",
          "setfacl -m u:auditor2024:r-- /medical/records"
        ],
        verification: "getfacl /medical/records",
        location: "Ichapur General Hospital"
      },
      research: {
        title: "Research Data Repository",
        description: "University research data with complex collaboration needs",
        problem: "Principal investigator needs full access, research assistants need write, students need read, public needs no access, collaborators from other institutions need specific access",
        solution: "Complex ACL structure with mask adjustments",
        aclSetup: [
          "setfacl -m u:drdebashish:rwx /research/data",
          "setfacl -m g:assistants:rw- /research/data",
          "setfacl -m g:students:r-x /research/data",
          "setfacl -m u:collab_mit:r-- /research/data",
          "setfacl -m m::rwx /research/data"
        ],
        verification: "getfacl /research/data",
        location: "Naihati University Research Center"
      }
    };
  };

  renderACLVisualization = () => {
    const scenarios = this.getScenarios();
    const scenario = scenarios[this.state.selectedScenario];
    
    return (
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-400">{scenario.title}</h4>
          <p className="mb-3">{scenario.description}</p>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
            <p className="font-semibold mb-1">📍 Location:</p>
            <p>{scenario.location}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <h5 className="font-bold mb-2 text-red-700 dark:text-red-400">❌ Problem (Standard Permissions):</h5>
            <p>{scenario.problem}</p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
            <h5 className="font-bold mb-2 text-green-700 dark:text-green-400">✅ Solution (ACLs):</h5>
            <p>{scenario.solution}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h5 className="font-bold text-lg text-purple-700 dark:text-purple-400">ACL Configuration Commands:</h5>
          <div className="space-y-2">
            {scenario.aclSetup.map((cmd, index) => (
              <div key={index} className="p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
                $ {cmd}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h5 className="font-bold mb-2">Verification Command:</h5>
          <code className="block p-3 bg-gray-900 text-green-400 rounded font-mono">
            $ {scenario.verification}
          </code>
        </div>
      </div>
    );
  };

  render() {
    const { isDarkMode, showAnimation, activeTab, selectedScenario, showComparison } = this.state;
    const scenarios = this.getScenarios();

    const themeClasses = clsx(
      'min-h-screen transition-colors duration-300',
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-rose-50 to-pink-50 text-gray-900'
    );

    const cardClasses = clsx(
      'rounded-xl p-6 transition-all duration-300',
      isDarkMode
        ? 'bg-gray-800 border border-gray-700 hover:border-rose-500 hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]'
        : 'bg-white border border-gray-200 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]'
    );

    const teacherNoteClasses = clsx(
      'rounded-lg p-5 transition-all duration-300',
      isDarkMode
        ? 'bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-l-4 border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]'
        : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]'
    );

    const sectionAnimation = clsx(
      'transition-all duration-700 motion-safe:animate-[fadeInUp_0.8s_ease-out]',
      showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    );

    // Inline styles for keyframes
    const keyframesStyle = `
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
      @keyframes aclFlow {
        0% { stroke-dashoffset: 100; }
        100% { stroke-dashoffset: 0; }
      }
    `;

    return (
      <div className={themeClasses}>
        <style>{keyframesStyle}</style>
        
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header Section */}
          <header className={clsx(sectionAnimation, "mb-12 text-center")}>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Topic 4: Access Control Lists (ACL) - Concept & Overview
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Extending Unix permissions with fine-grained access control for complex scenarios.
            </p>
          </header>

          {/* Introduction Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold mb-4 text-rose-700 dark:text-rose-400">
              <span className="inline-block p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg mr-2">🔓</span>
              What Are Access Control Lists (ACLs)?
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                ACLs (Access Control Lists) are an extension to the standard Unix file permissions that provide 
                <span className="font-semibold text-rose-600 dark:text-rose-400"> fine-grained access control</span>. 
                While traditional permissions only allow setting permissions for owner, group, and others, 
                ACLs allow you to specify permissions for multiple users and groups on the same file or directory.
              </p>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Real-World Analogy:</p>
                <p>
                  Think of a college library in Barrackpore: Standard permissions are like having only three keys 
                  (owner=libarian, group=teachers, others=students). ACLs are like having a keycard system where 
                  Swadeep can access anytime, Tuhina can access 9 AM-5 PM, Abhronila can only read reference books, 
                  and Debangshu (guest researcher) has temporary access.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">🎯 Granular Control</h4>
                  <p className="text-sm">Set permissions for individual users beyond just owner</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-green-700 dark:text-green-400">👥 Multiple Groups</h4>
                  <p className="text-sm">Assign different permissions to multiple groups on same file</p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-purple-700 dark:text-purple-400">📁 Default ACLs</h4>
                  <p className="text-sm">Set default permissions for new files in directories</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tab Navigation */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">📚</span>
              ACL Concepts & Usage
            </h2>
            
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => this.handleTabChange('concept')}
                  className={clsx(
                    "px-6 py-3 rounded-lg transition-all duration-300 font-semibold",
                    activeTab === 'concept'
                      ? 'bg-rose-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  Core Concepts
                </button>
                <button
                  onClick={() => this.handleTabChange('commands')}
                  className={clsx(
                    "px-6 py-3 rounded-lg transition-all duration-300 font-semibold",
                    activeTab === 'commands'
                      ? 'bg-rose-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  Key Commands
                </button>
                <button
                  onClick={() => this.handleTabChange('scenarios')}
                  className={clsx(
                    "px-6 py-3 rounded-lg transition-all duration-300 font-semibold",
                    activeTab === 'scenarios'
                      ? 'bg-rose-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  Real Scenarios
                </button>
              </div>
              
              {activeTab === 'concept' && (
                <div className="space-y-6">
                  {/* ACL vs Standard Permissions */}
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-bold mb-3 text-rose-600 dark:text-rose-400">ACL vs Standard Permissions</h3>
                    
                    <div className="flex justify-center mb-6">
                      <svg width="600" height="300" viewBox="0 0 600 300" className="w-full max-w-2xl">
                        {/* Standard Permissions */}
                        <g>
                          <rect x="50" y="50" width="200" height="200" rx="10" fill="#3B82F6" opacity="0.2" stroke="#3B82F6" strokeWidth="2" />
                          <text x="150" y="80" textAnchor="middle" fill="#1D4ED8" fontSize="16" fontWeight="bold">Standard Permissions</text>
                          
                          <circle cx="100" cy="120" r="25" fill="#3B82F6" />
                          <text x="100" y="125" textAnchor="middle" fill="white" fontSize="12">Owner</text>
                          
                          <circle cx="150" cy="170" r="25" fill="#8B5CF6" />
                          <text x="150" y="175" textAnchor="middle" fill="white" fontSize="12">Group</text>
                          
                          <circle cx="200" cy="120" r="25" fill="#10B981" />
                          <text x="200" y="125" textAnchor="middle" fill="white" fontSize="12">Others</text>
                          
                          <text x="150" y="220" textAnchor="middle" fill="#4B5563" fontSize="12">Only 3 entities</text>
                        </g>
                        
                        {/* ACL Permissions */}
                        <g>
                          <rect x="350" y="50" width="200" height="200" rx="10" fill="#EC4899" opacity="0.2" stroke="#EC4899" strokeWidth="2" />
                          <text x="450" y="80" textAnchor="middle" fill="#BE185D" fontSize="16" fontWeight="bold">ACL Permissions</text>
                          
                          <circle cx="380" cy="100" r="20" fill="#3B82F6" />
                          <text x="380" y="105" textAnchor="middle" fill="white" fontSize="10">Owner</text>
                          
                          <circle cx="430" cy="100" r="20" fill="#8B5CF6" />
                          <text x="430" y="105" textAnchor="middle" fill="white" fontSize="10">Group</text>
                          
                          <circle cx="480" cy="100" r="20" fill="#10B981" />
                          <text x="480" y="105" textAnchor="middle" fill="white" fontSize="10">Others</text>
                          
                          <circle cx="380" cy="150" r="20" fill="#F59E0B" />
                          <text x="380" y="155" textAnchor="middle" fill="white" fontSize="10">User A</text>
                          
                          <circle cx="430" cy="150" r="20" fill="#EF4444" />
                          <text x="430" y="155" textAnchor="middle" fill="white" fontSize="10">User B</text>
                          
                          <circle cx="480" cy="150" r="20" fill="#8B5CF6" />
                          <text x="480" y="155" textAnchor="middle" fill="white" fontSize="10">Group X</text>
                          
                          <circle cx="380" cy="200" r="20" fill="#10B981" />
                          <text x="380" y="205" textAnchor="middle" fill="white" fontSize="10">Group Y</text>
                          
                          <text x="450" y="240" textAnchor="middle" fill="#4B5563" fontSize="12">Multiple users & groups</text>
                          <text x="450" y="255" textAnchor="middle" fill="#4B5563" fontSize="10">...and more!</text>
                        </g>
                        
                        {/* Arrow */}
                        <path d="M250,150 L350,150" stroke="#6B7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                        <text x="300" y="145" textAnchor="middle" fill="#6B7280" fontSize="12">Extended to</text>
                        
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                          </marker>
                        </defs>
                      </svg>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <h4 className="font-bold mb-1 text-blue-700 dark:text-blue-400">Standard Permissions</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Only 3 permission sets: owner, group, others</li>
                          <li>One group per file/directory</li>
                          <li>No individual user exceptions</li>
                          <li>Simple but limited</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
                        <h4 className="font-bold mb-1 text-rose-700 dark:text-rose-400">ACL Permissions</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Multiple user entries</li>
                          <li>Multiple group entries</li>
                          <li>Default ACLs for inheritance</li>
                          <li>Mask for maximum permissions</li>
                          <li>Complex but flexible</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* ACL Entry Types */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">Types of ACL Entries</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-bold mb-2 text-green-700 dark:text-green-400">Access ACLs</h4>
                        <p className="text-sm mb-2">Applied to specific files/directories</p>
                        <code className="block p-2 bg-gray-900 text-green-400 rounded text-xs">
                          user:swadeep:rwx<br/>
                          group:students:r-x<br/>
                          other::r--
                        </code>
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">Default ACLs</h4>
                        <p className="text-sm mb-2">Inherited by new files in directory</p>
                        <code className="block p-2 bg-gray-900 text-blue-400 rounded text-xs">
                          default:user::rwx<br/>
                          default:group::r-x<br/>
                          default:other::r--
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'commands' && (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-rose-600 dark:text-rose-400">Essential ACL Commands</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">1. Check if filesystem supports ACLs</h4>
                        <code className="block p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
                          $ mount | grep acl<br/>
                          $ tune2fs -l /dev/sda1 | grep options
                        </code>
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                          Many systems need <code>acl</code> mount option enabled
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">2. View ACLs (getfacl)</h4>
                        <code className="block p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
                          $ getfacl /path/to/file<br/>
                          $ getfacl -c /path/to/file  # Compact output<br/>
                          $ getfacl -R /path/to/dir   # Recursive
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2 text-purple-600 dark:text-purple-400">3. Set ACLs (setfacl)</h4>
                        <div className="space-y-2">
                          <code className="block p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                            # Add user ACL<br/>
                            $ setfacl -m u:username:permissions file
                          </code>
                          <code className="block p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                            # Add group ACL<br/>
                            $ setfacl -m g:groupname:permissions file
                          </code>
                          <code className="block p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                            # Set default ACL<br/>
                            $ setfacl -m d:u:username:permissions dir
                          </code>
                          <code className="block p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                            # Remove specific ACL<br/>
                            $ setfacl -x u:username file
                          </code>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2 text-yellow-600 dark:text-yellow-400">4. Copy ACLs between files</h4>
                        <code className="block p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
                          $ getfacl file1 | setfacl --set-file=- file2
                        </code>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">📝 Permission Syntax</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <p className="text-sm font-semibold">Symbolic:</p>
                        <code className="text-xs bg-gray-800 text-white p-1 rounded">rwx</code>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Octal:</p>
                        <code className="text-xs bg-gray-800 text-white p-1 rounded">7</code>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Combined:</p>
                        <code className="text-xs bg-gray-800 text-white p-1 rounded">rw- (6)</code>
                      </div>
                    </div>
                    <p className="text-sm mt-2">
                      Examples: <code>rwx</code> = 7, <code>r-x</code> = 5, <code>---</code> = 0
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'scenarios' && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <label className="block mb-3 font-semibold text-lg">Select Real-World Scenario:</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {Object.keys(scenarios).map((key) => (
                        <button
                          key={key}
                          onClick={() => this.handleScenarioChange(key)}
                          className={clsx(
                            "p-3 rounded-lg transition-all duration-300 text-sm",
                            selectedScenario === key
                              ? 'bg-rose-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                          )}
                        >
                          {scenarios[key].title.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {this.renderACLVisualization()}
                </div>
              )}
            </div>
          </section>

          {/* Mask Concept Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-400">
              <span className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-2">🎭</span>
              Understanding the ACL Mask
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="mb-4">
                  The <span className="font-semibold text-purple-600 dark:text-purple-400">mask</span> is a special ACL entry 
                  that defines the <span className="font-semibold">maximum effective permissions</span> for all named users, 
                  named groups, and the group owner. It acts as an upper limit on permissions.
                </p>
                
                <div className="flex justify-center mb-6">
                  <svg width="500" height="200" viewBox="0 0 500 200" className="w-full max-w-lg">
                    {/* ACL Entries */}
                    <g>
                      <rect x="50" y="30" width="150" height="40" rx="5" fill="#3B82F6" opacity="0.8" />
                      <text x="125" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">user:swadeep:rwx</text>
                      
                      <rect x="50" y="80" width="150" height="40" rx="5" fill="#8B5CF6" opacity="0.8" />
                      <text x="125" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">group:students:r-x</text>
                      
                      <rect x="50" y="130" width="150" height="40" rx="5" fill="#10B981" opacity="0.8" />
                      <text x="125" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">user:tuhina:r--</text>
                    </g>
                    
                    {/* Mask */}
                    <g>
                      <rect x="250" y="80" width="150" height="40" rx="5" fill="#EC4899" opacity="0.8">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                      </rect>
                      <text x="325" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">mask::r-x</text>
                      <text x="325" y="125" textAnchor="middle" fill="white" fontSize="10">Maximum allowed</text>
                    </g>
                    
                    {/* Effective Permissions */}
                    <g>
                      <rect x="420" y="30" width="150" height="40" rx="5" fill="#F59E0B" opacity="0.8" />
                      <text x="495" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">swadeep: r-x</text>
                      <text x="495" y="70" textAnchor="middle" fill="white" fontSize="10">(was rwx)</text>
                      
                      <rect x="420" y="80" width="150" height="40" rx="5" fill="#F59E0B" opacity="0.8" />
                      <text x="495" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">students: r-x</text>
                      <text x="495" y="120" textAnchor="middle" fill="white" fontSize="10">(unchanged)</text>
                      
                      <rect x="420" y="130" width="150" height="40" rx="5" fill="#F59E0B" opacity="0.8" />
                      <text x="495" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">tuhina: r--</text>
                      <text x="495" y="170" textAnchor="middle" fill="white" fontSize="10">(unchanged)</text>
                    </g>
                    
                    {/* Arrows */}
                    <path d="M200,50 L250,50" stroke="#6B7280" strokeWidth="2" fill="none" />
                    <path d="M200,100 L250,100" stroke="#6B7280" strokeWidth="2" fill="none" />
                    <path d="M200,150 L250,150" stroke="#6B7280" strokeWidth="2" fill="none" />
                    
                    <path d="M400,50 L420,50" stroke="#6B7280" strokeWidth="2" fill="none" />
                    <path d="M400,100 L420,100" stroke="#6B7280" strokeWidth="2" fill="none" />
                    <path d="M400,150 L420,150" stroke="#6B7280" strokeWidth="2" fill="none" />
                    
                    <text x="325" y="180" textAnchor="middle" fill="#6B7280" fontSize="12">Mask limits permissions</text>
                  </svg>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
                    <h4 className="font-bold mb-1 text-rose-700 dark:text-rose-400">Key Points about Mask:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Automatically calculated when ACLs change</li>
                      <li>Can be set manually with <code>setfacl -m m::perms</code></li>
                      <li>Doesn't affect owner or other permissions</li>
                      <li>Affects group owner and all named entries</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <h4 className="font-bold mb-1 text-blue-700 dark:text-blue-400">Example in Naihati Research:</h4>
                    <p className="text-sm">
                      If mask is <code>r-x</code> (5), then Swadeep's <code>rwx</code> (7) becomes effectively <code>r-x</code> (5). 
                      Write permission is masked out even though explicitly granted.
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={this.toggleComparison}
                className="w-full p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-lg transition-colors duration-300 text-blue-700 dark:text-blue-400 font-semibold"
              >
                {showComparison ? 'Hide' : 'Show'} ACL vs Standard Permission Comparison
              </button>
              
              {showComparison && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-bold mb-2 text-yellow-700 dark:text-yellow-400">Comparison: Ichapur Hospital Scenario</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-200 dark:bg-gray-800">
                          <th className="p-2 border">Requirement</th>
                          <th className="p-2 border">Standard Permissions</th>
                          <th className="p-2 border">ACL Solution</th>
                          <th className="p-2 border">Advantage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                          <td className="p-2 border">Doctors read/write</td>
                          <td className="p-2 border">Make doctors group owner</td>
                          <td className="p-2 border"><code>setfacl -m g:doctors:rw-</code></td>
                          <td className="p-2 border">Can have multiple groups</td>
                        </tr>
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                          <td className="p-2 border">Nurses read-only</td>
                          <td className="p-2 border">Impossible with same group</td>
                          <td className="p-2 border"><code>setfacl -m g:nurses:r--</code></td>
                          <td className="p-2 border">Different permissions per group</td>
                        </tr>
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                          <td className="p-2 border">Specific auditor access</td>
                          <td className="p-2 border">Create special group</td>
                          <td className="p-2 border"><code>setfacl -m u:auditor:r--</code></td>
                          <td className="p-2 border">User-specific without new group</td>
                        </tr>
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                          <td className="p-2 border">New files inherit</td>
                          <td className="p-2 border">Set directory permissions</td>
                          <td className="p-2 border"><code>setfacl -m d:...</code></td>
                          <td className="p-2 border">Automatic inheritance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.4s'}}>
            <div className={teacherNoteClasses}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold">
                    SH
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-amber-800 dark:text-yellow-300">Teacher's Note</h3>
                    <span className="text-sm px-3 py-1 bg-amber-200 dark:bg-amber-900 rounded-full font-semibold">
                      Sukanta Hui
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="mb-2"><strong>Experience:</strong> 27 years in Programming, RDBMS, OS, Web Development</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Email: sukantahui@codernaccotax.co.in | Mobile: 7003756860
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🎯 Critical Insight:</p>
                      <p>The mask is the most misunderstood ACL concept. It's NOT a permission itself but a LIMIT on permissions. When you see <code>#effective: r-x</code> in getfacl output, that's the mask in action.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">💡 Teaching Strategy:</p>
                      <p>When teaching at Barrackpore college, I use this analogy: "The mask is like a ceiling - Swadeep might have permission to jump 3 meters high (rwx), but if the ceiling is 2 meters (r-x), he can only jump 2 meters."</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🔧 Professional Tip:</p>
                      <p>In production, always use <code>getfacl</code> to verify effective permissions, not just set ACLs. The mask can silently change effective access. For web servers in Shyamnagar, we audit ACLs monthly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Pitfalls Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.5s'}}>
            <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">
              <span className="inline-block p-2 bg-red-100 dark:red-900/30 rounded-lg mr-2">🚫</span>
              Common ACL Mistakes & Pitfalls
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">1. Forgetting to enable ACLs on filesystem</h4>
                <p className="text-sm">ACLs require filesystem support. Many beginners in Ichapur lab try setfacl but get "Operation not supported" because the partition wasn't mounted with <code>acl</code> option.</p>
                <code className="block mt-2 p-2 bg-gray-900 text-red-400 rounded text-xs">
                  # Check: mount | grep " / " | grep acl<br/>
                  # Enable: add "acl" to /etc/fstab options
                </code>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">2. Not understanding mask behavior</h4>
                <p className="text-sm">When Tuhina sets <code>setfacl -m u:swadeep:rwx</code> but mask is <code>r-x</code>, Swadeep effectively gets only <code>r-x</code>. The mask overrides individual entries.</p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">3. Copying files loses ACLs</h4>
                <p className="text-sm">Standard <code>cp</code> doesn't preserve ACLs. Use <code>cp -a</code> or <code>cp --preserve=all</code>. In Naihati research, we lost ACLs on backup files until we fixed this.</p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">4. ACL inheritance confusion</h4>
                <p className="text-sm">Default ACLs only affect NEW files. Existing files don't get updated. When Abhronila adds default ACLs, she's surprised old files don't change.</p>
              </div>
            </div>
          </section>

          {/* Best Practices Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.6s'}}>
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:green-900/30 rounded-lg mr-2">✅</span>
              ACL Best Practices
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">1. Start simple, add complexity gradually</h4>
                <p className="text-sm">Use standard permissions when possible. Only use ACLs when you truly need multiple users/groups with different permissions. Over-ACLing creates maintenance nightmares.</p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">2. Document ACL configurations</h4>
                <p className="text-sm">Keep a README.acl file in directories with complex ACLs. Document why each entry exists. At Shyamnagar hosting, we maintain ACL documentation for each client.</p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">3. Use groups over individual users when possible</h4>
                <p className="text-sm">Instead of <code>u:swadeep:rwx, u:tuhina:rwx, u:abhronila:rwx</code>, create a "project_team" group and use <code>g:project_team:rwx</code>. Easier to manage.</p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">4. Regular ACL audits</h4>
                <p className="text-sm">Schedule monthly <code>getfacl -R</code> audits. Check for stale entries (users who left, projects that ended). At Barrackpore college, we audit before each semester.</p>
              </div>
            </div>
          </section>

          {/* Hint Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.7s'}}>
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              <span className="inline-block p-2 bg-indigo-100 dark:indigo-900/30 rounded-lg mr-2">💡</span>
              Thinking Hints & Practice
            </h2>
            
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🤔 Analyze this getfacl output:</p>
                <code className="block bg-gray-900 text-green-400 p-2 rounded font-mono text-xs mt-1">
                  # file: project<br/>
                  # owner: swadeep<br/>
                  # group: students<br/>
                  user::rwx<br/>
                  user:tuhina:r-x<br/>
                  group::r-x<br/>
                  group:faculty:rwx<br/>
                  mask::r-x<br/>
                  other::r--<br/>
                  default:user::rwx<br/>
                  default:group::r-x<br/>
                  default:other::r--
                </code>
                <p className="text-sm mt-2">What happens when Abhronila (not in any listed group) creates a new file in this directory?</p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🔍 Spot the issue:</p>
                <code className="block bg-gray-900 text-green-400 p-2 rounded font-mono text-xs mt-1">
                  $ setfacl -m u:debangshu:rwx /shared<br/>
                  $ setfacl -m m::r-x /shared<br/>
                  $ ls -l /shared<br/>
                  drwxr-xr-x+ 2 swadeep students 4096 Jan 25 10:30 /shared
                </code>
                <p className="text-sm mt-2">Why does Debangshu complain he can't write to /shared despite having rwx in ACL?</p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🧪 Try this exercise:</p>
                <p className="text-sm">Create a directory in Ichapur lab. Give Swadeep rwx, Tuhina r-x, Abhronila r--, and set mask to r-x. Verify with getfacl. Now try to write a file as Tuhina. What happens?</p>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">💡 Remember:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>The plus sign (+) in <code>ls -l</code> output indicates ACLs are present</li>
                  <li><code>getfacl</code> shows requested AND effective permissions</li>
                  <li>Default ACLs only affect newly created files/directories</li>
                  <li>Backup tools may need special flags to preserve ACLs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Reference Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.8s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:blue-900/30 rounded-lg mr-2">📋</span>
              ACL Quick Reference
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                    <th className="p-3 text-left border">Command</th>
                    <th className="p-3 text-left border">Description</th>
                    <th className="p-3 text-left border">Example</th>
                    <th className="p-3 text-left border">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">getfacl file</td>
                    <td className="p-3 border">View ACLs</td>
                    <td className="p-3 border font-mono text-sm">getfacl /projects</td>
                    <td className="p-3 border">Check current ACLs</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">setfacl -m u:name:perms</td>
                    <td className="p-3 border">Add user ACL</td>
                    <td className="p-3 border font-mono text-sm">setfacl -m u:swadeep:rwx dir</td>
                    <td className="p-3 border">Grant user access</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">setfacl -m g:name:perms</td>
                    <td className="p-3 border">Add group ACL</td>
                    <td className="p-3 border font-mono text-sm">setfacl -m g:students:r-x dir</td>
                    <td className="p-3 border">Grant group access</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">setfacl -m d:...</td>
                    <td className="p-3 border">Set default ACL</td>
                    <td className="p-3 border font-mono text-sm">setfacl -m d:u:swadeep:rwx dir</td>
                    <td className="p-3 border">Inheritance for new files</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">setfacl -x u:name</td>
                    <td className="p-3 border">Remove ACL entry</td>
                    <td className="p-3 border font-mono text-sm">setfacl -x u:tuhina file</td>
                    <td className="p-3 border">Revoke access</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">setfacl -b file</td>
                    <td className="p-3 border">Remove all ACLs</td>
                    <td className="p-3 border font-mono text-sm">setfacl -b /shared</td>
                    <td className="p-3 border">Reset to standard permissions</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">setfacl -m m::perms</td>
                    <td className="p-3 border">Set mask</td>
                    <td className="p-3 border font-mono text-sm">setfacl -m m::r-x dir</td>
                    <td className="p-3 border">Limit maximum permissions</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">ls -ld file</td>
                    <td className="p-3 border">Check for ACLs (+) sign</td>
                    <td className="p-3 border font-mono text-sm">ls -ld /projects</td>
                    <td className="p-3 border">Quick ACL indicator</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className={clsx(sectionAnimation, "mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 text-center")}>
            <p className="text-gray-600 dark:text-gray-400">
              Topic 4: Access Control Lists - Beyond Standard Unix Permissions
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Next Topic: Security best practices for multi-user systems
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

