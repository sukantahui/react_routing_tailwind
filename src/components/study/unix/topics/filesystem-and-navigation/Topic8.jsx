// Topic8.jsx - Understanding File Types
import React, { Component } from 'react';

export default class Topic8 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeFileType: 'regular',
      selectedExample: null,
      showDetails: false,
      fileTypes: {
        regular: {
          name: 'Regular File',
          symbol: '-',
          description: 'Ordinary files containing data, text, or program instructions',
          examples: [
            { name: 'document.txt', content: 'This is a text file\nSecond line of text', size: '1.2K', permissions: '-rw-r--r--' },
            { name: 'image.jpg', content: 'Binary image data', size: '2.4M', permissions: '-rw-r--r--' },
            { name: 'script.py', content: '#!/usr/bin/env python\nprint("Hello World")', size: '0.5K', permissions: '-rwxr-xr-x' }
          ],
          color: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
          icon: '📄',
          lsOutput: '-rw-r--r-- 1 user users 1234 Jan 16 document.txt'
        },
        directory: {
          name: 'Directory',
          symbol: 'd',
          description: 'Special files that contain lists of other files (folders)',
          examples: [
            { name: 'Documents/', content: 'Contains: report.pdf, notes.txt', size: '4.0K', permissions: 'drwxr-xr-x' },
            { name: 'Downloads/', content: 'Contains: software.tar.gz, image.png', size: '4.0K', permissions: 'drwxr-xr-x' },
            { name: '.config/', content: 'Contains: app.conf, settings.json', size: '4.0K', permissions: 'drwx------' }
          ],
          color: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
          icon: '📁',
          lsOutput: 'drwxr-xr-x 3 user users 4096 Jan 16 Documents'
        },
        symbolic: {
          name: 'Symbolic Link',
          symbol: 'l',
          description: 'Pointer files that reference other files or directories (shortcuts)',
          examples: [
            { name: 'latest → v2.0/', target: 'v2.0/', size: '23', permissions: 'lrwxrwxrwx' },
            { name: 'config → /etc/app/config', target: '/etc/app/config', size: '18', permissions: 'lrwxrwxrwx' },
            { name: 'python3 → python3.9', target: 'python3.9', size: '9', permissions: 'lrwxrwxrwx' }
          ],
          color: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
          icon: '🔗',
          lsOutput: 'lrwxrwxrwx 1 user users 9 Jan 16 python3 -> python3.9'
        },
        device: {
          name: 'Device File',
          symbol: 'b/c',
          description: 'Special files that represent hardware devices',
          examples: [
            { name: '/dev/sda', type: 'Block device', major: 8, minor: 0, permissions: 'brw-rw----' },
            { name: '/dev/tty', type: 'Character device', major: 5, minor: 0, permissions: 'crw-rw-rw-' },
            { name: '/dev/null', type: 'Character device', major: 1, minor: 3, permissions: 'crw-rw-rw-' }
          ],
          color: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
          icon: '💿',
          lsOutput: 'brw-rw---- 1 root disk 8, 0 Jan 16 /dev/sda'
        }
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isMounted: true });
    }, 100);
  }

  handleFileTypeChange = (type) => {
    this.setState({ 
      activeFileType: type,
      selectedExample: null,
      showDetails: false
    });
  };

  handleExampleSelect = (exampleIndex) => {
    this.setState({ 
      selectedExample: exampleIndex,
      showDetails: true 
    });
  };

  toggleDetails = () => {
    this.setState(prevState => ({ showDetails: !prevState.showDetails }));
  };

  renderFileTypeCard = (typeKey) => {
    const { activeFileType, fileTypes } = this.state;
    const fileType = fileTypes[typeKey];
    const isActive = activeFileType === typeKey;
    
    return (
      <button
        onClick={() => this.handleFileTypeChange(typeKey)}
        className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center ${isActive 
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl' 
          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl'
        }`}
      >
        <span className="text-4xl mb-4">{fileType.icon}</span>
        <div className="font-bold text-lg mb-2">{fileType.name}</div>
        <div className="font-mono text-sm opacity-80">{fileType.symbol}</div>
        <div className={`text-xs mt-2 px-3 py-1 rounded-full ${isActive 
          ? 'bg-white/20' 
          : 'bg-gray-100 dark:bg-gray-700'
        }`}>
          {typeKey === 'regular' ? 'Most Common' :
           typeKey === 'directory' ? 'Container' :
           typeKey === 'symbolic' ? 'Pointer' : 'Hardware'}
        </div>
      </button>
    );
  };

  render() {
    const { isMounted, activeFileType, selectedExample, showDetails, fileTypes } = this.state;
    const currentFileType = fileTypes[activeFileType];
    const selectedExampleData = selectedExample !== null ? currentFileType.examples[selectedExample] : currentFileType.examples[0];
    
    // Animation styles
    const baseAnimation = isMounted 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4';

    const animationStyle = `
      @keyframes fileReveal {
        from { 
          opacity: 0;
          transform: scale(0.95) translateY(10px);
        }
        to { 
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      @keyframes typePulse {
        0%, 100% { 
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
        }
        70% { 
          box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
        }
      }
      
      @keyframes linkFlow {
        0% {
          stroke-dashoffset: 100;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      
      .animate-file-reveal {
        animation: fileReveal 0.5s ease-out;
      }
      
      .animate-type-pulse {
        animation: typePulse 2s infinite;
      }
      
      .animate-link-flow {
        animation: linkFlow 3s linear infinite;
      }
    `;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-900 p-4 md:p-8 transition-colors duration-300">
        <style>{animationStyle}</style>
        
        {/* Header Section */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`}>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📁</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Understanding File Types: Regular, Directory, Symbolic Link, Device File
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              Discover the different types of files in Linux and understand how each type serves unique purposes 
              in the filesystem ecosystem
            </p>
          </div>

          {/* File Type Navigation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {this.renderFileTypeCard('regular')}
            {this.renderFileTypeCard('directory')}
            {this.renderFileTypeCard('symbolic')}
            {this.renderFileTypeCard('device')}
          </div>
        </section>

        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - File Type Details */}
            <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
              {/* File Type Overview */}
              <div className={`p-6 rounded-2xl shadow-lg border ${currentFileType.color.split(' ')[0].replace('from-', 'border-')} ${currentFileType.color}`}>
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{currentFileType.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {currentFileType.name}
                    </h2>
                    <div className="flex items-center mt-1">
                      <code className="font-mono bg-black/20 dark:bg-white/20 px-2 py-1 rounded text-sm">
                        Type indicator: {currentFileType.symbol}
                      </code>
                      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                        in `ls -l` output
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentFileType.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Real-world Analogy</h3>
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      {activeFileType === 'regular' && 'Like a book or document - contains actual content that you read or use'}
                      {activeFileType === 'directory' && 'Like a filing cabinet or folder - organizes and contains other items'}
                      {activeFileType === 'symbolic' && 'Like a shortcut or street sign - points to another location without containing actual content'}
                      {activeFileType === 'device' && 'Like a control panel - provides access to hardware without being the hardware itself'}
                    </p>
                  </div>
                </div>

                {/* ls -l Output Example */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">`ls -l` Output</h3>
                  <div className="font-mono text-sm bg-gray-800 dark:bg-black text-gray-300 p-4 rounded-lg">
                    {currentFileType.lsOutput}
                    <div className="mt-2 text-xs text-gray-500">
                      {activeFileType === 'regular' && 'First character: - (hyphen) indicates regular file'}
                      {activeFileType === 'directory' && 'First character: d indicates directory'}
                      {activeFileType === 'symbolic' && 'First character: l indicates symbolic link, -> shows target'}
                      {activeFileType === 'device' && 'First character: b/c indicates block/character device, numbers show major/minor'}
                    </div>
                  </div>
                </div>

                {/* Creation Commands */}
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Creation Commands</h3>
                  <div className="space-y-2">
                    {activeFileType === 'regular' && (
                      <>
                        <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          $ touch newfile.txt
                        </code>
                        <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          $ echo "content" > newfile.txt
                        </code>
                      </>
                    )}
                    {activeFileType === 'directory' && (
                      <>
                        <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          $ mkdir newdirectory
                        </code>
                        <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          $ mkdir -p path/to/nested/directory
                        </code>
                      </>
                    )}
                    {activeFileType === 'symbolic' && (
                      <>
                        <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          $ ln -s target linkname
                        </code>
                        <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          $ ln -s /usr/bin/python3 python
                        </code>
                      </>
                    )}
                    {activeFileType === 'device' && (
                      <>
                        <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          # Created automatically by system
                        </code>
                        <code className="block text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          # mknod command (advanced, rarely used)
                        </code>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional File Types */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Other File Types</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { symbol: 'p', name: 'Named Pipe', description: 'Inter-process communication', icon: '🚰' },
                    { symbol: 's', name: 'Socket', description: 'Network communication', icon: '🔌' },
                    { symbol: 'D', name: 'Door', description: 'Solaris IPC (rare)', icon: '🚪' },
                    { symbol: '=', name: 'Whiteout', description: 'Unionfs deleted files', icon: '⚪' }
                  ].map((type, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">{type.icon}</span>
                        <code className="font-mono font-bold text-blue-600 dark:text-blue-400">{type.symbol}</code>
                      </div>
                      <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">{type.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{type.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Examples */}
            <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
              {/* Examples Selection */}
              <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-300 mb-4">Examples of {currentFileType.name}s</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {currentFileType.examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => this.handleExampleSelect(index)}
                      className={`p-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center ${selectedExample === index 
                        ? 'bg-blue-600 text-white animate-type-pulse' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <span className="text-2xl mb-2">{currentFileType.icon}</span>
                      <code className="font-mono text-sm text-center truncate w-full">
                        {example.name}
                      </code>
                      <div className="text-xs opacity-80 mt-1">
                        {example.size}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Example Details */}
                {showDetails && selectedExampleData && (
                  <div className="bg-black/30 p-4 rounded-lg animate-file-reveal">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <code className="font-mono text-lg text-blue-400">{selectedExampleData.name}</code>
                        <div className="text-sm text-gray-400">Permissions: {selectedExampleData.permissions}</div>
                      </div>
                      <button
                        onClick={this.toggleDetails}
                        className="text-gray-400 hover:text-white"
                      >
                        {showDetails ? '▲ Hide' : '▼ Show'} Details
                      </button>
                    </div>
                    
                    {showDetails && (
                      <div className="space-y-4">
                        {/* File Content/Info */}
                        {activeFileType === 'regular' && (
                          <div>
                            <div className="text-gray-400 text-sm mb-2">File Content:</div>
                            <div className="font-mono text-sm bg-black/50 p-3 rounded text-gray-300 whitespace-pre">
                              {selectedExampleData.content}
                            </div>
                          </div>
                        )}
                        
                        {activeFileType === 'directory' && (
                          <div>
                            <div className="text-gray-400 text-sm mb-2">Directory Contents:</div>
                            <div className="font-mono text-sm bg-black/50 p-3 rounded text-gray-300">
                              {selectedExampleData.content}
                            </div>
                          </div>
                        )}
                        
                        {activeFileType === 'symbolic' && (
                          <div>
                            <div className="text-gray-400 text-sm mb-2">Symbolic Link Details:</div>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 bg-black/50 rounded">
                                <div>
                                  <div className="text-xs text-gray-400">Link name</div>
                                  <div className="font-mono text-blue-400">{selectedExampleData.name.split(' → ')[0]}</div>
                                </div>
                                <div className="text-2xl text-gray-600">→</div>
                                <div>
                                  <div className="text-xs text-gray-400">Target</div>
                                  <div className="font-mono text-green-400">{selectedExampleData.target}</div>
                                </div>
                              </div>
                              
                              {/* Visual Link Representation */}
                              <div className="relative h-20">
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                                  <span className="text-xl">🔗</span>
                                </div>
                                
                                <svg className="absolute left-16 top-1/2 w-64 h-2" viewBox="0 0 256 2">
                                  <line 
                                    x1="0" 
                                    y1="1" 
                                    x2="256" 
                                    y2="1" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeDasharray="5,5"
                                    className="text-gray-600"
                                  >
                                    <animate
                                      attributeName="stroke-dashoffset"
                                      from="10"
                                      to="0"
                                      dur="2s"
                                      repeatCount="indefinite"
                                    />
                                  </line>
                                </svg>
                                
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center">
                                  <span className="text-xl">📁</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {activeFileType === 'device' && (
                          <div>
                            <div className="text-gray-400 text-sm mb-2">Device Information:</div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-3 bg-black/50 rounded">
                                <div className="text-xs text-gray-400">Device Type</div>
                                <div className="font-mono text-blue-400">{selectedExampleData.type}</div>
                              </div>
                              <div className="p-3 bg-black/50 rounded">
                                <div className="text-xs text-gray-400">Major:Minor</div>
                                <div className="font-mono text-green-400">{selectedExampleData.major}:{selectedExampleData.minor}</div>
                              </div>
                            </div>
                            
                            <div className="mt-4 p-3 bg-black/50 rounded">
                              <div className="text-xs text-gray-400">Purpose</div>
                              <div className="text-sm text-gray-300">
                                {selectedExampleData.name === '/dev/sda' && 'First SATA/SCSI disk (whole disk)'}
                                {selectedExampleData.name === '/dev/tty' && 'Current terminal device'}
                                {selectedExampleData.name === '/dev/null' && 'Data sink (discards all writes)'}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Commands to Examine */}
                        <div>
                          <div className="text-gray-400 text-sm mb-2">Examine this file:</div>
                          <div className="space-y-2">
                            <code className="block text-sm font-mono bg-black/50 p-2 rounded text-green-400">
                              $ ls -l {selectedExampleData.name}
                            </code>
                            {activeFileType === 'regular' && (
                              <code className="block text-sm font-mono bg-black/50 p-2 rounded text-green-400">
                                $ file {selectedExampleData.name}
                              </code>
                            )}
                            {activeFileType === 'symbolic' && (
                              <code className="block text-sm font-mono bg-black/50 p-2 rounded text-green-400">
                                $ readlink {selectedExampleData.name.split(' → ')[0]}
                              </code>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* File Type Detection */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">File Type Detection</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-700 dark:text-gray-300 mb-2">Using `file` command:</div>
                    <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <span className="text-green-600 dark:text-green-400">$ file document.txt</span><br/>
                      <span className="text-blue-600 dark:text-blue-400">document.txt: ASCII text</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-700 dark:text-gray-300 mb-2">Using `stat` command:</div>
                    <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <span className="text-green-600 dark:text-green-400">$ stat document.txt</span><br/>
                      <span className="text-blue-600 dark:text-blue-400">File: document.txt<br/>Size: 1234 Blocks: 8 IO Block: 4096 regular file</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-700 dark:text-gray-300 mb-2">Check file type in shell script:</div>
                    <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <span className="text-purple-600 dark:text-purple-400">if [ -f "file.txt" ]; then<br/>&nbsp;&nbsp;echo "Regular file"<br/>fi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg border border-amber-200 dark:border-yellow-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Reference</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-amber-200 dark:border-yellow-700">
                        <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Type</th>
                        <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Symbol</th>
                        <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Test Command</th>
                        <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { type: 'Regular', symbol: '-f', command: '[ -f file ]', purpose: 'Check if exists and is regular' },
                        { type: 'Directory', symbol: '-d', command: '[ -d dir ]', purpose: 'Check if exists and is directory' },
                        { type: 'Symbolic', symbol: '-L', command: '[ -L link ]', purpose: 'Check if exists and is symlink' },
                        { type: 'Device', symbol: '-b/-c', command: '[ -b /dev/sda ]', purpose: 'Check block/char device' },
                        { type: 'Exists', symbol: '-e', command: '[ -e path ]', purpose: 'Check if exists (any type)' }
                      ].map((row, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-amber-100 dark:border-yellow-900/30 hover:bg-amber-50/50 dark:hover:bg-amber-900/10"
                        >
                          <td className="py-2 px-3 font-semibold text-gray-800 dark:text-gray-200">{row.type}</td>
                          <td className="py-2 px-3 font-mono text-blue-600 dark:text-blue-400">{row.symbol}</td>
                          <td className="py-2 px-3 font-mono text-green-600 dark:text-green-400">{row.command}</td>
                          <td className="py-2 px-3 text-gray-700 dark:text-gray-400">{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Scenarios */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '800ms'}}>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🏫</span> Real-world Scenarios at Barrackpore Institute
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3">
                    👨‍🎓
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Swadeep's Script Issue</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Python script not executing despite correct permissions:
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <code className="text-xs font-mono">
                      $ ls -l script.py<br/>
                      -rw-r--r-- 1 swadeep students 120 Jan 16 script.py
                    </code>
                  </div>
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                    <code className="text-xs font-mono text-green-600 dark:text-green-400">
                      $ file script.py<br/>
                      script.py: Python script, ASCII text executable
                    </code>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Solution:</span> Add execute permission with `chmod +x`
                  </p>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 mr-3">
                    👩‍🎓
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Tuhina's Broken Link</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Symbolic link pointing to non-existent file:
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <code className="text-xs font-mono">
                      $ ls -l latest<br/>
                      lrwxrwxrwx 1 tuhina students 9 Jan 16 latest -> v2.0/
                    </code>
                  </div>
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded">
                    <code className="text-xs font-mono text-red-600 dark:text-red-400">
                      $ ls v2.0/<br/>
                      ls: cannot access 'v2.0/': No such file or directory
                    </code>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Solution:</span> Fix target or recreate link
                  </p>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
                    👨‍🎓
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Debangshu's Device Access</h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                  Cannot write to USB device at Shyamnagar Lab:
                </p>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <code className="text-xs font-mono">
                      $ ls -l /dev/sdb1<br/>
                      brw-rw---- 1 root disk 8, 16 Jan 16 /dev/sdb1
                    </code>
                  </div>
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                    <code className="text-xs font-mono text-yellow-600 dark:text-yellow-400">
                      $ groups debangshu<br/>
                      debangshu : students users
                    </code>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Solution:</span> Add user to disk group or use sudo
                  </p>
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
                <span className="mr-3">🚫</span> Common Pitfalls
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Treating Directories as Files</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Beginners try to `cat` directories. Directories must be listed (`ls`) not read.<br/>
                    <code className="font-mono text-xs block mt-1 p-1 bg-red-100 dark:bg-red-900/30 rounded">
                      $ cat Documents/  # WRONG!<br/>
                      $ ls Documents/   # CORRECT
                    </code>
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Broken Symbolic Links</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Links that point to non-existent files cause errors. Always check with `readlink`.<br/>
                    <code className="font-mono text-xs block mt-1 p-1 bg-red-100 dark:bg-red-900/30 rounded">
                      $ readlink broken_link  # Shows target
                    </code>
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">Device File Misunderstanding</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Treating device files like regular files can corrupt data. Know what you're writing to.<br/>
                    <code className="font-mono text-xs block mt-1 p-1 bg-red-100 dark:bg-red-900/30 rounded">
                      $ echo "test" > /dev/sda  # DANGEROUS!
                    </code>
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className={`p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg border border-green-200 dark:border-green-700 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1200ms'}}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <span className="mr-3">💡</span> Best Practices
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Always Check File Type</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Before operating on a file, check its type:<br/>
                    <code className="font-mono text-xs block mt-1 p-1 bg-green-100 dark:bg-green-900/30 rounded">
                      $ file unknown_file<br/>
                      $ ls -l path/to/file<br/>
                      $ stat filename
                    </code>
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Use Symbolic Links Wisely</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Use absolute paths for system links, relative paths for project links.<br/>
                    <code className="font-mono text-xs block mt-1 p-1 bg-green-100 dark:bg-green-900/30 rounded">
                      # System: absolute path<br/>
                      $ ln -s /usr/bin/python3.9 /usr/bin/python3<br/>
                      # Project: relative path<br/>
                      $ ln -s ../config/app.conf config.link
                    </code>
                  </p>
                </div>
                
                <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                  <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">Script with Type Checking</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Always verify file types in scripts:<br/>
                    <code className="font-mono text-xs block mt-1 p-1 bg-green-100 dark:bg-green-900/30 rounded">
                      if [ -f "$file" ]; then<br/>
                      &nbsp;&nbsp;echo "Processing regular file"<br/>
                      elif [ -d "$file" ]; then<br/>
                      &nbsp;&nbsp;echo "Processing directory"<br/>
                      fi
                    </code>
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
                    In Linux, "everything is a file" - but not all files are created equal. Understanding file types 
                    is like understanding different tools in a toolbox. Each has a specific purpose and misuse can 
                    lead to unexpected results.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    At Naihati Computer Lab, I teach this workflow:
                    <span className="font-mono block mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <span className="text-blue-600">1. ls -l</span> - Check file type indicator<br/>
                      <span className="text-green-600">2. file</span> - Determine file contents<br/>
                      <span className="text-purple-600">3. Appropriate command</span> - Operate based on type
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Memory Aid</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Regular: <span className="font-mono">-</span> (hyphen)<br/>
                      Directory: <span className="font-mono">d</span> (directory)<br/>
                      Symbolic: <span className="font-mono">l</span> (link)
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Test Commands</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      <code>[ -f file ]</code> - Regular file<br/>
                      <code>[ -d dir ]</code> - Directory<br/>
                      <code>[ -L link ]</code> - Symbolic link
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-100/50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">Pro Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Use <code>file *</code> to quickly identify all file types in a directory. 
                      Essential for debugging and system exploration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Quiz */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '1600ms'}}>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="mr-3">🧠</span> File Type Identification Challenge
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Identify the File Types</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <code className="block text-xs font-mono mb-2">
                      $ ls -l /home/swadeep<br/>
                      -rw-r--r-- 1 swadeep students 1200 Jan 16 notes.txt<br/>
                      drwxr-xr-x 2 swadeep students 4096 Jan 16 Documents/<br/>
                      lrwxrwxrwx 1 swadeep students 9 Jan 16 python -> python3.9<br/>
                      crw-rw-rw- 1 root root 5, 1 Jan 16 /dev/tty1
                    </code>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Match each file with its type:
                    </p>
                    <div className="mt-2 space-y-2">
                      {[
                        { file: 'notes.txt', type: 'regular' },
                        { file: 'Documents/', type: 'directory' },
                        { file: 'python', type: 'symbolic' },
                        { file: '/dev/tty1', type: 'device' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <code className="text-xs font-mono">{item.file}</code>
                          <select className="text-xs border rounded px-2 py-1">
                            <option>Select type</option>
                            <option value="regular">Regular</option>
                            <option value="directory">Directory</option>
                            <option value="symbolic">Symbolic</option>
                            <option value="device">Device</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      Which command creates a symbolic link?
                    </p>
                    <div className="space-y-2">
                      {['ln -s target link', 'ln target link', 'link -s target link', 'symlink target link'].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`cmd${idx}`} name="command" className="mr-2" />
                          <label htmlFor={`cmd${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Scenario Analysis</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      Abhronila finds these files at Shyamnagar Lab:
                    </p>
                    <code className="block text-xs font-mono mb-2">
                      brw-rw---- 1 root disk 8, 0 Jan 16 /dev/sda<br/>
                      -rwxr-xr-x 1 root root 12000 Jan 16 /bin/ls<br/>
                      drwxr-xr-x 4 root root 4096 Jan 16 /etc/<br/>
                      lrwxrwxrwx 1 root root 22 Jan 16 /bin/sh -> /usr/bin/bash
                    </code>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Which file is dangerous to write to directly? Why?
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                      Write a shell script that:
                    </p>
                    <ol className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-decimal pl-5">
                      <li>Checks if a path exists</li>
                      <li>If it's a regular file, prints its size</li>
                      <li>If it's a directory, lists its contents</li>
                      <li>If it's a symbolic link, shows its target</li>
                    </ol>
                    <div className="mt-2 font-mono text-xs bg-black/50 p-2 rounded h-24">
                      <span className="text-gray-400">#!/bin/bash<br/># Your script here...</span>
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
              <span className="font-semibold">Topic 9</span> of Linux Fundamentals Series
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                ← Previous: Tree Command & Visualization
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Next: Symbolic vs Hard Links →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}