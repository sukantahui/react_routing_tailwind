// Topic6.jsx - Hidden Files and Folders
import React, { Component } from 'react';

export default class Topic6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeSection: 'basics',
      showHiddenFiles: false,
      selectedHiddenFile: null,
      searchTerm: '',
      hiddenFiles: [
        { name: '.bashrc', type: 'config', owner: 'swadeep', description: 'Shell configuration file', importance: 'high', size: '3.7K' },
        { name: '.bash_history', type: 'history', owner: 'swadeep', description: 'Command history', importance: 'medium', size: '12K' },
        { name: '.ssh/', type: 'directory', owner: 'swadeep', description: 'SSH keys and config', importance: 'high', size: '4.0K' },
        { name: '.gitignore', type: 'config', owner: 'swadeep', description: 'Git ignore patterns', importance: 'medium', size: '0.5K' },
        { name: '.profile', type: 'config', owner: 'swadeep', description: 'Login shell configuration', importance: 'high', size: '2.1K' },
        { name: '.config/', type: 'directory', owner: 'swadeep', description: 'Application configurations', importance: 'high', size: '8.0K' },
        { name: '.cache/', type: 'directory', owner: 'swadeep', description: 'Application cache', importance: 'low', size: '24M' },
        { name: '.local/', type: 'directory', owner: 'swadeep', description: 'Local user data', importance: 'medium', size: '16M' },
        { name: '.vimrc', type: 'config', owner: 'tuhina', description: 'Vim editor configuration', importance: 'medium', size: '1.2K' },
        { name: '.npmrc', type: 'config', owner: 'abhronila', description: 'npm configuration', importance: 'medium', size: '0.8K' },
        { name: '.docker/', type: 'directory', owner: 'debangshu', description: 'Docker configuration', importance: 'medium', size: '4.0K' }
      ],
      systemHidden: [
        { name: '.', type: 'special', owner: 'root', description: 'Current directory', importance: 'system', size: '4.0K' },
        { name: '..', type: 'special', owner: 'root', description: 'Parent directory', importance: 'system', size: '4.0K' },
        { name: '.hidden', type: 'config', owner: 'root', description: 'Forces files to be hidden', importance: 'low', size: '0.1K' },
        { name: '.Trash/', type: 'directory', owner: 'user', description: 'Deleted files (some DEs)', importance: 'low', size: 'varies' }
      ],
      securityFiles: [
        { name: '.ssh/id_rsa', type: 'key', owner: 'user', description: 'Private SSH key', protection: '600' },
        { name: '.ssh/id_rsa.pub', type: 'key', owner: 'user', description: 'Public SSH key', protection: '644' },
        { name: '.ssh/authorized_keys', type: 'config', owner: 'user', description: 'Allowed SSH keys', protection: '600' },
        { name: '.gnupg/', type: 'directory', owner: 'user', description: 'GPG keys', protection: '700' },
        { name: '.netrc', type: 'config', owner: 'user', description: 'Network credentials', protection: '600' }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isMounted: true });
    }, 100);
  }

  handleSectionChange = (section) => {
    this.setState({ activeSection: section });
  };

  toggleHiddenFiles = () => {
    this.setState(prevState => ({ showHiddenFiles: !prevState.showHiddenFiles }));
  };

  handleFileSelect = (fileName) => {
    this.setState({ selectedHiddenFile: fileName });
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  getSelectedFileDetails = () => {
    const { selectedHiddenFile, hiddenFiles, systemHidden, securityFiles } = this.state;
    
    const allFiles = [...hiddenFiles, ...systemHidden];
    const selected = allFiles.find(file => file.name === selectedHiddenFile) || 
                    securityFiles.find(file => file.name === selectedHiddenFile);
    
    if (!selected) return null;
    
    return {
      ...selected,
      fullPath: selected.name.includes('/') ? `~/${selected.name}` : `~/.${selected.name}`,
      viewCommand: selected.type === 'directory' ? `ls -la ~/${selected.name}` : `cat ~/${selected.name}`,
      editCommand: `nano ~/${selected.name}`,
      dangerLevel: selected.importance === 'high' ? 'High' : 
                   selected.importance === 'system' ? 'System' : 'Moderate'
    };
  };

  getFilteredFiles = () => {
    const { hiddenFiles, systemHidden, searchTerm, showHiddenFiles } = this.state;
    let allFiles = [...hiddenFiles];
    
    if (showHiddenFiles) {
      allFiles = [...allFiles, ...systemHidden];
    }
    
    if (!searchTerm) return allFiles;
    
    return allFiles.filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  render() {
    const { isMounted, activeSection, showHiddenFiles, selectedHiddenFile, searchTerm } = this.state;
    
    // Animation styles
    const baseAnimation = isMounted 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4';

    const animationStyle = `
      @keyframes reveal {
        from { 
          opacity: 0;
          transform: scale(0.95);
        }
        to { 
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes pulseWarning {
        0%, 100% { 
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
        }
        70% { 
          box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
        }
      }
      
      @keyframes pulseSafe {
        0%, 100% { 
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
        }
        70% { 
          box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
        }
      }
      
      .animate-reveal {
        animation: reveal 0.5s ease-out;
      }
      
      .animate-pulse-warning {
        animation: pulseWarning 2s infinite;
      }
      
      .animate-pulse-safe {
        animation: pulseSafe 2s infinite;
      }
    `;

    const filteredFiles = this.getFilteredFiles();
    const selectedFileDetails = this.getSelectedFileDetails();

    // Section data
    const sections = {
      basics: {
        title: 'Basics',
        icon: '📚',
        color: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
        borderColor: 'border-blue-200 dark:border-blue-700'
      },
      practical: {
        title: 'Practical Use',
        icon: '🔧',
        color: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
        borderColor: 'border-green-200 dark:border-green-700'
      },
      security: {
        title: 'Security',
        icon: '🔒',
        color: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
        borderColor: 'border-red-200 dark:border-red-700'
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-900 p-4 md:p-8 transition-colors duration-300">
        <style>{animationStyle}</style>
        
        {/* Header Section */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`}>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🔒</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Hidden Files and Folders – Why They Exist and How They Are Used
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              Discover the invisible world of dotfiles – configuration files, personal settings, 
              and sensitive data that power your Linux experience
            </p>
          </div>

          {/* Section Navigation */}
          <div className={`flex flex-wrap gap-3 mb-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-500 ${baseAnimation}`} style={{animationDelay: '200ms'}}>
            {Object.keys(sections).map((section, index) => (
              <button
                key={section}
                className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${activeSection === section 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => this.handleSectionChange(section)}
                style={{animationDelay: `${300 + index * 100}ms`}}
              >
                <span className="text-xl mr-3">{sections[section].icon}</span>
                <div className="text-left">
                  <div className="font-bold">{sections[section].title}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Main Content - Basics Section */}
        {activeSection === 'basics' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Explanation */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
                {/* What are Hidden Files */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-3">🔍</span> What are Hidden Files?
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      In Linux, any file or directory whose name begins with a <span className="font-bold text-blue-600 dark:text-blue-400">dot (.)</span> 
                      is considered "hidden". These are not shown in normal directory listings.
                    </p>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Barrackpore Institute Analogy</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Think of hidden files like the electrical wiring and plumbing behind walls. 
                        They're essential for the building to function, but you don't see them during normal use.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Hidden Files Start With</h4>
                        <code className="text-3xl font-mono text-blue-600 dark:text-blue-400">.</code>
                        <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
                          .bashrc, .gitignore, .ssh/
                        </p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Reveal With</h4>
                        <code className="text-xl font-mono text-green-600 dark:text-green-400">ls -a</code>
                        <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
                          The <code className="font-mono">-a</code> flag shows all files
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Hidden Files Exist */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Why Do Hidden Files Exist?</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        reason: 'Reduce Clutter',
                        description: 'Keeps directory listings clean by hiding configuration files',
                        example: 'Swadeep sees only his projects, not 20 config files'
                      },
                      {
                        reason: 'Prevent Accidental Changes',
                        description: 'Important settings are less likely to be modified or deleted',
                        example: '.bashrc contains shell settings - critical but rarely edited'
                      },
                      {
                        reason: 'Organize User Space',
                        description: 'Separates user-created content from system-managed config',
                        example: 'Projects in ~/ vs configurations in ~/.config/'
                      },
                      {
                        reason: 'Security through Obscurity',
                        description: 'Sensitive files are not immediately visible',
                        example: 'SSH keys in ~/.ssh/ are hidden from casual view'
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-start mb-2">
                          <span className="text-xl mr-3">
                            {index === 0 ? '📁' : 
                             index === 1 ? '⚠️' : 
                             index === 2 ? '🗂️' : '🔒'}
                          </span>
                          <div>
                            <h4 className="font-semibold text-blue-600 dark:text-blue-400">{item.reason}</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                          Example: {item.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Interactive Explorer */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
                {/* Hidden Files Explorer */}
                <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-300">Hidden Files Explorer</h2>
                    <button
                      onClick={this.toggleHiddenFiles}
                      className={`px-4 py-2 rounded-lg font-medium ${showHiddenFiles 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {showHiddenFiles ? 'Hide System Files' : 'Show System Files'}
                    </button>
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <div className="text-gray-400 mb-2">Search Hidden Files:</div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={this.handleSearchChange}
                      placeholder="Search by name, type, or description..."
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* File List */}
                  <div className="h-96 overflow-y-auto bg-black/30 rounded-lg p-2">
                    <div className="space-y-2">
                      {filteredFiles.map((file, index) => {
                        const isSelected = selectedHiddenFile === file.name;
                        const importanceColor = file.importance === 'high' ? 'border-red-500' :
                                              file.importance === 'system' ? 'border-purple-500' :
                                              file.importance === 'medium' ? 'border-yellow-500' : 'border-green-500';
                        
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${importanceColor} ${isSelected 
                              ? 'bg-gray-700' 
                              : 'bg-gray-800/50 hover:bg-gray-700'
                            } animate-reveal`}
                            style={{animationDelay: `${index * 50}ms`}}
                            onClick={() => this.handleFileSelect(file.name)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <span className="text-xl mr-3">
                                  {file.type === 'directory' ? '📁' : 
                                   file.type === 'config' ? '⚙️' : 
                                   file.type === 'history' ? '📜' : '📄'}
                                </span>
                                <code className="font-mono text-gray-300">{file.name}</code>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-400">
                                  {file.type}
                                </span>
                                {file.importance === 'high' && (
                                  <span className="text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded">
                                    Critical
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{file.description}</p>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Owner: {file.owner}</span>
                              <span>Size: {file.size}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="p-3 bg-gray-700 rounded-lg text-center">
                      <div className="text-gray-400 text-sm">Total Hidden</div>
                      <div className="text-white text-xl">{filteredFiles.length}</div>
                    </div>
                    <div className="p-3 bg-gray-700 rounded-lg text-center">
                      <div className="text-gray-400 text-sm">Directories</div>
                      <div className="text-white text-xl">
                        {filteredFiles.filter(f => f.type === 'directory').length}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-700 rounded-lg text-center">
                      <div className="text-gray-400 text-sm">Critical Files</div>
                      <div className="text-white text-xl">
                        {filteredFiles.filter(f => f.importance === 'high').length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ls Command Demonstration */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Viewing Hidden Files</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-700 dark:text-gray-300 mb-2">Normal listing (hides dotfiles):</div>
                      <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        $ ls<br/>
                        Documents  Downloads  Pictures  todo.txt
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-700 dark:text-gray-300 mb-2">Show all files (including hidden):</div>
                      <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        $ ls -a<br/>
                        .  ..  .bashrc  .ssh  Documents  Downloads  .gitignore  Pictures  todo.txt
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-700 dark:text-gray-300 mb-2">Detailed view with hidden files:</div>
                      <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                        $ ls -la<br/>
                        total 48<br/>
                        drwxr-xr-x 7 swadeep students 4096 Jan 16 .<br/>
                        drwxr-xr-x 4 root    root     4096 Jan 15 ..<br/>
                        -rw-r--r-- 1 swadeep students 3771 Jan 15 .bashrc<br/>
                        drwx------ 2 swadeep students 4096 Jan 14 .ssh<br/>
                        ...
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Practical Section */}
        {activeSection === 'practical' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Common Hidden Files */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
                {/* Essential Hidden Files */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-3">⚙️</span> Essential Hidden Files You Should Know
                  </h2>
                  
                  <div className="space-y-4">
                    {[
                      {
                        name: '.bashrc',
                        purpose: 'Shell configuration',
                        location: '~/.bashrc',
                        importance: 'Every command you type is affected by this',
                        editCommand: 'nano ~/.bashrc'
                      },
                      {
                        name: '.ssh/',
                        purpose: 'SSH keys and config',
                        location: '~/.ssh/',
                        importance: 'Secure remote access to servers',
                        editCommand: 'nano ~/.ssh/config'
                      },
                      {
                        name: '.gitconfig',
                        purpose: 'Git configuration',
                        location: '~/.gitconfig',
                        importance: 'Git username, email, aliases',
                        editCommand: 'git config --global user.name "Your Name"'
                      },
                      {
                        name: '.profile',
                        purpose: 'Login shell setup',
                        location: '~/.profile',
                        importance: 'Runs when you login (once)',
                        editCommand: 'nano ~/.profile'
                      },
                      {
                        name: '.config/',
                        purpose: 'Application settings',
                        location: '~/.config/',
                        importance: 'Modern apps store config here',
                        editCommand: 'ls -la ~/.config/'
                      }
                    ].map((file, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <code className="font-mono font-bold text-blue-600 dark:text-blue-400">{file.name}</code>
                            <div className="text-sm text-gray-700 dark:text-gray-400">{file.purpose}</div>
                          </div>
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                            {file.location}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{file.importance}</p>
                        <code className="text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded block">
                          {file.editCommand}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Creating Hidden Files */}
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg border border-green-200 dark:border-green-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Working with Hidden Files</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Create a Hidden File</h4>
                      <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                        $ touch .mysecretfile
                      </code>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Files starting with dot are automatically hidden
                      </p>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Make Existing File Hidden</h4>
                      <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                        $ mv config.txt .config.txt
                      </code>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Just rename it to start with a dot
                      </p>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">View Specific Hidden File</h4>
                      <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                        $ cat .bashrc | head -20
                      </code>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        You can access hidden files directly by name
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Selected File Details & Scenarios */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
                {/* Selected File Details */}
                {selectedFileDetails && (
                  <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-300 mb-4">
                      Selected: <code className="font-mono text-blue-400">{selectedFileDetails.name}</code>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-700 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">Type</div>
                          <div className="font-mono text-sm text-white">{selectedFileDetails.type}</div>
                        </div>
                        <div className="p-3 bg-gray-700 rounded-lg">
                          <div className="text-xs text-gray-400 mb-1">Importance</div>
                          <div className={`font-semibold ${
                            selectedFileDetails.dangerLevel === 'High' ? 'text-red-400' :
                            selectedFileDetails.dangerLevel === 'System' ? 'text-purple-400' : 'text-yellow-400'
                          }`}>
                            {selectedFileDetails.dangerLevel}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Full Path</div>
                        <code className="block font-mono text-blue-400 bg-black/50 p-2 rounded">
                          {selectedFileDetails.fullPath}
                        </code>
                      </div>
                      
                      <div>
                        <div className="text-gray-400 text-sm mb-1">View Contents</div>
                        <code className="block font-mono text-green-400 bg-black/50 p-2 rounded">
                          $ {selectedFileDetails.viewCommand}
                        </code>
                      </div>
                      
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Edit File</div>
                        <code className="block font-mono text-yellow-400 bg-black/50 p-2 rounded">
                          $ {selectedFileDetails.editCommand}
                        </code>
                      </div>
                      
                      <div className="p-3 bg-gray-700/50 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Description</div>
                        <p className="text-sm text-gray-300">{selectedFileDetails.description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Real-world Scenarios */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Student Scenarios</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3">
                          👨‍🎓
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Swadeep's Shell Issue</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                        Commands not working after editing .bashrc
                      </p>
                      <code className="block text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        # Fix: Restore from backup or use default<br/>
                        $ cp .bashrc.bak .bashrc<br/>
                        $ source .bashrc
                      </code>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 mr-3">
                          👩‍🎓
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Tuhina's Git Problem</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                        Git showing wrong email in commits
                      </p>
                      <code className="block text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        # Solution: Edit .gitconfig<br/>
                        $ nano ~/.gitconfig<br/>
                        [user]<br/>
                        &nbsp;&nbsp;name = Tuhina Das<br/>
                        &nbsp;&nbsp;email = tuhina@barrackpore.institute
                      </code>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
                          👨‍🎓
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Debangshu's SSH Setup</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                        Setting up SSH keys for server access
                      </p>
                      <code className="block text-xs font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        # Generate SSH key pair<br/>
                        $ ssh-keygen -t rsa -b 4096<br/>
                        # Keys saved in ~/.ssh/id_rsa (hidden)<br/>
                        $ ls -la ~/.ssh/
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Security Section */}
        {activeSection === 'security' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Security Files */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
                {/* Sensitive Hidden Files */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-3">⚠️</span> Sensitive Hidden Files
                  </h2>
                  
                  <div className="space-y-4">
                    {this.state.securityFiles.map((file, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border-l-4 ${
                          file.protection === '600' ? 'border-red-500 animate-pulse-warning' :
                          file.protection === '700' ? 'border-orange-500' : 'border-yellow-500'
                        } bg-gray-50 dark:bg-gray-700/50`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-xl mr-3">🔐</span>
                            <code className="font-mono font-bold text-gray-800 dark:text-gray-200">{file.name}</code>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            file.protection === '600' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                            file.protection === '700' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                            'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                          }`}>
                            Permissions: {file.protection}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">{file.description}</p>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Security Note:</span> {file.protection === '600' 
                            ? 'Extremely sensitive - keep private!' 
                            : file.protection === '700'
                            ? 'Directory - restrict access'
                            : 'Share only with trusted parties'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Best Practices */}
                <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg border border-red-200 dark:border-red-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Security Best Practices</h3>
                  
                  <div className="space-y-3">
                    {[
                      'Never share ~/.ssh/id_rsa (private key) with anyone',
                      'Keep ~/.ssh/ directory permissions as 700',
                      'Regularly check ~/.bash_history for sensitive commands',
                      'Be cautious with ~/.netrc - it stores passwords in plain text',
                      'Use different SSH keys for different services',
                      'Backup important dotfiles regularly',
                      'Review ~/.ssh/authorized_keys periodically',
                      'Consider encrypting sensitive dotfile directories'
                    ].map((practice, index) => (
                      <div key={index} className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                        <span className={`mr-3 ${index < 4 ? 'text-red-500' : 'text-orange-500'}`}>
                          {index < 4 ? '🔴' : '🟠'}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-400">{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Interactive Security */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
                {/* Permission Checker */}
                <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-300 mb-4">Security Check Tool</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Check SSH directory permissions:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        $ ls -ld ~/.ssh<br/>
                        drwx------ 2 swadeep students 4096 Jan 14 .ssh
                      </code>
                      <div className="mt-2 p-2 bg-green-900/30 text-green-400 text-sm rounded">
                        ✓ Correct: Directory is 700 (drwx------)
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Check private key permissions:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-3 rounded">
                        $ ls -l ~/.ssh/id_rsa<br/>
                        -rw------- 1 swadeep students 3389 Jan 14 id_rsa
                      </code>
                      <div className="mt-2 p-2 bg-green-900/30 text-green-400 text-sm rounded">
                        ✓ Correct: File is 600 (-rw-------)
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Fix incorrect permissions:</div>
                      <code className="block font-mono text-yellow-400 bg-black/50 p-3 rounded">
                        $ chmod 700 ~/.ssh<br/>
                        $ chmod 600 ~/.ssh/id_rsa<br/>
                        $ chmod 644 ~/.ssh/id_rsa.pub
                      </code>
                    </div>
                  </div>
                </div>

                {/* Common Security Mistakes */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Common Security Mistakes</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Mistake 1: World-readable SSH keys</h4>
                      <code className="block text-xs font-mono bg-red-100 dark:bg-red-900/30 p-2 rounded mb-2">
                        $ ls -l .ssh/id_rsa<br/>
                        -rw-r--r--   # WRONG! Should be -rw-------
                      </code>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        SSH will refuse to use keys with incorrect permissions
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Mistake 2: Backing up sensitive files</h4>
                      <code className="block text-xs font-mono bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded mb-2">
                        $ cp -r ~/.ssh /media/usb/  # DANGER!
                      </code>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Private keys should never leave encrypted systems
                      </p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Mistake 3: Command history exposure</h4>
                      <code className="block text-xs font-mono bg-orange-100 dark:bg-orange-900/30 p-2 rounded mb-2">
                        $ grep -i password ~/.bash_history
                      </code>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Always check .bash_history doesn't contain sensitive commands
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teacher's Note */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '800ms'}}>
          <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg border border-amber-200 dark:border-yellow-700 hover:shadow-xl transition-all duration-500">
            <div className="flex items-start">
              <div className="mr-4 text-3xl">👨‍🏫</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Teacher's Note</h2>
                
                <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">Key Insight:</span> 
                    Hidden files are the "control panel" of your Linux experience. They're hidden not to be secret, 
                    but to prevent accidental changes to critical configurations.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    At Naihati Computer Lab, I teach this golden rule:
                    <span className="font-mono block mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <span className="text-blue-600">ls -a</span> to see everything<br/>
                      <span className="text-green-600">nano .file</span> to edit carefully<br/>
                      <span className="text-red-600">chmod 600</span> for sensitive files
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Memory Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Dotfiles = Configuration files<br/>
                      Hidden ≠ Secret<br/>
                      Hidden = "Don't touch casually"
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Debugging Flow</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      1. Check relevant dotfile<br/>
                      2. Backup before editing<br/>
                      3. Test changes carefully
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-100/50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">Security Rule</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      SSH keys: 600 for private<br/>
                      SSH directory: 700<br/>
                      Always verify permissions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Quiz */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1000ms'}}>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🧠</span> Knowledge Check
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Scenario Analysis</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  Abhronila at Shyamnagar College encounters these situations:
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      She can't see her .bashrc file when using plain <code>ls</code>. What command should she use?
                    </p>
                    <div className="space-y-2">
                      {['ls -l', 'ls -a', 'ls -h', 'ls -t'].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`q1-${idx}`} name="q1" className="mr-2" />
                          <label htmlFor={`q1-${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      SSH complains "Bad permissions" for her key file. What permissions should ~/.ssh/id_rsa have?
                    </p>
                    <div className="space-y-2">
                      {['644', '755', '600', '777'].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`q2-${idx}`} name="q2" className="mr-2" />
                          <label htmlFor={`q2-${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      She wants to create a hidden file for project secrets. How does she name it?
                    </p>
                    <div className="space-y-2">
                      {['secret.txt', '.secret.txt', '_secret.txt', '~secret.txt'].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`q3-${idx}`} name="q3" className="mr-2" />
                          <label htmlFor={`q3-${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">File Identification</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Which of these are typically hidden files? (Select all that apply)
                    </p>
                    <div className="space-y-2">
                      {[
                        { name: '.bashrc', hidden: true },
                        { name: 'Documents/', hidden: false },
                        { name: '.ssh/', hidden: true },
                        { name: 'todo.txt', hidden: false },
                        { name: '.gitignore', hidden: true },
                        { name: 'Downloads/', hidden: false }
                      ].map((file, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="checkbox" id={`file-${idx}`} className="mr-2" />
                          <label htmlFor={`file-${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{file.name}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 text-sm">Think About</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Why would you hide a file instead of putting it in a regular directory? 
                      What are the trade-offs between using hidden files vs a .config/ directory?
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 text-sm">Quick Challenge</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Write a command to list all hidden files in your home directory, 
                      sorted by modification time (newest first).
                    </p>
                    <div className="mt-2 font-mono text-xs bg-black/50 p-2 rounded">
                      $ <span className="text-gray-400">Type your answer here...</span>
                    </div>
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
              <span className="font-semibold">Topic 7</span> of Linux Fundamentals Series
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                ← Previous: Absolute vs Relative Paths
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Next: Tree Command & Visualization →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}