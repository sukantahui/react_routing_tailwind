// Topic12.jsx - find with conditions: name, size, type, permissions, time
import React, { Component } from 'react';

export default class Topic12 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeTab: 'concept',
      selectedCondition: 'name',
      searchDirectory: '/home/student',
      conditionValues: {
        name: '*.txt',
        size: '+1M',
        type: 'f',
        permissions: '644',
        time: '-7'
      },
      generatedCommand: '',
      searchResults: [],
      isSearching: false,
      showAdvancedOptions: false,
      animationsLoaded: false
    };
  }

  componentDidMount() {
    // Trigger initial animations
    this.setState({ isMounted: true });
    setTimeout(() => {
      this.setState({ animationsLoaded: true });
    }, 100);
    this.generateCommand();
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleConditionSelect = (condition) => {
    this.setState({ 
      selectedCondition: condition,
      searchResults: []
    }, () => this.generateCommand());
  };

  handleConditionValueChange = (condition, value) => {
    this.setState(prevState => ({
      conditionValues: {
        ...prevState.conditionValues,
        [condition]: value
      }
    }), () => this.generateCommand());
  };

  handleDirectoryChange = (e) => {
    this.setState({ searchDirectory: e.target.value }, () => this.generateCommand());
  };

  toggleAdvancedOptions = () => {
    this.setState(prevState => ({ 
      showAdvancedOptions: !prevState.showAdvancedOptions 
    }));
  };

  generateCommand = () => {
    const { selectedCondition, searchDirectory, conditionValues } = this.state;
    let command = `find ${searchDirectory}`;
    
    // Always include the selected condition
    switch(selectedCondition) {
      case 'name':
        command += ` -name "${conditionValues.name}"`;
        break;
      case 'size':
        command += ` -size ${conditionValues.size}`;
        break;
      case 'type':
        command += ` -type ${conditionValues.type}`;
        break;
      case 'permissions':
        command += ` -perm ${conditionValues.permissions}`;
        break;
      case 'time':
        command += ` -mtime ${conditionValues.time}`;
        break;
    }
    
    this.setState({ generatedCommand: command });
  };

  executeSearch = () => {
    this.setState({ isSearching: true, searchResults: [] });
    
    // Simulate search with artificial delay
    setTimeout(() => {
      const results = this.generateSearchResults();
      this.setState({ 
        searchResults: results,
        isSearching: false 
      });
    }, 1000);
  };

  generateSearchResults = () => {
    const { selectedCondition, conditionValues } = this.state;
    const baseResults = [
      { name: 'research_paper.pdf', type: 'file', size: '2.5M', permissions: '644', modified: '2 days ago' },
      { name: 'experiment_data.csv', type: 'file', size: '15M', permissions: '600', modified: '1 day ago' },
      { name: 'backup_archive.tar.gz', type: 'file', size: '150M', permissions: '644', modified: '1 week ago' },
      { name: 'script.sh', type: 'file', size: '2K', permissions: '755', modified: '3 hours ago' },
      { name: 'config.json', type: 'file', size: '1K', permissions: '644', modified: '5 days ago' },
      { name: 'logs/', type: 'directory', size: '4K', permissions: '755', modified: '1 day ago' },
      { name: 'temp_file.tmp', type: 'file', size: '500K', permissions: '777', modified: '6 hours ago' },
      { name: 'notes.txt', type: 'file', size: '100K', permissions: '644', modified: 'today' },
      { name: 'secret_key.pem', type: 'file', size: '2K', permissions: '400', modified: '1 month ago' },
      { name: 'public_html/', type: 'directory', size: '4K', permissions: '755', modified: '2 weeks ago' }
    ];

    // Filter based on selected condition
    return baseResults.filter(item => {
      switch(this.state.selectedCondition) {
        case 'name':
          const pattern = conditionValues.name.replace('*', '.*').replace('?', '.');
          const regex = new RegExp(pattern);
          return regex.test(item.name);
        case 'size':
          const sizeValue = conditionValues.size;
          const sizeNum = parseFloat(item.size);
          if (sizeValue.startsWith('+')) {
            const threshold = parseFloat(sizeValue.slice(1, -1));
            return sizeNum > threshold;
          } else if (sizeValue.startsWith('-')) {
            const threshold = parseFloat(sizeValue.slice(1, -1));
            return sizeNum < threshold;
          }
          return true;
        case 'type':
          const typeMap = { f: 'file', d: 'directory', l: 'symlink' };
          return item.type === typeMap[conditionValues.type];
        case 'permissions':
          return item.permissions === conditionValues.permissions;
        case 'time':
          // Simplified time filtering
          const timeValue = parseInt(conditionValues.time);
          if (timeValue < 0) return item.modified.includes('day') || item.modified.includes('hour') || item.modified === 'today';
          return true;
        default:
          return true;
      }
    });
  };

  renderConceptSection() {
    const { isMounted, selectedCondition, conditionValues } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Introduction */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Mastering find Conditions</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The real power of <code className="font-mono text-green-600 dark:text-green-400">find</code> lies in its ability to filter files 
              using precise conditions. Think of it as a detective tool that can search based on name patterns, 
              file sizes, types, permissions, and modification times—all in one command.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                  <span className="mr-2">🔍</span> Real-world Analogy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Like Swadeep searching the Barrackpore Institute library: "Find all physics books (type) 
                  published after 2020 (time) that are thicker than 300 pages (size) with red covers (name pattern)."
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                  <span className="mr-2">🎯</span> Why Master This?
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Automate file cleanup tasks</li>
                  <li>• Security auditing of permissions</li>
                  <li>• Disk space management</li>
                  <li>• Backup and archival scripts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Condition Selector */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">find Condition Types</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {[
                { id: 'name', label: 'Name', icon: '📝', color: 'blue' },
                { id: 'size', label: 'Size', icon: '📊', color: 'green' },
                { id: 'type', label: 'Type', icon: '📁', color: 'purple' },
                { id: 'permissions', label: 'Permissions', icon: '🔐', color: 'amber' },
                { id: 'time', label: 'Time', icon: '⏰', color: 'red' }
              ].map((condition) => (
                <button
                  key={condition.id}
                  onClick={() => this.handleConditionSelect(condition.id)}
                  className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    selectedCondition === condition.id
                      ? `border-2 bg-${condition.color}-50 dark:bg-${condition.color}-900/20 border-${condition.color}-500 shadow-lg`
                      : 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-2">{condition.icon}</span>
                    <div className="font-semibold text-gray-800 dark:text-white">{condition.label}</div>
                    <div className={`text-xs mt-1 ${
                      selectedCondition === condition.id 
                        ? `text-${condition.color}-600 dark:text-${condition.color}-400`
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {selectedCondition === condition.id ? 'Selected' : 'Click to select'}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Condition Details */}
            <div className="space-y-8">
              {/* Name Condition */}
              {selectedCondition === 'name' && (
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 animate-[fadeIn_0.5s_ease-out]">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4 flex items-center">
                    <span className="mr-2">📝</span> Name Pattern Matching
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Pattern:</label>
                        <input
                          type="text"
                          value={conditionValues.name}
                          onChange={(e) => this.handleConditionValueChange('name', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="*.txt, file*.pdf, config.???"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-800 dark:text-white">Common Patterns:</h5>
                        {[
                          { pattern: '*.txt', desc: 'All .txt files' },
                          { pattern: 'file*.pdf', desc: 'PDFs starting with "file"' },
                          { pattern: 'config.???', desc: 'config with 3-character extension' },
                          { pattern: 'image[0-9].jpg', desc: 'image1.jpg, image2.jpg, etc.' },
                          { pattern: '*.{log,tmp}', desc: 'Files ending with .log or .tmp' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="font-mono text-sm text-blue-600 dark:text-blue-400 mr-3">
                              {item.pattern}
                            </code>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white mb-3">How It Works:</h5>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-sm text-gray-700 dark:text-gray-400">
                            <code className="font-mono">*</code> matches any sequence of characters
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-sm text-gray-700 dark:text-gray-400">
                            <code className="font-mono">?</code> matches any single character
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-sm text-gray-700 dark:text-gray-400">
                            <code className="font-mono">[abc]</code> matches a, b, or c
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-sm text-gray-700 dark:text-gray-400">
                            <code className="font-mono">[0-9]</code> matches any digit
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-sm text-gray-700 dark:text-gray-400">
                            Use <code className="font-mono">-iname</code> for case-insensitive search
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Real-world:</strong> Tuhina uses <code>find . -name "*.py"</code> to find all Python files 
                          in her Barrackpore Institute project directory.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Size Condition */}
              {selectedCondition === 'size' && (
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700 animate-[fadeIn_0.5s_ease-out]">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center">
                    <span className="mr-2">📊</span> File Size Filtering
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Size Specification:</label>
                        <select
                          value={conditionValues.size}
                          onChange={(e) => this.handleConditionValueChange('size', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="+1M">Larger than 1MB</option>
                          <option value="-1M">Smaller than 1MB</option>
                          <option value="+100M">Larger than 100MB</option>
                          <option value="+1G">Larger than 1GB</option>
                          <option value="10k">Exactly 10KB</option>
                        </select>
                      </div>
                      
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-800 dark:text-white">Size Units:</h5>
                        {[
                          { unit: 'b', desc: '512-byte blocks (default)' },
                          { unit: 'c', desc: 'Bytes' },
                          { unit: 'k', desc: 'Kilobytes (1024 bytes)' },
                          { unit: 'M', desc: 'Megabytes (1024 kilobytes)' },
                          { unit: 'G', desc: 'Gigabytes (1024 megabytes)' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="font-mono text-sm text-green-600 dark:text-green-400">
                              {item.unit}
                            </code>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white mb-3">Size Examples:</h5>
                      <div className="space-y-3">
                        {[
                          { cmd: 'find . -size +100M', desc: 'Files larger than 100MB' },
                          { cmd: 'find /var/log -size -1k', desc: 'Log files smaller than 1KB' },
                          { cmd: 'find ~ -size +500M -size -1G', desc: 'Files between 500MB and 1GB' },
                          { cmd: 'find . -size 0', desc: 'Empty files' },
                          { cmd: 'find /tmp -size +10M -delete', desc: 'Delete tmp files > 10MB' }
                        ].map((example, index) => (
                          <div key={index} className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                            <code className="block font-mono text-xs text-green-600 dark:text-green-400 mb-1">
                              $ {example.cmd}
                            </code>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{example.desc}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Tip:</strong> Use <code>find . -size +100M -exec ls -lh {} \;</code> to see human-readable sizes 
                          of large files at Barrackpore Institute's research server.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Type Condition */}
              {selectedCondition === 'type' && (
                <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700 animate-[fadeIn_0.5s_ease-out]">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-4 flex items-center">
                    <span className="mr-2">📁</span> File Type Filtering
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">File Type:</label>
                        <select
                          value={conditionValues.type}
                          onChange={(e) => this.handleConditionValueChange('type', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="f">Regular file (f)</option>
                          <option value="d">Directory (d)</option>
                          <option value="l">Symbolic link (l)</option>
                          <option value="b">Block device (b)</option>
                          <option value="c">Character device (c)</option>
                          <option value="p">Named pipe (p)</option>
                          <option value="s">Socket (s)</option>
                        </select>
                      </div>
                      
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-800 dark:text-white">File Type Examples:</h5>
                        {[
                          { type: 'f', icon: '📄', desc: 'Regular files (documents, images)' },
                          { type: 'd', icon: '📁', desc: 'Directories (folders)' },
                          { type: 'l', icon: '🔗', desc: 'Symbolic links (shortcuts)' },
                          { type: 'b', icon: '💾', desc: 'Block devices (hard drives)' },
                          { type: 'c', icon: '⌨️', desc: 'Character devices (terminals)' },
                          { type: 'p', icon: '📞', desc: 'Named pipes (inter-process communication)' },
                          { type: 's', icon: '🔌', desc: 'Sockets (network communication)' }
                        ].map((item, index) => (
                          <div 
                            key={index}
                            className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                              conditionValues.type === item.type
                                ? 'bg-purple-100 dark:bg-purple-900/30'
                                : 'bg-white/50 dark:bg-gray-800/50'
                            }`}
                          >
                            <span className="text-xl mr-3">{item.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center">
                                <code className="font-mono text-sm text-purple-600 dark:text-purple-400 mr-2">
                                  {item.type}
                                </code>
                                <span className="text-sm text-gray-800 dark:text-gray-300">{item.desc}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white mb-3">Practical Examples:</h5>
                      <div className="space-y-3">
                        {[
                          { cmd: 'find . -type f -name "*.sh"', desc: 'Find all shell script files' },
                          { cmd: 'find /var -type d -empty', desc: 'Find empty directories in /var' },
                          { cmd: 'find . -type l -exec ls -l {} \\;', desc: 'List all symbolic links with targets' },
                          { cmd: 'find /dev -type b', desc: 'Find block devices' },
                          { cmd: 'find . -type f -o -type d', desc: 'Find both files AND directories' }
                        ].map((example, index) => (
                          <div key={index} className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                            <code className="block font-mono text-xs text-purple-600 dark:text-purple-400 mb-1">
                              $ {example.cmd}
                            </code>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{example.desc}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Real-world:</strong> Abhronila uses <code>find . -type f -empty</code> to clean up 
                          empty files from her project directory at Barrackpore Institute.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Permissions Condition */}
              {selectedCondition === 'permissions' && (
                <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700 animate-[fadeIn_0.5s_ease-out]">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-4 flex items-center">
                    <span className="mr-2">🔐</span> Permission Filtering
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Permission Mode:</label>
                        <input
                          type="text"
                          value={conditionValues.permissions}
                          onChange={(e) => this.handleConditionValueChange('permissions', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="644, 755, /222, -w-w-w-"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h5 className="font-medium text-gray-800 dark:text-white">Permission Formats:</h5>
                        
                        <div>
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Octal Notation:</div>
                          <div className="grid grid-cols-3 gap-2">
                            {['644', '755', '600', '777', '400', '222'].map((perm) => (
                              <button
                                key={perm}
                                onClick={() => this.handleConditionValueChange('permissions', perm)}
                                className={`p-2 rounded-lg text-center transition-colors duration-200 ${
                                  conditionValues.permissions === perm
                                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                <code className="font-mono">{perm}</code>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Symbolic Notation:</div>
                          <div className="space-y-2">
                            {[
                              { perm: '/222', desc: 'Any write permission set' },
                              { perm: '-w-w-w-', desc: 'World-writable files' },
                              { perm: 'u=r', desc: 'User readable only' },
                              { perm: 'g=x', desc: 'Group executable only' }
                            ].map((item, index) => (
                              <button
                                key={index}
                                onClick={() => this.handleConditionValueChange('permissions', item.perm)}
                                className={`w-full p-2 rounded-lg text-left transition-colors duration-200 ${
                                  conditionValues.permissions === item.perm
                                    ? 'bg-amber-100 dark:bg-amber-900/30'
                                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                              >
                                <code className="font-mono text-sm text-amber-600 dark:text-amber-400 mr-2">
                                  {item.perm}
                                </code>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white mb-3">Security Examples:</h5>
                      <div className="space-y-3">
                        {[
                          { cmd: 'find /home -perm 777', desc: 'World-writable files (security risk!)' },
                          { cmd: 'find /etc -perm /4000', desc: 'Setuid files (security check)' },
                          { cmd: 'find . -perm 644 -type f', desc: 'Normal file permissions' },
                          { cmd: 'find /var/www -perm /g=w', desc: 'Group-writable web files' },
                          { cmd: 'find . -perm -u=x', desc: 'User executable files' }
                        ].map((example, index) => (
                          <div key={index} className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                            <code className="block font-mono text-xs text-amber-600 dark:text-amber-400 mb-1">
                              $ {example.cmd}
                            </code>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{example.desc}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                        <div className="text-xs text-red-800 dark:text-red-200">
                          <strong>Security Warning:</strong> Files with permission 777 or setuid bits can be security risks. 
                          Always audit these files on production systems at Barrackpore Institute.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Time Condition */}
              {selectedCondition === 'time' && (
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700 animate-[fadeIn_0.5s_ease-out]">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center">
                    <span className="mr-2">⏰</span> Time-based Filtering
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Time Specification:</label>
                        <select
                          value={conditionValues.time}
                          onChange={(e) => this.handleConditionValueChange('time', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="-7">Last 7 days</option>
                          <option value="+30">Older than 30 days</option>
                          <option value="-1">Last 24 hours</option>
                          <option value="0">Today</option>
                          <option value="+7">Older than 7 days</option>
                          <option value="-30">Last 30 days</option>
                        </select>
                      </div>
                      
                      <div className="space-y-4">
                        <h5 className="font-medium text-gray-800 dark:text-white">Time Types:</h5>
                        
                        <div className="space-y-2">
                          {[
                            { type: 'mtime', desc: 'Modification time (content changed)' },
                            { type: 'atime', desc: 'Access time (file read)' },
                            { type: 'ctime', desc: 'Change time (metadata changed)' },
                            { type: 'amin', desc: 'Minutes since last access' },
                            { type: 'cmin', desc: 'Minutes since metadata change' },
                            { type: 'mmin', desc: 'Minutes since modification' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                              <code className="font-mono text-sm text-red-600 dark:text-red-400">
                                -{item.type}
                              </code>
                              <span className="text-xs text-gray-600 dark:text-gray-400 text-right">{item.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white mb-3">Time Examples:</h5>
                      <div className="space-y-3">
                        {[
                          { cmd: 'find /var/log -mtime -1', desc: 'Logs modified in last 24h' },
                          { cmd: 'find /tmp -atime +7 -delete', desc: 'Delete tmp files not accessed in 7 days' },
                          { cmd: 'find . -mmin -60', desc: 'Files modified in last hour' },
                          { cmd: 'find /backup -mtime +30 -type f', desc: 'Backups older than 30 days' },
                          { cmd: 'find . -newer reference.txt', desc: 'Files newer than reference.txt' }
                        ].map((example, index) => (
                          <div key={index} className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                            <code className="block font-mono text-xs text-red-600 dark:text-red-400 mb-1">
                              $ {example.cmd}
                            </code>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{example.desc}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          <strong>Pro Tip:</strong> Use <code>find . -mtime 0</code> for "today" (0 means 24*0=0 days ago). 
                          Negative numbers mean "less than n days ago", positive means "more than n days ago".
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  renderInteractiveSection() {
    const { isMounted, generatedCommand, searchDirectory, searchResults, isSearching, showAdvancedOptions } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Interactive Search Builder */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Interactive find Command Builder</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Configuration Panel */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Search Configuration</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Search Directory:</label>
                      <input
                        type="text"
                        value={searchDirectory}
                        onChange={this.handleDirectoryChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="/path/to/search"
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Common Directories:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {['/home', '/var/log', '/etc', '/tmp', '/usr', '/opt'].map((dir) => (
                          <button
                            key={dir}
                            onClick={() => this.handleDirectoryChange({ target: { value: dir } })}
                            className="text-xs p-2 bg-white dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                          >
                            {dir}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={this.toggleAdvancedOptions}
                      className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 flex items-center justify-center"
                    >
                      {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                      <span className="ml-2">{showAdvancedOptions ? '▲' : '▼'}</span>
                    </button>
                    
                    {showAdvancedOptions && (
                      <div className="space-y-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-blue-200 dark:border-blue-700 animate-[fadeIn_0.3s_ease-out]">
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Max Depth:</label>
                          <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                            <option>Unlimited</option>
                            <option>1 (current directory only)</option>
                            <option>2 (current + one level)</option>
                            <option>3</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Follow Symlinks:</label>
                          <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                            <option>No (default)</option>
                            <option>Yes (-L flag)</option>
                          </select>
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={this.executeSearch}
                      disabled={isSearching}
                      className="w-full py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-semibold flex items-center justify-center"
                    >
                      {isSearching ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Searching...
                        </>
                      ) : 'Execute Search'}
                    </button>
                  </div>
                </div>
                
                {/* Generated Command */}
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-gray-400 text-sm mb-2">Generated Command:</div>
                  <code className="font-mono text-green-400 text-sm break-all">
                    {generatedCommand}
                  </code>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Tip:</strong> You can combine multiple conditions! Example:
                    <code className="block font-mono text-xs mt-1">
                      find . -name "*.log" -size +1M -mtime +30 -delete
                    </code>
                  </div>
                </div>
              </div>
              
              {/* Search Results */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Search Results</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                    </div>
                  </div>
                  
                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Searching {searchDirectory}...
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        <div className="col-span-4">Filename</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2">Permissions</div>
                        <div className="col-span-2">Modified</div>
                      </div>
                      
                      {searchResults.map((result, index) => (
                        <div 
                          key={index}
                          className="grid grid-cols-12 gap-2 items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <div className="col-span-4 flex items-center">
                            <span className="mr-2">
                              {result.type === 'directory' ? '📁' : '📄'}
                            </span>
                            <code className="font-mono text-sm text-gray-800 dark:text-gray-300 truncate">
                              {result.name}
                            </code>
                          </div>
                          <div className="col-span-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              result.type === 'file' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                              result.type === 'directory' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                              'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                            }`}>
                              {result.type}
                            </span>
                          </div>
                          <div className="col-span-2 text-sm text-gray-700 dark:text-gray-300">
                            {result.size}
                          </div>
                          <div className="col-span-2">
                            <code className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {result.permissions}
                            </code>
                          </div>
                          <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">
                            {result.modified}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : generatedCommand.includes('find') ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <span className="text-4xl mb-4">🔍</span>
                      <div className="text-gray-600 dark:text-gray-400">
                        No results found
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        Try adjusting your search criteria
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <span className="text-4xl mb-4">💡</span>
                      <div className="text-gray-600 dark:text-gray-400">
                        Configure your search and click "Execute Search"
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        Select conditions and adjust values above
                      </div>
                    </div>
                  )}
                  
                  {searchResults.length > 0 && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-sm text-green-800 dark:text-green-200">
                        <strong>Next Step:</strong> You can pipe these results to other commands:
                        <code className="block font-mono text-xs mt-1">
                          {generatedCommand} | xargs ls -lh  # Show details<br/>
                          {generatedCommand} -exec rm {} \\;  # Delete matching files<br/>
                          {generatedCommand} | wc -l  # Count results
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Condition Combination Examples */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Powerful Condition Combinations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Real-world Scenarios */}
              <div className="space-y-6">
                <h4 className="font-semibold text-gray-800 dark:text-white">Real-world Scenarios</h4>
                
                {[
                  {
                    scenario: 'Cleanup script for Swadeep\'s project',
                    problem: 'Need to remove old temporary files',
                    command: 'find /home/swadeep/project -name "*.tmp" -mtime +7 -delete',
                    explanation: 'Deletes .tmp files older than 7 days'
                  },
                  {
                    scenario: 'Security audit at Barrackpore Institute',
                    problem: 'Find world-writable files in web directory',
                    command: 'find /var/www -type f -perm 777 -exec ls -la {} \\;',
                    explanation: 'Lists world-writable files with details'
                  },
                  {
                    scenario: 'Backup preparation for Tuhina\'s research',
                    problem: 'Find large data files modified recently',
                    command: 'find /home/tuhina/research -type f -size +10M -mtime -30',
                    explanation: 'Files >10MB modified in last 30 days'
                  },
                  {
                    scenario: 'Disk space recovery',
                    problem: 'Find and compress old log files',
                    command: 'find /var/log -name "*.log" -mtime +30 -exec gzip {} \\;',
                    explanation: 'Compresses logs older than 30 days'
                  }
                ].map((example, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-white mb-2">{example.scenario}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{example.problem}</div>
                    <code className="block font-mono text-xs bg-gray-900 text-green-400 p-2 rounded mb-2">
                      $ {example.command}
                    </code>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{example.explanation}</div>
                  </div>
                ))}
              </div>
              
              {/* Combination Patterns */}
              <div className="space-y-6">
                <h4 className="font-semibold text-gray-800 dark:text-white">Combination Patterns</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">AND Logic (default):</h5>
                    <code className="block font-mono text-sm bg-black/10 dark:bg-white/5 p-2 rounded mb-2">
                      find . -name "*.py" -type f -size +1k
                    </code>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Files that match ALL conditions: Python files AND regular files AND larger than 1KB
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">OR Logic (-o):</h5>
                    <code className="block font-mono text-sm bg-black/10 dark:bg-white/5 p-2 rounded mb-2">
                      find . -name "*.jpg" -o -name "*.png"
                    </code>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Files that match EITHER condition: JPG files OR PNG files
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h5 className="font-medium text-purple-700 dark:text-purple-400 mb-2">NOT Logic (! or -not):</h5>
                    <code className="block font-mono text-sm bg-black/10 dark:bg-white/5 p-2 rounded mb-2">
                      find . -type f ! -name "*.tmp"
                    </code>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Files that do NOT match: All regular files EXCEPT .tmp files
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <h5 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Grouping (\\( \\)):</h5>
                    <code className="block font-mono text-sm bg-black/10 dark:bg-white/5 p-2 rounded mb-2">
                      find . \\( -name "*.sh" -o -name "*.bash" \\) -type f
                    </code>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Complex logic: Regular files that are EITHER .sh OR .bash files
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Common Pitfalls & Mistakes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Beginner Mistakes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-red-700 dark:text-red-400">Syntax Errors</h3>
                
                {[
                  {
                    mistake: 'Unquoted wildcards',
                    example: 'find . -name *.txt',
                    problem: 'Shell expands *.txt before find sees it',
                    fix: 'Always quote: find . -name "*.txt"'
                  },
                  {
                    mistake: 'Wrong operator order',
                    example: 'find . -type f -name "*.py" -o -name "*.sh"',
                    problem: 'Actually means: (type f AND name *.py) OR name *.sh',
                    fix: 'Use grouping: find . \\( -name "*.py" -o -name "*.sh" \\) -type f'
                  },
                  {
                    mistake: 'Missing path argument',
                    example: 'find -name "file"',
                    problem: 'First non-option must be path',
                    fix: 'find . -name "file" or find /path -name "file"'
                  },
                  {
                    mistake: 'Incorrect time syntax',
                    example: 'find . -mtime 7',
                    problem: '7 means exactly 7*24 hours ago',
                    fix: 'Use -7 for last 7 days, +7 for older than 7 days'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.mistake}</div>
                    <code className="block text-sm bg-red-900/20 text-red-400 p-2 rounded mb-1 font-mono">
                      $ {item.example}
                    </code>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.problem}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">{item.fix}</div>
                  </div>
                ))}
              </div>
              
              {/* Performance & Safety Issues */}
              <div className="space-y-4">
                <h3 className="font-semibold text-amber-700 dark:text-amber-400">Performance & Safety</h3>
                
                {[
                  {
                    issue: 'Searching entire filesystem',
                    impact: 'Extremely slow, high disk I/O',
                    solution: 'Limit with -maxdepth or specific paths',
                    warning: 'find / -name "file" can take hours'
                  },
                  {
                    issue: '-exec \\; for each file',
                    impact: 'Process creation overhead',
                    solution: 'Use -exec + or xargs for batch',
                    warning: 'find . -name "*.log" -exec rm {} \\; creates process per file'
                  },
                  {
                    issue: 'Unchecked -delete',
                    impact: 'Accidental data loss',
                    solution: 'Test with -print first',
                    warning: 'Debangshu deleted his project with misplaced -delete'
                  },
                  {
                    issue: 'No error handling',
                    impact: 'Permission errors break command',
                    solution: 'Use 2>/dev/null or handle errors',
                    warning: 'find: \'/root\': Permission denied'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.issue}</div>
                    <div className="text-sm text-amber-600 dark:text-amber-400 mb-1">{item.impact}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.solution}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{item.warning}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Debugging Guide */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Debugging & Testing Guide</h3>
            
            <div className="space-y-6">
              {/* Testing Strategy */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4">Safe Testing Strategy</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white">First: Test with -print</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Always preview what will be affected:
                        <code className="block font-mono text-xs mt-1">
                          find . -name "*.tmp" -mtime +30 -print
                        </code>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white">Second: Test with -exec echo</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        See what commands would run:
                        <code className="block font-mono text-xs mt-1">
                          find . -name "*.log" -exec echo "Would delete: {}" \\;
                        </code>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-white">Third: Run with limited scope</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Test in a small directory first:
                        <code className="block font-mono text-xs mt-1">
                          find ./test_dir -name "*.tmp" -delete
                        </code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Common Problems */}
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-4">Troubleshooting Common Errors</h4>
                
                <div className="space-y-4">
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-red-400 p-3 rounded mb-2">
                      find: missing argument to `-exec\'
                    </code>
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      <strong>Problem:</strong> Missing {} or \\; at end of -exec<br/>
                      <strong>Fix:</strong> Always include {} and \\; <code>-exec command {} \\;</code>
                    </div>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-red-400 p-3 rounded mb-2">
                      find: paths must precede expression
                    </code>
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      <strong>Problem:</strong> Options placed before path<br/>
                      <strong>Fix:</strong> Put path first: <code>find . -name "file"</code> not <code>find -name "file" .</code>
                    </div>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-red-400 p-3 rounded mb-2">
                      find: I cannot figure out how to interpret `*.txt\' as a date
                    </code>
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      <strong>Problem:</strong> Wrong condition type for value<br/>
                      <strong>Fix:</strong> Use -name for patterns, -mtime for numbers
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
                  title: 'Command Construction',
                  items: [
                    'Always quote patterns with wildcards',
                    'Put path argument first',
                    'Use -maxdepth to limit search scope',
                    'Test with -print before destructive operations'
                  ],
                  example: 'find /path -maxdepth 3 -name "*.log" -print'
                },
                {
                  title: 'Performance',
                  items: [
                    'Order conditions from specific to general',
                    'Use -prune to skip directories',
                    'Avoid searching / without good reason',
                    'Use -exec + instead of -exec \\; for batch'
                  ],
                  example: 'find . -name "node_modules" -prune -o -name "*.js" -print'
                },
                {
                  title: 'Safety',
                  items: [
                    'Never run find / -delete as root',
                    'Use -ok instead of -exec for confirmation',
                    'Backup before bulk operations',
                    'Log destructive operations'
                  ],
                  example: 'find . -name "*.tmp" -ok rm {} \\;'
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
                      $ {category.example}
                    </code>
                  )}
                </div>
              ))}
            </div>
            
            {/* Professional Patterns */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-emerald-200 dark:border-emerald-700">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4">Professional find Patterns</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-sm font-medium text-gray-800 dark:text-white mb-2">Backup Script:</div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Backup config files modified today<br/>
                    find /etc -name "*.conf" -mtime 0 -exec cp {} /backup/ \\;
                  </code>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm font-medium text-gray-800 dark:text-white mb-2">Cleanup Script:</div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Remove old temp files<br/>
                    find /tmp -name "*.tmp" -mtime +7 -delete
                  </code>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-sm font-medium text-gray-800 dark:text-white mb-2">Security Audit:</div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Find world-writable files<br/>
                    find /home -type f -perm /o=w -exec ls -la {} \\;
                  </code>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="text-sm font-medium text-gray-800 dark:text-white mb-2">Disk Usage:</div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Find large files for cleanup<br/>
                    find . -type f -size +100M -exec du -h {} \\;
                  </code>
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
                  At Barrackpore Institute, I teach find conditions through real scenarios. Students like Tuhina 
                  create a test directory with various files, then we write find commands to solve problems: 
                  "Find all PDFs larger than 1MB modified this week." This practical approach helps them 
                  understand how conditions combine.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Common Student Challenge</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Students struggle with time conditions. I use this analogy: <code>-mtime -7</code> means 
                  "modified within the last 7 days" (think "minus 7 days from now"). <code>-mtime +7</code> means 
                  "modified more than 7 days ago" (think "plus 7 days ago"). Zero means "today."
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Professional Insight</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  At Shyamnagar data center, we use find in production scripts with extreme caution. Every 
                  destructive find command is first tested in a sandbox, logged, and run with <code>-ok</code> 
                  for confirmation. We also use <code>find ... | tee results.log</code> to keep audit trails.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Remember This</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The most dangerous find command: <code>find / -delete</code>. The safest first step: 
                  <code>find / -print | head -20</code>. Always preview before acting. Abhronila learned this 
                  the hard way when she accidentally deleted her entire project directory!
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
                <h4 className="font-semibold text-blue-700 dark:text-blue-400">Optimization</h4>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Condition ordering matters:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Fast: Specific first<br/>
                    find . -name "*.log" -size +1M<br/>
                    <br/>
                    # Slow: General first<br/>
                    find . -size +1M -name "*.log"
                  </code>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Put specific conditions (name, type) before general ones (size, time)
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Use -prune effectively:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Skip .git directories<br/>
                    find . -name ".git" -prune -o -type f -print
                  </code>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400">Advanced Patterns</h4>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Find by content:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Find files containing "password"<br/>
                    find . -type f -exec grep -l "password" {} \\;
                  </code>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Find duplicates:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Find duplicate files by checksum<br/>
                    find . -type f -exec md5sum {} + | sort | uniq -w32 -d
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
                    Create aliases for common find patterns in your .bashrc:
                    <code className="block font-mono text-xs mt-1">
                      alias findlarge='find . -type f -size +100M -exec ls -lh {} \\;'<br/>
                      alias findold='find . -type f -mtime +30 -print'<br/>
                      alias findperm='find . -type f -perm /o=w -exec ls -la {} \\;'
                    </code>
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
                Topic 12: Advanced find Conditions
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white leading-tight">
                find with Conditions: Name, Size, Type, Permissions, Time
                <span className="block text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Master precise file filtering with advanced search conditions
                </span>
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'concept', label: 'Core Concept', icon: '🧠' },
                { id: 'interactive', label: 'Interactive', icon: '🔍' },
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
                  <li>• -name: Pattern matching with wildcards</li>
                  <li>• -size: Filter by file size with units</li>
                  <li>• -type: Filter by file type (f,d,l,b,c,p,s)</li>
                  <li>• -perm: Filter by permission modes</li>
                  <li>• -mtime/-atime/-ctime: Time-based filtering</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Find all .log files larger than 10MB</li>
                  <li>• Find world-writable files in home directories</li>
                  <li>• Find files modified in last 24 hours</li>
                  <li>• Find empty directories</li>
                  <li>• Combine multiple conditions</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Barrackpore Institute</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  System administration and automation skills for managing research data across Naihati, Ichapur, and Shyamnagar campuses.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-500">
              <p>Topic 12: find Conditions • Advanced File Filtering • Barrackpore Institute</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}