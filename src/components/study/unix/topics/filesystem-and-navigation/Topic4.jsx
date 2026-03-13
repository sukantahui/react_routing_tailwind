// Topic4.jsx - Understanding inode numbers and file metadata
import React, { Component } from 'react';

export default class Topic4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeSection: 'inode',
      selectedInode: null,
      fileSystemView: 'structure',
      metadataDetails: {
        inode: 123456,
        permissions: '-rw-r--r--',
        links: 1,
        owner: 'swadeep',
        group: 'students',
        size: 4096,
        modified: '2024-01-16 10:30:00',
        accessed: '2024-01-16 14:20:00',
        changed: '2024-01-16 10:30:00',
        blocks: 8,
        device: '8,1'
      }
    };
  }

  componentDidMount() {
    // Trigger animations after component mounts
    setTimeout(() => {
      this.setState({ isMounted: true });
    }, 100);
  }

  handleSectionChange = (section) => {
    this.setState({ activeSection: section });
  };

  handleInodeSelect = (inodeNumber) => {
    this.setState({ 
      selectedInode: inodeNumber,
      metadataDetails: this.generateMetadataForInode(inodeNumber)
    });
  };

  handleViewChange = (view) => {
    this.setState({ fileSystemView: view });
  };

  generateMetadataForInode = (inodeNumber) => {
    // Generate realistic metadata based on inode number
    const metadataTemplates = {
      123456: {
        inode: 123456,
        permissions: '-rw-r--r--',
        links: 1,
        owner: 'swadeep',
        group: 'students',
        size: 4096,
        modified: '2024-01-16 10:30:00',
        accessed: '2024-01-16 14:20:00',
        changed: '2024-01-16 10:30:00',
        blocks: 8,
        device: '8,1',
        filename: 'project1.py',
        fileType: 'Regular file'
      },
      123457: {
        inode: 123457,
        permissions: 'drwxr-xr-x',
        links: 3,
        owner: 'tuhina',
        group: 'students',
        size: 4096,
        modified: '2024-01-15 14:20:00',
        accessed: '2024-01-16 09:15:00',
        changed: '2024-01-15 14:20:00',
        blocks: 8,
        device: '8,1',
        filename: 'Documents/',
        fileType: 'Directory'
      },
      123458: {
        inode: 123458,
        permissions: 'lrwxrwxrwx',
        links: 1,
        owner: 'abhronila',
        group: 'students',
        size: 23,
        modified: '2024-01-14 09:15:00',
        accessed: '2024-01-16 08:30:00',
        changed: '2024-01-14 09:15:00',
        blocks: 1,
        device: '8,1',
        filename: 'current → latest',
        fileType: 'Symbolic link'
      },
      123459: {
        inode: 123459,
        permissions: 'brw-rw----',
        links: 1,
        owner: 'root',
        group: 'disk',
        size: 0,
        modified: '2024-01-01 00:00:00',
        accessed: '2024-01-16 10:00:00',
        changed: '2024-01-01 00:00:00',
        blocks: 0,
        device: '8,0',
        filename: '/dev/sda',
        fileType: 'Block device'
      }
    };

    return metadataTemplates[inodeNumber] || metadataTemplates[123456];
  };

  render() {
    const { isMounted, activeSection, selectedInode, fileSystemView, metadataDetails } = this.state;

    // Section data
    const sections = {
      inode: {
        title: 'Inode Fundamentals',
        icon: '🔢',
        color: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
        borderColor: 'border-blue-200 dark:border-blue-700'
      },
      metadata: {
        title: 'File Metadata',
        icon: '📄',
        color: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
        borderColor: 'border-green-200 dark:border-green-700'
      },
      practical: {
        title: 'Practical Usage',
        icon: '🔧',
        color: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
        borderColor: 'border-purple-200 dark:border-purple-700'
      }
    };

    // Inode data for visualization
    const inodes = [
      { number: 123456, type: 'file', name: 'project1.py', used: true, owner: 'swadeep' },
      { number: 123457, type: 'directory', name: 'Documents/', used: true, owner: 'tuhina' },
      { number: 123458, type: 'symlink', name: 'current → latest', used: true, owner: 'abhronila' },
      { number: 123459, type: 'device', name: '/dev/sda', used: true, owner: 'root' },
      { number: 123460, type: 'free', name: 'Free', used: false, owner: null },
      { number: 123461, type: 'free', name: 'Free', used: false, owner: null },
      { number: 123462, type: 'file', name: 'notes.txt', used: true, owner: 'swadeep' },
      { number: 123463, type: 'directory', name: 'src/', used: true, owner: 'tuhina' },
      { number: 123464, type: 'free', name: 'Free', used: false, owner: null },
      { number: 123465, type: 'file', name: 'data.csv', used: true, owner: 'abhronila' },
      { number: 123466, type: 'free', name: 'Free', used: false, owner: null },
      { number: 123467, type: 'directory', name: 'backup/', used: true, owner: 'swadeep' }
    ];

    // Animation styles
    const baseAnimation = isMounted 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-4';

    // Inline keyframes
    const animationStyle = `
      @keyframes inodePulse {
        0%, 100% { 
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
        }
        70% { 
          box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
        }
      }
      
      @keyframes dataFlow {
        0% {
          stroke-dashoffset: 100;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      
      @keyframes highlight {
        0% { background-color: rgba(59, 130, 246, 0.1); }
        100% { background-color: transparent; }
      }
      
      .animate-inode-pulse {
        animation: inodePulse 2s infinite;
      }
      
      .animate-data-flow {
        animation: dataFlow 3s linear infinite;
      }
      
      .animate-highlight {
        animation: highlight 1.5s ease-out;
      }
    `;

    // Current section
    const currentSection = sections[activeSection];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-900 p-4 md:p-8 transition-colors duration-300">
        <style>{animationStyle}</style>
        
        {/* Header Section */}
        <section className={`max-w-7xl mx-auto mb-12 transition-all duration-700 ${baseAnimation}`}>
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🔍</span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Understanding inode numbers and file metadata
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              Discover the hidden data structure that powers Linux filesystems - from inode numbers to comprehensive file metadata
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

        {/* Main Content - Inode Section */}
        {activeSection === 'inode' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Inode Explanation */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-3">🔢</span> What is an inode?
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      An <span className="font-bold text-blue-600 dark:text-blue-400">inode</span> (index node) is a data structure in Unix/Linux filesystems 
                      that stores all the information about a file <span className="italic">except its name and actual data content</span>.
                    </p>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Real-world Analogy</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Think of an inode like a student's ID card at Barrackpore Institute. 
                        The card has the student's details (ID number, photo, department) but not their name on the classroom door.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Stored in inode</h4>
                        <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                          <li>• File size</li>
                          <li>• Permissions</li>
                          <li>• Owner & group</li>
                          <li>• Timestamps</li>
                          <li>• Pointer to data</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">NOT stored in inode</h4>
                        <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                          <li>• File name</li>
                          <li>• File content</li>
                          <li>• Directory structure</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inode Table Structure */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Inode Table Structure</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Field</th>
                          <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Size</th>
                          <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { field: 'Mode/Permissions', size: '2 bytes', desc: 'File type and access rights' },
                          { field: 'Link Count', size: '2 bytes', desc: 'Number of hard links' },
                          { field: 'Owner UID', size: '4 bytes', desc: 'Owner user ID' },
                          { field: 'Group GID', size: '4 bytes', desc: 'Group ID' },
                          { field: 'File Size', size: '8 bytes', desc: 'Size in bytes' },
                          { field: 'Timestamps', size: '12 bytes', desc: 'Created, modified, accessed' },
                          { field: 'Data Blocks', size: '60 bytes', desc: 'Pointers to data blocks' },
                          { field: 'Generation #', size: '4 bytes', desc: 'File version (NFS)' },
                          { field: 'Extended', size: 'variable', desc: 'Additional metadata' }
                        ].map((row, index) => (
                          <tr 
                            key={index} 
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          >
                            <td className="py-2 px-3 font-mono text-blue-600 dark:text-blue-400">{row.field}</td>
                            <td className="py-2 px-3 text-gray-700 dark:text-gray-400">{row.size}</td>
                            <td className="py-2 px-3 text-gray-700 dark:text-gray-400">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      <span className="font-semibold">Note:</span> Inode size is typically 128 or 256 bytes. 
                      The exact structure varies between filesystems (ext4, XFS, Btrfs).
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Inode Visualization */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
                {/* Filesystem View Toggle */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Filesystem Visualization</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => this.handleViewChange('structure')}
                        className={`px-3 py-1 rounded text-sm ${fileSystemView === 'structure' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        Structure
                      </button>
                      <button
                        onClick={() => this.handleViewChange('inodetree')}
                        className={`px-3 py-1 rounded text-sm ${fileSystemView === 'inodetree' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        Inode Tree
                      </button>
                    </div>
                  </div>

                  {/* Filesystem Visualization */}
                  <div className="relative">
                    {fileSystemView === 'structure' ? (
                      <div className="space-y-4">
                        {/* Directory Entry */}
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Directory Entry</h4>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                              <div className="text-xs text-gray-500">Filename</div>
                              <div className="font-mono text-sm">project1.py</div>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                              <div className="text-xs text-gray-500">Inode #</div>
                              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">123456</div>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                              <div className="text-xs text-gray-500">File Type</div>
                              <div className="font-mono text-sm">Regular</div>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex justify-center">
                          <div className="text-2xl text-gray-400">↓</div>
                        </div>

                        {/* Inode Structure */}
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Inode Structure</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded">
                              <div className="text-xs text-gray-500">Metadata</div>
                              <div className="text-sm">Permissions, size, timestamps...</div>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-800 rounded">
                              <div className="text-xs text-gray-500">Data Pointers</div>
                              <div className="text-sm">→ Block 1001, 1002...</div>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex justify-center">
                          <div className="text-2xl text-gray-400">↓</div>
                        </div>

                        {/* Data Blocks */}
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Data Blocks</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {[1001, 1002, 1003, 1004].map(block => (
                              <div key={block} className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                                <div className="text-xs text-gray-500">Block</div>
                                <div className="font-mono text-sm">{block}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Inode Tree View */
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Inode Allocation Map</h4>
                          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                            {inodes.map((inode) => (
                              <button
                                key={inode.number}
                                onClick={() => this.handleInodeSelect(inode.number)}
                                className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center ${selectedInode === inode.number 
                                  ? 'ring-2 ring-blue-500 bg-blue-100 dark:bg-blue-900/30 animate-inode-pulse' 
                                  : inode.used 
                                    ? inode.type === 'file' 
                                      ? 'bg-green-100 dark:bg-green-900/30' 
                                      : inode.type === 'directory'
                                      ? 'bg-blue-100 dark:bg-blue-900/30'
                                      : 'bg-purple-100 dark:bg-purple-900/30'
                                    : 'bg-gray-100 dark:bg-gray-700'
                                }`}
                              >
                                <div className="font-mono text-sm font-bold">
                                  {inode.number}
                                </div>
                                <div className="text-xs mt-1 truncate w-full text-center">
                                  {inode.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {inode.used ? inode.type : 'free'}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Inode Details */}
                {selectedInode && (
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-highlight">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      Inode #{selectedInode} Details
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                          <div className="text-xs text-gray-500">File Type</div>
                          <div className="font-mono text-sm">{metadataDetails.fileType}</div>
                        </div>
                        <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                          <div className="text-xs text-gray-500">Filename</div>
                          <div className="font-mono text-sm">{metadataDetails.filename}</div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Key Concept</div>
                        <p className="text-sm text-gray-700 dark:text-gray-400">
                          Inode #{selectedInode} is the unique identifier. The filename is just a directory entry pointing to this inode.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Inode Commands */}
                <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">Working with Inodes</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">View file inode number:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-2 rounded">
                        $ ls -i project1.py
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Find file by inode:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-2 rounded">
                        $ find /home -inum 123456
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Check inode usage:</div>
                      <code className="block font-mono text-green-400 bg-black/50 p-2 rounded">
                        $ df -i
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Metadata Section */}
        {activeSection === 'metadata' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Metadata Explanation */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-3">📄</span> File Metadata Components
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      File metadata is the "data about data" - all the information stored in the inode that describes 
                      a file's properties without containing the actual file content.
                    </p>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Barrackpore Institute Analogy</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Think of a student's file at the administration office. The file contains metadata (admission date, 
                        course, grades) but not the actual student (content).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timestamps Explained */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">The Three Timestamps</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Modified (mtime)',
                        command: 'ls -l',
                        description: 'When file content was last changed',
                        example: 'Swadeep edits project1.py'
                      },
                      {
                        name: 'Accessed (atime)',
                        command: 'ls -lu',
                        description: 'When file was last read/accessed',
                        example: 'Tuhina reads notes.txt'
                      },
                      {
                        name: 'Changed (ctime)',
                        command: 'ls -lc',
                        description: 'When file metadata was changed',
                        example: 'Abhronila changes permissions'
                      }
                    ].map((timestamp, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400">{timestamp.name}</h4>
                          <code className="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                            {timestamp.command}
                          </code>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                          {timestamp.description}
                        </p>
                        <div className="text-xs text-gray-500 italic">
                          Example: {timestamp.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Interactive Metadata Viewer */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
                {/* Metadata Viewer */}
                <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-300 mb-4">Interactive Metadata Viewer</h3>
                  
                  <div className="mb-6">
                    <div className="text-gray-400 mb-2">View metadata with stat command:</div>
                    <code className="block font-mono text-lg text-green-400 bg-black/50 p-4 rounded-lg">
                      $ stat project1.py
                    </code>
                  </div>

                  {/* Simulated stat output */}
                  <div className="font-mono text-sm bg-black p-4 rounded-lg">
                    <div className="text-gray-500">File: 'project1.py'</div>
                    <div className="text-gray-500">Size: {metadataDetails.size}{' '}
                      <span className="text-gray-400">Blocks: {metadataDetails.blocks}{' '}
                      IO Block: 4096 regular file</span>
                    </div>
                    <div className="text-gray-500">Device: {metadataDetails.device}{' '}
                      <span className="text-gray-400">Inode: {metadataDetails.inode}{' '}
                      Links: {metadataDetails.links}</span>
                    </div>
                    <div className="text-gray-500">Access: ({metadataDetails.permissions}){' '}
                      <span className="text-cyan-400">Uid: ({metadataDetails.owner}){' '}
                      Gid: ({metadataDetails.group})</span>
                    </div>
                    <div className="text-gray-500 mt-2">Access: {metadataDetails.accessed}</div>
                    <div className="text-green-400">Modify: {metadataDetails.modified}</div>
                    <div className="text-yellow-400">Change: {metadataDetails.changed}</div>
                  </div>

                  {/* Metadata Fields */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {Object.entries(metadataDetails).map(([key, value]) => (
                      <div key={key} className="p-3 bg-gray-700 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">{key}</div>
                        <div className="font-mono text-sm text-white truncate">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hard Links Visualization */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Hard Links & Link Count</h3>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Hard links are multiple directory entries pointing to the same inode. 
                      The "Links" count in metadata shows how many hard links exist for a file.
                    </p>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center justify-center space-x-6 mb-4">
                        {/* Inode */}
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <div className="font-mono font-bold">#123456</div>
                          </div>
                          <div className="text-xs mt-2 text-gray-600 dark:text-gray-400">Inode</div>
                        </div>
                        
                        {/* Arrows */}
                        <div className="flex flex-col items-center">
                          <div className="text-2xl text-gray-400">←</div>
                          <div className="text-2xl text-gray-400">→</div>
                        </div>
                        
                        {/* Files */}
                        <div className="space-y-2">
                          <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded text-center">
                            <div className="font-mono">project1.py</div>
                          </div>
                          <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded text-center">
                            <div className="font-mono">backup.py</div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Both filenames point to the same inode. Link count = 2
                      </p>
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
              {/* Left Column - Practical Examples */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '400ms'}}>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="mr-3">🔧</span> Practical Applications
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Understanding inodes and metadata is crucial for system administration, 
                      debugging, and efficient filesystem management.
                    </p>
                  </div>
                </div>

                {/* Common Tasks */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Common Administrative Tasks</h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        task: 'Find and delete files with zero links',
                        command: 'find /tmp -type f -links 0 -delete',
                        explanation: 'Clean up orphaned files in /tmp'
                      },
                      {
                        task: 'Monitor inode usage',
                        command: 'df -i',
                        explanation: 'Prevent "No space left on device" due to inode exhaustion'
                      },
                      {
                        task: 'Find recently modified config files',
                        command: 'find /etc -type f -mtime -1',
                        explanation: 'Debug system changes at Shyamnagar Lab'
                      },
                      {
                        task: 'Check for large files by inode',
                        command: 'find /var -inum 123456 -exec ls -lh {} \\;',
                        explanation: 'Identify specific files consuming space'
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400">{item.task}</h4>
                        </div>
                        <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                          {item.command}
                        </code>
                        <p className="text-sm text-gray-700 dark:text-gray-400">
                          {item.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Debugging Scenarios */}
              <div className={`space-y-6 transition-all duration-700 ${baseAnimation}`} style={{animationDelay: '600ms'}}>
                {/* Debugging Scenarios */}
                <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg border border-red-200 dark:border-red-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Debugging Scenarios</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Scenario 1: "No space left on device"</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                        Tuhina at Naihati Lab sees disk space available but cannot create files.
                      </p>
                      <div className="space-y-2">
                        <div className="font-mono text-xs bg-black/50 p-2 rounded">
                          $ df -h<br/>
                          Filesystem Size Used Avail Use% Mounted on<br/>
                          /dev/sda1 50G 30G 20G 60% /
                        </div>
                        <div className="font-mono text-xs bg-black/50 p-2 rounded">
                          $ df -i<br/>
                          Filesystem Inodes IUsed IFree IUse% Mounted on<br/>
                          /dev/sda1 3.2M 3.2M 0 100% /
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Solution:</span> Inode exhaustion! Clean up small files.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Scenario 2: File disappears after rm</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
                        Swadeep deletes a file but disk space doesn't free up.
                      </p>
                      <div className="space-y-2">
                        <div className="font-mono text-xs bg-black/50 p-2 rounded">
                          $ ls -i important.txt<br/>
                          123456 important.txt
                        </div>
                        <div className="font-mono text-xs bg-black/50 p-2 rounded">
                          $ lsof | grep 123456<br/>
                          python3 1234 swadeep 3r REG 8,1 4096 123456 /proc/1234/fd/3
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Solution:</span> Process holds open file descriptor. 
                          Space freed when process closes file.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg border border-green-200 dark:border-green-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                  
                  <div className="space-y-3">
                    {[
                      'Always check inode usage (df -i) on filesystems with many small files',
                      'Use stat command to verify file metadata during debugging',
                      'Remember: Deleting a file removes directory entry, not necessarily data',
                      'Monitor atime updates if performance is critical (noatime mount option)',
                      'Understand difference between mtime, atime, and ctime for troubleshooting'
                    ].map((practice, index) => (
                      <div key={index} className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm text-gray-700 dark:text-gray-400">{practice}</span>
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
          <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl shadow-lg border border-amber-200 dark:border-yellow-700 hover:shadow-xl transition-all duration-500">
            <div className="flex items-start">
              <div className="mr-4 text-3xl">👨‍🏫</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Teacher's Note</h2>
                
                <div className="bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">Key Insight:</span> 
                    Inodes are the "soul" of Linux files. The filename is just a "name tag" pointing to the inode. 
                    This separation is what enables powerful features like hard links and efficient filesystem operations.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    At Ichapur Computer Lab, I use this analogy:
                    <span className="font-mono block mt-2 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      Inode = Student record in database<br/>
                      Filename = Student's name on classroom door<br/>
                      Hard links = Same student in multiple class lists
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Memory Aid</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      <code>mtime</code> = Modified content<br/>
                      <code>atime</code> = Accessed/read<br/>
                      <code>ctime</code> = Changed metadata
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-100/50 dark:bg-yellow-900/30 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Debugging Tip</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      When disk shows space but can't create files:<br/>
                      Always run <code>df -i</code> first!
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-100/50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">Command to Master</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      <code>stat filename</code> - Shows all metadata<br/>
                      <code>ls -i</code> - Shows inode number
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
                  Abhronila at Shyamnagar College discovers:
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <code className="block text-xs font-mono mb-2">
                      $ ls -i notes.txt report.txt<br/>
                      123456 notes.txt<br/>
                      123456 report.txt
                    </code>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      What does this output indicate about notes.txt and report.txt?
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <code className="block text-xs font-mono mb-2">
                      $ stat project.py<br/>
                      Links: 3
                    </code>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      How many hard links exist for project.py? What happens when Links reaches 0?
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <code className="block text-xs font-mono mb-2">
                      $ touch file.txt<br/>
                      $ echo "data" > file.txt<br/>
                      $ chmod 644 file.txt
                    </code>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Which timestamp (mtime, atime, ctime) changes with each command?
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Quiz</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      What is stored in an inode?
                    </p>
                    <div className="space-y-2">
                      {[
                        'File content and filename',
                        'File metadata except name and content',
                        'Only file permissions and size',
                        'Directory structure information'
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
                      Which command shows inode numbers?
                    </p>
                    <div className="space-y-2">
                      {['ls -l', 'ls -i', 'stat', 'df -h'].map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="radio" id={`quiz2-${idx}`} name="quiz2" className="mr-2" />
                          <label htmlFor={`quiz2-${idx}`} className="text-sm text-gray-700 dark:text-gray-400 cursor-pointer">
                            <code className="font-mono">{option}</code>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 text-sm">Think About</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Why can you have multiple filenames (hard links) pointing to the same inode, 
                      but not multiple inodes pointing to the same filename?
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
              <span className="font-semibold">Topic 5</span> of Linux Fundamentals Series
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                ← Previous: ls Advanced Options
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                Next: Absolute vs Relative Paths →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}