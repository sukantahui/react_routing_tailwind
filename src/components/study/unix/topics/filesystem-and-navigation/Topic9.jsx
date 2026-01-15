// Topic9.jsx - Symbolic Links vs Hard Links
import React, { Component } from 'react';

export default class Topic9 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeTab: 'concept',
      selectedExample: 0,
      showHint: false,
      animationsLoaded: false
    };
  }

  componentDidMount() {
    // Trigger initial animations
    this.setState({ isMounted: true });
    setTimeout(() => {
      this.setState({ animationsLoaded: true });
    }, 100);
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

  renderConceptSection() {
    const { isMounted, animationsLoaded } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Introduction */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Understanding File Links in Linux</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Links are references to files—like shortcuts in Windows but with important technical differences. 
              They allow multiple access points to the same data, which is essential for system administration, 
              version management, and efficient storage.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                  <span className="mr-2">📌</span> Real-world Analogy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Think of Swadeep's project files at Barrackpore Institute. A symbolic link is like a shortcut 
                  on his desktop pointing to the actual project folder. A hard link is like having the same 
                  research paper in both "Physics" and "Science" folders—it's the same physical document.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                  <span className="mr-2">🎯</span> Why Learn This?
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Efficient disk space management</li>
                  <li>• Better file organization</li>
                  <li>• Essential for system administration</li>
                  <li>• Critical for version control systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Concept Visualization */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">How Links Work in Filesystem</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Symbolic Link Visualization */}
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 flex items-center">
                  <span className="mr-2">🔗</span> Symbolic (Soft) Link
                </h4>
                
                <div className="relative p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  {/* SVG Visualization */}
                  <div className="mb-6">
                    <svg width="100%" height="200" className="overflow-visible">
                      {/* Original File */}
                      <rect x="20" y="70" width="80" height="60" rx="8" 
                            className="fill-blue-100 dark:fill-blue-900/30 stroke-blue-300 dark:stroke-blue-700 stroke-2 transition-all duration-300 hover:stroke-blue-400 dark:hover:stroke-blue-500" />
                      <text x="60" y="105" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-mono text-sm">data.txt</text>
                      <text x="60" y="125" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-xs">Inode: 1234</text>
                      
                      {/* Arrow */}
                      <path d="M120,100 L180,100" className="stroke-gray-400 dark:stroke-gray-600 stroke-2" 
                            strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                      </path>
                      <polygon points="180,100 175,95 175,105" className="fill-gray-400 dark:fill-gray-600" />
                      
                      {/* Symbolic Link */}
                      <rect x="200" y="70" width="80" height="60" rx="8" 
                            className="fill-purple-100 dark:fill-purple-900/30 stroke-purple-300 dark:stroke-purple-700 stroke-2 transition-all duration-300 hover:stroke-purple-400 dark:hover:stroke-purple-500" />
                      <text x="240" y="105" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-mono text-sm">link.txt</text>
                      <text x="240" y="125" textAnchor="middle" className="fill-purple-600 dark:fill-purple-400 text-xs">Inode: 5678</text>
                      
                      {/* Pointer */}
                      <path d="M240,130 Q240,150 200,150" className="stroke-purple-400 dark:stroke-purple-500 stroke-2" 
                            fill="none" strokeDasharray="4,4">
                        <animate attributeName="stroke-dashoffset" from="50" to="0" dur="1.5s" repeatCount="indefinite" />
                      </path>
                      
                      {/* Labels */}
                      <text x="60" y="40" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-sm font-semibold">Original File</text>
                      <text x="240" y="40" textAnchor="middle" className="fill-purple-600 dark:fill-purple-400 text-sm font-semibold">Symbolic Link</text>
                      <text x="150" y="120" textAnchor="middle" className="fill-gray-500 dark:fill-gray-500 text-xs">Pointer</text>
                    </svg>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">→</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Separate inode storing target path</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">→</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Can cross filesystem boundaries</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-500 mr-2 mt-1">→</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Breaks if original is deleted</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hard Link Visualization */}
              <div className="space-y-4">
                <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center">
                  <span className="mr-2">#️⃣</span> Hard Link
                </h4>
                
                <div className="relative p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  {/* SVG Visualization */}
                  <div className="mb-6">
                    <svg width="100%" height="200" className="overflow-visible">
                      {/* Shared Inode */}
                      <circle cx="150" cy="100" r="40" 
                              className="fill-green-100 dark:fill-green-900/30 stroke-green-300 dark:stroke-green-700 stroke-2 transition-all duration-300 hover:stroke-green-400 dark:hover:stroke-green-500" />
                      <text x="150" y="95" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 font-bold">Inode</text>
                      <text x="150" y="115" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-sm">1234</text>
                      
                      {/* Links */}
                      <g className="group hover:opacity-100 transition-opacity duration-300">
                        <path d="M110,100 L70,100" className="stroke-blue-400 dark:stroke-blue-500 stroke-2" 
                              strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1s" repeatCount="indefinite" />
                        </path>
                        <rect x="30" y="70" width="40" height="60" rx="6" 
                              className="fill-blue-100 dark:fill-blue-900/30 stroke-blue-300 dark:stroke-blue-700 stroke-2 transition-all duration-300 group-hover:stroke-blue-400 dark:group-hover:stroke-blue-500" />
                        <text x="50" y="100" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 text-xs">file1.txt</text>
                      </g>
                      
                      <g className="group hover:opacity-100 transition-opacity duration-300">
                        <path d="M190,100 L230,100" className="stroke-blue-400 dark:stroke-blue-500 stroke-2" 
                              strokeDasharray="5,5">
                          <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1s" repeatCount="indefinite" begin="0.5s" />
                        </path>
                        <rect x="230" y="70" width="40" height="60" rx="6" 
                              className="fill-blue-100 dark:fill-blue-900/30 stroke-blue-300 dark:stroke-blue-700 stroke-2 transition-all duration-300 group-hover:stroke-blue-400 dark:group-hover:stroke-blue-500" />
                        <text x="250" y="100" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 text-xs">file2.txt</text>
                      </g>
                      
                      {/* Labels */}
                      <text x="150" y="40" textAnchor="middle" className="fill-green-600 dark:fill-green-400 text-sm font-semibold">Shared Inode</text>
                      <text x="50" y="150" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-xs">Directory Entry 1</text>
                      <text x="250" y="150" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-xs">Directory Entry 2</text>
                    </svg>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">→</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Same inode, multiple directory entries</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">→</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Must be on same filesystem</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">→</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">File persists until last link removed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differences Table */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-400 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-500">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Detailed Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Feature</th>
                    <th className="text-left py-4 px-4 font-semibold text-purple-600 dark:text-purple-400">Symbolic Link</th>
                    <th className="text-left py-4 px-4 font-semibold text-green-600 dark:text-green-400">Hard Link</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: 'Command',
                      symbolic: 'ln -s source link',
                      hard: 'ln source link',
                      tip: 'The -s flag means "symbolic"'
                    },
                    {
                      feature: 'Inode Reference',
                      symbolic: 'Different inode',
                      hard: 'Same inode',
                      tip: 'Check with: ls -i filename'
                    },
                    {
                      feature: 'Cross Filesystem',
                      symbolic: '✓ Yes',
                      hard: '✗ No',
                      tip: 'Hard links only work within same partition'
                    },
                    {
                      feature: 'Directory Linking',
                      symbolic: '✓ Yes',
                      hard: '✗ No',
                      tip: 'Hard links cannot point to directories (except . and ..)'
                    },
                    {
                      feature: 'Original Deleted',
                      symbolic: 'Link breaks (dangling)',
                      hard: 'Link still works',
                      tip: 'File data only deleted when link count reaches 0'
                    },
                    {
                      feature: 'Disk Space',
                      symbolic: 'Small (stores path)',
                      hard: 'None (just directory entry)',
                      tip: 'Symbolic link size = length of path string'
                    },
                    {
                      feature: 'Permissions',
                      symbolic: 'Always 777 (lrwxrwxrwx)',
                      hard: 'Same as original',
                      tip: 'Symbolic link permissions don\'t matter'
                    },
                    {
                      feature: 'Identify in ls -l',
                      symbolic: 'lrwxrwxrwx',
                      hard: 'Normal file entry',
                      tip: 'Look for "l" at beginning of permissions'
                    }
                  ].map((row, index) => (
                    <tr 
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      title={row.tip}
                    >
                      <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">{row.feature}</td>
                      <td className="py-4 px-4 font-mono text-purple-600 dark:text-purple-400">{row.symbolic}</td>
                      <td className="py-4 px-4 font-mono text-green-600 dark:text-green-400">{row.hard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    );
  }

  renderExamplesSection() {
    const { isMounted, selectedExample, showHint } = this.state;
    const examples = [
      {
        title: 'Version Management',
        scenario: 'Tuhina manages multiple Python versions at Barrackpore Institute lab',
        symbolic: {
          command: 'ln -s python3.9 python3',
          description: 'Create "python3" pointer to specific version',
          output: 'lrwxrwxrwx 1 tuhina users 9 Jan 16 python3 -> python3.9'
        },
        hard: {
          command: 'Not applicable',
          description: 'Hard links unsuitable for version switching',
          reason: 'Cannot update to point to different file'
        },
        tip: 'Use symbolic links for flexible version switching'
      },
      {
        title: 'Configuration Files',
        scenario: 'Abhronila needs backup protection for her project config',
        symbolic: {
          command: 'ln -s /etc/app/config.conf ~/config.link',
          description: 'Easy access to system config from home',
          output: 'Works across filesystems'
        },
        hard: {
          command: 'ln important.conf important.conf.backup',
          description: 'Create backup that survives original deletion',
          output: 'Both files show link count: 2'
        },
        tip: 'Hard links protect against accidental deletion'
      },
      {
        title: 'Log Files',
        scenario: 'Debangshu needs same log accessible from multiple locations',
        symbolic: {
          command: 'ln -s /var/log/app.log /home/debangshu/debug.log',
          description: 'Monitor log from home directory',
          output: 'Breaks if log rotation moves original'
        },
        hard: {
          command: 'Not recommended',
          description: 'Hard links cause issues with log rotation',
          reason: 'Log rotation creates new inode'
        },
        tip: 'Use symbolic links for logs that rotate'
      }
    ];

    return (
      <div className="space-y-8">
        {/* Example Selection */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Real-world Use Cases</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => this.handleExampleSelect(index)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
                    selectedExample === index
                      ? 'bg-white dark:bg-gray-800 shadow-lg border-2 border-blue-500'
                      : 'bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="font-semibold text-gray-800 dark:text-white mb-2">{example.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{example.scenario}</div>
                </button>
              ))}
            </div>
            
            {/* Hint Toggle */}
            <button
              onClick={this.toggleHint}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
            >
              <span className="mr-2">💡</span>
              {showHint ? 'Hide Thinking Guidance' : 'Show Thinking Guidance'}
            </button>
            
            {showHint && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 animate-[fadeIn_0.5s_ease-out]">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Think about:</strong> How would each link type behave if the original file gets deleted? 
                  Which approach gives more flexibility for future changes?
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Selected Example Detail */}
        {examples[selectedExample] && (
          <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {examples[selectedExample].title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {examples[selectedExample].scenario}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Symbolic Link Example */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🔗</span>
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400">Symbolic Link Approach</h4>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="font-mono text-sm text-gray-800 dark:text-gray-200 mb-2">
                      $ {examples[selectedExample].symbolic.command}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                      {examples[selectedExample].symbolic.description}
                    </p>
                    {examples[selectedExample].symbolic.output && (
                      <div className="p-2 bg-black/10 dark:bg-white/5 rounded text-xs font-mono">
                        {examples[selectedExample].symbolic.output}
                      </div>
                    )}
                  </div>
                  
                  {examples[selectedExample].symbolic.reason && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        {examples[selectedExample].symbolic.reason}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Hard Link Example */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">#️⃣</span>
                    <h4 className="font-semibold text-green-700 dark:text-green-400">Hard Link Approach</h4>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-mono text-sm text-gray-800 dark:text-gray-200 mb-2">
                      $ {examples[selectedExample].hard.command}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                      {examples[selectedExample].hard.description}
                    </p>
                    {examples[selectedExample].hard.output && (
                      <div className="p-2 bg-black/10 dark:bg-white/5 rounded text-xs font-mono">
                        {examples[selectedExample].hard.output}
                      </div>
                    )}
                  </div>
                  
                  {examples[selectedExample].hard.reason && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        {examples[selectedExample].hard.reason}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                <div className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">💡</span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 mb-1">Professional Tip:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      {examples[selectedExample].tip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Common Patterns */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-400 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Common Patterns in Projects</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4">Web Development</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-400">Symbolic links for environment configs (dev/prod)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-400">Hard links for shared asset libraries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-400">Version pointers for CDN assets</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-4">System Administration</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-400">Hard links for critical config backups</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-400">Symbolic links for service binaries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-sm text-gray-700 dark:text-gray-400">Cross-filesystem log access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  renderPitfallsSection() {
    const { isMounted } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Common Mistakes */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Common Pitfalls & Mistakes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-red-700 dark:text-red-400">Beginner Mistakes</h3>
                
                {[
                  {
                    mistake: 'Using hard links across filesystems',
                    consequence: 'ln: failed to create hard link: Invalid cross-device link',
                    fix: 'Use symbolic links instead',
                    story: 'Swadeep tried linking files between his SSD and HDD at Barrackpore lab'
                  },
                  {
                    mistake: 'Assuming symbolic link permissions matter',
                    consequence: 'Security misconfiguration',
                    fix: 'Always check target file permissions',
                    story: 'Tuhina set strict symlink permissions but target was world-readable'
                  },
                  {
                    mistake: 'Deleting original with symbolic links',
                    consequence: 'Dangling links break applications',
                    fix: 'Update or remove symlinks when deleting originals',
                    story: 'Abhronila deleted config file causing her project build to fail'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.mistake}</div>
                    <div className="text-sm text-red-600 dark:text-red-400 mb-1">{item.consequence}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.fix}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{item.story}</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-amber-700 dark:text-amber-400">Conceptual Misunderstandings</h3>
                
                {[
                  {
                    myth: '"Hard links save disk space"',
                    truth: 'They save space only if you would otherwise copy the file',
                    explanation: 'Hard link itself uses no data space, just directory entry'
                  },
                  {
                    myth: '"Symbolic links are just like Windows shortcuts"',
                    truth: 'They\'re filesystem-level, not GUI shortcuts',
                    explanation: 'OS and applications treat them as real file references'
                  },
                  {
                    myth: '"I can hard link directories"',
                    truth: 'Only . and .. are hard links to directories',
                    explanation: 'Filesystem integrity prevents directory hard links'
                  },
                  {
                    myth: '"Link count shows number of symbolic links"',
                    truth: 'Link count only tracks hard links',
                    explanation: 'Symbolic links don\'t affect the target\'s link count'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.myth}</div>
                    <div className="text-sm text-green-600 dark:text-green-400 mb-1">{item.truth}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{item.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Debugging Tips */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Debugging & Troubleshooting</h3>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4">Diagnostic Commands</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-gray-300 p-3 rounded mb-2">
                      $ ls -li
                    </code>
                    <p className="text-sm text-gray-700 dark:text-gray-400">Show inode numbers and link counts</p>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-gray-300 p-3 rounded mb-2">
                      $ stat filename
                    </code>
                    <p className="text-sm text-gray-700 dark:text-gray-400">Detailed metadata including links</p>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-gray-300 p-3 rounded mb-2">
                      $ readlink symlink
                    </code>
                    <p className="text-sm text-gray-700 dark:text-gray-400">Show where symbolic link points</p>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-gray-300 p-3 rounded mb-2">
                      $ find / -samefile target
                    </code>
                    <p className="text-sm text-gray-700 dark:text-gray-400">Find all hard links to a file</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-4">Common Error Messages</h4>
                
                <div className="space-y-3">
                  {[
                    'ln: failed to create hard link: File exists',
                    'ln: accessing "target": No such file or directory',
                    'ln: failed to create symbolic link: Permission denied',
                    'bash: ./symlink: Too many levels of symbolic links'
                  ].map((error, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">✗</span>
                      <code className="font-mono text-sm text-gray-800 dark:text-gray-300">{error}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  renderBestPracticesSection() {
    const { isMounted } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Best Practices */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Best Practices & Professional Tips</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: 'Planning & Strategy',
                  items: [
                    'Use symbolic links for anything that might move or change',
                    'Use hard links for permanent backup protection',
                    'Document your link strategy in README files',
                    'Consider filesystem boundaries before linking'
                  ]
                },
                {
                  title: 'Implementation',
                  items: [
                    'Always use absolute paths for system symlinks',
                    'Relative paths for project-internal symlinks',
                    'Test both creation and deletion scenarios',
                    'Verify with ls -l and readlink'
                  ]
                },
                {
                  title: 'Maintenance',
                  items: [
                    'Regularly check for broken symlinks',
                    'Clean up unused hard links',
                    'Update version pointers during deployments',
                    'Include link management in backup scripts'
                  ]
                }
              ].map((category, index) => (
                <div 
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-emerald-500 mr-2 mt-1">✓</span>
                        <span className="text-sm text-gray-700 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Checklist */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-emerald-200 dark:border-emerald-700">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4">Quick Decision Checklist</h3>
              
              <div className="space-y-3">
                {[
                  'Will the target file move or get renamed? → Use Symbolic',
                  'Is this across different drives/filesystems? → Use Symbolic',
                  'Need protection against accidental deletion? → Use Hard',
                  'Working within same partition only? → Consider Hard',
                  'Pointing to a directory? → Must use Symbolic',
                  'Creating version pointer? → Use Symbolic'
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200">
                    <span className="text-emerald-500 mr-3 mt-1">→</span>
                    <span className="text-sm text-gray-800 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-8 shadow-lg border border-amber-200 dark:border-yellow-700 hover:shadow-xl transition-shadow duration-500">
            <div className="flex items-start mb-6">
              <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Teacher's Note</h3>
                <p className="text-amber-700 dark:text-amber-400">Sukanta Hui</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Key Insight for Students</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Think of symbolic links as <strong>signposts</strong> pointing to a destination, and hard links as 
                  <strong> multiple entrances</strong> to the same building. The signpost becomes useless if the 
                  building moves, but additional entrances don't affect the building's existence.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Tip</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  When teaching at Barrackpore Institute, I have students create both types of links to the same file, 
                  then observe what happens when they delete the original. This hands-on experiment solidifies the 
                  conceptual difference better than any explanation.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Common Student Mistake</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Students like Debangshu often try to use hard links across their SSD and HDD partitions. 
                  Remember: Hard links only work within the same filesystem. For cross-device linking, 
                  symbolic links are your only option.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Professional Advice</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  In production systems, always document your link strategy. Tuhina's team at Shyamnagar tech hub 
                  maintains a "links.md" file that explains why each link exists and what depends on it. 
                  This prevents confusion during maintenance and debugging.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-400 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Professional Tips & Tricks</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400">Command Line Mastery</h4>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <code className="block font-mono text-sm text-gray-800 dark:text-gray-300 mb-2">
                    $ ln -sf new_target existing_symlink
                  </code>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Update existing symbolic link (force flag overwrites)
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <code className="block font-mono text-sm text-gray-800 dark:text-gray-300 mb-2">
                    $ find . -type l -exec ls -la {} \;
                  </code>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Find and list all symbolic links in current directory
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <code className="block font-mono text-sm text-gray-800 dark:text-gray-300 mb-2">
                    $ find . -type f -links +1
                  </code>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Find files with multiple hard links
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400">Scripting & Automation</h4>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Deployment Script Pattern:</strong>
                  </p>
                  <code className="block font-mono text-xs text-gray-800 dark:text-gray-300">
                    # Switch to new version<br/>
                    ln -sf app-v2.1.0 current-version<br/>
                    # Restart service pointing to symlink<br/>
                    systemctl restart myapp@current-version
                  </code>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Backup Protection Pattern:</strong>
                  </p>
                  <code className="block font-mono text-xs text-gray-800 dark:text-gray-300">
                    # Create hard link backup<br/>
                    ln critical.conf critical.conf.$(date +%Y%m%d)<br/>
                    # Verify backup exists<br/>
                    [ -e critical.conf.* ] && echo "Backup created"
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  render() {
    const { activeTab, isMounted } = this.state;

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* Custom Animation Keyframes */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out;
          }
          
          .animate-slide-up {
            animation: slideUp 0.5s ease-out;
          }
          
          .animate-pulse-slow {
            animation: pulse 2s infinite;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .animate-fade-in,
            .animate-slide-up,
            .animate-pulse-slow {
              animation: none;
            }
          }
        `}</style>

        {/* Header */}
        <header className={`py-8 px-4 md:px-8 transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                Topic 9: Filesystem Links
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white leading-tight">
                Symbolic Links vs Hard Links
                <span className="block text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Master file referencing concepts with practical examples
                </span>
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'concept', label: 'Core Concept', icon: '🧠' },
                { id: 'examples', label: 'Examples', icon: '💡' },
                { id: 'pitfalls', label: 'Pitfalls', icon: '⚠️' },
                { id: 'best-practices', label: 'Best Practices', icon: '✅' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => this.handleTabChange(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 md:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'concept' && this.renderConceptSection()}
            {activeTab === 'examples' && this.renderExamplesSection()}
            {activeTab === 'pitfalls' && this.renderPitfallsSection()}
            {activeTab === 'best-practices' && this.renderBestPracticesSection()}
          </div>
        </main>

        {/* Footer */}
        <footer className={`px-4 md:px-8 py-8 border-t border-gray-200 dark:border-gray-800 transition-all duration-700 motion-safe:transition-all delay-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Key Takeaways</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Symbolic links = Flexible pointers</li>
                  <li>• Hard links = Multiple names, one file</li>
                  <li>• Choose based on use case</li>
                  <li>• Always verify with diagnostic commands</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Next Steps</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Practice creating both link types</li>
                  <li>• Experiment with deletion scenarios</li>
                  <li>• Try cross-filesystem linking</li>
                  <li>• Document your link patterns</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Barrackpore Institute</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Practical learning with real-world scenarios from Ichapur, Naihati, and Shyamnagar projects.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-500">
              <p>Topic 9: Symbolic vs Hard Links • Linux Filesystem Mastery • Barrackpore Institute</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}