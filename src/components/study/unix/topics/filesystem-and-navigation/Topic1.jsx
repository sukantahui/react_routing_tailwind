// Topic1.jsx - Understanding the Role of Each System Directory
import React, { Component } from 'react';

export default class Topic1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeCategory: 'essential',
      hoveredDirectory: null,
      showDetails: {}
    };
  }

  componentDidMount() {
    // Trigger animations after component mounts
    setTimeout(() => {
      this.setState({ isMounted: true });
    }, 100);
  }

  handleCategoryChange = (category) => {
    this.setState({ activeCategory: category });
  };

  handleDirectoryHover = (dirName) => {
    this.setState({ hoveredDirectory: dirName });
  };

  handleDirectoryLeave = () => {
    this.setState({ hoveredDirectory: null });
  };

  toggleDetails = (dirName) => {
    this.setState(prevState => ({
      showDetails: {
        ...prevState.showDetails,
        [dirName]: !prevState.showDetails[dirName]
      }
    }));
  };

  render() {
    const { isMounted, activeCategory, hoveredDirectory, showDetails } = this.state;

    // Directory categories with detailed information
    const directoryCategories = {
      essential: {
        title: 'Essential System Directories',
        description: 'Directories required for basic system operation',
        directories: [
          {
            name: '/',
            purpose: 'Root of the filesystem',
            description: 'The absolute starting point for all paths. Every other directory mounts under here.',
            realWorld: 'Like the foundation of Barrackpore Institute building - everything else is built upon it',
            criticalFiles: ['Nothing directly - contains other directories'],
            permissions: 'drwxr-xr-x (755) - root:root',
            command: 'ls -la /',
            icon: '🌳'
          },
          {
            name: '/bin',
            purpose: 'Essential user binaries',
            description: 'Contains commands needed by all users in single-user mode (when no other filesystems are mounted).',
            realWorld: 'Basic tools every student needs: ls, cp, mv, cat, echo (like pens and notebooks)',
            criticalFiles: ['bash', 'ls', 'cp', 'mv', 'rm', 'cat', 'echo'],
            permissions: 'drwxr-xr-x (755) - root:root',
            command: 'which ls',
            icon: '🛠️'
          },
          {
            name: '/sbin',
            purpose: 'System administration binaries',
            description: 'Contains binaries for system administration (usually require root privileges).',
            realWorld: 'Principal\'s office tools: fdisk, ifconfig, iptables (only administrators should use)',
            criticalFiles: ['fdisk', 'ifconfig', 'iptables', 'reboot', 'shutdown'],
            permissions: 'drwxr-xr-x (755) - root:root',
            command: 'sudo fdisk -l',
            icon: '🔐'
          }
        ]
      },
      configuration: {
        title: 'Configuration & User Directories',
        description: 'Directories for system configuration and user data',
        directories: [
          {
            name: '/etc',
            purpose: 'Configuration files',
            description: 'Contains system-wide configuration files and shell scripts for startup.',
            realWorld: 'School timetable, rules, and regulations that apply to everyone',
            criticalFiles: ['passwd', 'group', 'hosts', 'fstab', 'ssh/sshd_config'],
            permissions: 'drwxr-xr-x (755) - root:root',
            command: 'cat /etc/passwd | head -5',
            icon: '📋'
          },
          {
            name: '/home',
            purpose: 'User home directories',
            description: 'Contains personal directories for regular users (not root).',
            realWorld: 'Personal lockers for Swadeep, Tuhina, Abhronila - private space for each student',
            criticalFiles: ['.bashrc', '.ssh/', '.config/', 'Desktop/', 'Documents/'],
            permissions: 'drwxr-xr-x (755) - root:root',
            command: 'cd ~ && pwd',
            icon: '🏠'
          },
          {
            name: '/root',
            purpose: 'Root user home',
            description: 'Home directory for the superuser (administrator). Not under /home.',
            realWorld: 'Principal\'s private office - separate from student areas',
            criticalFiles: ['.bashrc', '.ssh/', '.profile'],
            permissions: 'drwx------ (700) - root:root',
            command: 'sudo ls -la /root',
            icon: '👑'
          }
        ]
      },
      storage: {
        title: 'Storage & Variable Directories',
        description: 'Directories for applications, variable data, and libraries',
        directories: [
          {
            name: '/usr',
            purpose: 'User applications and data',
            description: 'Secondary hierarchy containing the majority of user utilities and applications.',
            realWorld: 'Library and computer labs - additional resources beyond basics',
            criticalFiles: ['/usr/bin/', '/usr/lib/', '/usr/share/', '/usr/local/'],
            permissions: 'drwxr-xr-x (755) - root:root',
            command: 'ls /usr/bin | wc -l',
            icon: '📚'
          },
          {
            name: '/var',
            purpose: 'Variable files',
            description: 'Files whose content is expected to continually change during normal operation.',
            realWorld: 'Attendance register, daily notices, pending assignments',
            criticalFiles: ['log/', 'spool/', 'cache/', 'lib/', 'tmp/'],
            permissions: 'drwxr-xr-x (755) - root:root',
            command: 'tail -f /var/log/syslog',
            icon: '📊'
          },
          {
            name: '/tmp',
            purpose: 'Temporary files',
            description: 'Temporary files that may be deleted between reboots.',
            realWorld: 'Whiteboard in classroom - temporary notes that get erased',
            criticalFiles: ['(temporary files only)'],
            permissions: 'drwxrwxrwt (1777) - sticky bit set',
            command: 'mktemp -p /tmp',
            icon: '⏱️'
          }
        ]
      },
      special: {
        title: 'Special Purpose Directories',
        description: 'Virtual filesystems and system-level directories',
        directories: [
          {
            name: '/lib',
            purpose: 'Essential libraries',
            description: 'Contains libraries needed by binaries in /bin and /sbin.',
            realWorld: 'Reference books needed by teachers to use their tools',
            criticalFiles: ['ld-linux.so', 'libc.so', 'modules/'],
            permissions: 'drwxr-xr-x (755) - root:root',
            command: 'ldd /bin/ls',
            icon: '📖'
          },
          {
            name: '/proc',
            purpose: 'Process information',
            description: 'Virtual filesystem providing process and kernel information as files.',
            realWorld: 'Live CCTV feed showing current activities in the institute',
            criticalFiles: ['cpuinfo', 'meminfo', 'self/', '[pid]/'],
            permissions: 'dr-xr-xr-x (555) - root:root',
            command: 'cat /proc/cpuinfo',
            icon: '👁️'
          },
          {
            name: '/dev',
            purpose: 'Device files',
            description: 'Contains special files that represent hardware devices.',
            realWorld: 'Control panels for projectors, speakers, and other equipment',
            criticalFiles: ['null', 'zero', 'tty', 'stdin', 'sda', 'random'],
            permissions: 'drwxr-xr-x (755) - root:root',
            command: 'ls -l /dev/tty*',
            icon: '💿'
          }
        ]
      }
    };

    // Animation styles
    const baseAnimation = isMounted 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4';

    // Inline keyframes for advanced animations
    const animationStyle = `
      @keyframes slideInFromLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes highlightPulse {
        0%, 100% { 
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
        }
        70% { 
          box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
        }
      }
      
      @keyframes pathFlow {
        0% {
          stroke-dashoffset: 100;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      
      .animate-slide-in {
        animation: slideInFromLeft 0.6s ease-out;
      }
      
      .animate-highlight-pulse {
        animation: highlightPulse 2s infinite;
      }
    `;

    // Current category data
    const currentCategory = directoryCategories[activeCategory];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-900 p-4 md:p-8 transition-colors duration-300">
        <style>{animationStyle}</style>
        
        {/* Header Section */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`}>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🔍</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Understanding the Role of Each System Directory
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              Deep dive into the purpose, permissions, and practical usage of every critical Linux directory
            </p>
          </div>

          {/* Category Navigation */}
          <div className={`flex flex-wrap gap-3 mb-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-500 ${baseAnimation}`} style={{animationDelay: '200ms'}}>
            {Object.keys(directoryCategories).map((category, index) => (
              <button
                key={category}
                className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => this.handleCategoryChange(category)}
                style={{animationDelay: `${300 + index * 100}ms`}}
              >
                {directoryCategories[category].title.split(' ')[0]}
              </button>
            ))}
          </div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto">
          {/* Category Header */}
          <div className={`mb-8 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {currentCategory.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {currentCategory.description}
              </p>
            </div>
          </div>

          {/* Directory Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {currentCategory.directories.map((dir, index) => (
              <div
                key={dir.name}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 ${baseAnimation} ${hoveredDirectory === dir.name ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}
                style={{animationDelay: `${500 + index * 150}ms`}}
                onMouseEnter={() => this.handleDirectoryHover(dir.name)}
                onMouseLeave={this.handleDirectoryLeave}
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{dir.icon}</span>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white font-mono">
                        {dir.name}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      dir.name === '/' || dir.name === '/bin' || dir.name === '/sbin'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : dir.name === '/etc' || dir.name === '/lib'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {dir.purpose.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {dir.description}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Real-world analogy */}
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1 text-sm flex items-center">
                      <span className="mr-2">🎯</span> Real-world Analogy
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      {dir.realWorld}
                    </p>
                  </div>

                  {/* Critical Files */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm flex items-center">
                      <span className="mr-2">📁</span> Critical Files
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dir.criticalFiles.map((file, fileIndex) => (
                        <span 
                          key={fileIndex} 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300"
                        >
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Permissions</div>
                      <div className="font-mono text-sm text-gray-800 dark:text-gray-200">{dir.permissions}</div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Try Command</div>
                      <div className="font-mono text-sm text-blue-600 dark:text-blue-400 truncate">{dir.command}</div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <button
                    onClick={() => this.toggleDetails(dir.name)}
                    className="w-full text-center py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300 flex items-center justify-center"
                  >
                    {showDetails[dir.name] ? 'Show Less' : 'Show Professional Details'}
                    <span className="ml-2">{showDetails[dir.name] ? '↑' : '↓'}</span>
                  </button>

                  {/* Expanded Details */}
                  {showDetails[dir.name] && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slide-in">
                      <div className="space-y-3">
                        {/* Permission Analysis */}
                        <div>
                          <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-sm">Permission Analysis</h5>
                          <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                            {dir.permissions.includes('755') ? (
                              <p>Readable by all, writable only by root - typical for system directories</p>
                            ) : dir.permissions.includes('700') ? (
                              <p>Only root can access - highly sensitive directory</p>
                            ) : dir.permissions.includes('1777') ? (
                              <p>Sticky bit set - anyone can write but only owners can delete their files</p>
                            ) : dir.permissions.includes('555') ? (
                              <p>Read-only for all - cannot modify these virtual files</p>
                            ) : null}
                          </div>
                        </div>

                        {/* Professional Tip */}
                        <div>
                          <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-sm">Pro Tip</h5>
                          <div className="text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                            {dir.name === '/tmp' ? (
                              <p>Use <code className="font-mono">mktemp</code> command for secure temporary file creation</p>
                            ) : dir.name === '/var' ? (
                              <p>Monitor <code className="font-mono">/var/log</code> regularly for system troubleshooting</p>
                            ) : dir.name === '/etc' ? (
                              <p>Always backup before editing config files. Use <code className="font-mono">cp file file.backup</code></p>
                            ) : dir.name === '/proc' ? (
                              <p>Use <code className="font-mono">cat /proc/loadavg</code> to check system load</p>
                            ) : (
                              <p>Understand directory purpose before modifying contents</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Flow Visualization */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '800ms'}}>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🔄</span> System Directory Interaction Flow
            </h2>
            
            <div className="relative">
              {/* Flow Diagram */}
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  <div className="flex items-center justify-center space-x-8 mb-8">
                    {/* Start: User */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg">
                        👤
                      </div>
                      <div className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">User</div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="text-2xl text-gray-400">→</div>
                    
                    {/* Command */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                        <code className="text-white font-mono text-sm">$ ls -la</code>
                      </div>
                      <div className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Command</div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="text-2xl text-gray-400">→</div>
                    
                    {/* Bin Directory */}
                    <div className="flex flex-col items-center">
                      <div className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${hoveredDirectory === '/bin' ? 'ring-4 ring-blue-400 bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <span className="text-2xl mb-1">⚙️</span>
                        <code className="font-mono text-sm">/bin</code>
                      </div>
                      <div className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Binary Lookup</div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="text-2xl text-gray-400">→</div>
                    
                    {/* Lib Directory */}
                    <div className="flex flex-col items-center">
                      <div className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${hoveredDirectory === '/lib' ? 'ring-4 ring-purple-400 bg-purple-100 dark:bg-purple-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <span className="text-2xl mb-1">📚</span>
                        <code className="font-mono text-sm">/lib</code>
                      </div>
                      <div className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Load Libraries</div>
                    </div>
                  </div>
                  
                  <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
                    This flow shows how when Swadeep types <code className="font-mono">ls -la</code>, 
                    the system looks in <code className="font-mono">/bin</code> for the binary, 
                    then loads required libraries from <code className="font-mono">/lib</code>
                  </div>
                </div>
              </div>
              
              {/* SVG Connection Lines */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 800 200">
                <path 
                  d="M100,80 L200,80 L250,80 L350,80 L400,80 L500,80" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="10,5"
                  className="text-gray-300 dark:text-gray-600"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="100"
                    to="0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
          </div>
        </section>

        {/* Common Pitfalls & Best Practices */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Common Pitfalls */}
            <div className={`p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg border border-red-200 dark:border-red-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1000ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">🚫</span> Common Pitfalls & Misconceptions
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Confusing /home with /root</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Beginners think <code className="font-mono">/root</code> is just another home directory. 
                    Actually, it's separate from <code className="font-mono">/home</code> and has different permissions.
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Impact:</span> Security risks when misconfigured
                  </div>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Editing /bin or /sbin directly</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Manual edits to binaries can break the system. Use package managers (<code className="font-mono">apt</code>, <code className="font-mono">yum</code>) instead.
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Tuhina's experience:</span> Broke <code className="font-mono">ls</code> command by editing binary manually
                  </div>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Treating /proc files as regular files</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    These are virtual files showing live system state. Writing to them can crash the system.
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Example:</span> <code className="font-mono">echo 1 > /proc/sys/</code> requires caution
                  </div>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className={`p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg border border-green-200 dark:border-green-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1200ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">✅</span> Best Practices & Industry Standards
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Follow FHS Standards</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Always place files in their designated directories. User data in <code className="font-mono">/home</code>, 
                    configs in <code className="font-mono">/etc</code>, logs in <code className="font-mono">/var/log</code>.
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Why:</span> Maintains system predictability and scalability
                  </div>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Permission Strategy</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Use appropriate permissions: 755 for shared directories, 700 for private, 1777 for collaborative temporary spaces.
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Example:</span> Naihati Tech Lab sets <code className="font-mono">/shared</code> with 1777
                  </div>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Monitoring Strategy</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Regularly check <code className="font-mono">/var/log</code> and monitor <code className="font-mono">/proc/meminfo</code>, 
                    <code className="font-mono">/proc/loadavg</code> for system health.
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Tool:</span> Use <code className="font-mono">logrotate</code> to manage log files
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1400ms'}}>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-500">
            <div className="flex items-start">
              <div className="mr-4 text-3xl">👨‍🏫</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Teacher's Note</h2>
                
                <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Key Insight:</span> Think of Linux directories as specialized departments in a company. 
                    Each has a specific role and interacts with others in predictable ways.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    When Debangshu was learning, he memorized this mnemonic: 
                    <span className="font-mono block mt-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      "Binaries in /bin, Configs in /etc, Home in /home, Logs in /var"
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Memory Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      <code className="font-mono">/sbin</code> = System Binaries (needs Superuser)
                    </p>
                  </div>
                  
                  <div className="p-3 bg-indigo-100/50 dark:bg-indigo-900/30 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-1">Debugging Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Command not found? Check <code className="font-mono">/bin</code> and <code className="font-mono">/usr/bin</code>
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">Security Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Never run as root in <code className="font-mono">/home</code> directories
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Quiz & Practice */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1600ms'}}>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🧠</span> Interactive Learning Challenge
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Scenario Analysis</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  Abhronila at Shyamnagar Tech Center needs to:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-xs mr-2 flex-shrink-0">1</span>
                    <span className="text-sm text-gray-700 dark:text-gray-400">Store her Python scripts for personal use</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-xs mr-2 flex-shrink-0">2</span>
                    <span className="text-sm text-gray-700 dark:text-gray-400">Configure system-wide network settings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 text-xs mr-2 flex-shrink-0">3</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Check why a service failed at 2 AM</span>
                  </li>
                </ul>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">Think about...</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Which directories would she use for each task? Why those specific directories?
                  </p>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Test Your Knowledge</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Where should temporary files that survive reboot go?
                    </p>
                    <div className="space-y-2">
                      {['/tmp', '/var/tmp', '/home/tmp', '/etc/tmp'].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`opt${idx}`} name="quiz" className="mr-2" />
                          <label htmlFor={`opt${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Which directory has different structure for each process?
                    </p>
                    <div className="space-y-2">
                      {['/proc', '/dev', '/var', '/tmp'].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`opt2-${idx}`} name="quiz2" className="mr-2" />
                          <label htmlFor={`opt2-${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className={`max-w-7xl mx-auto pt-8 border-t border-gray-200 dark:border-gray-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1800ms'}}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Topic 2</span> of Linux Fundamentals Series
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                ← Previous: Directory Structure
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Next: pwd, ls, cd Mastery →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

