import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic33 = () => {
  const [activeExample, setActiveExample] = useState(1);
  const [pageLoadTime, setPageLoadTime] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [logMessages, setLogMessages] = useState([
    { id: 1, type: 'info', message: 'Component mounted', time: new Date().toLocaleTimeString(), effect: 'initial' }
  ]);
  const [animationState, setAnimationState] = useState('idle');
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [localStorageData, setLocalStorageData] = useState('');
  const [theme, setTheme] = useState('light');
  const [visitCount, setVisitCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const examples = [
    { 
      id: 1, 
      title: "Page Analytics", 
      icon: "📊", 
      color: "blue",
      description: "Track page load time and first visit"
    },
    { 
      id: 2, 
      title: "One-time API Call", 
      icon: "🌐", 
      color: "green",
      description: "Fetch data once on component mount"
    },
    { 
      id: 3, 
      title: "Event Listeners", 
      icon: "🎧", 
      color: "purple",
      description: "Add listeners once, remove on unmount"
    },
    { 
      id: 4, 
      title: "Local Storage", 
      icon: "💾", 
      color: "indigo",
      description: "Read persisted data on mount"
    },
    { 
      id: 5, 
      title: "Third-party Integration", 
      icon: "🔌", 
      color: "yellow",
      description: "Initialize external libraries once"
    },
    { 
      id: 6, 
      title: "Cleanup Pattern", 
      icon: "🧹", 
      color: "red",
      description: "Setup and cleanup resources"
    },
  ];

  // Simulate page load time measurement (Example 1)
  useEffect(() => {
    const loadStart = performance.now();
    
    // Simulate page loading
    const timer = setTimeout(() => {
      const loadEnd = performance.now();
      const loadTime = (loadEnd - loadStart).toFixed(2);
      setPageLoadTime(loadTime);
      
      // Track visit count
      const visits = localStorage.getItem('pageVisits') || 0;
      const newVisits = parseInt(visits) + 1;
      localStorage.setItem('pageVisits', newVisits.toString());
      setVisitCount(newVisits);
      
      addLog(`Page loaded in ${loadTime}ms`, 'mount');
      
      // Show welcome animation for first visit
      if (newVisits === 1) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      addLog('Page load timer cleaned up', 'cleanup');
    };
  }, []); // Empty dependency array - runs once on mount

  // Example 2: One-time API call
  useEffect(() => {
    const fetchData = async () => {
      if (activeExample === 2) {
        setLoading(true);
        setError(null);
        addLog('API fetch started', 'api');
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          setApiData({
            id: 101,
            name: "Swadeep",
            location: "Barrackpore",
            enrollmentDate: "2023-08-15",
            courses: ["React", "JavaScript", "Node.js"],
            progress: 85
          });
          addLog('API data fetched successfully', 'api');
        } catch (err) {
          setError("Failed to fetch user data");
          addLog('API fetch failed', 'error');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [activeExample]); // Note: This runs when activeExample changes

  // Example 3: Event listeners (mounted once)
  useEffect(() => {
    if (activeExample === 3) {
      const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        if (position % 100 === 0) {
          addLog(`Scrolled to ${position}px`, 'event');
        }
      };
      
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('mousemove', handleMouseMove);
      addLog('Event listeners added', 'mount');
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
        addLog('Event listeners removed', 'cleanup');
      };
    }
  }, [activeExample]); // Re-run when example changes

  // Example 4: Local Storage (runs once)
  useEffect(() => {
    if (activeExample === 4) {
      const savedData = localStorage.getItem('userPreferences');
      if (savedData) {
        setLocalStorageData(savedData);
        addLog('Read from localStorage', 'storage');
      } else {
        setLocalStorageData('No saved preferences found');
        addLog('No localStorage data found', 'info');
      }
    }
  }, [activeExample]);

  // Example 5: Window size (runs once, updates via event)
  useEffect(() => {
    if (activeExample === 5) {
      const updateSize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      
      // Initial measurement
      updateSize();
      addLog('Window size measured', 'mount');
      
      // Setup resize listener for updates (different from empty deps)
      const handleResize = () => {
        updateSize();
        addLog('Window resized', 'event');
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        addLog('Resize listener removed', 'cleanup');
      };
    }
  }, [activeExample]);

  // Example 6: Subscription pattern
  useEffect(() => {
    if (activeExample === 6 && subscriptionActive) {
      let subscriptionInterval;
      
      const startSubscription = () => {
        addLog('Subscription started', 'subscription');
        subscriptionInterval = setInterval(() => {
          addLog('Subscription update received', 'subscription');
        }, 2000);
      };
      
      startSubscription();
      
      return () => {
        if (subscriptionInterval) {
          clearInterval(subscriptionInterval);
          addLog('Subscription cleaned up', 'cleanup');
        }
      };
    }
  }, [activeExample, subscriptionActive]);

  // Animation effect (runs once on mount)
  useEffect(() => {
    setAnimationState('entering');
    const timer = setTimeout(() => {
      setAnimationState('entered');
      addLog('Entrance animation completed', 'animation');
    }, 500);
    
    return () => {
      clearTimeout(timer);
      setAnimationState('exiting');
    };
  }, []);

  const addLog = (message, type) => {
    const newLog = {
      id: Date.now(),
      type,
      message,
      time: new Date().toLocaleTimeString(),
      effect: 'mount'
    };
    
    setLogMessages(prev => [newLog, ...prev.slice(0, 7)]);
  };

  const handleSavePreferences = () => {
    const preferences = JSON.stringify({
      theme: 'dark',
      fontSize: 'medium',
      notifications: true,
      lastUpdated: new Date().toISOString()
    });
    
    localStorage.setItem('userPreferences', preferences);
    setLocalStorageData(preferences);
    addLog('Preferences saved to localStorage', 'storage');
  };

  const handleClearPreferences = () => {
    localStorage.removeItem('userPreferences');
    setLocalStorageData('No saved preferences found');
    addLog('Preferences cleared', 'storage');
  };

  const toggleSubscription = () => {
    setSubscriptionActive(prev => !prev);
    addLog(subscriptionActive ? 'Subscription stopped' : 'Subscription started', 'action');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    addLog(`Theme changed to ${theme === 'light' ? 'dark' : 'light'}`, 'action');
  };

  const clearLogs = () => {
    setLogMessages([{
      id: Date.now(),
      type: 'info',
      message: 'Logs cleared',
      time: new Date().toLocaleTimeString(),
      effect: 'mount'
    }]);
  };

  const resetExample = () => {
    setApiData(null);
    setLoading(false);
    setError(null);
    setPageLoadTime(null);
    setVisitCount(0);
    setSubscriptionActive(false);
    addLog('Example reset', 'action');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
            <span className="text-xl">[]</span>
            <h1 className="text-2xl md:text-4xl font-bold">
              useEffect with Empty Dependency Array
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn how to run side effects exactly once when a component mounts
          </p>
        </header>

        {/* Main Concept */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.2s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">🎯</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      What Does [] Mean?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      An empty dependency array tells React: "Run this effect once when the component mounts, 
                      and clean it up when the component unmounts."
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Execution Pattern</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-medium text-blue-700 dark:text-blue-400">Component Mounts</p>
                          <p className="text-sm text-blue-600 dark:text-blue-500">useEffect with [] runs once</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-green-400">Component Updates</p>
                          <p className="text-sm text-green-600 dark:text-green-500">Effect does NOT run again</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-400 font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-medium text-red-700 dark:text-red-400">Component Unmounts</p>
                          <p className="text-sm text-red-600 dark:text-red-500">Cleanup function runs</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">Simple Analogy</h3>
                    <p className="text-green-700 dark:text-green-400">
                      Imagine <span className="font-semibold">Tuhina</span> setting up her study desk in Shyamnagar:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-green-600 dark:text-green-400">
                      <li>• <span className="font-semibold">Mount:</span> Arrange books, turn on lamp (setup)</li>
                      <li>• <span className="font-semibold">Study session:</span> Use the setup (no re-setup needed)</li>
                      <li>• <span className="font-semibold">Unmount:</span> Turn off lamp, pack books (cleanup)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4">Code Comparison</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Without [] (Runs on every render)</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-red-400 font-mono">
{`useEffect(() => {
  console.log('Runs on EVERY render');
  // ❌ Might cause infinite loops
});`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">With [] (Runs once on mount)</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-green-400 font-mono">
{`useEffect(() => {
  console.log('Runs ONCE on mount');
  // ✅ Perfect for setup code
  return () => {
    console.log('Cleanup on unmount');
  };
}, []); // ← Empty dependency array`}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">With dependencies (Runs when deps change)</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-yellow-400 font-mono">
{`useEffect(() => {
  console.log('Runs when count changes');
}, [count]); // ← Dependency array`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Key Insight</h3>
                  <p className="text-purple-700 dark:text-purple-400 text-sm">
                    The empty array <code>[]</code> is React's way of saying "I have no dependencies, 
                    so I don't need to re-run when anything changes. Just run me once at the beginning."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Selector */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.4s]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Practical Examples</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {examples.map((example, index) => (
              <button
                key={example.id}
                onClick={() => setActiveExample(example.id)}
                className={clsx(
                  "p-4 rounded-xl border transition-all duration-300 transform hover:scale-[1.02]",
                  activeExample === example.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-transparent"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{example.icon}</span>
                  <span className="font-medium text-sm text-center">{example.title}</span>
                  <span className="text-xs opacity-80 text-center">{example.description}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.6s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 md:p-8">
              {/* Example 1: Page Analytics */}
              {activeExample === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-blue-500 mr-2">📊</span> Page Analytics & Initialization
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                      Runs Once on Mount
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Page Performance Metrics</h4>
                        
                        <div className="space-y-6">
                          {/* Load Time */}
                          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="font-medium text-gray-700 dark:text-gray-300">Page Load Time</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Measured on component mount</p>
                              </div>
                              <div className="text-right">
                                {pageLoadTime ? (
                                  <>
                                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{pageLoadTime}ms</p>
                                    <p className={clsx(
                                      "text-sm font-medium",
                                      parseFloat(pageLoadTime) < 1000 ? "text-green-600 dark:text-green-400" :
                                      parseFloat(pageLoadTime) < 2000 ? "text-yellow-600 dark:text-yellow-400" :
                                      "text-red-600 dark:text-red-400"
                                    )}>
                                      {parseFloat(pageLoadTime) < 1000 ? "Fast" : 
                                       parseFloat(pageLoadTime) < 2000 ? "Average" : "Slow"}
                                    </p>
                                  </>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                    <span className="text-blue-600 dark:text-blue-400">Measuring...</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={clsx(
                                  "h-full transition-all duration-1000",
                                  pageLoadTime 
                                    ? parseFloat(pageLoadTime) < 1000 ? "bg-green-500" :
                                      parseFloat(pageLoadTime) < 2000 ? "bg-yellow-500" : "bg-red-500"
                                    : "bg-blue-500"
                                )}
                                style={{ 
                                  width: pageLoadTime 
                                    ? `${Math.min(parseFloat(pageLoadTime) / 20, 100)}%`
                                    : '0%'
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Visit Counter */}
                          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="font-medium text-gray-700 dark:text-gray-300">Visit Counter</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Persisted across sessions</p>
                              </div>
                              <div className="text-right">
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{visitCount}</p>
                                <p className="text-sm text-purple-600 dark:text-purple-500">
                                  {visitCount === 1 ? "First visit! 🎉" : `Return visit #${visitCount}`}
                                </p>
                              </div>
                            </div>
                            {showConfetti && (
                              <div className="text-center py-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full">
                                  <span>🎉</span>
                                  <span>Welcome! First visit detected</span>
                                  <span>🎉</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Animation State */}
                          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="font-medium text-gray-700 dark:text-gray-300">Animation State</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Set on mount, cleared on unmount</p>
                              </div>
                              <div className="text-right">
                                <p className={clsx(
                                  "text-xl font-bold",
                                  animationState === 'entering' ? "text-yellow-600 dark:text-yellow-400" :
                                  animationState === 'entered' ? "text-green-600 dark:text-green-400" :
                                  "text-gray-600 dark:text-gray-400"
                                )}>
                                  {animationState.toUpperCase()}
                                </p>
                              </div>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={clsx(
                                  "h-full transition-all duration-500",
                                  animationState === 'entering' ? "bg-yellow-500" :
                                  animationState === 'entered' ? "bg-green-500" :
                                  "bg-gray-500"
                                )}
                                style={{ 
                                  width: animationState === 'entering' ? '50%' :
                                         animationState === 'entered' ? '100%' : '0%'
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-900 rounded-xl overflow-hidden">
                        <div className="bg-gray-800 px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-4 font-mono">AnalyticsComponent.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 🚀 This runs ONCE when component mounts
  
  // 1. Measure page load performance
  const loadStart = performance.now();
  const loadTimer = setTimeout(() => {
    const loadTime = performance.now() - loadStart;
    setPageLoadTime(loadTime);
    analytics.track('page_load', { duration: loadTime });
  }, 1000);
  
  // 2. Track visit count
  const visits = localStorage.getItem('pageVisits') || 0;
  const newVisits = parseInt(visits) + 1;
  localStorage.setItem('pageVisits', newVisits.toString());
  setVisitCount(newVisits);
  
  // 3. Show welcome for first visit
  if (newVisits === 1) {
    showWelcomeAnimation();
  }
  
  // 🧹 Cleanup function runs on unmount
  return () => {
    clearTimeout(loadTimer);
    analytics.track('component_unmount');
  };
}, []); // ← Empty array = run once`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Mistake</h4>
                        <p className="text-red-700 dark:text-red-400">
                          Beginners often forget that <code>useEffect</code> with <code>[]</code> runs AFTER the 
                          initial render. If you need something to run BEFORE render, use <code>useLayoutEffect</code> 
                          or handle it in component initialization.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Real-World Use Case</h4>
                        <p className="text-purple-700 dark:text-purple-400">
                          When <span className="font-semibold">Swadeep</span> opens the student portal in Barrackpore, 
                          the system tracks his visit, measures load time for performance monitoring, and shows 
                          a welcome tour if it's his first time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 2: One-time API Call */}
              {activeExample === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-green-500 mr-2">🌐</span> One-time Data Fetching
                    </h3>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                      Fetch Once, Use Many Times
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                        {loading ? (
                          <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
                            <p className="mt-4 text-green-600 dark:text-green-400">Fetching user data...</p>
                            <p className="text-sm text-green-500 dark:text-green-500 mt-2">
                              Simulating API call (1.5 seconds)
                            </p>
                          </div>
                        ) : error ? (
                          <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
                              <span className="text-2xl text-red-600 dark:text-red-400">❌</span>
                            </div>
                            <p className="text-red-600 dark:text-red-400 text-xl font-medium">{error}</p>
                            <button
                              onClick={resetExample}
                              className="mt-4 px-6 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                            >
                              Retry
                            </button>
                          </div>
                        ) : apiData ? (
                          <div className="space-y-6">
                            <div className="text-center">
                              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl text-white">👤</span>
                              </div>
                              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{apiData.name}</h4>
                              <p className="text-green-600 dark:text-green-400">{apiData.location}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled</p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">{apiData.enrollmentDate}</p>
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">{apiData.progress}%</p>
                              </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Enrolled Courses</p>
                              <div className="flex flex-wrap gap-2">
                                {apiData.courses.map((course, index) => (
                                  <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm">
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <div className="mt-6 text-center">
                          <button
                            onClick={resetExample}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Reset & Refetch Data
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-900 rounded-xl overflow-hidden">
                        <div className="bg-gray-800 px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-4 font-mono">UserProfile.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`// ✅ CORRECT: Fetch once on mount
useEffect(() => {
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/123');
      const data = await response.json();
      setUserData(data);  // Store in state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchUserData();
  
  // 🧹 Optional: Cancel request on unmount
  return () => {
    // Abort controller for fetch cancellation
  };
}, []); // ← Empty array = fetch once

// ❌ WRONG: Missing dependency array
useEffect(() => {
  fetchData(); // Runs on EVERY render
});

// ❌ ALSO WRONG: Without cleanup
useEffect(() => {
  fetchData();
  return () => {
    // Forgetting cleanup can cause memory leaks
  };
}, []);`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">When to Use This Pattern</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-500">✅</span>
                            </div>
                            <div>
                              <p className="font-medium text-blue-700 dark:text-blue-400">Static data</p>
                              <p className="text-sm text-blue-600 dark:text-blue-500">User profile, app configuration</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-500">✅</span>
                            </div>
                            <div>
                              <p className="font-medium text-blue-700 dark:text-blue-400">Initial setup</p>
                              <p className="text-sm text-blue-600 dark:text-blue-500">Load initial state from server</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-500">❌</span>
                            </div>
                            <div>
                              <p className="font-medium text-blue-700 dark:text-blue-400">Dynamic data</p>
                              <p className="text-sm text-blue-600 dark:text-blue-500">Real-time updates, search results</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                        <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">Production Tip</h4>
                        <p className="text-yellow-700 dark:text-yellow-400">
                          Always add error handling and loading states. Consider using <code>AbortController</code> 
                          in cleanup to cancel fetch requests if component unmounts before response arrives.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 3: Event Listeners */}
              {activeExample === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-purple-500 mr-2">🎧</span> Event Listeners Setup
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                      Setup Once, Cleanup on Unmount
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Event Tracking Dashboard</h4>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Scroll Position</p>
                            <div className="flex items-end gap-2">
                              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{scrollPosition}</span>
                              <span className="text-purple-500 dark:text-purple-500">px</span>
                            </div>
                            <div className="mt-2 h-2 bg-purple-100 dark:bg-purple-900 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${Math.min(scrollPosition / 10, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Mouse Position</p>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-purple-600 dark:text-purple-400">X:</span>
                                <span className="font-mono">{mousePosition.x}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-600 dark:text-purple-400">Y:</span>
                                <span className="font-mono">{mousePosition.y}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative h-40 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                          <div 
                            className="absolute w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg"
                            style={{
                              left: `${mousePosition.x}px`,
                              top: `${mousePosition.y}px`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-500 text-sm">
                              Move your mouse to see tracking in action
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Event Lifecycle</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-800">
                            <span className="text-purple-600 dark:text-purple-400">Mount</span>
                            <span className="text-sm">→ addEventListener()</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-800">
                            <span className="text-green-600 dark:text-green-400">Event Occurs</span>
                            <span className="text-sm">→ Handler executes</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-red-200 dark:border-red-800">
                            <span className="text-red-600 dark:text-red-400">Unmount</span>
                            <span className="text-sm">→ removeEventListener()</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-900 rounded-xl overflow-hidden">
                        <div className="bg-gray-800 px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-4 font-mono">EventListenerComponent.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 🎧 Setup event listeners ONCE on mount
  
  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };
  
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  // Add listeners
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('mousemove', handleMouseMove);
  
  // 🧹 CRITICAL: Cleanup on unmount
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousemove', handleMouseMove);
    
    // Without this cleanup, listeners would stay attached
    // causing memory leaks and multiple handlers
  };
}, []); // ← Empty array = setup once`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Memory Leak Danger</h4>
                        <p className="text-red-700 dark:text-red-400">
                          Forgetting the cleanup function causes event listeners to accumulate with each component 
                          mount. This can lead to performance issues and unexpected behavior.
                        </p>
                        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                          <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                            ❌ Wrong: No cleanup → Memory leaks
                          </p>
                          <p className="text-sm text-red-700 dark:text-red-400">
                            ✅ Correct: Always return cleanup function
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                        <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Performance Consideration</h4>
                        <p className="text-green-700 dark:text-green-400">
                          Event listeners in empty dependency useEffect are perfect for global events 
                          (scroll, resize, keyboard) that don't depend on component props or state.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 4: Local Storage */}
              {activeExample === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-indigo-500 mr-2">💾</span> Local Storage Initialization
                    </h3>
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium">
                      Read Once, Use Throughout
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">User Preferences Manager</h4>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Preferences (from localStorage):
                          </label>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 min-h-32">
                            <pre className="text-sm text-indigo-600 dark:text-indigo-400 whitespace-pre-wrap">
                              {localStorageData === 'No saved preferences found' 
                                ? localStorageData 
                                : JSON.stringify(JSON.parse(localStorageData), null, 2)}
                            </pre>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <button
                            onClick={handleSavePreferences}
                            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Save Default Preferences to localStorage
                          </button>
                          
                          <button
                            onClick={handleClearPreferences}
                            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Clear Preferences from localStorage
                          </button>
                          
                          <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Theme:</span>
                            <button
                              onClick={toggleTheme}
                              className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800"
                            >
                              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-900 rounded-xl overflow-hidden">
                        <div className="bg-gray-800 px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-4 font-mono">PreferencesComponent.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 📖 Read from localStorage ONCE on mount
  const savedPreferences = localStorage.getItem('userPreferences');
  
  if (savedPreferences) {
    try {
      const parsed = JSON.parse(savedPreferences);
      setPreferences(parsed);
      
      // Apply preferences immediately
      if (parsed.theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
      
      if (parsed.fontSize) {
        document.documentElement.style.fontSize = parsed.fontSize;
      }
    } catch (error) {
      console.error('Failed to parse preferences:', error);
      // Fallback to defaults
      setPreferences(defaultPreferences);
    }
  } else {
    // No saved preferences, use defaults
    setPreferences(defaultPreferences);
  }
  
  // 🧹 No cleanup needed for localStorage reading
  // (data persists automatically)
}, []); // ← Read once on mount

// 💾 Separate effect for SAVING preferences
useEffect(() => {
  if (preferences) {
    localStorage.setItem('userPreferences', 
      JSON.stringify(preferences)
    );
  }
}, [preferences]); // ← Save when preferences change`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                        <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3">⚠️ Synchronous Operation</h4>
                        <p className="text-yellow-700 dark:text-yellow-400">
                          localStorage operations are synchronous and block the main thread. For large data, 
                          consider using IndexedDB or splitting operations to avoid freezing the UI.
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Real-World Scenario</h4>
                        <p className="text-purple-700 dark:text-purple-400">
                          When <span className="font-semibold">Abhronila</span> opens her learning dashboard in Ichapur, 
                          the app immediately loads her preferred theme, font size, and notification settings 
                          from localStorage, providing a personalized experience instantly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 5: Third-party Integration */}
              {activeExample === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-yellow-500 mr-2">🔌</span> Third-party Library Integration
                    </h3>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-medium">
                      Initialize Once, Destroy on Unmount
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">External Library Simulation</h4>
                        
                        <div className="mb-6">
                          <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col items-center justify-center p-6">
                            <div className="text-4xl mb-4">📊</div>
                            <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Chart Library Instance</h5>
                            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                              This simulates an external charting library that needs to be initialized once
                            </p>
                            
                            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Width</div>
                                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{windowSize.width}px</div>
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Height</div>
                                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{windowSize.height}px</div>
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Aspect</div>
                                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                                  {(windowSize.width / windowSize.height).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Try resizing your browser window to see the chart update
                          </p>
                          <div className="inline-flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              Chart library initialized and listening for resize
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-900 rounded-xl overflow-hidden">
                        <div className="bg-gray-800 px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-4 font-mono">ChartComponent.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 📊 Initialize third-party library ONCE
  
  // Simulating library initialization
  const chart = new ThirdPartyChart({
    container: '#chart-container',
    width: window.innerWidth,
    height: window.innerHeight,
    theme: 'dark'
  });
  
  // Store instance for later use
  setChartInstance(chart);
  
  // Setup resize handler
  const handleResize = () => {
    if (chart) {
      chart.updateSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  };
  
  window.addEventListener('resize', handleResize);
  
  // 🧹 CRITICAL: Cleanup on unmount
  return () => {
    if (chart) {
      chart.destroy(); // Library's cleanup method
    }
    window.removeEventListener('resize', handleResize);
    
    // Without cleanup, the chart would:
    // 1. Stay in memory
    // 2. Continue receiving events
    // 3. Cause memory leaks
  };
}, []); // ← Initialize once`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Integration Mistakes</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="font-medium text-red-800 dark:text-red-300">Missing Cleanup</p>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              External libraries often have destroy/dispose methods that must be called
                            </p>
                          </div>
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="font-medium text-red-800 dark:text-red-300">Multiple Initializations</p>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              Without [], effect runs on every render, creating multiple instances
                            </p>
                          </div>
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="font-medium text-red-800 dark:text-red-300">Memory Leaks</p>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              Event listeners and timers from libraries stay active
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Best Practice</h4>
                        <p className="text-blue-700 dark:text-blue-400">
                          Always check the library's documentation for cleanup methods. Use <code>useRef</code> 
                          to store library instances to prevent re-initialization on re-renders.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 6: Cleanup Pattern */}
              {activeExample === 6 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-red-500 mr-2">🧹</span> Setup & Cleanup Pattern
                    </h3>
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      subscriptionActive
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                    )}>
                      {subscriptionActive ? 'Active (Cleanup Ready)' : 'Inactive'}
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <div className="text-center mb-6">
                          <div className={clsx(
                            "w-32 h-32 rounded-full border-8 mx-auto flex items-center justify-center",
                            subscriptionActive
                              ? "border-green-500 animate-pulse"
                              : "border-gray-300 dark:border-gray-700"
                          )}>
                            {subscriptionActive ? (
                              <div className="text-center">
                                <span className="text-4xl">🔔</span>
                                <p className="text-green-600 dark:text-green-400 font-medium mt-2">Subscribed</p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <span className="text-4xl">🔕</span>
                                <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Unsubscribed</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-center">
                          <button
                            onClick={toggleSubscription}
                            className={clsx(
                              "px-8 py-4 rounded-lg font-medium transition-all duration-300 mb-4",
                              subscriptionActive
                                ? "bg-gradient-to-r from-red-500 to-orange-600 text-white hover:shadow-lg"
                                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
                            )}
                          >
                            {subscriptionActive ? 'Unsubscribe (Trigger Cleanup)' : 'Subscribe (Setup Effect)'}
                          </button>
                          
                          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800">
                            <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Subscription Status</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {subscriptionActive 
                                ? 'Active subscription sending updates every 2 seconds'
                                : 'No active subscription. Click Subscribe to start.'
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Cleanup Timeline</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-800">
                            <span className="text-green-600 dark:text-green-400">Component Mounts</span>
                            <span className="text-sm">→ useEffect runs</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-800">
                            <span className="text-blue-600 dark:text-blue-400">Setup Complete</span>
                            <span className="text-sm">→ Return cleanup function</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-red-200 dark:border-red-800">
                            <span className="text-red-600 dark:text-red-400">Component Unmounts</span>
                            <span className="text-sm">→ Cleanup function runs</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-900 rounded-xl overflow-hidden">
                        <div className="bg-gray-800 px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-4 font-mono">SubscriptionComponent.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 🔔 Setup subscription ONLY when subscriptionActive is true
  
  if (subscriptionActive) {
    // Create subscription
    const subscription = {
      id: Date.now(),
      interval: setInterval(() => {
        console.log('Subscription update');
        // Handle incoming data
      }, 2000),
      
      // Cleanup method
      unsubscribe: function() {
        clearInterval(this.interval);
        console.log('Unsubscribed');
      }
    };
    
    console.log('Subscription started');
    
    // 🧹 Return cleanup function
    // This runs when:
    // 1. Component unmounts
    // 2. subscriptionActive becomes false
    // 3. Dependency array changes
    return () => {
      subscription.unsubscribe();
      console.log('Cleanup completed');
    };
  }
  
  // If subscriptionActive is false, no setup needed
  // and no cleanup function returned
}, [subscriptionActive]); // ← Effect depends on subscriptionActive

// 🎯 For empty dependency array:
useEffect(() => {
  // Setup code here...
  
  return () => {
    // 🧹 Cleanup runs ONCE on unmount
    // Perfect for one-time setup/cleanup
  };
}, []); // ← Empty array = run once`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-4">When Cleanup Runs</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 dark:text-purple-500">1</span>
                            </div>
                            <div>
                              <p className="font-medium text-purple-700 dark:text-purple-400">Before next effect execution</p>
                              <p className="text-sm text-purple-600 dark:text-purple-500">When dependencies change</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 dark:text-purple-500">2</span>
                            </div>
                            <div>
                              <p className="font-medium text-purple-700 dark:text-purple-400">On component unmount</p>
                              <p className="text-sm text-purple-600 dark:text-purple-500">When component is removed</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 dark:text-purple-500">3</span>
                            </div>
                            <div>
                              <p className="font-medium text-purple-700 dark:text-purple-400">Before component updates</p>
                              <p className="text-sm text-purple-600 dark:text-purple-500">In development with StrictMode</p>
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
        </section>

        {/* Effect Log */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.8s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                <span className="text-gray-500 mr-2">📋</span> Effect Execution Log
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={clearLogs}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  Clear Logs
                </button>
                <button
                  onClick={resetExample}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm"
                >
                  Reset All
                </button>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {logMessages.map((log) => (
                  <div
                    key={log.id}
                    className={clsx(
                      "p-3 rounded-lg border transition-all duration-300",
                      log.type === 'mount' && "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                      log.type === 'cleanup' && "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                      log.type === 'api' && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                      log.type === 'event' && "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                      log.type === 'storage' && "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
                      log.type === 'subscription' && "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                      log.type === 'animation' && "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
                      log.type === 'error' && "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                      log.type === 'info' && "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700",
                      log.type === 'action' && "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={clsx(
                          "text-sm font-medium px-2 py-1 rounded",
                          log.type === 'mount' && "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
                          log.type === 'cleanup' && "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
                          log.type === 'api' && "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
                          log.type === 'event' && "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300",
                          log.type === 'storage' && "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300",
                          log.type === 'subscription' && "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
                          log.type === 'animation' && "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-300",
                          log.type === 'error' && "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
                          (log.type === 'info' || log.type === 'action') && "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
                        )}>
                          {log.type.toUpperCase()}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">{log.message}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This log shows effects running with empty dependency arrays. Notice mount and cleanup pairs.
              </p>
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_1s]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">When to Use Empty Dependency Array</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "📊",
                title: "Analytics & Tracking",
                description: "Page views, performance metrics, first visit detection",
                color: "blue"
              },
              {
                icon: "🌐",
                title: "Initial Data Fetch",
                description: "Load user profile, app config, static data once",
                color: "green"
              },
              {
                icon: "🎧",
                title: "Global Event Listeners",
                description: "Scroll, resize, keyboard events (with cleanup)",
                color: "purple"
              },
              {
                icon: "💾",
                title: "Local Storage Read",
                description: "Load persisted preferences on app start",
                color: "indigo"
              },
              {
                icon: "🔌",
                title: "Third-party Initialization",
                description: "Initialize libraries, SDKs, external services",
                color: "yellow"
              },
              {
                icon: "🧹",
                title: "One-time Setup/Cleanup",
                description: "Resources that need setup and disposal",
                color: "red"
              },
            ].map((principle, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`text-2xl`}>{principle.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-2">{principle.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{principle.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_1.2s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">⚠️ Common Mistakes with []</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">1. Forgetting Cleanup</h4>
                  <p className="text-red-700 dark:text-red-400 text-sm">
                    Event listeners, subscriptions, and timers continue running after component unmounts, causing memory leaks.
                  </p>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">2. Using State/Props in [] Effect</h4>
                  <p className="text-red-700 dark:text-red-400 text-sm">
                    If your effect uses state or props, they'll be captured at mount time and won't update.
                  </p>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">3. Multiple [] Effects Doing Same Thing</h4>
                  <p className="text-red-700 dark:text-red-400 text-sm">
                    Combine related setup logic into single effect instead of multiple separate effects.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">✅ Solution: Always Cleanup</h4>
                  <pre className="text-xs text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900 p-2 rounded">
{`useEffect(() => {
  const listener = () => {};
  window.addEventListener('resize', listener);
  return () => window.removeEventListener('resize', listener);
}, []);`}
                  </pre>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">✅ Solution: Use Refs for Latest Values</h4>
                  <pre className="text-xs text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900 p-2 rounded">
{`const latestValue = useRef(value);
useEffect(() => {
  latestValue.current = value; // Update ref on every render
}, [value]);

useEffect(() => {
  // Use latestValue.current instead of value
}, []);`}
                  </pre>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">✅ Solution: Combine Related Logic</h4>
                  <pre className="text-xs text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900 p-2 rounded">
{`// Instead of multiple effects:
useEffect(() => { /* setup A */ }, []);
useEffect(() => { /* setup B */ }, []);

// Combine:
useEffect(() => {
  // Setup A
  // Setup B
  return () => {
    // Cleanup A
    // Cleanup B
  };
}, []);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_1.4s]">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl">👨‍🏫</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold">Teacher's Note</h3>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      Sukanta Hui | 27 years experience
                    </span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-white/90 leading-relaxed">
                      In my 27 years of teaching programming from Barrackpore to Naihati, I've found that 
                      understanding the empty dependency array is a milestone in mastering React. Students 
                      like <span className="font-semibold">Debangshu</span> often confuse when to use <code>[]</code> 
                      vs when to add dependencies.
                    </p>
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <h4 className="font-bold mb-2">Golden Rule to Remember:</h4>
                      <p className="text-white/90">
                        "Use <code>[]</code> when you want to run something once at the beginning (setup) 
                        and clean it up at the end (teardown). If your effect depends on changing values, 
                        add them to the dependency array."
                      </p>
                    </div>
                    <p className="text-white/90">
                      When <span className="font-semibold">Swadeep</span> was building his first React app, 
                      he used <code>[]</code> for API calls but forgot that the data might need refreshing. 
                      We fixed this by adding a refresh button that triggers a state change, which then 
                      re-runs the effect with proper dependencies.
                    </p>
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-sm text-white/80">
                        Email: sukantahui@codernaccotax.co.in | Mobile: 7003756860
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="animate-[slideUp_0.8s_ease-out_1.6s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Learning Checklist</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Understanding Check</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-blue-600 rounded" />
                    <div>
                      <p className="font-medium">I understand when useEffect with [] runs</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Once on mount, cleanup on unmount</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-blue-600 rounded" />
                    <div>
                      <p className="font-medium">I know when to use empty dependency array</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Setup code, initial data, event listeners</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-blue-600 rounded" />
                    <div>
                      <p className="font-medium">I understand the importance of cleanup</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Prevents memory leaks and bugs</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Skill Practice</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                    <div>
                      <p className="font-medium">I can write useEffect with proper cleanup</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For event listeners and subscriptions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                    <div>
                      <p className="font-medium">I can identify when NOT to use []</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">When effect depends on changing values</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                    <div>
                      <p className="font-medium">I can debug common [] mistakes</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Stale closures, missing cleanup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Hint Section</h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-300 italic">
                  Think about: What happens to Tuhina's event listeners when she navigates away from the page?
                  Observe carefully how the cleanup logs appear when you switch between examples.
                  Try the subscription example and notice how cleanup prevents memory leaks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.2s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.4s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.6s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.8s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_1s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_1\\.2s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_1\\.4s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_1\\.6s\\] {
            animation: none !important;
            opacity: 1;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic33;