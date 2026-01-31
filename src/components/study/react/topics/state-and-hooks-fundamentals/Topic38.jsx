import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Topic38 = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({
    posts: false,
    users: false,
    single: false
  });
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(1);
  const [postId, setPostId] = useState(null);
  const [singlePost, setSinglePost] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [fetchStrategy, setFetchStrategy] = useState('onMount');
  const [abortController, setAbortController] = useState(null);
  
  const fetchCountRef = useRef(0);
  const isMountedRef = useRef(true);

  // Simulated API endpoints
  const API_ENDPOINTS = {
    posts: 'https://jsonplaceholder.typicode.com/posts',
    users: 'https://jsonplaceholder.typicode.com/users',
    singlePost: (id) => `https://jsonplaceholder.typicode.com/posts/${id}`,
    userPosts: (id) => `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  };

  // Example 1: Basic fetch on component mount
  useEffect(() => {
    console.log('🟢 useEffect: Fetching posts on component mount');
    fetchPosts();
    
    return () => {
      console.log('🔴 Cleanup: Cancelling any pending requests');
      if (abortController) {
        abortController.abort();
      }
      isMountedRef.current = false;
    };
  }, []); // Empty dependency array = run once on mount

  // Example 2: Fetch with dependency (userId changes)
  useEffect(() => {
    if (fetchStrategy === 'onDependency' && userId) {
      console.log(`🟢 useEffect: Fetching posts for user ${userId}`);
      fetchUserPosts(userId);
    }
  }, [userId, fetchStrategy]);

  // Example 3: Conditional fetching
  useEffect(() => {
    if (fetchStrategy === 'conditional' && postId && postId > 0 && postId <= 100) {
      console.log(`🟢 useEffect: Fetching post ${postId}`);
      fetchSinglePost(postId);
    }
  }, [postId, fetchStrategy]);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(prev => ({ ...prev, posts: true }));
      setError(null);
      
      const controller = new AbortController();
      setAbortController(controller);
      
      // Simulate network delay for educational purposes
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await fetch(API_ENDPOINTS.posts, {
        signal: controller.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (isMountedRef.current) {
        setPosts(data.slice(0, 5)); // Show only first 5 for clarity
        setFetchCount(prev => prev + 1);
        fetchCountRef.current++;
      }
    } catch (err) {
      if (err.name !== 'AbortError' && isMountedRef.current) {
        console.error('Fetch error:', err);
        setError(`Failed to fetch posts: ${err.message}`);
        
        // Simulate fallback data for educational purposes
        if (fetchCountRef.current === 0) {
          setPosts([
            { id: 1, title: 'Fallback Post 1', body: 'This is fallback data for educational purposes.' },
            { id: 2, title: 'Fallback Post 2', body: 'Network error simulation in action.' }
          ]);
        }
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(prev => ({ ...prev, posts: false }));
      }
    }
  };

  // Fetch posts for specific user
  const fetchUserPosts = async (id) => {
    try {
      setLoading(prev => ({ ...prev, users: true }));
      setError(null);
      
      const controller = new AbortController();
      setAbortController(controller);
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const response = await fetch(API_ENDPOINTS.userPosts(id), {
        signal: controller.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (isMountedRef.current) {
        setUsers(data);
        setFetchCount(prev => prev + 1);
        fetchCountRef.current++;
      }
    } catch (err) {
      if (err.name !== 'AbortError' && isMountedRef.current) {
        console.error('Fetch error:', err);
        setError(`Failed to fetch user posts: ${err.message}`);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(prev => ({ ...prev, users: false }));
      }
    }
  };

  // Fetch single post
  const fetchSinglePost = async (id) => {
    try {
      setLoading(prev => ({ ...prev, single: true }));
      setError(null);
      
      const controller = new AbortController();
      setAbortController(controller);
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const response = await fetch(API_ENDPOINTS.singlePost(id), {
        signal: controller.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (isMountedRef.current) {
        setSinglePost(data);
        setFetchCount(prev => prev + 1);
        fetchCountRef.current++;
      }
    } catch (err) {
      if (err.name !== 'AbortError' && isMountedRef.current) {
        console.error('Fetch error:', err);
        setError(`Failed to fetch post ${id}: ${err.message}`);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(prev => ({ ...prev, single: false }));
      }
    }
  };

  // Simulate network error
  const simulateError = () => {
    setError('Simulated network error: Unable to connect to server');
    setPosts([]);
    setUsers([]);
    setSinglePost(null);
  };

  // Reset all data
  const resetData = () => {
    setPosts([]);
    setUsers([]);
    setSinglePost(null);
    setError(null);
    setFetchCount(0);
    fetchCountRef.current = 0;
  };

  // Abort current request
  const abortRequest = () => {
    if (abortController) {
      abortController.abort();
      setError('Request was aborted by user');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div 
          className="mb-8 animate-[fadeIn_0.8s_ease-out]"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Fetching Data with <span className="text-blue-600 dark:text-blue-400">useEffect</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Mastering API calls, loading states, and error handling in React components
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Theory */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">🌐</span>
              Why useEffect for Data Fetching?
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useEffect</code> is the primary hook for side effects like data fetching because it lets you synchronize your component with external systems.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4">
                <strong className="block mb-2 text-blue-800 dark:text-blue-300">Key Concept:</strong>
                <p>Data fetching is a side effect that should happen after the component renders, not during render. useEffect provides the perfect timing for this.</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-4">
                <strong className="block mb-2 text-green-800 dark:text-green-300">The Fetching Pattern:</strong>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (isMounted) {
        setData(data);
      }
    } catch (error) {
      if (isMounted) {
        setError(error.message);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };
  
  fetchData();
  
  return () => {
    isMounted = false;
  };
}, [dependencies]);`}
                </pre>
              </div>
            </div>

            {/* Fetching Strategies */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Common Fetching Strategies</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">On Mount</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>{`useEffect(() => {}, [])`}</code>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">On Dependency Change</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>{`useEffect(() => {}, [userId])`}</code>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Conditional</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>{`useEffect(() => { if (id) {...} }, [id])`}</code>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Manual Trigger</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Button click or event
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
              Data Fetching Lifecycle
            </h2>
            
            <div className="relative h-64 mb-6">
              {/* Lifecycle Diagram */}
              <svg width="100%" height="100%" viewBox="0 0 600 240" className="overflow-visible">
                {/* Component Render */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="50" y="40" width="100" height="50" rx="8" 
                    fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
                  <text x="100" y="70" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                    Component Renders
                  </text>
                  <text x="100" y="85" textAnchor="middle" className="text-[10px] fill-blue-600">
                    Initial state
                  </text>
                </g>
                
                {/* Arrow */}
                <path d="M 155 65 L 195 65" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="195,65 185,60 185,70" fill="#9CA3AF" />
                
                {/* useEffect Runs */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="200" y="40" width="100" height="50" rx="8" 
                    fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="250" y="70" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                    useEffect Runs
                  </text>
                  <text x="250" y="85" textAnchor="middle" className="text-[10px] fill-green-600">
                    API call starts
                  </text>
                </g>
                
                {/* Arrow */}
                <path d="M 305 65 L 345 65" stroke="#9CA3AF" strokeWidth="2" />
                <polygon points="345,65 335,60 335,70" fill="#9CA3AF" />
                
                {/* Loading State */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="350" y="40" width="100" height="50" rx="8" 
                    fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
                  <text x="400" y="70" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                    Loading State
                  </text>
                  <text x="400" y="85" textAnchor="middle" className="text-[10px] fill-yellow-600">
                    Show spinner
                  </text>
                </g>
                
                {/* Result Paths */}
                <g>
                  <path d="M 400 95 L 400 130 L 250 130 L 250 160" 
                    stroke="#10B981" strokeWidth="2" fill="none" />
                  <text x="325" y="145" textAnchor="middle" className="text-[10px] fill-green-600 font-medium">
                    Success → Update State
                  </text>
                </g>
                
                <g>
                  <path d="M 400 95 L 400 170 L 100 170 L 100 160" 
                    stroke="#EF4444" strokeWidth="2" fill="none" strokeDasharray="4,4" />
                  <text x="250" y="190" textAnchor="middle" className="text-[10px] fill-red-500 font-medium">
                    Error → Show Error State
                  </text>
                </g>
                
                {/* Success State */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="200" y="165" width="100" height="50" rx="8" 
                    fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                  <text x="250" y="195" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                    Data Loaded
                  </text>
                  <text x="250" y="210" textAnchor="middle" className="text-[10px] fill-green-600">
                    Render data
                  </text>
                </g>
                
                {/* Error State */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="50" y="165" width="100" height="50" rx="8" 
                    fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" strokeWidth="2" />
                  <text x="100" y="195" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                    Error State
                  </text>
                  <text x="100" y="210" textAnchor="middle" className="text-[10px] fill-red-600">
                    Show error message
                  </text>
                </g>
              </svg>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">{fetchCount}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">API Calls</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-300">{posts.length + users.length + (singlePost ? 1 : 0)}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Items Loaded</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-300">{error ? 1 : 0}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">Errors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.4s]">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">🎮</span>
            Interactive Fetching Examples
          </h2>
          
          {/* Control Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Control Panel</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <button
                onClick={fetchPosts}
                disabled={loading.posts}
                className={clsx(
                  "py-3 rounded-lg font-medium transition-all duration-300",
                  loading.posts 
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    : "bg-blue-500 hover:bg-blue-600 text-white hover:scale-[1.02]"
                )}
              >
                {loading.posts ? '⏳ Loading Posts...' : '📝 Fetch Posts'}
              </button>
              
              <button
                onClick={() => fetchUserPosts(userId)}
                disabled={loading.users}
                className={clsx(
                  "py-3 rounded-lg font-medium transition-all duration-300",
                  loading.users 
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    : "bg-purple-500 hover:bg-purple-600 text-white hover:scale-[1.02]"
                )}
              >
                {loading.users ? '⏳ Loading User...' : '👤 Fetch User Posts'}
              </button>
              
              <button
                onClick={simulateError}
                className="py-3 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-[1.02]"
              >
                🚫 Simulate Error
              </button>
              
              <button
                onClick={abortRequest}
                className="py-3 rounded-lg font-medium bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 hover:scale-[1.02]"
              >
                ⏹️ Abort Request
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  User ID (for dependency fetching):
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(id => (
                    <button
                      key={id}
                      onClick={() => setUserId(id)}
                      className={clsx(
                        "px-3 py-2 rounded-lg transition-colors duration-300",
                        userId === id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      )}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Post ID (conditional fetch):
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={postId || ''}
                  onChange={(e) => setPostId(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="Enter post ID (1-100)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fetch Strategy:
                </label>
                <select
                  value={fetchStrategy}
                  onChange={(e) => setFetchStrategy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="onMount">On Component Mount</option>
                  <option value="onDependency">On Dependency Change</option>
                  <option value="conditional">Conditional Fetching</option>
                  <option value="manual">Manual Trigger Only</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={resetData}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Reset All Data
              </button>
            </div>
          </div>
          
          {/* Data Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Posts Display */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  📝 Posts (onMount)
                </h3>
                {loading.posts && (
                  <div className="flex items-center text-blue-500 dark:text-blue-400">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-sm">Loading...</span>
                  </div>
                )}
              </div>
              
              {posts.length === 0 && !loading.posts ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">📭</div>
                  <p>No posts loaded yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {posts.map(post => (
                    <div
                      key={post.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1 line-clamp-1">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* User Posts Display */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  👤 User {userId} Posts
                </h3>
                {loading.users && (
                  <div className="flex items-center text-purple-500 dark:text-purple-400">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
                    <span className="ml-2 text-sm">Loading...</span>
                  </div>
                )}
              </div>
              
              {users.length === 0 && !loading.users ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">👤</div>
                  <p>Select user to load posts</p>
                  <p className="text-sm mt-2">Current strategy: {fetchStrategy}</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {users.map(post => (
                    <div
                      key={post.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1 line-clamp-1">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Single Post Display */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  📄 Single Post
                </h3>
                {loading.single && (
                  <div className="flex items-center text-green-500 dark:text-green-400">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                    <span className="ml-2 text-sm">Loading...</span>
                  </div>
                )}
              </div>
              
              {!singlePost && !loading.single ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">🔍</div>
                  <p>Enter post ID to load</p>
                  <p className="text-sm mt-2">Conditional fetching</p>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {singlePost && (
                    <>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">
                        {singlePost.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {singlePost.body}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        Post ID: {singlePost.id} | User ID: {singlePost.userId}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-12 animate-[fadeIn_0.5s_ease-out]">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-2xl p-6">
              <div className="flex items-center">
                <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg mr-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">
                    Error Occurred
                  </h3>
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.6s]">
            <span className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-xl mr-4">💻</span>
            Implementation Patterns
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pattern 1: Basic Fetch */}
            <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Basic Fetch Pattern
                </h3>
              </div>
              
              <pre className="text-sm text-gray-100 overflow-x-auto bg-gray-800 rounded-lg p-4">
{`useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      
      // Only update state if component is still mounted
      if (isMounted) {
        setData(data);
        setError(null);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
        // Optional: Set fallback data
        setData([]);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };
  
  fetchData();
  
  return () => {
    isMounted = false; // Cleanup
  };
}, [url]); // Re-fetch when URL changes`}
              </pre>
              
              <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
                <p className="text-blue-200 text-sm">
                  <strong>Key Point:</strong> Always check <code>isMounted</code> before updating state to avoid memory leaks.
                </p>
              </div>
            </div>

            {/* Pattern 2: AbortController */}
            <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⏹️</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  AbortController Pattern
                </h3>
              </div>
              
              <pre className="text-sm text-gray-100 overflow-x-auto bg-gray-800 rounded-lg p-4">
{`useEffect(() => {
  const abortController = new AbortController();
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        signal: abortController.signal
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      // Check if error is from abort
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
  
  // Cleanup: abort fetch on unmount
  return () => {
    abortController.abort();
  };
}, [url]);`}
              </pre>
              
              <div className="mt-4 p-3 bg-green-900/30 rounded-lg">
                <p className="text-green-200 text-sm">
                  <strong>Key Point:</strong> AbortController allows canceling fetch requests when component unmounts or when a new request starts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="mb-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_0.8s]">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
            <span className="bg-red-100 dark:bg-red-900 p-3 rounded-xl mr-4">🚫</span>
            Common Pitfalls & Anti-Patterns
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">1. Missing Loading States</h4>
              <p className="text-gray-700 dark:text-gray-300">
                When Swadeep forgets to implement loading states, users see stale data or empty screens during fetches, creating a poor UX.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">2. No Error Handling</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Abhronila's app crashes when the API is down because she doesn't wrap fetch calls in try-catch blocks or handle HTTP errors.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">3. Memory Leaks from Unmounted Components</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Debangshu navigates away while data is fetching, but the component still updates state after unmounting, causing React warnings.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">4. Infinite Re-render Loops</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Tuhina includes state setters in dependency arrays without useCallback, causing useEffect to run endlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_1s]">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">✅</span>
            Best Practices for Data Fetching
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Essential Patterns:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Always handle loading, success, and error states
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Use AbortController or isMounted flag for cleanup
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Implement retry logic for failed requests
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Cache responses when appropriate
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Performance Tips:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">⚡</span>
                  Debounce rapid dependency changes
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">⚡</span>
                  Use React Query or SWR for complex fetching
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">⚡</span>
                  Implement skeleton loaders for better UX
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">⚡</span>
                  Consider lazy loading for non-critical data
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
                  <strong>Data fetching is like ordering food at a restaurant in Ichapur!</strong> When you order (send request), you get a confirmation (loading state). The food arrives (success), or they tell you it's unavailable (error). You wouldn't want the waiter to keep bringing food after you've left (memory leak)!
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Think of it this way: When Tuhina opens her school app in Barrackpore, she expects to see either her timetable (data), a loading spinner (loading), or an error message if the server is down. All three states must be handled gracefully.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Remember:</strong> A good fetch implementation handles the happy path (success), the waiting path (loading), and the sad path (error). Missing any of these creates a frustrating user experience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Professional Insight:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    In 27 years, I've learned that 90% of data fetching bugs come from missing cleanup, unhandled errors, or infinite loops. Master these patterns and you'll avoid most production issues.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-green-600 dark:text-green-400 mb-1">Debugging Tip:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Add console logs at each stage of your fetch: start, success, error, cleanup. This creates a breadcrumb trail for debugging network issues.
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
              <strong>Observe carefully:</strong> Click "Fetch Posts" multiple times quickly. Notice how the loading state prevents duplicate requests. What would happen without this protection?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try changing this:</strong> Set fetch strategy to "On Dependency Change" and change User ID rapidly. Notice the behavior. How could you improve this with debouncing?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Think about:</strong> How would you implement a retry mechanism for failed requests? What state would you need to track retry attempts?
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">📋 Data Fetching Checklist</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🔧</div>
              <h4 className="font-bold mb-2">Setup</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Define loading state</li>
                <li>Define error state</li>
                <li>Define data state</li>
                <li>Choose fetch strategy</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-bold mb-2">Execution</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Set loading to true</li>
                <li>Wrap in try-catch</li>
                <li>Handle errors</li>
                <li>Update data state</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🧹</div>
              <h4 className="font-bold mb-2">Cleanup</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Use isMounted flag</li>
                <li>Or AbortController</li>
                <li>Set loading to false</li>
                <li>Reset states if needed</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              <strong>Remember:</strong> Always handle loading, success, AND error states!
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
          .animate-\\[fadeIn_0\\.8s_ease-out_1s\\],
          .animate-\\[fadeIn_0\\.5s_ease-out\\] {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .group-hover\\:scale-110,
          .hover\\:scale-105,
          .hover\\:scale-\\[1\\.02\\] {
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

export default Topic38;