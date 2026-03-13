// Topic5.jsx - Absolute vs Relative Paths with Real-world Folder Trees
import React, { Component } from 'react';

export default class Topic5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activePathType: 'absolute',
      currentWorkingDir: '/home/swadeep',
      selectedFile: null,
      navigationHistory: ['/home/swadeep'],
      historyIndex: 0,
      pathExamples: {
        absolute: [
          { path: '/home/swadeep/Documents/projects/python/lab1.py', description: 'Absolute path from root' },
          { path: '/etc/ssh/sshd_config', description: 'System configuration file' },
          { path: '/var/log/syslog', description: 'System log file' },
          { path: '/usr/bin/python3', description: 'Executable program' }
        ],
        relative: [
          { path: './Documents/projects/python/lab1.py', description: 'Relative from current directory' },
          { path: '../tuhina/Documents/shared.txt', description: 'Go up one level then into sibling directory' },
          { path: 'projects/python/../java/Main.java', description: 'Relative with parent directory (..)' },
          { path: '~/Downloads/latest.tar.gz', description: 'Home directory shortcut (expands to absolute)' }
        ]
      },
      folderTree: {
        name: '/',
        type: 'directory',
        children: [
          {
            name: 'home',
            type: 'directory',
            children: [
              {
                name: 'swadeep',
                type: 'directory',
                current: true,
                children: [
                  { name: 'Documents', type: 'directory', children: [
                    { name: 'projects', type: 'directory', children: [
                      { name: 'python', type: 'directory', children: [
                        { name: 'lab1.py', type: 'file', size: '2.1K' },
                        { name: 'lab2.py', type: 'file', size: '3.4K' },
                        { name: 'utils.py', type: 'file', size: '1.5K' }
                      ]},
                      { name: 'java', type: 'directory', children: [
                        { name: 'Main.java', type: 'file', size: '4.2K' },
                        { name: 'README.md', type: 'file', size: '0.8K' }
                      ]}
                    ]},
                    { name: 'college', type: 'directory', children: [
                      { name: 'semester1', type: 'directory', children: [] },
                      { name: 'semester2', type: 'directory', children: [] }
                    ]}
                  ]},
                  { name: 'Downloads', type: 'directory', children: [
                    { name: 'linux_guide.pdf', type: 'file', size: '1.2M' },
                    { name: 'software.tar.gz', type: 'file', size: '45M' }
                  ]},
                  { name: 'Pictures', type: 'directory', children: [] },
                  { name: '.bashrc', type: 'hidden', size: '3.7K' },
                  { name: 'todo.txt', type: 'file', size: '0.5K' }
                ]
              },
              {
                name: 'tuhina',
                type: 'directory',
                children: [
                  { name: 'Documents', type: 'directory', children: [
                    { name: 'shared.txt', type: 'file', size: '1.1K' }
                  ]},
                  { name: 'Music', type: 'directory', children: [] }
                ]
              },
              {
                name: 'abhronila',
                type: 'directory',
                children: []
              }
            ]
          },
          {
            name: 'etc',
            type: 'directory',
            children: [
              { name: 'ssh', type: 'directory', children: [
                { name: 'sshd_config', type: 'file', size: '4.2K' }
              ]},
              { name: 'passwd', type: 'file', size: '1.8K' }
            ]
          },
          {
            name: 'var',
            type: 'directory',
            children: [
              { name: 'log', type: 'directory', children: [
                { name: 'syslog', type: 'file', size: '12M' },
                { name: 'auth.log', type: 'file', size: '2.3M' }
              ]}
            ]
          }
        ]
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isMounted: true });
    }, 100);
  }

  handlePathTypeChange = (type) => {
    this.setState({ activePathType: type });
  };

  navigateTo = (path) => {
    const { navigationHistory, historyIndex } = this.state;
    const newHistory = [...navigationHistory.slice(0, historyIndex + 1), path];
    this.setState({
      currentWorkingDir: path,
      navigationHistory: newHistory,
      historyIndex: historyIndex + 1
    });
  };

  navigateBack = () => {
    const { historyIndex } = this.state;
    if (historyIndex > 0) {
      this.setState(prevState => ({
        currentWorkingDir: prevState.navigationHistory[prevState.historyIndex - 1],
        historyIndex: prevState.historyIndex - 1
      }));
    }
  };

  navigateForward = () => {
    const { navigationHistory, historyIndex } = this.state;
    if (historyIndex < navigationHistory.length - 1) {
      this.setState({
        currentWorkingDir: navigationHistory[historyIndex + 1],
        historyIndex: historyIndex + 1
      });
    }
  };

  handleFileSelect = (path) => {
    this.setState({ selectedFile: path });
  };

  resolveRelativePath = (relativePath) => {
    const { currentWorkingDir } = this.state;
    
    if (relativePath.startsWith('~/')) {
      return `/home/swadeep/${relativePath.slice(2)}`;
    }
    
    if (relativePath.startsWith('/')) {
      return relativePath; // Already absolute
    }
    
    let parts = relativePath.split('/');
    let result = currentWorkingDir.split('/').filter(Boolean);
    
    for (let part of parts) {
      if (part === '' || part === '.') {
        continue;
      } else if (part === '..') {
        if (result.length > 0) {
          result.pop();
        }
      } else {
        result.push(part);
      }
    }
    
    return '/' + result.join('/');
  };

  renderTree = (node, depth = 0, path = '') => {
    const { selectedFile } = this.state;
    const currentPath = path ? `${path}/${node.name}` : `/${node.name}`;
    const isSelected = selectedFile === currentPath;
    
    return (
      <div key={currentPath} className="ml-4">
        <div 
          className={`flex items-center py-1 px-2 rounded cursor-pointer transition-all duration-200 ${isSelected ? 'bg-blue-100 dark:bg-blue-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          onClick={() => this.handleFileSelect(currentPath)}
        >
          <div className="flex items-center min-w-0 flex-1">
            <div className="w-4 mr-2 flex-shrink-0">
              {depth > 0 && (
                <div className="h-full border-l border-gray-300 dark:border-gray-600 ml-2"></div>
              )}
            </div>
            <span className="mr-2">
              {node.type === 'directory' ? (node.current ? '📁★' : '📁') : 
               node.type === 'hidden' ? '🔒' : '📄'}
            </span>
            <span className={`font-mono text-sm truncate ${node.type === 'hidden' ? 'text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
              {node.name}
            </span>
            {node.size && (
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                ({node.size})
              </span>
            )}
            {node.current && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                CWD
              </span>
            )}
          </div>
        </div>
        
        {node.children && node.children.map(child => 
          this.renderTree(child, depth + 1, currentPath)
        )}
      </div>
    );
  };

  render() {
    const { isMounted, activePathType, currentWorkingDir, selectedFile, navigationHistory, historyIndex, pathExamples, folderTree } = this.state;
    
    // Animation styles
    const baseAnimation = isMounted 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4';

    const animationStyle = `
      @keyframes pathHighlight {
        0% { background-color: rgba(59, 130, 246, 0.1); }
        100% { background-color: transparent; }
      }
      
      @keyframes treeReveal {
        from { 
          opacity: 0;
          transform: translateX(-10px);
        }
        to { 
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes navigationFlow {
        0% {
          stroke-dashoffset: 100;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      
      .animate-path-highlight {
        animation: pathHighlight 2s ease-out;
      }
      
      .animate-tree-reveal {
        animation: treeReveal 0.5s ease-out;
      }
      
      .animate-navigation-flow {
        animation: navigationFlow 3s linear infinite;
      }
    `;

    // Resolve selected file path
    const absolutePath = selectedFile ? this.resolveRelativePath(selectedFile) : '';
    const pathComponents = absolutePath.split('/').filter(Boolean);
    
    // Current directory contents
    const getCurrentDirContents = () => {
      const pathParts = currentWorkingDir.split('/').filter(Boolean);
      let currentNode = folderTree;
      
      for (const part of pathParts) {
        if (currentNode.children) {
          currentNode = currentNode.children.find(child => child.name === part);
          if (!currentNode) break;
        }
      }
      
      return currentNode?.children || [];
    };

    const currentDirContents = getCurrentDirContents();

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 p-4 md:p-8 transition-colors duration-300">
        <style>{animationStyle}</style>
        
        {/* Header Section */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`}>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📍</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Absolute vs Relative Paths with Real-world Folder Trees
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              Master the art of navigation by understanding when to use absolute paths from root (/) 
              and when to use relative paths from your current location
            </p>
          </div>

          {/* Path Type Navigation */}
          <div className={`flex flex-wrap gap-4 mb-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-500 ${baseAnimation}`} style={{animationDelay: '200ms'}}>
            <button
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${activePathType === 'absolute' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => this.handlePathTypeChange('absolute')}
            >
              <span className="text-xl mr-3">🌍</span>
              <div className="text-left">
                <div className="font-bold">Absolute Paths</div>
                <div className="text-sm opacity-80">Always start from root (/)</div>
              </div>
            </button>
            
            <button
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${activePathType === 'relative' 
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => this.handlePathTypeChange('relative')}
            >
              <span className="text-xl mr-3">📍</span>
              <div className="text-left">
                <div className="font-bold">Relative Paths</div>
                <div className="text-sm opacity-80">Relative to current directory</div>
              </div>
            </button>
            
            <button
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${activePathType === 'comparison' 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => this.handlePathTypeChange('comparison')}
            >
              <span className="text-xl mr-3">⚖️</span>
              <div className="text-left">
                <div className="font-bold">Comparison</div>
                <div className="text-sm opacity-80">When to use which</div>
              </div>
            </button>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Interactive Navigation */}
            <div className={`lg:col-span-2 space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
              {/* Current Directory Panel */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Interactive Navigation</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={this.navigateBack}
                      disabled={historyIndex === 0}
                      className={`p-2 rounded-lg ${historyIndex === 0 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50'
                      }`}
                    >
                      ←
                    </button>
                    <button
                      onClick={this.navigateForward}
                      disabled={historyIndex === navigationHistory.length - 1}
                      className={`p-2 rounded-lg ${historyIndex === navigationHistory.length - 1 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50'
                      }`}
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Current Working Directory */}
                <div className="mb-6">
                  <div className="text-gray-700 dark:text-gray-300 mb-2">Current Working Directory:</div>
                  <div className="font-mono text-lg bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-blue-600 dark:text-blue-400 break-all">
                    {currentWorkingDir}
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">$ pwd</span> would show this path
                  </div>
                </div>

                {/* Path Navigation */}
                <div className="mb-6">
                  <div className="text-gray-700 dark:text-gray-300 mb-3">Quick Navigation:</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { path: '/', label: 'Root', icon: '🏠' },
                      { path: '/home/swadeep', label: 'Home', icon: '👤' },
                      { path: '/etc', label: 'Config', icon: '⚙️' },
                      { path: '/var/log', label: 'Logs', icon: '📊' },
                      { path: currentWorkingDir + '/Documents', label: 'Documents', icon: '📁' }
                    ].map((nav, index) => (
                      <button
                        key={index}
                        onClick={() => this.navigateTo(nav.path)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center"
                      >
                        <span className="mr-2">{nav.icon}</span>
                        <span>{nav.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Directory Contents */}
                <div>
                  <div className="text-gray-700 dark:text-gray-300 mb-3">Current Directory Contents:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {currentDirContents.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (item.type === 'directory') {
                            this.navigateTo(currentWorkingDir + '/' + item.name);
                          } else {
                            this.handleFileSelect('./' + item.name);
                          }
                        }}
                        className={`p-3 rounded-lg transition-all duration-300 flex flex-col items-center ${item.type === 'directory' 
                          ? 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30' 
                          : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="text-xl mb-2">
                          {item.type === 'directory' ? '📁' : 
                           item.type === 'hidden' ? '🔒' : '📄'}
                        </span>
                        <span className="font-mono text-sm truncate w-full text-center">
                          {item.name}
                        </span>
                        {item.size && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {item.size}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Path Examples */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {activePathType === 'absolute' ? '🌍 Absolute Path Examples' :
                   activePathType === 'relative' ? '📍 Relative Path Examples' :
                   '⚖️ Path Comparison'}
                </h2>
                
                {activePathType === 'comparison' ? (
                  <div className="space-y-6">
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">Scenario: Accessing lab1.py</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">From /home/swadeep</h4>
                          <div className="space-y-2">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Relative path:</div>
                              <code className="font-mono text-green-600 dark:text-green-400">
                                ./Documents/projects/python/lab1.py
                              </code>
                            </div>
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Absolute path:</div>
                              <code className="font-mono text-blue-600 dark:text-blue-400">
                                /home/swadeep/Documents/projects/python/lab1.py
                              </code>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">From /etc</h4>
                          <div className="space-y-2">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Relative path:</div>
                              <code className="font-mono text-green-600 dark:text-green-400">
                                ../../home/swadeep/Documents/projects/python/lab1.py
                              </code>
                            </div>
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                              <div className="text-sm text-gray-600 dark:text-gray-400">Absolute path:</div>
                              <code className="font-mono text-blue-600 dark:text-blue-400">
                                /home/swadeep/Documents/projects/python/lab1.py
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">When to Use Each</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Use Relative Paths When:</h4>
                          <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                            <li>• Working within a project directory</li>
                            <li>• Writing scripts that move with files</li>
                            <li>• Navigating nearby directories</li>
                            <li>• Creating portable configurations</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Use Absolute Paths When:</h4>
                          <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                            <li>• Accessing system files (/etc, /var)</li>
                            <li>• Creating startup scripts or services</li>
                            <li>• Referencing files from anywhere</li>
                            <li>• Ensuring location independence</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pathExamples[activePathType].map((example, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 animate-tree-reveal"
                        style={{animationDelay: `${500 + index * 100}ms`}}
                      >
                        <code className={`font-mono text-lg block mb-2 ${activePathType === 'absolute' 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-green-600 dark:text-green-400'
                        }`}>
                          {example.path}
                        </code>
                        <p className="text-gray-700 dark:text-gray-400">
                          {example.description}
                        </p>
                        {activePathType === 'relative' && (
                          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Resolves to: <code className="font-mono">{this.resolveRelativePath(example.path)}</code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Folder Tree Visualization */}
            <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
              {/* Folder Tree */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-[600px] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Filesystem Tree</h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Click items to select
                  </div>
                </div>
                
                <div className="font-mono text-sm">
                  {this.renderTree(folderTree)}
                </div>
              </div>

              {/* Selected Path Analysis */}
              {selectedFile && (
                <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg animate-path-highlight">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">Path Analysis</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Selected Path:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        {selectedFile}
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Absolute Path:</div>
                      <code className="block font-mono text-blue-400 bg-black/50 p-3 rounded">
                        {absolutePath}
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Path Components:</div>
                      <div className="flex flex-wrap gap-2">
                        {pathComponents.map((component, index) => (
                          <div key={index} className="flex items-center">
                            <div className="px-3 py-1 bg-gray-700 rounded text-gray-300 text-sm">
                              {component}
                            </div>
                            {index < pathComponents.length - 1 && (
                              <div className="mx-2 text-gray-500">/</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Navigation Command:</div>
                      <code className="block font-mono text-cyan-400 bg-black/50 p-2 rounded">
                        $ cd {selectedFile.startsWith('/') ? '' : currentWorkingDir + '/'}
                        {selectedFile}
                      </code>
                    </div>
                  </div>
                </div>
              )}

              {/* Path Shortcuts */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg border border-green-200 dark:border-green-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Path Shortcuts</h3>
                
                <div className="space-y-3">
                  {[
                    { symbol: '.', meaning: 'Current directory', example: './file.txt' },
                    { symbol: '..', meaning: 'Parent directory', example: '../sibling/' },
                    { symbol: '~', meaning: 'Home directory', example: '~/Documents' },
                    { symbol: '-', meaning: 'Previous directory', example: 'cd -' },
                    { symbol: '', meaning: 'Directory separator', example: '/home/user' }
                  ].map((shortcut, index) => (
                    <div key={index} className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <code className="font-mono font-bold text-green-600 dark:text-green-400">
                          {shortcut.symbol || '/'}
                        </code>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {shortcut.example}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-400">
                        {shortcut.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Scenarios */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '800ms'}}>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🏫</span> Real-world Scenarios at Barrackpore Institute
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3">
                    👨‍🎓
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Swadeep's Python Project</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Working on lab assignments from different locations:
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className="text-xs text-gray-500">From project root:</div>
                    <code className="text-xs font-mono text-green-600 dark:text-green-400">
                      $ python3 ./lab1.py
                    </code>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className="text-xs text-gray-500">From anywhere in system:</div>
                    <code className="text-xs font-mono text-blue-600 dark:text-blue-400">
                      $ python3 /home/swadeep/projects/lab1.py
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 mr-3">
                    👩‍🎓
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Tuhina's Shared Files</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Accessing shared documents from different user directories:
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className="text-xs text-gray-500">From Swadeep's home:</div>
                    <code className="text-xs font-mono text-green-600 dark:text-green-400">
                      $ cp ../tuhina/shared.txt ./Downloads/
                    </code>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className="text-xs text-gray-500">Absolute alternative:</div>
                    <code className="text-xs font-mono text-blue-600 dark:text-blue-400">
                      $ cp /home/tuhina/shared.txt /home/swadeep/Downloads/
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
                    👨‍🎓
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Debangshu's System Admin</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Managing system files from different locations:
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className="text-xs text-gray-500">Checking logs from root:</div>
                    <code className="text-xs font-mono text-blue-600 dark:text-blue-400">
                      $ tail -f /var/log/syslog
                    </code>
                  </div>
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <div className="text-xs text-gray-500">Relative would be messy:</div>
                    <code className="text-xs font-mono text-gray-500">
                      $ tail -f ../../var/log/syslog  # From /home/debangshu
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes & Best Practices */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Common Mistakes */}
            <div className={`p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg border border-red-200 dark:border-red-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1000ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">🚫</span> Common Path Mistakes
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Missing Leading Slash</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="font-mono">home/swadeep/file.txt</code> is relative, not absolute.<br/>
                    Absolute must start with <code className="font-mono">/</code>: <code className="font-mono">/home/swadeep/file.txt</code>
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Confusing . and ..</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="font-mono">.</code> = current directory<br/>
                    <code className="font-mono">..</code> = parent directory<br/>
                    Abhronila used <code className="font-mono">cd .</code> expecting to go up, but stayed put.
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Spaces Without Quotes</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="font-mono">cd My Documents</code> fails!<br/>
                    Use: <code className="font-mono">cd "My Documents"</code> or <code className="font-mono">cd My\ Documents</code><br/>
                    Better: Avoid spaces in Linux paths.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className={`p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1200ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">💡</span> Path Best Practices
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Use Relative for Portability</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Scripts that use relative paths can be moved anywhere.<br/>
                    Example: <code className="font-mono">./config/app.conf</code> works regardless of where script is installed.
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Use Absolute for System Files</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    System services and cron jobs need absolute paths.<br/>
                    Example: <code className="font-mono">/usr/bin/python3 /opt/app/main.py</code><br/>
                    This works regardless of current directory.
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Tab Completion is Your Friend</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">Tab</kbd> to:<br/>
                    • Complete path names<br/>
                    • Show available options<br/>
                    • Prevent typos in long paths
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1400ms'}}>
          <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg border border-amber-200 dark:border-yellow-700 hover:shadow-xl transition-all duration-500">
            <div className="flex items-start">
              <div className="mr-4 text-3xl">👨‍🏫</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Teacher's Note</h2>
                
                <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">Key Insight:</span> 
                    Think of absolute paths as "global addresses" (like GPS coordinates) and relative paths as 
                    "local directions" (like "turn left at the next corner"). Both have their place in navigation.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    At Shyamnagar Tech Center, I teach this rule of thumb:
                    <span className="font-mono block mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <span className="text-green-600">Relative</span> for project work<br/>
                      <span className="text-blue-600">Absolute</span> for system administration<br/>
                      <span className="text-purple-600">~</span> for home directory access
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Memory Aid</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      <code>/</code> = Start from root (absolute)<br/>
                      <code>.</code> = Here (current directory)<br/>
                      <code>..</code> = Up (parent directory)
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Debugging Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      When a command fails, first check:<br/>
                      <code>pwd</code> - Where am I?<br/>
                      <code>ls</code> - What's here?
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-100/50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">Pro Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Use <code>realpath</code> command to convert any path to absolute:<br/>
                      <code>realpath ./file.txt</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercise */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1600ms'}}>
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🧪</span> Path Navigation Challenge
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Scenario: Organizing College Work</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  Starting from <code className="font-mono">/home/swadeep</code>, you need to:
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      1. Navigate to the python projects directory
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <code className="text-xs font-mono bg-black/50 p-2 rounded flex-1">
                        $ cd <input type="text" className="bg-transparent border-b border-gray-600 w-32" placeholder="Enter path" />
                      </code>
                      <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                        Check
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      2. Copy a file from Tuhina's shared directory to your Downloads
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <code className="text-xs font-mono bg-black/50 p-2 rounded flex-1">
                        $ cp <input type="text" className="bg-transparent border-b border-gray-600 w-40" placeholder="source path" /> <input type="text" className="bg-transparent border-b border-gray-600 w-32" placeholder="dest path" />
                      </code>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      3. Return to home using the shortest path
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <code className="text-xs font-mono bg-black/50 p-2 rounded flex-1">
                        $ cd <input type="text" className="bg-transparent border-b border-gray-600 w-24" placeholder="path" />
                      </code>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Path Conversion Exercise</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Convert this relative path to absolute (from <code className="font-mono">/etc/ssh</code>):
                    </p>
                    <code className="block text-sm font-mono mb-2 text-green-600 dark:text-green-400">
                      ../../home/swadeep/Documents/projects/python/lab1.py
                    </code>
                    <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      Absolute: /home/swadeep/Documents/projects/python/lab1.py
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Convert this absolute path to relative (from <code className="font-mono">/home/swadeep</code>):
                    </p>
                    <code className="block text-sm font-mono mb-2 text-blue-600 dark:text-blue-400">
                      /var/log/syslog
                    </code>
                    <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      Relative: ../../var/log/syslog
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 text-sm">Think About</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Why would you use <code className="font-mono">../config/file.conf</code> instead of 
                      <code className="font-mono">/etc/app/config/file.conf</code> in a script?
                    </p>
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
              <span className="font-semibold">Topic 6</span> of Linux Fundamentals Series
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                ← Previous: Inode Numbers & Metadata
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Next: Hidden Files & Folders →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}