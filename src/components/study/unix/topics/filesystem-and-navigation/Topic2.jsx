// Topic2.jsx - pwd, ls, cd – Absolute Mastery
import React, { Component } from 'react';

export default class Topic2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeCommand: 'pwd',
      showDetails: {},
      currentPath: '/home/swadeep/projects',
      commandHistory: [],
      lsOutputType: 'basic',
      simulatedTerminal: 'user@barrackpore-institute:~$ '
    };
    this.pathHistory = ['/home/swadeep', '/home/swadeep/projects'];
    this.historyIndex = 1;
  }

  componentDidMount() {
    // Trigger animations after component mounts
    setTimeout(() => {
      this.setState({ isMounted: true });
    }, 100);
  }

  handleCommandSelect = (command) => {
    this.setState({ activeCommand: command });
  };

  toggleDetails = (detailKey) => {
    this.setState(prevState => ({
      showDetails: {
        ...prevState.showDetails,
        [detailKey]: !prevState.showDetails[detailKey]
      }
    }));
  };

  executeCommand = (command) => {
    const { currentPath, commandHistory } = this.state;
    let newPath = currentPath;
    let output = '';
    
    switch(command) {
      case 'pwd':
        output = currentPath;
        break;
      case 'ls':
        output = 'Desktop  Documents  Downloads  Music  Pictures  projects  Videos';
        break;
      case 'ls -l':
        output = `total 56
drwxr-xr-x 2 swadeep swadeep 4096 Jan 10 10:30 Desktop
drwxr-xr-x 4 swadeep swadeep 4096 Jan 12 15:45 Documents
drwxr-xr-x 2 swadeep swadeep 4096 Jan 15 09:20 Downloads
drwxr-xr-x 2 swadeep swadeep 4096 Jan 11 14:15 Music
drwxr-xr-x 2 swadeep swadeep 4096 Jan 13 11:30 Pictures
drwxr-xr-x 3 swadeep swadeep 4096 Jan 16 08:45 projects
drwxr-xr-x 2 swadeep swadeep 4096 Jan 14 16:20 Videos`;
        break;
      case 'cd ..':
        newPath = currentPath.split('/').slice(0, -1).join('/') || '/';
        this.pathHistory.push(newPath);
        this.historyIndex++;
        break;
      case 'cd ~':
        newPath = '/home/swadeep';
        this.pathHistory.push(newPath);
        this.historyIndex++;
        break;
      case 'cd /etc':
        newPath = '/etc';
        this.pathHistory.push(newPath);
        this.historyIndex++;
        break;
      default:
        output = `bash: ${command}: command not found`;
    }
    
    this.setState({
      currentPath: newPath,
      commandHistory: [...commandHistory, { command, output }]
    });
  };

  navigateHistory = (direction) => {
    if (direction === 'up' && this.historyIndex > 0) {
      this.historyIndex--;
    } else if (direction === 'down' && this.historyIndex < this.pathHistory.length - 1) {
      this.historyIndex++;
    }
    this.setState({ currentPath: this.pathHistory[this.historyIndex] });
  };

  render() {
    const { isMounted, activeCommand, showDetails, currentPath, commandHistory, lsOutputType, simulatedTerminal } = this.state;

    // Command data
    const commands = {
      pwd: {
        name: 'pwd',
        fullName: 'Print Working Directory',
        prototype: 'pwd [OPTION]',
        description: 'Displays the absolute path of the current working directory',
        realWorld: 'Like asking "Which classroom am I in?" at Barrackpore Institute',
        options: [
          { option: '-L', description: 'Display logical current directory (follow symlinks)' },
          { option: '-P', description: 'Display physical current directory (avoid symlinks)' }
        ],
        commonUse: 'Always use before major operations to confirm location',
        icon: '📍'
      },
      ls: {
        name: 'ls',
        fullName: 'List Directory Contents',
        prototype: 'ls [OPTION]... [FILE]...',
        description: 'Lists files and directories in the current or specified directory',
        realWorld: 'Looking at the contents of a classroom whiteboard or notice board',
        options: [
          { option: '-l', description: 'Use long listing format (detailed view)' },
          { option: '-a', description: 'Include hidden files (starting with .)' },
          { option: '-h', description: 'Human readable file sizes (K, M, G)' },
          { option: '-t', description: 'Sort by modification time, newest first' },
          { option: '-r', description: 'Reverse order while sorting' },
          { option: '-R', description: 'List subdirectories recursively' }
        ],
        commonUse: 'ls -laht is the most common professional combination',
        icon: '📋'
      },
      cd: {
        name: 'cd',
        fullName: 'Change Directory',
        prototype: 'cd [DIRECTORY]',
        description: 'Changes the current working directory to the specified directory',
        realWorld: 'Moving between different classrooms in the institute',
        specialArgs: [
          { arg: 'cd ~', description: 'Go to home directory' },
          { arg: 'cd ..', description: 'Go to parent directory' },
          { arg: 'cd -', description: 'Go to previous directory' },
          { arg: 'cd /', description: 'Go to root directory' }
        ],
        commonUse: 'Use tab completion for faster navigation',
        icon: '🚪'
      }
    };

    // Current command data
    const currentCmd = commands[activeCommand];

    // Animation styles
    const baseAnimation = isMounted 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4';

    // Inline keyframes
    const animationStyle = `
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
      
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      
      @keyframes commandHighlight {
        0% { background-color: rgba(59, 130, 246, 0.1); }
        100% { background-color: transparent; }
      }
      
      .animate-typewriter {
        overflow: hidden;
        white-space: nowrap;
        animation: typewriter 2s steps(40, end);
      }
      
      .animate-blink {
        animation: blink 1s infinite;
      }
      
      .animate-command-highlight {
        animation: commandHighlight 1.5s ease-out;
      }
    `;

    // Simulated terminal output based on command
    const getTerminalOutput = () => {
      const lastCommand = commandHistory[commandHistory.length - 1];
      if (!lastCommand) return '';
      
      return `${simulatedTerminal}${lastCommand.command}\n${lastCommand.output}`;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-900 p-4 md:p-8 transition-colors duration-300">
        <style>{animationStyle}</style>
        
        {/* Header Section */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`}>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">⚡</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                pwd, ls, cd – Absolute Mastery
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              Master the fundamental navigation commands that form the backbone of Linux proficiency
            </p>
          </div>

          {/* Command Navigation */}
          <div className={`flex flex-wrap gap-4 mb-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-500 ${baseAnimation}`} style={{animationDelay: '200ms'}}>
            {Object.keys(commands).map((cmd, index) => (
              <button
                key={cmd}
                className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${activeCommand === cmd 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => this.handleCommandSelect(cmd)}
                style={{animationDelay: `${300 + index * 100}ms`}}
              >
                <span className="text-xl mr-3">{commands[cmd].icon}</span>
                <div className="text-left">
                  <div className="font-bold text-lg font-mono">{commands[cmd].name}</div>
                  <div className="text-sm opacity-80">{commands[cmd].fullName}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Main Command Section */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Command Details */}
            <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
              {/* Command Header */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{currentCmd.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-mono">
                      {currentCmd.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentCmd.fullName}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Prototype / Signature</h3>
                  <div className="font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                    {currentCmd.prototype}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Purpose & Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentCmd.description}
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Real-world Analogy</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {currentCmd.realWorld}
                  </p>
                </div>
              </div>

              {/* Options/Special Arguments */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {currentCmd.name === 'cd' ? 'Special Arguments' : 'Common Options'}
                </h3>
                
                <div className="space-y-3">
                  {(currentCmd.options || currentCmd.specialArgs)?.map((item, index) => (
                    <div 
                      key={index} 
                      className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <code className="font-mono font-bold text-blue-600 dark:text-blue-400">
                          {item.option || item.arg}
                        </code>
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                          Essential
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Terminal */}
            <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
              {/* Current Path Display */}
              <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Current Working Directory</h3>
                  <div className="font-mono text-xl text-green-400 bg-black/50 p-4 rounded-lg overflow-x-auto">
                    <span className="text-gray-400">$</span> pwd
                    <div className="mt-2 text-white animate-typewriter">
                      {currentPath}
                    </div>
                  </div>
                </div>

                {/* Path Navigation */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-300 mb-3">Navigate Path</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentPath.split('/').filter(Boolean).map((segment, index, arr) => (
                      <div key={index} className="flex items-center">
                        <button
                          onClick={() => this.executeCommand(`cd ${'../'.repeat(arr.length - index - 1)}`)}
                          className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm transition-colors duration-300"
                        >
                          {segment}
                        </button>
                        {index < arr.length - 1 && (
                          <span className="mx-2 text-gray-500">/</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Command Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => this.executeCommand('pwd')}
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex flex-col items-center"
                  >
                    <span className="text-lg mb-1">📍</span>
                    <span className="font-mono text-sm">pwd</span>
                  </button>
                  <button
                    onClick={() => this.executeCommand('ls')}
                    className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 flex flex-col items-center"
                  >
                    <span className="text-lg mb-1">📋</span>
                    <span className="font-mono text-sm">ls</span>
                  </button>
                  <button
                    onClick={() => this.executeCommand('ls -l')}
                    className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 flex flex-col items-center"
                  >
                    <span className="text-lg mb-1">📊</span>
                    <span className="font-mono text-sm">ls -l</span>
                  </button>
                  <button
                    onClick={() => this.executeCommand('cd ..')}
                    className="p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-300 flex flex-col items-center"
                  >
                    <span className="text-lg mb-1">⬆️</span>
                    <span className="font-mono text-sm">cd ..</span>
                  </button>
                </div>

                {/* Quick Navigation */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Quick Navigation</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => this.executeCommand('cd ~')}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-sm transition-colors duration-300"
                    >
                      Home (~)
                    </button>
                    <button
                      onClick={() => this.executeCommand('cd /etc')}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-sm transition-colors duration-300"
                    >
                      /etc
                    </button>
                    <button
                      onClick={() => this.navigateHistory('up')}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-sm transition-colors duration-300"
                    >
                      ← History
                    </button>
                    <button
                      onClick={() => this.navigateHistory('down')}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-sm transition-colors duration-300"
                    >
                      History →
                    </button>
                  </div>
                </div>
              </div>

              {/* Terminal Output */}
              <div className="p-6 bg-gray-900 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-300">Terminal Output</h3>
                  <div className="text-xs text-gray-500">Barrackpore Institute Terminal</div>
                </div>
                <div className="font-mono text-sm bg-black p-4 rounded-lg h-48 overflow-y-auto">
                  {commandHistory.length === 0 ? (
                    <div className="text-gray-500">
                      <div>{simulatedTerminal}<span className="animate-blink">█</span></div>
                      <div className="mt-4 text-gray-600">
                        Click commands above to see output...
                      </div>
                    </div>
                  ) : (
                    <>
                      {commandHistory.map((item, index) => (
                        <div key={index} className="mb-2">
                          <div className="text-green-400">
                            {simulatedTerminal}{item.command}
                          </div>
                          <div className="text-gray-300 whitespace-pre mt-1">
                            {item.output}
                          </div>
                        </div>
                      ))}
                      <div className="text-green-400">
                        {simulatedTerminal}<span className="animate-blink">█</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Tips & Common Mistakes */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Professional Tips */}
            <div className={`p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '800ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">💼</span> Professional Tips & Tricks
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Alias Creation</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Add to <code className="font-mono">~/.bashrc</code>:<br/>
                    <code className="font-mono block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                      alias ll='ls -laht'<br/>
                      alias ..='cd ..'<br/>
                      alias ...='cd ../..'
                    </code>
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Tab Completion</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">Tab</kbd> twice to:
                    <ul className="mt-2 space-y-1">
                      <li>• Complete file/directory names</li>
                      <li>• Show all available options</li>
                      <li>• List commands starting with typed letters</li>
                    </ul>
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Path Shortcuts</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="font-mono">.</code> = Current directory<br/>
                    <code className="font-mono">..</code> = Parent directory<br/>
                    <code className="font-mono">~</code> = Home directory<br/>
                    <code className="font-mono">-</code> = Previous directory
                  </p>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className={`p-6 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 rounded-2xl shadow-lg border border-rose-200 dark:border-rose-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1000ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">⚠️</span> Common Beginner Mistakes
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-rose-700 dark:text-rose-400 mb-2">Forgetting pwd Before Operations</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Tuhina once deleted files from wrong directory. <span className="font-semibold">Always</span> run <code className="font-mono">pwd</code> 
                    before <code className="font-mono">rm</code>, <code className="font-mono">cp</code>, or <code className="font-mono">mv</code> operations.
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-rose-700 dark:text-rose-400 mb-2">Case Sensitivity</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="font-mono">Documents</code> ≠ <code className="font-mono">documents</code> ≠ <code className="font-mono">DOCUMENTS</code><br/>
                    Linux is case-sensitive. Abhronila spent hours debugging because of wrong case.
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-rose-700 dark:text-rose-400 mb-2">Spaces in Paths</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="font-mono">cd My Documents</code> fails!<br/>
                    Use: <code className="font-mono">cd My\ Documents</code> or <code className="font-mono">cd "My Documents"</code><br/>
                    Or better: Avoid spaces in Linux filenames.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Scenarios - FIXED VERSION */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1200ms'}}>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🏫</span> Real-World Classroom Scenarios
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3">
                    👨‍🎓
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Swadeep's Project</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Needs to organize Python projects in Ichapur Computer Lab:
                </p>
                <div className="space-y-2">
                  <code className="block text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    $ pwd<br/>
                    /home/swadeep<br/>
                    $ mkdir -p projects/python/&#123;lab1,lab2,lab3&#125;<br/>
                    $ cd projects/python/lab1<br/>
                    $ pwd<br/>
                    /home/swadeep/projects/python/lab1
                  </code>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 mr-3">
                    👩‍🎓
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Tuhina's Debugging</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Config file missing in Naihati Server Room:
                </p>
                <div className="space-y-2">
                  <code className="block text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    $ cd /etc<br/>
                    $ pwd<br/>
                    /etc<br/>
                    $ ls -la | grep ssh<br/>
                    $ cd ssh<br/>
                    $ ls -la sshd_config<br/>
                    -rw-r--r-- 1 root root 1234 Jan 15 config
                  </code>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
                    👨‍🎓
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Debangshu's Cleanup</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Cleaning temporary files in Shyamnagar Lab:
                </p>
                <div className="space-y-2">
                  <code className="block text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    $ cd /tmp<br/>
                    $ pwd<br/>
                    /tmp<br/>
                    $ ls -laht | head -10<br/>
                    $ rm -f *.tmp<br/>
                    $ cd ~<br/>
                    $ pwd<br/>
                    /home/debangshu
                  </code>
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
                    <span className="font-semibold text-amber-600 dark:text-amber-400">Remember:</span> 
                    These three commands are your "compass and map" in the Linux filesystem. 
                    Master them, and you'll never get lost, even in complex directory structures.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    At Barrackpore Institute, I teach students this workflow:
                    <span className="font-mono block mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      1. <span className="text-blue-600">pwd</span> - Know where you are<br/>
                      2. <span className="text-green-600">ls</span> - See what's around you<br/>
                      3. <span className="text-orange-600">cd</span> - Move where you need to go
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Muscle Memory</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Practice until <code>pwd</code>, <code>ls</code>, <code>cd</code> become automatic
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Tab Habit</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Always use Tab completion - prevents typos
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-100/50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">Check Twice</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Run <code>pwd</code> before any destructive operation
                    </p>
                  </div>
                  
                  <div className="p-3 bg-red-100/50 dark:bg-red-900/30 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-300 mb-1">Path Safety</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Use quotes with spaces: <code>cd "My Folder"</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Practice & Quiz */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1600ms'}}>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🧪</span> Practice Challenge
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Scenario: Organizing College Files</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  Abhronila needs to organize her semester files at Shyamnagar College:
                </p>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      Starting from <code className="font-mono">/home/abhronila</code>, she needs to:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>Create directory structure: <code>college/semester&#123;1,2,3,4&#125;/subjects</code></li>
                      <li>Navigate to semester 3's subjects directory</li>
                      <li>Verify current location with pwd</li>
                      <li>List contents to confirm structure</li>
                      <li>Return to home directory</li>
                    </ol>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 text-sm">Write the Commands</h4>
                    <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      $ <span className="text-gray-400 animate-pulse">Type your solution here...</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Quiz</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      What does <code className="font-mono">cd -</code> do?
                    </p>
                    <div className="space-y-2">
                      {[
                        'Goes to home directory',
                        'Goes to previous directory',
                        'Goes to root directory',
                        'Shows directory history'
                      ].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`quiz${idx}`} name="quiz1" className="mr-2" />
                          <label htmlFor={`quiz${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Which <code className="font-mono">ls</code> option shows file sizes in human readable format?
                    </p>
                    <div className="space-y-2">
                      {['-l', '-h', '-a', '-S'].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`quiz2-${idx}`} name="quiz2" className="mr-2" />
                          <label htmlFor={`quiz2-${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 text-sm">Hint</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Think about how Swadeep would navigate between his project directories 
                      at Barrackpore Institute computer lab...
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
              <span className="font-semibold">Topic 3</span> of Linux Fundamentals Series
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                ← Previous: Directory Roles
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Next: ls Advanced Options →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}