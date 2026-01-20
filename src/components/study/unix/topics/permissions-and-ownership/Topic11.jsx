import React from 'react';
import clsx from 'clsx';

export default class Topic11 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      showAnimation: false,
      selectedExample: 'basic',
      permissionType: 'file'
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

  handleExampleChange = (example) => {
    this.setState({ selectedExample: example });
  };

  handlePermissionTypeChange = (type) => {
    this.setState({ permissionType: type });
  };

  getPermissionExamples = () => {
    const examples = {
      basic: {
        title: "Basic Creation (umask 0022)",
        description: "Standard Linux system with default umask",
        umask: '0022',
        fileProcess: [
          { step: "Default file permission", value: "0666 (rw-rw-rw-)", color: "blue" },
          { step: "Umask applied", value: "0022 (----w--w-)", color: "red" },
          { step: "Final permission", value: "0644 (rw-r--r--)", color: "green" }
        ],
        dirProcess: [
          { step: "Default directory permission", value: "0777 (rwxrwxrwx)", color: "blue" },
          { step: "Umask applied", value: "0022 (----w--w-)", color: "red" },
          { step: "Final permission", value: "0755 (rwxr-xr-x)", color: "green" }
        ],
        realWorld: "When Debangshu creates a file in Ichapur, the system protects it by default."
      },
      shared: {
        title: "Shared Team Directory (umask 0002)",
        description: "College lab environment for group collaboration",
        umask: '0002',
        fileProcess: [
          { step: "Default file permission", value: "0666 (rw-rw-rw-)", color: "blue" },
          { step: "Umask applied", value: "0002 (-------w-)", color: "red" },
          { step: "Final permission", value: "0664 (rw-rw-r--)", color: "green" }
        ],
        dirProcess: [
          { step: "Default directory permission", value: "0777 (rwxrwxrwx)", color: "blue" },
          { step: "Umask applied", value: "0002 (-------w-)", color: "red" },
          { step: "Final permission", value: "0775 (rwxrwxr-x)", color: "green" }
        ],
        realWorld: "Abhronila and Tuhina can both edit files in their shared project directory."
      },
      secure: {
        title: "Secure Server (umask 0077)",
        description: "Production server with maximum security",
        umask: '0077',
        fileProcess: [
          { step: "Default file permission", value: "0666 (rw-rw-rw-)", color: "blue" },
          { step: "Umask applied", value: "0077 (----rwxrwx)", color: "red" },
          { step: "Final permission", value: "0600 (rw-------)", color: "green" }
        ],
        dirProcess: [
          { step: "Default directory permission", value: "0777 (rwxrwxrwx)", color: "blue" },
          { step: "Umask applied", value: "0077 (----rwxrwx)", color: "red" },
          { step: "Final permission", value: "0700 (rwx------)", color: "green" }
        ],
        realWorld: "Swadeep's confidential database files in Barrackpore server are accessible only to him."
      },
      permissive: {
        title: "Test Environment (umask 0000)",
        description: "Development/testing where everyone needs access",
        umask: '0000',
        fileProcess: [
          { step: "Default file permission", value: "0666 (rw-rw-rw-)", color: "blue" },
          { step: "Umask applied", value: "0000 (no bits masked)", color: "red" },
          { step: "Final permission", value: "0666 (rw-rw-rw-)", color: "green" }
        ],
        dirProcess: [
          { step: "Default directory permission", value: "0777 (rwxrwxrwx)", color: "blue" },
          { step: "Umask applied", value: "0000 (no bits masked)", color: "red" },
          { step: "Final permission", value: "0777 (rwxrwxrwx)", color: "green" }
        ],
        realWorld: "Entire team at Naihati testing lab can run and modify all test scripts."
      }
    };

    return examples[this.state.selectedExample];
  };

  renderPermissionVisualization = () => {
    const example = this.getPermissionExamples();
    const process = this.state.permissionType === 'file' ? example.fileProcess : example.dirProcess;
    const defaultType = this.state.permissionType === 'file' ? 'File' : 'Directory';
    
    return (
      <div className="space-y-6">
        {/* Process Steps */}
        <div className="space-y-4">
          {process.map((step, index) => (
            <div 
              key={index}
              className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                step.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' :
                step.color === 'red' ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500' :
                'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
              )}
              style={{ 
                animationDelay: `${0.3 + index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block w-6 h-6 rounded-full bg-gray-700 text-white text-center text-sm mr-3">
                    {index + 1}
                  </span>
                  <span className="font-semibold">{step.step}:</span>
                </div>
                <code className="font-mono bg-gray-800 text-white px-3 py-1 rounded">
                  {step.value}
                </code>
              </div>
              
              {/* Visual representation */}
              {step.color === 'blue' && (
                <div className="mt-3 flex items-center justify-center">
                  <svg width="400" height="60" viewBox="0 0 400 60">
                    <rect x="0" y="10" width="400" height="40" rx="8" fill="#3B82F6" opacity="0.8" />
                    <text x="200" y="38" textAnchor="middle" fill="white" fontWeight="bold">
                      {defaultType} Default Permission
                    </text>
                    <animate 
                      attributeName="opacity" 
                      values="0.8;1;0.8" 
                      dur="2s" 
                      repeatCount="indefinite" 
                    />
                  </svg>
                </div>
              )}
              
              {step.color === 'red' && (
                <div className="mt-3 flex items-center justify-center">
                  <svg width="400" height="60" viewBox="0 0 400 60">
                    <rect x="0" y="10" width="400" height="40" rx="8" fill="#EF4444" opacity="0.8" />
                    <text x="200" y="38" textAnchor="middle" fill="white" fontWeight="bold">
                      Umask Filter Applied
                    </text>
                    <animate 
                      attributeName="x" 
                      values="0;5;0" 
                      dur="1.5s" 
                      repeatCount="indefinite" 
                    />
                  </svg>
                </div>
              )}
              
              {step.color === 'green' && (
                <div className="mt-3 flex items-center justify-center">
                  <svg width="400" height="60" viewBox="0 0 400 60">
                    <rect x="0" y="10" width="400" height="40" rx="8" fill="#10B981" opacity="0.8" />
                    <text x="200" y="38" textAnchor="middle" fill="white" fontWeight="bold">
                      Final {defaultType} Permission
                    </text>
                    <animate 
                      attributeName="width" 
                      values="400;410;400" 
                      dur="2s" 
                      repeatCount="indefinite" 
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Real-world scenario */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-l-4 border-purple-500">
          <p className="font-semibold text-purple-700 dark:text-purple-400 mb-1">🌍 Real-World Scenario:</p>
          <p>{example.realWorld}</p>
        </div>
      </div>
    );
  };

  render() {
    const { isDarkMode, showAnimation, selectedExample, permissionType } = this.state;
    const example = this.getPermissionExamples();

    const themeClasses = clsx(
      'min-h-screen transition-colors duration-300',
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-green-50 to-blue-50 text-gray-900'
    );

    const cardClasses = clsx(
      'rounded-xl p-6 transition-all duration-300',
      isDarkMode
        ? 'bg-gray-800 border border-gray-700 hover:border-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]'
        : 'bg-white border border-gray-200 hover:border-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]'
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
      @keyframes permissionFlow {
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
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Topic 2: Files vs Directories Permission Logic
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Understanding why files and directories get different default permissions in Unix/Linux systems.
            </p>
          </header>

          {/* Fundamental Difference Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-2">🔑</span>
              The Core Difference
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
                  Why Different Defaults?
                </h3>
                <p className="mb-3">
                  Unix/Linux systems use different base permissions for files and directories because they serve fundamentally different purposes:
                </p>
                
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">📁 Directories</h4>
                    <p className="mb-2"><strong>Default:</strong> 0777 (rwxrwxrwx)</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Need execute (x) to access contents</li>
                      <li>Need write (w) to create/delete files</li>
                      <li>Need read (r) to list contents</li>
                      <li>Maximum flexibility by default</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">📄 Files</h4>
                    <p className="mb-2"><strong>Default:</strong> 0666 (rw-rw-rw-)</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>No execute by default (safety first)</li>
                      <li>Read/write for all (flexible)</li>
                      <li>Execute added manually (chmod +x)</li>
                      <li>Security by default</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visualization */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
                  Visual Comparison
                </h3>
                <div className="flex justify-center">
                  <svg width="500" height="200" viewBox="0 0 500 200" className="w-full max-w-lg">
                    {/* Directory Flow */}
                    <g>
                      <rect x="50" y="30" width="120" height="50" rx="8" fill="#3B82F6" />
                      <text x="110" y="60" textAnchor="middle" fill="white" fontWeight="bold">0777</text>
                      <text x="110" y="85" textAnchor="middle" fill="white" fontSize="12">Directory Default</text>
                      
                      <text x="195" y="55" textAnchor="middle" fill="gray" fontSize="20">-</text>
                      
                      <rect x="220" y="30" width="120" height="50" rx="8" fill="#EF4444" />
                      <text x="280" y="55" textAnchor="middle" fill="white" fontWeight="bold">umask</text>
                      
                      <text x="365" y="55" textAnchor="middle" fill="gray" fontSize="20">=</text>
                      
                      <rect x="390" y="30" width="120" height="50" rx="8" fill="#10B981">
                        <animate attributeName="fill" values="#10B981;#059669;#10B981" dur="2s" repeatCount="indefinite" />
                      </rect>
                      <text x="450" y="60" textAnchor="middle" fill="white" fontWeight="bold">0755</text>
                      <text x="450" y="85" textAnchor="middle" fill="white" fontSize="12">Directory Final</text>
                    </g>
                    
                    {/* File Flow */}
                    <g>
                      <rect x="50" y="120" width="120" height="50" rx="8" fill="#8B5CF6" />
                      <text x="110" y="150" textAnchor="middle" fill="white" fontWeight="bold">0666</text>
                      <text x="110" y="175" textAnchor="middle" fill="white" fontSize="12">File Default</text>
                      
                      <text x="195" y="145" textAnchor="middle" fill="gray" fontSize="20">-</text>
                      
                      <rect x="220" y="120" width="120" height="50" rx="8" fill="#EF4444" />
                      <text x="280" y="145" textAnchor="middle" fill="white" fontWeight="bold">umask</text>
                      
                      <text x="365" y="145" textAnchor="middle" fill="gray" fontSize="20">=</text>
                      
                      <rect x="390" y="120" width="120" height="50" rx="8" fill="#F59E0B">
                        <animate attributeName="fill" values="#F59E0B;#D97706;#F59E0B" dur="2s" repeatCount="indefinite" />
                      </rect>
                      <text x="450" y="150" textAnchor="middle" fill="white" fontWeight="bold">0644</text>
                      <text x="450" y="175" textAnchor="middle" fill="white" fontSize="12">File Final</text>
                    </g>
                    
                    {/* Connecting line */}
                    <line x1="280" y1="80" x2="280" y2="120" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="100;0" dur="3s" repeatCount="indefinite" />
                    </line>
                    <text x="280" y="105" textAnchor="middle" fill="#6B7280" fontSize="12">Same umask</text>
                  </svg>
                </div>
                
                <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
                  Same umask (0022) applied differently due to different defaults
                </p>
              </div>
            </div>
          </section>

          {/* Example Selector Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">
              <span className="inline-block p-2 bg-red-100 dark:red-900/30 rounded-lg mr-2">🎯</span>
              Interactive Examples
            </h2>
            
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Select Scenario:</label>
                <div className="grid grid-cols-2 gap-2">
                  {['basic', 'shared', 'secure', 'permissive'].map((type) => (
                    <button
                      key={type}
                      onClick={() => this.handleExampleChange(type)}
                      className={clsx(
                        "p-3 rounded-lg transition-all duration-300",
                        selectedExample === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      )}
                    >
                      {type === 'basic' && 'Basic'}
                      {type === 'shared' && 'Shared'}
                      {type === 'secure' && 'Secure'}
                      {type === 'permissive' && 'Permissive'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-semibold">View Permissions for:</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => this.handlePermissionTypeChange('file')}
                    className={clsx(
                      "px-4 py-2 rounded-lg transition-all duration-300 flex items-center",
                      permissionType === 'file'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    )}
                  >
                    <span className="mr-2">📄</span> Files
                  </button>
                  <button
                    onClick={() => this.handlePermissionTypeChange('dir')}
                    className={clsx(
                      "px-4 py-2 rounded-lg transition-all duration-300 flex items-center",
                      permissionType === 'dir'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    )}
                  >
                    <span className="mr-2">📁</span> Directories
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h4 className="font-bold mb-2">{example.title}</h4>
                <p className="text-sm mb-3">{example.description}</p>
                <div className="p-3 bg-gray-200 dark:bg-gray-900 rounded">
                  <code className="font-mono">umask: {example.umask}</code>
                </div>
              </div>
            </div>
          </section>

          {/* Permission Process Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">
              <span className="inline-block p-2 bg-purple-100 dark:purple-900/30 rounded-lg mr-2">⚙️</span>
              Permission Creation Process
            </h2>
            {this.renderPermissionVisualization()}
          </section>

          {/* Real-World Scenarios Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">🌍</span>
              Real-World Scenarios
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-bold text-lg mb-2 text-green-700 dark:text-green-400">
                  School Computer Lab (Shyamnagar)
                </h4>
                <p className="mb-3">
                  Students like Abhronila create project directories. With umask 0022:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Directory: 0755 - Others can view but not modify</li>
                  <li>Script file: 0644 - Others can read but not execute</li>
                  <li>Executable: Need explicit <code>chmod +x</code></li>
                </ul>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Protects student work while allowing sharing
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-lg mb-2 text-purple-700 dark:text-purple-400">
                  Web Server (Barrackpore Hosting)
                </h4>
                <p className="mb-3">
                  Swadeep deploys a PHP website with umask 0027:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Uploads directory: 0750 - Group can access, public cannot</li>
                  <li>Config files: 0640 - Sensitive data protected</li>
                  <li>Log files: 0644 - Apache can write logs</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Security-first approach for production
                </p>
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
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🎯 Critical Understanding:</p>
                      <p>The execute bit (x) has different meanings for files and directories. For files, it means "can run as program." For directories, it means "can enter/search." This is why directories need x by default.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">💡 Classroom Tip:</p>
                      <p>When teaching Debangshu's class in Ichapur, I use this analogy: "A directory is like a building lobby (need x to enter), a file is like a document inside (no x needed to read)."</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🔧 Professional Insight:</p>
                      <p>In web hosting (like Barrackpore servers), we often set umask 0027 for security, but configure the web server to run in a group that has access. This balances security and functionality.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Pitfalls Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.6s'}}>
            <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">
              <span className="inline-block p-2 bg-red-100 dark:red-900/30 rounded-lg mr-2">🚫</span>
              Common Mistakes
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">1. Assuming files get execute bit</h4>
                <p className="text-sm">Beginners often wonder why their scripts aren't executable. Files NEVER get execute bit by default, regardless of umask. You must use <code>chmod +x</code>.</p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">2. Forgetting directory execute</h4>
                <p className="text-sm">When umask removes execute from directories (e.g., umask 0111), users cannot cd into them or list contents, even with read permission.</p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">3. Copy-pasting permissions</h4>
                <p className="text-sm">Copying files between systems with different umask settings leads to unexpected permission changes.</p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">4. Web server permission errors</h4>
                <p className="text-sm">Apache/Nginx failures often due to incorrect directory permissions. Need both read AND execute on directories.</p>
              </div>
            </div>
          </section>

          {/* Best Practices Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.7s'}}>
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:green-900/30 rounded-lg mr-2">✅</span>
              Best Practices
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">1. Understand the defaults</h4>
                <p className="text-sm">Always remember: files start at 666, directories at 777. This knowledge helps debug permission issues.</p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">2. Test with both file types</h4>
                <p className="text-sm">When setting umask, create both a file and directory to verify permissions work as expected for both.</p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">3. Use appropriate umask per environment</h4>
                <p className="text-sm">
                  • Development: 0002 (collaborative)<br/>
                  • Production: 0022 or 0027 (secure)<br/>
                  • Web root: 0022 (readable by web server)
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">4. Check before deploying</h4>
                <p className="text-sm">Always verify permissions on critical directories and files before deploying to production.</p>
              </div>
            </div>
          </section>

          {/* Hint Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.8s'}}>
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              <span className="inline-block p-2 bg-indigo-100 dark:indigo-900/30 rounded-lg mr-2">💡</span>
              Thinking Hints
            </h2>
            
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🤔 Think about...</p>
                <p>Why can't you list files in a directory with permissions 0644 (rw-r--r--)? What's missing?</p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🔍 Observe carefully...</p>
                <p>Create a file with touch and a directory with mkdir using same umask. Compare their permissions. What's different?</p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🧪 Experiment with...</p>
                <p>Set umask to 0111. Create files and directories. Notice which permission bits are affected and why.</p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🤯 Consider this...</p>
                <p>If files default to 666 (no execute), how do executable programs get created? Who adds the execute bit?</p>
              </div>
            </div>
          </section>

          {/* Technical Deep Dive Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.9s'}}>
            <h2 className="text-2xl font-bold mb-4 text-teal-700 dark:text-teal-400">
              <span className="inline-block p-2 bg-teal-100 dark:teal-900/30 rounded-lg mr-2">🔬</span>
              Technical Details
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <h4 className="font-bold mb-2">Kernel-Level Implementation</h4>
                <p className="text-sm mb-2">When a process creates a file/directory, the kernel:</p>
                <ol className="list-decimal pl-5 text-sm space-y-1">
                  <li>Gets default mode (0666 or 0777)</li>
                  <li>Applies process umask (bitwise AND with complement)</li>
                  <li>Applies any filesystem-specific mode flags</li>
                  <li>Sets final permissions on inode</li>
                </ol>
              </div>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h4 className="font-bold mb-2">Binary Calculation Example</h4>
                <p className="text-sm">File with umask 0022:</p>
                <code className="block text-xs bg-gray-900 text-green-400 p-2 rounded mt-1">
                  0666 = 110 110 110 (binary)<br/>
                  ~0022 = ~000 010 010 = 111 101 101 (complement)<br/>
                  AND = 110 100 100 = 644 (octal)
                </code>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-bold mb-2">System Call Details</h4>
                <p className="text-sm">
                  The <code>open()</code> and <code>mkdir()</code> system calls accept a mode parameter that gets masked with umask.
                </p>
                <code className="block text-xs bg-gray-900 text-green-400 p-2 rounded mt-1">
                  int open(const char *pathname, int flags, mode_t mode);<br/>
                  // mode is ANDed with ~umask
                </code>
              </div>
            </div>
          </section>

          {/* Quick Reference Table */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '1.0s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:blue-900/30 rounded-lg mr-2">📊</span>
              Quick Reference: Common Scenarios
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                    <th className="p-3 text-left border">Scenario</th>
                    <th className="p-3 text-left border">Typical umask</th>
                    <th className="p-3 text-left border">Directory Permission</th>
                    <th className="p-3 text-left border">File Permission</th>
                    <th className="p-3 text-left border">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Personal Desktop</td>
                    <td className="p-3 border font-mono">0022</td>
                    <td className="p-3 border font-mono">0755 (rwxr-xr-x)</td>
                    <td className="p-3 border font-mono">0644 (rw-r--r--)</td>
                    <td className="p-3 border">Single user, moderate security</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">College Lab</td>
                    <td className="p-3 border font-mono">0002</td>
                    <td className="p-3 border font-mono">0775 (rwxrwxr-x)</td>
                    <td className="p-3 border font-mono">0664 (rw-rw-r--)</td>
                    <td className="p-3 border">Group collaboration</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Web Server</td>
                    <td className="p-3 border font-mono">0027</td>
                    <td className="p-3 border font-mono">0750 (rwxr-x---)</td>
                    <td className="p-3 border font-mono">0640 (rw-r-----)</td>
                    <td className="p-3 border">Production security</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Secure System</td>
                    <td className="p-3 border font-mono">0077</td>
                    <td className="p-3 border font-mono">0700 (rwx------)</td>
                    <td className="p-3 border font-mono">0600 (rw-------)</td>
                    <td className="p-3 border">Confidential data</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Public Share</td>
                    <td className="p-3 border font-mono">0000</td>
                    <td className="p-3 border font-mono">0777 (rwxrwxrwx)</td>
                    <td className="p-3 border font-mono">0666 (rw-rw-rw-)</td>
                    <td className="p-3 border">Public repositories</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className={clsx(sectionAnimation, "mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 text-center")}>
            <p className="text-gray-600 dark:text-gray-400">
              Topic 2: Files vs Directories - Understanding Permission Creation Logic
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Next Topic: Checking effective permissions using ls -l and stat
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

