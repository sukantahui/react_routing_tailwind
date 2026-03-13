import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Topic31 = () => {
  // State for cleanup function examples
  const [activeListeners, setActiveListeners] = useState([]);
  const [timerCount, setTimerCount] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [resourceLeaks, setResourceLeaks] = useState(0);
  const [cleanupLog, setCleanupLog] = useState([]);
  const [exampleType, setExampleType] = useState('event');
  const [isComponentMounted, setIsComponentMounted] = useState(true);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [keyPresses, setKeyPresses] = useState([]);
  const [networkRequests, setNetworkRequests] = useState([]);
  const [websocketMessages, setWebsocketMessages] = useState([]);

  // Refs for cleanup tracking
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  const eventListenersRef = useRef([]);
  const subscriptionsRef = useRef([]);
  const abortControllerRef = useRef(null);
  const memoryLeakIntervalRef = useRef(null);
  const cleanupCountRef = useRef(0);
  const mountedRef = useRef(true);

  // Log cleanup actions
  const logCleanup = (type, description, color = 'blue') => {
    cleanupCountRef.current += 1;
    setCleanupLog(prev => [
      ...prev,
      {
        id: Date.now(),
        count: cleanupCountRef.current,
        type,
        description,
        color,
        timestamp: new Date().toLocaleTimeString()
      }
    ].slice(-10));
  };

  // ============ EXAMPLE 1: Event Listener Cleanup ============
  useEffect(() => {
    if (exampleType === 'event' && isComponentMounted) {
      console.log('🖱️ Setting up mouse move listener');
      
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      const handleKeyDown = (e) => {
        setKeyPresses(prev => [...prev.slice(-4), {
          key: e.key,
          code: e.code,
          timestamp: new Date().toLocaleTimeString()
        }]);
      };
      
      const handleResize = () => {
        logCleanup('event', 'Window resized', 'purple');
      };
      
      // Add event listeners
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
      
      // Track for cleanup
      eventListenersRef.current = [
        { type: 'mousemove', handler: handleMouseMove },
        { type: 'keydown', handler: handleKeyDown },
        { type: 'resize', handler: handleResize }
      ];
      
      setActiveListeners(['mousemove', 'keydown', 'resize']);
      
      // Cleanup function
      return () => {
        console.log('🧹 Cleaning up event listeners');
        logCleanup('event', 'Removed all event listeners', 'red');
        
        eventListenersRef.current.forEach(({ type, handler }) => {
          window.removeEventListener(type, handler);
        });
        
        eventListenersRef.current = [];
        setActiveListeners([]);
      };
    }
  }, [exampleType, isComponentMounted]);

  // ============ EXAMPLE 2: Timer/Interval Cleanup ============
  useEffect(() => {
    if (exampleType === 'timer' && isComponentMounted) {
      console.log('⏰ Setting up timers');
      
      // Set up interval
      intervalRef.current = setInterval(() => {
        setTimerCount(prev => {
          const newCount = prev + 1;
          console.log(`Timer tick: ${newCount}`);
          return newCount;
        });
      }, 1000);
      
      // Set up timeout
      timeoutRef.current = setTimeout(() => {
        console.log('Timeout completed after 5 seconds');
        logCleanup('timer', '5-second timeout completed', 'green');
      }, 5000);
      
      // Cleanup function
      return () => {
        console.log('🧹 Cleaning up timers');
        logCleanup('timer', 'Cleared interval and timeout', 'orange');
        
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        setTimerCount(0);
      };
    }
  }, [exampleType, isComponentMounted]);

  // ============ EXAMPLE 3: Subscription/WebSocket Cleanup ============
  useEffect(() => {
    if (exampleType === 'subscription' && isComponentMounted) {
      console.log('📡 Setting up subscription');
      
      // Simulate WebSocket connection
      const simulateSubscription = () => {
        const subscriptionId = Date.now();
        console.log(`Connected to subscription ${subscriptionId}`);
        
        // Simulate receiving messages
        const messageInterval = setInterval(() => {
          const message = {
            id: Date.now(),
            type: 'update',
            data: `Message from subscription ${subscriptionId}`,
            timestamp: new Date().toLocaleTimeString()
          };
          
          setWebsocketMessages(prev => [...prev.slice(-5), message]);
          setSubscriptionCount(prev => prev + 1);
        }, 2000);
        
        subscriptionsRef.current.push({
          id: subscriptionId,
          interval: messageInterval
        });
        
        return subscriptionId;
      };
      
      const sub1 = simulateSubscription();
      const sub2 = simulateSubscription();
      
      // Cleanup function
      return () => {
        console.log('🧹 Cleaning up subscriptions');
        logCleanup('subscription', `Disconnected ${subscriptionsRef.current.length} subscriptions`, 'pink');
        
        subscriptionsRef.current.forEach(sub => {
          clearInterval(sub.interval);
          console.log(`Disconnected subscription ${sub.id}`);
        });
        
        subscriptionsRef.current = [];
        setSubscriptionCount(0);
        setWebsocketMessages([]);
      };
    }
  }, [exampleType, isComponentMounted]);

  // ============ EXAMPLE 4: Animation Frame Cleanup ============
  useEffect(() => {
    if (exampleType === 'animation' && isComponentMounted) {
      console.log('🎬 Setting up animation frame');
      
      let frameId;
      let startTime = null;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // Update animation state
        const progress = (elapsed % 2000) / 2000; // 2 second loop
        const element = document.getElementById('animation-demo');
        if (element) {
          element.style.transform = `rotate(${progress * 360}deg)`;
        }
        
        // Continue animation loop
        frameId = requestAnimationFrame(animate);
        animationRef.current = frameId;
      };
      
      frameId = requestAnimationFrame(animate);
      animationRef.current = frameId;
      
      // Cleanup function
      return () => {
        console.log('🧹 Cleaning up animation frame');
        logCleanup('animation', 'Cancelled animation frame', 'yellow');
        
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      };
    }
  }, [exampleType, isComponentMounted]);

  // ============ EXAMPLE 5: Fetch with AbortController ============
  useEffect(() => {
    if (exampleType === 'fetch' && isComponentMounted) {
      console.log('🌐 Setting up fetch with abort controller');
      
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      
      const fetchData = async () => {
        try {
          // Simulate API call
          const response = await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              resolve({
                ok: true,
                json: async () => ({ data: 'Fetched successfully' })
              });
            }, 3000);
            
            // Handle abort
            signal.addEventListener('abort', () => {
              clearTimeout(timeout);
              reject(new DOMException('Aborted', 'AbortError'));
            });
          });
          
          const data = await response.json();
          setNetworkRequests(prev => [...prev, {
            id: Date.now(),
            status: 'success',
            data: data.data,
            timestamp: new Date().toLocaleTimeString()
          }]);
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
            logCleanup('fetch', 'Fetch request aborted', 'blue');
          } else {
            console.error('Fetch error:', error);
          }
        }
      };
      
      fetchData();
      
      // Cleanup function
      return () => {
        console.log('🧹 Cleaning up fetch request');
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
          abortControllerRef.current = null;
        }
      };
    }
  }, [exampleType, isComponentMounted]);

  // ============ EXAMPLE 6: Memory Leak (What NOT to do) ============
  useEffect(() => {
    if (exampleType === 'leak' && isComponentMounted) {
      console.log('💥 INTENTIONAL MEMORY LEAK - DO NOT DO THIS IN REAL CODE');
      
      // This creates a memory leak - interval never cleaned up
      memoryLeakIntervalRef.current = setInterval(() => {
        setResourceLeaks(prev => prev + 1);
        console.log(`Memory leak tick: ${resourceLeaks + 1}`);
      }, 1000);
      
      // ❌ NO CLEANUP FUNCTION - INTENTIONAL LEAK
      // This is what happens when you forget cleanup
    }
  }, [exampleType, isComponentMounted, resourceLeaks]);

  // ============ EXAMPLE 7: Multiple Resources Cleanup ============
  useEffect(() => {
    if (exampleType === 'multiple' && isComponentMounted) {
      console.log('🔗 Setting up multiple resources');
      
      // Multiple event listeners
      const clickHandler = () => logCleanup('multiple', 'Document clicked', 'gray');
      const scrollHandler = () => logCleanup('multiple', 'Page scrolled', 'gray');
      
      document.addEventListener('click', clickHandler);
      window.addEventListener('scroll', scrollHandler);
      
      // Multiple timers
      const interval1 = setInterval(() => {
        logCleanup('multiple', 'Interval 1 tick', 'teal');
      }, 1500);
      
      const interval2 = setInterval(() => {
        logCleanup('multiple', 'Interval 2 tick', 'indigo');
      }, 2500);
      
      // Track all resources
      const resources = [
        { type: 'event', name: 'click', handler: clickHandler },
        { type: 'event', name: 'scroll', handler: scrollHandler },
        { type: 'timer', name: 'interval1', id: interval1 },
        { type: 'timer', name: 'interval2', id: interval2 }
      ];
      
      // Cleanup function for all resources
      return () => {
        console.log('🧹 Cleaning up multiple resources');
        logCleanup('multiple', 'Cleaned up 4 resources', 'purple');
        
        resources.forEach(resource => {
          if (resource.type === 'event') {
            if (resource.name === 'click') {
              document.removeEventListener('click', resource.handler);
            } else {
              window.removeEventListener('scroll', resource.handler);
            }
          } else if (resource.type === 'timer') {
            clearInterval(resource.id);
          }
        });
      };
    }
  }, [exampleType, isComponentMounted]);

  // ============ Helper Functions ============
  const simulateUnmount = () => {
    setIsComponentMounted(false);
    setTimeout(() => {
      setIsComponentMounted(true);
      logCleanup('system', 'Component remounted', 'green');
    }, 1500);
  };

  const cleanupManually = () => {
    // Manually trigger cleanup for current example
    switch (exampleType) {
      case 'leak':
        if (memoryLeakIntervalRef.current) {
          clearInterval(memoryLeakIntervalRef.current);
          memoryLeakIntervalRef.current = null;
          logCleanup('manual', 'Manually cleaned memory leak', 'red');
        }
        break;
      case 'timer':
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          logCleanup('manual', 'Manually cleared interval', 'orange');
        }
        break;
    }
  };

  const clearLogs = () => {
    setCleanupLog([]);
    cleanupCountRef.current = 0;
  };

  const resetAll = () => {
    // Clean up everything
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (memoryLeakIntervalRef.current) clearInterval(memoryLeakIntervalRef.current);
    
    eventListenersRef.current.forEach(({ type, handler }) => {
      window.removeEventListener(type, handler);
    });
    
    subscriptionsRef.current.forEach(sub => {
      clearInterval(sub.interval);
    });
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Reset state
    setActiveListeners([]);
    setTimerCount(0);
    setSubscriptionCount(0);
    setResourceLeaks(0);
    setMousePosition({ x: 0, y: 0 });
    setKeyPresses([]);
    setNetworkRequests([]);
    setWebsocketMessages([]);
    
    logCleanup('system', 'Reset all resources', 'gray');
  };

  // Update memory usage simulation
  useEffect(() => {
    const updateMemoryUsage = () => {
      // Simulate memory usage based on active resources
      let usage = 0;
      if (activeListeners.length > 0) usage += 10;
      if (timerCount > 0) usage += 5;
      if (subscriptionCount > 0) usage += 15;
      if (resourceLeaks > 0) usage += resourceLeaks * 2;
      setMemoryUsage(usage);
    };
    
    updateMemoryUsage();
  }, [activeListeners, timerCount, subscriptionCount, resourceLeaks]);

  // Example types data
  const exampleTypes = [
    {
      id: 'event',
      name: 'Event Listeners',
      description: 'Clean up window/document event listeners',
      icon: '🖱️',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      border: 'border-blue-300 dark:border-blue-700'
    },
    {
      id: 'timer',
      name: 'Timers/Intervals',
      description: 'Clean up setTimeout/setInterval',
      icon: '⏰',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      border: 'border-green-300 dark:border-green-700'
    },
    {
      id: 'subscription',
      name: 'Subscriptions',
      description: 'Clean up WebSocket/API subscriptions',
      icon: '📡',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      border: 'border-purple-300 dark:border-purple-700'
    },
    {
      id: 'animation',
      name: 'Animation Frames',
      description: 'Clean up requestAnimationFrame',
      icon: '🎬',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      border: 'border-yellow-300 dark:border-yellow-700'
    },
    {
      id: 'fetch',
      name: 'Fetch Requests',
      description: 'Clean up fetch with AbortController',
      icon: '🌐',
      color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300',
      border: 'border-cyan-300 dark:border-cyan-700'
    },
    {
      id: 'leak',
      name: 'Memory Leak',
      description: 'What happens WITHOUT cleanup (danger!)',
      icon: '💥',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      border: 'border-red-300 dark:border-red-700'
    },
    {
      id: 'multiple',
      name: 'Multiple Resources',
      description: 'Clean up multiple resources together',
      icon: '🔗',
      color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
      border: 'border-indigo-300 dark:border-indigo-700'
    }
  ];

  // Cleanup timing scenarios
  const cleanupTiming = [
    {
      scenario: 'On Unmount',
      description: 'Component removed from DOM',
      trigger: 'Navigate away, conditionally rendered',
      cleanup: 'All resources cleaned up',
      example: 'return () => { clearInterval(id); }'
    },
    {
      scenario: 'Before Effect Re-run',
      description: 'Dependencies changed, effect will run again',
      trigger: 'State/prop change in dependency array',
      cleanup: 'Cleanup runs, then new effect runs',
      example: 'useEffect(() => { ... }, [dependency])'
    },
    {
      scenario: 'Development StrictMode',
      description: 'React runs effects twice in development',
      trigger: 'React.StrictMode in development',
      cleanup: 'Cleanup runs between mount cycles',
      example: 'Mount → Cleanup → Mount (dev only)'
    },
    {
      scenario: 'Error Boundaries',
      description: 'Component caught by error boundary',
      trigger: 'Error thrown during render',
      cleanup: 'Cleanup runs before error boundary takes over',
      example: 'Error → Cleanup → Error Boundary'
    }
  ];

  // Common cleanup mistakes
  const cleanupMistakes = [
    {
      mistake: 'Forgetting Cleanup',
      problem: 'Memory leaks, abandoned callbacks',
      example: `useEffect(() => {\n  setInterval(() => {}, 1000);\n  // ❌ No cleanup\n}, []);`,
      fix: 'Always return cleanup function'
    },
    {
      mistake: 'Cleaning Up Wrong Resource',
      problem: 'Trying to clean up already cleaned resource',
      example: `useEffect(() => {\n  const id = setInterval(...);\n  return () => {\n    clearInterval(id);\n    clearInterval(id); // ❌ Already cleaned\n  };\n}, []);`,
      fix: 'Keep reference and check before cleaning'
    },
    {
      mistake: 'Async Cleanup',
      problem: 'Cleanup function cannot be async',
      example: `useEffect(() => {\n  // ...\n  return async () => { // ❌ Can't be async\n    await cleanup();\n  };\n}, []);`,
      fix: 'Use sync cleanup or cleanup flag'
    },
    {
      mistake: 'Missing Cleanup Dependencies',
      problem: 'Cleanup uses stale values',
      example: `useEffect(() => {\n  const id = setInterval(() => {\n    console.log(count);\n  }, 1000);\n  \n  return () => {\n    clearInterval(id);\n    console.log(count); // ❌ Stale value\n  };\n}, []);`,
      fix: 'Move logic outside cleanup or use refs'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Always Return Cleanup',
      description: 'Every useEffect that sets up resources should return cleanup',
      reason: 'Prevents memory leaks'
    },
    {
      practice: 'Clean Up in Reverse Order',
      description: 'Clean up resources in opposite order of creation',
      reason: 'Prevents dependency issues'
    },
    {
      practice: 'Use AbortController for Fetch',
      description: 'Cancel fetch requests on cleanup',
      reason: 'Prevents state updates after unmount'
    },
    {
      practice: 'Check Before Cleaning',
      description: 'Verify resource exists before cleaning',
      reason: 'Prevents errors from double cleanup'
    },
    {
      practice: 'Test Cleanup',
      description: 'Test that cleanup works by unmounting component',
      reason: 'Ensures no memory leaks'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Topic 32/46
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cleanup Functions in useEffect
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Master the art of cleaning up after yourself—learn when and how to use cleanup functions 
            to prevent memory leaks, abandoned callbacks, and resource exhaustion in your React applications.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theory & Explanation */}
          <div className="space-y-8">
            {/* What Are Cleanup Functions? */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.9s_ease-out]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                  <span className="text-xl">🧹</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  What Are Cleanup Functions?
                </h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A <strong>cleanup function</strong> is a function returned from <code>useEffect</code> that 
                  runs <em>before</em> the component unmounts and <em>before</em> re-running the effect due to dependency changes.
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-xl my-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">🎯 Core Principle</h4>
                  <blockquote className="border-l-4 border-green-500 dark:border-green-400 pl-4 py-2 italic text-gray-700 dark:text-gray-300">
                    "For every resource you set up in useEffect, you must clean it up. 
                    Cleanup functions ensure your application doesn't leak memory, 
                    abandon callbacks, or try to update unmounted components."
                  </blockquote>
                </div>
                
                {/* Cleanup Lifecycle Visualization */}
                <div className="my-8">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Cleanup Function Lifecycle
                  </h4>
                  
                  <div className="relative">
                    <div className="flex flex-col items-center space-y-6">
                      {/* Effect Setup */}
                      <div className="w-full max-w-md p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm">1</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">Effect Runs</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Sets up resources</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                          <span className="text-white">↓</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Component active</div>
                      </div>
                      
                      {/* Cleanup Trigger */}
                      <div className="w-full max-w-md p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm">2</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">Unmount or Re-run</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Component unmounts or deps change</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                          <span className="text-white">↓</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Cleanup runs first</div>
                      </div>
                      
                      {/* Cleanup Execution */}
                      <div className="w-full max-w-md p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border-2 border-red-300 dark:border-red-700">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm">3</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">Cleanup Executes</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Resources cleaned up</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* SVG Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <marker id="arrow-cleanup" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                        </marker>
                      </defs>
                      <line x1="50%" y1="80" x2="50%" y2="140" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-cleanup)" />
                      <line x1="50%" y1="200" x2="50%" y2="260" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-cleanup)" />
                      <line x1="50%" y1="320" x2="50%" y2="380" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-cleanup)" />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Real-World Analogy</h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300">
                      Think of Swadeep from Barrackpore using a classroom:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><strong>Effect:</strong> Turn on lights, open windows, set up projector</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span><strong>Cleanup:</strong> Turn off lights, close windows, pack projector</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span><strong>Without cleanup:</strong> Lights stay on all night, windows open in rain</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Cleanup Timing Scenarios */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">⏱️</span>
                </span>
                When Cleanup Runs
              </h3>
              
              <div className="space-y-4">
                {cleanupTiming.map((timing, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 mt-1">
                        <span className="text-purple-600 dark:text-purple-400">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {timing.scenario}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <strong>Description:</strong> {timing.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div className="font-medium text-gray-700 dark:text-gray-300">Trigger:</div>
                            <div className="text-gray-600 dark:text-gray-400">{timing.trigger}</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700 dark:text-gray-300">Cleanup:</div>
                            <div className="text-gray-600 dark:text-gray-400">{timing.cleanup}</div>
                          </div>
                        </div>
                        <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded-lg mt-2 overflow-x-auto">
                          {timing.example}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Insight</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cleanup runs <strong>before</strong> the component unmounts and <strong>before</strong> 
                  the effect re-runs due to dependency changes. This ensures old resources are 
                  cleaned up before new ones are created.
                </p>
              </div>
            </section>

            {/* Common Cleanup Mistakes */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">⚠️</span>
                </span>
                Common Cleanup Mistakes
              </h3>
              
              <div className="space-y-4">
                {cleanupMistakes.map((mistake, index) => (
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
                        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg mb-2 overflow-x-auto">
                          {mistake.example}
                        </pre>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          <strong>Fix:</strong> {mistake.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Interactive Examples */}
          <div className="space-y-8">
            {/* Cleanup Example Selector */}
            <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Cleanup Examples Playground
              </h3>
              
              {/* Example Selector */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Select Cleanup Example</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {exampleTypes.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => {
                        setExampleType(example.id);
                        resetAll();
                      }}
                      className={clsx(
                        "p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105",
                        exampleType === example.id 
                          ? "scale-105 ring-2 ring-offset-2 ring-blue-500 bg-white dark:bg-gray-800"
                          : "hover:shadow-md",
                        example.border,
                        exampleType === example.id ? "" : example.color
                      )}
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{example.icon}</span>
                        <div className="text-left">
                          <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                            {example.name}
                          </div>
                          <div className="text-[10px] text-gray-600 dark:text-gray-400 truncate">
                            {example.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Resource Status */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Resource Status</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {activeListeners.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Active Listeners</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {timerCount}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Timer Ticks</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {subscriptionCount}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Subscription Messages</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {resourceLeaks}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Memory Leaks</div>
                    </div>
                  </div>
                </div>
                
                {/* Memory Usage Visualization */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Memory Usage: {memoryUsage} MB</span>
                    <span>Max: 50 MB</span>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={clsx(
                        "h-full rounded-full transition-all duration-500",
                        memoryUsage < 10 ? "bg-green-500" :
                        memoryUsage < 20 ? "bg-yellow-500" :
                        memoryUsage < 30 ? "bg-orange-500" : "bg-red-500"
                      )}
                      style={{ width: `${Math.min(memoryUsage * 2, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {exampleType === 'leak' ? '⚠️ Memory leak active - usage grows indefinitely!' : 'Memory usage normal'}
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={simulateUnmount}
                    className="py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    {isComponentMounted ? 'Simulate Unmount' : 'Remount Component'}
                  </button>
                  
                  <button
                    onClick={cleanupManually}
                    className="py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Cleanup Manually
                  </button>
                  
                  <button
                    onClick={resetAll}
                    className="py-3 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Reset All
                  </button>
                  
                  <button
                    onClick={clearLogs}
                    className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Clear Logs
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Component Status: <span className={isComponentMounted ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {isComponentMounted ? 'Mounted' : 'Unmounted'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Current Example: <span className="font-semibold">
                      {exampleTypes.find(e => e.id === exampleType)?.name}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Live Data Display */}
              {exampleType === 'event' && (
                <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Live Event Data</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                        Mouse Position
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {mousePosition.x}, {mousePosition.y}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        Move mouse to update
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                        Recent Key Presses
                      </div>
                      <div className="space-y-1">
                        {keyPresses.slice().reverse().map((press, index) => (
                          <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                            {press.key} ({press.code}) - {press.timestamp}
                          </div>
                        ))}
                        {keyPresses.length === 0 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Press any key
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {exampleType === 'subscription' && websocketMessages.length > 0 && (
                <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">WebSocket Messages</h4>
                  
                  <div className="space-y-2">
                    {websocketMessages.slice().reverse().map((msg, index) => (
                      <div 
                        key={msg.id}
                        className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                      >
                        <div className="text-sm text-purple-700 dark:text-purple-300">
                          {msg.data}
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-400">
                          {msg.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {exampleType === 'animation' && (
                <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Animation Demo</h4>
                  
                  <div className="flex justify-center">
                    <div
                      id="animation-demo"
                      className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ transition: 'transform 0.1s linear' }}
                    >
                      🎬
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    This animation uses requestAnimationFrame. Cleanup cancels it.
                  </p>
                </div>
              )}
            </section>

            {/* Cleanup Log */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Cleanup Activity Log
              </h3>
              
              <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-4">
                {cleanupLog.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Cleanup events will appear here. Try unmounting or switching examples.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...cleanupLog].reverse().map((log) => (
                      <div 
                        key={log.id}
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className={clsx(
                              "w-3 h-3 rounded-full mr-3",
                              log.color === 'red' && "bg-red-500",
                              log.color === 'green' && "bg-green-500",
                              log.color === 'blue' && "bg-blue-500",
                              log.color === 'orange' && "bg-orange-500",
                              log.color === 'purple' && "bg-purple-500",
                              log.color === 'pink' && "bg-pink-500",
                              log.color === 'yellow' && "bg-yellow-500",
                              log.color === 'teal' && "bg-teal-500",
                              log.color === 'indigo' && "bg-indigo-500",
                              log.color === 'gray' && "bg-gray-500"
                            )}></div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              #{log.count} - {log.type.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {log.timestamp}
                          </span>
                        </div>
                        
                        <div className="ml-6">
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {log.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div>
                  Total cleanups: <span className="font-semibold">{cleanupCountRef.current}</span>
                </div>
                <div>
                  Open console (F12) for detailed logs
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Cleanup Best Practices
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Essential Rules</h4>
                  
                  <div className="space-y-4">
                    {bestPractices.map((practice, index) => (
                      <div 
                        key={index}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-1">
                          <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {practice.practice}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {practice.description}
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                            Reason: {practice.reason}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Code Example */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Complete Example</h4>
                  
                  <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`// Proper cleanup for multiple resources
useEffect(() => {
  // 1. Create resources
  const controller = new AbortController();
  const intervalId = setInterval(() => {}, 1000);
  const handleClick = () => console.log('click');
  
  document.addEventListener('click', handleClick);
  
  // 2. Fetch with abort signal
  fetch('/api', { signal: controller.signal })
    .then(response => {
      if (!mountedRef.current) return; // Check before state update
      setData(response);
    })
    .catch(error => {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    });
  
  // 3. Return cleanup function
  return () => {
    // Clean up in reverse order
    document.removeEventListener('click', handleClick);
    clearInterval(intervalId);
    controller.abort();
    
    // Mark as unmounted
    mountedRef.current = false;
  };
}, []); // Empty array = runs once on mount`}
                  </pre>
                </div>
                
                <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-xl">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                    Professional Insight
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    In production applications, we use cleanup functions not just for 
                    preventing memory leaks, but also for:
                  </p>
                  <ul className="text-sm text-green-700 dark:text-green-400 mt-2 space-y-1">
                    <li>• Cancelling expensive computations</li>
                    <li>• Preventing race conditions in async operations</li>
                    <li>• Releasing acquired locks or connections</li>
                    <li>• Cleaning up temporary files or caches</li>
                  </ul>
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
                  <strong>Dear students from Naihati, Barrackpore, and Shyamnagar,</strong>
                </p>
                
                <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg mb-4 border border-cyan-200 dark:border-cyan-700">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
                    The Cleanup Mindset:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    When Abhronila from Ichapur deployed her app, users reported their browsers 
                    slowing down after 30 minutes. The culprit? Missing cleanup functions for 
                    mouse move listeners that accumulated with every navigation.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Rule of thumb:</strong> For every <code>addEventListener</code>, 
                    <code>setInterval</code>, <code>subscribe</code>, you need a corresponding 
                    cleanup.
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After 27 years of building applications, I've seen cleanup mistakes cause:
                </p>
                
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong>Memory leaks</strong> that crash browsers after hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong>Race conditions</strong> where old API responses overwrite new ones</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong>Zombie components</strong> that try to update after unmount</span>
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
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-700 animate-[fadeInUp_1.4s_ease-out]">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
              <span className="text-purple-600 dark:text-purple-400">🔍</span>
            </span>
            Debugging Challenge
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Memory Leak Detection</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Perform this experiment to see memory leaks in action:
              </p>
              
              <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-1 text-xs">1</span>
                  <span>Select "Memory Leak" example</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-1 text-xs">2</span>
                  <span>Watch the memory usage grow (top-right chart)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-1 text-xs">3</span>
                  <span>Click "Simulate Unmount" - notice memory doesn't drop</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-1 text-xs">4</span>
                  <span>Click "Cleanup Manually" to see memory drop</span>
                </li>
              </ol>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Critical Question:</strong> In the "Event Listeners" example, 
                what happens if you:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>1. Move your mouse around (watch position update)</li>
                <li>2. Press some keys (watch key log)</li>
                <li>3. Click "Simulate Unmount"</li>
                <li>4. Continue moving mouse and pressing keys</li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Do the event handlers still work after unmount? Check the cleanup log.
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try this:</strong> Open Chrome DevTools → Memory tab. Take a heap snapshot 
              before and after creating resources. Compare the snapshots to see what wasn't cleaned up.
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeInUp_1.5s_ease-out]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <span className="text-red-600 dark:text-red-400">🚫</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">When Cleanup Runs</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Before component unmounts</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Before effect re-runs</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>In React.StrictMode (dev)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Before error boundary takes over</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400">✅</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Always Clean Up</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Event listeners (add/remove)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Timers/intervals (clear)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Subscriptions (unsubscribe)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Fetch requests (abort)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400">🔧</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Best Practices</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Use AbortController for fetch</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Keep references for cleanup</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Clean up in reverse order</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Test cleanup by unmounting</span>
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

export default Topic31;