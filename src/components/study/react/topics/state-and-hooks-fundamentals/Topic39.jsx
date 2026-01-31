import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

const Topic39 = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  
  // Loading states
  const [loading, setLoading] = useState({
    users: false,
    posts: false,
    singleUser: false,
    retry: false
  });
  
  // Error states
  const [errors, setErrors] = useState({
    users: null,
    posts: null,
    singleUser: null,
    network: null
  });
  
  // UI states
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showSkeletons, setShowSkeletons] = useState(true);
  
  // Simulated API endpoints
  const API_ENDPOINTS = {
    users: simulateFailure 
      ? 'https://jsonplaceholder.typicode.com/invalid-endpoint' 
      : 'https://jsonplaceholder.typicode.com/users',
    posts: 'https://jsonplaceholder.typicode.com/posts',
    singleUser: (id) => `https://jsonplaceholder.typicode.com/users/${id}`
  };

  // Simulated slow API
  const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Fetch users with comprehensive state handling
  const fetchUsers = useCallback(async () => {
    try {
      // Set loading state
      setLoading(prev => ({ ...prev, users: true }));
      setErrors(prev => ({ ...prev, users: null }));
      
      // Simulate network delay for better UX demonstration
      await simulateDelay(1500);
      
      const response = await fetch(API_ENDPOINTS.users);
      
      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Success - update state
      setUsers(data.slice(0, 5)); // Limit to 5 for demo
      setLoading(prev => ({ ...prev, users: false }));
      
    } catch (error) {
      // Error handling
      console.error('Failed to fetch users:', error);
      setErrors(prev => ({ 
        ...prev, 
        users: `Failed to load users: ${error.message}` 
      }));
      
      // Fallback data for demonstration
      setUsers([
        { id: 1, name: 'Swadeep Roy', email: 'swadeep@example.com' },
        { id: 2, name: 'Tuhina Das', email: 'tuhina@example.com' }
      ]);
      
    } finally {
      // Always turn off loading
      setLoading(prev => ({ ...prev, users: false }));
    }
  }, [simulateFailure]);

  // Fetch posts with different loading strategies
  const fetchPosts = useCallback(async (retry = false) => {
    try {
      setLoading(prev => ({ ...prev, posts: true, retry }));
      setErrors(prev => ({ ...prev, posts: null }));
      
      // Simulate different delays based on retry
      await simulateDelay(retry ? 800 : 1200);
      
      const response = await fetch(API_ENDPOINTS.posts);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setPosts(data.slice(0, 8)); // Limit to 8 for demo
      
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        posts: `Failed to load posts. ${retry ? 'Retry failed!' : 'Try again?'}` 
      }));
      
      // Increment retry count
      if (retry) {
        setRetryCount(prev => prev + 1);
      }
      
    } finally {
      setLoading(prev => ({ ...prev, posts: false, retry: false }));
    }
  }, []);

  // Fetch single user with optimistic UI
  const fetchSingleUser = useCallback(async (userId) => {
    if (!userId) return;
    
    setSelectedUserId(userId);
    setLoading(prev => ({ ...prev, singleUser: true }));
    setErrors(prev => ({ ...prev, singleUser: null }));
    
    // Store current user for potential rollback
    const previousUser = singleUser;
    
    try {
      // Optimistically clear single user (optional pattern)
      // setSingleUser(null);
      
      await simulateDelay(1000);
      const response = await fetch(API_ENDPOINTS.singleUser(userId));
      
      if (!response.ok) {
        throw new Error(`User ${userId} not found`);
      }
      
      const data = await response.json();
      setSingleUser(data);
      
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        singleUser: `Failed to load user: ${error.message}` 
      }));
      
      // Could restore previous user here
      if (previousUser) {
        // setSingleUser(previousUser);
      }
      
    } finally {
      setLoading(prev => ({ ...prev, singleUser: false }));
    }
  }, []);

  // Simulate network error
  const simulateNetworkError = () => {
    setErrors(prev => ({ 
      ...prev, 
      network: 'Network connection lost. Please check your internet connection.' 
    }));
  };

  // Clear all errors
  const clearErrors = () => {
    setErrors({
      users: null,
      posts: null,
      singleUser: null,
      network: null
    });
    setRetryCount(0);
  };

  // Initialize with data
  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, [fetchUsers, fetchPosts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div 
          className="mb-8 animate-[fadeIn_0.8s_ease-out]"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Handling <span className="text-blue-600 dark:text-blue-400">Loading</span> &{" "}
            <span className="text-red-600 dark:text-red-400">Error</span> States
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Mastering user feedback during API calls for professional applications
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Theory */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">🔄</span>
              The Three States of API Calls
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Every API call has three possible states that must be handled gracefully:
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl mb-2">⏳</div>
                  <div className="font-bold text-blue-700 dark:text-blue-300">Loading</div>
                  <div className="text-sm mt-1">Data is being fetched</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="font-bold text-green-700 dark:text-green-300">Success</div>
                  <div className="text-sm mt-1">Data loaded successfully</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-3xl mb-2">❌</div>
                  <div className="font-bold text-red-700 dark:text-red-300">Error</div>
                  <div className="text-sm mt-1">Something went wrong</div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-4">
                <strong className="block mb-2 text-yellow-800 dark:text-yellow-300">Golden Rule:</strong>
                <p>Never assume an API call will succeed. Always prepare for failure and provide clear feedback to users.</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-4">
                <strong className="block mb-2 text-green-800 dark:text-green-300">User Experience:</strong>
                <p>Loading and error states aren't just technical requirements—they're critical for good UX. Users need to know what's happening.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Diagram */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out_0.2s]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">📊</span>
              State Flow Visualization
            </h2>
            
            <div className="relative h-64 mb-6">
              {/* State Flow Diagram */}
              <svg width="100%" height="100%" viewBox="0 0 600 240" className="overflow-visible">
                {/* Starting Point */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <circle cx="100" cy="120" r="25" 
                    fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
                  <text x="100" y="125" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                    Start
                  </text>
                </g>
                
                {/* Arrow to Loading */}
                <path d="M 125 120 L 175 120" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="175,120 165,115 165,125" fill="#9CA3AF" />
                
                {/* Loading State */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="200" y="95" width="100" height="50" rx="8" 
                    fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
                  <text x="250" y="125" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                    Loading
                  </text>
                  <text x="250" y="140" textAnchor="middle" className="text-[10px] fill-yellow-600">
                    Show spinner
                  </text>
                </g>
                
                {/* Arrows from Loading */}
                <path d="M 305 120 L 355 120 L 355 70" 
                  stroke="#10B981" strokeWidth="2" />
                <path d="M 305 120 L 355 120 L 355 170" 
                  stroke="#EF4444" strokeWidth="2" />
                
                {/* Success State */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="380" y="45" width="100" height="50" rx="8" 
                    fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                  <text x="430" y="75" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                    Success
                  </text>
                  <text x="430" y="90" textAnchor="middle" className="text-[10px] fill-green-600">
                    Show data
                  </text>
                </g>
                
                {/* Error State */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="380" y="145" width="100" height="50" rx="8" 
                    fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" strokeWidth="2" />
                  <text x="430" y="175" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                    Error
                  </text>
                  <text x="430" y="190" textAnchor="middle" className="text-[10px] fill-red-600">
                    Show error
                  </text>
                </g>
                
                {/* Retry Path */}
                <g>
                  <path d="M 430 195 L 430 220 L 250 220 L 250 150" 
                    stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                  <text x="340" y="235" textAnchor="middle" className="text-[10px] fill-purple-500">
                    Retry option
                  </text>
                </g>
                
                {/* Current State Indicators */}
                <g>
                  {/* Loading indicator */}
                  {loading.users && (
                    <circle cx="250" cy="120" r="8" fill="#F59E0B" className="animate-pulse" />
                  )}
                  
                  {/* Error indicator */}
                  {errors.users && (
                    <circle cx="430" cy="170" r="8" fill="#EF4444" className="animate-pulse" />
                  )}
                  
                  {/* Success indicator */}
                  {users.length > 0 && !loading.users && !errors.users && (
                    <circle cx="430" cy="70" r="8" fill="#10B981" className="animate-pulse" />
                  )}
                </g>
              </svg>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Current Mode:</div>
                <div className="font-bold">
                  {simulateFailure ? 'Failure Mode' : 'Normal Mode'}
                </div>
              </div>
              
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-1">Active Loaders:</div>
                <div className="font-bold">
                  {Object.values(loading).filter(Boolean).length}
                </div>
              </div>
              
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">Active Errors:</div>
                <div className="font-bold">
                  {Object.values(errors).filter(Boolean).length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">🎮</span>
            State Simulation Controls
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <button
              onClick={fetchUsers}
              disabled={loading.users}
              className={clsx(
                "py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center",
                loading.users 
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  : "bg-blue-500 hover:bg-blue-600 text-white hover:scale-[1.02]"
              )}
            >
              {loading.users ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Loading Users...
                </>
              ) : (
                '🔄 Refresh Users'
              )}
            </button>
            
            <button
              onClick={() => fetchPosts(false)}
              disabled={loading.posts}
              className={clsx(
                "py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center",
                loading.posts 
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  : "bg-purple-500 hover:bg-purple-600 text-white hover:scale-[1.02]"
              )}
            >
              {loading.posts ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Loading Posts...
                </>
              ) : (
                '📝 Refresh Posts'
              )}
            </button>
            
            <button
              onClick={simulateNetworkError}
              className="py-3 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
            >
              🚫 Simulate Network Error
            </button>
            
            <button
              onClick={clearErrors}
              className="py-3 rounded-lg font-medium bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
            >
              🧹 Clear All Errors
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={simulateFailure}
                  onChange={(e) => setSimulateFailure(e.target.checked)}
                  className="sr-only"
                />
                <div className={clsx(
                  "block w-12 h-6 rounded-full transition-colors duration-300",
                  simulateFailure ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"
                )}></div>
                <div className={clsx(
                  "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300",
                  simulateFailure ? "transform translate-x-6" : ""
                )}></div>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Simulate API Failure
              </span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showSkeletons}
                  onChange={(e) => setShowSkeletons(e.target.checked)}
                  className="sr-only"
                />
                <div className={clsx(
                  "block w-12 h-6 rounded-full transition-colors duration-300",
                  showSkeletons ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                )}></div>
                <div className={clsx(
                  "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300",
                  showSkeletons ? "transform translate-x-6" : ""
                )}></div>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                Show Skeleton Loaders
              </span>
            </label>
            
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Retry Count:</div>
              <div className="font-bold text-lg text-purple-600 dark:text-purple-400">
                {retryCount} {retryCount === 1 ? 'attempt' : 'attempts'}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Different Examples */}
        <div className="mb-8">
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {['users', 'posts', 'single', 'errors'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap",
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {tab === 'users' && '👥 Users Example'}
                {tab === 'posts' && '📝 Posts Example'}
                {tab === 'single' && '👤 Single User'}
                {tab === 'errors' && '🚨 Error Handling'}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    👥 Users List with Loading States
                  </h3>
                  {errors.users && (
                    <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                      ⚠️ Error Detected
                    </div>
                  )}
                </div>
                
                {/* Loading State */}
                {loading.users && showSkeletons ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-3"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Error State */
                  errors.users ? (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">😟</div>
                      <h4 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                        Oops! Something went wrong
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {errors.users}
                      </p>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={fetchUsers}
                          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                        >
                          Try Again
                        </button>
                        <button
                          onClick={() => setSimulateFailure(false)}
                          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-300"
                        >
                          Disable Failure Mode
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Success State */
                    <div className="space-y-4">
                      {users.map(user => (
                        <div 
                          key={user.id}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 group cursor-pointer"
                          onClick={() => fetchSingleUser(user.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {user.name}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {user.email}
                              </p>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
            
            {activeTab === 'posts' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    📝 Posts with Retry Mechanism
                  </h3>
                  {loading.posts && (
                    <div className="flex items-center text-blue-500 dark:text-blue-400">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
                      Loading posts...
                    </div>
                  )}
                </div>
                
                {/* Combined Loading/Error/Success State */}
                <div className="space-y-6">
                  {/* Error Banner */}
                  {errors.posts && (
                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">⚠️</div>
                          <div>
                            <h4 className="font-bold text-red-700 dark:text-red-300">Failed to Load Posts</h4>
                            <p className="text-red-600 dark:text-red-400 text-sm">{errors.posts}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => fetchPosts(true)}
                          disabled={loading.retry}
                          className="px-4 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-lg transition-colors duration-300 flex items-center"
                        >
                          {loading.retry ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 mr-2"></div>
                              Retrying...
                            </>
                          ) : (
                            '🔄 Retry'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Skeleton Loader */}
                  {loading.posts && showSkeletons && !errors.posts && (
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse">
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Success Content */}
                  {!loading.posts && posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {posts.map(post => (
                        <div 
                          key={post.id}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 line-clamp-1">
                            {post.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                            {post.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Empty State */}
                  {!loading.posts && posts.length === 0 && !errors.posts && (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">📭</div>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                        No posts available
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Click "Refresh Posts" to load content
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'single' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  👤 Single User Fetch with Optimistic UI
                </h3>
                
                <div className="flex space-x-4 mb-6 overflow-x-auto">
                  {[1, 2, 3, 4, 5].map(id => (
                    <button
                      key={id}
                      onClick={() => fetchSingleUser(id)}
                      disabled={loading.singleUser && selectedUserId === id}
                      className={clsx(
                        "px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap",
                        loading.singleUser && selectedUserId === id
                          ? "bg-blue-300 dark:bg-blue-700 text-white"
                          : selectedUserId === id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      )}
                    >
                      User {id}
                    </button>
                  ))}
                </div>
                
                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {loading.singleUser ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Loading user details...
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        (This simulates a 1-second delay)
                      </p>
                    </div>
                  ) : errors.singleUser ? (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">😕</div>
                      <h4 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                        User Not Found
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {errors.singleUser}
                      </p>
                      <button
                        onClick={() => fetchSingleUser(1)}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                      >
                        Load Default User
                      </button>
                    </div>
                  ) : singleUser ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">👤</div>
                        <div>
                          <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {singleUser.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            @{singleUser.username}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-500 mb-1">Email</div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">
                            {singleUser.email}
                          </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-500 mb-1">Phone</div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">
                            {singleUser.phone}
                          </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-500 mb-1">Website</div>
                          <div className="font-medium text-blue-600 dark:text-blue-400">
                            {singleUser.website}
                          </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-500 mb-1">Company</div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">
                            {singleUser.company?.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <div className="text-5xl mb-4">🔍</div>
                      <p>Select a user to see their details</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'errors' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  🚨 Comprehensive Error Handling Examples
                </h3>
                
                <div className="space-y-6">
                  {/* Network Error Example */}
                  {errors.network && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                      <div className="flex items-start">
                        <div className="text-3xl mr-4">🌐</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">
                            Network Connection Error
                          </h4>
                          <p className="text-red-600 dark:text-red-400 mb-4">
                            {errors.network}
                          </p>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => {
                                setErrors(prev => ({ ...prev, network: null }));
                                fetchUsers();
                              }}
                              className="px-4 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-lg transition-colors duration-300"
                            >
                              Reconnect
                            </button>
                            <button
                              onClick={() => setErrors(prev => ({ ...prev, network: null }))}
                              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-300"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Error Types Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                      <div className="text-2xl mb-2">⏱️</div>
                      <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">
                        Timeout Errors
                      </h4>
                      <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                        Server takes too long to respond. Implement timeout logic and retry with backoff.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                      <div className="text-2xl mb-2">🔐</div>
                      <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">
                        Authentication Errors
                      </h4>
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        401/403 errors. Redirect to login or refresh tokens automatically.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                      <div className="text-2xl mb-2">📊</div>
                      <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">
                        Rate Limiting
                      </h4>
                      <p className="text-purple-600 dark:text-purple-400 text-sm">
                        429 Too Many Requests. Implement exponential backoff and user notification.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="text-2xl mb-2">🔧</div>
                      <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
                        Server Errors
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">
                        500 Internal Server Error. Show generic error message and log details for debugging.
                      </p>
                    </div>
                  </div>
                  
                  {/* Fallback Strategies */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">
                      Fallback Strategies When APIs Fail
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full p-1 mr-3 mt-1">1</div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">Cached Data</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Show previously loaded data with a "stale" indicator
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full p-1 mr-3 mt-1">2</div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">Empty States</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Design beautiful empty states that explain what's missing
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full p-1 mr-3 mt-1">3</div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">Offline Mode</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Allow limited functionality when completely offline
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.6s]">
            <span className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-xl mr-4">💻</span>
            Implementation Patterns
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pattern 1: Comprehensive State Management */}
            <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Comprehensive State Pattern
                </h3>
              </div>
              
              <pre className="text-sm text-gray-100 overflow-x-auto bg-gray-800 rounded-lg p-4 max-h-64">
{`// Define all possible states
const [state, setState] = useState({
  data: null,
  loading: false,
  error: null,
  retryCount: 0
});

const fetchData = async () => {
  // Set loading, clear previous errors
  setState(prev => ({ 
    ...prev, 
    loading: true, 
    error: null 
  }));
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }
    
    const data = await response.json();
    
    // Success state
    setState(prev => ({
      ...prev,
      data,
      loading: false,
      retryCount: 0
    }));
    
  } catch (error) {
    // Error state
    setState(prev => ({
      ...prev,
      error: error.message,
      loading: false,
      retryCount: prev.retryCount + 1
    }));
  }
};`}
              </pre>
              
              <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
                <p className="text-blue-200 text-sm">
                  <strong>Key Point:</strong> Group related states together for cleaner code and predictable state transitions.
                </p>
              </div>
            </div>

            {/* Pattern 2: Skeleton Loaders */}
            <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🦴</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Skeleton Loader Pattern
                </h3>
              </div>
              
              <pre className="text-sm text-gray-100 overflow-x-auto bg-gray-800 rounded-lg p-4 max-h-64">
{`// Component with skeleton loader
const UserList = ({ users, loading, error }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 bg-gray-100 animate-pulse rounded">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-xl mb-2">⚠️</div>
        <p className="text-red-600">{error}</p>
        <button onClick={retry}>Try Again</button>
      </div>
    );
  }
  
  // Render actual data
  return (
    <div>{/* user list */}</div>
  );
};`}
              </pre>
              
              <div className="mt-4 p-3 bg-green-900/30 rounded-lg">
                <p className="text-green-200 text-sm">
                  <strong>Key Point:</strong> Skeleton loaders maintain layout stability and provide better UX than spinners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="mb-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_0.8s]">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
            <span className="bg-red-100 dark:bg-red-900 p-3 rounded-xl mr-4">🚫</span>
            Common Loading & Error State Mistakes
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">1. Forgetting to Reset Loading States</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Swadeep sets loading to true but forgets to set it to false in error cases, leaving the app in a permanent loading state.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">2. Generic Error Messages</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Abhronila shows "Something went wrong" for all errors. Users in Barrackpore can't tell if it's their internet or the server.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">3. No Loading Indicators for Fast Operations</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Debangshu doesn't show loaders for "fast" operations, but on slow Naihati internet, users think nothing is happening.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">4. Blocking UI During Loading</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Tuhina disables entire forms during save operations, preventing users from correcting other fields while waiting.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_1s]">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">✅</span>
            Best Practices for Loading & Error States
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Loading State Guidelines:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Show loaders for operations longer than 300ms
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Use skeleton loaders for content areas
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Implement optimistic UI when appropriate
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Always reset loading state in finally block
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Error Handling Guidelines:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Provide specific, actionable error messages
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Include retry mechanisms for transient errors
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Log technical details, show user-friendly messages
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Implement graceful degradation and fallbacks
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
                  <strong>Loading and error states are like traffic signals for your app!</strong> Just like traffic lights in Shyamnagar tell drivers what to expect (green = go, yellow = prepare to stop, red = stop), your app needs clear signals for users.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Think of it this way: When Swadeep orders food from an Ichapur restaurant, he wants to know if it's being prepared (loading), ready for pickup (success), or if there's a problem with his order (error). Apps are no different!
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Remember:</strong> The difference between a good app and a great app is how it handles failure. Users remember when apps fail gracefully more than when they work perfectly.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Professional Insight:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    In 27 years, I've seen more apps fail from poor error handling than from bad features. Users will forgive slowness but not confusion.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-green-600 dark:text-green-400 mb-1">Debugging Tip:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Add console logs for each state transition. Seeing "loading → error" or "loading → success" helps debug race conditions.
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
              <strong>Observe carefully:</strong> Enable "Simulate API Failure" and refresh users. Notice how the error state includes fallback data. Why is this important?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try changing this:</strong> Turn off "Show Skeleton Loaders" and refresh posts. Which feels better? Why do skeleton loaders improve UX?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Think about:</strong> How would you implement a "smart retry" that waits longer between each attempt? What state would you need to track?
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">📋 Loading & Error State Checklist</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">⏳</div>
              <h4 className="font-bold mb-2">Loading States</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Show for operations > 300ms</li>
                <li>Use skeleton loaders</li>
                <li>Maintain layout stability</li>
                <li>Reset in finally block</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🚨</div>
              <h4 className="font-bold mb-2">Error States</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>User-friendly messages</li>
                <li>Actionable solutions</li>
                <li>Retry mechanisms</li>
                <li>Graceful fallbacks</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold mb-2">UX Principles</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Never leave users guessing</li>
                <li>Provide clear feedback</li>
                <li>Maintain interactivity</li>
                <li>Design for all states</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              <strong>Remember:</strong> Design for loading and error states as carefully as you design for success states!
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
          
          .animate-spin,
          .animate-pulse {
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

export default Topic39;