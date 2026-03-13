// Topic3.jsx - ls Advanced Options: -l, -a, -h, -R, -t, -S
import React, { Component } from 'react';

export default class Topic3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeOption: '-l',
      showFileSystem: true,
      selectedFiles: [],
      lsOptions: {
        '-l': true,
        '-a': false,
        '-h': true,
        '-R': false,
        '-t': false,
        '-S': false
      },
      currentDirectory: 'projects',
      fileList: [
        { name: 'project1.py', size: 2048, permissions: '-rw-r--r--', owner: 'swadeep', group: 'students', modified: 'Jan 16 10:30', type: 'file' },
        { name: 'project2.py', size: 4096, permissions: '-rwxr-xr-x', owner: 'swadeep', group: 'students', modified: 'Jan 15 14:20', type: 'file' },
        { name: 'notes.txt', size: 512, permissions: '-rw-r--r--', owner: 'swadeep', group: 'students', modified: 'Jan 14 09:15', type: 'file' },
        { name: 'data.csv', size: 10240, permissions: '-rw-r--r--', owner: 'swadeep', group: 'students', modified: 'Jan 13 16:45', type: 'file' },
        { name: '.gitignore', size: 128, permissions: '-rw-r--r--', owner: 'swadeep', group: 'students', modified: 'Jan 12 11:10', type: 'hidden' },
        { name: '.env', size: 64, permissions: '-rw-------', owner: 'swadeep', group: 'students', modified: 'Jan 11 08:30', type: 'hidden' },
        { name: 'src', size: 4096, permissions: 'drwxr-xr-x', owner: 'swadeep', group: 'students', modified: 'Jan 10 15:20', type: 'directory' },
        { name: 'docs', size: 8192, permissions: 'drwxr-xr-x', owner: 'swadeep', group: 'students', modified: 'Jan 09 13:40', type: 'directory' },
        { name: 'tests', size: 2048, permissions: 'drwxr-xr-x', owner: 'swadeep', group: 'students', modified: 'Jan 08 10:15', type: 'directory' },
        { name: 'README.md', size: 1024, permissions: '-rw-r--r--', owner: 'swadeep', group: 'students', modified: 'Jan 07 17:30', type: 'file' }
      ]
    };
  }

  componentDidMount() {
    // Trigger animations after component mounts
    setTimeout(() => {
      this.setState({ isMounted: true });
    }, 100);
  }

  handleOptionSelect = (option) => {
    this.setState({ activeOption: option });
  };

  toggleOption = (option) => {
    this.setState(prevState => ({
      lsOptions: {
        ...prevState.lsOptions,
        [option]: !prevState.lsOptions[option]
      }
    }));
  };

  handleFileSelect = (fileName) => {
    this.setState(prevState => ({
      selectedFiles: prevState.selectedFiles.includes(fileName)
        ? prevState.selectedFiles.filter(name => name !== fileName)
        : [...prevState.selectedFiles, fileName]
    }));
  };

  getSortedFiles = () => {
    const { fileList, lsOptions } = this.state;
    let sortedFiles = [...fileList];

    // Apply -a filter (show hidden files)
    if (!lsOptions['-a']) {
      sortedFiles = sortedFiles.filter(file => file.type !== 'hidden');
    }

    // Apply -t sort (by modification time)
    if (lsOptions['-t']) {
      sortedFiles.sort((a, b) => new Date(b.modified) - new Date(a.modified));
    }

    // Apply -S sort (by size)
    if (lsOptions['-S'] && !lsOptions['-t']) { // -t takes precedence
      sortedFiles.sort((a, b) => b.size - a.size);
    }

    return sortedFiles;
  };

  formatFileSize = (size) => {
    const { lsOptions } = this.state;
    if (lsOptions['-h']) {
      // Human readable format
      const units = ['B', 'K', 'M', 'G', 'T'];
      let index = 0;
      let formattedSize = size;
      while (formattedSize >= 1024 && index < units.length - 1) {
        formattedSize /= 1024;
        index++;
      }
      return `${formattedSize.toFixed(1)}${units[index]}`;
    }
    return size.toString(); // Raw size in bytes
  };

  getFileIcon = (file) => {
    if (file.type === 'directory') return '📁';
    if (file.type === 'hidden') return '🔒';
    if (file.name.endsWith('.py')) return '🐍';
    if (file.name.endsWith('.txt') || file.name.endsWith('.md')) return '📝';
    if (file.name.endsWith('.csv')) return '📊';
    return '📄';
  };

  getPermissionColor = (permissions) => {
    if (permissions.includes('rwx')) return 'text-green-600 dark:text-green-400';
    if (permissions.includes('rw-')) return 'text-blue-600 dark:text-blue-400';
    if (permissions.includes('r--')) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  render() {
    const { isMounted, activeOption, lsOptions, selectedFiles, currentDirectory } = this.state;
    const sortedFiles = this.getSortedFiles();

    // Option details
    const optionDetails = {
      '-l': {
        name: '-l',
        fullName: 'Long Listing Format',
        description: 'Displays detailed information about each file/directory',
        columns: [
          { name: 'Permissions', description: 'File access rights (rwx)' },
          { name: 'Links', description: 'Number of hard links' },
          { name: 'Owner', description: 'File owner username' },
          { name: 'Group', description: 'File group name' },
          { name: 'Size', description: 'File size in bytes' },
          { name: 'Modified', description: 'Last modification date/time' },
          { name: 'Name', description: 'File/directory name' }
        ],
        example: 'ls -l',
        realWorld: 'Like a detailed inventory list at Barrackpore Institute library',
        professionalUse: 'Essential for permission debugging and file management',
        icon: '📊'
      },
      '-a': {
        name: '-a',
        fullName: 'All Files',
        description: 'Shows all files including hidden ones (starting with .)',
        explanation: 'Hidden files are typically configuration files that should not be modified casually',
        example: 'ls -a',
        realWorld: 'Looking behind the scenes - like seeing staff-only areas in the institute',
        professionalUse: 'Essential for system administration and configuration',
        icon: '👁️'
      },
      '-h': {
        name: '-h',
        fullName: 'Human Readable',
        description: 'Displays file sizes in human-readable format (K, M, G)',
        conversions: [
          { bytes: 1024, display: '1.0K' },
          { bytes: 1048576, display: '1.0M' },
          { bytes: 1073741824, display: '1.0G' }
        ],
        example: 'ls -lh',
        realWorld: 'Using meters/kilometers instead of just millimeters',
        professionalUse: 'Always combine with -l for readable output',
        icon: '👤'
      },
      '-R': {
        name: '-R',
        fullName: 'Recursive',
        description: 'Lists directories recursively, showing contents of subdirectories',
        explanation: 'Traverses through all nested directories in the tree structure',
        example: 'ls -R',
        realWorld: 'Exploring every classroom and storage room in the entire institute',
        professionalUse: 'Useful for finding files in complex directory structures',
        warning: 'Can produce lengthy output on large directories',
        icon: '🌳'
      },
      '-t': {
        name: '-t',
        fullName: 'Time Sort',
        description: 'Sorts files by modification time, newest first',
        explanation: 'Useful for finding recently modified files',
        example: 'ls -lt',
        realWorld: 'Checking the most recent notice on the college board',
        professionalUse: 'Debugging - find what files changed recently',
        combination: 'Often used with -l: ls -lt',
        icon: '⏰'
      },
      '-S': {
        name: '-S',
        fullName: 'Size Sort',
        description: 'Sorts files by size, largest first',
        explanation: 'Helps identify large files that might be consuming disk space',
        example: 'ls -lS',
        realWorld: 'Finding which books take the most shelf space in the library',
        professionalUse: 'Disk space management and cleanup operations',
        combination: 'Usually combined with -l and -h: ls -lhS',
        icon: '⚖️'
      }
    };

    // Current option data
    const currentOption = optionDetails[activeOption];

    // Animation styles
    const baseAnimation = isMounted 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4';

    // Inline keyframes
    const animationStyle = `
      @keyframes fileHighlight {
        0% { background-color: rgba(59, 130, 246, 0.1); }
        100% { background-color: transparent; }
      }
      
      @keyframes optionPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes permissionFlash {
        0%, 100% { color: inherit; }
        50% { color: #3b82f6; }
      }
      
      .animate-file-highlight {
        animation: fileHighlight 1.5s ease-out;
      }
      
      .animate-option-pulse {
        animation: optionPulse 2s infinite;
      }
      
      .animate-permission-flash {
        animation: permissionFlash 1s ease-in-out;
      }
    `;

    // Generate ls command based on selected options
    const generateLsCommand = () => {
      const activeOptions = Object.entries(lsOptions)
        .filter(([opt, enabled]) => enabled)
        .map(([opt]) => opt)
        .join('');
      
      return `ls ${activeOptions} ${currentDirectory}`;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 p-4 md:p-8 transition-colors duration-300">
        <style>{animationStyle}</style>
        
        {/* Header Section */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`}>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🔍</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                ls Advanced Options: -l, -a, -h, -R, -t, -S
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              Master professional file listing techniques used by Linux experts worldwide
            </p>
          </div>

          {/* Option Navigation */}
          <div className={`flex flex-wrap gap-3 mb-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm transition-all duration-500 ${baseAnimation}`} style={{animationDelay: '200ms'}}>
            {Object.keys(optionDetails).map((option, index) => (
              <button
                key={option}
                className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center ${activeOption === option 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => this.handleOptionSelect(option)}
                style={{animationDelay: `${300 + index * 100}ms`}}
              >
                <span className="text-xl mr-3">{optionDetails[option].icon}</span>
                <div className="text-left">
                  <div className="font-bold font-mono">{optionDetails[option].name}</div>
                  <div className="text-xs opacity-80">{optionDetails[option].fullName}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Option Details */}
            <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
              {/* Option Header */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{currentOption.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-mono">
                      {currentOption.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentOption.fullName}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentOption.description}
                  </p>
                  {currentOption.explanation && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      {currentOption.explanation}
                    </p>
                  )}
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Example Command</h3>
                  <div className="font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                    {currentOption.example}
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Real-world Analogy</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {currentOption.realWorld}
                  </p>
                </div>

                {/* Option-specific details */}
                {currentOption.columns && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Columns in -l Output</h4>
                    <div className="space-y-2">
                      {currentOption.columns.map((col, index) => (
                        <div key={index} className="flex items-start p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                          <span className="font-mono text-sm text-blue-600 dark:text-blue-400 min-w-[80px]">
                            {col.name}
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-400 ml-2">
                            {col.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentOption.conversions && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Size Conversions</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {currentOption.conversions.map((conv, index) => (
                        <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded text-center">
                          <div className="font-mono text-sm">{conv.bytes.toLocaleString()}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">→ {conv.display}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentOption.warning && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">⚠️ Warning</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      {currentOption.warning}
                    </p>
                  </div>
                )}
              </div>

              {/* Professional Usage Tips */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg border border-green-200 dark:border-green-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Professional Usage</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">Common Combinations</h4>
                    <div className="space-y-1 mt-2">
                      <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        ls -la   # Show all files with details
                      </code>
                      <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        ls -lht  # Human readable, sorted by time
                      </code>
                      <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        ls -lhS  # Human readable, sorted by size
                      </code>
                      <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        ls -laht # Professional's choice
                      </code>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">Tuhina's Debugging Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      When debugging at Naihati Lab, she uses <code className="font-mono">ls -lat | head -20</code> 
                      to see recent changes in system directories.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive File Browser */}
            <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
              {/* Options Control Panel */}
              <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-300 mb-4">Interactive ls Options</h3>
                
                <div className="mb-6">
                  <div className="text-gray-400 mb-2">Current Command:</div>
                  <div className="font-mono text-lg text-green-400 bg-black/50 p-4 rounded-lg">
                    $ {generateLsCommand()}
                  </div>
                </div>

                {/* Option Toggles */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {Object.entries(lsOptions).map(([option, enabled]) => (
                    <button
                      key={option}
                      className={`p-3 rounded-lg transition-all duration-300 flex flex-col items-center ${enabled 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => this.toggleOption(option)}
                    >
                      <span className="text-lg mb-1">{optionDetails[option].icon}</span>
                      <span className="font-mono text-sm">{option}</span>
                      <span className="text-xs opacity-80 mt-1">
                        {enabled ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Current Directory */}
                <div className="mb-4">
                  <div className="text-gray-400 mb-2">Current Directory:</div>
                  <div className="font-mono text-white bg-gray-700 p-3 rounded-lg">
                    /home/swadeep/{currentDirectory}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-700 rounded-lg text-center">
                    <div className="text-gray-400 text-sm">Files</div>
                    <div className="text-white text-xl">
                      {sortedFiles.filter(f => f.type === 'file').length}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-700 rounded-lg text-center">
                    <div className="text-gray-400 text-sm">Directories</div>
                    <div className="text-white text-xl">
                      {sortedFiles.filter(f => f.type === 'directory').length}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-700 rounded-lg text-center">
                    <div className="text-gray-400 text-sm">Hidden</div>
                    <div className="text-white text-xl">
                      {sortedFiles.filter(f => f.type === 'hidden').length}
                    </div>
                  </div>
                </div>
              </div>

              {/* File Listing Output */}
              <div className="p-6 bg-gray-900 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-300">File Listing Output</h3>
                  <div className="text-xs text-gray-500">
                    Total: {sortedFiles.length} items
                  </div>
                </div>
                
                <div className="font-mono text-sm bg-black p-4 rounded-lg max-h-96 overflow-y-auto">
                  {/* Header for -l format */}
                  {lsOptions['-l'] && (
                    <div className="text-gray-500 mb-2 pb-2 border-b border-gray-800 grid grid-cols-12 gap-2">
                      <div className="col-span-3">Permissions</div>
                      <div className="col-span-1">Links</div>
                      <div className="col-span-2">Owner</div>
                      <div className="col-span-2">Group</div>
                      <div className="col-span-2">Size</div>
                      <div className="col-span-2">Modified</div>
                    </div>
                  )}
                  
                  {/* File List */}
                  <div className="space-y-1">
                    {sortedFiles.map((file, index) => (
                      <div 
                        key={index}
                        className={`p-2 rounded transition-all duration-200 cursor-pointer ${selectedFiles.includes(file.name) 
                          ? 'bg-blue-900/30' 
                          : 'hover:bg-gray-800'
                        } ${file.type === 'hidden' && !lsOptions['-a'] ? 'hidden' : ''}`}
                        onClick={() => this.handleFileSelect(file.name)}
                      >
                        {lsOptions['-l'] ? (
                          <div className="grid grid-cols-12 gap-2 items-center">
                            <div className={`col-span-3 font-mono ${this.getPermissionColor(file.permissions)}`}>
                              {file.permissions}
                            </div>
                            <div className="col-span-1 text-gray-400">1</div>
                            <div className="col-span-2 text-cyan-400">{file.owner}</div>
                            <div className="col-span-2 text-purple-400">{file.group}</div>
                            <div className="col-span-2 text-yellow-400">
                              {this.formatFileSize(file.size)}
                            </div>
                            <div className="col-span-2 text-green-400">{file.modified}</div>
                            <div className="col-span-12 md:col-span-0"></div>
                            <div className="col-span-12 md:col-span-12 flex items-center">
                              <span className="mr-2">{this.getFileIcon(file)}</span>
                              <span className={file.type === 'hidden' ? 'text-gray-500' : 'text-white'}>
                                {file.name}
                              </span>
                              {file.type === 'directory' && (
                                <span className="ml-2 text-blue-400">/</span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="mr-3">{this.getFileIcon(file)}</span>
                            <span className={file.type === 'hidden' ? 'text-gray-500' : 'text-white'}>
                              {file.name}
                            </span>
                            {file.type === 'directory' && (
                              <span className="ml-2 text-blue-400">/</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex items-center">
                    <span className="mr-2">📁</span>
                    <span className="text-xs text-gray-400">Directory</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🔒</span>
                    <span className="text-xs text-gray-400">Hidden</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📄</span>
                    <span className="text-xs text-gray-400">File</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🐍</span>
                    <span className="text-xs text-gray-400">Python</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Permission Decoder */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '800ms'}}>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🔐</span> Understanding ls -l Permissions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Permission Structure */}
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Permission Breakdown</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="font-mono text-center text-xl mb-2">-rwxr-xr-x</div>
                    <div className="grid grid-cols-10 gap-1">
                      {['-', 'r', 'w', 'x', 'r', '-', 'x', 'r', '-', 'x'].map((char, index) => (
                        <div 
                          key={index}
                          className={`p-2 text-center rounded ${index === 0 ? 'bg-gray-200 dark:bg-gray-600' : 
                            index < 4 ? 'bg-blue-100 dark:bg-blue-900/30' : 
                            index < 7 ? 'bg-green-100 dark:bg-green-900/30' : 
                            'bg-yellow-100 dark:bg-yellow-900/30'}`}
                        >
                          <div className="font-mono">{char}</div>
                          <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                            {index === 0 ? 'Type' : 
                             index < 4 ? `Owner${index-1}` : 
                             index < 7 ? `Group${index-4}` : `Other${index-7}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-400">Owner permissions</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-400">Group permissions</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-400">Others permissions</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* File Types */}
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">File Type Indicators</h3>
                <div className="space-y-3">
                  {[
                    { type: '-', meaning: 'Regular file', example: 'data.txt' },
                    { type: 'd', meaning: 'Directory', example: 'Documents/' },
                    { type: 'l', meaning: 'Symbolic link', example: 'link → target' },
                    { type: 'b', meaning: 'Block device', example: '/dev/sda' },
                    { type: 'c', meaning: 'Character device', example: '/dev/tty' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="font-mono text-blue-600 dark:text-blue-400">{item.type}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.example}</div>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Permission Letters */}
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Permission Letters</h3>
                <div className="space-y-3">
                  {[
                    { letter: 'r', meaning: 'Read permission', color: 'text-green-600 dark:text-green-400' },
                    { letter: 'w', meaning: 'Write permission', color: 'text-yellow-600 dark:text-yellow-400' },
                    { letter: 'x', meaning: 'Execute permission', color: 'text-red-600 dark:text-red-400' },
                    { letter: '-', meaning: 'No permission', color: 'text-gray-600 dark:text-gray-400' },
                    { letter: 's', meaning: 'Setuid/setgid', color: 'text-purple-600 dark:text-purple-400' },
                    { letter: 't', meaning: 'Sticky bit', color: 'text-indigo-600 dark:text-indigo-400' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center">
                      <div className={`font-mono text-lg font-bold ${item.color} mr-3`}>{item.letter}</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">{item.meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls & Best Practices */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Common Pitfalls */}
            <div className={`p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg border border-red-200 dark:border-red-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1000ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">🚫</span> Common Mistakes
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Confusing -t and -S</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="font-mono">-t</code> sorts by time, <code className="font-mono">-S</code> sorts by size.
                    Abhronila wasted hours looking for large files using <code className="font-mono">-t</code> instead of <code className="font-mono">-S</code>.
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Missing -h with Large Files</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Without <code className="font-mono">-h</code>, file sizes show as bytes. 
                    Swadeep thought a 1073741824 byte file was small until he added <code className="font-mono">-h</code> and saw "1.0G".
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Forgetting -a for Config Files</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Configuration files start with <code className="font-mono">.</code> and are hidden. 
                    Debangshu couldn't find <code className="font-mono">.bashrc</code> until he used <code className="font-mono">ls -a</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className={`p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1200ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">💡</span> Best Practices
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Create Aliases</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Add to <code className="font-mono">~/.bashrc</code>:<br/>
                    <code className="font-mono block mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                      alias ll='ls -laht'<br/>
                      alias l='ls -lh'<br/>
                      alias la='ls -la'
                    </code>
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Use -R with Caution</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="font-mono">ls -R /</code> can produce thousands of lines. 
                    Always pipe to less: <code className="font-mono">ls -R | less</code> or limit depth.
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Combine with Other Commands</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="font-mono">ls -lat | head -10</code> - Show 10 most recent files<br/>
                    <code className="font-mono">ls -lhS | grep -v ^d</code> - Show only files (no directories)<br/>
                    <code className="font-mono">ls -la | wc -l</code> - Count total files
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
                    The <code className="font-mono">ls</code> command is your "eyes" in the Linux filesystem. 
                    Master its options, and you'll see everything clearly - from file sizes to permissions to hidden configurations.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    At Shyamnagar Tech Center, I teach this mnemonic for remembering common combinations:
                    <span className="font-mono block mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <span className="text-blue-600">L</span>ook <span className="text-green-600">A</span>t <span className="text-red-600">H</span>idden <span className="text-purple-600">T</span>hings<br/>
                      = <span className="font-bold">ls -laht</span>
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Debugging Flow</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      1. <code>ls -la</code> to see everything<br/>
                      2. <code>ls -lat</code> to find recent changes<br/>
                      3. <code>ls -lhS</code> to find large files
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Permission Mnemonic</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      <span className="font-mono">rwx</span> = Read, Write, eXecute<br/>
                      Remember: "Rabbits Wear X-rays"
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-100/50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">Hidden Files Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Config files start with <code>.</code><br/>
                      Think: "dot files" = "hidden settings"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Practice */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1600ms'}}>
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🧪</span> Practice Scenarios
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Scenario 1: Debugging at Ichapur Lab</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  Swadeep notices his Python script stopped working. He needs to:
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      1. Check if any files were modified recently in his project directory
                    </p>
                    <div className="mt-2 font-mono text-xs bg-black/50 p-2 rounded">
                      $ <span className="text-green-400">ls -lat | head -5</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      2. Verify file permissions on his Python scripts
                    </p>
                    <div className="mt-2 font-mono text-xs bg-black/50 p-2 rounded">
                      $ <span className="text-green-400">ls -l *.py</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      3. Check for any hidden configuration files that might have changed
                    </p>
                    <div className="mt-2 font-mono text-xs bg-black/50 p-2 rounded">
                      $ <span className="text-green-400">ls -la | grep "^\."</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Scenario 2: Cleanup at Barrackpore Institute</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  Tuhina needs to free up disk space on the shared server:
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      1. Find the 5 largest files in her home directory
                    </p>
                    <div className="mt-2 font-mono text-xs bg-black/50 p-2 rounded">
                      $ <span className="text-green-400">ls -lhS ~ | head -5</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      2. Check disk usage of all directories recursively
                    </p>
                    <div className="mt-2 font-mono text-xs bg-black/50 p-2 rounded">
                      $ <span className="text-green-400">ls -lR ~ | grep "^d" | wc -l</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      3. Find temporary files older than 30 days
                    </p>
                    <div className="mt-2 font-mono text-xs bg-black/50 p-2 rounded">
                      $ <span className="text-green-400">ls -lat /tmp | grep "Jan\|Dec"</span>
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
              <span className="font-semibold">Topic 4</span> of Linux Fundamentals Series
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                ← Previous: pwd, ls, cd Mastery
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Next: Understanding inode numbers →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}