// Topic7.jsx - Tree Command: Visualizing Directory Hierarchy
import React, { Component } from 'react';

export default class Topic7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeView: 'basic',
      treeDepth: 3,
      showHidden: false,
      showPermissions: false,
      showSize: false,
      customPath: '/home/swadeep',
      treeData: null,
      treeOptions: {
        '-a': false,
        '-d': false,
        '-f': false,
        '-i': false,
        '-l': false,
        '-p': false,
        '-s': false,
        '-u': false,
        '-g': false,
        '-D': false
      }
    };
    this.projectStructure = this.generateProjectStructure();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isMounted: true });
      this.generateTreeOutput();
    }, 100);
  }

  generateProjectStructure = () => {
    return {
      name: 'barrackpore-project',
      type: 'directory',
      children: [
        {
          name: 'src',
          type: 'directory',
          children: [
            { name: 'main.py', type: 'file', size: '2.1K', permissions: '-rw-r--r--' },
            { name: 'utils.py', type: 'file', size: '3.4K', permissions: '-rwxr-xr-x' },
            { name: 'config.py', type: 'file', size: '1.5K', permissions: '-rw-r--r--' },
            {
              name: 'modules',
              type: 'directory',
              children: [
                { name: 'auth.py', type: 'file', size: '4.2K', permissions: '-rw-r--r--' },
                { name: 'database.py', type: 'file', size: '5.6K', permissions: '-rw-r--r--' }
              ]
            }
          ]
        },
        {
          name: 'docs',
          type: 'directory',
          children: [
            { name: 'README.md', type: 'file', size: '1.2K', permissions: '-rw-r--r--' },
            { name: 'API.md', type: 'file', size: '3.8K', permissions: '-rw-r--r--' },
            { name: 'images', type: 'directory', children: [] }
          ]
        },
        {
          name: 'tests',
          type: 'directory',
          children: [
            { name: 'test_main.py', type: 'file', size: '2.3K', permissions: '-rw-r--r--' },
            { name: 'test_utils.py', type: 'file', size: '3.1K', permissions: '-rw-r--r--' }
          ]
        },
        {
          name: '.git',
          type: 'hidden',
          children: [
            { name: 'config', type: 'file', size: '0.3K', permissions: '-rw-r--r--' },
            { name: 'HEAD', type: 'file', size: '0.1K', permissions: '-rw-r--r--' }
          ]
        },
        { name: '.gitignore', type: 'hidden', size: '0.5K', permissions: '-rw-r--r--' },
        { name: 'requirements.txt', type: 'file', size: '0.2K', permissions: '-rw-r--r--' },
        { name: 'Dockerfile', type: 'file', size: '1.1K', permissions: '-rw-r--r--' },
        { name: 'docker-compose.yml', type: 'file', size: '1.8K', permissions: '-rw-r--r--' }
      ]
    };
  };

  generateTreeOutput = () => {
    const { treeDepth, showHidden, showPermissions, showSize, treeOptions } = this.state;
    let output = '';
    const indent = '    ';
    const branch = '│   ';
    const tee = '├── ';
    const last = '└── ';
    
    const traverse = (node, prefix = '', isLast = true, depth = 0) => {
      if (depth > treeDepth) return;
      
      // Skip hidden files if not showing
      if (node.type === 'hidden' && !showHidden && !treeOptions['-a']) return;
      
      // Add current node
      let line = prefix + (isLast ? last : tee);
      
      if (showPermissions && node.permissions) {
        line += node.permissions + ' ';
      }
      
      line += node.name;
      
      if (showSize && node.size) {
        line += ` [${node.size}]`;
      }
      
      if (node.type === 'directory') {
        line += '/';
      }
      
      output += line + '\n';
      
      // Process children
      if (node.children && depth < treeDepth) {
        const childPrefix = prefix + (isLast ? '    ' : branch);
        const childCount = node.children.length;
        
        node.children.forEach((child, index) => {
          const isLastChild = index === childCount - 1;
          traverse(child, childPrefix, isLastChild, depth + 1);
        });
      }
    };
    
    traverse(this.projectStructure);
    this.setState({ treeData: output });
  };

  handleViewChange = (view) => {
    this.setState({ activeView: view }, this.generateTreeOutput);
  };

  handleDepthChange = (e) => {
    this.setState({ treeDepth: parseInt(e.target.value) }, this.generateTreeOutput);
  };

  toggleOption = (option) => {
    this.setState(prevState => ({
      treeOptions: {
        ...prevState.treeOptions,
        [option]: !prevState.treeOptions[option]
      }
    }), this.generateTreeOutput);
  };

  toggleShowHidden = () => {
    this.setState(prevState => ({ showHidden: !prevState.showHidden }), this.generateTreeOutput);
  };

  toggleShowPermissions = () => {
    this.setState(prevState => ({ showPermissions: !prevState.showPermissions }), this.generateTreeOutput);
  };

  toggleShowSize = () => {
    this.setState(prevState => ({ showSize: !prevState.showSize }), this.generateTreeOutput);
  };

  handlePathChange = (e) => {
    this.setState({ customPath: e.target.value });
  };

  getTreeCommand = () => {
    const { treeDepth, showHidden, showPermissions, showSize, treeOptions, customPath } = this.state;
    let cmd = 'tree';
    
    if (treeDepth !== 3) cmd += ` -L ${treeDepth}`;
    if (showHidden || treeOptions['-a']) cmd += ' -a';
    if (treeOptions['-d']) cmd += ' -d';
    if (treeOptions['-f']) cmd += ' -f';
    if (treeOptions['-i']) cmd += ' -i';
    if (showPermissions || treeOptions['-p']) cmd += ' -p';
    if (showSize || treeOptions['-s']) cmd += ' -s';
    if (treeOptions['-u']) cmd += ' -u';
    if (treeOptions['-g']) cmd += ' -g';
    if (treeOptions['-D']) cmd += ' -D';
    
    cmd += ` ${customPath}`;
    return cmd;
  };

  render() {
    const { isMounted, activeView, treeDepth, showHidden, showPermissions, showSize, treeData, customPath, treeOptions } = this.state;
    
    // Animation styles
    const baseAnimation = isMounted 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4';

    const animationStyle = `
      @keyframes treeGrow {
        from { 
          opacity: 0;
          transform: translateY(-10px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes branchPulse {
        0%, 100% { 
          color: #6b7280;
        }
        50% { 
          color: #3b82f6;
        }
      }
      
      @keyframes leafFall {
        0% {
          opacity: 0;
          transform: translateY(-20px) rotate(0deg);
        }
        100% {
          opacity: 1;
          transform: translateY(0) rotate(0deg);
        }
      }
      
      .animate-tree-grow {
        animation: treeGrow 0.5s ease-out;
      }
      
      .animate-branch-pulse {
        animation: branchPulse 2s infinite;
      }
      
      .animate-leaf-fall {
        animation: leafFall 0.3s ease-out;
      }
    `;

    const treeCommand = this.getTreeCommand();

    // Tree option descriptions
    const optionDetails = {
      '-a': { description: 'All files (include hidden)', icon: '👁️' },
      '-d': { description: 'List directories only', icon: '📁' },
      '-f': { description: 'Print full path prefix', icon: '📍' },
      '-i': { description: "Don't print indentation lines", icon: '│' },
      '-l': { description: 'Follow symbolic links', icon: '🔗' },
      '-p': { description: 'Print file permissions', icon: '🔐' },
      '-s': { description: 'Print file size', icon: '📏' },
      '-u': { description: 'Print username', icon: '👤' },
      '-g': { description: 'Print group name', icon: '👥' },
      '-D': { description: 'Print modification date', icon: '📅' }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 md:p-8 transition-colors duration-300">
        <style>{animationStyle}</style>
        
        {/* Header Section */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`}>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🌳</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Tree Command – Visualizing Directory Hierarchy
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              Master the art of visualizing complex directory structures with the powerful `tree` command - 
              see your filesystem like never before
            </p>
          </div>

          {/* View Navigation */}
          <div className={`flex flex-wrap gap-3 mb-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-500 ${baseAnimation}`} style={{animationDelay: '200ms'}}>
            <button
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${activeView === 'basic' 
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => this.handleViewChange('basic')}
            >
              <span className="text-xl mr-3">🌱</span>
              <div className="text-left">
                <div className="font-bold">Basic Usage</div>
                <div className="text-sm opacity-80">Getting started with tree</div>
              </div>
            </button>
            
            <button
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${activeView === 'options' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => this.handleViewChange('options')}
            >
              <span className="text-xl mr-3">⚙️</span>
              <div className="text-left">
                <div className="font-bold">Options & Flags</div>
                <div className="text-sm opacity-80">Advanced tree usage</div>
              </div>
            </button>
            
            <button
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${activeView === 'visual' 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => this.handleViewChange('visual')}
            >
              <span className="text-xl mr-3">🎨</span>
              <div className="text-left">
                <div className="font-bold">Visual Examples</div>
                <div className="text-sm opacity-80">Real project structures</div>
              </div>
            </button>
          </div>
        </section>

        {/* Main Content - Basic Usage */}
        {activeView === 'basic' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Introduction */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
                {/* What is tree? */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-3">🌳</span> What is the `tree` command?
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      The <code className="font-mono text-green-600 dark:text-green-400">tree</code> command is a recursive directory listing program 
                      that produces a depth-indented listing of files and directories in a tree-like format.
                    </p>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Barrackpore Institute Analogy</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Think of `tree` as a floor plan of the entire institute building. 
                        It shows how departments (directories) and rooms (files) are organized, 
                        complete with connecting corridors (directory hierarchy).
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Without tree</h4>
                        <code className="font-mono text-sm block text-gray-600 dark:text-gray-400">
                          $ ls -R<br/>
                          Confusing, flat output
                        </code>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">With tree</h4>
                        <code className="font-mono text-sm block text-green-600 dark:text-green-400">
                          $ tree<br/>
                          Clear, visual hierarchy
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Installation & Basic Usage */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Installation & Basic Usage</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Install tree command:</h4>
                      <div className="space-y-2">
                        <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          # Ubuntu/Debian<br/>
                          $ sudo apt install tree
                        </code>
                        <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          # CentOS/RHEL<br/>
                          $ sudo yum install tree
                        </code>
                        <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          # macOS<br/>
                          $ brew install tree
                        </code>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Basic commands:</h4>
                      <div className="space-y-2">
                        <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          $ tree<br/>
                          # Show current directory structure
                        </code>
                        <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          $ tree /path/to/directory<br/>
                          # Show specific directory
                        </code>
                        <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          $ tree -L 2<br/>
                          # Limit depth to 2 levels
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Interactive Tree */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
                {/* Interactive Tree Generator */}
                <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-300 mb-4">Interactive Tree Generator</h3>
                  
                  {/* Controls */}
                  <div className="mb-6 space-y-4">
                    <div>
                      <div className="text-gray-400 mb-2">Tree Depth: {treeDepth}</div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={treeDepth}
                        onChange={this.handleDepthChange}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 level</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5 levels</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={this.toggleShowHidden}
                        className={`p-3 rounded-lg transition-all duration-300 ${showHidden 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <span className="text-lg mb-1 block">👁️</span>
                        <span className="text-xs">Hidden Files</span>
                      </button>
                      
                      <button
                        onClick={this.toggleShowPermissions}
                        className={`p-3 rounded-lg transition-all duration-300 ${showPermissions 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <span className="text-lg mb-1 block">🔐</span>
                        <span className="text-xs">Permissions</span>
                      </button>
                      
                      <button
                        onClick={this.toggleShowSize}
                        className={`p-3 rounded-lg transition-all duration-300 ${showSize 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <span className="text-lg mb-1 block">📏</span>
                        <span className="text-xs">File Size</span>
                      </button>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 mb-2">Directory Path:</div>
                      <input
                        type="text"
                        value={customPath}
                        onChange={this.handlePathChange}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  {/* Generated Tree Output */}
                  <div className="mb-6">
                    <div className="text-gray-400 mb-2">Generated Command:</div>
                    <code className="block font-mono text-lg text-green-400 bg-black/50 p-4 rounded-lg">
                      $ {treeCommand}
                    </code>
                  </div>

                  {/* Tree Output Display */}
                  <div className="font-mono text-sm bg-black p-4 rounded-lg h-64 overflow-y-auto whitespace-pre">
                    {treeData || 'Generating tree visualization...'}
                  </div>

                  {/* Statistics */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="p-3 bg-gray-700 rounded-lg text-center">
                      <div className="text-gray-400 text-sm">Directories</div>
                      <div className="text-white text-xl">5</div>
                    </div>
                    <div className="p-3 bg-gray-700 rounded-lg text-center">
                      <div className="text-gray-400 text-sm">Files</div>
                      <div className="text-white text-xl">11</div>
                    </div>
                    <div className="p-3 bg-gray-700 rounded-lg text-center">
                      <div className="text-gray-400 text-sm">Depth</div>
                      <div className="text-white text-xl">{treeDepth}</div>
                    </div>
                  </div>
                </div>

                {/* Quick Examples */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Examples</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        $ tree -d<br/>
                        # Show directories only
                      </code>
                    </div>
                    
                    <div>
                      <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        $ tree -I "*.pyc|__pycache__"<br/>
                        # Ignore Python cache files
                      </code>
                    </div>
                    
                    <div>
                      <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        $ tree -h<br/>
                        # Show human-readable sizes
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Options & Flags */}
        {activeView === 'options' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Common Options */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
                {/* Common Options */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-3">⚙️</span> Common Tree Options
                  </h2>
                  
                  <div className="space-y-4">
                    {Object.entries(optionDetails).map(([option, details], index) => (
                      <div 
                        key={option} 
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${treeOptions[option] 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                          : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => this.toggleOption(option)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-xl mr-3">{details.icon}</span>
                            <code className="font-mono font-bold text-blue-600 dark:text-blue-400">{option}</code>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${treeOptions[option] 
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                          }`}>
                            {treeOptions[option] ? 'ON' : 'OFF'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-400">{details.description}</p>
                        <code className="text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2">
                          $ tree {option} .
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Option Combinations */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Useful Combinations</h3>
                  
                  <div className="space-y-3">
                    {[
                      {
                        command: 'tree -psh',
                        description: 'Permissions, size (human), and human-readable',
                        useCase: 'Full file details at a glance'
                      },
                      {
                        command: 'tree -d -L 2',
                        description: 'Directories only, depth limited to 2',
                        useCase: 'Quick project structure overview'
                      },
                      {
                        command: 'tree -I "node_modules|.git"',
                        description: 'Ignore common directories',
                        useCase: 'Clean view of project files'
                      },
                      {
                        command: 'tree -af',
                        description: 'All files with full paths',
                        useCase: 'Complete system documentation'
                      }
                    ].map((combo, index) => (
                      <div key={index} className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                        <code className="font-mono font-bold text-green-600 dark:text-green-400 block mb-1">
                          {combo.command}
                        </code>
                        <p className="text-sm text-gray-700 dark:text-gray-400 mb-1">{combo.description}</p>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Use: {combo.useCase}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Advanced Usage */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
                {/* Advanced Examples */}
                <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-300 mb-4">Advanced Usage Examples</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Filter by file type:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        $ tree -P "*.py"<br/>
                        # Show only Python files
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Exclude patterns:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        $ tree -I "*.log|temp*|backup"<br/>
                        # Exclude logs, temp files, and backups
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Output to file:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        $ tree -h > project_structure.txt<br/>
                        # Save tree output to file
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">JSON output (some versions):</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        $ tree -J<br/>
                        # Output in JSON format
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">HTML output:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        $ tree -H . > index.html<br/>
                        # Generate HTML directory listing
                      </code>
                    </div>
                  </div>
                </div>

                {/* Real-world Scenarios */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Student Scenarios</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3">
                          👨‍🎓
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Swadeep's Python Project</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                        Needs to document project structure for Barrackpore Institute submission:
                      </p>
                      <code className="block text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        $ tree -I "__pycache__|*.pyc" -L 3 --dirsfirst<br/>
                        # Clean project view for documentation
                      </code>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 mr-3">
                          👩‍🎓
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Tuhina's Cleanup Task</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                        Finding large files in home directory at Naihati Lab:
                      </p>
                      <code className="block text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        $ tree -sh ~ | grep -E "[0-9]+[M|G]"<br/>
                        # Find files larger than 1MB
                      </code>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
                          👨‍🎓
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Debangshu's Backup Script</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                        Creating backup list for Shyamnagar server:
                      </p>
                      <code className="block text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        $ tree -af --noreport /etc > backup_list.txt<br/>
                        # List all config files for backup
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Visual Examples */}
        {activeView === 'visual' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Project Structures */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
                {/* Common Project Structures */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-3">🏗️</span> Common Project Structures
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Python Project */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Python Project Structure</h3>
                      <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded whitespace-pre h-48 overflow-y-auto">
                        python-project/<br/>
                        ├── src/<br/>
                        │   ├── __init__.py<br/>
                        │   ├── main.py<br/>
                        │   └── utils/<br/>
                        │       ├── __init__.py<br/>
                        │       └── helpers.py<br/>
                        ├── tests/<br/>
                        │   ├── __init__.py<br/>
                        │   └── test_main.py<br/>
                        ├── docs/<br/>
                        │   └── api.md<br/>
                        ├── requirements.txt<br/>
                        ├── setup.py<br/>
                        └── README.md
                      </div>
                      <code className="block text-xs font-mono bg-gray-200 dark:bg-gray-600 p-2 rounded mt-2">
                        $ tree python-project --dirsfirst
                      </code>
                    </div>
                    
                    {/* Web Project */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">Web Project Structure</h3>
                      <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded whitespace-pre h-48 overflow-y-auto">
                        web-app/<br/>
                        ├── public/<br/>
                        │   ├── index.html<br/>
                        │   ├── css/<br/>
                        │   │   └── style.css<br/>
                        │   └── js/<br/>
                        │       └── app.js<br/>
                        ├── src/<br/>
                        │   ├── components/<br/>
                        │   ├── pages/<br/>
                        │   └── utils/<br/>
                        ├── package.json<br/>
                        ├── webpack.config.js<br/>
                        └── README.md
                      </div>
                      <code className="block text-xs font-mono bg-gray-200 dark:bg-gray-600 p-2 rounded mt-2">
                        $ tree web-app -I "node_modules"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Visualization Techniques */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
                {/* ASCII Art Tree */}
                <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-300 mb-4">Tree Visualization Techniques</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Understanding tree symbols:</div>
                      <div className="font-mono text-sm bg-black/50 p-4 rounded-lg">
                        <div className="text-green-400">├──</div>
                        <div className="text-gray-500 ml-4">Branch (has siblings below)</div>
                        <div className="text-green-400">└──</div>
                        <div className="text-gray-500 ml-4">Last branch in group</div>
                        <div className="text-blue-400">│</div>
                        <div className="text-gray-500 ml-4">Vertical connector</div>
                        <div className="text-yellow-400">└── 📁 directory/</div>
                        <div className="text-gray-500 ml-4">Directory (ends with /)</div>
                        <div className="text-yellow-400">└── file.txt</div>
                        <div className="text-gray-500 ml-4">Regular file</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Colorized output:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        $ tree -C<br/>
                        # Use colors to differentiate file types
                      </code>
                      <div className="mt-2 text-xs text-gray-500">
                        Directories: <span className="text-blue-400">blue</span>, 
                        Executables: <span className="text-green-400">green</span>, 
                        Regular files: <span className="text-white">white</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Generate directory map:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        $ tree -d -L 3 /home > directory_map.txt<br/>
                        # Create documentation of directory structure
                      </code>
                    </div>
                  </div>
                </div>

                {/* Comparison with Other Commands */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tree vs Other Commands</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">tree vs ls -R</h4>
                      <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                        <code>ls -R</code> shows recursive listing but without visual hierarchy
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-xs">
                          <div className="font-semibold text-gray-600 dark:text-gray-400">ls -R output:</div>
                          <code className="text-xs">dir1:<br/>file1 file2<br/>dir2:<br/>file3</code>
                        </div>
                        <div className="text-xs">
                          <div className="font-semibold text-green-600 dark:text-green-400">tree output:</div>
                          <code className="text-xs">├── dir1/<br/>│ ├── file1<br/>│ └── file2<br/>└── dir2/<br/> └── file3</code>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">tree vs find</h4>
                      <div className="text-sm text-gray-700 dark:text-gray-400">
                        <code>find</code> is for searching, <code>tree</code> is for visualization
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <code className="text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded">
                          $ find . -name "*.py"
                        </code>
                        <code className="text-xs bg-gray-100 dark:bg-gray-700 p-1 rounded">
                          $ tree -P "*.py"
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips & Tricks */}
                <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg border border-amber-200 dark:border-yellow-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tips & Tricks</h3>
                  
                  <div className="space-y-2">
                    {[
                      'Use `--dirsfirst` to list directories before files',
                      'Combine with `grep` to filter tree output',
                      'Pipe to `less` for long outputs: `tree | less`',
                      'Use `-I` flag to ignore build artifacts',
                      'Create alias: `alias tt="tree -C -L 2"`',
                      'Generate project documentation automatically',
                      'Use `-H` to create HTML directory listings',
                      'Combine with `du` for size information'
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start p-2 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                        <span className="text-amber-500 mr-2">💡</span>
                        <span className="text-sm text-gray-700 dark:text-gray-400">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teacher's Note */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '800ms'}}>
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl shadow-lg border border-emerald-200 dark:border-green-700 hover:shadow-xl transition-all duration-500">
            <div className="flex items-start">
              <div className="mr-4 text-3xl">👨‍🏫</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Teacher's Note</h2>
                
                <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Key Insight:</span> 
                    The `tree` command turns the abstract concept of "directory hierarchy" into something visual and intuitive. 
                    It's like having X-ray vision for your filesystem - you can see the complete structure at a glance.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    At Ichapur Computer Lab, I teach students this workflow:
                    <span className="font-mono block mt-2 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <span className="text-green-600">1. tree -L 2</span> - Quick overview<br/>
                      <span className="text-blue-600">2. tree -psh</span> - Detailed analysis<br/>
                      <span className="text-purple-600">3. tree -I "pattern"</span> - Filtered view
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Memory Aid</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      ├── = Branch (more coming)<br/>
                      └── = Last item<br/>
                      │   = Continuation line
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-100/50 dark:bg-green-900/30 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">Pro Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Create alias in .bashrc:<br/>
                      <code>alias tt="tree -C -L 3"</code>
                    </p>
                  </div>
                  
                  <div className="p-3 bg-lime-100/50 dark:bg-lime-900/30 rounded-lg">
                    <h4 className="font-semibold text-lime-800 dark:text-lime-300 mb-1">Debugging Use</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Use tree to:<br/>
                      • Verify file locations<br/>
                      • Check project structure<br/>
                      • Document setups
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercises */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1000ms'}}>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🧪</span> Practice Exercises
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Scenario: Barrackpore Institute Project</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  Swadeep needs to analyze his project structure for the annual review:
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      1. Show only directories, depth limited to 3
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <code className="text-xs font-mono bg-black/50 p-2 rounded flex-1">
                        $ tree <input type="text" className="bg-transparent border-b border-gray-600 w-24" placeholder="options" />
                      </code>
                      <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                        Check
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      2. Show Python files with permissions and human-readable sizes
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <code className="text-xs font-mono bg-black/50 p-2 rounded flex-1">
                        $ tree <input type="text" className="bg-transparent border-b border-gray-600 w-32" placeholder="options" /> -P "*.py"
                      </code>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      3. Create HTML documentation of project structure
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <code className="text-xs font-mono bg-black/50 p-2 rounded flex-1">
                        $ tree <input type="text" className="bg-transparent border-b border-gray-600 w-20" placeholder="options" /> > docs/structure.html
                      </code>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Tree Command Challenges</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Which command shows directories before files?
                    </p>
                    <div className="space-y-2">
                      {['tree -d', 'tree --dirsfirst', 'tree -f', 'tree -D'].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`challenge1-${idx}`} name="challenge1" className="mr-2" />
                          <label htmlFor={`challenge1-${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      How to ignore node_modules and .git directories?
                    </p>
                    <div className="space-y-2">
                      {[
                        'tree -I "node_modules|.git"',
                        'tree --ignore node_modules .git',
                        'tree -x node_modules .git',
                        'tree --exclude node_modules .git'
                      ].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`challenge2-${idx}`} name="challenge2" className="mr-2" />
                          <label htmlFor={`challenge2-${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 text-sm">Think About</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      When would you use `tree` instead of `find`? 
                      What are the advantages of visual hierarchy over flat listings?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className={`max-w-7xl mx-auto pt-8 border-t border-gray-200 dark:border-gray-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1200ms'}}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Topic 8</span> of Linux Fundamentals Series
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                ← Previous: Hidden Files & Folders
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Next: Understanding File Types →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}