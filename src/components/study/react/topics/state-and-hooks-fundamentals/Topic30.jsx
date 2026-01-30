import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic30 = () => {
  const [activeExample, setActiveExample] = useState(1);
  const [timerCount, setTimerCount] = useState(0);
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [theme, setTheme] = useState('light');
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [logMessages, setLogMessages] = useState([
    { id: 1, type: 'info', message: 'Component mounted', time: new Date().toLocaleTimeString() }
  ]);

  const examples = [
    { id: 1, title: "Timer/Interval", icon: "⏰", color: "blue" },
    { id: 2, title: "API Calls", icon: "🌐", color: "green" },
    { id: 3, title: "DOM Manipulation", icon: "📝", color: "purple" },
    { id: 4, title: "Event Listeners", icon: "🎧", color: "yellow" },
    { id: 5, title: "Local Storage", icon: "💾", color: "indigo" },
    { id: 6, title: "Subscriptions", icon: "🔔", color: "red" },
  ];

  // Example 1: Timer/Interval Side Effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeExample === 1) {
        setTimerCount(prev => prev + 1);
        addLog('Timer tick', 'timer');
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      addLog('Timer cleaned up', 'cleanup');
    };
  }, [activeExample]);

  // Example 2: API Call Side Effect
  useEffect(() => {
    if (activeExample === 2 && !apiData) {
      const fetchData = async () => {
        setIsLoading(true);
        addLog('API request started', 'api');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setApiData({
          user: "Swadeep",
          location: "Barrackpore",
          score: 95,
          enrolled: true
        });
        setIsLoading(false);
        addLog('API request completed', 'api');
      };
      
      fetchData();
    }
  }, [activeExample, apiData]);

  // Example 3: DOM Manipulation Side Effect
  useEffect(() => {
    if (activeExample === 3) {
      // This is a side effect - directly manipulating the DOM
      const title = document.getElementById('dynamic-title');
      if (title) {
        title.style.color = theme === 'light' ? '#1f2937' : '#f3f4f6';
        title.style.transition = 'color 0.3s ease';
        addLog('DOM title color updated', 'dom');
      }
      
      // Another DOM manipulation
      const box = document.getElementById('dom-box');
      if (box) {
        box.style.transform = `translateX(${timerCount % 100}px)`;
        addLog('DOM box position updated', 'dom');
      }
    }
  }, [activeExample, theme, timerCount]);

  // Example 4: Event Listener Side Effect
  useEffect(() => {
    if (activeExample === 4) {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        addLog('Window resized', 'event');
      };
      
      const handleKeyPress = () => {
        setKeyPressCount(prev => prev + 1);
        addLog('Key pressed', 'event');
      };
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('keydown', handleKeyPress);
      addLog('Event listeners added', 'event');
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', handleKeyPress);
        addLog('Event listeners removed', 'cleanup');
      };
    }
  }, [activeExample]);

  // Example 5: Local Storage Side Effect
  useEffect(() => {
    if (activeExample === 5) {
      // Read from localStorage
      const savedValue = localStorage.getItem('react-side-effect-demo');
      if (savedValue) {
        setLocalStorageValue(savedValue);
        addLog('Read from localStorage', 'storage');
      }
    }
  }, [activeExample]);

  // Example 6: Subscription Side Effect
  useEffect(() => {
    if (activeExample === 6 && subscriptionActive) {
      // Simulate a subscription
      const subscription = {
        id: Date.now(),
        interval: setInterval(() => {
          addLog('Subscription update received', 'subscription');
        }, 2000),
        unsubscribe: function() {
          clearInterval(this.interval);
          addLog('Subscription unsubscribed', 'cleanup');
        }
      };
      
      addLog('Subscription started', 'subscription');
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [activeExample, subscriptionActive]);

  const addLog = (message, type) => {
    const newLog = {
      id: Date.now(),
      type,
      message,
      time: new Date().toLocaleTimeString()
    };
    
    setLogMessages(prev => [newLog, ...prev.slice(0, 4)]);
  };

  const handleResetTimer = () => {
    setTimerCount(0);
    addLog('Timer reset', 'action');
  };

  const handleFetchNewData = () => {
    setApiData(null);
    addLog('New API data requested', 'action');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    addLog('Theme toggled', 'action');
  };

  const handleLocalStorageSave = () => {
    localStorage.setItem('react-side-effect-demo', localStorageValue);
    addLog('Saved to localStorage', 'storage');
  };

  const toggleSubscription = () => {
    setSubscriptionActive(prev => !prev);
    addLog(subscriptionActive ? 'Subscription stopped' : 'Subscription started', 'action');
  };

  const clearLogs = () => {
    setLogMessages([{
      id: Date.now(),
      type: 'info',
      message: 'Logs cleared',
      time: new Date().toLocaleTimeString()
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-full text-white">
            <span className="text-xl">⚡</span>
            <h1 className="text-2xl md:text-4xl font-bold">
              Understanding Side Effects in React
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn how React components interact with the outside world
          </p>
        </header>

        {/* Main Concept */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.2s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      What Are Side Effects?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      In React, side effects are operations that interact with the world outside of your component's render function.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">Pure Function vs Side Effect</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded border border-green-200 dark:border-green-800">
                        <h4 className="text-green-700 dark:text-green-400 font-medium mb-1">Pure Function</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Same input → Same output<br />
                          No side effects
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded border border-red-200 dark:border-red-800">
                        <h4 className="text-red-700 dark:text-red-400 font-medium mb-1">Side Effect</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Changes outside world<br />
                          Not predictable
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Simple Analogy</h3>
                    <p className="text-blue-700 dark:text-blue-400">
                      Imagine <span className="font-semibold">Tuhina</span> studying in her Barrackpore classroom:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-blue-600 dark:text-blue-400">
                      <li>• <span className="font-semibold">Pure:</span> Reading a book (no external change)</li>
                      <li>• <span className="font-semibold">Side Effect:</span> Writing on blackboard, asking teacher</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4">Side Effects Are Everywhere</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "🌐", text: "Fetching data from API", color: "green" },
                      { icon: "⏰", text: "Setting timers/intervals", color: "blue" },
                      { icon: "📝", text: "Direct DOM manipulation", color: "purple" },
                      { icon: "🎧", text: "Adding event listeners", color: "yellow" },
                      { icon: "💾", text: "Reading/writing to localStorage", color: "indigo" },
                      { icon: "🔔", text: "Subscribing to external services", color: "red" },
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Selector */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.4s]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Side Effect Examples</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {examples.map((example, index) => (
              <button
                key={example.id}
                onClick={() => setActiveExample(example.id)}
                className={clsx(
                  "p-4 rounded-xl border transition-all duration-300 transform hover:scale-[1.02]",
                  activeExample === example.id
                    ? "bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg border-transparent"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">{example.icon}</span>
                  <span className="font-medium text-sm text-center">{example.title}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.6s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 md:p-8">
              {/* Example 1: Timer/Interval */}
              {activeExample === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-blue-500 mr-2">⏰</span> Timer/Interval Side Effect
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                      Running Automatically
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <div className="text-center">
                          <div className="inline-block relative">
                            <div className="w-48 h-48 rounded-full border-8 border-blue-200 dark:border-blue-800 flex items-center justify-center">
                              <div className="text-center">
                                <span className="text-5xl font-bold text-blue-600 dark:text-blue-400">{timerCount}</span>
                                <p className="text-blue-500 dark:text-blue-400 mt-2">seconds</p>
                              </div>
                            </div>
                            <div className="absolute inset-0 rounded-full border-4 border-blue-400 dark:border-blue-500 animate-ping"></div>
                          </div>
                        </div>

                        <div className="mt-6 text-center">
                          <button
                            onClick={handleResetTimer}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Reset Timer
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">How This Works</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700 dark:text-gray-300">setInterval() creates a timer</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">This runs every 1000ms (1 second)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700 dark:text-gray-300">Timer updates state</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">setTimerCount() modifies component state</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700 dark:text-gray-300">Component re-renders</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">UI updates to show new count</p>
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
                            <span className="ml-4 font-mono">TimerExample.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 🚨 Side Effect: Setting up interval
  const interval = setInterval(() => {
    setTimerCount(prev => prev + 1);
  }, 1000);
  
  // 🧹 Cleanup: Very important!
  return () => {
    clearInterval(interval);
    // Without cleanup, timer would keep running
    // even after component unmounts
  };
}, []); // Empty dependency array = runs once`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Mistake</h4>
                        <p className="text-red-700 dark:text-red-400">
                          Beginners often forget the cleanup function. Without <code>clearInterval()</code>, 
                          the timer keeps running even after the component is removed from the page, 
                          causing memory leaks and unexpected behavior.
                        </p>
                        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                          <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                            ❌ Wrong: No cleanup
                          </p>
                          <p className="text-sm text-red-700 dark:text-red-400">
                            ✅ Correct: Always return cleanup function
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Real-World Scenario</h4>
                        <p className="text-purple-700 dark:text-purple-400">
                          When <span className="font-semibold">Swadeep</span> opens a live sports score app in Ichapur, 
                          timers fetch new scores every few seconds. If he navigates away without cleanup, 
                          the app would waste mobile data and battery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 2: API Calls */}
              {activeExample === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-green-500 mr-2">🌐</span> API Call Side Effect
                    </h3>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                      External Data Fetch
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                        {isLoading ? (
                          <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
                            <p className="mt-4 text-green-600 dark:text-green-400">Fetching data from server...</p>
                            <p className="text-sm text-green-500 dark:text-green-500 mt-2">Simulating network delay (1.5s)</p>
                          </div>
                        ) : apiData ? (
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl text-white">👤</span>
                              </div>
                              <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{apiData.user}</h4>
                              <p className="text-green-600 dark:text-green-400">{apiData.location}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{apiData.score}%</p>
                              </div>
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                  {apiData.enrolled ? '✅ Enrolled' : '❌ Not Enrolled'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <div className="mt-6 text-center">
                          <button
                            onClick={handleFetchNewData}
                            disabled={isLoading}
                            className={clsx(
                              "px-6 py-3 rounded-lg font-medium transition-all duration-300",
                              isLoading
                                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
                            )}
                          >
                            {isLoading ? 'Fetching...' : 'Fetch New Data'}
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">API Request Flow</h4>
                        <div className="relative">
                          <div className="space-y-8">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600 dark:text-green-400 font-bold">1</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700 dark:text-gray-300">Component Mounts</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">useEffect triggers</p>
                              </div>
                            </div>
                            
                            <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-green-200 dark:bg-green-800"></div>
                            
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-yellow-600 dark:text-yellow-400 font-bold">2</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700 dark:text-gray-300">Loading State</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Show spinner/loader</p>
                              </div>
                            </div>
                            
                            <div className="absolute left-6 top-24 bottom-0 w-0.5 bg-green-200 dark:bg-green-800"></div>
                            
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700 dark:text-gray-300">Data Received</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Update state with response</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700 dark:text-gray-300">UI Updates</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Show data to user</p>
                              </div>
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
                            <span className="ml-4 font-mono">ApiExample.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 🚨 Side Effect: Fetching external data
  const fetchData = async () => {
    setIsLoading(true);           // Loading state
    try {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUserData(data);          // Update state with API data
    } catch (error) {
      setError(error.message);    // Handle errors
    } finally {
      setIsLoading(false);        // Hide loading
    }
  };
  
  fetchData();
  
  // 🧹 Cleanup: Cancel ongoing requests
  return () => {
    // Abort controller for fetch cancellation
  };
}, []); // Fetch on component mount`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Race Conditions</h4>
                        <p className="text-red-700 dark:text-red-400">
                          If a component unmounts before API response arrives, setting state causes errors. 
                          Always check if component is still mounted before updating state.
                        </p>
                        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                          <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                            ❌ Wrong: Setting state without mount check
                          </p>
                          <pre className="text-xs text-red-700 dark:text-red-400 mt-1">
{`// After unmount, this causes error:
setUserData(data);`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Production Tip</h4>
                        <p className="text-purple-700 dark:text-purple-400">
                          Use <code>AbortController</code> in cleanup to cancel fetch requests when component unmounts. 
                          This prevents memory leaks and improves app performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 3: DOM Manipulation */}
              {activeExample === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-purple-500 mr-2">📝</span> DOM Manipulation Side Effect
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                      Direct DOM Access
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <h4 id="dynamic-title" className="text-2xl font-bold text-center mb-6">
                          Dynamic DOM Element
                        </h4>
                        
                        <div className="mb-6">
                          <div className="h-40 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                            <div 
                              id="dom-box"
                              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg"
                            ></div>
                          </div>
                          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                            This box is being moved by DOM manipulation
                          </p>
                        </div>

                        <div className="text-center">
                          <button
                            onClick={toggleTheme}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Toggle Title Color (Dark/Light)
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">DOM Manipulation Risks</h4>
                        <div className="space-y-4">
                          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <h5 className="font-bold text-red-700 dark:text-red-300 mb-2">⚠️ Breaks React's Control</h5>
                            <p className="text-red-600 dark:text-red-400 text-sm">
                              React loses track of DOM changes, causing inconsistencies during re-renders.
                            </p>
                          </div>
                          
                          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <h5 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">⚠️ Performance Issues</h5>
                            <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                              Direct DOM updates bypass React's efficient diffing algorithm.
                            </p>
                          </div>
                          
                          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <h5 className="font-bold text-green-700 dark:text-green-300 mb-2">✅ When to Use</h5>
                            <p className="text-green-600 dark:text-green-400 text-sm">
                              Only for things React can't handle: third-party libraries, focus management, media playback.
                            </p>
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
                            <span className="ml-4 font-mono">DomExample.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 🚨 Side Effect: Direct DOM manipulation
  const title = document.getElementById('dynamic-title');
  const box = document.getElementById('dom-box');
  
  if (title) {
    // ❗ React doesn't know about this change
    title.style.color = theme === 'light' ? '#1f2937' : '#f3f4f6';
  }
  
  if (box) {
    // ❗ This bypasses React's render cycle
    box.style.transform = \`translateX(\${timerCount % 100}px)\`;
  }
  
  // 🧹 Cleanup: Usually not needed for simple styles,
  // but important for event listeners
  return () => {
    // Reset styles if necessary
  };
}, [theme, timerCount]); // Re-run when dependencies change`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">React's Virtual DOM vs Direct DOM</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-blue-600 dark:text-blue-400 text-sm">✓</span>
                            </div>
                            <div>
                              <p className="font-medium text-blue-700 dark:text-blue-400">Virtual DOM (React's way)</p>
                              <p className="text-sm text-blue-600 dark:text-blue-500">Calculates changes, updates efficiently</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-purple-600 dark:text-purple-400 text-sm">!</span>
                            </div>
                            <div>
                              <p className="font-medium text-purple-700 dark:text-purple-400">Direct DOM (Side Effect)</p>
                              <p className="text-sm text-purple-600 dark:text-purple-500">Bypasses React, use sparingly</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-emerald-800">
                        <h4 className="font-bold text-green-800 dark:text-emerald-300 mb-2">When Abhronila Needs It</h4>
                        <p className="text-green-700 dark:text-emerald-400">
                          When integrating a Google Maps widget in her Shyamnagar project, 
                          she must use DOM manipulation because React doesn't control the map's internal DOM.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 4: Event Listeners */}
              {activeExample === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-yellow-500 mr-2">🎧</span> Event Listener Side Effect
                    </h3>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-medium">
                      Global Events
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Window Width</p>
                            <div className="flex items-end gap-2">
                              <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{windowWidth}</span>
                              <span className="text-yellow-500 dark:text-yellow-500">px</span>
                            </div>
                            <div className="mt-2 h-2 bg-yellow-100 dark:bg-yellow-900 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: `${Math.min(windowWidth / 20, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Key Presses</p>
                            <div className="flex items-end gap-2">
                              <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{keyPressCount}</span>
                              <span className="text-yellow-500 dark:text-yellow-500">presses</span>
                            </div>
                            <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
                              Press any key to increment
                            </p>
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Try resizing your browser window or pressing keys
                          </p>
                          <div className="inline-flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              Event listeners are active
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Event Lifecycle</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-yellow-200 dark:border-yellow-800">
                            <span className="text-yellow-600 dark:text-yellow-400">Mount</span>
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
                            <span className="ml-4 font-mono">EventExample.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 🚨 Side Effect: Adding event listeners
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  const handleKeyPress = () => {
    setKeyPressCount(prev => prev + 1);
  };
  
  window.addEventListener('resize', handleResize);
  window.addEventListener('keydown', handleKeyPress);
  
  // 🧹 CRITICAL: Cleanup to remove listeners
  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('keydown', handleKeyPress);
    
    // Without cleanup, listeners would accumulate
    // causing memory leaks and multiple calls
  };
}, []); // Empty array = add/remove once`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Memory Leak Danger</h4>
                        <p className="text-red-700 dark:text-red-400">
                          Forgetting to remove event listeners causes them to stay attached even after 
                          component unmounts. Each mount adds new listeners, slowing down your app.
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="text-sm font-medium text-red-800 dark:text-red-300">Without Cleanup</p>
                            <p className="text-xs text-red-700 dark:text-red-400">Memory usage grows</p>
                          </div>
                          <div className="p-3 bg-green-100 dark:bg-green-900 rounded">
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">With Cleanup</p>
                            <p className="text-xs text-green-700 dark:text-green-400">Memory stays constant</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Practical Use Case</h4>
                        <p className="text-purple-700 dark:text-purple-400">
                          When <span className="font-semibold">Debangshu</span> builds a dashboard in Naihati, 
                          he uses window resize listeners to adjust charts and responsive layouts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 5: Local Storage */}
              {activeExample === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-indigo-500 mr-2">💾</span> Local Storage Side Effect
                    </h3>
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium">
                      Browser Storage
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Browser Storage Demo</h4>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Enter text to save in localStorage:
                          </label>
                          <input
                            type="text"
                            value={localStorageValue}
                            onChange={(e) => setLocalStorageValue(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                            placeholder="Type something here..."
                          />
                        </div>

                        <div className="space-y-4">
                          <button
                            onClick={handleLocalStorageSave}
                            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Save to localStorage
                          </button>
                          
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current localStorage Value:</p>
                            <p className="font-mono text-indigo-600 dark:text-indigo-400 break-all">
                              {localStorageValue || '(empty)'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Storage Characteristics</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
                            <span className="font-medium">Persistence</span>
                            <span className="text-indigo-600 dark:text-indigo-400">Survives page refresh</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
                            <span className="font-medium">Capacity</span>
                            <span className="text-indigo-600 dark:text-indigo-400">~5-10MB per domain</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
                            <span className="font-medium">Access</span>
                            <span className="text-indigo-600 dark:text-indigo-400">Synchronous (blocks UI)</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
                            <span className="font-medium">Security</span>
                            <span className="text-red-600 dark:text-red-400">No sensitive data!</span>
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
                            <span className="ml-4 font-mono">StorageExample.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 🚨 Side Effect: Reading from localStorage
  // Runs on component mount
  const savedValue = localStorage.getItem('myAppData');
  if (savedValue) {
    setData(JSON.parse(savedValue));
  }
}, []); // Read once on mount

// 🚨 Side Effect: Writing to localStorage
// Runs when data changes
useEffect(() => {
  if (data) {
    localStorage.setItem('myAppData', JSON.stringify(data));
  }
}, [data]); // Write when data changes

// 🧹 Cleanup: localStorage persists automatically
// No cleanup needed for basic usage`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Common Issues</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="font-medium text-red-800 dark:text-red-300">Quota Exceeded</p>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              localStorage has limited space (5-10MB)
                            </p>
                          </div>
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="font-medium text-red-800 dark:text-red-300">Synchronous Blocks</p>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              Large operations can freeze UI
                            </p>
                          </div>
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="font-medium text-red-800 dark:text-red-300">Private Browsing</p>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              Some browsers restrict access
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-emerald-800">
                        <h4 className="font-bold text-green-800 dark:text-emerald-300 mb-2">Best Practices</h4>
                        <ul className="space-y-2 text-sm text-green-700 dark:text-emerald-400">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-emerald-500">✓</span>
                            <span>Use try-catch for error handling</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-emerald-500">✓</span>
                            <span>Store small amounts of non-sensitive data</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-emerald-500">✓</span>
                            <span>Consider IndexedDB for larger data</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-emerald-500">✓</span>
                            <span>Clear old data periodically</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Example 6: Subscriptions */}
              {activeExample === 6 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      <span className="text-red-500 mr-2">🔔</span> Subscription Side Effect
                    </h3>
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      subscriptionActive
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                    )}>
                      {subscriptionActive ? 'Active' : 'Inactive'}
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
                                <p className="text-green-600 dark:text-green-400 font-medium mt-2">Live Updates</p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <span className="text-4xl">🔕</span>
                                <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Inactive</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-center">
                          <button
                            onClick={toggleSubscription}
                            className={clsx(
                              "px-8 py-4 rounded-lg font-medium transition-all duration-300",
                              subscriptionActive
                                ? "bg-gradient-to-r from-red-500 to-orange-600 text-white hover:shadow-lg"
                                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
                            )}
                          >
                            {subscriptionActive ? 'Stop Subscription' : 'Start Subscription'}
                          </button>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                            {subscriptionActive 
                              ? 'Subscription sends updates every 2 seconds'
                              : 'Click to start receiving updates'
                            }
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Subscription Types</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-800">
                            <p className="font-medium text-blue-700 dark:text-blue-400">WebSocket Connections</p>
                            <p className="text-sm text-blue-600 dark:text-blue-500">Real-time chat, live updates</p>
                          </div>
                          <div className="p-3 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-800">
                            <p className="font-medium text-purple-700 dark:text-purple-400">Firebase/Firestore</p>
                            <p className="text-sm text-purple-600 dark:text-purple-500">Database real-time listeners</p>
                          </div>
                          <div className="p-3 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-800">
                            <p className="font-medium text-green-700 dark:text-green-400">Server-Sent Events</p>
                            <p className="text-sm text-green-600 dark:text-green-500">One-way live updates</p>
                          </div>
                          <div className="p-3 bg-white dark:bg-gray-800 rounded border border-yellow-200 dark:border-yellow-800">
                            <p className="font-medium text-yellow-700 dark:text-yellow-400">Observables (RxJS)</p>
                            <p className="text-sm text-yellow-600 dark:text-yellow-500">Reactive programming patterns</p>
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
                            <span className="ml-4 font-mono">SubscriptionExample.jsx</span>
                          </div>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-gray-300 text-sm font-mono">
{`useEffect(() => {
  // 🚨 Side Effect: Setting up subscription
  if (isSubscribed) {
    const subscription = {
      id: Date.now(),
      // Simulating a real subscription
      interval: setInterval(() => {
        console.log('Update received');
        // Handle incoming data
      }, 2000),
      
      // Method to unsubscribe
      unsubscribe: function() {
        clearInterval(this.interval);
        console.log('Unsubscribed');
      }
    };
    
    // 🧹 CRITICAL: Return cleanup function
    return () => {
      subscription.unsubscribe();
      // This runs when:
      // 1. Component unmounts
      // 2. isSubscribed changes to false
      // 3. Dependency array changes
    };
  }
}, [isSubscribed]); // Re-run when subscription state changes`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">⚠️ Critical: Cleanup Patterns</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="font-medium text-red-800 dark:text-red-300">Memory Leak</p>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              Unclosed subscriptions consume memory indefinitely
                            </p>
                          </div>
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="font-medium text-red-800 dark:text-red-300">Network Waste</p>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              Continues receiving data unnecessarily
                            </p>
                          </div>
                          <div className="p-3 bg-red-100 dark:bg-red-900 rounded">
                            <p className="font-medium text-red-800 dark:text-red-300">Multiple Subscriptions</p>
                            <p className="text-sm text-red-700 dark:text-red-400">
                              Component re-mounts create duplicates
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Professional Pattern</h4>
                        <p className="text-blue-700 dark:text-blue-400">
                          Use a ref to track subscription status. Before updating state, check if component is still mounted:
                        </p>
                        <pre className="text-xs text-blue-600 dark:text-blue-500 mt-2 bg-blue-100 dark:bg-blue-900 p-2 rounded">
{`const isMounted = useRef(true);

useEffect(() => {
  return () => { isMounted.current = false; };
}, []);

// In subscription callback:
if (isMounted.current) {
  setData(newData);
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Side Effect Log */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.8s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                <span className="text-gray-500 mr-2">📋</span> Side Effect Activity Log
              </h3>
              <button
                onClick={clearLogs}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                Clear Logs
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {logMessages.map((log) => (
                  <div
                    key={log.id}
                    className={clsx(
                      "p-3 rounded-lg border transition-all duration-300",
                      log.type === 'timer' && "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                      log.type === 'api' && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                      log.type === 'dom' && "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                      log.type === 'event' && "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                      log.type === 'storage' && "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
                      log.type === 'subscription' && "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                      log.type === 'cleanup' && "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700",
                      log.type === 'action' && "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700",
                      log.type === 'info' && "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={clsx(
                          "text-sm font-medium px-2 py-1 rounded",
                          log.type === 'timer' && "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
                          log.type === 'api' && "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
                          log.type === 'dom' && "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300",
                          log.type === 'event' && "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
                          log.type === 'storage' && "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300",
                          log.type === 'subscription' && "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
                          (log.type === 'cleanup' || log.type === 'action' || log.type === 'info') && "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
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
                This log shows side effects as they happen. Try different examples to see various side effect types.
              </p>
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_1s]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Key Principles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "🧹",
                title: "Cleanup is Crucial",
                description: "Always return cleanup functions to prevent memory leaks",
                color: "red"
              },
              {
                icon: "🎯",
                title: "Dependency Arrays",
                description: "Control when side effects run by specifying dependencies",
                color: "blue"
              },
              {
                icon: "⚡",
                title: "Asynchronous Nature",
                description: "Side effects happen after render, not during",
                color: "green"
              },
              {
                icon: "🔄",
                title: "Lifecycle Management",
                description: "Mount, update, unmount - handle all phases",
                color: "purple"
              },
              {
                icon: "🚫",
                title: "Avoid During Render",
                description: "Never run side effects directly in render",
                color: "yellow"
              },
              {
                icon: "📦",
                title: "Encapsulation",
                description: "Keep side effects isolated in useEffect",
                color: "indigo"
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

        {/* Teacher's Note */}
        <section className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_1.2s]">
          <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl shadow-xl overflow-hidden">
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
                      In my 27 years of teaching programming, I've found that understanding side effects is what separates 
                      beginners from intermediate React developers. Students from Barrackpore to Shyamnagar often struggle 
                      with when and how to use useEffect properly.
                    </p>
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <h4 className="font-bold mb-2">Golden Rule to Remember:</h4>
                      <p className="text-white/90">
                        "If it touches anything outside your component (browser, server, time, storage), it's a side effect 
                        and belongs in useEffect. If it only uses props and state to compute what to show, it's pure rendering."
                      </p>
                    </div>
                    <p className="text-white/90">
                      When <span className="font-semibold">Abhronila</span> was learning this, I had her draw a circle around 
                      her component. Anything reaching outside the circle was a side effect. This visual helped her understand 
                      the boundary between pure React and the outside world.
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
        <section className="animate-[slideUp_0.8s_ease-out_1.4s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Learning Checklist</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Understanding Check</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-red-600 rounded" />
                    <div>
                      <p className="font-medium">I can identify what counts as a side effect</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">API calls, timers, subscriptions, etc.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-red-600 rounded" />
                    <div>
                      <p className="font-medium">I understand why cleanup is necessary</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Prevents memory leaks and bugs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-red-600 rounded" />
                    <div>
                      <p className="font-medium">I know when side effects run</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">After render, not during</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Practical Skills</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                    <div>
                      <p className="font-medium">I can write cleanup functions</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For timers, listeners, subscriptions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                    <div>
                      <p className="font-medium">I can handle API calls with useEffect</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Loading, error, data states</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                    <div>
                      <p className="font-medium">I know when NOT to use useEffect</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For derived state or event handlers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Hint Section</h3>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-300 italic">
                  Think about: What would happen if Debangshu's timer didn't have cleanup? 
                  Observe carefully how the event listener example handles window resize and key press.
                  Try switching between examples rapidly and watch the cleanup logs appear.
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
          .animate-\\[slideUp_0\\.8s_ease-out_1\\.4s\\] {
            animation: none !important;
            opacity: 1;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic30;