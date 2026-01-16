// Topic13.jsx - Tab completion and command history navigation
import React, { Component } from 'react';

export default class Topic13 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeTab: 'concept',
      terminalInput: '',
      commandHistory: [
        'cd /home/student/projects',
        'ls -la',
        'mkdir research_paper',
        'cd research_paper',
        'touch introduction.txt methods.txt results.txt',
        'ls *.txt',
        'nano introduction.txt',
        'cat introduction.txt',
        'cp introduction.txt draft_v1.txt',
        'rm methods.txt',
        'pwd',
        'find . -name "*.txt"',
        'chmod 644 draft_v1.txt',
        'ls -l',
        'history | tail -10'
      ],
      currentHistoryIndex: 0,
      showCompletion: false,
      completionOptions: [],
      currentCompletionIndex: 0,
      isTyping: false,
      animationsLoaded: false,
      tabCompletionMode: 'basic',
      terminalFocus: false
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

  handleTerminalInput = (e) => {
    const value = e.target.value;
    this.setState({ 
      terminalInput: value,
      showCompletion: false 
    });

    // Simulate tab completion suggestions
    if (value.includes(' ') && !value.endsWith(' ')) {
      const parts = value.split(' ');
      const lastPart = parts[parts.length - 1];
      
      if (lastPart.length > 0) {
        const suggestions = this.getCompletionSuggestions(lastPart);
        if (suggestions.length > 0) {
          this.setState({
            showCompletion: true,
            completionOptions: suggestions,
            currentCompletionIndex: 0
          });
        }
      }
    }
  };

  getCompletionSuggestions = (partial) => {
    const commonCommands = [
      'cd', 'ls', 'mkdir', 'touch', 'cp', 'mv', 'rm', 'cat', 'nano', 'vim',
      'grep', 'find', 'chmod', 'chown', 'ps', 'kill', 'tar', 'gzip', 'ssh',
      'scp', 'wget', 'curl', 'git', 'docker', 'python', 'node', 'java'
    ];

    const commonFiles = [
      'research_paper/', 'introduction.txt', 'methods.txt', 'results.txt',
      'draft_v1.txt', 'config.json', 'package.json', 'README.md', '.gitignore',
      'src/', 'docs/', 'tests/', 'logs/', 'backup/', 'archive.tar.gz'
    ];

    const allOptions = [...commonCommands, ...commonFiles];
    return allOptions.filter(option => 
      option.toLowerCase().startsWith(partial.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
  };

  handleKeyDown = (e) => {
    const { 
      terminalInput, 
      commandHistory, 
      currentHistoryIndex,
      showCompletion,
      completionOptions,
      currentCompletionIndex
    } = this.state;

    // Handle Tab key for completion
    if (e.key === 'Tab' && showCompletion && completionOptions.length > 0) {
      e.preventDefault();
      const parts = terminalInput.split(' ');
      parts[parts.length - 1] = completionOptions[currentCompletionIndex];
      this.setState({
        terminalInput: parts.join(' '),
        showCompletion: false,
        currentCompletionIndex: 0
      });
    }

    // Handle Up arrow for history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(currentHistoryIndex + 1, commandHistory.length - 1);
      if (newIndex !== currentHistoryIndex) {
        this.setState({
          currentHistoryIndex: newIndex,
          terminalInput: commandHistory[commandHistory.length - 1 - newIndex]
        });
      }
    }

    // Handle Down arrow for history
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(currentHistoryIndex - 1, 0);
      if (newIndex !== currentHistoryIndex) {
        this.setState({
          currentHistoryIndex: newIndex,
          terminalInput: commandHistory[commandHistory.length - 1 - newIndex]
        });
      } else if (newIndex === 0) {
        this.setState({
          currentHistoryIndex: 0,
          terminalInput: ''
        });
      }
    }

    // Handle Ctrl+R for reverse search
    if (e.key === 'r' && e.ctrlKey) {
      e.preventDefault();
      this.setState({ isTyping: true });
      setTimeout(() => this.setState({ isTyping: false }), 500);
    }

    // Handle Enter to execute command
    if (e.key === 'Enter' && terminalInput.trim()) {
      e.preventDefault();
      this.executeCommand(terminalInput);
    }

    // Handle Ctrl+A and Ctrl+E
    if ((e.key === 'a' || e.key === 'e') && e.ctrlKey) {
      e.preventDefault();
      // These would normally move cursor, but we'll just show a visual cue
      this.setState({ isTyping: true });
      setTimeout(() => this.setState({ isTyping: false }), 200);
    }
  };

  executeCommand = (command) => {
    const { commandHistory } = this.state;
    const newHistory = [...commandHistory, command];
    
    this.setState({
      commandHistory: newHistory,
      terminalInput: '',
      currentHistoryIndex: 0,
      showCompletion: false
    });
  };

  handleTabCompletionMode = (mode) => {
    this.setState({ tabCompletionMode: mode });
  };

  handleTerminalFocus = () => {
    this.setState({ terminalFocus: true });
  };

  handleTerminalBlur = () => {
    this.setState({ terminalFocus: false });
  };

  renderConceptSection() {
    const { isMounted, tabCompletionMode } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Introduction */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Mastering Terminal Efficiency</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Tab completion and command history navigation are the secret weapons of productive terminal users. 
              These features can <strong>double your command-line speed</strong> and <strong>reduce errors</strong> by 
              minimizing typing and recalling complex commands.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                  <span className="mr-2">⚡</span> Tab Completion
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Like Swadeep at Barrackpore Institute using autocomplete to quickly type long research paper filenames 
                  without memorizing exact spelling.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                  <span className="mr-2">📜</span> Command History
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Like Tuhina recalling complex project commands from last week without searching through notes—just 
                  press Up arrow and edit as needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Completion Deep Dive */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Tab Completion Mastery</h3>
            
            <div className="mb-8">
              <div className="flex space-x-4 mb-6">
                {['basic', 'intermediate', 'advanced'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => this.handleTabCompletionMode(mode)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 capitalize ${
                      tabCompletionMode === mode
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              
              <div className="space-y-6">
                {/* Basic Tab Completion */}
                {tabCompletionMode === 'basic' && (
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 animate-[fadeIn_0.5s_ease-out]">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4 flex items-center">
                      <span className="mr-2">🔤</span> Basic Completion
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-800 dark:text-white mb-3">How It Works:</h5>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">→</span>
                            <span className="text-sm text-gray-700 dark:text-gray-400">
                              Type partial command/filename and press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">Tab</kbd>
                            </span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">→</span>
                            <span className="text-sm text-gray-700 dark:text-gray-400">
                              If unique match exists, completes automatically
                            </span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">→</span>
                            <span className="text-sm text-gray-700 dark:text-gray-400">
                              If multiple matches, shows list on second Tab
                            </span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">→</span>
                            <span className="text-sm text-gray-700 dark:text-gray-400">
                              Works for commands, files, directories, and options
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-6 p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <strong>Example:</strong> Type <code>cd /ho</code> then <kbd>Tab</kbd> completes to <code>cd /home/</code>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 dark:text-white mb-3">Visual Example:</h5>
                        <div className="p-4 bg-gray-900 rounded-lg font-mono text-sm">
                          <div className="text-green-400">student@barrackpore:~$</div>
                          <div className="text-white mt-2">
                            $ cd proj<span className="text-yellow-300 animate-pulse">█</span>
                          </div>
                          <div className="text-gray-400 mt-2">
                            # Press Tab once:
                          </div>
                          <div className="text-white">
                            $ cd projects/
                          </div>
                          <div className="text-gray-400 mt-2">
                            # Press Tab twice (multiple matches):
                          </div>
                          <div className="text-cyan-300">
                            projects/&nbsp;&nbsp;&nbsp;project_backup/&nbsp;&nbsp;&nbsp;project_docs/
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <div className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Tip:</strong> Tab completion works in the middle of words too! 
                            Edit <code>/etc/apt/sour</code> + <kbd>Tab</kbd> → <code>/etc/apt/sources.list</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Intermediate Tab Completion */}
                {tabCompletionMode === 'intermediate' && (
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700 animate-[fadeIn_0.5s_ease-out]">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center">
                      <span className="mr-2">⚙️</span> Intermediate Techniques
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-800 dark:text-white mb-3">Advanced Features:</h5>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white mb-2">Variable Completion:</div>
                            <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                              <code className="font-mono text-sm text-green-600 dark:text-green-400">
                                $ echo $PA<span className="text-yellow-300">█</span>
                              </code>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Press <kbd>Tab</kbd> → <code>$ echo $PATH</code>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white mb-2">Command Option Completion:</div>
                            <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                              <code className="font-mono text-sm text-green-600 dark:text-green-400">
                                $ ls --<span className="text-yellow-300">█</span>
                              </code>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Press <kbd>Tab</kbd> twice to see all ls options
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white mb-2">User Completion:</div>
                            <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                              <code className="font-mono text-sm text-green-600 dark:text-green-400">
                                $ chown swa<span className="text-yellow-300">█</span>
                              </code>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Press <kbd>Tab</kbd> → <code>$ chown swadeep</code>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 dark:text-white mb-3">Smart Completion:</h5>
                        
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-900 rounded-lg">
                            <div className="text-green-400 text-sm">Hostname completion:</div>
                            <code className="font-mono text-xs text-white block mt-1">
                              $ ssh barrackpore<span className="text-yellow-300">█</span>
                              <div className="text-cyan-300 mt-1">
                                # Tab completes to available hosts in ~/.ssh/config
                              </div>
                            </code>
                          </div>
                          
                          <div className="p-3 bg-gray-900 rounded-lg">
                            <div className="text-green-400 text-sm">Git branch completion:</div>
                            <code className="font-mono text-xs text-white block mt-1">
                              $ git checkout fea<span className="text-yellow-300">█</span>
                              <div className="text-cyan-300 mt-1">
                                # Tab shows available git branches starting with "fea"
                              </div>
                            </code>
                          </div>
                          
                          <div className="p-3 bg-gray-900 rounded-lg">
                            <div className="text-green-400 text-sm">Package completion (apt/dnf):</div>
                            <code className="font-mono text-xs text-white block mt-1">
                              $ sudo apt install python3-requ<span className="text-yellow-300">█</span>
                              <div className="text-cyan-300 mt-1">
                                # Tab shows available packages
                              </div>
                            </code>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <div className="text-sm text-green-800 dark:text-green-200">
                            <strong>Pro Tip:</strong> Bash completion is programmable! Install 
                            <code className="mx-1">bash-completion</code> package for enhanced completion.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Advanced Tab Completion */}
                {tabCompletionMode === 'advanced' && (
                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700 animate-[fadeIn_0.5s_ease-out]">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-4 flex items-center">
                      <span className="mr-2">🚀</span> Advanced Power Usage
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-800 dark:text-white mb-3">Custom Completion:</h5>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                              Create custom completion for your scripts:
                            </div>
                            <code className="block font-mono text-xs bg-gray-900 text-purple-400 p-3 rounded">
                              # In ~/.bash_completion<br/>
                              _mycommand_completion() {"{"}<br/>
                              &nbsp;&nbsp;local cur="${COMP_WORDS[COMP_CWORD]}"<br/>
                              &nbsp;&nbsp;COMPREPLY=( $(compgen -W "start stop status restart" -- $cur) )<br/>
                              {"}"}<br/>
                              complete -F _mycommand_completion mycommand
                            </code>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                              Directory-only completion:
                            </div>
                            <code className="block font-mono text-xs bg-gray-900 text-purple-400 p-3 rounded">
                              $ cd /<span className="text-yellow-300">█</span><br/>
                              # Press Tab, only directories shown (not files)
                            </code>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-800 dark:text-white mb-3">Special Characters:</h5>
                        
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-900 rounded-lg">
                            <div className="text-green-400 text-sm">Tilde Expansion:</div>
                            <code className="font-mono text-xs text-white block mt-1">
                              $ cd ~/proj<span className="text-yellow-300">█</span>
                              <div className="text-cyan-300 mt-1">
                                # Expands to /home/username/projects
                              </div>
                            </code>
                          </div>
                          
                          <div className="p-3 bg-gray-900 rounded-lg">
                            <div className="text-green-400 text-sm">Brace Expansion:</div>
                            <code className="font-mono text-xs text-white block mt-1">
                              $ touch file{'{'}1..3{'}'}.txt<span className="text-yellow-300">█</span>
                              <div className="text-cyan-300 mt-1">
                                # Creates file1.txt, file2.txt, file3.txt
                              </div>
                            </code>
                          </div>
                          
                          <div className="p-3 bg-gray-900 rounded-lg">
                            <div className="text-green-400 text-sm">Escaping Spaces:</div>
                            <code className="font-mono text-xs text-white block mt-1">
                              $ cd My\ Documents/<span className="text-yellow-300">█</span>
                              <div className="text-cyan-300 mt-1">
                                # Use backslash or quotes for spaces in names
                              </div>
                            </code>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <div className="text-sm text-purple-800 dark:text-purple-200">
                            <strong>Power User:</strong> At Shyamnagar tech hub, we write completion scripts 
                            for our internal tools, making them as easy to use as standard Unix commands.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Completion Benefits */}
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl">
              <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-4">Why Master Tab Completion?</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                  <div className="font-medium text-gray-800 dark:text-white mb-2">Speed</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Reduces typing by 60-80% for long commands and paths
                  </div>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                  <div className="font-medium text-gray-800 dark:text-white mb-2">Accuracy</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Eliminates typos in complex filenames and options
                  </div>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                  <div className="font-medium text-gray-800 dark:text-white mb-2">Discovery</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Helps discover available commands and options
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Research:</strong> Barrackpore Institute students who master tab completion complete 
                  terminal tasks 2.3x faster than those who don't.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  renderInteractiveSection() {
    const { 
      isMounted, 
      terminalInput, 
      commandHistory, 
      currentHistoryIndex,
      showCompletion,
      completionOptions,
      currentCompletionIndex,
      isTyping,
      terminalFocus
    } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Interactive Terminal */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Interactive Terminal Simulator</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Terminal Interface */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                  {/* Terminal Header */}
                  <div className="bg-gray-800 px-4 py-2 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 text-gray-400 text-sm">
                      student@barrackpore-institute:~$
                    </div>
                  </div>
                  
                  {/* Terminal Content */}
                  <div className="p-4 font-mono text-sm h-96 overflow-y-auto">
                    {/* Command History Display */}
                    {commandHistory.slice(-10).map((cmd, index) => (
                      <div key={index} className="mb-1">
                        <div className="text-green-400">$ {cmd}</div>
                      </div>
                    ))}
                    
                    {/* Current Input Line */}
                    <div className="flex items-center mt-2">
                      <div className="text-green-400 mr-2">$</div>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={this.handleTerminalInput}
                          onKeyDown={this.handleKeyDown}
                          onFocus={this.handleTerminalFocus}
                          onBlur={this.handleTerminalBlur}
                          className="w-full bg-transparent text-white outline-none"
                          autoFocus
                        />
                        {terminalInput && (
                          <div className="absolute top-full left-0 w-full">
                            {/* Typing indicator */}
                            {isTyping && (
                              <div className="text-cyan-300 text-xs mt-1">
                                {terminalFocus ? 'Typing...' : 'Press Ctrl+R for reverse search'}
                              </div>
                            )}
                            
                            {/* Tab completion suggestions */}
                            {showCompletion && completionOptions.length > 0 && (
                              <div className="mt-2 p-2 bg-gray-800 rounded-lg border border-gray-700">
                                <div className="text-gray-400 text-xs mb-1">Tab completion suggestions:</div>
                                {completionOptions.map((option, index) => (
                                  <div 
                                    key={index}
                                    className={`p-1 text-sm rounded ${
                                      index === currentCompletionIndex
                                        ? 'bg-blue-600 text-white'
                                        : 'text-cyan-300 hover:bg-gray-700'
                                    }`}
                                  >
                                    {option}
                                  </div>
                                ))}
                                <div className="text-gray-500 text-xs mt-2">
                                  Use ↑↓ to navigate, Tab to select
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Cursor */}
                    <div className="flex items-center mt-1">
                      <div className={`w-2 h-5 bg-green-400 ${terminalFocus ? 'animate-pulse' : 'opacity-50'}`}></div>
                      {!terminalInput && (
                        <div className="text-gray-500 ml-2">Start typing or use ↑ for history</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Terminal Footer */}
                  <div className="bg-gray-800 px-4 py-2 text-xs text-gray-500 flex justify-between">
                    <div>
                      History: {currentHistoryIndex > 0 ? `${currentHistoryIndex}/${commandHistory.length}` : 'Ready'}
                    </div>
                    <div className="space-x-4">
                      <span>↑/↓: History</span>
                      <span>Tab: Complete</span>
                      <span>Ctrl+R: Search</span>
                    </div>
                  </div>
                </div>
                
                {/* Instructions */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="font-medium text-gray-800 dark:text-white mb-1">Try This:</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Type "cd pro" then press <kbd>Tab</kbd>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="font-medium text-gray-800 dark:text-white mb-1">Try This:</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Press <kbd>↑</kbd> arrow to recall previous commands
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="font-medium text-gray-800 dark:text-white mb-1">Try This:</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Type "ls --" then press <kbd>Tab</kbd> twice
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Controls Panel */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Keyboard Shortcuts</h3>
                  
                  <div className="space-y-3">
                    {[
                      { keys: 'Tab', action: 'Auto-complete current word' },
                      { keys: '↑ / ↓', action: 'Navigate command history' },
                      { keys: 'Ctrl + R', action: 'Reverse search history' },
                      { keys: 'Ctrl + A', action: 'Move to beginning of line' },
                      { keys: 'Ctrl + E', action: 'Move to end of line' },
                      { keys: 'Ctrl + U', action: 'Clear line before cursor' },
                      { keys: 'Ctrl + K', action: 'Clear line after cursor' },
                      { keys: 'Ctrl + W', action: 'Delete previous word' },
                      { keys: 'Ctrl + L', action: 'Clear screen' }
                    ].map((shortcut, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex justify-between items-center">
                          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                            {shortcut.keys}
                          </kbd>
                          <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                            {shortcut.action}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* History Navigation Tips */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">History Pro Tips</h4>
                  <div className="text-sm text-gray-700 dark:text-gray-400 space-y-2">
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span>Use <code>history</code> command to see all commands</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><code>!!</code> repeats last command</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><code>!ssh</code> repeats last ssh command</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span><code>!?pattern?</code> repeats command containing pattern</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History Navigation Techniques */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Advanced History Navigation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reverse Search */}
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400">Reverse Search (Ctrl+R)</h4>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                    Search backwards through history as you type:
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="text-green-400 text-sm">Press Ctrl+R:</div>
                      <code className="font-mono text-xs text-white block mt-1">
                        (reverse-i-search)`':<span className="text-yellow-300">█</span>
                      </code>
                    </div>
                    
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="text-green-400 text-sm">Type "ssh":</div>
                      <code className="font-mono text-xs text-white block mt-1">
                        (reverse-i-search)`ssh': ssh barrackpore@research-server
                      </code>
                    </div>
                    
                    <div className="p-3 bg-gray-900 rounded-lg">
                      <div className="text-green-400 text-sm">Press Ctrl+R again:</div>
                      <code className="font-mono text-xs text-white block mt-1">
                        (reverse-i-search)`ssh': ssh tuhina@lab-pc
                      </code>
                      <div className="text-cyan-300 text-xs mt-1">
                        # Cycles through matching commands
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>Pro Tip:</strong> Press Ctrl+S to search forward (may be disabled by terminal)
                    </div>
                  </div>
                </div>
              </div>
              
              {/* History Expansion */}
              <div className="space-y-4">
                <h4 className="font-semibold text-amber-700 dark:text-amber-400">History Expansion</h4>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                    Use special symbols to recall and modify previous commands:
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { cmd: 'sudo !!', desc: 'Run last command with sudo' },
                      { cmd: '!ssh', desc: 'Run last command starting with ssh' },
                      { cmd: '!?config?', desc: 'Run last command containing "config"' },
                      { cmd: '!-2', desc: 'Run second-to-last command' },
                      { cmd: '^wrong^right', desc: 'Replace "wrong" with "right" in last command' },
                      { cmd: '!!:gs/old/new/', desc: 'Replace all "old" with "new" in last command' }
                    ].map((item, index) => (
                      <div key={index} className="p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                        <code className="font-mono text-sm text-amber-600 dark:text-amber-400">
                          $ {item.cmd}
                        </code>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* History Management */}
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
              <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4">History Management</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="font-medium text-gray-800 dark:text-white mb-2">View History</div>
                  <code className="block font-mono text-xs bg-gray-900 text-green-400 p-2 rounded mb-2">
                    $ history
                  </code>
                  <code className="block font-mono text-xs bg-gray-900 text-green-400 p-2 rounded">
                    $ history 20  # Last 20 commands
                  </code>
                </div>
                
                <div>
                  <div className="font-medium text-gray-800 dark:text-white mb-2">Search History</div>
                  <code className="block font-mono text-xs bg-gray-900 text-green-400 p-2 rounded mb-2">
                    $ history | grep ssh
                  </code>
                  <code className="block font-mono text-xs bg-gray-900 text-green-400 p-2 rounded">
                    $ Ctrl+R ssh  # Interactive search
                  </code>
                </div>
                
                <div>
                  <div className="font-medium text-gray-800 dark:text-white mb-2">Clear History</div>
                  <code className="block font-mono text-xs bg-gray-900 text-green-400 p-2 rounded mb-2">
                    $ history -c
                  </code>
                  <code className="block font-mono text-xs bg-gray-900 text-green-400 p-2 rounded">
                    $ > ~/.bash_history
                  </code>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                  <strong>Barrackpore Institute Practice:</strong> Students like Abhronila use 
                  <code className="mx-1">history | awk '{"{print $2}"}' | sort | uniq -c | sort -rn</code> 
                  to find their most used commands and create aliases for them.
                </div>
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
              {/* Tab Completion Issues */}
              <div className="space-y-4">
                <h3 className="font-semibold text-red-700 dark:text-red-400">Tab Completion Problems</h3>
                
                {[
                  {
                    problem: 'Not quoting special characters',
                    example: 'rm file with spaces.txt',
                    issue: 'Tab completes to multiple arguments',
                    solution: 'Use quotes: rm "file with spaces.txt"'
                  },
                  {
                    problem: 'Assuming completion means file exists',
                    example: 'cd /non/existent/path/',
                    issue: 'Tab completes but path doesn\'t exist',
                    solution: 'Always verify after completion'
                  },
                  {
                    problem: 'Forgetting double Tab',
                    example: 'ls --he',
                    issue: 'Thinks no completion available',
                    solution: 'Press Tab twice to see options'
                  },
                  {
                    problem: 'Case sensitivity confusion',
                    example: 'cd Documents/ (but folder is documents/)',
                    issue: 'Tab won\'t complete due to case mismatch',
                    solution: 'Check exact case or use cd D<tab>'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.problem}</div>
                    <code className="block text-sm bg-red-900/20 text-red-400 p-2 rounded mb-1 font-mono">
                      $ {item.example}
                    </code>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.issue}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">{item.solution}</div>
                  </div>
                ))}
              </div>
              
              {/* History Navigation Issues */}
              <div className="space-y-4">
                <h3 className="font-semibold text-amber-700 dark:text-amber-400">History Problems</h3>
                
                {[
                  {
                    problem: 'Accidentally running old commands',
                    example: '↑ then Enter without checking',
                    issue: 'Runs outdated/dangerous command',
                    solution: 'Always review before executing'
                  },
                  {
                    problem: 'History not saving',
                    example: 'Commands disappear after logout',
                    issue: '.bash_history not properly configured',
                    solution: 'Check HISTSIZE and HISTFILESIZE'
                  },
                  {
                    problem: 'Reverse search freeze',
                    example: 'Ctrl+R then can\'t escape',
                    issue: 'Forgot how to exit search mode',
                    solution: 'Ctrl+G to cancel, Ctrl+C also works'
                  },
                  {
                    problem: 'Sensitive data in history',
                    example: 'password=secret in command',
                    issue: 'Passwords stored in plain text',
                    solution: 'Prepend command with space or use HISTCONTROL'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.problem}</div>
                    <code className="block text-sm bg-amber-900/20 text-amber-400 p-2 rounded mb-1 font-mono">
                      $ {item.example}
                    </code>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.issue}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">{item.solution}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Debugging Guide */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Troubleshooting & Configuration</h3>
            
            <div className="space-y-6">
              {/* Configuration Tips */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4">~/.bashrc Configuration</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">Enable better history:</div>
                    <code className="block font-mono text-xs bg-gray-900 text-green-400 p-3 rounded">
                      # In ~/.bashrc<br/>
                      HISTSIZE=10000<br/>
                      HISTFILESIZE=20000<br/>
                      HISTCONTROL=ignoreboth:erasedups<br/>
                      HISTTIMEFORMAT="%F %T "<br/>
                      shopt -s histappend
                    </code>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">Better completion:</div>
                    <code className="block font-mono text-xs bg-gray-900 text-green-400 p-3 rounded">
                      # Install: sudo apt install bash-completion<br/>
                      # Then in ~/.bashrc:<br/>
                      if [ -f /etc/bash_completion ]; then<br/>
                      &nbsp;&nbsp;. /etc/bash_completion<br/>
                      fi<br/>
                      <br/>
                      # Case-insensitive completion<br/>
                      bind "set completion-ignore-case on"<br/>
                      # Show all on double Tab<br/>
                      bind "set show-all-if-ambiguous on"
                    </code>
                  </div>
                </div>
              </div>
              
              {/* Common Issues */}
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-4">Common Issues & Fixes</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">Tab completion not working</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Possible causes:</div>
                    <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1 ml-4">
                      <li>• bash-completion not installed</li>
                      <li>• Readline configuration issues</li>
                      <li>• Terminal emulator problems</li>
                      <li>• Corrupted .bashrc or .inputrc</li>
                    </ul>
                    <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                      Fix: Install bash-completion and check ~/.inputrc
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">History only shows recent session</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Possible causes:</div>
                    <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1 ml-4">
                      <li>• HISTSIZE too small</li>
                      <li>• histappend not enabled</li>
                      <li>• .bash_history not writable</li>
                      <li>• Multiple shells overwriting</li>
                    </ul>
                    <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                      Fix: Set HISTSIZE=10000 and enable histappend
                    </div>
                  </div>
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
                  title: 'Tab Completion Habits',
                  items: [
                    'Always try Tab before typing full path',
                    'Use double Tab to discover options',
                    'Quote paths with spaces/special chars',
                    'Learn program-specific completions'
                  ],
                  example: 'ssh <Tab> shows configured hosts'
                },
                {
                  title: 'History Management',
                  items: [
                    'Configure adequate history size',
                    'Use HISTCONTROL to ignore duplicates',
                    'Prefix sensitive commands with space',
                    'Regularly review and clean history'
                  ],
                  example: 'export HISTCONTROL=ignoreboth'
                },
                {
                  title: 'Keyboard Efficiency',
                  items: [
                    'Master Ctrl+R for history search',
                    'Use !! and !$ shortcuts',
                    'Learn readline editing shortcuts',
                    'Create aliases for frequent commands'
                  ],
                  example: 'alias ll="ls -la"'
                }
              ].map((category, index) => (
                <div 
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4">{category.title}</h3>
                  <ul className="space-y-2 mb-4">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-emerald-500 mr-2 mt-1">✓</span>
                        <span className="text-sm text-gray-700 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {category.example && (
                    <code className="block font-mono text-xs bg-gray-900 text-green-400 p-2 rounded">
                      {category.example}
                    </code>
                  )}
                </div>
              ))}
            </div>
            
            {/* Professional Workflow */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-emerald-200 dark:border-emerald-700">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4">Professional Terminal Workflow</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-sm text-gray-800 dark:text-gray-300 font-medium mb-2">Step 1: Discover</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Use Tab completion to explore commands and options. Type partial, press Tab twice to see possibilities.
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-gray-800 dark:text-gray-300 font-medium mb-2">Step 2: Execute</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Use Tab to complete paths, Ctrl+A/E to navigate line, Enter to execute.
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-sm text-gray-800 dark:text-gray-300 font-medium mb-2">Step 3: Repeat/Modify</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Use ↑ to recall, edit with readline shortcuts, !! to repeat, !$ for last argument.
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="text-sm text-gray-800 dark:text-gray-300 font-medium mb-2">Step 4: Refine</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Create aliases for frequent patterns, add to .bashrc for future use.
                  </div>
                </div>
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
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Teaching Strategy</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  At Barrackpore Institute, I start by having students type long paths, then show them 
                  the Tab magic. The "aha!" moment when they realize they can type 
                  <code> cd /h/s/p/r</code> + <kbd>Tab</kbd> → <code>cd /home/student/projects/research/</code> 
                  is priceless. We then practice with progressively complex commands.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Common Student Challenge</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Students like Debangshu initially resist using Tab completion, thinking it's slower. 
                  I time them: typing <code>/etc/network/interfaces.d/</code> takes 8 seconds, while 
                  <code> /e/n/i</code> + <kbd>Tab</kbd> takes 2 seconds. The numbers convince them.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Professional Insight</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  At Shyamnagar data center, we measure productivity by Tab usage. Senior admins use 
                  Tab 15-20 times per minute. We've written custom completion scripts for all our 
                  internal tools, making complex commands as simple as typing a few letters and 
                  pressing Tab.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Safety Reminder</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Always review before pressing Enter!</strong> Tab completion can suggest 
                  wrong files, and ↑ can recall dangerous commands. Abhronila once almost ran 
                  <code> rm -rf /home/production/</code> instead of <code>rm -rf /home/test/</code> 
                  because she didn't check after history recall.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-400 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Power User Tips & Tricks</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400">Customization</h4>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Better prompt with history number:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # In ~/.bashrc<br/>
                    export PS1='\[\e[32m\]\! \[\e[33m\]\u@\h\[\e[0m\]:\[\e[34m\]\w\[\e[0m\]\$ '
                  </code>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Shows history number (!) in prompt for easy reference
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Alias for common history operations:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    alias h='history'<br/>
                    alias hg='history | grep'<br/>
                    alias hc='history -c'<br/>
                    alias h10='history 10'
                  </code>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400">Advanced Techniques</h4>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Reuse arguments from history:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    $ ls /very/long/complicated/path<br/>
                    $ cd !$  # Changes to that path<br/>
                    <br/>
                    $ cp file1.txt /backup/<br/>
                    $ cp file2.txt !$  # Copies to same destination
                  </code>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Search and execute in one step:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    $ !?config?:p  # Print without executing<br/>
                    $ !!:p        # Print last command<br/>
                    $ ^wrong^right:p  # Print with replacement
                  </code>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
              <div className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">💡</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white mb-1">Ultimate Pro Tip:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Combine everything: Use Tab completion to start, history navigation to repeat, 
                    readline shortcuts to edit, and aliases to save patterns. A Barrackpore Institute 
                    student who masters these can outperform others by 3x in terminal tasks.
                  </p>
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
                Topic 14: Terminal Efficiency
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white leading-tight">
                Tab Completion and Command History Navigation
                <span className="block text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Master terminal efficiency with auto-completion and smart history recall
                </span>
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'concept', label: 'Core Concept', icon: '🧠' },
                { id: 'interactive', label: 'Interactive', icon: '⌨️' },
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
            {activeTab === 'interactive' && this.renderInteractiveSection()}
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
                  <li>• Tab: Auto-complete commands/files/paths</li>
                  <li>• ↑/↓: Navigate command history</li>
                  <li>• Ctrl+R: Reverse search history</li>
                  <li>• !!: Repeat last command</li>
                  <li>• Readline shortcuts: Ctrl+A/E/U/K</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Use Tab to navigate deep directories</li>
                  <li>• Practice Ctrl+R history search</li>
                  <li>• Create and use command aliases</li>
                  <li>• Configure ~/.bashrc for better history</li>
                  <li>• Master readline editing shortcuts</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Barrackpore Institute</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Terminal efficiency skills that make Barrackpore Institute students 2-3x more productive 
                  in system administration tasks across all campuses.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-500">
              <p>Topic 13: Terminal Efficiency • Productivity Mastery • Barrackpore Institute</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}