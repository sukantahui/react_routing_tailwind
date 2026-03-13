import { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';

const Topic40 = () => {
  // State for different fetching scenarios
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [isOnline, setIsOnline] = useState(true);
  const [fetchEnabled, setFetchEnabled] = useState(true);
  
  // Data states
  const [searchResults, setSearchResults] = useState([]);
  const [userData, setUserData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [pagedData, setPagedData] = useState([]);
  const [cache, setCache] = useState({});
  
  // UI states
  const [loading, setLoading] = useState({
    search: false,
    user: false,
    category: false,
    page: false
  });
  
  const [errors, setErrors] = useState({
    search: null,
    user: null,
    category: null,
    page: null
  });
  
  const [stats, setStats] = useState({
    searchCount: 0,
    apiCalls: 0,
    cacheHits: 0
  });
  
  const [fetchStrategy, setFetchStrategy] = useState('debounced');
  const [debounceTime, setDebounceTime] = useState(500);
  const [pollingInterval, setPollingInterval] = useState(0);
  
  // Refs
  const searchTimeoutRef = useRef(null);
  const pollingRef = useRef(null);
  const apiCallCountRef = useRef(0);
  const lastFetchRef = useRef({});

  // Mock API data
  const MOCK_DATA = {
    users: [
      { id: 1, name: 'Swadeep Roy', email: 'swadeep@example.com', location: 'Barrackpore' },
      { id: 2, name: 'Tuhina Das', email: 'tuhina@example.com', location: 'Shyamnagar' },
      { id: 3, name: 'Abhronila Sen', email: 'abhronila@example.com', location: 'Ichapur' },
      { id: 4, name: 'Debangshu Ghosh', email: 'debangshu@example.com', location: 'Naihati' },
      { id: 5, name: 'Priya Sharma', email: 'priya@example.com', location: 'Kolkata' },
      { id: 6, name: 'Amit Kumar', email: 'amit@example.com', location: 'Delhi' },
      { id: 7, name: 'Sneha Patel', email: 'sneha@example.com', location: 'Mumbai' },
      { id: 8, name: 'Rajesh Singh', email: 'rajesh@example.com', location: 'Bangalore' }
    ],
    posts: [
      { id: 1, title: 'Introduction to React', category: 'react', userId: 1 },
      { id: 2, title: 'Advanced JavaScript', category: 'javascript', userId: 2 },
      { id: 3, title: 'CSS Grid Tutorial', category: 'css', userId: 3 },
      { id: 4, title: 'Node.js Basics', category: 'node', userId: 4 },
      { id: 5, title: 'React Hooks Deep Dive', category: 'react', userId: 1 },
      { id: 6, title: 'TypeScript for Beginners', category: 'typescript', userId: 2 },
      { id: 7, title: 'Tailwind CSS Guide', category: 'css', userId: 3 },
      { id: 8, title: 'Express.js REST API', category: 'node', userId: 4 },
      { id: 9, title: 'React Performance Tips', category: 'react', userId: 1 },
      { id: 10, title: 'JavaScript ES6 Features', category: 'javascript', userId: 2 }
    ],
    categories: ['all', 'react', 'javascript', 'css', 'node', 'typescript']
  };

  // Simulate API delay
  const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Track API calls
  const trackApiCall = () => {
    apiCallCountRef.current += 1;
    setStats(prev => ({ ...prev, apiCalls: apiCallCountRef.current }));
  };

  // Example 1: Search with debouncing
  useEffect(() => {
    if (!fetchEnabled || !searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set loading state
    setLoading(prev => ({ ...prev, search: true }));
    setErrors(prev => ({ ...prev, search: null }));

    // Check cache first
    const cacheKey = `search_${searchTerm}`;
    if (cache[cacheKey]) {
      setStats(prev => ({ ...prev, cacheHits: prev.cacheHits + 1 }));
      setSearchResults(cache[cacheKey]);
      setLoading(prev => ({ ...prev, search: false }));
      return;
    }

    const fetchSearch = async () => {
      try {
        trackApiCall();
        await simulateDelay(800); // Simulate network delay
        
        // Simulate API call
        const results = MOCK_DATA.users.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.location.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Update cache
        setCache(prev => ({
          ...prev,
          [cacheKey]: results
        }));

        setSearchResults(results);
        setStats(prev => ({ ...prev, searchCount: prev.searchCount + 1 }));
      } catch (error) {
        setErrors(prev => ({ ...prev, search: 'Search failed. Please try again.' }));
      } finally {
        setLoading(prev => ({ ...prev, search: false }));
      }
    };

    if (fetchStrategy === 'debounced') {
      searchTimeoutRef.current = setTimeout(fetchSearch, debounceTime);
    } else if (fetchStrategy === 'immediate') {
      fetchSearch();
    }

    // Cleanup
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, fetchStrategy, debounceTime, fetchEnabled]);

  // Example 2: Fetch user data when ID changes (with validation)
  useEffect(() => {
    const fetchUserData = async () => {
      // Validation check
      if (!userId || !/^\d+$/.test(userId) || parseInt(userId) > 8 || parseInt(userId) < 1) {
        setUserData(null);
        setErrors(prev => ({ ...prev, user: userId ? 'Invalid user ID (1-8 only)' : null }));
        return;
      }

      // Check if we already fetched this user recently
      if (lastFetchRef.current.userId === userId && Date.now() - lastFetchRef.current.timestamp < 5000) {
        setErrors(prev => ({ ...prev, user: 'Using cached data (prevented duplicate fetch)' }));
        return;
      }

      setLoading(prev => ({ ...prev, user: true }));
      setErrors(prev => ({ ...prev, user: null }));

      try {
        trackApiCall();
        await simulateDelay(600);
        
        const user = MOCK_DATA.users.find(u => u.id === parseInt(userId));
        
        if (user) {
          setUserData(user);
          lastFetchRef.current = { userId, timestamp: Date.now() };
        } else {
          setErrors(prev => ({ ...prev, user: 'User not found' }));
        }
      } catch (error) {
        setErrors(prev => ({ ...prev, user: 'Failed to fetch user data' }));
      } finally {
        setLoading(prev => ({ ...prev, user: false }));
      }
    };

    if (fetchEnabled && isOnline) {
      fetchUserData();
    }
  }, [userId, fetchEnabled, isOnline]);

  // Example 3: Fetch by category with dependency
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (category === 'all') {
        setCategoryData(MOCK_DATA.posts);
        return;
      }

      setLoading(prev => ({ ...prev, category: true }));
      setErrors(prev => ({ ...prev, category: null }));

      try {
        trackApiCall();
        await simulateDelay(400);
        
        const filteredPosts = MOCK_DATA.posts.filter(post => post.category === category);
        setCategoryData(filteredPosts);
      } catch (error) {
        setErrors(prev => ({ ...prev, category: 'Failed to load category data' }));
      } finally {
        setLoading(prev => ({ ...prev, category: false }));
      }
    };

    if (fetchEnabled) {
      fetchCategoryData();
    }
  }, [category, fetchEnabled]);

  // Example 4: Paginated fetching
  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(prev => ({ ...prev, page: true }));
      setErrors(prev => ({ ...prev, page: null }));

      try {
        trackApiCall();
        await simulateDelay(300);
        
        const pageSize = 3;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pagedItems = MOCK_DATA.posts.slice(startIndex, endIndex);
        
        setPagedData(pagedItems);
      } catch (error) {
        setErrors(prev => ({ ...prev, page: 'Failed to load page data' }));
      } finally {
        setLoading(prev => ({ ...prev, page: false }));
      }
    };

    if (fetchEnabled) {
      fetchPageData();
    }
  }, [page, fetchEnabled]);

  // Example 5: Polling (conditional on interval)
  useEffect(() => {
    if (!fetchEnabled || pollingInterval <= 0) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    const pollData = async () => {
      console.log(`🔄 Polling API (${pollingInterval}ms interval)`);
      trackApiCall();
    };

    pollingRef.current = setInterval(pollData, pollingInterval);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [pollingInterval, fetchEnabled]);

  // Simulate network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Clear all data
  const clearAllData = () => {
    setSearchResults([]);
    setUserData(null);
    setCategoryData([]);
    setPagedData([]);
    setCache({});
    setStats(prev => ({ ...prev, cacheHits: 0 }));
    apiCallCountRef.current = 0;
    setStats(prev => ({ ...prev, apiCalls: 0 }));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSearchTerm('');
    setUserId('');
    setCategory('all');
    setPage(1);
    setFetchEnabled(true);
    setFetchStrategy('debounced');
    setDebounceTime(500);
    setPollingInterval(0);
    clearAllData();
  };

  // Manual trigger example
  const manualFetch = () => {
    if (!fetchEnabled) {
      alert('Enable fetching first!');
      return;
    }
    
    // Simulate a manual API call
    trackApiCall();
    alert(`Manual API call triggered! Total calls: ${apiCallCountRef.current}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div 
          className="mb-8 animate-[fadeIn_0.8s_ease-out]"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Conditional <span className="text-blue-600 dark:text-blue-400">Data Fetching</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Smart API calls based on conditions, dependencies, and user interactions
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Theory */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">🎯</span>
              What is Conditional Fetching?
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Conditional fetching means making API calls only when specific conditions are met, preventing unnecessary requests and improving performance.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4">
                <strong className="block mb-2 text-blue-800 dark:text-blue-300">Key Concept:</strong>
                <p>Fetch data when needed, not just because you can. Every unnecessary API call wastes resources and impacts user experience.</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-4">
                <strong className="block mb-2 text-green-800 dark:text-green-300">When to Use:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>When user input changes (search, filters)</li>
                  <li>When dependencies are valid (ID exists, user authenticated)</li>
                  <li>When component is visible/active</li>
                  <li>When network is available</li>
                </ul>
              </div>
            </div>

            {/* Common Conditions Grid */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Common Fetching Conditions</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Input Validation</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Only fetch when input is valid
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Debouncing</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Wait for typing to stop
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Dependency Change</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Fetch when specific props change
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Network Status</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Only fetch when online
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Diagram */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out_0.2s]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">📊</span>
              Conditional Fetching Decision Tree
            </h2>
            
            <div className="relative h-64 mb-6">
              {/* Decision Tree Diagram */}
              <svg width="100%" height="100%" viewBox="0 0 600 240" className="overflow-visible">
                {/* Start */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <circle cx="100" cy="120" r="20" 
                    fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
                  <text x="100" y="125" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                    Trigger
                  </text>
                </g>
                
                {/* Arrow */}
                <path d="M 120 120 L 150 120" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="150,120 140,115 140,125" fill="#9CA3AF" />
                
                {/* Condition Check */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="165" y="100" width="70" height="40" rx="8" 
                    fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
                  <text x="200" y="125" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                    Conditions?
                  </text>
                </g>
                
                {/* Condition Paths */}
                <path d="M 200 140 L 200 170 L 100 170 L 100 200" 
                  stroke="#EF4444" strokeWidth="2" />
                <text x="150" y="185" textAnchor="middle" className="text-[10px] fill-red-500">
                  No
                </text>
                
                <path d="M 235 120 L 285 120 L 285 70" 
                  stroke="#10B981" strokeWidth="2" />
                <text x="260" y="100" textAnchor="middle" className="text-[10px] fill-green-500">
                  Yes
                </text>
                
                {/* Skip Fetch */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="50" y="205" width="100" height="30" rx="6" 
                    fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" strokeWidth="2" />
                  <text x="100" y="223" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                    Skip Fetch
                  </text>
                </g>
                
                {/* More Conditions */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="300" y="45" width="80" height="50" rx="8" 
                    fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="2" />
                  <text x="340" y="75" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                    More Checks
                  </text>
                </g>
                
                {/* Arrow to Fetch */}
                <path d="M 340 95 L 340 125 L 430 125" 
                  stroke="#10B981" strokeWidth="2" />
                <polygon points="430,125 420,120 420,130" fill="#10B981" />
                
                {/* Execute Fetch */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="435" y="100" width="100" height="50" rx="8" 
                    fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                  <text x="485" y="125" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                    Fetch Data
                  </text>
                  <text x="485" y="140" textAnchor="middle" className="text-[10px] fill-green-600">
                    API Call
                  </text>
                </g>
                
                {/* Conditions Legend */}
                <g>
                  <rect x="380" y="180" width="200" height="50" rx="8" 
                    fill="#374151" fillOpacity="0.8" stroke="#4B5563" strokeWidth="1" />
                  <text x="400" y="200" className="text-[10px] fill-white">
                    Conditions may include:
                  </text>
                  <text x="400" y="215" className="text-[9px] fill-gray-300">
                    • Input validation • Debouncing • Cache check
                  </text>
                  <text x="400" y="225" className="text-[9px] fill-gray-300">
                    • Network status • User authentication
                  </text>
                </g>
              </svg>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">{stats.apiCalls}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">API Calls</div>
              </div>
              
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-300">{stats.cacheHits}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Cache Hits</div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                  {isOnline ? '🟢' : '🔴'}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">🎮</span>
            Fetching Controls & Strategies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <button
              onClick={manualFetch}
              disabled={!fetchEnabled}
              className={clsx(
                "py-3 rounded-lg font-medium transition-all duration-300",
                fetchEnabled
                  ? "bg-blue-500 hover:bg-blue-600 text-white hover:scale-[1.02]"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              )}
            >
              🔧 Manual Fetch
            </button>
            
            <button
              onClick={() => setFetchEnabled(!fetchEnabled)}
              className={clsx(
                "py-3 rounded-lg font-medium transition-all duration-300",
                fetchEnabled
                  ? "bg-red-500 hover:bg-red-600 text-white hover:scale-[1.02]"
                  : "bg-green-500 hover:bg-green-600 text-white hover:scale-[1.02]"
              )}
            >
              {fetchEnabled ? '⏸️ Disable Fetching' : '▶️ Enable Fetching'}
            </button>
            
            <button
              onClick={clearAllData}
              className="py-3 rounded-lg font-medium bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300 hover:scale-[1.02]"
            >
              🧹 Clear All Data
            </button>
            
            <button
              onClick={resetToDefaults}
              className="py-3 rounded-lg font-medium bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 hover:scale-[1.02]"
            >
              🔄 Reset Defaults
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Strategy:
              </label>
              <select
                value={fetchStrategy}
                onChange={(e) => setFetchStrategy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="debounced">Debounced (wait {debounceTime}ms)</option>
                <option value="immediate">Immediate (no delay)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Debounce Time: {debounceTime}ms
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={debounceTime}
                onChange={(e) => setDebounceTime(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0ms</span>
                <span>1s</span>
                <span>2s</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Polling Interval: {pollingInterval > 0 ? `${pollingInterval}ms` : 'Off'}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="500"
                value={pollingInterval}
                onChange={(e) => setPollingInterval(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Off</span>
                <span>2.5s</span>
                <span>5s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.4s]">
            <span className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-xl mr-4">📚</span>
            Conditional Fetching Examples
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Example 1: Search with Debouncing */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  🔍 Search with Debouncing
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Strategy: {fetchStrategy}
                </div>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users by name, email, or location..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Try: "Swadeep", "Barrackpore", or "example.com"
                </div>
              </div>
              
              {/* Results */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
                {loading.search ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Searching{fetchStrategy === 'debounced' && ` (debounced ${debounceTime}ms)`}...
                    </p>
                  </div>
                ) : errors.search ? (
                  <div className="text-center py-8 text-red-500 dark:text-red-400">
                    <div className="text-2xl mb-2">⚠️</div>
                    {errors.search}
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.map(user => (
                      <div 
                        key={user.id}
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                      >
                        <div className="font-bold text-gray-800 dark:text-gray-200">{user.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          📍 {user.location}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchTerm ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="text-2xl mb-2">🔍</div>
                    No results found for "{searchTerm}"
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="text-2xl mb-2">💡</div>
                    <p>Start typing to search users</p>
                    <p className="text-sm mt-2">Current strategy: {fetchStrategy} {fetchStrategy === 'debounced' && `(${debounceTime}ms delay)`}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Condition: {searchTerm ? `Search term exists (${searchTerm.length} chars)` : 'No search term'}</span>
                  <span>Results: {searchResults.length}</span>
                </div>
              </div>
            </div>

            {/* Example 2: User ID with Validation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  👤 User ID with Validation
                </h3>
                <div className={clsx(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  userId && /^\d+$/.test(userId) && parseInt(userId) <= 8 && parseInt(userId) >= 1
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                )}>
                  {userId ? 'Valid ID' : 'No ID'}
                </div>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter user ID (1-8)..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Valid IDs: 1-8 (Try invalid like "9" or "abc")
                </div>
              </div>
              
              {/* User Data Display */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64">
                {loading.user ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading user data...</p>
                  </div>
                ) : errors.user ? (
                  <div className="text-center py-8">
                    <div className="text-2xl mb-2">⚠️</div>
                    <p className="text-red-500 dark:text-red-400 mb-2">{errors.user}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fetch prevented due to validation
                    </p>
                  </div>
                ) : userData ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">👤</div>
                      <div>
                        <div className="font-bold text-lg text-gray-800 dark:text-gray-200">
                          {userData.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          ID: {userData.id}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-gray-500 dark:text-gray-400 w-20">Email:</span>
                        <span className="text-gray-800 dark:text-gray-200">{userData.email}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 dark:text-gray-400 w-20">Location:</span>
                        <span className="text-gray-800 dark:text-gray-200">{userData.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        ✅ Fetch triggered only when ID is valid (1-8)
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="text-2xl mb-2">🔢</div>
                    <p>Enter a valid user ID (1-8)</p>
                    <p className="text-sm mt-2">Fetch only happens when ID is valid</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Condition: Valid numeric ID 1-8</span>
                  <span>Status: {userId ? 'Checking...' : 'Waiting'}</span>
                </div>
              </div>
            </div>

            {/* Example 3: Category Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  📂 Category-Based Fetching
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {category === 'all' ? 'All Categories' : `Category: ${category}`}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {MOCK_DATA.categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={clsx(
                        "px-4 py-2 rounded-lg transition-colors duration-300",
                        category === cat
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Category Data Display */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
                {loading.category ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading {category} posts...</p>
                  </div>
                ) : errors.category ? (
                  <div className="text-center py-8 text-red-500 dark:text-red-400">
                    <div className="text-2xl mb-2">⚠️</div>
                    {errors.category}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {categoryData.map(post => (
                      <div 
                        key={post.id}
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                      >
                        <div className="font-bold text-gray-800 dark:text-gray-200">{post.title}</div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            User: {post.userId}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {categoryData.length === 0 && category !== 'all' && (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <div className="text-2xl mb-2">📭</div>
                        No posts in {category} category
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Condition: Category selection changed</span>
                  <span>Posts: {categoryData.length}</span>
                </div>
              </div>
            </div>

            {/* Example 4: Pagination */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  📄 Paginated Fetching
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Page {page} of {Math.ceil(MOCK_DATA.posts.length / 3)}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    disabled={page === 1}
                    className={clsx(
                      "px-4 py-2 rounded-lg transition-colors duration-300",
                      page === 1
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    )}
                  >
                    ← Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4].map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={clsx(
                          "w-10 h-10 rounded-lg transition-colors duration-300",
                          page === p
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setPage(prev => Math.min(4, prev + 1))}
                    disabled={page === 4}
                    className={clsx(
                      "px-4 py-2 rounded-lg transition-colors duration-300",
                      page === 4
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    )}
                  >
                    Next →
                  </button>
                </div>
              </div>
              
              {/* Page Data Display */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
                {loading.page ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading page {page}...</p>
                  </div>
                ) : errors.page ? (
                  <div className="text-center py-8 text-red-500 dark:text-red-400">
                    <div className="text-2xl mb-2">⚠️</div>
                    {errors.page}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pagedData.map(post => (
                      <div 
                        key={post.id}
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                      >
                        <div className="font-bold text-gray-800 dark:text-gray-200">
                          #{post.id}: {post.title}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            Page {page}, Item {(page - 1) * 3 + pagedData.indexOf(post) + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Condition: Page number changed</span>
                  <span>Items per page: 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.6s]">
            <span className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-xl mr-4">💻</span>
            Implementation Patterns
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pattern 1: Debounced Search */}
            <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Debounced Search Pattern
                </h3>
              </div>
              
              <pre className="text-sm text-gray-100 overflow-x-auto bg-gray-800 rounded-lg p-4 max-h-64">
{`useEffect(() => {
  // Clear previous timeout
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  // Don't fetch if search term is empty
  if (!searchTerm.trim()) {
    setResults([]);
    return;
  }

  // Set loading state
  setLoading(true);

  // Create new timeout
  timeoutRef.current = setTimeout(async () => {
    try {
      const response = await fetch(\`/api/search?q=\${searchTerm}\`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  }, 500); // 500ms debounce delay

  // Cleanup
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, [searchTerm]);`}
              </pre>
              
              <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
                <p className="text-blue-200 text-sm">
                  <strong>Key Point:</strong> Debouncing prevents API calls on every keystroke, reducing server load.
                </p>
              </div>
            </div>

            {/* Pattern 2: Conditional Validation */}
            <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Validation-Based Fetching
                </h3>
              </div>
              
              <pre className="text-sm text-gray-100 overflow-x-auto bg-gray-800 rounded-lg p-4 max-h-64">
{`useEffect(() => {
  const fetchData = async () => {
    // Validation checks before fetching
    if (!userId) {
      setError('User ID is required');
      return;
    }
    
    if (!/^\\d+$/.test(userId)) {
      setError('User ID must be numeric');
      return;
    }
    
    if (parseInt(userId) > MAX_USERS) {
      setError(\`User ID must be <= \${MAX_USERS}\`);
      return;
    }

    // All checks passed, proceed with fetch
    setLoading(true);
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError('Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [userId]);`}
              </pre>
              
              <div className="mt-4 p-3 bg-green-900/30 rounded-lg">
                <p className="text-green-200 text-sm">
                  <strong>Key Point:</strong> Validate conditions early to prevent unnecessary API calls and provide immediate feedback.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="mb-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_0.8s]">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
            <span className="bg-red-100 dark:bg-red-900 p-3 rounded-xl mr-4">🚫</span>
            Common Conditional Fetching Mistakes
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">1. Missing Debouncing on Search</h4>
              <p className="text-gray-700 dark:text-gray-300">
                When Swadeep types "React tutorial", the app makes 15 API calls instead of 1, overwhelming the server and causing race conditions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">2. No Input Validation</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Abhronila's app sends API requests for invalid user IDs like "abc" or "-1", wasting server resources and returning unnecessary errors.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">3. Forgetting Cleanup in Debouncing</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Debangshu implements debouncing but forgets to clear timeouts in cleanup, causing old searches to execute after new ones.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">4. Over-Fetching on Unchanged Dependencies</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Tuhina's useEffect runs on every render because she includes non-primitive dependencies without useCallback/useMemo.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_1s]">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">✅</span>
            Best Practices for Conditional Fetching
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Performance Optimizations:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">⚡</span>
                  Use debouncing (300-500ms) for search inputs
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">⚡</span>
                  Implement client-side caching to avoid duplicate requests
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">⚡</span>
                  Cancel pending requests when conditions change
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">⚡</span>
                  Use AbortController for request cancellation
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Validation Strategies:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔍</span>
                  Validate inputs before making API calls
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔍</span>
                  Check network status before attempting fetch
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔍</span>
                  Verify user authentication/permissions
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔍</span>
                  Implement rate limiting on client side
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-l-8 border-blue-500 dark:border-blue-400 rounded-2xl p-6 mb-12 hover:shadow-2xl transition-all duration-500 group">
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl mr-6 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl">👨‍🏫</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Teacher's Note
              </h3>
              
              <div className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Conditional fetching is like a smart traffic controller at Barrackpore station!</strong> Just like the controller only allows trains when the track is clear and passengers are ready, your app should only fetch data when conditions are right.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Think of it this way: When Tuhina searches for a book in the Ichapur library, she doesn't ask the librarian after every letter she types. She waits until she's finished typing the title, then asks once. That's debouncing!
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Remember:</strong> Every unnecessary API call is like sending a messenger when you don't need to. It wastes resources, slows down your app, and annoys users. Be smart about when you fetch.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Professional Insight:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    In 27 years, I've optimized countless apps by adding simple conditional fetching. Often, 80% of API calls were unnecessary and eliminating them doubled performance.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-green-600 dark:text-green-400 mb-1">Debugging Tip:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Log every API call with its conditions. If you see calls with invalid parameters, you've found a conditional fetching bug.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="mr-4"><strong>Sukanta Hui</strong></span>
                  <span className="mr-4">27 years experience</span>
                  <span>Web Development Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 mb-12">
          <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4 flex items-center">
            <span className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-4">💡</span>
            Thinking Exercise
          </h3>
          
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Observe carefully:</strong> Type quickly in the search box with debouncing enabled. Notice how results only appear after you stop typing. How does this improve performance?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try changing this:</strong> Disable fetching entirely and try to search or change user ID. What happens? Why is the "fetch enabled" condition important?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Think about:</strong> How would you implement a "smart cache" that stores search results and checks them before making new API calls? What data structure would you use?
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">📋 Conditional Fetching Checklist</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">⏱️</div>
              <h4 className="font-bold mb-2">Timing Control</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Debounce search inputs</li>
                <li>Throttle rapid changes</li>
                <li>Cancel outdated requests</li>
                <li>Clean up timeouts</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">✅</div>
              <h4 className="font-bold mb-2">Validation</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Validate inputs first</li>
                <li>Check network status</li>
                <li>Verify permissions</li>
                <li>Prevent duplicates</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold mb-2">Smart Strategies</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Implement caching</li>
                <li>Use AbortController</li>
                <li>Lazy load when visible</li>
                <li>Poll only when needed</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              <strong>Remember:</strong> Fetch smart, not hard. Every unnecessary API call wastes resources!
            </p>
          </div>
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.6s_ease-out\\],
          .animate-\\[slideUp_0\\.6s_ease-out_0\\.2s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.4s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.6s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.8s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_1s\\] {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .group-hover\\:scale-110,
          .hover\\:scale-105,
          .hover\\:scale-\\[1\\.02\\],
          .group-hover\\:rotate-12 {
            transform: none;
          }
          
          .animate-spin {
            animation: none;
          }
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
};

export default Topic40;