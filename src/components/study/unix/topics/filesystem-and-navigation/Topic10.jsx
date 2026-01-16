// Topic10.jsx - stat command – reading file metadata
import React, { Component } from 'react';

export default class Topic10 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeTab: 'concept',
      selectedFileType: 'regular',
      showInodeDetails: false,
      highlightField: null,
      animationsLoaded: false,
      fileStats: {
        regular: {
          filename: 'research_paper.pdf',
          inode: 123456,
          permissions: '-rw-r--r--',
          links: 1,
          owner: 'swadeep',
          group: 'students',
          size: '2.5M',
          modified: '2024-01-15 14:30',
          accessed: '2024-01-16 09:15',
          changed: '2024-01-15 14:30'
        },
        directory: {
          filename: 'physics_project/',
          inode: 123457,
          permissions: 'drwxr-xr-x',
          links: 3,
          owner: 'tuhina',
          group: 'faculty',
          size: '4.0K',
          modified: '2024-01-14 10:00',
          accessed: '2024-01-16 08:45',
          changed: '2024-01-14 10:00'
        },
        symbolic: {
          filename: 'current_sem -> fall_2024',
          inode: 123458,
          permissions: 'lrwxrwxrwx',
          links: 1,
          owner: 'abhronila',
          group: 'students',
          size: '9',
          modified: '2024-01-10 11:20',
          accessed: '2024-01-16 10:30',
          changed: '2024-01-10 11:20'
        },
        device: {
          filename: '/dev/sda1',
          inode: 123459,
          permissions: 'brw-rw----',
          links: 1,
          owner: 'root',
          group: 'disk',
          size: '0',
          modified: '2024-01-01 00:00',
          accessed: '2024-01-16 07:00',
          changed: '2024-01-01 00:00'
        }
      }
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

  handleFileTypeSelect = (type) => {
    this.setState({ 
      selectedFileType: type,
      highlightField: null 
    });
  };

  handleFieldHover = (field) => {
    this.setState({ highlightField: field });
  };

  handleFieldLeave = () => {
    this.setState({ highlightField: null });
  };

  toggleInodeDetails = () => {
    this.setState(prevState => ({ 
      showInodeDetails: !prevState.showInodeDetails 
    }));
  };

  renderConceptSection() {
    const { isMounted, selectedFileType, fileStats, highlightField, showInodeDetails } = this.state;
    const currentStats = fileStats[selectedFileType];

    return (
      <div className="space-y-8">
        {/* Introduction */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Understanding File Metadata</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The <code className="font-mono text-blue-600 dark:text-blue-400">stat</code> command reveals the hidden story behind every file and directory—showing 
              not just what's in a file, but everything <em>about</em> the file. It's like getting the complete biography 
              instead of just a name tag.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                  <span className="mr-2">📌</span> Real-world Analogy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  At Barrackpore Institute, when Swadeep submits his research paper, the file has metadata like: 
                  submission date, file size, author, last edited time, and access permissions—just like file 
                  metadata in Linux.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                  <span className="mr-2">🎯</span> Why Learn This?
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Debug file permission issues</li>
                  <li>• Track file changes and access patterns</li>
                  <li>• Understand storage usage</li>
                  <li>• Essential for system administration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive stat Display */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Interactive stat Command Demo</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* File Type Selection */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Select File Type:</h4>
                <div className="space-y-3">
                  {[
                    { type: 'regular', label: 'Regular File', icon: '📄', desc: 'Document, image, executable' },
                    { type: 'directory', label: 'Directory', icon: '📁', desc: 'Folder containing files' },
                    { type: 'symbolic', label: 'Symbolic Link', icon: '🔗', desc: 'Pointer to another file' },
                    { type: 'device', label: 'Device File', icon: '💾', desc: 'Hardware interface' }
                  ].map((file) => (
                    <button
                      key={file.type}
                      onClick={() => this.handleFileTypeSelect(file.type)}
                      onMouseEnter={() => this.handleFieldHover(`type_${file.type}`)}
                      onMouseLeave={this.handleFieldLeave}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
                        selectedFileType === file.type
                          ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{file.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-800 dark:text-white">{file.label}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{file.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Command Display */}
                <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                  <div className="text-gray-400 text-sm mb-2">Terminal Command:</div>
                  <code className="font-mono text-green-400 text-lg">
                    $ stat {currentStats.filename.split(' ')[0]}
                  </code>
                </div>
              </div>

              {/* stat Output Visualization */}
              <div className="lg:col-span-2">
                <div className="p-6 bg-gray-900 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-400 text-sm">stat command output:</div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={this.toggleInodeDetails}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        {showInodeDetails ? 'Hide Inode Details' : 'Show Inode Details'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="font-mono text-sm space-y-1">
                    {[
                      { label: 'File:', value: `'${currentStats.filename}'`, field: 'filename' },
                      { label: 'Size:', value: currentStats.size, field: 'size' },
                      { label: 'Blocks:', value: '8', field: 'blocks' },
                      { label: 'IO Block:', value: '4096   regular file', field: 'ioblock' },
                      { label: 'Device:', value: '801h/2049d', field: 'device' },
                      { label: 'Inode:', value: currentStats.inode, field: 'inode' },
                      { label: 'Links:', value: currentStats.links, field: 'links' },
                      { label: 'Access:', value: currentStats.permissions, field: 'permissions' },
                      { label: 'Uid:', value: `( ${currentStats.owner}/${currentStats.group} )`, field: 'owner' },
                      { label: 'Gid:', value: `( ${currentStats.group} )`, field: 'group' },
                      { label: 'Access:', value: currentStats.accessed, field: 'accessed' },
                      { label: 'Modify:', value: currentStats.modified, field: 'modified' },
                      { label: 'Change:', value: currentStats.changed, field: 'changed' }
                    ].map((line, index) => (
                      <div 
                        key={index}
                        onMouseEnter={() => this.handleFieldHover(line.field)}
                        onMouseLeave={this.handleFieldLeave}
                        className={`flex transition-all duration-200 ${
                          highlightField === line.field
                            ? 'bg-blue-900/30 -mx-2 px-2 py-1 rounded'
                            : 'hover:bg-gray-800/50 hover:-mx-2 hover:px-2 hover:py-1 hover:rounded'
                        }`}
                      >
                        <div className="w-24 text-cyan-400 flex-shrink-0">{line.label}</div>
                        <div className={`${
                          line.field === 'permissions' ? 'text-yellow-400' :
                          line.field === 'inode' ? 'text-green-400' :
                          line.field === 'size' ? 'text-purple-400' :
                          'text-gray-300'
                        }`}>{line.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Field Explanation */}
                {highlightField && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 animate-[fadeIn_0.3s_ease-out]">
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      {highlightField === 'filename' && (
                        <>Name of the file as stored in the directory</>
                      )}
                      {highlightField === 'inode' && (
                        <>Unique identification number for this file in the filesystem</>
                      )}
                      {highlightField === 'permissions' && (
                        <>File type and access permissions for owner, group, and others</>
                      )}
                      {highlightField === 'links' && (
                        <>Number of hard links pointing to this inode</>
                      )}
                      {highlightField === 'size' && (
                        <>Actual data size in bytes (human-readable format shown)</>
                      )}
                      {highlightField === 'modified' && (
                        <>When file content was last changed (mtime)</>
                      )}
                      {highlightField === 'accessed' && (
                        <>When file was last read (atime)</>
                      )}
                      {highlightField === 'changed' && (
                        <>When file metadata was last changed (ctime)</>
                      )}
                    </div>
                  </div>
                )}

                {/* Inode Details */}
                {showInodeDetails && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl animate-[slideUp_0.5s_ease-out]">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-4">Inode Structure Details</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <svg width="100%" height="200" className="mb-4">
                          {/* Inode Box */}
                          <rect x="20" y="20" width="260" height="160" rx="8" 
                                className="fill-green-100 dark:fill-green-900/30 stroke-green-300 dark:stroke-green-700 stroke-2" />
                          <text x="150" y="40" textAnchor="middle" className="fill-green-700 dark:fill-green-400 font-bold text-sm">Inode {currentStats.inode}</text>
                          
                          {/* Inode Fields */}
                          <g className="animate-pulse-slow">
                            <rect x="40" y="60" width="100" height="20" rx="4" className="fill-blue-100 dark:fill-blue-900/30" />
                            <text x="90" y="73" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 text-xs">Permissions</text>
                            
                            <rect x="160" y="60" width="100" height="20" rx="4" className="fill-purple-100 dark:fill-purple-900/30" />
                            <text x="210" y="73" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 text-xs">Owner ID</text>
                            
                            <rect x="40" y="90" width="100" height="20" rx="4" className="fill-yellow-100 dark:fill-yellow-900/30" />
                            <text x="90" y="103" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 text-xs">Size</text>
                            
                            <rect x="160" y="90" width="100" height="20" rx="4" className="fill-red-100 dark:fill-red-900/30" />
                            <text x="210" y="103" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 text-xs">Timestamps</text>
                            
                            <rect x="40" y="120" width="220" height="20" rx="4" className="fill-indigo-100 dark:fill-indigo-900/30" />
                            <text x="150" y="133" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 text-xs">Data Block Pointers</text>
                            
                            <rect x="40" y="150" width="100" height="20" rx="4" className="fill-cyan-100 dark:fill-cyan-900/30" />
                            <text x="90" y="163" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200 text-xs">Link Count</text>
                          </g>
                        </svg>
                      </div>
                      
                      <div>
                        <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-2">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span>Each inode is ~128-256 bytes</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span>Stored in inode table on disk</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span>Contains everything except filename</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span>Directory entries map names to inodes</span>
                          </li>
                        </ul>
                        
                        <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <strong>Fun Fact:</strong> When Abhronila at Barrackpore Institute renames a file, only the directory entry changes—the inode remains the same!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Three Timestamps Explained */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-400 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">The Three Timestamps</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Access Time (atime)',
                  description: 'When file was last read',
                  command: 'cat file.txt',
                  changes: 'Reading file content',
                  example: 'Tuhina opens her research document',
                  color: 'blue'
                },
                {
                  name: 'Modify Time (mtime)',
                  description: 'When content was last changed',
                  command: 'echo "text" >> file.txt',
                  changes: 'Editing file content',
                  example: 'Swadeep saves his code changes',
                  color: 'green'
                },
                {
                  name: 'Change Time (ctime)',
                  description: 'When metadata was last changed',
                  command: 'chmod 755 file.txt',
                  changes: 'Permissions, ownership, links',
                  example: 'Abhronila changes file permissions',
                  color: 'purple'
                }
              ].map((time, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    time.color === 'blue' ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20' :
                    time.color === 'green' ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20' :
                    'border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      time.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      time.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                      'bg-purple-100 dark:bg-purple-900/30'
                    }`}>
                      <span className={`${
                        time.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        time.color === 'green' ? 'text-green-600 dark:text-green-400' :
                        'text-purple-600 dark:text-purple-400'
                      }`}>📅</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">{time.name}</h4>
                      <div className={`text-sm ${
                        time.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        time.color === 'green' ? 'text-green-600 dark:text-green-400' :
                        'text-purple-600 dark:text-purple-400'
                      }`}>{time.description}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Command that changes it:</div>
                      <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                        $ {time.command}
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">What changes:</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{time.changes}</div>
                    </div>
                    
                    <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Example:</strong> {time.example}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-start">
                <span className="text-yellow-500 mr-3 mt-1">💡</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white mb-1">Key Insight:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    <strong>ctime</strong> always changes when <strong>mtime</strong> changes (because file size is metadata), 
                    but <strong>mtime</strong> doesn't change when only metadata changes (like permissions).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  renderExamplesSection() {
    const { isMounted } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Practical Examples */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Practical stat Usage Examples</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Common Use Cases */}
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-800 dark:text-white">Everyday Commands</h3>
                
                {[
                  {
                    scenario: 'Debangshu wants to check when he last modified his project file',
                    command: 'stat project_report.md',
                    output: 'Modify: 2024-01-15 14:30:00',
                    purpose: 'Track work progress'
                  },
                  {
                    scenario: 'Tuhina needs to verify file permissions for a shared script',
                    command: 'stat -c "%A %n" *.sh',
                    output: '-rwxr-xr-x backup.sh',
                    purpose: 'Permission audit'
                  },
                  {
                    scenario: 'Swadeep suspects someone accessed his confidential notes',
                    command: 'stat -c "%x" secret_notes.txt',
                    output: '2024-01-16 02:30:00',
                    purpose: 'Security monitoring'
                  },
                  {
                    scenario: 'Abhronila wants to find large files in her directory',
                    command: 'stat -c "%s %n" * | sort -nr',
                    output: '5242880 video.mp4',
                    purpose: 'Storage management'
                  }
                ].map((example, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">{example.scenario}</div>
                    <code className="block font-mono text-sm bg-gray-900 text-green-400 p-2 rounded mb-2">
                      $ {example.command}
                    </code>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Output: {example.output}</span>
                      <span className="text-blue-600 dark:text-blue-400">{example.purpose}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Format Specifiers */}
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-800 dark:text-white">Custom Formatting with -c</h3>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-gray-400 text-sm mb-3">Format specifiers for custom output:</div>
                  
                  <div className="font-mono text-sm space-y-2">
                    {[
                      { spec: '%n', meaning: 'File name' },
                      { spec: '%s', meaning: 'Total size in bytes' },
                      { spec: '%F', meaning: 'File type' },
                      { spec: '%U', meaning: 'User name of owner' },
                      { spec: '%G', meaning: 'Group name of owner' },
                      { spec: '%A', meaning: 'Access rights in human readable form' },
                      { spec: '%a', meaning: 'Access rights in octal' },
                      { spec: '%i', meaning: 'Inode number' },
                      { spec: '%h', meaning: 'Number of hard links' },
                      { spec: '%x', meaning: 'Time of last access' },
                      { spec: '%y', meaning: 'Time of last modification' },
                      { spec: '%z', meaning: 'Time of last change' }
                    ].map((item, index) => (
                      <div key={index} className="flex">
                        <div className="w-16 text-cyan-400 flex-shrink-0">{item.spec}</div>
                        <div className="text-gray-300">{item.meaning}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Practical Examples:</h4>
                  
                  <div className="space-y-2">
                    <div>
                      <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded mb-1">
                        $ stat -c "%n: %s bytes, last modified: %y" *.pdf
                      </code>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Custom formatted output for multiple files
                      </div>
                    </div>
                    
                    <div>
                      <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded mb-1">
                        $ stat -c "Inode: %i, Links: %h" important.txt
                      </code>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Extract specific metadata fields
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Scenarios */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Real-world Problem Solving</h3>
            
            <div className="space-y-6">
              {/* Scenario 1 */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl">
                <div className="flex items-start mb-4">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-red-600 dark:text-red-400">⚠️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Problem: Permission Denied</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Swadeep at Barrackpore Institute can't run a script
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Error Message:</div>
                    <code className="block font-mono text-sm bg-red-900/20 text-red-400 p-3 rounded">
                      $ ./backup.sh<br/>
                      bash: ./backup.sh: Permission denied
                    </code>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Diagnosis with stat:</div>
                    <code className="block font-mono text-sm bg-gray-900 text-green-400 p-3 rounded">
                      $ stat backup.sh<br/>
                      Access: (0644/-rw-r--r--) <br/>
                      # Missing execute permission!
                    </code>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-sm text-green-800 dark:text-green-200">
                    <strong>Solution:</strong> Use <code className="font-mono">chmod +x backup.sh</code> to add execute permission
                  </div>
                </div>
              </div>
              
              {/* Scenario 2 */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Problem: File Size Mystery</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tuhina's project folder shows wrong size in file manager
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">File manager shows:</div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                      <div className="font-mono text-gray-800 dark:text-gray-300">
                        project/: 4.0 KB
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Reality with stat:</div>
                    <code className="block font-mono text-sm bg-gray-900 text-green-400 p-3 rounded">
                      $ du -sh project/<br/>
                      50M project/<br/>
                      $ stat project/<br/>
                      Size: 4096 # Directory metadata size
                    </code>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-sm text-purple-800 dark:text-purple-200">
                    <strong>Understanding:</strong> Directory size in stat shows metadata size (inode), 
                    not total content size. Use <code className="font-mono">du</code> for actual disk usage.
                  </div>
                </div>
              </div>
              
              {/* Scenario 3 */}
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400">🕵️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Problem: Who accessed my file?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Abhronila suspects unauthorized access to her notes
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Investigation:</div>
                    <code className="block font-mono text-sm bg-gray-900 text-green-400 p-3 rounded">
                      $ stat personal_notes.txt<br/>
                      Access: 2024-01-16 02:30:00<br/>
                      # Accessed at 2:30 AM!<br/>
                      $ ls -lt<br/>
                      # Check who was logged in at that time
                    </code>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Note:</strong> atime updates on read access. Consider using <code className="font-mono">noatime</code> 
                      mount option for performance, but you'll lose access tracking.
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

  renderPitfallsSection() {
    const { isMounted } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Common Mistakes */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Common Pitfalls & Misconceptions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Beginner Mistakes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-red-700 dark:text-red-400">Common Errors</h3>
                
                {[
                  {
                    mistake: 'Confusing file size with disk usage',
                    explanation: 'stat shows logical size, not physical disk blocks used',
                    example: 'A 1-byte file might use 4KB on disk',
                    fix: 'Use du for disk usage, stat for logical size'
                  },
                  {
                    mistake: 'Assuming all timestamps update together',
                    explanation: 'atime, mtime, and ctime update independently',
                    example: 'chmod changes ctime but not mtime',
                    fix: 'Check which timestamp you actually need'
                  },
                  {
                    mistake: 'Thinking directory size = content size',
                    explanation: 'Directory size in stat is just metadata size',
                    example: 'Empty directory shows 4KB, not 0',
                    fix: 'Use du -sh for total content size'
                  },
                  {
                    mistake: 'Overlooking link count',
                    explanation: 'Link count > 1 means multiple hard links',
                    example: 'Deleting "a copy" might delete the original',
                    fix: 'Always check link count before deleting'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.mistake}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.explanation}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">{item.example}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">{item.fix}</div>
                  </div>
                ))}
              </div>
              
              {/* Conceptual Misunderstandings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-amber-700 dark:text-amber-400">Misconceptions</h3>
                
                {[
                  {
                    myth: '"File size in stat is always accurate"',
                    truth: 'Sparse files show smaller logical size',
                    explanation: 'Files with holes report less than actual disk usage',
                    impact: 'Backups might underestimate space needed'
                  },
                  {
                    myth: '"atime always updates on access"',
                    truth: 'Mount options can disable atime updates',
                    explanation: 'noatime option improves performance',
                    impact: 'Can\'t track file access times'
                  },
                  {
                    myth: '"Same inode = same file name"',
                    truth: 'Multiple names can point to same inode',
                    explanation: 'Hard links share inodes',
                    impact: 'find -samefile shows all names'
                  },
                  {
                    myth: '"stat shows creation time"',
                    truth: 'Linux doesn\'t store creation time',
                    explanation: 'Only atime, mtime, ctime are tracked',
                    impact: 'Can\'t determine when file was created'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.myth}</div>
                    <div className="text-sm text-green-600 dark:text-green-400 mb-1">{item.truth}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.explanation}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">{item.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Debugging & Troubleshooting */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Debugging Guide</h3>
            
            <div className="space-y-6">
              {/* Diagnostic Commands */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4">Diagnostic Command Cheat Sheet</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-gray-300 p-3 rounded mb-2">
                      $ stat -c "%A %U:%G %s %y %n" *
                    </code>
                    <p className="text-sm text-gray-700 dark:text-gray-400">Custom format for all files</p>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-gray-300 p-3 rounded mb-2">
                      $ find . -type f -exec stat -c "%s %n" {} \; | sort -nr
                    </code>
                    <p className="text-sm text-gray-700 dark:text-gray-400">Find largest files</p>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-gray-300 p-3 rounded mb-2">
                      $ stat -f .  # Filesystem info
                    </code>
                    <p className="text-sm text-gray-700 dark:text-gray-400">Filesystem statistics</p>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-gray-300 p-3 rounded mb-2">
                      $ stat -L symlink  # Follow symlinks
                    </code>
                    <p className="text-sm text-gray-700 dark:text-gray-400">Stat target, not link</p>
                  </div>
                </div>
              </div>
              
              {/* Common Problems */}
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-4">Troubleshooting Common Issues</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">Problem: "stat: cannot stat 'file': No such file or directory"</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Possible causes:</div>
                    <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1 ml-4">
                      <li>• File doesn't exist (check spelling)</li>
                      <li>• Insufficient permissions to parent directory</li>
                      <li>• Broken symbolic link</li>
                    </ul>
                    <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                      Solution: Use <code>ls -la</code> to verify file exists and permissions
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">Problem: File shows wrong size</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Possible causes:</div>
                    <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1 ml-4">
                      <li>• File is sparse (has holes)</li>
                      <li>• Compression at filesystem level</li>
                      <li>• Different block size reporting</li>
                    </ul>
                    <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                      Solution: Compare <code>stat</code> size with <code>du -b</code>
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
                  title: 'Daily Usage',
                  items: [
                    'Always use -c for scriptable output',
                    'Pipe stat output to awk for processing',
                    'Create aliases for common stat formats',
                    'Combine with find for batch operations'
                  ],
                  example: 'alias st="stat -c \'%A %s %y %n\'"'
                },
                {
                  title: 'Scripting',
                  items: [
                    'Use stat in backup scripts to check modifications',
                    'Monitor file access for security',
                    'Validate permissions before operations',
                    'Log metadata changes for audit trails'
                  ],
                  example: 'if [ $(stat -c %Y file) -gt $last ]; then backup; fi'
                },
                {
                  title: 'Analysis',
                  items: [
                    'Compare timestamps to detect anomalies',
                    'Monitor link count for hard link management',
                    'Track file growth over time',
                    'Use with auditd for comprehensive logging'
                  ],
                  example: 'watch -n 60 "stat -c %s growing_log.log"'
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
            
            {/* Checklist */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-emerald-200 dark:border-emerald-700">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4">stat Command Checklist</h3>
              
              <div className="space-y-3">
                {[
                  'Before deleting: Check link count (if >1, other files point here)',
                  'Permission issues: Verify Access field matches expected permissions',
                  'Size discrepancies: Compare stat size with du/df outputs',
                  'Timing issues: Check all three timestamps (atime, mtime, ctime)',
                  'Symlink confusion: Use -L to follow or omit to check link itself',
                  'Batch processing: Always use -c with format specifiers'
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200">
                    <span className="text-emerald-500 mr-3 mt-1">{index + 1}.</span>
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
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Classroom Teaching Strategy</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  When I teach stat at Barrackpore Institute, I have students create three identical files, 
                  then perform different operations on each (read one, write to another, chmod the third). 
                  Then we use stat to see how only specific timestamps change. This hands-on approach 
                  helps students like Swadeep and Tuhina understand the three timestamps intuitively.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Common Student Confusion</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Students often think "file size" means "disk space used." I use the analogy of a 
                  bookshelf at Ichapur library: A thin pamphlet (small file) still takes up one shelf slot 
                  (disk block). stat shows the pamphlet's pages (logical size), while du shows the shelf 
                  space used (physical size).
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Professional Insight</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  In production systems at Shyamnagar tech hub, we use stat in monitoring scripts to:
                  1) Detect unauthorized file changes (monitoring mtime), 2) Track configuration file access, 
                  and 3) Audit permission changes. The -c format option makes stat output perfect for parsing 
                  in Python or bash scripts.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Remember This</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  ctime is often misunderstood as "creation time"—it's actually "change time." 
                  A file's ctime updates whenever its metadata changes (permissions, owner, links), 
                  which is why ctime ≥ mtime always. Linux doesn't store creation time at filesystem level.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-400 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Advanced Tips & Tricks</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400">Performance Optimization</h4>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Reduce atime updates:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # In /etc/fstab<br/>
                    /dev/sda1 / ext4 defaults,noatime 0 1
                  </code>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Disables access time updates for better performance
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Batch stat operations:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    $ xargs -0 stat -c "%s" &lt; &lt;(find . -type f -print0)
                  </code>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Processes files with spaces in names safely
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400">Scripting Patterns</h4>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Backup script pattern:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    #!/bin/bash<br/>
                    file="$1"<br/>
                    last_mod=$(stat -c %Y "$file")<br/>
                    if [ $last_mod -gt $LAST_BACKUP ]; then<br/>
                    &nbsp;&nbsp;backup "$file"<br/>
                    fi
                  </code>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Permission validation:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    perm=$(stat -c %a sensitive.txt)<br/>
                    if [ "$perm" != "600" ]; then<br/>
                    &nbsp;&nbsp;chmod 600 sensitive.txt<br/>
                    fi
                  </code>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
              <div className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">💡</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white mb-1">Pro Tip:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Create a custom stat function in your .bashrc: 
                    <code className="font-mono mx-1">function mystat() {"{"} stat -c "Inode: %i | Size: %s | Perm: %A | Modified: %y" "$@"; {"}"}</code>
                    This gives you quick, formatted output without remembering format specifiers.
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
                Topic 10: File Metadata
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white leading-tight">
                stat Command – Reading File Metadata
                <span className="block text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Master file system forensics and metadata analysis
                </span>
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'concept', label: 'Core Concept', icon: '📊' },
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
                  <li>• stat reveals complete file metadata</li>
                  <li>• Three timestamps: atime, mtime, ctime</li>
                  <li>• Use -c for scriptable output</li>
                  <li>• Understand inode structure</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• stat different file types</li>
                  <li>• Create custom format outputs</li>
                  <li>• Monitor file changes over time</li>
                  <li>• Debug permission issues</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Barrackpore Institute</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Practical system administration skills taught through real scenarios from Naihati, Ichapur, and Shyamnagar labs.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-500">
              <p>Topic 11: stat Command • File Metadata Analysis • Barrackpore Institute</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}