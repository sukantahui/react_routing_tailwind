import React from 'react';
import clsx from 'clsx';

export default  class Topic15 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      showAnimation: false,
      activeStep: 1,
      scenario: 'college',
      userPermissions: {
        swadeep: { read: true, write: true, execute: true },
        tuhina: { read: true, write: false, execute: true },
        abhronila: { read: false, write: false, execute: false },
        debangshu: { read: true, write: false, execute: false }
      },
      showSolution: false,
      showCommonMistakes: false,
      commandHistory: []
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

  handleStepChange = (step) => {
    this.setState({ activeStep: step });
  };

  handleScenarioChange = (scenario) => {
    this.setState({ scenario });
    // Reset permissions for new scenario
    this.setState({
      userPermissions: this.getDefaultPermissions(scenario)
    });
  };

  getDefaultPermissions = (scenario) => {
    const permissions = {
      college: {
        swadeep: { read: true, write: true, execute: true },
        tuhina: { read: true, write: false, execute: true },
        abhronila: { read: false, write: false, execute: false },
        debangshu: { read: true, write: false, execute: false }
      },
      hosting: {
        swadeep: { read: true, write: true, execute: true },
        tuhina: { read: true, write: true, execute: false },
        abhronila: { read: true, write: false, execute: false },
        debangshu: { read: false, write: false, execute: false }
      },
      research: {
        swadeep: { read: true, write: true, execute: true },
        tuhina: { read: true, write: false, execute: true },
        abhronila: { read: true, write: true, execute: false },
        debangshu: { read: true, write: false, execute: false }
      }
    };
    return permissions[scenario];
  };

  togglePermission = (user, permission) => {
    this.setState(prevState => ({
      userPermissions: {
        ...prevState.userPermissions,
        [user]: {
          ...prevState.userPermissions[user],
          [permission]: !prevState.userPermissions[user][permission]
        }
      }
    }));
  };

  toggleSolution = () => {
    this.setState(prevState => ({ showSolution: !prevState.showSolution }));
  };

  toggleCommonMistakes = () => {
    this.setState(prevState => ({ showCommonMistakes: !prevState.showCommonMistakes }));
  };

  addCommandToHistory = (command) => {
    this.setState(prevState => ({
      commandHistory: [...prevState.commandHistory, {
        command,
        timestamp: new Date().toLocaleTimeString()
      }].slice(-5) // Keep only last 5 commands
    }));
  };

  getScenarios = () => {
    return {
      college: {
        title: "College Group Project",
        location: "Barrackpore RKM College",
        description: "Secure a project directory for a computer science group project",
        requirements: [
          "Project directory: /projects/cs401_final",
          "Owner: Swadeep (project lead)",
          "Group: cs_students",
          "Swadeep: Full access (rwx)",
          "Tuhina: Can read and execute scripts, but not modify source",
          "Abhronila: No access (different project)",
          "Debangshu: Can read documentation only"
        ],
        constraints: [
          "Use appropriate umask for new files",
          "Implement with standard permissions first",
          "Use ACLs if standard permissions insufficient",
          "Set sticky bit if needed",
          "Document your solution"
        ]
      },
      hosting: {
        title: "Web Hosting Shared Directory",
        location: "Shyamnagar Web Hosting",
        description: "Secure a web directory for multiple developers",
        requirements: [
          "Web directory: /var/www/client_project",
          "Owner: Swadeep (sysadmin)",
          "Group: web_devs",
          "Swadeep: Full access (rwx)",
          "Tuhina: Can read/write web files, but not execute",
          "Abhronila: Can read files only (content reviewer)",
          "Debangshu: No access (different client)"
        ],
        constraints: [
          "Apache web server needs read access",
          "New files should inherit permissions",
          "Backup system needs read access",
          "Log directory needs write for Apache",
          "Implement least privilege"
        ]
      },
      research: {
        title: "Research Data Directory",
        location: "Naihati Research Center",
        description: "Secure sensitive research data with complex access needs",
        requirements: [
          "Data directory: /research/quantum_2024",
          "Owner: Swadeep (principal investigator)",
          "Group: quantum_team",
          "Swadeep: Full access (rwx)",
          "Tuhina: Read and execute analysis scripts",
          "Abhronila: Read/write for data collection",
          "Debangshu: Read-only for peer review"
        ],
        constraints: [
          "Some files are executable scripts",
          "Need audit trail of access",
          "External collaborators may need temporary access",
          "Data must be backed up securely",
          "Comply with research ethics"
        ]
      }
    };
  };

  getSteps = () => {
    return [
      {
        number: 1,
        title: "Analyze Requirements",
        description: "Understand who needs what access",
        tasks: [
          "List all users and their required permissions",
          "Identify groups needed",
          "Consider file vs directory permissions",
          "Plan for inheritance and new files"
        ],
        commands: [
          "cat /etc/group | grep -i student",
          "id swadeep",
          "groups tuhina"
        ]
      },
      {
        number: 2,
        title: "Set Up Directory Structure",
        description: "Create the directory with proper ownership",
        tasks: [
          "Create the project directory",
          "Set correct owner and group",
          "Apply initial permissions",
          "Consider umask for session"
        ],
        commands: [
          "sudo mkdir -p /projects/cs401_final",
          "sudo chown swadeep:cs_students /projects/cs401_final",
          "sudo chmod 750 /projects/cs401_final",
          "umask 0027"
        ]
      },
      {
        number: 3,
        title: "Implement Basic Permissions",
        description: "Use standard Unix permissions first",
        tasks: [
          "Set directory permissions",
          "Create test files",
          "Verify access works as intended",
          "Test each user's access"
        ],
        commands: [
          "ls -ld /projects/cs401_final",
          "sudo -u tuhina ls -l /projects/cs401_final",
          "getfacl /projects/cs401_final"
        ]
      },
      {
        number: 4,
        title: "Add ACLs for Fine Control",
        description: "Extend with ACLs where standard permissions insufficient",
        tasks: [
          "Add user-specific ACL entries",
          "Set default ACLs if needed",
          "Configure mask appropriately",
          "Verify effective permissions"
        ],
        commands: [
          "setfacl -m u:tuhina:r-x /projects/cs401_final",
          "setfacl -m u:debangshu:r-- /projects/cs401_final",
          "setfacl -m d:u:tuhina:r-x /projects/cs401_final",
          "getfacl /projects/cs401_final"
        ]
      },
      {
        number: 5,
        title: "Test and Verify",
        description: "Thoroughly test the implementation",
        tasks: [
          "Test each user's access",
          "Create new files to test inheritance",
          "Verify no unauthorized access",
          "Document the configuration"
        ],
        commands: [
          "sudo -u tuhina touch /projects/cs401_final/test.txt",
          "sudo -u abhronila ls /projects/cs401_final",
          "ls -ld /projects/cs401_final",
          "getfacl -R /projects/cs401_final > acl_backup.txt"
        ]
      }
    ];
  };

  generateSolution = () => {
    const { scenario, userPermissions } = this.state;
    const scenarios = this.getScenarios();
    const currentScenario = scenarios[scenario];
    
    const userEntries = Object.entries(userPermissions)
      .filter(([user, perms]) => perms.read || perms.write || perms.execute)
      .map(([user, perms]) => {
        const permString = `${perms.read ? 'r' : '-'}${perms.write ? 'w' : '-'}${perms.execute ? 'x' : '-'}`;
        return `setfacl -m u:${user}:${permString} ${currentScenario.requirements[1].split(': ')[1]}`;
      });
    
    return [
      "# Solution for: " + currentScenario.title,
      "# Location: " + currentScenario.location,
      "",
      "# 1. Create directory and set ownership",
      "sudo mkdir -p " + currentScenario.requirements[1].split(': ')[1],
      "sudo chown " + currentScenario.requirements[2].split(': ')[1].replace(')', '') + " " + currentScenario.requirements[1].split(': ')[1],
      "",
      "# 2. Set base permissions (assuming group has some access)",
      "sudo chmod 750 " + currentScenario.requirements[1].split(': ')[1],
      "",
      "# 3. Add ACLs for specific users",
      ...userEntries,
      "",
      "# 4. Set default ACLs for new files (if needed)",
      "setfacl -m d:g::r-x " + currentScenario.requirements[1].split(': ')[1],
      "",
      "# 5. Verify implementation",
      "ls -ld " + currentScenario.requirements[1].split(': ')[1],
      "getfacl " + currentScenario.requirements[1].split(': ')[1],
      "",
      "# 6. Test access",
      "# sudo -u tuhina ls -l " + currentScenario.requirements[1].split(': ')[1],
      "# sudo -u tuhina cat " + currentScenario.requirements[1].split(': ')[1] + "/README.md"
    ].join('\n');
  };

  render() {
    const { isDarkMode, showAnimation, activeStep, scenario, userPermissions, showSolution, showCommonMistakes, commandHistory } = this.state;
    const scenarios = this.getScenarios();
    const steps = this.getSteps();
    const currentStep = steps.find(s => s.number === activeStep) || steps[0];
    const currentScenario = scenarios[scenario];

    const themeClasses = clsx(
      'min-h-screen transition-colors duration-300',
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 to-amber-50 text-gray-900'
    );

    const cardClasses = clsx(
      'rounded-xl p-6 transition-all duration-300',
      isDarkMode
        ? 'bg-gray-800 border border-gray-700 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]'
        : 'bg-white border border-gray-200 hover:border-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]'
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
      @keyframes pulseStep {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `;

    return (
      <div className={themeClasses}>
        <style>{keyframesStyle}</style>
        
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header Section */}
          <header className={clsx(sectionAnimation, "mb-12 text-center")}>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Topic 6: Practical Lab - Secure Project Directory
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Hands-on exercise: Implement secure multi-user access control for a project directory.
            </p>
          </header>

          {/* Lab Introduction */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold mb-4 text-orange-700 dark:text-orange-400">
              <span className="inline-block p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-2">🧪</span>
              Lab Objective
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                In this practical lab, you will apply the concepts learned in previous topics to 
                <span className="font-semibold text-orange-600 dark:text-orange-400"> securely configure a project directory</span> 
                for multi-user access. You'll work through real scenarios, make decisions, and implement solutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">🎯 Apply Knowledge</h4>
                  <p className="text-sm">Use umask, chmod, chown, setfacl, getfacl in practice</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-green-700 dark:text-green-400">🤔 Make Decisions</h4>
                  <p className="text-sm">Choose between standard permissions vs ACLs based on requirements</p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-purple-700 dark:text-purple-400">🔧 Debug & Verify</h4>
                  <p className="text-sm">Test your implementation and fix issues that arise</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Real-World Context:</p>
                <p>
                  Swadeep at Barrackpore college needs to set up a secure project directory for his team. 
                  Tuhina at Shyamnagar hosting needs to configure client web directories. 
                  Abhronila at Naihati research needs to secure sensitive data. 
                  Each faces similar challenges with different constraints.
                </p>
              </div>
            </div>
          </section>

          {/* Scenario Selection */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">🏢</span>
              Choose Your Scenario
            </h2>
            
            <div className="space-y-6">
              <div className="mb-6">
                <label className="block mb-3 font-semibold text-lg">Select Lab Scenario:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.keys(scenarios).map((key) => (
                    <button
                      key={key}
                      onClick={() => this.handleScenarioChange(key)}
                      className={clsx(
                        "p-4 rounded-lg transition-all duration-300 text-left",
                        scenario === key
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                      )}
                    >
                      <div className="font-semibold">{scenarios[key].title}</div>
                      <div className="text-xs opacity-80 mt-1">{scenarios[key].location}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Scenario Details */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">{currentScenario.title}</h3>
                  <p className="mb-4">{currentScenario.description}</p>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Location:</span> {currentScenario.location}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-bold mb-3 text-green-700 dark:text-green-400">✅ Requirements:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentScenario.requirements.map((req, index) => (
                        <li key={index} className="text-sm">{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold mb-3 text-blue-700 dark:text-blue-400">⚙️ Constraints:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentScenario.constraints.map((constraint, index) => (
                        <li key={index} className="text-sm">{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step Navigation */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-400">
              <span className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-2">📋</span>
              Lab Steps
            </h2>
            
            <div className="space-y-6">
              {/* Step Navigation Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {steps.map((step) => (
                  <button
                    key={step.number}
                    onClick={() => this.handleStepChange(step.number)}
                    className={clsx(
                      "px-4 py-3 rounded-lg transition-all duration-300 font-semibold",
                      activeStep === step.number
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                    )}
                    style={activeStep === step.number ? { animation: 'pulseStep 2s infinite' } : {}}
                  >
                    Step {step.number}: {step.title}
                  </button>
                ))}
              </div>
              
              {/* Current Step Details */}
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold">
                      {currentStep.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{currentStep.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{currentStep.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-green-700 dark:text-green-400">Tasks to Complete:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentStep.tasks.map((task, index) => (
                        <li key={index} className="text-sm">{task}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-700 dark:text-blue-400">Example Commands:</h4>
                    <div className="space-y-2">
                      {currentStep.commands.map((cmd, index) => (
                        <div key={index} className="p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                          $ {cmd}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Interactive Permission Builder - For Step 1 */}
              {currentStep.number === 1 && (
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-bold mb-3 text-orange-700 dark:text-orange-400">Permission Planning Tool:</h4>
                  <p className="mb-4 text-sm">Set the required permissions for each user based on the scenario requirements:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(userPermissions).map(([user, perms]) => (
                      <div key={user} className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="font-semibold mb-3 capitalize">{user}</div>
                        <div className="space-y-2">
                          {['read', 'write', 'execute'].map((perm) => (
                            <label key={perm} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={perms[perm]}
                                onChange={() => this.togglePermission(user, perm)}
                                className="mr-2 h-4 w-4"
                              />
                              <span className="text-sm capitalize">{perm} ({perms[perm] ? perm[0].toUpperCase() : '-'})</span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-900 rounded text-center font-mono text-sm">
                          {perms.read ? 'r' : '-'}{perms.write ? 'w' : '-'}{perms.execute ? 'x' : '-'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                    <p className="font-semibold mb-2">Resulting ACL Commands:</p>
                    <div className="space-y-1">
                      {Object.entries(userPermissions)
                        .filter(([user, perms]) => perms.read || perms.write || perms.execute)
                        .map(([user, perms]) => {
                          const permString = `${perms.read ? 'r' : '-'}${perms.write ? 'w' : '-'}${perms.execute ? 'x' : '-'}`;
                          return (
                            <code key={user} className="block p-2 bg-gray-900 text-green-400 rounded text-sm">
                              setfacl -m u:{user}:{permString} {currentScenario.requirements[1].split(': ')[1]}
                            </code>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Command History - For Steps 2-5 */}
              {currentStep.number >= 2 && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-bold mb-3 text-blue-700 dark:text-blue-400">Command History:</h4>
                  <p className="text-sm mb-3">As you work through the lab, these are the commands you would run:</p>
                  
                  <div className="space-y-2">
                    {commandHistory.length > 0 ? (
                      commandHistory.map((item, index) => (
                        <div key={index} className="p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                          <span className="text-gray-400">[{item.timestamp}] $ </span>
                          {item.command}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-center text-gray-600 dark:text-gray-400">
                        No commands executed yet. Try clicking command examples above.
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={() => this.addCommandToHistory(currentStep.commands[0])}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-300 text-sm"
                    >
                      Simulate Running: {currentStep.commands[0].split(' ')[0]}
                    </button>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Note: In a real lab, you would run these commands on an actual Linux system.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Directory Structure Visualization */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-2">📁</span>
              Directory Structure & Permissions
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="mb-4">
                  Visualize the directory structure and how permissions apply at different levels:
                </p>
                
                {/* Directory Tree Visualization */}
                <div className="flex justify-center mb-6">
                  <svg width="500" height="300" viewBox="0 0 500 300" className="w-full max-w-lg">
                    {/* Root Directory */}
                    <rect x="200" y="20" width="100" height="60" rx="8" fill="#3B82F6" opacity="0.8" />
                    <text x="250" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      /projects
                    </text>
                    <text x="250" y="65" textAnchor="middle" fill="white" fontSize="10">
                      drwxr-xr-x
                    </text>
                    
                    {/* Project Directory */}
                    <rect x="150" y="100" width="200" height="60" rx="8" fill="#10B981" opacity="0.8">
                      <animate attributeName="fill" values="#10B981;#059669;#10B981" dur="3s" repeatCount="indefinite" />
                    </rect>
                    <text x="250" y="125" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      {currentScenario.requirements[1].split(': ')[1]}
                    </text>
                    <text x="250" y="145" textAnchor="middle" fill="white" fontSize="10">
                      drwxr-x---+ (with ACLs)
                    </text>
                    
                    {/* Files inside */}
                    <g>
                      <rect x="100" y="180" width="100" height="40" rx="5" fill="#8B5CF6" opacity="0.8" />
                      <text x="150" y="200" textAnchor="middle" fill="white" fontSize="12">source.py</text>
                      <text x="150" y="215" textAnchor="middle" fill="white" fontSize="8">-rw-r--r--</text>
                      
                      <rect x="220" y="180" width="100" height="40" rx="5" fill="#F59E0B" opacity="0.8" />
                      <text x="270" y="200" textAnchor="middle" fill="white" fontSize="12">script.sh</text>
                      <text x="270" y="215" textAnchor="middle" fill="white" fontSize="8">-rwxr-xr--</text>
                      
                      <rect x="340" y="180" width="100" height="40" rx="5" fill="#EC4899" opacity="0.8" />
                      <text x="390" y="200" textAnchor="middle" fill="white" fontSize="12">data.csv</text>
                      <text x="390" y="215" textAnchor="middle" fill="white" fontSize="8">-rw-r-----</text>
                    </g>
                    
                    {/* Arrows and connections */}
                    <path d="M250,80 L250,100" stroke="#6B7280" strokeWidth="2" fill="none" />
                    <path d="M250,160 L250,180" stroke="#6B7280" strokeWidth="2" fill="none" />
                    
                    {/* ACL indicators */}
                    <g>
                      <circle cx="350" y="120" r="8" fill="#EF4444">
                        <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <text x="370" y="125" textAnchor="start" fill="#EF4444" fontSize="10">ACLs active</text>
                      
                      <circle cx="350" y="200" r="5" fill="#8B5CF6" />
                      <text x="370" y="205" textAnchor="start" fill="#6B7280" fontSize="8">Inherited permissions</text>
                    </g>
                    
                    {/* Legend */}
                    <rect x="50" y="240" width="400" height="50" rx="5" fill="#F3F4F6" stroke="#D1D5DB" />
                    <text x="250" y="260" textAnchor="middle" fill="#4B5563" fontSize="10">
                      Green box = Your project directory | + sign = ACLs present
                    </text>
                    <text x="250" y="275" textAnchor="middle" fill="#4B5563" fontSize="10">
                      Colors represent different file types with different permissions
                    </text>
                  </svg>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">Key Points:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>The plus (+) sign in permissions indicates ACLs are present</li>
                      <li>Directory permissions control access to the directory itself</li>
                      <li>File permissions inside are independent but can inherit via default ACLs</li>
                      <li>Execute bit on directories means "can access contents"</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <h4 className="font-bold mb-2 text-green-700 dark:text-green-400">At Barrackpore College:</h4>
                    <p className="text-sm">
                      Swadeep's project directory needs different permissions for different file types: 
                      source code (readable), scripts (executable), data (restricted). 
                      He'll use a combination of standard permissions and ACLs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.5s'}}>
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
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🎯 Lab Teaching Strategy:</p>
                      <p>When running this lab at Barrackpore college, I have students work in pairs: one as Swadeep (admin), one as Tuhina (user). They switch roles. The "admin" implements permissions, the "user" tests access. This reveals real-world issues immediately.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">💡 Common Student Mistake:</p>
                      <p>Students often set directory permissions correctly but forget about files inside. They make /project drwxr-x--- but files inside remain -rw-r--r-- (world readable). Teach them about umask and default ACLs for inheritance.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🔧 Debugging Tip:</p>
                      <p>When access doesn't work as expected, follow this debug checklist: 1) Check ls -ld on directory 2) Check ls -l on file 3) Check getfacl 4) Check groups with 'id username' 5) Test with 'sudo -u username command'. At Shyamnagar hosting, we keep this checklist posted.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Solution Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.6s'}}>
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:green-900/30 rounded-lg mr-2">✅</span>
              Solution & Verification
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={this.toggleSolution}
                className="w-full p-4 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-800/50 rounded-lg transition-colors duration-300 text-green-700 dark:text-green-400 font-semibold text-lg"
              >
                {showSolution ? '▲ Hide Solution' : '▼ Show Complete Solution'}
              </button>
              
              {showSolution && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold mb-3 text-blue-700 dark:text-blue-400">Complete Implementation for {currentScenario.title}:</h4>
                    <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm">
                      {this.generateSolution()}
                    </pre>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">Verification Steps:</h4>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Run <code>ls -ld {currentScenario.requirements[1].split(': ')[1]}</code> - Should show drwxr-x---+</li>
                      <li>Run <code>getfacl {currentScenario.requirements[1].split(': ')[1]}</code> - Should list all user ACLs</li>
                      <li>Test Swadeep access: <code>sudo -u swadeep touch {currentScenario.requirements[1].split(': ')[1]}/test.txt</code> - Should succeed</li>
                      <li>Test Tuhina access: <code>sudo -u tuhina ls -l {currentScenario.requirements[1].split(': ')[1]}</code> - Should show files</li>
                      <li>Test Abhronila access: <code>sudo -u abhronila ls {currentScenario.requirements[1].split(': ')[1]}</code> - Should fail if no access</li>
                      <li>Create new file: <code>sudo -u swadeep touch {currentScenario.requirements[1].split(': ')[1]}/new.txt</code></li>
                      <li>Check new file permissions: <code>ls -l {currentScenario.requirements[1].split(': ')[1]}/new.txt</code> - Should inherit correctly</li>
                    </ol>
                  </div>
                </div>
              )}
              
              <button
                onClick={this.toggleCommonMistakes}
                className="w-full p-4 bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-800/50 rounded-lg transition-colors duration-300 text-yellow-700 dark:text-yellow-400 font-semibold"
              >
                {showCommonMistakes ? '▲ Hide' : '▼ Show'} Common Mistakes in This Lab
              </button>
              
              {showCommonMistakes && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 className="font-bold mb-3 text-red-700 dark:text-red-400">Common Lab Mistakes:</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold mb-1">1. Forgetting to set execute on directories</h5>
                      <p className="text-sm">Setting directory to drw-r--r-- means users can't cd into it or list contents, even with read permission.</p>
                      <code className="block mt-1 p-2 bg-gray-900 text-red-400 rounded text-xs">
                        # WRONG: chmod 644 /projects/cs401_final<br/>
                        # RIGHT: chmod 755 /projects/cs401_final  # or 750 with ACLs
                      </code>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-1">2. Using 777 as quick fix</h5>
                      <p className="text-sm">When Tuhina can't access, students often do chmod 777 instead of diagnosing the real issue.</p>
                      <code className="block mt-1 p-2 bg-gray-900 text-red-400 rounded text-xs">
                        # WRONG: chmod 777 /projects/cs401_final<br/>
                        # RIGHT: setfacl -m u:tuhina:r-x /projects/cs401_final
                      </code>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-1">3. Not testing all users</h5>
                      <p className="text-sm">Students test Swadeep (works), test Tuhina (works), but forget to test Abhronila (should fail).</p>
                      <code className="block mt-1 p-2 bg-gray-900 text-red-400 rounded text-xs">
                        # Complete testing:<br/>
                        $ sudo -u swadeep ls /project   # Should work<br/>
                        $ sudo -u tuhina ls /project    # Should work<br/>
                        $ sudo -u abhronila ls /project # Should fail (Permission denied)
                      </code>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-1">4. Ignoring umask for new files</h5>
                      <p className="text-sm">Permissions set correctly, but new files created have wrong permissions due to umask.</p>
                      <code className="block mt-1 p-2 bg-gray-900 text-red-400 rounded text-xs">
                        # Set appropriate umask before creating files<br/>
                        $ umask 0027<br/>
                        $ touch newfile.txt<br/>
                        $ ls -l newfile.txt  # Should be -rw-r-----
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Lab Report Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.7s'}}>
            <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-400">
              <span className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-2">📝</span>
              Lab Report & Documentation
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="mb-4">
                  A key part of system administration is <span className="font-semibold text-purple-600 dark:text-purple-400">documentation</span>. 
                  After completing the lab, document your work so others (or future you) can understand and maintain it.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold mb-3 text-blue-700 dark:text-blue-400">📋 What to Document:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>Scenario and requirements summary</li>
                      <li>Commands used with explanations</li>
                      <li>Permissions matrix (who can do what)</li>
                      <li>Testing procedure and results</li>
                      <li>Issues encountered and solutions</li>
                      <li>Lessons learned</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-bold mb-3 text-green-700 dark:text-green-400">🎯 At Shyamnagar Hosting:</h4>
                    <p className="text-sm mb-3">We maintain a README.secure in each project directory:</p>
                    <code className="block p-3 bg-gray-900 text-green-400 rounded text-xs">
                      # ACCESS CONTROL - {currentScenario.requirements[1].split(': ')[1]}<br/>
                      # Owner: swadeep<br/>
                      # Group: cs_students<br/>
                      # ACLs:<br/>
                      # - tuhina: r-x (can read/execute)<br/>
                      # - debangshu: r-- (read only)<br/>
                      # - abhronila: --- (no access)<br/>
                      # Last verified: {new Date().toLocaleDateString()}<br/>
                      # Verified by: Swadeep
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-bold mb-2 text-yellow-700 dark:text-yellow-400">💡 Professional Practice:</h4>
                <p>
                  At Ichapur hospital, Dr. Debangshu maintains an access control logbook. Every permission change is documented with: 
                  Date, Who requested, Who approved, Reason, Expiration (if temporary). 
                  This is critical for audits and compliance.
                </p>
              </div>
            </div>
          </section>

          {/* Hint Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.8s'}}>
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              <span className="inline-block p-2 bg-indigo-100 dark:indigo-900/30 rounded-lg mr-2">💡</span>
              Thinking Hints & Troubleshooting
            </h2>
            
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🤔 Debug this situation:</p>
                <p className="text-sm">
                  Swadeep at Barrackpore college sets up the directory with these commands:
                  <code className="block bg-gray-900 text-green-400 p-2 rounded font-mono text-xs mt-1">
                    $ sudo mkdir /projects/cs401_final<br/>
                    $ sudo chown swadeep:cs_students /projects/cs401_final<br/>
                    $ sudo chmod 750 /projects/cs401_final<br/>
                    $ setfacl -m u:tuhina:r-x /projects/cs401_final<br/>
                    $ setfacl -m u:debangshu:r-- /projects/cs401_final
                  </code>
                  But Tuhina reports she still can't access the directory. What could be wrong?
                </p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🔍 Analyze this output:</p>
                <code className="block bg-gray-900 text-green-400 p-2 rounded font-mono text-xs mt-1">
                  $ getfacl /projects/cs401_final<br/>
                  # file: projects/cs401_final<br/>
                  # owner: swadeep<br/>
                  # group: cs_students<br/>
                  user::rwx<br/>
                  user:tuhina:r-x          #effective:r-x<br/>
                  group::r-x<br/>
                  mask::r-x<br/>
                  other::---<br/>
                  $ ls -ld /projects/cs401_final<br/>
                  drwxr-x---+ 2 swadeep cs_students 4096 Feb 1 10:00 /projects/cs401_final
                </code>
                <p className="text-sm mt-2">Why does Tuhina have effective r-x but the directory shows group r-x? Who else can access?</p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🧪 Design a test plan:</p>
                <p className="text-sm">
                  For the Naihati research scenario, design a complete test plan to verify:
                  1) Swadeep has full access, 2) Tuhina can run scripts but not modify source, 
                  3) Abhronila can read/write data files, 4) Debangshu can read only, 
                  5) Unauthorized users get denied. What specific commands would you run?
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">🎯 Remember:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Test both positive (should work) and negative (should fail) cases</li>
                  <li>Check groups with <code>id username</code> and <code>groups username</code></li>
                  <li>Use <code>sudo -u username command</code> to test as different users</li>
                  <li>Document everything - if it's not documented, you'll forget in 3 months</li>
                  <li>Consider inheritance - test new files created in the directory</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.9s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:blue-900/30 rounded-lg mr-2">📋</span>
              Lab Commands Quick Reference
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                    <th className="p-3 text-left border">Command</th>
                    <th className="p-3 text-left border">Purpose</th>
                    <th className="p-3 text-left border">Example</th>
                    <th className="p-3 text-left border">Use in Lab</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">mkdir -p</td>
                    <td className="p-3 border">Create directory</td>
                    <td className="p-3 border font-mono text-sm">mkdir -p /projects/cs401_final</td>
                    <td className="p-3 border">Step 2: Create project directory</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">chown</td>
                    <td className="p-3 border">Change owner:group</td>
                    <td className="p-3 border font-mono text-sm">chown swadeep:cs_students /projects/...</td>
                    <td className="p-3 border">Step 2: Set ownership</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">chmod</td>
                    <td className="p-3 border">Set permissions</td>
                    <td className="p-3 border font-mono text-sm">chmod 750 /projects/...</td>
                    <td className="p-3 border">Step 3: Base permissions</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">setfacl -m</td>
                    <td className="p-3 border">Add ACL entry</td>
                    <td className="p-3 border font-mono text-sm">setfacl -m u:tuhina:r-x /projects/...</td>
                    <td className="p-3 border">Step 4: Fine-grained control</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">setfacl -m d:</td>
                    <td className="p-3 border">Default ACL</td>
                    <td className="p-3 border font-mono text-sm">setfacl -m d:u:tuhina:r-x /projects/...</td>
                    <td className="p-3 border">Step 4: Inheritance</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">getfacl</td>
                    <td className="p-3 border">View ACLs</td>
                    <td className="p-3 border font-mono text-sm">getfacl /projects/...</td>
                    <td className="p-3 border">Step 5: Verification</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">ls -ld</td>
                    <td className="p-3 border">Directory info</td>
                    <td className="p-3 border font-mono text-sm">ls -ld /projects/...</td>
                    <td className="p-3 border">All steps: Check permissions</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">sudo -u</td>
                    <td className="p-3 border">Run as user</td>
                    <td className="p-3 border font-mono text-sm">sudo -u tuhina ls /projects/...</td>
                    <td className="p-3 border">Step 5: Test access</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">umask</td>
                    <td className="p-3 border">Default permissions</td>
                    <td className="p-3 border font-mono text-sm">umask 0027</td>
                    <td className="p-3 border">Step 2: Session default</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">id</td>
                    <td className="p-3 border">User identity</td>
                    <td className="p-3 border font-mono text-sm">id tuhina</td>
                    <td className="p-3 border">Step 1: Planning</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className={clsx(sectionAnimation, "mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 text-center")}>
            <p className="text-gray-600 dark:text-gray-400">
              Topic 6: Practical Lab - Hands-on Security Implementation
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Next Topic: Common permission-related mistakes and troubleshooting
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

