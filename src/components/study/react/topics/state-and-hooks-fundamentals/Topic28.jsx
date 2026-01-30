import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Topic28 = () => {
  // State for demonstrating useEffect with empty dependency array
  const [mountTime, setMountTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventListeners, setEventListeners] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [cleanupLog, setCleanupLog] = useState([]);
  const [mountCounter, setMountCounter] = useState(0);
  const [isComponentMounted, setIsComponentMounted] = useState(true);
  
  // Refs for tracking
  const hasMountedRef = useRef(false);
  const intervalRef = useRef(null);
  const eventLogRef = useRef([]);
  const apiCallCountRef = useRef(0);
  const componentInstanceId = useRef(`comp-${Date.now()}`);

  // ============ EXAMPLE 1: Basic Empty Dependency Array ============
  useEffect(() => {
    console.log('✅ useEffect with [] - Runs ONCE on mount');
    
    // Record mount time
    const now = new Date();
    setMountTime(now.toLocaleTimeString());
    
    // Increment mount counter
    setMountCounter(prev => {
      const newCount = prev + 1;
      console.log(`Component mounted ${newCount} time(s)`);
      return newCount;
    });
    
    // Mark as mounted
    hasMountedRef.current = true;
    console.log(`Component instance ID: ${componentInstanceId.current}`);
    
    // Cleanup function - will run on unmount
    return () => {
      console.log('🧹 Cleanup: Component unmounting');
      setCleanupLog(prev => [...prev, 'Component unmounted']);
      hasMountedRef.current = false;
    };
  }, []); // Empty dependency array - runs once on mount

  // ============ EXAMPLE 2: Timer Setup (Runs Once) ============
  useEffect(() => {
    console.log('⏰ Timer effect with [] - Setting up interval');
    
    // Set up a timer that runs every second
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    // Cleanup: Clear interval on unmount
    return () => {
      console.log('🧹 Timer cleanup: Clearing interval');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCleanupLog(prev => [...prev, 'Timer cleared']);
    };
  }, []); // Empty array - timer setup happens once

  // ============ EXAMPLE 3: Data Fetching on Mount ============
  useEffect(() => {
    console.log('🌐 Data fetching effect with [] - Fetching data once');
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - imagine fetching from server
        const mockData = {
          id: 1,
          title: 'Component Mount Data',
          description: 'This data was fetched once when the component mounted.',
          fetchCount: ++apiCallCountRef.current,
          timestamp: new Date().toLocaleTimeString(),
          student: 'Swadeep',
          city: 'Barrackpore',
          courses: ['React', 'JavaScript', 'CSS']
        };
        
        setData(mockData);
        console.log('✅ Data fetched successfully');
      } catch (err) {
        setError('Failed to fetch data');
        console.error('❌ Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // No cleanup needed for data fetching (unless using AbortController)
    return () => {
      console.log('🧹 Data fetch cleanup (optional)');
    };
  }, []); // Empty array - fetch data once on mount

  // ============ EXAMPLE 4: Event Listeners Setup ============
  useEffect(() => {
    console.log('🔔 Event listener effect with [] - Setting up listeners');
    
    const handleResize = () => {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      setWindowSize(size);
      
      const event = {
        type: 'resize',
        timestamp: new Date().toLocaleTimeString(),
        size
      };
      eventLogRef.current = [...eventLogRef.current, event].slice(-5);
      setEventListeners(prev => [...prev, event].slice(-5));
    };
    
    const handleKeyPress = (e) => {
      const event = {
        type: 'keypress',
        key: e.key,
        timestamp: new Date().toLocaleTimeString()
      };
      eventLogRef.current = [...eventLogRef.current, event].slice(-5);
      setEventListeners(prev => [...prev, event].slice(-5));
    };
    
    const handleClick = (e) => {
      const event = {
        type: 'click',
        x: e.clientX,
        y: e.clientY,
        timestamp: new Date().toLocaleTimeString()
      };
      eventLogRef.current = [...eventLogRef.current, event].slice(-5);
      setEventListeners(prev => [...prev, event].slice(-5));
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);
    
    // Initial resize
    handleResize();
    
    // Cleanup: Remove all event listeners
    return () => {
      console.log('🧹 Event listener cleanup: Removing all listeners');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
      setCleanupLog(prev => [...prev, 'Event listeners removed']);
    };
  }, []); // Empty array - setup listeners once

  // ============ EXAMPLE 5: WebSocket/Subscription Simulation ============
  useEffect(() => {
    console.log('📡 Subscription effect with [] - Setting up subscription');
    
    // Simulate WebSocket connection or subscription
    const simulateSubscription = () => {
      console.log('🔗 Connected to server');
      setSubscriptionActive(true);
      
      // Simulate receiving messages
      const messageInterval = setInterval(() => {
        const message = {
          id: Date.now(),
          type: 'update',
          data: `Live update at ${new Date().toLocaleTimeString()}`,
          from: 'server'
        };
        
        // In real app, you'd update state with the message
        console.log('📨 Received:', message);
      }, 3000);
      
      return () => {
        clearInterval(messageInterval);
        console.log('🔒 Disconnected from server');
        setSubscriptionActive(false);
      };
    };
    
    const disconnect = simulateSubscription();
    
    // Cleanup: Disconnect subscription
    return () => {
      console.log('🧹 Subscription cleanup: Disconnecting');
      if (disconnect) disconnect();
      setCleanupLog(prev => [...prev, 'Subscription disconnected']);
    };
  }, []); // Empty array - setup subscription once

  // ============ EXAMPLE 6: localStorage Initialization ============
  useEffect(() => {
    console.log('💾 localStorage effect with [] - Initializing');
    
    // Check if we have saved data
    const savedData = localStorage.getItem('react-mount-demo');
    if (savedData) {
      console.log('📁 Found saved data:', savedData);
    } else {
      console.log('📁 No saved data found, initializing...');
      localStorage.setItem('react-mount-demo', JSON.stringify({
        initialized: new Date().toISOString(),
        componentId: componentInstanceId.current,
        visits: 1
      }));
    }
    
    // Cleanup: Not much to clean up for localStorage
    return () => {
      console.log('🧹 localStorage cleanup (optional)');
    };
  }, []); // Empty array - initialize once

  // ============ EXAMPLE 7: Analytics/Logging on Mount ============
  useEffect(() => {
    console.log('📊 Analytics effect with [] - Logging mount');
    
    // Simulate sending analytics
    const analyticsData = {
      event: 'component_mount',
      component: 'Topic28',
      timestamp: new Date().toISOString(),
      userId: 'student_' + Math.floor(Math.random() * 1000),
      location: 'Barrackpore'
    };
    
    console.log('📈 Analytics sent:', analyticsData);
    
    // In real app, you'd send this to your analytics service
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(analyticsData) });
    
    // Cleanup
    return () => {
      console.log('🧹 Analytics cleanup');
    };
  }, []); // Empty array - log mount once

  // Helper functions
  const simulateRemount = () => {
    // This doesn't actually remount, but simulates the behavior
    setIsComponentMounted(false);
    setTimeout(() => {
      setIsComponentMounted(true);
      setCleanupLog(prev => [...prev, 'Component remounted']);
    }, 1000);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  const clearEventLogs = () => {
    setEventListeners([]);
    eventLogRef.current = [];
  };

  const clearCleanupLog = () => {
    setCleanupLog([]);
  };

  const triggerManualCleanup = () => {
    // Simulate cleanup by toggling component
    setIsComponentMounted(prev => !prev);
  };

  // Common use cases for empty dependency array
  const useCases = [
    {
      title: 'Data Fetching',
      description: 'Load initial data from API when component mounts',
      code: `useEffect(() => {\n  fetchData();\n}, []);`,
      icon: '🌐'
    },
    {
      title: 'Event Listeners',
      description: 'Setup window/document event listeners once',
      code: `useEffect(() => {\n  window.addEventListener(...);\n  return () => window.removeEventListener(...);\n}, []);`,
      icon: '🔔'
    },
    {
      title: 'Timers/Intervals',
      description: 'Start timers or intervals that should run indefinitely',
      code: `useEffect(() => {\n  const id = setInterval(...);\n  return () => clearInterval(id);\n}, []);`,
      icon: '⏰'
    },
    {
      title: 'Subscriptions',
      description: 'Connect to WebSocket or external data streams',
      code: `useEffect(() => {\n  const sub = subscribe(...);\n  return () => unsubscribe(sub);\n}, []);`,
      icon: '📡'
    },
    {
      title: 'Analytics',
      description: 'Log page views or component mounts',
      code: `useEffect(() => {\n  logAnalytics('mount');\n}, []);`,
      icon: '📊'
    },
    {
      title: 'Initialization',
      description: 'Initialize third-party libraries or setup',
      code: `useEffect(() => {\n  library.init(config);\n}, []);`,
      icon: '⚡'
    }
  ];

  // Common mistakes with empty dependency array
  const commonMistakes = [
    {
      mistake: 'Forgetting cleanup',
      problem: 'Memory leaks from abandoned subscriptions/timers',
      solution: 'Always return cleanup function',
      code: `// ❌ Missing cleanup\nuseEffect(() => {\n  setInterval(() => {}, 1000);\n}, []);\n\n// ✅ With cleanup\nuseEffect(() => {\n  const id = setInterval(() => {}, 1000);\n  return () => clearInterval(id);\n}, []);`
    },
    {
      mistake: 'Assuming it runs on every update',
      problem: 'Effect doesn\'t re-run when props/state change',
      solution: 'Use dependencies if effect should re-run',
      code: `// ❌ Won't update when prop changes\nuseEffect(() => {\n  console.log(props.value); // Only logs initial value\n}, []);\n\n// ✅ Updates when prop changes\nuseEffect(() => {\n  console.log(props.value); // Logs current value\n}, [props.value]);`
    },
    {
      mistake: 'Stale closures',
      problem: 'Effect captures initial values, not current ones',
      solution: 'Use refs or include dependencies',
      code: `// ❌ Captures initial count\nuseEffect(() => {\n  setTimeout(() => {\n    console.log(count); // Always logs 0\n  }, 3000);\n}, []);\n\n// ✅ Use ref for current value\nconst countRef = useRef(count);\nuseEffect(() => {\n  countRef.current = count;\n});\n\nuseEffect(() => {\n  setTimeout(() => {\n    console.log(countRef.current); // Logs current\n  }, 3000);\n}, []);`
    },
    {
      mistake: 'Multiple setup calls',
      problem: 'Effect runs twice in StrictMode (development)',
      solution: 'Make setup idempotent or use ref to track',
      code: `// ❌ May run setup twice in dev\nuseEffect(() => {\n  initializeLibrary(); // Could be called twice\n}, []);\n\n// ✅ Check if already initialized\nconst initialized = useRef(false);\nuseEffect(() => {\n  if (initialized.current) return;\n  initializeLibrary();\n  initialized.current = true;\n}, []);`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
              Topic 29/46
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            useEffect with Empty Dependency Array
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Master the art of one-time setup effects—learn when and how to use the empty dependency array 
            for data fetching, subscriptions, timers, and other mount-only operations.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theory & Explanation */}
          <div className="space-y-8">
            {/* What is Empty Dependency Array? */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.9s_ease-out]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  What Does [] Mean?
                </h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  An <strong>empty dependency array</strong> (<code>[]</code>) tells React that your effect 
                  <strong> doesn't depend on any values</strong> from props or state, so it only needs to run 
                  once—after the initial render (mount).
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-xl my-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">🎯 Core Principle</h4>
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 italic text-gray-700 dark:text-gray-300">
                    "The empty array [] is React's way of saying: 'Run this effect once when the component mounts, 
                    and clean it up when the component unmounts.'"
                  </blockquote>
                </div>
                
                {/* Mount Lifecycle Visualization */}
                <div className="my-8">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Component Mount Lifecycle
                  </h4>
                  
                  <div className="relative">
                    <div className="flex flex-col items-center space-y-6">
                      {/* Initial Render */}
                      <div className="w-full max-w-md p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-gray-300 dark:border-gray-700">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm">1</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">Initial Render</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Component function executes</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white">↓</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">DOM updates</div>
                      </div>
                      
                      {/* useEffect with [] */}
                      <div className="w-full max-w-md p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-500 dark:border-green-400">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm">2</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">useEffect with [] runs</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">One-time setup operations</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white">↓</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Component is now mounted</div>
                      </div>
                      
                      {/* Mounted State */}
                      <div className="w-full max-w-md p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm">3</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">Component Active</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Ready for user interaction</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* SVG Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                        </marker>
                      </defs>
                      <line x1="50%" y1="80" x2="50%" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-green)" />
                      <line x1="50%" y1="200" x2="50%" y2="260" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-green)" />
                      <line x1="50%" y1="320" x2="50%" y2="380" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-green)" />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Analogy from Barrackpore Classroom</h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300">
                      Think of Tuhina setting up her classroom at the beginning of the day:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><strong>Mount:</strong> Arrive, unlock door, turn on lights (once)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>During class:</strong> Teach, answer questions (updates)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span><strong>Unmount:</strong> Turn off lights, lock door (cleanup)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Use Cases */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">📚</span>
                </span>
                Common Use Cases for []
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {useCases.map((useCase, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300"
                  >
                    <div className="flex items-center mb-3">
                      <div className="text-2xl mr-3">{useCase.icon}</div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {useCase.title}
                      </h4>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {useCase.description}
                    </p>
                    
                    <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                      {useCase.code}
                    </pre>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">When to Use []</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ask yourself: <strong>"Does this effect need to run only once when the component first appears, 
                  or does it need to re-run when certain values change?"</strong> If once, use [].
                </p>
              </div>
            </section>

            {/* Common Mistakes & Pitfalls */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">⚠️</span>
                </span>
                Common Mistakes & Pitfalls
              </h3>
              
              <div className="space-y-4">
                {commonMistakes.map((mistake, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-700"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-1">
                        <span className="text-red-600 dark:text-red-400">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-700 dark:text-red-400 mb-1">
                          {mistake.mistake}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <strong>Problem:</strong> {mistake.problem}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                          <strong>Solution:</strong> {mistake.solution}
                        </p>
                        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                          {mistake.code}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Interactive Examples */}
          <div className="space-y-8">
            {/* Live Empty Array Dashboard */}
            <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Live Empty [] Dashboard
              </h3>
              
              {/* Mount Status */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {mountCounter}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Mount Count</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {timer}s
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Timer (from [])</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {subscriptionActive ? '🟢' : '🔴'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {subscriptionActive ? 'Subscribed' : 'Disconnected'}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {windowSize.width}×{windowSize.height}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Window Size</div>
                  </div>
                </div>
              </div>
              
              {/* Control Panel */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Control Panel</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={simulateRemount}
                    className="py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Simulate Re-mount
                  </button>
                  
                  <button
                    onClick={resetTimer}
                    className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Reset Timer
                  </button>
                  
                  <button
                    onClick={clearEventLogs}
                    className="py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Clear Event Logs
                  </button>
                  
                  <button
                    onClick={clearCleanupLog}
                    className="py-3 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Clear Cleanup Log
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Component Status: <span className={isComponentMounted ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {isComponentMounted ? 'Mounted' : 'Unmounted'}
                    </span>
                  </div>
                  {mountTime && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Mounted at: <span className="font-mono">{mountTime}</span>
                    </div>
                  )}
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Component ID: <span className="font-mono text-xs">{componentInstanceId.current}</span>
                  </div>
                </div>
              </div>
              
              {/* Data Fetching Example */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">🌐 Data Fetching (on mount)</h4>
                
                {loading ? (
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-blue-700 dark:text-blue-300">Fetching data on mount...</p>
                  </div>
                ) : error ? (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-400">
                    ⚠️ Error: {error}
                  </div>
                ) : data && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <h5 className="font-bold text-gray-900 dark:text-white mb-3">Fetched Data:</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Title:</span>
                        <span className="font-semibold">{data.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Student:</span>
                        <span className="font-semibold">{data.student} ({data.city})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Fetched at:</span>
                        <span className="font-semibold">{data.timestamp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Fetch count:</span>
                        <span className="font-semibold">{data.fetchCount}</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-600 dark:text-gray-400">Courses:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {data.courses.map((course, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                      This data was fetched once when the component mounted (empty []).
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Event Listeners Log */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                🔔 Event Listeners (Setup Once)
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Active Event Listeners</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    These were set up once on mount (empty []). Try interacting with the page:
                  </p>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                      <div className="text-2xl mb-2">🖱️</div>
                      <div className="text-sm">Click anywhere</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                      <div className="text-2xl mb-2">⌨️</div>
                      <div className="text-sm">Press any key</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="text-sm">Resize window</div>
                    </div>
                  </div>
                </div>
                
                {/* Event Log */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Events</h4>
                  <div className="h-40 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    {eventListeners.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                        Events will appear here as you interact
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {[...eventListeners].reverse().map((event, index) => (
                          <div 
                            key={index}
                            className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span className={clsx(
                                  "px-2 py-1 rounded text-xs font-semibold mr-2",
                                  event.type === 'click' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                                  event.type === 'keypress' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                                  event.type === 'resize' && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                )}>
                                  {event.type}
                                </span>
                                {event.type === 'click' && (
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    ({event.x}, {event.y})
                                  </span>
                                )}
                                {event.type === 'keypress' && (
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    Key: {event.key}
                                  </span>
                                )}
                                {event.type === 'resize' && (
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {event.size.width}×{event.size.height}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {event.timestamp}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Cleanup Log Section */}
            <section className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                🧹 Cleanup Functions (on unmount)
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Cleanup Sequence</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                        <span className="text-red-600 dark:text-red-400">1</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Component unmounts</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">User navigates away, component removed</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                        <span className="text-orange-600 dark:text-orange-400">2</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">React calls cleanup functions</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">All useEffect cleanup functions run</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                        <span className="text-green-600 dark:text-green-400">3</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Resources freed</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Timers cleared, listeners removed</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Cleanup Log */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Cleanup Log</h4>
                  
                  <div className="h-32 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                    {cleanupLog.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                        Cleanup events will appear here
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {[...cleanupLog].reverse().map((log, index) => (
                          <div 
                            key={index}
                            className="p-2 bg-red-50 dark:bg-red-900/10 rounded text-sm text-red-700 dark:text-red-400"
                          >
                            🧹 {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Cleanup runs when component unmounts or when you simulate re-mount.
                  </div>
                </div>
                
                <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-xl">
                  <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                    Why Cleanup Matters
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Without cleanup, you'll have <strong>memory leaks</strong>: abandoned intervals keep running, 
                    event listeners accumulate, and subscriptions never close. Always clean up what you set up.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Teacher's Note Section */}
        <div className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-6 shadow-lg border-l-4 border-cyan-500 dark:border-cyan-400 animate-[fadeInUp_1.3s_ease-out]">
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
                  <strong>Dear students from Shyamnagar, Ichapur, and Naihati,</strong>
                </p>
                
                <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg mb-4 border border-cyan-200 dark:border-cyan-700">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
                    The Mount Mindset:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    When Abhronila from Barrackpore asked why her app was slow, we discovered she was 
                    setting up the same WebSocket connection on every render. The fix? Move it to 
                    <code>useEffect</code> with <code>[]</code>.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Remember: <strong>[] = "Do this once when you arrive, clean up when you leave"</strong>
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After 27 years of building applications, I can tell you that proper mount/unmount 
                  handling is what separates amateur code from professional code. The student from 
                  Ichapur who fixed their app's memory leak? They learned to always return cleanup 
                  functions.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Professional Insight:</strong> In production applications, we follow these rules:
                </p>
                
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">1.</span>
                    <span><strong>Always use [] for setup/teardown</strong> - subscriptions, listeners, timers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">2.</span>
                    <span><strong>Always return cleanup function</strong> - prevent memory leaks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">3.</span>
                    <span><strong>Make setup idempotent</strong> - safe to call multiple times (React.StrictMode)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-500 mr-2">4.</span>
                    <span><strong>Test unmount behavior</strong> - ensure cleanup works</span>
                  </li>
                </ul>
                
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
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700 animate-[fadeInUp_1.4s_ease-out]">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
              <span className="text-green-600 dark:text-green-400">🔍</span>
            </span>
            Observation Exercise
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Watch the Console</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Open your browser's console (F12 → Console tab) and perform these steps:
              </p>
              
              <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-1 text-xs">1</span>
                  <span>Reload the page - watch all the "Runs ONCE on mount" logs</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-1 text-xs">2</span>
                  <span>Click "Simulate Re-mount" - watch cleanup then mount logs</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-1 text-xs">3</span>
                  <span>Notice timer keeps running - it was set up once with []</span>
                </li>
              </ol>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Critical Question:</strong> What happens to the timer when you click "Simulate Re-mount"?
                Does it:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>• Keep running with the same interval?</li>
                <li>• Stop and restart?</li>
                <li>• Create a duplicate timer?</li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Check the cleanup log to see what happened.
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try this:</strong> Resize your browser window. Notice the event listener (set up once with []) 
              catches it. Now click "Simulate Re-mount" and resize again. What happens?
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeInUp_1.5s_ease-out]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400">✅</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">When to Use []</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Data fetching on mount</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Event listener setup</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Timer/interval setup</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Subscription connections</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400">🧹</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Cleanup Essentials</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Always return cleanup function</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Clear intervals/timers</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Remove event listeners</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Close subscriptions</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <span className="text-red-600 dark:text-red-400">⚠️</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Common Mistakes</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Forgetting cleanup (memory leaks)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Using [] when need updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Stale closures in callbacks</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Non-idempotent setup</span>
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

export default Topic28;