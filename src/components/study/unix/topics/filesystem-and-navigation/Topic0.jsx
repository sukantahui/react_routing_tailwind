// Topic0.jsx - Linux Directory Structure
import React, { Component } from 'react';

export default class Topic0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      hoveredDir: null,
      activeExample: 'home'
    };
  }

  componentDidMount() {
    // Trigger animations after component mounts
    setTimeout(() => {
      this.setState({ isMounted: true });
    }, 100);
  }

  handleDirectoryHover = (dirName) => {
    this.setState({ hoveredDir: dirName });
  };

  handleDirectoryLeave = () => {
    this.setState({ hoveredDir: null });
  };

  handleExampleChange = (example) => {
    this.setState({ activeExample: example });
  };

  render() {
    const { isMounted, hoveredDir, activeExample } = this.state;

    // Directory data structure
    const directories = [
      { name: '/', path: '/', description: 'Root directory - The starting point of the entire filesystem hierarchy', color: 'bg-red-100 dark:bg-red-900/30', icon: '🏠' },
      { name: '/bin', path: '/bin', description: 'Essential user binaries - Commands needed in single-user mode', color: 'bg-blue-100 dark:bg-blue-900/30', icon: '⚙️' },
      { name: '/sbin', path: '/sbin', description: 'System binaries - Administrative commands (system administration)', color: 'bg-purple-100 dark:bg-purple-900/30', icon: '🔧' },
      { name: '/etc', path: '/etc', description: 'Configuration files - System-wide configuration files and scripts', color: 'bg-green-100 dark:bg-green-900/30', icon: '📄' },
      { name: '/home', path: '/home', description: 'User home directories - Personal directories for regular users', color: 'bg-yellow-100 dark:bg-yellow-900/30', icon: '👤' },
      { name: '/root', path: '/root', description: 'Root user home - Home directory for the superuser (administrator)', color: 'bg-orange-100 dark:bg-orange-900/30', icon: '👑' },
      { name: '/usr', path: '/usr', description: 'User programs - Secondary hierarchy for user applications and data', color: 'bg-indigo-100 dark:bg-indigo-900/30', icon: '📦' },
      { name: '/var', path: '/var', description: 'Variable files - Files that change during system operation (logs, spool)', color: 'bg-pink-100 dark:bg-pink-900/30', icon: '📊' },
      { name: '/tmp', path: '/tmp', description: 'Temporary files - Volatile storage for temporary files', color: 'bg-gray-100 dark:bg-gray-700/50', icon: '⏱️' },
      { name: '/lib', path: '/lib', description: 'Libraries - Essential shared libraries and kernel modules', color: 'bg-teal-100 dark:bg-teal-900/30', icon: '📚' },
      { name: '/proc', path: '/proc', description: 'Process information - Virtual filesystem providing process and system info', color: 'bg-cyan-100 dark:bg-cyan-900/30', icon: '🌀' },
      { name: '/dev', path: '/dev', description: 'Device files - Special files representing hardware devices', color: 'bg-lime-100 dark:bg-lime-900/30', icon: '💾' }
    ];

    // Real-world examples
    const examples = {
      home: {
        title: 'Student Home Directories',
        description: 'Each student at Barrackpore Institute gets their personal /home directory:',
        items: [
          '/home/swadeep - For student Swadeep\'s projects and documents',
          '/home/tuhina - Tuhina\'s programming assignments and notes',
          '/home/abhronila - Abhronila\'s research papers and lab work',
          '/home/debangshu - Debangshu\'s system configurations and scripts'
        ]
      },
      etc: {
        title: 'System Configuration',
        description: 'Important configuration files in /etc directory:',
        items: [
          '/etc/passwd - User account information',
          '/etc/group - Defines user groups',
          '/etc/hosts - Static hostname mappings',
          '/etc/fstab - Filesystem mount information',
          '/etc/ssh/sshd_config - SSH server configuration'
        ]
      },
      var: {
        title: 'System Logs & Data',
        description: 'Variable files that change during operation:',
        items: [
          '/var/log - System logs (auth.log, syslog, apache/)',
          '/var/spool - Queued items (print jobs, mail)',
          '/var/cache - Application cache data',
          '/var/lib - Persistent application data',
          '/var/tmp - Temporary files preserved between reboots'
        ]
      }
    };

    // Animation styles
    const baseAnimation = isMounted 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4';

    // Inline keyframes for animation
    const animationStyle = `
      @keyframes pulse-glow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
      
      @keyframes highlight {
        from { background-position: -100% 0; }
        to { background-position: 200% 0; }
      }
      
      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
      
      .animate-highlight {
        background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
        background-size: 200% 100%;
        animation: highlight 3s ease-in-out infinite;
      }
    `;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
        <style>{animationStyle}</style>
        
        {/* Header Section */}
        <section className={`max-w-6xl mx-auto transition-all duration-700 ${baseAnimation}`}>
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
              Linux Directory Structure: The Filesystem Hierarchy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Understanding the organized layout of Linux systems from root to leaves
            </p>
          </div>

          {/* Visual Tree Diagram */}
          <div className={`mb-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-xl ${baseAnimation}`}
               style={{animationDelay: '100ms'}}>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🌳</span> Filesystem Hierarchy Visualization
            </h2>
            
            <div className="relative flex flex-col items-center">
              {/* Root Directory */}
              <div className={`relative z-10 p-4 rounded-xl ${hoveredDir === '/' ? 'ring-4 ring-red-400 dark:ring-red-500' : 'ring-2 ring-gray-300 dark:ring-gray-600'} bg-red-100 dark:bg-red-900/30 transition-all duration-300 transform ${hoveredDir === '/' ? 'scale-105' : 'scale-100'} cursor-pointer`}
                   onMouseEnter={() => this.handleDirectoryHover('/')}
                   onMouseLeave={this.handleDirectoryLeave}>
                <div className="flex flex-col items-center">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="font-mono font-bold text-lg text-red-700 dark:text-red-300">/ (root)</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">The starting point</div>
                </div>
              </div>

              {/* Connecting lines */}
              <svg className="w-full h-24 absolute top-16 left-0 z-0" viewBox="0 0 800 100">
                <line x1="400" y1="0" x2="200" y2="100" stroke="currentColor" className="text-gray-300 dark:text-gray-600" strokeWidth="2" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="400" y1="0" x2="400" y2="100" stroke="currentColor" className="text-gray-300 dark:text-gray-600" strokeWidth="2" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </line>
                <line x1="400" y1="0" x2="600" y2="100" stroke="currentColor" className="text-gray-300 dark:text-gray-600" strokeWidth="2" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" begin="1s" />
                </line>
              </svg>

              {/* Main Directories Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-24 w-full">
                {directories.slice(1).map((dir, index) => (
                  <div key={dir.name}
                       className={`p-4 rounded-xl ${hoveredDir === dir.name ? 'ring-4 ring-opacity-50' : 'ring-1 ring-gray-200 dark:ring-gray-700'} ${dir.color} transition-all duration-300 transform ${hoveredDir === dir.name ? 'scale-105 shadow-lg' : 'scale-100'} cursor-pointer ${baseAnimation}`}
                       style={{animationDelay: `${200 + index * 50}ms`}}
                       onMouseEnter={() => this.handleDirectoryHover(dir.name)}
                       onMouseLeave={this.handleDirectoryLeave}>
                    <div className="flex items-start">
                      <div className="text-xl mr-3">{dir.icon}</div>
                      <div>
                        <div className="font-mono font-bold text-gray-800 dark:text-gray-200">{dir.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{dir.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Explanation Section */}
        <section className={`max-w-6xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '300ms'}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Conceptual Explanation */}
            <div className={`p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-xl ${baseAnimation}`} style={{animationDelay: '400ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="mr-3">🎯</span> Conceptual Foundation
              </h2>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  The Linux filesystem follows the <span className="font-semibold text-blue-600 dark:text-blue-400">Filesystem Hierarchy Standard (FHS)</span>, 
                  a specification that defines the directory structure and directory contents in Unix-like operating systems.
                </p>
                
                <p>
                  Think of it like a <span className="font-semibold">well-organized library</span> in Barrackpore Institute:
                </p>
                
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-mono font-semibold">/</span> is like the main entrance gate</li>
                  <li><span className="font-mono font-semibold">/home</span> contains personal study tables for each student</li>
                  <li><span className="font-mono font-semibold">/etc</span> is the librarian's rule book</li>
                  <li><span className="font-mono font-semibold">/var</span> holds daily visitor logs and records</li>
                </ul>
                
                <p className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  This standardization ensures consistency across different Linux distributions, making it easier for 
                  system administrators (like our teacher at Shyamnagar Tech Center) to manage systems regardless of the distribution.
                </p>
              </div>
            </div>

            {/* Right Column - Real World Examples */}
            <div className={`p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-xl ${baseAnimation}`} style={{animationDelay: '500ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="mr-3">🌍</span> Real-World Context
              </h2>
              
              {/* Example Tabs */}
              <div className="flex space-x-2 mb-6">
                {Object.keys(examples).map((key) => (
                  <button
                    key={key}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeExample === key ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                    onClick={() => this.handleExampleChange(key)}
                  >
                    {examples[key].title.split(' ')[0]}
                  </button>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {examples[activeExample].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {examples[activeExample].description}
                </p>
                <ul className="space-y-3">
                  {examples[activeExample].items.map((item, index) => (
                    <li key={index} className="flex items-start group cursor-pointer">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0 group-hover:animate-pulse"></span>
                      <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Tips & Common Mistakes */}
        <section className={`max-w-6xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tips & Tricks */}
            <div className={`p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl shadow-lg border border-green-200 dark:border-emerald-700 transition-all duration-500 hover:shadow-xl ${baseAnimation}`} style={{animationDelay: '700ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">💡</span> Professional Tips & Tricks
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Quick Navigation</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Use <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">cd -</span> to toggle between current and previous directory
                  </p>
                </div>
                
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Permission Awareness</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Regular users cannot write to <span className="font-mono">/bin</span>, <span className="font-mono">/sbin</span>, or <span className="font-mono">/etc</span> 
                    without sudo privileges
                  </p>
                </div>
                
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Temporary Files</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Files in <span className="font-mono">/tmp</span> are cleared on reboot. Use <span className="font-mono">/var/tmp</span> for temporary files that need persistence
                  </p>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className={`p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg border border-red-200 dark:border-orange-700 transition-all duration-500 hover:shadow-xl ${baseAnimation}`} style={{animationDelay: '800ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">⚠️</span> Common Beginner Mistakes
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Confusing /root with /</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <span className="font-mono">/root</span> is the home directory for root user, not the root of filesystem (<span className="font-mono">/</span>)
                  </p>
                </div>
                
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Modifying System Directories</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Beginners often try to manually edit files in <span className="font-mono">/bin</span> or <span className="font-mono">/lib</span> - use package managers instead
                  </p>
                </div>
                
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Ignoring /proc and /dev</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    These aren't regular directories! <span className="font-mono">/proc</span> shows running processes, <span className="font-mono">/dev</span> represents hardware
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <section className={`max-w-6xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '900ms'}}>
          <div className={`p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700 transition-all duration-500 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500`}>
            <div className="flex items-start">
              <div className="mr-4 text-3xl">👨‍🏫</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Teacher's Note</h2>
                
                <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Remember:</span> The Linux filesystem is like a well-organized city. 
                    Each directory has a specific purpose, much like how different areas in Naihati have specific functions 
                    (residential, commercial, industrial).
                  </p>
                  
                  <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                    When Abhronila first started, she kept her personal files in <span className="font-mono">/tmp</span> and lost them after reboot. 
                    Remember: <span className="font-mono">/home/your_username</span> is your personal, persistent space!
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Pro Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Use <span className="font-mono">tree -L 2 /</span> to visualize the directory structure
                    </p>
                  </div>
                  
                  <div className="p-3 bg-indigo-100/50 dark:bg-indigo-900/30 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-1">Debugging Mindset</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      When a command fails, check if the binary exists in <span className="font-mono">/bin</span> or <span className="font-mono">/usr/bin</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section & Mini Checklist */}
        <section className={`max-w-6xl mx-auto transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1000ms'}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hint Section */}
            <div className={`p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700 transition-all duration-500 hover:shadow-xl ${baseAnimation}`} style={{animationDelay: '1100ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">🤔</span> Hint & Thinking Exercise
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Think about...</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Why are system binaries split between <span className="font-mono">/bin</span> and <span className="font-mono">/sbin</span>?
                    What's the practical difference in daily use?
                  </p>
                </div>
                
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Observe carefully...</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Check the permissions of directories using <span className="font-mono">ls -ld /directory_name</span>. 
                    Notice who can read, write, or execute in each directory.
                  </p>
                </div>
                
                <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Try changing...</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Navigate to <span className="font-mono">/proc</span> and list its contents. 
                    Then check <span className="font-mono">/proc/cpuinfo</span>. What makes this directory special?
                  </p>
                </div>
              </div>
            </div>

            {/* Mini Checklist */}
            <div className={`p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg border border-amber-200 dark:border-yellow-700 transition-all duration-500 hover:shadow-xl ${baseAnimation}`} style={{animationDelay: '1200ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">✅</span> What to Remember
              </h2>
              
              <div className="space-y-3">
                {[
                  "Root (/) is the absolute starting point of all paths",
                  "/home is for regular users, /root is for superuser only",
                  "/etc contains configuration, not executable programs",
                  "/tmp is cleared on reboot, /var/tmp persists longer",
                  "/proc and /dev are virtual filesystems",
                  "/bin vs /usr/bin: essential vs optional binaries",
                  "/sbin requires root privileges to execute",
                  "/lib contains shared libraries for binaries"
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 group">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isMounted ? 'bg-green-500' : 'bg-gray-400'} transition-all duration-500`} style={{transitionDelay: `${1300 + index * 100}ms`}}>
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercise */}
        <section className={`max-w-6xl mx-auto mt-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1400ms'}}>
          <div className={`p-6 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800 dark:to-slate-900 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600 transition-all duration-500 hover:shadow-xl`}>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <span className="mr-3">🧪</span> Quick Practice Exercise
            </h2>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Imagine you're setting up a computer lab at Ichapur High School. Create a mental map:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-center">
                  <div className="font-mono text-sm mb-1">/home/student1</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Student's work</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded text-center">
                  <div className="font-mono text-sm mb-1">/etc/ssh</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Remote access config</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded text-center">
                  <div className="font-mono text-sm mb-1">/var/log</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Monitor usage</div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded text-center">
                  <div className="font-mono text-sm mb-1">/tmp/lab</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Temporary files</div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
                Think: Where would you store lab instructions? Student submissions? System backup scripts?
              </p>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className={`max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1500ms'}}>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Topic 1 of Linux Fundamentals Series
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Next: Understanding the role of each system directory
            </div>
          </div>
        </div>
      </div>
    );
  }
}

