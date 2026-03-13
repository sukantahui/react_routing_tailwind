import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic36 = () => {
  const [showComponent, setShowComponent] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counter, setCounter] = useState(0);
  const [resourceData, setResourceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Example 1: Cleanup for event listeners
  useEffect(() => {
    console.log('🟢 Effect: Setting up mouse move listener');
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup function - runs when component unmounts or before re-running effect
    return () => {
      console.log('🔴 Cleanup: Removing mouse move listener');
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Example 2: Cleanup for timers/intervals
  useEffect(() => {
    console.log('🟢 Effect: Setting up interval timer');
    
    const intervalId = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);
    
    // Cleanup function for timer
    return () => {
      console.log('🔴 Cleanup: Clearing interval timer');
      clearInterval(intervalId);
    };
  }, []);

  // Example 3: Cleanup for fetch requests (abort controller)
  useEffect(() => {
    console.log('🟢 Effect: Starting data fetch');
    let isMounted = true;
    const abortController = new AbortController();
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (isMounted) {
          setResourceData({ id: 1, name: 'Sample Resource' });
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Fetch error:', error);
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Cleanup function for async operations
    return () => {
      console.log('🔴 Cleanup: Aborting fetch and marking unmounted');
      isMounted = false;
      abortController.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div 
          className="mb-8 animate-[fadeIn_0.8s_ease-out]"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Cleanup Functions in <span className="text-blue-600 dark:text-blue-400">useEffect</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Preventing memory leaks and managing side effects properly in React components
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Theory */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">🧹</span>
              What Are Cleanup Functions?
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Cleanup functions are functions returned from <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useEffect</code> that run when a component unmounts or before the effect runs again.
              </p>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-4">
                <strong className="block mb-2 text-yellow-800 dark:text-yellow-300">Purpose:</strong>
                <p>To clean up resources, cancel subscriptions, or invalidate asynchronous operations to prevent memory leaks and unexpected behavior.</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-4">
                <strong className="block mb-2 text-green-800 dark:text-green-300">Signature:</strong>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto">
{`useEffect(() => {
  // Setup code here
  
  return () => {
    // Cleanup code here
  };
}, [dependencies]);`}
                </pre>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Diagram */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out_0.2s]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">📊</span>
              useEffect Lifecycle with Cleanup
            </h2>
            
            <div className="relative h-64">
              {/* Lifecycle Diagram */}
              <svg width="100%" height="100%" viewBox="0 0 600 240" className="overflow-visible">
                {/* Component Mount */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="50" y="40" width="120" height="60" rx="8" 
                    fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="2" />
                  <text x="110" y="75" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                    Component Mounts
                  </text>
                  <text x="110" y="95" textAnchor="middle" className="text-xs fill-blue-600">
                    useEffect runs
                  </text>
                </g>
                
                {/* Arrow */}
                <path d="M 175 70 L 225 70" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5" />
                <polygon points="225,70 215,65 215,75" fill="#9CA3AF" />
                
                {/* Effect Setup */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="250" y="40" width="120" height="60" rx="8" 
                    fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2" />
                  <text x="310" y="75" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                    Effect Setup
                  </text>
                  <text x="310" y="95" textAnchor="middle" className="text-xs fill-green-600">
                    Setup resources
                  </text>
                </g>
                
                {/* Arrow */}
                <path d="M 375 70 L 425 70" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5" />
                <polygon points="425,70 415,65 415,75" fill="#9CA3AF" />
                
                {/* Cleanup Function */}
                <g className="hover:scale-105 transition-transform duration-300">
                  <rect x="450" y="40" width="120" height="60" rx="8" 
                    fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="2" />
                  <text x="510" y="75" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                    Return Cleanup
                  </text>
                  <text x="510" y="95" textAnchor="middle" className="text-xs fill-yellow-600">
                    Function to cleanup
                  </text>
                </g>
                
                {/* Dependencies Change Path */}
                <g>
                  <path d="M 310 110 L 310 160 L 110 160 L 110 130" 
                    stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                  <text x="200" y="180" textAnchor="middle" className="text-xs fill-red-500 font-medium">
                    Dependencies Change
                  </text>
                  <text x="200" y="195" textAnchor="middle" className="text-xs fill-red-500">
                    (Cleanup → New Effect)
                  </text>
                </g>
                
                {/* Unmount Path */}
                <g>
                  <path d="M 510 110 L 510 200 L 50 200" 
                    stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                  <text x="280" y="220" textAnchor="middle" className="text-xs fill-purple-500 font-medium">
                    Component Unmounts
                  </text>
                  <text x="280" y="235" textAnchor="middle" className="text-xs fill-purple-500">
                    (Cleanup runs)
                  </text>
                </g>
              </svg>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-blue-600 dark:text-blue-300 font-bold">When Cleanup Runs:</div>
                <ol className="text-sm text-left mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>1. Before re-running effect</li>
                  <li>2. When component unmounts</li>
                </ol>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-red-600 dark:text-red-300 font-bold">Without Cleanup:</div>
                <div className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                  Memory leaks, zombie listeners, errors
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Examples Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.4s]">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">🎮</span>
            Interactive Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1: Event Listener Cleanup */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Event Listener Cleanup
                </h3>
              </div>
              
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-gray-700 dark:text-gray-300 mb-2">
                  Move your mouse around to see coordinates:
                </div>
                <div className="text-center py-3 bg-gray-100 dark:bg-gray-600 rounded">
                  <div className="text-2xl font-mono text-blue-600 dark:text-blue-300">
                    X: {mousePosition.x} | Y: {mousePosition.y}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-100 overflow-x-auto">
{`useEffect(() => {
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  return () => {
    // Cleanup: Remove listener when component unmounts
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);`}
                </pre>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-400 p-3">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <strong>Without cleanup:</strong> The event listener would stay attached even after component unmounts, causing memory leaks and potential errors.
                </p>
              </div>
            </div>

            {/* Example 2: Timer Cleanup */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Timer/Interval Cleanup
                </h3>
              </div>
              
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-gray-700 dark:text-gray-300 mb-2">
                  Auto-incrementing counter (every second):
                </div>
                <div className="text-center py-3 bg-gray-100 dark:bg-gray-600 rounded">
                  <div className="text-4xl font-mono text-green-600 dark:text-green-300">
                    {counter}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-100 overflow-x-auto">
{`useEffect(() => {
  const intervalId = setInterval(() => {
    setCounter(prev => prev + 1);
  }, 1000);
  
  return () => {
    // Cleanup: Clear interval when component unmounts
    clearInterval(intervalId);
  };
}, []);`}
                </pre>
              </div>
              
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowComponent(!showComponent)}
                  className={clsx(
                    "px-6 py-3 rounded-lg font-medium transition-all duration-300",
                    showComponent 
                      ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                      : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
                  )}
                >
                  {showComponent ? "Unmount Component" : "Mount Component"}
                </button>
              </div>
              
              {!showComponent && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                  <p className="text-gray-700 dark:text-gray-300">
                    Component unmounted. Timer has been cleaned up!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Common Scenarios Needing Cleanup */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.6s]">
            <span className="bg-red-100 dark:bg-red-900 p-3 rounded-xl mr-4">⚠️</span>
            Common Scenarios Requiring Cleanup
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border-l-4 border-blue-500">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">📡</div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">WebSocket Connections</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Close WebSocket connections to prevent hanging connections and memory leaks.
              </p>
              <div className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code className="text-blue-600 dark:text-blue-400">ws.close()</code> in cleanup
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border-l-4 border-green-500">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🔍</div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Observables/Subscriptions</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Unsubscribe from RxJS observables or similar subscription patterns.
              </p>
              <div className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code className="text-green-600 dark:text-green-400">subscription.unsubscribe()</code>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border-l-4 border-purple-500">
              <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">🔄</div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Async Operations</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Cancel fetch requests or mark async operations as invalid using flags.
              </p>
              <div className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <code className="text-purple-600 dark:text-purple-400">isMounted = false</code> pattern
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls Section */}
        <div className="mb-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_0.8s]">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
            <span className="bg-red-100 dark:bg-red-900 p-3 rounded-xl mr-4">🚫</span>
            Common Pitfalls & Mistakes
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">1. Forgetting Cleanup for Event Listeners</h4>
              <p className="text-gray-700 dark:text-gray-300">
                When Debangshu adds a scroll listener but forgets to remove it, the listener continues working even after navigating away, causing performance issues.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">2. Not Cleaning Up Intervals/Timers</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Swadeep creates a timer that updates UI every second. Without cleanup, the timer keeps running after component unmounts, trying to update a non-existent state.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">3. Setting State After Unmount</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Abhronila starts an async fetch operation. If component unmounts before completion and she doesn't check <code>isMounted</code>, React will throw a memory leak warning.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">4. Cleanup Function with Dependencies</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Cleanup function has access to props and state from when it was created (closure). If you need latest values, use refs or dependency arrays carefully.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_1s]">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">✅</span>
            Best Practices & Professional Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Cleanup Checklist:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Always return cleanup function from useEffect
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Cleanup mirrors setup (remove what you added)
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Use AbortController for fetch requests
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">✓</span>
                  Keep cleanup functions idempotent (safe to call multiple times)
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Memory Leak Prevention:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">ℹ️</span>
                  Use Chrome DevTools Memory tab to detect leaks
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">ℹ️</span>
                  Test component mount/unmount cycles
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">ℹ️</span>
                  Use React StrictMode for double-effect checking
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">ℹ️</span>
                  Log cleanup functions during development
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
                  <strong>Cleanup functions are like the school janitor of React components!</strong> Just like how after a school event in Barrackpore, the janitor cleans up all the decorations, chairs, and sound equipment, React cleanup functions ensure no resources are left behind.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Think of it this way: When Tuhina opens a library book (mounts component), she should return it when she's done (cleanup). If she doesn't, the book stays checked out forever (memory leak).
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Remember:</strong> Every time you add something (event listener, timer, subscription), always think about how to remove it. This habit will prevent countless bugs in production applications.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Professional Insight:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    In 27 years of development, I've seen more applications fail from memory leaks than from logic errors. Cleanup is not optional—it's essential.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-green-600 dark:text-green-400 mb-1">Debugging Tip:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Add console logs to your cleanup functions during development. Seeing "Cleanup ran" confirms your component is managing resources properly.
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
              <strong>Observe carefully:</strong> Check your browser's console while interacting with the examples above. Notice when cleanup logs appear and think about why they run at those specific moments.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try changing this:</strong> What happens if you remove the cleanup function from the mouse movement example? Try it and see if you can detect the memory leak.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Think about:</strong> How would you handle cleanup for a chat application component that connects to multiple WebSocket channels? What resources need cleaning up?
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">📋 Cleanup Functions Checklist</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">1️⃣</div>
              <h4 className="font-bold mb-2">When to Use</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Event listeners</li>
                <li>Timers/intervals</li>
                <li>Subscriptions</li>
                <li>API requests</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">2️⃣</div>
              <h4 className="font-bold mb-2">How to Implement</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Return function from useEffect</li>
                <li>Mirror setup operations</li>
                <li>Use AbortController</li>
                <li>Check isMounted flag</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">3️⃣</div>
              <h4 className="font-bold mb-2">Testing</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Mount/unmount cycles</li>
                <li>Check console warnings</li>
                <li>Memory profiling</li>
                <li>Network tab inspection</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              <strong>Remember:</strong> If you set it up, you must clean it up!
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
          .group-hover\\:rotate-12 {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic36;