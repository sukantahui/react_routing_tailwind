// Topic11.jsx - locate, updatedb and find – searching files in large systems
import React, { Component } from 'react';

export default class Topic11 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      activeTab: 'concept',
      searchMethod: 'locate',
      searchQuery: '',
      searchResults: [],
      showUpdatedbProcess: false,
      fileTypeFilter: 'all',
      fileSizeFilter: 'any',
      dateFilter: 'any',
      isSearching: false,
      animationsLoaded: false
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

  handleSearchMethodChange = (method) => {
    this.setState({ 
      searchMethod: method,
      searchResults: [],
      searchQuery: ''
    });
  };

  handleSearchQueryChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearch = () => {
    const { searchMethod, searchQuery } = this.state;
    
    if (!searchQuery.trim()) return;
    
    this.setState({ isSearching: true });
    
    // Simulate search results based on method
    setTimeout(() => {
      let results = [];
      
      switch(searchMethod) {
        case 'locate':
          results = this.getLocateResults(searchQuery);
          break;
        case 'find':
          results = this.getFindResults(searchQuery);
          break;
        default:
          results = [];
      }
      
      this.setState({ 
        searchResults: results,
        isSearching: false 
      });
    }, 800);
  };

  getLocateResults = (query) => {
    // Simulated locate results
    return [
      { path: '/home/swadeep/documents/research_paper.pdf', type: 'file', size: '2.5M', modified: '2024-01-15' },
      { path: '/var/lib/locate/research.db', type: 'file', size: '15M', modified: '2024-01-16' },
      { path: '/usr/share/doc/research-methods', type: 'directory', size: '4.0K', modified: '2024-01-14' },
      { path: '/home/tuhina/projects/research_tool', type: 'directory', size: '4.0K', modified: '2024-01-13' },
      { path: '/tmp/research_backup.tar.gz', type: 'file', size: '150M', modified: '2024-01-16' }
    ];
  };

  getFindResults = (query) => {
    // Simulated find results
    return [
      { path: './research_paper.pdf', type: 'file', size: '2.5M', modified: '2 days ago', permissions: '-rw-r--r--' },
      { path: './research_notes.txt', type: 'file', size: '45K', modified: '1 day ago', permissions: '-rw-------' },
      { path: './research_backup', type: 'directory', size: '4.0K', modified: '3 days ago', permissions: 'drwxr-xr-x' },
      { path: './research_data.csv', type: 'file', size: '8.2M', modified: '5 hours ago', permissions: '-rw-rw-r--' },
      { path: './old_research', type: 'directory', size: '4.0K', modified: '2 weeks ago', permissions: 'drwxr-xr-x' }
    ];
  };

  toggleUpdatedbProcess = () => {
    this.setState(prevState => ({ 
      showUpdatedbProcess: !prevState.showUpdatedbProcess 
    }));
  };

  handleFilterChange = (filter, value) => {
    this.setState({ [filter]: value });
  };

  renderConceptSection() {
    const { isMounted, searchMethod, showUpdatedbProcess } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Introduction */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Mastering File Search in Linux</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Searching for files efficiently is crucial when dealing with large systems. Linux offers multiple tools, 
              each with its own strengths: <code className="font-mono text-blue-600 dark:text-blue-400">locate</code> for instant searches, 
              <code className="font-mono text-green-600 dark:text-green-400 ml-1">find</code> for powerful filtering, and 
              <code className="font-mono text-purple-600 dark:text-purple-400 ml-1">updatedb</code> for maintaining the search database.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                  <span className="mr-2">⚡</span> Instant Search
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Like Swadeep quickly finding research papers in Barrackpore Institute's digital library using the catalog index.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center">
                  <span className="mr-2">🔍</span> Detailed Search
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Like Tuhina searching through project folders with specific criteria: size, date, permissions.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center">
                  <span className="mr-2">🔄</span> Database Update
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Like Abhronila updating the library index to include new books added overnight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search Methods Comparison */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Search Methods Comparison</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* locate Card */}
              <div 
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  searchMethod === 'locate'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => this.handleSearchMethodChange('locate')}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    searchMethod === 'locate' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">locate</h4>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Instant database search</div>
                  </div>
                </div>
                
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Lightning fast (searches pre-built index)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Searches entire filesystem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>May show deleted/nonexistent files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Limited filtering options</span>
                  </li>
                </ul>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <code className="block font-mono text-xs text-gray-800 dark:text-gray-300">
                    $ locate research_paper.pdf
                  </code>
                </div>
              </div>
              
              {/* find Card */}
              <div 
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  searchMethod === 'find'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => this.handleSearchMethodChange('find')}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    searchMethod === 'find' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <span className="text-2xl">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">find</h4>
                    <div className="text-sm text-green-600 dark:text-green-400">Powerful real-time search</div>
                  </div>
                </div>
                
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Real-time, accurate results</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Advanced filtering (size, time, permissions)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Slower (searches directory tree)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span>Limited to specified directories</span>
                  </li>
                </ul>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <code className="block font-mono text-xs text-gray-800 dark:text-gray-300">
                    $ find . -name "*.pdf" -size +1M
                  </code>
                </div>
              </div>
              
              {/* updatedb Card */}
              <div className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">updatedb</h4>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Database maintenance</div>
                  </div>
                </div>
                
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Updates locate database</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Usually runs daily via cron</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2 mt-1">!</span>
                    <span>Run as root for system-wide update</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2 mt-1">!</span>
                    <span>Manual update for immediate changes</span>
                  </li>
                </ul>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <code className="block font-mono text-xs text-gray-800 dark:text-gray-300">
                    $ sudo updatedb
                  </code>
                </div>
                
                <button
                  onClick={this.toggleUpdatedbProcess}
                  className="mt-4 w-full py-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300"
                >
                  {showUpdatedbProcess ? 'Hide Process' : 'Show Update Process'}
                </button>
              </div>
            </div>

            {/* Updatedb Process Visualization */}
            {showUpdatedbProcess && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl animate-[slideUp_0.5s_ease-out]">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-4">How updatedb Works</h4>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white">Scan Filesystem</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Walks through entire directory tree (excluding configured paths in /etc/updatedb.conf)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white">Build Index</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Creates optimized database of all filenames at /var/lib/mlocate/mlocate.db
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white">Optimize Storage</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Compresses and organizes for fast searching (not full-text, just filenames)
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      <strong>Real-world:</strong> At Barrackpore Institute, updatedb runs nightly at 2 AM. 
                      When Debangshu adds new project files during the day, they won't appear in locate searches until the next update.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* When to Use Which */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-400 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">When to Use Which Tool</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">Scenario</th>
                    <th className="text-left py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">Use locate when...</th>
                    <th className="text-left py-4 px-4 font-semibold text-green-600 dark:text-green-400">Use find when...</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      scenario: 'Finding system files or libraries',
                      locate: 'You know the approximate name',
                      find: 'You need to search specific directories'
                    },
                    {
                      scenario: 'Recent files (created today)',
                      locate: 'Not recommended (database outdated)',
                      find: 'Essential (real-time search)'
                    },
                    {
                      scenario: 'Searching entire filesystem',
                      locate: 'Perfect (pre-indexed)',
                      find: 'Slow but possible with /'
                    },
                    {
                      scenario: 'Complex criteria (size, time, permissions)',
                      locate: 'Not possible',
                      find: 'Perfect (advanced filtering)'
                    },
                    {
                      scenario: 'Scripting/automation',
                      locate: 'Fast but may miss recent files',
                      find: 'Accurate but slower'
                    },
                    {
                      scenario: 'Finding deleted files',
                      locate: 'May show them (if not updated)',
                      find: 'Never shows deleted files'
                    }
                  ].map((row, index) => (
                    <tr 
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">{row.scenario}</td>
                      <td className="py-4 px-4 text-blue-600 dark:text-blue-400">{row.locate}</td>
                      <td className="py-4 px-4 text-green-600 dark:text-green-400">{row.find}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-yellow-700">
              <div className="flex items-start">
                <span className="text-amber-500 mr-3 mt-1">💡</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white mb-1">Professional Tip:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    At Shyamnagar tech hub, we use <code className="font-mono">locate</code> for quick "where is this file" questions 
                    and <code className="font-mono">find</code> for cleanup scripts, backup operations, and permission audits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  renderInteractiveSection() {
    const { isMounted, searchMethod, searchQuery, searchResults, isSearching, fileTypeFilter, fileSizeFilter, dateFilter } = this.state;
    
    return (
      <div className="space-y-8">
        {/* Interactive Search Tool */}
        <section className={`transition-all duration-700 motion-safe:transition-all ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Interactive Search Simulator</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Search Configuration */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Search Configuration</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Search Method:</label>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => this.handleSearchMethodChange('locate')}
                          className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
                            searchMethod === 'locate'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          locate
                        </button>
                        <button
                          onClick={() => this.handleSearchMethodChange('find')}
                          className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
                            searchMethod === 'find'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          find
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Search Query:</label>
                      <div className="flex">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={this.handleSearchQueryChange}
                          placeholder={searchMethod === 'locate' ? 'Enter filename pattern...' : 'Enter search criteria...'}
                          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={this.handleSearch}
                          disabled={isSearching || !searchQuery.trim()}
                          className="px-4 py-2 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                          {isSearching ? 'Searching...' : 'Search'}
                        </button>
                      </div>
                    </div>
                    
                    {/* find-specific filters */}
                    {searchMethod === 'find' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">File Type:</label>
                          <select
                            value={fileTypeFilter}
                            onChange={(e) => this.handleFilterChange('fileTypeFilter', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="all">All files</option>
                            <option value="file">Regular files only</option>
                            <option value="directory">Directories only</option>
                            <option value="symlink">Symbolic links only</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">File Size:</label>
                          <select
                            value={fileSizeFilter}
                            onChange={(e) => this.handleFilterChange('fileSizeFilter', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="any">Any size</option>
                            <option value="small">Small (&lt; 1MB)</option>
                            <option value="medium">Medium (1MB - 100MB)</option>
                            <option value="large">Large (&gt; 100MB)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Modified Date:</label>
                          <select
                            value={dateFilter}
                            onChange={(e) => this.handleFilterChange('dateFilter', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="any">Any time</option>
                            <option value="today">Today</option>
                            <option value="week">This week</option>
                            <option value="month">This month</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Generated Command */}
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-gray-400 text-sm mb-2">Generated Command:</div>
                  <code className="font-mono text-green-400 text-sm">
                    {this.generateCommand()}
                  </code>
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
                        {searchMethod === 'locate' ? 'Querying locate database...' : 'Searching directory tree...'}
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-3">
                      {searchResults.map((result, index) => (
                        <div 
                          key={index}
                          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <span className="mr-2">
                                  {result.type === 'directory' ? '📁' : '📄'}
                                </span>
                                <code className="font-mono text-sm text-gray-800 dark:text-gray-300 break-all">
                                  {result.path}
                                </code>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                                <span>Type: {result.type}</span>
                                <span>Size: {result.size}</span>
                                <span>Modified: {result.modified}</span>
                                {result.permissions && (
                                  <span>Permissions: {result.permissions}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <span className="text-4xl mb-4">🔍</span>
                      <div className="text-gray-600 dark:text-gray-400">
                        No results found for "{searchQuery}"
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        Try a different search term or check your spelling
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <span className="text-4xl mb-4">💡</span>
                      <div className="text-gray-600 dark:text-gray-400">
                        Enter a search query to see results
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        Try: "research", "*.pdf", or "config"
                      </div>
                    </div>
                  )}
                  
                  {searchResults.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Tip:</strong> {searchMethod === 'locate' 
                          ? 'Remember: locate shows files from the last database update. Use sudo updatedb to refresh.' 
                          : 'find searches in real-time. Use -type, -size, and -mtime for more precise filtering.'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Examples */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Practical Search Examples</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* locate Examples */}
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400">locate Examples</h4>
                
                {[
                  {
                    scenario: 'Find all Python configuration files',
                    command: 'locate "*.cfg" | grep python',
                    explanation: 'Quickly find config files across system'
                  },
                  {
                    scenario: 'Case-insensitive search for documentation',
                    command: 'locate -i readme',
                    explanation: '-i flag ignores case differences'
                  },
                  {
                    scenario: 'Limit number of results',
                    command: 'locate "*.log" | head -20',
                    explanation: 'Pipe to head for manageable output'
                  },
                  {
                    scenario: 'Count matching files',
                    command: 'locate "*.jpg" | wc -l',
                    explanation: 'Count all JPEG images in system'
                  }
                ].map((example, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-sm text-gray-800 dark:text-gray-200 mb-2">{example.scenario}</div>
                    <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded mb-2">
                      $ {example.command}
                    </code>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{example.explanation}</div>
                  </div>
                ))}
              </div>
              
              {/* find Examples */}
              <div className="space-y-4">
                <h4 className="font-semibold text-green-700 dark:text-green-400">find Examples</h4>
                
                {[
                  {
                    scenario: 'Find large files to clean up',
                    command: 'find /home -type f -size +100M',
                    explanation: 'Files larger than 100MB in home'
                  },
                  {
                    scenario: 'Find files modified recently',
                    command: 'find . -type f -mtime -7',
                    explanation: 'Files changed in last 7 days'
                  },
                  {
                    scenario: 'Find and delete old backups',
                    command: 'find /backups -type f -mtime +30 -delete',
                    explanation: 'Delete backups older than 30 days'
                  },
                  {
                    scenario: 'Find files by permission',
                    command: 'find . -type f -perm 777',
                    explanation: 'World-writable files (security risk!)'
                  }
                ].map((example, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-sm text-gray-800 dark:text-gray-200 mb-2">{example.scenario}</div>
                    <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded mb-2">
                      $ {example.command}
                    </code>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{example.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg">
              <div className="flex items-start">
                <span className="text-amber-500 mr-3 mt-1">🚨</span>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white mb-1">Security Warning:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Be careful with <code className="font-mono">find ... -delete</code> commands! Always test with 
                    <code className="font-mono">-print</code> first to see what would be deleted. At Barrackpore Institute, 
                    Tuhina accidentally deleted a week's work by forgetting the -print flag!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  generateCommand() {
    const { searchMethod, searchQuery, fileTypeFilter, fileSizeFilter, dateFilter } = this.state;
    
    if (!searchQuery) return `# Enter a search query`;
    
    if (searchMethod === 'locate') {
      return `$ locate ${searchQuery}`;
    } else {
      let command = `$ find .`;
      
      // Add file type filter
      if (fileTypeFilter === 'file') command += ` -type f`;
      else if (fileTypeFilter === 'directory') command += ` -type d`;
      else if (fileTypeFilter === 'symlink') command += ` -type l`;
      
      // Add name filter
      if (searchQuery.includes('*') || searchQuery.includes('?')) {
        command += ` -name "${searchQuery}"`;
      } else {
        command += ` -name "*${searchQuery}*"`;
      }
      
      // Add size filter
      if (fileSizeFilter === 'small') command += ` -size -1M`;
      else if (fileSizeFilter === 'medium') command += ` -size +1M -size -100M`;
      else if (fileSizeFilter === 'large') command += ` -size +100M`;
      
      // Add date filter
      if (dateFilter === 'today') command += ` -mtime 0`;
      else if (dateFilter === 'week') command += ` -mtime -7`;
      else if (dateFilter === 'month') command += ` -mtime -30`;
      
      return command;
    }
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
                <h3 className="font-semibold text-red-700 dark:text-red-400">Common Errors</h3>
                
                {[
                  {
                    mistake: 'Using locate for recent files',
                    consequence: 'File not found (database outdated)',
                    fix: 'Use find or run sudo updatedb first',
                    story: 'Swadeep spent hours debugging why locate couldn\'t find his new project files'
                  },
                  {
                    mistake: 'Forgetting quotes with spaces',
                    consequence: 'Broken command or wrong results',
                    fix: 'Always quote patterns with spaces or wildcards',
                    story: 'find . -name *.txt expands to multiple arguments'
                  },
                  {
                    mistake: 'find without path argument',
                    consequence: 'Searches current directory (might be wrong)',
                    fix: 'Always specify search path: find /path ...',
                    story: 'Abhronila searched for system files from her home directory'
                  },
                  {
                    mistake: 'locate shows deleted files',
                    consequence: 'Confusion and wasted time',
                    fix: 'Remember locate shows database snapshot, not current state',
                    story: 'Tuhina tried to open a file that was deleted yesterday'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.mistake}</div>
                    <div className="text-sm text-red-600 dark:text-red-400 mb-1">{item.consequence}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.fix}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{item.story}</div>
                  </div>
                ))}
              </div>
              
              {/* Performance Issues */}
              <div className="space-y-4">
                <h3 className="font-semibold text-amber-700 dark:text-amber-400">Performance Problems</h3>
                
                {[
                  {
                    problem: 'find on large directories without pruning',
                    impact: 'Extremely slow, high disk I/O',
                    solution: 'Use -prune to skip directories',
                    example: 'find / -name "*.tmp" -prune -o -type f -print'
                  },
                  {
                    problem: 'locate database too large',
                    impact: 'Slow searches, high memory usage',
                    solution: 'Configure /etc/updatedb.conf to exclude paths',
                    example: 'PRUNEPATHS="/tmp /var/spool"'
                  },
                  {
                    problem: 'find with -exec for each file',
                    impact: 'Process creation overhead',
                    solution: 'Use -exec + or xargs for batch processing',
                    example: 'find . -name "*.log" -exec rm {} +'
                  },
                  {
                    problem: 'Searching network mounts with find',
                    impact: 'Network congestion, timeouts',
                    solution: 'Use locate or limit depth with -maxdepth',
                    example: 'find /mnt/network -maxdepth 2 -name "*.doc"'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="font-medium text-gray-800 dark:text-gray-200 mb-2">{item.problem}</div>
                    <div className="text-sm text-amber-600 dark:text-amber-400 mb-1">{item.impact}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.solution}</div>
                    <div className="text-xs font-mono text-blue-600 dark:text-blue-400">{item.example}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Debugging Guide */}
        <section className={`transition-all duration-700 motion-safe:transition-all delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Debugging Search Problems</h3>
            
            <div className="space-y-6">
              {/* Common Error Messages */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4">Common Error Messages</h4>
                
                <div className="space-y-4">
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-red-400 p-3 rounded mb-2">
                      locate: can not open `/var/lib/mlocate/mlocate.db': No such file or directory
                    </code>
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      <strong>Cause:</strong> locate database doesn't exist<br/>
                      <strong>Fix:</strong> Run <code className="font-mono">sudo updatedb</code> to create it
                    </div>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-red-400 p-3 rounded mb-2">
                      find: paths must precede expression
                    </code>
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      <strong>Cause:</strong> Incorrect argument order<br/>
                      <strong>Fix:</strong> Put path before options: <code className="font-mono">find . -name "*.txt"</code>
                    </div>
                  </div>
                  
                  <div>
                    <code className="block font-mono text-sm bg-gray-900 text-red-400 p-3 rounded mb-2">
                      find: `*.txt': No such file or directory
                    </code>
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                      <strong>Cause:</strong> Shell expanded wildcard before find<br/>
                      <strong>Fix:</strong> Quote the pattern: <code className="font-mono">find . -name "*.txt"</code>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Diagnostic Steps */}
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-4">Diagnostic Checklist</h4>
                
                <div className="space-y-3">
                  {[
                    '1. Check database age: ls -la /var/lib/mlocate/mlocate.db',
                    '2. Verify permissions: Can you read the directories you\'re searching?',
                    '3. Test simple pattern first: find . -name "test"',
                    '4. Check for typos in pattern (case sensitivity matters)',
                    '5. Use -print before -delete to preview actions',
                    '6. Check filesystem boundaries (find doesn\'t cross mount points by default)',
                    '7. Verify locate config: cat /etc/updatedb.conf'
                  ].map((step, index) => (
                    <div key={index} className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <span className="text-green-500 mr-3 mt-1">→</span>
                      <span className="text-sm text-gray-800 dark:text-gray-300">{step}</span>
                    </div>
                  ))}
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
                    'Use locate for quick filename searches',
                    'Use find for precise, filtered searches',
                    'Combine tools: locate to find, find to filter',
                    'Create aliases for common searches'
                  ],
                  example: 'alias findlarge="find . -type f -size +100M"'
                },
                {
                  title: 'System Administration',
                  items: [
                    'Schedule updatedb during off-hours',
                    'Exclude temporary paths in updatedb.conf',
                    'Use find for cleanup scripts',
                    'Monitor locate database size'
                  ],
                  example: '0 2 * * * root /usr/bin/updatedb'
                },
                {
                  title: 'Scripting & Automation',
                  items: [
                    'Always test find commands with -print first',
                    'Use -exec + instead of -exec \\; for performance',
                    'Handle spaces in filenames with -print0',
                    'Log search results for audit trails'
                  ],
                  example: 'find . -name "*.tmp" -print0 | xargs -0 rm'
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
            
            {/* Decision Flowchart */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-emerald-200 dark:border-emerald-700">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4">Search Tool Decision Guide</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-sm text-gray-800 dark:text-gray-300 font-medium mb-2">Need to find a file quickly by name?</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">→ Use <code className="font-mono">locate filename</code></div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-gray-800 dark:text-gray-300 font-medium mb-2">File was created/changed today?</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">→ Use <code className="font-mono">find . -name pattern -mtime 0</code></div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-sm text-gray-800 dark:text-gray-300 font-medium mb-2">Need advanced filtering (size, permissions, time)?</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">→ Use <code className="font-mono">find</code> with appropriate options</div>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="text-sm text-gray-800 dark:text-gray-300 font-medium mb-2">Searching entire filesystem?</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">→ Use <code className="font-mono">locate</code> or <code className="font-mono">find /</code> with caution</div>
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
                  At Barrackpore Institute, I start by having students search for files they just created. 
                  When locate fails to find them, it creates a perfect teaching moment about database vs real-time searching. 
                  Then we compare the speed of locate vs find on the Institute's large research archive.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Common Student Challenge</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Students like Debangshu often get confused by wildcards. They'll type <code>find . -name *.txt</code> 
                  and get unexpected results when multiple .txt files exist in the current directory. 
                  I emphasize: <strong>"Quote your patterns!"</strong> The shell expands wildcards before find sees them.
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Real-world Application</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  At the Shyamnagar data center, we use find in maintenance scripts:
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded mt-2">
                    # Clean old logs: find /var/log -name "*.log.*" -mtime +30 -delete<br/>
                    # Find large files: find /home -type f -size +500M -exec ls -lh {} \;<br/>
                    # Backup configs: find /etc -name "*.conf" -exec cp {} /backup/ \;
                  </code>
                </p>
              </div>
              
              <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Pro Tip for Students</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Create a personal search function in your .bashrc:
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded mt-2">
                    function search() {"{"}<br/>
                    &nbsp;&nbsp;if [ "$1" = "-f" ]; then<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;shift<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;find . -name "*$**" "$@"<br/>
                    &nbsp;&nbsp;else<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;locate -i "*$**"<br/>
                    &nbsp;&nbsp;fi<br/>
                    {"}"}
                  </code>
                  Now use <code>search filename</code> for locate or <code>search -f filename</code> for find!
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
                    <strong>Parallel searching:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Search multiple directories in parallel<br/>
                    find /dir1 /dir2 -name "*.log" -print
                  </code>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Limit search depth:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Only search 3 levels deep<br/>
                    find . -maxdepth 3 -name "*.conf"
                  </code>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400">Creative Combinations</h4>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Find and process:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Find Python files and count lines<br/>
                    find . -name "*.py" -exec wc -l {} +<br/>
                    <br/>
                    # Find and archive<br/>
                    find . -name "*.log" -mtime +7 | tar -czf old_logs.tar.gz -T -
                  </code>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Exclude patterns:</strong>
                  </div>
                  <code className="block font-mono text-xs bg-black/10 dark:bg-white/5 p-2 rounded">
                    # Find files but exclude .git directories<br/>
                    find . -type f -not -path "*/.git/*"<br/>
                    <br/>
                    # Multiple exclusions<br/>
                    find . -type f ! -name "*.tmp" ! -name "*.bak"
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
                    Use <code className="font-mono">locate -b "\\filename"</code> to search for exact basename (not path). 
                    The double backslash prevents shell interpretation. This is faster than <code>locate | grep filename</code>.
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
                Topic 11: File Searching
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white leading-tight">
                locate, updatedb and find
                <span className="block text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Mastering file search in large systems with instant and powerful tools
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
                  <li>• locate: Fast but uses outdated database</li>
                  <li>• find: Powerful real-time filtering</li>
                  <li>• updatedb: Maintains locate database</li>
                  <li>• Choose tool based on needs</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Use locate to find system config files</li>
                  <li>• Use find with size and time filters</li>
                  <li>• Create cleanup scripts with find</li>
                  <li>• Update locate database manually</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Barrackpore Institute</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  System administration skills for managing large research repositories at Naihati, Ichapur, and Shyamnagar campuses.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-500">
              <p>Topic 12: File Searching Tools • System Administration • Barrackpore Institute</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}