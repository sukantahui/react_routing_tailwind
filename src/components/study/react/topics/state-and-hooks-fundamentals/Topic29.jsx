import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic29 = () => {
  // Example states to demonstrate useEffect
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState({ name: 'Swadeep', score: 85 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Example 1: useEffect with no dependencies (runs on every render)
  useEffect(() => {
    console.log('✅ useEffect without dependencies - runs on every render');
    console.log(`Current counter: ${counter}`);
    // This would be the place for effects that should run on every update
  });

  // Example 2: useEffect with empty dependency array (runs once)
  useEffect(() => {
    console.log('✅ useEffect with [] - runs once on mount');
    
    // Simulating component mount tasks
    document.title = `React Tutorial - useEffect Hook`;
    
    // Cleanup function
    return () => {
      console.log('🧹 Cleanup - component will unmount');
      document.title = 'React App'; // Reset title
    };
  }, []);

  // Example 3: useEffect with specific dependencies
  useEffect(() => {
    console.log('✅ useEffect with [counter] - runs when counter changes');
    document.title = `Counter: ${counter} | React Tutorial`;
    
    // This would be where you'd update something based on counter
  }, [counter]);

  // Example 4: useEffect for window resize
  useEffect(() => {
    console.log('✅ useEffect for window resize');
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup - remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Example 5: useEffect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      if (!showDetails) return; // Only fetch when needed
      
      setLoading(true);
      setError(null);
      
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockData = {
          id: 1,
          name: 'Tuhina',
          city: 'Barrackpore',
          courses: ['React', 'JavaScript', 'CSS'],
          enrollmentDate: '2024-01-15'
        };
        
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [showDetails]); // Fetch when showDetails changes

  // Example 6: useEffect with multiple dependencies
  useEffect(() => {
    console.log(`📊 User score updated: ${user.name} - ${user.score}`);
    
    // Calculate grade based on score
    const grade = user.score >= 90 ? 'A' : 
                  user.score >= 80 ? 'B' : 
                  user.score >= 70 ? 'C' : 'D';
    
    console.log(`Grade: ${grade}`);
    
    // This effect runs whenever user object changes
  }, [user]); // Dependency on user object

  // Helper functions
  const incrementCounter = () => {
    setCounter(prev => prev + 1);
  };

  const updateUserScore = () => {
    setUser(prev => ({
      ...prev,
      score: prev.score + 5
    }));
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Topic 25/46
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Introduction to the useEffect Hook
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Master the art of managing side effects in your React components—from API calls to subscriptions, 
            useEffect is your gateway to handling everything that happens "outside" the render cycle.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theory & Explanation */}
          <div className="space-y-8">
            {/* What is useEffect? */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.9s_ease-out]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                  <span className="text-xl">⚡</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  What is useEffect?
                </h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">useEffect</code> is a React Hook that lets you perform <strong>side effects</strong> in function components. 
                  Think of it as your component's way to interact with the "outside world".
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6 rounded-r-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Prototype / Signature</h4>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    {`useEffect(() => {
  // Side effect code here
  
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]); // Dependency array`}
                  </pre>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Purpose & When to Use</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Fetching data from an API (like Swadeep's student records)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Setting up subscriptions (WebSocket, event listeners)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Manually changing the DOM (document.title updates)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Setting timers (setTimeout, setInterval)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Logging analytics or tracking user interactions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Side Effects Visualization */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">🔗</span>
                </span>
                Understanding Side Effects
              </h3>
              
              <div className="relative">
                {/* Component Lifecycle Visualization */}
                <div className="flex flex-col items-center space-y-6">
                  {/* React Component */}
                  <div className="w-full max-w-md p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">R</span>
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white">React Component</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Render Logic</div>
                        <div className="font-mono text-sm">return JSX</div>
                      </div>
                      
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border-l-4 border-yellow-500">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Side Effects (useEffect)</div>
                        <div className="font-mono text-sm">API calls, subscriptions, timers</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrows */}
                  <div className="flex items-center space-x-8">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white">✓</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Mount/Update</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-white">✕</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Unmount</div>
                    </div>
                  </div>
                  
                  {/* External World */}
                  <div className="w-full max-w-md p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">W</span>
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white">External World</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                        <div className="text-sm">🌐 API</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                        <div className="text-sm">📊 Database</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                        <div className="text-sm">⌛ Timer</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                        <div className="text-sm">🔔 Events</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* SVG Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" className="fill-blue-500" />
                    </marker>
                  </defs>
                  <line x1="50%" y1="180" x2="50%" y2="240" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="50%" y1="340" x2="50%" y2="400" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </svg>
              </div>
              
              <p className="mt-6 text-gray-600 dark:text-gray-400 text-sm">
                <strong>Key Insight:</strong> useEffect bridges your pure React component with impure external systems. 
                It runs <em>after</em> the render is committed to the screen.
              </p>
            </section>

            {/* Common Pitfalls */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">⚠️</span>
                </span>
                Common Pitfalls & Beginner Mistakes
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-lg">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-1">1. Infinite Loops</h4>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded-lg mt-2 overflow-x-auto">
                    {`// ❌ DANGER: Creates infinite loop
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1); // Triggers re-render, which triggers useEffect again...
}); // Missing dependency array`}
                  </pre>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Fix:</strong> Add proper dependencies or conditional logic
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 rounded-r-lg">
                  <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">2. Missing Dependencies</h4>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded-lg mt-2 overflow-x-auto">
                    {`const [user, setUser] = useState('Tuhina');

useEffect(() => {
  // ❌ This effect uses 'user' but doesn't declare it as dependency
  document.title = \`Welcome \${user}\`;
}, []); // Empty array - runs only once`}
                  </pre>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Fix:</strong> Add <code className="px-1 bg-gray-200 dark:bg-gray-700 rounded">[user]</code> to dependencies
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded-r-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">3. Forgetting Cleanup</h4>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded-lg mt-2 overflow-x-auto">
                    {`useEffect(() => {
  // ❌ Event listener added but never removed
  window.addEventListener('resize', handleResize);
  
  // Missing cleanup function!
}, []);

// Causes memory leaks when component unmounts`}
                  </pre>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Fix:</strong> Always return cleanup function for subscriptions
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Interactive Examples */}
          <div className="space-y-8">
            {/* Live Examples */}
            <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Live useEffect Examples
              </h3>
              
              {/* Example 1: Counter with useEffect */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">Example 1: Document Title Update</h4>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                    useEffect with dependency
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Watch the browser tab title change as you increment the counter. This useEffect runs whenever <code>counter</code> changes.
                </p>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {counter}
                    </div>
                    <button
                      onClick={incrementCounter}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      Increment Counter
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="p-4 bg-gray-900 text-gray-100 rounded-lg">
                      <div className="text-sm opacity-75">Current Tab Title:</div>
                      <div className="font-mono text-sm mt-1 truncate">
                        Counter: {counter} | React Tutorial
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Check your browser tab ↑
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    useEffect Code:
                  </div>
                  <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                    {`useEffect(() => {
  document.title = \`Counter: \${counter} | React Tutorial\`;
}, [counter]); // ✅ Runs only when counter changes`}
                  </pre>
                </div>
              </div>
              
              {/* Example 2: Window Resize */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">Example 2: Window Size Tracker</h4>
                  <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                    useEffect with cleanup
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Resize your browser window to see the width update. The event listener is cleaned up when component unmounts.
                </p>
                
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {windowWidth}px
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Current window width
                  </div>
                  
                  {/* Visual width indicator */}
                  <div className="mt-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                        style={{ width: `${Math.min(windowWidth / 20, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span>Mobile</span>
                      <span>Tablet</span>
                      <span>Desktop</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    useEffect Code with Cleanup:
                  </div>
                  <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                    {`useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  // 🧹 Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // ✅ Empty array = runs once`}
                  </pre>
                </div>
              </div>
              
              {/* Example 3: Data Fetching */}
              <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">Example 3: API Data Fetching</h4>
                  <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">
                    Conditional useEffect
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Simulating API call to fetch student data. useEffect runs when <code>showDetails</code> becomes true.
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={toggleDetails}
                    className={clsx(
                      "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300",
                      showDetails 
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                    )}
                  >
                    {showDetails ? "Hide Student Details" : "Fetch Student Details"}
                  </button>
                  
                  {loading && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-blue-700 dark:text-blue-300">Fetching data from server...</p>
                    </div>
                  )}
                  
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-400">
                      ⚠️ Error: {error}
                    </div>
                  )}
                  
                  {data && !loading && (
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                      <h5 className="font-bold text-gray-900 dark:text-white mb-3">Student Information:</h5>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Name</div>
                          <div className="font-semibold">{data.name}</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded">
                          <div className="text-xs text-gray-500 dark:text-gray-400">City</div>
                          <div className="font-semibold">{data.city}</div>
                        </div>
                        <div className="col-span-2 p-3 bg-white dark:bg-gray-800 rounded">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Courses</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {data.courses.map((course, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    useEffect for Data Fetching:
                  </div>
                  <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
                    {`useEffect(() => {
  const fetchData = async () => {
    if (!showDetails) return; // ✅ Conditional fetching
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/student');
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, [showDetails]); // ✅ Fetch when showDetails changes`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Dependency Array Guide */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Dependency Array Cheat Sheet
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                      <span className="text-sm">A</span>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">No Dependency Array</h4>
                  </div>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded-lg mt-2">
                    {`useEffect(() => {
  // Runs after EVERY render
});`}
                  </pre>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    <strong>Use Case:</strong> Rarely used. Can cause performance issues.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
                      <span className="text-sm">B</span>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Empty Array []</h4>
                  </div>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded-lg mt-2">
                    {`useEffect(() => {
  // Runs ONCE after initial render
  // Like componentDidMount
  
  return () => {
    // Cleanup - like componentWillUnmount
  };
}, []);`}
                  </pre>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    <strong>Use Case:</strong> Setup code, initial API calls, event listeners.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center mr-3">
                      <span className="text-sm">C</span>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">With Dependencies [dep1, dep2]</h4>
                  </div>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded-lg mt-2">
                    {`useEffect(() => {
  // Runs when dep1 OR dep2 changes
  // Like componentDidUpdate
  
  return () => {
    // Cleanup before next effect runs
  };
}, [dep1, dep2]);`}
                  </pre>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    <strong>Use Case:</strong> Reacting to prop/state changes, form validation, dependent API calls.
                  </p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">💡</span>
                </span>
                Best Practices & Professional Tips
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 dark:text-green-400">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Always Specify Dependencies</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Let the ESLint plugin help you. Missing dependencies cause stale closures.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-1">
                    <span className="text-blue-600 dark:text-blue-400">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Clean Up After Yourself</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Every <code>addEventListener</code>, <code>setInterval</code>, or subscription needs cleanup to prevent memory leaks.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 mt-1">
                    <span className="text-purple-600 dark:text-purple-400">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Separate Concerns</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Use multiple <code>useEffect</code> hooks for different concerns. Don't cram everything into one effect.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-1">
                    <span className="text-red-600 dark:text-red-400">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Avoid Side Effects in Render</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Never put data fetching, subscriptions, or DOM mutations directly in render. Always use useEffect.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Teacher's Note Section */}
        <div className="mt-12 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-lg border-l-4 border-cyan-500 dark:border-cyan-400 animate-[fadeInUp_1.3s_ease-out]">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">SH</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Teacher's Note
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Dear students of Barrackpore, Shyamnagar, and Ichapur,</strong>
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After 27 years of teaching programming, I can tell you that <code>useEffect</code> is where most beginners stumble—but it's also where you transition from a React user to a React thinker.
                </p>
                
                <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg mb-4 border border-cyan-200 dark:border-cyan-700">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
                    Remember This Mental Model:
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">→</span>
                      <span><strong>Render</strong> determines WHAT your UI looks like</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">→</span>
                      <span><strong>useEffect</strong> determines WHAT HAPPENS after render</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">→</span>
                      <span>They're separate phases: Render first, Effects after</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Classroom Tip:</strong> When Abhronila from Naihati asked me about infinite loops, I showed her the browser's developer tools. Watch the console logs carefully—they reveal the render/effect cycle.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Professional Insight:</strong> In production apps, we use useEffect for analytics tracking, WebSocket connections, and coordinating with legacy jQuery code. It's your bridge to the non-React world.
                </p>
                
                <div className="mt-4 pt-4 border-t border-cyan-200 dark:border-cyan-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Sukanta Hui</strong> · 27 years experience · 
                    <a href="mailto:sukantahui@codernaccotax.co.in" className="text-cyan-600 dark:text-cyan-400 hover:underline ml-1">
                      sukantahui@codernaccotax.co.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border border-violet-200 dark:border-violet-700 animate-[fadeInUp_1.4s_ease-out]">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-3">
              <span className="text-violet-600 dark:text-violet-400">?</span>
            </span>
            Hint & Thinking Exercise
          </h4>
          
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Think about this:</strong> If you have a chat application showing messages from Debangshu and Tuhina, 
              when should you set up the WebSocket connection? When should you close it?
            </p>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Observe carefully:</strong> Open your browser's console (F12) and watch the logs as you:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Click the counter button multiple times</li>
                <li>Resize your browser window</li>
                <li>Toggle the student details on/off</li>
              </ol>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Notice the order of execution. Which runs first: render or effect?
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try changing:</strong> In the counter example, what happens if you remove <code>[counter]</code> 
              from the dependency array? What if you change it to an empty array <code>[]</code>?
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeInUp_1.5s_ease-out]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400">✓</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">What You Should Remember</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>useEffect runs after render is committed</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Empty [] = runs once (mount)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>[dep] = runs when dependency changes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Always cleanup subscriptions</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400">!</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Common Use Cases</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Fetching data from APIs</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Setting up event listeners</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Updating document title</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Integrating with non-React code</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <span className="text-red-600 dark:text-red-400">✗</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">What to Avoid</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Infinite loops (missing deps)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Memory leaks (no cleanup)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Stale closures (wrong deps)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Putting side effects in render</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeInUp_0\\.8s_ease-out\\] {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic29;