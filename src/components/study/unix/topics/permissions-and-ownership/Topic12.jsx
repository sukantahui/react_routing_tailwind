import React from 'react';
import clsx from 'clsx';

export default class Topic12 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      showAnimation: false,
      activeTab: 'ls',
      selectedExample: 0,
      showHint: false
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

  handleExampleSelect = (index) => {
    this.setState({ selectedExample: index });
  };

  toggleHint = () => {
    this.setState(prevState => ({ showHint: !prevState.showHint }));
  };

  getExamples = () => {
    return [
      {
        title: "Regular File with 644 permissions",
        command: "ls -l important_document.txt",
        output: "-rw-r--r-- 1 swadeep students 2048 Jan 15 10:30 important_document.txt",
        statCommand: "stat important_document.txt",
        statOutput: `  File: important_document.txt
  Size: 2048      	Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d	Inode: 123456      Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/ swadeep)   Gid: ( 1001/ students)
Access: 2024-01-15 10:30:00.000000000 +0530
Modify: 2024-01-15 10:30:00.000000000 +0530
Change: 2024-01-15 10:30:00.000000000 +0530`,
        explanation: "Swadeep's document in Barrackpore has read/write for owner, read-only for group and others."
      },
      {
        title: "Executable Script with 755 permissions",
        command: "ls -l backup_script.sh",
        output: "-rwxr-xr-x 1 tuhina admin 512 Jan 16 14:45 backup_script.sh",
        statCommand: "stat backup_script.sh",
        statOutput: `  File: backup_script.sh
  Size: 512       	Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d	Inode: 123457      Links: 1
Access: (0755/-rwxr-xr-x)  Uid: ( 1001/  tuhina)   Gid: ( 1002/   admin)
Access: 2024-01-16 14:45:00.000000000 +0530
Modify: 2024-01-16 14:45:00.000000000 +0530
Change: 2024-01-16 14:45:00.000000000 +0530`,
        explanation: "Tuhina's backup script in Shyamnagar is executable by everyone."
      },
      {
        title: "Directory with 750 permissions",
        command: "ls -ld project_files/",
        output: "drwxr-x--- 2 abhronila developers 4096 Jan 17 09:15 project_files/",
        statCommand: "stat project_files/",
        statOutput: `  File: project_files/
  Size: 4096      	Blocks: 8          IO Block: 4096   directory
Device: 801h/2049d	Inode: 123458      Links: 2
Access: (0750/drwxr-x---)  Uid: ( 1002/abhronila)   Gid: ( 1003/developers)
Access: 2024-01-17 09:15:00.000000000 +0530
Modify: 2024-01-17 09:15:00.000000000 +0530
Change: 2024-01-17 09:15:00.000000000 +0530`,
        explanation: "Abhronila's project directory allows group members to access but blocks others."
      },
      {
        title: "Secure Configuration File with 600",
        command: "ls -l database.conf",
        output: "-rw------- 1 debangshu debangshu 1024 Jan 18 11:20 database.conf",
        statCommand: "stat database.conf",
        statOutput: `  File: database.conf
  Size: 1024      	Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d	Inode: 123459      Links: 1
Access: (0600/-rw-------)  Uid: ( 1003/debangshu)   Gid: ( 1003/debangshu)
Access: 2024-01-18 11:20:00.000000000 +0530
Modify: 2024-01-18 11:20:00.000000000 +0530
Change: 2024-01-18 11:20:00.000000000 +0530`,
        explanation: "Debangshu's database configuration in Ichapur is accessible only to him."
      },
      {
        title: "Symbolic Link",
        command: "ls -l latest_report",
        output: "lrwxrwxrwx 1 swadeep students 15 Jan 19 16:30 latest_report -> report_jan_2024.pdf",
        statCommand: "stat latest_report",
        statOutput: `  File: latest_report -> report_jan_2024.pdf
  Size: 15        	Blocks: 0          IO Block: 4096   symbolic link
Device: 801h/2049d	Inode: 123460      Links: 1
Access: (0777/lrwxrwxrwx)  Uid: ( 1000/ swadeep)   Gid: ( 1001/ students)
Access: 2024-01-19 16:30:00.000000000 +0530
Modify: 2024-01-19 16:30:00.000000000 +0530
Change: 2024-01-19 16:30:00.000000000 +0530`,
        explanation: "Symbolic links always show 777 permissions but actual access depends on target file."
      }
    ];
  };

  parseLsOutput = (output) => {
    // Parse the ls -l output
    const parts = output.split(/\s+/);
    if (parts.length >= 9) {
      const permissions = parts[0];
      const links = parts[1];
      const owner = parts[2];
      const group = parts[3];
      const size = parts[4];
      const date = `${parts[5]} ${parts[6]} ${parts[7]}`;
      const name = parts.slice(8).join(' ');
      
      return { permissions, links, owner, group, size, date, name };
    }
    return null;
  };

  render() {
    const { isDarkMode, showAnimation, activeTab, selectedExample, showHint } = this.state;
    const examples = this.getExamples();
    const currentExample = examples[selectedExample];
    const parsedOutput = this.parseLsOutput(currentExample.output);

    const themeClasses = clsx(
      'min-h-screen transition-colors duration-300',
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900'
    );

    const cardClasses = clsx(
      'rounded-xl p-6 transition-all duration-300',
      isDarkMode
        ? 'bg-gray-800 border border-gray-700 hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]'
        : 'bg-white border border-gray-200 hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]'
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
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `;

    return (
      <div className={themeClasses}>
        <style>{keyframesStyle}</style>
        
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header Section */}
          <header className={clsx(sectionAnimation, "mb-12 text-center")}>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Topic 3: Checking Permissions with ls -l and stat
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Master the art of inspecting file permissions using command-line tools.
            </p>
          </header>

          {/* Introduction Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              <span className="inline-block p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-2">🔍</span>
              Why Check Permissions?
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                In Linux/Unix systems, knowing how to check permissions is crucial for:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">🔒 Security Auditing</h4>
                  <p className="text-sm">Verify sensitive files aren't world-readable (e.g., database passwords)</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-green-700 dark:text-green-400">🐛 Debugging Access</h4>
                  <p className="text-sm">Troubleshoot "Permission denied" errors when scripts or users can't access files</p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-purple-700 dark:text-purple-400">👥 Collaboration Setup</h4>
                  <p className="text-sm">Ensure team members have correct access to shared project files</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-l-4 border-yellow-500">
                <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">Real-World Scenario:</p>
                <p>When Tuhina at Shyamnagar college lab can't run a script, checking permissions with <code>ls -l</code> reveals it's not executable. When Abhronila can't access a shared directory in Barrackpore, <code>stat</code> shows incorrect group permissions.</p>
              </div>
            </div>
          </section>

          {/* Tool Comparison Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">⚖️</span>
              ls -l vs stat: Which to Use?
            </h2>
            
            <div className="mb-6">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => this.handleTabChange('ls')}
                  className={clsx(
                    "px-6 py-3 rounded-lg transition-all duration-300 font-semibold",
                    activeTab === 'ls'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  ls -l (Quick View)
                </button>
                <button
                  onClick={() => this.handleTabChange('stat')}
                  className={clsx(
                    "px-6 py-3 rounded-lg transition-all duration-300 font-semibold",
                    activeTab === 'stat'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  stat (Detailed Info)
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={clsx(
                  "p-5 rounded-lg transition-all duration-300",
                  activeTab === 'ls' 
                    ? 'border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'border border-gray-300 dark:border-gray-700'
                )}>
                  <h3 className="text-xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">ls -l (List Long Format)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-2">✓</span>
                      <span>Quick, human-readable output</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-2">✓</span>
                      <span>Shows symbolic permissions (rwx)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-2">✓</span>
                      <span>Displays owner, group, size, timestamp</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-gray-400 text-white rounded-full text-center mr-2">✗</span>
                      <span>Doesn't show numeric (octal) permissions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-gray-400 text-white rounded-full text-center mr-2">✗</span>
                      <span>Limited metadata (no inode, device info)</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm italic">
                    Best for: Quick checks, daily use, scripting with awk/cut
                  </p>
                </div>
                
                <div className={clsx(
                  "p-5 rounded-lg transition-all duration-300",
                  activeTab === 'stat' 
                    ? 'border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                    : 'border border-gray-300 dark:border-gray-700'
                )}>
                  <h3 className="text-xl font-bold mb-3 text-purple-700 dark:text-purple-400">stat (File Status)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-purple-500 text-white rounded-full text-center mr-2">✓</span>
                      <span>Shows both symbolic AND octal permissions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-purple-500 text-white rounded-full text-center mr-2">✓</span>
                      <span>Detailed metadata (inode, device, blocks)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-purple-500 text-white rounded-full text-center mr-2">✓</span>
                      <span>Three timestamps: access, modify, change</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-gray-400 text-white rounded-full text-center mr-2">✗</span>
                      <span>Verbose output, harder to parse quickly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-gray-400 text-white rounded-full text-center mr-2">✗</span>
                      <span>Not ideal for listing multiple files</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm italic">
                    Best for: Debugging, scripting, security audits, detailed analysis
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
              <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">Professional Tip:</p>
              <p>Use <code>ls -l</code> for daily work and <code>stat</code> when you need the octal representation or detailed metadata. In scripts, use <code>stat -c "%a %n" filename</code> to get just the octal permissions.</p>
            </div>
          </section>

          {/* Interactive Examples Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-2">💻</span>
              Interactive Examples
            </h2>
            
            <div className="space-y-6">
              {/* Example Selector */}
              <div className="mb-6">
                <label className="block mb-3 font-semibold text-lg">Select File/Directory Example:</label>
                <div className="flex flex-wrap gap-2">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => this.handleExampleSelect(index)}
                      className={clsx(
                        "px-4 py-2 rounded-lg transition-all duration-300",
                        selectedExample === index
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                      )}
                    >
                      {example.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Current Example Display */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{currentExample.title}</h3>
                  <p>{currentExample.explanation}</p>
                </div>
                
                {/* ls -l Output */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400">ls -l Output:</h4>
                  <div className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="mb-2">
                      <span className="text-gray-400">$ </span>
                      <span className="text-yellow-400">{currentExample.command}</span>
                    </div>
                    <div className="mt-2 whitespace-pre">{currentExample.output}</div>
                  </div>
                  
                  {/* Permission Breakdown */}
                  {parsedOutput && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h5 className="font-semibold mb-2">Permission Breakdown:</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <span className="font-mono bg-gray-800 text-white px-2 py-1 rounded text-sm">{parsedOutput.permissions}</span>
                          <p className="text-xs mt-1">Permissions</p>
                        </div>
                        <div>
                          <span className="font-mono bg-gray-800 text-white px-2 py-1 rounded text-sm">{parsedOutput.owner}</span>
                          <p className="text-xs mt-1">Owner</p>
                        </div>
                        <div>
                          <span className="font-mono bg-gray-800 text-white px-2 py-1 rounded text-sm">{parsedOutput.group}</span>
                          <p className="text-xs mt-1">Group</p>
                        </div>
                        <div>
                          <span className="font-mono bg-gray-800 text-white px-2 py-1 rounded text-sm">{parsedOutput.size} bytes</span>
                          <p className="text-xs mt-1">Size</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* stat Output */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400">stat Output:</h4>
                  <div className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="mb-2">
                      <span className="text-gray-400">$ </span>
                      <span className="text-yellow-400">{currentExample.statCommand}</span>
                    </div>
                    <div className="mt-2 whitespace-pre text-xs">{currentExample.statOutput}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Permission Decoder Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-400">
              <span className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-2">🔠</span>
              Decoding ls -l Permission String
            </h2>
            
            <div className="space-y-6">
              {/* Visual Decoder */}
              <div className="flex justify-center mb-6">
                <svg width="600" height="180" viewBox="0 0 600 180" className="w-full max-w-2xl">
                  {/* Permission String */}
                  <text x="300" y="40" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="bold">
                    - r w x r - x r - x
                  </text>
                  
                  {/* Position indicators */}
                  <g>
                    <text x="180" y="70" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">Position 0</text>
                    <rect x="130" y="75" width="100" height="25" rx="4" fill="#FECACA" stroke="#EF4444" strokeWidth="2" />
                    <text x="180" y="92" textAnchor="middle" fill="#DC2626" fontSize="11">File Type</text>
                    
                    <text x="300" y="70" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="bold">Positions 1-3</text>
                    <rect x="240" y="75" width="120" height="25" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
                    <text x="300" y="92" textAnchor="middle" fill="#1D4ED8" fontSize="11">Owner Permissions</text>
                    
                    <text x="420" y="70" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">Positions 4-6</text>
                    <rect x="370" y="75" width="100" height="25" rx="4" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
                    <text x="420" y="92" textAnchor="middle" fill="#047857" fontSize="11">Group Permissions</text>
                    
                    <text x="540" y="70" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">Positions 7-9</text>
                    <rect x="490" y="75" width="100" height="25" rx="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
                    <text x="540" y="92" textAnchor="middle" fill="#5B21B6" fontSize="11">Others Permissions</text>
                  </g>
                  
                  {/* File Type Legend */}
                  <g>
                    <rect x="50" y="120" width="200" height="50" rx="6" fill="#F3F4F6" stroke="#D1D5DB" />
                    <text x="150" y="140" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="bold">File Type Indicators</text>
                    <text x="150" y="160" textAnchor="middle" fill="#4B5563" fontSize="11">
                      - = file, d = directory, l = link, b = block, c = char
                    </text>
                  </g>
                  
                  {/* Permission Bits */}
                  <g>
                    <rect x="350" y="120" width="200" height="50" rx="6" fill="#F3F4F6" stroke="#D1D5DB" />
                    <text x="450" y="140" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="bold">Permission Bits</text>
                    <text x="450" y="160" textAnchor="middle" fill="#4B5563" fontSize="11">
                      r = read, w = write, x = execute, - = not set
                    </text>
                  </g>
                </svg>
              </div>
              
              {/* Common Patterns */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Common Permission Patterns:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <code className="font-mono bg-gray-800 text-white px-3 py-1 rounded">-rw-r--r--</code>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded text-sm">0644</span>
                    </div>
                    <p className="text-sm">Regular file, owner can read/write, others read-only</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <code className="font-mono bg-gray-800 text-white px-3 py-1 rounded">drwxr-xr-x</code>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded text-sm">0755</span>
                    </div>
                    <p className="text-sm">Directory, everyone can list, only owner can modify</p>
                  </div>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <code className="font-mono bg-gray-800 text-white px-3 py-1 rounded">-rwx------</code>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded text-sm">0700</span>
                    </div>
                    <p className="text-sm">Private executable, only owner can access</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <code className="font-mono bg-gray-800 text-white px-3 py-1 rounded">lrwxrwxrwx</code>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 rounded text-sm">0777</span>
                    </div>
                    <p className="text-sm">Symbolic link, shows 777 but uses target's permissions</p>
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
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🎯 Critical Insight:</p>
                      <p>The first character in <code>ls -l</code> output is NOT a permission bit. It's the file type indicator. Beginners often miscount and misinterpret permissions because of this.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">💡 Teaching Strategy:</p>
                      <p>When teaching Debangshu's class in Ichapur, I make them practice reading permissions aloud: "This is a regular file, owner can read and write, group can read, others can read." This reinforces understanding.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🔧 Professional Tip:</p>
                      <p>In production troubleshooting, always use <code>stat</code> to see octal permissions. Many configuration files (like sshd_config) expect octal notation, not symbolic.</p>
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
              Common Mistakes & Misunderstandings
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">1. Miscounting permission positions</h4>
                <p className="text-sm">Beginners often think "-rwxr-xr-x" has 10 permission characters. Actually, it's 1 type + 9 permissions. Position 0 is file type, positions 1-9 are permissions.</p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">2. Confusing symbolic links</h4>
                <p className="text-sm">Symbolic links always show "lrwxrwxrwx" but the actual access depends on the target file's permissions. The link itself has no meaningful permissions.</p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">3. Ignoring directory execute bit</h4>
                <p className="text-sm">A directory with "drw-r--r--" (644) seems readable but you can't <code>cd</code> into it. Missing execute (x) means you can't traverse the directory.</p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">4. Not checking group membership</h4>
                <p className="text-sm">Just because a file has group permissions doesn't mean you're in that group. Use <code>groups</code> or <code>id</code> to check your group membership.</p>
              </div>
            </div>
          </section>

          {/* Best Practices Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.7s'}}>
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:green-900/30 rounded-lg mr-2">✅</span>
              Best Practices for Permission Checking
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">1. Use ls -l for quick checks</h4>
                <p className="text-sm">For daily work and quick permission verification, <code>ls -l</code> is sufficient and faster to read.</p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">2. Use stat for scripting and octal values</h4>
                <p className="text-sm">In scripts, use <code>stat -c "%a" filename</code> to get octal permissions. For detailed analysis, use full <code>stat</code> output.</p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">3. Check directories with -d flag</h4>
                <p className="text-sm">Use <code>ls -ld directory_name</code> to see directory permissions, not the contents. <code>ls -l directory_name</code> shows contents' permissions.</p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold mb-2">4. Verify effective permissions</h4>
                <p className="text-sm">Use <code>getfacl</code> if ACLs are involved. Regular permissions might not show the whole picture with ACLs enabled.</p>
              </div>
            </div>
          </section>

          {/* Hint Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.8s'}}>
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              <span className="inline-block p-2 bg-indigo-100 dark:indigo-900/30 rounded-lg mr-2">💡</span>
              Thinking Hints & Practice Exercises
            </h2>
            
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🤔 Analyze this output:</p>
                <code className="block bg-gray-900 text-green-400 p-2 rounded font-mono text-sm mt-1">
                  -rwxr-x--- 1 swadeep project 4096 Jan 20 09:30 deploy.sh
                </code>
                <p className="text-sm mt-2">Who can execute this file? What happens if user "tuhina" (not in project group) tries to run it?</p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🔍 Spot the issue:</p>
                <code className="block bg-gray-900 text-green-400 p-2 rounded font-mono text-sm mt-1">
                  drw-r--r-- 2 abhronila students 4096 Jan 21 11:45 reports/
                </code>
                <p className="text-sm mt-2">Why can't users access files inside this directory even though it seems readable?</p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🧪 Try this command:</p>
                <code className="block bg-gray-900 text-green-400 p-2 rounded font-mono text-sm mt-1">
                  stat -c "%A %a %n" /etc/passwd
                </code>
                <p className="text-sm mt-2">What do both permission formats tell you about this critical system file?</p>
              </div>
              
              <button
                onClick={this.toggleHint}
                className="w-full p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-lg transition-colors duration-300 text-blue-700 dark:text-blue-400 font-semibold"
              >
                {showHint ? 'Hide Hints' : 'Show Thinking Hints'}
              </button>
              
              {showHint && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">💡 Hints (Don't peek unless stuck!):</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Remember: execute on directory = traverse/search permission</li>
                    <li>Check if user is in the file's group with <code>groups username</code></li>
                    <li>The first character in ls -l output indicates file type, not a permission</li>
                    <li>Symbolic links (l) show 777 but use target file's actual permissions</li>
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Quick Reference Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.9s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:blue-900/30 rounded-lg mr-2">📋</span>
              Quick Reference Commands
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                    <th className="p-3 text-left border">Command</th>
                    <th className="p-3 text-left border">Description</th>
                    <th className="p-3 text-left border">Use Case</th>
                    <th className="p-3 text-left border">Example Output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">ls -l</td>
                    <td className="p-3 border">Long listing with permissions</td>
                    <td className="p-3 border">Quick permission check</td>
                    <td className="p-3 border font-mono text-sm">-rw-r--r-- 1 user group ...</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">ls -ld dir/</td>
                    <td className="p-3 border">Directory permissions only</td>
                    <td className="p-3 border">Check directory itself</td>
                    <td className="p-3 border font-mono text-sm">drwxr-xr-x 2 user group ...</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">stat file</td>
                    <td className="p-3 border">Detailed file status</td>
                    <td className="p-3 border">Debugging, scripting</td>
                    <td className="p-3 border font-mono text-sm">Access: (0644/-rw-r--r--)</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">stat -c "%a" file</td>
                    <td className="p-3 border">Octal permissions only</td>
                    <td className="p-3 border">Scripts, automation</td>
                    <td className="p-3 border font-mono text-sm">644</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">stat -c "%A" file</td>
                    <td className="p-3 border">Symbolic permissions only</td>
                    <td className="p-3 border">Human-readable output</td>
                    <td className="p-3 border font-mono text-sm">-rw-r--r--</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">ls -la</td>
                    <td className="p-3 border">All files including hidden</td>
                    <td className="p-3 border">Check hidden files</td>
                    <td className="p-3 border font-mono text-sm">-rw------- 1 user group .bashrc</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">id</td>
                    <td className="p-3 border">Your user/group IDs</td>
                    <td className="p-3 border">Check your permissions</td>
                    <td className="p-3 border font-mono text-sm">uid=1000(user) gid=1000(group)</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">groups</td>
                    <td className="p-3 border">Your group memberships</td>
                    <td className="p-3 border">Check group access</td>
                    <td className="p-3 border font-mono text-sm">user adm cdrom sudo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className={clsx(sectionAnimation, "mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 text-center")}>
            <p className="text-gray-600 dark:text-gray-400">
              Topic 3: Mastering Permission Inspection with ls -l and stat
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Next Topic: Access Control Lists (ACL) – concept and overview
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

